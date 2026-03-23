import type { GameAudioEvent, GameAudioRuntimeState } from './gameAudioTypes';
import type { LandingGrade } from './gameSessionTypes';
import type { RogueliteModuleSlot } from './roguelite';
import { damp } from '../core/math';

const AUDIO_VOLUME_KEY = 'portfolio-game-audio-volume-v1';
const AUDIO_MUTE_KEY = 'portfolio-game-audio-muted-v1';
const DEFAULT_VOLUME = 0.86;

type MusicTrackId = 'intro' | 'loop1' | 'loop2' | 'loop3' | 'loop4';
type BusKey = 'music' | 'feedback' | 'combat' | 'ambient';
type LoopKey = 'blower' | 'glide' | 'on_shard';

interface AudioSettings {
  volume: number;
  muted: boolean;
}

interface StereoTrackUrls {
  left: string;
  right: string;
}

interface ActiveLoop {
  source: AudioBufferSourceNode;
  gain: GainNode;
}

interface ActiveMusicTrack {
  id: MusicTrackId;
  stop: () => void;
  setPlaybackRate: (value: number) => void;
}

interface MusicTrackAnalysis {
  frameRate: number;
  frames: Float32Array;
  duration: number;
}

export interface MusicReactiveState {
  active: boolean;
  bassIntensity: number;
  midIntensity: number;
  melodyIntensity: number;
  overallEnergy: number;
  momentumRatio: number;
  difficultyRatio: number;
}

const MUSIC_TRACKS: Record<MusicTrackId, StereoTrackUrls> = {
  intro: {
    left: new URL('../../assets/audio/music/intro/left.wav', import.meta.url).href,
    right: new URL('../../assets/audio/music/intro/right.wav', import.meta.url).href
  },
  loop1: {
    left: new URL('../../assets/audio/music/loops/loop-01/left.wav', import.meta.url).href,
    right: new URL('../../assets/audio/music/loops/loop-01/right.wav', import.meta.url).href
  },
  loop2: {
    left: new URL('../../assets/audio/music/loops/loop-02/left.wav', import.meta.url).href,
    right: new URL('../../assets/audio/music/loops/loop-02/right.wav', import.meta.url).href
  },
  loop3: {
    left: new URL('../../assets/audio/music/loops/loop-03/left.wav', import.meta.url).href,
    right: new URL('../../assets/audio/music/loops/loop-03/right.wav', import.meta.url).href
  },
  loop4: {
    left: new URL('../../assets/audio/music/loops/loop-04/left.wav', import.meta.url).href,
    right: new URL('../../assets/audio/music/loops/loop-04/right.wav', import.meta.url).href
  }
};

