import * as THREE from 'three';
import { isMobileRuntime } from '../core/device';
import { buildGameVisualQuality, type GameVisualQuality } from '../core/gameQuality';
import { getThemeBackgroundHex, getThemeNonShardHex } from '../core/themePalette';
import type { MusicReactiveState } from '../game/GameAudioSystem';
import type { ThemeMode } from '../types/content';

const MOMENTUM_COLORS = {
  themeDark: getThemeNonShardHex('dark'),
  themeLight: getThemeNonShardHex('light'),
  uncommon: '#75AF80',
  cyan: '#8AEBEF',
  rare: '#49BCFF',
  epic: '#8C53B4',
  max: '#FF4545'
} as const;

const WAVE_SEGMENTS = 24;
const WAVE_UPDATE_INTERVAL_SECONDS = isMobileRuntime() ? 1 / 20 : 1 / 30;
const ORB_CENTER = new THREE.Vector3(0, 0, -43);
const ORB_RADIUS = 13.8;
const WAVE_BASE_LENGTH = 22;
const UNIT_Z = new THREE.Vector3(0, 0, 1);
const UNIT_Y = new THREE.Vector3(0, 1, 0);
const UNIT_X = new THREE.Vector3(1, 0, 0);

interface WaveLine {
  phase: number;
  drift: number;
  amplitudeSeed: number;
  radial: THREE.Vector3;
  perpendicular: THREE.Vector3;
  geometry: THREE.BufferGeometry;
  line: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
}

interface OrbShard {
  normal: THREE.Vector3;
  tangent: THREE.Vector3;
  bitangent: THREE.Vector3;
  baseQuaternion: THREE.Quaternion;
  baseScale: THREE.Vector3;
  gap: number;
  phase: number;
  drift: number;
  twist: number;
  melodyDriven: boolean;
}

export class MusicReactiveBackdrop {
  private readonly root = new THREE.Group();
  private readonly material: THREE.MeshBasicMaterial;
  private readonly mesh: THREE.InstancedMesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  private readonly hazeInner: THREE.Sprite;
  private readonly hazeOuter: THREE.Sprite;
  private readonly shards: OrbShard[];
  private readonly waves: WaveLine[];
  private readonly waveGroup: THREE.Group;
  private readonly dummy = new THREE.Object3D();
  private readonly tempPosition = new THREE.Vector3();
  private readonly tempQuaternion = new THREE.Quaternion();
  private readonly tempQuaternionB = new THREE.Quaternion();
  private readonly currentColor = new THREE.Color();
  private readonly targetColor = new THREE.Color();
  private readonly softFocusColor = new THREE.Color();
  private theme: ThemeMode;
  private visualQuality: GameVisualQuality = buildGameVisualQuality('high');
  private visible = false;
  private activeShardCount = 0;
  private activeWaveCount = 0;
  private waveUpdateAccumulator = WAVE_UPDATE_INTERVAL_SECONDS;

  constructor(scene: THREE.Scene, theme: ThemeMode, quality: GameVisualQuality = buildGameVisualQuality('high')) {
    this.theme = theme;
    this.visualQuality = { ...quality };
    this.shards = this.createShards();
    this.softFocusColor.set(resolveBackdropThemeColor(theme));
    this.material = new THREE.MeshBasicMaterial({
      color: resolveBackdropThemeColor(theme),
      transparent: false,
      opacity: 1,
      side: THREE.DoubleSide,
      depthWrite: false,
      toneMapped: false
    });
    this.mesh = new THREE.InstancedMesh(createShardGeometry(), this.material, Math.max(1, this.shards.length));
    this.mesh.count = Math.max(1, this.shards.length);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    this.hazeInner = createHazeSprite(resolveBackdropThemeColor(theme), 0.11);
    this.hazeOuter = createHazeSprite(resolveBackdropThemeColor(theme), 0.076);
    this.hazeInner.position.set(ORB_CENTER.x, ORB_CENTER.y, ORB_CENTER.z - 0.8);
    this.hazeOuter.position.set(ORB_CENTER.x, ORB_CENTER.y, ORB_CENTER.z - 1.7);
    this.hazeInner.renderOrder = -5;
    this.hazeOuter.renderOrder = -6;

    this.waveGroup = new THREE.Group();
    this.waveGroup.renderOrder = -3;
    this.waves = this.createWaveLines(theme);
    this.waves.forEach((wave) => this.waveGroup.add(wave.line));

    this.root.renderOrder = -4;
    this.root.visible = false;
    this.root.add(this.hazeOuter, this.hazeInner);
    this.root.add(this.mesh);
    this.root.add(this.waveGroup);
    scene.add(this.root);

    this.applyMatrices(
      0,
      { active: false, bassIntensity: 0, midIntensity: 0, melodyIntensity: 0, overallEnergy: 0, momentumRatio: 0, difficultyRatio: 0 },
      true
    );
    this.applyQuality();
  }

