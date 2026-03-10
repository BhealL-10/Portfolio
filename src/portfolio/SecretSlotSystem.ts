import { distance3, type Vec3Like } from '../core/math';
import type { SecretSlot } from '../types/content';
import { getSlotAnchor } from './shardLayout';

export class SecretSlotSystem {
  private slots: SecretSlot[];

  constructor(shardIds: string[]) {
    this.slots = shardIds.map((shardId, index, all) => ({
      shardId,
      worldPosition: SecretSlotSystem.computePosition(index, all.length),
      snapRadius: 3.05,
      activated: false
    }));
  }

  static computePosition(index: number, count: number) {
    return getSlotAnchor(index < count ? index : 0);
  }

  getSlots() {
    return this.slots;
  }

  getSlotForShard(shardId: string) {
    return this.slots.find((slot) => slot.shardId === shardId) || null;
  }

  getProximity(shardId: string, position: Vec3Like) {
    const slot = this.getSlotForShard(shardId);
    if (!slot || slot.activated) return 0;
    const distance = distance3(slot.worldPosition, position);
    return Math.max(0, 1 - distance / (slot.snapRadius * 2.75));
  }

  canSnap(shardId: string, position: Vec3Like) {
    const slot = this.getSlotForShard(shardId);
    if (!slot || slot.activated) return null;
    return distance3(slot.worldPosition, position) <= slot.snapRadius ? slot : null;
  }

  activate(slotId: string) {
    const slot = this.getSlotForShard(slotId);
    if (!slot) return null;
    slot.activated = true;
    return slot;
  }

  deactivate(slotId: string) {
    const slot = this.getSlotForShard(slotId);
    if (!slot) return null;
    slot.activated = false;
    return slot;
  }

  reset() {
    this.slots.forEach((slot) => {
      slot.activated = false;
    });
  }

  isUnlocked() {
    return this.slots.every((slot) => slot.activated);
  }
}
