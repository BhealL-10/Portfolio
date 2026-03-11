import * as THREE from 'three';
import type { ThemeMode } from '../types/content';

export interface DeformMaterial extends THREE.MeshStandardMaterial {
  userData: THREE.MeshStandardMaterial['userData'] & {
    shaderUniforms?: {
      uTime: { value: number };
      uHover: { value: number };
      uDrag: { value: number };
      uFocus: { value: number };
      uSettled: { value: number };
      uSnap: { value: number };
      uSeed: { value: number };
      uOrbitAngle: { value: number };
      uOrbitPulse: { value: number };
      uWaveDensity: { value: number };
    };
  };
}

export interface FragmentedGeometry extends THREE.BufferGeometry {
  attributes: THREE.BufferGeometry['attributes'] & {
    aFragmentDir?: THREE.BufferAttribute;
    aFragmentPhase?: THREE.BufferAttribute;
  };
}

const themePalette = {
  dark: {
    color: new THREE.Color('#D4BF9B'),
    emissive: new THREE.Color('#D4BF9B')
  },
  light: {
    color: new THREE.Color('#393F4A'),
    emissive: new THREE.Color('#393F4A')
  }
} as const;

export function createDeformMaterial(theme: ThemeMode, seed: number) {
  const material = new THREE.MeshStandardMaterial({
    color: themePalette[theme].color.clone(),
    emissive: themePalette[theme].emissive.clone(),
    emissiveIntensity: 0.12,
    roughness: 0.48,
    metalness: 0.18,
    flatShading: true,
    transparent: true,
    opacity: 1
  }) as DeformMaterial;

  material.onBeforeCompile = (shader) => {
    const uniforms = {
      uTime: { value: 0 },
      uHover: { value: 0 },
      uDrag: { value: 0 },
      uFocus: { value: 0 },
      uSettled: { value: 0 },
      uSnap: { value: 0 },
      uSeed: { value: seed },
      uOrbitAngle: { value: 0 },
      uOrbitPulse: { value: 0 },
      uWaveDensity: { value: 0.72 }
    };

    material.userData.shaderUniforms = uniforms;
    Object.assign(shader.uniforms, uniforms);

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
attribute vec3 aFragmentDir;
attribute float aFragmentPhase;
uniform float uTime;
uniform float uHover;
uniform float uDrag;
uniform float uFocus;
uniform float uSettled;
uniform float uSnap;
uniform float uSeed;
uniform float uOrbitAngle;
uniform float uOrbitPulse;
uniform float uWaveDensity;`
      )
      .replace(
        '#include <begin_vertex>',
        `vec3 transformed = vec3(position);
vec3 fragmentDir = vec3(0.0, 0.0, 1.0);
float fragmentPhase = 0.0;
#ifdef USE_UV
#endif
#ifdef USE_COLOR
#endif
fragmentDir = aFragmentDir;
fragmentPhase = aFragmentPhase;
float baseWave = sin(uTime * 2.4 + position.y * 5.5 + uSeed) * 0.038 * uWaveDensity;
float sideWave = cos(uTime * 1.8 + position.x * 7.0 + uSeed) * 0.022 * uWaveDensity;
float waveAttenuation = (1.0 - uHover * 0.22) * (1.0 - uSettled) * (1.0 - uSnap);
float dragWave = sin(uTime * 4.0 + position.x * 8.0 + uSeed) * 0.06 * uDrag;
float localAngle = atan(position.y, position.x);
float angleDelta = atan(sin(localAngle - uOrbitAngle), cos(localAngle - uOrbitAngle));
float orbitWave = exp(-(angleDelta * angleDelta) / 0.22) * uOrbitPulse * 0.18;
float trailDelta = atan(sin(localAngle - (uOrbitAngle - 0.28)), cos(localAngle - (uOrbitAngle - 0.28)));
orbitWave += exp(-(trailDelta * trailDelta) / 0.55) * uOrbitPulse * 0.08;
float focusFlatten = mix(1.0, 0.08, uFocus);
float shardNoise = fract(sin(fragmentPhase * 37.31 + uSeed) * 43758.5453);
float snapPulse = sin(uTime * 5.4 + fragmentPhase * 11.0) * 0.5 + 0.5;
float radialWave = sin(length(position.xy) * (8.8 + uWaveDensity * 3.2) - uTime * 5.6 + uSeed) * 0.09;
float angularWave = sin(localAngle * (10.0 + uWaveDensity * 5.0) + uTime * 4.9 - uSeed) * 0.08;
float snapWave = (radialWave + angularWave) * uSnap * (0.72 + snapPulse * 0.32);
vec3 swirlAxis = normalize(vec3(-fragmentDir.y, fragmentDir.x, fragmentDir.z + 0.12));
vec3 shardOffset = fragmentDir * (0.008 + shardNoise * 0.02) * uSnap * snapPulse;
shardOffset += swirlAxis * (0.004 + shardNoise * 0.01) * uSnap;
transformed += normal * (((baseWave + sideWave) * waveAttenuation) + dragWave + orbitWave + snapWave) + shardOffset;
transformed.xy *= 1.0 + 0.025 * (1.0 - uSettled) + uDrag * 0.08 + uSnap * 0.028;
transformed.z *= focusFlatten;`
      );
  };

  material.customProgramCacheKey = () => `shard-${seed}`;

  return material;
}

export function setDeformMaterialTheme(material: DeformMaterial, theme: ThemeMode) {
  material.color.copy(themePalette[theme].color);
  material.emissive.copy(themePalette[theme].emissive);
}

export function updateDeformUniforms(
  material: DeformMaterial,
  values: { time: number; hover: number; drag: number; focus: number; settled: number; snap: number; orbitAngle?: number; orbitPulse?: number; waveDensity?: number }
) {
  const uniforms = material.userData.shaderUniforms;
  if (!uniforms) return;
  uniforms.uTime.value = values.time;
  uniforms.uHover.value = values.hover;
  uniforms.uDrag.value = values.drag;
  uniforms.uFocus.value = values.focus;
  uniforms.uSettled.value = values.settled;
  uniforms.uSnap.value = values.snap;
  uniforms.uOrbitAngle.value = values.orbitAngle ?? 0;
  uniforms.uOrbitPulse.value = values.orbitPulse ?? 0;
  uniforms.uWaveDensity.value = values.waveDensity ?? 0.72;
}

export function createFragmentedIcosahedronGeometry(radius: number, detail: number) {
  const geometry = new THREE.IcosahedronGeometry(radius, detail).toNonIndexed() as FragmentedGeometry;
  return decorateFragmentGeometry(geometry);
}

export function createFragmentedTetrahedronGeometry(radius: number, detail: number) {
  const geometry = new THREE.TetrahedronGeometry(radius, detail).toNonIndexed() as FragmentedGeometry;
  return decorateFragmentGeometry(geometry);
}

function decorateFragmentGeometry(geometry: FragmentedGeometry) {
  const position = geometry.getAttribute('position');
  const fragmentDir = new Float32Array(position.count * 3);
  const fragmentPhase = new Float32Array(position.count);

  for (let index = 0; index < position.count; index += 3) {
    const ax = position.getX(index);
    const ay = position.getY(index);
    const az = position.getZ(index);
    const bx = position.getX(index + 1);
    const by = position.getY(index + 1);
    const bz = position.getZ(index + 1);
    const cx = position.getX(index + 2);
    const cy = position.getY(index + 2);
    const cz = position.getZ(index + 2);

    const center = new THREE.Vector3((ax + bx + cx) / 3, (ay + by + cy) / 3, (az + bz + cz) / 3).normalize();
    const phase = (index / 3) * 0.173;

    for (let vertex = 0; vertex < 3; vertex += 1) {
      const offset = (index + vertex) * 3;
      fragmentDir[offset] = center.x;
      fragmentDir[offset + 1] = center.y;
      fragmentDir[offset + 2] = center.z;
      fragmentPhase[index + vertex] = phase;
    }
  }

  geometry.setAttribute('aFragmentDir', new THREE.BufferAttribute(fragmentDir, 3));
  geometry.setAttribute('aFragmentPhase', new THREE.BufferAttribute(fragmentPhase, 1));
  return geometry;
}
