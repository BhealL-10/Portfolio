import * as THREE from 'three';
import type { ThemeMode } from '../types/content';

export interface DeformMaterial extends THREE.MeshStandardMaterial {
  userData: THREE.MeshStandardMaterial['userData'] & {
    shaderUniforms?: {
      uTime: { value: number };
      uHover: { value: number };
      uDrag: { value: number };
      uFocus: { value: number };
      uSeed: { value: number };
    };
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
      uSeed: { value: seed }
    };

    material.userData.shaderUniforms = uniforms;
    Object.assign(shader.uniforms, uniforms);

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
uniform float uTime;
uniform float uHover;
uniform float uDrag;
uniform float uFocus;
uniform float uSettled;
uniform float uSeed;`
      )
      .replace(
        '#include <begin_vertex>',
        `vec3 transformed = vec3(position);
float baseWave = sin(uTime * 2.4 + position.y * 5.5 + uSeed) * 0.14;
float sideWave = cos(uTime * 1.8 + position.x * 7.0 + uSeed) * 0.08;
float waveAttenuation = (1.0 - uHover * 0.22) * (1.0 - uSettled);
float dragWave = sin(uTime * 4.0 + position.x * 8.0 + uSeed) * 0.06 * uDrag;
float focusFlatten = mix(1.0, 0.08, uFocus);
transformed += normal * ((baseWave + sideWave) * waveAttenuation + dragWave);
transformed.xy *= 1.0 + 0.04 * (1.0 - uSettled) + uDrag * 0.08;
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
  values: { time: number; hover: number; drag: number; focus: number; settled: number }
) {
  const uniforms = material.userData.shaderUniforms;
  if (!uniforms) return;
  uniforms.uTime.value = values.time;
  uniforms.uHover.value = values.hover;
  uniforms.uDrag.value = values.drag;
  uniforms.uFocus.value = values.focus;
  uniforms.uSettled.value = values.settled;
}
