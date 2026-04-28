import type { GameAssetTier } from '../core/gameQuality';

type CommunityTheme = 'dark' | 'light';

export interface CommunityButtonAssetSet {
  discord: Record<CommunityTheme, string>;
  patreon: Record<CommunityTheme, string>;
}

const NORMAL_COMMUNITY_BUTTON_ASSETS: CommunityButtonAssetSet = {
  discord: {
    dark: new URL('../../assets/images/portfolio/projects/shared/discord-btn-light.png', import.meta.url).href,
    light: new URL('../../assets/images/portfolio/projects/shared/discord-btn-dark.png', import.meta.url).href
  },
  patreon: {
    dark: new URL('../../assets/images/portfolio/projects/shared/patreon-btn-light.png', import.meta.url).href,
    light: new URL('../../assets/images/portfolio/projects/shared/patreon-btn-dark.png', import.meta.url).href
  }
};

const LOW_RES_COMMUNITY_BUTTON_ASSETS: CommunityButtonAssetSet = {
  discord: {
    dark: new URL('../../assets/images/portfolio/projects/shared/discord-btn-light.low.webp', import.meta.url).href,
    light: new URL('../../assets/images/portfolio/projects/shared/discord-btn-dark.low.webp', import.meta.url).href
  },
  patreon: {
    dark: new URL('../../assets/images/portfolio/projects/shared/patreon-btn-light.low.webp', import.meta.url).href,
    light: new URL('../../assets/images/portfolio/projects/shared/patreon-btn-dark.low.webp', import.meta.url).href
  }
};

export function resolveCommunityButtonAssetSet(assetTier: GameAssetTier): CommunityButtonAssetSet {
  return assetTier === 'low-res' ? LOW_RES_COMMUNITY_BUTTON_ASSETS : NORMAL_COMMUNITY_BUTTON_ASSETS;
}
