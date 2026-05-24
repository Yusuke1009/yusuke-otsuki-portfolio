# Resume & Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 大月雄介の転職用レジュメ & ポートフォリオサイトを React + Vite で構築する。印刷対応レジュメページ（`/resume`）と7ページ構成のポートフォリオを作成する。

**Architecture:** React + Vite SPA。React Router v6 でルーティング。styled-components でスタイリング。コンテンツは `src/data/` の TypeScript 定数ファイルで管理し、コンポーネントと完全に分離する。デザインスタイルは「ライト・エディトリアル」（白背景・セリフ体見出し・サンセリフ本文）。

**Tech Stack:** React 19, TypeScript 5, Vite 6, styled-components v6, React Router v6, Google Fonts (Noto Serif JP + Noto Sans JP)

**Project Root:** `/Users/yusuke.otsuki/Documents/claude-yusuke/project/resume-portfolio/`

**Design Spec:** `docs/design-spec.md`

---

## File Map

```
resume-portfolio/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── public/
│   └── assets/images/        ← プロジェクトサムネイル（後で追加）
└── src/
    ├── main.tsx               ← エントリポイント
    ├── App.tsx                ← Router + ルート定義
    ├── data/
    │   ├── projects.ts        ← Work ページのプロジェクトデータ
    │   ├── resume.ts          ← 職歴・スキル・学歴データ
    │   └── writing.ts         ← 記事リンクデータ
    ├── styles/
    │   ├── theme.ts           ← デザイントークン（色・タイポ・スペーシング等）
    │   └── GlobalStyles.ts    ← CSS リセット + グローバルスタイル + @media print
    ├── components/
    │   ├── layout/
    │   │   ├── Nav.tsx        ← ナビゲーションバー
    │   │   ├── Footer.tsx     ← フッター（著作権表示・連絡先）
    │   │   └── PageLayout.tsx ← Nav + children + Footer のラッパー
    │   └── shared/
    │       ├── Tag.tsx        ← スキルタグ（UX, PdM など）
    │       └── ProjectListItem.tsx ← Work ページの左サムネイル行
    └── pages/
        ├── ResumePage.tsx     ← 印刷対応 2カラムレジュメ
        ├── WorkPage.tsx       ← プロジェクト一覧
        ├── WorkDetailPage.tsx ← 個別ケーススタディ
        ├── HomePage.tsx       ← ステートメント型 Hero
        ├── AboutPage.tsx      ← 自己紹介
        ├── WritingPage.tsx    ← 外部記事リンク集
        └── ContactPage.tsx    ← 連絡先
```

---

## Task 1: プロジェクト初期化

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`

- [ ] **Step 1: Vite プロジェクトを作成する**

```bash
cd /Users/yusuke.otsuki/Documents/claude-yusuke/project/resume-portfolio
npm create vite@latest . -- --template react-ts
```

選択肢が出たら: `React` → `TypeScript`

- [ ] **Step 2: 依存パッケージをインストールする**

```bash
npm install styled-components react-router-dom
npm install -D @types/styled-components
```

- [ ] **Step 3: 不要なボイラープレートを削除する**

```bash
rm -f src/App.css src/assets/react.svg public/vite.svg
```

`src/index.css` の中身を空にする（後で GlobalStyles に置き換える）。

- [ ] **Step 4: `index.html` にフォントを追加する**

`index.html` の `<head>` に追記:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;700&display=swap" rel="stylesheet">
<title>大月 雄介 — Portfolio</title>
```

- [ ] **Step 5: 起動確認**

```bash
npm run dev
```

Expected: `http://localhost:5173` でデフォルトの Vite + React 画面が表示される。

- [ ] **Step 6: Commit**

```bash
git init
git add .
git commit -m "feat: init React + Vite portfolio project"
```

---

## Task 2: デザイントークン + グローバルスタイル

**Files:**
- Create: `src/styles/theme.ts`
- Create: `src/styles/GlobalStyles.ts`
- Modify: `src/main.tsx`

- [ ] **Step 1: `src/styles/theme.ts` を作成する**

```typescript
export const theme = {
  colors: {
    bg: {
      base: '#fafaf8',
      elevated: '#ffffff',
      subtle: '#f3f2f0',
    },
    text: {
      primary: '#111111',
      secondary: '#555555',
      muted: '#999999',
      placeholder: '#cccccc',
    },
    border: {
      default: '#e8e8e2',
      strong: '#111111',
    },
    accent: {
      blue: '#1a56db',
    },
  },
  typography: {
    fontSerif: "'Noto Serif JP', Georgia, serif",
    fontSans: "'Noto Sans JP', 'Helvetica Neue', sans-serif",
    size: {
      xs: '11px',
      sm: '13px',
      base: '15px',
      md: '17px',
      lg: '20px',
      xl: '26px',
      '2xl': '34px',
      '3xl': '48px',
    },
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.6,
      loose: 1.85,
    },
    letterSpacing: {
      tight: '-0.5px',
      normal: '0',
      wide: '2px',
      wider: '3px',
      widest: '4px',
    },
  },
  spacing: {
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '5': '20px',
    '6': '24px',
    '8': '32px',
    '10': '40px',
    '12': '48px',
    '16': '64px',
    '20': '80px',
  },
  radius: {
    sm: '3px',
    md: '6px',
    lg: '10px',
  },
  breakpoints: {
    sm: '600px',
    md: '900px',
    lg: '1200px',
  },
  layout: {
    maxWidth: '1080px',
    navHeight: '56px',
  },
} as const;

export type Theme = typeof theme;
```

