export type PathDirection = 'right' | 'up' | 'up_left' | 'up_right' | 'down_left' | 'down_right';
export type PathNodeKind = 'normal' | 'milestone' | 'branch';

export interface PathNode {
  index: number;
  x: number;
  y: number;
  z: number;
  radius: number;
  direction: PathDirection;
  kind: PathNodeKind;
  branchSlot: number | null;
  offerId: string | null;
  onboarding: boolean;
  motionSeed: number;
}

export interface ResolvedPathNode extends PathNode {
  resolvedX: number;
  resolvedY: number;
  resolvedZ: number;
}
