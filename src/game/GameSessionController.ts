import * as THREE from 'three';
import { clamp, damp } from '../core/math';
import type { ThemeMode } from '../types/content';
import { CameraRailController } from './CameraRailController';
import { CoinSystem, type CoinMarker } from './CoinSystem';
import { EnemySystem, type EnemyMarker } from './EnemySystem';
import { GamePathSystem } from './GamePathSystem';
import type {
  AcquisitionFeedback,
  BranchChoice,
  BranchLabelHint,
  GameHudSnapshot,
  GameHudState,
  GameSessionState,
  MomentumState,
  ResolvedGamePathNode,
  VisiblePlatformVisual
} from './gameSessionTypes';
import {
  applyItemToRunState,
  buildUpgradeOffers,
  createRunUpgradeState,
  type RogueliteItemOffer,
  type RunUpgradeState
} from './roguelite';
import { RunStatsSystem } from './RunStatsSystem';
import { resolveRuntimeNode } from './ShardRuntimeResolver';
import { ShopSystem } from './ShopSystem';
import { BossSystem } from './BossSystem';

type PlayerMotionState = 'attached' | 'charging' | 'airborne';
type ChoiceMode = 'none' | 'reward_branch' | 'shop_orbit';

const PLAYER_CAPTURE_PADDING = 1.05;
const GAME_ACCENT = '#D9624E';
const DANGER_ACCENT = '#F06A5A';
const REWARD_ACCENT = '#E8A86E';

function wrapAngle(angle: number) {
  const tau = Math.PI * 2;
  return ((angle % tau) + tau) % tau;
}

function shortestAngleDistance(a: number, b: number) {
  const tau = Math.PI * 2;
  const diff = ((a - b + Math.PI) % tau + tau) % tau - Math.PI;
  return diff;
}

interface OrbitSample {
  position: THREE.Vector2;
  tangent: THREE.Vector2;
}

export class GameSessionController {
  private readonly root = new THREE.Group();
  private readonly player = new THREE.Group();
  private readonly playerBody: THREE.Mesh<THREE.ConeGeometry, THREE.MeshBasicMaterial>;
  private readonly playerTrail = new THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  private readonly trailPoints = Array.from({ length: 8 }, () => new THREE.Vector3());
  private readonly trailBuffer = new Float32Array(this.trailPoints.length * 3);
  private readonly path = new GamePathSystem();
  private readonly camera = new CameraRailController();
  private readonly stats = new RunStatsSystem();
  private readonly coins: CoinSystem;
  private readonly enemies: EnemySystem;
  private readonly shop: ShopSystem;
  private readonly boss: BossSystem;
  private readonly scoreListeners = new Set<() => void>();
  private readonly playerPosition = new THREE.Vector3();
  private readonly playerVelocity = new THREE.Vector3();
  private readonly playerVelocityTarget = new THREE.Vector3();
  private readonly scratchVector = new THREE.Vector3();
  private readonly scratchVectorB = new THREE.Vector3();
  private readonly scratchVector2 = new THREE.Vector2();
  private readonly hudSnapshot: GameHudSnapshot = {
    state: 'transition',
    score: 0,
    highscore: 0,
    distanceMeters: 0,
    bestDistanceMeters: 0,
    coins: 0,
    splitTimes: {},
    chargeRatio: 0,
    momentumGauge: 0,
    momentumTier: 0,
    offers: [],
    branchHints: [],
    acquisition: null
  };
  private readonly momentum: MomentumState = {
    gauge: 0,
    fillRate: 0,
    decayRate: 0.12,
    speedMultiplier: 1,
    jumpMultiplier: 1,
    cameraZoomMultiplier: 0
  };
  private state: GameSessionState = 'idle';
  private playerState: PlayerMotionState = 'attached';
  private currentTime = 0;
  private attachedIndex = 0;
  private score = 0;
  private chargeActive = false;
  private chargeMeter = 0;
  private orbitAngle = Math.PI * 0.18;
  private orbitDirection: -1 | 1 = -1;
  private angularSpeed = 0;
  private lastLandingDirection: -1 | 1 | 0 = 0;
  private choiceMode: ChoiceMode = 'none';
  private activeChoices: BranchChoice[] = [];
  private activeShopAngles: number[] = [];
  private acquisition: AcquisitionFeedback | null = null;
  private acquisitionStartedAt = 0;
  private acquisitionDuration = 0.9;
  private runUpgrades: RunUpgradeState = createRunUpgradeState();
  private remainingExtraJumps = 0;
  private phaseJumpReadyAt = 0;
  private teleportReadyAt = 0;
  private warpReadyAt = 0;
  private shieldCharges = 0;
  private eventCooldownUntil = 0;
  private autoFireReadyAt = 0;

  constructor(scene: THREE.Scene, theme: ThemeMode) {
    this.playerBody = new THREE.Mesh(
      new THREE.ConeGeometry(0.42, 1.18, 6),
      new THREE.MeshBasicMaterial({ color: theme === 'dark' ? '#D4BF9B' : '#393F4A' })
    );
    this.playerBody.rotation.z = -Math.PI / 2;
    this.player.add(this.playerBody);
    this.player.visible = false;
    this.root.add(this.player);

    const trailGeometry = new THREE.BufferGeometry();
    trailGeometry.setAttribute('position', new THREE.BufferAttribute(this.trailBuffer, 3));
    this.playerTrail = new THREE.Line(
      trailGeometry,
      new THREE.LineBasicMaterial({
        color: theme === 'dark' ? '#D4BF9B' : '#393F4A',
        transparent: true,
        opacity: 0.42
      })
    );
    this.playerTrail.visible = false;
    this.root.add(this.playerTrail);

    scene.add(this.root);
    this.coins = new CoinSystem(scene, theme);
    this.enemies = new EnemySystem(scene, theme);
    this.shop = new ShopSystem(scene, theme);
    this.boss = new BossSystem(scene, theme);
  }

  get currentState() {
    return this.state;
  }

  get currentScore() {
    return this.score;
  }

  get bestScore() {
    return this.stats.getSnapshot().bestShards;
  }