- [ ] **Step 2: `src/styles/GlobalStyles.ts` を作成する**

```typescript
import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.typography.fontSans};
    font-size: ${theme.typography.size.base};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.bg.base};
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4 {
    font-family: ${theme.typography.fontSerif};
    font-weight: ${theme.typography.weight.bold};
    line-height: ${theme.typography.lineHeight.tight};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  img {
    display: block;
    max-width: 100%;
  }

  /* Print styles */
  @media print {
    body {
      background: #fff;
      font-size: 11pt;
    }

    nav, footer, .no-print {
      display: none !important;
    }

    a {
      color: inherit;
    }

    @page {
      margin: 15mm 20mm;
      size: A4 portrait;
    }
  }
`;
```

- [ ] **Step 3: `src/main.tsx` に GlobalStyles を適用する**

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { GlobalStyles } from './styles/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 4: 動作確認**

```bash
npm run dev
```

Expected: ページ背景が `#fafaf8`（オフホワイト）になっている。エラーなし。

- [ ] **Step 5: Commit**

```bash
git add src/styles/ src/main.tsx
git commit -m "feat: add design tokens and global styles"
```

---

## Task 3: コンテンツデータファイル

**Files:**
- Create: `src/data/resume.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/writing.ts`

> ⚠️ **注意:** このタスクのデータはプレースホルダーが含まれる（`20XX` など）。実装後にユーザーが実際の情報に書き換える。

- [ ] **Step 1: `src/data/resume.ts` を作成する**

```typescript
export interface Job {
  id: string;
  company: string;
  role: string;
  period: string; // e.g. "2020年4月 – 現在"
  description: string;
  achievements: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Education {
  school: string;
  faculty: string;
  period: string;
}

export interface Publication {
  title: string;
  url: string;
  medium: string; // e.g. "エムスリーテックブログ"
  date: string;
}

export const jobs: Job[] = [
  {
    id: 'm3-dm',
    company: 'エムスリー株式会社',
    role: 'デザインマネージャー / PdM',
    period: '2020年XX月 – 現在',
    description:
      'プロダクトデザイン組織のマネジメント、デザイナー採用・育成、新規プロダクト開発（cloudIC Platform）のプロダクトオーナー兼務。',
    achievements: [
      'デザイン組織の採用基準策定・面接プロセス整備',
      'cloudIC Platform: 入院患者向け動画プラットフォームの PO として立ち上げ（2024–）',
      'デジスマ診療 UIリニューアル: 事業指標XXX%改善',
      'm3.com デザインシステム構築（33万医師プラットフォーム）',
    ],
  },
  {
    id: 'prev-1',
    company: '株式会社◯◯◯◯',
    role: 'UIデザイナー',
    period: '20XX年XX月 – 2020年XX月',
    description: '（前職の説明を記入してください）',
    achievements: [
      '（実績を記入してください）',
    ],
  },
];

export const skills: Skill[] = [
  {
    category: 'デザイン',
    items: ['UI/UX Design', 'Figma', 'Design System', 'プロトタイピング', 'ユーザーリサーチ'],
  },
  {
    category: 'プロダクト',
    items: ['PdM / PO', 'PRD作成', 'ロードマップ策定', 'アジャイル開発'],
  },
  {
    category: 'マネジメント',
    items: ['チームマネジメント', 'デザイナー採用', '1on1', '評価設計'],
  },
  {
    category: 'テクノロジー',
    items: ['React', 'TypeScript', 'styled-components', 'HTML/CSS'],
  },
  {
    category: 'ドメイン',
    items: ['医療IT', '高齢者UX', 'SaaS', 'B2B/B2C'],
  },
];

export const education: Education[] = [
  {
    school: '◯◯大学',
    faculty: '◯◯学部 ◯◯学科',
    period: '20XX年 – 20XX年',
  },
];

export const publications: Publication[] = [
  {
    title: '成功するキックオフの視点',
    url: 'https://www.m3tech.blog/entry/kickoff',
    medium: 'エムスリーテックブログ',
    date: '2023年3月',
  },
  {
    title: '明日からできる、爆速Figma活用術',
    url: 'https://www.m3tech.blog/entry/figma-tips',
    medium: 'エムスリーテックブログ',
    date: '2023年2月',
  },
  {
    title: 'デジスマ診療における事業貢献に繋がるデザインリニューアルの取り組み方',
    url: 'https://cocoda.design/m3',
    medium: 'Cocoda',
    date: '2022年',
  },
];

export const contact = {
  email: 'yusuke-otsuki@m3.com',
  linkedin: '', // LinkedIn URL を追加してください
  twitter: '',  // X(Twitter) URL を追加してください
  location: '東京都',
};
```

- [ ] **Step 2: `src/data/projects.ts` を作成する**

