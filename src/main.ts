import './styles/reset.css';
import './styles/index.css';
import { resolveAppEntryRoute } from './core/AppEntryRoute';
import { AppController } from './core/AppController';

const app = document.getElementById('app');

if (!app) {
  throw new Error('App root not found');
}

new AppController(app, {
  entryRoute: resolveAppEntryRoute()
});
