import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { renderRich } from '../lib/renderRich';
import { useParams, Link } from 'react-router-dom';
import { getProjects } from '../data/projects';
import type { ProjectImage } from '../data/projects';
import { Tag } from '../components/shared/Tag';
import { MoonPhase } from '../components/moon/MoonPhase';
import { Lightbox } from '../components/shared/Lightbox';
import { pickPreviewSet, useHoverImagePreview } from '../components/shared/HoverImagePreview';
import { theme } from '../styles/theme';
import { useLang } from '../i18n/LangContext';
import { ui } from '../i18n/ui';

interface ZoomState {
  images: ProjectImage[];
  index: number;
}

function toYouTubeEmbed(url: string): string | null {
  const match =
    url.match(/youtu\.be\/([\w-]{11})/) ||
    url.match(/youtube\.com\/watch\?v=([\w-]{11})/) ||
    url.match(/youtube\.com\/embed\/([\w-]{11})/);
  if (!match) return null;
  const listMatch = url.match(/[?&]list=([\w-]+)/);
  const base = `https://www.youtube.com/embed/${match[1]}`;
  return listMatch ? `${base}?list=${listMatch[1]}` : base;
}

export function WorkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLang();
  const t = ui[lang];
  const projects = useMemo(() => getProjects(lang), [lang]);
  const project = projects.find((p) => p.id === id);
  const [zoom, setZoom] = useState<ZoomState | null>(null);
  const nextPreview = useHoverImagePreview();

  if (!project) {
    return (
      <NotFound>
        <p>{t.common.notFound}</p>
        <Link to="/">{t.common.backHome}</Link>
      </NotFound>
    );
  }

  return (
    <Page>
      <Top>
        <BackLink to="/">← Home</BackLink>
        <ProjectNumber>{project.number} / {projects.length.toString().padStart(2, '0')}</ProjectNumber>
      </Top>

      <HeaderMeta>
        <MetaPeriod>{project.period}</MetaPeriod>
        {project.arc && (
          <>
            <MetaSep>·</MetaSep>
            <MetaArc>{project.arc}</MetaArc>
          </>
        )}
      </HeaderMeta>

      {project.kv && (
        <HeaderKv>
          <img src={project.kv} alt={`${project.title} key visual`} />
        </HeaderKv>
      )}

      <ProductName>{project.title}</ProductName>

      <Overview>{renderRich(project.overview)}</Overview>

      <FactsBlock>
        <Meta>
          <MetaRow>
            <MetaKey>Role</MetaKey>
            <MetaValue>{project.role}</MetaValue>
          </MetaRow>
          <MetaRow>
            <MetaKey>Team</MetaKey>
            <MetaValue>{project.team}</MetaValue>
          </MetaRow>
          {project.links && project.links.length > 0 && (
            <MetaRow>
              <MetaKey>Links</MetaKey>
              <MetaLinks>
                {project.links.map((l) => (
                  <MetaLink key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
                    {l.label} ↗
                  </MetaLink>
                ))}
              </MetaLinks>
            </MetaRow>
          )}
        </Meta>
        <Tags>
          {project.tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </Tags>
      </FactsBlock>

      <PhasesSection>
        {project.phases.map((phase, idx) => {
          const total = project.phases.length;
          // pre-m3 のみ: 満月 → 新月 (waning / 過去から M3 へ向かう)
          // 他: 三日月 → 満月 (waxing / 事業成長)
          const isReverse = project.id === 'pre-m3';
          const phaseT = idx / Math.max(1, total - 1);
          const moonPhase =
            total === 1 ? 1 : isReverse ? 1.0 - phaseT * 0.78 : 0.22 + phaseT * 0.78;
          return (
            <PhaseBlock key={phase.number}>
              <PhaseDividerLine />
              <PhaseInner>
                <PhaseLeft>
                  <PhaseMoonRow>
                    <PhaseNumber>{phase.number}</PhaseNumber>
                    <MoonPhase phase={moonPhase} size={28} active={true} />
                  </PhaseMoonRow>
                  <PhaseLabel>{phase.label}</PhaseLabel>
                  <PhasePeriod>{phase.period}</PhasePeriod>
                </PhaseLeft>
                <PhaseRight>
                  <PhaseHeadline>{phase.headline}</PhaseHeadline>
                  <PhaseNarrative>{renderRich(phase.narrative)}</PhaseNarrative>
                  {phase.achievements.length > 0 && (
                    <Achievements>
                      {phase.achievements.map((a, i) => (
                        <Achievement key={i}>
                          <AchBullet>—</AchBullet>
                          <span>{renderRich(a)}</span>
                        </Achievement>
                      ))}
                    </Achievements>
                  )}
                  {phase.links && phase.links.length > 0 && (
                    <PhaseLinks>
                      {phase.links.map((l) => (
                        <PhaseLink
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {l.label} ↗
                        </PhaseLink>
                      ))}
                    </PhaseLinks>
                  )}
                  {phase.images && phase.images.length > 0 ? (
                    <ImageGrid
                      $count={phase.images.length}
                      $layout={phase.imagesLayout ?? 'auto'}
                    >
                      {phase.images.map((img, i) => {
                        // 3枚構成かつ auto レイアウトの時のみ、3枚目をフル幅に
                        const isFullWidth =
                          phase.imagesLayout !== 'stack' &&
                          phase.images!.length === 3 &&
                          i === 2;
                        return (
                          <ImageItem key={i} $fullWidth={isFullWidth}>
                            <ImageFrame
                              type="button"
                              onClick={() =>
                                setZoom({ images: phase.images!, index: i })
                              }
                            >
                              <img src={img.src} alt={img.caption || phase.label} loading="lazy" />
                            </ImageFrame>
                            {img.caption && <ImageCaption>{renderRich(img.caption)}</ImageCaption>}
                          </ImageItem>
                        );
                      })}
                    </ImageGrid>
                  ) : !phase.video && (!phase.videos || phase.videos.length === 0) ? (
                    <ImagePlaceholder>
                      <ImagePlaceholderInner>
                        <span>{phase.number}</span>
                        <em>{t.common.imgPlaceholder}</em>
                      </ImagePlaceholderInner>
                    </ImagePlaceholder>
                  ) : null}
                  {phase.video && (() => {
                    const embed = toYouTubeEmbed(phase.video);
                    return embed ? (
                      <VideoFrame>
                        <iframe
                          src={embed}
                          title={phase.label}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </VideoFrame>
                    ) : null;
                  })()}
                  {phase.videos && phase.videos.length > 0 && (
                    <VideoGrid $count={phase.videos.length}>
                      {phase.videos.map((url, i) => {
                        const embed = toYouTubeEmbed(url);
                        if (!embed) return null;
                        return (
                          <VideoFrame key={i}>
                            <iframe
                              src={embed}
                              title={`${phase.label} video ${i + 1}`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </VideoFrame>
                        );
                      })}
                    </VideoGrid>
                  )}
                </PhaseRight>
              </PhaseInner>
            </PhaseBlock>
          );
        })}
      </PhasesSection>

      <NextSection>
        <NextLabel>Next</NextLabel>
        <NextLinks {...nextPreview.containerProps}>
          {(() => {
            const nextItems = projects
              .filter((p) => p.featured && p.id !== project.id)
              .slice(0, 3);
            return (
              <>
                {nextItems.map((p) => (
                  <NextItem
                    key={p.id}
                    to={`/work/${p.id}`}
                    {...nextPreview.getRowProps(p.id)}
                  >
                    <NextNumber>{p.number}</NextNumber>
                    <NextTitle>{p.title}</NextTitle>
                    <NextArc>{p.arc} ↗</NextArc>
                  </NextItem>
                ))}
                {nextPreview.previewLayer(
                  nextItems.map((p) => ({ id: p.id, images: pickPreviewSet(p) })),
                )}
              </>
            );
          })()}
        </NextLinks>
      </NextSection>

      <Lightbox
        images={zoom?.images ?? []}
        index={zoom?.index ?? null}
        onClose={() => setZoom(null)}
        onPrev={() =>
          setZoom((z) =>
            z
              ? { ...z, index: (z.index - 1 + z.images.length) % z.images.length }
              : z
          )
        }
        onNext={() =>
          setZoom((z) =>
            z ? { ...z, index: (z.index + 1) % z.images.length } : z
          )
        }
      />
    </Page>
  );
}

const Page = styled.div`
  position: relative;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing['6']} 0;
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;

const BackLink = styled(Link)`
  color: ${theme.colors.text.muted};
  transition: color ${theme.motion.fast} ${theme.motion.ease};
  &:hover { color: ${theme.colors.text.primary}; }
`;

const ProjectNumber = styled.div`
  color: ${theme.colors.text.muted};
`;

const HeaderMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing['2']};
  padding-top: ${theme.spacing['6']};
  padding-bottom: ${theme.spacing['3']};
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;

const MetaPeriod = styled.span``;

const MetaSep = styled.span`
  color: ${theme.colors.text.placeholder};
`;

const MetaArc = styled.span`
  color: ${theme.colors.text.primary};
  background: ${theme.colors.accent.moon};
  padding: 1px ${theme.spacing['2']};
  line-height: 1.4;
`;

const HeaderKv = styled.div`
  width: 100%;
  aspect-ratio: 21 / 9;
  margin-bottom: ${theme.spacing['4']};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const ProductName = styled.div`
  font-family: ${theme.typography.fontJP};
  font-size: ${theme.typography.size.xl};
  font-weight: 500;
  color: ${theme.colors.text.primary};
  letter-spacing: ${theme.typography.letterSpacing.tight};
  margin-bottom: ${theme.spacing['3']};
`;

const FactsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['3']};
  margin-bottom: ${theme.spacing['16']};
