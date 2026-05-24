# Resume / Portfolio — 大月 雄介

React + TypeScript + Vite で作っているレジュメ兼ポートフォリオサイト。

## 開発

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 型チェック + 本番ビルド
npm run lint
npm run preview  # ビルド結果のプレビュー
```

## プロジェクト構成

```
.
├── src/
│   ├── App.tsx              # ルーティング
│   ├── main.tsx             # エントリ
│   ├── pages/               # 各ページコンポーネント (Home / About / Resume / Work / WorkDetail / Writing / Contact)
│   ├── components/
│   │   ├── layout/          # Nav / Footer / PageLayout
│   │   ├── hero/            # HeroGrid (トップ)
│   │   ├── moon/            # 3D Moon・月の満ち欠け表現
│   │   ├── work/            # Worksセクションのレイアウト
│   │   ├── shared/          # Lightbox / ProjectListItem / Tag
│   │   └── dividers/        # PhaseDivider
│   ├── content/
│   │   └── works/           # 各プロジェクトの本文 (Markdown, 手動編集)
│   ├── data/                # career / projects / resume / writing の構造化データ
│   ├── lib/                 # ScrollToTop / useLenis / useScrollProgress
│   └── styles/              # GlobalStyles / theme (styled-components)
├── public/                  # favicon, icons, 画像アセット
├── docs/
│   ├── design-spec.md       # デザイン仕様
│   ├── dev-screenshots/     # 開発中スクショ履歴
│   ├── references/          # 参考デザイン画像
│   └── superpowers/         # 補助ドキュメント
├── dist/                    # ビルド成果物 (生成物, gitignore)
└── .playwright-mcp/         # Playwright MCP の作業ファイル (gitignore)
```

## Works (詳細ページ) の編集

`src/content/works/*.md` を手で書き換える。読み込みは `src/data/loadProjects.ts` 経由で
`src/data/projects.ts` の構造化データとマージされる。

## ファイル整理ルール

- ルートに `*.png` などのスクショや画像を置かない（`.gitignore` で除外済み）
  - 開発中のスクショは `docs/dev-screenshots/`
  - 参考デザインは `docs/references/`
- Playwright MCP が生成する一時ファイルは `.playwright-mcp/` に隔離（gitignore対象）

## 主要ライブラリ

- React 19 + React Router 7
- Three.js / @react-three/fiber / drei / postprocessing — 月の3D演出
- GSAP — アニメーション
- Lenis — スムーズスクロール
- styled-components — スタイリング
