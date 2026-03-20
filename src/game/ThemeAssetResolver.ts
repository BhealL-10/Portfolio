import type { ThemeMode } from '../types/content';

export interface ThemeAssetSet {
  dark: string;
  light: string;
}

export function resolveDocumentTheme(): ThemeMode {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function resolveThemeAsset(assets: ThemeAssetSet, theme = resolveDocumentTheme()) {
  return assets[theme];
}

export function observeThemeChanges(listener: (theme: ThemeMode) => void) {
  const emit = () => listener(resolveDocumentTheme());
  const observer = new MutationObserver((mutations) => {
    if (mutations.some((mutation) => mutation.attributeName === 'data-theme')) {
      emit();
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  emit();
  return () => observer.disconnect();
}
