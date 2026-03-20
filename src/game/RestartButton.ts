import { observeThemeChanges, resolveThemeAsset } from './ThemeAssetResolver';

export const RESTART_BUTTON_ASSETS = {
  dark: new URL('../../assets/images/spritesheet/hud_restartbtnlight.svg', import.meta.url).href,
  light: new URL('../../assets/images/spritesheet/hud_restartbtndark.svg', import.meta.url).href
} as const;

export class RestartButton {
  readonly element: HTMLButtonElement;
  private readonly image: HTMLImageElement;
  private readonly stopObservingTheme: () => void;

  constructor(button: HTMLButtonElement, label: string) {
    this.element = button;
    this.element.classList.add('game-hud__restart-button');
    this.setLabel(label);
    this.element.textContent = '';

    this.image = document.createElement('img');
    this.image.className = 'game-hud__restart-button-icon';
    this.image.alt = '';
    this.image.decoding = 'async';
    this.element.appendChild(this.image);

    this.stopObservingTheme = observeThemeChanges((theme) => {
      this.image.src = resolveThemeAsset(RESTART_BUTTON_ASSETS, theme);
    });
  }

  setLabel(label: string) {
    this.element.setAttribute('aria-label', label);
  }

  dispose() {
    this.stopObservingTheme();
  }
}
