import { addGameBreadcrumb, captureGameException } from './sentry';
import { classifyExternalBrowserNoise } from './externalBrowserNoise';
import {
  sanitizeLogString,
  sanitizeLogValue,
  type SanitizedLogValue
} from './logSanitizer';

type GameBootDiagnosticLevel = 'info' | 'warn' | 'error';
type GameBootDiagnosticsMode = 'off' | 'light' | 'debug';

type GameBootDiagnosticValue = SanitizedLogValue;

export interface GameBootDiagnosticEntry {
  at: number;
  iso: string;
  level: GameBootDiagnosticLevel;
  event: string;
  data?: GameBootDiagnosticValue;
}

interface InstallGameBootDiagnosticsOptions {
  autoStartSession?: boolean;
}

const GAME_BOOT_DIAGNOSTIC_STORAGE_KEY = 'portfolio-game-boot-diagnostics-v1';
const GAME_BOOT_DIAGNOSTIC_DEBUG_FLAG_KEY = 'portfolio-game-debug';
const GAME_BOOT_DIAGNOSTIC_DEBUG_BOOT_FLAG_KEY = 'debugBoot';
const GAME_BOOT_DIAGNOSTIC_DEBUG_QUERY_KEY = 'debugBoot';
const GAME_BOOT_DIAGNOSTIC_MAX_ENTRIES = 160;
const GAME_BOOT_DIAGNOSTIC_LIGHT_MAX_ENTRIES = 48;
const GAME_BOOT_DIAGNOSTIC_DEBUG_MOBILE_MAX_ENTRIES = 72;
const GAME_BOOT_DIAGNOSTIC_STORAGE_BUDGET_BYTES = 420_000;
const GAME_BOOT_DIAGNOSTIC_LIGHT_STORAGE_BUDGET_BYTES = 72_000;
const GAME_BOOT_DIAGNOSTIC_DEBUG_MOBILE_STORAGE_BUDGET_BYTES = 120_000;
const GAME_BOOT_DIAGNOSTIC_DEDUPE_WINDOW_MS = 180;
const GAME_BOOT_DIAGNOSTIC_OVERLAY_MAX_ENTRIES = 48;
const GAME_BOOT_DIAGNOSTIC_MOBILE_OVERLAY_MAX_ENTRIES = 28;
const SENTRY_TRANSPORT_PATTERN =
  /(?:o\d+\.ingest\.[\w.-]*sentry\.io|ingest\.[\w.-]*sentry\.io|sentry\.io\/api|@sentry\/browser|@sentry\/core)/i;
const NETWORK_BLOCKED_PATTERN =
  /(?:ERR_BLOCKED_BY_CLIENT|Load failed|Failed to fetch|NetworkError|network request failed|fetch failed|blocked by client|content blocker)/i;
const LOW_SIGNAL_BREADCRUMB_EVENTS = new Set([
  'window_resize',
  'orientation_change',
  'page_hide',
  'page_show',
  'visibility_change',
  'document_fullscreen_change',
  'document_webkit_fullscreen_change',
  'visual_viewport_resize',
  'visual_viewport_scroll',
  'display_sync',
  'renderer_resize'
]);

let diagnosticsInstalled = false;
let diagnosticsCache: GameBootDiagnosticEntry[] | null = null;
let lastDiagnosticSignature = '';
let lastDiagnosticAt = 0;
let resizeFrame: number | null = null;
let visualViewportFrame: number | null = null;
let overlayElement: HTMLDivElement | null = null;
let overlayContentElement: HTMLPreElement | null = null;
let overlayRenderFrame: number | null = null;
let bootSessionStarted = false;

declare global {
  interface Window {
    __portfolioGameBootDiagnostics?: GameBootDiagnosticEntry[];
  }
}

function hasBrowserRuntime() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function isTruthyDebugValue(value: string | null | undefined) {
  return value === '1' || value === 'true' || value === 'yes' || value === 'on';
}

function getQueryDebugFlag() {
  if (!hasBrowserRuntime()) {
    return false;
  }
  try {
    return isTruthyDebugValue(new URL(window.location.href).searchParams.get(GAME_BOOT_DIAGNOSTIC_DEBUG_QUERY_KEY));
  } catch {
    return false;
  }
}

