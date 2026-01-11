/**
 * Renderer.js - Configuration WebGL avec gestion dual canvas
 * Portfolio 3D V3.0
 */

import * as THREE from 'three';
import { LAYERS } from '../config/constants.js';

export class Renderer {
  constructor(canvas = null) {
    const targetCanvas = canvas || document.createElement('canvas');
    
    this.instance = new THREE.WebGLRenderer({
      canvas: targetCanvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: false
    });
    
    this.opacity = 1;
    this.isVisible = true;
    
    this.setupRenderer();
    this.setupResize();
  }
  
  setupRenderer() {
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    this.instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 1.15;
    this.instance.sortObjects = true;
    
    const canvas = this.instance.domElement;
    canvas.id = 'three-canvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: ${LAYERS.THREE_JS.Z_INDEX};
      pointer-events: auto;
    `;
    
    if (!canvas.parentNode) {
      document.body.appendChild(canvas);
    }
  }
  
  setupResize() {
    window.addEventListener('resize', () => {
      this.instance.setSize(window.innerWidth, window.innerHeight);
      this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }
  
  render(scene, camera) {
    if (!this.instance || !this.isVisible) return;
    this.instance.render(scene, camera);
  }
  
  setOpacity(opacity) {
    this.opacity = Math.max(0, Math.min(1, opacity));
    this.instance.domElement.style.opacity = this.opacity;
  }
  
  animateOpacity(targetOpacity, duration = 0.5, onComplete = null) {
    if (!window.gsap) {
      this.setOpacity(targetOpacity);
      if (onComplete) onComplete();
      return;
    }
    
    window.gsap.to(this, {
      opacity: targetOpacity,
      duration: duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        this.instance.domElement.style.opacity = this.opacity;
      },
      onComplete: onComplete
    });
  }
  
  show() {
    this.isVisible = true;
    this.instance.domElement.style.display = 'block';
  }
  
  hide() {
    this.isVisible = false;
    this.instance.domElement.style.display = 'none';
  }
  
  getCanvas() { return this.instance.domElement; }
  getOpacity() { return this.opacity; }
  dispose() { this.instance.dispose(); }
}
