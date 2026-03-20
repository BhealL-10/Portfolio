# Game Runtime UI Asset Phase

## Scope
- Runtime ciblé: `src/game` dans ce checkout.
- Aucun changement portfolio.
- Intégration limitée aux grades, HUD mobile, restart, bouton paramètres et adaptation theme light/dark.

## Grades
- Les grades utilisent maintenant les spritesheets:
  - `Grade-Twistsheet.png`
  - `Grade-Perfectsheet.png`
  - `Grade-Greatsheet.png`
  - `Grade-supersheet.png`
  - `Grade-Echecsheet.png`
- Lecture 2x2 dans l'ordre:
  1. haut gauche
  2. haut droite
  3. bas gauche
  4. bas droite
- L'animation n'est pas bouclée.
- La frame 4 reste affichée puis fade out selon la progression de feedback existante du runtime.

## Settings / Restart
- Le bouton restart du game over utilise maintenant:
  - `hud_restartbtndark.svg`
  - `hud_restartbtnlight.svg`
- Le bouton paramètres top-right utilise maintenant:
  - `hud_parametredarksvg.svg`
  - `hud_parametrelightsvg.svg`
- Le choix light/dark suit `html[data-theme]`, donc le vrai système de thème global.

## Mobile HUD
- Les boutons mobile utilisent:
  - `hud_haponsvg.svg`
  - `hud_boostsvg.svg`
  - `hud_jumpsvg.svg`
  - `hud_1chargesvg.svg` à `hud_5chargesvg.svg`
- Le HUD mobile n'apparaît que sur environnement mobile/coarse pointer en paysage.
- Le bouton charge reflète le niveau de charge courant avec les SVG 1 à 5.
- `jump`, `boost` et `grapple` reposent actuellement sur le même up-action runtime existant.
  - C'est volontaire pour ne pas casser l'architecture courante tant qu'il n'existe pas encore d'API d'input mobile distincte par capacité.

## Files Added
- `src/game/GradeAnimationController.ts`
- `src/game/GradeSpriteResolver.ts`
- `src/game/LandingGradeDisplay.ts`
- `src/game/ThemeAssetResolver.ts`
- `src/game/RestartButton.ts`
- `src/game/SettingsButton.ts`
- `src/game/SettingsPanelToggle.ts`
- `src/game/TopRightUiCluster.ts`
- `src/game/MobileControlButton.ts`
- `src/game/MobileControlLayoutResolver.ts`
- `src/game/MobileControlsHud.ts`

## Files Updated
- `src/game/GameHUDSystem.ts`
- `src/styles/index.css`
