import { addGameBreadcrumb } from './sentry';

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
const GAME_BOOT_DIAGNOSTIC_MAX_ENTRIES = 180;
const GAME_BOOT_DIAGNOSTIC_DEDUPE_WINDOW_MS = 180;

let diagnosticsInstalled = false;
let diagnosticsCache: GameBootDiagnosticEntry[] | null = null;
let lastDiagnosticSignature = '';
let lastDiagnosticAt = 0;
let resizeFrame: number | null = null;
let visualViewportFrame: number | null = null;

declare global {
  interface Window {
    __portfolioGameBootDiagnostics?: GameBootDiagnosticEntry[];
  }
}

function hasBrowserRuntime() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function getDebugFlag() {
  if (!hasBrowserRuntime()) {
    return false;
  }
  try {
    return window.localStorage.getItem(GAME_BOOT_DIAGNOSTIC_DEBUG_FLAG_KEY) === '1';
  } catch {
    return false;
  }
}

export function isGameBootDiagnosticsEnabled() {
  if (!hasBrowserRuntime()) {
    return false;
  }
  if (getDebugFlag()) {
    return true;
  }
  return window.matchMedia?.('(pointer: coarse)').matches ?? false;
}

function sanitizeDiagnosticValue(value: unknown, depth = 0): GameBootDiagnosticValue {
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

  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: value.stack
        ? value.stack
            .split('\n')
            .slice(0, 5)
            .join('\n')
        : null
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
    return value.slice(0, 12).map((item) => sanitizeDiagnosticValue(item, depth + 1));
  }

  if (typeof value === 'object') {
    const source = value as Record<string, unknown>;
    const entries = Object.entries(source).slice(0, 14);
    return Object.fromEntries(
      entries.map(([key, nestedValue]) => [key, sanitizeDiagnosticValue(nestedValue, depth + 1)])
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

  addGameBreadcrumb(
    event,
    {
      diagnosticLevel: level,
      ...((sanitized && typeof sanitized === 'object' && !Array.isArray(sanitized)) ? sanitized : { payload: sanitized ?? null })
    },
    level === 'warn' ? 'warning' : level,
    'game.boot'
  );

  if (level === 'error' || getDebugFlag()) {
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
  appendDiagnostic('error', event, { ...data, error });
}

export function installGameBootDiagnostics() {
  if (diagnosticsInstalled || !isGameBootDiagnosticsEnabled()) {
    return;
  }
  diagnosticsInstalled = true;

  readDiagnosticsCache();
  recordGameBootDiagnostic('session_started', {
    userAgent: window.navigator.userAgent,
    maxTouchPoints: window.navigator.maxTouchPoints ?? 0,
    ...buildViewportSnapshot()
  });

  window.addEventListener('error', (event) => {
    recordGameBootDiagnosticError('window_error', event.error ?? new Error(event.message), {
      filename: event.filename,
      line: event.lineno,
      column: event.colno
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    recordGameBootDiagnosticError(
      'unhandled_rejection',
      event.reason instanceof Error ? event.reason : new Error(String(event.reason))
    );
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
