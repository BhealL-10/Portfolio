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

export function getUIButtonAsset(type: GameUiButtonAsset, language: Language, theme: ThemeAsset) {
  return BUTTON_ASSETS[type][language][theme];
}
