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

type ViewportEventSource =
  | 'window-resize'
  | 'orientationchange'
  | 'pageshow'
  | 'visibilitychange'
  | 'visualViewport-resize'
  | 'visualViewport-scroll';

const DESKTOP_VIEWPORT_SIZE_THRESHOLD_PX = 2;
const MOBILE_VIEWPORT_SIZE_THRESHOLD_PX = 4;
const DESKTOP_VIEWPORT_OFFSET_THRESHOLD_PX = 8;
const MOBILE_VIEWPORT_OFFSET_THRESHOLD_PX = 24;
const DESKTOP_VIEWPORT_SCALE_THRESHOLD = 0.01;
const MOBILE_VIEWPORT_SCALE_THRESHOLD = 0.03;
const MOBILE_VIEWPORT_RESIZE_SETTLE_MS = 90;
const MOBILE_VIEWPORT_SCROLL_SETTLE_MS = 140;

function getVisualViewport() {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.visualViewport ?? null;
}

function isLikelyMobileViewportRuntime() {
  if (typeof window === 'undefined') {
    return false;
  }
  return (
    window.matchMedia?.('(pointer: coarse)').matches ||
    (window.navigator.maxTouchPoints ?? 0) > 1
  );
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

  const mobile = isLikelyMobileViewportRuntime();
  const sizeThreshold = mobile ? MOBILE_VIEWPORT_SIZE_THRESHOLD_PX : DESKTOP_VIEWPORT_SIZE_THRESHOLD_PX;
  const offsetThreshold = mobile ? MOBILE_VIEWPORT_OFFSET_THRESHOLD_PX : DESKTOP_VIEWPORT_OFFSET_THRESHOLD_PX;
  const scaleThreshold = mobile ? MOBILE_VIEWPORT_SCALE_THRESHOLD : DESKTOP_VIEWPORT_SCALE_THRESHOLD;

  return (
    Math.abs(previous.width - next.width) >= sizeThreshold ||
    Math.abs(previous.height - next.height) >= sizeThreshold ||
    Math.abs(previous.layoutWidth - next.layoutWidth) >= sizeThreshold ||
    Math.abs(previous.layoutHeight - next.layoutHeight) >= sizeThreshold ||
    Math.abs(previous.offsetTop - next.offsetTop) >= offsetThreshold ||
    Math.abs(previous.offsetLeft - next.offsetLeft) >= offsetThreshold ||
    Math.abs(previous.scale - next.scale) >= scaleThreshold
  );
}

function getViewportSyncDelayMs(source: ViewportEventSource) {
  if (!isLikelyMobileViewportRuntime()) {
    return 0;
  }
  if (source === 'visualViewport-scroll') {
    return MOBILE_VIEWPORT_SCROLL_SETTLE_MS;
  }
  if (source === 'window-resize' || source === 'visualViewport-resize') {
    return MOBILE_VIEWPORT_RESIZE_SETTLE_MS;
  }
  return 0;
}

export function observeRuntimeViewport(listener: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  let lastMetrics: RuntimeViewportMetrics | null = getRuntimeViewportMetrics();
  let pendingFrame: number | null = null;
  let pendingTimeout: number | null = null;
  let forceNext = false;

  const queueViewportSync = () => {
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

  const scheduleViewportSync = (source: ViewportEventSource, force = false) => {
    forceNext = forceNext || force;
    const delayMs = getViewportSyncDelayMs(source);
    if (pendingTimeout !== null) {
      window.clearTimeout(pendingTimeout);
      pendingTimeout = null;
    }
    if (delayMs > 0) {
      pendingTimeout = window.setTimeout(() => {
        pendingTimeout = null;
        queueViewportSync();
      }, delayMs);
      return;
    }
    queueViewportSync();
  };

  const handleResize = () => scheduleViewportSync('window-resize');
  const handleOrientationChange = () => scheduleViewportSync('orientationchange', true);
  const handlePageShow = () => scheduleViewportSync('pageshow', true);
  const handleVisualViewportResize = () => scheduleViewportSync('visualViewport-resize');
  const handleVisualViewportScroll = () => scheduleViewportSync('visualViewport-scroll');
  const handleVisibilityChange = () => {
    if (typeof document === 'undefined' || document.visibilityState === 'visible') {
      scheduleViewportSync('visibilitychange', true);
    }
  };

  window.addEventListener('resize', handleResize, { passive: true });
  window.addEventListener('orientationchange', handleOrientationChange, { passive: true });
  window.addEventListener('pageshow', handlePageShow, { passive: true });

  const visualViewport = getVisualViewport();
  visualViewport?.addEventListener('resize', handleVisualViewportResize, { passive: true });
  visualViewport?.addEventListener('scroll', handleVisualViewportScroll, { passive: true });

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }

  return () => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('orientationchange', handleOrientationChange);
    window.removeEventListener('pageshow', handlePageShow);
    if (pendingTimeout !== null) {
      window.clearTimeout(pendingTimeout);
      pendingTimeout = null;
    }
    visualViewport?.removeEventListener('resize', handleVisualViewportResize);
    visualViewport?.removeEventListener('scroll', handleVisualViewportScroll);
    if (pendingFrame !== null) {
      window.cancelAnimationFrame(pendingFrame);
      pendingFrame = null;
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  };
}
