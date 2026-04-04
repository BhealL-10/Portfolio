import { distance3, type Vec3Like } from '../core/math';
import type { SecretSlot } from '../types/content';

const SECRET_SLOT_LAYOUT = [
  { slotIndex: 1, x: 0.8922, y: 0.3714, animated: true },
  { slotIndex: 2, x: 0.8715, y: 0.0259, animated: true },
  { slotIndex: 3, x: 0.1331, y: 0.2453, animated: true },
  { slotIndex: 4, x: 0.1539, y: 0.032, animated: true },
  { slotIndex: 5, x: 0.6604, y: 0.1969, animated: false },
  { slotIndex: 6, x: 0.3452, y: 0.1969, animated: false }
] as const;

export class SecretSlotSystem {
  private slots: SecretSlot[];

  constructor(shardIds: string[]) {
    this.slots = shardIds.slice(0, SECRET_SLOT_LAYOUT.length).map((shardId, index) => {
      const layout = SECRET_SLOT_LAYOUT[index]!;
      return {
        shardId,
        slotIndex: layout.slotIndex,
        animated: layout.animated,
        normalizedPosition: { x: layout.x, y: layout.y },
        worldPosition: SecretSlotSystem.computePosition(index),
        snapRadius: 3.05,
        activated: false,
        state: 'hidden'
      };
    });
  }

  static computePosition(index: number) {
    const layout = SECRET_SLOT_LAYOUT[index] ?? SECRET_SLOT_LAYOUT[0]!;
    return {
      x: (layout.x - 0.5) * 12,
      y: (0.5 - layout.y) * 12,
      z: 0.18
    };
  }

  getSlots() {
    return this.slots;
  }

  getSlotForShard(shardId: string) {
    return this.slots.find((slot) => slot.shardId === shardId) || null;
  }

  setWorldPosition(shardId: string, position: Vec3Like) {
    const slot = this.getSlotForShard(shardId);
    if (!slot) return null;
    slot.worldPosition = { x: position.x, y: position.y, z: position.z };
    return slot;
  }

  setPreviewing(shardId: string, previewing: boolean) {
    const slot = this.getSlotForShard(shardId);
    if (!slot || slot.activated) return null;
    slot.state = previewing ? 'preview_forward' : slot.state === 'unlocking_reverse' ? 'unlocking_reverse' : 'hidden';
    return slot;
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
    slot.state = 'locked';
    return slot;
  }

  deactivate(slotId: string) {
    const slot = this.getSlotForShard(slotId);
    if (!slot) return null;
    slot.activated = false;
    slot.state = 'unlocking_reverse';
    return slot;
  }

  hide(slotId: string) {
    const slot = this.getSlotForShard(slotId);
    if (!slot || slot.activated) return null;
    slot.state = 'hidden';
    return slot;
  }

  reset() {
    this.slots.forEach((slot) => {
      slot.activated = false;
      slot.state = 'hidden';
    });
  }

  isUnlocked() {
    return this.slots.every((slot) => slot.activated);
  }
}