function getDebugFlag() {
  if (!hasBrowserRuntime()) {
    return false;
  }
  try {
    return (
      isTruthyDebugValue(window.localStorage.getItem(GAME_BOOT_DIAGNOSTIC_DEBUG_BOOT_FLAG_KEY)) ||
      isTruthyDebugValue(window.localStorage.getItem(GAME_BOOT_DIAGNOSTIC_DEBUG_FLAG_KEY))
    );
  } catch {
    return false;
  }
}

function isExplicitDebugModeEnabled() {
  return import.meta.env.VITE_DEBUG_BOOT === '1' || getQueryDebugFlag() || getDebugFlag();
}

function isLikelyMobileDiagnosticsRuntime() {
  if (!hasBrowserRuntime()) {
    return false;
  }
  return (
    window.matchMedia?.('(pointer: coarse)').matches ||
    (window.navigator.maxTouchPoints ?? 0) > 1 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(window.navigator.userAgent)
  );
}

function getGameBootDiagnosticsMode(): GameBootDiagnosticsMode {
  if (!hasBrowserRuntime()) {
    return 'off';
  }
  if (isExplicitDebugModeEnabled()) {
    return 'debug';
  }
  return isLikelyMobileDiagnosticsRuntime() ? 'light' : 'off';
}

function getDiagnosticMaxEntries() {
  const mode = getGameBootDiagnosticsMode();
  if (mode === 'light') {
    return GAME_BOOT_DIAGNOSTIC_LIGHT_MAX_ENTRIES;
  }
  if (mode === 'debug' && isLikelyMobileDiagnosticsRuntime()) {
    return GAME_BOOT_DIAGNOSTIC_DEBUG_MOBILE_MAX_ENTRIES;
  }
  return GAME_BOOT_DIAGNOSTIC_MAX_ENTRIES;
}

function getDiagnosticStorageBudgetBytes() {
  const mode = getGameBootDiagnosticsMode();
  if (mode === 'light') {
    return GAME_BOOT_DIAGNOSTIC_LIGHT_STORAGE_BUDGET_BYTES;
  }
  if (mode === 'debug' && isLikelyMobileDiagnosticsRuntime()) {
    return GAME_BOOT_DIAGNOSTIC_DEBUG_MOBILE_STORAGE_BUDGET_BYTES;
  }
  return GAME_BOOT_DIAGNOSTIC_STORAGE_BUDGET_BYTES;
}

function getDiagnosticOverlayMaxEntries() {
  return isLikelyMobileDiagnosticsRuntime()
    ? GAME_BOOT_DIAGNOSTIC_MOBILE_OVERLAY_MAX_ENTRIES
    : GAME_BOOT_DIAGNOSTIC_OVERLAY_MAX_ENTRIES;
}

function getDiagnosticSanitizeOptions() {
  return {
    maxDepth: 4,
    maxStringLength: isLikelyMobileDiagnosticsRuntime() ? 220 : 360,
    maxArrayLength: isLikelyMobileDiagnosticsRuntime() ? 8 : 12,
    maxObjectEntries: isLikelyMobileDiagnosticsRuntime() ? 10 : 14
  };
}

export function isGameBootDiagnosticsEnabled() {
  return getGameBootDiagnosticsMode() !== 'off';
}

function isGameBootOverlayEnabled() {
  return getGameBootDiagnosticsMode() === 'debug';
}

function shouldInstallAutomaticViewportDiagnostics() {
  return getGameBootDiagnosticsMode() === 'debug';
}

function shouldMirrorDiagnosticToBreadcrumb(event: string, level: GameBootDiagnosticLevel) {
  if (getGameBootDiagnosticsMode() === 'off') {
    return false;
  }
  if (level !== 'info') {
    return true;
  }
  if (getGameBootDiagnosticsMode() === 'debug') {
    return true;
  }
  return !LOW_SIGNAL_BREADCRUMB_EVENTS.has(event);
}

