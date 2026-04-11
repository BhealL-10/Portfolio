import * as THREE from 'three';
import { getSharedTextureAsset, preloadImageAsset } from '../core/browserAssetCache';
import { damp } from '../core/math';
import type { ThemeMode } from '../types/content';

const BOAT_TEXTURE_URL = new URL('../../assets/images/game/layer/boatmomentum/boatStickmankey.png', import.meta.url).href;
const BOAT_GEOMETRY = new THREE.PlaneGeometry(1, 1);
const MAX_DECORATIVE_BOATS = 3;
const BOAT_BASE_HEIGHT_PX = 68;
const BOAT_HEIGHT_VARIANCE_PX = 16;
const BOAT_EDGE_FADE_PX = 220;
const BOAT_SCREEN_LEAD_PX = 240;
const BOAT_RECYCLE_PADDING_PX = 320;
const BOAT_SPACING_MIN_PX = 600;
const BOAT_SPACING_MAX_PX = 1000;
const BOAT_LAYER_VERTICAL_LIFT_PX: readonly [number, number, number] = [26, 30, 34];

interface BoatDepthBand {
  localZ: number;
  renderOrder: number;
  scaleMultiplier: number;
  opacityMultiplier: number;
}

const BOAT_DEPTH_BANDS: readonly BoatDepthBand[] = [
  {
    localZ: -37,
    renderOrder: -2.85,
    scaleMultiplier: 0.76,
    opacityMultiplier: 0.62
  },
  {
    localZ: -29,
    renderOrder: -2.62,
    scaleMultiplier: 0.9,
    opacityMultiplier: 0.78
  },
  {
    localZ: -23,
    renderOrder: -2.42,
    scaleMultiplier: 1.02,
    opacityMultiplier: 0.92
  }
] as const;

interface BoatBackgroundActor {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  material: THREE.MeshBasicMaterial;
  baseXPx: number;
  widthPx: number;
  baseHeightPx: number;
  depthBandIndex: number;
  scaleSeed: number;
  depthSeed: number;
  spacingSeed: number;
  surfacePhase: number;
  opacity: number;
  targetOpacity: number;
}

export interface MomentumBoatLayerUpdateContext {
  deltaTime: number;
  viewportWidthPx: number;
  viewportHeightPx: number;
  travelOffsets: readonly [number, number, number];
  bottomScreenYs: readonly [number, number, number];
  mirrorMode: boolean;
  momentumRatio: number;
  bassIntensity: number;
  midIntensity: number;
  melodyIntensity: number;
  overallEnergy: number;
}

interface BoatScreenBounds {
  leftEdgePx: number;
  rightEdgePx: number;
}

export async function preloadMomentumBoatAssets() {
  await preloadImageAsset(BOAT_TEXTURE_URL, 'sync');
}

export class MomentumBoatLayer {
  private readonly group = new THREE.Group();
  private readonly boats: BoatBackgroundActor[] = [];
  private readonly texture = getSharedTextureAsset(BOAT_TEXTURE_URL, {
    colorSpace: THREE.SRGBColorSpace,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    generateMipmaps: true
  });
  private readonly textureAspectRatio =
    this.texture.image && 'naturalWidth' in this.texture.image && 'naturalHeight' in this.texture.image
      ? (this.texture.image.naturalWidth || 640) / Math.max(1, this.texture.image.naturalHeight || 384)
      : 1.67;
  private visible = false;
  private elapsedSeconds = 0;
  private layoutReady = false;
  private layoutViewportWidthPx = 0;
  private layoutViewportHeightPx = 0;
  private layoutMirrorMode: boolean = false;

  constructor(
    parent: THREE.Object3D,
    private readonly camera: THREE.PerspectiveCamera,
    _initialTheme: ThemeMode
  ) {
    this.group.visible = false;
    parent.add(this.group);

    for (let index = 0; index < MAX_DECORATIVE_BOATS; index += 1) {
      const material = new THREE.MeshBasicMaterial({
        map: this.texture,
        color: '#ffffff',
        transparent: true,
        opacity: 0,
        alphaTest: 0.05,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide,
        toneMapped: false
      });
      const mesh = new THREE.Mesh(BOAT_GEOMETRY, material);
      mesh.frustumCulled = false;
      mesh.visible = false;
      mesh.renderOrder = BOAT_DEPTH_BANDS[2]!.renderOrder;
      this.group.add(mesh);
      this.boats.push({
        mesh,
        material,
        baseXPx: 0,
        widthPx: BOAT_BASE_HEIGHT_PX * this.textureAspectRatio,
        baseHeightPx: BOAT_BASE_HEIGHT_PX,
        depthBandIndex: index % BOAT_DEPTH_BANDS.length,
        scaleSeed: Math.random(),
        depthSeed: Math.random(),
        spacingSeed: Math.random(),
        surfacePhase: Math.random() * Math.PI * 2,
        opacity: 0,
        targetOpacity: 0
      });
    }
  }

