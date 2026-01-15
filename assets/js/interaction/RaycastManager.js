/**
 * RaycastManager.js - Gestion du raycasting V5.0
 * Portfolio 3D - Interactions responsive optimisées
 */

import * as THREE from 'three';

export class RaycastManager {
  constructor(camera, deviceManager = null) {
    this.camera = camera;
    this.deviceManager = deviceManager;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.shards = [];
    
    this.onShardHover = null;
    this.onShardClick = null;
    this.onShardClickLeft = null;
    this.onShardClickRight = null;
    this.onShardClickInFocus = null;
    this.onShardDragStart = null;
    this.onShardDrag = null;
    this.onShardDragEnd = null;
    this.onShardDragFocus = null;
    this.onShardDragStartFocus = null;
    this.onShardDragEndFocus = null;
    this.onBackgroundClick = null;
    
    this.isDragging = false;
    this.draggedShard = null;
    this.dragStartTime = 0;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.dragThreshold = 200;
    this.potentialDragShard = null;
    this.touchMoveDetected = false;
    this.isVerticalScroll = false;
    this.getDragThreshold();
    this.dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    
    this.lastHoveredShard = null;
    
    this.setupListeners();
  }
  
  getDragThreshold() {
    if (!this.deviceManager) return 150;
    
    const deviceType = this.deviceManager.deviceType;
    
    if (deviceType.includes('MOBILE')) return 200;
    if (deviceType.includes('TABLET')) return 180;
    return 150;
  }
  
  setShards(shards) {
    this.shards = shards;
  }
  
  isInteractiveElement(target) {
    if (!target) return false;
    
    const interactiveSelectors = [
      '.manual-unfocus-btn',
      '.slideshow-arrow',
      '.slideshow-arrow-left',
      '.slideshow-arrow-right',
      '.facette-prev',
      '.facette-next',
      '.shard-image-grid',
      '.slideshow-wrapper',
      '.shard-long-description-container',
      '.shard-info-content',
      '.theme-toggle'
    ];
    
    for (const selector of interactiveSelectors) {
      if (target.classList.contains(selector.substring(1)) || target.closest(selector)) {
        return true;
      }
    }
    
    return false;
  }
  
