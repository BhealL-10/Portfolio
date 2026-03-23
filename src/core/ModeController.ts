export type AppMode =
  | 'intro'
  | 'intro_shattering'
  | 'intro_transition'
  | 'primaterie_portal'
  | 'primaterie_transition'
  | 'orbit'
  | 'dragging'
  | 'focus_enter'
  | 'focus'
  | 'focus_facet_transition'
  | 'focus_exit'
  | 'about_section'
  | 'constellation_complete'
  | 'game_transition'
  | 'game'
  | 'game_over';

const allowedTransitions: Record<AppMode, AppMode[]> = {
  intro: ['intro_shattering', 'primaterie_portal'],
  intro_shattering: ['intro_transition'],
  intro_transition: ['orbit'],
  primaterie_portal: ['game_transition', 'primaterie_transition'],
  primaterie_transition: ['orbit'],
  orbit: ['dragging', 'focus_enter', 'about_section', 'constellation_complete', 'game_transition'],
  dragging: ['orbit', 'constellation_complete', 'game_transition'],
  focus_enter: ['focus', 'focus_exit'],
  focus: ['focus_facet_transition', 'focus_exit'],
  focus_facet_transition: ['focus'],
  focus_exit: ['orbit', 'constellation_complete'],
  about_section: ['orbit', 'constellation_complete'],
  constellation_complete: ['focus_enter', 'about_section', 'orbit', 'game_transition'],
  game_transition: ['game', 'orbit', 'constellation_complete', 'primaterie_portal'],
  game: ['game_over', 'orbit', 'game_transition'],
  game_over: ['game', 'orbit', 'game_transition']
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
