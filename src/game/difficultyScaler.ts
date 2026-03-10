import { clamp } from '../core/math';

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

  return {
    normalized,
    band,
    spacing: 11.8 + normalized * 8.8,
    movementAmplitude: 0.08 + normalized * 1.05,
    movementSpeed: 0.22 + normalized * 0.88,
    cameraSpeed: 1.45 + normalized * 2.85,
    cameraCatchupSpeed: 2.6 + normalized * 2.2,
    maxJumpDistance: 18.4 + normalized * 9.6,
    maxVerticalDelta: 5.2 + normalized * 3.8,
    safeZoneDistance: 8.6 + normalized * 1.8,
    cameraLookAhead: 6.6 + normalized * 3.9,
    baseZoom: 16.5,
    largeShardZoom: 5.5,
    milestoneZoom: 18,
    momentumZoomRange: 10.5,
    enemyUnlocked: level >= 20,
    ovalUnlocked: level >= 50,
    triangularUnlocked: level >= 100,
    roundMovementUnlocked: level >= 5,
    eventChance: level < 12 ? 0 : level < 60 ? 0.08 : level < 120 ? 0.14 : 0.18,
    movingShardChance: level < 5 ? 0 : level < 50 ? 0.12 : level < 100 ? 0.2 : 0.3
  };
}
