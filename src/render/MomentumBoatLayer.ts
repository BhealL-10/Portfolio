import * as THREE from 'three';
import { getSharedTextureAsset, preloadImageAsset } from '../core/browserAssetCache';
import { damp } from '../core/math';
import type { ThemeMode } from '../types/content';

const BOAT_TEXTURE_URL = new URL('../../assets/images/game/layer/boatmomentum/boatStickmankey.png', import.meta.url).href;
const BOAT_GEOMETRY = new THREE.PlaneGeometry(1, 1);
const MAX_MOMENTUM_LINKED_BOATS = 10;
const MAX_RANDOM_CROSSING_BOATS = 8;
const MAX_BOAT_COUNT = MAX_MOMENTUM_LINKED_BOATS + MAX_RANDOM_CROSSING_BOATS;
const BOAT_BASE_HEIGHT_PX = 68;
const BOAT_HEIGHT_VARIANCE_PX = 14;
const BOAT_EDGE_FADE_PX = 180;
const FLOW_DIRECTION_EPSILON_PX_PER_SECOND = 20;
const MOMENTUM_CENTER_KEEP_PX = 118;
const MOMENTUM_CENTER_SPREAD_PX = 96;
const MOMENTUM_CENTER_FOLLOW_GAIN = 0.38;
const BOAT_SCREEN_LEAD_PX = 220;
const BOAT_ENTRY_GRACE_SECONDS = 0.42;
const BOAT_RANDOM_MIN_ACTIVE_SECONDS = 3.2;
const BOAT_ENTRY_SCREEN_SPEED_PX_PER_SECOND = 14;
const BOAT_DEBUG_FORCE_TEST_BOAT = false;
const BOAT_DEBUG_LOGS = false;
const BOAT_DEBUG_TEST_BOAT_HEIGHT_PX = 92;
const BOAT_DEBUG_TEST_BOAT_LANE_RATIO = 0.888;
const BOAT_DEBUG_TEST_BOAT_LANE_OFFSET_PX = -4;
const MOMENTUM_FLEET_SLOT_SPACING_PX = 46;
const MOMENTUM_FLEET_SCREEN_MARGIN_PX = 108;
const MOMENTUM_FLEET_HOME_PADDING_PX = 150;
const MOMENTUM_FLEET_BASE_RETURN_SPEED_PX_PER_SECOND = 36;
const MOMENTUM_FLEET_BASE_FOLLOW_SPEED_PX_PER_SECOND = 56;
const RANDOM_CROSSING_MIN_WORLD_SPEED_PX_PER_SECOND = 18;
const RANDOM_CROSSING_MAX_WORLD_SPEED_PX_PER_SECOND = 56;

interface BoatDepthBand {
  localZ: number;
  renderOrder: number;
  scaleMultiplier: number;
  opacityMultiplier: number;
}

const BOAT_DEPTH_BANDS: readonly BoatDepthBand[] = [
  {
    localZ: -30,
    renderOrder: -5,
    scaleMultiplier: 0.74,
    opacityMultiplier: 0.72
  },
  {
    localZ: -25,
    renderOrder: -5,
    scaleMultiplier: 0.88,
    opacityMultiplier: 0.84
  },
  {
    localZ: -20,
    renderOrder: -5,
    scaleMultiplier: 1,
    opacityMultiplier: 1
  }
] as const;

type BoatActorKind = 'momentum_linked' | 'random_crossing';
type BoatActorState = 'inactive' | 'active' | 'retiring';
type BoatSpawnSide = 'left' | 'right';
type BoatDirectionSign = 1 | -1;

interface DelayRange {
  min: number;
  max: number;
}

interface BoatRailPoint {
  x: number;
  y: number;
}

interface BoatRailPattern {
  railIndex: number;
  durationRange: DelayRange;
  horizontalSpanRangePx: readonly [number, number];
  verticalAmplitudeRangePx: readonly [number, number];
}

interface BoatBackgroundActor {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  material: THREE.MeshBasicMaterial;
  state: BoatActorState;
  kind: BoatActorKind | null;
  spawnSide: BoatSpawnSide;
  worldDirectionSign: BoatDirectionSign;
  travelDirectionSign: BoatDirectionSign;
  anchorXPx: number;
  xPx: number;
  velocityX: number;
  targetVelocityX: number;
  relativeSpeedBiasPxPerSecond: number;
  railPatternIndex: number;
  railProgress: number;
  railDurationSeconds: number;
  railHorizontalSpanPx: number;
  railVerticalSpanPx: number;
  railOffsetXPx: number;
  railOffsetYPx: number;
  ageSeconds: number;
  minActiveSeconds: number;
  opacity: number;
  targetOpacity: number;
  laneRatio: number;
  laneOffsetPx: number;
  baseHeightPx: number;
  widthPx: number;
  depthBandIndex: number;
  fleetSlotIndex: number;
  scaleSeed: number;
  speedSeed: number;
  depthSeed: number;
  surfacePhase: number;
}

export interface MomentumBoatLayerUpdateContext {
  deltaTime: number;
  viewportWidthPx: number;
  viewportHeightPx: number;
  travelOffsetPx: number;
  momentumRatio: number;
  bassIntensity: number;
  midIntensity: number;
  melodyIntensity: number;
  overallEnergy: number;
}

interface BoatScreenBounds {
  leftEdgePx: number;
  rightEdgePx: number;
  totalWidthPx: number;
}

const BOAT_RAIL_CURVE_1: readonly BoatRailPoint[] = [
  { x: 0.0, y: 0.1356 },
  { x: 0.0311, y: 0.0695 },
  { x: 0.0605, y: -0.0359 },
  { x: 0.087, y: -0.1831 },
  { x: 0.1112, y: -0.3544 },
  { x: 0.1338, y: -0.5396 },
  { x: 0.1556, y: -0.7315 },
  { x: 0.1781, y: -0.9178 },
  { x: 0.2079, y: -1.0 },
  { x: 0.2394, y: -0.959 },
  { x: 0.2668, y: -0.8247 },
  { x: 0.2907, y: -0.6507 },
  { x: 0.3116, y: -0.4525 },
  { x: 0.3308, y: -0.2438 },
  { x: 0.3488, y: -0.0277 },
  { x: 0.3661, y: 0.1915 },
  { x: 0.3833, y: 0.4117 },
  { x: 0.401, y: 0.6295 },
  { x: 0.4202, y: 0.838 },
  { x: 0.4446, y: 1.0 },
  { x: 0.4738, y: 0.9528 },
  { x: 0.4977, y: 0.7793 },
  { x: 0.5199, y: 0.5909 },
  { x: 0.5419, y: 0.4008 },
  { x: 0.5643, y: 0.2131 },
  { x: 0.5873, y: 0.0311 },
  { x: 0.6111, y: -0.1439 },
  { x: 0.6361, y: -0.308 },
  { x: 0.6622, y: -0.4609 },
  { x: 0.6896, y: -0.597 },
  { x: 0.7182, y: -0.7162 },
  { x: 0.7482, y: -0.8122 },
  { x: 0.7791, y: -0.8846 },
  { x: 0.8105, y: -0.8826 },
  { x: 0.8351, y: -0.7253 },
  { x: 0.8522, y: -0.505 },
  { x: 0.8678, y: -0.2769 },
  { x: 0.8851, y: -0.0579 },
  { x: 0.908, y: 0.1228 },
  { x: 0.9374, y: 0.2223 },
  { x: 0.9691, y: 0.257 },
  { x: 1.0, y: 0.1957 }
] as const;

