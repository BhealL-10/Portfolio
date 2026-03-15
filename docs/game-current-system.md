# Documentation detaillee du jeu actuel

## 1. Objet de ce document

Ce document decrit le fonctionnement actuel du mini-jeu tel qu'il existe dans le projet aujourd'hui. Le but n'est pas de proposer une refonte ici, mais de capturer le comportement reel du jeu, ses systemes, ses dependances, ses contraintes et ses dettes techniques utiles avant une reconstruction propre.

Le perimetre principal couvre :
- le runtime du mini-jeu
- la generation des shards et des patterns
- les milestones, rewards et shops
- le systeme d'items utilitaires et de modules
- le momentum, les grades et le scoring
- les ennemis, les pieces, le HUD et la camera
- les transitions portfolio -> mini-jeu -> portfolio

Le portfolio n'est documente ici que dans la mesure ou il alimente le lancement du mini-jeu et sa presentation visuelle.

## 2. Fichiers actifs et fichiers legacy

### 2.1 Fichiers coeur reellement actifs pour le mini-jeu

- [src/core/AppController.ts](/home/bheall/workspace/Portfolio/src/core/AppController.ts)
- [src/game/GameSessionController.ts](/home/bheall/workspace/Portfolio/src/game/GameSessionController.ts)
- [src/game/GameHUDSystem.ts](/home/bheall/workspace/Portfolio/src/game/GameHUDSystem.ts)
- [src/game/GamePathSystem.ts](/home/bheall/workspace/Portfolio/src/game/GamePathSystem.ts)
- [src/game/PatternLibrary.ts](/home/bheall/workspace/Portfolio/src/game/PatternLibrary.ts)
- [src/game/PatternSelector.ts](/home/bheall/workspace/Portfolio/src/game/PatternSelector.ts)
- [src/game/PatternValidator.ts](/home/bheall/workspace/Portfolio/src/game/PatternValidator.ts)
- [src/game/ShardRuntimeResolver.ts](/home/bheall/workspace/Portfolio/src/game/ShardRuntimeResolver.ts)
- [src/game/roguelite.ts](/home/bheall/workspace/Portfolio/src/game/roguelite.ts)
- [src/game/CameraRailController.ts](/home/bheall/workspace/Portfolio/src/game/CameraRailController.ts)
- [src/game/CoinSystem.ts](/home/bheall/workspace/Portfolio/src/game/CoinSystem.ts)
- [src/game/EnemySystem.ts](/home/bheall/workspace/Portfolio/src/game/EnemySystem.ts)
- [src/game/ShopSystem.ts](/home/bheall/workspace/Portfolio/src/game/ShopSystem.ts)
- [src/game/RunStatsSystem.ts](/home/bheall/workspace/Portfolio/src/game/RunStatsSystem.ts)
- [src/game/SpriteSheetPlane.ts](/home/bheall/workspace/Portfolio/src/game/SpriteSheetPlane.ts)
- [src/game/difficultyScaler.ts](/home/bheall/workspace/Portfolio/src/game/difficultyScaler.ts)
- [src/game/gameSessionTypes.ts](/home/bheall/workspace/Portfolio/src/game/gameSessionTypes.ts)

### 2.2 Fichiers portfolio qui pilotent le mini-jeu

- [src/portfolio/OrbitWorldSystem.ts](/home/bheall/workspace/Portfolio/src/portfolio/OrbitWorldSystem.ts)
- [src/portfolio/ShardInteractionSystem.ts](/home/bheall/workspace/Portfolio/src/portfolio/ShardInteractionSystem.ts)
- [src/portfolio/SecretSlotSystem.ts](/home/bheall/workspace/Portfolio/src/portfolio/SecretSlotSystem.ts)
- [src/portfolio/shardLayout.ts](/home/bheall/workspace/Portfolio/src/portfolio/shardLayout.ts)

### 2.3 Fichiers probablement legacy ou issus d'une ancienne architecture

Ces fichiers existent encore, mais ne sont pas les points d'entree actifs du mini-jeu actuel :

