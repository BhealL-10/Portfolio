import type { RogueliteItemKind, RogueliteItemOffer, RogueliteRarity } from './roguelite';
import { getItemById, rarityLabels, rogueliteItems } from './roguelite';
import { I18nService } from '../ui/I18nService';
import type { AcquisitionFeedback, GameOverCause, LandingGrade } from './gameSessionTypes';
import { LandingGradeDisplay } from './LandingGradeDisplay';
import { GRADE_SPRITE_ASSET_URLS } from './GradeSpriteResolver';
import { MobileControlsHud } from './MobileControlsHud';
import { MOBILE_CHARGE_ASSETS, MOBILE_CONTROL_ASSETS } from './MobileControlLayoutResolver';
import { RestartButton, RESTART_BUTTON_ASSETS } from './RestartButton';
import { SETTINGS_BUTTON_ASSETS } from './SettingsButton';
import { TopRightUiCluster } from './TopRightUiCluster';

const MOMENTUM_BAR_ASSETS = {
  bg: new URL('../../assets/images/spritesheet/hud-momentum-bar-background.png', import.meta.url).href,
  fill: new URL('../../assets/images/spritesheet/hud-momentum-bar-fill-spritesheet.png', import.meta.url).href,
  top: new URL('../../assets/images/spritesheet/hud-momentum-bar-overlay.png', import.meta.url).href
};
const COIN_ICON_URL = new URL('../../assets/images/spritesheet/pickup-coin-spritesheet.png', import.meta.url).href;
const EQUIPMENT_UI_ASSETS = {
  bgBoat: new URL('../../assets/images/itemhud/ui-equipment-dock.svg', import.meta.url).href,
  charges: {
    plane: new URL('../../assets/images/itemhud/hud-charge-plane.svg', import.meta.url).href,
    wings: new URL('../../assets/images/itemhud/hud-charge-wings.svg', import.meta.url).href,
    propulseur: new URL('../../assets/images/itemhud/hud-charge-thruster.svg', import.meta.url).href,
    reacteur_front: new URL('../../assets/images/itemhud/hud-charge-front-reactor.svg', import.meta.url).href,
    reacteur_back: new URL('../../assets/images/itemhud/hud-charge-rear-reactor.svg', import.meta.url).href,
    shield: new URL('../../assets/images/itemhud/hud-charge-shield.svg', import.meta.url).href,
    souffleur_primary: new URL('../../assets/images/itemhud/hud-charge-blower-primary.svg', import.meta.url).href,
    souffleur_recharge: new URL('../../assets/images/itemhud/hud-charge-blower-recharge.svg', import.meta.url).href,
    wrapper: new URL('../../assets/images/itemhud/hud-charge-wrapper.svg', import.meta.url).href,
    magnet: new URL('../../assets/images/itemhud/hud-charge-magnet.svg', import.meta.url).href,
    big_canon: new URL('../../assets/images/itemhud/hud-charge-big-cannon.svg', import.meta.url).href,
    front_canon: new URL('../../assets/images/itemhud/hud-charge-front-cannon.svg', import.meta.url).href,
    grappin: new URL('../../assets/images/itemhud/hud-charge-grappling-hook.svg', import.meta.url).href
  }
} as const;
const RARITY_COLORS: Record<RogueliteRarity, string> = {
  common: '#F2DDB8',
  uncommon: '#75AF80',
  rare: '#49BCFF',
  epic: '#8C53B4',
  legendary: '#727c91'
};
const CHARGE_LEVEL_COLORS = ['rgb(18 20 24 / 0.26)', '#F2DDB8', '#75AF80', '#49BCFF', '#8C53B4', '#727c91'] as const;
const EQUIPMENT_SLOT_ORDER = ['propulseur', 'reacteur_back', 'reacteur_front', 'plane', 'shield', 'wrapper', 'magnet', 'big_canon', 'front_canon', 'grappin', 'souffleur', 'wings'] as const;
const EQUIPMENT_PANEL_VIEWBOX = { width: 613, height: 403 } as const;
const CHARGE_COLOR_SLOTS = new Set(['propulseur', 'reacteur_front', 'reacteur_back', 'wings']);
const ALWAYS_FULL_SLOTS = new Set(['plane', 'magnet']);
const COOLDOWN_RING_SLOTS = new Set(['shield', 'wrapper', 'big_canon', 'front_canon', 'grappin']);

type GameHUDState = 'transition' | 'running' | 'upgrade_choice' | 'game_over';

interface GameHUDCallbacks {
  onRestart: () => void;
  onExit: () => void;
  onSelectUpgrade: (index: number) => void;
  onCloseShop: () => void;
}

interface GameHUDPayload {
  score: number;
  highscore: number;
  distanceMeters: number;
  bestDistanceMeters: number;
  coins: number;
  splitTimes: Partial<Record<10 | 100 | 1000, number>>;
  chargeRatio: number;
  momentumGauge: number;
  momentumTier: number;
  orbitGraceActive: boolean;
  orbitGraceProgress: number;
  state: GameHUDState;
  offers: RogueliteItemOffer[];
  branchHints: Array<{
    slot: 0 | 1 | 2;
    offer: RogueliteItemOffer;
    screenX: number;
    screenY: number;
    mode?: 'reward_branch' | 'shop_orbit';
    price?: number;
  }>;
  inventoryItems: Array<{
    id: string;
    name: string;
    description: string;
    count: number;
    iconSrc: string;
    rarity: RogueliteRarity;
    rarityIconSrc: string;
    kind: RogueliteItemKind;
    cooldownRatio?: number;
    blocked?: boolean;
    chargeCurrent?: number;
    chargeMax?: number;
    resourceRatio?: number;
    slot?: string | null;
  }>;
  landingFeedback: {
    grade: LandingGrade;
    twist: boolean;
    progress: number;
    screenX: number;
    screenY: number;
  } | null;
  acquisition: AcquisitionFeedback | null;
  gameOverCause: GameOverCause;
  runSummary: {
    score: number;
    bestScore: number;
    shardsLanded: number;
    distanceMeters: number;
    coinsCollected: number;
    enemiesKilled: number;
    longestMomentumSeconds: number;
    personalBests: {
      score: boolean;
      shardsLanded: boolean;
      distanceMeters: boolean;
      coinsCollected: boolean;
      enemiesKilled: boolean;
      longestMomentumSeconds: boolean;
    };
    equipment: Array<{
      id: string;
      iconSrc: string;
      rarityIconSrc: string;
      rarity: RogueliteRarity;
      kind: RogueliteItemKind;
    }>;
  };
}

interface LeaderboardEntry {
  name: string;
  score: number;
  recordedAt: number;
}

interface EquipmentSvgBounds {
  x: number;
  y: number;
  width: number;
  height: number;
  viewBoxWidth: number;
  viewBoxHeight: number;
}

interface EquipmentShapeTemplate {
  bounds: EquipmentSvgBounds;
  shapeLeft: number;
  shapeRight: number;
  shapeWidth: number;
  shapeTop: number;
  shapeBottom: number;
  shapeHeight: number;
  ringLeft: number;
  ringTop: number;
  ringWidth: number;
  ringHeight: number;
  cooldownMarkup: string | null;
}

const LEADERBOARD_KEY = 'portfolio-game-global-highscores-v1';
const PLAYER_NAME_KEY = 'portfolio-game-player-name';

