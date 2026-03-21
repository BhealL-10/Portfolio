# Runtime Refactor Audit

## Source Of Truth
- Gameplay conservé depuis la version actuelle fonctionnelle.
- Aucun changement volontaire de feel sur:
  - mouvement
  - physique
  - flow
  - caméra
  - logique d'items
  - timings clavier existants

## Audit des gros fichiers
- `src/game/GameSessionController.ts`
  - runtime gameplay principal
  - état joueur
  - input gameplay
  - items/modules actifs
  - collisions / landing / feedback
  - principal risque de régression
- `src/game/GameHUDSystem.ts`
  - HUD gameplay
  - game over
  - feedback de landing
  - responsive / mobile
  - principal risque UI
- `src/game/GamePathSystem.ts`
  - génération / buffer / difficulté / validation de route
  - laissé en place sur cette passe pour ne pas toucher au flow
- `src/core/AppController.ts`
  - orchestration app
  - transitions portfolio/game
  - routing des inputs
  - point d’entrée

## Découpage engagé sur cette passe
- `src/core/appModePredicates.ts`
  - prédicats de modes extraits depuis `AppController`
  - verrouille le gating intro / portfolio / primatrie / game
- `src/game/GradeAnimationController.ts`
  - logique de tempo des grades
- `src/game/GradeSpriteResolver.ts`
  - mapping spritesheets des grades
- `src/game/LandingGradeDisplay.ts`
  - rendu et continuité visuelle des grades
- `src/game/MobileControlButton.ts`
  - primitive de bouton mobile
- `src/game/MobileControlLayoutResolver.ts`
  - résolution contextuelle des actions mobile depuis l’état réel du runtime
- `src/game/MobileControlsHud.ts`
  - orchestration HUD mobile
- `src/game/RestartButton.ts`
  - bouton restart light/dark
- `src/game/SettingsButton.ts`
  - bouton settings light/dark
- `src/game/SettingsPanelToggle.ts`
  - ouverture/fermeture du panneau settings
- `src/game/TopRightUiCluster.ts`
  - cluster top-right dédié au panneau settings
- `src/game/PrimatriePortal.ts`
  - portail d’entrée `/primatrie`
  - ancré sur la shard centrale au lieu d’un panneau overlay générique
- `src/core/AppEntryRoute.ts`
  - résolution simple du point d’entrée
- `src/game/buildGameOverSummaryMarkup.ts`
  - rendu isolé du résumé game over
- `src/game/MiniGamePortalLayout.ts`
  - layout autonome du portail mini-jeu
  - ne dépend pas du path runtime

## Ce qui a été déplacé
- Le rendu des grades n’est plus codé directement dans le contrôleur HUD.
- La logique de boutons mobile n’est plus codée en dur dans `GameHUDSystem`.
- Le choix des assets theme light/dark n’est plus mélangé au reste du HUD.
- Le portail `/primatrie` est isolé dans son propre composant UI.
- Le gating des modes app n’est plus dispersé uniquement dans `AppController`.
- Le markup du résumé de fin de run n’est plus directement construit dans `GameHUDSystem`.
- Le portail mini-jeu n’utilise plus le path runtime du run pour son layout de boot.

## Ce qui a été laissé en place volontairement
- `GameSessionController.ts`
  - boucle gameplay principale
  - physique
  - caméra
  - cadence de run
- `GamePathSystem.ts`
  - génération active du run
- `AppController.ts`
  - orchestration générale

Raison:
- ce sont les zones les plus sensibles au feel actuel
- une extraction agressive ici serait risquée sans batterie de tests gameplay plus large

## Corrections faites
- Mobile:
  - sur shard:
    - bouton jump = saut direct
    - bouton boost = charge/boost au relâchement
  - en air:
    - bouton grappin séparé si grappin présent
    - bouton charges airborne basé sur les charges réellement restantes
    - fallback boost si plus de charges airborne mais souffleur disponible
- Grades:
  - l’animation continue jusqu’au fade out complet même si le runtime bascule ensuite sur milestone/reward
- Responsive:
  - menus et HUD mobiles réduits
  - contrôles mobile resserrés
  - panneau settings et game over allégés sur petit écran
- HUD jeu:
  - boutons settings in-game rendus avec SVG FR / EN et icônes soleil / lune
  - contraste des panneaux et overlays aligné sur une logique d’inversion simple:
    - dark theme => panneau clair / texte foncé
    - light theme => panneau foncé / texte clair
- Game over:
  - le bouton retour ne pointe plus vers le portfolio
  - il renvoie maintenant vers le menu principal interne du mini-jeu (`/primatrie`)
