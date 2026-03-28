import * as THREE from 'three';
import { isMobileRuntime } from '../core/device';
import { clamp, damp } from '../core/math';
import type { ThemeMode } from '../types/content';
import { CameraRailController } from './CameraRailController';
import { CoinSystem, type CoinMarker } from './CoinSystem';
import { EnemySystem, type EnemyMarker } from './EnemySystem';
import { createMiniGamePortalNode } from './MiniGamePortalLayout';
import { DEFAULT_COLUMN_DISTANCE } from './difficultyScaler';
import { HELP_ICON_ASSETS } from './GameUiAssetResolver';
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

interface WorldHudBillboard {
  canvas: HTMLCanvasElement;
  texture: THREE.CanvasTexture;
  sprite: THREE.Sprite;
}

const DANGER_ACCENT = '#F06A5A';
const ITEM_PLACEHOLDER_ICON = '/assets/images/shared/branding/ape-prod-mark-dark.svg';
const PLAYER_MAIN_SPRITE_URL = new URL('../../assets/images/game/sprites/characters/player/boat-airborne-sheet.png', import.meta.url).href;
const PLAYER_BOOST_SPRITE_URL = new URL('../../assets/images/game/sprites/characters/player/boat-boost-sheet.png', import.meta.url).href;
const STICK_MONKEY_AIR_URL = new URL('../../assets/images/game/sprites/characters/companion/stick-monkey-airborne-sheet.png', import.meta.url).href;
const STICK_MONKEY_GLIDE_URL = new URL('../../assets/images/game/sprites/characters/companion/stick-monkey-glide-sheet.png', import.meta.url).href;
const BIG_CANON_PROJECTILE_URL = new URL('../../assets/images/game/sprites/effects/big-cannon-projectile.svg', import.meta.url).href;
const FRONT_CANON_PROJECTILE_URL = new URL('../../assets/images/game/sprites/effects/front-cannon-projectile.svg', import.meta.url).href;
const MAGNET_RADIUS_URL = new URL('../../assets/images/game/sprites/effects/magnet-radius.svg', import.meta.url).href;
const BIG_CANON_RADIUS_URL = new URL('../../assets/images/game/sprites/effects/big-cannon-radius.svg', import.meta.url).href;
const GRAP_RADIUS_URL = new URL('../../assets/images/game/sprites/effects/grappling-hook-radius.svg', import.meta.url).href;
const RARITY_COLORS: Record<RogueliteRarity, string> = {
  common: '#F2DDB8',
  uncommon: '#75AF80',
  rare: '#49BCFF',
  epic: '#8C53B4',
  legendary: '#727C91'
};

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

