# Vibe code et architecture cible pour recoder le jeu proprement

## 1. Intention du document

Ce document sert de base de reconstruction pour refaire le meme jeu avec toutes ses fonctionnalites actuelles, mais sur des fondations plus propres, plus modulaires et plus stables.

Le but est de :

- recreer le meme jeu
- conserver les sensations et le contenu
- garder les milestones, patterns, shops, rewards, modules, momentum, HUD et transitions
- repartir sur une architecture propre
- preparer le code a l'evolution future sans accumuler de dette structurelle

Ce document concerne seulement le jeu.

## 2. Vision cible

On veut reconstruire :

- le meme design de jeu
- la meme grammaire de navigation entre shards
- les memes familles d'items
- le meme lien fort entre momentum, camera et scoring

Mais avec :

- une simulation separee du rendu
- une vraie architecture de gameplay modulaire
- une generation deterministe testable
- un pipeline HUD/FX propre
- des animations 3D et physiques mieux pensees des le debut

## 3. Vibe code: principes de reconstruction

### 3.1 Ce que le code doit faire ressentir

Le jeu doit donner une sensation de :

- vitesse lisible
- inertie legere mais controlee
- lecture immediate des risques et opportunites
- richesse systemique sans confusion
- spectacle 3D lisible sans briser la precision du gameplay

### 3.2 Style de code vise

Le code doit etre :

- data-driven
- testable sans renderer
- compose de sous-systemes petits et ciblés
- explicite sur les timings et les etats
- sans logique critique enfouie dans un mega-controller

### 3.3 Regle d'or

Une regle gameplay ne doit exister qu'a un seul endroit.

Exemples :

- cooldown d'un item
- regle de milestone
- validite d'un teleport target
- score par evenement
- regle de generation de shop

## 4. Architecture cible recommandee

## 4.1 Couches

### A. App shell

Responsable de :

- modes globaux
- transitions de scene
- liaison portfolio <-> jeu
- lifecycle general

### B. Game simulation

Responsable de :

- etat canonique du run
- mise a jour deterministe par tick
- aucune dependance DOM
- aucune dependance renderer haut niveau

### C. Game presentation

Responsable de :

- conversion de l'etat simulation en vues
- rendu monde 3D
- rendu HUD
- animations derivees

### D. Content/data

Responsable de :

- items
- patterns
- tables de difficulte
- milestones
- shops
- tuning

## 4.2 Decoupage de dossiers recommande

```text
src/game2/
  app/
    GameOrchestrator.ts
    GameModeState.ts
    GameTransitionController.ts
  simulation/
    GameRuntime.ts
    GameState.ts
    GameTickContext.ts
    systems/
      PlayerOrbitSystem.ts
      PlayerAirborneSystem.ts
      LandingSystem.ts
      MomentumSystem.ts
      ItemRuntimeSystem.ts
      EventSystem.ts
      RewardBranchSystem.ts
      ShopRuntimeSystem.ts
      EnemyRuntimeSystem.ts
      CoinRuntimeSystem.ts
      ScoreSystem.ts
      FailConditionSystem.ts
    generation/
      PathGenerator.ts
      PatternLibrary.ts
      PatternSelector.ts
      PatternExpander.ts
      PatternValidator.ts
      EventPlanner.ts
    items/
      ItemCatalog.ts
      ItemDefinitions.ts
      ModuleBehaviors.ts
      PassiveBehaviors.ts
  presentation/
    world/
      GameWorldRenderer.ts
      ShardFieldRenderer.ts
      PlayerRenderer.ts
      EnemyRenderer.ts
      CoinRenderer.ts
      IndicatorRenderer.ts
      ProjectileRenderer.ts
    hud/
      HudController.ts
      MomentumHud.ts
      PassiveHud.ts
      EquipmentHud.ts
      ShopHud.ts
      GameOverHud.ts
    camera/
      GameCameraRig.ts
  content/
    items.ts
    patterns.ts
    difficulty.ts
    rewards.ts
  tests/
```

