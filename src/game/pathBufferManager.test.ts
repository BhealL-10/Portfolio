import { describe, expect, it } from 'vitest';
import { generatePathNodes } from './pathGenerator';
import { PathBufferManager } from './pathBufferManager';
import { validatePathCandidate, validateTeleportTarget } from './pathValidator';
import type { PathNode } from './pathTypes';

describe('path generation', () => {
  it('builds a valid onboarding segment', () => {
    const start: PathNode = {
      index: 0,
      x: -12,
      y: 0.8,
      z: 0,
      radius: 1.45,
      direction: 'right',
      kind: 'normal',
      branchSlot: null,
      offerId: null,
      onboarding: true,
      motionSeed: 0
    };

    const nodes = [start, ...generatePathNodes([start], 24, () => 0.42)];
    for (let index = 1; index < nodes.length; index += 1) {
      expect(validatePathCandidate(nodes[index], nodes.slice(0, index))).toBe(true);
    }
  });

  it('keeps a valid buffer and safe teleport targets', () => {
    const buffer = new PathBufferManager();
    buffer.reset();
    buffer.prebuild(180);
    const node = buffer.getResolvedNode(120, 12, 40);
    expect(node.index).toBe(120);
    expect(buffer.getRemainingBuffer(120)).toBeGreaterThan(50);
    const target = buffer.getTeleportTarget(40, 20);
    expect(target).toBeGreaterThan(40);
    const allNodes = Array.from({ length: 170 }, (_, index) => buffer.getNode(index));
    expect(validateTeleportTarget(allNodes, 40, target)).toBe(true);
  });
});
