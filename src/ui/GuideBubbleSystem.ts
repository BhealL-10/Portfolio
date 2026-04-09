import type { LocalizedText, PortfolioProject } from '../types/content';
import { damp } from '../core/math';
import { I18nService } from './I18nService';

const GUIDE_FLAG_STORAGE_KEY = 'portfolio-contextual-guide-flags-v2';
const GUIDE_ANCHOR_STORAGE_KEY = 'portfolio-contextual-guide-anchor-v1';
const GUIDE_PANEL_ASPECT_RATIO = 4981 / 4678;
const GUIDE_FRAME_COUNT = 5;
const GUIDE_DRAG_THRESHOLD = 10;
const MOBILE_GUIDE_BREAKPOINT = 680;
const TABLET_GUIDE_BREAKPOINT = 900;

const GUIDE_SPRITES = {
  arrive: new URL('../../assets/images/shared/branding/guide/guide-arrive.png', import.meta.url).href,
  idle: new URL('../../assets/images/shared/branding/guide/guide-idle.png', import.meta.url).href,
  idle2: new URL('../../assets/images/shared/branding/guide/guide-idle2.png', import.meta.url).href,
  leave: new URL('../../assets/images/shared/branding/guide/guide-leave.png', import.meta.url).href,
  talk: new URL('../../assets/images/shared/branding/guide/guide-talk.png', import.meta.url).href,
  constant: new URL('../../assets/images/shared/branding/guide/guide-constant.png', import.meta.url).href
} as const;

type GuideAnimationName = 'arrive' | 'idle' | 'idle2' | 'leave' | 'talk_hold' | 'talk_release';

const GUIDE_ANIMATIONS: Record<
  GuideAnimationName,
  {
    sprite: keyof typeof GUIDE_SPRITES;
    frameDuration: number;
    loop: boolean;
    frames: number[];
  }
> = {
  arrive: { sprite: 'arrive', frameDuration: 0.1, loop: false, frames: [0, 1, 2, 3, 4] },
  idle: { sprite: 'idle', frameDuration: 2, loop: true, frames: [0, 1, 2, 3, 4] },
  idle2: { sprite: 'idle2', frameDuration: 2.2, loop: true, frames: [0, 1, 2, 3, 4] },
  leave: { sprite: 'leave', frameDuration: 0.11, loop: false, frames: [0, 1, 2, 3, 4] },
  talk_hold: { sprite: 'talk', frameDuration: 10, loop: true, frames: [2] },
  talk_release: { sprite: 'talk', frameDuration: 0.12, loop: false, frames: [1, 2, 3, 4] }
};

const DEFAULT_SPEAKER_TITLE = {
  fr: 'Le guide',
  en: 'The guide'
} satisfies LocalizedText;

const VIEWPORT_MARGIN = 18;
const TARGET_GAP = 22;

export interface GuideTarget {
  x: number;
  y: number;
  width: number;
  height: number;
  guidePlacementHint?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'left' | 'right' | 'top' | 'bottom';
  bubblePlacementHint?: 'upper-left' | 'upper-right';
  flipGuideX?: boolean;
}

export interface GuidePresenceContext {
  visible: boolean;
  target: GuideTarget | null;
  zone:
    | 'hidden'
    | 'intro'
    | 'orbit'
    | 'focus'
    | 'drag'
    | 'slots'
    | 'primaterie'
    | 'game'
    | 'game_over'
    | 'about';
}

export type GuideCue =
  | { type: 'intro_mirror' }
  | { type: 'hub_arrival' }
  | { type: 'orbit_hover'; project: PortfolioProject }
  | { type: 'portfolio_scroll'; project: PortfolioProject; direction: 1 | -1 }
  | { type: 'focus_enter'; project: PortfolioProject; facetIndex: number }
  | { type: 'mirror_reveal' }
  | { type: 'drag_first' }
  | { type: 'slot_placed'; project: PortfolioProject; remainingSlots: number }
  | { type: 'two_slots_left' }
  | { type: 'one_slot_left' }
  | { type: 'slots_complete' }
  | { type: 'primaterie_arrival' }
  | { type: 'primaterie_hover'; item: 'portfolio' | 'adventure' | 'discord' | 'patreon' | 'theme' | 'language' }
  | { type: 'game_over_intro' }
  | { type: 'game_over_hover'; item: 'score' | 'avatar' | 'save' | 'leaderboard' | 'replay' | 'menu' }
  | { type: 'avatar_hover'; item: 'overview' | 'ears' | 'parts' | 'save' | 'close' }
  | { type: 'tutorial_hover'; item: 'entry' | 'nav' | 'close' }
  | { type: 'achievements_hover'; item: 'entry' | 'filters' | 'close' }
  | { type: 'settings_hover'; item: 'entry' | 'help' | 'theme' | 'language' | 'fullscreen' | 'mute' | 'volume' };

interface GuideMessage {
  id: string;
  priority: number;
  durationMs: number;
  title: LocalizedText;
  body: LocalizedText;
  target: GuideTarget | null;
  createdAt: number;
}

interface GuidePlacement {
  characterLeft: number;
  characterTop: number;
  characterSize: number;
  characterFlipX: boolean;
  panelLeft: number;
  panelTop: number;
  panelWidth: number;
  panelHeight: number;
  flipX: boolean;
  flipY: boolean;
}

interface GuideAnchor {
  x: number;
  y: number;
}

