import * as THREE from 'three';
import { getSharedTextureAsset } from '../core/browserAssetCache';

export interface SpriteSheetLayout {
  columns: number;
  rows: number;
}

export class SpriteSheetPlane {
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
    return getSharedTextureAsset(textureUrl, {
      colorSpace: THREE.SRGBColorSpace,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      repeatX: 1 / layout.columns,
      repeatY: 1 / layout.rows,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      generateMipmaps: true
    });
  }
}
