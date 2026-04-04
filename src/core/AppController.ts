import * as THREE from 'three';
import type { AppEntryRoute } from './AppEntryRoute';
import { ContentService } from '../data/ContentService';
import type { GameHUDSystem } from '../game/GameHUDSystem';
import type { GameAudioSystem } from '../game/GameAudioSystem';
import type { primateriePortal, primaterieModeId } from '../game/PrimatriePortal';
import type { GameSessionController } from '../game/GameSessionController';
import { DragCameraOrbitController } from '../portfolio/DragCameraOrbitController';
import { IntroVoronoiSystem } from '../portfolio/IntroVoronoiSystem';
import { OrbitWorldSystem } from '../portfolio/OrbitWorldSystem';
import { SecretSlotSystem } from '../portfolio/SecretSlotSystem';
import { ShardInteractionSystem } from '../portfolio/ShardInteractionSystem';
import { MusicReactiveBackdrop } from '../render/MusicReactiveBackdrop';
import { ParallaxLayerSystem } from '../render/ParallaxLayerSystem';
import { WorldRenderer } from '../render/WorldRenderer';
import { AboutSectionSystem } from '../ui/AboutSectionSystem';
import { FocusPresentationSystem } from '../ui/FocusPresentationSystem';
import { GuideBubbleSystem } from '../ui/GuideBubbleSystem';
import { I18nService } from '../ui/I18nService';
import { NavigationHUD } from '../ui/NavigationHUD';
import { ThemeService } from '../ui/ThemeService';
import { ModeController } from './ModeController';
import {
  isFocusMode,
  isGameRuntimeMode,
  isIntroMode,
  isPortfolioBrowseMode,
  isPortfolioInteractionMode,
  isprimaterieMode
} from './appModePredicates';
import { applyRuntimeDeviceAttributes, getRuntimeDeviceState, isMobilePortraitRuntime, isMobileRuntime } from './device';
import { damp, wrapIndex } from './math';
import { RenderLoop } from './RenderLoop';
import { TransitionSystem } from './TransitionSystem';

const ACCENT_COLOR_CYCLE = ['#75AF80', '#FF4545', '#49BCFF', '#8AEBEF'] as const;
const ACCENT_COLOR_HOLD_SECONDS = 10;
const ACCENT_COLOR_BLEND_SECONDS = 1;
const PORTFOLIO_TO_GAME_ROTATE_PHASE_END = 0.08;
const PORTFOLIO_TO_GAME_HOLD_PHASE_END = 0.16;
const PORTFOLIO_TO_GAME_SHARD_DRIFT_START = 0.04;
const primaterie_TO_GAME_CINEMATIC_FOCUS_END = 0.12;
const primaterie_TO_GAME_CINEMATIC_HOLD_END = 0.28;

type ProjectGameHudPayload = typeof import('../game/projectGameHudPayload').projectGameHudPayload;

interface LoadedGameRuntime {
  game: GameSessionController;
  audio: GameAudioSystem;
  gameHud: GameHUDSystem;
  primateriePortal: primateriePortal;
  projectGameHudPayload: ProjectGameHudPayload;
  miniGamePortalCameraOffset: THREE.Vector3;
}

export class AppController {
  private readonly content = new ContentService();
  private readonly theme = new ThemeService();
  private readonly i18n = new I18nService();
  private readonly mode = new ModeController();
  private readonly transitions = new TransitionSystem();
  private readonly root: HTMLDivElement;
  private readonly canvasHost: HTMLDivElement;
  private readonly uiHost: HTMLDivElement;
  private readonly renderer: WorldRenderer;
  private readonly musicBackdrop: MusicReactiveBackdrop;
  private readonly parallaxLayers: ParallaxLayerSystem;
  private readonly slotSystem: SecretSlotSystem;
  private readonly world: OrbitWorldSystem;
  private readonly intro: IntroVoronoiSystem;
  private readonly guide: GuideBubbleSystem;
  private readonly hud: NavigationHUD;
  private readonly about: AboutSectionSystem;
  private readonly focus: FocusPresentationSystem;
  private readonly rotateOverlay: HTMLDivElement;
  private readonly portfolioOrientationOverlay: HTMLDivElement;
  private readonly gameTransitionBlurOverlay: HTMLDivElement;
  private readonly interaction: ShardInteractionSystem;
  private readonly loop: RenderLoop;
  private readonly cameraOrbit = new DragCameraOrbitController();
  private readonly introStartCameraPosition = new THREE.Vector3(0, 1.6, 42);
  private readonly introStartLookAt = new THREE.Vector3(0, 0, 0);
  private cameraFocusBlend = 0;
  private introTransitionProgress = 0;
  private gameTransitionProgress = 0;
  private activeIndex = 0;
  private lastWheelAt = 0;
  private hasFocused = false;
  private hasChangedFacet = false;
  private hasDragged = false;
  private readonly seenFacetsByProject = new Map<string, Set<number>>();
  private pendingPostFocusExit: (() => void) | null = null;
  private gameTransitionTweenId: number | null = null;
  private portfolioCameraRealignTweenId: number | null = null;
  private focusEnterTweenId: number | null = null;
  private mobileChargePointerId: number | null = null;
  private mobileChargeStartY = 0;
  private mobileChargeStartedAt = 0;
  private entryRoute: AppEntryRoute;
  private primaterieReturnProgress = 0;
  private primaterieReturnTweenId: number | null = null;
  private gameTransitionFromprimaterie = false;
  private gameTransitionReturningToHub = false;
  private gameTransitionAnchor: THREE.Vector3 | null = null;
  private gameRuntime: LoadedGameRuntime | null = null;
  private gameRuntimeLoader: Promise<LoadedGameRuntime> | null = null;
  private pendingGameTransitionRequest: { forceDirectEntry: boolean; skipPreAlign: boolean } | null = null;
  private primaterieHubPreloaded = false;
  private primaterieHubPreloadPromise: Promise<void> | null = null;
  private hasObservedUserGesture = false;
  private primateriePendingAction: {
    execute: () => void;
  } | null = null;

  private syncRuntimeDeviceState = () => {
    applyRuntimeDeviceAttributes(document.documentElement);
    applyRuntimeDeviceAttributes(this.root);
    applyRuntimeDeviceAttributes(this.uiHost);
  };

