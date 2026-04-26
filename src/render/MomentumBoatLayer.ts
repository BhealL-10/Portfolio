import * as THREE from 'three';
import { getSharedTextureAsset, preloadImageAsset } from '../core/browserAssetCache';
import { isMobileRuntime } from '../core/device';
import { damp } from '../core/math';
import { SpriteSheetPlane } from '../game/SpriteSheetPlane';
import type { GameHudAvatarLayerSets } from '../game/GameHudDeferredAssets';
import type { LandingGrade } from '../game/gameSessionTypes';
import type { ThemeMode } from '../types/content';

const FRONT_SPRITE_URLS = {
  fail: new URL('../../assets/Avatar_asset/grade-sprite/gradeavatarfailsprite.png', import.meta.url).href,
  success: new URL('../../assets/Avatar_asset/grade-sprite/gradeavatargreatsuperperfectsprite.png', import.meta.url).href,
  twist: new URL('../../assets/Avatar_asset/grade-sprite/gradeavatartwistsprite.png', import.meta.url).href
} as const;
const FRONT_FRAME_COUNT = 4;
const FRONT_FRAME_DURATION_SECONDS = 0.096;
const BODY_LAYOUT = {
  frameWidth: 750,
  frameHeight: 1000,
  avatarX: 216.088104,
  avatarY: 77.655639,
  avatarSize: 312.044
} as const;
const AVATAR_LAYER_ORDER = ['oreille', 'face', 'eyes', 'facemotif', 'accessoire'] as const;
const AVATAR_LAYER_GEOMETRY = new THREE.PlaneGeometry(1, 1);
const FRONT_SPRITE_LAYOUT = { columns: FRONT_FRAME_COUNT, rows: 1 } as const;
const FRONT_ALPHA_TEST = 0.04;
const BOAT_FRONT_RENDER_ORDER = 12;
const BOAT_AVATAR_RENDER_ORDER_BASE = 10;
const MAX_DECORATIVE_BOATS = 3;
const BOAT_BASE_HEIGHT_PX = 88;
const BOAT_HEIGHT_VARIANCE_PX = 18;
const BOAT_EDGE_FADE_PX = 120;
const BOAT_SCREEN_LEAD_PX = 240;
const BOAT_RECYCLE_PADDING_PX = 320;
const BOAT_SPACING_MIN_PX = 600;
const BOAT_SPACING_MAX_PX = 1000;
const BOAT_REVEAL_DURATION_SECONDS = 0.9;
const BOAT_FIRST_REVEAL_DELAY_SECONDS = 1.4;
const BOAT_REVEAL_STAGGER_SECONDS = 5.2;
const BOAT_DRIFT_SPEED_MIN_PX = 18;
const BOAT_DRIFT_SPEED_MAX_PX = 42;
const BOAT_LAYER_VERTICAL_LIFT_PX: readonly [number, number, number] = [10, 15, 5];

type AvatarLayerKey = (typeof AVATAR_LAYER_ORDER)[number];
type BoatFrontAnimationKind = 'fail' | 'success' | 'twist';

interface AvatarSelection {
  oreille: number;
  face: number;
  eyes: number;
  facemotif: number;
  accessoire: number;
}

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

interface BoatLandingReaction {
  kind: BoatFrontAnimationKind;
  startedAtSeconds: number;
}

interface BoatBackgroundActor {
  root: THREE.Group;
  frontSprite: SpriteSheetPlane;
  avatarLayers: Record<AvatarLayerKey, THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>;
  avatarMaterials: Record<AvatarLayerKey, THREE.MeshBasicMaterial>;
  avatarSelection: AvatarSelection;
  baseXPx: number;
  widthPx: number;
  baseHeightPx: number;
  depthBandIndex: number;
  scaleSeed: number;
  depthSeed: number;
  spacingSeed: number;
  avatarSeed: number;
  surfacePhase: number;
  opacity: number;
  targetOpacity: number;
  revealAtSeconds: number;
  revealed: boolean;
  driftSpeedPx: number;
  reaction: BoatLandingReaction | null;
}

