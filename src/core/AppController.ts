import * as THREE from 'three';
import type { AppEntryRoute } from './AppEntryRoute';
import { ContentService } from '../data/ContentService';
import { GameHUDSystem } from '../game/GameHUDSystem';
import { GameAudioSystem } from '../game/GameAudioSystem';
import { MINI_GAME_PORTAL_CAMERA_OFFSET } from '../game/MiniGamePortalLayout';
import { projectGameHudPayload } from '../game/projectGameHudPayload';
import { PrimatriePortal } from '../game/PrimatriePortal';
import { GameSessionController } from '../game/GameSessionController';
import { DragCameraOrbitController } from '../portfolio/DragCameraOrbitController';
import { IntroVoronoiSystem } from '../portfolio/IntroVoronoiSystem';
import { OrbitWorldSystem } from '../portfolio/OrbitWorldSystem';
import { SecretSlotSystem } from '../portfolio/SecretSlotSystem';
import { ShardInteractionSystem } from '../portfolio/ShardInteractionSystem';
import { MusicReactiveBackdrop } from '../render/MusicReactiveBackdrop';
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
  isPrimatrieMode
} from './appModePredicates';
import { damp, wrapIndex } from './math';
import { RenderLoop } from './RenderLoop';
import { TransitionSystem } from './TransitionSystem';

