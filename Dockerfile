# =============================================================================
# Portfolio 3D - Production Dockerfile (Multi-Stage Build)
# =============================================================================
# Build:
#   docker build -t portfolio-3d .
# Run:
#   docker run -d -p 80:80 --name portfolio portfolio-3d
# 
# Note: .dockerignore configure le contexte Docker pour inclure les fichiers
# essentiels (package.json, src/, assets/, index.html, config Vite) tout en
# excluant les fichiers volumineux/inutiles (node_modules/, .git, dist/, etc.)
# =============================================================================

# Stage 1: Build the Vite bundle with Node
# =============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@latest

# Copy package configuration files (guaranteed to exist)
COPY package.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./

# Copy pnpm lockfile if it exists (wildcards don't error if file missing)
COPY pnpm-lock.yaml* ./

# Install dependencies using pnpm
# Fallback: if pnpm-lock.yaml doesn't exist, install normally
RUN pnpm install --frozen-lockfile 2>/dev/null || pnpm install

# Copy all application source files (filtered by .dockerignore)
COPY . .

# Build the Vite bundle
RUN pnpm run build

# Stage 2: Serve compiled bundle with Nginx (lightweight)
# =============================================================================
FROM nginx:alpine AS nginx-prod

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
# Cela garantit qu'aucune source TypeScript ne sera servie
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
