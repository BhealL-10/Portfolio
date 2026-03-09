import { describe, expect, it } from 'vitest';
import { SecretSlotSystem } from './SecretSlotSystem';

describe('SecretSlotSystem', () => {
  it('creates one slot per shard id', () => {
    const system = new SecretSlotSystem(['a', 'b', 'c']);
    expect(system.getSlots()).toHaveLength(3);
  });

  it('snaps only inside the target radius', () => {
    const system = new SecretSlotSystem(['a']);
    const slot = system.getSlotForShard('a');
    expect(slot).not.toBeNull();

    const inside = system.canSnap('a', {
      x: slot!.worldPosition.x,
      y: slot!.worldPosition.y,
      z: slot!.worldPosition.z
    });

    const outside = system.canSnap('a', {
      x: slot!.worldPosition.x + slot!.snapRadius * 3,
      y: slot!.worldPosition.y,
      z: slot!.worldPosition.z
    });

    expect(inside?.shardId).toBe('a');
    expect(outside).toBeNull();
  });

  it('reports unlocked when every slot is activated', () => {
    const system = new SecretSlotSystem(['a', 'b']);
    system.activate('a');
    expect(system.isUnlocked()).toBe(false);
    system.activate('b');
    expect(system.isUnlocked()).toBe(true);
  });
});
