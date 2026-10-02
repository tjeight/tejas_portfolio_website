export interface Personal {
  name: string;
  role: string;
  shortRole: string;
  tagline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  resume: string;
  status: string;
  availability: string;
  experienceYears: string;
  stats: { label: string; value: string }[];
}

export interface CoreTechNode {
  name: string;
  category: string;
  desc: string;
  color: string;
}

export interface HeroData {
  badge: string;
  headline: string;
  subheadline: string;
  ctaProjects: string;
  ctaContact: string;
  ctaResume: string;
  coreTechNodes: CoreTechNode[];
}

export interface IdentityCard {
  identifier: string;
  name: string;
  role: string;
  status: string;
  location: string;
  clearance: string;
  runtime: string;
  architecture: string;
}

export interface AboutData {
  sectionTag: string;
  heading: string;
  intro: string;
  bio: string[];
  identityCard: IdentityCard;
  highlights: { title: string; desc: string }[];
}

export interface SkillItem {
  name: string;
  context: string;
  related: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  color: string;
  description: string;
  items: SkillItem[];
}

export interface SkillsData {
  sectionTag: string;
  heading: string;
  subheading: string;
  categories: SkillCategory[];
}

export interface ExperienceNode {
  period: string;
  company: string;
  role: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface ExperienceData {
  sectionTag: string;
  heading: string;
  subheading: string;
  timeline: ExperienceNode[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: string;
  desc: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  featured: boolean;
  category: string;
  status: string;
  github: string;
  live: string;
  problem: string;
  solution: string;
  technologies: string[];
  architectureNodes?: ArchitectureNode[];
  implementation: string[];
  challenges: string[];
  results: string[];
}

export interface WorkflowStep {
  id: string;
  index: string;
  title: string;
  label: string;
  role: string;
  state: string;
  desc: string;
  details: string;
}

export interface AIWorkflowData {
  sectionTag: string;
  heading: string;
  subheading: string;
  description: string;
  steps: WorkflowStep[];
}

export interface BackendComponent {
  id: string;
  name: string;
  subtitle: string;
  tech: string;
  description: string;
  responsibilities: string[];
}

export interface BackendArchitectureData {
  sectionTag: string;
  heading: string;
  subheading: string;
  description: string;
  components: BackendComponent[];
}

export interface GithubStat {
  label: string;
  value: string;
}

export interface GithubLanguage {
  name: string;
  share: string;
  color: string;
}

export interface GithubCommit {
  repo: string;
  message: string;
  time: string;
  branch: string;
  tech: string;
}

export interface GithubActivityData {
  sectionTag: string;
  heading: string;
  subheading: string;
  stats: GithubStat[];
  languages: GithubLanguage[];
  recentHighlights: GithubCommit[];
}

export interface BuildingItem {
  title: string;
  focus: string;
  desc: string;
  tag: string;
  status: string;
  tech: string[];
}

export interface CurrentlyBuildingData {
  sectionTag: string;
  heading: string;
  subheading: string;
  items: BuildingItem[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string;
  coursework: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
}

export interface PortfolioData {
  personal: Personal;
  hero: HeroData;
  about: AboutData;
  skills: SkillsData;
  experience: ExperienceData;
  projects: Project[];
  aiWorkflow: AIWorkflowData;
  backendArchitecture: BackendArchitectureData;
  githubActivity: GithubActivityData;
  currentlyBuilding: CurrentlyBuildingData;
  education: EducationItem[];
  socials: SocialLink[];
}
