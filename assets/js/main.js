/**
 * Main.js - Point d'entrée principal
 * Portfolio 3D V3.0 - Orchestration améliorée
 */

import { Camera } from './core/Camera.js';
import { Scene } from './core/Scene.js';
import { Renderer } from './core/Renderer.js';
import { ScrollManager } from './core/ScrollManager.js';
import { TimelineManager } from './core/TimelineManager.js';
import { ShardManager } from './shards/ShardManager.js';
import { RaycastManager } from './interaction/RaycastManager.js';
import { FocusController } from './interaction/FocusController.js';
import { SimpleIntroManager } from './intro/SimpleIntroManager.js';
import { UIManager } from './ui/UIManager.js';
import { ThemeSwitch } from './ui/ThemeSwitch.js';
import { CAMERA, SHARD, INTRO } from './config/constants.js';

class PortfolioApp {
  constructor() {
    this.isInitialized = false;
    this.isIntroComplete = false;
    this.animationFrameId = null;
    this.lastTime = 0;
    
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.scrollManager = null;
    this.timelineManager = null;
    this.shardManager = null;
    this.raycastManager = null;
    this.focusController = null;
    this.introManager = null;
    this.uiManager = null;
    this.themeSwitch = null;
  }
  
  async init() {
    console.log('🚀 Initializing Portfolio 3D V3.0...');
    
    try {
      this.initCore();
      this.initManagers();
      await this.initShards();
      this.initInteraction();
      this.initUI();
      this.setupCallbacks();
      
      this.isInitialized = true;
      console.log('✅ Portfolio initialized successfully');
      
      this.checkIntroOrStart();
      
    } catch (error) {
      console.error('❌ Initialization failed:', error);
    }
  }
  
  initCore() {
    this.scene = new Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.scrollManager = new ScrollManager();
    this.timelineManager = new TimelineManager();
    
    console.log('✅ Core modules initialized');
  }
  
  initManagers() {
    this.shardManager = new ShardManager(this.scene.instance, this.camera.instance);
    this.shardManager.scrollManager = this.scrollManager;
    
    this.raycastManager = new RaycastManager(this.camera.instance);
    
    this.focusController = new FocusController(
      this.camera,
      this.shardManager,
      this.timelineManager
    );
    this.focusController.setScrollManager(this.scrollManager);
    
    console.log('✅ Managers initialized');
  }
  
  async initShards() {
    await this.shardManager.generateShards();
    
    this.raycastManager.setShards(this.shardManager.getAllShards());
    
    this.scrollManager.setTotalSections(this.shardManager.getTotalShards());
    this.camera.setTotalShards(this.shardManager.getTotalShards());
    
    this.timelineManager.init(this.shardManager.getAllShards());
    
    console.log('✅ Shards generated');
  }
  
  initInteraction() {
    this.raycastManager.onShardHover = (shard) => {
      if (shard) {
        this.shardManager.setHover(shard);
        document.body.style.cursor = 'pointer';
      } else {
        this.shardManager.clearHover();
        document.body.style.cursor = 'default';
      }
    };
    
    this.raycastManager.onShardClick = (shard) => {
      if (this.focusController.isFocused()) {
        this.focusController.unfocus();
      } else {
        this.focusController.focus(shard);
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
    
    this.raycastManager.onBackgroundClick = () => {
      if (this.focusController.isFocused()) {
        this.focusController.unfocus();
      }
    };
    
    console.log('✅ Interactions initialized');
  }
  
  initUI() {
    this.uiManager = new UIManager();
    this.themeSwitch = new ThemeSwitch(this.scene, this.shardManager);
    
    this.uiManager.setupNavigation(this.scrollManager);
    
    console.log('✅ UI initialized');
  }
  
  setupCallbacks() {
    this.scrollManager.onSectionChange = (newSection, oldSection) => {
      this.uiManager.updateSectionIndicator(newSection);
    };
    
    this.scrollManager.onScrollChange = (scroll) => {
      this.uiManager.updateScrollProgress(scroll);
    };
    
    this.scrollManager.onAboutSectionEnter = () => {
      this.uiManager.showAboutSection();
    };
    
    this.scrollManager.onAboutSectionLeave = () => {
      this.uiManager.hideAboutSection();
    };
    
    this.focusController.onLastShardVisited = () => {
      console.log('🎉 All shards visited - unlocking About section');
    };
  }
  
  checkIntroOrStart() {
    this.introManager = new SimpleIntroManager();
    
    if (this.introManager.shouldShowIntro()) {
      this.startWithIntro();
    } else {
      this.startWithoutIntro();
    }
  }
  
  startWithIntro() {
    console.log('🎬 Starting with intro...');
    
    this.camera.teleportTo(CAMERA.INITIAL_Z);
    
    this.shardManager.getAllShards().forEach(shard => {
      shard.material.opacity = 0;
    });
    
    this.introManager.onComplete = () => {
      console.log('✅ Intro complete - transitioning to main experience');
      this.transitionToMainExperience();
    };
    
    this.introManager.onProgress = (progress) => {
      // Optional: Could fade in shards during intro
    };
    
    this.introManager.start();
    
    this.startRenderLoop();
  }
  
  startWithoutIntro() {
    console.log('⏭️ Skipping intro...');
    
    this.isIntroComplete = true;
    
    const firstShardZ = -SHARD.Z_SPACING - 40;
    this.camera.teleportTo(firstShardZ);
    
    this.shardManager.getAllShards().forEach(shard => {
      shard.material.opacity = SHARD.STATES.IDLE.opacity;
    });
    
    this.uiManager.transformIndicatorToScrollMode();
    
    this.startRenderLoop();
  }
  
  transitionToMainExperience() {
    this.isIntroComplete = true;
    
    const targetZ = -SHARD.Z_SPACING - 40;
    
    this.uiManager.transformIndicatorToScrollMode();
    
    if (window.gsap) {
      this.camera.animateTo(targetZ, 2.0);
      
      this.shardManager.getAllShards().forEach((shard, index) => {
        window.gsap.to(shard.material, {
          opacity: SHARD.STATES.IDLE.opacity,
          duration: 1.5,
          delay: 0.1 * index,
          ease: 'power2.out'
        });
      });
    } else {
      this.camera.teleportTo(targetZ);
      this.shardManager.getAllShards().forEach(shard => {
        shard.material.opacity = SHARD.STATES.IDLE.opacity;
      });
    }
  }
  
  startRenderLoop() {
    this.lastTime = performance.now();
    this.render();
  }
  
  render() {
    this.animationFrameId = requestAnimationFrame(() => this.render());
    
    const now = performance.now();
    const deltaTime = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;
    
    if (this.isIntroComplete) {
      const scrollProgress = this.scrollManager.update();
      
      this.camera.updateFromScroll(
        scrollProgress,
        this.shardManager.getTotalShards(),
        this.scrollManager.getCurrentSection()
      );
      this.camera.update(deltaTime);
      
      this.shardManager.update(scrollProgress, deltaTime);
      
      this.focusController.update(
        this.scrollManager.getCurrentSection(),
        this.scrollManager.getCurrentSubStep(),
        deltaTime
      );
      
      this.scene.updatePointLight(this.camera.instance.position);
    }
    
    this.renderer.render(this.scene.instance, this.camera.instance);
  }
  
  dispose() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    this.timelineManager?.dispose();
    this.renderer?.dispose();
    this.scene?.dispose();
    this.uiManager?.dispose();
    this.introManager?.dispose();
    
    console.log('🧹 Portfolio disposed');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
  window.portfolioApp.init();
});

export { PortfolioApp };
