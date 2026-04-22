import { getRuntimeViewportMetrics, observeRuntimeViewport } from '../core/viewport';
import {
  recordGameBootDiagnostic,
  recordGameBootDiagnosticError,
  recordGameBootWarning
} from '../core/gameBootDiagnostics';
import {
  type GameUiScaleMode,
  getGameUiUserScale,
  persistGameUiScaleMode,
  readStoredGameUiScaleMode,
  resolveGameUiFluidScale,
  resolveGameUiScale
} from './gameUiScale';

type BrowserFullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenEnabled?: boolean;
};

type BrowserFullscreenElement = HTMLElement & {
  requestFullscreen?: (options?: FullscreenOptions) => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void> | void;
};

export type GameDisplayMode = 'windowed' | 'fullscreen' | 'immersive';

export class GameDisplayController {
  private readonly shell: HTMLElement;
  private readonly fullscreenTarget: HTMLElement;
  private readonly listeners = new Set<() => void>();
  private readonly stopObservingViewport: () => void;
  private uiScaleMode: GameUiScaleMode;
  private immersiveActive = false;
  private pendingSyncFrame: number | null = null;
  private lastDiagnosticSignature = '';

  constructor(private readonly host: HTMLElement) {
    this.shell = host.closest<HTMLElement>('.app-shell') ?? host;
    this.fullscreenTarget = this.shell;
    this.uiScaleMode = readStoredGameUiScaleMode();
    this.stopObservingViewport = observeRuntimeViewport(this.scheduleSync);
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    document.addEventListener('fullscreenerror', this.handleFullscreenError);
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange as EventListener);
    document.addEventListener('webkitfullscreenerror', this.handleFullscreenError as EventListener);
    this.sync();
  }

  onChange(listener: () => void) {
    this.listeners.add(listener);
    listener();
    return () => this.listeners.delete(listener);
  }

  getUiScaleMode() {
    return this.uiScaleMode;
  }

  setUiScaleMode(mode: GameUiScaleMode, options: { persist?: boolean } = {}) {
    this.uiScaleMode = mode;
    if (options.persist !== false) {
      persistGameUiScaleMode(mode);
    }
    this.sync();
  }

  isFullscreenSupported() {
    const fullscreenDocument = document as BrowserFullscreenDocument;
    const fullscreenElement = this.fullscreenTarget as BrowserFullscreenElement;
    return Boolean(
      document.fullscreenEnabled ||
      fullscreenDocument.webkitFullscreenEnabled ||
      fullscreenElement.requestFullscreen ||
      fullscreenElement.webkitRequestFullscreen
    );
  }

  isCurrentlyFullscreen() {
    const fullscreenDocument = document as BrowserFullscreenDocument;
    return Boolean(document.fullscreenElement || fullscreenDocument.webkitFullscreenElement);
  }

  isImmersiveActive() {
    return this.immersiveActive;
  }

  getDisplayMode(): GameDisplayMode {
    if (this.isCurrentlyFullscreen()) {
      return 'fullscreen';
    }
    if (this.immersiveActive) {
      return 'immersive';
    }
    return 'windowed';
  }

  async enterGameFullscreen() {
    recordGameBootDiagnostic('display_fullscreen_enter_requested', {
      supported: this.isFullscreenSupported()
    });
    if (!this.isFullscreenSupported()) {
      recordGameBootWarning('display_fullscreen_native_unavailable');
      this.enableImmersiveMode();
      return;
    }

    const fullscreenTarget = this.fullscreenTarget as BrowserFullscreenElement;
    try {
      if (fullscreenTarget.requestFullscreen) {
        await fullscreenTarget.requestFullscreen({ navigationUI: 'hide' });
      } else if (fullscreenTarget.webkitRequestFullscreen) {
        await fullscreenTarget.webkitRequestFullscreen();
      } else {
        this.enableImmersiveMode();
        return;
      }
      this.immersiveActive = false;
    } catch {
      recordGameBootWarning('display_fullscreen_request_failed_fallback');
      this.enableImmersiveMode();
    } finally {
      this.sync();
    }
  }

  async exitGameFullscreen() {
    recordGameBootDiagnostic('display_fullscreen_exit_requested', {
      currentMode: this.getDisplayMode()
    });
    const fullscreenDocument = document as BrowserFullscreenDocument;
    this.immersiveActive = false;
    if (this.isCurrentlyFullscreen()) {
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (fullscreenDocument.webkitExitFullscreen) {
          await fullscreenDocument.webkitExitFullscreen();
        }
      } catch {
        // If exit fails we still fall back to a synced windowed state.
      }
    }
    this.sync();
  }

  async toggleGameFullscreen() {
    if (this.getDisplayMode() === 'windowed') {
      await this.enterGameFullscreen();
      return;
    }
    await this.exitGameFullscreen();
  }

  dispose() {
    void this.exitGameFullscreen();
    this.stopObservingViewport();
    if (this.pendingSyncFrame !== null) {
      window.cancelAnimationFrame(this.pendingSyncFrame);
      this.pendingSyncFrame = null;
    }
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('fullscreenerror', this.handleFullscreenError);
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange as EventListener);
    document.removeEventListener('webkitfullscreenerror', this.handleFullscreenError as EventListener);
    this.listeners.clear();
  }

  private readonly handleFullscreenChange = () => {
    if (this.isCurrentlyFullscreen()) {
      this.immersiveActive = false;
    }
    recordGameBootDiagnostic('display_fullscreen_change', {
      displayMode: this.getDisplayMode()
    });
    this.sync();
  };

  private readonly handleFullscreenError = () => {
    if (!this.isCurrentlyFullscreen()) {
      recordGameBootWarning('display_fullscreen_error_immersive_fallback');
      this.enableImmersiveMode();
      return;
    }
    recordGameBootDiagnosticError('display_fullscreen_error', new Error('Fullscreen API reported an error.'));
    this.sync();
  };

  private readonly scheduleSync = () => {
    if (this.pendingSyncFrame !== null) {
      return;
    }
    this.pendingSyncFrame = window.requestAnimationFrame(() => {
      this.pendingSyncFrame = null;
      this.sync();
    });
  };

  private enableImmersiveMode() {
    this.immersiveActive = true;
    window.scrollTo(0, 0);
    window.requestAnimationFrame(() => window.scrollTo(0, 0));
    recordGameBootDiagnostic('display_immersive_enabled');
    this.sync();
  }

  private sync() {
    const metrics = getRuntimeViewportMetrics();
    const fluidScale = resolveGameUiFluidScale(metrics);
    const userScale = getGameUiUserScale(this.uiScaleMode);
    const uiScale = resolveGameUiScale(this.uiScaleMode, metrics);
    const displayMode = this.getDisplayMode();

    const targets = [document.documentElement, this.shell, this.host];
    targets.forEach((target) => {
      target.style.setProperty('--viewport-width', `${metrics.width}px`);
      target.style.setProperty('--viewport-height', `${metrics.height}px`);
      target.style.setProperty('--game-width', `${metrics.width}px`);
      target.style.setProperty('--game-height', `${metrics.height}px`);
      target.style.setProperty('--game-viewport-layout-width', `${metrics.layoutWidth}px`);
      target.style.setProperty('--game-viewport-layout-height', `${metrics.layoutHeight}px`);
      target.style.setProperty('--game-viewport-offset-top', `${metrics.offsetTop}px`);
      target.style.setProperty('--game-viewport-offset-left', `${metrics.offsetLeft}px`);
      target.style.setProperty('--ui-scale-mode', this.uiScaleMode);
      target.style.setProperty('--ui-scale-factor', userScale.toFixed(3));
      target.style.setProperty('--game-ui-size-mode', this.uiScaleMode);
      target.style.setProperty('--game-ui-scale-base', fluidScale.toFixed(3));
      target.style.setProperty('--game-ui-scale-mode', userScale.toFixed(3));
      target.style.setProperty('--game-ui-scale-final', uiScale.toFixed(3));
      target.style.setProperty('--game-ui-fluid-scale', fluidScale.toFixed(3));
      target.style.setProperty('--game-ui-user-scale', userScale.toFixed(3));
      target.style.setProperty('--game-ui-scale', uiScale.toFixed(3));
      target.dataset.gameDisplayMode = displayMode;
      target.dataset.gameUiSizeMode = this.uiScaleMode;
    });

    document.documentElement.dataset.gameFullscreenSupport = this.isFullscreenSupported() ? 'native' : 'fallback';
    document.body.classList.toggle('game-immersive-active', displayMode === 'immersive');
    document.body.classList.toggle('game-native-fullscreen-active', displayMode === 'fullscreen');

    const diagnosticSignature = JSON.stringify([
      displayMode,
      this.uiScaleMode,
      metrics.width,
      metrics.height,
      metrics.layoutWidth,
      metrics.layoutHeight,
      Number(uiScale.toFixed(3))
    ]);
    if (diagnosticSignature !== this.lastDiagnosticSignature) {
      this.lastDiagnosticSignature = diagnosticSignature;
      recordGameBootDiagnostic('display_sync', {
        displayMode,
        uiScaleMode: this.uiScaleMode,
        width: metrics.width,
        height: metrics.height,
        layoutWidth: metrics.layoutWidth,
        layoutHeight: metrics.layoutHeight,
        uiScale: Number(uiScale.toFixed(3))
      });
    }

    this.listeners.forEach((listener) => listener());
  }
}
