import type { Language, LocalizedText, PortfolioProject, ProjectFacet, ProjectLinkSet } from '../types/content';

// Legacy data kept as source-of-truth during migration.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { projectsMetadata } from '../../assets/js/data/projects_metadata.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { projectTranslations } from '../../assets/js/data/translations.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SHARD_LOGOS_CONFIG } from '../../assets/js/config/shardLogosConfig.js';

const defaultLogo = {
  dark: '/assets/images/Logo/logomodedark.svg',
  light: '/assets/images/Logo/logomodelight.svg',
  scale: 0.7,
  opacity: 1
};

const categoryLabels: Record<string, LocalizedText> = {
  presentation: { fr: 'Présentation', en: 'Introduction' },
  services: { fr: 'Services', en: 'Services' },
  about: { fr: 'À propos', en: 'About' },
  dev: { fr: 'Développement', en: 'Development' },
  video: { fr: 'Vidéo', en: 'Video' },
  tech: { fr: 'IA & technique', en: 'AI & tech' },
  design: { fr: 'Design', en: 'Design' },
  gamedesign: { fr: 'Game design', en: 'Game design' },
  business: { fr: 'Stratégie', en: 'Strategy' }
};

interface LegacyMetadataFacet {
  id: number;
  images?: string[];
  links?: ProjectLinkSet;
  featured?: boolean;
}

interface LegacyMetadataProject {
  id: number;
  activeFacette: number;
  date: string;
  facettes: LegacyMetadataFacet[];
}

interface LegacyTranslationFacet {
  category: string;
  longDescription: string;
  technologies: string[];
}

interface LegacyTranslationProject {
  id: number;
  title: string;
  facettes: LegacyTranslationFacet[];
}

function normalizeLinks(links: ProjectLinkSet | undefined): ProjectLinkSet {
  return {
    github: links?.github || null,
    demo: links?.demo || null,
    video: links?.video || null
  };
}

function normalizeTechnologies(values: string[], fallbackLang: Language): LocalizedText[] {
  return values.map((value) => ({
    fr: fallbackLang === 'fr' ? value : value,
    en: fallbackLang === 'en' ? value : value
  }));
}

function buildFacet(
  index: number,
  frFacet: LegacyTranslationFacet,
  enFacet: LegacyTranslationFacet,
  metaFacet: LegacyMetadataFacet
): ProjectFacet {
  const categoryKey = frFacet.category;
  const categoryLabel = categoryLabels[categoryKey] || {
    fr: categoryKey,
    en: enFacet.category || categoryKey
  };

  return {
    id: index as 0 | 1 | 2,
    categoryKey,
    categoryLabel,
    description: {
      fr: frFacet.longDescription,
      en: enFacet.longDescription
    },
    technologies: frFacet.technologies.map((tech, techIndex) => ({
      fr: tech,
      en: enFacet.technologies[techIndex] || tech
    })),
    images: metaFacet.images ? metaFacet.images.map((image) => `/${image}`) : [],
    links: normalizeLinks(metaFacet.links),
    featured: Boolean(metaFacet.featured)
  };
}

function resolveLogoConfig(projectId: number) {
  const entry = SHARD_LOGOS_CONFIG[String(projectId)] || {};

  return {
    dark: entry.dark ? `/${entry.dark}` : defaultLogo.dark,
    light: entry.light ? `/${entry.light}` : defaultLogo.light,
    scale: typeof entry.scale === 'number' ? entry.scale : defaultLogo.scale,
    opacity: typeof entry.opacity === 'number' ? entry.opacity : defaultLogo.opacity
  };
}

const metadata = projectsMetadata as LegacyMetadataProject[];
const frTranslations = projectTranslations.fr as LegacyTranslationProject[];
const enTranslations = projectTranslations.en as LegacyTranslationProject[];

export const portfolioProjects: PortfolioProject[] = metadata.map((projectMeta, index) => {
  const frProject = frTranslations[index];
  const enProject = enTranslations[index];

  const facets = projectMeta.facettes.map((facetMeta, facetIndex) =>
    buildFacet(
      facetIndex,
      frProject.facettes[facetIndex],
      enProject.facettes[facetIndex],
      facetMeta
    )
  ) as [ProjectFacet, ProjectFacet, ProjectFacet];

  return {
    id: `shard-${projectMeta.id}`,
    numericId: projectMeta.id,
    order: index,
    date: projectMeta.date,
    title: {
      fr: frProject.title,
      en: enProject.title
    },
    logo: resolveLogoConfig(projectMeta.id),
    facets
  };
});

export function getProjectCount() {
  return portfolioProjects.length;
}
