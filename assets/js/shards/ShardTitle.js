/**
 * ShardTitle.js - Titres flottants légers pour les shards
 * Portfolio 3D V4.0
 */

import * as THREE from 'three';
import { COLORS } from '../config/constants.js';

const CONFIG = {
  CANVAS_WIDTH: 1024,
  CANVAS_HEIGHT: 256,
  FONT_SIZE: 140,
  BASE_SCALE: 10,
  OFFSET_Z: 5
};

export class ShardTitle {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.sprites = new Map();
    this.shardRefs = new Map();
    this.isDarkMode = document.documentElement.dataset.theme === 'dark';
    this.isVisible = true;
    this.isFocusActive = false;
  }
  
  setTheme(isDark) {
    this.isDarkMode = isDark;
    this.shardRefs.forEach((shard, uuid) => {
      this.recreateSprite(shard);
    });
  }
  
  createTitleSprite(shard) {
    if (!shard?.userData?.projectTitle) return;
    if (this.sprites.has(shard.uuid)) return;
    
    try {
      const sprite = this.buildSprite(shard.userData.projectTitle);
      if (!sprite) return;
      
      this.sprites.set(shard.uuid, sprite);
      this.shardRefs.set(shard.uuid, shard);
      shard.userData.titleSprite = sprite;
      this.scene.add(sprite);
    } catch (e) {
      console.warn('ShardTitle: Failed to create sprite', e);
    }
  }
  
  buildSprite(title) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = CONFIG.CANVAS_WIDTH;
    canvas.height = CONFIG.CANVAS_HEIGHT;
    
    const textColor = COLORS.TITLE_TEXT || '#2d2d2d';
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const fontSize = Math.min(CONFIG.FONT_SIZE, (CONFIG.CANVAS_WIDTH * 0.8) / (title.length * 0.5));
    ctx.font = `900 ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = textColor;
    ctx.fillText(title.toUpperCase(), canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      opacity: 0
    });
    
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(CONFIG.BASE_SCALE, CONFIG.BASE_SCALE * 0.25, 1);
    sprite.renderOrder = 1000;
    
    return sprite;
  }
  
  recreateSprite(shard) {
    const oldSprite = this.sprites.get(shard.uuid);
    if (oldSprite) {
      this.scene.remove(oldSprite);
      oldSprite.material?.map?.dispose();
      oldSprite.material?.dispose();
      this.sprites.delete(shard.uuid);
      shard.userData.titleSprite = null;
    }
    this.createTitleSprite(shard);
  }
  
  updatePosition(shard, isCurrentShard, isFocused) {
    const sprite = shard?.userData?.titleSprite;
    if (!sprite) return;
    
    sprite.position.set(
      shard.position.x,
      shard.position.y,
      shard.position.z + CONFIG.OFFSET_Z
    );
    
    let targetOpacity = 0.85;
    if (!this.isVisible || this.isFocusActive || isFocused || isCurrentShard) {
      targetOpacity = 0;
    }
    
    sprite.material.opacity += (targetOpacity - sprite.material.opacity) * 0.1;
  }
  
  hide() {
    this.isVisible = false;
  }
  
  show() {
    this.isVisible = true;
  }
  
  setFocusActive(isActive) {
    this.isFocusActive = isActive;
  }
  
  dispose() {
    this.sprites.forEach((sprite) => {
      sprite.material?.map?.dispose();
      sprite.material?.dispose();
      this.scene.remove(sprite);
    });
    this.sprites.clear();
    this.shardRefs.clear();
  }
}