interface ImpactWave {
  originAngle: number;
  strength: number;
  radius: number;
  decay: number;
  createdAt: number;
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
  private readonly rewardHeaderBillboard: WorldHudBillboard;
  private readonly rewardCardBillboards: [WorldHudBillboard, WorldHudBillboard, WorldHudBillboard];
  private readonly magnetRangeIndicator: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  private readonly bigCanonRangeIndicator: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  private readonly grapRangeIndicator: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  private readonly milestonePlayerIndicator: THREE.Mesh<THREE.ConeGeometry, THREE.MeshBasicMaterial>;
  private readonly frontCanonLaser: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private readonly frontCanonProjectile: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private readonly bigCanonProjectile: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private readonly grapRope: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private readonly playerTrail = new THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  private readonly trailPoints = Array.from({ length: 8 }, () => new THREE.Vector3());
  private readonly trailBuffer = new Float32Array(this.trailPoints.length * 3);
  private readonly path = new GamePathSystem();
  private readonly camera = new CameraRailController();
  private readonly stats = new RunStatsSystem();
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
  private readonly scoreListeners = new Set<() => void>();
  private readonly audioListeners = new Set<(event: GameAudioEvent) => void>();
  private readonly playerPosition = new THREE.Vector3();
  private readonly playerVelocity = new THREE.Vector3();
  private readonly playerVelocityTarget = new THREE.Vector3();
  private readonly scratchVector = new THREE.Vector3();
  private readonly scratchVectorB = new THREE.Vector3();
  private readonly scratchVector2 = new THREE.Vector2();
  private readonly impactWaves = new Map<number, ImpactWave[]>();
  private theme: ThemeMode;
  private readonly hudSnapshot: GameHudSnapshot = {
    state: 'transition',
    playerMotionState: 'attached',
    score: 0,
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
      hasGrapple: false,
      grappleBlocked: false,
      hasSouffleur: false,
      hasSouffleurFuel: false
    },
    offers: [],
    branchHints: [],
    inventoryItems: [],
    landingFeedback: null,
    acquisition: null,
    gameOverCause: null,
    runSummary: {
      score: 0,
      bestScore: 0,
      shardsLanded: 0,
      distanceMeters: 0,
      coinsCollected: 0,
      enemiesKilled: 0,
      longestMomentumSeconds: 0,
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
    decayRate: 0.12,
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
  private lastLandingDirection: -1 | 1 | 0 = 0;
  private choiceMode: ChoiceMode = 'none';
  private activeChoices: BranchChoice[] = [];
  private activeShopAngles: number[] = [];
  private acquisition: AcquisitionFeedback | null = null;
  private landingFeedback: LandingFeedback | null = null;
  private acquisitionStartedAt = 0;
  private acquisitionDuration = 0.9;
  private landingFeedbackStartedAt = 0;
  private landingFeedbackDuration = 1.35;
  private landingFeedbackNodeIndex: number | null = null;
  private lastLandingFeedbackTriggerNodeIndex: number | null = null;
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
  private wrapperPendingTarget: number | null = null;
  private wrapperTeleportAt = 0;
  private wrapperHoldUntil = 0;
  private wrapperVisualUntil = 0;
  private wrapperCooldownPending = false;
  private shieldHitUntil = 0;
  private shieldRechargeFlashUntil = 0;
  private readonly moduleFlashUntil: Partial<Record<RogueliteModuleSlot, number>> = {};
  private bigCanonFireUntil = 0;
  private frontCanonFireUntil = 0;
  private grapState: 'idle' | 'launch' | 'hooked' | 'landing' = 'idle';
  private grapStateUntil = 0;
  private grapTargetIndex: number | null = null;
  private grapRopeLength = 0;
  private readonly grapTargetPosition = new THREE.Vector3();
  private grapCooldownPending = false;
  private eventCooldownUntil = 0;
  private milestoneChoiceCache = new Map<number, BranchChoice[]>();
  private airborneFromMilestone = false;
  private airborneStartedAt = 0;
  private momentumLossActive = false;

  constructor(scene: THREE.Scene, theme: ThemeMode) {
    this.theme = theme;
    this.shardHudCanvas.width = 256;
    this.shardHudCanvas.height = 256;
    this.shardHudTexture = new THREE.CanvasTexture(this.shardHudCanvas);
    this.shardHudTexture.colorSpace = THREE.SRGBColorSpace;
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
    this.bigCanonRangeIndicator = this.createRangeIndicator(BIG_CANON_RADIUS_URL, 0.1);
    this.grapRangeIndicator = new THREE.Mesh(
      new THREE.CircleGeometry(0.5, 28, -Math.PI / 8, Math.PI / 4),
      new THREE.MeshBasicMaterial({
        color: this.getRarityColor('common'),
        transparent: true,
        opacity: 0.16,
        side: THREE.DoubleSide,
        depthWrite: false,
        depthTest: false
      })
    );
    this.grapRangeIndicator.visible = false;
    this.grapRangeIndicator.renderOrder = 28;
    this.milestonePlayerIndicator = new THREE.Mesh(
      new THREE.ConeGeometry(1.0, 1.95, 3),
      new THREE.MeshBasicMaterial({
        color: theme === 'dark' ? '#A5977F' : '#2E3644',
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
      new THREE.MeshBasicMaterial({ color: '#A5977F', transparent: true, opacity: 0.4, depthWrite: false, depthTest: false })
    );
    this.frontCanonLaser.visible = false;
    this.frontCanonLaser.renderOrder = 26;
    this.frontCanonProjectile = this.createBillboardPlane(FRONT_CANON_PROJECTILE_URL, 1.6, 0.28, 28);
    this.bigCanonProjectile = this.createBillboardPlane(BIG_CANON_PROJECTILE_URL, 1.9, 0.34, 28);
    this.grapRope = new THREE.Mesh(
      new THREE.PlaneGeometry(0.03, 1),
      new THREE.MeshBasicMaterial({
        color: '#A5977F',
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide
      })
    );
    this.grapRope.visible = false;
    this.grapRope.renderOrder = 27;
    this.root.add(
      this.rewardHeaderBillboard.sprite,
      ...this.rewardCardBillboards.map((billboard) => billboard.sprite),
      this.magnetRangeIndicator,
      this.bigCanonRangeIndicator,
      this.grapRangeIndicator,
      this.milestonePlayerIndicator,
      this.frontCanonLaser,
      this.frontCanonProjectile,
      this.bigCanonProjectile,
      this.grapRope
    );

    const trailGeometry = new THREE.BufferGeometry();
    trailGeometry.setAttribute('position', new THREE.BufferAttribute(this.trailBuffer, 3));
    this.playerTrail = new THREE.Line(
      trailGeometry,
      new THREE.LineBasicMaterial({
        color: theme === 'dark' ? '#A5977F' : '#2E3644',
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

  private createRangeIndicator(textureUrl: string, opacity: number) {
    const texture = new THREE.TextureLoader().load(textureUrl);
    texture.colorSpace = THREE.SRGBColorSpace;
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        map: texture,
        color: '#ffffff',
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

  private createBillboardPlane(textureUrl: string, width: number, height: number, renderOrder: number) {
    const texture = new THREE.TextureLoader().load(textureUrl);
    texture.colorSpace = THREE.SRGBColorSpace;
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, depthTest: false })
    );
    mesh.visible = false;
    mesh.renderOrder = renderOrder;
    return mesh;
  }

  setTheme(theme: ThemeMode) {
    this.theme = theme;
    this.playerTrail.material.color.set(theme === 'dark' ? '#A5977F' : '#2E3644');
    this.coins.setTheme(theme);
    this.enemies.setTheme(theme);
    this.shop.setTheme(theme);
    const uiColor = theme === 'dark' ? '#A5977F' : '#2E3644';
    this.grapRope.material.color.set(uiColor);
    this.frontCanonLaser.material.color.set(uiColor);
    this.milestonePlayerIndicator.material.color.set(uiColor);
    this.bigCanonRangeIndicator.material.color.set('#ffffff');
    this.rewardBillboardSignature = '';
  }

  setLocale(locale: 'fr' | 'en') {
    if (this.locale === locale) {
      return;
    }
    this.locale = locale;
    this.rewardBillboardSignature = '';
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
    const node = this.getPortalPreviewNode();
    this.angularSpeed = (Math.PI * 2) / Math.max(1.6, node.gameplayOrbitPeriod);
    const orbit = this.getOrbitSample(node, this.orbitAngle);
    this.playerPosition.copy(this.getPlayerOrbitWorldPosition(node, this.orbitAngle, orbit));
    this.playerVelocity.set(0, 0, 0);
    this.root.visible = true;
    this.player.visible = true;
    this.playerTrail.visible = true;
    this.shardHudSprite.visible = false;
    this.frontCanonLaser.visible = false;
    this.frontCanonProjectile.visible = false;
    this.bigCanonProjectile.visible = false;
    this.grapRope.visible = false;
    this.coins.reset();
    this.enemies.reset();
    this.shop.reset();
    this.coins.setVisible(false);
    this.enemies.setVisible(false);
    this.camera.reset(node);
    this.trailPoints.forEach((point) => point.copy(this.playerPosition));
    this.updateTrail(0);
    this.transitionProgress = 0;
  }

  startTransition() {
    const preservePortalPreviewBoat = this.state === 'portal_preview';
    const previewPosition = this.player.position.clone();
    const previewRotation = this.player.rotation.clone();
    const previewScale = this.player.scale.clone();
    this.resetRunState();
    this.path.reset();
    this.path.prebuild(180);
    this.camera.reset(this.getResolvedNode(0));
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
      this.path.prebuild(180);
    }
    this.syncPathEventBiases();
    this.root.visible = true;
    this.player.visible = true;
    this.playerTrail.visible = true;
    this.attachToNode(0, false, null, null);
    this.camera.reset(this.getResolvedNode(0));
    this.awaitingFirstJump = true;
    this.state = 'running_attached';
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
    this.airborneFromMilestone = false;
    this.airborneStartedAt = 0;
    this.shop.reset();
    this.coins.reset();
    this.enemies.reset();
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
    this.coins.reset();
    this.enemies.reset();
    this.camera.reset(this.getResolvedNode(0));
  }

  getPortalPreviewLayout() {
    const node = this.getPortalPreviewNode();
    return {
      position: new THREE.Vector3(node.resolvedX, node.resolvedY, node.resolvedZ),
      visual: this.buildPortalPreviewVisual(node)
    };
  }

  resetRunState() {
    this.stats.reset(performance.now());
    this.score = 0;
    this.awaitingFirstJump = false;
    this.chargeActive = false;
    this.upActionActive = false;
    this.chargeMeter = 0;
    this.choiceMode = 'none';
    this.activeChoices = [];
    this.activeShopAngles = [];
    this.acquisition = null;
    this.landingFeedback = null;
    this.acquisitionStartedAt = 0;
    this.landingFeedbackStartedAt = 0;
    this.landingFeedbackNodeIndex = null;
    this.lastLandingFeedbackTriggerNodeIndex = null;
    this.gameOverStartedAt = 0;
    this.gameOverCause = null;
    this.jumpVisualUntil = 0;
    this.landingVisualUntil = 0;
    this.currentTime = 0;
    this.attachedIndex = 0;
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
    this.playerPosition.set(0, 0, 0);
    this.playerVelocity.set(0, 0, 0);
    this.playerVelocityTarget.set(0, 0, 0);
    this.runUpgrades = createRunUpgradeState();
    this.remainingExtraJumps = 0;
    this.phaseJumpReadyAt = 0;
    this.teleportReadyAt = 0;
    this.warpReadyAt = 0;
    this.shieldCharges = 0;
    this.souffleurActive = false;
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
    this.bigCanonFireUntil = 0;
    this.frontCanonFireUntil = 0;
    this.grapState = 'idle';
    this.grapStateUntil = 0;
    this.grapTargetIndex = null;
    this.grapRopeLength = 0;
    this.grapCooldownPending = false;
    this.eventCooldownUntil = 0;
    this.milestoneChoiceCache.clear();
    this.airborneFromMilestone = false;
    this.airborneStartedAt = 0;
    this.momentumLossActive = false;
    this.momentum.gauge = 0;
    this.momentum.fillRate = 0;
    this.momentum.decayRate = 0.12;
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
    this.grapRangeIndicator.visible = false;
    this.milestonePlayerIndicator.visible = false;
    this.frontCanonLaser.visible = false;
    this.frontCanonProjectile.visible = false;
    this.bigCanonProjectile.visible = false;
    this.grapRope.visible = false;
    this.coins.reset();
    this.enemies.reset();
    this.shop.reset();
  }

  private syncPathEventBiases() {
    this.path.setEventBiases(this.runUpgrades.modifiers.rewardChance, this.runUpgrades.modifiers.shopChance);
  }

  getInitialPlatformPositions(count: number) {
    this.path.prebuild(Math.max(160, count + 60));
    return this.path.getInitialNodes(count).map((node) => new THREE.Vector3(node.x, node.y, node.z));
  }

  getInitialPlatformScales(count: number) {
    this.path.prebuild(Math.max(160, count + 60));
    return this.path.getInitialNodes(count).map((node) => node.visualScale);
  }

  getInitialPlatformVisuals(count: number): VisiblePlatformVisual[] {
    this.path.prebuild(Math.max(160, count + 60));
    this.initializeDisplayWindow(count);
    return this.getVisiblePlatformVisuals(count);
  }

  getVisiblePlatformPositions(count: number) {
    return this.getDisplayNodes(count).map((node) => new THREE.Vector3(node.resolvedX, node.resolvedY, node.resolvedZ));
  }

  getVisiblePlatformScales(count: number) {
    return this.getDisplayNodes(count).map((node) => node.visualScale);
  }

  getVisiblePlatformVisuals(count: number): VisiblePlatformVisual[] {
    const displayNodes = this.getDisplayNodes(count);
    return displayNodes.map((node) => this.buildVisiblePlatformVisual(node, node.index === this.attachedIndex && this.playerState !== 'airborne'));
  }

  getRecommendedVisibleCount() {
    const baseCount = this.state === 'transition_in' ? 72 : 64;
    const momentumBonus = Math.round(this.momentum.cameraZoomMultiplier * 18 + this.runUpgrades.modifiers.cameraBaseZoomBonus * 4);
    const choiceBonus = this.choiceMode === 'reward_branch' ? 12 : this.choiceMode === 'shop_orbit' ? 8 : 0;
    const current = this.path.getNode(this.attachedIndex);
    const next = this.path.getNode(this.attachedIndex + 1);
    const visibilityBonus = current?.isGigantic || next?.isGigantic ? 18 : current?.eventType !== 'none' || next?.eventType !== 'none' ? 10 : 0;
    return Math.max(56, Math.min(124, baseCount + momentumBonus + choiceBonus + visibilityBonus));
  }

  private buildVisiblePlatformVisual(node: ResolvedGamePathNode, isCurrent: boolean): VisiblePlatformVisual {
    const localAngle = wrapAngle(this.orbitAngle - (node.shapeKind === 'round' ? 0 : node.resolvedSpinPhase));
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
    const isQuestionShard = node.eventType === 'shop' || node.eventType === 'gift' || node.eventType === 'rare_item';
    const maskedByMilestone = false;
    const stripeMix = clamp((node.isMilestone ? 0.08 : 0.12) + fragmentAmount * 0.18 + (isCurrent ? orbitRamp * 0.1 : 0), 0, 0.42);
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
      tint:
        node.colorHint === 'danger'
          ? DANGER_ACCENT
          : node.eventType === 'shop' || node.colorHint === 'reward' || node.eventType === 'gift' || node.eventType === 'rare_item'
            ? this.getThemeShardColor()
            : null,
      ringTint: null,
      ringScale: 0,
      stripeTint: this.getThemeContrastColor(),
      stripeMix,
      stripePhase,
      pulse:
        node.isMilestone
          ? 0.18
          : isQuestionShard
            ? 0.48
            : node.colorHint === 'reward'
              ? 0.68
              : node.eventType !== 'none'
                ? 0.34
                : clamp(this.momentum.gauge * 0.22, 0, 0.22),
      deformAngle: isCurrent ? localAngle : visualWave?.angle ?? 0,
      deformStrength: isCurrent ? activeStrength : Math.max(passiveStrength, visualWave?.strength ?? 0) + (node.isMilestone ? 0 : fragmentAmount * 0.16),
      deformDensity: liveDensity,
      fragmentAmount,
      iconSrc:
        node.colorHint === 'reward' && rewardItem
          ? rewardItem.hudIconSrc
          : isQuestionShard
            ? HELP_ICON_ASSETS[this.theme]
            : null,
      iconText: null,
      iconTint: null,
      iconScale:
        node.colorHint === 'reward' && rewardItem
          ? clamp(1.76 + Math.max(node.gameplayRadius, node.visualScale) * 0.36, 2.36, 4.2)
          : isQuestionShard
            ? 2.28
            : 0.34
    };
  }

  setChargeActive(active: boolean) {
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
      this.chargeActive = false;
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

  setUpActionActive(active: boolean) {
    this.upActionActive = active;
  }

  triggerJump() {
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
      this.chargeActive = false;
      return false;
    }
    if (this.playerState === 'attached' || this.playerState === 'charging') {
      this.chargeActive = false;
      return this.launch();
    }
    return this.performAirAction();
  }

  triggerUpAction() {
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
    if (this.grapTargetIndex !== null && (this.grapState === 'launch' || this.grapState === 'hooked')) {
      this.releaseGrapple();
      return true;
    }
    if (this.tryActivateGrappleFromCurrentState()) {
      return true;
    }
    return this.triggerJump();
  }

  triggerMobileGrappleAction() {
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
    if (this.grapTargetIndex !== null && (this.grapState === 'launch' || this.grapState === 'hooked')) {
      this.releaseGrapple();
      return true;
    }
    return this.tryActivateGrappleFromCurrentState();
  }

  triggerMobileAirborneChargeAction() {
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

  selectUpgradeFallback(index: number) {
    if (this.state !== 'upgrade_branching') return false;

    if (this.choiceMode === 'shop_orbit') {
      const offer = this.activeChoices[index];
      if (!offer || offer.price === undefined) return false;
      if (!this.stats.spendCoins(offer.price)) return false;
      this.applyOffer(offer.offer, 'Shop item');
      this.shop.reset();
      this.choiceMode = 'none';
      this.activeChoices = [];
      this.activeShopAngles = [];
      this.state = 'upgrade_acquired';
      this.eventCooldownUntil = this.currentTime + 0.6;
      return true;
    }

    if (this.choiceMode !== 'reward_branch') return false;
    return this.commitRewardBranch(index, true);
  }

  closeShopChoice() {
    if (this.choiceMode !== 'shop_orbit' || this.state !== 'upgrade_branching') return false;
    this.shop.reset();
    this.choiceMode = 'none';
    this.activeChoices = [];
    this.activeShopAngles = [];
    this.state = this.playerState === 'airborne' ? 'running_airborne' : this.chargeActive ? 'running_charging' : 'running_attached';
    this.eventCooldownUntil = this.currentTime + 0.18;
    return true;
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
              : false,
        chargeCurrent: runtime?.chargesCurrent ?? 0,
        chargeMax: runtime?.chargesMax ?? 0,
        resourceRatio: runtime && runtime.gaugeMax > 0 ? runtime.gaugeCurrent / runtime.gaugeMax : 0,
        slot: item?.slot ?? null
      };
    });
    this.hudSnapshot.landingFeedback = this.landingFeedback;
    this.hudSnapshot.acquisition = this.acquisition;
    this.hudSnapshot.gameOverCause = this.gameOverCause;
    const statsSnapshot = this.stats.getSnapshot();
    this.hudSnapshot.runSummary = {
      score: statsSnapshot.score,
      bestScore: statsSnapshot.bestScore,
      shardsLanded: statsSnapshot.shardsLanded,
      distanceMeters: statsSnapshot.distanceMeters,
      coinsCollected: statsSnapshot.coinsCollected,
      enemiesKilled: statsSnapshot.enemiesKilled,
      longestMomentumSeconds: statsSnapshot.longestMomentumSeconds,
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

  private emitAudioEvent(event: GameAudioEvent) {
    this.audioListeners.forEach((listener) => listener(event));
  }

  private getMobileHudState() {
    const airborneChargeCount = this.getRemainingAirborneChargeCount();
    const souffleurRuntime = this.getModuleRuntime('souffleur');
    return {
      airborneChargeCount,
      airborneChargeDisplayCount: this.runUpgrades.modifiers.infiniteFlaps ? 5 : Math.max(0, Math.min(5, airborneChargeCount)),
      hasGrapple: Boolean(this.getEquippedItem('grappin')),
      grappleBlocked: Boolean(this.getEquippedItem('grappin')) && !this.isGrappleAvailable(),
      hasSouffleur: Boolean(this.getEquippedItem('souffleur')),
      hasSouffleurFuel: Boolean((souffleurRuntime?.gaugeCurrent ?? 0) > 0.001)
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
    return this.grapState !== 'idle' || this.grapTargetIndex !== null || this.grapCooldownPending;
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
    return Math.min(1, runtime.cooldownRemaining / cooldownDuration);
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
    if (!item || !runtime || !config || runtime.gaugeMax <= 0 || runtime.gaugeCurrent <= 0) {
      return false;
    }
    const consumed = Math.min(runtime.gaugeCurrent, burnPerSecond * deltaTime);
    runtime.gaugeCurrent = Math.max(0, runtime.gaugeCurrent - consumed);
    runtime.regenDelayRemaining = runtime.gaugeCurrent <= 0.0001 ? config.emptyDelay : config.regenDelay;
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

  update(deltaTime: number, elapsedTime: number) {
    if (this.state === 'idle') return;
    this.currentTime = elapsedTime;
    const shopLocked = this.isShopInteractionLocked() && this.playerState !== 'airborne';
    const simulationDelta = deltaTime;

    if (this.state === 'portal_preview') {
      this.hideWorldRewardBranchHud();
      this.updatePortalPreview(deltaTime, elapsedTime);
      return;
    }

    if (this.state === 'transition_in' || this.state === 'transition_out') {
      this.hideWorldRewardBranchHud();
      this.tickModuleRuntime(deltaTime);
      this.updateMomentum(deltaTime);
    if (this.state === 'transition_in' && this.player.visible) {
      const node = this.getResolvedNode(0);
      const orbit = this.getOrbitSample(node, this.orbitAngle);
      const targetPosition = this.getPlayerOrbitWorldPosition(node, this.orbitAngle, orbit);
      const targetTravel = orbit.tangent.clone().multiplyScalar(this.orbitDirection).normalize();
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
      return;
    }

    this.path.ensureAhead(this.attachedIndex);
    this.tickModuleRuntime(simulationDelta);
    this.updateMomentum(simulationDelta);
    this.stats.updateMomentumWindow(this.currentTime, !shopLocked && this.state !== 'game_over' && this.momentum.gauge > 0.08);
    this.prewarmUpcomingMilestones();

    let currentNode = this.getResolvedNode(this.attachedIndex);
    let nextNode = this.getResolvedNode(this.attachedIndex + 1);

    if (this.state === 'game_over') {
      this.updateCamera(deltaTime, currentNode, nextNode);
      this.updateTrail(deltaTime);
      this.syncPlayerVisual(elapsedTime, deltaTime);
      this.syncShardHud(currentNode);
      this.syncWorldRewardBranchHud(currentNode);
      this.syncMarkers(elapsedTime);
      return;
    }

    const motionStartIndex = this.attachedIndex;

    if (shopLocked) {
      this.chargeActive = false;
      this.souffleurActive = false;
      this.updateAttached(deltaTime, currentNode);
    } else if (this.playerState === 'airborne') {
      this.updateAirborne(deltaTime);
    } else {
      this.updateAttached(deltaTime, currentNode);
    }

    if (this.attachedIndex !== motionStartIndex || this.playerState !== 'airborne') {
      currentNode = this.getResolvedNode(this.attachedIndex);
      nextNode = this.getResolvedNode(this.attachedIndex + 1);
    }

    this.advanceDisplayAnchor();

    this.updateEvents(deltaTime, elapsedTime, currentNode);
    this.updateCamera(deltaTime, currentNode, nextNode);
    this.updateTrail(deltaTime);
    this.syncPlayerVisual(elapsedTime, deltaTime);
    this.syncShardHud(currentNode);
    this.syncWorldRewardBranchHud(currentNode);
    this.syncMarkers(elapsedTime);

    if (currentNode.isMilestone && this.playerState !== 'airborne') {
      return;
    }

    if (this.isOutsidePlayableField(this.playerPosition)) {
      this.failRun('out_of_bounds');
    } else if (this.camera.isBehindSafeLine(this.playerPosition)) {
      this.failRun('camera');
    }

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

    this.updateWrapperSequence();
  }

  private getHudStateValue(): GameHudState {
    if (this.state === 'game_over') return 'game_over';
    if (this.state === 'portal_preview' || this.state === 'transition_in' || this.state === 'transition_out') return 'transition';
    if (this.state === 'upgrade_branching') return 'upgrade_choice';
    return 'running';
  }

  private updatePortalPreview(deltaTime: number, elapsedTime: number) {
    const currentNode = this.getPortalPreviewNode();
    const orbit = this.getOrbitSample(currentNode, this.orbitAngle);
    const orbitRadius = Math.max(1, orbit.position.length());
    const baselineAngular = (Math.PI * 2) / Math.max(1.6, currentNode.gameplayOrbitPeriod);
    this.angularSpeed = damp(this.angularSpeed, baselineAngular * 0.94, 1.8, deltaTime);
    this.orbitAngle = wrapAngle(this.orbitAngle + this.orbitDirection * this.angularSpeed * deltaTime);

    const liveOrbit = this.getOrbitSample(currentNode, this.orbitAngle);
    this.playerPosition.copy(this.getPlayerOrbitWorldPosition(currentNode, this.orbitAngle, liveOrbit));
    this.playerVelocity.set(
      liveOrbit.tangent.x * orbitRadius * this.angularSpeed * this.orbitDirection,
      liveOrbit.tangent.y * orbitRadius * this.angularSpeed * this.orbitDirection,
      0
    );

    this.shardHudSprite.visible = false;
    this.magnetRangeIndicator.visible = false;
    this.bigCanonRangeIndicator.visible = false;
    this.grapRangeIndicator.visible = false;
    this.frontCanonLaser.visible = false;
    this.frontCanonProjectile.visible = false;
    this.bigCanonProjectile.visible = false;
    this.grapRope.visible = false;
    this.coins.setVisible(false);
    this.enemies.setVisible(false);
    this.updateTrail(deltaTime);
    this.syncPlayerVisual(elapsedTime, deltaTime);
  }

  private getPortalPreviewNode(): ResolvedGamePathNode {
    const node = createMiniGamePortalNode();
    node.resolvedSpinPhase = this.currentTime * node.spinSpeed;
    return node;
  }

  private buildPortalPreviewVisual(node: ResolvedGamePathNode): VisiblePlatformVisual {
    const pulse = 0.14 + Math.sin(this.currentTime * 1.8) * 0.04;
    return {
      scale: new THREE.Vector3(node.visualScale, node.visualScale, node.visualScale),
      shapeKind: node.shapeKind,
      spinDirection: node.spinDirection,
      spinSpeed: node.spinSpeed,
      spinPhase: node.resolvedSpinPhase,
      tint: null,
      ringTint: null,
      ringScale: 0,
      stripeTint: this.getThemeContrastColor(),
      stripeMix: 0.16,
      stripePhase: this.currentTime * 1.92,
      pulse,
      deformAngle: this.orbitAngle,
      deformStrength: 0.16 + pulse * 0.6,
      deformDensity: 0.74,
      fragmentAmount: 0.14,
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
      const target = this.wrapperPendingTarget;
      this.wrapperPendingTarget = null;
      this.attachToNode(target, false, null, null);
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
    return this.path.getResolvedNode(Math.max(0, index), this.currentTime, this.attachedIndex);
  }

  private getDisplayNodes(count: number) {
    if (this.choiceMode === 'reward_branch' && this.activeChoices.length > 0) {
      this.initializeDisplayWindow(count);
      const milestoneNode = this.getResolvedNode(this.attachedIndex);
      const rewardNodes = this.activeChoices.map((choice) => resolveRuntimeNode(choice.entry, this.currentTime, this.attachedIndex));
      const reservedStart = milestoneNode.resolvedX - DEFAULT_COLUMN_DISTANCE * 3;
      const reservedEnd = Math.max(...rewardNodes.map((node) => node.resolvedX), milestoneNode.resolvedX) + DEFAULT_COLUMN_DISTANCE;
      const nodes = this.displayWindowIndices
        .map((index) => this.getResolvedNode(index))
        .filter((node) => {
          if (node.index === milestoneNode.index) {
            return true;
          }
          if (node.resolvedX >= reservedStart && node.resolvedX <= reservedEnd) {
            return false;
          }
          return !rewardNodes.some((rewardNode) => this.doNodesOverlapForDisplay(node, rewardNode));
        });
      nodes.push(milestoneNode, ...rewardNodes);
      nodes.sort((a, b) => a.resolvedX - b.resolvedX);
      const deduped: ResolvedGamePathNode[] = [];
      const seen = new Set<string>();
      nodes.forEach((node) => {
        const key = `${node.index}:${Math.round(node.resolvedX * 100)}:${Math.round(node.resolvedY * 100)}`;
        if (seen.has(key)) return;
        seen.add(key);
        deduped.push(node);
      });
      const fillerBase = deduped[deduped.length - 1] ?? milestoneNode;
      while (deduped.length < count) {
        deduped.push({
          ...fillerBase,
          resolvedX: fillerBase.resolvedX + 320 + deduped.length * 6,
          resolvedY: fillerBase.resolvedY + 180,
          resolvedZ: fillerBase.resolvedZ,
          visualScale: 0.0001,
          gameplayRadius: 0.0001,
          shapeKind: 'round',
          colorHint: 'none',
          eventType: 'none',
          isMilestone: false,
          isGigantic: false,
          coinSlots: [],
          enemySlot: null,
          resolvedSpinPhase: 0,
          spinSpeed: 0,
          visualStretch: { x: 1, y: 1, z: 1 }
        });
      }
      return deduped.slice(0, count);
    }

    this.initializeDisplayWindow(count);
    return this.displayWindowIndices.slice(0, count).map((index) => this.getResolvedNode(index));
  }

  private advanceDisplayAnchor() {
    if (this.displayWindowIndices.length === 0) return;
    if (this.airborneFromMilestone && this.playerState === 'airborne') {
      return;
    }

    for (let slot = 0; slot < this.displayWindowIndices.length; slot += 1) {
      const nodeIndex = this.displayWindowIndices[slot]!;
      const node = this.getResolvedNode(nodeIndex);
      const fullyPastLeftEdge = node.resolvedX + this.getPhysicalRadius(node) + 5.5 < this.camera.getSafeLeft();
      if (!fullyPastLeftEdge) {
        continue;
      }

      this.path.ensureAhead(this.displayNextIndex + 1);
      const replacementIndex = this.findReplacementDisplayNode(slot);
      if (replacementIndex === null) {
        continue;
      }
      this.displayWindowIndices[slot] = replacementIndex;
      this.displayNextIndex = Math.max(this.displayNextIndex, replacementIndex + 1);
    }
  }

  private initializeDisplayWindow(count: number) {
    if (this.displayWindowIndices.length === 0) {
      this.path.ensureAhead(count + 1);
      this.displayWindowIndices = Array.from({ length: count }, (_, index) => index);
      this.displayNextIndex = count;
      return;
    }

    if (this.displayWindowIndices.length < count) {
      this.path.ensureAhead(count + 1);
      while (this.displayWindowIndices.length < count) {
        this.displayWindowIndices.push(this.displayNextIndex);
        this.displayNextIndex += 1;
      }
    }
  }

  private rebuildDisplayWindowAroundCurrent() {
    const count = Math.max(this.displayWindowIndices.length || 0, this.getRecommendedVisibleCount());
    this.path.ensureAhead(this.attachedIndex + count + 8);
    this.displayWindowIndices = Array.from({ length: count }, (_, offset) => this.attachedIndex + offset);
    this.displayNextIndex = this.attachedIndex + count;
  }

  private findReplacementDisplayNode(excludeSlot: number) {
    for (let candidateIndex = this.displayNextIndex; candidateIndex < this.displayNextIndex + 24; candidateIndex += 1) {
      const replacement = this.getResolvedNode(candidateIndex);
      const spawnsOffscreenRight = replacement.resolvedX - this.getPhysicalRadius(replacement) > this.camera.getSafeRight() + 2.8;
      if (!spawnsOffscreenRight) {
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
    const normalizedGauge = this.getNormalizedMomentumGauge();
    const decayModifier = 1 - Math.min(0.72, this.runUpgrades.modifiers.momentumRetention);
    const decay = this.momentum.decayRate * decayModifier;
    const previousGauge = this.momentum.gauge;
    const airborneGraceActive =
      this.playerState === 'airborne' &&
      this.airborneStartedAt > 0 &&
      this.currentTime - this.airborneStartedAt < 3;
    if (!(this.orbitGraceActive && this.playerState !== 'airborne') && !airborneGraceActive) {
      this.momentum.gauge = clamp(this.momentum.gauge - decay * deltaTime, 0, 1);
    }
    const losingMomentum = this.momentum.gauge < previousGauge - 0.002 && previousGauge > 0.08;
    if (losingMomentum && !this.momentumLossActive) {
      this.emitAudioEvent({ type: 'momentum_loss_start' });
    }
    this.momentumLossActive = losingMomentum;

    const speedTarget = 1 + normalizedGauge * 0.6 + this.runUpgrades.modifiers.speedBonus;
    const jumpTarget = 1 + normalizedGauge * 0.48 + this.runUpgrades.modifiers.chargedLeapBonus * 0.12;
    const cameraZoomTarget =
      normalizedGauge < 0.5
        ? normalizedGauge * 1.02
        : 0.51 + Math.pow((normalizedGauge - 0.5) / 0.5, 1.08) * 1.42;
    const spyglassMomentumBoost = this.runUpgrades.modifiers.cameraMomentumZoomBonus * (0.24 + normalizedGauge * 0.76);

    this.momentum.speedMultiplier = damp(this.momentum.speedMultiplier, speedTarget, 2.4, deltaTime);
    this.momentum.jumpMultiplier = damp(this.momentum.jumpMultiplier, jumpTarget, 2.6, deltaTime);
    this.momentum.cameraZoomMultiplier = damp(this.momentum.cameraZoomMultiplier, cameraZoomTarget + spyglassMomentumBoost, 2.2, deltaTime);
    this.momentum.fillRate = damp(this.momentum.fillRate, 0, 4.6, deltaTime);
  }

  private getNormalizedMomentumGauge() {
    return clamp(this.momentum.gauge / Math.max(1, this.runUpgrades.modifiers.momentumCap), 0, 1);
  }

  private updateAttached(deltaTime: number, currentNode: ResolvedGamePathNode) {
    const orbit = this.getOrbitSample(currentNode, this.orbitAngle);
    const orbitRadius = Math.max(1, orbit.position.length());
    const baselineAngular = (Math.PI * 2) / Math.max(1.6, currentNode.gameplayOrbitPeriod);
    const chargeBoost = this.chargeActive ? 0.55 + this.chargeMeter * 0.45 : 0;
    const usingSouffleurAttached =
      this.chargeActive &&
      Boolean(this.getEquippedItem('souffleur')) &&
      this.consumeModuleGauge('souffleur', deltaTime, 0.28);
    this.souffleurActive = usingSouffleurAttached;
    const souffleurAttachedBoost = usingSouffleurAttached ? 0.24 + this.runUpgrades.modifiers.souffleurBoost * 0.08 : 0;
    const targetAngular =
      baselineAngular *
      (1 + chargeBoost + souffleurAttachedBoost + this.momentum.gauge * 0.42) *
      this.momentum.speedMultiplier *
      (1 + this.runUpgrades.modifiers.chargeRate * 0.06 + this.runUpgrades.modifiers.speedBonus * 0.3);

    const milestoneSlowdown = currentNode.isGigantic ? 0.58 : 1;

    this.angularSpeed = damp(this.angularSpeed, targetAngular * milestoneSlowdown, this.chargeActive ? 2.6 : 1.7, deltaTime);
    this.orbitAngle = wrapAngle(this.orbitAngle + this.orbitDirection * this.angularSpeed * deltaTime);

    const liveOrbit = this.getOrbitSample(currentNode, this.orbitAngle);
    this.playerPosition.copy(this.getPlayerOrbitWorldPosition(currentNode, this.orbitAngle, liveOrbit));
    this.playerVelocity.set(
      liveOrbit.tangent.x * orbitRadius * this.angularSpeed * this.orbitDirection,
      liveOrbit.tangent.y * orbitRadius * this.angularSpeed * this.orbitDirection,
      0
    );

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
    this.resolveEnemyContact(currentNode);

    if (!this.isShopInteractionLocked()) {
      void this.tryActivateWrapper(false);
    }
  }

  private updateAirborne(deltaTime: number) {
    const previousPosition = this.scratchVector.set(this.playerPosition.x, this.playerPosition.y, this.playerPosition.z);
    const gravityScale = clamp(1 - this.runUpgrades.modifiers.planeGlide * 0.92, 0.12, 1);
    this.playerVelocity.y -= 6.8 * gravityScale * deltaTime;
    this.playerVelocity.x += (this.runUpgrades.modifiers.airControl + this.runUpgrades.modifiers.planeStability * 0.7) * deltaTime * 0.52;

    const usingSouffleur =
      this.chargeActive &&
      Boolean(this.getEquippedItem('souffleur')) &&
      this.consumeModuleGauge('souffleur', deltaTime, 0.42);
    this.souffleurActive = usingSouffleur;
    if (this.runUpgrades.modifiers.gravityCentering > 0 && Math.abs(this.playerPosition.y) > 2.8) {
      this.playerVelocity.y += -this.playerPosition.y * (0.12 + this.runUpgrades.modifiers.gravityCentering * 0.08) * deltaTime;
    }
    if (usingSouffleur) {
      const heading = this.scratchVectorB.set(this.playerVelocity.x || 0.001, this.playerVelocity.y || 0.001, 0).normalize();
      this.playerVelocity.addScaledVector(heading, (0.9 + this.runUpgrades.modifiers.souffleurBoost) * deltaTime);
      this.triggerModuleFlash('souffleur', 0.12);
    }

    void this.tryActivateWrapper(false);

    if (this.grapTargetIndex !== null) {
      const grapNode = this.getResolvedNode(this.grapTargetIndex);
      this.grapTargetPosition.set(grapNode.resolvedX, grapNode.resolvedY, grapNode.resolvedZ);
      const pull = this.scratchVectorB.copy(this.grapTargetPosition).sub(this.playerPosition);
      const distance = Math.max(0.001, pull.length());
      pull.normalize();
      if (this.currentTime >= this.grapStateUntil && this.grapState === 'launch') {
        this.grapState = 'hooked';
        this.grapRopeLength = Math.max(1.45, distance);
        this.emitAudioEvent({ type: 'grapple_hit' });
      }
      if (this.grapState === 'launch') {
        this.playerVelocity.addScaledVector(pull, Math.min(8.6, 4.2 + distance * 0.2) * deltaTime);
      } else {
        const retractRate = (this.upActionActive ? 10.2 : 6.8) + this.momentum.gauge * 3.2;
        const contactLength = Math.max(0.78, grapNode.gameplayRadius * 0.56);
        this.grapRopeLength = Math.max(contactLength, this.grapRopeLength - retractRate * deltaTime);
        this.playerVelocity.addScaledVector(pull, Math.min(14.8, 8.2 + distance * 0.68) * deltaTime);
        if (this.chargeActive) {
          const grapChargeBoost = this.souffleurActive ? 1.84 + this.runUpgrades.modifiers.souffleurBoost * 0.34 : 0.96;
          this.playerVelocity.addScaledVector(pull, grapChargeBoost * deltaTime);
        }
        const radialSpeed = this.playerVelocity.dot(pull);
        if (radialSpeed > 0) {
          this.playerVelocity.addScaledVector(pull, -radialSpeed * 0.72);
        }
      }
    }

    this.playerPosition.addScaledVector(this.playerVelocity, deltaTime);
    this.applyGrappleConstraint();
    this.collectCoinsNearPlayer();

    if (this.grapTargetIndex !== null) {
      const grappleNode = this.getResolvedNode(this.grapTargetIndex);
      if (this.canCaptureNode(grappleNode, previousPosition)) {
        const targetIndex = this.grapTargetIndex;
        this.beginGrappleLanding();
        this.attachToNode(targetIndex, true, this.playerPosition, this.playerVelocity);
        return;
      }
    }

    if (this.choiceMode === 'reward_branch' && this.activeChoices.length > 0) {
      for (let index = 0; index < this.activeChoices.length; index += 1) {
        const choice = this.activeChoices[index];
        if (!choice) continue;
        const entry = resolveRuntimeNode(choice.entry, this.currentTime, this.attachedIndex);
        if (this.canCaptureNode(entry, previousPosition)) {
          this.commitRewardBranch(index, false);
          this.attachToNode(this.attachedIndex + 1, true, this.playerPosition, this.playerVelocity);
          return;
        }
      }
    }

    const searchLimit = this.attachedIndex + Math.max(24, this.displayWindowIndices.length + 8);
    for (let index = this.attachedIndex + 1; index <= searchLimit; index += 1) {
      const node = this.getResolvedNode(index);
      if (node.resolvedX - previousPosition.x > 64) {
        break;
      }
      if (!node.isGigantic) {
        continue;
      }
      if (this.canCaptureNode(node, previousPosition)) {
        if (this.grapTargetIndex === index) {
          this.beginGrappleLanding();
        }
        this.attachToNode(index, true, this.playerPosition, this.playerVelocity);
        return;
      }
    }
    for (let index = this.attachedIndex + 1; index <= searchLimit; index += 1) {
      const node = this.getResolvedNode(index);
      if (node.resolvedX - previousPosition.x > 64) {
        break;
      }
      if (this.canCaptureNode(node, previousPosition)) {
        if (this.grapTargetIndex === index) {
          this.beginGrappleLanding();
        }
        this.attachToNode(index, true, this.playerPosition, this.playerVelocity);
        return;
      }
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
        this.attachToNode(rescueIndex, true, this.playerPosition, this.playerVelocity);
        return;
      }
    }

    if (this.teleportReadyAt <= this.currentTime && this.runUpgrades.modifiers.teleportRange > 0) {
      const teleportTarget = this.path.getTeleportTarget(this.attachedIndex, this.runUpgrades.modifiers.teleportRange);
      if (teleportTarget > this.attachedIndex + 1 && this.playerPosition.x < this.camera.getSafeLeft() + 2.4) {
        this.teleportReadyAt = this.currentTime + this.runUpgrades.modifiers.teleportCooldown;
        this.attachToNode(teleportTarget, false, null, null);
      }
    }

    if (this.warpReadyAt <= this.currentTime && this.runUpgrades.modifiers.warpRange > 0) {
      const warpTarget = this.path.getTeleportTarget(this.attachedIndex, this.runUpgrades.modifiers.warpRange);
      if (warpTarget > this.attachedIndex + 3 && this.playerPosition.x < this.camera.getSafeLeft() + 1.6) {
        this.warpReadyAt = this.currentTime + this.runUpgrades.modifiers.warpCooldown;
        this.attachToNode(warpTarget, false, null, null);
      }
    }

    const currentNode = this.getResolvedNode(this.attachedIndex);
    if (currentNode.isMilestone) {
      return;
    }

    if (this.isOutsidePlayableField(this.playerPosition)) {
      this.failRun('out_of_bounds');
      return;
    }

    if (this.camera.isBehindSafeLine(this.playerPosition)) {
      this.failRun('camera');
      return;
    }

    this.resolveAirborneEnemyContact();
  }

  private launch() {
    if (this.playerState !== 'attached' && this.playerState !== 'charging') return false;

    const currentNode = this.getResolvedNode(this.attachedIndex);
    const orbit = this.getOrbitSample(currentNode, this.orbitAngle);
    const tangent = this.scratchVector
      .set(orbit.tangent.x * this.orbitDirection, orbit.tangent.y * this.orbitDirection, 0)
      .normalize();
    const radial = this.scratchVectorB
      .set(orbit.position.x, orbit.position.y, 0)
      .normalize();
    const orbitSpeed = Math.max(1, orbit.position.length()) * this.angularSpeed;
    const launchSpeed =
      (orbitSpeed * 0.92 + 5.2 + this.chargeMeter * 8.5 * (1 + this.runUpgrades.modifiers.chargedLeapBonus)) *
      this.momentum.jumpMultiplier *
      this.runUpgrades.modifiers.jumpPower *
      (1 + this.runUpgrades.modifiers.speedBonus * 0.35);
    const maxBoost = this.chargeMeter >= 0.98;

    this.registerImpactWave(currentNode, this.orbitAngle, launchSpeed * 0.92);
    this.playerVelocity.copy(tangent.multiplyScalar(launchSpeed)).addScaledVector(radial, launchSpeed * 0.08);
    this.landingFeedbackAirborneSerial += 1;
    this.lastLandingFeedbackTriggerNodeIndex = null;
    this.awaitingFirstJump = false;
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

  private performAirAction() {
    if (this.playerState !== 'airborne') return false;
    if (this.tryUseAirborneModuleImpulse()) return true;

    if (this.tryActivateGrappin()) return true;
    if (this.tryActivateWrapper(false)) return true;

    return this.tryConsumeAirborneExtraJump();
  }

  private tryUseAirborneModuleImpulse() {
    const forward = this.scratchVector.set(
      Math.cos(this.player.rotation.z || 0),
      Math.sin(this.player.rotation.z || 0),
      0
    ).normalize();
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
    if (this.playerState !== 'airborne') {
      return false;
    }
    const candidate = this.findGrappleCandidate();
    if (!candidate) {
      return false;
    }
    return this.armGrapple(candidate.index, candidate.distance);
  }

  private tryActivateGrappin() {
    if (this.playerState !== 'airborne') {
      return false;
    }
    const candidate = this.findGrappleCandidate();
    if (!candidate) {
      return false;
    }
    return this.armGrapple(candidate.index, candidate.distance);
  }

  private findGrappleCandidate() {
    if (!this.isGrappleAvailable() || this.playerState !== 'airborne') {
      return null;
    }
    const headingVector = this.scratchVector2.set(this.playerVelocity.x || 0.001, this.playerVelocity.y || 0.001).normalize();
    const localUp = this.scratchVectorB.set(-headingVector.y, headingVector.x, 0);
    const grappleOriginX = this.playerPosition.x + headingVector.x * 0.85 - localUp.x * 0.72;
    const grappleOriginY = this.playerPosition.y + headingVector.y * 0.85 - localUp.y * 0.72;
    const grapRange = Math.max(4.6, this.runUpgrades.modifiers.grapRange);
    const grapConeHalfAngle = Math.PI / 8;
    const minReach = 2.8;
    for (let index = this.attachedIndex + 1; index <= this.attachedIndex + Math.ceil(grapRange * 2.8); index += 1) {
      const node = this.getResolvedNode(index);
      const toNodeX = node.resolvedX - grappleOriginX;
      const toNodeY = node.resolvedY - grappleOriginY;
      const distance = Math.hypot(toNodeX, toNodeY);
      if (distance < minReach) continue;
      const normalizedX = toNodeX / Math.max(0.001, distance);
      const normalizedY = toNodeY / Math.max(0.001, distance);
      const dot = clamp(normalizedX * headingVector.x + normalizedY * headingVector.y, -1, 1);
      if (dot <= 0) continue;
      const angle = Math.acos(dot);
      if (angle > grapConeHalfAngle) continue;
      if (distance <= grapRange + node.gameplayRadius) {
        return { index, distance };
      }
    }
    return null;
  }

  private armGrapple(index: number, distance: number) {
    if (!this.isGrappleAvailable()) {
      return false;
    }
    this.grapTargetIndex = index;
    this.grapState = 'launch';
    this.grapStateUntil = this.currentTime + 0.08;
    this.grapRopeLength = Math.max(1.45, distance);
    this.grapCooldownPending = true;
    this.triggerModuleFlash('grappin', 0.5);
    this.emitAudioEvent({ type: 'grapple_cast' });
    return true;
  }

  private tryActivateWrapper(emergencyOnly: boolean) {
    if (!this.getEquippedItem('wrapper')) {
      return false;
    }
    if (this.isWrapperBusy()) {
      return false;
    }
    if (this.choiceMode !== 'none' || this.state === 'upgrade_branching') {
      return false;
    }
    if (
      emergencyOnly &&
      this.playerPosition.x >= this.camera.getSafeLeft() + 2.6 &&
      Math.abs(this.playerPosition.y) < 26
    ) {
      return false;
    }
    const wrapperDistance = Math.max(10, this.runUpgrades.modifiers.wrapperDistance);
    if (!this.isWrapperAvailable()) {
      return false;
    }
    const teleportTarget = this.path.getTeleportTarget(this.attachedIndex, Math.round(wrapperDistance));
    if (teleportTarget <= this.attachedIndex + 1) {
      return false;
    }
    this.wrapperPendingTarget = teleportTarget;
    this.wrapperTeleportAt = this.currentTime + 2;
    this.wrapperHoldUntil = this.wrapperTeleportAt + 1.6;
    this.wrapperVisualUntil = this.wrapperHoldUntil + 0.4;
    this.wrapperCooldownPending = true;
    this.emitAudioEvent({ type: 'module_activate', slot: 'wrapper' });
    return true;
  }

  private attachToNode(index: number, preserveMomentum: boolean, landingPosition: THREE.Vector3 | null, incomingVelocity: THREE.Vector3 | null) {
    const node = this.getResolvedNode(index);
    this.attachedIndex = index;
    this.stats.recordLanding(index, node.pathDistance, performance.now(), this.momentum.gauge);
    this.score = this.stats.getSnapshot().score;
    this.emitScore();

    let nextAngle = this.orbitAngle;
    let nextDirection: -1 | 1 = index === 0 ? -1 : this.orbitDirection;
    let nextAngularSpeed = (Math.PI * 2) / Math.max(1.4, node.gameplayOrbitPeriod);

    if (preserveMomentum && landingPosition && incomingVelocity) {
      const attachment = this.findBestOrbitAttachment(node, landingPosition);
      nextAngle = attachment.angle;
      const directionDot = attachment.tangent.dot(this.scratchVector2.set(incomingVelocity.x, incomingVelocity.y));
      nextDirection = directionDot >= 0 ? 1 : -1;
      const tangentialSpeed = Math.abs(directionDot);
      const radius = Math.max(1.2, attachment.position.length());
      nextAngularSpeed = clamp(
        tangentialSpeed / radius,
        (Math.PI * 2) / Math.max(1.4, node.gameplayOrbitPeriod) * 0.72,
        (Math.PI * 2) / Math.max(1.1, node.gameplayOrbitPeriod) * 2.2
      );
      nextAngularSpeed = this.applyLandingJudgement(nextDirection, tangentialSpeed, node, attachment, incomingVelocity, nextAngularSpeed);
      this.registerImpactWave(node, attachment.angle, incomingVelocity.length());
    } else {
      nextAngle = index === 0 ? Math.PI * 0.18 : 0;
      nextDirection = index === 0 ? -1 : this.orbitDirection;
    }

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

    const liveOrbit = this.getOrbitSample(node, this.orbitAngle);
    this.playerPosition.copy(this.getPlayerOrbitWorldPosition(node, this.orbitAngle, liveOrbit));
    this.playerVelocity.set(0, 0, 0);

    this.collectCoinsOnCurrentNode(node);
    this.resolveEnemyContact(node);
    if (this.choiceMode === 'reward_branch' && !node.isMilestone && node.colorHint !== 'reward') {
      this.choiceMode = 'none';
      this.activeChoices = [];
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
  ) {
    if (
      node.isGigantic &&
      this.lastLandingFeedbackConsumedSerial === this.landingFeedbackAirborneSerial &&
      this.lastLandingFeedbackTriggerNodeIndex === node.index
    ) {
      return angularSpeed;
    }

    const incoming2D = this.scratchVector2.set(incomingVelocity.x, incomingVelocity.y);
    const incomingLength = Math.max(0.001, incoming2D.length());
    incoming2D.divideScalar(incomingLength);
    const tangentDirection = attachment.tangent.clone().multiplyScalar(direction).normalize();
    const radialDirection = attachment.position.clone().normalize();
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

    let momentumGain = twist ? 0.14 : 0.035;
    if (!twist && this.momentum.gauge >= 0.5) {
      momentumGain = 0;
    } else if (!twist && this.momentum.gauge + momentumGain > 0.5) {
      momentumGain = Math.max(0, 0.5 - this.momentum.gauge);
    }

    let speedMultiplier = 1;
    if (grade === 'miss') {
      const penaltyScale = 1 - Math.min(0.72, this.runUpgrades.modifiers.landingPenaltyReduction);
      momentumGain = -0.03 * penaltyScale;
      speedMultiplier = 1 - 0.16 * penaltyScale;
    } else if (grade === 'super') {
      momentumGain += twist ? 0.032 : 0.012;
      speedMultiplier = twist ? 1.34 : 1.1;
    } else if (grade === 'perfect') {
      momentumGain += twist ? 0.05 : 0.018;
      speedMultiplier = twist ? 1.48 : 1.16;
    } else if (twist) {
      speedMultiplier = 1.24;
    }

    const nextGauge = clamp(
      this.momentum.gauge + momentumGain * (1 + this.runUpgrades.modifiers.momentumGain),
      0,
      Math.max(1, this.runUpgrades.modifiers.momentumCap)
    );
    this.momentum.fillRate = Math.max(0, nextGauge - this.momentum.gauge);
    this.momentum.gauge = nextGauge;
    this.lastLandingDirection = direction;
    this.startLandingFeedback(node.index, grade, twist);
    this.emitAudioEvent({ type: 'land', kind: this.getLandingAudioKind(node) });
    this.emitAudioEvent({ type: 'grade', grade });
    if (twist) {
      this.emitAudioEvent({ type: 'twist' });
    }
    void tangentialSpeed;
    void node;
    return angularSpeed * speedMultiplier;
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

  private startLandingFeedback(nodeIndex: number, grade: LandingGrade, twist: boolean) {
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
    this.landingFeedback = {
      grade,
      twist,
      progress: 0,
      worldPosition: new THREE.Vector3(this.playerPosition.x - 1.45, this.playerPosition.y + 0.82, this.playerPosition.z)
    };
  }

  private resolveNodeEvent(node: ResolvedGamePathNode) {
    if (node.isMilestone) {
      if (!this.milestoneChoiceCache.has(node.index)) {
        const offers = buildUpgradeOffers(node.index, this.runUpgrades);
        this.milestoneChoiceCache.set(node.index, this.path.createUpgradeBranches(node.index, offers, this.score));
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

    this.path.replaceFuture(this.attachedIndex, choice.pathNodes);
    this.path.ensureAhead(this.attachedIndex + 1, 50, 40);
    this.path.queuePostMilestoneEvents(this.attachedIndex + 1, this.attachedIndex + 1);
    this.rebuildDisplayWindowAroundCurrent();
    this.milestoneChoiceCache.delete(this.attachedIndex);
    this.applyOffer(choice.offer, viaFallback ? 'Quick choice' : 'Path chosen');
    this.choiceMode = 'none';
    this.activeChoices = [];
    this.activeShopAngles = [];
    this.state = 'upgrade_acquired';
    this.eventCooldownUntil = this.currentTime + 0.35;
    return true;
  }

  private applyOffer(offer: RogueliteItemOffer, subtitle: string) {
    this.runUpgrades = applyItemToRunState(this.runUpgrades, offer.item.id);
    this.syncPathEventBiases();
    this.remainingExtraJumps = Math.max(0, this.runUpgrades.modifiers.extraJumps);
    this.shieldCharges = Math.max(this.shieldCharges, this.runUpgrades.modifiers.shieldCharges);
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

  private updateEvents(_deltaTime: number, elapsedTime: number, currentNode: ResolvedGamePathNode) {
    if (this.state === 'upgrade_acquired' && elapsedTime >= this.eventCooldownUntil) {
      this.state = this.playerState === 'airborne' ? 'running_airborne' : this.chargeActive ? 'running_charging' : 'running_attached';
    }

    this.updateAutoFire(elapsedTime);
    this.shop.update(new THREE.Vector3(currentNode.resolvedX, currentNode.resolvedY, currentNode.resolvedZ), currentNode.gameplayRadius + 0.7, elapsedTime);
  }

  private updateCamera(deltaTime: number, currentNode: ResolvedGamePathNode, nextNode: ResolvedGamePathNode) {
    const mobileLike = isMobileRuntime();
    const milestoneAirborne = this.airborneFromMilestone && this.playerState === 'airborne';
    const cameraCurrentNode = milestoneAirborne ? nextNode : currentNode;
    const cameraNextNode =
      milestoneAirborne
        ? this.getResolvedNode(this.attachedIndex + 2)
        : nextNode;
    const upcomingMilestoneFactor =
      cameraNextNode.isGigantic
        ? clamp(1 - Math.max(0, cameraNextNode.resolvedX - this.playerPosition.x) / 34, 0, 1)
        : 0;
    const largeShardFactor = clamp((Math.max(cameraCurrentNode.visualScale, cameraNextNode.visualScale) - 2.8) / 28, 0, 1.24);
    const milestoneReleaseZoom =
      milestoneAirborne
        ? clamp(1 - Math.max(0, this.playerPosition.x - currentNode.resolvedX) / 24, 0, 1) * (mobileLike ? 19.5 : 16.2)
        : 0;
    const milestoneLockActive = currentNode.isGigantic && this.playerState !== 'airborne';
    const milestoneLockZoom = milestoneLockActive ? (mobileLike ? 40.5 : 50.8) : 0;
    const milestoneZoom =
      milestoneLockActive
        ? milestoneLockZoom
        : Math.max(milestoneReleaseZoom, upcomingMilestoneFactor * (mobileLike ? 30 : 27));
    const choiceZoom =
      (this.choiceMode === 'reward_branch' ? (mobileLike ? 6.8 : 5.4) : this.choiceMode === 'shop_orbit' ? 2.8 : this.state === 'upgrade_acquired' ? 2.4 : 0) +
      this.runUpgrades.modifiers.cameraBaseZoomBonus;
    const speedPressure = this.awaitingFirstJump || milestoneLockActive ? 0 : this.momentum.speedMultiplier;
    this.camera.update({
      deltaTime,
      state: this.state,
      score: this.score,
      currentNode: cameraCurrentNode,
      nextNode: cameraNextNode,
      playerPosition: this.playerPosition,
      momentumGauge: this.momentum.cameraZoomMultiplier,
      largeShardFactor,
      milestoneZoom,
      choiceZoom,
      speedPressure: speedPressure * (1 - this.runUpgrades.modifiers.timeSlowFactor * 0.55)
    });
  }

  private updateTrail(deltaTime: number) {
    void deltaTime;
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
    this.playerTrail.material.opacity = 0.24 + this.momentum.gauge * 0.36;
  }

  private syncPlayerVisual(elapsedTime: number, deltaTime: number) {
    this.player.position.copy(this.playerPosition);
    const currentNode = this.state === 'portal_preview' ? this.getPortalPreviewNode() : this.getResolvedNode(this.attachedIndex);
    const orbit = this.getOrbitSample(currentNode, this.orbitAngle);
    const travel = this.playerState === 'airborne'
      ? this.scratchVector2.set(this.playerVelocity.x || 0.001, this.playerVelocity.y || 0.001).normalize()
      : orbit.tangent.clone().multiplyScalar(this.orbitDirection).normalize();
    const heading = Math.atan2(travel.y, travel.x);
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
      this.syncWorldModuleIndicators(heading, deltaTime);
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
    this.syncWorldModuleIndicators(heading, deltaTime);
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

      if (slot === 'reacteur_front' || slot === 'reacteur_back' || slot === 'souffleur' || slot === 'big_canon' || slot === 'front_canon') {
        const isHot =
          (this.moduleFlashUntil[slot] ?? 0) > this.currentTime ||
          (slot === 'souffleur' && this.souffleurActive) ||
          (slot === 'big_canon' && this.bigCanonFireUntil > this.currentTime) ||
          (slot === 'front_canon' && this.frontCanonFireUntil > this.currentTime);
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
        } else if (this.grapState === 'hooked') {
          sprite.setFrame(2);
        } else if (this.grapState === 'landing') {
          sprite.setFrame(3);
        } else {
          sprite.setFrame(0);
        }
        if (this.grapState === 'landing' && this.currentTime >= this.grapStateUntil) {
          this.grapState = 'idle';
          if (this.grapCooldownPending) {
            const grapRuntime = this.ensureModuleRuntime('grappin');
            if (grapRuntime) {
              grapRuntime.cooldownRemaining = this.getModuleCooldownDuration('grappin');
            }
            this.grapCooldownPending = false;
          }
        }
        return;
      }

      sprite.setFrame(0);
    });
  }

  private syncWorldModuleIndicators(heading: number, deltaTime: number) {
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
      Math.max(4.8, 3.4 + this.runUpgrades.modifiers.magnetRange * 7.8),
      magnetVisible ? 0.22 : 0,
      deltaTime,
      0.34
    );
    this.syncRangeIndicator(
      this.bigCanonRangeIndicator,
      bigCanonVisible && bigCanonReady,
      Math.max(3.9, this.runUpgrades.modifiers.bigCanonRange * 1.42),
      bigCanonVisible && bigCanonReady ? 0.24 : 0,
      deltaTime,
      0
    );
    this.grapRangeIndicator.material.color.set(this.getRarityColor(grapItem?.rarity ?? 'common'));
    this.syncRangeIndicator(
      this.grapRangeIndicator,
      grapReady,
      Math.max(3.25, this.runUpgrades.modifiers.grapRange * 1.42),
      grapReady ? 0.24 : 0,
      deltaTime,
      2.48
    );
    if (grapReady) {
      const forwardX = Math.cos(heading);
      const forwardY = Math.sin(heading);
      const upX = -forwardY;
      const upY = forwardX;
      this.grapRangeIndicator.position.set(
        this.playerPosition.x + forwardX * 0.9 - upX * 0.68,
        this.playerPosition.y + forwardY * 0.9 - upY * 0.68,
        this.playerPosition.z + 0.01
      );
      this.grapRangeIndicator.rotation.z = heading - Math.PI / 8;
    }

    this.frontCanonLaser.visible = frontCanonVisible;
    if (frontCanonVisible) {
      const frontRuntime = this.getModuleRuntime('front_canon');
      const frontCooldownDuration = this.getModuleCooldownDuration('front_canon');
      const frontReady = !frontRuntime || frontCooldownDuration <= 0 || frontRuntime.cooldownRemaining <= 0 ? 1 : 0;
      const range = Math.max(2.4, this.runUpgrades.modifiers.frontCanonRange * 1.08);
      const forwardX = Math.cos(heading);
      const forwardY = Math.sin(heading);
      const laserLength = Math.max(6.8, range * 2.1);
      const startOffset = 1.82;
      const centerOffset = startOffset + laserLength * 0.5;
      this.frontCanonLaser.material.color.set(this.getRarityColor(frontCanonItem?.rarity ?? 'common'));
      this.frontCanonLaser.position.set(
        this.playerPosition.x + forwardX * centerOffset,
        this.playerPosition.y + forwardY * centerOffset,
        this.playerPosition.z + 0.01
      );
      this.frontCanonLaser.rotation.z = heading;
      this.frontCanonLaser.scale.set(laserLength, 0.7, 1);
      this.frontCanonLaser.material.opacity = (0.16 + this.momentum.gauge * 0.08) * frontReady;
      this.frontCanonLaser.visible = frontReady > 0.04;
    }

    this.frontCanonProjectile.visible = this.frontCanonFireUntil > this.currentTime;
    if (this.frontCanonProjectile.visible) {
      this.frontCanonProjectile.position.set(
        this.playerPosition.x + Math.cos(heading) * 1.8,
        this.playerPosition.y + Math.sin(heading) * 1.8,
        this.playerPosition.z + 0.02
      );
      this.frontCanonProjectile.rotation.z = heading;
    }

    this.bigCanonProjectile.visible = this.bigCanonFireUntil > this.currentTime;
    if (this.bigCanonProjectile.visible) {
      this.bigCanonProjectile.position.set(this.playerPosition.x, this.playerPosition.y + 0.28, this.playerPosition.z + 0.02);
      this.bigCanonProjectile.rotation.z = heading;
    }

    const grapHasTarget = this.grapTargetIndex !== null && this.grapState !== 'idle';
    this.grapRope.visible = grapHasTarget;
    if (grapHasTarget) {
      this.grapRope.material.opacity =
        this.grapState === 'launch'
          ? 0.58
          : this.grapState === 'hooked'
            ? 0.92
            : 0.78;
      const targetNode = this.getResolvedNode(this.grapTargetIndex!);
      this.grapTargetPosition.set(targetNode.resolvedX, targetNode.resolvedY, targetNode.resolvedZ);
      const ropeVector = this.scratchVector.copy(this.grapTargetPosition).sub(this.playerPosition);
      const distance = Math.max(0.2, ropeVector.length());
      this.grapRope.position.copy(this.playerPosition).addScaledVector(ropeVector, 0.5);
      this.grapRope.position.z = this.playerPosition.z + 0.02;
      this.grapRope.rotation.z = Math.atan2(ropeVector.y, ropeVector.x) - Math.PI * 0.5;
      this.grapRope.scale.set(this.grapState === 'hooked' ? 1.12 : 1, distance, 1);
    } else {
      this.grapRope.material.opacity = 0.85;
    }
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
      const preview = choice.previewNodes[0] ?? choice.entry;
      const cardScale = mobileLike ? 1.28 : 1.16;
      const slotOffsetY = index === 0 ? 0.28 : index === 2 ? -0.28 : 0;
      billboard.sprite.scale.set(16.8 * cardScale, 7.8 * cardScale, 1);
      // Décalage vers la droite pour l’affichage des descriptions (mirror de l’ancien comportement)
      billboard.sprite.position.set(preview.x + 12.7, preview.y + slotOffsetY, preview.z + 0.06);
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
    context.font = "600 132px 'Text Me One', sans-serif";
    context.fillText(this.locale === 'fr' ? 'Choisissez une amélioration' : 'Choose an upgrade', canvas.width * 0.5, 124);
    context.fillStyle = this.getThemeShardColor();
    context.globalAlpha = 0.76;
    context.font = "400 58px 'Text Me One', sans-serif";
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
    if (hudImage.complete) {
      context.drawImage(hudImage, 118, 82, 252, 252);
    }
    if (rarityImage && rarityImage.complete) {
      context.drawImage(rarityImage, 286, 270, 120, 120);
    }
    context.fillStyle = bg;
    context.globalAlpha = 0.72;
    context.font = "400 88px 'Text Me One', sans-serif";
    context.fillText(pathLabel, 460, 128);
    context.globalAlpha = 1;
    if (offer.item.kind === 'module') {
      context.globalAlpha = 0.72;
      context.font = "400 76px 'Text Me One', sans-serif";
      context.fillText(this.locale === 'fr' ? this.getRarityLabelFr(offer.item.rarity) : this.getRarityLabelEn(offer.item.rarity), 460, 228);
      context.globalAlpha = 1;
    }
    context.font = "600 136px 'Text Me One', sans-serif";
    this.drawWrappedText(context, offer.item.name[this.locale], 460, 366, canvas.width - 554, 130, 2, bg);
    context.globalAlpha = 0.78;
    context.font = "400 82px 'Text Me One', sans-serif";
    this.drawWrappedText(context, offer.item.description[this.locale], 460, 536, canvas.width - 554, 90, 3, bg);
    context.globalAlpha = 1;
    texture.needsUpdate = true;
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
    deltaTime: number,
    rotationSpeed = 0
  ) {
    void deltaTime;
    indicator.material.opacity = visible ? targetOpacity : 0;
    indicator.visible = visible;
    if (!indicator.visible) return;
    indicator.position.set(this.playerPosition.x, this.playerPosition.y, this.playerPosition.z + 0.01);
    const diameter = radius * 2 * (1 + Math.sin(this.currentTime * 2.2) * 0.015);
    indicator.scale.set(diameter, diameter, 1);
    indicator.rotation.z = rotationSpeed === 0 ? 0 : this.currentTime * rotationSpeed;
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
    const fg = this.theme === 'dark' ? '212,191,155' : '57,63,74';
    const bg = this.theme === 'dark' ? '57,63,74' : '212,191,155';

    ctx.clearRect(0, 0, 256, 256);
    ctx.save();
    ctx.translate(128, 128);
    ctx.strokeStyle = `rgba(${fg},0.14)`;
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.arc(0, 0, 84, -Math.PI / 2, Math.PI * 1.5);
    ctx.stroke();
    ctx.strokeStyle = `rgba(${fg},0.92)`;
    ctx.beginPath();
    ctx.arc(0, 0, 84, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * chargeProgress);
    ctx.stroke();

    ctx.strokeStyle = `rgba(${bg},0.18)`;
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(0, 0, 54, -Math.PI / 2, Math.PI * 1.5);
    ctx.stroke();
    ctx.strokeStyle = `rgba(${fg},0.96)`;
    ctx.beginPath();
    ctx.arc(0, 0, 54, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * orbitProgress);
    ctx.stroke();
    ctx.restore();

    this.shardHudTexture.needsUpdate = true;
    this.shardHudSprite.visible = true;
    this.shardHudSprite.position.set(currentNode.resolvedX, currentNode.resolvedY, currentNode.resolvedZ + 0.04);
    this.shardHudSprite.scale.setScalar(Math.max(2.1, radius * 1.46));
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

    visibleNodes.forEach((node) => {
      node.coinSlots.forEach((slot) => {
        if (slot.collected) return;
        const position = this.getCoinWorldPosition(node, slot.angle, slot.orbitScale);
        const magnetRadius = this.getCoinMagnetRadius();
        const distanceToPlayer = position.distanceTo(this.playerPosition);
        const attraction = magnetRadius > 0 ? clamp(1 - distanceToPlayer / magnetRadius, 0, 1) : 0;
        coinMarkers.push({
          id: `${node.index}:${Math.round(slot.angle * 1000)}:${slot.value}`,
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
          pole: node.enemySlot.pole
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
        pole: node.enemySlot.pole
      });
    }

    this.coins.setVisible(this.state !== 'idle' && this.state !== 'transition_out');
    this.enemies.setVisible(this.state !== 'idle' && this.state !== 'transition_out');
    this.coins.update(coinMarkers, elapsedTime);
    this.enemies.update(Array.from(enemyMarkersById.values()), elapsedTime);
  }

  private fillMomentumBurst(amount: number) {
    this.momentum.gauge = clamp(this.momentum.gauge + amount * (1 + this.runUpgrades.modifiers.momentumGain), 0, Math.max(1, this.runUpgrades.modifiers.momentumCap));
    this.momentum.fillRate = Math.max(this.momentum.fillRate, amount);
  }

  private collectCoinsOnCurrentNode(node: ResolvedGamePathNode) {
    let collectedAny = false;
    node.coinSlots.forEach((slot) => {
      if (slot.collected) return;
      if (Math.abs(shortestAngleDistance(this.orbitAngle, slot.angle)) < 0.22 + this.runUpgrades.modifiers.coinMagnet * 0.12) {
        slot.collected = true;
        this.stats.addCoins(this.applyCoinBonus(slot.value), this.momentum.gauge);
        this.score = this.stats.getSnapshot().score;
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
    if (magnetRadius <= 0) {
      return;
    }
    const magnetRadiusSq = magnetRadius * magnetRadius;
    const visibleNodes = this.getDisplayNodes(Math.min(28, this.getRecommendedVisibleCount()));
    let collectedAny = false;
    visibleNodes.forEach((node) => {
      node.coinSlots.forEach((slot) => {
        if (slot.collected) return;
        const position = this.getCoinWorldPosition(node, slot.angle, slot.orbitScale);
        if (position.distanceToSquared(this.playerPosition) > magnetRadiusSq) {
          return;
        }
        slot.collected = true;
        this.stats.addCoins(this.applyCoinBonus(slot.value), this.momentum.gauge);
        this.score = this.stats.getSnapshot().score;
        this.emitScore();
        collectedAny = true;
      });
    });
    if (collectedAny) {
      this.emitAudioEvent({ type: 'coin', magnet: true });
    }
  }

  private getCoinMagnetRadius() {
    if (!this.getEquippedItem('magnet')) {
      return 0;
    }
    return Math.max(1.8, 2.1 + this.runUpgrades.modifiers.coinMagnet * 6.1);
  }

  private applyGrappleConstraint() {
    if (this.grapTargetIndex === null || this.grapState === 'idle' || this.grapState === 'launch') {
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
      this.playerVelocity.addScaledVector(toPlayer, -outwardSpeed);
    }
  }

  private releaseGrapple() {
    if (this.grapTargetIndex === null && this.grapState === 'idle') {
      return;
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
    this.grapRopeLength = 0;
  }

  private resolveEnemyContact(node: ResolvedGamePathNode) {
    const enemy = node.enemySlot;
    if (!enemy || !enemy.alive) return;
    const enemyPosition = this.getEnemyWorldPosition(node, enemy.pole);
    if (enemyPosition.distanceTo(this.playerPosition) > node.gameplayRadius * 0.36 + 0.82) {
      return;
    }
    const impactSpeed = this.playerVelocity.length();
    if ((this.isEnemyHitFromBehind(enemy.pole) && impactSpeed >= enemy.speedThreshold) || this.runUpgrades.modifiers.spikeOrbit) {
      enemy.alive = false;
      this.stats.addCoins(this.applyCoinBonus(enemy.rewardCoins), this.momentum.gauge);
      this.stats.recordEnemyKill(1, this.momentum.gauge);
      this.score = this.stats.getSnapshot().score;
      this.emitScore();
      this.fillMomentumBurst(0.05);
      this.emitAudioEvent({ type: 'enemy_die' });
      return;
    }
    this.consumeProtectionOrFail(enemy);
  }

  private resolveAirborneEnemyContact() {
    for (let index = this.attachedIndex + 1; index <= this.attachedIndex + 4; index += 1) {
      const node = this.getResolvedNode(index);
      const enemy = node.enemySlot;
      if (!enemy || !enemy.alive) continue;
      const enemyPosition = this.getEnemyWorldPosition(node, enemy.pole);
      if (enemyPosition.distanceTo(this.playerPosition) > 1.2) continue;
      const speed = this.playerVelocity.length();
      if (speed >= enemy.speedThreshold * 0.75 || this.runUpgrades.modifiers.spikeOrbit) {
        enemy.alive = false;
        this.stats.addCoins(this.applyCoinBonus(enemy.rewardCoins), this.momentum.gauge);
        this.stats.recordEnemyKill(1, this.momentum.gauge);
        this.score = this.stats.getSnapshot().score;
        this.emitScore();
        this.fillMomentumBurst(0.08);
        this.emitAudioEvent({ type: 'enemy_die' });
      } else {
        this.consumeProtectionOrFail(enemy);
      }
      return;
    }
  }

  private consumeProtectionOrFail(enemy?: ResolvedGamePathNode['enemySlot']) {
    const shieldRuntime = this.ensureModuleRuntime('shield');
    if (shieldRuntime && shieldRuntime.cooldownRemaining <= 0) {
      const cooldownBase = 14;
      const cooldown = Math.max(4, cooldownBase * (1 - this.runUpgrades.modifiers.shieldCooldownFactor));
      shieldRuntime.cooldownRemaining = cooldown;
      this.shieldCharges = 0;
      this.shieldHitUntil = this.currentTime + 0.24;
      if (enemy?.alive) {
        enemy.alive = false;
        this.stats.addCoins(this.applyCoinBonus(enemy.rewardCoins), this.momentum.gauge);
        this.stats.recordEnemyKill(1, this.momentum.gauge);
        this.score = this.stats.getSnapshot().score;
        this.emitScore();
      }
      this.fillMomentumBurst(0.04);
      this.emitAudioEvent({ type: 'module_activate', slot: 'shield' });
      return;
    }
    this.emitAudioEvent({ type: 'enemy_hit_player' });
    this.failRun('enemy');
  }

  private updateAutoFire(elapsedTime: number) {
    const hasBigCanon = Boolean(this.getEquippedItem('big_canon'));
    const hasFrontCanon = Boolean(this.getEquippedItem('front_canon'));
    if (!hasBigCanon && !hasFrontCanon) return;

    if (hasBigCanon) {
      const runtime = this.ensureModuleRuntime('big_canon');
      if (runtime && runtime.cooldownRemaining <= 0) {
        for (let index = this.attachedIndex; index < this.attachedIndex + 12; index += 1) {
          const node = this.getResolvedNode(index);
          const enemy = node.enemySlot;
          if (!enemy || !enemy.alive || enemy.tier === 'invincible') continue;
          const position = this.getEnemyWorldPosition(node, enemy.pole);
          if (position.distanceTo(this.playerPosition) > Math.max(2.2, this.runUpgrades.modifiers.bigCanonRange)) continue;
          enemy.alive = false;
          this.stats.addCoins(this.applyCoinBonus(enemy.rewardCoins), this.momentum.gauge);
          this.stats.recordEnemyKill(1, this.momentum.gauge);
          this.score = this.stats.getSnapshot().score;
          this.emitScore();
          this.fillMomentumBurst(0.05);
          runtime.cooldownRemaining = Math.max(1.4, this.runUpgrades.modifiers.bigCanonCooldown || 4.5);
          this.bigCanonFireUntil = elapsedTime + 0.24;
          this.triggerModuleFlash('big_canon', 0.24);
          this.emitAudioEvent({ type: 'module_activate', slot: 'big_canon' });
          this.emitAudioEvent({ type: 'enemy_die' });
          break;
        }
      }
    }

    if (!hasFrontCanon) return;
    const frontRuntime = this.ensureModuleRuntime('front_canon');
    if (!frontRuntime || frontRuntime.cooldownRemaining > 0) return;
    const forward = this.scratchVector.set(Math.cos(this.player.rotation.z || 0), Math.sin(this.player.rotation.z || 0), 0).normalize();
    const range = Math.max(2.2, this.runUpgrades.modifiers.frontCanonRange);
    for (let index = this.attachedIndex; index < this.attachedIndex + 12; index += 1) {
      const node = this.getResolvedNode(index);
      const enemy = node.enemySlot;
      if (!enemy || !enemy.alive || enemy.tier === 'invincible') continue;
      const position = this.getEnemyWorldPosition(node, enemy.pole);
      const toEnemy = this.scratchVectorB.copy(position).sub(this.playerPosition);
      const along = toEnemy.dot(forward);
      const sideDistance = Math.abs(toEnemy.x * -forward.y + toEnemy.y * forward.x);
      if (along <= 0 || along > range || sideDistance > 0.58) continue;
      enemy.alive = false;
      this.stats.addCoins(this.applyCoinBonus(enemy.rewardCoins), this.momentum.gauge);
      this.stats.recordEnemyKill(1, this.momentum.gauge);
      this.score = this.stats.getSnapshot().score;
      this.emitScore();
      this.fillMomentumBurst(0.04);
      frontRuntime.cooldownRemaining = Math.max(1, this.runUpgrades.modifiers.frontCanonCooldown || 2.4);
      this.frontCanonFireUntil = elapsedTime + 0.18;
      this.triggerModuleFlash('front_canon', 0.22);
      this.emitAudioEvent({ type: 'module_activate', slot: 'front_canon' });
      this.emitAudioEvent({ type: 'enemy_die' });
      return;
    }
  }

  private applyCoinBonus(baseValue: number) {
    const doubled = this.runUpgrades.modifiers.doubleCoin ? baseValue * 2 : baseValue;
    return Math.max(1, Math.round(doubled * (1 + this.runUpgrades.modifiers.coinBonus)));
  }

  private failRun(cause: GameOverCause = 'camera') {
    if (this.state === 'game_over') return;
    this.state = 'game_over';
    this.playerState = 'dead';
    this.gameOverCause = cause;
    this.chargeActive = false;
    this.chargeMeter = 0;
    this.choiceMode = 'none';
    this.activeChoices = [];
    this.playerVelocity.set(0, 0, 0);
    this.playerVelocityTarget.set(0, 0, 0);
    this.angularSpeed = 0;
    this.airborneFromMilestone = false;
    this.gameOverStartedAt = this.currentTime;
    this.playerTrail.visible = false;
    this.shop.reset();
    this.emitAudioEvent({ type: 'game_over' });
    this.emitScore();
  }

  private isOutsidePlayableField(position: THREE.Vector3) {
    const verticalLimit = 32;
    return position.y <= -verticalLimit || position.y >= verticalLimit;
  }

  private canCaptureNode(node: ResolvedGamePathNode, previousPosition?: THREE.Vector3) {
    const captureRadius =
      this.getPhysicalRadius(node) +
      (node.isGigantic ? this.getOrbitClearance(node) + 1.15 : 0.92) +
      this.runUpgrades.modifiers.captureRadius;
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

  private findBestOrbitAttachment(node: ResolvedGamePathNode, worldPosition: THREE.Vector3) {
    let bestAngle = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    let bestPosition = new THREE.Vector2();
    let bestTangent = new THREE.Vector2(1, 0);

    for (let step = 0; step < 72; step += 1) {
      const angle = (step / 72) * Math.PI * 2;
      const sample = this.getOrbitSample(node, angle);
      const worldX = node.resolvedX + sample.position.x;
      const worldY = node.resolvedY + sample.position.y;
      const distance = (worldPosition.x - worldX) ** 2 + (worldPosition.y - worldY) ** 2;
      if (distance < bestDistance) {
        bestDistance = distance;
        bestAngle = angle;
        bestPosition = sample.position.clone();
        bestTangent = sample.tangent.clone();
      }
    }

    return {
      angle: bestAngle,
      position: bestPosition,
      tangent: bestTangent
    };
  }

  private getOrbitSample(node: ResolvedGamePathNode, angle: number): OrbitSample {
    const parameter = wrapAngle(angle);
    const rotation = node.shapeKind === 'round' ? 0 : node.resolvedSpinPhase;
    const extents = this.getShapeExtents(node);
    const clearance = this.getOrbitClearance(node);
    const baseRadius = this.getPhysicalRadius(node) + clearance;
    const localAngle = wrapAngle(parameter - rotation);

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

    const rotation = node.shapeKind === 'round' ? 0 : node.resolvedSpinPhase;
    const boatAngle = wrapAngle(this.orbitAngle - rotation);
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

  private getPlayerOrbitWorldPosition(node: ResolvedGamePathNode, angle: number, sample: OrbitSample) {
    const localAngle = wrapAngle(angle - (node.shapeKind === 'round' ? 0 : node.resolvedSpinPhase));
    const radial = sample.position.clone().normalize();
    const travelSpeed =
      this.playerState === 'airborne'
        ? this.playerVelocity.length()
        : Math.abs(this.angularSpeed) * Math.max(1, sample.position.length());
    const deformation = Math.max(0, this.sampleSurfaceDeformation(node, localAngle));
    const largeShardLift =
      !node.isMilestone && node.visualScale >= 5
        ? clamp(0.14 + deformation * 0.92 + travelSpeed * 0.012, 0.14, 0.84)
        : clamp(deformation * 0.16 + travelSpeed * 0.003, 0, 0.12);
    return new THREE.Vector3(
      node.resolvedX + sample.position.x + radial.x * largeShardLift,
      node.resolvedY + sample.position.y + radial.y * largeShardLift,
      node.resolvedZ
    );
  }

  private getCoinWorldPosition(node: ResolvedGamePathNode, angle: number, orbitScale: number) {
    const orbit = this.getOrbitSample(node, angle);
    const radial = orbit.position.clone().normalize();
    const clearance = this.getOrbitClearance(node);
    const orbitRadius = orbit.position.length() * orbitScale;
    const coinRadius = Math.max(
      this.getPhysicalRadius(node) + clearance * Math.max(0.92, orbitScale) + 0.26,
      orbitRadius + 0.22
    );
    return new THREE.Vector3(
      node.resolvedX + radial.x * coinRadius,
      node.resolvedY + radial.y * coinRadius,
      node.resolvedZ
    );
  }

  private getEnemyWorldPosition(node: ResolvedGamePathNode, pole: 'north' | 'south') {
    const orbit = this.getOrbitSample(node, pole === 'north' ? Math.PI * 0.5 : Math.PI * 1.5);
    const local = orbit.position.clone().normalize().multiplyScalar(this.getPhysicalRadius(node) + 0.92);
    const rotation = node.shapeKind === 'round' ? 0 : node.resolvedSpinPhase;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    return new THREE.Vector3(
      node.resolvedX + local.x * cos - local.y * sin,
      node.resolvedY + local.x * sin + local.y * cos,
      node.resolvedZ
    );
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

  private isEnemyHitFromBehind(pole: 'north' | 'south') {
    return pole === 'north' ? this.orbitDirection === 1 : this.orbitDirection === -1;
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
        const preview = choice.previewNodes[0] ?? choice.entry;
        return {
          slot: index as 0 | 1 | 2,
          offer: choice.offer,
          // Basculer la référence de position vers la droite de la branche/milestone
          worldPosition: new THREE.Vector3(
            preview.x + (index === 1 ? 3.6 : 3.2),
            preview.y + (index === 0 ? 0.28 : index === 2 ? -0.28 : 0),
            preview.z
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
    return this.theme === 'dark' ? '#A5977F' : '#2E3644';
  }

  private getThemeContrastColor() {
    return this.theme === 'dark' ? '#2E3644' : '#A5977F';
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
    const image = new Image();
    image.src = src;
    image.onload = () => {
      this.rewardBillboardSignature = '';
    };
    this.rewardImageCache.set(src, image);
    return image;
  }
}
