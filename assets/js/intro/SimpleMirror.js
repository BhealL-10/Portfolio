/**
 * SimpleMirror.js - Miroir Canvas 2D V5.0
 * Portfolio 3D - Effet de bris responsive
 */

import { INTRO, THEME, LAYERS, DEVICE, TYPOGRAPHY } from '../config/constants.js';

export class SimpleMirror {
  constructor(deviceManager) {
    this.deviceManager = deviceManager;
    this.canvas = null;
    this.ctx = null;
    this.cells = [];
    this.fractures = [];
    this.nextCellId = 0;
    this.nextFractureId = 0;
    this.isDark = document.documentElement.dataset.theme === 'dark';
    this.opacity = 1;
    this.logoImage = null;
    this.logoLoaded = false;
    
    this.createCanvas();
    this.setupThemeListener();
    this.loadLogo();
  }
  
  getDeviceConfig() {
    if (this.deviceManager) return this.deviceManager.getIntroConfig();
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isLandscape = width > height;
    
    if (width < DEVICE.BREAKPOINTS.MOBILE) return isLandscape ? INTRO.RESPONSIVE.MOBILE_LANDSCAPE : INTRO.RESPONSIVE.MOBILE;
    else if (width < DEVICE.BREAKPOINTS.TABLET) return isLandscape ? INTRO.RESPONSIVE.TABLET_LANDSCAPE : INTRO.RESPONSIVE.TABLET;
    else if (width < DEVICE.BREAKPOINTS.DESKTOP_LARGE) return INTRO.RESPONSIVE.DESKTOP;
    else return INTRO.RESPONSIVE.DESKTOP_LARGE;
  }
  