- [src/game/GameModeController.ts](/home/bheall/workspace/Portfolio/src/game/GameModeController.ts)
- [src/game/GameCameraSystem.ts](/home/bheall/workspace/Portfolio/src/game/GameCameraSystem.ts)
- [src/game/pathBufferManager.ts](/home/bheall/workspace/Portfolio/src/game/pathBufferManager.ts)
- [src/game/cameraPathController.ts](/home/bheall/workspace/Portfolio/src/game/cameraPathController.ts)
- [src/game/pathGenerator.ts](/home/bheall/workspace/Portfolio/src/game/pathGenerator.ts)

Ils sont utiles pour comprendre l'historique et certains choix de design, mais la boucle active passe aujourd'hui par `GameSessionController`.

## 3. Architecture globale du produit

### 3.1 Niveaux d'architecture

Le projet superpose 3 couches principales :

1. `AppController`
   - orchestre les modes globaux de l'application
   - lie portfolio, focus, mini-jeu, HUD et transitions camera

2. `OrbitWorldSystem`
   - gere le monde portfolio 3D
   - gere les shards du portfolio, leurs orbites, focus, drag/drop et layout externe

3. `GameSessionController`
   - gere toute la simulation du mini-jeu
   - gere les plateformes, le joueur, les items, le momentum, les events, la camera gameplay, les ennemis, les pieces et le HUD

### 3.2 Modes globaux applicatifs

Les modes sont portes par `ModeController` et pilotes par `AppController`. Les plus importants sont :

- `intro`
- `orbit`
- `dragging`
- `constellation_complete`
- `focus_enter`
- `focus`
- `focus_facet_transition`
- `focus_exit`
- `game_transition`
- `game`
- `game_over`

Le mini-jeu n'existe donc pas comme scene separee. C'est un etat de l'application qui reutilise le meme renderer et le meme monde 3D, en basculant `OrbitWorldSystem` dans un layout externe fourni par `GameSessionController`.

## 4. Entree dans le mini-jeu

### 4.1 Declenchement

Le mini-jeu demarre depuis `AppController.startGameTransition()` quand la constellation est complete :

- toutes les shards "secretes" sont activees dans `SecretSlotSystem`
- `AppController` bascule le mode en `game_transition`
- `GameSessionController.startTransition()` prepare le runtime de jeu
- `OrbitWorldSystem.beginExternalLayoutTransition()` recoit les positions/scales/visuels initiaux des plateformes du jeu

### 4.2 Animation camera portfolio -> mini-jeu

La transition camera est calculee dans `AppController.getGameTransitionCameraPose()` :

1. phase d'alignement frontal
   - la camera portfolio se deplace vers une position frontale devant le pivot du jeu

2. phase de rotation
   - un offset frontal est slerpe vers l'offset gameplay
   - la camera pivote autour du pivot du jeu au lieu de "traverser" l'espace arbitrairement

Cette logique est une correction recente par rapport a une interpolation plus brute.

### 4.3 Reutilisation du monde portfolio comme champ de jeu

Pendant `game_transition`, `game` et `game_over`, `OrbitWorldSystem` ne montre plus son comportement d'orbite portfolio normal :

- il bascule en `externalLayoutActive`
- il positionne les shards du portfolio sur les positions gameplay
- il leur applique des visuels `VisiblePlatformVisual` issus de `GameSessionController`
- il maintient une capacite supplementaire via `gameFieldEntities` pour afficher plus de plateformes que le nombre de shards portfolio initial

## 5. Boucle principale du mini-jeu

### 5.1 Point d'entree

La boucle est `GameSessionController.update(deltaTime, elapsedTime)`.

Ordre logique simplifie :

1. gel partiel si shop verrouille
2. tick des runtimes de modules
3. mise a jour du momentum
4. prewarm des prochains milestones
5. update du joueur
   - attache a une shard
   - ou airborne
6. avance de la fenetre d'affichage des plateformes
7. events et auto-fire
8. camera
9. trail
10. sprites joueur/modules
11. HUD sur la shard courante
12. synchronisation coins/ennemis/indicateurs
13. checks d'echec
14. progression des toasts et landing feedback
15. sequence du wrapper

### 5.2 Etats de session

