# レジュメ & ポートフォリオ — デザイン仕様書

作成日: 2026-05-12
ステータス: **設計完了 / 実装待ち**

---

## 目的

大月雄介（Yusuke Otsuki）の転職用レジュメ & ポートフォリオサイトを構築する。
採用担当への送付・自己PRを目的とし、日本語版を先行リリース、英語版は後から追加。

---

## ターゲット

- Google（プロダクト系）
- 国内スタートアップ — Design Lead / Head of Design
- 大手事業会社のデザイン組織（リクルート、メルカリ等）

---

## デザインスタイル

**ライト・エディトリアル**

- 背景: オフホワイト（`#fafaf8`）
- 見出し: セリフ体（Georgia / Noto Serif JP）
- 本文: サンセリフ（Helvetica Neue / Noto Sans JP）
- アクセント: ブラック（`#111`）+ ライトグレーボーダー（`#e8e8e2`）
- トーン: 知性・温かみ・信頼感の両立

---

## 技術スタック

| 項目 | 選択 |
|------|------|
| Framework | React + Vite |
| スタイリング | styled-components（cloudICと統一） |
| ルーティング | React Router v6 |
| コンテンツ管理 | TypeScript 定数ファイル（`src/data/`）|
| 言語 | 日本語優先、後から英語版追加 |

---

## サイト構成

### 1. Resume（印刷対応）

`/resume` — 単一ページ、`@media print` でPDF出力対応

**レイアウト: 2カラム型**
- 左サイドバー（約30%）: 氏名・連絡先・スキル・言語・学歴
- 右メイン（約70%）: 職歴タイムライン・実績・発信履歴

### 2. Portfolio（マルチページ）

| ページ | パス | 概要 |
|--------|------|------|
| Home | `/` | ステートメント型Hero |
| Work | `/work` | プロジェクト一覧 |
| Work Detail | `/work/:id` | 個別ケーススタディ |
| About | `/about` | 自己紹介・価値観 |
| Resume | `/resume` | 印刷対応レジュメ |
| Writing | `/writing` | 外部記事リンク集 |
| Contact | `/contact` | 連絡先 |

---

## 各ページレイアウト仕様

### Home

**ステートメント型**
```
[Nav] 名前ロゴ .............. Work / About / Resume / Writing
─────────────────────────────────────────────────────
[Hero]
  サブタイトル（小文字・uppercase）
  大きなキャッチコピー（セリフ体・日本語）
  一行説明文
  [仕事を見る →]  [Resume PDF ↓]
─────────────────────────────────────────────────────
[Featured Work プレビュー — スクロールで誘導]
```

キャッチコピー候補（実装時に決定）:
- 「医療に、デザインの力を。」
- 「プロダクトとチームを、同時に動かす。」

### Work（プロジェクト一覧）

**リスト型 + 左サムネイル**
```
プロジェクト名                              タグ   年 →
[thumb] タイトル
        サブテキスト（概要1行）
        [UX] [PdM]
────────────────────────────────────────────────────
[thumb] タイトル
        ...
```

掲載プロジェクト候補:
1. cloudIC Platform（入院患者向け動画、PdM兼務）
2. デジスマ診療 UIリニューアル（事業指標改善の実績あり）
3. m3.com デザインシステム（33万医師プラットフォーム）
4. digikar 電子カルテ
5. （採用・マネジメント事例も追加可）

### Resume（印刷対応）

**2カラム型**
```
[Header: 大月 雄介 | Design Manager · PdM | 連絡先]
══════════════════════════════════════════════════
[左: スキル・言語]  |  [右: 職歴タイムライン]
  UI/UX Design     |    20XX–現在 エムスリー DM
  Figma            |      ...
  Design System    |    20XX–20XX 前職
  PdM              |      ...
  React            |
  マネジメント      |  [学歴]
                   |  [発信・受賞]
```

`@media print` で: 背景なし・ナビ非表示・余白最適化・A4縦

---

## フォルダ構成（実装時）

```
resume-portfolio/
├── public/
│   └── assets/images/      ← プロジェクトサムネイル
├── src/
│   ├── data/               ← コンテンツ定数
│   │   ├── projects.ts     ← Work データ
│   │   ├── resume.ts       ← 職歴・スキルデータ
│   │   └── writing.ts      ← 記事リンク
│   ├── styles/
│   │   ├── theme.ts        ← デザイントークン
│   │   └── GlobalStyles.ts
│   ├── components/
│   │   ├── layout/         ← Nav, Footer, PageLayout
│   │   └── shared/         ← ProjectCard, Tag, etc.
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── WorkPage.tsx
│   │   ├── WorkDetailPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ResumePage.tsx
│   │   ├── WritingPage.tsx
│   │   └── ContactPage.tsx
│   └── App.tsx
├── package.json
└── vite.config.ts
```

---

## コンテンツ収集タスク（実装前に埋めること）

- [ ] 職歴：前職以前の会社名・期間・役職・担当内容
- [ ] スキルレベル：各スキルの習熟度
- [ ] プロジェクトサムネイル画像（各案件のスクリーンショット）
- [ ] キャッチコピー最終決定
- [ ] 連絡先・SNSリンク（LinkedIn URL等）
- [ ] 学歴情報

---

## 次のステップ

1. コンテンツ収集（上記チェックリスト）
2. `resume-portfolio/` の React + Vite プロジェクト初期化
3. デザイントークン（`theme.ts`）の設定
4. Resume ページから実装開始（最短で成果物が出る）
5. Work → Home → About → Writing → Contact の順で実装

---

*ブレインストーミングセッション: 2026-05-12*
*ビジュアルコンパニオン: http://localhost:57880 （セッション終了後は無効）*
