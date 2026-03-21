import type * as THREE from 'three';
import type { AppMode } from '../core/ModeController';
import { OrbitWorldSystem } from './OrbitWorldSystem';

interface InteractionCallbacks {
  onShardClick: (shardId: string) => void;
  onBackgroundClick: () => void;
  onHover: (shardId: string | null) => void;
  onDragStart: (shardId: string, point: THREE.Vector3) => boolean;
  onDragMove: (point: THREE.Vector3) => void;
  onDragEnd: () => void;
  onSceneOrbitMove: (deltaX: number, deltaY: number) => void;
  onFocusRotation: (deltaX: number) => void;
  onFocusRotationEnd: () => void;
  onFocusSideTap: (side: 'left' | 'right') => void;
}

export class ShardInteractionSystem {
  private enabled = true;
  private pointerDown = false;
  private downX = 0;
  private downY = 0;
  private lastX = 0;
  private lastY = 0;
  private pointerDownAt = 0;
  private dragged = false;
  private sceneOrbiting = false;
  private downShardId: string | null = null;
  private focusGesture = false;

  private isCoarsePointer() {
    return window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 900;
  }

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly camera: THREE.Camera,
    private readonly world: OrbitWorldSystem,
    private readonly getMode: () => AppMode,
    private readonly callbacks: InteractionCallbacks
  ) {
    this.canvas.addEventListener('pointerdown', this.onPointerDown);
    this.canvas.addEventListener('pointermove', this.onPointerMove);
    this.canvas.addEventListener('pointerup', this.onPointerUp);
    this.canvas.addEventListener('pointerleave', this.onPointerLeave);
  }

  setEnabled(enabled: boolean) {
    if (this.enabled === enabled) return;
    this.enabled = enabled;
    if (!enabled) {
      this.callbacks.onHover(null);
      this.reset();
    }
  }

  private onPointerDown = (event: PointerEvent) => {
    if (!this.enabled) {
      return;
    }
    const mode = this.getMode();
    if (
      mode === 'intro' ||
      mode === 'intro_shattering' ||
      mode === 'intro_transition' ||
      mode === 'about_section' ||
      mode === 'game_transition' ||
      mode === 'game' ||
      mode === 'game_over'
    ) {
      return;
    }

    this.pointerDown = true;
    this.dragged = false;
    this.sceneOrbiting = false;
    this.focusGesture = false;
    this.downX = event.clientX;
    this.downY = event.clientY;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
    this.pointerDownAt = performance.now();
    this.canvas.setPointerCapture(event.pointerId);

    const pick = this.world.pick(event.clientX, event.clientY, this.canvas, this.camera);
    this.downShardId = pick?.shardId || null;

    if (mode === 'focus' || mode === 'focus_facet_transition' || mode === 'focus_enter') {
      return;
    }

    if (pick) {
      this.callbacks.onHover(pick.shardId);
    }
  };

  private onPointerMove = (event: PointerEvent) => {
    if (!this.enabled) {
      this.callbacks.onHover(null);
      this.reset();
      return;
    }
    const mode = this.getMode();
    const moveX = event.clientX - this.downX;
    const moveY = event.clientY - this.downY;
    const deltaX = event.clientX - this.lastX;
    const deltaY = event.clientY - this.lastY;
    const distance = Math.hypot(moveX, moveY);

    if (!this.pointerDown) {
      if (mode === 'orbit' || mode === 'dragging' || mode === 'constellation_complete') {
        const pick = this.world.pick(event.clientX, event.clientY, this.canvas, this.camera);
        this.callbacks.onHover(pick?.shardId || null);
      }
      return;
    }

    if (mode === 'focus' || mode === 'focus_enter') {
      const focusThreshold = this.isCoarsePointer() ? 18 : 12;
      if (Math.abs(moveX) > focusThreshold && Math.abs(moveX) > Math.abs(moveY)) {
        this.focusGesture = true;
        this.callbacks.onFocusRotation(moveX);
      }
      return;
    }

    const pointerBias = this.isCoarsePointer() ? 1.65 : 1;
    const dragThreshold = (this.downShardId ? this.world.getDragThreshold(this.downShardId) : 8) * pointerBias;
    const heldFor = performance.now() - this.pointerDownAt;

    if ((mode === 'orbit' || mode === 'constellation_complete') && this.isCoarsePointer() && this.downShardId && !this.dragged) {
      if (heldFor >= 160 && distance > dragThreshold) {
        const point = this.world.projectPointerToDragPlane(event.clientX, event.clientY, this.canvas, this.camera);
        if (!point) return;
        this.dragged = this.callbacks.onDragStart(this.downShardId, point);
        if (this.dragged) {
          this.callbacks.onDragMove(point);
        }
        return;
      }

      if (distance > 10) {
        this.sceneOrbiting = true;
        this.callbacks.onSceneOrbitMove(deltaX, deltaY);
        this.lastX = event.clientX;
        this.lastY = event.clientY;
        return;
      }
    }

    if ((mode === 'orbit' || mode === 'constellation_complete' || mode === 'dragging') && this.downShardId && distance > dragThreshold) {
      const point = this.world.projectPointerToDragPlane(event.clientX, event.clientY, this.canvas, this.camera);
      if (!point) return;

      if (!this.dragged) {
        this.dragged = this.callbacks.onDragStart(this.downShardId, point);
      }

      if (this.dragged) {
        this.callbacks.onDragMove(point);
      }
      return;
    }

    if ((mode === 'orbit' || mode === 'constellation_complete') && !this.downShardId && distance > (this.isCoarsePointer() ? 9 : 4)) {
      this.sceneOrbiting = true;
      this.callbacks.onSceneOrbitMove(deltaX, deltaY);
    }

    this.lastX = event.clientX;
    this.lastY = event.clientY;
  };

  private onPointerUp = (event: PointerEvent) => {
    if (!this.enabled) {
      this.callbacks.onHover(null);
      this.reset();
      return;
    }
    const mode = this.getMode();
    const distance = Math.hypot(event.clientX - this.downX, event.clientY - this.downY);

    if (this.canvas.hasPointerCapture(event.pointerId)) {
      this.canvas.releasePointerCapture(event.pointerId);
    }

    if (this.dragged) {
      this.callbacks.onDragEnd();
      this.reset();
      return;
    }

    if (mode === 'focus' || mode === 'focus_enter') {
      if (this.focusGesture) {
        this.callbacks.onFocusRotationEnd();
      } else {
        const pick = this.world.pick(event.clientX, event.clientY, this.canvas, this.camera);
        if (pick && pick.shardId === this.world.getFocusedEntityId()) {
          this.callbacks.onFocusSideTap(event.clientX < window.innerWidth / 2 ? 'left' : 'right');
        } else {
          this.callbacks.onBackgroundClick();
        }
      }

      this.reset();
      return;
    }

    if (this.sceneOrbiting) {
      this.reset();
      return;
    }

    if ((mode === 'orbit' || mode === 'constellation_complete') && distance <= (this.isCoarsePointer() ? 14 : 8)) {
      const pick = this.world.pick(event.clientX, event.clientY, this.canvas, this.camera);
      if (pick) {
        this.callbacks.onShardClick(pick.shardId);
      } else {
        this.callbacks.onHover(null);
      }
    }

    this.reset();
  };

  private onPointerLeave = () => {
    if (!this.enabled) {
      this.callbacks.onHover(null);
      this.reset();
      return;
    }
    if (this.dragged) {
      this.callbacks.onDragEnd();
    }
    this.callbacks.onHover(null);
    this.reset();
  };

  reset() {
    this.pointerDown = false;
    this.dragged = false;
    this.sceneOrbiting = false;
    this.focusGesture = false;
    this.downShardId = null;
    this.lastX = 0;
    this.lastY = 0;
    this.pointerDownAt = 0;
  }
}
