/**
 * ShardGenerator.js - Génération des shards 3D
 * Portfolio 3D V2.0
 * 
 * Crée les géométries et matériaux des shards avec support facettes
 */

import * as THREE from 'three';
import { SHARD, THEME, CATEGORIES } from '../config/constants.js';

export class ShardGenerator {
  constructor(isDarkMode = true) {
    this.isDarkMode = isDarkMode;
  }
  
  /**
   * Génère un shard pour un projet
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
      metalness: 0.3,
      roughness: 0.4,
      emissive: new THREE.Color(theme.shardColor),
      emissiveIntensity: SHARD.STATES.IDLE.emissive,
      transparent: true,
      opacity: 1
    });
    
    // Mesh
    const shard = new THREE.Mesh(geometry, material);
    
    // Position initiale
    const position = this.calculateInitialPosition(index);
    shard.position.set(position.x, position.y, position.z);
    
    // Rotation aléatoire
    shard.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );
    
    // UserData enrichi
    shard.userData = {
      // Identifiants
      projectId: project.id,
      index: index,
      
      // Facettes
      facettes: project.facettes,
      activeFacette: 0,
      
      // Position canonique (calculée par scroll)
      canonicalPosition: new THREE.Vector3(position.x, position.y, position.z),
      
      // Animation progress (0-1)
      approachProgress: 0,
      currentProgress: 0,
      departProgress: 0,
      focusAmount: 0,
      
      // États
      state: 'idle', // idle, current, hover, focus, dragged
      isVisible: true,
      
      // Physique
      velocity: new THREE.Vector3(0, 0, 0),
      isDragging: false,
      isReturning: false,
      
      // Orbite
      orbitAngle: Math.random() * Math.PI * 2,
      orbitSpeed: SHARD.ORBIT.SPEED * (0.8 + Math.random() * 0.4),
      
      // Rotation
      rotationSpeed: {
        x: SHARD.ROTATION.SPEED_X * (0.5 + Math.random()),
        y: SHARD.ROTATION.SPEED_Y * (0.5 + Math.random()),
        z: SHARD.ROTATION.SPEED_Z * (0.5 + Math.random())
      },
      
      // Scale de base
      baseScale: new THREE.Vector3(
        SHARD.BASE_SCALE,
        SHARD.BASE_SCALE,
        SHARD.BASE_SCALE
      ),
      
      // Sauvegarde pour animations
      originalPosition: null,
      originalRotation: null
    };
    
    return shard;
  }
  
  /**
   * Calcule la position initiale d'un shard
   */
  calculateInitialPosition(index) {
    const z = -index * SHARD.Z_SPACING;
    
    // Position orbitale initiale
    const angle = (index / 6) * Math.PI * 2;
    const radius = SHARD.ORBIT.BASE_RADIUS_X + index * SHARD.ORBIT.GROWTH_PER_INDEX;
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * SHARD.ORBIT.BASE_RADIUS_Y,
      z: z
    };
  }
  
  /**
   * Met à jour le thème d'un shard
   */
  updateShardTheme(shard, isDarkMode) {
    const theme = isDarkMode ? THEME.DARK : THEME.LIGHT;
    
    shard.material.color.setHex(theme.shardColor);
    shard.material.emissive.setHex(theme.shardColor);
    shard.material.needsUpdate = true;
  }
  
  /**
   * Met à jour la catégorie visuelle (couleur émissive)
   */
  updateShardCategory(shard, category) {
    const categoryConfig = CATEGORIES[category] || CATEGORIES.dev;
    shard.material.emissive.setHex(categoryConfig.color);
  }
}
