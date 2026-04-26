import * as Sentry from '@sentry/browser';
import type { Breadcrumb, BrowserOptions, Event } from '@sentry/browser';
import { getRuntimeDeviceState } from './device';
import {
  isDataUriString,
  sanitizeLogRecord,
  sanitizeLogString,
  summarizeDataUri
} from './logSanitizer';
import { observeRuntimeViewport } from './viewport';

declare const __APP_VERSION__: string;

type SentryPrimitive = string | number | boolean | null;
type SentryValue = SentryPrimitive | SentryValue[] | { [key: string]: SentryValue };
type BreadcrumbLevel = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';

const FRONTEND_SENTRY_DSN =
  'https://a84c9e864592bea05dac3d84504e1d8f@o4511266261237760.ingest.de.sentry.io/4511266316222544';
const FRONTEND_SENTRY_TEST_QUERY_KEY = 'sentry_test';
const FRONTEND_SENTRY_TEST_VALUES = new Set(['frontend', 'front', 'both']);

let frontendSentryInitialized = false;
let frontendSentryAvailable = false;
let frontendSentryRuntimeFailureLogged = false;
let runtimeDeviceContextFrame: number | null = null;
let lastRuntimeDeviceContextSignature = '';
let lastRuntimeDeviceContextSyncedAt = 0;

function isFrontendSentryDebugLoggingEnabled() {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    const url = new URL(window.location.href);
    const queryDebug = url.searchParams.get('debugBoot');
    return (
      queryDebug === '1' ||
      queryDebug === 'true' ||
      window.localStorage.getItem('debugBoot') === '1' ||
      window.localStorage.getItem('portfolio-game-debug') === '1'
    );
  } catch {
    return false;
  }
}

function isLikelyMobileTelemetryRuntime() {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    return getRuntimeDeviceState().isMobile;
  } catch {
    return (
      window.matchMedia?.('(pointer: coarse)').matches ||
      (window.navigator.maxTouchPoints ?? 0) > 1 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(window.navigator.userAgent)
    );
  }
}

function reportSentryRuntimeFailure(phase: string, error: unknown) {
  if (frontendSentryRuntimeFailureLogged) {
    return;
  }
  frontendSentryRuntimeFailureLogged = true;
  const message = `[Sentry] Frontend telemetry unavailable during ${phase}; gameplay continues without blocking.`;
  if (isFrontendSentryDebugLoggingEnabled()) {
    console.warn(message, error);
    return;
  }
  console.info(message);
}

function runSentrySafely<T>(phase: string, operation: () => T) {
  if (!frontendSentryAvailable) {
    return undefined;
  }
  try {
    return operation();
  } catch (error) {
    reportSentryRuntimeFailure(phase, error);
    return undefined;
  }
}

function getSentrySanitizeOptions() {
  const mobile = isLikelyMobileTelemetryRuntime();
  return {
    maxDepth: 4,
    maxStringLength: mobile ? 220 : 360,
    maxArrayLength: mobile ? 8 : 14,
    maxObjectEntries: mobile ? 10 : 16
  };
}

function sanitizeRecord(data?: Record<string, unknown>) {
  if (!data) {
    return undefined;
  }
  return sanitizeLogRecord(data, getSentrySanitizeOptions()) as Record<string, SentryValue>;
}

function getFrontendEnvironment() {
  return import.meta.env.VITE_SENTRY_ENVIRONMENT?.trim() || import.meta.env.MODE || 'development';
}

function getFrontendRelease() {
  return import.meta.env.VITE_SENTRY_RELEASE?.trim() || `ape-prod-portfolio@${__APP_VERSION__}`;
}

function getTracePropagationTargets() {
  const targets: Array<string | RegExp> = [
    /^\/api\//,
    /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?\/api\//
  ];
  const explicitApiUrl = import.meta.env.VITE_LEADERBOARD_API_URL?.trim();
  if (explicitApiUrl) {
    targets.push(explicitApiUrl);
  }
  if (typeof window !== 'undefined') {
    targets.push(`${window.location.origin}/api`);
  }
  return targets;
}

function getRuntimeDeviceContext() {
  const deviceState = getRuntimeDeviceState();
  return {
    ...deviceState,
    userAgent: window.navigator.userAgent,
    language: window.navigator.language,
    maxTouchPoints: window.navigator.maxTouchPoints ?? 0,
    devicePixelRatio: Number((window.devicePixelRatio || 1).toFixed(2)),
    innerWidth: Math.max(0, Math.round(window.innerWidth || 0)),
    innerHeight: Math.max(0, Math.round(window.innerHeight || 0)),
    visualViewport: window.visualViewport
      ? {
          width: Math.max(0, Math.round(window.visualViewport.width)),
          height: Math.max(0, Math.round(window.visualViewport.height)),
          offsetTop: Math.max(0, Math.round(window.visualViewport.offsetTop)),
          offsetLeft: Math.max(0, Math.round(window.visualViewport.offsetLeft)),
          scale: Number(window.visualViewport.scale.toFixed(3))
        }
      : null
  };
}

