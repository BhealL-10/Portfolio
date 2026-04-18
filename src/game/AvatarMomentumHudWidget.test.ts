import { describe, expect, it } from 'vitest';
import {
  deriveAvatarMomentumSpriteMetrics,
  resolveAvatarMomentumFrontAnimationKind,
  resolveMomentumAuraBaseColor,
  resolveMomentumAuraRainbowOpacity,
  resolveAvatarMomentumWidgetGeometry
} from './AvatarMomentumHudWidget';

describe('AvatarMomentumHudWidget helpers', () => {
  it('derives frame metrics from the real sheet dimensions instead of assuming a source size', () => {
    expect(deriveAvatarMomentumSpriteMetrics(3000, 1000)).toEqual({
      frameCount: 4,
      totalWidth: 3000,
      totalHeight: 1000,
      frameWidth: 750,
      frameHeight: 1000
    });
  });

  it('prioritizes twist over every landing grade for the front animation', () => {
    expect(resolveAvatarMomentumFrontAnimationKind('miss', true)).toBe('twist');
    expect(resolveAvatarMomentumFrontAnimationKind('good', true)).toBe('twist');
    expect(resolveAvatarMomentumFrontAnimationKind('super', true)).toBe('twist');
    expect(resolveAvatarMomentumFrontAnimationKind('perfect', true)).toBe('twist');
  });

  it('maps success grades to the shared success sheet and miss to the fail sheet', () => {
    expect(resolveAvatarMomentumFrontAnimationKind('miss', false)).toBe('fail');
    expect(resolveAvatarMomentumFrontAnimationKind('good', false)).toBe('success');
    expect(resolveAvatarMomentumFrontAnimationKind('super', false)).toBe('success');
    expect(resolveAvatarMomentumFrontAnimationKind('perfect', false)).toBe('success');
  });

  it('keeps the HUD placement scaled from the avatar placeholder geometry', () => {
    const geometry = resolveAvatarMomentumWidgetGeometry();

    expect(geometry.widgetLeftPercent).toBeCloseTo(5.1788, 4);
    expect(geometry.widgetTopPercent).toBeCloseTo(-8.4193, 4);
    expect(geometry.widgetWidthPercent).toBeCloseTo(10.1642, 4);
    expect(geometry.avatarLeftPercent).toBeCloseTo(28.8117, 4);
    expect(geometry.avatarTopPercent).toBeCloseTo(7.7656, 4);
    expect(geometry.avatarSizePercent).toBeCloseTo(41.6059, 4);
  });

  it('uses the requested warm base color at zero momentum', () => {
    expect(resolveMomentumAuraBaseColor(0)).toBe('rgb(242 221 184)');
  });

  it('fades into the rainbow layer only near max momentum', () => {
    expect(resolveMomentumAuraRainbowOpacity(0)).toBe(0);
    expect(resolveMomentumAuraRainbowOpacity(0.9)).toBeGreaterThan(0);
    expect(resolveMomentumAuraRainbowOpacity(1)).toBe(1);
  });
});
