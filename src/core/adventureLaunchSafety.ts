import { getRecentGameBootDiagnostics } from './gameBootDiagnostics';
import { getRuntimeDeviceState, getRuntimePlatformDetails } from './device';
import type { GameQualitySelection, GameQualityState, ResolvedGameQuality } from './gameQuality';
import { addGameBreadcrumb, captureGameException, isFrontendSentryAvailable } from './sentry';

export type AdventureLaunchPhase =
  | 'adventure_loading_requested'
  | 'adventure_runtime_loading'
  | 'adventure_assets_preloading'
  | 'adventure_safety_warmup'
  | 'adventure_transition_resume'
  | 'adventure_game_start'
  | 'adventure_first_frames'
  | 'adventure_stable';

export interface AdventureLaunchTrackingSnapshot {
  route: string;
  phase: AdventureLaunchPhase;
  qualityState: Pick<GameQualityState, 'selection' | 'resolved' | 'source' | 'recoveryForced'>;
  fpsAverage?: number;
  frameMsP95?: number;
  sampleCount?: number;
  preloadQueue?: string;
  lastDiagnosticEvent?: string;
}

export interface AdventureCrashRecoveryReport {
  reportId: string;
  detectedAt: number;
  previousTimestamp: number;
  previousQuality: ResolvedGameQuality;
  previousPhase: AdventureLaunchPhase;
  route: string;
  qualitySelection: GameQualitySelection;
  qualitySource: GameQualityState['source'];
  recoveryForced: true;
  device: {
    userAgent: string;
    platform: string;
    isMobile: boolean;
    isAppleMobile: boolean;
    isAndroid: boolean;
    devicePixelRatio: number;
    viewportWidth: number;
    viewportHeight: number;
    hardwareConcurrency: number;
    deviceMemory: number | null;
    maxTouchPoints: number;
  };
  runtime: {
    fpsAverage: number;
    frameMsP95: number;
    sampleCount: number;
  } | null;
  preloadQueue: string | null;
  lastDiagnosticEvent: string | null;
  recentBootEvents: Array<{
    at: number;
    level: 'info' | 'warn' | 'error';
    event: string;
  }>;
  sentryAttemptCount: number;
  sentryLastAttemptAt: number | null;
}

interface AdventureLaunchMarker {
  inProgress: true;
  startedAt: number;
  updatedAt: number;
  route: string;
  phase: AdventureLaunchPhase;
  qualitySelection: GameQualitySelection;
  resolvedQuality: ResolvedGameQuality;
  qualitySource: GameQualityState['source'];
  recoveryForced: boolean;
  device: AdventureCrashRecoveryReport['device'];
  runtime: AdventureCrashRecoveryReport['runtime'];
  preloadQueue: string | null;
  lastDiagnosticEvent: string | null;
  recentBootEvents: AdventureCrashRecoveryReport['recentBootEvents'];
}

interface AdventureRecoverySession {
  forcedQuality: ResolvedGameQuality;
  detectedAt: number;
  previousQuality: ResolvedGameQuality;
  previousPhase: AdventureLaunchPhase;
}

const ADVENTURE_LAUNCH_MARKER_KEY = 'portfolio-adventure-launch-marker-v1';
const ADVENTURE_LAUNCH_PENDING_REPORT_KEY = 'portfolio-adventure-launch-pending-report-v1';
const ADVENTURE_RECOVERY_SESSION_KEY = 'portfolio-adventure-recovery-session-v1';

let cachedPreviousCrash: AdventureCrashRecoveryReport | null | undefined;

function hasBrowserRuntime() {
  return typeof window !== 'undefined';
}

