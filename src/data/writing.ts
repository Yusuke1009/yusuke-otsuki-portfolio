export interface Article {
  id: string;
  title: string;
  url: string;
  medium: string;
  date: string;
  description: string;
  tags: string[];
}

export interface Talk {
  id: string;
  title: string;
  event: string;
  url: string;
  date: string;
  description: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    id: 'kickoff',
    title: '成功するキックオフの視点',
    url: 'https://www.m3tech.blog/entry/2023/03/03/110000',
    medium: 'エムスリーテックブログ',
    date: '2023年3月',
    description: 'アジャイル開発におけるキックオフの設計——打ち上げ角度・可能性拡張・収束の3軸で考える。',
    tags: ['プロセス設計', 'アジャイル'],
  },
  {
    id: 'figma-tips',
    title: '明日からできる、爆速Figma活用術',
    url: 'https://www.m3tech.blog/entry/2023/02/15/130000',
    medium: 'エムスリーテックブログ',
    date: '2023年2月',
    description: '組織構造・オートレイアウト・自動化の3軸でFigmaの作業速度を大幅に上げるTips集。',
    tags: ['Figma', 'ツール活用'],
  },
  {
    id: 'digisma-case',
    title: 'デジスマ診療における、事業貢献に繋がるデザインリニューアルの取り組み方',
    url: 'https://cocoda.design/yusuke109/p/p8393c890e065',
    medium: 'Cocoda',
    date: '2024年7月',
    description: 'UX・UIリニューアルが事業指標に与えたインパクトの事例解説。',
    tags: ['ケーススタディ', 'UX', '事業貢献'],
  },
  {
    id: 'designing-interview',
    title: '言語と非言語で促す「対話」こそ、デザインの介在価値',
    url: 'https://designing.jp/m3-ohtsuki',
    medium: 'designing.jp',
    date: '2023年9月',
    description: 'プロダクトデザイナーとして医療SaaSに関わる意義、デザインが組織にもたらす対話の価値について語ったインタビュー。',
    tags: ['インタビュー', 'デザイン経営'],
  },
  {
    id: 'wantedly-interview',
    title: '「新たな自分と出会える可能性を感じたから入社した」',
    url: 'https://en-jp.wantedly.com/companies/m3_inc/post_articles/356495',
    medium: 'Wantedly',
    date: '2021年11月',
    description: 'エムスリー入社の経緯と、医療 × デザインというキャリアの選択について。',
    tags: ['インタビュー', 'キャリア'],
  },
];

export const talks: Talk[] = [
  {
    id: 'communication-design-night-3',
    title: 'Communication Design Night vol.3',
    event: 'Communication Design Night（LayerX主催）',
    url: 'https://layerx.connpass.com/event/308685/',
    date: '2024年3月',
    description: 'インハウスのコミュニケーション・グラフィックデザイナー向けイベント。ブランド浸透の実践知を登壇。',
    tags: ['ブランディング', 'インハウスデザイン'],
  },
  {
    id: 'designship-2023',
    title: 'プロダクト開発における観察のススメ',
    event: 'Designship 2023',
    url: 'https://design-ship.jp/2023/contents/session',
    date: '2023年10月',
    description: '現場に行き自分の目で観察することで、ユーザーに価値を届けるためにデザイナーができることを実例を交えて紹介。',
    tags: ['UXリサーチ', 'フィールドワーク'],
  },
  {
    id: 'designing-org',
    title: '自走するチームをつくるためのキックオフ',
    event: 'CreatorZine Webinar for Designers（グッドパッチ・SmartHR・エムスリー共催）',
    url: 'https://creatorzine.jp/news/detail/4681',
    date: '2022年9月',
    description: 'デザイン組織づくりに悩む実践者向けウェビナー。チームが自走するためのキックオフ設計を解説。',
    tags: ['組織設計', 'キックオフ'],
  },
  {
    id: 'm3-mf-service-design',
    title: 'エムスリー×マネーフォワード 社会を変えるサービスデザイン',
    event: 'エムスリー × マネーフォワード 共催イベント',
    url: 'https://moneyforward.connpass.com/event/266643/',
    date: '2022年11月',
    description: '医療・金融SaaSのデザイン責任者によるパネルトーク。デジカル（電子カルテ）のデザイン事例を紹介。',
    tags: ['パネルトーク', 'SaaSデザイン'],
  },
];