export class GameHUDSystem {
  readonly element: HTMLDivElement;
  private panel: HTMLDivElement;
  private scoreLabel: HTMLSpanElement;
  private highscoreLabel: HTMLSpanElement;
  private bestDistanceLabel: HTMLSpanElement;
  private chargeLabel: HTMLSpanElement;
  private chainLabel: HTMLSpanElement;
  private distanceLabel: HTMLSpanElement;
  private scoreValue: HTMLSpanElement;
  private highscoreValue: HTMLSpanElement;
  private bestDistanceValue: HTMLSpanElement;
  private chainValue: HTMLSpanElement;
  private distanceValue: HTMLSpanElement;
  private walletIcon: HTMLSpanElement;
  private coinsValue: HTMLSpanElement;
  private momentumBarLabel: HTMLSpanElement;
  private momentumBarValue: HTMLSpanElement;
  private momentumDock: HTMLDivElement;
  private momentumShell: HTMLDivElement;
  private equipmentDock: HTMLDivElement;
  private chargeFill: HTMLDivElement;
  private orbitGraceIndicator: HTMLDivElement;
  private statusValue: HTMLParagraphElement;
  private metaValue: HTMLParagraphElement;
  private exitButton: HTMLButtonElement;
  private settingsThemeButton: HTMLButtonElement;
  private settingsLanguageButton: HTMLButtonElement;
  private branchLayer: HTMLDivElement;
  private stashBar: HTMLDivElement;
  private inventoryBar: HTMLDivElement;
  private branchTitle: HTMLHeadingElement;
  private branchHint: HTMLParagraphElement;
  private branchCards: HTMLDivElement[];
  private shopBar: HTMLDivElement;
  private shopButtons: HTMLButtonElement[];
  private shopCloseButton: HTMLButtonElement;
  private landingFeedbackDisplay: LandingGradeDisplay;
  private toast: HTMLDivElement;
  private toastLabel: HTMLSpanElement;
  private toastName: HTMLElement;
  private gameOverOverlay: HTMLDivElement;
  private gameOverTitle: HTMLHeadingElement;
  private gameOverBody: HTMLParagraphElement;
  private gameOverStats: HTMLDivElement;
  private gameOverEquipment: HTMLDivElement;
  private leaderboardPanel: HTMLDivElement;
  private leaderboardList: HTMLDivElement;
  private leaderboardNameInput: HTMLInputElement;
  private leaderboardSaveButton: HTMLButtonElement;
  private restartButton: HTMLButtonElement;
  private restartVisualButton: RestartButton;
  private returnButton: HTMLButtonElement;
  private highscoresButton: HTMLButtonElement;
  private topRightCluster: TopRightUiCluster;
  private mobileControls: MobileControlsHud;
  private currentGameOverSignature = '';
  private lastSavedGameOverSignature = '';
  private leaderboardVisible = false;
  private currentRunSummary: GameHUDPayload['runSummary'] | null = null;
  private readonly shapeTemplateCache = new Map<string, EquipmentShapeTemplate | null>();
  private readonly shapeTemplatePending = new Set<string>();

