import * as THREE from 'three';
import { damp } from '../core/math';
import { getThemeBackgroundHex, getThemeForegroundHex } from '../core/themePalette';
import type { ScreenProjection } from '../game/worldHudProjection';
import type { ThemeMode } from '../types/content';

const PALETTE = {
  dark: {
    background: new THREE.Color(getThemeBackgroundHex('dark')),
    foreground: new THREE.Color(getThemeForegroundHex('dark'))
  },
  light: {
    background: new THREE.Color(getThemeBackgroundHex('light')),
    foreground: new THREE.Color(getThemeForegroundHex('light'))
  }
} as const;

export class WorldRenderer {
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
  readonly renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });

  private readonly cameraTarget = new THREE.Vector3(0, 0.5, 24);
  private readonly cameraCurrent = new THREE.Vector3(0, 0.5, 24);
  private readonly lookTarget = new THREE.Vector3(0, 0, 0);
  private readonly lookCurrent = new THREE.Vector3(0, 0, 0);
  private readonly projectionScratch = new THREE.Vector3();
  private readonly ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
  private readonly keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
  private readonly rimLight = new THREE.PointLight(0xffffff, 25, 80, 2);
  private cameraPositionResponse = 8;
  private lookResponse = 8;

  constructor(private readonly host: HTMLElement) {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.domElement.className = 'app-canvas';

    this.host.appendChild(this.renderer.domElement);

    this.keyLight.position.set(12, 10, 16);
    this.rimLight.position.set(0, -6, 22);

    this.scene.add(this.ambientLight, this.keyLight, this.rimLight);

    this.resize();
    this.setTheme('dark');

    window.addEventListener('resize', this.resize);
  }

  setTheme(theme: ThemeMode) {
    const palette = PALETTE[theme];
    this.scene.background = palette.background.clone();
    this.ambientLight.color.copy(palette.foreground);
    this.keyLight.color.copy(palette.foreground);
    this.rimLight.color.copy(palette.foreground);
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
    return {
      x: ((projected.x + 1) * 0.5) * (this.host.clientWidth || window.innerWidth),
      y: ((1 - projected.y) * 0.5) * (this.host.clientHeight || window.innerHeight),
      visible: projected.z >= -1 && projected.z <= 1
    };
  }

  private resize = () => {
    const width = this.host.clientWidth || window.innerWidth;
    const height = this.host.clientHeight || window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  };
}