  setTheme(theme: ThemeMode) {
    this.playerBody.material.color.set(theme === 'dark' ? '#D4BF9B' : '#393F4A');
    this.playerTrail.material.color.set(theme === 'dark' ? '#D4BF9B' : '#393F4A');
    this.coins.setTheme(theme);
    this.enemies.setTheme(theme);
    this.shop.setTheme(theme);
    this.boss.setTheme(theme);
  }

  onScoreChange(callback: () => void) {
    this.scoreListeners.add(callback);
    return () => this.scoreListeners.delete(callback);
  }

  startTransition() {
    this.resetRunState();
    this.path.reset();
    this.path.prebuild(180);
    this.camera.reset(this.getResolvedNode(0));
    this.state = 'transition_in';
    this.root.visible = true;
    this.player.visible = false;
    this.playerTrail.visible = false;
  }

  beginRun() {
    const reusePreparedPath = this.state === 'transition_in';
    this.resetRunState();
    if (!reusePreparedPath) {
      this.path.reset();
      this.path.prebuild(180);
    }
    this.root.visible = true;
    this.player.visible = true;
    this.playerTrail.visible = true;
    this.attachToNode(0, false, null, null);
    this.camera.reset(this.getResolvedNode(0));
    this.state = 'running_attached';
    this.emitScore();
  }

  restart() {
    this.beginRun();
  }

  prepareReturnTransition() {
    this.state = 'transition_out';
    this.chargeActive = false;
    this.choiceMode = 'none';
    this.activeChoices = [];
    this.shop.reset();
    this.boss.reset();
    this.coins.reset();
    this.enemies.reset();
    this.player.visible = false;
    this.playerTrail.visible = false;
  }

  stop() {
    this.state = 'idle';
    this.root.visible = false;
    this.player.visible = false;
    this.playerTrail.visible = false;
    this.shop.reset();
    this.boss.reset();
    this.coins.reset();
    this.enemies.reset();
    this.camera.reset(this.getResolvedNode(0));
  }

  resetRunState() {
    this.stats.reset(performance.now());
    this.score = 0;
    this.chargeActive = false;
    this.chargeMeter = 0;
    this.choiceMode = 'none';
    this.activeChoices = [];
    this.activeShopAngles = [];
    this.acquisition = null;
    this.acquisitionStartedAt = 0;
    this.currentTime = 0;
    this.attachedIndex = 0;
    this.lastLandingDirection = 0;
    this.playerState = 'attached';
    this.orbitAngle = Math.PI * 0.18;
    this.orbitDirection = -1;
    this.angularSpeed = 0;
    this.playerPosition.set(0, 0, 0);
    this.playerVelocity.set(0, 0, 0);
    this.playerVelocityTarget.set(0, 0, 0);
    this.runUpgrades = createRunUpgradeState();
    this.remainingExtraJumps = 0;
    this.phaseJumpReadyAt = 0;
    this.teleportReadyAt = 0;
    this.warpReadyAt = 0;
    this.shieldCharges = 0;
    this.eventCooldownUntil = 0;
    this.autoFireReadyAt = 0;
    this.momentum.gauge = 0;
    this.momentum.fillRate = 0;
    this.momentum.decayRate = 0.12;
    this.momentum.speedMultiplier = 1;
    this.momentum.jumpMultiplier = 1;
    this.momentum.cameraZoomMultiplier = 0;
    this.playerTrail.geometry.setDrawRange(0, this.trailPoints.length);
    this.trailPoints.forEach((point) => point.set(0, 0, 0));
    this.coins.reset();
    this.enemies.reset();
    this.shop.reset();
    this.boss.reset();
  }

  getInitialPlatformPositions(count: number) {
    this.path.prebuild(Math.max(160, count + 60));
    return this.path.getInitialNodes(count).map((node) => new THREE.Vector3(node.x, node.y, node.z));
  }

  getInitialPlatformScales(count: number) {
    this.path.prebuild(Math.max(160, count + 60));
    return this.path.getInitialNodes(count).map((node) => node.visualScale);
  }

  getVisiblePlatformPositions(count: number) {
    return this.getDisplayNodes(count).map((node) => new THREE.Vector3(node.resolvedX, node.resolvedY, node.resolvedZ));
  }

  getVisiblePlatformScales(count: number) {
    return this.getDisplayNodes(count).map((node) => node.visualScale);
  }

  getVisiblePlatformVisuals(count: number): VisiblePlatformVisual[] {
    return this.getDisplayNodes(count).map((node) => ({
      scale: new THREE.Vector3(
        node.visualScale * node.visualStretch.x,
        node.visualScale * node.visualStretch.y,
        node.visualScale * node.visualStretch.z
      ),
      shapeKind: node.shapeKind,
      spinDirection: node.spinDirection,
      spinSpeed: node.spinSpeed,
      spinPhase: node.resolvedSpinPhase,
      tint:
        node.colorHint === 'danger'
          ? DANGER_ACCENT
          : node.colorHint === 'reward'
            ? REWARD_ACCENT
            : node.colorHint === 'accent'
              ? GAME_ACCENT
              : null,
      pulse: node.isMilestone || node.eventType !== 'none' ? 0.34 : clamp(this.momentum.gauge * 0.22, 0, 0.22)
    }));
  }

  setChargeActive(active: boolean) {
    if (this.state === 'idle' || this.state === 'transition_in' || this.state === 'transition_out' || this.state === 'game_over') {
      return false;
    }

    if (active) {
      this.chargeActive = true;
      if (this.playerState === 'attached') {
        this.playerState = 'charging';
        if (this.state === 'running_attached') {
          this.state = 'running_charging';
        }
      }
      return false;
    }

    const shouldLaunch =
      this.chargeActive &&
      (this.playerState === 'charging' || this.playerState === 'attached') &&
      (this.state === 'running_charging' || this.state === 'running_attached' || this.state === 'upgrade_branching');

    this.chargeActive = false;
    if (shouldLaunch) {
      return this.launch();
    }
    return false;
  }