  constructor(host: HTMLElement, private readonly i18n: I18nService, callbacks: GameHUDCallbacks) {
    this.preloadUiAssets();
    this.element = document.createElement('div');
    this.element.className = 'game-hud';
    this.element.innerHTML = `
      <div class="game-hud__top-right-anchor"></div>
      <div class="game-hud__panel">
        <div class="game-hud__stats">
          <div><span data-score-label></span><strong data-score>0</strong></div>
          <div><span data-highscore-label></span><strong data-highscore>0</strong></div>
          <div><span data-best-distance-label></span><strong data-best-distance>0m</strong></div>
          <div><span data-distance-label></span><strong data-distance>0m</strong></div>
          <div><span data-chain-label></span><strong data-chain>0%</strong></div>
        </div>
        <div class="game-hud__charge">
          <div class="game-hud__charge-meta">
            <span data-charge-label></span>
            <strong data-charge-value>0%</strong>
          </div>
          <div class="game-hud__charge-bar"><div class="game-hud__charge-fill" data-charge-fill></div></div>
        </div>
        <div class="game-hud__orbit-grace" data-orbit-grace></div>
        <p class="game-hud__status"></p>
        <p class="game-hud__meta"></p>
        <div class="game-hud__actions">
          <button type="button" data-exit></button>
        </div>
        <div class="game-hud__settings-grid">
          <button type="button" data-settings-theme></button>
          <button type="button" data-settings-language></button>
        </div>
      </div>
      <div class="game-hud__momentum-dock">
        <div class="game-hud__equipment-dock"></div>
        <div class="game-hud__momentum-meter">
          <div class="game-hud__momentum-meta">
            <span data-momentum-bar-label></span>
            <strong data-momentum-bar-value></strong>
          </div>
          <div class="game-hud__momentum-shell">
            <div class="game-hud__momentum-mask" data-momentum-mask>
              <img src="${MOMENTUM_BAR_ASSETS.fill}" alt="" class="game-hud__momentum-fill" data-momentum-fill />
            </div>
            <img src="${MOMENTUM_BAR_ASSETS.bg}" alt="" class="game-hud__momentum-bg" />
            <img src="${MOMENTUM_BAR_ASSETS.top}" alt="" class="game-hud__momentum-top" />
          </div>
        </div>
      </div>
      <div class="game-hud__play-zone game-hud__play-zone--top"></div>
      <div class="game-hud__play-zone game-hud__play-zone--bottom"></div>
      <div class="game-hud__stash">
        <div class="game-hud__wallet">
          <span class="game-hud__wallet-icon" data-wallet-icon aria-hidden="true" style="--wallet-coin-url:url('${COIN_ICON_URL}')"></span>
          <strong data-coins>× 0</strong>
        </div>
        <div class="game-hud__inventory"></div>
      </div>
      <div class="game-hud__branch-layer">
        <div class="game-hud__branch-header">
          <h3 data-upgrade-title></h3>
          <p data-upgrade-hint></p>
        </div>
        <div class="game-hud__branch-card" data-branch-card="0"></div>
        <div class="game-hud__branch-card" data-branch-card="1"></div>
        <div class="game-hud__branch-card" data-branch-card="2"></div>
      </div>
      <div class="game-hud__shop-bar">
        <button type="button" data-shop-offer="0"></button>
        <button type="button" data-shop-offer="1"></button>
        <button type="button" data-shop-offer="2"></button>
        <button type="button" data-shop-close></button>
      </div>
      <div class="game-hud__toast">
        <span data-toast-label></span>
        <strong data-toast-name></strong>
      </div>
      <div class="game-hud__mobile-controls-anchor"></div>
      <div class="game-hud__game-over">
        <div class="game-hud__game-over-panel">
          <h2 data-game-over-title></h2>
          <p data-game-over-body></p>
          <div class="game-hud__game-over-stats" data-game-over-stats></div>
          <div class="game-hud__game-over-gear" data-game-over-gear></div>
          <div class="game-hud__leaderboard" data-leaderboard-panel hidden>
            <div class="game-hud__leaderboard-controls">
              <input type="text" maxlength="18" data-leaderboard-name />
              <button type="button" data-leaderboard-save></button>
            </div>
            <div class="game-hud__leaderboard-list" data-leaderboard-list></div>
          </div>
          <div class="game-hud__game-over-actions">
            <button type="button" data-restart></button>
            <button type="button" data-return></button>
            <button type="button" data-highscores></button>
          </div>
        </div>
      </div>
    `;

    this.panel = this.element.querySelector<HTMLDivElement>('.game-hud__panel')!;
    this.scoreLabel = this.element.querySelector<HTMLSpanElement>('[data-score-label]')!;
    this.highscoreLabel = this.element.querySelector<HTMLSpanElement>('[data-highscore-label]')!;
    this.bestDistanceLabel = this.element.querySelector<HTMLSpanElement>('[data-best-distance-label]')!;
    this.chargeLabel = this.element.querySelector<HTMLSpanElement>('[data-charge-label]')!;
    this.chainLabel = this.element.querySelector<HTMLSpanElement>('[data-chain-label]')!;
    this.distanceLabel = this.element.querySelector<HTMLSpanElement>('[data-distance-label]')!;
    this.scoreValue = this.element.querySelector<HTMLSpanElement>('[data-score]')!;
    this.highscoreValue = this.element.querySelector<HTMLSpanElement>('[data-highscore]')!;
    this.bestDistanceValue = this.element.querySelector<HTMLSpanElement>('[data-best-distance]')!;
    this.chainValue = this.element.querySelector<HTMLSpanElement>('[data-chain]')!;
    this.distanceValue = this.element.querySelector<HTMLSpanElement>('[data-distance]')!;
    this.walletIcon = this.element.querySelector<HTMLSpanElement>('[data-wallet-icon]')!;
    this.coinsValue = this.element.querySelector<HTMLSpanElement>('[data-coins]')!;
    this.momentumBarLabel = this.element.querySelector<HTMLSpanElement>('[data-momentum-bar-label]')!;
    this.momentumBarValue = this.element.querySelector<HTMLSpanElement>('[data-momentum-bar-value]')!;
    this.momentumDock = this.element.querySelector<HTMLDivElement>('.game-hud__momentum-dock')!;
    this.momentumShell = this.element.querySelector<HTMLDivElement>('.game-hud__momentum-shell')!;
    this.equipmentDock = this.element.querySelector<HTMLDivElement>('.game-hud__equipment-dock')!;
    this.chargeFill = this.element.querySelector<HTMLDivElement>('[data-charge-fill]')!;
    this.orbitGraceIndicator = this.element.querySelector<HTMLDivElement>('[data-orbit-grace]')!;
    this.statusValue = this.element.querySelector<HTMLParagraphElement>('.game-hud__status')!;
    this.metaValue = this.element.querySelector<HTMLParagraphElement>('.game-hud__meta')!;
    this.exitButton = this.element.querySelector<HTMLButtonElement>('[data-exit]')!;
    this.settingsThemeButton = this.element.querySelector<HTMLButtonElement>('[data-settings-theme]')!;
    this.settingsLanguageButton = this.element.querySelector<HTMLButtonElement>('[data-settings-language]')!;
    this.branchLayer = this.element.querySelector<HTMLDivElement>('.game-hud__branch-layer')!;
    this.stashBar = this.element.querySelector<HTMLDivElement>('.game-hud__stash')!;
    this.inventoryBar = this.element.querySelector<HTMLDivElement>('.game-hud__inventory')!;
    this.branchTitle = this.element.querySelector<HTMLHeadingElement>('[data-upgrade-title]')!;
    this.branchHint = this.element.querySelector<HTMLParagraphElement>('[data-upgrade-hint]')!;
    this.branchCards = Array.from(this.element.querySelectorAll<HTMLDivElement>('[data-branch-card]'));
    this.shopBar = this.element.querySelector<HTMLDivElement>('.game-hud__shop-bar')!;
    this.shopButtons = Array.from(this.element.querySelectorAll<HTMLButtonElement>('[data-shop-offer]'));
    this.shopCloseButton = this.element.querySelector<HTMLButtonElement>('[data-shop-close]')!;
    this.toast = this.element.querySelector<HTMLDivElement>('.game-hud__toast')!;
    this.toastLabel = this.element.querySelector<HTMLSpanElement>('[data-toast-label]')!;
    this.toastName = this.element.querySelector<HTMLElement>('[data-toast-name]')!;
    this.gameOverOverlay = this.element.querySelector<HTMLDivElement>('.game-hud__game-over')!;
    this.gameOverTitle = this.element.querySelector<HTMLHeadingElement>('[data-game-over-title]')!;
    this.gameOverBody = this.element.querySelector<HTMLParagraphElement>('[data-game-over-body]')!;
    this.gameOverStats = this.element.querySelector<HTMLDivElement>('[data-game-over-stats]')!;
    this.gameOverEquipment = this.element.querySelector<HTMLDivElement>('[data-game-over-gear]')!;
    this.leaderboardPanel = this.element.querySelector<HTMLDivElement>('[data-leaderboard-panel]')!;
    this.leaderboardList = this.element.querySelector<HTMLDivElement>('[data-leaderboard-list]')!;
    this.leaderboardNameInput = this.element.querySelector<HTMLInputElement>('[data-leaderboard-name]')!;
    this.leaderboardSaveButton = this.element.querySelector<HTMLButtonElement>('[data-leaderboard-save]')!;
    this.restartButton = this.element.querySelector<HTMLButtonElement>('[data-restart]')!;
    this.returnButton = this.element.querySelector<HTMLButtonElement>('[data-return]')!;
    this.highscoresButton = this.element.querySelector<HTMLButtonElement>('[data-highscores]')!;
    this.restartVisualButton = new RestartButton(this.restartButton, this.i18n.t('gameRestart'));
    this.landingFeedbackDisplay = new LandingGradeDisplay();
    this.element.appendChild(this.landingFeedbackDisplay.element);
    this.topRightCluster = new TopRightUiCluster(
      this.element.querySelector<HTMLDivElement>('.game-hud__top-right-anchor')!,
      this.panel,
      this.i18n.current === 'fr' ? 'Paramètres du jeu' : 'Game settings'
    );
    this.topRightCluster.settingsButton.element.addEventListener('click', () => {
      this.topRightCluster.toggle();
    });
    this.mobileControls = new MobileControlsHud(
      this.element.querySelector<HTMLDivElement>('.game-hud__mobile-controls-anchor')!,
      {
        jump: this.i18n.current === 'fr' ? 'Saut' : 'Jump',
        boost: this.i18n.current === 'fr' ? 'Boost' : 'Boost',
        grapple: this.i18n.current === 'fr' ? 'Grappin' : 'Grapple',
        charge: this.i18n.current === 'fr' ? 'Charge' : 'Charge'
      },
      {
        onChargeChange: (active) => this.dispatchGameKey(active ? 'keydown' : 'keyup', 'ArrowDown'),
        onJump: () => this.dispatchTapKey('ArrowUp'),
        onBoost: () => this.dispatchTapKey('ArrowUp'),
        onGrapple: () => this.dispatchTapKey('ArrowUp')
      }
    );

    this.exitButton.addEventListener('click', callbacks.onExit);
    this.restartButton.addEventListener('click', callbacks.onRestart);
    this.returnButton.addEventListener('click', callbacks.onExit);
    this.highscoresButton.addEventListener('click', () => {
      this.leaderboardVisible = !this.leaderboardVisible;
      this.renderLeaderboard();
    });
    this.leaderboardSaveButton.addEventListener('click', () => this.saveLeaderboardEntry());
    this.leaderboardNameInput.value = window.localStorage.getItem(PLAYER_NAME_KEY) ?? '';
    this.leaderboardNameInput.addEventListener('input', () => this.renderLeaderboard());
    this.leaderboardNameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.saveLeaderboardEntry();
      }
    });
    this.shopButtons.forEach((button, index) => {
      button.addEventListener('click', () => callbacks.onSelectUpgrade(index));
    });
    this.shopCloseButton.addEventListener('click', callbacks.onCloseShop);
    this.settingsThemeButton.addEventListener('click', () => this.triggerNavigationAction(1));
    this.settingsLanguageButton.addEventListener('click', () => this.triggerNavigationAction(2));
    host.appendChild(this.element);

    this.i18n.onChange(() => this.renderStatic());
    this.renderStatic();
  }

  setVisible(visible: boolean) {
    this.element.classList.toggle('is-visible', visible);
    document.body.classList.toggle('game-runtime-ui-active', visible);
    if (!visible) {
      this.topRightCluster.toggle(false);
    }
  }

  update(payload: GameHUDPayload) {
    this.scoreValue.textContent = String(payload.score);
    this.highscoreValue.textContent = String(payload.highscore);
    this.bestDistanceValue.textContent = `${Math.round(payload.bestDistanceMeters)}m`;
    this.distanceValue.textContent = `${Math.round(payload.distanceMeters)}m`;
    this.coinsValue.textContent = `× ${payload.coins}`;
    this.chainValue.textContent = `${Math.round(payload.momentumGauge * 100)}%`;
    this.chainValue.style.opacity = `${0.58 + payload.momentumGauge * 0.42}`;
    this.momentumBarValue.textContent = '';
    this.momentumShell.style.setProperty('--momentum-ratio', payload.momentumGauge.toFixed(3));
    const fillIntervalMs = 120;
    const fillPhase = Math.floor(performance.now() / fillIntervalMs) % 4;
    this.momentumShell.style.setProperty('--momentum-frame', String(fillPhase));
    this.chargeFill.style.setProperty('--charge-ratio', payload.chargeRatio.toFixed(3));
    this.orbitGraceIndicator.classList.toggle('is-visible', payload.orbitGraceActive);
    this.orbitGraceIndicator.style.setProperty('--orbit-grace-progress', payload.orbitGraceProgress.toFixed(3));
    const chargeValue = this.element.querySelector<HTMLElement>('[data-charge-value]');
    if (chargeValue) {
      chargeValue.textContent = `${Math.round(payload.chargeRatio * 100)}%`;
    }

    this.statusValue.textContent =
      payload.state === 'transition'
        ? this.i18n.t('gameStatusTransition')
        : payload.state === 'running'
          ? this.i18n.t('gameStatusRunning')
          : payload.state === 'upgrade_choice'
            ? this.i18n.t('gameStatusUpgrade')
            : this.i18n.t('gameStatusGameOver');
    this.metaValue.textContent = this.renderMeta(payload);
    const showingShop = payload.branchHints.some((hint) => hint.mode === 'shop_orbit');
    this.branchTitle.textContent = showingShop ? this.i18n.t('gameShopTitle') : this.i18n.t('gameUpgradeTitle');
    this.branchHint.textContent = showingShop ? this.i18n.t('gameShopHint') : this.i18n.t('gameUpgradeHint');

    this.panel.classList.toggle('is-hidden', payload.state === 'game_over');
    this.branchLayer.classList.toggle('is-visible', payload.state === 'upgrade_choice' && !showingShop);
    this.shopBar.classList.toggle('is-visible', payload.state === 'upgrade_choice' && showingShop);
    this.momentumDock.classList.toggle('is-hidden', payload.state === 'upgrade_choice' && showingShop);
    this.gameOverOverlay.classList.toggle('is-visible', payload.state === 'game_over');
    this.toast.classList.toggle('is-visible', Boolean(payload.acquisition));
    if (payload.acquisition) {
      this.toast.style.setProperty('--toast-progress', payload.acquisition.progress.toFixed(3));
      this.toastName.textContent = payload.acquisition.offer.item.name[this.i18n.current];
    }
    this.renderLandingFeedback(payload.landingFeedback);
    this.mobileControls.update({
      chargeRatio: payload.chargeRatio,
      state: payload.state,
      inventoryItems: payload.inventoryItems.map((item) => ({ kind: item.kind, slot: item.slot }))
    });
    if (payload.state === 'game_over') {
      this.topRightCluster.toggle(false);
      this.gameOverBody.textContent = this.getGameOverBody(payload.gameOverCause);
      this.renderGameOverSummary(payload);
    } else {
      this.currentRunSummary = null;
      this.currentGameOverSignature = '';
      this.lastSavedGameOverSignature = '';
      this.leaderboardVisible = false;
      this.leaderboardPanel.hidden = true;
    }
    this.renderInventory(payload.inventoryItems);
    this.renderEquipmentDock(payload.inventoryItems);
    this.renderBranchHints(payload.branchHints);
    this.renderShopBar(payload.branchHints, payload.coins);
  }

  private renderStatic() {
    this.scoreLabel.textContent = this.i18n.t('gameScore');
    this.highscoreLabel.textContent = this.i18n.t('gameBest');
    this.chargeLabel.textContent = this.i18n.t('gameCharge');
    this.chainLabel.textContent = this.i18n.t('gameMomentum');
    this.momentumBarLabel.textContent = '';
    this.distanceLabel.textContent = this.i18n.t('gameDistance');
    this.exitButton.textContent = this.i18n.t('gamePortfolio');
    this.branchTitle.textContent = this.i18n.t('gameUpgradeTitle');
    this.branchHint.textContent = this.i18n.t('gameUpgradeHint');
    this.shopCloseButton.textContent = this.i18n.t('gameShopClose');
    this.settingsThemeButton.textContent = this.i18n.t('theme');
    this.settingsLanguageButton.textContent = this.i18n.t('language');
    this.topRightCluster.settingsButton.element.setAttribute(
      'aria-label',
      this.i18n.current === 'fr' ? 'Paramètres du jeu' : 'Game settings'
    );
    this.toastLabel.textContent = this.i18n.t('gameAcquired');
    this.gameOverTitle.textContent = this.i18n.t('gameOverTitle');
    this.gameOverBody.textContent = this.i18n.t('gameOverBody');
    this.restartVisualButton.setLabel(this.i18n.t('gameRestart'));
    this.returnButton.textContent = this.i18n.t('gamePortfolio');
    this.highscoresButton.textContent = this.i18n.t('gameHighscores');
    this.leaderboardNameInput.placeholder = this.i18n.t('gamePlayerName');
    this.leaderboardSaveButton.textContent = this.i18n.t('gameSaveScore');
    this.bestDistanceLabel.textContent = this.i18n.t('gameBestDistance');
    this.walletIcon.title = this.i18n.t('gameCoins');
    this.renderLeaderboard();
  }

  private renderBranchHints(
    hints: Array<{
      slot: 0 | 1 | 2;
      offer: RogueliteItemOffer;
      screenX: number;
      screenY: number;
      mode?: 'reward_branch' | 'shop_orbit';
      price?: number;
    }>
  ) {
    this.branchCards.forEach((card, index) => {
      const offer = hints[index];
      if (!offer) {
        card.hidden = true;
        return;
      }

      card.hidden = false;
      card.dataset.rarity = offer.offer.item.rarity;
      const label = offer.mode === 'shop_orbit'
        ? this.i18n.t('gameShopOffer')
        : index === 0
          ? this.i18n.t('gamePathUpper')
          : index === 1
            ? this.i18n.t('gamePathForward')
            : this.i18n.t('gamePathLower');
      card.style.transform = `translate(${offer.screenX}px, ${offer.screenY}px)`;
      const showRarity = offer.offer.item.kind === 'module';
      card.innerHTML = `
        <span class="game-hud__upgrade-media">
          <img src="${offer.offer.item.hudIconSrc}" alt="" class="game-hud__upgrade-icon-img" />
          ${showRarity ? `<img src="${offer.offer.item.rarityIconSrc}" alt="" class="game-hud__upgrade-rarity-icon" />` : ''}
        </span>
        ${showRarity ? `<span class="game-hud__upgrade-rarity">${this.getRarityLabel(offer.offer.item.rarity)}</span>` : ''}
        <span class="game-hud__upgrade-path-label">${label}</span>
        <strong class="game-hud__upgrade-path-name">${offer.offer.item.name[this.i18n.current]}</strong>
        <span class="game-hud__upgrade-path-desc">${offer.offer.item.description[this.i18n.current]}</span>
        ${
          offer.price !== undefined
            ? `<span class="game-hud__upgrade-price">${this.i18n.t('gamePrice')}: <span class="game-hud__coin-inline" aria-hidden="true" style="--wallet-coin-url:url('${COIN_ICON_URL}')"></span> × ${offer.price}</span>`
            : ''
        }
      `;
    });
  }

  private renderInventory(items: Array<{
    id: string;
    name: string;
    description: string;
    count: number;
    iconSrc: string;
    rarity: RogueliteRarity;
    rarityIconSrc: string;
    kind: RogueliteItemKind;
    cooldownRatio?: number;
    blocked?: boolean;
    chargeCurrent?: number;
    chargeMax?: number;
    resourceRatio?: number;
    slot?: string | null;
  }>) {
    this.inventoryBar.innerHTML = '';
    this.stashBar.classList.add('is-visible');
    items
      .filter((item) => item.kind === 'passive')
      .forEach((item) => {
      const chip = document.createElement('div');
      chip.className = `game-hud__inventory-item${item.kind === 'passive' ? ' game-hud__inventory-item--passive' : ''}`;
      const itemDefinition = getItemById(item.id);
      const showRarity = item.kind === 'module';
      const hasCharges = (item.chargeMax ?? 0) > 0;
      const hasResource = (item.resourceRatio ?? 0) > 0 || item.slot === 'souffleur';
      const hasCooldown =
        (item.cooldownRatio ?? 0) > 0 ||
        item.slot === 'souffleur' ||
        item.slot === 'shield' ||
        item.slot === 'wrapper' ||
        item.slot === 'big_canon' ||
        item.slot === 'front_canon' ||
        item.slot === 'grappin';
      const cooldownProgress = Math.max(0, Math.min(1, 1 - (item.cooldownRatio ?? 0)));
      const chargeDots = hasCharges
        ? Array.from({ length: item.chargeMax ?? 0 }, (_, index) => {
            const active = index < (item.chargeCurrent ?? 0);
            return `<span class="game-hud__inventory-charge-dot${active ? ' is-active' : ''}" aria-hidden="true"></span>`;
          }).join('')
        : '';
      chip.innerHTML = `
        <div class="game-hud__inventory-media">
          <img src="${item.iconSrc}" alt="" class="game-hud__inventory-icon" />
          ${showRarity ? `<img src="${item.rarityIconSrc}" alt="" class="game-hud__inventory-rarity" />` : ''}
        </div>
        <div class="game-hud__inventory-copy${item.kind === 'passive' ? ' game-hud__inventory-copy--passive' : ''}">
          <strong class="game-hud__inventory-name">${itemDefinition?.name[this.i18n.current] ?? item.name}</strong>
          <span class="game-hud__inventory-desc">${itemDefinition?.description[this.i18n.current] ?? item.description}</span>
          ${hasCooldown || hasCharges ? `<span class="game-hud__inventory-signals">${hasCooldown ? `<span class="game-hud__inventory-cooldown" style="--cooldown-progress:${cooldownProgress.toFixed(3)}"><span></span></span>` : ''}${hasCharges ? `<span class="game-hud__inventory-charge-dots">${chargeDots}</span>` : ''}</span>` : ''}
          ${hasResource ? `<span class="game-hud__inventory-meter game-hud__inventory-meter--resource"><span style="width:${Math.round((item.resourceRatio ?? 0) * 100)}%"></span></span>` : ''}
        </div>
        ${item.count > 1 ? `<span class="game-hud__inventory-count">x${item.count}</span>` : ''}
      `;
      this.inventoryBar.appendChild(chip);
    });
  }

  private renderEquipmentDock(items: Array<{
    id: string;
    name: string;
    description: string;
    count: number;
    iconSrc: string;
    rarity: RogueliteRarity;
    rarityIconSrc: string;
    kind: RogueliteItemKind;
    cooldownRatio?: number;
    blocked?: boolean;
    chargeCurrent?: number;
    chargeMax?: number;
    resourceRatio?: number;
    slot?: string | null;
  }>) {
    const modules = items
      .filter((item) => item.kind === 'module' && item.slot)
      .sort((a, b) => EQUIPMENT_SLOT_ORDER.indexOf(a.slot as typeof EQUIPMENT_SLOT_ORDER[number]) - EQUIPMENT_SLOT_ORDER.indexOf(b.slot as typeof EQUIPMENT_SLOT_ORDER[number]));

    this.equipmentDock.innerHTML = '';
    this.equipmentDock.hidden = false;
    const panel = document.createElement('div');
    panel.className = 'game-hud__equipment-panel';
    panel.innerHTML = `<img src="${EQUIPMENT_UI_ASSETS.bgBoat}" alt="" class="game-hud__equipment-layer game-hud__equipment-layer--bg" />`;

    const bgTemplate = this.shapeTemplateCache.get(EQUIPMENT_UI_ASSETS.bgBoat);
    if (!bgTemplate) {
      this.preloadShapeTemplate(EQUIPMENT_UI_ASSETS.bgBoat);
    } else {
      const dockWidth = this.equipmentDock.getBoundingClientRect().width || 486;
      const panelHeight = dockWidth * (403 / 613);
      const deadSpace = (panelHeight * bgTemplate.shapeBottom) / 100;
      const shift = Math.max(0, deadSpace + 6);
      panel.style.setProperty('--equipment-panel-shift', `${shift.toFixed(2)}px`);
    }

    modules.forEach((item, index) => {
      const primaryChargeSrc =
        item.slot === 'souffleur'
          ? EQUIPMENT_UI_ASSETS.charges.souffleur_primary
          : item.slot && item.slot in EQUIPMENT_UI_ASSETS.charges
            ? EQUIPMENT_UI_ASSETS.charges[item.slot as keyof typeof EQUIPMENT_UI_ASSETS.charges]
            : '';
      const primaryTemplate = primaryChargeSrc ? this.shapeTemplateCache.get(primaryChargeSrc) : null;
      if (primaryChargeSrc && !primaryTemplate) this.preloadShapeTemplate(primaryChargeSrc);
      const cooldownProgress = Math.max(0, Math.min(1, 1 - (item.cooldownRatio ?? 0)));
      const usesChargeColor = CHARGE_COLOR_SLOTS.has(item.slot ?? '');
      const isAlwaysFull = ALWAYS_FULL_SLOTS.has(item.slot ?? '');
      const isResourceItem = item.slot === 'souffleur';
      const usesCooldownRing = COOLDOWN_RING_SLOTS.has(item.slot ?? '') || item.slot === 'souffleur';
      const chargeColor = this.getChargeLevelColor(item.chargeCurrent ?? 0);
      const fillColor = usesChargeColor ? chargeColor : RARITY_COLORS[item.rarity];
      const isCooldownActive =
        item.slot === 'souffleur'
          ? (item.cooldownRatio ?? 0) > 0.001
          : usesCooldownRing && (item.cooldownRatio ?? 0) > 0.001;
      const fillMode = isResourceItem ? 'meter' : 'full';
      const fillRatio = isResourceItem ? Math.max(0, Math.min(1, item.resourceRatio ?? 0)) : 1;
      const fillVisible =
        isAlwaysFull || isResourceItem
          ? true
          : usesChargeColor
            ? (item.chargeCurrent ?? 0) > 0
            : !isCooldownActive && !item.blocked;
      const slotIdBase = `${item.slot}-${index}`;

      if (item.slot === 'propulseur' && primaryChargeSrc) {
        panel.insertAdjacentHTML(
          'afterbegin',
          `<span class="game-hud__equipment-rear" data-slot="propulseur" style="--equipment-mask:url('${primaryChargeSrc}'); --equipment-rarity-color:${fillColor}; --equipment-fill-opacity:${fillVisible ? '0.78' : '0'};"></span>`
        );
      }

      if (primaryChargeSrc) {
        panel.insertAdjacentHTML(
          'beforeend',
          this.renderEquipmentIconLayer(primaryChargeSrc, primaryTemplate, {
            layerId: `${slotIdBase}-primary`,
            slot: item.slot,
            fillMode,
            fillRatio,
            fillColor,
            fillVisible
          })
        );
      }

      if (usesCooldownRing && primaryChargeSrc && primaryTemplate && isCooldownActive) {
        panel.insertAdjacentHTML(
          'beforeend',
          this.renderEquipmentCooldownRing({
            layerId: `${slotIdBase}-cooldown`,
            slot: item.slot,
            cooldownProgress,
            rarityColor: RARITY_COLORS[item.rarity],
            template: primaryTemplate
          })
        );
      }
    });

    this.equipmentDock.appendChild(panel);
  }

  private renderShopBar(
    hints: Array<{
      slot: 0 | 1 | 2;
      offer: RogueliteItemOffer;
      screenX: number;
      screenY: number;
      mode?: 'reward_branch' | 'shop_orbit';
      price?: number;
    }>,
    coins = 0
  ) {
    const shopHints = hints.filter((hint) => hint.mode === 'shop_orbit');
    this.shopButtons.forEach((button, index) => {
      const hint = shopHints[index];
      button.hidden = !hint;
      button.disabled = !hint;
      if (!hint) return;
      const affordable = (hint.price ?? 0) <= coins;
      button.disabled = !affordable;
      const showRarity = hint.offer.item.kind === 'module';
      button.innerHTML = `
        <span class="game-hud__shop-offer-media">
          <img src="${hint.offer.item.hudIconSrc}" alt="" class="game-hud__shop-offer-icon" />
          ${showRarity ? `<img src="${hint.offer.item.rarityIconSrc}" alt="" class="game-hud__shop-offer-rarity" />` : ''}
        </span>
        <strong>${hint.offer.item.name[this.i18n.current]}</strong>
        <span>${hint.offer.item.description[this.i18n.current]}</span>
        <em class="game-hud__shop-price"><span class="game-hud__coin-inline" aria-hidden="true" style="--wallet-coin-url:url('${COIN_ICON_URL}')"></span> × ${hint.price ?? 0}</em>
      `;
      button.classList.toggle('is-disabled', !affordable);
    });
    this.shopCloseButton.textContent = this.i18n.t('gameShopClose');
  }

  private renderMeta(payload: GameHUDPayload) {
    const splits = [10, 100, 1000]
      .map((milestone) => {
        const split = payload.splitTimes[milestone as 10 | 100 | 1000];
        return split === undefined ? null : `${milestone}: ${split.toFixed(1)}s`;
      })
      .filter(Boolean)
      .join(' • ');
    if (!splits) {
      return `${this.i18n.t('gameBestDistance')}: ${Math.round(payload.bestDistanceMeters)}m`;
    }
    return `${this.i18n.t('gameSplits')}: ${splits}`;
  }

  private renderGameOverSummary(payload: GameHUDPayload) {
    const summary = payload.runSummary;
    this.currentRunSummary = summary;
    const newBadge = `<em class="game-hud__game-over-badge">${this.i18n.t('gameNewBadge')}</em>`;
    this.currentGameOverSignature = [
      payload.score,
      Math.round(summary.distanceMeters),
      summary.coinsCollected,
      summary.enemiesKilled,
      Math.round(summary.longestMomentumSeconds * 10)
    ].join(':');
    this.gameOverStats.innerHTML = `
      <div><span>${this.i18n.t('gameScore')}</span><strong>${summary.score}</strong>${summary.personalBests.score ? newBadge : ''}</div>
      <div><span>${this.i18n.t('gameDistance')}</span><strong>${Math.round(summary.distanceMeters)}m</strong>${summary.personalBests.distanceMeters ? newBadge : ''}</div>
      <div><span>${this.i18n.t('gameRunShards')}</span><strong>${summary.shardsLanded}</strong>${summary.personalBests.shardsLanded ? newBadge : ''}</div>
      <div><span>${this.i18n.t('gameCoins')}</span><strong>${summary.coinsCollected}</strong>${summary.personalBests.coinsCollected ? newBadge : ''}</div>
      <div><span>${this.i18n.t('gameRunKills')}</span><strong>${summary.enemiesKilled}</strong>${summary.personalBests.enemiesKilled ? newBadge : ''}</div>
      <div><span>${this.i18n.t('gameRunMomentum')}</span><strong>${summary.longestMomentumSeconds.toFixed(1)}s</strong>${summary.personalBests.longestMomentumSeconds ? newBadge : ''}</div>
    `;
    this.gameOverEquipment.innerHTML = summary.equipment.length
      ? summary.equipment
          .map(
            (item) => `
              <span class="game-hud__game-over-item" title="${getItemById(item.id)?.name[this.i18n.current] ?? item.id}">
                <img src="${item.iconSrc}" alt="" class="game-hud__game-over-item-icon" />
                ${item.kind === 'module' ? `<img src="${item.rarityIconSrc}" alt="" class="game-hud__game-over-item-rarity" />` : ''}
              </span>
            `
          )
          .join('')
      : `<span class="game-hud__game-over-empty">${this.i18n.t('gameRunNoItems')}</span>`;
    this.updateLeaderboardSaveVisibility();
    this.renderLeaderboard();
  }

  private renderLandingFeedback(
    feedback: {
      grade: LandingGrade;
      twist: boolean;
      progress: number;
      screenX: number;
      screenY: number;
    } | null
  ) {
    if (!feedback) {
      this.landingFeedbackDisplay.clear();
      return;
    }

    this.landingFeedbackDisplay.render({
      grade: feedback.grade,
      twist: feedback.twist,
      progress: feedback.progress,
      screenX: feedback.screenX,
      screenY: feedback.screenY,
      gradeLabel: this.getLandingGradeLabel(feedback.grade),
      twistLabel: this.i18n.t('gameLandingTwist')
    });
  }

  private getLandingGradeLabel(grade: LandingGrade) {
    if (grade === 'miss') return this.i18n.t('gameLandingMiss');
    if (grade === 'super') return this.i18n.t('gameLandingSuper');
    if (grade === 'perfect') return this.i18n.t('gameLandingPerfect');
    return this.i18n.t('gameLandingGood');
  }

  private getRarityLabel(rarity: RogueliteRarity) {
    return rarityLabels[rarity][this.i18n.current];
  }

  private triggerNavigationAction(index: number) {
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.navigation-hud__topbar .navigation-hud__button'));
    buttons[index]?.click();
  }

  private dispatchTapKey(key: 'ArrowUp' | 'ArrowDown') {
    this.dispatchGameKey('keydown', key);
    window.setTimeout(() => this.dispatchGameKey('keyup', key), 0);
  }

  private dispatchGameKey(type: 'keydown' | 'keyup', key: 'ArrowUp' | 'ArrowDown') {
    const event = new KeyboardEvent(type, {
      key,
      bubbles: true,
      cancelable: true
    });
    window.dispatchEvent(event);
  }

  private getGameOverBody(cause: GameOverCause) {
    if (cause === 'enemy') return this.i18n.t('gameOverEnemy');
    if (cause === 'out_of_bounds') return this.i18n.t('gameOverBounds');
    return this.i18n.t('gameOverCamera');
  }

  private renderEquipmentIconLayer(
    src: string,
    template: EquipmentShapeTemplate | null | undefined,
    options: {
      layerId: string;
      slot: string | null | undefined;
      fillMode: 'full' | 'meter';
      fillRatio: number;
      fillColor: string;
      fillVisible: boolean;
    }
  ) {
    const fillRatio = Math.max(0, Math.min(1, options.fillRatio));
    const slotAttr = options.slot ?? '';
    const shapeVars = this.getShapeStyleVars(template);
    return `
      <span class="game-hud__equipment-shape game-hud__equipment-shape--dark" data-slot="${slotAttr}" data-layer-id="${options.layerId}" style="--equipment-mask:url('${src}'); ${shapeVars};"></span>
      <span class="game-hud__equipment-shape game-hud__equipment-shape--fill game-hud__equipment-shape--${options.fillMode}" data-slot="${slotAttr}" data-layer-id="${options.layerId}-fill" style="--equipment-mask:url('${src}'); ${shapeVars}; --equipment-fill:${fillRatio.toFixed(3)}; --equipment-fill-opacity:${options.fillVisible ? '1' : '0'}; --equipment-rarity-color:${options.fillColor};"></span>
    `;
  }

  private renderEquipmentCooldownRing(options: {
    layerId: string;
    slot: string | null | undefined;
    cooldownProgress: number;
    rarityColor: string;
    template: EquipmentShapeTemplate;
  }) {
    const slotAttr = options.slot ?? '';
    const progress = Math.max(0, Math.min(1, options.cooldownProgress)).toFixed(3);
    const viewBox = `0 0 ${options.template.bounds.viewBoxWidth} ${options.template.bounds.viewBoxHeight}`;
    const cooldownMarkup = options.template.cooldownMarkup;
    if (!cooldownMarkup) {
      return '';
    }
    return `
      <span class="game-hud__equipment-cooldown" data-slot="${slotAttr}" data-layer-id="${options.layerId}" style="--cooldown-progress:${progress}; --equipment-rarity-color:${options.rarityColor};">
        <svg class="game-hud__equipment-cooldown-svg" viewBox="${viewBox}" aria-hidden="true" focusable="false">
          <g class="game-hud__equipment-cooldown-stroke" style="--cooldown-progress:${progress}; color:${options.rarityColor};">
            ${cooldownMarkup}
          </g>
        </svg>
      </span>
    `;
  }

  private getChargeLevelColor(chargesRemaining: number) {
    const index = Math.max(0, Math.min(CHARGE_LEVEL_COLORS.length - 1, Math.round(chargesRemaining)));
    return CHARGE_LEVEL_COLORS[index];
  }

  private getShapeStyleVars(template: EquipmentShapeTemplate | null | undefined) {
    if (!template) {
      return '--equipment-shape-left:0%; --equipment-shape-width:100%; --equipment-shape-right:0%; --equipment-shape-top:0%; --equipment-shape-height:100%; --equipment-shape-bottom:0%; --equipment-ring-left:0%; --equipment-ring-top:0%; --equipment-ring-width:100%; --equipment-ring-height:100%;';
    }
    return `--equipment-shape-left:${template.shapeLeft.toFixed(3)}%; --equipment-shape-width:${template.shapeWidth.toFixed(3)}%; --equipment-shape-right:${template.shapeRight.toFixed(3)}%; --equipment-shape-top:${template.shapeTop.toFixed(3)}%; --equipment-shape-height:${template.shapeHeight.toFixed(3)}%; --equipment-shape-bottom:${template.shapeBottom.toFixed(3)}%; --equipment-ring-left:${template.ringLeft.toFixed(3)}%; --equipment-ring-top:${template.ringTop.toFixed(3)}%; --equipment-ring-width:${template.ringWidth.toFixed(3)}%; --equipment-ring-height:${template.ringHeight.toFixed(3)}%;`;
  }

  private preloadShapeTemplate(src: string) {
    if (this.shapeTemplateCache.has(src) || this.shapeTemplatePending.has(src)) {
      return;
    }
    this.shapeTemplatePending.add(src);
    void fetch(src)
      .then((response) => response.text())
      .then((svgText) => this.parseShapeTemplate(svgText))
      .then((template) => {
        this.shapeTemplateCache.set(src, template);
      })
      .catch(() => {
        this.shapeTemplateCache.set(src, null);
      })
      .finally(() => {
        this.shapeTemplatePending.delete(src);
      });
  }

  private async parseShapeTemplate(svgText: string): Promise<EquipmentShapeTemplate | null> {
    if (typeof DOMParser === 'undefined' || typeof document === 'undefined') {
      return null;
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const svgNode = doc.querySelector('svg');
    if (!svgNode) {
      return null;
    }
    const viewBox = svgNode.getAttribute('viewBox');
    if (!viewBox) {
      return null;
    }
    const [viewBoxXRaw, viewBoxYRaw, viewBoxWidthRaw, viewBoxHeightRaw] = viewBox.split(/\s+/).map((value) => Number.parseFloat(value));
    const viewBoxX = Number.isFinite(viewBoxXRaw) ? viewBoxXRaw : 0;
    const viewBoxY = Number.isFinite(viewBoxYRaw) ? viewBoxYRaw : 0;
    const viewBoxWidth = Number.isFinite(viewBoxWidthRaw) && viewBoxWidthRaw > 0 ? viewBoxWidthRaw : 1;
    const viewBoxHeight = Number.isFinite(viewBoxHeightRaw) && viewBoxHeightRaw > 0 ? viewBoxHeightRaw : 1;

    const visibleNodes = Array.from(svgNode.children).filter((child) => {
      const tag = child.tagName.toLowerCase();
      if (tag === 'defs' || tag === 'clippath') {
        return false;
      }
      if (tag === 'rect') {
        const fill = child.getAttribute('fill');
        const style = child.getAttribute('style') ?? '';
        const width = Number.parseFloat(child.getAttribute('width') ?? '0');
        const height = Number.parseFloat(child.getAttribute('height') ?? '0');
        if ((fill === 'none' || style.includes('fill:none')) && width >= viewBoxWidth && height >= viewBoxHeight) {
          return false;
        }
      }
      return true;
    });
    const fillMarkup = visibleNodes.map((node) => new XMLSerializer().serializeToString(node)).join('');
    if (!fillMarkup) {
      return null;
    }

    const fillBounds = this.measureSvgMarkup(viewBox, fillMarkup);
    if (!fillBounds || fillBounds.width <= 0.001 || fillBounds.height <= 0.001) {
      return null;
    }
    const cooldownMarkup =
      (await this.buildCooldownContourMarkup(svgText, viewBoxWidth, viewBoxHeight)) ??
      this.measureLegacyCooldownGeometry(svgText)?.cooldownMarkup ??
      null;

    const shapeLeft = ((fillBounds.x - viewBoxX) / viewBoxWidth) * 100;
    const shapeTop = ((fillBounds.y - viewBoxY) / viewBoxHeight) * 100;
    const shapeWidth = (fillBounds.width / viewBoxWidth) * 100;
    const shapeHeight = (fillBounds.height / viewBoxHeight) * 100;
    const shapeRight = 100 - shapeLeft - shapeWidth;
    const shapeBottom = 100 - shapeTop - shapeHeight;
    const centerX = shapeLeft + shapeWidth * 0.5;
    const centerY = shapeTop + shapeHeight * 0.5;
    const heightAsWidthPercent = shapeHeight * (EQUIPMENT_PANEL_VIEWBOX.height / EQUIPMENT_PANEL_VIEWBOX.width);
    const ringWidth = Math.max(shapeWidth, heightAsWidthPercent) * 1.1;
    const ringHeight = ringWidth * (EQUIPMENT_PANEL_VIEWBOX.width / EQUIPMENT_PANEL_VIEWBOX.height);
    const ringLeft = Math.max(0, Math.min(100 - ringWidth, centerX - ringWidth * 0.5));
    const ringTop = Math.max(0, Math.min(100 - ringHeight, centerY - ringHeight * 0.5));

    return {
      bounds: {
        x: fillBounds.x,
        y: fillBounds.y,
        width: fillBounds.width,
        height: fillBounds.height,
        viewBoxWidth,
        viewBoxHeight
      },
      shapeLeft,
      shapeRight,
      shapeWidth,
      shapeTop,
      shapeBottom,
      shapeHeight,
      ringLeft,
      ringTop,
      ringWidth,
      ringHeight,
      cooldownMarkup
    };
  }

  private measureSvgMarkup(viewBox: string, markup: string) {
    const measurementSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    measurementSvg.setAttribute('viewBox', viewBox);
    measurementSvg.setAttribute('width', '0');
    measurementSvg.setAttribute('height', '0');
    measurementSvg.style.position = 'absolute';
    measurementSvg.style.opacity = '0';
    measurementSvg.style.pointerEvents = 'none';
    measurementSvg.style.overflow = 'hidden';
    measurementSvg.insertAdjacentHTML('beforeend', `<g data-measure-root>${markup}</g>`);
    document.body.appendChild(measurementSvg);
    try {
      const group = measurementSvg.querySelector('g[data-measure-root]') as SVGGElement | null;
      if (!group || typeof group.getBBox !== 'function') {
        return null;
      }
      return group.getBBox();
    } finally {
      measurementSvg.remove();
    }
  }

  private async buildCooldownContourMarkup(svgText: string, viewBoxWidth: number, viewBoxHeight: number) {
    const image = await this.loadSvgImage(svgText).catch(() => null);
    if (!image) {
      return null;
    }

    const scale = Math.min(1, 768 / Math.max(1, image.naturalWidth), 768 / Math.max(1, image.naturalHeight));
    const width = Math.max(96, Math.round(image.naturalWidth * scale));
    const height = Math.max(48, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      return null;
    }
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    const contour = this.extractOuterContourLoop(imageData.data, width, height);
    if (!contour || contour.length < 3) {
      return null;
    }

    const normalized = this.normalizeContourLoop(contour, width, height);
    if (normalized.length < 3) {
      return null;
    }

    const scaleX = viewBoxWidth / width;
    const scaleY = viewBoxHeight / height;
    const pathData = normalized
      .map((point, index) => `${index === 0 ? 'M' : 'L'}${(point.x * scaleX).toFixed(2)} ${(point.y * scaleY).toFixed(2)}`)
      .join(' ');
    return `<path d="${pathData} Z" fill="none" stroke="currentColor" pathLength="100" vector-effect="non-scaling-stroke" />`;
  }

  private loadSvgImage(svgText: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(url);
        resolve(image);
      };
      image.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to decode SVG image'));
      };
      image.src = url;
    });
  }

  private extractOuterContourLoop(alphaData: Uint8ClampedArray, width: number, height: number) {
    const mask = new Uint8Array(width * height);
    for (let index = 0; index < width * height; index += 1) {
      mask[index] = alphaData[index * 4 + 3] > 24 ? 1 : 0;
    }

    const visited = new Uint8Array(mask.length);
    let largestComponent: number[] = [];
    const queue = new Int32Array(mask.length);
    const neighbors = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ] as const;

    for (let start = 0; start < mask.length; start += 1) {
      if (!mask[start] || visited[start]) continue;
      let head = 0;
      let tail = 0;
      const component: number[] = [];
      visited[start] = 1;
      queue[tail++] = start;
      while (head < tail) {
        const current = queue[head++]!;
        component.push(current);
        const x = current % width;
        const y = Math.floor(current / width);
        neighbors.forEach(([dx, dy]) => {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) return;
          const next = ny * width + nx;
          if (!mask[next] || visited[next]) return;
          visited[next] = 1;
          queue[tail++] = next;
        });
      }
      if (component.length > largestComponent.length) {
        largestComponent = component;
      }
    }

    if (largestComponent.length === 0) {
      return null;
    }

    const componentMask = new Uint8Array(mask.length);
    largestComponent.forEach((index) => {
      componentMask[index] = 1;
    });

    type Segment = { sx: number; sy: number; ex: number; ey: number };
    const segments: Segment[] = [];
    const addSegment = (sx: number, sy: number, ex: number, ey: number) => {
      segments.push({ sx, sy, ex, ey });
    };

    largestComponent.forEach((pixelIndex) => {
      const x = pixelIndex % width;
      const y = Math.floor(pixelIndex / width);
      const up = y > 0 ? componentMask[(y - 1) * width + x] : 0;
      const right = x < width - 1 ? componentMask[y * width + x + 1] : 0;
      const down = y < height - 1 ? componentMask[(y + 1) * width + x] : 0;
      const left = x > 0 ? componentMask[y * width + x - 1] : 0;
      if (!up) addSegment(x, y, x + 1, y);
      if (!right) addSegment(x + 1, y, x + 1, y + 1);
      if (!down) addSegment(x + 1, y + 1, x, y + 1);
      if (!left) addSegment(x, y + 1, x, y);
    });

    const outgoing = new Map<string, number[]>();
    const pointKey = (x: number, y: number) => `${x},${y}`;
    segments.forEach((segment, index) => {
      const key = pointKey(segment.sx, segment.sy);
      const list = outgoing.get(key) ?? [];
      list.push(index);
      outgoing.set(key, list);
    });

    const used = new Uint8Array(segments.length);
    const loops: Array<Array<{ x: number; y: number }>> = [];
    for (let index = 0; index < segments.length; index += 1) {
      if (used[index]) continue;
      const loop: Array<{ x: number; y: number }> = [];
      let currentIndex = index;
      const startSegment = segments[currentIndex]!;
      const startKey = pointKey(startSegment.sx, startSegment.sy);
      while (!used[currentIndex]) {
        const segment = segments[currentIndex]!;
        used[currentIndex] = 1;
        loop.push({ x: segment.sx, y: segment.sy });
        const nextKey = pointKey(segment.ex, segment.ey);
        if (nextKey === startKey) {
          break;
        }
        const nextCandidates = outgoing.get(nextKey) ?? [];
        const nextIndex = nextCandidates.find((candidate) => !used[candidate]);
        if (nextIndex === undefined) {
          break;
        }
        currentIndex = nextIndex;
      }
      if (loop.length >= 3) {
        loops.push(loop);
      }
    }

    if (loops.length === 0) {
      return null;
    }

    let bestLoop = loops[0]!;
    let bestArea = 0;
    loops.forEach((loop) => {
      const area = Math.abs(this.getLoopArea(loop));
      if (area > bestArea) {
        bestArea = area;
        bestLoop = loop;
      }
    });
    return bestLoop;
  }

  private normalizeContourLoop(points: Array<{ x: number; y: number }>, width: number, height: number) {
    if (points.length < 3) {
      return points;
    }
    const simplified = points.filter((point, index) => {
      const previous = points[(index - 1 + points.length) % points.length]!;
      const next = points[(index + 1) % points.length]!;
      const collinearX = previous.x === point.x && point.x === next.x;
      const collinearY = previous.y === point.y && point.y === next.y;
      return !(collinearX || collinearY);
    });
    const loop = simplified.length >= 3 ? simplified : points.slice();
    if (this.getLoopArea(loop) < 0) {
      loop.reverse();
    }

    let minX = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    loop.forEach((point) => {
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
    });
    const centerX = (minX + maxX) * 0.5;
    let startIndex = 0;
    let bestY = Number.POSITIVE_INFINITY;
    let bestDistance = Number.POSITIVE_INFINITY;
    loop.forEach((point, index) => {
      const y = point.y / Math.max(1, height);
      const distance = Math.abs(point.x - centerX) / Math.max(1, width);
      if (y < bestY - 0.0001 || (Math.abs(y - bestY) <= 0.0001 && distance < bestDistance)) {
        bestY = y;
        bestDistance = distance;
        startIndex = index;
      }
    });

    return loop.slice(startIndex).concat(loop.slice(0, startIndex));
  }

  private getLoopArea(points: Array<{ x: number; y: number }>) {
    let area = 0;
    for (let index = 0; index < points.length; index += 1) {
      const current = points[index]!;
      const next = points[(index + 1) % points.length]!;
      area += current.x * next.y - next.x * current.y;
    }
    return area * 0.5;
  }

  private measureLegacyCooldownGeometry(svgText: string): { cooldownMarkup: string | null } | null {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.opacity = '0';
    wrapper.style.pointerEvents = 'none';
    wrapper.style.overflow = 'hidden';
    wrapper.style.width = '0';
    wrapper.style.height = '0';
    wrapper.innerHTML = svgText;
    document.body.appendChild(wrapper);
    try {
      const svg = wrapper.querySelector('svg');
      if (!svg) {
        return null;
      }
      const candidates = Array.from(svg.querySelectorAll<SVGGraphicsElement>('path, rect, circle, ellipse, polygon, polyline, line')).filter((node) => {
        if (node.closest('defs, clipPath')) {
          return false;
        }
        if (node.tagName.toLowerCase() === 'rect') {
          const fill = node.getAttribute('fill');
          const style = node.getAttribute('style') ?? '';
          const width = Number.parseFloat(node.getAttribute('width') ?? '0');
          const height = Number.parseFloat(node.getAttribute('height') ?? '0');
          const svgViewBox = svg.getAttribute('viewBox')?.split(/\s+/).map((value) => Number.parseFloat(value));
          const viewBoxWidth = svgViewBox && Number.isFinite(svgViewBox[2]) ? svgViewBox[2]! : 0;
          const viewBoxHeight = svgViewBox && Number.isFinite(svgViewBox[3]) ? svgViewBox[3]! : 0;
          if ((fill === 'none' || style.includes('fill:none')) && width >= viewBoxWidth && height >= viewBoxHeight) {
            return false;
          }
        }
        if (typeof node.getBBox !== 'function') {
          return false;
        }
        const box = node.getBBox();
        return box.width > 0.001 && box.height > 0.001;
      });
      if (candidates.length === 0) {
        return null;
      }

      let outlineCandidate: SVGGraphicsElement | null = null;
      let bestOutlineScore = -Infinity;
      candidates.forEach((candidate) => {
        const geometry = candidate as SVGGeometryElement;
        const box = candidate.getBBox();
        const area = Math.max(0.001, box.width * box.height);
        const length = typeof geometry.getTotalLength === 'function' ? geometry.getTotalLength() : 0;
        const fill = candidate.getAttribute('fill');
        const stroke = candidate.getAttribute('stroke');
        const style = candidate.getAttribute('style') ?? '';
        const hasStroke = stroke !== 'none' && !style.includes('stroke:none');
        const hasFill = fill !== 'none' && !style.includes('fill:none');
        const score =
          area * 100 +
          length +
          (hasStroke ? 80 : 0) +
          (hasFill ? 18 : 0);
        if (score > bestOutlineScore) {
          bestOutlineScore = score;
          outlineCandidate = candidate;
        }
      });

      let cooldownMarkup: string | null = null;
      if (outlineCandidate) {
        const tracedCandidate = outlineCandidate as SVGGraphicsElement;
        const flattened = tracedCandidate.cloneNode(true) as SVGGraphicsElement;
        flattened.removeAttribute('style');
        flattened.removeAttribute('fill');
        flattened.removeAttribute('stroke');
        const ctm = tracedCandidate.getCTM();
        if (ctm) {
          flattened.setAttribute('transform', `matrix(${ctm.a} ${ctm.b} ${ctm.c} ${ctm.d} ${ctm.e} ${ctm.f})`);
        } else {
          flattened.removeAttribute('transform');
        }
        flattened.setAttribute('fill', 'none');
        flattened.setAttribute('stroke', 'currentColor');
        flattened.setAttribute('pathLength', '100');
        flattened.setAttribute('vector-effect', 'non-scaling-stroke');
        cooldownMarkup = new XMLSerializer().serializeToString(flattened);
      }

      return { cooldownMarkup };
    } finally {
      wrapper.remove();
    }
  }

  private saveLeaderboardEntry() {
    if (!this.currentGameOverSignature || !this.currentRunSummary) {
      return;
    }
    const name = this.getLeaderboardPlayerName();
    window.localStorage.setItem(PLAYER_NAME_KEY, name);
    if (!this.canSaveLeaderboardEntry(name)) {
      this.leaderboardSaveButton.disabled = true;
      return;
    }
    const entries = this.readLeaderboard();
    const normalizedName = this.normalizeLeaderboardName(name);
    const filteredEntries = entries.filter((entry) => this.normalizeLeaderboardName(entry.name) !== normalizedName);
    const entry: LeaderboardEntry = {
      name,
      score: this.currentRunSummary.score,
      recordedAt: Date.now()
    };
    filteredEntries.push(entry);
    filteredEntries.sort((a, b) => b.score - a.score || a.recordedAt - b.recordedAt);
    window.localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(filteredEntries.slice(0, 20)));
    this.lastSavedGameOverSignature = this.currentGameOverSignature;
    this.leaderboardSaveButton.disabled = true;
    this.renderLeaderboard();
  }

  private readLeaderboard(): LeaderboardEntry[] {
    const raw = window.localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) {
      return [];
    }
    try {
      const parsed = JSON.parse(raw) as LeaderboardEntry[];
      const uniqueEntries = new Map<string, LeaderboardEntry>();
      parsed.forEach((entry) => {
        const normalizedName = this.normalizeLeaderboardName(entry.name);
        const existing = uniqueEntries.get(normalizedName);
        if (!existing || entry.score > existing.score || (entry.score === existing.score && entry.recordedAt < existing.recordedAt)) {
          uniqueEntries.set(normalizedName, entry);
        }
      });
      return Array.from(uniqueEntries.values()).sort((a, b) => b.score - a.score || a.recordedAt - b.recordedAt);
    } catch {
      return [];
    }
  }

  private renderLeaderboard() {
    this.leaderboardPanel.hidden = !this.leaderboardVisible;
    this.updateLeaderboardSaveVisibility();
    if (!this.leaderboardVisible) {
      return;
    }
    const entries = this.readLeaderboard();
    this.leaderboardList.innerHTML = entries.length
      ? entries
          .map(
            (entry, index) => `
              <div class="game-hud__leaderboard-row">
                <strong>#${index + 1} ${entry.name}</strong>
                <span>${entry.score}</span>
              </div>
            `
          )
          .join('')
      : `<p class="game-hud__game-over-empty">${this.i18n.t('gameLeaderboardEmpty')}</p>`;
  }

  private getLeaderboardPlayerName() {
    return (this.leaderboardNameInput.value.trim() || this.i18n.t('gameAnonymous')).slice(0, 18);
  }

  private normalizeLeaderboardName(name: string) {
    return name.trim().toLocaleLowerCase(this.i18n.current === 'fr' ? 'fr-FR' : 'en-US');
  }

  private updateLeaderboardSaveVisibility() {
    const playerName = this.getLeaderboardPlayerName();
    const canSave = this.canSaveLeaderboardEntry(playerName);
    const controls = this.leaderboardNameInput.parentElement as HTMLElement | null;
    if (controls) {
      controls.hidden = !canSave;
    }
    this.leaderboardNameInput.hidden = !canSave;
    this.leaderboardNameInput.disabled = !canSave;
    this.leaderboardSaveButton.hidden = !canSave;
    this.leaderboardSaveButton.disabled = !canSave || this.currentGameOverSignature === this.lastSavedGameOverSignature;
  }

  private canSaveLeaderboardEntry(name = this.getLeaderboardPlayerName()) {
    if (!this.currentRunSummary) {
      return false;
    }
    const existing = this.readLeaderboard().find((entry) => this.normalizeLeaderboardName(entry.name) === this.normalizeLeaderboardName(name));
    return !existing || this.currentRunSummary.score > existing.score;
  }

  private preloadUiAssets() {
    const itemAssets = rogueliteItems.flatMap((item) => [item.hudIconSrc, item.rarityIconSrc]);
    Object.values(GRADE_SPRITE_ASSET_URLS)
      .concat(
        Object.values(MOMENTUM_BAR_ASSETS),
        [COIN_ICON_URL, EQUIPMENT_UI_ASSETS.bgBoat],
        itemAssets,
        Object.values(EQUIPMENT_UI_ASSETS.charges),
        Object.values(MOBILE_CONTROL_ASSETS),
        MOBILE_CHARGE_ASSETS,
        Object.values(RESTART_BUTTON_ASSETS),
        Object.values(SETTINGS_BUTTON_ASSETS)
      )
      .forEach((src) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = src;
    });
    Object.values(EQUIPMENT_UI_ASSETS.charges).forEach((src) => this.preloadShapeTemplate(src));
    this.preloadShapeTemplate(EQUIPMENT_UI_ASSETS.bgBoat);
  }
}
