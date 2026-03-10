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
import { CameraPathController } from './cameraPathController';
import { getDifficultyProfile } from './difficultyScaler';
import { PathBufferManager } from './pathBufferManager';
import { getDirectionVector } from './pathGenerator';
import type { PathNode, ResolvedPathNode } from './pathTypes';
import { createDeformMaterial, setDeformMaterialTheme, updateDeformUniforms, type DeformMaterial } from '../portfolio/shardMaterial';

interface PlatformMesh {
  group: THREE.Group;
  mesh: THREE.Mesh<THREE.IcosahedronGeometry, DeformMaterial>;
}

type GameState = 'idle' | 'transition' | 'running' | 'upgrade_choice' | 'game_over';
type PlayerState = 'attached' | 'charging' | 'airborne';

const PLATFORM_POOL_SIZE = 18;
const PLAYER_RADIUS = 2.15;
const MAX_CHARGE = 1;

export class GameModeController {
  private readonly group = new THREE.Group();
  private readonly renderPlatforms = false;
  private readonly pool: PlatformMesh[] = [];
  private readonly geometry = new THREE.IcosahedronGeometry(1.25, 4);
  private readonly player = new THREE.Group();
  private readonly playerBody: THREE.Mesh<THREE.ConeGeometry, THREE.MeshBasicMaterial>;
  private readonly cameraPosition = new THREE.Vector3();
  private readonly cameraLookAt = new THREE.Vector3();
  private readonly transitionFromPositions: THREE.Vector3[] = [];
  private readonly transitionToPositions: THREE.Vector3[] = [];
  private readonly scratchVector = new THREE.Vector3();
  private readonly scratchVectorB = new THREE.Vector3();
  private readonly scratchVectorC = new THREE.Vector3();
  private readonly pathBuffer = new PathBufferManager();
  private readonly cameraPath = new CameraPathController();
  private state: GameState = 'idle';
  private playerState: PlayerState = 'attached';
  private transitionProgress = 0;
  private visibleWindowStart = 0;
  private attachedAnchorIndex = 0;
  private currentTime = 0;
  private playerPosition = new THREE.Vector3();
  private playerVelocity = new THREE.Vector3();
  private angle = -Math.PI * 0.58;
  private angularSpeed = 1.45;
  private orbitRadius = PLAYER_RADIUS;
  private orbitRadiusTarget = PLAYER_RADIUS;
  private accelerating = false;
  private chargeMeter = 0;
  private score = 0;
  private highscore = Number(window.localStorage.getItem('portfolio-game-highscore') || 0);
  private scoreListeners = new Set<() => void>();
  private runUpgrades: RunUpgradeState = createRunUpgradeState();
  private currentOffers: RogueliteItemOffer[] = [];
  private nextUpgradeMilestone = 10;
  private remainingExtraJumps = 0;
  private remainingAirDashes = 0;
  private phaseJumpReadyAt = 0;
  private teleportReadyAt = 0;
  private warpReadyAt = 0;
  private rocketReadyAt = 0;
  private flapReadyAt = 0;
  private lastAirDashAt = -100;
  private upgradeBranches: Array<{ offer: RogueliteItemOffer; nodes: PathNode[] }> = [];

  constructor(private readonly scene: THREE.Scene, theme: ThemeMode) {
    this.group.visible = false;
    this.scene.add(this.group);

    for (let index = 0; index < PLATFORM_POOL_SIZE; index += 1) {
      const material = createDeformMaterial(theme, 200 + index);
      const mesh = new THREE.Mesh(this.geometry, material);
      const group = new THREE.Group();
      group.add(mesh);
      this.group.add(group);
      this.pool.push({ group, mesh });
    }

    this.playerBody = new THREE.Mesh(
      new THREE.ConeGeometry(0.42, 1.2, 6),
      new THREE.MeshBasicMaterial({
        color: theme === 'dark' ? '#D4BF9B' : '#393F4A'
      })
    );
    this.playerBody.rotation.z = -Math.PI / 2;
    this.player.add(this.playerBody);
    this.player.visible = false;
    this.group.add(this.player);
  }

