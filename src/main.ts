import { resolveAppEntryRoute } from './core/AppEntryRoute';
import { AppController } from './core/AppController';
import { initFrontendSentry } from './core/sentry';
import './styles/reset.css';
import './styles/index.css';

initFrontendSentry();

const app = document.getElementById('app');

if (!app) {
  throw new Error('App root not found');
}

new AppController(app, {
  entryRoute: resolveAppEntryRoute()
});
