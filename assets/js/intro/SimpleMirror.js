/**
 * SimpleMirror.js - Miroir Canvas 2D ultra-léger
 * Portfolio 3D V2.0
 * 
 * Approche minimaliste : Canvas 2D avec fissures qui grandissent au clic
 */

import { INTRO, THEME } from '../config/constants.js';

export class SimpleMirror {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.cells = []; // Cellules Voronoi { x, y, size, growth, id }
    this.nextCellId = 0;
    this.isDark = document.documentElement.dataset.theme === 'dark';
    this.opacity = 1; // Miroir opaque au début
    
    this.createCanvas();
    this.setupThemeListener();
  }
  
  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'mirror-canvas';
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      pointer-events: auto;
      cursor: pointer;
    `;
    
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    
    // Resize handler
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.draw();
    });
    
    this.draw();
  }
  
  setupThemeListener() {
    // Observer les changements de thème
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.dataset.theme === 'dark';
      if (this.isDark !== newTheme) {
        this.isDark = newTheme;
        this.draw();
      }
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }
  
  draw() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    // Effacer
    ctx.clearRect(0, 0, w, h);
    
    // Couleur du miroir selon le thème
    const theme = this.isDark ? THEME.DARK : THEME.LIGHT;
    const mirrorColor = this.isDark ? '#393F4A' : '#F2DDB8';
    const crackColor = this.isDark ? '#F2DDB8' : '#393F4A';
    
    // Fond du miroir (opaque)
    ctx.fillStyle = mirrorColor;
    ctx.globalAlpha = this.opacity;
    ctx.fillRect(0, 0, w, h);
    
    // Texte hero
    if (this.opacity > 0.5) {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.isDark ? '#F2DDB8' : '#393F4A';
      ctx.font = 'bold 48px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(INTRO.HERO_TEXT, w / 2, h / 2 - 30);
      
      ctx.font = '24px Arial, sans-serif';
      ctx.globalAlpha = this.opacity * 0.7;
      ctx.fillText(INTRO.HERO_SUBTITLE, w / 2, h / 2 + 30);
    }
    
    // Cellules Voronoi (effet bris de miroir)
    if (this.cells.length > 0) {
      // Calculer le diagramme de Voronoi complet
      const voronoiDiagram = this.computeVoronoi(w, h);
      
      ctx.globalAlpha = 1;
      ctx.strokeStyle = crackColor;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Dessiner les cellules
      voronoiDiagram.forEach(cell => {
        if (cell.polygon && cell.polygon.length > 0) {
          ctx.beginPath();
          ctx.moveTo(cell.polygon[0].x, cell.polygon[0].y);
          for (let i = 1; i < cell.polygon.length; i++) {
            ctx.lineTo(cell.polygon[i].x, cell.polygon[i].y);
          }
          ctx.closePath();
          
          // Remplir avec transparence selon la taille
          const alpha = Math.min(cell.site.size * 0.3, 0.5);
          ctx.fillStyle = crackColor;
          ctx.globalAlpha = alpha;
          ctx.fill();
          
          // Bordure
          ctx.globalAlpha = 1;
          ctx.stroke();
        }
      });
    }
  }
  
  /**
   * Calcule le diagramme de Voronoi complet
   */
  computeVoronoi(width, height) {
    if (this.cells.length === 0) return [];
    
    const diagram = [];
    const padding = 50;
    
    // Pour chaque cellule, calculer son polygone Voronoi
    this.cells.forEach(site => {
      const polygon = [];
      
      // Échantillonner des points autour du site
      const samples = 32;
      for (let i = 0; i < samples; i++) {
        const angle = (Math.PI * 2 / samples) * i;
        let maxDist = Math.max(width, height) * 2;
        
        // Trouver la distance au site le plus proche dans cette direction
        this.cells.forEach(otherSite => {
          if (otherSite.id === site.id) return;
          
          // Calculer l'intersection avec la médiatrice
          const dx = otherSite.x - site.x;
          const dy = otherSite.y - site.y;
          const midX = (site.x + otherSite.x) / 2;
          const midY = (site.y + otherSite.y) / 2;
          
          // Distance dans cette direction
          const rayX = Math.cos(angle);
          const rayY = Math.sin(angle);
          
          const dotProduct = dx * rayX + dy * rayY;
          if (Math.abs(dotProduct) > 0.01) {
            const t = ((midX - site.x) * dx + (midY - site.y) * dy) / dotProduct;
            if (t > 0 && t < maxDist) {
              maxDist = t;
            }
          }
        });
        
        // Limiter par les bords
        maxDist = Math.min(maxDist, site.size * INTRO.CELL_SPREAD);
        
        const x = site.x + Math.cos(angle) * maxDist;
        const y = site.y + Math.sin(angle) * maxDist;
        
        // Clipper aux bords
        polygon.push({
          x: Math.max(-padding, Math.min(width + padding, x)),
          y: Math.max(-padding, Math.min(height + padding, y))
        });
      }
      
      diagram.push({ site, polygon });
    });
    
    return diagram;
  }
  
  /**
   * Ajoute des cellules au clic
   */
  addCrack(x, y) {
    const now = Date.now();
    
    // Chercher des cellules proches pour les agrandir
    let foundNearby = false;
    this.cells.forEach(cell => {
      const dist = Math.sqrt((cell.x - x) ** 2 + (cell.y - y) ** 2);
      if (dist < 100) {
        // Agrandir la cellule existante
        cell.size = Math.min(cell.size + 0.3, INTRO.CELL_MAX_SIZE);
        cell.growth += INTRO.GROWTH_PER_CLICK;
        cell.lastClick = now;
        foundNearby = true;
      }
    });
    
    // Si aucune cellule proche, créer de nouvelles cellules
    if (!foundNearby) {
      for (let i = 0; i < INTRO.INITIAL_CELLS; i++) {
        const angle = (Math.PI * 2 / INTRO.INITIAL_CELLS) * i + Math.random() * 0.3;
        const distance = Math.random() * 30;
        
        this.cells.push({
          id: this.nextCellId++,
          x: x + Math.cos(angle) * distance,
          y: y + Math.sin(angle) * distance,
          size: 0.3,
          growth: INTRO.GROWTH_PER_CLICK,
          lastClick: now
        });
      }
    }
    
    this.draw();
  }
  
  /**
   * Update - réduire les cellules après délai
   */
  update(deltaTime) {
    const now = Date.now();
    let changed = false;
    
    this.cells.forEach(cell => {
      const timeSinceClick = (now - cell.lastClick) / 1000;
      
      // Decay seulement après 1 seconde sans clic
      if (timeSinceClick > 1.0) {
        if (cell.size > 0.05) {
          cell.size -= deltaTime * INTRO.CELL_GROWTH_RATE * 0.5;
          cell.size = Math.max(0.05, cell.size);
          changed = true;
        }
        
        if (cell.growth > 0) {
          cell.growth -= deltaTime * INTRO.DECAY_RATE;
          cell.growth = Math.max(0, cell.growth);
          changed = true;
        }
      }
    });
    
    // Supprimer les cellules trop petites
    this.cells = this.cells.filter(c => c.size > 0.05 && c.growth > 0);
    
    if (changed) {
      this.draw();
    }
  }
  
  /**
   * Obtient le pourcentage de destruction
   */
  getDestructionPercent() {
    const totalGrowth = this.cells.reduce((sum, c) => sum + c.growth, 0);
    return Math.min(totalGrowth / INTRO.DESTRUCTION_THRESHOLD, 1);
  }
  
  /**
   * Animation de bris du miroir (1 seconde)
   */
  shatterAnimation(onComplete) {
    console.log('💥 Animation de bris...');
    
    // Rendre le canvas transparent immédiatement
    this.canvas.style.transition = 'opacity 0.5s ease-out';
    this.canvas.style.opacity = '0';
    
    const duration = 1000; // 1 seconde
    const startTime = Date.now();
    const shatterPieces = [];
    
    // Créer des morceaux de miroir basés sur les cellules existantes
    const piecesCount = Math.max(20, this.cells.length);
    
    // Utiliser les cellules existantes comme base
    this.cells.forEach(cell => {
      shatterPieces.push({
        x: cell.x,
        y: cell.y,
        vx: (Math.random() - 0.5) * 800,
        vy: (Math.random() - 0.5) * 800 - 200, // Biais vers le haut
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 8,
        size: cell.size * 80,
        opacity: 1
      });
    });
    
    // Ajouter des morceaux supplémentaires
    while (shatterPieces.length < piecesCount) {
      shatterPieces.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 800,
        vy: (Math.random() - 0.5) * 800 - 200,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 8,
        size: 50 + Math.random() * 100,
        opacity: 1
      });
    }
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / (duration / 1000), 1);
      
      // Effacer complètement avec fond transparent
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Dessiner les morceaux qui tombent
      const crackColor = this.isDark ? '#F2DDB8' : '#393F4A';
      const mirrorColor = this.isDark ? '#393F4A' : '#F2DDB8';
      
      shatterPieces.forEach(piece => {
        // Physique avec gravité
        piece.x += piece.vx * 0.016;
        piece.y += piece.vy * 0.016;
        piece.vy += 500 * 0.016; // Gravité
        piece.rotation += piece.rotationSpeed * 0.016;
        piece.opacity = 1 - progress;
        
        this.ctx.save();
        this.ctx.translate(piece.x, piece.y);
        this.ctx.rotate(piece.rotation);
        this.ctx.globalAlpha = piece.opacity;
        
        // Dessiner un morceau de miroir
        this.ctx.fillStyle = mirrorColor;
        this.ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        
        this.ctx.strokeStyle = crackColor;
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        
        this.ctx.restore();
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        console.log('✅ Animation de bris terminée');
        // Supprimer complètement le canvas
        if (this.canvas && this.canvas.parentNode) {
          this.canvas.parentNode.removeChild(this.canvas);
        }
        if (onComplete) onComplete();
      }
    };
    
    animate();
  }
  
  /**
   * Fait disparaître le miroir progressivement
   */
  fadeOut(duration = 1) {
    const startTime = Date.now();
    const startOpacity = this.opacity;
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      this.opacity = startOpacity * (1 - progress);
      this.draw();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.remove();
      }
    };
    
    animate();
  }
  
  /**
   * Supprime le canvas
   */
  remove() {
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}