  triggerJump() {
    if (this.state === 'idle' || this.state === 'transition_in' || this.state === 'transition_out' || this.state === 'game_over') {
      return false;
    }
    if (this.playerState === 'attached' || this.playerState === 'charging') {
      this.chargeActive = false;
      return this.launch();
    }
    return this.performAirAction();
  }

  selectUpgradeFallback(index: number) {
    if (this.state !== 'upgrade_branching') return false;

    if (this.choiceMode === 'shop_orbit') {
      const offer = this.activeChoices[index];
      if (!offer || offer.price === undefined) return false;
      if (!this.stats.spendCoins(offer.price)) return false;
      this.applyOffer(offer.offer, 'Shop item');
      this.shop.reset();
      this.choiceMode = 'none';
      this.activeChoices = [];
      this.state = 'upgrade_acquired';
      this.eventCooldownUntil = this.currentTime + 0.6;
      return true;
    }

    if (this.choiceMode !== 'reward_branch') return false;
    return this.commitRewardBranch(index, true);
  }

  getCameraPose() {
    return this.camera.getPose();
  }

  getHudState(): GameHudSnapshot {
    const normalizedGauge = clamp(this.momentum.gauge / Math.max(1, this.runUpgrades.modifiers.momentumCap), 0, 1);
    this.stats.fillHud(this.hudSnapshot);
    this.hudSnapshot.state = this.getHudStateValue();
    this.hudSnapshot.chargeRatio = clamp(this.chargeMeter, 0, 1);
    this.hudSnapshot.momentumGauge = normalizedGauge;
    this.hudSnapshot.momentumTier = Math.min(4, Math.floor(normalizedGauge * 5));
    this.hudSnapshot.offers = this.activeChoices.map((choice) => choice.offer);
    this.hudSnapshot.branchHints = this.getBranchHints();
    this.hudSnapshot.acquisition = this.acquisition;
    return this.hudSnapshot;
  }

  update(deltaTime: number, elapsedTime: number) {
    if (this.state === 'idle') return;
    this.currentTime = elapsedTime;

    if (this.state === 'transition_in' || this.state === 'transition_out') {
      this.updateMomentum(deltaTime);
      return;
    }

    this.path.ensureAhead(this.attachedIndex);
    this.updateMomentum(deltaTime);

    const currentNode = this.getResolvedNode(this.attachedIndex);
    const nextNode = this.getResolvedNode(this.attachedIndex + 1);

    if (this.playerState === 'airborne') {
      this.updateAirborne(deltaTime, currentNode);
    } else {
      this.updateAttached(deltaTime, currentNode);
    }

    this.updateEvents(deltaTime, elapsedTime, currentNode);
    this.updateCamera(deltaTime, currentNode, nextNode);
    this.updateTrail(deltaTime);
    this.syncPlayerVisual(elapsedTime);
    this.syncMarkers(elapsedTime);

    if (this.state !== 'game_over') {
      if (this.camera.isOutsideViewport(this.playerPosition, 0.01) || this.camera.isBehindSafeLine(this.playerPosition)) {
        this.failRun();
      } else if (this.playerState !== 'airborne' && this.camera.isBehindSafeLine(new THREE.Vector3(currentNode.resolvedX, currentNode.resolvedY, 0))) {
        this.failRun();
      }
    }

    if (this.acquisition) {
      const progress = clamp((elapsedTime - this.acquisitionStartedAt) / this.acquisitionDuration, 0, 1);
      this.acquisition.progress = progress;
      if (progress >= 1) {
        this.acquisition = null;
      }
    }
  }

  private getHudStateValue(): GameHudState {
    if (this.state === 'game_over') return 'game_over';
    if (this.state === 'transition_in' || this.state === 'transition_out') return 'transition';
    if (this.state === 'upgrade_branching') return 'upgrade_choice';
    return 'running';
  }

  private emitScore() {
    this.scoreListeners.forEach((listener) => listener());
  }

  private getResolvedNode(index: number) {
    return this.path.getResolvedNode(Math.max(0, index), this.currentTime, this.attachedIndex);
  }

  private getDisplayNodes(count: number) {
    if (this.choiceMode === 'reward_branch' && this.activeChoices.length > 0) {
      const nodes: ResolvedGamePathNode[] = [this.getResolvedNode(this.attachedIndex)];
      this.activeChoices.forEach((choice) => {
        choice.previewNodes.slice(0, 3).forEach((node) => {
          nodes.push(resolveRuntimeNode(node, this.currentTime, this.attachedIndex));
        });
      });
      while (nodes.length < count) {
        const fallbackIndex = this.attachedIndex + Math.max(1, nodes.length - 8);
        nodes.push(this.getResolvedNode(fallbackIndex));
      }
      return nodes.slice(0, count);
    }

    const start = Math.max(0, this.attachedIndex - 1);
    return this.path.getWindow(start, count, this.currentTime, this.attachedIndex);
  }

  private updateMomentum(deltaTime: number) {
    const decayModifier = 1 - Math.min(0.72, this.runUpgrades.modifiers.momentumRetention);
    const decay = this.momentum.decayRate * decayModifier;
    this.momentum.gauge = clamp(this.momentum.gauge - decay * deltaTime, 0, 1);

    const speedTarget = 1 + this.momentum.gauge * 0.6 + this.runUpgrades.modifiers.speedBonus;
    const jumpTarget = 1 + this.momentum.gauge * 0.48 + this.runUpgrades.modifiers.chargedLeapBonus * 0.12;
    const cameraZoomTarget = this.momentum.gauge * 1.4;

    this.momentum.speedMultiplier = damp(this.momentum.speedMultiplier, speedTarget, 2.4, deltaTime);
    this.momentum.jumpMultiplier = damp(this.momentum.jumpMultiplier, jumpTarget, 2.6, deltaTime);
    this.momentum.cameraZoomMultiplier = damp(this.momentum.cameraZoomMultiplier, cameraZoomTarget, 2.2, deltaTime);
    this.momentum.fillRate = damp(this.momentum.fillRate, 0, 4.6, deltaTime);
  }

