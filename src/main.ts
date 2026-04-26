import { resolveAppEntryRoute } from './core/AppEntryRoute';
import { AppController } from './core/AppController';
import {
  installGameBootDiagnostics,
  recordGameBootDiagnostic,
  recordGameBootDiagnosticError,
  recordGameBootSessionStarted
} from './core/gameBootDiagnostics';
import { initFrontendSentry } from './core/sentry';
import './styles/reset.css';
import './styles/index.css';

const app = document.getElementById('app');

if (!app) {
  throw new Error('App root not found');
}
const appRoot = app;

type BootTrigger = 'initial' | 'visibilitychange' | 'pageshow';
type PrerenderDocument = Document & { prerendering?: boolean };

installGameBootDiagnostics({ autoStartSession: false });

const entryRoute = resolveAppEntryRoute();
let bootStarted = false;
let bootInProgress = false;
let bootCompleted = false;
let bootDeferredForVisibility = false;
let pageHideActive = false;
let appController: AppController | null = null;

function isDocumentPrerendering() {
  return (document as PrerenderDocument).prerendering === true;
}

function isBootVisibilityReady() {
  return document.visibilityState === 'visible' && !isDocumentPrerendering();
}

function shouldDeferTelemetryBoot() {
  return (
    window.matchMedia?.('(pointer: coarse)').matches ||
    (window.navigator.maxTouchPoints ?? 0) > 1 ||
    Math.min(window.innerWidth || 0, window.innerHeight || 0) <= 900
  );
}

function getBootStateSnapshot(trigger: BootTrigger, pageShowPersisted = false) {
  return {
    trigger,
    entryRoute,
    visibility: document.visibilityState,
    prerendering: isDocumentPrerendering(),
    pageHideActive,
    pageShowPersisted,
    bootStarted,
    bootInProgress,
    bootCompleted
  };
}

function startBoot(trigger: BootTrigger, pageShowPersisted = false) {
  if (bootStarted || bootInProgress || bootCompleted) {
    return appController;
  }

  if (pageHideActive) {
    recordGameBootDiagnostic('boot_deferred_pagehide_active', getBootStateSnapshot(trigger, pageShowPersisted));
    return appController;
  }

  if (!isBootVisibilityReady()) {
    if (!bootDeferredForVisibility) {
      recordGameBootDiagnostic('boot_deferred_visibility_hidden', getBootStateSnapshot(trigger, pageShowPersisted));
    }
    bootDeferredForVisibility = true;
    return appController;
  }

  if (bootDeferredForVisibility) {
    recordGameBootDiagnostic('boot_resumed_visibility_visible', getBootStateSnapshot(trigger, pageShowPersisted));
  }

  bootStarted = true;
  bootInProgress = true;

  recordGameBootDiagnostic('boot_started_visible', {
    ...getBootStateSnapshot(trigger, pageShowPersisted),
    resumedFromHidden: bootDeferredForVisibility
  });
  recordGameBootSessionStarted({
    trigger,
    entryRoute,
    resumedFromHidden: bootDeferredForVisibility,
    pageShowPersisted
  });

  try {
    initFrontendSentry({
      deferUntilIdle: shouldDeferTelemetryBoot()
    });
    appController = new AppController(appRoot, { entryRoute });
    bootCompleted = true;
    recordGameBootDiagnostic('boot_app_controller_ready', getBootStateSnapshot(trigger, pageShowPersisted));
    return appController;
  } catch (error) {
    recordGameBootDiagnosticError('boot_app_controller_failed', error, getBootStateSnapshot(trigger, pageShowPersisted));
    throw error;
  } finally {
    bootInProgress = false;
    bootDeferredForVisibility = false;
  }
}

window.addEventListener(
  'pagehide',
  (event) => {
    pageHideActive = true;
    if (!bootStarted) {
      recordGameBootDiagnostic('boot_pagehide_before_start', {
        persisted: event.persisted,
        visibility: document.visibilityState
      });
    }
  },
  { passive: true }
);

window.addEventListener(
  'pageshow',
  (event) => {
    pageHideActive = false;
    if (bootCompleted) {
      if (event.persisted) {
        recordGameBootDiagnostic('boot_pageshow_restored', {
          persisted: true,
          visibility: document.visibilityState,
          bootCompleted: true
        });
      }
      return;
    }
    startBoot('pageshow', event.persisted);
  },
  { passive: true }
);

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    startBoot('visibilitychange');
  }
});

startBoot('initial');
