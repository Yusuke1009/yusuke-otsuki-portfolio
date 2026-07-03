import type { Lang } from '../i18n/LangContext';

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

const JOBS_JA: Job[] = [
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

const SKILLS_JA: Skill[] = [
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

const EDU_JA: Education[] = [
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

const PUBS_JA: Publication[] = [
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

const JOBS_EN: Job[] = [
  { id: 'm3-gm', company: 'M3, Inc.', role: 'General Manager, Design Group / Product Designer', period: 'Apr 2026 – Present',
    description: 'In parallel with managing the entire design organization, leading the launch of a new product, cloudIC Platform (a video platform for hospitalized patients), as both Product Owner and designer. Also concurrently driving AI agent development and Next DigiKar.',
    achievements: ['Ran the design organization as General Manager of the Design Group', 'Launched cloudIC Platform as Product Owner and designer', 'Drove AI agent development and Next DigiKar in parallel'] },
  { id: 'm3-leader', company: 'M3, Inc.', role: 'Team Leader, Design Group / Product Designer', period: 'Apr 2022 – Mar 2026',
    description: 'Led business growth as the founding designer for multiple new products and businesses, serving as PdM and designer for the DigiKar team and as designer for the Digisma team. Also committed to and led designer recruiting.',
    achievements: ['Led business growth as DigiKar PdM and design lead', 'Drove Digisma to product-market fit; hired and developed the next generation of designers', 'Hired 9 designers and designed their onboarding'] },
  { id: 'm3-leader-early', company: 'M3, Inc.', role: 'Product Designer, Design Group', period: 'Oct 2020 – Mar 2022',
    description: 'Responsible for product design of the EHR "M3 DigiKar." Worked across the core product, mobile app, and new business initiatives; later also took on the PdM role.',
    achievements: ['UI/UX design for the core EHR product and mobile app', 'Launch and growth of Digisma'] },
  { id: 'picknote', company: 'PickNote, Inc.', role: 'UI/UX Designer / Front-End Engineer', period: 'Jan 2020 – Jun 2020',
    description: 'At a five-person startup, worked as both designer and engineer building services from zero. Developed an in-store analytics service using AI cameras and digital signage, and a digital signage service for shared offices.',
    achievements: ['Took an AI camera × digital signage in-store analytics service from planning through implementation', 'Won a project from the shared office MOV (prototype → PDCA → delivery)', 'Learned embedded-device programming from scratch and shipped implementations'] },
  { id: 'jvc-kenwood', company: 'JVCKENWOOD Design', role: 'UX/UI, Solution & Interaction Designer', period: 'Apr 2018 – Dec 2019',
    description: 'Joined as a new graduate at a ~90-person design firm. Handled a wide range of design consulting, from designing and developing exhibition applications to vision and concept development for business units, the IP department, affiliates, and a major automaker.',
    achievements: ['Concept development for AI navigation for a major automaker (proposed generative video generation)', 'Led R&D on TouchDesigner and drove its official in-house adoption (4 pro licenses)', 'Vision development and visualization for business units, the IP department, and R&D', 'Published independent research and hosted internal study sessions'] },
];

const SKILLS_EN: Skill[] = [
  { category: 'Design', items: ['UI/UX Design', 'Figma', 'Design Systems', 'Prototyping', 'User Research'] },
  { category: 'Product', items: ['PdM / PO', 'PRD Writing', 'Roadmapping', 'Agile Development'] },
  { category: 'Management', items: ['Team Management', 'Designer Recruiting', '1-on-1s', 'Performance Evaluation Design'] },
  { category: 'Technology', items: ['React', 'TypeScript', 'styled-components', 'TouchDesigner', 'HTML/CSS'] },
  { category: 'AI', items: ['LLM Utilization', 'Claude / ChatGPT', 'Prompt Design', 'AI Agent Planning', 'AI-Assisted Implementation & Coding'] },
  { category: 'Domain', items: ['Healthcare IT', 'EHR', 'UX for Older Adults', 'SaaS', 'B2B/B2C'] },
  { category: 'Languages', items: ['English (business conversational; one year of study abroad)'] },
];

const EDU_EN: Education[] = [
  { school: 'Chiba University Graduate School', faculty: "Design Science (Master's)", period: 'Apr 2015 – Mar 2018' },
  { school: 'Chiba University', faculty: 'Faculty of Engineering, Dept. of Mechanical Engineering', period: 'Apr 2011 – Mar 2015' },
];

const PUBS_EN: Publication[] = [
  { title: 'Perspectives for a Successful Kickoff', url: 'https://www.m3tech.blog/entry/2023/03/03/110000', medium: 'M3 Tech Blog', date: 'Mar 2023' },
  { title: 'Blazing-Fast Figma Techniques You Can Use Tomorrow', url: 'https://www.m3tech.blog/entry/2023/02/15/130000', medium: 'M3 Tech Blog', date: 'Feb 2023' },
  { title: 'Driving Business Impact Through Design Renewal at Digisma', url: 'https://cocoda.design/yusuke109/p/p8393c890e065', medium: 'Cocoda', date: 'Jul 2024' },
  { title: 'Dialogue, Verbal and Nonverbal, Is Where Design Adds Its Value', url: 'https://designing.jp/m3-ohtsuki', medium: 'designing.jp', date: 'Sep 2023' },
  { title: 'The Case for Observation in Product Development (Designship 2023)', url: 'https://design-ship.jp/2023/contents/session', medium: 'Designship 2023', date: 'Oct 2023' },
];

export const resume: Record<Lang, { jobs: Job[]; skills: Skill[]; education: Education[]; publications: Publication[] }> = {
  ja: { jobs: JOBS_JA, skills: SKILLS_JA, education: EDU_JA, publications: PUBS_JA },
  en: { jobs: JOBS_EN, skills: SKILLS_EN, education: EDU_EN, publications: PUBS_EN },
};

// NOTE: location removed — use ui[lang].contact.location instead
export const contact = {
  email: 'moonoom1009@gmail.com',
  linkedin: '',
  twitter: '',
};
