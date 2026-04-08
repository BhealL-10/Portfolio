import * as THREE from 'three';
import { getSharedImageAsset } from '../core/browserAssetCache';
import type { ThemeMode } from '../types/content';
import { VoronoiRevealField, type VoronoiRevealCell } from './VoronoiRevealField';

const BACKGROUND_ASSETS = {
  dark: new URL('../../assets/images/shared/branding/background/Backgroundlayer-dark.svg', import.meta.url).href,
  light: new URL('../../assets/images/shared/branding/background/Backgroundlayer-light.svg', import.meta.url).href
} as const;

const WORLD_MAX_DIMENSION = 2048;
const MASK_MAX_DIMENSION = 1200;

interface CoverTransform {
  offsetX: number;
  offsetY: number;
  drawWidth: number;
  drawHeight: number;
}

function resolveCanvasScale(width: number, height: number, maxDimension: number) {
  const maxViewportDimension = Math.max(width, height, 1);
  const maxAllowedScale = maxDimension / maxViewportDimension;
  const desiredScale = Math.min(window.devicePixelRatio || 1, 1.25);
  return Math.max(0.1, Math.min(desiredScale, maxAllowedScale));
}

function computeCoverTransform(sourceWidth: number, sourceHeight: number, targetWidth: number, targetHeight: number): CoverTransform {
  const scale = Math.max(targetWidth / Math.max(1, sourceWidth), targetHeight / Math.max(1, sourceHeight));
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  return {
    offsetX: (targetWidth - drawWidth) * 0.5,
    offsetY: (targetHeight - drawHeight) * 0.5,
    drawWidth,
    drawHeight
  };
}

function revealToMaskIntensity(reveal: number) {
  const clamped = THREE.MathUtils.clamp(reveal, 0, 1);
  const eased = clamped * clamped * (3 - 2 * clamped);
  return Math.round(eased * 255);
}

function borderColor(theme: ThemeMode, reveal: number) {
  const alpha = THREE.MathUtils.clamp(reveal * 0.16, 0.035, 0.16);
  return theme === 'dark' ? `rgba(212, 191, 155, ${alpha})` : `rgba(57, 63, 74, ${alpha})`;
}

export class VoronoiRevealSystem {
  readonly field: VoronoiRevealField;
  private readonly overlayScene = new THREE.Scene();
  private readonly overlayCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private readonly worldCanvas = document.createElement('canvas');
  private readonly staticWorldCanvas = document.createElement('canvas');
  private readonly maskCanvas = document.createElement('canvas');
  private readonly worldContext: CanvasRenderingContext2D;
  private readonly staticWorldContext: CanvasRenderingContext2D;
  private readonly maskContext: CanvasRenderingContext2D;
  private readonly worldTexture: THREE.CanvasTexture;
  private readonly maskTexture: THREE.CanvasTexture;
  private readonly material: THREE.MeshBasicMaterial;
  private readonly mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private theme: ThemeMode;
  private enabled = true;
  private viewportWidth = 1;
  private viewportHeight = 1;
  private staticWorldDirty = true;
  private hadVisibleCells = false;
  private backgroundImage: HTMLImageElement | null = null;

  constructor(private readonly viewportHost: HTMLElement, theme: ThemeMode) {
    const worldContext = this.worldCanvas.getContext('2d');
    const staticWorldContext = this.staticWorldCanvas.getContext('2d');
    const maskContext = this.maskCanvas.getContext('2d');
    if (!worldContext || !staticWorldContext || !maskContext) {
      throw new Error('Voronoi reveal canvas contexts are unavailable.');
    }

    this.worldContext = worldContext;
    this.staticWorldContext = staticWorldContext;
    this.maskContext = maskContext;
    this.theme = theme;
    this.field = new VoronoiRevealField(window.innerWidth, window.innerHeight);

    this.worldTexture = new THREE.CanvasTexture(this.worldCanvas);
    this.worldTexture.colorSpace = THREE.SRGBColorSpace;
    this.worldTexture.minFilter = THREE.LinearFilter;
    this.worldTexture.magFilter = THREE.LinearFilter;
    this.worldTexture.generateMipmaps = false;

    this.maskTexture = new THREE.CanvasTexture(this.maskCanvas);
    this.maskTexture.minFilter = THREE.LinearFilter;
    this.maskTexture.magFilter = THREE.LinearFilter;
    this.maskTexture.generateMipmaps = false;

    this.material = new THREE.MeshBasicMaterial({
      map: this.worldTexture,
      alphaMap: this.maskTexture,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      opacity: 1,
      toneMapped: false
    });

    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
    this.mesh.frustumCulled = false;
    this.overlayScene.add(this.mesh);

    this.loadBackgroundImage(theme);
    this.resize();

    window.addEventListener('resize', this.resize);
    window.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', this.handlePointerMove, { passive: true });
    window.addEventListener('pointerout', this.handlePointerOut, { passive: true });
    window.addEventListener('blur', this.handleWindowBlur);
  }

