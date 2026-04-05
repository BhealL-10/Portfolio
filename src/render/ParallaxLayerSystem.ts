import * as THREE from 'three';
import { damp } from '../core/math';
import type { MusicReactiveState } from '../game/GameAudioSystem';
import type { ThemeMode } from '../types/content';
import {
  PARALLAX_GLOBAL_Y_OFFSET_PX,
  PARALLAX_LAYER_CONFIG,
  PARALLAX_LAYER_ORDER,
  PARALLAX_TOP_HORIZON_BOTTOM_SCREEN_RATIO,
  PARALLAX_TOP_HORIZON_VERTICAL_OFFSET_PX,
  type LayerCategory
} from './ParallaxLayerConfig';
import { MomentumBoatLayer, preloadMomentumBoatAssets } from './MomentumBoatLayer';
import { preloadParallaxLayerAssets } from './ParallaxLayerAssetResolver';
import { ParallaxStrip } from './ParallaxStrip';

const PUPPET_HEIGHT_RESPONSE = 5.8;
const PARALLAX_INTRO_BASE_START = 0.12;
const PARALLAX_INTRO_STAGGER_PROGRESS = 0.12;
const PARALLAX_INTRO_LAYER_PROGRESS = 0.24;
const PARALLAX_INTRO_OVERSHOOT = 0.045;

const INITIAL_VERTICAL_OFFSET_PX: Record<LayerCategory, number> = {
  horizon: 0,
  far: 0,
  mid: 0,
  foreground: 0
};

export interface ParallaxLayerViewState {
  visibleMinY: number;
  visibleMaxY: number;
  playableMinY: number;
  playableMaxY: number;
  playerY: number;
  cameraFollowsPlayer: boolean;
  isMilestoneView: boolean;
}

export class ParallaxLayerSystem {
  private readonly root = new THREE.Group();
  private readonly strips = new Map<LayerCategory, ParallaxStrip>();
  private readonly topHorizonStrip: ParallaxStrip;
  private readonly momentumBoatLayer: MomentumBoatLayer;
  private readonly verticalOffsetPx: Record<LayerCategory, number> = { ...INITIAL_VERTICAL_OFFSET_PX };
  private topHorizonVerticalOffsetPx = 0;
  private visible = false;
  private mirrorMode = false;
  private playableWorldMinY = -28;
  private playableWorldMaxY = 28;
  private playerWorldY = 0;
  private cameraFollowsPlayer = false;
  private milestoneView = false;
  private coverageAnchorX = 0;
  private coverageInputX = 0;
  private coverageAnchorOriginX = 0;
  private initialized = false;
  private initPromise: Promise<void> | null = null;
  private pendingCoverageRealign = true;
  private viewportWidthPx = 1;
  private viewportHeightPx = 1;
  private accumulatedDriftSeconds = 0;
  private targetBass = 0;
  private targetMid = 0;
  private targetMelody = 0;
  private targetEnergy = 0;
  private targetMomentumRatio = 0;
  private smoothedBass = 0;
  private smoothedMid = 0;
  private smoothedMelody = 0;
  private smoothedEnergy = 0;
  private smoothedMomentumRatio = 0;
  private hasPlayedLayerIntro = false;
  private introTransitionRequested = false;
  private introTransitionActive = false;
  private introTransitionProgress = 1;
  private currentTheme: ThemeMode;

  constructor(
    scene: THREE.Scene,
    private readonly camera: THREE.PerspectiveCamera,
    private readonly renderer: THREE.WebGLRenderer,
    initialTheme: ThemeMode
  ) {
    this.currentTheme = initialTheme;
    this.root.visible = false;
    scene.add(this.root);

    PARALLAX_LAYER_ORDER.forEach((category) => {
      const strip = new ParallaxStrip(this.root, PARALLAX_LAYER_CONFIG[category], this.renderer, this.camera, initialTheme);
      this.strips.set(category, strip);
    });
    this.topHorizonStrip = new ParallaxStrip(
      this.root,
      {
        ...PARALLAX_LAYER_CONFIG.horizon,
        localZ: PARALLAX_LAYER_CONFIG.horizon.localZ + 0.2,
        renderOrder: PARALLAX_LAYER_CONFIG.horizon.renderOrder + 0.1
      },
      this.renderer,
      this.camera,
      initialTheme
    );
    this.momentumBoatLayer = new MomentumBoatLayer(this.root, this.camera, initialTheme);
  }

