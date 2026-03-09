import { distance3, type Vec3Like } from '../core/math';
import type { SecretSlot } from '../types/content';

export class SecretSlotSystem {
  private slots: SecretSlot[];

  constructor(shardIds: string[]) {
    this.slots = shardIds.map((shardId, index, all) => ({
      shardId,
      worldPosition: SecretSlotSystem.computePosition(index, all.length),
      snapRadius: 2.35,
      activated: false
    }));
  }

  static computePosition(index: number, count: number) {
    const angle = -Math.PI / 2 + (index / count) * Math.PI * 2;
    const radius = 16 + (index % 2 === 0 ? 0 : 2.25);

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.58 - 1.2,
      z: Math.sin(angle * 2.1) * 1.8
    };
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
    return Math.max(0, 1 - distance / (slot.snapRadius * 2.2));
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

  isUnlocked() {
    return this.slots.every((slot) => slot.activated);
  }
}
