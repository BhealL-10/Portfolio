import * as THREE from 'three';
import type { ThemeMode } from '../types/content';
import type { ParallaxLayerVariantAsset } from './ParallaxLayerAssetResolver';
import { loadParallaxLayerVariants } from './ParallaxLayerAssetResolver';
import type { ParallaxLayerConfig } from './ParallaxLayerConfig';

const PANEL_GEOMETRY = new THREE.PlaneGeometry(1, 1);

interface ParallaxPanelRuntime {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  variantIndex: number;
  widthPx: number;
  heightPx: number;
  baseX: number;
}

export interface ParallaxStripUpdateContext {
  viewportWidthPx: number;
  viewportHeightPx: number;
  bottomScreenY: number;
  displayedHeightPx: number;
  travelOffsetPx: number;
  mirrorMode: boolean;
  verticalFlip?: boolean;
}

export class ParallaxStrip {
  readonly group = new THREE.Group();

  private readonly panels: ParallaxPanelRuntime[] = [];
  private variants: ParallaxLayerVariantAsset[] = [];
  private theme: ThemeMode;
  private visible = false;
  private mirrorMode = false;
  private layoutDirty = true;
  private lastViewportWidthPx = 0;
  private lastViewportHeightPx = 0;
  private lastDisplayedHeightPx = 0;
  private lastTravelOffsetPx = 0;
  private randomState: number;
  private assetSignature = '';
  private assetRefreshRequestId = 0;

  constructor(
    parent: THREE.Object3D,
    private readonly config: ParallaxLayerConfig,
    private readonly renderer: THREE.WebGLRenderer,
    private readonly camera: THREE.PerspectiveCamera,
    initialTheme: ThemeMode
  ) {
    this.theme = initialTheme;
    this.randomState = hashString(config.category);
    this.group.visible = false;
    parent.add(this.group);
  }

  async init(viewportHeightPx: number) {
    await this.ensureAssets(viewportHeightPx);
  }

  setVisible(visible: boolean) {
    if (this.visible === visible) {
      return;
    }
    this.visible = visible;
    this.group.visible = visible;
  }

  setTheme(theme: ThemeMode, viewportHeightPx: number) {
    if (this.theme === theme) {
      return;
    }
    this.theme = theme;
    void this.ensureAssets(viewportHeightPx);
  }

  setMirrorMode(enabled: boolean) {
    if (this.mirrorMode === enabled) {
      return;
    }
    this.mirrorMode = enabled;
    this.panels.forEach((panel) => {
      panel.mesh.scale.x = Math.abs(panel.mesh.scale.x) * (enabled ? -1 : 1);
    });
  }

  resetLayout() {
    this.layoutDirty = true;
    this.lastTravelOffsetPx = 0;
  }

  update(context: ParallaxStripUpdateContext) {
    if (!this.visible) {
      return;
    }

    void this.ensureAssets(context.displayedHeightPx);
    if (this.variants.length === 0) {
      return;
    }

    const viewportChanged =
      Math.abs(context.viewportWidthPx - this.lastViewportWidthPx) > 0.5 ||
      Math.abs(context.viewportHeightPx - this.lastViewportHeightPx) > 0.5 ||
      Math.abs(context.displayedHeightPx - this.lastDisplayedHeightPx) > 0.5;

    if (this.layoutDirty || viewportChanged) {
      this.rebuildPanels(context);
      return;
    }

    this.lastTravelOffsetPx = context.travelOffsetPx;
    this.positionPanels(context);
    this.recyclePanels(context);
  }

  dispose() {
    this.panels.forEach((panel) => {
      panel.mesh.material.dispose();
      this.group.remove(panel.mesh);
    });
    this.panels.length = 0;
    if (this.group.parent) {
      this.group.parent.remove(this.group);
    }
  }

  private async ensureAssets(displayedHeightPx: number) {
    const roundedHeight = Math.max(this.config.minDisplayedHeightPx, Math.round(displayedHeightPx));
    const nextSignature = `${this.theme}:${roundedHeight}`;
    if (nextSignature === this.assetSignature && this.variants.length > 0) {
      return;
    }

    const requestId = ++this.assetRefreshRequestId;
    const variants = await loadParallaxLayerVariants(this.config.category, this.theme, roundedHeight, this.renderer);
    if (requestId !== this.assetRefreshRequestId) {
      return;
    }

    this.assetSignature = nextSignature;
    this.variants = variants;
    this.layoutDirty = true;
  }

  private rebuildPanels(context: ParallaxStripUpdateContext) {
    this.panels.forEach((panel) => {
      panel.mesh.material.dispose();
      this.group.remove(panel.mesh);
    });
    this.panels.length = 0;

    const { totalWidthPx, leftEdgePx } = this.getCoverageBounds(context);
    let cursor = leftEdgePx;
    let previousVariantIndex = -1;

    while (cursor < leftEdgePx + totalWidthPx || this.panels.length < this.config.minPanelCount) {
      const selection = this.pickVariant(previousVariantIndex, context.displayedHeightPx);
      const panel = this.createPanel(selection.variantIndex, selection.widthPx, context.displayedHeightPx);
      panel.baseX = cursor;
      this.panels.push(panel);
      this.group.add(panel.mesh);
      cursor += panel.widthPx;
      previousVariantIndex = selection.variantIndex;
    }

    this.lastViewportWidthPx = context.viewportWidthPx;
    this.lastViewportHeightPx = context.viewportHeightPx;
    this.lastDisplayedHeightPx = context.displayedHeightPx;
    this.lastTravelOffsetPx = context.travelOffsetPx;
    this.layoutDirty = false;
    this.positionPanels(context);
  }

