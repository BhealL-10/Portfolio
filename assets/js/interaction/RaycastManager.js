/**
 * RaycastManager.js - Gestion du raycasting
 * Portfolio 3D V2.0
 * 
 * Détecte les interactions souris/touch avec les shards
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
    
    // État du drag
    this.isDragging = false;
    this.draggedShard = null;
    this.dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    
    this.setupListeners();
  }
  
  /**
   * Définit les shards à tester
   */
  setShards(shards) {
    this.shards = shards;
  }
  
  /**
   * Configure les event listeners
   */
  setupListeners() {
    // Mouse events
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('mousedown', (e) => this.onMouseDown(e));
    window.addEventListener('mouseup', (e) => this.onMouseUp(e));
    
    // Touch events
    window.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });
    window.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
    window.addEventListener('touchend', (e) => this.onTouchEnd(e));
  }
  
  /**
   * Convertit les coordonnées écran en coordonnées normalisées
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
   * Obtient la position monde sur le plan de drag
   */
  getWorldPosition() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const target = new THREE.Vector3();
    this.raycaster.ray.intersectPlane(this.dragPlane, target);
    return target;
  }
  
  // ==========================================
  // MOUSE EVENTS
  // ==========================================
  
  onMouseMove(event) {
    this.updateMouse(event.clientX, event.clientY);
    
    if (this.isDragging && this.draggedShard) {
      // Drag en cours
      const worldPos = this.getWorldPosition();
      if (this.onShardDrag) {
        this.onShardDrag(this.draggedShard, worldPos);
      }
    } else {
      // Hover
      const intersect = this.raycast();
      if (this.onShardHover) {
        this.onShardHover(intersect ? intersect.object : null);
      }
    }
  }
  
  onMouseDown(event) {
    if (event.button !== 0) return; // Left click only
    
    this.updateMouse(event.clientX, event.clientY);
    const intersect = this.raycast();
    
    if (intersect) {
      this.startDrag(intersect.object);
    }
  }
  
  onMouseUp(event) {
    if (event.button !== 0) return;
    
    if (this.isDragging && this.draggedShard) {
      this.endDrag();
    } else {
      // Click sans drag
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
  
  // ==========================================
  // TOUCH EVENTS
  // ==========================================
  
  onTouchStart(event) {
    if (event.touches.length !== 1) return;
    
    const touch = event.touches[0];
    this.updateMouse(touch.clientX, touch.clientY);
    
    const intersect = this.raycast();
    if (intersect) {
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
    if (this.isDragging) {
      this.endDrag();
    } else if (event.changedTouches.length === 1) {
      // Tap
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
  
  // ==========================================
  // DRAG MANAGEMENT
  // ==========================================
  
  startDrag(shard) {
    this.isDragging = true;
    this.draggedShard = shard;
    
    // Mettre à jour le plan de drag à la position Z du shard
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
   * Vérifie si un drag est en cours
   */
  isDraggingShard() {
    return this.isDragging;
  }
  
  /**
   * Retourne le shard en cours de drag
   */
  getDraggedShard() {
    return this.draggedShard;
  }
}
