export class RenderLoop {
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

    const deltaTime = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;
    this.onFrame(deltaTime, now / 1000);
    this.frameId = requestAnimationFrame(this.tick);
  };
}