  setVisible(visible: boolean) {
    if (this.visible === visible) {
      return;
    }
    this.visible = visible;
    this.group.visible = visible;
  }

  setTheme(_theme: ThemeMode) {}

  resetForRun() {
    this.elapsedSeconds = 0;
    this.layoutReady = false;
    this.layoutViewportWidthPx = 0;
    this.layoutViewportHeightPx = 0;
    this.layoutMirrorMode = false;
    this.boats.forEach((boat) => {
      this.reseedBoatVisual(boat);
      boat.baseXPx = 0;
      boat.opacity = 0;
      boat.targetOpacity = 0;
      boat.mesh.visible = false;
      boat.material.opacity = 0;
    });
  }

  update(context: MomentumBoatLayerUpdateContext) {
    if (!this.visible) {
      return;
    }

    this.elapsedSeconds += context.deltaTime;
    const bounds = this.resolveScreenBounds(context.viewportWidthPx, context.viewportHeightPx);
    const viewportChanged =
      Math.abs(context.viewportWidthPx - this.layoutViewportWidthPx) > 0.5 ||
      Math.abs(context.viewportHeightPx - this.layoutViewportHeightPx) > 0.5;
    const mirrorModeChanged = context.mirrorMode !== this.layoutMirrorMode;

    if (!this.layoutReady || viewportChanged || mirrorModeChanged) {
      this.seedLayout(context, bounds);
    }

    this.recycleBoats(bounds, context.travelOffsets, context.mirrorMode);
    this.boats.forEach((boat) => {
      this.renderBoat(boat, context, bounds);
    });
  }

  dispose() {
    this.boats.forEach((boat) => {
      boat.material.dispose();
      this.group.remove(boat.mesh);
    });
    this.boats.length = 0;
    if (this.group.parent) {
      this.group.parent.remove(this.group);
    }
  }

  private seedLayout(
    context: MomentumBoatLayerUpdateContext,
    bounds: BoatScreenBounds
  ) {
    this.layoutReady = true;
    this.layoutViewportWidthPx = context.viewportWidthPx;
    this.layoutViewportHeightPx = context.viewportHeightPx;
    this.layoutMirrorMode = context.mirrorMode;

    let cursorX = bounds.leftEdgePx - BOAT_RECYCLE_PADDING_PX;
    this.boats.forEach((boat) => {
      this.reseedBoatVisual(boat);
      boat.baseXPx = cursorX - context.travelOffsets[boat.depthBandIndex]!;
      cursorX += this.resolveBoatSpacing(boat);
      boat.opacity = 0;
      boat.targetOpacity = 0;
      boat.mesh.visible = false;
      boat.material.opacity = 0;
    });
  }

  private recycleBoats(
    bounds: BoatScreenBounds,
    travelOffsets: readonly [number, number, number],
    mirrorMode: boolean
  ) {
    const directionSign = mirrorMode ? -1 : 1;
    if (directionSign > 0) {
      this.boats.forEach((boat) => {
        const travelOffsetPx = travelOffsets[boat.depthBandIndex]!;
        const screenX = boat.baseXPx + travelOffsetPx;
        if (screenX - boat.widthPx * 0.5 <= bounds.rightEdgePx + BOAT_RECYCLE_PADDING_PX) {
          return;
        }
        const leftmostBaseX = this.boats.reduce((minX, candidate) => Math.min(minX, candidate.baseXPx), Number.POSITIVE_INFINITY);
        boat.baseXPx = leftmostBaseX - this.resolveBoatSpacing(boat);
        this.reseedBoatVisual(boat);
      });
      return;
    }

    this.boats.forEach((boat) => {
      const travelOffsetPx = travelOffsets[boat.depthBandIndex]!;
      const screenX = boat.baseXPx + travelOffsetPx;
      if (screenX + boat.widthPx * 0.5 >= bounds.leftEdgePx - BOAT_RECYCLE_PADDING_PX) {
        return;
      }
      const rightmostBaseX = this.boats.reduce((maxX, candidate) => Math.max(maxX, candidate.baseXPx), Number.NEGATIVE_INFINITY);
      boat.baseXPx = rightmostBaseX + this.resolveBoatSpacing(boat);
      this.reseedBoatVisual(boat);
    });
  }