Le runtime jeu utilise `GameSessionState` :

- `idle`
- `transition_in`
- `running_attached`
- `running_charging`
- `running_airborne`
- `upgrade_branching`
- `upgrade_acquired`
- `game_over`
- `transition_out`

L'etat HUD derive de cet etat via `getHudStateValue()`.

### 5.3 Etats de mouvement du joueur

Le joueur a sa propre machine d'etat :

- `attached`
- `charging`
- `airborne`
- `dead`

Ce decouplage est important :
- le jeu peut etre en `upgrade_branching` alors que le joueur est encore `airborne`
- le shop peut figer la simulation tout en gardant le joueur sur une shard

## 6. Generation des shards et du chemin

### 6.1 Systeme de base

Le chemin est gere par `GamePathSystem`.

Principes clefs :

- PRNG deterministe interne par seed multiplicative
- buffer de nodes extensible a la demande
- generation par patterns de haut niveau plutot que par simple candidat unique
- normalisation finale des indices et des distances cumulees

Le node de depart est initialise dans `reset()` avec :
- index `0`
- x `-12`
- y `0.8`
- radius medium
- une piece orbitale de base

### 6.2 Prebuild et extension du buffer

`GamePathSystem` expose :

- `prebuild(initialCount)`
- `ensureAhead(currentIndex, threshold, chunkSize)`
- `getResolvedNode(index, elapsedTime, currentIndex)`
- `getWindow(start, count, elapsedTime, currentIndex)`

Le jeu garde donc toujours plusieurs dizaines de shards d'avance.

### 6.3 Pattern library

`PatternLibrary.ts` definit une librairie declarative de patterns :

- `easy_*`
- `medium_*`
- `hard_*`
- `expert_*`

Chaque pattern porte :

- `difficulty`
- `verticality`
- `movementType`
- `allowedShardSizes`
- `allowedShapeKinds`
- `eventCompatibility`
- `nodes[]`

Chaque node template contient notamment :

- `x`, `y`
- taille optionnelle
- pattern de mouvement optionnel
- coins orbitaux optionnels
- pole ennemi optionnel

### 6.4 Selection des patterns

`selectPattern(score, rng, recentPatternIds)` :

- lit `getDifficultyProfile(score)`
- choisit une bande de difficulte
- applique des poids par difficulte
- evite les 3 derniers patterns recents si possible

Le resultat est un pattern de macro-structure, pas encore un runtime node final.

### 6.5 Instantiation d'un pattern

`instantiatePattern(pattern)` fait plusieurs passes :

1. `buildTemplateNode()`
   - convertit les templates en `GamePathNode`
   - choisit taille, shape, mouvement, event, spin, visuel

2. `densifyPattern()`
   - insere des micro-shards supplementaires si le gap est trop grand ou trop plat

3. `expandLanePresence()`
   - ajoute des shards compagnons dans d'autres lanes pour densifier la lecture

4. `reserveMilestones()`
   - injecte les milestones si une distance franchit un seuil

5. `isolateMilestones()`
   - force de l'espace vide autour des gigantesques milestones

6. `validatePatternPlacement()`
   - verifie collisions, distances min/max, verticalite, colonnes partagees

Si la validation echoue :
- fallback vers pattern brut
- sinon fallback complet via `buildFallbackPattern()`

### 6.6 Tailles, shapes et mouvements

Un node a :

- `sizeTier`
  - de `tiny` a `massive`
- `shapeKind`
  - `round`
  - `oval`
  - `triangular`
- `motionPattern`
  - `none`
  - `vertical`
  - `horizontal`
  - `micro_orbit`
  - `drift`

La generation des shapes est contrainte par la difficulte :

- `round` domine au debut
- `oval` augmente ensuite
- `triangular` arrive plus tard

Les movements sont reserves aux shapes rondes et limitent les grosses tailles.

### 6.7 Milestones

Le systeme de milestones est drive par `roguelite.ts` :

- milestones a `10m`
- `100m`
- `1000m`
- puis tous les `1000m`

Quand une distance franchit un milestone :