  init() {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = Promise.all([preloadParallaxLayerAssets(), preloadMomentumBoatAssets()])
      .then(async () => {
        this.captureViewportSize();
        await Promise.all(
          PARALLAX_LAYER_ORDER.map(async (category) => {
            const strip = this.strips.get(category);
            const config = PARALLAX_LAYER_CONFIG[category];
            if (!strip) {
              return;
            }
            const displayedHeightPx = this.resolveDisplayedHeightPx(config);
            await strip.init(displayedHeightPx);
          })
        );
        await this.topHorizonStrip.init(this.resolveDisplayedHeightPx(PARALLAX_LAYER_CONFIG.horizon));
        this.initialized = true;
        this.refreshAssets();
      })
      .catch((error) => {
        console.warn('[ParallaxLayerSystem] Failed to preload parallax layers.', error);
      });

    return this.initPromise;
  }

  setVisible(visible: boolean) {
    if (this.visible === visible) {
      return;
    }
    this.visible = visible;
    this.root.visible = visible && this.initialized;
    this.strips.forEach((strip) => strip.setVisible(visible && this.initialized));
    this.topHorizonStrip.setVisible(visible && this.initialized);
    this.momentumBoatLayer.setVisible(visible && this.initialized);
    if (visible) {
      this.pendingCoverageRealign = true;
    }
  }

  setTheme(theme: ThemeMode) {
    this.currentTheme = theme;
    this.captureViewportSize();
    this.strips.forEach((strip, category) => strip.setTheme(theme, this.resolveDisplayedHeightPx(PARALLAX_LAYER_CONFIG[category])));
    this.topHorizonStrip.setTheme(theme, this.resolveDisplayedHeightPx(PARALLAX_LAYER_CONFIG.horizon));
    this.momentumBoatLayer.setTheme(theme);
  }

  setMirrorMode(enabled: boolean) {
    if (this.mirrorMode === enabled) {
      return;
    }
    this.mirrorMode = enabled;
    this.strips.forEach((strip) => strip.setMirrorMode(enabled));
    this.topHorizonStrip.setMirrorMode(enabled);
  }

  setCoverageAnchorX(worldX: number) {
    this.coverageInputX = worldX;
  }

  setViewState(viewState: ParallaxLayerViewState) {
    this.playableWorldMinY = Math.min(viewState.playableMinY, viewState.playableMaxY);
    this.playableWorldMaxY = Math.max(viewState.playableMinY, viewState.playableMaxY);
    this.playerWorldY = viewState.playerY;
    this.cameraFollowsPlayer = viewState.cameraFollowsPlayer;
    this.milestoneView = viewState.isMilestoneView;
  }

  setMusicReactiveState(reactive: MusicReactiveState) {
    if (!reactive.active) {
      this.targetBass = 0;
      this.targetMid = 0;
      this.targetMelody = 0;
      this.targetEnergy = 0;
      this.targetMomentumRatio = 0;
      return;
    }
    this.targetBass = reactive.bassIntensity;
    this.targetMid = reactive.midIntensity;
    this.targetMelody = reactive.melodyIntensity;
    this.targetEnergy = reactive.overallEnergy;
    this.targetMomentumRatio = reactive.momentumRatio;
  }

  resetForRun(worldX = this.coverageInputX) {
    this.coverageInputX = worldX;
    this.coverageAnchorX = worldX;
    this.coverageAnchorOriginX = worldX;
    this.accumulatedDriftSeconds = 0;
    this.pendingCoverageRealign = true;
    PARALLAX_LAYER_ORDER.forEach((category) => {
      this.verticalOffsetPx[category] = 0;
    });
    this.topHorizonVerticalOffsetPx = 0;
    this.strips.forEach((strip) => strip.resetLayout());
    this.topHorizonStrip.resetLayout();
    this.targetMomentumRatio = 0;
    this.smoothedMomentumRatio = 0;
    this.momentumBoatLayer.resetForRun();
  }

  rearmAdventureIntro() {
    this.hasPlayedLayerIntro = false;
    this.introTransitionRequested = false;
    this.introTransitionActive = false;
    this.introTransitionProgress = 1;
  }

