import { resolveAppEntryRoute } from './core/AppEntryRoute';
import { AppController } from './core/AppController';
import './styles/reset.css';
import './styles/index.css';

const app = document.getElementById('app');

if (!app) {
  throw new Error('App root not found');
}

new AppController(app, {
  entryRoute: resolveAppEntryRoute()
});