function sanitizeDiagnosticData(data?: Record<string, unknown>) {
  if (!data) {
    return undefined;
  }
  return sanitizeLogValue(data, getDiagnosticSanitizeOptions());
}

function collectDiagnosticStrings(value: unknown, strings: string[], depth = 0, seen = new WeakSet<object>()) {
  if (value === null || value === undefined || depth >= 4) {
    return;
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    const sanitized = sanitizeLogString(String(value), { maxStringLength: 640 });
    strings.push(typeof sanitized === 'string' ? sanitized : JSON.stringify(sanitized));
    return;
  }
  if (value instanceof Error) {
    strings.push(value.name);
    const sanitizedMessage = sanitizeLogString(value.message, { maxStringLength: 640 });
    strings.push(typeof sanitizedMessage === 'string' ? sanitizedMessage : JSON.stringify(sanitizedMessage));
    if (value.stack) {
      const sanitizedStack = sanitizeLogString(value.stack, { maxStringLength: 1200 });
      strings.push(typeof sanitizedStack === 'string' ? sanitizedStack : JSON.stringify(sanitizedStack));
    }
    collectDiagnosticStrings(value.cause, strings, depth + 1, seen);
    return;
  }
  if (typeof value !== 'object') {
    const sanitized = sanitizeLogString(String(value), { maxStringLength: 640 });
    strings.push(typeof sanitized === 'string' ? sanitized : JSON.stringify(sanitized));
    return;
  }
  if (seen.has(value)) {
    return;
  }
  seen.add(value);
  if (value instanceof HTMLElement) {
    strings.push(value.tagName, value.id, value.className);
    const source = value.getAttribute('src') ?? value.getAttribute('href');
    if (source) {
      const sanitized = sanitizeLogString(source, { maxStringLength: 640 });
      strings.push(typeof sanitized === 'string' ? sanitized : JSON.stringify(sanitized));
    }
    return;
  }
  Object.values(value as Record<string, unknown>)
    .slice(0, 18)
    .forEach((nestedValue) => collectDiagnosticStrings(nestedValue, strings, depth + 1, seen));
}

function looksLikeSentryTransportFailure(value: unknown, hints: Record<string, unknown> = {}) {
  const strings: string[] = [];
  collectDiagnosticStrings(value, strings);
  collectDiagnosticStrings(hints, strings);
  const payload = strings.filter(Boolean).join('\n');
  if (!payload) {
    return false;
  }
  const sentryRelated = SENTRY_TRANSPORT_PATTERN.test(payload);
  return sentryRelated && (NETWORK_BLOCKED_PATTERN.test(payload) || /ingest\.[\w.-]*sentry\.io/i.test(payload));
}

function normalizeDiagnosticError(error: unknown) {
  if (error instanceof Error) {
    return {
      exception: error,
      details: undefined as Record<string, unknown> | undefined
    };
  }

  if (typeof PromiseRejectionEvent !== 'undefined' && error instanceof PromiseRejectionEvent) {
    return normalizeDiagnosticError(error.reason);
  }

  if (error && typeof error === 'object') {
    const source = error as Record<string, unknown>;
    const nestedError = source.error ?? source.reason ?? source.cause;
    if (nestedError instanceof Error) {
      return {
        exception: nestedError,
        details: {
          nonErrorPayload: sanitizeLogValue(error, getDiagnosticSanitizeOptions())
        }
      };
    }

    const message =
      typeof source.message === 'string'
        ? source.message
        : typeof source.name === 'string'
          ? source.name
          : 'Non-Error object was thrown or rejected';
    const exception = new Error(message);
    if (typeof source.name === 'string') {
      exception.name = source.name;
    }
    if (typeof source.stack === 'string') {
      exception.stack = source.stack;
    }
    return {
      exception,
      details: {
        nonErrorPayload: sanitizeLogValue(error, getDiagnosticSanitizeOptions())
      }
    };
  }

  return {
    exception: new Error(String(error)),
    details: {
      nonErrorPayload: sanitizeLogValue(error, getDiagnosticSanitizeOptions())
    }
  };
}

