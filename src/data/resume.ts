export interface Job {
  id: string;
  company: string;
  role: string;
  period: string;
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
  medium: string;
  date: string;
}

export const jobs: Job[] = [
  {
    id: 'm3-shinki',
    company: 'エムスリー株式会社',
    role: '新規プロダクトチーム — マネージャー',
    period: '2024年 – 現在',
    description:
      '新規プロダクト「cloudIC Platform」（入院患者向け動画プラットフォーム）の立ち上げをマネージャー兼プロダクトオーナーとして担当。デザイン・PdM・エンジニアリングの3職能を束ね、医療機関と患者の双方に価値を届ける事業を0→1で構築。',
    achievements: [
      'cloudIC Platform を PO 兼デザイナーとして立ち上げ',
      '高齢者UX要件（3タップ以内・最小20pt等）を満たすデザイン基準を策定',
      '医療機関ヒアリング・患者ユーザーリサーチを設計から実施',
    ],
  },
  {
    id: 'm3-digisma',
    company: 'エムスリー株式会社',
    role: 'デジスマ診療チーム — プロダクトデザイナー',
    period: '2022年 – 2024年',
    description:
      'クリニック向け診療支援SaaS「デジスマ診療」のUI/UXリニューアルを担当。医師・スタッフの業務フローを再設計し、事業指標の改善に直結させた。',
    achievements: [
      'UIリニューアルによる事業指標の改善（詳細はCocoda記事参照）',
      '医師・受付スタッフの業務フロー再設計',
      'デザインプロセスを言語化し、Cocodaに執筆',
    ],
  },
  {
    id: 'm3-digikar',
    company: 'エムスリー株式会社',
    role: 'デジカル（電子カルテ）チーム — プロダクトデザイナー / PdM',
    period: '2020年10月 – 2022年',
    description:
      '電子カルテ「デジカル」のプロダクトデザインを担当。電子カルテ本体・モバイルアプリ・新規事業まで幅広くデザインに関わり、後にPdMを兼務。',
    achievements: [
      '電子カルテ本体・モバイルアプリのUI/UXデザイン',
      'm3.com デザインシステム構築への参画（33万医師プラットフォーム）',
      'PdM兼務によるロードマップ策定・PRD作成',
    ],
  },
  {
    id: 'picknote',
    company: '株式会社ピックノート',
    role: 'UI/UXデザイナー / フロントエンドエンジニア',
    period: '2020年1月 – 2020年6月',
    description:
      '従業員5名のスタートアップで、ゼロからのサービス開発にデザイナー兼エンジニアとして従事。AIカメラ・サイネージを使った店舗分析サービス、シェアオフィス向けサイネージサービスを開発。',
    achievements: [
      'AIカメラ × サイネージの店舗分析サービスを企画〜実装',
      'シェアオフィス MOV から案件を受注（プロトタイプ→PDCA→納品）',
      '組み込み機器向けプログラミングをゼロから学び実装',
    ],
  },
  {
    id: 'jvc-kenwood',
    company: '株式会社JVCケンウッド・デザイン',
    role: 'UX/UI・ソリューション・インタラクションデザイナー',
    period: '2018年4月 – 2019年12月',
    description:
      '従業員約90名のデザイン集団に新卒で入社。展示用アプリケーションのデザイン・開発から、事業部・知財部・関連会社・大手カーメーカー向けのビジョン構想/コンセプト構想まで、幅広いデザインコンサルティング業務を担当。',
    achievements: [
      '大手カーメーカー向け AIナビゲーションのコンセプト構想（ジェネラティブな映像生成を提案）',
      'Touchdesigner の研究開発を主導し、社内に正式導入（プロライセンス4本）',
      '事業部・知財部・R&Dを対象としたビジョン構想・ビジュアライズ業務',
      '自主研究の発信／社内勉強会の主催',
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
    items: ['React', 'TypeScript', 'styled-components', 'Touchdesigner', 'HTML/CSS'],
  },
  {
    category: 'ドメイン',
    items: ['医療IT', '電子カルテ', '高齢者UX', 'SaaS', 'B2B/B2C'],
  },
];

export const education: Education[] = [
  {
    school: '千葉大学大学院',
    faculty: 'デザイン科学専攻',
    period: '修了',
  },
];

export const publications: Publication[] = [
  {
    title: '成功するキックオフの視点',
    url: 'https://www.m3tech.blog/entry/2023/03/03/110000',
    medium: 'エムスリーテックブログ',
    date: '2023年3月',
  },
  {
    title: '明日からできる、爆速Figma活用術',
    url: 'https://www.m3tech.blog/entry/2023/02/15/130000',
    medium: 'エムスリーテックブログ',
    date: '2023年2月',
  },
  {
    title: 'デジスマ診療における、事業貢献に繋がるデザインリニューアルの取り組み方',
    url: 'https://cocoda.design/yusuke109/p/p8393c890e065',
    medium: 'Cocoda',
    date: '2024年7月',
  },
  {
    title: '言語と非言語で促す「対話」こそ、デザインの介在価値',
    url: 'https://designing.jp/m3-ohtsuki',
    medium: 'designing.jp',
    date: '2023年9月',
  },
  {
    title: 'Designship 2023 登壇：プロダクト開発における観察のススメ',
    url: 'https://design-ship.jp/2023/contents/session',
    medium: 'Designship 2023',
    date: '2023年10月',
  },
];

export const contact = {
  email: 'moonoom1009@gmail.com',
  linkedin: '',
  twitter: '',
  location: '東京都',
};
