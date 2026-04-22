import { clamp } from '../core/math';

export type GameUiScaleMode = 'small' | 'medium' | 'large';

export const GAME_UI_SCALE_STORAGE_KEY = 'portfolio-game-ui-scale-v1';

const GAME_UI_SCALE_USER_FACTORS: Record<GameUiScaleMode, number> = {
  // Recalibrated scale ladder:
  // - small keeps the previous medium footprint
  // - medium keeps the previous large footprint
  // - large is a new step above the previous large preset
  small: 1,
  medium: 1.2,
  large: 1.36
};

export function isGameUiScaleMode(value: string | null | undefined): value is GameUiScaleMode {
  return value === 'small' || value === 'medium' || value === 'large';
}

export function readStoredGameUiScaleMode(storage?: Pick<Storage, 'getItem'> | null): GameUiScaleMode {
  try {
    const target = storage ?? (typeof window !== 'undefined' ? window.localStorage : null);
    const value = target?.getItem(GAME_UI_SCALE_STORAGE_KEY);
    return isGameUiScaleMode(value) ? value : 'medium';
  } catch {
    return 'medium';
  }
}

export function persistGameUiScaleMode(mode: GameUiScaleMode, storage?: Pick<Storage, 'setItem'> | null) {
  try {
    const target = storage ?? (typeof window !== 'undefined' ? window.localStorage : null);
    target?.setItem(GAME_UI_SCALE_STORAGE_KEY, mode);
  } catch {
    // Best-effort persistence only.
  }
}

export function getGameUiUserScale(mode: GameUiScaleMode) {
  return GAME_UI_SCALE_USER_FACTORS[mode];
}

export function resolveGameUiFluidScale(viewport: { width: number; height: number }) {
  const shortSide = Math.min(viewport.width, viewport.height);
  const longSide = Math.max(viewport.width, viewport.height);
  const shortSideFactor = clamp((shortSide - 360) / 540, 0, 1);
  const longSideFactor = clamp((longSide - 640) / 960, 0, 1);
  return Number((0.9 + shortSideFactor * 0.12 + longSideFactor * 0.04).toFixed(3));
}

export function resolveGameUiScale(mode: GameUiScaleMode, viewport: { width: number; height: number }) {
  return Number((resolveGameUiFluidScale(viewport) * getGameUiUserScale(mode)).toFixed(3));
}

export function readAppliedGameUiScale() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return 1;
  }
  const value = Number.parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('--game-ui-scale'));
  return Number.isFinite(value) && value > 0 ? value : 1;
}
