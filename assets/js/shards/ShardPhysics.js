/**
 * ShardPhysics.js - Physique des shards
 * Portfolio 3D V2.0
 * 
 * Gère la vélocité, friction, collisions et répulsion
 */

import * as THREE from 'three';
import { PHYSICS } from '../config/constants.js';

export class ShardPhysics {
  constructor() {
    this.bounds = {
      minX: -20,
      maxX: 20,
      minY: -15,
      maxY: 15
    };
  }
  
  /**
   * Mise à jour de la physique pour tous les shards
   */
  update(shards, deltaTime) {
    shards.forEach(shard => {
      if (shard.userData.isDragging || shard.userData.state === 'focus') {
        return;
      }
      
      // Appliquer vélocité
      if (shard.userData.velocity.lengthSq() > 0.0001) {
        this.applyVelocity(shard, shard.userData.velocity);
        
        // Friction
        shard.userData.velocity.multiplyScalar(PHYSICS.FRICTION);
        
        // Rebond sur les bords
        this.applyBounce(shard);
      }
      
      // Retour à la position canonique
      if (shard.userData.isReturning) {
        this.applyReturn(shard);
      }
    });
    
    // Répulsion entre shards proches
    this.applyRepulsion(shards);
  }
  
  /**
   * Applique une vélocité à un shard
   */
  applyVelocity(shard, velocity) {
    // Limiter la vélocité
    if (velocity.length() > PHYSICS.MAX_VELOCITY) {
      velocity.normalize().multiplyScalar(PHYSICS.MAX_VELOCITY);
    }
    
    shard.position.add(velocity);
    shard.userData.velocity.copy(velocity);
  }
  
  /**
   * Applique le rebond sur les bords
   */
  applyBounce(shard) {
    const pos = shard.position;
    const vel = shard.userData.velocity;
    const damping = PHYSICS.BOUNCE.DAMPING;
    
    // Rebond X
    if (pos.x < this.bounds.minX) {
      pos.x = this.bounds.minX;
      vel.x *= -damping;
    } else if (pos.x > this.bounds.maxX) {
      pos.x = this.bounds.maxX;
      vel.x *= -damping;
    }
    
    // Rebond Y
    if (pos.y < this.bounds.minY) {
      pos.y = this.bounds.minY;
      vel.y *= -damping;
    } else if (pos.y > this.bounds.maxY) {
      pos.y = this.bounds.maxY;
      vel.y *= -damping;
    }
  }
  
  /**
   * Retour progressif vers la position canonique
   */
  applyReturn(shard) {
    const canonical = shard.userData.canonicalPosition;
    const direction = canonical.clone().sub(shard.position);
    const distance = direction.length();
    
    if (distance < PHYSICS.RETURN.SNAP_THRESHOLD) {
      shard.position.copy(canonical);
      shard.userData.velocity.set(0, 0, 0);
      shard.userData.isReturning = false;
      return;
    }
    
    // Force de retour proportionnelle à la distance
    direction.normalize().multiplyScalar(PHYSICS.RETURN.STRENGTH * distance);
    shard.userData.velocity.add(direction);
  }
  
  /**
   * Répulsion entre shards proches
   */
  applyRepulsion(shards) {
    for (let i = 0; i < shards.length; i++) {
      for (let j = i + 1; j < shards.length; j++) {
        const shardA = shards[i];
        const shardB = shards[j];
        
        // Skip si l'un est en focus ou drag
        if (shardA.userData.state === 'focus' || shardA.userData.isDragging) continue;
        if (shardB.userData.state === 'focus' || shardB.userData.isDragging) continue;
        
        const distance = shardA.position.distanceTo(shardB.position);
        
        if (distance < PHYSICS.REPULSION.DISTANCE && distance > 0.1) {
          const direction = shardA.position.clone().sub(shardB.position).normalize();
          const force = PHYSICS.REPULSION.STRENGTH * (1 - distance / PHYSICS.REPULSION.DISTANCE);
          
          // Appliquer force aux deux shards
          shardA.userData.velocity.add(direction.clone().multiplyScalar(force));
          shardB.userData.velocity.add(direction.clone().multiplyScalar(-force));
        }
      }
    }
  }
  
  /**
   * Applique une impulsion (pour effet billard)
   */
  applyImpulse(shard, impulse) {
    shard.userData.velocity.add(impulse);
    shard.userData.isReturning = true;
  }
  
  /**
   * Collision entre deux shards (effet billard)
   */
  resolveCollision(shardA, shardB) {
    const posA = shardA.position;
    const posB = shardB.position;
    const velA = shardA.userData.velocity;
    const velB = shardB.userData.velocity;
    
    // Vecteur normal de collision
    const normal = posA.clone().sub(posB).normalize();
    
    // Vélocité relative
    const relativeVel = velA.clone().sub(velB);
    const velAlongNormal = relativeVel.dot(normal);
    
    // Ne pas résoudre si les objets s'éloignent
    if (velAlongNormal > 0) return;
    
    // Coefficient de restitution (élasticité)
    const restitution = 0.8;
    
    // Calculer impulsion scalaire
    const impulseScalar = -(1 + restitution) * velAlongNormal / 2;
    
    // Appliquer impulsion
    const impulse = normal.clone().multiplyScalar(impulseScalar);
    velA.add(impulse);
    velB.sub(impulse);
    
    // Marquer comme en mouvement
    shardA.userData.isReturning = true;
    shardB.userData.isReturning = true;
  }
  
  /**
   * Met à jour les limites (appelé lors du resize)
   */
  updateBounds(width, height) {
    const aspect = width / height;
    this.bounds = {
      minX: -15 * aspect,
      maxX: 15 * aspect,
      minY: -15,
      maxY: 15
    };
  }
}
