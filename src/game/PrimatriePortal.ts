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

export class PrimatriePortal {
  readonly element: HTMLDivElement;
  private readonly chrome: HTMLDivElement;
  private readonly logo: HTMLImageElement;
  private readonly anchor: HTMLDivElement;
  private readonly themeButton: HTMLImageElement;
  private readonly languageButton: HTMLImageElement;
  private readonly portfolioButton: HTMLButtonElement;
  private readonly singlePlayerButton: HTMLButtonElement;
  private readonly threeVsThreeButton: HTMLButtonElement;
  private readonly tenVsTenButton: HTMLButtonElement;
  private visible = false;
  private locale: Language = 'fr';

  constructor(host: HTMLElement, callbacks: { onPortfolio: () => void; onSinglePlayer: () => void; onThemeToggle: () => void; onLanguageToggle: () => void }) {
    this.element = document.createElement('div');
    this.element.className = 'primatrie-portal';
    this.element.innerHTML = `
      <div class="primatrie-portal__chrome">
        <img class="primatrie-portal__chrome-button primatrie-portal__chrome-button--theme" data-primatrie-theme alt="" role="button" tabindex="0" />
        <img class="primatrie-portal__chrome-button primatrie-portal__chrome-button--language" data-primatrie-language alt="" role="button" tabindex="0" />
      </div>
      <div class="primatrie-portal__logo-wrap">
        <img class="primatrie-portal__logo" data-primatrie-logo alt="Primatrie" />
      </div>
      <div class="primatrie-portal__anchor">
        <div class="primatrie-portal__actions">
          <button type="button" data-primatrie-single></button>
          <button type="button" data-primatrie-3v3 disabled></button>
          <button type="button" data-primatrie-10v10 disabled></button>
          <button type="button" data-primatrie-portfolio></button>
        </div>
      </div>
    `;

    this.chrome = this.element.querySelector<HTMLDivElement>('.primatrie-portal__chrome')!;
    this.logo = this.element.querySelector<HTMLImageElement>('[data-primatrie-logo]')!;
    this.anchor = this.element.querySelector<HTMLDivElement>('.primatrie-portal__anchor')!;
    this.themeButton = this.element.querySelector<HTMLImageElement>('[data-primatrie-theme]')!;
    this.languageButton = this.element.querySelector<HTMLImageElement>('[data-primatrie-language]')!;
    this.portfolioButton = this.element.querySelector<HTMLButtonElement>('[data-primatrie-portfolio]')!;
    this.singlePlayerButton = this.element.querySelector<HTMLButtonElement>('[data-primatrie-single]')!;
    this.threeVsThreeButton = this.element.querySelector<HTMLButtonElement>('[data-primatrie-3v3]')!;
    this.tenVsTenButton = this.element.querySelector<HTMLButtonElement>('[data-primatrie-10v10]')!;

    this.portfolioButton.textContent = 'Portfolio';
    this.singlePlayerButton.textContent = 'Aventure';
    this.threeVsThreeButton.textContent = '3v3';
    this.tenVsTenButton.textContent = '10v10';

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
    } else {
      this.element.removeAttribute('inert');
    }
    this.element.hidden = !visible;
    this.element.setAttribute('aria-hidden', String(!visible));
    this.element.classList.toggle('is-visible', visible);
  }

  setLocale(locale: Language) {
    this.locale = locale;
    this.renderStatic();
  }

  setAnchor(screenX: number, screenY: number, scale = 1) {
    this.anchor.style.setProperty('--primatrie-anchor-x', `${screenX.toFixed(2)}px`);
    this.anchor.style.setProperty('--primatrie-anchor-y', `${screenY.toFixed(2)}px`);
    this.anchor.style.setProperty('--primatrie-anchor-scale', scale.toFixed(3));
  }

  private renderStatic() {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    this.logo.src = HUB_LOGO_ASSETS[theme];
    this.themeButton.src = THEME_TOGGLE_ASSETS[theme];
    this.languageButton.src = LANGUAGE_BUTTON_ASSETS[this.locale];
    this.singlePlayerButton.textContent = this.locale === 'fr' ? 'Aventure' : 'Adventure';
    this.themeButton.setAttribute('aria-label', this.locale === 'fr' ? 'Changer le theme' : 'Change theme');
    this.languageButton.setAttribute('aria-label', this.locale === 'fr' ? 'Changer la langue' : 'Change language');
  }
}