```typescript
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  tags: string[];
  thumbnail: string; // public/assets/images/ 以下のパス
  overview: string;
  challenge: string;
  process: string[];
  outcome: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'cloudic-platform',
    title: 'cloudIC Platform',
    subtitle: '入院患者向け動画プラットフォーム',
    period: '2024',
    tags: ['UX Design', 'PdM', '高齢者UX'],
    thumbnail: '/assets/images/cloudic-thumb.png',
    overview:
      '入院患者が高額療養費・介護認定などの手続き情報や院内エンタメ動画にアクセスできるプラットフォーム。PO兼デザイナーとして立ち上げから担当。',
    challenge:
      '高齢者ユーザーが多く、3タップ以内での動画再生到達・最小フォントサイズ20pt等の厳しいアクセシビリティ要件を満たしながら、医療機関のニーズにも応える必要があった。',
    process: [
      '患者・医療スタッフへのユーザーインタビュー（10名）',
      'ジャーニーマップ作成・課題定義',
      'プロトタイプ→院内テスト→反復設計（4スプリント）',
      'React + TypeScript による MVP 実装',
    ],
    outcome: '（実績数値を記入してください）',
    featured: true,
  },
  {
    id: 'digisma-renewal',
    title: 'デジスマ診療 UIリニューアル',
    subtitle: 'クリニック向け診療支援システム',
    period: '2022',
    tags: ['UI/UX', 'SaaS', 'B2B'],
    thumbnail: '/assets/images/digisma-thumb.png',
    overview:
      'クリニック向け診療支援SaaSのUIリニューアル。医師・スタッフの業務フローを再設計し、事業指標の改善に直結させた。',
    challenge: '（課題を記入してください）',
    process: [
      '（プロセスを記入してください）',
    ],
    outcome: '（実績数値を記入してください）',
    featured: false,
  },
  {
    id: 'm3-design-system',
    title: 'm3.com デザインシステム',
    subtitle: '33万医師プラットフォームの設計基盤',
    period: '2021',
    tags: ['Design System', 'Figma', 'UI'],
    thumbnail: '/assets/images/ds-thumb.png',
    overview:
      '国内最大の医師向けプラットフォーム m3.com のデザインシステムを構築。複数プロダクト間のUI一貫性と開発速度の向上を実現。',
    challenge: '（課題を記入してください）',
    process: [
      '（プロセスを記入してください）',
    ],
    outcome: '（実績を記入してください）',
    featured: false,
  },
];
```

- [ ] **Step 3: `src/data/writing.ts` を作成する**

```typescript
export interface Article {
  id: string;
  title: string;
  url: string;
  medium: string;
  date: string;
  description: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    id: 'kickoff',
    title: '成功するキックオフの視点',
    url: 'https://www.m3tech.blog/entry/kickoff',
    medium: 'エムスリーテックブログ',
    date: '2023年3月',
    description: 'アジャイル開発におけるキックオフの設計——打ち上げ角度・可能性拡張・収束の3軸で考える。',
    tags: ['プロセス設計', 'アジャイル'],
  },
  {
    id: 'figma-tips',
    title: '明日からできる、爆速Figma活用術',
    url: 'https://www.m3tech.blog/entry/figma-tips',
    medium: 'エムスリーテックブログ',
    date: '2023年2月',
    description: '組織構造・オートレイアウト・自動化の3軸でFigmaの作業速度を大幅に上げるTips集。',
    tags: ['Figma', 'ツール活用'],
  },
  {
    id: 'digisma-case',
    title: 'デジスマ診療における事業貢献に繋がるデザインリニューアルの取り組み方',
    url: 'https://cocoda.design/m3',
    medium: 'Cocoda',
    date: '2022年',
    description: 'UX・UIリニューアルが事業指標に与えたインパクトの事例解説。',
    tags: ['ケーススタディ', 'UX', '事業貢献'],
  },
];
```

- [ ] **Step 4: TypeScript コンパイルエラーがないか確認**

```bash
npm run build
```

Expected: エラーなしでビルドが通る。

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add content data files (resume, projects, writing)"
```

---

## Task 4: レイアウトコンポーネント

**Files:**
- Create: `src/components/layout/Nav.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/PageLayout.tsx`

- [ ] **Step 1: `src/components/layout/Nav.tsx` を作成する**

```typescript
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { theme } from '../../styles/theme';

const NavLinks = [
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Resume', path: '/resume' },
  { label: 'Writing', path: '/writing' },
];

export function Nav() {
  const { pathname } = useLocation();
  return (
    <NavBar className="no-print">
      <Inner>
        <Logo to="/">大月 雄介</Logo>
        <Links>
          {NavLinks.map(({ label, path }) => (
            <NavLink key={path} to={path} $active={pathname.startsWith(path)}>
              {label}
            </NavLink>
          ))}
        </Links>
      </Inner>
    </NavBar>
  );
}

const NavBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${theme.colors.bg.base};
  border-bottom: 1px solid ${theme.colors.border.default};
  height: ${theme.layout.navHeight};
`;

const Inner = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.spacing['6']};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size.base};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.text.primary};
`;

const Links = styled.nav`
  display: flex;
  gap: ${theme.spacing['6']};
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${({ $active }) =>
    $active ? theme.colors.text.primary : theme.colors.text.muted};
  border-bottom: ${({ $active }) =>
    $active ? `1px solid ${theme.colors.text.primary}` : '1px solid transparent'};
  padding-bottom: 2px;
  transition: color 150ms ease;

  &:hover {
    color: ${theme.colors.text.primary};
  }
`;
```

- [ ] **Step 2: `src/components/layout/Footer.tsx` を作成する**

```typescript
import styled from 'styled-components';
import { theme } from '../../styles/theme';

export function Footer() {
  return (
    <FooterEl className="no-print">
      <Inner>
        <span>© 2026 大月 雄介</span>
        <span>yusuke-otsuki@m3.com</span>
      </Inner>
    </FooterEl>
  );
}

const FooterEl = styled.footer`
  border-top: 1px solid ${theme.colors.border.default};
  margin-top: ${theme.spacing['20']};
`;

const Inner = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${theme.spacing['6']};
  display: flex;
  justify-content: space-between;
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;
```

- [ ] **Step 3: `src/components/layout/PageLayout.tsx` を作成する**

```typescript
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { theme } from '../../styles/theme';

