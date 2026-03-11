import * as THREE from 'three';
import { damp, wrapIndex } from '../core/math';
import type { AppMode } from '../core/ModeController';
import type { PortfolioProject, ThemeMode } from '../types/content';
import type { VisiblePlatformVisual } from '../game/gameSessionTypes';
import { SecretSlotSystem } from './SecretSlotSystem';
import {
  createDeformMaterial,
  createFragmentedIcosahedronGeometry,
  createFragmentedTetrahedronGeometry,
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
}

interface PickResult {
  shardId: string;
  point: THREE.Vector3;
}

interface GameFieldEntity {
  group: THREE.Group;
  core: THREE.Mesh<THREE.BufferGeometry, DeformMaterial>;
  anchor: THREE.Vector3;
  orbitPhase: number;
  orbitSpeed: number;
  orbitRadius: number;
}

const ORBIT_CAMERA_POSITION = new THREE.Vector3(0, 0.8, 24);
const FOCUS_CAMERA_POSITION = new THREE.Vector3(0, 0.2, 17.5);
const GAME_FIELD_EXTRA_COUNT = 33;
export class OrbitWorldSystem {
  private readonly root = new THREE.Group();
  private readonly loader = new THREE.TextureLoader();
  private readonly raycaster = new THREE.Raycaster();
  private readonly dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  private readonly interactionPlanePoint = new THREE.Vector3();
  private readonly entities = new Map<string, ShardEntity>();
  private readonly entityList: ShardEntity[];
  private readonly pickTargets: THREE.Object3D[] = [];
  private readonly pointer = new THREE.Vector2();
  private readonly backgroundPoints: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;
  private readonly focusTargetPosition = new THREE.Vector3(0, 0.1, 7.4);
  private readonly pivot = new THREE.Vector3(0, 0, 0);
  private readonly roundGeometry = createFragmentedIcosahedronGeometry(1.25, 4);
  private readonly triangularGeometry = createFragmentedTetrahedronGeometry(1.42, 2);
  private readonly constellationLines: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>[];
  private readonly gameFieldEntities: GameFieldEntity[];
  private globalOrbitTime = 0;
  private hoveredId: string | null = null;
  private focusedId: string | null = null;
  private draggingId: string | null = null;
  private activeIndex = 0;
  private theme: ThemeMode;
  private focusSettled = false;
  private activeLookAt = new THREE.Vector3();
  private externalLayoutActive = false;
  private externalLayoutPositions: THREE.Vector3[] | null = null;
  private externalLayoutScales: number[] | null = null;
  private externalLayoutVisuals: VisiblePlatformVisual[] | null = null;
  private externalTransitionFrom: THREE.Vector3[] = [];
  private externalTransitionTo: THREE.Vector3[] = [];
  private externalTransitionProgress = 0;
  private speedAccentTimer = 36;
  private speedAccentId: string | null = null;
  private unlockCallbacks = new Set<() => void>();
  private readonly slotPreviewIds = new Set<string>();

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
    this.entityList = projects.map((project, index) => this.createShard(project, index));
    this.gameFieldEntities = Array.from({ length: GAME_FIELD_EXTRA_COUNT }, (_, index) => this.createGameFieldShard(index));
  }

  setTheme(theme: ThemeMode) {
    this.theme = theme;
    this.entityList.forEach((entity) => {
      setDeformMaterialTheme(entity.core.material, theme);
      this.updateLogoTexture(entity);
      entity.slotIndicator.material.color.set(theme === 'dark' ? '#D4BF9B' : '#393F4A');
    });
    this.gameFieldEntities.forEach((entity) => {
      setDeformMaterialTheme(entity.core.material, theme);
    });
    this.backgroundPoints.material.color.set(theme === 'dark' ? '#D4BF9B' : '#393F4A');
    this.constellationLines.forEach((line) => line.material.color.set(theme === 'dark' ? '#D4BF9B' : '#393F4A'));
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
    this.entityList.forEach((entity) => {
      if (shardId && entity.project.id === shardId) {
        entity.runtimeState = 'focus_enter';
      } else if (entity.runtimeState !== 'dragging') {
        entity.runtimeState = entity.snapped ? 'snapped' : 'orbiting';
      }
    });
  }

  isFocusSettled() {
    return this.focusSettled;
  }

  clearFocus() {
    this.focusedId = null;
    this.focusSettled = false;
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

    return entity.project.id;
  }

  previewFacetRotation(deltaX: number) {
    if (!this.focusedId) return;
    const entity = this.entities.get(this.focusedId);
    if (!entity || entity.facetAnimation.active) return;
    entity.manualRotationY = THREE.MathUtils.clamp(deltaX * 0.007, -Math.PI / 6, Math.PI / 6);
  }

  finishFacetRotation() {
    if (!this.focusedId) return false;
    const entity = this.entities.get(this.focusedId);
    if (!entity || entity.facetAnimation.active) return false;

    if (Math.abs(entity.manualRotationY) > Math.PI / 8) {
      const direction = entity.manualRotationY > 0 ? 1 : -1;
      entity.manualRotationY = 0;
      this.changeFacet(direction);
      return true;
    }

    entity.manualRotationY = 0;
    return false;
  }

  beginDrag(shardId: string, intersectionPoint: THREE.Vector3) {
    if (this.focusedId) return false;

    const entity = this.entities.get(shardId);
    if (!entity) return false;
    if (entity.project.role === 'presentation') return false;
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
    const first = hits.find((hit) => Boolean(hit.object.userData.shardId));
    if (!first) return null;

    return {
      shardId: first.object.userData.shardId as string,
      point: first.point.clone()
    } satisfies PickResult;
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

  getFocusCameraPose() {
    const focused = this.focusedId ? this.entities.get(this.focusedId) : null;
    return {
      position: FOCUS_CAMERA_POSITION,
      lookAt: focused?.group.position.clone() || this.focusTargetPosition.clone()
    };
  }

  getFocusedEntityId() {
    return this.focusedId;
  }

  onUnlocked(callback: () => void) {
    this.unlockCallbacks.add(callback);
    return () => this.unlockCallbacks.delete(callback);
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
    if (entity.project.role === 'presentation') return 3;
    if (entity.snapped) return 4;
    return 8;
  }

  getCurrentShardPositions() {
    return this.entityList.map((entity) => entity.group.position.clone());
  }

  getGameFieldCapacity() {
    return this.entityList.length + this.gameFieldEntities.length;
  }

  getOrbitPositions() {
    return this.entityList.map((entity, index) => this.computeOrbitTarget(entity, this.globalOrbitTime, index === this.activeIndex));
  }

  getSlotPositions() {
    return this.entityList.map((entity) => {
      const slot = this.slotSystem.getSlotForShard(entity.project.id);
      return slot ? new THREE.Vector3(slot.worldPosition.x, slot.worldPosition.y, slot.worldPosition.z) : entity.group.position.clone();
    });
  }

  beginExternalLayoutTransition(targets: THREE.Vector3[], scales?: number[]) {
    this.externalLayoutActive = true;
    this.externalLayoutPositions = null;
    this.externalLayoutScales = scales ? [...scales] : null;
    this.externalLayoutVisuals = null;
    this.externalTransitionFrom = this.getCurrentShardPositions();
    this.externalTransitionTo = targets.map((target) => target.clone());
    this.externalTransitionProgress = 0;
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
      pulse: visual.pulse,
      deformAngle: visual.deformAngle,
      deformStrength: visual.deformStrength,
      deformDensity: visual.deformDensity
    })) : null;
  }

  clearExternalLayout() {
    this.externalLayoutActive = false;
    this.externalLayoutPositions = null;
    this.externalLayoutScales = null;
    this.externalLayoutVisuals = null;
    this.externalTransitionFrom = [];
    this.externalTransitionTo = [];
    this.externalTransitionProgress = 0;
    this.gameFieldEntities.forEach((entity) => {
      entity.group.visible = false;
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
      const isDragging = entity.project.id === this.draggingId;
      const isActive = index === this.activeIndex;
      const slot = this.slotSystem.getSlotForShard(entity.project.id);
      const isSlotPreview = this.slotPreviewIds.has(entity.project.id);

      entity.orbitBoostTarget = this.speedAccentId === entity.project.id ? 1.055 : 1;
      entity.orbitBoost = damp(entity.orbitBoost, entity.orbitBoostTarget, 0.55, deltaTime);

      const orbitTarget = this.computeOrbitTarget(entity, elapsedTime, isActive);

      let targetPosition = orbitTarget;
      let targetScale = isActive ? 1.1 : 1;
      let targetOpacity = this.focusedId ? (isFocused ? 1 : 0.26) : 1;
      let targetState: RuntimeState = entity.snapped ? 'snapped' : 'orbiting';

      entity.slotPulse = damp(entity.slotPulse, slot?.activated ? 1 : this.slotSystem.getProximity(entity.project.id, entity.group.position), 10, deltaTime);

      if (slot) {
        entity.slotIndicator.position.set(slot.worldPosition.x, slot.worldPosition.y, slot.worldPosition.z);
        entity.slotIndicator.material.opacity = this.externalLayoutActive ? 0 : entity.slotPulse * (slot.activated ? 0.82 : 0.52);
        entity.slotIndicator.scale.setScalar(0.8 + entity.slotPulse * 0.35 + Math.sin(elapsedTime * 3 + index) * 0.03);
      }

      if (this.externalLayoutActive) {
        const externalVisual = this.externalLayoutVisuals?.[index] ?? null;
        if (this.externalLayoutPositions?.[index]) {
          targetPosition = this.externalLayoutPositions[index];
        } else if (this.externalTransitionFrom[index] && this.externalTransitionTo[index]) {
          targetPosition = this.externalTransitionFrom[index].clone().lerp(this.externalTransitionTo[index], this.externalTransitionProgress);
        }
        targetScale = externalVisual?.scale.x ?? this.externalLayoutScales?.[index] ?? 1.02;
        targetOpacity = 1;
        targetState = 'orbiting';
        if (externalVisual) {
          entity.group.rotation.x = damp(entity.group.rotation.x, 0, 9, deltaTime);
          entity.group.rotation.y = damp(entity.group.rotation.y, 0, 9, deltaTime);
          entity.group.rotation.z = damp(entity.group.rotation.z, externalVisual.shapeKind === 'round' ? 0 : externalVisual.spinPhase, 8, deltaTime);
          const geometry = externalVisual.shapeKind === 'triangular' ? this.triangularGeometry : this.roundGeometry;
          if (entity.core.geometry !== geometry) {
            entity.core.geometry = geometry;
          }
          entity.group.scale.x = damp(entity.group.scale.x, externalVisual.scale.x, 6, deltaTime);
          entity.group.scale.y = damp(entity.group.scale.y, externalVisual.scale.y, 6, deltaTime);
          entity.group.scale.z = damp(entity.group.scale.z, externalVisual.scale.z, 6, deltaTime);
          if (externalVisual.tint) {
            entity.core.material.color.set(externalVisual.tint);
            entity.core.material.emissive.set(externalVisual.tint);
          } else {
            setDeformMaterialTheme(entity.core.material, this.theme);
          }
        } else if (entity.core.geometry !== this.roundGeometry) {
          entity.core.geometry = this.roundGeometry;
          setDeformMaterialTheme(entity.core.material, this.theme);
        }
      } else if (isDragging) {
        targetPosition = entity.dragTarget;
        targetScale = 1.06;
        targetState = 'dragging';
      } else if (entity.snapped) {
        targetPosition = new THREE.Vector3(slot!.worldPosition.x, slot!.worldPosition.y, slot!.worldPosition.z);
        targetScale = 1.08;
        targetState = 'snapped';
      } else if (isSlotPreview && slot) {
        targetPosition = new THREE.Vector3(slot.worldPosition.x, slot.worldPosition.y, slot.worldPosition.z);
        targetScale = 1.04;
        targetState = 'snapped';
      } else if (isFocused) {
        targetPosition = this.focusTargetPosition;
        targetScale = 2.55;
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

      const attraction = isDragging ? 18 : isFocused ? 14 : entity.snapped ? 13 : 6.5;
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

      if (entity.facetAnimation.active) {
        entity.facetAnimation.progress = Math.min(1, entity.facetAnimation.progress + deltaTime * 1.8);
        const rotationCurve = Math.sin(entity.facetAnimation.progress * Math.PI) * Math.PI * 0.92 * entity.facetAnimation.direction;
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

      const focusRotationX = isFocused ? 0 : entity.group.rotation.x + deltaTime * (0.11 + index * 0.001);
      const focusRotationY = isFocused ? entity.manualRotationY : entity.group.rotation.y + deltaTime * (0.18 + index * 0.002);
      const focusRotationZ = isFocused ? 0 : entity.group.rotation.z + deltaTime * (0.08 + index * 0.0015);

      if (!this.externalLayoutActive) {
        entity.group.rotation.x = damp(entity.group.rotation.x, focusRotationX, isFocused ? 12 : 2, deltaTime);
        entity.group.rotation.y = damp(entity.group.rotation.y, focusRotationY, isFocused ? 12 : 2, deltaTime);
        entity.group.rotation.z = damp(entity.group.rotation.z, focusRotationZ, isFocused ? 12 : 2, deltaTime);
      }

      const squashZ = isFocused ? 0.06 : entity.snapped ? 0.96 : 1;
      if (!this.externalLayoutActive) {
        if (entity.core.geometry !== this.roundGeometry) {
          entity.core.geometry = this.roundGeometry;
        }
        entity.group.scale.x = damp(entity.group.scale.x, targetScale, 8, deltaTime);
        entity.group.scale.y = damp(entity.group.scale.y, targetScale, 8, deltaTime);
        entity.group.scale.z = damp(entity.group.scale.z, targetScale * squashZ, 8, deltaTime);
      }

      entity.core.material.opacity = entity.opacity;
      entity.core.material.emissiveIntensity =
        0.08 +
        entity.hoverAmount * 0.18 +
        (isActive ? 0.08 : 0) +
        entity.slotPulse * 0.06 +
        (this.externalLayoutVisuals?.[index]?.pulse ?? 0);
      const externalShape = this.externalLayoutVisuals?.[index]?.shapeKind ?? null;
      updateDeformUniforms(entity.core.material, {
        time: elapsedTime,
        hover: entity.hoverAmount,
        drag: entity.dragAmount,
        focus: entity.focusAmount,
        settled: this.externalLayoutActive ? (externalShape && externalShape !== 'round' ? 1 : 0) : entity.focusAmount * 0.25,
        snap: this.externalLayoutActive ? 0 : entity.snapped || isSlotPreview ? 0.96 + entity.slotPulse * 0.22 : 0,
        orbitAngle: this.externalLayoutVisuals?.[index]?.deformAngle ?? 0,
        orbitPulse: this.externalLayoutActive ? this.externalLayoutVisuals?.[index]?.deformStrength ?? 0 : 0,
        waveDensity: this.externalLayoutActive ? this.externalLayoutVisuals?.[index]?.deformDensity ?? 0.72 : entity.snapped || isSlotPreview ? 1.56 : 0.42
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
          Math.abs(focused.group.scale.x - 2.55) < 0.05
      );
    } else {
      this.focusSettled = false;
    }
  }

  private updateGameFieldEntities(deltaTime: number, elapsedTime: number) {
    if (!this.externalLayoutActive) {
      this.gameFieldEntities.forEach((entity, index) => {
        const angle = entity.orbitPhase + elapsedTime * entity.orbitSpeed;
        const targetX = entity.anchor.x + Math.cos(angle) * entity.orbitRadius;
        const targetY = entity.anchor.y + Math.sin(angle * 0.82) * entity.orbitRadius * 0.9;
        const targetZ = entity.anchor.z + Math.sin(angle) * entity.orbitRadius * 0.72;
        entity.group.visible = true;
        entity.group.position.x = damp(entity.group.position.x, targetX, 4.6, deltaTime);
        entity.group.position.y = damp(entity.group.position.y, targetY, 4.6, deltaTime);
        entity.group.position.z = damp(entity.group.position.z, targetZ, 4.6, deltaTime);
        entity.group.rotation.x = damp(entity.group.rotation.x, entity.group.rotation.x + deltaTime * 0.18, 2, deltaTime);
        entity.group.rotation.y = damp(entity.group.rotation.y, entity.group.rotation.y + deltaTime * 0.24, 2, deltaTime);
        entity.group.rotation.z = damp(entity.group.rotation.z, entity.group.rotation.z + deltaTime * 0.14, 2, deltaTime);
        entity.group.scale.setScalar(damp(entity.group.scale.x, 0.18 + Math.sin(elapsedTime * 1.8 + index) * 0.012, 6, deltaTime));
        entity.core.material.opacity = this.focusedId ? 0.1 : 0.22;
        entity.core.material.emissiveIntensity = this.focusedId ? 0.02 : 0.06;
        setDeformMaterialTheme(entity.core.material, this.theme);
        updateDeformUniforms(entity.core.material, {
          time: elapsedTime,
          hover: 0,
          drag: 0,
          focus: 0,
          settled: 0,
          snap: 0,
          orbitAngle: angle,
          orbitPulse: 0.08,
          waveDensity: 0.36
        });
      });
      return;
    }

    this.gameFieldEntities.forEach((entity, extraIndex) => {
      const visualIndex = this.entityList.length + extraIndex;
      const position = this.externalLayoutPositions?.[visualIndex];
      const visual = this.externalLayoutVisuals?.[visualIndex] ?? null;

      if (!position || !visual) {
        entity.group.visible = false;
        return;
      }

      entity.group.visible = true;
      entity.group.position.x = damp(entity.group.position.x, position.x, 7.2, deltaTime);
      entity.group.position.y = damp(entity.group.position.y, position.y, 7.2, deltaTime);
      entity.group.position.z = damp(entity.group.position.z, position.z, 7.2, deltaTime);
      entity.group.rotation.x = damp(entity.group.rotation.x, 0, 8, deltaTime);
      entity.group.rotation.y = damp(entity.group.rotation.y, 0, 8, deltaTime);
      entity.group.rotation.z = damp(entity.group.rotation.z, visual.shapeKind === 'round' ? 0 : visual.spinPhase, 8, deltaTime);
      entity.group.scale.x = damp(entity.group.scale.x, visual.scale.x, 6, deltaTime);
      entity.group.scale.y = damp(entity.group.scale.y, visual.scale.y, 6, deltaTime);
      entity.group.scale.z = damp(entity.group.scale.z, visual.scale.z, 6, deltaTime);

      const geometry = visual.shapeKind === 'triangular' ? this.triangularGeometry : this.roundGeometry;
      if (entity.core.geometry !== geometry) {
        entity.core.geometry = geometry;
      }

      if (visual.tint) {
        entity.core.material.color.set(visual.tint);
        entity.core.material.emissive.set(visual.tint);
      } else {
        setDeformMaterialTheme(entity.core.material, this.theme);
      }

      entity.core.material.opacity = 1;
      entity.core.material.emissiveIntensity = 0.08 + (visual.pulse ?? 0);
      updateDeformUniforms(entity.core.material, {
        time: elapsedTime,
        hover: 0,
        drag: 0,
        focus: 0,
        settled: visual.shapeKind === 'round' ? 0 : 1,
        snap: 0,
        orbitAngle: visual.deformAngle ?? 0,
        orbitPulse: visual.deformStrength ?? 0,
        waveDensity: visual.deformDensity ?? 0.72
      });
    });
  }

  private syncLivePivot(elapsedTime: number) {
    const centerEntity = this.entityList.find((entity) => entity.project.role === 'presentation');
    if (!centerEntity) {
      this.pivot.set(0, 0, 0);
      return;
    }

    void elapsedTime;
    this.pivot.set(centerEntity.layoutAnchor.x, centerEntity.layoutAnchor.y, centerEntity.layoutAnchor.z);
  }

  private computeOrbitTarget(entity: ShardEntity, elapsedTime: number, isActive: boolean) {
    const angle = entity.orbitPhase + elapsedTime * entity.orbitSpeed * entity.orbitBoost;
    const base = entity.layoutAnchor.clone();

    if (entity.project.role === 'presentation') {
      return new THREE.Vector3(
        this.pivot.x + Math.cos(angle) * 1.9,
        this.pivot.y + Math.sin(angle * 0.85) * 0.72,
        this.pivot.z + Math.sin(angle) * 2.6 + (isActive ? 0.35 : 0)
      );
    }

    if (entity.project.role === 'hint') {
      return new THREE.Vector3(
        this.pivot.x + Math.sin(angle * 0.42) * 0.45,
        this.pivot.y + Math.cos(angle) * 5.05,
        this.pivot.z + Math.sin(angle) * 4.2 + (isActive ? 0.24 : 0)
      );
    }

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

    if (isActive) {
      rotated.z += 0.38;
    }

    return rotated;
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
        color: this.theme === 'dark' ? '#D4BF9B' : '#393F4A',
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false
      })
    );
    slotIndicator.visible = true;
    this.root.add(slotIndicator);

    const entity: ShardEntity = {
      project,
      group,
      core,
      logoPlanes: [],
      layoutAnchor,
      orbitRadius: layoutAnchor.length(),
      orbitPhase: (index / total) * Math.PI * 2,
      orbitSpeed: project.role === 'presentation' ? 0.34 : project.role === 'hint' ? 0.58 : 0.38 + index * 0.012,
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
      }
    };

    this.entities.set(project.id, entity);
    this.createLogoPlanes(entity);
    return entity;
  }

  private createGameFieldShard(index: number) {
    const group = new THREE.Group();
    group.visible = false;
    this.root.add(group);

    const material = createDeformMaterial(this.theme, 900 + index * 23);
    const core = new THREE.Mesh(this.roundGeometry, material);
    group.add(core);
    const anchor = this.getGameFieldAnchor(index);

    return {
      group,
      core,
      anchor,
      orbitPhase: index * 0.37,
      orbitSpeed: 0.32 + (index % 7) * 0.018,
      orbitRadius: 0.22 + (index % 4) * 0.06
    } satisfies GameFieldEntity;
  }

  private getGameFieldAnchor(index: number) {
    const half = Math.ceil(GAME_FIELD_EXTRA_COUNT / 2);
    const onPrimary = index < half;
    const localIndex = onPrimary ? index : index - half;
    const localCount = onPrimary ? half : GAME_FIELD_EXTRA_COUNT - half;
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

    this.loader.load(texturePath, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;

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
        this.pickTargets.push(plane);
      });
    });
  }

  private updateLogoTexture(entity: ShardEntity) {
    const texturePath = this.theme === 'dark' ? entity.project.logo.dark : entity.project.logo.light;
    this.loader.load(texturePath, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      entity.logoPlanes.forEach((plane) => {
        plane.material.map = texture;
        plane.material.needsUpdate = true;
      });
    });
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
        color: this.theme === 'dark' ? '#D4BF9B' : '#393F4A',
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
        color: this.theme === 'dark' ? '#D4BF9B' : '#393F4A',
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
    if (this.externalLayoutActive) {
      this.constellationLines.forEach((line) => {
        line.visible = false;
      });
      return;
    }

    const slots = this.slotSystem.getSlots();
    const groups = [
      [slots[1], slots[2], slots[0], slots[6], slots[5]],
      [slots[3], slots[4], slots[0], slots[8], slots[7]],
      [slots[0], slots[9]]
    ];

    groups.forEach((group, groupIndex) => {
      const activePoints = group.filter(Boolean).filter((slot) => slot.activated).map((slot) => slot.worldPosition);
      const line = this.constellationLines[groupIndex];

      if (activePoints.length < 2) {
        line.visible = false;
        line.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));
        return;
      }

      const positions = new Float32Array(activePoints.length * 3);
      activePoints.forEach((point, index) => {
        positions[index * 3] = point.x;
        positions[index * 3 + 1] = point.y;
        positions[index * 3 + 2] = point.z;
      });

      line.visible = true;
      line.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      line.geometry.computeBoundingSphere();
    });
  }
}