## 5. Etat canonique du jeu

## 5.1 Etat racine propose

```ts
interface GameState {
  session: SessionState;
  player: PlayerState;
  path: PathState;
  items: ItemState;
  events: EventState;
  camera: CameraState;
  stats: StatsState;
  ui: UiState;
  rng: RngState;
}
```

## 5.2 SessionState

```ts
type SessionMode =
  | 'transition_in'
  | 'running'
  | 'reward_choice'
  | 'shop'
  | 'game_over'
  | 'transition_out';
```

Contient :

- temps de run
- index de shard attachee
- si gameplay fige
- raison de game over

## 5.3 PlayerState

```ts
type PlayerMovementMode =
  | 'attached'
  | 'charging'
  | 'airborne'
  | 'grappling'
  | 'dead';
```

Contient :

- position
- vitesse
- angle d'orbite
- direction orbitale
- charge courante
- timers visuels
- flags de launch/landing

## 5.4 PathState

Contient :

- liste des nodes logiques
- fenetre visible
- index du prochain spawn
- milestones precalculees
- futurs rewards branches

## 5.5 ItemState

Contient :

- modules equipes
- passifs acquis
- runtime par module
- disponibilite logique
- cooldowns
- jauges
- charges
- etats d'animation derives si necessaire

## 6. Etat des items: modele propre

## 6.1 Separation forte contenu / runtime

### Definition immutable

```ts
interface ItemDefinition {
  id: string;
  baseId: string;
  family: 'passive' | 'module';
  slot?: ModuleSlot;
  rarity?: ModuleRarity;
  behaviorId: string;
  tuning: Record<string, number | boolean>;
}
```

### Runtime mutable

```ts
interface ModuleRuntime {
  slot: ModuleSlot;
  itemId: string;
  availability: 'ready' | 'busy' | 'cooldown';
  cooldown: CooldownState | null;
  charges: ChargesState | null;
  resource: ResourceState | null;
  animation: ModuleAnimationState;
}
```

## 6.2 Regle cle

La disponibilite d'un item doit etre un concept explicite, pas deduit a moitie depuis 4 booleens.

Exemple :

- `busy`
  - item occupe dans une sequence active
- `cooldown`
  - item rechargement pur
- `ready`
  - item reutilisable maintenant

Le HUD et le gameplay doivent lire exactement cet etat.

## 7. Generation de chemin: architecture cible

## 7.1 Pipeline recommande

1. `PatternSelector`
   - choisit une macro-pattern compatible avec la difficulte

2. `PatternInstantiator`
   - convertit templates en nodes

3. `PatternExpander`
   - densifie, cree companions, ajoute micro-shards

4. `MilestoneInjector`
   - reserve les grosses shards milestones

5. `EventPlanner`
   - place rewards et shops avec garanties

6. `PathValidator`
   - verifie collisions, verticalite, distances

7. `PathNormalizer`
   - reindexe tout et recalcule pathDistance

## 7.2 Pourquoi

Aujourd'hui, `GamePathSystem` fait tout. Pour la reconstruction, on veut des etapes clairement testables.

## 7.3 Determinisme

Le nouveau projet doit utiliser :

- un RNG seedable unique par run
- aucun appel direct a `Math.random()` dans la simulation
- possibilite de rejouer une seed

## 8. Shards et physique de contact

## 8.1 Ce qu'on veut garder

- round / oval / triangular
- orbite autour de la vraie forme
- deformations de surface
- vagues d'impact
- sensation de contact vivant

## 8.2 Ce qu'on veut ameliorer

Le jeu actuel melange geometrie gameplay et rendu. Pour repartir proprement :

- la forme gameplay doit etre un "surface sampler" abstrait
- le rendu 3D peut deformer visuellement davantage
- la capture/attachment doit lire un solveur kinematique stable

## 8.3 Strategie recommandee