  getCells() {
    return this.field.getCells();
  }

  collectCellsNear(x: number, y: number, radiusPx: number, maxCount?: number) {
    return this.field.collectCellsNear(x, y, radiusPx, maxCount);
  }

  pulseAt(
    x: number,
    y: number,
    options: {
      radiusPx?: number;
      strength?: number;
      durationSeconds?: number;
    } = {}
  ) {
    this.field.pulseAt(x, y, options);
  }

  setTheme(theme: ThemeMode) {
    if (this.theme === theme) {
      return;
    }
    this.theme = theme;
    this.loadBackgroundImage(theme);
    this.staticWorldDirty = true;
  }

  setEnabled(enabled: boolean) {
    if (this.enabled === enabled) {
      return;
    }
    this.enabled = enabled;
    this.field.setEnabled(enabled);
    if (!enabled) {
      this.hadVisibleCells = false;
      this.clearMaskCanvas();
      this.maskTexture.needsUpdate = true;
    } else {
      this.resize();
      this.staticWorldDirty = true;
    }
  }

  update(deltaTime: number) {
    if (!this.enabled) {
      return;
    }

    const nextWidth = this.viewportHost.clientWidth || window.innerWidth;
    const nextHeight = this.viewportHost.clientHeight || window.innerHeight;
    if (nextWidth !== this.viewportWidth || nextHeight !== this.viewportHeight) {
      this.resize();
    }

    this.field.update(deltaTime);
    const activeCells = this.field.getCells().filter((cell) => cell.reveal > 0.001);

    if (activeCells.length === 0 && !this.hadVisibleCells && !this.staticWorldDirty) {
      return;
    }

    if (activeCells.length > 0 || this.staticWorldDirty) {
      this.drawWorldFrame(activeCells);
    }
    this.drawMaskFrame(activeCells);
    this.hadVisibleCells = activeCells.length > 0;
  }

  render(renderer: THREE.WebGLRenderer) {
    if (!this.enabled) {
      return;
    }
    renderer.render(this.overlayScene, this.overlayCamera);
  }

  dispose() {
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerdown', this.handlePointerMove);
    window.removeEventListener('pointerout', this.handlePointerOut);
    window.removeEventListener('blur', this.handleWindowBlur);
    this.material.dispose();
    this.mesh.geometry.dispose();
    this.worldTexture.dispose();
    this.maskTexture.dispose();
  }

  private loadBackgroundImage(theme: ThemeMode) {
    const assetUrl = BACKGROUND_ASSETS[theme];
    this.backgroundImage = getSharedImageAsset(assetUrl, {
      decoding: 'sync',
      onLoad: () => {
        if (this.theme !== theme) {
          return;
        }
        this.backgroundImage = getSharedImageAsset(assetUrl, { decoding: 'sync' });
        this.staticWorldDirty = true;
      }
    });
  }

  private resize = () => {
    this.viewportWidth = this.viewportHost.clientWidth || window.innerWidth;
    this.viewportHeight = this.viewportHost.clientHeight || window.innerHeight;

    this.field.resize(this.viewportWidth, this.viewportHeight);

    const worldScale = resolveCanvasScale(this.viewportWidth, this.viewportHeight, WORLD_MAX_DIMENSION);
    const maskScale = resolveCanvasScale(this.viewportWidth, this.viewportHeight, MASK_MAX_DIMENSION);
    this.resizeCanvas(this.worldCanvas, this.worldContext, worldScale);
    this.resizeCanvas(this.staticWorldCanvas, this.staticWorldContext, worldScale);
    this.resizeCanvas(this.maskCanvas, this.maskContext, maskScale);
    this.staticWorldDirty = true;
    this.hadVisibleCells = false;
    this.clearMaskCanvas();
    this.worldTexture.needsUpdate = true;
    this.maskTexture.needsUpdate = true;
  };