  setupListeners() {
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('mousedown', (e) => this.onMouseDown(e));
    window.addEventListener('mouseup', (e) => this.onMouseUp(e));
    
    // Ne PAS utiliser passive pour pouvoir appeler preventDefault() quand nécessaire
    window.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });
    window.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
    window.addEventListener('touchend', (e) => this.onTouchEnd(e), { passive: false });
  }
  
  updateMouse(clientX, clientY) {
    this.mouse.x = (clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(clientY / window.innerHeight) * 2 + 1;
    this.lastClickX = clientX;
    this.lastClickY = clientY;
  }
  
  raycast() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.shards, true);
    
    for (const intersect of intersects) {
      if (intersect.object.userData.isLogoPlane) continue;
      
      const shard = intersect.object.parent?.isMesh ? intersect.object.parent : intersect.object;
      return { ...intersect, object: shard };
    }
    
    return null;
  }
  
  getWorldPosition() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const target = new THREE.Vector3();
    this.raycaster.ray.intersectPlane(this.dragPlane, target);
    return target;
  }
  
  onMouseMove(event) {
    const mirrorCanvas = document.getElementById('mirror-canvas');
    if (mirrorCanvas && mirrorCanvas.style.display !== 'none') return;
    
    this.updateMouse(event.clientX, event.clientY);
    
    if (this.isDragging && this.draggedShard) {
      const worldPos = this.getWorldPosition();
      const deltaX = event.clientX - this.dragStartX;
      
      if (this.draggedShard.userData.isFocused && this.onShardDragFocus) {
        this.onShardDragFocus(this.draggedShard, deltaX);
      } else if (this.onShardDrag) {
        this.onShardDrag(this.draggedShard, worldPos);
      }
    } else {
      const intersect = this.raycast();
      
      if (intersect) {
        if (this.lastHoveredShard !== intersect.object) {
          if (this.onShardHover) this.onShardHover(intersect.object);
          this.lastHoveredShard = intersect.object;
        }
      } else {
        if (this.lastHoveredShard && this.onShardHover) this.onShardHover(null);
        this.lastHoveredShard = null;
      }
    }
  }
  
  onMouseDown(event) {
    if (event.button !== 0) return;
    
    const mirrorCanvas = document.getElementById('mirror-canvas');
    if (mirrorCanvas && mirrorCanvas.style.display !== 'none') return;
    
    this.updateMouse(event.clientX, event.clientY);
    const intersect = this.raycast();
    
    if (intersect) {
      this.dragStartTime = Date.now();
      this.dragStartX = event.clientX;
      this.dragStartY = event.clientY;
      this.startDrag(intersect.object);
    }
  }
  
  onMouseUp(event) {
    if (event.button !== 0) return;
    
    const mirrorCanvas = document.getElementById('mirror-canvas');
    if (mirrorCanvas && mirrorCanvas.style.display !== 'none') return;
    
    const dragDuration = Date.now() - this.dragStartTime;
    const dragDistanceX = Math.abs(event.clientX - this.dragStartX);
    const dragDistanceY = Math.abs(event.clientY - this.dragStartY);
    const dragDistance = Math.sqrt(dragDistanceX * dragDistanceX + dragDistanceY * dragDistanceY);
    
    const maxClickDistance = this.deviceManager && this.deviceManager.deviceType.includes('MOBILE') ? 15 : 10;
    
    if (this.isDragging && this.draggedShard) {
      if (dragDuration < this.dragThreshold && dragDistance < maxClickDistance) {
        this.endDrag();
        const intersect = this.raycast();
        if (intersect) this.handleShardClick(intersect.object, event.clientX, event.clientY, event);
      } else {
        this.endDrag();
      }
    } else {
      const target = event.target;
      if (this.isInteractiveElement(target)) return;
      
      const intersect = this.raycast();
      if (intersect) {
        this.handleShardClick(intersect.object, event.clientX, event.clientY, event);
      } else {
        if (this.onBackgroundClick) this.onBackgroundClick();
      }
    }
  }
  
  onTouchStart(event) {
    if (event.touches.length !== 1) return;
    
    const mirrorCanvas = document.getElementById('mirror-canvas');
    if (mirrorCanvas && mirrorCanvas.style.display !== 'none') return;
    
    const touch = event.touches[0];
    const target = event.target;
    
    // Permettre le scroll dans les conteneurs scrollables
    if (target.closest('.shard-long-description-container') || 
        target.closest('.shard-long-description')) {
      return; // Laisser le scroll natif fonctionner, pas de preventDefault
    }
    
    // Permettre les interactions avec les boutons et éléments interactifs
    if (target.closest('.manual-unfocus-btn') ||
        target.closest('.facette-prev') ||
        target.closest('.facette-next') ||
        target.closest('.slideshow-arrow') ||
        target.closest('.shard-image-grid') ||
        target.closest('.shard-link') ||
        target.closest('.theme-toggle')) {
      return; // Laisser les clics natifs fonctionner
    }
    
    // Si on touche le shard-info-content mais pas dans longDescription, permettre le drag
    const infoContent = target.closest('.shard-info-content');
    if (infoContent) {
      // Stocker les coordonnées de départ pour détecter la direction du mouvement
      this.dragStartTime = Date.now();
      this.dragStartX = touch.clientX;
      this.dragStartY = touch.clientY;
      this.touchMoveDetected = false;
      this.isVerticalScroll = false;
      
      this.updateMouse(touch.clientX, touch.clientY);
      const intersect = this.raycast();
      if (intersect && intersect.object.userData.isFocused) {
        this.potentialDragShard = intersect.object;
      }
      return;
    }
    
    // Sinon, comportement normal de raycast
    this.updateMouse(touch.clientX, touch.clientY);
    const intersect = this.raycast();
    if (intersect) {
      this.dragStartTime = Date.now();
      this.dragStartX = touch.clientX;
      this.dragStartY = touch.clientY;
      this.startDrag(intersect.object);
      // Ne pas appeler preventDefault car passive: true
    }
  }
  
  onTouchMove(event) {
    const mirrorCanvas = document.getElementById('mirror-canvas');
    if (mirrorCanvas && mirrorCanvas.style.display !== 'none') return;
    
    // Permettre le scroll dans longDescription
    const target = event.target || event.touches[0]?.target;
    if (target && (target.closest('.shard-long-description-container') || 
                   target.closest('.shard-long-description'))) {
      return; // Laisser le scroll natif fonctionner, pas de preventDefault
    }
    
    const touch = event.touches[0];
    
    // Si on a un potentiel drag dans l'overlay, détecter la direction du mouvement
    if (this.potentialDragShard && !this.touchMoveDetected && !this.isDragging) {
      const deltaX = Math.abs(touch.clientX - this.dragStartX);
      const deltaY = Math.abs(touch.clientY - this.dragStartY);
      
      // Seuil de détection de mouvement
      if (deltaX > 10 || deltaY > 10) {
        this.touchMoveDetected = true;
        
        // Détecter si c'est un mouvement vertical (scroll) ou horizontal (drag)
        if (deltaY > deltaX * 1.5) {
          // Mouvement vertical dominant = scroll
          this.isVerticalScroll = true;
          this.potentialDragShard = null;
          return;
        } else {
          // Mouvement horizontal dominant = drag de facette
          this.isVerticalScroll = false;
          this.startDrag(this.potentialDragShard);
          this.potentialDragShard = null;
          event.preventDefault(); // Bloquer le scroll pour le drag horizontal
        }
      } else {
        // Pas assez de mouvement détecté
        return;
      }
    }
    
    if (!this.isDragging || event.touches.length !== 1) return;
    
    event.preventDefault(); // Bloquer le scroll pendant le drag
    this.updateMouse(touch.clientX, touch.clientY);
    
    const deltaX = touch.clientX - this.dragStartX;
    
    if (this.draggedShard.userData.isFocused && this.onShardDragFocus) {
      this.onShardDragFocus(this.draggedShard, deltaX);
    } else {
      const worldPos = this.getWorldPosition();
      if (this.onShardDrag) this.onShardDrag(this.draggedShard, worldPos);
    }
  }
  
  onTouchEnd(event) {
    const dragDuration = Date.now() - this.dragStartTime;
    const target = event.target;
    
    if (this.isInteractiveElement(target)) return;
    
    if (this.isDragging && event.changedTouches.length > 0) {
      const touch = event.changedTouches[0];
      const dragDistanceX = Math.abs(touch.clientX - this.dragStartX);
      const dragDistanceY = Math.abs(touch.clientY - this.dragStartY);
      const dragDistance = Math.sqrt(dragDistanceX * dragDistanceX + dragDistanceY * dragDistanceY);
      
      const maxClickDistance = this.deviceManager && this.deviceManager.deviceType.includes('MOBILE') ? 20 : 15;
      
      if (dragDuration < this.dragThreshold && dragDistance < maxClickDistance) {
        const shard = this.draggedShard;
        this.endDrag();
        if (shard) {
          this.handleShardClick(shard, touch.clientX, touch.clientY, event);
        }
      } else {
        this.endDrag();
      }
    } else if (event.changedTouches.length === 1) {
      const touch = event.changedTouches[0];
      this.updateMouse(touch.clientX, touch.clientY);
      
      const intersect = this.raycast();
      if (intersect) {
        this.handleShardClick(intersect.object, touch.clientX, touch.clientY, event);
      } else {
        if (this.onBackgroundClick) this.onBackgroundClick();
      }
    }
  }
  
  startDrag(shard) {
    this.isDragging = true;
    this.draggedShard = shard;
    
    this.dragPlane.setFromNormalAndCoplanarPoint(
      new THREE.Vector3(0, 0, 1),
      shard.position
    );
    
    if (shard.userData.isFocused && this.onShardDragStartFocus) {
      this.onShardDragStartFocus(shard);
    } else if (this.onShardDragStart) {
      this.onShardDragStart(shard);
    }
  }
  
  endDrag() {
    if (this.draggedShard) {
      if (this.draggedShard.userData.isFocused && this.onShardDragEndFocus) {
        this.onShardDragEndFocus(this.draggedShard);
      } else if (this.onShardDragEnd) {
        this.onShardDragEnd(this.draggedShard);
      }
    }
    
    this.isDragging = false;
    this.draggedShard = null;
    this.dragStartX = 0;
  }
  
  handleShardClick(shard, clientX, clientY, event) {
    const screenCenterX = window.innerWidth / 2;
    const clickSide = clientX < screenCenterX ? 'left' : 'right';
    
    if (shard.userData.isFocused && this.onShardClickInFocus) {
      const target = event?.target;
      if (this.isInteractiveElement(target)) return;
      
      if (target) {
        if (target.classList.contains('slideshow-image')) return;
        if (target.classList.contains('slideshow-indicator')) return;
        if (target.closest('.slideshow-wrapper') && !target.classList.contains('slideshow-wrapper')) return;
      }
      this.onShardClickInFocus(shard, clickSide);
      return;
    }
    
    if (this.onShardClick) this.onShardClick(shard, clickSide);
    
    if (clickSide === 'left' && this.onShardClickLeft) {
      this.onShardClickLeft(shard);
    } else if (clickSide === 'right' && this.onShardClickRight) {
      this.onShardClickRight(shard);
    }
  }
  
  isDraggingShard() { return this.isDragging; }
  getDraggedShard() { return this.draggedShard; }
}