`;

const Meta = styled.div`
  display: flex;
  gap: ${theme.spacing['10']};
  margin-bottom: ${theme.spacing['6']};
  flex-wrap: wrap;
`;

const MetaRow = styled.div``;
const MetaKey = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['1']};
`;
const MetaValue = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.primary};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing['2']};
`;

const Overview = styled.p`
  font-family: ${theme.typography.fontJP};
  font-size: ${theme.typography.size['2xl']};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.text.primary};
  line-height: ${theme.typography.lineHeight.snug};
  letter-spacing: ${theme.typography.letterSpacing.tight};
  max-width: 820px;
  margin: 0 0 ${theme.spacing['4']};
  white-space: pre-wrap;
`;

const MetaLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['1']};
`;

const MetaLink = styled.a`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.primary};
  text-decoration: underline;
  text-decoration-color: ${theme.colors.border.default};
  text-underline-offset: 3px;
  transition: text-decoration-color ${theme.motion.fast} ${theme.motion.ease};

  &:hover {
    text-decoration-color: ${theme.colors.text.primary};
  }
`;

const PhasesSection = styled.section`
  margin: ${theme.spacing['8']} 0;
`;

const PhaseBlock = styled.div`
  padding: ${theme.spacing['16']} 0 ${theme.spacing['12']};
`;

