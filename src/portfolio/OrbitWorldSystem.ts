import * as THREE from 'three';
import { getSharedTextureAsset } from '../core/browserAssetCache';
import { isMobilePortraitRuntime, isMobileRuntime } from '../core/device';
import { damp, wrapIndex } from '../core/math';
import { getThemeNonShardHex } from '../core/themePalette';
import type { AppMode } from '../core/ModeController';
import { SpriteSheetPlane } from '../game/SpriteSheetPlane';
import type { PortfolioProject, ThemeMode } from '../types/content';
import type { VisiblePlatformVisual } from '../game/gameSessionTypes';
import { SecretSlotSystem } from './SecretSlotSystem';
import {
  createDeformMaterial,
  createFragmentedIcosahedronGeometry,
  createFragmentedRoundedRectGeometry,
  createFragmentedSphereGeometry,
  createFragmentedTriangularPrismGeometry,
  setDeformMaterialTheme,
  updateDeformUniforms,
  type DeformMaterial
} from './shardMaterial';
import { getPortfolioAnchor } from './shardLayout';

type RuntimeState = 'orbiting' | 'hovered' | 'dragging' | 'snapped' | 'focus_enter' | 'focused' | 'focus_exit';

interface ShardEntity {
  project: PortfolioProject;
  group: THREE.Group;
  core: THREE.Mesh<THREE.BufferGeometry, DeformMaterial>;
  logoPlanes: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[];
  layoutAnchor: THREE.Vector3;
  orbitRadius: number;
  orbitPhase: number;
  orbitSpeed: number;
  orbitBoost: number;
  orbitBoostTarget: number;
  orbitHeight: number;
  orbitDepth: number;
  velocity: THREE.Vector3;
  dragTarget: THREE.Vector3;
  dragOffset: THREE.Vector3;
  hoverAmount: number;
  dragAmount: number;
  focusAmount: number;
  opacity: number;
  activeFacet: number;
  runtimeState: RuntimeState;
  snapped: boolean;
  slotIndicator: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>;
  slotPulse: number;
  manualRotationY: number;
  facetAnimation: {
    active: boolean;
    direction: -1 | 1;
    progress: number;
    swapped: boolean;
  };
  hiddenUntil: number;
  accentRing: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>;
  iconPlane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
}

interface PickResult {
  shardId: string;
  point: THREE.Vector3;
}

interface GameFieldEntity {
  group: THREE.Group;
  core: THREE.Mesh<THREE.BufferGeometry, DeformMaterial>;
  accentRing: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>;
  iconPlane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  logoPlanes: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[];
  anchor: THREE.Vector3;
  orbitPhase: number;
  orbitSpeed: number;
  orbitRadius: number;
  hiddenUntil: number;
  logoKey: string | null;
}

const ORBIT_CAMERA_POSITION = new THREE.Vector3(0, 0.88, 28.8);
const MINI_SHARDS_PER_SLOT = 4;
const DEFAULT_MINI_LOGO_TEXTURE = new URL('../../assets/images/shared/branding/ape-prod-mark-dark.svg', import.meta.url).href;
const SHARDLOCK_BASE_TEXTURE = new URL('../../assets/images/portfolio/projects/shardlogolock/shardlock-base.png', import.meta.url).href;
const SHARDLOCK_SLOT_SPRITES = {
  1: new URL('../../assets/images/portfolio/projects/shardlogolock/shardlock-sprite-1.png', import.meta.url).href,
  2: new URL('../../assets/images/portfolio/projects/shardlogolock/shardlock-sprite-2.png', import.meta.url).href,
  3: new URL('../../assets/images/portfolio/projects/shardlogolock/shardlock-sprite-3.png', import.meta.url).href,
  4: new URL('../../assets/images/portfolio/projects/shardlogolock/shardlock-sprite-4.png', import.meta.url).href
} as const;
const SHARDLOCK_BASE_SIZE = 14.6;
const SHARDLOCK_BASE_POSITION = new THREE.Vector3(0, 0.8, 0.18);
const SLOT_PREVIEW_FRAME_DURATION = 0.58;
const SLOT_UNLOCK_FRAME_DURATION = 0.14;
const SLOT_MINI_SHARD_COUNT = MINI_SHARDS_PER_SLOT;
const ORBITING_SHARD_SCALE = 0.68;
const ACTIVE_ORBITING_SHARD_SCALE = 0.76;
const DRAGGING_SHARD_SCALE = 0.82;
const SLOT_PREVIEW_SHARD_SCALE = 0.64;
const SNAPPED_SHARD_SCALE = 0.58;

interface SlotVisualRuntime {
  shardId: string;
  anchor: THREE.Object3D;
  sprite: SpriteSheetPlane | null;
  state: 'hidden' | 'preview_forward' | 'locked' | 'unlocking_reverse';
  stateElapsed: number;
  wasActivated: boolean;
  currentFrame: number;
}

export class OrbitWorldSystem {
  private readonly root = new THREE.Group();
  private readonly raycaster = new THREE.Raycaster();
  private readonly dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  private readonly interactionPlanePoint = new THREE.Vector3();
  private readonly entities = new Map<string, ShardEntity>();
  private readonly entityList: ShardEntity[];
  private readonly pickTargets: THREE.Object3D[] = [];
  private readonly pointer = new THREE.Vector2();
  private readonly backgroundPoints: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;
  private readonly focusTargetPosition = new THREE.Vector3(0, 0.03, 10.2);
  private readonly focusCameraPosition = new THREE.Vector3(0, 0.26, 21.8);
  private readonly focusCameraLookAt = new THREE.Vector3();
  private readonly cameraReferencePosition = new THREE.Vector3(0, 0.88, 28.8);
  private readonly focusCameraForward = new THREE.Vector3(0, 0, -1);
  private readonly pivot = new THREE.Vector3(0, 0, 0);
  private readonly roundGeometry = createFragmentedIcosahedronGeometry(1.25, 4);
  private readonly miniShardGeometry = createFragmentedIcosahedronGeometry(1.02, 10);
  private readonly ovalGeometry = createFragmentedSphereGeometry(1.18, 18, 14);
  private readonly triangularGeometry = createFragmentedTriangularPrismGeometry(1.24, 1.48);
  private readonly focusGeometry = createFragmentedRoundedRectGeometry(2.08, 1.34, 0.24, 0.22);
  private readonly focusWaveGeometry = createFragmentedRoundedRectGeometry(2.04, 1.38, 0.42, 0.36);
  private readonly constellationLines: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>[];
  private readonly gameFieldEntities: GameFieldEntity[];
  private readonly shardLockGroup = new THREE.Group();
  private readonly shardLockBase: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private readonly shardLockSlots = new Map<string, SlotVisualRuntime>();
  private readonly cameraFacingAnchor = new THREE.Object3D();
  private shardLockTransitionActive = false;
  private shardLockTransitionProgress = 0;
  private globalOrbitTime = 0;
  private hoveredId: string | null = null;
  private focusedId: string | null = null;
  private draggingId: string | null = null;
  private activeIndex = 0;
  private theme: ThemeMode;
  private focusSettled = false;
  private focusReadyAt = 0;
  private activeLookAt = new THREE.Vector3();
  private externalLayoutActive = false;
  private externalLayoutPositions: THREE.Vector3[] | null = null;
  private externalLayoutScales: number[] | null = null;
  private externalLayoutVisuals: VisiblePlatformVisual[] | null = null;
  private externalTransitionFrom: THREE.Vector3[] = [];
  private externalTransitionTo: THREE.Vector3[] = [];
  private externalTransitionProgress = 0;
  private externalTransitionDelays: number[] = [];
  private speedAccentTimer = 36;
  private speedAccentId: string | null = null;
  private nextFocusWaveAt = 0;
  private focusWaveUntil = 0;
  private unlockCallbacks = new Set<() => void>();
  private readonly slotPreviewIds = new Set<string>();
  private readonly iconTextureCache = new Map<string, THREE.Texture>();

  private getGameGeometry(shapeKind: VisiblePlatformVisual['shapeKind'] | 'round') {
    if (shapeKind === 'oval') return this.ovalGeometry;
    if (shapeKind === 'triangular') return this.triangularGeometry;
    return this.roundGeometry;
  }

  constructor(
    private readonly scene: THREE.Scene,
    projects: PortfolioProject[],
    private readonly slotSystem: SecretSlotSystem,
    theme: ThemeMode
  ) {
    this.theme = theme;
    this.scene.add(this.root);
    this.backgroundPoints = this.createBackgroundPoints();
    this.scene.add(this.backgroundPoints);
    this.constellationLines = this.createConstellationLines();
    this.shardLockBase = this.createShardLockBase();
    this.root.add(this.shardLockGroup);
    this.shardLockGroup.add(this.shardLockBase);
    this.initializeShardLockSlots();
    this.entityList = projects.map((project, index) => this.createShard(project, index));
    this.gameFieldEntities = Array.from({ length: Math.max(1, this.slotSystem.getSlots().length * MINI_SHARDS_PER_SLOT) }, (_, index) =>
      this.createGameFieldShard(index)
    );
  }

  setTheme(theme: ThemeMode) {
    this.theme = theme;
    this.entityList.forEach((entity) => {
      setDeformMaterialTheme(entity.core.material, theme);
      this.updateLogoTexture(entity);
      entity.slotIndicator.material.color.set(getThemeNonShardHex(theme));
      entity.slotIndicator.visible = false;
      entity.iconPlane.visible = false;
    });
    this.gameFieldEntities.forEach((entity) => {
      setDeformMaterialTheme(entity.core.material, theme);
    });
    this.backgroundPoints.material.color.set(getThemeNonShardHex(theme));
    this.constellationLines.forEach((line) => line.material.color.set(getThemeNonShardHex(theme)));
  }

  setActiveIndex(index: number) {
    this.activeIndex = wrapIndex(index, this.entityList.length);
  }

  setHovered(shardId: string | null) {
    this.hoveredId = shardId;
  }