Creer une interface unique :

```ts
interface SurfaceProfile {
  sample(angle: number, time: number): {
    localPosition: Vec2;
    tangent: Vec2;
    normal: Vec2;
    curvature: number;
  };
}
```

Chaque shard fournit son `SurfaceProfile`.

Avantages :

- l'orbite, la capture, les coins et les ennemis lisent la meme source
- on peut changer le rendu sans casser la physique

## 8.4 Physique cible

Ne pas introduire une vraie physique rigide generale si on veut garder le controle arcade.

Recommandation :

- simulation kinematique custom
- gravite, traction, impulsions et contraintes codifiees explicitement
- collisions simples sphere/segment/surface sampler

Cela donnera une base plus stable qu'un moteur physique generaliste pour ce type de gameplay.

## 9. Camera cible

## 9.1 Camera gameplay

La camera doit etre un rig separe, avec :

- rail horizontal
- focus vertical amorti
- zoom base
- zoom momentum
- zoom contextualise
  - milestone
  - reward choice
  - shop
  - huge shards

## 9.2 API cible

```ts
interface CameraRigInput {
  sessionMode: SessionMode;
  player: PlayerViewState;
  pathWindow: VisiblePathWindow;
  momentum: number;
  contextZoom: number;
}
```

Le rig renvoie :

- position
- lookAt
- safe bounds

## 9.3 Transition portfolio -> jeu

La transition doit etre un controller dedie, pas un patch dans le renderer.

Phases conseillees :

1. alignement frontal
2. rotation autour du pivot
3. prise de controle par le rig gameplay

## 10. HUD cible

## 10.1 Regle generale

Le HUD ne calcule aucune regle gameplay.

Il recoit un `HudViewModel`.

## 10.2 View model recommande

```ts
interface HudViewModel {
  momentum: MomentumHudModel;
  passives: PassiveHudItem[];
  modules: ModuleHudItem[];
  branchChoices: BranchHudModel | null;
  shop: ShopHudModel | null;
  gameOver: GameOverHudModel | null;
}
```

## 10.3 Modules HUD

Pour chaque module :

- `ready`
- `busy`
- `cooldown`
- `chargesRemaining`
- `resourceRatio`
- `iconColor`
- `cooldownVisualProgress`

Le presenter convertit l'etat logique en lecture visuelle.

## 10.4 Rendu add-ons bas gauche

Le dock du bateau doit rester modulaire, mais il faut le reconstruire proprement :

- un parser SVG unique en cache
- un pipeline de bounds stable
- une logique simple par type de lecture
  - cooldown border
  - icon full fill
  - gauge fill
  - color by rarity

Il ne faut plus iterer a travers 4 strategies contradictoires de masque/fill/ring.

## 11. Ennemi, pieces, shop

## 11.1 Pieces

Systeme cible :

- `CoinRuntimeSystem`
  - slots logiques
  - collecte
  - magnet
- `CoinRenderer`
  - pooling sprite
  - attraction visuelle

## 11.2 Ennemis

Systeme cible :

- `EnemyRuntimeSystem`
  - spawn depuis node
  - tiers
  - conditions de kill
  - rewards
- `EnemyRenderer`
  - spritesheet unique
  - timings d'apparition/mort

## 11.3 Shop

Le shop doit devenir un vrai mini-state local :

```ts
interface ShopState {
  open: boolean;
  offers: ShopOfferState[];
  frozenAtNodeIndex: number | null;
}
```

Quand `shop.open = true` :

- gameplay fige
- HUD bas masque
- camera figee
- seules les actions du shop sont autorisees

## 12. Modules et comportements specifiques

## 12.1 Strategie

Chaque module actif devrait etre implemente comme un petit comportement pur :

```ts
interface ModuleBehavior {
  onEquip?(state: GameState): void;
  onTick?(state: GameState, input: InputFrame, dt: number): void;
  onAirAction?(state: GameState): boolean;
  onLanding?(state: GameState): void;
  onEnemyContact?(state: GameState, enemyId: string): ModuleInterceptionResult;
}
```

