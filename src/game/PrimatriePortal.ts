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

const HUB_MODES = [
  { id: 'adventure', labelFr: 'Aventure', labelEn: 'Adventure', enabled: true },
  { id: '3v3', labelFr: '3v3', labelEn: '3v3', enabled: false },
  { id: '10v10', labelFr: '10v10', labelEn: '10v10', enabled: false },
  { id: 'portfolio', labelFr: 'Portfolio', labelEn: 'Portfolio', enabled: true }
] as const;

const SWIPE_THRESHOLD_PX = 28;

export type primaterieModeId = (typeof HUB_MODES)[number]['id'];

function wrapModeIndex(index: number) {
  return ((index % HUB_MODES.length) + HUB_MODES.length) % HUB_MODES.length;
}

export class primateriePortal {
  readonly element: HTMLDivElement;
  private readonly logo: HTMLImageElement;
  private readonly shardLayer: HTMLDivElement;
  private readonly themeButton: HTMLImageElement;
  private readonly languageButton: HTMLImageElement;
  private readonly leftButton: HTMLButtonElement;
  private readonly centerButton: HTMLButtonElement;
  private readonly rightButton: HTMLButtonElement;
  private visible = false;
  private busy = false;
  private locale: Language = 'fr';
  private activeModeIndex = 0;
  private swipePointerId: number | null = null;
  private swipeStartX: number | null = null;

