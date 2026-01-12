/**
 * ShardGenerator.js - Génération des shards
 * Portfolio 3D V4.0
 */

import * as THREE from 'three';
import { SHARD, THEME } from '../config/constants.js';

export class ShardGenerator {
  constructor() {
    this.isDarkMode = document.documentElement.dataset.theme === 'dark';
    this.generatedCount = 0;
  }
  
  generateShard(project, index) {
    const geometry = new THREE.IcosahedronGeometry(
      SHARD.BASE_SCALE,
      SHARD.GEOMETRY_DETAIL
    );
    
    const theme = this.isDarkMode ? THEME.DARK : THEME.LIGHT;
    const material = new THREE.MeshStandardMaterial({
      color: theme.shardColor,
      roughness: 0.65,
      metalness: 0.35,
      flatShading: true,
      transparent: true,
      opacity: 1,
      emissive: new THREE.Color(theme.emissiveColor),
      emissiveIntensity: SHARD.STATES.IDLE.emissive
    });
    
    const shard = new THREE.Mesh(geometry, material);
    
    const fixedZ = (index * SHARD.Z_SPACING) - SHARD.Z_SPACING;
    
    const initialOrbitAngle = Math.random() * Math.PI * 2;
    
    const scrollProgress = 0;
    const shardScrollPosition = index / 10;
    const distanceFromScroll = Math.abs(scrollProgress - shardScrollPosition);
    const baseOrbitMultiplier = 0.3;
    const maxOrbitMultiplier = 3.0;
    const initialOrbitMultiplier = baseOrbitMultiplier + (distanceFromScroll * (maxOrbitMultiplier - baseOrbitMultiplier) * SHARD.ORBIT.DISTANCE_MULTIPLIER);
    
    const initialX = Math.cos(initialOrbitAngle) * SHARD.ORBIT.RADIUS_X * initialOrbitMultiplier;
    const initialY = Math.sin(initialOrbitAngle) * SHARD.ORBIT.RADIUS_Y * initialOrbitMultiplier;
    
    shard.position.set(initialX, initialY, fixedZ);
    
    shard.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );
    
    shard.userData = {
      projectId: project.id,
      index: index,
      
      facettes: project.facettes,
      activeFacette: 0,
      
      fixedZ: fixedZ,
      orbitalCenter: new THREE.Vector3(0, 0, fixedZ),
      
      focusAmount: 0,
      flattenAmount: 0,
      hoverMorphAmount: 0,
      dragMorphAmount: 0,
      
      state: 'idle',
      
      velocity: new THREE.Vector2(0, 0),
      isDragging: false,
      
      isFocused: false,
      focusZOffset: 0,
      
      orbitAngle: initialOrbitAngle,
      orbitSpeed: SHARD.ORBIT.SPEED * (0.7 + Math.random() * SHARD.ORBIT.VARIATION),
      
      rotationSpeed: {
        x: SHARD.ROTATION.SPEED_X * (0.6 + Math.random() * 0.8),
        y: SHARD.ROTATION.SPEED_Y * (0.6 + Math.random() * 0.8),
        z: SHARD.ROTATION.SPEED_Z * (0.6 + Math.random() * 0.8)
      },
      
      baseScale: new THREE.Vector3(
        SHARD.BASE_SCALE,
        SHARD.BASE_SCALE,
        SHARD.BASE_SCALE
      ),
      
      originalRotation: null,
      originalPosition: null,
      originalPositions: null,
      
      isWrapped: false,
      wrapOffset: 0
    };
    
    const idleScale = SHARD.STATES.IDLE.scale * SHARD.BASE_SCALE;
    shard.scale.set(idleScale, idleScale, idleScale);
    
    this.generatedCount++;
    
    return shard;
  }
  
  generateAllShards(projects, scene) {
    const shards = [];
    
    projects.forEach((project, index) => {
      const shard = this.generateShard(project, index);
      shards.push(shard);
      scene.add(shard);
    });
    
    console.log(`✅ Generated ${shards.length} shards`);
    return shards;
  }
  
  updateShardTheme(shard, isDarkMode) {
    if (shard.userData.isFocused) {
      console.log('⏭️ Skipping theme update for focused shard');
      return;
    }
    
    const theme = isDarkMode ? THEME.DARK : THEME.LIGHT;
    
    shard.material.color.setHex(theme.shardColor);
    shard.material.emissive.setHex(theme.emissiveColor);
    shard.material.needsUpdate = true;
  }
  
  getTotalDistance(shardCount) {
    return shardCount * SHARD.Z_SPACING;
  }
  
  disposeShard(shard) {
    if (shard.geometry) shard.geometry.dispose();
    if (shard.material) shard.material.dispose();
  }
}