  constructor(host: HTMLElement, options: { entryRoute: AppEntryRoute }) {
    this.entryRoute = options.entryRoute;
    this.root = document.createElement('div');
    this.root.className = 'app-shell';

    this.canvasHost = document.createElement('div');
    this.canvasHost.className = 'app-shell__canvas';

    this.uiHost = document.createElement('div');
    this.uiHost.className = 'app-shell__ui';

    this.root.append(this.canvasHost, this.uiHost);
    host.appendChild(this.root);

    this.renderer = new WorldRenderer(this.canvasHost);
    this.renderer.setTheme(this.theme.current);
    this.musicBackdrop = new MusicReactiveBackdrop(this.renderer.scene, this.theme.current);
    this.parallaxLayers = new ParallaxLayerSystem(
      this.renderer.scene,
      this.renderer.camera,
      this.renderer.renderer,
      this.theme.current
    );
    void this.parallaxLayers.init();
    this.slotSystem = new SecretSlotSystem(
      this.content
        .getProjects()
        .map((project) => project.id)
    );
    this.world = new OrbitWorldSystem(this.renderer.scene, this.content.getProjects(), this.slotSystem, this.theme.current);
    this.hud = new NavigationHUD(this.uiHost, this.i18n, this.content, {
      onThemeToggle: () => this.theme.toggle(),
      onLanguageToggle: () => this.i18n.toggle(),
      onAboutToggle: () => this.toggleAbout(),
      onHome: () => this.returnHome(),
      onProjectSelect: (index) => this.selectProject(index)
    });
    this.about = new AboutSectionSystem(this.uiHost, this.i18n);
    this.focus = new FocusPresentationSystem(this.uiHost, this.i18n, {
      onClose: () => this.exitFocus(),
      onPrevFacet: () => this.changeFacet(-1),
      onNextFacet: () => this.changeFacet(1)
    });
    this.guide = new GuideBubbleSystem(this.uiHost, this.i18n);
    this.intro = new IntroVoronoiSystem(this.uiHost, this.i18n, this.theme);
    this.rotateOverlay = document.createElement('div');
    this.rotateOverlay.className = 'game-rotate-overlay';
    this.rotateOverlay.innerHTML = `
      <div class="game-rotate-overlay__panel">
        <strong class="game-rotate-overlay__title"></strong>
        <p class="game-rotate-overlay__body"></p>
      </div>
    `;
    this.uiHost.appendChild(this.rotateOverlay);
    this.portfolioOrientationOverlay = document.createElement('div');
    this.portfolioOrientationOverlay.className = 'portfolio-rotate-overlay';
    this.portfolioOrientationOverlay.innerHTML = `
      <div class="portfolio-rotate-overlay__panel">
        <strong class="portfolio-rotate-overlay__title"></strong>
        <p class="portfolio-rotate-overlay__body"></p>
      </div>
    `;
    this.uiHost.appendChild(this.portfolioOrientationOverlay);
    this.gameTransitionBlurOverlay = document.createElement('div');
    this.gameTransitionBlurOverlay.className = 'game-transition-blur-overlay';
    this.uiHost.appendChild(this.gameTransitionBlurOverlay);

    this.interaction = new ShardInteractionSystem(
      this.renderer.renderer.domElement,
      this.renderer.camera,
      this.world,
      () => this.mode.current,
      {
        onShardClick: (shardId) => this.enterFocus(shardId),
        onBackgroundClick: () => {
          if (this.mode.is('focus') || this.mode.is('focus_enter') || this.mode.is('focus_facet_transition')) {
            this.exitFocus();
          }
        },
        onHover: (shardId) => this.world.setHovered(shardId),
        onDragStart: (shardId, point) => {
          if (!(this.mode.is('orbit') || this.mode.is('constellation_complete'))) return false;
          const started = this.world.beginDrag(shardId, point);
          if (started) {
            this.mode.setMode('dragging');
            this.world.setHovered(null);
          }
          return started;
        },
        onDragMove: (point) => {
          this.world.updateDrag(point);
        },
        onDragEnd: () => {
          const result = this.world.endDrag();
          if (result.shardId) {
            this.hasDragged = true;
          }
          if (!result.unlocked && this.mode.is('dragging')) {
            this.resumeOrbitMode();
          }
          this.refreshUI();
          this.updateGuide();
        },
        onSceneOrbitMove: (deltaX, deltaY) => {
          if (this.mode.is('orbit') || this.mode.is('constellation_complete')) {
            this.cameraOrbit.orbit(-deltaX, deltaY);
          }
        },
        onFocusRotation: (deltaX) => this.world.previewFacetRotation(deltaX),
        onFocusRotationEnd: () => {
          const direction = this.world.finishFacetRotation();
          if (direction !== 0) {
            this.mode.setMode('focus_facet_transition');
            this.focus.beginFacetTransition(direction);
            this.scheduleFacetCompletion();
          }
        },
        onFocusSideTap: (side) => this.changeFacet(side === 'left' ? -1 : 1)
      }
    );
    void this.interaction;

    this.loop = new RenderLoop((deltaTime, elapsedTime) => this.update(deltaTime, elapsedTime));

    this.bindEvents();
    this.syncRuntimeDeviceState();
    this.initializeEntryRoute();
    this.refreshUI();
    this.updateGuide();
    this.loop.start();
  }

  private get game() {
    if (!this.gameRuntime) {
      throw new Error('Game runtime accessed before it was loaded.');
    }
    return this.gameRuntime.game;
  }

  private get audio() {
    if (!this.gameRuntime) {
      throw new Error('Audio runtime accessed before it was loaded.');
    }
    return this.gameRuntime.audio;
  }

  private get gameHud() {
    if (!this.gameRuntime) {
      throw new Error('Game HUD accessed before it was loaded.');
    }
    return this.gameRuntime.gameHud;
  }

  private get primateriePortal() {
    if (!this.gameRuntime) {
      throw new Error('primaterie portal accessed before it was loaded.');
    }
    return this.gameRuntime.primateriePortal;
  }

  private async ensureGameRuntimeLoaded() {
    if (this.gameRuntime) {
      return this.gameRuntime;
    }
    if (this.gameRuntimeLoader) {
      return this.gameRuntimeLoader;
    }

    this.gameRuntimeLoader = import('../game/AppGameRuntime')
      .then((module) => {
        if (this.gameRuntime) {
          return this.gameRuntime;
        }

        const game = new module.GameSessionController(this.renderer.scene, this.theme.current);
        game.setLocale(this.i18n.current);
        game.setThemeRequestHandler((theme) => this.theme.set(theme));

        const audio = new module.GameAudioSystem();
        const gameHud = new module.GameHUDSystem(this.uiHost, this.i18n, {
          onRestart: () => this.restartGame(),
          onExit: () => this.exitGame(),
          onMainMenu: () => this.returnToMiniGameMainMenu(),
          onLeaderboardResetToken: (token) => {
            if (game.syncAchievementResetToken(token) && (this.mode.is('game') || this.mode.is('game_over'))) {
              this.refreshUI();
            }
          },
          onThemeToggle: () => this.theme.toggle(),
          onLanguageToggle: () => this.i18n.toggle(),
          onAudioMuteToggle: () => audio.toggleMute(),
          onAudioVolumeChange: (value) => audio.setVolume(value),
          onGameOverStatReveal: (record) => {
            audio.handleEvent({ type: 'land', kind: 'reward' });
            if (record) {
              audio.handleEvent({ type: 'coin', magnet: false });
            }
          },
          onCloseShop: () => {
            if (game.closeShopChoice()) {
              this.refreshUI();
            }
          },
          onSelectUpgrade: (index) => {
            if (game.selectUpgradeFallback(index)) {
              this.refreshUI();
            }
          }
        });
        const primateriePortal = new module.primateriePortal(this.uiHost, {
          onPortfolio: () => this.returnToPortfolioFromprimateriePortal(),
          onSinglePlayer: () => this.activateprimaterieMode('adventure'),
          onThemeToggle: () => this.theme.toggle(),
          onLanguageToggle: () => this.i18n.toggle()
        });
        primateriePortal.setLocale(this.i18n.current);

        audio.onSettingsChange((settings) => {
          gameHud.setAudioControls(settings);
        });
        game.onAudioEvent((event) => {
          audio.handleEvent(event);
        });
        game.onScoreChange(() => {
          if (this.mode.is('game') || this.mode.is('game_over')) {
            this.refreshUI();
          }
        });

        const runtime: LoadedGameRuntime = {
          game,
          audio,
          gameHud,
          primateriePortal,
          projectGameHudPayload: module.projectGameHudPayload,
          miniGamePortalCameraOffset: module.MINI_GAME_PORTAL_CAMERA_OFFSET
        };
        this.gameRuntime = runtime;

        if (this.hasObservedUserGesture) {
          audio.registerUserGesture();
          audio.prime();
        }

        this.refreshUI();
        return runtime;
      })
      .finally(() => {
        this.gameRuntimeLoader = null;
      });

    return this.gameRuntimeLoader;
  }

  private initializeEntryRoute() {
    if (this.entryRoute !== 'primaterie') {
      this.setprimateriePortalVisible(false);
      return;
    }

    this.intro.hideImmediately();
    this.introTransitionProgress = 1;
    if (!this.mode.is('primaterie_portal')) {
      this.mode.setMode('primaterie_portal');
    }
    void this.ensureGameRuntimeLoaded()
      .then(() => {
        if (this.entryRoute === 'primaterie') {
          this.enterprimateriePortalMode();
        }
      })
      .catch((error) => {
        console.error('Failed to load game runtime for /primaterie.', error);
      });
  }

  private setprimateriePortalVisible(visible: boolean) {
    this.gameRuntime?.primateriePortal.setVisible(visible);
  }