  beginAdventureIntro() {
    if (this.hasPlayedLayerIntro || this.introTransitionRequested) {
      return;
    }
    this.introTransitionRequested = true;
    this.introTransitionActive = true;
    this.introTransitionProgress = 0;
  }

  setTransitionState(active: boolean, progress: number) {
    if (this.introTransitionRequested) {
      this.introTransitionActive = active;
      this.introTransitionProgress = THREE.MathUtils.clamp(progress, 0, 1);
      if (this.introTransitionProgress >= 0.999) {
        this.hasPlayedLayerIntro = true;
        this.introTransitionRequested = false;
        this.introTransitionActive = false;
      }
    }
  }

  refreshAssets() {
    if (!this.initialized) {
      return;
    }
    this.root.visible = this.visible;
    this.captureViewportSize();
    this.strips.forEach((strip, category) => {
      strip.resetLayout();
      strip.setVisible(this.visible);
      strip.setMirrorMode(this.mirrorMode);
      strip.setTheme(this.currentTheme, this.resolveDisplayedHeightPx(PARALLAX_LAYER_CONFIG[category]));
    });
    this.topHorizonStrip.resetLayout();
    this.topHorizonStrip.setVisible(this.visible);
    this.topHorizonStrip.setMirrorMode(this.mirrorMode);
    this.topHorizonStrip.setTheme(this.currentTheme, this.resolveDisplayedHeightPx(PARALLAX_LAYER_CONFIG.horizon));
    this.momentumBoatLayer.setVisible(this.visible);
    this.momentumBoatLayer.setTheme(this.currentTheme);
  }