const PhaseDividerLine = styled.div`
  height: 1px;
  background: ${theme.colors.text.primary};
  opacity: 0.85;
  margin-bottom: ${theme.spacing['10']};
`;

const PhaseInner = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: ${theme.spacing['10']};
  align-items: start;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['6']};
  }
`;

const PhaseLeft = styled.aside`
  position: sticky;
  /* Nav (64px) + 余白 */
  top: 88px;
  align-self: start;

  @media (max-width: ${theme.breakpoints.md}) {
    position: relative;
    top: 0;
  }
`;

const PhaseMoonRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing['4']};
  margin-bottom: ${theme.spacing['4']};
`;

const PhaseNumber = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size['2xl']};
  color: ${theme.colors.text.primary};
  line-height: 1;
  letter-spacing: -0.02em;
`;

const PhaseLabel = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['2']};
`;

const PhasePeriod = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
`;

const PhaseRight = styled.div`
  max-width: 720px;
`;

const PhaseHeadline = styled.h3`
  font-family: ${theme.typography.fontJP};
  font-size: ${theme.typography.size.xl};
  font-weight: 700;
  color: ${theme.colors.text.primary};
  letter-spacing: -0.01em;
  line-height: ${theme.typography.lineHeight.snug};
  margin-bottom: ${theme.spacing['5']};

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.size.lg};
  }
`;

const PhaseNarrative = styled.p`
  font-family: ${theme.typography.fontJP};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.secondary};
  line-height: 1.85;
  margin-bottom: ${theme.spacing['6']};
  white-space: pre-wrap;
`;

const Achievements = styled.ul`
  list-style: none;
  margin-bottom: ${theme.spacing['8']};