function syncRuntimeDeviceContext() {
  if (!frontendSentryAvailable || typeof window === 'undefined') {
    return;
  }
  const deviceContext = getRuntimeDeviceContext();
  const signature = JSON.stringify(deviceContext);
  const now = Date.now();
  if (signature === lastRuntimeDeviceContextSignature) {
    return;
  }
  if (deviceContext.isMobile && lastRuntimeDeviceContextSyncedAt > 0 && now - lastRuntimeDeviceContextSyncedAt < 750) {
    return;
  }
  lastRuntimeDeviceContextSignature = signature;
  lastRuntimeDeviceContextSyncedAt = now;
  runSentrySafely('device context sync', () => {
    Sentry.setTag('runtime.platform', 'frontend');
    Sentry.setTag('runtime.device', deviceContext.isMobile ? 'mobile' : 'desktop');
    Sentry.setTag('runtime.orientation', deviceContext.isLandscape ? 'landscape' : 'portrait');
    Sentry.setContext('runtime_device', deviceContext);
  });
}

function scheduleRuntimeDeviceContextSync() {
  if (!frontendSentryAvailable || typeof window === 'undefined') {
    return;
  }
  if (runtimeDeviceContextFrame !== null) {
    return;
  }
  runtimeDeviceContextFrame = window.requestAnimationFrame(() => {
    runtimeDeviceContextFrame = null;
    syncRuntimeDeviceContext();
  });
}

