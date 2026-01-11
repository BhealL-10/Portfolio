/**
 * ShardPhysics.js - Physique des shards (X/Y uniquement)
 * Portfolio 3D V4.0
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
  
  update(shards, deltaTime) {
    shards.forEach(shard => {
      if (shard.userData.isFocused || shard.userData.isDragging) return;
      
      this.applyOrbitalAttraction(shard);
      
      if (shard.userData.velocity.lengthSq() > 0.0001) {
        shard.position.x += shard.userData.velocity.x * 0.5;
        shard.position.y += shard.userData.velocity.y * 0.5;
        
        shard.userData.velocity.multiplyScalar(0.98);
        
        this.applyBounce(shard);
      }
    });
    
    this.applyRepulsion(shards);
  }
  
  applyOrbitalAttraction(shard) {
    const orbitalAngle = shard.userData.orbitAngle;
    const targetX = Math.cos(orbitalAngle) * 8;
    const targetY = Math.sin(orbitalAngle) * 6;
    
    const dx = targetX - shard.position.x;
    const dy = targetY - shard.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0.5) {
      const attractionForce = 0.002;
      shard.userData.velocity.x += (dx / distance) * attractionForce;
      shard.userData.velocity.y += (dy / distance) * attractionForce;
    }
  }
  
  applyBounce(shard) {
    const pos = shard.position;
    const vel = shard.userData.velocity;
    const damping = 0.5;
    
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
        
        const repulsionDistance = 8;
        
        if (distance < repulsionDistance && distance > 0.1) {
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
  
  applyImpulse(shard, impulseX, impulseY) {
    shard.userData.velocity.x += impulseX * 0.3;
    shard.userData.velocity.y += impulseY * 0.3;
    
    const vel = shard.userData.velocity;
    const speed = vel.length();
    const maxSpeed = 0.5;
    if (speed > maxSpeed) {
      vel.multiplyScalar(maxSpeed / speed);
    }
  }
  
  isShardMoving(shard) {
    return shard.userData.velocity && shard.userData.velocity.lengthSq() > 0.01;
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