const ACCENT_COLOR_CYCLE = ['#75AF80', '#FF4545', '#49BCFF', '#8AEBEF'] as const;
const ACCENT_COLOR_HOLD_SECONDS = 10;
const ACCENT_COLOR_BLEND_SECONDS = 1;
const PORTFOLIO_TO_GAME_ROTATE_PHASE_END = 0.08;
const PORTFOLIO_TO_GAME_HOLD_PHASE_END = 0.16;

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
  private readonly slotSystem: SecretSlotSystem;
  private readonly world: OrbitWorldSystem;
  private readonly intro: IntroVoronoiSystem;
  private readonly guide: GuideBubbleSystem;
  private readonly hud: NavigationHUD;
  private readonly about: AboutSectionSystem;
  private readonly focus: FocusPresentationSystem;
  private readonly gameHud: GameHUDSystem;
  private readonly audio: GameAudioSystem;
  private readonly primatriePortal: PrimatriePortal;
  private readonly rotateOverlay: HTMLDivElement;
  private readonly portfolioOrientationOverlay: HTMLDivElement;
  private readonly game: GameSessionController;
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
  private primatrieReturnProgress = 0;
  private primatrieReturnTweenId: number | null = null;
  private gameTransitionFromPrimatrie = false;
  private gameTransitionAnchor: THREE.Vector3 | null = null;

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
    this.slotSystem = new SecretSlotSystem(
      this.content
        .getProjects()
        .map((project) => project.id)
    );
    this.world = new OrbitWorldSystem(this.renderer.scene, this.content.getProjects(), this.slotSystem, this.theme.current);
    this.game = new GameSessionController(this.renderer.scene, this.theme.current);
    this.game.setLocale(this.i18n.current);
    this.audio = new GameAudioSystem();
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
    this.gameHud = new GameHUDSystem(this.uiHost, this.i18n, {
      onRestart: () => this.restartGame(),
      onExit: () => this.exitGame(),
      onMainMenu: () => this.returnToMiniGameMainMenu(),
      onThemeToggle: () => this.theme.toggle(),
      onLanguageToggle: () => this.i18n.toggle(),
      onAudioMuteToggle: () => this.audio.toggleMute(),
      onAudioVolumeChange: (value) => this.audio.setVolume(value),
      onMobileJump: () => {
        this.game.triggerJump();
      },
      onMobileChargeChange: (active) => {
        this.game.setChargeActive(active);
      },
      onMobileGrapple: () => {
        this.game.triggerMobileGrappleAction();
      },
      onMobileAirborneCharge: () => {
        this.game.triggerMobileAirborneChargeAction();
      },
      onCloseShop: () => {
        if (this.game.closeShopChoice()) {
          this.refreshUI();
        }
      },
      onSelectUpgrade: (index) => {
        if (this.game.selectUpgradeFallback(index)) {
          this.refreshUI();
        }
      }
    });
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
    this.primatriePortal = new PrimatriePortal(this.uiHost, {
      onPortfolio: () => {
        this.returnToPortfolioFromPrimatriePortal();
      },
      onSinglePlayer: () => {
        this.launchPrimatrieSinglePlayer();
      }
    });

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
    this.audio.onSettingsChange((settings) => {
      this.gameHud.setAudioControls(settings);
    });
    this.game.onAudioEvent((event) => {
      this.audio.handleEvent(event);
    });
    this.initializeEntryRoute();
    this.refreshUI();
    this.updateGuide();
    this.loop.start();
  }

  private initializeEntryRoute() {
    if (this.entryRoute !== 'primatrie') {
      this.primatriePortal.setVisible(false);
      return;
    }

    this.intro.hideImmediately();
    this.introTransitionProgress = 1;
    this.enterPrimatriePortalMode();
  }

  private setPrimatriePortalVisible(visible: boolean) {
    this.primatriePortal.setVisible(visible);
  }

  private enterPrimatriePortalMode() {
    if (!this.mode.is('primatrie_portal')) {
      this.mode.setMode('primatrie_portal');
    }
    this.primatrieReturnProgress = 0;
    this.slotSystem.reset();
    this.interaction.reset();
    this.world.setHovered(null);
    this.game.beginPortalPreview();
    this.syncPrimatriePortalLayout();
    this.setPrimatriePortalVisible(true);
    this.refreshUI();
  }

  private launchPrimatrieSinglePlayer() {
    this.setPrimatriePortalVisible(false);
    this.startGameTransition(true);
  }

  private returnToPortfolioFromPrimatriePortal() {
    if (!this.mode.is('primatrie_portal')) {
      return;
    }
    if (this.primatrieReturnTweenId !== null) {
      this.transitions.cancel(this.primatrieReturnTweenId);
      this.primatrieReturnTweenId = null;
    }

    this.entryRoute = 'portfolio';
    window.history.replaceState(null, '', '/');
    this.setPrimatriePortalVisible(false);
    this.mode.setMode('primatrie_transition');
    this.primatrieReturnProgress = 0;
    this.game.stop();
    this.world.beginExternalLayoutTransition(this.world.getOrbitPositions(), undefined, undefined, {
      staggerVisibleIndex: 0,
      reverseStagger: true
    });
    this.refreshUI();

    this.primatrieReturnTweenId = this.transitions.animate({
      from: 0,
      to: 1,
      duration: 2,
      easing: 'easeInOutCubic',
      onUpdate: (value) => {
        this.primatrieReturnProgress = value;
        this.world.setExternalLayoutProgress(value);
      },
      onComplete: () => {
        this.primatrieReturnTweenId = null;
        this.primatrieReturnProgress = 0;
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

  private syncPrimatriePortalLayout() {
    const preview = this.game.getPortalPreviewLayout();
    this.world.setSingleNodeExternalLayout(preview.position, preview.visual);
    const projected = this.renderer.projectWorldToScreen(preview.position);
    const viewportScale = THREE.MathUtils.clamp(window.innerWidth / 1440, 0.72, 1);
    this.primatriePortal.setAnchor(projected.x, projected.y, viewportScale);
  }

  private bindEvents() {
    this.theme.onChange((theme) => {
      this.renderer.setTheme(theme);
      this.musicBackdrop.setTheme(theme);
      this.world.setTheme(theme);
      this.game.setTheme(theme);
      this.refreshUI();
    });

    this.i18n.onChange(() => {
      this.game.setLocale(this.i18n.current);
      this.refreshUI();
      const focusedProject = this.world.getFocusedProject();
      if (focusedProject) {
        this.focus.show(focusedProject, this.world.getFocusedFacetIndex());
      }
      if (this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over')) {
        this.gameHud.update(this.getGameHudPayload());
      }
    });

    this.game.onScoreChange(() => {
      if (this.mode.is('game') || this.mode.is('game_over')) {
        this.refreshUI();
      }
    });

    const primeAudio = () => {
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
    window.addEventListener('resize', this.refreshRotateOverlayCopy);
    window.addEventListener('orientationchange', this.refreshRotateOverlayCopy);

    const canvas = this.renderer.renderer.domElement;
    canvas.addEventListener('pointerdown', this.onGamePointerDown);
    canvas.addEventListener('pointerup', this.onGamePointerUp);
    canvas.addEventListener('pointercancel', this.onGamePointerCancel);
  }

  private onWheel = (event: WheelEvent) => {
    if (isPrimatrieMode(this.mode.current)) return;
    if (this.isPortfolioOrientationBlocked()) return;
    if (!isPortfolioBrowseMode(this.mode.current) && !this.about.opened) return;
    if (Date.now() - this.lastWheelAt < 120) return;
    this.lastWheelAt = Date.now();
    event.preventDefault();
    this.hud.setOutroVisible(true);
    this.handlePortfolioScroll(event.deltaY > 0 ? 1 : -1);
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (isPrimatrieMode(this.mode.current)) {
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
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          this.game.setUpActionActive(true);
          if (!event.repeat) {
            this.game.triggerUpAction();
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
    if (isPrimatrieMode(this.mode.current)) {
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
    if (event.key === 'ArrowUp') {
      this.game.setUpActionActive(false);
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
    if (isPrimatrieMode(this.mode.current)) {
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
    if (isPrimatrieMode(this.mode.current)) return;
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
      isPrimatrieMode(this.mode.current)
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
    if (isPrimatrieMode(this.mode.current)) {
      this.returnToPortfolioFromPrimatriePortal();
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
    if (isPrimatrieMode(this.mode.current)) {
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

    if (this.about.opened) {
      this.about.close();
    }

    this.audio.prime();

    if (isFocusMode(this.mode.current)) {
      this.exitFocus(() => this.startGameTransition(forceDirectEntry, skipPreAlign));
      return;
    }

    if (this.mode.is('dragging')) {
      this.resumeOrbitMode();
    }

    const shouldPreAlignCamera =
      !skipPreAlign &&
      !this.mode.is('primatrie_portal') &&
      !this.mode.is('primatrie_transition') &&
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

    if (!this.mode.is('primatrie_portal') && !this.mode.is('constellation_complete')) {
      this.mode.setMode('constellation_complete');
    }
    this.setPrimatriePortalVisible(false);
    this.gameTransitionFromPrimatrie = this.mode.is('primatrie_portal');
    this.syncWorldCameraReferenceFromRenderer();

    if (this.gameTransitionTweenId !== null) {
      this.transitions.cancel(this.gameTransitionTweenId);
      this.gameTransitionTweenId = null;
    }

    this.mode.setMode('game_transition');
    this.gameTransitionProgress = 0;
    this.game.startTransition();
    const projectCount = this.getGameFieldCount();
    const initialPositions = this.game.getInitialPlatformPositions(projectCount);
    const initialVisuals = this.game.getInitialPlatformVisuals(projectCount);
    const transitionIndex = 0;
    const transitionVisual = initialVisuals[transitionIndex] ?? initialVisuals[0];
    const transitionAnchor = initialPositions[transitionIndex]?.clone() ?? this.world.getCameraAlignedTransitionAnchor();
    this.gameTransitionAnchor = transitionAnchor.clone();
    if (transitionVisual) {
      this.world.beginSingleNodeExternalLayoutTransition(transitionAnchor, transitionVisual, transitionIndex);
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
      duration: 6,
      easing: 'easeInOutCubic',
      onUpdate: (value) => {
        this.gameTransitionProgress = value;
        this.game.setTransitionProgress(value);
        this.world.setExternalLayoutProgress(this.getPortfolioToGameShardTransitionProgress(value));
      },
      onComplete: () => {
        this.gameTransitionTweenId = null;
        this.gameTransitionProgress = 1;
        this.gameTransitionFromPrimatrie = false;
        this.gameTransitionAnchor = null;
        this.mode.setMode('game');
        this.game.beginRun();
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
    if (!(this.mode.is('game') || this.mode.is('game_over'))) return;
    if (this.mode.is('game_over')) {
      this.mode.setMode('game');
    }
    this.audio.prime();
    this.game.restart();
    const gameFieldCount = this.getGameFieldCount();
    this.world.setExternalLayoutPositions(
      this.game.getVisiblePlatformPositions(gameFieldCount),
      this.game.getVisiblePlatformScales(gameFieldCount),
      this.game.getVisiblePlatformVisuals(gameFieldCount)
    );
    this.refreshUI();
  }

  private exitGame() {
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
    this.syncWorldCameraReferenceFromRenderer();
    if (this.entryRoute === 'primatrie') {
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
        this.gameTransitionFromPrimatrie = false;
        this.gameTransitionProgress = 0;
        this.gameTransitionAnchor = null;
        if (this.entryRoute === 'primatrie') {
          this.enterPrimatriePortalMode();
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
    this.entryRoute = 'primatrie';
    window.history.replaceState(null, '', '/primatrie');
    this.exitGame();
  }

  private getGameHudPayload() {
    return projectGameHudPayload(this.game.getHudState(), (worldPosition) => this.renderer.projectWorldToScreen(worldPosition));
  }

  private getPrimatriePortalCameraPose() {
    const preview = this.game.getPortalPreviewLayout();
    return {
      position: preview.position.clone().add(MINI_GAME_PORTAL_CAMERA_OFFSET),
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
    const orientationBlocked = this.isMiniGameOrientationBlocked();
    if (orientationBlocked) {
      this.game.setChargeActive(false);
      this.game.setUpActionActive(false);
    }
    this.game.update(orientationBlocked ? 0 : deltaTime, elapsedTime);
    const audioActive = this.mode.is('game') || this.mode.is('game_over');
    this.audio.setEnabled(audioActive);
    this.audio.update(this.game.getAudioState(), deltaTime);

    if (this.mode.is('primatrie_portal')) {
      this.syncPrimatriePortalLayout();
    }

    if (this.mode.is('game') || this.mode.is('game_over')) {
      const gameFieldCount = this.getGameFieldCount();
      this.world.setExternalLayoutPositions(
        this.game.getVisiblePlatformPositions(gameFieldCount),
        this.game.getVisiblePlatformScales(gameFieldCount),
        this.game.getVisiblePlatformVisuals(gameFieldCount)
      );
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

    if (this.mode.is('game') && this.game.currentState === 'game_over') {
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
    const gamePose = this.game.getCameraPose();
    const primatriePose =
      this.mode.is('primatrie_portal') || this.mode.is('primatrie_transition') || this.gameTransitionFromPrimatrie
        ? this.getPrimatriePortalCameraPose()
        : null;

    const portfolioPosition = cameraOrbitPose.position.clone().lerp(focusPose.position, this.cameraFocusBlend);
    const portfolioLookAt = cameraOrbitPose.lookAt.clone().lerp(orbitPose.lookAt, 0.18).lerp(focusPose.lookAt, this.cameraFocusBlend);
    const primatrieBasePosition =
      primatriePose && (this.mode.is('primatrie_portal') || this.mode.is('primatrie_transition'))
        ? primatriePose.position.clone().lerp(portfolioPosition, this.primatrieReturnProgress)
        : portfolioPosition;
    const primatrieBaseLookAt =
      primatriePose && (this.mode.is('primatrie_portal') || this.mode.is('primatrie_transition'))
        ? primatriePose.lookAt.clone().lerp(portfolioLookAt, this.primatrieReturnProgress)
        : portfolioLookAt;
    const transitionPose = this.getGameTransitionCameraPose(
      this.gameTransitionFromPrimatrie && primatriePose ? primatriePose.position : primatrieBasePosition,
      this.gameTransitionFromPrimatrie && primatriePose ? primatriePose.lookAt : primatrieBaseLookAt,
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
    const musicReactiveState = this.audio.getMusicReactiveState();
    const musicBackdropVisible =
      (this.mode.is('game') || this.mode.is('game_over')) &&
      musicReactiveState.active &&
      this.game.currentState !== 'portal_preview';
    this.musicBackdrop.setVisible(musicBackdropVisible);
    this.musicBackdrop.update(deltaTime, elapsedTime, this.renderer.camera, musicReactiveState);
    if (this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over')) {
      this.gameHud.update(this.getGameHudPayload());
    }
    this.renderer.render();
    this.intro.update(deltaTime);
    this.updateRotateOverlay();

    this.refreshUI();
  }

  private refreshUI() {
    const focusedProject = this.world.getFocusedProject();
    const focusIndex = focusedProject ? this.content.getProjectIndex(focusedProject.id) : this.activeIndex;
    const isGameMode = isGameRuntimeMode(this.mode.current);
    const primatrieMode = isPrimatrieMode(this.mode.current);
    const portfolioBlocked = this.isPortfolioOrientationBlocked();

    this.hud.setActiveProject(focusIndex, this.i18n.current);
    this.hud.setUnlocked(this.slotSystem.isUnlocked());
    this.hud.setAboutOpen(this.about.opened);
    this.hud.setGameModeNavigation(isGameMode);
    this.hud.setOutroVisible(
      this.about.opened || (!primatrieMode && !isGameMode && isPortfolioBrowseMode(this.mode.current) && this.lastWheelAt > 0)
    );
    this.interaction.setEnabled(isPortfolioInteractionMode(this.mode.current) && !primatrieMode && !isGameMode && !portfolioBlocked);
    if (isGameMode || primatrieMode || portfolioBlocked) {
      this.world.setHovered(null);
    }
    this.hud.element.classList.toggle('is-hidden', primatrieMode || isGameMode);
    this.guide.element.classList.toggle('is-hidden', isGameMode || primatrieMode);
    this.uiHost.dataset.appMode = primatrieMode ? 'primatrie' : isGameMode ? 'game' : 'portfolio';
    this.gameHud.setVisible(isGameMode);
    if (isGameMode) {
      this.gameHud.update(this.getGameHudPayload());
    }
    this.world.setActiveIndex(this.activeIndex);
    this.refreshRotateOverlayCopy();
    this.updateRotateOverlay();
  }

  private getGameFieldCount() {
    const requestedCount = Math.max(this.world.getGameFieldCapacity(), this.game.getRecommendedVisibleCount());
    this.world.ensureGameFieldCapacity(requestedCount);
    return this.world.getGameFieldCapacity();
  }

  private updateGuide() {
    if (isGameRuntimeMode(this.mode.current) || isPrimatrieMode(this.mode.current)) {
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

  private isMobileDeviceLike() {
    return window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 900;
  }

  private isMiniGameOrientationBlocked() {
    const isGameMode = this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over');
    return isGameMode && this.isMobileDeviceLike() && window.innerHeight > window.innerWidth;
  }

  private isPortfolioOrientationBlocked() {
    return !isGameRuntimeMode(this.mode.current) && !isPrimatrieMode(this.mode.current) && this.isMobileDeviceLike() && window.innerWidth > window.innerHeight;
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
    if (progress <= PORTFOLIO_TO_GAME_HOLD_PHASE_END) {
      return 0;
    }

    return THREE.MathUtils.smoothstep(
      THREE.MathUtils.clamp(
        (progress - PORTFOLIO_TO_GAME_HOLD_PHASE_END) / Math.max(0.0001, 1 - PORTFOLIO_TO_GAME_HOLD_PHASE_END),
        0,
        1
      ),
      0,
      1
    );
  }
}
