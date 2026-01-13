/**
 * Main.js - Point d'entrée principal V5.0
 * Portfolio 3D - Architecture optimisée avec navigation centralisée
 * 
 * Améliorations V5.0:
 * - Physique 100% fluide sans tremblements
 * - Navigation centralisée (section dots, focus, scroll)
 * - Unfocus obligatoire avant changement de section
 * - Retour orbital fluide après drag
 * - Transitions coordonnées
 */

import { Camera } from './core/Camera.js';
import { Scene } from './core/Scene.js';
import { Renderer } from './core/Renderer.js';
import { ScrollManager } from './core/ScrollManager.js';
import { TimelineManager } from './core/TimelineManager.js';
import { DeviceManager } from './core/DeviceManager.js';

import { ShardManager } from './shards/ShardManager.js';

import { FocusController } from './interaction/FocusController.js';
import { RaycastManager } from './interaction/RaycastManager.js';

import { SimpleIntroManager } from './intro/SimpleIntroManager.js';

import { UIManager } from './ui/UIManager.js';
import { ThemeSwitch } from './ui/ThemeSwitch.js';
import { NavigationBar } from './ui/NavigationBar.js';

import { CAMERA, SHARD } from './config/constants.js';

class PortfolioApp {
  constructor() {
    this.deviceManager = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.scrollManager = null;
    this.timelineManager = null;
    
    this.shardManager = null;
    
    this.focusController = null;
    this.raycastManager = null;
    
    this.introManager = null;
    
    this.uiManager = null;
    this.themeSwitch = null;
    this.navigationBar = null;
    
    this.isInitialized = false;
    this.isIntroComplete = false;
    this.lastTime = 0;
    
    this.aboutSectionCheckInterval = null;
    
    console.log('🚀 Portfolio 3D V5.0 - Initializing...');
    this.init();
  }
  
  async init() {
    try {
      this.deviceManager = new DeviceManager();
      this.deviceManager.applyResponsiveStyles();
      
      this.scene = new Scene();
      this.camera = new Camera(this.deviceManager);
      this.renderer = new Renderer(this.deviceManager);
      
      this.scrollManager = new ScrollManager(this.deviceManager);
      this.timelineManager = new TimelineManager();
      
      this.shardManager = new ShardManager(
        this.scene.getScene(),
        this.camera.getCamera(),
        this.deviceManager
      );
      await this.shardManager.generateShards();
      
      this.shardManager.scrollManager = this.scrollManager;
      
      this.focusController = new FocusController(
        this.shardManager,
        this.camera,
        this.scrollManager,
        this.timelineManager
      );
      this.focusController.setScrollManager(this.scrollManager);
      this.focusController.setRenderer(this.renderer);
      this.focusController.setDeviceManager(this.deviceManager);
      
      this.raycastManager = new RaycastManager(this.camera.getCamera());
      this.raycastManager.setShards(this.shardManager.getAllShards());
      
      this.uiManager = new UIManager(this.deviceManager);
      this.themeSwitch = new ThemeSwitch(this.scene, this.shardManager);
      this.navigationBar = new NavigationBar(this.scrollManager, this.deviceManager);
      
      this.themeSwitch.setNavigationBar(this.navigationBar);
      
      this.setupCallbacks();
      this.setupDeviceCallbacks();
      
      this.scrollManager.setTotalSections(this.shardManager.getTotalShards());
      
      this.isInitialized = true;
      
      this.checkIntroOrStart();
      
      console.log('✅ Portfolio V5.0 initialized successfully');
      console.log('📱 Device:', this.deviceManager.getDeviceInfo());
      
    } catch (error) {
      console.error('❌ Initialization error:', error);
    }
  }
  
  setupCallbacks() {
    this.raycastManager.onShardHover = (shard) => {
      if (shard) {
        this.shardManager.setHover(shard);
      } else {
        this.shardManager.clearHover();
      }
    };
    
    this.raycastManager.onShardClick = (shard, side) => {
      if (this.focusController.isFocused()) {
        if (this.focusController.getFocusedShard() === shard) {
          return;
        }
      }
      this.focusController.focus(shard, false);
    };
    
    this.raycastManager.onBackgroundClick = () => {
      if (this.focusController.isFocused()) {
        this.focusController.unfocus();
      }
    };
    
    this.raycastManager.onShardDragStart = (shard) => {
      this.shardManager.startDrag(shard);
    };
    
    this.raycastManager.onShardDrag = (shard, worldPos) => {
      this.shardManager.updateDrag(shard, worldPos);
    };
    
    this.raycastManager.onShardDragEnd = (shard) => {
      this.shardManager.endDrag(shard);
    };
    
    this.raycastManager.onShardDragStartFocus = (shard) => {
      this.focusController.onDragStartInFocus(shard);
    };
    
    this.raycastManager.onShardDragFocus = (shard, deltaX) => {
      this.focusController.updateDragRotation(shard, deltaX);
    };
    
    this.raycastManager.onShardDragEndFocus = (shard) => {
      this.focusController.onDragEndInFocus(shard);
    };
    
    this.raycastManager.onShardClickInFocus = (shard, clickSide) => {
      this.focusController.onShardClickInFocus(shard, clickSide);
    };
    
    this.scrollManager.onSectionChange = (newSection, oldSection) => {
      this.uiManager.updateSectionIndicator(newSection);
    };
    
    this.scrollManager.onAboutSectionEnter = () => {
      this.uiManager.showAboutSection();
    };
    
    this.scrollManager.onAboutSectionLeave = () => {
      this.uiManager.hideAboutSection();
    };
    
    this.focusController.onNavigationBarToggle = (show) => {
      if (show) {
        this.navigationBar.show();
      } else {
        this.navigationBar.hide();
      }
    };
    
    this.focusController.onLastShardVisited = () => {
      console.log('🎯 Last shard visited - enabling About navigation');
      if (this.navigationBar) {
        this.navigationBar.show();
      }
    };
    
    this.uiManager.setupNavigation(
      this.scrollManager,
      this.shardManager,
      this.focusController
    );
  }
  
