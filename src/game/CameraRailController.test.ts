import * as THREE from 'three';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { CameraRailController } from './CameraRailController';
import type { ResolvedGamePathNode } from './gameSessionTypes';

function createResolvedNode(index: number, x: number, y: number): ResolvedGamePathNode {
  return {
    index,
    x,
    y,
    z: 0,
    gameplayRadius: 2,
    visualScale: 2,
    pathDistance: index * 5,
    direction: 'right',
    kind: 'normal',
    sizeTier: 'medium',
    shapeKind: 'round',
    spinDirection: 'cw',
    spinSpeed: 0,
    motionPattern: 'none',
    motionMode: 'none',
    motionDirection: null,
    motionDistance: 0,
    motionDuration: 0,
    motionActivatedAt: null,
    eventType: 'none',
    eventVisualKind: 'default',
    guaranteedShopIcon: false,
    colorHint: 'none',
    gameplayOrbitPeriod: 3.2,
    branchSlot: null,
    offerId: null,
    onboarding: false,
    isMilestone: false,
    isGigantic: false,
    coinSlots: [],
    enemySlot: null,
    motionSeed: 0,
    visualStretch: { x: 1, y: 1, z: 1 },
    resolvedX: x,
    resolvedY: y,
    resolvedZ: 0,
    resolvedSpinPhase: 0,
    resolvedMotionProgress: 0
  };
}

function updateControllerForViewport(
  width: number,
  height: number,
  options: {
    momentumGauge?: number;
    momentumOverdrive?: number;
    frames?: number;
    playerY?: number;
    verticalClampMinY?: number;
    verticalClampMaxY?: number;
  } = {}
) {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      innerWidth: width,
      innerHeight: height
    }
  });

  const controller = new CameraRailController();
  const currentNode = createResolvedNode(12, 24, 0);
  const nextNode = createResolvedNode(13, 31, 2);
  controller.reset(currentNode, 1);
  const momentumGauge = options.momentumGauge ?? 0.45;
  const momentumOverdrive = options.momentumOverdrive ?? 0;
  const frames = options.frames ?? 1;
  const playerY = options.playerY ?? 1.5;
  const verticalClampMinY = options.verticalClampMinY ?? -28;
  const verticalClampMaxY = options.verticalClampMaxY ?? 45;

  for (let frame = 0; frame < frames; frame += 1) {
    controller.update({
      deltaTime: 1 / 60,
      state: 'running_attached',
      distanceMeters: 180,
      directionSign: 1,
      currentNode,
      nextNode,
      playerPosition: new THREE.Vector3(25.5, playerY, 0),
      momentumGauge,
      momentumOverdrive,
      largeShardFactor: 0,
      milestoneZoom: 0,
      choiceZoom: 0,
      speedPressure: 1,
      focusLock: null,
      verticalClampMinY,
      verticalClampMaxY
    });
  }
  return controller;
}

describe('CameraRailController', () => {
  const originalWindow = globalThis.window;

  beforeEach(() => {
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: {
        innerWidth: 1600,
        innerHeight: 900
      }
    });
  });

  afterEach(() => {
    if (originalWindow === undefined) {
      Reflect.deleteProperty(globalThis, 'window');
      return;
    }
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: originalWindow
    });
  });

  it('keeps gameplay safe width stable across aspect ratios', () => {
    const desktopController = updateControllerForViewport(1600, 900);
    const mobileController = updateControllerForViewport(390, 844);

    const desktopSafeWidth = desktopController.getSafeRight() - desktopController.getSafeLeft();
    const mobileSafeWidth = mobileController.getSafeRight() - mobileController.getSafeLeft();

    expect(mobileSafeWidth).toBeCloseTo(desktopSafeWidth, 5);
  });

  it('zooms the presentation out on narrow viewports instead of shrinking gameplay space', () => {
    const desktopController = updateControllerForViewport(1600, 900);
    const mobileController = updateControllerForViewport(390, 844);

    expect(mobileController.getZoom()).toBeGreaterThan(desktopController.getZoom());
  });

  it('extends zoom-out further when momentum overdrive exceeds the base range', () => {
    const baseMomentumController = updateControllerForViewport(1600, 900, {
      momentumGauge: 1,
      frames: 120
    });
    const equipmentBoostedController = updateControllerForViewport(1600, 900, {
      momentumGauge: 1,
      momentumOverdrive: 0.65,
      frames: 120
    });

    expect(equipmentBoostedController.getZoom()).toBeGreaterThan(baseMomentumController.getZoom());
    expect(equipmentBoostedController.getSafeRight() - equipmentBoostedController.getSafeLeft()).toBeGreaterThan(
      baseMomentumController.getSafeRight() - baseMomentumController.getSafeLeft()
    );
  });

  it('zooms out more as momentum rises during regular running', () => {
    const lowMomentumController = updateControllerForViewport(1600, 900, {
      momentumGauge: 0,
      frames: 120
    });
    const highMomentumController = updateControllerForViewport(1600, 900, {
      momentumGauge: 1,
      frames: 120
    });

    expect(highMomentumController.getZoom()).toBeGreaterThan(lowMomentumController.getZoom());
    expect(highMomentumController.getVisibleTop() - highMomentumController.getVisibleBottom()).toBeGreaterThan(
      lowMomentumController.getVisibleTop() - lowMomentumController.getVisibleBottom()
    );
  });

  it('makes the visible top edge exactly match the top death boundary when clamped high', () => {
    const controller = updateControllerForViewport(1600, 900, {
      playerY: 120,
      frames: 240,
      verticalClampMinY: -28,
      verticalClampMaxY: 45
    });

    expect(controller.getVisibleTop()).toBeCloseTo(45, 4);
    expect(controller.getSafeTop()).toBeCloseTo(45, 4);
  });

  it('makes the visible bottom edge exactly match the bottom death boundary when clamped low', () => {
    const controller = updateControllerForViewport(1600, 900, {
      playerY: -120,
      frames: 240,
      verticalClampMinY: -28,
      verticalClampMaxY: 45
    });

    expect(controller.getVisibleBottom()).toBeCloseTo(-28, 4);
    expect(controller.getSafeBottom()).toBeCloseTo(-28, 4);
  });
});