function loc(fr: string, en: string): LocalizedText {
  return { fr, en };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function rectsOverlap(a: { left: number; top: number; right: number; bottom: number }, b: { left: number; top: number; right: number; bottom: number }) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function buildRectFromTarget(target: GuideTarget) {
  return {
    left: target.x - target.width * 0.5,
    top: target.y - target.height * 0.5,
    right: target.x + target.width * 0.5,
    bottom: target.y + target.height * 0.5
  };
}

function buildRect(left: number, top: number, width: number, height: number) {
  return {
    left,
    top,
    right: left + width,
    bottom: top + height
  };
}

function expandRect(rect: { left: number; top: number; right: number; bottom: number }, padding: number) {
  return {
    left: rect.left - padding,
    top: rect.top - padding,
    right: rect.right + padding,
    bottom: rect.bottom + padding
  };
}

function getOrbitHoverBody(project: PortfolioProject): LocalizedText {
  switch (project.numericId) {
    case 1:
      return loc(
        'Le point de départ.',
        'The starting point.'
      );
    case 2:
      return loc(
        'Direction artistique.',
        'Art direction.'
      );
    case 3:
      return loc(
        'Cinéma.',
        'Cinema.'
      );
    case 4:
      return loc(
        'Jeux vidéo.',
        'Video games.'
      );
    case 5:
      return loc(
        'Collaborations.',
        'Collaborations.'
      );
    case 6:
      return loc(
        'Projets en cours.',
        'Ongoing projects.'
      );
    default:
      return loc(
        'Ce fragment parle d’un autre coin de mon univers. Va voir.',
        'This fragment is about another corner of my universe. Go take a look.'
      );
  }
}

function getFocusBody(project: PortfolioProject, facetIndex: number): LocalizedText {
  const bespokeLines: Partial<Record<number, [LocalizedText, LocalizedText, LocalizedText]>> = {
    1: [
      loc(
        'Bienvenue dans mon univers.',
        'Welcome to my universe.'
      ),
      loc(
        'Polyvalence et idées, C’est mon deuxieme prenom.. euuh... plutot mon deuxieme et troiseme prenom.',
        'Versatility and ideas, that’s my middle name.. uh... more like my middle and last name.'
      ),
      loc(
        'Aka Le Roi du freestyle',
        'Aka The King of Freestyle'
      )
    ],
    2: [
      loc(
        'C’est plus fort que moi, je dois toujours ajouter des singerie...',
        'It’s stronger than me, I always have to add more monkey business...'
      ),
      loc(
        'Cohérence et profondeur, autrement dit détails que 90% des gens ne remarquent pas mais qui font tout le sel.',
        'Coherence and depth, otherwise known as details that 90% of people don’t notice but make all the difference.'
      ),
      loc(
        'Darwin n’a cas bien se tenir',
        'Darwin better watch out'
      )
    ],
    3: [
      loc(
        'Premier saut, on a dit.. pas premier atterrissage',
        'First leap, we said.. not first landing'
      ),
      loc(
        'J’ai déjà dit que la polyvalence c’est mon deuxième prénom, ou peut-être mon troisième, je ne sais plus.',
        'I’ve already said that versatility is my middle name, or maybe my third name, I can’t remember.'
      ),
      loc(
        'A cœur vaillant rien d’impossible. Surtout si c’est un Primate.',
        'Nothing is impossible to a willing heart. Especially if it’s a Primate.'
      )
    ],
    4: [
      loc(
        'J’ai mis tous ce que j’aime dans ce RPG, et même un peu plus.',
        'I put everything I love into this RPG, and even a bit more.'
      ),
      loc(
        'Ta toujours pas tester la Primaterie ?',
        'Have you tried the Primaterie yet?'
      ),
      loc(
        'J’ai la vision dimensionnelle... tu vois ce que je veux dire ?',
        'I have the dimensional vision... you know what I mean?'
      )
    ],
    5: [
      loc(
        'Tu vend des vélos ? Tu peint des figurines ? Tu répare des tracteurs ? Je peux te faire la com’ et les visuels qui te correspondent.',
        'You sell bikes? You paint miniatures? You fix tractors? I can make you the marketing and visuals that fit you.'
      ),
      loc(
        'Petite collab ? Grande collab ? Je suis partant pour tout ce qui me fait sortir de ma zone de confort.',
        'Small collaboration? Big collaboration? I’m up for anything that gets me out of my comfort zone.'
      ),
      loc(
        'J’adore Tom Hanks',
        'I love Tom Hanks'
      )
    ],
    6: [
      loc(
        'En cours, sa aussi c’est mon quatrieme prenom honteux. on en a tous un non ? Bert... c’est pas mieux...',
        'Ongoing, that’s also my shameful fourth name. We all have one, right? Bert... that’s not better...'
      ),
      loc(
        'Il me cole aux baskets ce nom mais promis, sa change bientot.',
        'That name is sticking to my sneakers but I promise, it’s changing soon.'
      ),
      loc(
        'Bon, si tu n’as toujours pas essayé la Primaterie, c’est que tu n’as pas encore placé les projets entre mes mains.',
        'Well if you still haven’t tried the Primaterie, it’s because you haven’t placed the projects in my hands.'
      )
    ]
  };

  const bespoke = bespokeLines[project.numericId]?.[facetIndex];
  if (bespoke) {
    return bespoke;
  }

  const facet = project.facets[facetIndex];
  return loc(
    `Là, tu regardes ${facet.categoryLabel.fr.toLowerCase()} de ${project.title.fr}. C’est un de ces endroits où je range mal mes idées.`,
    `You’re looking at ${project.title.en}'s ${facet.categoryLabel.en.toLowerCase()} side. One of those places where I store my ideas badly.`
  );
}

function getPrimaterieHoverBody(item: 'portfolio' | 'adventure' | 'discord' | 'patreon' | 'theme' | 'language'): LocalizedText {
  switch (item) {
    case 'portfolio':
      return loc(
        'Va naviguer dans mes projets.',
        'Go navigate into my projects.'
      );
    case 'adventure':
      return loc(
        'Lance une aventure.',
        'Start an adventure.'
      );
    case 'discord':
      return loc(
        'Rejoins la Primaterie.',
        'Come into the Primaterie.'
      );
    case 'patreon':
      return loc(
        'Si tu veux soutenir un créateur indépendant passionné, c’est par là. Le trésor fait peur.',
        'If you want to support a passionate independent creator, this is where. The treasury is scary.'
      );
    case 'theme':
      return loc(
        'Change l’ambiance ici',
        'Change the mood there'
      );
    case 'language':
      return loc(
        'Tu peux aussi me faire changer de langue ici. YES YES SPEAK ENGLISH VERY GOOD',
        'You can make me switch languages there. OUI OUI JE PARLE AUSSI LE FRANÇAIS'
      );
  }
}

function getGameOverHoverBody(item: 'score' | 'avatar' | 'save' | 'leaderboard' | 'replay' | 'menu'): LocalizedText {
  switch (item) {
    case 'score':
      return loc(
        'Là, tu vois exactement jusqu’où t’as tenu. Pas besoin d’enjoliver.',
        'That tells you exactly how far you made it. No need to romanticize it.'
      );
    case 'avatar':
      return loc(
        'Ici, tu peux me bricoler une autre tête. Ou la tienne. On ne va pas chipoter.',
        'This is where you can cobble together a new face for me. Or for you. Close enough.'
      );
    case 'save':
      return loc(
        'Nom ici, save juste après. Sinon ta run s’évapore et je fais comme si je n’avais rien vu.',
        'Name here, save right after. Otherwise the run evaporates and I pretend I never saw it.'
      );
    case 'leaderboard':
      return loc(
        'Le classement, c’est juste l’endroit où on range les ego en colonnes.',
        'The leaderboard is just where we arrange egos into columns.'
      );
    case 'replay':
      return loc(
        'Ah, tu veux retenter tout de suite. Là, on se comprend.',
        'Ah, you want to run it back immediately. Now we understand each other.'
      );
    case 'menu':
      return loc(
        'Menu si tu veux souffler un peu. Le gouffre t’attendra, ne t’inquiète pas.',
        'Menu if you need a breather. The abyss will wait for you.'
      );
  }
}

function getAvatarHoverBody(item: 'overview' | 'ears' | 'parts' | 'save' | 'close'): LocalizedText {
  switch (item) {
    case 'overview':
      return loc(
        'Ici, tu me refais le portrait. Vas-y, je suis curieux de voir ce que tu m’infliges.',
        'This is where you remake my face. Go on, I am curious what you’ll inflict on me.'
      );
    case 'ears':
      return loc(
        'Là, tu touches aux oreilles. Oui, c’est important, on a une réputation à tenir.',
        'Those controls are for the ears. Yes, that matters, we have a reputation to maintain.'
      );
    case 'parts':
      return loc(
        'Face, yeux, motifs, accessoires: c’est là que tu me dérègles proprement.',
        'Face, eyes, motifs, accessories: that is where you scramble me properly.'
      );
    case 'save':
      return loc(
        'Quand ta monstruosité te plaît, valide-la ici.',
        'Once your little monstrosity looks right, lock it in here.'
      );
    case 'close':
      return loc(
        'Et ça, c’est pour refermer l’atelier si tu as fini de jouer au chirurgien.',
        'And that is how you close the workshop once you are done playing surgeon.'
      );
  }
}

function getTutorialHoverBody(item: 'entry' | 'nav' | 'close'): LocalizedText {
  switch (item) {
    case 'entry':
      return loc(
        'Le tuto, c’est mon pense-bête pour éviter que tu rates les boutons utiles.',
        'The tutorial is my little cheat sheet so you do not miss the useful controls.'
      );
    case 'nav':
      return loc(
        'Fais défiler. Les pages importantes ne viennent pas toutes seules.',
        'Flip through it. The useful pages do not walk over by themselves.'
      );
    case 'close':
      return loc(
        'Ferme si t’as compris. Je ne vais pas te retenir en cours toute la journée.',
        'Close it if you got it. I am not keeping you in class all day.'
      );
  }
}

function getAchievementsHoverBody(item: 'entry' | 'filters' | 'close'): LocalizedText {
  switch (item) {
    case 'entry':
      return loc(
        'Là, tu regardes mes petites preuves de progression. J’aime bien ranger le chaos en trophées.',
        'That is where you inspect the little proofs of progress. I do enjoy filing chaos into trophies.'
      );
    case 'filters':
      return loc(
        'Trie tout ça comme tu veux. Même mes succès ont besoin d’un peu d’ordre de temps en temps.',
        'Sort the whole thing however you like. Even my achievements need a little order sometimes.'
      );
    case 'close':
      return loc(
        'Tu peux refermer là. Les trophées ne vont pas s’enfuir.',
        'You can close it there. The trophies are not going anywhere.'
      );
  }
}

function getSettingsHoverBody(item: 'entry' | 'help' | 'theme' | 'language' | 'fullscreen' | 'mute' | 'volume'): LocalizedText {
  switch (item) {
    case 'entry':
      return loc(
        'Regarde d’abord les réglages. Le son se vérifie là-haut avant d’aller te jeter dans le vide.',
        'Check the settings first. Sound lives up there, and it is worth checking before you throw yourself into the void.'
      );
    case 'help':
      return loc(
        'L’aide est là si tu veux revoir les bases sans que je te les récite en boucle.',
        'Help is there if you want the basics again without me reciting them forever.'
      );
    case 'theme':
      return loc(
        'Là, tu changes l’ambiance du jeu. Oui, j’ai aussi un bon profil en version sombre.',
        'That one changes the game’s mood. Yes, I do look good in the darker version too.'
      );
    case 'language':
      return loc(
        'Cette puce-là me fait passer d’une langue à l’autre sans drame.',
        'That chip swaps my language without turning it into a whole production.'
      );
    case 'fullscreen':
      return loc(
        'Si tu veux tout prendre en plein écran, c’est ce bouton-là.',
        'If you want the whole thing in fullscreen, that is the button.'
      );
    case 'mute':
      return loc(
        'Coupe ou rends le son ici. Simple, net, sans me faire mimer le silence.',
        'Cut or restore the sound there. Clean and simple, no need to make me mime silence.'
      );
    case 'volume':
      return loc(
        'La barre te laisse doser le son. Tu glisses, ça monte ou ça retombe.',
        'That bar lets you tune the sound. Drag it, and it goes up or down.'
      );
  }
}

export class GuideBubbleSystem {
  readonly element: HTMLDivElement;

  private readonly characterShell: HTMLDivElement;
  private readonly characterElement: HTMLDivElement;
  private readonly panel: HTMLDivElement;
  private readonly panelArt: HTMLDivElement;
  private readonly titleElement: HTMLParagraphElement;
  private readonly bodyElement: HTMLParagraphElement;
  private readonly bubbleCopy: HTMLDivElement;

  private currentPresence: GuidePresenceContext = {
    visible: true,
    target: null,
    zone: 'intro'
  };
  private suspended = false;
  private manuallyDisabled = false;
  private visible = false;
  private panelVisible = false;
  private currentAnimation: GuideAnimationName = 'idle';
  private animationElapsed = 0;
  private animationLoops = 0;
  private currentMessage: GuideMessage | null = null;
  private readonly queue: GuideMessage[] = [];
  private readonly seenFlags = new Set<string>();
  private readonly cooldowns = new Map<string, number>();
  private desiredCharacterLeft = 0;
  private desiredCharacterTop = 0;
  private desiredCharacterSize = 112;
  private desiredCharacterFlipX = false;
  private desiredPanelLeft = 0;
  private desiredPanelTop = 0;
  private desiredPanelWidth = 304;
  private desiredPanelHeight = 304 / GUIDE_PANEL_ASPECT_RATIO;
  private currentCharacterLeft = 0;
  private currentCharacterTop = 0;
  private currentCharacterSize = 112;
  private currentCharacterFlipX = false;
  private currentPanelLeft = 0;
  private currentPanelTop = 0;
  private currentPanelWidth = 304;
  private currentPanelHeight = 304 / GUIDE_PANEL_ASPECT_RATIO;
  private currentPanelFlipX = false;
  private currentPanelFlipY = false;
  private anchor: GuideAnchor = { x: 0.08, y: 0.7 };
  private dragPointerId: number | null = null;
  private dragMoved = false;
  private dragStartClientX = 0;
  private dragStartClientY = 0;
  private dragStartLeft = 0;
  private dragStartTop = 0;
  private cursorX = window.innerWidth * 0.58;
  private cursorY = window.innerHeight * 0.46;
  private idleVariationAt = performance.now() + this.randomIdleDelay();

  constructor(private readonly host: HTMLElement, private readonly i18n: I18nService) {
    this.loadFlags();
    this.loadAnchor();

    this.element = document.createElement('div');
    this.element.className = 'guide-bubble';
    this.element.setAttribute('aria-hidden', 'true');

    this.characterShell = document.createElement('div');
    this.characterShell.className = 'guide-bubble__character-shell';
    this.characterShell.setAttribute('role', 'button');
    this.characterShell.tabIndex = 0;

    this.characterElement = document.createElement('div');
    this.characterElement.className = 'guide-bubble__character';
    this.characterShell.appendChild(this.characterElement);

    this.panel = document.createElement('div');
    this.panel.className = 'guide-bubble__panel';

    this.panelArt = document.createElement('div');
    this.panelArt.className = 'guide-bubble__panel-art';

    this.bubbleCopy = document.createElement('div');
    this.bubbleCopy.className = 'guide-bubble__copy';

    this.titleElement = document.createElement('p');
    this.titleElement.className = 'guide-bubble__title';

    this.bodyElement = document.createElement('p');
    this.bodyElement.className = 'guide-bubble__body';

    this.bubbleCopy.append(this.titleElement, this.bodyElement);
    this.panel.append(this.panelArt, this.bubbleCopy);
    this.element.append(this.characterShell, this.panel);
    this.host.appendChild(this.element);

    this.setAnimation('idle', true);
    this.applyAnimationFrame();
    this.applyVisuals();
    this.bindPointerEvents();
    this.i18n.onChange(() => this.render());
  }

  setPresence(context: GuidePresenceContext) {
    this.currentPresence = context;
  }

  setSuspended(suspended: boolean) {
    this.suspended = suspended;
  }

  resetHoverCooldown(key: string | null) {
    if (!key) {
      return;
    }
    const cooldownKeys = this.getHoverCooldownKeys(key);
    cooldownKeys.forEach((cooldownKey) => this.cooldowns.delete(cooldownKey));
  }

  resetProjectHoverCooldown(projectId: string | null) {
    if (!projectId) {
      return;
    }
    this.cooldowns.delete(`guide:orbit-hover-cooldown:${projectId}`);
  }

  trigger(cue: GuideCue, target: GuideTarget | null) {
    if (this.manuallyDisabled) {
      return;
    }
    const message = this.buildMessage(cue, target);
    if (!message) {
      return;
    }

    if (this.currentMessage && this.currentMessage.id === message.id) {
      this.currentMessage = message;
      this.render();
      return;
    }

    if (this.currentMessage && message.priority > this.currentMessage.priority) {
      this.queue.unshift(message);
      this.currentMessage = null;
      return;
    }

    const existingIndex = this.queue.findIndex((entry) => entry.id === message.id);
    if (existingIndex >= 0) {
      this.queue.splice(existingIndex, 1, message);
    } else {
      this.queue.push(message);
    }
    this.queue.sort((left, right) => right.priority - left.priority || left.createdAt - right.createdAt);
  }

  update(deltaTime: number) {
    const now = performance.now();
    if (this.currentMessage && !this.manuallyDisabled && now >= this.currentMessage.createdAt + this.currentMessage.durationMs) {
      this.currentMessage = null;
      this.render();
    }

    if (!this.currentMessage && this.queue.length > 0) {
      const nextMessage = this.queue.shift() ?? null;
      if (nextMessage) {
        this.currentMessage = {
          ...nextMessage,
          createdAt: now
        };
        this.render();
      }
    }

    const desiredVisible = !this.suspended && !this.manuallyDisabled && (this.currentPresence.visible || this.currentMessage !== null || this.queue.length > 0);
    if (desiredVisible && !this.visible && this.currentAnimation !== 'arrive') {
      this.visible = true;
      this.setAnimation('arrive', true);
    } else if (!desiredVisible && this.visible && this.currentAnimation !== 'leave') {
      this.setAnimation('leave', true);
    }

    if (desiredVisible && this.currentAnimation !== 'arrive' && this.currentAnimation !== 'leave') {
      if (this.currentMessage) {
        if (this.currentAnimation !== 'talk_hold') {
          this.setAnimation('talk_hold', true);
        }
      } else if (this.currentAnimation !== 'idle2' && now >= this.idleVariationAt) {
        this.setAnimation('idle2', true);
      } else if (this.currentAnimation === 'talk_hold') {
        this.setAnimation('talk_release', true);
      } else if (this.currentAnimation !== 'idle' && this.currentAnimation !== 'idle2') {
        this.setAnimation('idle', true);
      }
    }

    this.updateAnimation(deltaTime, desiredVisible);
    this.updatePlacement(deltaTime);
    this.panelVisible = this.currentMessage !== null && this.visible && !this.suspended && this.dragPointerId === null && !this.manuallyDisabled;
    this.applyVisuals();
  }

  private buildMessage(cue: GuideCue, target: GuideTarget | null) {
    const now = performance.now();
    const enqueue = (
      id: string,
      body: LocalizedText,
      options: {
        title?: LocalizedText;
        priority?: number;
        durationMs?: number;
        firstTimeKey?: string;
        cooldownKey?: string;
        cooldownMs?: number;
      } = {}
    ) => {
      const firstTimeKey = options.firstTimeKey;
      if (firstTimeKey && this.seenFlags.has(firstTimeKey)) {
        return null;
      }
      const cooldownKey = options.cooldownKey;
      const cooldownUntil = cooldownKey ? this.cooldowns.get(cooldownKey) ?? 0 : 0;
      if (cooldownKey && now < cooldownUntil) {
        return null;
      }
      if (firstTimeKey) {
        this.markSeen(firstTimeKey);
      }
      if (cooldownKey) {
        this.cooldowns.set(cooldownKey, now + (options.cooldownMs ?? 9000));
      }
      return {
        id,
        priority: options.priority ?? 2,
        durationMs: options.durationMs ?? 3000,
        title: options.title ?? DEFAULT_SPEAKER_TITLE,
        body,
        target,
        createdAt: now
      } satisfies GuideMessage;
    };

    switch (cue.type) {
      case 'intro_mirror':
        return enqueue(
          'intro-mirror',
          loc(
            'Allez. Touche encore. Si tu veux entrer dans mon bazar, il faut déranger le miroir.',
            'Go on. Touch it again. If you want into my mess, you need to bother the mirror first.'
          ),
          {
            title: loc('Miroir', 'Mirror'),
            priority: 4,
            durationMs: 4200,
            cooldownKey: 'guide:intro-mirror-cooldown',
            cooldownMs: 1800
          }
        );
      case 'hub_arrival':
        return enqueue(
          'hub-arrival',
          loc(
            'Bienvenue chez moi. J’ai rangé mes projets en éclats, donc forcément il faut fouiller un peu.',
            'Welcome to my place. I sorted my projects into shards, so obviously you have to dig a little.'
          ),
          {
            title: loc('Entrée', 'Arrival'),
            priority: 4,
            durationMs: 4800,
            firstTimeKey: 'guide:hub-arrival'
          }
        );
      case 'orbit_hover':
        return enqueue(`orbit-hover:${cue.project.id}`, getOrbitHoverBody(cue.project), {
          title: cue.project.title,
          priority: 2,
          durationMs: 3000,
          cooldownKey: `guide:orbit-hover-cooldown:${cue.project.id}`,
          cooldownMs: 5600
        });
      case 'portfolio_scroll':
        return enqueue(
          `portfolio-scroll:${cue.project.id}:${cue.direction > 0 ? 'next' : 'prev'}`,
          cue.direction > 0
            ? loc(
                `Ah, là tu descends vraiment dans ${cue.project.title.fr}. C’est plus intéressant quand on gratte.`,
                `Now you’re actually digging into ${cue.project.title.en}. It gets better once you scratch deeper.`
              )
            : loc(
                'Tu remontes un peu. Pas grave, même moi je reviens souvent voir mes propres trucs.',
                'You’re climbing back a bit. Fair enough, even I go back through my own stuff more than once.'
              ),
          {
            title: loc('Profondeur', 'Depth'),
            priority: 3,
            durationMs: 3600,
            firstTimeKey: 'guide:portfolio-scroll',
            cooldownKey: 'guide:portfolio-scroll-cooldown',
            cooldownMs: 14000
          }
        );
      case 'focus_enter':
        return enqueue(`focus:${cue.project.id}:${cue.facetIndex}`, getFocusBody(cue.project, cue.facetIndex), {
          title: cue.project.facets[cue.facetIndex]?.categoryLabel ?? cue.project.title,
          priority: 3,
          durationMs: 3000,
          cooldownKey: `guide:focus-cooldown:${cue.project.id}:${cue.facetIndex}`,
          cooldownMs: 5600
        });
      case 'mirror_reveal':
        return enqueue(
          'mirror-reveal',
          loc(
            'T’étais pas censé voir ça.',
            'You were not supposed to see that.'
          ),
          {
            title: loc('Miroir', 'Mirror'),
            priority: 5,
            durationMs: 3200,
            cooldownKey: 'guide:mirror-reveal-cooldown',
            cooldownMs: 3000
          }
        );
      case 'drag_first':
        return enqueue(
          'drag-first',
          loc(
            'Ah, là tu fouilles vraiment. Prends le shard et vois s’il retrouve sa place.',
            'Ah, now you’re really digging. Grab the shard and see if it remembers where it belongs.'
          ),
          {
            title: loc('Traque', 'Hunt'),
            priority: 4,
            durationMs: 3600,
            firstTimeKey: 'guide:drag-first'
          }
        );
      case 'slot_placed':
        return enqueue(
          `slot-placed:${cue.project.id}`,
          cue.remainingSlots > 0
            ? loc(
                'Ok, t’as trouvé un des trucs cachés. C’est exactement comme ça que j’avais planqué le passage.',
                'Okay, you found one of the hidden pieces. That is exactly how I buried the way forward.'
              )
            : loc(
                'Le dernier a claqué juste. Là, oui, tu viens de réveiller quelque chose.',
                'That last one clicked. Yes, that definitely woke something up.'
              ),
          {
            title: loc('Déclic', 'Click'),
            priority: 4,
            durationMs: 3400,
            firstTimeKey: 'guide:first-slot-placement'
          }
        );
      case 'two_slots_left':
        return enqueue(
          'two-slots-left',
          loc(
            'Plus que deux. Tu commences à comprendre comment je range mon bazar.',
            'Only two left. You’re starting to understand how I arrange my chaos.'
          ),
          {
            title: loc('Presque', 'Almost'),
            priority: 4,
            durationMs: 3600,
            firstTimeKey: 'guide:two-slots-left'
          }
        );
      case 'one_slot_left':
        return enqueue(
          'one-slot-left',
          loc(
            'Plus qu’un. Là, tu peux presque sentir la charnière bouger.',
            'Only one left. You can almost feel the hinge moving now.'
          ),
          {
            title: loc('Dernier effort', 'Last Push'),
            priority: 4,
            durationMs: 3400,
            firstTimeKey: 'guide:one-slot-left'
          }
        );
      case 'slots_complete':
        return enqueue(
          'slots-complete',
          loc(
            'Parfait. Tout est revenu à sa place. Allez, on y va.',
            'Perfect. Everything is back where it belongs. Come on, let’s go.'
          ),
          {
            title: loc('Passage', 'Passage'),
            priority: 5,
            durationMs: 3000,
            firstTimeKey: 'guide:slots-complete'
          }
        );
      case 'primaterie_arrival':
        return enqueue(
          'primaterie-arrival',
          loc(
            'Te voilà à la Primaterie. J’ai mis les portes principales sous tes yeux, tu n’as plus d’excuse.',
            'There you are in the Primaterie. I put the main doors right in front of you, so you are out of excuses.'
          ),
          {
            title: loc('Primaterie', 'Primaterie'),
            priority: 4,
            durationMs: 4400,
            firstTimeKey: 'guide:primaterie-arrival'
          }
        );
      case 'primaterie_hover':
        return enqueue(`primaterie-hover:${cue.item}`, getPrimaterieHoverBody(cue.item), {
          title:
            cue.item === 'portfolio'
              ? loc('Portfolio', 'Portfolio')
              : cue.item === 'adventure'
                ? loc('Aventure', 'Adventure')
                : cue.item === 'discord'
                  ? loc('Discord', 'Discord')
                  : cue.item === 'patreon'
                    ? loc('Patreon', 'Patreon')
                    : cue.item === 'theme'
                      ? loc('Thème', 'Theme')
                      : loc('Langue', 'Language'),
          priority: cue.item === 'discord' || cue.item === 'patreon' ? 3 : 2,
          durationMs: 3000,
          cooldownKey: `guide:primaterie-hover-cooldown:${cue.item}`,
          cooldownMs: 5600
        });
      case 'game_over_intro':
        return enqueue(
          'game-over-intro',
          loc(
            'Avant de faire le malin: écris ton nom, puis save. Sinon cette run disparaît avec le reste.',
            'Before you get smug: write your name, then save. Otherwise the whole run disappears with the rest.'
          ),
          {
            title: loc('Retour des morts', 'Back From The Dead'),
            priority: 5,
            durationMs: 4600,
            firstTimeKey: 'guide:first-game-over'
          }
        );
      case 'game_over_hover':
        return enqueue(`game-over-hover:${cue.item}`, getGameOverHoverBody(cue.item), {
          title:
            cue.item === 'score'
              ? loc('Score', 'Score')
              : cue.item === 'avatar'
                ? loc('Avatar', 'Avatar')
                : cue.item === 'save'
                  ? loc('Save', 'Save')
                  : cue.item === 'leaderboard'
                    ? loc('Classement', 'Leaderboard')
                    : cue.item === 'replay'
                      ? loc('Rejouer', 'Replay')
                      : loc('Menu', 'Menu'),
          priority: 3,
          durationMs: 3000,
          cooldownKey: `guide:game-over-hover-cooldown:${cue.item}`,
          cooldownMs: 5600
        });
      case 'avatar_hover':
        return enqueue(`avatar-hover:${cue.item}`, getAvatarHoverBody(cue.item), {
          title:
            cue.item === 'ears'
              ? loc('Oreilles', 'Ears')
              : cue.item === 'parts'
                ? loc('Visage', 'Face')
                : cue.item === 'save'
                  ? loc('Valider', 'Save')
                  : cue.item === 'close'
                    ? loc('Fermer', 'Close')
                    : loc('Avatar', 'Avatar'),
          priority: 3,
          durationMs: 3000,
          cooldownKey: `guide:avatar-hover-cooldown:${cue.item}`,
          cooldownMs: 5600
        });
      case 'tutorial_hover':
        return enqueue(`tutorial-hover:${cue.item}`, getTutorialHoverBody(cue.item), {
          title: loc('Tutoriel', 'Tutorial'),
          priority: 3,
          durationMs: 3000,
          cooldownKey: `guide:tutorial-hover-cooldown:${cue.item}`,
          cooldownMs: 5600
        });
      case 'achievements_hover':
        return enqueue(`achievements-hover:${cue.item}`, getAchievementsHoverBody(cue.item), {
          title: loc('Succès', 'Achievements'),
          priority: 3,
          durationMs: 3000,
          cooldownKey: `guide:achievements-hover-cooldown:${cue.item}`,
          cooldownMs: 5600
        });
      case 'settings_hover':
        return enqueue(`settings-hover:${cue.item}`, getSettingsHoverBody(cue.item), {
          title: loc('Réglages', 'Settings'),
          priority: cue.item === 'entry' ? 4 : 3,
          durationMs: 3000,
          cooldownKey: `guide:settings-hover-cooldown:${cue.item}`,
          cooldownMs: 5600
        });
    }
  }

  private updatePlacement(deltaTime: number) {
    const viewportWidth = this.host.clientWidth || window.innerWidth;
    const isMobile = viewportWidth <= MOBILE_GUIDE_BREAKPOINT;
    const placement = this.manuallyDisabled
      ? null
      : this.currentPresence.zone === 'focus'
        ? this.resolvePlacement(this.currentMessage?.target ?? this.currentPresence.target ?? this.resolveCursorTarget())
        : this.currentPresence.zone === 'game' || this.currentPresence.zone === 'game_over'
          ? this.resolveGameMenuPlacement(this.currentMessage?.target ?? this.currentPresence.target)
        : isMobile
          ? this.resolveMobilePlacement()
          : this.currentMessage
            ? this.resolveCursorPlacement(this.currentMessage.target ?? this.currentPresence.target)
            : this.resolveAnchorPlacement();

    if (!placement) {
      this.panelVisible = false;
      this.applyVisuals();
      return;
    }
    this.desiredCharacterLeft = placement.characterLeft;
    this.desiredCharacterTop = placement.characterTop;
    this.desiredCharacterSize = placement.characterSize;
    this.desiredCharacterFlipX = placement.characterFlipX;
    this.desiredPanelLeft = placement.panelLeft;
    this.desiredPanelTop = placement.panelTop;
    this.desiredPanelWidth = placement.panelWidth;
    this.desiredPanelHeight = placement.panelHeight;
    this.currentPanelFlipX = placement.flipX;
    this.currentPanelFlipY = placement.flipY;

    if (this.dragPointerId !== null) {
      this.currentCharacterLeft = this.desiredCharacterLeft;
      this.currentCharacterTop = this.desiredCharacterTop;
      this.currentCharacterSize = this.desiredCharacterSize;
      this.currentCharacterFlipX = this.desiredCharacterFlipX;
      this.currentPanelLeft = this.desiredPanelLeft;
      this.currentPanelTop = this.desiredPanelTop;
      this.currentPanelWidth = this.desiredPanelWidth;
      this.currentPanelHeight = this.desiredPanelHeight;
      return;
    }

    this.currentCharacterLeft = damp(this.currentCharacterLeft, this.desiredCharacterLeft, 7, deltaTime);
    this.currentCharacterTop = damp(this.currentCharacterTop, this.desiredCharacterTop, 7, deltaTime);
    this.currentCharacterSize = damp(this.currentCharacterSize, this.desiredCharacterSize, 8, deltaTime);
    this.currentCharacterFlipX = this.desiredCharacterFlipX;
    this.currentPanelWidth = this.desiredPanelWidth;
    this.currentPanelHeight = this.desiredPanelHeight;
    this.currentPanelLeft = this.currentCharacterLeft + (this.desiredPanelLeft - this.desiredCharacterLeft);
    this.currentPanelTop = this.currentCharacterTop + (this.desiredPanelTop - this.desiredCharacterTop);
  }

  private resolveAnchorPlacement(): GuidePlacement {
    const viewportWidth = this.host.clientWidth || window.innerWidth;
    const viewportHeight = this.host.clientHeight || window.innerHeight;
    const isMobile = viewportWidth <= MOBILE_GUIDE_BREAKPOINT;
    const characterSize = clamp(Math.min(viewportWidth * (isMobile ? 0.18 : 0.12), viewportHeight * (isMobile ? 0.14 : 0.18)), isMobile ? 72 : 88, isMobile ? 104 : 132);
    const panelWidth = clamp(Math.min(viewportWidth * (isMobile ? 0.62 : 0.34), isMobile ? 248 : 340), isMobile ? 188 : 236, isMobile ? 268 : 320);
    const panelHeight = panelWidth / GUIDE_PANEL_ASPECT_RATIO;
    const pairPanelOffsetX = panelWidth - characterSize * 0.16;
    const pairPanelOffsetY = panelHeight * 0.76;
    const minCharacterLeft = VIEWPORT_MARGIN + pairPanelOffsetX;
    const maxCharacterLeft = Math.max(minCharacterLeft, viewportWidth - characterSize - VIEWPORT_MARGIN);
    const minCharacterTop = Math.max(VIEWPORT_MARGIN + pairPanelOffsetY, VIEWPORT_MARGIN);
    const maxCharacterTop = Math.max(minCharacterTop, viewportHeight - characterSize - VIEWPORT_MARGIN);
    const availableWidth = Math.max(1, maxCharacterLeft - minCharacterLeft);
    const availableHeight = Math.max(1, maxCharacterTop - minCharacterTop);
    const characterLeft = clamp(minCharacterLeft + this.anchor.x * availableWidth, minCharacterLeft, maxCharacterLeft);
    const characterTop = clamp(minCharacterTop + this.anchor.y * availableHeight, minCharacterTop, maxCharacterTop);
    const panelLeft = characterLeft - pairPanelOffsetX;
    const panelTop = characterTop - pairPanelOffsetY;

    return {
      characterLeft,
      characterTop,
      characterSize,
      characterFlipX: false,
      panelLeft,
      panelTop,
      panelWidth,
      panelHeight,
      flipX: true,
      flipY: false
    };
  }

  private resolveMobilePlacement(): GuidePlacement {
    const viewportWidth = this.host.clientWidth || window.innerWidth;
    const viewportHeight = this.host.clientHeight || window.innerHeight;
    const characterSize = clamp(Math.min(viewportWidth * 0.18, viewportHeight * 0.14), 62, 86);
    const panelWidth = clamp(Math.min(viewportWidth * 0.54, 232), 168, 228);
    const panelHeight = panelWidth / GUIDE_PANEL_ASPECT_RATIO;
    const characterLeft = VIEWPORT_MARGIN + 6;
    const characterTop = VIEWPORT_MARGIN + 8;
    const panelLeft = clamp(characterLeft + characterSize * 0.34, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportWidth - panelWidth - VIEWPORT_MARGIN));
    const panelTop = clamp(characterTop, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportHeight - panelHeight - VIEWPORT_MARGIN));

    return {
      characterLeft,
      characterTop,
      characterSize,
      characterFlipX: true,
      panelLeft,
      panelTop,
      panelWidth,
      panelHeight,
      flipX: false,
      flipY: false
    };
  }

  private resolveCursorTarget(): GuideTarget {
    return {
      x: this.cursorX,
      y: this.cursorY,
      width: 28,
      height: 28
    };
  }

  private resolveCursorPlacement(target: GuideTarget | null): GuidePlacement {
    const viewportWidth = this.host.clientWidth || window.innerWidth;
    const viewportHeight = this.host.clientHeight || window.innerHeight;
    const characterSize = clamp(Math.min(viewportWidth * 0.12, viewportHeight * 0.18), 88, 132);
    const panelWidth = clamp(Math.min(viewportWidth * 0.34, 340), 236, 320);
    const panelHeight = panelWidth / GUIDE_PANEL_ASPECT_RATIO;
    const isLeftZone = this.cursorX < viewportWidth * 0.34;
    const isBottomZone = this.cursorY > viewportHeight * 0.72;
    const isTopZone = this.cursorY < viewportHeight * 0.18;
    const guideLeft = this.cursorX + (isLeftZone ? 18 : -characterSize - 18);
    const guideTop = this.cursorY + 16;
    const guideLeftClamped = clamp(guideLeft, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportWidth - characterSize - VIEWPORT_MARGIN));
    const guideTopClamped = clamp(guideTop, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportHeight - characterSize - VIEWPORT_MARGIN));

    let panelLeft = isLeftZone
      ? guideLeftClamped + characterSize * 0.22
      : guideLeftClamped - panelWidth + characterSize * 0.78;
    let panelTop = isBottomZone ? guideTopClamped - panelHeight * 0.92 : guideTopClamped + (isTopZone ? characterSize * 0.12 : -panelHeight * 0.92);

    panelLeft = clamp(panelLeft, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportWidth - panelWidth - VIEWPORT_MARGIN));
    panelTop = clamp(panelTop, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportHeight - panelHeight - VIEWPORT_MARGIN));

    if (target) {
      const targetRect = expandRect(buildRectFromTarget(target), 12);
      let pairRect = buildRect(
        Math.min(guideLeftClamped, panelLeft),
        Math.min(guideTopClamped, panelTop),
        Math.max(guideLeftClamped + characterSize, panelLeft + panelWidth) - Math.min(guideLeftClamped, panelLeft),
        Math.max(guideTopClamped + characterSize, panelTop + panelHeight) - Math.min(guideTopClamped, panelTop)
      );

      if (rectsOverlap(pairRect, targetRect)) {
        const verticalEscape = targetRect.top - panelHeight - TARGET_GAP;
        const downwardEscape = targetRect.bottom + TARGET_GAP;
        if (verticalEscape >= VIEWPORT_MARGIN) {
          panelTop = verticalEscape;
        } else if (downwardEscape + panelHeight <= viewportHeight - VIEWPORT_MARGIN) {
          panelTop = downwardEscape;
        }
        pairRect = buildRect(
          Math.min(guideLeftClamped, panelLeft),
          Math.min(guideTopClamped, panelTop),
          Math.max(guideLeftClamped + characterSize, panelLeft + panelWidth) - Math.min(guideLeftClamped, panelLeft),
          Math.max(guideTopClamped + characterSize, panelTop + panelHeight) - Math.min(guideTopClamped, panelTop)
        );
        if (rectsOverlap(pairRect, targetRect)) {
          panelLeft = clamp(
            isLeftZone ? targetRect.right + TARGET_GAP : targetRect.left - panelWidth - TARGET_GAP,
            VIEWPORT_MARGIN,
            Math.max(VIEWPORT_MARGIN, viewportWidth - panelWidth - VIEWPORT_MARGIN)
          );
        }
      }
    }

    return {
      characterLeft: guideLeftClamped,
      characterTop: guideTopClamped,
      characterSize,
      characterFlipX: isLeftZone,
      panelLeft,
      panelTop,
      panelWidth,
      panelHeight,
      flipX: !isLeftZone,
      flipY: false
    };
  }

  private resolveGameMenuPlacement(target: GuideTarget | null): GuidePlacement {
    if (target) {
      return this.resolvePlacement(target);
    }
    const viewportWidth = this.host.clientWidth || window.innerWidth;
    const viewportHeight = this.host.clientHeight || window.innerHeight;
    const characterSize = clamp(Math.min(viewportWidth * 0.11, viewportHeight * 0.15), 84, 118);
    const panelWidth = clamp(Math.min(viewportWidth * 0.3, 300), 220, 300);
    const panelHeight = panelWidth / GUIDE_PANEL_ASPECT_RATIO;
    const characterLeft = clamp(viewportWidth - characterSize - 28, VIEWPORT_MARGIN, viewportWidth - characterSize - VIEWPORT_MARGIN);
    const characterTop = clamp(28, VIEWPORT_MARGIN, viewportHeight - characterSize - VIEWPORT_MARGIN);
    const panelLeft = clamp(characterLeft - panelWidth + characterSize * 0.78, VIEWPORT_MARGIN, viewportWidth - panelWidth - VIEWPORT_MARGIN);
    const panelTop = clamp(characterTop, VIEWPORT_MARGIN, viewportHeight - panelHeight - VIEWPORT_MARGIN);

    return {
      characterLeft,
      characterTop,
      characterSize,
      characterFlipX: false,
      panelLeft,
      panelTop,
      panelWidth,
      panelHeight,
      flipX: true,
      flipY: false
    };
  }

  private resolvePlacement(target: GuideTarget): GuidePlacement {
    const viewportWidth = this.host.clientWidth || window.innerWidth;
    const viewportHeight = this.host.clientHeight || window.innerHeight;
    const isMobile = viewportWidth <= MOBILE_GUIDE_BREAKPOINT;
    const isTablet = viewportWidth <= TABLET_GUIDE_BREAKPOINT;
    const characterSize = clamp(
      Math.min(viewportWidth * (isMobile ? 0.18 : isTablet ? 0.14 : 0.12), viewportHeight * (isMobile ? 0.13 : 0.18)),
      isMobile ? 72 : 88,
      isMobile ? 102 : 132
    );
    const panelWidth = clamp(Math.min(viewportWidth * (isMobile ? 0.64 : isTablet ? 0.42 : 0.34), isMobile ? 280 : 340), isMobile ? 190 : 236, isMobile ? 276 : 320);
    const panelHeight = panelWidth / GUIDE_PANEL_ASPECT_RATIO;

    if (this.currentPresence.zone === 'focus') {
      const focusCharacterSize = isMobile ? clamp(characterSize * 0.82, 60, 78) : clamp(characterSize, 92, 124);
      const focusPanelWidth = isMobile ? clamp(panelWidth * 0.74, 168, 210) : clamp(panelWidth, 248, 320);
      const focusPanelHeight = focusPanelWidth / GUIDE_PANEL_ASPECT_RATIO;
      const focusOffsetX = focusPanelWidth - focusCharacterSize * 0.16;
      const focusOffsetY = focusPanelHeight * 0.76;
      const focusCharacterLeft = clamp(
        (isMobile ? 18 : 28) + focusOffsetX,
        VIEWPORT_MARGIN + focusOffsetX,
        Math.max(VIEWPORT_MARGIN + focusOffsetX, viewportWidth - focusCharacterSize - VIEWPORT_MARGIN)
      );
      const focusCharacterTop = clamp(
        viewportHeight - focusCharacterSize - (isMobile ? 18 : 26),
        VIEWPORT_MARGIN + focusOffsetY,
        Math.max(VIEWPORT_MARGIN + focusOffsetY, viewportHeight - focusCharacterSize - VIEWPORT_MARGIN)
      );

      return {
        characterLeft: focusCharacterLeft,
        characterTop: focusCharacterTop,
        characterSize: focusCharacterSize,
        characterFlipX: false,
        panelLeft: clamp(focusCharacterLeft - focusOffsetX, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportWidth - focusPanelWidth - VIEWPORT_MARGIN)),
        panelTop: clamp(focusCharacterTop - focusOffsetY, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportHeight - focusPanelHeight - VIEWPORT_MARGIN)),
        panelWidth: focusPanelWidth,
        panelHeight: focusPanelHeight,
        flipX: true,
        flipY: false
      };
    }

    const targetRect = expandRect(buildRectFromTarget(target), isMobile ? 12 : 18);

    const requestedPlacement = target.guidePlacementHint;
    const bubbleSide = target.bubblePlacementHint ?? 'upper-left';
    const guideFlipX = target.flipGuideX ?? false;

    const allGuideCandidates = [
      {
        name: 'bottom-right',
        left: targetRect.right + TARGET_GAP,
        top: targetRect.bottom + TARGET_GAP
      },
      {
        name: 'right',
        left: targetRect.right + TARGET_GAP,
        top: target.y - characterSize * 0.5
      },
      {
        name: 'bottom',
        left: target.x - characterSize * 0.5,
        top: targetRect.bottom + TARGET_GAP
      },
      {
        name: 'top-right',
        left: targetRect.right + TARGET_GAP,
        top: targetRect.top - characterSize - TARGET_GAP
      },
      {
        name: 'left',
        left: targetRect.left - characterSize - TARGET_GAP,
        top: target.y - characterSize * 0.5
      },
      {
        name: 'bottom-left',
        left: targetRect.left - characterSize * 0.7,
        top: targetRect.bottom + TARGET_GAP
      }
    ];
    const guideCandidates = requestedPlacement
      ? allGuideCandidates.filter((candidate) => candidate.name === requestedPlacement)
      : allGuideCandidates;

    let bestScore = Number.POSITIVE_INFINITY;
    let bestPlacement: GuidePlacement | null = null;
    const pairPanelOffsetY = panelHeight * 0.76;
    const pairPanelOffsetLeftX = panelWidth - characterSize * 0.16;
    const pairPanelOffsetRightX = -characterSize * 0.18;

    guideCandidates.forEach((guideCandidate, guideIndex) => {
      let characterLeft = clamp(guideCandidate.left, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportWidth - characterSize - VIEWPORT_MARGIN));
      let characterTop = clamp(guideCandidate.top, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportHeight - characterSize - VIEWPORT_MARGIN));
      let panelLeft =
        bubbleSide === 'upper-right'
          ? characterLeft - pairPanelOffsetRightX
          : characterLeft - pairPanelOffsetLeftX;
      let panelTop = characterTop - pairPanelOffsetY;

      const pairRect = buildRect(
        Math.min(characterLeft, panelLeft),
        Math.min(characterTop, panelTop),
        Math.max(characterLeft + characterSize, panelLeft + panelWidth) - Math.min(characterLeft, panelLeft),
        Math.max(characterTop + characterSize, panelTop + panelHeight) - Math.min(characterTop, panelTop)
      );
      const shiftX =
        pairRect.left < VIEWPORT_MARGIN
          ? VIEWPORT_MARGIN - pairRect.left
          : pairRect.right > viewportWidth - VIEWPORT_MARGIN
            ? viewportWidth - VIEWPORT_MARGIN - pairRect.right
            : 0;
      const shiftY =
        pairRect.top < VIEWPORT_MARGIN
          ? VIEWPORT_MARGIN - pairRect.top
          : pairRect.bottom > viewportHeight - VIEWPORT_MARGIN
            ? viewportHeight - VIEWPORT_MARGIN - pairRect.bottom
            : 0;

      characterLeft += shiftX;
      characterTop += shiftY;
      panelLeft += shiftX;
      panelTop += shiftY;

      const characterRect = buildRect(characterLeft, characterTop, characterSize, characterSize);
      const panelRect = buildRect(panelLeft, panelTop, panelWidth, panelHeight);
      const offscreenPenalty =
        Math.abs(characterLeft - guideCandidate.left) +
        Math.abs(characterTop - guideCandidate.top);
      const overlapPenalty = rectsOverlap(panelRect, targetRect) ? 5200 : 0;
      const characterOverlapPenalty = rectsOverlap(characterRect, targetRect) ? 5200 : 0;
      const bubbleCharacterPenalty = rectsOverlap(panelRect, characterRect) ? 0 : 0;
      const preferencePenalty = guideIndex * (this.currentPresence.zone === 'focus' ? 70 : 28);
      const distancePenalty =
        Math.hypot(characterRect.left + characterSize * 0.5 - target.x, characterRect.top + characterSize * 0.5 - target.y) * (isMobile ? 0.14 : 0.18);
      const panelDistancePenalty =
        Math.hypot(panelRect.left + panelWidth * 0.5 - target.x, panelRect.top + panelHeight * 0.5 - target.y) * (isMobile ? 0.05 : 0.08);
      const score = offscreenPenalty + overlapPenalty + characterOverlapPenalty + bubbleCharacterPenalty + distancePenalty + panelDistancePenalty + preferencePenalty;

      if (score < bestScore) {
        bestScore = score;
        bestPlacement = {
          characterLeft,
          characterTop,
          characterSize,
          characterFlipX: guideFlipX,
          panelLeft: panelRect.left,
          panelTop: panelRect.top,
          panelWidth,
          panelHeight,
          flipX: bubbleSide === 'upper-left',
          flipY: false
        };
      }
    });

    return (
      bestPlacement ?? {
        characterLeft: clamp(target.x - characterSize * 0.5, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportWidth - characterSize - VIEWPORT_MARGIN)),
        characterTop: clamp(target.y + TARGET_GAP, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportHeight - characterSize - VIEWPORT_MARGIN)),
        characterSize,
        characterFlipX: guideFlipX,
        panelLeft: clamp(target.x - panelWidth - characterSize * 0.08, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportWidth - panelWidth - VIEWPORT_MARGIN)),
        panelTop: clamp(target.y - panelHeight - characterSize * 0.22, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportHeight - panelHeight - VIEWPORT_MARGIN)),
        panelWidth,
        panelHeight,
        flipX: bubbleSide === 'upper-left',
        flipY: false
      }
    );
  }

  private updateAnimation(deltaTime: number, desiredVisible: boolean) {
    const animation = GUIDE_ANIMATIONS[this.currentAnimation];
    const totalDuration = animation.frameDuration * Math.max(1, animation.frames.length);
    const previousLoopIndex = Math.floor(this.animationElapsed / totalDuration);

    this.animationElapsed += deltaTime;

    if (!animation.loop && this.animationElapsed >= totalDuration) {
      if (this.currentAnimation === 'arrive') {
        this.animationElapsed = 0;
        this.animationLoops = 0;
        this.setAnimation(this.currentMessage ? 'talk_hold' : 'idle', true);
      } else if (this.currentAnimation === 'talk_release') {
        this.animationElapsed = 0;
        this.animationLoops = 0;
        this.setAnimation('idle', true);
      } else if (this.currentAnimation === 'leave') {
        this.visible = false;
        this.animationElapsed = 0;
        this.animationLoops = 0;
        this.setAnimation('idle', true);
      }
      this.applyAnimationFrame();
      return;
    }

    if (animation.loop) {
      const nextLoopIndex = Math.floor(this.animationElapsed / totalDuration);
      if (nextLoopIndex > previousLoopIndex) {
        this.animationLoops += 1;
        if (this.currentAnimation === 'idle2' && this.animationLoops >= 1) {
          this.idleVariationAt = performance.now() + this.randomIdleDelay();
          this.setAnimation(this.currentMessage ? 'talk_hold' : 'idle', true);
        }
      }
    } else if (!desiredVisible && this.currentAnimation !== 'leave') {
      this.setAnimation('leave', true);
    }

    this.applyAnimationFrame();
  }

  private setAnimation(name: GuideAnimationName, restart = false) {
    if (!restart && name === this.currentAnimation) {
      return;
    }
    this.currentAnimation = name;
    this.animationElapsed = 0;
    this.animationLoops = 0;
    this.characterElement.style.backgroundImage = `url("${GUIDE_SPRITES[GUIDE_ANIMATIONS[name].sprite]}")`;
  }

  private applyAnimationFrame() {
    const animation = GUIDE_ANIMATIONS[this.currentAnimation];
    const frameCount = Math.max(1, animation.frames.length);
    const totalDuration = animation.frameDuration * frameCount;
    const elapsed = animation.loop ? this.animationElapsed % totalDuration : Math.min(this.animationElapsed, totalDuration - 0.0001);
    const sequenceIndex = clamp(Math.floor(elapsed / animation.frameDuration), 0, frameCount - 1);
    const frameIndex = animation.frames[sequenceIndex] ?? animation.frames[animation.frames.length - 1] ?? 0;
    const framePosition = GUIDE_FRAME_COUNT <= 1 ? 0 : (frameIndex / (GUIDE_FRAME_COUNT - 1)) * 100;
    this.characterElement.style.backgroundPosition = `${framePosition}% 50%`;
  }

  private applyVisuals() {
    const showCharacter = (this.visible && !this.suspended) || (this.manuallyDisabled && !this.suspended);
    this.element.setAttribute('data-visible', String(showCharacter));
    this.element.setAttribute('data-disabled', String(this.manuallyDisabled));
    this.element.setAttribute('aria-hidden', String(!showCharacter));
    this.element.setAttribute('data-panel-visible', String(this.panelVisible));
    this.element.setAttribute('data-zone', this.currentPresence.zone);
    this.panel.setAttribute('data-visible', String(this.panelVisible));

    this.characterShell.style.transform = `translate3d(${this.currentCharacterLeft.toFixed(2)}px, ${this.currentCharacterTop.toFixed(2)}px, 0) scaleX(${this.currentCharacterFlipX ? -1 : 1})`;
    this.characterShell.style.width = `${this.currentCharacterSize.toFixed(2)}px`;
    this.characterShell.style.height = `${this.currentCharacterSize.toFixed(2)}px`;
    this.panel.style.transform = `translate3d(${this.currentPanelLeft.toFixed(2)}px, ${this.currentPanelTop.toFixed(2)}px, 0)`;
    this.panel.style.width = `${this.currentPanelWidth.toFixed(2)}px`;
    this.panel.style.height = `${this.currentPanelHeight.toFixed(2)}px`;
    this.panelArt.style.transform = `scale(${this.currentPanelFlipX ? -1 : 1}, ${this.currentPanelFlipY ? -1 : 1})`;

    if (this.manuallyDisabled) {
      this.characterElement.style.backgroundImage = `url("${GUIDE_SPRITES.constant}")`;
      this.characterElement.style.backgroundSize = '100% 100%';
      this.characterElement.style.backgroundPosition = '50% 50%';
    } else {
      this.characterElement.style.backgroundSize = '500% 100%';
    }
  }

  private render() {
    const message = this.currentMessage;
    if (!message) {
      this.titleElement.textContent = '';
      this.bodyElement.textContent = '';
      return;
    }
    this.titleElement.textContent = message.title[this.i18n.current];
    this.bodyElement.textContent = message.body[this.i18n.current];
  }

  private loadFlags() {
    try {
      const raw = window.localStorage.getItem(GUIDE_FLAG_STORAGE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as string[];
      parsed.forEach((value) => {
        if (typeof value === 'string') {
          this.seenFlags.add(value);
        }
      });
    } catch {
      this.seenFlags.clear();
    }
  }

  private loadAnchor() {
    try {
      const raw = window.sessionStorage.getItem(GUIDE_ANCHOR_STORAGE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as Partial<GuideAnchor>;
      if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
        this.anchor = {
          x: clamp(parsed.x, 0, 1),
          y: clamp(parsed.y, 0, 1)
        };
      }
    } catch {
      this.anchor = { x: 0.08, y: 0.7 };
    }
  }

  private markSeen(flag: string) {
    this.seenFlags.add(flag);
    try {
      window.localStorage.setItem(GUIDE_FLAG_STORAGE_KEY, JSON.stringify([...this.seenFlags]));
    } catch {
      // Ignore storage write issues, the guide can still function for the current session.
    }
  }

  private saveAnchor() {
    try {
      window.sessionStorage.setItem(GUIDE_ANCHOR_STORAGE_KEY, JSON.stringify(this.anchor));
    } catch {
      // Session persistence is best-effort only.
    }
  }

  private bindPointerEvents() {
    window.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') {
        return;
      }
      this.cursorX = clamp(event.clientX, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, (this.host.clientWidth || window.innerWidth) - VIEWPORT_MARGIN));
      this.cursorY = clamp(event.clientY, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, (this.host.clientHeight || window.innerHeight) - VIEWPORT_MARGIN));
    });

    this.characterShell.addEventListener('pointerdown', (event) => {
      if ((!this.visible && !this.manuallyDisabled) || this.suspended) {
        return;
      }
      this.dragPointerId = event.pointerId;
      this.dragMoved = false;
      this.dragStartClientX = event.clientX;
      this.dragStartClientY = event.clientY;
      this.dragStartLeft = this.currentCharacterLeft;
      this.dragStartTop = this.currentCharacterTop;
      this.characterShell.setPointerCapture(event.pointerId);
      event.preventDefault();
      event.stopPropagation();
    });

    this.characterShell.addEventListener('pointermove', (event) => {
      if (this.dragPointerId !== event.pointerId) {
        return;
      }
      const deltaX = event.clientX - this.dragStartClientX;
      const deltaY = event.clientY - this.dragStartClientY;
      if (!this.dragMoved && Math.hypot(deltaX, deltaY) >= GUIDE_DRAG_THRESHOLD) {
        this.dragMoved = true;
      }
      if (!this.dragMoved) {
        return;
      }
      const viewportWidth = this.host.clientWidth || window.innerWidth;
      const viewportHeight = this.host.clientHeight || window.innerHeight;
      const nextLeft = clamp(this.dragStartLeft + deltaX, VIEWPORT_MARGIN, viewportWidth - this.currentCharacterSize - VIEWPORT_MARGIN);
      const nextTop = clamp(this.dragStartTop + deltaY, VIEWPORT_MARGIN, viewportHeight - this.currentCharacterSize - VIEWPORT_MARGIN);
      this.setAnchorFromPixelPosition(nextLeft, nextTop, this.currentCharacterSize, viewportWidth, viewportHeight);
      this.currentCharacterLeft = nextLeft;
      this.currentCharacterTop = nextTop;
      this.desiredCharacterLeft = nextLeft;
      this.desiredCharacterTop = nextTop;
      this.applyVisuals();
      event.preventDefault();
      event.stopPropagation();
    });

    const finishPointer = (event: PointerEvent) => {
      if (this.dragPointerId !== event.pointerId) {
        return;
      }
      try {
        this.characterShell.releasePointerCapture(event.pointerId);
      } catch {
        // Ignore release failures if capture was already lost.
      }
      const wasDrag = this.dragMoved;
      this.dragPointerId = null;
      this.dragMoved = false;
      if (wasDrag) {
        this.saveAnchor();
      } else {
        this.toggleManualVisibility();
      }
      event.preventDefault();
      event.stopPropagation();
    };

    this.characterShell.addEventListener('pointerup', finishPointer);
    this.characterShell.addEventListener('pointercancel', finishPointer);
    this.characterShell.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }
      event.preventDefault();
      this.toggleManualVisibility();
    });
  }

  private toggleManualVisibility() {
    this.manuallyDisabled = !this.manuallyDisabled;
    this.currentMessage = null;
    this.queue.length = 0;
    this.render();
    if (!this.manuallyDisabled) {
      this.cooldowns.clear();
      this.visible = false;
    } else {
      this.panelVisible = false;
    }
  }

  private setAnchorFromPixelPosition(left: number, top: number, characterSize: number, viewportWidth: number, viewportHeight: number) {
    const pairPanelOffsetX = characterSize * 0.84;
    const pairPanelOffsetY = this.currentPanelHeight * 0.76;
    const minCharacterLeft = VIEWPORT_MARGIN;
    const maxCharacterLeft = Math.max(minCharacterLeft, viewportWidth - this.currentPanelWidth - pairPanelOffsetX - VIEWPORT_MARGIN);
    const minCharacterTop = Math.max(VIEWPORT_MARGIN + pairPanelOffsetY, VIEWPORT_MARGIN);
    const maxCharacterTop = Math.max(minCharacterTop, viewportHeight - characterSize - VIEWPORT_MARGIN);
    const availableWidth = Math.max(1, maxCharacterLeft - minCharacterLeft);
    const availableHeight = Math.max(1, maxCharacterTop - minCharacterTop);
    this.anchor = {
      x: clamp((left - minCharacterLeft) / availableWidth, 0, 1),
      y: clamp((top - minCharacterTop) / availableHeight, 0, 1)
    };
  }

  private randomIdleDelay() {
    return 12000 + Math.random() * 7000;
  }

  private getHoverCooldownKeys(key: string) {
    switch (key) {
      case 'primaterie-portfolio':
        return ['guide:primaterie-hover-cooldown:portfolio'];
      case 'primaterie-adventure':
        return ['guide:primaterie-hover-cooldown:adventure'];
      case 'primaterie-discord':
        return ['guide:primaterie-hover-cooldown:discord'];
      case 'primaterie-patreon':
        return ['guide:primaterie-hover-cooldown:patreon'];
      case 'primaterie-theme':
        return ['guide:primaterie-hover-cooldown:theme'];
      case 'primaterie-language':
        return ['guide:primaterie-hover-cooldown:language'];
      case 'game-score':
        return ['guide:game-over-hover-cooldown:score'];
      case 'game-avatar':
        return ['guide:game-over-hover-cooldown:avatar'];
      case 'game-avatar-ears':
        return ['guide:avatar-hover-cooldown:ears'];
      case 'game-avatar-parts':
        return ['guide:avatar-hover-cooldown:parts'];
      case 'game-avatar-save':
        return ['guide:avatar-hover-cooldown:save'];
      case 'game-avatar-close':
        return ['guide:avatar-hover-cooldown:close'];
      case 'game-save':
        return ['guide:game-over-hover-cooldown:save'];
      case 'game-leaderboard':
        return ['guide:game-over-hover-cooldown:leaderboard'];
      case 'game-replay':
        return ['guide:game-over-hover-cooldown:replay'];
      case 'game-menu':
        return ['guide:game-over-hover-cooldown:menu'];
      case 'game-tutorial':
        return ['guide:tutorial-hover-cooldown:entry'];
      case 'game-tutorial-nav':
        return ['guide:tutorial-hover-cooldown:nav'];
      case 'game-tutorial-close':
        return ['guide:tutorial-hover-cooldown:close'];
      case 'game-achievements':
        return ['guide:achievements-hover-cooldown:entry'];
      case 'game-achievements-filters':
        return ['guide:achievements-hover-cooldown:filters'];
      case 'game-achievements-close':
        return ['guide:achievements-hover-cooldown:close'];
      case 'game-settings-toggle':
        return ['guide:settings-hover-cooldown:entry'];
      case 'game-settings-help':
        return ['guide:settings-hover-cooldown:help'];
      case 'game-settings-theme':
        return ['guide:settings-hover-cooldown:theme'];
      case 'game-settings-language':
        return ['guide:settings-hover-cooldown:language'];
      case 'game-settings-fullscreen':
        return ['guide:settings-hover-cooldown:fullscreen'];
      case 'game-settings-mute':
        return ['guide:settings-hover-cooldown:mute'];
      case 'game-settings-volume':
        return ['guide:settings-hover-cooldown:volume'];
      default:
        return [];
    }
  }
}