  private updateAttached(deltaTime: number, currentNode: ResolvedGamePathNode) {
    const orbit = this.getOrbitSample(currentNode, this.orbitAngle);
    const orbitRadius = Math.max(1, orbit.position.length());
    const baselineAngular = (Math.PI * 2) / Math.max(1.6, currentNode.gameplayOrbitPeriod);
    const chargeBoost = this.chargeActive ? 0.55 + this.chargeMeter * 0.45 : 0;
    const targetAngular =
      baselineAngular *
      (1 + chargeBoost + this.momentum.gauge * 0.42) *
      this.momentum.speedMultiplier *
      (1 + this.runUpgrades.modifiers.chargeRate * 0.06 + this.runUpgrades.modifiers.speedBonus * 0.3);

    this.angularSpeed = damp(this.angularSpeed, targetAngular, this.chargeActive ? 2.6 : 1.7, deltaTime);
    this.orbitAngle = wrapAngle(this.orbitAngle + this.orbitDirection * this.angularSpeed * deltaTime);

    const liveOrbit = this.getOrbitSample(currentNode, this.orbitAngle);
    this.playerPosition.set(currentNode.resolvedX + liveOrbit.position.x, currentNode.resolvedY + liveOrbit.position.y, currentNode.resolvedZ);
    this.playerVelocity.set(
      liveOrbit.tangent.x * orbitRadius * this.angularSpeed * this.orbitDirection,
      liveOrbit.tangent.y * orbitRadius * this.angularSpeed * this.orbitDirection,
      0
    );

    if (this.chargeActive) {
      const chargeRate = 0.55 + this.runUpgrades.modifiers.chargeRate * 0.24;
      this.chargeMeter = clamp(this.chargeMeter + deltaTime * chargeRate, 0, 1);
      if (this.state === 'running_attached') {
        this.state = 'running_charging';
      }
      if (this.playerState === 'attached') {
        this.playerState = 'charging';
      }
    } else {
      this.chargeMeter = damp(this.chargeMeter, 0, 4.2, deltaTime);
      if (this.playerState === 'charging') {
        this.playerState = 'attached';
      }
      if (this.state === 'running_charging') {
        this.state = 'running_attached';
      }
    }

    this.collectCoinsOnCurrentNode(currentNode);
    this.resolveEnemyContact(currentNode);

    if (this.choiceMode === 'shop_orbit' && this.shop.isOpen()) {
      const purchase = this.shop.tryPurchase(this.orbitAngle, this.stats.getSnapshot().coins);
      if (purchase && this.stats.spendCoins(purchase.price)) {
        this.applyOffer(purchase.offer, 'Shop item');
        this.choiceMode = 'none';
        this.activeChoices = [];
        this.state = 'upgrade_acquired';
        this.eventCooldownUntil = this.currentTime + 0.6;
      }
    }
  }

  private updateAirborne(deltaTime: number, currentNode: ResolvedGamePathNode) {
    const gravityScale = clamp(1 - this.runUpgrades.modifiers.glideFactor * 0.55, 0.18, 1);
    this.playerVelocity.y -= 6.8 * gravityScale * deltaTime;
    this.playerVelocity.x += this.runUpgrades.modifiers.airControl * deltaTime * 0.4;
    this.playerPosition.addScaledVector(this.playerVelocity, deltaTime);

    if (this.choiceMode === 'reward_branch' && this.activeChoices.length > 0) {
      for (let index = 0; index < this.activeChoices.length; index += 1) {
        const choice = this.activeChoices[index];
        if (!choice) continue;
        const entry = resolveRuntimeNode(choice.entry, this.currentTime, this.attachedIndex);
        if (this.canCaptureNode(entry)) {
          this.commitRewardBranch(index, false);
          this.attachToNode(this.attachedIndex + 1, true, this.playerPosition, this.playerVelocity);
          return;
        }
      }
    }

    const searchLimit = Math.min(this.attachedIndex + 8, this.attachedIndex + 1 + 8);
    for (let index = this.attachedIndex + 1; index <= searchLimit; index += 1) {
      const node = this.getResolvedNode(index);
      if (this.canCaptureNode(node)) {
        this.attachToNode(index, true, this.playerPosition, this.playerVelocity);
        return;
      }
    }

    if (this.runUpgrades.modifiers.phaseJump && this.currentTime >= this.phaseJumpReadyAt) {
      const rescueIndex = this.attachedIndex + 1;
      const rescueNode = this.getResolvedNode(rescueIndex);
      const rescueDistance = this.playerPosition.distanceToSquared(
        this.scratchVector.set(rescueNode.resolvedX, rescueNode.resolvedY, rescueNode.resolvedZ)
      );
      const rescueRadius = (rescueNode.gameplayRadius + this.runUpgrades.modifiers.phaseJumpRescueRadius) ** 2;
      if (rescueDistance < rescueRadius) {
        this.phaseJumpReadyAt = this.currentTime + this.runUpgrades.modifiers.phaseJumpCooldown;
        this.attachToNode(rescueIndex, true, this.playerPosition, this.playerVelocity);
        return;
      }
    }

    if (this.teleportReadyAt <= this.currentTime && this.runUpgrades.modifiers.teleportRange > 0) {
      const teleportTarget = this.path.getTeleportTarget(this.attachedIndex, this.runUpgrades.modifiers.teleportRange);
      if (teleportTarget > this.attachedIndex + 1 && this.playerPosition.x < this.camera.getSafeLeft() + 2.4) {
        this.teleportReadyAt = this.currentTime + this.runUpgrades.modifiers.teleportCooldown;
        this.attachToNode(teleportTarget, false, null, null);
      }
    }

    if (this.warpReadyAt <= this.currentTime && this.runUpgrades.modifiers.warpRange > 0) {
      const warpTarget = this.path.getTeleportTarget(this.attachedIndex, this.runUpgrades.modifiers.warpRange);
      if (warpTarget > this.attachedIndex + 3 && this.playerPosition.x < this.camera.getSafeLeft() + 1.6) {
        this.warpReadyAt = this.currentTime + this.runUpgrades.modifiers.warpCooldown;
        this.attachToNode(warpTarget, false, null, null);
      }
    }

    if (this.camera.isOutsideViewport(this.playerPosition, 0.01) || this.camera.isBehindSafeLine(this.playerPosition)) {
      this.failRun();
      return;
    }

    this.resolveAirborneEnemyContact(currentNode);
  }

