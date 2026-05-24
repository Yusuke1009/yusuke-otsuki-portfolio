/**
 * キャリア年表（Year Timeline 表示用）
 * phase: 0 (新月) → 1 (満月) で進行
 */
export interface CareerYear {
  year: number;
  phase: number;
  roles: string[];
  /** クリックでスクロール先となる Work id（一覧内 anchor） */
  anchor?: string;
}

export const careerYears: CareerYear[] = [
  { year: 2026, phase: 1.0, roles: ['GM · Designer'], anchor: 'digikar' },
  { year: 2024, phase: 0.85, roles: ['Designer · PdM · Manager'], anchor: 'digikar' },
  { year: 2022, phase: 0.65, roles: ['Designer · PdM'], anchor: 'digisma' },
  { year: 2020, phase: 0.45, roles: ['Designer (joined M3)'], anchor: 'digikar' },
  { year: 2019, phase: 0.3, roles: ['Interaction Designer (JVC)'], anchor: 'pre-m3' },
  { year: 2018, phase: 0.18, roles: ['Industrial Designer (JVC)'], anchor: 'pre-m3' },
  { year: 2016, phase: 0.08, roles: ['Studied abroad (Cologne, Milan)'], anchor: 'pre-m3' },
  { year: 2014, phase: 0.02, roles: ["Master's @ Chiba Univ"], anchor: 'pre-m3' },
];
