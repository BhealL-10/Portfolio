import { getRuntimeViewportSize } from './viewport';

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

export interface RuntimePlatformDetails {
  isAppleMobile: boolean;
  isAndroid: boolean;
  platform: string;
  userAgent: string;
}

const MOBILE_USER_AGENT_RE =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i;
const APPLE_MOBILE_USER_AGENT_RE = /iPhone|iPad|iPod/i;
const ANDROID_USER_AGENT_RE = /Android/i;

function getViewportSize() {
  return getRuntimeViewportSize();
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

export function getRuntimePlatformDetails(): RuntimePlatformDetails {
  const userAgent = window.navigator.userAgent ?? '';
  const platform = window.navigator.platform ?? '';
  const maxTouchPoints = window.navigator.maxTouchPoints ?? 0;
  const isAppleMobile =
    APPLE_MOBILE_USER_AGENT_RE.test(userAgent) || (/Macintosh/i.test(userAgent) && maxTouchPoints > 1);
  return {
    isAppleMobile,
    isAndroid: ANDROID_USER_AGENT_RE.test(userAgent),
    platform,
    userAgent
  };
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

export function isAppleMobileRuntime() {
  return getRuntimePlatformDetails().isAppleMobile;
}

export function isAndroidRuntime() {
  return getRuntimePlatformDetails().isAndroid;
}
