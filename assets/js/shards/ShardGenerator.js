/**
 * ShardGenerator.js - Génération des shards
 * Portfolio 3D V3.0
 * 
 * - Support 10 shards dynamiques
 * - Configuration boucle infinie
 * - Positionnement optimisé
 */

import * as THREE from 'three';
import { SHARD, THEME } from '../config/constants.js';

export class ShardGenerator {
  constructor() {
    this.isDarkMode = document.documentElement.dataset.theme === 'dark';
    this.generatedCount = 0;
  }
  
  /**
   * Génère un shard à une position Z fixe
   */
  generateShard(project, index) {
    // Géométrie icosaèdre
    const geometry = new THREE.IcosahedronGeometry(
      SHARD.BASE_SCALE,
      SHARD.GEOMETRY_DETAIL
    );
    
    // Matériau
    const theme = this.isDarkMode ? THEME.DARK : THEME.LIGHT;
    const material = new THREE.MeshStandardMaterial({
      color: theme.shardColor,
      roughness: 0.65,
      metalness: 0.35,
      flatShading: true,
      transparent: true,
      opacity: 0,
      emissive: new THREE.Color(theme.emissiveColor),
      emissiveIntensity: SHARD.STATES.IDLE.emissive
    });
    
    const shard = new THREE.Mesh(geometry, material);
    
    // Position Z fixe (commence à Z négatif pour que caméra à Z=30 voit bien le premier shard)
    const fixedZ = (index * SHARD.Z_SPACING) - SHARD.Z_SPACING;
    
    // Position initiale avec offset orbital aléatoire
    const initialOrbitAngle = Math.random() * Math.PI * 2;
    const initialX = Math.cos(initialOrbitAngle) * SHARD.ORBIT.RADIUS_X * 0.5;
    const initialY = Math.sin(initialOrbitAngle) * SHARD.ORBIT.RADIUS_Y * 0.5;
    
    shard.position.set(initialX, initialY, fixedZ);
    
    // Rotation initiale aléatoire
    shard.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );
    
    // UserData
    shard.userData = {
      // Identifiants
      projectId: project.id,
      index: index,
      
      // Facettes
      facettes: project.facettes,
      activeFacette: 0,
      
      // Position Z fixe
      fixedZ: fixedZ,
      
      // Position orbitale
      orbitalCenter: new THREE.Vector3(0, 0, fixedZ),
      
      // Animation
      focusAmount: 0,
      flattenAmount: 0,
      
      // État
      state: 'idle',
      
      // Physique (X/Y)
      velocity: new THREE.Vector2(0, 0),
      isDragging: false,
      
      // Focus
      isFocused: false,
      focusZOffset: 0,
      
      // Orbite
      orbitAngle: initialOrbitAngle,
      orbitSpeed: SHARD.ORBIT.SPEED * (0.7 + Math.random() * SHARD.ORBIT.VARIATION),
      
      // Rotation
      rotationSpeed: {
        x: SHARD.ROTATION.SPEED_X * (0.6 + Math.random() * 0.8),
        y: SHARD.ROTATION.SPEED_Y * (0.6 + Math.random() * 0.8),
        z: SHARD.ROTATION.SPEED_Z * (0.6 + Math.random() * 0.8)
      },
      
      // Scale de base
      baseScale: new THREE.Vector3(
        SHARD.BASE_SCALE,
        SHARD.BASE_SCALE,
        SHARD.BASE_SCALE
      ),
      
      // Pour animations
      originalRotation: null,
      originalPosition: null,
      
      // Boucle infinie
      isWrapped: false,
      wrapOffset: 0
    };
    
    // Appliquer scale initial
    const idleScale = SHARD.STATES.IDLE.scale * SHARD.BASE_SCALE;
    shard.scale.set(idleScale, idleScale, idleScale);
    
    this.generatedCount++;
    
    return shard;
  }
  
  /**
   * Génère tous les shards pour les projets
   */
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
  
  /**
   * Met à jour le thème d'un shard
   */
  updateShardTheme(shard, isDarkMode) {
    const theme = isDarkMode ? THEME.DARK : THEME.LIGHT;
    
    shard.material.color.setHex(theme.shardColor);
    shard.material.emissive.setHex(theme.emissiveColor);
    shard.material.needsUpdate = true;
  }
  
  /**
   * Calcule la distance totale des shards
   */
  getTotalDistance(shardCount) {
    return shardCount * SHARD.Z_SPACING;
  }
  
  /**
   * Dispose d'un shard
   */
  disposeShard(shard) {
    if (shard.geometry) shard.geometry.dispose();
    if (shard.material) shard.material.dispose();
  }
}