  private launch() {
    if (this.playerState !== 'attached' && this.playerState !== 'charging') return false;

    const currentNode = this.getResolvedNode(this.attachedIndex);
    const orbit = this.getOrbitSample(currentNode, this.orbitAngle);
    const tangent = this.scratchVector
      .set(orbit.tangent.x * this.orbitDirection, orbit.tangent.y * this.orbitDirection, 0)
      .normalize();
    const radial = this.scratchVectorB
      .set(orbit.position.x, orbit.position.y, 0)
      .normalize();
    const orbitSpeed = Math.max(1, orbit.position.length()) * this.angularSpeed;
    const launchSpeed =
      (orbitSpeed * 0.92 + 5.2 + this.chargeMeter * 8.5 * (1 + this.runUpgrades.modifiers.chargedLeapBonus)) *
      this.momentum.jumpMultiplier *
      this.runUpgrades.modifiers.jumpPower *
      (1 + this.runUpgrades.modifiers.speedBonus * 0.35);

    this.playerVelocity.copy(tangent.multiplyScalar(launchSpeed)).addScaledVector(radial, launchSpeed * 0.08);
    this.playerState = 'airborne';
    this.state = this.choiceMode === 'reward_branch' ? 'upgrade_branching' : 'running_airborne';
    this.remainingExtraJumps = Math.max(0, this.runUpgrades.modifiers.extraJumps);
    this.chargeMeter = 0;
    return true;
  }

  private performAirAction() {
    if (this.playerState !== 'airborne') return false;
    if (this.runUpgrades.modifiers.infiniteFlaps || this.remainingExtraJumps > 0) {
      if (!this.runUpgrades.modifiers.infiniteFlaps) {
        this.remainingExtraJumps -= 1;
      }
      const impulse = 4.2 + this.runUpgrades.modifiers.jumpPower * 1.6;
      this.playerVelocity.y = Math.max(this.playerVelocity.y, 0) + impulse;
      this.playerVelocity.x += 0.9 + this.momentum.gauge * 1.6;
      return true;
    }
    return false;
  }

  private attachToNode(index: number, preserveMomentum: boolean, landingPosition: THREE.Vector3 | null, incomingVelocity: THREE.Vector3 | null) {
    const node = this.getResolvedNode(index);
    this.attachedIndex = index;
    this.score = Math.max(this.score, index);
    this.stats.recordLanding(index, node.pathDistance, performance.now());
    this.emitScore();

    let nextAngle = this.orbitAngle;
    let nextDirection: -1 | 1 = index === 0 ? -1 : this.orbitDirection;
    let nextAngularSpeed = (Math.PI * 2) / Math.max(1.4, node.gameplayOrbitPeriod);

    if (preserveMomentum && landingPosition && incomingVelocity) {
      const attachment = this.findBestOrbitAttachment(node, landingPosition);
      nextAngle = attachment.angle;
      const directionDot = attachment.tangent.dot(this.scratchVector2.set(incomingVelocity.x, incomingVelocity.y));
      nextDirection = directionDot >= 0 ? 1 : -1;
      const tangentialSpeed = Math.abs(directionDot);
      const radius = Math.max(1.2, attachment.position.length());
      nextAngularSpeed = clamp(
        tangentialSpeed / radius,
        (Math.PI * 2) / Math.max(1.4, node.gameplayOrbitPeriod) * 0.72,
        (Math.PI * 2) / Math.max(1.1, node.gameplayOrbitPeriod) * 2.2
      );
      this.rewardMomentum(nextDirection, tangentialSpeed, node);
    } else {
      nextAngle = index === 0 ? Math.PI * 0.18 : 0;
      nextDirection = index === 0 ? -1 : this.orbitDirection;
    }

    this.orbitAngle = nextAngle;
    this.orbitDirection = nextDirection;
    this.angularSpeed = nextAngularSpeed;
    this.playerState = 'attached';
    this.state = 'running_attached';
    this.chargeActive = false;
    this.chargeMeter = 0;
    this.remainingExtraJumps = Math.max(0, this.runUpgrades.modifiers.extraJumps);

    const liveOrbit = this.getOrbitSample(node, this.orbitAngle);
    this.playerPosition.set(node.resolvedX + liveOrbit.position.x, node.resolvedY + liveOrbit.position.y, node.resolvedZ);
    this.playerVelocity.set(0, 0, 0);

    this.collectCoinsOnCurrentNode(node);
    this.resolveEnemyContact(node);

    if (this.currentTime >= this.eventCooldownUntil) {
      this.resolveNodeEvent(node);
    }
  }

  private rewardMomentum(direction: -1 | 1, tangentialSpeed: number, node: ResolvedGamePathNode) {
    const baseline = clamp((tangentialSpeed - 4.2) / 7.5, 0, 1);
    const opposite = this.lastLandingDirection !== 0 && direction !== this.lastLandingDirection;
    const fill =
      0.08 +
      baseline * 0.16 +
      (opposite ? 0.18 : 0) +
      (node.shapeKind === 'triangular' ? 0.03 : node.shapeKind === 'oval' ? 0.015 : 0);

    this.momentum.gauge = clamp(
      this.momentum.gauge + fill * (1 + this.runUpgrades.modifiers.momentumGain),
      0,
      Math.max(1, this.runUpgrades.modifiers.momentumCap)
    );
    this.momentum.fillRate = fill;
    this.lastLandingDirection = direction;
  }

