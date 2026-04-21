import type { Language, LocalizedText, PortfolioProject } from '../types/content';
import { damp } from '../core/math';
import { HELP_ICON_ASSETS } from '../game/GameUiAssetResolver';
import { resolveDocumentTheme } from '../game/ThemeAssetResolver';
import {
  type GuideInterruptibility,
  type GuideRevealMode,
  type GuideSegment,
  type GuideSequence,
  type GuideTextAnimation,
  type GuideToken,
  parseDialogueToSequence
} from './guideDialogue';
import { I18nService } from './I18nService';

const GUIDE_FLAG_STORAGE_KEY = 'portfolio-contextual-guide-flags-v2';
const GUIDE_ANCHOR_STORAGE_KEY = 'portfolio-contextual-guide-anchor-v1';
const GUIDE_HISTORY_STORAGE_KEY = 'portfolio-contextual-guide-history-v1';
const GUIDE_PANEL_ASPECT_RATIO = 4981 / 4678;
const GUIDE_FRAME_COUNT = 5;
const GUIDE_DRAG_THRESHOLD = 10;
const MOBILE_GUIDE_BREAKPOINT = 680;
const TABLET_GUIDE_BREAKPOINT = 900;
const GUIDE_CURSOR_OFFSET_X = 18;
const GUIDE_CURSOR_OFFSET_Y = 16;
const GUIDE_BUBBLE_GAP_X = 12;
const GUIDE_BUBBLE_GAP_Y = 10;
const GUIDE_EDGE_ZONE = 0.18;
const GUIDE_HISTORY_LIMIT = 18;
const GUIDE_HELP_MAX_VISIBLE_ORBITS = 7;
const GUIDE_HELP_PAGE_CONTENT_LIMIT = 5;
const GUIDE_HELP_ORBIT_RADII = [112, 96, 104, 122, 130, 118, 108] as const;
const GUIDE_HELP_ORBIT_BUTTON_SIZES = [72, 68, 74, 82, 80, 74, 70] as const;
const GUIDE_HELP_ORBIT_ANGLES = [-72, -26, 18, 58, 104, 146, 184] as const;
const GUIDE_HELP_SUMMARY_WIDTH = 214;
const GUIDE_HELP_SUMMARY_SAFE_AREA = { top: 0.18, right: 0.18, bottom: 0.28, left: 0.2 } as const;

const GUIDE_SPRITES = {
  arrive: new URL('../../assets/images/shared/branding/guide/guide-arrive.png', import.meta.url).href,
  idle: new URL('../../assets/images/shared/branding/guide/guide-idle.png', import.meta.url).href,
  idle2: new URL('../../assets/images/shared/branding/guide/guide-idle2.png', import.meta.url).href,
  leave: new URL('../../assets/images/shared/branding/guide/guide-leave.png', import.meta.url).href,
  talk: new URL('../../assets/images/shared/branding/guide/guide-talk.png', import.meta.url).href,
  constant: new URL('../../assets/images/shared/branding/guide/guide-constant.png', import.meta.url).href
} as const;

type GuideAnimationName = 'arrive' | 'idle' | 'idle2' | 'leave' | 'talk_hold' | 'talk_release';
type TriggerSource = 'auto' | 'history' | 'help';
type GuideBubbleThemeMode = 'light-bubble' | 'dark-bubble';
type GuideTextContrastMode = 'ink-dark' | 'ink-light';
type GuideImpactWordColorMode = 'mirror-dark' | 'mirror-light';
type GuidePunctuationAccentMode = 'accent-cycle';
type GuideHelpTopic =
  | 'intro_mirror'
  | 'portfolio_navigation'
  | 'focus_zone'
  | 'slot_goal'
  | 'primaterie_hub'
  | 'primaterie_contact'
  | 'game_rules'
  | 'game_score_save'
  | 'game_settings'
  | 'game_achievements'
  | 'about_zone';

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
  fr: 'Stickmankey',
  en: 'Stickmankey'
} satisfies LocalizedText;

const VIEWPORT_MARGIN = 18;
const TARGET_GAP = 22;

const GUIDE_SAFE_AREAS = {
  'left-above': { top: 0.16, right: 0.16, bottom: 0.28, left: 0.2 },
  'right-above': { top: 0.16, right: 0.2, bottom: 0.28, left: 0.16 },
  'left-below': { top: 0.24, right: 0.16, bottom: 0.18, left: 0.2 },
  'right-below': { top: 0.24, right: 0.2, bottom: 0.18, left: 0.16 },
  focus: { top: 0.18, right: 0.16, bottom: 0.24, left: 0.18 }
} as const;

const GUIDE_TOKEN_PUNCTUATION_RE = /^[!?….,;:()]+$/;

export interface GuideTarget {
  x: number;
  y: number;
  width: number;
  height: number;
  guidePlacementHint?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'left' | 'right' | 'top' | 'bottom';
  bubblePlacementHint?: 'upper-left' | 'upper-right';
  flipGuideX?: boolean;
  fixedPlacementMode?: 'achievements';
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
  | { type: 'intro_mirror_0' }
  | { type: 'intro_mirror_first_click' }
  | { type: 'intro_mirror_50' }
  | { type: 'intro_mirror_100' }
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
  | { type: 'settings_hover'; item: 'entry' | 'help' | 'theme' | 'language' | 'fullscreen' | 'mute' | 'volume' }
  | { type: 'game_control_hint'; item: 'left' | 'up' | 'right' | 'down' }
  | { type: 'game_enemy_intro' }
  | { type: 'game_enemy_top_intro' }
  | { type: 'game_enemy_bot_intro' }
  | { type: 'game_question_intro' }
  | { type: 'game_shop_intro' }
  | { type: 'game_milestone_intro' }
  | { type: 'help_topic'; topic: GuideHelpTopic };

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
  bubbleX: 'left' | 'right';
  bubbleY: 'above' | 'below';
}

interface GuideAnchor {
  x: number;
  y: number;
}

interface GuideMessage {
  id: string;
  priority: number;
  title: LocalizedText;
  target: GuideTarget | null;
  createdAt: number;
  sequence: GuideSequence;
  category: string;
  contextKey: GuidePresenceContext['zone'];
  replacementKey: string;
  queueBehavior: 'replace' | 'stack';
  critical: boolean;
  replayEligible: boolean;
  source: TriggerSource;
}

interface GuidePlaybackState {
  message: GuideMessage;
  segmentIndex: number;
  segmentStartedAt: number;
  startedAt: number;
}

interface GuidePlaybackProgress {
  segment: GuideSegment;
  renderSegment: GuideSegment;
  segmentIndex: number;
  renderSegmentIndex: number;
  elapsedMs: number;
  revealComplete: boolean;
  boundaryReached: boolean;
  segmentComplete: boolean;
  visibleUnitCount: number;
}

interface GuideHistoryEntry {
  id: string;
  messageId: string;
  title: LocalizedText;
  label: LocalizedText;
  description: LocalizedText;
  category: string;
  contextKey: GuidePresenceContext['zone'];
  sequence: GuideSequence;
  recordedAt: number;
  firstDiscovery: boolean;
  source: TriggerSource;
}

interface GuideCatalogueEntry {
  id: string;
  kind: 'topic' | 'replay' | 'page_prev' | 'page_next';
  label: LocalizedText;
  description: LocalizedText;
  cue?: GuideCue;
  historyId?: string;
  firstDiscovery?: boolean;
  pageDelta?: -1 | 1;
}

interface GuideTriggerOptions {
  bypassGuards?: boolean;
  source?: TriggerSource;
}

interface GuideTokenRenderRef {
  token: GuideToken;
  element: HTMLSpanElement;
  ink: HTMLSpanElement;
}

interface GuideHelpBubblePlacement {
  left: number;
  top: number;
  width: number;
  height: number;
  flipX: boolean;
  flipY: boolean;
  bubbleX: 'left' | 'right';
  bubbleY: 'above' | 'below';
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
      return loc('Le point de départ.', 'The starting point.');
    case 2:
      return loc('Direction artistique.', 'Art direction.');
    case 3:
      return loc('Cinéma.', 'Cinema.');
    case 4:
      return loc('Jeux vidéo.', 'Video games.');
    case 5:
      return loc('Collaborations.', 'Collaborations.');
    case 6:
      return loc('Projets en cours.', 'Ongoing projects.');
    default:
      return loc('Euh ?', 'This fragment is about another corner of my universe. Go take a look.');
  }
}

function getFocusBody(project: PortfolioProject, facetIndex: number): LocalizedText {
  const bespokeLines: Partial<Record<number, [LocalizedText, LocalizedText, LocalizedText]>> = {
    1: [
      loc('Bienvenue dans mon univers.', 'Welcome to my universe.'),
      loc(
        'Polyvalence et idées, C’est mon deuxieme prenom.. euuh... plutot mon deuxieme et troiseme prenom.',
        'Versatility and ideas, that’s my middle name.. uh... more like my middle and last name.'
      ),
      loc('Aka Le Roi du freestyle', 'Aka The King of Freestyle')
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
      loc('Darwin n’a cas bien se tenir', 'Darwin better watch out')
    ],
    3: [
      loc('Premier saut, on a dit.. pas premier atterrissage', 'First leap, we said.. not first landing'),
      loc(
        'J’ai déjà dit que la polyvalence c’est mon deuxième prénom, ou peut-être mon troisième, je ne sais plus.',
        'I’ve already said that versatility is my middle name, or maybe my third name, I can’t remember.'
      ),
      loc('A cœur vaillant rien d’impossible. Surtout si c’est un Primate.', 'Nothing is impossible to a willing heart. Especially if it’s a Primate.')
    ],
    4: [
      loc('J’ai mis tous ce que j’aime dans ce RPG, et même un peu plus.', 'I put everything I love into this RPG, and even a bit more.'),
      loc('Ta toujours pas tester la Primaterie ?', 'Have you tried the Primaterie yet?'),
      loc('J’ai la vision dimensionnelle... tu vois ce que je veux dire ?', 'I have the dimensional vision... you know what I mean?')
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
      loc('J’adore Tom Hanks', 'I love Tom Hanks')
    ],
    6: [
      loc(
        'En cours, sa aussi c’est mon quatrieme prenom honteux. on en a tous un non ? Bert... c’est pas mieux...',
        'Ongoing, that’s also my shameful fourth name. We all have one, right? Bert... that’s not better...'
      ),
      loc('Il me cole aux baskets ce nom mais promis, sa change bientot.', 'That name is sticking to my sneakers but I promise, it’s changing soon.'),
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
    `Là, tu regardes ${facet.categoryLabel.fr.toLowerCase()} de ${project.title.fr}.`,
    `You’re looking at ${project.title.en}'s ${facet.categoryLabel.en.toLowerCase()}.`
  );
}

function getPrimaterieHoverBody(item: 'portfolio' | 'adventure' | 'discord' | 'patreon' | 'theme' | 'language'): LocalizedText {
  switch (item) {
    case 'portfolio':
      return loc('Tu peux allez regarder les autre projets que j’ai fait ici.', 'You can go check out the other projects I made here.');
    case 'adventure':
      return loc('T’es prêt pour l’aventure ?', 'Are you ready for an adventure?');
    case 'discord':
      return loc('Rejoins la Primaterie.', 'Come into the Primaterie.');
    case 'patreon':
      return loc(
        'La trésorerie fait peur ! Soutiens un primate indépendant et passionné et aide-moi à financer mes projets.',
        'The treasury is scary! Support a passionate independent ape creator and help me fund my projects.'
      );
    case 'theme':
      return loc('Attention les yeux !', 'Feast your eyes on this!');
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
      return loc('Ici, tu peu regarder ton kiki meter.', 'Here, you can look at your score.');
    case 'avatar':
      return loc('Pense à personnaliser ton Primate.', 'Think about customizing your Primate.');
    case 'save':
      return loc(
        'N’oublie pas d’entrer ton nom au moins une fois, ça sauvegardera automatiquement ton score. Sinon ta run s’évapore et je fais comme si de rien n’était.',
        'Make sure to enter your name at least once, it will automatically save your score. Otherwise your run evaporates and I pretend I didn’t see anything.'
      );
    case 'leaderboard':
      return loc(
        'Le leaderboard montre comment tu t’es débrouillé par rapport aux plus grands Primates qui ont naviguer sur ces verres.',
        'The leaderboard shows how you fared against the greatest Primates who have navigate on these glasses.'
      );
    case 'replay':
      return loc('Tu veux retenter ta chance ?', 'Do you want to try again?');
    case 'menu':
      return loc('Pfff... LOOSER !', 'Pfff... LOOSER !');
  }
}

function getAvatarHoverBody(item: 'overview' | 'ears' | 'parts' | 'save' | 'close'): LocalizedText {
  switch (item) {
    case 'overview':
      return loc(
        'Change l’apparence de ton Primate avec les accessoires que tu a débloqué.',
        'Change your Primate’s look with the accessories you unlocked.'
      );
    case 'ears':
      return loc(
        'Les oreilles aussi comptent. Essaie plusieurs formes avant de sauvegarder ton chef-d’oeuvre.',
        'Ears count too. Try a few shapes before you save your masterpiece.'
      );
    case 'parts':
      return loc('Trouve ton style unique !', 'Find your unique style!');
    case 'save':
      return loc('Quand ta monstruosité te plaît, valide-la ici.', 'Once your little monstrosity looks right, lock it in here.');
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
        'Prends le temps de lire les règles de la Primaterie. Ça pourrait t’aider, promis.',
        'Take the time to read the rules of the Primaterie. It could help you, I promise.'
      );
    case 'nav':
      return loc('Prend le temps j’ai dit ! Pourquoi etre pressé ?', 'Take your time I said! Why be in a hurry?');
    case 'close':
      return loc('Bon c’est fini ? L’aventure ne va pas attendre toute la journée !', 'Done already? The adventure won’t wait all day!');
  }
}

