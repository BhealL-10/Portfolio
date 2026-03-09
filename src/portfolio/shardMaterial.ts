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
uniform float uSeed;`
      )
      .replace(
        '#include <begin_vertex>',
        `vec3 transformed = vec3(position);
float ripple = sin(uTime * 1.8 + position.y * 5.0 + uSeed) * 0.08 * uHover;
float dragWave = sin(uTime * 3.2 + position.x * 7.0 + uSeed) * 0.15 * uDrag;
float focusFlatten = mix(1.0, 0.08, uFocus);
transformed += normal * (ripple + dragWave);
transformed.xy *= 1.0 + uHover * 0.05 + uDrag * 0.08;
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
  values: { time: number; hover: number; drag: number; focus: number }
) {
  const uniforms = material.userData.shaderUniforms;
  if (!uniforms) return;
  uniforms.uTime.value = values.time;
  uniforms.uHover.value = values.hover;
  uniforms.uDrag.value = values.drag;
  uniforms.uFocus.value = values.focus;
}
