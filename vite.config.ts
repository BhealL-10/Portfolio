import { cpSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import { resolveAppBuildConfig } from './build/appBuildConfig';

function copyLegacyAssets(projectRoot: string, outDir: string, assetDirs: string[]) {
  return {
    name: 'copy-legacy-assets',
    closeBundle() {
      const outputDir = resolve(projectRoot, outDir, 'assets');

      assetDirs.forEach((dir) => {
        const source = resolve(projectRoot, 'assets', dir);
        const target = resolve(outputDir, dir);

        if (existsSync(source)) {
          cpSync(source, target, { recursive: true });
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const buildConfig = resolveAppBuildConfig(env);

  return {
    base: buildConfig.base,
    publicDir: false,
    plugins: [copyLegacyAssets(buildConfig.projectRoot, buildConfig.outDir, buildConfig.legacyAssetDirs)],
    build: {
      outDir: buildConfig.outDir,
      sourcemap: buildConfig.sourcemap,
      target: 'es2020',
      chunkSizeWarningLimit: buildConfig.chunkSizeWarningLimit
    },
    test: {
      environment: 'node'
    }
  };
});
