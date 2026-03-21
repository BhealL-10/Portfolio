import type { Language } from '../types/content';
import type { ContentService } from '../data/ContentService';
import { I18nService } from './I18nService';

const LANGUAGE_BUTTON_ASSETS = {
  fr: new URL('../../assets/images/Langue/FR.svg', import.meta.url).href,
  en: new URL('../../assets/images/Langue/EN.svg', import.meta.url).href
} as const;

interface NavigationHUDCallbacks {
  onThemeToggle: () => void;
  onLanguageToggle: () => void;
  onAboutToggle: () => void;
  onHome: () => void;
  onProjectSelect: (index: number) => void;
}

export class NavigationHUD {
  readonly element: HTMLDivElement;
  readonly topbar: HTMLDivElement;
  private activeChip: HTMLDivElement;
  private themeButton: HTMLButtonElement;
  private languageButton: HTMLButtonElement;
  private homeButton: HTMLButtonElement;
  private unlockChip: HTMLDivElement;
  private projectRail: HTMLDivElement;
  private dots: HTMLButtonElement[] = [];
  private outroDot: HTMLButtonElement;
  private gameModeActive = false;

  constructor(
    host: HTMLElement,
    private readonly i18n: I18nService,
    private readonly content: ContentService,
    callbacks: NavigationHUDCallbacks
  ) {
    this.element = document.createElement('div');
    this.element.className = 'navigation-hud';

    this.topbar = document.createElement('div');
    this.topbar.className = 'navigation-hud__topbar';

    this.activeChip = document.createElement('div');
    this.activeChip.className = 'navigation-hud__chip';

    this.themeButton = this.createButton(() => callbacks.onThemeToggle());
    this.languageButton = this.createButton(() => callbacks.onLanguageToggle());
    this.homeButton = this.createButton(() => callbacks.onHome());
    this.unlockChip = document.createElement('div');
    this.unlockChip.className = 'navigation-hud__chip navigation-hud__chip--status';

    this.topbar.append(
      this.activeChip,
      this.homeButton,
      this.themeButton,
      this.languageButton,
      this.unlockChip
    );

    this.projectRail = document.createElement('div');
    this.projectRail.className = 'navigation-hud__rail';

    this.content.getProjects().forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'navigation-hud__dot';
      dot.type = 'button';
      dot.addEventListener('click', () => callbacks.onProjectSelect(index));
      this.projectRail.appendChild(dot);
      this.dots.push(dot);
    });
    this.outroDot = document.createElement('button');
    this.outroDot.className = 'navigation-hud__dot navigation-hud__dot--outro';
    this.outroDot.type = 'button';
    this.outroDot.setAttribute('aria-label', 'About / Outro');
    this.outroDot.addEventListener('click', () => callbacks.onAboutToggle());
    this.projectRail.appendChild(this.outroDot);

    this.element.append(this.topbar, this.projectRail);
    host.appendChild(this.element);

    this.i18n.onChange(() => this.renderStatic());
    this.setOutroVisible(false);
    this.renderStatic();
  }

  setActiveProject(index: number, language: Language) {
    const project = this.content.getProjectByOrder(index);
    this.activeChip.textContent = project ? project.title[language] : '';
    this.dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
      dot.title = this.content.getProjectByOrder(dotIndex)?.title[language] || '';
    });
    this.outroDot.classList.remove('is-active');
  }

  setUnlocked(unlocked: boolean) {
    this.unlockChip.textContent = unlocked ? this.i18n.t('unlocked') : this.i18n.t('locked');
    this.unlockChip.classList.toggle('is-unlocked', unlocked);
  }

  setAboutOpen(isOpen: boolean) {
    if (isOpen) {
      this.setOutroVisible(true);
    }
    this.outroDot.classList.toggle('is-active', isOpen);
    if (isOpen) {
      this.dots.forEach((dot) => dot.classList.remove('is-active'));
    }
  }

  setGameModeNavigation(active: boolean) {
    this.gameModeActive = active;
    this.activeChip.hidden = active;
    this.unlockChip.hidden = active;
    this.projectRail.hidden = active;
    this.renderStatic();
  }

  setOutroVisible(visible: boolean) {
    this.outroDot.classList.toggle('is-visible', visible);
    this.outroDot.tabIndex = visible ? 0 : -1;
  }

  private createButton(onClick: () => void) {
    const button = document.createElement('button');
    button.className = 'navigation-hud__button';
    button.type = 'button';
    button.addEventListener('click', onClick);
    return button;
  }

  private renderStatic() {
    const themeIsDark = document.documentElement.dataset.theme === 'dark';
    const minimalPortfolioChrome = !this.gameModeActive;
    this.themeButton.setAttribute('aria-label', this.i18n.t('theme'));
    this.themeButton.innerHTML = `<span class="navigation-hud__button-icon" aria-hidden="true">${themeIsDark ? '🌙' : '☀️'}</span>`;
    this.languageButton.setAttribute('aria-label', this.i18n.t('language'));
    this.languageButton.innerHTML = `<img class="navigation-hud__language-icon" src="${LANGUAGE_BUTTON_ASSETS[this.i18n.current]}" alt="" />`;
    this.homeButton.textContent = this.gameModeActive ? this.i18n.t('gamePortfolio') : this.i18n.t('home');
    this.activeChip.hidden = minimalPortfolioChrome;
    this.homeButton.hidden = minimalPortfolioChrome;
    this.unlockChip.hidden = minimalPortfolioChrome;
  }
}