  setTheme(theme: ThemeMode) {
    this.pool.forEach((platform) => setDeformMaterialTheme(platform.mesh.material, theme));
    this.playerBody.material.color.set(theme === 'dark' ? '#D4BF9B' : '#393F4A');
  }

  get currentState() {
    return this.state;
  }

  get currentScore() {
    return this.score;
  }

  get bestScore() {
    return this.highscore;
  }

  get chargeRatio() {
    return clamp(this.chargeMeter / MAX_CHARGE, 0, 1);
  }

  get upgradeOffers() {
    return this.currentOffers;
  }

  onScoreChange(callback: () => void) {
    this.scoreListeners.add(callback);
    return () => this.scoreListeners.delete(callback);
  }

  getInitialPlatformPositions(count: number) {
    this.preparePath(Math.max(180, count + 80));
    return this.pathBuffer.getInitialPositions(count).map((node) => new THREE.Vector3(node.x, node.y, node.z));
  }

  getInitialPlatformScales(count: number) {
    this.pathBuffer.prebuild(Math.max(180, count + 80));
    return Array.from({ length: count }, (_, index) => this.getVisualScaleForNode(this.pathBuffer.getNode(index)));
  }

  getVisiblePlatformPositions(count: number) {
    return this.getVisibleNodes(count).map((node) => new THREE.Vector3(node.resolvedX, node.resolvedY, node.resolvedZ));
  }

  getVisiblePlatformScales(count: number) {
    return this.getVisibleNodes(count).map((node) => this.getVisualScaleForNode(node));
  }

  startTransition(startPositions: THREE.Vector3[]) {
    this.resetRuntimeState();
    this.transitionFromPositions.splice(0, this.transitionFromPositions.length, ...startPositions.map((position) => position.clone()));
    this.state = 'transition';
    this.transitionProgress = 0;
    this.group.visible = true;
    this.player.visible = false;
    this.transitionToPositions.splice(
      0,
      this.transitionToPositions.length,
      ...this.pathBuffer.getInitialPositions(startPositions.length).map((node) => new THREE.Vector3(node.x, node.y, node.z))
    );
    this.syncTransitionPlatforms();
    this.emitScore();
  }

  prepareReturnTransition(endPositions: THREE.Vector3[]) {
    this.transitionFromPositions.splice(0, this.transitionFromPositions.length, ...this.captureVisiblePlatformPositions(endPositions.length));
    this.transitionToPositions.splice(0, this.transitionToPositions.length, ...endPositions.map((position) => position.clone()));
    this.state = 'transition';
    this.transitionProgress = 1;
    this.group.visible = true;
    this.player.visible = false;
    this.accelerating = false;
    this.syncTransitionPlatforms();
  }

  setTransitionProgress(progress: number) {
    this.transitionProgress = progress;
    this.syncTransitionPlatforms();
  }

  beginRun() {
    this.resetRuntimeState();
    this.state = 'running';
    this.group.visible = true;
    this.player.visible = true;
    this.attachToNode(0, false);
    const node = this.getResolvedNode(0);
    this.cameraPath.reset(node);
    this.updateCameraPose(1 / 60);
    this.emitScore();
  }

  setAccelerating(active: boolean) {
    if (!(this.state === 'running' || this.state === 'upgrade_choice')) return false;

    if (active) {
      this.accelerating = true;
      if (this.playerState === 'attached') {
        this.playerState = 'charging';
      }
      return false;
    }

    const shouldRelease = this.accelerating && (this.playerState === 'charging' || this.playerState === 'attached');
    this.accelerating = false;
    if (shouldRelease && this.playerState !== 'airborne') {
      return this.launchFromCharge();
    }
    return false;
  }

  jump() {
    if (!(this.state === 'running' || this.state === 'upgrade_choice')) return false;

    if (this.playerState === 'attached' || this.playerState === 'charging') {
      this.accelerating = false;
      return this.launchFromCharge();
    }

    return this.performAirAction();
  }

  selectUpgrade(index: number) {
    if (this.state !== 'upgrade_choice') return false;
    return this.commitUpgradeBranch(index, true);
  }