interface PageLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function PageLayout({ children, hideNav = false }: PageLayoutProps) {
  return (
    <Wrapper>
      {!hideNav && <Nav />}
      <Main>
        <Inner>{children}</Inner>
      </Main>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

const Inner = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${theme.spacing['12']} ${theme.spacing['6']};

  @media print {
    padding: 0;
    max-width: none;
  }
`;
```

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/
git commit -m "feat: add Nav, Footer, PageLayout components"
```

---

## Task 5: 共有コンポーネント

**Files:**
- Create: `src/components/shared/Tag.tsx`
- Create: `src/components/shared/ProjectListItem.tsx`

- [ ] **Step 1: `src/components/shared/Tag.tsx` を作成する**

```typescript
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return <TagEl>{label}</TagEl>;
}

const TagEl = styled.span`
  display: inline-block;
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.radius.sm};
  padding: 2px 8px;
  letter-spacing: ${theme.typography.letterSpacing.normal};
`;
```

- [ ] **Step 2: `src/components/shared/ProjectListItem.tsx` を作成する**

```typescript
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Project } from '../../data/projects';
import { Tag } from './Tag';
import { theme } from '../../styles/theme';

interface ProjectListItemProps {
  project: Project;
}

export function ProjectListItem({ project }: ProjectListItemProps) {
  return (
    <Item to={`/work/${project.id}`}>
      <Thumbnail>
        <img src={project.thumbnail} alt={project.title} onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }} />
      </Thumbnail>
      <Content>
        <Title>{project.title}</Title>
        <Subtitle>{project.subtitle}</Subtitle>
        <Tags>
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </Tags>
      </Content>
      <Year>{project.period} →</Year>
    </Item>
  );
}

const Item = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing['5']};
  padding: ${theme.spacing['5']} 0;
  border-bottom: 1px solid ${theme.colors.border.default};
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.7;
  }
`;

const Thumbnail = styled.div`
  width: 72px;
  height: 48px;
  border-radius: ${theme.radius.sm};
  background: ${theme.colors.bg.subtle};
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size.md};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing['1']};
`;

const Subtitle = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.muted};
  margin-bottom: ${theme.spacing['2']};
`;

const Tags = styled.div`
  display: flex;
  gap: ${theme.spacing['1']};
  flex-wrap: wrap;
`;

const Year = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.placeholder};
  white-space: nowrap;
`;
```

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/
git commit -m "feat: add Tag and ProjectListItem shared components"
```

---

## Task 6: Resume ページ（印刷対応）

**Files:**
- Create: `src/pages/ResumePage.tsx`

- [ ] **Step 1: `src/pages/ResumePage.tsx` を作成する**

```typescript
import styled from 'styled-components';
import { jobs, skills, education, publications, contact } from '../data/resume';
import { theme } from '../styles/theme';

export function ResumePage() {
  return (
    <ResumeWrapper>
      {/* Header */}
      <ResumeHeader>
        <NameBlock>
          <Name>大月 雄介</Name>
          <RoleTitle>Design Manager · PdM</RoleTitle>
        </NameBlock>
        <ContactBlock>
          <ContactLine>{contact.email}</ContactLine>
          <ContactLine>{contact.location}</ContactLine>
          {contact.linkedin && <ContactLine>{contact.linkedin}</ContactLine>}
        </ContactBlock>
      </ResumeHeader>

      {/* Body: 2-column */}
      <ResumeBody>
        {/* Left sidebar */}
        <Sidebar>
          <Section>
            <SectionLabel>スキル</SectionLabel>
            {skills.map((group) => (
              <SkillGroup key={group.category}>
                <SkillCategory>{group.category}</SkillCategory>
                <SkillList>{group.items.join(' · ')}</SkillList>
              </SkillGroup>
            ))}
          </Section>

          <Section>
            <SectionLabel>言語</SectionLabel>
            <SkillList>日本語（母国語）</SkillList>
            <SkillList>英語（読み書き）</SkillList>
          </Section>

          {education.length > 0 && (
            <Section>
              <SectionLabel>学歴</SectionLabel>
              {education.map((edu) => (
                <div key={edu.school}>
                  <SkillList>{edu.school}</SkillList>
                  <SkillList>{edu.faculty}</SkillList>
                  <SkillList style={{ color: theme.colors.text.muted }}>{edu.period}</SkillList>
                </div>
              ))}
            </Section>
          )}
        </Sidebar>

        {/* Right main */}
        <MainCol>
          <Section>
            <SectionLabel>職歴</SectionLabel>
            {jobs.map((job) => (
              <JobItem key={job.id}>
                <JobHeader>
                  <JobTitle>{job.company} — {job.role}</JobTitle>
                  <JobPeriod>{job.period}</JobPeriod>
                </JobHeader>
                <JobDesc>{job.description}</JobDesc>
                {job.achievements.length > 0 && (
                  <Achievements>
                    {job.achievements.map((a, i) => (
                      <Achievement key={i}>• {a}</Achievement>
                    ))}
                  </Achievements>
                )}
              </JobItem>
            ))}
          </Section>

          {publications.length > 0 && (
            <Section>
              <SectionLabel>発信・執筆</SectionLabel>
              {publications.map((pub) => (
                <PubItem key={pub.title}>
                  <PubTitle>{pub.title}</PubTitle>
                  <PubMeta>{pub.medium} · {pub.date}</PubMeta>
                </PubItem>
              ))}
            </Section>
          )}
        </MainCol>
      </ResumeBody>

      <PrintNote className="no-print">
        <span>Cmd+P（Mac）または Ctrl+P（Windows）でPDF保存できます</span>
      </PrintNote>
    </ResumeWrapper>
  );
}

