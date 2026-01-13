/**
 * Renderer.js - Configuration WebGL renderer V5.0
 * Portfolio 3D - Rendu optimisé responsive
 */

import * as THREE from 'three';
import { LAYERS } from '../config/constants.js';

export class Renderer {
  constructor(deviceManager) {
    this.deviceManager = deviceManager;
    
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    
    const pixelRatio = deviceManager ? deviceManager.getOptimalPixelRatio() : Math.min(window.devicePixelRatio, 2);
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    
    this.setupCanvas();
    this.setupResizeListener();
  }
  
  setupCanvas() {
    const canvas = this.renderer.domElement;
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: ${LAYERS.THREE_JS.Z_INDEX};
      pointer-events: auto;
    `;
    document.body.appendChild(canvas);
  }
  
  setupResizeListener() {
    window.addEventListener('resize', () => this.onResize());
  }
  
  onResize() {
    const pixelRatio = this.deviceManager ? this.deviceManager.getOptimalPixelRatio() : Math.min(window.devicePixelRatio, 2);
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  render(scene, camera) {
    this.renderer.render(scene, camera);
  }
  
  setOpacity(value) {
    this.renderer.domElement.style.opacity = value;
  }
  
  animateOpacity(targetOpacity, duration = 0.5) {
    if (window.gsap) {
      window.gsap.to(this.renderer.domElement, {
        opacity: targetOpacity,
        duration: duration,
        ease: 'power2.out'
      });
    } else {
      this.renderer.domElement.style.opacity = targetOpacity;
    }
  }
  
  setBlur(amount) {
    this.renderer.domElement.style.filter = amount > 0 ? `blur(${amount}px)` : 'none';
  }
  
  animateBlur(targetBlur, duration = 0.3) {
    const currentBlur = parseFloat(this.renderer.domElement.style.filter?.match(/blur\(([\d.]+)px\)/)?.[1] || 0);
    
    if (window.gsap) {
      const obj = { blur: currentBlur };
      window.gsap.to(obj, {
        blur: targetBlur,
        duration: duration,
        ease: 'power2.out',
        onUpdate: () => {
          this.renderer.domElement.style.filter = obj.blur > 0.1 ? `blur(${obj.blur}px)` : 'none';
        }
      });
    } else {
      this.setBlur(targetBlur);
    }
  }
  
  getRenderer() { return this.renderer; }
  getDomElement() { return this.renderer.domElement; }
  
  dispose() {
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