function getAchievementsHoverBody(item: 'entry' | 'filters' | 'close'): LocalizedText {
  switch (item) {
    case 'entry':
      return loc(
        'Ici tu peux regarder tous tes succès et ce que tu as déjà accompli. T’es plutôt un champion !',
        'Here you can look at all your achievements and what you have already accomplished. You’re quite the champion!'
      );
    case 'filters':
      return loc('Trie pour trouver plus facilement ce que tu cherches.', 'Filter to more easily find what you are looking for.');
    case 'close':
      return loc('Tu peux refermer là. Les trophées ne vont pas s’enfuir.', 'You can close it there. The trophies are not going anywhere.');
  }
}

function getSettingsHoverBody(item: 'entry' | 'help' | 'theme' | 'language' | 'fullscreen' | 'mute' | 'volume'): LocalizedText {
  switch (item) {
    case 'entry':
      return loc(
        'Regarde un peu les réglages disponibles,(Pense a verifier que le son est bien activé).',
        'Check the settings first. (Make sure the sound is on, by the way.)'
      );
    case 'help':
      return loc(
        'Regarde ces images de tutoriels qui m’ont pris des heures à faire... sniff...',
        'Look at these tutorial images that took me hours... sniff...'
      );
    case 'theme':
      return loc('Là, tu changes l’ambiance du jeu.', 'That one changes the game’s mood.');
    case 'language':
      return loc('ME SPEAK ENGLISH VERY WELL YES YES! Je t’ai deja dit ?.', 'MOI PARLER FRANCAIS OUI OUI! Did I already tell you?');
    case 'fullscreen':
      return loc('Mode plein écran', 'Fullscreen mode');
    case 'mute':
      return loc(
        'Ah OUAIS !? Tu veux couper le son, tu n’as vraiment pas de goût mais bon, c’est pas grave...',
        'Damn, you want to turn off the sound... ok, you don’t have a taste for it but that’s fine...'
      );
    case 'volume':
      return loc('La barre te laisse doser le son.', 'That bar lets you tune the sound.');
  }
}

function getGameControlBody(item: 'left' | 'up' | 'right' | 'down'): LocalizedText {
  switch (item) {
    case 'left':
      return loc(
        '🢀: le Wrapper te projette vers une shard sûre plus loin.',
        '🢀: the Wrapper throws you to a safe shard farther ahead.'
      );
    case 'up':
      return loc(
        '🢁: ne sert qu’en l’air. Elle déclenche tes impulsions aériennes',
        '🢁: only works in the air. It triggers your airborne impulses'
      );
    case 'right':
      return loc(
        '🢂: Le grappin attrape une shard et meme certains ennemis. Réappui pour relacher ou maintiens pour te rapprocher.',
        '🢂: the grapple catches a shard and even some enemies. Press again to release or hold to move closer.'
      );
    case 'down':
      return loc(
        '🢃 te permet de prendre de l’élan et de sauter quand tu relache, le boost fonctionne aussi dans les air avec le souffleur.',
        '🢃 lets you gain speed and jump when you release it, the boost also works in the air with the blower.'
      );
  }
}

function getHelpTopicCopy(topic: GuideHelpTopic) {
  switch (topic) {
    case 'intro_mirror':
      return {
        title: loc('Miroir', 'Mirror'),
        body: loc(
          'Entrer dans mon univers demande un minimum de curiosité.',
          'Entering my world requires a minimum of curiosity.'
        )
      };
    case 'portfolio_navigation':
      return {
        title: loc('Navigation', 'Navigation'),
        body: loc(
          'Chaque sphere représente un projet.',
          'Each shard represents a project.'
        )
      };
    case 'focus_zone':
      return {
        title: loc('Focus', 'Focus'),
        body: loc(
          'Prend le temps de regarder les détails de chaque projet.',
          'Take the time to look at the details of each project.'
        )
      };
    case 'slot_goal':
      return {
        title: loc('Fragments', 'Shards'),
        body: loc(
          'J’aime bien caché des petits secrets un peu partout.',
          'I like to hide little secrets here and there.'
        )
      };
    case 'primaterie_hub':
      return {
        title: loc('Primaterie', 'Primaterie'),
        body: loc(
          'La Primaterie ? encore une singerie de primate pour les primates.',
          'The Primaterie ? yet another primate song for the primates.'
        )
      };
    case 'primaterie_contact':
      return {
        title: loc('Contacts', 'Contacts'),
        body: loc(
          'Contact moi sur Discord ou par mail',
          'Contact me on Discord or by email'
        )
      };
    case 'game_rules':
      return {
        title: loc('Règles', 'Rules'),
        body: loc(
          'Maintien la touche 🢃 enfoncée pour charger ton départ sur une shard. 🢁 déclenche une impulsion seulement en l’air. 🢀 active le Wrapper, 🢂 pour le grappin. L’idée.',
          'Hold 🢃 to charge your launch on a shard. 🢁 triggers an impulse only in the air. 🢀 activates the Wrapper, 🢂 for the grapple. That’s the idea.'
        )
      };
    case 'game_score_save':
      return {
        title: loc('Score', 'Score'),
        body: loc(
          'Au game over, écris ton nom au moins une fois puis save. Sans ça, le score, la run et la gloire repartent dans le néant.',
          'At game over, type your name at least once and then save. Without that, the score, the run and the glory drift back into the void.'
        )
      };
    case 'game_settings':
      return {
        title: loc('Réglages', 'Settings'),
        body: loc(
          'Les réglages, c’est important. Surtout pour les primates sensibles comme toi.',
          'Settings are important. Especially for sensitive primates like you.'
        )
      };
    case 'game_achievements':
      return {
        title: loc('Succès', 'Achievements'),
        body: loc(
          'Deviens une légende de la Primaterie en complétant les succès. Certains sont bien cachés, à toi de les trouver.',
          'Become a legend of the Primaterie by completing achievements. Some are well hidden, it’s up to you to find them.'
        )
      };
    case 'about_zone':
      return {
        title: loc('Outro', 'Outro'),
        body: loc(
          'Tant que tu es là, si tu veux en savoir plus sur moi, mes projets ou juste me dire coucou, tu peux me contacter ici.',
          'While you are here, if you want to know more about me, my projects or just say hello, you can contact me here.'
        )
      };
  }
}

function getHelpTopicLabel(topic: GuideHelpTopic) {
  switch (topic) {
    case 'intro_mirror':
      return {
        label: loc('Comment casser le miroir ?', 'How do I crack the mirror?'),
        description: loc('Rejouer l’explication de l’intro.', 'Replay the intro explanation.')
      };
    case 'portfolio_navigation':
      return {
        label: loc('Se déplacer', 'Move around'),
        description: loc('Bases du portfolio.', 'Portfolio basics.')
      };
    case 'focus_zone':
      return {
        label: loc('Le focus', 'Focus mode'),
        description: loc('Voir le projet.', 'See the project.')
      };
    case 'slot_goal':
      return {
        label: loc('Les fragments', 'The shards'),
        description: loc('Remets-les en place.', 'Put them back.')
      };
    case 'primaterie_hub':
      return {
        label: loc('Cette zone', 'This zone'),
        description: loc('Vue d’ensemble.', 'Quick overview.')
      };
    case 'primaterie_contact':
      return {
        label: loc('Les contacts', 'Contacts'),
        description: loc('Discord et liens.', 'Links and contact.')
      };
    case 'game_rules':
      return {
        label: loc('Jouer', 'Play'),
        description: loc('Commandes principales.', 'Main controls.')
      };
    case 'game_score_save':
      return {
        label: loc('Sauver', 'Save score'),
        description: loc('Nom, save, classement.', 'Name, save, board.')
      };
    case 'game_settings':
      return {
        label: loc('Réglages', 'Settings'),
        description: loc('Audio, langue, thème.', 'Audio, language, theme.')
      };
    case 'game_achievements':
      return {
        label: loc('Succès', 'Achievements'),
        description: loc('Progression et récompenses.', 'Progress and rewards.')
      };
    case 'about_zone':
      return {
        label: loc('Le contact', 'Contact'),
        description: loc('Mail et formulaire.', 'Mail and form.')
      };
  }
}

export class GuideBubbleSystem {
  readonly element: HTMLDivElement;

  private readonly characterShell: HTMLDivElement;
  private readonly characterElement: HTMLDivElement;
  private readonly panel: HTMLDivElement;
  private readonly panelArt: HTMLDivElement;
  private readonly titleElement: HTMLParagraphElement;
  private readonly bodyElement: HTMLDivElement;
  private readonly bubbleCopy: HTMLDivElement;
  private readonly helpButton: HTMLButtonElement;
  private readonly helpButtonIcon: HTMLImageElement;
  private readonly helpSummaryPanel: HTMLDivElement;
  private readonly helpSummaryArt: HTMLDivElement;
  private readonly helpSummaryCopy: HTMLDivElement;
  private readonly helpSummaryTitle: HTMLParagraphElement;
  private readonly helpSummaryBody: HTMLParagraphElement;
  private readonly helpOrbit: HTMLDivElement;
  private readonly helpOrbitList: HTMLDivElement;

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
  private playback: GuidePlaybackState | null = null;
  private readonly queue: GuideMessage[] = [];
  private readonly seenFlags = new Set<string>();
  private readonly cooldowns = new Map<string, number>();
  private readonly history: GuideHistoryEntry[] = [];
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
  private currentPanelBubbleX: GuidePlacement['bubbleX'] = 'left';
  private currentPanelBubbleY: GuidePlacement['bubbleY'] = 'above';
  private lastRenderSignature = '';
  private lastRenderedSegmentKey: string | null = null;
  private renderedSegmentElement: HTMLDivElement | null = null;
  private renderedTokenRefs: GuideTokenRenderRef[] = [];
  private lastTokenFitSignature = '';
  private lastSegmentFitSignature = '';
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
  private helpPanelOpen = false;
  private helpEntries: GuideCatalogueEntry[] = [];
  private hoveredHelpEntryId: string | null = null;
  private helpPageIndex = 0;
  private helpSwipePointerId: number | null = null;
  private helpSwipeStartX = 0;

  constructor(private readonly host: HTMLElement, private readonly i18n: I18nService) {
    this.loadFlags();
    this.loadAnchor();
    this.loadHistory();

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

    this.helpButton = document.createElement('button');
    this.helpButton.type = 'button';
    this.helpButton.className = 'guide-bubble__help-button';
    this.helpButton.setAttribute('aria-label', 'Guide help');
    this.helpButtonIcon = document.createElement('img');
    this.helpButtonIcon.className = 'guide-bubble__help-icon';
    this.helpButtonIcon.alt = '';
    this.helpButton.appendChild(this.helpButtonIcon);

    this.helpSummaryPanel = document.createElement('div');
    this.helpSummaryPanel.className = 'guide-bubble__help-summary';
    this.helpSummaryPanel.hidden = true;

    this.helpSummaryArt = document.createElement('div');
    this.helpSummaryArt.className = 'guide-bubble__help-summary-art';

    this.helpSummaryCopy = document.createElement('div');
    this.helpSummaryCopy.className = 'guide-bubble__help-summary-copy';

    this.helpSummaryTitle = document.createElement('p');
    this.helpSummaryTitle.className = 'guide-bubble__help-summary-title';

    this.helpSummaryBody = document.createElement('p');
    this.helpSummaryBody.className = 'guide-bubble__help-summary-body';

    this.helpSummaryCopy.append(this.helpSummaryBody);
    this.helpSummaryPanel.append(this.helpSummaryArt, this.helpSummaryCopy);

    this.panel = document.createElement('div');
    this.panel.className = 'guide-bubble__panel';

    this.panelArt = document.createElement('div');
    this.panelArt.className = 'guide-bubble__panel-art';

    this.bubbleCopy = document.createElement('div');
    this.bubbleCopy.className = 'guide-bubble__copy';

    this.titleElement = document.createElement('p');
    this.titleElement.className = 'guide-bubble__title';
    this.titleElement.hidden = true;

    this.bodyElement = document.createElement('div');
    this.bodyElement.className = 'guide-bubble__body';

    this.helpOrbit = document.createElement('div');
    this.helpOrbit.className = 'guide-bubble__help-orbit';
    this.helpOrbit.hidden = true;

    this.helpOrbitList = document.createElement('div');
    this.helpOrbitList.className = 'guide-bubble__help-orbit-list';

    this.helpOrbit.append(this.helpOrbitList);
    this.bubbleCopy.append(this.titleElement, this.bodyElement);
    this.panel.append(this.panelArt, this.bubbleCopy);
    this.element.append(this.characterShell, this.helpButton, this.panel, this.helpSummaryPanel, this.helpOrbit);
    this.host.appendChild(this.element);

    this.setAnimation('idle', true);
    this.applyAnimationFrame();
    this.applyVisuals();
    this.bindPointerEvents();
    this.i18n.onChange(() => {
      this.render();
      this.renderHelpOrbit();
      this.renderHelpSummary();
    });
  }