function readNumericHint(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function readJson<T>(storage: Storage | null, key: string) {
  if (!storage) {
    return null;
  }
  try {
    const raw = storage.getItem(key);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(storage: Storage | null, key: string, value: unknown) {
  if (!storage) {
    return;
  }
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    // Best-effort persistence only.
  }
}

function removeKey(storage: Storage | null, key: string) {
  if (!storage) {
    return;
  }
  try {
    storage.removeItem(key);
  } catch {
    // Best-effort persistence only.
  }
}

function getLocalStorage() {
  if (!hasBrowserRuntime()) {
    return null;
  }
  return window.localStorage;
}

function getSessionStorage() {
  if (!hasBrowserRuntime()) {
    return null;
  }
  return window.sessionStorage;
}

function buildDeviceSnapshot(): AdventureCrashRecoveryReport['device'] {
  const deviceState = getRuntimeDeviceState();
  const platformDetails = getRuntimePlatformDetails();
  return {
    userAgent: platformDetails.userAgent,
    platform: platformDetails.platform,
    isMobile: deviceState.isMobile,
    isAppleMobile: platformDetails.isAppleMobile,
    isAndroid: platformDetails.isAndroid,
    devicePixelRatio: Math.max(1, Number((window.devicePixelRatio || 1).toFixed(2))),
    viewportWidth: Math.max(0, Math.round(window.innerWidth || 0)),
    viewportHeight: Math.max(0, Math.round(window.innerHeight || 0)),
    hardwareConcurrency: Math.max(1, Math.round(window.navigator.hardwareConcurrency || 4)),
    deviceMemory: readNumericHint((window.navigator as Navigator & { deviceMemory?: number }).deviceMemory),
    maxTouchPoints: Math.max(0, window.navigator.maxTouchPoints ?? 0)
  };
}

function readMarker() {
  return readJson<AdventureLaunchMarker>(getLocalStorage(), ADVENTURE_LAUNCH_MARKER_KEY);
}

function readPendingReport() {
  return readJson<AdventureCrashRecoveryReport>(getLocalStorage(), ADVENTURE_LAUNCH_PENDING_REPORT_KEY);
}

function buildRecentBootEvents() {
  return getRecentGameBootDiagnostics(8).map((entry) => ({
    at: entry.at,
    level: entry.level,
    event: entry.event
  }));
}

function buildRuntimeSnapshot(snapshot: AdventureLaunchTrackingSnapshot): AdventureCrashRecoveryReport['runtime'] {
  const fpsAverage = snapshot.fpsAverage ?? 0;
  const frameMsP95 = snapshot.frameMsP95 ?? 0;
  const sampleCount = snapshot.sampleCount ?? 0;
  if (fpsAverage <= 0 && frameMsP95 <= 0 && sampleCount <= 0) {
    return null;
  }
  return {
    fpsAverage,
    frameMsP95,
    sampleCount
  };
}

function writeMarker(snapshot: AdventureLaunchTrackingSnapshot, resetStartTime = false) {
  const existing = !resetStartTime ? readMarker() : null;
  const startedAt = existing?.startedAt ?? Date.now();
  const marker: AdventureLaunchMarker = {
    inProgress: true,
    startedAt,
    updatedAt: Date.now(),
    route: snapshot.route,
    phase: snapshot.phase,
    qualitySelection: snapshot.qualityState.selection,
    resolvedQuality: snapshot.qualityState.resolved,
    qualitySource: snapshot.qualityState.source,
    recoveryForced: snapshot.qualityState.recoveryForced,
    device: buildDeviceSnapshot(),
    runtime: buildRuntimeSnapshot(snapshot),
    preloadQueue: snapshot.preloadQueue ?? null,
    lastDiagnosticEvent: snapshot.lastDiagnosticEvent ?? snapshot.phase,
    recentBootEvents: buildRecentBootEvents()
  };
  writeJson(getLocalStorage(), ADVENTURE_LAUNCH_MARKER_KEY, marker);
}

function buildRecoverySession(report: AdventureCrashRecoveryReport): AdventureRecoverySession {
  return {
    forcedQuality: 'ultra_low',
    detectedAt: report.detectedAt,
    previousQuality: report.previousQuality,
    previousPhase: report.previousPhase
  };
}

export function beginAdventureLaunchTracking(snapshot: AdventureLaunchTrackingSnapshot) {
  writeMarker(snapshot, true);
}

export function updateAdventureLaunchTracking(snapshot: AdventureLaunchTrackingSnapshot) {
  writeMarker(snapshot, false);
}

export function clearAdventureLaunchTracking() {
  removeKey(getLocalStorage(), ADVENTURE_LAUNCH_MARKER_KEY);
}

export function getAdventureRecoverySession() {
  return readJson<AdventureRecoverySession>(getSessionStorage(), ADVENTURE_RECOVERY_SESSION_KEY);
}

export function isAdventureRecoverySessionForced() {
  return Boolean(getAdventureRecoverySession());
}

export function hasPendingAdventureCrashReport() {
  return Boolean(readPendingReport());
}

export function detectPreviousAdventureLaunchCrash() {
  if (cachedPreviousCrash !== undefined) {
    return cachedPreviousCrash;
  }

  const marker = readMarker();
  if (!marker) {
    cachedPreviousCrash = null;
    return cachedPreviousCrash;
  }

  const existingPendingReport = readPendingReport();
  const report: AdventureCrashRecoveryReport = {
    reportId: existingPendingReport?.reportId ?? `adventure-crash-${marker.startedAt}`,
    detectedAt: Date.now(),
    previousTimestamp: marker.startedAt,
    previousQuality: marker.resolvedQuality,
    previousPhase: marker.phase,
    route: marker.route,
    qualitySelection: marker.qualitySelection,
    qualitySource: marker.qualitySource,
    recoveryForced: true,
    device: marker.device,
    runtime: marker.runtime,
    preloadQueue: marker.preloadQueue,
    lastDiagnosticEvent: marker.lastDiagnosticEvent,
    recentBootEvents: marker.recentBootEvents,
    sentryAttemptCount: existingPendingReport?.sentryAttemptCount ?? 0,
    sentryLastAttemptAt: existingPendingReport?.sentryLastAttemptAt ?? null
  };

  writeJson(getLocalStorage(), ADVENTURE_LAUNCH_PENDING_REPORT_KEY, report);
  writeJson(getSessionStorage(), ADVENTURE_RECOVERY_SESSION_KEY, buildRecoverySession(report));
  clearAdventureLaunchTracking();
  cachedPreviousCrash = report;
  return cachedPreviousCrash;
}

export function flushPendingAdventureCrashReport() {
  const report = readPendingReport();
  if (!report || !isFrontendSentryAvailable()) {
    return false;
  }

  const attemptedReport: AdventureCrashRecoveryReport = {
    ...report,
    sentryAttemptCount: report.sentryAttemptCount + 1,
    sentryLastAttemptAt: Date.now()
  };

  addGameBreadcrumb(
    'suspected_mobile_reboot_after_adventure_launch',
    {
      previousQuality: attemptedReport.previousQuality,
      previousPhase: attemptedReport.previousPhase,
      route: attemptedReport.route
    },
    'warning',
    'game.recovery'
  );
  captureGameException(new Error('suspected_mobile_reboot_after_adventure_launch'), {
    event: 'suspected_mobile_reboot_after_adventure_launch',
    category: 'adventure_launch_recovery',
    data: { ...attemptedReport }
  });
  removeKey(getLocalStorage(), ADVENTURE_LAUNCH_PENDING_REPORT_KEY);
  return true;
}
