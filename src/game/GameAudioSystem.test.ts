import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AUDIO_STORAGE_KEYS } from './audioConstants';
import { GameAudioSystem, resolveOrderedMusicLoopProgression } from './GameAudioSystem';

function createStorageMock(): Storage {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.get(key) ?? null;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    }
  };
}

const localStorageMock = createStorageMock();

beforeEach(() => {
  vi.stubGlobal('window', {
    localStorage: localStorageMock
  });
  localStorageMock.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('resolveOrderedMusicLoopProgression', () => {
  it('always starts with intro then loop1', () => {
    expect(resolveOrderedMusicLoopProgression('intro', 180, 0)).toEqual({
      trackId: 'loop1',
      nextCycleIndex: 1
    });
  });

  it('does not skip intermediate loops before 250m', () => {
    const afterLoop1 = resolveOrderedMusicLoopProgression('loop1', 120, 1);
    expect(afterLoop1).toEqual({
      trackId: 'loop2',
      nextCycleIndex: 2
    });

    const afterLoop2 = resolveOrderedMusicLoopProgression('loop2', 120, afterLoop1.nextCycleIndex);
    expect(afterLoop2).toEqual({
      trackId: 'loop3',
      nextCycleIndex: 3
    });
  });

  it('replays the current loop until the next ordered threshold is unlocked', () => {
    expect(resolveOrderedMusicLoopProgression('loop1', 32, 1)).toEqual({
      trackId: 'loop1',
      nextCycleIndex: 1
    });
    expect(resolveOrderedMusicLoopProgression('loop3', 140, 3)).toEqual({
      trackId: 'loop3',
      nextCycleIndex: 3
    });
  });

  it('cycles in strict order after 250m', () => {
    const afterLoop4 = resolveOrderedMusicLoopProgression('loop4', 260, 0);
    expect(afterLoop4).toEqual({
      trackId: 'loop1',
      nextCycleIndex: 1
    });

    const afterCycleLoop1 = resolveOrderedMusicLoopProgression('loop1', 310, afterLoop4.nextCycleIndex);
    expect(afterCycleLoop1).toEqual({
      trackId: 'loop2',
      nextCycleIndex: 2
    });
  });
});

describe('GameAudioSystem settings persistence', () => {
  it('migrates the legacy global volume into both channel volumes', () => {
    window.localStorage.setItem(AUDIO_STORAGE_KEYS.volume, '0.42');

    const audio = new GameAudioSystem();

    expect(audio.getSettings()).toEqual({
      musicVolume: 0.42,
      sfxVolume: 0.42,
      muted: false
    });
    expect(window.localStorage.getItem(AUDIO_STORAGE_KEYS.musicVolume)).toBe('0.420');
    expect(window.localStorage.getItem(AUDIO_STORAGE_KEYS.sfxVolume)).toBe('0.420');
  });

  it('restores split channel values independently when they already exist', () => {
    window.localStorage.setItem(AUDIO_STORAGE_KEYS.musicVolume, '0.30');
    window.localStorage.setItem(AUDIO_STORAGE_KEYS.sfxVolume, '0.80');
    window.localStorage.setItem(AUDIO_STORAGE_KEYS.muted, '1');

    const audio = new GameAudioSystem();

    expect(audio.getSettings()).toEqual({
      musicVolume: 0.3,
      sfxVolume: 0.8,
      muted: true
    });
  });

  it('updates one channel without changing the other', () => {
    const audio = new GameAudioSystem();

    audio.setMusicVolume(0.25);
    audio.setSfxVolume(0.75);

    expect(audio.getSettings()).toEqual({
      musicVolume: 0.25,
      sfxVolume: 0.75,
      muted: false
    });
    expect(window.localStorage.getItem(AUDIO_STORAGE_KEYS.musicVolume)).toBe('0.250');
    expect(window.localStorage.getItem(AUDIO_STORAGE_KEYS.sfxVolume)).toBe('0.750');
  });
});