  setTheme(theme: ThemeMode) {
    this.theme = theme;
    this.currentColor.set(resolveBackdropThemeColor(theme));
    this.targetColor.copy(this.currentColor);
    this.softFocusColor.set(resolveBackdropThemeColor(theme));
    this.material.color.copy(this.currentColor);
    this.hazeInner.material.color.copy(this.currentColor);
    this.hazeOuter.material.color.copy(this.currentColor);
    this.waves.forEach((wave) => {
      wave.line.material.color.copy(this.currentColor);
    });
  }

  setVisible(visible: boolean) {
    const nextVisible = visible && this.isBackdropVisible();
    if (this.visible === nextVisible) {
      return;
    }
    this.visible = nextVisible;
    this.root.visible = nextVisible;
  }

  setVisualQuality(quality: GameVisualQuality) {
    this.visualQuality = { ...quality };
    this.applyQuality();
  }

  update(deltaTime: number, elapsedTime: number, camera: THREE.PerspectiveCamera, reactive: MusicReactiveState) {
    if (!this.visible || !this.visualQuality.showMusicReactiveBackdrop) {
      return;
    }
    this.root.position.copy(camera.position);
    this.root.quaternion.copy(camera.quaternion);
    const spinSpeed = 0.08 + reactive.difficultyRatio * 0.3;
    this.root.rotation.z = elapsedTime * spinSpeed;
    this.root.rotation.x = Math.sin(elapsedTime * (0.18 + reactive.difficultyRatio * 0.16)) * (0.08 + reactive.difficultyRatio * 0.06);
    this.root.rotation.y = Math.cos(elapsedTime * (0.24 + reactive.difficultyRatio * 0.18)) * (0.12 + reactive.difficultyRatio * 0.08);
    if (this.visualQuality.enableGlowEffects) {
      const hazePulse = 0.006 + reactive.overallEnergy * 0.01 + reactive.melodyIntensity * 0.006;
      this.root.scale.set(
        1 + Math.sin(elapsedTime * 0.78) * hazePulse * 0.55,
        1 + Math.cos(elapsedTime * 1.02) * hazePulse,
        1
      );
    } else {
      this.root.scale.set(1, 1, 1);
    }
    this.waveGroup.position.y =
      this.activeWaveCount > 0 ? Math.sin(elapsedTime * 0.92) * (0.06 + reactive.overallEnergy * 0.09) : 0;
    this.waveUpdateAccumulator += deltaTime;
    const updateWaves = this.waveUpdateAccumulator >= WAVE_UPDATE_INTERVAL_SECONDS;
    if (updateWaves) {
      this.waveUpdateAccumulator = 0;
    }
    this.applyMatrices(elapsedTime, reactive, updateWaves);
  }

