import { isPerfDebugEnabled } from './performanceProfile';

interface RenderLoopOptions {
  getTargetFps?: () => number;
  debugName?: string;
}

export class RenderLoop {
  private static readonly MAX_DELTA_TIME = 1 / 20;
  private static activeLoopCount = 0;
  private running = false;
  private frameId = 0;
  private lastTime = 0;
  private readonly frameSamples: number[] = [];
  private readonly fpsSamples: number[] = [];

  constructor(
    private readonly onFrame: (deltaTime: number, elapsedTime: number) => void,
    private readonly options: RenderLoopOptions = {}
  ) {}

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    RenderLoop.activeLoopCount += 1;
    if (RenderLoop.activeLoopCount > 1 && isPerfDebugEnabled()) {
      console.warn(
        `[RenderLoop] Multiple active loops detected (${RenderLoop.activeLoopCount}).`,
        this.options.debugName ?? 'unnamed-loop'
      );
    }
    this.frameId = requestAnimationFrame(this.tick);
  }

  stop() {
    if (this.running && RenderLoop.activeLoopCount > 0) {
      RenderLoop.activeLoopCount -= 1;
    }
    this.running = false;
    cancelAnimationFrame(this.frameId);
  }

  getStats() {
    const frameMsAverage =
      this.frameSamples.length > 0
        ? this.frameSamples.reduce((sum, sample) => sum + sample, 0) / this.frameSamples.length
        : 0;
    const sortedSamples = [...this.frameSamples].sort((left, right) => left - right);
    const p95Index = sortedSamples.length > 0 ? Math.min(sortedSamples.length - 1, Math.floor(sortedSamples.length * 0.95)) : 0;
    const frameMsP95 = sortedSamples.length > 0 ? sortedSamples[p95Index] ?? 0 : 0;
    const fpsAverage =
      this.fpsSamples.length > 0
        ? this.fpsSamples.reduce((sum, sample) => sum + sample, 0) / this.fpsSamples.length
        : 0;
    return {
      activeLoopCount: RenderLoop.activeLoopCount,
      fpsAverage,
      frameMsAverage,
      frameMsP95,
      sampleCount: this.frameSamples.length
    };
  }

  private getTargetFrameIntervalMs() {
    const targetFps = this.options.getTargetFps?.() ?? 0;
    if (!Number.isFinite(targetFps) || targetFps <= 0) {
      return 0;
    }
    return 1000 / targetFps;
  }

  private pushSample(deltaTimeMs: number) {
    const fps = deltaTimeMs > 0 ? 1000 / deltaTimeMs : 0;
    this.frameSamples.push(deltaTimeMs);
    this.fpsSamples.push(fps);
    if (this.frameSamples.length > 120) {
      this.frameSamples.shift();
    }
    if (this.fpsSamples.length > 120) {
      this.fpsSamples.shift();
    }
  }

  private tick = (now: number) => {
    if (!this.running) return;

    if (typeof document !== 'undefined' && document.hidden) {
      this.lastTime = now;
      this.frameId = requestAnimationFrame(this.tick);
      return;
    }

    const targetFrameIntervalMs = this.getTargetFrameIntervalMs();
    if (targetFrameIntervalMs > 0 && now - this.lastTime < targetFrameIntervalMs) {
      this.frameId = requestAnimationFrame(this.tick);
      return;
    }

    const deltaTime = Math.min((now - this.lastTime) / 1000, RenderLoop.MAX_DELTA_TIME);
    this.lastTime = now;
    this.onFrame(deltaTime, now / 1000);
    this.pushSample(deltaTime * 1000);
    this.frameId = requestAnimationFrame(this.tick);
  };
}
