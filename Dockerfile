# =============================================================================
# Portfolio 3D - Production Dockerfile (Multi-Stage Build)
# =============================================================================
# Build:
#   docker build -t portfolio-3d .
# Run:
#   docker run -d -p 80:80 --name portfolio portfolio-3d
# 
# Note: .dockerignore configure le contexte Docker pour inclure les fichiers
# essentiels (package.json, src/, config Vite, assets, etc.) tout en
# excluant les fichiers volumineux/inutiles (node_modules/, .git, etc.)
# =============================================================================

# Stage 1: Build the Vite bundle
# =============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@latest

# Copy build configuration files
COPY package.json ./
COPY pnpm-lock.yaml* ./
COPY tsconfig.json ./
COPY vite.config.ts ./

# Install dependencies using pnpm
# Fallback to regular install if pnpm-lock.yaml doesn't exist
RUN pnpm install --frozen-lockfile 2>/dev/null || pnpm install

# Copy source code and assets (filtered by .dockerignore)
COPY src ./src
COPY index.html ./
COPY assets ./assets 2>/dev/null || true

# Build the Vite bundle
RUN pnpm run build

# Stage 2: Serve with Nginx
# =============================================================================
FROM nginx:alpine AS production

# Métadonnées
LABEL maintainer="Portfolio-BhealL"
LABEL description="Portfolio 3D Bilel El Ouaer"
LABEL version="5.0"

# Installer curl pour le healthcheck
RUN apk add --no-cache curl

# Supprimer la configuration nginx par défaut
RUN rm -f /etc/nginx/conf.d/default.conf

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Copier UNIQUEMENT les fichiers compilés depuis le stage builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Ajuster les permissions pour nginx
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chmod 755 /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Health check - vérifier que nginx répond sur /health
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Démarrer nginx en mode foreground
CMD ["nginx", "-g", "daemon off;"]

# Stage 2: Serve with Nginx
# =============================================================================
FROM nginx:alpine AS production

# Métadonnées
LABEL maintainer="Portfolio-BhealL"
LABEL description="Portfolio 3D Bilel El Ouaer"
LABEL version="5.0"

# Installer curl pour le healthcheck
RUN apk add --no-cache curl

# Supprimer la configuration nginx par défaut
RUN rm -f /etc/nginx/conf.d/default.conf

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Copier UNIQUEMENT les fichiers compilés depuis le stage builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Ajuster les permissions pour nginx
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chmod 755 /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Health check - vérifier que nginx répond sur /health
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Démarrer nginx en mode foreground
CMD ["nginx", "-g", "daemon off;"]