const ResumeWrapper = styled.div`
  background: ${theme.colors.bg.elevated};
  max-width: 860px;
  margin: ${theme.spacing['8']} auto;
  padding: ${theme.spacing['10']};
  border: 1px solid ${theme.colors.border.default};

  @media print {
    margin: 0;
    padding: 0;
    border: none;
    max-width: none;
  }
`;

const ResumeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid ${theme.colors.border.strong};
  padding-bottom: ${theme.spacing['5']};
  margin-bottom: ${theme.spacing['6']};
`;

const NameBlock = styled.div``;

const Name = styled.h1`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size['2xl']};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing['1']};
`;

const RoleTitle = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;

const ContactBlock = styled.div`
  text-align: right;
`;

const ContactLine = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.loose};
`;

const ResumeBody = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: ${theme.spacing['8']};
`;

const Sidebar = styled.aside`
  border-right: 1px solid ${theme.colors.border.default};
  padding-right: ${theme.spacing['6']};
`;

const MainCol = styled.div``;

const Section = styled.section`
  margin-bottom: ${theme.spacing['6']};
`;

const SectionLabel = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['3']};
`;

const SkillGroup = styled.div`
  margin-bottom: ${theme.spacing['3']};
`;

const SkillCategory = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  font-weight: ${theme.typography.weight.medium};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing['1']};
`;

const SkillList = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.loose};
`;

const JobItem = styled.div`
  margin-bottom: ${theme.spacing['6']};
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: ${theme.spacing['2']};
`;

const JobTitle = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.base};
  font-weight: ${theme.typography.weight.medium};
  color: ${theme.colors.text.primary};
`;

const JobPeriod = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  white-space: nowrap;
`;

const JobDesc = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.normal};
  margin-bottom: ${theme.spacing['2']};
`;

const Achievements = styled.ul`
  list-style: none;
`;

const Achievement = styled.li`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.loose};
`;

const PubItem = styled.div`
  margin-bottom: ${theme.spacing['3']};
`;

const PubTitle = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.primary};
  margin-bottom: 2px;
`;

const PubMeta = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
`;

const PrintNote = styled.div`
  margin-top: ${theme.spacing['6']};
  padding-top: ${theme.spacing['4']};
  border-top: 1px solid ${theme.colors.border.default};
  text-align: center;
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
`;
```

- [ ] **Step 2: `src/App.tsx` に暫定ルーティングを追加してResumeを確認できるようにする**

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { ResumePage } from './pages/ResumePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout><div>Home (coming soon)</div></PageLayout>} />
        <Route path="/resume" element={<PageLayout><ResumePage /></PageLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 3: ブラウザで確認する**

```bash
npm run dev
```

`http://localhost:5173/resume` を開く。
Expected:
- 2カラムレイアウト（左: スキル、右: 職歴）が表示される
- 上部に「大月 雄介」の名前とロール
- `Cmd+P` でA4縦のPDFプレビューが出てナビバーが消える

- [ ] **Step 4: Commit**

```bash
git add src/pages/ResumePage.tsx src/App.tsx
git commit -m "feat: add print-ready 2-column Resume page"
```

---

## Task 7: Work ページ

**Files:**
- Create: `src/pages/WorkPage.tsx`
- Create: `src/pages/WorkDetailPage.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: `src/pages/WorkPage.tsx` を作成する**

```typescript
import styled from 'styled-components';
import { projects } from '../data/projects';
import { ProjectListItem } from '../components/shared/ProjectListItem';
import { theme } from '../styles/theme';

export function WorkPage() {
  return (
    <div>
      <PageHeader>
        <Label>Work</Label>
        <Heading>Projects</Heading>
        <SubHeading>デザイン・プロダクト開発の主な実績</SubHeading>
      </PageHeader>
      <Divider />
      <List>
        {projects.map((project) => (
          <ProjectListItem key={project.id} project={project} />
        ))}
      </List>
    </div>
  );
}

const PageHeader = styled.div`
  margin-bottom: ${theme.spacing['8']};
`;

const Label = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['3']};
`;

const Heading = styled.h1`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size['2xl']};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing['3']};
`;

const SubHeading = styled.p`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.text.secondary};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.border.default};
  margin-bottom: ${theme.spacing['4']};
`;

const List = styled.div``;
```

- [ ] **Step 2: `src/pages/WorkDetailPage.tsx` を作成する**

```typescript
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { Tag } from '../components/shared/Tag';
import { theme } from '../styles/theme';

export function WorkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <NotFound>
        <p>プロジェクトが見つかりません。</p>
        <Link to="/work">← Work に戻る</Link>
      </NotFound>
    );
  }

  return (
    <div>
      <BackLink to="/work">← Work</BackLink>
      <Header>
        <Label>{project.period}</Label>
        <Title>{project.title}</Title>
        <Subtitle>{project.subtitle}</Subtitle>
        <Tags>
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </Tags>
      </Header>

      <Body>
        <Section>
          <SectionTitle>概要</SectionTitle>
          <Text>{project.overview}</Text>
        </Section>
        <Section>
          <SectionTitle>課題</SectionTitle>
          <Text>{project.challenge}</Text>
        </Section>
        <Section>
          <SectionTitle>プロセス</SectionTitle>
          <ProcessList>
            {project.process.map((step, i) => (
              <ProcessItem key={i}>{step}</ProcessItem>
            ))}
          </ProcessList>
        </Section>
        <Section>
          <SectionTitle>成果</SectionTitle>
          <Text>{project.outcome}</Text>
        </Section>
      </Body>
    </div>
  );
}

const BackLink = styled(Link)`
  display: inline-block;
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.muted};
  margin-bottom: ${theme.spacing['6']};
  transition: color 150ms ease;
  &:hover { color: ${theme.colors.text.primary}; }