  private resizeCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, scale: number) {
    const width = Math.max(1, Math.round(this.viewportWidth * scale));
    const height = Math.max(1, Math.round(this.viewportHeight * scale));
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${this.viewportWidth}px`;
    canvas.style.height = `${this.viewportHeight}px`;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
  }

  private drawWorldFrame(activeCells: readonly VoronoiRevealCell[]) {
    if (this.staticWorldDirty) {
      this.drawStaticWorld();
    }

    const { worldCanvas, staticWorldCanvas, worldContext } = this;
    worldContext.clearRect(0, 0, worldCanvas.width, worldCanvas.height);
    worldContext.drawImage(staticWorldCanvas, 0, 0);

    if (activeCells.length > 0) {
      const scaleX = worldCanvas.width / Math.max(1, this.viewportWidth);
      const scaleY = worldCanvas.height / Math.max(1, this.viewportHeight);
      worldContext.lineJoin = 'round';
      worldContext.lineCap = 'round';
      activeCells.forEach((cell) => this.strokeCellBorder(worldContext, cell, scaleX, scaleY));
    }

    this.worldTexture.needsUpdate = true;
  }

  private drawStaticWorld() {
    const { staticWorldCanvas, staticWorldContext } = this;
    staticWorldContext.clearRect(0, 0, staticWorldCanvas.width, staticWorldCanvas.height);

    if (this.backgroundImage && this.backgroundImage.complete && this.backgroundImage.naturalWidth > 0) {
      const sourceWidth = this.backgroundImage.naturalWidth || 2048;
      const sourceHeight = this.backgroundImage.naturalHeight || 1024;
      const cover = computeCoverTransform(sourceWidth, sourceHeight, staticWorldCanvas.width, staticWorldCanvas.height);
      staticWorldContext.drawImage(this.backgroundImage, cover.offsetX, cover.offsetY, cover.drawWidth, cover.drawHeight);
    } else {
      staticWorldContext.fillStyle = this.theme === 'dark' ? '#10151d' : '#d5ccb9';
      staticWorldContext.fillRect(0, 0, staticWorldCanvas.width, staticWorldCanvas.height);
    }

    this.staticWorldDirty = false;
  }

  private strokeCellBorder(
    context: CanvasRenderingContext2D,
    cell: VoronoiRevealCell,
    scaleX: number,
    scaleY: number
  ) {
    context.beginPath();
    cell.points.forEach((point, index) => {
      const x = point.x * scaleX;
      const y = point.y * scaleY;
      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.closePath();
    context.strokeStyle = borderColor(this.theme, cell.reveal);
    context.lineWidth = Math.max(1, Math.min(scaleX, scaleY));
    context.stroke();
  }

  private drawMaskFrame(activeCells: readonly VoronoiRevealCell[]) {
    const scaleX = this.maskCanvas.width / Math.max(1, this.viewportWidth);
    const scaleY = this.maskCanvas.height / Math.max(1, this.viewportHeight);

    this.clearMaskCanvas();

    activeCells.forEach((cell) => {
      const intensity = revealToMaskIntensity(cell.reveal);
      this.maskContext.beginPath();
      cell.points.forEach((point, index) => {
        const x = point.x * scaleX;
        const y = point.y * scaleY;
        if (index === 0) {
          this.maskContext.moveTo(x, y);
        } else {
          this.maskContext.lineTo(x, y);
        }
      });
      this.maskContext.closePath();
      this.maskContext.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;
      this.maskContext.fill();
    });

    this.maskTexture.needsUpdate = true;
  }

  private clearMaskCanvas() {
    this.maskContext.setTransform(1, 0, 0, 1, 0, 0);
    this.maskContext.clearRect(0, 0, this.maskCanvas.width, this.maskCanvas.height);
    this.maskContext.fillStyle = 'rgb(0, 0, 0)';
    this.maskContext.fillRect(0, 0, this.maskCanvas.width, this.maskCanvas.height);
  }

  private handlePointerMove = (event: PointerEvent) => {
    if (!this.enabled) {
      return;
    }
    this.field.setPointer(event.clientX, event.clientY);
  };

  private handlePointerOut = (event: PointerEvent) => {
    if (!this.enabled) {
      return;
    }
    if (event.relatedTarget === null) {
      this.field.clearPointer();
    }
  };

  private handleWindowBlur = () => {
    this.field.clearPointer();
  };
}
