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
    this.fractures = [];  // Liste des fractures (groupes de cellules)
    this.nextCellId = 0;
    this.nextFractureId = 0;
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
    
    // Vérifier si le clic est sur une fracture existante
    let targetFracture = null;
    for (const fracture of this.fractures) {
      const dist = Math.sqrt((fracture.centerX - x) ** 2 + (fracture.centerY - y) ** 2);
      if (dist < INTRO.FRACTURE_DETECTION_RADIUS) {
        targetFracture = fracture;
        break;
      }
    }
    
    if (targetFracture) {
      // Clic sur fracture existante: ajouter des cellules à cette fracture
      console.log(`🔨 Clic sur fracture existante #${targetFracture.id}, ajout de ${INTRO.CELLS_PER_CLICK} cellules`);
      
      for (let i = 0; i < INTRO.CELLS_PER_CLICK; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * INTRO.CELL_SPREAD * 0.5;
        
        const newCell = {
          id: this.nextCellId++,
          x: targetFracture.centerX + Math.cos(angle) * distance,
          y: targetFracture.centerY + Math.sin(angle) * distance,
          size: 1.0,
          fractureId: targetFracture.id,
          createdAt: now
        };
        
        this.cells.push(newCell);
        targetFracture.cellIds.push(newCell.id);
      }
      
      targetFracture.lastClick = now;
      targetFracture.cellCount += INTRO.CELLS_PER_CLICK;
      
    } else {
      // Nouveau clic: créer une nouvelle fracture
      const fractureId = this.nextFractureId++;
      console.log(`✨ Nouvelle fracture #${fractureId} à (${Math.round(x)}, ${Math.round(y)})`);
      
      const newFracture = {
        id: fractureId,
        centerX: x,
        centerY: y,
        cellIds: [],
        cellCount: INTRO.CELLS_PER_CLICK,
        createdAt: now,
        lastClick: now
      };
      
      // Créer les cellules initiales autour du point de clic
      for (let i = 0; i < INTRO.CELLS_PER_CLICK; i++) {
        const angle = (Math.PI * 2 / INTRO.CELLS_PER_CLICK) * i + Math.random() * 0.3;
        const distance = Math.random() * 50 + 20;
        
        const newCell = {
          id: this.nextCellId++,
          x: x + Math.cos(angle) * distance,
          y: y + Math.sin(angle) * distance,
          size: 1.0,
          fractureId: fractureId,
          createdAt: now
        };
        
        this.cells.push(newCell);
        newFracture.cellIds.push(newCell.id);
      }
      
      this.fractures.push(newFracture);
    }
    
    this.draw();
  }
  
  update(deltaTime) {
    const now = Date.now();
    let changed = false;
    
    // Appliquer le decay: supprimer des cellules progressivement
    const cellsToRemove = Math.floor(deltaTime * INTRO.DECAY_RATE);
    
    if (cellsToRemove > 0 && this.cells.length > 0) {
      // Trouver les cellules les plus anciennes pour les supprimer
      const sortedCells = [...this.cells].sort((a, b) => a.createdAt - b.createdAt);
      
      for (let i = 0; i < Math.min(cellsToRemove, sortedCells.length); i++) {
        const cellToRemove = sortedCells[i];
        const fracture = this.fractures.find(f => f.id === cellToRemove.fractureId);
        
        if (fracture) {
          const timeSinceLastClick = (now - fracture.lastClick) / 1000;
          
          // Ne supprimer que si le délai de decay est passé
          if (timeSinceLastClick > INTRO.DECAY_DELAY) {
            // Supprimer la cellule
            const cellIndex = this.cells.findIndex(c => c.id === cellToRemove.id);
            if (cellIndex !== -1) {
              this.cells.splice(cellIndex, 1);
              changed = true;
              
              // Mettre à jour la fracture
              fracture.cellCount--;
              fracture.cellIds = fracture.cellIds.filter(id => id !== cellToRemove.id);
            }
          }
        }
      }
    }
    
    // Supprimer les fractures vides
    this.fractures = this.fractures.filter(f => f.cellCount > 0);
    
    if (changed) {
      this.draw();
    }
  }
  
  getDestructionPercent() {
    // Pourcentage basé sur le nombre total de cellules
    return Math.min(this.cells.length / INTRO.DESTRUCTION_THRESHOLD, 1);
  }
  
  shatterAnimation(onComplete) {
    console.log('💥 Starting Voronoi shatter animation...');
    
    const duration = INTRO.SHATTER_DURATION * 1000;
    const startTime = Date.now();
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    // Calculer le diagramme Voronoi final pour obtenir les polygones
    const voronoiDiagram = this.computeVoronoi(w, h);
    
    // Créer des fragments basés sur les cellules Voronoi
    const fragments = voronoiDiagram.map(cell => {
      // Calculer le centre du polygone
      let centerX = 0, centerY = 0;
      cell.polygon.forEach(point => {
        centerX += point.x;
        centerY += point.y;
      });
      centerX /= cell.polygon.length;
      centerY /= cell.polygon.length;
      
      // Direction d'explosion depuis le centre de l'écran
      const dx = centerX - w / 2;
      const dy = centerY - h / 2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const normalizedDx = distance > 0 ? dx / distance : 0;
      const normalizedDy = distance > 0 ? dy / distance : 0;
      
      return {
        polygon: cell.polygon.map(p => ({x: p.x, y: p.y})),
        centerX: centerX,
        centerY: centerY,
        vx: normalizedDx * (300 + Math.random() * 400),
        vy: normalizedDy * (300 + Math.random() * 400) - 200,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 8,
        opacity: 1
      };
    });
    
    const mirrorColor = this.isDark ? '#393F4A' : '#F2DDB8';
    const crackColor = this.isDark ? '#F2DDB8' : '#393F4A';
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const deltaTime = 0.016;
      
      this.ctx.clearRect(0, 0, w, h);
      
      // Fade du canvas
      this.opacity = 1 - progress;
      
      fragments.forEach(fragment => {
        // Appliquer physique
        fragment.centerX += fragment.vx * deltaTime;
        fragment.centerY += fragment.vy * deltaTime;
        fragment.vy += 800 * deltaTime; // Gravité
        fragment.rotation += fragment.rotationSpeed * deltaTime;
        fragment.opacity = (1 - progress) * (1 - progress);
        
        // Calculer offset pour chaque point du polygone
        const offsetX = fragment.centerX - fragment.polygon[0].x;
        const offsetY = fragment.centerY - fragment.polygon[0].y;
        
        this.ctx.save();
        this.ctx.translate(fragment.centerX, fragment.centerY);
        this.ctx.rotate(fragment.rotation);
        this.ctx.globalAlpha = fragment.opacity;
        
        // Dessiner le polygone Voronoi
        this.ctx.beginPath();
        fragment.polygon.forEach((point, i) => {
          const localX = point.x - fragment.polygon[0].x;
          const localY = point.y - fragment.polygon[0].y;
          
          if (i === 0) {
            this.ctx.moveTo(localX, localY);
          } else {
            this.ctx.lineTo(localX, localY);
          }
        });
        this.ctx.closePath();
        
        // Remplissage
        this.ctx.fillStyle = mirrorColor;
        this.ctx.fill();
        
        // Bordure
        this.ctx.strokeStyle = crackColor;
        this.ctx.lineWidth = 2.5;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.stroke();
        
        this.ctx.restore();
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        console.log('✅ Voronoi shatter animation complete');
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
