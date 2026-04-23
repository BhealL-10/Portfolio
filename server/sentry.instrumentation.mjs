import * as Sentry from '@sentry/node';

const SENTRY_DSN =
  'https://344e799c03f1df154de0514088f70dc5@o4511266261237760.ingest.de.sentry.io/4511266274672720';

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
  environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'development',
  release: process.env.SENTRY_RELEASE || 'ape-prod-portfolio@1.0.0'
});