  constructor(
    host: HTMLElement,
    private readonly callbacks: {
      onActivate: (modeId: primaterieModeId) => void;
      onNavigate: (direction: -1 | 1) => void;
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
      <div class="primaterie-portal__shards" data-primaterie-shards>
        <button type="button" class="primaterie-portal__mode primaterie-portal__mode--left" data-primaterie-left></button>
        <button type="button" class="primaterie-portal__mode primaterie-portal__mode--center" data-primaterie-center></button>
        <button type="button" class="primaterie-portal__mode primaterie-portal__mode--right" data-primaterie-right></button>
      </div>
    `;

    this.logo = this.element.querySelector<HTMLImageElement>('[data-primaterie-logo]')!;
    this.shardLayer = this.element.querySelector<HTMLDivElement>('[data-primaterie-shards]')!;
    this.themeButton = this.element.querySelector<HTMLImageElement>('[data-primaterie-theme]')!;
    this.languageButton = this.element.querySelector<HTMLImageElement>('[data-primaterie-language]')!;
    this.leftButton = this.element.querySelector<HTMLButtonElement>('[data-primaterie-left]')!;
    this.centerButton = this.element.querySelector<HTMLButtonElement>('[data-primaterie-center]')!;
    this.rightButton = this.element.querySelector<HTMLButtonElement>('[data-primaterie-right]')!;

    this.leftButton.addEventListener('click', () => this.stepSelection(-1));
    this.rightButton.addEventListener('click', () => this.stepSelection(1));
    this.centerButton.addEventListener('click', () => this.activateSelection());
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

    this.shardLayer.addEventListener('pointerdown', (event) => {
      if (!this.visible || this.busy) {
        return;
      }
      this.swipePointerId = event.pointerId;
      this.swipeStartX = event.clientX;
    });
    this.shardLayer.addEventListener('pointerup', (event) => {
      if (this.swipePointerId !== event.pointerId || this.swipeStartX === null) {
        return;
      }
      const deltaX = event.clientX - this.swipeStartX;
      this.clearSwipeTracking();
      if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) {
        return;
      }
      this.stepSelection(deltaX > 0 ? -1 : 1);
    });
    this.shardLayer.addEventListener('pointercancel', () => this.clearSwipeTracking());
    this.shardLayer.addEventListener('pointerleave', () => this.clearSwipeTracking());

    this.element.hidden = true;
    this.renderStatic();
    host.appendChild(this.element);
  }

  get isVisible() {
    return this.visible;
  }

  getSelectedModeId(): primaterieModeId {
    return HUB_MODES[this.activeModeIndex]?.id ?? 'adventure';
  }

  getSelectedModeIndex() {
    return this.activeModeIndex;
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
      this.clearSwipeTracking();
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
    this.renderModeButtons();
  }

  setLocale(locale: Language) {
    this.locale = locale;
    this.renderStatic();
  }

  setAnchor(screenX: number, screenY: number, scale = 1) {
    this.element.style.setProperty('--primaterie-anchor-x', `${screenX.toFixed(2)}px`);
    this.element.style.setProperty('--primaterie-anchor-y', `${screenY.toFixed(2)}px`);
    this.element.style.setProperty('--primaterie-anchor-scale', scale.toFixed(3));
  }

  setShardAnchors(anchors: {
    left: { x: number; y: number; scale?: number };
    center: { x: number; y: number; scale?: number };
    right: { x: number; y: number; scale?: number };
  }) {
    const mappings = [
      ['left', anchors.left, this.leftButton],
      ['center', anchors.center, this.centerButton],
      ['right', anchors.right, this.rightButton]
    ] as const;
    mappings.forEach(([slot, anchor, button]) => {
      button.style.setProperty(`--primaterie-${slot}-x`, `${anchor.x.toFixed(2)}px`);
      button.style.setProperty(`--primaterie-${slot}-y`, `${anchor.y.toFixed(2)}px`);
      button.style.setProperty(`--primaterie-${slot}-scale`, `${(anchor.scale ?? 1).toFixed(3)}`);
    });
  }

  stepSelection(direction: -1 | 1) {
    if (this.busy) {
      return;
    }
    this.callbacks.onNavigate(direction);
  }

  commitSelection(direction: -1 | 1) {
    this.activeModeIndex = wrapModeIndex(this.activeModeIndex + direction);
    this.renderModeButtons();
  }

  activateSelection() {
    if (this.busy) {
      return;
    }
    const mode = HUB_MODES[this.activeModeIndex];
    if (!mode?.enabled) {
      return;
    }
    this.callbacks.onActivate(mode.id);
  }

  private clearSwipeTracking() {
    this.swipePointerId = null;
    this.swipeStartX = null;
  }

  private renderStatic() {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    this.logo.src = HUB_LOGO_ASSETS[theme];
    this.themeButton.src = THEME_TOGGLE_ASSETS[theme];
    this.languageButton.src = LANGUAGE_BUTTON_ASSETS[this.locale];
    this.themeButton.setAttribute('aria-label', this.locale === 'fr' ? 'Changer le theme' : 'Change theme');
    this.languageButton.setAttribute('aria-label', this.locale === 'fr' ? 'Changer la langue' : 'Change language');
    this.renderModeButtons();
  }

  private renderModeButtons() {
    const center = HUB_MODES[this.activeModeIndex] ?? HUB_MODES[0];
    const left = HUB_MODES[wrapModeIndex(this.activeModeIndex - 1)] ?? HUB_MODES[0];
    const right = HUB_MODES[wrapModeIndex(this.activeModeIndex + 1)] ?? HUB_MODES[0];
    this.renderModeButton(this.leftButton, left, 'side');
    this.renderModeButton(this.centerButton, center, 'center');
    this.renderModeButton(this.rightButton, right, 'side');
  }

  private renderModeButton(
    button: HTMLButtonElement,
    mode: (typeof HUB_MODES)[number],
    slot: 'side' | 'center'
  ) {
    const label = this.locale === 'fr' ? mode.labelFr : mode.labelEn;
    button.innerHTML = `
      <span class="primaterie-portal__mode-title">${label}</span>
      ${slot === 'center' ? `<span class="primaterie-portal__mode-status">${mode.enabled ? '' : this.locale === 'fr' ? 'Bientot' : 'Soon'}</span>` : ''}
    `;
    button.dataset.modeId = mode.id;
    button.dataset.modeEnabled = mode.enabled ? 'true' : 'false';
    button.classList.toggle('is-disabled-mode', !mode.enabled);
    button.classList.toggle('is-active-mode', slot === 'center');
    button.disabled = this.busy || (slot === 'center' ? !mode.enabled : false);
    button.setAttribute(
      'aria-label',
      slot === 'center'
        ? label
        : this.locale === 'fr'
          ? `Aller vers ${label}`
          : `Move to ${label}`
    );
  }
}
