/**
 * ShardLogo.js - Logo flottant pour shards V5.0
 * Portfolio 3D - Affiche le logo SVG selon le thème
 * Visible uniquement en état idle simple, disparaît lors de current/hover/drag/focus/unfocus
 */

import * as THREE from 'three';
import { SHARD_LOGO, DEVICE } from '../config/constants.js';

export class ShardLogo {
  constructor(scene, camera, deviceManager) {
    this.scene = scene;
    this.camera = camera;
    this.deviceManager = deviceManager;
    this.sprites = new Map();
    this.shardRefs = new Map();
    this.isDarkMode = document.documentElement.dataset.theme === 'dark';
    this.isVisible = true;
    this.isFocusActive = false;
    this.texturesLoaded = false;
    
    this.textureCache = {
      dark: null,
      light: null
    };
    
    this.loadTextures();
  }
  
  getConfig() {
    if (this.deviceManager) {
      const deviceType = this.deviceManager.isMobile ? 'MOBILE' : 
                        (this.deviceManager.isTablet ? 'TABLET' : 'DESKTOP');
      return SHARD_LOGO.RESPONSIVE[deviceType] || SHARD_LOGO.RESPONSIVE.DESKTOP;
    }
    return SHARD_LOGO.RESPONSIVE.DESKTOP;
  }
  
  async loadTextures() {
    const loader = new THREE.TextureLoader();
    
    try {
      this.textureCache.dark = await this.loadTexture(loader, SHARD_LOGO.DARK);
      this.textureCache.light = await this.loadTexture(loader, SHARD_LOGO.LIGHT);
      this.texturesLoaded = true;
      console.log('✅ ShardLogo textures loaded');
      
      this.updateAllSprites();
    } catch (e) {
      console.warn('ShardLogo: Failed to load textures', e);
    }
  }
  
  updateAllSprites() {
    this.shardRefs.forEach((shard, uuid) => {
      const sprite = this.sprites.get(uuid);
      if (sprite && sprite.material) {
        const texture = this.isDarkMode ? this.textureCache.dark : this.textureCache.light;
        sprite.material.map = texture;
        sprite.material.needsUpdate = true;
      }
    });
  }
  
  loadTexture(loader, path) {
    return new Promise((resolve, reject) => {
      loader.load(
        path,
        (texture) => {
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.needsUpdate = true;
          resolve(texture);
        },
        undefined,
        reject
      );
    });
  }
  
  setTheme(isDark) {
    this.isDarkMode = isDark;
    this.sprites.forEach((sprite, uuid) => {
      const texture = isDark ? this.textureCache.dark : this.textureCache.light;
      if (texture && sprite.material) {
        sprite.material.map = texture;
        sprite.material.needsUpdate = true;
      }
    });
  }
  
  createLogoSprite(shard) {
    if (this.sprites.has(shard.uuid)) return;
    if (!this.texturesLoaded) return;
    
    try {
      const sprite = this.buildSprite();
      if (!sprite) return;
      
      this.sprites.set(shard.uuid, sprite);
      this.shardRefs.set(shard.uuid, shard);
      shard.userData.logoSprite = sprite;
      this.scene.add(sprite);
    } catch (e) {
      console.warn('ShardLogo: Failed to create sprite', e);
    }
  }
  
  buildSprite() {
    const config = this.getConfig();
    const texture = this.isDarkMode ? this.textureCache.dark : this.textureCache.light;
    
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      opacity: 0
    });
    
    const baseScale = config.BASE_SCALE || SHARD_LOGO.BASE_SCALE;
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(baseScale, baseScale, 1);
    sprite.renderOrder = 1000;
    
    return sprite;
  }
  
  updatePosition(shard, isCurrentShard, isFocused) {
    const sprite = shard?.userData?.logoSprite;
    if (!sprite) return;
    
    sprite.position.copy(shard.position);
    sprite.position.z += SHARD_LOGO.OFFSET_Z;
    
    const config = this.getConfig();
    const baseScale = config.BASE_SCALE || SHARD_LOGO.BASE_SCALE;
    const shardScale = shard.scale.x;
    const logoScale = baseScale * shardScale;
    sprite.scale.set(logoScale, logoScale, 1);
    
    const state = shard.userData.state;
    const isDragging = shard.userData.isDragging;
    const isHovered = state === 'hover';
    const isApproaching = state === 'approaching';
    const isLeaving = state === 'leaving';
    
    let targetOpacity = SHARD_LOGO.OPACITY_IDLE;
    
    if (!this.isVisible || 
        this.isFocusActive || 
        isFocused || 
        isCurrentShard || 
        isDragging || 
        isHovered ||
        isApproaching ||
        isLeaving) {
      targetOpacity = SHARD_LOGO.OPACITY_HIDDEN;
    }
    
    sprite.material.opacity += (targetOpacity - sprite.material.opacity) * SHARD_LOGO.FADE_SPEED;
  }
  
  hide() { this.isVisible = false; }
  show() { this.isVisible = true; }
  setFocusActive(isActive) { this.isFocusActive = isActive; }
  
  dispose() {
    this.sprites.forEach((sprite) => {
      sprite.material?.dispose();
      this.scene.remove(sprite);
    });
    this.sprites.clear();
    this.shardRefs.clear();
    
    if (this.textureCache.dark) this.textureCache.dark.dispose();
    if (this.textureCache.light) this.textureCache.light.dispose();
  }
}
