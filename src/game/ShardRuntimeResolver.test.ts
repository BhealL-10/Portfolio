import { describe, expect, it } from 'vitest';
import { resolveRuntimeNode } from './ShardRuntimeResolver';
import type { GamePathNode } from './gameSessionTypes';

function buildMovingNode(): GamePathNode {
  return {
    index: 48,
    x: 120,
    y: 4,
    z: 0,
    gameplayRadius: 1.8,
    visualScale: 1.9,
    pathDistance: 120,
    direction: 'right',
    kind: 'normal',
    sizeTier: 'medium',
    shapeKind: 'round',
    spinDirection: 'cw',
    spinSpeed: 0.2,
    motionPattern: 'vertical',
    motionMode: 'none',
    motionDirection: null,
    motionDistance: 0,
    motionDuration: 0,
    motionActivatedAt: null,
    eventType: 'none',
    colorHint: 'none',
    gameplayOrbitPeriod: 3.2,
    branchSlot: null,
    offerId: null,
    onboarding: false,
    isMilestone: false,
    isGigantic: false,
    coinSlots: [],
    enemySlot: null,
    motionSeed: Math.PI * 0.35,
    visualStretch: { x: 1, y: 1, z: 1 }
  };
}

describe('resolveRuntimeNode', () => {
  it('does not change regular moving-shard world resolution when the player index changes', () => {
    const node = buildMovingNode();
    const early = resolveRuntimeNode(node, 7.25, 4);
    const late = resolveRuntimeNode(node, 7.25, 46);

    expect(early.resolvedX).toBeCloseTo(late.resolvedX, 8);
    expect(early.resolvedY).toBeCloseTo(late.resolvedY, 8);
    expect(early.resolvedMotionProgress).toBeCloseTo(late.resolvedMotionProgress ?? 0, 8);
  });
});