`;

const Header = styled.div`
  margin-bottom: ${theme.spacing['10']};
`;

const Label = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['2']};
`;

const Title = styled.h1`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size['2xl']};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing['2']};
`;

const Subtitle = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.md};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing['4']};
`;

const Tags = styled.div`
  display: flex;
  gap: ${theme.spacing['2']};
  flex-wrap: wrap;
`;

const Body = styled.div`
  max-width: 680px;
`;

const Section = styled.section`
  margin-bottom: ${theme.spacing['10']};
`;

const SectionTitle = styled.h2`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['4']};
`;

const Text = styled.p`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.loose};
`;

const ProcessList = styled.ol`
  list-style: none;
  counter-reset: process;
`;

const ProcessItem = styled.li`
  counter-increment: process;
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.loose};
  padding: ${theme.spacing['3']} 0;
  border-bottom: 1px solid ${theme.colors.border.default};
  display: flex;
  gap: ${theme.spacing['4']};

  &::before {
    content: counter(process, decimal-leading-zero);
    font-family: ${theme.typography.fontSans};
    font-size: ${theme.typography.size.xs};
    color: ${theme.colors.text.muted};
    flex-shrink: 0;
    padding-top: 3px;
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: ${theme.spacing['20']};
  font-family: ${theme.typography.fontSans};
  color: ${theme.colors.text.muted};
  a {
    display: block;
    margin-top: ${theme.spacing['4']};
    color: ${theme.colors.text.primary};
  }
`;
```

- [ ] **Step 3: `src/App.tsx` にルートを追加する**

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { ResumePage } from './pages/ResumePage';
import { WorkPage } from './pages/WorkPage';
import { WorkDetailPage } from './pages/WorkDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout><div>Home (coming soon)</div></PageLayout>} />
        <Route path="/work" element={<PageLayout><WorkPage /></PageLayout>} />
        <Route path="/work/:id" element={<PageLayout><WorkDetailPage /></PageLayout>} />
        <Route path="/resume" element={<PageLayout><ResumePage /></PageLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 4: ブラウザで確認する**

`http://localhost:5173/work` を開く。
Expected: プロジェクトが左サムネイル付きのリストで3件表示される。クリックすると `/work/cloudic-platform` に遷移してケーススタディが表示される。

- [ ] **Step 5: Commit**

```bash
git add src/pages/WorkPage.tsx src/pages/WorkDetailPage.tsx src/App.tsx
git commit -m "feat: add Work list and Work detail pages"
```

---

## Task 8: Home ページ

**Files:**
- Create: `src/pages/HomePage.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: `src/pages/HomePage.tsx` を作成する**

```typescript
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { ProjectListItem } from '../components/shared/ProjectListItem';
import { theme } from '../styles/theme';

const CATCH_COPY = '医療に、デザインの力を。';
const DESCRIPTION = 'エムスリーでプロダクトデザインとチームを7年間リードしてきました。';

export function HomePage() {
  const featuredProjects = projects.slice(0, 3);
  return (
    <div>
      {/* Hero */}
      <Hero>
        <HeroLabel>Design Manager · PdM</HeroLabel>
        <HeroCopy>{CATCH_COPY}</HeroCopy>
        <HeroDesc>{DESCRIPTION}</HeroDesc>
        <HeroActions>
          <ButtonOutline to="/work">仕事を見る →</ButtonOutline>
          <ButtonSolid to="/resume">Resume PDF</ButtonSolid>
        </HeroActions>
      </Hero>

      {/* Featured Work */}
      <FeaturedSection>
        <FeaturedHeader>
          <FeaturedLabel>Featured Work</FeaturedLabel>
          <FeaturedLink to="/work">すべて見る →</FeaturedLink>
        </FeaturedHeader>
        <Divider />
        {featuredProjects.map((project) => (
          <ProjectListItem key={project.id} project={project} />
        ))}
      </FeaturedSection>
    </div>
  );
}

const Hero = styled.section`
  padding: ${theme.spacing['20']} 0 ${theme.spacing['16']};
  border-bottom: 1px solid ${theme.colors.border.default};
  margin-bottom: ${theme.spacing['12']};
`;

const HeroLabel = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['4']};
`;

const HeroCopy = styled.h1`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size['3xl']};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.text.primary};
  letter-spacing: ${theme.typography.letterSpacing.tight};
  line-height: ${theme.typography.lineHeight.tight};
  margin-bottom: ${theme.spacing['5']};

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.size['2xl']};
  }
`;

const HeroDesc = styled.p`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.normal};
  margin-bottom: ${theme.spacing['8']};
  max-width: 480px;
`;

const HeroActions = styled.div`
  display: flex;
  gap: ${theme.spacing['3']};
`;

const ButtonOutline = styled(Link)`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.muted};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.radius.sm};
  padding: ${theme.spacing['3']} ${theme.spacing['5']};
  transition: border-color 150ms ease, color 150ms ease;

  &:hover {
    border-color: ${theme.colors.text.primary};
    color: ${theme.colors.text.primary};
  }
