/**
 * Main.js - Point d'entrée du portfolio
 * Portfolio 3D V3.0 - Système Immersif Optimisé
 * 
 * Architecture:
 * - Dual canvas (2D intro + Three.js toujours actif)
 * - Scroll virtuel avec sous-étapes (0 → 1.2)
 * - 10 shards constamment visibles
 * - Boucle infinie et déplacement continu
 * - Sections About/Contact après dernier shard
 */

import { SCROLL, CAMERA, SHARD } from './config/constants.js';
import { Scene } from './core/Scene.js';
import { Camera } from './core/Camera.js';
import { Renderer } from './core/Renderer.js';
import { ScrollManager } from './core/ScrollManager.js';
import { TimelineManager } from './core/TimelineManager.js';
import { ShardManager } from './shards/ShardManager.js';
import { RaycastManager } from './interaction/RaycastManager.js';
import { FocusController } from './interaction/FocusController.js';
import { ThemeSwitch } from './ui/ThemeSwitch.js';
import { UIManager } from './ui/UIManager.js';
import { SimpleIntroManager } from './intro/SimpleIntroManager.js';
import { projects } from './data/projects.js';

class Portfolio3D {
  constructor() {
    this.isInitialized = false;
    this.animationId = null;
    
    // Core Three.js
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    
    // Managers
    this.introManager = null;
    this.scrollManager = null;
    this.timelineManager = null;
    this.shardManager = null;
    this.raycastManager = null;
    this.focusController = null;
    this.themeSwitch = null;
    this.uiManager = null;
    
    // Timing
    this.clock = null;
    this.lastTime = 0;
    
    // État
    this.isPaused = false;
    this.isIntroComplete = false;
  }
  
  /**
   * Initialisation
   */
  async init() {
    try {
      console.log('🚀 Portfolio 3D V3.0 - Initializing...');
      
      // Clock
      this.clock = { start: performance.now() };
      this.lastTime = 0;
      
      // Core Three.js - Toujours initialisé
      this.scene = new Scene();
      this.camera = new Camera();
      this.renderer = new Renderer();
      
      // UI Manager
      this.uiManager = new UIManager();
      
      // Theme Switch
      this.themeSwitch = new ThemeSwitch(null, null);
      
      // Démarrer le rendu Three.js immédiatement (mais derrière le canvas 2D)
      this.startRenderLoop();
      
      // Vérifier intro
      const forceReset = this.detectForceRefresh();
      this.introManager = new SimpleIntroManager();
      
      const shouldShowIntro = this.introManager.shouldShowIntro(forceReset);
      
      if (shouldShowIntro) {
        console.log('🎬 Starting intro sequence...');
        
        // ThemeSwitch au-dessus de l'intro
        if (this.themeSwitch.toggleButton) {
          this.themeSwitch.toggleButton.style.zIndex = '10001';
        }
        
        // Callback de fin d'intro
        this.introManager.onComplete = async () => {
          await this.onIntroComplete();
        };
        
        // Progress callback pour révéler progressivement Three.js
        this.introManager.onProgress = (percent) => {
          // Révéler Three.js progressivement pendant l'intro
          // (optionnel - le canvas 2D est opaque par défaut)
        };
        
        this.introManager.start();
        
        // Générer les shards en arrière-plan
        await this.prepareMainExperience();
        
      } else {
        // Pas d'intro - démarrer directement
        await this.startMainExperience();
      }
      
      this.isInitialized = true;
      
    } catch (error) {
      console.error('❌ Initialization error:', error);
      this.showError(error);
    }
  }
  
  /**
   * Détecter force refresh
   */
  detectForceRefresh() {
    if (performance.navigation && performance.navigation.type === 1) {
      return true;
    }
    
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0) {
      return navEntries[0].type === 'reload';
    }
    
