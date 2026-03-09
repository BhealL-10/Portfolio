import './styles/reset.css';
import './styles/index.css';
import { AppController } from './core/AppController';

const app = document.getElementById('app');

if (!app) {
  throw new Error('App root not found');
}

new AppController(app);
