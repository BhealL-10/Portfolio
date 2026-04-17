import type { Language, PortfolioProject } from '../types/content';
import { LANGUAGE_BUTTON_ASSETS, THEME_TOGGLE_ASSETS } from '../game/GameUiAssetResolver';
import { observeThemeChanges, resolveDocumentTheme } from '../game/ThemeAssetResolver';
import { I18nService } from './I18nService';

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
  private themeButtonIcon: HTMLImageElement;
  private languageButton: HTMLButtonElement;
  private languageButtonIcon: HTMLImageElement;
  private homeButton: HTMLButtonElement;
  private unlockChip: HTMLDivElement;
  private projectRail: HTMLDivElement;
  private dots: HTMLButtonElement[] = [];
  private outroDot: HTMLButtonElement;
  private gameModeActive = false;

  constructor(
    host: HTMLElement,
    private readonly i18n: I18nService,
    private readonly visibleProjects: PortfolioProject[],
    callbacks: NavigationHUDCallbacks
  ) {
    this.element = document.createElement('div');
    this.element.className = 'navigation-hud';

    this.topbar = document.createElement('div');
    this.topbar.className = 'navigation-hud__topbar';

    this.activeChip = document.createElement('div');
    this.activeChip.className = 'navigation-hud__chip';

    this.themeButton = this.createButton(() => callbacks.onThemeToggle(), 'navigation-hud__button--icon');
    this.themeButtonIcon = document.createElement('img');
    this.themeButtonIcon.className = 'navigation-hud__button-icon';
    this.themeButtonIcon.alt = '';
    this.themeButton.appendChild(this.themeButtonIcon);

    this.languageButton = this.createButton(() => callbacks.onLanguageToggle(), 'navigation-hud__button--icon');
    this.languageButtonIcon = document.createElement('img');
    this.languageButtonIcon.className = 'navigation-hud__language-icon';
    this.languageButtonIcon.alt = '';
    this.languageButton.appendChild(this.languageButtonIcon);

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

    this.visibleProjects.forEach((_, index) => {
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
    observeThemeChanges(() => this.renderStatic());
    this.setOutroVisible(false);
    this.renderStatic();
  }

  setActiveProject(index: number, language: Language) {
    const project = this.visibleProjects[index] || null;
    this.activeChip.textContent = project ? project.title[language] : '';
    this.dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
      dot.title = this.visibleProjects[dotIndex]?.title[language] || '';
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

  private createButton(onClick: () => void, extraClassName?: string) {
    const button = document.createElement('button');
    button.className = extraClassName ? `navigation-hud__button ${extraClassName}` : 'navigation-hud__button';
    button.type = 'button';
    button.addEventListener('click', onClick);
    return button;
  }

  private renderStatic() {
    const theme = resolveDocumentTheme();
    const minimalPortfolioChrome = !this.gameModeActive;
    this.themeButton.setAttribute('aria-label', this.i18n.t('theme'));
    this.themeButton.classList.toggle('is-dark-theme', theme === 'dark');
    this.themeButton.classList.toggle('is-light-theme', theme === 'light');
    this.themeButtonIcon.src = THEME_TOGGLE_ASSETS[theme];
    this.languageButton.setAttribute('aria-label', this.i18n.t('language'));
    this.languageButtonIcon.src = LANGUAGE_BUTTON_ASSETS[this.i18n.current];
    this.homeButton.textContent = this.gameModeActive ? this.i18n.t('gamePortfolio') : this.i18n.t('home');
    this.activeChip.hidden = minimalPortfolioChrome;
    this.homeButton.hidden = minimalPortfolioChrome;
    this.unlockChip.hidden = minimalPortfolioChrome;
  }
}
