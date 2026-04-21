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
    expect(firstProject.logo.src).toContain('/assets/images/shared/branding/');
  });

  it('maps the first six portfolio shards to the fixed branding images', () => {
    const projectShardLogos = portfolioProjects
      .slice(0, 6)
      .map((project) => project.logo.src);

    expect(projectShardLogos).toEqual([
      '/assets/images/shared/branding/shardprojet1.png',
      '/assets/images/shared/branding/shardprojet2.png',
      '/assets/images/shared/branding/shardprojet3.png',
      '/assets/images/shared/branding/shardprojet4.png',
      '/assets/images/shared/branding/shardprojet5.png',
      '/assets/images/shared/branding/shardprojet6.png'
    ]);
  });
});
