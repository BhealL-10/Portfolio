import * as THREE from 'three';
import { drawImageIfReady, getSharedImageAsset, getSharedTextureAsset, preloadImageAsset } from '../core/browserAssetCache';
import { isMobileRuntime } from '../core/device';
import { clamp, damp } from '../core/math';
import { getThemeNonShardHex, getThemeShardContrastHex, getThemeShardHex } from '../core/themePalette';
import type { ThemeMode } from '../types/content';
import { CameraRailController } from './CameraRailController';
import { CoinSystem, type CoinMarker } from './CoinSystem';
import { EnemySystem, type EnemyMarker, type EnemyMarkerKind } from './EnemySystem';
import { AchievementSystem } from './achievements/AchievementSystem';
import { createEmptyAchievementPanelSnapshot } from './achievements/AchievementTypes';
import { createMiniGamePortalNode, MINI_GAME_PORTAL_LAUNCH_ANGLE } from './MiniGamePortalLayout';
import { DEFAULT_COLUMN_DISTANCE } from './difficultyScaler';
import { getPathVerticalExtent } from './pathLayout';
import { HELP_ICON_ASSETS, SHARD_DIRECTION_ICON_ASSETS, SHOP_ICON_ASSETS } from './GameUiAssetResolver';
import { GamePathSystem } from './GamePathSystem';
import type {
  AcquisitionFeedback,
  BranchChoice,
  BranchLabelHint,
  GamePlayerMotionState,
  GameHudSnapshot,
  GameHudState,
  GameOverCause,
  GameSessionState,
  LandingFeedback,
  LandingGrade,
  MomentumState,
  ResolvedGamePathNode,
  VisiblePlatformVisual
} from './gameSessionTypes';
import {
  applyItemToRunState,
  buildUpgradeOffers,
  createRunUpgradeState,
  getItemByBaseId,
  getItemById,
  getModuleChargesForItem,
  getModuleGaugeConfig,
  rogueliteItems,
  type ModuleRuntimeState,
  type RogueliteRarity,
  type RogueliteModuleSlot,
  type RogueliteItemOffer,
  type RunUpgradeState
} from './roguelite';
import { RunStatsSystem } from './RunStatsSystem';
import { resolveRuntimeNode } from './ShardRuntimeResolver';
import { ShopSystem } from './ShopSystem';
import { SpriteSheetPlane } from './SpriteSheetPlane';
import type { GameAudioEvent, GameAudioRuntimeState } from './gameAudioTypes';

type PlayerMotionState = 'attached' | 'charging' | 'airborne' | 'dead';
type ChoiceMode = 'none' | 'reward_branch' | 'shop_orbit';
type PlayerVisualState = 'attached_idle_orbit' | 'attached_fast_orbit' | 'jump_start' | 'airborne' | 'landing' | 'death';
type AmbientEnemyKind = Extract<EnemyMarkerKind, 'enemyTop' | 'enemyBot'>;
type AmbientEnemyState = 'alive' | 'dying' | 'sprint_fish';
type AmbientEnemyBotPhase = 'hidden_below_screen' | 'jumping_up' | 'visible_airborne' | 'falling_down';

interface WorldHudBillboard {
  canvas: HTMLCanvasElement;
  texture: THREE.CanvasTexture;
  sprite: THREE.Sprite;
}

interface VisiblePlatformLayoutSnapshot {
  positions: THREE.Vector3[];
  scales: number[];
  visuals: VisiblePlatformVisual[];
}

interface StreamingLookaheadPlan {
  visibleCount: number;
  aheadNodes: number;
  chunkSize: number;
  desiredFutureSlots: number;
  streamingAnchorIndex: number;
  displayWindowMinX: number;
  displayWindowMaxX: number;
  logicalWindowMinX: number;
  logicalWindowMaxX: number;
}

function getMotionDirectionAngle(direction: NonNullable<ResolvedGamePathNode['motionDirection']>) {
  switch (direction) {
    case 'left':
      return Math.PI;
    case 'right':
      return 0;
    case 'up':
      return Math.PI * 0.5;
    case 'down':
      return -Math.PI * 0.5;
    case 'up_left':
      return Math.PI * 0.75;
    case 'up_right':
      return Math.PI * 0.25;
    case 'down_left':
      return -Math.PI * 0.75;
    case 'down_right':
    default:
      return -Math.PI * 0.25;
  }
}

function getMotionPreviewDirection(node: ResolvedGamePathNode) {
  if (node.motionDirection) {
    return node.motionDirection;
  }
  switch (node.motionPattern) {
    case 'vertical':
      return 'up' as const;
    case 'horizontal':
      return 'right' as const;
    case 'drift':
      return 'up_right' as const;
    case 'micro_orbit':
      return 'up_left' as const;
    default:
      return null;
  }
}

const ITEM_PLACEHOLDER_ICON = '/assets/images/shared/branding/ape-prod-mark-dark.svg';
const PLAYER_MAIN_SPRITE_URL = new URL('../../assets/images/game/sprites/characters/player/boat-airborne-sheet.png', import.meta.url).href;
const PLAYER_BOOST_SPRITE_URL = new URL('../../assets/images/game/sprites/characters/player/boat-boost-sheet.png', import.meta.url).href;
const STICK_MONKEY_AIR_URL = new URL('../../assets/images/game/sprites/characters/companion/stick-monkey-airborne-sheet.png', import.meta.url).href;
const STICK_MONKEY_GLIDE_URL = new URL('../../assets/images/game/sprites/characters/companion/stick-monkey-glide-sheet.png', import.meta.url).href;
const BIG_CANON_PROJECTILE_URL = new URL('../../assets/images/game/sprites/effects/big-cannon-projectile.svg', import.meta.url).href;
const FRONT_CANON_PROJECTILE_URL = new URL('../../assets/images/game/sprites/effects/front-cannon-projectile.svg', import.meta.url).href;
const SHARD_HUD_ANCHOR_LOAD_ASSETS = {
  dark: new URL('../../assets/images/game/ui/buttons/icons/ancrageload-dark.svg', import.meta.url).href,
  light: new URL('../../assets/images/game/ui/buttons/icons/ancrageload-light.svg', import.meta.url).href
} as const;
const SHARD_HUD_ANCHOR_FULL_ASSETS = {
  dark: new URL('../../assets/images/game/ui/buttons/icons/ancragefull-dark.svg', import.meta.url).href,
  light: new URL('../../assets/images/game/ui/buttons/icons/ancragefull-light.svg', import.meta.url).href
} as const;
const SHARD_HUD_BOOST_ASSETS = {
  dark: new URL('../../assets/images/game/ui/buttons/icons/boostshard-dark.svg', import.meta.url).href,
  light: new URL('../../assets/images/game/ui/buttons/icons/boostshard-light.svg', import.meta.url).href
} as const;
const RARITY_COLORS: Record<RogueliteRarity, string> = {
  common: '#F2DDB8',
  uncommon: '#75AF80',
  rare: '#49BCFF',
  epic: '#8C53B4',
  legendary: '#727C91'
};

const MOMENTUM_GAIN_BY_GRADE: Record<LandingGrade, number> = {
  miss: 0,
  good: 0.08,
  super: 0.16,
  perfect: 0.28
};
const MISS_MOMENTUM_PENALTY = -0.02;
const TWIST_CHAIN_BASE_BONUS = 0.05;
const TWIST_CHAIN_INCREMENT = 0.012;
const TWIST_CHAIN_MAX_BONUS = 0.08;
const BASE_MOMENTUM_DECAY_RATE = 0.1;
const PLAYER_PROGRESS_HALF_WIDTH = 0.92;
const PLAYER_COLLISION_HALF_HEIGHT = 0.78;
const BASE_COIN_PICKUP_RADIUS = 0.74;
const SPECIAL_ENEMY_INITIAL_SPAWN_DELAY_SECONDS = 0.9;
const SPECIAL_ENEMY_SPAWN_MIN_SECONDS = 0.85;
const SPECIAL_ENEMY_SPAWN_MAX_SECONDS = 1.7;
const SPECIAL_ENEMY_EARLY_DISTANCE_METERS = 220;
const SPECIAL_ENEMY_EARLY_SPAWN_CHANCE = 0.82;
const SPECIAL_ENEMY_DEFAULT_SPAWN_CHANCE = 0.58;
const SPECIAL_ENEMY_MAX_ACTIVE = 3;
const SPECIAL_ENEMY_MAX_ACTIVE_PER_KIND = 2;
const SPECIAL_ENEMY_MIN_SPAWN_SPACING_X = 11.5;
const SPECIAL_ENEMY_MIN_SPAWN_SPACING_Y = 2.4;
const SPECIAL_ENEMY_DEBUG_LOGS = false;
const SPECIAL_ENEMY_TOP_SPEED = 4.8;
const SPECIAL_ENEMY_BOT_SPEED = 6.9;
const SPECIAL_ENEMY_TOP_WORLD_Y = 43;
const SPECIAL_ENEMY_BOT_VISIBLE_Y = -16;
const SPECIAL_ENEMY_BOT_HIDDEN_Y = -28;
const SPECIAL_ENEMY_BOT_JUMP_DURATION = 0.9;
const SPECIAL_ENEMY_BOT_VISIBLE_DURATION = 3.35;
const SPECIAL_ENEMY_BOT_FALL_DURATION = 0.9;
const SPECIAL_ENEMY_BOT_HIDDEN_DURATION = 0.96;
const SPECIAL_ENEMY_BOT_VISIBLE_FLOAT_AMPLITUDE = 0.12;
const SPECIAL_ENEMY_BOT_INITIAL_HIDDEN_PROGRESS = 0.72;
const SPECIAL_ENEMY_BODY_Z_HALF = 0.58;
const CAMERA_VERTICAL_TRACK_MIN_Y = -28;
const CAMERA_VERTICAL_TRACK_MAX_Y = 45;
const SPRINT_FISH_DISTANCE_METERS = 100;
const SPRINT_FISH_TOW_SPEED_MULTIPLIER = 7.2;
const SPRINT_FISH_TOW_SPEED_MIN = 192;
const SPRINT_FISH_TOW_SPEED_MAX = 288;
const SPRINT_FISH_PULL_OFFSET_X = 5.2;
const SPRINT_FISH_PULL_OFFSET_Y = 5.24;
const SPRINT_FISH_PULL_RESPONSE = 8.5;
const SPRINT_FISH_PLAYER_TOW_VELOCITY_RESPONSE = 11.8;
const SPRINT_FISH_PLAYER_TOW_VERTICAL_VELOCITY = 0.34;
const SPRINT_FISH_PIVOT_RELEASE_ANGLE = Math.PI * 0.5;
const SPRINT_FISH_PIVOT_MIN_RADIUS = 4.4;
const SPRINT_FISH_PIVOT_MAX_RADIUS = 7.8;
const SPRINT_FISH_PIVOT_MIN_ANGULAR_SPEED = 6.4;
const SPRINT_FISH_PIVOT_MAX_ANGULAR_SPEED = 10.4;
const SPRINT_FISH_RELEASE_SPEED_CARRY_RATIO = 0.86;
const SPRINT_FISH_PIVOT_FORWARD_BOOST = 3.6;
const SPRINT_FISH_PIVOT_UP_BOOST = 1.75;
const SPRINT_FISH_STREAK_COUNT = 3;
const AMBIENT_ENEMY_SCALE_VARIANTS = [0.96, 1.10, 1.31, 1.4] as const;
const RUN_PATH_PREBUILD_COUNT = 220;
const PATH_INITIAL_AHEAD_PADDING = 128;
const DISPLAY_BACKLINE_RELEASE_BUFFER = 3.4;
const DISPLAY_FORWARD_SPAWN_BUFFER = 5.4;
const DISPLAY_REPLACEMENT_SEARCH_RANGE = 96;
const STREAMING_LOOKAHEAD_SECONDS = 2.25;
const STREAMING_SPRINTFISH_LOOKAHEAD_SECONDS = 2.85;
const STREAMING_LOOKAHEAD_FRAME_PADDING_SECONDS = 0.45;
const STREAMING_NODES_PER_METER = 1.55;
const STREAMING_MIN_AHEAD_NODES = 140;
const STREAMING_MAX_AHEAD_NODES = 280;
const STREAMING_MIN_CHUNK_SIZE = 96;
const STREAMING_MAX_CHUNK_SIZE = 176;
const STREAMING_DISPLAY_OVERSCAN_NODES = 18;
const STREAMING_MAX_PRESERVED_PAST_SLOTS = 10;
const STREAMING_CAMERA_PREBIND_SECONDS = 1.12;
const STREAMING_SPRINTFISH_CAMERA_PREBIND_SECONDS = 1.45;
const STREAMING_CAMERA_BACK_BUFFER_COLUMNS = 2.4;
const STREAMING_CAMERA_FORWARD_BIND_MIN_COLUMNS = 9.5;
const STREAMING_CAMERA_FORWARD_BIND_MAX_COLUMNS = 28;
const STREAMING_CAMERA_LOGICAL_RESERVE_COLUMNS = 8.5;
const STREAMING_MAX_LOGICAL_CATCHUP_PASSES = 4;
const DISPLAY_SLOT_LOCK_BUFFER = DEFAULT_COLUMN_DISTANCE * 0.9;
const DISPLAY_FORWARD_REMAP_BUFFER = DEFAULT_COLUMN_DISTANCE * 1.3;
const DISPLAY_WINDOW_REMAP_LIMIT = 32;
const SPRINT_FISH_LANDING_ASSIST_SECONDS = 2.6;
const SPRINT_FISH_LANDING_ASSIST_RADIUS = 2.8;

function computeTwistChainBonus(chainLength: number) {
  return Math.min(TWIST_CHAIN_MAX_BONUS, TWIST_CHAIN_BASE_BONUS + TWIST_CHAIN_INCREMENT * (chainLength - 1));
}

function wrapAngle(angle: number) {
  const tau = Math.PI * 2;
  return ((angle % tau) + tau) % tau;
}

function shortestAngleDistance(a: number, b: number) {
  const tau = Math.PI * 2;
  const diff = ((a - b + Math.PI) % tau + tau) % tau - Math.PI;
  return diff;
}

interface OrbitSample {
  position: THREE.Vector2;
  tangent: THREE.Vector2;
}

interface OrbitAttachment {
  angle: number;
  position: THREE.Vector2;
  tangent: THREE.Vector2;
  normal: THREE.Vector2;
  surfaceWorldPosition: THREE.Vector3;
  worldPosition: THREE.Vector3;
  contactProgress: number;
  distanceSq: number;
}

interface SurfaceContactSample {
  angle: number;
  position: THREE.Vector2;
  tangent: THREE.Vector2;
  normal: THREE.Vector2;
  surfaceWorldPosition: THREE.Vector3;
  distanceSq: number;
}

interface CaptureCandidate {
  node: ResolvedGamePathNode;
  attachment: OrbitAttachment;
}

interface AttachedNodeRuntimeAnchor {
  index: number;
  resolvedX: number;
  resolvedY: number;
  resolvedZ: number;
}

interface ImpactWave {
  originAngle: number;
  strength: number;
  radius: number;
  decay: number;
  createdAt: number;
}

interface PendingEnemyShot {
  active: boolean;
  slot: 'big_canon' | 'front_canon';
  targetIndex: number | null;
  targetPole: 'north' | 'south' | null;
  startedAt: number;
  impactAt: number;
  start: THREE.Vector3;
  target: THREE.Vector3;
}

interface PendingMagnetCoin {
  key: string;
  nodeIndex: number;
  angle: number;
  value: number;
  orbitScale: number;
  forwardOffset: number;
  verticalOffset: number;
  start: THREE.Vector3;
  collectedAt: number;
  duration: number;
}

interface AmbientEnemyRuntime {
  id: string;
  kind: AmbientEnemyKind;
  state: AmbientEnemyState;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  scale: number;
  sizeVariant: 0 | 1 | 2 | 3;
  rewardCoins: number;
  spawnedAt: number;
  stateStartedAt: number;
  deathDuration: number;
  phaseOffset: number;
  cycleDuration: number;
  topBandOffset: number;
  bottomVisibleOffset: number;
  bottomHiddenOffset: number;
  cruiseY: number;
  visibleY: number;
  hiddenY: number;
  botPhase: AmbientEnemyBotPhase | null;
  botPhaseStartedAt: number;
  botJumpDuration: number;
  botVisibleDuration: number;
  botFallDuration: number;
  botHiddenDuration: number;
  sprintPivotActive: boolean;
  sprintPivotAngle: number;
  sprintPivotRadius: number;
  sprintPivotAngularSpeed: number;
  sprintPivotAngularDirection: 1 | -1;
  sprintPivotReleaseAngle: number;
  sprintTowSpeed: number;
  debugLineIndex: number;
  debugTint: string | null;
  zOffset: number;
  bounceCooldownUntil: number;
  killCredited: boolean;
  mirrored: boolean;
}

type GrappleCandidate =
  | { kind: 'node'; index: number; distance: number; angle: number; angleScore: number }
  | { kind: 'ambient_enemy'; enemyId: string; distance: number; angleScore: number };

interface ActiveAchievementToast {
  achievementId: string;
  startedAt: number;
  serial: number;
}

type EnemyCollisionOutcome = 'player_dies' | 'enemy_dies' | 'both_survive' | 'collision_ignored';

interface EnemyCollisionResolution {
  outcome: EnemyCollisionOutcome;
  source?: 'impact' | 'shield';
  fromBehind?: boolean;
  shieldSave?: boolean;
  momentumBurst?: number;
}

type EnemyImpactSide = 'front' | 'back';

type ShardHudImageKey = 'anchorLoad' | 'anchorFull' | 'boost';

interface GameTickFrame {
  deltaTime: number;
  elapsedTime: number;
}

interface ActiveRunTickFrame extends GameTickFrame {
  shopLocked: boolean;
  currentNode: ResolvedGamePathNode;
  nextNode: ResolvedGamePathNode;
  motionStartIndex: number;
}

export class GameSessionController {
  private readonly root = new THREE.Group();
  private readonly player = new THREE.Group();
  private readonly playerMainSprite: SpriteSheetPlane;
  private readonly playerBoostSprite: SpriteSheetPlane;
  private readonly stickMonkeyAirSprite: SpriteSheetPlane;
  private readonly stickMonkeyGlideSprite: SpriteSheetPlane;
  private readonly moduleSprites: Partial<Record<RogueliteModuleSlot, SpriteSheetPlane>> = {};
  private readonly shardHudCanvas = document.createElement('canvas');
  private readonly shardHudTexture: THREE.CanvasTexture;
  private readonly shardHudSprite: THREE.Sprite;
  private readonly shardHudImages: Record<ShardHudImageKey, Record<'dark' | 'light', HTMLImageElement>>;
  private readonly rewardHeaderBillboard: WorldHudBillboard;
  private readonly rewardCardBillboards: [WorldHudBillboard, WorldHudBillboard, WorldHudBillboard];
  private readonly magnetRangeIndicator: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  private readonly bigCanonRangeIndicator: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  private readonly bigCanonRadarSweep: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private readonly grapRangeIndicator: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  private readonly milestonePlayerIndicator: THREE.Mesh<THREE.ConeGeometry, THREE.MeshBasicMaterial>;
  private readonly frontCanonLaser: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private readonly frontCanonProjectile: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private readonly bigCanonProjectile: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private readonly grapRope: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private readonly sprintFishSpeedStreaks: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[];
  private readonly playerTrail = new THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  private readonly trailPoints = Array.from({ length: 8 }, () => new THREE.Vector3());
  private readonly trailBuffer = new Float32Array(this.trailPoints.length * 3);
  private readonly path = new GamePathSystem();
  private readonly camera = new CameraRailController();
  private readonly stats = new RunStatsSystem();
  private readonly achievements = new AchievementSystem();
  private readonly coins: CoinSystem;
  private readonly enemies: EnemySystem;
  private readonly shop: ShopSystem;
  private locale: 'fr' | 'en' = 'en';
  private rewardBillboardSignature = '';
  private readonly rewardImageCache = new Map<string, HTMLImageElement>();
  private readonly transitionPlayerStartPosition = new THREE.Vector3();
  private readonly transitionPlayerStartRotation = new THREE.Euler();
  private readonly transitionPlayerStartScale = new THREE.Vector3(1, 1, 1);
  private transitionProgress = 0;
  private visualAssetsPreloaded = false;
  private visualAssetsPreloadPromise: Promise<void> | null = null;
  private readonly scoreListeners = new Set<() => void>();
  private readonly audioListeners = new Set<(event: GameAudioEvent) => void>();
  private readonly playerPosition = new THREE.Vector3();
  private readonly playerVelocity = new THREE.Vector3();
  private readonly playerVelocityTarget = new THREE.Vector3();
  private readonly scratchVector = new THREE.Vector3();
  private readonly scratchVectorB = new THREE.Vector3();
  private readonly scratchVectorC = new THREE.Vector3();
  private readonly scratchVector2 = new THREE.Vector2();
  private readonly scratchVector2B = new THREE.Vector2();
  private readonly shopCenter = new THREE.Vector3();
  private readonly playerHeading = new THREE.Vector2(1, 0);
  private readonly playerSurfaceNormal = new THREE.Vector2(0, 1);
  private readonly impactWaves = new Map<number, ImpactWave[]>();
  private theme: ThemeMode;
  private themeRequestHandler: ((theme: ThemeMode) => void) | null = null;
  private readonly hudSnapshot: GameHudSnapshot = {
    state: 'transition',
    playerMotionState: 'attached',
    score: 0,
    scoreFeed: null,
    highscore: 0,
    distanceMeters: 0,
    bestDistanceMeters: 0,
    coins: 0,
    splitTimes: {},
    chargeRatio: 0,
    momentumGauge: 0,
    momentumTier: 0,
    orbitGraceActive: false,
    orbitGraceProgress: 1,
    mobile: {
      airborneChargeCount: 0,
      airborneChargeDisplayCount: 0,
      hasTeleport: false,
      teleportBlocked: false,
      teleportCooldownRatio: 0,
      teleportActive: false,
      hasGrapple: false,
      grappleBlocked: false,
      grappleCooldownRatio: 0,
      grappleActive: false,
      hasAirAction: false,
      airActionBlocked: false,
      airActionActive: false,
      airActionDepleted: false,
      hasSouffleur: false,
      hasSouffleurFuel: false,
      boostActive: false
    },
    offers: [],
    branchHints: [],
    shopCenter: null,
    inventoryItems: [],
    landingFeedback: null,
    acquisition: null,
    achievementToasts: [],
    achievements: createEmptyAchievementPanelSnapshot(),
    gameOverCause: null,
    runSummary: {
      score: 0,
      bestScore: 0,
      shardsLanded: 0,
      bestShards: 0,
      distanceMeters: 0,
      bestDistanceMeters: 0,
      coinsCollected: 0,
      bestCoinsCollected: 0,
      enemiesKilled: 0,
      bestEnemiesKilled: 0,
      twistChainMax: 0,
      longestMomentumSeconds: 0,
      bestLongestMomentumSeconds: 0,
      scoreBreakdown: {
        landings: { count: 0, score: 0 },
        kills: { count: 0, score: 0 },
        coins: { count: 0, score: 0 },
        momentum: { score: 0 },
        other: { score: 0 }
      },
      personalBests: {
        score: false,
        shardsLanded: false,
        distanceMeters: false,
        coinsCollected: false,
        enemiesKilled: false,
        longestMomentumSeconds: false
      },
      equipment: []
    }
  };
  private readonly momentum: MomentumState = {
    gauge: 0,
    fillRate: 0,
    decayRate: BASE_MOMENTUM_DECAY_RATE,
    speedMultiplier: 1,
    jumpMultiplier: 1,
    cameraZoomMultiplier: 0
  };
  private state: GameSessionState = 'idle';
  private playerState: PlayerMotionState = 'attached';
  private currentTime = 0;
  private attachedIndex = 0;
  private displayWindowIndices: number[] = [];
  private displayNextIndex = 0;
  private displayNodesCacheTime = Number.NaN;
  private readonly displayNodesCache = new Map<number, ResolvedGamePathNode[]>();
  private platformLayoutCacheCount = -1;
  private readonly platformLayoutCache: VisiblePlatformLayoutSnapshot = {
    positions: [],
    scales: [],
    visuals: []
  };
  private interactableVisibleNodesCache: ResolvedGamePathNode[] | null = null;
  private attachedNodeRuntimeAnchor: AttachedNodeRuntimeAnchor | null = null;
  private score = 0;
  private awaitingFirstJump = false;
  private orbitGraceActive = false;
  private orbitGraceProgress = 1;
  private orbitGraceTravel = 0;
  private chargeActive = false;
  private upActionActive = false;
  private chargeMeter = 0;
  private orbitAngle = Math.PI * 0.18;
  private orbitDirection: -1 | 1 = -1;
  private angularSpeed = 0;
  private mirrorLaunchEligible = false;
  private mirrorLaunchAnchorIndex: number | null = null;
  private mirrorLaunchSpeedThreshold = 0;
  private mirrorThemeBase: ThemeMode | null = null;
  private lastLandingDirection: -1 | 1 | 0 = 0;
  private lastLandingWasJudged = false;
  private twistStreak = 0;
  private choiceMode: ChoiceMode = 'none';
  private activeChoices: BranchChoice[] = [];
  private hiddenMilestoneChoice: BranchChoice | null = null;
  private activeShopAngles: number[] = [];
  private acquisition: AcquisitionFeedback | null = null;
  private landingFeedback: LandingFeedback | null = null;
  private acquisitionStartedAt = 0;
  private acquisitionDuration = 0.9;
  private landingFeedbackStartedAt = 0;
  private landingFeedbackDuration = 1.35;
  private achievementToastDuration = 2.6;
  private achievementToastSerial = 0;
  private readonly achievementToasts: ActiveAchievementToast[] = [];
  private landingFeedbackNodeIndex: number | null = null;
  private lastLandingFeedbackTriggerNodeIndex: number | null = null;
  private landingFeedbackSerial = 0;
  private landingFeedbackAirborneSerial = 0;
  private lastLandingFeedbackConsumedSerial = -1;
  private gameOverStartedAt = 0;
  private gameOverCause: GameOverCause = null;
  private jumpVisualUntil = 0;
  private landingVisualUntil = 0;
  private runUpgrades: RunUpgradeState = createRunUpgradeState();
  private remainingExtraJumps = 0;
  private phaseJumpReadyAt = 0;
  private teleportReadyAt = 0;
  private warpReadyAt = 0;
  private shieldCharges = 0;
  private souffleurActive = false;
  private souffleurRequiresFullRecharge = false;
  private wrapperPendingTarget: number | null = null;
  private wrapperTeleportAt = 0;
  private wrapperHoldUntil = 0;
  private wrapperVisualUntil = 0;
  private wrapperCooldownPending = false;
  private shieldHitUntil = 0;
  private shieldRechargeFlashUntil = 0;
  private readonly moduleFlashUntil: Partial<Record<RogueliteModuleSlot, number>> = {};
  private bigCanonAnimStartedAt = 0;
  private bigCanonAnimUntil = 0;
  private frontCanonAnimStartedAt = 0;
  private frontCanonAnimUntil = 0;
  private grapState: 'idle' | 'launch' | 'hooked' | 'landing' | 'sprint_fish' = 'idle';
  private grapStateUntil = 0;
  private grapTargetIndex: number | null = null;
  private grapTargetAngle: number | null = null;
  private grapAmbientEnemyId: string | null = null;
  private grapRopeLength = 0;
  private readonly grapTargetPosition = new THREE.Vector3();
  private grapCooldownPending = false;
  private grapAwaitReleaseBeforePull = false;
  private grapReleasePending = false;
  private grapReleasePressedAt = 0;
  private readonly ambientEnemies: AmbientEnemyRuntime[] = [];
  private ambientEnemySpawnReadyAt = 0;
  private ambientEnemySerial = 0;
  private sprintFishStartX = 0;
  private sprintFishLandingTargetIndex: number | null = null;
  private sprintFishLandingAssistUntil = 0;
  private readonly frontCanonShot: PendingEnemyShot = this.createPendingEnemyShot('front_canon');
  private readonly bigCanonShot: PendingEnemyShot = this.createPendingEnemyShot('big_canon');
  private grapRangeIndicatorHalfAngle = 0;
  private readonly pendingMagnetCoins = new Map<string, PendingMagnetCoin>();
  private eventCooldownUntil = 0;
  private milestoneChoiceCache = new Map<number, BranchChoice[]>();
  private readonly disabledMilestoneIndices = new Set<number>();
  private airborneFromMilestone = false;
  private airborneStartedAt = 0;
  private momentumLossActive = false;
  private readonly portalPreviewCenter = new THREE.Vector3(0, 0.8, 0);
  private portalPreviewDesiredAngle: number | null = null;

  constructor(scene: THREE.Scene, theme: ThemeMode) {
    this.theme = theme;
    this.shardHudImages = {
      anchorLoad: {
        dark: this.createUiHudImage(SHARD_HUD_ANCHOR_LOAD_ASSETS.dark),
        light: this.createUiHudImage(SHARD_HUD_ANCHOR_LOAD_ASSETS.light)
      },
      anchorFull: {
        dark: this.createUiHudImage(SHARD_HUD_ANCHOR_FULL_ASSETS.dark),
        light: this.createUiHudImage(SHARD_HUD_ANCHOR_FULL_ASSETS.light)
      },
      boost: {
        dark: this.createUiHudImage(SHARD_HUD_BOOST_ASSETS.dark),
        light: this.createUiHudImage(SHARD_HUD_BOOST_ASSETS.light)
      }
    };
    this.shardHudCanvas.width = 256;
    this.shardHudCanvas.height = 256;
    this.shardHudTexture = new THREE.CanvasTexture(this.shardHudCanvas);
    this.shardHudTexture.colorSpace = THREE.SRGBColorSpace;
    this.shardHudTexture.minFilter = THREE.LinearFilter;
    this.shardHudTexture.magFilter = THREE.LinearFilter;
    this.shardHudTexture.generateMipmaps = false;
    this.shardHudSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.shardHudTexture,
        transparent: true,
        depthWrite: false,
        depthTest: false
      })
    );
    this.shardHudSprite.visible = false;
    this.shardHudSprite.renderOrder = 18;
    this.playerMainSprite = new SpriteSheetPlane({
      textureUrl: PLAYER_MAIN_SPRITE_URL,
      layout: { columns: 2, rows: 2 },
      width: 2.3,
      height: 1.16,
      alphaTest: 0.08,
      offsetY: 0.18,
      renderOrder: 15
    });
    this.playerBoostSprite = new SpriteSheetPlane({
      textureUrl: PLAYER_BOOST_SPRITE_URL,
      layout: { columns: 2, rows: 2 },
      width: 2.4,
      height: 1.2,
      alphaTest: 0.08,
      offsetY: 0.18,
      renderOrder: 15
    });
    this.stickMonkeyAirSprite = new SpriteSheetPlane({
      textureUrl: STICK_MONKEY_AIR_URL,
      layout: { columns: 2, rows: 2 },
      width: 2.3,
      height: 1.16,
      alphaTest: 0.08,
      offsetY: 0.18,
      renderOrder: 24
    });
    this.stickMonkeyGlideSprite = new SpriteSheetPlane({
      textureUrl: STICK_MONKEY_GLIDE_URL,
      layout: { columns: 2, rows: 2 },
      width: 2.4,
      height: 1.2,
      alphaTest: 0.08,
      offsetY: 0.18,
      renderOrder: 24
    });
    this.player.add(this.playerMainSprite.group, this.playerBoostSprite.group, this.stickMonkeyAirSprite.group, this.stickMonkeyGlideSprite.group);
    this.initializeModuleSprites();
    this.player.visible = false;
    this.root.add(this.player);
    this.root.add(this.shardHudSprite);
    this.rewardHeaderBillboard = this.createWorldHudBillboard(1600, 360, 14.2, 3.2, 30, 0.99);
    this.rewardCardBillboards = [
      this.createWorldHudBillboard(1600, 760, 14.8, 7, 30, 0.995),
      this.createWorldHudBillboard(1600, 760, 14.8, 7, 30, 0.995),
      this.createWorldHudBillboard(1600, 760, 14.8, 7, 30, 0.995)
    ];
    this.magnetRangeIndicator = this.createSimpleRangeIndicator(this.getRarityColor('common'), 0.16);
    this.bigCanonRangeIndicator = this.createRadarRangeIndicator(this.getRarityColor('common'), 0.028);
    this.bigCanonRadarSweep = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 0.12),
      new THREE.MeshBasicMaterial({
        color: this.getRarityColor('common'),
        transparent: true,
        opacity: 0.16,
        depthWrite: false,
        depthTest: false
      })
    );
    this.bigCanonRadarSweep.visible = false;
    this.bigCanonRadarSweep.renderOrder = 29;
    this.grapRangeIndicator = this.createConeRangeIndicator(this.getRarityColor('common'), 0.16, this.getGrappleConeHalfAngle());
    this.milestonePlayerIndicator = new THREE.Mesh(
      new THREE.ConeGeometry(1.0, 1.95, 3),
      new THREE.MeshBasicMaterial({
        color: getThemeNonShardHex(theme),
        transparent: true,
        opacity: 0.94,
        depthWrite: false,
        depthTest: false
      })
    );
    this.milestonePlayerIndicator.visible = false;
    this.milestonePlayerIndicator.renderOrder = 29;
    this.milestonePlayerIndicator.rotation.z = Math.PI;
    this.frontCanonLaser = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 0.24),
      new THREE.MeshBasicMaterial({
        color: getThemeNonShardHex(theme),
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
        depthTest: false
      })
    );
    this.frontCanonLaser.visible = false;
    this.frontCanonLaser.renderOrder = 26;
    this.frontCanonProjectile = this.createBillboardPlane(FRONT_CANON_PROJECTILE_URL, 0.32, 0.32, 28);
    this.bigCanonProjectile = this.createBillboardPlane(BIG_CANON_PROJECTILE_URL, 0.4, 0.4, 28);
    this.grapRope = new THREE.Mesh(
      new THREE.PlaneGeometry(0.03, 1),
      new THREE.MeshBasicMaterial({
        color: getThemeNonShardHex(theme),
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide
      })
    );
    this.grapRope.visible = false;
    this.grapRope.renderOrder = 27;
    this.sprintFishSpeedStreaks = Array.from({ length: SPRINT_FISH_STREAK_COUNT }, (_, index) => {
      const streak = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 0.16 + index * 0.04),
        new THREE.MeshBasicMaterial({
          color: getThemeNonShardHex(theme),
          transparent: true,
          opacity: 0,
          depthWrite: false,
          depthTest: false,
          side: THREE.DoubleSide
        })
      );
      streak.visible = false;
      streak.renderOrder = 25;
      return streak;
    });
    this.root.add(
      this.rewardHeaderBillboard.sprite,
      ...this.rewardCardBillboards.map((billboard) => billboard.sprite),
      this.magnetRangeIndicator,
      this.bigCanonRangeIndicator,
      this.bigCanonRadarSweep,
      this.grapRangeIndicator,
      this.milestonePlayerIndicator,
      this.frontCanonLaser,
      this.frontCanonProjectile,
      this.bigCanonProjectile,
      this.grapRope,
      ...this.sprintFishSpeedStreaks
    );

    const trailGeometry = new THREE.BufferGeometry();
    trailGeometry.setAttribute('position', new THREE.BufferAttribute(this.trailBuffer, 3));
    this.playerTrail = new THREE.Line(
      trailGeometry,
      new THREE.LineBasicMaterial({
        color: getThemeNonShardHex(theme),
        transparent: true,
        opacity: 0.42
      })
    );
    this.playerTrail.visible = false;
    this.root.add(this.playerTrail);

    scene.add(this.root);
    this.coins = new CoinSystem(scene, theme);
    this.enemies = new EnemySystem(scene, theme);
    this.shop = new ShopSystem(scene, theme);
  }

  preloadAssets() {
    if (this.visualAssetsPreloadPromise) {
      return this.visualAssetsPreloadPromise;
    }
    if (this.visualAssetsPreloaded) {
      return Promise.resolve();
    }

    const moduleSpriteAssets = rogueliteItems
      .map((item) => item.boatVisual?.spriteSheetUrl ?? null)
      .filter((src): src is string => Boolean(src));
    const assets = new Set<string>([
      ITEM_PLACEHOLDER_ICON,
      PLAYER_MAIN_SPRITE_URL,
      PLAYER_BOOST_SPRITE_URL,
      STICK_MONKEY_AIR_URL,
      STICK_MONKEY_GLIDE_URL,
      BIG_CANON_PROJECTILE_URL,
      FRONT_CANON_PROJECTILE_URL,
      ...Object.values(SHARD_HUD_ANCHOR_LOAD_ASSETS),
      ...Object.values(SHARD_HUD_ANCHOR_FULL_ASSETS),
      ...Object.values(SHARD_HUD_BOOST_ASSETS),
      ...Object.values(SHARD_DIRECTION_ICON_ASSETS),
      ...Object.values(SHOP_ICON_ASSETS),
      ...Object.values(HELP_ICON_ASSETS),
      ...rogueliteItems.flatMap((item) => [item.hudIconSrc, item.rarityIconSrc]),
      ...moduleSpriteAssets
    ]);

    this.visualAssetsPreloadPromise = Promise.all(Array.from(assets, (src) => preloadImageAsset(src)))
      .then(() => {
        this.visualAssetsPreloaded = true;
      })
      .catch((error) => {
        this.visualAssetsPreloadPromise = null;
        console.warn('[GameSessionController] Failed to preload visual assets.', error);
      });

    return this.visualAssetsPreloadPromise;
  }

  get currentState() {
    return this.state;
  }

  get currentScore() {
    return this.score;
  }

  get bestScore() {
    return this.stats.getSnapshot().bestShards;
  }

  private initializeModuleSprites() {
    const slots: RogueliteModuleSlot[] = [
      'plane',
      'propulseur',
      'reacteur_back',
      'reacteur_front',
      'shield',
      'souffleur',
      'wrapper',
      'magnet',
      'big_canon',
      'front_canon',
      'grappin',
      'wings'
    ];
    slots.forEach((slot) => {
      const item = getItemByBaseId(slot, 'common');
      const visual = item?.boatVisual;
      if (!visual) return;
      const sprite = new SpriteSheetPlane({
        textureUrl: visual.spriteSheetUrl,
        layout: { columns: visual.columns, rows: visual.rows },
        width: 2.4,
        height: 1.2,
        alphaTest: 0.08,
        offsetY: 0.18,
        renderOrder: visual.layerOrder
      });
      sprite.setVisible(false);
      this.moduleSprites[slot] = sprite;
      this.player.add(sprite.group);
    });
  }

  private createSimpleRangeIndicator(color: string, opacity: number) {
    const mesh = new THREE.Mesh(
      new THREE.CircleGeometry(0.5, 40),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        depthWrite: false,
        depthTest: false
      })
    );
    mesh.visible = false;
    mesh.renderOrder = 28;
    return mesh;
  }

  private createConeRangeIndicator(color: string, opacity: number, halfAngle: number) {
    const mesh = new THREE.Mesh(
      new THREE.CircleGeometry(0.5, 40, -halfAngle, halfAngle * 2),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        depthWrite: false,
        depthTest: false
      })
    );
    mesh.visible = false;
    mesh.renderOrder = 28;
    this.grapRangeIndicatorHalfAngle = halfAngle;
    return mesh;
  }

  private syncConeRangeIndicatorGeometry(mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>, halfAngle: number) {
    if (Math.abs(this.grapRangeIndicatorHalfAngle - halfAngle) <= 0.0001) {
      return;
    }
    mesh.geometry.dispose();
    mesh.geometry = new THREE.CircleGeometry(0.5, 40, -halfAngle, halfAngle * 2);
    this.grapRangeIndicatorHalfAngle = halfAngle;
  }

  private createRadarRangeIndicator(color: string, opacity: number) {
    const mesh = new THREE.Mesh(
      new THREE.RingGeometry(0.485, 0.5, 56),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        depthWrite: false,
        depthTest: false
      })
    );
    mesh.visible = false;
    mesh.renderOrder = 28;
    return mesh;
  }

  private createWorldHudBillboard(
    canvasWidth: number,
    canvasHeight: number,
    worldWidth: number,
    worldHeight: number,
    renderOrder: number,
    opacity: number
  ): WorldHudBillboard {
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity,
        depthWrite: false,
        depthTest: false,
        toneMapped: false
      })
    );
    sprite.scale.set(worldWidth, worldHeight, 1);
    sprite.renderOrder = renderOrder;
    sprite.visible = false;
    return { canvas, texture, sprite };
  }

  private createUiHudImage(url: string) {
    return getSharedImageAsset(url, { decoding: 'async' });
  }

  private createBillboardPlane(textureUrl: string, width: number, height: number, renderOrder: number) {
    const texture = getSharedTextureAsset(textureUrl, {
      colorSpace: THREE.SRGBColorSpace
    });
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, depthTest: false })
    );
    mesh.visible = false;
    mesh.renderOrder = renderOrder;
    return mesh;
  }

  private createPendingEnemyShot(slot: 'big_canon' | 'front_canon'): PendingEnemyShot {
    return {
      active: false,
      slot,
      targetIndex: null,
      targetPole: null,
      startedAt: 0,
      impactAt: 0,
      start: new THREE.Vector3(),
      target: new THREE.Vector3()
    };
  }

  private resetPendingEnemyShot(shot: PendingEnemyShot) {
    shot.active = false;
    shot.targetIndex = null;
    shot.targetPole = null;
    shot.startedAt = 0;
    shot.impactAt = 0;
    shot.start.set(0, 0, 0);
    shot.target.set(0, 0, 0);
  }

  setTheme(theme: ThemeMode) {
    this.theme = theme;
    this.playerTrail.material.color.set(getThemeNonShardHex(theme));
    this.coins.setTheme(theme);
    this.enemies.setTheme(theme);
    this.shop.setTheme(theme);
    const uiColor = getThemeNonShardHex(theme);
    this.grapRope.material.color.set(uiColor);
    this.sprintFishSpeedStreaks.forEach((streak) => streak.material.color.set(uiColor));
    this.frontCanonLaser.material.color.set(uiColor);
    this.milestonePlayerIndicator.material.color.set(uiColor);
    this.bigCanonRangeIndicator.material.color.set(this.getRarityColor('common'));
    this.bigCanonRadarSweep.material.color.set(this.getRarityColor('common'));
    this.rewardBillboardSignature = '';
  }

  setThemeRequestHandler(handler: ((theme: ThemeMode) => void) | null) {
    this.themeRequestHandler = handler;
  }

  setLocale(locale: 'fr' | 'en') {
    if (this.locale === locale) {
      return;
    }
    this.locale = locale;
    this.rewardBillboardSignature = '';
  }

  syncAchievementResetToken(token: string | null | undefined) {
    if (!this.achievements.syncGlobalResetToken(token)) {
      return false;
    }
    this.achievementToasts.length = 0;
    this.achievementToastSerial = 0;
    this.hudSnapshot.achievements = this.achievements.getPanelSnapshot(this.locale);
    return true;
  }

  recordLeaderboardPosition(position: number) {
    this.achievements.recordLeaderboardPosition(position);
  }

  private getProgressionDirectionSign() {
    return this.path.getWorldDirectionSign();
  }

  private unprojectWorldX(worldX: number) {
    return this.path.unprojectWorldX(worldX);
  }

  private resolveChoiceNode(node: BranchChoice['entry']) {
    return this.path.resolveExternalNode(node, this.currentTime, this.attachedIndex);
  }

  private getDirectionalDelta(fromX: number, toX: number) {
    return (toX - fromX) * this.getProgressionDirectionSign();
  }

  private isMirrorAnchorNode(node: ResolvedGamePathNode) {
    return node.index === 0 || node.isMilestone;
  }

  private getMirrorReverseSpeed(speedX = this.playerVelocity.x) {
    return Math.max(0, -speedX * this.getProgressionDirectionSign());
  }

  private getMirrorLaunchSpeedThreshold(launchSpeed: number) {
    return Math.max(9.6, launchSpeed * 0.68);
  }

  private restoreThemeAfterMirror() {
    const baseTheme = this.mirrorThemeBase;
    this.mirrorThemeBase = null;
    if (!baseTheme || this.theme === baseTheme) {
      return;
    }
    if (this.themeRequestHandler) {
      this.themeRequestHandler(baseTheme);
    } else {
      this.setTheme(baseTheme);
    }
  }

  private isNearCameraBackline(positionX: number, padding: number) {
    return this.getProgressionDirectionSign() > 0
      ? positionX < this.camera.getSafeLeft() + padding
      : positionX > this.camera.getSafeRight() - padding;
  }

  setTransitionProgress(progress: number) {
    this.transitionProgress = clamp(progress, 0, 1);
  }

  onScoreChange(callback: () => void) {
    this.scoreListeners.add(callback);
    return () => this.scoreListeners.delete(callback);
  }

  onAudioEvent(callback: (event: GameAudioEvent) => void) {
    this.audioListeners.add(callback);
    return () => this.audioListeners.delete(callback);
  }

  beginPortalPreview() {
    this.resetRunState();
    this.attachedIndex = 0;
    this.playerState = 'attached';
    this.state = 'portal_preview';
    this.orbitAngle = Math.PI * 0.18;
    this.orbitDirection = -1;
    this.portalPreviewCenter.set(0, 0.8, 0);
    const node = this.getPortalPreviewNode();
    this.angularSpeed = (Math.PI * 2) / Math.max(1.6, node.gameplayOrbitPeriod);
    const orbit = this.getOrbitSample(node, this.orbitAngle);
    const orbitSpeed = Math.max(1, orbit.position.length()) * this.angularSpeed;
    this.syncAttachedPlayerSpatial(node, this.orbitAngle, this.orbitDirection, orbitSpeed, false, orbit);
    this.root.visible = true;
    this.player.visible = true;
    this.playerTrail.visible = true;
    this.shardHudSprite.visible = false;
    this.frontCanonLaser.visible = false;
    this.frontCanonProjectile.visible = false;
    this.bigCanonProjectile.visible = false;
    this.bigCanonRadarSweep.visible = false;
    this.grapRope.visible = false;
    this.coins.reset();
    this.enemies.reset();
    this.shop.reset();
    this.resetAmbientEnemyRuntime();
    this.coins.setVisible(false);
    this.enemies.setVisible(false);
    this.camera.reset(node, this.getProgressionDirectionSign());
    this.trailPoints.forEach((point) => point.copy(this.playerPosition));
    this.syncTrailVisual();
    this.transitionProgress = 0;
    this.portalPreviewDesiredAngle = null;
  }

  startTransition() {
    const preservePortalPreviewBoat = this.state === 'portal_preview';
    const previewPosition = this.player.position.clone();
    const previewRotation = this.player.rotation.clone();
    const previewScale = this.player.scale.clone();
    this.resetRunState();
    this.path.reset();
    this.path.prebuild(RUN_PATH_PREBUILD_COUNT);
    this.camera.reset(this.getResolvedNode(0), this.getProgressionDirectionSign());
    this.state = 'transition_in';
    this.root.visible = true;
    if (preservePortalPreviewBoat) {
      this.player.position.copy(previewPosition);
      this.player.rotation.copy(previewRotation);
      this.player.scale.copy(previewScale);
      this.transitionPlayerStartPosition.copy(previewPosition);
      this.transitionPlayerStartRotation.copy(previewRotation);
      this.transitionPlayerStartScale.copy(previewScale);
    }
    this.player.visible = preservePortalPreviewBoat;
    this.playerTrail.visible = false;
    this.transitionProgress = 0;
  }

  beginRun() {
    const reusePreparedPath = this.state === 'transition_in';
    this.resetRunState();
    if (!reusePreparedPath) {
      this.path.reset();
      this.path.prebuild(RUN_PATH_PREBUILD_COUNT);
    }
    this.syncPathEventBiases();
    this.root.visible = true;
    this.player.visible = true;
    this.playerTrail.visible = true;
    this.attachToNode(0, false, null, null);
    this.camera.reset(this.getResolvedNode(0), this.getProgressionDirectionSign());
    this.awaitingFirstJump = true;
    this.state = 'running_attached';
    this.ambientEnemySpawnReadyAt = this.currentTime + SPECIAL_ENEMY_INITIAL_SPAWN_DELAY_SECONDS;
    this.emitAudioEvent({ type: 'run_start' });
    this.emitScore();
  }

  restart() {
    this.beginRun();
  }

  prepareReturnTransition() {
    this.state = 'transition_out';
    this.chargeActive = false;
    this.upActionActive = false;
    this.wrapperPendingTarget = null;
    this.wrapperTeleportAt = 0;
    this.wrapperHoldUntil = 0;
    this.wrapperVisualUntil = 0;
    this.wrapperCooldownPending = false;
    this.choiceMode = 'none';
    this.activeChoices = [];
    this.hiddenMilestoneChoice = null;
    this.airborneFromMilestone = false;
    this.airborneStartedAt = 0;
    this.shop.reset();
    this.pendingMagnetCoins.clear();
    this.resetPendingEnemyShot(this.frontCanonShot);
    this.resetPendingEnemyShot(this.bigCanonShot);
    this.coins.reset();
    this.enemies.reset();
    this.resetAmbientEnemyRuntime();
    this.player.visible = false;
    this.playerTrail.visible = false;
  }

  stop() {
    this.state = 'idle';
    this.upActionActive = false;
    this.wrapperPendingTarget = null;
    this.wrapperTeleportAt = 0;
    this.wrapperHoldUntil = 0;
    this.wrapperVisualUntil = 0;
    this.wrapperCooldownPending = false;
    this.airborneFromMilestone = false;
    this.airborneStartedAt = 0;
    this.root.visible = false;
    this.player.visible = false;
    this.playerTrail.visible = false;
    this.shop.reset();
    this.pendingMagnetCoins.clear();
    this.resetPendingEnemyShot(this.frontCanonShot);
    this.resetPendingEnemyShot(this.bigCanonShot);
    this.coins.reset();
    this.enemies.reset();
    this.resetAmbientEnemyRuntime();
    this.camera.reset(this.getResolvedNode(0), this.getProgressionDirectionSign());
  }

  getPortalPreviewLayout() {
    const node = this.getPortalPreviewNode();
    return {
      position: new THREE.Vector3(node.resolvedX, node.resolvedY, node.resolvedZ),
      visual: this.buildPortalPreviewVisual(node)
    };
  }

  getPortalPreviewNavigationProgress() {
    if (this.portalPreviewDesiredAngle === null) {
      return 0;
    }
    const remaining = wrapAngle(this.orbitAngle - this.portalPreviewDesiredAngle);
    return clamp(1 - remaining / Math.PI, 0, 1);
  }

  nudgePortalPreview(direction: -1 | 1) {
    void direction;
  }

  preparePortalPreviewTransition(target: 'left' | 'right' | 'forward') {
    if (this.state !== 'portal_preview') {
      return true;
    }
    this.portalPreviewDesiredAngle = this.getPortalPreviewTargetAngle(target);
    return Math.abs(shortestAngleDistance(this.orbitAngle, this.portalPreviewDesiredAngle)) <= 0.045;
  }

  clearPortalPreviewTransitionIntent() {
    this.portalPreviewDesiredAngle = null;
  }

  resetRunState() {
    this.stats.reset(performance.now());
    this.achievements.resetRun();
    this.score = 0;
    this.awaitingFirstJump = false;
    this.chargeActive = false;
    this.upActionActive = false;
    this.chargeMeter = 0;
    this.choiceMode = 'none';
    this.activeChoices = [];
    this.hiddenMilestoneChoice = null;
    this.activeShopAngles = [];
    this.acquisition = null;
    this.landingFeedback = null;
    this.acquisitionStartedAt = 0;
    this.landingFeedbackStartedAt = 0;
    this.achievementToastSerial = 0;
    this.achievementToasts.length = 0;
    this.landingFeedbackNodeIndex = null;
    this.lastLandingFeedbackTriggerNodeIndex = null;
    this.landingFeedbackSerial = 0;
    this.landingFeedbackAirborneSerial = 0;
    this.lastLandingFeedbackConsumedSerial = -1;
    this.gameOverStartedAt = 0;
    this.gameOverCause = null;
    this.jumpVisualUntil = 0;
    this.landingVisualUntil = 0;
    this.currentTime = 0;
    this.attachedIndex = 0;
    this.attachedNodeRuntimeAnchor = null;
    this.displayWindowIndices = [];
    this.displayNextIndex = 0;
    this.orbitGraceActive = false;
    this.orbitGraceProgress = 1;
    this.orbitGraceTravel = 0;
    this.lastLandingDirection = 0;
    this.playerState = 'attached';
    this.orbitAngle = Math.PI * 0.18;
    this.orbitDirection = -1;
    this.angularSpeed = 0;
    this.mirrorLaunchEligible = false;
    this.mirrorLaunchAnchorIndex = null;
    this.mirrorLaunchSpeedThreshold = 0;
    this.restoreThemeAfterMirror();
    this.path.setWorldDirectionTransform(1);
    this.playerPosition.set(0, 0, 0);
    this.playerVelocity.set(0, 0, 0);
    this.playerVelocityTarget.set(0, 0, 0);
    this.playerHeading.set(1, 0);
    this.playerSurfaceNormal.set(0, 1);
    this.runUpgrades = createRunUpgradeState();
    this.remainingExtraJumps = 0;
    this.phaseJumpReadyAt = 0;
    this.teleportReadyAt = 0;
    this.warpReadyAt = 0;
    this.shieldCharges = 0;
    this.souffleurActive = false;
    this.souffleurRequiresFullRecharge = false;
    this.wrapperPendingTarget = null;
    this.wrapperTeleportAt = 0;
    this.wrapperHoldUntil = 0;
    this.wrapperVisualUntil = 0;
    this.wrapperCooldownPending = false;
    this.shieldHitUntil = 0;
    this.shieldRechargeFlashUntil = 0;
    (Object.keys(this.moduleFlashUntil) as RogueliteModuleSlot[]).forEach((slot) => {
      delete this.moduleFlashUntil[slot];
    });
    this.bigCanonAnimStartedAt = 0;
    this.bigCanonAnimUntil = 0;
    this.frontCanonAnimStartedAt = 0;
    this.frontCanonAnimUntil = 0;
    this.resetPendingEnemyShot(this.frontCanonShot);
    this.resetPendingEnemyShot(this.bigCanonShot);
    this.grapState = 'idle';
    this.grapStateUntil = 0;
    this.grapTargetIndex = null;
    this.grapTargetAngle = null;
    this.grapAmbientEnemyId = null;
    this.grapRopeLength = 0;
    this.grapCooldownPending = false;
    this.grapAwaitReleaseBeforePull = true;
    this.grapReleasePending = false;
    this.grapReleasePressedAt = 0;
    this.sprintFishLandingTargetIndex = null;
    this.sprintFishLandingAssistUntil = 0;
    this.eventCooldownUntil = 0;
    this.pendingMagnetCoins.clear();
    this.milestoneChoiceCache.clear();
    this.disabledMilestoneIndices.clear();
    this.airborneFromMilestone = false;
    this.airborneStartedAt = 0;
    this.momentumLossActive = false;
    this.momentum.gauge = 0;
    this.momentum.fillRate = 0;
    this.momentum.decayRate = BASE_MOMENTUM_DECAY_RATE;
    this.momentum.speedMultiplier = 1;
    this.momentum.jumpMultiplier = 1;
    this.momentum.cameraZoomMultiplier = 0;
    this.impactWaves.clear();
    this.playerTrail.geometry.setDrawRange(0, this.trailPoints.length);
    this.trailPoints.forEach((point) => point.set(0, 0, 0));
    this.shardHudSprite.visible = false;
    this.playerMainSprite.setScale(1);
    this.playerBoostSprite.setScale(1);
    this.stickMonkeyAirSprite.setScale(1);
    this.stickMonkeyGlideSprite.setScale(1);
    Object.values(this.moduleSprites).forEach((sprite) => {
      sprite?.setScale(1);
      sprite?.setVisible(false);
    });
    this.magnetRangeIndicator.visible = false;
    this.bigCanonRangeIndicator.visible = false;
    this.bigCanonRadarSweep.visible = false;
    this.grapRangeIndicator.visible = false;
    this.milestonePlayerIndicator.visible = false;
    this.frontCanonLaser.visible = false;
    this.frontCanonProjectile.visible = false;
    this.bigCanonProjectile.visible = false;
    this.grapRope.visible = false;
    this.sprintFishSpeedStreaks.forEach((streak) => {
      streak.visible = false;
      streak.material.opacity = 0;
    });
    this.coins.reset();
    this.enemies.reset();
    this.shop.reset();
    this.resetAmbientEnemyRuntime();
  }

  private syncPathEventBiases() {
    this.path.setEventBiases(this.runUpgrades.modifiers.rewardChance, this.runUpgrades.modifiers.shopChance);
  }

  getInitialPlatformPositions(count: number) {
    this.path.prebuild(Math.max(RUN_PATH_PREBUILD_COUNT, count + PATH_INITIAL_AHEAD_PADDING));
    return this.path.getInitialNodes(count).map((node) => new THREE.Vector3(node.x, node.y, node.z));
  }

  getInitialPlatformScales(count: number) {
    this.path.prebuild(Math.max(RUN_PATH_PREBUILD_COUNT, count + PATH_INITIAL_AHEAD_PADDING));
    return this.path.getInitialNodes(count).map((node) => node.visualScale);
  }

  getInitialPlatformVisuals(count: number): VisiblePlatformVisual[] {
    this.path.prebuild(Math.max(RUN_PATH_PREBUILD_COUNT, count + PATH_INITIAL_AHEAD_PADDING));
    this.initializeDisplayWindow(count);
    return this.getVisiblePlatformVisuals(count);
  }

  getVisiblePlatformLayout(count: number) {
    if (this.platformLayoutCacheCount === count) {
      return this.platformLayoutCache;
    }

    const displayNodes = this.getDisplayNodes(count);
    const positions = this.platformLayoutCache.positions;
    const scales = this.platformLayoutCache.scales;
    const visuals = this.platformLayoutCache.visuals;

    positions.length = displayNodes.length;
    scales.length = displayNodes.length;
    visuals.length = displayNodes.length;

    for (let index = 0; index < displayNodes.length; index += 1) {
      const node = displayNodes[index]!;
      const position = positions[index] ?? (positions[index] = new THREE.Vector3());
      position.set(node.resolvedX, node.resolvedY, node.resolvedZ);
      scales[index] = node.visualScale;
      visuals[index] = this.buildVisiblePlatformVisual(node, node.index === this.attachedIndex && this.playerState !== 'airborne');
    }

    this.platformLayoutCacheCount = count;
    return this.platformLayoutCache;
  }

  getVisiblePlatformPositions(count: number) {
    return this.getVisiblePlatformLayout(count).positions;
  }

  getVisiblePlatformScales(count: number) {
    return this.getVisiblePlatformLayout(count).scales;
  }

  getVisiblePlatformVisuals(count: number): VisiblePlatformVisual[] {
    return this.getVisiblePlatformLayout(count).visuals;
  }

  getRecommendedVisibleCount() {
    const mobileRuntime = isMobileRuntime();
    const baseCount = this.state === 'transition_in' ? (mobileRuntime ? 74 : 82) : mobileRuntime ? 62 : 72;
    const momentumBonus = Math.round(this.momentum.cameraZoomMultiplier * 26 + this.runUpgrades.modifiers.cameraBaseZoomBonus * 6);
    const choiceBonus = this.choiceMode === 'reward_branch' ? 12 : this.choiceMode === 'shop_orbit' ? 8 : 0;
    const streamingSpeed = this.getStreamingForwardSpeed();
    const speedBonus = Math.round(clamp((streamingSpeed - 12) / 1.8, 0, mobileRuntime ? 16 : 22));
    const sprintFishBonus = this.isSprintFishActive() ? (mobileRuntime ? 10 : 14) : 0;
    const current = this.path.getNode(this.attachedIndex);
    const next = this.path.getNode(this.attachedIndex + 1);
    const visibilityBonus = current?.isGigantic || next?.isGigantic ? 24 : current?.eventType !== 'none' || next?.eventType !== 'none' ? 14 : 0;
    const requestedCount = baseCount + momentumBonus + choiceBonus + visibilityBonus + speedBonus + sprintFishBonus;
    return Math.max(mobileRuntime ? 60 : 68, Math.min(mobileRuntime ? 120 : 148, requestedCount));
  }

  private getStreamingForwardSpeed() {
    const sprintEnemy = this.getAmbientEnemyById(this.grapAmbientEnemyId);
    const sprintCarrySpeed =
      this.grapState === 'sprint_fish'
        ? Math.max(
            sprintEnemy?.sprintTowSpeed ?? 0,
            SPRINT_FISH_TOW_SPEED_MAX,
            SPRINT_FISH_TOW_SPEED_MAX * SPRINT_FISH_RELEASE_SPEED_CARRY_RATIO + SPRINT_FISH_PIVOT_FORWARD_BOOST
          )
        : 0;
    return Math.max(
      Math.abs(this.playerVelocity.x),
      this.playerVelocity.length(),
      this.momentum.speedMultiplier * 14,
      sprintCarrySpeed
    );
  }

  private getCameraVisibleHorizontalBounds() {
    const visibleLeft = this.camera.getVisibleLeft();
    const visibleRight = this.camera.getVisibleRight();
    if (Number.isFinite(visibleLeft) && Number.isFinite(visibleRight)) {
      return {
        left: Math.min(visibleLeft, visibleRight),
        right: Math.max(visibleLeft, visibleRight)
      };
    }

    const safeLeft = this.camera.getSafeLeft();
    const safeRight = this.camera.getSafeRight();
    if (Number.isFinite(safeLeft) && Number.isFinite(safeRight)) {
      return {
        left: Math.min(safeLeft, safeRight),
        right: Math.max(safeLeft, safeRight)
      };
    }

    return {
      left: this.playerPosition.x - DEFAULT_COLUMN_DISTANCE * 6,
      right: this.playerPosition.x + DEFAULT_COLUMN_DISTANCE * 8
    };
  }

  private getProjectedStreamingFocusX(streamingSpeed: number, leadSeconds: number) {
    const directionSign = this.getProgressionDirectionSign();
    const projectedByVelocity = this.playerPosition.x + this.playerVelocity.x * leadSeconds;
    const projectedBySpeed = this.playerPosition.x + directionSign * streamingSpeed * leadSeconds;
    if (this.playerState === 'airborne' || this.isSprintFishActive()) {
      return directionSign > 0 ? Math.max(projectedByVelocity, projectedBySpeed) : Math.min(projectedByVelocity, projectedBySpeed);
    }
    return projectedByVelocity;
  }

  private getStreamingAnchorIndex(targetWorldX: number) {
    let anchorIndex = this.attachedIndex;
    if (this.sprintFishLandingTargetIndex !== null) {
      anchorIndex = Math.max(anchorIndex, this.sprintFishLandingTargetIndex);
    }
    if (this.playerState === 'airborne' || this.isSprintFishActive() || this.getStreamingForwardSpeed() > 20) {
      anchorIndex = Math.max(anchorIndex, this.findSprintFishLandingAnchorIndex(targetWorldX, 220));
    }
    return anchorIndex;
  }

  private getStreamingLookaheadPlan(deltaTime: number): StreamingLookaheadPlan {
    const baseVisibleCount = this.getRecommendedVisibleCount();
    const streamingSpeed = this.getStreamingForwardSpeed();
    const directionSign = this.getProgressionDirectionSign();
    const { left: visibleLeft, right: visibleRight } = this.getCameraVisibleHorizontalBounds();
    const visibleSpan = Math.max(DEFAULT_COLUMN_DISTANCE * 4.8, visibleRight - visibleLeft);
    const lookaheadSeconds = this.isSprintFishActive() ? STREAMING_SPRINTFISH_LOOKAHEAD_SECONDS : STREAMING_LOOKAHEAD_SECONDS;
    const framePaddingSeconds = Math.min(STREAMING_LOOKAHEAD_FRAME_PADDING_SECONDS, Math.max(0, deltaTime) * 2.2);
    const cameraPrebindSeconds = this.isSprintFishActive()
      ? STREAMING_SPRINTFISH_CAMERA_PREBIND_SECONDS
      : STREAMING_CAMERA_PREBIND_SECONDS;
    const streamingFocusX = this.getProjectedStreamingFocusX(
      streamingSpeed,
      cameraPrebindSeconds + framePaddingSeconds + (this.isSprintFishActive() ? 0.28 : 0.12)
    );
    const backBufferDistance = Math.max(
      DEFAULT_COLUMN_DISTANCE * STREAMING_CAMERA_BACK_BUFFER_COLUMNS,
      visibleSpan * 0.18
    );
    const forwardBindDistance = THREE.MathUtils.clamp(
      visibleSpan * 0.55 + streamingSpeed * (cameraPrebindSeconds + framePaddingSeconds * 0.85),
      DEFAULT_COLUMN_DISTANCE * STREAMING_CAMERA_FORWARD_BIND_MIN_COLUMNS,
      DEFAULT_COLUMN_DISTANCE * STREAMING_CAMERA_FORWARD_BIND_MAX_COLUMNS
    );
    const logicalReserveDistance = forwardBindDistance + Math.max(
      DEFAULT_COLUMN_DISTANCE * STREAMING_CAMERA_LOGICAL_RESERVE_COLUMNS,
      visibleSpan * 0.34 + streamingSpeed * (lookaheadSeconds * 0.46 + framePaddingSeconds)
    );
    const displayForwardFocusX = streamingFocusX + directionSign * Math.max(visibleSpan * 0.24, DEFAULT_COLUMN_DISTANCE * 1.8);
    const logicalForwardFocusX =
      streamingFocusX +
      directionSign * Math.max(visibleSpan * 0.4, streamingSpeed * (framePaddingSeconds + lookaheadSeconds * 0.36));
    const displayWindowMinX =
      directionSign > 0
        ? visibleLeft - backBufferDistance
        : Math.min(visibleLeft - forwardBindDistance, displayForwardFocusX);
    const displayWindowMaxX =
      directionSign > 0
        ? Math.max(visibleRight + forwardBindDistance, displayForwardFocusX)
        : visibleRight + backBufferDistance;
    const logicalWindowMinX =
      directionSign > 0
        ? visibleLeft - backBufferDistance
        : Math.min(visibleLeft - logicalReserveDistance, logicalForwardFocusX);
    const logicalWindowMaxX =
      directionSign > 0
        ? Math.max(visibleRight + logicalReserveDistance, logicalForwardFocusX)
        : visibleRight + backBufferDistance;
    const streamingAnchorIndex = this.getStreamingAnchorIndex(logicalForwardFocusX);
    const displaySpan = Math.max(DEFAULT_COLUMN_DISTANCE * 3.5, displayWindowMaxX - displayWindowMinX);
    const windowCoverageCount = Math.ceil((displaySpan / DEFAULT_COLUMN_DISTANCE) * STREAMING_NODES_PER_METER * 1.12);
    const visibleCount = Math.max(baseVisibleCount, windowCoverageCount);
    const safetyMeters =
      visibleCount * 0.48 +
      displaySpan / DEFAULT_COLUMN_DISTANCE +
      (streamingSpeed * (lookaheadSeconds + framePaddingSeconds)) / DEFAULT_COLUMN_DISTANCE;
    const aheadNodes = THREE.MathUtils.clamp(
      Math.ceil(safetyMeters * STREAMING_NODES_PER_METER),
      Math.max(visibleCount + 28, STREAMING_MIN_AHEAD_NODES),
      STREAMING_MAX_AHEAD_NODES
    );
    const chunkSize = THREE.MathUtils.clamp(
      Math.ceil(Math.max(STREAMING_MIN_CHUNK_SIZE, aheadNodes * (this.isSprintFishActive() ? 0.68 : 0.6))),
      STREAMING_MIN_CHUNK_SIZE,
      STREAMING_MAX_CHUNK_SIZE
    );
    const desiredFutureSlots = Math.min(
      visibleCount,
      Math.max(Math.ceil(windowCoverageCount * 0.82), Math.ceil(aheadNodes * 0.72))
    );
    return {
      visibleCount,
      aheadNodes,
      chunkSize,
      desiredFutureSlots,
      streamingAnchorIndex,
      displayWindowMinX,
      displayWindowMaxX,
      logicalWindowMinX,
      logicalWindowMaxX
    };
  }

  private maintainStreamingAhead(deltaTime: number) {
    const plan = this.getStreamingLookaheadPlan(deltaTime);
    this.path.ensureAhead(plan.streamingAnchorIndex, plan.aheadNodes, plan.chunkSize);
    this.ensureLogicalStreamingWindowCoverage(plan);
    this.ensureDisplayWindowCoverage(plan);
    return plan;
  }

  private ensureLogicalStreamingWindowCoverage(plan: StreamingLookaheadPlan) {
    let targetAheadNodes = plan.aheadNodes;
    const targetForwardX = this.getProgressionDirectionSign() > 0 ? plan.logicalWindowMaxX : plan.logicalWindowMinX;

    for (let attempt = 0; attempt < STREAMING_MAX_LOGICAL_CATCHUP_PASSES; attempt += 1) {
      const tailNode = this.getResolvedNode(plan.streamingAnchorIndex + targetAheadNodes);
      if (this.isForwardCoverageReady(tailNode, targetForwardX)) {
        return;
      }
      if (targetAheadNodes >= STREAMING_MAX_AHEAD_NODES) {
        return;
      }
      targetAheadNodes = Math.min(STREAMING_MAX_AHEAD_NODES, targetAheadNodes + plan.chunkSize);
      this.path.ensureAhead(plan.streamingAnchorIndex, targetAheadNodes, plan.chunkSize);
    }
  }

  private ensureDisplayWindowCoverage(plan: StreamingLookaheadPlan) {
    this.initializeDisplayWindow(plan.visibleCount);
    this.refreshDisplayWindowOutsideView(plan);
  }

  private isForwardCoverageReady(node: ResolvedGamePathNode, targetX: number) {
    const radius = this.getPhysicalRadius(node);
    return this.getProgressionDirectionSign() > 0
      ? node.resolvedX + radius >= targetX
      : node.resolvedX - radius <= targetX;
  }

  private measureDisplayWindowCoverage(plan: StreamingLookaheadPlan) {
    const { left: visibleLeft, right: visibleRight } = this.getCameraVisibleHorizontalBounds();
    let forwardCoverageEdge = this.getProgressionDirectionSign() > 0 ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
    let visibleNodes = 0;
    let futureSlots = 0;
    let stalePastSlots = 0;

    for (const index of this.displayWindowIndices) {
      const node = this.getResolvedNode(index);
      const radius = this.getPhysicalRadius(node);
      const minX = node.resolvedX - radius;
      const maxX = node.resolvedX + radius;
      if (maxX >= visibleLeft && minX <= visibleRight) {
        visibleNodes += 1;
      }
      if (this.getProgressionDirectionSign() > 0) {
        forwardCoverageEdge = Math.max(forwardCoverageEdge, maxX);
      } else {
        forwardCoverageEdge = Math.min(forwardCoverageEdge, minX);
      }
      if (index > this.attachedIndex) {
        futureSlots += 1;
      }
      if (index < this.attachedIndex - 1) {
        stalePastSlots += 1;
      }
    }

    const futureCoverageMissing =
      this.getProgressionDirectionSign() > 0
        ? forwardCoverageEdge < plan.displayWindowMaxX - DISPLAY_FORWARD_SPAWN_BUFFER
        : forwardCoverageEdge > plan.displayWindowMinX + DISPLAY_FORWARD_SPAWN_BUFFER;

    return {
      futureCoverageMissing,
      futureSlotsMissing: futureSlots < Math.max(6, plan.desiredFutureSlots - STREAMING_DISPLAY_OVERSCAN_NODES),
      visibleCoverageMissing: visibleNodes === 0,
      stalePastCoverage: stalePastSlots > STREAMING_MAX_PRESERVED_PAST_SLOTS
    };
  }

  private getDisplaySlotLockBounds(plan: StreamingLookaheadPlan) {
    return {
      minX: plan.displayWindowMinX - DISPLAY_SLOT_LOCK_BUFFER,
      maxX: plan.displayWindowMaxX + DISPLAY_SLOT_LOCK_BUFFER
    };
  }

  private isDisplaySlotLocked(slot: number, plan: StreamingLookaheadPlan) {
    const index = this.displayWindowIndices[slot];
    if (index === undefined) {
      return false;
    }
    if (index === this.attachedIndex || index === this.attachedIndex + 1) {
      return true;
    }
    const node = this.getResolvedNode(index);
    const radius = this.getPhysicalRadius(node);
    const { minX, maxX } = this.getDisplaySlotLockBounds(plan);
    const nodeMinX = node.resolvedX - radius;
    const nodeMaxX = node.resolvedX + radius;
    if (nodeMaxX >= minX && nodeMinX <= maxX) {
      return true;
    }
    if (this.getProgressionDirectionSign() > 0) {
      return nodeMinX >= plan.displayWindowMinX && nodeMaxX <= plan.displayWindowMaxX && node.index <= this.attachedIndex + 2;
    }
    return nodeMaxX <= plan.displayWindowMaxX && nodeMinX >= plan.displayWindowMinX && node.index <= this.attachedIndex + 2;
  }

  private findDisplaySlotToRecycle(plan: StreamingLookaheadPlan) {
    let bestSlot = -1;
    let bestPriority = Number.NEGATIVE_INFINITY;
    const directionSign = this.getProgressionDirectionSign();

    for (let slot = 0; slot < this.displayWindowIndices.length; slot += 1) {
      if (this.isDisplaySlotLocked(slot, plan)) {
        continue;
      }
      const node = this.getResolvedNode(this.displayWindowIndices[slot]!);
      const radius = this.getPhysicalRadius(node);
      const minX = node.resolvedX - radius;
      const maxX = node.resolvedX + radius;
      const stalePast =
        directionSign > 0
          ? maxX < plan.displayWindowMinX - DISPLAY_SLOT_LOCK_BUFFER
          : minX > plan.displayWindowMaxX + DISPLAY_SLOT_LOCK_BUFFER;
      const outsidePreparedWindow =
        directionSign > 0
          ? minX > plan.logicalWindowMaxX + DISPLAY_FORWARD_REMAP_BUFFER
          : maxX < plan.logicalWindowMinX - DISPLAY_FORWARD_REMAP_BUFFER;
      if (!stalePast && !outsidePreparedWindow) {
        continue;
      }
      const priority = stalePast ? 2 : 1;
      if (priority > bestPriority) {
        bestPriority = priority;
        bestSlot = slot;
      }
    }

    return bestSlot;
  }

  private refreshDisplayWindowOutsideView(plan: StreamingLookaheadPlan, remapLimit = DISPLAY_WINDOW_REMAP_LIMIT) {
    let remaining = remapLimit;
    while (remaining > 0) {
      const coverage = this.measureDisplayWindowCoverage(plan);
      if (
        !coverage.futureCoverageMissing &&
        !coverage.futureSlotsMissing &&
        !coverage.stalePastCoverage
      ) {
        break;
      }

      const slot = this.findDisplaySlotToRecycle(plan);
      if (slot < 0) {
        break;
      }

      this.path.ensureAhead(this.displayNextIndex + 1, plan.aheadNodes, plan.chunkSize);
      const replacementIndex = this.findReplacementDisplayNode(
        slot,
        Math.max(DISPLAY_REPLACEMENT_SEARCH_RANGE, plan.chunkSize + 24),
        plan
      );
      if (replacementIndex === null) {
        break;
      }

      this.displayWindowIndices[slot] = replacementIndex;
      this.displayNextIndex = Math.max(this.displayNextIndex, replacementIndex + 1);
      remaining -= 1;
    }
  }

  private buildVisiblePlatformVisual(node: ResolvedGamePathNode, isCurrent: boolean): VisiblePlatformVisual {
    const localAngle = this.getSurfaceLocalAngle(node, this.orbitAngle);
    const orbitRamp = isCurrent ? (this.orbitGraceActive ? this.orbitGraceProgress : 1) : 1;
    const visualWave = this.getVisualWaveState(node);
    const leftEdge = Math.max(this.camera.getSafeLeft(), this.playerPosition.x - DEFAULT_COLUMN_DISTANCE * 1.35);
    const rightEdge = node.resolvedX + this.getPhysicalRadius(node);
    const leftScreenFragment = clamp(1 - (rightEdge - leftEdge) / 4.2, 0, 1);
    const surpassedFragment =
      node.index < this.attachedIndex
        ? clamp(
            0.42 + (this.playerPosition.x - (node.resolvedX + this.getPhysicalRadius(node) * 0.32)) / Math.max(2.2, DEFAULT_COLUMN_DISTANCE * 0.92),
            0,
            1
          )
        : 0;
    const hiddenSlotVisualBias = isCurrent ? 0.1 + orbitRamp * 0.08 : 0.04;
    const fragmentAmount = clamp(Math.max(leftScreenFragment, surpassedFragment, hiddenSlotVisualBias), 0, 1);
    const passiveStrength = node.isMilestone ? 0.003 : node.shapeKind === 'round' ? 0.018 : node.shapeKind === 'oval' ? 0.038 : 0.048;
    const passiveDensity = node.isMilestone ? 0.18 : node.shapeKind === 'round' ? 0.52 : node.shapeKind === 'oval' ? 0.68 : 0.78;
    const targetDensity = passiveDensity + 0.42 + this.momentum.gauge * 0.34;
    const liveDensity = isCurrent ? THREE.MathUtils.lerp(passiveDensity, targetDensity, orbitRamp) : Math.max(passiveDensity, visualWave?.density ?? passiveDensity);
    const activeStrength = node.isMilestone ? 0.012 + orbitRamp * 0.02 : passiveStrength + 0.18 + orbitRamp * 0.12 + this.momentum.gauge * 0.46;
    const rewardItem = node.offerId ? getItemById(node.offerId) : null;
    const isGuaranteedShopShard = Boolean(node.guaranteedShopIcon);
    const isRandomRewardShard = node.eventVisualKind === 'question' || node.eventType === 'gift' || node.eventType === 'rare_item';
    const movingShardPreviewDirection = node.motionActivatedAt === null ? getMotionPreviewDirection(node) : null;
    const movingShardPreview =
      movingShardPreviewDirection !== null && (node.motionMode === 'landing_once' || node.motionPattern !== 'none');
    const movingShardDirectionAngle = movingShardPreview && movingShardPreviewDirection ? getMotionDirectionAngle(movingShardPreviewDirection) : 0;
    const gravityBeltRadius =
      this.runUpgrades.modifiers.gravityCentering > 0 && !node.isMilestone
        ? clamp(
            1 -
              (Math.hypot(node.resolvedX - this.playerPosition.x, node.resolvedY - this.playerPosition.y) - this.getPhysicalRadius(node)) /
                Math.max(4.8, 6.4 + this.runUpgrades.modifiers.gravityCentering * 4.6),
            0,
            1
          )
        : 0;
    const maskedByMilestone = false;
    const stripePhase = this.currentTime * (node.isMilestone ? 1.1 : 1.95) + localAngle * 1.6;

    return {
      scale: new THREE.Vector3(
        maskedByMilestone ? 0.0001 : node.visualScale * node.visualStretch.x,
        maskedByMilestone ? 0.0001 : node.visualScale * node.visualStretch.y,
        maskedByMilestone ? 0.0001 : node.visualScale * node.visualStretch.z
      ),
      shapeKind: node.shapeKind,
      spinDirection: node.spinDirection,
      spinSpeed: node.spinSpeed,
      spinPhase: node.resolvedSpinPhase,
      tint: null,
      ringTint: null,
      ringScale: 0,
      stripeTint: null,
      stripeMix: 0,
      stripePhase,
      pulse:
        node.isMilestone
          ? 0.18
          : isGuaranteedShopShard
            ? 0.42
            : isRandomRewardShard
              ? 0.48
            : node.colorHint === 'reward'
              ? 0.68
              : node.eventType !== 'none'
                ? 0.34
                : clamp(this.momentum.gauge * 0.22, 0, 0.22) + gravityBeltRadius * 0.08,
      deformAngle: isCurrent ? localAngle : visualWave?.angle ?? 0,
      deformStrength: isCurrent ? activeStrength : Math.max(passiveStrength, visualWave?.strength ?? 0) + (node.isMilestone ? 0 : fragmentAmount * 0.16),
      deformDensity: liveDensity,
      fragmentAmount,
      iconSrc:
        movingShardPreview
          ? SHARD_DIRECTION_ICON_ASSETS[this.theme]
          : node.colorHint === 'reward' && rewardItem
          ? rewardItem.hudIconSrc
          : isGuaranteedShopShard
            ? SHOP_ICON_ASSETS[this.theme]
            : isRandomRewardShard
            ? HELP_ICON_ASSETS[this.theme]
            : null,
      iconText: null,
      iconTint: null,
      iconScale:
        movingShardPreview
          ? clamp(3 + Math.max(node.gameplayRadius, node.visualScale) * 0.4, 3.4, 5.2)
          : node.colorHint === 'reward' && rewardItem
          ? clamp(1.76 + Math.max(node.gameplayRadius, node.visualScale) * 0.36, 2.36, 4.2)
          : isGuaranteedShopShard
            ? 4.2
            : isRandomRewardShard
              ? 2.28
              : 0.34,
      iconOffsetY: movingShardPreview ? clamp(Math.max(node.gameplayRadius, node.visualScale) * 0.04, 0.04, 0.22) : 0,
      iconRotation: movingShardPreview ? movingShardDirectionAngle : 0
    };
  }

  setChargeActive(active: boolean) {
    if (this.isSprintFishActive()) {
      return false;
    }
    if (
      this.state === 'idle' ||
      this.state === 'portal_preview' ||
      this.state === 'transition_in' ||
      this.state === 'transition_out' ||
      this.state === 'game_over'
    ) {
      return false;
    }

    if (active) {
      this.chargeActive = true;
      if (this.playerState === 'attached') {
        this.playerState = 'charging';
        if (this.state === 'running_attached') {
          this.state = 'running_charging';
        }
      }
      return false;
    }

    const shouldLaunch =
      this.chargeActive &&
      (this.playerState === 'charging' || this.playerState === 'attached') &&
      (this.state === 'running_charging' || this.state === 'running_attached' || this.state === 'upgrade_branching');

    this.chargeActive = false;
    if (shouldLaunch) {
      return this.launch();
    }
    return false;
  }

  setGrappleActionActive(active: boolean) {
    if (this.isSprintFishActive()) {
      this.upActionActive = false;
      this.grapReleasePending = false;
      return;
    }
    this.upActionActive = active;
    if (active) {
      return;
    }
    if (this.grapAwaitReleaseBeforePull) {
      this.grapAwaitReleaseBeforePull = false;
    }
    if (this.grapReleasePending && this.grapState === 'hooked' && this.currentTime - this.grapReleasePressedAt < 0.22) {
      this.grapReleasePending = false;
      this.releaseGrapple();
      return;
    }
    this.grapReleasePending = false;
  }

  setUpActionActive(active: boolean) {
    this.setGrappleActionActive(active);
  }

  triggerJump() {
    if (this.isSprintFishActive()) {
      return false;
    }
    if (
      this.state === 'idle' ||
      this.state === 'portal_preview' ||
      this.state === 'transition_in' ||
      this.state === 'transition_out' ||
      this.state === 'game_over'
    ) {
      return false;
    }
    if (this.playerState === 'attached' || this.playerState === 'charging') {
      this.chargeActive = false;
      return this.launch();
    }
    return this.triggerAirborneMobilityAction();
  }

  triggerAirborneMobilityAction() {
    if (this.isSprintFishActive()) {
      return false;
    }
    if (
      this.state === 'idle' ||
      this.state === 'portal_preview' ||
      this.state === 'transition_in' ||
      this.state === 'transition_out' ||
      this.state === 'game_over'
    ) {
      return false;
    }
    if (this.isShopInteractionLocked()) {
      return false;
    }
    if (this.playerState !== 'airborne') {
      return false;
    }
    if (this.tryUseAirborneModuleImpulse()) {
      return true;
    }
    return this.tryConsumeAirborneExtraJump();
  }

  triggerTeleportAction() {
    if (this.isSprintFishActive()) {
      return false;
    }
    if (
      this.state === 'idle' ||
      this.state === 'portal_preview' ||
      this.state === 'transition_in' ||
      this.state === 'transition_out' ||
      this.state === 'game_over'
    ) {
      return false;
    }
    return this.tryActivateWrapper(false, true);
  }

  triggerUpAction() {
    if (this.isSprintFishActive()) {
      return false;
    }
    if (
      this.state === 'idle' ||
      this.state === 'portal_preview' ||
      this.state === 'transition_in' ||
      this.state === 'transition_out' ||
      this.state === 'game_over'
    ) {
      return false;
    }
    return this.triggerAirborneMobilityAction();
  }

  triggerHarpoonAction() {
    if (this.isSprintFishActive()) {
      return false;
    }
    if (
      this.state === 'idle' ||
      this.state === 'portal_preview' ||
      this.state === 'transition_in' ||
      this.state === 'transition_out' ||
      this.state === 'game_over'
    ) {
      return false;
    }
    if (this.isShopInteractionLocked()) {
      return false;
    }
    if ((this.grapTargetIndex !== null || this.grapAmbientEnemyId !== null) && (this.grapState === 'launch' || this.grapState === 'hooked')) {
      if (this.grapState === 'hooked') {
        this.grapReleasePending = true;
        this.grapReleasePressedAt = this.currentTime;
      } else {
        this.releaseGrapple();
      }
      return true;
    }
    return this.tryActivateGrappleFromCurrentState();
  }

  triggerMobileGrappleAction() {
    return this.triggerHarpoonAction();
  }

  triggerMobileAirborneChargeAction() {
    return this.triggerAirborneMobilityAction();
  }

  selectUpgradeFallback(index: number) {
    if (this.state !== 'upgrade_branching') return false;

    if (this.choiceMode === 'shop_orbit') {
      const snapshot = this.stats.getSnapshot();
      const purchased = this.shop.purchaseByIndex(index, snapshot.coins);
      if (!purchased) return false;
      if (!this.stats.spendCoins(purchased.price)) return false;
      this.applyOffer(purchased.offer, 'Shop item', true);
      const node = this.getResolvedNode(this.attachedIndex);
      const shopOffers = this.shop.getActiveOffers().filter((offer) => !offer.purchased).slice(0, 3);
      this.activeChoices = shopOffers.map((shopOffer) => ({
        mode: 'shop_orbit',
        offer: shopOffer.offer,
        price: shopOffer.price,
        entry: node,
        previewNodes: [],
        pathNodes: []
      }));
      this.activeShopAngles = shopOffers.map((shopOffer) => shopOffer.angle);
      if (shopOffers.length === 0) {
        this.choiceMode = 'none';
        this.state = 'upgrade_acquired';
        this.eventCooldownUntil = this.currentTime + 0.35;
      } else {
        this.choiceMode = 'shop_orbit';
        this.state = 'upgrade_branching';
        this.eventCooldownUntil = this.currentTime + 0.1;
      }
      return true;
    }

    if (this.choiceMode !== 'reward_branch') return false;
    return this.commitRewardBranch(index, true);
  }

  closeShopChoice() {
    if (this.choiceMode !== 'shop_orbit' || this.state !== 'upgrade_branching') return false;
    this.dismissActiveShopChoice();
    this.state = this.playerState === 'airborne' ? 'running_airborne' : this.chargeActive ? 'running_charging' : 'running_attached';
    this.eventCooldownUntil = this.currentTime + 0.18;
    return true;
  }

  private dismissActiveShopChoice() {
    if (this.choiceMode !== 'shop_orbit') {
      return;
    }
    this.shop.reset();
    this.choiceMode = 'none';
    this.activeChoices = [];
    this.hiddenMilestoneChoice = null;
    this.activeShopAngles = [];
  }

  private dismissActiveRewardChoice() {
    if (this.choiceMode !== 'reward_branch') {
      return;
    }
    this.choiceMode = 'none';
    this.activeChoices = [];
    this.hiddenMilestoneChoice = null;
    this.activeShopAngles = [];
  }

  private isShopInteractionLocked() {
    return this.choiceMode === 'shop_orbit' && this.state === 'upgrade_branching';
  }

  getCameraPose() {
    return this.camera.getPose();
  }

  getPlayerFocusPoint() {
    const source = this.player.visible ? this.player.position : this.playerPosition;
    return source.clone().add(new THREE.Vector3(0, 0.42, 0.04));
  }

  getParallaxAnchor(target = new THREE.Vector3()) {
    const node = this.state === 'portal_preview' ? this.getPortalPreviewNode() : this.getResolvedNode(this.attachedIndex);
    return target.set(node.resolvedX, node.resolvedY, node.resolvedZ);
  }

  getParallaxCoverageAnchorX() {
    return this.getCameraPose().lookAt.x;
  }

  getParallaxViewState() {
    const currentNode = this.state === 'portal_preview' ? this.getPortalPreviewNode() : this.getResolvedNode(this.attachedIndex);
    const milestoneView = currentNode.isGigantic && this.playerState !== 'airborne';
    const fixedCameraView =
      milestoneView ||
      (this.isShopInteractionLocked() && this.playerState !== 'airborne') ||
      this.state === 'upgrade_branching' ||
      this.state === 'upgrade_acquired' ||
      this.state === 'game_over' ||
      this.state === 'portal_preview' ||
      this.state === 'transition_in' ||
      this.state === 'transition_out';

    const worldBounds = this.getParallaxWorldBounds();

    return {
      visibleMinY: this.camera.getSafeBottom(),
      visibleMaxY: this.camera.getSafeTop(),
      playableMinY: worldBounds.minY,
      playableMaxY: worldBounds.maxY,
      playerY: this.playerPosition.y,
      cameraFollowsPlayer: !fixedCameraView,
      isMilestoneView: milestoneView
    };
  }

  getParallaxWorldBounds() {
    const outerLaneExtent = getPathVerticalExtent(200);
    const shardPadding = DEFAULT_COLUMN_DISTANCE * 1.2;
    const maxCameraZoom =
      (isMobileRuntime() ? 40.5 : 50.8) +
      16.2 +
      6.4 +
      6.8 +
      8.8 * 1.28 * 1.45;
    const upperPlayableLimit = Math.max(outerLaneExtent + shardPadding, CAMERA_VERTICAL_TRACK_MAX_Y + DEFAULT_COLUMN_DISTANCE * 0.32);
    const lowerPlayableLimit = Math.max(outerLaneExtent + shardPadding, Math.abs(CAMERA_VERTICAL_TRACK_MIN_Y) + DEFAULT_COLUMN_DISTANCE * 0.32);
    return {
      minY: -lowerPlayableLimit,
      maxY: upperPlayableLimit,
      maxCameraZoom
    };
  }

  isMirrorModeActive() {
    return this.getProgressionDirectionSign() < 0;
  }

  private resetAmbientEnemyRuntime() {
    this.ambientEnemies.length = 0;
    this.ambientEnemySpawnReadyAt = 0;
    this.ambientEnemySerial = 0;
    this.sprintFishStartX = 0;
    this.grapAmbientEnemyId = null;
  }

  private getAmbientEnemyById(id: string | null) {
    if (!id) {
      return null;
    }
    return this.ambientEnemies.find((enemy) => enemy.id === id) ?? null;
  }

  private isSprintFishActive() {
    const sprintEnemy = this.getAmbientEnemyById(this.grapAmbientEnemyId);
    return this.grapState === 'sprint_fish' && sprintEnemy?.state === 'sprint_fish';
  }

  private debugAmbientEnemy(event: string, extra: Record<string, unknown> = {}) {
    if (!SPECIAL_ENEMY_DEBUG_LOGS) {
      return;
    }
    console.info('[AmbientEnemy]', event, {
      time: Math.round(this.currentTime * 100) / 100,
      activeCount: this.ambientEnemies.length,
      sprintTarget: this.grapAmbientEnemyId,
      ...extra
    });
  }

  private getAmbientEnemyDirectionSign(kind: AmbientEnemyKind) {
    if (kind === 'enemyTop') {
      return this.isMirrorModeActive() ? 1 : -1;
    }
    return this.isMirrorModeActive() ? -1 : 1;
  }

  private getAmbientEnemyBaseHalfExtents(enemy: AmbientEnemyRuntime) {
    if (enemy.kind === 'enemyTop') {
      return {
        x: 1.34 * enemy.scale,
        y: 0.82 * enemy.scale,
        z: SPECIAL_ENEMY_BODY_Z_HALF
      };
    }
    return {
      x: 1.08 * enemy.scale,
      y: 0.92 * enemy.scale,
      z: SPECIAL_ENEMY_BODY_Z_HALF
    };
  }

  private getAmbientEnemyContactExtents(enemy: AmbientEnemyRuntime, airborne: boolean) {
    const base = this.getAmbientEnemyBaseHalfExtents(enemy);
    const movementInflation = airborne ? 0.1 : 0.04;
    return {
      x: base.x + PLAYER_PROGRESS_HALF_WIDTH * 0.42 + movementInflation,
      y: base.y + PLAYER_COLLISION_HALF_HEIGHT * 0.42 + movementInflation,
      z: base.z
    };
  }

  private isAmbientEnemyWithinContact(enemy: AmbientEnemyRuntime, previousPosition: THREE.Vector3, airborne: boolean) {
    const contactExtents = this.getAmbientEnemyContactExtents(enemy, airborne);
    const segmentX = this.playerPosition.x - previousPosition.x;
    const segmentY = this.playerPosition.y - previousPosition.y;
    const segmentZ = this.playerPosition.z - previousPosition.z;
    const segmentLengthSq = segmentX * segmentX + segmentY * segmentY + segmentZ * segmentZ;
    if (segmentLengthSq <= 0.0001) {
      const deltaX = (this.playerPosition.x - enemy.position.x) / Math.max(0.001, contactExtents.x);
      const deltaY = (this.playerPosition.y - enemy.position.y) / Math.max(0.001, contactExtents.y);
      return deltaX * deltaX + deltaY * deltaY <= 1;
    }
    const toEnemyX = enemy.position.x - previousPosition.x;
    const toEnemyY = enemy.position.y - previousPosition.y;
    const toEnemyZ = enemy.position.z - previousPosition.z;
    const projection = clamp((toEnemyX * segmentX + toEnemyY * segmentY + toEnemyZ * segmentZ) / segmentLengthSq, 0, 1);
    const closestX = previousPosition.x + segmentX * projection;
    const closestY = previousPosition.y + segmentY * projection;
    const closestZ = previousPosition.z + segmentZ * projection;
    const deltaX = (enemy.position.x - closestX) / Math.max(0.001, contactExtents.x);
    const deltaY = (enemy.position.y - closestY) / Math.max(0.001, contactExtents.y);
    const deltaZ = (enemy.position.z - closestZ) / Math.max(0.001, contactExtents.z);
    return deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ <= 1;
  }

  private resolveAmbientEnemyTopY(_enemy: AmbientEnemyRuntime) {
    return SPECIAL_ENEMY_TOP_WORLD_Y;
  }

  private resolveAmbientEnemyBotBandHeights(_enemy: AmbientEnemyRuntime) {
    return {
      visibleY: SPECIAL_ENEMY_BOT_VISIBLE_Y,
      hiddenY: SPECIAL_ENEMY_BOT_HIDDEN_Y
    };
  }

  private setAmbientEnemyBotPhase(enemy: AmbientEnemyRuntime, phase: AmbientEnemyBotPhase) {
    enemy.botPhase = phase;
    enemy.botPhaseStartedAt = this.currentTime;
    if (phase === 'hidden_below_screen') {
      enemy.position.y = enemy.hiddenY;
      return;
    }
    if (phase === 'visible_airborne') {
      enemy.position.y = enemy.visibleY;
    }
  }

  private updateAmbientEnemyBotVerticalMotion(enemy: AmbientEnemyRuntime) {
    const band = this.resolveAmbientEnemyBotBandHeights(enemy);
    enemy.visibleY = band.visibleY;
    enemy.hiddenY = band.hiddenY;
    const phase = enemy.botPhase ?? 'hidden_below_screen';
    const phaseElapsed = this.currentTime - enemy.botPhaseStartedAt;
    if (phase === 'hidden_below_screen') {
      enemy.position.y = enemy.hiddenY;
      if (phaseElapsed >= enemy.botHiddenDuration) {
        this.setAmbientEnemyBotPhase(enemy, 'jumping_up');
      }
      return;
    }
    if (phase === 'jumping_up') {
      const progress = clamp(phaseElapsed / Math.max(0.001, enemy.botJumpDuration), 0, 1);
      enemy.position.y = THREE.MathUtils.lerp(enemy.hiddenY, enemy.visibleY, THREE.MathUtils.smootherstep(progress, 0, 1));
      if (progress >= 1) {
        this.setAmbientEnemyBotPhase(enemy, 'visible_airborne');
      }
      return;
    }
    if (phase === 'visible_airborne') {
      const airborneProgress = clamp(phaseElapsed / Math.max(0.001, enemy.botVisibleDuration), 0, 1);
      const floatOffset = -Math.sin(airborneProgress * Math.PI) * SPECIAL_ENEMY_BOT_VISIBLE_FLOAT_AMPLITUDE;
      enemy.position.y = enemy.visibleY + floatOffset;
      if (phaseElapsed >= enemy.botVisibleDuration) {
        this.setAmbientEnemyBotPhase(enemy, 'falling_down');
      }
      return;
    }
    const progress = clamp(phaseElapsed / Math.max(0.001, enemy.botFallDuration), 0, 1);
    enemy.position.y = THREE.MathUtils.lerp(enemy.visibleY, enemy.hiddenY, THREE.MathUtils.smootherstep(progress, 0, 1));
    if (progress >= 1) {
      this.setAmbientEnemyBotPhase(enemy, 'hidden_below_screen');
    }
  }

  private isAmbientEnemyBotVisible(enemy: AmbientEnemyRuntime) {
    if (enemy.kind !== 'enemyBot' || enemy.state !== 'alive') {
      return false;
    }
    const baseHalfExtents = this.getAmbientEnemyBaseHalfExtents(enemy);
    return (
      enemy.botPhase !== 'hidden_below_screen' &&
      enemy.position.y + baseHalfExtents.y >= this.camera.getSafeBottom() - Math.max(4.2, baseHalfExtents.y * 1.8)
    );
  }

  private isAmbientEnemyMarkerVisible(enemy: AmbientEnemyRuntime) {
    const halfExtents = this.getAmbientEnemyBaseHalfExtents(enemy);
    const bottomBuffer = enemy.kind === 'enemyBot' ? 5.8 : 1.2;
    return (
      enemy.position.x + halfExtents.x >= this.camera.getSafeLeft() - 0.8 &&
      enemy.position.x - halfExtents.x <= this.camera.getSafeRight() + 0.8 &&
      enemy.position.y + halfExtents.y >= this.camera.getSafeBottom() - bottomBuffer &&
      enemy.position.y - halfExtents.y <= this.camera.getSafeTop() + 1.2
    );
  }

  private hasAmbientEnemySpawnSpacingConflict(spawnX: number, spawnY: number, kind: AmbientEnemyKind) {
    return this.ambientEnemies.some((enemy) => {
      const spacingX = Math.abs(enemy.position.x - spawnX);
      const spacingY = Math.abs(enemy.position.y - spawnY);
      if (spacingX < SPECIAL_ENEMY_MIN_SPAWN_SPACING_X && spacingY < SPECIAL_ENEMY_MIN_SPAWN_SPACING_Y) {
        return true;
      }
      if (enemy.kind === kind && spacingX < SPECIAL_ENEMY_MIN_SPAWN_SPACING_X * 1.2) {
        return true;
      }
      return false;
    });
  }

  private scheduleNextAmbientEnemySpawn() {
    this.ambientEnemySpawnReadyAt =
      this.currentTime + THREE.MathUtils.lerp(SPECIAL_ENEMY_SPAWN_MIN_SECONDS, SPECIAL_ENEMY_SPAWN_MAX_SECONDS, Math.random());
  }

  private getAmbientEnemyActiveCountByKind() {
    return this.ambientEnemies.reduce(
      (counts, enemy) => {
        counts[enemy.kind] += 1;
        return counts;
      },
      {
        enemyTop: 0,
        enemyBot: 0
      } satisfies Record<AmbientEnemyKind, number>
    );
  }

  private removeAmbientEnemy(enemyId: string, reason: string) {
    const enemyIndex = this.ambientEnemies.findIndex((enemy) => enemy.id === enemyId);
    if (enemyIndex < 0) {
      return;
    }
    this.debugAmbientEnemy('despawn', {
      enemyId,
      reason
    });
    this.ambientEnemies.splice(enemyIndex, 1);
    if (this.grapAmbientEnemyId === enemyId && this.grapState !== 'idle' && this.grapState !== 'landing') {
      this.beginGrappleLanding();
    } else {
      if (this.grapAmbientEnemyId === enemyId) {
        this.grapAmbientEnemyId = null;
      }
    }
    if (this.grapAmbientEnemyId === null) {
      this.sprintFishStartX = 0;
    }
  }

  private spawnAmbientEnemy() {
    if (this.currentTime < this.ambientEnemySpawnReadyAt) {
      return;
    }
    if (this.ambientEnemies.length >= SPECIAL_ENEMY_MAX_ACTIVE) {
      this.debugAmbientEnemy('spawn_skipped', { reason: 'max_active_reached' });
      this.scheduleNextAmbientEnemySpawn();
      return;
    }
    if (this.choiceMode !== 'none' || this.state === 'upgrade_branching' || this.state === 'upgrade_acquired' || this.state === 'game_over') {
      this.debugAmbientEnemy('spawn_skipped', { reason: 'state_blocked', state: this.state, choiceMode: this.choiceMode });
      this.scheduleNextAmbientEnemySpawn();
      return;
    }

    const activeCountByKind = this.getAmbientEnemyActiveCountByKind();
    const availableKinds: AmbientEnemyKind[] = [];
    if (activeCountByKind.enemyTop < SPECIAL_ENEMY_MAX_ACTIVE_PER_KIND && this.resolveAmbientEnemyTopY({
      id: '',
      kind: 'enemyTop',
      state: 'alive',
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      scale: 1,
      sizeVariant: 0,
      rewardCoins: 0,
      spawnedAt: this.currentTime,
      stateStartedAt: this.currentTime,
      deathDuration: 0.72,
      phaseOffset: 0,
      cycleDuration: 0,
      topBandOffset: 0,
      bottomVisibleOffset: 0,
      bottomHiddenOffset: 0,
      cruiseY: 0,
      visibleY: 0,
      hiddenY: 0,
      botPhase: 'hidden_below_screen',
      botPhaseStartedAt: this.currentTime,
      botJumpDuration: SPECIAL_ENEMY_BOT_JUMP_DURATION,
      botVisibleDuration: SPECIAL_ENEMY_BOT_VISIBLE_DURATION,
      botFallDuration: SPECIAL_ENEMY_BOT_FALL_DURATION,
      botHiddenDuration: SPECIAL_ENEMY_BOT_HIDDEN_DURATION,
      sprintPivotActive: false,
      sprintPivotAngle: 0,
      sprintPivotRadius: 0,
      sprintPivotAngularSpeed: 0,
      sprintPivotAngularDirection: 1,
      sprintPivotReleaseAngle: SPRINT_FISH_PIVOT_RELEASE_ANGLE,
      sprintTowSpeed: 0,
      debugLineIndex: 0,
      debugTint: null,
      zOffset: 0.92,
      bounceCooldownUntil: 0,
      killCredited: false,
      mirrored: this.isMirrorModeActive()
    }) !== null) {
      availableKinds.push('enemyTop');
    }
    if (activeCountByKind.enemyBot < SPECIAL_ENEMY_MAX_ACTIVE_PER_KIND) {
      availableKinds.push('enemyBot');
    }
    if (availableKinds.length === 0) {
      this.debugAmbientEnemy('spawn_rejected', { reason: 'kind_cap_reached', activeCountByKind });
      this.scheduleNextAmbientEnemySpawn();
      return;
    }

    const distanceMeters = this.stats.getSnapshot().distanceMeters;
    const spawnChance =
      distanceMeters < SPECIAL_ENEMY_EARLY_DISTANCE_METERS
        ? SPECIAL_ENEMY_EARLY_SPAWN_CHANCE
        : SPECIAL_ENEMY_DEFAULT_SPAWN_CHANCE;
    if (Math.random() > spawnChance) {
      this.debugAmbientEnemy('spawn_rejected', { reason: 'chance_roll_failed', spawnChance });
      this.scheduleNextAmbientEnemySpawn();
      return;
    }

    const sortedKinds = [...availableKinds].sort((left, right) => {
      const leftCount = activeCountByKind[left];
      const rightCount = activeCountByKind[right];
      if (leftCount !== rightCount) {
        return leftCount - rightCount;
      }
      return Math.random() < 0.5 ? -1 : 1;
    });
    const kind = sortedKinds[0] ?? 'enemyBot';
    const debugLineIndex = 0;
    const debugTint = null;
    const sizeVariant = Math.floor(Math.random() * AMBIENT_ENEMY_SCALE_VARIANTS.length) as 0 | 1 | 2 | 3;
    const scale = AMBIENT_ENEMY_SCALE_VARIANTS[sizeVariant] ?? 1;
    const directionSign = this.getAmbientEnemyDirectionSign(kind);
    const speed = (kind === 'enemyTop' ? SPECIAL_ENEMY_TOP_SPEED : SPECIAL_ENEMY_BOT_SPEED) + sizeVariant * 0.34;
    const halfExtents = kind === 'enemyTop'
      ? { x: 1.34 * scale, y: 0.82 * scale }
      : { x: 1.08 * scale, y: 0.92 * scale };
    const progressionDirectionSign = this.getProgressionDirectionSign();
    const spawnX =
      kind === 'enemyBot'
        ? progressionDirectionSign > 0
          ? this.camera.getSafeRight() - halfExtents.x * 0.55
          : this.camera.getSafeLeft() + halfExtents.x * 0.55
        : directionSign > 0
          ? this.camera.getSafeLeft() - halfExtents.x - DEFAULT_COLUMN_DISTANCE * 0.7
          : this.camera.getSafeRight() + halfExtents.x + DEFAULT_COLUMN_DISTANCE * 0.7;
    const runtime: AmbientEnemyRuntime = {
      id: `ambient-enemy-${++this.ambientEnemySerial}`,
      kind,
      state: 'alive',
      position: new THREE.Vector3(spawnX, 0, 0),
      velocity: new THREE.Vector3(directionSign * speed, 0, 0),
      scale,
      sizeVariant,
      rewardCoins: kind === 'enemyTop' ? 5 + sizeVariant : 6 + sizeVariant,
      spawnedAt: this.currentTime,
      stateStartedAt: this.currentTime,
      deathDuration: 0.78,
      phaseOffset: 0,
      cycleDuration: 0,
      topBandOffset: 0,
      bottomVisibleOffset: 0,
      bottomHiddenOffset: 0,
      cruiseY: 0,
      visibleY: 0,
      hiddenY: 0,
      botPhase: kind === 'enemyBot' ? 'hidden_below_screen' : null,
      botPhaseStartedAt: this.currentTime,
      botJumpDuration: SPECIAL_ENEMY_BOT_JUMP_DURATION,
      botVisibleDuration: SPECIAL_ENEMY_BOT_VISIBLE_DURATION,
      botFallDuration: SPECIAL_ENEMY_BOT_FALL_DURATION,
      botHiddenDuration: SPECIAL_ENEMY_BOT_HIDDEN_DURATION,
      sprintPivotActive: false,
      sprintPivotAngle: 0,
      sprintPivotRadius: 0,
      sprintPivotAngularSpeed: 0,
      sprintPivotAngularDirection: 1,
      sprintPivotReleaseAngle: SPRINT_FISH_PIVOT_RELEASE_ANGLE,
      sprintTowSpeed: 0,
      debugLineIndex,
      debugTint,
      zOffset: kind === 'enemyTop' ? 0.92 : 0.84,
      bounceCooldownUntil: 0,
      killCredited: false,
      mirrored: this.isMirrorModeActive()
    };

    if (kind === 'enemyTop') {
      const topY = this.resolveAmbientEnemyTopY(runtime);
      if (topY === null) {
        this.debugAmbientEnemy('spawn_rejected', { reason: 'top_band_invalid' });
        this.scheduleNextAmbientEnemySpawn();
        return;
      }
      runtime.cruiseY = topY;
      runtime.position.y = topY;
    } else {
      const botBand = this.resolveAmbientEnemyBotBandHeights(runtime);
      runtime.visibleY = botBand.visibleY;
      runtime.hiddenY = botBand.hiddenY;
      runtime.cruiseY = runtime.visibleY;
      runtime.position.y = runtime.hiddenY;
      runtime.botPhaseStartedAt -= runtime.botHiddenDuration * SPECIAL_ENEMY_BOT_INITIAL_HIDDEN_PROGRESS;
      this.debugAmbientEnemy('bot_band', {
        enemyId: runtime.id,
        safeBottom: Math.round(this.camera.getSafeBottom() * 100) / 100,
        visibleY: Math.round(runtime.visibleY * 100) / 100,
        hiddenY: Math.round(runtime.hiddenY * 100) / 100,
        debugLineIndex: runtime.debugLineIndex,
        debugTint: runtime.debugTint
      });
    }

    if (this.hasAmbientEnemySpawnSpacingConflict(runtime.position.x, runtime.position.y, runtime.kind)) {
      this.debugAmbientEnemy('spawn_rejected', {
        reason: 'spacing_conflict',
        kind: runtime.kind,
        x: runtime.position.x,
        y: runtime.position.y
      });
      this.scheduleNextAmbientEnemySpawn();
      return;
    }

    this.ambientEnemies.push(runtime);
    this.debugAmbientEnemy('spawned', {
      enemyId: runtime.id,
      kind: runtime.kind,
      x: Math.round(runtime.position.x * 100) / 100,
      y: Math.round(runtime.position.y * 100) / 100,
      debugLineIndex: runtime.debugLineIndex,
      debugTint: runtime.debugTint
    });
    this.scheduleNextAmbientEnemySpawn();
  }

  private awardAmbientEnemyKill(enemy: AmbientEnemyRuntime, source: 'impact' | 'shield' = 'impact') {
    if (enemy.killCredited) {
      return;
    }
    enemy.killCredited = true;
    if (enemy.rewardCoins > 0) {
      this.awardCoins(this.applyCoinBonus(enemy.rewardCoins));
      enemy.rewardCoins = 0;
    }
    this.recordEnemyKill({ amount: 1, source });
    this.emitScore();
    this.emitAudioEvent({ type: 'enemy_die' });
  }

  private applyAmbientEnemyBounce(enemy: AmbientEnemyRuntime, previousPosition: THREE.Vector3, bounceStrength = 1) {
    const away = this.scratchVector.copy(this.playerPosition).sub(enemy.position);
    if (away.lengthSq() <= 0.0001) {
      away.copy(this.playerPosition).sub(previousPosition);
    }
    if (away.lengthSq() <= 0.0001) {
      away.set(this.getProgressionDirectionSign(), 0.2, 0);
    }
    away.normalize();
    const forward = this.scratchVectorB.set(this.getProgressionDirectionSign(), 0, 0);
    const impulse = Math.max(4.8, this.playerVelocity.length() * 0.76 + 3.1) * bounceStrength;
    this.playerPosition.addScaledVector(away, 0.18 + bounceStrength * 0.06);
    this.playerVelocity.copy(away.multiplyScalar(impulse)).addScaledVector(forward, 1.1);
    this.playerHeading.set(this.playerVelocity.x || this.getProgressionDirectionSign(), this.playerVelocity.y || 0).normalize();
    this.playerSurfaceNormal.set(-this.playerHeading.y, this.playerHeading.x).normalize();
    this.playerState = 'airborne';
    this.state = 'running_airborne';
    this.chargeActive = false;
    this.airborneFromMilestone = false;
    this.airborneStartedAt = this.currentTime;
    if (this.grapState !== 'idle') {
      this.beginGrappleLanding();
    }
  }

  private startAmbientEnemyDeath(enemy: AmbientEnemyRuntime) {
    if (enemy.state !== 'alive') {
      return;
    }
    this.awardAmbientEnemyKill(enemy, 'impact');
    enemy.state = 'dying';
    enemy.stateStartedAt = this.currentTime;
    enemy.velocity.x *= 0.24;
    enemy.velocity.y = -1.8;
    if (enemy.kind === 'enemyBot') {
      enemy.position.y = enemy.visibleY;
    }
  }

  private beginSprintFish(enemy: AmbientEnemyRuntime) {
    const directionSign = this.getAmbientEnemyDirectionSign(enemy.kind);
    const baseTravelSpeed = Math.max(SPECIAL_ENEMY_BOT_SPEED, Math.abs(enemy.velocity.x));
    enemy.state = 'sprint_fish';
    enemy.stateStartedAt = this.currentTime;
    enemy.sprintPivotActive = false;
    enemy.sprintPivotAngle = 0;
    enemy.sprintPivotRadius = 0;
    enemy.sprintPivotAngularSpeed = 0;
    enemy.sprintPivotAngularDirection = 1;
    enemy.sprintPivotReleaseAngle = SPRINT_FISH_PIVOT_RELEASE_ANGLE;
    enemy.sprintTowSpeed = clamp(baseTravelSpeed * SPRINT_FISH_TOW_SPEED_MULTIPLIER, SPRINT_FISH_TOW_SPEED_MIN, SPRINT_FISH_TOW_SPEED_MAX);
    enemy.velocity.x = directionSign * enemy.sprintTowSpeed;
    this.grapState = 'sprint_fish';
    this.grapAmbientEnemyId = enemy.id;
    this.grapTargetIndex = null;
    this.grapTargetAngle = null;
    this.grapStateUntil = Number.POSITIVE_INFINITY;
    this.grapAwaitReleaseBeforePull = false;
    this.grapReleasePending = false;
    this.playerState = 'airborne';
    this.state = 'running_airborne';
    this.chargeActive = false;
    this.upActionActive = false;
    this.grapRopeLength = Math.max(this.grapRopeLength, SPRINT_FISH_PULL_OFFSET_X * 0.96);
    this.sprintFishStartX = enemy.position.x;
    enemy.position.y = enemy.visibleY;
  }

  private startSprintFishPivot(enemy: AmbientEnemyRuntime) {
    const directionSign = this.getAmbientEnemyDirectionSign(enemy.kind);
    const pivotOffset = this.scratchVector.copy(this.playerPosition).sub(enemy.position);
    if (pivotOffset.lengthSq() <= 0.0001) {
      pivotOffset.set(-directionSign * SPRINT_FISH_PULL_OFFSET_X, SPRINT_FISH_PULL_OFFSET_Y, 0);
    }
    enemy.sprintPivotActive = true;
    enemy.stateStartedAt = this.currentTime;
    enemy.velocity.x = 0;
    enemy.position.y = enemy.visibleY;
    enemy.sprintPivotRadius = clamp(pivotOffset.length(), SPRINT_FISH_PIVOT_MIN_RADIUS, SPRINT_FISH_PIVOT_MAX_RADIUS);
    enemy.sprintPivotAngle = Math.atan2(pivotOffset.y, pivotOffset.x);
    enemy.sprintPivotAngularDirection = directionSign > 0 ? -1 : 1;
    const targetPivotSpeed = Math.max(
      enemy.sprintTowSpeed,
      Math.abs(this.playerVelocity.x),
      Math.abs(this.playerVelocity.y) + SPRINT_FISH_PIVOT_UP_BOOST
    );
    enemy.sprintPivotAngularSpeed = clamp(
      targetPivotSpeed / Math.max(0.9, enemy.sprintPivotRadius),
      SPRINT_FISH_PIVOT_MIN_ANGULAR_SPEED,
      SPRINT_FISH_PIVOT_MAX_ANGULAR_SPEED
    );
    enemy.sprintPivotReleaseAngle = SPRINT_FISH_PIVOT_RELEASE_ANGLE;
  }

  private getSprintFishPivotTangent(enemy: AmbientEnemyRuntime, out: THREE.Vector3) {
    const sin = Math.sin(enemy.sprintPivotAngle);
    const cos = Math.cos(enemy.sprintPivotAngle);
    return out.set(-sin * enemy.sprintPivotAngularDirection, cos * enemy.sprintPivotAngularDirection, 0);
  }

  private finishSprintFish(enemy: AmbientEnemyRuntime) {
    const directionSign = this.getAmbientEnemyDirectionSign(enemy.kind);
    this.awardAmbientEnemyKill(enemy, 'impact');
    const pivotTangent = enemy.sprintPivotActive
      ? this.getSprintFishPivotTangent(enemy, this.scratchVector)
      : this.scratchVector.set(directionSign, 0.18, 0).normalize();
    const tangentialSpeed = enemy.sprintPivotActive ? enemy.sprintPivotRadius * enemy.sprintPivotAngularSpeed : enemy.sprintTowSpeed;
    const releaseCarrySpeed = Math.max(tangentialSpeed, enemy.sprintTowSpeed * SPRINT_FISH_RELEASE_SPEED_CARRY_RATIO);
    this.playerVelocity.copy(
      pivotTangent.multiplyScalar(releaseCarrySpeed).add(
        this.scratchVectorB.set(directionSign * SPRINT_FISH_PIVOT_FORWARD_BOOST, SPRINT_FISH_PIVOT_UP_BOOST, 0)
      )
    );
    this.fillMomentumBurst(0.06);
    this.playerHeading.set(this.playerVelocity.x || directionSign, this.playerVelocity.y || 0).normalize();
    this.playerSurfaceNormal.set(-this.playerHeading.y, this.playerHeading.x).normalize();
    this.playerState = 'airborne';
    this.state = 'running_airborne';
    this.chargeActive = false;
    this.airborneFromMilestone = false;
    this.airborneStartedAt = this.currentTime;
    this.beginGrappleLanding();
    this.prepareSprintFishLandingAssist();
    this.removeAmbientEnemy(enemy.id, 'sprint_finished');
  }

  private clearSprintFishLandingAssist() {
    this.sprintFishLandingTargetIndex = null;
    this.sprintFishLandingAssistUntil = 0;
  }

  private findSprintFishLandingAnchorIndex(targetWorldX: number, maxSearch = 120) {
    const directionSign = this.getProgressionDirectionSign();
    let previousIndex = this.attachedIndex;
    for (let index = Math.max(0, this.attachedIndex + 1); index <= this.attachedIndex + maxSearch; index += 1) {
      const node = this.getResolvedNode(index);
      const directionalDelta = (node.resolvedX - targetWorldX) * directionSign;
      if (directionalDelta >= 0) {
        return Math.max(this.attachedIndex, index - 1);
      }
      previousIndex = index;
    }
    return previousIndex;
  }

  private findSprintFishLandingTarget(searchLimit: number, predictedX: number, predictedY: number) {
    let bestNode: ResolvedGamePathNode | null = null;
    let bestScore = Number.NEGATIVE_INFINITY;
    const directionSign = this.getProgressionDirectionSign();

    for (let index = Math.max(this.attachedIndex + 1, 0); index <= searchLimit; index += 1) {
      const node = this.getResolvedNode(index);
      if (node.enemySlot?.alive || node.eventType === 'shop') {
        continue;
      }
      const directionalAdvance = (node.resolvedX - this.playerPosition.x) * directionSign;
      if (directionalAdvance < DEFAULT_COLUMN_DISTANCE * 0.8) {
        continue;
      }
      const xError = Math.abs((node.resolvedX - predictedX) * directionSign);
      const yError = Math.abs(node.resolvedY - predictedY);
      const sizeBonus = node.gameplayRadius * 3.2 + node.visualScale * 0.7;
      const eventPenalty = node.isGigantic ? 0.9 : node.isMilestone ? 0.6 : 0;
      const score = sizeBonus - xError * 0.22 - yError * 0.3 - eventPenalty + Math.min(4, directionalAdvance * 0.05);
      if (score > bestScore) {
        bestScore = score;
        bestNode = node;
      }
    }

    return bestScore > -0.5 ? bestNode : null;
  }

  private prepareSprintFishLandingAssist() {
    const releaseSpeed = Math.max(0.001, this.playerVelocity.length());
    const directionSign = this.getProgressionDirectionSign();
    const projectedTravelSeconds = clamp(0.52 + releaseSpeed * 0.012, 0.58, 1.05);
    const predictedX = this.playerPosition.x + this.playerVelocity.x * projectedTravelSeconds;
    const predictedY = this.playerPosition.y + this.playerVelocity.y * projectedTravelSeconds - 4.6;
    const prewarmPlan = this.maintainStreamingAhead(0);
    const searchLimit = Math.max(
      this.attachedIndex + Math.max(64, this.displayWindowIndices.length + 22),
      prewarmPlan.streamingAnchorIndex + Math.max(40, Math.ceil(prewarmPlan.desiredFutureSlots * 0.68))
    );
    let landingNode = this.findSprintFishLandingTarget(searchLimit, predictedX, predictedY);

    if (!landingNode) {
      const anchorIndex = this.findSprintFishLandingAnchorIndex(predictedX, 144);
      const landingIndex = this.path.ensureSprintFishLandingPath(anchorIndex, this.unprojectWorldX(predictedX), predictedY);
      this.reconcileDisplayWindowAfterPathChange(this.getRecommendedVisibleCount(), this.getStreamingLookaheadPlan(0));
      landingNode = this.getResolvedNode(landingIndex);
    }

    if (!landingNode) {
      this.clearSprintFishLandingAssist();
      return;
    }

    this.sprintFishLandingTargetIndex = landingNode.index;
    this.sprintFishLandingAssistUntil = this.currentTime + SPRINT_FISH_LANDING_ASSIST_SECONDS;

    const toTarget = this.scratchVector
      .set(
        landingNode.resolvedX - this.playerPosition.x,
        landingNode.resolvedY - this.playerPosition.y + Math.min(1.2, landingNode.gameplayRadius * 0.18),
        0
      );
    if ((toTarget.x * directionSign) > 0.001 && toTarget.lengthSq() > 0.0001) {
      const desiredDirection = toTarget.normalize();
      const currentSpeed = Math.max(releaseSpeed, 12.5);
      const blendedDirection = this.scratchVectorB
        .copy(this.playerVelocity)
        .normalize()
        .multiplyScalar(0.72)
        .addScaledVector(desiredDirection, 0.28)
        .normalize();
      this.playerVelocity.copy(blendedDirection.multiplyScalar(currentSpeed));
      this.playerVelocity.y = Math.max(this.playerVelocity.y, 1.1);
      this.playerHeading.set(this.playerVelocity.x || directionSign, this.playerVelocity.y || 0).normalize();
      this.playerSurfaceNormal.set(-this.playerHeading.y, this.playerHeading.x).normalize();
    }
  }

  private updateAmbientEnemies(deltaTime: number) {
    if (this.state === 'idle' || this.state === 'portal_preview' || this.state === 'transition_in' || this.state === 'transition_out' || this.state === 'game_over') {
      return;
    }
    if ((this.choiceMode !== 'none' || this.state === 'upgrade_branching' || this.state === 'upgrade_acquired') && !this.isSprintFishActive()) {
      const idsToClear = this.ambientEnemies.map((enemy) => enemy.id);
      idsToClear.forEach((enemyId) => this.removeAmbientEnemy(enemyId, 'state_blocked'));
      return;
    }

    this.spawnAmbientEnemy();

    const enemies = [...this.ambientEnemies];
    for (const enemy of enemies) {
      enemy.mirrored = this.isMirrorModeActive();

      if (enemy.state === 'sprint_fish') {
        if (enemy.sprintPivotActive) {
          enemy.position.y = enemy.visibleY;
          enemy.sprintPivotAngle += enemy.sprintPivotAngularDirection * enemy.sprintPivotAngularSpeed * deltaTime;
          const pivotCos = Math.cos(enemy.sprintPivotAngle);
          const pivotSin = Math.sin(enemy.sprintPivotAngle);
          this.playerPosition.set(
            enemy.position.x + pivotCos * enemy.sprintPivotRadius,
            enemy.position.y + pivotSin * enemy.sprintPivotRadius,
            this.playerPosition.z
          );
          const pivotTangent = this.getSprintFishPivotTangent(enemy, this.scratchVector);
          const tangentialSpeed = enemy.sprintPivotRadius * enemy.sprintPivotAngularSpeed;
          this.playerVelocity.lerp(
            this.scratchVectorB.copy(pivotTangent).multiplyScalar(tangentialSpeed),
            clamp(deltaTime * 8.4, 0, 1)
          );
          this.playerHeading.set(this.playerVelocity.x || this.getProgressionDirectionSign(), this.playerVelocity.y || 0).normalize();
          this.playerSurfaceNormal.set(-this.playerHeading.y, this.playerHeading.x).normalize();
          const reachedReleaseAngle =
            enemy.sprintPivotAngularDirection < 0
              ? enemy.sprintPivotAngle <= enemy.sprintPivotReleaseAngle
              : enemy.sprintPivotAngle >= enemy.sprintPivotReleaseAngle;
          const playerAbovePivot = this.playerPosition.y >= enemy.position.y + enemy.sprintPivotRadius * 0.82;
          if (reachedReleaseAngle || playerAbovePivot) {
            this.finishSprintFish(enemy);
          }
        } else {
          enemy.position.x += enemy.velocity.x * deltaTime;
          enemy.position.y = enemy.visibleY;
          const directionSign = this.getAmbientEnemyDirectionSign(enemy.kind);
          const targetPlayerPosition = this.scratchVector.set(
            enemy.position.x - directionSign * SPRINT_FISH_PULL_OFFSET_X,
            enemy.position.y + SPRINT_FISH_PULL_OFFSET_Y,
            this.playerPosition.z
          );
          this.playerPosition.lerp(targetPlayerPosition, clamp(deltaTime * SPRINT_FISH_PULL_RESPONSE, 0, 1));
          const minimumTowSeparation = SPRINT_FISH_PULL_OFFSET_X * 0.82;
          const signedTowDistance = (enemy.position.x - this.playerPosition.x) * directionSign;
          if (signedTowDistance < minimumTowSeparation) {
            this.playerPosition.x = enemy.position.x - directionSign * minimumTowSeparation;
          }
          this.playerVelocity.lerp(
            this.scratchVectorB.set(enemy.velocity.x * 0.98, SPRINT_FISH_PLAYER_TOW_VERTICAL_VELOCITY, 0),
            clamp(deltaTime * SPRINT_FISH_PLAYER_TOW_VELOCITY_RESPONSE, 0, 1)
          );
          this.playerHeading.set(directionSign, 0);
          this.playerSurfaceNormal.set(0, 1);
          const sprintDistanceMeters = Math.abs(enemy.position.x - this.sprintFishStartX) / DEFAULT_COLUMN_DISTANCE;
          if (sprintDistanceMeters >= SPRINT_FISH_DISTANCE_METERS) {
            this.startSprintFishPivot(enemy);
          }
        }
        continue;
      }

      if (enemy.state === 'dying') {
        enemy.velocity.y -= 8.6 * deltaTime;
        enemy.position.addScaledVector(this.scratchVector.set(enemy.velocity.x, enemy.velocity.y, 0), deltaTime);
        if (this.currentTime - enemy.stateStartedAt >= enemy.deathDuration) {
          this.removeAmbientEnemy(enemy.id, 'death_animation_complete');
          continue;
        }
        const halfExtents = this.getAmbientEnemyBaseHalfExtents(enemy);
        const fullyPastDeathBounds =
          enemy.position.x - halfExtents.x > this.camera.getSafeRight() + DEFAULT_COLUMN_DISTANCE * 2.2 ||
          enemy.position.x + halfExtents.x < this.camera.getSafeLeft() - DEFAULT_COLUMN_DISTANCE * 2.2 ||
          enemy.position.y + halfExtents.y < this.camera.getSafeBottom() - DEFAULT_COLUMN_DISTANCE * 2.4;
        if (fullyPastDeathBounds) {
          this.removeAmbientEnemy(enemy.id, 'death_out_of_bounds');
        }
        continue;
      }

      enemy.position.x += enemy.velocity.x * deltaTime;

      if (enemy.kind === 'enemyTop') {
        enemy.position.y = enemy.cruiseY;
      } else {
        this.updateAmbientEnemyBotVerticalMotion(enemy);
      }

      const halfExtents = this.getAmbientEnemyBaseHalfExtents(enemy);
      const fullyPastScreen =
        enemy.velocity.x > 0
          ? enemy.position.x - halfExtents.x > this.camera.getSafeRight() + DEFAULT_COLUMN_DISTANCE * 1.6
          : enemy.position.x + halfExtents.x < this.camera.getSafeLeft() - DEFAULT_COLUMN_DISTANCE * 1.6;
      if (fullyPastScreen) {
        this.removeAmbientEnemy(enemy.id, 'passed_screen_bounds');
      }
    }
  }

  getHudState(): GameHudSnapshot {
    const normalizedGauge = clamp(this.momentum.gauge / Math.max(1, this.runUpgrades.modifiers.momentumCap), 0, 1);
    this.stats.fillHud(this.hudSnapshot);
    this.hudSnapshot.state = this.getHudStateValue();
    this.hudSnapshot.playerMotionState = this.playerState as GamePlayerMotionState;
    this.hudSnapshot.chargeRatio = clamp(this.chargeMeter, 0, 1);
    this.hudSnapshot.momentumGauge = normalizedGauge;
    this.hudSnapshot.momentumTier = Math.min(4, Math.floor(normalizedGauge * 5));
    this.hudSnapshot.orbitGraceActive = this.orbitGraceActive;
    this.hudSnapshot.orbitGraceProgress = this.orbitGraceProgress;
    this.hudSnapshot.mobile = this.getMobileHudState();
    this.hudSnapshot.offers = this.activeChoices.map((choice) => choice.offer);
    this.hudSnapshot.branchHints = this.getBranchHints();
    this.hudSnapshot.shopCenter = this.getShopCenterHint();
    this.hudSnapshot.inventoryItems = this.runUpgrades.ownedOrder.map((itemId) => {
      const item = getItemById(itemId);
      const runtime = item?.slot ? this.runUpgrades.moduleRuntime[item.slot] : null;
      const gaugeConfig = item ? getModuleGaugeConfig(item) : null;
      const cooldownRatio =
        item?.slot === 'wrapper'
          ? this.getDisplayedCooldownRatio('wrapper', runtime ?? null)
          : item?.slot === 'grappin'
            ? this.getDisplayedCooldownRatio('grappin', runtime ?? null)
            : item?.slot === 'shield'
              ? this.getDisplayedCooldownRatio('shield', runtime ?? null)
              : item?.slot === 'souffleur' && runtime && runtime.gaugeMax > 0
          ? Math.max(
              runtime.regenDelayRemaining > 0 && gaugeConfig
                ? Math.min(
                    1,
                    runtime.regenDelayRemaining /
                      Math.max(0.001, runtime.gaugeCurrent <= 0.0001 ? gaugeConfig.emptyDelay : gaugeConfig.regenDelay)
                  )
                : 0,
              1 - runtime.gaugeCurrent / runtime.gaugeMax
            )
          : runtime && item?.slot && this.getModuleCooldownDuration(item.slot) > 0
          ? this.getDisplayedCooldownRatio(item.slot, runtime)
          : runtime && gaugeConfig && runtime.regenDelayRemaining > 0
            ? Math.min(
                1,
                runtime.regenDelayRemaining /
                  Math.max(0.001, runtime.gaugeCurrent <= 0.0001 ? gaugeConfig.emptyDelay : gaugeConfig.regenDelay)
              )
            : 0;
      return {
        id: itemId,
        name: item?.name.en ?? itemId,
        description: item?.description.en ?? itemId,
        count: this.runUpgrades.counts[itemId] ?? 1,
        iconSrc: item?.hudIconSrc ?? ITEM_PLACEHOLDER_ICON,
        rarity: item?.rarity ?? 'common',
        rarityIconSrc: item?.rarityIconSrc ?? ITEM_PLACEHOLDER_ICON,
        kind: item?.kind ?? 'passive',
        cooldownRatio,
        blocked:
          item?.slot === 'grappin'
            ? this.isGrappleBusy()
            : item?.slot === 'wrapper'
              ? this.isWrapperBusy()
              : item?.slot === 'souffleur'
                ? this.souffleurRequiresFullRecharge
                : false,
        chargeCurrent: runtime?.chargesCurrent ?? 0,
        chargeMax: runtime?.chargesMax ?? 0,
        resourceRatio: runtime && runtime.gaugeMax > 0 ? runtime.gaugeCurrent / runtime.gaugeMax : 0,
        slot: item?.slot ?? null
      };
    });
    this.hudSnapshot.landingFeedback = this.landingFeedback;
    this.hudSnapshot.acquisition = this.acquisition;
    this.hudSnapshot.achievementToasts = this.getAchievementToastSnapshots();
    this.hudSnapshot.achievements = this.achievements.getPanelSnapshot(this.locale);
    this.hudSnapshot.gameOverCause = this.gameOverCause;
    const statsSnapshot = this.stats.getSnapshot();
    this.hudSnapshot.runSummary = {
      score: statsSnapshot.score,
      bestScore: statsSnapshot.bestScore,
      shardsLanded: statsSnapshot.shardsLanded,
      bestShards: statsSnapshot.bestShards,
      distanceMeters: statsSnapshot.distanceMeters,
      bestDistanceMeters: statsSnapshot.bestDistanceMeters,
      coinsCollected: statsSnapshot.coinsCollected,
      bestCoinsCollected: statsSnapshot.bestCoinsCollected,
      enemiesKilled: statsSnapshot.enemiesKilled,
      bestEnemiesKilled: statsSnapshot.bestEnemiesKilled,
      twistChainMax: statsSnapshot.twistChainMax,
      longestMomentumSeconds: statsSnapshot.longestMomentumSeconds,
      bestLongestMomentumSeconds: statsSnapshot.bestLongestMomentumSeconds,
      scoreBreakdown: statsSnapshot.scoreBreakdown,
      personalBests: statsSnapshot.personalBests,
      equipment: this.hudSnapshot.inventoryItems.map((item) => ({
        id: item.id,
        iconSrc: item.iconSrc,
        rarityIconSrc: item.rarityIconSrc,
        rarity: item.rarity,
        kind: item.kind
      }))
    };
    return this.hudSnapshot;
  }

  getAudioState(): GameAudioRuntimeState {
    const state = this.getHudStateValue();
    return {
      state,
      playerMotionState: this.playerState as GamePlayerMotionState,
      distanceMeters: this.stats.getSnapshot().distanceMeters,
      momentumRatio: clamp(this.momentum.gauge / Math.max(1, this.runUpgrades.modifiers.momentumCap), 0, 1),
      awaitingFirstJump: this.awaitingFirstJump,
      blowerActive: this.souffleurActive && state === 'running',
      onShardActive:
        (state === 'running' || state === 'upgrade_choice') &&
        this.playerState !== 'airborne' &&
        this.playerState !== 'dead',
      glideActive: state === 'running' && this.playerState === 'airborne' && Boolean(this.getEquippedItem('plane')),
      speed: this.playerVelocity.length()
    };
  }

  private getAchievementToastSnapshots() {
    return this.achievementToasts
      .map((toast) => {
        const progress = clamp((this.currentTime - toast.startedAt) / this.achievementToastDuration, 0, 1);
        return this.achievements.getToastSnapshot(toast.achievementId, this.locale, toast.serial, progress);
      })
      .filter((toast): toast is NonNullable<ReturnType<AchievementSystem['getToastSnapshot']>> => Boolean(toast));
  }

  private emitAudioEvent(event: GameAudioEvent) {
    this.audioListeners.forEach((listener) => listener(event));
  }

  private getMobileHudState() {
    const airborneChargeCount = this.getRemainingAirborneChargeCount();
    const airborne = this.playerState === 'airborne';
    const onShard = !airborne && this.playerState !== 'dead';
    const souffleurRuntime = this.getModuleRuntime('souffleur');
    const wrapperRuntime = this.getModuleRuntime('wrapper');
    const grappleRuntime = this.getModuleRuntime('grappin');
    const hasTeleport = Boolean(this.getEquippedItem('wrapper'));
    const hasGrapple = Boolean(this.getEquippedItem('grappin'));
    const hasSouffleurItem = Boolean(this.getEquippedItem('souffleur'));
    const hasAirAction =
      this.runUpgrades.modifiers.infiniteFlaps ||
      this.remainingExtraJumps > 0 ||
      Boolean(this.getEquippedItem('propulseur')) ||
      Boolean(this.getEquippedItem('wings')) ||
      Boolean(this.getEquippedItem('reacteur_front')) ||
      Boolean(this.getEquippedItem('reacteur_back'));
    const teleportBusy = this.isWrapperBusy();
    const grappleBusy = this.grapState !== 'idle' || this.grapTargetIndex !== null || this.grapAmbientEnemyId !== null;
    const airActionActive =
      (this.moduleFlashUntil.wings ?? 0) > this.currentTime ||
      (this.moduleFlashUntil.propulseur ?? 0) > this.currentTime ||
      (this.moduleFlashUntil.reacteur_front ?? 0) > this.currentTime ||
      (this.moduleFlashUntil.reacteur_back ?? 0) > this.currentTime;
    const airActionDepleted = !this.runUpgrades.modifiers.infiniteFlaps && airborneChargeCount <= 0;
    const boostVisible = onShard || (airborne && hasSouffleurItem);
    const boostActive = onShard ? this.chargeActive : airborne && hasSouffleurItem && this.souffleurActive;
    return {
      airborneChargeCount,
      airborneChargeDisplayCount: this.runUpgrades.modifiers.infiniteFlaps ? 5 : Math.max(0, Math.min(5, airborneChargeCount)),
      hasTeleport,
      teleportBlocked: hasTeleport && !this.isWrapperAvailable(),
      teleportCooldownRatio: hasTeleport && !teleportBusy ? this.getDisplayedCooldownRatio('wrapper', wrapperRuntime) : 0,
      teleportActive: hasTeleport && teleportBusy,
      hasGrapple,
      grappleBlocked: hasGrapple && !this.isGrappleAvailable(),
      grappleCooldownRatio: grappleBusy ? 0 : this.getDisplayedCooldownRatio('grappin', grappleRuntime),
      grappleActive: hasGrapple && (grappleBusy || (this.moduleFlashUntil.grappin ?? 0) > this.currentTime),
      hasAirAction,
      airActionBlocked: hasAirAction && !airborne,
      airActionActive: airActionActive && !airActionDepleted,
      airActionDepleted,
      hasSouffleur: boostVisible,
      hasSouffleurFuel:
        onShard ||
        (Boolean((souffleurRuntime?.gaugeCurrent ?? 0) > 0.001) && !this.souffleurRequiresFullRecharge && boostVisible),
      boostActive
    };
  }

  private getRemainingAirborneChargeCount() {
    const chargeSlots: RogueliteModuleSlot[] = ['propulseur', 'wings', 'reacteur_front', 'reacteur_back'];
    const moduleCharges = chargeSlots.reduce((sum, slot) => sum + (this.getModuleRuntime(slot)?.chargesCurrent ?? 0), 0);
    if (this.runUpgrades.modifiers.infiniteFlaps) {
      return Math.max(5, moduleCharges);
    }
    return moduleCharges + Math.max(0, this.remainingExtraJumps);
  }

  private getEquippedItem(slot: RogueliteModuleSlot) {
    const itemId = this.runUpgrades.modules[slot];
    return itemId ? getItemById(itemId) : null;
  }

  private getModuleRuntime(slot: RogueliteModuleSlot): ModuleRuntimeState | null {
    return this.runUpgrades.moduleRuntime[slot] ?? null;
  }

  private getModuleCooldownDuration(slot: RogueliteModuleSlot) {
    switch (slot) {
      case 'shield':
        return Math.max(4, 14 * (1 - this.runUpgrades.modifiers.shieldCooldownFactor));
      case 'wrapper':
        return 18;
      case 'grappin':
        return this.getEquippedItem('grappin')?.rarity === 'legendary' ? 2 : 5;
      case 'big_canon':
        return Math.max(1.4, this.runUpgrades.modifiers.bigCanonCooldown || this.getModuleStat('big_canon', 'bigCanonCooldown') || 4.5);
      case 'front_canon':
        return Math.max(1, this.runUpgrades.modifiers.frontCanonCooldown || this.getModuleStat('front_canon', 'frontCanonCooldown') || 2.4);
      default:
        return 0;
    }
  }

  private isWrapperBusy() {
    return this.wrapperPendingTarget !== null || this.wrapperVisualUntil > this.currentTime || this.wrapperCooldownPending;
  }

  private isWrapperAvailable() {
    const runtime = this.getModuleRuntime('wrapper');
    return Boolean(this.getEquippedItem('wrapper')) && !this.isWrapperBusy() && (!runtime || runtime.cooldownRemaining <= 0);
  }

  private isGrappleBusy() {
    return this.grapState !== 'idle' || this.grapTargetIndex !== null || this.grapAmbientEnemyId !== null || this.grapCooldownPending;
  }

  private isGrappleAvailable() {
    const runtime = this.getModuleRuntime('grappin');
    return (
      this.playerState === 'airborne' &&
      Boolean(this.getEquippedItem('grappin')) &&
      !this.isGrappleBusy() &&
      (!runtime || runtime.cooldownRemaining <= 0)
    );
  }

  private getDisplayedCooldownRatio(slot: RogueliteModuleSlot, runtime: ModuleRuntimeState | null) {
    const cooldownDuration = this.getModuleCooldownDuration(slot);
    if (!runtime || cooldownDuration <= 0) {
      return 0;
    }
    return Math.min(1, Math.max(0, runtime.cooldownRemaining) / cooldownDuration);
  }

  private ensureModuleRuntime(slot: RogueliteModuleSlot) {
    const item = this.getEquippedItem(slot);
    if (!item || !item.slot) return null;
    const existing = this.runUpgrades.moduleRuntime[slot];
    if (existing && existing.itemId === item.id) {
      return existing;
    }
    const runtime: ModuleRuntimeState = {
      itemId: item.id,
      cooldownRemaining: 0,
      chargesCurrent: getModuleChargesForItem(item),
      chargesMax: getModuleChargesForItem(item),
      gaugeCurrent: getModuleGaugeConfig(item)?.capacity ?? 0,
      gaugeMax: getModuleGaugeConfig(item)?.capacity ?? 0,
      regenDelayRemaining: 0
    };
    this.runUpgrades.moduleRuntime[slot] = runtime;
    return runtime;
  }

  private getModuleStat(
    slot: RogueliteModuleSlot,
    stat:
      | 'propulsionPower'
      | 'wrapperDistance'
      | 'magnetRange'
      | 'frontCanonRange'
      | 'frontCanonCooldown'
      | 'bigCanonRange'
      | 'bigCanonCooldown'
      | 'grapRange'
      | 'grapCooldown'
  ) {
    const item = this.getEquippedItem(slot);
    if (!item) return 0;
    const value = item.statsByRarity[item.rarity]?.[stat];
    return typeof value === 'number' ? value : 0;
  }

  private resetJumpModuleCharges() {
    (['wings', 'propulseur', 'reacteur_front', 'reacteur_back'] as RogueliteModuleSlot[]).forEach((slot) => {
      const item = this.getEquippedItem(slot);
      const runtime = this.ensureModuleRuntime(slot);
      if (!item || !runtime) return;
      const charges = getModuleChargesForItem(item);
      runtime.chargesMax = charges;
      runtime.chargesCurrent = charges;
    });
  }

  private consumeModuleGauge(slot: RogueliteModuleSlot, deltaTime: number, burnPerSecond: number) {
    const item = this.getEquippedItem(slot);
    const runtime = this.ensureModuleRuntime(slot);
    const config = item ? getModuleGaugeConfig(item) : null;
    if (slot === 'souffleur' && this.souffleurRequiresFullRecharge && runtime && runtime.gaugeCurrent < runtime.gaugeMax - 0.0001) {
      return false;
    }
    if (!item || !runtime || !config || runtime.gaugeMax <= 0 || runtime.gaugeCurrent <= 0) {
      return false;
    }
    const consumed = Math.min(runtime.gaugeCurrent, burnPerSecond * deltaTime);
    runtime.gaugeCurrent = Math.max(0, runtime.gaugeCurrent - consumed);
    runtime.regenDelayRemaining = runtime.gaugeCurrent <= 0.0001 ? config.emptyDelay : config.regenDelay;
    if (slot === 'souffleur' && runtime.gaugeCurrent <= 0.0001) {
      this.souffleurRequiresFullRecharge = true;
    }
    return consumed > 0;
  }

  private tickModuleRuntime(deltaTime: number) {
    this.souffleurActive = false;
    (Object.keys(this.runUpgrades.modules) as RogueliteModuleSlot[]).forEach((slot) => {
      const item = this.getEquippedItem(slot);
      const runtime = this.ensureModuleRuntime(slot);
      if (!item || !runtime) return;
      const previousCooldown = runtime.cooldownRemaining;
      runtime.cooldownRemaining = Math.max(0, runtime.cooldownRemaining - deltaTime);
      if (slot === 'shield' && previousCooldown > 0 && runtime.cooldownRemaining <= 0) {
        this.shieldRechargeFlashUntil = this.currentTime + 0.3;
      }
      if (runtime.gaugeMax > 0) {
        if (runtime.regenDelayRemaining > 0) {
          runtime.regenDelayRemaining = Math.max(0, runtime.regenDelayRemaining - deltaTime);
        } else {
          const config = getModuleGaugeConfig(item);
          if (config) {
            runtime.gaugeCurrent = Math.min(runtime.gaugeMax, runtime.gaugeCurrent + config.regenPerSecond * deltaTime);
          }
        }
        if (slot === 'souffleur' && runtime.gaugeCurrent >= runtime.gaugeMax - 0.0001) {
          this.souffleurRequiresFullRecharge = false;
        }
      }
    });
    const shieldRuntime = this.ensureModuleRuntime('shield');
    this.shieldCharges = shieldRuntime && shieldRuntime.cooldownRemaining <= 0 ? 1 : 0;
  }

  private hasModuleCharges(slot: RogueliteModuleSlot) {
    const runtime = this.ensureModuleRuntime(slot);
    return Boolean(runtime && runtime.chargesCurrent > 0);
  }

  private spendModuleCharge(slot: RogueliteModuleSlot) {
    const runtime = this.ensureModuleRuntime(slot);
    if (!runtime || runtime.chargesCurrent <= 0) return false;
    runtime.chargesCurrent -= 1;
    runtime.chargesCurrent = Math.max(0, runtime.chargesCurrent);
    return true;
  }

  private triggerModuleFlash(slot: RogueliteModuleSlot, duration = 0.24) {
    this.moduleFlashUntil[slot] = this.currentTime + duration;
  }

  private clearWorldItemEffects() {
    this.magnetRangeIndicator.visible = false;
    this.bigCanonRangeIndicator.visible = false;
    this.bigCanonRadarSweep.visible = false;
    this.grapRangeIndicator.visible = false;
    this.frontCanonLaser.visible = false;
    this.frontCanonProjectile.visible = false;
    this.bigCanonProjectile.visible = false;
    this.grapRope.visible = false;
  }

  private invalidateVisibleNodeCachesIfNeeded(elapsedTime: number) {
    if (this.displayNodesCacheTime === elapsedTime) {
      return;
    }
    this.invalidateVisibleNodeCaches();
    this.displayNodesCacheTime = elapsedTime;
  }

  private invalidateVisibleNodeCaches() {
    this.displayNodesCache.clear();
    this.platformLayoutCacheCount = -1;
    this.interactableVisibleNodesCache = null;
    this.displayNodesCacheTime = Number.NaN;
  }

  private setAttachedNodeRuntimeAnchor(node: ResolvedGamePathNode | null) {
    this.attachedNodeRuntimeAnchor = node
      ? {
          index: node.index,
          resolvedX: node.resolvedX,
          resolvedY: node.resolvedY,
          resolvedZ: node.resolvedZ
        }
      : null;
    this.invalidateVisibleNodeCaches();
  }

  private beginTickFrame(elapsedTime: number) {
    this.currentTime = elapsedTime;
    if (this.sprintFishLandingAssistUntil > 0 && elapsedTime >= this.sprintFishLandingAssistUntil) {
      this.clearSprintFishLandingAssist();
    }
    this.invalidateVisibleNodeCachesIfNeeded(elapsedTime);
  }

  // Runtime tick order:
  // 1. frame-local timers and cache invalidation
  // 2. gameplay simulation and state mutation
  // 3. deferred transitions, collisions and event resolution
  // 4. camera/world/HUD presentation sync
  // 5. late failure checks and transient feedback timers
  update(deltaTime: number, elapsedTime: number) {
    if (this.state === 'idle') return;
    this.beginTickFrame(elapsedTime);

    const frame = { deltaTime, elapsedTime };
    if (this.state === 'portal_preview') {
      this.runPortalPreviewFrame(frame);
      return;
    }

    if (this.state === 'transition_in' || this.state === 'transition_out') {
      this.runTransitionFrame(frame);
      return;
    }

    if (this.state === 'game_over') {
      this.runGameOverFrame(frame);
      return;
    }

    const activeFrame = this.createActiveRunTickFrame(frame);
    this.runActiveSimulationPhase(activeFrame);
    this.runActiveResolutionPhase(activeFrame);
    this.runActivePresentationPhase(activeFrame);
    this.finalizeActiveRunFrame(activeFrame);
  }

  private createActiveRunTickFrame(frame: GameTickFrame): ActiveRunTickFrame {
    return {
      ...frame,
      shopLocked: this.isShopInteractionLocked() && this.playerState !== 'airborne',
      currentNode: this.getResolvedNode(this.attachedIndex),
      nextNode: this.getResolvedNode(this.attachedIndex + 1),
      motionStartIndex: this.attachedIndex
    };
  }

  private runPortalPreviewFrame(frame: GameTickFrame) {
    this.hideWorldRewardBranchHud();
    this.simulatePortalPreviewState(frame.deltaTime);
    this.syncPortalPreviewPresentation(frame.elapsedTime);
  }

  private runTransitionFrame(frame: GameTickFrame) {
    this.hideWorldRewardBranchHud();
    this.tickModuleRuntime(frame.deltaTime);
    this.updateMomentum(frame.deltaTime);
    this.syncTransitionPresentation();
  }

  private runGameOverFrame(frame: GameTickFrame) {
    const currentNode = this.getResolvedNode(this.attachedIndex);
    const nextNode = this.getResolvedNode(this.attachedIndex + 1);
    this.clearWorldItemEffects();
    this.coins.setVisible(false);
    this.enemies.setVisible(false);
    this.advanceHudFeedbackTimers(frame.elapsedTime);
    this.syncCameraFollow(frame.deltaTime, currentNode, nextNode);
    this.syncTrailVisual();
    this.syncPlayerVisual(frame.elapsedTime);
    this.syncShardHud(currentNode);
    this.syncWorldRewardBranchHud(currentNode);
  }

  private runActiveSimulationPhase(frame: ActiveRunTickFrame) {
    this.maintainStreamingAhead(frame.deltaTime);
    this.tickModuleRuntime(frame.deltaTime);
    this.updateMomentum(frame.deltaTime);
    this.stats.updateMomentumWindow(this.currentTime, !frame.shopLocked && this.momentum.gauge > 0.08);
    if (this.playerState === 'airborne') {
      this.achievements.recordRunTime(frame.deltaTime);
    }
    this.achievements.recordMomentumGauge(
      !frame.shopLocked ? clamp(this.momentum.gauge / Math.max(1, this.runUpgrades.modifiers.momentumCap), 0, 1) : 0,
      this.currentTime
    );
    this.queueAchievementToastsIfNeeded();
    this.prewarmUpcomingMilestones();
    this.updateAmbientEnemies(frame.deltaTime);

    if (this.isSprintFishActive()) {
      this.collectCoinsNearPlayer();
      this.syncAirbornePlayerOrientation();
      this.refreshActiveRunTickNodes(frame);
      const postSprintFishPlan = this.maintainStreamingAhead(frame.deltaTime);
      this.advanceDisplayAnchor(postSprintFishPlan.aheadNodes, postSprintFishPlan.chunkSize, postSprintFishPlan);
      return;
    }

    if (frame.shopLocked) {
      this.souffleurActive = false;
      this.updateAttached(frame.deltaTime, frame.currentNode);
    } else if (this.playerState === 'airborne') {
      this.updateAirborne(frame.deltaTime);
    } else {
      this.updateAttached(frame.deltaTime, frame.currentNode);
    }

    this.refreshActiveRunTickNodes(frame);
    const postMovementStreamingPlan = this.maintainStreamingAhead(frame.deltaTime);
    this.advanceDisplayAnchor(postMovementStreamingPlan.aheadNodes, postMovementStreamingPlan.chunkSize, postMovementStreamingPlan);
  }

  private refreshActiveRunTickNodes(frame: ActiveRunTickFrame) {
    if (this.attachedIndex !== frame.motionStartIndex || this.playerState !== 'airborne') {
      frame.currentNode = this.getResolvedNode(this.attachedIndex);
      frame.nextNode = this.getResolvedNode(this.attachedIndex + 1);
    }
  }

  private runActiveResolutionPhase(frame: ActiveRunTickFrame) {
    this.advanceDeferredRuntimeState(frame.elapsedTime);
    this.resolveGameplayEvents(frame.elapsedTime);
  }

  private runActivePresentationPhase(frame: ActiveRunTickFrame) {
    this.syncShopPresentation(frame.currentNode, frame.elapsedTime);
    this.syncCameraFollow(frame.deltaTime, frame.currentNode, frame.nextNode);
    const postCameraStreamingPlan = this.maintainStreamingAhead(frame.deltaTime);
    this.advanceDisplayAnchor(postCameraStreamingPlan.aheadNodes, postCameraStreamingPlan.chunkSize, postCameraStreamingPlan);
    this.syncTrailVisual();
    this.syncPlayerVisual(frame.elapsedTime);
    this.syncShardHud(frame.currentNode);
    this.syncWorldRewardBranchHud(frame.currentNode);
    this.syncMarkers(frame.elapsedTime);
  }

  private finalizeActiveRunFrame(frame: ActiveRunTickFrame) {
    if (frame.currentNode.isMilestone && this.playerState !== 'airborne') {
      this.advanceHudFeedbackTimers(frame.elapsedTime);
      return;
    }

    if (this.tryConsumePendingMilestoneMirrorLaunch(frame.currentNode)) {
      this.advanceHudFeedbackTimers(frame.elapsedTime);
      this.updateWrapperSequence();
      return;
    }

    if (this.isPendingMilestoneMirrorLaunch(frame.currentNode)) {
      this.advanceHudFeedbackTimers(frame.elapsedTime);
      this.updateWrapperSequence();
      return;
    }

    if (this.isOutsidePlayableField(this.playerPosition)) {
      this.failRun('out_of_bounds');
    } else if (this.tryTriggerMirrorMode(frame.currentNode)) {
      // Mirror mode replaces the usual forbidden-side failure and keeps the run alive.
    } else if (this.camera.isBehindSafeLine(this.playerPosition)) {
      this.failRun('camera');
    }

    this.advanceHudFeedbackTimers(frame.elapsedTime);
    this.updateWrapperSequence();
  }

  private advanceHudFeedbackTimers(elapsedTime: number) {
    if (this.acquisition) {
      const progress = clamp((elapsedTime - this.acquisitionStartedAt) / this.acquisitionDuration, 0, 1);
      this.acquisition.progress = progress;
      if (progress >= 1) {
        this.acquisition = null;
      }
    }

    if (this.landingFeedback) {
      const progress = clamp((elapsedTime - this.landingFeedbackStartedAt) / this.landingFeedbackDuration, 0, 1);
      this.landingFeedback.progress = progress;
      if (progress >= 1) {
        this.landingFeedback = null;
        this.landingFeedbackNodeIndex = null;
      }
    }

    for (let index = this.achievementToasts.length - 1; index >= 0; index -= 1) {
      const toast = this.achievementToasts[index];
      const progress = clamp((elapsedTime - toast.startedAt) / this.achievementToastDuration, 0, 1);
      if (progress >= 1) {
        this.achievementToasts.splice(index, 1);
      }
    }

    this.queueAchievementToastsIfNeeded();
  }

  private getHudStateValue(): GameHudState {
    if (this.state === 'game_over') return 'game_over';
    if (this.state === 'portal_preview' || this.state === 'transition_in' || this.state === 'transition_out') return 'transition';
    if (this.state === 'upgrade_branching') return 'upgrade_choice';
    return 'running';
  }

  private simulatePortalPreviewState(deltaTime: number) {
    const currentNode = this.getPortalPreviewNode();
    const baseAngularSpeed = (Math.PI * 2) / Math.max(1.6, currentNode.gameplayOrbitPeriod);
    if (this.portalPreviewDesiredAngle !== null) {
      const remaining = wrapAngle(this.orbitAngle - this.portalPreviewDesiredAngle);
      const targetAngularSpeed = remaining > 0.045 ? baseAngularSpeed * 2.6 : baseAngularSpeed;
      this.angularSpeed = damp(this.angularSpeed, targetAngularSpeed, 7.4, deltaTime);
      const step = this.angularSpeed * deltaTime;
      this.orbitAngle =
        remaining <= step
          ? this.portalPreviewDesiredAngle
          : wrapAngle(this.orbitAngle + this.orbitDirection * step);
    } else {
      this.angularSpeed = damp(this.angularSpeed, baseAngularSpeed, 4.8, deltaTime);
      this.orbitAngle = wrapAngle(this.orbitAngle + this.orbitDirection * this.angularSpeed * deltaTime);
    }

    const liveOrbit = this.getOrbitSample(currentNode, this.orbitAngle);
    const orbitSpeed = Math.max(1, liveOrbit.position.length()) * this.angularSpeed;
    this.syncAttachedPlayerSpatial(currentNode, this.orbitAngle, this.orbitDirection, orbitSpeed, false, liveOrbit);
    this.playerState = 'attached';
  }

  private syncPortalPreviewPresentation(elapsedTime: number) {
    this.shardHudSprite.visible = false;
    this.magnetRangeIndicator.visible = false;
    this.bigCanonRangeIndicator.visible = false;
    this.bigCanonRadarSweep.visible = false;
    this.grapRangeIndicator.visible = false;
    this.frontCanonLaser.visible = false;
    this.frontCanonProjectile.visible = false;
    this.bigCanonProjectile.visible = false;
    this.grapRope.visible = false;
    this.coins.setVisible(false);
    this.enemies.setVisible(false);
    this.playerTrail.visible = true;
    this.syncTrailVisual();
    this.syncPlayerVisual(elapsedTime);
  }

  private syncTransitionPresentation() {
    if (this.state !== 'transition_in' || !this.player.visible) {
      return;
    }

    const node = this.getResolvedNode(0);
    const orbit = this.getOrbitSample(node, this.orbitAngle);
    const targetPosition = this.getPlayerOrbitWorldPosition(node, this.orbitAngle, orbit);
    const targetTravel = this.getSurfaceTravelTangent(orbit, this.orbitDirection, this.scratchVector2);
    const targetHeading = Math.atan2(targetTravel.y, targetTravel.x);
    const wrappedStartHeading = targetHeading + shortestAngleDistance(this.transitionPlayerStartRotation.z, targetHeading);
    this.player.position.lerpVectors(this.transitionPlayerStartPosition, targetPosition, this.transitionProgress);
    this.player.rotation.x = THREE.MathUtils.lerp(this.transitionPlayerStartRotation.x, 0, this.transitionProgress);
    this.player.rotation.y = THREE.MathUtils.lerp(this.transitionPlayerStartRotation.y, 0, this.transitionProgress);
    this.player.rotation.z = THREE.MathUtils.lerp(wrappedStartHeading, targetHeading, this.transitionProgress);
    this.player.scale.lerpVectors(
      this.transitionPlayerStartScale,
      new THREE.Vector3(1, this.orbitDirection > 0 ? -1 : 1, 1),
      this.transitionProgress
    );
  }

  private advanceDeferredRuntimeState(elapsedTime: number) {
    if (this.state === 'upgrade_acquired' && elapsedTime >= this.eventCooldownUntil) {
      this.state = this.playerState === 'airborne' ? 'running_airborne' : this.chargeActive ? 'running_charging' : 'running_attached';
    }
    this.finalizeGrappleLandingCooldown();
  }

  private finalizeGrappleLandingCooldown() {
    if (this.grapState !== 'landing' || this.currentTime < this.grapStateUntil) {
      return;
    }
    this.grapState = 'idle';
    if (!this.grapCooldownPending) {
      return;
    }
    const grapRuntime = this.ensureModuleRuntime('grappin');
    if (grapRuntime) {
      grapRuntime.cooldownRemaining = this.getModuleCooldownDuration('grappin');
    }
    this.grapCooldownPending = false;
  }

  private getPortalPreviewNode(): ResolvedGamePathNode {
    return this.getPortalPreviewNodeAt(this.portalPreviewCenter);
  }

  private getPortalPreviewNodeAt(center: THREE.Vector3) {
    const node = createMiniGamePortalNode();
    node.x = center.x;
    node.y = center.y;
    node.z = center.z;
    node.resolvedX = center.x;
    node.resolvedY = center.y;
    node.resolvedZ = center.z;
    node.resolvedSpinPhase = this.currentTime * node.spinSpeed;
    return node;
  }

  private getPortalPreviewTargetAngle(target: 'left' | 'right' | 'forward') {
    void target;
    return MINI_GAME_PORTAL_LAUNCH_ANGLE;
  }

  private buildPortalPreviewVisual(node: ResolvedGamePathNode): VisiblePlatformVisual {
    const pulse = 0.06 + Math.sin(this.currentTime * 1.2) * 0.015;
    return {
      scale: new THREE.Vector3(node.visualScale, node.visualScale, node.visualScale),
      shapeKind: node.shapeKind,
      spinDirection: node.spinDirection,
      spinSpeed: 0.06,
      spinPhase: node.resolvedSpinPhase,
      tint: null,
      ringTint: null,
      ringScale: 0,
      stripeTint: null,
      stripeMix: 0,
      stripePhase: this.currentTime * 1.12,
      pulse,
      deformAngle: this.orbitAngle,
      deformStrength: 0.02,
      deformDensity: 0.42,
      fragmentAmount: 0.04,
      iconSrc: null,
      iconText: null,
      iconTint: null,
      iconScale: 0.34
    };
  }

  private emitScore() {
    this.scoreListeners.forEach((listener) => listener());
  }

  private updateWrapperSequence() {
    if (this.wrapperPendingTarget !== null && this.currentTime >= this.wrapperTeleportAt) {
      const target =
        this.wrapperPendingTarget > this.attachedIndex && this.isTeleportTargetSafe(this.wrapperPendingTarget, this.getResolvedNode(this.wrapperPendingTarget))
          ? this.wrapperPendingTarget
          : this.findSafeTeleportTarget(Math.max(10, this.runUpgrades.modifiers.wrapperDistance), 2);
      this.wrapperPendingTarget = null;
      if (target > this.attachedIndex + 1) {
        this.attachToNode(target, false, null, null, null, null, this.getResolvedNode(target));
      }
    }
    if (this.wrapperVisualUntil > 0 && this.currentTime >= this.wrapperVisualUntil) {
      if (this.wrapperCooldownPending) {
        const wrapperRuntime = this.ensureModuleRuntime('wrapper');
        if (wrapperRuntime) {
          wrapperRuntime.cooldownRemaining = this.getModuleCooldownDuration('wrapper');
        }
        this.wrapperCooldownPending = false;
      }
      this.wrapperTeleportAt = 0;
      this.wrapperHoldUntil = 0;
      this.wrapperVisualUntil = 0;
    }
  }

  private getResolvedNode(index: number) {
    const resolvedNode = this.path.getResolvedNode(Math.max(0, index), this.currentTime, this.attachedIndex);
    const attachedAnchor = this.attachedNodeRuntimeAnchor;
    if (!attachedAnchor || attachedAnchor.index !== resolvedNode.index || resolvedNode.index !== this.attachedIndex) {
      return resolvedNode;
    }
    if (resolvedNode.motionMode === 'landing_once' && resolvedNode.motionActivatedAt !== null) {
      return resolvedNode;
    }
    return {
      ...resolvedNode,
      resolvedX: attachedAnchor.resolvedX,
      resolvedY: attachedAnchor.resolvedY,
      resolvedZ: attachedAnchor.resolvedZ
    };
  }

  private getDisplayNodes(count: number) {
    const cached = this.displayNodesCache.get(count);
    if (cached) {
      return cached;
    }
    if (this.choiceMode === 'reward_branch' && this.activeChoices.length > 0) {
      this.initializeDisplayWindow(count);
      const nodes = [
        ...this.displayWindowIndices.map((index) => this.getResolvedNode(index)),
        ...this.activeChoices.map((choice) => this.resolveChoiceNode(choice.entry))
      ];
      nodes.sort((a, b) => a.resolvedX - b.resolvedX);
      const deduped: ResolvedGamePathNode[] = [];
      const seen = new Set<string>();
      nodes.forEach((node) => {
        const key = `${node.index}:${Math.round(node.resolvedX * 100)}:${Math.round(node.resolvedY * 100)}`;
        if (seen.has(key)) return;
        seen.add(key);
        deduped.push(node);
      });
      const result = deduped.slice(0, count);
      this.displayNodesCache.set(count, result);
      return result;
    }

    this.initializeDisplayWindow(count);
    const result = this.displayWindowIndices.slice(0, count).map((index) => this.getResolvedNode(index));
    this.displayNodesCache.set(count, result);
    return result;
  }

  private getInteractableVisibleNodes() {
    if (this.interactableVisibleNodesCache) {
      return this.interactableVisibleNodesCache;
    }
    const hasBigCanon = Boolean(this.getEquippedItem('big_canon'));
    const hasFrontCanon = Boolean(this.getEquippedItem('front_canon'));
    const hasGrapple = Boolean(this.getEquippedItem('grappin'));
    const maxReach = Math.max(
      12,
      hasBigCanon ? this.getBigCanonEffectiveRange() + 5.2 : 0,
      hasFrontCanon ? this.getFrontCanonEffectiveRange() + this.getFrontCanonSpreadWidth() + 5.8 : 0,
      hasGrapple ? this.getGrappleEffectiveRange(this.playerPosition.x) + 5.8 : 0
    );
    const directionSign = this.getProgressionDirectionSign();
    const backwardReach = Math.max(7.2, maxReach * 0.44);
    const leftLimit =
      directionSign > 0
        ? this.playerPosition.x - backwardReach
        : this.playerPosition.x - maxReach - 6.8;
    const rightLimit =
      directionSign > 0
        ? this.playerPosition.x + maxReach + 6.8
        : this.playerPosition.x + backwardReach;
    const searchLimit = this.attachedIndex + Math.max(32, Math.ceil(maxReach / Math.max(0.001, DEFAULT_COLUMN_DISTANCE)) * 14);
    const result: ResolvedGamePathNode[] = [];

    for (let index = Math.max(0, this.attachedIndex - 6); index <= searchLimit; index += 1) {
      const node = this.getResolvedNode(index);
      const radius = this.getPhysicalRadius(node);
      if (node.resolvedX + radius < leftLimit) {
        continue;
      }
      if (node.resolvedX - radius > rightLimit) {
        if (index > this.attachedIndex + 6) {
          break;
        }
        continue;
      }
      result.push(node);
    }

    this.interactableVisibleNodesCache = result;
    return result;
  }

  private getGrappleConeHalfAngle() {
    const rangeBonus = Math.max(0, this.getModuleStat('grappin', 'grapRange') - 4.8);
    return clamp(Math.PI / 6.9 + rangeBonus * 0.06, Math.PI / 7.2, Math.PI / 4.9);
  }

  private getGrappleStatRange() {
    return Math.max(3.25, this.runUpgrades.modifiers.grapRange * 1.42);
  }

  private getGrappleOrigin(headingVector: THREE.Vector2) {
    const localUp = this.scratchVectorB.set(-headingVector.y, headingVector.x, 0);
    return new THREE.Vector3(
      this.playerPosition.x + headingVector.x * 0.85 - localUp.x * 0.72,
      this.playerPosition.y + headingVector.y * 0.85 - localUp.y * 0.72,
      this.playerPosition.z + 0.01
    );
  }

  // Shared gameplay surface frame helpers keep attachment, capture and render anchors aligned.
  private getSurfaceTravelTangent(sample: OrbitSample, direction: -1 | 1, target: THREE.Vector2) {
    return target.copy(sample.tangent).multiplyScalar(direction).normalize();
  }

  private getSurfaceNormal(sample: OrbitSample, target: THREE.Vector2) {
    target.set(sample.tangent.y, -sample.tangent.x).normalize();
    if (target.dot(sample.position) < 0) {
      target.multiplyScalar(-1);
    }
    return target;
  }

  private getOrbitWorldPosition(node: ResolvedGamePathNode, sample: OrbitSample, target = new THREE.Vector3()) {
    return target.set(
      node.resolvedX + sample.position.x,
      node.resolvedY + sample.position.y,
      node.resolvedZ
    );
  }

  private getSurfaceContactWorldPosition(node: ResolvedGamePathNode, angle: number, target = new THREE.Vector3()) {
    const surfaceSample = this.getSurfaceSample(node, angle);
    return this.getOrbitWorldPosition(node, surfaceSample, target);
  }

  private findBestSurfaceContact(
    node: ResolvedGamePathNode,
    worldPosition: THREE.Vector3,
    coarseSteps = 96,
    refineRadius = 6
  ): SurfaceContactSample {
    const measureAngle = (angle: number) => {
      const sample = this.getSurfaceSample(node, angle);
      const surfaceWorldPosition = this.getOrbitWorldPosition(node, sample, this.scratchVector);
      const distanceSq = worldPosition.distanceToSquared(surfaceWorldPosition);
      if (distanceSq >= bestDistanceSq) {
        return;
      }
      const normal = this.getSurfaceNormal(sample, this.scratchVector2);
      bestDistanceSq = distanceSq;
      bestAngle = angle;
      bestPosition.copy(sample.position);
      bestTangent.copy(sample.tangent);
      bestNormal.copy(normal);
      bestSurfaceWorldPosition.copy(surfaceWorldPosition);
    };

    let bestAngle = 0;
    let bestDistanceSq = Number.POSITIVE_INFINITY;
    const bestPosition = new THREE.Vector2();
    const bestTangent = new THREE.Vector2(1, 0);
    const bestNormal = new THREE.Vector2(0, 1);
    const bestSurfaceWorldPosition = new THREE.Vector3();
    const coarseStepAngle = (Math.PI * 2) / Math.max(12, coarseSteps);

    for (let step = 0; step < coarseSteps; step += 1) {
      measureAngle(step * coarseStepAngle);
    }

    const refineStepAngle = coarseStepAngle / 12;
    for (let step = -refineRadius; step <= refineRadius; step += 1) {
      measureAngle(wrapAngle(bestAngle + step * refineStepAngle));
    }

    return {
      angle: bestAngle,
      position: bestPosition,
      tangent: bestTangent,
      normal: bestNormal,
      surfaceWorldPosition: bestSurfaceWorldPosition,
      distanceSq: bestDistanceSq
    };
  }

  private offsetSurfaceWorldPosition(node: ResolvedGamePathNode, sample: OrbitSample, outwardOffset: number, target = new THREE.Vector3()) {
    const normal = this.getSurfaceNormal(sample, this.scratchVector2);
    return this.getOrbitWorldPosition(node, sample, target).add(this.scratchVector.set(normal.x * outwardOffset, normal.y * outwardOffset, 0));
  }

  private syncAttachedPlayerSpatial(
    node: ResolvedGamePathNode,
    angle: number,
    direction: -1 | 1,
    travelSpeed: number,
    syncVelocity: boolean,
    sample = this.getOrbitSample(node, angle)
  ) {
    this.getPlayerOrbitWorldPosition(node, angle, sample, this.playerPosition, travelSpeed);
    const travelTangent = this.getSurfaceTravelTangent(sample, direction, this.scratchVector2);
    this.playerHeading.copy(travelTangent);
    this.getSurfaceNormal(sample, this.playerSurfaceNormal);
    if (syncVelocity) {
      this.playerVelocity.set(travelTangent.x * travelSpeed, travelTangent.y * travelSpeed, 0);
      return;
    }
    this.playerVelocity.set(0, 0, 0);
  }

  private syncAirbornePlayerOrientation() {
    const planarSpeedSq = this.playerVelocity.x * this.playerVelocity.x + this.playerVelocity.y * this.playerVelocity.y;
    if (planarSpeedSq <= 0.0001) {
      return;
    }

    this.playerHeading.set(this.playerVelocity.x, this.playerVelocity.y).normalize();
    const candidateNormalX = -this.playerHeading.y;
    const candidateNormalY = this.playerHeading.x;
    if (this.playerSurfaceNormal.lengthSq() > 0.0001) {
      const sign = this.playerSurfaceNormal.x * candidateNormalX + this.playerSurfaceNormal.y * candidateNormalY >= 0 ? 1 : -1;
      this.playerSurfaceNormal.set(candidateNormalX * sign, candidateNormalY * sign);
      return;
    }
    const upwardFacing = candidateNormalY >= 0 ? 1 : -1;
    this.playerSurfaceNormal.set(candidateNormalX * upwardFacing, candidateNormalY * upwardFacing);
  }

  private getMovementHeadingVector(target: THREE.Vector2) {
    const planarSpeed = Math.hypot(this.playerVelocity.x, this.playerVelocity.y);
    if (planarSpeed > 0.85) {
      return target.set(this.playerVelocity.x, this.playerVelocity.y).normalize();
    }
    if (this.playerHeading.lengthSq() > 0.0001) {
      return target.copy(this.playerHeading).normalize();
    }
    return target.set(this.getProgressionDirectionSign(), 0);
  }

  private getGrappleVisibleReach(originX: number) {
    return this.getProgressionDirectionSign() > 0
      ? Math.max(8.2, this.camera.getSafeRight() - originX + DEFAULT_COLUMN_DISTANCE * 1.8)
      : Math.max(8.2, originX - this.camera.getSafeLeft() + DEFAULT_COLUMN_DISTANCE * 1.8);
  }

  private getGrappleEffectiveRange(originX: number) {
    return Math.max(this.getGrappleStatRange() + 0.72, this.getGrappleVisibleReach(originX) * 0.72);
  }

  private getBigCanonEffectiveRange() {
    return Math.max(5.2, this.runUpgrades.modifiers.bigCanonRange + 1.1);
  }

  private getFrontCanonEffectiveRange() {
    const rarityFloor =
      this.getEquippedItem('front_canon')?.rarity === 'legendary'
        ? 17.4
        : this.getEquippedItem('front_canon')?.rarity === 'epic'
          ? 16
          : this.getEquippedItem('front_canon')?.rarity === 'rare'
            ? 14.6
            : this.getEquippedItem('front_canon')?.rarity === 'uncommon'
              ? 13.4
              : 12.2;
    const momentumBoost = this.momentum.gauge * 6.2;
    return Math.max(rarityFloor, this.runUpgrades.modifiers.frontCanonRange + momentumBoost + 7.8);
  }

  private getFrontCanonOriginOffset() {
    return 0.96;
  }

  private getFrontCanonSpreadWidth() {
    switch (this.getEquippedItem('front_canon')?.rarity) {
      case 'legendary':
        return 1.92;
      case 'epic':
        return 1.42;
      case 'rare':
        return 1.02;
      case 'uncommon':
        return 0.74;
      case 'common':
      default:
        return 0.48;
    }
  }

  private getShopCenterHint() {
    if (this.choiceMode !== 'shop_orbit' || this.state !== 'upgrade_branching') {
      return null;
    }
    const node = this.getResolvedNode(this.attachedIndex);
    return new THREE.Vector3(node.resolvedX, node.resolvedY, node.resolvedZ);
  }

  private advanceDisplayAnchor(aheadNodes = 120, chunkSize = 64, plan: StreamingLookaheadPlan | null = null) {
    if (this.displayWindowIndices.length === 0) return;
    if (this.airborneFromMilestone && this.playerState === 'airborne') {
      return;
    }

    for (let slot = 0; slot < this.displayWindowIndices.length; slot += 1) {
      const nodeIndex = this.displayWindowIndices[slot]!;
      const node = this.getResolvedNode(nodeIndex);
      const fullyPastBackline = (() => {
        const radius = this.getPhysicalRadius(node);
        if (this.getProgressionDirectionSign() > 0) {
          const leftCullX = this.camera.getSafeLeft() - DISPLAY_BACKLINE_RELEASE_BUFFER;
          return node.resolvedX + radius < leftCullX;
        }
        const rightCullX = this.camera.getSafeRight() + DISPLAY_BACKLINE_RELEASE_BUFFER;
        return node.resolvedX - radius > rightCullX;
      })();
      if (!fullyPastBackline) {
        continue;
      }

      this.path.ensureAhead(this.displayNextIndex + 1, aheadNodes, chunkSize);
      const replacementIndex = this.findReplacementDisplayNode(
        slot,
        Math.max(DISPLAY_REPLACEMENT_SEARCH_RANGE, chunkSize + 24),
        plan ?? this.getStreamingLookaheadPlan(0)
      );
      if (replacementIndex === null) {
        continue;
      }
      this.displayWindowIndices[slot] = replacementIndex;
      this.displayNextIndex = Math.max(this.displayNextIndex, replacementIndex + 1);
    }
  }

  private initializeDisplayWindow(count: number) {
    if (this.displayWindowIndices.length === 0) {
      this.path.ensureAhead(count + PATH_INITIAL_AHEAD_PADDING, 120, 80);
      this.displayWindowIndices = Array.from({ length: count }, (_, index) => index);
      this.displayNextIndex = count;
      return;
    }

    if (this.displayWindowIndices.length < count) {
      this.path.ensureAhead(count + PATH_INITIAL_AHEAD_PADDING, 120, 80);
      while (this.displayWindowIndices.length < count) {
        this.displayWindowIndices.push(this.displayNextIndex);
        this.displayNextIndex += 1;
      }
    }
  }

  private reconcileDisplayWindowAfterPathChange(
    desiredTotalCount = this.displayWindowIndices.length,
    plan: StreamingLookaheadPlan | null = null
  ) {
    const clampedTotalCount = Math.max(0, desiredTotalCount);
    if (clampedTotalCount === 0) {
      this.displayWindowIndices = [];
      this.displayNextIndex = this.attachedIndex + 1;
      return;
    }

    this.initializeDisplayWindow(clampedTotalCount);
    const activePlan = plan ?? this.getStreamingLookaheadPlan(0);
    this.refreshDisplayWindowOutsideView(activePlan, Math.max(DISPLAY_WINDOW_REMAP_LIMIT, clampedTotalCount));
  }

  private findReplacementDisplayNode(
    excludeSlot: number,
    searchRange = DISPLAY_REPLACEMENT_SEARCH_RANGE,
    plan: StreamingLookaheadPlan
  ) {
    const { right: visibleRight, left: visibleLeft } = this.getCameraVisibleHorizontalBounds();
    for (
      let candidateIndex = this.displayNextIndex;
      candidateIndex < this.displayNextIndex + searchRange;
      candidateIndex += 1
    ) {
      const replacement = this.getResolvedNode(candidateIndex);
      const radius = this.getPhysicalRadius(replacement);
      const minX = replacement.resolvedX - radius;
      const maxX = replacement.resolvedX + radius;
      const spawnsAheadOfVisibleBounds =
        this.getProgressionDirectionSign() > 0
          ? minX > visibleRight + DISPLAY_FORWARD_REMAP_BUFFER
          : maxX < visibleLeft - DISPLAY_FORWARD_REMAP_BUFFER;
      const staysInsidePreparedWindow =
        maxX >= plan.displayWindowMinX && minX <= plan.displayWindowMaxX + DISPLAY_FORWARD_SPAWN_BUFFER;
      if (!spawnsAheadOfVisibleBounds || !staysInsidePreparedWindow) {
        continue;
      }
      if (this.isDisplayNodeOverlapping(replacement, excludeSlot)) {
        continue;
      }
      return candidateIndex;
    }
    return null;
  }

  private isDisplayNodeOverlapping(candidate: ResolvedGamePathNode, excludeSlot: number) {
    for (let slot = 0; slot < this.displayWindowIndices.length; slot += 1) {
      if (slot === excludeSlot) continue;
      const otherIndex = this.displayWindowIndices[slot];
      if (otherIndex === undefined || otherIndex === candidate.index) continue;
      const other = this.getResolvedNode(otherIndex);
      if (this.doNodesOverlapForDisplay(candidate, other)) {
        return true;
      }
    }
    return false;
  }

  private doNodesOverlapForDisplay(a: ResolvedGamePathNode, b: ResolvedGamePathNode) {
    const minDistance =
      this.getPhysicalRadius(a) +
      this.getPhysicalRadius(b) +
      Math.max(0.8, Math.min(2.2, (a.visualScale + b.visualScale) * 0.12));
    const dx = a.resolvedX - b.resolvedX;
    const dy = a.resolvedY - b.resolvedY;
    return dx * dx + dy * dy < minDistance * minDistance;
  }

  private updateMomentum(deltaTime: number) {
    const momentumCap = Math.max(1, this.runUpgrades.modifiers.momentumCap);
    const normalizedGauge = this.getNormalizedMomentumGauge();
    const decayModifier = 1 - Math.min(0.72, this.runUpgrades.modifiers.momentumRetention);
    const decay = this.momentum.decayRate * decayModifier;
    const previousGauge = this.momentum.gauge;
    const airborneGraceActive =
      this.playerState === 'airborne' &&
      this.airborneStartedAt > 0 &&
      this.currentTime - this.airborneStartedAt < 3;
    if (!(this.orbitGraceActive && this.playerState !== 'airborne') && !airborneGraceActive) {
      this.momentum.gauge = clamp(this.momentum.gauge - decay * deltaTime, 0, momentumCap);
    }
    const losingMomentum = this.momentum.gauge < previousGauge - 0.002 && previousGauge > 0.08;
    if (losingMomentum && !this.momentumLossActive) {
      this.emitAudioEvent({ type: 'momentum_loss_start' });
    }
    this.momentumLossActive = losingMomentum;

    const speedTarget = 1 + normalizedGauge * 0.8 + this.runUpgrades.modifiers.speedBonus;
    const jumpTarget = 1 + normalizedGauge * 0.62 + this.runUpgrades.modifiers.chargedLeapBonus * 0.16;
    const cameraZoomTarget =
      normalizedGauge < 0.45
        ? normalizedGauge * 0.92
        : 0.41 + Math.pow((normalizedGauge - 0.45) / 0.55, 1.12) * 0.59;
    const spyglassMomentumBoost =
      this.runUpgrades.modifiers.cameraMomentumZoomBonus *
      Math.pow(normalizedGauge, 1.35) *
      1.18;

    this.momentum.speedMultiplier = damp(this.momentum.speedMultiplier, speedTarget, 2.4, deltaTime);
    this.momentum.jumpMultiplier = damp(this.momentum.jumpMultiplier, jumpTarget, 2.6, deltaTime);
    this.momentum.cameraZoomMultiplier = damp(this.momentum.cameraZoomMultiplier, cameraZoomTarget + spyglassMomentumBoost, 2.2, deltaTime);
    this.momentum.fillRate = damp(this.momentum.fillRate, 0, 4.6, deltaTime);
  }

  private getNormalizedMomentumGauge() {
    return clamp(this.momentum.gauge / Math.max(1, this.runUpgrades.modifiers.momentumCap), 0, 1);
  }

  private updateAttached(deltaTime: number, currentNode: ResolvedGamePathNode) {
    const previousPosition = this.scratchVectorC.set(this.playerPosition.x, this.playerPosition.y, this.playerPosition.z);
    const baselineAngular = (Math.PI * 2) / Math.max(1.6, currentNode.gameplayOrbitPeriod);
    const chargeBoost = this.chargeActive ? 0.64 + this.chargeMeter * 0.52 : 0;
    const usingSouffleurAttached =
      this.chargeActive &&
      Boolean(this.getEquippedItem('souffleur')) &&
      this.consumeModuleGauge('souffleur', deltaTime, 0.28);
    this.souffleurActive = usingSouffleurAttached;
    const souffleurAttachedBoost = usingSouffleurAttached ? 0.32 + this.runUpgrades.modifiers.souffleurBoost * 0.1 : 0;
    const targetAngular =
      baselineAngular *
      (1 + chargeBoost + souffleurAttachedBoost + this.momentum.gauge * 0.64) *
      this.momentum.speedMultiplier *
      (1 + this.runUpgrades.modifiers.chargeRate * 0.08 + this.runUpgrades.modifiers.speedBonus * 0.36);

    const milestoneSlowdown = currentNode.isGigantic ? 0.58 : 1;

    this.angularSpeed = damp(this.angularSpeed, targetAngular * milestoneSlowdown, this.chargeActive ? 2.6 : 1.7, deltaTime);
    this.orbitAngle = wrapAngle(this.orbitAngle + this.orbitDirection * this.angularSpeed * deltaTime);

    const liveOrbit = this.getOrbitSample(currentNode, this.orbitAngle);
    const orbitSpeed = Math.max(1, liveOrbit.position.length()) * this.angularSpeed;
    this.syncAttachedPlayerSpatial(currentNode, this.orbitAngle, this.orbitDirection, orbitSpeed, true, liveOrbit);

    if (this.orbitGraceActive) {
      this.orbitGraceTravel += Math.abs(this.angularSpeed * deltaTime);
      this.orbitGraceProgress = clamp(this.orbitGraceTravel / (Math.PI * 2), 0, 1);
      if (this.orbitGraceProgress >= 1) {
        this.orbitGraceActive = false;
      }
    }

    if (this.chargeActive) {
      const chargeRate = 0.55 + this.runUpgrades.modifiers.chargeRate * 0.24;
      this.chargeMeter = clamp(this.chargeMeter + deltaTime * chargeRate, 0, 1);
      if (this.state === 'running_attached') {
        this.state = 'running_charging';
      }
      if (this.playerState === 'attached') {
        this.playerState = 'charging';
      }
    } else {
      this.chargeMeter = damp(this.chargeMeter, 0, 4.2, deltaTime);
      if (this.playerState === 'charging') {
        this.playerState = 'attached';
      }
      if (this.state === 'running_charging') {
        this.state = 'running_attached';
      }
    }

    this.collectCoinsOnCurrentNode(currentNode);
    this.collectCoinsNearPlayer();
    this.resolveEnemyContact(currentNode, previousPosition);
    this.resolveAmbientEnemyContact(previousPosition, false);

  }

  private updateAirborne(deltaTime: number) {
    const previousPosition = this.scratchVectorC.set(this.playerPosition.x, this.playerPosition.y, this.playerPosition.z);
    const gravityScale = clamp(1 - this.runUpgrades.modifiers.planeGlide * 0.92, 0.12, 1);
    this.playerVelocity.y -= 6.8 * gravityScale * deltaTime;
    this.playerVelocity.x += (this.runUpgrades.modifiers.airControl + this.runUpgrades.modifiers.planeStability * 0.7) * deltaTime * 0.74;

    const usingSouffleur =
      this.chargeActive &&
      Boolean(this.getEquippedItem('souffleur')) &&
      this.consumeModuleGauge('souffleur', deltaTime, 0.42);
    this.souffleurActive = usingSouffleur;
    if (this.runUpgrades.modifiers.gravityCentering > 0) {
      this.applyGravityBeltInfluence(deltaTime);
    }
    if (usingSouffleur) {
      const heading = this.scratchVectorB.set(this.playerVelocity.x || 0.001, this.playerVelocity.y || 0.001, 0).normalize();
      this.playerVelocity.addScaledVector(heading, (0.9 + this.runUpgrades.modifiers.souffleurBoost) * deltaTime);
      this.triggerModuleFlash('souffleur', 0.12);
    }

    const grapAmbientEnemy = this.getAmbientEnemyById(this.grapAmbientEnemyId);
    let grapNode: ResolvedGamePathNode | null = null;
    if (this.grapTargetIndex !== null || grapAmbientEnemy) {
      if (grapAmbientEnemy) {
        this.grapTargetPosition.copy(grapAmbientEnemy.position);
      } else if (this.grapTargetIndex !== null) {
        grapNode = this.getResolvedNode(this.grapTargetIndex);
        if (this.grapTargetAngle !== null) {
          this.getSurfaceContactWorldPosition(grapNode, this.grapTargetAngle, this.grapTargetPosition);
        } else {
          this.grapTargetPosition.set(grapNode.resolvedX, grapNode.resolvedY, grapNode.resolvedZ);
        }
      }
      const pull = this.scratchVectorB.copy(this.grapTargetPosition).sub(this.playerPosition);
      const distance = Math.max(0.001, pull.length());
      pull.normalize();
      const holdingGrapple =
        this.upActionActive &&
        !this.grapAwaitReleaseBeforePull &&
        (!this.grapReleasePending || this.currentTime - this.grapReleasePressedAt >= 0.14);
      if (this.currentTime >= this.grapStateUntil && this.grapState === 'launch') {
        if (grapAmbientEnemy?.kind === 'enemyBot' && this.isAmbientEnemyBotVisible(grapAmbientEnemy)) {
          this.beginSprintFish(grapAmbientEnemy);
          this.emitAudioEvent({ type: 'grapple_hit' });
          return;
        }
        this.grapState = 'hooked';
        this.grapRopeLength = Math.max(0.96, distance);
        this.emitAudioEvent({ type: 'grapple_hit' });
      }
      if (this.grapState === 'launch') {
        const launchRetractRate = holdingGrapple ? 6.8 + this.momentum.gauge * 2.4 : 0;
        const launchFloor = Math.max(0.88, distance * 0.82);
        this.grapRopeLength = Math.max(launchFloor, this.grapRopeLength - launchRetractRate * deltaTime);
        this.playerVelocity.addScaledVector(
          pull,
          Math.min(12.8, 5.8 + distance * (holdingGrapple ? 0.58 : 0.28)) * deltaTime
        );
      } else {
        const canPullWithHold = holdingGrapple;
        if (this.grapReleasePending && this.currentTime - this.grapReleasePressedAt >= 0.18) {
          this.grapReleasePending = false;
        }
        const retractRate = canPullWithHold ? 12.4 + this.momentum.gauge * 3.8 : 0;
        const contactLength = grapNode
          ? Math.max(0.72, this.getOrbitClearance(grapNode) + 0.22)
          : Math.max(0.72, distance - 0.28);
        this.grapRopeLength = Math.max(contactLength, this.grapRopeLength - retractRate * deltaTime);
        const ropeTension = Math.max(0, distance - this.grapRopeLength);
        if (canPullWithHold && ropeTension > -0.24) {
          this.playerVelocity.addScaledVector(
            pull,
            Math.min(16.8, 5.4 + ropeTension * 8.8 + distance * 0.28) * deltaTime
          );
        }
        if (this.chargeActive && canPullWithHold) {
          const grapChargeBoost = this.souffleurActive ? 1.32 + this.runUpgrades.modifiers.souffleurBoost * 0.28 : 0.72;
          this.playerVelocity.addScaledVector(pull, grapChargeBoost * deltaTime);
        }
        if (canPullWithHold) {
          const radialSpeed = this.playerVelocity.dot(pull);
          if (radialSpeed > 0) {
            this.playerVelocity.addScaledVector(pull, -radialSpeed * 0.14);
          }
        }
      }
    }

    this.playerPosition.addScaledVector(this.playerVelocity, deltaTime);
    this.applyGrappleConstraint();
    this.syncAirbornePlayerOrientation();
    this.collectCoinsNearPlayer();
    const travelSpeed = Math.max(0.001, this.playerVelocity.length());

    this.resolveAirborneEnemyContact(previousPosition, travelSpeed);
    this.resolveAmbientEnemyContact(previousPosition, true);
    if (this.state === 'game_over') {
      return;
    }

    if (this.grapTargetIndex !== null) {
      const grappleNode = this.getResolvedNode(this.grapTargetIndex);
      const grappleAttachment = this.findCaptureAttachment(grappleNode, previousPosition, this.playerPosition, travelSpeed);
      if (grappleAttachment) {
        const targetIndex = this.grapTargetIndex;
        this.beginGrappleLanding();
        this.attachToNode(targetIndex, true, this.playerPosition, this.playerVelocity, previousPosition, grappleAttachment, grappleNode);
        return;
      }
      const closestCapture = this.findBestCaptureCandidate(this.getInteractableVisibleNodes(), previousPosition, this.playerPosition, travelSpeed);
      if (closestCapture) {
        if (closestCapture.node.index === this.grapTargetIndex) {
          this.beginGrappleLanding();
        }
        this.attachToNode(
          closestCapture.node.index,
          true,
          this.playerPosition,
          this.playerVelocity,
          previousPosition,
          closestCapture.attachment,
          closestCapture.node
        );
        return;
      }
    }

    if (this.choiceMode === 'reward_branch' && this.activeChoices.length > 0) {
      for (let index = 0; index < this.activeChoices.length; index += 1) {
        const choice = this.activeChoices[index];
        if (!choice) continue;
        const entry = this.resolveChoiceNode(choice.entry);
        const rewardAttachment = this.findCaptureAttachment(entry, previousPosition, this.playerPosition, travelSpeed);
        if (rewardAttachment) {
          const rewardAttachIndex = this.attachedIndex + 3;
          this.commitRewardBranch(index, false);
          this.attachToNode(
            rewardAttachIndex,
            true,
            this.playerPosition,
            this.playerVelocity,
            previousPosition,
            rewardAttachment,
            entry
          );
          return;
        }
      }
    }

    const searchLimit = Math.max(
      this.attachedIndex + Math.max(24, this.displayWindowIndices.length + 8),
      this.sprintFishLandingTargetIndex !== null ? this.sprintFishLandingTargetIndex + 3 : 0
    );
    const giganticCapture = this.findBestForwardCaptureCandidate(previousPosition, this.playerPosition, travelSpeed, searchLimit, true);
    if (giganticCapture) {
      if (this.grapTargetIndex === giganticCapture.node.index) {
        this.beginGrappleLanding();
      }
      this.attachToNode(
        giganticCapture.node.index,
        true,
        this.playerPosition,
        this.playerVelocity,
        previousPosition,
        giganticCapture.attachment,
        giganticCapture.node
      );
      return;
    }

    const forwardCapture = this.findBestForwardCaptureCandidate(previousPosition, this.playerPosition, travelSpeed, searchLimit, false);
    if (forwardCapture) {
      if (this.grapTargetIndex === forwardCapture.node.index) {
        this.beginGrappleLanding();
      }
      this.attachToNode(
        forwardCapture.node.index,
        true,
        this.playerPosition,
        this.playerVelocity,
        previousPosition,
        forwardCapture.attachment,
        forwardCapture.node
      );
      return;
    }

    if (this.runUpgrades.modifiers.phaseJump && this.currentTime >= this.phaseJumpReadyAt) {
      const rescueIndex = this.attachedIndex + 1;
      const rescueNode = this.getResolvedNode(rescueIndex);
      const rescueDistance = this.playerPosition.distanceToSquared(
        this.scratchVector.set(rescueNode.resolvedX, rescueNode.resolvedY, rescueNode.resolvedZ)
      );
      const rescueRadius = (rescueNode.gameplayRadius + this.runUpgrades.modifiers.phaseJumpRescueRadius) ** 2;
      if (rescueDistance < rescueRadius) {
        this.phaseJumpReadyAt = this.currentTime + this.runUpgrades.modifiers.phaseJumpCooldown;
        this.attachToNode(rescueIndex, true, this.playerPosition, this.playerVelocity, null, null, rescueNode);
        return;
      }
    }

    if (this.teleportReadyAt <= this.currentTime && this.runUpgrades.modifiers.teleportRange > 0) {
      const teleportTarget = this.findSafeTeleportTarget(this.runUpgrades.modifiers.teleportRange, 2);
      if (teleportTarget > this.attachedIndex + 1 && this.isNearCameraBackline(this.playerPosition.x, 2.4)) {
        this.teleportReadyAt = this.currentTime + this.runUpgrades.modifiers.teleportCooldown;
        this.attachToNode(teleportTarget, false, null, null, null, null, this.getResolvedNode(teleportTarget));
      }
    }

    if (this.warpReadyAt <= this.currentTime && this.runUpgrades.modifiers.warpRange > 0) {
      const warpTarget = this.findSafeTeleportTarget(this.runUpgrades.modifiers.warpRange, 4);
      if (warpTarget > this.attachedIndex + 3 && this.isNearCameraBackline(this.playerPosition.x, 1.6)) {
        this.warpReadyAt = this.currentTime + this.runUpgrades.modifiers.warpCooldown;
        this.attachToNode(warpTarget, false, null, null, null, null, this.getResolvedNode(warpTarget));
      }
    }

    const currentNode = this.getResolvedNode(this.attachedIndex);
    if (currentNode.isMilestone) {
      if (this.tryConsumePendingMilestoneMirrorLaunch(currentNode) || this.tryTriggerMirrorMode(currentNode)) {
        return;
      }
      if (this.isPendingMilestoneMirrorLaunch(currentNode)) {
        return;
      }
      return;
    }

    if (this.tryConsumePendingMilestoneMirrorLaunch(currentNode)) {
      return;
    }

    if (this.isPendingMilestoneMirrorLaunch(currentNode)) {
      return;
    }

    if (this.isOutsidePlayableField(this.playerPosition)) {
      this.failRun('out_of_bounds');
      return;
    }

    if (this.tryTriggerMirrorMode(currentNode)) {
      return;
    }

    if (this.camera.isBehindSafeLine(this.playerPosition)) {
      this.failRun('camera');
      return;
    }
  }

  private launch() {
    if (this.playerState !== 'attached' && this.playerState !== 'charging') return false;

    const currentNode = this.getResolvedNode(this.attachedIndex);
    if (this.choiceMode === 'shop_orbit') {
      this.dismissActiveShopChoice();
    }
    const orbit = this.getOrbitSample(currentNode, this.orbitAngle);
    const tangent2D = this.getSurfaceTravelTangent(orbit, this.orbitDirection, this.scratchVector2);
    const normal2D = this.getSurfaceNormal(orbit, this.scratchVector2B);
    const tangent = this.scratchVector.set(tangent2D.x, tangent2D.y, 0);
    const radial = this.scratchVectorB.set(normal2D.x, normal2D.y, 0);
    const orbitSpeed = Math.max(1, orbit.position.length()) * this.angularSpeed;
    const launchSpeed =
      (orbitSpeed * 1.08 + 6.2 + this.chargeMeter * 9.7 * (1 + this.runUpgrades.modifiers.chargedLeapBonus)) *
      this.momentum.jumpMultiplier *
      this.runUpgrades.modifiers.jumpPower *
      (1 + this.runUpgrades.modifiers.speedBonus * 0.35);
    const maxBoost = this.chargeMeter >= 0.98;
    const reverseLaunch = tangent2D.x * this.getProgressionDirectionSign() < -0.12;
    const mirrorEligibleAnchor = this.isMirrorAnchorNode(currentNode);
    const mirrorLaunchFastEnough = !currentNode.isMilestone && launchSpeed >= this.getMirrorLaunchSpeedThreshold(launchSpeed);
    this.mirrorLaunchEligible = mirrorEligibleAnchor && reverseLaunch && mirrorLaunchFastEnough;
    if (this.mirrorLaunchEligible) {
      this.mirrorLaunchAnchorIndex = currentNode.index;
      this.mirrorLaunchSpeedThreshold = currentNode.isMilestone ? 0 : Math.max(7.8, launchSpeed * 0.64);
      this.achievements.recordReverseLaunchFromAnchor();
      this.queueAchievementToastsIfNeeded();
    } else {
      this.mirrorLaunchEligible = false;
      this.mirrorLaunchAnchorIndex = null;
      this.mirrorLaunchSpeedThreshold = 0;
    }

    this.registerImpactWave(currentNode, this.orbitAngle, launchSpeed * 0.92);
    this.playerVelocity.copy(tangent.multiplyScalar(launchSpeed)).addScaledVector(radial, launchSpeed * 0.08);
    this.playerHeading.copy(tangent2D);
    this.playerSurfaceNormal.copy(normal2D);
    this.landingFeedbackAirborneSerial += 1;
    this.lastLandingFeedbackTriggerNodeIndex = null;
    this.awaitingFirstJump = false;
    if (currentNode.isMilestone || currentNode.isGigantic) {
      this.disabledMilestoneIndices.add(currentNode.index);
    }
    this.playerState = 'airborne';
    this.state = this.choiceMode === 'reward_branch' ? 'upgrade_branching' : 'running_airborne';
    this.jumpVisualUntil = this.currentTime + 0.14;
    this.remainingExtraJumps = Math.max(0, this.runUpgrades.modifiers.extraJumps);
    this.chargeMeter = 0;
    this.airborneStartedAt = this.currentTime;
    this.airborneFromMilestone = currentNode.isGigantic;
    this.emitAudioEvent({ type: 'jump', maxBoost, speed: launchSpeed });
    this.emitAudioEvent({ type: 'sail', fast: launchSpeed >= 11.5 });
    return true;
  }

  private tryUseAirborneModuleImpulse() {
    const forward2D = this.getMovementHeadingVector(this.scratchVector2);
    const forward = this.scratchVector.set(forward2D.x, forward2D.y, 0);
    let moduleTriggered = false;
    const combinedImpulse = this.scratchVectorB.set(0, 0, 0);
    let combinedPower = 0;
    if (this.hasModuleCharges('propulseur')) {
      this.spendModuleCharge('propulseur');
      const power = Math.max(3.6, this.getModuleStat('propulseur', 'propulsionPower'));
      combinedImpulse.addScaledVector(forward, 0.9 + power * 0.32);
      combinedImpulse.y += 0.06 + power * 0.05;
      combinedPower += power * 1.18;
      this.triggerModuleFlash('propulseur', 0.42);
      this.emitAudioEvent({ type: 'module_activate', slot: 'propulseur' });
      moduleTriggered = true;
    }
    if (this.hasModuleCharges('wings')) {
      this.spendModuleCharge('wings');
      const power = Math.max(3.2, this.getModuleStat('wings', 'propulsionPower'));
      combinedImpulse.addScaledVector(forward, 0.5 + power * 0.18);
      combinedImpulse.y += 0.78 + power * 0.24;
      combinedPower += power;
      this.triggerModuleFlash('wings', 0.82);
      this.achievements.recordModuleActivated('wings', this.currentTime);
      this.emitAudioEvent({ type: 'module_activate', slot: 'wings' });
      moduleTriggered = true;
    }
    if (this.hasModuleCharges('reacteur_front')) {
      this.spendModuleCharge('reacteur_front');
      const power = Math.max(2.6, this.getModuleStat('reacteur_front', 'propulsionPower'));
      combinedImpulse.y += 0.56 + power * 0.26;
      combinedPower += power;
      this.triggerModuleFlash('reacteur_front', 0.4);
      this.emitAudioEvent({ type: 'module_activate', slot: 'reacteur_front' });
      moduleTriggered = true;
    }
    if (this.hasModuleCharges('reacteur_back')) {
      this.spendModuleCharge('reacteur_back');
      const power = Math.max(2.8, this.getModuleStat('reacteur_back', 'propulsionPower'));
      combinedImpulse.addScaledVector(forward, 0.4 + power * 0.2);
      combinedImpulse.y += 0.32 + power * 0.16;
      combinedPower += power;
      this.triggerModuleFlash('reacteur_back', 0.4);
      this.emitAudioEvent({ type: 'module_activate', slot: 'reacteur_back' });
      moduleTriggered = true;
    }
    if (!moduleTriggered) {
      return false;
    }

    const impulse = 3.2 + combinedPower * 0.56 + this.momentum.gauge * 2.2;
    this.playerVelocity.addScaledVector(combinedImpulse.normalize(), impulse + combinedImpulse.length() * 0.9);
    this.syncAirbornePlayerOrientation();
    this.queueAchievementToastsIfNeeded();
    return true;
  }

  private tryConsumeAirborneExtraJump() {
    if (!(this.runUpgrades.modifiers.infiniteFlaps || this.remainingExtraJumps > 0)) {
      return false;
    }
    if (!this.runUpgrades.modifiers.infiniteFlaps) {
      this.remainingExtraJumps -= 1;
    }
    const impulse = 4.2 + this.runUpgrades.modifiers.jumpPower * 1.6;
    this.playerVelocity.y = Math.max(this.playerVelocity.y, 0) + impulse;
    this.playerVelocity.x += 0.9 + this.momentum.gauge * 1.6;
    this.emitAudioEvent({ type: 'sail', fast: this.playerVelocity.length() >= 7.5 });
    return true;
  }

  private tryActivateGrappleFromCurrentState() {
    const gate = this.canAttemptGrapple();
    if (!gate.canAttempt) {
      return false;
    }
    const candidate = this.findGrappleCandidate();
    if (!candidate) {
      return false;
    }
    if (candidate.kind === 'ambient_enemy') {
      return this.armAmbientEnemyGrapple(candidate.enemyId, candidate.distance);
    }
    return this.armGrapple(candidate.index, candidate.distance, candidate.angle);
  }

  private findGrappleCandidate(): GrappleCandidate | null {
    const gate = this.canAttemptGrapple();
    if (!gate.canAttempt) {
      return null;
    }
    const headingVector = this.getMovementHeadingVector(this.scratchVector2);
    const grappleOrigin = this.getGrappleOrigin(headingVector);
    const coneDotMin = Math.cos(this.getGrappleConeHalfAngle());
    const minReach = 1.1;
    const effectiveReach = this.getGrappleEffectiveRange(grappleOrigin.x);
    let bestCandidate: GrappleCandidate | null = null;
    for (const node of this.getInteractableVisibleNodes()) {
      if (node.index === this.attachedIndex) {
        continue;
      }
      const centerX = node.resolvedX - grappleOrigin.x;
      const centerY = node.resolvedY - grappleOrigin.y;
      const centerDistance = Math.hypot(centerX, centerY);
      if (centerDistance <= 0.001) {
        continue;
      }
      const nodeRadius = this.getPhysicalRadius(node) * 0.94;
      const edgeDistance = Math.max(0, centerDistance - nodeRadius);
      if (edgeDistance < minReach || edgeDistance > effectiveReach) {
        continue;
      }
      const centerNormalizedX = centerX / centerDistance;
      const centerNormalizedY = centerY / centerDistance;
      const centerDot = clamp(centerNormalizedX * headingVector.x + centerNormalizedY * headingVector.y, -1, 1);
      const silhouetteBonus = Math.min(0.24, nodeRadius / centerDistance);
      const angleScore = centerDot + silhouetteBonus;
      if (angleScore < coneDotMin) {
        continue;
      }
      const contact = this.findBestSurfaceContact(node, grappleOrigin, 120, 7);
      const toNodeX = contact.surfaceWorldPosition.x - grappleOrigin.x;
      const toNodeY = contact.surfaceWorldPosition.y - grappleOrigin.y;
      const distance = Math.hypot(toNodeX, toNodeY);
      if (distance < minReach || distance > effectiveReach + 0.28) {
        continue;
      }
      if (
        !bestCandidate ||
        angleScore > bestCandidate.angleScore + 0.0005 ||
        (Math.abs(angleScore - bestCandidate.angleScore) <= 0.0005 && distance < bestCandidate.distance - 0.02)
      ) {
        bestCandidate = { kind: 'node', index: node.index, distance, angle: contact.angle, angleScore };
      }
    }

    this.ambientEnemies.forEach((ambientEnemy) => {
      if (ambientEnemy.kind !== 'enemyBot' || ambientEnemy.state !== 'alive' || !this.isAmbientEnemyBotVisible(ambientEnemy)) {
        return;
      }
      const centerX = ambientEnemy.position.x - grappleOrigin.x;
      const centerY = ambientEnemy.position.y - grappleOrigin.y;
      const centerDistance = Math.hypot(centerX, centerY);
      if (centerDistance <= 0.001) {
        return;
      }
      const enemyRadius = this.getAmbientEnemyBaseHalfExtents(ambientEnemy).x;
      const edgeDistance = Math.max(0, centerDistance - enemyRadius);
      if (edgeDistance < minReach || edgeDistance > effectiveReach) {
        return;
      }
      const centerNormalizedX = centerX / centerDistance;
      const centerNormalizedY = centerY / centerDistance;
      const centerDot = clamp(centerNormalizedX * headingVector.x + centerNormalizedY * headingVector.y, -1, 1);
      const silhouetteBonus = Math.min(0.24, enemyRadius / centerDistance);
      const angleScore = centerDot + silhouetteBonus;
      if (angleScore < coneDotMin) {
        return;
      }
      const distance = centerDistance;
      if (
        !bestCandidate ||
        angleScore > bestCandidate.angleScore + 0.0005 ||
        (Math.abs(angleScore - bestCandidate.angleScore) <= 0.0005 && distance < bestCandidate.distance - 0.02)
      ) {
        bestCandidate = {
          kind: 'ambient_enemy',
          enemyId: ambientEnemy.id,
          distance,
          angleScore
        };
      }
    });
    return bestCandidate;
  }

  private canAttemptGrapple() {
    if (this.playerState !== 'airborne') {
      return { canAttempt: false, reason: 'invalid_player_state' } as const;
    }
    if (!this.getEquippedItem('grappin')) {
      return { canAttempt: false, reason: 'missing_grapple_upgrade' } as const;
    }
    if (this.isGrappleBusy()) {
      return { canAttempt: false, reason: 'grapple_busy' } as const;
    }
    const runtime = this.getModuleRuntime('grappin');
    if (runtime && runtime.cooldownRemaining > 0) {
      return { canAttempt: false, reason: 'cooldown' } as const;
    }
    return { canAttempt: true, reason: 'ok' } as const;
  }

  private armGrapple(index: number, distance: number, angle: number) {
    if (!this.isGrappleAvailable()) {
      return false;
    }
    this.grapTargetIndex = index;
    this.grapTargetAngle = angle;
    this.grapAmbientEnemyId = null;
    this.grapState = 'launch';
    this.grapStateUntil = this.currentTime + 0.08;
    this.grapRopeLength = Math.max(0.96, distance);
    this.grapCooldownPending = true;
    this.grapAwaitReleaseBeforePull = false;
    this.grapReleasePending = false;
    this.grapReleasePressedAt = 0;
    this.achievements.recordModuleActivated('grappin', this.currentTime);
    this.queueAchievementToastsIfNeeded();
    this.triggerModuleFlash('grappin', 0.5);
    this.emitAudioEvent({ type: 'grapple_cast' });
    return true;
  }

  private armAmbientEnemyGrapple(enemyId: string, distance: number) {
    if (!this.isGrappleAvailable()) {
      return false;
    }
    this.grapTargetIndex = null;
    this.grapTargetAngle = null;
    this.grapAmbientEnemyId = enemyId;
    this.grapState = 'launch';
    this.grapStateUntil = this.currentTime + 0.08;
    this.grapRopeLength = Math.max(0.96, distance);
    this.grapCooldownPending = true;
    this.grapAwaitReleaseBeforePull = false;
    this.grapReleasePending = false;
    this.grapReleasePressedAt = 0;
    this.achievements.recordModuleActivated('grappin', this.currentTime);
    this.queueAchievementToastsIfNeeded();
    this.triggerModuleFlash('grappin', 0.5);
    this.emitAudioEvent({ type: 'grapple_cast' });
    return true;
  }

  private findSafeTeleportTarget(range: number, minimumAdvance = 2) {
    const candidates = this.path
      .getTeleportCandidates(this.attachedIndex, Math.max(0, Math.round(range)))
      .filter((candidate) => candidate >= this.attachedIndex + minimumAdvance);
    let bestTarget = -1;
    let bestScore = Number.NEGATIVE_INFINITY;

    for (const candidate of candidates) {
      const node = this.getResolvedNode(candidate);
      if (!this.isTeleportTargetSafe(candidate, node)) {
        continue;
      }
      const score = this.getTeleportTargetSafetyScore(candidate, node);
      if (score > bestScore) {
        bestScore = score;
        bestTarget = candidate;
      }
    }

    return bestTarget;
  }

  private isTeleportTargetSafe(index: number, node: ResolvedGamePathNode) {
    if (node.enemySlot?.alive) {
      return false;
    }

    const clearance = Math.max(2.4, node.gameplayRadius + 0.9);
    for (let offset = 0; offset <= 2; offset += 1) {
      const nearbyNode = this.getResolvedNode(index + offset);
      const nearbyEnemy = nearbyNode.enemySlot;
      if (!nearbyEnemy?.alive) {
        continue;
      }
      const enemyPosition = this.getEnemyBodyWorldPosition(nearbyNode, nearbyEnemy.pole);
      const enemyExtents = this.getEnemyBodyHalfExtents(nearbyEnemy, false);
      const enemyHazardRadius = Math.max(enemyExtents.x, enemyExtents.y);
      const distance = enemyPosition.distanceTo(this.scratchVector.set(node.resolvedX, node.resolvedY, node.resolvedZ));
      if (distance <= clearance + enemyHazardRadius) {
        return false;
      }
    }

    return true;
  }

  private getTeleportTargetSafetyScore(index: number, node: ResolvedGamePathNode) {
    let nearestHazardDistance = Number.POSITIVE_INFINITY;
    for (let offset = 0; offset <= 3; offset += 1) {
      const nearbyNode = this.getResolvedNode(index + offset);
      const nearbyEnemy = nearbyNode.enemySlot;
      if (!nearbyEnemy?.alive) {
        continue;
      }
      const enemyDistance = this.getEnemyWorldPosition(nearbyNode, nearbyEnemy.pole).distanceTo(
        this.scratchVector.set(node.resolvedX, node.resolvedY, node.resolvedZ)
      );
      nearestHazardDistance = Math.min(nearestHazardDistance, enemyDistance);
    }

    const hazardBonus = Number.isFinite(nearestHazardDistance) ? Math.min(12, nearestHazardDistance) : 12;
    const advance = index - this.attachedIndex;
    const sizeBonus = node.gameplayRadius * 2.1;
    const lanePenalty = Math.abs(node.resolvedY) * 0.18;
    const eventPenalty = node.eventType === 'shop' ? 0.4 : 0;
    return advance * 1.8 + sizeBonus + hazardBonus - lanePenalty - eventPenalty;
  }

  private tryActivateWrapper(emergencyOnly: boolean, allowChoiceInterrupt = false) {
    if (!this.getEquippedItem('wrapper')) {
      return false;
    }
    if (this.isWrapperBusy()) {
      return false;
    }
    if (this.choiceMode !== 'none' || this.state === 'upgrade_branching') {
      if (!allowChoiceInterrupt) {
        return false;
      }
      if (this.choiceMode === 'shop_orbit') {
        this.dismissActiveShopChoice();
      } else if (this.choiceMode === 'reward_branch') {
        this.dismissActiveRewardChoice();
      }
      this.state = this.playerState === 'airborne' ? 'running_airborne' : this.chargeActive ? 'running_charging' : 'running_attached';
      this.eventCooldownUntil = Math.max(this.eventCooldownUntil, this.currentTime + 0.18);
    }
    if (
      emergencyOnly &&
      !this.isNearCameraBackline(this.playerPosition.x, 2.6) &&
      Math.abs(this.playerPosition.y) < 26
    ) {
      return false;
    }
    const wrapperDistance = Math.max(10, this.runUpgrades.modifiers.wrapperDistance);
    if (!this.isWrapperAvailable()) {
      return false;
    }
    const teleportTarget = this.findSafeTeleportTarget(wrapperDistance, 2);
    if (teleportTarget <= this.attachedIndex + 1) {
      return false;
    }
    this.wrapperPendingTarget = teleportTarget;
    this.wrapperTeleportAt = this.currentTime + 2;
    this.wrapperHoldUntil = this.wrapperTeleportAt + 1.6;
    this.wrapperVisualUntil = this.wrapperHoldUntil + 0.4;
    this.wrapperCooldownPending = true;
    this.achievements.recordModuleActivated('wrapper', this.currentTime);
    this.queueAchievementToastsIfNeeded();
    this.emitAudioEvent({ type: 'module_activate', slot: 'wrapper' });
    return true;
  }

  private resolveLandingOrbitDirection(attachment: OrbitAttachment, incomingPlanarVelocity: THREE.Vector2): -1 | 1 {
    const signedTangentialVelocity = attachment.normal.x * incomingPlanarVelocity.y - attachment.normal.y * incomingPlanarVelocity.x;
    if (Math.abs(signedTangentialVelocity) > 0.035) {
      return signedTangentialVelocity >= 0 ? 1 : -1;
    }
    return attachment.tangent.dot(this.playerHeading) >= 0 ? 1 : -1;
  }

  private attachToNode(
    index: number,
    preserveMomentum: boolean,
    landingPosition: THREE.Vector3 | null,
    incomingVelocity: THREE.Vector3 | null,
    landingSegmentStart: THREE.Vector3 | null = null,
    resolvedAttachment: OrbitAttachment | null = null,
    resolvedNodeSnapshot: ResolvedGamePathNode | null = null
  ) {
    this.clearSprintFishLandingAssist();
    this.attachedIndex = index;
    this.mirrorLaunchEligible = false;
    this.mirrorLaunchAnchorIndex = null;
    this.mirrorLaunchSpeedThreshold = 0;
    this.setAttachedNodeRuntimeAnchor(resolvedNodeSnapshot ?? this.getResolvedNode(index));
    const node = this.getResolvedNode(index);
    if (preserveMomentum && landingPosition && incomingVelocity) {
      this.path.activateLandingTriggeredMotion(index, this.currentTime);
    }
    if (!this.lastLandingWasJudged) {
      this.twistStreak = 0;
    }
    this.lastLandingWasJudged = false;
    let nextAngle = this.orbitAngle;
    let nextDirection: -1 | 1 = index === 0 ? -1 : this.orbitDirection;
    let nextAngularSpeed = (Math.PI * 2) / Math.max(1.4, node.gameplayOrbitPeriod);
    let landingAttachment: OrbitAttachment | null = null;
    let landingTwistChainLength = this.twistStreak;

    if (preserveMomentum && landingPosition && incomingVelocity) {
      const attachment =
        resolvedAttachment ??
        (landingSegmentStart
          ? this.findBestOrbitAttachmentOnSegment(node, landingSegmentStart, landingPosition, incomingVelocity.length()) ??
            this.findBestOrbitAttachment(node, landingPosition, incomingVelocity.length())
          : this.findBestOrbitAttachment(node, landingPosition, incomingVelocity.length()));
      landingAttachment = attachment;
      nextAngle = attachment.angle;
      const incomingPlanarVelocity = this.scratchVector2.set(incomingVelocity.x, incomingVelocity.y);
      const signedTangentialVelocity = attachment.normal.x * incomingPlanarVelocity.y - attachment.normal.y * incomingPlanarVelocity.x;
      nextDirection = this.resolveLandingOrbitDirection(attachment, incomingPlanarVelocity);
      const tangentialSpeed = Math.abs(signedTangentialVelocity);
      const radius = Math.max(1.2, attachment.position.length());
      nextAngularSpeed = clamp(
        tangentialSpeed / radius,
        (Math.PI * 2) / Math.max(1.4, node.gameplayOrbitPeriod) * 0.72,
        (Math.PI * 2) / Math.max(1.1, node.gameplayOrbitPeriod) * 2.2
      );
      const landingJudgement = this.applyLandingJudgement(nextDirection, tangentialSpeed, node, attachment, incomingVelocity, nextAngularSpeed);
      nextAngularSpeed = landingJudgement.angularSpeed;
      landingTwistChainLength = landingJudgement.twistChainLength;
      this.registerImpactWave(node, attachment.angle, incomingVelocity.length());
    } else {
      nextAngle = index === 0 ? Math.PI * 0.18 : 0;
      nextDirection = index === 0 ? -1 : this.orbitDirection;
    }

    this.stats.recordLanding(node.pathDistance, performance.now(), clamp(this.momentum.gauge, 0, 1), landingTwistChainLength);
    this.score = this.stats.getSnapshot().score;
    if (preserveMomentum) {
      this.achievements.recordDistance(this.stats.getSnapshot().distanceMeters);
      this.queueAchievementToastsIfNeeded();
    }
    this.emitScore();

    this.orbitAngle = nextAngle;
    this.orbitDirection = nextDirection;
    this.angularSpeed = nextAngularSpeed;
    this.orbitGraceActive = true;
    this.orbitGraceProgress = 0;
    this.orbitGraceTravel = 0;
    this.playerState = 'attached';
    this.state = 'running_attached';
    this.airborneFromMilestone = false;
    this.airborneStartedAt = 0;
    this.landingVisualUntil = this.currentTime + 0.12;
    this.chargeActive = false;
    this.upActionActive = false;
    this.chargeMeter = 0;
    this.remainingExtraJumps = Math.max(0, this.runUpgrades.modifiers.extraJumps);
    this.resetJumpModuleCharges();
    if (this.grapState !== 'idle') {
      this.beginGrappleLanding();
    }
    this.grapRopeLength = 0;

    if (landingAttachment) {
      this.playerPosition.copy(landingAttachment.worldPosition);
      this.playerHeading.copy(this.scratchVector2.copy(landingAttachment.tangent).multiplyScalar(this.orbitDirection).normalize());
      this.playerSurfaceNormal.copy(landingAttachment.normal);
      this.playerVelocity.set(0, 0, 0);
    } else {
      const liveOrbit = this.getOrbitSample(node, this.orbitAngle);
      const orbitSpeed = Math.max(1, liveOrbit.position.length()) * this.angularSpeed;
      this.syncAttachedPlayerSpatial(node, this.orbitAngle, this.orbitDirection, orbitSpeed, false, liveOrbit);
    }

    this.collectCoinsOnCurrentNode(node);
    this.resolveEnemyContact(node, landingSegmentStart ?? landingPosition ?? this.playerPosition);
    if (this.choiceMode === 'reward_branch' && !node.isMilestone && node.colorHint !== 'reward') {
      this.choiceMode = 'none';
      this.activeChoices = [];
      this.hiddenMilestoneChoice = null;
      this.activeShopAngles = [];
      this.state = 'running_attached';
    }

    if (this.currentTime >= this.eventCooldownUntil) {
      this.resolveNodeEvent(node);
    }
  }

  private applyLandingJudgement(
    direction: -1 | 1,
    tangentialSpeed: number,
    node: ResolvedGamePathNode,
    attachment: ReturnType<GameSessionController['findBestOrbitAttachment']>,
    incomingVelocity: THREE.Vector3,
    angularSpeed: number
  ): { angularSpeed: number; twistChainLength: number } {
    if (
      node.isGigantic &&
      this.lastLandingFeedbackConsumedSerial === this.landingFeedbackAirborneSerial &&
      this.lastLandingFeedbackTriggerNodeIndex === node.index
    ) {
      return { angularSpeed, twistChainLength: this.twistStreak };
    }

    const incoming2D = this.scratchVector2.set(incomingVelocity.x, incomingVelocity.y);
    const incomingLength = Math.max(0.001, incoming2D.length());
    incoming2D.divideScalar(incomingLength);
    const tangentDirection = attachment.tangent.clone().multiplyScalar(direction).normalize();
    const radialDirection = attachment.normal;
    const tangentialAlignment = clamp(incoming2D.dot(tangentDirection), -1, 1);
    const frontalPenalty = Math.abs(incoming2D.dot(radialDirection));
    const twist = this.lastLandingDirection !== 0 && direction !== this.lastLandingDirection;

    const gradeBonus = this.runUpgrades.modifiers.gradeWindowBonus;
    let grade: LandingGrade = 'good';
    if (frontalPenalty > 0.92 + gradeBonus * 0.2 || tangentialAlignment < 0.08 - gradeBonus * 0.12) {
      grade = 'miss';
    } else if (tangentialAlignment > 0.965 && frontalPenalty < 0.18) {
      grade = 'perfect';
    } else if (tangentialAlignment > 0.62 - gradeBonus * 0.32 && frontalPenalty < 0.56 + gradeBonus * 0.28) {
      grade = 'super';
    }

    if (grade === 'miss' && this.runUpgrades.modifiers.failSafe) {
      grade = 'good';
    }

    const twistChainLength = twist && grade !== 'miss' ? this.twistStreak + 1 : 0;
    if (twist && grade !== 'miss') {
      this.twistStreak += 1;
    } else {
      this.twistStreak = 0;
    }
    this.lastLandingWasJudged = true;

    const gradeMomentumGain = grade === 'miss' ? 0 : MOMENTUM_GAIN_BY_GRADE[grade];
    const twistChainBonus = twist && grade !== 'miss' ? computeTwistChainBonus(this.twistStreak) : 0;
    let momentumGain = grade === 'miss' ? 0 : gradeMomentumGain + twistChainBonus;

    let speedMultiplier = 1;
    if (grade === 'miss') {
      const penaltyScale = 1 - Math.min(0.72, this.runUpgrades.modifiers.landingPenaltyReduction);
      momentumGain = MISS_MOMENTUM_PENALTY * penaltyScale;
      speedMultiplier = 1 - 0.16 * penaltyScale;
    } else if (grade === 'super') {
      speedMultiplier = twist ? 1.34 : 1.1;
    } else if (grade === 'perfect') {
      speedMultiplier = twist ? 1.48 : 1.16;
    } else if (twist) {
      speedMultiplier = 1.24;
    }

    this.applyMomentumDelta(momentumGain);
    this.lastLandingDirection = direction;
    this.achievements.recordLanding({
      grade,
      twist,
      shapeKind: node.shapeKind,
      isMilestone: node.isMilestone,
      inMirror: this.getProgressionDirectionSign() < 0
    });
    this.startLandingFeedback(node.index, grade, twist, attachment.worldPosition, tangentDirection, attachment.normal);
    this.emitAudioEvent({ type: 'land', kind: this.getLandingAudioKind(node) });
    this.emitAudioEvent({ type: 'grade', grade });
    if (twist) {
      this.emitAudioEvent({ type: 'twist' });
    }
    this.queueAchievementToastsIfNeeded();
    void tangentialSpeed;
    void node;
    return { angularSpeed: angularSpeed * speedMultiplier, twistChainLength };
  }

  private getLandingAudioKind(node: ResolvedGamePathNode): 'normal' | 'milestone' | 'reward' | 'shop' {
    if (node.eventType === 'shop') {
      return 'shop';
    }
    if (node.isMilestone) {
      return 'milestone';
    }
    if (node.colorHint === 'reward') {
      return 'reward';
    }
    return 'normal';
  }

  private startLandingFeedback(
    nodeIndex: number,
    grade: LandingGrade,
    twist: boolean,
    anchorPosition: THREE.Vector3,
    heading: THREE.Vector2,
    normal: THREE.Vector2
  ) {
    if (this.lastLandingFeedbackConsumedSerial === this.landingFeedbackAirborneSerial) {
      return;
    }
    if (this.lastLandingFeedbackTriggerNodeIndex === nodeIndex) {
      return;
    }
    if (this.landingFeedbackNodeIndex === nodeIndex && this.currentTime - this.landingFeedbackStartedAt < this.landingFeedbackDuration) {
      return;
    }
    this.landingFeedbackNodeIndex = nodeIndex;
    this.lastLandingFeedbackTriggerNodeIndex = nodeIndex;
    this.lastLandingFeedbackConsumedSerial = this.landingFeedbackAirborneSerial;
    this.landingFeedbackStartedAt = this.currentTime;
    this.landingFeedbackSerial += 1;
    this.landingFeedback = {
      serial: this.landingFeedbackSerial,
      grade,
      twist,
      progress: 0,
      worldPosition: new THREE.Vector3(
        anchorPosition.x - heading.x * 1.18 + normal.x * 0.76,
        anchorPosition.y - heading.y * 1.18 + normal.y * 0.76,
        anchorPosition.z + 0.02
      )
    };
  }

  private resolveNodeEvent(node: ResolvedGamePathNode) {
    if (node.isMilestone) {
      if (!this.milestoneChoiceCache.has(node.index)) {
        const offers = buildUpgradeOffers(node.index, this.runUpgrades, this.path.getSeededRng(), 4);
        this.milestoneChoiceCache.set(node.index, this.path.createUpgradeBranches(node.index, offers.slice(0, 3), this.score));
        this.hiddenMilestoneChoice = offers[3] ? this.path.createHiddenMilestoneBackBranch(node.index, offers[3]) : null;
      } else if (!this.hiddenMilestoneChoice) {
        const offers = buildUpgradeOffers(node.index, this.runUpgrades, this.path.getSeededRng(), 4);
        this.hiddenMilestoneChoice = offers[3] ? this.path.createHiddenMilestoneBackBranch(node.index, offers[3]) : null;
      }
      this.activeChoices = (this.milestoneChoiceCache.get(node.index) ?? []).map((choice) => ({
        ...choice,
        previewNodes: choice.previewNodes.map((previewNode) => ({ ...previewNode, coinSlots: previewNode.coinSlots.map((slot) => ({ ...slot })) })),
        pathNodes: choice.pathNodes.map((pathNode) => ({ ...pathNode, coinSlots: pathNode.coinSlots.map((slot) => ({ ...slot })) }))
      }));
      this.choiceMode = 'reward_branch';
      this.state = 'upgrade_branching';
      this.eventCooldownUntil = this.currentTime + 0.2;
      return;
    }

    switch (node.eventType) {
      case 'shop': {
        this.shop.openForRun(node.index, this.runUpgrades);
        const shopOffers = this.shop.getActiveOffers().slice(0, 3);
        this.activeChoices = shopOffers.map((shopOffer) => ({
          mode: 'shop_orbit',
          offer: shopOffer.offer,
          price: shopOffer.price,
          entry: node,
          previewNodes: [],
          pathNodes: []
        }));
        this.activeShopAngles = shopOffers.map((shopOffer) => shopOffer.angle);
        this.choiceMode = 'shop_orbit';
        this.state = 'upgrade_branching';
        this.eventCooldownUntil = this.currentTime + 0.2;
        break;
      }
      case 'gift': {
        const offer = buildUpgradeOffers(node.index, this.runUpgrades)[0];
        if (offer) {
          this.applyOffer(offer, 'Gift shard');
        }
        break;
      }
      case 'rare_item': {
        const offer = buildUpgradeOffers(Math.max(100, node.index), this.runUpgrades)[0];
        if (offer) {
          this.applyOffer(offer, 'Rare item');
        }
        break;
      }
      case 'none':
      default:
        break;
    }
  }

  private commitRewardBranch(index: number, viaFallback: boolean) {
    const choice = this.activeChoices[index];
    if (!choice) return false;
    return this.commitRewardChoice(choice, viaFallback);
  }

  private commitRewardChoice(choice: BranchChoice, viaFallback: boolean) {
    this.milestoneChoiceCache.delete(this.attachedIndex);
    this.achievements.recordMilestoneRewardClaimed();
    this.applyOffer(choice.offer, viaFallback ? 'Quick choice' : 'Path chosen');
    this.choiceMode = 'none';
    this.activeChoices = [];
    this.hiddenMilestoneChoice = null;
    this.activeShopAngles = [];
    this.state = 'upgrade_acquired';
    this.eventCooldownUntil = this.currentTime + 0.35;
    return true;
  }

  private applyOffer(offer: RogueliteItemOffer, subtitle: string, purchased = false) {
    this.runUpgrades = applyItemToRunState(this.runUpgrades, offer.item.id);
    this.syncPathEventBiases();
    this.remainingExtraJumps = Math.max(0, this.runUpgrades.modifiers.extraJumps);
    this.shieldCharges = Math.max(this.shieldCharges, this.runUpgrades.modifiers.shieldCharges);
    this.achievements.recordItemAcquired(offer.item, { purchased });
    this.queueAchievementToastsIfNeeded();
    this.startAcquisition(offer, subtitle);
  }

  private startAcquisition(offer: RogueliteItemOffer, subtitle: string) {
    this.acquisitionStartedAt = this.currentTime;
    this.acquisition = {
      offer,
      progress: 0,
      subtitle
    };
  }

  private resolveGameplayEvents(elapsedTime: number) {
    this.updatePendingCanonShots(elapsedTime);
    this.updateAutoFire(elapsedTime);
  }

  private syncShopPresentation(currentNode: ResolvedGamePathNode, elapsedTime: number) {
    this.shopCenter.set(currentNode.resolvedX, currentNode.resolvedY, currentNode.resolvedZ);
    this.shop.update(this.shopCenter, currentNode.gameplayRadius + 0.7, elapsedTime);
  }

  private syncCameraFollow(deltaTime: number, currentNode: ResolvedGamePathNode, nextNode: ResolvedGamePathNode) {
    const mobileLike = isMobileRuntime();
    const directionSign = this.getProgressionDirectionSign();
    const milestoneAirborne = this.airborneFromMilestone && this.playerState === 'airborne';
    const cameraCurrentNode = milestoneAirborne ? nextNode : currentNode;
    const cameraNextNode =
      milestoneAirborne
        ? this.getResolvedNode(this.attachedIndex + 2)
        : nextNode;
    const upcomingMilestoneFactor =
      cameraNextNode.isGigantic
        ? clamp(1 - Math.max(0, this.getDirectionalDelta(this.playerPosition.x, cameraNextNode.resolvedX)) / 34, 0, 1)
        : 0;
    const largeShardFactor = clamp((Math.max(cameraCurrentNode.visualScale, cameraNextNode.visualScale) - 2.8) / 28, 0, 1.24);
    const milestoneReleaseZoom =
      milestoneAirborne
        ? clamp(1 - Math.max(0, this.getDirectionalDelta(currentNode.resolvedX, this.playerPosition.x)) / 24, 0, 1) * (mobileLike ? 19.5 : 16.2)
        : 0;
    const milestoneLockActive = currentNode.isGigantic && this.playerState !== 'airborne';
    const shopLockActive = this.isShopInteractionLocked() && this.playerState !== 'airborne';
    const focusLock =
      milestoneLockActive
        ? {
            mode: 'milestone' as const,
            focusX: currentNode.resolvedX + 0.52 * directionSign,
            focusY: currentNode.resolvedY
          }
        : shopLockActive
          ? {
              mode: 'shop' as const,
              focusX: currentNode.resolvedX,
              focusY: currentNode.resolvedY
            }
          : null;
    const cameraLockActive = milestoneLockActive || shopLockActive;
    const milestoneLockZoom = milestoneLockActive ? (mobileLike ? 40.5 : 50.8) : 0;
    const shopLockZoom = shopLockActive ? (mobileLike ? 13.8 : 16.2) : 0;
    const milestoneZoom =
      milestoneLockActive
        ? milestoneLockZoom
        : shopLockActive
          ? shopLockZoom
          : Math.max(milestoneReleaseZoom, upcomingMilestoneFactor * (mobileLike ? 30 : 27));
    const choiceZoom =
      (this.choiceMode === 'reward_branch' ? (mobileLike ? 6.8 : 5.4) : this.choiceMode === 'shop_orbit' && !shopLockActive ? 2.8 : this.state === 'upgrade_acquired' ? 2.4 : 0) +
      this.runUpgrades.modifiers.cameraBaseZoomBonus;
    const speedPressure = this.awaitingFirstJump || cameraLockActive ? 0 : this.momentum.speedMultiplier;
    this.camera.update({
      deltaTime,
      state: this.state,
      distanceMeters: this.stats.getSnapshot().distanceMeters,
      directionSign,
      currentNode: cameraCurrentNode,
      nextNode: cameraNextNode,
      playerPosition: this.playerPosition,
      momentumGauge: this.momentum.cameraZoomMultiplier,
      largeShardFactor,
      milestoneZoom,
      choiceZoom,
      speedPressure: speedPressure * (1 - this.runUpgrades.modifiers.timeSlowFactor * 0.55),
      focusLock,
      verticalClampMinY: CAMERA_VERTICAL_TRACK_MIN_Y,
      verticalClampMaxY: CAMERA_VERTICAL_TRACK_MAX_Y
    });
  }

  private syncTrailVisual() {
    for (let index = this.trailPoints.length - 1; index > 0; index -= 1) {
      this.trailPoints[index].copy(this.trailPoints[index - 1]);
    }
    this.trailPoints[0].copy(this.playerPosition);
    this.trailPoints.forEach((point, index) => {
      this.trailBuffer[index * 3] = point.x;
      this.trailBuffer[index * 3 + 1] = point.y;
      this.trailBuffer[index * 3 + 2] = point.z;
    });
    const geometry = this.playerTrail.geometry.getAttribute('position');
    geometry.needsUpdate = true;
    const sprintEnemy = this.getAmbientEnemyById(this.grapAmbientEnemyId);
    const sprintIntensity =
      this.grapState === 'sprint_fish' && sprintEnemy?.state === 'sprint_fish'
        ? clamp(
            ((sprintEnemy.sprintTowSpeed || this.playerVelocity.length()) - SPRINT_FISH_TOW_SPEED_MIN) /
              Math.max(0.001, SPRINT_FISH_TOW_SPEED_MAX - SPRINT_FISH_TOW_SPEED_MIN),
            0,
            1
          )
        : 0;
    this.playerTrail.material.opacity =
      sprintIntensity > 0
        ? THREE.MathUtils.lerp(0.54, 0.9, sprintIntensity)
        : 0.24 + this.momentum.gauge * 0.36;
  }

  private syncPlayerVisual(elapsedTime: number) {
    this.player.position.copy(this.playerPosition);
    const currentNode = this.state === 'portal_preview' ? this.getPortalPreviewNode() : this.getResolvedNode(this.attachedIndex);
    const orbit = this.getOrbitSample(currentNode, this.orbitAngle);
    const headingVector = this.getMovementHeadingVector(this.scratchVector2);
    const heading = Math.atan2(headingVector.y, headingVector.x);
    this.player.rotation.z = heading;
    this.player.scale.set(1, this.playerState === 'airborne' ? 1 : this.orbitDirection > 0 ? -1 : 1, 1);
    this.playerMainSprite.group.rotation.z = 0;
    this.playerBoostSprite.group.rotation.z = 0;
    this.playerMainSprite.group.position.set(0, 0, 0);
    this.playerBoostSprite.group.position.set(0, 0, 0);
    const milestoneIndicatorVisible = currentNode.isGigantic && this.playerState !== 'airborne' && this.state !== 'portal_preview';
    this.milestonePlayerIndicator.visible = milestoneIndicatorVisible;
    if (milestoneIndicatorVisible) {
      const orientationFlip = this.player.scale.y < 0 ? -1 : 1;
      const localUpX = -Math.sin(heading) * orientationFlip;
      const localUpY = Math.cos(heading) * orientationFlip;
      const hoverOffset = 4.15 + Math.sin(elapsedTime * 3.2) * 0.18;
      this.milestonePlayerIndicator.position.set(
        this.playerPosition.x + localUpX * hoverOffset,
        this.playerPosition.y + localUpY * hoverOffset,
        this.playerPosition.z + 0.02
      );
      this.milestonePlayerIndicator.rotation.z = heading - Math.PI * 0.5 + (orientationFlip < 0 ? Math.PI : 0) + (this.orbitDirection < 0 ? Math.PI : 0) + Math.PI;
    }

    const visualState = this.resolvePlayerVisualState();
    const orbitSpeed = Math.max(this.playerVelocity.length(), Math.abs(this.angularSpeed) * Math.max(1, orbit.position.length()));
    const idleScale = 1 + this.momentum.gauge * 0.12 + Math.sin(elapsedTime * 8) * 0.02;
    const showGlide = visualState === 'attached_idle_orbit' || visualState === 'attached_fast_orbit';

    if (this.state === 'game_over') {
      const collapse = clamp((elapsedTime - this.gameOverStartedAt) / 0.26, 0, 1);
      const scale = Math.max(0.02, 1 - collapse * 1.22);
      this.playerMainSprite.setVisible(true);
      this.playerBoostSprite.setVisible(false);
      this.stickMonkeyAirSprite.setVisible(true);
      this.stickMonkeyGlideSprite.setVisible(false);
      this.playerMainSprite.setScale(scale);
      this.stickMonkeyAirSprite.setScale(scale);
      this.playerMainSprite.setFrame(3);
      this.stickMonkeyAirSprite.setFrame(3);
      Object.values(this.moduleSprites).forEach((sprite) => sprite?.setVisible(false));
      this.clearWorldItemEffects();
      return;
    }

    this.playerMainSprite.setVisible(!showGlide);
    this.playerBoostSprite.setVisible(showGlide);
    this.stickMonkeyAirSprite.setVisible(!showGlide);
    this.stickMonkeyGlideSprite.setVisible(showGlide);
    this.playerMainSprite.setScale(idleScale);
    this.playerBoostSprite.setScale(idleScale);
    this.stickMonkeyAirSprite.setScale(idleScale);
    this.stickMonkeyGlideSprite.setScale(idleScale);

    if (showGlide) {
      this.playerBoostSprite.playLoop([0, 1, 2, 3], orbitSpeed < 5.4 ? 4.4 : orbitSpeed < 8.4 ? 7.2 : orbitSpeed < 11.5 ? 9.6 : 12.8, elapsedTime);
      this.stickMonkeyGlideSprite.playLoop([0, 1, 2, 3], orbitSpeed < 5.4 ? 4.2 : orbitSpeed < 8.4 ? 6.6 : orbitSpeed < 11.5 ? 8.8 : 11.2, elapsedTime + 0.08);
    } else {
      if (visualState === 'jump_start') {
        this.playerMainSprite.setFrame(0);
        this.stickMonkeyAirSprite.setFrame(0);
      } else if (visualState === 'landing') {
        this.playerMainSprite.setFrame(3);
        this.stickMonkeyAirSprite.setFrame(3);
      } else {
        this.playerMainSprite.playLoop([1, 2], 5.6, elapsedTime);
        this.stickMonkeyAirSprite.playLoop([1, 2], 5.2, elapsedTime + 0.04);
      }
    }

    this.syncModuleSprites(elapsedTime, showGlide);
    this.syncWorldModuleIndicators(heading);
  }

  private syncModuleSprites(elapsedTime: number, showGlide: boolean) {
    (Object.keys(this.moduleSprites) as RogueliteModuleSlot[]).forEach((slot) => {
      const sprite = this.moduleSprites[slot];
      const item = this.getEquippedItem(slot);
      if (!sprite || !item) {
        sprite?.setVisible(false);
        return;
      }

      sprite.setVisible(true);
      sprite.setScale(1);

      if (slot === 'plane') {
        if (!showGlide && this.playerState === 'airborne') {
          if (this.chargeActive || Math.abs(this.playerVelocity.y) > 1.1) {
            sprite.playLoop([0, 1, 2, 3], this.chargeActive ? 8.4 : 5.8, elapsedTime);
          } else {
            sprite.setFrame(0);
          }
        } else {
          sprite.setFrame(0);
        }
        return;
      }

      if (slot === 'wings') {
        if ((this.moduleFlashUntil.wings ?? 0) > this.currentTime) {
          sprite.playLoop([0, 1, 2, 3, 4, 5, 6, 7], 10.8, elapsedTime);
        } else {
          sprite.setFrame(0);
        }
        return;
      }

      if (slot === 'propulseur') {
        if ((this.moduleFlashUntil.propulseur ?? 0) > this.currentTime) {
          sprite.playLoop([0, 1, 2, 3], 11.2, elapsedTime);
        } else {
          sprite.setFrame(0);
        }
        return;
      }

      if (slot === 'big_canon' || slot === 'front_canon') {
        const animationActive =
          slot === 'big_canon'
            ? this.syncOneShotModuleAnimation(sprite, [1, 2, 3], this.bigCanonAnimStartedAt, this.bigCanonAnimUntil)
            : this.syncOneShotModuleAnimation(sprite, [1, 2, 3], this.frontCanonAnimStartedAt, this.frontCanonAnimUntil);
        if (!animationActive) {
          sprite.setFrame((this.moduleFlashUntil[slot] ?? 0) > this.currentTime ? 1 : 0);
        }
        return;
      }

      if (slot === 'reacteur_front' || slot === 'reacteur_back' || slot === 'souffleur') {
        const isHot =
          (this.moduleFlashUntil[slot] ?? 0) > this.currentTime ||
          (slot === 'souffleur' && this.souffleurActive);
        if (isHot) {
          sprite.playLoop([1, 2, 3], 10.6, elapsedTime);
        } else {
          sprite.setFrame(0);
        }
        return;
      }

      if (slot === 'shield') {
        const runtime = this.getModuleRuntime('shield');
        if (this.shieldHitUntil > this.currentTime) {
          sprite.setFrame(1);
        } else if (this.shieldRechargeFlashUntil > this.currentTime) {
          sprite.setFrame(3);
        } else if ((runtime?.cooldownRemaining ?? 0) > 0) {
          sprite.setFrame(2);
        } else {
          sprite.setFrame(0);
        }
        return;
      }

      if (slot === 'wrapper') {
        if (this.wrapperPendingTarget !== null && this.currentTime < this.wrapperTeleportAt) {
          const remaining = this.wrapperTeleportAt - this.currentTime;
          const frame = remaining > 1.2 ? 1 : 2;
          sprite.setFrame(frame);
          sprite.mesh.renderOrder = frame === 2 ? 96 : item.boatVisual?.layerOrder ?? 80;
        } else if (this.currentTime < this.wrapperHoldUntil) {
          sprite.setFrame(2);
          sprite.mesh.renderOrder = 96;
        } else if (this.wrapperVisualUntil > this.currentTime) {
          sprite.setFrame(3);
          sprite.mesh.renderOrder = item.boatVisual?.layerOrder ?? 80;
        } else {
          sprite.mesh.renderOrder = item.boatVisual?.layerOrder ?? 80;
          sprite.setFrame(0);
        }
        return;
      }

      if (slot === 'grappin') {
        if (this.grapState === 'launch') {
          sprite.setFrame(1);
        } else if (this.grapState === 'hooked' || this.grapState === 'sprint_fish') {
          sprite.setFrame(2);
        } else if (this.grapState === 'landing') {
          sprite.setFrame(3);
        } else {
          sprite.setFrame(0);
        }
        return;
      }

      sprite.setFrame(0);
    });
  }

  private syncOneShotModuleAnimation(
    sprite: SpriteSheetPlane,
    frames: number[],
    startedAt: number,
    until: number
  ) {
    if (until <= startedAt || this.currentTime >= until) {
      return false;
    }
    const duration = Math.max(0.001, until - startedAt);
    const progress = clamp((this.currentTime - startedAt) / duration, 0, 0.999);
    const frameIndex = Math.min(frames.length - 1, Math.floor(progress * frames.length));
    sprite.setFrame(frames[frameIndex] ?? frames[0] ?? 0);
    return true;
  }

  private syncWorldModuleIndicators(heading: number) {
    const magnetItem = this.getEquippedItem('magnet');
    const grapItem = this.getEquippedItem('grappin');
    const magnetVisible = Boolean(magnetItem);
    const bigCanonVisible = Boolean(this.getEquippedItem('big_canon'));
    const grapVisible = Boolean(grapItem);
    const frontCanonItem = this.getEquippedItem('front_canon');
    const frontCanonVisible = Boolean(frontCanonItem);

    const bigCanonRuntime = this.getModuleRuntime('big_canon');
    const bigCanonCooldownDuration = this.getModuleCooldownDuration('big_canon');
    const bigCanonReady = !bigCanonRuntime || bigCanonCooldownDuration <= 0 || bigCanonRuntime.cooldownRemaining <= 0;
    const grapReady = grapVisible && this.isGrappleAvailable();

    this.magnetRangeIndicator.material.color.set(this.getRarityColor(magnetItem?.rarity ?? 'common'));
    this.syncRangeIndicator(
      this.magnetRangeIndicator,
      magnetVisible,
      this.getCoinMagnetRadius(),
      magnetVisible ? 0.1 : 0,
      0.34
    );
    const bigCanonColor = this.getRarityColor(this.getEquippedItem('big_canon')?.rarity ?? 'common');
    this.bigCanonRangeIndicator.material.color.set(bigCanonColor);
    this.syncRangeIndicator(
      this.bigCanonRangeIndicator,
      bigCanonVisible && bigCanonReady,
      this.getBigCanonEffectiveRange(),
      bigCanonVisible && bigCanonReady ? 0.024 : 0,
      0
    );
    this.bigCanonRadarSweep.visible = bigCanonVisible && bigCanonReady;
    this.bigCanonRadarSweep.material.color.set(bigCanonColor);
    this.bigCanonRadarSweep.material.opacity = bigCanonVisible && bigCanonReady ? 0.11 : 0;
    if (this.bigCanonRadarSweep.visible) {
      const bigCanonRadius = this.getBigCanonEffectiveRange();
      this.bigCanonRadarSweep.position.set(this.playerPosition.x, this.playerPosition.y, this.playerPosition.z + 0.03);
      this.bigCanonRadarSweep.rotation.z = this.currentTime * 1.92;
      this.bigCanonRadarSweep.scale.set(bigCanonRadius * 2, 0.12 + bigCanonRadius * 0.02, 1);
    }
    this.grapRangeIndicator.material.color.set(this.getRarityColor(grapItem?.rarity ?? 'common'));
    const grapHeading = this.getMovementHeadingVector(this.scratchVector2);
    const grappleOrigin = this.getGrappleOrigin(grapHeading);
    this.syncConeRangeIndicatorGeometry(this.grapRangeIndicator, this.getGrappleConeHalfAngle());
    this.syncRangeIndicator(
      this.grapRangeIndicator,
      grapReady,
      this.getGrappleEffectiveRange(grappleOrigin.x),
      grapReady ? 0.11 : 0,
      2.48
    );
    if (grapReady) {
      this.grapRangeIndicator.position.set(
        grappleOrigin.x,
        grappleOrigin.y,
        grappleOrigin.z
      );
      this.grapRangeIndicator.rotation.z = heading;
    }

    this.frontCanonLaser.visible = frontCanonVisible;
    if (frontCanonVisible) {
      const frontRuntime = this.getModuleRuntime('front_canon');
      const frontCooldownDuration = this.getModuleCooldownDuration('front_canon');
      const frontReady = !frontRuntime || frontCooldownDuration <= 0 || frontRuntime.cooldownRemaining <= 0 ? 1 : 0;
      const range = this.getFrontCanonEffectiveRange();
      const spreadWidth = this.getFrontCanonSpreadWidth();
      const forwardX = Math.cos(heading);
      const forwardY = Math.sin(heading);
      const startOffset = this.getFrontCanonOriginOffset();
      const laserLength = Math.max(range, startOffset + 0.28);
      const centerOffset = startOffset + laserLength * 0.5;
      this.frontCanonLaser.material.color.set(this.getRarityColor(frontCanonItem?.rarity ?? 'common'));
      this.frontCanonLaser.position.set(
        this.playerPosition.x + forwardX * centerOffset,
        this.playerPosition.y + forwardY * centerOffset,
        this.playerPosition.z + 0.01
      );
      this.frontCanonLaser.rotation.z = heading;
      this.frontCanonLaser.scale.set(laserLength, spreadWidth, 1);
      this.frontCanonLaser.material.opacity = (0.16 + this.momentum.gauge * 0.08) * frontReady;
      this.frontCanonLaser.visible = frontReady > 0.04;
    }

    this.syncProjectilePlane(this.frontCanonProjectile, this.frontCanonShot, heading);
    this.syncProjectilePlane(this.bigCanonProjectile, this.bigCanonShot, heading);

    const grapAmbientEnemy = this.getAmbientEnemyById(this.grapAmbientEnemyId);
    const grapHasTarget = (this.grapTargetIndex !== null || grapAmbientEnemy !== null) && this.grapState !== 'idle';
    this.grapRope.visible = grapHasTarget;
    if (grapHasTarget) {
      const ropeOrigin = this.getGrappleOrigin(grapHeading);
      this.grapRope.material.opacity =
        this.grapState === 'launch'
          ? 0.58
          : this.grapState === 'sprint_fish'
            ? 1
            : this.grapState === 'hooked'
              ? 0.92
            : 0.78;
      if (grapAmbientEnemy) {
        this.grapTargetPosition.copy(grapAmbientEnemy.position);
      } else {
        const targetNode = this.getResolvedNode(this.grapTargetIndex!);
        if (this.grapTargetAngle !== null) {
          this.getSurfaceContactWorldPosition(targetNode, this.grapTargetAngle, this.grapTargetPosition);
        } else {
          this.grapTargetPosition.set(targetNode.resolvedX, targetNode.resolvedY, targetNode.resolvedZ);
        }
      }
      const ropeVector = this.scratchVector.copy(this.grapTargetPosition).sub(ropeOrigin);
      const distance = Math.max(0.2, ropeVector.length());
      this.grapRope.position.copy(ropeOrigin).addScaledVector(ropeVector, 0.5);
      this.grapRope.position.z = ropeOrigin.z + 0.02;
      this.grapRope.rotation.z = Math.atan2(ropeVector.y, ropeVector.x) - Math.PI * 0.5;
      this.grapRope.scale.set(this.grapState === 'sprint_fish' ? 1.42 : this.grapState === 'hooked' ? 1.12 : 1, distance, 1);
    } else {
      this.grapRope.material.opacity = 0.85;
    }
    this.syncSprintFishSpeedVisual(heading, grapAmbientEnemy);
  }

  private syncSprintFishSpeedVisual(heading: number, sprintEnemy: AmbientEnemyRuntime | null) {
    const active = this.grapState === 'sprint_fish' && sprintEnemy?.state === 'sprint_fish';
    if (!active || !sprintEnemy) {
      this.sprintFishSpeedStreaks.forEach((streak) => {
        streak.visible = false;
        streak.material.opacity = 0;
      });
      return;
    }

    const forwardX = Math.cos(heading);
    const forwardY = Math.sin(heading);
    const sideX = -forwardY;
    const sideY = forwardX;
    const referenceSpeed = Math.max(sprintEnemy.sprintTowSpeed, this.playerVelocity.length());
    const intensity = clamp(
      (referenceSpeed - SPRINT_FISH_TOW_SPEED_MIN) / Math.max(0.001, SPRINT_FISH_TOW_SPEED_MAX - SPRINT_FISH_TOW_SPEED_MIN),
      0,
      1
    );

    this.sprintFishSpeedStreaks.forEach((streak, index) => {
      const laneOffset = index - (this.sprintFishSpeedStreaks.length - 1) * 0.5;
      const shimmer = 0.88 + Math.sin(this.currentTime * (8.4 + index * 1.4) + index * 1.1) * 0.12;
      const length = THREE.MathUtils.lerp(6.8, 12.6, intensity) * (1 - index * 0.08);
      const width = THREE.MathUtils.lerp(0.16, 0.42, intensity) * (1 - index * 0.06);
      const rearOffset = 1.4 + index * 1.55 + length * 0.42;
      const lateralOffset = laneOffset * (0.88 + intensity * 1.05);
      streak.position.set(
        this.playerPosition.x - forwardX * rearOffset + sideX * lateralOffset,
        this.playerPosition.y - forwardY * rearOffset + sideY * lateralOffset,
        this.playerPosition.z - 0.03 - index * 0.002
      );
      streak.rotation.z = heading;
      streak.scale.set(length, width, 1);
      streak.material.opacity = (0.16 + intensity * 0.26) * shimmer;
      streak.visible = streak.material.opacity > 0.02;
    });
  }

  private syncWorldRewardBranchHud(currentNode: ResolvedGamePathNode) {
    const visible = this.choiceMode === 'reward_branch' && this.state === 'upgrade_branching' && this.activeChoices.length > 0;
    this.rewardHeaderBillboard.sprite.visible = visible;
    this.rewardCardBillboards.forEach((billboard) => {
      billboard.sprite.visible = visible;
    });
    if (!visible) {
      return;
    }

    const signature = `${this.theme}|${this.locale}|${this.activeChoices.map((choice) => choice.offer.item.id).join('|')}`;
    if (signature !== this.rewardBillboardSignature) {
      this.rewardBillboardSignature = signature;
      this.drawRewardHeaderBillboard();
      this.activeChoices.slice(0, 3).forEach((choice, index) => {
        const billboard = this.rewardCardBillboards[index];
        if (!billboard) {
          return;
        }
        this.drawRewardCardBillboard(billboard, choice.offer, index as 0 | 1 | 2);
      });
    }

    const mobileLike = isMobileRuntime();
    const headerScale = mobileLike ? 1.08 : 1;
    this.rewardHeaderBillboard.sprite.scale.set(14.2 * headerScale, 3.2 * headerScale, 1);
    this.rewardHeaderBillboard.sprite.position.set(currentNode.resolvedX, currentNode.resolvedY + 11.2, currentNode.resolvedZ + 0.06);
    this.activeChoices.slice(0, 3).forEach((choice, index) => {
      const billboard = this.rewardCardBillboards[index];
      const preview = this.resolveChoiceNode(choice.previewNodes[0] ?? choice.entry);
      const cardScale = mobileLike ? 1.28 : 1.16;
      const slotOffsetY = index === 0 ? 0.28 : index === 2 ? -0.28 : 0;
      billboard.sprite.scale.set(16.8 * cardScale, 7.8 * cardScale, 1);
      billboard.sprite.position.set(
        preview.resolvedX + 12.7 * this.getProgressionDirectionSign(),
        preview.resolvedY + slotOffsetY,
        preview.resolvedZ + 0.06
      );
    });
  }

  private hideWorldRewardBranchHud() {
    this.rewardHeaderBillboard.sprite.visible = false;
    this.rewardCardBillboards.forEach((billboard) => {
      billboard.sprite.visible = false;
    });
  }

  private drawRewardHeaderBillboard() {
    const { canvas, texture } = this.rewardHeaderBillboard;
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.fillRoundedRect(context, 0, 0, canvas.width, canvas.height, 42, this.getThemeContrastColor(), 0.94);
    this.strokeRoundedRect(context, 0, 0, canvas.width, canvas.height, 42, this.getThemeShardColor(), 0.14, 12);
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = this.getThemeShardColor();
    context.font = "600 132px 'Tribal Garamond', 'Text Me One', sans-serif";
    context.fillText(this.locale === 'fr' ? 'Choisissez une amélioration' : 'Choose an upgrade', canvas.width * 0.5, 124);
    context.fillStyle = this.getThemeShardColor();
    context.globalAlpha = 0.76;
    context.font = "400 58px 'Tribal Garamond', 'Text Me One', sans-serif";
    context.fillText(
      this.locale === 'fr'
        ? 'Sautez vers une branche. 1, 2, 3 restent disponibles.'
        : 'Jump to a branch. 1, 2, 3 remain available.',
      canvas.width * 0.5,
      238
    );
    context.globalAlpha = 1;
    texture.needsUpdate = true;
  }

  private drawRewardCardBillboard(billboard: WorldHudBillboard, offer: RogueliteItemOffer, slot: 0 | 1 | 2) {
    const { canvas, texture } = billboard;
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }
    const bg = this.getThemeShardColor();
    const fg = this.getThemeContrastColor();
    const rarityColor = this.getRarityColor(offer.item.rarity);
    const hudImage = this.getHudBillboardImage(offer.item.hudIconSrc);
    const rarityImage = offer.item.kind === 'module' ? this.getHudBillboardImage(offer.item.rarityIconSrc) : null;
    const pathLabel =
      slot === 0
        ? this.locale === 'fr'
          ? 'Voie haute'
          : 'Upper path'
        : slot === 1
          ? this.locale === 'fr'
            ? 'Voie frontale'
            : 'Forward path'
          : this.locale === 'fr'
            ? 'Voie basse'
            : 'Lower path';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.textAlign = 'left';
    context.textBaseline = 'alphabetic';
    this.fillRoundedRect(context, 0, 0, canvas.width, canvas.height, 54, fg, 0.96);
    this.strokeRoundedRect(context, 0, 0, canvas.width, canvas.height, 54, rarityColor, 0.96, 18);
    this.fillRoundedRect(context, 46, 44, 332, canvas.height - 88, 34, rarityColor, 0.12);
    this.fillRoundedRect(context, 70, 72, 16, canvas.height - 144, 10, rarityColor, 0.94);
    const drewHudIcon = drawImageIfReady(context, hudImage, 118, 82, 252, 252);
    if (!drewHudIcon) {
      this.drawRewardCardBillboardIconFallback(context, 118, 82, 252, 252, rarityColor, bg);
    }
    if (rarityImage) {
      drawImageIfReady(context, rarityImage, 286, 270, 120, 120);
    }
    context.fillStyle = bg;
    context.globalAlpha = 0.72;
    context.font = "400 88px 'Tribal Garamond', 'Text Me One', sans-serif";
    context.fillText(pathLabel, 460, 128);
    context.globalAlpha = 1;
    if (offer.item.kind === 'module') {
      context.globalAlpha = 0.72;
      context.font = "400 76px 'Tribal Garamond', 'Text Me One', sans-serif";
      context.fillText(this.locale === 'fr' ? this.getRarityLabelFr(offer.item.rarity) : this.getRarityLabelEn(offer.item.rarity), 460, 228);
      context.globalAlpha = 1;
    }
    context.font = "600 136px 'Tribal Garamond', 'Text Me One', sans-serif";
    this.drawWrappedText(context, offer.item.name[this.locale], 460, 366, canvas.width - 554, 130, 2, bg);
    context.globalAlpha = 0.78;
    context.font = "400 82px 'Tribal Garamond', 'Text Me One', sans-serif";
    this.drawWrappedText(context, offer.item.description[this.locale], 460, 536, canvas.width - 554, 90, 3, bg);
    context.globalAlpha = 1;
    texture.needsUpdate = true;
  }

  private drawRewardCardBillboardIconFallback(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    accentColor: string,
    textColor: string
  ) {
    this.fillRoundedRect(context, x, y, width, height, 38, accentColor, 0.08);
    this.strokeRoundedRect(context, x, y, width, height, 38, accentColor, 0.3, 8);
    context.save();
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.globalAlpha = 0.5;
    context.fillStyle = textColor;
    context.font = "600 132px 'Tribal Garamond', 'Text Me One', sans-serif";
    context.fillText('?', x + width * 0.5, y + height * 0.56);
    context.restore();
  }

  private fillRoundedRect(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    color: string,
    alpha: number
  ) {
    context.save();
    context.globalAlpha = alpha;
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.fill();
    context.restore();
  }

  private strokeRoundedRect(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    color: string,
    alpha: number,
    lineWidth: number
  ) {
    context.save();
    context.globalAlpha = alpha;
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.stroke();
    context.restore();
  }

  private drawWrappedText(
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    maxLines: number,
    color: string
  ) {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let currentLine = '';
    words.forEach((word) => {
      const nextLine = currentLine ? `${currentLine} ${word}` : word;
      if (context.measureText(nextLine).width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = nextLine;
      }
    });
    if (currentLine) {
      lines.push(currentLine);
    }
    context.fillStyle = color;
    lines.slice(0, maxLines).forEach((line, index) => {
      let output = line;
      if (index === maxLines - 1 && lines.length > maxLines) {
        while (output.length > 0 && context.measureText(`${output}…`).width > maxWidth) {
          output = output.slice(0, -1);
        }
        output = `${output}…`;
      }
      context.fillText(output, x, y + index * lineHeight);
    });
  }

  private syncRangeIndicator(
    indicator: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>,
    visible: boolean,
    radius: number,
    targetOpacity: number,
    rotationSpeed = 0
  ) {
    indicator.material.opacity = visible ? targetOpacity : 0;
    indicator.visible = visible;
    if (!indicator.visible) return;
    indicator.position.set(this.playerPosition.x, this.playerPosition.y, this.playerPosition.z + 0.01);
    const diameter = radius * 2 * (1 + Math.sin(this.currentTime * 2.2) * 0.015);
    indicator.scale.set(diameter, diameter, 1);
    indicator.rotation.z = rotationSpeed === 0 ? 0 : this.currentTime * rotationSpeed;
  }

  private syncProjectilePlane(
    mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>,
    shot: PendingEnemyShot,
    fallbackHeading: number
  ) {
    mesh.visible = shot.active;
    if (!shot.active) {
      return;
    }
    const duration = Math.max(0.001, shot.impactAt - shot.startedAt);
    const progress = clamp((this.currentTime - shot.startedAt) / duration, 0, 1);
    const target = this.resolvePendingShotTarget(shot) ?? shot.target;
    shot.target.copy(target);
    const position = this.scratchVector.copy(shot.start).lerp(target, progress);
    mesh.position.copy(position);
    mesh.position.z = this.playerPosition.z + 0.02;
    const delta = this.scratchVectorB.copy(target).sub(shot.start);
    mesh.rotation.z = delta.lengthSq() > 0.0001 ? Math.atan2(delta.y, delta.x) : fallbackHeading;
    const travelPulse = 1 + Math.sin(progress * Math.PI) * 0.08;
    mesh.scale.set(travelPulse, travelPulse, 1);
  }

  private resolvePendingShotTarget(shot: PendingEnemyShot) {
    if (shot.targetIndex === null || shot.targetPole === null) {
      return null;
    }
    const node = this.getResolvedNode(shot.targetIndex);
    const enemy = node.enemySlot;
    if (!enemy || !enemy.alive || enemy.pole !== shot.targetPole) {
      return null;
    }
    return this.getEnemyWorldPosition(node, enemy.pole);
  }

  private syncShardHud(currentNode: ResolvedGamePathNode) {
    if (this.playerState === 'airborne' || this.playerState === 'dead' || this.state === 'game_over') {
      this.shardHudSprite.visible = false;
      return;
    }

    const ctx = this.shardHudCanvas.getContext('2d');
    if (!ctx) {
      this.shardHudSprite.visible = false;
      return;
    }

    const chargeProgress = clamp(this.chargeMeter, 0, 1);
    const orbitProgress = this.orbitGraceActive ? clamp(this.orbitGraceProgress, 0, 1) : 1;
    const radius = this.getPhysicalRadius(currentNode);
    const boostImage = this.getShardHudImage('boost');
    const anchorLoadImage = this.getShardHudImage('anchorLoad');
    const anchorFullImage = this.getShardHudImage('anchorFull');
    const hudScale =
      currentNode.shapeKind === 'round'
        ? 1
        : currentNode.shapeKind === 'oval'
          ? 0.84
          : 0.78;
    const boostSize = Math.round(226 * hudScale);
    const anchorSize = Math.round(128 * hudScale);

    ctx.clearRect(0, 0, 256, 256);
    this.drawShardHudImage(ctx, boostImage, 128, 128, boostSize, 0.18);
    this.drawShardHudRadialFill(ctx, boostImage, 128, 128, boostSize, chargeProgress, 1);

    if (this.orbitGraceActive) {
      this.drawShardHudImage(ctx, anchorLoadImage, 128, 128, anchorSize, 0.24);
      this.drawShardHudRadialFill(ctx, anchorLoadImage, 128, 128, anchorSize, orbitProgress, 1);
    } else {
      this.drawShardHudImage(ctx, anchorFullImage, 128, 128, anchorSize, 1);
    }

    this.shardHudTexture.needsUpdate = true;
    this.shardHudSprite.visible = true;
    this.shardHudSprite.position.set(currentNode.resolvedX, currentNode.resolvedY, currentNode.resolvedZ + 0.04);
    const spriteScale =
      currentNode.shapeKind === 'round'
        ? 1.56
        : currentNode.shapeKind === 'oval'
          ? 1.3
          : 1.2;
    this.shardHudSprite.scale.setScalar(Math.max(2.2, radius * spriteScale));
  }

  private getShardHudImage(key: ShardHudImageKey) {
    return this.shardHudImages[key][this.theme];
  }

  private drawShardHudImage(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    centerX: number,
    centerY: number,
    size: number,
    opacity: number
  ) {
    if (opacity <= 0) {
      return;
    }
    ctx.save();
    ctx.globalAlpha = opacity;
    drawImageIfReady(ctx, image, centerX - size * 0.5, centerY - size * 0.5, size, size);
    ctx.restore();
  }

  private drawShardHudRadialFill(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    centerX: number,
    centerY: number,
    size: number,
    progress: number,
    opacity: number
  ) {
    if (opacity <= 0) {
      return;
    }
    const clamped = clamp(progress, 0, 1);
    if (clamped <= 0) {
      return;
    }
    if (clamped >= 0.999) {
      this.drawShardHudImage(ctx, image, centerX, centerY, size, opacity);
      return;
    }
    const radius = size * 0.54;
    const startAngle = -Math.PI * 0.5;
    const endAngle = startAngle + Math.PI * 2 * clamped;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
    ctx.closePath();
    ctx.clip();
    ctx.globalAlpha = opacity;
    drawImageIfReady(ctx, image, centerX - size * 0.5, centerY - size * 0.5, size, size);
    ctx.restore();
  }

  private resolvePlayerVisualState(): PlayerVisualState {
    if (this.playerState === 'dead' || this.state === 'game_over') {
      return 'death';
    }
    if (this.currentTime < this.jumpVisualUntil) {
      return 'jump_start';
    }
    if (this.currentTime < this.landingVisualUntil) {
      return 'landing';
    }
    if (this.playerState === 'airborne') {
      return 'airborne';
    }
    return this.playerVelocity.length() > 6.6 || this.angularSpeed > 2.9 ? 'attached_fast_orbit' : 'attached_idle_orbit';
  }

  private syncMarkers(elapsedTime: number) {
    const visibleNodes = this.getDisplayNodes(Math.min(28, this.getRecommendedVisibleCount()));
    const coinMarkers: CoinMarker[] = [];
    const enemyMarkersById = new Map<string, EnemyMarker>();
    const mirrored = this.isMirrorModeActive();

    visibleNodes.forEach((node) => {
      node.coinSlots.forEach((slot) => {
        if (slot.collected) return;
        const pendingKey = this.getCoinSlotKey(node.index, slot);
        const pending = this.pendingMagnetCoins.get(pendingKey);
        if (pending) {
          const progress = clamp((elapsedTime - pending.collectedAt) / Math.max(0.001, pending.duration), 0, 1);
          const currentPosition = this.scratchVector.copy(pending.start).lerp(this.playerPosition, progress * progress);
          coinMarkers.push({
            id: pending.key,
            position: currentPosition.clone(),
            scale: 0.74 + slot.value * 0.08,
            visible: true
          });
          return;
        }
        const position = this.getCoinSlotWorldPosition(node, slot);
        const magnetRadius = this.getCoinMagnetRadius();
        const distanceToPlayer = position.distanceTo(this.playerPosition);
        const attraction = magnetRadius > 0 ? clamp(1 - distanceToPlayer / magnetRadius, 0, 1) : 0;
        coinMarkers.push({
          id: this.getCoinSlotKey(node.index, slot),
          position,
          scale: 0.74 + slot.value * 0.08,
          visible: true,
          attraction,
          targetPosition: attraction > 0 ? this.playerPosition.clone() : null
        });
      });
      if (node.enemySlot?.alive) {
        const id = `${node.index}:${node.enemySlot.pole}`;
        enemyMarkersById.set(id, {
          id,
          position: this.getEnemyWorldPosition(node, node.enemySlot.pole),
          visible: true,
          tier: node.enemySlot.tier,
          pole: node.enemySlot.pole,
          mirrored
        });
      }
    });

    for (let index = Math.max(0, this.attachedIndex - 2); index <= this.attachedIndex + 18; index += 1) {
      const node = this.getResolvedNode(index);
      if (!node.enemySlot?.alive) continue;
      const id = `${node.index}:${node.enemySlot.pole}`;
      enemyMarkersById.set(id, {
        id,
        position: this.getEnemyWorldPosition(node, node.enemySlot.pole),
        visible: true,
        tier: node.enemySlot.tier,
        pole: node.enemySlot.pole,
        mirrored
      });
    }

    this.ambientEnemies.forEach((ambientEnemy) => {
      if (!this.isAmbientEnemyMarkerVisible(ambientEnemy)) {
        return;
      }
      enemyMarkersById.set(ambientEnemy.id, {
        id: ambientEnemy.id,
        position: ambientEnemy.position.clone(),
        visible: true,
        tier: 'light',
        pole: 'north',
        mirrored: ambientEnemy.mirrored,
        kind: ambientEnemy.kind,
        animation:
          ambientEnemy.state === 'dying'
            ? 'death'
            : ambientEnemy.state === 'sprint_fish'
              ? 'sprint'
              : 'alive',
        animationStartedAt: ambientEnemy.stateStartedAt,
        animationDuration: ambientEnemy.deathDuration,
        scale: ambientEnemy.scale,
        zOffset: ambientEnemy.zOffset,
        bodyOffsetY: 0,
        showBackArrow: false,
        tint: null
      });
    });

    this.coins.setVisible(this.state !== 'idle' && this.state !== 'transition_out');
    this.enemies.setVisible(this.state !== 'idle' && this.state !== 'transition_out');
    this.coins.update(coinMarkers, elapsedTime);
    this.enemies.update(Array.from(enemyMarkersById.values()), elapsedTime);
  }

  private fillMomentumBurst(amount: number) {
    this.applyMomentumDelta(amount);
  }

  private applyMomentumDelta(amount: number) {
    const momentumCap = Math.max(1, this.runUpgrades.modifiers.momentumCap);
    const previousGauge = this.momentum.gauge;
    const modifierScale = 1 + this.runUpgrades.modifiers.momentumGain;
    let effectiveAmount = amount * modifierScale;

    if (effectiveAmount > 0) {
      const normalizedGauge = this.getNormalizedMomentumGauge();
      const gainFalloff = THREE.MathUtils.lerp(1, 0.42, THREE.MathUtils.smoothstep(normalizedGauge, 0.28, 0.92));
      effectiveAmount *= gainFalloff;
    }

    const nextGauge = clamp(previousGauge + effectiveAmount, 0, momentumCap);
    this.momentum.gauge = nextGauge;
    this.momentum.fillRate = Math.max(this.momentum.fillRate, Math.max(0, nextGauge - previousGauge));
  }

  private collectCoinsOnCurrentNode(node: ResolvedGamePathNode) {
    const pickupRadiusSq = this.getCoinPickupRadius() * this.getCoinPickupRadius();
    let collectedAny = false;
    node.coinSlots.forEach((slot) => {
      if (slot.collected) return;
      if (this.pendingMagnetCoins.has(this.getCoinSlotKey(node.index, slot))) return;
      const position = this.getCoinSlotWorldPosition(node, slot);
      if (position.distanceToSquared(this.playerPosition) <= pickupRadiusSq) {
        slot.collected = true;
        this.awardCoins(this.applyCoinBonus(slot.value));
        this.emitScore();
        collectedAny = true;
      }
    });
    if (collectedAny) {
      this.emitAudioEvent({ type: 'coin', magnet: false });
    }
  }

  private collectCoinsNearPlayer() {
    const magnetRadius = this.getCoinMagnetRadius();
    const pickupRadius = this.getCoinPickupRadius();
    const searchRadius = Math.max(magnetRadius, pickupRadius);
    if (searchRadius <= 0) {
      return;
    }
    this.resolvePendingMagnetCoins();
    const searchRadiusSq = searchRadius * searchRadius;
    const pickupRadiusSq = pickupRadius * pickupRadius;
    const magnetRadiusSq = magnetRadius * magnetRadius;
    let collectedAny = false;
    const visibleNodes = this.getDisplayNodes(Math.min(28, this.getRecommendedVisibleCount()));
    visibleNodes.forEach((node) => {
      node.coinSlots.forEach((slot) => {
        if (slot.collected) return;
        const key = this.getCoinSlotKey(node.index, slot);
        if (this.pendingMagnetCoins.has(key)) {
          return;
        }
        const position = this.getCoinSlotWorldPosition(node, slot);
        const distanceSq = position.distanceToSquared(this.playerPosition);
        if (distanceSq > searchRadiusSq) {
          return;
        }
        if (distanceSq <= pickupRadiusSq) {
          slot.collected = true;
          this.awardCoins(this.applyCoinBonus(slot.value));
          this.emitScore();
          this.pendingMagnetCoins.delete(key);
          collectedAny = true;
          return;
        }
        if (magnetRadius <= 0 || distanceSq > magnetRadiusSq) {
          return;
        }
        const distance = position.distanceTo(this.playerPosition);
        this.pendingMagnetCoins.set(key, {
          key,
          nodeIndex: node.index,
          angle: slot.angle,
          value: slot.value,
          orbitScale: slot.orbitScale,
          forwardOffset: slot.forwardOffset ?? 0,
          verticalOffset: slot.verticalOffset ?? 0,
          start: position.clone(),
          collectedAt: this.currentTime,
          duration: THREE.MathUtils.clamp(0.1 + distance * 0.07, 0.1, 0.28)
        });
      });
    });
    if (collectedAny) {
      this.emitAudioEvent({ type: 'coin', magnet: false });
    }
  }

  private getCoinMagnetRadius() {
    if (!this.getEquippedItem('magnet')) {
      return 0;
    }
    return Math.max(1.8, 2.1 + this.runUpgrades.modifiers.coinMagnet * 6.1);
  }

  private getCoinPickupRadius() {
    return BASE_COIN_PICKUP_RADIUS + this.runUpgrades.modifiers.coinMagnet * 0.08;
  }

  private applyGravityBeltInfluence(deltaTime: number) {
    if (this.playerState !== 'airborne') {
      return;
    }
    const visibleNodes = this.getDisplayNodes(Math.min(22, this.getRecommendedVisibleCount()));
    let bestNode: ResolvedGamePathNode | null = null;
    let bestContact: SurfaceContactSample | null = null;
    let bestSurfaceClearance = Number.POSITIVE_INFINITY;
    for (const node of visibleNodes) {
      const nodeRadius = this.getPhysicalRadius(node);
      const auraThickness = clamp(0.38 + node.visualScale * 0.08 + this.runUpgrades.modifiers.gravityCentering * 0.18, 0.42, node.isGigantic ? 2.1 : 1.32);
      const approxDistanceToCenter = this.scratchVector.set(node.resolvedX, node.resolvedY, node.resolvedZ).distanceTo(this.playerPosition);
      if (approxDistanceToCenter > nodeRadius + auraThickness + 1.1) {
        continue;
      }
      const contact = this.findBestSurfaceContact(node, this.playerPosition, 72, 5);
      const surfaceClearance = Math.sqrt(contact.distanceSq);
      if (surfaceClearance > auraThickness || surfaceClearance >= bestSurfaceClearance) {
        continue;
      }
      bestNode = node;
      bestContact = contact;
      bestSurfaceClearance = surfaceClearance;
    }
    if (!bestNode || !bestContact) {
      return;
    }
    const auraThickness = clamp(0.38 + bestNode.visualScale * 0.08 + this.runUpgrades.modifiers.gravityCentering * 0.18, 0.42, bestNode.isGigantic ? 2.1 : 1.32);
    const toSurface = this.scratchVector.copy(bestContact.surfaceWorldPosition).sub(this.playerPosition);
    const speed = this.playerVelocity.length();
    const landingPriorityGap = Math.max(0.06, auraThickness * 0.28);
    if (speed <= 0.08 || bestSurfaceClearance <= landingPriorityGap) {
      return;
    }
    toSurface.normalize();
    const auraProgress = clamp(
      1 - (bestSurfaceClearance - landingPriorityGap) / Math.max(0.0001, auraThickness - landingPriorityGap),
      0,
      1
    );
    const lowSpeedBias = clamp(1.18 - speed / 13.2, 0.14, 0.84);
    const steerStrength =
      (0.052 + this.runUpgrades.modifiers.gravityCentering * 0.042) *
      auraProgress *
      auraProgress *
      lowSpeedBias *
      deltaTime;
    if (steerStrength <= 0.0001) {
      return;
    }
    const heading2D = this.getMovementHeadingVector(this.scratchVector2);
    const currentDirection = this.scratchVectorB.set(heading2D.x, heading2D.y, 0).normalize();
    const steeredDirection = this.scratchVectorB
      .copy(currentDirection)
      .multiplyScalar(1 - steerStrength)
      .addScaledVector(toSurface, steerStrength)
      .normalize();
    if (steeredDirection.lengthSq() <= 0.0001) {
      return;
    }
    this.playerVelocity.copy(steeredDirection.multiplyScalar(speed));
    if (speed < 5.2) {
      this.playerVelocity.addScaledVector(toSurface, (0.18 + this.runUpgrades.modifiers.gravityCentering * 0.08) * auraProgress * lowSpeedBias * deltaTime);
    }
  }

  private getCoinSlotKey(
    nodeIndex: number,
    slot: {
      angle: number;
      value: number;
      forwardOffset?: number;
      verticalOffset?: number;
    }
  ) {
    return `${nodeIndex}:${Math.round(slot.angle * 1000)}:${slot.value}:${Math.round((slot.forwardOffset ?? 0) * 100)}:${Math.round((slot.verticalOffset ?? 0) * 100)}`;
  }

  private resolvePendingMagnetCoins() {
    if (this.pendingMagnetCoins.size === 0) {
      return;
    }
    let collectedAny = false;
    for (const pending of this.pendingMagnetCoins.values()) {
      if (this.currentTime - pending.collectedAt < pending.duration) {
        continue;
      }
      const node = this.getResolvedNode(pending.nodeIndex);
      const slot = node.coinSlots.find(
        (candidate) =>
          !candidate.collected &&
          candidate.value === pending.value &&
          Math.abs(candidate.angle - pending.angle) < 0.0001 &&
          Math.abs((candidate.forwardOffset ?? 0) - pending.forwardOffset) < 0.001 &&
          Math.abs((candidate.verticalOffset ?? 0) - pending.verticalOffset) < 0.001
      );
      if (!slot) {
        this.pendingMagnetCoins.delete(pending.key);
        continue;
      }
      slot.collected = true;
      this.awardCoins(this.applyCoinBonus(slot.value));
      this.emitScore();
      this.pendingMagnetCoins.delete(pending.key);
      collectedAny = true;
    }
    if (collectedAny) {
      this.emitAudioEvent({ type: 'coin', magnet: true });
    }
  }

  private applyGrappleConstraint() {
    if (this.grapTargetIndex === null || this.grapState === 'idle' || this.grapState === 'launch' || this.grapState === 'sprint_fish') {
      return;
    }
    const toPlayer = this.scratchVector.copy(this.playerPosition).sub(this.grapTargetPosition);
    const distance = toPlayer.length();
    if (distance <= this.grapRopeLength || distance < 0.0001) {
      return;
    }
    toPlayer.normalize();
    this.playerPosition.copy(this.grapTargetPosition).addScaledVector(toPlayer, this.grapRopeLength);
    const outwardSpeed = this.playerVelocity.dot(toPlayer);
    if (outwardSpeed > 0) {
      const previousSpeed = this.playerVelocity.length();
      this.playerVelocity.addScaledVector(toPlayer, -outwardSpeed);
      const tangentialSpeed = this.playerVelocity.length();
      if (tangentialSpeed > 0.0001 && previousSpeed > tangentialSpeed) {
        this.playerVelocity.multiplyScalar(THREE.MathUtils.lerp(1, previousSpeed / tangentialSpeed, 0.68));
      }
    }
  }

  private releaseGrapple() {
    if (this.grapTargetIndex === null && this.grapAmbientEnemyId === null && this.grapState === 'idle') {
      return;
    }
    if (this.grapState === 'sprint_fish') {
      return;
    }
    if (this.grapTargetIndex !== null && this.grapState === 'hooked') {
      const targetNode = this.getResolvedNode(this.grapTargetIndex);
      if (this.grapTargetAngle !== null) {
        this.getSurfaceContactWorldPosition(targetNode, this.grapTargetAngle, this.grapTargetPosition);
      } else {
        this.grapTargetPosition.set(targetNode.resolvedX, targetNode.resolvedY, targetNode.resolvedZ);
      }
      const ropeDirection = this.scratchVector.copy(this.playerPosition).sub(this.grapTargetPosition).normalize();
      const tangent = this.scratchVectorB.set(-ropeDirection.y, ropeDirection.x, 0);
      const tangentialSpeed = this.playerVelocity.dot(tangent);
      const tangentSign = tangentialSpeed >= 0 ? 1 : -1;
      const projectionBoost = 0.48 + Math.min(1.7, Math.abs(tangentialSpeed)) * 0.18;
      this.playerVelocity.addScaledVector(tangent, tangentSign * projectionBoost);
    }
    this.beginGrappleLanding();
  }

  private beginGrappleLanding() {
    if (this.grapState !== 'idle' && this.grapState !== 'landing') {
      this.emitAudioEvent({ type: 'grapple_recall' });
    }
    this.grapState = 'landing';
    this.grapStateUntil = this.currentTime + 1;
    this.grapTargetIndex = null;
    this.grapTargetAngle = null;
    this.grapAmbientEnemyId = null;
    this.grapRopeLength = 0;
    this.grapAwaitReleaseBeforePull = false;
    this.grapReleasePending = false;
    this.grapReleasePressedAt = 0;
  }

  private resolveEnemyContact(node: ResolvedGamePathNode, previousPosition: THREE.Vector3) {
    const enemy = node.enemySlot;
    if (!enemy || !enemy.alive) return;
    const enemyPosition = this.getEnemyBodyWorldPosition(node, enemy.pole);
    if (!this.isEnemyWithinContact(node, enemy, enemyPosition, previousPosition, false)) {
      return;
    }
    const resolution = this.resolveEnemyCollisionOutcome(node, enemyPosition, previousPosition, {
      airborne: false,
      allowShieldKill: true
    });
    this.applyEnemyCollisionResolution(enemy, resolution);
  }

  private resolveAirborneEnemyContact(previousPosition: THREE.Vector3, travelSpeed = this.playerVelocity.length()) {
    let bestContact:
      | {
          node: ResolvedGamePathNode;
          enemy: NonNullable<ResolvedGamePathNode['enemySlot']>;
          enemyPosition: THREE.Vector3;
          projection: number;
          distanceSq: number;
        }
      | null = null;
    for (const node of this.getInteractableVisibleNodes()) {
      const enemy = node.enemySlot;
      if (!enemy || !enemy.alive) continue;
      const enemyPosition = this.getEnemyBodyWorldPosition(node, enemy.pole);
      if (!this.isEnemyWithinContact(node, enemy, enemyPosition, previousPosition, true)) continue;
      const projection = this.getTravelProjectionRatio(previousPosition, enemyPosition);
      const distanceSq = previousPosition.distanceToSquared(enemyPosition);
      if (
        !bestContact ||
        projection < bestContact.projection - 0.001 ||
        (Math.abs(projection - bestContact.projection) <= 0.001 && distanceSq < bestContact.distanceSq)
      ) {
        bestContact = { node, enemy, enemyPosition, projection, distanceSq };
      }
    }
    if (!bestContact) {
      return;
    }
    const { node, enemy, enemyPosition } = bestContact;
    const resolution = this.resolveEnemyCollisionOutcome(node, enemyPosition, previousPosition, {
      airborne: true,
      allowShieldKill: true,
      travelSpeed
    });
    this.applyEnemyCollisionResolution(enemy, resolution);
  }

  private resolveAmbientEnemyContact(previousPosition: THREE.Vector3, airborne: boolean) {
    let bestEnemy: AmbientEnemyRuntime | null = null;
    let bestProjection = Number.POSITIVE_INFINITY;
    let bestDistanceSq = Number.POSITIVE_INFINITY;

    for (const enemy of this.ambientEnemies) {
      if (enemy.state !== 'alive' || this.currentTime < enemy.bounceCooldownUntil) {
        continue;
      }
      if (enemy.kind === 'enemyBot' && !this.isAmbientEnemyBotVisible(enemy)) {
        continue;
      }
      if (!this.isAmbientEnemyWithinContact(enemy, previousPosition, airborne)) {
        continue;
      }
      const projection = this.getTravelProjectionRatio(previousPosition, enemy.position);
      const distanceSq = previousPosition.distanceToSquared(enemy.position);
      if (
        !bestEnemy ||
        projection < bestProjection - 0.001 ||
        (Math.abs(projection - bestProjection) <= 0.001 && distanceSq < bestDistanceSq)
      ) {
        bestEnemy = enemy;
        bestProjection = projection;
        bestDistanceSq = distanceSq;
      }
    }

    if (!bestEnemy) {
      return;
    }

    if (bestEnemy.kind === 'enemyTop') {
      this.applyAmbientEnemyBounce(bestEnemy, previousPosition, airborne ? 1.08 : 1.14);
      this.startAmbientEnemyDeath(bestEnemy);
      return;
    }

    if (airborne) {
      this.applyAmbientEnemyBounce(bestEnemy, previousPosition, 1.04);
      this.startAmbientEnemyDeath(bestEnemy);
      return;
    }

    this.applyAmbientEnemyBounce(bestEnemy, previousPosition, airborne ? 0.92 : 0.98);
    bestEnemy.bounceCooldownUntil = this.currentTime + 0.24;
  }

  private resolveEnemyCollisionOutcome(
    node: ResolvedGamePathNode,
    enemyPosition: THREE.Vector3,
    previousPosition: THREE.Vector3,
    options: {
      airborne: boolean;
      allowShieldKill: boolean;
      travelSpeed?: number;
    }
  ): EnemyCollisionResolution {
    const impactSide = this.resolveEnemyImpactSide(enemyPosition, previousPosition);
    const hitFromBehind = impactSide === 'back';
    const spikeKill = Boolean(this.runUpgrades.modifiers.spikeOrbit);
    void node;

    const shieldRuntime = this.ensureModuleRuntime('shield');
    const shieldReady = Boolean(options.allowShieldKill && shieldRuntime && shieldRuntime.cooldownRemaining <= 0);

    if (hitFromBehind) {
      return {
        outcome: 'enemy_dies',
        source: 'impact',
        fromBehind: true,
        momentumBurst: options.airborne ? 0.08 : 0.05
      };
    }

    if (shieldReady) {
      return {
        outcome: 'enemy_dies',
        source: 'shield',
        shieldSave: true,
        momentumBurst: 0.04
      };
    }

    if (spikeKill) {
      return {
        outcome: 'enemy_dies',
        source: 'impact',
        fromBehind: hitFromBehind,
        momentumBurst: options.airborne ? 0.08 : 0.05
      };
    }

    if (options.airborne) {
      return {
        outcome: 'enemy_dies',
        source: 'impact',
        fromBehind: hitFromBehind,
        momentumBurst: Math.max(0.08, (options.travelSpeed ?? 0) > 12 ? 0.1 : 0.08)
      };
    }

    if (!options.airborne) {
      return {
        outcome: 'player_dies'
      };
    }

    return {
      outcome: 'enemy_dies',
      source: 'impact',
      fromBehind: hitFromBehind,
      momentumBurst: 0.08
    };
  }

  private resolveEnemyImpactSide(enemyPosition: THREE.Vector3, previousPosition: THREE.Vector3): EnemyImpactSide {
    const currentFacingDot = this.resolveEnemyFacingDot(enemyPosition, previousPosition, this.playerPosition);
    const previousFacingDot = this.resolveEnemyFacingDot(enemyPosition, previousPosition, previousPosition);
    return Math.min(currentFacingDot, previousFacingDot) <= -0.005 ? 'back' : 'front';
  }

  private resolveEnemyFacingDot(
    enemyPosition: THREE.Vector3,
    segmentStart: THREE.Vector3,
    samplePoint: THREE.Vector3
  ) {
    const segmentX = this.playerPosition.x - segmentStart.x;
    const segmentY = this.playerPosition.y - segmentStart.y;
    const segmentZ = this.playerPosition.z - segmentStart.z;
    const segmentLengthSq = segmentX * segmentX + segmentY * segmentY + segmentZ * segmentZ;
    let contactX = samplePoint.x;
    let contactY = samplePoint.y;

    if (segmentLengthSq > 0.0001) {
      const toSampleX = samplePoint.x - segmentStart.x;
      const toSampleY = samplePoint.y - segmentStart.y;
      const toSampleZ = samplePoint.z - segmentStart.z;
      const projection = clamp((toSampleX * segmentX + toSampleY * segmentY + toSampleZ * segmentZ) / segmentLengthSq, 0, 1);
      contactX = segmentStart.x + segmentX * projection;
      contactY = segmentStart.y + segmentY * projection;
    }

    const toPlayerX = contactX - enemyPosition.x;
    const toPlayerY = contactY - enemyPosition.y;
    const toPlayerLength = Math.hypot(toPlayerX, toPlayerY);
    if (toPlayerLength <= 0.0001) {
      return 1;
    }

    const normalizedToPlayerX = toPlayerX / toPlayerLength;
    const normalizedToPlayerY = toPlayerY / toPlayerLength;
    const enemyForwardX = this.isMirrorModeActive() ? 1 : -1;
    return normalizedToPlayerX * enemyForwardX + normalizedToPlayerY * 0;
  }

  private applyEnemyCollisionResolution(
    enemy: NonNullable<ResolvedGamePathNode['enemySlot']>,
    resolution: EnemyCollisionResolution
  ) {
    if (resolution.outcome === 'collision_ignored' || resolution.outcome === 'both_survive') {
      return;
    }

    if (resolution.outcome === 'enemy_dies') {
      if (resolution.source === 'shield') {
        this.consumeProtectionOrFail(enemy, { allowShieldKill: true });
        return;
      }
      enemy.alive = false;
      this.awardCoins(this.applyCoinBonus(enemy.rewardCoins));
      this.recordEnemyKill({
        amount: 1,
        fromBehind: resolution.fromBehind,
        shieldSave: resolution.shieldSave,
        source: resolution.source ?? 'impact'
      });
      this.emitScore();
      if (resolution.momentumBurst) {
        this.fillMomentumBurst(resolution.momentumBurst);
      }
      this.emitAudioEvent({ type: 'enemy_die' });
      return;
    }

    this.consumeProtectionOrFail(enemy, { allowShieldKill: false });
  }

  private consumeProtectionOrFail(
    enemy?: ResolvedGamePathNode['enemySlot'],
    options: {
      allowShieldKill?: boolean;
    } = {}
  ) {
    const shieldRuntime = this.ensureModuleRuntime('shield');
    if (options.allowShieldKill !== false && shieldRuntime && shieldRuntime.cooldownRemaining <= 0) {
      const cooldownBase = 14;
      const cooldown = Math.max(4, cooldownBase * (1 - this.runUpgrades.modifiers.shieldCooldownFactor));
      shieldRuntime.cooldownRemaining = cooldown;
      this.shieldCharges = 0;
      this.shieldHitUntil = this.currentTime + 0.24;
      if (enemy?.alive) {
        enemy.alive = false;
        this.awardCoins(this.applyCoinBonus(enemy.rewardCoins));
        this.recordEnemyKill({ amount: 1, shieldSave: true, source: 'shield' });
        this.emitScore();
      }
      this.fillMomentumBurst(0.04);
      this.emitAudioEvent({ type: 'module_activate', slot: 'shield' });
      return;
    }
    this.emitAudioEvent({ type: 'enemy_hit_player' });
    this.failRun('enemy');
  }

  private updatePendingCanonShots(elapsedTime: number) {
    this.resolvePendingCanonShot(this.bigCanonShot, elapsedTime);
    this.resolvePendingCanonShot(this.frontCanonShot, elapsedTime);
  }

  private resolvePendingCanonShot(shot: PendingEnemyShot, elapsedTime: number) {
    if (!shot.active) {
      return;
    }
    if (elapsedTime < shot.impactAt) {
      return;
    }
    const node = shot.targetIndex !== null ? this.getResolvedNode(shot.targetIndex) : null;
    const enemy = node?.enemySlot;
    if (node && enemy && enemy.alive && enemy.pole === shot.targetPole && enemy.tier !== 'invincible') {
      this.applyEnemyDefeat(node, enemy, shot.slot);
    }
    this.resetPendingEnemyShot(shot);
  }

  private applyEnemyDefeat(
    node: ResolvedGamePathNode,
    enemy: NonNullable<ResolvedGamePathNode['enemySlot']>,
    source: 'impact' | 'front_canon' | 'big_canon' = 'impact'
  ) {
    enemy.alive = false;
    this.awardCoins(this.applyCoinBonus(enemy.rewardCoins));
    this.recordEnemyKill({ amount: 1, source });
    this.emitScore();
    this.emitAudioEvent({ type: 'enemy_die' });
    void node;
  }

  private queueCanonShot(
    shot: PendingEnemyShot,
    slot: 'big_canon' | 'front_canon',
    targetNode: ResolvedGamePathNode,
    targetPole: 'north' | 'south',
    start: THREE.Vector3,
    speed: number,
    impactVisualDuration: number
  ) {
    const target = this.getEnemyWorldPosition(targetNode, targetPole);
    const travelDistance = Math.max(0.001, start.distanceTo(target));
    const travelDuration = Math.max(impactVisualDuration, travelDistance / Math.max(0.001, speed));
    shot.active = true;
    shot.slot = slot;
    shot.targetIndex = targetNode.index;
    shot.targetPole = targetPole;
    shot.startedAt = this.currentTime;
    shot.impactAt = this.currentTime + travelDuration;
    shot.start.copy(start);
    shot.target.copy(target);
    return travelDuration;
  }

  private findBestFrontCanonTarget(forward: THREE.Vector3, originX: number, originY: number, laserLength: number) {
    let bestTarget: { node: ResolvedGamePathNode; along: number; sideDistance: number } | null = null;
    for (const node of this.getInteractableVisibleNodes()) {
      const enemy = node.enemySlot;
      if (!enemy || !enemy.alive || enemy.tier === 'invincible') {
        continue;
      }
      const position = this.getEnemyWorldPosition(node, enemy.pole);
      const toEnemy = this.scratchVectorB.set(position.x - originX, position.y - originY, 0);
      const distance = Math.hypot(toEnemy.x, toEnemy.y);
      const enemyRadius = this.getEnemyScanRadius(enemy);
      if (distance > laserLength + enemyRadius) {
        continue;
      }
      const along = toEnemy.dot(forward);
      if (along < -enemyRadius * 0.1 || along > laserLength + enemyRadius) {
        continue;
      }
      const sideDistance = Math.abs(toEnemy.x * -forward.y + toEnemy.y * forward.x);
      const hitHalfWidth = this.getFrontCanonSpreadWidth() * 0.5 + enemyRadius;
      if (sideDistance > hitHalfWidth) {
        continue;
      }
      if (
        !bestTarget ||
        along < bestTarget.along - 0.02 ||
        (Math.abs(along - bestTarget.along) <= 0.02 && sideDistance < bestTarget.sideDistance)
      ) {
        bestTarget = { node, along, sideDistance };
      }
    }
    return bestTarget;
  }

  private updateAutoFire(elapsedTime: number) {
    const hasBigCanon = Boolean(this.getEquippedItem('big_canon'));
    const hasFrontCanon = Boolean(this.getEquippedItem('front_canon'));
    if (!hasBigCanon && !hasFrontCanon) return;

    if (hasBigCanon) {
      const runtime = this.ensureModuleRuntime('big_canon');
      if (runtime && runtime.cooldownRemaining <= 0 && !this.bigCanonShot.active) {
        const range = this.getBigCanonEffectiveRange();
        let bestTarget: { node: ResolvedGamePathNode; distance: number } | null = null;
        for (const node of this.getInteractableVisibleNodes()) {
          const enemy = node.enemySlot;
          if (!enemy || !enemy.alive || enemy.tier === 'invincible') continue;
          const position = this.getEnemyWorldPosition(node, enemy.pole);
          const distance = position.distanceTo(this.playerPosition);
          if (distance > range) continue;
          if (!bestTarget || distance < bestTarget.distance) {
            bestTarget = { node, distance };
          }
        }
        if (bestTarget?.node.enemySlot) {
          const targetEnemy = bestTarget.node.enemySlot;
          this.queueCanonShot(
            this.bigCanonShot,
            'big_canon',
            bestTarget.node,
            targetEnemy.pole,
            this.scratchVector.set(this.playerPosition.x, this.playerPosition.y + 0.18, this.playerPosition.z + 0.02),
            15.5,
            0.22
          );
          if (targetEnemy.alive) {
            this.applyEnemyDefeat(bestTarget.node, targetEnemy, 'big_canon');
          }
          this.fillMomentumBurst(0.05);
          runtime.cooldownRemaining = Math.max(1.4, this.runUpgrades.modifiers.bigCanonCooldown || 4.5);
          this.bigCanonAnimStartedAt = elapsedTime;
          this.bigCanonAnimUntil = elapsedTime + 0.24;
          this.triggerModuleFlash('big_canon', 0.24);
          this.achievements.recordModuleActivated('big_canon', this.currentTime);
          this.queueAchievementToastsIfNeeded();
          this.emitAudioEvent({ type: 'module_activate', slot: 'big_canon' });
        }
      }
    }

    if (!hasFrontCanon) return;
    const frontRuntime = this.ensureModuleRuntime('front_canon');
    if (!frontRuntime || frontRuntime.cooldownRemaining > 0 || this.frontCanonShot.active) return;
    const forward2D = this.getMovementHeadingVector(this.scratchVector2);
    const forward = this.scratchVector.set(forward2D.x, forward2D.y, 0);
    const range = this.getFrontCanonEffectiveRange();
    const frontStartOffset = this.getFrontCanonOriginOffset();
    const laserOriginX = this.playerPosition.x + forward2D.x * frontStartOffset;
    const laserOriginY = this.playerPosition.y + forward2D.y * frontStartOffset;
    const laserLength = Math.max(range, frontStartOffset + 0.28);
    const bestTarget = this.findBestFrontCanonTarget(forward, laserOriginX, laserOriginY, laserLength);
    if (!bestTarget?.node.enemySlot) {
      return;
    }
    const targetEnemy = bestTarget.node.enemySlot;
    this.queueCanonShot(
      this.frontCanonShot,
      'front_canon',
      bestTarget.node,
      targetEnemy.pole,
      this.scratchVector.set(
        this.playerPosition.x + forward2D.x * frontStartOffset,
        this.playerPosition.y + forward2D.y * frontStartOffset,
        this.playerPosition.z + 0.02
      ),
      24,
      0.16
    );
    if (targetEnemy.alive) {
      this.applyEnemyDefeat(bestTarget.node, targetEnemy, 'front_canon');
    }
    this.fillMomentumBurst(0.04);
    frontRuntime.cooldownRemaining = Math.max(1, this.runUpgrades.modifiers.frontCanonCooldown || 2.4);
    this.frontCanonAnimStartedAt = elapsedTime;
    this.frontCanonAnimUntil = elapsedTime + 0.18;
    this.triggerModuleFlash('front_canon', 0.22);
    this.achievements.recordModuleActivated('front_canon', this.currentTime);
    this.queueAchievementToastsIfNeeded();
    this.emitAudioEvent({ type: 'module_activate', slot: 'front_canon' });
  }

  private applyCoinBonus(baseValue: number) {
    const doubled = this.runUpgrades.modifiers.doubleCoin ? baseValue * 2 : baseValue;
    return Math.max(1, Math.round(doubled * (1 + this.runUpgrades.modifiers.coinBonus)));
  }

  private awardCoins(amount: number) {
    this.stats.addCoins(amount, this.momentum.gauge, this.twistStreak);
    this.achievements.recordCoinsCollected(amount);
    this.score = this.stats.getSnapshot().score;
    this.queueAchievementToastsIfNeeded();
  }

  private recordEnemyKill(
    event: {
      amount?: number;
      fromBehind?: boolean;
      shieldSave?: boolean;
      source?: 'impact' | 'front_canon' | 'big_canon' | 'shield';
    } = {}
  ) {
    const amount = Math.max(1, Math.trunc(event.amount ?? 1));
    this.stats.recordEnemyKill(amount, clamp(this.momentum.gauge, 0, 1), this.twistStreak);
    this.achievements.recordEnemyKill({
      amount,
      fromBehind: event.fromBehind,
      shieldSave: event.shieldSave,
      source: event.source,
      inMirror: this.getProgressionDirectionSign() < 0,
      atSeconds: this.currentTime
    });
    this.score = this.stats.getSnapshot().score;
    this.queueAchievementToastsIfNeeded();
  }

  private queueAchievementToastsIfNeeded() {
    while (this.achievementToasts.length < 3) {
      const pending = this.achievements.consumePendingUnlock();
      if (!pending) {
        return;
      }
      this.achievementToastSerial += 1;
      this.achievementToasts.push({
        achievementId: pending.achievementId,
        startedAt: this.currentTime,
        serial: this.achievementToastSerial
      });
    }
  }

  private tryTriggerMirrorMode(anchorNode: ResolvedGamePathNode) {
    const anchorTriggerReady = anchorNode.isMilestone
      ? this.hasCrossedNodeReverseSide(anchorNode, Math.max(0.22, this.getNodeProgressExtentX(anchorNode) * 0.06))
      : this.camera.isBehindSafeLine(this.playerPosition);
    if (!this.mirrorLaunchEligible || !anchorTriggerReady) {
      return false;
    }
    if (!this.isMirrorAnchorNode(anchorNode) || this.mirrorLaunchAnchorIndex !== anchorNode.index) {
      return false;
    }
    if (this.getMirrorReverseSpeed() < this.mirrorLaunchSpeedThreshold) {
      return false;
    }
    this.toggleMirrorMode(anchorNode.index);
    this.mirrorLaunchEligible = false;
    this.mirrorLaunchAnchorIndex = null;
    this.mirrorLaunchSpeedThreshold = 0;
    return true;
  }

  private isPendingMilestoneMirrorLaunch(anchorNode = this.getResolvedNode(this.attachedIndex)) {
    return (
      anchorNode.isMilestone &&
      this.mirrorLaunchEligible &&
      this.mirrorLaunchAnchorIndex === anchorNode.index
    );
  }

  private tryConsumePendingMilestoneMirrorLaunch(anchorNode = this.getResolvedNode(this.attachedIndex)) {
    if (!this.isPendingMilestoneMirrorLaunch(anchorNode)) {
      return false;
    }
    return this.tryTriggerMirrorMode(anchorNode);
  }

  private toggleMirrorMode(anchorIndex: number) {
    const ambientEnemyIds = this.ambientEnemies.map((enemy) => enemy.id);
    ambientEnemyIds.forEach((enemyId) => this.removeAmbientEnemy(enemyId, 'mirror_mode_toggle'));
    const hiddenMirrorReward = anchorIndex === this.attachedIndex && this.hiddenMilestoneChoice && this.getResolvedNode(anchorIndex).isMilestone
      ? this.hiddenMilestoneChoice
      : null;
    if (hiddenMirrorReward) {
      this.milestoneChoiceCache.delete(anchorIndex);
      this.achievements.recordMilestoneRewardClaimed();
      this.applyOffer(hiddenMirrorReward.offer, 'Mirror route');
    }

    const rawAnchorNode = this.path.getNode(anchorIndex);
    if (!rawAnchorNode) {
      return;
    }
    const rawAnchorResolved = resolveRuntimeNode(rawAnchorNode, this.currentTime, this.attachedIndex);
    const anchorWorldNode = this.getResolvedNode(anchorIndex);
    const previousSign = this.getProgressionDirectionSign();
    const nextSign = (previousSign * -1) as 1 | -1;
    const receptionNodeIndex = anchorIndex + 1;
    const toRawX = (worldX: number) => this.unprojectWorldX(worldX);
    const newOffset = anchorWorldNode.resolvedX - nextSign * rawAnchorResolved.resolvedX;
    const reprojectX = (worldX: number) => newOffset + nextSign * toRawX(worldX);
    const reprojectVector = (vector: THREE.Vector3) => {
      vector.x = reprojectX(vector.x);
    };

    reprojectVector(this.playerPosition);
    reprojectVector(this.transitionPlayerStartPosition);
    reprojectVector(this.shopCenter);
    reprojectVector(this.grapTargetPosition);
    this.playerVelocity.x *= -1;
    this.playerVelocityTarget.x *= -1;
    this.playerHeading.x *= -1;
    this.playerSurfaceNormal.x *= -1;
    this.trailPoints.forEach(reprojectVector);
    this.frontCanonShot.start.x = reprojectX(this.frontCanonShot.start.x);
    this.frontCanonShot.target.x = reprojectX(this.frontCanonShot.target.x);
    this.bigCanonShot.start.x = reprojectX(this.bigCanonShot.start.x);
    this.bigCanonShot.target.x = reprojectX(this.bigCanonShot.target.x);
    this.pendingMagnetCoins.forEach((coin) => {
      coin.start.x = reprojectX(coin.start.x);
    });

    this.path.setWorldDirectionTransform(nextSign, rawAnchorResolved.resolvedX, anchorWorldNode.resolvedX);
    this.setAttachedNodeRuntimeAnchor(this.getResolvedNode(this.attachedIndex));
    const mirroredAnchorNode = this.getResolvedNode(anchorIndex);
    const receptionNode = this.getResolvedNode(receptionNodeIndex);
    const receptionDirection = this.scratchVector
      .set(
        receptionNode.resolvedX - mirroredAnchorNode.resolvedX,
        receptionNode.resolvedY - mirroredAnchorNode.resolvedY,
        receptionNode.resolvedZ - mirroredAnchorNode.resolvedZ
      )
      .normalize();
    if (!Number.isFinite(receptionDirection.x) || receptionDirection.lengthSq() <= 0.0001) {
      receptionDirection.set(nextSign, 0, 0);
    }
    const preservedSpeed = Math.max(this.getMirrorReverseSpeed(-this.playerVelocity.x), this.playerVelocity.length(), this.mirrorLaunchSpeedThreshold + 1.4);
    const receptionLift = 1.05 + Math.min(1.35, mirroredAnchorNode.gameplayRadius * 0.12);
    this.playerPosition.set(
      mirroredAnchorNode.resolvedX + receptionDirection.x * (mirroredAnchorNode.gameplayRadius + 0.94),
      mirroredAnchorNode.resolvedY + receptionDirection.y * (mirroredAnchorNode.gameplayRadius * 0.42) + receptionLift,
      mirroredAnchorNode.resolvedZ
    );
    this.playerVelocity.set(receptionDirection.x * preservedSpeed, receptionDirection.y * preservedSpeed + 1.2, 0);
    this.playerVelocityTarget.copy(this.playerVelocity);
    this.playerHeading.set(receptionDirection.x, receptionDirection.y).normalize();
    this.playerSurfaceNormal.set(-receptionDirection.y, receptionDirection.x).normalize();
    this.playerState = 'airborne';
    this.state = 'running_airborne';
    this.choiceMode = 'none';
    this.activeChoices = [];
    this.hiddenMilestoneChoice = null;
    this.activeShopAngles = [];
    this.eventCooldownUntil = Math.max(this.eventCooldownUntil, this.currentTime + 0.22);
    this.camera.reset(mirroredAnchorNode, nextSign);

    if (nextSign < 0) {
      this.mirrorThemeBase ??= this.theme;
      const mirrorTheme = this.mirrorThemeBase === 'dark' ? 'light' : 'dark';
      if (this.themeRequestHandler) {
        this.themeRequestHandler(mirrorTheme);
      } else {
        this.setTheme(mirrorTheme);
      }
    } else {
      this.restoreThemeAfterMirror();
    }

    this.achievements.recordMirrorModeToggled(nextSign < 0);
    this.queueAchievementToastsIfNeeded();
  }

  private failRun(cause: GameOverCause = 'camera') {
    if (this.state === 'game_over') return;
    if ((cause === 'camera' || cause === 'out_of_bounds') && this.tryConsumePendingMilestoneMirrorLaunch()) {
      return;
    }
    if ((cause === 'camera' || cause === 'out_of_bounds') && this.isPendingMilestoneMirrorLaunch()) {
      return;
    }
    this.state = 'game_over';
    this.playerState = 'dead';
    this.gameOverCause = cause;
    this.chargeActive = false;
    this.chargeMeter = 0;
    this.choiceMode = 'none';
    this.activeChoices = [];
    this.hiddenMilestoneChoice = null;
    this.playerVelocity.set(0, 0, 0);
    this.playerVelocityTarget.set(0, 0, 0);
    this.angularSpeed = 0;
    this.airborneFromMilestone = false;
    this.gameOverStartedAt = this.currentTime;
    this.playerTrail.visible = false;
    this.pendingMagnetCoins.clear();
    this.resetAmbientEnemyRuntime();
    this.landingFeedback = null;
    this.landingFeedbackNodeIndex = null;
    this.resetPendingEnemyShot(this.frontCanonShot);
    this.resetPendingEnemyShot(this.bigCanonShot);
    this.clearWorldItemEffects();
    this.shop.reset();
    this.restoreThemeAfterMirror();
    this.achievements.recordRunEnded(this.stats.getSnapshot().distanceMeters);
    this.queueAchievementToastsIfNeeded();
    this.emitAudioEvent({ type: 'game_over' });
    this.emitScore();
  }

  private isOutsidePlayableField(position: THREE.Vector3) {
    const bounds = this.getParallaxWorldBounds();
    const verticalPadding = DEFAULT_COLUMN_DISTANCE * 0.42;
    return position.y <= bounds.minY - verticalPadding || position.y >= bounds.maxY + verticalPadding;
  }

  private getCaptureRadius(node: ResolvedGamePathNode) {
    const beltAssistRadius =
      this.playerState === 'airborne' && this.runUpgrades.modifiers.gravityCentering > 0
        ? Math.max(0.08, this.getPhysicalRadius(node) * 0.08)
        : 0;
    const sprintFishLandingAssistRadius =
      this.sprintFishLandingTargetIndex === node.index && this.currentTime <= this.sprintFishLandingAssistUntil
        ? SPRINT_FISH_LANDING_ASSIST_RADIUS
        : 0;
    return (
      this.getPhysicalRadius(node) +
      (node.isGigantic ? this.getOrbitClearance(node) + 1.15 : 0.92) +
      this.runUpgrades.modifiers.captureRadius +
      beltAssistRadius +
      sprintFishLandingAssistRadius
    );
  }

  private canCaptureNode(node: ResolvedGamePathNode, previousPosition?: THREE.Vector3) {
    if ((node.isMilestone || node.isGigantic) && this.disabledMilestoneIndices.has(node.index)) {
      return false;
    }
    const captureRadius = this.getCaptureRadius(node);
    const dx = this.playerPosition.x - node.resolvedX;
    const dy = this.playerPosition.y - node.resolvedY;
    const instantHit = dx * dx + dy * dy <= captureRadius * captureRadius;
    if (instantHit || !previousPosition) {
      return instantHit;
    }

    const ax = previousPosition.x - node.resolvedX;
    const ay = previousPosition.y - node.resolvedY;
    const bx = this.playerPosition.x - previousPosition.x;
    const by = this.playerPosition.y - previousPosition.y;
    const segmentLengthSq = bx * bx + by * by;
    if (segmentLengthSq <= 0.0001) {
      return false;
    }
    const t = clamp(-(ax * bx + ay * by) / segmentLengthSq, 0, 1);
    const closestX = ax + bx * t;
    const closestY = ay + by * t;
    return closestX * closestX + closestY * closestY <= captureRadius * captureRadius;
  }

  private isBetterCaptureCandidate(candidate: CaptureCandidate, currentBest: CaptureCandidate | null) {
    if (!currentBest) {
      return true;
    }
    if (candidate.attachment.contactProgress < currentBest.attachment.contactProgress - 0.0015) {
      return true;
    }
    if (candidate.attachment.contactProgress > currentBest.attachment.contactProgress + 0.0015) {
      return false;
    }
    return candidate.attachment.distanceSq < currentBest.attachment.distanceSq;
  }

  private findCaptureAttachment(
    node: ResolvedGamePathNode,
    previousPosition: THREE.Vector3,
    currentPosition: THREE.Vector3,
    travelSpeed: number
  ) {
    if (!this.canCaptureNode(node, previousPosition)) {
      return null;
    }
    return this.findBestOrbitAttachmentOnSegment(node, previousPosition, currentPosition, travelSpeed);
  }

  private findBestCaptureCandidate(
    nodes: ResolvedGamePathNode[],
    previousPosition: THREE.Vector3,
    currentPosition: THREE.Vector3,
    travelSpeed: number
  ) {
    let best: CaptureCandidate | null = null;
    for (const node of nodes) {
      const attachment = this.findCaptureAttachment(node, previousPosition, currentPosition, travelSpeed);
      if (!attachment) {
        continue;
      }
      const candidate: CaptureCandidate = { node, attachment };
      if (this.isBetterCaptureCandidate(candidate, best)) {
        best = candidate;
      }
    }
    return best;
  }

  private findBestForwardCaptureCandidate(
    previousPosition: THREE.Vector3,
    currentPosition: THREE.Vector3,
    travelSpeed: number,
    searchLimit: number,
    giganticOnly: boolean
  ) {
    let best: CaptureCandidate | null = null;
    const directionSign = this.getProgressionDirectionSign();
    const safeLeft = this.camera.getSafeLeft();
    const searchStartIndex = giganticOnly ? Math.max(0, this.attachedIndex - 6) : this.attachedIndex + 1;
    const safeRight = this.camera.getSafeRight();
    for (let index = searchStartIndex; index <= searchLimit; index += 1) {
      const node = this.getResolvedNode(index);
      const radius = this.getPhysicalRadius(node);
      const directionalOffset = (node.resolvedX - previousPosition.x) * directionSign;
      if (directionalOffset > 64) {
        break;
      }
      const stillVisibleMilestone =
        node.isGigantic &&
        node.resolvedX + this.getNodeProgressExtentX(node) >= safeLeft &&
        node.resolvedX - this.getNodeProgressExtentX(node) <= safeRight + Math.max(1.2, radius * 0.16);
      if (this.isNodeFullyPassed(node) && !stillVisibleMilestone) {
        continue;
      }
      if (giganticOnly ? !node.isGigantic : node.isGigantic) {
        continue;
      }
      const attachment = this.findCaptureAttachment(node, previousPosition, currentPosition, travelSpeed);
      if (!attachment) {
        continue;
      }
      const candidate: CaptureCandidate = { node, attachment };
      if (this.isBetterCaptureCandidate(candidate, best)) {
        best = candidate;
      }
    }
    return best;
  }

  private getClosestSegmentParameter(start: THREE.Vector3, end: THREE.Vector3, point: THREE.Vector3) {
    const segmentX = end.x - start.x;
    const segmentY = end.y - start.y;
    const segmentLengthSq = segmentX * segmentX + segmentY * segmentY;
    if (segmentLengthSq <= 0.0001) {
      return 1;
    }
    return clamp(
      ((point.x - start.x) * segmentX + (point.y - start.y) * segmentY) / segmentLengthSq,
      0,
      1
    );
  }

  private findBestOrbitAttachment(node: ResolvedGamePathNode, worldPosition: THREE.Vector3, travelSpeed: number): OrbitAttachment {
    const measureAttachment = (angle: number) => {
      const orbitSample = this.getOrbitSample(node, angle);
      const surfaceSample = this.getSurfaceSample(node, angle);
      const surfaceWorldPosition = this.getSurfaceContactWorldPosition(node, angle, this.scratchVector);
      const candidateWorldPosition = this.getPlayerOrbitWorldPosition(node, angle, orbitSample, this.scratchVectorB, travelSpeed);
      return {
        angle,
        distanceSq: worldPosition.distanceToSquared(candidateWorldPosition),
        position: orbitSample.position.clone(),
        tangent: surfaceSample.tangent.clone(),
        normal: this.getSurfaceNormal(surfaceSample, this.scratchVector2).clone(),
        surfaceWorldPosition: surfaceWorldPosition.clone(),
        worldPosition: candidateWorldPosition.clone()
      };
    };

    const coarseSteps = 144;
    const coarseStepAngle = (Math.PI * 2) / coarseSteps;
    let best = measureAttachment(0);
    for (let step = 1; step < coarseSteps; step += 1) {
      const candidate = measureAttachment(step * coarseStepAngle);
      if (candidate.distanceSq < best.distanceSq) {
        best = candidate;
      }
    }

    const refineStepAngle = coarseStepAngle / 10;
    for (let step = -6; step <= 6; step += 1) {
      const candidate = measureAttachment(wrapAngle(best.angle + step * refineStepAngle));
      if (candidate.distanceSq < best.distanceSq) {
        best = candidate;
      }
    }

    return {
      angle: best.angle,
      position: best.position,
      tangent: best.tangent,
      normal: best.normal,
      surfaceWorldPosition: best.surfaceWorldPosition,
      worldPosition: best.worldPosition,
      contactProgress: 1,
      distanceSq: best.distanceSq
    };
  }

  private findBestOrbitAttachmentOnSegment(
    node: ResolvedGamePathNode,
    segmentStart: THREE.Vector3,
    segmentEnd: THREE.Vector3,
    travelSpeed: number
  ): OrbitAttachment | null {
    const segmentLength = Math.hypot(segmentEnd.x - segmentStart.x, segmentEnd.y - segmentStart.y);
    const contactTolerance = clamp(
      Math.max(0.12, segmentLength * 0.12, node.visualScale * 0.028, node.isGigantic ? this.getPhysicalRadius(node) * 0.035 : 0),
      0.12,
      node.isGigantic ? 1.04 : 0.46
    );
    const contactToleranceSq = contactTolerance * contactTolerance;
    const isBetterAttachment = (
      candidate: {
        distanceSq: number;
        segmentT: number;
      },
      currentBest: {
        distanceSq: number;
        segmentT: number;
      }
    ) => {
      const candidateOnPath = candidate.distanceSq <= contactToleranceSq;
      const bestOnPath = currentBest.distanceSq <= contactToleranceSq;
      if (candidateOnPath !== bestOnPath) {
        return candidateOnPath;
      }
      if (candidateOnPath && bestOnPath) {
        if (candidate.segmentT < currentBest.segmentT - 0.0015) {
          return true;
        }
        if (candidate.segmentT > currentBest.segmentT + 0.0015) {
          return false;
        }
        return candidate.distanceSq < currentBest.distanceSq;
      }
      if (candidate.distanceSq < currentBest.distanceSq - 0.0001) {
        return true;
      }
      if (candidate.distanceSq > currentBest.distanceSq + 0.0001) {
        return false;
      }
      return candidate.segmentT < currentBest.segmentT;
    };

    const measureAttachment = (angle: number) => {
      const orbitSample = this.getOrbitSample(node, angle);
      const surfaceSample = this.getSurfaceSample(node, angle);
      const surfaceWorldPosition = this.getSurfaceContactWorldPosition(node, angle, this.scratchVector);
      const candidateWorldPosition = this.getPlayerOrbitWorldPosition(node, angle, orbitSample, this.scratchVectorB, travelSpeed);
      const segmentT = this.getClosestSegmentParameter(segmentStart, segmentEnd, candidateWorldPosition);
      const closestX = segmentStart.x + (segmentEnd.x - segmentStart.x) * segmentT;
      const closestY = segmentStart.y + (segmentEnd.y - segmentStart.y) * segmentT;
      const dx = candidateWorldPosition.x - closestX;
      const dy = candidateWorldPosition.y - closestY;
      return {
        angle,
        distanceSq: dx * dx + dy * dy,
        segmentT,
        position: orbitSample.position.clone(),
        tangent: surfaceSample.tangent.clone(),
        normal: this.getSurfaceNormal(surfaceSample, this.scratchVector2).clone(),
        surfaceWorldPosition: surfaceWorldPosition.clone(),
        worldPosition: candidateWorldPosition.clone()
      };
    };

    const coarseSteps = 192;
    const coarseStepAngle = (Math.PI * 2) / coarseSteps;
    let best = measureAttachment(0);
    for (let step = 1; step < coarseSteps; step += 1) {
      const candidate = measureAttachment(step * coarseStepAngle);
      if (isBetterAttachment(candidate, best)) {
        best = candidate;
      }
    }

    const refineStepAngle = coarseStepAngle / 12;
    for (let step = -8; step <= 8; step += 1) {
      const candidate = measureAttachment(wrapAngle(best.angle + step * refineStepAngle));
      if (isBetterAttachment(candidate, best)) {
        best = candidate;
      }
    }

    if (best.distanceSq > contactToleranceSq) {
      return null;
    }

    return {
      angle: best.angle,
      position: best.position,
      tangent: best.tangent,
      normal: best.normal,
      surfaceWorldPosition: best.surfaceWorldPosition,
      worldPosition: best.worldPosition,
      contactProgress: best.segmentT,
      distanceSq: best.distanceSq
    };
  }

  private getOrbitSample(node: ResolvedGamePathNode, angle: number): OrbitSample {
    return this.getSurfaceSampleWithClearance(node, angle, this.getOrbitClearance(node));
  }

  private getSurfaceSample(node: ResolvedGamePathNode, angle: number): OrbitSample {
    return this.getSurfaceSampleWithClearance(node, angle, 0);
  }

  private getSurfaceSampleWithClearance(node: ResolvedGamePathNode, angle: number, clearance: number): OrbitSample {
    const parameter = wrapAngle(angle);
    const rotation = node.shapeKind === 'round' ? 0 : node.resolvedSpinPhase;
    const extents = this.getShapeExtents(node);
    const baseRadius = this.getPhysicalRadius(node) + clearance;
    const localAngle = this.getSurfaceLocalAngle(node, parameter);

    if (node.shapeKind === 'oval') {
      const rx = extents.x + clearance;
      const ry = extents.y + clearance;
      const position = new THREE.Vector2(Math.cos(localAngle) * rx, Math.sin(localAngle) * ry);
      const tangent = new THREE.Vector2(-Math.sin(localAngle) * rx, Math.cos(localAngle) * ry).normalize();
      return this.applySurfaceContour(node, localAngle, this.rotateOrbitSample(position, tangent, rotation));
    }

    if (node.shapeKind === 'triangular') {
      const halfHeight = extents.y + clearance;
      const halfWidth = (extents.x / Math.max(0.0001, extents.y)) * halfHeight;
      const vertices = [
        new THREE.Vector2(0, halfHeight),
        new THREE.Vector2(-halfWidth, -halfHeight * 0.5),
        new THREE.Vector2(halfWidth, -halfHeight * 0.5)
      ];
      const boundary = this.sampleTriangleBoundary(vertices, localAngle);
      const position = boundary.position;
      const tangent = boundary.tangent;
      return this.applySurfaceContour(node, localAngle, this.rotateOrbitSample(position, tangent, rotation));
    }

    const position = new THREE.Vector2(Math.cos(parameter) * baseRadius, Math.sin(parameter) * baseRadius);
    const tangent = new THREE.Vector2(-Math.sin(parameter), Math.cos(parameter));
    return this.applySurfaceContour(node, localAngle, this.rotateOrbitSample(position, tangent, 0));
  }

  private getShapeExtents(node: ResolvedGamePathNode) {
    const geometryBaseX = node.shapeKind === 'triangular' ? 1.24 * 0.866 : node.shapeKind === 'oval' ? 1.18 : 1.25;
    const geometryBaseY = node.shapeKind === 'triangular' ? 1.24 : node.shapeKind === 'oval' ? 1.18 : 1.25;
    return {
      x: geometryBaseX * node.visualScale * node.visualStretch.x * 0.92,
      y: geometryBaseY * node.visualScale * node.visualStretch.y * 0.92
    };
  }

  private sampleTriangleBoundary(vertices: THREE.Vector2[], angle: number) {
    const direction = new THREE.Vector2(Math.cos(angle), Math.sin(angle));
    let bestDistance = Number.POSITIVE_INFINITY;
    let bestPoint = vertices[0]!.clone();
    let bestTangent = vertices[1]!.clone().sub(vertices[0]!).normalize();

    for (let index = 0; index < vertices.length; index += 1) {
      const start = vertices[index]!;
      const end = vertices[(index + 1) % vertices.length]!;
      const edge = end.clone().sub(start);
      const denominator = direction.x * edge.y - direction.y * edge.x;
      if (Math.abs(denominator) < 0.0001) {
        continue;
      }

      const t = (start.x * edge.y - start.y * edge.x) / denominator;
      const u = (start.x * direction.y - start.y * direction.x) / denominator;
      if (t <= 0 || u < 0 || u > 1) {
        continue;
      }

      if (t < bestDistance) {
        bestDistance = t;
        bestPoint = direction.clone().multiplyScalar(t);
        bestTangent = edge.normalize();
      }
    }

    return {
      position: bestPoint,
      tangent: bestTangent
    };
  }

  private getPhysicalRadius(node: ResolvedGamePathNode) {
    const extents = this.getShapeExtents(node);
    const renderedRadius = Math.max(extents.x, extents.y);
    if (node.isGigantic) {
      return Math.max(node.gameplayRadius, renderedRadius * 1.02);
    }
    return Math.max(node.gameplayRadius, renderedRadius);
  }

  private getOrbitClearance(node: ResolvedGamePathNode) {
    const speedBoost =
      node.index === this.attachedIndex && this.playerState !== 'airborne'
        ? clamp(this.playerVelocity.length() / 16, 0, 0.46)
        : 0;
    const largeShardBoost = clamp((node.visualScale - 3.2) * 0.085, 0, 0.82);
    if (node.isGigantic) {
      return clamp(0.96 + node.visualScale * 0.042 + speedBoost * 0.4, 0.96, 2.35);
    }
    const baseClearance =
      node.visualScale <= 1.15
        ? 0.04
        : node.visualScale <= 1.7
          ? 0.08
          : node.visualScale <= 2.4
            ? 0.12
            : 0.16;
    return clamp(baseClearance + node.visualScale * 0.02 + largeShardBoost * 0.46 + speedBoost * 0.64, 0.04, 1.08);
  }

  private applySurfaceContour(node: ResolvedGamePathNode, localAngle: number, sample: OrbitSample): OrbitSample {
    const contourScale = 1 + this.sampleSurfaceDeformation(node, localAngle);
    const radial = sample.position.clone().normalize();
    return {
      position: sample.position.multiplyScalar(contourScale),
      tangent: sample.tangent.addScaledVector(radial, 0.12 * this.sampleSurfaceSlope(node, localAngle)).normalize()
    };
  }

  private sampleSurfaceDeformation(node: ResolvedGamePathNode, localAngle: number) {
    const levelFactor = clamp(node.index / 280, 0, 1);
    const sizeDamping = clamp(1.08 - node.visualScale * 0.035, 0.32, 1);
    const amplitude = (0.008 + levelFactor * 0.03) * sizeDamping;
    const primaryFrequency = node.shapeKind === 'triangular' ? 3 : node.shapeKind === 'oval' ? 2 : 4;
    const base =
      Math.sin(localAngle * primaryFrequency + node.motionSeed * 6.2) * amplitude +
      Math.sin(localAngle * (primaryFrequency + 3) - node.motionSeed * 4.1) * amplitude * 0.42;
    return base + this.sampleImpactWaveOffset(node, localAngle) + this.sampleBoatWaveOffset(node, localAngle) * sizeDamping;
  }

  private sampleSurfaceSlope(node: ResolvedGamePathNode, localAngle: number) {
    const epsilon = 0.06;
    return (
      this.sampleSurfaceDeformation(node, wrapAngle(localAngle + epsilon)) -
      this.sampleSurfaceDeformation(node, wrapAngle(localAngle - epsilon))
    ) / (epsilon * 2);
  }

  private sampleImpactWaveOffset(node: ResolvedGamePathNode, localAngle: number) {
    const waves = this.impactWaves.get(node.index);
    if (!waves || waves.length === 0) return 0;

    let total = 0;
    const remaining: ImpactWave[] = [];
    waves.forEach((wave) => {
      const age = this.currentTime - wave.createdAt;
      if (age >= wave.decay) return;
      const life = 1 - age / wave.decay;
      const angleDelta = shortestAngleDistance(localAngle, wave.originAngle);
      const influence = Math.exp(-(angleDelta * angleDelta) / Math.max(0.08, wave.radius * wave.radius));
      total += wave.strength * influence * life;
      remaining.push(wave);
    });

    if (remaining.length > 0) {
      this.impactWaves.set(node.index, remaining);
    } else {
      this.impactWaves.delete(node.index);
    }

    return total;
  }

  private sampleBoatWaveOffset(node: ResolvedGamePathNode, localAngle: number) {
    if (node.index !== this.attachedIndex || this.playerState === 'airborne') {
      return 0;
    }

    const boatAngle = this.getSurfaceLocalAngle(node, this.orbitAngle);
    const forwardTrailAngle = wrapAngle(boatAngle - this.orbitDirection * 0.28);
    const localDelta = shortestAngleDistance(localAngle, boatAngle);
    const trailDelta = shortestAngleDistance(localAngle, forwardTrailAngle);
    const ramp = this.orbitGraceActive ? clamp(this.orbitGraceProgress, 0.15, 1) : 1;
    const core = Math.exp(-(localDelta * localDelta) / 0.2) * (0.05 + this.momentum.gauge * 0.075) * ramp;
    const trail = Math.exp(-(trailDelta * trailDelta) / 0.48) * 0.03 * ramp;
    return core + trail;
  }

  private registerImpactWave(node: ResolvedGamePathNode, angle: number, impactSpeed: number) {
    const levelFactor = clamp(node.index / 240, 0, 1);
    const sizeDamping = clamp(1.04 - node.visualScale * 0.03, 0.34, 1);
    const damping = 1 - this.runUpgrades.modifiers.shockwaveDamping;
    const strength =
      clamp((impactSpeed - 4.6) / 18, 0.02, 0.18) *
      (0.6 + levelFactor * 0.4) *
      sizeDamping *
      clamp(0.34 + damping * 0.66, 0.28, 1);
    const wave: ImpactWave = {
      originAngle: wrapAngle(angle),
      strength,
      radius: 0.32 + clamp(impactSpeed / 18, 0, 0.72),
      decay: 1.4 + clamp(impactSpeed / 16, 0, 0.9),
      createdAt: this.currentTime
    };
    const current = this.impactWaves.get(node.index) ?? [];
    current.push(wave);
    this.impactWaves.set(node.index, current.slice(-4));
  }

  private getVisualWaveState(node: ResolvedGamePathNode) {
    const waves = this.impactWaves.get(node.index);
    if (!waves || waves.length === 0) return null;

    let bestWave: ImpactWave | null = null;
    let bestLife = 0;
    for (const wave of waves) {
      const age = this.currentTime - wave.createdAt;
      if (age >= wave.decay) continue;
      const life = 1 - age / wave.decay;
      if (!bestWave || life * wave.strength > bestLife) {
        bestWave = wave;
        bestLife = life * wave.strength;
      }
    }

    if (!bestWave) return null;
    const age = this.currentTime - bestWave.createdAt;
    const life = clamp(1 - age / bestWave.decay, 0, 1);
    return {
      angle: bestWave.originAngle,
      strength: bestWave.strength * (0.9 + life * 0.9),
      density: 0.72 + life * 0.58
    };
  }

  private rotateOrbitSample(position: THREE.Vector2, tangent: THREE.Vector2, rotation: number): OrbitSample {
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    return {
      position: new THREE.Vector2(position.x * cos - position.y * sin, position.x * sin + position.y * cos),
      tangent: new THREE.Vector2(tangent.x * cos - tangent.y * sin, tangent.x * sin + tangent.y * cos).normalize()
    };
  }

  private getSurfaceLocalAngle(node: ResolvedGamePathNode, angle: number) {
    return wrapAngle(angle - (node.shapeKind === 'round' ? 0 : node.resolvedSpinPhase));
  }

  private getPlayerOrbitWorldPosition(
    node: ResolvedGamePathNode,
    angle: number,
    sample: OrbitSample,
    target = new THREE.Vector3(),
    travelSpeed = this.playerState === 'airborne'
      ? this.playerVelocity.length()
      : Math.abs(this.angularSpeed) * Math.max(1, sample.position.length())
  ) {
    const localAngle = this.getSurfaceLocalAngle(node, angle);
    const deformation = Math.max(0, this.sampleSurfaceDeformation(node, localAngle));
    const largeShardLift =
      !node.isMilestone && node.visualScale >= 5
        ? clamp(0.14 + deformation * 0.92 + travelSpeed * 0.012, 0.14, 0.84)
        : clamp(deformation * 0.16 + travelSpeed * 0.003, 0, 0.12);
    const beltHoverLift = this.getGravityBeltHoverLift(node, travelSpeed);
    return this.offsetSurfaceWorldPosition(node, sample, largeShardLift + beltHoverLift, target);
  }

  private getSurfaceAnchorWorldPosition(
    node: ResolvedGamePathNode,
    angle: number,
    radiusFromCenter: number,
    target = new THREE.Vector3()
  ) {
    const sample = this.getOrbitSample(node, angle);
    return this.offsetSurfaceWorldPosition(node, sample, radiusFromCenter - sample.position.length(), target);
  }

  private getCoinSlotWorldPosition(
    node: ResolvedGamePathNode,
    slot: {
      angle: number;
      orbitScale: number;
      forwardOffset?: number;
      verticalOffset?: number;
    }
  ) {
    return this.getCoinWorldPosition(node, slot.angle, slot.orbitScale, slot.forwardOffset ?? 0, slot.verticalOffset ?? 0);
  }

  private getCoinWorldPosition(
    node: ResolvedGamePathNode,
    angle: number,
    orbitScale: number,
    forwardOffset = 0,
    verticalOffset = 0
  ) {
    const orbit = this.getOrbitSample(node, angle);
    const clearance = this.getOrbitClearance(node);
    const orbitRadius = orbit.position.length() * orbitScale;
    const gameplayOrbitRadius = 1.08 + node.gameplayRadius * 0.76;
    const coinRadius = Math.max(
      this.getPhysicalRadius(node) + clearance * Math.max(1, orbitScale) + 0.46,
      orbitRadius + 0.38,
      gameplayOrbitRadius + 0.32
    );
    const position = this.getSurfaceAnchorWorldPosition(node, angle, coinRadius);
    position.x += this.getProgressionDirectionSign() * forwardOffset;
    position.y += verticalOffset;
    return position;
  }

  private getEnemyWorldPosition(node: ResolvedGamePathNode, pole: 'north' | 'south') {
    const poleAngle = pole === 'north' ? Math.PI * 0.5 : Math.PI * 1.5;
    return this.getSurfaceAnchorWorldPosition(node, poleAngle, this.getPhysicalRadius(node) + 0.92);
  }

  private getEnemyBodyWorldPosition(node: ResolvedGamePathNode, pole: 'north' | 'south') {
    const position = this.getEnemyWorldPosition(node, pole);
    position.y += pole === 'north' ? 0.46 : -0.46;
    return position;
  }

  private getEnemyScanRadius(enemy: NonNullable<ResolvedGamePathNode['enemySlot']>) {
    return enemy.tier === 'elite' ? 1.08 : enemy.tier === 'armored' ? 0.96 : enemy.tier === 'light' ? 0.82 : 1.16;
  }

  private getTravelProjectionRatio(previousPosition: THREE.Vector3, targetPosition: THREE.Vector3) {
    const segmentX = this.playerPosition.x - previousPosition.x;
    const segmentY = this.playerPosition.y - previousPosition.y;
    const segmentZ = this.playerPosition.z - previousPosition.z;
    const segmentLengthSq = segmentX * segmentX + segmentY * segmentY + segmentZ * segmentZ;
    if (segmentLengthSq <= 0.0001) {
      return 1;
    }
    const toTargetX = targetPosition.x - previousPosition.x;
    const toTargetY = targetPosition.y - previousPosition.y;
    const toTargetZ = targetPosition.z - previousPosition.z;
    return clamp((toTargetX * segmentX + toTargetY * segmentY + toTargetZ * segmentZ) / segmentLengthSq, 0, 1);
  }

  private getEnemyBodyHalfExtents(enemy: NonNullable<ResolvedGamePathNode['enemySlot']>, airborne: boolean) {
    const displayScale = enemy.tier === 'elite' ? 0.85 : enemy.tier === 'armored' ? 0.74 : enemy.tier === 'invincible' ? 0.91 : 0.67;
    const halfWidth = 2.56 * 0.5 * displayScale * 0.56;
    const halfHeight = 2.56 * 0.5 * displayScale * 0.74;
    const movementInflation = airborne ? 0.1 : 0.04;
    return {
      x: halfWidth + PLAYER_PROGRESS_HALF_WIDTH * 0.42 + movementInflation,
      y: halfHeight + PLAYER_COLLISION_HALF_HEIGHT * 0.42 + movementInflation,
      z: 0.56
    };
  }

  private isEnemyWithinContact(
    _node: ResolvedGamePathNode,
    enemy: NonNullable<ResolvedGamePathNode['enemySlot']>,
    enemyPosition: THREE.Vector3,
    previousPosition: THREE.Vector3,
    airborne: boolean
  ) {
    const contactExtents = this.getEnemyBodyHalfExtents(enemy, airborne);
    const segmentX = this.playerPosition.x - previousPosition.x;
    const segmentY = this.playerPosition.y - previousPosition.y;
    const segmentZ = this.playerPosition.z - previousPosition.z;
    const segmentLengthSq = segmentX * segmentX + segmentY * segmentY + segmentZ * segmentZ;
    if (segmentLengthSq <= 0.0001) {
      const deltaX = (this.playerPosition.x - enemyPosition.x) / Math.max(0.001, contactExtents.x);
      const deltaY = (this.playerPosition.y - enemyPosition.y) / Math.max(0.001, contactExtents.y);
      return deltaX * deltaX + deltaY * deltaY <= 1;
    }
    const toEnemyX = enemyPosition.x - previousPosition.x;
    const toEnemyY = enemyPosition.y - previousPosition.y;
    const toEnemyZ = enemyPosition.z - previousPosition.z;
    const projection = clamp(
      (toEnemyX * segmentX + toEnemyY * segmentY + toEnemyZ * segmentZ) / segmentLengthSq,
      0,
      1
    );
    const closestX = previousPosition.x + segmentX * projection;
    const closestY = previousPosition.y + segmentY * projection;
    const closestZ = previousPosition.z + segmentZ * projection;
    const deltaX = (enemyPosition.x - closestX) / Math.max(0.001, contactExtents.x);
    const deltaY = (enemyPosition.y - closestY) / Math.max(0.001, contactExtents.y);
    const deltaZ = (enemyPosition.z - closestZ) / Math.max(0.001, contactExtents.z);
    return deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ <= 1;
  }

  private getNodeProgressExtentX(node: ResolvedGamePathNode) {
    return this.getShapeExtents(node).x;
  }

  private isNodeFullyPassed(node: ResolvedGamePathNode, playerPosition = this.playerPosition) {
    const directionSign = this.getProgressionDirectionSign();
    const playerTrailingEdgeX = playerPosition.x - directionSign * PLAYER_PROGRESS_HALF_WIDTH;
    const nodeForwardEdgeX = node.resolvedX + directionSign * this.getNodeProgressExtentX(node);
    return (playerTrailingEdgeX - nodeForwardEdgeX) * directionSign > 0;
  }

  private hasCrossedNodeReverseSide(node: ResolvedGamePathNode, buffer = 0) {
    const directionSign = this.getProgressionDirectionSign();
    const playerReverseEdgeX = this.playerPosition.x - directionSign * PLAYER_PROGRESS_HALF_WIDTH;
    const nodeReverseEdgeX = node.resolvedX - directionSign * this.getNodeProgressExtentX(node);
    return (playerReverseEdgeX - nodeReverseEdgeX) * directionSign <= -buffer;
  }

  private getGravityBeltHoverLift(node: ResolvedGamePathNode, travelSpeed: number) {
    if (this.runUpgrades.modifiers.gravityCentering <= 0 || node.isGigantic) {
      return 0;
    }
    const speedBias = clamp(1.1 - travelSpeed / 13.5, 0.18, 1);
    const sizeBias = clamp(node.visualScale * 0.028, 0.03, 0.16);
    return clamp(0.12 + this.runUpgrades.modifiers.gravityCentering * 0.16 + sizeBias * speedBias, 0, 0.42);
  }

  getPlayableBorderHint() {
    const nodes = this.getDisplayNodes(Math.min(28, this.getRecommendedVisibleCount()));
    const left = nodes[0]?.resolvedX ?? this.playerPosition.x - DEFAULT_COLUMN_DISTANCE * 2;
    const right = nodes[nodes.length - 1]?.resolvedX ?? this.playerPosition.x + DEFAULT_COLUMN_DISTANCE * 8;
    return {
      top: 32,
      bottom: -32,
      left,
      right,
      tileWidth: DEFAULT_COLUMN_DISTANCE,
      assetUrl: null as string | null
    };
  }


  private prewarmUpcomingMilestones() {
    for (let index = this.attachedIndex + 1; index < this.attachedIndex + 48; index += 1) {
      const node = this.path.getNode(index);
      if (!node?.isMilestone || this.milestoneChoiceCache.has(node.index)) {
        continue;
      }
      const offers = buildUpgradeOffers(node.index, this.runUpgrades);
      this.milestoneChoiceCache.set(node.index, this.path.createUpgradeBranches(node.index, offers, this.score));
      return;
    }
  }

  private getBranchHints(): BranchLabelHint[] {
    if (this.choiceMode === 'reward_branch') {
      return this.activeChoices.slice(0, 3).map((choice, index) => {
        const preview = this.resolveChoiceNode(choice.previewNodes[0] ?? choice.entry);
        return {
          slot: index as 0 | 1 | 2,
          offer: choice.offer,
          worldPosition: new THREE.Vector3(
            preview.resolvedX + (index === 1 ? 3.6 : 3.2) * this.getProgressionDirectionSign(),
            preview.resolvedY + (index === 0 ? 0.28 : index === 2 ? -0.28 : 0),
            preview.resolvedZ
          ),
          mode: 'reward_branch'
        };
      });
    }

    if (this.choiceMode === 'shop_orbit' && this.activeChoices.length > 0) {
      const node = this.getResolvedNode(this.attachedIndex);
      return this.activeChoices.slice(0, 3).map((choice, index) => {
        const angle = this.activeShopAngles[index] ?? 0;
        const radius = node.gameplayRadius + 3.1;
        return {
          slot: index as 0 | 1 | 2,
          offer: choice.offer,
          worldPosition: new THREE.Vector3(
            node.resolvedX + Math.cos(angle) * radius,
            node.resolvedY + Math.sin(angle) * (radius * 0.72) + 0.84,
            node.resolvedZ
          ),
          mode: 'shop_orbit',
          price: choice.price
        };
      });
    }

    return [];
  }

  private getThemeShardColor() {
    return getThemeShardHex(this.theme);
  }

  private getThemeContrastColor() {
    return getThemeShardContrastHex(this.theme);
  }

  private getRarityColor(rarity: RogueliteRarity) {
    return RARITY_COLORS[rarity];
  }

  private getRarityLabelFr(rarity: RogueliteRarity) {
    const labels: Record<RogueliteRarity, string> = {
      common: 'Commun',
      uncommon: 'Peu commun',
      rare: 'Rare',
      epic: 'Épique',
      legendary: 'Légendaire'
    };
    return labels[rarity];
  }

  private getRarityLabelEn(rarity: RogueliteRarity) {
    const labels: Record<RogueliteRarity, string> = {
      common: 'Common',
      uncommon: 'Uncommon',
      rare: 'Rare',
      epic: 'Epic',
      legendary: 'Legendary'
    };
    return labels[rarity];
  }

  private getHudBillboardImage(src: string) {
    const cached = this.rewardImageCache.get(src);
    if (cached) {
      return cached;
    }
    const image = getSharedImageAsset(src, {
      onLoad: () => {
        this.rewardBillboardSignature = '';
      }
    });
    this.rewardImageCache.set(src, image);
    return image;
  }
}
