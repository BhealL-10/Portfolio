type EasingName = 'linear' | 'easeOutCubic' | 'easeInOutCubic' | 'easeOutQuint';

interface Tween {
  id: number;
  duration: number;
  elapsed: number;
  from: number;
  to: number;
  easing: EasingName;
  onUpdate: (value: number) => void;
  onComplete?: () => void;
}

const easings: Record<EasingName, (t: number) => number> = {
  linear: (t) => t,
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  easeOutQuint: (t) => 1 - Math.pow(1 - t, 5)
};

export class TransitionSystem {
  private tweens = new Map<number, Tween>();
  private nextId = 1;

  animate(options: Omit<Tween, 'id' | 'elapsed'>) {
    const id = this.nextId++;
    const tween: Tween = {
      id,
      elapsed: 0,
      ...options
    };

    tween.onUpdate(tween.from);
    this.tweens.set(id, tween);
    return id;
  }

  cancel(id: number) {
    this.tweens.delete(id);
  }

  clear() {
    this.tweens.clear();
  }

  update(deltaTime: number) {
    for (const tween of this.tweens.values()) {
      tween.elapsed += deltaTime;
      const progress = Math.min(1, tween.elapsed / tween.duration);
      const eased = easings[tween.easing](progress);
      tween.onUpdate(tween.from + (tween.to - tween.from) * eased);

      if (progress >= 1) {
        this.tweens.delete(tween.id);
        tween.onComplete?.();
      }
    }
  }
}
