/**
 * Projects.js - Données des projets avec facettes
 * Portfolio 3D V2.0
 * 
 * Chaque shard possède 3 facettes (faces) avec contenu différent
 */

export const projects = [
  {
    id: 1,
    title: "Présentation",
    facettes: [
      {
        id: 1,
        title: "Moi",
        category: "presentation",
        description: "Développeur créatif passionné par l'innovation",
        longDescription: "Je suis un développeur full-stack avec une passion pour les expériences interactives et immersives. Mon expertise s'étend du développement web aux productions vidéo.",
        technologies: ["JavaScript", "Three.js", "React", "Node.js", "Creative Coding"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: "https://github.com/votre-username",
          demo: null,
          video: null
        },
        featured: true
      },
      {
        id: 2,
        title: "Compétences",
        category: "skills",
        description: "Stack technique et expertise",
        longDescription: "Maîtrise du développement front-end et back-end, avec une spécialisation en WebGL et expériences 3D interactives.",
        technologies: ["WebGL", "GSAP", "Ruby on Rails", "PostgreSQL", "Docker"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: null,
          demo: null,
          video: null
        },
        featured: false
      },
      {
        id: 3,
        title: "Contact",
        category: "contact",
        description: "Travaillons ensemble",
        longDescription: "Disponible pour des projets freelance, des collaborations créatives ou des opportunités d'emploi.",
        technologies: ["Email", "LinkedIn", "GitHub", "Discord"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: "https://github.com/votre-username",
          demo: "mailto:contact@example.com",
          video: null
        },
        featured: false
      }
    ],
    activeFacette: 0,
    date: "2024-03"
  },
  {
    id: 2,
    title: "Tono Discord Bot",
    facettes: [
      {
        id: 1,
        title: "Tono Discord Bot",
        category: "dev",
        description: "Bot Discord interactif avec système de jeu RPG complet",
        longDescription: "Bot Discord avancé intégrant un système de jeu RPG avec combat, navigation, inventaire et interactions PNJ.",
        technologies: ["JavaScript", "Node.js", "Discord.js"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: "https://github.com/votre-username/tono-bot",
          demo: null,
          video: null
        },
        featured: true
      },
      {
        id: 2,
        title: "Tono API",
        category: "dev",
        description: "Backend Rails pour le système de jeu",
        longDescription: "API REST robuste gérant la logique métier, les données de jeu et les interactions en temps réel.",
        technologies: ["Ruby on Rails", "PostgreSQL", "Redis", "Sidekiq"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: "https://github.com/votre-username/tono-api",
          demo: null,
          video: null
        },
        featured: false
      },
      {
        id: 3,
        title: "Système de Combat",
        category: "dev",
        description: "Mécanique de combat tour par tour",
        longDescription: "Système de combat complet avec éléments, buffs/debuffs, compétences spéciales et IA adaptative.",
        technologies: ["Game Design", "State Machine", "AI", "Balancing"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: null,
          demo: null,
          video: "https://youtube.com/watch?v=example"
        },
        featured: false
      }
    ],
    activeFacette: 0,
    date: "2024-01"
  },
  {
    id: 3,
    title: "Map Editor 3D",
    facettes: [
      {
        id: 1,
        title: "Map Editor 3D",
        category: "dev",
        description: "Éditeur de cartes interactif avec rendu Voronoi",
        longDescription: "Éditeur de cartes procédurales utilisant l'algorithme de Voronoi pour générer des îles.",
        technologies: ["JavaScript", "Three.js", "Voronoi"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: "https://github.com/votre-username/map-editor",
          demo: "https://demo.map-editor.com",
          video: null
        },
        featured: true
      },
      {
        id: 2,
        title: "Génération Procédurale",
        category: "dev",
        description: "Algorithmes de génération de terrain",
        longDescription: "Implémentation d'algorithmes Voronoi, Delaunay et bruit de Perlin pour la génération de cartes.",
        technologies: ["Voronoi", "Delaunay", "Perlin Noise", "SVG"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: null,
          demo: null,
          video: null
        },
        featured: false
      },
      {
        id: 3,
        title: "Interface Utilisateur",
        category: "graphisme",
        description: "Design de l'interface d'édition",
        longDescription: "Interface intuitive avec panneaux modulaires, prévisualisations temps réel et export multi-format.",
        technologies: ["UI/UX Design", "Canvas API", "CSS Grid"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: null,
          demo: null,
          video: null
        },
        featured: false
      }
    ],
    activeFacette: 0,
    date: "2024-02"
  },
  {
    id: 4,
    title: "Court-métrage Expérimental",
    facettes: [
      {
        id: 1,
        title: "Le Miroir",
        category: "realisation",
        description: "Film expérimental sur le thème du miroir",
        longDescription: "Court-métrage explorant les thèmes de l'identité et du reflet à travers une narration non-linéaire.",
        technologies: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: null,
          demo: null,
          video: "https://youtube.com/watch?v=example"
        },
        featured: true
      },
      {
        id: 2,
        title: "Direction Artistique",
        category: "graphisme",
        description: "Choix visuels et esthétiques",
        longDescription: "Création d'un univers visuel unique mêlant symbolisme et atmosphère onirique.",
        technologies: ["Storyboarding", "Color Grading", "Cinematography"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: null,
          demo: null,
          video: null
        },
        featured: false
      },
      {
        id: 3,
        title: "Post-Production",
        category: "video",
        description: "Montage et effets visuels",
        longDescription: "Montage narratif avec effets de transition innovants et sound design immersif.",
        technologies: ["VFX", "Sound Design", "Color Grading"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: null,
          demo: null,
          video: null
        },
        featured: false
      }
    ],
    activeFacette: 0,
    date: "2023-11"
  },
  {
    id: 5,
    title: "Identité Visuelle Startup",
    facettes: [
      {
        id: 1,
        title: "Branding Complet",
        category: "graphisme",
        description: "Création d'identité visuelle complète",
        longDescription: "Design d'identité de marque incluant logo, charte graphique et supports de communication.",
        technologies: ["Illustrator", "Photoshop", "Figma"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: null,
          demo: "https://behance.net/example",
          video: null
        },
        featured: true
      },
      {
        id: 2,
        title: "Logo & Déclinaisons",
        category: "graphisme",
        description: "Création du logo et ses variantes",
        longDescription: "Logo principal avec déclinaisons pour différents supports : web, print, réseaux sociaux.",
        technologies: ["Vector Graphics", "Typography", "Color Theory"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: null,
          demo: null,
          video: null
        },
        featured: false
      },
      {
        id: 3,
        title: "Templates Social Media",
        category: "graphisme",
        description: "Templates pour réseaux sociaux",
        longDescription: "Collection de templates Instagram, LinkedIn et Twitter cohérents avec l'identité visuelle.",
        technologies: ["Figma", "Canva", "Adobe XD"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: null,
          demo: null,
          video: null
        },
        featured: false
      }
    ],
    activeFacette: 0,
    date: "2024-01"
  },
  {
    id: 6,
    title: "Portfolio 3D Interactif",
    facettes: [
      {
        id: 1,
        title: "Portfolio 3D",
        category: "dev",
        description: "Ce portfolio avec shards en 3D",
        longDescription: "Portfolio immersif utilisant Three.js pour créer une expérience 3D unique avec navigation par scroll.",
        technologies: ["Three.js", "GSAP", "JavaScript ES6+", "WebGL"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: "https://github.com/votre-username/portfolio",
          demo: "https://votre-portfolio.com",
          video: null
        },
        featured: true
      },
      {
        id: 2,
        title: "Architecture Technique",
        category: "dev",
        description: "Structure modulaire et optimisée",
        longDescription: "Architecture basée sur des modules ES6, scroll virtuel, et animations pilotées par timeline GSAP.",
        technologies: ["ES6 Modules", "Virtual Scroll", "Timeline Animation"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: null,
          demo: null,
          video: null
        },
        featured: false
      },
      {
        id: 3,
        title: "Système de Facettes",
        category: "dev",
        description: "Innovation UX : 3 faces par projet",
        longDescription: "Chaque shard possède 3 facettes rotatives offrant différentes perspectives sur un même projet.",
        technologies: ["3D Math", "Quaternions", "UX Design"],
        images: ["assets/images/projects/placeholder.svg"],
        links: {
          github: null,
          demo: null,
          video: null
        },
        featured: false
      }
    ],
    activeFacette: 0,
    date: "2024-03"
  }
];

// ==========================================
// FONCTIONS UTILITAIRES
// ==========================================

export function getProjectById(id) {
  return projects.find(p => p.id === id);
}

export function getProjectsByCategory(category) {
  return projects.filter(p => 
    p.facettes.some(f => f.category === category)
  );
}

export function getFeaturedProjects() {
  return projects.filter(p => 
    p.facettes.some(f => f.featured)
  );
}

export function getActiveFacette(project) {
  return project.facettes[project.activeFacette];
}

export function getNextFacetteIndex(project) {
  return (project.activeFacette + 1) % project.facettes.length;
}

export function getPrevFacetteIndex(project) {
  return (project.activeFacette - 1 + project.facettes.length) % project.facettes.length;
}

export function getTotalShards() {
  return projects.length;
}
