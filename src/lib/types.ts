export interface TextSegment {
  text: string;
  emphasis?: boolean;
}

export interface CtaLink {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string;
  ariaLabel: string;
}

export interface Location {
  city: string;
  region: string;
  country: string;
  label: string;
  shortLabel: string;
}

export interface SiteSeo {
  title: string;
  titleTemplate: string;
  description: string;
  keywords: string[];
  ogAlt: string;
  locale: string;
}

export interface Site {
  name: string;
  firstName: string;
  initials: string;
  title: string;
  subtitle: string;
  summary: string;
  location: Location;
  email: string;
  phone: string;
  phoneHref: string;
  website: string;
  socials: SocialLink[];
  seo: SiteSeo;
}

export interface UiCopy {
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  menuTitle: string;
  externalLinkNewTab: string;
  sectionLabel: string;
  backToTop: string;
  scrollToExplore: string;
  loading: string;
  copyEmail: string;
  copied: string;
  copyFailed: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  index: string;
}

export interface Nav {
  brand: {
    mark: string;
    name: string;
    role: string;
    homeLabel: string;
  };
  links: NavLink[];
  cta: CtaLink;
  menuFooter: {
    label: string;
    locationLabel: string;
  };
}

export interface HeroMetric {
  value: string;
  suffix?: string;
  label: string;
}

export interface SceneNodeLabel {
  id: string;
  label: string;
}

export interface HeroSceneCopy {
  ariaLabel: string;
  coreLabel: string;
  nodeLabels: SceneNodeLabel[];
  hint: string;
  fallbackTitle: string;
  fallbackNote: string;
  fallbackTag: string;
  loadingLabel: string;
  engineLabel: string;
}

export interface Hero {
  eyebrow: string;
  status: string;
  headline: TextSegment[];
  intro: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  metrics: HeroMetric[];
  portraitCaption: string;
  scene: HeroSceneCopy;
}

export interface SectionCopy {
  index: string;
  eyebrow: string;
  heading: TextSegment[];
  description: string;
}

export interface ContactSectionCopy extends SectionCopy {
  primaryCta: string;
  secondaryCta: string;
  availabilityLabel: string;
  responseNote: string;
}

export interface Sections {
  about: SectionCopy;
  skills: SectionCopy;
  experience: SectionCopy;
  projects: SectionCopy;
  education: SectionCopy;
  contact: ContactSectionCopy;
}

export interface Principle {
  number: string;
  title: string;
  description: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface About {
  lead: string;
  body: string[];
  principlesLabel: string;
  principles: Principle[];
  facts: Fact[];
  focusLabel: string;
  focusItems: string[];
}

export interface SkillCategory {
  id: string;
  number: string;
  title: string;
  description: string;
  items: string[];
}

export interface Skills {
  labels: {
    categoryLabel: string;
    countSingular: string;
    countPlural: string;
    activeLabel: string;
  };
  categories: SkillCategory[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface Experience {
  items: ExperienceItem[];
  labels: {
    roleLabel: string;
    locationLabel: string;
    responsibilitiesLabel: string;
    stackLabel: string;
  };
}

export interface ProjectLink {
  id: string;
  label: string;
  url: string;
  ariaLabel: string;
}

export interface ProjectVisual {
  kind: "network" | "pipeline";
  figure: string;
  center: string;
  caption: string;
  labels: string[];
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  stack: string[];
  highlights: string[];
  links: ProjectLink[];
  visual: ProjectVisual;
}

export interface Projects {
  labels: {
    viewRepository: string;
    viewLive: string;
    stackLabel: string;
    notesLabel: string;
    figureLabel: string;
    linkNote: string;
    projectLabel: string;
    topologyLabel: string;
    pipelineLabel: string;
    orchestrationLabel: string;
    pipelineFooter: string;
  };
  items: Project[];
}

export interface EducationItem {
  id: string;
  degree: string;
  shortDegree: string;
  institution: string;
  start: string;
  end: string;
  cgpa: string;
  location: string;
}

export interface Education {
  labels: {
    cgpaLabel: string;
    institutionLabel: string;
    periodLabel: string;
    countLabel: string;
  };
  items: EducationItem[];
}

export interface ContactCopy {
  emailLabel: string;
  phoneLabel: string;
  locationLabel: string;
  socialLabel: string;
  copyLabel: string;
  copiedLabel: string;
  copyErrorLabel: string;
}

export interface Footer {
  tagline: string;
  sectionsLabel: string;
  connectLabel: string;
  contactLabel: string;
  copyright: string;
  colophon: string;
  backToTopLabel: string;
  locationNote: string;
}

export interface PortfolioData {
  site: Site;
  ui: UiCopy;
  nav: Nav;
  hero: Hero;
  sections: Sections;
  about: About;
  skills: Skills;
  experience: Experience;
  projects: Projects;
  education: Education;
  contact: ContactCopy;
  footer: Footer;
}