const SFX = {
  blowerOn: [new URL('../../assets/audio/sfx/modules/blower/on.wav', import.meta.url).href],
  blowerOff: [new URL('../../assets/audio/sfx/modules/blower/off.wav', import.meta.url).href],
  boatBoost: [new URL('../../assets/audio/sfx/player/boat/boost.wav', import.meta.url).href],
  playerJump: [
    new URL('../../assets/audio/sfx/player/jump/jump-02.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/player/jump/jump-03.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/player/jump/jump-04.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/player/jump/jump-05.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/player/jump/jump-06.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/player/jump/jump-07.wav', import.meta.url).href
  ],
  land: [
    new URL('../../assets/audio/sfx/player/boat/land-01.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/player/boat/land-02.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/player/boat/land-03.wav', import.meta.url).href
  ],
  rewardLand: [new URL('../../assets/audio/sfx/gameplay/reward-shard-land.wav', import.meta.url).href],
  sail: [
    new URL('../../assets/audio/sfx/environment/sail-flap-01.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/environment/sail-flap-02.wav', import.meta.url).href
  ],
  planeGlide: [new URL('../../assets/audio/sfx/environment/plane-glide.wav', import.meta.url).href],
  playerOnShard: [new URL('../../assets/audio/sfx/player/on-shard.wav', import.meta.url).href],
  bigCannon: [
    new URL('../../assets/audio/sfx/modules/cannons/big-shot-01.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/modules/cannons/big-shot-02.wav', import.meta.url).href
  ],
  frontCannon: [
    new URL('../../assets/audio/sfx/modules/cannons/front-shot-01.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/modules/cannons/front-shot-02.wav', import.meta.url).href
  ],
  grappleCastReturn: [new URL('../../assets/audio/sfx/modules/grappling-hook/cast-return.wav', import.meta.url).href],
  grappleImpact: [new URL('../../assets/audio/sfx/modules/grappling-hook/impact.wav', import.meta.url).href],
  shieldProtect: [
    new URL('../../assets/audio/sfx/modules/shield/protect-01.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/modules/shield/protect-02.wav', import.meta.url).href
  ],
  reactorCharge: [
    new URL('../../assets/audio/sfx/modules/reactor/charge-01.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/modules/reactor/charge-02.wav', import.meta.url).href
  ],
  thrusterCharge: [new URL('../../assets/audio/sfx/modules/thruster/charge.wav', import.meta.url).href],
  wingsCharge: [
    new URL('../../assets/audio/sfx/modules/wings/charge-01.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/modules/wings/charge-02.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/modules/wings/charge-03.wav', import.meta.url).href
  ],
  wrapperActivate: [new URL('../../assets/audio/sfx/modules/wrapper/activate.wav', import.meta.url).href],
  coinPickup: [
    new URL('../../assets/audio/sfx/ui/coin-pickup-01.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/ui/coin-pickup-02.wav', import.meta.url).href
  ],
  magnetCoin: [
    new URL('../../assets/audio/sfx/modules/magnet/coin-01.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/modules/magnet/coin-02.wav', import.meta.url).href
  ],
  shopLand: [new URL('../../assets/audio/sfx/ui/shop-land.wav', import.meta.url).href],
  enemyDie: [
    new URL('../../assets/audio/sfx/enemies/die-01.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/enemies/die-02.wav', import.meta.url).href,
    new URL('../../assets/audio/sfx/enemies/die-03.wav', import.meta.url).href
  ],
  enemyHitPlayer: [new URL('../../assets/audio/sfx/enemies/hit-player.wav', import.meta.url).href],
  gameOver: [new URL('../../assets/audio/sfx/ui/game-over.wav', import.meta.url).href],
  gradeFail: [new URL('../../assets/audio/sfx/ui/grade/fail.wav', import.meta.url).href],
  gradeGreat: [new URL('../../assets/audio/sfx/ui/grade/great.wav', import.meta.url).href],
  gradePerfect: [new URL('../../assets/audio/sfx/ui/grade/perfect.wav', import.meta.url).href],
  gradeSuper: [new URL('../../assets/audio/sfx/ui/grade/super.wav', import.meta.url).href],
  twistLand: [new URL('../../assets/audio/sfx/gameplay/twist-land.wav', import.meta.url).href],
  momentumLossStart: [new URL('../../assets/audio/sfx/gameplay/momentum-loss-start.wav', import.meta.url).href]
} as const;

export class GameAudioSystem {
  private context: AudioContext | null = null;
  private hasInteractiveAudioAuthorization = false;
  private readonly bufferCache = new Map<string, Promise<AudioBuffer>>();
  private readonly musicAnalysis = new Map<MusicTrackId, MusicTrackAnalysis>();
  private readonly settingsListeners = new Set<(settings: AudioSettings) => void>();
  private readonly activeLoops = new Map<LoopKey, ActiveLoop>();
  private readonly sfxCooldownUntil = new Map<string, number>();
  private masterGain: GainNode | null = null;
  private musicBusGain: GainNode | null = null;
  private feedbackBusGain: GainNode | null = null;
  private combatBusGain: GainNode | null = null;
  private ambientBusGain: GainNode | null = null;
  private musicTrack: ActiveMusicTrack | null = null;
  private musicPlayToken = 0;
  private pendingRunStart = false;
  private enabled = false;
  private preloaded = false;
  private lastState: GameAudioRuntimeState | null = null;
  private musicTrackStartedAt = 0;
  private reactiveBass = 0;
  private reactiveMid = 0;
  private reactiveMelody = 0;
  private reactiveEnergy = 0;
  private musicPlaybackRate = 1;
  private musicTrackAnalysisElapsed = 0;
  private volume = this.readStoredVolume();
  private muted = this.readStoredMuted();

  onSettingsChange(listener: (settings: AudioSettings) => void) {
    this.settingsListeners.add(listener);
    listener(this.getSettings());
    return () => this.settingsListeners.delete(listener);
  }

  getSettings(): AudioSettings {
    return {
      volume: this.volume,
      muted: this.muted
    };
  }

  registerUserGesture() {
    if (this.hasInteractiveAudioAuthorization) {
      return;
    }
    this.hasInteractiveAudioAuthorization = true;
    const context = this.ensureContext();
    void context.resume().catch(() => {
      // Not fatal, audio may remain suspended until a later gesture.
    });
    if (!this.preloaded) {
      this.preloaded = true;
      void this.preloadCoreAssets();
    }
  }

