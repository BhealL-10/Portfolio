import * as THREE from 'three';
import { clamp, damp } from '../core/math';
import type { ThemeMode } from '../types/content';
import {
  applyItemToRunState,
  buildUpgradeOffers,
  createRunUpgradeState,
  getNextUpgradeMilestone,
  type RogueliteItemOffer,
  type RunUpgradeState
} from './roguelite';
import { GameCameraSystem } from './GameCameraSystem';
import { GamePathSystem } from './GamePathSystem';
import { getDifficultyProfile } from './difficultyScaler';
import type {
  AcquisitionFeedback,
  BranchChoice,
  BranchLabelHint,
  GameHudState,
  GameSessionState,
  MomentumState,
  ResolvedGamePathNode
} from './gameSessionTypes';

type MotionMode = 'attached' | 'charging' | 'airborne';

const PLAYER_BASE_RADIUS = 2.2;
const MAX_CHARGE = 1;

export class GameSessionController {
  private readonly player = new THREE.Group();
  private readonly playerBody: THREE.Mesh<THREE.ConeGeometry, THREE.MeshBasicMaterial>;
  private readonly playerWing: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;
  private readonly camera = new GameCameraSystem();
  private readonly path = new GamePathSystem();
  private readonly playerPosition = new THREE.Vector3();
  private readonly playerVelocity = new THREE.Vector3();
  private readonly scratchVector = new THREE.Vector3();
  private readonly scratchVectorB = new THREE.Vector3();
  private readonly scratchVectorC = new THREE.Vector3();
  private readonly scoreListeners = new Set<() => void>();
  private phase: 'idle' | 'transition_in' | 'running' | 'upgrade_branching' | 'upgrade_acquired' | 'game_over' | 'transition_out' = 'idle';
  private motionMode: MotionMode = 'attached';
  private currentTime = 0;
  private attachedAnchorIndex = 0;
  private visibleWindowStart = 0;
  private angle = -Math.PI * 0.42;
  private angularSpeed = -1.55;
  private orbitRadius = PLAYER_BASE_RADIUS;
  private orbitRadiusTarget = PLAYER_BASE_RADIUS;
  private chargeActive = false;
  private chargeMeter = 0;
  private score = 0;
  private highscore = Number(window.localStorage.getItem('portfolio-game-highscore') || 0);
  private runUpgrades: RunUpgradeState = createRunUpgradeState();
  private currentOffers: RogueliteItemOffer[] = [];
  private branchChoices: BranchChoice[] = [];
  private nextUpgradeMilestone = 10;
  private previousRotationDirection: -1 | 0 | 1 = -1;
  private momentumChain = 0;
  private momentumGauge = 0;
  private momentumGaugeSmoothed = 0;
  private readonly momentumState: MomentumState = {
    chainCount: 0,
    chainTier: 0,
    speedMultiplier: 1,
    jumpMultiplier: 1,
    cameraZoomMultiplier: 0,
    gauge: 0
  };
  private remainingExtraJumps = 0;
  private remainingAirDashes = 0;
  private phaseJumpReadyAt = 0;
  private teleportReadyAt = 0;
  private warpReadyAt = 0;
  private rocketReadyAt = 0;
  private flapReadyAt = 0;
  private lastAirDashAt = -100;
  private acquisition: AcquisitionFeedback | null = null;
  private acquisitionEndsAt = 0;

