export interface RuntimeViewportMetrics {
  width: number;
  height: number;
  layoutWidth: number;
  layoutHeight: number;
  offsetTop: number;
  offsetLeft: number;
  pageTop: number;
  pageLeft: number;
  scale: number;
}

function getVisualViewport() {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.visualViewport ?? null;
}

export function getRuntimeViewportMetrics(): RuntimeViewportMetrics {
  if (typeof window === 'undefined') {
    return {
      width: 1,
      height: 1,
      layoutWidth: 1,
      layoutHeight: 1,
      offsetTop: 0,
      offsetLeft: 0,
      pageTop: 0,
      pageLeft: 0,
      scale: 1
    };
  }

  const visualViewport = getVisualViewport();
  const layoutWidth = Math.max(1, Math.round(window.innerWidth || visualViewport?.width || 1));
  const layoutHeight = Math.max(1, Math.round(window.innerHeight || visualViewport?.height || 1));
  const width = Math.max(1, Math.round(visualViewport?.width || layoutWidth));
  const height = Math.max(1, Math.round(visualViewport?.height || layoutHeight));

  return {
    width,
    height,
    layoutWidth,
    layoutHeight,
    offsetTop: Math.max(0, Math.round(visualViewport?.offsetTop || 0)),
    offsetLeft: Math.max(0, Math.round(visualViewport?.offsetLeft || 0)),
    pageTop: Math.max(0, Math.round(visualViewport?.pageTop || 0)),
    pageLeft: Math.max(0, Math.round(visualViewport?.pageLeft || 0)),
    scale: Math.max(1, visualViewport?.scale || 1)
  };
}

export function getRuntimeViewportSize() {
  const metrics = getRuntimeViewportMetrics();
  return {
    width: metrics.width,
    height: metrics.height
  };
}

function hasMeaningfulViewportChange(previous: RuntimeViewportMetrics | null, next: RuntimeViewportMetrics, force = false) {
  if (force || !previous) {
    return true;
  }

  return (
    Math.abs(previous.width - next.width) >= 2 ||
    Math.abs(previous.height - next.height) >= 2 ||
    Math.abs(previous.layoutWidth - next.layoutWidth) >= 2 ||
    Math.abs(previous.layoutHeight - next.layoutHeight) >= 2 ||
    Math.abs(previous.offsetTop - next.offsetTop) >= 8 ||
    Math.abs(previous.offsetLeft - next.offsetLeft) >= 8 ||
    Math.abs(previous.scale - next.scale) >= 0.01
  );
}

export function observeRuntimeViewport(listener: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  let lastMetrics: RuntimeViewportMetrics | null = getRuntimeViewportMetrics();
  let pendingFrame: number | null = null;
  let forceNext = false;

  const scheduleViewportSync = (force = false) => {
    forceNext = forceNext || force;
    if (pendingFrame !== null) {
      return;
    }
    pendingFrame = window.requestAnimationFrame(() => {
      pendingFrame = null;
      const nextMetrics = getRuntimeViewportMetrics();
      if (!hasMeaningfulViewportChange(lastMetrics, nextMetrics, forceNext)) {
        forceNext = false;
        return;
      }
      forceNext = false;
      lastMetrics = nextMetrics;
      listener();
    });
  };

  const handleResize = () => scheduleViewportSync();
  const handlePageShow = () => scheduleViewportSync(true);
  const handleVisibilityChange = () => {
    if (typeof document === 'undefined' || document.visibilityState === 'visible') {
      scheduleViewportSync(true);
    }
  };

  window.addEventListener('resize', handleResize, { passive: true });
  window.addEventListener('orientationchange', handleResize, { passive: true });
  window.addEventListener('pageshow', handlePageShow, { passive: true });

  const visualViewport = getVisualViewport();
  visualViewport?.addEventListener('resize', handleResize, { passive: true });
  visualViewport?.addEventListener('scroll', handleResize, { passive: true });

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }

  return () => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('orientationchange', handleResize);
    window.removeEventListener('pageshow', handlePageShow);
    visualViewport?.removeEventListener('resize', handleResize);
    visualViewport?.removeEventListener('scroll', handleResize);
    if (pendingFrame !== null) {
      window.cancelAnimationFrame(pendingFrame);
      pendingFrame = null;
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  };
}