  private resolveNodeEvent(node: ResolvedGamePathNode) {
    if (node.isMilestone) {
      const offers = buildUpgradeOffers(node.index, this.runUpgrades);
      this.activeChoices = this.path.createUpgradeBranches(node.index, offers, this.score);
      this.choiceMode = 'reward_branch';
      this.state = 'upgrade_branching';
      this.eventCooldownUntil = this.currentTime + 0.2;
      return;
    }

    switch (node.eventType) {
      case 'shop': {
        this.shop.openForRun(node.index, this.runUpgrades);
        const shopOffers = this.shop.getActiveOffers().slice(0, 3);
        this.activeChoices = shopOffers.map((shopOffer) => ({
          mode: 'shop_orbit',
          offer: shopOffer.offer,
          price: shopOffer.price,
          entry: node,
          previewNodes: [],
          pathNodes: []
        }));
        this.activeShopAngles = shopOffers.map((shopOffer) => shopOffer.angle);
        this.choiceMode = 'shop_orbit';
        this.state = 'upgrade_branching';
        this.eventCooldownUntil = this.currentTime + 0.2;
        break;
      }
      case 'treasure':
        this.stats.addCoins(this.applyCoinBonus(5));
        this.startAcquisition(this.activeChoices[0]?.offer ?? this.buildVirtualOffer('Treasure Chest', 'common', 'TRE', 'Gain 5 coins.'), 'Treasure');
        break;
      case 'gift': {
        const offer = buildUpgradeOffers(node.index, this.runUpgrades)[0];
        if (offer) {
          this.applyOffer(offer, 'Gift shard');
        }
        break;
      }
      case 'rare_item': {
        const offer = buildUpgradeOffers(Math.max(100, node.index), this.runUpgrades)[0];
        if (offer) {
          this.applyOffer(offer, 'Rare item');
        }
        break;
      }
      case 'mini_boss':
      case 'boss':
        this.boss.start(this.currentTime);
        break;
      case 'boss_weak':
        if (this.boss.isWeakPointPhase()) {
          this.boss.defeat();
          this.stats.addCoins(this.applyCoinBonus(8));
          this.fillMomentumBurst(0.24);
        }
        break;
      case 'none':
      default:
        break;
    }
  }

  private commitRewardBranch(index: number, viaFallback: boolean) {
    const choice = this.activeChoices[index];
    if (!choice) return false;

    this.path.replaceFuture(this.attachedIndex, choice.pathNodes);
    this.path.ensureAhead(this.attachedIndex + 1, 50, 40);
    this.path.queuePostMilestoneEvents(this.attachedIndex + choice.pathNodes.length, this.attachedIndex + choice.pathNodes.length);
    this.applyOffer(choice.offer, viaFallback ? 'Quick choice' : 'Path chosen');
    this.choiceMode = 'none';
    this.activeChoices = [];
    this.state = 'upgrade_acquired';
    this.eventCooldownUntil = this.currentTime + 0.35;
    return true;
  }

  private applyOffer(offer: RogueliteItemOffer, subtitle: string) {
    this.runUpgrades = applyItemToRunState(this.runUpgrades, offer.item.id);
    this.remainingExtraJumps = Math.max(0, this.runUpgrades.modifiers.extraJumps);
    this.shieldCharges = Math.max(this.shieldCharges, this.runUpgrades.modifiers.shieldCharges);
    this.startAcquisition(offer, subtitle);
  }

  private startAcquisition(offer: RogueliteItemOffer, subtitle: string) {
    this.acquisitionStartedAt = this.currentTime;
    this.acquisition = {
      offer,
      progress: 0,
      subtitle
    };
  }

  private buildVirtualOffer(name: string, rarity: RogueliteItemOffer['item']['rarity'], icon: string, description: string): RogueliteItemOffer {
    return {
      item: {
        id: `virtual-${icon}`,
        rarity,
        category: 'economy',
        icon,
        unlockScore: 0,
        stackable: false,
        maxStacks: 1,
        effects: ['virtual'],
        name: { fr: name, en: name },
        description: { fr: description, en: description }
      },
      stackCount: 0
    };
  }

  private updateEvents(deltaTime: number, elapsedTime: number, currentNode: ResolvedGamePathNode) {
    const bossUpdate = this.boss.update(deltaTime, elapsedTime, this.playerPosition);
    if (bossUpdate.playerHit) {
      this.failRun();
    }

    if (this.boss.isWeakPointPhase()) {
      const weakNode = this.findVisibleWeakPoint();
      if (weakNode) {
        this.boss.setWeakPoint(new THREE.Vector3(weakNode.resolvedX, weakNode.resolvedY, weakNode.resolvedZ));
      }
    }

    if (this.state === 'upgrade_acquired' && elapsedTime >= this.eventCooldownUntil) {
      this.state = this.playerState === 'airborne' ? 'running_airborne' : this.chargeActive ? 'running_charging' : 'running_attached';
    }

    this.updateAutoFire(elapsedTime);
    this.shop.update(new THREE.Vector3(currentNode.resolvedX, currentNode.resolvedY, currentNode.resolvedZ), currentNode.gameplayRadius + 0.7, elapsedTime);
  }

  private updateCamera(deltaTime: number, currentNode: ResolvedGamePathNode, nextNode: ResolvedGamePathNode) {
    const largeShardFactor = clamp((currentNode.visualScale - 2.8) / 28, 0, 1.2);
    const milestoneZoom = currentNode.isGigantic ? 9.2 : 0;
    const choiceZoom = this.choiceMode === 'reward_branch' ? 5.8 : this.choiceMode === 'shop_orbit' ? 2.4 : this.state === 'upgrade_acquired' ? 1.8 : 0;
    const bossZoom = this.boss.getCameraZoomOffset();
    const speedPressure = (this.boss.isActive() ? this.boss.getSpeedPressure() : 1) * this.momentum.speedMultiplier;
    this.camera.update({
      deltaTime,
      state: this.state,
      score: this.score,
      currentNode,
      nextNode,
      playerPosition: this.playerPosition,
      momentumGauge: clamp(this.momentum.gauge, 0, 1),
      largeShardFactor,
      milestoneZoom,
      choiceZoom,
      bossZoom,
      speedPressure: speedPressure * (1 - this.runUpgrades.modifiers.timeSlowFactor * 0.55)
    });
  }

