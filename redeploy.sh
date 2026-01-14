#!/bin/bash
# =============================================================================
# Script de Redéploiement Portfolio
# =============================================================================

set -e

echo "🚀 Redéploiement du Portfolio 3D"
echo ""

# Arrêter le conteneur existant
echo "⏹️  Arrêt du conteneur existant..."
docker compose down 2>/dev/null || true

# Supprimer l'ancienne image
echo "🗑️  Suppression de l'ancienne image..."
docker rmi portfolio-3d:latest 2>/dev/null || true

# Rebuild l'image
echo "🔨 Build de la nouvelle image..."
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

# Vérifier le contenu du volume
echo ""
echo "📁 Contenu du volume /usr/share/nginx/html:"
docker exec portfolio-3d ls -la /usr/share/nginx/html | head -10

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