  private createShards() {
    const shardCount = isMobileRuntime() ? 96 : 144;
    const shards: OrbShard[] = [];
    for (let index = 0; index < shardCount; index += 1) {
      const point = fibonacciSpherePoint(index, shardCount);
      const normal = point.clone().normalize();
      const tangentSeed = Math.abs(normal.dot(UNIT_Y)) > 0.92 ? UNIT_X : UNIT_Y;
      const tangent = new THREE.Vector3().crossVectors(tangentSeed, normal).normalize();
      const bitangent = new THREE.Vector3().crossVectors(normal, tangent).normalize();
      const baseQuaternion = new THREE.Quaternion().setFromUnitVectors(UNIT_Z, normal);
      shards.push({
        normal,
        tangent,
        bitangent,
        baseQuaternion,
        baseScale: new THREE.Vector3(
          THREE.MathUtils.lerp(0.92, 1.42, Math.random()),
          THREE.MathUtils.lerp(0.82, 1.18, Math.random()),
          1
        ),
        gap: THREE.MathUtils.lerp(1.1, 4.2, Math.random()),
        phase: Math.random() * Math.PI * 2,
        drift: THREE.MathUtils.lerp(0.55, 1.65, Math.random()),
        twist: THREE.MathUtils.lerp(-Math.PI, Math.PI, Math.random()),
        melodyDriven: index % 3 === 0
      });
    }
    return shards;
  }