  prime() {
    if (!this.hasInteractiveAudioAuthorization) {
      return;
    }
    const context = this.ensureContext();
    if (context.state === 'suspended') {
      void context.resume().catch(() => {
        // Not fatal. Deadlock if no user gesture yet.
      });
    }

    if (!this.preloaded) {
      this.preloaded = true;
      void this.preloadCoreAssets();
    }
  }

  setEnabled(enabled: boolean) {
    if (this.enabled === enabled) {
      return;
    }
    this.enabled = enabled;
    if (!enabled) {
      this.pendingRunStart = false;
      this.stopMusic();
      this.stopAllLoops(false);
      this.reactiveBass = 0;
      this.reactiveMid = 0;
      this.reactiveMelody = 0;
      this.reactiveEnergy = 0;
      this.musicPlaybackRate = 1;
      this.musicTrackAnalysisElapsed = 0;
      return;
    }
    this.prime();
  }

  setVolume(nextVolume: number) {
    this.volume = clamp(nextVolume, 0, 1);
    window.localStorage.setItem(AUDIO_VOLUME_KEY, this.volume.toFixed(3));
    this.applyMasterGain();
    this.emitSettingsChange();
  }

  toggleMute() {
    this.setMuted(!this.muted);
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    window.localStorage.setItem(AUDIO_MUTE_KEY, muted ? '1' : '0');
    this.applyMasterGain();
    this.emitSettingsChange();
  }

  update(state: GameAudioRuntimeState, deltaTime: number) {
    this.lastState = state;
    if (!this.hasInteractiveAudioAuthorization) {
      this.updateReactiveMusic(deltaTime);
      return;
    }
    if (!this.enabled) {
      this.updateReactiveMusic(deltaTime);
      return;
    }
    this.prime();
    this.syncContinuousLoops(state);
    this.updateMusicPlaybackRate(state, deltaTime);
    this.updateReactiveMusic(deltaTime);
    if (this.pendingRunStart && !this.musicTrack) {
      this.pendingRunStart = false;
      void this.playMusicTrack('intro');
    }
  }

  getMusicReactiveState(): MusicReactiveState {
    return {
      active: this.enabled && this.musicTrack !== null,
      bassIntensity: this.reactiveBass,
      midIntensity: this.reactiveMid,
      melodyIntensity: this.reactiveMelody,
      overallEnergy: this.reactiveEnergy,
      momentumRatio: this.lastState?.momentumRatio ?? 0,
      difficultyRatio: clamp((this.lastState?.distanceMeters ?? 0) / 500, 0, 1)
    };
  }

  handleEvent(event: GameAudioEvent) {
    if (event.type === 'run_start') {
      this.prime();
      this.pendingRunStart = true;
      this.stopMusic();
      this.stopAllLoops(false);
      return;
    }
    if (!this.enabled) {
      return;
    }

    switch (event.type) {
      case 'jump':
        this.playOneShot(this.pickRandom(SFX.playerJump), 'feedback', 0.58, 'jump', 90);
        if (event.maxBoost) {
          this.playOneShot(SFX.boatBoost[0], 'feedback', 0.54, 'boost', 140);
        }
        break;
      case 'sail':
        this.playOneShot(event.fast ? SFX.sail[1] : SFX.sail[0], 'ambient', 0.22, 'sail', 110);
        break;
      case 'land':
        if (event.kind === 'shop') {
          this.playOneShot(SFX.shopLand[0], 'feedback', 0.48, 'shop-land', 180);
        } else if (event.kind === 'reward') {
          this.playOneShot(SFX.rewardLand[0], 'feedback', 0.42, 'reward-land', 180);
        } else {
          this.playOneShot(this.pickRandom(SFX.land), 'feedback', event.kind === 'milestone' ? 0.24 : 0.18, 'land', 180);
        }
        break;
      case 'grade':
        this.playOneShot(this.resolveGradeClip(event.grade), 'feedback', 0.42, `grade:${event.grade}`, 140);
        break;
      case 'twist':
        this.playOneShot(SFX.twistLand[0], 'feedback', 0.46, 'twist', 140);
        break;
      case 'module_activate':
        this.playModuleClip(event.slot);
        break;
      case 'grapple_cast':
        this.playOneShot(SFX.grappleCastReturn[0], 'combat', 0.96, 'grapple-cast', 100);
        break;
      case 'grapple_hit':
        this.playOneShot(SFX.grappleImpact[0], 'combat', 1.04, 'grapple-hit', 90);
        break;
      case 'grapple_recall':
        this.playOneShot(SFX.grappleCastReturn[0], 'combat', 0.86, 'grapple-recall', 100);
        break;
      case 'coin':
        this.playOneShot(
          this.pickRandom(event.magnet ? SFX.magnetCoin : SFX.coinPickup),
          'ambient',
          event.magnet ? 1.12 : 0.94,
          event.magnet ? 'magnet-coin' : 'coin',
          70
        );
        break;
      case 'shop_land':
        this.playOneShot(SFX.shopLand[0], 'feedback', 0.48, 'shop-land', 180);
        break;
      case 'enemy_die':
        this.playOneShot(this.pickRandom(SFX.enemyDie), 'combat', 0.36, 'enemy-die', 90);
        break;
      case 'enemy_hit_player':
        this.playOneShot(SFX.enemyHitPlayer[0], 'feedback', 0.4, 'enemy-hit-player', 120);
        break;
      case 'game_over':
        this.stopAllLoops(false);
        this.playOneShot(SFX.gameOver[0], 'feedback', 0.58, 'game-over', 320);
        break;
      case 'momentum_loss_start':
        this.playOneShot(SFX.momentumLossStart[0], 'ambient', 0.2, 'momentum-loss', 280);
        break;
    }
  }