  update(deltaTime: number) {
    if (!this.initialized || !this.visible) {
      return;
    }

    this.captureViewportSize();
    this.root.visible = true;
    this.root.position.copy(this.camera.position);
    this.root.quaternion.copy(this.camera.quaternion);
    this.root.scale.set(1, 1, 1);

    this.accumulatedDriftSeconds += deltaTime;
    this.smoothedBass = damp(this.smoothedBass, this.targetBass, 9, deltaTime);
    this.smoothedMid = damp(this.smoothedMid, this.targetMid, 9, deltaTime);
    this.smoothedMelody = damp(this.smoothedMelody, this.targetMelody, 9, deltaTime);
    this.smoothedEnergy = damp(this.smoothedEnergy, this.targetEnergy, 9, deltaTime);
    this.smoothedMomentumRatio = damp(this.smoothedMomentumRatio, this.targetMomentumRatio, 4.5, deltaTime);
    if (this.pendingCoverageRealign) {
      this.coverageAnchorX = this.coverageInputX;
      this.coverageAnchorOriginX = this.coverageInputX;
      this.pendingCoverageRealign = false;
      this.strips.forEach((strip) => strip.resetLayout());
    }

    this.coverageAnchorX = this.mirrorMode
      ? Math.min(this.coverageAnchorX, this.coverageInputX)
      : Math.max(this.coverageAnchorX, this.coverageInputX);

    const worldTravelX = this.coverageAnchorX - this.coverageAnchorOriginX;
    const playerHeightSignal = this.resolvePlayerHeightSignal();
    const puppetActive = this.cameraFollowsPlayer && !this.milestoneView;
    PARALLAX_LAYER_ORDER.forEach((category) => {
      const strip = this.strips.get(category);
      const config = PARALLAX_LAYER_CONFIG[category];
      if (!strip) {
        return;
      }

      const displayedHeightPx = this.resolveDisplayedHeightPx(config);
      const directionalDrift = config.staticLayer ? 0 : this.accumulatedDriftSeconds * config.driftSpeedPx * (this.mirrorMode ? -1 : 1);
      const progressionParallaxPx = worldTravelX * config.parallaxFactor * (this.mirrorMode ? 1 : -1);
      const travelOffsetPx = directionalDrift + progressionParallaxPx;
      const targetVerticalOffsetPx = this.resolveLayerTargetVerticalOffsetPx(category, puppetActive, playerHeightSignal);
      this.verticalOffsetPx[category] = damp(this.verticalOffsetPx[category], targetVerticalOffsetPx, PUPPET_HEIGHT_RESPONSE, deltaTime);
      const introOffsetPx = this.resolveIntroOffsetPx(category);
      const atmosphereOffsetPx = this.resolveAtmosphereOffsetPx(category);
      const unclampedBottomScreenY =
        this.viewportHeightPx * config.bottomScreenRatio +
        PARALLAX_GLOBAL_Y_OFFSET_PX +
        this.verticalOffsetPx[category] +
        atmosphereOffsetPx +
        introOffsetPx;
      const bottomScreenY = Math.max(this.viewportHeightPx + config.minimumBottomCoveragePx, unclampedBottomScreenY);

      strip.update({
        viewportWidthPx: this.viewportWidthPx,
        viewportHeightPx: this.viewportHeightPx,
        bottomScreenY,
        displayedHeightPx,
        travelOffsetPx,
        mirrorMode: this.mirrorMode
      });
    });

    const horizonConfig = PARALLAX_LAYER_CONFIG.horizon;
    const topHorizonDisplayedHeightPx = this.resolveDisplayedHeightPx(horizonConfig);
    const horizonDirectionalDrift = horizonConfig.staticLayer
      ? 0
      : this.accumulatedDriftSeconds * horizonConfig.driftSpeedPx * (this.mirrorMode ? -1 : 1);
    const horizonProgressionParallaxPx = worldTravelX * horizonConfig.parallaxFactor * (this.mirrorMode ? 1 : -1);
    const topTravelOffsetPx = horizonDirectionalDrift + horizonProgressionParallaxPx;
    this.topHorizonVerticalOffsetPx = this.resolveTopHorizonVerticalOffsetPx();
    const topIntroOffsetPx = this.resolveTopHorizonIntroOffsetPx(topHorizonDisplayedHeightPx);
    const unclampedTopBottomScreenY =
      this.viewportHeightPx * PARALLAX_TOP_HORIZON_BOTTOM_SCREEN_RATIO +
      PARALLAX_TOP_HORIZON_VERTICAL_OFFSET_PX +
      this.topHorizonVerticalOffsetPx +
      this.resolveAtmosphereOffsetPx('horizon') +
      topIntroOffsetPx;
    const topHorizonCoverageCeilingPx = topHorizonDisplayedHeightPx - 12;
    const topBottomScreenY =
      this.introTransitionRequested || this.introTransitionActive
        ? unclampedTopBottomScreenY
        : Math.min(topHorizonCoverageCeilingPx, Math.max(topHorizonDisplayedHeightPx * 0.64, unclampedTopBottomScreenY));

    this.topHorizonStrip.update({
      viewportWidthPx: this.viewportWidthPx,
      viewportHeightPx: this.viewportHeightPx,
      bottomScreenY: topBottomScreenY,
      displayedHeightPx: topHorizonDisplayedHeightPx,
      travelOffsetPx: topTravelOffsetPx,
      mirrorMode: this.mirrorMode,
      verticalFlip: true
    });

    const boatTravelOffsetPx =
      this.accumulatedDriftSeconds * 27.5 * (this.mirrorMode ? -1 : 1) +
      worldTravelX * 7.1 * (this.mirrorMode ? 1 : -1);
    this.momentumBoatLayer.update({
      deltaTime,
      viewportWidthPx: this.viewportWidthPx,
      viewportHeightPx: this.viewportHeightPx,
      travelOffsetPx: boatTravelOffsetPx,
      momentumRatio: this.smoothedMomentumRatio,
      bassIntensity: this.smoothedBass,
      midIntensity: this.smoothedMid,
      melodyIntensity: this.smoothedMelody,
      overallEnergy: this.smoothedEnergy
    });
  }

  dispose() {
    this.strips.forEach((strip) => strip.dispose());
    this.strips.clear();
    this.topHorizonStrip.dispose();
    this.momentumBoatLayer.dispose();
    if (this.root.parent) {
      this.root.parent.remove(this.root);
    }
  }

  private captureViewportSize() {
    const size = this.renderer.getSize(new THREE.Vector2());
    this.viewportWidthPx = Math.max(1, size.x);
    this.viewportHeightPx = Math.max(1, size.y);
  }

  private resolveDisplayedHeightPx(config: (typeof PARALLAX_LAYER_CONFIG)[LayerCategory]) {
    return Math.max(config.minDisplayedHeightPx, Math.round(this.viewportHeightPx * config.displayedHeightRatio));
  }

