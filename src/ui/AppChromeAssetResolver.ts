export const THEME_TOGGLE_ASSETS = {
  dark: new URL('../../assets/images/shared/theme-icons/moon.svg', import.meta.url).href,
  light: new URL('../../assets/images/shared/theme-icons/sun.svg', import.meta.url).href
} as const;

export const LANGUAGE_BUTTON_ASSETS = {
  fr: new URL('../../assets/images/shared/localization/fr.svg', import.meta.url).href,
  en: new URL('../../assets/images/shared/localization/en.svg', import.meta.url).href
} as const;