  private updateTrail(deltaTime: number) {
    void deltaTime;
    for (let index = this.trailPoints.length - 1; index > 0; index -= 1) {
      this.trailPoints[index].copy(this.trailPoints[index - 1]);
    }
    this.trailPoints[0].copy(this.playerPosition);
    this.trailPoints.forEach((point, index) => {
      this.trailBuffer[index * 3] = point.x;
      this.trailBuffer[index * 3 + 1] = point.y;
      this.trailBuffer[index * 3 + 2] = point.z;
    });
    const geometry = this.playerTrail.geometry.getAttribute('position');
    geometry.needsUpdate = true;
    this.playerTrail.material.opacity = 0.24 + this.momentum.gauge * 0.36;
  }

  private syncPlayerVisual(elapsedTime: number) {
    this.player.position.copy(this.playerPosition);
    const heading = Math.atan2(this.playerVelocity.y || 0.001, this.playerVelocity.x || 0.001);
    this.player.rotation.z = heading;
    this.playerBody.scale.setScalar(1 + this.momentum.gauge * 0.12 + Math.sin(elapsedTime * 8) * 0.02);
  }

  private syncMarkers(elapsedTime: number) {
    const visibleNodes = this.getDisplayNodes(14);
    const coinMarkers: CoinMarker[] = [];
    const enemyMarkers: EnemyMarker[] = [];

    visibleNodes.forEach((node) => {
      node.coinSlots.forEach((slot) => {
        if (slot.collected) return;
        coinMarkers.push({
          position: this.getCoinWorldPosition(node, slot.angle, slot.orbitScale),
          scale: 0.74 + slot.value * 0.08,
          visible: true
        });
      });
      if (node.enemySlot?.alive) {
        enemyMarkers.push({
          position: this.getEnemyWorldPosition(node, node.enemySlot.pole),
          visible: true,
          tier: node.enemySlot.tier
        });
      }
    });

    this.coins.setVisible(this.state !== 'idle' && this.state !== 'transition_out');
    this.enemies.setVisible(this.state !== 'idle' && this.state !== 'transition_out');
    this.coins.update(coinMarkers, elapsedTime);
    this.enemies.update(enemyMarkers, elapsedTime);
  }

  private fillMomentumBurst(amount: number) {
    this.momentum.gauge = clamp(this.momentum.gauge + amount * (1 + this.runUpgrades.modifiers.momentumGain), 0, Math.max(1, this.runUpgrades.modifiers.momentumCap));
    this.momentum.fillRate = Math.max(this.momentum.fillRate, amount);
  }

  private collectCoinsOnCurrentNode(node: ResolvedGamePathNode) {
    node.coinSlots.forEach((slot) => {
      if (slot.collected) return;
      if (Math.abs(shortestAngleDistance(this.orbitAngle, slot.angle)) < 0.16 + this.runUpgrades.modifiers.coinMagnet * 0.08) {
        slot.collected = true;
        this.stats.addCoins(this.applyCoinBonus(slot.value));
      }
    });
  }

  private resolveEnemyContact(node: ResolvedGamePathNode) {
    const enemy = node.enemySlot;
    if (!enemy || !enemy.alive) return;
    const enemyPosition = this.getEnemyWorldPosition(node, enemy.pole);
    if (enemyPosition.distanceTo(this.playerPosition) > node.gameplayRadius * 0.36 + 0.82) {
      return;
    }
    const impactSpeed = this.playerVelocity.length();
    if (impactSpeed >= enemy.speedThreshold || this.runUpgrades.modifiers.spikeOrbit) {
      enemy.alive = false;
      this.stats.addCoins(this.applyCoinBonus(enemy.rewardCoins));
      this.fillMomentumBurst(0.05);
      return;
    }
    this.consumeProtectionOrFail();
  }

  private resolveAirborneEnemyContact(currentNode: ResolvedGamePathNode) {
    for (let index = this.attachedIndex + 1; index <= this.attachedIndex + 4; index += 1) {
      const node = this.getResolvedNode(index);
      const enemy = node.enemySlot;
      if (!enemy || !enemy.alive) continue;
      const enemyPosition = this.getEnemyWorldPosition(node, enemy.pole);
      if (enemyPosition.distanceTo(this.playerPosition) > 1.2) continue;
      const speed = this.playerVelocity.length();
      if (speed >= enemy.speedThreshold * 0.75 || node === currentNode) {
        enemy.alive = false;
        this.stats.addCoins(this.applyCoinBonus(enemy.rewardCoins));
        this.fillMomentumBurst(0.08);
      } else {
        this.consumeProtectionOrFail();
      }
      return;
    }
  }

  private consumeProtectionOrFail() {
    if (this.shieldCharges > 0) {
      this.shieldCharges -= 1;
      this.fillMomentumBurst(0.04);
      return;
    }
    this.failRun();
  }

  private updateAutoFire(elapsedTime: number) {
    if (this.runUpgrades.modifiers.autoCannonLevel <= 0) return;
    if (elapsedTime < this.autoFireReadyAt) return;

    for (let index = this.attachedIndex; index < this.attachedIndex + 8; index += 1) {
      const node = this.getResolvedNode(index);
      const enemy = node.enemySlot;
      if (!enemy || !enemy.alive || enemy.tier === 'invincible') continue;
      const position = this.getEnemyWorldPosition(node, enemy.pole);
      if (position.distanceTo(this.playerPosition) > 8.2) continue;
      enemy.alive = false;
      this.stats.addCoins(this.applyCoinBonus(enemy.rewardCoins));
      this.fillMomentumBurst(0.04 + this.runUpgrades.modifiers.autoCannonLevel * 0.01);
      this.autoFireReadyAt = elapsedTime + Math.max(2.2, 5 - this.runUpgrades.modifiers.autoCannonLevel * 1.1);
      return;
    }
  }

  private applyCoinBonus(baseValue: number) {
    const doubled = this.runUpgrades.modifiers.doubleCoin ? baseValue * 2 : baseValue;
    return Math.max(1, Math.round(doubled * (1 + this.runUpgrades.modifiers.coinBonus)));
  }

  private failRun() {
    if (this.state === 'game_over') return;
    this.state = 'game_over';
    this.chargeActive = false;
    this.choiceMode = 'none';
    this.activeChoices = [];
    this.shop.reset();
    this.emitScore();
  }