`;

const Achievement = styled.li`
  display: grid;
  grid-template-columns: 24px 1fr;
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.primary};
  line-height: ${theme.typography.lineHeight.loose};
  padding: ${theme.spacing['2']} 0;
`;

const AchBullet = styled.span`
  font-family: ${theme.typography.fontMono};
  color: ${theme.colors.text.muted};
`;

const PhaseLinks = styled.div`
  display: flex;
  gap: ${theme.spacing['3']};
  flex-wrap: wrap;
  margin-bottom: ${theme.spacing['8']};
`;

const PhaseLink = styled.a`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.primary};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  border-bottom: 1px solid ${theme.colors.text.primary};
  padding-bottom: 2px;
  transition: opacity ${theme.motion.fast} ${theme.motion.ease};
  &:hover { opacity: 0.6; }
`;

const VideoGrid = styled.div<{ $count: number }>`
  display: grid;
  gap: ${theme.spacing['3']};
  margin-top: ${theme.spacing['4']};
  grid-template-columns: ${(p) => (p.$count === 1 ? '1fr' : 'repeat(2, 1fr)')};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }

  > div {
    margin-bottom: 0;
  }
`;

const VideoFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: ${theme.spacing['6']};
  background: ${theme.colors.bg.subtle};

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const ImageGrid = styled.div<{ $count: number; $layout: 'stack' | 'auto' }>`
  display: grid;
  gap: ${theme.spacing['6']};
  margin-top: ${theme.spacing['4']};
  grid-template-columns: ${(p) =>
    p.$layout === 'stack'
      ? '1fr'
      : p.$count === 3
        ? '1fr 1fr'
        : 'repeat(auto-fit, minmax(240px, 1fr))'};
`;

const ImageItem = styled.figure<{ $fullWidth?: boolean }>`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['2']};
  ${(p) => p.$fullWidth && 'grid-column: 1 / -1;'}
`;

const ImageCaption = styled.figcaption`
  font-family: ${theme.typography.fontJP};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  line-height: 1.5;
  letter-spacing: ${theme.typography.letterSpacing.normal};

  a {
    color: ${theme.colors.text.primary};
    text-decoration: underline;
    text-decoration-color: ${theme.colors.border.default};
    text-underline-offset: 2px;
    transition: text-decoration-color ${theme.motion.fast} ${theme.motion.ease};

    &:hover {
      text-decoration-color: ${theme.colors.text.primary};
    }
  }
`;

const ImageFrame = styled.button`
  background: ${theme.colors.bg.subtle};
  overflow: hidden;
  border: none;
  padding: 0;
  cursor: zoom-in;
  display: block;
  transition: opacity ${theme.motion.fast} ${theme.motion.ease};

  &:hover {
    opacity: 0.85;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform ${theme.motion.base} ${theme.motion.ease};
  }

  &:hover img {
    transform: scale(1.02);
  }
`;

const ImagePlaceholder = styled.div`
  border: 1px dashed ${theme.colors.border.default};
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${theme.spacing['4']};
`;

const ImagePlaceholderInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing['1']};
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.placeholder};

  em {
    font-style: normal;
    letter-spacing: ${theme.typography.letterSpacing.wide};
  }
`;

const NextSection = styled.section`
  padding: ${theme.spacing['24']} 0 ${theme.spacing['16']};
  border-top: 1px solid ${theme.colors.border.default};
`;

const NextLabel = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['8']};
`;

const NextLinks = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing['4']};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const NextItem = styled(Link)`
  padding: ${theme.spacing['6']} 0;
  border-top: 1px solid ${theme.colors.text.primary};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['2']};
  transition: padding ${theme.motion.fast} ${theme.motion.ease};

  &:hover {
    padding-left: ${theme.spacing['3']};
  }
`;

const NextNumber = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;

const NextTitle = styled.div`
  font-family: ${theme.typography.fontJP};
  font-size: ${theme.typography.size.lg};
  color: ${theme.colors.text.primary};
`;

const NextArc = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;

const NotFound = styled.div`
  text-align: center;
  padding: ${theme.spacing['24']};
  font-family: ${theme.typography.fontSans};
  color: ${theme.colors.text.muted};

  a {
    display: block;
    margin-top: ${theme.spacing['4']};
    color: ${theme.colors.text.primary};
  }
`;