    return false;
  }
  
  /**
   * Prépare l'expérience principale (pendant l'intro)
   */
  async prepareMainExperience() {
    console.log('🔧 Preparing main experience in background...');
    
    // Créer ShardManager
    this.shardManager = new ShardManager(this.scene.instance, this.camera.instance);
    await this.shardManager.generateShards();
    
    // Les shards ont déjà opacity=0 depuis ShardGenerator
    // Pas besoin de les masquer à nouveau
    
    // Mettre à jour ThemeSwitch
    this.themeSwitch.scene = this.scene;
    this.themeSwitch.shardManager = this.shardManager;
    this.themeSwitch.applyTheme();
    
    console.log('✅ Main experience prepared');
  }
  
  /**
   * Appelé quand l'intro est terminée
   */
  async onIntroComplete() {
    console.log('🎮 Intro complete - transitioning to main experience...');
    this.isIntroComplete = true;
    
    // Si les shards ne sont pas encore prêts, les préparer
    if (!this.shardManager) {
      await this.prepareMainExperience();
    }
    
    // Animation de transition post-intro
    this.playPostIntroAnimation();
  }
  
  /**
   * Démarre l'expérience principale directement
   */
  async startMainExperience() {
    console.log('🎮 Starting main experience directly...');
    this.isIntroComplete = true;
    
    // ShardManager
    this.shardManager = new ShardManager(this.scene.instance, this.camera.instance);
    await this.shardManager.generateShards();
    
    // ThemeSwitch
    this.themeSwitch.scene = this.scene;
    this.themeSwitch.shardManager = this.shardManager;
    this.themeSwitch.applyTheme();
    
    // Finaliser
    this.completeMainExperienceSetup();
  }
  
  /**
   * Animation post-intro
   */
  playPostIntroAnimation() {
    console.log('🎬 Playing post-intro camera animation...');
    
    // Position initiale: DERRIÈRE le premier shard (-60)
    // Caméra à -120 pour être bien derrière
    const startZ = -120;
    this.camera.teleportTo(startZ);
    
    // Afficher les shards avec fade in
    const shards = this.shardManager.getAllShards();
    
    if (window.gsap) {
      // Animation caméra: AVANCE vers -100 (position de départ du scroll)
      const targetZ = -100;
      
      window.gsap.to(this.camera.targetPosition, {
        z: targetZ,
        duration: 2.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          this.camera.lookAtTarget.z = this.camera.targetPosition.z + CAMERA.LOOK_AHEAD;
        }
      });
      
      // Fade in des shards en cascade avec scale animation
      shards.forEach((shard, index) => {
        const baseScale = shard.userData.baseScale.x;
        const startScale = SHARD.STATES.IDLE.scale * baseScale * 0.3;
        const targetScale = SHARD.STATES.IDLE.scale * baseScale;
        
        // Reset scale pour animation
        shard.scale.set(startScale, startScale, startScale);
        
        // Animate opacity
        window.gsap.to(shard.material, {
          opacity: SHARD.STATES.IDLE.opacity,
          duration: 1.0,
          delay: 0.5 + index * 0.1,
          ease: 'power2.out'
        });
        
        // Animate scale
        window.gsap.to(shard.scale, {
          x: targetScale,
          y: targetScale,
          z: targetScale,
          duration: 1.2,
          delay: 0.5 + index * 0.1,
          ease: 'back.out(1.2)'
        });
      });
      
      // Finaliser après l'animation
      setTimeout(() => {
        this.completeMainExperienceSetup();
      }, 3000);
      
    } else {
      // Fallback sans GSAP
      shards.forEach(shard => {
        shard.material.opacity = SHARD.STATES.IDLE.opacity;
        const baseScale = shard.userData.baseScale.x;
        const targetScale = SHARD.STATES.IDLE.scale * baseScale;
        shard.scale.set(targetScale, targetScale, targetScale);
      });
      this.camera.teleportTo(-100);
      this.completeMainExperienceSetup();
    }
  }
  
  /**
   * Finalise la configuration
   */
  completeMainExperienceSetup() {
    console.log('🔧 Completing main experience setup...');
    
    // ScrollManager
    this.scrollManager = new ScrollManager();
    this.scrollManager.setTotalSections(projects.length);
    
    // TimelineManager
    this.timelineManager = new TimelineManager();
    this.timelineManager.init(this.shardManager.getAllShards());
    
    // RaycastManager
    this.raycastManager = new RaycastManager(this.camera.instance);
    this.raycastManager.setShards(this.shardManager.getAllShards());
    
    // FocusController
    this.focusController = new FocusController(
      this.camera,
      this.shardManager,
      this.timelineManager
    );
    
    // Camera setup
    this.camera.setTotalShards(projects.length);
    
    // Setup interactions et callbacks
    this.setupInteractions();
    this.setupCallbacks();
    
    // UI navigation
    this.uiManager.setupNavigation(this.scrollManager);
    
    // Exposer globalement
    window.portfolio3D = this;
    
    console.log('✅ Portfolio 3D V3.0 fully initialized');
  }
  
  /**
   * Configure les interactions
   */
  setupInteractions() {
    // Hover
    this.raycastManager.onShardHover = (shard) => {
      if (this.focusController.isFocused()) return;
      
      if (shard) {
        this.shardManager.setHover(shard);
        document.body.style.cursor = 'pointer';
      } else {
        this.shardManager.clearHover();
        document.body.style.cursor = 'default';
      }
    };
    
    // Click
    this.raycastManager.onShardClick = (shard) => {
      if (this.focusController.isFocused()) {
        this.focusController.unfocus();
      } else {
        this.focusController.focus(shard, this.scrollManager.getScroll());
      }
    };
    
    // Background click
    this.raycastManager.onBackgroundClick = () => {
      if (this.focusController.isFocused()) {
        this.focusController.unfocus();
      }
    };
    
    // Drag
    this.raycastManager.onShardDragStart = (shard) => {
      if (this.focusController.isFocused()) return;
      this.shardManager.startDrag(shard);
    };
    
    this.raycastManager.onShardDrag = (shard, worldPosition) => {
      this.shardManager.updateDrag(shard, worldPosition);
    };
    
    this.raycastManager.onShardDragEnd = (shard) => {
      this.shardManager.endDrag(shard);
    };
    
    // Keyboard
    window.addEventListener('keydown', (e) => {
      // Escape pour unfocus
      if (e.key === 'Escape' && this.focusController.isFocused()) {
        this.focusController.unfocus();
      }
      
      // Q/E pour navigation facettes
      if (this.focusController.isFocused()) {
        if (e.key === 'q' || e.key === 'Q') {
          this.focusController.changeFacette(-1);
        } else if (e.key === 'e' || e.key === 'E') {
          this.focusController.changeFacette(1);
        }
      }
      
      // Skip intro avec Entrée
      if (e.key === 'Enter' && this.introManager?.isActive) {
        this.introManager.skip();
      }
    });
  }
  
  /**
   * Configure les callbacks
   */
  setupCallbacks() {
    // Scroll change
    this.scrollManager.onScrollChange = (scroll, velocity) => {
      this.focusController.checkScrollUnfocus(scroll);
      this.uiManager.updateScrollProgress(scroll);
    };
    
    // Section change
    this.scrollManager.onSectionChange = (newSection, oldSection) => {
      console.log(`🎯 Section: ${oldSection} → ${newSection}`);
      this.uiManager.updateSectionIndicator(newSection);
    };
    
    // SubStep change (pour auto-focus précis)
    this.scrollManager.onSubStepChange = (newSubStep, oldSubStep, section) => {
      // Le FocusController gère l'auto-focus basé sur les sous-étapes
    };
    
    // About section enter/leave
    this.scrollManager.onAboutSectionEnter = () => {
      this.uiManager.showAboutSection();
    };
    
    this.scrollManager.onAboutSectionLeave = () => {
      this.uiManager.hideAboutSection();
    };
    
    // Focus events
    this.focusController.onFocusStart = (shard) => {
      this.scrollManager.lock();
    };
    
    this.focusController.onUnfocusComplete = (shard) => {
      this.scrollManager.unlock();
    };
  }
  
  /**
   * Démarre le render loop
   */
  startRenderLoop() {
    if (this.animationId) return;
    this.animate();
  }
  
  /**
   * Boucle de rendu principale
   */
  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    if (this.isPaused) return;
    if (!this.renderer?.instance) return;
    
    // Delta time
    const currentTime = (performance.now() - this.clock.start) / 1000;
    const deltaTime = Math.min(currentTime - this.lastTime, 0.1); // Cap à 100ms
    this.lastTime = currentTime;
    
    // Si l'intro n'est pas terminée, juste render la scène
    if (!this.isIntroComplete) {
      this.renderer.render(this.scene.instance, this.camera.instance);
      return;
    }
    
    // Update scroll
    if (this.scrollManager) {
      const scroll = this.scrollManager.update();
      const shardScroll = this.scrollManager.getShardProgress();
      
      // Update camera
      this.camera.updateFromScroll(
        shardScroll,
        this.shardManager.getTotalShards(),
        this.shardManager.getCurrentIndex()
      );
      this.camera.update(deltaTime);
      
      // Update shards
      this.shardManager.update(shardScroll, deltaTime);
      
      // Update focus controller
      if (this.focusController) {
        this.focusController.update(
          this.shardManager.getCurrentIndex(),
          this.scrollManager.getCurrentSubStep()
        );
      }
      
      // Update scene lights
      this.scene.updatePointLight(this.camera.instance.position);
    } else {
      this.camera.update(deltaTime);
    }
    
    // Render
    this.renderer.render(this.scene.instance, this.camera.instance);
  }
  
  /**
   * Pause/Resume
   */
  pause() { this.isPaused = true; }
  resume() { this.isPaused = false; }
  
  /**
   * Affiche une erreur
   */
  showError(error) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(220,50,50,0.95);
      color: white;
      padding: 30px 40px;
      border-radius: 12px;
      z-index: 9999;
      max-width: 80%;
      text-align: center;
      font-family: system-ui, sans-serif;
    `;
    errorDiv.innerHTML = `
      <h2 style="margin:0 0 15px 0;">Erreur de chargement</h2>
      <p style="margin:0;opacity:0.9;">${error.message}</p>
    `;
    document.body.appendChild(errorDiv);
  }
  
  /**
   * Dispose
   */
  dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.introManager?.dispose();
    this.timelineManager?.dispose();
    this.uiManager?.dispose();
    this.scene?.dispose();
    this.renderer?.dispose();
  }
}

// ==========================================
// INITIALISATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const portfolio = new Portfolio3D();
  portfolio.init();
});

// Export pour debug
export { Portfolio3D };