- Routing input:
  - désactivation explicite de la couche portfolio pendant le mini-jeu
  - navigation portfolio masquée pendant le mini-jeu
- Entrée `/primatrie`:
  - vrai état racine dédié
  - bypass complet du miroir / intro / hidden slots
  - une seule shard visible
  - bateau réel en orbite via un preview autonome
  - single player connecté au runtime existant
  - 3v3 et 10v10 visibles mais inactifs
  - bouton portfolio sans reload complet
- Boot normal:
  - le chemin miroir -> cassure -> portfolio n’est plus contaminé par la preview primatrie
- Path safety:
  - `GamePathSystem` se réinitialise défensivement si demandé alors qu’il est vide
  - `instantiatePattern()` ne peut plus tomber sur `previous.index` undefined
- Three.js:
  - les appels à `toNonIndexed()` sont maintenant protégés
- Portfolio:
  - gate d’orientation portrait-only ajouté sur mobile/tablette
  - les logos/images de shards ne servent plus de cible de pick prioritaire
  - le pick portfolio ajoute maintenant un fallback par proximité écran pour récupérer les shards recouvertes
  - les mini-shards utilisent une palette fixe de 4 couleurs indépendante du thème
  - les logos des mini-shards sont légèrement agrandis
  - les durées de focus / unfocus / swap de facette ont été raccourcies sans changer la logique
  - la présentation n’est plus auto-ouverte après l’intro
  - toutes les shards ont maintenant un slot caché côté portfolio
  - les règles spéciales de drag/orbite sur `presentation` ont été retirées
  - le picking mobile est plus tolérant pour éviter les faux drag / faux miss-click
  - le portail `/primatrie` est maintenant explicitement `hidden` hors affichage pour couper tout conflit de clics
  - les mini-shards utilisent désormais 3 plans de logo autour du coeur, comme les shards projet
  - chaque shard projet possède maintenant exactement 4 mini-shards en mode portfolio
  - chaque groupe de 4 mini-shards reçoit les 4 couleurs fixes une seule fois
  - quand une shard est placée sur son emplacement caché, l’orbite des 4 mini-shards s’élargit visiblement
  - les mini-shards reprennent maintenant le logo de leur shard parente
  - la visibilité des logos mini-shards varie selon leur position orbitale, pour éviter un affichage plat et permanent
  - palette finale mini-shards:
    - `#75AF80`
    - `#FF4545`
    - `#49BCFF`
    - `#8AEBEF`
- Responsive global:
  - shell viewport renforcé (`vh` / `svh` / `dvh`)
  - overflow global resserré pour éviter les découpes d’écran sur mobile
  - labels de reward/milestone recalculés avec un layout resolver dédié
  - cartes de reward plus petites et mieux clampées sur mobile
- Grades:
  - déduplication visuelle sur un même node de landing pour éviter les retriggers parasites sur milestone/reward
  - projection HUD annulée si la projection écran n’est pas visible
  - un node déjà noté ne retrigger plus tant qu’un vrai nouveau saut/atterrissage n’a pas eu lieu
- Transition menu principal -> jeu:
  - le bateau du portail mini-jeu est conservé visible pendant l’entrée en run
  - on évite maintenant la disparition brutale de l’instance avant l’arrivée du vrai single player
- Visuel shards du jeu:
  - les shards du mini-jeu réinjectent maintenant une partie du langage visuel des hidden slots
  - utilisation modérée de `fragmentAmount` et des stries de déformation pour reprendre la sensation de fragmentation sans toucher au gameplay

## Phase A — AppController traité
- `src/core/AppController.ts`
  - le boot route maintenant vers deux racines:
    - route normale portfolio
    - route `/primatrie`
  - ajout des modes:
    - `primatrie_portal`
    - `primatrie_transition`
  - `/primatrie` ne force plus artificiellement les modes intro/orbit/constellation
  - la couche portfolio est coupée tant que la racine primatrie est active
  - le retour `Portfolio` depuis `/primatrie` repasse vers le flow portfolio sans recharger l’app
- `src/portfolio/OrbitWorldSystem.ts`
  - ajout d’une API de layout mono-shard:
    - `setSingleNodeExternalLayout()`
    - `beginSingleNodeExternalLayoutTransition()`
  - but:
    - afficher une seule shard réelle
    - masquer proprement les autres entités
- `src/game/GameSessionController.ts`
  - ajout d’un état `portal_preview`
  - but:
    - réutiliser le vrai bateau
    - réutiliser l’orbite réelle autour d’une shard
    - ne pas lancer une vraie run
    - ne pas exposer les inputs gameplay
  - correction structurelle:
    - la preview du portail n’utilise plus `GamePathSystem`
    - `getPortalPreviewLayout()` repose sur un layout statique autonome
