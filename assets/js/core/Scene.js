/**
 * Scene.js - Configuration scène Three.js V5.0
 * Portfolio 3D - Éclairage et thème optimisés
 */

import * as THREE from 'three';
import { THEME } from '../config/constants.js';

export class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.isDarkMode = document.documentElement.dataset.theme === 'dark';
    
    this.ambientLight = null;
    this.directionalLight = null;
    this.pointLight = null;
    this.hemisphereLight = null;
    
    this.setupBackground();
    this.setupLights();
    this.setupFog();
  }
  
  setupBackground() {
    const theme = this.isDarkMode ? THEME.DARK : THEME.LIGHT;
    this.scene.background = new THREE.Color(theme.background);
  }
  
  setupLights() {
    const theme = this.isDarkMode ? THEME.DARK : THEME.LIGHT;
    
    this.ambientLight = new THREE.AmbientLight(theme.ambient, 0.6);
    this.scene.add(this.ambientLight);
    
    this.directionalLight = new THREE.DirectionalLight(theme.directional, 0.8);
    this.directionalLight.position.set(10, 20, 30);
    this.scene.add(this.directionalLight);
    
    this.pointLight = new THREE.PointLight(0xffffff, 0.5, 200);
    this.pointLight.position.set(0, 0, 0);
    this.scene.add(this.pointLight);
    
    this.hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
    this.scene.add(this.hemisphereLight);
  }
  
  setupFog() {
    const theme = this.isDarkMode ? THEME.DARK : THEME.LIGHT;
    this.scene.fog = new THREE.Fog(theme.background, theme.fogNear, theme.fogFar);
  }
  
  setTheme(isDarkMode) {
    this.isDarkMode = isDarkMode;
    const theme = isDarkMode ? THEME.DARK : THEME.LIGHT;
    
    this.scene.background = new THREE.Color(theme.background);
    
    if (this.ambientLight) {
      this.ambientLight.color.setHex(theme.ambient);
    }
    
    if (this.directionalLight) {
      this.directionalLight.color.setHex(theme.directional);
    }
    
    if (this.scene.fog) {
      this.scene.fog.color.setHex(theme.background);
      this.scene.fog.near = theme.fogNear;
      this.scene.fog.far = theme.fogFar;
    }
  }
  
  updatePointLightPosition(cameraZ) {
    if (this.pointLight) {
      this.pointLight.position.z = cameraZ + 50;
    }
  }
  
  getScene() { return this.scene; }
  add(object) { this.scene.add(object); }
  remove(object) { this.scene.remove(object); }
}