function maybeTriggerFrontendSentryTest() {
  const url = new URL(window.location.href);
  const testMode = url.searchParams.get(FRONTEND_SENTRY_TEST_QUERY_KEY)?.trim().toLowerCase();
  if (!testMode || !FRONTEND_SENTRY_TEST_VALUES.has(testMode)) {
    return;
  }

  runSentrySafely('manual smoke test', () => Sentry.withScope((scope) => {
    scope.setLevel('info');
    scope.setTag('sentry.test', 'frontend');
    scope.setContext('sentry_test', {
      target: 'frontend',
      href: window.location.href
    });
    Sentry.captureException(new Error('Manual frontend Sentry smoke test'));
  }));

  url.searchParams.delete(FRONTEND_SENTRY_TEST_QUERY_KEY);
  window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`);
}

function getBreadcrumbUrl(breadcrumb: Breadcrumb) {
  const data = breadcrumb.data as Record<string, unknown> | undefined;
  const candidate = data?.url ?? data?.href ?? data?.input;
  return typeof candidate === 'string' ? candidate : null;
}

function isFailedRequestBreadcrumb(breadcrumb: Breadcrumb) {
  const data = breadcrumb.data as Record<string, unknown> | undefined;
  const status = Number(data?.status_code ?? data?.status ?? 0);
  return Number.isFinite(status) && status >= 400;
}

function sanitizeBreadcrumbMessage(message: string | undefined) {
  if (!message) {
    return message;
  }
  const sanitized = sanitizeLogString(message, { maxStringLength: 180 });
  return typeof sanitized === 'string' ? sanitized : '[data-uri]';
}

function sanitizeSentryBreadcrumb(breadcrumb: Breadcrumb): Breadcrumb | null {
  const category = breadcrumb.category ?? '';
  const requestCategory = category === 'fetch' || category === 'xhr';
  const url = requestCategory ? getBreadcrumbUrl(breadcrumb) : null;

  if (url && isDataUriString(url)) {
    return isFailedRequestBreadcrumb(breadcrumb)
      ? {
          ...breadcrumb,
          message: 'data-uri request failed',
          data: {
            url: summarizeDataUri(url)
          }
        }
      : null;
  }

  if (requestCategory && isLikelyMobileTelemetryRuntime() && !isFailedRequestBreadcrumb(breadcrumb)) {
    return null;
  }

  return {
    ...breadcrumb,
    message: sanitizeBreadcrumbMessage(breadcrumb.message),
    data: sanitizeRecord((breadcrumb.data as Record<string, unknown> | undefined) ?? undefined)
  };
}

function sanitizeSentryEvent(event: Event): Event {
  const sanitizedBreadcrumbs = event.breadcrumbs
    ?.map((breadcrumb) => sanitizeSentryBreadcrumb(breadcrumb))
    .filter((breadcrumb): breadcrumb is Breadcrumb => Boolean(breadcrumb))
    .slice(isLikelyMobileTelemetryRuntime() ? -24 : -50);

  return {
    ...event,
    message: sanitizeBreadcrumbMessage(event.message),
    breadcrumbs: sanitizedBreadcrumbs,
    extra: event.extra ? (sanitizeRecord(event.extra as Record<string, unknown>) as Event['extra']) : event.extra,
    contexts: event.contexts ? (sanitizeRecord(event.contexts as Record<string, unknown>) as Event['contexts']) : event.contexts
  };
}

function sanitizeExceptionForSentry(error: unknown): Error {
  const exception = error instanceof Error ? error : new Error(String(error));
  const sanitizedMessage = sanitizeLogString(exception.message, { maxStringLength: 220 });
  if (typeof sanitizedMessage !== 'string' || sanitizedMessage === exception.message) {
    return exception;
  }

  const sanitized = new Error(sanitizedMessage);
  sanitized.name = exception.name;
  if (typeof exception.stack === 'string') {
    const sanitizedStack = sanitizeLogString(exception.stack, { maxStringLength: 1200 });
    sanitized.stack = typeof sanitizedStack === 'string' ? sanitizedStack : undefined;
  } else {
    sanitized.stack = exception.stack;
  }
  return sanitized;
}

export function initFrontendSentry() {
  if (frontendSentryInitialized || typeof window === 'undefined') {
    return;
  }

  frontendSentryInitialized = true;

  try {
    const mobileTelemetryProfile = isLikelyMobileTelemetryRuntime();
    const integrations: NonNullable<BrowserOptions['integrations']> = [
      Sentry.browserTracingIntegration({
        traceFetch: !mobileTelemetryProfile,
        traceXHR: !mobileTelemetryProfile,
        enableLongTask: !mobileTelemetryProfile,
        enableLongAnimationFrame: false,
        shouldCreateSpanForRequest: (url) => !isDataUriString(url)
      })
    ];
    if (!mobileTelemetryProfile) {
      integrations.push(
        Sentry.replayIntegration({
          maskAllText: false,
          blockAllMedia: false
        })
      );
    }

    Sentry.init({
      dsn: FRONTEND_SENTRY_DSN,
      integrations,
      tracesSampleRate: mobileTelemetryProfile ? 0.15 : 1.0,
      replaysSessionSampleRate: mobileTelemetryProfile ? 0 : 0.1,
      replaysOnErrorSampleRate: mobileTelemetryProfile ? 0 : 1.0,
      tracePropagationTargets: getTracePropagationTargets(),
      sendDefaultPii: true,
      environment: getFrontendEnvironment(),
      release: getFrontendRelease(),
      beforeBreadcrumb: (breadcrumb) => sanitizeSentryBreadcrumb(breadcrumb),
      beforeSend: (event) => sanitizeSentryEvent(event) as typeof event
    });
    frontendSentryAvailable = true;
  } catch (error) {
    frontendSentryAvailable = false;
    reportSentryRuntimeFailure('initialization', error);
    return;
  }

  syncRuntimeDeviceContext();
  observeRuntimeViewport(scheduleRuntimeDeviceContextSync);

  maybeTriggerFrontendSentryTest();
}

export function addGameBreadcrumb(
  message: string,
  data?: Record<string, unknown>,
  level: BreadcrumbLevel = 'info',
  category = 'game'
) {
  if (!frontendSentryAvailable) {
    return;
  }

  runSentrySafely('breadcrumb capture', () => Sentry.addBreadcrumb({
    category,
    level,
    message,
    data: sanitizeRecord(data)
  }));
}

export function setSentryContext(name: string, data: Record<string, unknown>) {
  if (!frontendSentryAvailable) {
    return;
  }
  const context = sanitizeRecord(data);
  if (!context) {
    return;
  }
  runSentrySafely('context capture', () => Sentry.setContext(name, context));
}

export function captureGameException(
  error: unknown,
  options: {
    event: string;
    category?: string;
    data?: Record<string, unknown>;
  }
) {
  if (!frontendSentryAvailable) {
    return;
  }

  const exception = sanitizeExceptionForSentry(error);
  const category = options.category ?? 'game';
  const data = sanitizeRecord(options.data);

  runSentrySafely('exception capture', () => Sentry.withScope((scope) => {
    scope.setLevel('error');
    scope.setTag('runtime.platform', 'frontend');
    scope.setTag('game.event', options.event);
    scope.setContext('runtime_device', getRuntimeDeviceContext());
    if (data) {
      scope.setContext(category, data);
    }
    Sentry.captureException(exception);
  }));
}
