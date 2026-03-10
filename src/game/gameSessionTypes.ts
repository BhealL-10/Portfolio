import * as THREE from 'three';
import type { PathDirection } from './pathTypes';
import type { RogueliteItemOffer } from './roguelite';

export type GameShardSizeTier =
  | 'very_tiny'
  | 'tiny'
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

export interface GamePathNode {
  index: number;
  x: number;
  y: number;
  z: number;
  radius: number;
  visualScale: number;
  pathDistance: number;
  direction: PathDirection;
  kind: 'normal' | 'milestone' | 'branch';
  sizeTier: GameShardSizeTier;
  shapeKind: GameShardShapeKind;
  spinDirection: GameShardSpinDirection;
  spinSpeed: number;
  motionPattern: GameShardMotionPattern;
  branchSlot: number | null;
  offerId: string | null;
  onboarding: boolean;
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
}

export interface BranchChoice {
  offer: RogueliteItemOffer;
  entry: GamePathNode;
  previewNodes: GamePathNode[];
  pathNodes: GamePathNode[];
}

export interface BranchLabelHint {
  slot: 0 | 1 | 2;
  offer: RogueliteItemOffer;
  worldPosition: THREE.Vector3;
}

export interface AcquisitionFeedback {
  offer: RogueliteItemOffer;
  progress: number;
}

export interface MomentumState {
  chainCount: number;
  chainTier: 0 | 1 | 2 | 3;
  speedMultiplier: number;
  jumpMultiplier: number;
  cameraZoomMultiplier: number;
  gauge: number;
}

export interface VisiblePlatformVisual {
  scale: THREE.Vector3;
  shapeKind: GameShardShapeKind;
  spinDirection: GameShardSpinDirection;
  spinSpeed: number;
  spinPhase: number;
}

export interface GameHudSnapshot {
  state: GameHudState;
  score: number;
  highscore: number;
  chargeRatio: number;
  momentumGauge: number;
  momentumTier: number;
  offers: RogueliteItemOffer[];
  branchHints: BranchLabelHint[];
  acquisition: AcquisitionFeedback | null;
}
