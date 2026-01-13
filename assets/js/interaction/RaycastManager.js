/**
 * RaycastManager.js - Gestion du raycasting V5.0
 * Portfolio 3D - Interactions responsive optimisées
 */

import * as THREE from 'three';

export class RaycastManager {
  constructor(camera) {
    this.camera = camera;
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
    this.dragThreshold = 150;
    this.dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    
    this.lastHoveredShard = null;
    
    this.setupListeners();
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
    
    window.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });
    window.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
    window.addEventListener('touchend', (e) => this.onTouchEnd(e));
  }
  
  updateMouse(clientX, clientY) {
    this.mouse.x = (clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(clientY / window.innerHeight) * 2 + 1;
    this.lastClickX = clientX;
    this.lastClickY = clientY;
  }
  
  raycast() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.shards);
    return intersects.length > 0 ? intersects[0] : null;
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
      this.startDrag(intersect.object);
    }
  }
  
  onMouseUp(event) {
    if (event.button !== 0) return;
    
    const mirrorCanvas = document.getElementById('mirror-canvas');
    if (mirrorCanvas && mirrorCanvas.style.display !== 'none') return;
    
    const dragDuration = Date.now() - this.dragStartTime;
    
    if (this.isDragging && this.draggedShard) {
      if (dragDuration < this.dragThreshold) {
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
    
    if (this.isInteractiveElement(target)) return;
    
    this.updateMouse(touch.clientX, touch.clientY);
    
    const intersect = this.raycast();
    if (intersect) {
      this.dragStartTime = Date.now();
      this.dragStartX = touch.clientX;
      this.startDrag(intersect.object);
      event.preventDefault();
    }
  }
  
  onTouchMove(event) {
    const mirrorCanvas = document.getElementById('mirror-canvas');
    if (mirrorCanvas && mirrorCanvas.style.display !== 'none') return;
    
    if (!this.isDragging || event.touches.length !== 1) return;
    
    const touch = event.touches[0];
    this.updateMouse(touch.clientX, touch.clientY);
    
    const deltaX = touch.clientX - this.dragStartX;
    
    if (this.draggedShard.userData.isFocused && this.onShardDragFocus) {
      this.onShardDragFocus(this.draggedShard, deltaX);
    } else {
      const worldPos = this.getWorldPosition();
      if (this.onShardDrag) this.onShardDrag(this.draggedShard, worldPos);
    }
    
    event.preventDefault();
  }
  
  onTouchEnd(event) {
    const dragDuration = Date.now() - this.dragStartTime;
    const target = event.target;
    
    if (this.isInteractiveElement(target)) return;
    
    if (this.isDragging) {
      if (dragDuration < this.dragThreshold) {
        const shard = this.draggedShard;
        this.endDrag();
        if (shard) {
          const touch = event.changedTouches[0];
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
