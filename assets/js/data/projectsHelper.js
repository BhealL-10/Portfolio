/**
 * projectsHelper.js - Fusionne les traductions avec les métadonnées
 */

import { projectsMetadata } from './projects_metadata.js';
import { projectTranslations } from './translations.js';

export function getTranslatedProjects(lang = 'fr') {
  if (lang !== 'fr' && lang !== 'en') lang = 'fr';
  
  const translations = projectTranslations[lang];
  
  // Fusionner les traductions avec les métadonnées
  return projectsMetadata.map((metadata, index) => {
    const translation = translations[index];
    if (!translation) return metadata;
    
    return {
      id: metadata.id,
      title: translation.title,
      activeFacette: metadata.activeFacette,
      date: metadata.date,
      facettes: metadata.facettes.map((facetteMeta, fIndex) => {
        const fTranslation = translation.facettes[fIndex];
        if (!fTranslation) return facetteMeta;
        
        return {
          id: facetteMeta.id,
          title: fTranslation.title,
          category: fTranslation.category,
          description: fTranslation.description,
          longDescription: fTranslation.longDescription,
          technologies: fTranslation.technologies,
          images: facetteMeta.images,
          links: facetteMeta.links,
          featured: facetteMeta.featured
        };
      })
    };
  });
}