  private preloadprimaterieHubAssets() {
    if (!this.gameRuntime) {
      return Promise.resolve();
    }
    if (this.primaterieHubPreloadPromise) {
      return this.primaterieHubPreloadPromise;
    }
    if (this.primaterieHubPreloaded) {
      this.primateriePortal.setLoading(false);
      return Promise.resolve();
    }

    this.primateriePortal.setLoading(true);
    this.primaterieHubPreloadPromise = Promise.all([this.game.preloadAssets(), this.gameHud.preloadAssets()])
      .then(() => {
        this.primaterieHubPreloaded = true;
      })
      .catch((error) => {
        console.warn('[AppController] Failed to preload primaterie hub assets.', error);
      })
      .finally(() => {
        this.primaterieHubPreloadPromise = null;
        if (!this.gameRuntime) {
          return;
        }
        this.primateriePortal.setLoading(false);
        this.primateriePortal.setBusy(Boolean(this.primateriePendingAction));
        if (this.mode.is('primaterie_portal')) {
          this.refreshUI();
        }
      });

    return this.primaterieHubPreloadPromise;
  }

  private enterprimateriePortalMode() {
    if (!this.gameRuntime) {
      return;
    }
    if (!this.mode.is('primaterie_portal')) {
      this.mode.setMode('primaterie_portal');
    }
    this.primateriePendingAction = null;
    this.primaterieReturnProgress = 0;
    this.slotSystem.reset();
    this.interaction.reset();
    this.world.setHovered(null);
    this.game.beginPortalPreview();
    this.game.clearPortalPreviewTransitionIntent();
    this.syncprimateriePortalLayout();
    this.primateriePortal.setBusy(false);
    this.primateriePortal.setLoading(!this.primaterieHubPreloaded);
    this.setprimateriePortalVisible(true);
    if (!this.primaterieHubPreloaded) {
      void this.preloadprimaterieHubAssets();
    }
    this.refreshUI();
  }

  private activateprimaterieMode(modeId: primaterieModeId) {
    if (!this.gameRuntime) {
      return;
    }
    if (!this.mode.is('primaterie_portal') || this.primateriePendingAction || !this.primaterieHubPreloaded) {
      return;
    }
    if (modeId !== 'adventure') {
      return;
    }
    this.primateriePendingAction = {
      execute: () => this.startGameTransition(true)
    };
    this.primateriePortal.setBusy(true);
  }

  private returnToPortfolioFromprimateriePortal() {
    if (!this.gameRuntime) {
      return;
    }
    if (!this.mode.is('primaterie_portal')) {
      return;
    }
    if (this.primaterieReturnTweenId !== null) {
      this.transitions.cancel(this.primaterieReturnTweenId);
      this.primaterieReturnTweenId = null;
    }

    this.entryRoute = 'portfolio';
    window.history.replaceState(null, '', '/');
    this.setprimateriePortalVisible(false);
    this.mode.setMode('primaterie_transition');
    this.primaterieReturnProgress = 0;
    this.game.stop();
    this.world.beginExternalLayoutTransition(this.world.getOrbitPositions(), undefined, undefined, {
      staggerVisibleIndex: 0,
      reverseStagger: true
    });
    this.refreshUI();

    this.primaterieReturnTweenId = this.transitions.animate({
      from: 0,
      to: 1,
      duration: 2,
      easing: 'easeInOutCubic',
      onUpdate: (value) => {
        this.primaterieReturnProgress = value;
        this.world.setExternalLayoutProgress(value);
      },
      onComplete: () => {
        this.primaterieReturnTweenId = null;
        this.primaterieReturnProgress = 0;
        this.slotSystem.reset();
        this.interaction.reset();
        this.world.resetPortfolioState();
        this.activeIndex = 0;
        this.world.setActiveIndex(0);
        this.mode.setMode('orbit');
        this.refreshUI();
        this.updateGuide();
      }
    });
  }

  private syncprimateriePortalLayout() {
    if (!this.gameRuntime) {
      return;
    }
    const preview = this.game.getPortalPreviewLayout();
    this.world.setSingleNodeExternalLayout(preview.position, preview.visual);
    const projected = this.renderer.projectWorldToScreen(preview.position);
    this.primateriePortal.setAnchor(projected.x, projected.y, 1);
  }

