import * as THREE from 'three';
import { getRasterizedSvgTextureAsset, getSharedImageAsset, preloadImageAsset } from '../core/browserAssetCache';
import type { ThemeMode } from '../types/content';
import { PARALLAX_LAYER_ORDER, resolveParallaxAssetTheme, type LayerAssetTheme, type LayerCategory } from './ParallaxLayerConfig';

export interface ParallaxLayerVariantAsset {
  category: LayerCategory;
  assetTheme: LayerAssetTheme;
  variant: number;
  url: string;
  texture: THREE.Texture;
  aspectRatio: number;
}

const importedLayerAssets = import.meta.glob(
  [
    '../../assets/images/game/layer/horizon/*.svg',
    '../../assets/images/game/layer/far/*.svg',
    '../../assets/images/game/layer/mid/*.svg',
    '../../assets/images/game/layer/foreground/*.svg'
  ],
  {
    eager: true,
    import: 'default'
  }
) as Record<string, string>;

const PARALLAX_LAYER_ASSET_REGISTRY = (() => {
  const registry = Object.fromEntries(
    PARALLAX_LAYER_ORDER.map((category) => [category, { light: [] as string[], dark: [] as string[] }])
  ) as Record<LayerCategory, Record<LayerAssetTheme, string[]>>;

  Object.entries(importedLayerAssets).forEach(([sourcePath, url]) => {
    const match = sourcePath.match(/\/(horizon|far|mid|foreground)\/\1-(light|dark)-(\d+)\.svg$/);
    if (!match) {
      return;
    }
    const [, category, theme, variantIndex] = match;
    registry[category as LayerCategory]?.[theme as LayerAssetTheme].splice(Number(variantIndex) - 1, 1, url);
  });

  PARALLAX_LAYER_ORDER.forEach((category) => {
    (['light', 'dark'] as const).forEach((theme) => {
      registry[category][theme] = registry[category][theme].filter(Boolean);
    });
  });

  return registry;
})();

const PARALLAX_SOFT_FOCUS_RASTER_SCALE = 0.93;

export async function loadParallaxLayerVariants(
  category: LayerCategory,
  gameTheme: ThemeMode,
  displayedHeightPx: number,
  renderer: THREE.WebGLRenderer
) {
  const assetTheme = resolveParallaxAssetTheme(gameTheme);
  const urls = PARALLAX_LAYER_ASSET_REGISTRY[category][assetTheme];
  const targetHeightPx = Math.max(32, Math.round(displayedHeightPx));
  const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 3));
  const anisotropy = Math.max(1, renderer.capabilities.getMaxAnisotropy?.() ?? 1);

  return Promise.all(
    urls.map(async (url, index): Promise<ParallaxLayerVariantAsset> => {
      const image = getSharedImageAsset(url, { decoding: 'sync' });
      if (!image.complete || image.naturalWidth <= 0) {
        await preloadImageAsset(url, 'sync');
      }
      const resolvedImage = getSharedImageAsset(url, { decoding: 'sync' });
      const width = resolvedImage.naturalWidth || resolvedImage.width || 1;
      const height = resolvedImage.naturalHeight || resolvedImage.height || 1;
      const aspectRatio = width / Math.max(1, height);
      const softenedHeightPx = Math.max(32, Math.round(targetHeightPx * PARALLAX_SOFT_FOCUS_RASTER_SCALE));
      const softenedWidthPx = Math.max(32, Math.round(softenedHeightPx * aspectRatio));
      const texture = await getRasterizedSvgTextureAsset(url, {
        widthPx: softenedWidthPx,
        heightPx: softenedHeightPx,
        devicePixelRatio: dpr,
        colorSpace: THREE.SRGBColorSpace,
        minFilter: THREE.LinearMipmapLinearFilter,
        magFilter: THREE.LinearFilter,
        generateMipmaps: true,
        anisotropy
      });
      return {
        category,
        assetTheme,
        variant: index + 1,
        url,
        texture,
        aspectRatio
      };
    })
  );
}

export async function preloadParallaxLayerAssets() {
  const urls = new Set<string>();
  PARALLAX_LAYER_ORDER.forEach((category) => {
    (['light', 'dark'] as const).forEach((theme) => {
      PARALLAX_LAYER_ASSET_REGISTRY[category][theme].forEach((url) => urls.add(url));
    });
  });
  await Promise.all(Array.from(urls, (url) => preloadImageAsset(url, 'sync')));
}