export interface BoatLandingFeedback {
  serial: number;
  grade: LandingGrade;
  twist: boolean;
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
  landingFeedback: BoatLandingFeedback | null;
}

interface BoatScreenBounds {
  leftEdgePx: number;
  rightEdgePx: number;
}

let avatarLayerSetsCache: GameHudAvatarLayerSets | null = null;
let momentumBoatDeferredAssetsPromise: Promise<typeof import('../game/GameHudDeferredAssets')> | null = null;

function loadMomentumBoatDeferredAssets() {
  momentumBoatDeferredAssetsPromise ??= import('../game/GameHudDeferredAssets');
  return momentumBoatDeferredAssetsPromise;
}

function createAvatarSelection(): AvatarSelection {
  return {
    oreille: 0,
    face: 0,
    eyes: 0,
    facemotif: 0,
    accessoire: 0
  };
}

function createSpriteTexture(textureUrl: string) {
  return getSharedTextureAsset(textureUrl, {
    colorSpace: THREE.SRGBColorSpace,
    wrapS: THREE.ClampToEdgeWrapping,
    wrapT: THREE.ClampToEdgeWrapping,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    generateMipmaps: false
  });
}

function resolveTextureDimensions(texture: THREE.Texture) {
  const image = texture.image as
    | {
        naturalWidth?: number;
        naturalHeight?: number;
        width?: number;
        height?: number;
      }
    | undefined;

  return {
    width: image?.naturalWidth ?? image?.width ?? BODY_LAYOUT.frameWidth * FRONT_FRAME_COUNT,
    height: image?.naturalHeight ?? image?.height ?? BODY_LAYOUT.frameHeight
  };
}

function resolveFrameAspectRatio(textureUrl: string) {
  const texture = createSpriteTexture(textureUrl);
  const dimensions = resolveTextureDimensions(texture);
  return Math.max(0.1, dimensions.width / FRONT_FRAME_COUNT) / Math.max(1, dimensions.height);
}

function resolveFrontSpriteUrl(kind: BoatFrontAnimationKind) {
  if (kind === 'fail') {
    return FRONT_SPRITE_URLS.fail;
  }
  if (kind === 'success') {
    return FRONT_SPRITE_URLS.success;
  }
  return FRONT_SPRITE_URLS.twist;
}

function resolveBoatFrontAnimationKind(grade: LandingGrade, twist: boolean): BoatFrontAnimationKind {
  if (twist) {
    return 'twist';
  }
  return grade === 'miss' ? 'fail' : 'success';
}

function resolveAvatarSlotCenter() {
  return {
    x: (BODY_LAYOUT.avatarX + BODY_LAYOUT.avatarSize * 0.5) / BODY_LAYOUT.frameWidth - 0.5,
    y: 0.5 - (BODY_LAYOUT.avatarY + BODY_LAYOUT.avatarSize * 0.5) / BODY_LAYOUT.frameHeight
  };
}

function resolveAvatarSlotScale() {
  return {
    x: BODY_LAYOUT.avatarSize / BODY_LAYOUT.frameWidth,
    y: BODY_LAYOUT.avatarSize / BODY_LAYOUT.frameHeight
  };
}

function resolveAvailableAvatarIndices(layerSets: GameHudAvatarLayerSets, layer: AvatarLayerKey) {
  return layerSets[layer]
    .map((src, index) => (src ? index : -1))
    .filter((index) => index >= 0);
}

function pickSeededIndex(indices: number[], seed: number) {
  if (indices.length <= 0) {
    return 0;
  }
  const normalizedSeed = Math.abs(Math.floor(seed * 9973));
  return indices[normalizedSeed % indices.length] ?? indices[0] ?? 0;
}

