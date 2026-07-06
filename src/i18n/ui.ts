import type { Lang } from './LangContext';

interface UIStrings {
  auth: { lead: string; error: string; submit: string };
  nav: { work: string; resume: string; menuOpen: string; menuClose: string; toLang: string };
  common: {
    close: string; prev: string; next: string; emptyProjects: string;
    notFound: string; backHome: string; imgPlaceholder: string;
    overview: string; achievements: string;
  };
  home: {
    hero: string; tagline: string;
    leadHtml: [string, string, string]; // [before Em, Em text, after Em]
    bio: string;
    microAreasKey: string; microAreasVal: string;
    microStyleKey: string; microStyleVal: string;
    microHobbyKey: string; microHobbyVal: string;
    closingPre: string; closingItalic: string; closingPost: string;
  };
  about: {
    heading: string; lead: string; bio: string;
    secAreas: string; valAreas: string;
    secStyle: string; valStyle: string;
    secHobby: string; valHobby: string;
  };
  contact: { heading: string; location: string };
  writing: { heading: string; sub: string; secArticles: string; secTalks: string };
  work: { heading: string; sub: string };
  resume: {
    docTitle: string; asOf: string; name: string;
    secSummary: string; summaryP1: string; summaryP2: string;
    secStrengths: string;
    str1Label: string; str1Body: string;
    str2Label: string; str2Body: string;
    str3Label: string; str3Body: string;
    secVision: string; visionLead: string; visionText: string;
    secCareerOverview: string; secCareerDetail: string; periodLabel: string;
    secSkills: string; secEdu: string; langLabel: string; langValue: string;
    contactLabel: string; secPub: string; printNote: string;
  };
  footer: { name: string };
}

