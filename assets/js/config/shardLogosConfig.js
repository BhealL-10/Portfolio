/**
 * shardLogosConfig.js - Configuration des logos personnalisés par shard V6.0
 * Portfolio 3D - Système modulaire avec syntaxe JSON valide
 * 
 * STRUCTURE:
 * - Chaque shard peut avoir ses propres logos (dark + light)
 * - Si non spécifié, utilise les logos par défaut de constants.js
 * - Les logos sont dessinés directement sur la géométrie de la shard
 * 
 * NOUVEAU V6.0:
 * - Support des options de placement par shard
 * - Configuration de l'opacité et de l'échelle individuelle
 * - Possibilité de désactiver le logo sur certaines shards
 */

export const SHARD_LOGOS_CONFIG = {
  // Shard 1 - Présentation
  "1": {
    dark: "assets/images/Logo/logomodedark.svg",
    light: "assets/images/Logo/logomodelight.svg",
    scale: 0.7,
    opacity: 1
  },
  
  // Shard 2 - Tono Discord Bot (création d'un api (un jeu complet qui peu etre jouer via un discord bot))
  "2": {
    dark: "assets/images/Logo/logomodedark.svg",
    light: "assets/images/Logo/logomodelight.svg",
    scale: 0.7,
    opacity: 1
  },
  
  // Shard 3 - parler de ma maitrise sur davinci resolve et particulierment sur fusion 
  "3": {
    dark: "assets/images/Logo/DavinciLogoDark.svg",
    light: "assets/images/Logo/DavinciLogoLight.svg",
    scale: 0.7,
    opacity: 1
  },
  
  // Shard 4 - réalisation de mon premier Court-métrage en ayant organisé tout de A a Z (scénario, découpage technique, casting, lieu de tournage, dérush, montage)
  "4": {
    dark: "assets/images/Logo/MovieLogoDark.svg",
    light: "assets/images/Logo/MovieLogoLight.svg",
    scale: 0.7,
    opacity: 1
  },
  
  // Shard 5 - parler de ma capacité a creer tout type de projet via Ia avec une gestion des ia generative avancer (localIa, Claude Soneete)
  "5": {
    dark: "assets/images/Logo/IALogoDark.svg",
    light: "assets/images/Logo/IALogoLight.svg",
    scale: 0.7,
    opacity: 1
  },
  
  // Shard 6 - Création complete et personnalisé de bot discord
  "6": {
    dark: "assets/images/Logo/DiscordLogoDark.svg",
    light: "assets/images/Logo/DiscordLogoLight.svg",
    scale: 0.7,
    opacity: 1
  },
  
  // Shard 7 - création de logo et d'identité visuel
  "7": {
    dark: "assets/images/Logo/AffinityLogoDark.svg",
    light: "assets/images/Logo/AffinityLogoLight.svg",
    scale: 0.7,
    opacity: 1
  },
  
  // Shard 8 - création d'avatar et animations 
  "8": {
    dark: "assets/images/Logo/SpineLogoDark.svg",
    light: "assets/images/Logo/SpineLogoLight.svg",
    scale: 0.7,
    opacity: 1
  },
  
  // Shard 9 - Création de gamedesign complet
  "9": {
    dark: "assets/images/Logo/logomodedark.svg",
    light: "assets/images/Logo/logomodelight.svg",
    scale: 0.7,
    opacity: 1
  },
  
  // Shard 10 - Approche commercial et innovante garanti
  "10": {
    dark: "assets/images/Logo/logomodedark.svg",
    light: "assets/images/Logo/logomodelight.svg",
    scale: 0.7,
    opacity: 1
  }
};

/**
 * Récupère la configuration de logo pour une shard spécifique
 * @param {number|string} shardId - ID de la shard (1-based)
 * @returns {Object|null} Configuration du logo ou null si non défini
 */
export function getLogoConfigForShard(shardId) {
  const id = String(shardId);
  return SHARD_LOGOS_CONFIG[id] || null;
}

/**
 * Récupère le chemin du logo selon le thème
 * @param {number|string} shardId - ID de la shard
 * @param {boolean} isDarkMode - true si mode sombre
 * @returns {string|null} Chemin du logo
 */
export function getLogoPathForShard(shardId, isDarkMode) {
  const config = getLogoConfigForShard(shardId);
  if (!config) return null;
  return isDarkMode ? config.dark : config.light;
}

/**
 * Retourne tous les IDs de shards avec logos personnalisés
 * @returns {string[]} Liste des IDs
 */
export function getAllCustomLogoIds() {
  return Object.keys(SHARD_LOGOS_CONFIG);
}

/**
 * Vérifie si une shard a un logo personnalisé
 * @param {number|string} shardId - ID de la shard
 * @returns {boolean}
 */
export function hasCustomLogo(shardId) {
  return SHARD_LOGOS_CONFIG.hasOwnProperty(String(shardId));
}
