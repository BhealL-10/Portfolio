import { cpSync, existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';

const DEFAULT_LEGACY_ASSET_DIRS = ['images', 'fonts'] as const;
const PACKAGE_VERSION = JSON.parse(
  readFileSync(fileURLToPath(new URL('./package.json', import.meta.url)), 'utf8')
) as { version?: string };

type BuildSourcemapMode = boolean | 'hidden';

interface AppBuildConfig {
  projectRoot: string;
  base: string;
  outDir: string;
  sourcemap: BuildSourcemapMode;
  chunkSizeWarningLimit: number;
  legacyAssetDirs: string[];
}

function resolveAppBuildConfig(
  env: Record<string, string | undefined>,
  defaults: {
    base: string;
    sourcemap: BuildSourcemapMode;
  }
): AppBuildConfig {
  return {
    projectRoot: resolve(fileURLToPath(new URL('./', import.meta.url))),
    base: normalizeBase(env.VITE_APP_BASE, defaults.base),
    outDir: env.VITE_BUILD_OUT_DIR?.trim() || 'dist',
    sourcemap: parseSourcemap(env.VITE_BUILD_SOURCEMAP, defaults.sourcemap),
    chunkSizeWarningLimit: parseInteger(env.VITE_BUILD_CHUNK_WARNING_LIMIT, 500),
    legacyAssetDirs: parseDirectoryList(env.VITE_BUILD_LEGACY_ASSET_DIRS)
  };
}

function normalizeBase(input: string | undefined, fallback: string) {
  const base = input?.trim() || fallback;
  if (base === '/' || base === './') {
    return base;
  }
  if (/^(?:https?:)?\/\//.test(base)) {
    return base.endsWith('/') ? base : `${base}/`;
  }
  if (base.startsWith('./')) {
    return base.endsWith('/') ? base : `${base}/`;
  }
  if (base.startsWith('../')) {
    return base.endsWith('/') ? base : `${base}/`;
  }
  if (base === '.') {
    return './';
  }
  if (base === '..') {
    return '../';
  }
  if (base === '/') {
    return base;
  }
  const withLeadingSlash = base.startsWith('/') ? base : `/${base}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

function parseSourcemap(input: string | undefined, fallback: BuildSourcemapMode) {
  if (!input) {
    return fallback;
  }
  if (input === 'true') {
    return true;
  }
  if (input === 'false') {
    return false;
  }
  if (input === 'hidden') {
    return 'hidden';
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

function resolveManualChunk(id: string) {
  const normalizedId = id.split('\\').join('/');

  if (normalizedId.includes('/node_modules/three/')) {
    return 'vendor-three';
  }
  if (normalizedId.includes('/node_modules/@sentry/')) {
    return 'vendor-sentry';
  }
  if (
    normalizedId.includes('/src/game/PrimatriePortal.ts') ||
    normalizedId.includes('/src/game/PrimateriePortalCommunityAssets.ts')
  ) {
    return 'primaterie-portal';
  }
  if (
    normalizedId.includes('/src/game/') &&
    !normalizedId.includes('/src/game/MiniGamePortalLayout.ts') &&
    !normalizedId.includes('/src/game/PrimatriePortal.ts') &&
    !normalizedId.includes('/src/game/PrimateriePortalCommunityAssets.ts') &&
    !normalizedId.includes('/src/game/PrimateriePortalPreview.ts')
  ) {
    return 'game-runtime';
  }

  return undefined;
}

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const sentryArtifactUploadEnabled = Boolean(
    env.SENTRY_AUTH_TOKEN?.trim() &&
      env.SENTRY_ORG?.trim() &&
      env.SENTRY_FRONTEND_PROJECT?.trim()
  );
  const buildConfig = resolveAppBuildConfig(env, {
    base: command === 'serve' ? '/' : './',
    sourcemap: command === 'build' ? (sentryArtifactUploadEnabled ? 'hidden' : true) : false
  });

  return {
    base: buildConfig.base,
    publicDir: false,
    define: {
      __APP_VERSION__: JSON.stringify(PACKAGE_VERSION.version || '1.0.0')
    },
    plugins: [copyLegacyAssets(buildConfig.projectRoot, buildConfig.outDir, buildConfig.legacyAssetDirs)],
    build: {
      outDir: buildConfig.outDir,
      sourcemap: buildConfig.sourcemap,
      target: 'es2020',
      assetsInlineLimit: 0,
      modulePreload: {
        resolveDependencies: (_filename, dependencies, context) => {
          if (context.hostType !== 'html') {
            return dependencies;
          }
          return dependencies.filter((dependency) => !/^assets\/game-runtime-.*\.js$/i.test(dependency));
        }
      },
      chunkSizeWarningLimit: buildConfig.chunkSizeWarningLimit,
      rollupOptions: {
        output: {
          manualChunks: resolveManualChunk
        }
      }
    },
    test: {
      environment: 'node'
    }
  };
});
