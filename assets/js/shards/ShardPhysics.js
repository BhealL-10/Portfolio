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
   * Mise à jour physique
   */
  update(shards, deltaTime) {
    shards.forEach(shard => {
      if (shard.userData.isFocused || shard.userData.isDragging) return;
      
      // Appliquer vélocité
      if (shard.userData.velocity.lengthSq() > 0.0001) {
        shard.position.x += shard.userData.velocity.x;
        shard.position.y += shard.userData.velocity.y;
        
        // Friction
        shard.userData.velocity.multiplyScalar(PHYSICS.FRICTION);
        
        // Rebond
        this.applyBounce(shard);
      }
    });
    
    // Répulsion
    this.applyRepulsion(shards);
  }
  
  /**
   * Rebond sur les bords
   */
  applyBounce(shard) {
    const pos = shard.position;
    const vel = shard.userData.velocity;
    const damping = PHYSICS.BOUNCE.DAMPING;
    
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
   * Répulsion entre shards proches
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
        
        if (distance < PHYSICS.REPULSION.DISTANCE && distance > 0.1) {
          const force = PHYSICS.REPULSION.STRENGTH * (1 - distance / PHYSICS.REPULSION.DISTANCE);
          
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
   * Applique une impulsion
   */
  applyImpulse(shard, impulseX, impulseY) {
    shard.userData.velocity.x += impulseX;
    shard.userData.velocity.y += impulseY;
    
    // Limiter vélocité max
    const vel = shard.userData.velocity;
    const speed = vel.length();
    if (speed > PHYSICS.MAX_VELOCITY) {
      vel.multiplyScalar(PHYSICS.MAX_VELOCITY / speed);
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