  constructor(private readonly scene: THREE.Scene, theme: ThemeMode) {
    this.playerBody = new THREE.Mesh(
      new THREE.ConeGeometry(0.45, 1.32, 7),
      new THREE.MeshBasicMaterial({ color: theme === 'dark' ? '#D4BF9B' : '#393F4A' })
    );
    this.playerBody.rotation.z = -Math.PI / 2;
    this.playerWing = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 0.88, 0.12),
      new THREE.MeshBasicMaterial({ color: theme === 'dark' ? '#D4BF9B' : '#393F4A' })
    );
    this.playerWing.position.set(-0.18, 0, 0);
    this.player.add(this.playerBody, this.playerWing);
    this.player.visible = false;
    this.scene.add(this.player);
  }

  setTheme(theme: ThemeMode) {
    const color = theme === 'dark' ? '#D4BF9B' : '#393F4A';
    this.playerBody.material.color.set(color);
    this.playerWing.material.color.set(color);
  }

  get currentState(): GameSessionState {
    if (this.phase === 'idle' || this.phase === 'transition_in' || this.phase === 'transition_out' || this.phase === 'upgrade_branching' || this.phase === 'upgrade_acquired' || this.phase === 'game_over') {
      return this.phase;
    }

    if (this.motionMode === 'charging') return 'running_charging';
    if (this.motionMode === 'airborne') return 'running_airborne';
    return 'running_attached';
  }

  get currentScore() {
    return this.score;
  }

  get bestScore() {
    return this.highscore;
  }

  onScoreChange(callback: () => void) {
    this.scoreListeners.add(callback);
    return () => this.scoreListeners.delete(callback);
  }

  startTransition() {
    this.resetRunState();
    this.path.reset();
    this.path.prebuild(180);
    const firstNode = this.path.getResolvedNode(0, 0, 0);
    this.camera.reset(firstNode);
    this.phase = 'transition_in';
    this.player.visible = false;
    this.emitScore();
  }

  beginRun() {
    this.resetRunState();
    this.path.prebuild(180);
    this.phase = 'running';
    this.player.visible = true;
    this.attachToNode(0, false);
    this.camera.reset(this.path.getResolvedNode(0, 0, 0));
    this.emitScore();
  }

  restart() {
    this.path.reset();
    this.beginRun();
  }

  prepareReturnTransition() {
    this.phase = 'transition_out';
    this.chargeActive = false;
    this.player.visible = false;
  }

  stop() {
    this.phase = 'idle';
    this.motionMode = 'attached';
    this.chargeActive = false;
    this.player.visible = false;
    this.currentOffers = [];
    this.branchChoices = [];
    this.acquisition = null;
  }

  resetRunState() {
    this.motionMode = 'attached';
    this.currentTime = 0;
    this.attachedAnchorIndex = 0;
    this.visibleWindowStart = 0;
    this.angle = -Math.PI * 0.42;
    this.angularSpeed = -1.55;
    this.orbitRadius = PLAYER_BASE_RADIUS;
    this.orbitRadiusTarget = PLAYER_BASE_RADIUS;
    this.chargeActive = false;
    this.chargeMeter = 0;
    this.score = 0;
    this.runUpgrades = createRunUpgradeState();
    this.currentOffers = [];
    this.branchChoices = [];
    this.nextUpgradeMilestone = 10;
    this.previousRotationDirection = -1;
    this.momentumChain = 0;
    this.momentumGauge = 0;
    this.momentumGaugeSmoothed = 0;
    this.momentumState.chainCount = 0;
    this.momentumState.chainTier = 0;
    this.momentumState.speedMultiplier = 1;
    this.momentumState.jumpMultiplier = 1;
    this.momentumState.cameraZoomMultiplier = 0;
    this.momentumState.gauge = 0;
    this.remainingExtraJumps = 0;
    this.remainingAirDashes = 0;
    this.phaseJumpReadyAt = 0;
    this.teleportReadyAt = 0;
    this.warpReadyAt = 0;
    this.rocketReadyAt = 0;
    this.flapReadyAt = 0;
    this.lastAirDashAt = -100;
    this.acquisition = null;
    this.acquisitionEndsAt = 0;
    this.playerPosition.set(0, 0, 0);
    this.playerVelocity.set(0, 0, 0);
  }

  update(deltaTime: number, elapsedTime: number) {
    if (this.phase === 'idle') return;
    this.currentTime = elapsedTime;
    const decayRate = this.motionMode === 'airborne' ? 0.05 : this.chargeActive ? 0.035 : 0.11;
    this.momentumGauge = Math.max(0, this.momentumGauge - deltaTime * decayRate);
    this.momentumGaugeSmoothed = damp(this.momentumGaugeSmoothed, this.momentumGauge, 2.1, deltaTime);
    const targetTier = this.momentumGaugeSmoothed < 0.2 ? 0 : this.momentumGaugeSmoothed < 0.45 ? 1 : this.momentumGaugeSmoothed < 0.72 ? 2 : 3;
    this.momentumState.chainCount = this.momentumChain;
    this.momentumState.chainTier = targetTier as 0 | 1 | 2 | 3;
    this.momentumState.gauge = this.momentumGaugeSmoothed;
    this.momentumState.speedMultiplier = damp(this.momentumState.speedMultiplier, 1 + this.momentumGaugeSmoothed * 0.52, 2.4, deltaTime);
    this.momentumState.jumpMultiplier = damp(this.momentumState.jumpMultiplier, 1 + this.momentumGaugeSmoothed * 0.36, 2.4, deltaTime);
    this.momentumState.cameraZoomMultiplier = damp(this.momentumState.cameraZoomMultiplier, this.momentumGaugeSmoothed * 2.4, 2.1, deltaTime);

    if (this.phase === 'transition_in' || this.phase === 'transition_out') {
      return;
    }

    this.path.ensureAhead(this.attachedAnchorIndex, 50, 120);

    if (this.motionMode === 'airborne') {
      this.updateAirborne(deltaTime);
    } else {
      this.updateAttached(deltaTime);
    }

    this.player.position.copy(this.playerPosition);
    this.updatePlayerVisuals();

    if (this.phase === 'running' || this.phase === 'upgrade_branching' || this.phase === 'upgrade_acquired') {
      const currentNode = this.getResolvedNode(this.attachedAnchorIndex);
      this.camera.update(deltaTime, this.currentState, this.score, this.path, currentNode, this.branchChoices, this.momentumState);
      this.enforceFailState(currentNode);
    }

    if (this.phase === 'upgrade_acquired' && this.currentTime >= this.acquisitionEndsAt) {
      this.phase = 'running';
      this.acquisition = null;
    }
  }

  setChargeActive(active: boolean) {
    if (!(this.phase === 'running' || this.phase === 'upgrade_branching' || this.phase === 'upgrade_acquired')) {
      return false;
    }

    if (active) {
      this.chargeActive = true;
      if (this.motionMode === 'attached') {
        this.motionMode = 'charging';
      }
      return false;
    }

    const shouldRelease = this.chargeActive && (this.motionMode === 'attached' || this.motionMode === 'charging');
    this.chargeActive = false;
    if (this.motionMode === 'charging') {
      this.motionMode = 'attached';
    }
    if (shouldRelease) {
      return this.launchFromCharge();
    }
    return false;
  }

  triggerJump() {
    if (!(this.phase === 'running' || this.phase === 'upgrade_branching' || this.phase === 'upgrade_acquired')) {
      return false;
    }

    if (this.motionMode === 'attached' || this.motionMode === 'charging') {
      this.chargeActive = false;
      return this.launchFromCharge();
    }

    return this.performAirAction();
  }

  selectUpgradeFallback(index: number) {
    if (this.phase !== 'upgrade_branching') return false;
    return this.commitBranch(index, true);
  }

  getCameraPose() {
    return this.camera.getPose();
  }

  getInitialPlatformPositions(count: number) {
    this.path.prebuild(Math.max(180, count + 80));
    return this.path.getInitialPositions(count).map((node) => new THREE.Vector3(node.x, node.y, node.z));
  }

  getInitialPlatformScales(count: number) {
    this.path.prebuild(Math.max(180, count + 80));
    return Array.from({ length: count }, (_, index) => this.path.getNode(index)?.visualScale ?? 1);
  }

  getVisiblePlatformPositions(count: number) {
    return this.getVisibleNodes(count).map((node) => new THREE.Vector3(node.resolvedX, node.resolvedY, node.resolvedZ));
  }

  getVisiblePlatformScales(count: number) {
    return this.getVisibleNodes(count).map((node) => node.visualScale);
  }

  getVisiblePlatformVisuals(count: number) {
    return this.getVisibleNodes(count).map((node) => ({
      scale: new THREE.Vector3(
        node.visualScale * node.visualStretch.x,
        node.visualScale * node.visualStretch.y,
        node.visualScale * node.visualStretch.z
      ),
      shapeKind: node.shapeKind,
      spinDirection: node.spinDirection,
      spinSpeed: node.spinSpeed,
      spinPhase: this.getShapeOrientation(node)
    }));
  }

  getHudState() {
    const branchHints: BranchLabelHint[] = this.branchChoices.map((choice, index) => ({
      slot: index as 0 | 1 | 2,
      offer: choice.offer,
      worldPosition: new THREE.Vector3(choice.entry.x, choice.entry.y, choice.entry.z)
    }));

    const hudState: GameHudState =
      this.phase === 'transition_in' || this.phase === 'transition_out'
        ? 'transition'
        : this.phase === 'game_over'
          ? 'game_over'
          : this.phase === 'upgrade_branching'
            ? 'upgrade_choice'
            : 'running';

    return {
      state: hudState,
      score: this.score,
      highscore: this.highscore,
      chargeRatio: clamp(this.chargeMeter / MAX_CHARGE, 0, 1),
      momentumGauge: clamp(this.momentumGaugeSmoothed, 0, 1),
      momentumTier: this.momentumState.chainTier,
      offers: this.currentOffers,
      branchHints,
      acquisition: this.acquisition
    } as const;
  }

  private updateAttached(deltaTime: number) {
    const node = this.getResolvedNode(this.attachedAnchorIndex);
    const profile = getDifficultyProfile(this.score);
    const sign = Math.sign(this.angularSpeed) || -1;
    const idleSpeed = (1.42 + profile.normalized * 1.25) * this.momentumState.speedMultiplier;

    this.orbitRadiusTarget = this.getOrbitRadiusForNode(node);
    this.orbitRadius = damp(this.orbitRadius, this.orbitRadiusTarget, 4.6, deltaTime);

    if (this.chargeActive) {
      this.chargeMeter = clamp(this.chargeMeter + deltaTime * 0.62 * this.runUpgrades.modifiers.chargeRate, 0, MAX_CHARGE);
      this.motionMode = 'charging';
    } else if (this.motionMode === 'charging') {
      this.motionMode = 'attached';
    }

    const targetSpeed = this.chargeActive
      ? sign * (idleSpeed + 1.2 + this.chargeMeter * 1.8)
      : sign * Math.max(idleSpeed, Math.abs(this.angularSpeed) * 0.988);

    this.angularSpeed = damp(this.angularSpeed, targetSpeed, this.chargeActive ? 2.4 : 1.9, deltaTime);
    this.angle += this.angularSpeed * deltaTime;
    const orbitFrame = this.getOrbitFrame(node, this.angle, this.orbitRadius);
    this.playerPosition.set(node.resolvedX + orbitFrame.offset.x, node.resolvedY + orbitFrame.offset.y, 0);

    this.player.rotation.z = this.getBoatFacingAngle();

    if (this.phase === 'running') {
      this.maybeTriggerEmergencyWarp();
    }
  }

  private updateAirborne(deltaTime: number) {
    const glide = this.chargeActive ? this.runUpgrades.modifiers.glideFactor : 0;
    const gravity = 8.2 * Math.max(0.18, 1 - glide * 0.56);

    this.playerVelocity.y -= gravity * deltaTime;
    if (this.chargeActive) {
      this.playerVelocity.x += this.runUpgrades.modifiers.airControl * 1.7 * deltaTime;
    }

    this.playerPosition.x += this.playerVelocity.x * deltaTime;
    this.playerPosition.y += this.playerVelocity.y * deltaTime;
    this.player.rotation.z = Math.atan2(this.playerVelocity.y, this.playerVelocity.x);

    if (this.tryCaptureNode()) {
      return;
    }

    if (this.playerPosition.y < -42) {
      this.failRun();
    }
  }

  private launchFromCharge() {
    if (this.motionMode !== 'attached' && this.motionMode !== 'charging') {
      return false;
    }

    const chargeRatio = clamp(this.chargeMeter / MAX_CHARGE, 0, 1);
    const rotationSign = Math.sign(this.angularSpeed) || -1;
    const node = this.getResolvedNode(this.attachedAnchorIndex);
    const orbitFrame = this.getOrbitFrame(node, this.angle, this.orbitRadius);
    const normal = this.scratchVector.copy(orbitFrame.offset).normalize();
    const tangent = this.scratchVectorB.copy(orbitFrame.tangent).normalize().multiplyScalar(rotationSign);
    const jumpScale = this.runUpgrades.modifiers.jumpPower + chargeRatio * this.runUpgrades.modifiers.chargedLeapBonus;
    let launchSpeed = (5.1 + Math.abs(this.angularSpeed) * this.orbitRadius * 1.32 + chargeRatio * 5.8 * jumpScale) * this.momentumState.jumpMultiplier;

    if (this.runUpgrades.modifiers.rocketBurst && chargeRatio >= 0.84 && this.currentTime >= this.rocketReadyAt) {
      launchSpeed += this.runUpgrades.modifiers.rocketBurstPower;
      this.rocketReadyAt = this.currentTime + this.runUpgrades.modifiers.rocketBurstCooldown;
    }

    this.motionMode = 'airborne';
    this.playerVelocity.copy(tangent).multiplyScalar(launchSpeed).addScaledVector(normal, 0.55 + chargeRatio * 0.45);
    this.remainingExtraJumps = this.runUpgrades.modifiers.extraJumps;
    this.remainingAirDashes = this.runUpgrades.modifiers.airDashCharges;
    this.chargeMeter = 0;
    this.chargeActive = false;
    this.player.rotation.z = Math.atan2(this.playerVelocity.y, this.playerVelocity.x);
    return true;
  }

  private performAirAction() {
    if (this.motionMode !== 'airborne') return false;

    if (this.runUpgrades.modifiers.infiniteFlaps && this.currentTime >= this.flapReadyAt) {
      this.playerVelocity.y = Math.max(this.playerVelocity.y, 4.2 + this.runUpgrades.modifiers.jumpPower * 1.18);
      this.playerVelocity.x += 0.9 + this.runUpgrades.modifiers.airControl * 1.45;
      this.flapReadyAt = this.currentTime + 0.12;
      return true;
    }

    if (this.remainingExtraJumps > 0) {
      this.remainingExtraJumps -= 1;
      this.playerVelocity.y = Math.max(this.playerVelocity.y, 4.5 + this.runUpgrades.modifiers.jumpPower * 1.22);
      this.playerVelocity.x += 0.7 + this.runUpgrades.modifiers.airControl * 1.15;
      return true;
    }

    if (
      this.remainingAirDashes > 0 &&
      this.currentTime - this.lastAirDashAt > 0.18 &&
      this.runUpgrades.modifiers.airDashPower > 0
    ) {
      this.remainingAirDashes -= 1;
      this.lastAirDashAt = this.currentTime;
      this.playerVelocity.x += this.runUpgrades.modifiers.airDashPower;
      this.playerVelocity.y = Math.max(this.playerVelocity.y, 0.8);
      return true;
    }

    return false;
  }

  private tryCaptureNode() {
    if (this.phase === 'upgrade_branching' && this.branchChoices.length > 0) {
      return this.tryCaptureBranch();
    }

    const searchStart = Math.max(0, this.attachedAnchorIndex + 1);
    const searchEnd = searchStart + 6;
    let nearestIndex = -1;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (let index = searchStart; index <= searchEnd; index += 1) {
      const node = this.getResolvedNode(index);
      const distance = Math.hypot(this.playerPosition.x - node.resolvedX, this.playerPosition.y - node.resolvedY);
      const captureRadius = this.getCaptureRadius(node);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }

      if (distance <= captureRadius) {
        this.attachToNode(index, true);
        return true;
      }
    }

    if (
      this.runUpgrades.modifiers.phaseJump &&
      this.currentTime >= this.phaseJumpReadyAt &&
      nearestIndex >= 0
    ) {
      const rescueNode = this.getResolvedNode(nearestIndex);
      if (nearestDistance <= this.getCaptureRadius(rescueNode) + this.runUpgrades.modifiers.phaseJumpRescueRadius) {
        this.phaseJumpReadyAt = this.currentTime + this.runUpgrades.modifiers.phaseJumpCooldown;
        this.attachToNode(nearestIndex, true);
        return true;
      }
    }

    return false;
  }

  private tryCaptureBranch() {
    for (let index = 0; index < this.branchChoices.length; index += 1) {
      const branch = this.branchChoices[index];
      const node = branch.entry;
      const distance = Math.hypot(this.playerPosition.x - node.x, this.playerPosition.y - node.y);
      const captureRadius = this.getCaptureRadius({
        ...node,
        resolvedX: node.x,
        resolvedY: node.y,
        resolvedZ: node.z
      });

      if (distance <= captureRadius) {
        return this.commitBranch(index, false);
      }
    }

    return false;
  }

  private attachToNode(nodeIndex: number, preserveMotion: boolean) {
    const node = this.getResolvedNode(nodeIndex);
    this.attachedAnchorIndex = nodeIndex;
    this.visibleWindowStart = Math.max(0, nodeIndex - 2);
    this.motionMode = 'attached';
    this.orbitRadiusTarget = this.getOrbitRadiusForNode(node);
    let landingQuality = 0;

    if (preserveMotion) {
      const relative = this.playerPosition.clone().sub(this.scratchVector.set(node.resolvedX, node.resolvedY, 0));
      if (relative.lengthSq() < 0.0001) {
        relative.set(1, 0, 0);
      }

      const contactDistance = clamp(relative.length(), this.orbitRadiusTarget, this.orbitRadiusTarget + 1.8);
      this.angle = this.resolveOrbitAngleFromPosition(node, relative, contactDistance);
      const orbitFrame = this.getOrbitFrame(node, this.angle, contactDistance);

      const normal = this.scratchVectorB.copy(orbitFrame.offset).normalize();
      const tangent = this.scratchVectorC.copy(orbitFrame.tangent).normalize();
      const incomingSpeed = this.playerVelocity.length();
      const tangentialSpeed = this.playerVelocity.dot(tangent);
      const radialSpeed = this.playerVelocity.dot(normal);
      const alignment = clamp(1 - Math.abs(radialSpeed) / Math.max(0.001, incomingSpeed), 0, 1);
      const carriedSpeed =
        Math.abs(tangentialSpeed) * (0.9 + this.runUpgrades.modifiers.momentumRetention * 0.32) +
        Math.abs(radialSpeed) * 0.18 +
        incomingSpeed * (0.14 + alignment * 0.18);
      const angularMagnitude = clamp(carriedSpeed / Math.max(1.1, contactDistance), 1.08, 8.8);
      this.angularSpeed = angularMagnitude * (Math.sign(tangentialSpeed) || Math.sign(this.angularSpeed) || -1);
      this.orbitRadius = contactDistance;
      this.playerPosition.set(node.resolvedX + orbitFrame.offset.x, node.resolvedY + orbitFrame.offset.y, 0);
      landingQuality = clamp(
        alignment * 0.58 + clamp(incomingSpeed / 10.5, 0, 1) * 0.42,
        0.08,
        1
      );
    } else {
      this.angle = -Math.PI * 0.42;
      this.angularSpeed = -1.55;
      this.orbitRadius = this.orbitRadiusTarget;
      const orbitFrame = this.getOrbitFrame(node, this.angle, this.orbitRadius);
      this.playerPosition.set(node.resolvedX + orbitFrame.offset.x, node.resolvedY + orbitFrame.offset.y, 0);
    }

    const currentDirection = (Math.sign(this.angularSpeed) || -1) as -1 | 1;
    if (preserveMotion) {
      if (currentDirection !== this.previousRotationDirection) {
        this.momentumChain += 1;
        this.momentumGauge = clamp(this.momentumGauge + 0.16 + landingQuality * 0.22, 0, 1);
      } else {
        this.momentumChain = 0;
        this.momentumGauge = Math.max(0, this.momentumGauge - 0.16);
      }
    } else {
      this.momentumChain = 0;
      this.momentumGauge = 0;
    }
    this.previousRotationDirection = currentDirection;

    this.playerVelocity.set(0, 0, 0);
    this.remainingExtraJumps = this.runUpgrades.modifiers.extraJumps;
    this.remainingAirDashes = this.runUpgrades.modifiers.airDashCharges;
    this.player.rotation.z = this.getBoatFacingAngle();
    this.score = nodeIndex;

    if (this.score > this.highscore) {
      this.highscore = this.score;
      window.localStorage.setItem('portfolio-game-highscore', String(this.highscore));
    }

    if (this.phase !== 'upgrade_branching' && this.phase !== 'upgrade_acquired' && node.kind === 'milestone' && this.score >= this.nextUpgradeMilestone) {
      this.openUpgradeChoice();
    } else if (this.phase === 'upgrade_acquired' && this.currentTime >= this.acquisitionEndsAt) {
      this.phase = 'running';
    } else if (this.phase !== 'upgrade_branching' && this.phase !== 'game_over') {
      this.phase = 'running';
    }

    this.emitScore();
  }

  private openUpgradeChoice() {
    this.currentOffers = buildUpgradeOffers(this.score, this.runUpgrades);
    this.branchChoices = this.path.createUpgradeBranches(this.attachedAnchorIndex, this.currentOffers, this.score);
    this.phase = this.branchChoices.length > 0 ? 'upgrade_branching' : 'running';
    if (this.branchChoices.length === 0) {
      this.nextUpgradeMilestone = getNextUpgradeMilestone(this.score);
    }
    this.chargeActive = false;
    this.motionMode = 'attached';
  }

  private commitBranch(index: number, fallbackSelection: boolean) {
    const branch = this.branchChoices[index];
    if (!branch) return false;

    if (fallbackSelection) {
      const entryNode = {
        ...branch.entry,
        resolvedX: branch.entry.x,
        resolvedY: branch.entry.y,
        resolvedZ: branch.entry.z
      };
      const radius = this.getOrbitRadiusForNode(entryNode);
      const orbitFrame = this.getOrbitFrame(entryNode, this.angle, radius);
      this.playerPosition.set(branch.entry.x + orbitFrame.offset.x, branch.entry.y + orbitFrame.offset.y, 0);
    }

    this.path.replaceFuture(this.attachedAnchorIndex, branch.pathNodes);
    this.path.ensureAhead(this.attachedAnchorIndex + branch.pathNodes.length, 50, 120);
    this.runUpgrades = applyItemToRunState(this.runUpgrades, branch.offer.item.id);
    this.currentOffers = [];
    this.branchChoices = [];
    this.remainingExtraJumps = this.runUpgrades.modifiers.extraJumps;
    this.remainingAirDashes = this.runUpgrades.modifiers.airDashCharges;
    this.acquisition = {
      offer: branch.offer,
      progress: 0
    };
    this.acquisitionEndsAt = this.currentTime + 1.15;
    this.phase = 'upgrade_acquired';
    this.attachToNode(this.attachedAnchorIndex + 1, true);
    this.nextUpgradeMilestone = getNextUpgradeMilestone(this.score);
    this.emitScore();
    return true;
  }

  private maybeTriggerEmergencyWarp() {
    const currentNode = this.getResolvedNode(this.attachedAnchorIndex);
    this.scratchVector.set(currentNode.resolvedX, currentNode.resolvedY, 0);
    if (!this.camera.isBehindSafeLine(this.scratchVector)) {
      return false;
    }

    if (this.runUpgrades.modifiers.warpRange > 0 && this.currentTime >= this.warpReadyAt) {
      return this.performWarp(this.runUpgrades.modifiers.warpRange, this.runUpgrades.modifiers.warpCooldown, true);
    }

    if (this.runUpgrades.modifiers.teleportRange > 0 && this.currentTime >= this.teleportReadyAt) {
      return this.performWarp(this.runUpgrades.modifiers.teleportRange, this.runUpgrades.modifiers.teleportCooldown, false);
    }

    return false;
  }

  private performWarp(range: number, cooldown: number, useWarpCooldown: boolean) {
    const targetIndex = this.path.getTeleportTarget(this.attachedAnchorIndex, range);
    if (targetIndex < 0) return false;

    const targetNode = this.getResolvedNode(targetIndex);
    const orbitDirection = Math.sign(this.angularSpeed) || -1;
    const orbitFrame = this.getOrbitFrame(targetNode, this.angle, this.orbitRadiusTarget);
    const tangent = this.scratchVector.copy(orbitFrame.tangent).normalize().multiplyScalar(orbitDirection);
    const tangentialSpeed = clamp(Math.abs(this.angularSpeed) * PLAYER_BASE_RADIUS, 4, 8.2);
    this.playerVelocity.copy(tangent).multiplyScalar(tangentialSpeed);
    this.playerPosition.set(targetNode.resolvedX + orbitFrame.offset.x, targetNode.resolvedY + orbitFrame.offset.y, 0);

    if (useWarpCooldown) {
      this.warpReadyAt = this.currentTime + cooldown;
    } else {
      this.teleportReadyAt = this.currentTime + cooldown;
    }

    this.attachToNode(targetIndex, true);
    return true;
  }

  private enforceFailState(currentNode: ResolvedGamePathNode) {
    if (this.phase === 'game_over') return;

    if (this.motionMode === 'airborne') {
      if (this.camera.isBehindSafeLine(this.playerPosition) || this.camera.isOutsideViewport(this.playerPosition)) {
        this.failRun();
      }
      return;
    }

    this.scratchVector.set(currentNode.resolvedX, currentNode.resolvedY, 0);
    if (this.camera.isBehindSafeLine(this.scratchVector) || this.camera.isOutsideViewport(this.playerPosition)) {
      this.failRun();
    }
  }

  private failRun() {
    this.phase = 'game_over';
    this.chargeActive = false;
    this.chargeMeter = 0;
    this.currentOffers = [];
    this.branchChoices = [];
    this.acquisition = null;
    this.emitScore();
  }

  private getResolvedNode(index: number) {
    return this.path.getResolvedNode(index, this.currentTime, this.attachedAnchorIndex);
  }

  private getVisibleNodes(count: number) {
    if (this.phase === 'upgrade_branching' && this.branchChoices.length > 0) {
      const nodes: ResolvedGamePathNode[] = [
        this.getResolvedNode(this.attachedAnchorIndex)
      ];
      this.branchChoices.forEach((branch) => {
        branch.previewNodes.forEach((node) => {
          nodes.push({
            ...node,
            resolvedX: node.x,
            resolvedY: node.y,
            resolvedZ: node.z
          });
        });
      });
      return nodes.slice(0, count);
    }

    return this.path.getWindow(this.visibleWindowStart, count, this.currentTime, this.attachedAnchorIndex);
  }

  private getOrbitRadiusForNode(node: ResolvedGamePathNode) {
    if (node.shapeKind === 'oval') {
      return 1.02 + node.radius * 0.68;
    }
    if (node.shapeKind === 'triangular') {
      return 1.18 + node.radius * 0.76;
    }
    return 1.08 + node.radius * 0.72;
  }

  private getCaptureRadius(node: ResolvedGamePathNode) {
    return node.radius + 1.12 + this.runUpgrades.modifiers.captureRadius + this.runUpgrades.modifiers.landingTolerance;
  }

  private getBoatFacingAngle() {
    const node = this.getResolvedNode(this.attachedAnchorIndex);
    const rotationSign = Math.sign(this.angularSpeed) || -1;
    const orbitFrame = this.getOrbitFrame(node, this.angle, this.orbitRadius);
    return Math.atan2(orbitFrame.tangent.y * rotationSign, orbitFrame.tangent.x * rotationSign);
  }

  private updatePlayerVisuals() {
    const momentumScale = 1 + this.momentumGaugeSmoothed * 0.08;
    this.player.scale.setScalar(momentumScale);
    this.playerWing.rotation.z = Math.sin(this.currentTime * (4.8 + this.momentumGaugeSmoothed * 2.2)) * (0.08 + this.momentumGaugeSmoothed * 0.04);
    if (this.acquisition) {
      this.acquisition.progress = clamp(1 - (this.acquisitionEndsAt - this.currentTime) / 1.15, 0, 1);
    }
  }

  private emitScore() {
    this.scoreListeners.forEach((callback) => callback());
  }

  private getOrbitFrame(node: ResolvedGamePathNode, angle: number, radius: number) {
    const phase = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const t = phase / (Math.PI * 2);
    const orientation = this.getShapeOrientation(node);

    if (node.shapeKind === 'oval') {
      const rx = radius * Math.max(1.15, node.visualStretch.x);
      const ry = radius * Math.max(0.8, node.visualStretch.y);
      const localOffset = new THREE.Vector3(Math.cos(phase) * rx, Math.sin(phase) * ry, 0);
      const localTangent = new THREE.Vector3(-Math.sin(phase) * rx, Math.cos(phase) * ry, 0);
      return {
        offset: localOffset.applyAxisAngle(new THREE.Vector3(0, 0, 1), orientation),
        tangent: localTangent.applyAxisAngle(new THREE.Vector3(0, 0, 1), orientation)
      };
    }

    if (node.shapeKind === 'triangular') {
      const triangleRadius = radius * 1.12;
      const points = [
        new THREE.Vector3(0, triangleRadius, 0),
        new THREE.Vector3(-triangleRadius * 0.92, -triangleRadius * 0.56, 0),
        new THREE.Vector3(triangleRadius * 0.92, -triangleRadius * 0.56, 0)
      ];
      const segment = t * 3;
      const segmentIndex = Math.floor(segment) % 3;
      const localT = segment - Math.floor(segment);
      const from = points[segmentIndex];
      const to = points[(segmentIndex + 1) % 3];
      const offset = from.clone().lerp(to, localT).applyAxisAngle(new THREE.Vector3(0, 0, 1), orientation);
      const tangent = to.clone().sub(from).normalize().applyAxisAngle(new THREE.Vector3(0, 0, 1), orientation);
      return {
        offset,
        tangent
      };
    }

    return {
      offset: new THREE.Vector3(Math.cos(phase) * radius, Math.sin(phase) * radius, 0),
      tangent: new THREE.Vector3(-Math.sin(phase) * radius, Math.cos(phase) * radius, 0)
    };
  }

  private resolveOrbitAngleFromPosition(node: ResolvedGamePathNode, relative: THREE.Vector3, radius: number) {
    if (node.shapeKind === 'oval') {
      const localRelative = relative.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), -this.getShapeOrientation(node));
      const rx = radius * Math.max(1.15, node.visualStretch.x);
      const ry = radius * Math.max(0.8, node.visualStretch.y);
      return Math.atan2(localRelative.y / Math.max(0.001, ry), localRelative.x / Math.max(0.001, rx));
    }

    if (node.shapeKind === 'triangular') {
      const localRelative = relative.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), -this.getShapeOrientation(node));
      const triangleRadius = radius * 1.12;
      const points = [
        new THREE.Vector3(0, triangleRadius, 0),
        new THREE.Vector3(-triangleRadius * 0.92, -triangleRadius * 0.56, 0),
        new THREE.Vector3(triangleRadius * 0.92, -triangleRadius * 0.56, 0)
      ];

      let bestPhase = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (let segmentIndex = 0; segmentIndex < 3; segmentIndex += 1) {
        const from = points[segmentIndex];
        const to = points[(segmentIndex + 1) % 3];
        const edge = this.scratchVector.copy(to).sub(from);
        const pointVector = this.scratchVectorB.copy(localRelative).sub(from);
        const edgeLengthSq = Math.max(0.0001, edge.lengthSq());
        const localT = clamp(pointVector.dot(edge) / edgeLengthSq, 0, 1);
        const closest = this.scratchVectorC.copy(from).addScaledVector(edge, localT);
        const distance = closest.distanceToSquared(localRelative);

        if (distance < bestDistance) {
          bestDistance = distance;
          bestPhase = ((segmentIndex + localT) / 3) * Math.PI * 2;
        }
      }

      return bestPhase;
    }

    return Math.atan2(relative.y, relative.x);
  }

  private getShapeOrientation(node: ResolvedGamePathNode) {
    if (node.shapeKind === 'round') {
      return 0;
    }

    const direction = node.spinDirection === 'cw' ? -1 : 1;
    return node.motionSeed + this.currentTime * node.spinSpeed * 0.42 * direction;
  }
}
