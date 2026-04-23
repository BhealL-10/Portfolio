#!/bin/sh

set -u

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

SENTRY_INSTALLER="/tmp/get-sentry-cli.sh"
if ! curl -sL https://sentry.io/get-cli/ -o "$SENTRY_INSTALLER"; then
  echo "[sentry] Sourcemap upload skipped: failed to download sentry-cli installer."
  exit 0
fi

if ! sh "$SENTRY_INSTALLER"; then
  echo "[sentry] Sourcemap upload skipped: failed to install sentry-cli."
  exit 0
fi

export PATH="$HOME/.local/bin:$PATH"

if ! sentry-cli releases new "$SENTRY_RELEASE" --org "$SENTRY_ORG" --project "$SENTRY_FRONTEND_PROJECT"; then
  echo "[sentry] Release '$SENTRY_RELEASE' already exists or could not be created; continuing with sourcemap upload."
fi

if ! sentry-cli releases files "$SENTRY_RELEASE" upload-sourcemaps "$ASSET_DIR" \
  --org "$SENTRY_ORG" \
  --project "$SENTRY_FRONTEND_PROJECT" \
  --url-prefix "~/assets" \
  --rewrite \
  --validate; then
  echo "[sentry] Sourcemap upload failed for release '$SENTRY_RELEASE'; continuing deployment."
  exit 0
fi

if ! sentry-cli releases finalize "$SENTRY_RELEASE" --org "$SENTRY_ORG" --project "$SENTRY_FRONTEND_PROJECT"; then
  echo "[sentry] Release finalize failed for '$SENTRY_RELEASE'; sourcemaps were uploaded, continuing deployment."
  exit 0
fi

echo "[sentry] Uploaded frontend sourcemaps for release '$SENTRY_RELEASE'."