  private ensureContext() {
    if (this.context) {
      return this.context;
    }
    if (!this.hasInteractiveAudioAuthorization) {
      throw new Error('AudioContext is locked until user gesture.');
    }
    this.createAudioContext();
    return this.context!;
  }

  private createAudioContext() {
    if (this.context) {
      return;
    }
    this.context = new AudioContext();
    this.masterGain = this.context.createGain();
    this.musicBusGain = this.context.createGain();
    this.feedbackBusGain = this.context.createGain();
    this.combatBusGain = this.context.createGain();
    this.ambientBusGain = this.context.createGain();
    this.musicBusGain.gain.value = 0.92;
    this.feedbackBusGain.gain.value = 0.26;
    this.combatBusGain.gain.value = 0.22;
    this.ambientBusGain.gain.value = 0.16;
    this.musicBusGain.connect(this.masterGain);
    this.feedbackBusGain.connect(this.masterGain);
    this.combatBusGain.connect(this.masterGain);
    this.ambientBusGain.connect(this.masterGain);
    this.masterGain.connect(this.context.destination);
    this.applyMasterGain();
  }

  private async preloadCoreAssets() {
    const urls = [
      ...Object.values(MUSIC_TRACKS).flatMap((track) => [track.left, track.right]),
      SFX.playerJump[0],
      SFX.playerJump[1],
      SFX.land[0],
      SFX.gradeGreat[0],
      SFX.gradePerfect[0],
      SFX.gradeSuper[0],
      SFX.gradeFail[0],
      SFX.gameOver[0],
      SFX.blowerOn[0],
      SFX.blowerOff[0],
      SFX.planeGlide[0],
      SFX.playerOnShard[0]
    ];
    for (const url of urls) {
      try {
        await this.loadBuffer(url);
      } catch (error) {
        console.warn(`[GameAudioSystem] Failed to preload audio asset: ${url}`, error);
      }
    }
    await this.preloadMusicAnalyses();
  }

  private applyMasterGain() {
    if (!this.masterGain || !this.context) {
      return;
    }
    const nextValue = this.muted ? 0 : this.volume;
    const now = this.context.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(nextValue, now + 0.05);
  }

  private emitSettingsChange() {
    const settings = this.getSettings();
    this.settingsListeners.forEach((listener) => listener(settings));
  }

