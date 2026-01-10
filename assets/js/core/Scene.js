/**
 * Scene.js - Configuration de la scène Three.js
 * Portfolio 3D V2.0
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
    
    // Lumière ambiante
    this.ambientLight = new THREE.AmbientLight(theme.ambient, 0.6);
    this.instance.add(this.ambientLight);
    
    // Lumière directionnelle principale
    this.mainLight = new THREE.DirectionalLight(theme.directional, 1.0);
    this.mainLight.position.set(5, 10, 7);
    this.mainLight.castShadow = false;
    this.instance.add(this.mainLight);
    
    // Lumière de fill (arrière)
    this.fillLight = new THREE.DirectionalLight(theme.directional, 0.3);
    this.fillLight.position.set(-5, -5, -10);
    this.instance.add(this.fillLight);
    
    // Point light pour les reflets
    this.pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
    this.pointLight.position.set(0, 0, 20);
    this.instance.add(this.pointLight);
  }
  
  setupFog() {
    const theme = this.isDarkMode ? THEME.DARK : THEME.LIGHT;
    this.instance.fog = new THREE.Fog(theme.background, 50, 200);
  }
  
  /**
   * Change le thème (light/dark)
   */
  setTheme(isDark) {
    this.isDarkMode = isDark;
    const theme = isDark ? THEME.DARK : THEME.LIGHT;
    
    // Background
    this.instance.background = new THREE.Color(theme.background);
    
    // Lights
    this.ambientLight.color.setHex(theme.ambient);
    this.mainLight.color.setHex(theme.directional);
    this.fillLight.color.setHex(theme.directional);
    
    // Fog
    this.instance.fog.color.setHex(theme.background);
  }
  
  /**
   * Met à jour la position du point light (suit la caméra)
   */
  updatePointLight(cameraPosition) {
    this.pointLight.position.copy(cameraPosition);
    this.pointLight.position.z += 10;
  }
  
  /**
   * Ajoute un objet à la scène
   */
  add(object) {
    this.instance.add(object);
  }
  
  /**
   * Retire un objet de la scène
   */
  remove(object) {
    this.instance.remove(object);
  }
  
  /**
   * Dispose des ressources
   */
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
