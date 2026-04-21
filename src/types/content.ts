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

export type ProjectFacetAssetKind = 'image' | 'gif' | 'youtube' | 'site';

export interface ProjectFacetAsset {
  kind: ProjectFacetAssetKind;
  src?: string;
  href?: string;
  embedUrl?: string;
  title?: LocalizedText;
  label?: LocalizedText;
}

export interface ProjectFacet {
  id: 0 | 1 | 2;
  categoryKey: string;
  categoryLabel: LocalizedText;
  description: LocalizedText;
  technologies: LocalizedText[];
  images: string[];
  assets?: ProjectFacetAsset[];
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
    src: string;
    scale: number;
    opacity: number;
  };
  facets: [ProjectFacet, ProjectFacet, ProjectFacet];
}

export interface AboutSectionContent {
  title: LocalizedText;
  emailAddress: string;
  directLabel: LocalizedText;
  directHint: LocalizedText;
  formTitle: LocalizedText;
  formIntro: LocalizedText;
  fields: {
    name: LocalizedText;
    email: LocalizedText;
    interest: LocalizedText;
    message: LocalizedText;
  };
  placeholders: {
    name: LocalizedText;
    email: LocalizedText;
    interest: LocalizedText;
    message: LocalizedText;
  };
  submitLabel: LocalizedText;
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
