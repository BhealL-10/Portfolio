#!/bin/bash
# =============================================================================
# Reset leaderboard database for Docker Compose local development.
# =============================================================================
set -e

echo "🧹 Réinitialisation de la base de données leaderboard"

docker compose up -d leaderboard

echo "🛠️  Réinitialisation du fichier /data/leaderboard.json dans le conteneur leaderboard..."
docker compose exec -T leaderboard sh -c 'mkdir -p /data && printf "[]\n" > /data/leaderboard.json && printf "{\n  \"token\": \"%s\"\n}\n" "$(date +%s)" > /data/achievement-reset.json'

echo "✅ Leaderboard et succès utilisateurs réinitialisés."
echo "ℹ️  Le service leaderboard reste en ligne."