  private createWaveLines(theme: ThemeMode) {
    const waveCount = isMobileRuntime() ? 18 : 28;
    const waves: WaveLine[] = [];
    for (let index = 0; index < waveCount; index += 1) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array((WAVE_SEGMENTS + 1) * 3);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.LineBasicMaterial({
        color: getThemeNonShardHex(theme),
        transparent: true,
        opacity: 0.38,
        depthWrite: false,
        toneMapped: false
      });
      const line = new THREE.Line(geometry, material);
      line.frustumCulled = false;
      line.renderOrder = -3;
      const angle = (index / Math.max(1, waveCount)) * Math.PI * 2;

      waves.push({
        phase: Math.random() * Math.PI * 2,
        drift: THREE.MathUtils.lerp(0.75, 1.45, Math.random()),
        amplitudeSeed: Math.random(),
        radial: new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0),
        perpendicular: new THREE.Vector3(-Math.sin(angle), Math.cos(angle), 0),
        geometry,
        line
      });
    }
    return waves;
  }

  private applyMatrices(elapsedTime: number, reactive: MusicReactiveState, updateWaves: boolean) {
    const bass = reactive.bassIntensity;
    const mid = reactive.midIntensity;
    const melody = reactive.melodyIntensity;
    const energy = reactive.overallEnergy;
    const momentum = THREE.MathUtils.clamp(reactive.momentumRatio, 0, 1);
    const difficulty = THREE.MathUtils.clamp(reactive.difficultyRatio, 0, 1);
    const globalGather = 0.35 + Math.sin(elapsedTime * 0.7) * 0.08 + energy * 0.12 + momentum * 0.3;
    const orbScale = 1 + momentum * 0.38 + difficulty * 0.12;
    const movementBoost = 1 + momentum * 1.25 + difficulty * 0.44;
    resolveMomentumColor(this.targetColor, this.theme, momentum);
    this.targetColor.lerp(this.softFocusColor, 0.24);
    this.currentColor.lerp(this.targetColor, 0.045);
    this.material.color.copy(this.currentColor);
    this.hazeInner.material.color.copy(this.currentColor);
    this.hazeOuter.material.color.copy(this.currentColor);
    if (this.visualQuality.enableGlowEffects) {
      const blurFade = 1 - THREE.MathUtils.smoothstep(momentum, 0.8, 1);
      this.hazeInner.scale.setScalar(35 + momentum * 10 + energy * 4.2);
      this.hazeOuter.scale.setScalar(50 + momentum * 14 + bass * 5.2);
      this.hazeInner.material.opacity = (0.092 + energy * 0.044) * blurFade;
      this.hazeOuter.material.opacity = (0.066 + bass * 0.036) * blurFade;
    } else {
      this.hazeInner.material.opacity = 0;
      this.hazeOuter.material.opacity = 0;
    }

    for (let index = 0; index < this.activeShardCount; index += 1) {
      const shard = this.shards[index]!;
      const primary = shard.melodyDriven ? melody : bass;
      const secondary = shard.melodyDriven ? mid : melody;
      const pulse = Math.sin(elapsedTime * (0.9 + shard.drift * 0.32) + shard.phase);
      const ripple = Math.cos(elapsedTime * (0.55 + shard.drift * 0.18) + shard.phase * 0.7);
      const openAmount = shard.gap * (globalGather + (primary * 0.9 + energy * 0.35 + Math.max(0, pulse) * 0.12) * movementBoost);
      const lateralA = (secondary * 0.75 + mid * 0.18) * pulse * 0.55 * movementBoost;
      const lateralB = (secondary * 0.45 + bass * 0.12) * ripple * 0.38 * movementBoost;

      this.tempPosition.copy(ORB_CENTER);
      this.tempPosition.addScaledVector(shard.normal, ORB_RADIUS * orbScale + openAmount);
      this.tempPosition.addScaledVector(shard.tangent, lateralA);
      this.tempPosition.addScaledVector(shard.bitangent, lateralB);

      this.tempQuaternion.copy(shard.baseQuaternion);
      this.tempQuaternionB.setFromAxisAngle(shard.normal, shard.twist + pulse * 0.18 + secondary * 0.12);
      this.tempQuaternion.multiply(this.tempQuaternionB);
      this.tempQuaternionB.setFromAxisAngle(shard.tangent, ripple * (shard.melodyDriven ? 0.18 : 0.1) + primary * 0.08);
      this.tempQuaternion.multiply(this.tempQuaternionB);

      this.dummy.position.copy(this.tempPosition);
      this.dummy.quaternion.copy(this.tempQuaternion);
      this.dummy.scale.set(
        shard.baseScale.x * (1 + momentum * 0.42 + primary * 0.22 * movementBoost + energy * 0.08),
        shard.baseScale.y * (1 + momentum * 0.28 + primary * 0.18 * movementBoost + Math.abs(pulse) * 0.05),
        1
      );
      this.dummy.updateMatrix();
      this.mesh.setMatrixAt(index, this.dummy.matrix);
    }

    const audioDrive = (bass * 0.42 + mid * 0.55 + melody * 0.75) * 1.5;
    const lineBaseLength = WAVE_BASE_LENGTH + momentum * 12 + energy * 18 + difficulty * 8;
    const lineOpacity = THREE.MathUtils.clamp(0.16 + momentum * 0.31 + energy * 0.1 + (bass + mid + melody) * 0.18, 0.16, 0.84);

    for (let index = 0; index < this.activeWaveCount; index += 1) {
      const wave = this.waves[index]!;
      const pulsate = 0.6 + Math.sin(elapsedTime * (1.6 * wave.drift) + wave.phase) * 0.32;
      const waveLength = lineBaseLength * pulsate + audioDrive * 14 + wave.amplitudeSeed * 5;
      const curvatureBase = (2.6 + momentum * 1.8) * (0.18 + audioDrive * 0.38) * (0.35 + wave.amplitudeSeed * 0.5);

      wave.line.material.opacity = lineOpacity;
      wave.line.material.color.copy(this.currentColor);
      if (!updateWaves) {
        continue;
      }

      const positions = (wave.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
      const radial = wave.radial;
      const perpendicular = wave.perpendicular;

      for (let segment = 0; segment <= WAVE_SEGMENTS; segment += 1) {
        const t = segment / WAVE_SEGMENTS;
        const localLength = t * waveLength;
        const waveMotion = Math.sin(t * Math.PI * 3 + elapsedTime * 5 * wave.drift + wave.phase) * curvatureBase * (0.5 + 0.5 * t);
        const taper = (1 - Math.abs(2 * t - 1)) * 0.8;
        const offset = waveMotion * taper;
        const positionIndex = segment * 3;

        positions[positionIndex] = ORB_CENTER.x + radial.x * (localLength + ORB_RADIUS * 0.25) + perpendicular.x * offset;
        positions[positionIndex + 1] = ORB_CENTER.y + radial.y * (localLength + ORB_RADIUS * 0.25) + perpendicular.y * offset;
        positions[positionIndex + 2] = ORB_CENTER.z;
      }

      wave.geometry.attributes.position.needsUpdate = true;
    }

    this.mesh.instanceMatrix.needsUpdate = true;
  }

  private isBackdropVisible() {
    return this.visualQuality.showMusicReactiveBackdrop && (this.activeShardCount > 0 || this.activeWaveCount > 0 || this.visualQuality.enableGlowEffects);
  }

  private applyQuality() {
    const particlesEnabled = this.visualQuality.showMusicReactiveBackdrop && this.visualQuality.showParticles;
    const wavesEnabled = this.visualQuality.showMusicReactiveBackdrop && this.visualQuality.showDecorativeWaves;
    const glowEnabled = this.visualQuality.showMusicReactiveBackdrop && this.visualQuality.enableGlowEffects;
    this.activeShardCount = particlesEnabled ? this.shards.length : 0;
    this.activeWaveCount = wavesEnabled ? this.waves.length : 0;
    this.mesh.visible = particlesEnabled;
    this.mesh.count = Math.max(1, this.activeShardCount || this.shards.length);
    this.waveGroup.visible = wavesEnabled;
    this.hazeInner.visible = glowEnabled;
    this.hazeOuter.visible = glowEnabled;
    this.waves.forEach((wave, index) => {
      wave.line.visible = index < this.activeWaveCount && wavesEnabled;
    });
    this.visible = this.visible && this.isBackdropVisible();
    this.root.visible = this.visible;
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.material.dispose();

    const innerMaterial = this.hazeInner.material;
    innerMaterial.map?.dispose();
    innerMaterial.dispose();

    const outerMaterial = this.hazeOuter.material;
    outerMaterial.map?.dispose();
    outerMaterial.dispose();

    this.waves.forEach((wave) => {
      wave.geometry.dispose();
      wave.line.material.dispose();
    });

    if (this.root.parent) {
      this.root.parent.remove(this.root);
    }
  }
}

