export interface RuntimeDeviceState {
  isMobile: boolean;
  isDesktop: boolean;
  isLandscape: boolean;
  isPortrait: boolean;
  isMobileLandscape: boolean;
  isMobilePortrait: boolean;
  hasCoarsePointer: boolean;
  hasHover: boolean;
  hasAnyFinePointer: boolean;
  hasAnyCoarsePointer: boolean;
}

const MOBILE_USER_AGENT_RE =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i;

function getViewportSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

function isLikelyMobileUserAgent() {
  const userAgentData = (window.navigator as Navigator & { userAgentData?: { mobile?: boolean } }).userAgentData;
  if (typeof userAgentData?.mobile === 'boolean') {
    return userAgentData.mobile;
  }
  const userAgent = window.navigator.userAgent ?? '';
  const maxTouchPoints = window.navigator.maxTouchPoints ?? 0;
  return MOBILE_USER_AGENT_RE.test(userAgent) || (/Macintosh/i.test(userAgent) && maxTouchPoints > 1);
}

export function getRuntimeDeviceState(): RuntimeDeviceState {
  const { width, height } = getViewportSize();
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const hasHover = window.matchMedia('(hover: hover)').matches;
  const hasAnyFinePointer = window.matchMedia('(any-pointer: fine)').matches;
  const hasAnyCoarsePointer = window.matchMedia('(any-pointer: coarse)').matches;
  const maxTouchPoints = window.navigator.maxTouchPoints ?? 0;
  const shortestViewportSide = Math.min(width, height);
  const longestViewportSide = Math.max(width, height);
  const isTouchOnlyViewport = hasAnyCoarsePointer && !hasAnyFinePointer && maxTouchPoints > 0;
  const isMobile =
    isLikelyMobileUserAgent() ||
    (isTouchOnlyViewport && shortestViewportSide <= 900 && longestViewportSide <= 1600);
  const isLandscape = width >= height;
  const isPortrait = height > width;

  return {
    isMobile,
    isDesktop: !isMobile,
    isLandscape,
    isPortrait,
    isMobileLandscape: isMobile && isLandscape,
    isMobilePortrait: isMobile && isPortrait,
    hasCoarsePointer,
    hasHover,
    hasAnyFinePointer,
    hasAnyCoarsePointer
  };
}

export function applyRuntimeDeviceAttributes(target: HTMLElement = document.documentElement) {
  const state = getRuntimeDeviceState();
  target.dataset.runtimeDevice = state.isMobile ? 'mobile' : 'desktop';
  target.dataset.runtimeOrientation = state.isLandscape ? 'landscape' : 'portrait';
}

export function isMobileRuntime() {
  return getRuntimeDeviceState().isMobile;
}

export function isDesktopRuntime() {
  return getRuntimeDeviceState().isDesktop;
}

export function isMobileLandscapeRuntime() {
  return getRuntimeDeviceState().isMobileLandscape;
}

export function isMobilePortraitRuntime() {
  return getRuntimeDeviceState().isMobilePortrait;
}
