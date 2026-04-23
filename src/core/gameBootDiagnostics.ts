import { addGameBreadcrumb, captureGameException } from './sentry';

type GameBootDiagnosticLevel = 'info' | 'warn' | 'error';

type GameBootDiagnosticValue =
  | string
  | number
  | boolean
  | null
  | GameBootDiagnosticValue[]
  | { [key: string]: GameBootDiagnosticValue };

interface GameBootDiagnosticEntry {
  at: number;
  iso: string;
  level: GameBootDiagnosticLevel;
  event: string;
  data?: GameBootDiagnosticValue;
}

const GAME_BOOT_DIAGNOSTIC_STORAGE_KEY = 'portfolio-game-boot-diagnostics-v1';
const GAME_BOOT_DIAGNOSTIC_DEBUG_FLAG_KEY = 'portfolio-game-debug';
const GAME_BOOT_DIAGNOSTIC_DEBUG_BOOT_FLAG_KEY = 'debugBoot';
const GAME_BOOT_DIAGNOSTIC_DEBUG_QUERY_KEY = 'debugBoot';
const GAME_BOOT_DIAGNOSTIC_MAX_ENTRIES = 180;
const GAME_BOOT_DIAGNOSTIC_DEDUPE_WINDOW_MS = 180;
const GAME_BOOT_DIAGNOSTIC_OVERLAY_MAX_ENTRIES = 48;
const SENTRY_TRANSPORT_PATTERN =
  /(?:o\d+\.ingest\.[\w.-]*sentry\.io|ingest\.[\w.-]*sentry\.io|sentry\.io\/api|@sentry\/browser|@sentry\/core)/i;
const NETWORK_BLOCKED_PATTERN =
  /(?:ERR_BLOCKED_BY_CLIENT|Load failed|Failed to fetch|NetworkError|network request failed|fetch failed|blocked by client|content blocker)/i;

let diagnosticsInstalled = false;
let diagnosticsCache: GameBootDiagnosticEntry[] | null = null;
let lastDiagnosticSignature = '';
let lastDiagnosticAt = 0;
let resizeFrame: number | null = null;
let visualViewportFrame: number | null = null;
let overlayElement: HTMLDivElement | null = null;
let overlayContentElement: HTMLPreElement | null = null;
let overlayRenderFrame: number | null = null;

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

export function isGameBootDiagnosticsEnabled() {
  if (!hasBrowserRuntime()) {
    return false;
  }
  if (isExplicitDebugModeEnabled()) {
    return true;
  }
  return window.matchMedia?.('(pointer: coarse)').matches ?? false;
}

function isGameBootOverlayEnabled() {
  return hasBrowserRuntime() && isExplicitDebugModeEnabled();
}

function sanitizeDiagnosticValue(value: unknown, depth = 0, seen = new WeakSet<object>()): GameBootDiagnosticValue {
  if (
    value === null ||
    value === undefined ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return value ?? null;
  }

  if (depth >= 3) {
    return String(value);
  }

  if (typeof value === 'object') {
    if (seen.has(value)) {
      return '[Circular]';
    }
    seen.add(value);
  }

  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: value.stack
        ? value.stack
            .split('\n')
            .slice(0, 5)
            .join('\n')
        : null,
      cause: value.cause ? sanitizeDiagnosticValue(value.cause, depth + 1, seen) : null
    };
  }

  if (value instanceof HTMLElement) {
    return {
      tag: value.tagName.toLowerCase(),
      id: value.id || null,
      className: value.className || null
    };
  }

  if (Array.isArray(value)) {
    return value.slice(0, 12).map((item) => sanitizeDiagnosticValue(item, depth + 1, seen));
  }

  if (typeof value === 'object') {
    const source = value as Record<string, unknown>;
    const entries = Object.entries(source).slice(0, 14);
    return Object.fromEntries(
      entries.map(([key, nestedValue]) => [key, sanitizeDiagnosticValue(nestedValue, depth + 1, seen)])
    );
  }

  return String(value);
}

function sanitizeDiagnosticData(data?: Record<string, unknown>) {
  if (!data) {
    return undefined;
  }
  return sanitizeDiagnosticValue(data);
}

function collectDiagnosticStrings(value: unknown, strings: string[], depth = 0, seen = new WeakSet<object>()) {
  if (value === null || value === undefined || depth >= 4) {
    return;
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    strings.push(String(value));
    return;
  }
  if (value instanceof Error) {
    strings.push(value.name, value.message);
    if (value.stack) {
      strings.push(value.stack);
    }
    collectDiagnosticStrings(value.cause, strings, depth + 1, seen);
    return;
  }
  if (typeof value !== 'object') {
    strings.push(String(value));
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
      strings.push(source);
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
          nonErrorPayload: sanitizeDiagnosticValue(error)
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
        nonErrorPayload: sanitizeDiagnosticValue(error)
      }
    };
  }

  return {
    exception: new Error(String(error)),
    details: {
      nonErrorPayload: sanitizeDiagnosticValue(error)
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
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      diagnosticsCache = parsed.slice(-GAME_BOOT_DIAGNOSTIC_MAX_ENTRIES);
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
    window.localStorage.setItem(GAME_BOOT_DIAGNOSTIC_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Best-effort persistence only.
  }
}

function formatOverlayEntry(entry: GameBootDiagnosticEntry) {
  const timestamp = entry.iso.slice(11, 23);
  const payload = entry.data === undefined ? '' : ` ${JSON.stringify(entry.data)}`;
  const line = `[${timestamp}] ${entry.level.toUpperCase()} ${entry.event}${payload}`;
  return line.length > 1400 ? `${line.slice(0, 1400)}...` : line;
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
    .slice(-GAME_BOOT_DIAGNOSTIC_OVERLAY_MAX_ENTRIES)
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
  if (entries.length > GAME_BOOT_DIAGNOSTIC_MAX_ENTRIES) {
    entries.splice(0, entries.length - GAME_BOOT_DIAGNOSTIC_MAX_ENTRIES);
  }
  persistDiagnosticsCache();
  queueOverlayRender();

  addGameBreadcrumb(
    event,
    {
      diagnosticLevel: level,
      ...((sanitized && typeof sanitized === 'object' && !Array.isArray(sanitized)) ? sanitized : { payload: sanitized ?? null })
    },
    level === 'warn' ? 'warning' : level,
    'game.boot'
  );

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

export function installGameBootDiagnostics() {
  if (diagnosticsInstalled || !isGameBootDiagnosticsEnabled()) {
    return;
  }
  diagnosticsInstalled = true;

  readDiagnosticsCache();
  ensureOverlay();
  recordGameBootDiagnostic('session_started', {
    userAgent: window.navigator.userAgent,
    maxTouchPoints: window.navigator.maxTouchPoints ?? 0,
    debugOverlay: isGameBootOverlayEnabled(),
    ...buildViewportSnapshot()
  });

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