  restart() {
    if (this.state === 'idle') return;
    this.preparePath(180);
    const startPositions = this.pathBuffer.getInitialPositions(10).map((node) => new THREE.Vector3(node.x, node.y, node.z));
    this.startTransition(startPositions);
    this.setTransitionProgress(1);
    this.beginRun();
  }

  stop() {
    this.state = 'idle';
    this.group.visible = false;
    this.player.visible = false;
    this.accelerating = false;
    this.currentOffers = [];
  }

  update(deltaTime: number, elapsedTime: number) {
    if (!this.group.visible) return;
    this.currentTime = elapsedTime;

    this.pool.forEach((platform, index) => {
      updateDeformUniforms(platform.mesh.material, {
        time: elapsedTime,
        hover: 0.18,
        drag: 0,
        focus: 0,
        settled: 0,
        snap: 0
      });
      platform.group.rotation.y += deltaTime * (0.16 + index * 0.01);
    });

    if (this.state === 'transition') {
      this.syncTransitionPlatforms();
      this.cameraPosition.set(2.8, 1.8, 24);
      this.cameraLookAt.set(2.8, 1.2, 0);
      return;
    }

    this.pathBuffer.ensureAhead(this.attachedAnchorIndex, 50, 120);

    if (this.state === 'running') {
      this.updateRunning(deltaTime);
    } else if (this.state === 'upgrade_choice') {
      this.updateUpgradeChoice(deltaTime);
    }

    if (this.state === 'running' || this.state === 'upgrade_choice' || this.state === 'game_over') {
      this.syncVisiblePlatforms(elapsedTime);
      this.updateCameraPose(deltaTime);
    }

    if (this.state === 'running' || this.state === 'upgrade_choice') {
      this.enforceSafeZone();
    }
  }

  getCameraPose() {
    return {
      position: this.cameraPosition.clone(),
      lookAt: this.cameraLookAt.clone()
    };
  }

  private preparePath(size: number) {
    this.pathBuffer.reset();
    this.pathBuffer.prebuild(size);
  }

  private resetRuntimeState() {
    this.playerState = 'attached';
    this.transitionProgress = 0;
    this.visibleWindowStart = 0;
    this.attachedAnchorIndex = 0;
    this.currentTime = 0;
    this.playerPosition.set(0, 0, 0);
    this.playerVelocity.set(0, 0, 0);
    this.angle = -Math.PI * 0.58;
    this.angularSpeed = 1.45;
    this.orbitRadius = PLAYER_RADIUS;
    this.orbitRadiusTarget = PLAYER_RADIUS;
    this.accelerating = false;
    this.chargeMeter = 0;
    this.score = 0;
    this.runUpgrades = createRunUpgradeState();
    this.currentOffers = [];
    this.nextUpgradeMilestone = 10;
    this.remainingExtraJumps = 0;
    this.remainingAirDashes = 0;
    this.phaseJumpReadyAt = 0;
    this.teleportReadyAt = 0;
    this.warpReadyAt = 0;
    this.rocketReadyAt = 0;
    this.flapReadyAt = 0;
    this.lastAirDashAt = -100;
    this.upgradeBranches = [];
    this.player.userData.attached = false;
  }

  private updateRunning(deltaTime: number) {
    if (this.playerState === 'attached' || this.playerState === 'charging') {
      this.updateAttachedState(deltaTime);
    } else {
      this.updateAirborneState(deltaTime);
    }

    this.player.position.copy(this.playerPosition);
  }

  private updateUpgradeChoice(deltaTime: number) {
    if (this.playerState === 'attached' || this.playerState === 'charging') {
      this.updateAttachedState(deltaTime);
    } else {
      this.updateAirborneState(deltaTime);
    }

    this.player.position.copy(this.playerPosition);
  }