## 12.2 Pourquoi

Aujourd'hui, le gros switch est centralise dans `GameSessionController`.

Dans le nouveau projet :

- `GrappinBehavior`
- `WrapperBehavior`
- `ShieldBehavior`
- `SouffleurBehavior`
- `BigCanonBehavior`
- `FrontCanonBehavior`
- `PropulseurBehavior`
- `WingsBehavior`

Chaque module gere ses timings et ses disponibilites.

## 13. Systeme d'animation 3D

## 13.1 Objectif

Le user veut une version recreee avec :

- nouvelles animations 3D
- meilleure sensation de physique
- rendu plus moderne

## 13.2 Recommandation

Conserver le gameplay arcade, mais enrichir la presentation :

- animation additive de coque
- oscillation/squash contextuels
- billboards modules et projectiles plus propres
- impact waves plus structurees
- decals/lines d'impulsion
- trail base sur spline ou ribbon

## 13.3 Regle

Les animations ne doivent jamais etre la source de verite gameplay.

La simulation decide.
Le rendu interprete.

## 14. Portfolio et jeu: limite architecturale recommande

Le prochain projet doit minimiser le couplage entre :

- monde portfolio
- runtime gameplay

Recommandation :

- garder des transitions visuelles fortes
- mais ne pas reutiliser la meme structure de scene comme source canonique du gameplay

Mieux :

- un `PortfolioWorld`
- un `GameWorld`
- un `TransitionBridge`

Le bridge peut echantillonner l'un et amener vers l'autre, sans melanger les responsabilites.

## 15. Migration conceptuelle depuis l'existant

## 15.1 Ce qu'il faut reprendre a l'identique

- catalogue d'items
- raretes modules
- utilitaires uniques
- milestones
- shops guarantees
- rewards branches
- score et momentum
- ennemis/coins
- regles de disponibilite des modules

## 15.2 Ce qu'il faut repenser

- mega-controller runtime
- couplage HUD <-> gameplay
- couplage portfolio <-> gameplay
- coexistence d'anciens pipelines non utilises
- systeme SVG add-ons empile au fil des correctifs

## 16. Checklist de reconstruction etape par etape

## Phase 0 — Preparation

- [ ] Geler une reference jouable de l'existant
- [ ] Exporter une liste des comportements a parite stricte
- [ ] Capturer une video ou gifs des timings critiques
- [ ] Lister tous les assets utilises reellement
- [ ] Isoler les fichiers legacy a ne pas recopier

## Phase 1 — Base technique

- [ ] Initialiser un nouveau sous-projet jeu propre
- [ ] Mettre en place TypeScript strict
- [ ] Definir l'etat canonique du run
- [ ] Definir le RNG seedable unique
- [ ] Definir la boucle `tick(dt)` pure
- [ ] Definir les interfaces `renderer adapters`

## Phase 2 — Contenu data-driven

- [ ] Migrer la table de difficulte
- [ ] Migrer la librairie de patterns
- [ ] Migrer le catalogue d'items
- [ ] Migrer les milestones
- [ ] Migrer les rewards et shops

## Phase 3 — Generation du chemin

- [ ] Refaire `PatternSelector`
- [ ] Refaire `PatternInstantiator`
- [ ] Refaire `PatternExpander`
- [ ] Refaire `MilestoneInjector`
- [ ] Refaire `EventPlanner`
- [ ] Refaire `PathValidator`
- [ ] Ajouter tests unitaires deterministes

## Phase 4 — Mouvement du joueur

- [ ] Refaire l'etat `attached`
- [ ] Refaire la charge
- [ ] Refaire le launch
- [ ] Refaire la capture de shard
- [ ] Refaire le solveur airborne
- [ ] Refaire l'orbite sur round/oval/triangular
- [ ] Refaire les vagues d'impact