  setPresence(context: GuidePresenceContext) {
    const previousZone = this.currentPresence.zone;
    this.currentPresence = context;
    if (this.helpPanelOpen && previousZone !== context.zone) {
      this.helpEntries = this.buildHelpEntries();
      this.helpPageIndex = 0;
      this.hoveredHelpEntryId = null;
      this.renderHelpOrbit();
      this.applyVisuals();
    }
  }

  setSuspended(suspended: boolean) {
    this.suspended = suspended;
    if (suspended) {
      this.closeHelpCatalogue(false);
    }
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

  trigger(cue: GuideCue, target: GuideTarget | null, options: GuideTriggerOptions = {}) {
    if (this.manuallyDisabled && options.source !== 'history' && options.source !== 'help') {
      return;
    }

    const message = this.buildMessage(cue, target, options);
    if (!message) {
      return;
    }

    this.enqueueMessage(message);
  }

  update(deltaTime: number) {
    const now = performance.now();
    this.advancePlayback(now);

    if (!this.playback && this.queue.length > 0) {
      const nextMessage = this.queue.shift() ?? null;
      if (nextMessage) {
        this.activateMessage(nextMessage, now);
      }
    }

    const progress = this.playback ? this.getPlaybackProgress(this.playback, now) : null;
    const renderSignature = progress ? `${this.playback?.message.id}:${progress.segmentIndex}:${progress.renderSegmentIndex}:${progress.visibleUnitCount}` : 'none';
    if (renderSignature !== this.lastRenderSignature) {
      this.render();
    }

    const desiredVisible =
      !this.suspended &&
      !this.manuallyDisabled &&
      (this.currentPresence.visible || this.playback !== null || this.queue.length > 0 || this.helpPanelOpen);
    if (desiredVisible && !this.visible && this.currentAnimation !== 'arrive') {
      this.visible = true;
      this.setAnimation('arrive', true);
    } else if (!desiredVisible && this.visible && this.currentAnimation !== 'leave') {
      this.setAnimation('leave', true);
    }

    if (desiredVisible && this.currentAnimation !== 'arrive' && this.currentAnimation !== 'leave') {
      if (this.playback) {
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
    this.panelVisible = this.playback !== null && this.visible && !this.suspended && this.dragPointerId === null && !this.manuallyDisabled;
    this.applyVisuals();
  }

  private get currentMessage() {
    return this.playback?.message ?? null;
  }

  private enqueueMessage(message: GuideMessage) {
    const now = performance.now();

    if (this.playback && this.playback.message.id === message.id && message.source === 'auto') {
      this.playback.message = {
        ...this.playback.message,
        target: message.target,
        createdAt: this.playback.message.createdAt
      };
      return;
    }

    const queuedMatchIndex = this.queue.findIndex((entry) => entry.replacementKey === message.replacementKey);
    if (queuedMatchIndex >= 0 && message.queueBehavior === 'replace') {
      this.queue.splice(queuedMatchIndex, 1, message);
    } else if (queuedMatchIndex < 0) {
      this.queue.push(message);
    } else {
      this.queue.push(message);
    }
    this.queue.sort((left, right) => right.priority - left.priority || left.createdAt - right.createdAt);

    if (!this.playback) {
      const nextMessage = this.queue.shift() ?? null;
      if (nextMessage) {
        this.activateMessage(nextMessage, now);
      }
      return;
    }

    const interruptibleIndex = this.queue.findIndex((candidate) => this.canInterruptCurrentMessage(candidate, now));
    if (interruptibleIndex >= 0) {
      const [candidate] = this.queue.splice(interruptibleIndex, 1);
      if (candidate) {
        this.activateMessage(candidate, now);
      }
    }
  }

  private activateMessage(message: GuideMessage, now: number) {
    this.playback = {
      message,
      segmentIndex: 0,
      segmentStartedAt: now,
      startedAt: now
    };
    this.lastRenderSignature = '';
    this.recordHistory(message);
    this.render();
  }

  private finishPlayback(now: number) {
    this.playback = null;
    this.lastRenderSignature = 'none';
    this.render();

    const nextMessage = this.queue.shift() ?? null;
    if (nextMessage) {
      this.activateMessage(nextMessage, now);
    }
  }

  private advancePlayback(now: number) {
    if (!this.playback) {
      return;
    }

    const progress = this.getPlaybackProgress(this.playback, now);
    const interruptibleIndex = this.queue.findIndex((candidate) => this.canInterruptCurrentMessage(candidate, now, progress));
    if (interruptibleIndex >= 0) {
      const [candidate] = this.queue.splice(interruptibleIndex, 1);
      if (candidate) {
        this.activateMessage(candidate, now);
      }
      return;
    }

    if (!progress.segmentComplete) {
      return;
    }

    if (this.playback.segmentIndex < this.playback.message.sequence.segments.length - 1) {
      this.playback.segmentIndex += 1;
      this.playback.segmentStartedAt = now;
      this.lastRenderSignature = '';
      this.render();
      return;
    }

    this.finishPlayback(now);
  }

  private getPlaybackProgress(playback: GuidePlaybackState, now: number): GuidePlaybackProgress {
    const segment = playback.message.sequence.segments[playback.segmentIndex] ?? playback.message.sequence.segments[0];
    const elapsedMs = now - playback.segmentStartedAt;
    const revealComplete = elapsedMs >= segment.revealDurationMs;
    const boundaryReached = elapsedMs >= segment.revealDurationMs + segment.minReadableDurationMs;
    const segmentComplete = elapsedMs >= segment.revealDurationMs + segment.holdDurationMs;

    let renderSegmentIndex = playback.segmentIndex;
    let renderSegment = segment;
    let visibleUnitCount = this.getVisibleUnitCount(segment, elapsedMs, this.i18n.current);

    if (segment.revealMode === 'pause' && playback.segmentIndex > 0) {
      renderSegmentIndex = playback.segmentIndex - 1;
      renderSegment = playback.message.sequence.segments[renderSegmentIndex] ?? segment;
      visibleUnitCount = this.getRenderableUnitCount(renderSegment, this.i18n.current);
    }

    return {
      segment,
      renderSegment,
      segmentIndex: playback.segmentIndex,
      renderSegmentIndex,
      elapsedMs,
      revealComplete,
      boundaryReached,
      segmentComplete,
      visibleUnitCount
    };
  }

  private canInterruptCurrentMessage(candidate: GuideMessage, now: number, progress = this.playback ? this.getPlaybackProgress(this.playback, now) : null) {
    if (!this.playback || !progress) {
      return true;
    }
    if (candidate.critical) {
      return true;
    }
    if (candidate.replacementKey === this.playback.message.replacementKey && candidate.priority >= this.playback.message.priority) {
      return progress.boundaryReached || progress.segment.revealMode === 'pause';
    }
    if (candidate.priority < this.playback.message.priority) {
      return false;
    }

    switch (progress.segment.interruptibility) {
      case 'immediate':
        return true;
      case 'segment-boundary':
        return progress.boundaryReached;
      case 'locked':
        return progress.segmentComplete || candidate.priority >= this.playback.message.priority + 1;
      case 'critical-only':
        return false;
      default:
        return false;
    }
  }

  private buildMessage(cue: GuideCue, target: GuideTarget | null, options: GuideTriggerOptions = {}) {
    const now = performance.now();
    const enqueue = (
      id: string,
      body: LocalizedText,
      config: {
        title?: LocalizedText;
        priority?: number;
        firstTimeKey?: string;
        cooldownKey?: string;
        cooldownMs?: number;
        category?: string;
        replacementKey?: string;
        queueBehavior?: 'replace' | 'stack';
        critical?: boolean;
        replayEligible?: boolean;
        pace?: 'whisper' | 'steady' | 'punchy' | 'dramatic';
        tone?: string;
        emphasisKeywords?: string[];
        impactWords?: string[];
        preferredRevealMode?: GuideRevealMode;
        defaultAnimation?: GuideTextAnimation;
        defaultInterruptibility?: GuideInterruptibility;
      } = {}
    ) => {
      const bypassGuards = options.bypassGuards === true;
      if (!bypassGuards) {
        const firstTimeKey = config.firstTimeKey;
        if (firstTimeKey && this.seenFlags.has(firstTimeKey)) {
          return null;
        }
        const cooldownKey = config.cooldownKey;
        const cooldownUntil = cooldownKey ? this.cooldowns.get(cooldownKey) ?? 0 : 0;
        if (cooldownKey && now < cooldownUntil) {
          return null;
        }
        if (firstTimeKey) {
          this.markSeen(firstTimeKey);
        }
        if (cooldownKey) {
          this.cooldowns.set(cooldownKey, now + (config.cooldownMs ?? 9000));
        }
      }

      const sequence = parseDialogueToSequence(body, {
        idBase: id,
        pace: config.pace ?? (config.priority && config.priority >= 4 ? 'dramatic' : 'steady'),
        tone: config.tone,
        replayEligible: config.replayEligible ?? true,
        emphasisKeywords: config.emphasisKeywords,
        impactWords: config.impactWords,
        preferredRevealMode: config.preferredRevealMode,
        defaultAnimation: config.defaultAnimation,
        defaultInterruptibility: config.defaultInterruptibility ?? (config.priority && config.priority >= 4 ? 'locked' : 'segment-boundary')
      });

      return {
        id,
        priority: config.priority ?? 2,
        title: config.title ?? DEFAULT_SPEAKER_TITLE,
        target,
        createdAt: now,
        sequence,
        category: config.category ?? cue.type,
        contextKey: this.getCueContextKey(cue),
        replacementKey: config.replacementKey ?? id,
        queueBehavior: config.queueBehavior ?? 'replace',
        critical: config.critical ?? false,
        replayEligible: sequence.replayEligible,
        source: options.source ?? 'auto'
      } satisfies GuideMessage;
    };

    switch (cue.type) {
      case 'intro_mirror_0':
        return enqueue('intro-mirror-0', loc('Hmm. en voila en autre !', 'Hmm. there it is again!'), {
          title: loc('Miroir', 'Mirror'),
          priority: 4,
          cooldownKey: 'guide:intro-mirror-stage-0-cooldown',
          cooldownMs: 2400,
          tone: 'callout',
          preferredRevealMode: 'char',
          defaultAnimation: 'static',
          replayEligible: true
        });
      case 'intro_mirror_first_click':
        return enqueue(
          'intro-mirror-first-click',
          loc('Je vois... Tes curieux toi ?', 'I see... you’re a curious one, aren’t you?'),
          {
            title: loc('Miroir', 'Mirror'),
            priority: 4,
            cooldownKey: 'guide:intro-mirror-stage-first-click-cooldown',
            cooldownMs: 2400,
            tone: 'focus',
            preferredRevealMode: 'word',
            defaultAnimation: 'bounce-subtle',
            replayEligible: true
          }
        );
      case 'intro_mirror_50':
        return enqueue(
          'intro-mirror-50',
          loc('Bon, tu ma l’air déterminé, et j’aime ça', 'Alright, you seem determined, and I like that'),
          {
            title: loc('Miroir', 'Mirror'),
            priority: 4,
            cooldownKey: 'guide:intro-mirror-stage-50-cooldown',
            cooldownMs: 2400,
            tone: 'focus',
            preferredRevealMode: 'stagger',
            defaultAnimation: 'hold-breath',
            replayEligible: true
          }
        );
      case 'intro_mirror_100':
        return enqueue(
          'intro-mirror-100',
          loc('Allez c’est décidé, je vais te laisser entrer dans mon monde.', 'Alright, it’s decided, I’ll let you enter my world.'),
          {
            title: loc('Miroir', 'Mirror'),
            priority: 5,
            cooldownKey: 'guide:intro-mirror-stage-100-cooldown',
            cooldownMs: 3200,
            tone: 'exclaim',
            preferredRevealMode: 'impact',
            defaultAnimation: 'punch-in',
            replayEligible: true
          }
        );
      case 'hub_arrival':
        return enqueue(
          'hub-arrival',
          loc(
            'Bienvenue a toi Primate !',
            'Welcome, Primate!'
          ),
          {
            title: loc('Entrée', 'Arrival'),
            priority: 4,
            firstTimeKey: 'guide:hub-arrival',
            tone: 'welcome',
            pace: 'dramatic',
            replayEligible: true
          }
        );
      case 'orbit_hover':
        return enqueue(`orbit-hover:${cue.project.id}`, getOrbitHoverBody(cue.project), {
          title: cue.project.title,
          priority: 2,
          cooldownKey: `guide:orbit-hover-cooldown:${cue.project.id}`,
          cooldownMs: 5600,
          queueBehavior: 'stack',
          replayEligible: false,
          pace: 'punchy'
        });
      case 'portfolio_scroll':
        return enqueue(
          `portfolio-scroll:${cue.project.id}:${cue.direction > 0 ? 'next' : 'prev'}`,
          cue.direction > 0 ? loc(`${cue.project.title.fr}`, `${cue.project.title.en}`) : loc('Euh?', 'Hmm?'),
          {
            title: loc('Profondeur', 'Depth'),
            priority: 3,
            cooldownKey: `guide:portfolio-scroll-cooldown:${cue.project.id}:${cue.direction > 0 ? 'next' : 'prev'}`,
            cooldownMs: 1000,
            queueBehavior: 'stack',
            replayEligible: false,
            preferredRevealMode: cue.direction > 0 ? 'impact' : 'burst',
            defaultAnimation: cue.direction > 0 ? 'punch-in' : 'bounce-subtle',
            impactWords: [cue.project.title.fr, cue.project.title.en]
          }
        );
      case 'focus_enter':
        return enqueue(`focus:${cue.project.id}:${cue.facetIndex}`, getFocusBody(cue.project, cue.facetIndex), {
          title: cue.project.facets[cue.facetIndex]?.categoryLabel ?? cue.project.title,
          priority: 3,
          cooldownKey: `guide:focus-cooldown:${cue.project.id}:${cue.facetIndex}`,
          cooldownMs: 5600,
          replayEligible: true,
          tone: 'focus',
          pace: 'dramatic'
        });
      case 'mirror_reveal':
        return enqueue('mirror-reveal', loc('Oupss.', 'Oupss.'), {
          title: loc('Miroir', 'Mirror'),
          priority: 5,
          cooldownKey: 'guide:mirror-reveal-cooldown',
          cooldownMs: 3000,
          critical: true,
          preferredRevealMode: 'impact',
          defaultAnimation: 'punch-in',
          impactWords: ['oupss', 'oups'],
          replayEligible: true
        });
      case 'drag_first':
        return enqueue('drag-first', loc('T’es un petit malin toi, hein ?', 'You’re a clever one, aren’t you?'), {
          title: loc('Traque', 'Hunt'),
          priority: 4,
          firstTimeKey: 'guide:drag-first',
          tone: 'comic',
          replayEligible: true,
          defaultAnimation: 'wiggle-horizontal'
        });
      case 'slot_placed':
        return enqueue(
          `slot-placed:${cue.project.id}:${cue.remainingSlots}`,
          cue.remainingSlots >= 5
            ? loc('Ohoh... Intéressant hein ?', 'Ohoh... Interesting, huh?')
            : cue.remainingSlots >= 4
              ? loc('Hmmm... Là tu commences à voir ou toujours pas ?', 'Hmmm... Now you’re starting to see, or not yet?')
              : cue.remainingSlots === 3
                ? loc('J’aime les gens curieux comme toi.', 'I like curious people like you.')
                : cue.remainingSlots === 2
                  ? loc('Plus que deux morceaux à replacer.', 'Only two pieces left to place..')
                  : cue.remainingSlots === 1
                    ? loc('Tu y es presque.', 'You’re almost there.')
                    : loc(
                        'Mouhaha, tu n’es pas prêt pour la suite, prépare toi à être prêt... Je veux dire tu vois ce que je veux dire... BON ALLEZ GO !',
                        'Mouhaha, you’re not ready for what’s next, get ready to be ready... I mean you get it... LET’S GO!'
                      ),
          {
            title: loc('Déclic', 'Click'),
            priority: 4,
            queueBehavior: 'stack',
            replayEligible: true,
            pace: cue.remainingSlots === 0 ? 'dramatic' : 'steady',
            impactWords: ['Primate', 'Primaterie', 'Aventure', 'Adventure', 'projet', 'project'],
            defaultAnimation: cue.remainingSlots === 0 ? 'punch-in' : 'static'
          }
        );
      case 'two_slots_left':
        return enqueue('two-slots-left', loc('Plus que deux morceaux. Là, le secret commence à sentir le danger.', 'Two shards left. The secret is starting to smell dangerous.'), {
          title: loc('Fragments', 'Shards'),
          priority: 4,
          replacementKey: 'slot-progress',
          replayEligible: true,
          pace: 'dramatic'
        });
      case 'one_slot_left':
        return enqueue('one-slot-left', loc('Encore un. Respire, vise, et ne fais pas le clown maintenant.', 'Just one more. Breathe, aim, and do not clown around now.'), {
          title: loc('Fragments', 'Shards'),
          priority: 4,
          replacementKey: 'slot-progress',
          replayEligible: true,
          pace: 'dramatic',
          defaultAnimation: 'hold-breath'
        });
      case 'slots_complete':
        return enqueue(
          'slots-complete',
          loc('BOOM. Tout est à sa place. Le passage s’ouvre.', 'BOOM. Everything is back in place. The passage opens.'),
          {
            title: loc('Ouverture', 'Opening'),
            priority: 5,
            critical: true,
            pace: 'dramatic',
            impactWords: ['boom', 'ouverture', 'opens'],
            defaultAnimation: 'punch-in',
            replayEligible: true
          }
        );
      case 'primaterie_arrival':
        return enqueue('primaterie-arrival', loc('Bienvenue dans la Primaterie..', 'Welcome to the Primaterie..'), {
          title: loc('Primaterie', 'Primaterie'),
          priority: 4,
          firstTimeKey: 'guide:primaterie-arrival',
          replayEligible: true,
          pace: 'dramatic'
        });
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
          cooldownKey: `guide:primaterie-hover-cooldown:${cue.item}`,
          cooldownMs: 5600,
          queueBehavior: 'stack',
          replayEligible: true,
          pace: cue.item === 'discord' || cue.item === 'patreon' ? 'dramatic' : 'punchy'
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
            firstTimeKey: 'guide:first-game-over',
            critical: true,
            replayEligible: true,
            pace: 'dramatic',
            impactWords: ['save', 'nom', 'name'],
            defaultAnimation: 'hold-breath'
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
          cooldownKey: `guide:game-over-hover-cooldown:${cue.item}`,
          cooldownMs: 5600,
          queueBehavior: 'stack',
          replayEligible: true,
          pace: cue.item === 'menu' ? 'punchy' : 'steady'
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
          cooldownKey: `guide:avatar-hover-cooldown:${cue.item}`,
          cooldownMs: 5600,
          queueBehavior: 'stack',
          replayEligible: true
        });
      case 'tutorial_hover':
        return enqueue(`tutorial-hover:${cue.item}`, getTutorialHoverBody(cue.item), {
          title: loc('Tutoriel', 'Tutorial'),
          priority: 3,
          cooldownKey: `guide:tutorial-hover-cooldown:${cue.item}`,
          cooldownMs: 5600,
          queueBehavior: 'stack',
          replayEligible: true
        });
      case 'achievements_hover':
        return enqueue(`achievements-hover:${cue.item}`, getAchievementsHoverBody(cue.item), {
          title: loc('Succès', 'Achievements'),
          priority: 3,
          cooldownKey: `guide:achievements-hover-cooldown:${cue.item}`,
          cooldownMs: 5600,
          queueBehavior: 'stack',
          replayEligible: true
        });
      case 'settings_hover':
        return enqueue(`settings-hover:${cue.item}`, getSettingsHoverBody(cue.item), {
          title: loc('Réglages', 'Settings'),
          priority: cue.item === 'entry' ? 4 : 3,
          cooldownKey: `guide:settings-hover-cooldown:${cue.item}`,
          cooldownMs: 5600,
          queueBehavior: 'stack',
          replayEligible: true
        });
      case 'game_control_hint':
        return enqueue(`game-control-hint:${cue.item}`, getGameControlBody(cue.item), {
          title:
            cue.item === 'left'
              ? loc('Gauche', 'Left')
              : cue.item === 'up'
                ? loc('Haut', 'Up')
                : cue.item === 'right'
                  ? loc('Droite', 'Right')
                  : loc('Bas', 'Down'),
          priority: 4,
          firstTimeKey: `guide:game-control-hint:${cue.item}`,
          cooldownKey: `guide:game-control-hint-cooldown:${cue.item}`,
          cooldownMs: 3200,
          replayEligible: true,
          queueBehavior: 'stack',
          pace: cue.item === 'down' ? 'steady' : 'dramatic'
        });
      case 'game_enemy_intro':
        return enqueue(
          'game-enemy-intro',
          loc(
            'Premier ennemi en vue. Si tu arrives dans son dos ou avec assez d’élan, tu le casses. Si tu le manges de face sans plan B, c’est lui qui gagne.',
            'First enemy in sight. Come in from behind or with enough momentum and you break it. Hit it head-on without a backup plan and it wins.'
          ),
          {
            title: loc('Danger', 'Danger'),
            priority: 4,
            firstTimeKey: 'guide:game-enemy-intro',
            replayEligible: true,
            tone: 'combat',
            pace: 'dramatic'
          }
        );
      case 'game_enemy_top_intro':
        return enqueue(
          'game-enemy-top-intro',
          loc(
            'Ceux du haut explosent au contact, même si tu n’es pas posé. Profite de leur trajectoire, puis repars avant la punition.',
            'Top enemies pop on contact even if you are not landed. Use their path, then get out before the punishment catches up.'
          ),
          {
            title: loc('Ennemi haut', 'Top enemy'),
            priority: 4,
            firstTimeKey: 'guide:game-enemy-top-intro',
            replayEligible: true,
            tone: 'combat',
            defaultAnimation: 'punch-in'
          }
        );
      case 'game_enemy_bot_intro':
        return enqueue(
          'game-enemy-bot-intro',
          loc(
            'Ceux du bas sortent tard et repoussent si tu les touches mal. Le grappin peut aussi s’y accrocher quand ils sont visibles.',
            'Bottom enemies rise late and shove you back if you hit them poorly. The grapple can hook onto them once they are visible.'
          ),
          {
            title: loc('Ennemi bas', 'Bottom enemy'),
            priority: 4,
            firstTimeKey: 'guide:game-enemy-bot-intro',
            replayEligible: true,
            tone: 'combat',
            defaultAnimation: 'hold-breath'
          }
        );
      case 'game_question_intro':
        return enqueue(
          'game-question-intro',
          loc(
            'Le point d’interrogation annonce un cadeau flou: récompense aléatoire, rareté, ou autre surprise utile. Approche pour voir ce qu’il cache.',
            'That question mark means a fuzzy gift: random reward, rare loot, or another useful surprise. Move in and see what it hides.'
          ),
          {
            title: loc('Mystère', 'Mystery'),
            priority: 4,
            firstTimeKey: 'guide:game-question-intro',
            replayEligible: true,
            tone: 'comic',
            defaultAnimation: 'delayed-drop'
          }
        );
      case 'game_shop_intro':
        return enqueue(
          'game-shop-intro',
          loc(
            'Shop repéré. C’est là que tu dépenses tes pièces pour t’améliorer. Tu peux acheter direct, ou couper le choix avec le Wrapper si tu veux filer.',
            'Shop spotted. This is where your coins turn into upgrades. Buy directly, or break out with the Wrapper if you want to keep moving.'
          ),
          {
            title: loc('Shop', 'Shop'),
            priority: 4,
            firstTimeKey: 'guide:game-shop-intro',
            replayEligible: true,
            tone: 'help',
            pace: 'dramatic'
          }
        );
      case 'game_milestone_intro':
        return enqueue(
          'game-milestone-intro',
          loc(
            'Une milestone bloque le tempo un instant pour te proposer des améliorations. Pose-toi, lis les branches, puis choisis ce qui pousse ton run.',
            'A milestone pauses the tempo for a moment and offers upgrades. Land, read the branches, then pick what pushes your run forward.'
          ),
          {
            title: loc('Milestone', 'Milestone'),
            priority: 4,
            firstTimeKey: 'guide:game-milestone-intro',
            replayEligible: true,
            tone: 'focus',
            defaultAnimation: 'hold-breath'
          }
        );
      case 'help_topic': {
        const topicCopy = getHelpTopicCopy(cue.topic);
        return enqueue(`help-topic:${cue.topic}`, topicCopy.body, {
          title: topicCopy.title,
          priority: 4,
          replacementKey: `help-topic:${cue.topic}`,
          replayEligible: true,
          pace: 'dramatic',
          tone: 'help',
          defaultAnimation: 'delayed-drop'
        });
      }
    }
  }

  private updatePlacement(deltaTime: number) {
    const viewportWidth = this.host.clientWidth || window.innerWidth;
    const isMobile = viewportWidth <= MOBILE_GUIDE_BREAKPOINT;
    const activeTarget = this.currentMessage?.target ?? this.currentPresence.target;
    const placement = this.manuallyDisabled
      ? null
      : this.currentPresence.zone === 'focus'
        ? this.resolvePlacement(activeTarget ?? this.resolveCursorTarget())
        : activeTarget?.fixedPlacementMode === 'achievements'
          ? this.resolvePlacement(activeTarget ?? this.resolveCursorTarget())
          : isMobile
            ? this.resolveMobilePlacement()
            : this.currentMessage
              ? this.resolveCursorPlacement(activeTarget)
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
    this.currentPanelBubbleX = placement.bubbleX;
    this.currentPanelBubbleY = placement.bubbleY;

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
    const minCharacterLeft = VIEWPORT_MARGIN;
    const maxCharacterLeft = Math.max(minCharacterLeft, viewportWidth - characterSize - VIEWPORT_MARGIN);
    const minCharacterTop = VIEWPORT_MARGIN;
    const maxCharacterTop = Math.max(minCharacterTop, viewportHeight - characterSize - VIEWPORT_MARGIN);
    const availableWidth = Math.max(1, maxCharacterLeft - minCharacterLeft);
    const availableHeight = Math.max(1, maxCharacterTop - minCharacterTop);
    const characterLeft = clamp(minCharacterLeft + this.anchor.x * availableWidth, minCharacterLeft, maxCharacterLeft);
    const characterTop = clamp(minCharacterTop + this.anchor.y * availableHeight, minCharacterTop, maxCharacterTop);
    return this.buildUnifiedPlacement({
      characterLeft,
      characterTop,
      characterSize,
      panelWidth,
      panelHeight,
      viewportWidth,
      viewportHeight,
      characterFlipX: false
    });
  }

  private resolveMobilePlacement(): GuidePlacement {
    const viewportWidth = this.host.clientWidth || window.innerWidth;
    const viewportHeight = this.host.clientHeight || window.innerHeight;
    const characterSize = clamp(Math.min(viewportWidth * 0.18, viewportHeight * 0.14), 62, 86);
    const panelWidth = clamp(Math.min(viewportWidth * 0.54, 232), 168, 228);
    const panelHeight = panelWidth / GUIDE_PANEL_ASPECT_RATIO;
    const characterLeft = VIEWPORT_MARGIN + 6;
    const characterTop = VIEWPORT_MARGIN + 8;
    return this.buildUnifiedPlacement({
      characterLeft,
      characterTop,
      characterSize,
      panelWidth,
      panelHeight,
      viewportWidth,
      viewportHeight,
      forceBubbleX: 'right',
      forceBubbleY: 'below',
      characterFlipX: true
    });
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
    const targetRect = target ? expandRect(buildRectFromTarget(target), 12) : null;
    const shouldFlip = target ? target.x <= viewportWidth * 0.42 : this.cursorX < viewportWidth * 0.34;
    const guideLeft = targetRect
      ? shouldFlip
        ? targetRect.right + TARGET_GAP
        : targetRect.left - characterSize - TARGET_GAP
      : this.cursorX + (shouldFlip ? GUIDE_CURSOR_OFFSET_X : -characterSize - GUIDE_CURSOR_OFFSET_X);
    const guideTop = targetRect ? targetRect.bottom + TARGET_GAP : this.cursorY + GUIDE_CURSOR_OFFSET_Y;
    const guideLeftClamped = clamp(guideLeft, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportWidth - characterSize - VIEWPORT_MARGIN));
    const guideTopClamped = clamp(guideTop, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportHeight - characterSize - VIEWPORT_MARGIN));
    return this.buildUnifiedPlacement({
      characterLeft: guideLeftClamped,
      characterTop: guideTopClamped,
      characterSize,
      panelWidth,
      panelHeight,
      viewportWidth,
      viewportHeight,
      target,
      characterFlipX: shouldFlip
    });
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
      const focusCharacterLeft = clamp(
        isMobile ? 20 : 28,
        VIEWPORT_MARGIN,
        Math.max(VIEWPORT_MARGIN, viewportWidth - focusCharacterSize - VIEWPORT_MARGIN)
      );
      const focusCharacterTop = clamp(
        viewportHeight - focusCharacterSize - (isMobile ? 18 : 26),
        VIEWPORT_MARGIN,
        Math.max(VIEWPORT_MARGIN, viewportHeight - focusCharacterSize - VIEWPORT_MARGIN)
      );

