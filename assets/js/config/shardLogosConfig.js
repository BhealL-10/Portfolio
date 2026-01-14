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
  
  // Shard 2 - Tono Discord Bot
  "2": {
    dark: "assets/images/Logo/logomodedark.svg",
    light: "assets/images/Logo/logomodelight.svg",
    scale: 0.7,
    opacity: 1
  },
  
  // Shard 3 - Map Editor 3D
  "3": {
    dark: "assets/images/Logo/logodavindark.svg",
    light: "assets/images/Logo/logodavinlight.svg",
    scale: 0.7,
    opacity: 1
  },
  
  // Shard 4 - Court-métrage
  "4": {
    dark: "assets/images/Logo/logofilmdark.svg",
    light: "assets/images/Logo/logofilmlight.svg",
    scale: 0.7,
    opacity: 1
  },
  
  // Shard 5 - Identité Visuelle
  "5": {
    dark: "assets/images/Logo/logoiadark.svg",
    light: "assets/images/Logo/logoialight.svg",
    scale: 0.7,
    opacity: 1
  },
  
  // Shard 6 - Portfolio 3D
  "6": {
    dark: "assets/images/Logo/logodiscorddark.svg",
    light: "assets/images/Logo/logodiscordlight.svg",
    scale: 0.7,
    opacity: 1
  },
  
  // Shard 7 - E-commerce
  "7": {
    dark: "assets/images/Logo/logoaffinitydark.svg",
    light: "assets/images/Logo/logoaffinitylight.svg",
    scale: 0.7,
    opacity: 1
  },
  
  // Shard 8 - Documentaire
  "8": {
    dark: "assets/images/Logo/logospinedark.svg",
    light: "assets/images/Logo/logospinelight.svg",
    scale: 0.7,
    opacity: 1
  },
  
  // Shard 9 - Motion Design
  "9": {
    dark: "assets/images/Logo/logomodedark.svg",
    light: "assets/images/Logo/logomodelight.svg",
    scale: 0.7,
    opacity: 1
  },
  
  // Shard 10 - UI Kit
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
