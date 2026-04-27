import { describe, expect, it } from 'vitest';
import {
  GameQualityController,
  buildGameVisualQuality,
  clampMobileAutoQualityCeiling,
  estimateAutoGameQuality,
  resolveInitialAutoQuality,
  resolveAdventureLoadAutoDowngrade,
  resolveRuntimeAutoUpgrade,
  resolveRuntimeAutoDowngrade
} from './gameQuality';

describe('gameQuality', () => {
  it('keeps medium limited to momentum boats only', () => {
    expect(buildGameVisualQuality('medium')).toEqual({
      showMomentumBoats: false,
      showMusicReactiveBackdrop: true,
      showParallaxLayers: true,
      showDecorativeWaves: true,
      showParticles: true,
      enableHudAnimations: true,
      enableMomentumAvatarAnimation: true,
      enableGradeAnimations: true,
      enableEnemySpriteAnimations: true,
      enableGlowEffects: true
    });
  });

  it('keeps low limited to boats plus reactive backdrop', () => {
    expect(buildGameVisualQuality('low')).toEqual({
      showMomentumBoats: false,
      showMusicReactiveBackdrop: false,
      showParallaxLayers: true,
      showDecorativeWaves: true,
      showParticles: true,
      enableHudAnimations: true,
      enableMomentumAvatarAnimation: true,
      enableGradeAnimations: true,
      enableEnemySpriteAnimations: true,
      enableGlowEffects: true
    });
  });

  it('collapses ultra low to gameplay-safe visuals only', () => {
    const quality = buildGameVisualQuality('ultra_low');
    expect(quality.showParallaxLayers).toBe(false);
    expect(quality.showParticles).toBe(false);
    expect(quality.enableHudAnimations).toBe(false);
    expect(quality.enableEnemySpriteAnimations).toBe(false);
  });

  it('estimates weaker mobile devices below high', () => {
    expect(
      estimateAutoGameQuality({
        isMobile: true,
        viewportWidth: 390,
        viewportHeight: 844,
        devicePixelRatio: 3,
        hardwareConcurrency: 4,
        deviceMemory: 4
      })
    ).toBe('low');
  });

  it('keeps strong desktops on high by default', () => {
    expect(
      estimateAutoGameQuality({
        isMobile: false,
        viewportWidth: 1440,
        viewportHeight: 900,
        devicePixelRatio: 1,
        hardwareConcurrency: 8,
        deviceMemory: 16
      })
    ).toBe('high');
  });

  it('never starts mobile auto above low during the launch path', () => {
    expect(
      resolveInitialAutoQuality(
        'high',
        {
          isMobile: true,
          isAppleMobile: false,
          isAndroid: true
        },
        false
      )
    ).toBe('low');
    expect(
      resolveInitialAutoQuality(
        'medium',
        {
          isMobile: true,
          isAppleMobile: true,
          isAndroid: false
        },
        false
      )
    ).toBe('ultra_low');
  });

  it('caps mobile auto ceilings below high even on strong phones', () => {
    expect(
      clampMobileAutoQualityCeiling('high', {
        isMobile: true,
        isAppleMobile: false,
        isAndroid: true
      })
    ).toBe('medium');
  });

  it('downgrades auto quality on slow adventure loads', () => {
    expect(resolveAdventureLoadAutoDowngrade('high', { adventureLoadMs: 5000 })).toEqual({
      quality: 'medium',
      reason: 'adventure_load_slow'
    });
  });

  it('only downgrades auto quality at runtime', () => {
    expect(
      resolveRuntimeAutoDowngrade('medium', {
        fpsAverage: 34,
        frameMsP95: 48,
        sampleCount: 80,
        startupStutterCount: 0
      })
    ).toEqual({
      quality: 'low',
      reason: 'p95_critical'
    });
  });

  it('allows only one-step auto upgrades after sustained stability', () => {
    expect(
      resolveRuntimeAutoUpgrade('low', 'medium', {
        fpsAverage: 58,
        frameMsP95: 20,
        sampleCount: 100,
        startupStutterCount: 0
      })
    ).toEqual({
      quality: 'medium',
      reason: 'stable_runtime'
    });
  });

  it('lets mobile warmup lift ultra low only to low when early frames are stable', () => {
    const controller = new GameQualityController({
      estimateInput: {
        isMobile: true,
        viewportWidth: 430,
        viewportHeight: 932,
        devicePixelRatio: 3,
        hardwareConcurrency: 6,
        deviceMemory: 6
      },
      platformInfo: {
        isMobile: true,
        isAppleMobile: true,
        isAndroid: false
      },
      now: () => 0
    });

    expect(controller.getState().resolved).toBe('ultra_low');
    expect(
      controller.applyAdventureSafetyWarmup({
        frameMsAverage: 16.5,
        frameMsP95: 22,
        sampleCount: 8
      })
    ).toEqual({
      previousQuality: 'ultra_low',
      newQuality: 'low',
      reason: 'adventure_safety_warmup_stable',
      state: expect.objectContaining({
        resolved: 'low'
      })
    });
  });

  it('persists manual overrides without changing gameplay state', () => {
    const storage = new Map<string, string>();
    const controller = new GameQualityController({
      storage: {
        getItem: (key) => storage.get(key) ?? null,
        setItem: (key, value) => {
          storage.set(key, value);
        },
        removeItem: (key) => {
          storage.delete(key);
        },
        clear: () => {
          storage.clear();
        },
        key: (index) => [...storage.keys()][index] ?? null,
        get length() {
          return storage.size;
        }
      },
      estimateInput: {
        isMobile: false,
        viewportWidth: 1440,
        viewportHeight: 900,
        devicePixelRatio: 1,
        hardwareConcurrency: 8,
        deviceMemory: 16
      },
      now: () => 0
    });

    const state = controller.setSelection('ultra_low');
    expect(state.selection).toBe('ultra_low');
    expect(state.source).toBe('manual');
    expect(storage.get('portfolio-game-quality-v1')).toBe('ultra_low');
  });

  it('forces ultra low for the current session after a recovered crash', () => {
    const controller = new GameQualityController({
      recoveryForced: true,
      estimateInput: {
        isMobile: false,
        viewportWidth: 1440,
        viewportHeight: 900,
        devicePixelRatio: 1,
        hardwareConcurrency: 8,
        deviceMemory: 16
      },
      now: () => 0
    });

    expect(controller.getState().resolved).toBe('ultra_low');
    expect(controller.getState().recoveryForced).toBe(true);
  });
});
