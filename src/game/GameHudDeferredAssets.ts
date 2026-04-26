import { preloadImageAsset } from '../core/browserAssetCache';

export interface GameHudAvatarLayerSets {
  oreille: string[];
  face: string[];
  eyes: string[];
  facemotif: string[];
  accessoire: string[];
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

function buildHelpCacheKey(locale: HelpLocale, theme: HelpTheme, limit?: number) {
  return `${locale}:${theme}:${limit ?? 'all'}`;
}

function isMobileAssetWarmupRuntime() {
  return (
    typeof window !== 'undefined' &&
    (window.matchMedia?.('(pointer: coarse)').matches || (window.navigator.maxTouchPoints ?? 0) > 1)
  );
}

async function preloadDeferredImages(assets: string[]) {
  const batchSize = isMobileAssetWarmupRuntime() ? 4 : assets.length;
  for (let index = 0; index < assets.length; index += batchSize) {
    const batch = assets.slice(index, index + batchSize);
    await Promise.all(batch.map((src) => preloadImageAsset(src)));
    if (isMobileAssetWarmupRuntime() && index + batchSize < assets.length) {
      await new Promise<void>((resolve) => window.setTimeout(resolve, 32));
    }
  }
}

function extractRuleOrder(value: string) {
  return Number((value.match(/rules(\d+)|rules-(\d+)/i)?.slice(1).find(Boolean)) ?? 0);
}

function isMobileHelpCandidate(path: string, name: string) {
  const normalizedPath = path.toLowerCase();
  const normalizedName = name.toLowerCase();
  return normalizedPath.includes('/mobile/') || normalizedName.includes('-mobile.');
}

function getLocalizedHelpCandidates(
  candidates: Array<{
    path: string;
    load: () => Promise<string>;
    name: string;
  }>,
  locale: HelpLocale,
  theme: HelpTheme,
  options: {
    preferMobileVariant?: boolean;
  } = {}
) {
  const normalizedLocale = locale.toLowerCase();
  const normalizedTheme = theme.toLowerCase();
  const filtered = candidates.filter(({ path, name }) => {
    const normalizedPath = path.toLowerCase();
    return normalizedPath.includes(`/${normalizedLocale}/${normalizedTheme}/`) && /rules\d+-(dark|light)/i.test(name);
  });

  if (!options.preferMobileVariant || filtered.length <= 0) {
    return filtered;
  }

  const mobilePreferred = filtered.filter(({ path, name }) => isMobileHelpCandidate(path, name));
  return mobilePreferred.length > 0 ? mobilePreferred : filtered;
}

function getHelpCandidates(locale: HelpLocale, theme: HelpTheme) {
  const candidates = Object.entries(HELP_IMAGE_MODULES)
    .map(([path, load]) => ({ path, load, name: path.split('/').pop() ?? '' }))
    .sort((a, b) => extractRuleOrder(a.name) - extractRuleOrder(b.name));

  const localized = getLocalizedHelpCandidates(candidates, locale, theme, {
    preferMobileVariant: isMobileAssetWarmupRuntime()
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

export function loadHelpPagesFor(locale: HelpLocale, theme: HelpTheme, options: { limit?: number } = {}) {
  const cacheKey = buildHelpCacheKey(locale, theme, options.limit);
  const cached = helpPageCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const candidates = getHelpCandidates(locale, theme);
  const selectedCandidates = typeof options.limit === 'number' ? candidates.slice(0, Math.max(0, options.limit)) : candidates;
  const request = (async () => {
    const pages: string[] = [];
    for (const { load } of selectedCandidates) {
      const page = await load();
      if (page) {
        pages.push(page);
      }
    }
    return pages;
  })();
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
        const aIndex = Number((a.path.match(/[-_](\d+)\.png$/)?.[1]) ?? 0);
        const bIndex = Number((b.path.match(/[-_](\d+)\.png$/)?.[1]) ?? 0);
        return aIndex - bIndex;
      })
  ).then(async (entries) => {
    const sets: GameHudAvatarLayerSets = {
      oreille: [],
      face: [],
      eyes: [],
      facemotif: [],
      accessoire: []
    };

    for (const { path, load } of entries) {
      const src = await load();
      const humanIndex = Number((path.match(/[-_](\d+)\.png$/)?.[1]) ?? 0);
      const targetIndex = Math.max(0, humanIndex - 1);
      if (path.includes('/oreille/')) {
        sets.oreille[targetIndex] = src;
      } else if (path.includes('/face/')) {
        sets.face[targetIndex] = src;
      } else if (path.includes('/eyes/')) {
        sets.eyes[targetIndex] = src;
      } else if (path.includes('/facemotif/')) {
        sets.facemotif[targetIndex] = src;
      } else if (path.includes('/accessoire/')) {
        sets.accessoire[targetIndex] = src;
      }
    }

    return sets;
  });

  return avatarLayerSetsPromise;
}

export async function preloadHelpPagesFor(locale: HelpLocale, theme: HelpTheme) {
  const pages = await loadHelpPagesFor(locale, theme);
  await preloadDeferredImages(pages);
  return pages;
}

export async function preloadAvatarLayerSets() {
  const sets = await loadAvatarLayerSets();
  const assets = Object.values(sets).flatMap((layer) => layer).filter(Boolean);
  await preloadDeferredImages(assets);
  return sets;
}