  private updateAttachedState(deltaTime: number) {
    const currentNode = this.getResolvedNode(this.attachedAnchorIndex);
    const profile = getDifficultyProfile(this.score);
    const angularSign = Math.sign(this.angularSpeed) || 1;
    const idleSpeed = 1.35 + profile.normalized * 1.1;
    const neutralSpeed = angularSign * Math.max(idleSpeed, Math.abs(this.angularSpeed) * 0.992);
    this.orbitRadiusTarget = this.getOrbitRadiusForNode(currentNode);
    this.orbitRadius = damp(this.orbitRadius, this.orbitRadiusTarget, 6.5, deltaTime);

    if (this.accelerating) {
      this.chargeMeter = clamp(this.chargeMeter + deltaTime * 0.56 * this.runUpgrades.modifiers.chargeRate, 0, MAX_CHARGE);
      this.playerState = 'charging';
    } else if (this.playerState === 'charging') {
      this.playerState = 'attached';
    }

    const targetSpeed = this.accelerating
      ? angularSign * (idleSpeed + 1.1 + this.chargeMeter * 1.5)
      : neutralSpeed;

    this.angularSpeed = damp(this.angularSpeed, targetSpeed, this.accelerating ? 2.6 : 1.8, deltaTime);
    this.angle += this.angularSpeed * deltaTime;
    this.playerPosition.set(
      currentNode.resolvedX + Math.cos(this.angle) * this.orbitRadius,
      currentNode.resolvedY + Math.sin(this.angle) * this.orbitRadius,
      0
    );
    this.player.rotation.z = this.getOrbitFacingAngle();

    this.maybeTriggerEmergencyWarp();
  }

  private updateAirborneState(deltaTime: number) {
    const glide = this.accelerating ? this.runUpgrades.modifiers.glideFactor : 0;
    const gravity = 8.8 * Math.max(0.22, 1 - glide * 0.58);
    this.playerVelocity.y -= gravity * deltaTime;

    if (this.accelerating) {
      this.playerVelocity.x += this.runUpgrades.modifiers.airControl * 1.8 * deltaTime;
    }

    this.playerPosition.x += this.playerVelocity.x * deltaTime;
    this.playerPosition.y += this.playerVelocity.y * deltaTime;
    this.player.rotation.z = Math.atan2(this.playerVelocity.y, this.playerVelocity.x);

    if (this.tryCaptureNode()) {
      return;
    }

    if (this.playerPosition.y < -24) {
      this.failRun();
    }
  }

  private launchFromCharge() {
    if (this.playerState !== 'attached' && this.playerState !== 'charging') {
      return false;
    }

    const chargeRatio = clamp(this.chargeMeter / MAX_CHARGE, 0, 1);
    const orbitDirection = Math.sign(this.angularSpeed) || 1;
    const tangent = this.scratchVector.set(-Math.sin(this.angle), Math.cos(this.angle), 0).normalize().multiplyScalar(orbitDirection);
    const jumpScale = this.runUpgrades.modifiers.jumpPower + chargeRatio * this.runUpgrades.modifiers.chargedLeapBonus;
    let launchSpeed = 4.15 + Math.abs(this.angularSpeed) * this.orbitRadius * 1.18 + chargeRatio * 4.6 * jumpScale;

    if (this.runUpgrades.modifiers.rocketBurst && chargeRatio >= 0.84 && this.currentTime >= this.rocketReadyAt) {
      launchSpeed += this.runUpgrades.modifiers.rocketBurstPower;
      this.rocketReadyAt = this.currentTime + this.runUpgrades.modifiers.rocketBurstCooldown;
    }

    this.playerState = 'airborne';
    this.player.userData.attached = false;
    this.playerVelocity.copy(tangent).multiplyScalar(launchSpeed);
    this.playerVelocity.x += 0.85;
    this.remainingExtraJumps = this.runUpgrades.modifiers.extraJumps;
    this.remainingAirDashes = this.runUpgrades.modifiers.airDashCharges;
    this.chargeMeter = 0;
    this.accelerating = false;
    this.player.rotation.z = Math.atan2(this.playerVelocity.y, this.playerVelocity.x);
    return true;
  }

