import type { RogueliteItemKind, RogueliteItemOffer, RogueliteRarity } from './roguelite';
import { getItemById, rarityLabels, rogueliteItems } from './roguelite';
import { preloadImageAsset } from '../core/browserAssetCache';
import { I18nService } from '../ui/I18nService';
import type { AcquisitionFeedback, GameOverCause, GamePlayerMotionState, LandingGrade } from './gameSessionTypes';
import {
  createEmptyAchievementPanelSnapshot,
  type AchievementEntrySnapshot,
  type AchievementPanelSnapshot,
  type AchievementRarity,
  type AchievementRewardSnapshot,
  type AchievementToastSnapshot
} from './achievements/AchievementTypes';
import { LandingGradeDisplay } from './LandingGradeDisplay';
import { GRADE_SPRITE_ASSET_URLS } from './GradeSpriteResolver';
import { MobileControlsHud } from './MobileControlsHud';
import { MOBILE_CHARGE_ASSETS, MOBILE_CONTROL_ASSETS } from './MobileControlLayoutResolver';
import { RewardBranchLabelLayoutResolver } from './RewardBranchLabelLayoutResolver';
import {
  ACHIEVEMENT_ICON_ASSETS,
  ACHIEVEMENT_RARITY_ICON_ASSETS,
  FULLSCREEN_BUTTON_ASSETS,
  getUIButtonAsset,
  HELP_ICON_ASSETS,
  SAVE_BUTTON_ASSETS,
  SECONDARY_NAV_ASSETS,
  SOUND_BUTTON_ASSETS,
  THEME_TOGGLE_ASSETS
} from './GameUiAssetResolver';
import { SETTINGS_BUTTON_ASSETS } from './SettingsButton';
import { observeThemeChanges, resolveDocumentTheme } from './ThemeAssetResolver';
import { TopRightUiCluster } from './TopRightUiCluster';
import { buildGameOverSummaryMarkup } from './buildGameOverSummaryMarkup';
import type { GameHudAvatarLayerSets } from './GameHudDeferredAssets';

const MOMENTUM_BAR_ASSETS = {
  bg: new URL('../../assets/images/game/ui/meters/momentum-background.png', import.meta.url).href,
  fill: new URL('../../assets/images/game/ui/meters/fill-strip.png', import.meta.url).href,
  top: new URL('../../assets/images/game/ui/meters/momentum-overlay.png', import.meta.url).href
};
const COIN_ICON_URL = new URL('../../assets/images/game/sprites/pickups/coin-sheet.png', import.meta.url).href;
const LANGUAGE_BUTTON_ASSETS = {
  fr: new URL('../../assets/images/shared/localization/fr.svg', import.meta.url).href,
  en: new URL('../../assets/images/shared/localization/en.svg', import.meta.url).href
} as const;
const GAME_OVER_HEADER_ASSETS = {
  dark: new URL('../../assets/images/game/ui/headers/game-over-title-dark.svg', import.meta.url).href,
  light: new URL('../../assets/images/game/ui/headers/game-over-title-light.svg', import.meta.url).href
} as const;
const EQUIPMENT_UI_ASSETS = {
  bgBoat: new URL('../../assets/images/game/ui/equipment/dock.svg', import.meta.url).href,
  charges: {
    plane: new URL('../../assets/images/game/ui/equipment/charges/plane.svg', import.meta.url).href,
    wings: new URL('../../assets/images/game/ui/equipment/charges/wings.svg', import.meta.url).href,
    propulseur: new URL('../../assets/images/game/ui/equipment/charges/thruster.svg', import.meta.url).href,
    reacteur_front: new URL('../../assets/images/game/ui/equipment/charges/front-reactor.svg', import.meta.url).href,
    reacteur_back: new URL('../../assets/images/game/ui/equipment/charges/rear-reactor.svg', import.meta.url).href,
    shield: new URL('../../assets/images/game/ui/equipment/charges/shield.svg', import.meta.url).href,
    souffleur_primary: new URL('../../assets/images/game/ui/equipment/charges/blower-primary.svg', import.meta.url).href,
    souffleur_recharge: new URL('../../assets/images/game/ui/equipment/charges/blower-recharge.svg', import.meta.url).href,
    wrapper: new URL('../../assets/images/game/ui/equipment/charges/wrapper.svg', import.meta.url).href,
    magnet: new URL('../../assets/images/game/ui/equipment/charges/magnet.svg', import.meta.url).href,
    big_canon: new URL('../../assets/images/game/ui/equipment/charges/big-cannon.svg', import.meta.url).href,
    front_canon: new URL('../../assets/images/game/ui/equipment/charges/front-cannon.svg', import.meta.url).href,
    grappin: new URL('../../assets/images/game/ui/equipment/charges/grappling-hook.svg', import.meta.url).href
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
type AchievementFilterValue = 'all' | AchievementRarity;
type AchievementSortMode = 'acquired' | 'rarity' | 'unlocked' | 'locked';

type BrowserFullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenEnabled?: boolean;
};

type BrowserFullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

interface GameHUDCallbacks {
  onRestart: () => void;
  onExit: () => void;
  onMainMenu: () => void;
  onSelectUpgrade: (index: number) => void;
  onCloseShop: () => void;
  onThemeToggle: () => void;
  onLanguageToggle: () => void;
  onAudioMuteToggle: () => void;
  onAudioVolumeChange: (value: number) => void;
  onMobileJump: () => void;
  onMobileChargeChange: (active: boolean) => void;
  onMobileGrapple: () => void;
  onMobileAirborneCharge: () => void;
  onGameOverStatReveal: (record: boolean) => void;
}

interface GameHUDPayload {
  playerMotionState: GamePlayerMotionState;
  score: number;
  scoreFeed: {
    serial: number;
    basePoints: number;
    gained: number;
    multiplier: number;
    momentumRatio?: number;
  } | null;
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
  mobile: {
    airborneChargeCount: number;
    airborneChargeDisplayCount: number;
    hasGrapple: boolean;
    grappleBlocked: boolean;
    hasSouffleur: boolean;
    hasSouffleurFuel: boolean;
  };
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
  shopCenter: {
    screenX: number;
    screenY: number;
  } | null;
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
    serial: number;
    grade: LandingGrade;
    twist: boolean;
    progress: number;
    screenX: number;
    screenY: number;
  } | null;
  acquisition: AcquisitionFeedback | null;
  achievementToasts: AchievementToastSnapshot[];
  achievements: AchievementPanelSnapshot;
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
  playerId?: string;
  name: string;
  score: number;
  recordedAt: number;
  avatar?: AvatarSelection;
  details?: {
    distanceMeters: number;
    shardsLanded: number;
    coinsCollected: number;
    enemiesKilled: number;
    longestMomentumSeconds: number;
  };
}

const AVATAR_LAYER_ORDER = ['background', 'motif', 'face', 'eyes', 'barbe'] as const;
type AvatarLayerKey = (typeof AVATAR_LAYER_ORDER)[number];

interface AvatarSelection {
  background: number;
  motif: number;
  face: number;
  eyes: number;
  barbe: number;
}

interface ResolvedAvatarLayers {
  background: string;
  motif: string;
  face: string;
  eyes: string;
  barbe: string;
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
const LEADERBOARD_API_PATH = '/api/leaderboard';
const PLAYER_ID_KEY = 'portfolio-game-player-id-v1';
const PLAYER_NAME_KEY = 'portfolio-game-player-name';
const PLAYER_AVATAR_KEY = 'portfolio-game-player-avatar-v1';
const GAME_HELP_SEEN_KEY = 'portfolio-game-help-seen-v1';

type HelpTheme = 'dark' | 'light';

function createEmptyAvatarLayerSets(): GameHudAvatarLayerSets {
  return {
    background: [],
    motif: [],
    face: [],
    eyes: [],
    barbe: []
  };
}

export class GameHUDSystem {
  readonly element: HTMLDivElement;
  private panel: HTMLDivElement;
  private runStrip: HTMLDivElement;
  private scoreFeed: HTMLDivElement;
  private runStripScoreLabel: HTMLSpanElement;
  private runStripBestLabel: HTMLSpanElement;
  private runStripDistanceLabel: HTMLSpanElement;
  private runStripScoreValue: HTMLSpanElement;
  private runStripBestValue: HTMLSpanElement;
  private runStripDistanceValue: HTMLSpanElement;
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
  private settingsMuteButton: HTMLButtonElement;
  private settingsHelpButton: HTMLButtonElement;
  private settingsVolumeLabel: HTMLSpanElement;
  private settingsVolumeValue: HTMLSpanElement;
  private settingsVolumeButton: HTMLButtonElement;
  private settingsVolumeMeter: HTMLSpanElement;
  private settingsVolumeMeterFill: HTMLSpanElement;
  private settingsFullscreenButton: HTMLButtonElement;
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
  private toastStack: HTMLDivElement;
  private achievementsOverlay: HTMLDivElement;
  private achievementsTitle: HTMLHeadingElement;
  private achievementsBody: HTMLParagraphElement;
  private achievementsSummary: HTMLDivElement;
  private achievementsControls: HTMLDivElement;
  private achievementsScroll: HTMLDivElement;
  private achievementsCloseButton: HTMLButtonElement;
  private gameOverOverlay: HTMLDivElement;
  private gameOverHeaderOverlay: HTMLDivElement;
  private gameOverHeaderImage: HTMLImageElement;
  private gameOverTitle: HTMLHeadingElement;
  private gameOverBody: HTMLParagraphElement;
  private gameOverStats: HTMLDivElement;
  private gameOverEquipment: HTMLDivElement;
  private gameOverAchievements: HTMLDivElement;
  private gameOverLeftColumn: HTMLDivElement;
  private leaderboardPanel: HTMLDivElement;
  private leaderboardList: HTMLDivElement;
  private leaderboardPreview: HTMLDivElement;
  private leaderboardHoverCard: HTMLDivElement;
  private leaderboardRegisterCopy: HTMLParagraphElement;
  private leaderboardNameInput: HTMLInputElement;
  private leaderboardSaveButton: HTMLButtonElement;
  private restartButton: HTMLButtonElement;
  private returnButton: HTMLButtonElement;
  private avatarEditor: HTMLDivElement;
  private avatarEditorStage: HTMLDivElement;
  private avatarEditorPreview: HTMLDivElement;
  private avatarEditorLayers: HTMLDivElement;
  private avatarEditorSaveButton: HTMLButtonElement;
  private avatarEditorCloseButton: HTMLButtonElement;
  private helpOverlay: HTMLDivElement;
  private helpStage: HTMLDivElement;
  private helpTrack: HTMLDivElement;
  private helpCounter: HTMLSpanElement;
  private helpPrevButton: HTMLButtonElement;
  private helpNextButton: HTMLButtonElement;
  private helpCloseButton: HTMLButtonElement;
  private gameOverRule: HTMLDivElement;
  private gameOverRuleImage: HTMLImageElement;
  private topRightCluster: TopRightUiCluster;
  private achievementsButton: HTMLButtonElement;
  private mobileControls: MobileControlsHud;
  private currentGameOverSignature = '';
  private currentGameOverRevealSignature = '';
  private currentGameOverRuleSrc = '';
  private lastSavedGameOverSignature = '';
  private currentRunSummary: GameHUDPayload['runSummary'] | null = null;
  private previousRunStripMetrics: { score: number; highscore: number; distanceMeters: number; coins: number } | null = null;
  private avatarLayerSets = createEmptyAvatarLayerSets();
  private playerAvatarSelection: AvatarSelection;
  private draftAvatarSelection: AvatarSelection;
  private avatarEditorOpen = false;
  private avatarAssetsLoaded = false;
  private avatarAssetsPromise: Promise<void> | null = null;
  private gameOverRevealTimeouts: number[] = [];
  private readonly shapeTemplateCache = new Map<string, EquipmentShapeTemplate | null>();
  private readonly shapeTemplatePending = new Set<string>();
  private readonly stopObservingTheme: () => void;
  private readonly rewardBranchLayout = new RewardBranchLabelLayoutResolver();
  private audioMuted = false;
  private audioVolume = 0.86;
  private lastScoreFeedSerial = 0;
  private readonly scoreFeedTimeouts = new Set<number>();
  private readonly helpPagesCache = new Map<string, string[]>();
  private readonly helpPagesPromises = new Map<string, Promise<string[]>>();
  private helpLocale: 'fr' | 'en' = 'en';
  private helpPageIndex = 0;
  private helpPageTransitionTimeout: number | null = null;
  private helpOpen = false;
  private helpPointerStartX: number | null = null;
  private helpAutoOpenedThisSession = false;
  private volumeDragPointerId: number | null = null;
  private lastFullscreenTouchAt = 0;
  private renderedLeaderboardEntries: Array<LeaderboardEntry | null> = [];
  private leaderboardEntriesCache: LeaderboardEntry[] = [];
  private leaderboardRequestSerial = 0;
  private leaderboardSyncState: 'idle' | 'loading' | 'saving' | 'error' = 'idle';
  private uiAssetsPreloaded = false;
  private leaderboardLoaded = false;
  private leaderboardLoadPromise: Promise<void> | null = null;
  private deferredAssetsModulePromise: Promise<typeof import('./GameHudDeferredAssets')> | null = null;
  private achievementsOpen = false;
  private currentAchievements = createEmptyAchievementPanelSnapshot();
  private renderedAchievementsSerial = -1;
  private achievementFilter: AchievementFilterValue = 'all';
  private achievementSortMode: AchievementSortMode = 'acquired';
  private achievementSortMenuOpen = false;

