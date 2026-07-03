import type { Lang } from '../i18n/LangContext';

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

const ARTICLES_JA: Article[] = [
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

const TALKS_JA: Talk[] = [
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
    id: 'm3-mf-service-design',
    title: 'エムスリー×マネーフォワード 社会を変えるサービスデザイン',
    event: 'エムスリー × マネーフォワード 共催イベント',
    url: 'https://moneyforward.connpass.com/event/266643/',
    date: '2022年11月',
    description: '医療・金融SaaSのデザイン責任者によるパネルトーク。デジカル（電子カルテ）のデザイン事例を紹介。',
    tags: ['パネルトーク', 'SaaSデザイン'],
  },
];

const ARTICLES_EN: Article[] = [
  { id: 'kickoff', title: 'Perspectives for a Successful Kickoff', url: 'https://www.m3tech.blog/entry/2023/03/03/110000', medium: 'M3 Tech Blog', date: 'Mar 2023', description: 'Designing kickoffs in Agile development, framed around three axes: launch angle, expanding possibilities, and convergence.', tags: ['Process Design', 'Agile'] },
  { id: 'figma-tips', title: 'Blazing-Fast Figma Techniques You Can Use Tomorrow', url: 'https://www.m3tech.blog/entry/2023/02/15/130000', medium: 'M3 Tech Blog', date: 'Feb 2023', description: 'A collection of tips for dramatically speeding up your Figma workflow, covering organizational structure, Auto Layout, and automation.', tags: ['Figma', 'Tooling'] },
  { id: 'digisma-case', title: 'Driving Business Impact Through Design Renewal at Digisma', url: 'https://cocoda.design/yusuke109/p/p8393c890e065', medium: 'Cocoda', date: 'Jul 2024', description: 'A case study on the impact a UX and UI renewal had on key business metrics.', tags: ['Case Study', 'UX', 'Business Impact'] },
  { id: 'designing-interview', title: 'Dialogue, Verbal and Nonverbal, Is Where Design Adds Its Value', url: 'https://designing.jp/m3-ohtsuki', medium: 'designing.jp', date: 'Sep 2023', description: 'An interview on the significance of working on healthcare SaaS as a product designer, and the value of the dialogue design brings to an organization.', tags: ['Interview', 'Design Management'] },
  { id: 'wantedly-interview', title: '"I Joined Because I Sensed the Chance to Discover a New Side of Myself"', url: 'https://en-jp.wantedly.com/companies/m3_inc/post_articles/356495', medium: 'Wantedly', date: 'Nov 2021', description: 'On joining M3 and choosing a career at the intersection of healthcare and design.', tags: ['Interview', 'Career'] },
];

const TALKS_EN: Talk[] = [
  { id: 'communication-design-night-3', title: 'Communication Design Night vol.3', event: 'Communication Design Night (hosted by LayerX)', url: 'https://layerx.connpass.com/event/308685/', date: 'Mar 2024', description: 'An event for in-house communication and graphic designers; presented practical insights on embedding a brand across an organization.', tags: ['Branding', 'In-House Design'] },
  { id: 'designship-2023', title: 'The Case for Observation in Product Development', event: 'Designship 2023', url: 'https://design-ship.jp/2023/contents/session', date: 'Oct 2023', description: 'Shared real-world examples of what designers can do to deliver value to users by going into the field and observing firsthand.', tags: ['UX Research', 'Fieldwork'] },
  { id: 'm3-mf-service-design', title: 'M3 × Money Forward: Service Design That Changes Society', event: 'M3 × Money Forward joint event', url: 'https://moneyforward.connpass.com/event/266643/', date: 'Nov 2022', description: 'A panel talk with design leads from healthcare and fintech SaaS, featuring a design case study of DigiKar, an EHR product.', tags: ['Panel Talk', 'SaaS Design'] },
];

export const writing: Record<Lang, { articles: Article[]; talks: Talk[] }> = {
  ja: { articles: ARTICLES_JA, talks: TALKS_JA },
  en: { articles: ARTICLES_EN, talks: TALKS_EN },
};