  private performAirAction() {
    if (this.playerState !== 'airborne') return false;

    if (this.runUpgrades.modifiers.infiniteFlaps && this.currentTime >= this.flapReadyAt) {
      this.playerVelocity.y = Math.max(this.playerVelocity.y, 3.7 + this.runUpgrades.modifiers.jumpPower * 1.15);
      this.playerVelocity.x += 0.7 + this.runUpgrades.modifiers.airControl * 1.5;
      this.flapReadyAt = this.currentTime + 0.12;
      return true;
    }

    if (this.remainingExtraJumps > 0) {
      this.remainingExtraJumps -= 1;
      this.playerVelocity.y = Math.max(this.playerVelocity.y, 4.35 + this.runUpgrades.modifiers.jumpPower * 1.28);
      this.playerVelocity.x += 0.65 + this.runUpgrades.modifiers.airControl * 1.3;
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
      this.playerVelocity.y = Math.max(this.playerVelocity.y, 1.2);
      return true;
    }

    return false;
  }

  private tryCaptureNode() {
    if (this.state === 'upgrade_choice' && this.upgradeBranches.length > 0) {
      return this.tryCaptureUpgradeBranch();
    }

    const searchStart = Math.max(0, this.attachedAnchorIndex + 1);
    const searchEnd = searchStart + 5;
    let nearestIndex = -1;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (let index = searchStart; index <= searchEnd; index += 1) {
      const node = this.getResolvedNode(index);
      const distance = Math.hypot(this.playerPosition.x - node.resolvedX, this.playerPosition.y - node.resolvedY);
      const captureRadius = node.radius + 1.08 + this.runUpgrades.modifiers.captureRadius + this.runUpgrades.modifiers.landingTolerance;

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
      const node = this.getResolvedNode(nearestIndex);
      const rescueRadius = node.radius + 1.08 + this.runUpgrades.modifiers.phaseJumpRescueRadius;
      if (nearestDistance <= rescueRadius) {
        this.phaseJumpReadyAt = this.currentTime + this.runUpgrades.modifiers.phaseJumpCooldown;
        this.attachToNode(nearestIndex, true);
        return true;
      }
    }

    return false;
  }

  private attachToNode(nodeIndex: number, preserveMotion: boolean) {
    const node = this.getResolvedNode(nodeIndex);
    this.attachedAnchorIndex = nodeIndex;
    this.visibleWindowStart = Math.max(0, nodeIndex - 3);
    this.playerState = 'attached';
    this.player.userData.attached = true;
    this.orbitRadiusTarget = this.getOrbitRadiusForNode(node);

    if (preserveMotion) {
      const relative = this.playerPosition.clone().sub(this.scratchVector.set(node.resolvedX, node.resolvedY, node.resolvedZ));
      if (relative.lengthSq() < 0.0001) {
        relative.set(1, 0, 0);
      }
      const contactDistance = clamp(relative.length(), this.orbitRadiusTarget, this.orbitRadiusTarget + 1.15);
      relative.setLength(contactDistance);
      this.angle = Math.atan2(relative.y, relative.x);

      const normal = this.scratchVectorB.copy(relative).normalize();
      const tangent = this.scratchVectorC.set(-normal.y, normal.x, 0);
      const incomingSpeed = this.playerVelocity.length();
      const tangentialSpeed = this.playerVelocity.dot(tangent);
      const radialSpeed = this.playerVelocity.dot(normal);
      const alignment = clamp(1 - Math.abs(radialSpeed) / Math.max(0.001, incomingSpeed), 0, 1);
      const carriedSpeed =
        Math.abs(tangentialSpeed) * (0.84 + this.runUpgrades.modifiers.momentumRetention * 0.22) +
        Math.abs(radialSpeed) * 0.18 +
        incomingSpeed * (0.12 + alignment * 0.08);
      const angularMagnitude = clamp(carriedSpeed / Math.max(1.15, contactDistance), 1.1, 6.6);
      this.angularSpeed = angularMagnitude * (Math.sign(tangentialSpeed) || 1);
      this.orbitRadius = contactDistance;
      this.playerPosition.set(node.resolvedX + relative.x, node.resolvedY + relative.y, 0);
    } else {
      this.angle = -Math.PI * 0.58;
      this.angularSpeed = 1.45;
      this.orbitRadius = this.orbitRadiusTarget;
      this.playerPosition.set(
        node.resolvedX + Math.cos(this.angle) * this.orbitRadius,
        node.resolvedY + Math.sin(this.angle) * this.orbitRadius,
        0
      );
    }

    this.playerVelocity.set(0, 0, 0);
    this.remainingExtraJumps = this.runUpgrades.modifiers.extraJumps;
    this.remainingAirDashes = this.runUpgrades.modifiers.airDashCharges;
    this.player.rotation.z = this.getOrbitFacingAngle();
    this.score = nodeIndex;

    if (this.score > this.highscore) {
      this.highscore = this.score;
      window.localStorage.setItem('portfolio-game-highscore', String(this.highscore));
    }

    if (this.score >= this.nextUpgradeMilestone) {
      this.openUpgradeChoice();
    }

    this.emitScore();
  }

