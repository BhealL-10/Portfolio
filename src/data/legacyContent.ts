import type { LocalizedText, PortfolioProject, ProjectFacet, ProjectLinkSet } from '../types/content';
import { getShardRole } from '../portfolio/shardLayout';

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
  const config = SHARD_LOGOS_CONFIG as Record<string, Partial<typeof defaultLogo>>;
  const entry = config[String(projectId)] || {};

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
  const role = getShardRole(index, metadata.length);

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
    role,
    date: projectMeta.date,
    title: {
      fr: role === 'hint' ? 'INDICE' : frProject.title,
      en: role === 'hint' ? 'HINT' : enProject.title
    },
    logo: resolveLogoConfig(projectMeta.id),
    facets:
      role === 'hint'
        ? ([
            {
              ...facets[0],
              categoryKey: 'hint',
              categoryLabel: { fr: 'Indice', en: 'Hint' },
              description: {
                fr: 'Tous les fragments n’attendent pas le focus. Certains veulent retrouver une forme précise. Observe le X, puis ce point sous sa blessure centrale.',
                en: 'Not every fragment wants focus. Some want to recover a precise form. Watch the X, then the dot below its central wound.'
              },
              technologies: [
                { fr: 'Mystère', en: 'Mystery' },
                { fr: 'Placement', en: 'Placement' },
                { fr: 'Transformation', en: 'Transformation' },
                { fr: 'Jeu caché', en: 'Hidden game' },
                { fr: 'Clé d’accès', en: 'Access key' }
              ]
            },
            {
              ...facets[1],
              categoryKey: 'hint',
              categoryLabel: { fr: 'Accès', en: 'Access' },
              description: {
                fr: 'Quand chaque shard rejoint son empreinte, le monde cesse d’être un portfolio et bascule vers une autre règle.',
                en: 'When every shard reaches its imprint, the world stops being a portfolio and switches to another rule.'
              },
              technologies: [
                { fr: 'Pivot', en: 'Pivot' },
                { fr: 'Constellation', en: 'Constellation' },
                { fr: 'Déblocage', en: 'Unlock' },
                { fr: 'Momentum', en: 'Momentum' },
                { fr: 'Transition', en: 'Transition' }
              ]
            },
            {
              ...facets[2],
              categoryKey: 'hint',
              categoryLabel: { fr: 'Conseil', en: 'Clue' },
              description: {
                fr: 'Ne cherche pas un bouton. Replace les fragments. Le fil de lumière ne ment jamais.',
                en: 'Do not search for a button. Put the fragments back into place. The line of light never lies.'
              },
              technologies: [
                { fr: 'Patience', en: 'Patience' },
                { fr: 'Lecture', en: 'Reading' },
                { fr: 'Exploration', en: 'Exploration' },
                { fr: 'Déverrouillage', en: 'Unlocking' },
                { fr: 'Secret', en: 'Secret' }
              ]
            }
          ] as [ProjectFacet, ProjectFacet, ProjectFacet])
        : facets
  };
});

export function getProjectCount() {
  return portfolioProjects.length;
}
