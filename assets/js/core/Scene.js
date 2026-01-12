/**
 * Scene.js - Configuration scène Three.js
 * Portfolio 3D V4.0
 */

import * as THREE from 'three';
import { THEME } from '../config/constants.js';

export class Scene {
  constructor() {
    this.instance = new THREE.Scene();
    this.isDarkMode = this.detectTheme();
    
    this.setupBackground();
    this.setupLights();
    this.setupFog();
  }
  
  detectTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ||
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  
  setupBackground() {
    const theme = this.isDarkMode ? THEME.DARK : THEME.LIGHT;
    this.instance.background = new THREE.Color(theme.background);
  }
  
  setupLights() {
    const theme = this.isDarkMode ? THEME.DARK : THEME.LIGHT;
    
    this.ambientLight = new THREE.AmbientLight(theme.ambient, 0.5);
    this.instance.add(this.ambientLight);
    
    this.mainLight = new THREE.DirectionalLight(theme.directional, 1.2);
    this.mainLight.position.set(5, 10, 10);
    this.mainLight.castShadow = false;
    this.instance.add(this.mainLight);
    
    this.fillLight = new THREE.DirectionalLight(theme.directional, 0.4);
    this.fillLight.position.set(-5, -5, -15);
    this.instance.add(this.fillLight);
    
    this.rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
    this.rimLight.position.set(0, 5, -10);
    this.instance.add(this.rimLight);
    
    this.pointLight = new THREE.PointLight(0xffffff, 0.6, 150);
    this.pointLight.position.set(0, 0, 30);
    this.instance.add(this.pointLight);
    
    this.hemisphereLight = new THREE.HemisphereLight(
      theme.ambient,
      theme.background,
      0.3
    );
    this.instance.add(this.hemisphereLight);
  }
  
  setupFog() {
    this.instance.fog = null;
  }
  
  setTheme(isDark) {
    this.isDarkMode = isDark;
    const theme = isDark ? THEME.DARK : THEME.LIGHT;
    
    this.instance.background = new THREE.Color(theme.background);
    
    this.ambientLight.color.setHex(theme.ambient);
    this.mainLight.color.setHex(theme.directional);
    this.fillLight.color.setHex(theme.directional);
    this.hemisphereLight.color.setHex(theme.ambient);
    this.hemisphereLight.groundColor.setHex(theme.background);
    
    if (this.instance.fog) {
      this.instance.fog.color.setHex(theme.background);
      this.instance.fog.near = theme.fogNear;
      this.instance.fog.far = theme.fogFar;
    }
  }
  
  updatePointLight(cameraPosition) {
    this.pointLight.position.copy(cameraPosition);
    this.pointLight.position.z += 15;
    this.pointLight.position.y += 5;
  }
  
  add(object) { this.instance.add(object); }
  remove(object) { this.instance.remove(object); }
  
  dispose() {
    this.instance.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(m => m.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  }
}
