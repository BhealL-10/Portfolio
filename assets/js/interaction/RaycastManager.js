/**
 * RaycastManager.js - Gestion du raycasting
 * Portfolio 3D V3.0
 * 
 * - Détection souris/touch
 * - Hover, click, drag
 */

import * as THREE from 'three';

export class RaycastManager {
  constructor(camera) {
    this.camera = camera;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.shards = [];
    
    // Callbacks
    this.onShardHover = null;
    this.onShardClick = null;
    this.onShardDragStart = null;
    this.onShardDrag = null;
    this.onShardDragEnd = null;
    this.onBackgroundClick = null;
    
    // État drag
    this.isDragging = false;
    this.draggedShard = null;
    this.dragStartTime = 0;
    this.dragThreshold = 150; // ms pour distinguer clic/drag
    this.dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    
    // Dernier hover
    this.lastHoveredShard = null;
    
    this.setupListeners();
  }
  
  /**
   * Définit les shards à tester
   */
  setShards(shards) {
    this.shards = shards;
  }
  
  /**
   * Configure les listeners
   */
  setupListeners() {
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('mousedown', (e) => this.onMouseDown(e));
    window.addEventListener('mouseup', (e) => this.onMouseUp(e));
    
    window.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });
    window.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
    window.addEventListener('touchend', (e) => this.onTouchEnd(e));
  }
  
  /**
   * Coordonnées écran → normalisées
   */
  updateMouse(clientX, clientY) {
    this.mouse.x = (clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(clientY / window.innerHeight) * 2 + 1;
  }
  
  /**
   * Effectue un raycast
   */
  raycast() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.shards);
    return intersects.length > 0 ? intersects[0] : null;
  }
  
  /**
   * Position monde sur plan de drag
   */
  getWorldPosition() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const target = new THREE.Vector3();
    this.raycaster.ray.intersectPlane(this.dragPlane, target);
    return target;
  }
  
  // === MOUSE EVENTS ===
  
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
      
      // Détecter changement de hover
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
        // C'était un clic, pas un drag
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
  
  // === TOUCH EVENTS ===
  
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
        // C'était un tap
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
  
  // === DRAG MANAGEMENT ===
  
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
  
  /**
   * Getters
   */
  isDraggingShard() { return this.isDragging; }
  getDraggedShard() { return this.draggedShard; }
}
