import { isPerfDebugEnabled } from './performanceProfile';

export interface PerfDebugSnapshot {
  profile: string;
  mode: string;
  gameState: string | null;
  targetFps: number;
  fpsAverage: number;
  frameMsAverage: number;
  frameMsP95: number;
  activeLoops: number;
  rendererCalls: number;
  rendererTriangles: number;
  rendererPoints: number;
  rendererLines: number;
  rendererTextures: number;
  rendererGeometries: number;
  visibleObjects: number;
  assetCachedImages: number;
  assetLoadedImages: number;
  assetCachedTextures: number;
  assetQueuedPreloads: number;
  assetActivePreloads: number;
  assetPreloadConcurrency: number;
  memoryUsedMb: number | null;
  memoryLimitMb: number | null;
  flags: string[];
}

export class PerfDebugOverlay {
  private readonly element: HTMLPreElement | null;
  private intervalId: number | null = null;

  constructor(private readonly getSnapshot: () => PerfDebugSnapshot) {
    if (!isPerfDebugEnabled() || typeof document === 'undefined') {
      this.element = null;
      return;
    }

    const element = document.createElement('pre');
    element.className = 'perf-debug-overlay';
    Object.assign(element.style, {
      position: 'fixed',
      left: '8px',
      bottom: '8px',
      zIndex: '9999',
      margin: '0',
      padding: '10px 12px',
      borderRadius: '10px',
      background: 'rgb(12 16 24 / 0.82)',
      color: '#d9e4f2',
      font: '12px/1.45 ui-monospace, SFMono-Regular, Menlo, monospace',
      pointerEvents: 'none',
      whiteSpace: 'pre-wrap',
      maxWidth: 'min(88vw, 420px)',
      boxShadow: '0 10px 30px rgb(0 0 0 / 0.3)'
    } satisfies Partial<CSSStyleDeclaration>);
    this.element = element;
    (document.body ?? document.documentElement).appendChild(element);
    this.render();
    this.intervalId = window.setInterval(() => this.render(), 1000);
  }

  dispose() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.element?.remove();
  }

  private render() {
    if (!this.element) {
      return;
    }
    const snapshot = this.getSnapshot();
    const memoryLine =
      snapshot.memoryUsedMb !== null
        ? `${snapshot.memoryUsedMb.toFixed(1)}MB / ${snapshot.memoryLimitMb?.toFixed(1) ?? '?'}MB`
        : 'n/a';
    this.element.textContent = [
      `profile ${snapshot.profile} | mode ${snapshot.mode}${snapshot.gameState ? `/${snapshot.gameState}` : ''}`,
      `fps ${snapshot.fpsAverage.toFixed(1)} target ${snapshot.targetFps} | frame ${snapshot.frameMsAverage.toFixed(1)}ms p95 ${snapshot.frameMsP95.toFixed(1)}ms`,
      `loops ${snapshot.activeLoops} | visible ${snapshot.visibleObjects} | calls ${snapshot.rendererCalls} tri ${snapshot.rendererTriangles}`,
      `geom ${snapshot.rendererGeometries} tex ${snapshot.rendererTextures} pts ${snapshot.rendererPoints} lines ${snapshot.rendererLines}`,
      `assets img ${snapshot.assetLoadedImages}/${snapshot.assetCachedImages} tex ${snapshot.assetCachedTextures} queue ${snapshot.assetQueuedPreloads}/${snapshot.assetActivePreloads} c=${snapshot.assetPreloadConcurrency}`,
      `memory ${memoryLine}`,
      `flags ${snapshot.flags.join(', ') || 'none'}`
    ].join('\n');
  }
}