const BOAT_RAIL_CURVE_2: readonly BoatRailPoint[] = [
  { x: 0.0, y: -1.0 },
  { x: 0.0193, y: -0.7571 },
  { x: 0.0432, y: -0.6067 },
  { x: 0.0673, y: -0.4691 },
  { x: 0.0915, y: -0.371 },
  { x: 0.1152, y: -0.379 },
  { x: 0.1389, y: -0.4006 },
  { x: 0.1631, y: -0.4025 },
  { x: 0.1876, y: -0.381 },
  { x: 0.2124, y: -0.334 },
  { x: 0.2373, y: -0.2633 },
  { x: 0.2624, y: -0.1785 },
  { x: 0.2875, y: -0.1019 },
  { x: 0.3126, y: -0.0717 },
  { x: 0.3373, y: -0.131 },
  { x: 0.3613, y: -0.2638 },
  { x: 0.3848, y: -0.4336 },
  { x: 0.4073, y: -0.2212 },
  { x: 0.4303, y: 0.0375 },
  { x: 0.4539, y: 0.2632 },
  { x: 0.4778, y: 0.4588 },
  { x: 0.502, y: 0.6248 },
  { x: 0.5265, y: 0.7609 },
  { x: 0.5512, y: 0.8669 },
  { x: 0.576, y: 0.9423 },
  { x: 0.601, y: 0.9863 },
  { x: 0.6261, y: 1.0 },
  { x: 0.6513, y: 0.9864 },
  { x: 0.6765, y: 0.9477 },
  { x: 0.7017, y: 0.8871 },
  { x: 0.727, y: 0.8087 },
  { x: 0.7522, y: 0.7168 },
  { x: 0.7773, y: 0.6173 },
  { x: 0.8024, y: 0.5244 },
  { x: 0.8275, y: 0.4541 },
  { x: 0.8527, y: 0.4269 },
  { x: 0.878, y: 0.4587 },
  { x: 0.9032, y: 0.5481 },
  { x: 0.9282, y: 0.674 },
  { x: 0.9533, y: 0.7893 },
  { x: 0.9781, y: 0.7418 },
  { x: 1.0, y: 0.5186 }
] as const;

const BOAT_RAIL_CURVE_3: readonly BoatRailPoint[] = [
  { x: 0.0, y: 0.0 },
  { x: 0.1, y: 0.1 },
  { x: 0.2, y: 0.2 },
  { x: 0.3, y: 0.1 },
  { x: 0.4, y: 0.0 },
  { x: 0.5, y: -0.05 },
  { x: 0.6, y: 0.0 },
  { x: 0.7, y: 0.05 },
  { x: 0.8, y: 0.0 },
  { x: 0.9, y: -0.02 },
  { x: 1.0, y: 0.0 }
] as const;

const BOAT_RAIL_CURVE_4: readonly BoatRailPoint[] = [
  { x: 0.0, y: 0.0 },
  { x: 0.1, y: 0.05 },
  { x: 0.2, y: 0.15 },
  { x: 0.3, y: 0.3 },
  { x: 0.4, y: 0.5 },
  { x: 0.5, y: 0.6 },
  { x: 0.6, y: 0.5 },
  { x: 0.7, y: 0.3 },
  { x: 0.8, y: 0.15 },
  { x: 0.9, y: 0.05 },
  { x: 1.0, y: 0.0 }
] as const;

const BOAT_RAIL_CURVE_5: readonly BoatRailPoint[] = [
  { x: 0.0, y: 0.0 },
  { x: 0.1, y: 0.1 },
  { x: 0.2, y: 0.2 },
  { x: 0.3, y: 0.1 },
  { x: 0.4, y: 0.0 },
  { x: 0.5, y: 0.05 },
  { x: 0.6, y: 0.15 },
  { x: 0.7, y: 0.05 },
  { x: 0.8, y: 0.0 },
  { x: 0.9, y: -0.02 },
  { x: 1.0, y: 0.0 }
] as const;

const BOAT_RAILS: readonly (readonly BoatRailPoint[])[] = [BOAT_RAIL_CURVE_1, BOAT_RAIL_CURVE_2, BOAT_RAIL_CURVE_3, BOAT_RAIL_CURVE_4, BOAT_RAIL_CURVE_5] as const;

const BOAT_RAIL_PATTERNS: readonly BoatRailPattern[] = [
  {
    railIndex: 0,
    durationRange: { min: 1.2, max: 1.7 },
    horizontalSpanRangePx: [126, 168],
    verticalAmplitudeRangePx: [16, 28]
  },
  {
    railIndex: 0,
    durationRange: { min: 1.55, max: 2.05 },
    horizontalSpanRangePx: [168, 214],
    verticalAmplitudeRangePx: [22, 34]
  },
  {
    railIndex: 0,
    durationRange: { min: 1.9, max: 2.45 },
    horizontalSpanRangePx: [214, 270],
    verticalAmplitudeRangePx: [18, 32]
  },
  {
    railIndex: 1,
    durationRange: { min: 1.3, max: 1.85 },
    horizontalSpanRangePx: [144, 188],
    verticalAmplitudeRangePx: [18, 30]
  },
  {
    railIndex: 1,
    durationRange: { min: 1.7, max: 2.3 },
    horizontalSpanRangePx: [188, 246],
    verticalAmplitudeRangePx: [24, 40]
  },
  {
    railIndex: 1,
    durationRange: { min: 2.1, max: 2.7 },
    horizontalSpanRangePx: [236, 304],
    verticalAmplitudeRangePx: [18, 34]
  },
  {
    railIndex: 2,
    durationRange: { min: 1.0, max: 1.5 },
    horizontalSpanRangePx: [120, 160],
    verticalAmplitudeRangePx: [12, 20]
  },
  {
    railIndex: 3,
    durationRange: { min: 2.0, max: 2.5 },
    horizontalSpanRangePx: [200, 250],
    verticalAmplitudeRangePx: [25, 35]
  },
  {
    railIndex: 4,
    durationRange: { min: 1.5, max: 2.0 },
    horizontalSpanRangePx: [150, 200],
    verticalAmplitudeRangePx: [15, 25]
  }
] as const;