- `GamePathSystem.reserveMilestones()` injecte une shard `massive`
- `kind = milestone`
- `isMilestone = true`
- `isGigantic = true`
- position recentree sur `y = 0`
- tres large rayon gameplay et grosse `visualScale`

Ensuite `isolateMilestones()` reserve une grande fenetre avant et apres pour eviter qu'une autre shard rentre dans leur volume de lecture.

### 6.8 Reward branches apres milestone

Quand le joueur atterrit sur un milestone :

- `GameSessionController.resolveNodeEvent()` construit ou recupere 3 rewards
- `GamePathSystem.createUpgradeBranches()` cree 3 shards de branche
- une branche haute
- une branche centrale
- une branche basse

Chaque branche porte :

- un `offer`
- un node `branch`
- un `branchSlot`
- une `offerId`

Quand le joueur choisit une branche :

- `commitRewardBranch()` remplace le futur chemin via `replaceFuture()`
- applique l'item
- planifie des events post-milestone

### 6.9 Events et shops

Les events possibles :

- `shop`
- `gift`
- `rare_item`
- `none`

Le systeme combine :

- events planifies par `EventSystem` apres milestone
- logic probabiliste directe dans `resolveEventType()`

Contraintes importantes :

- aucun event si un milestone est franchi sur ce segment
- shop garanti entre `20m` et `50m`
- ecart maximal de `120m` entre deux shops
- biais `rewardChance` et `shopChance` issus des utilitaires

### 6.10 Coins et ennemis

Chaque node peut contenir :

- `coinSlots[]`
- `enemySlot`

Coins :
- places a certains angles orbitaux
- valeur `1` ou `2`
- possiblement generes sur onboarding si aucun coin n'existe

Ennemis :
- seulement si la difficulte les autorise
- jamais sur `shop` ou `gift`
- seulement sur shapes `round`
- poles `north` ou `south`
- tiers `light`, `armored`, `elite`, `invincible`

## 7. Resolution runtime des shards

`ShardRuntimeResolver.resolveRuntimeNode()` applique la motion runtime :

- lit `motionPattern`
- applique offsets `resolvedX`, `resolvedY`
- applique `resolvedSpinPhase` pour les shapes non-rondes

Rappel important :
- la generation stocke des nodes "design time"
- le runtime produit des nodes "resolved" animables

## 8. Geometrie gameplay des shards

Le jeu n'utilise pas simplement des spheres.

### 8.1 Orbite du joueur sur une shard

`GameSessionController.getOrbitSample()` :

- calcule l'orbite sur une round, oval ou triangular
- tient compte de la rotation propre de la shape
- ajoute une clearance de gameplay
- reprojecte sur la vraie forme visible

### 8.2 Deformation de surface

La surface n'est pas statique.

Le controller ajoute :

- deformation de base dependante du niveau
- deformation additionnelle liee aux impacts
- deformation liee au passage du bateau

Fonctions clefs :

- `sampleSurfaceDeformation()`
- `sampleSurfaceSlope()`
- `sampleImpactWaveOffset()`
- `sampleBoatWaveOffset()`
- `registerImpactWave()`

Effets visibles :

- des vagues apparaissent sur la shard apres lancement/atterrissage
- les grosses shards peuvent se deformer plus sensiblement
- la position du joueur se recale legerement a l'exterieur de la surface pour eviter d'etre mange par la deformation

## 9. Mouvement du joueur

### 9.1 Etat attache

`updateAttached()` gere :

- rotation orbitale
- acceleration par charge
- boost de souffleur sur shard
- vitesse orbitale dependante du momentum
- collecte des coins au passage
- contact ennemi sur la shard courante
- activation auto du wrapper si dispo

Variables principales :

- `orbitAngle`
- `orbitDirection`
- `angularSpeed`
- `chargeActive`
- `chargeMeter`

### 9.2 Saut / lancement

`launch()` :

- part du tangent + un peu de radial
- transforme la charge en vitesse
- depend du momentum, de la puissance de saut et des bonus
- declenche une impact wave sur la shard source
- passe le joueur en `airborne`

### 9.3 Etat airborne

`updateAirborne()` gere :

