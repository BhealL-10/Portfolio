import { describe, expect, it } from 'vitest';
import { PATTERN_LIBRARY } from './PatternLibrary';

describe('PATTERN_LIBRARY', () => {
  it('contains exactly 30 authored patterns', () => {
    expect(PATTERN_LIBRARY).toHaveLength(30);
  });

  it('matches the expected family distribution', () => {
    const counts = PATTERN_LIBRARY.reduce<Record<string, number>>((acc, pattern) => {
      acc[pattern.difficulty] = (acc[pattern.difficulty] ?? 0) + 1;
      return acc;
    }, {});

    expect(counts.easy).toBe(10);
    expect(counts.medium).toBe(10);
    expect(counts.hard).toBe(6);
    expect(counts.expert).toBe(4);
  });
});