  private async loadBuffer(url: string) {
    if (!this.hasInteractiveAudioAuthorization) {
      return Promise.reject(new Error('AudioContext is locked until user gesture.'));
    }
    const cached = this.bufferCache.get(url);
    if (cached) {
      return cached;
    }
    let context: AudioContext;
    try {
      context = this.ensureContext();
    } catch (error) {
      return Promise.reject(error);
    }
    const request = fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load audio asset: ${url}`);
        }
        return response.arrayBuffer();
      })
      .then((data) => context.decodeAudioData(data.slice(0)))
      .catch((error) => {
        this.bufferCache.delete(url);
        throw error;
      });
    this.bufferCache.set(url, request);
    return request;
  }

  private async playMusicTrack(trackId: MusicTrackId) {
    if (!this.enabled) {
      return;
    }
    const token = ++this.musicPlayToken;
    const track = MUSIC_TRACKS[trackId];
    let leftBuffer: AudioBuffer;
    let rightBuffer: AudioBuffer;
    try {
      [leftBuffer, rightBuffer] = await Promise.all([this.loadBuffer(track.left), this.loadBuffer(track.right)]);
    } catch (error) {
      console.warn(`[GameAudioSystem] Failed to start music track: ${trackId}`, error);
      if (token === this.musicPlayToken) {
        this.musicTrack = null;
      }
      return;
    }
    if (!this.enabled || token !== this.musicPlayToken || !this.context || !this.musicBusGain) {
      return;
    }
    this.stopCurrentMusicTrack();
    const leftSource = this.context.createBufferSource();
    const rightSource = this.context.createBufferSource();
    leftSource.buffer = leftBuffer;
    rightSource.buffer = rightBuffer;
    const merger = this.context.createChannelMerger(2);
    leftSource.connect(merger, 0, 0);
    rightSource.connect(merger, 0, 1);
    merger.connect(this.musicBusGain);
    let endedCount = 0;
    const handleEnded = () => {
      endedCount += 1;
      if (endedCount < 2 || token !== this.musicPlayToken) {
        return;
      }
      if (this.musicTrack?.id === trackId) {
        this.musicTrack = null;
      }
      void this.playMusicTrack(this.resolveNextMusicTrack(trackId));
    };
    leftSource.onended = handleEnded;
    rightSource.onended = handleEnded;
    this.musicTrackStartedAt = this.context.currentTime;
    this.musicTrackAnalysisElapsed = 0;
    leftSource.start();
    rightSource.start();
    this.musicTrack = {
      id: trackId,
      setPlaybackRate: (value) => {
        leftSource.playbackRate.setTargetAtTime(value, this.context!.currentTime, 0.12);
        rightSource.playbackRate.setTargetAtTime(value, this.context!.currentTime, 0.12);
      },
      stop: () => {
        leftSource.onended = null;
        rightSource.onended = null;
        try {
          leftSource.stop();
        } catch {
          // Ignore stop races on already-ended sources.
        }
        try {
          rightSource.stop();
        } catch {
          // Ignore stop races on already-ended sources.
        }
      }
    };
    const startPlaybackRate = this.resolveMusicPlaybackRate(trackId, this.lastState?.distanceMeters ?? 0);
    this.musicPlaybackRate = startPlaybackRate;
    this.musicTrack.setPlaybackRate(startPlaybackRate);
  }

  private stopMusic() {
    this.musicPlayToken += 1;
    this.stopCurrentMusicTrack();
  }

  private stopCurrentMusicTrack() {
    this.musicTrack?.stop();
    this.musicTrack = null;
    this.musicTrackStartedAt = 0;
    this.musicTrackAnalysisElapsed = 0;
    this.musicPlaybackRate = 1;
  }

  private resolveNextMusicTrack(previousTrack: MusicTrackId): MusicTrackId {
    if (previousTrack === 'intro') {
      return 'loop1';
    }
    const distance = this.lastState?.distanceMeters ?? 0;
    if (distance <= 100) return 'loop1';
    if (distance <= 150) return 'loop2';
    if (distance <= 200) return 'loop3';
    if (distance <= 250) return 'loop4';
    if (previousTrack === 'loop1') return 'loop2';
    if (previousTrack === 'loop2') return 'loop3';
    if (previousTrack === 'loop3') return 'loop4';
    return 'loop1';
  }

  private async preloadMusicAnalyses() {
    for (const trackId of Object.keys(MUSIC_TRACKS) as MusicTrackId[]) {
      if (this.musicAnalysis.has(trackId)) {
        continue;
      }
      const { left, right } = MUSIC_TRACKS[trackId];
      try {
        const [leftBuffer, rightBuffer] = await Promise.all([this.loadBuffer(left), this.loadBuffer(right)]);
        this.musicAnalysis.set(trackId, this.analyzeMusicTrack(leftBuffer, rightBuffer));
      } catch (error) {
        console.warn(`[GameAudioSystem] Failed to analyze music track: ${trackId}`, error);
      }
    }
  }

  private analyzeMusicTrack(leftBuffer: AudioBuffer, rightBuffer: AudioBuffer): MusicTrackAnalysis {
    const sampleRate = leftBuffer.sampleRate;
    const leftData = leftBuffer.getChannelData(0);
    const rightData = rightBuffer.getChannelData(0);
    const sampleCount = Math.min(leftData.length, rightData.length);
    const frameRate = 30;
    const frameSize = Math.max(1, Math.floor(sampleRate / frameRate));
    const frameCount = Math.max(1, Math.ceil(sampleCount / frameSize));
    const frames = new Float32Array(frameCount * 4);
    let lowPass = 0;
    let melodicBand = 0;
    let bassPeak = 0;
    let midPeak = 0;
    let melodyPeak = 0;
    let energyPeak = 0;

    for (let frameIndex = 0; frameIndex < frameCount; frameIndex += 1) {
      const start = frameIndex * frameSize;
      const end = Math.min(sampleCount, start + frameSize);
      let bassAccum = 0;
      let midAccum = 0;
      let melodyAccum = 0;
      let energyAccum = 0;
      for (let sampleIndex = start; sampleIndex < end; sampleIndex += 1) {
        const mono = (leftData[sampleIndex]! + rightData[sampleIndex]!) * 0.5;
        lowPass += (mono - lowPass) * 0.045;
        const mid = mono - lowPass;
        melodicBand += (mid - melodicBand) * 0.22;
        const melody = mid - melodicBand;
        bassAccum += lowPass * lowPass;
        midAccum += mid * mid;
        melodyAccum += melody * melody;
        energyAccum += mono * mono;
      }
      const sampleSpan = Math.max(1, end - start);
      const bass = Math.sqrt(bassAccum / sampleSpan);
      const mid = Math.sqrt(midAccum / sampleSpan);
      const melody = Math.sqrt(melodyAccum / sampleSpan);
      const energy = Math.sqrt(energyAccum / sampleSpan);
      const frameOffset = frameIndex * 4;
      frames[frameOffset] = bass;
      frames[frameOffset + 1] = mid;
      frames[frameOffset + 2] = melody;
      frames[frameOffset + 3] = energy;
      bassPeak = Math.max(bassPeak, bass);
      midPeak = Math.max(midPeak, mid);
      melodyPeak = Math.max(melodyPeak, melody);
      energyPeak = Math.max(energyPeak, energy);
    }

    const bassScale = bassPeak > 0 ? 1 / bassPeak : 1;
    const midScale = midPeak > 0 ? 1 / midPeak : 1;
    const melodyScale = melodyPeak > 0 ? 1 / melodyPeak : 1;
    const energyScale = energyPeak > 0 ? 1 / energyPeak : 1;
    for (let frameIndex = 0; frameIndex < frameCount; frameIndex += 1) {
      const frameOffset = frameIndex * 4;
      frames[frameOffset] = clamp(Math.pow(frames[frameOffset] * bassScale, 0.82), 0, 1);
      frames[frameOffset + 1] = clamp(Math.pow(frames[frameOffset + 1] * midScale, 0.92), 0, 1);
      frames[frameOffset + 2] = clamp(Math.pow(frames[frameOffset + 2] * melodyScale, 0.94), 0, 1);
      frames[frameOffset + 3] = clamp(Math.pow(frames[frameOffset + 3] * energyScale, 0.86), 0, 1);
    }

    return {
      frameRate,
      frames,
      duration: sampleCount / sampleRate
    };
  }

  private updateReactiveMusic(deltaTime: number) {
    const analysis = this.musicTrack ? this.musicAnalysis.get(this.musicTrack.id) : null;
    if (!analysis || !this.context || this.musicTrack === null) {
      this.reactiveBass = damp(this.reactiveBass, 0, 8, deltaTime);
      this.reactiveMid = damp(this.reactiveMid, 0, 8, deltaTime);
      this.reactiveMelody = damp(this.reactiveMelody, 0, 8, deltaTime);
      this.reactiveEnergy = damp(this.reactiveEnergy, 0, 8, deltaTime);
      return;
    }

    this.musicTrackAnalysisElapsed = clamp(this.musicTrackAnalysisElapsed + deltaTime * this.musicPlaybackRate, 0, analysis.duration);
    const { bass, mid, melody, energy } = this.sampleMusicAnalysis(analysis, this.musicTrackAnalysisElapsed);
    this.reactiveBass = damp(this.reactiveBass, bass, 5.5, deltaTime);
    this.reactiveMid = damp(this.reactiveMid, mid, 7.2, deltaTime);
    this.reactiveMelody = damp(this.reactiveMelody, melody, 8.4, deltaTime);
    this.reactiveEnergy = damp(this.reactiveEnergy, energy, 6.2, deltaTime);
  }

  private sampleMusicAnalysis(analysis: MusicTrackAnalysis, elapsed: number) {
    const frameCount = analysis.frames.length / 4;
    if (frameCount <= 1 || analysis.duration <= 0) {
      return {
        bass: analysis.frames[0] ?? 0,
        mid: analysis.frames[1] ?? 0,
        melody: analysis.frames[2] ?? 0,
        energy: analysis.frames[3] ?? 0
      };
    }
    const framePosition = clamp(elapsed * analysis.frameRate, 0, frameCount - 1);
    const baseIndex = Math.floor(framePosition);
    const nextIndex = Math.min(frameCount - 1, baseIndex + 1);
    const blend = framePosition - baseIndex;
    const baseOffset = baseIndex * 4;
    const nextOffset = nextIndex * 4;
    return {
      bass: lerp(analysis.frames[baseOffset] ?? 0, analysis.frames[nextOffset] ?? 0, blend),
      mid: lerp(analysis.frames[baseOffset + 1] ?? 0, analysis.frames[nextOffset + 1] ?? 0, blend),
      melody: lerp(analysis.frames[baseOffset + 2] ?? 0, analysis.frames[nextOffset + 2] ?? 0, blend),
      energy: lerp(analysis.frames[baseOffset + 3] ?? 0, analysis.frames[nextOffset + 3] ?? 0, blend)
    };
  }

  private updateMusicPlaybackRate(state: GameAudioRuntimeState, deltaTime: number) {
    const targetRate = this.resolveMusicPlaybackRate(this.musicTrack?.id ?? null, state.distanceMeters);
    this.musicPlaybackRate = damp(this.musicPlaybackRate, targetRate, 2.4, deltaTime);
    this.musicTrack?.setPlaybackRate(this.musicPlaybackRate);
  }

  private resolveMusicPlaybackRate(trackId: MusicTrackId | null, distanceMeters: number) {
    if (!trackId || trackId === 'intro') {
      return 1;
    }
    return lerp(1, 1.12, clamp((distanceMeters - 300) / 200, 0, 1));
  }

  private syncContinuousLoops(state: GameAudioRuntimeState) {
    const interactiveRun = state.state === 'running' || state.state === 'upgrade_choice';
    const blowerShouldPlay = interactiveRun && state.blowerActive;
    const blowerWasPlaying = this.activeLoops.has('blower');
    if (blowerShouldPlay) {
      this.ensureLoop('blower', SFX.blowerOn[0], 'ambient', 0.34);
    } else if (blowerWasPlaying) {
      this.stopLoop('blower');
      this.playOneShot(SFX.blowerOff[0], 'ambient', 0.16, 'blower-off', 80);
    }
    if (interactiveRun && state.glideActive) {
      this.ensureLoop('glide', SFX.planeGlide[0], 'ambient', 0.42);
    } else {
      this.stopLoop('glide');
    }
    if (interactiveRun && state.onShardActive) {
      this.ensureLoop('on_shard', SFX.playerOnShard[0], 'ambient', 0.1);
    } else {
      this.stopLoop('on_shard');
    }
  }

  private async ensureLoop(key: LoopKey, url: string, bus: BusKey, gainScale: number) {
    if (!this.hasInteractiveAudioAuthorization) {
      return;
    }
    if (this.activeLoops.has(key)) {
      return;
    }
    if (!url) {
      console.warn(`[GameAudioSystem] Missing loop url for: ${key}`);
      return;
    }
    const contextAndBus = this.getContextAndBus(bus);
    if (!contextAndBus) {
      return;
    }
    const [context, busGain] = contextAndBus;
    let buffer: AudioBuffer;
    try {
      buffer = await this.loadBuffer(url);
    } catch (error) {
      console.warn(`[GameAudioSystem] Failed to start loop: ${key}`, error);
      return;
    }
    if (!this.enabled || this.activeLoops.has(key)) {
      return;
    }
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const gain = context.createGain();
    gain.gain.value = 0;
    source.connect(gain);
    gain.connect(busGain);
    source.start();
    gain.gain.linearRampToValueAtTime(gainScale, context.currentTime + 0.12);
    this.activeLoops.set(key, { source, gain });
  }

  private stopLoop(key: LoopKey) {
    const active = this.activeLoops.get(key);
    if (!active || !this.context) {
      this.activeLoops.delete(key);
      return;
    }
    this.activeLoops.delete(key);
    const now = this.context.currentTime;
    active.gain.gain.cancelScheduledValues(now);
    active.gain.gain.setValueAtTime(active.gain.gain.value, now);
    active.gain.gain.linearRampToValueAtTime(0, now + 0.08);
    window.setTimeout(() => {
      try {
        active.source.stop();
      } catch {
        // Ignore stop races on already-ended loop sources.
      }
    }, 90);
  }

  private stopAllLoops(playReleaseFx: boolean) {
    const blowerWasPlaying = playReleaseFx && this.activeLoops.has('blower');
    (Array.from(this.activeLoops.keys()) as LoopKey[]).forEach((key) => this.stopLoop(key));
    if (blowerWasPlaying) {
      this.playOneShot(SFX.blowerOff[0], 'ambient', 0.16, 'blower-off', 80);
    }
  }

  private playModuleClip(slot: RogueliteModuleSlot) {
    switch (slot) {
      case 'shield':
        this.playOneShot(this.pickRandom(SFX.shieldProtect), 'feedback', 0.46, 'shield', 120);
        break;
      case 'reacteur_front':
      case 'reacteur_back':
        this.playOneShot(this.pickRandom(SFX.reactorCharge), 'feedback', 0.42, `reactor:${slot}`, 90);
        break;
      case 'propulseur':
        this.playOneShot(SFX.thrusterCharge[0], 'feedback', 0.4, 'thruster', 90);
        break;
      case 'wings':
        this.playOneShot(this.pickRandom(SFX.wingsCharge), 'feedback', 0.4, 'wings', 90);
        break;
      case 'wrapper':
        this.playOneShot(SFX.wrapperActivate[0], 'feedback', 0.98, 'wrapper', 140);
        break;
      case 'big_canon':
        this.playOneShot(this.pickRandom(SFX.bigCannon), 'combat', 0.46, 'big-cannon', 70);
        break;
      case 'front_canon':
        this.playOneShot(this.pickRandom(SFX.frontCannon), 'combat', 0.38, 'front-cannon', 60);
        break;
      default:
        break;
    }
  }

  private resolveGradeClip(grade: LandingGrade) {
    if (grade === 'miss') return SFX.gradeFail[0];
    if (grade === 'perfect') return SFX.gradePerfect[0];
    if (grade === 'super') return SFX.gradeSuper[0];
    return SFX.gradeGreat[0];
  }

  private async playOneShot(url: string, bus: BusKey, gainScale: number, debounceKey: string, debounceMs: number) {
    if (!this.canPlayDebounced(debounceKey, debounceMs)) {
      return;
    }
    if (!this.hasInteractiveAudioAuthorization) {
      return;
    }
    if (!url) {
      console.warn(`[GameAudioSystem] Missing one-shot url for: ${debounceKey}`);
      return;
    }
    const contextAndBus = this.getContextAndBus(bus);
    if (!contextAndBus) {
      return;
    }
    const [context, busGain] = contextAndBus;
    let buffer: AudioBuffer;
    try {
      buffer = await this.loadBuffer(url);
    } catch (error) {
      console.warn(`[GameAudioSystem] Failed to play one-shot: ${url}`, error);
      return;
    }
    if (!this.enabled) {
      return;
    }
    const source = context.createBufferSource();
    source.buffer = buffer;
    const gain = context.createGain();
    gain.gain.value = gainScale;
    source.connect(gain);
    gain.connect(busGain);
    source.start();
  }

  private getContextAndBus(bus: BusKey): [AudioContext, GainNode] | null {
    if (!this.hasInteractiveAudioAuthorization || !this.context) {
      return null;
    }
    const busGain =
      bus === 'music'
        ? this.musicBusGain
        : bus === 'feedback'
          ? this.feedbackBusGain
          : bus === 'combat'
            ? this.combatBusGain
            : this.ambientBusGain;
    if (!busGain) {
      return null;
    }
    return [this.context, busGain] as const;
  }

  private canPlayDebounced(key: string, debounceMs: number) {
    const now = performance.now();
    const nextAllowedAt = this.sfxCooldownUntil.get(key) ?? 0;
    if (now < nextAllowedAt) {
      return false;
    }
    this.sfxCooldownUntil.set(key, now + debounceMs);
    return true;
  }

  private pickRandom(options: readonly string[]) {
    if (options.length === 0) {
      return '';
    }
    return options[Math.floor(Math.random() * options.length)] ?? options[0] ?? '';
  }

  private readStoredVolume() {
    const stored = Number(window.localStorage.getItem(AUDIO_VOLUME_KEY));
    return Number.isFinite(stored) ? clamp(stored, 0, 1) : DEFAULT_VOLUME;
  }

  private readStoredMuted() {
    return window.localStorage.getItem(AUDIO_MUTE_KEY) === '1';
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(from: number, to: number, alpha: number) {
  return from + (to - from) * alpha;
}
