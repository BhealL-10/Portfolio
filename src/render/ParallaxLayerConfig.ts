import type { ThemeMode } from '../types/content';

export type LayerCategory = 'horizon' | 'far' | 'mid' | 'foreground';
export type LayerAssetTheme = 'light' | 'dark';

export interface ParallaxLayerConfig {
  category: LayerCategory;
  localZ: number;
  renderOrder: number;
  bottomScreenRatio: number;
  minimumBottomCoveragePx: number;
  displayedHeightRatio: number;
  minDisplayedHeightPx: number;
  parallaxFactor: number;
  driftSpeedPx: number;
  playerHeightInfluencePx: number;
  introStartOffsetPx: number;
  coverageMultiplier: number;
  minPanelCount: number;
  behindMusicBackground: boolean;
  staticLayer?: boolean;
}

export const PARALLAX_LAYER_ORDER: LayerCategory[] = ['horizon', 'far', 'mid', 'foreground'];
export const PARALLAX_GLOBAL_Y_OFFSET_PX = 20;
export const PARALLAX_TOP_HORIZON_BOTTOM_SCREEN_RATIO = 0.36;
export const PARALLAX_TOP_HORIZON_VERTICAL_OFFSET_PX = -99;

export const PARALLAX_LAYER_CONFIG: Record<LayerCategory, ParallaxLayerConfig> = {
  horizon: {
    category: 'horizon',
    localZ: -62,
    renderOrder: -8,
    bottomScreenRatio: 1.1,
    minimumBottomCoveragePx: 42,
    displayedHeightRatio: 0.4,
    minDisplayedHeightPx: 240,
    parallaxFactor: 0.82,
    driftSpeedPx: 1.8,
    playerHeightInfluencePx: 4,
    introStartOffsetPx: 220,
    coverageMultiplier: 2.2,
    minPanelCount: 4,
    behindMusicBackground: true
  },
  far: {
    category: 'far',
    localZ: -42,
    renderOrder: -2.8,
    bottomScreenRatio: 1.04,
    minimumBottomCoveragePx: 36,
    displayedHeightRatio: 0.32,
    minDisplayedHeightPx: 190,
    parallaxFactor: 2.9,
    driftSpeedPx: 14,
    playerHeightInfluencePx: 12,
    introStartOffsetPx: 250,
    coverageMultiplier: 2.4,
    minPanelCount: 5,
    behindMusicBackground: false
  },
  mid: {
    category: 'mid',
    localZ: -30,
    renderOrder: -2.6,
    bottomScreenRatio: 1.04,
    minimumBottomCoveragePx: 30,
    displayedHeightRatio: 0.26,
    minDisplayedHeightPx: 160,
    parallaxFactor: 5.4,
    driftSpeedPx: 22,
    playerHeightInfluencePx: 24,
    introStartOffsetPx: 280,
    coverageMultiplier: 2.6,
    minPanelCount: 6,
    behindMusicBackground: false
  },
  foreground: {
    category: 'foreground',
    localZ: -22,
    renderOrder: -2.4,
    bottomScreenRatio: 1.04,
    minimumBottomCoveragePx: 24,
    displayedHeightRatio: 0.22,
    minDisplayedHeightPx: 140,
    parallaxFactor: 9.4,
    driftSpeedPx: 34,
    playerHeightInfluencePx: 36,
    introStartOffsetPx: 310,
    coverageMultiplier: 2.8,
    minPanelCount: 7,
    behindMusicBackground: false
  }
} as const;

export function resolveParallaxAssetTheme(theme: ThemeMode): LayerAssetTheme {
  return theme === 'dark' ? 'light' : 'dark';
}