function resolveEdgeFade(screenX: number, widthPx: number, leftEdgePx: number, rightEdgePx: number) {
  const leftFade = THREE.MathUtils.clamp((screenX - (leftEdgePx - widthPx * 0.5)) / BOAT_EDGE_FADE_PX, 0, 1);
  const rightFade = THREE.MathUtils.clamp(((rightEdgePx + widthPx * 0.5) - screenX) / BOAT_EDGE_FADE_PX, 0, 1);
  return Math.min(leftFade, rightFade, 1);
}

export async function preloadMomentumBoatAssets(options: { phase?: 'critical' | 'full' } = {}) {
  const phase = options.phase ?? (isMobileRuntime() ? 'critical' : 'full');
  if (phase === 'full') {
    const { preloadAvatarLayerSets } = await loadMomentumBoatDeferredAssets();
    const layerSets = await preloadAvatarLayerSets();
    avatarLayerSetsCache = layerSets;
  }
  await Promise.all([
    preloadImageAsset(FRONT_SPRITE_URLS.fail, 'sync'),
    preloadImageAsset(FRONT_SPRITE_URLS.success, 'sync'),
    preloadImageAsset(FRONT_SPRITE_URLS.twist, 'sync')
  ]);
  SpriteSheetPlane.preload(FRONT_SPRITE_URLS.fail, FRONT_SPRITE_LAYOUT);
  SpriteSheetPlane.preload(FRONT_SPRITE_URLS.success, FRONT_SPRITE_LAYOUT);
  SpriteSheetPlane.preload(FRONT_SPRITE_URLS.twist, FRONT_SPRITE_LAYOUT);
}

export class MomentumBoatLayer {
  private readonly group = new THREE.Group();
  private readonly boats: BoatBackgroundActor[] = [];
  private readonly bodyFrameAspectRatio = resolveFrameAspectRatio(FRONT_SPRITE_URLS.twist);
  private visible = false;
  private elapsedSeconds = 0;
  private lastLandingSerial = 0;
  private layoutReady = false;
  private layoutViewportWidthPx = 0;
  private layoutViewportHeightPx = 0;
  private layoutMirrorMode = false;

