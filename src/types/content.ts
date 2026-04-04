export type Language = 'fr' | 'en';
export type ThemeMode = 'dark' | 'light';

export interface LocalizedText {
  fr: string;
  en: string;
}

export interface ProjectLinkSet {
  github?: string | null;
  demo?: string | null;
  video?: string | null;
}

export interface ProjectFacet {
  id: 0 | 1 | 2;
  categoryKey: string;
  categoryLabel: LocalizedText;
  description: LocalizedText;
  technologies: LocalizedText[];
  images: string[];
  media: {
    kind: 'youtube';
    embedUrl: string;
    title?: string;
  } | null;
  links: ProjectLinkSet;
  featured: boolean;
}

export interface PortfolioProject {
  id: string;
  numericId: number;
  order: number;
  role: 'presentation' | 'project' | 'hint';
  date: string;
  title: LocalizedText;
  logo: {
    dark: string;
    light: string;
    scale: number;
    opacity: number;
  };
  facets: [ProjectFacet, ProjectFacet, ProjectFacet];
}

export interface AboutSectionContent {
  title: LocalizedText;
  paragraphs: [LocalizedText, LocalizedText];
  skills: Array<{
    title: LocalizedText;
    body: LocalizedText;
  }>;
  contactTitle: LocalizedText;
  contactText: LocalizedText;
}

export interface ContactLink {
  id: 'email' | 'github' | 'x';
  href: string;
  label: LocalizedText;
}

export interface SecretSlot {
  shardId: string;
  slotIndex: number;
  animated: boolean;
  normalizedPosition: {
    x: number;
    y: number;
  };
  worldPosition: {
    x: number;
    y: number;
    z: number;
  };
  snapRadius: number;
  activated: boolean;
  state: 'hidden' | 'preview_forward' | 'locked' | 'unlocking_reverse';
}