`;

const ButtonSolid = styled(Link)`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  font-weight: ${theme.typography.weight.medium};
  color: ${theme.colors.bg.base};
  background: ${theme.colors.text.primary};
  border: 1px solid ${theme.colors.text.primary};
  border-radius: ${theme.radius.sm};
  padding: ${theme.spacing['3']} ${theme.spacing['5']};
  transition: opacity 150ms ease;

  &:hover { opacity: 0.8; }
`;

const FeaturedSection = styled.section``;

const FeaturedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing['4']};
`;

const FeaturedLabel = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
`;

const FeaturedLink = styled(Link)`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  transition: color 150ms ease;
  &:hover { color: ${theme.colors.text.primary}; }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.border.default};
  margin-bottom: ${theme.spacing['2']};
`;
```

- [ ] **Step 2: `src/App.tsx` を更新する**

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { ResumePage } from './pages/ResumePage';
import { WorkPage } from './pages/WorkPage';
import { WorkDetailPage } from './pages/WorkDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
        <Route path="/work" element={<PageLayout><WorkPage /></PageLayout>} />
        <Route path="/work/:id" element={<PageLayout><WorkDetailPage /></PageLayout>} />
        <Route path="/resume" element={<PageLayout><ResumePage /></PageLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 3: ブラウザで確認する**

`http://localhost:5173/` を開く。
Expected: 大きなキャッチコピー「医療に、デザインの力を。」が表示され、下にプロジェクトリストが続く。「Resume PDF」ボタンが `/resume` にリンクされている。

- [ ] **Step 4: Commit**

```bash
git add src/pages/HomePage.tsx src/App.tsx
git commit -m "feat: add Home page with hero and featured projects"
```

---

## Task 9: About / Writing / Contact ページ

**Files:**
- Create: `src/pages/AboutPage.tsx`
- Create: `src/pages/WritingPage.tsx`
- Create: `src/pages/ContactPage.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: `src/pages/AboutPage.tsx` を作成する**

```typescript
import styled from 'styled-components';
import { theme } from '../styles/theme';

export function AboutPage() {
  return (
    <div>
      <PageHeader>
        <Label>About</Label>
        <Heading>大月 雄介について</Heading>
      </PageHeader>

      <Body>
        <Lead>
          医療とデジタルの交差点で、プロダクトとチームを同時に動かしています。
        </Lead>

        <Section>
          <SectionTitle>仕事のスタイル</SectionTitle>
          <Text>
            {/* ここに自己紹介を記入してください */}
            デザインをビジネスの道具として使う——そのために、ユーザーの声とデータと事業の文脈を繋ぎ合わせることを大切にしています。PdMを兼務することで、「作るだけ」ではなく「なぜ作るか」から問い直せるポジションを意識的に選んできました。
          </Text>
        </Section>

        <Section>
          <SectionTitle>医療を選んだ理由</SectionTitle>
          <Text>
            {/* 背景ストーリーを記入してください */}
            （あなたの言葉で書いてください）
          </Text>
        </Section>

        <Section>
          <SectionTitle>チームについて</SectionTitle>
          <Text>
            {/* マネジメントのフィロソフィーを記入してください */}
            （あなたの言葉で書いてください）
          </Text>
        </Section>
      </Body>
    </div>
  );
}

const PageHeader = styled.div`
  margin-bottom: ${theme.spacing['10']};
`;

const Label = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['3']};
`;

const Heading = styled.h1`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size['2xl']};
  color: ${theme.colors.text.primary};
`;

const Body = styled.div`
  max-width: 640px;
`;

const Lead = styled.p`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size.lg};
  color: ${theme.colors.text.primary};
  line-height: ${theme.typography.lineHeight.normal};
  margin-bottom: ${theme.spacing['10']};
  border-bottom: 1px solid ${theme.colors.border.default};
  padding-bottom: ${theme.spacing['8']};
`;

const Section = styled.section`
  margin-bottom: ${theme.spacing['8']};
`;

const SectionTitle = styled.h2`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['4']};
`;

const Text = styled.p`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.loose};
`;
```

- [ ] **Step 2: `src/pages/WritingPage.tsx` を作成する**

```typescript
import styled from 'styled-components';
import { articles } from '../data/writing';
import { Tag } from '../components/shared/Tag';
import { theme } from '../styles/theme';

export function WritingPage() {
  return (
    <div>
      <PageHeader>
        <Label>Writing</Label>
        <Heading>記事・発信</Heading>
        <SubHeading>テックブログ・Cocoda などへの寄稿</SubHeading>
      </PageHeader>
      <Divider />
      <List>
        {articles.map((article) => (
          <ArticleItem key={article.id} href={article.url} target="_blank" rel="noopener noreferrer">
            <ArticleContent>
              <ArticleTitle>{article.title}</ArticleTitle>
              <ArticleMeta>{article.medium} · {article.date}</ArticleMeta>
              <ArticleDesc>{article.description}</ArticleDesc>
              <Tags>
                {article.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </Tags>
            </ArticleContent>
            <Arrow>↗</Arrow>
          </ArticleItem>
        ))}
      </List>
    </div>
  );
}

const PageHeader = styled.div`
  margin-bottom: ${theme.spacing['8']};
`;

const Label = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['3']};
`;

const Heading = styled.h1`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size['2xl']};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing['3']};
`;

const SubHeading = styled.p`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.text.secondary};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.border.default};
  margin-bottom: ${theme.spacing['2']};
`;

const List = styled.div``;

