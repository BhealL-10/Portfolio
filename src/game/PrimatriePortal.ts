import type { Language } from '../types/content';
import { LANGUAGE_BUTTON_ASSETS, THEME_TOGGLE_ASSETS } from './GameUiAssetResolver';

const HUB_LOGO_ASSETS = {
  dark: new URL('../../assets/images/shared/branding/primaterie-mark-light.svg', import.meta.url).href,
  light: new URL('../../assets/images/shared/branding/primaterie-mark-dark.svg', import.meta.url).href
} as const;

const COMMUNITY_BUTTON_ASSETS = {
  discord: {
    dark: new URL('../../assets/images/portfolio/projects/shared/discord-btn-light.png', import.meta.url).href,
    light: new URL('../../assets/images/portfolio/projects/shared/discord-btn-dark.png', import.meta.url).href
  },
  patreon: {
    dark: new URL('../../assets/images/portfolio/projects/shared/patreon-btn-light.png', import.meta.url).href,
    light: new URL('../../assets/images/portfolio/projects/shared/patreon-btn-dark.png', import.meta.url).href
  }
} as const;

const COMMUNITY_LINKS = {
  discord: 'https://discord.gg/AGSKPT4HbS',
  patreon: 'https://patreon.com/Primaterie?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink'
} as const;

export type primaterieModeId = 'adventure' | '3v3' | '10v10' | 'portfolio';

