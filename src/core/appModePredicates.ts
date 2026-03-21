import type { AppMode } from './ModeController';

export function isIntroMode(mode: AppMode) {
  return mode === 'intro' || mode === 'intro_shattering' || mode === 'intro_transition';
}

export function isFocusMode(mode: AppMode) {
  return mode === 'focus' || mode === 'focus_enter' || mode === 'focus_facet_transition' || mode === 'focus_exit';
}

export function isGameRuntimeMode(mode: AppMode) {
  return mode === 'game_transition' || mode === 'game' || mode === 'game_over';
}

export function isPrimatrieMode(mode: AppMode) {
  return mode === 'primatrie_portal' || mode === 'primatrie_transition';
}

export function isPortfolioBrowseMode(mode: AppMode) {
  return mode === 'orbit' || mode === 'constellation_complete';
}

export function isPortfolioInteractionMode(mode: AppMode) {
  return mode === 'orbit' || mode === 'constellation_complete' || mode === 'dragging';
}
