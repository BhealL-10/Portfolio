/**
 * DeviceManager.js - Gestion responsive multi-appareils
 * Portfolio 3D V4.0 - Compatible mobile/tablet/desktop
 */

export class DeviceManager {
  constructor() {
    this.isMobile = false;
    this.isTablet = false;
    this.isDesktop = true;
    this.isTouchDevice = false;
    this.isLandscape = true;
    
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.pixelRatio = window.devicePixelRatio || 1;
    
    this.breakpoints = {
      mobile: 576,
      tablet: 992,
      desktop: 1200
    };
    
    this.onResize = null;
    this.onOrientationChange = null;
    
    this.detectDevice();
    this.setupListeners();
  }
  
  detectDevice() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.isLandscape = this.screenWidth > this.screenHeight;
    
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (this.screenWidth < this.breakpoints.mobile) {
      this.isMobile = true;
      this.isTablet = false;
      this.isDesktop = false;
    } else if (this.screenWidth < this.breakpoints.tablet) {
      this.isMobile = false;
      this.isTablet = true;
      this.isDesktop = false;
    } else {
      this.isMobile = false;
      this.isTablet = false;
      this.isDesktop = true;
    }
    
    console.log('📱 Device detected:', {
      type: this.isMobile ? 'mobile' : this.isTablet ? 'tablet' : 'desktop',
      touch: this.isTouchDevice,
      orientation: this.isLandscape ? 'landscape' : 'portrait',
      size: this.screenWidth + 'x' + this.screenHeight
    });
  }
  
  setupListeners() {
    var manager = this;
    
    window.addEventListener('resize', function() {
      var oldWidth = manager.screenWidth;
      var oldOrientation = manager.isLandscape;
      
      manager.detectDevice();
      
      if (manager.onResize) {
        manager.onResize({
          width: manager.screenWidth,
          height: manager.screenHeight,
          isMobile: manager.isMobile,
          isTablet: manager.isTablet,
          isDesktop: manager.isDesktop
        });
      }
      
      if (oldOrientation !== manager.isLandscape && manager.onOrientationChange) {
        manager.onOrientationChange({
          isLandscape: manager.isLandscape,
          width: manager.screenWidth,
          height: manager.screenHeight
        });
      }
    });
    
    window.addEventListener('orientationchange', function() {
      setTimeout(function() {
        manager.detectDevice();
        if (manager.onOrientationChange) {
          manager.onOrientationChange({
            isLandscape: manager.isLandscape,
            width: manager.screenWidth,
            height: manager.screenHeight
          });
        }
      }, 100);
    });
  }
  
  applyResponsiveStyles() {
    var body = document.body;
    
    body.classList.remove('device-mobile', 'device-tablet', 'device-desktop', 'device-touch', 'orientation-landscape', 'orientation-portrait');
    
    if (this.isMobile) {
      body.classList.add('device-mobile');
    } else if (this.isTablet) {
      body.classList.add('device-tablet');
    } else {
      body.classList.add('device-desktop');
    }
    
    if (this.isTouchDevice) {
      body.classList.add('device-touch');
    }
    
    if (this.isLandscape) {
      body.classList.add('orientation-landscape');
    } else {
      body.classList.add('orientation-portrait');
    }
    
    console.log('🎨 Applied responsive styles:', body.className);
  }
  
  getDeviceInfo() {
    return {
      isMobile: this.isMobile,
      isTablet: this.isTablet,
      isDesktop: this.isDesktop,
      isTouchDevice: this.isTouchDevice,
      isLandscape: this.isLandscape,
      screenWidth: this.screenWidth,
      screenHeight: this.screenHeight,
      pixelRatio: this.pixelRatio
    };
  }
  
  getTouchMultiplier() {
    if (this.isMobile) return 2.5;
    if (this.isTablet) return 2.0;
    return 1.0;
  }
  
  getScrollSensitivity() {
    if (this.isMobile) return 0.8;
    if (this.isTablet) return 1.0;
    return 1.2;
  }
}

export const deviceManager = new DeviceManager();