const ArticleItem = styled.a`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing['4']};
  padding: ${theme.spacing['6']} 0;
  border-bottom: 1px solid ${theme.colors.border.default};
  transition: opacity 150ms ease;
  &:hover { opacity: 0.7; }
`;

const ArticleContent = styled.div`
  flex: 1;
`;

const ArticleTitle = styled.div`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size.md};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing['1']};
`;

const ArticleMeta = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  margin-bottom: ${theme.spacing['2']};
`;

const ArticleDesc = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.normal};
  margin-bottom: ${theme.spacing['3']};
`;

const Tags = styled.div`
  display: flex;
  gap: ${theme.spacing['1']};
  flex-wrap: wrap;
`;

const Arrow = styled.div`
  font-size: ${theme.typography.size.md};
  color: ${theme.colors.text.muted};
  flex-shrink: 0;
  padding-top: 2px;
`;
```

- [ ] **Step 3: `src/pages/ContactPage.tsx` を作成する**

```typescript
import styled from 'styled-components';
import { contact } from '../data/resume';
import { theme } from '../styles/theme';

export function ContactPage() {
  return (
    <div>
      <PageHeader>
        <Label>Contact</Label>
        <Heading>連絡先</Heading>
      </PageHeader>

      <Body>
        <ContactItem>
          <ContactLabel>Email</ContactLabel>
          <ContactValue href={`mailto:${contact.email}`}>{contact.email}</ContactValue>
        </ContactItem>
        {contact.linkedin && (
          <ContactItem>
            <ContactLabel>LinkedIn</ContactLabel>
            <ContactValue href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              {contact.linkedin}
            </ContactValue>
          </ContactItem>
        )}
        {contact.twitter && (
          <ContactItem>
            <ContactLabel>X (Twitter)</ContactLabel>
            <ContactValue href={contact.twitter} target="_blank" rel="noopener noreferrer">
              {contact.twitter}
            </ContactValue>
          </ContactItem>
        )}
        <ContactItem>
          <ContactLabel>Location</ContactLabel>
          <ContactText>{contact.location}</ContactText>
        </ContactItem>
      </Body>
    </div>
  );
}

const PageHeader = styled.div`
  margin-bottom: ${theme.spacing['10']};
`;

const Label = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['3']};
`;

const Heading = styled.h1`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size['2xl']};
  color: ${theme.colors.text.primary};
`;

const Body = styled.div`
  max-width: 480px;
`;

const ContactItem = styled.div`
  display: flex;
  gap: ${theme.spacing['6']};
  padding: ${theme.spacing['5']} 0;
  border-bottom: 1px solid ${theme.colors.border.default};
  align-items: center;
`;

const ContactLabel = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  width: 80px;
  flex-shrink: 0;
`;

const ContactValue = styled.a`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.text.primary};
  transition: opacity 150ms ease;
  &:hover { opacity: 0.6; }
`;

const ContactText = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.text.secondary};
`;
```

- [ ] **Step 4: `src/App.tsx` を最終版に更新する**

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { WorkDetailPage } from './pages/WorkDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ResumePage } from './pages/ResumePage';
import { WritingPage } from './pages/WritingPage';
import { ContactPage } from './pages/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
        <Route path="/work" element={<PageLayout><WorkPage /></PageLayout>} />
        <Route path="/work/:id" element={<PageLayout><WorkDetailPage /></PageLayout>} />
        <Route path="/about" element={<PageLayout><AboutPage /></PageLayout>} />
        <Route path="/resume" element={<PageLayout><ResumePage /></PageLayout>} />
        <Route path="/writing" element={<PageLayout><WritingPage /></PageLayout>} />
        <Route path="/contact" element={<PageLayout><ContactPage /></PageLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 5: 全ページをブラウザで確認する**

```bash
npm run dev
```

以下を確認:
- `/` — Hero + プロジェクトリスト
- `/work` — プロジェクト一覧（左サムネイル付き）
- `/work/cloudic-platform` — ケーススタディ詳細
- `/about` — 自己紹介ページ
- `/resume` — 2カラムレジュメ（Cmd+Pで印刷可）
- `/writing` — 記事リスト（外部リンク）
- `/contact` — 連絡先

- [ ] **Step 6: ビルドエラーがないか確認**

```bash
npm run build
```

Expected: エラーなし。

- [ ] **Step 7: Commit**

```bash
git add src/pages/AboutPage.tsx src/pages/WritingPage.tsx src/pages/ContactPage.tsx src/App.tsx
git commit -m "feat: add About, Writing, Contact pages and wire all routes"
```

---

## コンテンツ入力チェックリスト（実装後）

実装完了後、`src/data/` の各ファイルを開いて以下を埋める:

- [ ] `resume.ts` — `jobs[1]` の前職情報（会社名・期間・担当内容）
- [ ] `resume.ts` — `education` の学校名・学部
- [ ] `resume.ts` — `contact.linkedin` と `contact.twitter` の URL
- [ ] `resume.ts` — キャッチコピー `CATCH_COPY`（`HomePage.tsx`）を最終決定
- [ ] `projects.ts` — 各プロジェクトの `challenge` / `process` / `outcome` を実際の内容に書き換え
- [ ] `public/assets/images/` にプロジェクトサムネイル画像を追加
- [ ] `pages/AboutPage.tsx` の自己紹介テキストを自分の言葉で書き直す

---

## 検証方法

1. `npm run dev` で全ページを開いて目視確認
2. `/resume` で `Cmd+P` → PDF プレビューを確認（A4縦、ナビなし、背景なし）
3. `npm run build` でエラーなし
4. モバイル幅（375px）でレイアウト崩れがないか確認