  private bindEvents() {
    this.theme.onChange((theme) => {
      this.renderer.setTheme(theme);
      this.musicBackdrop.setTheme(theme);
      this.parallaxLayers.setTheme(theme);
      this.world.setTheme(theme);
      if (this.gameRuntime) {
        this.game.setTheme(theme);
        this.primateriePortal.setLocale(this.i18n.current);
      }
      this.refreshUI();
    });

    this.i18n.onChange(() => {
      if (this.gameRuntime) {
        this.game.setLocale(this.i18n.current);
        this.primateriePortal.setLocale(this.i18n.current);
      }
      this.refreshUI();
      const focusedProject = this.world.getFocusedProject();
      if (focusedProject) {
        this.focus.show(focusedProject, this.world.getFocusedFacetIndex());
      }
      if (
        this.gameRuntime &&
        (this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over')) &&
        !this.gameTransitionReturningToHub
      ) {
        this.gameHud.update(this.getGameHudPayload());
      }
    });

    const primeAudio = () => {
      this.hasObservedUserGesture = true;
      if (!this.gameRuntime) {
        return;
      }
      this.audio.registerUserGesture();
      this.audio.prime();
    };
    window.addEventListener('pointerdown', primeAudio, { passive: true });
    window.addEventListener('keydown', primeAudio);

    this.about.onClose = () => {
      if (this.mode.is('about_section')) {
        this.resumeOrbitMode();
        this.refreshUI();
        this.updateGuide();
      }
    };

    this.intro.onBroken = () => {
      if (!this.mode.is('intro')) return;
      this.mode.setMode('intro_shattering');
      window.setTimeout(() => {
        if (this.mode.is('intro_shattering')) {
          this.mode.setMode('intro_transition');
        }
      }, 60);

      this.transitions.animate({
        from: 0,
        to: 1,
        duration: 2.6,
        easing: 'easeOutQuint',
        onUpdate: (value) => {
          this.introTransitionProgress = value;
        },
        onComplete: () => {
          this.introTransitionProgress = 1;
          this.resumeOrbitMode();
          this.refreshUI();
          this.updateGuide();
        }
      });
    };

    this.world.onUnlocked(() => {
      if (this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over')) {
        return;
      }

      if (!this.mode.is('constellation_complete')) {
        if (this.mode.is('dragging') || this.mode.is('orbit')) {
          this.mode.setMode('constellation_complete');
        }
      }

      this.refreshUI();
      this.updateGuide();

      this.transitions.animate({
        from: 0,
        to: 1,
        duration: 0.9,
        easing: 'easeOutCubic',
        onUpdate: () => {},
        onComplete: () => {
          if (this.slotSystem.isUnlocked()) {
            this.startGameTransition();
          }
        }
      });
    });

    window.addEventListener('wheel', this.onWheel, { passive: false });
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    const handleViewportStateChange = () => {
      this.syncRuntimeDeviceState();
      this.refreshRotateOverlayCopy();
    };
    window.addEventListener('resize', handleViewportStateChange);
    window.addEventListener('orientationchange', handleViewportStateChange);

    const canvas = this.renderer.renderer.domElement;
    canvas.addEventListener('pointerdown', this.onGamePointerDown);
    canvas.addEventListener('pointerup', this.onGamePointerUp);
    canvas.addEventListener('pointercancel', this.onGamePointerCancel);
  }

  private onWheel = (event: WheelEvent) => {
    if (isprimaterieMode(this.mode.current)) return;
    if (this.isPortfolioOrientationBlocked()) return;
    if (!isPortfolioBrowseMode(this.mode.current) && !this.about.opened) return;
    if (Date.now() - this.lastWheelAt < 120) return;
    this.lastWheelAt = Date.now();
    event.preventDefault();
    this.hud.setOutroVisible(true);
    this.handlePortfolioScroll(event.deltaY > 0 ? 1 : -1);
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (this.mode.is('primaterie_portal')) {
      return;
    }
    if (isprimaterieMode(this.mode.current)) {
      return;
    }
    if (this.isPortfolioOrientationBlocked()) {
      return;
    }
    if (this.isMiniGameOrientationBlocked()) {
      if (isGameRuntimeMode(this.mode.current) && event.key === 'Escape') {
        event.preventDefault();
        this.exitGame();
        return;
      }
      if (isGameRuntimeMode(this.mode.current)) {
        event.preventDefault();
      }
      return;
    }
    if (this.mode.is('game_transition')) {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.exitGame();
      }
      return;
    }

    if (this.mode.is('game') || this.mode.is('game_over')) {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (this.gameHud.consumeEscapeOverlay()) {
          this.refreshUI();
          return;
        }
        this.exitGame();
        return;
      }

      if (this.mode.is('game')) {
        if (this.game.getHudState().state === 'upgrade_choice') {
          if (event.key === '1' || event.key === '2' || event.key === '3') {
            event.preventDefault();
            if (this.game.selectUpgradeFallback(Number(event.key) - 1)) {
              this.refreshUI();
            }
            return;
          }
        }

        if (event.key === 'ArrowDown') {
          event.preventDefault();
          this.game.setChargeActive(true);
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          if (!event.repeat) {
            this.game.triggerTeleportAction();
          }
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          if (!event.repeat) {
            this.game.triggerUpAction();
          }
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          this.game.setGrappleActionActive(true);
          if (!event.repeat) {
            this.game.triggerHarpoonAction();
          }
        }
        return;
      }

      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowUp') {
        event.preventDefault();
        this.restartGame();
      }
      return;
    }

    if (isIntroMode(this.mode.current)) {
      return;
    }

    if (event.key === 'Escape') {
      if (this.about.opened) {
        this.about.close();
      } else {
        this.exitFocus();
      }
      return;
    }

    if (isFocusMode(this.mode.current)) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.changeFacet(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.changeFacet(1);
      }
      return;
    }

    if (!isPortfolioBrowseMode(this.mode.current)) return;

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.stepActiveIndex(-1);
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.stepActiveIndex(1);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const project = this.content.getProjectByOrder(this.activeIndex);
      if (project) this.enterFocus(project.id);
    }
  };

  private onKeyUp = (event: KeyboardEvent) => {
    if (isprimaterieMode(this.mode.current)) {
      return;
    }
    if (this.isPortfolioOrientationBlocked()) {
      return;
    }
    if (this.isMiniGameOrientationBlocked()) {
      return;
    }
    if (!this.mode.is('game')) return;
    if (event.key === 'ArrowDown') {
      this.game.setChargeActive(false);
      return;
    }
    if (event.key === 'ArrowRight') {
      this.game.setGrappleActionActive(false);
    }
  };

  private onGamePointerDown = (event: PointerEvent) => {
    if (this.isMiniGameOrientationBlocked()) {
      event.preventDefault();
      return;
    }
    if (this.mode.is('game_over')) {
      event.preventDefault();
      event.stopPropagation();
      this.restartGame();
      return;
    }

    if (!this.mode.is('game')) return;

    event.preventDefault();
    event.stopPropagation();
    this.mobileChargePointerId = event.pointerId;
    this.mobileChargeStartY = event.clientY;
    this.mobileChargeStartedAt = performance.now();
    this.game.setChargeActive(true);
  };

  private onGamePointerUp = (event: PointerEvent) => {
    if (this.isMiniGameOrientationBlocked()) {
      this.mobileChargePointerId = null;
      this.mobileChargeStartedAt = 0;
      this.game.setChargeActive(false);
      return;
    }
    if (!this.mode.is('game')) return;
    if (this.mobileChargePointerId !== event.pointerId) return;

    event.preventDefault();
    event.stopPropagation();
    const deltaY = this.mobileChargeStartY - event.clientY;
    const heldDuration = performance.now() - this.mobileChargeStartedAt;
    const releasedJump = this.game.setChargeActive(false);

    if (!releasedJump && (heldDuration < 180 || deltaY > 12)) {
      this.game.triggerUpAction();
      event.preventDefault();
    }

    this.mobileChargePointerId = null;
    this.mobileChargeStartedAt = 0;
  };

  private onGamePointerCancel = (event: PointerEvent) => {
    if (this.mobileChargePointerId !== event.pointerId) return;
    this.mobileChargePointerId = null;
    this.mobileChargeStartedAt = 0;
    this.game.setChargeActive(false);
  };

  private stepActiveIndex(direction: number) {
    this.activeIndex = wrapIndex(this.activeIndex + direction, this.content.getProjectCount());
    this.world.setActiveIndex(this.activeIndex);
    this.refreshUI();
  }

  private handlePortfolioScroll(direction: number) {
    if (this.about.opened) {
      if (direction < 0) {
        this.about.close();
      }
      return;
    }

    const lastIndex = this.content.getProjectCount() - 1;
    if (direction > 0 && this.activeIndex >= lastIndex) {
      this.openAboutFromScroll();
      return;
    }

    const nextIndex = THREE.MathUtils.clamp(this.activeIndex + direction, 0, lastIndex);
    if (nextIndex === this.activeIndex) {
      return;
    }
    this.activeIndex = nextIndex;
    this.world.setActiveIndex(this.activeIndex);
    this.refreshUI();
  }

  private openAboutFromScroll() {
    if (this.about.opened || !isPortfolioBrowseMode(this.mode.current)) {
      return;
    }
    this.about.open();
    this.mode.setMode('about_section');
    this.refreshUI();
    this.updateGuide();
  }

  private selectProject(index: number) {
    if (isprimaterieMode(this.mode.current)) {
      return;
    }
    if (this.isPortfolioOrientationBlocked()) {
      return;
    }
    if (
      isIntroMode(this.mode.current) ||
      isGameRuntimeMode(this.mode.current)
    ) {
      return;
    }

    if (this.about.opened) {
      this.about.close();
    }

    this.activeIndex = index;
    this.world.setActiveIndex(index);
    this.refreshUI();

    const project = this.content.getProjectByOrder(index);
    if (project && isPortfolioBrowseMode(this.mode.current)) {
      this.enterFocus(project.id);
    }
  }

  private enterFocus(projectId: string) {
    if (isprimaterieMode(this.mode.current)) return;
    if (this.isPortfolioOrientationBlocked()) return;
    if (!isPortfolioBrowseMode(this.mode.current)) return;
    const projectIndex = this.content.getProjectIndex(projectId);
    if (projectIndex >= 0) {
      this.activeIndex = projectIndex;
      this.world.setActiveIndex(projectIndex);
    }
    if (this.focusEnterTweenId !== null) {
      this.transitions.cancel(this.focusEnterTweenId);
      this.focusEnterTweenId = null;
    }
    if (this.world.releaseShardFromSlot(projectId)) {
      this.world.setHovered(null);
      this.refreshUI();
      this.focusEnterTweenId = this.transitions.animate({
        from: 0,
        to: 1,
        duration: 0.24,
        easing: 'easeOutQuint',
        onUpdate: () => {},
        onComplete: () => {
          this.focusEnterTweenId = null;
          if (!isPortfolioBrowseMode(this.mode.current)) {
            return;
          }
          this.mode.setMode('focus_enter');
          this.world.setFocused(projectId);
          this.world.setHovered(null);
          this.refreshUI();
        }
      });
      return;
    }
    this.mode.setMode('focus_enter');
    this.world.setFocused(projectId);
    this.world.setHovered(null);
    this.refreshUI();
  }

  private exitFocus(callback?: () => void) {
    if (!(this.mode.is('focus') || this.mode.is('focus_enter') || this.mode.is('focus_facet_transition'))) {
      callback?.();
      return;
    }

    const focusedProject = this.world.getFocusedProject();
    this.pendingPostFocusExit = callback || null;
    this.focus.hide();
    this.mode.setMode('focus_exit');
    this.world.clearFocus();

    this.transitions.animate({
      from: 0,
      to: 1,
      duration: 0.62,
      easing: 'easeOutQuint',
      onUpdate: () => {},
      onComplete: () => {
        this.resumeOrbitMode();
        if (focusedProject && this.hasSeenAllFacets(focusedProject.id)) {
          this.world.snapShardToSlot(focusedProject.id);
        }
        const post = this.pendingPostFocusExit;
        this.pendingPostFocusExit = null;
        post?.();
        this.refreshUI();
        this.updateGuide();
      }
    });
  }

  private changeFacet(direction: -1 | 1) {
    if (!this.mode.is('focus')) return;
    const changedId = this.world.changeFacet(direction);
    if (!changedId) return;
    this.mode.setMode('focus_facet_transition');
    this.focus.beginFacetTransition(direction);
    this.scheduleFacetCompletion();
  }

  private scheduleFacetCompletion() {
    this.transitions.animate({
      from: 0,
      to: 1,
      duration: 1,
      easing: 'easeOutCubic',
      onUpdate: () => {},
      onComplete: () => {
        if (!this.mode.is('focus_facet_transition')) return;
        this.mode.setMode('focus');
        const focusedProject = this.world.getFocusedProject();
        if (focusedProject) {
          this.markFacetSeen(focusedProject.id, this.world.getFocusedFacetIndex());
          this.focus.updateFacet(this.world.getFocusedFacetIndex());
          this.hasChangedFacet = true;
          this.updateGuide();
        }
      }
    });
  }

  private toggleAbout() {
    if (
      isIntroMode(this.mode.current) ||
      isGameRuntimeMode(this.mode.current) ||
      isprimaterieMode(this.mode.current)
    ) {
      return;
    }

    if (this.about.opened) {
      this.about.close();
      return;
    }

    const openAbout = () => {
      this.about.open();
      this.mode.setMode('about_section');
      this.refreshUI();
      this.updateGuide();
    };

    if (this.mode.is('focus') || this.mode.is('focus_enter') || this.mode.is('focus_facet_transition')) {
      this.exitFocus(openAbout);
      return;
    }

    openAbout();
  }

  private syncWorldCameraReferenceFromRenderer() {
    const cameraPosition = this.renderer.camera.position.clone();
    const cameraForward = new THREE.Vector3();
    this.renderer.camera.getWorldDirection(cameraForward);
    const lookAt = cameraPosition.clone().addScaledVector(cameraForward.normalize(), 24);
    this.world.setFocusCameraReference(cameraPosition, lookAt);
    return { cameraPosition, lookAt };
  }

  private returnHome() {
    if (isprimaterieMode(this.mode.current)) {
      this.returnToPortfolioFromprimateriePortal();
      return;
    }

    if (isGameRuntimeMode(this.mode.current)) {
      this.exitGame();
    }

    this.activeIndex = 0;
    this.world.setActiveIndex(0);

    if (this.about.opened) {
      this.about.close();
    }

    if (isFocusMode(this.mode.current)) {
      this.exitFocus();
    }

    this.refreshUI();
  }

  private resumeOrbitMode() {
    if (isprimaterieMode(this.mode.current)) {
      return;
    }
    if (this.slotSystem.isUnlocked()) {
      if (!this.mode.is('constellation_complete')) {
        if (
          this.mode.is('focus_exit') ||
          this.mode.is('about_section') ||
          this.mode.is('dragging') ||
          this.mode.is('orbit') ||
          this.mode.is('game_transition') ||
          this.mode.is('game') ||
          this.mode.is('game_over')
        ) {
          this.mode.setMode('constellation_complete');
        }
      }
      return;
    }

    if (!this.mode.is('orbit')) {
      this.mode.setMode('orbit');
    }
  }

  private startGameTransition(forceDirectEntry = false, skipPreAlign = false) {
    if (!this.slotSystem.isUnlocked() && !forceDirectEntry) return;
    if (isGameRuntimeMode(this.mode.current)) return;
    if (!this.gameRuntime) {
      this.pendingGameTransitionRequest = { forceDirectEntry, skipPreAlign };
      void this.ensureGameRuntimeLoaded()
        .then(() => {
          const request = this.pendingGameTransitionRequest;
          if (!request) {
            return;
          }
          this.pendingGameTransitionRequest = null;
          this.startGameTransition(request.forceDirectEntry, request.skipPreAlign);
        })
        .catch((error) => {
          console.error('Failed to load game runtime before starting the mini-game.', error);
        });
      return;
    }

    if (this.about.opened) {
      this.about.close();
    }

    this.audio.prime();
    this.gameTransitionReturningToHub = false;

    if (isFocusMode(this.mode.current)) {
      this.exitFocus(() => this.startGameTransition(forceDirectEntry, skipPreAlign));
      return;
    }

    if (this.mode.is('dragging')) {
      this.resumeOrbitMode();
    }

    const shouldPreAlignCamera =
      !skipPreAlign &&
      !this.mode.is('primaterie_portal') &&
      !this.mode.is('primaterie_transition') &&
      (this.mode.is('orbit') || this.mode.is('constellation_complete'));

    if (shouldPreAlignCamera) {
      if (this.portfolioCameraRealignTweenId !== null) {
        this.transitions.cancel(this.portfolioCameraRealignTweenId);
      }
      this.cameraOrbit.settleMotion();
      this.cameraOrbit.alignToYaw(0);
      this.portfolioCameraRealignTweenId = this.transitions.animate({
        from: 0,
        to: 1,
        duration: 1.2,
        easing: 'easeInOutCubic',
        onUpdate: () => {},
        onComplete: () => {
          this.portfolioCameraRealignTweenId = null;
          if (!this.cameraOrbit.isSettled()) {
            this.startGameTransition(forceDirectEntry, false);
            return;
          }
          this.startGameTransition(forceDirectEntry, true);
        }
      });
      return;
    }

    if (!this.mode.is('primaterie_portal') && !this.mode.is('constellation_complete')) {
      this.mode.setMode('constellation_complete');
    }
    this.setprimateriePortalVisible(false);
    this.gameTransitionFromprimaterie = this.mode.is('primaterie_portal');
    this.syncWorldCameraReferenceFromRenderer();

    if (this.gameTransitionTweenId !== null) {
      this.transitions.cancel(this.gameTransitionTweenId);
      this.gameTransitionTweenId = null;
    }

    this.mode.setMode('game_transition');
    this.gameTransitionProgress = 0;
    this.parallaxLayers.beginAdventureIntro();
    this.parallaxLayers.setTransitionState(true, 0);
    this.game.startTransition();
    const projectCount = this.getGameFieldCount();
    const initialPositions = this.game.getInitialPlatformPositions(projectCount);
    const initialVisuals = this.game.getInitialPlatformVisuals(projectCount);
    const transitionIndex = 0;
    const visibleTransitionIndex = THREE.MathUtils.clamp(
      this.activeIndex,
      0,
      Math.max(0, initialPositions.length - 1)
    );
    const transitionVisual = initialVisuals[transitionIndex] ?? initialVisuals[0];
    const transitionAnchor = initialPositions[transitionIndex]?.clone() ?? this.world.getCameraAlignedTransitionAnchor();
    this.gameTransitionAnchor = transitionAnchor.clone();
    if (this.gameTransitionFromprimaterie) {
      if (transitionVisual) {
        this.world.beginSingleNodeExternalLayoutTransition(transitionAnchor, transitionVisual, visibleTransitionIndex);
      } else {
        this.world.beginExternalLayoutTransition(
          initialPositions,
          this.game.getInitialPlatformScales(projectCount),
          initialVisuals,
          { staggerVisibleIndex: visibleTransitionIndex, reverseStagger: true }
        );
      }
    } else if (transitionVisual) {
      this.world.beginSingleNodeExternalLayoutTransition(transitionAnchor, transitionVisual, visibleTransitionIndex);
    } else {
      this.world.beginExternalLayoutTransition(
        initialPositions,
        this.game.getInitialPlatformScales(projectCount),
        initialVisuals
      );
    }
    this.refreshUI();

    this.gameTransitionTweenId = this.transitions.animate({
      from: 0,
      to: 1,
      duration: this.gameTransitionFromprimaterie ? 6.35 : 6,
      easing: 'easeInOutCubic',
      onUpdate: (value) => {
        this.gameTransitionProgress = value;
        this.game.setTransitionProgress(value);
        this.world.setExternalLayoutProgress(
          this.gameTransitionFromprimaterie
            ? this.getprimaterieToGameShardTransitionProgress(value)
            : this.getPortfolioToGameShardTransitionProgress(value)
        );
      },
      onComplete: () => {
        this.gameTransitionTweenId = null;
        this.gameTransitionProgress = 1;
        this.gameTransitionFromprimaterie = false;
        this.gameTransitionReturningToHub = false;
        this.gameTransitionAnchor = null;
        this.mode.setMode('game');
        this.game.beginRun();
        this.parallaxLayers.resetForRun(this.game.getParallaxCoverageAnchorX());
        const gameFieldCount = this.getGameFieldCount();
        this.world.setExternalLayoutPositions(
          this.game.getVisiblePlatformPositions(gameFieldCount),
          this.game.getVisiblePlatformScales(gameFieldCount),
          this.game.getVisiblePlatformVisuals(gameFieldCount)
        );
        this.refreshUI();
      }
    });
  }

  private restartGame() {
    if (!this.gameRuntime) return;
    if (!(this.mode.is('game') || this.mode.is('game_over'))) return;
    if (this.mode.is('game_over')) {
      this.mode.setMode('game');
    }
    this.audio.prime();
    this.game.restart();
    this.parallaxLayers.resetForRun(this.game.getParallaxCoverageAnchorX());
    const gameFieldCount = this.getGameFieldCount();
    this.world.setExternalLayoutPositions(
      this.game.getVisiblePlatformPositions(gameFieldCount),
      this.game.getVisiblePlatformScales(gameFieldCount),
      this.game.getVisiblePlatformVisuals(gameFieldCount)
    );
    this.refreshUI();
  }

  private exitGame() {
    if (!this.gameRuntime) {
      return;
    }
    if (!isGameRuntimeMode(this.mode.current)) {
      return;
    }

    if (this.gameTransitionTweenId !== null) {
      this.transitions.cancel(this.gameTransitionTweenId);
      this.gameTransitionTweenId = null;
    }

    this.mobileChargePointerId = null;
    this.game.setChargeActive(false);
    this.game.prepareReturnTransition();
    this.gameTransitionReturningToHub = true;
    this.syncWorldCameraReferenceFromRenderer();
    if (this.entryRoute === 'primaterie') {
      const preview = this.game.getPortalPreviewLayout();
      this.gameTransitionAnchor = preview.position.clone();
      this.world.beginSingleNodeExternalLayoutTransition(preview.position, preview.visual);
    } else {
      this.gameTransitionAnchor = this.world.getCameraAlignedTransitionAnchor();
      const orbitPositions = this.world.getOrbitPositions();
      this.world.beginExternalLayoutTransition(orbitPositions, undefined, undefined, {
        staggerVisibleIndex: THREE.MathUtils.clamp(this.activeIndex, 0, Math.max(0, orbitPositions.length - 1)),
        reverseStagger: true
      });
    }

    if (this.mode.is('game') || this.mode.is('game_over')) {
      this.mode.setMode('game_transition');
    }

    this.gameTransitionTweenId = this.transitions.animate({
      from: this.gameTransitionProgress,
      to: 0,
      duration: 2,
      easing: 'easeInOutCubic',
      onUpdate: (value) => {
        this.gameTransitionProgress = value;
        this.world.setExternalLayoutProgress(1 - value);
      },
      onComplete: () => {
        this.gameTransitionTweenId = null;
        this.game.stop();
        this.gameTransitionFromprimaterie = false;
        this.gameTransitionReturningToHub = false;
        this.gameTransitionProgress = 0;
        this.gameTransitionAnchor = null;
        if (this.entryRoute === 'primaterie') {
          this.enterprimateriePortalMode();
          return;
        }
        this.slotSystem.reset();
        this.interaction.reset();
        this.world.resetPortfolioState();
        this.activeIndex = 0;
        this.world.setActiveIndex(0);
        this.resumeOrbitMode();
        this.refreshUI();
        this.updateGuide();
      }
    });
  }

  private returnToMiniGameMainMenu() {
    this.entryRoute = 'primaterie';
    window.history.replaceState(null, '', '/primaterie');
    this.exitGame();
  }

  private getGameHudPayload() {
    if (!this.gameRuntime) {
      throw new Error('Game HUD payload requested before runtime load.');
    }
    return this.gameRuntime.projectGameHudPayload(this.game.getHudState(), (worldPosition) =>
      this.renderer.projectWorldToScreen(worldPosition)
    );
  }

  private getprimateriePortalCameraPose() {
    if (!this.gameRuntime) {
      throw new Error('primaterie portal camera pose requested before runtime load.');
    }
    const preview = this.game.getPortalPreviewLayout();
    const mobilePreviewScale = window.innerWidth <= 820 ? 0.88 : 1;
    return {
      position: preview.position.clone().add(this.gameRuntime.miniGamePortalCameraOffset.clone().multiplyScalar(mobilePreviewScale)),
      lookAt: preview.position.clone()
    };
  }

  private getAccentColor(elapsedTime: number) {
    const cycleDuration = ACCENT_COLOR_HOLD_SECONDS + ACCENT_COLOR_BLEND_SECONDS;
    const cycleIndex = Math.floor(elapsedTime / cycleDuration) % ACCENT_COLOR_CYCLE.length;
    const cycleTime = elapsedTime % cycleDuration;
    const from = new THREE.Color(ACCENT_COLOR_CYCLE[cycleIndex]);
    if (cycleTime <= ACCENT_COLOR_HOLD_SECONDS) {
      return `#${from.getHexString()}`;
    }
    const to = new THREE.Color(ACCENT_COLOR_CYCLE[(cycleIndex + 1) % ACCENT_COLOR_CYCLE.length]);
    const blend = THREE.MathUtils.clamp((cycleTime - ACCENT_COLOR_HOLD_SECONDS) / ACCENT_COLOR_BLEND_SECONDS, 0, 1);
    from.lerp(to, blend);
    return `#${from.getHexString()}`;
  }

  private update(deltaTime: number, elapsedTime: number) {
    this.transitions.update(deltaTime);
    const accentColor = this.getAccentColor(elapsedTime);
    document.documentElement.style.setProperty('--accent-color', accentColor);
    const cameraOrbitPose = this.cameraOrbit.update(deltaTime, this.world.getPivot());
    if (this.mode.is('game_transition')) {
      this.syncWorldCameraReferenceFromRenderer();
    } else {
      this.world.setFocusCameraReference(cameraOrbitPose.position, cameraOrbitPose.lookAt);
    }
    this.world.update(deltaTime, elapsedTime, this.mode.current);
    const gameRuntime = this.gameRuntime;
    const orientationBlocked = this.isMiniGameOrientationBlocked();
    if (gameRuntime) {
      if (orientationBlocked) {
        this.game.setChargeActive(false);
        this.game.setGrappleActionActive(false);
      }
      this.game.update(orientationBlocked ? 0 : deltaTime, elapsedTime);
      const audioActive = this.mode.is('game') || this.mode.is('game_over');
      this.audio.setEnabled(audioActive);
      this.audio.update(this.game.getAudioState(), deltaTime);

      if (this.mode.is('primaterie_portal')) {
        let portalTransitionStarted = false;
        if (this.primateriePendingAction) {
          const pendingAction = this.primateriePendingAction;
          if (this.game.preparePortalPreviewTransition('forward')) {
            this.primateriePendingAction = null;
            pendingAction.execute();
            portalTransitionStarted = true;
          }
        }
        if (!portalTransitionStarted && this.mode.is('primaterie_portal')) {
          this.syncprimateriePortalLayout();
        }
      }

      if (this.mode.is('game') || this.mode.is('game_over')) {
        const gameFieldCount = this.getGameFieldCount();
        this.world.setExternalLayoutPositions(
          this.game.getVisiblePlatformPositions(gameFieldCount),
          this.game.getVisiblePlatformScales(gameFieldCount),
          this.game.getVisiblePlatformVisuals(gameFieldCount)
        );
      }
    }

    if (this.mode.is('focus_enter') && this.world.isFocusSettled()) {
      this.mode.setMode('focus');
      const focusedProject = this.world.getFocusedProject();
      if (focusedProject) {
        this.markFacetSeen(focusedProject.id, this.world.getFocusedFacetIndex());
        this.focus.show(focusedProject, this.world.getFocusedFacetIndex());
        this.hasFocused = true;
        this.updateGuide();
      }
    }

    if (gameRuntime && this.mode.is('game') && this.game.currentState === 'game_over') {
      this.mode.setMode('game_over');
    }

    this.cameraFocusBlend = damp(
      this.cameraFocusBlend,
      this.mode.is('focus') || this.mode.is('focus_enter') || this.mode.is('focus_facet_transition') || this.mode.is('focus_exit') ? 1 : 0,
      8,
      deltaTime
    );

    const orbitPose = this.world.getOrbitCameraPose();
    const focusPose = this.world.getFocusCameraPose();
    const portfolioPosition = cameraOrbitPose.position.clone().lerp(focusPose.position, this.cameraFocusBlend);
    const portfolioLookAt = cameraOrbitPose.lookAt.clone().lerp(orbitPose.lookAt, 0.18).lerp(focusPose.lookAt, this.cameraFocusBlend);
    const gamePose = gameRuntime
      ? this.game.getCameraPose()
      : {
          position: portfolioPosition.clone(),
          lookAt: portfolioLookAt.clone()
        };
    const primateriePose =
      gameRuntime && (this.mode.is('primaterie_portal') || this.mode.is('primaterie_transition') || this.gameTransitionFromprimaterie)
        ? this.getprimateriePortalCameraPose()
        : null;
    const primaterieBasePosition =
      primateriePose && (this.mode.is('primaterie_portal') || this.mode.is('primaterie_transition'))
        ? primateriePose.position.clone().lerp(portfolioPosition, this.primaterieReturnProgress)
        : portfolioPosition;
    const primaterieBaseLookAt =
      primateriePose && (this.mode.is('primaterie_portal') || this.mode.is('primaterie_transition'))
        ? primateriePose.lookAt.clone().lerp(portfolioLookAt, this.primaterieReturnProgress)
        : portfolioLookAt;
    const transitionPose = this.getGameTransitionCameraPose(
      this.gameTransitionFromprimaterie && primateriePose ? primateriePose.position : primaterieBasePosition,
      this.gameTransitionFromprimaterie && primateriePose ? primateriePose.lookAt : primaterieBaseLookAt,
      gamePose.position,
      gamePose.lookAt
    );
    const blendedPosition = transitionPose.position;
    const blendedLookAt = transitionPose.lookAt;
    const cameraPosition = this.introStartCameraPosition.clone().lerp(blendedPosition, this.introTransitionProgress);
    const cameraLookAt = this.introStartLookAt.clone().lerp(blendedLookAt, this.introTransitionProgress);

    this.renderer.setCameraResponse(
      this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over') ? 18 : 8,
      this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over') ? 20 : 8
    );
    this.renderer.setCameraTarget(cameraPosition, cameraLookAt);
    this.renderer.update(deltaTime);
    const musicReactiveState = gameRuntime
      ? this.audio.getMusicReactiveState()
      : {
          active: false,
          bassIntensity: 0,
          midIntensity: 0,
          melodyIntensity: 0,
          overallEnergy: 0,
          momentumRatio: 0,
          difficultyRatio: 0
        };
    const musicBackdropVisible = Boolean(
      gameRuntime &&
        (this.mode.is('game') || this.mode.is('game_over')) &&
        musicReactiveState.active &&
        this.game.currentState !== 'portal_preview'
    );
    const parallaxVisible = Boolean(
      gameRuntime &&
        (this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over')) &&
        !this.gameTransitionReturningToHub &&
        this.game.currentState !== 'idle' &&
        this.game.currentState !== 'portal_preview'
    );
    this.musicBackdrop.setVisible(musicBackdropVisible);
    this.musicBackdrop.update(deltaTime, elapsedTime, this.renderer.camera, musicReactiveState);
    if (parallaxVisible && gameRuntime) {
      this.parallaxLayers.setMirrorMode(this.game.isMirrorModeActive());
      this.parallaxLayers.setCoverageAnchorX(this.game.getParallaxCoverageAnchorX());
      this.parallaxLayers.setViewState(this.game.getParallaxViewState());
      this.parallaxLayers.setTransitionState(this.mode.is('game_transition') && !this.gameTransitionReturningToHub, this.gameTransitionProgress);
    }
    this.parallaxLayers.setVisible(parallaxVisible);
    this.parallaxLayers.update(deltaTime);
    const cinematicBlurStrength =
      this.mode.is('game_transition') && this.gameTransitionFromprimaterie
        ? Math.max(
            0,
            Math.sin(
              Math.PI *
                THREE.MathUtils.clamp(
                  this.gameTransitionProgress / Math.max(0.0001, primaterie_TO_GAME_CINEMATIC_HOLD_END),
                  0,
                  1
                )
            )
          )
        : 0;
    this.gameTransitionBlurOverlay.classList.toggle('is-visible', cinematicBlurStrength > 0.001);
    this.gameTransitionBlurOverlay.style.setProperty('--game-transition-blur', `${(0.8 + cinematicBlurStrength * 2.4).toFixed(2)}px`);
    this.gameTransitionBlurOverlay.style.setProperty('--game-transition-blur-opacity', `${(cinematicBlurStrength * 0.22).toFixed(3)}`);
    if (
      gameRuntime &&
      (this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over')) &&
      !this.gameTransitionReturningToHub
    ) {
      this.gameHud.update(this.getGameHudPayload());
    }
    this.renderer.render();
    this.intro.update(deltaTime);
    this.updateRotateOverlay();

    this.refreshUI();
  }

  private refreshUI() {
    this.syncRuntimeDeviceState();
    const focusedProject = this.world.getFocusedProject();
    const focusIndex = focusedProject ? this.content.getProjectIndex(focusedProject.id) : this.activeIndex;
    const isGameMode = isGameRuntimeMode(this.mode.current);
    const showGameHud = isGameMode && !this.gameTransitionReturningToHub && this.gameRuntime !== null;
    const primaterieMode = isprimaterieMode(this.mode.current);
    const portfolioBlocked = this.isPortfolioOrientationBlocked();

    this.hud.setActiveProject(focusIndex, this.i18n.current);
    this.hud.setUnlocked(this.slotSystem.isUnlocked());
    this.hud.setAboutOpen(this.about.opened);
    this.hud.setGameModeNavigation(isGameMode);
    this.hud.setOutroVisible(
      this.about.opened || (!primaterieMode && !isGameMode && isPortfolioBrowseMode(this.mode.current) && this.lastWheelAt > 0)
    );
    this.interaction.setEnabled(isPortfolioInteractionMode(this.mode.current) && !primaterieMode && !isGameMode && !portfolioBlocked);
    if (isGameMode || primaterieMode || portfolioBlocked) {
      this.world.setHovered(null);
    }
    this.hud.element.classList.toggle('is-hidden', primaterieMode || isGameMode);
    this.guide.element.classList.toggle('is-hidden', isGameMode || primaterieMode);
    this.uiHost.dataset.appMode = primaterieMode ? 'primaterie' : isGameMode ? 'game' : 'portfolio';
    this.gameRuntime?.gameHud.setVisible(showGameHud);
    if (showGameHud) {
      this.gameHud.update(this.getGameHudPayload());
    }
    this.world.setActiveIndex(this.activeIndex);
    this.refreshRotateOverlayCopy();
    this.updateRotateOverlay();
  }

  private getGameFieldCount() {
    if (!this.gameRuntime) {
      return this.world.getGameFieldCapacity();
    }
    const requestedCount = Math.max(this.world.getGameFieldCapacity(), this.game.getRecommendedVisibleCount());
    this.world.ensureGameFieldCapacity(requestedCount);
    return this.world.getGameFieldCapacity();
  }

  private updateGuide() {
    if (isGameRuntimeMode(this.mode.current) || isprimaterieMode(this.mode.current)) {
      return;
    }

    if (this.slotSystem.isUnlocked()) {
      this.guide.setStep('unlocked');
      return;
    }

    if (this.mode.is('intro') || this.mode.is('intro_shattering') || this.mode.is('intro_transition')) {
      this.guide.setStep('intro');
      return;
    }

    if (!this.hasFocused) {
      this.guide.setStep('orbit');
      return;
    }

    if (!this.hasChangedFacet) {
      this.guide.setStep('focus');
      return;
    }

    if (!this.hasDragged) {
      this.guide.setStep('drag');
      return;
    }

    this.guide.setStep('slots');
  }

  private markFacetSeen(projectId: string, facetIndex: number) {
    const seen = this.seenFacetsByProject.get(projectId) ?? new Set<number>();
    seen.add(facetIndex);
    this.seenFacetsByProject.set(projectId, seen);
  }

  private hasSeenAllFacets(projectId: string) {
    return (this.seenFacetsByProject.get(projectId)?.size ?? 0) >= 3;
  }

  private isMiniGameOrientationBlocked() {
    const isGameMode = this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over');
    return isGameMode && getRuntimeDeviceState().isMobilePortrait;
  }

  private isPortfolioOrientationBlocked() {
    return !isGameRuntimeMode(this.mode.current) && !isprimaterieMode(this.mode.current) && isMobileRuntime() && !isMobilePortraitRuntime();
  }

  private refreshRotateOverlayCopy = () => {
    const title = this.rotateOverlay.querySelector<HTMLElement>('.game-rotate-overlay__title');
    const body = this.rotateOverlay.querySelector<HTMLElement>('.game-rotate-overlay__body');
    const portfolioTitle = this.portfolioOrientationOverlay.querySelector<HTMLElement>('.portfolio-rotate-overlay__title');
    const portfolioBody = this.portfolioOrientationOverlay.querySelector<HTMLElement>('.portfolio-rotate-overlay__body');
    if (!title || !body || !portfolioTitle || !portfolioBody) return;
    if (this.i18n.current === 'fr') {
      title.textContent = 'Tournez votre téléphone';
      body.textContent = 'Le mini-jeu se joue uniquement en mode paysage.';
      portfolioTitle.textContent = 'Repassez en vertical';
      portfolioBody.textContent = 'Le portfolio se consulte uniquement en mode portrait.';
    } else {
      title.textContent = 'Rotate your phone';
      body.textContent = 'The mini-game is only playable in landscape mode.';
      portfolioTitle.textContent = 'Switch back to portrait';
      portfolioBody.textContent = 'The portfolio is only available in portrait mode.';
    }
  };

  private updateRotateOverlay() {
    this.rotateOverlay.classList.toggle('is-visible', this.isMiniGameOrientationBlocked());
    this.portfolioOrientationOverlay.classList.toggle('is-visible', this.isPortfolioOrientationBlocked());
  }

  private getGameTransitionCameraPose(
    portfolioPosition: THREE.Vector3,
    portfolioLookAt: THREE.Vector3,
    gamePosition: THREE.Vector3,
    gameLookAt: THREE.Vector3
  ) {
    if (this.mode.is('game_transition') && this.gameTransitionFromprimaterie) {
      const focusPoint = this.game.getPlayerFocusPoint().clone().add(new THREE.Vector3(0, 0.2, 0));
      const entryOffset = portfolioPosition.clone().sub(focusPoint);
      const entryDirection =
        entryOffset.lengthSq() > 0.0001 ? entryOffset.clone().normalize() : new THREE.Vector3(0, 0.18, 1);
      const cinematicPosition = focusPoint
        .clone()
        .addScaledVector(entryDirection, Math.max(0.54, entryOffset.length() * 0.14))
        .add(new THREE.Vector3(0, 0.04, 0));

      if (this.gameTransitionProgress <= primaterie_TO_GAME_CINEMATIC_FOCUS_END) {
        const zoomPhase = THREE.MathUtils.smoothstep(
          THREE.MathUtils.clamp(this.gameTransitionProgress / primaterie_TO_GAME_CINEMATIC_FOCUS_END, 0, 1),
          0,
          1
        );
        return {
          position: portfolioPosition.clone().lerp(cinematicPosition, zoomPhase),
          lookAt: portfolioLookAt.clone().lerp(focusPoint, zoomPhase)
        };
      }

      if (this.gameTransitionProgress <= primaterie_TO_GAME_CINEMATIC_HOLD_END) {
        return {
          position: cinematicPosition,
          lookAt: focusPoint
        };
      }

      const returnPhase = THREE.MathUtils.smoothstep(
        THREE.MathUtils.clamp(
          (this.gameTransitionProgress - primaterie_TO_GAME_CINEMATIC_HOLD_END) /
            Math.max(0.0001, 1 - primaterie_TO_GAME_CINEMATIC_HOLD_END),
          0,
          1
        ),
        0,
        1
      );
      return {
        position: cinematicPosition.clone().lerp(gamePosition, returnPhase),
        lookAt: focusPoint.clone().lerp(gameLookAt, returnPhase)
      };
    }

    if (!this.mode.is('game_transition')) {
      return {
        position: portfolioPosition.clone().lerp(gamePosition, this.gameTransitionProgress),
        lookAt: portfolioLookAt.clone().lerp(gameLookAt, this.gameTransitionProgress)
      };
    }

    const transitionLookAt = this.gameTransitionAnchor?.clone() ?? portfolioLookAt.clone();
    const portfolioOffset = portfolioPosition.clone().sub(transitionLookAt);
    const portfolioDirection =
      portfolioOffset.lengthSq() > 0.0001 ? portfolioOffset.clone().normalize() : new THREE.Vector3(0, 0.04, 1);
    const alignedRadius = Math.max(19.4, portfolioOffset.length() * 0.92);
    const alignedPosition = transitionLookAt
      .clone()
      .addScaledVector(portfolioDirection, alignedRadius)
      .add(new THREE.Vector3(0, 0.16, 0));

    const rotatePhase = THREE.MathUtils.smoothstep(
      THREE.MathUtils.clamp(this.gameTransitionProgress / PORTFOLIO_TO_GAME_ROTATE_PHASE_END, 0, 1),
      0,
      1
    );
    if (this.gameTransitionProgress <= PORTFOLIO_TO_GAME_ROTATE_PHASE_END) {
      return {
        position: portfolioPosition.clone().lerp(alignedPosition, rotatePhase),
        lookAt: portfolioLookAt.clone().lerp(transitionLookAt, rotatePhase)
      };
    }

    if (this.gameTransitionProgress <= PORTFOLIO_TO_GAME_HOLD_PHASE_END) {
      return {
        position: alignedPosition.clone(),
        lookAt: transitionLookAt.clone()
      };
    }

    const stackPhase = THREE.MathUtils.smoothstep(
      THREE.MathUtils.clamp(
        (this.gameTransitionProgress - PORTFOLIO_TO_GAME_HOLD_PHASE_END) /
          Math.max(0.0001, 1 - PORTFOLIO_TO_GAME_HOLD_PHASE_END),
        0,
        1
      ),
      0,
      1
    );
    return {
      position: alignedPosition.clone().lerp(gamePosition, stackPhase),
      lookAt: transitionLookAt.clone().lerp(gameLookAt, stackPhase)
    };
  }

  private getPortfolioToGameShardTransitionProgress(progress: number) {
    if (progress <= PORTFOLIO_TO_GAME_SHARD_DRIFT_START) {
      return 0;
    }

    return THREE.MathUtils.smoothstep(
      THREE.MathUtils.clamp(
        (progress - PORTFOLIO_TO_GAME_SHARD_DRIFT_START) / Math.max(0.0001, 1 - PORTFOLIO_TO_GAME_SHARD_DRIFT_START),
        0,
        1
      ),
      0,
      1
    );
  }

  private getprimaterieToGameShardTransitionProgress(progress: number) {
    if (progress <= primaterie_TO_GAME_CINEMATIC_FOCUS_END) {
      return 0;
    }

    return THREE.MathUtils.smoothstep(
      THREE.MathUtils.clamp(
        (progress - primaterie_TO_GAME_CINEMATIC_FOCUS_END) /
          Math.max(0.0001, 1 - primaterie_TO_GAME_CINEMATIC_FOCUS_END),
        0,
        1
      ),
      0,
      1
    );
  }
}
