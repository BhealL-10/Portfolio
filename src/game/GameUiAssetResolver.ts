import type { Language } from '../types/content';

export type GameUiButtonAsset = 'restart' | 'back' | 'highscore' | 'buy' | 'hub';
export type ThemeAsset = 'dark' | 'light';

const BUTTON_ASSETS = {
  restart: {
    fr: {
      dark: new URL('../../assets/images/game/ui/buttons/labels/fr-restart-dark.svg', import.meta.url).href,
      light: new URL('../../assets/images/game/ui/buttons/labels/fr-restart-light.svg', import.meta.url).href
    },
    en: {
      dark: new URL('../../assets/images/game/ui/buttons/labels/en-restart-dark.svg', import.meta.url).href,
      light: new URL('../../assets/images/game/ui/buttons/labels/en-restart-light.svg', import.meta.url).href
    }
  },
  back: {
    fr: {
      dark: new URL('../../assets/images/game/ui/buttons/labels/fr-back-dark.svg', import.meta.url).href,
      light: new URL('../../assets/images/game/ui/buttons/labels/fr-back-light.svg', import.meta.url).href
    },
    en: {
      dark: new URL('../../assets/images/game/ui/buttons/labels/en-back-dark.svg', import.meta.url).href,
      light: new URL('../../assets/images/game/ui/buttons/labels/en-back-light.svg', import.meta.url).href
    }
  },
  highscore: {
    fr: {
      dark: new URL('../../assets/images/game/ui/buttons/labels/fr-highscore-dark.svg', import.meta.url).href,
      light: new URL('../../assets/images/game/ui/buttons/labels/fr-highscore-light.svg', import.meta.url).href
    },
    en: {
      dark: new URL('../../assets/images/game/ui/buttons/labels/en-highscore-dark.svg', import.meta.url).href,
      light: new URL('../../assets/images/game/ui/buttons/labels/en-highscore-light.svg', import.meta.url).href
    }
  },
  buy: {
    fr: {
      dark: new URL('../../assets/images/game/ui/buttons/labels/fr-buy-dark.svg', import.meta.url).href,
      light: new URL('../../assets/images/game/ui/buttons/labels/fr-buy-light.svg', import.meta.url).href
    },
    en: {
      dark: new URL('../../assets/images/game/ui/buttons/labels/en-buy-dark.svg', import.meta.url).href,
      light: new URL('../../assets/images/game/ui/buttons/labels/en-buy-light.svg', import.meta.url).href
    }
  },
  hub: {
    fr: {
      dark: new URL('../../assets/images/game/ui/buttons/labels/fr-hub-dark.svg', import.meta.url).href,
      light: new URL('../../assets/images/game/ui/buttons/labels/fr-hub-light.svg', import.meta.url).href
    },
    en: {
      dark: new URL('../../assets/images/game/ui/buttons/labels/en-hub-dark.svg', import.meta.url).href,
      light: new URL('../../assets/images/game/ui/buttons/labels/en-hub-light.svg', import.meta.url).href
    }
  }
} as const;

export const THEME_TOGGLE_ASSETS = {
  dark: new URL('../../assets/images/shared/theme-icons/moon.svg', import.meta.url).href,
  light: new URL('../../assets/images/shared/theme-icons/sun.svg', import.meta.url).href
} as const;

export const HELP_ICON_ASSETS = {
  dark: new URL('../../assets/images/game/ui/buttons/icons/help-dark.svg', import.meta.url).href,
  light: new URL('../../assets/images/game/ui/buttons/icons/help-light.svg', import.meta.url).href
} as const;

export const ACHIEVEMENT_ICON_ASSETS = {
  dark: new URL('../../assets/images/game/ui/buttons/icons/achievement-dark.svg', import.meta.url).href,
  light: new URL('../../assets/images/game/ui/buttons/icons/achievement-light.svg', import.meta.url).href
} as const;

export const ACHIEVEMENT_RARITY_ICON_ASSETS = {
  common: new URL('../../assets/images/game/ui/equipment/rarities/common.png', import.meta.url).href,
  uncommon: new URL('../../assets/images/game/ui/equipment/rarities/uncommon.png', import.meta.url).href,
  rare: new URL('../../assets/images/game/ui/equipment/rarities/rare.png', import.meta.url).href,
  epic: new URL('../../assets/images/game/ui/equipment/rarities/epic.png', import.meta.url).href,
  legendary: new URL('../../assets/images/game/ui/equipment/rarities/legendary.png', import.meta.url).href
} as const;

export const SHOP_ICON_ASSETS = {
  dark: new URL('../../assets/images/game/ui/buttons/icons/shop-dark.svg', import.meta.url).href,
  light: new URL('../../assets/images/game/ui/buttons/icons/shop-light.svg', import.meta.url).href
} as const;

export const SECONDARY_NAV_ASSETS = {
  left: {
    dark: new URL('../../assets/images/game/ui/buttons/icons/arrow-left-dark.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/buttons/icons/arrow-left-light.svg', import.meta.url).href
  },
  right: {
    dark: new URL('../../assets/images/game/ui/buttons/icons/arrow-right-dark.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/buttons/icons/arrow-right-light.svg', import.meta.url).href
  },
  close: {
    dark: new URL('../../assets/images/game/ui/buttons/icons/close-dark.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/buttons/icons/close-light.svg', import.meta.url).href
  }
} as const;

export const SOUND_BUTTON_ASSETS = {
  on: {
    dark: new URL('../../assets/images/game/ui/buttons/icons/sound-on-dark.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/buttons/icons/sound-on-light.svg', import.meta.url).href
  },
  off: {
    dark: new URL('../../assets/images/game/ui/buttons/icons/sound-off-dark.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/buttons/icons/sound-off-light.svg', import.meta.url).href
  },
  sprite: new URL('../../assets/images/game/ui/meters/fill-strip.png', import.meta.url).href
} as const;

export const FULLSCREEN_BUTTON_ASSETS = {
  on: {
    dark: new URL('../../assets/images/game/ui/buttons/icons/fullscreen-on-dark.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/buttons/icons/fullscreen-on-light.svg', import.meta.url).href
  },
  off: {
    dark: new URL('../../assets/images/game/ui/buttons/icons/fullscreen-off-dark.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/buttons/icons/fullscreen-off-light.svg', import.meta.url).href
  }
} as const;

export const SAVE_BUTTON_ASSETS = {
  dark: new URL('../../assets/images/game/ui/buttons/labels/save-light.svg', import.meta.url).href,
  light: new URL('../../assets/images/game/ui/buttons/labels/save-dark.svg', import.meta.url).href
} as const;

export const LEADERBOARD_SAVE_BUTTON_ASSETS = SAVE_BUTTON_ASSETS;

export function getUIButtonAsset(type: GameUiButtonAsset, language: Language, theme: ThemeAsset) {
  return BUTTON_ASSETS[type][language][theme];
}
