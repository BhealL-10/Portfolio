import * as THREE from 'three';
import type { ThemeMode } from '../types/content';

const THEME_FOREGROUND_HEX = {
  dark: '#d8ccb9',
  light: '#6b7586'
} as const;

const THEME_BACKGROUND_HEX = {
  dark: '#2E3644',
  light: '#A5977F'
} as const;

export function getThemeForegroundHex(theme: ThemeMode) {
  return THEME_FOREGROUND_HEX[theme];
}

export function getThemeBackgroundHex(theme: ThemeMode) {
  return THEME_BACKGROUND_HEX[theme];
}

export function getThemeNonShardHex(theme: ThemeMode) {
  return getThemeBackgroundHex(theme);
}

export function getThemeShardHex(theme: ThemeMode) {
  return getThemeForegroundHex(theme);
}

export function getThemeShardContrastHex(theme: ThemeMode) {
  return getThemeBackgroundHex(theme);
}

export function setThemeForegroundColor(theme: ThemeMode, target: THREE.Color) {
  return target.set(getThemeForegroundHex(theme));
}

export function setThemeBackgroundColor(theme: ThemeMode, target: THREE.Color) {
  return target.set(getThemeBackgroundHex(theme));
}

export function setThemeNonShardColor(theme: ThemeMode, target: THREE.Color) {
  return target.set(getThemeNonShardHex(theme));
}