function readDiagnosticsCache() {
  if (diagnosticsCache) {
    return diagnosticsCache;
  }

  diagnosticsCache = [];
  if (!hasBrowserRuntime()) {
    return diagnosticsCache;
  }

  try {
    const raw = window.localStorage.getItem(GAME_BOOT_DIAGNOSTIC_STORAGE_KEY);
    if (!raw) {
      return diagnosticsCache;
    }
    if (raw.length > getDiagnosticStorageBudgetBytes()) {
      window.localStorage.removeItem(GAME_BOOT_DIAGNOSTIC_STORAGE_KEY);
      return diagnosticsCache;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      diagnosticsCache = parsed.slice(-getDiagnosticMaxEntries());
    }
  } catch {
    diagnosticsCache = [];
  }

  window.__portfolioGameBootDiagnostics = diagnosticsCache;
  return diagnosticsCache;
}

function persistDiagnosticsCache() {
  if (!hasBrowserRuntime()) {
    return;
  }
  const entries = readDiagnosticsCache();
  window.__portfolioGameBootDiagnostics = entries;
  try {
    let payload = JSON.stringify(entries);
    const budget = getDiagnosticStorageBudgetBytes();
    while (payload.length > budget && entries.length > 1) {
      entries.splice(0, Math.ceil(entries.length * 0.25));
      payload = JSON.stringify(entries);
    }
    window.localStorage.setItem(GAME_BOOT_DIAGNOSTIC_STORAGE_KEY, payload);
  } catch {
    // Best-effort persistence only.
  }
}

function formatOverlayEntry(entry: GameBootDiagnosticEntry) {
  const timestamp = entry.iso.slice(11, 23);
  const payload = entry.data === undefined ? '' : ` ${JSON.stringify(entry.data)}`;
  const line = `[${timestamp}] ${entry.level.toUpperCase()} ${entry.event}${payload}`;
  const maxLineLength = isLikelyMobileDiagnosticsRuntime() ? 720 : 1400;
  return line.length > maxLineLength ? `${line.slice(0, maxLineLength)}...` : line;
}

function ensureOverlay() {
  if (!isGameBootOverlayEnabled()) {
    return;
  }
  if (overlayElement && overlayContentElement) {
    return;
  }

  overlayElement = document.createElement('div');
  overlayElement.className = 'game-boot-debug-overlay';
  overlayElement.setAttribute('role', 'log');
  overlayElement.setAttribute('aria-live', 'polite');

  const header = document.createElement('div');
  header.className = 'game-boot-debug-overlay__header';
  header.textContent = 'GameBoot debug';

  overlayContentElement = document.createElement('pre');
  overlayContentElement.className = 'game-boot-debug-overlay__content';

  overlayElement.append(header, overlayContentElement);
  (document.body ?? document.documentElement).appendChild(overlayElement);
}

function renderOverlay() {
  overlayRenderFrame = null;
  ensureOverlay();
  if (!overlayContentElement) {
    return;
  }
  overlayContentElement.textContent = readDiagnosticsCache()
    .slice(-getDiagnosticOverlayMaxEntries())
    .map(formatOverlayEntry)
    .join('\n');
  overlayContentElement.scrollTop = overlayContentElement.scrollHeight;
}

function queueOverlayRender() {
  if (!isGameBootOverlayEnabled()) {
    return;
  }
  if (overlayRenderFrame !== null) {
    return;
  }
  overlayRenderFrame = window.requestAnimationFrame(renderOverlay);
}

function buildViewportSnapshot() {
  if (!hasBrowserRuntime()) {
    return {};
  }
  const visualViewport = window.visualViewport;
  return {
    innerWidth: Math.max(0, Math.round(window.innerWidth || 0)),
    innerHeight: Math.max(0, Math.round(window.innerHeight || 0)),
    outerWidth: Math.max(0, Math.round(window.outerWidth || 0)),
    outerHeight: Math.max(0, Math.round(window.outerHeight || 0)),
    devicePixelRatio: Number((window.devicePixelRatio || 1).toFixed(2)),
    visibility: document.visibilityState,
    orientation:
      window.screen.orientation?.type ??
      (window.innerWidth >= window.innerHeight ? 'landscape' : 'portrait'),
    visualViewport: visualViewport
      ? {
          width: Math.max(0, Math.round(visualViewport.width)),
          height: Math.max(0, Math.round(visualViewport.height)),
          offsetTop: Math.max(0, Math.round(visualViewport.offsetTop)),
          offsetLeft: Math.max(0, Math.round(visualViewport.offsetLeft)),
          scale: Number(visualViewport.scale.toFixed(3))
        }
      : null
  };
}

