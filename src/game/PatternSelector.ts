import { getDifficultyProfile } from './difficultyScaler';
import type { GamePathPattern } from './PatternLibrary';
import { PATTERN_LIBRARY } from './PatternLibrary';

const difficultyWeights = {
  easy: { easy: 70, medium: 30, hard: 0, expert: 0 },
  medium: { easy: 40, medium: 40, hard: 20, expert: 0 },
  hard: { easy: 0, medium: 20, hard: 60, expert: 20 },
  expert: { easy: 0, medium: 10, hard: 55, expert: 35 }
} as const;

export function selectPattern(score: number, rng: () => number, recentPatternIds: string[]) {
  const profile = getDifficultyProfile(score);
  const weights = difficultyWeights[profile.band];
  const recent = new Set(recentPatternIds.slice(-3));
  const eligible = PATTERN_LIBRARY.filter((pattern) => !recent.has(pattern.id) && weights[pattern.difficulty] > 0);
  const pool = eligible.length > 0 ? eligible : PATTERN_LIBRARY.filter((pattern) => weights[pattern.difficulty] > 0);
  const totalWeight = pool.reduce((sum, pattern) => sum + weights[pattern.difficulty], 0);

  let cursor = rng() * totalWeight;
  for (const pattern of pool) {
    cursor -= weights[pattern.difficulty];
    if (cursor <= 0) {
      return pattern;
    }
  }

  return pool[pool.length - 1] as GamePathPattern;
}
