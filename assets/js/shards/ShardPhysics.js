/**
 * ShardPhysics.js - Physique des shards V5.0
 * Portfolio 3D - Retour fluide sans tremblements ni téléportation
 */

import * as THREE from 'three';
import { PHYSICS, SHARD } from '../config/constants.js';

export class ShardPhysics {
  constructor() {
    this.bounds = {
      minX: -25,
      maxX: 25,
      minY: -18,
      maxY: 18
    };
  }
  
  update(shards, deltaTime) {
    shards.forEach(shard => {
      if (shard.userData.isFocused || shard.userData.isDragging) return;
      
      this.applyOrbitalAttraction(shard, deltaTime);
      
      if (shard.userData.velocity.lengthSq() > 0.00001) {
        const velocityScale = Math.min(deltaTime * 60, 1.5);
        shard.position.x += shard.userData.velocity.x * velocityScale;
        shard.position.y += shard.userData.velocity.y * velocityScale;
        
        shard.userData.velocity.multiplyScalar(PHYSICS.FRICTION);
        
        if (shard.userData.velocity.lengthSq() < 0.00001) {
          shard.userData.velocity.set(0, 0);
        }
        
        this.applyBounce(shard);
      }
    });
    
    this.applyRepulsion(shards);
  }
  
  applyOrbitalAttraction(shard, deltaTime) {
    const orbitalAngle = shard.userData.orbitAngle;
    const targetX = Math.cos(orbitalAngle) * SHARD.ORBIT.RADIUS_X;
    const targetY = Math.sin(orbitalAngle) * SHARD.ORBIT.RADIUS_Y;
    
    const dx = targetX - shard.position.x;
    const dy = targetY - shard.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > PHYSICS.ORBITAL.SNAP_DISTANCE) {
      const attractionForce = PHYSICS.ORBITAL.ATTRACTION_BASE * Math.min(distance / 5, PHYSICS.ORBITAL.ATTRACTION_SCALE);
      
      const dirX = dx / distance;
      const dirY = dy / distance;
      
      shard.userData.velocity.x += dirX * attractionForce;
      shard.userData.velocity.y += dirY * attractionForce;
      
      const maxVel = PHYSICS.MAX_VELOCITY;
      const currentVel = shard.userData.velocity.length();
      if (currentVel > maxVel) {
        shard.userData.velocity.multiplyScalar(maxVel / currentVel);
      }
    } else if (distance < PHYSICS.ORBITAL.SNAP_DISTANCE) {
      const snapFactor = SHARD.ORBIT.SMOOTHING;
      shard.position.x += (targetX - shard.position.x) * snapFactor;
      shard.position.y += (targetY - shard.position.y) * snapFactor;
      
      shard.userData.velocity.multiplyScalar(PHYSICS.ORBITAL.SNAP_VELOCITY_FACTOR);
    }
  }
  
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
  
  applyRepulsion(shards) {
    for (let i = 0; i < shards.length; i++) {
      for (let j = i + 1; j < shards.length; j++) {
        const shardA = shards[i];
        const shardB = shards[j];
        
        if (shardA.userData.isFocused || shardA.userData.isDragging) continue;
        if (shardB.userData.isFocused || shardB.userData.isDragging) continue;
        
        const dx = shardA.position.x - shardB.position.x;
        const dy = shardA.position.y - shardB.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const repulsionDistance = PHYSICS.REPULSION.DISTANCE;
        
        if (distance < repulsionDistance && distance > 0.1) {
          const force = PHYSICS.REPULSION.STRENGTH * 0.01 * (1 - distance / repulsionDistance);
          
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
  
  applyImpulse(shard, impulseX, impulseY) {
    const multiplier = 0.15;
    shard.userData.velocity.x += impulseX * multiplier;
    shard.userData.velocity.y += impulseY * multiplier;
    
    const vel = shard.userData.velocity;
    const speed = vel.length();
    const maxSpeed = PHYSICS.MAX_VELOCITY * 0.8;
    if (speed > maxSpeed) {
      vel.multiplyScalar(maxSpeed / speed);
    }
  }
  
  isShardMoving(shard) {
    return shard.userData.velocity && shard.userData.velocity.lengthSq() > 0.001;
  }
  
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
