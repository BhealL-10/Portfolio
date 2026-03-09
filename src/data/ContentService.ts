import { portfolioProjects } from './legacyContent';
import type { Language, PortfolioProject } from '../types/content';

export class ContentService {
  private readonly projects = portfolioProjects;

  getProjects() {
    return this.projects;
  }

  getProjectById(projectId: string) {
    return this.projects.find((project) => project.id === projectId) || null;
  }

  getProjectByOrder(order: number) {
    return this.projects[order] || null;
  }

  getProjectLabel(projectId: string, language: Language) {
    const project = this.getProjectById(projectId);
    return project ? project.title[language] : '';
  }

  getFacet(projectId: string, facetIndex: number) {
    const project = this.getProjectById(projectId);
    if (!project) return null;
    return project.facets[Math.max(0, Math.min(facetIndex, project.facets.length - 1))] || null;
  }

  getProjectIndex(projectId: string) {
    return this.projects.findIndex((project) => project.id === projectId);
  }

  getProjectCount() {
    return this.projects.length;
  }

  getLocalizedProjects(language: Language): Array<{ id: string; title: string; project: PortfolioProject }> {
    return this.projects.map((project) => ({
      id: project.id,
      title: project.title[language],
      project
    }));
  }
}
