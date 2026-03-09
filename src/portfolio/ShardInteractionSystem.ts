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
  private pointerDown = false;
  private downX = 0;
  private downY = 0;
  private dragged = false;
  private sceneOrbiting = false;
  private downShardId: string | null = null;
  private focusGesture = false;

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

  private onPointerDown = (event: PointerEvent) => {
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
    const mode = this.getMode();
    const moveX = event.clientX - this.downX;
    const moveY = event.clientY - this.downY;
    const distance = Math.hypot(moveX, moveY);

    if (!this.pointerDown) {
      if (mode === 'orbit' || mode === 'dragging' || mode === 'constellation_complete') {
        const pick = this.world.pick(event.clientX, event.clientY, this.canvas, this.camera);
        this.callbacks.onHover(pick?.shardId || null);
      }
      return;
    }

    if (mode === 'focus' || mode === 'focus_enter') {
      if (Math.abs(moveX) > 12 && Math.abs(moveX) > Math.abs(moveY)) {
        this.focusGesture = true;
        this.callbacks.onFocusRotation(moveX);
      }
      return;
    }

    if ((mode === 'orbit' || mode === 'constellation_complete' || mode === 'dragging') && this.downShardId && distance > 8) {
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

    if ((mode === 'orbit' || mode === 'constellation_complete') && !this.downShardId && distance > 4) {
      this.sceneOrbiting = true;
      this.callbacks.onSceneOrbitMove(moveX, moveY);
    }
  };

  private onPointerUp = (event: PointerEvent) => {
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

    if ((mode === 'orbit' || mode === 'constellation_complete') && distance <= 8) {
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
    if (this.dragged) {
      this.callbacks.onDragEnd();
    }
    this.callbacks.onHover(null);
    this.reset();
  };

  private reset() {
    this.pointerDown = false;
    this.dragged = false;
    this.sceneOrbiting = false;
    this.focusGesture = false;
    this.downShardId = null;
  }
}
