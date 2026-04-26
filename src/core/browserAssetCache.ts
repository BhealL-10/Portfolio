import * as THREE from 'three';
import { getPerformanceProfile } from './performanceProfile';

interface SharedTextureOptions {
  colorSpace?: THREE.ColorSpace;
  wrapS?: THREE.Wrapping;
  wrapT?: THREE.Wrapping;
  repeatX?: number;
  repeatY?: number;
  minFilter?: THREE.MinificationTextureFilter;
  magFilter?: THREE.MagnificationTextureFilter;
  generateMipmaps?: boolean;
  anisotropy?: number;
}

interface RasterizedSvgTextureOptions extends SharedTextureOptions {
  widthPx: number;
  heightPx: number;
  devicePixelRatio?: number;
}

interface SharedImageEntry {
  image: HTMLImageElement;
  loaded: boolean;
  failed: boolean;
  listeners: Set<() => void>;
}

interface PreloadQueueEntry {
  src: string;
  decoding: HTMLImageElement['decoding'];
  resolve: () => void;
}

const textureLoader = new THREE.TextureLoader();
const textureCache = new Map<string, THREE.Texture>();
const rasterizedTextureCache = new Map<string, Promise<THREE.Texture>>();
const imageCache = new Map<string, SharedImageEntry>();
const imagePreloadPromises = new Map<string, Promise<void>>();
const MAX_RASTERIZED_CANVAS_DIMENSION = 4096;
const preloadQueue: PreloadQueueEntry[] = [];
let activePreloadCount = 0;

function getPreloadConcurrencyLimit() {
  return Math.max(1, getPerformanceProfile().assetPreloadConcurrency);
}

function pumpPreloadQueue() {
  while (activePreloadCount < getPreloadConcurrencyLimit() && preloadQueue.length > 0) {
    const next = preloadQueue.shift();
    if (!next) {
      return;
    }
    activePreloadCount += 1;
    void performImagePreload(next.src, next.decoding).finally(() => {
      activePreloadCount = Math.max(0, activePreloadCount - 1);
      next.resolve();
      pumpPreloadQueue();
    });
  }
}

function enqueueImagePreload(src: string, decoding: HTMLImageElement['decoding']) {
  const queued = imagePreloadPromises.get(src);
  if (queued) {
    return queued;
  }
  const request = new Promise<void>((resolve) => {
    preloadQueue.push({ src, decoding, resolve });
    pumpPreloadQueue();
  }).finally(() => {
    imagePreloadPromises.delete(src);
  });
  imagePreloadPromises.set(src, request);
  return request;
}

function buildTextureCacheKey(src: string, options: SharedTextureOptions) {
  return JSON.stringify([
    src,
    options.colorSpace ?? null,
    options.wrapS ?? null,
    options.wrapT ?? null,
    options.repeatX ?? null,
    options.repeatY ?? null,
    options.minFilter ?? null,
    options.magFilter ?? null,
    options.generateMipmaps ?? null,
    options.anisotropy ?? null
  ]);
}

function applyTextureOptions(texture: THREE.Texture, options: SharedTextureOptions) {
  if (options.colorSpace) {
    texture.colorSpace = options.colorSpace;
  }
  if (options.wrapS !== undefined) {
    texture.wrapS = options.wrapS;
  }
  if (options.wrapT !== undefined) {
    texture.wrapT = options.wrapT;
  }
  if (options.repeatX !== undefined || options.repeatY !== undefined) {
    texture.repeat.set(options.repeatX ?? texture.repeat.x, options.repeatY ?? texture.repeat.y);
  }
  if (options.minFilter !== undefined) {
    texture.minFilter = options.minFilter;
  }
  if (options.magFilter !== undefined) {
    texture.magFilter = options.magFilter;
  }
  if (options.generateMipmaps !== undefined) {
    texture.generateMipmaps = options.generateMipmaps;
  }
  if (options.anisotropy !== undefined) {
    texture.anisotropy = options.anisotropy;
  }
}

export function getSharedTextureAsset(src: string, options: SharedTextureOptions = {}) {
  const cacheKey = buildTextureCacheKey(src, options);
  const cached = textureCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const texture = textureLoader.load(src);
  applyTextureOptions(texture, options);
  textureCache.set(cacheKey, texture);
  return texture;
}

export function getSharedImageAsset(
  src: string,
  options: {
    decoding?: HTMLImageElement['decoding'];
    onLoad?: () => void;
  } = {}
) {
  let entry = imageCache.get(src);
  if (!entry) {
    const image = new Image();
    image.decoding = options.decoding ?? 'async';
    entry = {
      image,
      loaded: false,
      failed: false,
      listeners: new Set()
    };

    const handleLoad = () => {
      entry!.loaded = true;
      entry!.failed = false;
      entry!.listeners.forEach((listener) => listener());
      entry!.listeners.clear();
    };

    const handleError = () => {
      entry!.loaded = false;
      entry!.failed = true;
      entry!.listeners.clear();
    };

    image.addEventListener('load', handleLoad, { once: true });
    image.addEventListener('error', handleError, { once: true });
    image.src = src;

    if (image.complete && image.naturalWidth > 0) {
      entry.loaded = true;
    } else if (image.complete) {
      entry.failed = true;
    }

    imageCache.set(src, entry);
  } else if (options.decoding && entry.image.decoding !== options.decoding) {
    entry.image.decoding = options.decoding;
  }

  if (options.onLoad) {
    if (entry.loaded || (entry.image.complete && entry.image.naturalWidth > 0)) {
      entry.loaded = true;
      entry.failed = false;
      options.onLoad();
    } else {
      entry.listeners.add(options.onLoad);
    }
  }

  return entry.image;
}

