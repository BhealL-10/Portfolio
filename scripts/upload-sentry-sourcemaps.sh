#!/bin/sh

set -eu

DIST_DIR="${1:-dist}"
ASSET_DIR="${DIST_DIR%/}/assets"

if [ ! -d "$ASSET_DIR" ]; then
  echo "[sentry] Sourcemap upload skipped: asset directory '$ASSET_DIR' not found."
  exit 0
fi

if [ -z "${SENTRY_AUTH_TOKEN:-}" ] || [ -z "${SENTRY_ORG:-}" ] || [ -z "${SENTRY_FRONTEND_PROJECT:-}" ] || [ -z "${SENTRY_RELEASE:-}" ]; then
  echo "[sentry] Sourcemap upload skipped: missing SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_FRONTEND_PROJECT, or SENTRY_RELEASE."
  exit 0
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "[sentry] Sourcemap upload skipped: curl is not available in the build image."
  exit 0
fi

curl -sL https://sentry.io/get-cli/ | sh

export PATH="$HOME/.local/bin:$PATH"

sentry-cli releases new "$SENTRY_RELEASE" --project "$SENTRY_FRONTEND_PROJECT"
sentry-cli releases files "$SENTRY_RELEASE" upload-sourcemaps "$ASSET_DIR" \
  --project "$SENTRY_FRONTEND_PROJECT" \
  --url-prefix "~/assets" \
  --rewrite \
  --validate
sentry-cli releases finalize "$SENTRY_RELEASE" --project "$SENTRY_FRONTEND_PROJECT"

echo "[sentry] Uploaded frontend sourcemaps for release '$SENTRY_RELEASE'."
