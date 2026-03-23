import { resolveAppEntryRoute } from './core/AppEntryRoute';
import { AppController } from './core/AppController';

const styleImports = ['./styles/reset.css', './styles/index.css'];

async function installStyles() {
  await Promise.all(
    styleImports.map(async (stylePath) => {
      try {
        await import(stylePath);
      } catch (error) {
        // Dev-server 500 can happen during HMR; keep app alive and log a useful warning.
        console.warn(`[main] failed to load style ${stylePath}`, error);
      }
    })
  );
}

const app = document.getElementById('app');

if (!app) {
  throw new Error('App root not found');
}

installStyles().finally(() => {
  new AppController(app, {
    entryRoute: resolveAppEntryRoute()
  });
});