  private recyclePanels(context: ParallaxStripUpdateContext) {
    if (this.panels.length < 2) {
      return;
    }
    const { totalWidthPx } = this.getCoverageBounds(context);
    const leftBoundPx = -totalWidthPx * 0.5;
    const rightBoundPx = totalWidthPx * 0.5;

    while (this.panels.length > 1) {
      const leftmost = this.panels[0]!;
      const leftmostRightPx = leftmost.baseX + this.lastTravelOffsetPx + leftmost.widthPx;
      if (leftmostRightPx >= leftBoundPx) {
        break;
      }
      const recycled = this.panels.shift()!;
      const rightmost = this.panels[this.panels.length - 1]!;
      const selection = this.pickVariant(rightmost.variantIndex, context.displayedHeightPx);
      this.applyVariant(recycled, selection.variantIndex, selection.widthPx, context.displayedHeightPx);
      recycled.baseX = rightmost.baseX + rightmost.widthPx;
      this.panels.push(recycled);
    }

    while (this.panels.length > 1) {
      const rightmost = this.panels[this.panels.length - 1]!;
      const rightmostLeftPx = rightmost.baseX + this.lastTravelOffsetPx;
      if (rightmostLeftPx <= rightBoundPx) {
        break;
      }
      const recycled = this.panels.pop()!;
      const leftmost = this.panels[0]!;
      const selection = this.pickVariant(leftmost.variantIndex, context.displayedHeightPx);
      this.applyVariant(recycled, selection.variantIndex, selection.widthPx, context.displayedHeightPx);
      recycled.baseX = leftmost.baseX - recycled.widthPx;
      this.panels.unshift(recycled);
    }

    this.positionPanels(context);
  }

  private createPanel(variantIndex: number, widthPx: number, heightPx: number) {
    const material = this.createSharedMaterialForVariant(variantIndex);
    const mesh = new THREE.Mesh(PANEL_GEOMETRY, material);
    mesh.renderOrder = this.config.renderOrder;
    mesh.frustumCulled = false;
    return {
      mesh,
      variantIndex,
      widthPx,
      heightPx,
      baseX: 0
    };
  }

  private applyVariant(panel: ParallaxPanelRuntime, variantIndex: number, widthPx: number, heightPx: number) {
    panel.mesh.material.dispose();
    panel.variantIndex = variantIndex;
    panel.widthPx = widthPx;
    panel.heightPx = heightPx;
    panel.mesh.material = this.createSharedMaterialForVariant(variantIndex);
    panel.mesh.renderOrder = this.config.renderOrder;
  }

  private createSharedMaterialForVariant(variantIndex: number) {
    const variant = this.variants[Math.max(0, variantIndex) % this.variants.length]!;
    return new THREE.MeshBasicMaterial({
      map: variant.texture,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      depthTest: false,
      side: THREE.DoubleSide,
      toneMapped: false
    });
  }

  private positionPanels(context: ParallaxStripUpdateContext) {
    const depth = Math.abs(this.config.localZ);
    const unitsPerPixel = this.getUnitsPerPixelAtDepth(depth, context.viewportHeightPx);

    for (const panel of this.panels) {
      const worldWidth = panel.widthPx * unitsPerPixel;
      const worldHeight = panel.heightPx * unitsPerPixel;
      const centerScreenX = panel.baseX + this.lastTravelOffsetPx + panel.widthPx * 0.5;
      const centerScreenY = context.bottomScreenY - panel.heightPx * 0.5;
      const localX = centerScreenX * unitsPerPixel;
      const localY = (context.viewportHeightPx * 0.5 - centerScreenY) * unitsPerPixel;
      panel.mesh.position.set(localX, localY, this.config.localZ);
      panel.mesh.scale.set(this.mirrorMode ? -worldWidth : worldWidth, (context.verticalFlip ? -1 : 1) * worldHeight, 1);
    }
  }

  private pickVariant(excludedVariantIndex: number, heightPx: number) {
    let variantIndex = Math.floor(this.nextRandom() * this.variants.length);
    if (this.variants.length > 1 && variantIndex === excludedVariantIndex) {
      variantIndex = (variantIndex + 1) % this.variants.length;
    }
    const aspectRatio = this.variants[variantIndex]?.aspectRatio ?? 1;
    return {
      variantIndex,
      widthPx: Math.max(12, heightPx * aspectRatio)
    };
  }

  private getCoverageBounds(context: ParallaxStripUpdateContext) {
    const coverageWidthPx = context.viewportWidthPx * this.config.coverageMultiplier;
    const leadPx = Math.max(context.viewportWidthPx * 0.8, context.displayedHeightPx * 3);
    const totalWidthPx = coverageWidthPx + leadPx * 2;
    return {
      totalWidthPx,
      leftEdgePx: -totalWidthPx * 0.5
    };
  }

  private nextRandom() {
    this.randomState = (1664525 * this.randomState + 1013904223) >>> 0;
    return this.randomState / 0x100000000;
  }

  private getUnitsPerPixelAtDepth(depth: number, viewportHeightPx: number) {
    const verticalFov =
      2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(this.camera.fov) * 0.5) / Math.max(0.0001, this.camera.zoom));
    const visibleHeightWorld = 2 * Math.tan(verticalFov * 0.5) * Math.max(0.1, depth);
    return visibleHeightWorld / Math.max(1, viewportHeightPx);
  }
}

function hashString(input: string) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