  setFocused(shardId: string | null) {
    this.focusedId = shardId;
    this.focusSettled = false;
    this.focusReadyAt = shardId ? this.globalOrbitTime + 1.08 : 0;
    this.nextFocusWaveAt = 0;
    this.focusWaveUntil = 0;
    this.entityList.forEach((entity) => {
      if (shardId && entity.project.id === shardId) {
        entity.runtimeState = 'focus_enter';
      } else if (entity.runtimeState !== 'dragging') {
        entity.runtimeState = entity.snapped ? 'snapped' : 'orbiting';
      }
    });
  }

  isFocusSettled() {
    return this.focusSettled && this.globalOrbitTime >= this.focusReadyAt;
  }

  clearFocus() {
    this.focusedId = null;
    this.focusSettled = false;
    this.focusReadyAt = 0;
    this.focusWaveUntil = 0;
    this.entityList.forEach((entity) => {
      entity.runtimeState = entity.snapped ? 'snapped' : 'focus_exit';
      entity.manualRotationY = 0;
    });
  }

  getFocusedProject() {
    return this.focusedId ? this.entities.get(this.focusedId)?.project || null : null;
  }

  getFocusedFacetIndex() {
    return this.focusedId ? this.entities.get(this.focusedId)?.activeFacet ?? 0 : 0;
  }

  changeFacet(direction: -1 | 1) {
    if (!this.focusedId) return null;
    const entity = this.entities.get(this.focusedId);
    if (!entity || entity.facetAnimation.active) return null;

    entity.facetAnimation = {
      active: true,
      direction,
      progress: 0,
      swapped: false
    };
    this.focusWaveUntil = Math.max(this.focusWaveUntil, this.globalOrbitTime + 1.35);

    return entity.project.id;
  }

  previewFacetRotation(deltaX: number) {
    if (!this.focusedId) return;
    const entity = this.entities.get(this.focusedId);
    if (!entity || entity.facetAnimation.active) return;
    entity.manualRotationY = THREE.MathUtils.clamp(deltaX * 0.007, -Math.PI / 6, Math.PI / 6);
  }

  finishFacetRotation() {
    if (!this.focusedId) return 0;
    const entity = this.entities.get(this.focusedId);
    if (!entity || entity.facetAnimation.active) return 0;

    if (Math.abs(entity.manualRotationY) > Math.PI / 8) {
      const direction = entity.manualRotationY > 0 ? 1 : -1;
      entity.manualRotationY = 0;
      this.changeFacet(direction);
      return direction;
    }

    entity.manualRotationY = 0;
    return 0;
  }

  beginDrag(shardId: string, intersectionPoint: THREE.Vector3) {
    if (this.focusedId) return false;

    const entity = this.entities.get(shardId);
    if (!entity) return false;
    if (!this.slotSystem.getSlotForShard(shardId)) return false;

    this.slotPreviewIds.delete(shardId);

    if (entity.snapped) {
      entity.snapped = false;
      this.slotSystem.deactivate(entity.project.id);
    }

    this.draggingId = shardId;
    entity.runtimeState = 'dragging';
    entity.dragOffset.copy(entity.group.position).sub(intersectionPoint);
    entity.dragTarget.copy(entity.group.position);
    this.dragPlane.constant = -entity.group.position.z;
    return true;
  }

  updateDrag(point: THREE.Vector3) {
    if (!this.draggingId) return 0;

    const entity = this.entities.get(this.draggingId);
    if (!entity) return 0;

    entity.dragTarget.copy(point).add(entity.dragOffset);
    entity.dragTarget.z = entity.group.position.z;
    const slot = this.slotSystem.getSlotForShard(entity.project.id);
    const proximity = this.slotSystem.getProximity(entity.project.id, entity.dragTarget);

    if (slot && proximity > 0) {
      const magnetStrength = THREE.MathUtils.clamp(0.12 + proximity * proximity * 0.62, 0.12, 0.74);
      entity.dragTarget.x = THREE.MathUtils.lerp(entity.dragTarget.x, slot.worldPosition.x, magnetStrength);
      entity.dragTarget.y = THREE.MathUtils.lerp(entity.dragTarget.y, slot.worldPosition.y, magnetStrength);
      entity.dragTarget.z = THREE.MathUtils.lerp(entity.dragTarget.z, slot.worldPosition.z, magnetStrength);
    }

    return proximity;
  }

  endDrag() {
    if (!this.draggingId) {
      return { snapped: false, unlocked: false, shardId: null as string | null };
    }

    const entity = this.entities.get(this.draggingId)!;
    const slot = this.slotSystem.canSnap(entity.project.id, entity.dragTarget);

    let unlocked = false;
    if (slot) {
      entity.snapped = true;
      entity.runtimeState = 'snapped';
      entity.dragTarget.set(slot.worldPosition.x, slot.worldPosition.y, slot.worldPosition.z);
      entity.velocity.set(0, 0, 0);
      this.slotSystem.activate(entity.project.id);
      if (this.slotSystem.isUnlocked()) {
        unlocked = true;
        this.unlockCallbacks.forEach((callback) => callback());
      }
    } else {
      entity.runtimeState = 'orbiting';
    }

    const result = {
      snapped: Boolean(slot),
      unlocked,
      shardId: this.draggingId
    };

    this.draggingId = null;
    return result;
  }

  pick(clientX: number, clientY: number, canvas: HTMLCanvasElement, camera: THREE.Camera) {
    const rect = canvas.getBoundingClientRect();
    this.pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, camera);
    const hits = this.raycaster.intersectObjects(this.pickTargets, false);
    const first = hits.find((hit) => {
      const shardId = hit.object.userData.shardId as string | undefined;
      if (!shardId) return false;
      if (this.focusedId) {
        return shardId === this.focusedId;
      }
      return true;
    });
    const projectedPick = this.pickByScreenProximity(clientX, clientY, canvas, camera);
    if (projectedPick && (!first || projectedPick.distance <= 62)) {
      return {
        shardId: projectedPick.shardId,
        point: projectedPick.point
      } satisfies PickResult;
    }
    if (!first) return null;

