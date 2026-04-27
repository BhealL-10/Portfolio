import { getRuntimeDeviceState } from './device';
import { getRuntimeViewportSize } from './viewport';

export type GameQualitySelection = 'auto' | 'high' | 'medium' | 'low' | 'ultra_low';
export type ResolvedGameQuality = Exclude<GameQualitySelection, 'auto'>;

export interface GameVisualQuality {
  showMomentumBoats: boolean;
  showMusicReactiveBackdrop: boolean;
  showParallaxLayers: boolean;
  showDecorativeWaves: boolean;
  showParticles: boolean;
  enableHudAnimations: boolean;
  enableMomentumAvatarAnimation: boolean;
  enableGradeAnimations: boolean;
  enableEnemySpriteAnimations: boolean;
  enableGlowEffects: boolean;
}

export interface GameQualityState {
  selection: GameQualitySelection;
  resolved: ResolvedGameQuality;
  source: 'auto' | 'manual';
  visual: GameVisualQuality;
}

export interface GameQualityEstimateInput {
  isMobile: boolean;
  viewportWidth: number;
  viewportHeight: number;
  devicePixelRatio: number;
  hardwareConcurrency: number;
  deviceMemory: number | null;
}

export interface GameQualityLoadAdjustmentInput {
  adventureLoadMs: number;
}

export interface GameQualityRuntimeAdjustmentInput {
  fpsAverage: number;
  frameMsP95: number;
  sampleCount: number;
  startupStutterCount: number;
}

export interface GameQualityChangeEvent {
  previousQuality: ResolvedGameQuality;
  newQuality: ResolvedGameQuality;
  reason: string;
  state: GameQualityState;
}

interface GameQualityControllerOptions {
  estimateInput?: Partial<GameQualityEstimateInput>;
  now?: () => number;
  storage?: Storage | null;
}

const GAME_QUALITY_STORAGE_KEY = 'portfolio-game-quality-v1';
const AUTO_EVALUATION_INTERVAL_SECONDS = 1.6;
const STARTUP_STUTTER_WINDOW_SECONDS = 4.5;
const STARTUP_STUTTER_THRESHOLD_MS = 45;

const RESOLVED_QUALITY_ORDER: readonly ResolvedGameQuality[] = ['high', 'medium', 'low', 'ultra_low'] as const;

const VISUAL_QUALITY_BY_MODE: Record<ResolvedGameQuality, GameVisualQuality> = {
  high: {
    showMomentumBoats: true,
    showMusicReactiveBackdrop: true,
    showParallaxLayers: true,
    showDecorativeWaves: true,
    showParticles: true,
    enableHudAnimations: true,
    enableMomentumAvatarAnimation: true,
    enableGradeAnimations: true,
    enableEnemySpriteAnimations: true,
    enableGlowEffects: true
  },
  medium: {
    showMomentumBoats: false,
    showMusicReactiveBackdrop: true,
    showParallaxLayers: true,
    showDecorativeWaves: true,
    showParticles: true,
    enableHudAnimations: true,
    enableMomentumAvatarAnimation: true,
    enableGradeAnimations: true,
    enableEnemySpriteAnimations: true,
    enableGlowEffects: true
  },
  low: {
    showMomentumBoats: false,
    showMusicReactiveBackdrop: false,
    showParallaxLayers: true,
    showDecorativeWaves: true,
    showParticles: true,
    enableHudAnimations: true,
    enableMomentumAvatarAnimation: true,
    enableGradeAnimations: true,
    enableEnemySpriteAnimations: true,
    enableGlowEffects: true
  },
  ultra_low: {
    showMomentumBoats: false,
    showMusicReactiveBackdrop: false,
    showParallaxLayers: false,
    showDecorativeWaves: false,
    showParticles: false,
    enableHudAnimations: false,
    enableMomentumAvatarAnimation: false,
    enableGradeAnimations: false,
    enableEnemySpriteAnimations: false,
    enableGlowEffects: false
  }
};

function clampFiniteNumber(value: number, fallback: number) {
  return Number.isFinite(value) ? value : fallback;
}