- `src/core/AppController.ts`
  - ajout d’un retour explicite vers le menu principal mini-jeu:
    - `returnToMiniGameMainMenu()`
  - la navigation portfolio est cachée pendant le mini-jeu
  - gate d’orientation portrait-only ajouté pour les modes portfolio
  - accélération ciblée des transitions focus / unfocus / changement de facette

## Cause Racine Corrigée
- Le crash ne venait pas du warning Three.js.
- Le crash venait de `AppController.update()`:
  - la pose caméra primatrie était calculée même hors mode primatrie
  - cela appelait `getPortalPreviewLayout()`
  - la preview portail utilisait alors `getResolvedNode()`
  - `GamePathSystem` pouvait être vide à ce moment-là
  - `instantiatePattern()` lisait alors `previous.index` sur `undefined`
- Correction appliquée:
  - `AppController` ne calcule la pose primatrie que si la racine primatrie est réellement active
  - le portail mini-jeu utilise désormais `src/game/MiniGamePortalLayout.ts`
  - `GamePathSystem` a reçu des guards défensifs pour éviter tout crash sur état vide

## Réutilisation Des Shards
- Les shards visuelles restent celles déjà présentes dans `OrbitWorldSystem`.
- Selon le mode:
  - `PortfolioIntro`
  - `PortfolioOrbit`
  - `PrimatriePortal`
  - `MiniGame`
  elles sont seulement repositionnées / masquées / réutilisées.
- Le portail mini-jeu:
  - utilise la même infrastructure de shards visuelles
  - n’instancie aucun pattern de run
  - n’a besoin d’aucun chunk gameplay pour exister

## Phase B — GameHUDSystem traité
- `src/game/GameHUDSystem.ts`
  - le contrôleur garde la composition et les hooks UI existants
  - extraction sûre faite:
    - `src/game/buildGameOverSummaryMarkup.ts`
  - ce qui a été déplacé:
    - signature de run game over
    - markup stats
    - markup équipement
  - corrections UI ajoutées:
    - cycle de vie des grades sécurisé jusqu’au fade out complet
    - cleanup systématique des grades quand le HUD disparaît
    - rendu settings visuel FR / EN + soleil / lune
    - bouton game over rerouté vers le menu principal mini-jeu
    - bouton mobile au sol rerouté sur l’asset boost
    - layout des reward labels externalisé dans `src/game/RewardBranchLabelLayoutResolver.ts`
  - ce qui reste volontairement en place:
    - update loop HUD
    - inventory/equipment dock
    - leaderboard
    - responsive HUD global
  - raison:
    - éviter de casser les timings de rendu ou les interactions existantes

## Comportements verrouillés
- `triggerUpAction()` clavier inchangé
- `triggerJump()` clavier inchangé
- `setChargeActive()` clavier inchangé
- ordre des actions airborne clavier inchangé:
  1. impulsions/modules
  2. grappin
  3. wrapper
  4. extra jump

## Ajouts gameplay minimaux pour le mobile
- `triggerMobileGrappleAction()`
- `triggerMobileAirborneChargeAction()`

But:
- séparer les boutons mobile sans casser le comportement clavier existant
- conserver la logique actuelle comme référence absolue

## Validation
- `pnpm exec tsc --noEmit`
- `pnpm build`

## Prochaine extraction sûre recommandée
- `GameSessionController.ts`
  - extraction 1 recommandée:
    - `GameAirborneActionSystem`
    - contenu:
      - `performAirAction()`
      - `tryUseAirborneModuleImpulse()`
      - `tryConsumeAirborneExtraJump()`
      - `tryActivateGrappleFromCurrentState()`
      - `tryActivateGrappin()`
      - `findGrappleCandidate()`
      - `armGrapple()`
    - dépendances à injecter:
      - `playerState`
      - `playerVelocity`
      - `player rotation`
      - `momentum`
      - `runUpgrades`
      - callbacks runtime:
        - `triggerModuleFlash`
        - `getResolvedNode`
        - `getOrbitSample`
        - `getModuleRuntime`
        - `getEquippedItem`
        - `spendModuleCharge`
    - raison:
      - bloc métier cohérent
      - très peu couplé à la caméra
      - n’impacte pas la boucle attached/orbit principale
- extraction 2 ensuite:
  - `GameHudSnapshotProjector`
  - contenu:
    - `getHudState()`
    - `getMobileHudState()`
    - `getRemainingAirborneChargeCount()`
- extraction 3 ensuite:
  - `LandingFeedbackController`
  - contenu:
    - `startLandingFeedback()`
    - `applyLandingJudgement()`