function appendDiagnostic(level: GameBootDiagnosticLevel, event: string, data?: Record<string, unknown>) {
  if (!isGameBootDiagnosticsEnabled()) {
    return;
  }

  const sanitized = sanitizeDiagnosticData(data);
  const signature = JSON.stringify([level, event, sanitized ?? null]);
  const now = Date.now();
  if (signature === lastDiagnosticSignature && now - lastDiagnosticAt < GAME_BOOT_DIAGNOSTIC_DEDUPE_WINDOW_MS) {
    return;
  }

  lastDiagnosticSignature = signature;
  lastDiagnosticAt = now;

  const entries = readDiagnosticsCache();
  entries.push({
    at: now,
    iso: new Date(now).toISOString(),
    level,
    event,
    data: sanitized
  });
  const maxEntries = getDiagnosticMaxEntries();
  if (entries.length > maxEntries) {
    entries.splice(0, entries.length - maxEntries);
  }
  persistDiagnosticsCache();
  queueOverlayRender();

  if (shouldMirrorDiagnosticToBreadcrumb(event, level)) {
    addGameBreadcrumb(
      event,
      {
        diagnosticLevel: level,
        ...((sanitized && typeof sanitized === 'object' && !Array.isArray(sanitized)) ? sanitized : { payload: sanitized ?? null })
      },
      level === 'warn' ? 'warning' : level,
      'game.boot'
    );
  }

  if (level === 'error' || isExplicitDebugModeEnabled()) {
    const logMethod = level === 'error' ? console.error : level === 'warn' ? console.warn : console.info;
    logMethod(`[GameBoot] ${event}`, sanitized ?? '');
  }
}

export function recordGameBootDiagnostic(event: string, data?: Record<string, unknown>) {
  appendDiagnostic('info', event, data);
}

export function recordGameBootWarning(event: string, data?: Record<string, unknown>) {
  appendDiagnostic('warn', event, data);
}

export function recordGameBootDiagnosticError(event: string, error: unknown, data?: Record<string, unknown>) {
  const normalized = normalizeDiagnosticError(error);
  appendDiagnostic('error', event, {
    ...data,
    error: normalized.exception,
    ...(normalized.details ?? {})
  });
}

export function recordGameBootSessionStarted(data?: Record<string, unknown>) {
  if (bootSessionStarted || !isGameBootDiagnosticsEnabled() || !hasBrowserRuntime()) {
    return;
  }
  bootSessionStarted = true;
  recordGameBootDiagnostic('boot_start', {
    ...data,
    debugOverlay: isGameBootOverlayEnabled(),
    ...buildViewportSnapshot()
  });
  recordGameBootDiagnostic('session_started', {
    ...data,
    userAgent: window.navigator.userAgent,
    maxTouchPoints: window.navigator.maxTouchPoints ?? 0,
    debugOverlay: isGameBootOverlayEnabled(),
    ...buildViewportSnapshot()
  });
}

export function getRecentGameBootDiagnostics(limit = 12) {
  return readDiagnosticsCache().slice(-Math.max(1, limit)).map((entry) => ({ ...entry }));
}