export class primateriePortal {
  readonly element: HTMLDivElement;
  private readonly logo: HTMLImageElement;
  private readonly anchor: HTMLDivElement;
  private readonly actions: HTMLDivElement;
  private readonly loadingLabel: HTMLDivElement;
  private readonly themeButton: HTMLImageElement;
  private readonly languageButton: HTMLImageElement;
  private readonly portfolioButton: HTMLButtonElement;
  private readonly singlePlayerButton: HTMLButtonElement;
  private readonly threeVsThreeButton: HTMLButtonElement;
  private readonly tenVsTenButton: HTMLButtonElement;
  private readonly discordButton: HTMLButtonElement;
  private readonly discordButtonImage: HTMLImageElement;
  private readonly patreonButton: HTMLButtonElement;
  private readonly patreonButtonImage: HTMLImageElement;
  private visible = false;
  private busy = false;
  private loading = false;
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
        <img class="primaterie-portal__chrome-button primaterie-portal__chrome-button--theme" data-guide-hover="primaterie-theme" data-primaterie-theme alt="" role="button" tabindex="0" />
        <img class="primaterie-portal__chrome-button primaterie-portal__chrome-button--language" data-guide-hover="primaterie-language" data-primaterie-language alt="" role="button" tabindex="0" />
      </div>
      <div class="primaterie-portal__logo-wrap">
        <img class="primaterie-portal__logo" data-primaterie-logo alt="primaterie" />
      </div>
      <button type="button" class="primaterie-portal__social primaterie-portal__social--discord" data-guide-hover="primaterie-discord" data-primaterie-discord>
        <img data-primaterie-discord-image alt="" />
      </button>
      <button type="button" class="primaterie-portal__social primaterie-portal__social--patreon" data-guide-hover="primaterie-patreon" data-primaterie-patreon>
        <img data-primaterie-patreon-image alt="" />
      </button>
      <div class="primaterie-portal__anchor">
        <div class="primaterie-portal__actions" data-primaterie-actions>
          <button type="button" data-guide-hover="primaterie-adventure" data-primaterie-single></button>
          <button type="button" data-primaterie-3v3 disabled></button>
          <button type="button" data-primaterie-10v10 disabled></button>
          <button type="button" data-guide-hover="primaterie-portfolio" data-primaterie-portfolio></button>
        </div>
        <div class="primaterie-portal__loading" data-primaterie-loading></div>
      </div>
    `;

    this.logo = this.element.querySelector<HTMLImageElement>('[data-primaterie-logo]')!;
    this.anchor = this.element.querySelector<HTMLDivElement>('.primaterie-portal__anchor')!;
    this.actions = this.element.querySelector<HTMLDivElement>('[data-primaterie-actions]')!;
    this.loadingLabel = this.element.querySelector<HTMLDivElement>('[data-primaterie-loading]')!;
    this.themeButton = this.element.querySelector<HTMLImageElement>('[data-primaterie-theme]')!;
    this.languageButton = this.element.querySelector<HTMLImageElement>('[data-primaterie-language]')!;
    this.portfolioButton = this.element.querySelector<HTMLButtonElement>('[data-primaterie-portfolio]')!;
    this.singlePlayerButton = this.element.querySelector<HTMLButtonElement>('[data-primaterie-single]')!;
    this.threeVsThreeButton = this.element.querySelector<HTMLButtonElement>('[data-primaterie-3v3]')!;
    this.tenVsTenButton = this.element.querySelector<HTMLButtonElement>('[data-primaterie-10v10]')!;
    this.discordButton = this.element.querySelector<HTMLButtonElement>('[data-primaterie-discord]')!;
    this.discordButtonImage = this.element.querySelector<HTMLImageElement>('[data-primaterie-discord-image]')!;
    this.patreonButton = this.element.querySelector<HTMLButtonElement>('[data-primaterie-patreon]')!;
    this.patreonButtonImage = this.element.querySelector<HTMLImageElement>('[data-primaterie-patreon-image]')!;

    this.portfolioButton.addEventListener('click', callbacks.onPortfolio);
    this.singlePlayerButton.addEventListener('click', callbacks.onSinglePlayer);
    this.themeButton.addEventListener('click', callbacks.onThemeToggle);
    this.languageButton.addEventListener('click', callbacks.onLanguageToggle);
    this.discordButton.addEventListener('click', () => this.openExternalLink(COMMUNITY_LINKS.discord));
    this.patreonButton.addEventListener('click', () => this.openExternalLink(COMMUNITY_LINKS.patreon));
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

  get isLoading() {
    return this.loading;
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
      this.setLoading(false);
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
    this.refreshActionState();
  }

  setLoading(loading: boolean) {
    this.loading = loading;
    this.element.classList.toggle('is-loading', loading);
    this.refreshActionState();
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
    this.discordButtonImage.src = COMMUNITY_BUTTON_ASSETS.discord[theme];
    this.patreonButtonImage.src = COMMUNITY_BUTTON_ASSETS.patreon[theme];
    this.singlePlayerButton.textContent = this.locale === 'fr' ? 'Aventure' : 'Adventure';
    this.portfolioButton.textContent = 'Portfolio';
    this.threeVsThreeButton.textContent = '3v3';
    this.tenVsTenButton.textContent = '10v10';
    this.loadingLabel.textContent = this.locale === 'fr' ? 'Chargement' : 'Loading';
    this.themeButton.setAttribute('aria-label', this.locale === 'fr' ? 'Changer le theme' : 'Change theme');
    this.languageButton.setAttribute('aria-label', this.locale === 'fr' ? 'Changer la langue' : 'Change language');
    this.discordButton.setAttribute('aria-label', this.locale === 'fr' ? 'Rejoindre le Discord' : 'Join the Discord');
    this.patreonButton.setAttribute('aria-label', this.locale === 'fr' ? 'Ouvrir Patreon' : 'Open Patreon');
    this.actions.setAttribute('aria-hidden', String(this.loading));
    this.loadingLabel.setAttribute('aria-hidden', String(!this.loading));
    this.setBusy(this.busy);
    this.setLoading(this.loading);
  }

  private refreshActionState() {
    const disabled = this.busy || this.loading;
    this.singlePlayerButton.disabled = disabled;
    this.portfolioButton.disabled = disabled;
    this.threeVsThreeButton.disabled = true;
    this.tenVsTenButton.disabled = true;
    this.actions.setAttribute('aria-hidden', String(this.loading));
    this.loadingLabel.setAttribute('aria-hidden', String(!this.loading));
  }

  private openExternalLink(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