  getLogoConfig() {
    const width = window.innerWidth;
    if (width < DEVICE.BREAKPOINTS.MOBILE) return INTRO.LOGO.RESPONSIVE.MOBILE;
    else if (width < DEVICE.BREAKPOINTS.TABLET) return INTRO.LOGO.RESPONSIVE.TABLET;
    else return INTRO.LOGO.RESPONSIVE.DESKTOP;
  }
  
  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'mirror-canvas';
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100dvh;z-index:9999;pointer-events:auto;cursor:pointer;`;
    
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      
      // Update canvas style to use actual viewport height
      this.canvas.style.height = '100dvh';
      this.draw();
    });
    
    this.draw();
  }
  
  setupThemeListener() {
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.dataset.theme === 'dark';
      if (this.isDark !== newTheme) {
        this.isDark = newTheme;
        this.loadLogo();
      }
    });
    
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }
  
  loadLogo() {
    const logoPath = this.isDark ? INTRO.LOGO.DARK : INTRO.LOGO.LIGHT;
    const img = new Image();
    
    img.onload = () => {
      this.logoImage = img;
      this.logoLoaded = true;
      this.draw();
    };
    
    img.onerror = () => {
      this.logoLoaded = false;
      this.draw();
    };
    
    img.src = logoPath;
  }
  
  draw() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    ctx.clearRect(0, 0, w, h);
    
    const mirrorColor = this.isDark ? '#F2DDB8' : '#393F4A';
    const crackColor = this.isDark ? '#393F4A' : '#F2DDB8';
    
    ctx.fillStyle = mirrorColor;
    ctx.globalAlpha = this.opacity;
    ctx.fillRect(0, 0, w, h);
    
    if (this.opacity > 0.5) {
      const deviceConfig = this.getDeviceConfig();
      const logoConfig = this.getLogoConfig();
      const heroFontSize = deviceConfig.HERO_FONT_SIZE || 52;
      const subtitleFontSize = deviceConfig.SUBTITLE_FONT_SIZE || 22;
      
      const logoHeight = logoConfig.HEIGHT || INTRO.LOGO.HEIGHT;
      const logoWidth = logoConfig.WIDTH || INTRO.LOGO.WIDTH;
      const logoMargin = logoConfig.MARGIN_BOTTOM || INTRO.LOGO.MARGIN_BOTTOM;
      const totalLogoSpace = this.logoLoaded ? logoHeight + logoMargin : 0;
      
      if (this.logoLoaded && this.logoImage) {
        ctx.globalAlpha = this.opacity;
        const logoX = (w - logoWidth) / 2;
        const logoY = h / 2 - totalLogoSpace - (heroFontSize * 0.7);
        ctx.drawImage(this.logoImage, logoX, logoY, logoWidth, logoHeight);
      }
      
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = crackColor;
      ctx.font = `bold ${heroFontSize}px ${TYPOGRAPHY.PRIMARY_FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(INTRO.HERO_TEXT, w / 2, h / 2 - (heroFontSize * 0.7));
      
      ctx.font = `${subtitleFontSize}px ${TYPOGRAPHY.PRIMARY_FONT}`;
      ctx.globalAlpha = this.opacity;
      ctx.fillText(INTRO.HERO_SUBTITLE, w / 2, h / 2 + (heroFontSize * 0.5));
    }
    
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
            if (t > 0 && t < maxDist) maxDist = t;
          }
        });
        
        const deviceConfig = this.getDeviceConfig();
        const cellSpread = deviceConfig.CELL_SPREAD || INTRO.CELL_SPREAD;
        maxDist = Math.min(maxDist, site.size * cellSpread);
        
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
    const deviceConfig = this.getDeviceConfig();
    const detectionRadius = deviceConfig.FRACTURE_DETECTION_RADIUS || INTRO.FRACTURE_DETECTION_RADIUS;
    const cellSpread = deviceConfig.CELL_SPREAD || INTRO.CELL_SPREAD;
    const cellsPerClick = deviceConfig.CELLS_PER_CLICK || INTRO.CELLS_PER_CLICK;
    
    let targetFracture = null;
    for (const fracture of this.fractures) {
      const dist = Math.sqrt((fracture.centerX - x) ** 2 + (fracture.centerY - y) ** 2);
      if (dist < detectionRadius) {
        targetFracture = fracture;
        break;
      }
    }
    
    if (targetFracture) {
      for (let i = 0; i < cellsPerClick; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * cellSpread * 0.5;
        
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
      targetFracture.cellCount += cellsPerClick;
      
    } else {
      const fractureId = this.nextFractureId++;
      
      const newFracture = {
        id: fractureId,
        centerX: x,
        centerY: y,
        cellIds: [],
        cellCount: cellsPerClick,
        createdAt: now,
        lastClick: now
      };
      
      for (let i = 0; i < cellsPerClick; i++) {
        const angle = (Math.PI * 2 / cellsPerClick) * i + Math.random() * 0.3;
        const baseDistance = cellSpread * 0.3;
        const distance = Math.random() * baseDistance + (baseDistance * 0.4);
        
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
    
    const cellsToRemove = Math.floor(deltaTime * INTRO.DECAY_RATE);
    
    if (cellsToRemove > 0 && this.cells.length > 0) {
      const sortedCells = [...this.cells].sort((a, b) => a.createdAt - b.createdAt);
      
      for (let i = 0; i < Math.min(cellsToRemove, sortedCells.length); i++) {
        const cellToRemove = sortedCells[i];
        const fracture = this.fractures.find(f => f.id === cellToRemove.fractureId);
        
        if (fracture) {
          const timeSinceLastClick = (now - fracture.lastClick) / 1000;
          
          if (timeSinceLastClick > INTRO.DECAY_DELAY) {
            const cellIndex = this.cells.findIndex(c => c.id === cellToRemove.id);
            if (cellIndex !== -1) {
              this.cells.splice(cellIndex, 1);
              changed = true;
              
              fracture.cellCount--;
              fracture.cellIds = fracture.cellIds.filter(id => id !== cellToRemove.id);
            }
          }
        }
      }
    }
    
    this.fractures = this.fractures.filter(f => f.cellCount > 0);
    
    if (changed) this.draw();
  }
  
  getDestructionPercent() {
    return Math.min(this.cells.length / INTRO.DESTRUCTION_THRESHOLD, 1);
  }
  
  shatterAnimation(onComplete) {
    const duration = INTRO.SHATTER_DURATION * 1000;
    const startTime = Date.now();
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    const voronoiDiagram = this.computeVoronoi(w, h);
    
    const fragments = voronoiDiagram.map(cell => {
      let centerX = 0, centerY = 0;
      cell.polygon.forEach(point => {
        centerX += point.x;
        centerY += point.y;
      });
      centerX /= cell.polygon.length;
      centerY /= cell.polygon.length;
      
      const dx = centerX - w / 2;
      const dy = centerY - h / 2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const normalizedDx = distance > 0 ? dx / distance : 0;
      const normalizedDy = distance > 0 ? dy / distance : 0;
      
      return {
        polygon: cell.polygon.map(p => ({x: p.x, y: p.y})),
        centerX, centerY,
        vx: normalizedDx * (300 + Math.random() * 400),
        vy: normalizedDy * (300 + Math.random() * 400) - 200,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 8,
        opacity: 1
      };
    });
    
    const mirrorColor = this.isDark ? '#F2DDB8' : '#393F4A';
    const crackColor = this.isDark ? '#F2DDB8' : '#393F4A';
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const deltaTime = 0.016;
      
      this.ctx.clearRect(0, 0, w, h);
      
      this.opacity = 1 - progress;
      
      fragments.forEach(fragment => {
        fragment.centerX += fragment.vx * deltaTime;
        fragment.centerY += fragment.vy * deltaTime;
        fragment.vy += 800 * deltaTime;
        fragment.rotation += fragment.rotationSpeed * deltaTime;
        fragment.opacity = (1 - progress) * (1 - progress);
        
        this.ctx.save();
        this.ctx.translate(fragment.centerX, fragment.centerY);
        this.ctx.rotate(fragment.rotation);
        this.ctx.globalAlpha = fragment.opacity;
        
        this.ctx.beginPath();
        fragment.polygon.forEach((point, i) => {
          const localX = point.x - fragment.polygon[0].x;
          const localY = point.y - fragment.polygon[0].y;
          
          if (i === 0) this.ctx.moveTo(localX, localY);
          else this.ctx.lineTo(localX, localY);
        });
        this.ctx.closePath();
        
        this.ctx.fillStyle = mirrorColor;
        this.ctx.fill();
        
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
      
      if (progress < 1) requestAnimationFrame(animate);
      else this.remove();
    };
    
    animate();
  }
  
  remove() {
    if (this.canvas?.parentNode) this.canvas.parentNode.removeChild(this.canvas);
  }
}