## Phase 5 — Momentum et landing

- [ ] Refaire decay/gain momentum
- [ ] Refaire grades `miss/good/super/perfect`
- [ ] Refaire `twist`
- [ ] Refaire bonuses camera/speed/jump lies au momentum
- [ ] Refaire HUD feedback de landing

## Phase 6 — Items passifs

- [ ] Implementer les 10 utilitaires exacts
- [ ] Brancher leurs effets dans les systemes cibles
- [ ] Tester chaque effet en isolation
- [ ] Verifier absence de doublons

## Phase 7 — Modules actifs

- [ ] Implementer `Plane`
- [ ] Implementer `Wings`
- [ ] Implementer `Propulseur`
- [ ] Implementer `Reacteur Front`
- [ ] Implementer `Reacteur Back`
- [ ] Implementer `Shield`
- [ ] Implementer `Souffleur`
- [ ] Implementer `Wrapper`
- [ ] Implementer `Magnet`
- [ ] Implementer `Big Canon`
- [ ] Implementer `Front Canon`
- [ ] Implementer `Grappin`

## Phase 8 — Coins, ennemis, auto-fire

- [ ] Refaire coins runtime
- [ ] Refaire magnet collection
- [ ] Refaire pipeline ennemi unique
- [ ] Refaire kill/contact/shield
- [ ] Refaire auto-fire canons

## Phase 9 — Rewards, milestones, shop

- [ ] Refaire rewards branches
- [ ] Refaire replacement du futur chemin
- [ ] Refaire apparition shop garantie
- [ ] Refaire UI shop figee
- [ ] Refaire economy et prix

## Phase 10 — Camera

- [ ] Refaire rig gameplay
- [ ] Refaire safe bounds
- [ ] Refaire zoom momentum
- [ ] Refaire contextual zoom milestone/shop
- [ ] Refaire entree portfolio -> jeu

## Phase 11 — HUD

- [ ] Refaire top-left passives
- [ ] Refaire bottom-left add-on dock
- [ ] Refaire momentum bar
- [ ] Refaire branch labels
- [ ] Refaire game over
- [ ] Refaire leaderboard local

## Phase 12 — Rendu monde

- [ ] Refaire shaders/deformations shards gameplay
- [ ] Refaire radii magnet/grap/big canon
- [ ] Refaire laser front canon
- [ ] Refaire rope du grappin
- [ ] Refaire projectiles
- [ ] Refaire icones reward shards

## Phase 13 — Parite fonctionnelle

- [ ] Ecrire une checklist de parite sur tous les comportements critiques
- [ ] Comparer timings de cooldowns et disponibilites
- [ ] Comparer scoring
- [ ] Comparer generation shops/rewards
- [ ] Comparer camera et momentum
- [ ] Comparer lisibilite du HUD

## Phase 14 — Nettoyage final

- [ ] Supprimer tous les bridges temporaires
- [ ] Supprimer toute logique legacy recopiee inutilement
- [ ] Documenter l'architecture finale
- [ ] Ajouter tests de non-regression

## 17. Ordre de priorite recommande pour un vrai recodage

Si on veut avancer vite sans se perdre :

1. simulation du chemin et des milestones
2. orbite + launch + capture
3. momentum + grades + camera
4. coins + ennemis + game over
5. shop + rewards + items passifs
6. modules actifs un par un
7. HUD complet
8. polish visuel 3D
9. integration portfolio

## 18. Conclusion

Le projet actuel prouve deja la richesse du design. La reconstruction ne doit pas chercher a reinventer le jeu, mais a lui donner une architecture qui supporte naturellement :

- la croissance du contenu
- les nouveaux modules
- les effets visuels plus ambitieux
- une physique et des animations 3D plus propres
- des regressions beaucoup plus rares

Le bon cap est donc :

- reproduire a l'identique les regles de jeu
- separer strictement simulation, presentation et contenu
- puis seulement sublimer le rendu

