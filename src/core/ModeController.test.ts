import { describe, expect, it } from 'vitest';
import { ModeController } from './ModeController';

describe('ModeController', () => {
  it('allows the intro flow into orbit', () => {
    const controller = new ModeController();
    controller.setMode('intro_shattering');
    controller.setMode('intro_transition');
    controller.setMode('orbit');

    expect(controller.current).toBe('orbit');
  });

  it('rejects invalid transitions', () => {
    const controller = new ModeController();

    expect(() => controller.setMode('focus')).toThrowError(/Invalid mode transition/);
  });

  it('supports the focus lifecycle', () => {
    const controller = new ModeController();
    controller.setMode('intro_shattering');
    controller.setMode('intro_transition');
    controller.setMode('orbit');
    controller.setMode('focus_enter');
    controller.setMode('focus');
    controller.setMode('focus_facet_transition');
    controller.setMode('focus');
    controller.setMode('focus_exit');
    controller.setMode('orbit');

    expect(controller.current).toBe('orbit');
  });
});
