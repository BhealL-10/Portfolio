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
    const diagonalCount = Math.ceil(count / 2);
    const diagonalIndex = index < diagonalCount ? index : index - diagonalCount;
    const t = diagonalCount === 1 ? 0.5 : diagonalIndex / (diagonalCount - 1);
    const spreadX = 12.5;
    const spreadY = 7.6;
    const xBase = -spreadX + spreadX * 2 * t;
    const yBase = spreadY - spreadY * 2 * t;

    if (index < diagonalCount) {
      return {
        x: xBase,
        y: yBase,
        z: -0.8 + diagonalIndex * 0.35
      };
    }

    return {
      x: -xBase,
      y: yBase,
      z: 0.8 - diagonalIndex * 0.35
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

  deactivate(slotId: string) {
    const slot = this.getSlotForShard(slotId);
    if (!slot) return null;
    slot.activated = false;
    return slot;
  }

  isUnlocked() {
    return this.slots.every((slot) => slot.activated);
  }
}
