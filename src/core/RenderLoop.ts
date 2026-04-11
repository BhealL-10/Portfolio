export class RenderLoop {
  private static readonly MAX_DELTA_TIME = 1 / 20;
  private running = false;
  private frameId = 0;
  private lastTime = 0;

  constructor(private readonly onFrame: (deltaTime: number, elapsedTime: number) => void) {}

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.frameId = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.frameId);
  }

  private tick = (now: number) => {
    if (!this.running) return;

    if (typeof document !== 'undefined' && document.hidden) {
      this.lastTime = now;
      this.frameId = requestAnimationFrame(this.tick);
      return;
    }

    const deltaTime = Math.min((now - this.lastTime) / 1000, RenderLoop.MAX_DELTA_TIME);
    this.lastTime = now;
    this.onFrame(deltaTime, now / 1000);
    this.frameId = requestAnimationFrame(this.tick);
  };
}
