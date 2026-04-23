import * as THREE from 'three';
import { recordGameBootDiagnostic } from '../core/gameBootDiagnostics';
import { damp } from '../core/math';
import { getRuntimeViewportSize } from '../core/viewport';
import { getThemeBackgroundHex, getThemeForegroundHex } from '../core/themePalette';
import type { ScreenProjection } from '../game/worldHudProjection';
import type { ThemeMode } from '../types/content';

const PALETTE = {
  dark: {
    background: new THREE.Color(getThemeBackgroundHex('dark'))
  },
  light: {
    background: new THREE.Color(getThemeBackgroundHex('light'))
  }
} as const;

export class WorldRenderer {
  private static readonly MAX_DESKTOP_PIXEL_RATIO = 1.75;
  private static readonly MAX_MOBILE_PIXEL_RATIO = 1.35;
  private static readonly DESKTOP_PIXEL_BUDGET = 3_200_000;
  private static readonly MOBILE_PIXEL_BUDGET = 1_500_000;

  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
  readonly renderer: THREE.WebGLRenderer;

  private readonly cameraTarget = new THREE.Vector3(0, 0.5, 24);
  private readonly cameraCurrent = new THREE.Vector3(0, 0.5, 24);
  private readonly lookTarget = new THREE.Vector3(0, 0, 0);
  private readonly lookCurrent = new THREE.Vector3(0, 0, 0);
  private readonly projectionScratch = new THREE.Vector3();
  private readonly ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
  private readonly keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
  private readonly fillLight = new THREE.DirectionalLight(0xffffff, 0.48);
  private readonly rimLight = new THREE.PointLight(0xffffff, 25, 80, 2);
  private readonly underLight = new THREE.PointLight(0xffffff, 12, 60, 2);
  private readonly resizeObserver: ResizeObserver | null;
  private readonly coarsePointer: boolean;
  private pendingResizeFrame: number | null = null;
  private lastResizeSignature = '';
  private cameraPositionResponse = 8;
  private lookResponse = 8;