  private canCaptureNode(node: ResolvedGamePathNode) {
    const captureRadius = node.gameplayRadius + PLAYER_CAPTURE_PADDING + this.runUpgrades.modifiers.captureRadius;
    const dx = this.playerPosition.x - node.resolvedX;
    const dy = this.playerPosition.y - node.resolvedY;
    return dx * dx + dy * dy <= captureRadius * captureRadius;
  }

  private findBestOrbitAttachment(node: ResolvedGamePathNode, worldPosition: THREE.Vector3) {
    let bestAngle = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    let bestPosition = new THREE.Vector2();
    let bestTangent = new THREE.Vector2(1, 0);

    for (let step = 0; step < 72; step += 1) {
      const angle = (step / 72) * Math.PI * 2;
      const sample = this.getOrbitSample(node, angle);
      const worldX = node.resolvedX + sample.position.x;
      const worldY = node.resolvedY + sample.position.y;
      const distance = (worldPosition.x - worldX) ** 2 + (worldPosition.y - worldY) ** 2;
      if (distance < bestDistance) {
        bestDistance = distance;
        bestAngle = angle;
        bestPosition = sample.position.clone();
        bestTangent = sample.tangent.clone();
      }
    }

    return {
      angle: bestAngle,
      position: bestPosition,
      tangent: bestTangent
    };
  }

  private getOrbitSample(node: ResolvedGamePathNode, angle: number): OrbitSample {
    const parameter = wrapAngle(angle);
    const rotation = node.shapeKind === 'round' ? 0 : node.resolvedSpinPhase;
    const baseRadius = node.gameplayRadius + PLAYER_CAPTURE_PADDING;

    if (node.shapeKind === 'oval') {
      const rx = baseRadius * 1.46;
      const ry = baseRadius * 0.84;
      const position = new THREE.Vector2(Math.cos(parameter) * rx, Math.sin(parameter) * ry);
      const tangent = new THREE.Vector2(-Math.sin(parameter) * rx, Math.cos(parameter) * ry).normalize();
      return this.rotateOrbitSample(position, tangent, rotation);
    }

    if (node.shapeKind === 'triangular') {
      const radius = baseRadius * 1.18;
      const vertices = [
        new THREE.Vector2(0, radius * 1.2),
        new THREE.Vector2(-radius * 1.04, -radius * 0.86),
        new THREE.Vector2(radius * 1.04, -radius * 0.86)
      ];
      const normalized = parameter / (Math.PI * 2);
      const segmentFloat = normalized * 3;
      const segment = Math.floor(segmentFloat) % 3;
      const localT = segmentFloat - Math.floor(segmentFloat);
      const start = vertices[segment]!;
      const end = vertices[(segment + 1) % 3]!;
      const position = start.clone().lerp(end, localT);
      const tangent = end.clone().sub(start).normalize();
      return this.rotateOrbitSample(position, tangent, rotation);
    }

    const position = new THREE.Vector2(Math.cos(parameter) * baseRadius, Math.sin(parameter) * baseRadius);
    const tangent = new THREE.Vector2(-Math.sin(parameter), Math.cos(parameter));
    return this.rotateOrbitSample(position, tangent, 0);
  }

  private rotateOrbitSample(position: THREE.Vector2, tangent: THREE.Vector2, rotation: number): OrbitSample {
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    return {
      position: new THREE.Vector2(position.x * cos - position.y * sin, position.x * sin + position.y * cos),
      tangent: new THREE.Vector2(tangent.x * cos - tangent.y * sin, tangent.x * sin + tangent.y * cos).normalize()
    };
  }

  private getCoinWorldPosition(node: ResolvedGamePathNode, angle: number, orbitScale: number) {
    const orbit = this.getOrbitSample(node, angle);
    return new THREE.Vector3(
      node.resolvedX + orbit.position.x * orbitScale,
      node.resolvedY + orbit.position.y * orbitScale,
      node.resolvedZ
    );
  }

  private getEnemyWorldPosition(node: ResolvedGamePathNode, pole: 'north' | 'south') {
    const local = new THREE.Vector2(0, (pole === 'north' ? 1 : -1) * (node.gameplayRadius + 0.58));
    const rotation = node.shapeKind === 'round' ? 0 : node.resolvedSpinPhase;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    return new THREE.Vector3(
      node.resolvedX + local.x * cos - local.y * sin,
      node.resolvedY + local.x * sin + local.y * cos,
      node.resolvedZ
    );
  }

  private getBranchHints(): BranchLabelHint[] {
    if (this.choiceMode === 'reward_branch') {
      return this.activeChoices.slice(0, 3).map((choice, index) => {
        const preview = choice.previewNodes[0] ?? choice.entry;
        return {
          slot: index as 0 | 1 | 2,
          offer: choice.offer,
          worldPosition: new THREE.Vector3(preview.x, preview.y + (index === 1 ? 2.4 : index === 0 ? 3.2 : -3.2), preview.z),
          mode: 'reward_branch'
        };
      });
    }

    if (this.choiceMode === 'shop_orbit' && this.activeChoices.length > 0) {
      const node = this.getResolvedNode(this.attachedIndex);
      return this.activeChoices.slice(0, 3).map((choice, index) => {
        const angle = this.activeShopAngles[index] ?? 0;
        const radius = node.gameplayRadius + 2.1;
        return {
          slot: index as 0 | 1 | 2,
          offer: choice.offer,
          worldPosition: new THREE.Vector3(
            node.resolvedX + Math.cos(angle) * radius,
            node.resolvedY + Math.sin(angle) * radius,
            node.resolvedZ
          ),
          mode: 'shop_orbit',
          price: choice.price
        };
      });
    }

    return [];
  }

  private findVisibleWeakPoint() {
    for (let index = this.attachedIndex + 1; index < this.attachedIndex + 18; index += 1) {
      const node = this.getResolvedNode(index);
      if (node.eventType === 'boss_weak') {
        return node;
      }
    }
    return null;
  }
}
