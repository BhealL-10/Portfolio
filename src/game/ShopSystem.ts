import * as THREE from 'three';
import type { ThemeMode } from '../types/content';
import { buildUpgradeOffers, type RogueliteItemOffer, type RunUpgradeState } from './roguelite';
import type { BranchChoice } from './gameSessionTypes';

const ACCENT = '#D9624E';

interface ActiveShopOffer {
  angle: number;
  price: number;
  purchased: boolean;
  offer: RogueliteItemOffer;
}

export class ShopSystem {
  private readonly group = new THREE.Group();
  private readonly loader = new THREE.TextureLoader();
  private readonly pool: THREE.Sprite[] = [];
  private activeOffers: ActiveShopOffer[] = [];
  private open = false;

  constructor(scene: THREE.Scene, theme: ThemeMode) {
    for (let index = 0; index < 3; index += 1) {
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          color: new THREE.Color(theme === 'dark' ? '#ffffff' : '#f2e8d6'),
          transparent: true,
          opacity: 0.96
        })
      );
      sprite.visible = false;
      sprite.renderOrder = 28;
      this.pool.push(sprite);
      this.group.add(sprite);
    }
    this.group.visible = false;
    scene.add(this.group);
  }

  setTheme(theme: ThemeMode) {
    const color = new THREE.Color(theme === 'dark' ? '#ffffff' : '#f2e8d6');
    this.pool.forEach((sprite) => sprite.material.color.copy(color));
  }

  reset() {
    this.open = false;
    this.activeOffers = [];
    this.group.visible = false;
    this.pool.forEach((mesh) => {
      mesh.visible = false;
    });
  }

  openForRun(score: number, runState: RunUpgradeState) {
    const discount = Math.max(0, Math.min(0.45, runState.modifiers.shopDiscount));
    const offers = buildUpgradeOffers(score, runState);
    this.activeOffers = offers.slice(0, 3).map((offer, index) => ({
      angle: Math.PI * (0.2 + index * 0.55),
      price: this.getPriceForOffer(offer, discount),
      purchased: false,
      offer
    }));
    this.activeOffers.forEach((activeOffer, index) => {
      const sprite = this.pool[index];
      if (!sprite) return;
      const material = sprite.material;
      material.map = this.loader.load(activeOffer.offer.item.hudIconSrc);
      if (material.map) {
        material.map.colorSpace = THREE.SRGBColorSpace;
      }
      material.needsUpdate = true;
    });
    this.open = this.activeOffers.length > 0;
    this.group.visible = this.open;
    return offers;
  }

  isOpen() {
    return this.open;
  }

  getActiveOffers() {
    return this.activeOffers.map((offer) => ({
      offer: offer.offer,
      price: offer.price,
      angle: offer.angle,
      purchased: offer.purchased
    }));
  }

  purchaseByIndex(index: number, coins: number) {
    if (!this.open) return null;
    const visibleOffers = this.activeOffers.filter((candidate) => !candidate.purchased);
    const offer = visibleOffers[index];
    if (!offer || offer.purchased || coins < offer.price) {
      return null;
    }
    offer.purchased = true;
    const remaining = this.activeOffers.some((candidate) => !candidate.purchased);
    this.open = remaining;
    this.group.visible = remaining;
    if (!remaining) {
      this.pool.forEach((mesh) => {
        mesh.visible = false;
      });
    }
    return {
      offer: offer.offer,
      price: offer.price
    };
  }

  getHints(worldPositions: THREE.Vector3[]): BranchChoice[] {
    return this.activeOffers.map((activeOffer, index) => ({
      mode: 'shop_orbit',
      offer: activeOffer.offer,
      price: activeOffer.price,
      entry: {
        index,
        x: worldPositions[index]?.x ?? 0,
        y: worldPositions[index]?.y ?? 0,
        z: worldPositions[index]?.z ?? 0,
        gameplayRadius: 0.5,
        visualScale: 0.5,
        pathDistance: 0,
        direction: 'right',
        kind: 'event',
        sizeTier: 'tiny',
        shapeKind: 'round',
        spinDirection: 'cw',
        spinSpeed: 0,
        motionPattern: 'none',
        eventType: 'shop',
        colorHint: 'accent',
        gameplayOrbitPeriod: 1,
        branchSlot: index as 0 | 1 | 2,
        offerId: activeOffer.offer.item.id,
        onboarding: false,
        isMilestone: false,
        isGigantic: false,
        coinSlots: [],
        enemySlot: null,
        motionSeed: 0,
        visualStretch: { x: 1, y: 1, z: 1 }
      },
      previewNodes: [],
      pathNodes: []
    }));
  }

  tryPurchase(currentAngle: number, coins: number) {
    if (!this.open) return null;

    for (let index = 0; index < this.activeOffers.length; index += 1) {
      const offer = this.activeOffers[index];
      if (!offer) continue;
      if (offer.purchased) continue;
      const delta = shortestAngleDistance(currentAngle, offer.angle);
      if (delta < 0.22 && coins >= offer.price) {
        return this.purchaseByIndex(index, coins);
      }
    }

    return null;
  }

  update(center: THREE.Vector3, radius: number, elapsedTime: number) {
    void center;
    void radius;
    void elapsedTime;
    if (!this.open) {
      this.group.visible = false;
      return;
    }
    this.group.visible = false;
    this.pool.forEach((mesh) => {
      mesh.visible = false;
    });
  }

  private close() {
    this.open = false;
    this.group.visible = false;
    this.pool.forEach((mesh) => {
      mesh.visible = false;
    });
  }

  private getPriceForOffer(offer: RogueliteItemOffer, discount: number) {
    const rarityPrice = offer.item.rarity === 'legendary' ? 11 : offer.item.rarity === 'epic' ? 8 : offer.item.rarity === 'rare' ? 5 : offer.item.rarity === 'uncommon' ? 3 : 2;
    return Math.max(1, Math.round((rarityPrice + offer.stackCount) * (1 - discount)));
  }
}

function shortestAngleDistance(a: number, b: number) {
  const diff = Math.abs((((a - b) % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2) - Math.PI);
  return diff;
}
