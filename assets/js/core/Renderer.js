/**
 * Renderer.js - Configuration du renderer WebGL
 * Portfolio 3D V2.0
 */

import * as THREE from 'three';

export class Renderer {
  constructor(canvas = null) {
    // Créer ou utiliser un canvas existant
    const targetCanvas = canvas || document.createElement('canvas');
    
    this.instance = new THREE.WebGLRenderer({
      canvas: targetCanvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    
    this.setupRenderer();
    this.setupResize();
  }
  
  setupRenderer() {
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    this.instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 1.2;
    
    // Append to body if no canvas provided
    if (!this.instance.domElement.parentNode) {
      document.body.appendChild(this.instance.domElement);
    }
  }
  
  setupResize() {
    window.addEventListener('resize', () => {
      this.instance.setSize(window.innerWidth, window.innerHeight);
      this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }
  
  render(scene, camera) {
    this.instance.render(scene, camera);
  }
  
  getCanvas() {
    return this.instance.domElement;
  }
  
  dispose() {
    this.instance.dispose();
  }
}
