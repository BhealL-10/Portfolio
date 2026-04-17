import type { Language, LocalizedText } from '../types/content';

export type GuideRevealMode = 'char' | 'word' | 'burst' | 'impact' | 'pause' | 'stagger';
export type GuideEmphasisLevel = 'whisper' | 'soft' | 'normal' | 'strong' | 'impact';
export type GuideTokenKind = 'word' | 'impact' | 'punctuation';
export type GuideTokenAccentMode = 'none' | 'impact' | 'punctuation';
export type GuidePunctuationKind = 'neutral' | 'question' | 'exclaim' | 'pause';
export type GuideTextAnimation =
  | 'static'
  | 'wiggle-horizontal'
  | 'pop-scale'
  | 'punch-in'
  | 'tremble-light'
  | 'bounce-subtle'
  | 'hold-breath'
  | 'delayed-drop';
export type GuideInterruptibility = 'immediate' | 'segment-boundary' | 'locked' | 'critical-only';

export interface GuideToken {
  id: string;
  text: string;
  kind: GuideTokenKind;
  accentMode: GuideTokenAccentMode;
  punctuationKind?: GuidePunctuationKind;
  emphasis: GuideEmphasisLevel;
  animation: GuideTextAnimation;
  revealMode?: Exclude<GuideRevealMode, 'pause'>;
  scaleMultiplier?: number;
  tone?: string;
  joinLeft?: boolean;
  joinRight?: boolean;
  fitEligible?: boolean;
}

export interface GuideSegment {
  id: string;
  text: LocalizedText;
  tokens: Record<Language, GuideToken[]>;
  revealMode: GuideRevealMode;
  emphasis: GuideEmphasisLevel;
  animation: GuideTextAnimation;
  holdDurationMs: number;
  interruptibility: GuideInterruptibility;
  scaleMultiplier?: number;
  tone?: string;
  replayEligible?: boolean;
  minReadableDurationMs: number;
  revealDurationMs: number;
}

export interface GuideSequence {
  id: string;
  text: LocalizedText;
  segments: GuideSegment[];
  estimatedDurationMs: number;
  replayEligible: boolean;
  tone?: string;
}

export interface ParseDialogueOptions {
  idBase?: string;
  pace?: 'whisper' | 'steady' | 'punchy' | 'dramatic';
  tone?: string;
  replayEligible?: boolean;
  emphasisKeywords?: string[];
  impactWords?: string[];
  preferredRevealMode?: GuideRevealMode;
  defaultInterruptibility?: GuideInterruptibility;
  defaultAnimation?: GuideTextAnimation;
  maxWordsPerSegment?: number;
  punchlineWordLimit?: number;
}

const DEFAULT_IMPACT_WORDS = [
  'aventure',
  'adventure',
  'primate',
  'primates',
  'primaterie',
  'projet',
  'projets',
  'project',
  'projects'
] as const;

const FR_CONNECTORS = ['mais', 'donc', 'sinon', 'alors', 'parce', 'pourtant', 'sauf', 'quand', 'si'] as const;
const EN_CONNECTORS = ['but', 'so', 'otherwise', 'then', 'because', 'except', 'when', 'if'] as const;

