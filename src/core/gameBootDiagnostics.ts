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

interface BootDebugState {
  entries: GameBootDiagnosticEntry[];
  lines: string[];
  lastEntry: GameBootDiagnosticEntry | null;
}

interface ErudaLike {
  _container?: unknown;
  _devTools?: unknown;
  _inited?: boolean;
  _isInit?: boolean;
  error?: (...args: unknown[]) => void;
  get?: (name: string) => unknown;
  info?: (...args: unknown[]) => void;
  log?: (...args: unknown[]) => void;
  warn?: (...args: unknown[]) => void;
}

const GAME_BOOT_DIAGNOSTIC_STORAGE_KEY = 'portfolio-game-boot-diagnostics-v1';
const GAME_BOOT_DIAGNOSTIC_DEBUG_FLAG_KEY = 'portfolio-game-debug';
const GAME_BOOT_DIAGNOSTIC_MAX_ENTRIES = 180;
const GAME_BOOT_DIAGNOSTIC_DEDUPE_WINDOW_MS = 180;
const GAME_BOOT_PANEL_MAX_LINES = 14;
const GAME_BOOT_PANEL_ID = 'portfolio-game-boot-debug-panel';

let diagnosticsInstalled = false;
let diagnosticsCache: GameBootDiagnosticEntry[] | null = null;
let lastDiagnosticSignature = '';
let lastDiagnosticAt = 0;
let resizeFrame: number | null = null;
let visualViewportFrame: number | null = null;
let bootPanel: HTMLPreElement | null = null;
let bootPanelVisible = false;
let previousWindowOnError: OnErrorEventHandler | null = null;
let previousWindowOnUnhandledRejection: ((this: Window, event: PromiseRejectionEvent) => unknown) | null = null;

