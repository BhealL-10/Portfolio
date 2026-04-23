#!/bin/bash
# =============================================================================
# Script de Redéploiement Portfolio - Multi-Stage Build avec pnpm
# =============================================================================
# Architecture:
#   Stage 1 (Builder): Node 20 Alpine
#     - Installe les dépendances avec pnpm
#     - Compile TypeScript/Vite
#     - Génère dist/ avec assets hashés
#   
#   Stage 2 (nginx-prod): Nginx Alpine
#     - Copie UNIQUEMENT dist/ depuis Stage 1
#     - Aucune source TypeScript ni dépendances
#     - Taille image final: ~20-30MB
#
# Contexte Docker:
#   .dockerignore configure quels fichiers sont inclus dans le contexte:
#   - ✅ Inclus: package.json, src/, assets/, index.html, config Vite
#   - ❌ Exclu: .git, node_modules/, logs, dist/, archives, etc.
#
# IMPORTANT: Ne jamais ajouter de volume mount (./:/usr/share/nginx/html)
# qui exposerait les fichiers source. La prod sert UNIQUEMENT le build compilé.
# =============================================================================

set -e

if [ -f ".env" ]; then
  set -a
  . ./.env
  set +a
fi

APP_VERSION="$(
  sed -n 's/^[[:space:]]*"version":[[:space:]]*"\([^"]*\)".*/\1/p' package.json | head -n 1
)"
APP_VERSION="${APP_VERSION:-1.0.0}"
export SENTRY_ENVIRONMENT="${SENTRY_ENVIRONMENT:-production}"
export SENTRY_RELEASE="${SENTRY_RELEASE:-${TAG:-ape-prod-portfolio@${APP_VERSION}}}"

echo "🚀 Redéploiement du Portfolio 3D (Multi-Stage Build + pnpm)"
echo ""
echo "📦 Release Sentry: ${SENTRY_RELEASE}"
if [ -n "${SENTRY_AUTH_TOKEN:-}" ] && [ -n "${SENTRY_ORG:-}" ] && [ -n "${SENTRY_FRONTEND_PROJECT:-}" ]; then
    echo "🗺️  Upload sourcemaps Sentry: activé"
else
    echo "🗺️  Upload sourcemaps Sentry: désactivé (SENTRY_AUTH_TOKEN / SENTRY_ORG / SENTRY_FRONTEND_PROJECT manquants)"
fi
echo ""

# Arrêter le conteneur existant
echo "⏹️  Arrêt du conteneur existant..."
docker compose down 2>/dev/null || true

# Supprimer l'ancienne image
echo "🗑️  Suppression de l'ancienne image..."
docker rmi portfolio-3d:latest 2>/dev/null || true

# Rebuild l'image (y compris pnpm install + pnpm run build dans le stage builder)
echo "🔨 Build de la nouvelle image (Stage 1: compilation Vite)..."
docker compose build --no-cache

# Démarrer le conteneur
echo "▶️  Démarrage du conteneur..."
docker compose up -d

# Attendre le start_period
echo "⏳ Attente du démarrage (15s)..."
sleep 15

# Vérifier le statut
echo ""
echo "📊 Statut du conteneur:"
docker compose ps

# Vérifier les logs
echo ""
echo "📋 Derniers logs:"
docker compose logs --tail=20 portfolio

# Tester le healthcheck
echo ""
echo "🏥 Test du healthcheck:"
docker exec portfolio-3d curl -f http://localhost/health 2>/dev/null && echo "✅ Healthcheck OK" || echo "❌ Healthcheck FAILED"

# Vérifier que UNIQUEMENT les fichiers compilés sont servis
echo ""
echo "📁 Contenu servi par Nginx (/usr/share/nginx/html):"
docker exec portfolio-3d ls -la /usr/share/nginx/html

# Vérifier qu'aucun fichier source n'est présent
echo ""
echo "🔍 Vérification CRITIQUE - Aucun fichier source présent?"
if docker exec portfolio-3d test -f /usr/share/nginx/html/src 2>/dev/null; then
    echo "❌ ERREUR: fichiers source détectés!"
else
    echo "✅ Aucune source TypeScript trouvée en prod"
fi

# Vérifier que l'index.html référence les assets hashés (preuve du build Vite)
echo ""
echo "✅ Vérification que l'index.html référence des assets compilés avec Vite:"
docker exec portfolio-3d grep -o '/assets/index-[A-Za-z0-9]*\.js' /usr/share/nginx/html/index.html && echo "✅ Assets hashés détectés (Vite build réussi)" || echo "❌ Assets hashés non trouvés!"

# Tester l'accès à index.html
echo ""
echo "🌐 Test de l'accès à index.html:"
docker exec portfolio-3d test -f /usr/share/nginx/html/index.html && echo "✅ index.html trouvé" || echo "❌ index.html MANQUANT"

# Tester nginx
echo ""
echo "⚙️  Test de la configuration nginx:"
docker exec portfolio-3d nginx -t

echo ""
echo "✅ Déploiement terminé!"
echo "🌐 Accès: http://10.25.10.6"
