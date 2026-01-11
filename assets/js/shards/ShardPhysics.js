/**
 * ShardPhysics.js - Physique des shards (X/Y uniquement)
 * Portfolio 3D V3.0
 */

import * as THREE from 'three';
import { PHYSICS } from '../config/constants.js';

export class ShardPhysics {
  constructor() {
    this.bounds = {
      minX: -25,
      maxX: 25,
      minY: -18,
      maxY: 18
    };
  }
  
  /**
   * Mise à jour physique - Mouvement spatial lent
   */
  update(shards, deltaTime) {
    shards.forEach(shard => {
      if (shard.userData.isFocused || shard.userData.isDragging) return;
      
      // Attraction vers position orbitale (retour calme)
      this.applyOrbitalAttraction(shard);
      
      // Appliquer vélocité (mouvement spatial lent)
      if (shard.userData.velocity.lengthSq() > 0.0001) {
        shard.position.x += shard.userData.velocity.x * 0.5; // Réduit de moitié
        shard.position.y += shard.userData.velocity.y * 0.5;
        
        // Friction spatiale (très faible)
        shard.userData.velocity.multiplyScalar(0.98); // Au lieu de PHYSICS.FRICTION
        
        // Rebond doux
        this.applyBounce(shard);
      }
    });
    
    // Répulsion douce
    this.applyRepulsion(shards);
  }
  
  /**
   * Attraction vers position orbitale (retour calme)
   */
  applyOrbitalAttraction(shard) {
    const orbitalAngle = shard.userData.orbitAngle;
    const targetX = Math.cos(orbitalAngle) * 8; // Rayon orbital réduit
    const targetY = Math.sin(orbitalAngle) * 6;
    
    const dx = targetX - shard.position.x;
    const dy = targetY - shard.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0.5) {
      // Force d'attraction très douce
      const attractionForce = 0.002;
      shard.userData.velocity.x += (dx / distance) * attractionForce;
      shard.userData.velocity.y += (dy / distance) * attractionForce;
    }
  }
  
  /**
   * Rebond doux sur les bords
   */
  applyBounce(shard) {
    const pos = shard.position;
    const vel = shard.userData.velocity;
    const damping = 0.5; // Rebond très amorti
    
    if (pos.x < this.bounds.minX) {
      pos.x = this.bounds.minX;
      vel.x *= -damping;
    } else if (pos.x > this.bounds.maxX) {
      pos.x = this.bounds.maxX;
      vel.x *= -damping;
    }
    
    if (pos.y < this.bounds.minY) {
      pos.y = this.bounds.minY;
      vel.y *= -damping;
    } else if (pos.y > this.bounds.maxY) {
      pos.y = this.bounds.maxY;
      vel.y *= -damping;
    }
  }
  
  /**
   * Répulsion douce entre shards proches (comme dans l'espace)
   */
  applyRepulsion(shards) {
    for (let i = 0; i < shards.length; i++) {
      for (let j = i + 1; j < shards.length; j++) {
        const shardA = shards[i];
        const shardB = shards[j];
        
        if (shardA.userData.isFocused || shardA.userData.isDragging) continue;
        if (shardB.userData.isFocused || shardB.userData.isDragging) continue;
        
        // Distance 2D
        const dx = shardA.position.x - shardB.position.x;
        const dy = shardA.position.y - shardB.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const repulsionDistance = 8; // Distance de répulsion
        
        if (distance < repulsionDistance && distance > 0.1) {
          // Force très douce (mouvement spatial)
          const force = 0.005 * (1 - distance / repulsionDistance);
          
          const dirX = dx / distance;
          const dirY = dy / distance;
          
          shardA.userData.velocity.x += dirX * force;
          shardA.userData.velocity.y += dirY * force;
          shardB.userData.velocity.x -= dirX * force;
          shardB.userData.velocity.y -= dirY * force;
        }
      }
    }
  }
  
  /**
   * Applique une impulsion (mouvement spatial lent)
   */
  applyImpulse(shard, impulseX, impulseY) {
    // Réduire l'impulsion pour mouvement spatial
    shard.userData.velocity.x += impulseX * 0.3;
    shard.userData.velocity.y += impulseY * 0.3;
    
    // Limiter vélocité max (très basse pour effet spatial)
    const vel = shard.userData.velocity;
    const speed = vel.length();
    const maxSpeed = 0.5; // Vitesse max très réduite
    if (speed > maxSpeed) {
      vel.multiplyScalar(maxSpeed / speed);
    }
  }
  
  /**
   * Vérifie si un shard est en mouvement
   */
  isShardMoving(shard) {
    return shard.userData.velocity && shard.userData.velocity.lengthSq() > 0.01;
  }
  
  /**
   * Met à jour les limites
   */
  updateBounds(width, height) {
    const aspect = width / height;
    this.bounds = {
      minX: -18 * aspect,
      maxX: 18 * aspect,
      minY: -18,
      maxY: 18
    };
  }
}
