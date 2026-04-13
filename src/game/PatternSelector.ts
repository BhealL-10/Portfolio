import * as THREE from 'three';
import { getDifficultyProfile } from './difficultyScaler';
import type { GamePathPattern } from './PatternLibrary';
import { PATTERN_LIBRARY } from './PatternLibrary';

export interface PatternSelectionContext {
  score: number;
  distanceMeters: number;
  blockKind: 'intro' | 'main';
  blockIndex: number;
  recentPatternIds: string[];
  rng: () => number;
}

const difficultyWeights = {
  easy: { easy: 70, medium: 26, hard: 4, expert: 0 },
  medium: { easy: 28, medium: 44, hard: 22, expert: 6 },
  hard: { easy: 10, medium: 28, hard: 42, expert: 20 },
  expert: { easy: 0, medium: 18, hard: 46, expert: 36 }
} as const;

export function selectPattern({ score, distanceMeters, blockKind, blockIndex, recentPatternIds, rng }: PatternSelectionContext) {
  const profile = getDifficultyProfile(score);
  const recent = new Set(recentPatternIds.slice(-4));
  const scale = blockKind === 'intro' ? 'intro_10m' : 'main_100m';
  const basePool = PATTERN_LIBRARY.filter((pattern) => pattern.scale === scale);
  const weightedPool = basePool.filter((pattern) => difficultyWeights[profile.band][pattern.difficulty] > 0);
  const fallbackPool = weightedPool.length > 0 ? weightedPool : basePool;
  const eligible = fallbackPool.filter((pattern) => !recent.has(pattern.id));
  const pool = eligible.length > 0 ? eligible : fallbackPool;

  const totalWeight = pool.reduce(
    (sum, pattern) => sum + getPatternWeight(pattern, difficultyWeights[profile.band][pattern.difficulty], profile.movingShardChance, distanceMeters, blockKind, blockIndex),
    0
  );

  let cursor = rng() * totalWeight;
  for (const pattern of pool) {
    cursor -= getPatternWeight(pattern, difficultyWeights[profile.band][pattern.difficulty], profile.movingShardChance, distanceMeters, blockKind, blockIndex);
    if (cursor <= 0) {
      return pattern;
    }
  }

  return pool[pool.length - 1] as GamePathPattern;
}

function getPatternWeight(
  pattern: GamePathPattern,
  baseWeight: number,
  movingShardChance: number,
  distanceMeters: number,
  blockKind: 'intro' | 'main',
  blockIndex: number
) {
  const normalizedMovingChance = THREE.MathUtils.clamp(movingShardChance / 0.88, 0, 1);
  const denseIntroBoost =
    blockKind === 'intro'
      ? pattern.density === 'dense'
        ? 1.4
        : 0.82
      : 1;
  const earlyMainDensityBoost =
    blockKind === 'main'
      ? blockIndex < 3
        ? pattern.density === 'dense'
          ? 1.38
          : pattern.density === 'balanced'
            ? 1.14
            : 0.8
        : blockIndex < 6
          ? pattern.density === 'dense'
            ? 1.12
            : pattern.density === 'balanced'
              ? 1.08
              : 0.94
          : pattern.density === 'selective'
            ? 1.14
            : pattern.density === 'balanced'
              ? 1.06
              : 0.96
      : 1;
  const verticalityBoost =
    distanceMeters < 220
      ? pattern.verticality === 'high'
        ? 1.14
        : pattern.verticality === 'medium'
          ? 1.08
          : 0.96
      : pattern.verticality === 'high'
        ? 1.06
        : 1;
  const motionBoost =
    pattern.movementType === 'moving'
      ? THREE.MathUtils.lerp(1.48, 2.08, normalizedMovingChance)
      : pattern.movementType === 'mixed'
        ? THREE.MathUtils.lerp(1.2, 1.52, normalizedMovingChance)
        : THREE.MathUtils.lerp(1, 0.84, normalizedMovingChance);
  return baseWeight * denseIntroBoost * earlyMainDensityBoost * verticalityBoost * motionBoost;
}
