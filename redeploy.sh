#!/bin/bash
# =============================================================================
# Script de Redéploiement Portfolio
# =============================================================================
# Ce script utilise un Dockerfile multi-stage avec pnpm:
#   Stage 1: Node.js - pnpm install + pnpm run build → dist/
#   Stage 2: Nginx Alpine - Copy dist/ → /usr/share/nginx/html
# 
# IMPORTANT: Ne pas modifier docker-compose.yml pour ajouter des volumes
# qui monteraient la source (./) - cela exposerait les fichiers source!
# Seul le bundle compilé dist/ doit être servi par Nginx.
# 
# Note: pnpm-lock.yaml n'est pas requis en repo si .pnpm-store/ existe.
#       Docker installera les dépendances une première fois.
# =============================================================================

set -e

echo "🚀 Redéploiement du Portfolio 3D (pnpm)"
echo ""

# Arrêter le conteneur existant
echo "⏹️  Arrêt du conteneur existant..."
docker compose down 2>/dev/null || true

# Supprimer l'ancienne image
echo "🗑️  Suppression de l'ancienne image..."
docker rmi portfolio-3d:latest 2>/dev/null || true

# Rebuild l'image (y compris pnpm install + pnpm run build dans le stage builder)
echo "🔨 Build de la nouvelle image (compilation Vite avec pnpm incluse)..."
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

# Vérifier le contenu du volume et que c'est bien le bundle compilé
echo ""
echo "📁 Contenu servi par Nginx (/usr/share/nginx/html):"
docker exec portfolio-3d ls -la /usr/share/nginx/html

# Vérifier que l'index.html référence les assets hashés (preuve du build Vite)
echo ""
echo "✅ Vérification que l'index.html référence des assets compilés:"
docker exec portfolio-3d grep -o '/assets/index-[A-Za-z0-9]*\.js' /usr/share/nginx/html/index.html && echo "✅ Assets hashés détectés (Vite build OK)" || echo "❌ Assets hashés non trouvés!"

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