const MOMENTUM_COLOR_STOPS = [
  { at: 0, color: null },
  { at: 0.2, color: MOMENTUM_COLORS.uncommon },
  { at: 0.4, color: MOMENTUM_COLORS.cyan },
  { at: 0.6, color: MOMENTUM_COLORS.rare },
  { at: 0.8, color: MOMENTUM_COLORS.epic },
  { at: 0.99, color: MOMENTUM_COLORS.max },
  { at: 1, color: MOMENTUM_COLORS.max }
] as const;
const MOMENTUM_COLOR_SCRATCH = new THREE.Color();

function resolveMomentumColor(target: THREE.Color, theme: ThemeMode, momentum: number) {
  const clamped = THREE.MathUtils.clamp(momentum, 0, 1);
  for (let index = 1; index < MOMENTUM_COLOR_STOPS.length; index += 1) {
    const previous = MOMENTUM_COLOR_STOPS[index - 1]!;
    const current = MOMENTUM_COLOR_STOPS[index]!;
    if (clamped <= current.at) {
      const blend = THREE.MathUtils.smoothstep((clamped - previous.at) / Math.max(0.0001, current.at - previous.at), 0, 1);
      target.set(previous.color ?? (theme === 'dark' ? MOMENTUM_COLORS.themeDark : MOMENTUM_COLORS.themeLight));
      return target.lerp(MOMENTUM_COLOR_SCRATCH.set(current.color ?? MOMENTUM_COLORS.max), blend);
    }
  }
  return target.set(MOMENTUM_COLORS.max);
}

function resolveBackdropThemeColor(theme: ThemeMode) {
  return theme === 'dark' ? getThemeBackgroundHex('light') : getThemeBackgroundHex('dark');
}

function fibonacciSpherePoint(index: number, count: number) {
  const y = 1 - (index / (count - 1)) * 2;
  const radius = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = Math.PI * (3 - Math.sqrt(5)) * index;
  return new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius);
}

function createShardGeometry() {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array([
    -0.56, 0.04, 0,
    -0.08, 0.52, 0,
    0.58, 0.2, 0,
    0.38, -0.38, 0,
    -0.18, -0.48, 0
  ]);
  const indices = [0, 1, 2, 0, 2, 3, 0, 3, 4];
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createHazeSprite(color: string, opacity: number) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d')!;
  const gradient = context.createRadialGradient(64, 64, 10, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255,255,255,0.72)');
  gradient.addColorStop(0.52, 'rgba(255,255,255,0.16)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: texture,
      color,
      transparent: true,
      opacity,
      depthWrite: false,
      depthTest: false,
      toneMapped: false
    })
  );
}
