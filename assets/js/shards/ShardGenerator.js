/**
 * ShardGenerator.js - Génération des shards V6.0
 * Portfolio 3D - Génération responsive optimisée avec logos intégrés
 */

import * as THREE from 'three';
import { SHARD, THEME } from '../config/constants.js';

export class ShardGenerator {
  constructor(deviceManager, shardLogo = null) {
    this.deviceManager = deviceManager;
    this.shardLogo = shardLogo;
    this.isDarkMode = document.documentElement.dataset.theme === 'dark';
    this.generatedCount = 0;
  }
  
  getShardConfig() {
    if (this.deviceManager) {
      return this.deviceManager.getShardConfig();
    }
    return SHARD.RESPONSIVE.DESKTOP;
  }
  
  generateShard(project, index) {
    const config = this.getShardConfig();
    const baseScale = config.BASE_SCALE || SHARD.BASE_SCALE;
    const zSpacing = config.Z_SPACING || SHARD.Z_SPACING;
    
    const geometry = new THREE.IcosahedronGeometry(baseScale, SHARD.GEOMETRY_DETAIL);
    
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
    shard.renderOrder = 0;
    
    const fixedZ = (index * zSpacing) - zSpacing;
    const initialOrbitAngle = Math.random() * Math.PI * 2;
    
    const orbitConfig = config.ORBIT || SHARD.ORBIT;
    const radiusX = orbitConfig.RADIUS_X || SHARD.ORBIT.RADIUS_X;
    const radiusY = orbitConfig.RADIUS_Y || SHARD.ORBIT.RADIUS_Y;
    
    const initialOrbitMultiplier = 0.5 + Math.random() * 0.5;
    
    const initialX = Math.cos(initialOrbitAngle) * radiusX * initialOrbitMultiplier;
    const initialY = Math.sin(initialOrbitAngle) * radiusY * initialOrbitMultiplier;
    
    shard.position.set(initialX, initialY, fixedZ);
    
    shard.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );
    
    shard.userData = {
      projectId: project.id,
      projectTitle: project.title,
      index: index,
      
      project: project, // Référence complète du projet pour FocusController
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
      wasRecentlyDragged: false,
      
      isFocused: false,
      focusZOffset: 0,
      
      orbitAngle: initialOrbitAngle,
      orbitSpeed: SHARD.ORBIT.SPEED * (0.5 + Math.random() * 1.0),
      
      rotationSpeed: {
        x: SHARD.ROTATION.SPEED_X * (0.6 + Math.random() * 0.8),
        y: SHARD.ROTATION.SPEED_Y * (0.6 + Math.random() * 0.8),
        z: SHARD.ROTATION.SPEED_Z * (0.6 + Math.random() * 0.8)
      },
      
      baseScale: new THREE.Vector3(baseScale, baseScale, baseScale),
      
      originalRotation: null,
      originalPosition: null,
      originalPositions: null,
      
      isWrapped: false,
      wrapOffset: 0
    };
    
    const idleScale = SHARD.STATES.IDLE.scale * baseScale;
    shard.scale.set(idleScale, idleScale, idleScale);
    
    this.generatedCount++;
    
    return shard;
  }
  
  async generateAllShards(projects, scene) {
    const shards = [];
    
    for (let index = 0; index < projects.length; index++) {
      const project = projects[index];
      const shard = this.generateShard(project, index);
      shards.push(shard);
      scene.add(shard);
      
      // Attacher les logos si ShardLogo est disponible
      if (this.shardLogo) {
        await this.shardLogo.attachLogosToShard(shard);
      }
    }
    
    return shards;
  }
  
  updateShardTheme(shard, isDarkMode) {
    if (shard.userData.isFocused) return;
    
    const theme = isDarkMode ? THEME.DARK : THEME.LIGHT;
    
    shard.material.color.setHex(theme.shardColor);
    shard.material.emissive.setHex(theme.emissiveColor);
    shard.material.needsUpdate = true;
  }
  
  getTotalDistance(shardCount) {
    const config = this.getShardConfig();
    const zSpacing = config.Z_SPACING || SHARD.Z_SPACING;
    return shardCount * zSpacing;
  }
  
  disposeShard(shard) {
    if (shard.geometry) shard.geometry.dispose();
    if (shard.material) shard.material.dispose();
  }
}
