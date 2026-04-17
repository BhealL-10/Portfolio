import { describe, expect, it } from 'vitest';
import { parseDialogueToSequence } from './guideDialogue';

function loc(fr: string, en: string) {
  return { fr, en };
}

describe('guideDialogue', () => {
  it('splits dramatic dialogue into aligned rhythmic segments without turning arbitrary punchlines into impact words', () => {
    const sequence = parseDialogueToSequence(
      loc(
        'Mouhaha, tu n’es pas prêt pour la suite, prépare toi à être prêt... BON ALLEZ GO !',
        'Mouhaha, you are not ready for what comes next, get ready... LET’S GO!'
      ),
      {
        idBase: 'dramatic-sequence',
        pace: 'dramatic'
      }
    );

    const lastSegment = sequence.segments[sequence.segments.length - 1];
    expect(sequence.segments.length).toBeGreaterThan(1);
    expect(lastSegment?.emphasis).not.toBe('impact');
    expect(sequence.segments.map((segment) => segment.text.fr).length).toBe(sequence.segments.map((segment) => segment.text.en).length);
  });

  it('assigns a question animation declaratively', () => {
    const sequence = parseDialogueToSequence(loc('Tu vois ?', 'Do you see?'), {
      idBase: 'question-sequence',
      pace: 'punchy'
    });

    expect(sequence.segments).toHaveLength(1);
    expect(sequence.segments[0]?.animation).toBe('wiggle-horizontal');
    expect(sequence.segments[0]?.revealMode).toBe('word');
  });

  it('keeps tokens per language available for structured rendering and only flags allowed impact words', () => {
    const sequence = parseDialogueToSequence(loc('La Primaterie attend le projet !', 'The Primaterie awaits the project!'), {
      idBase: 'token-sequence'
    });

    const firstSegment = sequence.segments[0];
    expect(firstSegment?.tokens.fr.length).toBeGreaterThan(0);
    expect(firstSegment?.tokens.en.length).toBeGreaterThan(0);
    expect(firstSegment?.tokens.fr.some((token) => token.kind === 'impact' && /primaterie|projet/i.test(token.text))).toBe(true);
    expect(firstSegment?.tokens.en.some((token) => token.kind === 'impact' && /primaterie|project/i.test(token.text))).toBe(true);
  });

  it('does not turn a full sentence into an impact segment just because one allowed word appears inside it', () => {
    const sequence = parseDialogueToSequence(
      loc(
        'Soutiens un primate indépendant et passionné et aide-moi à financer mes projets.',
        'Support an independent passionate primate and help me fund my projects.'
      ),
      {
        idBase: 'impact-inline-sequence'
      }
    );

    expect(sequence.segments.some((segment) => segment.emphasis === 'impact')).toBe(false);
    expect(sequence.segments.some((segment) => segment.tokens.fr.some((token) => token.kind === 'impact'))).toBe(true);
  });

  it('marks expressive punctuation as accent-only tokens', () => {
    const sequence = parseDialogueToSequence(loc('Tu vois ?', 'Do you see?'), {
      idBase: 'punctuation-sequence'
    });

    const punctuation = sequence.segments[0]?.tokens.fr.find((token) => token.kind === 'punctuation');
    expect(punctuation?.accentMode).toBe('punctuation');
    expect(punctuation?.punctuationKind).toBe('question');
  });
});
