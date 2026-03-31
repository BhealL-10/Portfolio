#!/bin/bash
# =============================================================================
# Reset leaderboard database for Docker Compose local development.
# =============================================================================
set -e

echo "🧹 Réinitialisation de la base de données leaderboard"

docker compose up -d leaderboard

echo "🛠️  Réinitialisation du fichier /data/leaderboard.json dans le conteneur leaderboard..."
docker compose exec -T leaderboard sh -c 'mkdir -p /data && find /data -maxdepth 1 -type f \( -iname "*achievement*" -o -iname "*achievements*" \) -delete && printf "[]\n" > /data/leaderboard.json'

echo "✅ Leaderboard réinitialisé."
echo "ℹ️  Le service leaderboard reste en ligne."
