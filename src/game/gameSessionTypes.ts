import * as THREE from 'three';
import type { PathDirection } from './pathTypes';
import type { RogueliteItemOffer } from './roguelite';

export type GameShardSizeTier =
  | 'tiny'
  | 'very_small'
  | 'small'
  | 'medium_small'
  | 'medium'
  | 'medium_large'
  | 'large'
  | 'very_large'
  | 'huge'
  | 'massive';

export type GameShardShapeKind = 'round' | 'oval' | 'triangular';
export type GameShardSpinDirection = 'cw' | 'ccw';
export type GameShardMotionPattern = 'none' | 'vertical' | 'horizontal' | 'micro_orbit' | 'drift';
export type GameEventType = 'none' | 'shop' | 'treasure' | 'gift' | 'mini_boss' | 'rare_item' | 'boss' | 'boss_weak';
export type GameEnemyTier = 'light' | 'armored' | 'elite' | 'invincible';
export type GameChoiceMode = 'reward_branch' | 'shop_orbit';
export type GameColorHint = 'none' | 'accent' | 'danger' | 'reward';

export type GameSessionState =
  | 'idle'
  | 'transition_in'
  | 'running_attached'
  | 'running_charging'
  | 'running_airborne'
  | 'upgrade_branching'
  | 'upgrade_acquired'
  | 'game_over'
  | 'transition_out';

export type GameHudState = 'transition' | 'running' | 'upgrade_choice' | 'game_over';

export interface GameCoinSlot {
  angle: number;
  value: number;
  collected: boolean;
  orbitScale: number;
}

export interface GameEnemySlot {
  pole: 'north' | 'south';
  tier: GameEnemyTier;
  alive: boolean;
  rewardCoins: number;
  speedThreshold: number;
}

export interface GamePathNode {
  index: number;
  x: number;
  y: number;
  z: number;
  gameplayRadius: number;
  visualScale: number;
  pathDistance: number;
  direction: PathDirection;
  kind: 'normal' | 'milestone' | 'branch' | 'event' | 'boss_weak';
  sizeTier: GameShardSizeTier;
  shapeKind: GameShardShapeKind;
  spinDirection: GameShardSpinDirection;
  spinSpeed: number;
  motionPattern: GameShardMotionPattern;
  eventType: GameEventType;
  colorHint: GameColorHint;
  gameplayOrbitPeriod: number;
  branchSlot: number | null;
  offerId: string | null;
  onboarding: boolean;
  isMilestone: boolean;
  isGigantic: boolean;
  coinSlots: GameCoinSlot[];
  enemySlot: GameEnemySlot | null;
  motionSeed: number;
  visualStretch: {
    x: number;
    y: number;
    z: number;
  };
}

export interface ResolvedGamePathNode extends GamePathNode {
  resolvedX: number;
  resolvedY: number;
  resolvedZ: number;
  resolvedSpinPhase: number;
}

export interface BranchChoice {
  mode: GameChoiceMode;
  offer: RogueliteItemOffer;
  price?: number;
  entry: GamePathNode;
  previewNodes: GamePathNode[];
  pathNodes: GamePathNode[];
}

export interface BranchLabelHint {
  slot: 0 | 1 | 2;
  offer: RogueliteItemOffer;
  worldPosition: THREE.Vector3;
  mode: GameChoiceMode;
  price?: number;
}

export interface AcquisitionFeedback {
  offer: RogueliteItemOffer;
  progress: number;
  subtitle?: string;
}

export interface MomentumState {
  gauge: number;
  fillRate: number;
  decayRate: number;
  speedMultiplier: number;
  jumpMultiplier: number;
  cameraZoomMultiplier: number;
}

export interface VisiblePlatformVisual {
  scale: THREE.Vector3;
  shapeKind: GameShardShapeKind;
  spinDirection: GameShardSpinDirection;
  spinSpeed: number;
  spinPhase: number;
  tint: string | null;
  pulse: number;
  deformAngle?: number;
  deformStrength?: number;
  deformDensity?: number;
}

export interface GameHudSnapshot {
  state: GameHudState;
  score: number;
  highscore: number;
  distanceMeters: number;
  bestDistanceMeters: number;
  coins: number;
  splitTimes: Partial<Record<10 | 50 | 100, number>>;
  chargeRatio: number;
  momentumGauge: number;
  momentumTier: number;
  orbitGraceActive: boolean;
  orbitGraceProgress: number;
  offers: RogueliteItemOffer[];
  branchHints: BranchLabelHint[];
  acquisition: AcquisitionFeedback | null;
}
