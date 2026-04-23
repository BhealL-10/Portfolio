import * as THREE from 'three';
import { getRasterizedSvgTextureAsset, getSharedImageAsset, preloadImageAsset } from '../core/browserAssetCache';
import { isMobileRuntime } from '../core/device';
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
const PARALLAX_MOBILE_MAX_RASTER_DIMENSION = 1792;
const PARALLAX_DESKTOP_MAX_RASTER_DIMENSION = 4096;

export async function loadParallaxLayerVariants(
  category: LayerCategory,
  gameTheme: ThemeMode,
  displayedHeightPx: number,
  renderer: THREE.WebGLRenderer
) {
  const assetTheme = resolveParallaxAssetTheme(gameTheme);
  const urls = PARALLAX_LAYER_ASSET_REGISTRY[category][assetTheme];
  const targetHeightPx = Math.max(32, Math.round(displayedHeightPx));
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, coarsePointer ? 1.2 : 2.25));
  const anisotropy = Math.max(1, renderer.capabilities.getMaxAnisotropy?.() ?? 1);
  const maxTextureSize = Math.max(1024, renderer.capabilities.maxTextureSize || PARALLAX_DESKTOP_MAX_RASTER_DIMENSION);
  const maxRasterDimension = coarsePointer
    ? Math.min(maxTextureSize, PARALLAX_MOBILE_MAX_RASTER_DIMENSION)
    : Math.min(maxTextureSize, PARALLAX_DESKTOP_MAX_RASTER_DIMENSION);

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
      let softenedHeightPx = Math.max(32, Math.round(targetHeightPx * PARALLAX_SOFT_FOCUS_RASTER_SCALE));
      let softenedWidthPx = Math.max(32, Math.round(softenedHeightPx * aspectRatio));
      const rasterWidthPx = softenedWidthPx * dpr;
      const rasterHeightPx = softenedHeightPx * dpr;
      const overflowRatio = Math.max(rasterWidthPx, rasterHeightPx) / Math.max(1, maxRasterDimension);
      if (overflowRatio > 1) {
        softenedWidthPx = Math.max(32, Math.round(softenedWidthPx / overflowRatio));
        softenedHeightPx = Math.max(32, Math.round(softenedHeightPx / overflowRatio));
      }
      const texture = await getRasterizedSvgTextureAsset(url, {
        widthPx: softenedWidthPx,
        heightPx: softenedHeightPx,
        devicePixelRatio: dpr,
        colorSpace: THREE.SRGBColorSpace,
        minFilter: coarsePointer ? THREE.LinearFilter : THREE.LinearMipmapLinearFilter,
        magFilter: THREE.LinearFilter,
        generateMipmaps: !coarsePointer,
        anisotropy: coarsePointer ? 1 : Math.min(4, anisotropy)
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

export async function preloadParallaxLayerAssets(gameTheme: ThemeMode) {
  const assetTheme = resolveParallaxAssetTheme(gameTheme);
  const urls = new Set<string>();
  PARALLAX_LAYER_ORDER.forEach((category) => {
    PARALLAX_LAYER_ASSET_REGISTRY[category][assetTheme].forEach((url) => urls.add(url));
  });
  const preloadedUrls = Array.from(urls);
  const batchSize = isMobileRuntime() ? 3 : preloadedUrls.length;
  for (let index = 0; index < preloadedUrls.length; index += batchSize) {
    const batch = preloadedUrls.slice(index, index + batchSize);
    await Promise.all(batch.map((url) => preloadImageAsset(url, 'sync')));
    if (isMobileRuntime() && index + batchSize < preloadedUrls.length) {
      await new Promise<void>((resolve) => window.setTimeout(resolve, 24));
    }
  }
}
