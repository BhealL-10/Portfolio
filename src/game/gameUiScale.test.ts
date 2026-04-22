import { describe, expect, it } from 'vitest';
import {
  GAME_UI_SCALE_STORAGE_KEY,
  getGameUiUserScale,
  persistGameUiScaleMode,
  readStoredGameUiScaleMode,
  resolveGameUiFluidScale,
  resolveGameUiScale
} from './gameUiScale';

describe('gameUiScale', () => {
  it('falls back to medium when storage is missing or invalid', () => {
    expect(readStoredGameUiScaleMode()).toBe('medium');
    expect(readStoredGameUiScaleMode({ getItem: () => 'broken' })).toBe('medium');
    expect(readStoredGameUiScaleMode({ getItem: () => 'large' })).toBe('large');
  });

  it('persists the selected mode with the dedicated storage key', () => {
    const writes: Array<[string, string]> = [];
    persistGameUiScaleMode('small', {
      setItem: (key, value) => {
        writes.push([key, value]);
      }
    });
    expect(writes).toEqual([[GAME_UI_SCALE_STORAGE_KEY, 'small']]);
  });

  it('uses the recalibrated size ladder', () => {
    expect(getGameUiUserScale('small')).toBe(1);
    expect(getGameUiUserScale('medium')).toBe(1.2);
    expect(getGameUiUserScale('large')).toBe(1.36);
    expect(getGameUiUserScale('small')).toBeLessThan(getGameUiUserScale('medium'));
    expect(getGameUiUserScale('large')).toBeGreaterThan(getGameUiUserScale('medium'));
  });

  it('derives a smoother fluid scale from the viewport instead of raw breakpoints', () => {
    const phoneLandscape = resolveGameUiFluidScale({ width: 844, height: 390 });
    const tabletLandscape = resolveGameUiFluidScale({ width: 1180, height: 820 });
    const desktop = resolveGameUiFluidScale({ width: 1440, height: 900 });

    expect(phoneLandscape).toBeGreaterThanOrEqual(0.9);
    expect(tabletLandscape).toBeGreaterThan(phoneLandscape);
    expect(desktop).toBeGreaterThanOrEqual(tabletLandscape);
  });

  it('combines the fluid scale with the selected mode', () => {
    const viewport = { width: 1366, height: 768 };
    const small = resolveGameUiScale('small', viewport);
    const medium = resolveGameUiScale('medium', viewport);
    const large = resolveGameUiScale('large', viewport);

    expect(small).toBeLessThan(medium);
    expect(large).toBeGreaterThan(medium);
  });
});