export const ui: Record<Lang, UIStrings> = {
  ja: {
    auth: { lead: 'このサイトはご招待者限定です。ID とパスワードを入力してください。', error: 'ID またはパスワードが違います', submit: 'Enter ↗' },
    nav: { work: 'Work', resume: 'Resume', menuOpen: 'メニューを開く', menuClose: 'メニューを閉じる', toLang: 'EN' },
    common: {
      close: '閉じる', prev: '前の画像', next: '次の画像',
      emptyProjects: '該当するプロジェクトがありません。',
      notFound: 'プロジェクトが見つかりません。', backHome: '← Home に戻る',
      imgPlaceholder: '画像エリア（追加予定）', overview: 'Overview', achievements: 'Achievements',
    },
    home: {
      hero: '実践が、道を拓く。',
      tagline: 'デザインで事業成長を加速させる。',
      leadHtml: ['プロダクト、グラフィック、フロントエンド、PdM——', '手段を問わず動いて', '、不確実を真っ先に行動で切り拓く。'],
      bio: '千葉大学大学院デザイン科学修了。JVC ケンウッド・デザインでインダストリアルデザイン、UX/UI・インタラクション・ビジョン構想に従事したのち、株式会社ピックノートでスタートアップのゼロから開発に携わる。2020 年エムスリー入社。電子カルテ DigiKar、診療 DX デジスマ、海外医療メディアの立ち上げ等、新規プロダクトをリード。デザイナー採用 9 名——プロダクトと組織を同時に貢献しながら、事業成長をリード。',
      microAreasKey: '主な領域', microAreasVal: 'デザイン全般 / 0→1 / マネジメント',
      microStyleKey: '仕事のスタイル', microStyleVal: '率先してまずやってみる、ユーザー理解 · AI 推進',
      microHobbyKey: '趣味', microHobbyVal: '3D プリンター、植物栽培',
      closingPre: '最後までご覧いただき', closingItalic: 'ありがとうございました', closingPost: '。',
    },
    about: {
      heading: '大月 雄介について',
      lead: 'プロダクト、グラフィック、フロントエンド、PdM——手段を問わず動いて、不確実を真っ先に行動で切り拓く。',
      bio: '千葉大学大学院デザイン科学修了。JVC ケンウッド・デザインでインダストリアルデザイン、UX/UI・インタラクション・ビジョン構想に従事したのち、株式会社ピックノートでスタートアップのゼロから開発に携わる。2020 年エムスリー入社。電子カルテ DigiKar、診療 DX デジスマ、海外医療メディアの立ち上げ等、新規プロダクトをリード。デザイナー採用 9 名——プロダクトと組織を同時に貢献しながら、事業成長をリード。',
      secAreas: '主な領域', valAreas: 'デザイン全般 / 0→1 / マネジメント',
      secStyle: '仕事のスタイル', valStyle: '率先してまずやってみる、ユーザー理解 · AI 推進',
      secHobby: '趣味', valHobby: '3D プリンター、植物栽培',
    },
    contact: { heading: '連絡先', location: '東京都' },
    writing: { heading: '記事・登壇', sub: 'テックブログ・インタビュー・カンファレンス登壇', secArticles: '執筆・インタビュー', secTalks: '登壇' },
    work: { heading: 'これまでの実践。', sub: 'M3 でのプロダクトと組織づくり、それ以前のメーカー / スタートアップ時代、そして個人プロジェクトまで。' },
    resume: {
      docTitle: '職務経歴書', asOf: '2026年5月 現在', name: '大月 雄介',
      secSummary: '経歴要約',
      summaryP1: '千葉大学大学院デザイン科学修了後、株式会社JVCケンウッド・デザインに入社。展示用アプリケーションのデザイン・開発、大手カーメーカーへ向けたビジョン構想やTouchdesignerの研究開発などを担当。その後、株式会社ピックノートにてUI/UXデザイナー兼フロントエンドエンジニアとしてゼロからのサービス開発に携わる。',
      summaryP2: '2020年10月、エムスリー株式会社に入社。プロダクトデザイナーとしてシェアNo.1クラウド電子カルテ「M3 DigiKar」に参画し、デザイン・PdM・採用を一気通貫で担当。2,000 → 10,000施設の事業成長をリードし、現在は新規プロダクトチームのゼネラルマネージャーとして AI エージェント開発・Next DigiKar・IC Platform、調剤システム開発、AI 動画自動生成システムの開発等、新規プロダクトの同時並走を担う。',
      secStrengths: '活かせる経験・能力',
      str1Label: '事業成長へコミット', str1Body: 'デザイナーという役割にとらわれず、PdM・採用・組織立ち上げ・AI 実装まで、事業成長のために必要なことを手段に捉われず実行するのが得意です。',
      str2Label: '領域を横断する巻き込み', str2Body: 'デザイン・エンジニアリング・PdM・CS・営業・経営、各領域の現場に入り込み、視点を翻訳してプロジェクトを推進しています。',
      str3Label: '不確実を切り拓く主体性', str3Body: '0 → 1 → 10 → 100、どのフェーズでも未知のなかに最初に踏み出す。実践からの学習に勝るものはないと考えています。',
      secVision: '今後のビジョン', visionLead: 'プロダクトデザインの役割を、事業の意思決定の最前線へ。',
      visionText: 'ユーザー視点とビジネス視点を同じ言語で結び、デザイナーが「事業を動かす職能」として活きる現場をつくりたい。AI を使い倒し、組織と個人の生産性を再設計する側で、社会の次の形を描いていきたい。',
      secCareerOverview: '職務経歴 概要', secCareerDetail: '職務経歴 詳細', periodLabel: '在籍期間：',
      secSkills: 'スキル', secEdu: '学歴・言語', langLabel: '言語', langValue: '日本語（母国語） / 英語（読み書き）',
      contactLabel: '連絡先', secPub: '発信・執筆・登壇',
      printNote: 'Cmd+P（Mac） / Ctrl+P（Windows）で PDF として保存できます。',
    },
    footer: { name: '大月 雄介' },
  },
  en: {
    auth: { lead: 'This site is invite-only. Please enter your ID and password.', error: 'Incorrect ID or password.', submit: 'Enter ↗' },
    nav: { work: 'Work', resume: 'Resume', menuOpen: 'Open menu', menuClose: 'Close menu', toLang: 'JP' },
    common: {
      close: 'Close', prev: 'Previous image', next: 'Next image',
      emptyProjects: 'No matching projects.',
      notFound: 'Project not found.', backHome: '← Back to Home',
      imgPlaceholder: 'Image area (coming soon)', overview: 'Overview', achievements: 'Achievements',
    },
    home: {
      hero: 'Practice opens the way.',
      tagline: 'Accelerating business growth through design.',
      leadHtml: ['Product, graphic, front-end, Product Manager — ', 'I move first', ', cutting through uncertainty with action.'],
      bio: "After completing a master's degree at Chiba University Graduate School, Design Science, I worked at JVCKENWOOD Design on industrial design, UX/UI, interaction design, and vision concepting, then joined PickNote to build a startup's product from scratch. In 2020, I joined M3, where I have led new products including the EHR DigiKar, the clinic DX service Digisma, and the launch of an international medical media platform. Along the way I hired 9 designers — contributing to both product and organization while driving business growth.",
      microAreasKey: 'Key Areas', microAreasVal: 'Design across disciplines / Zero-to-one / Management',
      microStyleKey: 'How I Work', microStyleVal: 'Take initiative and try things first; user understanding; championing AI adoption',
      microHobbyKey: 'Interests', microHobbyVal: '3D printing, growing plants',
      closingPre: 'Thank you for reading all the way to the end.', closingItalic: '', closingPost: '',
    },
    about: {
      heading: 'About Yusuke Otsuki',
      lead: 'Product, graphic, front-end, Product Manager — whatever the means, I move first, cutting through uncertainty with action.',
      bio: "After completing a master's degree at Chiba University Graduate School, Design Science, I worked at JVCKENWOOD Design on industrial design, UX/UI, interaction design, and vision concepting, then joined PickNote to build a startup's product from scratch. In 2020, I joined M3, where I have led new products including the EHR DigiKar, the clinic DX service Digisma, and the launch of an international medical media platform. Along the way I hired 9 designers — contributing to both product and organization while driving business growth.",
      secAreas: 'Key Areas', valAreas: 'Design across disciplines / Zero-to-one / Management',
      secStyle: 'How I Work', valStyle: 'Take initiative and try things first; user understanding; championing AI adoption',
      secHobby: 'Interests', valHobby: '3D printing, growing plants',
    },
    contact: { heading: 'Contact', location: 'Tokyo, Japan' },
    writing: { heading: 'Articles & Talks', sub: 'Tech blog posts, interviews, and conference talks', secArticles: 'Articles & Interviews', secTalks: 'Talks' },
    work: { heading: 'The practice so far.', sub: 'Product and organization building at M3, earlier years at a manufacturer and a startup, and personal projects.' },
    resume: {
      docTitle: 'Résumé', asOf: 'As of May 2026', name: 'Yusuke Otsuki',
      secSummary: 'Career Summary',
      summaryP1: "After completing a master's degree in Design Science from Chiba University, I joined JVCKENWOOD Design, where I worked on the design and development of exhibition applications, vision concepts for a major automaker, and R&D with TouchDesigner. I then joined PickNote as a UI/UX designer and front-end engineer, building a new service from scratch.",
      summaryP2: 'In October 2020, I joined M3, Inc. There, as product designer on M3 DigiKar — the No. 1 cloud-based EHR by market share — I owned design, product management, and recruiting end to end, growing the business from 2,000 to 10,000 medical facilities. I currently serve as General Manager of the Design Group, driving multiple new products in parallel — AI agent development, Next DigiKar, cloudIC Platform, a pharmacy dispensing system, and an automated AI video generation system.',
      secStrengths: 'Experience & Strengths',
      str1Label: 'Committed to Business Growth', str1Body: "I don't confine myself to the designer role. From product management and recruiting to organization building and AI implementation, I excel at doing whatever the business needs to grow, unconstrained by role or method.",
      str2Label: 'Cross-Functional Engagement', str2Body: 'I embed directly with teams across design, engineering, product, customer success, sales, and leadership — translating between perspectives to drive projects forward.',
      str3Label: 'Initiative in the Face of Uncertainty', str3Body: "0 → 1, 1 → 10, 10 → 100 — at every phase, I'm the first to step into the unknown. I believe nothing beats learning by doing.",
      secVision: 'Vision', visionLead: 'Bringing product design to the front lines of business decision-making.',
      visionText: 'I want to connect the user perspective and the business perspective through a shared language, and create environments where design thrives as a discipline that moves the business. By using AI to its fullest and redesigning productivity for both organizations and individuals, I want to help shape what society looks like next.',
      secCareerOverview: 'Work Experience — Overview', secCareerDetail: 'Work Experience — Details', periodLabel: 'Tenure: ',
      secSkills: 'Skills', secEdu: 'Education & Languages', langLabel: 'Languages', langValue: 'Japanese (native) / English',
      contactLabel: 'Contact', secPub: 'Writing, Publications & Talks',
      printNote: 'Press Cmd+P (Mac) / Ctrl+P (Windows) to save this page as a PDF.',
    },
    footer: { name: 'Yusuke Otsuki' },
  },
};
