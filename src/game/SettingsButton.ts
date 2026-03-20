import { observeThemeChanges, resolveThemeAsset } from './ThemeAssetResolver';

export const SETTINGS_BUTTON_ASSETS = {
  dark: new URL('../../assets/images/spritesheet/hud_parametredarksvg.svg', import.meta.url).href,
  light: new URL('../../assets/images/spritesheet/hud_parametrelightsvg.svg', import.meta.url).href
} as const;

export class SettingsButton {
  readonly element: HTMLButtonElement;
  private readonly image: HTMLImageElement;
  private readonly stopObservingTheme: () => void;

  constructor(label: string) {
    this.element = document.createElement('button');
    this.element.type = 'button';
    this.element.className = 'game-hud__settings-toggle';
    this.element.setAttribute('aria-label', label);
    this.element.setAttribute('aria-haspopup', 'true');
    this.element.setAttribute('aria-expanded', 'false');

    this.image = document.createElement('img');
    this.image.className = 'game-hud__settings-toggle-icon';
    this.image.alt = '';
    this.image.decoding = 'async';

    this.element.appendChild(this.image);
    this.stopObservingTheme = observeThemeChanges((theme) => {
      this.image.src = resolveThemeAsset(SETTINGS_BUTTON_ASSETS, theme);
    });
  }

  setExpanded(expanded: boolean) {
    this.element.classList.toggle('is-open', expanded);
    this.element.setAttribute('aria-expanded', String(expanded));
  }

  dispose() {
    this.stopObservingTheme();
  }
}
