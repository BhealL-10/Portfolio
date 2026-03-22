import * as THREE from 'three';
import type { MusicReactiveState } from '../game/GameAudioSystem';
import type { ThemeMode } from '../types/content';

const THEME_FOREGROUND = {
  dark: '#A5977F',
  light: '#2E3644'
} as const;

const MOMENTUM_COLORS = {
  themeDark: '#A5977F',
  themeLight: '#2E3644',
  uncommon: '#75AF80',
  cyan: '#8AEBEF',
  rare: '#49BCFF',
  epic: '#8C53B4',
  max: '#FF4545'
} as const;

const SHARD_COUNT = 144;
const ORB_CENTER = new THREE.Vector3(0, 0, -43);
const ORB_RADIUS = 13.8;
const UNIT_Z = new THREE.Vector3(0, 0, 1);
const UNIT_Y = new THREE.Vector3(0, 1, 0);
const UNIT_X = new THREE.Vector3(1, 0, 0);

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
  private readonly dummy = new THREE.Object3D();
  private readonly tempPosition = new THREE.Vector3();
  private readonly tempQuaternion = new THREE.Quaternion();
  private readonly tempQuaternionB = new THREE.Quaternion();
  private readonly currentColor = new THREE.Color();
  private readonly targetColor = new THREE.Color();
  private theme: ThemeMode;
  private visible = false;

  constructor(scene: THREE.Scene, theme: ThemeMode) {
    this.theme = theme;
    this.shards = this.createShards();
    this.material = new THREE.MeshBasicMaterial({
      color: THEME_FOREGROUND[theme],
      transparent: false,
      opacity: 1,
      side: THREE.DoubleSide,
      depthWrite: false,
      toneMapped: false
    });
    this.mesh = new THREE.InstancedMesh(createShardGeometry(), this.material, this.shards.length);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    this.hazeInner = createHazeSprite(THEME_FOREGROUND[theme], 0.11);
    this.hazeOuter = createHazeSprite(THEME_FOREGROUND[theme], 0.076);
    this.hazeInner.position.set(ORB_CENTER.x, ORB_CENTER.y, ORB_CENTER.z - 0.8);
    this.hazeOuter.position.set(ORB_CENTER.x, ORB_CENTER.y, ORB_CENTER.z - 1.7);
    this.hazeInner.renderOrder = -5;
    this.hazeOuter.renderOrder = -6;
    this.root.renderOrder = -4;
    this.root.visible = false;
    this.root.add(this.hazeOuter, this.hazeInner);
    this.root.add(this.mesh);
    scene.add(this.root);

    this.applyMatrices(0, { active: false, bassIntensity: 0, midIntensity: 0, melodyIntensity: 0, overallEnergy: 0, momentumRatio: 0, difficultyRatio: 0 });
  }

  setTheme(theme: ThemeMode) {
    this.theme = theme;
    this.currentColor.set(THEME_FOREGROUND[theme]);
    this.targetColor.copy(this.currentColor);
    this.material.color.copy(this.currentColor);
    this.hazeInner.material.color.copy(this.currentColor);
    this.hazeOuter.material.color.copy(this.currentColor);
  }

  setVisible(visible: boolean) {
    if (this.visible === visible) {
      return;
    }
    this.visible = visible;
    this.root.visible = visible;
  }

  update(_deltaTime: number, elapsedTime: number, camera: THREE.PerspectiveCamera, reactive: MusicReactiveState) {
    if (!this.visible) {
      return;
    }
    this.root.position.copy(camera.position);
    this.root.quaternion.copy(camera.quaternion);
    const spinSpeed = 0.08 + reactive.difficultyRatio * 0.3;
    this.root.rotation.z = elapsedTime * spinSpeed;
    this.root.rotation.x = Math.sin(elapsedTime * (0.18 + reactive.difficultyRatio * 0.16)) * (0.08 + reactive.difficultyRatio * 0.06);
    this.root.rotation.y = Math.cos(elapsedTime * (0.24 + reactive.difficultyRatio * 0.18)) * (0.12 + reactive.difficultyRatio * 0.08);
    this.applyMatrices(elapsedTime, reactive);
  }

  private createShards() {
    const shards: OrbShard[] = [];
    for (let index = 0; index < SHARD_COUNT; index += 1) {
      const point = fibonacciSpherePoint(index, SHARD_COUNT);
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

  private applyMatrices(elapsedTime: number, reactive: MusicReactiveState) {
    const bass = reactive.bassIntensity;
    const mid = reactive.midIntensity;
    const melody = reactive.melodyIntensity;
    const energy = reactive.overallEnergy;
    const momentum = THREE.MathUtils.clamp(reactive.momentumRatio, 0, 1);
    const difficulty = THREE.MathUtils.clamp(reactive.difficultyRatio, 0, 1);
    const globalGather = 0.35 + Math.sin(elapsedTime * 0.7) * 0.08 + energy * 0.12 + momentum * 0.3;
    const orbScale = 1 + momentum * 0.38 + difficulty * 0.12;
    const movementBoost = 1 + momentum * 1.25 + difficulty * 0.44;
    this.targetColor.copy(resolveMomentumColor(this.theme, momentum));
    this.currentColor.lerp(this.targetColor, 0.045);
    this.material.color.copy(this.currentColor);
    this.hazeInner.material.color.copy(this.currentColor);
    this.hazeOuter.material.color.copy(this.currentColor);
    const blurFade = 1 - THREE.MathUtils.smoothstep(momentum, 0.8, 1);
    this.hazeInner.scale.setScalar(35 + momentum * 10 + energy * 4.2);
    this.hazeOuter.scale.setScalar(50 + momentum * 14 + bass * 5.2);
    this.hazeInner.material.opacity = (0.08 + energy * 0.04) * blurFade;
    this.hazeOuter.material.opacity = (0.055 + bass * 0.032) * blurFade;

    for (let index = 0; index < this.shards.length; index += 1) {
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

    this.mesh.instanceMatrix.needsUpdate = true;
  }
}

function resolveMomentumColor(theme: ThemeMode, momentum: number) {
  const stops = [
    { at: 0, color: new THREE.Color(theme === 'dark' ? MOMENTUM_COLORS.themeDark : MOMENTUM_COLORS.themeLight) },
    { at: 0.2, color: new THREE.Color(MOMENTUM_COLORS.uncommon) },
    { at: 0.4, color: new THREE.Color(MOMENTUM_COLORS.cyan) },
    { at: 0.6, color: new THREE.Color(MOMENTUM_COLORS.rare) },
    { at: 0.8, color: new THREE.Color(MOMENTUM_COLORS.epic) },
    { at: 0.99, color: new THREE.Color(MOMENTUM_COLORS.max) },
    { at: 1, color: new THREE.Color(MOMENTUM_COLORS.max) }
  ];
  const clamped = THREE.MathUtils.clamp(momentum, 0, 1);
  for (let index = 1; index < stops.length; index += 1) {
    const previous = stops[index - 1]!;
    const current = stops[index]!;
    if (clamped <= current.at) {
      const blend = THREE.MathUtils.smoothstep((clamped - previous.at) / Math.max(0.0001, current.at - previous.at), 0, 1);
      return previous.color.clone().lerp(current.color, blend);
    }
  }
  return stops[stops.length - 1]!.color.clone();
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