  private renderBoat(
    boat: BoatBackgroundActor,
    context: MomentumBoatLayerUpdateContext,
    bounds: BoatScreenBounds
  ) {
    const travelOffsetPx = context.travelOffsets[boat.depthBandIndex]!;
    const screenX = boat.baseXPx + travelOffsetPx;
    const surfaceDriftPx =
      Math.sin(this.elapsedSeconds * (0.42 + boat.depthSeed * 0.22) + boat.surfacePhase) * (6.2 + context.overallEnergy * 4.4);
    const secondaryBobPx =
      Math.sin(this.elapsedSeconds * (0.18 + boat.scaleSeed * 0.08) + boat.surfacePhase * 0.7) * (2 + context.midIntensity * 1.6);
    const audioLiftPx = -(context.bassIntensity * 3.6 + context.overallEnergy * 2.2 + context.melodyIntensity * 1.4);
    const layerBottomY = context.bottomScreenYs[boat.depthBandIndex]!;
    const layerLiftPx = BOAT_LAYER_VERTICAL_LIFT_PX[boat.depthBandIndex] ?? BOAT_LAYER_VERTICAL_LIFT_PX[1];
    const bottomScreenY = layerBottomY - layerLiftPx + surfaceDriftPx + secondaryBobPx + audioLiftPx - boat.baseHeightPx * 0.5; // slight overlap
    const centerScreenY = bottomScreenY - boat.baseHeightPx * 1.2;
    const depthBand = BOAT_DEPTH_BANDS[boat.depthBandIndex] ?? BOAT_DEPTH_BANDS[2]!;
    const unitsPerPixel = this.getUnitsPerPixelAtDepth(Math.abs(depthBand.localZ), context.viewportHeightPx);
    const localX = screenX * unitsPerPixel;
    const localY = (context.viewportHeightPx * 0.5 - centerScreenY) * unitsPerPixel;
    const edgeFade = resolveEdgeFade(screenX, boat.widthPx, bounds.leftEdgePx, bounds.rightEdgePx);

    boat.targetOpacity = edgeFade * depthBand.opacityMultiplier * THREE.MathUtils.lerp(0.48, 0.84, boat.depthSeed);
    boat.opacity = damp(boat.opacity, boat.targetOpacity, boat.targetOpacity > boat.opacity ? 3.8 : 5.6, context.deltaTime);
    boat.mesh.visible = boat.opacity > 0.01;

    const depthScale = THREE.MathUtils.lerp(0.78, 1.04, boat.depthSeed) * depthBand.scaleMultiplier;
    const worldWidth = boat.widthPx * unitsPerPixel * depthScale;
    const worldHeight = boat.baseHeightPx * unitsPerPixel * depthScale;
    boat.mesh.position.set(localX, localY, depthBand.localZ);
    const directionSign = context.mirrorMode ? -1 : 1;
    boat.mesh.scale.set(worldWidth * directionSign, worldHeight, 1);
    boat.mesh.renderOrder = depthBand.renderOrder;
    boat.material.opacity = THREE.MathUtils.clamp(boat.opacity, 0, 1);
  }

  private reseedBoatVisual(boat: BoatBackgroundActor) {
    boat.scaleSeed = Math.random();
    boat.depthSeed = Math.random();
    boat.spacingSeed = Math.random();
    boat.surfacePhase = Math.random() * Math.PI * 2;
    boat.depthBandIndex = this.pickDepthBandIndex(boat.depthSeed);
    boat.baseHeightPx =
      BOAT_BASE_HEIGHT_PX + THREE.MathUtils.lerp(-BOAT_HEIGHT_VARIANCE_PX, BOAT_HEIGHT_VARIANCE_PX, boat.scaleSeed);
    boat.widthPx = boat.baseHeightPx * this.textureAspectRatio;
  }

  private resolveBoatSpacing(boat: BoatBackgroundActor) {
    return THREE.MathUtils.lerp(BOAT_SPACING_MIN_PX, BOAT_SPACING_MAX_PX, boat.spacingSeed);
  }

  private pickDepthBandIndex(depthSeed: number) {
    if (depthSeed < 0.22) {
      return 0;
    }
    if (depthSeed < 0.68) {
      return 1;
    }
    return 2;
  }

  private resolveScreenBounds(viewportWidthPx: number, viewportHeightPx: number): BoatScreenBounds {
    const leadPx = Math.max(BOAT_SCREEN_LEAD_PX, viewportWidthPx * 0.14, viewportHeightPx * 0.1);
    return {
      leftEdgePx: -(viewportWidthPx + leadPx * 2) * 0.5,
      rightEdgePx: (viewportWidthPx + leadPx * 2) * 0.5
    };
  }

  private getUnitsPerPixelAtDepth(depth: number, viewportHeightPx: number) {
    const verticalFov =
      2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(this.camera.fov) * 0.5) / Math.max(0.0001, this.camera.zoom));
    const visibleHeightWorld = 2 * Math.tan(verticalFov * 0.5) * Math.max(0.1, depth);
    return visibleHeightWorld / Math.max(1, viewportHeightPx);
  }
}

function resolveEdgeFade(screenX: number, widthPx: number, leftEdgePx: number, rightEdgePx: number) {
  const leftFade = THREE.MathUtils.clamp((screenX - (leftEdgePx - widthPx * 0.5)) / BOAT_EDGE_FADE_PX, 0, 1);
  const rightFade = THREE.MathUtils.clamp(((rightEdgePx + widthPx * 0.5) - screenX) / BOAT_EDGE_FADE_PX, 0, 1);
  return Math.min(leftFade, rightFade, 1);
}
