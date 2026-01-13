# Portfolio 3D - Guide de Déploiement Docker

## 📦 Vue d'ensemble

Ce portfolio est conteneurisé avec Docker pour un déploiement facile sur votre VPS. Il utilise nginx pour servir les fichiers statiques de manière optimisée.

## 🚀 Déploiement rapide

### 1. Build de l'image Docker

```bash
cd /home/bheall/workspace/Portfolio
docker compose build
```

### 2. Lancer le conteneur

```bash
docker compose up -d
```

### 3. Vérifier le statut

```bash
docker compose ps
docker compose logs -f portfolio
```

### 4. Accéder au site

Le portfolio sera accessible via votre réseau `global_cloudflared` à l'adresse IP `10.25.10.6`.

## 🔧 Configuration

### Réseau

Le portfolio est configuré pour utiliser le réseau externe `global_cloudflared` avec l'IP fixe `10.25.10.6`.

Si vous devez changer l'IP, modifiez le fichier `docker-compose.yml` :

```yaml
networks:
  global_cloudflared:
    ipv4_address: 10.25.10.6  # Changez cette IP si nécessaire
```

### Ressources

Limites par défaut :
- CPU : 0.25 core (max), 0.1 core (réservé)
- RAM : 128MB (max), 64MB (réservé)

Pour ajuster, modifiez la section `deploy.resources` dans `docker-compose.yml`.

## 📊 Commandes utiles

### Voir les logs
```bash
docker compose logs -f portfolio
```

### Redémarrer le conteneur
```bash
docker compose restart portfolio
```

### Arrêter le conteneur
```bash
docker compose down
```

### Rebuild après modifications
```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Vérifier la santé du conteneur
```bash
docker compose ps
curl http://10.25.10.6/health
```

## 🔍 Health Check

Le conteneur inclut un health check qui vérifie toutes les 30 secondes que nginx répond correctement sur l'endpoint `/health`.

## 📁 Structure des fichiers Docker

```
Portfolio/
├── Dockerfile              # Image de production avec nginx
├── docker-compose.yml      # Orchestration du conteneur
├── nginx.conf             # Configuration nginx optimisée
├── .dockerignore          # Fichiers exclus du build
└── README.Docker.md       # Ce fichier
```

## 🎨 Optimisations incluses

### Nginx
- ✅ Compression Gzip activée
- ✅ Cache des assets statiques (1 an)
- ✅ Headers de sécurité
- ✅ Support des polices avec CORS
- ✅ Fallback SPA pour le routing

### Docker
- ✅ Image alpine légère (~50MB)
- ✅ Utilisateur non-root pour la sécurité
- ✅ Health check automatique
- ✅ Logs rotatifs (10MB max, 3 fichiers)
- ✅ Limites de ressources

## 🔐 Sécurité

- Utilisateur non-root (nginx:nginx)
- Headers de sécurité configurés
- Fichiers cachés bloqués
- Logs limités en taille

## 🐛 Dépannage

### Le conteneur ne démarre pas
```bash
docker compose logs portfolio
```

### Nginx ne répond pas
```bash
docker exec -it portfolio-3d nginx -t  # Tester la config
docker exec -it portfolio-3d sh        # Accéder au shell
```

### Problème de réseau
```bash
docker network ls
docker network inspect global_cloudflared
```

### Rebuild complet
```bash
docker compose down -v
docker system prune -a
docker compose build --no-cache
docker compose up -d
```

## 📝 Notes

- Le portfolio est un site statique, aucune base de données n'est nécessaire
- Les fichiers sont servis directement depuis `/usr/share/nginx/html`
- La configuration nginx est optimisée pour Three.js et les assets 3D
- Le conteneur redémarre automatiquement en cas de crash (`restart: unless-stopped`)

## 🔗 Intégration avec vos autres services

Le portfolio utilise le même réseau `global_cloudflared` que vos autres services :
- Tono API : `10.25.10.4`
- Tono Discord Bot : `10.25.10.5`
- Portfolio 3D : `10.25.10.6`

Tous les services peuvent communiquer entre eux via ce réseau.