  constructor(private readonly host: HTMLElement) {
    this.coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.coarsePointer,
      alpha: true,
      powerPreference: this.coarsePointer ? 'low-power' : 'high-performance'
    });
    this.renderer.domElement.className = 'app-canvas';
    this.renderer.domElement.addEventListener('webglcontextlost', this.handleContextLost as EventListener, false);
    this.renderer.domElement.addEventListener('webglcontextrestored', this.handleContextRestored as EventListener, false);

    this.host.appendChild(this.renderer.domElement);
    recordGameBootDiagnostic('renderer_constructed', {
      coarsePointer: this.coarsePointer,
      antialias: !this.coarsePointer,
      powerPreference: this.coarsePointer ? 'low-power' : 'high-performance'
    });

    this.keyLight.position.set(12, 10, 16);
    this.fillLight.position.set(-10, 6, 10);
    this.rimLight.position.set(0, -6, 22);
    this.underLight.position.set(0, -9, 14);

    this.scene.add(this.ambientLight, this.keyLight, this.fillLight, this.rimLight, this.underLight);

    this.resize();
    this.setTheme('dark');

    window.addEventListener('resize', this.scheduleResize, { passive: true });
    this.resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(() => this.scheduleResize());
    this.resizeObserver?.observe(this.host);
  }

  setTheme(theme: ThemeMode) {
    const palette = PALETTE[theme];
    this.scene.background = null;
    this.renderer.setClearColor(palette.background, 0);
    this.host.style.background = getThemeBackgroundHex(theme);
    this.ambientLight.color.set('#ffffff');
    this.keyLight.color.set(getThemeForegroundHex(theme));
    this.fillLight.color.set(getThemeBackgroundHex(theme));
    this.rimLight.color.set(getThemeForegroundHex(theme));
    this.underLight.color.set(getThemeBackgroundHex(theme));
  }

  setCameraTarget(position: THREE.Vector3, lookAt: THREE.Vector3) {
    this.cameraTarget.copy(position);
    this.lookTarget.copy(lookAt);
  }

  setCameraResponse(positionResponse: number, lookResponse = positionResponse) {
    this.cameraPositionResponse = Math.max(1, positionResponse);
    this.lookResponse = Math.max(1, lookResponse);
  }

  update(deltaTime: number) {
    this.cameraCurrent.x = damp(this.cameraCurrent.x, this.cameraTarget.x, this.cameraPositionResponse, deltaTime);
    this.cameraCurrent.y = damp(this.cameraCurrent.y, this.cameraTarget.y, this.cameraPositionResponse, deltaTime);
    this.cameraCurrent.z = damp(this.cameraCurrent.z, this.cameraTarget.z, this.cameraPositionResponse, deltaTime);

    this.lookCurrent.x = damp(this.lookCurrent.x, this.lookTarget.x, this.lookResponse, deltaTime);
    this.lookCurrent.y = damp(this.lookCurrent.y, this.lookTarget.y, this.lookResponse, deltaTime);
    this.lookCurrent.z = damp(this.lookCurrent.z, this.lookTarget.z, this.lookResponse, deltaTime);

    this.rimLight.position.z = this.cameraCurrent.z - 2;
    this.rimLight.position.x = this.cameraCurrent.x + 1.8;
    this.underLight.position.x = this.cameraCurrent.x - 1.6;
    this.underLight.position.z = this.cameraCurrent.z - 10;
    this.camera.position.copy(this.cameraCurrent);
    this.camera.lookAt(this.lookCurrent);
    this.camera.updateMatrixWorld();
    this.camera.matrixWorldInverse.copy(this.camera.matrixWorld).invert();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  projectWorldToScreen(position: THREE.Vector3): ScreenProjection {
    const projected = this.projectionScratch.copy(position).project(this.camera);
    const viewport = getRuntimeViewportSize();
    return {
      x: ((projected.x + 1) * 0.5) * (this.host.clientWidth || viewport.width),
      y: ((1 - projected.y) * 0.5) * (this.host.clientHeight || viewport.height),
      visible: projected.z >= -1 && projected.z <= 1
    };
  }

  private resize = () => {
    const viewport = getRuntimeViewportSize();
    const width = Math.max(1, this.host.clientWidth || viewport.width);
    const height = Math.max(1, this.host.clientHeight || viewport.height);
    const pixelRatio = this.resolvePixelRatio(width, height);
    const resizeSignature = `${width}:${height}:${pixelRatio.toFixed(3)}`;
    if (resizeSignature === this.lastResizeSignature) {
      return;
    }
    this.lastResizeSignature = resizeSignature;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(width, height, false);
    recordGameBootDiagnostic('renderer_resize', {
      width,
      height,
      pixelRatio: Number(pixelRatio.toFixed(3)),
      coarsePointer: this.coarsePointer
    });
  };

  private readonly scheduleResize = () => {
    if (this.pendingResizeFrame !== null) {
      return;
    }
    this.pendingResizeFrame = window.requestAnimationFrame(() => {
      this.pendingResizeFrame = null;
      this.resize();
    });
  };

  dispose() {
    window.removeEventListener('resize', this.scheduleResize);
    this.resizeObserver?.disconnect();
    if (this.pendingResizeFrame !== null) {
      window.cancelAnimationFrame(this.pendingResizeFrame);
      this.pendingResizeFrame = null;
    }
    this.renderer.domElement.removeEventListener('webglcontextlost', this.handleContextLost as EventListener, false);
    this.renderer.domElement.removeEventListener('webglcontextrestored', this.handleContextRestored as EventListener, false);
    this.renderer.dispose();
  }

  private readonly handleContextLost = (event: Event) => {
    const contextEvent = event as WebGLContextEvent;
    contextEvent.preventDefault();
    recordGameBootDiagnostic('renderer_context_lost', {
      statusMessage: contextEvent.statusMessage || null
    });
  };

  private readonly handleContextRestored = () => {
    recordGameBootDiagnostic('renderer_context_restored');
    this.resize();
  };

  private resolvePixelRatio(width: number, height: number) {
    const devicePixelRatio = Math.max(1, window.devicePixelRatio || 1);
    const coarsePointer = this.coarsePointer || window.matchMedia('(pointer: coarse)').matches;
    const pixelBudget = coarsePointer ? WorldRenderer.MOBILE_PIXEL_BUDGET : WorldRenderer.DESKTOP_PIXEL_BUDGET;
    const budgetRatio = Math.sqrt(pixelBudget / Math.max(1, width * height));
    const maxPixelRatio = coarsePointer ? WorldRenderer.MAX_MOBILE_PIXEL_RATIO : WorldRenderer.MAX_DESKTOP_PIXEL_RATIO;
    return Math.max(1, Math.min(devicePixelRatio, maxPixelRatio, budgetRatio));
  }
}
