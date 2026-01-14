# =============================================================================
# Portfolio 3D - Production Dockerfile
# =============================================================================
# Build:
#   docker build -t portfolio-3d .
# Run:
#   docker run -d -p 80:80 --name portfolio portfolio-3d
# =============================================================================

# -----------------------------------------------------------------------------
# Build stage - Prepare static files
# -----------------------------------------------------------------------------
FROM nginx:alpine AS production

# Métadonnées
LABEL maintainer="Portfolio-BhealL"
LABEL description="Portfolio 3D Bilel El Ouaer"
LABEL version="5.0"

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Ajuster les permissions pour nginx
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    mkdir -p /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chmod 755 /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Health check - vérifier que nginx répond
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Démarrer nginx en mode foreground
CMD ["nginx", "-g", "daemon off;"]
