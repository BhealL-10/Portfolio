/**
 * Main.js - Point d'entrée du portfolio
 * Portfolio 3D V2.0 - Scroll Virtuel
 * 
 * Architecture:
 * - Scroll virtuel sans scrollbar (0 → 1)
 * - Timeline GSAP pilotée par scroll
 * - Shards avec 3 facettes
 * - Physique et drag & drop
 * - Thème light/dark
 */

import { SCROLL, CAMERA } from './config/constants.js';
import { Scene } from './core/Scene.js';
import { Camera } from './core/Camera.js';
import { Renderer } from './core/Renderer.js';
import { ScrollManager } from './core/ScrollManager.js';
import { TimelineManager } from './core/TimelineManager.js';
import { ShardManager } from './shards/ShardManager.js';
import { RaycastManager } from './interaction/RaycastManager.js';
import { FocusController } from './interaction/FocusController.js';
import { ThemeSwitch } from './ui/ThemeSwitch.js';
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
    
    // Timing
    this.clock = null;
    this.lastTime = 0;
    
    // État
    this.isPaused = false;
  }
  
  /**
   * Initialisation
   */
  async init() {
    try {
      console.log('🚀 Initialisation Portfolio 3D V2.0...');
      
      // Clock
      this.clock = { start: performance.now() };
      this.lastTime = 0;
      
      // Core Three.js
      this.scene = new Scene();
      this.camera = new Camera();
      this.renderer = new Renderer();
      
      // Theme Switch (créer AVANT l'intro pour qu'il soit visible)
      this.themeSwitch = new ThemeSwitch(null, null);
      
      // Vérifier si on doit afficher l'intro
      const forceReset = this.detectForceRefresh();
      
      // Simple Intro Manager (Canvas 2D pur)
      this.introManager = new SimpleIntroManager();
      
      const shouldShowIntro = this.introManager.shouldShowIntro(forceReset);
      
      if (shouldShowIntro) {
        // Augmenter z-index du bouton thème
        if (this.themeSwitch.toggleButton) {
          this.themeSwitch.toggleButton.style.zIndex = '10001';
        }
        
        // Démarrer l'intro simple (Canvas 2D)
        this.introManager.onComplete = async () => {
          await this.startMainExperience();
          // Animation de transition post-intro (2 secondes)
          this.playPostIntroAnimation();
        };
        this.introManager.start();
        
        this.isInitialized = true;
        console.log('✅ Simple intro démarrée');
        return;
      }
      
      // Sinon, démarrer directement l'expérience principale
      await this.startMainExperience();
      
    } catch (error) {
      console.error('❌ Erreur initialisation:', error);
      this.showError(error);
    }
  }
  
  /**
   * Détecter Ctrl+F5 ou Shift+R (force refresh)
   */
  detectForceRefresh() {
    // Vérifier si performance.navigation existe (deprecated mais encore supporté)
    if (performance.navigation && performance.navigation.type === 1) {
      return true;
    }
    
    // Vérifier via PerformanceNavigationTiming
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0) {
      const navEntry = navEntries[0];
      return navEntry.type === 'reload';
    }
    
    return false;
  }
  
  /**
   * Démarrer l'expérience principale (après intro ou si déjà complétée)
   */
  async startMainExperience() {
    console.log('🎮 Démarrage expérience principale...');
    
    // Shard Manager (créer seulement si pas déjà créé)
    if (!this.shardManager) {
      this.shardManager = new ShardManager(this.scene.instance, this.camera.instance);
      await this.shardManager.generateShards();
      
      // Mettre à jour le ThemeSwitch avec les références
      if (this.themeSwitch) {
        this.themeSwitch.scene = this.scene;
        this.themeSwitch.shardManager = this.shardManager;
        // Appliquer le thème initial
        this.themeSwitch.applyTheme();
      }
    }
    
    // Finaliser la configuration
    this.completeMainExperienceSetup();
  }
  
  /**
   * Animation de transition post-intro
   */
  playPostIntroAnimation() {
    console.log('🎬 Animation post-intro - caméra...');
    
    // Attendre un court instant pour que le canvas soit bien supprimé
    setTimeout(() => {
      // Position de départ de la caméra (très loin)
      const startZ = CAMERA.POST_INTRO_START_Z;
      this.camera.teleportTo(startZ);
      
      console.log('📍 Position caméra départ:', startZ);
      
      // Rendre les shards visibles immédiatement
      if (this.shardManager && this.shardManager.shards) {
        console.log('👁️ Affichage des shards:', this.shardManager.shards.length);
        this.shardManager.shards.forEach(shard => {
          shard.visible = true;
          if (shard.material) {
            shard.material.opacity = 1;
            shard.material.transparent = false;
            shard.material.depthWrite = true;
          }
        });
      }
      
      // S'assurer que l'animation loop est active
      if (!this.animationId) {
        console.log('⚠️ Animation loop non active, démarrage...');
        this.animate();
      }
      
      console.log('✅ Animation post-intro prête - scroll actif');
    }, 100); // Délai de 100ms pour la transition
  }
  
  /**
   * Finalise la configuration après l'intro ou directement
   */
  completeMainExperienceSetup() {
    console.log('🔧 Finalisation de l\'expérience...');
    
    // Scroll Manager (créer si pas déjà créé)
    if (!this.scrollManager) {
      this.scrollManager = new ScrollManager();
      this.scrollManager.setTotalSections(projects.length);
    }
    
    // S'assurer que les shards sont visibles
    if (this.shardManager) {
      this.shardManager.shards.forEach(shard => {
        if (shard.mesh && shard.mesh.material) {
          shard.mesh.material.opacity = 1;
        }
      });
    }
    
    // Timeline Manager
    this.timelineManager = new TimelineManager();
    this.timelineManager.init(this.shardManager.getAllShards());
    
    // Raycast Manager
    this.raycastManager = new RaycastManager(this.camera.instance);
    this.raycastManager.setShards(this.shardManager.getAllShards());
    
    // Focus Controller
    this.focusController = new FocusController(
      this.camera,
      this.shardManager,
      this.timelineManager
    );
    
    // Mettre à jour le ThemeSwitch avec les références
    this.themeSwitch.scene = this.scene;
    this.themeSwitch.shardManager = this.shardManager;
    
    // Setup interactions
    this.setupInteractions();
    this.setupCallbacks();
    
    // Créer l'UI
    this.createUI();
    
    // Démarrer la boucle de rendu si pas déjà démarrée
    if (!this.animationId) {
      this.animate();
    }
    
    // Exposer globalement pour debug
    window.portfolio3D = this;
    
    this.isInitialized = true;
    console.log('✅ Portfolio 3D V2.0 initialisé');
  }
  
  /**
   * Configure les interactions (drag & drop, hover, click)
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
        // Si déjà focus, unfocus
        this.focusController.unfocus();
      } else {
        // Focus sur le shard
        this.focusController.focus(shard, this.scrollManager.getScroll());
      }
    };
    
    // Background click
    this.raycastManager.onBackgroundClick = () => {
      if (this.focusController.isFocused()) {
        this.focusController.unfocus();
      }
    };
    
    // Drag start
    this.raycastManager.onShardDragStart = (shard) => {
      if (this.focusController.isFocused()) return;
      this.shardManager.startDrag(shard);
    };
    
    // Drag
    this.raycastManager.onShardDrag = (shard, worldPosition) => {
      this.shardManager.updateDrag(shard, worldPosition);
    };
    
    // Drag end
    this.raycastManager.onShardDragEnd = (shard) => {
      this.shardManager.endDrag(shard);
    };
    
    // Keyboard
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.focusController.isFocused()) {
        this.focusController.unfocus();
      }
      
      // Facette navigation avec Q/E
      if (this.focusController.isFocused()) {
        if (e.key === 'q' || e.key === 'Q') {
          this.focusController.changeFacette(-1);
        } else if (e.key === 'e' || e.key === 'E') {
          this.focusController.changeFacette(1);
        }
      }
    });
  }
  
  /**
   * Configure les callbacks
   */
  setupCallbacks() {
    // Scroll change
    this.scrollManager.onScrollChange = (scroll, velocity) => {
      // Vérifier si on doit unfocus
      this.focusController.checkScrollUnfocus(scroll);
    };
    
    // Section change - Log simple (pas d'animation complexe)
    this.scrollManager.onSectionChange = (newSection, oldSection) => {
      console.log(`🎯 Section: ${oldSection} → ${newSection}`);
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
   * Crée l'UI
   */
  createUI() {
    // Indicateur de scroll
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = `
      <div class="scroll-progress"></div>
    `;
    scrollIndicator.style.cssText = `
      position: fixed;
      bottom: 35px;
      left: 95%;
      transform: translateX(-50%);
      z-index: 100;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      opacity: 0.7;
      transition: opacity 0.3s;
    `;
    document.body.appendChild(scrollIndicator);
    
    // Section indicator
    const sectionIndicator = document.createElement('div');
    sectionIndicator.className = 'section-indicator';
    sectionIndicator.style.cssText = `
      position: fixed;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
      display: flex;
      flex-direction: column;
      gap: 8px;
    `;
    
    // Dots pour chaque section
    projects.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'section-dot';
      dot.dataset.index = i;
      dot.style.cssText = `
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--text-secondary, rgba(255,255,255,0.3));
        cursor: pointer;
        transition: transform 0.3s, background 0.3s;
      `;
      dot.addEventListener('click', () => {
        this.scrollManager.scrollToSection(i);
      });
      sectionIndicator.appendChild(dot);
    });
    
    document.body.appendChild(sectionIndicator);
    this.sectionIndicator = sectionIndicator;
  }
  
  /**
   * Boucle de rendu principale
   */
  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    if (this.isPaused) return;
    
    // Vérifier que le renderer existe
    if (!this.renderer || !this.renderer.instance) {
      console.error('❌ Renderer not available, stopping animation');
      return;
    }
    
    // Delta time
    const currentTime = (performance.now() - this.clock.start) / 1000;
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    // Pas besoin d'update intro - elle gère son propre loop Canvas
    
    // Update scroll (retourne la valeur lissée)
    if (this.scrollManager) {
      const scroll = this.scrollManager.update();
      
      // Update camera position based on scroll
      this.camera.updateFromScroll(scroll, this.shardManager.getTotalShards());
      this.camera.update();
      
      // Update shards
      this.shardManager.update(scroll, deltaTime);
      
      // Update scene lights (suit toujours la caméra)
      this.scene.updatePointLight(this.camera.instance.position);
      
      // Update section indicator
      this.updateSectionIndicator();
    } else {
      // Même sans scrollManager, update la caméra
      this.camera.update();
    }
    
    // RENDER - Appelé à chaque frame, affiche la position actuelle de la caméra
    // C'est ici que l'animation devient visible
    this.renderer.render(this.scene.instance, this.camera.instance);
  }
  
  /**
   * Met à jour l'indicateur de section
   */
  updateSectionIndicator() {
    if (!this.sectionIndicator) return;
    
    const currentIndex = this.shardManager.getCurrentIndex();
    const dots = this.sectionIndicator.querySelectorAll('.section-dot');
    
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.style.background = 'var(--accent, #4a90d9)';
        dot.style.transform = 'scale(1.3)';
      } else {
        dot.style.background = 'var(--text-secondary, rgba(255,255,255,0.3))';
        dot.style.transform = 'scale(1)';
      }
    });
  }
  
  /**
   * Pause/Resume
   */
  pause() {
    this.isPaused = true;
  }
  
  resume() {
    this.isPaused = false;
  }
  
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
      background: rgba(255,0,0,0.9);
      color: white;
      padding: 20px;
      border-radius: 10px;
      z-index: 9999;
      max-width: 80%;
      text-align: center;
    `;
    errorDiv.innerHTML = `
      <h2>Erreur de chargement</h2>
      <p>${error.message}</p>
    `;
    document.body.appendChild(errorDiv);
  }
  
  /**
   * Dispose des ressources
   */
  dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.timelineManager.dispose();
    this.scene.dispose();
    this.renderer.dispose();
  }
}

// ==========================================
// INITIALISATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const portfolio = new Portfolio3D();
  portfolio.init();
});
