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

export function observeRuntimeViewport(listener: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleResize = () => listener();
  const handlePageShow = () => listener();
  const handleVisibilityChange = () => {
    if (typeof document === 'undefined' || document.visibilityState === 'visible') {
      listener();
    }
  };

  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);
  window.addEventListener('pageshow', handlePageShow);

  const visualViewport = getVisualViewport();
  visualViewport?.addEventListener('resize', handleResize);
  visualViewport?.addEventListener('scroll', handleResize);

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }

  return () => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('orientationchange', handleResize);
    window.removeEventListener('pageshow', handlePageShow);
    visualViewport?.removeEventListener('resize', handleResize);
    visualViewport?.removeEventListener('scroll', handleResize);
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  };
}
