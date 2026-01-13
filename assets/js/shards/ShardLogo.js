import * as THREE from 'three';
import { SHARD_LOGO } from '../config/constants.js';
import { getLogoConfigForShard, getLogoPathForShard } from '../config/shardLogosConfig.js';

export class ShardLogo {
  constructor(scene, deviceManager, camera = null) {
    this.scene = scene;
    this.deviceManager = deviceManager;
    this.camera = camera;

    this.isDarkMode = document.documentElement.dataset.theme === 'dark';

    this.entries = new Map();
    this.textureLoader = new THREE.TextureLoader();

    this._setupThemeObserver();
  }

  setCamera(camera) {
    this.camera = camera;
  }

  _setupThemeObserver() {
    const observer = new MutationObserver(() => {
      const newThemeIsDark = document.documentElement.dataset.theme === 'dark';
      if (newThemeIsDark !== this.isDarkMode) {
        this.isDarkMode = newThemeIsDark;
        this.updateAllLogosTheme();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  _getResponsiveScale() {
    if (!this.deviceManager) return SHARD_LOGO.BASE_SCALE;
    if (this.deviceManager.isMobile) return SHARD_LOGO.RESPONSIVE.MOBILE.BASE_SCALE;
    if (this.deviceManager.isTablet) return SHARD_LOGO.RESPONSIVE.TABLET.BASE_SCALE;
    return SHARD_LOGO.RESPONSIVE.DESKTOP.BASE_SCALE;
  }

  _computeLogoPath(shardId) {
    const custom = getLogoPathForShard(shardId, this.isDarkMode);
    if (custom) return custom;
    return this.isDarkMode ? SHARD_LOGO.DARK : SHARD_LOGO.LIGHT;
  }

  async attachLogosToShard(shard) {
    if (!shard?.userData) return;

    const shardId = (shard.userData.index ?? 0) + 1;
    const customCfg = getLogoConfigForShard(shardId);
    if (customCfg && customCfg.enabled === false) return;

    const logoPath = this._computeLogoPath(shardId);
    const opacityBase = (customCfg?.opacity ?? SHARD_LOGO.OPACITY_IDLE);
    const scaleMultiplier = (customCfg?.scale ?? 1);

    let texture;
    try {
      texture = await this._loadTexture(logoPath);
    } catch (e) {
      return;
    }

    const baseScale = shard.userData.baseScale?.x ?? 2.2;
    const responsiveScale = this._getResponsiveScale();
    const logoSize = baseScale * responsiveScale * scaleMultiplier * 1.2;

    const logoPlanes = [];
    const angles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];

    angles.forEach((angle) => {
      const geometry = new THREE.PlaneGeometry(logoSize, logoSize, 32, 32);
      
      const positions = geometry.attributes.position;
      const radius = baseScale * 0.95;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const distFromCenter = Math.sqrt(x * x + y * y);
        const maxDist = logoSize / 2;
        const normalizedDist = Math.min(distFromCenter / maxDist, 1);
        const curveAmount = Math.sin(normalizedDist * Math.PI / 2) * 0.2;
        positions.setZ(i, curveAmount * baseScale);
      }
      
      geometry.computeVertexNormals();
      
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide,
        depthTest: true,
        depthWrite: false,
        alphaTest: 0.1
      });

      const plane = new THREE.Mesh(geometry, material);
      plane.renderOrder = 1;
      plane.position.set(
        Math.sin(angle) * baseScale * 1.10,
        0,
        Math.cos(angle) * baseScale * 1.10
      );
      plane.lookAt(0, 0, 0);
      plane.userData.isLogoPlane = true;
      plane.userData.angle = angle;

      shard.add(plane);
      logoPlanes.push(plane);
    });

    shard.userData.logo = {
      texture,
      planes: logoPlanes,
      baseOpacity: opacityBase,
      scaleMultiplier,
      targetOpacity: opacityBase,
      currentOpacity: opacityBase
    };

    this.entries.set(shardId, {
      shard,
      logoPath
    });
  }

  _loadTexture(src) {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        src,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = 4;
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          resolve(texture);
        },
        undefined,
        reject
      );
    });
  }

  updateLogoVisibility(shard, isCurrentShard, isFocused) {
    const logo = shard?.userData?.logo;
    if (!logo || !logo.planes) return;

    const baseOpacity = logo.baseOpacity ?? SHARD_LOGO.OPACITY_IDLE;
    const targetOpacity = (isCurrentShard || isFocused)
      ? SHARD_LOGO.OPACITY_HIDDEN
      : baseOpacity;

    logo.targetOpacity = targetOpacity;
    const current = logo.currentOpacity ?? baseOpacity;
    const next = current + (targetOpacity - current) * SHARD_LOGO.FADE_SPEED;
    logo.currentOpacity = next;

    if (!this.camera) {
      logo.planes.forEach((plane) => {
        plane.material.opacity = next;
        plane.visible = next > 0.01;
      });
      return;
    }

    const cameraWorldPos = new THREE.Vector3();
    this.camera.getWorldPosition(cameraWorldPos);
    
    const shardWorldPos = new THREE.Vector3();
    shard.getWorldPosition(shardWorldPos);
    
    const cameraToShard = new THREE.Vector3().subVectors(cameraWorldPos, shardWorldPos).normalize();

    logo.planes.forEach((plane) => {
      const planeWorldPos = new THREE.Vector3();
      plane.getWorldPosition(planeWorldPos);
      
      const shardToPlane = new THREE.Vector3().subVectors(planeWorldPos, shardWorldPos).normalize();
      
      const dotProduct = cameraToShard.dot(shardToPlane);
      
      const visibilityFactor = Math.max(0, dotProduct);
      const fadeThreshold = 0.15;
      const smoothVisibility = visibilityFactor > fadeThreshold 
        ? Math.min(1, (visibilityFactor - fadeThreshold) / (1 - fadeThreshold))
        : 0;
      
      const finalOpacity = next * smoothVisibility;
      
      plane.material.opacity = finalOpacity;
      plane.visible = finalOpacity > 0.01;
    });
  }

  async updateAllLogosTheme() {
    for (const [shardId, entry] of this.entries) {
      const shard = entry.shard;
      const logo = shard?.userData?.logo;
      if (!shard || !logo || !logo.planes) continue;

      const newPath = this._computeLogoPath(shardId);
      if (!newPath) continue;

      let texture;
      try {
        texture = await this._loadTexture(newPath);
      } catch (e) {
        continue;
      }

      logo.texture = texture;
      logo.planes.forEach((plane) => {
        plane.material.map = texture;
        plane.material.needsUpdate = true;
      });
      entry.logoPath = newPath;
    }
  }

  setTheme(isDarkMode) {
    const next = !!isDarkMode;
    if (next === this.isDarkMode) return;
    this.isDarkMode = next;
    this.updateAllLogosTheme();
  }

  setFocusActive(active) {
  }
}
