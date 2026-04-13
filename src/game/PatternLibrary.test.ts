import { describe, expect, it } from 'vitest';
import { HUNDRED_METER_PATTERN_LIBRARY, INTRO_10M_PATTERN_LIBRARY, PATTERN_CONTENT_WINDOWS, PATTERN_LIBRARY } from './PatternLibrary';

describe('PATTERN_LIBRARY', () => {
  it('contains dedicated intro and 100m block libraries', () => {
    expect(INTRO_10M_PATTERN_LIBRARY).toHaveLength(10);
    expect(HUNDRED_METER_PATTERN_LIBRARY).toHaveLength(12);
    expect(PATTERN_LIBRARY).toHaveLength(22);
  });

  it('keeps intro patterns dense and tutorial-friendly', () => {
    expect(INTRO_10M_PATTERN_LIBRARY.every((pattern) => pattern.scale === 'intro_10m')).toBe(true);
    expect(INTRO_10M_PATTERN_LIBRARY.every((pattern) => pattern.density === 'dense')).toBe(true);
    expect(INTRO_10M_PATTERN_LIBRARY.every((pattern) => pattern.nodes.length >= 12)).toBe(true);
  });

  it('keeps main patterns varied across density and movement styles', () => {
    const movementHeavyCount = HUNDRED_METER_PATTERN_LIBRARY.filter((pattern) => pattern.movementType !== 'static').length;
    const selectiveCount = HUNDRED_METER_PATTERN_LIBRARY.filter((pattern) => pattern.density === 'selective').length;

    expect(HUNDRED_METER_PATTERN_LIBRARY.every((pattern) => pattern.scale === 'main_100m')).toBe(true);
    expect(movementHeavyCount).toBeGreaterThanOrEqual(9);
    expect(selectiveCount).toBeGreaterThanOrEqual(2);
  });

  it('fits intro and main pattern templates inside their milestone-safe windows', () => {
    const introWindow = PATTERN_CONTENT_WINDOWS.intro_10m;
    const mainWindow = PATTERN_CONTENT_WINDOWS.main_100m;

    expect(INTRO_10M_PATTERN_LIBRARY.every((pattern) => pattern.nodes.every((node) => node.x >= introWindow.start && node.x <= introWindow.end))).toBe(true);
    expect(HUNDRED_METER_PATTERN_LIBRARY.every((pattern) => pattern.nodes.every((node) => node.x >= mainWindow.start && node.x <= mainWindow.end))).toBe(true);
  });
});
