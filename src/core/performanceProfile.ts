import { getRuntimeDeviceState } from './device';
import { getRuntimeViewportSize } from './viewport';

export type RuntimePerformanceProfileId = 'desktopHigh' | 'desktopLow' | 'mobile' | 'mobileLow';
export type PerformanceBackdropQuality = 'high' | 'low' | 'off';

export interface RuntimePerformanceProfile {
  id: RuntimePerformanceProfileId;
  isMobile: boolean;
  targetGameplayFps: number;
  targetShellFps: number;
  hudUpdateIntervalMs: number;
  uiRefreshIntervalMs: number;
  guideUpdateIntervalMs: number;
  assetPreloadConcurrency: number;
  maxRendererPixelRatio: number;
  rendererPixelBudget: number;
  backdropQuality: PerformanceBackdropQuality;
  enableMomentumBoats: boolean;
  enableAutoHelpTutorial: boolean;
  prefetchGameRuntimeOnHubIdle: boolean;
  loadPortalCommunityArtwork: boolean;
}

const PERF_DEBUG_QUERY_KEY = 'perfDebug';
const PERF_DEBUG_STORAGE_KEY = 'perfDebug';

let cachedProfileSignature = '';
let cachedProfile: RuntimePerformanceProfile | null = null;

function readNumericHint(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function resolveProfile() {
  const deviceState = getRuntimeDeviceState();
  const viewport = getRuntimeViewportSize();
  const hardwareConcurrency = readNumericHint(window.navigator.hardwareConcurrency) ?? 4;
  const deviceMemory = readNumericHint((window.navigator as Navigator & { deviceMemory?: number }).deviceMemory) ?? null;
  const devicePixelRatio = Math.max(1, window.devicePixelRatio || 1);
  const shortestSide = Math.min(viewport.width, viewport.height);
  const longestSide = Math.max(viewport.width, viewport.height);

  const memoryConstrained = deviceMemory !== null && deviceMemory <= 4;
  const cpuConstrained = hardwareConcurrency <= 4;
  const highDensityMobile = deviceState.isMobile && devicePixelRatio >= 3;
  const compactMobileViewport = deviceState.isMobile && shortestSide <= 430 && longestSide <= 960;
  const lowMobile =
    deviceState.isMobile && (memoryConstrained || cpuConstrained || highDensityMobile || compactMobileViewport);
  const lowDesktop =
    !deviceState.isMobile &&
    ((deviceMemory !== null && deviceMemory <= 8) || hardwareConcurrency <= 6 || viewport.width <= 1366);

  if (lowMobile) {
    return {
      id: 'mobileLow',
      isMobile: true,
      targetGameplayFps: 30,
      targetShellFps: 24,
      hudUpdateIntervalMs: 80,
      uiRefreshIntervalMs: 96,
      guideUpdateIntervalMs: 80,
      assetPreloadConcurrency: 2,
      maxRendererPixelRatio: 1.05,
      rendererPixelBudget: 1_050_000,
      backdropQuality: 'off',
      enableMomentumBoats: false,
      enableAutoHelpTutorial: false,
      prefetchGameRuntimeOnHubIdle: false,
      loadPortalCommunityArtwork: false
    } satisfies RuntimePerformanceProfile;
  }

  if (deviceState.isMobile) {
    return {
      id: 'mobile',
      isMobile: true,
      targetGameplayFps: 45,
      targetShellFps: 30,
      hudUpdateIntervalMs: 50,
      uiRefreshIntervalMs: 66,
      guideUpdateIntervalMs: 50,
      assetPreloadConcurrency: 3,
      maxRendererPixelRatio: 1.2,
      rendererPixelBudget: 1_350_000,
      backdropQuality: 'low',
      enableMomentumBoats: true,
      enableAutoHelpTutorial: false,
      prefetchGameRuntimeOnHubIdle: false,
      loadPortalCommunityArtwork: false
    } satisfies RuntimePerformanceProfile;
  }

  if (lowDesktop) {
    return {
      id: 'desktopLow',
      isMobile: false,
      targetGameplayFps: 50,
      targetShellFps: 40,
      hudUpdateIntervalMs: 34,
      uiRefreshIntervalMs: 34,
      guideUpdateIntervalMs: 34,
      assetPreloadConcurrency: 6,
      maxRendererPixelRatio: 1.5,
      rendererPixelBudget: 2_400_000,
      backdropQuality: 'low',
      enableMomentumBoats: true,
      enableAutoHelpTutorial: true,
      prefetchGameRuntimeOnHubIdle: true,
      loadPortalCommunityArtwork: true
    } satisfies RuntimePerformanceProfile;
  }

  return {
    id: 'desktopHigh',
    isMobile: false,
    targetGameplayFps: 60,
    targetShellFps: 60,
    hudUpdateIntervalMs: 16,
    uiRefreshIntervalMs: 16,
    guideUpdateIntervalMs: 16,
    assetPreloadConcurrency: 10,
    maxRendererPixelRatio: 1.75,
    rendererPixelBudget: 3_200_000,
    backdropQuality: 'high',
    enableMomentumBoats: true,
    enableAutoHelpTutorial: true,
    prefetchGameRuntimeOnHubIdle: true,
    loadPortalCommunityArtwork: true
  } satisfies RuntimePerformanceProfile;
}

export function getPerformanceProfile() {
  const viewport = getRuntimeViewportSize();
  const signature = [
    viewport.width,
    viewport.height,
    window.devicePixelRatio || 1,
    window.navigator.hardwareConcurrency ?? 'na',
    (window.navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 'na',
    getRuntimeDeviceState().isMobile ? 'mobile' : 'desktop'
  ].join(':');
  if (cachedProfile && cachedProfileSignature === signature) {
    return cachedProfile;
  }
  cachedProfileSignature = signature;
  cachedProfile = resolveProfile();
  return cachedProfile;
}

function isTruthyFlag(value: string | null | undefined) {
  return value === '1' || value === 'true' || value === 'yes' || value === 'on';
}

export function isPerfDebugEnabled() {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    const url = new URL(window.location.href);
    return (
      isTruthyFlag(url.searchParams.get(PERF_DEBUG_QUERY_KEY)) ||
      isTruthyFlag(window.localStorage.getItem(PERF_DEBUG_STORAGE_KEY))
    );
  } catch {
    return false;
  }
}
