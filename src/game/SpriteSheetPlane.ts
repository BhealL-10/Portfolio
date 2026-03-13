import * as THREE from 'three';

export interface SpriteSheetLayout {
  columns: number;
  rows: number;
}

export class SpriteSheetPlane {
  private static readonly loader = new THREE.TextureLoader();
  private static readonly textureCache = new Map<string, THREE.Texture>();
  readonly group = new THREE.Group();
  readonly mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private texture: THREE.Texture;
  private readonly layout: SpriteSheetLayout;
  private currentFrame = -1;

  constructor(config: {
    textureUrl: string;
    layout: SpriteSheetLayout;
    width: number;
    height: number;
    alphaTest?: number;
    doubleSided?: boolean;
    offsetY?: number;
    renderOrder?: number;
  }) {
    this.layout = config.layout;
    this.texture = SpriteSheetPlane.getTexture(config.textureUrl, config.layout);

    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(config.width, config.height),
      new THREE.MeshBasicMaterial({
        map: this.texture,
        transparent: true,
        alphaTest: config.alphaTest ?? 0.04,
        side: config.doubleSided ? THREE.DoubleSide : THREE.FrontSide,
        depthWrite: false
      })
    );
    this.mesh.position.y = config.offsetY ?? 0;
    this.mesh.renderOrder = config.renderOrder ?? 10;
    this.group.add(this.mesh);
    this.setFrame(0);
  }

  static preload(textureUrl: string, layout: SpriteSheetLayout) {
    SpriteSheetPlane.getTexture(textureUrl, layout);
  }

  setVisible(visible: boolean) {
    this.group.visible = visible;
  }

  setScale(scale: number) {
    this.group.scale.setScalar(scale);
  }

  setFrame(frameIndex: number) {
    if (frameIndex === this.currentFrame) {
      return;
    }
    this.currentFrame = frameIndex;
    const { columns, rows } = this.layout;
    const column = frameIndex % columns;
    const rowFromTop = Math.floor(frameIndex / columns);
    this.texture.offset.set(column / columns, 1 - (rowFromTop + 1) / rows);
  }

  playLoop(frameIndices: number[], framesPerSecond: number, elapsedTime: number) {
    if (frameIndices.length === 0) {
      return;
    }
    const frame = Math.floor(elapsedTime * Math.max(0.01, framesPerSecond)) % frameIndices.length;
    this.setFrame(frameIndices[frame]!);
  }

  setTexture(textureUrl: string) {
    const nextTexture = SpriteSheetPlane.getTexture(textureUrl, this.layout);
    if (nextTexture === this.texture) {
      return;
    }
    this.texture = nextTexture;
    this.mesh.material.map = nextTexture;
    this.mesh.material.needsUpdate = true;
    this.currentFrame = -1;
    this.setFrame(0);
  }

  private static getTexture(textureUrl: string, layout: SpriteSheetLayout) {
    const cached = this.textureCache.get(textureUrl);
    if (cached) {
      return cached;
    }

    const texture = this.loader.load(textureUrl);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1 / layout.columns, 1 / layout.rows);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    this.textureCache.set(textureUrl, texture);
    return texture;
  }
}
