import { loadProjects } from './loadProjects';

export interface ProjectImage {
  src: string;
  caption?: string;
}

export interface ProjectPhase {
  number: string;
  label: string;
  period: string;
  headline: string;
  narrative: string;
  achievements: string[];
  links?: { label: string; url: string }[];
  images?: ProjectImage[];
  imagesLayout?: 'stack' | 'auto';
  video?: string;
  videos?: string[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export const ROLE_FILTERS = [
  'Product Design',
  'PdM',
  'Frontend',
  'Recruitment',
  'Interaction',
  'Industrial',
  'Personal',
] as const;

export type RoleFilter = (typeof ROLE_FILTERS)[number];

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  period: string;
  arc: string;
  role: string;
  team: string;
  tags: string[];
  /** サイドナビフィルタに使用 */
  roles: RoleFilter[];
  thumbnail: string;
  kv?: string;
  overview: string;
  links?: ProjectLink[];
  phases: ProjectPhase[];
  featured: boolean;
}

export const projects: Project[] = loadProjects();
