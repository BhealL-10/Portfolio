import { describe, expect, it } from 'vitest';
import { resolveOrderedMusicLoopProgression } from './GameAudioSystem';

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