  setupDeviceCallbacks() {
    this.deviceManager.onResize = (info) => {
      console.log('📐 Window resized:', info.width, 'x', info.height);
      this.camera.onResize();
      this.renderer.onResize();
    };
    
    this.deviceManager.onOrientationChange = (info) => {
      console.log('🔄 Orientation changed:', info.isLandscape ? 'landscape' : 'portrait');
    };
    
    this.deviceManager.onDeviceTypeChange = (info) => {
      console.log('📱 Device type changed:', info.oldType, '→', info.newType);
    };
  }
  
  checkIntroOrStart() {
    this.introManager = new SimpleIntroManager(this.deviceManager);
    
    if (this.introManager.shouldShowIntro()) {
      console.log('🎬 Showing intro sequence');
      
      this.renderer.setOpacity(0);
      
      this.introManager.onComplete = () => {
        this.onIntroComplete();
      };
      
      this.introManager.start();
    } else {
      console.log('⏭️ Skipping intro - already completed');
      this.onIntroComplete();
    }
  }
  
  onIntroComplete() {
    console.log('✨ Intro complete - starting main experience');
    this.isIntroComplete = true;
    
    this.renderer.animateOpacity(1, 1.0);
    
    const targetZ = CAMERA.POST_INTRO_START_Z;
    this.camera.teleportTo(targetZ);
    
    this.navigationBar.show();
    
    this.startAboutSectionCheck();
    
    this.lastTime = performance.now();
    this.animate();
  }
  
  startAboutSectionCheck() {
    if (this.aboutSectionCheckInterval) {
      clearInterval(this.aboutSectionCheckInterval);
    }
    
    this.aboutSectionCheckInterval = setInterval(() => {
      const aboutSection = document.getElementById('about');
      if (!aboutSection) return;
      
      const isAboutVisible = aboutSection.classList.contains('visible');
      
      if (isAboutVisible && this.focusController && this.focusController.isFocused()) {
        console.log('⚠️ About section visible with focus active - forcing unfocus');
        if (this.focusController.focusedShard) {
          const shard = this.focusController.focusedShard;
          this.focusController.focusedShard = null;
          this.focusController.state = 'idle';
          
          if (this.focusController.infoOverlay) {
            this.focusController.infoOverlay.style.opacity = '0';
            this.focusController.infoOverlay.style.pointerEvents = 'none';
          }
          
          this.focusController.stopSlideshow();
          this.camera.setFocusMode(false);
          
          if (this.scrollManager) {
            this.scrollManager.setLocked(false);
          }
          
          if (shard && shard.userData) {
            shard.userData.isFocused = false;
          }
          
          if (this.navigationBar) {
            this.navigationBar.show();
          }
        }
      }
    }, 5000);
  }
  
  animate() {
    if (!this.isInitialized || !this.isIntroComplete) return;
    
    requestAnimationFrame(() => this.animate());
    
    const now = performance.now();
    const deltaTime = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;
    
    const scrollProgress = this.scrollManager.update();
    
    this.camera.update(scrollProgress, deltaTime);
    
    this.shardManager.update(scrollProgress, deltaTime);
    
    this.focusController.update(
      this.scrollManager.getCurrentSection(),
      this.scrollManager.getCurrentSubStep(),
      deltaTime
    );
    
    this.scene.updatePointLightPosition(this.camera.position.z);
    
    this.renderer.render(this.scene.getScene(), this.camera.getCamera());
  }
  
  dispose() {
    console.log('🧹 Disposing Portfolio app...');
    
    this.isInitialized = false;
    
    if (this.aboutSectionCheckInterval) {
      clearInterval(this.aboutSectionCheckInterval);
      this.aboutSectionCheckInterval = null;
    }
    
    if (this.introManager) {
      this.introManager.dispose();
    }
    
    if (this.uiManager) {
      this.uiManager.dispose();
    }
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    if (this.timelineManager) {
      this.timelineManager.dispose();
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
});

window.addEventListener('beforeunload', () => {
  if (window.portfolioApp) {
    window.portfolioApp.dispose();
  }
});

export default PortfolioApp;
