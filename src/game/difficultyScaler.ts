import * as THREE from 'three';
import { clamp } from '../core/math';

export const DEFAULT_COLUMN_DISTANCE = 8.9;
const MOVING_SHARD_TEST_BOOST = true;

export function pathDistanceToMeters(pathDistance: number) {
  return pathDistance / DEFAULT_COLUMN_DISTANCE;
}

export interface DifficultyProfile {
  normalized: number;
  band: 'easy' | 'medium' | 'hard' | 'expert';
  spacing: number;
  movementAmplitude: number;
  movementSpeed: number;
  cameraSpeed: number;
  cameraCatchupSpeed: number;
  maxJumpDistance: number;
  maxVerticalDelta: number;
  safeZoneDistance: number;
  cameraLookAhead: number;
  baseZoom: number;
  largeShardZoom: number;
  milestoneZoom: number;
  momentumZoomRange: number;
  enemyUnlocked: boolean;
  ovalUnlocked: boolean;
  triangularUnlocked: boolean;
  roundMovementUnlocked: boolean;
  eventChance: number;
  movingShardChance: number;
}

export function getDifficultyProfile(level: number): DifficultyProfile {
  const normalized = clamp(level / 200, 0, 1);
  const band = level < 50 ? 'easy' : level < 100 ? 'medium' : level < 160 ? 'hard' : 'expert';
  const densityTaper = THREE.MathUtils.smootherstep(clamp((level - 200) / 800, 0, 1), 0, 1);

  // Progressive camera speed: readable early run, then a smoother ramp that reaches the cap around 1000m.
  const slowPhase = Math.min(level, 200) / 200 * 0.85;
  const fastPhase = THREE.MathUtils.smootherstep(clamp((level - 200) / 800, 0, 1), 0, 1) * 5.5;
  const cameraSpeed = 1.65 + slowPhase + fastPhase;

  return {
    normalized,
    band,
    spacing: DEFAULT_COLUMN_DISTANCE + normalized * 4.2 + densityTaper * 3.6,
    movementAmplitude: 0.08 + normalized * 1.05,
    movementSpeed: 0.22 + normalized * 0.88,
    cameraSpeed,
    cameraCatchupSpeed: 2.6 + normalized * 2.2,
    maxJumpDistance: 17.8 + normalized * 9.2,
    maxVerticalDelta: 5.2 + normalized * 3.8,
    safeZoneDistance: 8.6 + normalized * 1.8,
    cameraLookAhead: 8.6 + normalized * 5.2,
    baseZoom: 22.2,
    largeShardZoom: 6.4,
    milestoneZoom: 18,
    momentumZoomRange: 10.4,
    enemyUnlocked: level >= 20,
    ovalUnlocked: level >= 50,
    triangularUnlocked: level >= 100,
    roundMovementUnlocked: level >= 5,
    eventChance: level < 12 ? 0 : level < 60 ? 0.08 : level < 120 ? 0.14 : 0.18,
    movingShardChance: MOVING_SHARD_TEST_BOOST
      ? level < 2
        ? 0.78
        : level < 20
          ? 0.92
          : level < 60
            ? 0.78
            : level < 100
              ? 0.58
              : 0.52
      : level < 5
        ? 0
        : level < 50
          ? 0.18
          : level < 100
            ? 0.28
            : 0.4
  };
}
