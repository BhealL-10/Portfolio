import * as THREE from 'three';
import { getRasterizedSvgTextureAsset, getSharedImageAsset, preloadImageAsset } from '../core/browserAssetCache';
import { isMobileRuntime } from '../core/device';
import type { GameAssetTier } from '../core/gameQuality';
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
const PARALLAX_LOW_RES_RASTER_SCALE = 0.7;
const PARALLAX_MOBILE_MAX_RASTER_DIMENSION = 1408;
const PARALLAX_MOBILE_LOW_RES_MAX_RASTER_DIMENSION = 1024;
const PARALLAX_DESKTOP_MAX_RASTER_DIMENSION = 4096;
const PARALLAX_MOBILE_HEIGHT_BUCKET_PX = 48;
const PARALLAX_DESKTOP_HEIGHT_BUCKET_PX = 32;
const PARALLAX_MOBILE_BATCH_SIZE = 2;

function waitForNextFrame(delayMs = 0) {
  return new Promise<void>((resolve) => {
    window.setTimeout(() => window.requestAnimationFrame(() => resolve()), delayMs);
  });
}

function clampFiniteDimension(value: number, fallback: number) {
  if (!Number.isFinite(value)) {
    return fallback;
  }
  return Math.max(1, Math.round(value));
}

export function normalizeParallaxDisplayedHeight(displayedHeightPx: number, assetTier: GameAssetTier) {
  const baseHeight = clampFiniteDimension(displayedHeightPx, 320);
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const bucketSize = coarsePointer ? PARALLAX_MOBILE_HEIGHT_BUCKET_PX : PARALLAX_DESKTOP_HEIGHT_BUCKET_PX;
  const roundedHeight = Math.round(baseHeight / bucketSize) * bucketSize;
  const tierAdjustedHeight = assetTier === 'low-res' ? Math.round(roundedHeight * 0.82) : roundedHeight;
  return Math.max(96, tierAdjustedHeight);
}

function resolveRasterPlan(
  displayedHeightPx: number,
  assetTier: GameAssetTier,
  renderer: THREE.WebGLRenderer,
  aspectRatio: number
) {
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const quantizedHeight = normalizeParallaxDisplayedHeight(displayedHeightPx, assetTier);
  const softFocusScale = assetTier === 'low-res' ? PARALLAX_LOW_RES_RASTER_SCALE : PARALLAX_SOFT_FOCUS_RASTER_SCALE;
  const targetHeightPx = Math.max(48, Math.round(quantizedHeight * softFocusScale));
  const targetWidthPx = Math.max(48, Math.round(targetHeightPx * Math.max(0.1, aspectRatio)));
  const maxTextureSize = Math.max(1024, renderer.capabilities.maxTextureSize || PARALLAX_DESKTOP_MAX_RASTER_DIMENSION);
  const maxRasterDimension = coarsePointer
    ? Math.min(
        maxTextureSize,
        assetTier === 'low-res' ? PARALLAX_MOBILE_LOW_RES_MAX_RASTER_DIMENSION : PARALLAX_MOBILE_MAX_RASTER_DIMENSION
      )
    : Math.min(maxTextureSize, PARALLAX_DESKTOP_MAX_RASTER_DIMENSION);
  const dprCeiling = coarsePointer ? (assetTier === 'low-res' ? 1 : 1.1) : 2.25;
  const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, dprCeiling));
  let rasterWidthPx = targetWidthPx;
  let rasterHeightPx = targetHeightPx;
  const overflowRatio = Math.max(rasterWidthPx * dpr, rasterHeightPx * dpr) / Math.max(1, maxRasterDimension);
  if (overflowRatio > 1) {
    rasterWidthPx = Math.max(48, Math.round(rasterWidthPx / overflowRatio));
    rasterHeightPx = Math.max(48, Math.round(rasterHeightPx / overflowRatio));
  }
  return {
    rasterWidthPx,
    rasterHeightPx,
    dpr,
    coarsePointer
  };
}

export async function loadParallaxLayerVariants(
  category: LayerCategory,
  gameTheme: ThemeMode,
  displayedHeightPx: number,
  renderer: THREE.WebGLRenderer,
  assetTier: GameAssetTier = 'normal'
) {
  const assetTheme = resolveParallaxAssetTheme(gameTheme);
  const urls = PARALLAX_LAYER_ASSET_REGISTRY[category][assetTheme];
  const anisotropy = Math.max(1, renderer.capabilities.getMaxAnisotropy?.() ?? 1);
  const variants: ParallaxLayerVariantAsset[] = [];
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const batchSize = coarsePointer ? PARALLAX_MOBILE_BATCH_SIZE : urls.length;

  for (let index = 0; index < urls.length; index += batchSize) {
    const batch = urls.slice(index, index + batchSize);
    const batchVariants = await Promise.all(
      batch.map(async (url, batchIndex): Promise<ParallaxLayerVariantAsset> => {
        const image = getSharedImageAsset(url, { decoding: 'sync' });
        if (!image.complete || image.naturalWidth <= 0) {
          await preloadImageAsset(url, 'sync');
        }
        const resolvedImage = getSharedImageAsset(url, { decoding: 'sync' });
        const width = clampFiniteDimension(resolvedImage.naturalWidth || resolvedImage.width || 1, 1);
        const height = clampFiniteDimension(resolvedImage.naturalHeight || resolvedImage.height || 1, 1);
        const aspectRatio = Math.max(0.1, width / Math.max(1, height));
        const rasterPlan = resolveRasterPlan(displayedHeightPx, assetTier, renderer, aspectRatio);
        const texture = await getRasterizedSvgTextureAsset(url, {
          widthPx: rasterPlan.rasterWidthPx,
          heightPx: rasterPlan.rasterHeightPx,
          devicePixelRatio: rasterPlan.dpr,
          colorSpace: THREE.SRGBColorSpace,
          minFilter: rasterPlan.coarsePointer ? THREE.LinearFilter : THREE.LinearMipmapLinearFilter,
          magFilter: THREE.LinearFilter,
          generateMipmaps: !rasterPlan.coarsePointer && assetTier === 'normal',
          anisotropy: rasterPlan.coarsePointer ? 1 : Math.min(4, anisotropy)
        });
        return {
          category,
          assetTheme,
          variant: index + batchIndex + 1,
          url,
          texture,
          aspectRatio
        };
      })
    );
    variants.push(...batchVariants);
    if (coarsePointer && index + batchSize < urls.length) {
      await waitForNextFrame(18);
    }
  }

  return variants;
}

export async function preloadParallaxLayerAssets(gameTheme: ThemeMode, assetTier: GameAssetTier = 'normal') {
  const assetTheme = resolveParallaxAssetTheme(gameTheme);
  const urls = new Set<string>();
  PARALLAX_LAYER_ORDER.forEach((category) => {
    PARALLAX_LAYER_ASSET_REGISTRY[category][assetTheme].forEach((url) => urls.add(url));
  });
  const preloadedUrls = Array.from(urls);
  const batchSize = isMobileRuntime() ? (assetTier === 'low-res' ? 2 : 3) : preloadedUrls.length;
  for (let index = 0; index < preloadedUrls.length; index += batchSize) {
    const batch = preloadedUrls.slice(index, index + batchSize);
    await Promise.all(batch.map((url) => preloadImageAsset(url, 'sync')));
    if (isMobileRuntime() && index + batchSize < preloadedUrls.length) {
      await waitForNextFrame(24);
    }
  }
}
