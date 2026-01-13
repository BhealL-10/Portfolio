/**
 * ShardTitle.js - Titres flottants V5.0
 * Portfolio 3D - Affichage responsive optimisé
 */

import * as THREE from 'three';
import { COLORS, DEVICE, TYPOGRAPHY, TITLE } from '../config/constants.js';

export class ShardTitle {
  constructor(scene, camera, deviceManager) {
    this.scene = scene;
    this.camera = camera;
    this.deviceManager = deviceManager;
    this.sprites = new Map();
    this.shardRefs = new Map();
    this.isDarkMode = document.documentElement.dataset.theme === 'dark';
    this.isVisible = true;
    this.isFocusActive = false;
  }
  
  getConfig() {
    if (this.deviceManager) {
      const deviceType = this.deviceManager.isMobile ? 'MOBILE' : 
                        (this.deviceManager.isTablet ? 'TABLET' : 'DESKTOP');
      return DEVICE.SHARD_TITLE[deviceType] || DEVICE.SHARD_TITLE.DESKTOP;
    }
    return DEVICE.SHARD_TITLE.DESKTOP;
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
    const config = this.getConfig();
    const canvasWidth = TITLE.CANVAS_WIDTH * 2;
    const canvasHeight = TITLE.CANVAS_HEIGHT * 2;
    const fontSize = config.FONT_SIZE || TITLE.FONT_SIZE;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    const textColor = COLORS.TITLE_TEXT;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const adjustedFontSize = Math.min(fontSize, (canvasWidth * 0.8) / (title.length * 0.5));
    ctx.font = `${TYPOGRAPHY.FONT_WEIGHTS.BOLD} ${adjustedFontSize}px ${TYPOGRAPHY.PRIMARY_FONT}`;
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
    
    const baseScale = config.BASE_SCALE || TITLE.BASE_SCALE;
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(baseScale, baseScale * 0.25, 1);
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
      shard.position.z + TITLE.OFFSET_Z
    );
    
    let targetOpacity = TITLE.OPACITY_IDLE;
    if (!this.isVisible || this.isFocusActive || isFocused || isCurrentShard) {
      targetOpacity = 0;
    }
    
    sprite.material.opacity += (targetOpacity - sprite.material.opacity) * 0.1;
  }
  
  hide() { this.isVisible = false; }
  show() { this.isVisible = true; }
  setFocusActive(isActive) { this.isFocusActive = isActive; }
  
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