export function installGameBootDiagnostics(options: InstallGameBootDiagnosticsOptions = {}) {
  if (diagnosticsInstalled || !isGameBootDiagnosticsEnabled()) {
    return;
  }
  diagnosticsInstalled = true;

  readDiagnosticsCache();
  ensureOverlay();
  if (options.autoStartSession !== false) {
    recordGameBootSessionStarted();
  }

  window.addEventListener('error', (event) => {
    const target = event.target instanceof HTMLElement
      ? {
          tag: event.target.tagName.toLowerCase(),
          id: event.target.id || null,
          className: event.target.className || null,
          src: event.target.getAttribute('src') ?? null,
          href: event.target.getAttribute('href') ?? null
        }
      : null;
    const hints = {
      filename: event.filename,
      line: event.lineno,
      column: event.colno,
      message: event.message,
      target
    };
    const externalNoise = classifyExternalBrowserNoise(event.error ?? event.message ?? event, hints);
    if (externalNoise) {
      recordGameBootWarning('external_browser_extension_error', {
        source: 'window_error',
        ...externalNoise
      });
      return;
    }
    if (looksLikeSentryTransportFailure(event.error ?? event.message ?? event, hints)) {
      recordGameBootWarning('sentry_transport_ignored', {
        source: 'window_error',
        ...hints
      });
      return;
    }

    const normalized = normalizeDiagnosticError(event.error ?? new Error(event.message || 'Window error'));
    recordGameBootDiagnosticError('window_error', normalized.exception, {
      ...hints,
      ...(normalized.details ?? {})
    });
    captureGameException(normalized.exception, {
      event: 'window_error',
      category: 'game_boot_global',
      data: {
        ...hints,
        ...(normalized.details ?? {}),
        ...buildViewportSnapshot()
      }
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    const externalNoise = classifyExternalBrowserNoise(event.reason);
    if (externalNoise) {
      recordGameBootWarning('external_browser_extension_error', {
        source: 'unhandled_rejection',
        ...externalNoise
      });
      event.preventDefault();
      return;
    }
    if (looksLikeSentryTransportFailure(event.reason)) {
      recordGameBootWarning('sentry_transport_ignored', {
        source: 'unhandled_rejection',
        reason: event.reason
      });
      event.preventDefault();
      return;
    }

    const normalized = normalizeDiagnosticError(event.reason);
    recordGameBootDiagnosticError('unhandled_rejection', normalized.exception, normalized.details);
    captureGameException(normalized.exception, {
      event: 'unhandled_rejection',
      category: 'game_boot_global',
      data: {
        ...(normalized.details ?? {}),
        ...buildViewportSnapshot()
      }
    });
  });

  if (!shouldInstallAutomaticViewportDiagnostics()) {
    return;
  }

  window.addEventListener(
    'resize',
    () => {
      if (resizeFrame !== null) {
        window.cancelAnimationFrame(resizeFrame);
      }
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = null;
        recordGameBootDiagnostic('window_resize', buildViewportSnapshot());
      });
    },
    { passive: true }
  );

  window.addEventListener(
    'orientationchange',
    () => {
      recordGameBootDiagnostic('orientation_change', buildViewportSnapshot());
    },
    { passive: true }
  );

  window.addEventListener('pagehide', () => {
    recordGameBootDiagnostic('page_hide', { visibility: document.visibilityState });
  });

  window.addEventListener('pageshow', () => {
    recordGameBootDiagnostic('page_show', { visibility: document.visibilityState });
  });

  document.addEventListener('visibilitychange', () => {
    recordGameBootDiagnostic('visibility_change', { visibility: document.visibilityState });
  });

  document.addEventListener('fullscreenchange', () => {
    recordGameBootDiagnostic('document_fullscreen_change', buildViewportSnapshot());
  });
  document.addEventListener('webkitfullscreenchange', () => {
    recordGameBootDiagnostic('document_webkit_fullscreen_change', buildViewportSnapshot());
  });

  const visualViewport = window.visualViewport;
  const scheduleVisualViewportLog = (eventName: string) => {
    if (visualViewportFrame !== null) {
      window.cancelAnimationFrame(visualViewportFrame);
    }
    visualViewportFrame = window.requestAnimationFrame(() => {
      visualViewportFrame = null;
      recordGameBootDiagnostic(eventName, buildViewportSnapshot());
    });
  };
  visualViewport?.addEventListener('resize', () => scheduleVisualViewportLog('visual_viewport_resize'));
  visualViewport?.addEventListener('scroll', () => scheduleVisualViewportLog('visual_viewport_scroll'));
}