export async function preloadMomentumBoatAssets() {
  await preloadImageAsset(BOAT_TEXTURE_URL, 'sync');
}

export class MomentumBoatLayer {
  private readonly group = new THREE.Group();
  private readonly boats: BoatBackgroundActor[] = [];
  private readonly momentumFleet: BoatBackgroundActor[] = [];
  private readonly randomCrossingPool: BoatBackgroundActor[] = [];
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
  private lastTravelOffsetPx = 0;
  private smoothedFlowVelocityPxPerSecond = 0;
  private lastWorldDirectionSign: BoatDirectionSign = 1;
  private randomCrossingSpawnCooldownSeconds = 0;
  private debugTestBoatInjected = false;
  private targetMomentumBoatCount = 0;

  constructor(
    parent: THREE.Object3D,
    private readonly camera: THREE.PerspectiveCamera,
    _initialTheme: ThemeMode
  ) {
    this.group.visible = false;
    parent.add(this.group);

    for (let index = 0; index < MAX_BOAT_COUNT; index += 1) {
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
      mesh.renderOrder = BOAT_DEPTH_BANDS[2]!.renderOrder;
      mesh.visible = false;
      this.group.add(mesh);
      this.boats.push({
        mesh,
        material,
        state: 'inactive',
        kind: null,
        spawnSide: 'left',
        worldDirectionSign: 1,
        travelDirectionSign: 1,
        anchorXPx: 0,
        xPx: 0,
        velocityX: 0,
        targetVelocityX: 0,
        relativeSpeedBiasPxPerSecond: 0,
        railPatternIndex: index % BOAT_RAIL_PATTERNS.length,
        railProgress: 0,
        railDurationSeconds: 1.6,
        railHorizontalSpanPx: 160,
        railVerticalSpanPx: 24,
        railOffsetXPx: 0,
        railOffsetYPx: 0,
        ageSeconds: 0,
        minActiveSeconds: 0,
        opacity: 0,
        targetOpacity: 0,
        laneRatio: 0.94,
        laneOffsetPx: 18,
        baseHeightPx: BOAT_BASE_HEIGHT_PX,
        widthPx: BOAT_BASE_HEIGHT_PX * this.textureAspectRatio,
        depthBandIndex: 2,
        fleetSlotIndex: index < MAX_MOMENTUM_LINKED_BOATS ? index : -1,
        scaleSeed: Math.random(),
        speedSeed: Math.random(),
        depthSeed: Math.random(),
        surfacePhase: Math.random() * Math.PI * 2
      });
      const actor = this.boats[this.boats.length - 1]!;
      if (index < MAX_MOMENTUM_LINKED_BOATS) {
        this.momentumFleet.push(actor);
      } else {
        this.randomCrossingPool.push(actor);
      }
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
    this.lastTravelOffsetPx = 0;
    this.smoothedFlowVelocityPxPerSecond = 0;
    this.randomCrossingSpawnCooldownSeconds = 0;
    this.lastWorldDirectionSign = 1;
    this.debugTestBoatInjected = false;

    this.boats.forEach((boat, index) => {
      if (index < MAX_MOMENTUM_LINKED_BOATS && boat.state === 'active') {
        boat.state = 'retiring';
        // Keep kind and other properties for natural exit
      } else {
        boat.state = 'inactive';
        boat.kind = null;
        boat.spawnSide = 'left';
        boat.worldDirectionSign = 1;
        boat.travelDirectionSign = 1;
        boat.anchorXPx = 0;
        boat.xPx = 0;
        boat.velocityX = 0;
        boat.targetVelocityX = 0;
        boat.relativeSpeedBiasPxPerSecond = 0;
        boat.railPatternIndex = index % BOAT_RAIL_PATTERNS.length;
        boat.railProgress = 0;
        boat.railDurationSeconds = 1.6;
        boat.railHorizontalSpanPx = 160;
        boat.railVerticalSpanPx = 24;
        boat.railOffsetXPx = 0;
        boat.railOffsetYPx = 0;
        boat.opacity = 0;
        boat.targetOpacity = 0;
        boat.ageSeconds = 0;
        boat.minActiveSeconds = 0;
        boat.depthBandIndex = 2;
        boat.mesh.visible = false;
        boat.material.opacity = 0;
      }
    });
  }

  update(context: MomentumBoatLayerUpdateContext) {
    if (!this.visible) {
      return;
    }

    this.elapsedSeconds += context.deltaTime;
    const rawFlowVelocityPxPerSecond = (context.travelOffsetPx - this.lastTravelOffsetPx) / Math.max(0.001, context.deltaTime);
    this.lastTravelOffsetPx = context.travelOffsetPx;
    this.smoothedFlowVelocityPxPerSecond = damp(
      this.smoothedFlowVelocityPxPerSecond,
      rawFlowVelocityPxPerSecond,
      6.5,
      context.deltaTime
    );

    const cameraTrackVelocityPxPerSecond = -this.smoothedFlowVelocityPxPerSecond;
    const worldDirectionSign = this.resolveWorldDirectionSign(cameraTrackVelocityPxPerSecond);
    this.targetMomentumBoatCount = this.resolveTargetMomentumBoatCount(context.momentumRatio);
    const bounds = this.resolveScreenBounds(context.viewportWidthPx, context.viewportHeightPx);

    if (BOAT_DEBUG_FORCE_TEST_BOAT) {
      this.ensureDebugTestBoat(bounds, context, worldDirectionSign);
      this.boats.forEach((boat) => {
        this.updateBoatActor(boat, context, bounds, cameraTrackVelocityPxPerSecond);
      });
      return;
    }

    this.ensureMomentumFleet(context, worldDirectionSign);

    const allowedRandomCrossings = this.resolveAllowedRandomCrossingCount(context.momentumRatio);

    this.updatePopulation(
      context,
      allowedRandomCrossings,
      worldDirectionSign,
      cameraTrackVelocityPxPerSecond
    );

    this.boats.forEach((boat) => {
      this.updateBoatActor(boat, context, bounds, cameraTrackVelocityPxPerSecond);
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

  private updatePopulation(
    context: MomentumBoatLayerUpdateContext,
    allowedRandomCrossings: number,
    worldDirectionSign: BoatDirectionSign,
    cameraTrackVelocityPxPerSecond: number
  ) {
    this.randomCrossingSpawnCooldownSeconds -= context.deltaTime;

    this.randomCrossingPool.forEach((boat) => {
      if (boat.state !== 'inactive' && boat.kind === 'random_crossing' && boat.worldDirectionSign !== worldDirectionSign) {
        this.beginRetirement(boat, 'world_direction_changed');
      }
    });

    const activeCrossingBoats = this.getBoatsByKind('random_crossing', false);
    if (activeCrossingBoats.length > allowedRandomCrossings) {
      activeCrossingBoats
        .sort((left, right) => right.ageSeconds - left.ageSeconds)
        .slice(0, activeCrossingBoats.length - allowedRandomCrossings)
        .forEach((boat) => this.beginRetirement(boat, 'population_trim'));
    }

    const crossingSpawnProbability = THREE.MathUtils.lerp(0.18, 0.64, THREE.MathUtils.clamp(context.momentumRatio, 0, 1));
    if (
      allowedRandomCrossings > 0 &&
      activeCrossingBoats.length < allowedRandomCrossings &&
      this.randomCrossingSpawnCooldownSeconds <= 0 &&
      Math.random() < crossingSpawnProbability
    ) {
      const spawned = this.spawnBoat('random_crossing', context, worldDirectionSign, cameraTrackVelocityPxPerSecond);
      this.randomCrossingSpawnCooldownSeconds = spawned
        ? randomRange(1.0, 2.6)
        : randomRange(0.5, 1.0);
    }
  }

  private updateBoatActor(
    boat: BoatBackgroundActor,
    context: MomentumBoatLayerUpdateContext,
    bounds: BoatScreenBounds,
    cameraTrackVelocityPxPerSecond: number
  ) {
    if (boat.state === 'inactive' || !boat.kind) {
      boat.mesh.visible = false;
      boat.material.opacity = 0;
      return;
    }

    if (boat.kind === 'momentum_linked') {
      this.updateMomentumFleetBoat(boat, context, bounds);
      return;
    }

    this.updateRandomCrossingBoat(boat, context, bounds, cameraTrackVelocityPxPerSecond);
  }

  private updateMomentumFleetBoat(
    boat: BoatBackgroundActor,
    context: MomentumBoatLayerUpdateContext,
    bounds: BoatScreenBounds
  ) {
    boat.ageSeconds += context.deltaTime;
    boat.travelDirectionSign = boat.worldDirectionSign;

    const engagement = this.resolveMomentumFleetEngagement(boat, context.momentumRatio, this.targetMomentumBoatCount);
    const homeX = this.resolveMomentumFleetHomeX(boat, context.viewportWidthPx);
    const visibleX = this.resolveMomentumFleetVisibleX(boat, context.viewportWidthPx);
    const targetX = THREE.MathUtils.lerp(homeX, visibleX, engagement);
    const followSpeedPxPerSecond =
      MOMENTUM_FLEET_BASE_FOLLOW_SPEED_PX_PER_SECOND +
      context.momentumRatio * 94 +
      boat.speedSeed * 18;
    const returnSpeedPxPerSecond =
      MOMENTUM_FLEET_BASE_RETURN_SPEED_PX_PER_SECOND + boat.fleetSlotIndex * 3 + boat.speedSeed * 10;
    const speedCapPxPerSecond = engagement > 0.02 ? followSpeedPxPerSecond : returnSpeedPxPerSecond;
    const followGain = engagement > 0.02 ? MOMENTUM_CENTER_FOLLOW_GAIN * 6.4 : MOMENTUM_CENTER_FOLLOW_GAIN * 7.3;

    boat.targetVelocityX = THREE.MathUtils.clamp(
      (targetX - boat.anchorXPx) * followGain,
      -speedCapPxPerSecond,
      speedCapPxPerSecond
    );
    boat.velocityX = damp(boat.velocityX, boat.targetVelocityX, engagement > 0.02 ? 4.2 : 3.6, context.deltaTime);
    boat.anchorXPx += boat.velocityX * context.deltaTime;
    this.updateRailMotion(boat, context);
    boat.xPx = boat.anchorXPx + boat.travelDirectionSign * boat.railOffsetXPx;

    this.renderBoat(boat, context, bounds, false);
  }

  private updateRandomCrossingBoat(
    boat: BoatBackgroundActor,
    context: MomentumBoatLayerUpdateContext,
    bounds: BoatScreenBounds,
    cameraTrackVelocityPxPerSecond: number
  ) {
    boat.ageSeconds += context.deltaTime;
    this.updateRandomCrossingMotion(boat, context, cameraTrackVelocityPxPerSecond);
    boat.anchorXPx += boat.velocityX * context.deltaTime;
    this.updateRailMotion(boat, context);
    const cameraTrackOffsetPx = -context.travelOffsetPx;
    boat.xPx = boat.anchorXPx - cameraTrackOffsetPx + boat.travelDirectionSign * boat.railOffsetXPx;
    const screenVelocityPxPerSecond = boat.velocityX - cameraTrackVelocityPxPerSecond;

    const offscreenLeftPx = boat.xPx + boat.widthPx * 0.9 < bounds.leftEdgePx - boat.widthPx * 2.2;
    const offscreenRightPx = boat.xPx - boat.widthPx * 0.9 > bounds.rightEdgePx + boat.widthPx * 2.2;
    const failedEntryFromLeft =
      boat.spawnSide === 'left' &&
      boat.xPx + boat.widthPx * 0.25 < bounds.leftEdgePx &&
      screenVelocityPxPerSecond <= BOAT_ENTRY_SCREEN_SPEED_PX_PER_SECOND;
    const failedEntryFromRight =
      boat.spawnSide === 'right' &&
      boat.xPx - boat.widthPx * 0.25 > bounds.rightEdgePx &&
      screenVelocityPxPerSecond >= -BOAT_ENTRY_SCREEN_SPEED_PX_PER_SECOND;

    const canCullForOffscreen = boat.ageSeconds >= BOAT_ENTRY_GRACE_SECONDS;
    if (
      canCullForOffscreen &&
      (
        failedEntryFromLeft ||
        failedEntryFromRight ||
        (boat.state === 'retiring' && (offscreenLeftPx || offscreenRightPx)) ||
        offscreenLeftPx ||
        offscreenRightPx
      )
    ) {
      this.deactivateBoat(
        boat,
        failedEntryFromLeft
          ? 'failed_entry_left'
          : failedEntryFromRight
            ? 'failed_entry_right'
            : offscreenLeftPx
              ? 'offscreen_left'
              : 'offscreen_right',
        { offscreenLeftPx, offscreenRightPx }
      );
      return;
    }

    this.renderBoat(boat, context, bounds, true);
  }

  private renderBoat(
    boat: BoatBackgroundActor,
    context: MomentumBoatLayerUpdateContext,
    bounds: BoatScreenBounds,
    applyEdgeFade: boolean
  ) {
    const surfaceDriftPx =
      Math.sin(this.elapsedSeconds * (0.58 + boat.depthSeed * 0.19) + boat.surfacePhase) * (1.0 + context.overallEnergy * 1.1);
    const bassMultiplier = 1.2 + boat.depthSeed * 0.4;
    const midMultiplier = 0.4 + boat.depthSeed * 0.3;
    const melodyMultiplier = 0.6 + boat.depthSeed * 0.4;
    const energyMultiplier = 0.8 + boat.depthSeed * 0.3;
    const musicLiftPx = -(context.bassIntensity * bassMultiplier + context.midIntensity * midMultiplier + context.melodyIntensity * melodyMultiplier + context.overallEnergy * energyMultiplier);
    const bottomScreenY =
      context.viewportHeightPx * boat.laneRatio +
      boat.laneOffsetPx +
      surfaceDriftPx +
      musicLiftPx +
      20;
    const centerScreenY = bottomScreenY - boat.baseHeightPx * 0.5;
    const depthBand = BOAT_DEPTH_BANDS[boat.depthBandIndex] ?? BOAT_DEPTH_BANDS[2]!;
    const unitsPerPixel = this.getUnitsPerPixelAtDepth(Math.abs(depthBand.localZ), context.viewportHeightPx);
    const localX = boat.xPx * unitsPerPixel;
    const localY = (context.viewportHeightPx * 0.5 - centerScreenY) * unitsPerPixel;
    const edgeFade = applyEdgeFade ? resolveEdgeFade(boat.xPx, boat.widthPx, bounds.leftEdgePx, bounds.rightEdgePx) : 1;
    boat.targetOpacity = 1 * edgeFade;
    boat.opacity = damp(boat.opacity, boat.targetOpacity, boat.targetOpacity > boat.opacity ? 4.5 : 5.2, context.deltaTime);

    boat.mesh.visible = boat.opacity > 0.01;

    const depthScale = THREE.MathUtils.lerp(0.78, 1.02, boat.depthSeed) * depthBand.scaleMultiplier;
    const worldWidth = boat.widthPx * unitsPerPixel * depthScale;
    const worldHeight = boat.baseHeightPx * unitsPerPixel * depthScale;
    boat.mesh.position.set(localX, localY, depthBand.localZ);
    boat.mesh.scale.set(worldWidth * boat.worldDirectionSign, worldHeight, 1);
    boat.mesh.renderOrder = depthBand.renderOrder;
    boat.material.opacity = THREE.MathUtils.clamp(boat.opacity, 0, 1);
  }

  private updateRandomCrossingMotion(
    boat: BoatBackgroundActor,
    context: MomentumBoatLayerUpdateContext,
    cameraTrackVelocityPxPerSecond: number
  ) {
    const worldDirectionSign = boat.worldDirectionSign;
    const cameraSpeedMagnitude = Math.abs(cameraTrackVelocityPxPerSecond);
    const cruisingSpeedPxPerSecond =
      boat.state === 'retiring'
        ? Math.max(RANDOM_CROSSING_MIN_WORLD_SPEED_PX_PER_SECOND * 0.82, boat.relativeSpeedBiasPxPerSecond * 0.9)
        : Math.max(
            RANDOM_CROSSING_MIN_WORLD_SPEED_PX_PER_SECOND,
            Math.min(boat.relativeSpeedBiasPxPerSecond, cameraSpeedMagnitude * 0.78 + 4)
          );
    const targetVelocity = worldDirectionSign * cruisingSpeedPxPerSecond;
    boat.targetVelocityX = enforceVelocityMagnitude(targetVelocity, worldDirectionSign, 16);
    boat.travelDirectionSign = worldDirectionSign;
    boat.velocityX = damp(boat.velocityX, boat.targetVelocityX, 2.8, context.deltaTime);
  }

  private updateRailMotion(boat: BoatBackgroundActor, context: MomentumBoatLayerUpdateContext) {
    const pattern = BOAT_RAIL_PATTERNS[boat.railPatternIndex]!;
    const rail = BOAT_RAILS[pattern.railIndex]!;
    const progressDelta =
      (context.deltaTime / Math.max(0.75, boat.railDurationSeconds)) *
      THREE.MathUtils.lerp(0.92, 1.08, THREE.MathUtils.clamp(Math.abs(boat.velocityX) / 220, 0, 1));

    boat.railProgress += progressDelta;
    if (boat.railProgress >= 1) {
      const currentRailWorldXPx = boat.anchorXPx + boat.travelDirectionSign * boat.railOffsetXPx;
      this.assignRailPattern(boat, currentRailWorldXPx, true);
    }

    const point = sampleBoatRail(rail, boat.railProgress);
    boat.railOffsetXPx = centeredRailX(point.x) * boat.railHorizontalSpanPx;
    boat.railOffsetYPx = 0;
  }

  private spawnBoat(
    kind: BoatActorKind,
    context: MomentumBoatLayerUpdateContext,
    worldDirectionSign: BoatDirectionSign,
    cameraTrackVelocityPxPerSecond: number
  ) {
    const inactiveBoat = this.randomCrossingPool.find((boat) => boat.state === 'inactive');
    if (!inactiveBoat) {
      return false;
    }
    return this.activateBoat(inactiveBoat, kind, context, worldDirectionSign, cameraTrackVelocityPxPerSecond);
  }

  private activateBoat(
    boat: BoatBackgroundActor,
    kind: BoatActorKind,
    context: MomentumBoatLayerUpdateContext,
    worldDirectionSign: BoatDirectionSign,
    cameraTrackVelocityPxPerSecond: number
  ) {
    if (kind !== 'random_crossing') {
      return false;
    }

    boat.state = 'active';
    boat.kind = kind;
    boat.worldDirectionSign = worldDirectionSign;
    boat.ageSeconds = 0;
    boat.minActiveSeconds = BOAT_RANDOM_MIN_ACTIVE_SECONDS;
    boat.opacity = 0;
    boat.targetOpacity = 0;
    boat.scaleSeed = Math.random();
    boat.speedSeed = Math.random();
    boat.depthSeed = Math.random();
    boat.surfacePhase = Math.random() * Math.PI * 2;
    boat.railProgress = 0;
    boat.railOffsetXPx = 0;
    boat.railOffsetYPx = 0;
    boat.laneRatio =
      THREE.MathUtils.lerp(0.862, 0.918, Math.random());
    boat.laneOffsetPx =
      THREE.MathUtils.lerp(-12, 14, Math.random());
    boat.baseHeightPx = BOAT_BASE_HEIGHT_PX + THREE.MathUtils.lerp(-BOAT_HEIGHT_VARIANCE_PX, BOAT_HEIGHT_VARIANCE_PX, Math.random());
    boat.widthPx = boat.baseHeightPx * this.textureAspectRatio;
    boat.depthBandIndex = this.pickDepthBandIndex(kind);
    boat.relativeSpeedBiasPxPerSecond = randomRange(
      RANDOM_CROSSING_MIN_WORLD_SPEED_PX_PER_SECOND,
      RANDOM_CROSSING_MAX_WORLD_SPEED_PX_PER_SECOND
    );
    boat.travelDirectionSign = worldDirectionSign;

    const initialVelocity = enforceVelocityMagnitude(
      worldDirectionSign * boat.relativeSpeedBiasPxPerSecond,
      boat.travelDirectionSign,
      RANDOM_CROSSING_MIN_WORLD_SPEED_PX_PER_SECOND
    );
    const initialScreenVelocityPxPerSecond = initialVelocity - cameraTrackVelocityPxPerSecond;
    boat.spawnSide = worldDirectionSign > 0 ? 'left' : 'right';

    if (initialScreenVelocityPxPerSecond * worldDirectionSign > -BOAT_ENTRY_SCREEN_SPEED_PX_PER_SECOND) {
      boat.state = 'inactive';
      boat.kind = null;
      return false;
    }

    const spawnPaddingPx =
      boat.widthPx *
      THREE.MathUtils.lerp(0.65, 1.15, Math.random());
    const visibleHalfWidthPx = context.viewportWidthPx * 0.5;
    const spawnX =
      boat.spawnSide === 'left' ? -visibleHalfWidthPx - spawnPaddingPx : visibleHalfWidthPx + spawnPaddingPx;
    const cameraTrackOffsetPx = -context.travelOffsetPx;
    const spawnWorldXPx = cameraTrackOffsetPx + spawnX;
    boat.anchorXPx = spawnWorldXPx;
    boat.xPx = spawnX;

    this.assignRailPattern(boat, spawnWorldXPx, true);

    boat.velocityX = initialVelocity;
    boat.targetVelocityX = boat.velocityX;
    this.debugBoatEvent('spawn', boat, {
      spawnX,
      spawnWorldXPx,
      cameraTrackVelocityPxPerSecond,
      initialScreenVelocityPxPerSecond
    });
    return true;
  }

  private assignRailPattern(boat: BoatBackgroundActor, currentRailWorldXPx: number, preserveRailWorldX: boolean) {
    const nextPatternIndex = this.pickNextPatternIndex(boat.railPatternIndex);
    const pattern = BOAT_RAIL_PATTERNS[nextPatternIndex]!;
    const startPoint = BOAT_RAILS[pattern.railIndex]![0]!;

    boat.railPatternIndex = nextPatternIndex;
    boat.railDurationSeconds =
      randomRange(pattern.durationRange.min, pattern.durationRange.max) * THREE.MathUtils.lerp(0.92, 1.08, boat.speedSeed);
    boat.railHorizontalSpanPx =
      randomRange(pattern.horizontalSpanRangePx[0], pattern.horizontalSpanRangePx[1]) *
      (0.9 + boat.scaleSeed * 0.16);
    boat.railVerticalSpanPx =
      randomRange(pattern.verticalAmplitudeRangePx[0], pattern.verticalAmplitudeRangePx[1]) *
      (0.92 + boat.depthSeed * 0.14);
    boat.railProgress = Math.random() * 0.08;

    const startOffsetX = centeredRailX(startPoint.x) * boat.railHorizontalSpanPx;
    if (preserveRailWorldX) {
      boat.anchorXPx = currentRailWorldXPx - boat.travelDirectionSign * startOffsetX;
    }
    boat.railOffsetXPx = startOffsetX;
    boat.railOffsetYPx = 0;
  }

  private beginRetirement(boat: BoatBackgroundActor, reason = 'unspecified') {
    if (boat.state !== 'active') {
      return;
    }
    if (boat.ageSeconds < boat.minActiveSeconds) {
      return;
    }
    boat.state = 'retiring';
    this.debugBoatEvent('retire', boat, { reason });
  }

  private deactivateBoat(
    boat: BoatBackgroundActor,
    reason = 'unspecified',
    extra: Record<string, unknown> = {}
  ) {
    this.debugBoatEvent('deactivate', boat, { reason, ...extra });
    boat.state = 'inactive';
    boat.kind = null;
    boat.opacity = 0;
    boat.targetOpacity = 0;
    boat.velocityX = 0;
    boat.targetVelocityX = 0;
    boat.minActiveSeconds = 0;
    boat.mesh.visible = false;
    boat.material.opacity = 0;
  }

  private getBoatsByKind(kind: BoatActorKind, includeRetiring: boolean) {
    return this.boats.filter((boat) => boat.kind === kind && (includeRetiring || boat.state === 'active'));
  }

  private pickNextPatternIndex(previousIndex: number) {
    let nextIndex = Math.floor(Math.random() * BOAT_RAIL_PATTERNS.length);
    if (BOAT_RAIL_PATTERNS.length > 1 && nextIndex === previousIndex) {
      nextIndex = (nextIndex + 1) % BOAT_RAIL_PATTERNS.length;
    }
    return nextIndex;
  }

  private pickDepthBandIndex(kind: BoatActorKind) {
    const roll = Math.random();
    if (kind === 'momentum_linked') {
      if (roll < 0.18) {
        return 0;
      }
      if (roll < 0.62) {
        return 1;
      }
      return 2;
    }

    if (roll < 0.28) {
      return 0;
    }
    if (roll < 0.68) {
      return 1;
    }
    return 2;
  }

  private resolveWorldDirectionSign(cameraTrackVelocityPxPerSecond: number): BoatDirectionSign {
    if (Math.abs(cameraTrackVelocityPxPerSecond) > FLOW_DIRECTION_EPSILON_PX_PER_SECOND) {
      this.lastWorldDirectionSign = cameraTrackVelocityPxPerSecond >= 0 ? 1 : -1;
    }
    return this.lastWorldDirectionSign;
  }

  private resolveTargetMomentumBoatCount(momentumRatio: number) {
    if (momentumRatio < 0.18) {
      return 0;
    }
    return THREE.MathUtils.clamp(Math.floor((momentumRatio * 100 - 10) / 10), 0, MAX_MOMENTUM_LINKED_BOATS);
  }

  private resolveAllowedRandomCrossingCount(momentumRatio: number) {
    if (momentumRatio < 0.12) {
      return 0;
    }
    if (momentumRatio < 0.22) {
      return 1;
    }
    if (momentumRatio < 0.38) {
      return 2;
    }
    if (momentumRatio < 0.56) {
      return 3;
    }
    if (momentumRatio < 0.75) {
      return 4;
    }
    return 5;
  }

  private resolveScreenBounds(viewportWidthPx: number, viewportHeightPx: number): BoatScreenBounds {
    const leadPx = Math.max(BOAT_SCREEN_LEAD_PX, viewportWidthPx * 0.14, viewportHeightPx * 0.1);
    const totalWidthPx = viewportWidthPx + leadPx * 2;
    return {
      totalWidthPx,
      leftEdgePx: -totalWidthPx * 0.5,
      rightEdgePx: totalWidthPx * 0.5
    };
  }

  private getUnitsPerPixelAtDepth(depth: number, viewportHeightPx: number) {
    const verticalFov =
      2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(this.camera.fov) * 0.5) / Math.max(0.0001, this.camera.zoom));
    const visibleHeightWorld = 2 * Math.tan(verticalFov * 0.5) * Math.max(0.1, depth);
    return visibleHeightWorld / Math.max(1, viewportHeightPx);
  }

  private ensureMomentumFleet(context: MomentumBoatLayerUpdateContext, worldDirectionSign: BoatDirectionSign) {
    this.momentumFleet.forEach((boat) => {
      if (boat.fleetSlotIndex < this.targetMomentumBoatCount && boat.kind !== 'momentum_linked') {
        this.configureMomentumFleetBoat(boat, context, worldDirectionSign);
        return;
      }

      if (boat.kind === 'momentum_linked' && boat.worldDirectionSign !== worldDirectionSign) {
        this.configureMomentumFleetBoat(boat, context, worldDirectionSign);
        return;
      }

      if (boat.kind === 'momentum_linked' && boat.fleetSlotIndex >= this.targetMomentumBoatCount) {
        this.beginRetirement(boat, 'momentum_falloff');
      }
    });
  }

  private configureMomentumFleetBoat(
    boat: BoatBackgroundActor,
    context: MomentumBoatLayerUpdateContext,
    worldDirectionSign: BoatDirectionSign
  ) {
    const slotRatio = MAX_MOMENTUM_LINKED_BOATS <= 1 ? 0 : boat.fleetSlotIndex / (MAX_MOMENTUM_LINKED_BOATS - 1);

    boat.state = 'active';
    boat.kind = 'momentum_linked';
    boat.spawnSide = worldDirectionSign > 0 ? 'left' : 'right';
    boat.worldDirectionSign = worldDirectionSign;
    boat.travelDirectionSign = worldDirectionSign;
    boat.ageSeconds = 0;
    boat.minActiveSeconds = 0;
    boat.opacity = 1;
    boat.targetOpacity = 1;
    boat.velocityX = 0;
    boat.targetVelocityX = 0;
    boat.relativeSpeedBiasPxPerSecond = 0;
    boat.laneRatio = THREE.MathUtils.lerp(0.874, 0.926, 0.22 + boat.depthSeed * 0.64);
    boat.laneOffsetPx = THREE.MathUtils.lerp(-10, 16, 0.18 + boat.scaleSeed * 0.72);
    boat.baseHeightPx =
      BOAT_BASE_HEIGHT_PX + THREE.MathUtils.lerp(-BOAT_HEIGHT_VARIANCE_PX, BOAT_HEIGHT_VARIANCE_PX, 0.18 + boat.scaleSeed * 0.72);
    boat.widthPx = boat.baseHeightPx * this.textureAspectRatio;
    boat.depthBandIndex = boat.depthSeed < 0.18 ? 0 : boat.depthSeed < 0.62 ? 1 : 2;
    boat.railPatternIndex = Math.floor(Math.random() * BOAT_RAIL_PATTERNS.length);
    boat.surfacePhase = slotRatio * Math.PI * 1.35 + boat.surfacePhase * 0.15;

    const homeX = this.resolveMomentumFleetHomeX(boat, context.viewportWidthPx);
    boat.anchorXPx = homeX;
    boat.xPx = homeX;
    this.assignRailPattern(boat, homeX, true);
    boat.railProgress = (slotRatio * 0.58 + boat.speedSeed * 0.26) % 1;
    this.updateRailMotion(boat, {
      ...context,
      deltaTime: 0
    });
    this.debugBoatEvent('momentum_configure', boat, { homeX });
  }

  private resolveMomentumFleetEngagement(boat: BoatBackgroundActor, momentumRatio: number, targetCount: number) {
    if (boat.fleetSlotIndex >= targetCount) return 0;
    const slotRatio = MAX_MOMENTUM_LINKED_BOATS <= 1 ? 0 : boat.fleetSlotIndex / (MAX_MOMENTUM_LINKED_BOATS - 1);
    const revealStart = THREE.MathUtils.lerp(0.04, 0.82, slotRatio);
    const revealEnd = Math.min(1, revealStart + 0.26);
    return THREE.MathUtils.smootherstep(momentumRatio, revealStart, revealEnd);
  }

  private resolveMomentumFleetHomeX(boat: BoatBackgroundActor, viewportWidthPx: number) {
    const halfWidthPx = viewportWidthPx * 0.5;
    const baseHomeX =
      boat.worldDirectionSign > 0
        ? -halfWidthPx - MOMENTUM_FLEET_HOME_PADDING_PX
        : halfWidthPx + MOMENTUM_FLEET_HOME_PADDING_PX;
    return baseHomeX - boat.worldDirectionSign * boat.fleetSlotIndex * MOMENTUM_FLEET_SLOT_SPACING_PX * 0.64;
  }

  private resolveMomentumFleetVisibleX(boat: BoatBackgroundActor, viewportWidthPx: number) {
    const halfWidthPx = viewportWidthPx * 0.5;
    const formationIndex = MAX_MOMENTUM_LINKED_BOATS - 1 - boat.fleetSlotIndex;
    const rearScreenEdgeX =
      boat.worldDirectionSign > 0
        ? -halfWidthPx + MOMENTUM_FLEET_SCREEN_MARGIN_PX
        : halfWidthPx - MOMENTUM_FLEET_SCREEN_MARGIN_PX;
    const inwardDepthPx = MOMENTUM_CENTER_KEEP_PX + formationIndex * MOMENTUM_FLEET_SLOT_SPACING_PX;
    const cappedDepthPx = Math.min(halfWidthPx - MOMENTUM_FLEET_SCREEN_MARGIN_PX, inwardDepthPx + MOMENTUM_CENTER_SPREAD_PX);
    return rearScreenEdgeX + boat.worldDirectionSign * cappedDepthPx;
  }

  private ensureDebugTestBoat(
    bounds: BoatScreenBounds,
    context: MomentumBoatLayerUpdateContext,
    worldDirectionSign: BoatDirectionSign
  ) {
    if (this.debugTestBoatInjected) {
      return;
    }
    const boat = this.boats.find((candidate) => candidate.state === 'inactive');
    if (!boat) {
      return;
    }
    this.debugTestBoatInjected = true;
    boat.state = 'active';
    boat.kind = 'random_crossing';
    boat.spawnSide = 'left';
    boat.worldDirectionSign = worldDirectionSign;
    boat.travelDirectionSign = worldDirectionSign;
    boat.anchorXPx = 0;
    boat.xPx = 0;
    boat.velocityX = 0;
    boat.targetVelocityX = 0;
    boat.relativeSpeedBiasPxPerSecond = 0;
    boat.railPatternIndex = 0;
    boat.railProgress = 0;
    boat.railDurationSeconds = 999;
    boat.railHorizontalSpanPx = 0;
    boat.railVerticalSpanPx = 0;
    boat.railOffsetXPx = 0;
    boat.railOffsetYPx = 0;
    boat.ageSeconds = 0;
    boat.minActiveSeconds = Number.POSITIVE_INFINITY;
    boat.opacity = 1;
    boat.targetOpacity = 1;
    boat.laneRatio = BOAT_DEBUG_TEST_BOAT_LANE_RATIO;
    boat.laneOffsetPx = BOAT_DEBUG_TEST_BOAT_LANE_OFFSET_PX;
    boat.baseHeightPx = BOAT_DEBUG_TEST_BOAT_HEIGHT_PX;
    boat.widthPx = boat.baseHeightPx * this.textureAspectRatio;
    boat.depthBandIndex = 2;
    boat.scaleSeed = 1;
    boat.speedSeed = 0.5;
    boat.depthSeed = 1;
    boat.surfacePhase = 0;
    boat.mesh.visible = true;
    boat.material.opacity = 1;

    const cameraTrackOffsetPx = -context.travelOffsetPx;
    const testX = THREE.MathUtils.clamp(0, bounds.leftEdgePx + boat.widthPx, bounds.rightEdgePx - boat.widthPx);
    boat.anchorXPx = cameraTrackOffsetPx + testX;
    boat.xPx = testX;
    this.debugBoatEvent('debug_test_spawn', boat, { cameraTrackOffsetPx, testX });
  }

  private debugBoatEvent(event: string, boat: BoatBackgroundActor, extra: Record<string, unknown> = {}) {
    if (!BOAT_DEBUG_LOGS) {
      return;
    }
    console.info('[MomentumBoatLayer]', event, {
      kind: boat.kind,
      state: boat.state,
      spawnSide: boat.spawnSide,
      xPx: roundBoatDebugValue(boat.xPx),
      anchorXPx: roundBoatDebugValue(boat.anchorXPx),
      velocityX: roundBoatDebugValue(boat.velocityX),
      targetVelocityX: roundBoatDebugValue(boat.targetVelocityX),
      opacity: roundBoatDebugValue(boat.opacity),
      ageSeconds: roundBoatDebugValue(boat.ageSeconds),
      ...extra
    });
  }
}

function sampleBoatRail(rail: readonly BoatRailPoint[], progress: number): BoatRailPoint {
  const clampedProgress = THREE.MathUtils.clamp(progress, 0, 1);
  const scaledIndex = clampedProgress * (rail.length - 1);
  const lowerIndex = Math.floor(scaledIndex);
  const upperIndex = Math.min(rail.length - 1, lowerIndex + 1);
  const alpha = THREE.MathUtils.smootherstep(scaledIndex - lowerIndex, 0, 1);
  const lower = rail[lowerIndex]!;
  const upper = rail[upperIndex]!;
  return {
    x: THREE.MathUtils.lerp(lower.x, upper.x, alpha),
    y: THREE.MathUtils.lerp(lower.y, upper.y, alpha)
  };
}

function randomRange(min: number, max: number) {
  return THREE.MathUtils.lerp(min, max, Math.random());
}

function resolveEdgeFade(screenX: number, widthPx: number, leftEdgePx: number, rightEdgePx: number) {
  const leftFade = THREE.MathUtils.clamp((screenX - (leftEdgePx - widthPx * 0.5)) / BOAT_EDGE_FADE_PX, 0, 1);
  const rightFade = THREE.MathUtils.clamp(((rightEdgePx + widthPx * 0.5) - screenX) / BOAT_EDGE_FADE_PX, 0, 1);
  return Math.min(leftFade, rightFade, 1);
}

function centeredRailX(value: number) {
  return value - 0.5;
}

function enforceVelocityMagnitude(value: number, fallbackSign: BoatDirectionSign, minimumMagnitude: number) {
  const sign = resolveVelocitySign(value, fallbackSign);
  return sign * Math.max(minimumMagnitude, Math.abs(value));
}

function resolveVelocitySign(value: number, fallbackSign: BoatDirectionSign): BoatDirectionSign {
  if (Math.abs(value) < 0.001) {
    return fallbackSign;
  }
  return value >= 0 ? 1 : -1;
}

function roundBoatDebugValue(value: number) {
  return Math.round(value * 100) / 100;
}
