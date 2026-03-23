import { describe, expect, it } from 'vitest';
import { getProjectCount, portfolioProjects } from './legacyContent';

describe('legacyContent adapter', () => {
  it('keeps the 10 legacy projects', () => {
    expect(getProjectCount()).toBe(10);
    expect(portfolioProjects).toHaveLength(10);
  });

  it('keeps three facets per project', () => {
    portfolioProjects.forEach((project) => {
      expect(project.facets).toHaveLength(3);
    });
  });

  it('preserves localized titles and logos', () => {
    const firstProject = portfolioProjects[0];
    expect(firstProject.title.fr.length).toBeGreaterThan(0);
    expect(firstProject.title.en.length).toBeGreaterThan(0);
    expect(firstProject.logo.dark).toContain('/assets/images/shared/branding/');
    expect(firstProject.logo.light).toContain('/assets/images/shared/branding/');
  });
});
