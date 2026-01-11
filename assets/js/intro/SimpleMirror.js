/**
 * SimpleMirror.js - Miroir Canvas 2D avec effet de bris
 * Portfolio 3D V3.0
 * 
 * - Canvas 2D avec cellules Voronoi
 * - Transition d'opacité pour révéler Three.js
 * - Animation de bris cinématographique
 */

import { INTRO, THEME, LAYERS } from '../config/constants.js';

export class SimpleMirror {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.cells = [];
    this.nextCellId = 0;
    this.isDark = document.documentElement.dataset.theme === 'dark';
    this.opacity = 1;
    
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
      z-index: ${LAYERS.CANVAS_2D.Z_INDEX};
      pointer-events: auto;
      cursor: pointer;
    `;
    
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    
    // Resize
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.draw();
    });
    
    this.draw();
  }
  
  setupThemeListener() {
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
    
    ctx.clearRect(0, 0, w, h);
    
    const mirrorColor = this.isDark ? '#393F4A' : '#F2DDB8';
    const crackColor = this.isDark ? '#F2DDB8' : '#393F4A';
    
    // Fond miroir
    ctx.fillStyle = mirrorColor;
    ctx.globalAlpha = this.opacity;
    ctx.fillRect(0, 0, w, h);
    
    // Texte hero
    if (this.opacity > 0.3) {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = crackColor;
      ctx.font = 'bold 52px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(INTRO.HERO_TEXT, w / 2, h / 2 - 35);
      
      ctx.font = '22px system-ui, -apple-system, sans-serif';
      ctx.globalAlpha = this.opacity * 0.6;
      ctx.fillText(INTRO.HERO_SUBTITLE, w / 2, h / 2 + 25);
    }
    
    // Cellules Voronoi (fissures)
    if (this.cells.length > 0) {
      const voronoiDiagram = this.computeVoronoi(w, h);
      
      ctx.globalAlpha = 1;
      ctx.strokeStyle = crackColor;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      voronoiDiagram.forEach(cell => {
        if (cell.polygon && cell.polygon.length > 0) {
          ctx.beginPath();
          ctx.moveTo(cell.polygon[0].x, cell.polygon[0].y);
          for (let i = 1; i < cell.polygon.length; i++) {
            ctx.lineTo(cell.polygon[i].x, cell.polygon[i].y);
          }
          ctx.closePath();
          
          const alpha = Math.min(cell.site.size * 0.35, 0.55);
          ctx.fillStyle = crackColor;
          ctx.globalAlpha = alpha * this.opacity;
          ctx.fill();
          
          ctx.globalAlpha = this.opacity;
          ctx.stroke();
        }
      });
    }
  }
  
  computeVoronoi(width, height) {
    if (this.cells.length === 0) return [];
    
    const diagram = [];
    const padding = 60;
    
    this.cells.forEach(site => {
      const polygon = [];
      const samples = 36;
      
      for (let i = 0; i < samples; i++) {
        const angle = (Math.PI * 2 / samples) * i;
        let maxDist = Math.max(width, height) * 2;
        
        this.cells.forEach(otherSite => {
          if (otherSite.id === site.id) return;
          
          const dx = otherSite.x - site.x;
          const dy = otherSite.y - site.y;
          const midX = (site.x + otherSite.x) / 2;
          const midY = (site.y + otherSite.y) / 2;
          
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
        
        maxDist = Math.min(maxDist, site.size * INTRO.CELL_SPREAD);
        
        const x = site.x + Math.cos(angle) * maxDist;
        const y = site.y + Math.sin(angle) * maxDist;
        
        polygon.push({
          x: Math.max(-padding, Math.min(width + padding, x)),
          y: Math.max(-padding, Math.min(height + padding, y))
        });
      }
      
      diagram.push({ site, polygon });
    });
    
    return diagram;
  }
  
  addCrack(x, y) {
    const now = Date.now();
    
    let foundNearby = false;
    this.cells.forEach(cell => {
      const dist = Math.sqrt((cell.x - x) ** 2 + (cell.y - y) ** 2);
      if (dist < 120) {
        cell.size = Math.min(cell.size + 0.35, INTRO.CELL_MAX_SIZE);
        cell.growth += INTRO.GROWTH_PER_CLICK;
        cell.lastClick = now;
        foundNearby = true;
      }
    });
    
    if (!foundNearby) {
      for (let i = 0; i < INTRO.INITIAL_CELLS; i++) {
        const angle = (Math.PI * 2 / INTRO.INITIAL_CELLS) * i + Math.random() * 0.4;
        const distance = Math.random() * 40;
        
        this.cells.push({
          id: this.nextCellId++,
          x: x + Math.cos(angle) * distance,
          y: y + Math.sin(angle) * distance,
          size: 0.35,
          growth: INTRO.GROWTH_PER_CLICK,
          lastClick: now
        });
      }
    }
    
    this.draw();
  }
  
  update(deltaTime) {
    const now = Date.now();
    let changed = false;
    
    this.cells.forEach(cell => {
      const timeSinceClick = (now - cell.lastClick) / 1000;
      
      if (timeSinceClick > INTRO.DECAY_DELAY) {
        if (cell.size > 0.05) {
          cell.size -= deltaTime * INTRO.CELL_GROWTH_RATE * 0.4;
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
    
    this.cells = this.cells.filter(c => c.size > 0.05 && c.growth > 0);
    
    if (changed) {
      this.draw();
    }
  }
  
  getDestructionPercent() {
    const totalGrowth = this.cells.reduce((sum, c) => sum + c.growth, 0);
    return Math.min(totalGrowth / INTRO.DESTRUCTION_THRESHOLD, 1);
  }
  
  shatterAnimation(onComplete) {
    console.log('💥 Starting shatter animation...');
    
    const duration = INTRO.SHATTER_DURATION * 1000;
    const startTime = Date.now();
    const shatterPieces = [];
    
    // Créer morceaux basés sur les cellules
    this.cells.forEach(cell => {
      shatterPieces.push({
        x: cell.x,
        y: cell.y,
        vx: (Math.random() - 0.5) * 900,
        vy: (Math.random() - 0.5) * 900 - 250,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 10,
        size: cell.size * 90,
        opacity: 1
      });
    });
    
    // Ajouter morceaux supplémentaires
    const targetCount = Math.max(30, this.cells.length * 2);
    while (shatterPieces.length < targetCount) {
      shatterPieces.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 900,
        vy: (Math.random() - 0.5) * 900 - 250,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 10,
        size: 40 + Math.random() * 120,
        opacity: 1
      });
    }
    
    const mirrorColor = this.isDark ? '#393F4A' : '#F2DDB8';
    const crackColor = this.isDark ? '#F2DDB8' : '#393F4A';
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Fade du canvas
      this.opacity = 1 - progress;
      
      shatterPieces.forEach(piece => {
        piece.x += piece.vx * 0.016;
        piece.y += piece.vy * 0.016;
        piece.vy += 600 * 0.016; // Gravité
        piece.rotation += piece.rotationSpeed * 0.016;
        piece.opacity = (1 - progress) * (1 - progress);
        
        this.ctx.save();
        this.ctx.translate(piece.x, piece.y);
        this.ctx.rotate(piece.rotation);
        this.ctx.globalAlpha = piece.opacity;
        
        // Forme irrégulière
        this.ctx.beginPath();
        const sides = 5 + Math.floor(Math.random() * 3);
        for (let i = 0; i < sides; i++) {
          const angle = (Math.PI * 2 / sides) * i;
          const r = piece.size * (0.5 + Math.random() * 0.5);
          const px = Math.cos(angle) * r;
          const py = Math.sin(angle) * r;
          if (i === 0) this.ctx.moveTo(px, py);
          else this.ctx.lineTo(px, py);
        }
        this.ctx.closePath();
        
        this.ctx.fillStyle = mirrorColor;
        this.ctx.fill();
        
        this.ctx.strokeStyle = crackColor;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        this.ctx.restore();
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        console.log('✅ Shatter animation complete');
        this.remove();
        if (onComplete) onComplete();
      }
    };
    
    animate();
  }
  
  fadeOut(duration = INTRO.FADE_DURATION) {
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
  
  remove() {
    if (this.canvas?.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}
