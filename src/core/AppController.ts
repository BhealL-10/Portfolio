import * as THREE from 'three';
import { ContentService } from '../data/ContentService';
import { GameHUDSystem } from '../game/GameHUDSystem';
import { GameSessionController } from '../game/GameSessionController';
import { DragCameraOrbitController } from '../portfolio/DragCameraOrbitController';
import { IntroVoronoiSystem } from '../portfolio/IntroVoronoiSystem';
import { OrbitWorldSystem } from '../portfolio/OrbitWorldSystem';
import { SecretSlotSystem } from '../portfolio/SecretSlotSystem';
import { ShardInteractionSystem } from '../portfolio/ShardInteractionSystem';
import { WorldRenderer } from '../render/WorldRenderer';
import { AboutSectionSystem } from '../ui/AboutSectionSystem';
import { FocusPresentationSystem } from '../ui/FocusPresentationSystem';
import { GuideBubbleSystem } from '../ui/GuideBubbleSystem';
import { I18nService } from '../ui/I18nService';
import { NavigationHUD } from '../ui/NavigationHUD';
import { ThemeService } from '../ui/ThemeService';
import { ModeController } from './ModeController';
import { damp, wrapIndex } from './math';
import { RenderLoop } from './RenderLoop';
import { TransitionSystem } from './TransitionSystem';

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
  private readonly slotSystem: SecretSlotSystem;
  private readonly world: OrbitWorldSystem;
  private readonly intro: IntroVoronoiSystem;
  private readonly guide: GuideBubbleSystem;
  private readonly hud: NavigationHUD;
  private readonly about: AboutSectionSystem;
  private readonly focus: FocusPresentationSystem;
  private readonly gameHud: GameHUDSystem;
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
  private didRunIntroPresentationFocus = false;
  private gameTransitionTweenId: number | null = null;
  private mobileChargePointerId: number | null = null;
  private mobileChargeStartY = 0;
  private mobileChargeStartedAt = 0;

  constructor(host: HTMLElement) {
    this.root = document.createElement('div');
    this.root.className = 'app-shell';

    this.canvasHost = document.createElement('div');
    this.canvasHost.className = 'app-shell__canvas';

    this.uiHost = document.createElement('div');
    this.uiHost.className = 'app-shell__ui';

    this.root.append(this.canvasHost, this.uiHost);
    host.appendChild(this.root);

    this.renderer = new WorldRenderer(this.canvasHost);
    this.slotSystem = new SecretSlotSystem(
      this.content
        .getProjects()
        .filter((project) => project.role !== 'presentation')
        .map((project) => project.id)
    );
    this.world = new OrbitWorldSystem(this.renderer.scene, this.content.getProjects(), this.slotSystem, this.theme.current);
    this.game = new GameSessionController(this.renderer.scene, this.theme.current);
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
      onSelectUpgrade: (index) => {
        if (this.game.selectUpgradeFallback(index)) {
          this.refreshUI();
        }
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
          const changed = this.world.finishFacetRotation();
          if (changed) {
            this.mode.setMode('focus_facet_transition');
            this.scheduleFacetCompletion();
          }
        },
        onFocusSideTap: (side) => this.changeFacet(side === 'left' ? -1 : 1)
      }
    );
    void this.interaction;

    this.loop = new RenderLoop((deltaTime, elapsedTime) => this.update(deltaTime, elapsedTime));

    this.bindEvents();
    this.refreshUI();
    this.updateGuide();
    this.loop.start();
  }

  private bindEvents() {
    this.theme.onChange((theme) => {
      this.renderer.setTheme(theme);
      this.world.setTheme(theme);
      this.game.setTheme(theme);
      this.refreshUI();
    });

    this.i18n.onChange(() => {
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

          if (!this.didRunIntroPresentationFocus) {
            const presentationId = this.world.getPresentationProjectId();
            if (presentationId) {
              this.didRunIntroPresentationFocus = true;
              this.activeIndex = 0;
              this.world.setActiveIndex(0);
              window.setTimeout(() => {
                if (this.mode.is('orbit')) {
                  this.enterFocus(presentationId);
                }
              }, 220);
            }
          }
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

    const canvas = this.renderer.renderer.domElement;
    canvas.addEventListener('pointerdown', this.onGamePointerDown);
    canvas.addEventListener('pointerup', this.onGamePointerUp);
    canvas.addEventListener('pointercancel', this.onGamePointerCancel);
  }

  private onWheel = (event: WheelEvent) => {
    if (!(this.mode.is('orbit') || this.mode.is('constellation_complete'))) return;
    if (Date.now() - this.lastWheelAt < 120) return;
    this.lastWheelAt = Date.now();
    event.preventDefault();
    this.stepActiveIndex(event.deltaY > 0 ? 1 : -1);
  };

  private onKeyDown = (event: KeyboardEvent) => {
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
          this.game.triggerJump();
        }
        return;
      }

      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowUp') {
        event.preventDefault();
        this.restartGame();
      }
      return;
    }

    if (this.mode.is('intro') || this.mode.is('intro_shattering') || this.mode.is('intro_transition')) {
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

    if (this.mode.is('focus') || this.mode.is('focus_enter') || this.mode.is('focus_facet_transition')) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.changeFacet(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.changeFacet(1);
      }
      return;
    }

    if (!(this.mode.is('orbit') || this.mode.is('constellation_complete'))) return;

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
    if (!this.mode.is('game')) return;
    if (event.key === 'ArrowDown') {
      this.game.setChargeActive(false);
    }
  };

  private onGamePointerDown = (event: PointerEvent) => {
    if (this.mode.is('game_over')) {
      event.preventDefault();
      this.restartGame();
      return;
    }

    if (!this.mode.is('game')) return;

    this.mobileChargePointerId = event.pointerId;
    this.mobileChargeStartY = event.clientY;
    this.mobileChargeStartedAt = performance.now();
    this.game.setChargeActive(true);
  };

  private onGamePointerUp = (event: PointerEvent) => {
    if (!this.mode.is('game')) return;
    if (this.mobileChargePointerId !== event.pointerId) return;

    const deltaY = this.mobileChargeStartY - event.clientY;
    const heldDuration = performance.now() - this.mobileChargeStartedAt;
    const releasedJump = this.game.setChargeActive(false);

    if (!releasedJump && (heldDuration < 180 || deltaY > 12)) {
      this.game.triggerJump();
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

  private selectProject(index: number) {
    if (
      this.mode.is('intro') ||
      this.mode.is('intro_shattering') ||
      this.mode.is('intro_transition') ||
      this.mode.is('game_transition') ||
      this.mode.is('game') ||
      this.mode.is('game_over')
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
    if (project && (this.mode.is('orbit') || this.mode.is('constellation_complete'))) {
      this.enterFocus(project.id);
    }
  }

  private enterFocus(projectId: string) {
    if (!(this.mode.is('orbit') || this.mode.is('constellation_complete'))) return;
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
      duration: 0.55,
      easing: 'easeOutCubic',
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
    this.scheduleFacetCompletion();
  }

  private scheduleFacetCompletion() {
    this.transitions.animate({
      from: 0,
      to: 1,
      duration: 0.68,
      easing: 'easeInOutCubic',
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
      this.mode.is('intro') ||
      this.mode.is('intro_shattering') ||
      this.mode.is('intro_transition') ||
      this.mode.is('game_transition') ||
      this.mode.is('game') ||
      this.mode.is('game_over')
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

  private returnHome() {
    if (this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over')) {
      this.exitGame();
    }

    this.activeIndex = 0;
    this.world.setActiveIndex(0);

    if (this.about.opened) {
      this.about.close();
    }

    if (this.mode.is('focus') || this.mode.is('focus_enter') || this.mode.is('focus_facet_transition')) {
      this.exitFocus();
    }

    this.refreshUI();
  }

  private resumeOrbitMode() {
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

  private startGameTransition() {
    if (!this.slotSystem.isUnlocked()) return;
    if (this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over')) return;

    if (this.about.opened) {
      this.about.close();
    }

    if (this.mode.is('focus') || this.mode.is('focus_enter') || this.mode.is('focus_facet_transition')) {
      this.exitFocus(() => this.startGameTransition());
      return;
    }

    if (this.mode.is('dragging')) {
      this.resumeOrbitMode();
    }

    if (!this.mode.is('constellation_complete')) {
      this.mode.setMode('constellation_complete');
    }

    if (this.gameTransitionTweenId !== null) {
      this.transitions.cancel(this.gameTransitionTweenId);
      this.gameTransitionTweenId = null;
    }

    this.mode.setMode('game_transition');
    this.gameTransitionProgress = 0;
    this.game.startTransition();
    const projectCount = this.world.getGameFieldCapacity();
    this.world.beginExternalLayoutTransition(
      this.game.getInitialPlatformPositions(projectCount),
      this.game.getInitialPlatformScales(projectCount)
    );
    this.refreshUI();

    this.gameTransitionTweenId = this.transitions.animate({
      from: 0,
      to: 1,
      duration: 2.25,
      easing: 'easeInOutCubic',
      onUpdate: (value) => {
        this.gameTransitionProgress = value;
        this.world.setExternalLayoutProgress(value);
      },
      onComplete: () => {
        this.gameTransitionTweenId = null;
        this.gameTransitionProgress = 1;
        this.mode.setMode('game');
        this.game.beginRun();
        this.world.setExternalLayoutPositions(
          this.game.getVisiblePlatformPositions(this.world.getGameFieldCapacity()),
          this.game.getVisiblePlatformScales(this.world.getGameFieldCapacity()),
          this.game.getVisiblePlatformVisuals(this.world.getGameFieldCapacity())
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
    this.game.restart();
    this.world.setExternalLayoutPositions(
      this.game.getVisiblePlatformPositions(this.world.getGameFieldCapacity()),
      this.game.getVisiblePlatformScales(this.world.getGameFieldCapacity()),
      this.game.getVisiblePlatformVisuals(this.world.getGameFieldCapacity())
    );
    this.refreshUI();
  }

  private exitGame() {
    if (!(this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over'))) {
      return;
    }

    if (this.gameTransitionTweenId !== null) {
      this.transitions.cancel(this.gameTransitionTweenId);
      this.gameTransitionTweenId = null;
    }

    this.mobileChargePointerId = null;
    this.game.setChargeActive(false);
    const orbitPositions = this.world.getOrbitPositions();
    this.world.beginExternalLayoutTransition(orbitPositions);
    this.game.prepareReturnTransition();

    if (this.mode.is('game') || this.mode.is('game_over')) {
      this.mode.setMode('game_transition');
    }

    this.gameTransitionTweenId = this.transitions.animate({
      from: this.gameTransitionProgress,
      to: 0,
      duration: 1.25,
      easing: 'easeInOutCubic',
      onUpdate: (value) => {
        this.gameTransitionProgress = value;
        this.world.setExternalLayoutProgress(1 - value);
      },
      onComplete: () => {
        this.gameTransitionTweenId = null;
        this.game.stop();
        this.gameTransitionProgress = 0;
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

  private getGameHudPayload() {
    const hudState = this.game.getHudState();
    return {
      score: hudState.score,
      highscore: hudState.highscore,
      distanceMeters: hudState.distanceMeters,
      bestDistanceMeters: hudState.bestDistanceMeters,
      coins: hudState.coins,
      splitTimes: hudState.splitTimes,
      chargeRatio: hudState.chargeRatio,
      momentumGauge: hudState.momentumGauge,
      momentumTier: hudState.momentumTier,
      orbitGraceActive: hudState.orbitGraceActive,
      orbitGraceProgress: hudState.orbitGraceProgress,
      state: hudState.state,
      offers: hudState.offers,
      branchHints: hudState.branchHints.reduce<Array<{
        slot: 0 | 1 | 2;
        offer: typeof hudState.branchHints[number]['offer'];
        screenX: number;
        screenY: number;
        mode?: typeof hudState.branchHints[number]['mode'];
        price?: number;
      }>>((acc: Array<{
        slot: 0 | 1 | 2;
        offer: typeof hudState.branchHints[number]['offer'];
        screenX: number;
        screenY: number;
        mode?: typeof hudState.branchHints[number]['mode'];
        price?: number;
      }>, hint: typeof hudState.branchHints[number]) => {
        const projected = this.renderer.projectWorldToScreen(hint.worldPosition);
        if (projected.visible) {
          acc.push({
            slot: hint.slot,
            offer: hint.offer,
            screenX: projected.x,
            screenY: projected.y,
            mode: hint.mode,
            price: hint.price
          });
        }
        return acc;
      }, []),
      acquisition: hudState.acquisition
    } as const;
  }

  private update(deltaTime: number, elapsedTime: number) {
    this.transitions.update(deltaTime);
    this.world.update(deltaTime, elapsedTime, this.mode.current);
    this.game.update(deltaTime, elapsedTime);

    if (this.mode.is('game') || this.mode.is('game_over')) {
      this.world.setExternalLayoutPositions(
        this.game.getVisiblePlatformPositions(this.world.getGameFieldCapacity()),
        this.game.getVisiblePlatformScales(this.world.getGameFieldCapacity()),
        this.game.getVisiblePlatformVisuals(this.world.getGameFieldCapacity())
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
    const cameraOrbitPose = this.cameraOrbit.update(deltaTime, this.world.getPivot());
    const focusPose = this.world.getFocusCameraPose();
    const gamePose = this.game.getCameraPose();

    const portfolioPosition = cameraOrbitPose.position.clone().lerp(focusPose.position, this.cameraFocusBlend);
    const portfolioLookAt = cameraOrbitPose.lookAt.clone().lerp(orbitPose.lookAt, 0.18).lerp(focusPose.lookAt, this.cameraFocusBlend);
    const blendedPosition = portfolioPosition.clone().lerp(gamePose.position, this.gameTransitionProgress);
    const blendedLookAt = portfolioLookAt.clone().lerp(gamePose.lookAt, this.gameTransitionProgress);
    const cameraPosition = this.introStartCameraPosition.clone().lerp(blendedPosition, this.introTransitionProgress);
    const cameraLookAt = this.introStartLookAt.clone().lerp(blendedLookAt, this.introTransitionProgress);

    this.renderer.setCameraResponse(
      this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over') ? 18 : 8,
      this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over') ? 20 : 8
    );
    this.renderer.setCameraTarget(cameraPosition, cameraLookAt);
    this.renderer.update(deltaTime);
    if (this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over')) {
      this.gameHud.update(this.getGameHudPayload());
    }
    this.renderer.render();
    this.intro.update(deltaTime);

    this.refreshUI();
  }

  private refreshUI() {
    const focusedProject = this.world.getFocusedProject();
    const focusIndex = focusedProject ? this.content.getProjectIndex(focusedProject.id) : this.activeIndex;
    const isGameMode = this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over');

    this.hud.setActiveProject(focusIndex, this.i18n.current);
    this.hud.setUnlocked(this.slotSystem.isUnlocked());
    this.hud.setAboutOpen(this.about.opened);
    this.hud.element.classList.toggle('is-hidden', isGameMode);
    this.guide.element.classList.toggle('is-hidden', isGameMode);
    this.gameHud.setVisible(isGameMode);
    if (isGameMode) {
      this.gameHud.update(this.getGameHudPayload());
    }
    this.world.setActiveIndex(this.activeIndex);
  }

  private updateGuide() {
    if (this.mode.is('game_transition') || this.mode.is('game') || this.mode.is('game_over')) {
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
}