    return {
      shardId: first.object.userData.shardId as string,
      point: first.point.clone()
    } satisfies PickResult;
  }

  private pickByScreenProximity(
    clientX: number,
    clientY: number,
    canvas: HTMLCanvasElement,
    camera: THREE.Camera
  ): { shardId: string; point: THREE.Vector3; distance: number } | null {
    const rect = canvas.getBoundingClientRect();
    const coarsePointer = isMobileRuntime();
    let best: { shardId: string; point: THREE.Vector3; distance: number } | null = null;
    const worldPosition = new THREE.Vector3();
    const projected = new THREE.Vector3();

    this.entityList.forEach((entity) => {
      if (!entity.group.visible) return;
      if (this.focusedId && entity.project.id !== this.focusedId) return;
      entity.group.getWorldPosition(worldPosition);
      projected.copy(worldPosition).project(camera);
      if (projected.z < -1 || projected.z > 1) return;
      const screenX = rect.left + ((projected.x + 1) * 0.5) * rect.width;
      const screenY = rect.top + ((1 - projected.y) * 0.5) * rect.height;
      const distance = Math.hypot(clientX - screenX, clientY - screenY);
      const threshold = (coarsePointer ? 88 : 58) * Math.max(0.92, entity.group.scale.x * 0.44);
      if (distance > threshold) return;
      if (!best || distance < best.distance) {
        best = {
          shardId: entity.project.id,
          point: worldPosition.clone(),
          distance
        };
      }
    });

    return best;
  }

  projectPointerToDragPlane(clientX: number, clientY: number, canvas: HTMLCanvasElement, camera: THREE.Camera) {
    const rect = canvas.getBoundingClientRect();
    this.pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, camera);
    return this.raycaster.ray.intersectPlane(this.dragPlane, this.interactionPlanePoint.clone());
  }

  getProjectAt(index: number) {
    return this.entityList[wrapIndex(index, this.entityList.length)]?.project || null;
  }

  getPivot() {
    return this.pivot.clone();
  }

  getOrbitCameraPose() {
    this.activeLookAt.copy(this.pivot);
    return {
      position: ORBIT_CAMERA_POSITION,
      lookAt: this.activeLookAt.clone()
    };
  }

  getCameraAlignedTransitionAnchor(distance = 11.8) {
    return this.cameraReferencePosition.clone().addScaledVector(this.focusCameraForward, distance);
  }

  setFocusCameraReference(cameraPosition: THREE.Vector3, lookAt: THREE.Vector3) {
    this.cameraReferencePosition.copy(cameraPosition);
    this.focusCameraLookAt.copy(lookAt);
    this.focusCameraForward.copy(lookAt).sub(cameraPosition).normalize();
    this.focusTargetPosition.copy(cameraPosition).addScaledVector(this.focusCameraForward, 12.2);
    this.focusTargetPosition.y += 0.18;
    this.focusCameraPosition.copy(cameraPosition).addScaledVector(this.focusCameraForward, -0.78);
    this.focusCameraPosition.y += 0.12;
  }

  getFocusCameraPose() {
    const focused = this.focusedId ? this.entities.get(this.focusedId) : null;
    return {
      position: this.focusCameraPosition.clone(),
      lookAt: focused?.group.position.clone() || this.focusTargetPosition.clone()
    };
  }

  private applyCameraFacingRotation(entity: ShardEntity, deltaTime: number, damping: number, rotateForPortrait = false) {
    this.cameraFacingAnchor.position.copy(entity.group.position);
    this.cameraFacingAnchor.lookAt(this.focusCameraPosition);
    if (rotateForPortrait && isMobilePortraitRuntime()) {
      this.cameraFacingAnchor.rotateZ(Math.PI * 0.5);
    }
    entity.group.quaternion.slerp(
      this.cameraFacingAnchor.quaternion,
      THREE.MathUtils.clamp(damping * deltaTime, 0, 1)
    );
  }

  getFocusedEntityId() {
    return this.focusedId;
  }

  isShardSnapped(shardId: string) {
    return this.entities.get(shardId)?.snapped ?? false;
  }

  releaseShardFromSlot(shardId: string) {
    const entity = this.entities.get(shardId);
    if (!entity?.snapped) {
      return false;
    }
    entity.snapped = false;
    this.slotSystem.deactivate(shardId);
    entity.runtimeState = 'orbiting';
    entity.velocity.set(0, 0, 0);
    entity.dragTarget.copy(entity.group.position);
    return true;
  }

  onUnlocked(callback: () => void) {
    this.unlockCallbacks.add(callback);
    return () => this.unlockCallbacks.delete(callback);
  }

  setShardLockTransition(active: boolean, progress: number) {
    this.shardLockTransitionActive = active;
    this.shardLockTransitionProgress = THREE.MathUtils.clamp(progress, 0, 1);
  }

  activateSlotPreview() {
    this.slotPreviewIds.clear();
    this.entityList.forEach((entity) => {
      if (!this.slotSystem.getSlotForShard(entity.project.id)) {
        return;
      }
      this.slotPreviewIds.add(entity.project.id);
      entity.snapped = false;
      if (!this.focusedId && entity.runtimeState !== 'dragging') {
        entity.runtimeState = 'orbiting';
      }
    });
  }

  activateSlotPreviewForShard(shardId: string) {
    if (!this.entities.has(shardId) || !this.slotSystem.getSlotForShard(shardId)) return;
    this.slotPreviewIds.add(shardId);
    const entity = this.entities.get(shardId);
    if (entity && !entity.snapped && !this.focusedId && entity.runtimeState !== 'dragging') {
      entity.runtimeState = 'orbiting';
    }
  }

  snapShardToSlot(shardId: string) {
    const entity = this.entities.get(shardId);
    const slot = this.slotSystem.getSlotForShard(shardId);
    if (!entity || !slot) return false;

    this.slotPreviewIds.delete(shardId);
    entity.snapped = true;
    entity.runtimeState = 'snapped';
    entity.dragTarget.set(slot.worldPosition.x, slot.worldPosition.y, slot.worldPosition.z);
    entity.group.position.set(slot.worldPosition.x, slot.worldPosition.y, slot.worldPosition.z);
    entity.velocity.set(0, 0, 0);
    this.slotSystem.activate(shardId);

    if (this.slotSystem.isUnlocked()) {
      this.unlockCallbacks.forEach((callback) => callback());
      return true;
    }

    return false;
  }

  clearSlotPreview() {
    this.slotPreviewIds.clear();
  }

  getPresentationProjectId() {
    return this.entityList.find((entity) => entity.project.role === 'presentation')?.project.id ?? null;
  }

  getDragThreshold(shardId: string) {
    const entity = this.entities.get(shardId);
    if (!entity) return 8;
    if (entity.snapped) return 4;
    return 8;
  }

  getCurrentShardPositions() {
    return this.entityList.map((entity) => entity.group.position.clone());
  }

  getGameFieldCapacity() {
    return this.entityList.length + this.gameFieldEntities.length;
  }

  ensureGameFieldCapacity(totalCount: number) {
    const requiredExtraCount = Math.max(0, totalCount - this.entityList.length);
    while (this.gameFieldEntities.length < requiredExtraCount) {
      this.gameFieldEntities.push(this.createGameFieldShard(this.gameFieldEntities.length));
    }
  }

  getOrbitPositions() {
    return this.resolveMinimumSpacing(
      this.entityList.map((entity, index) => this.computeOrbitTarget(entity, this.globalOrbitTime, index === this.activeIndex))
    );
  }

  getSlotPositions() {
    return this.entityList.map((entity) => {
      const slot = this.slotSystem.getSlotForShard(entity.project.id);
      return slot ? new THREE.Vector3(slot.worldPosition.x, slot.worldPosition.y, slot.worldPosition.z) : entity.group.position.clone();
    });
  }

  beginSingleNodeExternalLayoutTransition(position: THREE.Vector3, visual: VisiblePlatformVisual, visibleIndex = 0) {
    const layout = this.buildSingleNodeExternalLayout(position, visual, visibleIndex);
    this.beginExternalLayoutTransition(layout.positions, layout.scales, layout.visuals, {
      staggerVisibleIndex: visibleIndex,
      reverseStagger: true
    });
  }

  beginExternalLayoutTransition(
    targets: THREE.Vector3[],
    scales?: number[],
    visuals?: VisiblePlatformVisual[],
    options?: { staggerVisibleIndex?: number | null; reverseStagger?: boolean }
  ) {
    const previousExternalPositions = this.externalLayoutPositions?.map((position) => position.clone()) ?? null;
    this.externalLayoutActive = true;
    this.externalLayoutPositions = null;
    this.externalLayoutScales = scales ? [...scales] : null;
    this.externalLayoutVisuals = visuals ? visuals.map((visual) => ({
      scale: visual.scale.clone(),
      shapeKind: visual.shapeKind,
      spinDirection: visual.spinDirection,
      spinSpeed: visual.spinSpeed,
      spinPhase: visual.spinPhase,
      tint: visual.tint,
      ringTint: visual.ringTint,
      ringScale: visual.ringScale,
      stripeTint: visual.stripeTint,
      stripeMix: visual.stripeMix,
      stripePhase: visual.stripePhase,
      pulse: visual.pulse,
      deformAngle: visual.deformAngle,
      deformStrength: visual.deformStrength,
      deformDensity: visual.deformDensity,
      fragmentAmount: visual.fragmentAmount,
      iconSrc: visual.iconSrc,
      iconText: visual.iconText,
      iconTint: visual.iconTint,
      iconScale: visual.iconScale
    })) : null;
    this.externalTransitionFrom = previousExternalPositions ?? this.getCurrentShardPositions();
    this.externalTransitionTo = targets.map((target) => target.clone());
    this.externalTransitionProgress = 0;
    this.externalTransitionDelays = this.buildExternalTransitionDelays(
      targets.length,
      options?.staggerVisibleIndex ?? null,
      options?.reverseStagger ?? false
    );
  }

  setExternalLayoutProgress(progress: number) {
    this.externalTransitionProgress = progress;
  }

  setExternalLayoutPositions(positions: THREE.Vector3[], scales?: number[], visuals?: VisiblePlatformVisual[]) {
    this.externalLayoutActive = true;
    this.externalLayoutPositions = positions.map((position) => position.clone());
    this.externalLayoutScales = scales ? [...scales] : null;
    this.externalLayoutVisuals = visuals ? visuals.map((visual) => ({
      scale: visual.scale.clone(),
      shapeKind: visual.shapeKind,
      spinDirection: visual.spinDirection,
      spinSpeed: visual.spinSpeed,
      spinPhase: visual.spinPhase,
      tint: visual.tint,
      ringTint: visual.ringTint,
      ringScale: visual.ringScale,
      stripeTint: visual.stripeTint,
      stripeMix: visual.stripeMix,
      stripePhase: visual.stripePhase,
      pulse: visual.pulse,
      deformAngle: visual.deformAngle,
      deformStrength: visual.deformStrength,
      deformDensity: visual.deformDensity,
      fragmentAmount: visual.fragmentAmount,
      iconSrc: visual.iconSrc,
      iconText: visual.iconText,
      iconTint: visual.iconTint,
      iconScale: visual.iconScale
    })) : null;
    this.externalTransitionDelays = [];
  }

  setSingleNodeExternalLayout(position: THREE.Vector3, visual: VisiblePlatformVisual, visibleIndex = 0) {
    const layout = this.buildSingleNodeExternalLayout(position, visual, visibleIndex);
    this.setExternalLayoutPositions(layout.positions, layout.scales, layout.visuals);
  }

  clearExternalLayout() {
    this.externalLayoutActive = false;
    this.externalLayoutPositions = null;
    this.externalLayoutScales = null;
    this.externalLayoutVisuals = null;
    this.externalTransitionFrom = [];
    this.externalTransitionTo = [];
    this.externalTransitionProgress = 0;
    this.externalTransitionDelays = [];
    this.gameFieldEntities.forEach((entity) => {
      entity.group.visible = false;
      entity.hiddenUntil = 0;
    });
  }

  releaseSnappedShards() {
    this.entityList.forEach((entity) => {
      entity.snapped = false;
      if (this.slotSystem.getSlotForShard(entity.project.id)) {
        this.slotSystem.deactivate(entity.project.id);
      }
      if (!this.focusedId && entity.runtimeState !== 'dragging') {
        entity.runtimeState = 'orbiting';
      }
    });
  }

  resetPortfolioState() {
    this.hoveredId = null;
    this.focusedId = null;
    this.draggingId = null;
    this.focusSettled = false;
    this.clearExternalLayout();
    this.clearSlotPreview();
    this.entityList.forEach((entity) => {
      entity.snapped = false;
      entity.runtimeState = 'orbiting';
      entity.manualRotationY = 0;
      entity.hoverAmount = 0;
      entity.dragAmount = 0;
      entity.focusAmount = 0;
      entity.opacity = 1;
      entity.slotPulse = 0;
      entity.facetAnimation = {
        active: false,
        direction: 1,
        progress: 0,
        swapped: false
      };
      entity.hiddenUntil = 0;
      entity.dragTarget.copy(entity.group.position);
      entity.dragOffset.set(0, 0, 0);
      entity.velocity.set(0, 0, 0);
    });
    this.updateConstellationLines();
  }

  setVisible(visible: boolean) {
    this.root.visible = visible;
    this.backgroundPoints.visible = visible;
  }

  update(deltaTime: number, elapsedTime: number, mode: AppMode) {
    this.globalOrbitTime += deltaTime;
    this.backgroundPoints.rotation.z += deltaTime * 0.012;
    this.backgroundPoints.rotation.y += deltaTime * 0.02;
    this.syncLivePivot(elapsedTime);
    this.updateShardLockTotem(deltaTime, elapsedTime);
    if (this.focusedId) {
      if (this.nextFocusWaveAt <= 0) {
        this.nextFocusWaveAt = elapsedTime + 5 + Math.random() * 10;
      } else if (elapsedTime >= this.nextFocusWaveAt) {
        this.focusWaveUntil = elapsedTime + 1.15;
        this.nextFocusWaveAt = elapsedTime + 5 + Math.random() * 10;
      }
    } else {
      this.nextFocusWaveAt = 0;
      this.focusWaveUntil = 0;
    }

    this.speedAccentTimer -= deltaTime;
    if (this.speedAccentTimer <= 0) {
      if (this.speedAccentId) {
        this.speedAccentId = null;
        this.speedAccentTimer = 28 + Math.random() * 20;
      } else {
        const candidates = this.entityList.filter((entity) => entity.project.role === 'project');
        const selected = candidates[Math.floor(Math.random() * candidates.length)];
        this.speedAccentId = selected?.project.id ?? null;
        this.speedAccentTimer = 8 + Math.random() * 6;
      }
    }

    this.entityList.forEach((entity, index) => {
      const isFocused = entity.project.id === this.focusedId;
      const inFocusFlow = isFocused || entity.runtimeState === 'focus_exit';
      const isDragging = entity.project.id === this.draggingId;
      const isActive = index === this.activeIndex;
      const isScrollSelected = isActive && !this.focusedId && !isDragging && !entity.snapped && !this.externalLayoutActive;
      const slot = this.slotSystem.getSlotForShard(entity.project.id);
      const isSlotPreview = this.slotPreviewIds.has(entity.project.id);

      entity.orbitBoostTarget = this.speedAccentId === entity.project.id ? 1.055 : 1;
      entity.orbitBoost = damp(entity.orbitBoost, entity.orbitBoostTarget, 0.55, deltaTime);

      const orbitTarget = this.computeOrbitTarget(entity, elapsedTime, isActive);

      let targetPosition = orbitTarget;
      let targetScaleX = isActive ? ACTIVE_ORBITING_SHARD_SCALE : ORBITING_SHARD_SCALE;
      let targetScaleY = isActive ? ACTIVE_ORBITING_SHARD_SCALE : ORBITING_SHARD_SCALE;
      let targetScaleZ = isActive ? ACTIVE_ORBITING_SHARD_SCALE : ORBITING_SHARD_SCALE;
      let targetOpacity = this.focusedId ? (isFocused ? 1 : 0.26) : 1;
      let targetState: RuntimeState = entity.snapped ? 'snapped' : 'orbiting';

      entity.slotPulse = damp(entity.slotPulse, slot?.activated ? 1 : this.slotSystem.getProximity(entity.project.id, entity.group.position), 10, deltaTime);

      if (slot) {
        entity.slotIndicator.position.set(slot.worldPosition.x, slot.worldPosition.y, slot.worldPosition.z);
        entity.slotIndicator.material.opacity = 0;
        entity.slotIndicator.visible = false;
      }

      if (this.externalLayoutActive) {
        const externalVisual = this.externalLayoutVisuals?.[index] ?? null;
        if (this.externalLayoutPositions?.[index]) {
          targetPosition = this.externalLayoutPositions[index];
        } else if (this.externalTransitionFrom[index] && this.externalTransitionTo[index]) {
          targetPosition = this.externalTransitionFrom[index]
            .clone()
            .lerp(this.externalTransitionTo[index], this.getDelayedExternalProgress(index));
        }
        if (this.externalLayoutPositions && entity.group.position.distanceToSquared(targetPosition) > 14 * 14) {
          entity.group.position.copy(targetPosition);
          if (externalVisual) {
            entity.group.rotation.z = externalVisual.shapeKind === 'round' ? 0 : externalVisual.spinPhase;
          }
          entity.hiddenUntil = elapsedTime + 0.08;
        }
        targetScaleX = externalVisual?.scale.x ?? this.externalLayoutScales?.[index] ?? 1.02;
        targetScaleY = targetScaleX;
        targetScaleZ = targetScaleX;
        targetOpacity = 1;
        targetState = 'orbiting';
        if (externalVisual) {
          entity.group.rotation.x = damp(entity.group.rotation.x, 0, 9, deltaTime);
          entity.group.rotation.y = damp(entity.group.rotation.y, 0, 9, deltaTime);
          entity.group.rotation.z = damp(entity.group.rotation.z, externalVisual.shapeKind === 'round' ? 0 : externalVisual.spinPhase, 8, deltaTime);
          const geometry = this.getGameGeometry(externalVisual.shapeKind);
          if (entity.core.geometry !== geometry) {
            entity.core.geometry = geometry;
          }
          entity.group.scale.x = damp(entity.group.scale.x, externalVisual.scale.x, 6, deltaTime);
          entity.group.scale.y = damp(entity.group.scale.y, externalVisual.scale.y, 6, deltaTime);
          entity.group.scale.z = damp(entity.group.scale.z, externalVisual.scale.z, 6, deltaTime);
          setDeformMaterialTheme(entity.core.material, this.theme);
          entity.accentRing.visible = false;
          this.syncIconPlane(entity.iconPlane, externalVisual, externalVisual.scale);
        } else if (entity.core.geometry !== this.roundGeometry) {
          entity.core.geometry = this.roundGeometry;
          setDeformMaterialTheme(entity.core.material, this.theme);
          entity.accentRing.visible = false;
          entity.iconPlane.visible = false;
        }
      } else if (isDragging) {
        targetPosition = entity.dragTarget;
        targetScaleX = DRAGGING_SHARD_SCALE;
        targetScaleY = DRAGGING_SHARD_SCALE;
        targetScaleZ = DRAGGING_SHARD_SCALE;
        targetState = 'dragging';
      } else if (entity.snapped) {
        targetPosition = new THREE.Vector3(slot!.worldPosition.x, slot!.worldPosition.y, slot!.worldPosition.z);
        targetScaleX = SNAPPED_SHARD_SCALE;
        targetScaleY = SNAPPED_SHARD_SCALE * 0.88;
        targetScaleZ = SNAPPED_SHARD_SCALE * 0.94;
        targetState = 'snapped';
      } else if (isSlotPreview && slot) {
        targetPosition = new THREE.Vector3(slot.worldPosition.x, slot.worldPosition.y, slot.worldPosition.z);
        targetScaleX = SLOT_PREVIEW_SHARD_SCALE;
        targetScaleY = SLOT_PREVIEW_SHARD_SCALE * 0.88;
        targetScaleZ = SLOT_PREVIEW_SHARD_SCALE * 0.94;
        targetState = 'snapped';
      } else if (inFocusFlow) {
        const focusVisual = THREE.MathUtils.clamp(entity.focusAmount, 0, 1);
        const detachDirection = orbitTarget.clone().sub(this.pivot).setZ(0);
        if (detachDirection.lengthSq() < 0.001) {
          detachDirection.set(0, 1, 0);
        } else {
          detachDirection.normalize();
        }
        const detachTarget = orbitTarget.clone().add(new THREE.Vector3(detachDirection.x * 1.65, detachDirection.y * 0.96, 2.1));
        const fragmentBurstTarget = orbitTarget.clone().add(new THREE.Vector3(detachDirection.x * 0.72, detachDirection.y * 0.34, 4.8));
        const detachBlend = THREE.MathUtils.smoothstep(Math.min(1, focusVisual / 0.28), 0, 1);
        const burstBlend = focusVisual <= 0.18 ? 0 : THREE.MathUtils.smoothstep(Math.min(1, (focusVisual - 0.18) / 0.36), 0, 1);
        const settleBlend = focusVisual <= 0.54 ? 0 : THREE.MathUtils.smoothstep(Math.min(1, (focusVisual - 0.54) / 0.46), 0, 1);
        targetPosition = orbitTarget
          .clone()
          .lerp(detachTarget, detachBlend)
          .lerp(fragmentBurstTarget, burstBlend)
          .lerp(this.focusTargetPosition, settleBlend);
        const focusScale =
          focusVisual < 0.22
            ? THREE.MathUtils.lerp(1, 2.2, focusVisual / 0.22)
            : focusVisual < 0.56
              ? THREE.MathUtils.lerp(2.2, 3.8, (focusVisual - 0.22) / 0.34)
              : THREE.MathUtils.lerp(3.8, 4.95, (focusVisual - 0.56) / 0.44);
        targetScaleX = focusScale * 1.4;
        targetScaleY = focusScale * 1.04;
        targetScaleZ = focusScale * 0.42;
        targetState = mode === 'focus_exit' ? 'focus_exit' : mode === 'focus' ? 'focused' : 'focus_enter';
      }

      if (entity.runtimeState === 'focus_exit' && !this.focusedId) {
        entity.focusAmount = damp(entity.focusAmount, 0, 10, deltaTime);
        if (entity.focusAmount < 0.05) {
          entity.runtimeState = entity.snapped ? 'snapped' : 'orbiting';
        }
      } else {
        entity.runtimeState = targetState;
      }

      const attraction = isDragging ? 18 : inFocusFlow ? 2.65 : entity.snapped ? 13 : 6.5;
      entity.group.position.x = damp(entity.group.position.x, targetPosition.x, attraction, deltaTime);
      entity.group.position.y = damp(entity.group.position.y, targetPosition.y, attraction, deltaTime);
      entity.group.position.z = damp(entity.group.position.z, targetPosition.z, attraction, deltaTime);

      const hoverTarget = this.hoveredId === entity.project.id && !this.focusedId && !isDragging ? 1 : 0;
      const dragTargetAmount = isDragging ? 1 : 0;
      const focusTargetAmount = isFocused ? 1 : 0;

      entity.hoverAmount = damp(entity.hoverAmount, hoverTarget, 10, deltaTime);
      entity.dragAmount = damp(entity.dragAmount, dragTargetAmount, 12, deltaTime);
      entity.focusAmount = damp(entity.focusAmount, focusTargetAmount, 10, deltaTime);
      entity.opacity = damp(entity.opacity, targetOpacity, 9, deltaTime);
      entity.group.visible = elapsedTime >= entity.hiddenUntil;

      if (entity.facetAnimation.active) {
        entity.facetAnimation.progress = Math.min(1, entity.facetAnimation.progress + deltaTime * 1.02);
        const rotationCurve = Math.sin(entity.facetAnimation.progress * Math.PI) * 0.08 * entity.facetAnimation.direction;
        entity.manualRotationY = rotationCurve;

        if (!entity.facetAnimation.swapped && entity.facetAnimation.progress >= 0.5) {
          entity.activeFacet = wrapIndex(entity.activeFacet + entity.facetAnimation.direction, entity.project.facets.length);
          entity.facetAnimation.swapped = true;
        }

        if (entity.facetAnimation.progress >= 1) {
          entity.facetAnimation.active = false;
          entity.manualRotationY = 0;
        }
      } else {
        entity.manualRotationY = damp(entity.manualRotationY, 0, 14, deltaTime);
      }

      entity.core.rotation.x = damp(entity.core.rotation.x, 0, 10, deltaTime);
      entity.core.rotation.y = damp(entity.core.rotation.y, 0, 10, deltaTime);
      entity.core.rotation.z = damp(entity.core.rotation.z, 0, 10, deltaTime);

      const focusRotationX = entity.group.rotation.x + deltaTime * (0.11 + index * 0.001);
      const focusRotationY = entity.group.rotation.y + deltaTime * (0.18 + index * 0.002);
      const focusRotationZ = entity.group.rotation.z + deltaTime * (0.08 + index * 0.0015);
      const externalTransitionActive = this.externalLayoutActive && this.externalTransitionDelays.length > 0;

      if (externalTransitionActive) {
        this.applyCameraFacingRotation(entity, deltaTime, 11.5);
      } else if (!this.externalLayoutActive) {
        if (inFocusFlow || isScrollSelected || entity.snapped || isSlotPreview) {
          this.applyCameraFacingRotation(
            entity,
            deltaTime,
            inFocusFlow ? 13 : entity.snapped || isSlotPreview ? 7.5 : 9,
            inFocusFlow
          );
        } else {
          entity.group.rotation.x = damp(entity.group.rotation.x, focusRotationX, 2, deltaTime);
          entity.group.rotation.y = damp(entity.group.rotation.y, focusRotationY, 2, deltaTime);
          entity.group.rotation.z = damp(entity.group.rotation.z, focusRotationZ, 2, deltaTime);
        }
      }

      const ambientFocusWave =
        isFocused && elapsedTime < this.focusWaveUntil
          ? Math.sin((1 - (this.focusWaveUntil - elapsedTime) / 1.15) * Math.PI) * 0.34
          : 0;
      const facetTransitionWave = entity.facetAnimation.active ? Math.sin(entity.facetAnimation.progress * Math.PI) : 0;
      const facetFocusWave = facetTransitionWave * 0.86;
      const focusFragmentWave = inFocusFlow ? Math.sin(entity.focusAmount * Math.PI) * 0.44 : 0;
      const idleShardWave =
        !this.externalLayoutActive && !inFocusFlow && !isDragging && !entity.snapped && !isSlotPreview
          ? 0.18 + (Math.sin(elapsedTime * 1.75 + index * 0.82) * 0.5 + 0.5) * 0.18
          : 0;
      const squashZ = isFocused ? 0.045 : entity.snapped ? 0.96 : 1;
      if (!this.externalLayoutActive) {
        entity.hiddenUntil = 0;
        entity.accentRing.visible = false;
        entity.iconPlane.visible = false;
        const targetGeometry = inFocusFlow ? (entity.facetAnimation.active ? this.focusWaveGeometry : this.focusGeometry) : this.roundGeometry;
        if (entity.core.geometry !== targetGeometry) {
          entity.core.geometry = targetGeometry;
        }
        const facetRoundBlend = inFocusFlow ? facetTransitionWave : 0;
        if (facetRoundBlend > 0) {
          targetScaleX *= THREE.MathUtils.lerp(1, 0.96, facetRoundBlend);
          targetScaleY *= THREE.MathUtils.lerp(1, 1.06, facetRoundBlend);
          targetScaleZ *= THREE.MathUtils.lerp(1, 1.48, facetRoundBlend);
        }
        const scaleDamping = inFocusFlow ? 10.5 : isScrollSelected ? 7.8 : 8;
        entity.group.scale.x = damp(entity.group.scale.x, targetScaleX, scaleDamping, deltaTime);
        entity.group.scale.y = damp(entity.group.scale.y, targetScaleY, scaleDamping, deltaTime);
        entity.group.scale.z = damp(
          entity.group.scale.z,
          inFocusFlow ? targetScaleZ : targetScaleZ * squashZ,
          scaleDamping,
          deltaTime
        );
      }

      entity.core.material.opacity = entity.opacity;
      if (!this.externalLayoutActive) {
        if (entity.snapped || isSlotPreview) {
          setDeformMaterialTheme(entity.core.material, this.theme);
          entity.accentRing.visible = false;
        } else {
          setDeformMaterialTheme(entity.core.material, this.theme);
        }
      }
      entity.core.material.emissiveIntensity = 0.12;
      const externalShape = this.externalLayoutVisuals?.[index]?.shapeKind ?? null;
      updateDeformUniforms(entity.core.material, {
        time: elapsedTime,
        hover: entity.hoverAmount,
        drag: entity.dragAmount,
        focus: entity.focusAmount,
        settled: this.externalLayoutActive ? (externalShape && externalShape !== 'round' ? 0.16 : 0) : entity.focusAmount * 0.25,
        snap:
          this.externalLayoutActive
            ? this.externalLayoutVisuals?.[index]?.fragmentAmount ?? 0
            : isDragging
              ? 0.02
            : entity.snapped || isSlotPreview
              ? 0.96 + entity.slotPulse * 0.22
              : Math.max(focusFragmentWave, facetTransitionWave * 0.72, idleShardWave * 0.88),
        orbitAngle: this.externalLayoutVisuals?.[index]?.deformAngle ?? 0,
        orbitPulse:
          (this.externalLayoutActive ? this.externalLayoutVisuals?.[index]?.deformStrength ?? 0 : 0) +
          ambientFocusWave +
          facetFocusWave +
          facetTransitionWave * 0.42 +
          idleShardWave * 0.34 +
          focusFragmentWave * 0.22,
        waveDensity:
          (
            this.externalLayoutActive
              ? this.externalLayoutVisuals?.[index]?.deformDensity ?? 0.72
              : isDragging
                ? 0.18
                : entity.snapped || isSlotPreview
                  ? 1.56
                  : 0.62
          ) +
          ambientFocusWave * 0.55 +
          facetFocusWave * 1.6 +
          facetTransitionWave * 1.2 +
          idleShardWave * 1.15 +
          focusFragmentWave * 0.72,
        facetWave: entity.facetAnimation.active ? Math.pow(facetTransitionWave, 0.78) : 0,
        facetDirection: entity.facetAnimation.direction,
        stripeMix: this.externalLayoutVisuals?.[index]?.stripeMix ?? (focusFragmentWave * 0.18 + facetFocusWave * 0.28),
        stripePhase:
          this.externalLayoutVisuals?.[index]?.stripePhase ??
          elapsedTime * 3.2 + index * 0.38 + entity.facetAnimation.direction * entity.facetAnimation.progress * 8.5,
        stripeColor: undefined
      });

      entity.logoPlanes.forEach((plane, planeIndex) => {
        const visibleOpacity = this.externalLayoutActive || this.focusedId ? 0 : entity.opacity;
        plane.material.opacity = visibleOpacity * (0.65 + planeIndex * 0.1);
      });
    });

    this.updateGameFieldEntities(deltaTime, elapsedTime);

    this.updateConstellationLines();

    if (this.focusedId) {
      const focused = this.entities.get(this.focusedId);
      this.focusSettled = Boolean(
        focused &&
          Math.abs(focused.group.position.x - this.focusTargetPosition.x) < 0.05 &&
          Math.abs(focused.group.position.y - this.focusTargetPosition.y) < 0.05 &&
          Math.abs(focused.group.position.z - this.focusTargetPosition.z) < 0.05 &&
          Math.abs(focused.group.scale.x - 6.93) < 0.12
      );
    } else {
      this.focusSettled = false;
    }
  }

  private updateGameFieldEntities(deltaTime: number, elapsedTime: number) {
    if (!this.externalLayoutActive) {
      const visibleSlots = this.slotSystem.getSlots();
      let runtimeIndex = 0;

      visibleSlots.forEach((slot, slotIndex) => {
        const project = this.entities.get(slot.shardId)?.project ?? null;
        for (let miniIndex = 0; miniIndex < SLOT_MINI_SHARD_COUNT && runtimeIndex < this.gameFieldEntities.length; miniIndex += 1) {
          const entity = this.gameFieldEntities[runtimeIndex++]!;
          const phase = elapsedTime * 0.72 + slotIndex * 1.38 + miniIndex * ((Math.PI * 2) / SLOT_MINI_SHARD_COUNT);
          const previewBoost = this.draggingId === slot.shardId ? 1 : 0;
          const slotStrength = slot.activated ? 1 : 0.74;
          const idleRadius = 1.02 + miniIndex * 0.22;
          const lockedRadius = 0.52 + miniIndex * 0.08;
          const radius = THREE.MathUtils.lerp(idleRadius, lockedRadius, slot.activated ? 1 : 0);
          const targetScale = (0.108 + miniIndex * 0.014) * (slot.activated ? 1.1 : 1.02);
          const logoOpacity = slot.activated ? 0.92 : 0.66;
          const verticalBob = slot.activated ? 0.09 + previewBoost * 0.05 : 0.22 + previewBoost * 0.12;
          const depthBob = slot.activated ? 0.16 : 0.28;
          const targetPosition = new THREE.Vector3(
            slot.worldPosition.x + Math.cos(phase) * radius,
            slot.worldPosition.y + Math.sin(phase * 1.18) * verticalBob + Math.sin(elapsedTime * 0.9 + miniIndex) * (slot.activated ? 0.05 : 0.11),
            slot.worldPosition.z - (slot.activated ? 0.16 : 0.24) + Math.sin(phase * 0.9) * depthBob
          );

          entity.group.visible = true;
          entity.hiddenUntil = 0;
          entity.group.position.x = damp(entity.group.position.x, targetPosition.x, 8.4, deltaTime);
          entity.group.position.y = damp(entity.group.position.y, targetPosition.y, 8.4, deltaTime);
          entity.group.position.z = damp(entity.group.position.z, targetPosition.z, 8.4, deltaTime);
          entity.group.rotation.x = damp(entity.group.rotation.x, 0.12 + Math.sin(phase) * 0.08, 5.2, deltaTime);
          entity.group.rotation.y = damp(entity.group.rotation.y, phase * 0.18, 3.6, deltaTime);
          entity.group.rotation.z = damp(entity.group.rotation.z, Math.sin(phase * 0.7) * 0.18, 4.4, deltaTime);
          entity.group.scale.x = damp(entity.group.scale.x, targetScale, 6.2, deltaTime);
          entity.group.scale.y = damp(entity.group.scale.y, targetScale, 6.2, deltaTime);
          entity.group.scale.z = damp(entity.group.scale.z, targetScale * 0.92, 6.2, deltaTime);
          entity.core.material.opacity = 1;
          entity.core.material.emissiveIntensity = 0.12;
          entity.accentRing.visible = false;
          entity.iconPlane.visible = false;
          setDeformMaterialTheme(entity.core.material, this.theme);
          this.syncMiniLogoPlanes(entity, project, logoOpacity, targetScale);
          updateDeformUniforms(entity.core.material, {
            time: elapsedTime,
            hover: 0,
            drag: 0,
            focus: 0,
            settled: 0,
            snap: 0.18 + slotStrength * 0.12,
            orbitAngle: 0,
            orbitPulse: 0.05 + previewBoost * 0.05,
            waveDensity: 0.82 + slotStrength * 0.1,
            stripeMix: 0,
            stripePhase: phase
          });
        }
      });

      for (; runtimeIndex < this.gameFieldEntities.length; runtimeIndex += 1) {
        const entity = this.gameFieldEntities[runtimeIndex]!;
        entity.group.visible = false;
        entity.hiddenUntil = 0;
        entity.accentRing.visible = false;
        entity.iconPlane.visible = false;
        this.syncMiniLogoPlanes(entity, null, 0, 0);
      }
      return;
    }

    this.gameFieldEntities.forEach((entity, extraIndex) => {
      const visualIndex = this.entityList.length + extraIndex;
      const transitionTarget = this.externalTransitionTo[visualIndex] ?? null;
      const delayedProgress = this.getDelayedExternalProgress(visualIndex);
      const position = this.externalLayoutPositions?.[visualIndex] ?? (transitionTarget
        ? entity.group.position.clone().lerp(transitionTarget, delayedProgress)
        : null);
      const visual = this.externalLayoutVisuals?.[visualIndex] ?? null;

      if (!position || !visual) {
        if (!transitionTarget) {
          entity.group.visible = false;
          entity.accentRing.visible = false;
          entity.iconPlane.visible = false;
          this.syncMiniLogoPlanes(entity, null, 0, 0);
          return;
        }
      }
      const resolvedPosition = position ?? transitionTarget ?? entity.group.position;
      if (this.externalLayoutPositions && entity.group.position.distanceToSquared(resolvedPosition) > 14 * 14) {
        entity.group.position.copy(resolvedPosition);
        if (visual) {
          entity.group.rotation.z = visual.shapeKind === 'round' ? 0 : visual.spinPhase;
        }
        entity.hiddenUntil = elapsedTime + 0.08;
      }

      entity.group.visible = elapsedTime >= entity.hiddenUntil;
      entity.group.position.x = damp(entity.group.position.x, resolvedPosition.x, 7.2, deltaTime);
      entity.group.position.y = damp(entity.group.position.y, resolvedPosition.y, 7.2, deltaTime);
      entity.group.position.z = damp(entity.group.position.z, resolvedPosition.z, 7.2, deltaTime);
      entity.group.rotation.x = damp(entity.group.rotation.x, 0, 8, deltaTime);
      entity.group.rotation.y = damp(entity.group.rotation.y, 0, 8, deltaTime);
      const shapeKind = visual?.shapeKind ?? 'round';
        const targetScale = visual?.scale ?? new THREE.Vector3(0.22, 0.22, 0.22);
      entity.group.rotation.z = damp(entity.group.rotation.z, shapeKind === 'round' ? 0 : visual?.spinPhase ?? 0, 8, deltaTime);
      entity.group.scale.x = damp(entity.group.scale.x, targetScale.x, 6, deltaTime);
      entity.group.scale.y = damp(entity.group.scale.y, targetScale.y, 6, deltaTime);
      entity.group.scale.z = damp(entity.group.scale.z, targetScale.z, 6, deltaTime);
      const geometry = this.getGameGeometry(shapeKind);
      if (entity.core.geometry !== geometry) {
        entity.core.geometry = geometry;
      }

      setDeformMaterialTheme(entity.core.material, this.theme);
      entity.accentRing.visible = false;
      this.syncMiniLogoPlanes(entity, null, 0, 0);
      this.syncIconPlane(entity.iconPlane, visual, targetScale);

      entity.core.material.opacity = 1;
      entity.core.material.emissiveIntensity = 0.12;
      updateDeformUniforms(entity.core.material, {
        time: elapsedTime,
        hover: 0,
        drag: 0,
        focus: 0,
        settled: shapeKind === 'round' ? 0 : 0.16,
        snap: visual?.fragmentAmount ?? 0,
        orbitAngle: visual?.deformAngle ?? 0,
        orbitPulse: visual?.deformStrength ?? 0,
        waveDensity: visual?.deformDensity ?? 0.72,
        stripeMix: 0,
        stripePhase: visual?.stripePhase ?? 0,
        stripeColor: undefined
      });
    });
  }

  private buildSingleNodeExternalLayout(position: THREE.Vector3, visual: VisiblePlatformVisual, visibleIndex: number) {
    const totalCount = this.entityList.length;
    const stackDirection = this.focusCameraForward.clone().normalize();
    const orderedIndices = Array.from({ length: totalCount }, (_, index) => index).filter((index) => index !== visibleIndex);
    const positions = Array.from({ length: totalCount }, (_, index) => {
      if (index === visibleIndex) {
        return position.clone();
      }
      const order = orderedIndices.indexOf(index);
      const depthOffset = 3.8 + order * 3.2;
      const verticalOffset = ((order % 2) - 0.5) * 0.16;
      return position.clone().addScaledVector(stackDirection, depthOffset).add(new THREE.Vector3(0, verticalOffset, 0));
    });
    const scales = Array.from({ length: totalCount }, (_, index) => {
      if (index === visibleIndex) {
        return visual.scale.x;
      }
      const order = Math.max(0, orderedIndices.indexOf(index));
      const orderRatio = orderedIndices.length <= 1 ? 0 : order / (orderedIndices.length - 1);
      return THREE.MathUtils.lerp(0.54, 0.18, orderRatio);
    });
    const visuals = Array.from({ length: totalCount }, (_, index) =>
      index === visibleIndex
        ? {
            scale: visual.scale.clone(),
            shapeKind: visual.shapeKind,
            spinDirection: visual.spinDirection,
            spinSpeed: visual.spinSpeed,
            spinPhase: visual.spinPhase,
            tint: visual.tint,
            ringTint: visual.ringTint,
            ringScale: visual.ringScale,
            stripeTint: visual.stripeTint,
            stripeMix: visual.stripeMix,
            stripePhase: visual.stripePhase,
            pulse: visual.pulse,
            deformAngle: visual.deformAngle,
            deformStrength: visual.deformStrength,
            deformDensity: visual.deformDensity,
            fragmentAmount: visual.fragmentAmount,
            iconSrc: visual.iconSrc,
            iconText: visual.iconText,
            iconTint: visual.iconTint,
            iconScale: visual.iconScale
          }
        : {
            scale: new THREE.Vector3(scales[index], scales[index], scales[index] * 0.72),
            shapeKind: 'round' as const,
            spinDirection: 'cw' as const,
            spinSpeed: 0,
            spinPhase: 0,
            tint: null,
            pulse: 0,
            fragmentAmount: 0.22,
            deformAngle: 0,
            deformStrength: 0.08,
            deformDensity: 0.92,
            iconSrc: null,
            iconText: null,
            iconTint: null,
            iconScale: 0.34
          }
    );

    return { positions, scales, visuals };
  }

  private syncLivePivot(elapsedTime: number) {
    void elapsedTime;
    this.pivot.set(0, 0, 0);
  }

  private buildExternalTransitionDelays(totalCount: number, visibleIndex: number | null, reverse = false) {
    const delays = Array.from({ length: totalCount }, () => 0);
    if (visibleIndex === null || totalCount <= 1) {
      return delays;
    }
    const ordered = Array.from({ length: totalCount }, (_, index) => index).filter((index) => index !== visibleIndex);
    if (reverse) {
      ordered.unshift(visibleIndex);
    } else {
      ordered.push(visibleIndex);
    }
    const step = reverse ? Math.min(0.098, 0.82 / Math.max(1, ordered.length)) : 0.084;
    ordered.forEach((index, order) => {
      delays[index] = order * step;
    });
    return delays;
  }

  private getDelayedExternalProgress(index: number) {
    const delay = this.externalTransitionDelays[index] ?? 0;
    const normalized = THREE.MathUtils.clamp((this.externalTransitionProgress - delay) / Math.max(0.0001, 1 - delay), 0, 1);
    return THREE.MathUtils.smoothstep(normalized, 0, 1);
  }

  private computeOrbitTarget(entity: ShardEntity, elapsedTime: number, isActive: boolean) {
    const orbitFlow = isActive && !this.focusedId && this.draggingId !== entity.project.id ? 0 : 1;
    const angle = entity.orbitPhase + elapsedTime * entity.orbitSpeed * entity.orbitBoost * orbitFlow;
    const base = entity.layoutAnchor.clone();

    const baseAngle = Math.atan2(base.y, base.x || 0.0001);
    const orbitAngle = baseAngle + angle;
    const radius = 4.1 + Math.abs(base.x) * 0.6 + Math.abs(base.y) * 0.2;
    const tilt = THREE.MathUtils.clamp(base.y * 0.05, -0.36, 0.36);
    const horizontalX = Math.cos(orbitAngle) * radius;
    const horizontalZ = Math.sin(orbitAngle) * radius;
    const rotated = new THREE.Vector3(
      this.pivot.x + horizontalX,
      this.pivot.y + base.y * 0.78 + Math.sin(orbitAngle * 1.1 + entity.orbitHeight) * 0.55 + horizontalZ * tilt * 0.16,
      this.pivot.z + horizontalZ + base.z * 0.45
    );

    if (isActive && !this.focusedId) {
      return this.getCameraAlignedTransitionAnchor(11.8).add(new THREE.Vector3(0, -0.14, 0));
    }

    return rotated;
  }

  private resolveMinimumSpacing(positions: THREE.Vector3[], minDistance = 2.2) {
    const resolved = positions.map((position) => position.clone());
    for (let iteration = 0; iteration < 3; iteration += 1) {
      for (let index = 0; index < resolved.length; index += 1) {
        for (let otherIndex = index + 1; otherIndex < resolved.length; otherIndex += 1) {
          const delta = resolved[index].clone().sub(resolved[otherIndex]);
          const distance = Math.max(0.0001, delta.length());
          if (distance >= minDistance) continue;
          const correction = (minDistance - distance) * 0.5;
          delta.normalize();
          resolved[index].addScaledVector(delta, correction);
          resolved[otherIndex].addScaledVector(delta, -correction);
        }
      }
    }
    return resolved;
  }

  private createShard(project: PortfolioProject, index: number) {
    const group = new THREE.Group();
    const anchor = getPortfolioAnchor(index);
    const layoutAnchor = new THREE.Vector3(anchor.x, anchor.y, anchor.z);
    const total = Math.max(1, this.slotSystem.getSlots().length);
    group.position.copy(layoutAnchor);
    this.root.add(group);

    const geometry = this.roundGeometry;
    const material = createDeformMaterial(this.theme, index * 17 + 11);
    const core = new THREE.Mesh(geometry, material);
    core.userData.shardId = project.id;

    group.add(core);
    this.pickTargets.push(core);

    const slotIndicator = new THREE.Mesh(
      new THREE.RingGeometry(1.0, 1.18, 36),
      new THREE.MeshBasicMaterial({
        color: getThemeNonShardHex(this.theme),
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false
      })
    );
    slotIndicator.visible = true;
    slotIndicator.visible = false;
    const accentRing = this.createAccentRing();
    accentRing.visible = false;
    group.add(accentRing);
    const iconPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(0.3, 0.3),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, depthTest: false })
    );
    iconPlane.visible = false;
    iconPlane.renderOrder = 42;
    this.attachIconBillboard(iconPlane);
    group.add(iconPlane);

    const entity: ShardEntity = {
      project,
      group,
      core,
      logoPlanes: [],
      layoutAnchor,
      orbitRadius: layoutAnchor.length(),
      orbitPhase: (index / total) * Math.PI * 2,
      orbitSpeed: 0.36 + index * 0.016,
      orbitBoost: 1,
      orbitBoostTarget: 1,
      orbitHeight: index * 0.9,
      orbitDepth: index * 0.55,
      velocity: new THREE.Vector3(),
      dragTarget: new THREE.Vector3(),
      dragOffset: new THREE.Vector3(),
      hoverAmount: 0,
      dragAmount: 0,
      focusAmount: 0,
      opacity: 1,
      activeFacet: 0,
      runtimeState: 'orbiting',
      snapped: false,
      slotIndicator,
      slotPulse: 0,
      manualRotationY: 0,
      facetAnimation: {
        active: false,
        direction: 1,
        progress: 0,
        swapped: false
      },
      hiddenUntil: 0,
      accentRing,
      iconPlane
    };

    this.entities.set(project.id, entity);
    this.createLogoPlanes(entity);
    return entity;
  }

  private createShardLockBase() {
    const texture = getSharedTextureAsset(SHARDLOCK_BASE_TEXTURE, {
      colorSpace: THREE.SRGBColorSpace,
      anisotropy: 8
    });
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.04,
      depthWrite: true,
      depthTest: true,
      toneMapped: false
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(SHARDLOCK_BASE_SIZE, SHARDLOCK_BASE_SIZE), material);
    mesh.position.z = 0.02;
    return mesh;
  }

  private initializeShardLockSlots() {
    this.shardLockGroup.position.copy(SHARDLOCK_BASE_POSITION);
    this.shardLockGroup.renderOrder = 4;
    this.slotSystem.getSlots().forEach((slot) => {
      const anchor = new THREE.Object3D();
      anchor.position.set(
        (slot.normalizedPosition.x - 0.5) * SHARDLOCK_BASE_SIZE,
        (0.5 - slot.normalizedPosition.y) * SHARDLOCK_BASE_SIZE,
        0.14
      );
      this.shardLockGroup.add(anchor);

      let sprite: SpriteSheetPlane | null = null;
      if (slot.animated) {
        sprite = new SpriteSheetPlane({
          textureUrl: SHARDLOCK_SLOT_SPRITES[slot.slotIndex as 1 | 2 | 3 | 4],
          layout: { columns: 2, rows: 2 },
          width: SHARDLOCK_BASE_SIZE,
          height: SHARDLOCK_BASE_SIZE,
          alphaTest: 0.08,
          renderOrder: 2
        });
        sprite.group.position.z = -0.16;
        sprite.setVisible(false);
        this.shardLockGroup.add(sprite.group);
      }

      this.shardLockSlots.set(slot.shardId, {
        shardId: slot.shardId,
        anchor,
        sprite,
        state: 'hidden',
        stateElapsed: 0,
        wasActivated: slot.activated,
        currentFrame: 0
      });
    });
  }

  private createGameFieldShard(index: number) {
    const group = new THREE.Group();
    group.visible = false;
    this.root.add(group);

    const material = createDeformMaterial(this.theme, 900 + index * 23);
    const core = new THREE.Mesh(this.miniShardGeometry, material);
    core.renderOrder = 8;
    group.add(core);
    const accentRing = this.createAccentRing();
    accentRing.visible = false;
    group.add(accentRing);
    const iconPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(0.3, 0.3),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, depthTest: false })
    );
    iconPlane.visible = false;
    iconPlane.renderOrder = 42;
    this.attachIconBillboard(iconPlane);
    group.add(iconPlane);
    const logoPlanes = this.createMiniLogoPlanes(group);
    const anchor = this.getGameFieldAnchor(index);

    return {
      group,
      core,
      accentRing,
      iconPlane,
      logoPlanes,
      anchor,
      orbitPhase: index * 0.37,
      orbitSpeed: 0.32 + (index % 7) * 0.018,
      orbitRadius: 0.22 + (index % 4) * 0.06,
      hiddenUntil: 0,
      logoKey: null
    } satisfies GameFieldEntity;
  }

  private updateShardLockTotem(deltaTime: number, _elapsedTime: number) {
    const visible = !this.externalLayoutActive || this.shardLockTransitionActive;
    this.shardLockGroup.visible = visible;
    if (!visible) {
      return;
    }

    this.cameraFacingAnchor.position.copy(SHARDLOCK_BASE_POSITION);
    this.cameraFacingAnchor.lookAt(this.cameraReferencePosition);
    const toCamera = this.cameraReferencePosition.clone().sub(SHARDLOCK_BASE_POSITION).normalize();
    const transitionPose = this.resolveShardLockTransitionPose(this.shardLockTransitionProgress);
    this.shardLockGroup.position.copy(SHARDLOCK_BASE_POSITION).add(transitionPose.offset);
    this.shardLockGroup.quaternion.slerp(this.cameraFacingAnchor.quaternion, THREE.MathUtils.clamp(deltaTime * 9.5, 0, 1));
    this.shardLockGroup.scale.copy(transitionPose.scale);
    if (this.shardLockTransitionActive && this.shardLockTransitionProgress >= 0.98) {
      this.shardLockGroup.visible = false;
    }

    for (const slot of this.slotSystem.getSlots()) {
      const runtime = this.shardLockSlots.get(slot.shardId);
      if (!runtime) continue;

      runtime.anchor.getWorldPosition(this.interactionPlanePoint);
      this.interactionPlanePoint.addScaledVector(toCamera, 0.3);
      this.slotSystem.setWorldPosition(slot.shardId, this.interactionPlanePoint);

      const entity = this.entities.get(slot.shardId) ?? null;
      const previewing =
        this.draggingId === slot.shardId &&
        !slot.activated &&
        entity !== null &&
        this.slotSystem.getProximity(slot.shardId, entity.dragTarget) > 0.18;

      this.slotSystem.setPreviewing(slot.shardId, previewing);

      if (slot.activated) {
        runtime.state = 'locked';
        runtime.stateElapsed = 0;
        runtime.currentFrame = 3;
      } else if (runtime.wasActivated && !slot.activated) {
        runtime.state = 'unlocking_reverse';
        runtime.stateElapsed = 0;
      } else if (previewing) {
        if (runtime.state !== 'preview_forward') {
          runtime.state = 'preview_forward';
          runtime.stateElapsed = 0;
        }
      } else if (runtime.state !== 'unlocking_reverse') {
        if (runtime.state === 'preview_forward' && runtime.currentFrame > 0) {
          runtime.state = 'unlocking_reverse';
          runtime.stateElapsed = 0;
        } else {
          runtime.state = 'hidden';
          runtime.stateElapsed = 0;
          runtime.currentFrame = 0;
          this.slotSystem.hide(slot.shardId);
        }
      }

      runtime.wasActivated = slot.activated;
      runtime.stateElapsed += deltaTime;

      if (!runtime.sprite) {
        continue;
      }
      if (runtime.state === 'hidden') {
        runtime.sprite.setVisible(false);
        continue;
      }

      runtime.sprite.setVisible(true);
      if (runtime.state === 'preview_forward') {
        runtime.currentFrame = Math.min(3, Math.floor(runtime.stateElapsed / SLOT_PREVIEW_FRAME_DURATION));
        runtime.sprite.setFrame(runtime.currentFrame);
        continue;
      }
      if (runtime.state === 'locked') {
        runtime.currentFrame = 3;
        runtime.sprite.setFrame(3);
        continue;
      }

      const reverseStep = Math.floor(runtime.stateElapsed / SLOT_UNLOCK_FRAME_DURATION);
      const reverseFrame = Math.max(0, runtime.currentFrame - reverseStep);
      runtime.sprite.setFrame(reverseFrame);
      if (runtime.stateElapsed >= SLOT_UNLOCK_FRAME_DURATION * (runtime.currentFrame + 1)) {
        runtime.state = 'hidden';
        runtime.stateElapsed = 0;
        runtime.currentFrame = 0;
        runtime.sprite.setVisible(false);
        this.slotSystem.hide(slot.shardId);
      }
    }
  }

  private createAccentRing() {
    return new THREE.Mesh(
      new THREE.RingGeometry(1.08, 1.26, 48),
      new THREE.MeshBasicMaterial({
        color: '#4B74FF',
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false
      })
    );
  }

  private createMiniLogoPlanes(host: THREE.Group) {
    const angles = [0, Math.PI * (2 / 3), Math.PI * (4 / 3)];
    return angles.map((angle) => {
        const plane = new THREE.Mesh(
          new THREE.PlaneGeometry(0.22, 0.22, 8, 8),
          new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            depthWrite: false,
            depthTest: false
          })
        );
      plane.position.set(Math.sin(angle) * 0.52, Math.sin(angle * 2) * 0.09, Math.cos(angle) * 0.52);
      plane.lookAt(0, 0, 0);
      plane.userData.logoAngle = angle;
      plane.visible = false;
      plane.renderOrder = 18;
      host.add(plane);
      return plane;
    });
  }

  private attachIconBillboard(plane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>) {
    const parentQuaternion = new THREE.Quaternion();
    const cameraQuaternion = new THREE.Quaternion();
    plane.onBeforeRender = (_renderer, _scene, camera) => {
      camera.getWorldQuaternion(cameraQuaternion);
      if (plane.parent) {
        plane.parent.getWorldQuaternion(parentQuaternion);
        parentQuaternion.invert();
        plane.quaternion.copy(parentQuaternion.multiply(cameraQuaternion));
      } else {
        plane.quaternion.copy(cameraQuaternion);
      }
    };
  }

  private getIconTexture(iconSrc?: string | null, iconText?: string | null, iconTint?: string | null) {
    const key = iconSrc ? `src:${iconSrc}` : `text:${iconText ?? ''}:${iconTint ?? ''}`;
    const cached = this.iconTextureCache.get(key);
    if (cached) {
      return cached;
    }
    let texture: THREE.Texture;
    if (iconSrc) {
      texture = getSharedTextureAsset(iconSrc, {
        colorSpace: THREE.SRGBColorSpace,
        wrapS: THREE.ClampToEdgeWrapping,
        wrapT: THREE.ClampToEdgeWrapping
      });
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 256, 256);
        ctx.font = '900 188px Arial';
        ctx.fillStyle = iconTint ?? '#D4BF9B';
        ctx.strokeStyle = 'rgb(0 0 0 / 0.28)';
        ctx.lineWidth = 12;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeText(iconText ?? '?', 128, 138);
        ctx.fillText(iconText ?? '?', 128, 138);
      }
      texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
    }
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    this.iconTextureCache.set(key, texture);
    return texture;
  }

  private syncIconPlane(
    plane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>,
    visual: VisiblePlatformVisual | null,
    scale: THREE.Vector3
  ) {
    if (!(visual?.iconSrc || visual?.iconText)) {
      plane.visible = false;
      return;
    }
    plane.visible = true;
    plane.material.map = this.getIconTexture(visual.iconSrc, visual.iconText, visual.iconTint);
    plane.material.opacity = 1;
    plane.material.needsUpdate = true;
    const baseScale = (visual.iconScale ?? 0.34) * 1.22;
    const dominantScale = Math.max(scale.x, scale.y);
    plane.scale.set(
      baseScale * dominantScale / Math.max(0.001, scale.x),
      baseScale * dominantScale / Math.max(0.001, scale.y),
      1
    );
    plane.position.set(0, 0, Math.max(0.18, dominantScale * 0.26));
  }

  private getGameFieldAnchor(index: number) {
    const total = Math.max(this.gameFieldEntities?.length ?? 0, this.slotSystem.getSlots().length * MINI_SHARDS_PER_SLOT);
    if (index >= total) {
      return new THREE.Vector3(0, 0, 0);
    }
    const half = Math.ceil(total / 2);
    const onPrimary = index < half;
    const localIndex = onPrimary ? index : index - half;
    const localCount = onPrimary ? half : total - half;
    const progress = localCount <= 1 ? 0 : localIndex / (localCount - 1);
    const t = progress * 2 - 1;
    const spacingScale = 0.38 + Math.abs(t) * 0.78;
    const x = t * 10.8;
    const y = (onPrimary ? 1 : -1) * t * 6.6 * spacingScale;
    const z = (onPrimary ? 1 : -1) * t * 4.2;
    return new THREE.Vector3(x, y, z);
  }

  private createLogoPlanes(entity: ShardEntity) {
    const texturePath = this.theme === 'dark' ? entity.project.logo.dark : entity.project.logo.light;
    const planeSize = 1.7 * entity.project.logo.scale;
    const angles = [0, Math.PI * (2 / 3), Math.PI * (4 / 3)];
    const texture = getSharedTextureAsset(texturePath, {
      colorSpace: THREE.SRGBColorSpace,
      anisotropy: 4
    });

    angles.forEach((angle) => {
      const geometry = new THREE.PlaneGeometry(planeSize, planeSize, 12, 12);
      const positions = geometry.attributes.position;

      for (let index = 0; index < positions.count; index += 1) {
        const px = positions.getX(index);
        const py = positions.getY(index);
        const distance = Math.sqrt(px * px + py * py) / (planeSize * 0.7);
        positions.setZ(index, Math.sin(distance * Math.PI * 0.5) * 0.22);
      }
      geometry.computeVertexNormals();

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: entity.project.logo.opacity,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const plane = new THREE.Mesh(geometry, material);
      plane.position.set(Math.sin(angle) * 1.48, 0, Math.cos(angle) * 1.48);
      plane.lookAt(0, 0, 0);
      plane.userData.shardId = entity.project.id;
      entity.group.add(plane);
      entity.logoPlanes.push(plane);
    });
  }

  private updateLogoTexture(entity: ShardEntity) {
    const texturePath = this.theme === 'dark' ? entity.project.logo.dark : entity.project.logo.light;
    const texture = getSharedTextureAsset(texturePath, {
      colorSpace: THREE.SRGBColorSpace,
      anisotropy: 4
    });
    entity.logoPlanes.forEach((plane) => {
      plane.material.map = texture;
      plane.material.needsUpdate = true;
    });
  }

  private syncMiniLogoPlanes(entity: GameFieldEntity, project: PortfolioProject | null, opacity: number, scale: number) {
    const texturePath = project ? (this.theme === 'dark' ? project.logo.dark : project.logo.light) : DEFAULT_MINI_LOGO_TEXTURE;
    if (entity.logoKey !== texturePath) {
      entity.logoKey = texturePath;
      const texture = getSharedTextureAsset(texturePath, {
        colorSpace: THREE.SRGBColorSpace
      });
      entity.logoPlanes.forEach((plane) => {
        plane.material.map = texture;
        plane.material.needsUpdate = true;
      });
    }

    const planeScale = Math.max(0.24, scale * 2.22);
    entity.logoPlanes.forEach((plane, index) => {
      plane.visible = opacity > 0.02;
      plane.material.opacity = opacity * (0.86 + index * 0.06);
      plane.scale.setScalar(planeScale);
      plane.renderOrder = 24;
    });
  }

  private resolveShardLockTransitionPose(progress: number) {
    if (!this.shardLockTransitionActive) {
      return {
        offset: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1)
      };
    }

    const offset = new THREE.Vector3();
    const scale = new THREE.Vector3(1, 1, 1);

    if (progress < 0.14) {
      const local = easeInOutCubic(progress / 0.14);
      offset.y -= 0.18 * local;
      scale.set(1 + local * 0.06, 1 - local * 0.08, 1);
    } else if (progress < 0.34) {
      const local = easeOutCubic((progress - 0.14) / 0.2);
      offset.y = THREE.MathUtils.lerp(-0.18, 0.95, local);
      scale.set(1.02 - local * 0.04, 0.92 + local * 0.1, 1);
    } else if (progress < 0.42) {
      const local = easeInOutCubic((progress - 0.34) / 0.08);
      offset.y = THREE.MathUtils.lerp(0.95, 0, local);
      scale.set(0.98 + local * 0.02, 1.02 - local * 0.02, 1);
    } else {
      const local = easeInCubic((progress - 0.42) / 0.58);
      offset.y = THREE.MathUtils.lerp(0, -16.4, local);
      scale.set(1 - local * 0.06, 1 + local * 0.024, 1);
    }

    return { offset, scale };
  }

  private createBackgroundPoints() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(240 * 3);

    for (let index = 0; index < 240; index += 1) {
      const radius = 26 + Math.random() * 20;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 18;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = height;
      positions[index * 3 + 2] = Math.sin(angle) * 6 - 8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    return new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: getThemeNonShardHex(this.theme),
        size: 0.08,
        transparent: true,
        opacity: 0.35
      })
    );
  }

  private createConstellationLines() {
    const createLine = () => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));
      const material = new THREE.LineBasicMaterial({
        color: getThemeNonShardHex(this.theme),
        transparent: true,
        opacity: 0.9
      });
      const line = new THREE.Line(geometry, material);
      this.root.add(line);
      return line;
    };

    return [createLine(), createLine(), createLine()];
  }

  private updateConstellationLines() {
    this.constellationLines.forEach((line) => {
      line.visible = false;
    });
  }
}

function easeOutCubic(value: number) {
  const clamped = THREE.MathUtils.clamp(value, 0, 1);
  const inverse = 1 - clamped;
  return 1 - inverse * inverse * inverse;
}

function easeInCubic(value: number) {
  const clamped = THREE.MathUtils.clamp(value, 0, 1);
  return clamped * clamped * clamped;
}

function easeInOutCubic(value: number) {
  const clamped = THREE.MathUtils.clamp(value, 0, 1);
  return clamped < 0.5 ? 4 * clamped * clamped * clamped : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
}