      return this.buildUnifiedPlacement({
        characterLeft: focusCharacterLeft,
        characterTop: focusCharacterTop,
        characterSize: focusCharacterSize,
        panelWidth: focusPanelWidth,
        panelHeight: focusPanelHeight,
        viewportWidth,
        viewportHeight,
        forceBubbleX: 'right',
        forceBubbleY: 'above',
        characterFlipX: false,
        target
      });
    }
    if (this.currentPresence.zone === 'intro') {
      return this.buildUnifiedPlacement({
        characterLeft: clamp(viewportWidth * 0.22, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportWidth - characterSize - VIEWPORT_MARGIN)),
        characterTop: clamp(viewportHeight * 0.26, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportHeight - characterSize - VIEWPORT_MARGIN)),
        characterSize,
        panelWidth,
        panelHeight,
        viewportWidth,
        viewportHeight,
        forceBubbleX: 'left',
        forceBubbleY: 'above',
        characterFlipX: false
      });
    }

    const targetRect = expandRect(buildRectFromTarget(target), isMobile ? 12 : 18);
    const preferredLeft = targetRect.left - characterSize - TARGET_GAP;
    const fallbackRight = targetRect.right + TARGET_GAP;
    const preferredTop = targetRect.bottom + TARGET_GAP;
    const fallbackTop = targetRect.top - characterSize - TARGET_GAP;
    const hasLeftRoom = preferredLeft >= VIEWPORT_MARGIN;
    const hasBottomRoom = preferredTop + characterSize <= viewportHeight - VIEWPORT_MARGIN;

    return this.buildUnifiedPlacement({
      characterLeft: hasLeftRoom ? preferredLeft : fallbackRight,
      characterTop: hasBottomRoom ? preferredTop : fallbackTop,
      characterSize,
      panelWidth,
      panelHeight,
      viewportWidth,
      viewportHeight,
      target,
      characterFlipX: target.flipGuideX ?? !hasLeftRoom
    });
  }

  private buildUnifiedPlacement(options: {
    characterLeft: number;
    characterTop: number;
    characterSize: number;
    panelWidth: number;
    panelHeight: number;
    viewportWidth: number;
    viewportHeight: number;
    target?: GuideTarget | null;
    forceBubbleX?: 'left' | 'right';
    forceBubbleY?: 'above' | 'below';
    characterFlipX?: boolean;
  }): GuidePlacement {
    const {
      characterLeft: initialCharacterLeft,
      characterTop: initialCharacterTop,
      characterSize,
      panelWidth,
      panelHeight,
      viewportWidth,
      viewportHeight,
      target = null,
      forceBubbleX,
      forceBubbleY,
      characterFlipX = false
    } = options;

    let characterLeft = clamp(initialCharacterLeft, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportWidth - characterSize - VIEWPORT_MARGIN));
    let characterTop = clamp(initialCharacterTop, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportHeight - characterSize - VIEWPORT_MARGIN));
    const centerX = characterLeft + characterSize * 0.5;
    const centerY = characterTop + characterSize * 0.5;
    const leftEdge = centerX <= viewportWidth * GUIDE_EDGE_ZONE;
    const rightEdge = centerX >= viewportWidth * (1 - GUIDE_EDGE_ZONE);
    const topEdge = centerY <= viewportHeight * GUIDE_EDGE_ZONE;
    const bottomEdge = centerY >= viewportHeight * (1 - GUIDE_EDGE_ZONE);

    const bubbleX = forceBubbleX ?? (leftEdge ? 'right' : rightEdge ? 'left' : 'left');
    const bubbleY = forceBubbleY ?? (topEdge ? 'below' : bottomEdge ? 'above' : 'above');

    const dockX = characterLeft + (bubbleX === 'left' ? characterSize * 0.78 : characterSize * 0.22);
    const dockY = characterTop + (bubbleY === 'above' ? characterSize * 0.34 : characterSize * 0.68);
    let panelLeft = bubbleX === 'left' ? dockX - panelWidth - GUIDE_BUBBLE_GAP_X : dockX + GUIDE_BUBBLE_GAP_X;
    let panelTop = bubbleY === 'above' ? dockY - panelHeight - GUIDE_BUBBLE_GAP_Y : dockY + GUIDE_BUBBLE_GAP_Y;

    if (target) {
      const targetRect = expandRect(buildRectFromTarget(target), 12);
      let pairRect = buildRect(
        Math.min(characterLeft, panelLeft),
        Math.min(characterTop, panelTop),
        Math.max(characterLeft + characterSize, panelLeft + panelWidth) - Math.min(characterLeft, panelLeft),
        Math.max(characterTop + characterSize, panelTop + panelHeight) - Math.min(characterTop, panelTop)
      );
      if (rectsOverlap(pairRect, targetRect)) {
        const shiftX = bubbleX === 'left' ? targetRect.right - pairRect.left + TARGET_GAP : targetRect.left - pairRect.right - TARGET_GAP;
        if (Math.abs(shiftX) > 0.5) {
          characterLeft += shiftX;
          panelLeft += shiftX;
        }
        pairRect = buildRect(
          Math.min(characterLeft, panelLeft),
          Math.min(characterTop, panelTop),
          Math.max(characterLeft + characterSize, panelLeft + panelWidth) - Math.min(characterLeft, panelLeft),
          Math.max(characterTop + characterSize, panelTop + panelHeight) - Math.min(characterTop, panelTop)
        );
        if (rectsOverlap(pairRect, targetRect)) {
          const shiftY = bubbleY === 'above' ? targetRect.bottom - pairRect.top + TARGET_GAP : targetRect.top - pairRect.bottom - TARGET_GAP;
          characterTop += shiftY;
          panelTop += shiftY;
        }
      }
    }

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

    return {
      characterLeft,
      characterTop,
      characterSize,
      characterFlipX,
      panelLeft,
      panelTop,
      panelWidth,
      panelHeight,
      flipX: bubbleX === 'left',
      flipY: bubbleY === 'below',
      bubbleX,
      bubbleY
    };
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
        this.setAnimation(this.playback ? 'talk_hold' : 'idle', true);
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
          this.setAnimation(this.playback ? 'talk_hold' : 'idle', true);
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
    const bubbleThemeMode = this.getBubbleThemeMode();
    const textContrastMode = this.getTextContrastMode(bubbleThemeMode);
    const impactWordColorMode = this.getImpactWordColorMode(bubbleThemeMode);
    const punctuationAccentMode = this.getPunctuationAccentMode();
    this.element.setAttribute('data-visible', String(showCharacter));
    this.element.setAttribute('data-disabled', String(this.manuallyDisabled));
    this.element.setAttribute('data-help-open', String(this.helpPanelOpen));
    this.element.setAttribute('data-bubble-theme-mode', bubbleThemeMode);
    this.element.setAttribute('data-text-contrast-mode', textContrastMode);
    this.element.setAttribute('data-impact-word-color-mode', impactWordColorMode);
    this.element.setAttribute('data-punctuation-accent-mode', punctuationAccentMode);
    this.element.setAttribute('aria-hidden', String(!showCharacter));
    this.element.setAttribute('data-panel-visible', String(this.panelVisible));
    this.element.setAttribute('data-zone', this.currentPresence.zone);
    this.panel.setAttribute('data-visible', String(this.panelVisible));
    this.panel.setAttribute('data-bubble-x', this.currentPanelBubbleX);
    this.panel.setAttribute('data-bubble-y', this.currentPanelBubbleY);
    this.bodyElement.setAttribute('data-text-contrast-mode', textContrastMode);
    this.bodyElement.setAttribute('data-impact-word-color-mode', impactWordColorMode);
    this.bodyElement.setAttribute('data-punctuation-accent-mode', punctuationAccentMode);

    this.characterShell.style.transform = `translate3d(${this.currentCharacterLeft.toFixed(2)}px, ${this.currentCharacterTop.toFixed(2)}px, 0) scaleX(${this.currentCharacterFlipX ? -1 : 1})`;
    this.characterShell.style.width = `${this.currentCharacterSize.toFixed(2)}px`;
    this.characterShell.style.height = `${this.currentCharacterSize.toFixed(2)}px`;
    this.panel.style.transform = `translate3d(${this.currentPanelLeft.toFixed(2)}px, ${this.currentPanelTop.toFixed(2)}px, 0)`;
    this.panel.style.width = `${this.currentPanelWidth.toFixed(2)}px`;
    this.panel.style.height = `${this.currentPanelHeight.toFixed(2)}px`;
    this.panelArt.style.transform = `scale(${this.currentPanelFlipX ? -1 : 1}, ${this.currentPanelFlipY ? -1 : 1})`;

    const safeArea = this.resolveSafeAreaPreset();
    this.bubbleCopy.style.setProperty('--guide-safe-top', `${(safeArea.top * 100).toFixed(2)}%`);
    this.bubbleCopy.style.setProperty('--guide-safe-right', `${(safeArea.right * 100).toFixed(2)}%`);
    this.bubbleCopy.style.setProperty('--guide-safe-bottom', `${(safeArea.bottom * 100).toFixed(2)}%`);
    this.bubbleCopy.style.setProperty('--guide-safe-left', `${(safeArea.left * 100).toFixed(2)}%`);
    if (this.lastRenderedSegmentKey) {
      this.applyTokenFit(this.lastRenderedSegmentKey);
    }

    const helpVisible = showCharacter && !this.manuallyDisabled && !this.suspended;
    this.helpButton.hidden = !helpVisible;
    this.helpButton.setAttribute('aria-label', this.i18n.current === 'fr' ? 'Aide du guide' : 'Guide help');
    if (helpVisible) {
      const helpLeft = this.currentCharacterLeft + this.currentCharacterSize * (this.currentCharacterFlipX ? 0.08 : 0.82);
      const helpTop = this.currentCharacterTop + this.currentCharacterSize * 0.02;
      this.helpButton.style.transform = `translate3d(${helpLeft.toFixed(2)}px, ${helpTop.toFixed(2)}px, 0)`;
      const inverseTheme = resolveDocumentTheme() === 'dark' ? 'light' : 'dark';
      const helpIconSrc = HELP_ICON_ASSETS[inverseTheme];
      if (this.helpButtonIcon.src !== helpIconSrc) {
        this.helpButtonIcon.src = helpIconSrc;
      }
    }

    this.helpSummaryPanel.hidden = !this.helpPanelOpen || !helpVisible;
    if (this.helpPanelOpen && helpVisible) {
      const summaryPlacement = this.resolveHelpSummaryPlacement();
      this.helpSummaryPanel.style.transform = `translate3d(${summaryPlacement.left.toFixed(2)}px, ${summaryPlacement.top.toFixed(2)}px, 0)`;
      this.helpSummaryPanel.style.width = `${summaryPlacement.width.toFixed(2)}px`;
      this.helpSummaryPanel.style.height = `${summaryPlacement.height.toFixed(2)}px`;
      this.helpSummaryPanel.setAttribute('data-bubble-x', summaryPlacement.bubbleX);
      this.helpSummaryPanel.setAttribute('data-bubble-y', summaryPlacement.bubbleY);
      this.helpSummaryArt.style.transform = `scale(${summaryPlacement.flipX ? -1 : 1}, ${summaryPlacement.flipY ? -1 : 1})`;
      this.helpSummaryCopy.style.setProperty('--guide-help-safe-top', `${(GUIDE_HELP_SUMMARY_SAFE_AREA.top * 100).toFixed(2)}%`);
      this.helpSummaryCopy.style.setProperty('--guide-help-safe-right', `${(GUIDE_HELP_SUMMARY_SAFE_AREA.right * 100).toFixed(2)}%`);
      this.helpSummaryCopy.style.setProperty('--guide-help-safe-bottom', `${(GUIDE_HELP_SUMMARY_SAFE_AREA.bottom * 100).toFixed(2)}%`);
      this.helpSummaryCopy.style.setProperty('--guide-help-safe-left', `${(GUIDE_HELP_SUMMARY_SAFE_AREA.left * 100).toFixed(2)}%`);
    }

    this.helpOrbit.hidden = !this.helpPanelOpen || !helpVisible;
    if (this.helpPanelOpen && helpVisible) {
      this.positionHelpOrbit();
    }

    if (this.manuallyDisabled) {
      this.characterElement.style.backgroundImage = `url("${GUIDE_SPRITES.constant}")`;
      this.characterElement.style.backgroundSize = '100% 100%';
      this.characterElement.style.backgroundPosition = '50% 50%';
    } else {
      this.characterElement.style.backgroundSize = '500% 100%';
    }
  }

  private resolveSafeAreaPreset() {
    if (this.currentPresence.zone === 'focus') {
      return GUIDE_SAFE_AREAS.focus;
    }
    const key = `${this.currentPanelBubbleX}-${this.currentPanelBubbleY}` as keyof typeof GUIDE_SAFE_AREAS;
    return GUIDE_SAFE_AREAS[key] ?? GUIDE_SAFE_AREAS['left-above'];
  }

  private getBubbleThemeMode(): GuideBubbleThemeMode {
    return resolveDocumentTheme() === 'dark' ? 'light-bubble' : 'dark-bubble';
  }

  private getTextContrastMode(bubbleThemeMode: GuideBubbleThemeMode): GuideTextContrastMode {
    return bubbleThemeMode === 'dark-bubble' ? 'ink-light' : 'ink-dark';
  }

  private getImpactWordColorMode(bubbleThemeMode: GuideBubbleThemeMode): GuideImpactWordColorMode {
    return bubbleThemeMode === 'dark-bubble' ? 'mirror-light' : 'mirror-dark';
  }

  private getPunctuationAccentMode(): GuidePunctuationAccentMode {
    return 'accent-cycle';
  }

  private positionHelpOrbit() {
    const viewportWidth = this.host.clientWidth || window.innerWidth;
    const viewportHeight = this.host.clientHeight || window.innerHeight;
    const centerX = this.currentCharacterLeft + this.currentCharacterSize * 0.5;
    const centerY = this.currentCharacterTop + this.currentCharacterSize * 0.48;
    const maxOrbitRadius = Math.min(138, Math.max(90, viewportWidth * 0.12));
    const orbitLeft = clamp(centerX, VIEWPORT_MARGIN + maxOrbitRadius, viewportWidth - VIEWPORT_MARGIN - maxOrbitRadius);
    const orbitTop = clamp(centerY, VIEWPORT_MARGIN + maxOrbitRadius, viewportHeight - VIEWPORT_MARGIN - maxOrbitRadius);
    this.helpOrbit.style.transform = `translate3d(${orbitLeft.toFixed(2)}px, ${orbitTop.toFixed(2)}px, 0)`;
  }

  private resolveHelpSummaryPlacement(): GuideHelpBubblePlacement {
    const viewportWidth = this.host.clientWidth || window.innerWidth;
    const viewportHeight = this.host.clientHeight || window.innerHeight;
    const width = clamp(Math.min(viewportWidth * 0.24, GUIDE_HELP_SUMMARY_WIDTH), 184, 228);
    const height = width / GUIDE_PANEL_ASPECT_RATIO;
    const panelRect = this.panelVisible
      ? expandRect(buildRect(this.currentPanelLeft, this.currentPanelTop, this.currentPanelWidth, this.currentPanelHeight), 10)
      : null;

    const candidates = [
      {
        left: this.currentCharacterLeft - width * 0.78,
        top: this.currentCharacterTop - height * 0.82,
        bubbleX: 'left' as const,
        bubbleY: 'above' as const
      },
      {
        left: this.currentCharacterLeft + this.currentCharacterSize * 0.42,
        top: this.currentCharacterTop - height * 0.8,
        bubbleX: 'right' as const,
        bubbleY: 'above' as const
      },
      {
        left: this.currentCharacterLeft - width * 0.72,
        top: this.currentCharacterTop + this.currentCharacterSize * 0.56,
        bubbleX: 'left' as const,
        bubbleY: 'below' as const
      },
      {
        left: this.currentCharacterLeft + this.currentCharacterSize * 0.44,
        top: this.currentCharacterTop + this.currentCharacterSize * 0.6,
        bubbleX: 'right' as const,
        bubbleY: 'below' as const
      }
    ];

    let bestPlacement: GuideHelpBubblePlacement | null = null;
    let bestPenalty = Number.POSITIVE_INFINITY;

    candidates.forEach((candidate) => {
      const clampedLeft = clamp(candidate.left, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportWidth - width - VIEWPORT_MARGIN));
      const clampedTop = clamp(candidate.top, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportHeight - height - VIEWPORT_MARGIN));
      const rect = buildRect(clampedLeft, clampedTop, width, height);
      let penalty = Math.abs(clampedLeft - candidate.left) + Math.abs(clampedTop - candidate.top);
      if (panelRect && rectsOverlap(expandRect(rect, 6), panelRect)) {
        penalty += 420;
      }

      if (penalty < bestPenalty) {
        bestPenalty = penalty;
        bestPlacement = {
          left: clampedLeft,
          top: clampedTop,
          width,
          height,
          flipX: candidate.bubbleX === 'left',
          flipY: candidate.bubbleY === 'below',
          bubbleX: candidate.bubbleX,
          bubbleY: candidate.bubbleY
        };
      }
    });

    return (
      bestPlacement ?? {
        left: clamp(this.currentCharacterLeft - width * 0.78, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportWidth - width - VIEWPORT_MARGIN)),
        top: clamp(this.currentCharacterTop - height * 0.82, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewportHeight - height - VIEWPORT_MARGIN)),
        width,
        height,
        flipX: true,
        flipY: false,
        bubbleX: 'left',
        bubbleY: 'above'
      }
    );
  }

  private render() {
    const playback = this.playback;
    if (!playback) {
      this.lastRenderSignature = 'none';
      this.lastRenderedSegmentKey = null;
      this.renderedSegmentElement = null;
      this.lastTokenFitSignature = '';
      this.lastSegmentFitSignature = '';
      this.renderedTokenRefs = [];
      this.titleElement.textContent = '';
      this.bodyElement.replaceChildren();
      this.bodyElement.removeAttribute('data-tone');
      this.bodyElement.removeAttribute('data-animation');
      return;
    }

    const progress = this.getPlaybackProgress(playback, performance.now());
    const segment = progress.renderSegment;
    const language = this.i18n.current;
    const signature = `${playback.message.id}:${progress.segmentIndex}:${progress.renderSegmentIndex}:${progress.visibleUnitCount}`;
    this.lastRenderSignature = signature;

    this.titleElement.textContent = playback.message.title[language];
    this.bodyElement.setAttribute('data-tone', segment.tone ?? 'neutral');
    this.bodyElement.setAttribute('data-animation', segment.animation);
    this.bodyElement.style.fontSize = this.getSegmentFontSize(segment, language);
    const segmentKey = `${playback.message.id}:${progress.renderSegmentIndex}:${language}`;
    const tokens = segment.tokens[language];
    this.ensureSegmentDom(segmentKey, segment, tokens);

    const renderMode = segment.revealMode;
    const wordVisibleCount = this.getVisibleWordCount(segment, progress.visibleUnitCount, language);
    let visibleWordBudget = wordVisibleCount;
    let visibleCharacterBudget = progress.visibleUnitCount;
    let previousWordVisible = false;

    this.renderedTokenRefs.forEach(({ token, element, ink }) => {
      const tokenState = this.getTokenRenderState(token, renderMode, visibleWordBudget, visibleCharacterBudget, previousWordVisible);
      if (!GUIDE_TOKEN_PUNCTUATION_RE.test(token.text) && tokenState.visibleWordConsumed) {
        visibleWordBudget -= 1;
      }
      if (renderMode === 'char' && tokenState.visibleCharacterConsumed > 0) {
        visibleCharacterBudget -= tokenState.visibleCharacterConsumed;
      }
      if (!GUIDE_TOKEN_PUNCTUATION_RE.test(token.text)) {
        previousWordVisible = tokenState.revealed;
      }
      element.setAttribute('data-visible', String(tokenState.revealed));
      ink.textContent = tokenState.text;
    });
  }

  private ensureSegmentDom(segmentKey: string, segment: GuideSegment, tokens: GuideToken[]) {
    if (this.lastRenderedSegmentKey === segmentKey) {
      return;
    }

    const segmentElement = document.createElement('div');
    segmentElement.className = 'guide-bubble__segment';
    segmentElement.setAttribute('data-tone', segment.tone ?? 'neutral');
    segmentElement.setAttribute('data-emphasis', segment.emphasis);
    segmentElement.setAttribute('data-animation', segment.animation);
    segmentElement.style.setProperty('--guide-segment-scale', String(segment.scaleMultiplier ?? 1));

    this.renderedTokenRefs = tokens.map((token, tokenIndex) => this.buildTokenElement(token, tokenIndex > 0 && !token.joinLeft));
    this.renderedTokenRefs.forEach(({ element }) => segmentElement.appendChild(element));
    this.bodyElement.replaceChildren(segmentElement);
    this.renderedSegmentElement = segmentElement;
    this.lastRenderedSegmentKey = segmentKey;
    this.lastTokenFitSignature = '';
    this.lastSegmentFitSignature = '';
    this.applyTokenFit(segmentKey);
  }

  private buildTokenElement(token: GuideToken, spaced: boolean): GuideTokenRenderRef {
    const tokenElement = document.createElement('span');
    tokenElement.className = 'guide-bubble__token';
    tokenElement.dataset.tokenText = token.text;
    tokenElement.setAttribute('data-kind', token.kind);
    tokenElement.setAttribute('data-accent-mode', token.accentMode);
    if (token.punctuationKind) {
      tokenElement.setAttribute('data-punctuation-kind', token.punctuationKind);
    }
    tokenElement.setAttribute('data-emphasis', token.emphasis);
    tokenElement.setAttribute('data-animation', token.animation);
    tokenElement.setAttribute('data-visible', 'false');
    tokenElement.style.setProperty('--guide-token-scale', String(token.scaleMultiplier ?? 1));
    if (token.joinLeft) {
      tokenElement.classList.add('guide-bubble__token--join-left');
    } else if (spaced) {
      tokenElement.classList.add('guide-bubble__token--spaced');
    }
    if (token.joinRight) {
      tokenElement.classList.add('guide-bubble__token--join-right');
    }

    const ghost = document.createElement('span');
    ghost.className = 'guide-bubble__token-ghost';
    ghost.textContent = token.text;

    const ink = document.createElement('span');
    ink.className = 'guide-bubble__token-ink';
    ink.textContent = '';

    tokenElement.append(ghost, ink);
    return {
      token,
      element: tokenElement,
      ink
    };
  }

  private applyTokenFit(segmentKey: string) {
    const safeRect = this.bodyElement.getBoundingClientRect();
    const safeWidth = safeRect.width;
    if (!safeWidth || !safeRect.height || !this.renderedSegmentElement) {
      return;
    }

    const fitSignature = `${segmentKey}:${Math.round(safeRect.width)}:${Math.round(safeRect.height)}`;
    if (this.lastTokenFitSignature === fitSignature) {
      return;
    }
    this.lastTokenFitSignature = fitSignature;

    const maxTokenWidth = safeWidth * 0.84;
    this.renderedTokenRefs.forEach(({ token, element }) => {
      element.style.removeProperty('--guide-fit-scale');
      element.removeAttribute('data-fit');
      if (!token.fitEligible) {
        return;
      }
      const tokenWidth = element.getBoundingClientRect().width;
      if (!tokenWidth || tokenWidth <= maxTokenWidth) {
        return;
      }
      const fitScale = clamp(maxTokenWidth / tokenWidth, 0.46, 1);
      element.style.setProperty('--guide-fit-scale', fitScale.toFixed(3));
      element.setAttribute('data-fit', fitScale < 0.74 ? 'tight' : 'reduced');
    });
    this.applySegmentFit(segmentKey, safeRect);
  }

  private applySegmentFit(segmentKey: string, safeRect = this.bodyElement.getBoundingClientRect()) {
    if (!this.renderedSegmentElement || !safeRect.width || !safeRect.height) {
      return;
    }

    const fitSignature = `${segmentKey}:${Math.round(safeRect.width)}:${Math.round(safeRect.height)}`;
    if (this.lastSegmentFitSignature === fitSignature) {
      return;
    }
    this.lastSegmentFitSignature = fitSignature;
    this.renderedSegmentElement.style.removeProperty('--guide-segment-fit-scale');

    let fitScale = 1;
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const segmentRect = this.renderedSegmentElement.getBoundingClientRect();
      if (!segmentRect.width || !segmentRect.height) {
        break;
      }
      const widthScale = Math.min(1, (safeRect.width * 0.955) / segmentRect.width);
      const heightScale = Math.min(1, (safeRect.height * 0.94) / segmentRect.height);
      const nextScale = Math.min(widthScale, heightScale);
      if (nextScale >= 0.995) {
        break;
      }
      fitScale = clamp(fitScale * nextScale, 0.48, 1);
      this.renderedSegmentElement.style.setProperty('--guide-segment-fit-scale', fitScale.toFixed(3));
    }
  }

  private getTokenRenderState(
    token: GuideToken,
    renderMode: GuideRevealMode,
    visibleWordBudget: number,
    visibleCharacterBudget: number,
    previousWordVisible: boolean
  ) {
    const isPunctuation = GUIDE_TOKEN_PUNCTUATION_RE.test(token.text);
    if (renderMode === 'pause') {
      return { text: token.text, revealed: true, visibleWordConsumed: false, visibleCharacterConsumed: 0 };
    }
    if (renderMode === 'char') {
      if (isPunctuation) {
        const charCount = Array.from(token.text).length;
        const revealed = previousWordVisible && visibleCharacterBudget >= charCount;
        return {
          text: revealed ? token.text : '',
          revealed,
          visibleWordConsumed: false,
          visibleCharacterConsumed: revealed ? charCount : 0
        };
      }
      const characters = Array.from(token.text);
      const visibleChars = clamp(visibleCharacterBudget, 0, characters.length);
      return {
        text: characters.slice(0, visibleChars).join(''),
        revealed: visibleChars > 0,
        visibleWordConsumed: false,
        visibleCharacterConsumed: visibleChars
      };
    }
    if (isPunctuation) {
      return {
        text: previousWordVisible ? token.text : '',
        revealed: previousWordVisible,
        visibleWordConsumed: false,
        visibleCharacterConsumed: 0
      };
    }

    const revealed = visibleWordBudget > 0;
    return {
      text: revealed ? token.text : '',
      revealed,
      visibleWordConsumed: revealed,
      visibleCharacterConsumed: 0
    };
  }

  private getVisibleUnitCount(segment: GuideSegment, elapsedMs: number, language: Language) {
    const rawProgress = clamp(elapsedMs / Math.max(1, segment.revealDurationMs), 0, 1);
    const progress = segment.revealMode === 'char' ? this.easeRevealProgress(rawProgress) : rawProgress;
    const maxUnits = this.getRenderableUnitCount(segment, language);

    switch (segment.revealMode) {
      case 'pause':
        return 0;
      case 'impact':
        return progress >= 0.92 ? maxUnits : 0;
      case 'burst': {
        const totalWords = this.getWordCount(segment, language);
        const burstSize = Math.max(1, Math.ceil(totalWords / 2));
        const steps = Math.ceil(totalWords / burstSize);
        const visibleBursts = clamp(Math.ceil(progress * steps), 0, steps);
        return Math.min(totalWords, visibleBursts * burstSize);
      }
      case 'stagger':
      case 'word':
        return Math.ceil(progress * this.getWordCount(segment, language));
      case 'char':
      default:
        return progress >= 1 ? maxUnits : Math.floor(progress * maxUnits);
    }
  }

  private easeRevealProgress(progress: number) {
    return 1 - Math.pow(1 - progress, 1.26);
  }

  private getRenderableUnitCount(segment: GuideSegment, language: Language) {
    if (segment.revealMode === 'char') {
      return segment.tokens[language].reduce((total, token) => total + Array.from(token.text).length, 0);
    }
    return this.getWordCount(segment, language);
  }

  private getWordCount(segment: GuideSegment, language: Language) {
    return segment.tokens[language].filter((token) => !GUIDE_TOKEN_PUNCTUATION_RE.test(token.text)).length;
  }

  private getVisibleWordCount(segment: GuideSegment, visibleUnitCount: number, language: Language) {
    if (segment.revealMode === 'char') {
      return this.getWordCountFromCharacters(segment.tokens[language], visibleUnitCount);
    }
    return visibleUnitCount;
  }

  private getWordCountFromCharacters(tokens: GuideToken[], visibleCharacterBudget: number) {
    let remaining = visibleCharacterBudget;
    let visibleWords = 0;

    tokens.forEach((token) => {
      if (GUIDE_TOKEN_PUNCTUATION_RE.test(token.text)) {
        if (remaining >= Array.from(token.text).length) {
          remaining -= Array.from(token.text).length;
        }
        return;
      }
      const charCount = Array.from(token.text).length;
      if (remaining <= 0) {
        return;
      }
      visibleWords += 1;
      remaining -= Math.min(remaining, charCount);
    });

    return visibleWords;
  }

  private getSegmentFontSize(segment: GuideSegment, language: Language) {
    const tokens = segment.tokens[language].filter((token) => !GUIDE_TOKEN_PUNCTUATION_RE.test(token.text));
    const wordCount = Math.max(1, tokens.length);
    const longestToken = tokens.reduce((longest, token) => Math.max(longest, token.text.length), 0);
    const emphasisBoost = segment.emphasis === 'impact' ? 0.12 : segment.emphasis === 'strong' ? 0.08 : 0.04;
    const density = wordCount * 0.52 + longestToken * 0.18;

    if (density <= 4.5) {
      return `clamp(${(1.44 + emphasisBoost).toFixed(2)}rem, 3.6vw, ${(2.18 + emphasisBoost).toFixed(2)}rem)`;
    }
    if (density <= 7) {
      return `clamp(${(1.22 + emphasisBoost).toFixed(2)}rem, 2.9vw, ${(1.84 + emphasisBoost).toFixed(2)}rem)`;
    }
    if (density <= 10) {
      return `clamp(${(1.06 + emphasisBoost).toFixed(2)}rem, 2.2vw, ${(1.46 + emphasisBoost).toFixed(2)}rem)`;
    }
    return `clamp(${(0.92 + emphasisBoost * 0.5).toFixed(2)}rem, 1.72vw, ${(1.22 + emphasisBoost * 0.45).toFixed(2)}rem)`;
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

  private loadHistory() {
    try {
      const raw = window.sessionStorage.getItem(GUIDE_HISTORY_STORAGE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as GuideHistoryEntry[];
      if (!Array.isArray(parsed)) {
        return;
      }
      parsed.forEach((entry) => {
        if (typeof entry?.id === 'string' && entry.sequence && entry.label && entry.description) {
          this.history.push(entry);
        }
      });
    } catch {
      this.history.length = 0;
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

  private saveHistory() {
    try {
      window.sessionStorage.setItem(GUIDE_HISTORY_STORAGE_KEY, JSON.stringify(this.history.slice(0, GUIDE_HISTORY_LIMIT)));
    } catch {
      // Session persistence is best-effort only.
    }
  }

  private recordHistory(message: GuideMessage) {
    if (!message.replayEligible) {
      return;
    }

    const existingIndex = this.history.findIndex((entry) => entry.messageId === message.id);
    const label = this.buildHistoryLabel(message);
    const description = message.sequence.text;
    const firstDiscovery = existingIndex < 0;
    const entry: GuideHistoryEntry = {
      id: `${message.id}:${Date.now()}`,
      messageId: message.id,
      title: message.title,
      label,
      description,
      category: message.category,
      contextKey: message.contextKey,
      sequence: message.sequence,
      recordedAt: Date.now(),
      firstDiscovery,
      source: message.source
    };

    if (existingIndex >= 0) {
      this.history.splice(existingIndex, 1);
    }
    this.history.unshift(entry);
    this.history.splice(GUIDE_HISTORY_LIMIT);
    this.saveHistory();
    if (this.helpPanelOpen) {
      this.helpEntries = this.buildHelpEntries();
      this.renderHelpOrbit();
    }
  }

  private buildHistoryLabel(message: GuideMessage) {
    const firstSegment = message.sequence.segments[0];
    if (message.title.fr !== DEFAULT_SPEAKER_TITLE.fr || message.title.en !== DEFAULT_SPEAKER_TITLE.en) {
      return message.title;
    }
    return firstSegment?.text ?? message.sequence.text;
  }

  private bindPointerEvents() {
    window.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') {
        return;
      }
      this.cursorX = clamp(event.clientX, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, (this.host.clientWidth || window.innerWidth) - VIEWPORT_MARGIN));
      this.cursorY = clamp(event.clientY, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, (this.host.clientHeight || window.innerHeight) - VIEWPORT_MARGIN));
    });

    this.helpButton.addEventListener('pointerenter', () => {
      if (!this.manuallyDisabled && !this.suspended) {
        this.openHelpCatalogue();
      }
    });
    this.helpButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (this.helpPanelOpen) {
        this.closeHelpCatalogue();
      } else {
        this.openHelpCatalogue();
      }
    });
    this.helpOrbit.addEventListener(
      'wheel',
      (event) => {
        if (!this.helpPanelOpen || this.getHelpPageCount() <= 1) {
          return;
        }
        event.preventDefault();
        const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
        if (Math.abs(delta) < 1) {
          return;
        }
        this.changeHelpPage(delta > 0 ? 1 : -1);
      },
      { passive: false }
    );
    this.helpOrbit.addEventListener('pointerdown', (event) => {
      if (!this.helpPanelOpen || this.getHelpPageCount() <= 1) {
        return;
      }
      this.helpSwipePointerId = event.pointerId;
      this.helpSwipeStartX = event.clientX;
    });
    const finishHelpSwipe = (event: PointerEvent) => {
      if (this.helpSwipePointerId !== event.pointerId) {
        return;
      }
      const deltaX = event.clientX - this.helpSwipeStartX;
      this.helpSwipePointerId = null;
      if (Math.abs(deltaX) < 28 || this.getHelpPageCount() <= 1) {
        return;
      }
      this.changeHelpPage(deltaX < 0 ? 1 : -1);
    };
    this.helpOrbit.addEventListener('pointerup', finishHelpSwipe);
    this.helpOrbit.addEventListener('pointercancel', finishHelpSwipe);

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

    window.addEventListener('pointerdown', (event) => {
      if (!this.helpPanelOpen) {
        return;
      }
      const target = event.target as Node | null;
      if (!target) {
        return;
      }
      if (this.helpOrbit.contains(target) || this.helpButton.contains(target) || this.helpSummaryPanel.contains(target)) {
        return;
      }
      this.closeHelpCatalogue();
    });
  }

  private toggleManualVisibility() {
    this.manuallyDisabled = !this.manuallyDisabled;
    this.playback = null;
    this.queue.length = 0;
    this.closeHelpCatalogue(false);
    this.render();
    if (!this.manuallyDisabled) {
      this.cooldowns.clear();
      this.visible = false;
    } else {
      this.panelVisible = false;
    }
  }

  private openHelpCatalogue() {
    this.helpPanelOpen = true;
    this.helpEntries = this.buildHelpEntries();
    this.helpPageIndex = 0;
    this.hoveredHelpEntryId = null;
    this.renderHelpOrbit();
    this.applyVisuals();
  }

  private closeHelpCatalogue(applyVisuals = true) {
    this.helpPanelOpen = false;
    this.helpEntries = [];
    this.hoveredHelpEntryId = null;
    this.helpPageIndex = 0;
    this.helpSwipePointerId = null;
    this.helpSummaryPanel.hidden = true;
    this.helpOrbit.hidden = true;
    this.renderHelpSummary();
    if (applyVisuals) {
      this.applyVisuals();
    }
  }

  private renderHelpOrbit() {
    if (!this.helpPanelOpen) {
      return;
    }

    this.helpOrbitList.replaceChildren();
    this.renderHelpSummary();

    if (this.helpEntries.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'guide-bubble__help-empty';
      empty.textContent = this.i18n.current === 'fr' ? 'Rien à rejouer ici pour le moment.' : 'Nothing to replay here yet.';
      this.helpOrbitList.appendChild(empty);
      return;
    }

    const visibleEntries = this.getVisibleHelpEntries();
    const orbitLayout = this.buildHelpOrbitLayout(visibleEntries.length);
    visibleEntries.forEach((entry, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'guide-bubble__help-orb';
      button.setAttribute('data-kind', entry.kind);
      const layout = orbitLayout[index] ?? { x: 0, y: 0, size: 74, delay: 0, tilt: 0 };
      button.style.setProperty('--guide-orb-x', `${layout.x.toFixed(2)}px`);
      button.style.setProperty('--guide-orb-y', `${layout.y.toFixed(2)}px`);
      button.style.setProperty('--guide-orb-size', `${layout.size.toFixed(2)}px`);
      button.style.setProperty('--guide-orb-delay', `${layout.delay.toFixed(2)}s`);
      button.style.setProperty('--guide-orb-tilt', `${layout.tilt.toFixed(2)}deg`);
      button.setAttribute('aria-label', entry.label[this.i18n.current]);
      button.title = entry.description[this.i18n.current];

      const label = document.createElement('span');
      label.className = 'guide-bubble__help-orb-label';
      label.textContent = entry.label[this.i18n.current];

      const meta = document.createElement('span');
      meta.className = 'guide-bubble__help-orb-meta';
      meta.textContent =
        entry.kind === 'topic'
          ? this.i18n.current === 'fr'
            ? 'Aide'
            : 'Help'
          : entry.kind === 'replay'
            ? entry.firstDiscovery
              ? this.i18n.current === 'fr'
                ? 'Nouveau'
                : 'First'
              : this.i18n.current === 'fr'
                ? 'Replay'
                : 'Replay'
            : this.i18n.current === 'fr'
              ? 'Page'
              : 'Page';

      button.append(label, meta);
      const setHint = () => {
        this.hoveredHelpEntryId = entry.id;
        this.renderHelpSummary();
      };
      const clearHint = () => {
        if (this.hoveredHelpEntryId !== entry.id) {
          return;
        }
        this.hoveredHelpEntryId = null;
        this.renderHelpSummary();
      };
      button.addEventListener('pointerenter', setHint);
      button.addEventListener('pointerleave', clearHint);
      button.addEventListener('focus', setHint);
      button.addEventListener('blur', clearHint);
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        if ((entry.kind === 'page_prev' || entry.kind === 'page_next') && entry.pageDelta) {
          this.changeHelpPage(entry.pageDelta);
          return;
        }
        if (entry.kind === 'topic' && entry.cue) {
          this.trigger(entry.cue, this.currentMessage?.target ?? this.currentPresence.target, {
            bypassGuards: true,
            source: 'help'
          });
        } else if (entry.kind === 'replay' && entry.historyId) {
          this.replayHistoryEntry(entry.historyId);
        }
        this.closeHelpCatalogue();
      });
      this.helpOrbitList.appendChild(button);
    });
  }

  private renderHelpSummary() {
    const language = this.i18n.current;
    if (!this.helpPanelOpen) {
      this.helpSummaryTitle.textContent = '';
      this.helpSummaryBody.textContent = '';
      return;
    }

    if (this.helpEntries.length === 0) {
      this.helpSummaryBody.textContent =
        language === 'fr' ? 'Rien à rejouer ici pour le moment.' : 'Nothing to replay here yet.';
      return;
    }

    const hoveredEntry = this.helpEntries.find((entry) => entry.id === this.hoveredHelpEntryId) ?? null;
    if (hoveredEntry) {
      this.helpSummaryBody.textContent = hoveredEntry.description[language];
      return;
    }

    const pageCount = this.getHelpPageCount();
    this.helpSummaryBody.textContent =
      pageCount > 1
        ? language === 'fr'
          ? `Tu n’as pas compris quoi ? Fais tourner les éclats ${this.helpPageIndex + 1}/${pageCount}.`
          : `What did you miss? Rotate the shards ${this.helpPageIndex + 1}/${pageCount}.`
        : language === 'fr'
          ? 'Tu n’as pas compris quoi ?'
          : 'What did you miss?';
  }

  private buildHelpOrbitLayout(count: number) {
    const viewportWidth = this.host.clientWidth || window.innerWidth;
    const isMobile = viewportWidth <= MOBILE_GUIDE_BREAKPOINT;
    const templateIndexes =
      count <= 1
        ? [3]
        : Array.from({ length: count }, (_, index) =>
            Math.round((index * (GUIDE_HELP_ORBIT_ANGLES.length - 1)) / Math.max(1, count - 1))
          );

    return templateIndexes.map((templateIndex, index) => {
      const angle = GUIDE_HELP_ORBIT_ANGLES[templateIndex] ?? GUIDE_HELP_ORBIT_ANGLES[GUIDE_HELP_ORBIT_ANGLES.length - 1] ?? 0;
      const radius = GUIDE_HELP_ORBIT_RADII[templateIndex] ?? GUIDE_HELP_ORBIT_RADII[GUIDE_HELP_ORBIT_RADII.length - 1];
      const mobileRadius = isMobile ? radius * 0.84 : radius;
      const radian = (angle * Math.PI) / 180;
      return {
        x: Math.cos(radian) * mobileRadius,
        y: Math.sin(radian) * mobileRadius,
        size: isMobile
          ? (GUIDE_HELP_ORBIT_BUTTON_SIZES[templateIndex] ?? GUIDE_HELP_ORBIT_BUTTON_SIZES[GUIDE_HELP_ORBIT_BUTTON_SIZES.length - 1]) * 0.86
          : GUIDE_HELP_ORBIT_BUTTON_SIZES[templateIndex] ?? GUIDE_HELP_ORBIT_BUTTON_SIZES[GUIDE_HELP_ORBIT_BUTTON_SIZES.length - 1],
        delay: index * 0.14,
        tilt: angle < 0 ? -8 : angle > 120 ? 7 : 4
      };
    });
  }

  private buildHelpEntries() {
    const entries: GuideCatalogueEntry[] = [];
    const topics = this.getHelpTopicsForContext(this.currentPresence.zone);
    topics.forEach((topic) => {
      const label = getHelpTopicLabel(topic);
      entries.push({
        id: `topic:${topic}`,
        kind: 'topic',
        label: label.label,
        description: label.description,
        cue: { type: 'help_topic', topic }
      });
    });

    this.history
      .filter((entry) => entry.contextKey === this.currentPresence.zone)
      .forEach((entry) => {
        entries.push({
          id: `replay:${entry.id}`,
          kind: 'replay',
          label: entry.label,
          description: entry.description,
          historyId: entry.id,
          firstDiscovery: entry.firstDiscovery
        });
      });

    const unique = new Map<string, GuideCatalogueEntry>();
    entries.forEach((entry) => {
      const key = `${entry.kind}:${entry.label.fr}:${entry.label.en}`;
      if (!unique.has(key)) {
        unique.set(key, entry);
      }
    });

    return [...unique.values()];
  }

  private getHelpPageCount() {
    if (this.helpEntries.length <= GUIDE_HELP_MAX_VISIBLE_ORBITS) {
      return 1;
    }
    return Math.max(1, Math.ceil(this.helpEntries.length / GUIDE_HELP_PAGE_CONTENT_LIMIT));
  }

  private getVisibleHelpEntries() {
    if (this.helpEntries.length <= GUIDE_HELP_MAX_VISIBLE_ORBITS) {
      return this.helpEntries;
    }

    const pageCount = this.getHelpPageCount();
    this.helpPageIndex = clamp(this.helpPageIndex, 0, Math.max(0, pageCount - 1));
    const start = this.helpPageIndex * GUIDE_HELP_PAGE_CONTENT_LIMIT;
    const pageEntries = this.helpEntries.slice(start, start + GUIDE_HELP_PAGE_CONTENT_LIMIT);
    return [this.buildHelpPagerEntry(-1), ...pageEntries, this.buildHelpPagerEntry(1)];
  }

  private buildHelpPagerEntry(pageDelta: -1 | 1): GuideCatalogueEntry {
    return {
      id: `page:${pageDelta > 0 ? 'next' : 'prev'}:${this.helpPageIndex}`,
      kind: pageDelta > 0 ? 'page_next' : 'page_prev',
      label: pageDelta > 0 ? loc('Suite', 'Next') : loc('Retour', 'Back'),
      description:
        pageDelta > 0
          ? loc('Fais tourner les éclats d’aide vers la page suivante.', 'Rotate the help shards to the next page.')
          : loc('Reviens aux éclats d’aide précédents.', 'Go back to the previous help shards.'),
      pageDelta
    };
  }

  private changeHelpPage(delta: -1 | 1) {
    const pageCount = this.getHelpPageCount();
    if (pageCount <= 1) {
      return;
    }

    this.helpPageIndex = (this.helpPageIndex + delta + pageCount) % pageCount;
    this.hoveredHelpEntryId = null;
    this.renderHelpOrbit();
    this.applyVisuals();
  }

  private getCueContextKey(cue: GuideCue): GuidePresenceContext['zone'] {
    switch (cue.type) {
      case 'intro_mirror_0':
      case 'intro_mirror_first_click':
      case 'intro_mirror_50':
      case 'intro_mirror_100':
      case 'mirror_reveal':
        return 'intro';
      case 'hub_arrival':
      case 'orbit_hover':
      case 'portfolio_scroll':
        return 'orbit';
      case 'focus_enter':
        return 'focus';
      case 'drag_first':
        return 'drag';
      case 'slot_placed':
      case 'two_slots_left':
      case 'one_slot_left':
      case 'slots_complete':
        return 'slots';
      case 'primaterie_arrival':
      case 'primaterie_hover':
        return 'primaterie';
      case 'game_over_intro':
      case 'game_over_hover':
      case 'avatar_hover':
      case 'tutorial_hover':
      case 'achievements_hover':
      case 'settings_hover':
        return this.currentPresence.zone === 'game' ? 'game' : 'game_over';
      case 'help_topic':
        return this.currentPresence.zone;
      default:
        return this.currentPresence.zone;
    }
  }

  private getHelpTopicsForContext(zone: GuidePresenceContext['zone']) {
    switch (zone) {
      case 'intro':
        return ['intro_mirror', 'portfolio_navigation'] satisfies GuideHelpTopic[];
      case 'orbit':
        return ['portfolio_navigation', 'focus_zone'] satisfies GuideHelpTopic[];
      case 'focus':
        return ['focus_zone', 'portfolio_navigation'] satisfies GuideHelpTopic[];
      case 'drag':
      case 'slots':
        return ['slot_goal', 'portfolio_navigation'] satisfies GuideHelpTopic[];
      case 'primaterie':
        return ['primaterie_hub', 'primaterie_contact'] satisfies GuideHelpTopic[];
      case 'game':
        return ['game_rules', 'game_settings', 'game_achievements'] satisfies GuideHelpTopic[];
      case 'game_over':
        return ['game_score_save', 'game_rules', 'game_settings'] satisfies GuideHelpTopic[];
      case 'about':
        return ['about_zone', 'primaterie_contact'] satisfies GuideHelpTopic[];
      case 'hidden':
      default:
        return [] satisfies GuideHelpTopic[];
    }
  }

  private replayHistoryEntry(historyId: string) {
    const entry = this.history.find((candidate) => candidate.id === historyId);
    if (!entry) {
      return;
    }

    const message: GuideMessage = {
      id: `${entry.messageId}:replay:${Date.now()}`,
      priority: 4,
      title: entry.title,
      target: this.currentMessage?.target ?? this.currentPresence.target,
      createdAt: performance.now(),
      sequence: entry.sequence,
      category: entry.category,
      contextKey: this.currentPresence.zone,
      replacementKey: `${entry.messageId}:replay`,
      queueBehavior: 'replace',
      critical: false,
      replayEligible: true,
      source: 'history'
    };
    this.enqueueMessage(message);
  }

  private setAnchorFromPixelPosition(left: number, top: number, characterSize: number, viewportWidth: number, viewportHeight: number) {
    const minCharacterLeft = VIEWPORT_MARGIN;
    const maxCharacterLeft = Math.max(minCharacterLeft, viewportWidth - characterSize - VIEWPORT_MARGIN);
    const minCharacterTop = VIEWPORT_MARGIN;
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
