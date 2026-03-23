# CSS Architecture

Le point d'entree actif reste [src/main.ts](/home/bheall/workspace/Portfolio/src/main.ts), qui charge `reset.css` puis [src/styles/index.css](/home/bheall/workspace/Portfolio/src/styles/index.css).

## Modules actifs

- [src/styles/core.css](/home/bheall/workspace/Portfolio/src/styles/core.css)
  Contient les variables globales, les themes, les animations partagees, le shell applicatif, la navigation, les overlays globaux et les variables de dimensionnement du HUD du jeu.
- [src/styles/game.css](/home/bheall/workspace/Portfolio/src/styles/game.css)
  Regroupe les styles du mini-jeu, du HUD, des panneaux, du game over, des controles tactiles et du portail Primatrie.
- [src/styles/focus-about.css](/home/bheall/workspace/Portfolio/src/styles/focus-about.css)
  Centralise les styles des couches `focus` et `about`.
- [src/styles/responsive.css](/home/bheall/workspace/Portfolio/src/styles/responsive.css)
  Gere l'adaptation generale tablette/mobile de l'application.
- [src/styles/game-mobile-landscape.css](/home/bheall/workspace/Portfolio/src/styles/game-mobile-landscape.css)
  Fichier dedie au jeu sur petits ecrans horizontaux. Il ajuste les variables de taille pour les SVG, les boutons, les polices, les popups et les controles tactiles.

## Jeu sur petit ecran horizontal

Le comportement du jeu depend de deux couches :

- [src/core/AppController.ts](/home/bheall/workspace/Portfolio/src/core/AppController.ts)
  Le mini-jeu est bloque en portrait sur mobile-like. Le portfolio, lui, est bloque en paysage sur mobile-like.
- [src/game/MobileControlLayoutResolver.ts](/home/bheall/workspace/Portfolio/src/game/MobileControlLayoutResolver.ts)
  Les controles mobiles s'activent surtout pour `pointer: coarse` ou `width <= 900`, avec une logique orientee paysage (`innerWidth >= innerHeight`).

La feuille [src/styles/game-mobile-landscape.css](/home/bheall/workspace/Portfolio/src/styles/game-mobile-landscape.css) s'aligne sur cette logique en paysage compact pour reduire proprement :

- la largeur des SVG du HUD ;
- la taille des boutons d'action ;
- les polices du run strip, du game over et des upgrades ;
- les dimensions des aides, panneaux et controles tactiles.

## CSS injecte dans le JavaScript

Audit realise :

- Les fichiers actifs sous `src/` n'injectent pas de feuilles CSS completes. Ils pilotent surtout des variables CSS et des styles inline via `style.setProperty(...)`.
- Du CSS injecte existe encore dans `assets/js/*`, notamment [assets/js/core/DeviceManager.js](/home/bheall/workspace/Portfolio/assets/js/core/DeviceManager.js) et [assets/js/intro/SimpleIntroManager.js](/home/bheall/workspace/Portfolio/assets/js/intro/SimpleIntroManager.js), mais ces scripts ne font pas partie du runtime principal actuel base sur `src/main.ts`.

Conclusion : la centralisation prioritaire doit rester dans `src/styles/*`, qui est maintenant la source de verite du styling de l'application active.