- gravite reduite par le planeur
- correction verticale par `Orbit Belt`
- poussée continue du souffleur si maintenu
- auto-wrapper
- logique de grappin
- collisions de capture sur les prochaines shards
- rescues `phaseJump`, teleports legacy, warp legacy si presents
- collisions ennemis airborne

### 9.4 Capture d'une nouvelle shard

`canCaptureNode()` :

- utilise un rayon de capture lie au rayon physique de la shard
- prend en compte les grosses milestones
- verifie aussi le segment de deplacement entre la frame precedente et la frame courante

Si capture :

- `attachToNode()`
- recalcul angle d'attache optimal
- determine la direction orbitale
- applique le jugement d'atterrissage
- reset certaines charges

## 10. Momentum, grades et landing

### 10.1 Gauge

Le momentum est stocke dans :

- `momentum.gauge`
- `momentum.fillRate`
- `momentum.speedMultiplier`
- `momentum.jumpMultiplier`
- `momentum.cameraZoomMultiplier`

### 10.2 Decay

`updateMomentum()` :

- applique la decay hors airborne-grace et hors orbit-grace
- amortit les multiplicateurs derives
- derive un zoom camera non lineaire
- applique les bonus de `Spyglass`

### 10.3 Jugement d'atterrissage

`applyLandingJudgement()` utilise :

- alignement tangent
- penalite frontale
- detection de `twist`
- bonus de fenetre `Blind Angle`
- prevention du `miss` par `Denial Totem`
- mitigation des mauvais atterrissages via `Shock Absorbers`

Grades :

- `miss`
- `good`
- `super`
- `perfect`

Effets :

- gain ou perte de momentum
- multiplicateur de vitesse orbitale
- affichage d'un badge HUD
- eventuel bonus `twist`

### 10.4 Ceiling soft sur le momentum non-twist

Le jeu limite volontairement la progression sans twist :

- sous `0.5`, certains gains simples sont possibles
- au-dessus, les gains hors twist sont limites voire nuls

Ce detail influence fortement le ressenti skill-based.

## 11. Scoring et stats

`RunStatsSystem` calcule :

- score total
- shards landees
- distance en metres
- pieces collectees
- ennemis tues
- plus longue fenetre de momentum
- splits `10`, `100`, `1000`

Regle de score actuelle :

- landing sur shard : `+1`
- ennemi tue : `+5`
- piece ramassee : `+2`
- chaque gain est multiplie par `1 + momentumGauge`

Persistance locale :

- best score
- best shards
- best distance
- best coins
- best kills
- best longest momentum
- best split times

## 12. Systeme roguelite

### 12.1 Structure

`roguelite.ts` definit :

- les raretes
- les categories
- les slots de modules
- les blueprints passifs
- les blueprints modules
- le runtime `RunUpgradeState`
- le calcul des offers
- l'application d'items au run

### 12.2 Deux familles d'items

1. `passive`
   - utilitaires sans rendu sur le bateau
   - dans la pratique, generes en une seule version `common`

2. `module`
   - add-ons visibles sur le bateau et sur le dock bas-gauche
   - gardent les raretes `common -> legendary`

### 12.3 Items utilitaires actuels

Liste actuelle :

- `Gouvernail / Helmwheel`
- `Bourse du capitalisme / Capital Purse`
- `Déflation primate / Primate Deflation`
- `Longue-Vue / Spyglass`
- `Totem du Déni / Denial Totem`
- `Trèfle à 3 feuilles et demi / Three-and-a-Half Leaf Clover`
- `L’Angle-mort / Blind Angle`
- `Amortisseurs / Shock Absorbers`
- `Abonnement Prémium / Premium Card`
- `Ceinture d’orbite / Orbit Belt`

Effets fonctionnels reels :

- retention du momentum
- bonus pieces
- reduction prix shop
- zoom camera de base et bonus zoom momentum
- prevention des `miss`
- chance reward shard
- extension des fenetres de grade
- mitigation des mauvais atterrissages
- chance de shop
- recentrage vertical en airborne

### 12.4 Modules actifs actuels

Slots modules :