  private openUpgradeChoice() {
    this.currentOffers = buildUpgradeOffers(this.score, this.runUpgrades);
    this.upgradeBranches = this.currentOffers.length > 0 ? this.buildUpgradeBranches() : [];
    this.state = this.upgradeBranches.length > 0 ? 'upgrade_choice' : 'running';
    if (this.upgradeBranches.length === 0) {
      this.nextUpgradeMilestone = getNextUpgradeMilestone(this.score);
    }
    this.accelerating = false;
  }

  private maybeTriggerEmergencyWarp() {
    if (this.state === 'upgrade_choice') {
      return false;
    }

    const currentNode = this.getResolvedNode(this.attachedAnchorIndex);
    this.scratchVectorC.set(currentNode.resolvedX, currentNode.resolvedY, 0);
    if (!this.cameraPath.isOutsideSafeZone(this.scratchVectorC)) {
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
    const targetIndex = this.pathBuffer.getTeleportTarget(this.attachedAnchorIndex, range);
    if (targetIndex < 0) return false;

    const targetNode = this.getResolvedNode(targetIndex);
    const orbitDirection = Math.sign(this.angularSpeed) || 1;
    const tangent = this.scratchVector.set(-Math.sin(this.angle), Math.cos(this.angle), 0).normalize().multiplyScalar(orbitDirection);
    const tangentialSpeed = clamp(Math.abs(this.angularSpeed) * PLAYER_RADIUS, 3.6, 7.6);
    this.playerVelocity.copy(tangent).multiplyScalar(tangentialSpeed);
    this.playerPosition.set(
      targetNode.resolvedX + Math.cos(this.angle) * PLAYER_RADIUS,
      targetNode.resolvedY + Math.sin(this.angle) * PLAYER_RADIUS,
      0
    );

    if (useWarpCooldown) {
      this.warpReadyAt = this.currentTime + cooldown;
    } else {
      this.teleportReadyAt = this.currentTime + cooldown;
    }

    this.attachToNode(targetIndex, true);
    return true;
  }

  private tryCaptureUpgradeBranch() {
    for (let index = 0; index < this.upgradeBranches.length; index += 1) {
      const branch = this.upgradeBranches[index];
      const node = branch.nodes[0];
      if (!node) continue;
      const distance = Math.hypot(this.playerPosition.x - node.x, this.playerPosition.y - node.y);
      const captureRadius = node.radius + 1.12 + this.runUpgrades.modifiers.captureRadius + this.runUpgrades.modifiers.landingTolerance;
      if (distance <= captureRadius) {
        return this.commitUpgradeBranch(index, false);
      }
    }

    return false;
  }

  private commitUpgradeBranch(index: number, directSelect: boolean) {
    const branch = this.upgradeBranches[index];
    if (!branch) return false;

    if (directSelect) {
      const node = branch.nodes[0];
      this.playerPosition.set(node.x + this.orbitRadiusTarget, node.y, 0);
      this.playerVelocity.set(0, 0, 0);
    }

    this.pathBuffer.replaceFuture(this.attachedAnchorIndex, branch.nodes);
    this.pathBuffer.ensureAhead(this.attachedAnchorIndex + branch.nodes.length, 50, 120);
    this.runUpgrades = applyItemToRunState(this.runUpgrades, branch.offer.item.id);
    this.currentOffers = [];
    this.upgradeBranches = [];
    this.remainingExtraJumps = this.runUpgrades.modifiers.extraJumps;
    this.remainingAirDashes = this.runUpgrades.modifiers.airDashCharges;
    this.state = 'running';
    this.attachToNode(this.attachedAnchorIndex + 1, true);
    this.nextUpgradeMilestone = getNextUpgradeMilestone(this.score);
    this.emitScore();
    return true;
  }

  private buildUpgradeBranches() {
    const milestone = this.getResolvedNode(this.attachedAnchorIndex);
    const baseDirection = getDirectionVector(milestone.direction);
    const forward = this.scratchVector.set(baseDirection.x, baseDirection.y, 0).normalize();
    const side = this.scratchVectorB.set(-forward.y, forward.x, 0);
    const profile = getDifficultyProfile(this.score);
    const spacing = profile.spacing * 1.3;

    return this.currentOffers.map((offer, branchIndex) => {
      const laneOffset = branchIndex - 1;
      const curveDirection = laneOffset === 0 ? 0 : laneOffset > 0 ? 1 : -1;
      const primary = this.scratchVectorC.copy(forward).addScaledVector(side, laneOffset * 0.74).normalize();

      const branchNodes: PathNode[] = [];
      for (let step = 0; step < 4; step += 1) {
        const stepRatio = step / 3;
        const forwardDistance = spacing * (1.15 + step * 0.72);
        const outwardDrift = laneOffset * (3.3 + step * 1.7);
        const curveDrift = curveDirection * Math.sin(stepRatio * Math.PI) * 2.1;
        const verticalLift = laneOffset === 0 ? (step % 2 === 0 ? 1.15 : -0.75) : step * 0.42 * laneOffset;
        const nodeDirection = laneOffset < 0
          ? step < 2 ? 'up_left' : 'down_left'
          : laneOffset > 0
            ? step < 2 ? 'up_right' : 'down_right'
            : step % 2 === 0
              ? 'up'
              : milestone.direction;
        branchNodes.push({
          index: this.attachedAnchorIndex + step + 1,
          x: milestone.resolvedX + primary.x * forwardDistance + side.x * (outwardDrift + curveDrift),
          y: milestone.resolvedY + primary.y * forwardDistance + side.y * (outwardDrift * 0.26) + verticalLift,
          z: 0,
          radius: 1.55 + step * 0.14,
          direction: nodeDirection,
          kind: 'branch',
          branchSlot: branchIndex,
          offerId: offer.item.id,
          onboarding: false,
          motionSeed: milestone.motionSeed + branchIndex * 0.9 + step * 0.32
        });
      }

      return {
        offer,
        nodes: branchNodes
      };
    });
  }

  private failRun() {
    this.state = 'game_over';
    this.accelerating = false;
    this.chargeMeter = 0;
    this.currentOffers = [];
  }

  private emitScore() {
    this.scoreListeners.forEach((callback) => callback());
  }

  private captureVisiblePlatformPositions(count: number) {
    return this.pool.slice(0, count).map((platform, index) => {
      if (!platform.group.visible) {
        const node = this.getResolvedNode(this.visibleWindowStart + index);
        return new THREE.Vector3(node.resolvedX, node.resolvedY, node.resolvedZ);
      }
      return platform.group.position.clone();
    });
  }

  private syncTransitionPlatforms() {
    this.pool.forEach((platform, index) => {
      const start = this.transitionFromPositions[index];
      const target = this.transitionToPositions[index];
      if (!start || !target) {
        platform.group.visible = false;
        return;
      }

      platform.group.visible = this.renderPlatforms;
      platform.group.position.set(
        THREE.MathUtils.lerp(start.x, target.x, this.transitionProgress),
        THREE.MathUtils.lerp(start.y, target.y, this.transitionProgress),
        THREE.MathUtils.lerp(start.z, target.z, this.transitionProgress)
      );
      platform.group.scale.setScalar(1);
    });
  }

  private syncVisiblePlatforms(elapsedTime: number) {
    this.pool.forEach((platform, poolIndex) => {
      const node = this.getResolvedNode(this.visibleWindowStart + poolIndex);
      platform.group.visible = this.renderPlatforms;
      platform.group.position.set(node.resolvedX, node.resolvedY, node.resolvedZ);
      platform.group.scale.setScalar(this.getVisualScaleForNode(node));
      platform.group.rotation.x = Math.sin(elapsedTime * 0.9 + poolIndex) * 0.12;
    });
  }

  private getResolvedNode(index: number): ResolvedPathNode {
    return this.pathBuffer.getResolvedNode(index, this.currentTime, this.attachedAnchorIndex);
  }

  private getVisibleNodes(count: number) {
    if (!(this.state === 'upgrade_choice' && this.upgradeBranches.length > 0)) {
      return this.pathBuffer.getWindow(this.visibleWindowStart, count, this.currentTime, this.attachedAnchorIndex);
    }

    const nodes: ResolvedPathNode[] = [];
    const preStart = Math.max(0, this.attachedAnchorIndex - 2);
    for (let index = preStart; index <= this.attachedAnchorIndex; index += 1) {
      nodes.push(this.getResolvedNode(index));
    }

    this.upgradeBranches.forEach((branch) => {
      branch.nodes.slice(0, 2).forEach((node) => {
        nodes.push({
          ...node,
          resolvedX: node.x,
          resolvedY: node.y,
          resolvedZ: node.z
        });
      });
    });

    while (nodes.length < count) {
      nodes.push(this.getResolvedNode(this.attachedAnchorIndex + 1 + (nodes.length - (this.attachedAnchorIndex - preStart + 1))));
    }

    return nodes.slice(0, count);
  }

  private updateCameraPose(deltaTime: number) {
    const currentNode = this.getResolvedNode(this.attachedAnchorIndex);
    const nextNode = this.getResolvedNode(this.attachedAnchorIndex + 1);
    const cameraState = this.state === 'transition' ? 'transition' : this.state === 'upgrade_choice' ? 'upgrade_choice' : this.state === 'game_over' ? 'game_over' : 'running';
    const choiceNodes = this.upgradeBranches.map((branch) => branch.nodes[0]).filter(Boolean).map((node) => ({
      ...node,
      resolvedX: node.x,
      resolvedY: node.y,
      resolvedZ: node.z
    }));
    this.cameraPath.update(deltaTime, cameraState, this.score, this.playerPosition, currentNode, nextNode, choiceNodes);
    const pose = this.cameraPath.getPose();
    this.cameraPosition.copy(pose.position);
    this.cameraLookAt.copy(pose.lookAt);
  }

  private enforceSafeZone() {
    if (this.playerState === 'airborne') {
      if (this.cameraPath.isOutsideSafeZone(this.playerPosition) || this.cameraPath.isOutsideViewport(this.playerPosition)) {
        this.failRun();
      }
      return;
    }

    const currentNode = this.getResolvedNode(this.attachedAnchorIndex);
    this.scratchVector.set(currentNode.resolvedX, currentNode.resolvedY, 0);
    if (this.cameraPath.isOutsideSafeZone(this.scratchVector) || this.cameraPath.isOutsideViewport(this.playerPosition)) {
      this.failRun();
    }
  }

  private getOrbitFacingAngle() {
    const orbitDirection = Math.sign(this.angularSpeed) || 1;
    return this.angle + (orbitDirection >= 0 ? Math.PI / 2 : -Math.PI / 2);
  }

  private getOrbitRadiusForNode(node: ResolvedPathNode) {
    return 1.08 + node.radius * 0.76;
  }

  private getVisualScaleForNode(node?: Pick<ResolvedPathNode, 'radius' | 'kind'> | null) {
    if (!node) return 1;
    if (node.kind === 'milestone') {
      return Math.max(5.2, node.radius * 0.78);
    }
    if (node.kind === 'branch') {
      return Math.max(1.32, node.radius / 1.18);
    }
    return node.radius / 1.4;
  }
}
