import * as THREE from 'three';
import type { AppEntryRoute } from './AppEntryRoute';
import { ContentService } from '../data/ContentService';
import type { GameHUDSystem } from '../game/GameHUDSystem';
import type { GameAudioSystem } from '../game/GameAudioSystem';
import type { primateriePortal, primaterieModeId } from '../game/PrimatriePortal';
import type { GameSessionController } from '../game/GameSessionController';
import { MINI_GAME_PORTAL_CAMERA_OFFSET } from '../game/MiniGamePortalLayout';
import { createPrimateriePortalPreviewLayout } from '../game/PrimateriePortalPreview';
import { DragCameraOrbitController } from '../portfolio/DragCameraOrbitController';
import { IntroVoronoiSystem } from '../portfolio/IntroVoronoiSystem';
import { OrbitWorldSystem } from '../portfolio/OrbitWorldSystem';
import { SecretSlotSystem } from '../portfolio/SecretSlotSystem';
import { ShardInteractionSystem } from '../portfolio/ShardInteractionSystem';
import { VoronoiRevealSystem } from '../portfolio/VoronoiRevealSystem';
import { MusicReactiveBackdrop } from '../render/MusicReactiveBackdrop';
import { ParallaxLayerSystem } from '../render/ParallaxLayerSystem';
import { WorldRenderer } from '../render/WorldRenderer';
import { AboutSectionSystem } from '../ui/AboutSectionSystem';
import { FocusPresentationSystem } from '../ui/FocusPresentationSystem';
import type { GuideTarget } from '../ui/GuideBubbleSystem';
import { GuideBubbleSystem } from '../ui/GuideBubbleSystem';
import { I18nService } from '../ui/I18nService';
import { NavigationHUD } from '../ui/NavigationHUD';
import { ThemeService } from '../ui/ThemeService';
import { AUDIO_STORAGE_KEYS } from '../game/audioConstants';
import { ModeController } from './ModeController';
import {
  isFocusMode,
  isGameRuntimeMode,
  isIntroMode,
  isPortfolioBrowseMode,
  isPortfolioInteractionMode,
  isprimaterieMode
} from './appModePredicates';
import {
  applyRuntimeDeviceAttributes,
  getRuntimeDeviceState,
  isAppleMobileRuntime,
  isMobilePortraitRuntime,
  isMobileRuntime
} from './device';
import {
  beginAdventureLaunchTracking,
  clearAdventureLaunchTracking,
  detectPreviousAdventureLaunchCrash,
  flushPendingAdventureCrashReport as flushStoredAdventureCrashReport,
  hasPendingAdventureCrashReport as hasStoredAdventureCrashReport,
  updateAdventureLaunchTracking,
  type AdventureLaunchPhase
} from './adventureLaunchSafety';
import { getBrowserAssetCacheStats } from './browserAssetCache';
import {
  installGameBootDiagnostics,
  recordGameBootDiagnostic,
  recordGameBootDiagnosticError,
  recordGameBootWarning
} from './gameBootDiagnostics';
import { damp, wrapIndex } from './math';
import { PerfDebugOverlay } from './perfDebug';
import {
  GameQualityController,
  buildGameVisualQuality,
  getResolvedQualityRank as getResolvedGameQualityRank,
  type GameQualitySelection,
  type GameQualityState
} from './gameQuality';
import { getPerformanceProfile } from './performanceProfile';
import { RenderLoop } from './RenderLoop';
import { addGameBreadcrumb, captureGameException, setSentryContext } from './sentry';
import { TransitionSystem } from './TransitionSystem';
import { observeRuntimeViewport } from './viewport';

const ACCENT_COLOR_CYCLE = ['#75AF80', '#FF4545', '#49BCFF', '#8AEBEF'] as const;
const ACCENT_COLOR_HOLD_SECONDS = 10;
const ACCENT_COLOR_BLEND_SECONDS = 1;
const PORTFOLIO_TO_GAME_ROTATE_PHASE_END = 0.08;
const PORTFOLIO_TO_GAME_HOLD_PHASE_END = 0.16;
const PORTFOLIO_TO_GAME_SHARD_DRIFT_START = 0.04;
const primaterie_TO_GAME_CINEMATIC_FOCUS_END = 0.12;
const primaterie_TO_GAME_CINEMATIC_HOLD_END = 0.28;
const PLAYER_AVATAR_KEY = 'portfolio-game-player-avatar-v1';
const PLAYER_LEADERBOARD_REGISTERED_KEY = 'portfolio-game-player-registered-v1';
const GAME_HELP_TUTORIAL_COMPLETED_KEY = 'portfolio-game-help-tutorial-complete-v2';
const GAME_GUIDE_EVENT_FLAGS_KEY = 'portfolio-game-guide-events-v1';

type ProjectGameHudPayload = typeof import('../game/projectGameHudPayload').projectGameHudPayload;
type GameRuntimeModule = typeof import('../game/AppGameRuntime');

interface LoadedGameRuntime {
  game: GameSessionController;
  audio: GameAudioSystem;
  gameHud: GameHUDSystem;
  projectGameHudPayload: ProjectGameHudPayload;
}

type IntroMirrorGuideStage = '0' | 'first_click' | '50' | '100';

export class AppController {
  private readonly content = new ContentService();
  private readonly portfolioHubProjects = this.content.getProjects().slice(0, 6);
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
  private readonly voronoiReveal: VoronoiRevealSystem;
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
  private readonly scratchPivot = new THREE.Vector3();
  private readonly scratchOrbitPosition = new THREE.Vector3();
  private readonly scratchOrbitLookAt = new THREE.Vector3();
  private readonly scratchWorldOrbitPosition = new THREE.Vector3();
  private readonly scratchWorldOrbitLookAt = new THREE.Vector3();
  private readonly scratchFocusPosition = new THREE.Vector3();
  private readonly scratchFocusLookAt = new THREE.Vector3();
  private readonly scratchPortfolioPosition = new THREE.Vector3();
  private readonly scratchPortfolioLookAt = new THREE.Vector3();
  private readonly scratchGamePosition = new THREE.Vector3();
  private readonly scratchGameLookAt = new THREE.Vector3();
  private readonly scratchPrimateriePosition = new THREE.Vector3();
  private readonly scratchPrimaterieLookAt = new THREE.Vector3();
  private readonly scratchTransitionPosition = new THREE.Vector3();
  private readonly scratchTransitionLookAt = new THREE.Vector3();
  private readonly scratchCameraPosition = new THREE.Vector3();
  private readonly scratchCameraLookAt = new THREE.Vector3();
  private readonly scratchTransitionAnchor = new THREE.Vector3();
  private readonly scratchDirection = new THREE.Vector3();
  private readonly scratchDirectionB = new THREE.Vector3();
  private readonly scratchFocusPoint = new THREE.Vector3();
  private readonly scratchAccentColor = new THREE.Color();
  private readonly scratchAccentColorB = new THREE.Color();
  private cameraFocusBlend = 0;
  private introTransitionProgress = 0;
  private gameTransitionProgress = 0;
  private activeIndex = 0;
  private lastWheelAt = 0;
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
  private gameRuntimeModule: GameRuntimeModule | null = null;
  private gameRuntimeModulePromise: Promise<GameRuntimeModule> | null = null;
  private gameRuntimeLoader: Promise<LoadedGameRuntime> | null = null;
  private gameRuntimeModulePrefetchScheduled = false;
  private gameRuntimeUnsubscribers: Array<() => void> = [];
  private primateriePortalRuntime: primateriePortal | null = null;
  private primateriePortalLoader: Promise<primateriePortal> | null = null;
  private pendingGameTransitionRequest: { forceDirectEntry: boolean; skipPreAlign: boolean } | null = null;
  private primaterieHubShellReadyLogged = false;
  private primaterieHubPreloaded = false;
  private primaterieHubPreloadPromise: Promise<void> | null = null;
  private adventureLaunchPreparationPromise: Promise<void> | null = null;
  private adventureLaunchPrepared = false;
  private gameAssetWarmupScheduled = false;
  private gameAssetWarmupPromise: Promise<void> | null = null;
  private hasObservedUserGesture = false;
  private hoveredShardId: string | null = null;
  private hoveredGuideUiElement: HTMLElement | null = null;
  private hoveredGuideUiKey: string | null = null;
  private guideMirrorModeActive = false;
  private guideSettingsIntroShown = false;
  private showGameSettingsGuideUntil = 0;
  private showMirrorGuideUntil = 0;
  private readonly introMirrorGuideStagesSeen = new Set<IntroMirrorGuideStage>();
  private readonly gameGuideEventFlags = new Set<string>();
  private readonly perfDebugOverlay: PerfDebugOverlay | null;
  private readonly qualityController: GameQualityController;
  private lastHudUpdateAt = 0;
  private lastUiRefreshAt = 0;
  private lastGuideUpdateAt = 0;
  private guideDeltaAccumulator = 0;
  private gameQualityState: GameQualityState = {
    selection: 'auto',
    resolved: 'high',
    source: 'auto',
    recoveryForced: false,
    visual: buildGameVisualQuality('high')
  };
  private readonly previousAdventureCrash = detectPreviousAdventureLaunchCrash();
  private adventureRunStartedAt = Number.NEGATIVE_INFINITY;
  private adventureFirstFramesLogged = false;
  private adventureStableLogged = false;
  private deferredParallaxInitScheduled = false;
  private deferredParallaxInitPromise: Promise<void> | null = null;
  private lastPendingCrashReportFlushAt = Number.NEGATIVE_INFINITY;
  private primateriePendingAction: {
    execute: () => void;
  } | null = null;

  private syncRuntimeDeviceState = () => {
    applyRuntimeDeviceAttributes(document.documentElement);
    applyRuntimeDeviceAttributes(this.root);
    applyRuntimeDeviceAttributes(this.uiHost);
  };

