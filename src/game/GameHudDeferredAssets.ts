export interface GameHudAvatarLayerSets {
  background: string[];
  motif: string[];
  face: string[];
  eyes: string[];
  barbe: string[];
}

type HelpTheme = 'dark' | 'light';
type HelpLocale = 'fr' | 'en';

const HELP_IMAGE_MODULES = import.meta.glob('../../assets/images/game/ui/help/**/*.{png,jpg,jpeg,webp,avif}', {
  import: 'default'
}) as Record<string, () => Promise<string>>;

const AVATAR_LAYER_MODULES = import.meta.glob('../../assets/Avatar_asset/*/*.png', {
  import: 'default'
}) as Record<string, () => Promise<string>>;

const helpPageCache = new Map<string, Promise<string[]>>();
let avatarLayerSetsPromise: Promise<GameHudAvatarLayerSets> | null = null;

function extractRuleOrder(value: string) {
  return Number((value.match(/rules(\d+)|rules-(\d+)/i)?.slice(1).find(Boolean)) ?? 0);
}

function getHelpCandidates(locale: HelpLocale, theme: HelpTheme) {
  const candidates = Object.entries(HELP_IMAGE_MODULES)
    .map(([path, load]) => ({ path, load, name: path.split('/').pop() ?? '' }))
    .sort((a, b) => extractRuleOrder(a.name) - extractRuleOrder(b.name));

  const localized = candidates.filter(({ path, name }) => {
    const normalizedPath = path.toLowerCase();
    return normalizedPath.includes(`/${locale}/${theme}/`) && /rules\d+-(dark|light)\./i.test(name);
  });
  if (localized.length > 0) {
    return localized;
  }

  const localeFallback = candidates.filter(({ name }) => new RegExp(`^${locale}-rules-\\d+\\.`, 'i').test(name));
  if (localeFallback.length > 0) {
    return localeFallback;
  }

  const englishLocalized = candidates.filter(({ path, name }) => {
    const normalizedPath = path.toLowerCase();
    return normalizedPath.includes(`/en/${theme}/`) && /rules\d+-(dark|light)\./i.test(name);
  });
  if (englishLocalized.length > 0) {
    return englishLocalized;
  }

  return candidates.filter(({ name }) => /^en-rules-\d+\./i.test(name));
}

export function loadHelpPagesFor(locale: HelpLocale, theme: HelpTheme) {
  const cacheKey = `${locale}:${theme}`;
  const cached = helpPageCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const request = Promise.all(getHelpCandidates(locale, theme).map(async ({ load }) => load()))
    .then((pages) => pages.filter((page): page is string => Boolean(page)));
  helpPageCache.set(cacheKey, request);
  return request;
}

export function loadAvatarLayerSets() {
  if (avatarLayerSetsPromise) {
    return avatarLayerSetsPromise;
  }

  avatarLayerSetsPromise = Promise.resolve(
    Object.entries(AVATAR_LAYER_MODULES)
      .map(([path, load]) => ({ path, load }))
      .sort((a, b) => {
        const aIndex = Number((a.path.match(/_(\d+)\.png$/)?.[1]) ?? 0);
        const bIndex = Number((b.path.match(/_(\d+)\.png$/)?.[1]) ?? 0);
        return aIndex - bIndex;
      })
  ).then(async (entries) => {
    const sets: GameHudAvatarLayerSets = {
      background: [],
      motif: [],
      face: [],
      eyes: [],
      barbe: []
    };

    for (const { path, load } of entries) {
      const src = await load();
      if (path.includes('/oreille/')) {
        sets.background.push(src);
      } else if (path.includes('/face/')) {
        sets.motif.push(src);
      } else if (path.includes('/eyes/')) {
        sets.face.push(src);
      } else if (path.includes('/facemotif/')) {
        sets.eyes.push(src);
      } else if (path.includes('/accessoire/')) {
        sets.barbe.push(src);
      }
    }

    return sets;
  });

  return avatarLayerSetsPromise;
}