- `plane`
- `wings`
- `propulseur`
- `reacteur_front`
- `reacteur_back`
- `shield`
- `souffleur`
- `wrapper`
- `magnet`
- `big_canon`
- `front_canon`
- `grappin`

### 12.5 Remplacement et rarete

Regle actuelle :

- un passif remplace toute ancienne version du meme `baseId`
- un module remplace l'ancien module du meme slot
- seules les versions de rarete strictement superieure sont proposées pour les modules deja possedes

### 12.6 Runtime des modules

Chaque module peut avoir :

- `cooldownRemaining`
- `chargesCurrent`
- `chargesMax`
- `gaugeCurrent`
- `gaugeMax`
- `regenDelayRemaining`

Ce runtime vit dans `runUpgrades.moduleRuntime`.

### 12.7 Offers

`buildUpgradeOffers(score, runState)` :

- choisit 3 blueprints eligibles
- filtre par `unlockScore`
- filtre par rarete accessible selon le score
- interdit les doublons de `baseId`
- n'offre pas de rarete inferieure a celle deja possedee

### 12.8 Milestones et offers

Sur milestone :

- 3 offers sont generees
- chaque offer devient une branche reward physique
- le choix du joueur modifie ensuite le futur chemin

### 12.9 Application d'un item

`applyItemToRunState()` :

- supprime l'ancien item equivalent
- insere le nouvel item dans `ownedOrder`
- met a jour `passives` ou `modules`
- recree le runtime de module si necessaire
- recompute tous les modifiers

## 13. Detail du comportement des modules

### 13.1 Planeur

- passif visuel
- aucun cooldown
- aucune charge
- stabilise et ralentit la chute
- module visible sur le bateau

### 13.2 Ailes

- systeme a charges par saut
- boost diagonal vers l'avant et le haut
- animation 8 frames en activation

### 13.3 Propulseur

- systeme a charges par saut
- dash vers l'avant en air
- participe au package de propulsion airborne

### 13.4 Reacteur avant

- charges
- accentue la composante verticale de l'impulsion

### 13.5 Reacteur arriere

- charges
- ajoute poussée avant + vers le haut

### 13.6 Bouclier

- pas de charges visuelles multiples
- tue un ennemi au contact
- entre en cooldown
- joue un flash de hit puis de recharge

### 13.7 Souffleur

- jauge, pas charges discretes
- fonctionne sur shard et en air tant que la touche bas/charge est maintenue
- brule sa jauge
- respecte `regenDelay` et `emptyDelay`
- garde une lecture HUD specifique

### 13.8 Wrapper

- choisit la plus petite shard valide dans sa portee
- attend 2 secondes avant teleport
- conserve une phase visuelle prolongee avant/apres
- le cooldown ne commence qu'apres la fin visuelle

### 13.9 Magnet

- passif
- augmente le radius de collecte
- pieces dans le radius sont directement recuperees
- radius monde visible quand equipe et pret

### 13.10 Big Canon

- auto-fire radial
- tue un ennemi dans une zone autour du joueur
- cooldown runtime
- projectile visuel ponctuel

### 13.11 Front Canon

- auto-fire sur coupe du laser
- detection par distance laterale au rayon
- laser frontal fin visible seulement quand pret

### 13.12 Grappin

- tir manuel par action haute
- peut forcer le joueur en airborne si lance depuis une shard
- `launch -> hooked -> landing -> idle`
- pendant `hooked`
  - maintien haut = retractation + traction
  - maintien charge/bas peut combiner avec propulsion
- la corde ne s'allonge plus une fois lockee
- le cooldown ne commence qu'apres la phase de retrait

## 14. Cooldowns, disponibilites et synchronisation

Le projet a recentre la logique de disponibilite autour de `GameSessionController` :

- `isWrapperBusy()`
- `isWrapperAvailable()`
- `isGrappleBusy()`
- `isGrappleAvailable()`
- `getDisplayedCooldownRatio()`

Philosophie actuelle :

- un item peut etre logiquement indisponible meme si son `cooldownRemaining` est a zero, s'il est encore dans une phase "busy" visuelle ou d'execution
- le HUD doit donc lire la meme source de verite que le gameplay