  private resolvePlayerHeightSignal() {
    const playableHeight = Math.max(0.001, this.playableWorldMaxY - this.playableWorldMinY);
    const normalizedHeight = THREE.MathUtils.clamp((this.playerWorldY - this.playableWorldMinY) / playableHeight, 0, 1);
    return (normalizedHeight - 0.5) * 2;
  }

  private resolveSharedHorizonMusicVerticalOffsetPx() {
    return -(this.smoothedBass * 55.4 + this.smoothedEnergy * 50.1);
  }

  private resolveLayerMusicVerticalOffsetPx(category: LayerCategory) {
    if (category === 'horizon') {
      return this.resolveSharedHorizonMusicVerticalOffsetPx();
    }
    if (category === 'far') {
      return this.smoothedMelody * 72.4 + this.smoothedMid * 60.9 - this.smoothedBass * 50.2;
    }
    if (category === 'mid') {
      return this.smoothedMid * 46.6 + this.smoothedMelody * 40.2 - this.smoothedBass * 50.4;
    }
    return this.smoothedBass * 50.2 + this.smoothedEnergy * 51.1 - this.smoothedMelody * 40.6;
  }

  private resolveLayerTargetVerticalOffsetPx(category: LayerCategory, puppetActive: boolean, playerHeightSignal: number) {
    const config = PARALLAX_LAYER_CONFIG[category];
    const playerOffsetPx = puppetActive ? playerHeightSignal * config.playerHeightInfluencePx : 0;
    return playerOffsetPx + this.resolveLayerMusicVerticalOffsetPx(category);
  }

  private resolveTopHorizonVerticalOffsetPx() {
    return -this.verticalOffsetPx.horizon;
  }

  private resolveTopHorizonIntroOffsetPx(displayedHeightPx: number) {
    if (!this.introTransitionRequested && !this.introTransitionActive) {
      return 0;
    }
    return -(this.resolveIntroOffsetPx('horizon') + displayedHeightPx * 1.14);
  }

  private resolveAtmosphereStrengthPx(category: LayerCategory) {
    if (category === 'horizon') {
      return 1.6 + this.smoothedEnergy * 2.4 + this.smoothedMelody * 1.1;
    }
    if (category === 'far') {
      return 1.8 + this.smoothedMelody * 2.8 + this.smoothedMid * 0.9;
    }
    if (category === 'mid') {
      return 2.2 + this.smoothedMid * 3.1 + this.smoothedEnergy * 1.1;
    }
    return 2.6 + this.smoothedBass * 3.6 + this.smoothedEnergy * 1.4;
  }

  private resolveAtmosphereOffsetPx(category: LayerCategory) {
    const strength = this.resolveAtmosphereStrengthPx(category);
    const phase = category === 'horizon' ? 0.8 : category === 'far' ? 0.9 : category === 'mid' ? 1.7 : 2.4;
    const frequency = category === 'horizon' ? 0.82 : category === 'far' ? 0.94 : category === 'mid' ? 1.08 : 1.2;
    return Math.sin(this.accumulatedDriftSeconds * frequency + phase) * strength;
  }

  private resolveIntroOffsetPx(category: LayerCategory) {
    if (!this.introTransitionRequested && !this.introTransitionActive) {
      return 0;
    }

    const index = PARALLAX_LAYER_ORDER.indexOf(category);
    const start = PARALLAX_INTRO_BASE_START + index * PARALLAX_INTRO_STAGGER_PROGRESS;
    const end = start + PARALLAX_INTRO_LAYER_PROGRESS;
    const localProgress = THREE.MathUtils.clamp((this.introTransitionProgress - start) / Math.max(0.0001, end - start), 0, 1);
    if (localProgress <= 0) {
      return PARALLAX_LAYER_CONFIG[category].introStartOffsetPx;
    }
    if (localProgress >= 1) {
      return 0;
    }

    const eased = easeOutQuart(localProgress);
    const settle = Math.sin(localProgress * Math.PI) * PARALLAX_INTRO_OVERSHOOT;
    return PARALLAX_LAYER_CONFIG[category].introStartOffsetPx * (1 - eased) - PARALLAX_LAYER_CONFIG[category].introStartOffsetPx * settle;
  }
}

function easeOutQuart(value: number) {
  const inverse = 1 - value;
  return 1 - inverse * inverse * inverse * inverse;
}