declare global {
  interface Window {
    __bootDebug?: BootDebugState;
    __portfolioGameBootDiagnostics?: GameBootDiagnosticEntry[];
    eruda?: ErudaLike;
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

function getEruda() {
  if (!hasBrowserRuntime()) {
    return null;
  }
  return window.eruda ?? null;
}

export function isErudaReady() {
  const eruda = getEruda();
  if (!eruda) {
    return false;
  }
  if (eruda._isInit || eruda._inited || eruda._devTools || eruda._container) {
    return true;
  }
  if (typeof eruda.get === 'function') {
    try {
      return Boolean(eruda.get('console'));
    } catch {
      return false;
    }
  }
  return false;
}

function emitToEruda(level: GameBootDiagnosticLevel, args: unknown[]) {
  if (!isErudaReady()) {
    return;
  }
  const eruda = getEruda();
  if (!eruda) {
    return;
  }
  const method =
    level === 'error'
      ? eruda.error ?? eruda.log
      : level === 'warn'
        ? eruda.warn ?? eruda.log
        : eruda.info ?? eruda.log;
  if (typeof method !== 'function') {
    return;
  }
  try {
    method.apply(eruda, args);
  } catch {
    // Eruda logging must never block boot diagnostics.
  }
}

function emitToConsole(level: GameBootDiagnosticLevel, args: unknown[]) {
  const method =
    level === 'error'
      ? console.error
      : level === 'warn'
        ? console.warn
        : console.info;
  method(...args);
}

function safeDebugWrite(level: GameBootDiagnosticLevel, message: string, data?: unknown) {
  const args = data === undefined ? [message] : [message, data];
  emitToConsole(level, args);
  emitToEruda(level, args);
}

export function safeDebugLog(message: string, data?: unknown) {
  safeDebugWrite('info', message, data);
}

export function safeDebugWarn(message: string, data?: unknown) {
  safeDebugWrite('warn', message, data);
}

export function safeDebugError(message: string, data?: unknown) {
  safeDebugWrite('error', message, data);
}

function describeEventTarget(target: unknown): Record<string, unknown> | null {
  if (!target) {
    return null;
  }
  if (target instanceof HTMLElement) {
    return {
      kind: 'element',
      tag: target.tagName.toLowerCase(),
      id: target.id || null,
      className: target.className || null
    };
  }
  if (target instanceof Window) {
    return {
      kind: 'window',
      location: target.location?.href ?? null
    };
  }
  if (target instanceof Document) {
    return {
      kind: 'document',
      visibility: target.visibilityState
    };
  }
  return {
    kind: typeof target,
    value: String(target)
  };
}

function serializeUnknownError(error: unknown, depth = 0): Record<string, unknown> {
  if (depth >= 2) {
    return { value: String(error) };
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack ?? null,
      cause: error.cause ? serializeUnknownError(error.cause, depth + 1) : null
    };
  }

  if (typeof DOMException !== 'undefined' && error instanceof DOMException) {
    return {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack ?? null
    };
  }

  if (typeof error === 'object' && error !== null) {
    const source = error as Record<string, unknown>;
    return {
      name: typeof source.name === 'string' ? source.name : null,
      message: typeof source.message === 'string' ? source.message : String(error),
      stack: typeof source.stack === 'string' ? source.stack : null,
      cause: source.cause ? serializeUnknownError(source.cause, depth + 1) : null,
      filename: typeof source.filename === 'string' ? source.filename : null,
      line: typeof source.line === 'number' ? source.line : typeof source.lineno === 'number' ? source.lineno : null,
      column: typeof source.column === 'number' ? source.column : typeof source.colno === 'number' ? source.colno : null,
      target: describeEventTarget(source.target)
    };
  }

  return {
    name: null,
    message: String(error),
    stack: null,
    cause: null
  };
}

function buildScriptErrorHints(details: { message?: string | null; filename?: string | null }) {
  if (details.message !== 'Script error.' && details.message !== 'Script error') {
    return undefined;
  }

  return [
    'script_or_chunk_unreachable',
    'cross_origin_script_error_redacted',
    'dynamic_import_chunk_failed',
    'theme_or_language_asset_missing',
    'early_mobile_listener_exception',
    'preload_asset_failure',
    'unsupported_mobile_api_access'
  ];
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

  if (typeof value === 'object' && value !== null && 'name' in value && 'message' in value) {
    return sanitizeDiagnosticValue(serializeUnknownError(value), depth + 1);
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

function ensureBootDebugState() {
  if (!hasBrowserRuntime()) {
    return;
  }
  const entries = readDiagnosticsCache();
  const lines = entries.slice(-GAME_BOOT_PANEL_MAX_LINES).map((entry) => {
    const timestamp = entry.iso.slice(11, 19);
    const payload = entry.data === undefined ? '' : ` ${JSON.stringify(entry.data)}`;
    return `${timestamp} ${entry.event}${payload}`;
  });
  window.__bootDebug = {
    entries,
    lines,
    lastEntry: entries.length > 0 ? entries[entries.length - 1] : null
  };
}

function ensureBootPanel() {
  if (!hasBrowserRuntime() || !isGameBootDiagnosticsEnabled()) {
    return null;
  }
  if (bootPanel) {
    return bootPanel;
  }
  const existing = document.getElementById(GAME_BOOT_PANEL_ID);
  if (existing instanceof HTMLPreElement) {
    bootPanel = existing;
    return bootPanel;
  }

  bootPanel = document.createElement('pre');
  bootPanel.id = GAME_BOOT_PANEL_ID;
  bootPanel.setAttribute('aria-live', 'polite');
  bootPanel.style.position = 'fixed';
  bootPanel.style.left = '10px';
  bootPanel.style.right = '10px';
  bootPanel.style.bottom = '10px';
  bootPanel.style.maxHeight = '32vh';
  bootPanel.style.margin = '0';
  bootPanel.style.padding = '10px 12px';
  bootPanel.style.overflow = 'auto';
  bootPanel.style.whiteSpace = 'pre-wrap';
  bootPanel.style.font = '11px/1.35 monospace';
  bootPanel.style.background = 'rgb(9 12 16 / 0.86)';
  bootPanel.style.color = '#f2ddb8';
  bootPanel.style.border = '1px solid rgb(255 255 255 / 0.14)';
  bootPanel.style.borderRadius = '10px';
  bootPanel.style.zIndex = '99999';
  bootPanel.style.pointerEvents = 'none';
  bootPanel.style.boxShadow = '0 8px 28px rgb(0 0 0 / 0.32)';
  bootPanel.style.display = 'none';
  document.body.appendChild(bootPanel);
  return bootPanel;
}

function syncBootPanel(forceVisible = false) {
  if (!hasBrowserRuntime()) {
    return;
  }
  ensureBootDebugState();
  const panel = ensureBootPanel();
  if (!panel || !window.__bootDebug) {
    return;
  }
  const lines = window.__bootDebug.lines;
  const shouldShow = forceVisible || bootPanelVisible || getDebugFlag();
  panel.textContent = lines.join('\n');
  panel.style.display = shouldShow && lines.length > 0 ? 'block' : 'none';
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
  if (level === 'error') {
    bootPanelVisible = true;
  }
  ensureBootDebugState();
  syncBootPanel(level === 'error');

  if (level === 'error' || level === 'warn' || getDebugFlag()) {
    safeDebugWrite(level, `[GameBoot] ${event}`, sanitized);
  }
}

export function recordGameBootDiagnostic(event: string, data?: Record<string, unknown>) {
  appendDiagnostic('info', event, data);
}

export function recordGameBootWarning(event: string, data?: Record<string, unknown>) {
  appendDiagnostic('warn', event, data);
}

export function recordGameBootDiagnosticError(event: string, error: unknown, data?: Record<string, unknown>) {
  appendDiagnostic('error', event, { ...data, error: serializeUnknownError(error) });
}

export function recordGameBootStepStart(name: string, data?: Record<string, unknown>) {
  recordGameBootDiagnostic(`BOOT_STEP_START:${name}`, data);
}

export function recordGameBootStepOk(name: string, data?: Record<string, unknown>) {
  recordGameBootDiagnostic(`BOOT_STEP_OK:${name}`, data);
}

export function recordGameBootStepFail(name: string, error: unknown, data?: Record<string, unknown>) {
  recordGameBootDiagnosticError(`BOOT_STEP_FAIL:${name}`, error, data);
}

export async function runGameBootStep<T>(name: string, run: () => Promise<T> | T, data?: Record<string, unknown>) {
  recordGameBootStepStart(name, data);
  try {
    const result = await run();
    recordGameBootStepOk(name, data);
    return result;
  } catch (error) {
    recordGameBootStepFail(name, error, data);
    throw error;
  }
}

export function installGameBootDiagnostics() {
  if (diagnosticsInstalled || !isGameBootDiagnosticsEnabled()) {
    return;
  }
  diagnosticsInstalled = true;

  readDiagnosticsCache();
  ensureBootDebugState();
  ensureBootPanel();
  syncBootPanel();
  recordGameBootDiagnostic('session_started', {
    userAgent: window.navigator.userAgent,
    maxTouchPoints: window.navigator.maxTouchPoints ?? 0,
    ...buildViewportSnapshot()
  });

  window.addEventListener('error', (event) => {
    recordGameBootDiagnosticError('window_error', event.error ?? new Error(event.message), {
      message: event.message,
      filename: event.filename || null,
      line: event.lineno || 0,
      column: event.colno || 0,
      target: describeEventTarget(event.target),
      probableCauses: buildScriptErrorHints({
        message: event.message,
        filename: event.filename
      })
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    recordGameBootDiagnosticError(
      'unhandled_rejection',
      event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
      {
        reason:
          event.reason instanceof Error
            ? serializeUnknownError(event.reason)
            : { message: String(event.reason) }
      }
    );
  });

  previousWindowOnError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    recordGameBootDiagnosticError('window_onerror', error ?? new Error(String(message)), {
      message: String(message),
      filename: source ?? null,
      line: lineno ?? 0,
      column: colno ?? 0,
      probableCauses: buildScriptErrorHints({
        message: typeof message === 'string' ? message : null,
        filename: typeof source === 'string' ? source : null
      })
    });
    if (typeof previousWindowOnError === 'function') {
      try {
        return previousWindowOnError.call(window, message, source, lineno, colno, error);
      } catch (handlerError) {
        recordGameBootDiagnosticError('window_onerror_handler_failed', handlerError);
      }
    }
    return false;
  };

  previousWindowOnUnhandledRejection = window.onunhandledrejection;
  window.onunhandledrejection = (event) => {
    recordGameBootDiagnosticError(
      'window_onunhandledrejection',
      event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
      {
        reason:
          event.reason instanceof Error
            ? serializeUnknownError(event.reason)
            : { message: String(event.reason) }
      }
    );
    if (typeof previousWindowOnUnhandledRejection === 'function') {
      try {
        return previousWindowOnUnhandledRejection.call(window, event);
      } catch (handlerError) {
        recordGameBootDiagnosticError('window_onunhandledrejection_handler_failed', handlerError);
      }
    }
    return false;
  };

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
