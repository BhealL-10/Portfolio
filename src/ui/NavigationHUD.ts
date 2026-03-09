import type { Language } from '../types/content';
import type { ContentService } from '../data/ContentService';
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
  private languageButton: HTMLButtonElement;
  private aboutButton: HTMLButtonElement;
  private homeButton: HTMLButtonElement;
  private unlockChip: HTMLDivElement;
  private dots: HTMLButtonElement[] = [];

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
    this.aboutButton = this.createButton(() => callbacks.onAboutToggle());
    this.homeButton = this.createButton(() => callbacks.onHome());
    this.unlockChip = document.createElement('div');
    this.unlockChip.className = 'navigation-hud__chip navigation-hud__chip--status';

    this.topbar.append(
      this.activeChip,
      this.homeButton,
      this.themeButton,
      this.languageButton,
      this.aboutButton,
      this.unlockChip
    );

    const projectRail = document.createElement('div');
    projectRail.className = 'navigation-hud__rail';

    this.content.getProjects().forEach((project, index) => {
      const dot = document.createElement('button');
      dot.className = 'navigation-hud__dot';
      dot.type = 'button';
      dot.addEventListener('click', () => callbacks.onProjectSelect(index));
      projectRail.appendChild(dot);
      this.dots.push(dot);
    });

    this.element.append(this.topbar, projectRail);
    host.appendChild(this.element);

    this.i18n.onChange(() => this.renderStatic());
    this.renderStatic();
  }

  setActiveProject(index: number, language: Language) {
    const project = this.content.getProjectByOrder(index);
    this.activeChip.textContent = project ? project.title[language] : '';
    this.dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
      dot.title = this.content.getProjectByOrder(dotIndex)?.title[language] || '';
    });
  }

  setUnlocked(unlocked: boolean) {
    this.unlockChip.textContent = unlocked ? this.i18n.t('unlocked') : this.i18n.t('locked');
    this.unlockChip.classList.toggle('is-unlocked', unlocked);
  }

  setAboutOpen(isOpen: boolean) {
    this.aboutButton.classList.toggle('is-active', isOpen);
  }

  private createButton(onClick: () => void) {
    const button = document.createElement('button');
    button.className = 'navigation-hud__button';
    button.type = 'button';
    button.addEventListener('click', onClick);
    return button;
  }

  private renderStatic() {
    this.themeButton.textContent = this.i18n.t('theme');
    this.languageButton.textContent = this.i18n.t('language');
    this.aboutButton.textContent = this.i18n.t('about');
    this.homeButton.textContent = this.i18n.t('home');
  }
}
