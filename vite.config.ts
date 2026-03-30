import { cpSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';

const DEFAULT_LEGACY_ASSET_DIRS = ['images', 'fonts'] as const;

interface AppBuildConfig {
  projectRoot: string;
  base: string;
  outDir: string;
  sourcemap: boolean;
  chunkSizeWarningLimit: number;
  legacyAssetDirs: string[];
}

function resolveAppBuildConfig(env: Record<string, string | undefined>): AppBuildConfig {
  return {
    projectRoot: resolve(fileURLToPath(new URL('./', import.meta.url))),
    base: normalizeBase(env.VITE_APP_BASE),
    outDir: env.VITE_BUILD_OUT_DIR?.trim() || 'dist',
    sourcemap: parseBoolean(env.VITE_BUILD_SOURCEMAP, false),
    chunkSizeWarningLimit: parseInteger(env.VITE_BUILD_CHUNK_WARNING_LIMIT, 500),
    legacyAssetDirs: parseDirectoryList(env.VITE_BUILD_LEGACY_ASSET_DIRS)
  };
}

function normalizeBase(input: string | undefined) {
  const base = input?.trim() || '/';
  if (base === '/') {
    return base;
  }
  const withLeadingSlash = base.startsWith('/') ? base : `/${base}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

function parseBoolean(input: string | undefined, fallback: boolean) {
  if (!input) {
    return fallback;
  }
  if (input === 'true') {
    return true;
  }
  if (input === 'false') {
    return false;
  }
  return fallback;
}

function parseInteger(input: string | undefined, fallback: number) {
  if (!input) {
    return fallback;
  }
  const parsed = Number.parseInt(input, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseDirectoryList(input: string | undefined) {
  if (!input) {
    return [...DEFAULT_LEGACY_ASSET_DIRS];
  }
  const values = input
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  return values.length > 0 ? values : [...DEFAULT_LEGACY_ASSET_DIRS];
}

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