Exemples :

- le wrapper n'est pas disponible pendant la sequence pre-teleport et post-teleport
- le grappin reste indisponible pendant `launch`, `hooked`, `landing`, puis seulement ensuite entre en cooldown pur

## 15. Shop

### 15.1 Apparition

Le shop peut venir :

- d'un event planifie
- d'une apparition garantie
- d'une apparition probabiliste

### 15.2 Runtime

`ShopSystem` :

- construit 3 offers
- calcule leur prix via rarete + stackCount + discount
- place 3 meshes orbitaux autour de la shard shop

### 15.3 Verrouillage de la session

Quand le joueur est dans un shop :

- `choiceMode = shop_orbit`
- `state = upgrade_branching`
- si le joueur est attache, la simulation est figee
- camera et gameplay sont geles
- barre momentum et boat HUD bas sont masques
- il faut cliquer `Retour` pour fermer

### 15.4 Achat

Le shop UI fournit 3 boutons cliquables seulement si le joueur a assez de pieces.

## 16. Ennemis

### 16.1 Rendu

`EnemySystem` :

- pool de sprites
- une seule spritesheet `enemy-basic-spritesheet.png`
- ligne du haut = vivant
- ligne du bas = mort

### 16.2 Spawn logique

Les ennemis viennent uniquement de `enemySlot` sur les nodes runtime.

Ce point est important :
- il n'y a plus de pipeline boss/mini-boss
- il n'y a plus de systeme hostile separe

### 16.3 Mort et rewards

Un ennemi tue :

- donne des pieces
- ajoute du score
- ajoute parfois un petit boost de momentum

## 17. Pieces

`CoinSystem` :

- pool de sprites `pickup-coin-spritesheet.png`
- animation 4 frames
- positions de coin calculees autour des shards par `getCoinWorldPosition()`
- attraction visuelle vers le joueur si le magnet est proche
- collecte reelle instantanee si le joueur entre dans le radius magnet ou passe sur l'angle attache

## 18. Camera gameplay

`CameraRailController` est la camera active du jeu.

### 18.1 Responsabilites

- avance du rail en `x`
- suivi du joueur et du chemin
- suivi vertical amorti
- zoom selon momentum, grandes shards, milestones et choices
- calcul des bornes safe pour la mort

### 18.2 Safe bounds

Le joueur peut mourir :

- s'il est trop a gauche de la safe line camera
- s'il sort des bornes verticales
- s'il sort du champ jouable global `±32`

Le controller corrige aussi les petits viewports en imposant des minima gameplay sur la fenetre utile.

## 19. HUD

### 19.1 HUD haut gauche

Le haut gauche affiche uniquement les utilitaires passifs :

- icone
- nom
- description
- aucun logo de rarete pour les passifs

### 19.2 HUD bas gauche

`GameHUDSystem.renderEquipmentDock()` construit le boat HUD add-ons :

- fond `ui-equipment-dock.svg`
- couches modules superposees
- icones chargees
- etats de charge / gauge / cooldown

Le rendu a connu plusieurs iterations. Aujourd'hui, la logique active est volontairement simplifiee :

- lecture simple par couleur ou ring
- charges conservees logiquement dans le runtime
- cooldowns rendus par une bordure superposee

### 19.3 Barre momentum

La barre momentum du bas utilise 3 assets :

- background
- fill anime 4 frames
- top layer

Le pourcentage texte a ete retire visuellement.

### 19.4 HUD monde

Plusieurs elements sont rendus dans le monde 3D :

- icones d'item sur reward shards
- `?` sur shards speciales
- radii magnet / grap / big canon
- laser du front canon
- corde du grappin

## 20. Indicators monde et radius

### 20.1 Magnet

- radius SVG tournant lentement
- visible seulement si equipe et disponible
- couleurs natives de l'asset

### 20.2 Grap

- radius SVG tournant plus vite
- visible seulement si dispo
- cache en cooldown

### 20.3 Big Canon

- radius statique
- visible seulement si dispo

### 20.4 Front Canon

- pas de radius circulaire
- laser fin frontal

## 21. Grapple rope

