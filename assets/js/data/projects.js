/**
 * Projects.js - Données des 10 projets avec 3 facettes V5.0
 * Portfolio 3D
 */

export const projects = [
  {
    id: 1,
    title: "Présentation",
    facettes: [
      { 
        id: 1, title: "Moi", 
        category: "presentation", 
        description: "Développeur créatif passionné par l'innovation", 
        longDescription: "Je suis un développeur full-stack avec une passion pour les expériences interactives et immersives.", 
        technologies: ["JavaScript", "Three.js", "React", "Node.js", "Creative Coding"], 
        images: ["assets/images/projects/placeholder.svg", "assets/images/projects/placeholder.svg", "assets/images/projects/placeholder.svg", "assets/images/projects/placeholder.svg"], 
        links: { github: "https://github.com/votre-username", 
          demo: null, 
          video: null 
        }, 
        featured: true },
      { 
        id: 2, 
        title: "Compétences", 
        category: "skills", 
        description: "Stack technique et expertise", 
        longDescription: "Maîtrise du développement front-end et back-end, avec une spécialisation en WebGL.", 
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
        images: ["assets/images/projects/placeholder.svg", "assets/images/projects/placeholder.svg"], 
        links: { 
          github: "https://github.com/votre-username", 
          demo: "mailto:contact@example.com", 
          video: null 
        }, 
        featured: false 
      }
    ],
    activeFacette: 0, date: "2024-03"
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
          video: null }, 
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
        featured: false },
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
        featured: false }
    ],
    activeFacette: 0, date: "2024-01"
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
          video: null }, 
        featured: true },
      { 
        id: 2, 
        title: "Génération Procédurale", 
        category: "dev", 
        description: "Algorithmes de génération de terrain", 
        longDescription: "Implémentation d'algorithmes Voronoi, Delaunay et bruit de Perlin.", 
        technologies: ["Voronoi", "Delaunay", "Perlin Noise", "SVG"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: null, 
          video: null 
        },
        featured: false },
      { 
        id: 3, 
        title: "Interface Utilisateur", 
        category: "graphisme", 
        description: "Design de l'interface d'édition", 
        longDescription: "Interface intuitive avec panneaux modulaires et prévisualisations temps réel.", 
        technologies: ["UI/UX Design", "Canvas API", "CSS Grid"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: null, 
          video: null 
        }, 
        featured: false }
    ],
    activeFacette: 0, date: "2024-02"
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
        longDescription: "Court-métrage explorant les thèmes de l'identité et du reflet.", 
        technologies: ["Premiere Pro", "After Effects", "DaVinci Resolve"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: null, 
          video: "https://youtube.com/watch?v=example" 
        }, 
        featured: true },
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
        featured: false },
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
        featured: false }
    ],
    activeFacette: 0, date: "2023-11"
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
        longDescription: "Design d'identité de marque incluant logo, charte graphique et supports.", 
        technologies: ["Illustrator", "Photoshop", "Figma"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: "https://behance.net/example", 
          video: null 
        }, 
        featured: true },
      { 
        id: 2, 
        title: "Logo & Déclinaisons", 
        category: "graphisme", 
        description: "Création du logo et ses variantes", 
        longDescription: "Logo principal avec déclinaisons pour différents supports.", 
        technologies: ["Vector Graphics", "Typography", "Color Theory"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: null, 
          video: null 
        }, 
        featured: false },
      { 
        id: 3, 
        title: "Templates Social Media", 
        category: "graphisme", 
        description: "Templates pour réseaux sociaux", 
        longDescription: "Collection de templates Instagram, LinkedIn et Twitter.", 
        technologies: ["Figma", "Canva", "Adobe XD"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: null, 
          video: null 
        }, 
        featured: false }
    ],
    activeFacette: 0, date: "2024-01"
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
        longDescription: "Portfolio immersif utilisant Three.js pour créer une expérience 3D unique.", 
        technologies: ["Three.js", "GSAP", "JavaScript ES6+", "WebGL"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: "https://github.com/votre-username/portfolio", 
          demo: "https://votre-portfolio.com", 
          video: null 
        }, 
        featured: true },
      { 
        id: 2, 
        title: "Architecture Technique", 
        category: "dev", 
        description: "Structure modulaire et optimisée", 
        longDescription: "Architecture basée sur des modules ES6, scroll virtuel, et animations GSAP.", 
        technologies: ["ES6 Modules", "Virtual Scroll", "Timeline Animation"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: null, 
          video: null 
        }, 
        featured: false },
      { 
        id: 3, 
        title: "Système de Facettes", 
        category: "dev", 
        description: "Innovation UX : 3 faces par projet", 
        longDescription: "Chaque shard possède 3 facettes rotatives offrant différentes perspectives.", 
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
    activeFacette: 0, date: "2024-03"
  },
  {
    id: 7,
    title: "Application E-commerce",
    facettes: [
      { 
        id: 1, 
        title: "Plateforme E-commerce", 
        category: "dev", 
        description: "Application web complète avec panier et paiement", 
        longDescription: "Application e-commerce moderne avec gestion de produits, panier et Stripe.", 
        technologies: ["React", "Node.js", "MongoDB", "Stripe"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: "https://github.com/votre-username/ecommerce", 
          demo: "https://demo.ecommerce.com", 
          video: null 
        }, 
        featured: true },
      { 
        id: 2, 
        title: "Interface Admin", 
        category: "dev", 
        description: "Dashboard de gestion", 
        longDescription: "Interface d'administration complète pour gérer produits, commandes et utilisateurs.", 
        technologies: ["React Admin", "Charts.js", "REST API"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: null, 
          video: null 
        }, 
        featured: false },
      { 
        id: 3, 
        title: "Design Responsive", 
        category: "graphisme", 
        description: "UI/UX moderne et adaptative", 
        longDescription: "Design responsive optimisé pour mobile, tablette et desktop.", 
        technologies: ["Tailwind CSS", "Framer Motion", "Figma"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: null, 
          video: null 
        }, 
        featured: false },
    ],
    activeFacette: 0, date: "2023-10"
  },
  {
    id: 8,
    title: "Documentaire Nature",
    facettes: [
      { 
        id: 1, 
        title: "Documentaire Nature", 
        category: "realisation", 
        description: "Documentaire sur la faune locale", 
        longDescription: "Documentaire de 20 minutes explorant la biodiversité locale avec drone.", 
        technologies: ["Premiere Pro", "DaVinci Resolve", "Drone DJI"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: null, 
          video: "https://youtube.com/watch?v=example" 
        }, 
        featured: true },
      { 
        id: 2, 
        title: "Prises de Vue Aériennes", 
        category: "video", 
        description: "Captation drone et techniques", 
        longDescription: "Utilisation de drones pour capturer des paysages et la faune.", 
        technologies: ["DJI Mavic", "Aerial Cinematography", "Flight Planning"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: null, 
          video: null 
        }, 
        featured: false },
      { 
        id: 3, 
        title: "Sound Design", 
        category: "video", 
        description: "Ambiance sonore immersive", 
        longDescription: "Création d'une bande sonore immersive mêlant sons naturels et musique.", 
        technologies: ["Pro Tools", "Field Recording", "Foley"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: null, 
          video: null 
        }, 
        featured: false }
    ],
    activeFacette: 0, date: "2023-09"
  },
  {
    id: 9,
    title: "Motion Design Explainer",
    facettes: [
      { 
        id: 1, 
        title: "Vidéo Explicative", 
        category: "video", 
        description: "Animation 2D pour produit SaaS", 
        longDescription: "Vidéo explicative animée présentant un produit SaaS.", 
        technologies: ["After Effects", "Illustrator", "Character Animator"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: null, 
          video: "https://youtube.com/watch?v=example" 
        }, 
        featured: true },
      { 
        id: 2, 
        title: "Storyboard & Script", 
        category: "realisation", 
        description: "Conception narrative", 
        longDescription: "Développement du script et storyboard pour une narration efficace.", 
        technologies: ["Storyboarding", "Scriptwriting", "Figma"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: null, 
          video: null 
        }, 
        featured: false },
      { 
        id: 3, 
        title: "Animation de Personnages", 
        category: "video", 
        description: "Character design et animation", 
        longDescription: "Création et animation de personnages expressifs.", 
        technologies: ["Character Animator", "Rig System", "2D Animation"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: null, 
          video: null 
        }, 
        featured: false }
    ],
    activeFacette: 0, date: "2023-11"
  },
  {
    id: 10,
    title: "UI Kit Mobile",
    facettes: [
      { 
        id: 1, 
        title: "Kit UI Mobile", 
        category: "graphisme", 
        description: "Collection de composants UI réutilisables", 
        longDescription: "Kit complet d'interface utilisateur pour applications iOS et Android.", 
        technologies: ["Figma", "Sketch", "Adobe XD"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: "https://figma.com/example", 
          video: null 
        }, 
        featured: true },
      { 
        id: 2, 
        title: "Design System", 
        category: "graphisme", 
        description: "Système de design complet", 
        longDescription: "Tokens de design, composants atomiques et documentation.", 
        technologies: ["Design Tokens", "Atomic Design", "Documentation"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: null, 
          video: null 
        }, 
        featured: false },
      { 
        id: 3, 
        title: "Prototypage Interactif", 
        category: "graphisme", 
        description: "Prototypes haute fidélité", 
        longDescription: "Prototypes interactifs avec transitions et micro-interactions.", 
        technologies: ["Figma Prototyping", "Principle", "ProtoPie"], 
        images: ["assets/images/projects/placeholder.svg"], 
        links: { 
          github: null, 
          demo: null, 
          video: null 
        }, 
        featured: false }
    ],
    activeFacette: 0, date: "2024-02"
  }
];

export function getProjectById(id) { return projects.find(p => p.id === id); }
export function getProjectByIndex(index) { return projects[index] || null; }
export function getProjectsByCategory(category) { return projects.filter(p => p.facettes.some(f => f.category === category)); }
export function getFeaturedProjects() { return projects.filter(p => p.facettes.some(f => f.featured)); }
export function getActiveFacette(projectOrId) { const project = typeof projectOrId === 'number' ? getProjectById(projectOrId) : projectOrId; return project ? project.facettes[project.activeFacette] : null; }
export function getNextFacetteIndex(project) { return (project.activeFacette + 1) % project.facettes.length; }
export function getPrevFacetteIndex(project) { return (project.activeFacette - 1 + project.facettes.length) % project.facettes.length; }
export function getTotalShards() { return projects.length; }
export function getTotalFacettes() { return projects.reduce((sum, p) => sum + p.facettes.length, 0); }
