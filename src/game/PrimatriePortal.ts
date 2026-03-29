import type { Language } from '../types/content';
import { THEME_TOGGLE_ASSETS } from './GameUiAssetResolver';

const LANGUAGE_BUTTON_ASSETS = {
  fr: new URL('../../assets/images/shared/localization/fr.svg', import.meta.url).href,
  en: new URL('../../assets/images/shared/localization/en.svg', import.meta.url).href
} as const;

const HUB_LOGO_ASSETS = {
  dark: new URL('../../assets/images/shared/branding/primaterie-mark-light.svg', import.meta.url).href,
  light: new URL('../../assets/images/shared/branding/primaterie-mark-dark.svg', import.meta.url).href
} as const;

export type primaterieModeId = 'adventure' | '3v3' | '10v10' | 'portfolio';

export class primateriePortal {
  readonly element: HTMLDivElement;
  private readonly logo: HTMLImageElement;
  private readonly anchor: HTMLDivElement;
  private readonly themeButton: HTMLImageElement;
  private readonly languageButton: HTMLImageElement;
  private readonly portfolioButton: HTMLButtonElement;
  private readonly singlePlayerButton: HTMLButtonElement;
  private readonly threeVsThreeButton: HTMLButtonElement;
  private readonly tenVsTenButton: HTMLButtonElement;
  private visible = false;
  private busy = false;
  private locale: Language = 'fr';

  constructor(
    host: HTMLElement,
    callbacks: {
      onPortfolio: () => void;
      onSinglePlayer: () => void;
      onThemeToggle: () => void;
      onLanguageToggle: () => void;
    }
  ) {
    this.element = document.createElement('div');
    this.element.className = 'primaterie-portal';
    this.element.innerHTML = `
      <div class="primaterie-portal__chrome">
        <img class="primaterie-portal__chrome-button primaterie-portal__chrome-button--theme" data-primaterie-theme alt="" role="button" tabindex="0" />
        <img class="primaterie-portal__chrome-button primaterie-portal__chrome-button--language" data-primaterie-language alt="" role="button" tabindex="0" />
      </div>
      <div class="primaterie-portal__logo-wrap">
        <img class="primaterie-portal__logo" data-primaterie-logo alt="primaterie" />
      </div>
      <div class="primaterie-portal__anchor">
        <div class="primaterie-portal__actions">
          <button type="button" data-primaterie-single></button>
          <button type="button" data-primaterie-3v3 disabled></button>
          <button type="button" data-primaterie-10v10 disabled></button>
          <button type="button" data-primaterie-portfolio></button>
        </div>
      </div>
    `;

    this.logo = this.element.querySelector<HTMLImageElement>('[data-primaterie-logo]')!;
    this.anchor = this.element.querySelector<HTMLDivElement>('.primaterie-portal__anchor')!;
    this.themeButton = this.element.querySelector<HTMLImageElement>('[data-primaterie-theme]')!;
    this.languageButton = this.element.querySelector<HTMLImageElement>('[data-primaterie-language]')!;
    this.portfolioButton = this.element.querySelector<HTMLButtonElement>('[data-primaterie-portfolio]')!;
    this.singlePlayerButton = this.element.querySelector<HTMLButtonElement>('[data-primaterie-single]')!;
    this.threeVsThreeButton = this.element.querySelector<HTMLButtonElement>('[data-primaterie-3v3]')!;
    this.tenVsTenButton = this.element.querySelector<HTMLButtonElement>('[data-primaterie-10v10]')!;

    this.portfolioButton.addEventListener('click', callbacks.onPortfolio);
    this.singlePlayerButton.addEventListener('click', callbacks.onSinglePlayer);
    this.themeButton.addEventListener('click', callbacks.onThemeToggle);
    this.languageButton.addEventListener('click', callbacks.onLanguageToggle);
    this.themeButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        callbacks.onThemeToggle();
      }
    });
    this.languageButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        callbacks.onLanguageToggle();
      }
    });

    this.element.hidden = true;
    this.renderStatic();
    host.appendChild(this.element);
  }

  get isVisible() {
    return this.visible;
  }

  setVisible(visible: boolean) {
    this.visible = visible;
    if (!visible) {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement && this.element.contains(activeElement)) {
        activeElement.blur();
      }
      this.element.setAttribute('inert', '');
      this.setBusy(false);
    } else {
      this.element.removeAttribute('inert');
    }
    this.element.hidden = !visible;
    this.element.setAttribute('aria-hidden', String(!visible));
    this.element.classList.toggle('is-visible', visible);
  }

  setBusy(busy: boolean) {
    this.busy = busy;
    this.element.classList.toggle('is-busy', busy);
    this.singlePlayerButton.disabled = busy;
    this.portfolioButton.disabled = busy;
    this.threeVsThreeButton.disabled = true;
    this.tenVsTenButton.disabled = true;
  }

  setLocale(locale: Language) {
    this.locale = locale;
    this.renderStatic();
  }

  setAnchor(screenX: number, screenY: number, scale = 1) {
    this.anchor.style.setProperty('--primaterie-anchor-x', `${screenX.toFixed(2)}px`);
    this.anchor.style.setProperty('--primaterie-anchor-y', `${screenY.toFixed(2)}px`);
    this.anchor.style.setProperty('--primaterie-anchor-scale', scale.toFixed(3));
  }

  private renderStatic() {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    this.logo.src = HUB_LOGO_ASSETS[theme];
    this.themeButton.src = THEME_TOGGLE_ASSETS[theme];
    this.languageButton.src = LANGUAGE_BUTTON_ASSETS[this.locale];
    this.singlePlayerButton.textContent = this.locale === 'fr' ? 'Aventure' : 'Adventure';
    this.portfolioButton.textContent = 'Portfolio';
    this.threeVsThreeButton.textContent = '3v3';
    this.tenVsTenButton.textContent = '10v10';
    this.themeButton.setAttribute('aria-label', this.locale === 'fr' ? 'Changer le theme' : 'Change theme');
    this.languageButton.setAttribute('aria-label', this.locale === 'fr' ? 'Changer la langue' : 'Change language');
    this.setBusy(this.busy);
  }
}
