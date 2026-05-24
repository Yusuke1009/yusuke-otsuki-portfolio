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
    id: 'm3-gm',
    company: 'エムスリー株式会社',
    role: 'デザイン G ゼネラルマネージャー / プロダクトデザイナー',
    period: '2026年4月 – 現在',
    description:
      'デザイン組織全体のマネジメントと並行し、新規プロダクト「cloudIC Platform」（入院患者向け動画プラットフォーム）の立ち上げを PO 兼デザイナーとして担当。AI エージェント開発・Next DigiKar の同時並走を担う。',
    achievements: [
      'デザイン G ゼネラルマネージャーとして組織運営',
      'cloudIC Platform を PO 兼デザイナーとして立ち上げ',
      'AI エージェント開発・Next DigiKar の同時並走',
    ],
  },
  {
    id: 'm3-leader',
    company: 'エムスリー株式会社',
    role: 'デザイン G チームリーダー / プロダクトデザイナー',
    period: '2022年4月 – 2026年3月',
    description:
      'デジカルチーム PdM 兼デザイナー、デジスマチームデザイナーなど複数の新規プロダクト・事業の立ち上げデザイナーとして事業成長をリード。またデザイナー採用にもコミットし、デザイナー採用 9 名（例年比 +4 ペース）も主導。',
    achievements: [
      'デジカル PdM 兼デザインリードとして事業成長をリード',
      'デジスマ診療の PMF、次のデザイナーの採用 & 育成',
      'デザイナー採用 9 名・オンボーディング設計',
    ],
  },
  {
    id: 'm3-leader-early',
    company: 'エムスリー株式会社',
    role: 'デザイン G プロダクトデザイナー',
    period: '2020年10月 – 2022年3月',
    description:
      '電子カルテ「M3 DigiKar」のプロダクトデザインを担当。本体・モバイルアプリ・新規事業まで幅広くデザインに関わり、後に PdM を兼務。',
    achievements: [
      '電子カルテ本体・モバイルアプリの UI/UX デザイン',
      'デジスマ診療の立ち上げ、グロース',
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
    category: 'AI',
    items: ['LLM 活用', 'Claude / ChatGPT', 'プロンプト設計', 'AI エージェント企画', 'AI を活用した実装・コーディング'],
  },
  {
    category: 'ドメイン',
    items: ['医療IT', '電子カルテ', '高齢者UX', 'SaaS', 'B2B/B2C'],
  },
  {
    category: '語学',
    items: ['英語（ビジネス会話レベル / 1 年間の留学経験あり）'],
  },
];

export const education: Education[] = [
  {
    school: '千葉大学大学院',
    faculty: 'デザイン科学専攻',
    period: '修了',
  },
  {
    school: '千葉大学',
    faculty: '工学部 機械工学科',
    period: '2011年4月 – 2015年3月',
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
