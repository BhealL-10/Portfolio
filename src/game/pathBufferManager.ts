import { getDifficultyProfile } from './difficultyScaler';
import { generatePathNodes } from './pathGenerator';
import { validateTeleportTarget } from './pathValidator';
import type { PathNode, ResolvedPathNode } from './pathTypes';

export class PathBufferManager {
  private nodes: PathNode[] = [];
  private seed = 1;

  reset() {
    this.seed = (Math.random() * 0x7fffffff) | 1;
    this.nodes = [
      {
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
        motionSeed: this.nextRandom() * Math.PI * 2
      }
    ];
  }

  prebuild(initialCount: number) {
    if (this.nodes.length === 0) {
      this.reset();
    }
    this.append(initialCount - this.nodes.length);
  }

  ensureAhead(currentIndex: number, threshold = 50, chunkSize = 120) {
    if (this.nodes.length - currentIndex > threshold) return;
    this.append(chunkSize);
  }

  getInitialPositions(count: number) {
    this.prebuild(count);
    return this.nodes.slice(0, count).map((node) => ({ x: node.x, y: node.y, z: node.z }));
  }

  getWindow(start: number, count: number, elapsedTime: number, currentIndex: number) {
    this.ensureAhead(start + count);
    return this.nodes.slice(start, start + count).map((node) => this.resolveNode(node.index, elapsedTime, currentIndex));
  }

  getNode(index: number) {
    this.ensureAhead(index + 1);
    return this.nodes[index];
  }

  replaceFuture(startIndex: number, nodes: PathNode[]) {
    this.nodes = [...this.nodes.slice(0, startIndex + 1), ...nodes];
  }

  getResolvedNode(index: number, elapsedTime: number, currentIndex: number): ResolvedPathNode {
    this.ensureAhead(index + 1);
    return this.resolveNode(index, elapsedTime, currentIndex);
  }

  getTeleportTarget(fromIndex: number, range: number) {
    this.ensureAhead(fromIndex + range + 60);
    const candidate = Math.min(this.nodes.length - 5, fromIndex + range);
    return validateTeleportTarget(this.nodes, fromIndex, candidate) ? candidate : -1;
  }

  getRemainingBuffer(currentIndex: number) {
    return this.nodes.length - currentIndex;
  }

  private append(count: number) {
    if (count <= 0) return;
    const generated = generatePathNodes(this.nodes, count, () => this.nextRandom());
    this.nodes.push(...generated);
  }

  private resolveNode(index: number, elapsedTime: number, currentIndex: number): ResolvedPathNode {
    const node = this.nodes[index];
    const profile = getDifficultyProfile(index);
    let resolvedX = node.x;
    let resolvedY = node.y;

    if (index > currentIndex + 1 && index >= 50) {
      const phase = elapsedTime * profile.movementSpeed + node.motionSeed + index * 0.15;
      const pattern = index % 3;
      if (pattern === 0) {
        resolvedY += Math.sin(phase) * profile.movementAmplitude;
      } else if (pattern === 1) {
        resolvedX += Math.cos(phase * 0.82) * profile.movementAmplitude * 0.62;
      } else {
        resolvedX += Math.sin(phase * 0.55) * profile.movementAmplitude * 0.38;
        resolvedY += Math.cos(phase) * profile.movementAmplitude * 0.78;
      }
    }

    return {
      ...node,
      resolvedX,
      resolvedY,
      resolvedZ: node.z
    };
  }

  private nextRandom() {
    this.seed = (this.seed * 48271) % 0x7fffffff;
    return this.seed / 0x7fffffff;
  }
}