Le rendu monde actuel du grappin n'utilise plus un SVG de corde deforme.

Il utilise :

- un `PlaneGeometry(0.03, 1)`
- un material unicolore
- une rotation entre le joueur et la cible
- une scale `y` egale a la distance

Visuellement, c'est un trait/rectangle tres fin.

## 22. Game over et highscores

### 22.1 Resume de run

Le game over affiche :

- score
- distance
- shards landees
- pieces collectees
- ennemis tues
- plus longue duree de momentum
- equipements trouves

### 22.2 Leaderboard global

Le leaderboard global du HUD :

- persiste en local
- n'accepte qu'une entree par nom
- n'autorise l'enregistrement que si le score bat le record deja enregistre de ce nom ou si aucun score n'existe

Le joueur voit aussi ses records personnels detailles et les badges `Nouveau / New`.

## 23. Integration mini-jeu / portfolio

Le mini-jeu reutilise `OrbitWorldSystem` comme pipeline de rendu des shards :

- `beginExternalLayoutTransition()`
- `setExternalLayoutProgress()`
- `setExternalLayoutPositions()`
- `clearExternalLayout()`

Ce couplage est puissant visuellement, mais cree aussi une forte dependance entre logique gameplay et logique portfolio.

## 24. Forces de l'architecture actuelle

- boucle de jeu riche deja en place
- generation data-driven par patterns
- vrai systeme de milestones et de branches
- contenu roguelite assez avancé
- pipeline HUD et monde deja dense
- integration portfolio -> mini-jeu spectaculaire

## 25. Limites et dette technique actuelle

### 25.1 Concentration excessive dans `GameSessionController`

Le fichier porte a lui seul :

- simulation joueur
- items
- cooldowns
- event flow
- enemy contact
- coin collection
- range indicators
- rope rendering
- HUD snapshot
- visuals monde

Il est devenu le principal point de fragilite.

### 25.2 Couplage fort entre simulation et rendu

Le runtime calcule directement :

- positions gameplay
- etats d'animation
- etats HUD
- visuels monde

Cela rend les regressions faciles lors de petites modifs.

### 25.3 Presence de systemes legacy

Le repo contient encore :

- ancienne boucle de jeu
- ancienne camera gameplay
- ancien path buffer

Ils ne cassent pas le run actuel, mais brouillent la lecture pour un recodage.

### 25.4 Donnees gameplay parfois hybrides

Certaines regles sont actuellement partagees entre :

- data dans `roguelite.ts`
- logique hardcodee dans `GameSessionController`
- choix camera dans `CameraRailController`
- contraintes generation dans `GamePathSystem`

La reproduction exacte du jeu devra conserver ces arbitrages, tout en les isolant mieux.

## 26. Tests existants

Le projet contient notamment :

- [src/game/roguelite.test.ts](/home/bheall/workspace/Portfolio/src/game/roguelite.test.ts)
- [src/game/PatternLibrary.test.ts](/home/bheall/workspace/Portfolio/src/game/PatternLibrary.test.ts)
- [src/game/pathBufferManager.test.ts](/home/bheall/workspace/Portfolio/src/game/pathBufferManager.test.ts)
- [src/portfolio/SecretSlotSystem.test.ts](/home/bheall/workspace/Portfolio/src/portfolio/SecretSlotSystem.test.ts)

Ils couvrent une partie des regles de contenu et de structure, mais pas toute la richesse runtime du jeu actuel.

## 27. Resume executif

Le jeu actuel est deja un runner/orbiter hybride tres riche, structure autour de :

- un path procedural a patterns
- un joueur orbitant autour de shards deformables
- un systeme roguelite combine passifs + modules visibles
- des milestones physiques avec branches de reward
- un shop event-driven
- un momentum qui pilote score, vitesse, saut et camera
- une integration directe avec le portfolio 3D

La future reconstruction devra absolument preserver :

- la sensation d'orbite + lancement + recapture
- la generation multi-lanes / micro-shards / milestones
- les timings reels des items et de leurs etats visuels
- le lien fort entre momentum, grades, camera et score
- la qualite de presentation de la transition portfolio -> jeu
