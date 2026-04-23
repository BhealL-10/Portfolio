import * as Sentry from '@sentry/browser';
import { getRuntimeDeviceState } from './device';

declare const __APP_VERSION__: string;

type SentryPrimitive = string | number | boolean | null;
type SentryValue = SentryPrimitive | SentryValue[] | { [key: string]: SentryValue };
type BreadcrumbLevel = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';

const FRONTEND_SENTRY_DSN =
  'https://a84c9e864592bea05dac3d84504e1d8f@o4511266261237760.ingest.de.sentry.io/4511266316222544';
const FRONTEND_SENTRY_TEST_QUERY_KEY = 'sentry_test';
const FRONTEND_SENTRY_TEST_VALUES = new Set(['frontend', 'front', 'both']);

let frontendSentryInitialized = false;

function sanitizeValue(value: unknown, depth = 0): SentryValue {
  if (
    value === null ||
    value === undefined ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return value ?? null;
  }

  if (depth >= 4) {
    return String(value);
  }

  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: value.stack
        ? value.stack
            .split('\n')
            .slice(0, 8)
            .join('\n')
        : null
    };
  }

  if (value instanceof URL) {
    return value.toString();
  }

  if (Array.isArray(value)) {
    return value.slice(0, 20).map((entry) => sanitizeValue(entry, depth + 1));
  }

  if (typeof value === 'object') {
    const source = value as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(source)
        .slice(0, 20)
        .map(([key, nestedValue]) => [key, sanitizeValue(nestedValue, depth + 1)])
    );
  }

  return String(value);
}

function sanitizeRecord(data?: Record<string, unknown>) {
  if (!data) {
    return undefined;
  }
  return sanitizeValue(data) as Record<string, SentryValue>;
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
  if (!frontendSentryInitialized || typeof window === 'undefined') {
    return;
  }
  const deviceContext = getRuntimeDeviceContext();
  Sentry.setTag('runtime.platform', 'frontend');
  Sentry.setTag('runtime.device', deviceContext.isMobile ? 'mobile' : 'desktop');
  Sentry.setTag('runtime.orientation', deviceContext.isLandscape ? 'landscape' : 'portrait');
  Sentry.setContext('runtime_device', deviceContext);
}

function maybeTriggerFrontendSentryTest() {
  const url = new URL(window.location.href);
  const testMode = url.searchParams.get(FRONTEND_SENTRY_TEST_QUERY_KEY)?.trim().toLowerCase();
  if (!testMode || !FRONTEND_SENTRY_TEST_VALUES.has(testMode)) {
    return;
  }

  Sentry.withScope((scope) => {
    scope.setLevel('info');
    scope.setTag('sentry.test', 'frontend');
    scope.setContext('sentry_test', {
      target: 'frontend',
      href: window.location.href
    });
    Sentry.captureException(new Error('Manual frontend Sentry smoke test'));
  });

  url.searchParams.delete(FRONTEND_SENTRY_TEST_QUERY_KEY);
  window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`);
}

export function initFrontendSentry() {
  if (frontendSentryInitialized || typeof window === 'undefined') {
    return;
  }

  frontendSentryInitialized = true;

  Sentry.init({
    dsn: FRONTEND_SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false
      })
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    tracePropagationTargets: getTracePropagationTargets(),
    sendDefaultPii: true,
    environment: getFrontendEnvironment(),
    release: getFrontendRelease()
  });

  syncRuntimeDeviceContext();
  window.addEventListener('resize', syncRuntimeDeviceContext, { passive: true });
  window.visualViewport?.addEventListener('resize', syncRuntimeDeviceContext, { passive: true });
  window.visualViewport?.addEventListener('scroll', syncRuntimeDeviceContext, { passive: true });
  document.addEventListener('visibilitychange', syncRuntimeDeviceContext);

  maybeTriggerFrontendSentryTest();
}

export function addGameBreadcrumb(
  message: string,
  data?: Record<string, unknown>,
  level: BreadcrumbLevel = 'info',
  category = 'game'
) {
  if (!frontendSentryInitialized) {
    return;
  }

  Sentry.addBreadcrumb({
    category,
    level,
    message,
    data: sanitizeRecord(data)
  });
}

export function setSentryContext(name: string, data: Record<string, unknown>) {
  if (!frontendSentryInitialized) {
    return;
  }
  const context = sanitizeRecord(data);
  if (!context) {
    return;
  }
  Sentry.setContext(name, context);
}

export function captureGameException(
  error: unknown,
  options: {
    event: string;
    category?: string;
    data?: Record<string, unknown>;
  }
) {
  if (!frontendSentryInitialized) {
    return;
  }

  const exception = error instanceof Error ? error : new Error(String(error));
  const category = options.category ?? 'game';
  const data = sanitizeRecord(options.data);

  Sentry.withScope((scope) => {
    scope.setLevel('error');
    scope.setTag('runtime.platform', 'frontend');
    scope.setTag('game.event', options.event);
    scope.setContext('runtime_device', getRuntimeDeviceContext());
    if (data) {
      scope.setContext(category, data);
    }
    Sentry.captureException(exception);
  });
}
