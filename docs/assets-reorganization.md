# Asset Reorganization

La base d'assets est maintenant structurée autour de trois axes stables :

- `assets/audio`
- `assets/fonts`
- `assets/images`

## Images

Les images sont réparties par domaine d'usage :

- `assets/images/shared`
  - `branding`
  - `localization`
  - `theme-icons`
- `assets/images/game`
  - `sprites`
  - `ui`
- `assets/images/portfolio`
  - `projects`

## Audio

L'audio est réparti par nature puis par système :

- `assets/audio/music`
- `assets/audio/sfx`
  - `environment`
  - `enemies`
  - `gameplay`
  - `modules`
  - `player`
  - `ui`

## Archive

Les fichiers non référencés mais non dupliqués n'ont pas été supprimés. Ils ont été déplacés vers :

- `assets/archive/unreferenced`

Cette zone contient actuellement :

- artefacts système (`desktop.ini`)
- variantes audio non consommées
- variantes graphiques legacy non consommées
- police secondaire non utilisée dans `assets/fonts/archive`

## Doublons Fusionnés

Deux doublons hash-identiques ont été fusionnés :

- `assets/images/favicon.svg` vers `assets/images/shared/branding/ape-prod-mark-light.svg`
- `assets/images/btn/Soundspritesheet.png` vers `assets/images/game/ui/meters/fill-strip.png`

## Traçabilité

Le détail complet des déplacements, fusions et archives est conservé dans :

- `docs/assets-migration-manifest.json`
- `scripts/reorganize-assets.mjs`
