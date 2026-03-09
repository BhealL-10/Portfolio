import { cpSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

function copyLegacyAssets() {
  return {
    name: 'copy-legacy-assets',
    closeBundle() {
      const outputDir = resolve(process.cwd(), 'dist/assets');
      const assetDirs = ['images', 'fonts'];

      assetDirs.forEach((dir) => {
        const source = resolve(process.cwd(), 'assets', dir);
        const target = resolve(outputDir, dir);

        if (existsSync(source)) {
          cpSync(source, target, { recursive: true });
        }
      });
    }
  };
}

export default defineConfig({
  publicDir: false,
  plugins: [copyLegacyAssets()],
  build: {
    sourcemap: false
  },
  test: {
    environment: 'node'
  }
});
