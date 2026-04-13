import { getDifficultyProfile } from './difficultyScaler';
import type { GamePathPattern } from './PatternLibrary';
import { PATTERN_LIBRARY } from './PatternLibrary';

const difficultyWeights = {
  easy: { easy: 70, medium: 30, hard: 0, expert: 0 },
  medium: { easy: 40, medium: 40, hard: 20, expert: 0 },
  hard: { easy: 0, medium: 20, hard: 60, expert: 20 },
  expert: { easy: 0, medium: 10, hard: 55, expert: 35 }
} as const;

const INTRO_PATTERN_DISTANCE_METERS = 200;
const RECOVERY_WINDOW_METERS = 28;

export interface PatternSelectionContext {
  score: number;
  distanceMeters: number;
  recentPatternIds: string[];
  rng: () => number;
}

export function selectPattern({ score, distanceMeters, recentPatternIds, rng }: PatternSelectionContext) {
  const profile = getDifficultyProfile(score);
  const weights = difficultyWeights[profile.band];
  const recent = new Set(recentPatternIds.slice(-3));
  const previousMilestone = getPreviousMilestone(distanceMeters);
  const earlyGame = distanceMeters < INTRO_PATTERN_DISTANCE_METERS;
  const recoveryWindow = earlyGame && previousMilestone !== null && distanceMeters - previousMilestone <= RECOVERY_WINDOW_METERS;
  const stagePool = PATTERN_LIBRARY.filter((pattern) => {
    if (earlyGame) {
      return recoveryWindow ? pattern.stage === 'recovery' || pattern.stage === 'intro' : pattern.stage === 'intro' || pattern.stage === 'recovery';
    }
    return pattern.stage === 'standard';
  });
  const weightedPool = stagePool.filter((pattern) => weights[pattern.difficulty] > 0);
  const fallbackStagePool = weightedPool.length > 0 ? weightedPool : PATTERN_LIBRARY.filter((pattern) => weights[pattern.difficulty] > 0);
  const eligible = fallbackStagePool.filter((pattern) => !recent.has(pattern.id));
  const pool = eligible.length > 0 ? eligible : fallbackStagePool;
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

function getPreviousMilestone(distanceMeters: number) {
  if (distanceMeters < 10) {
    return null;
  }
  if (distanceMeters < 100) {
    return 10;
  }
  return Math.floor(distanceMeters / 100) * 100;
}
