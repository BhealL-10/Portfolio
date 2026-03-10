import { clamp } from '../core/math';

export interface DifficultyProfile {
  normalized: number;
  spacing: number;
  movementAmplitude: number;
  movementSpeed: number;
  cameraSpeed: number;
  maxJumpDistance: number;
  maxVerticalDelta: number;
  safeZoneDistance: number;
  cameraLookAhead: number;
}

export function getDifficultyProfile(level: number): DifficultyProfile {
  const normalized = clamp(level / 200, 0, 1);

  return {
    normalized,
    spacing: 10.4 + normalized * 6.4,
    movementAmplitude: level < 50 ? 0 : 0.16 + normalized * 0.9,
    movementSpeed: 0.48 + normalized * 0.82,
    cameraSpeed: 1.9 + normalized * 2.75,
    maxJumpDistance: 17.8 + normalized * 5.6,
    maxVerticalDelta: 4.8 + normalized * 2.5,
    safeZoneDistance: 8.4,
    cameraLookAhead: 7.4 + normalized * 2.8
  };
}