  constructor(host: HTMLElement, options: { entryRoute: AppEntryRoute }) {
    installGameBootDiagnostics();
    recordGameBootDiagnostic('app_controller_constructor_started', { entryRoute: options.entryRoute });
    if (this.previousAdventureCrash) {
      recordGameBootDiagnostic('previous_adventure_launch_crashed', {
        previousQuality: this.previousAdventureCrash.previousQuality,
        previousPhase: this.previousAdventureCrash.previousPhase,
        previousTimestamp: this.previousAdventureCrash.previousTimestamp,
        route: this.previousAdventureCrash.route
      });
      addGameBreadcrumb(
        'Previous adventure launch likely crashed',
        {
          previousQuality: this.previousAdventureCrash.previousQuality,
          previousPhase: this.previousAdventureCrash.previousPhase,
          previousTimestamp: this.previousAdventureCrash.previousTimestamp
        },
        'warning',
        'game.recovery'
      );
      setSentryContext('adventure_recovery', {
        previousQuality: this.previousAdventureCrash.previousQuality,
        previousPhase: this.previousAdventureCrash.previousPhase,
        previousTimestamp: this.previousAdventureCrash.previousTimestamp,
        route: this.previousAdventureCrash.route
      });
    }
    this.qualityController = new GameQualityController({
      recoveryForced: Boolean(this.previousAdventureCrash)
    });
    this.gameQualityState = this.qualityController.getState();
    if (hasStoredAdventureCrashReport()) {
      this.lastPendingCrashReportFlushAt = 0;
      void this.flushPendingAdventureCrashReport();
    }
    recordGameBootDiagnostic('performance_profile_selected', {
      profile: this.performanceProfile.id,
      targetShellFps: this.performanceProfile.targetShellFps,
      prefetchGameRuntimeOnHubIdle: this.performanceProfile.prefetchGameRuntimeOnHubIdle,
      loadPortalCommunityArtwork: this.performanceProfile.loadPortalCommunityArtwork
    });
    recordGameBootDiagnostic('game_quality_selected', {
      selection: this.gameQualityState.selection,
      resolved: this.gameQualityState.resolved,
      source: this.gameQualityState.source,
      recoveryForced: this.gameQualityState.recoveryForced
    });
    setSentryContext('app_boot', {
      entryRoute: options.entryRoute,
      recoveryForced: this.gameQualityState.recoveryForced
    });
    this.entryRoute = options.entryRoute;
    this.root = document.createElement('div');
    this.root.className = 'app-shell';

    this.canvasHost = document.createElement('div');
    this.canvasHost.className = 'app-shell__canvas';

    this.uiHost = document.createElement('div');
    this.uiHost.className = 'app-shell__ui';

    this.root.append(this.canvasHost, this.uiHost);
    host.appendChild(this.root);
    this.syncRuntimeDeviceState();
    this.applyGameQualityState();

    recordGameBootDiagnostic('renderer_start', {
      mobile: isMobileRuntime()
    });
    recordGameBootDiagnostic('world_renderer_construct_started', {
      mobile: isMobileRuntime()
    });
    recordGameBootDiagnostic('world_start', {
      mobile: isMobileRuntime()
    });
    try {
      this.renderer = new WorldRenderer(this.canvasHost);
    } catch (error) {
      recordGameBootDiagnosticError('renderer_fail', error, {
        mobile: isMobileRuntime()
      });
      recordGameBootDiagnosticError('world_fail', error, {
        mobile: isMobileRuntime()
      });
      recordGameBootDiagnosticError('world_renderer_construct_failed', error, {
        mobile: isMobileRuntime()
      });
      captureGameException(error, {
        event: 'world_renderer_construct_failed',
        category: 'app_boot',
        data: {
          entryRoute: options.entryRoute,
          mobile: isMobileRuntime()
        }
      });
      throw error;
    }
    recordGameBootDiagnostic('renderer_ok');
    recordGameBootDiagnostic('world_ok');
    recordGameBootDiagnostic('world_renderer_ready');
    this.renderer.setTheme(this.theme.current);
    this.musicBackdrop = new MusicReactiveBackdrop(
      this.renderer.scene,
      this.theme.current,
      this.gameQualityState.visual
    );
    this.parallaxLayers = new ParallaxLayerSystem(
      this.renderer.scene,
      this.renderer.camera,
      this.renderer.renderer,
      this.theme.current,
      this.gameQualityState.visual
    );
    recordGameBootDiagnostic('parallax_layer_system_ready', { eagerInitRemoved: true });
    this.slotSystem = new SecretSlotSystem(
      this.portfolioHubProjects
        .map((project) => project.id)
    );
    this.world = new OrbitWorldSystem(this.renderer.scene, this.portfolioHubProjects, this.slotSystem, this.theme.current);
    this.voronoiReveal = new VoronoiRevealSystem(this.root, this.theme.current);
    this.hud = new NavigationHUD(this.uiHost, this.i18n, this.portfolioHubProjects, {
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
    this.intro = new IntroVoronoiSystem(this.uiHost, this.i18n, this.theme, this.voronoiReveal);
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
    this.restoreGameGuideEventFlags();
    recordGameBootDiagnostic('app_controller_ui_ready');

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
        onHover: (shardId) => {
          const previousHoveredId = this.hoveredShardId;
          this.hoveredShardId = shardId;
          if (previousHoveredId && previousHoveredId !== shardId) {
            this.guide.resetProjectHoverCooldown(previousHoveredId);
          }
          this.world.setHovered(shardId);
          if (!shardId) {
            if (previousHoveredId) {
              this.guide.resetProjectHoverCooldown(previousHoveredId);
            }
            this.updateGuide();
          }
        },
        onDragStart: (shardId, point) => {
          if (!(this.mode.is('orbit') || this.mode.is('constellation_complete'))) return false;
          const started = this.world.beginDrag(shardId, point);
          if (started) {
            this.mode.setMode('dragging');
            this.world.setHovered(null);
            this.hoveredShardId = null;
            this.guide.trigger({ type: 'drag_first' }, this.getGuideTargetForProject(shardId));
          }
          return started;
        },
        onDragMove: (point) => {
          this.world.updateDrag(point);
        },
        onDragEnd: () => {
          const result = this.world.endDrag();
          if (result.shardId) {
            const project = this.content.getProjectById(result.shardId);
            const target = this.getGuideTargetForProject(result.shardId) ?? this.getGuideConstellationTarget();
          if (result.snapped && project && target) {
            const remainingSlots = this.slotSystem.getSlots().filter((slot) => !slot.activated).length;
            this.guide.trigger({ type: 'slot_placed', project, remainingSlots }, target);
            if (remainingSlots === 2) {
              this.guide.trigger({ type: 'two_slots_left' }, target);
            } else if (remainingSlots === 1) {
              this.guide.trigger({ type: 'one_slot_left' }, target);
            }
          }
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

    this.loop = new RenderLoop((deltaTime, elapsedTime) => this.update(deltaTime, elapsedTime), {
      debugName: 'app-main-loop',
      getTargetFps: () => this.resolveTargetFps()
    });
    this.perfDebugOverlay = new PerfDebugOverlay(() => this.buildPerfDebugSnapshot());
    if (this.perfDebugOverlay) {
      addGameBreadcrumb('perf_debug_enabled', {
        profile: this.performanceProfile.id
      });
    }

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
    if (!this.primateriePortalRuntime) {
      throw new Error('primaterie portal accessed before it was loaded.');
    }
    return this.primateriePortalRuntime;
  }

  private loadGameRuntimeModule(reason: 'construct' | 'prefetch' = 'construct') {
    if (this.gameRuntimeModule) {
      return Promise.resolve(this.gameRuntimeModule);
    }
    if (this.gameRuntimeModulePromise) {
      return this.gameRuntimeModulePromise;
    }

    if (reason === 'prefetch') {
      recordGameBootDiagnostic('game_runtime_module_prefetch_requested', {
        profile: this.performanceProfile.id,
        entryRoute: this.entryRoute
      });
    }

    this.gameRuntimeModulePromise = import('../game/AppGameRuntime')
      .then((module) => {
        this.gameRuntimeModule = module;
        recordGameBootDiagnostic(reason === 'prefetch' ? 'game_runtime_module_prefetch_completed' : 'game_runtime_module_loaded');
        return module;
      })
      .catch((error) => {
        this.gameRuntimeModulePromise = null;
        if (reason === 'prefetch') {
          recordGameBootDiagnosticError('game_runtime_module_prefetch_failed', error, {
            profile: this.performanceProfile.id,
            entryRoute: this.entryRoute
          });
        }
        throw error;
      });

    return this.gameRuntimeModulePromise;
  }

  private async ensurePrimateriePortalLoaded() {
    if (this.primateriePortalRuntime) {
      return this.primateriePortalRuntime;
    }
    if (this.primateriePortalLoader) {
      return this.primateriePortalLoader;
    }

    recordGameBootDiagnostic('primaterie_portal_load_requested', {
      entryRoute: this.entryRoute,
      profile: this.performanceProfile.id
    });
    this.primateriePortalLoader = import('../game/PrimatriePortal')
      .then((module) => {
        recordGameBootDiagnostic('primaterie_portal_module_loaded');
        if (this.primateriePortalRuntime) {
          return this.primateriePortalRuntime;
        }

        const portal = new module.primateriePortal(
          this.uiHost,
          {
            onPortfolio: () => this.returnToPortfolioFromprimateriePortal(),
            onSinglePlayer: () => this.activateprimaterieMode('adventure'),
            onThemeToggle: () => this.theme.toggle(),
            onLanguageToggle: () => this.i18n.toggle()
          },
          {
            loadCommunityArtwork: this.performanceProfile.loadPortalCommunityArtwork,
            communityAssetTier: this.gameQualityState.visual.assetTier
          }
        );
        portal.setLocale(this.i18n.current);
        this.primateriePortalRuntime = portal;
        recordGameBootDiagnostic('primaterie_portal_constructed', {
          communityArtwork: this.performanceProfile.loadPortalCommunityArtwork
        });
        this.refreshUI();
        return portal;
      })
      .catch((error) => {
        recordGameBootDiagnosticError('primaterie_portal_load_failed', error, {
          entryRoute: this.entryRoute
        });
        captureGameException(error, {
          event: 'primaterie_portal_load_failed',
          category: 'primaterie_portal',
          data: {
            entryRoute: this.entryRoute,
            profile: this.performanceProfile.id
          }
        });
        throw error;
      })
      .finally(() => {
        this.primateriePortalLoader = null;
      });

    return this.primateriePortalLoader;
  }

  private async ensureGameRuntimeLoaded() {
    if (this.gameRuntime) {
      return this.gameRuntime;
    }
    if (this.gameRuntimeLoader) {
      return this.gameRuntimeLoader;
    }

    recordGameBootDiagnostic('session_start', {
      entryRoute: this.entryRoute
    });
    recordGameBootDiagnostic('game_runtime_load_requested');
    this.gameRuntimeLoader = this.loadGameRuntimeModule('construct')
      .then(async (module) => {
        if (this.gameRuntime) {
          return this.gameRuntime;
        }

        recordGameBootDiagnostic('game_runtime_construct_game_started');
        let game: GameSessionController;
        try {
          game = new module.GameSessionController(this.renderer.scene, this.theme.current);
        } catch (error) {
          recordGameBootDiagnosticError('game_runtime_construct_game_failed', error);
          captureGameException(error, {
            event: 'game_runtime_construct_game_failed',
            category: 'app_runtime',
            data: {
              entryRoute: this.entryRoute,
              theme: this.theme.current
            }
          });
          throw error;
        }
        recordGameBootDiagnostic('game_runtime_construct_game_completed');
        game.setLocale(this.i18n.current);
        game.setVisualQuality(this.gameQualityState.visual);
        game.setThemeRequestHandler((theme) => this.theme.set(theme));
        await new Promise<void>((resolve) => window.setTimeout(resolve, 0));

        recordGameBootDiagnostic('audio_start');
        recordGameBootDiagnostic('game_runtime_construct_audio_started');
        let audio: GameAudioSystem;
        try {
          audio = new module.GameAudioSystem();
        } catch (error) {
          recordGameBootDiagnosticError('audio_fail', error);
          recordGameBootDiagnosticError('game_runtime_construct_audio_failed', error);
          captureGameException(error, {
            event: 'game_runtime_construct_audio_failed',
            category: 'app_runtime',
            data: {
              entryRoute: this.entryRoute
            }
          });
          throw error;
        }
        recordGameBootDiagnostic('audio_ok');
        recordGameBootDiagnostic('game_runtime_construct_audio_completed');
        await new Promise<void>((resolve) => window.setTimeout(resolve, 0));

        recordGameBootDiagnostic('game_runtime_construct_hud_started');
        let gameHud: GameHUDSystem;
        try {
          gameHud = new module.GameHUDSystem(this.uiHost, this.i18n, {
            onRestart: () => this.restartGame(),
            onExit: () => this.exitGame(),
            onMainMenu: () => this.returnToMiniGameMainMenu(),
            onLeaderboardResetToken: (token) => {
              if (game.syncAchievementResetToken(token) && (this.mode.is('game') || this.mode.is('game_over'))) {
                this.refreshUI();
              }
            },
            onLeaderboardPosition: (position) => game.recordLeaderboardPosition(position),
            onThemeToggle: () => this.theme.toggle(),
            onLanguageToggle: () => this.i18n.toggle(),
            onQualitySelectionChange: (selection) => this.setGameQualitySelection(selection),
            onAudioMuteToggle: () => audio.toggleMute(),
            onAudioMusicVolumeChange: (value) => audio.setMusicVolume(value),
            onAudioSfxVolumeChange: (value) => audio.setSfxVolume(value),
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
        } catch (error) {
          recordGameBootDiagnosticError('game_runtime_construct_hud_failed', error);
          captureGameException(error, {
            event: 'game_runtime_construct_hud_failed',
            category: 'app_runtime',
            data: {
              entryRoute: this.entryRoute,
              locale: this.i18n.current
            }
          });
          throw error;
        }
        recordGameBootDiagnostic('game_runtime_construct_hud_completed');
        gameHud.setQualityState(this.gameQualityState);

        // Store unsubscribe functions so they can be cleaned up when leaving the game runtime
        this.gameRuntimeUnsubscribers = [
          audio.onSettingsChange((settings) => {
            gameHud.setAudioControls(settings);
          }),
          game.onAudioEvent((event) => {
            audio.handleEvent(event);
          }),
          game.onScoreChange(() => {
            if (this.mode.is('game') || this.mode.is('game_over')) {
              this.refreshUI();
            }
          })
        ];

        const runtime: LoadedGameRuntime = {
          game,
          audio,
          gameHud,
          projectGameHudPayload: module.projectGameHudPayload
        };
        this.gameRuntime = runtime;

        recordGameBootDiagnostic('game_runtime_audio_prime_deferred_to_launch');

        this.refreshUI();
        recordGameBootDiagnostic('session_ok', {
          entryRoute: this.entryRoute
        });
        recordGameBootDiagnostic('game_runtime_ready');
        return runtime;
      })
      .catch((error) => {
        recordGameBootDiagnosticError('session_fail', error, {
          entryRoute: this.entryRoute
        });
        recordGameBootDiagnosticError('game_runtime_load_failed', error);
        captureGameException(error, {
          event: 'game_runtime_load_failed',
          category: 'app_runtime',
          data: {
            entryRoute: this.entryRoute
          }
        });
        throw error;
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
    void this.ensurePrimateriePortalLoaded()
      .then(() => {
        if (this.entryRoute === 'primaterie') {
          this.enterprimateriePortalMode();
          this.scheduleGameRuntimeModulePrefetch();
        }
      })
      .catch((error) => {
        recordGameBootDiagnosticError('entry_route_primaterie_portal_failed', error);
        captureGameException(error, {
          event: 'entry_route_primaterie_portal_failed',
          category: 'entry_route',
          data: {
            entryRoute: this.entryRoute
          }
        });
        console.error('Failed to load primaterie portal for /primaterie.', error);
      });
  }

  private setprimateriePortalVisible(visible: boolean) {
    this.primateriePortalRuntime?.setVisible(visible);
  }

  public prepareAdventureLaunch() {
    if (this.adventureLaunchPrepared) {
      return Promise.resolve();
    }
    if (this.adventureLaunchPreparationPromise) {
      return this.adventureLaunchPreparationPromise;
    }
    this.hasObservedUserGesture = true;
    const adventureLoadStartedAt = performance.now();
    this.adventureLaunchPreparationPromise = this.ensurePrimateriePortalLoaded().then(async () => {
      const mobile = isMobileRuntime();
      this.primateriePortal.setBusy(true);
      this.primateriePortal.setLoading(true);
      this.primateriePortal.setLoadingMessage(
        this.i18n.current === 'fr' ? 'Préparation de l’aventure…' : 'Preparing adventure…'
      );
      this.trackAdventureLaunchPhase('adventure_loading_requested', {
        preloadQueue: 'prepare_adventure_launch'
      });
      recordGameBootDiagnostic('adventure_loading_requested', {
        entryRoute: this.entryRoute,
        mobile,
        profile: this.performanceProfile.id,
        runtimeReady: Boolean(this.gameRuntime),
        assetsReady: this.primaterieHubPreloaded
      });

      this.trackAdventureLaunchPhase('adventure_runtime_loading', {
        preloadQueue: 'runtime_module'
      });
      recordGameBootDiagnostic('adventure_runtime_loading', {
        mobile,
        profile: this.performanceProfile.id
      });
      await this.ensureGameRuntimeLoaded();
      this.game.beginPortalPreview();
      this.game.clearPortalPreviewTransitionIntent();
      this.syncprimateriePortalLayout();
      recordGameBootDiagnostic('adventure_runtime_ready', {
        mobile,
        gameState: this.game.currentState
      });
      await new Promise<void>((resolve) => window.setTimeout(resolve, 0));
      await this.prepareAdventureCriticalAssets();
      const qualityDowngrade = this.qualityController.applyAdventureLoadMeasurement(performance.now() - adventureLoadStartedAt);
      if (qualityDowngrade) {
        this.handleGameQualityChange(qualityDowngrade);
      }
      await this.runAdventureSafetyWarmup();
      this.adventureLaunchPrepared = true;
      recordGameBootDiagnostic('adventure_ready', {
        mobile,
        profile: this.performanceProfile.id,
        quality: this.gameQualityState.resolved,
        gameState: this.game.currentState
      });
      clearAdventureLaunchTracking();
    })
      .catch((error) => {
        this.adventureLaunchPrepared = false;
        clearAdventureLaunchTracking();
        recordGameBootDiagnosticError('adventure_prepare_failed', error, {
          entryRoute: this.entryRoute,
          profile: this.performanceProfile.id
        });
        this.primateriePortal.setBusy(false);
        this.primateriePortal.setLoading(false);
        this.primateriePortal.setLoadingMessage(this.i18n.current === 'fr' ? 'Chargement impossible' : 'Loading failed');
        throw error;
      })
      .finally(() => {
        this.adventureLaunchPreparationPromise = null;
      });

    return this.adventureLaunchPreparationPromise;
  }

  public resumePreparedAdventureLaunch() {
    if (!this.primateriePortalRuntime || !this.mode.is('primaterie_portal') || !this.adventureLaunchPrepared) {
      return false;
    }
    if (this.primateriePendingAction || this.mode.is('game_transition')) {
      return false;
    }
    this.primateriePortal.setBusy(true);
    this.primateriePortal.setLoading(true);
    this.primateriePortal.setLoadingMessage(this.i18n.current === 'fr' ? 'Décollage…' : 'Launching…');
    this.primateriePendingAction = {
      execute: () => this.startGameTransition(true)
    };
    return true;
  }

  private prepareAdventureCriticalAssets() {
    if (!this.gameRuntime) {
      return Promise.resolve();
    }
    if (this.primaterieHubPreloadPromise) {
      return this.primaterieHubPreloadPromise;
    }
    if (this.primaterieHubPreloaded) {
      return Promise.resolve();
    }

    this.primaterieHubPreloadPromise = (async () => {
      const mobile = isMobileRuntime();
      this.trackAdventureLaunchPhase('adventure_assets_preloading', {
        preloadQueue: 'game_critical_assets'
      });
      recordGameBootDiagnostic('adventure_assets_preloading', {
        mobile,
        profile: this.performanceProfile.id,
        gameplayPhase: 'critical',
        hudPhase: 'critical'
      });
      await this.game.preloadAssets({ phase: 'critical' });
      await new Promise<void>((resolve) => window.setTimeout(resolve, mobile ? 32 : 10));
      await this.gameHud.preloadAssets({
        phase: 'critical',
        scheduleDeferred: true,
        includeAvatarAssets: false,
        includeDecorativeAssets: false
      });
      await new Promise<void>((resolve) => window.setTimeout(resolve, mobile ? 28 : 10));
      if (this.hasObservedUserGesture) {
        if (mobile) {
          recordGameBootDiagnostic('adventure_audio_prepare_deferred_to_post_launch', {
            mobile: true
          });
        } else {
          this.audio.registerUserGesture();
          recordGameBootDiagnostic('adventure_audio_prepare_started', {
            mobile,
            level: 'core'
          });
          await this.audio.prepareForLaunch('core').catch((error) => {
            recordGameBootDiagnosticError('adventure_audio_prepare_failed', error, {
              mobile,
              level: 'core'
            });
            recordGameBootWarning('adventure_audio_prepare_non_critical_failed', {
              mobile,
              message: error instanceof Error ? error.message : String(error)
            });
          });
          recordGameBootDiagnostic('adventure_audio_prepare_completed', {
            mobile,
            level: 'core'
          });
          await new Promise<void>((resolve) => window.setTimeout(resolve, 0));
        }
      }
      this.primaterieHubPreloaded = true;
      recordGameBootDiagnostic('adventure_assets_ready', {
        mobile,
        deferredWarmup: 'post_game_start'
      });
    })()
      .catch((error) => {
        recordGameBootDiagnosticError('adventure_assets_preload_failed', error, {
          entryRoute: this.entryRoute
        });
        captureGameException(error, {
          event: 'adventure_assets_preload_failed',
          category: 'primaterie_preload',
          data: {
            entryRoute: this.entryRoute
          }
        });
        console.warn('[AppController] Failed to preload adventure critical assets.', error);
        throw error;
      })
      .finally(() => {
        this.primaterieHubPreloadPromise = null;
      });

    return this.primaterieHubPreloadPromise;
  }

  private async runAdventureSafetyWarmup() {
    if (this.gameQualityState.selection !== 'auto' || !isMobileRuntime()) {
      return;
    }

    const mobile = isMobileRuntime();
    const appleMobile = isAppleMobileRuntime();
    this.trackAdventureLaunchPhase('adventure_safety_warmup', {
      preloadQueue: 'adventure_safety_warmup'
    });
    recordGameBootDiagnostic('adventure_safety_warmup', {
      mobile,
      appleMobile,
      quality: this.gameQualityState.resolved
    });
    const warmupSample = await this.collectAnimationFrameSample(appleMobile ? 10 : 8);
    const qualityChange = this.qualityController.applyAdventureSafetyWarmup(warmupSample);
    if (qualityChange) {
      this.handleGameQualityChange(qualityChange);
    }
    this.trackAdventureLaunchPhase('adventure_safety_warmup', {
      preloadQueue: 'adventure_safety_warmup_complete',
      lastDiagnosticEvent: 'adventure_safety_warmup_completed',
      fpsAverage: warmupSample.frameMsAverage > 0 ? 1000 / warmupSample.frameMsAverage : 0,
      frameMsP95: warmupSample.frameMsP95,
      sampleCount: warmupSample.sampleCount
    });
    recordGameBootDiagnostic('adventure_safety_warmup_completed', {
      mobile,
      appleMobile,
      quality: this.gameQualityState.resolved,
      frameMsAverage: Number(warmupSample.frameMsAverage.toFixed(2)),
      frameMsP95: Number(warmupSample.frameMsP95.toFixed(2)),
      sampleCount: warmupSample.sampleCount
    });
  }

  private collectAnimationFrameSample(sampleCount: number) {
    return new Promise<{ frameMsAverage: number; frameMsP95: number; sampleCount: number }>((resolve) => {
      const samples: number[] = [];
      let previousTime = 0;

      const finalize = () => {
        if (samples.length === 0) {
          resolve({
            frameMsAverage: 0,
            frameMsP95: 0,
            sampleCount: 0
          });
          return;
        }
        const average = samples.reduce((sum, sample) => sum + sample, 0) / samples.length;
        const sorted = [...samples].sort((left, right) => left - right);
        const p95Index = Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95));
        resolve({
          frameMsAverage: average,
          frameMsP95: sorted[p95Index] ?? average,
          sampleCount: samples.length
        });
      };

      const capture = (now: number) => {
        if (previousTime > 0) {
          samples.push(Math.max(0, now - previousTime));
        }
        previousTime = now;
        if (samples.length >= sampleCount) {
          finalize();
          return;
        }
        window.requestAnimationFrame(capture);
      };

      window.requestAnimationFrame(capture);
    });
  }

  private trackAdventureLaunchPhase(
    phase: AdventureLaunchPhase,
    options: {
      preloadQueue?: string;
      lastDiagnosticEvent?: string;
      fpsAverage?: number;
      frameMsP95?: number;
      sampleCount?: number;
    } = {}
  ) {
    const loopStats = this.loop.getStats();
    const snapshot = {
      route: this.entryRoute,
      phase,
      qualityState: this.gameQualityState,
      fpsAverage: options.fpsAverage ?? loopStats.fpsAverage,
      frameMsP95: options.frameMsP95 ?? loopStats.frameMsP95,
      sampleCount: options.sampleCount ?? loopStats.sampleCount,
      preloadQueue: options.preloadQueue,
      lastDiagnosticEvent: options.lastDiagnosticEvent ?? phase
    };
    addGameBreadcrumb(
      `Adventure phase: ${phase}`,
      {
        route: snapshot.route,
        quality: snapshot.qualityState.resolved,
        selection: snapshot.qualityState.selection,
        preloadQueue: snapshot.preloadQueue,
        fpsAverage: Number(snapshot.fpsAverage.toFixed(1)),
        frameMsP95: Number(snapshot.frameMsP95.toFixed(2)),
        sampleCount: snapshot.sampleCount
      },
      'info',
      'game.adventure.phase'
    );

    if (phase === 'adventure_loading_requested' || phase === 'adventure_transition_resume') {
      beginAdventureLaunchTracking(snapshot);
      return;
    }
    updateAdventureLaunchTracking(snapshot);
  }

  private flushPendingAdventureCrashReport(elapsedTime = performance.now() / 1000) {
    if (!hasStoredAdventureCrashReport() || elapsedTime - this.lastPendingCrashReportFlushAt < 2.4) {
      return;
    }
    this.lastPendingCrashReportFlushAt = elapsedTime;
    if (flushStoredAdventureCrashReport()) {
      recordGameBootDiagnostic('adventure_crash_report_flushed', {
        recoveryForced: this.gameQualityState.recoveryForced
      });
    }
  }

  private scheduleGameRuntimeModulePrefetch() {
    if (
      !this.performanceProfile.prefetchGameRuntimeOnHubIdle ||
      this.entryRoute !== 'primaterie' ||
      this.gameRuntime ||
      this.gameRuntimeLoader ||
      this.gameRuntimeModule ||
      this.gameRuntimeModulePromise ||
      this.gameRuntimeModulePrefetchScheduled
    ) {
      return;
    }

    this.gameRuntimeModulePrefetchScheduled = true;
    const runPrefetch = () => {
      if (
        this.entryRoute !== 'primaterie' ||
        !this.mode.is('primaterie_portal') ||
        this.gameRuntime ||
        this.gameRuntimeLoader ||
        this.gameRuntimeModule
      ) {
        this.gameRuntimeModulePrefetchScheduled = false;
        return;
      }
      void this.loadGameRuntimeModule('prefetch').finally(() => {
        this.gameRuntimeModulePrefetchScheduled = false;
      });
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    };
    if (typeof idleWindow.requestIdleCallback === 'function') {
      idleWindow.requestIdleCallback(runPrefetch, { timeout: 2600 });
      return;
    }
    window.setTimeout(runPrefetch, 900);
  }

  private scheduleGameAssetWarmup() {
    if (!this.gameRuntime || this.gameAssetWarmupScheduled || this.gameAssetWarmupPromise) {
      return;
    }
    this.gameAssetWarmupScheduled = true;
    recordGameBootDiagnostic('game_asset_warmup_scheduled', {
      mobile: this.performanceProfile.isMobile,
      profile: this.performanceProfile.id,
      mode: this.mode.current
    });

    const runWarmup = () => {
      if (!this.gameRuntime) {
        this.gameAssetWarmupScheduled = false;
        return;
      }
      if (!(this.mode.is('game') || this.mode.is('game_over'))) {
        this.gameAssetWarmupScheduled = false;
        recordGameBootDiagnostic('game_asset_warmup_skipped', {
          mode: this.mode.current
        });
        return;
      }
      this.gameAssetWarmupPromise = (async () => {
        recordGameBootDiagnostic('game_asset_warmup_started', {
          mobile: this.performanceProfile.isMobile,
          profile: this.performanceProfile.id
        });
        await Promise.allSettled([
          this.game.preloadAssets({ phase: 'full' }),
          this.gameHud.preloadAssets({
            phase: 'full',
            includeAvatarAssets: !this.performanceProfile.isMobile,
            includeDecorativeAssets: this.gameQualityState.visual.enableGlowEffects && !this.performanceProfile.isMobile
          }),
          this.audio.prepareForLaunch('core')
        ]);
        recordGameBootDiagnostic('game_asset_warmup_completed');
      })()
        .catch((error) => {
          this.gameAssetWarmupScheduled = false;
          recordGameBootDiagnosticError('game_asset_warmup_failed', error);
          console.warn('[AppController] Deferred game asset warmup failed.', error);
        })
        .finally(() => {
          this.gameAssetWarmupPromise = null;
        });
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    };
    if (typeof idleWindow.requestIdleCallback === 'function') {
      idleWindow.requestIdleCallback(runWarmup, { timeout: 2500 });
      return;
    }
    window.setTimeout(runWarmup, 1200);
  }

  private shouldDeferParallaxInitOnLaunch() {
    return this.performanceProfile.isMobile;
  }

  private prepareParallaxForAdventureLaunch() {
    if (this.shouldDeferParallaxInitOnLaunch()) {
      this.parallaxLayers.setAutoInitEnabled(false);
      recordGameBootDiagnostic('parallax_init_deferred_for_launch', {
        mobile: this.performanceProfile.isMobile
      });
      return;
    }

    this.parallaxLayers.setAutoInitEnabled(true);
    void this.parallaxLayers.init();
  }

  private scheduleDeferredParallaxInit() {
    if (
      this.deferredParallaxInitScheduled ||
      this.deferredParallaxInitPromise ||
      this.parallaxLayers.isInitialized()
    ) {
      return;
    }

    this.deferredParallaxInitScheduled = true;
    recordGameBootDiagnostic('parallax_init_warmup_scheduled', {
      mobile: this.performanceProfile.isMobile
    });
    const run = () => {
      this.deferredParallaxInitScheduled = false;
      if (!this.gameRuntime || !(this.mode.is('game') || this.mode.is('game_over'))) {
        recordGameBootDiagnostic('parallax_init_warmup_skipped', {
          mode: this.mode.current
        });
        return;
      }
      this.parallaxLayers.setAutoInitEnabled(true);
      this.deferredParallaxInitPromise = this.parallaxLayers.init()
        .then(() => {
          recordGameBootDiagnostic('parallax_init_warmup_completed');
        })
        .catch((error) => {
          recordGameBootDiagnosticError('parallax_init_warmup_failed', error);
        })
        .finally(() => {
          this.deferredParallaxInitPromise = null;
        });
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    };
    if (typeof idleWindow.requestIdleCallback === 'function') {
      idleWindow.requestIdleCallback(run, { timeout: 1800 });
      return;
    }
    window.setTimeout(run, 900);
  }

  private enterprimateriePortalMode() {
    if (!this.primateriePortalRuntime) {
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
    if (this.gameRuntime) {
      this.game.beginPortalPreview();
      this.game.clearPortalPreviewTransitionIntent();
    }
    this.syncprimateriePortalLayout();
    this.primateriePortal.setBusy(false);
    this.primateriePortal.setLoading(false);
    this.primateriePortal.setLoadingMessage(null);
    this.setprimateriePortalVisible(true);
    if (!this.primaterieHubShellReadyLogged) {
      this.primaterieHubShellReadyLogged = true;
      recordGameBootDiagnostic('primaterie_hub_shell_ready', {
        entryRoute: this.entryRoute,
        runtimeLoaded: Boolean(this.gameRuntime),
        runtimePrefetch: this.performanceProfile.prefetchGameRuntimeOnHubIdle,
        communityArtwork: this.performanceProfile.loadPortalCommunityArtwork
      });
      recordGameBootDiagnostic('primaterie_hub_stable_interactive', {
        entryRoute: this.entryRoute,
        runtimeLoaded: Boolean(this.gameRuntime),
        gameRuntimeStrategy: this.performanceProfile.prefetchGameRuntimeOnHubIdle ? 'idle_chunk_prefetch' : 'on_demand',
        assetWarmupStrategy: 'on_adventure'
      });
    }
    this.refreshUI();
  }

  private activateprimaterieMode(modeId: primaterieModeId) {
    if (!this.primateriePortalRuntime) {
      return;
    }
    if (!this.mode.is('primaterie_portal') || this.primateriePendingAction || this.adventureLaunchPreparationPromise) {
      return;
    }
    if (modeId !== 'adventure') {
      return;
    }
    this.primateriePortal.setBusy(true);
    this.primateriePortal.setLoading(true);
    this.primateriePortal.setLoadingMessage(null);
    void this.prepareAdventureLaunch()
      .then(() => {
        if (!this.mode.is('primaterie_portal')) {
          return;
        }
        this.resumePreparedAdventureLaunch();
      })
      .catch((error) => {
        this.primateriePendingAction = null;
        this.primateriePortal.setBusy(false);
        this.primateriePortal.setLoading(false);
        this.primateriePortal.setLoadingMessage(this.i18n.current === 'fr' ? 'Chargement impossible' : 'Loading failed');
        recordGameBootDiagnosticError('primaterie_adventure_prepare_failed', error, {
          entryRoute: this.entryRoute
        });
        captureGameException(error, {
          event: 'primaterie_adventure_prepare_failed',
          category: 'primaterie_portal',
          data: {
            entryRoute: this.entryRoute,
            modeId
          }
        });
        console.error('Failed to prepare the mini-game runtime from the primaterie hub.', error);
      });
  }

  private returnToPortfolioFromprimateriePortal() {
    if (!this.primateriePortalRuntime) {
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
    this.primateriePendingAction = null;
    this.primateriePortal.setBusy(false);
    this.primateriePortal.setLoading(false);
    this.primateriePortal.setLoadingMessage(null);
    this.setprimateriePortalVisible(false);
    this.mode.setMode('primaterie_transition');
    this.primaterieReturnProgress = 0;
    if (this.gameRuntime) {
      this.game.stop();
    }
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
    if (!this.primateriePortalRuntime) {
      return;
    }
    const preview = this.gameRuntime
      ? this.game.getPortalPreviewLayout()
      : createPrimateriePortalPreviewLayout(performance.now() / 1000);
    this.world.setSingleNodeExternalLayout(preview.position, preview.visual);
    const projected = this.renderer.projectWorldToScreen(preview.position);
    this.primateriePortal.setAnchor(projected.x, projected.y, 1);
  }

  private bindEvents() {
    this.mode.onChange((next, previous) => {
      if (next === 'orbit' && (previous === 'intro_transition' || previous === 'intro_shattering' || previous === 'intro')) {
        this.guide.trigger({ type: 'hub_arrival' }, this.getGuideConstellationTarget());
      }
      if (next === 'primaterie_portal') {
        this.guide.trigger({ type: 'primaterie_arrival' }, this.getGuidePrimaterieAnchorTarget());
      }
      if (next === 'game_over') {
        this.guide.trigger({ type: 'game_over_intro' }, this.getGuideUiTargetByKey('game-save') ?? this.getGuideUiTargetByKey('game-leaderboard'));
      }
      this.updateGuide();
    });

    this.theme.onChange((theme) => {
      this.renderer.setTheme(theme);
      this.musicBackdrop.setTheme(theme);
      this.parallaxLayers.setTheme(theme);
      this.world.setTheme(theme);
      this.voronoiReveal.setTheme(theme);
      if (this.gameRuntime) {
        this.game.setTheme(theme);
      }
      this.primateriePortalRuntime?.setLocale(this.i18n.current);
      this.refreshUI();
    });

    this.i18n.onChange(() => {
      if (this.gameRuntime) {
        this.game.setLocale(this.i18n.current);
      }
      this.primateriePortalRuntime?.setLocale(this.i18n.current);
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
      this.guide.trigger({ type: 'slots_complete' }, this.getGuideConstellationTarget());

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

    const handleViewportStateChange = () => {
      this.syncRuntimeDeviceState();
      this.refreshRotateOverlayCopy();
    };
    observeRuntimeViewport(handleViewportStateChange);
    window.addEventListener('wheel', this.onWheel, { passive: false });
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    const canvas = this.renderer.renderer.domElement;
    canvas.addEventListener('pointerdown', this.onGamePointerDown);
    canvas.addEventListener('pointerup', this.onGamePointerUp);
    canvas.addEventListener('pointercancel', this.onGamePointerCancel);
    this.uiHost.addEventListener('pointerover', this.onGuideUiPointerOver);
    this.uiHost.addEventListener('pointerout', this.onGuideUiPointerOut);
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
      const project = this.portfolioHubProjects[this.activeIndex] || null;
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

  private onGuideUiPointerOver = (event: PointerEvent) => {
    const nextElement = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-guide-hover]') ?? null;
    if (nextElement === this.hoveredGuideUiElement) {
      return;
    }
    this.hoveredGuideUiElement = nextElement;
    this.hoveredGuideUiKey = nextElement?.dataset.guideHover ?? null;
    this.handleGuideUiHoverChange();
  };

  private onGuideUiPointerOut = (event: PointerEvent) => {
    if (!this.hoveredGuideUiElement) {
      return;
    }
    const previousKey = this.hoveredGuideUiKey;
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    if (relatedTarget && this.hoveredGuideUiElement.contains(relatedTarget)) {
      return;
    }
    if (relatedTarget?.closest<HTMLElement>('[data-guide-hover]') === this.hoveredGuideUiElement) {
      return;
    }
    this.hoveredGuideUiElement = null;
    this.hoveredGuideUiKey = null;
    this.guide.resetHoverCooldown(previousKey);
    this.updateGuide();
  };

  private handleGuideUiHoverChange() {
    const key = this.hoveredGuideUiKey;
    const target = this.getGuideUiTargetByKey(key) ?? this.getGuideTargetFromElement(this.hoveredGuideUiElement);
    if (!key || !target) {
      this.updateGuide();
      return;
    }

    if (key === 'primaterie-portfolio') {
      this.guide.trigger({ type: 'primaterie_hover', item: 'portfolio' }, target);
    } else if (key === 'primaterie-adventure') {
      this.guide.trigger({ type: 'primaterie_hover', item: 'adventure' }, target);
    } else if (key === 'primaterie-discord') {
      this.guide.trigger({ type: 'primaterie_hover', item: 'discord' }, target);
    } else if (key === 'primaterie-patreon') {
      this.guide.trigger({ type: 'primaterie_hover', item: 'patreon' }, target);
    } else if (key === 'primaterie-theme') {
      this.guide.trigger({ type: 'primaterie_hover', item: 'theme' }, target);
    } else if (key === 'primaterie-language') {
      this.guide.trigger({ type: 'primaterie_hover', item: 'language' }, target);
    } else if (key === 'game-score') {
      this.guide.trigger({ type: 'game_over_hover', item: 'score' }, target);
    } else if (key === 'game-avatar') {
      if (!this.hasCompletedGuideObjective('avatar')) {
        this.guide.trigger({ type: 'game_over_hover', item: 'avatar' }, target);
      }
    } else if (key === 'game-avatar-ears') {
      this.guide.trigger({ type: 'avatar_hover', item: 'ears' }, target);
    } else if (key === 'game-avatar-parts') {
      this.guide.trigger({ type: 'avatar_hover', item: 'parts' }, target);
    } else if (key === 'game-avatar-save') {
      if (!this.hasCompletedGuideObjective('avatar')) {
        this.guide.trigger({ type: 'avatar_hover', item: 'save' }, target);
      }
    } else if (key === 'game-avatar-close') {
      this.guide.trigger({ type: 'avatar_hover', item: 'close' }, target);
    } else if (key === 'game-save') {
      if (!this.hasCompletedGuideObjective('register-score')) {
        this.guide.trigger({ type: 'game_over_hover', item: 'save' }, target);
      }
    } else if (key === 'game-leaderboard') {
      this.guide.trigger({ type: 'game_over_hover', item: 'leaderboard' }, target);
    } else if (key === 'game-replay') {
      this.guide.trigger({ type: 'game_over_hover', item: 'replay' }, target);
    } else if (key === 'game-menu') {
      this.guide.trigger({ type: 'game_over_hover', item: 'menu' }, target);
    } else if (key === 'game-tutorial') {
      if (!this.hasCompletedGuideObjective('tutorial')) {
        this.guide.trigger({ type: 'tutorial_hover', item: 'entry' }, target);
      }
    } else if (key === 'game-tutorial-nav') {
      if (!this.hasCompletedGuideObjective('tutorial')) {
        this.guide.trigger({ type: 'tutorial_hover', item: 'nav' }, target);
      }
    } else if (key === 'game-tutorial-close') {
      this.guide.trigger({ type: 'tutorial_hover', item: 'close' }, target);
    } else if (key === 'game-achievements') {
      this.guide.trigger({ type: 'achievements_hover', item: 'entry' }, target);
    } else if (key === 'game-achievements-filters') {
      this.guide.trigger({ type: 'achievements_hover', item: 'filters' }, target);
    } else if (key === 'game-achievements-close') {
      this.guide.trigger({ type: 'achievements_hover', item: 'close' }, target);
    } else if (key === 'game-settings-toggle') {
      if (!this.hasCompletedGuideObjective('sound')) {
        this.guide.trigger({ type: 'settings_hover', item: 'entry' }, target);
      }
    } else if (key === 'game-settings-help') {
      this.guide.trigger({ type: 'settings_hover', item: 'help' }, target);
    } else if (key === 'game-settings-theme') {
      this.guide.trigger({ type: 'settings_hover', item: 'theme' }, target);
    } else if (key === 'game-settings-language') {
      this.guide.trigger({ type: 'settings_hover', item: 'language' }, target);
    } else if (key === 'game-settings-fullscreen') {
      this.guide.trigger({ type: 'settings_hover', item: 'fullscreen' }, target);
    } else if (key === 'game-settings-mute') {
      this.guide.trigger({ type: 'settings_hover', item: 'mute' }, target);
    } else if (key === 'game-settings-volume') {
      this.guide.trigger({ type: 'settings_hover', item: 'volume' }, target);
    } else if (key === 'game-control-left') {
      this.guide.trigger({ type: 'game_control_hint', item: 'left' }, target);
    } else if (key === 'game-control-up') {
      this.guide.trigger({ type: 'game_control_hint', item: 'up' }, target);
    } else if (key === 'game-control-right') {
      this.guide.trigger({ type: 'game_control_hint', item: 'right' }, target);
    } else if (key === 'game-control-down') {
      this.guide.trigger({ type: 'game_control_hint', item: 'down' }, target);
    }

    this.updateGuide();
  }

  private stepActiveIndex(direction: number) {
    this.activeIndex = wrapIndex(this.activeIndex + direction, this.portfolioHubProjects.length);
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

    const lastIndex = this.portfolioHubProjects.length - 1;
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
    const project = this.portfolioHubProjects[this.activeIndex] || null;
    if (project) {
      this.guide.trigger({ type: 'portfolio_scroll', project, direction: direction > 0 ? 1 : -1 }, this.getGuidePortfolioCenterTarget());
    }
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

    const project = this.portfolioHubProjects[index] || null;
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
          this.guide.trigger(
            { type: 'focus_enter', project: focusedProject, facetIndex: this.world.getFocusedFacetIndex() },
            this.getGuideFocusTarget() ?? this.getGuideTargetForProject(focusedProject.id)
          );
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
          recordGameBootDiagnosticError('game_fail', error, {
            phase: 'runtime_load',
            forceDirectEntry,
            skipPreAlign
          });
          recordGameBootWarning('game_transition_runtime_load_failed', {
            message: error instanceof Error ? error.message : String(error)
          });
          captureGameException(error, {
            event: 'game_transition_runtime_load_failed',
            category: 'game_transition',
            data: {
              forceDirectEntry,
              skipPreAlign,
              fromMode: this.mode.current
            }
          });
          console.error('Failed to load game runtime before starting the mini-game.', error);
        });
      return;
    }

    if (this.about.opened) {
      this.about.close();
    }

    this.audio.registerUserGesture();
    this.audio.prime();
    this.gameTransitionReturningToHub = false;
    recordGameBootDiagnostic('game_start', {
      forceDirectEntry,
      skipPreAlign,
      fromMode: this.mode.current
    });
    recordGameBootDiagnostic('game_transition_requested', {
      forceDirectEntry,
      skipPreAlign,
      fromMode: this.mode.current
    });
    addGameBreadcrumb(
      'Game transition requested',
      {
        forceDirectEntry,
        skipPreAlign,
        fromMode: this.mode.current
      },
      'info',
      'game.lifecycle'
    );
    this.prepareParallaxForAdventureLaunch();

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
    this.parallaxLayers.rearmAdventureIntro();
    this.parallaxLayers.beginAdventureIntro();
    this.parallaxLayers.setTransitionState(true, 0);
    if (this.gameTransitionFromprimaterie) {
      this.trackAdventureLaunchPhase('adventure_game_start', {
        preloadQueue: 'game_transition'
      });
      recordGameBootDiagnostic('adventure_game_start', {
        entryRoute: this.entryRoute,
        profile: this.performanceProfile.id
      });
    }
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
        this.world.setShardLockTransition(!this.gameTransitionFromprimaterie, value);
      },
      onComplete: () => {
        const enteredFromPrimaterie = this.gameTransitionFromprimaterie;
        this.gameTransitionTweenId = null;
        this.gameTransitionProgress = 1;
        this.gameTransitionFromprimaterie = false;
        this.gameTransitionReturningToHub = false;
        this.gameTransitionAnchor = null;
        this.world.setShardLockTransition(false, 0);
        this.mode.setMode('game');
        this.loop.resetStats();
        this.game.beginRun();
        this.qualityController.markRunStarted(performance.now() / 1000);
        this.adventureRunStartedAt = enteredFromPrimaterie ? performance.now() / 1000 : Number.NEGATIVE_INFINITY;
        this.adventureFirstFramesLogged = false;
        this.adventureStableLogged = false;
        recordGameBootDiagnostic('game_ok', {
          forceDirectEntry,
          source: enteredFromPrimaterie ? 'primaterie' : 'portfolio'
        });
        setSentryContext('game_transition', {
          forceDirectEntry,
          entryRoute: this.entryRoute,
          source: enteredFromPrimaterie ? 'primaterie' : 'portfolio'
        });
        this.parallaxLayers.resetForRun(this.game.getParallaxCoverageAnchorX());
        const gameFieldCount = this.getGameFieldCount();
        const layout = this.game.getVisiblePlatformLayout(gameFieldCount);
        this.world.setExternalLayoutSnapshot(layout.positions, layout.scales, layout.visuals);
        this.scheduleGameAssetWarmup();
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
    addGameBreadcrumb('Game restart requested', undefined, 'info', 'game.lifecycle');
    this.loop.resetStats();
    this.game.restart();
    this.qualityController.markRunStarted(performance.now() / 1000);
    this.parallaxLayers.resetForRun(this.game.getParallaxCoverageAnchorX());
    const gameFieldCount = this.getGameFieldCount();
    const layout = this.game.getVisiblePlatformLayout(gameFieldCount);
    this.world.setExternalLayoutSnapshot(layout.positions, layout.scales, layout.visuals);
    this.refreshUI();
  }

  private exitGame() {
    if (!this.gameRuntime) {
      return;
    }
    if (!isGameRuntimeMode(this.mode.current)) {
      return;
    }

    clearAdventureLaunchTracking();
    this.adventureRunStartedAt = Number.NEGATIVE_INFINITY;
    this.adventureFirstFramesLogged = false;
    this.adventureStableLogged = false;

    // Clean up all subscriptions and UI listeners before exiting
    this.gameRuntimeUnsubscribers.forEach((unsubscribe) => unsubscribe());
    this.gameRuntimeUnsubscribers.length = 0;
    this.gameHud.dispose();

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

  private getprimateriePortalCameraPose(
    positionTarget: THREE.Vector3 = this.scratchPrimateriePosition,
    lookAtTarget: THREE.Vector3 = this.scratchPrimaterieLookAt
  ) {
    const preview = this.gameRuntime
      ? this.game.getPortalPreviewLayout()
      : createPrimateriePortalPreviewLayout(performance.now() / 1000);
    const mobilePreviewScale = window.innerWidth <= 820 ? 0.88 : 1;
    return {
      position: positionTarget.copy(preview.position).addScaledVector(MINI_GAME_PORTAL_CAMERA_OFFSET, mobilePreviewScale),
      lookAt: lookAtTarget.copy(preview.position)
    };
  }

  private get performanceProfile() {
    return getPerformanceProfile();
  }

  private setGameQualitySelection(selection: GameQualitySelection) {
    const nextState = this.qualityController.setSelection(selection);
    this.gameQualityState = nextState;
    this.applyGameQualityState(true);
    recordGameBootDiagnostic('game_quality_selected', {
      selection: nextState.selection,
      resolved: nextState.resolved,
      source: nextState.source,
      recoveryForced: nextState.recoveryForced
    });
  }

  private observeAutoGameQuality(deltaTime: number, elapsedTime: number) {
    const change = this.qualityController.observeRuntimeFrame(deltaTime, elapsedTime, this.loop.getStats());
    if (change) {
      this.handleGameQualityChange(change);
    }
  }

  private observeAdventureLaunchStability(elapsedTime: number) {
    if (!Number.isFinite(this.adventureRunStartedAt)) {
      return;
    }

    const loopStats = this.loop.getStats();
    const runElapsed = elapsedTime - this.adventureRunStartedAt;
    if (!this.adventureFirstFramesLogged && loopStats.sampleCount >= 8) {
      this.adventureFirstFramesLogged = true;
      this.trackAdventureLaunchPhase('adventure_first_frames', {
        preloadQueue: 'adventure_first_frames',
        lastDiagnosticEvent: 'adventure_first_frames'
      });
      recordGameBootDiagnostic('adventure_first_frames', {
        quality: this.gameQualityState.resolved,
        fpsAverage: Number(loopStats.fpsAverage.toFixed(1)),
        frameMsP95: Number(loopStats.frameMsP95.toFixed(2)),
        sampleCount: loopStats.sampleCount
      });
    }

    if (!this.adventureStableLogged && runElapsed >= 4.8 && loopStats.sampleCount >= 30) {
      this.adventureStableLogged = true;
      this.qualityController.markAdventureStable(elapsedTime);
      this.trackAdventureLaunchPhase('adventure_stable', {
        preloadQueue: 'adventure_stable',
        lastDiagnosticEvent: 'adventure_stable'
      });
      recordGameBootDiagnostic('adventure_stable', {
        quality: this.gameQualityState.resolved,
        fpsAverage: Number(loopStats.fpsAverage.toFixed(1)),
        frameMsP95: Number(loopStats.frameMsP95.toFixed(2)),
        sampleCount: loopStats.sampleCount,
        stableAfterSeconds: Number(runElapsed.toFixed(2))
      });
      this.scheduleDeferredParallaxInit();
      clearAdventureLaunchTracking();
    }
  }

  private handleGameQualityChange(change: {
    previousQuality: GameQualityState['resolved'];
    newQuality: GameQualityState['resolved'];
    reason: string;
    state: GameQualityState;
  }) {
    this.gameQualityState = change.state;
    this.applyGameQualityState(true);
    const upgraded =
      getResolvedGameQualityRank(change.newQuality) < getResolvedGameQualityRank(change.previousQuality);
    recordGameBootDiagnostic(upgraded ? 'auto_quality_upgrade' : 'auto_quality_downgrade', {
      previousQuality: change.previousQuality,
      newQuality: change.newQuality,
      reason: change.reason
    });
  }

  private getProjectedLandingFeedbackPayload() {
    if (!this.gameRuntime) {
      return null;
    }
    const feedback = this.game.getLandingFeedbackState();
    if (!feedback) {
      return null;
    }
    const projected = this.renderer.projectWorldToScreen(feedback.worldPosition);
    if (!projected.visible) {
      return null;
    }
    return {
      serial: feedback.serial,
      grade: feedback.grade,
      twist: feedback.twist,
      progress: feedback.progress,
      screenX: projected.x,
      screenY: projected.y
    };
  }

  private applyGameQualityState(forceRefresh = false) {
    document.documentElement.dataset.gameQuality = this.gameQualityState.resolved;
    document.documentElement.dataset.gameQualitySelection = this.gameQualityState.selection;
    document.documentElement.dataset.gameQualityRecovery = this.gameQualityState.recoveryForced ? 'on' : 'off';
    this.root.dataset.gameQuality = this.gameQualityState.resolved;
    this.root.dataset.gameQualitySelection = this.gameQualityState.selection;
    this.root.dataset.gameQualityRecovery = this.gameQualityState.recoveryForced ? 'on' : 'off';
    this.uiHost.dataset.gameQuality = this.gameQualityState.resolved;
    this.uiHost.dataset.gameQualitySelection = this.gameQualityState.selection;
    this.uiHost.dataset.gameQualityRecovery = this.gameQualityState.recoveryForced ? 'on' : 'off';

    if (this.musicBackdrop) {
      this.musicBackdrop.setVisualQuality(this.gameQualityState.visual);
    }
    if (this.parallaxLayers) {
      this.parallaxLayers.setVisualQuality(this.gameQualityState.visual);
    }
    this.gameRuntime?.game.setVisualQuality(this.gameQualityState.visual);
    this.gameRuntime?.gameHud.setQualityState(this.gameQualityState);
    this.primateriePortalRuntime?.setCommunityAssetTier(this.gameQualityState.visual.assetTier);

    if (forceRefresh) {
      this.refreshUI();
    }
  }

  private resolveTargetFps() {
    const profile = this.performanceProfile;
    return this.mode.is('game') || this.mode.is('game_transition') || this.mode.is('game_over')
      ? 0
      : profile.targetShellFps;
  }

  private shouldRefreshUi(elapsedTime: number) {
    const nextRefreshAt = this.lastUiRefreshAt + this.performanceProfile.uiRefreshIntervalMs / 1000;
    if (elapsedTime < nextRefreshAt) {
      return false;
    }
    this.lastUiRefreshAt = elapsedTime;
    return true;
  }

  private shouldUpdateGameHud(elapsedTime: number) {
    const nextUpdateAt = this.lastHudUpdateAt + this.performanceProfile.hudUpdateIntervalMs / 1000;
    if (elapsedTime < nextUpdateAt) {
      return false;
    }
    this.lastHudUpdateAt = elapsedTime;
    return true;
  }

  private shouldUpdateGuide(elapsedTime: number) {
    const nextUpdateAt = this.lastGuideUpdateAt + this.performanceProfile.guideUpdateIntervalMs / 1000;
    if (elapsedTime < nextUpdateAt) {
      return false;
    }
    this.lastGuideUpdateAt = elapsedTime;
    return true;
  }

  private buildPerfDebugSnapshot() {
    const profile = this.performanceProfile;
    const quality = this.gameQualityState;
    const loopStats = this.loop.getStats();
    const rendererStats = this.renderer.getDebugStats();
    const assetStats = getBrowserAssetCacheStats();
    const memory = (performance as Performance & {
      memory?: {
        usedJSHeapSize?: number;
        jsHeapSizeLimit?: number;
      };
    }).memory;
    const flags = [
      `quality:${quality.selection}/${quality.resolved}`,
      `recovery:${quality.recoveryForced ? 'on' : 'off'}`,
      `backdrop:${quality.visual.showMusicReactiveBackdrop ? 'on' : 'off'}`,
      `boats:${quality.visual.showMomentumBoats ? 'on' : 'off'}`,
      `parallax:${quality.visual.showParallaxLayers ? 'on' : 'off'}`,
      `hudAnim:${quality.visual.enableHudAnimations ? 'on' : 'off'}`,
      `helpAuto:${profile.enableAutoHelpTutorial ? 'on' : 'off'}`,
      `runtimePrefetch:${profile.prefetchGameRuntimeOnHubIdle ? 'on' : 'off'}`,
      `portalArtwork:${profile.loadPortalCommunityArtwork ? 'on' : 'off'}`
    ];
    return {
      profile: profile.id,
      mode: this.mode.current,
      gameState: this.gameRuntime ? this.game.currentState : null,
      targetFps: this.resolveTargetFps(),
      fpsAverage: loopStats.fpsAverage,
      frameMsAverage: loopStats.frameMsAverage,
      frameMsP95: loopStats.frameMsP95,
      activeLoops: loopStats.activeLoopCount,
      rendererCalls: rendererStats.renderCalls,
      rendererTriangles: rendererStats.triangles,
      rendererPoints: rendererStats.points,
      rendererLines: rendererStats.lines,
      rendererTextures: rendererStats.textures,
      rendererGeometries: rendererStats.geometries,
      visibleObjects: rendererStats.visibleObjects,
      assetCachedImages: assetStats.cachedImages,
      assetLoadedImages: assetStats.loadedImages,
      assetCachedTextures: assetStats.cachedTextures,
      assetQueuedPreloads: assetStats.queuedPreloads,
      assetActivePreloads: assetStats.activePreloads,
      assetPreloadConcurrency: assetStats.preloadConcurrency,
      memoryUsedMb: memory?.usedJSHeapSize ? memory.usedJSHeapSize / (1024 * 1024) : null,
      memoryLimitMb: memory?.jsHeapSizeLimit ? memory.jsHeapSizeLimit / (1024 * 1024) : null,
      flags
    };
  }

  private getAccentColor(elapsedTime: number) {
    const cycleDuration = ACCENT_COLOR_HOLD_SECONDS + ACCENT_COLOR_BLEND_SECONDS;
    const cycleIndex = Math.floor(elapsedTime / cycleDuration) % ACCENT_COLOR_CYCLE.length;
    const cycleTime = elapsedTime % cycleDuration;
    const from = this.scratchAccentColor.set(ACCENT_COLOR_CYCLE[cycleIndex]);
    if (cycleTime <= ACCENT_COLOR_HOLD_SECONDS) {
      return `#${from.getHexString()}`;
    }
    const to = this.scratchAccentColorB.set(ACCENT_COLOR_CYCLE[(cycleIndex + 1) % ACCENT_COLOR_CYCLE.length]);
    const blend = THREE.MathUtils.clamp((cycleTime - ACCENT_COLOR_HOLD_SECONDS) / ACCENT_COLOR_BLEND_SECONDS, 0, 1);
    from.lerp(to, blend);
    return `#${from.getHexString()}`;
  }

  private update(deltaTime: number, elapsedTime: number) {
    this.flushPendingAdventureCrashReport(elapsedTime);
    this.guideDeltaAccumulator += deltaTime;
    this.transitions.update(deltaTime);
    const accentColor = this.getAccentColor(elapsedTime);
    document.documentElement.style.setProperty('--accent-color', accentColor);
    this.voronoiReveal.setEnabled(!isGameRuntimeMode(this.mode.current));
    this.voronoiReveal.update(deltaTime);
    const cameraOrbitPose = this.cameraOrbit.update(
      deltaTime,
      this.world.getPivot(this.scratchPivot),
      this.scratchOrbitPosition,
      this.scratchOrbitLookAt
    );
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
      if (!orientationBlocked && (this.mode.is('game') || this.mode.is('game_over'))) {
        this.observeAutoGameQuality(deltaTime, elapsedTime);
        this.observeAdventureLaunchStability(elapsedTime);
      }
      const audioActive =
        (this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over')) &&
        !this.gameTransitionReturningToHub &&
        this.game.currentState !== 'portal_preview' &&
        this.game.currentState !== 'idle';
      this.audio.setEnabled(audioActive);
      this.audio.update(this.game.getAudioState(), deltaTime);

      if (this.mode.is('game') || this.mode.is('game_over')) {
        const gameFieldCount = this.getGameFieldCount();
        const layout = this.game.getVisiblePlatformLayout(gameFieldCount);
        this.world.setExternalLayoutSnapshot(layout.positions, layout.scales, layout.visuals);
      }

      if (this.mode.is('game') && this.isSettingsMenuOpen() && !this.guideSettingsIntroShown && !this.hasCompletedGuideObjective('sound')) {
        const settingsTarget = this.getGuideUiTargetByKey('game-settings-toggle');
        if (settingsTarget) {
          this.guideSettingsIntroShown = true;
          this.showGameSettingsGuideUntil = performance.now() + 4200;
          this.guide.trigger({ type: 'settings_hover', item: 'entry' }, settingsTarget);
        }
      }

      const mirrorActive = this.mode.is('game') && this.game.isMirrorModeActive();
      if (mirrorActive && !this.guideMirrorModeActive) {
        this.guideMirrorModeActive = true;
        const mirrorTarget = this.getGuideMirrorTarget();
        this.showMirrorGuideUntil = performance.now() + 3600;
        this.guide.trigger({ type: 'mirror_reveal' }, mirrorTarget);
      } else if (!mirrorActive) {
        this.guideMirrorModeActive = false;
      }

      if (this.mode.is('game')) {
        this.updateRuntimeGameGuideTutorials();
      }
    }

    if (this.mode.is('primaterie_portal') && this.primateriePortalRuntime) {
      let portalTransitionStarted = false;
      if (gameRuntime && this.primateriePendingAction) {
        const pendingAction = this.primateriePendingAction;
        if (this.game.preparePortalPreviewTransition('forward')) {
          this.trackAdventureLaunchPhase('adventure_transition_resume', {
            preloadQueue: 'portal_transition_resume'
          });
          recordGameBootDiagnostic('adventure_transition_resume', {
            entryRoute: this.entryRoute,
            prepared: this.adventureLaunchPrepared,
            gameState: this.game.currentState
          });
          this.primateriePortal.setLoading(false);
          this.primateriePortal.setLoadingMessage(null);
          this.primateriePendingAction = null;
          pendingAction.execute();
          portalTransitionStarted = true;
        }
      }
      if (!portalTransitionStarted && this.mode.is('primaterie_portal')) {
        this.syncprimateriePortalLayout();
      }
    }

    if (this.mode.is('focus_enter') && this.world.isFocusSettled()) {
      this.mode.setMode('focus');
      const focusedProject = this.world.getFocusedProject();
      if (focusedProject) {
        this.markFacetSeen(focusedProject.id, this.world.getFocusedFacetIndex());
        this.focus.show(focusedProject, this.world.getFocusedFacetIndex());
        this.guide.trigger(
          { type: 'focus_enter', project: focusedProject, facetIndex: this.world.getFocusedFacetIndex() },
          this.getGuideFocusTarget() ?? this.getGuideTargetForProject(focusedProject.id)
        );
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

    const orbitPose = this.world.getOrbitCameraPose(this.scratchWorldOrbitPosition, this.scratchWorldOrbitLookAt);
    const focusPose = this.world.getFocusCameraPose(this.scratchFocusPosition, this.scratchFocusLookAt);
    const portfolioPosition = this.scratchPortfolioPosition.copy(cameraOrbitPose.position).lerp(focusPose.position, this.cameraFocusBlend);
    const portfolioLookAt = this.scratchPortfolioLookAt
      .copy(cameraOrbitPose.lookAt)
      .lerp(orbitPose.lookAt, 0.18)
      .lerp(focusPose.lookAt, this.cameraFocusBlend);
    const gamePose = gameRuntime
      ? this.game.copyCameraPose(this.scratchGamePosition, this.scratchGameLookAt)
      : {
          position: this.scratchGamePosition.copy(portfolioPosition),
          lookAt: this.scratchGameLookAt.copy(portfolioLookAt)
        };
    const primateriePose =
      this.primateriePortalRuntime && (this.mode.is('primaterie_portal') || this.mode.is('primaterie_transition') || this.gameTransitionFromprimaterie)
        ? this.getprimateriePortalCameraPose(this.scratchPrimateriePosition, this.scratchPrimaterieLookAt)
        : null;
    const primaterieBasePosition =
      primateriePose && (this.mode.is('primaterie_portal') || this.mode.is('primaterie_transition'))
        ? this.scratchCameraPosition.copy(primateriePose.position).lerp(portfolioPosition, this.primaterieReturnProgress)
        : portfolioPosition;
    const primaterieBaseLookAt =
      primateriePose && (this.mode.is('primaterie_portal') || this.mode.is('primaterie_transition'))
        ? this.scratchCameraLookAt.copy(primateriePose.lookAt).lerp(portfolioLookAt, this.primaterieReturnProgress)
        : portfolioLookAt;
    const transitionPose = this.getGameTransitionCameraPose(
      this.gameTransitionFromprimaterie && primateriePose ? primateriePose.position : primaterieBasePosition,
      this.gameTransitionFromprimaterie && primateriePose ? primateriePose.lookAt : primaterieBaseLookAt,
      gamePose.position,
      gamePose.lookAt,
      this.scratchTransitionPosition,
      this.scratchTransitionLookAt
    );
    const blendedPosition = transitionPose.position;
    const blendedLookAt = transitionPose.lookAt;
    const cameraPosition = this.scratchCameraPosition
      .copy(this.introStartCameraPosition)
      .lerp(blendedPosition, this.introTransitionProgress);
    const cameraLookAt = this.scratchCameraLookAt
      .copy(this.introStartLookAt)
      .lerp(blendedLookAt, this.introTransitionProgress);

    this.renderer.setCameraResponse(
      this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over') ? 18 : 8,
      this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over') ? 20 : 8
    );
    this.renderer.setCameraTarget(cameraPosition, cameraLookAt);
    this.renderer.update(deltaTime);
    this.world.setShardLockTransition(this.mode.is('game_transition') && !this.gameTransitionFromprimaterie, this.gameTransitionProgress);
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
        (this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over')) &&
        !this.gameTransitionReturningToHub &&
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
      this.parallaxLayers.setLandingFeedback(this.game.getParallaxLandingFeedback());
      this.parallaxLayers.setViewState(this.game.getParallaxViewState());
      this.parallaxLayers.setMusicReactiveState(musicReactiveState);
      this.parallaxLayers.setTransitionState(this.mode.is('game_transition') && !this.gameTransitionReturningToHub, this.gameTransitionProgress);
    } else {
      this.parallaxLayers.setLandingFeedback(null);
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
      this.gameHud.updateLandingFeedbackOverlay(this.getProjectedLandingFeedbackPayload());
      if (this.shouldUpdateGameHud(elapsedTime)) {
        this.gameHud.update(this.getGameHudPayload());
      }
    }
    const rawRenderer = this.renderer.renderer;
    const previousAutoClear = rawRenderer.autoClear;
    rawRenderer.autoClear = false;
    rawRenderer.clear();
    this.voronoiReveal.render(rawRenderer);
    rawRenderer.clearDepth();
    this.renderer.render();
    rawRenderer.autoClear = previousAutoClear;
    this.intro.update(deltaTime);
    this.updateRotateOverlay();

    if (this.shouldRefreshUi(elapsedTime)) {
      this.refreshUI();
    }
    if (this.shouldUpdateGuide(elapsedTime)) {
      this.guide.update(this.guideDeltaAccumulator);
      this.guideDeltaAccumulator = 0;
    }
  }

  private refreshUI() {
    const focusedProject = this.world.getFocusedProject();
    const focusIndex = focusedProject
      ? Math.max(0, this.portfolioHubProjects.findIndex((project) => project.id === focusedProject.id))
      : this.activeIndex;
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
      this.hoveredShardId = null;
    }
    this.hud.element.classList.toggle('is-hidden', primaterieMode || isGameMode);
    this.uiHost.dataset.appMode = primaterieMode ? 'primaterie' : isGameMode ? 'game' : 'portfolio';
    this.gameRuntime?.gameHud.setVisible(showGameHud);
    this.world.setActiveIndex(this.activeIndex);
    this.refreshRotateOverlayCopy();
    this.updateRotateOverlay();
    this.updateGuide();
  }

  private getGameFieldCount() {
    if (!this.gameRuntime) {
      return this.world.getGameFieldCapacity();
    }
    const requestedCount = this.game.getRecommendedVisibleCount();
    const capacity = this.game.ensureVisiblePlatformCapacity(requestedCount);
    this.world.ensureGameFieldCapacity(capacity);
    return capacity;
  }

  private updateGuide() {
    const now = performance.now();
    const portfolioBlocked = this.isPortfolioOrientationBlocked();
    const isGameMode = isGameRuntimeMode(this.mode.current);
    const activeMiniGameOverlayTarget = this.getActiveMiniGameOverlayTarget();
    const gameSettingsIntroActive = isGameMode && now < this.showGameSettingsGuideUntil;
    const mirrorGuideActive = isGameMode && now < this.showMirrorGuideUntil;
    this.guide.setSuspended(portfolioBlocked);

    if (portfolioBlocked) {
      this.guide.setPresence({
        visible: false,
        target: null,
        zone: 'hidden'
      });
      return;
    }

    if (this.mode.is('intro') || this.mode.is('intro_shattering') || this.mode.is('intro_transition')) {
      const target = this.getGuideIntroTarget();
      this.guide.setPresence({
        visible: true,
        target,
        zone: 'intro'
      });
      this.updateIntroMirrorGuide(target);
      return;
    }

    if (this.about.opened) {
      this.guide.setPresence({
        visible: false,
        target: null,
        zone: 'about'
      });
      return;
    }

    if (this.mode.is('game_over')) {
      this.guide.setPresence({
        visible: true,
        target:
          this.getGuideUiTargetByKey(this.hoveredGuideUiKey) ??
          this.getGuideTargetFromElement(this.hoveredGuideUiElement) ??
          activeMiniGameOverlayTarget ??
          this.getGuideUiTargetByKey('game-save') ??
          this.getGuideUiTargetByKey('game-leaderboard'),
        zone: 'game_over'
      });
      return;
    }

    if (mirrorGuideActive) {
      this.guide.setPresence({
        visible: true,
        target: this.getGuideMirrorTarget(),
        zone: 'game_over'
      });
      return;
    }

    if (isGameMode && activeMiniGameOverlayTarget) {
      this.guide.setPresence({
        visible: true,
        target: this.getGuideUiTargetByKey(this.hoveredGuideUiKey) ?? this.getGuideTargetFromElement(this.hoveredGuideUiElement) ?? activeMiniGameOverlayTarget,
        zone: 'game_over'
      });
      return;
    }

    if (isGameMode) {
      const settingsTarget =
        this.getGuideUiTargetByKey(this.hoveredGuideUiKey) ??
        ((this.isSettingsMenuOpen() || gameSettingsIntroActive) ? this.getGuideUiTargetByKey('game-settings-toggle') : null);
      this.guide.setPresence({
        visible: this.isSettingsMenuOpen() || gameSettingsIntroActive,
        target: settingsTarget,
        zone: 'game'
      });
      return;
    }

    if (isprimaterieMode(this.mode.current)) {
      this.guide.setPresence({
        visible: true,
        target: this.getGuideUiTargetByKey(this.hoveredGuideUiKey) ?? this.getGuidePrimaterieAnchorTarget(),
        zone: 'primaterie'
      });
      return;
    }

    if (this.mode.is('dragging')) {
      this.guide.setPresence({
        visible: true,
        target: this.getGuideConstellationTarget(),
        zone: 'drag'
      });
      return;
    }

    if (this.mode.is('focus') || this.mode.is('focus_enter') || this.mode.is('focus_facet_transition') || this.mode.is('focus_exit')) {
      const focusedProject = this.world.getFocusedProject();
      this.guide.setPresence({
        visible: true,
        target: this.getGuideFocusTarget() ?? (focusedProject ? this.getGuideTargetForProject(focusedProject.id) : this.getGuidePortfolioCenterTarget()),
        zone: 'focus'
      });
      return;
    }

    if (this.slotSystem.isUnlocked()) {
      this.guide.setPresence({
        visible: true,
        target: this.getGuideConstellationTarget(),
        zone: 'slots'
      });
      return;
    }

    this.guide.setPresence({
      visible: true,
      target: this.getGuidePortfolioCenterTarget(),
      zone: 'slots'
    });
  }

  private updateIntroMirrorGuide(target: GuideTarget | null) {
    const stage = this.getIntroMirrorGuideStage();
    if (!stage || this.introMirrorGuideStagesSeen.has(stage)) {
      return;
    }

    this.introMirrorGuideStagesSeen.add(stage);
    switch (stage) {
      case '0':
        this.guide.trigger({ type: 'intro_mirror_0' }, target);
        break;
      case 'first_click':
        this.guide.trigger({ type: 'intro_mirror_first_click' }, target);
        break;
      case '50':
        this.guide.trigger({ type: 'intro_mirror_50' }, target);
        break;
      case '100':
        this.guide.trigger({ type: 'intro_mirror_100' }, target);
        break;
    }
  }

  private getIntroMirrorGuideStage(): IntroMirrorGuideStage | null {
    if (this.intro.clickProgressRatio >= 1) {
      return '100';
    }
    if (this.intro.clickProgressRatio >= 0.5) {
      return '50';
    }
    if (this.intro.clickCountValue >= 1) {
      return 'first_click';
    }
    if (this.intro.clickCountValue === 0) {
      return '0';
    }
    return null;
  }

  private getGuideTargetFromElement(element: HTMLElement | null, hints?: Partial<GuideTarget>): GuideTarget | null {
    if (!element) {
      return null;
    }
    const rect = element.getBoundingClientRect();
    if (rect.width <= 0 && rect.height <= 0) {
      return null;
    }
    return this.createGuideTarget(rect.left + rect.width * 0.5, rect.top + rect.height * 0.5, Math.max(40, rect.width), Math.max(32, rect.height), hints);
  }

  private getGuideUiTargetByKey(key: string | null) {
    if (!key) {
      return null;
    }
    const element = this.uiHost.querySelector<HTMLElement>(`[data-guide-hover="${key}"]`);
    return this.getGuideTargetFromElement(element, this.getGuideHintsForUiKey(key));
  }

  private getGuideTargetForProject(projectId: string | null) {
    if (!projectId) {
      return null;
    }
    const worldPosition = this.world.getProjectWorldPosition(projectId);
    if (!worldPosition) {
      return null;
    }
    const projected = this.renderer.projectWorldToScreen(worldPosition);
    if (!projected.visible) {
      return null;
    }
    return this.createGuideTarget(projected.x, projected.y, 74, 74);
  }

  private getGuideIntroTarget() {
    return this.createGuideTarget(window.innerWidth * 0.5, window.innerHeight * 0.44, 220, 220);
  }

  private getGuidePortfolioCenterTarget() {
    return this.createGuideTarget(window.innerWidth * 0.5, window.innerHeight * 0.72, 240, 140, {
      guidePlacementHint: 'bottom-left',
      bubblePlacementHint: 'upper-right',
      flipGuideX: false
    });
  }

  private getGuideFocusTarget() {
    const media = this.uiHost.querySelector<HTMLElement>('.focus-layer__media');
    if (media) {
      return this.getGuideTargetFromElement(media);
    }
    const panel = this.uiHost.querySelector<HTMLElement>('.focus-layer__panel');
    return this.getGuideTargetFromElement(panel);
  }

  private getGuideConstellationTarget() {
    return this.createGuideTarget(window.innerWidth * 0.5, window.innerHeight * 0.4, 280, 200);
  }

  private getGuidePrimaterieAnchorTarget() {
    if (!this.primateriePortalRuntime) {
      return this.createGuideTarget(window.innerWidth * 0.5, window.innerHeight * 0.52, 220, 220);
    }
    const anchor = this.primateriePortal.element.querySelector<HTMLElement>('.primaterie-portal__anchor');
    return this.getGuideTargetFromElement(anchor) ?? this.createGuideTarget(window.innerWidth * 0.5, window.innerHeight * 0.52, 220, 220);
  }

  private getGuideMirrorTarget() {
    return this.createGuideTarget(window.innerWidth * 0.55, window.innerHeight * 0.46, 220, 180, {
      guidePlacementHint: 'bottom-left',
      bubblePlacementHint: 'upper-left',
      flipGuideX: false
    });
  }

  private getGuideGameplayTarget() {
    return (
      this.getGuideUiTargetByKey('game-control-right') ??
      this.getGuideUiTargetByKey('game-control-left') ??
      this.createGuideTarget(window.innerWidth * 0.7, window.innerHeight * 0.72, 220, 180, {
        guidePlacementHint: 'left',
        bubblePlacementHint: 'upper-left',
        flipGuideX: false
      })
    );
  }

  private getActiveMiniGameOverlayTarget() {
    const avatarEditorVisible = this.getGuideUiTargetByKey('game-avatar-close') ?? this.getGuideUiTargetByKey('game-avatar-save');
    return this.getGuideUiTargetByKey('game-tutorial') ?? this.getGuideUiTargetByKey('game-achievements') ?? (avatarEditorVisible ? this.getGuideUiTargetByKey('game-avatar') : null);
  }

  private createGuideTarget(x: number, y: number, width: number, height: number, hints: Partial<GuideTarget> = {}): GuideTarget {
    return {
      x,
      y,
      width,
      height,
      ...hints
    };
  }

  private getGuideHintsForUiKey(key: string): Partial<GuideTarget> {
    if (key === 'primaterie-adventure' || key === 'primaterie-portfolio') {
      return {
        guidePlacementHint: 'bottom-left',
        bubblePlacementHint: 'upper-left',
        flipGuideX: false
      };
    }
    if (key === 'primaterie-discord') {
      return {
        guidePlacementHint: 'bottom-right',
        bubblePlacementHint: 'upper-right',
        flipGuideX: true
      };
    }
    if (key === 'game-achievements' || key === 'game-achievements-filters' || key === 'game-achievements-close') {
      return {
        guidePlacementHint: 'bottom-left',
        bubblePlacementHint: 'upper-left',
        flipGuideX: false
      };
    }
    if (
      key === 'game-avatar' ||
      key === 'game-avatar-ears' ||
      key === 'game-avatar-parts' ||
      key === 'game-avatar-save' ||
      key === 'game-avatar-close'
    ) {
      return {
        guidePlacementHint: 'right',
        bubblePlacementHint: 'upper-right',
        flipGuideX: true
      };
    }
    if (
      key === 'game-score' ||
      key === 'game-save' ||
      key === 'game-leaderboard' ||
      key === 'game-replay' ||
      key === 'game-menu'
    ) {
      return {
        guidePlacementHint: key === 'game-save' || key === 'game-leaderboard' ? 'left' : 'bottom-left',
        bubblePlacementHint: 'upper-left',
        flipGuideX: false
      };
    }
    if (key.startsWith('game-control-')) {
      return {
        guidePlacementHint: 'left',
        bubblePlacementHint: 'upper-left',
        flipGuideX: false
      };
    }
    if (key.startsWith('game-settings-') || key === 'primaterie-theme' || key === 'primaterie-language') {
      const prefersFlipped = key !== 'game-settings-toggle';
      return prefersFlipped
        ? {
            guidePlacementHint: 'right',
            bubblePlacementHint: 'upper-right',
            flipGuideX: true
          }
        : {
            guidePlacementHint: 'right',
            bubblePlacementHint: 'upper-right',
            flipGuideX: true
          };
    }
    return {};
  }

  private isSettingsMenuOpen() {
    return this.uiHost.querySelector('.game-hud__panel.is-settings-open') !== null;
  }

  private updateRuntimeGameGuideTutorials() {
    const controls = this.game.getHudState().mobile;
    const guideSignals = this.game.getGuideSignals();

    if (controls.hasTeleport) {
      this.triggerGameGuideEvent('control:left', () => {
        this.guide.trigger({ type: 'game_control_hint', item: 'left' }, this.getGuideUiTargetByKey('game-control-left') ?? this.getGuideGameplayTarget());
      });
    }

    if (controls.hasAirAction) {
      this.triggerGameGuideEvent('control:up', () => {
        this.guide.trigger({ type: 'game_control_hint', item: 'up' }, this.getGuideUiTargetByKey('game-control-up') ?? this.getGuideGameplayTarget());
      });
    }

    if (controls.hasGrapple) {
      this.triggerGameGuideEvent('control:right', () => {
        this.guide.trigger({ type: 'game_control_hint', item: 'right' }, this.getGuideUiTargetByKey('game-control-right') ?? this.getGuideGameplayTarget());
      });
    }

    if (controls.hasSouffleur) {
      this.triggerGameGuideEvent('control:down', () => {
        this.guide.trigger({ type: 'game_control_hint', item: 'down' }, this.getGuideUiTargetByKey('game-control-down') ?? this.getGuideGameplayTarget());
      });
    }

    if (guideSignals.hasVisibleEnemy) {
      this.triggerGameGuideEvent('enemy:first', () => {
        this.guide.trigger({ type: 'game_enemy_intro' }, this.getGuideGameplayTarget());
      });
    }

    if (guideSignals.hasVisibleEnemyTop) {
      this.triggerGameGuideEvent('enemy:top', () => {
        this.guide.trigger({ type: 'game_enemy_top_intro' }, this.getGuideGameplayTarget());
      });
    }

    if (guideSignals.hasVisibleEnemyBot) {
      this.triggerGameGuideEvent('enemy:bot', () => {
        this.guide.trigger({ type: 'game_enemy_bot_intro' }, this.getGuideUiTargetByKey('game-control-right') ?? this.getGuideGameplayTarget());
      });
    }

    if (guideSignals.hasVisibleQuestionReward) {
      this.triggerGameGuideEvent('pickup:question', () => {
        this.guide.trigger({ type: 'game_question_intro' }, this.getGuideGameplayTarget());
      });
    }

    if (guideSignals.hasVisibleShop) {
      this.triggerGameGuideEvent('shop:first', () => {
        this.guide.trigger({ type: 'game_shop_intro' }, this.getGuideGameplayTarget());
      });
    }

    if (guideSignals.hasVisibleMilestone) {
      this.triggerGameGuideEvent('milestone:first', () => {
        this.guide.trigger({ type: 'game_milestone_intro' }, this.getGuideGameplayTarget());
      });
    }
  }

  private restoreGameGuideEventFlags() {
    try {
      const raw = window.localStorage.getItem(GAME_GUIDE_EVENT_FLAGS_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as string[];
      parsed.forEach((flag) => {
        if (typeof flag === 'string') {
          this.gameGuideEventFlags.add(flag);
        }
      });
    } catch {
      this.gameGuideEventFlags.clear();
    }
  }

  private persistGameGuideEventFlags() {
    try {
      window.localStorage.setItem(GAME_GUIDE_EVENT_FLAGS_KEY, JSON.stringify([...this.gameGuideEventFlags]));
    } catch {
      // Best-effort persistence only.
    }
  }

  private markGameGuideEventSeen(flag: string) {
    if (this.gameGuideEventFlags.has(flag)) {
      return false;
    }
    this.gameGuideEventFlags.add(flag);
    this.persistGameGuideEventFlags();
    return true;
  }

  private triggerGameGuideEvent(flag: string, trigger: () => void) {
    if (!this.markGameGuideEventSeen(flag)) {
      return;
    }
    trigger();
  }

  private hasCompletedGuideObjective(objective: 'register-score' | 'avatar' | 'tutorial' | 'sound') {
    try {
      if (objective === 'register-score') {
        return window.localStorage.getItem(PLAYER_LEADERBOARD_REGISTERED_KEY) === '1';
      }
      if (objective === 'avatar') {
        return Boolean(window.localStorage.getItem(PLAYER_AVATAR_KEY));
      }
      if (objective === 'tutorial') {
        return window.localStorage.getItem(GAME_HELP_TUTORIAL_COMPLETED_KEY) === '1';
      }
      const muted = window.localStorage.getItem(AUDIO_STORAGE_KEYS.muted) === '1';
      const musicVolume = Number.parseFloat(
        window.localStorage.getItem(AUDIO_STORAGE_KEYS.musicVolume)
          ?? window.localStorage.getItem(AUDIO_STORAGE_KEYS.volume)
          ?? '1'
      );
      const sfxVolume = Number.parseFloat(
        window.localStorage.getItem(AUDIO_STORAGE_KEYS.sfxVolume)
          ?? window.localStorage.getItem(AUDIO_STORAGE_KEYS.volume)
          ?? '1'
      );
      return !muted && (
        (Number.isFinite(musicVolume) && musicVolume > 0.01)
        || (Number.isFinite(sfxVolume) && sfxVolume > 0.01)
      );
    } catch {
      return false;
    }
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
    gameLookAt: THREE.Vector3,
    positionTarget: THREE.Vector3 = this.scratchTransitionPosition,
    lookAtTarget: THREE.Vector3 = this.scratchTransitionLookAt
  ) {
    if (this.mode.is('game_transition') && this.gameTransitionFromprimaterie) {
      const focusPoint = this.game.getPlayerFocusPoint(this.scratchFocusPoint).add(this.scratchDirection.set(0, 0.2, 0));
      const entryOffset = this.scratchDirectionB.copy(portfolioPosition).sub(focusPoint);
      const entryOffsetLength = entryOffset.length();
      const entryDirection =
        entryOffsetLength > 0.0001 ? entryOffset.normalize() : this.scratchDirection.set(0, 0.18, 1);
      const cinematicPosition = this.scratchTransitionAnchor
        .copy(focusPoint)
        .addScaledVector(entryDirection, Math.max(0.54, entryOffsetLength * 0.14))
        .add(this.scratchDirectionB.set(0, 0.04, 0));

      if (this.gameTransitionProgress <= primaterie_TO_GAME_CINEMATIC_FOCUS_END) {
        const zoomPhase = THREE.MathUtils.smoothstep(
          THREE.MathUtils.clamp(this.gameTransitionProgress / primaterie_TO_GAME_CINEMATIC_FOCUS_END, 0, 1),
          0,
          1
        );
        return {
          position: positionTarget.copy(portfolioPosition).lerp(cinematicPosition, zoomPhase),
          lookAt: lookAtTarget.copy(portfolioLookAt).lerp(focusPoint, zoomPhase)
        };
      }

      if (this.gameTransitionProgress <= primaterie_TO_GAME_CINEMATIC_HOLD_END) {
        return {
          position: positionTarget.copy(cinematicPosition),
          lookAt: lookAtTarget.copy(focusPoint)
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
        position: positionTarget.copy(cinematicPosition).lerp(gamePosition, returnPhase),
        lookAt: lookAtTarget.copy(focusPoint).lerp(gameLookAt, returnPhase)
      };
    }

    if (!this.mode.is('game_transition')) {
      return {
        position: positionTarget.copy(portfolioPosition).lerp(gamePosition, this.gameTransitionProgress),
        lookAt: lookAtTarget.copy(portfolioLookAt).lerp(gameLookAt, this.gameTransitionProgress)
      };
    }

    const transitionLookAt = this.gameTransitionAnchor
      ? this.scratchTransitionAnchor.copy(this.gameTransitionAnchor)
      : this.scratchTransitionAnchor.copy(portfolioLookAt);
    const portfolioOffset = this.scratchDirection.copy(portfolioPosition).sub(transitionLookAt);
    const portfolioOffsetLength = portfolioOffset.length();
    const portfolioDirection =
      portfolioOffsetLength > 0.0001 ? portfolioOffset.normalize() : this.scratchDirectionB.set(0, 0.04, 1);
    const alignedRadius = Math.max(19.4, portfolioOffsetLength * 0.92);
    const alignedPosition = this.scratchFocusPoint
      .copy(transitionLookAt)
      .addScaledVector(portfolioDirection, alignedRadius)
      .add(this.scratchDirectionB.set(0, 0.16, 0));

    const rotatePhase = THREE.MathUtils.smoothstep(
      THREE.MathUtils.clamp(this.gameTransitionProgress / PORTFOLIO_TO_GAME_ROTATE_PHASE_END, 0, 1),
      0,
      1
    );
    if (this.gameTransitionProgress <= PORTFOLIO_TO_GAME_ROTATE_PHASE_END) {
      return {
        position: positionTarget.copy(portfolioPosition).lerp(alignedPosition, rotatePhase),
        lookAt: lookAtTarget.copy(portfolioLookAt).lerp(transitionLookAt, rotatePhase)
      };
    }

    if (this.gameTransitionProgress <= PORTFOLIO_TO_GAME_HOLD_PHASE_END) {
      return {
        position: positionTarget.copy(alignedPosition),
        lookAt: lookAtTarget.copy(transitionLookAt)
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
      position: positionTarget.copy(alignedPosition).lerp(gamePosition, stackPhase),
      lookAt: lookAtTarget.copy(transitionLookAt).lerp(gameLookAt, stackPhase)
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
