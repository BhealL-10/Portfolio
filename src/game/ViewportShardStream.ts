export interface ViewportShardSlot {
  nodeIndex: number | null;
}

export class ViewportShardStream {
  private slots: ViewportShardSlot[] = [];

  reset() {
    this.slots = [];
  }

  ensureCapacity(minimumCapacity: number) {
    while (this.slots.length < minimumCapacity) {
      this.slots.push({ nodeIndex: null });
    }
    return this.slots.length;
  }

  getCapacity() {
    return this.slots.length;
  }

  getNodeIndex(slotIndex: number) {
    return this.slots[slotIndex]?.nodeIndex ?? null;
  }

  getSlots() {
    return this.slots;
  }

  sync(desiredNodeIndices: Iterable<number>, canReleaseNode: (nodeIndex: number) => boolean) {
    const desired = new Set<number>();
    Array.from(desiredNodeIndices)
      .sort((left, right) => left - right)
      .forEach((nodeIndex) => {
        if (nodeIndex >= 0) {
          desired.add(nodeIndex);
        }
      });

    this.slots.forEach((slot) => {
      if (slot.nodeIndex === null || desired.has(slot.nodeIndex)) {
        return;
      }
      if (canReleaseNode(slot.nodeIndex)) {
        slot.nodeIndex = null;
      }
    });

    const alreadyBound = new Set<number>();
    const freeSlots: number[] = [];
    this.slots.forEach((slot, slotIndex) => {
      if (slot.nodeIndex === null) {
        freeSlots.push(slotIndex);
        return;
      }
      alreadyBound.add(slot.nodeIndex);
    });

    desired.forEach((nodeIndex) => {
      if (alreadyBound.has(nodeIndex)) {
        return;
      }
      const freeSlot = freeSlots.shift();
      if (freeSlot === undefined) {
        return;
      }
      this.slots[freeSlot]!.nodeIndex = nodeIndex;
      alreadyBound.add(nodeIndex);
    });
  }
}