function performImagePreload(src: string, decoding: HTMLImageElement['decoding'] = 'async') {
  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      resolve();
    };

    const finishAfterDecode = (image: HTMLImageElement) => {
      if (typeof image.decode !== 'function') {
        finish();
        return;
      }
      image
        .decode()
        .catch(() => {
          // Some mobile browsers reject decode() for already-loadable images.
        })
        .finally(() => finish());
    };

    const image = getSharedImageAsset(src, { decoding });
    if (image.complete && image.naturalWidth > 0) {
      finishAfterDecode(image);
      return;
    }
    image.addEventListener('load', () => finishAfterDecode(image), { once: true });
    image.addEventListener('error', finish, { once: true });
  });
}

export function preloadImageAsset(src: string, decoding: HTMLImageElement['decoding'] = 'async') {
  const image = getSharedImageAsset(src, { decoding });
  if (image.complete && image.naturalWidth > 0) {
    return performImagePreload(src, decoding);
  }
  return enqueueImagePreload(src, decoding);
}

export function isRenderableImageAsset(image: HTMLImageElement | null | undefined): image is HTMLImageElement {
  return Boolean(image && image.complete && image.naturalWidth > 0 && image.naturalHeight > 0);
}

export function drawImageIfReady(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement | null | undefined,
  dx: number,
  dy: number,
  dw: number,
  dh: number
) {
  if (!isRenderableImageAsset(image)) {
    return false;
  }

  try {
    context.drawImage(image, dx, dy, dw, dh);
    return true;
  } catch {
    return false;
  }
}

export function getBrowserAssetCacheStats() {
  let loadedImages = 0;
  let failedImages = 0;
  imageCache.forEach((entry) => {
    if (entry.loaded || (entry.image.complete && entry.image.naturalWidth > 0)) {
      loadedImages += 1;
    } else if (entry.failed) {
      failedImages += 1;
    }
  });
  return {
    cachedTextures: textureCache.size,
    rasterizedTextureRequests: rasterizedTextureCache.size,
    cachedImages: imageCache.size,
    loadedImages,
    failedImages,
    activePreloads: activePreloadCount,
    queuedPreloads: preloadQueue.length,
    pendingPreloadPromises: imagePreloadPromises.size,
    preloadConcurrency: getPreloadConcurrencyLimit()
  };
}

function buildRasterizedTextureCacheKey(src: string, options: RasterizedSvgTextureOptions) {
  return JSON.stringify([
    src,
    Math.max(1, Math.round(options.widthPx)),
    Math.max(1, Math.round(options.heightPx)),
    options.devicePixelRatio ?? null,
    options.colorSpace ?? null,
    options.wrapS ?? null,
    options.wrapT ?? null,
    options.repeatX ?? null,
    options.repeatY ?? null,
    options.minFilter ?? null,
    options.magFilter ?? null,
    options.generateMipmaps ?? null,
    options.anisotropy ?? null
  ]);
}

export function getRasterizedSvgTextureAsset(src: string, options: RasterizedSvgTextureOptions) {
  const cacheKey = buildRasterizedTextureCacheKey(src, options);
  const cached = rasterizedTextureCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const promise = new Promise<THREE.Texture>((resolve) => {
    let settled = false;

    const resolveFallbackTexture = () => {
      if (settled) {
        return;
      }
      settled = true;
      const fallbackTexture = textureLoader.load(src);
      applyTextureOptions(fallbackTexture, options);
      resolve(fallbackTexture);
    };

    const resolveRasterizedTexture = (image: HTMLImageElement) => {
      if (settled) {
        return;
      }
      settled = true;
      const dpr = Math.max(1, options.devicePixelRatio ?? window.devicePixelRatio ?? 1);
      let rasterWidth = Math.max(1, Math.round(options.widthPx * dpr));
      let rasterHeight = Math.max(1, Math.round(options.heightPx * dpr));
      const rasterDimension = Math.max(rasterWidth, rasterHeight);
      if (rasterDimension > MAX_RASTERIZED_CANVAS_DIMENSION) {
        const scale = MAX_RASTERIZED_CANVAS_DIMENSION / rasterDimension;
        rasterWidth = Math.max(1, Math.round(rasterWidth * scale));
        rasterHeight = Math.max(1, Math.round(rasterHeight * scale));
      }
      const canvas = document.createElement('canvas');
      canvas.width = rasterWidth;
      canvas.height = rasterHeight;
      canvas.style.width = `${Math.max(1, Math.round(options.widthPx))}px`;
      canvas.style.height = `${Math.max(1, Math.round(options.heightPx))}px`;
      const context = canvas.getContext('2d');
      if (!context) {
        resolveFallbackTexture();
        return;
      }
      context.clearRect(0, 0, rasterWidth, rasterHeight);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      if (!drawImageIfReady(context, image, 0, 0, rasterWidth, rasterHeight)) {
        resolveFallbackTexture();
        return;
      }
      const texture = new THREE.CanvasTexture(canvas);
      applyTextureOptions(texture, options);
      texture.needsUpdate = true;
      resolve(texture);
    };

    const image = getSharedImageAsset(src, { decoding: 'sync' });
    if (image.complete && image.naturalWidth > 0) {
      resolveRasterizedTexture(image);
      return;
    }

    getSharedImageAsset(src, {
      decoding: 'sync',
      onLoad: () => {
        resolveRasterizedTexture(getSharedImageAsset(src, { decoding: 'sync' }));
      }
    });

    image.addEventListener('error', resolveFallbackTexture, { once: true });
  });

  rasterizedTextureCache.set(cacheKey, promise);
  return promise;
}
