import type { AchievementPersistenceState } from './AchievementTypes';

const ACHIEVEMENT_STORAGE_KEY = 'portfolio-game-achievements-v2';

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export function createEmptyAchievementPersistenceState(): AchievementPersistenceState {
  return {
    unlocked: [],
    progress: {},
    claimedRewards: []
  };
}

function resolveStorage(storage?: StorageLike | null) {
  if (storage) {
    return storage;
  }
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  return null;
}

export function readAchievementPersistence(storage?: StorageLike | null): AchievementPersistenceState {
  const target = resolveStorage(storage);
  if (!target) {
    return createEmptyAchievementPersistenceState();
  }
  const raw = target.getItem(ACHIEVEMENT_STORAGE_KEY);
  if (!raw) {
    return createEmptyAchievementPersistenceState();
  }
  try {
    return normalizeAchievementPersistence(JSON.parse(raw));
  } catch {
    return createEmptyAchievementPersistenceState();
  }
}

export function writeAchievementPersistence(state: AchievementPersistenceState, storage?: StorageLike | null) {
  const target = resolveStorage(storage);
  if (!target) {
    return;
  }
  target.setItem(ACHIEVEMENT_STORAGE_KEY, JSON.stringify(normalizeAchievementPersistence(state)));
}

export function normalizeAchievementPersistence(value: unknown): AchievementPersistenceState {
  const raw = value as Partial<AchievementPersistenceState> | null | undefined;
  const unlocked = Array.isArray(raw?.unlocked) ? raw.unlocked.filter((entry): entry is string => typeof entry === 'string') : [];
  const claimedRewards = Array.isArray(raw?.claimedRewards)
    ? raw.claimedRewards.filter((entry): entry is string => typeof entry === 'string')
    : [];
  const progressEntries = raw?.progress && typeof raw.progress === 'object' ? Object.entries(raw.progress) : [];
  const progress = progressEntries.reduce<Record<string, number>>((acc, [key, candidate]) => {
    const numericValue = typeof candidate === 'number' ? candidate : Number(candidate);
    if (!Number.isFinite(numericValue)) {
      return acc;
    }
    acc[key] = numericValue;
    return acc;
  }, {});
  return {
    unlocked: [...new Set(unlocked)],
    progress,
    claimedRewards: [...new Set(claimedRewards)]
  };
}