function readNumericHint(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function resolveStorage(storage?: Storage | null) {
  if (typeof storage !== 'undefined') {
    return storage;
  }
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage;
}

function buildState(selection: GameQualitySelection, resolved: ResolvedGameQuality): GameQualityState {
  return {
    selection,
    resolved,
    source: selection === 'auto' ? 'auto' : 'manual',
    visual: buildGameVisualQuality(resolved)
  };
}

function estimateInputFromRuntime(): GameQualityEstimateInput {
  const viewport = getRuntimeViewportSize();
  const deviceState = getRuntimeDeviceState();
  return {
    isMobile: deviceState.isMobile,
    viewportWidth: viewport.width,
    viewportHeight: viewport.height,
    devicePixelRatio: Math.max(1, clampFiniteNumber(window.devicePixelRatio || 1, 1)),
    hardwareConcurrency: Math.max(1, clampFiniteNumber(window.navigator.hardwareConcurrency || 4, 4)),
    deviceMemory: readNumericHint((window.navigator as Navigator & { deviceMemory?: number }).deviceMemory)
  };
}

function stepDownQuality(quality: ResolvedGameQuality, steps = 1): ResolvedGameQuality {
  const startIndex = RESOLVED_QUALITY_ORDER.indexOf(quality);
  if (startIndex < 0) {
    return 'ultra_low';
  }
  const nextIndex = Math.min(RESOLVED_QUALITY_ORDER.length - 1, startIndex + Math.max(1, steps));
  return RESOLVED_QUALITY_ORDER[nextIndex] ?? 'ultra_low';
}

export function sanitizeGameQualitySelection(value: string | null | undefined): GameQualitySelection {
  switch (value) {
    case 'high':
    case 'medium':
    case 'low':
    case 'ultra_low':
    case 'auto':
      return value;
    default:
      return 'auto';
  }
}

export function readStoredGameQualitySelection(storage?: Storage | null): GameQualitySelection {
  const target = resolveStorage(storage);
  if (!target) {
    return 'auto';
  }
  try {
    return sanitizeGameQualitySelection(target.getItem(GAME_QUALITY_STORAGE_KEY));
  } catch {
    return 'auto';
  }
}

export function persistGameQualitySelection(selection: GameQualitySelection, storage?: Storage | null) {
  const target = resolveStorage(storage);
  if (!target) {
    return;
  }
  try {
    target.setItem(GAME_QUALITY_STORAGE_KEY, selection);
  } catch {
    // Ignore storage write failures.
  }
}

export function buildGameVisualQuality(quality: ResolvedGameQuality): GameVisualQuality {
  return { ...VISUAL_QUALITY_BY_MODE[quality] };
}

export function estimateAutoGameQuality(input: Partial<GameQualityEstimateInput> = {}): ResolvedGameQuality {
  const runtime = typeof window === 'undefined' ? null : estimateInputFromRuntime();
  const resolved: GameQualityEstimateInput = {
    isMobile: input.isMobile ?? runtime?.isMobile ?? false,
    viewportWidth: clampFiniteNumber(input.viewportWidth ?? runtime?.viewportWidth ?? 1280, 1280),
    viewportHeight: clampFiniteNumber(input.viewportHeight ?? runtime?.viewportHeight ?? 720, 720),
    devicePixelRatio: Math.max(1, clampFiniteNumber(input.devicePixelRatio ?? runtime?.devicePixelRatio ?? 1, 1)),
    hardwareConcurrency: Math.max(1, clampFiniteNumber(input.hardwareConcurrency ?? runtime?.hardwareConcurrency ?? 4, 4)),
    deviceMemory:
      typeof input.deviceMemory === 'number' || input.deviceMemory === null
        ? input.deviceMemory
        : (runtime?.deviceMemory ?? null)
  };

  const shortestSide = Math.min(resolved.viewportWidth, resolved.viewportHeight);
  const viewportPixels = Math.max(1, resolved.viewportWidth * resolved.viewportHeight);
  let pressureScore = 0;

  if (resolved.deviceMemory !== null) {
    pressureScore += resolved.deviceMemory <= 2 ? 2.4 : resolved.deviceMemory <= 4 ? 1.35 : resolved.deviceMemory <= 6 ? 0.55 : 0;
  } else if (resolved.isMobile) {
    pressureScore += 0.45;
  }

  pressureScore +=
    resolved.hardwareConcurrency <= 2
      ? 2.2
      : resolved.hardwareConcurrency <= 4
        ? 1.2
        : resolved.hardwareConcurrency <= 6
          ? 0.5
          : 0;

  pressureScore +=
    resolved.devicePixelRatio >= 3.25 ? 0.95 : resolved.devicePixelRatio >= 2.5 ? 0.5 : resolved.devicePixelRatio >= 2 ? 0.18 : 0;

  pressureScore +=
    viewportPixels >= 2_600_000 ? 1 : viewportPixels >= 1_700_000 ? 0.48 : viewportPixels >= 1_150_000 ? 0.16 : 0;

  if (resolved.isMobile) {
    pressureScore += 0.72;
    if (shortestSide <= 430) {
      pressureScore += 0.35;
    }
  }

  if (pressureScore >= 4.6 || (resolved.isMobile && pressureScore >= 4.25)) {
    return 'ultra_low';
  }
  if (pressureScore >= 2.35) {
    return 'low';
  }
  if (pressureScore >= 0.95) {
    return 'medium';
  }
  return 'high';
}

export function resolveAdventureLoadAutoDowngrade(
  currentQuality: ResolvedGameQuality,
  input: GameQualityLoadAdjustmentInput
) {
  const { adventureLoadMs } = input;
  if (!Number.isFinite(adventureLoadMs) || adventureLoadMs <= 0) {
    return null;
  }
  if (adventureLoadMs >= 7000 && currentQuality !== 'ultra_low') {
    return {
      quality: stepDownQuality(currentQuality, currentQuality === 'high' ? 2 : 1),
      reason: 'adventure_load_critical'
    };
  }
  if (adventureLoadMs >= 4200 && currentQuality !== 'ultra_low') {
    return {
      quality: stepDownQuality(currentQuality),
      reason: 'adventure_load_slow'
    };
  }
  return null;
}

export function resolveRuntimeAutoDowngrade(
  currentQuality: ResolvedGameQuality,
  input: GameQualityRuntimeAdjustmentInput
) {
  if (input.sampleCount < 45 || currentQuality === 'ultra_low') {
    return null;
  }

  const lowFps = input.fpsAverage > 0 && input.fpsAverage < 42;
  const severeFps = input.fpsAverage > 0 && input.fpsAverage < 33;
  const highP95 = input.frameMsP95 > 0 && input.frameMsP95 >= 34;
  const severeP95 = input.frameMsP95 > 0 && input.frameMsP95 >= 46;
  const startupStutter = input.startupStutterCount >= 4;

  if (severeFps || severeP95) {
    return {
      quality: stepDownQuality(currentQuality),
      reason: severeFps ? 'low_fps_critical' : 'p95_critical'
    };
  }

  if (startupStutter && (lowFps || highP95)) {
    return {
      quality: stepDownQuality(currentQuality),
      reason: 'startup_stutter'
    };
  }

  if (lowFps || highP95) {
    return {
      quality: stepDownQuality(currentQuality),
      reason: lowFps ? 'low_fps' : 'p95_high'
    };
  }

  return null;
}

export class GameQualityController {
  private readonly now;
  private readonly storage;
  private autoQuality: ResolvedGameQuality;
  private selection: GameQualitySelection;
  private state: GameQualityState;
  private lastRuntimeEvaluationAt = Number.NEGATIVE_INFINITY;
  private runStartedAt = Number.NEGATIVE_INFINITY;
  private startupStutterCount = 0;

  constructor(options: GameQualityControllerOptions = {}) {
    this.now = options.now ?? (() => performance.now());
    this.storage = resolveStorage(options.storage);
    this.selection = readStoredGameQualitySelection(this.storage);
    this.autoQuality = estimateAutoGameQuality(options.estimateInput);
    this.state = buildState(this.selection, this.selection === 'auto' ? this.autoQuality : this.selection);
  }

  getState() {
    return this.state;
  }

  setSelection(selection: GameQualitySelection) {
    const sanitized = sanitizeGameQualitySelection(selection);
    if (sanitized === this.selection) {
      return this.state;
    }
    this.selection = sanitized;
    persistGameQualitySelection(this.selection, this.storage);
    this.state = buildState(this.selection, this.selection === 'auto' ? this.autoQuality : this.selection);
    return this.state;
  }

  markRunStarted(startedAtSeconds = this.now() / 1000) {
    this.runStartedAt = startedAtSeconds;
    this.lastRuntimeEvaluationAt = startedAtSeconds;
    this.startupStutterCount = 0;
  }

  applyAdventureLoadMeasurement(adventureLoadMs: number): GameQualityChangeEvent | null {
    if (this.selection !== 'auto') {
      return null;
    }
    const adjustment = resolveAdventureLoadAutoDowngrade(this.autoQuality, { adventureLoadMs });
    if (!adjustment || adjustment.quality === this.autoQuality) {
      return null;
    }
    return this.applyAutoQualityChange(adjustment.quality, adjustment.reason);
  }

  observeRuntimeFrame(
    deltaTime: number,
    elapsedTime: number,
    runtime: Pick<GameQualityRuntimeAdjustmentInput, 'fpsAverage' | 'frameMsP95' | 'sampleCount'>
  ): GameQualityChangeEvent | null {
    if (this.selection !== 'auto') {
      return null;
    }

    if (
      elapsedTime - this.runStartedAt <= STARTUP_STUTTER_WINDOW_SECONDS &&
      deltaTime * 1000 >= STARTUP_STUTTER_THRESHOLD_MS
    ) {
      this.startupStutterCount += 1;
    }

    if (elapsedTime - this.lastRuntimeEvaluationAt < AUTO_EVALUATION_INTERVAL_SECONDS) {
      return null;
    }
    this.lastRuntimeEvaluationAt = elapsedTime;

    const adjustment = resolveRuntimeAutoDowngrade(this.autoQuality, {
      ...runtime,
      startupStutterCount: this.startupStutterCount
    });
    if (!adjustment || adjustment.quality === this.autoQuality) {
      return null;
    }
    return this.applyAutoQualityChange(adjustment.quality, adjustment.reason);
  }

  private applyAutoQualityChange(nextQuality: ResolvedGameQuality, reason: string): GameQualityChangeEvent {
    const previousQuality = this.autoQuality;
    this.autoQuality = nextQuality;
    this.state = buildState(this.selection, this.autoQuality);
    return {
      previousQuality,
      newQuality: nextQuality,
      reason,
      state: this.state
    };
  }
}