  constructor(host: HTMLElement, private readonly i18n: I18nService, private readonly callbacks: GameHUDCallbacks) {
    this.element = document.createElement('div');
    this.element.className = 'game-hud';
    this.element.hidden = true;
    this.element.innerHTML = `
      <div class="game-hud__top-right-anchor"></div>
      <div class="game-hud__run-strip">
        <div><span data-run-strip-best-label></span><strong data-run-strip-best>0</strong></div>
        <div><span data-run-strip-score-label></span><strong data-run-strip-score>0</strong></div>
        <div><span data-run-strip-distance-label></span><strong data-run-strip-distance>0m</strong></div>
      </div>
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
          <button type="button" data-settings-help class="game-hud__settings-help-button"></button>
          <button type="button" data-settings-language></button>
          <button type="button" data-settings-theme></button>
          <button type="button" data-settings-fullscreen class="mobile-only"></button>
          <button type="button" data-settings-mute></button>
          <button type="button" class="game-hud__settings-volume" data-settings-volume>
            <span class="game-hud__settings-volume-copy" data-settings-volume-label></span>
            <span class="game-hud__settings-volume-meter" data-settings-volume-meter aria-hidden="true">
              <span class="game-hud__settings-volume-meter-fill"></span>
            </span>
            <strong class="game-hud__settings-volume-value" data-settings-volume-value>86%</strong>
          </button>
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
        <div class="game-hud__score-feed" data-score-feed aria-hidden="true"></div>
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
      <div class="game-hud__toast-stack" data-toast-stack></div>
      <div class="game-hud__mobile-controls-anchor"></div>
      <div class="game-hud__help" hidden>
        <div class="game-hud__help-stage" data-help-stage>
          <button type="button" class="game-hud__help-nav game-hud__help-nav--prev" data-help-prev aria-label="Previous help page"></button>
          <div class="game-hud__help-track" data-help-track></div>
          <button type="button" class="game-hud__help-nav game-hud__help-nav--next" data-help-next aria-label="Next help page"></button>
        </div>
        <div class="game-hud__help-footer">
          <span data-help-counter>1 / 1</span>
          <button type="button" class="game-hud__help-close" data-help-close aria-label="Close help"></button>
        </div>
      </div>
      <div class="game-hud__achievements" hidden>
        <div class="game-hud__achievements-shell">
          <div class="game-hud__achievements-panel">
            <div class="game-hud__achievements-content">
              <div class="game-hud__achievements-header">
                <div class="game-hud__achievements-title-block">
                  <h2 data-achievements-title></h2>
                  <p data-achievements-body hidden></p>
                </div>
              </div>
              <div class="game-hud__achievements-summary" data-achievements-summary></div>
              <div class="game-hud__achievements-controls" data-achievements-controls></div>
              <div class="game-hud__achievements-scroll" data-achievements-scroll></div>
              <div class="game-hud__achievements-footer">
                <button type="button" class="game-hud__achievements-close" data-achievements-close aria-label="Close achievements"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="game-hud__game-over">
        <div class="game-hud__game-over-achievements" data-game-over-achievements hidden></div>
        <div class="game-hud__game-over-side game-hud__game-over-side--left" data-game-over-left-column>
          <div class="game-hud__game-over-rule" data-game-over-rule hidden>
            <img data-game-over-rule-image alt="" class="game-hud__game-over-rule-image" />
          </div>
          <div class="game-hud__avatar-editor" data-avatar-editor hidden>
            <div class="game-hud__avatar-editor-stage">
              <div class="game-hud__avatar-editor-preview" data-avatar-editor-preview></div>
            </div>
            <div class="game-hud__avatar-editor-layers" data-avatar-editor-layers></div>
            <button type="button" class="game-hud__avatar-editor-close" data-avatar-close></button>
            <button type="button" class="game-hud__avatar-editor-save" data-avatar-save></button>
          </div>
        </div>
        <div class="game-hud__game-over-stack">
          <div class="game-hud__game-over-header-overlay" data-game-over-header-overlay hidden>
            <img data-game-over-header-image alt="" class="game-hud__game-over-header-image" />
          </div>
          <div class="game-hud__game-over-panel">
            <div class="game-hud__game-over-header">
              <h2 data-game-over-title></h2>
              <p data-game-over-body></p>
            </div>
            <div class="game-hud__game-over-stats" data-game-over-stats></div>
            <div class="game-hud__game-over-gear" data-game-over-gear></div>
            <div class="game-hud__game-over-actions">
              <button type="button" data-restart></button>
              <button type="button" data-return></button>
            </div>
          </div>
        </div>
        <div class="game-hud__game-over-side game-hud__game-over-side--right">
          <div class="game-hud__leaderboard" data-leaderboard-panel>
            <div class="game-hud__leaderboard-list" data-leaderboard-list></div>
            <div class="game-hud__leaderboard-preview" data-leaderboard-preview></div>
            <p class="game-hud__leaderboard-register-copy" data-leaderboard-register-copy></p>
            <div class="game-hud__leaderboard-controls">
              <input type="text" maxlength="18" data-leaderboard-name />
              <button type="button" data-leaderboard-save></button>
            </div>
          </div>
        </div>
      </div>
      <div class="game-hud__leaderboard-hover" data-leaderboard-hover hidden></div>
    `;

    this.panel = this.element.querySelector<HTMLDivElement>('.game-hud__panel')!;
    this.runStrip = this.element.querySelector<HTMLDivElement>('.game-hud__run-strip')!;
    this.scoreFeed = this.element.querySelector<HTMLDivElement>('[data-score-feed]')!;
    this.runStripScoreLabel = this.element.querySelector<HTMLSpanElement>('[data-run-strip-score-label]')!;
    this.runStripBestLabel = this.element.querySelector<HTMLSpanElement>('[data-run-strip-best-label]')!;
    this.runStripDistanceLabel = this.element.querySelector<HTMLSpanElement>('[data-run-strip-distance-label]')!;
    this.runStripScoreValue = this.element.querySelector<HTMLSpanElement>('[data-run-strip-score]')!;
    this.runStripBestValue = this.element.querySelector<HTMLSpanElement>('[data-run-strip-best]')!;
    this.runStripDistanceValue = this.element.querySelector<HTMLSpanElement>('[data-run-strip-distance]')!;
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
    this.settingsHelpButton = this.element.querySelector<HTMLButtonElement>('[data-settings-help]')!;
    this.settingsThemeButton = this.element.querySelector<HTMLButtonElement>('[data-settings-theme]')!;
    this.settingsLanguageButton = this.element.querySelector<HTMLButtonElement>('[data-settings-language]')!;
    this.settingsMuteButton = this.element.querySelector<HTMLButtonElement>('[data-settings-mute]')!;
    this.settingsVolumeLabel = this.element.querySelector<HTMLSpanElement>('[data-settings-volume-label]')!;
    this.settingsVolumeValue = this.element.querySelector<HTMLSpanElement>('[data-settings-volume-value]')!;
    this.settingsVolumeButton = this.element.querySelector<HTMLButtonElement>('[data-settings-volume]')!;
    this.settingsVolumeMeter = this.element.querySelector<HTMLSpanElement>('[data-settings-volume-meter]')!;
    this.settingsVolumeMeterFill = this.element.querySelector<HTMLSpanElement>('.game-hud__settings-volume-meter-fill')!;
    this.settingsFullscreenButton = this.element.querySelector<HTMLButtonElement>('[data-settings-fullscreen]')!;
    this.branchLayer = this.element.querySelector<HTMLDivElement>('.game-hud__branch-layer')!;
    this.stashBar = this.element.querySelector<HTMLDivElement>('.game-hud__stash')!;
    this.inventoryBar = this.element.querySelector<HTMLDivElement>('.game-hud__inventory')!;
    this.branchTitle = this.element.querySelector<HTMLHeadingElement>('[data-upgrade-title]')!;
    this.branchHint = this.element.querySelector<HTMLParagraphElement>('[data-upgrade-hint]')!;
    this.branchCards = Array.from(this.element.querySelectorAll<HTMLDivElement>('[data-branch-card]'));
    this.shopBar = this.element.querySelector<HTMLDivElement>('.game-hud__shop-bar')!;
    this.shopButtons = Array.from(this.element.querySelectorAll<HTMLButtonElement>('[data-shop-offer]'));
    this.shopCloseButton = this.element.querySelector<HTMLButtonElement>('[data-shop-close]')!;
    this.toastStack = this.element.querySelector<HTMLDivElement>('[data-toast-stack]')!;
    this.achievementsOverlay = this.element.querySelector<HTMLDivElement>('.game-hud__achievements')!;
    this.achievementsTitle = this.element.querySelector<HTMLHeadingElement>('[data-achievements-title]')!;
    this.achievementsBody = this.element.querySelector<HTMLParagraphElement>('[data-achievements-body]')!;
    this.achievementsSummary = this.element.querySelector<HTMLDivElement>('[data-achievements-summary]')!;
    this.achievementsControls = this.element.querySelector<HTMLDivElement>('[data-achievements-controls]')!;
    this.achievementsScroll = this.element.querySelector<HTMLDivElement>('[data-achievements-scroll]')!;
    this.achievementsCloseButton = this.element.querySelector<HTMLButtonElement>('[data-achievements-close]')!;
    this.gameOverOverlay = this.element.querySelector<HTMLDivElement>('.game-hud__game-over')!;
    this.gameOverHeaderOverlay = this.element.querySelector<HTMLDivElement>('[data-game-over-header-overlay]')!;
    this.gameOverHeaderImage = this.element.querySelector<HTMLImageElement>('[data-game-over-header-image]')!;
    this.gameOverTitle = this.element.querySelector<HTMLHeadingElement>('[data-game-over-title]')!;
    this.gameOverBody = this.element.querySelector<HTMLParagraphElement>('[data-game-over-body]')!;
    this.gameOverStats = this.element.querySelector<HTMLDivElement>('[data-game-over-stats]')!;
    this.gameOverEquipment = this.element.querySelector<HTMLDivElement>('[data-game-over-gear]')!;
    this.gameOverAchievements = this.element.querySelector<HTMLDivElement>('[data-game-over-achievements]')!;
    this.gameOverLeftColumn = this.element.querySelector<HTMLDivElement>('[data-game-over-left-column]')!;
    this.helpOverlay = this.element.querySelector<HTMLDivElement>('.game-hud__help')!;
    this.helpStage = this.element.querySelector<HTMLDivElement>('[data-help-stage]')!;
    this.helpTrack = this.element.querySelector<HTMLDivElement>('[data-help-track]')!;
    this.helpCounter = this.element.querySelector<HTMLSpanElement>('[data-help-counter]')!;
    this.helpPrevButton = this.element.querySelector<HTMLButtonElement>('[data-help-prev]')!;
    this.helpNextButton = this.element.querySelector<HTMLButtonElement>('[data-help-next]')!;
    this.helpCloseButton = this.element.querySelector<HTMLButtonElement>('[data-help-close]')!;
    this.gameOverRule = this.element.querySelector<HTMLDivElement>('[data-game-over-rule]')!;
    this.gameOverRuleImage = this.element.querySelector<HTMLImageElement>('[data-game-over-rule-image]')!;
    this.leaderboardPanel = this.element.querySelector<HTMLDivElement>('[data-leaderboard-panel]')!;
    this.leaderboardList = this.element.querySelector<HTMLDivElement>('[data-leaderboard-list]')!;
    this.leaderboardPreview = this.element.querySelector<HTMLDivElement>('[data-leaderboard-preview]')!;
    this.leaderboardHoverCard = this.element.querySelector<HTMLDivElement>('[data-leaderboard-hover]')!;
    this.leaderboardRegisterCopy = this.element.querySelector<HTMLParagraphElement>('[data-leaderboard-register-copy]')!;
    this.leaderboardNameInput = this.element.querySelector<HTMLInputElement>('[data-leaderboard-name]')!;
    this.leaderboardSaveButton = this.element.querySelector<HTMLButtonElement>('[data-leaderboard-save]')!;
    this.restartButton = this.element.querySelector<HTMLButtonElement>('[data-restart]')!;
    this.returnButton = this.element.querySelector<HTMLButtonElement>('[data-return]')!;
    this.avatarEditor = this.element.querySelector<HTMLDivElement>('[data-avatar-editor]')!;
    this.avatarEditorStage = this.element.querySelector<HTMLDivElement>('.game-hud__avatar-editor-stage')!;
    this.avatarEditorPreview = this.element.querySelector<HTMLDivElement>('[data-avatar-editor-preview]')!;
    this.avatarEditorLayers = this.element.querySelector<HTMLDivElement>('[data-avatar-editor-layers]')!;
    this.avatarEditorCloseButton = this.element.querySelector<HTMLButtonElement>('[data-avatar-close]')!;
    this.avatarEditorSaveButton = this.element.querySelector<HTMLButtonElement>('[data-avatar-save]')!;
    this.landingFeedbackDisplay = new LandingGradeDisplay();
    this.element.appendChild(this.landingFeedbackDisplay.element);
    this.playerAvatarSelection = this.readPlayerAvatarSelection();
    this.draftAvatarSelection = { ...this.playerAvatarSelection };
    this.topRightCluster = new TopRightUiCluster(
      this.element.querySelector<HTMLDivElement>('.game-hud__top-right-anchor')!,
      this.panel,
      this.i18n.current === 'fr' ? 'Paramètres du jeu' : 'Game settings'
    );
    this.achievementsButton = document.createElement('button');
    this.achievementsButton.type = 'button';
    this.achievementsButton.className = 'game-hud__settings-toggle game-hud__settings-toggle--achievement';
    this.topRightCluster.element.insertBefore(this.achievementsButton, this.topRightCluster.settingsButton.element);
    this.topRightCluster.settingsButton.element.addEventListener('click', () => {
      this.closeAchievements();
      this.topRightCluster.toggle();
    });
    this.achievementsButton.addEventListener('click', () => {
      this.toggleAchievements();
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
        onChargeChange: callbacks.onMobileChargeChange,
        onJump: callbacks.onMobileJump,
        onAirborneCharge: callbacks.onMobileAirborneCharge,
        onGrapple: callbacks.onMobileGrapple
      }
    );

    this.exitButton.addEventListener('click', callbacks.onExit);
    this.restartButton.addEventListener('click', callbacks.onRestart);
    this.returnButton.addEventListener('click', callbacks.onMainMenu);
    this.leaderboardSaveButton.addEventListener('click', () => this.saveLeaderboardEntry());
    this.leaderboardList.addEventListener('click', (event) => this.handleLeaderboardClick(event));
    this.leaderboardPreview.addEventListener('click', (event) => this.handleLeaderboardClick(event));
    this.leaderboardList.addEventListener('mousemove', (event) => this.handleLeaderboardHover(event));
    this.leaderboardList.addEventListener('mouseleave', () => this.hideLeaderboardHover());
    this.leaderboardNameInput.value = window.localStorage.getItem(PLAYER_NAME_KEY) ?? '';
    this.leaderboardNameInput.addEventListener('input', () => this.renderLeaderboard());
    this.leaderboardNameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.saveLeaderboardEntry();
      }
    });
    this.avatarEditor.addEventListener('click', (event) => {
      const button = (event.target as HTMLElement | null)?.closest<HTMLButtonElement>('[data-avatar-layer][data-avatar-step]');
      if (!button) {
        return;
      }
      const layer = button.dataset.avatarLayer as AvatarLayerKey;
      const direction = Number(button.dataset.avatarStep) === -1 ? -1 : 1;
      this.stepAvatarSelection(layer, direction);
    });
    this.avatarEditorSaveButton.addEventListener('click', () => this.saveAvatarSelection());
    window.setTimeout(() => this.runStrip.classList.add('is-mounted'), 2000);
    this.shopButtons.forEach((button, index) => {
      button.addEventListener('click', () => callbacks.onSelectUpgrade(index));
    });
    this.shopCloseButton.addEventListener('click', callbacks.onCloseShop);
    this.settingsHelpButton.addEventListener('click', () => {
      this.closeAchievements();
      this.openHelp(this.i18n.current);
    });
    this.settingsThemeButton.addEventListener('click', callbacks.onThemeToggle);
    this.settingsLanguageButton.addEventListener('click', callbacks.onLanguageToggle);
    this.settingsMuteButton.addEventListener('click', callbacks.onAudioMuteToggle);
    this.settingsFullscreenButton.addEventListener('touchend', (event) => {
      event.preventDefault();
      this.lastFullscreenTouchAt = Date.now();
      void this.toggleFullscreen();
    }, { passive: false });
    this.settingsFullscreenButton.addEventListener('click', () => {
      if (Date.now() - this.lastFullscreenTouchAt < 500) {
        return;
      }
      void this.toggleFullscreen();
    });
    const updateVolumeFromPointer = (clientX: number) => {
      const rect = this.settingsVolumeMeter.getBoundingClientRect();
      if (rect.width <= 0) {
        return;
      }
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      this.audioVolume = ratio;
      callbacks.onAudioVolumeChange(ratio);
      this.renderAudioControls();
    };
    this.settingsVolumeButton.addEventListener('pointerdown', (event) => {
      this.volumeDragPointerId = event.pointerId;
      this.settingsVolumeButton.setPointerCapture(event.pointerId);
      updateVolumeFromPointer(event.clientX);
    });
    this.settingsVolumeButton.addEventListener('pointermove', (event) => {
      if (this.volumeDragPointerId !== event.pointerId) {
        return;
      }
      updateVolumeFromPointer(event.clientX);
    });
    const releaseVolumePointer = (event: PointerEvent) => {
      if (this.volumeDragPointerId !== event.pointerId) {
        return;
      }
      this.settingsVolumeButton.releasePointerCapture(event.pointerId);
      this.volumeDragPointerId = null;
    };
    this.settingsVolumeButton.addEventListener('pointerup', releaseVolumePointer);
    document.addEventListener('fullscreenchange', () => this.renderSettingsButtons());
    document.addEventListener('webkitfullscreenchange', () => this.renderSettingsButtons());
    this.settingsVolumeButton.addEventListener('pointercancel', releaseVolumePointer);
    this.helpPrevButton.addEventListener('click', () => this.setHelpPage(this.helpPageIndex - 1));
    this.helpNextButton.addEventListener('click', () => this.setHelpPage(this.helpPageIndex + 1));
    this.helpCloseButton.addEventListener('click', () => this.closeHelp());
    this.avatarEditorCloseButton.addEventListener('click', () => {
      this.avatarEditorOpen = false;
      this.renderAvatarEditor();
      this.renderGameOverMode(null);
    });
    this.helpOverlay.addEventListener('click', (event) => {
      if (event.target === this.helpOverlay) {
        this.closeHelp();
      }
    });
    this.achievementsCloseButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.closeAchievements();
    });
    this.achievementsCloseButton.addEventListener('pointerup', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.closeAchievements();
    });
    this.achievementsOverlay.addEventListener('click', (event) => {
      const closeButton = (event.target as HTMLElement | null)?.closest<HTMLButtonElement>('[data-achievements-close]');
      if (closeButton) {
        event.preventDefault();
        event.stopPropagation();
        this.closeAchievements();
        return;
      }
      const sortToggleButton = (event.target as HTMLElement | null)?.closest<HTMLButtonElement>('[data-achievement-sort-toggle]');
      if (sortToggleButton) {
        event.preventDefault();
        this.achievementSortMenuOpen = !this.achievementSortMenuOpen;
        this.renderAchievementsContent(this.currentAchievements, true);
        return;
      }
      const sortOptionButton = (event.target as HTMLElement | null)?.closest<HTMLButtonElement>('[data-achievement-sort-option]');
      if (sortOptionButton) {
        const nextSort = (sortOptionButton.dataset.achievementSortOption as AchievementSortMode | undefined) ?? 'rarity';
        if (nextSort !== this.achievementSortMode) {
          this.achievementSortMode = nextSort;
        }
        this.achievementSortMenuOpen = false;
        this.renderAchievementsContent(this.currentAchievements, true);
        return;
      }
      const filterButton = (event.target as HTMLElement | null)?.closest<HTMLButtonElement>('[data-achievement-filter]');
      if (filterButton) {
        const nextFilter = (filterButton.dataset.achievementFilter as AchievementFilterValue | undefined) ?? 'all';
        if (nextFilter !== this.achievementFilter) {
          this.achievementFilter = nextFilter;
        }
        this.achievementSortMenuOpen = false;
        this.renderAchievementsContent(this.currentAchievements, true);
        return;
      }
      if (event.target === this.achievementsOverlay) {
        this.closeAchievements();
        return;
      }
      if (this.achievementSortMenuOpen) {
        this.achievementSortMenuOpen = false;
        this.renderAchievementsContent(this.currentAchievements, true);
      }
    });
    this.helpStage.addEventListener('pointerdown', (event) => {
      this.helpPointerStartX = event.clientX;
    });
    this.helpStage.addEventListener('pointerup', (event) => {
      if (this.helpPointerStartX === null) {
        return;
      }
      const deltaX = event.clientX - this.helpPointerStartX;
      this.helpPointerStartX = null;
      if (Math.abs(deltaX) < 36) {
        return;
      }
      if (deltaX < 0) {
        this.setHelpPage(this.helpPageIndex + 1);
      } else {
        this.setHelpPage(this.helpPageIndex - 1);
      }
    });
    this.helpStage.addEventListener('pointercancel', () => {
      this.helpPointerStartX = null;
    });
    this.stopObservingTheme = observeThemeChanges(() => {
      this.renderAchievementsButton();
      this.renderSettingsButtons();
      this.renderAudioControls();
      this.renderGameOverButtons();
      this.renderAvatarEditor();
      this.renderAchievementsContent(this.currentAchievements, true);
      this.renderGameOverAchievementStrip(this.currentAchievements, this.currentRunSummary !== null, true);
      if (this.currentRunSummary) {
        this.currentGameOverSignature = '';
        this.currentGameOverRuleSrc = '';
        this.renderGameOverSummaryFromCurrentRun();
      } else {
        this.renderLeaderboard();
      }
      if (this.helpOpen) {
        void this.ensureHelpPagesLoaded(this.helpLocale).then(() => {
          if (!this.helpOpen) {
            return;
          }
          this.renderHelpPages();
          this.setHelpPage(this.helpPageIndex);
        });
      }
    });
    host.appendChild(this.element);

    this.i18n.onChange(() => this.renderStatic());
    this.closeHelp();
    this.leaderboardEntriesCache = this.readLocalLeaderboardCache();
    this.renderStatic();
  }

  setVisible(visible: boolean) {
    this.element.hidden = !visible;
    this.element.classList.toggle('is-visible', visible);
    this.element.setAttribute('aria-hidden', visible ? 'false' : 'true');
    this.element.inert = !visible;
    this.element.style.pointerEvents = visible ? '' : 'none';
    document.body.classList.toggle('game-runtime-ui-active', visible);
    if (!visible) {
      this.closeHelp();
      this.closeAchievements();
      this.topRightCluster.toggle(false);
      this.landingFeedbackDisplay.clear();
      this.clearScoreFeed();
      this.clearGameOverRevealTimers();
      this.avatarEditorOpen = false;
      this.draftAvatarSelection = { ...this.playerAvatarSelection };
      this.branchLayer.hidden = true;
      this.shopBar.hidden = true;
      this.gameOverOverlay.hidden = true;
      this.toastStack.hidden = true;
      this.toastStack.innerHTML = '';
      this.achievementsOverlay.hidden = true;
      this.gameOverAchievements.hidden = true;
      this.branchLayer.inert = true;
      this.shopBar.inert = true;
      this.gameOverOverlay.inert = true;
      this.toastStack.inert = true;
      this.achievementsOverlay.inert = true;
    } else {
      this.ensureUiAssetsPreloaded();
      this.branchLayer.inert = false;
      this.shopBar.inert = false;
      this.gameOverOverlay.inert = false;
      this.toastStack.inert = false;
      this.achievementsOverlay.inert = !this.achievementsOpen;
    }
  }

  dispose() {
    this.stopObservingTheme();
  }

  private ensureUiAssetsPreloaded() {
    if (this.uiAssetsPreloaded) {
      return;
    }
    this.uiAssetsPreloaded = true;
    this.preloadUiAssets();
  }

  private ensureDeferredAssetsModule() {
    this.deferredAssetsModulePromise ??= import('./GameHudDeferredAssets');
    return this.deferredAssetsModulePromise;
  }

  private getHelpCacheKey(locale: 'fr' | 'en', theme = resolveDocumentTheme()) {
    return `${locale}:${theme}`;
  }

  private ensureHelpPagesLoaded(locale: 'fr' | 'en', theme = resolveDocumentTheme()) {
    const cacheKey = this.getHelpCacheKey(locale, theme);
    const cached = this.helpPagesCache.get(cacheKey);
    if (cached) {
      return Promise.resolve(cached);
    }

    const pending = this.helpPagesPromises.get(cacheKey);
    if (pending) {
      return pending;
    }

    const request = this.ensureDeferredAssetsModule()
      .then(({ loadHelpPagesFor }) => loadHelpPagesFor(locale, theme as HelpTheme))
      .then((pages) => {
        this.helpPagesCache.set(cacheKey, pages);
        return pages;
      })
      .catch((error) => {
        this.helpPagesPromises.delete(cacheKey);
        console.warn('[GameHUDSystem] Failed to load deferred help assets.', error);
        return [];
      });

    this.helpPagesPromises.set(cacheKey, request);
    return request;
  }

  private ensureAvatarAssetsLoaded() {
    if (this.avatarAssetsLoaded) {
      return Promise.resolve();
    }
    if (this.avatarAssetsPromise) {
      return this.avatarAssetsPromise;
    }

    this.avatarAssetsPromise = this.ensureDeferredAssetsModule()
      .then(({ loadAvatarLayerSets }) => loadAvatarLayerSets())
      .then((sets) => {
        this.avatarLayerSets = sets;
        this.avatarAssetsLoaded = true;
        this.playerAvatarSelection = this.normalizeAvatarSelection(this.playerAvatarSelection, '', true);
        this.draftAvatarSelection = this.normalizeAvatarSelection(this.draftAvatarSelection, '', true);
        if (this.currentRunSummary) {
          this.renderLeaderboard();
        }
        if (this.avatarEditorOpen) {
          this.renderAvatarEditor();
        }
      })
      .catch((error) => {
        this.avatarAssetsPromise = null;
        console.warn('[GameHUDSystem] Failed to load deferred skins.', error);
      });

    return this.avatarAssetsPromise;
  }

  private ensureLeaderboardLoaded(options?: { rerender?: boolean }) {
    if (this.leaderboardLoaded && !options?.rerender) {
      return Promise.resolve();
    }
    if (this.leaderboardLoadPromise) {
      return this.leaderboardLoadPromise;
    }

    this.leaderboardLoadPromise = this.refreshLeaderboard(options)
      .then(() => {
        this.leaderboardLoaded = true;
      })
      .finally(() => {
        this.leaderboardLoadPromise = null;
      });

    return this.leaderboardLoadPromise;
  }

  setAudioControls(settings: { volume: number; muted: boolean }) {
    this.audioVolume = Math.min(1, Math.max(0, settings.volume));
    this.audioMuted = settings.muted;
    this.renderAudioControls();
  }

  update(payload: GameHUDPayload) {
    this.currentAchievements = payload.achievements;
    const previousMetrics = this.previousRunStripMetrics;
    this.scoreValue.textContent = String(payload.score);
    this.highscoreValue.textContent = String(payload.highscore);
    this.bestDistanceValue.textContent = `${Math.round(payload.bestDistanceMeters)}m`;
    this.distanceValue.textContent = `${Math.round(payload.distanceMeters)}m`;
    this.runStripScoreValue.textContent = String(payload.score);
    this.runStripBestValue.textContent = String(payload.highscore);
    this.runStripDistanceValue.textContent = `${Math.round(payload.distanceMeters)}m`;
    if (previousMetrics) {
      if (payload.score > previousMetrics.score) {
        this.bumpHudMetric(this.runStripScoreValue.closest('div'));
      }
      if (payload.highscore > previousMetrics.highscore) {
        this.bumpHudMetric(this.runStripBestValue.closest('div'));
      }
      if (Math.round(payload.distanceMeters) > Math.round(previousMetrics.distanceMeters)) {
        this.bumpHudMetric(this.runStripDistanceValue.closest('div'));
      }
      if (payload.coins > previousMetrics.coins) {
        this.bumpHudMetric(this.coinsValue.closest('.game-hud__wallet'));
      }
    }
    this.previousRunStripMetrics = {
      score: payload.score,
      highscore: payload.highscore,
      distanceMeters: payload.distanceMeters,
      coins: payload.coins
    };
    if (payload.state === 'running' && payload.scoreFeed && payload.scoreFeed.serial !== this.lastScoreFeedSerial) {
      this.lastScoreFeedSerial = payload.scoreFeed.serial;
      this.pushScoreFeedEvent(payload.scoreFeed);
    }
    this.coinsValue.textContent = `× ${payload.coins}`;
    this.chainValue.textContent = `${Math.round(payload.momentumGauge * 100)}%`;
    this.chainValue.style.opacity = `${0.58 + payload.momentumGauge * 0.42}`;
    this.momentumBarValue.textContent = '';
    this.momentumShell.style.setProperty('--momentum-ratio', payload.momentumGauge.toFixed(3));
    const fillIntervalMs = 120;
    const fillPhase = Math.floor(performance.now() / fillIntervalMs) % 4;
    this.momentumShell.style.setProperty('--momentum-frame', String(fillPhase));
    this.settingsVolumeMeterFill.style.setProperty('--sound-ui-frame', String(this.audioMuted ? 0 : fillPhase));
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
    const shopHints = payload.branchHints.filter((hint) => hint.mode === 'shop_orbit');
    const showingShop = shopHints.length > 0;
    const gameplayHudActive = payload.state === 'running' || payload.state === 'upgrade_choice';
    const achievementsHudActive = gameplayHudActive || payload.state === 'game_over';
    const toastHudActive = gameplayHudActive || payload.state === 'game_over';
    const toastPayloads = [
      ...payload.achievementToasts.map((value) => ({ kind: 'achievement' as const, value })),
      ...(payload.acquisition ? [{ kind: 'acquisition' as const, value: payload.acquisition }] : [])
    ];
    this.branchTitle.textContent = showingShop ? this.i18n.t('gameShopTitle') : this.i18n.t('gameUpgradeTitle');
    this.branchHint.textContent = showingShop ? this.i18n.t('gameShopHint') : this.i18n.t('gameUpgradeHint');

    this.branchLayer.hidden = !(payload.state === 'upgrade_choice' && showingShop);
    this.shopBar.hidden = !(payload.state === 'upgrade_choice' && showingShop);
    this.gameOverOverlay.hidden = payload.state !== 'game_over';
    this.toastStack.hidden = toastPayloads.length === 0 || !toastHudActive;
    this.branchLayer.inert = !(payload.state === 'upgrade_choice' && showingShop);
    this.shopBar.inert = !(payload.state === 'upgrade_choice' && showingShop);
    this.gameOverOverlay.inert = payload.state !== 'game_over';
    this.toastStack.inert = toastPayloads.length === 0 || !toastHudActive;
    this.stashBar.hidden = payload.state === 'upgrade_choice' || payload.state === 'game_over';
    if (payload.state !== 'running' && this.scoreFeed.childElementCount > 0) {
      this.clearScoreFeed();
    }
    this.panel.classList.toggle('is-hidden', false);
    this.runStrip.hidden = payload.state === 'game_over';
    this.branchLayer.classList.toggle('is-visible', payload.state === 'upgrade_choice' && showingShop);
    this.shopBar.classList.toggle('is-visible', payload.state === 'upgrade_choice' && showingShop);
    this.stashBar.classList.toggle('is-visible', payload.state !== 'upgrade_choice' && payload.state !== 'game_over');
    this.momentumDock.classList.toggle('is-hidden', payload.state === 'upgrade_choice' || payload.state === 'game_over');
    this.gameOverOverlay.classList.toggle('is-visible', payload.state === 'game_over');
    this.toastStack.classList.toggle('is-visible', toastPayloads.length > 0 && toastHudActive);
    this.achievementsButton.hidden = !achievementsHudActive;
    this.achievementsButton.disabled = !achievementsHudActive;
    if (!achievementsHudActive) {
      this.closeAchievements();
    }
    if (
      payload.state === 'running' &&
      !this.helpOpen &&
      !this.helpAutoOpenedThisSession &&
      window.localStorage.getItem(GAME_HELP_SEEN_KEY) !== '1'
    ) {
      const openAutoHelp = () => {
        if (this.helpOpen || this.helpAutoOpenedThisSession || window.localStorage.getItem(GAME_HELP_SEEN_KEY) === '1') {
          return;
        }
        this.helpAutoOpenedThisSession = true;
        window.localStorage.setItem(GAME_HELP_SEEN_KEY, '1');
        this.openHelp('en');
      };

      if (this.getHelpPages('en').length > 0) {
        openAutoHelp();
      } else {
        void this.ensureHelpPagesLoaded('en').then((pages) => {
          if (pages.length > 0) {
            openAutoHelp();
          }
        });
      }
    }
    this.renderToastStack(toastPayloads, toastHudActive);
    this.renderLandingFeedback(payload.landingFeedback);
    this.mobileControls.update({
      chargeRatio: payload.chargeRatio,
      state: payload.state,
      playerMotionState: payload.playerMotionState,
      mobile: payload.mobile
    });
    if (payload.state === 'game_over') {
      this.renderGameOverSummary(payload);
    } else {
      this.clearGameOverRevealTimers();
      this.currentRunSummary = null;
      this.currentGameOverSignature = '';
      this.currentGameOverRevealSignature = '';
      this.currentGameOverRuleSrc = '';
      this.lastSavedGameOverSignature = '';
      this.avatarEditorOpen = false;
      this.draftAvatarSelection = { ...this.playerAvatarSelection };
    }
    this.renderAchievementsContent(payload.achievements);
    this.renderGameOverAchievementStrip(payload.achievements, payload.state === 'game_over');
    this.renderInventory(payload.inventoryItems);
    this.renderEquipmentDock(payload.inventoryItems);
    this.renderBranchHints(shopHints);
    this.renderShopBar(shopHints, payload.coins, payload.shopCenter);
    this.renderGameOverMode(payload.gameOverCause);
  }

  private renderStatic() {
    this.scoreLabel.textContent = this.i18n.t('gameScore');
    this.runStripScoreLabel.textContent = this.i18n.t('gameScore');
    this.runStripBestLabel.textContent = this.i18n.t('gameBest');
    this.runStripDistanceLabel.textContent = this.i18n.t('gameDistance');
    this.highscoreLabel.textContent = this.i18n.t('gameBest');
    this.chargeLabel.textContent = this.i18n.t('gameCharge');
    this.chainLabel.textContent = this.i18n.t('gameMomentum');
    this.momentumBarLabel.textContent = '';
    this.distanceLabel.textContent = this.i18n.t('gameDistance');
    this.exitButton.textContent = this.i18n.t('gamePortfolio');
    this.branchTitle.textContent = this.i18n.t('gameUpgradeTitle');
    this.branchHint.textContent = this.i18n.t('gameUpgradeHint');
    this.shopCloseButton.textContent = this.i18n.t('gameShopClose');
    this.achievementsTitle.textContent = this.i18n.t('gameAchievementsTitle');
    this.achievementsBody.textContent = '';
    this.achievementsBody.hidden = true;
    this.settingsThemeButton.textContent = this.i18n.t('theme');
    this.settingsLanguageButton.textContent = this.i18n.t('language');
    this.topRightCluster.settingsButton.element.setAttribute(
      'aria-label',
      this.i18n.current === 'fr' ? 'Paramètres du jeu' : 'Game settings'
    );
    this.renderAchievementsButton();
    this.gameOverTitle.textContent = this.i18n.t('gameOverTitle');
    this.gameOverBody.textContent = this.i18n.t('gameOverBody');
    this.helpPrevButton.setAttribute('aria-label', this.i18n.current === 'fr' ? 'Page précédente' : 'Previous page');
    this.helpNextButton.setAttribute('aria-label', this.i18n.current === 'fr' ? 'Page suivante' : 'Next page');
    const theme = resolveDocumentTheme();
    const hoverTheme = theme === 'dark' ? 'light' : 'dark';
    const contrastedTheme = hoverTheme;
    this.applySvgButton(
      this.helpPrevButton,
      SECONDARY_NAV_ASSETS.left[contrastedTheme],
      this.i18n.current === 'fr' ? 'Page précédente' : 'Previous page',
      'game-hud__help-nav game-hud__help-nav--prev',
      SECONDARY_NAV_ASSETS.left[theme]
    );
    this.applySvgButton(
      this.helpNextButton,
      SECONDARY_NAV_ASSETS.right[contrastedTheme],
      this.i18n.current === 'fr' ? 'Page suivante' : 'Next page',
      'game-hud__help-nav game-hud__help-nav--next',
      SECONDARY_NAV_ASSETS.right[theme]
    );
    this.renderGameOverButtons();
    this.helpCloseButton.setAttribute('aria-label', this.i18n.current === 'fr' ? "Fermer l'aide" : 'Close help');
    this.applySvgButton(
      this.helpCloseButton,
      SECONDARY_NAV_ASSETS.close[contrastedTheme],
      this.i18n.current === 'fr' ? "Fermer l'aide" : 'Close help',
      'game-hud__help-close',
      SECONDARY_NAV_ASSETS.close[theme]
    );
    this.leaderboardNameInput.placeholder = this.i18n.t('gamePlayerName');
    this.applySvgButton(
      this.leaderboardSaveButton,
      SAVE_BUTTON_ASSETS[contrastedTheme],
      this.i18n.t('gameSaveScore'),
      'game-hud__leaderboard-save-button',
      SAVE_BUTTON_ASSETS[theme]
    );
    this.leaderboardRegisterCopy.textContent = this.i18n.t('gameRegisterScore');
    this.applySvgButton(
      this.avatarEditorSaveButton,
      SAVE_BUTTON_ASSETS[contrastedTheme],
      this.i18n.t('gameSaveAvatar'),
      'game-hud__avatar-editor-save-button',
      SAVE_BUTTON_ASSETS[theme]
    );
    this.applySvgButton(
      this.avatarEditorCloseButton,
      SECONDARY_NAV_ASSETS.close[theme],
      this.i18n.current === 'fr' ? "Fermer l'avatar" : 'Close avatar',
      'game-hud__avatar-editor-close',
      SECONDARY_NAV_ASSETS.close[hoverTheme]
    );
    this.bestDistanceLabel.textContent = this.i18n.t('gameBestDistance');
    this.walletIcon.title = this.i18n.t('gameCoins');
    this.renderSettingsButtons();
    this.renderAudioControls();
    this.renderAvatarEditor();
    this.renderAchievementsContent(this.currentAchievements, true);
    this.renderGameOverAchievementStrip(this.currentAchievements, this.currentRunSummary !== null, true);
    if (this.currentRunSummary) {
      this.currentGameOverSignature = '';
      this.currentGameOverRuleSrc = '';
      this.renderGameOverSummaryFromCurrentRun();
    } else {
      this.renderLeaderboard();
    }
  }

  private renderToastStack(
    toasts: Array<
      | { kind: 'achievement'; value: AchievementToastSnapshot }
      | { kind: 'acquisition'; value: AcquisitionFeedback }
    >,
    gameplayHudActive: boolean
  ) {
    if (!gameplayHudActive || toasts.length === 0) {
      this.toastStack.innerHTML = '';
      return;
    }

    this.toastStack.innerHTML = toasts
      .map((toast) => {
        if (toast.kind === 'achievement') {
          return `
            <div class="game-hud__toast is-visible" data-kind="achievement" data-rarity="${toast.value.rarity}" style="--toast-progress:${toast.value.progress.toFixed(3)}">
              <strong>${toast.value.name}</strong>
            </div>
          `;
        }

        const showCopy = toast.value.offer.item.kind !== 'passive';
        const label = showCopy ? this.i18n.t('gameAcquired') : '';
        const name = showCopy ? toast.value.offer.item.name[this.i18n.current] : '';
        const meta =
          toast.value.subtitle ??
          `${this.getRarityEmoji(toast.value.offer.item.rarity)} ${this.getRarityLabel(toast.value.offer.item.rarity)}`;
        return `
          <div class="game-hud__toast is-visible" data-kind="acquisition" data-rarity="${toast.value.offer.item.rarity}" style="--toast-progress:${toast.value.progress.toFixed(3)}">
            <img src="${toast.value.offer.item.hudIconSrc}" alt="" class="game-hud__toast-icon" />
            ${showCopy ? `<span>${label}</span><strong>${name}</strong>` : ''}
            <em>${meta}</em>
          </div>
        `;
      })
      .join('');
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
    const layouts = this.rewardBranchLayout.resolveMany(
      hints.map((offer) => ({
        slot: offer.slot,
        screenX: offer.screenX,
        screenY: offer.screenY,
        mode: offer.mode
      }))
    );

    this.branchCards.forEach((card, index) => {
      const offer = hints[index];
      if (!offer) {
        card.hidden = true;
        return;
      }

      card.hidden = false;
      card.dataset.rarity = offer.offer.item.rarity;
      card.dataset.slot = String(offer.slot);
      card.dataset.mode = offer.mode ?? 'reward_branch';
      const label = offer.mode === 'shop_orbit'
        ? ''
        : index === 0
          ? this.i18n.t('gamePathUpper')
          : index === 1
            ? this.i18n.t('gamePathForward')
            : this.i18n.t('gamePathLower');
      const layout = layouts[index] ?? this.rewardBranchLayout.resolve({
        slot: offer.slot,
        screenX: offer.screenX,
        screenY: offer.screenY,
        mode: offer.mode
      });
      card.style.left = `${layout.left}px`;
      card.style.top = `${layout.top}px`;
      card.style.setProperty('--branch-card-width', `${layout.width}px`);
      card.classList.toggle('is-compact', layout.compact);
      card.classList.toggle('is-shop-card', offer.mode === 'shop_orbit');
      const showRarity = offer.offer.item.kind === 'module';
      card.innerHTML = `
        <span class="game-hud__upgrade-media">
          <img src="${offer.offer.item.hudIconSrc}" alt="" class="game-hud__upgrade-icon-img" />
          ${showRarity ? `<img src="${offer.offer.item.rarityIconSrc}" alt="" class="game-hud__upgrade-rarity-icon" />` : ''}
        </span>
        ${showRarity ? `<span class="game-hud__upgrade-rarity">${this.getRarityLabel(offer.offer.item.rarity)}</span>` : ''}
        ${label ? `<span class="game-hud__upgrade-path-label">${label}</span>` : ''}
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
    coins = 0,
    shopCenter: { screenX: number; screenY: number } | null = null
  ) {
    const shopHints = hints.filter((hint) => hint.mode === 'shop_orbit');
    const theme = resolveDocumentTheme();
    const hoverTheme = theme === 'dark' ? 'light' : 'dark';
    const buyButtonSrc = getUIButtonAsset('buy', this.i18n.current, theme);
    const backButtonSrc = getUIButtonAsset('back', this.i18n.current, theme);
    this.shopButtons.forEach((button, index) => {
      const hint = shopHints[index];
      button.hidden = !hint;
      button.disabled = !hint;
      if (!hint) return;
      const affordable = (hint.price ?? 0) <= coins;
      button.disabled = !affordable;
      const showRarity = hint.offer.item.kind === 'module';
      const layout = this.rewardBranchLayout.resolve({
        slot: hint.slot,
        screenX: hint.screenX,
        screenY: hint.screenY,
        mode: 'shop_orbit'
      });
      const relatedCard = this.branchCards.find(
        (card) => card.dataset.slot === String(hint.slot) && card.dataset.mode === 'shop_orbit' && !card.hidden
      );
      const relatedCardRect = relatedCard?.getBoundingClientRect();
      const buttonHalfHeight = layout.compact ? 26 : 30;
      const buttonGap = layout.compact ? 12 : 16;
      const buttonCenterY = Math.round(
        Math.max(
          42,
          Math.min(
            window.innerHeight - 42,
            relatedCardRect ? relatedCardRect.bottom + buttonGap + buttonHalfHeight : layout.top + (layout.compact ? 124 : 146)
          )
        )
      );
      button.style.left = `${Math.round(layout.left)}px`;
      button.style.top = `${buttonCenterY}px`;
      button.className = 'game-hud__shop-buy-button';
      button.setAttribute('aria-label', this.i18n.current === 'fr' ? 'Acheter' : 'Buy');
      button.innerHTML = `
        <img src="${buyButtonSrc}" alt="" class="game-hud__shop-buy-button-bg" />
        <span class="game-hud__shop-buy-button-content">
          <span class="game-hud__shop-offer-media">
            <img src="${hint.offer.item.hudIconSrc}" alt="" class="game-hud__shop-offer-icon" />
            ${showRarity ? `<img src="${hint.offer.item.rarityIconSrc}" alt="" class="game-hud__shop-offer-rarity" />` : ''}
          </span>
          <em class="game-hud__shop-price"><span class="game-hud__coin-inline" aria-hidden="true" style="--wallet-coin-url:url('${COIN_ICON_URL}')"></span> × ${hint.price ?? 0}</em>
        </span>
      `;
      button.classList.toggle('is-disabled', !affordable);
    });
    this.applySvgButton(
      this.shopCloseButton,
      backButtonSrc,
      this.i18n.t('gameShopClose'),
      'game-hud__shop-close',
      getUIButtonAsset('back', this.i18n.current, hoverTheme)
    );
    if (shopCenter) {
      this.shopCloseButton.style.left = `${Math.round(shopCenter.screenX)}px`;
      this.shopCloseButton.style.top = `${Math.round(shopCenter.screenY)}px`;
    } else {
      this.shopCloseButton.style.left = '50%';
      this.shopCloseButton.style.top = '50%';
    }
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
    this.currentRunSummary = payload.runSummary;
    this.renderGameOverSummaryFromCurrentRun();
  }

  private renderGameOverSummaryFromCurrentRun() {
    const summary = this.currentRunSummary;
    if (!summary) {
      return;
    }
    const markup = buildGameOverSummaryMarkup({
      score: summary.score,
      summary,
      locale: this.i18n.current,
      t: (key) => this.i18n.t(key)
    });
    const revealSignature = this.getGameOverRevealSignature(summary);
    const isNewRun = revealSignature !== this.currentGameOverRevealSignature;
    const hasChanged = this.currentGameOverSignature !== markup.signature;
    if (hasChanged) {
      if (!this.currentGameOverRuleSrc || isNewRun) {
        const helpPages = this.getHelpPages(this.i18n.current);
        this.currentGameOverRuleSrc = helpPages.length > 0 ? helpPages[Math.floor(Math.random() * helpPages.length)]! : '';
        if (!this.currentGameOverRuleSrc) {
          void this.ensureHelpPagesLoaded(this.i18n.current).then((loadedPages) => {
            if (!this.currentRunSummary || loadedPages.length === 0 || this.currentGameOverRuleSrc) {
              return;
            }
            this.currentGameOverRuleSrc = loadedPages[Math.floor(Math.random() * loadedPages.length)] ?? '';
            if (this.currentGameOverRuleSrc) {
              this.renderGameOverSummaryFromCurrentRun();
            }
          });
        }
      }
      this.gameOverStats.innerHTML = markup.statsMarkup;
      this.gameOverStats.querySelectorAll<HTMLElement>('.game-hud__game-over-stat').forEach((element, index) => {
        element.style.setProperty('--game-over-stat-index', String(index));
      });
      this.gameOverEquipment.innerHTML = markup.equipmentMarkup;
      if (this.currentGameOverRuleSrc) {
        this.gameOverRuleImage.src = this.currentGameOverRuleSrc;
      }
    }
    if (isNewRun) {
      this.avatarEditorOpen = false;
      this.currentGameOverRevealSignature = revealSignature;
      this.scheduleGameOverRevealSounds(summary);
    }
    this.currentGameOverSignature = markup.signature;
    if (hasChanged) {
      void this.ensureLeaderboardLoaded({ rerender: !this.leaderboardLoaded });
      void this.ensureAvatarAssetsLoaded();
      this.renderLeaderboard();
      if (this.avatarEditorOpen) {
        this.renderAvatarEditor();
      }
    }
    this.updateLeaderboardSaveVisibility();
  }

  private getGameOverRevealSignature(summary: GameHUDPayload['runSummary']) {
    return [
      summary.score,
      Math.round(summary.distanceMeters),
      summary.shardsLanded,
      summary.coinsCollected,
      summary.enemiesKilled,
      Math.round(summary.longestMomentumSeconds * 10)
    ].join(':');
  }

  private clearGameOverRevealTimers() {
    this.gameOverRevealTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    this.gameOverRevealTimeouts = [];
  }

  private scheduleGameOverRevealSounds(summary: GameHUDPayload['runSummary']) {
    this.clearGameOverRevealTimers();
    const revealSteps = [
      summary.personalBests.score,
      summary.personalBests.distanceMeters,
      summary.personalBests.shardsLanded,
      summary.personalBests.coinsCollected,
      summary.personalBests.enemiesKilled,
      summary.personalBests.longestMomentumSeconds
    ];
    const baseDelayMs = 560;
    const stepDelayMs = 180;
    revealSteps.forEach((isRecord, index) => {
      const timeoutId = window.setTimeout(() => {
        this.callbacks.onGameOverStatReveal(Boolean(isRecord));
      }, baseDelayMs + index * stepDelayMs);
      this.gameOverRevealTimeouts.push(timeoutId);
    });
  }

  private renderGameOverMode(_cause: GameOverCause) {
    const theme = resolveDocumentTheme();
    this.gameOverRule.hidden = this.avatarEditorOpen || !this.currentGameOverRuleSrc;
    this.avatarEditor.hidden = !this.avatarEditorOpen;
    this.gameOverLeftColumn.classList.toggle('is-editor-open', this.avatarEditorOpen);
    this.gameOverStats.hidden = false;
    this.gameOverEquipment.hidden = false;
    this.leaderboardPanel.hidden = false;
    this.gameOverHeaderImage.src = GAME_OVER_HEADER_ASSETS[theme];
    this.gameOverHeaderOverlay.hidden = false;
    this.gameOverTitle.textContent = '';
    this.gameOverBody.textContent = '';
    this.gameOverTitle.hidden = true;
    this.gameOverBody.hidden = true;
    this.renderGameOverAchievementStrip(this.currentAchievements, !this.gameOverOverlay.hidden, true);
    this.renderGameOverButtons();
  }

  private renderLandingFeedback(
    feedback: {
      serial: number;
      grade: LandingGrade;
      twist: boolean;
      progress: number;
      screenX: number;
      screenY: number;
    } | null
  ) {
    this.landingFeedbackDisplay.update(
      feedback
        ? {
            serial: feedback.serial,
            grade: feedback.grade,
            twist: feedback.twist,
            progress: feedback.progress,
            screenX: feedback.screenX,
            screenY: feedback.screenY,
            gradeLabel: this.getLandingGradeLabel(feedback.grade),
            twistLabel: this.i18n.t('gameLandingTwist')
          }
        : null
    );
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

  private isFullscreenActive() {
    const fullscreenDocument = document as BrowserFullscreenDocument;
    return Boolean(document.fullscreenElement || fullscreenDocument.webkitFullscreenElement);
  }

  private isFullscreenEnabled() {
    const fullscreenDocument = document as BrowserFullscreenDocument;
    const fullscreenElement = document.documentElement as BrowserFullscreenElement;
    return Boolean(
      document.fullscreenEnabled ||
      fullscreenDocument.webkitFullscreenEnabled ||
      fullscreenElement.requestFullscreen ||
      fullscreenElement.webkitRequestFullscreen
    );
  }

  private async toggleFullscreen() {
    const fullscreenDocument = document as BrowserFullscreenDocument;
    const fullscreenElement = document.documentElement as BrowserFullscreenElement;
    try {
      if (this.isFullscreenActive()) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (fullscreenDocument.webkitExitFullscreen) {
          await fullscreenDocument.webkitExitFullscreen();
        }
      } else if (fullscreenElement.requestFullscreen) {
        await fullscreenElement.requestFullscreen({ navigationUI: 'hide' });
      } else if (fullscreenElement.webkitRequestFullscreen) {
        await fullscreenElement.webkitRequestFullscreen();
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      this.renderSettingsButtons();
    }
  }

  private renderSettingsButtons() {
    const languageAsset = LANGUAGE_BUTTON_ASSETS[this.i18n.current];
    const theme = resolveDocumentTheme();
    const themeLabel = theme === 'dark' ? (this.i18n.current === 'fr' ? 'Mode sombre' : 'Dark theme') : (this.i18n.current === 'fr' ? 'Mode clair' : 'Light theme');
    const languageLabel = this.i18n.current === 'fr' ? 'Changer la langue' : 'Change language';
    const helpLabel = this.i18n.current === 'fr' ? 'Ouvrir l’aide' : 'Open help';

    this.settingsHelpButton.className = 'game-hud__settings-chip game-hud__settings-chip--help';
    this.settingsHelpButton.setAttribute('aria-label', helpLabel);
    this.settingsHelpButton.innerHTML = `<img class="game-hud__settings-theme-icon" src="${HELP_ICON_ASSETS[theme]}" alt="" />`;

    this.settingsLanguageButton.className = 'game-hud__settings-chip game-hud__settings-chip--language';
    this.settingsLanguageButton.setAttribute('aria-label', languageLabel);
    this.settingsLanguageButton.innerHTML = `<img class="game-hud__settings-language-icon" src="${languageAsset}" alt="" />`;

    this.settingsThemeButton.className = `game-hud__settings-chip game-hud__settings-chip--theme is-${theme}-theme`;
    this.settingsThemeButton.setAttribute('aria-label', themeLabel);
    this.settingsThemeButton.innerHTML = `<img class="game-hud__settings-theme-icon" src="${THEME_TOGGLE_ASSETS[theme]}" alt="" />`;

    const fullscreenSupported = this.isFullscreenEnabled();
    if (!fullscreenSupported) {
      this.settingsFullscreenButton.hidden = true;
    } else {
      const fullscreenActive = this.isFullscreenActive();
      const fullscreenLabel = fullscreenActive
        ? (this.i18n.current === 'fr' ? 'Quitter plein écran' : 'Exit fullscreen')
        : (this.i18n.current === 'fr' ? 'Plein écran' : 'Fullscreen');
      const fullscreenSrc = fullscreenActive ? FULLSCREEN_BUTTON_ASSETS.on[theme] : FULLSCREEN_BUTTON_ASSETS.off[theme];
      this.settingsFullscreenButton.hidden = false;
      this.settingsFullscreenButton.className = 'game-hud__settings-chip game-hud__settings-chip--fullscreen';
      this.settingsFullscreenButton.setAttribute('aria-label', fullscreenLabel);
      this.settingsFullscreenButton.setAttribute('aria-pressed', fullscreenActive ? 'true' : 'false');
      this.settingsFullscreenButton.innerHTML = `<img class="game-hud__settings-fullscreen-icon" src="${fullscreenSrc}" alt="" />`;
    }
  }

  private renderAudioControls() {
    const muteLabel = this.audioMuted ? this.i18n.t('gameUnmute') : this.i18n.t('gameMute');
    const theme = resolveDocumentTheme();
    this.settingsMuteButton.className = `game-hud__settings-chip game-hud__settings-chip--mute${this.audioMuted ? ' is-muted' : ''}`;
    this.settingsMuteButton.setAttribute('aria-label', muteLabel);
    this.settingsMuteButton.innerHTML = this.audioMuted
      ? `<img class="game-hud__settings-sound-off-icon" src="${SOUND_BUTTON_ASSETS.off[theme]}" alt="" />`
      : `<img class="game-hud__settings-sound-on-icon" src="${SOUND_BUTTON_ASSETS.on[theme]}" alt="" />`;
    this.settingsVolumeLabel.textContent = '';
    this.settingsVolumeValue.textContent = '';
    this.settingsVolumeButton.setAttribute('aria-label', this.i18n.t('gameAudio'));
    this.settingsVolumeButton.style.setProperty('--sound-volume-ratio', this.audioVolume.toFixed(3));
    this.settingsVolumeMeter.style.setProperty('--sound-ui-sprite', `url('${SOUND_BUTTON_ASSETS.sprite}')`);
    this.settingsVolumeMeterFill.style.setProperty('--sound-ui-sprite', `url('${SOUND_BUTTON_ASSETS.sprite}')`);
    this.settingsVolumeMeter.classList.toggle('is-muted', this.audioMuted);
  }

  private renderAchievementsButton() {
    const theme = resolveDocumentTheme();
    this.achievementsButton.className = `game-hud__settings-toggle game-hud__settings-toggle--achievement${this.achievementsOpen ? ' is-active' : ''}`;
    this.achievementsButton.setAttribute('aria-label', this.i18n.t('gameAchievementsOpen'));
    this.achievementsButton.setAttribute('aria-pressed', this.achievementsOpen ? 'true' : 'false');
    this.achievementsButton.innerHTML = `<img class="game-hud__settings-toggle-icon" src="${ACHIEVEMENT_ICON_ASSETS[theme]}" alt="" />`;
  }

  private toggleAchievements(force?: boolean) {
    const nextOpen = force ?? !this.achievementsOpen;
    if (nextOpen) {
      this.openAchievements();
      return;
    }
    this.closeAchievements();
  }

  private openAchievements() {
    this.closeHelp();
    this.topRightCluster.toggle(false);
    this.achievementSortMenuOpen = false;
    this.achievementsOpen = true;
    this.achievementsOverlay.hidden = false;
    this.achievementsOverlay.classList.add('is-visible');
    this.achievementsOverlay.inert = false;
    this.achievementsOverlay.setAttribute('aria-hidden', 'false');
    void this.ensureAvatarAssetsLoaded().then(() => this.renderAchievementsContent(this.currentAchievements, true));
    this.renderAchievementsButton();
  }

  private closeAchievements() {
    this.achievementSortMenuOpen = false;
    this.achievementsOpen = false;
    this.achievementsOverlay.hidden = true;
    this.achievementsOverlay.classList.remove('is-visible');
    this.achievementsOverlay.inert = true;
    this.achievementsOverlay.setAttribute('aria-hidden', 'true');
    this.renderAchievementsButton();
  }

  private renderAchievementsContent(snapshot: AchievementPanelSnapshot, force = false) {
    const theme = resolveDocumentTheme();
    const hoverTheme = theme === 'dark' ? 'light' : 'dark';
    this.applySvgButton(
      this.achievementsCloseButton,
      SECONDARY_NAV_ASSETS.close[theme],
      this.i18n.t('gameAchievementsClose'),
      'game-hud__achievements-close',
      SECONDARY_NAV_ASSETS.close[hoverTheme]
    );
    if (!force && snapshot.serial === this.renderedAchievementsSerial) {
      return;
    }

    const completionRatio = snapshot.summary.totalCount > 0 ? snapshot.summary.unlockedCount / snapshot.summary.totalCount : 0;
    this.achievementsSummary.innerHTML = [
      { label: this.i18n.t('gameAchievementsUnlocked'), value: `${snapshot.summary.unlockedCount} / ${snapshot.summary.totalCount}` },
      { label: this.i18n.t('gameAchievementsRewards'), value: `${snapshot.summary.rewardsUnlocked}` },
      { label: this.i18n.t('gameAchievementsHidden'), value: `${snapshot.summary.hiddenRemaining}` },
      { label: this.i18n.t('gameAchievementsProgress'), value: `${Math.round(completionRatio * 100)}%` }
    ]
      .map(
        (item) => `
          <div class="game-hud__achievement-summary-stat">
            <span class="game-hud__achievement-summary-label">${item.label}</span>
            <div class="game-hud__achievement-summary-pill">
              <strong>${item.value}</strong>
            </div>
          </div>
        `
      )
      .join('');
    this.renderAchievementsControls();

    const visibleEntries = this.getVisibleAchievementEntries(snapshot.entries);
    if (visibleEntries.length === 0) {
      this.achievementsScroll.innerHTML = `<div class="game-hud__achievements-empty">${this.i18n.t('gameAchievementsNoMatches')}</div>`;
      this.renderedAchievementsSerial = snapshot.serial;
      return;
    }

    this.achievementsScroll.innerHTML = `
      <section class="game-hud__achievement-section">
        ${visibleEntries.map((entry) => this.renderAchievementCard(entry)).join('')}
      </section>
    `;
    this.renderedAchievementsSerial = snapshot.serial;
  }

  private renderAchievementsControls() {
    const filterOptions: Array<{ value: AchievementFilterValue; label: string; icon?: string }> = [
      { value: 'all', label: this.i18n.t('gameAchievementsAll') },
      { value: 'common', label: this.getAchievementRarityLabel('common'), icon: ACHIEVEMENT_RARITY_ICON_ASSETS.common },
      { value: 'uncommon', label: this.getAchievementRarityLabel('uncommon'), icon: ACHIEVEMENT_RARITY_ICON_ASSETS.uncommon },
      { value: 'rare', label: this.getAchievementRarityLabel('rare'), icon: ACHIEVEMENT_RARITY_ICON_ASSETS.rare },
      { value: 'epic', label: this.getAchievementRarityLabel('epic'), icon: ACHIEVEMENT_RARITY_ICON_ASSETS.epic },
      { value: 'legendary', label: this.getAchievementRarityLabel('legendary'), icon: ACHIEVEMENT_RARITY_ICON_ASSETS.legendary }
    ];
    const sortOptions: Array<{ value: AchievementSortMode; label: string }> = [
      { value: 'acquired', label: this.i18n.t('gameAchievementsSortAcquired') },
      { value: 'rarity', label: this.i18n.t('gameAchievementsSortRarity') },
      { value: 'unlocked', label: this.i18n.t('gameAchievementsSortUnlocked') },
      { value: 'locked', label: this.i18n.t('gameAchievementsLocked') }
    ];
    const activeSortLabel =
      sortOptions.find((option) => option.value === this.achievementSortMode)?.label ?? this.i18n.t('gameAchievementsSortRarity');
    this.achievementsControls.innerHTML = `
      <div class="game-hud__achievement-sort-shell">
        <button type="button" class="game-hud__achievement-sort-toggle${this.achievementSortMenuOpen ? ' is-open' : ''}" data-achievement-sort-toggle>
          <span>${activeSortLabel}</span>
        </button>
        <div class="game-hud__achievement-sort-menu${this.achievementSortMenuOpen ? ' is-open' : ''}">
          ${sortOptions
            .map(
              (option) => `
                <button
                  type="button"
                  class="game-hud__achievement-sort-option${option.value === this.achievementSortMode ? ' is-active' : ''}"
                  data-achievement-sort-option="${option.value}"
                >
                  ${option.label}
                </button>
              `
            )
            .join('')}
        </div>
      </div>
      <div class="game-hud__achievement-filter-row">
        ${filterOptions
          .map(
            (option) => `
              <button
                type="button"
                class="game-hud__achievement-filter${this.achievementFilter === option.value ? ' is-active' : ''}"
                data-achievement-filter="${option.value}"
              >
                ${option.icon ? `<img src="${option.icon}" alt="" class="game-hud__achievement-filter-icon" />` : ''}
                <span>${option.label}</span>
              </button>
            `
          )
          .join('')}
      </div>
    `;
  }

  private getVisibleAchievementEntries(entries: AchievementEntrySnapshot[]) {
    const filtered = this.achievementFilter === 'all'
      ? [...entries]
      : entries.filter((entry) => entry.rarity === this.achievementFilter);
    const rarityRank = (rarity: AchievementRarity) => {
      if (rarity === 'legendary') return 4;
      if (rarity === 'epic') return 3;
      if (rarity === 'rare') return 2;
      if (rarity === 'uncommon') return 1;
      return 0;
    };
    const compareMystery = (left: AchievementEntrySnapshot, right: AchievementEntrySnapshot) => {
      const mysteryDelta = Number(left.mystery) - Number(right.mystery);
      if (mysteryDelta !== 0) {
        return mysteryDelta;
      }
      return 0;
    };

    if (this.achievementSortMode === 'acquired') {
      return filtered.sort((left, right) =>
        compareMystery(left, right) ||
        Number(right.unlocked) - Number(left.unlocked) ||
        (right.unlockOrder ?? -1) - (left.unlockOrder ?? -1) ||
        rarityRank(right.rarity) - rarityRank(left.rarity) ||
        left.name.localeCompare(right.name, this.i18n.current)
      );
    }

    if (this.achievementSortMode === 'unlocked') {
      return filtered
        .filter((entry) => entry.unlocked)
        .sort(
          (left, right) =>
            compareMystery(left, right) ||
            (right.unlockOrder ?? -1) - (left.unlockOrder ?? -1) ||
            left.name.localeCompare(right.name, this.i18n.current)
        );
    }

    if (this.achievementSortMode === 'locked') {
      return filtered
        .filter((entry) => !entry.unlocked)
        .sort(
          (left, right) =>
            compareMystery(left, right) ||
            rarityRank(right.rarity) - rarityRank(left.rarity) ||
            left.name.localeCompare(right.name, this.i18n.current)
        );
    }

    return filtered.sort(
      (left, right) =>
        compareMystery(left, right) ||
        rarityRank(right.rarity) - rarityRank(left.rarity) ||
        left.name.localeCompare(right.name, this.i18n.current)
    );
  }

  private renderAchievementCard(entry: AchievementPanelSnapshot['entries'][number]) {
    const progressLabel =
      entry.target !== null
        ? `${Math.min(entry.progress, entry.target)} / ${entry.target}`
        : entry.unlocked
          ? this.i18n.t('gameAchievementsUnlocked')
          : this.i18n.t('gameAchievementsLocked');
    const rarityIcon = ACHIEVEMENT_RARITY_ICON_ASSETS[entry.rarity];
    const titleLabel = entry.mystery ? '???' : entry.name;
    const descriptionLabel = entry.mystery ? '???' : entry.description;
    const asideMarkup = entry.reward
      ? `<div class="game-hud__achievement-reward">${this.renderAchievementReward(entry.reward, entry.rarity)}</div>`
      : entry.mystery
        ? `
          <div class="game-hud__achievement-reward game-hud__achievement-reward--mystery">
            <span class="game-hud__achievement-reward-preview game-hud__achievement-reward-preview--mystery" data-rarity="${entry.rarity}">
              <img src="${HELP_ICON_ASSETS[resolveDocumentTheme()]}" alt="" class="game-hud__achievement-mystery-icon" />
            </span>
          </div>
        `
        : '';

    return `
      <article class="game-hud__achievement-card${entry.unlocked ? ' is-unlocked' : ''}${entry.mystery ? ' is-mystery' : ''}${asideMarkup ? ' has-aside' : ''}" data-rarity="${entry.rarity}">
        <div class="game-hud__achievement-copy">
          <div class="game-hud__achievement-line game-hud__achievement-line--title">
            <span class="game-hud__achievement-title-group">
              <img
                src="${entry.mystery ? HELP_ICON_ASSETS[resolveDocumentTheme()] : rarityIcon}"
                alt="${entry.mystery ? this.i18n.t('gameAchievementsMystery') : entry.rarityLabel}"
                class="game-hud__achievement-rarity-icon"
              />
              <strong class="game-hud__achievement-name">${titleLabel}</strong>
            </span>
          </div>
          <p class="game-hud__achievement-line game-hud__achievement-line--objective">${descriptionLabel}</p>
          <div class="game-hud__achievement-line game-hud__achievement-line--progress">
            <span>${progressLabel}</span>
          </div>
        </div>
        ${asideMarkup}
      </article>
    `;
  }

  private renderAchievementReward(reward: AchievementRewardSnapshot, rarity: AchievementPanelSnapshot['entries'][number]['rarity']) {
    const unlockMarkup = reward.unlocks
      .map((unlock) => {
        const assetSrc = this.avatarLayerSets[unlock.layer][unlock.index] ?? '';
        return `
          <span class="game-hud__achievement-reward-asset" data-layer="${unlock.layer}">
            <span class="game-hud__achievement-reward-preview" data-rarity="${rarity}">
              ${assetSrc ? `<img src="${assetSrc}" alt="" class="game-hud__achievement-reward-image" />` : ''}
            </span>
          </span>
        `;
      })
      .join('');

    return `
      <div class="game-hud__achievement-reward-assets">
        ${unlockMarkup}
      </div>
    `;
  }

  private renderGameOverAchievementStrip(snapshot: AchievementPanelSnapshot, visible: boolean, force = false) {
    const runUnlocks = snapshot.profile.runUnlockedAchievements.slice(-4);
    if (!visible || this.avatarEditorOpen || runUnlocks.length === 0) {
      this.gameOverAchievements.hidden = true;
      if (force) {
        this.gameOverAchievements.innerHTML = '';
      }
      return;
    }
    const runUnlockSignature = runUnlocks.map((entry) => entry.id).join(':');
    if (!force && this.gameOverAchievements.dataset.serial === runUnlockSignature) {
      this.gameOverAchievements.hidden = false;
      return;
    }
    this.gameOverAchievements.dataset.serial = runUnlockSignature;
    this.gameOverAchievements.hidden = false;
    this.gameOverAchievements.innerHTML = runUnlocks
      .map(
        (entry) => `
          <span class="game-hud__game-over-achievement-pill" data-rarity="${entry.rarity}">
            ${entry.name}
          </span>
        `
      )
      .join('');
  }

  private getRarityEmoji(rarity: RogueliteRarity) {
    if (rarity === 'legendary') return '🟡';
    if (rarity === 'epic') return '🟣';
    if (rarity === 'rare') return '🔵';
    if (rarity === 'uncommon') return '🟢';
    return '⚪';
  }

  private getAchievementRarityLabel(rarity: AchievementRarity) {
    if (rarity === 'legendary') {
      return this.i18n.current === 'fr' ? 'Légendaire' : 'Legendary';
    }
    if (rarity === 'epic') {
      return 'Epic';
    }
    if (rarity === 'rare') {
      return 'Rare';
    }
    if (rarity === 'uncommon') {
      return this.i18n.current === 'fr' ? 'Peu commun' : 'Uncommon';
    }
    return this.i18n.current === 'fr' ? 'Commun' : 'Common';
  }

  consumeEscapeOverlay() {
    if (this.achievementSortMenuOpen) {
      this.achievementSortMenuOpen = false;
      this.renderAchievementsContent(this.currentAchievements, true);
      return true;
    }
    if (this.achievementsOpen) {
      this.closeAchievements();
      return true;
    }
    if (this.helpOpen) {
      this.closeHelp();
      return true;
    }
    return false;
  }

  private openHelp(locale: 'fr' | 'en') {
    this.helpLocale = locale;
    this.helpOpen = true;
    this.helpPageIndex = 0;
    this.helpOverlay.hidden = false;
    this.helpOverlay.classList.add('is-visible');
    this.helpOverlay.inert = false;
    this.helpOverlay.setAttribute('aria-hidden', 'false');
    this.topRightCluster.toggle(false);
    const pages = this.getHelpPages(locale);
    if (pages.length > 0) {
      this.renderHelpPages();
      this.setHelpPage(0);
      return;
    }

    this.renderHelpLoadingState();
    void this.ensureHelpPagesLoaded(locale).then((loadedPages) => {
      if (!this.helpOpen || this.helpLocale !== locale) {
        return;
      }
      if (loadedPages.length === 0) {
        this.closeHelp();
        return;
      }
      this.renderHelpPages();
      this.setHelpPage(0);
    });
  }

  private closeHelp() {
    this.helpOpen = false;
    this.helpOverlay.hidden = true;
    this.helpOverlay.classList.remove('is-visible');
    this.helpOverlay.inert = true;
    this.helpOverlay.setAttribute('aria-hidden', 'true');
    this.helpPointerStartX = null;
  }

  private getHelpPages(locale: 'fr' | 'en') {
    return this.helpPagesCache.get(this.getHelpCacheKey(locale)) ?? [];
  }

  private renderHelpPages() {
    const pages = this.getHelpPages(this.helpLocale);
    if (pages.length === 0) {
      this.renderHelpLoadingState();
      return;
    }
    this.helpTrack.innerHTML = pages
      .map(
        (src, index) => `
          <div class="game-hud__help-page" data-help-page="${index}">
            <img src="${src}" alt="" class="game-hud__help-image" />
          </div>
        `
      )
      .join('');
  }

  private renderHelpLoadingState() {
    const loadingLabel = this.i18n.current === 'fr' ? 'Chargement…' : 'Loading…';
    this.helpTrack.innerHTML = `
      <div class="game-hud__help-page game-hud__help-page--loading" data-help-page="0">
        <div class="game-hud__help-loading">${loadingLabel}</div>
      </div>
    `;
    this.helpCounter.textContent = '…';
    this.helpPrevButton.disabled = true;
    this.helpNextButton.disabled = true;
  }

  private setHelpPage(index: number) {
    const pages = this.getHelpPages(this.helpLocale);
    if (pages.length === 0) {
      this.renderHelpLoadingState();
      return;
    }

    const newIndex = Math.max(0, Math.min(index, pages.length - 1));
    const previousIndex = this.helpPageIndex;
    const direction = newIndex > previousIndex ? 'next' : 'prev';

    if (this.helpPageTransitionTimeout !== null) {
      window.clearTimeout(this.helpPageTransitionTimeout);
      this.helpPageTransitionTimeout = null;
    }

    const previousPage = this.helpTrack.querySelector<HTMLDivElement>(`[data-help-page="${previousIndex}"]`);
    const nextPage = this.helpTrack.querySelector<HTMLDivElement>(`[data-help-page="${newIndex}"]`);

    const clearTransitionClasses = (page: HTMLElement | null) => {
      page?.classList.remove(
        'is-flipping-out-next',
        'is-flipping-out-prev',
        'is-flipping-in-next',
        'is-flipping-in-prev'
      );
    };

    const clearAllTransitionClasses = () => {
      this.helpTrack.querySelectorAll<HTMLElement>('.is-flipping-out-next, .is-flipping-out-prev, .is-flipping-in-next, .is-flipping-in-prev').forEach((page) => {
        page.classList.remove(
          'is-flipping-out-next',
          'is-flipping-out-prev',
          'is-flipping-in-next',
          'is-flipping-in-prev'
        );
      });
    };

    clearAllTransitionClasses();

    if (previousPage && nextPage && previousIndex !== newIndex) {
      previousPage.classList.remove('is-active');
      previousPage.classList.add(`is-flipping-out-${direction}`);
      nextPage.classList.add('is-active', `is-flipping-in-${direction}`);

      this.helpPageTransitionTimeout = window.setTimeout(() => {
        clearTransitionClasses(previousPage);
        clearTransitionClasses(nextPage);
        this.helpPageTransitionTimeout = null;
      }, 680);
    } else if (nextPage) {
      nextPage.classList.add('is-active');
    }

    this.helpPageIndex = newIndex;
    this.helpCounter.textContent = `${this.helpPageIndex + 1} / ${pages.length}`;
    this.helpPrevButton.disabled = this.helpPageIndex <= 0;
    this.helpNextButton.disabled = this.helpPageIndex >= pages.length - 1;
  }

  private renderGameOverButtons() {
    const theme = resolveDocumentTheme();
    const hoverTheme = theme === 'dark' ? 'light' : 'dark';
    this.applySvgButton(
      this.restartButton,
      getUIButtonAsset('restart', this.i18n.current, theme),
      this.i18n.t('gameRestart'),
      '',
      getUIButtonAsset('restart', this.i18n.current, hoverTheme)
    );
    this.applySvgButton(
      this.returnButton,
      getUIButtonAsset('hub', this.i18n.current, theme),
      this.i18n.t('gameMainMenu'),
      '',
      getUIButtonAsset('hub', this.i18n.current, hoverTheme)
    );
  }

  private applySvgButton(button: HTMLButtonElement, src: string, label: string, extraClass = '', hoverSrc?: string) {
    button.className = `game-hud__svg-button ${extraClass}`.trim();
    button.setAttribute('aria-label', label);
    button.innerHTML = this.renderSwapIconMarkup(src, hoverSrc ?? src, 'game-hud__svg-button-image');
  }

  private renderSwapIconMarkup(src: string, hoverSrc: string, className: string) {
    const rootClass = className.split(/\s+/)[0] ?? className;
    return `
      <span class="${className} ${rootClass}--base" aria-hidden="true"><img src="${src}" alt="" /></span>
      <span class="${className} ${rootClass}--hover" aria-hidden="true"><img src="${hoverSrc}" alt="" /></span>
    `;
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

  private async saveLeaderboardEntry() {
    if (!this.currentGameOverSignature || !this.currentRunSummary) {
      return;
    }
    const name = this.getLeaderboardPlayerName();
    window.localStorage.setItem(PLAYER_NAME_KEY, name);
    if (!name.trim()) {
      return;
    }
    const entries = this.readLeaderboard();
    const entry = this.buildCurrentLeaderboardEntry(name);
    const existingIndex = entries.findIndex((candidate) => this.isCurrentPlayerEntry(candidate, name));
    const existingEntry = existingIndex >= 0 ? entries[existingIndex] : null;
    if (existingEntry && existingEntry.score >= entry.score) {
      this.renderLeaderboard();
      return;
    }
    this.leaderboardSyncState = 'saving';
    this.leaderboardSaveButton.disabled = true;
    try {
      const response = await fetch(LEADERBOARD_API_PATH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ entry })
      });
      if (!response.ok) {
        throw new Error(`Leaderboard save failed with status ${response.status}`);
      }
      const payload = (await response.json()) as { entries?: unknown[] };
      const nextEntries = this.normalizeLeaderboardEntries(payload.entries);
      this.leaderboardEntriesCache = nextEntries;
      this.persistLeaderboardCache(nextEntries);
    } catch (error) {
      console.warn('[GameHUDSystem] Failed to save leaderboard entry remotely, falling back to local cache.', error);
      if (existingIndex >= 0) {
        entries.splice(existingIndex, 1, { ...entry, recordedAt: Date.now() });
      } else {
        entries.push(entry);
      }
      const fallbackEntries = this.normalizeLeaderboardEntries(entries);
      this.leaderboardEntriesCache = fallbackEntries;
      this.persistLeaderboardCache(fallbackEntries);
      this.leaderboardSyncState = 'error';
    }
    this.lastSavedGameOverSignature = this.currentGameOverSignature;
    this.leaderboardSyncState = 'idle';
    this.renderLeaderboard();
  }

  private readLeaderboard(): LeaderboardEntry[] {
    return this.leaderboardEntriesCache;
  }

  private readLocalLeaderboardCache() {
    const raw = window.localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) {
      return [];
    }
    try {
      return this.normalizeLeaderboardEntries(JSON.parse(raw) as unknown[]);
    } catch {
      return [];
    }
  }

  private persistLeaderboardCache(entries: LeaderboardEntry[]) {
    window.localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries.slice(0, 100)));
  }

  private normalizeLeaderboardEntries(entries: unknown) {
    if (!Array.isArray(entries)) {
      return [];
    }
    const deduped = new Map<string, LeaderboardEntry>();
    entries
      .map((entry) => {
        const value = entry as Partial<LeaderboardEntry>;
        return {
          playerId: typeof value.playerId === 'string' && value.playerId.trim() ? value.playerId.trim() : undefined,
          name: typeof value.name === 'string' && value.name.trim() ? value.name.trim().slice(0, 18) : this.i18n.t('gameAnonymous'),
          score: Number(value.score) || 0,
          recordedAt: Number(value.recordedAt) || Date.now(),
          avatar: this.normalizeAvatarSelection(value.avatar, typeof value.name === 'string' ? value.name : undefined),
          details: value.details
            ? {
                distanceMeters: Number(value.details.distanceMeters) || 0,
                shardsLanded: Number(value.details.shardsLanded) || 0,
                coinsCollected: Number(value.details.coinsCollected) || 0,
                enemiesKilled: Number(value.details.enemiesKilled) || 0,
                longestMomentumSeconds: Number(value.details.longestMomentumSeconds) || 0
              }
            : undefined
        } satisfies LeaderboardEntry;
      })
      .forEach((entry) => {
        const key = this.getLeaderboardEntryIdentity(entry);
        const existing = deduped.get(key);
        if (!existing || entry.score > existing.score || (entry.score === existing.score && entry.recordedAt < existing.recordedAt)) {
          deduped.set(key, entry);
        }
      });
    return [...deduped.values()].sort((a, b) => b.score - a.score || a.recordedAt - b.recordedAt);
  }

  private async refreshLeaderboard(options?: { rerender?: boolean }) {
    const requestSerial = ++this.leaderboardRequestSerial;
    this.leaderboardSyncState = 'loading';
    try {
      const response = await fetch(LEADERBOARD_API_PATH, {
        headers: {
          Accept: 'application/json'
        },
        cache: 'no-store'
      });
      if (!response.ok) {
        throw new Error(`Leaderboard fetch failed with status ${response.status}`);
      }
      const payload = (await response.json()) as { entries?: unknown[] };
      if (requestSerial !== this.leaderboardRequestSerial) {
        return;
      }
      const nextEntries = this.normalizeLeaderboardEntries(payload.entries);
      this.leaderboardEntriesCache = nextEntries;
      this.persistLeaderboardCache(nextEntries);
      this.leaderboardSyncState = 'idle';
      if (options?.rerender) {
        this.renderLeaderboard();
      }
    } catch (error) {
      console.warn('[GameHUDSystem] Failed to refresh leaderboard from shared API, using local cache.', error);
      if (requestSerial !== this.leaderboardRequestSerial) {
        return;
      }
      this.leaderboardEntriesCache = this.readLocalLeaderboardCache();
      this.leaderboardSyncState = 'error';
      if (options?.rerender) {
        this.renderLeaderboard();
      }
    }
  }

  private renderLeaderboard() {
    const entries = this.readLeaderboard().slice(0, 100);
    const filledEntries: Array<LeaderboardEntry | null> =
      entries.length >= 100 ? [...entries] : [...entries, ...Array.from({ length: 100 - entries.length }, () => null)];
    this.renderedLeaderboardEntries = filledEntries;
    this.leaderboardList.innerHTML = filledEntries
      .map((entry, index) => {
        const fallbackAvatar = this.renderAvatarMarkup(
          this.normalizeAvatarSelection(undefined, `leaderboard-slot-${index + 1}`),
          'game-hud__leaderboard-avatar-stack'
        );
        return entry
          ? `
            <div class="game-hud__leaderboard-row" data-leaderboard-row data-entry-index="${index}" data-rank-tier="${this.getLeaderboardRankTier(index)}" style="--leaderboard-row-index:${index}">
              <span class="game-hud__leaderboard-rank">#${index + 1}</span>
              <button type="button" class="game-hud__leaderboard-avatar" data-avatar-trigger aria-label="${entry.name}" title="${this.getLeaderboardEntryTitle(entry)}">
                ${this.renderAvatarMarkup(this.resolveAvatarSelection(entry), 'game-hud__leaderboard-avatar-stack')}
              </button>
              <span class="game-hud__leaderboard-copy">
                <strong class="game-hud__leaderboard-name">${entry.name}</strong>
              </span>
              <span class="game-hud__leaderboard-score">${entry.score}</span>
            </div>
          `
          : `
            <div class="game-hud__leaderboard-row is-placeholder" data-leaderboard-row data-rank-tier="other" style="--leaderboard-row-index:${index}">
              <span class="game-hud__leaderboard-rank">#${index + 1}</span>
              <button type="button" class="game-hud__leaderboard-avatar" data-avatar-trigger aria-label="???" title="???">
                ${fallbackAvatar}
              </button>
              <span class="game-hud__leaderboard-copy">
                <strong class="game-hud__leaderboard-name">???</strong>
              </span>
              <span class="game-hud__leaderboard-score">???</span>
            </div>
          `
      })
      .join('');
    this.hideLeaderboardHover();
    this.renderLeaderboardPreview(entries);
    this.updateLeaderboardSaveVisibility();
  }

  private getLeaderboardEntryTitle(entry: LeaderboardEntry) {
    const distance = Math.max(0, Math.round(entry.details?.distanceMeters ?? 0));
    const coins = Math.max(0, Math.round(entry.details?.coinsCollected ?? 0));
    const enemies = Math.max(0, Math.round(entry.details?.enemiesKilled ?? 0));
    return `${entry.name} · ${entry.score} · D ${distance} · C ${coins} · M ${enemies}`;
  }

  private getLeaderboardRankTier(index: number) {
    if (index === 0) return 'first';
    if (index === 1) return 'second';
    if (index === 2) return 'third';
    return 'other';
  }

  private getLeaderboardPlayerName() {
    return (this.leaderboardNameInput.value.trim() || this.i18n.t('gameAnonymous')).slice(0, 18);
  }

  private buildCurrentLeaderboardEntry(name = this.getLeaderboardPlayerName()): LeaderboardEntry {
    return {
      playerId: this.getLeaderboardPlayerId(),
      name,
      score: this.currentRunSummary?.score ?? 0,
      recordedAt: Date.now(),
      avatar: { ...this.playerAvatarSelection },
      details: {
        distanceMeters: this.currentRunSummary?.distanceMeters ?? 0,
        shardsLanded: this.currentRunSummary?.shardsLanded ?? 0,
        coinsCollected: this.currentRunSummary?.coinsCollected ?? 0,
        enemiesKilled: this.currentRunSummary?.enemiesKilled ?? 0,
        longestMomentumSeconds: this.currentRunSummary?.longestMomentumSeconds ?? 0
      }
    };
  }

  private normalizeLeaderboardName(name: string) {
    return name.trim().toLocaleLowerCase(this.i18n.current === 'fr' ? 'fr-FR' : 'en-US');
  }

  private getLeaderboardPlayerId() {
    const existing = window.localStorage.getItem(PLAYER_ID_KEY)?.trim();
    if (existing) {
      return existing;
    }
    const nextId =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `player-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(PLAYER_ID_KEY, nextId);
    return nextId;
  }

  private getLeaderboardEntryIdentity(entry: Pick<LeaderboardEntry, 'playerId' | 'name'>) {
    return entry.playerId?.trim() || `legacy:${this.normalizeLeaderboardName(entry.name)}`;
  }

  private isCurrentPlayerEntry(entry: Pick<LeaderboardEntry, 'playerId' | 'name'>, name = this.getLeaderboardPlayerName()) {
    if (entry.playerId?.trim()) {
      return entry.playerId.trim() === this.getLeaderboardPlayerId();
    }
    return this.normalizeLeaderboardName(entry.name) === this.normalizeLeaderboardName(name);
  }

  private updateLeaderboardSaveVisibility() {
    this.leaderboardNameInput.disabled = false;
    const currentName = this.getLeaderboardPlayerName();
    const existingEntry = this.readLeaderboard().find((entry) => this.isCurrentPlayerEntry(entry, currentName));
    const blockedByExistingBetterScore = Boolean(existingEntry && this.currentRunSummary && existingEntry.score >= this.currentRunSummary.score);
    this.leaderboardSaveButton.disabled =
      this.leaderboardSyncState === 'saving' ||
      !this.currentRunSummary ||
      this.currentGameOverSignature === this.lastSavedGameOverSignature ||
      blockedByExistingBetterScore;
  }

  private renderLeaderboardPreview(entries: LeaderboardEntry[]) {
    if (!this.currentRunSummary) {
      this.leaderboardPreview.innerHTML = '';
      return;
    }
    const candidateName = this.getLeaderboardPlayerName();
    const candidateEntry = this.buildCurrentLeaderboardEntry(candidateName);
    const previewRank =
      [...entries.filter((entry) => !this.isCurrentPlayerEntry(entry, candidateName)), candidateEntry]
        .sort((a, b) => b.score - a.score || a.recordedAt - b.recordedAt)
        .findIndex((entry) => entry === candidateEntry) + 1;
    this.leaderboardPreview.innerHTML = `
      <div class="game-hud__leaderboard-preview-card">
        <span class="game-hud__leaderboard-preview-rank">#${previewRank}</span>
        <button type="button" class="game-hud__leaderboard-avatar game-hud__leaderboard-avatar--preview" data-avatar-trigger aria-label="${candidateName}">
          ${this.renderAvatarMarkup(this.playerAvatarSelection, 'game-hud__leaderboard-avatar-stack')}
        </button>
        <span class="game-hud__leaderboard-preview-copy">
          <strong>${this.i18n.current === 'fr' ? 'Vous' : 'You'}</strong>
          <span>${candidateName}</span>
        </span>
        <span class="game-hud__leaderboard-preview-score">${candidateEntry.score}</span>
      </div>
    `;
  }

  private handleLeaderboardClick(event: Event) {
    const target = event.target as HTMLElement | null;
    const avatarTrigger = target?.closest<HTMLElement>('[data-avatar-trigger]');
    if (avatarTrigger) {
      event.stopPropagation();
      event.preventDefault();
      this.openAvatarEditor();
    }
  }

  private handleLeaderboardHover(event: MouseEvent) {
    const row = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-entry-index]');
    if (!row) {
      this.hideLeaderboardHover();
      return;
    }
    const index = Number(row.dataset.entryIndex);
    const entry = Number.isFinite(index) ? this.renderedLeaderboardEntries[index] : null;
    if (!entry?.details) {
      this.hideLeaderboardHover();
      return;
    }
    this.leaderboardHoverCard.hidden = false;
    this.leaderboardHoverCard.innerHTML = `
      <strong>${entry.name}</strong>
      <span>${this.i18n.current === 'fr' ? 'Score' : 'Score'}: ${entry.score}</span>
      <span>${this.i18n.current === 'fr' ? 'Distance' : 'Distance'}: ${Math.round(entry.details.distanceMeters)}m</span>
      <span>${this.i18n.current === 'fr' ? 'Fragments' : 'Shards'}: ${entry.details.shardsLanded}</span>
      <span>${this.i18n.current === 'fr' ? 'Pièces' : 'Coins'}: ${entry.details.coinsCollected}</span>
      <span>${this.i18n.current === 'fr' ? 'Monstres' : 'Monsters'}: ${entry.details.enemiesKilled}</span>
      <span>${this.i18n.current === 'fr' ? 'Meilleur momentum' : 'Best momentum'}: ${entry.details.longestMomentumSeconds.toFixed(1)}s</span>
    `;
    const offsetX = 18;
    const offsetY = 14;
    const maxLeft = window.innerWidth - 220;
    const maxTop = window.innerHeight - 190;
    this.leaderboardHoverCard.style.left = `${Math.max(12, Math.min(maxLeft, event.clientX + offsetX))}px`;
    this.leaderboardHoverCard.style.top = `${Math.max(12, Math.min(maxTop, event.clientY + offsetY))}px`;
  }

  private hideLeaderboardHover() {
    this.leaderboardHoverCard.hidden = true;
  }

  private openAvatarEditor() {
    if (!this.avatarEditorOpen) {
      this.draftAvatarSelection = { ...this.playerAvatarSelection };
    }
    this.avatarEditorOpen = true;
    void this.ensureAvatarAssetsLoaded();
    this.renderAvatarEditor();
    this.renderGameOverMode(null);
  }

  private saveAvatarSelection() {
    this.playerAvatarSelection = this.normalizeAvatarSelection(this.draftAvatarSelection, '', true);
    this.draftAvatarSelection = { ...this.playerAvatarSelection };
    window.localStorage.setItem(PLAYER_AVATAR_KEY, JSON.stringify(this.playerAvatarSelection));
    const currentName = this.getLeaderboardPlayerName();
    const entries = this.readLeaderboard();
    if (entries.some((entry) => this.isCurrentPlayerEntry(entry, currentName))) {
      const updatedEntries = entries.map((entry) =>
        this.isCurrentPlayerEntry(entry, currentName)
          ? { ...entry, playerId: this.getLeaderboardPlayerId(), avatar: { ...this.playerAvatarSelection } }
          : entry
      );
      this.leaderboardEntriesCache = updatedEntries;
      this.persistLeaderboardCache(updatedEntries);
      const currentEntry = updatedEntries.find((entry) => this.isCurrentPlayerEntry(entry, currentName));
      if (currentEntry) {
        void fetch(LEADERBOARD_API_PATH, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ entry: currentEntry })
        })
          .then((response) => (response.ok ? response.json() : null))
          .then((payload) => {
            if (!payload || !Array.isArray(payload.entries)) {
              return;
            }
            const nextEntries = this.normalizeLeaderboardEntries(payload.entries);
            this.leaderboardEntriesCache = nextEntries;
            this.persistLeaderboardCache(nextEntries);
            this.renderLeaderboard();
          })
          .catch((error) => {
            console.warn('[GameHUDSystem] Failed to sync avatar selection to shared leaderboard API.', error);
          });
      }
    }
    this.renderAvatarEditor();
    this.renderLeaderboard();
    this.renderGameOverMode(null);
  }

  private clearScoreFeed() {
    this.scoreFeed.replaceChildren();
    this.scoreFeedTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    this.scoreFeedTimeouts.clear();
  }

  private pushScoreFeedEvent(event: NonNullable<GameHUDPayload['scoreFeed']>) {
    const entry = document.createElement('div');
    entry.className = 'game-hud__score-feed-entry';
    const roundedMultiplier = Math.round(event.multiplier * 10) / 10;
    const showMultiplier = roundedMultiplier > 1.04 && event.basePoints > 0;
    const momentumRatio = Math.max(0, Math.min(1, event.momentumRatio ?? 0));
    const colorLow = { r: 242, g: 221, b: 184 };
    const colorHigh = { r: 88, g: 240, b: 228 };
    const accent = {
      r: Math.round(colorLow.r + (colorHigh.r - colorLow.r) * momentumRatio),
      g: Math.round(colorLow.g + (colorHigh.g - colorLow.g) * momentumRatio),
      b: Math.round(colorLow.b + (colorHigh.b - colorLow.b) * momentumRatio)
    };
    entry.style.setProperty('--score-feed-rgb', `${accent.r} ${accent.g} ${accent.b}`);
    entry.style.setProperty('--score-feed-scale', (1 + momentumRatio * 0.3).toFixed(3));
    entry.innerHTML = `
      <strong>${showMultiplier ? `+${event.basePoints}` : `+${event.gained}`}</strong>
      ${showMultiplier ? `<span>x${Number.isInteger(roundedMultiplier) ? roundedMultiplier.toFixed(0) : roundedMultiplier.toFixed(1)}</span>` : ''}
    `;
    this.scoreFeed.prepend(entry);
    while (this.scoreFeed.childElementCount > 4) {
      this.scoreFeed.lastElementChild?.remove();
    }
    const timeoutId = window.setTimeout(() => {
      entry.remove();
      this.scoreFeedTimeouts.delete(timeoutId);
    }, 760);
    this.scoreFeedTimeouts.add(timeoutId);
  }

  private bumpHudMetric(element: Element | null) {
    if (!(element instanceof HTMLElement)) {
      return;
    }
    element.classList.remove('is-updating');
    void element.offsetWidth;
    element.classList.add('is-updating');
    window.setTimeout(() => element.classList.remove('is-updating'), 300);
  }

  private stepAvatarSelection(layer: AvatarLayerKey, direction: -1 | 1) {
    const availableIndices = this.getAvailableAvatarIndices(layer, true);
    if (availableIndices.length <= 1) {
      return;
    }
    const currentIndex = Math.max(0, availableIndices.indexOf(this.draftAvatarSelection[layer]));
    const nextValue = availableIndices[(currentIndex + direction + availableIndices.length) % availableIndices.length] ?? availableIndices[0] ?? 0;
    this.draftAvatarSelection = {
      ...this.draftAvatarSelection,
      [layer]: nextValue
    };
    this.renderAvatarEditor();
  }

  private renderAvatarEditor() {
    this.avatarEditor.hidden = !this.avatarEditorOpen;
    if (!this.avatarEditorOpen) {
      this.avatarEditorLayers.hidden = true;
      return;
    }
    if (!this.avatarAssetsLoaded) {
      const loadingLabel = this.i18n.current === 'fr' ? 'Chargement…' : 'Loading…';
      this.avatarEditorStage.innerHTML = `
        <div class="game-hud__avatar-editor-preview" data-avatar-editor-preview>
          <div class="game-hud__avatar-loading">${loadingLabel}</div>
        </div>
      `;
      this.avatarEditorPreview = this.avatarEditorStage.querySelector<HTMLDivElement>('[data-avatar-editor-preview]')!;
      this.avatarEditorLayers.innerHTML = '';
      this.avatarEditorLayers.hidden = true;
      this.avatarEditorSaveButton.disabled = true;
      return;
    }
    this.avatarEditorSaveButton.disabled = false;
    const previewSelection = this.normalizeAvatarSelection(this.draftAvatarSelection, '', true);
    const theme = resolveDocumentTheme();
    const hoverTheme = theme === 'dark' ? 'light' : 'dark';
    this.avatarEditorPreview.innerHTML = this.renderAvatarMarkup(previewSelection, 'game-hud__avatar-preview-stack');
    const prevLabel = this.i18n.current === 'fr' ? 'Précédent' : 'Previous';
    const nextLabel = this.i18n.current === 'fr' ? 'Suivant' : 'Next';
    const renderColumn = (direction: -1 | 1) =>
      AVATAR_LAYER_ORDER.map(
        (layer) => `
          <button
            type="button"
            class="game-hud__avatar-editor-step game-hud__avatar-editor-step--${direction < 0 ? 'prev' : 'next'}"
            data-avatar-layer="${layer}"
            data-avatar-step="${direction}"
            aria-label="${direction < 0 ? prevLabel : nextLabel}"
          >
            ${this.renderSwapIconMarkup(
              direction < 0 ? SECONDARY_NAV_ASSETS.left[theme] : SECONDARY_NAV_ASSETS.right[theme],
              direction < 0 ? SECONDARY_NAV_ASSETS.left[hoverTheme] : SECONDARY_NAV_ASSETS.right[hoverTheme],
              'game-hud__svg-button-image'
            )}
          </button>
        `
      ).join('');

    this.avatarEditorStage.innerHTML = `
      <div class="game-hud__avatar-editor-nav-column game-hud__avatar-editor-nav-column--prev">
        ${renderColumn(-1)}
      </div>
      <div class="game-hud__avatar-editor-preview" data-avatar-editor-preview>
        ${this.renderAvatarMarkup(previewSelection, 'game-hud__avatar-preview-stack')}
      </div>
      <div class="game-hud__avatar-editor-nav-column game-hud__avatar-editor-nav-column--next">
        ${renderColumn(1)}
      </div>
    `;
    this.avatarEditorPreview = this.avatarEditorStage.querySelector<HTMLDivElement>('[data-avatar-editor-preview]')!;
    this.avatarEditorLayers.innerHTML = '';
    this.avatarEditorLayers.hidden = true;
  }

  private renderAvatarMarkup(
    selection: AvatarSelection,
    className: string
  ) {
    const layers = this.resolveAvatarLayers(selection);
    if (!layers.background || !layers.motif || !layers.face || !layers.eyes || !layers.barbe) {
      return `
        <span class="${className}" aria-hidden="true">
          <span style="display:block;width:100%;height:100%;border-radius:50%;background:radial-gradient(circle at 30% 30%, rgb(242 221 184 / 0.9), rgb(89 131 139 / 0.88));"></span>
        </span>
      `;
    }
    return `
      <span class="${className}" aria-hidden="true">
        <img src="${layers.background}" alt="" class="${className}-layer ${className}-layer--background" />
        <img src="${layers.motif}" alt="" class="${className}-layer ${className}-layer--motif" />
        <img src="${layers.face}" alt="" class="${className}-layer ${className}-layer--face" />
        <img src="${layers.eyes}" alt="" class="${className}-layer ${className}-layer--eyes" />
        <img src="${layers.barbe}" alt="" class="${className}-layer ${className}-layer--barbe" />
      </span>
    `;
  }

  private resolveAvatarLayers(selection: AvatarSelection): ResolvedAvatarLayers {
    const normalizedSelection = this.normalizeAvatarSelection(selection);
    return {
      background: this.avatarLayerSets.background[normalizedSelection.background] ?? '',
      motif: this.avatarLayerSets.motif[normalizedSelection.motif] ?? '',
      face: this.avatarLayerSets.face[normalizedSelection.face] ?? '',
      eyes: this.avatarLayerSets.eyes[normalizedSelection.eyes] ?? '',
      barbe: this.avatarLayerSets.barbe[normalizedSelection.barbe] ?? ''
    };
  }

  private readPlayerAvatarSelection() {
    const raw = window.localStorage.getItem(PLAYER_AVATAR_KEY);
    if (!raw) {
      return this.normalizeAvatarSelection(undefined, '', true);
    }
    try {
      return this.normalizeAvatarSelection(JSON.parse(raw), '', true);
    } catch {
      return this.normalizeAvatarSelection(undefined, '', true);
    }
  }

  private resolveAvatarSelection(entry: LeaderboardEntry) {
    return this.normalizeAvatarSelection(entry.avatar, entry.name);
  }

  private normalizeAvatarSelection(selection?: Partial<AvatarSelection> | null, seed = '', unlockedOnly = false): AvatarSelection {
    const fallback = this.buildFallbackAvatarSelection(seed, unlockedOnly);
    const normalized = { ...fallback } as AvatarSelection;
    AVATAR_LAYER_ORDER.forEach((layer) => {
      const layerOptions = this.getAvailableAvatarIndices(layer, unlockedOnly);
      const total = this.avatarLayerSets[layer].length;
      const candidate = selection?.[layer];
      if (typeof candidate === 'number' && Number.isFinite(candidate)) {
        const rawValue = Math.max(0, Math.trunc(candidate));
        if (!unlockedOnly && total <= 0) {
          normalized[layer] = rawValue;
          return;
        }
        if (layerOptions.includes(rawValue)) {
          normalized[layer] = rawValue;
          return;
        }
        if (!unlockedOnly && total > 0) {
          normalized[layer] = ((rawValue % total) + total) % total;
          return;
        }
        normalized[layer] = layerOptions[0] ?? 0;
        return;
      }
      normalized[layer] = fallback[layer];
    });
    return normalized;
  }

  private buildFallbackAvatarSelection(seed = '', unlockedOnly = false): AvatarSelection {
    const hash = Array.from(seed || 'player').reduce((value, char) => value + char.charCodeAt(0), 0);
    return {
      background: this.resolveAvatarLayerIndex('background', hash, unlockedOnly),
      motif: this.resolveAvatarLayerIndex('motif', hash + 3, unlockedOnly),
      face: this.resolveAvatarLayerIndex('face', hash + 7, unlockedOnly),
      eyes: this.resolveAvatarLayerIndex('eyes', hash + 11, unlockedOnly),
      barbe: this.resolveAvatarLayerIndex('barbe', hash + 17, unlockedOnly)
    };
  }

  private resolveAvatarLayerIndex(layer: AvatarLayerKey, seed: number, unlockedOnly = false) {
    const options = this.getAvailableAvatarIndices(layer, unlockedOnly);
    if (options.length <= 0) {
      return 0;
    }
    return options[Math.abs(seed) % options.length] ?? options[0] ?? 0;
  }

  private getAvailableAvatarIndices(layer: AvatarLayerKey, unlockedOnly: boolean) {
    const total = this.avatarLayerSets[layer].length;
    const unlocked = this.currentAchievements.profile.avatarUnlocks[layer] ?? [0];
    const baseOptions = total > 0 ? [...Array.from({ length: total }, (_, index) => index)] : [...unlocked];
    if (!unlockedOnly) {
      return baseOptions.length > 0 ? baseOptions : [0];
    }
    const filtered = unlocked.filter((index) => index >= 0 && (total <= 0 || index < total));
    return filtered.length > 0 ? filtered : [0];
  }

  private preloadUiAssets() {
    const itemAssets = rogueliteItems.flatMap((item) => [item.hudIconSrc, item.rarityIconSrc]);
    const buttonAssets = [
      getUIButtonAsset('restart', 'fr', 'dark'),
      getUIButtonAsset('restart', 'fr', 'light'),
      getUIButtonAsset('restart', 'en', 'dark'),
      getUIButtonAsset('restart', 'en', 'light'),
      getUIButtonAsset('back', 'fr', 'dark'),
      getUIButtonAsset('back', 'fr', 'light'),
      getUIButtonAsset('back', 'en', 'dark'),
      getUIButtonAsset('back', 'en', 'light'),
      getUIButtonAsset('highscore', 'fr', 'dark'),
      getUIButtonAsset('highscore', 'fr', 'light'),
      getUIButtonAsset('highscore', 'en', 'dark'),
      getUIButtonAsset('highscore', 'en', 'light'),
      getUIButtonAsset('buy', 'fr', 'dark'),
      getUIButtonAsset('buy', 'fr', 'light'),
      getUIButtonAsset('buy', 'en', 'dark'),
      getUIButtonAsset('buy', 'en', 'light'),
      getUIButtonAsset('hub', 'fr', 'dark'),
      getUIButtonAsset('hub', 'fr', 'light'),
      getUIButtonAsset('hub', 'en', 'dark'),
      getUIButtonAsset('hub', 'en', 'light'),
      LANGUAGE_BUTTON_ASSETS.fr,
      LANGUAGE_BUTTON_ASSETS.en,
      FULLSCREEN_BUTTON_ASSETS.on.dark,
      FULLSCREEN_BUTTON_ASSETS.on.light,
      FULLSCREEN_BUTTON_ASSETS.off.dark,
      FULLSCREEN_BUTTON_ASSETS.off.light,
      SAVE_BUTTON_ASSETS.dark,
      SAVE_BUTTON_ASSETS.light,
      THEME_TOGGLE_ASSETS.dark,
      THEME_TOGGLE_ASSETS.light,
      ACHIEVEMENT_ICON_ASSETS.dark,
      ACHIEVEMENT_ICON_ASSETS.light,
      HELP_ICON_ASSETS.dark,
      HELP_ICON_ASSETS.light,
      SECONDARY_NAV_ASSETS.left.dark,
      SECONDARY_NAV_ASSETS.left.light,
      SECONDARY_NAV_ASSETS.right.dark,
      SECONDARY_NAV_ASSETS.right.light,
      SECONDARY_NAV_ASSETS.close.dark,
      SECONDARY_NAV_ASSETS.close.light,
      SOUND_BUTTON_ASSETS.on.dark,
      SOUND_BUTTON_ASSETS.on.light,
      SOUND_BUTTON_ASSETS.off.dark,
      SOUND_BUTTON_ASSETS.off.light,
      SOUND_BUTTON_ASSETS.sprite
    ];
    const preloadedAssets = [
      ...Object.values(GRADE_SPRITE_ASSET_URLS).flatMap((assetSet) => Object.values(assetSet)),
      ...Object.values(MOMENTUM_BAR_ASSETS),
      COIN_ICON_URL,
      EQUIPMENT_UI_ASSETS.bgBoat,
      ...itemAssets,
      ...Object.values(EQUIPMENT_UI_ASSETS.charges),
      ...Object.values(MOBILE_CONTROL_ASSETS).flatMap((assetSet) => Object.values(assetSet)),
      ...MOBILE_CHARGE_ASSETS.flatMap((assetSet) => Object.values(assetSet)),
      ...buttonAssets,
      ...Object.values(SETTINGS_BUTTON_ASSETS)
    ];
    preloadedAssets.forEach((src) => {
      preloadImageAsset(src);
    });
    Object.values(EQUIPMENT_UI_ASSETS.charges).forEach((src) => this.preloadShapeTemplate(src));
    this.preloadShapeTemplate(EQUIPMENT_UI_ASSETS.bgBoat);

    void this.ensureDeferredAssetsModule()
      .then(async ({ loadAvatarLayerSets, loadHelpPagesFor }) => {
        await Promise.all([
          loadAvatarLayerSets(),
          loadHelpPagesFor(this.i18n.current, 'dark'),
          loadHelpPagesFor(this.i18n.current, 'light')
        ]);
      })
      .catch((error) => {
        console.warn('[GameHUDSystem] Failed to preload deferred UI assets.', error);
      });
  }
}
