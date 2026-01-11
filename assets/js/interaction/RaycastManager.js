/**
 * RaycastManager.js - Gestion du raycasting
 * Portfolio 3D V4.0
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
    this.onShardDragStart = null;
    this.onShardDrag = null;
    this.onShardDragEnd = null;
    this.onBackgroundClick = null;
    
    this.isDragging = false;
    this.draggedShard = null;
    this.dragStartTime = 0;
    this.dragThreshold = 150;
    this.dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    
    this.lastHoveredShard = null;
    
    this.setupListeners();
  }
  
  setShards(shards) {
    this.shards = shards;
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
    this.updateMouse(event.clientX, event.clientY);
    
    if (this.isDragging && this.draggedShard) {
      const worldPos = this.getWorldPosition();
      if (this.onShardDrag) {
        this.onShardDrag(this.draggedShard, worldPos);
      }
    } else {
      const intersect = this.raycast();
      const hoveredShard = intersect ? intersect.object : null;
      
      if (hoveredShard !== this.lastHoveredShard) {
        this.lastHoveredShard = hoveredShard;
        if (this.onShardHover) {
          this.onShardHover(hoveredShard);
        }
      }
    }
  }
  
  onMouseDown(event) {
    if (event.button !== 0) return;
    
    this.updateMouse(event.clientX, event.clientY);
    const intersect = this.raycast();
    
    if (intersect) {
      this.dragStartTime = Date.now();
      this.startDrag(intersect.object);
    }
  }
  
  onMouseUp(event) {
    if (event.button !== 0) return;
    
    const dragDuration = Date.now() - this.dragStartTime;
    
    if (this.isDragging && this.draggedShard) {
      if (dragDuration < this.dragThreshold) {
        this.endDrag();
        if (this.onShardClick) {
          const intersect = this.raycast();
          if (intersect) {
            this.onShardClick(intersect.object);
          }
        }
      } else {
        this.endDrag();
      }
    } else {
      const intersect = this.raycast();
      if (intersect) {
        if (this.onShardClick) {
          this.onShardClick(intersect.object);
        }
      } else {
        if (this.onBackgroundClick) {
          this.onBackgroundClick();
        }
      }
    }
  }
  
  onTouchStart(event) {
    if (event.touches.length !== 1) return;
    
    const touch = event.touches[0];
    this.updateMouse(touch.clientX, touch.clientY);
    
    const intersect = this.raycast();
    if (intersect) {
      this.dragStartTime = Date.now();
      this.startDrag(intersect.object);
      event.preventDefault();
    }
  }
  
  onTouchMove(event) {
    if (!this.isDragging || event.touches.length !== 1) return;
    
    const touch = event.touches[0];
    this.updateMouse(touch.clientX, touch.clientY);
    
    const worldPos = this.getWorldPosition();
    if (this.onShardDrag) {
      this.onShardDrag(this.draggedShard, worldPos);
    }
    
    event.preventDefault();
  }
  
  onTouchEnd(event) {
    const dragDuration = Date.now() - this.dragStartTime;
    
    if (this.isDragging) {
      if (dragDuration < this.dragThreshold) {
        const shard = this.draggedShard;
        this.endDrag();
        if (this.onShardClick && shard) {
          this.onShardClick(shard);
        }
      } else {
        this.endDrag();
      }
    } else if (event.changedTouches.length === 1) {
      const touch = event.changedTouches[0];
      this.updateMouse(touch.clientX, touch.clientY);
      
      const intersect = this.raycast();
      if (intersect) {
        if (this.onShardClick) {
          this.onShardClick(intersect.object);
        }
      } else {
        if (this.onBackgroundClick) {
          this.onBackgroundClick();
        }
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
    
    if (this.onShardDragStart) {
      this.onShardDragStart(shard);
    }
  }
  
  endDrag() {
    if (this.onShardDragEnd && this.draggedShard) {
      this.onShardDragEnd(this.draggedShard);
    }
    
    this.isDragging = false;
    this.draggedShard = null;
  }
  
  isDraggingShard() { return this.isDragging; }
  getDraggedShard() { return this.draggedShard; }
}
