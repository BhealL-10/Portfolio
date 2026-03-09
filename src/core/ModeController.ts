export type AppMode =
  | 'intro'
  | 'intro_shattering'
  | 'intro_transition'
  | 'orbit'
  | 'dragging'
  | 'focus_enter'
  | 'focus'
  | 'focus_facet_transition'
  | 'focus_exit'
  | 'about_section'
  | 'constellation_complete';

const allowedTransitions: Record<AppMode, AppMode[]> = {
  intro: ['intro_shattering'],
  intro_shattering: ['intro_transition'],
  intro_transition: ['orbit'],
  orbit: ['dragging', 'focus_enter', 'about_section', 'constellation_complete'],
  dragging: ['orbit', 'constellation_complete'],
  focus_enter: ['focus', 'focus_exit'],
  focus: ['focus_facet_transition', 'focus_exit'],
  focus_facet_transition: ['focus'],
  focus_exit: ['orbit', 'constellation_complete'],
  about_section: ['orbit', 'constellation_complete'],
  constellation_complete: ['focus_enter', 'about_section', 'orbit']
};

export class ModeController {
  private mode: AppMode = 'intro';
  private listeners = new Set<(next: AppMode, previous: AppMode) => void>();

  get current() {
    return this.mode;
  }

  is(mode: AppMode) {
    return this.mode === mode;
  }

  canTransition(next: AppMode) {
    if (next === this.mode) return true;
    return allowedTransitions[this.mode].includes(next);
  }

  setMode(next: AppMode) {
    if (!this.canTransition(next)) {
      throw new Error(`Invalid mode transition from ${this.mode} to ${next}`);
    }

    if (next === this.mode) return;

    const previous = this.mode;
    this.mode = next;
    this.listeners.forEach((listener) => listener(next, previous));
  }

  onChange(listener: (next: AppMode, previous: AppMode) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