  constructor(
    parent: THREE.Object3D,
    private readonly camera: THREE.PerspectiveCamera,
    _initialTheme: ThemeMode
  ) {
    this.group.visible = false;
    parent.add(this.group);

    const avatarSlotCenter = resolveAvatarSlotCenter();
    const avatarSlotScale = resolveAvatarSlotScale();

    for (let index = 0; index < MAX_DECORATIVE_BOATS; index += 1) {
      const root = new THREE.Group();
      root.visible = false;
      this.group.add(root);

      const avatarMaterials = {} as Record<AvatarLayerKey, THREE.MeshBasicMaterial>;
      const avatarLayers = {} as Record<AvatarLayerKey, THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>;

      AVATAR_LAYER_ORDER.forEach((layer, layerIndex) => {
        const material = new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          alphaTest: FRONT_ALPHA_TEST,
          depthWrite: false,
          depthTest: false,
          toneMapped: false,
          side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(AVATAR_LAYER_GEOMETRY, material);
        mesh.frustumCulled = false;
        mesh.position.set(avatarSlotCenter.x, avatarSlotCenter.y, layerIndex * 0.001);
        mesh.scale.set(avatarSlotScale.x, avatarSlotScale.y, 1);
        mesh.renderOrder = BOAT_AVATAR_RENDER_ORDER_BASE + layerIndex;
        avatarMaterials[layer] = material;
        avatarLayers[layer] = mesh;
        root.add(mesh);
      });

      const frontSprite = new SpriteSheetPlane({
        textureUrl: FRONT_SPRITE_URLS.twist,
        layout: FRONT_SPRITE_LAYOUT,
        width: 1,
        height: 1,
        alphaTest: FRONT_ALPHA_TEST,
        doubleSided: true,
        renderOrder: BOAT_FRONT_RENDER_ORDER
      });
      frontSprite.mesh.frustumCulled = false;
      frontSprite.mesh.material.depthWrite = false;
      frontSprite.mesh.material.depthTest = false;
      frontSprite.mesh.material.toneMapped = false;
      frontSprite.group.position.z = 0.02;
      root.add(frontSprite.group);

      this.boats.push({
        root,
        frontSprite,
        avatarLayers,
        avatarMaterials,
        avatarSelection: createAvatarSelection(),
        baseXPx: 0,
        widthPx: BOAT_BASE_HEIGHT_PX * this.bodyFrameAspectRatio,
        baseHeightPx: BOAT_BASE_HEIGHT_PX,
        depthBandIndex: index % BOAT_DEPTH_BANDS.length,
        scaleSeed: Math.random(),
        depthSeed: Math.random(),
        spacingSeed: Math.random(),
        avatarSeed: Math.random(),
        surfacePhase: Math.random() * Math.PI * 2,
        opacity: 0,
        targetOpacity: 0,
        revealAtSeconds: BOAT_FIRST_REVEAL_DELAY_SECONDS + index * BOAT_REVEAL_STAGGER_SECONDS,
        revealed: false,
        driftSpeedPx: BOAT_DRIFT_SPEED_MIN_PX,
        reaction: null
      });
    }

    this.boats.forEach((boat) => this.applyAvatarSelection(boat));
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
    this.lastLandingSerial = 0;
    this.layoutReady = false;
    this.layoutViewportWidthPx = 0;
    this.layoutViewportHeightPx = 0;
    this.layoutMirrorMode = false;
    this.boats.forEach((boat, index) => {
      this.reseedBoatVisual(boat);
      boat.baseXPx = 0;
      boat.opacity = 0;
      boat.targetOpacity = 0;
      boat.revealAtSeconds = BOAT_FIRST_REVEAL_DELAY_SECONDS + index * BOAT_REVEAL_STAGGER_SECONDS;
      boat.revealed = false;
      boat.reaction = null;
      boat.root.visible = false;
      boat.frontSprite.setTexture(FRONT_SPRITE_URLS.twist);
      boat.frontSprite.setFrame(0);
      boat.frontSprite.mesh.material.opacity = 0;
      AVATAR_LAYER_ORDER.forEach((layer) => {
        boat.avatarMaterials[layer].opacity = 0;
      });
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

    if (context.landingFeedback && context.landingFeedback.serial !== this.lastLandingSerial) {
      this.lastLandingSerial = context.landingFeedback.serial;
      const kind = resolveBoatFrontAnimationKind(context.landingFeedback.grade, context.landingFeedback.twist);
      this.boats.forEach((boat) => {
        if (!boat.revealed) {
          return;
        }
        boat.reaction = {
          kind,
          startedAtSeconds: this.elapsedSeconds
        };
      });
    }

    const driftDirection = context.mirrorMode ? -1 : 1;
    this.boats.forEach((boat) => {
      if (!boat.revealed && this.elapsedSeconds >= boat.revealAtSeconds) {
        boat.revealed = true;
      }
      if (boat.revealed) {
        boat.baseXPx += boat.driftSpeedPx * driftDirection * context.deltaTime;
      }
    });

    this.recycleBoats(bounds, context.travelOffsets, context.mirrorMode);
    this.boats.forEach((boat) => {
      this.renderBoat(boat, context, bounds);
    });
  }

  dispose() {
    this.boats.forEach((boat) => {
      boat.frontSprite.dispose();
      AVATAR_LAYER_ORDER.forEach((layer) => {
        boat.avatarMaterials[layer].dispose();
        boat.root.remove(boat.avatarLayers[layer]);
      });
      this.group.remove(boat.root);
    });
    this.boats.length = 0;
    if (this.group.parent) {
      this.group.parent.remove(this.group);
    }
  }

  private applyAvatarSelection(boat: BoatBackgroundActor) {
    if (!avatarLayerSetsCache) {
      return;
    }

    const nextSelection = createAvatarSelection();
    AVATAR_LAYER_ORDER.forEach((layer, layerIndex) => {
      const indices = resolveAvailableAvatarIndices(avatarLayerSetsCache!, layer);
      nextSelection[layer] = pickSeededIndex(indices, boat.avatarSeed + layerIndex * 0.173);
    });
    boat.avatarSelection = nextSelection;
    AVATAR_LAYER_ORDER.forEach((layer) => {
      const src = avatarLayerSetsCache?.[layer][nextSelection[layer]] ?? '';
      const texture = src ? createSpriteTexture(src) : null;
      const mesh = boat.avatarLayers[layer];
      mesh.visible = Boolean(texture);
      boat.avatarMaterials[layer].map = texture;
      boat.avatarMaterials[layer].needsUpdate = true;
    });
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
    this.boats.forEach((boat, index) => {
      this.reseedBoatVisual(boat);
      boat.baseXPx = cursorX - context.travelOffsets[boat.depthBandIndex]!;
      cursorX += this.resolveBoatSpacing(boat);
      boat.opacity = 0;
      boat.targetOpacity = 0;
      boat.revealAtSeconds =
        BOAT_FIRST_REVEAL_DELAY_SECONDS +
        index * BOAT_REVEAL_STAGGER_SECONDS +
        boat.spacingSeed * 2.4;
      boat.revealed = false;
      boat.root.visible = false;
      boat.frontSprite.mesh.material.opacity = 0;
      AVATAR_LAYER_ORDER.forEach((layer) => {
        boat.avatarMaterials[layer].opacity = 0;
      });
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
        if (!boat.revealed) {
          return;
        }
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
      if (!boat.revealed) {
        return;
      }
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
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const decorScale = this.resolveViewportDecorScale(context.viewportWidthPx, context.viewportHeightPx);
    const effectiveWidthPx = boat.widthPx * decorScale;
    const effectiveHeightPx = boat.baseHeightPx * decorScale;
    const travelOffsetPx = context.travelOffsets[boat.depthBandIndex]!;
    const screenX = boat.baseXPx + travelOffsetPx;
    const surfaceDriftPx =
      Math.sin(this.elapsedSeconds * (0.38 + boat.depthSeed * 0.18) + boat.surfacePhase) *
      (2.2 + context.overallEnergy * 1.8) *
      THREE.MathUtils.lerp(0.72, 1, decorScale);
    const secondaryBobPx =
      Math.sin(this.elapsedSeconds * (0.16 + boat.scaleSeed * 0.06) + boat.surfacePhase * 0.7) *
      (0.9 + context.midIntensity * 0.56) *
      THREE.MathUtils.lerp(0.72, 1, decorScale);
    const audioLiftPx =
      -(context.bassIntensity * 51.6 + context.overallEnergy * 31.1 + context.melodyIntensity * 20.7) *
      (coarsePointer ? 0.42 : 0.68) *
      THREE.MathUtils.lerp(0.8, 1, decorScale);
    const layerBottomY = context.bottomScreenYs[boat.depthBandIndex]!;
    const layerLiftPx = BOAT_LAYER_VERTICAL_LIFT_PX[boat.depthBandIndex] ?? BOAT_LAYER_VERTICAL_LIFT_PX[1];
    const bottomScreenY =
      layerBottomY -
      layerLiftPx * THREE.MathUtils.lerp(0.58, 0.92, decorScale) +
      surfaceDriftPx +
      secondaryBobPx +
      audioLiftPx -
      effectiveHeightPx * (coarsePointer ? 0.28 : 0.34);
    const centerScreenY = bottomScreenY - effectiveHeightPx * (coarsePointer ? 0.7 : 0.82);
    const depthBand = BOAT_DEPTH_BANDS[boat.depthBandIndex] ?? BOAT_DEPTH_BANDS[2]!;
    const unitsPerPixel = this.getUnitsPerPixelAtDepth(Math.abs(depthBand.localZ), context.viewportHeightPx);
    const localX = screenX * unitsPerPixel;
    const localY = (context.viewportHeightPx * 0.5 - centerScreenY) * unitsPerPixel;
    const edgeFade = resolveEdgeFade(screenX, effectiveWidthPx, bounds.leftEdgePx, bounds.rightEdgePx);
    const revealProgress = boat.revealed
      ? Math.min(1, Math.max(0, (this.elapsedSeconds - boat.revealAtSeconds) / BOAT_REVEAL_DURATION_SECONDS))
      : 0;
    boat.targetOpacity = revealProgress * edgeFade * THREE.MathUtils.lerp(0.94, 1, boat.depthSeed);
    boat.opacity = damp(boat.opacity, boat.targetOpacity, boat.targetOpacity > boat.opacity ? 3.8 : 5.6, context.deltaTime);
    boat.root.visible = boat.opacity > 0.01;

    const depthScale = THREE.MathUtils.lerp(0.78, 1.04, boat.depthSeed) * depthBand.scaleMultiplier;
    const worldWidth = effectiveWidthPx * unitsPerPixel * depthScale;
    const worldHeight = effectiveHeightPx * unitsPerPixel * depthScale;
    const directionSign = context.mirrorMode ? -1 : 1;
    boat.root.position.set(localX, localY, depthBand.localZ);
    boat.root.scale.set(worldWidth * directionSign, worldHeight, 1);

    const effectiveOpacity = THREE.MathUtils.clamp(boat.opacity * depthBand.opacityMultiplier, 0, 1);
    boat.frontSprite.mesh.material.opacity = effectiveOpacity;
    AVATAR_LAYER_ORDER.forEach((layer) => {
      boat.avatarMaterials[layer].opacity = effectiveOpacity;
    });

    if (boat.reaction) {
      const elapsed = this.elapsedSeconds - boat.reaction.startedAtSeconds;
      const frame = Math.floor(elapsed / FRONT_FRAME_DURATION_SECONDS);
      if (frame < FRONT_FRAME_COUNT) {
        boat.frontSprite.setTexture(resolveFrontSpriteUrl(boat.reaction.kind));
        boat.frontSprite.setFrame(frame);
      } else {
        boat.reaction = null;
        boat.frontSprite.setTexture(FRONT_SPRITE_URLS.twist);
        boat.frontSprite.setFrame(0);
      }
      return;
    }

    boat.frontSprite.setTexture(FRONT_SPRITE_URLS.twist);
    boat.frontSprite.setFrame(0);
  }

  private reseedBoatVisual(boat: BoatBackgroundActor) {
    boat.scaleSeed = Math.random();
    boat.depthSeed = Math.random();
    boat.spacingSeed = Math.random();
    boat.avatarSeed = Math.random();
    boat.surfacePhase = Math.random() * Math.PI * 2;
    boat.depthBandIndex = this.pickDepthBandIndex(boat.depthSeed);
    boat.driftSpeedPx = THREE.MathUtils.lerp(BOAT_DRIFT_SPEED_MIN_PX, BOAT_DRIFT_SPEED_MAX_PX, boat.depthSeed);
    boat.baseHeightPx =
      BOAT_BASE_HEIGHT_PX + THREE.MathUtils.lerp(-BOAT_HEIGHT_VARIANCE_PX, BOAT_HEIGHT_VARIANCE_PX, boat.scaleSeed);
    boat.widthPx = boat.baseHeightPx * this.bodyFrameAspectRatio;
    boat.reaction = null;
    this.applyAvatarSelection(boat);
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

  private resolveViewportDecorScale(viewportWidthPx: number, viewportHeightPx: number) {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const shortSide = Math.min(viewportWidthPx, viewportHeightPx);
    const longSide = Math.max(viewportWidthPx, viewportHeightPx);
    const shortBlend = THREE.MathUtils.clamp((shortSide - 360) / 520, 0, 1);
    const longBlend = THREE.MathUtils.clamp((longSide - 720) / 960, 0, 1);
    const blend = shortBlend * 0.72 + longBlend * 0.28;
    return coarsePointer
      ? THREE.MathUtils.lerp(0.68, 0.88, blend)
      : THREE.MathUtils.lerp(0.9, 1.02, blend);
  }
}