const WORD_TOKEN_RE = /[\p{L}\p{N}'’-]+|[!?….,;:()]+/gu;
const PUNCTUATION_RE = /^[!?….,;:()]+$/;
const IMPACT_TOKEN_PART_RE = /[’'\-]/g;

function normalizeText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function splitByStrongPunctuation(text: string) {
  const source = normalizeText(text);
  if (!source) {
    return [];
  }

  const parts: string[] = [];
  let start = 0;
  let index = 0;

  while (index < source.length) {
    const current = source[index];
    const isEllipsis = source.slice(index, index + 3) === '...';
    const isStrongPunctuation = isEllipsis || current === '!' || current === '?' || current === '…' || current === ':' || current === ';' || current === '.';
    if (!isStrongPunctuation) {
      index += 1;
      continue;
    }

    let end = isEllipsis ? index + 3 : index + 1;
    while (end < source.length && /[!?…]/.test(source[end])) {
      end += 1;
    }

    const segment = normalizeText(source.slice(start, end));
    if (segment) {
      parts.push(segment);
    }
    start = end;
    index = end;
  }

  const tail = normalizeText(source.slice(start));
  if (tail) {
    parts.push(tail);
  }

  return parts.length > 0 ? parts : [source];
}

function splitByCommaBreaths(text: string, wordBudget: number) {
  if (!text.includes(',')) {
    return [text];
  }

  const rawParts = text.split(/,(?=\s)/g).map((part) => normalizeText(part));
  if (rawParts.length <= 1) {
    return [text];
  }

  const totalWords = countWords(text);
  const shortTail = countWords(rawParts[rawParts.length - 1] ?? '') <= 4;
  if (totalWords <= wordBudget && !shortTail) {
    return [text];
  }

  return rawParts
    .map((part, index) => (index < rawParts.length - 1 ? `${part},` : part))
    .filter(Boolean);
}

function splitByConnector(text: string, language: Language) {
  const words = text.split(/\s+/);
  if (words.length <= 7) {
    return [text];
  }

  const connectors: readonly string[] = language === 'fr' ? FR_CONNECTORS : EN_CONNECTORS;
  let connectorIndex = -1;
  let bestDistance = Number.POSITIVE_INFINITY;
  const midpoint = words.length / 2;

  words.forEach((word, index) => {
    const normalized = normalizeTokenWord(word);
    if (!connectors.includes(normalized)) {
      return;
    }
    const distance = Math.abs(midpoint - index);
    if (distance < bestDistance && index > 1 && index < words.length - 2) {
      bestDistance = distance;
      connectorIndex = index;
    }
  });

  if (connectorIndex < 0) {
    return [text];
  }

  const left = normalizeText(words.slice(0, connectorIndex).join(' '));
  const right = normalizeText(words.slice(connectorIndex).join(' '));
  return left && right ? [left, right] : [text];
}

function splitImpactTail(text: string, options: Required<Pick<ParseDialogueOptions, 'impactWords' | 'punchlineWordLimit'>>) {
  const normalized = normalizeText(text);
  const words = normalized.split(/\s+/).filter(Boolean);
  if (words.length <= options.punchlineWordLimit + 1) {
    return [normalized];
  }

  const impactSet = new Set(options.impactWords.map((value) => value.toLowerCase()));
  for (let tailWordCount = Math.min(options.punchlineWordLimit, words.length - 1); tailWordCount >= 1; tailWordCount -= 1) {
    const tailWords = words.slice(words.length - tailWordCount);
    const tailPhrase = tailWords.join(' ');
    if (!looksLikeImpactPhrase(tailPhrase, impactSet)) {
      continue;
    }
    const lead = normalizeText(words.slice(0, words.length - tailWordCount).join(' '));
    const tail = normalizeText(tailPhrase);
    if (lead && tail) {
      return [lead, tail];
    }
  }

  const ellipsisMatch = normalized.match(/^(.*(?:\.\.\.|…))\s+(.+)$/);
  if (ellipsisMatch) {
    const lead = normalizeText(ellipsisMatch[1] ?? '');
    const tail = normalizeText(ellipsisMatch[2] ?? '');
    if (lead && tail && countWords(tail) <= options.punchlineWordLimit + 1) {
      return [lead, tail];
    }
  }

  return [normalized];
}

function countWords(text: string) {
  return normalizeText(text)
    .split(/\s+/)
    .filter(Boolean).length;
}

function normalizeTokenWord(token: string) {
  return token
    .toLowerCase()
    .replace(/^[^0-9\p{L}]+/u, '')
    .replace(/[^0-9\p{L}]+$/u, '');
}

function getSingularImpactKey(value: string) {
  if (value.endsWith('ies') && value.length > 4) {
    return `${value.slice(0, -3)}y`;
  }
  if (value.endsWith('s') && value.length > 3) {
    return value.slice(0, -1);
  }
  return value;
}

function getImpactCandidates(token: string) {
  const normalized = normalizeTokenWord(token);
  if (!normalized) {
    return [];
  }

  const candidates = new Set<string>();
  candidates.add(normalized);
  candidates.add(getSingularImpactKey(normalized));

  normalized
    .split(IMPACT_TOKEN_PART_RE)
    .map((part) => normalizeTokenWord(part))
    .filter(Boolean)
    .forEach((part) => {
      candidates.add(part);
      candidates.add(getSingularImpactKey(part));
    });

  return [...candidates];
}

function isImpactToken(token: string, impactWords: Set<string>) {
  return getImpactCandidates(token).some((candidate) => impactWords.has(candidate));
}

function getPunctuationKind(token: string): GuidePunctuationKind {
  if (token.includes('?')) {
    return 'question';
  }
  if (token.includes('!')) {
    return 'exclaim';
  }
  if (token.includes('…') || token.includes('.')) {
    return 'pause';
  }
  return 'neutral';
}

function looksLikeImpactPhrase(text: string, impactWords: Set<string>) {
  const cleaned = normalizeText(text);
  if (!cleaned) {
    return false;
  }

  const normalizedWords = cleaned.split(/\s+/).map((word) => normalizeTokenWord(word));
  if (normalizedWords.length === 0) {
    return false;
  }

  return normalizedWords.some((word) => impactWords.has(word) || impactWords.has(getSingularImpactKey(word)));
}

function softSplitSegment(text: string, language: Language, wordBudget: number) {
  const commaSplit = splitByCommaBreaths(text, wordBudget);
  if (commaSplit.length > 1) {
    return commaSplit;
  }
  return splitByConnector(text, language);
}

function parseLanguageSegments(text: string, language: Language, options: Required<Pick<ParseDialogueOptions, 'maxWordsPerSegment' | 'impactWords' | 'punchlineWordLimit'>>) {
  const punctuationParts = splitByStrongPunctuation(text);
  const result: string[] = [];

  punctuationParts.forEach((part) => {
    const breaths = splitByCommaBreaths(part, options.maxWordsPerSegment);
    breaths.forEach((breath) => {
      const tailParts = splitImpactTail(breath, options);
      tailParts.forEach((tailPart) => {
        const compact = normalizeText(tailPart);
        if (!compact) {
          return;
        }
        if (countWords(compact) > options.maxWordsPerSegment) {
          const softParts = softSplitSegment(compact, language, options.maxWordsPerSegment);
          softParts.forEach((softPart) => {
            if (normalizeText(softPart)) {
              result.push(normalizeText(softPart));
            }
          });
          return;
        }
        result.push(compact);
      });
    });
  });

  return result.length > 0 ? result : [normalizeText(text)];
}

function splitLongestSegment(segments: string[], language: Language, wordBudget: number) {
  let bestIndex = -1;
  let bestScore = -1;

  segments.forEach((segment, index) => {
    const score = countWords(segment);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  if (bestIndex < 0) {
    return segments;
  }

  const target = segments[bestIndex] ?? '';
  const split = softSplitSegment(target, language, Math.max(4, Math.floor(wordBudget * 0.7)));
  if (split.length <= 1) {
    const words = target.split(/\s+/);
    if (words.length <= 3) {
      return segments;
    }
    const midpoint = Math.ceil(words.length / 2);
    split.splice(0, split.length, words.slice(0, midpoint).join(' '), words.slice(midpoint).join(' '));
  }

  return [
    ...segments.slice(0, bestIndex),
    ...split.map((value) => normalizeText(value)).filter(Boolean),
    ...segments.slice(bestIndex + 1)
  ];
}

function mergeShortestPair(segments: string[]) {
  if (segments.length <= 1) {
    return segments;
  }

  let bestIndex = 0;
  let bestScore = Number.POSITIVE_INFINITY;

  for (let index = 0; index < segments.length - 1; index += 1) {
    const score = countWords(segments[index] ?? '') + countWords(segments[index + 1] ?? '');
    if (score < bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  }

  return [
    ...segments.slice(0, bestIndex),
    normalizeText(`${segments[bestIndex] ?? ''} ${segments[bestIndex + 1] ?? ''}`),
    ...segments.slice(bestIndex + 2)
  ].filter(Boolean);
}

function rebalanceSegments(segments: string[], language: Language, desiredCount: number, wordBudget: number) {
  let result = [...segments];
  while (result.length < desiredCount) {
    const next = splitLongestSegment(result, language, wordBudget);
    if (next.length === result.length) {
      break;
    }
    result = next;
  }
  while (result.length > desiredCount) {
    result = mergeShortestPair(result);
  }
  return result;
}

function estimateDesiredSegmentCount(frSegments: string[], enSegments: string[]) {
  return Math.max(frSegments.length, enSegments.length, 1);
}

function getTerminalSymbol(text: string) {
  const normalized = normalizeText(text);
  if (!normalized) {
    return '';
  }
  const match = normalized.match(/[!?…]+$|\.{3}$|[.:;]$/);
  return match?.[0] ?? '';
}

function getSegmentAnimation(text: LocalizedText, emphasis: GuideEmphasisLevel, defaultAnimation: GuideTextAnimation) {
  const sample = normalizeText(`${text.fr} ${text.en}`);
  if (!sample) {
    return 'hold-breath';
  }
  if (emphasis === 'impact') {
    return 'punch-in';
  }
  const symbol = getTerminalSymbol(sample);
  if (symbol.includes('?')) {
    return 'wiggle-horizontal';
  }
  if (symbol.includes('!')) {
    return 'pop-scale';
  }
  if (/^(oh|ohh|hehe|oups|oupss|pfff|wait|attends)\b/i.test(sample)) {
    return 'bounce-subtle';
  }
  if (symbol.includes('...') || symbol.includes('…')) {
    return 'hold-breath';
  }
  return defaultAnimation;
}

function getSegmentEmphasis(text: LocalizedText, impactWords: Set<string>) {
  const sample = normalizeText(`${text.fr} ${text.en}`);
  if (looksLikeImpactPhrase(sample, impactWords) && countWords(sample) <= 4) {
    return 'impact';
  }
  if (/[!?]/.test(sample)) {
    return 'strong';
  }
  if (countWords(sample) <= 3) {
    return 'soft';
  }
  return 'normal';
}

function getSegmentRevealMode(
  text: LocalizedText,
  emphasis: GuideEmphasisLevel,
  animation: GuideTextAnimation,
  preferredRevealMode: GuideRevealMode | undefined,
  pace: NonNullable<ParseDialogueOptions['pace']>
) {
  const sample = normalizeText(`${text.fr} ${text.en}`);
  if (!sample) {
    return 'pause';
  }
  if (preferredRevealMode && preferredRevealMode !== 'pause') {
    return preferredRevealMode;
  }
  if (emphasis === 'impact') {
    return 'impact';
  }
  if (animation === 'wiggle-horizontal') {
    return 'word';
  }
  if (animation === 'pop-scale') {
    return countWords(sample) <= 4 ? 'burst' : 'stagger';
  }
  if (pace === 'dramatic') {
    return countWords(sample) <= 7 ? 'stagger' : 'word';
  }
  if (pace === 'punchy') {
    return countWords(sample) <= 6 ? 'burst' : 'word';
  }
  return countWords(sample) >= 11 ? 'word' : 'char';
}

function estimateRevealDurationMs(mode: GuideRevealMode, text: LocalizedText, tokensByLanguage: Record<Language, GuideToken[]>) {
  const textLength = Math.max(Array.from(text.fr).length, Array.from(text.en).length, 1);
  const wordCount = Math.max(tokensByLanguage.fr.length, tokensByLanguage.en.length, 1);

  switch (mode) {
    case 'pause':
      return 140;
    case 'impact':
      return 130;
    case 'burst':
      return Math.min(420, 120 + Math.ceil(wordCount / 2) * 90);
    case 'stagger':
      return Math.min(900, 180 + wordCount * 105);
    case 'word':
      return Math.min(1100, 150 + wordCount * 130);
    case 'char':
    default:
      return Math.min(1400, Math.max(220, textLength * 20));
  }
}

function estimateHoldDurationMs(mode: GuideRevealMode, animation: GuideTextAnimation, emphasis: GuideEmphasisLevel, text: LocalizedText) {
  if (mode === 'pause') {
    return 180;
  }

  let hold = 320;
  if (animation === 'hold-breath' || animation === 'delayed-drop') {
    hold += 120;
  }
  if (animation === 'pop-scale' || animation === 'punch-in') {
    hold += 140;
  }
  if (emphasis === 'impact') {
    hold += 160;
  } else if (emphasis === 'strong') {
    hold += 70;
  }
  if (countWords(`${text.fr} ${text.en}`) >= 14) {
    hold += 120;
  }
  return hold;
}

function estimateMinReadableDurationMs(emphasis: GuideEmphasisLevel, animation: GuideTextAnimation, text: LocalizedText) {
  let duration = 220;
  if (emphasis === 'impact') {
    duration += 100;
  }
  if (animation === 'hold-breath') {
    duration += 80;
  }
  if (countWords(`${text.fr} ${text.en}`) >= 10) {
    duration += 100;
  }
  return duration;
}

function getInterruptibility(
  mode: GuideRevealMode,
  emphasis: GuideEmphasisLevel,
  defaultInterruptibility: GuideInterruptibility
): GuideInterruptibility {
  if (mode === 'pause') {
    return 'immediate';
  }
  if (emphasis === 'impact') {
    return 'critical-only';
  }
  if (mode === 'burst' || mode === 'stagger') {
    return 'locked';
  }
  if (defaultInterruptibility === 'immediate' && mode === 'word') {
    return 'segment-boundary';
  }
  return defaultInterruptibility;
}

function getTokenScale(emphasis: GuideEmphasisLevel) {
  switch (emphasis) {
    case 'impact':
      return 1.34;
    case 'strong':
      return 1.14;
    case 'soft':
      return 0.96;
    case 'whisper':
      return 0.88;
    case 'normal':
    default:
      return 1;
  }
}

function tokenizeSegmentText(
  text: string,
  idBase: string,
  defaultAnimation: GuideTextAnimation,
  impactWords: Set<string>,
  emphasisKeywords: Set<string>
) {
  const source = normalizeText(text);
  const rawTokens = source.match(WORD_TOKEN_RE) ?? [source];

  return rawTokens.map((rawToken, index) => {
    const isPunctuation = PUNCTUATION_RE.test(rawToken);
    const punctuationKind = isPunctuation ? getPunctuationKind(rawToken) : 'neutral';
    const isImpact = !isPunctuation && isImpactToken(rawToken, impactWords);
    const normalized = normalizeTokenWord(rawToken);
    const emphasis: GuideEmphasisLevel = isImpact
      ? 'impact'
      : isPunctuation && punctuationKind !== 'neutral'
        ? 'strong'
        : emphasisKeywords.has(normalized)
          ? 'strong'
          : 'normal';
    const animation =
      punctuationKind === 'question'
        ? 'wiggle-horizontal'
        : punctuationKind === 'exclaim'
          ? 'pop-scale'
          : isImpact
            ? 'punch-in'
            : defaultAnimation;
    const kind: GuideTokenKind = isPunctuation ? 'punctuation' : isImpact ? 'impact' : 'word';
    const accentMode: GuideTokenAccentMode = isImpact ? 'impact' : isPunctuation && punctuationKind !== 'neutral' ? 'punctuation' : 'none';

    return {
      id: `${idBase}-token-${index}`,
      text: rawToken,
      kind,
      accentMode,
      punctuationKind: isPunctuation ? punctuationKind : undefined,
      emphasis,
      animation,
      revealMode: isImpact ? 'impact' : undefined,
      scaleMultiplier:
        kind === 'impact'
          ? 1.1
          : accentMode === 'punctuation'
            ? 1.05
            : getTokenScale(emphasis),
      joinLeft: isPunctuation,
      joinRight: rawToken === '(',
      fitEligible: !isPunctuation
    } satisfies GuideToken;
  });
}

function buildSegmentTone(animation: GuideTextAnimation, emphasis: GuideEmphasisLevel) {
  if (emphasis === 'impact') {
    return 'impact';
  }
  switch (animation) {
    case 'wiggle-horizontal':
      return 'question';
    case 'pop-scale':
    case 'punch-in':
      return 'exclaim';
    case 'hold-breath':
    case 'delayed-drop':
      return 'suspense';
    case 'bounce-subtle':
      return 'comic';
    case 'tremble-light':
      return 'tremble';
    default:
      return 'neutral';
  }
}

export function parseDialogueToSequence(text: LocalizedText, options: ParseDialogueOptions = {}): GuideSequence {
  const idBase = options.idBase ?? 'guide-sequence';
  const pace = options.pace ?? 'steady';
  const impactWords = [...DEFAULT_IMPACT_WORDS];
  const impactSet = new Set(impactWords.map((value) => value.toLowerCase()));
  const emphasisKeywords = new Set((options.emphasisKeywords ?? []).map((value) => value.toLowerCase()));
  const maxWordsPerSegment = options.maxWordsPerSegment ?? (pace === 'punchy' ? 10 : pace === 'dramatic' ? 11 : 13);
  const punchlineWordLimit = options.punchlineWordLimit ?? 3;

  const frSegments = parseLanguageSegments(text.fr, 'fr', {
    maxWordsPerSegment,
    impactWords,
    punchlineWordLimit
  });
  const enSegments = parseLanguageSegments(text.en, 'en', {
    maxWordsPerSegment,
    impactWords,
    punchlineWordLimit
  });
  const desiredCount = estimateDesiredSegmentCount(frSegments, enSegments);
  const balancedFr = rebalanceSegments(frSegments, 'fr', desiredCount, maxWordsPerSegment);
  const balancedEn = rebalanceSegments(enSegments, 'en', desiredCount, maxWordsPerSegment);

  const segments: GuideSegment[] = [];

  for (let index = 0; index < desiredCount; index += 1) {
    const segmentText: LocalizedText = {
      fr: balancedFr[index] ?? balancedFr[balancedFr.length - 1] ?? text.fr,
      en: balancedEn[index] ?? balancedEn[balancedEn.length - 1] ?? text.en
    };
    const segmentEmphasis = getSegmentEmphasis(segmentText, impactSet);
    const segmentAnimation = getSegmentAnimation(segmentText, segmentEmphasis, options.defaultAnimation ?? 'static');
    const revealMode = getSegmentRevealMode(segmentText, segmentEmphasis, segmentAnimation, options.preferredRevealMode, pace);
    const segmentTokens = {
      fr: tokenizeSegmentText(segmentText.fr, `${idBase}-${index}-fr`, segmentAnimation, impactSet, emphasisKeywords),
      en: tokenizeSegmentText(segmentText.en, `${idBase}-${index}-en`, segmentAnimation, impactSet, emphasisKeywords)
    } satisfies Record<Language, GuideToken[]>;
    const revealDurationMs = estimateRevealDurationMs(revealMode, segmentText, segmentTokens);
    const holdDurationMs = estimateHoldDurationMs(revealMode, segmentAnimation, segmentEmphasis, segmentText);
    const minReadableDurationMs = estimateMinReadableDurationMs(segmentEmphasis, segmentAnimation, segmentText);

    segments.push({
      id: `${idBase}-segment-${index}`,
      text: segmentText,
      tokens: segmentTokens,
      revealMode,
      emphasis: segmentEmphasis,
      animation: segmentAnimation,
      holdDurationMs,
      interruptibility: getInterruptibility(revealMode, segmentEmphasis, options.defaultInterruptibility ?? 'segment-boundary'),
      scaleMultiplier: segmentEmphasis === 'impact' ? 1.08 : segmentEmphasis === 'strong' ? 1.04 : 1,
      tone: buildSegmentTone(segmentAnimation, segmentEmphasis),
      replayEligible: options.replayEligible ?? true,
      minReadableDurationMs,
      revealDurationMs
    });
  }

  return {
    id: idBase,
    text,
    segments,
    estimatedDurationMs: segments.reduce((total, segment) => total + segment.revealDurationMs + segment.holdDurationMs, 0),
    replayEligible: options.replayEligible ?? true,
    tone: options.tone
  };
}
