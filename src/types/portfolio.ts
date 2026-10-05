export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  role: string;
  techStack: string[];
  problem: string;
  solution: string;
  architecture: string[];
  impact: string;
  highlights: string[];
  githubUrl: string;
  liveUrl?: string;
  stats?: { label: string; value: string }[];
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
  };
  visualTheme: {
    badgeColor: string;
    gradient: string;
    accentHex: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface StackCategory {
  id: string;
  title: string;
  subtitle: string;
  skills: {
    name: string;
    level: "Core" | "Advanced" | "Proficient";
    context: string;
    keywords: string[];
  }[];
}

export interface PhilosophyPrinciple {
  number: string;
  title: string;
  thesis: string;
  elaboration: string;
}
