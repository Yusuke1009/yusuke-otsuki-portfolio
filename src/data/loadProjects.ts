import type { Project, ProjectImage, ProjectLink, ProjectPhase, RoleFilter } from './projects';
import type { Lang } from '../i18n/LangContext';

const modules = import.meta.glob('../content/works/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

interface FrontSection {
  title: string;
  subtitle: string;
  meta: Record<string, string>;
}

interface SubSection {
  name: string;
  bodyLines: string[];
}

function parseFrontSection(text: string): FrontSection {
  const lines = text.split('\n');
  let title = '';
  let subtitle = '';
  const meta: Record<string, string> = {};
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('# ')) {
      title = line.slice(2).trim();
    } else if (line.startsWith('> ')) {
      subtitle = line.slice(2).trim();
    } else if (line.startsWith('- ')) {
      const rest = line.slice(2).trim();
      const idx = rest.indexOf(':');
      if (idx > 0) {
        meta[rest.slice(0, idx).trim()] = rest.slice(idx + 1).trim();
      }
    }
  }
  return { title, subtitle, meta };
}

function parseLinkLines(lines: string[]): ProjectLink[] {
  const links: ProjectLink[] = [];
  for (const raw of lines) {
    const m = raw.trim().match(/^-\s*\[(.+?)\]\((.+?)\)\s*$/);
    if (m) links.push({ label: m[1].trim(), url: m[2].trim() });
  }
  return links;
}

function parseBulletLines(lines: string[]): string[] {
  const result: string[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line.startsWith('- ')) continue;
    const val = line.slice(2).trim();
    if (!val || val.startsWith('<!--')) continue;
    result.push(val);
  }
  return result;
}

function splitCsv(value: string | undefined): string[] {
  if (!value) return [];
  return value.split(',').map((s) => s.trim()).filter(Boolean);
}

function parsePhase(sectionText: string): ProjectPhase {
  const lines = sectionText.split('\n');
  const headingMatch = lines[0].match(/^##\s+Phase\s+(\d+)/i);
  const number = headingMatch ? headingMatch[1].padStart(2, '0') : '01';

  const rest = lines.slice(1);
  const meta: Record<string, string> = {};
  const narrativeLines: string[] = [];
  const subSections: SubSection[] = [];
  let currentSub: SubSection | null = null;
  let inMeta = true;

  for (const raw of rest) {
    const trimmed = raw.trim();

    if (trimmed.startsWith('### ')) {
      currentSub = { name: trimmed.slice(4).trim(), bodyLines: [] };
      subSections.push(currentSub);
      inMeta = false;
      continue;
    }

    if (currentSub) {
      currentSub.bodyLines.push(raw);
      continue;
    }

    if (inMeta && trimmed.startsWith('- ')) {
      const restLine = trimmed.slice(2).trim();
      const idx = restLine.indexOf(':');
      if (idx > 0) {
        meta[restLine.slice(0, idx).trim()] = restLine.slice(idx + 1).trim();
        continue;
      }
    }

    if (inMeta && !trimmed) continue;

    inMeta = false;
    narrativeLines.push(raw);
  }

  const narrative = narrativeLines.join('\n').trim();
  const achievements = parseBulletLines(
    subSections.find((s) => s.name.toLowerCase() === 'achievements')?.bodyLines ?? [],
  );
  const links = parseLinkLines(
    subSections.find((s) => s.name.toLowerCase() === 'links')?.bodyLines ?? [],
  );
  const videos = parseBulletLines(
    subSections.find((s) => s.name.toLowerCase() === 'videos')?.bodyLines ?? [],
  );
  const imagesSection = subSections.find((s) =>
    /^images(\s|$)/i.test(s.name.trim()),
  );
  const imagesLayout: 'stack' | 'auto' =
    imagesSection && /\bstack\b/i.test(imagesSection.name) ? 'stack' : 'auto';
  const images: ProjectImage[] = parseBulletLines(
    imagesSection?.bodyLines ?? [],
  ).map((line) => {
    // `path | caption` 形式に対応。区切りが無ければ caption は undefined。
    const idx = line.indexOf('|');
    if (idx < 0) return { src: line };
    return {
      src: line.slice(0, idx).trim(),
      caption: line.slice(idx + 1).trim() || undefined,
    };
  });

  return {
    number,
    label: meta['Label'] ?? '',
    period: meta['Period'] ?? '',
    headline: meta['Headline'] ?? '',
    narrative,
    achievements,
    links: links.length ? links : undefined,
    images: images.length ? images : undefined,
    imagesLayout,
    video: meta['Video'] || undefined,
    videos: videos.length ? videos : undefined,
  };
}

function parseProject(md: string, id: string): Project {
  const blocks = md.split(/\n(?=## )/);
  const front = parseFrontSection(blocks[0]);

  let overview = '';
  let topLinks: ProjectLink[] = [];
  const phases: ProjectPhase[] = [];

  for (const block of blocks.slice(1)) {
    const headingMatch = block.match(/^##\s+(.+?)\s*$/m);
    if (!headingMatch) continue;
    const heading = headingMatch[1].trim();
    const body = block.slice(headingMatch[0].length).trim();

    if (heading.toLowerCase() === 'overview') {
      overview = body;
    } else if (heading.toLowerCase() === 'links') {
      topLinks = parseLinkLines(body.split('\n'));
    } else if (/^phase\s+\d+/i.test(heading)) {
      phases.push(parsePhase(block));
    }
  }

  const meta = front.meta;
  return {
    id,
    number: meta['Number'] ?? '',
    title: front.title,
    subtitle: front.subtitle,
    period: meta['Period'] ?? '',
    arc: meta['Arc'] ?? '',
    role: meta['Role'] ?? '',
    team: meta['Team'] ?? '',
    tags: splitCsv(meta['Tags']),
    roles: splitCsv(meta['Roles']) as RoleFilter[],
    thumbnail: meta['Thumbnail'] ?? '',
    kv: meta['Kv'] || undefined,
    overview,
    links: topLinks.length ? topLinks : undefined,
    phases,
    featured: (meta['Featured'] ?? '').toLowerCase() === 'true',
  };
}

const PROJECT_ORDER = ['digikar', 'digisma', 'manabu', 'recruitment', 'pre-m3', 'personal'];

function idFromPath(path: string): string {
  const m = path.match(/\/([^/]+)\.md$/);
  return m ? m[1] : '';
}

export function loadProjects(lang: Lang): Project[] {
  const ja: Record<string, Project> = {};
  const en: Record<string, Project> = {};
  for (const [path, md] of Object.entries(modules)) {
    const base = idFromPath(path);
    if (!base) continue;
    if (base.endsWith('.en')) {
      const id = base.slice(0, -3);
      en[id] = parseProject(md, id);
    } else {
      ja[base] = parseProject(md, base);
    }
  }
  const src = lang === 'en' ? en : ja;
  return PROJECT_ORDER.map((id) => src[id] ?? ja[id]).filter(Boolean);
}
