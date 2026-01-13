/**
 * DeviceManager.js - Gestionnaire responsive optimisé V5.0
 * Portfolio 3D - Détection device et configurations adaptatives
 */

import { DEVICE, INTRO, SCROLL, CAMERA, SHARD, UI, FOCUS, ResponsiveUtils } from '../config/constants.js';

export class DeviceManager {
  constructor() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.pixelRatio = window.devicePixelRatio || 1;
    this.isLandscape = this.screenWidth > this.screenHeight;
    this.aspectRatio = this.screenWidth / this.screenHeight;
    
    this.deviceType = this.detectDeviceType();
    this.isMobile = this.deviceType.includes('MOBILE');
    this.isTablet = this.deviceType.includes('TABLET');
    this.isDesktop = this.deviceType.includes('DESKTOP');
    this.isTouchDevice = this.detectTouchDevice();
    
    this.onResize = null;
    this.onOrientationChange = null;
    this.onDeviceTypeChange = null;
    
    this.setupListeners();
    this.applyBodyClasses();
  }
  
  detectDeviceType() {
    return ResponsiveUtils.getDeviceType(this.screenWidth, this.screenHeight);
  }
  
  detectTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
  
  setupListeners() {
    let resizeTimeout;
    
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.handleResize(), 100);
    });
    
    window.addEventListener('orientationchange', () => {
      setTimeout(() => this.handleOrientationChange(), 150);
    });
  }
  
  handleResize() {
    const oldType = this.deviceType;
    const oldLandscape = this.isLandscape;
    
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.isLandscape = this.screenWidth > this.screenHeight;
    this.aspectRatio = this.screenWidth / this.screenHeight;
    this.deviceType = this.detectDeviceType();
    
    this.isMobile = this.deviceType.includes('MOBILE');
    this.isTablet = this.deviceType.includes('TABLET');
    this.isDesktop = this.deviceType.includes('DESKTOP');
    
    this.applyBodyClasses();
    
    if (this.onResize) {
      this.onResize({
        width: this.screenWidth,
        height: this.screenHeight,
        deviceType: this.deviceType,
        isLandscape: this.isLandscape
      });
    }
    
    if (oldType !== this.deviceType && this.onDeviceTypeChange) {
      this.onDeviceTypeChange({
        oldType: oldType,
        newType: this.deviceType,
        width: this.screenWidth,
        height: this.screenHeight
      });
    }
    
    if (oldLandscape !== this.isLandscape && this.onOrientationChange) {
      this.onOrientationChange({
        isLandscape: this.isLandscape,
        width: this.screenWidth,
        height: this.screenHeight
      });
    }
  }
  
  handleOrientationChange() {
    this.handleResize();
  }
  
  applyBodyClasses() {
    const body = document.body;
    
    body.classList.remove(
      'device-mobile', 'device-mobile-landscape',
      'device-tablet', 'device-tablet-landscape',
      'device-desktop', 'device-desktop-large',
      'orientation-portrait', 'orientation-landscape',
      'touch-device', 'pointer-device'
    );
    
    const typeClass = 'device-' + this.deviceType.toLowerCase().replace('_', '-');
    body.classList.add(typeClass);
    body.classList.add(this.isLandscape ? 'orientation-landscape' : 'orientation-portrait');
    body.classList.add(this.isTouchDevice ? 'touch-device' : 'pointer-device');
    
    body.dataset.deviceType = this.deviceType.toLowerCase();
  }
  
  applyResponsiveStyles() {
    const existingStyle = document.getElementById('device-responsive-styles');
    if (existingStyle) existingStyle.remove();
    
    const style = document.createElement('style');
    style.id = 'device-responsive-styles';
    
    const uiScale = DEVICE.UI_SCALE[this.deviceType] || 1;
    
    style.textContent = `
      :root {
        --ui-scale: ${uiScale};
        --device-width: ${this.screenWidth}px;
        --device-height: ${this.screenHeight}px;
        --safe-area-top: env(safe-area-inset-top, 0px);
        --safe-area-bottom: env(safe-area-inset-bottom, 0px);
      }
      
      .device-mobile .section-indicator { right: 12px; }
      .device-mobile .section-dot { width: 8px; height: 8px; }
      .device-mobile .shard-info-content { padding: 15px; font-size: 14px; }
      .device-mobile .facette-nav { gap: 40px; }
      
      .device-tablet .section-indicator { right: 18px; }
      .device-tablet .section-dot { width: 10px; height: 10px; }
      .device-tablet .shard-info-content { padding: 20px; }
      
      .touch-device * { -webkit-tap-highlight-color: transparent; }
      .touch-device button, .touch-device a { touch-action: manipulation; }
    `;
    
    document.head.appendChild(style);
  }
  
  getIntroConfig() {
    return INTRO.RESPONSIVE[this.deviceType] || INTRO.RESPONSIVE.DESKTOP;
  }
  
  getScrollConfig() {
    const baseType = this.isMobile ? 'MOBILE' : (this.isTablet ? 'TABLET' : 'DESKTOP');
    return SCROLL.RESPONSIVE[baseType] || SCROLL.RESPONSIVE.DESKTOP;
  }
  
  getCameraConfig() {
    const baseType = this.isMobile ? 'MOBILE' : (this.isTablet ? 'TABLET' : 'DESKTOP');
    return CAMERA.RESPONSIVE[baseType] || CAMERA.RESPONSIVE.DESKTOP;
  }
  
  getShardConfig() {
    const baseType = this.isMobile ? 'MOBILE' : (this.isTablet ? 'TABLET' : 'DESKTOP');
    return SHARD.RESPONSIVE[baseType] || SHARD.RESPONSIVE.DESKTOP;
  }
  
  getFocusConfig() {
    return DEVICE.FOCUS[this.deviceType] || DEVICE.FOCUS.DESKTOP;
  }
  
  getUIConfig() {
    const baseType = this.isMobile ? 'MOBILE' : (this.isTablet ? 'TABLET' : 'DESKTOP');
    return {
      infoOverlay: UI.INFO_OVERLAY.RESPONSIVE[baseType] || UI.INFO_OVERLAY.RESPONSIVE.DESKTOP,
      indicators: UI.INDICATORS.RESPONSIVE[baseType] || UI.INDICATORS.RESPONSIVE.DESKTOP,
      scale: DEVICE.UI_SCALE[this.deviceType] || 1
    };
  }
  
  getShardTitleConfig() {
    const baseType = this.isMobile ? 'MOBILE' : (this.isTablet ? 'TABLET' : 'DESKTOP');
    return DEVICE.SHARD_TITLE[baseType] || DEVICE.SHARD_TITLE.DESKTOP;
  }
  
  getOptimalPixelRatio() {
    if (this.isMobile) return Math.min(this.pixelRatio, 2);
    if (this.isTablet) return Math.min(this.pixelRatio, 2);
    return Math.min(this.pixelRatio, 2.5);
  }
  
  getDeviceInfo() {
    return {
      type: this.deviceType,
      width: this.screenWidth,
      height: this.screenHeight,
      pixelRatio: this.pixelRatio,
      isLandscape: this.isLandscape,
      isMobile: this.isMobile,
      isTablet: this.isTablet,
      isDesktop: this.isDesktop,
      isTouchDevice: this.isTouchDevice,
      aspectRatio: this.aspectRatio
    };
  }
}
