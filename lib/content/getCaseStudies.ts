import { allCaseStudies } from "contentlayer/generated";

export function getCaseStudies() {
  return allCaseStudies.filter((caseStudy) => caseStudy.published !== false);
}

export function getCaseStudyBySlug(slug: string) {
  return getCaseStudies().find((caseStudy) => caseStudy.slug === slug) ?? null;
}

export function getNextCaseStudy(slug: string) {
  const caseStudies = getCaseStudies();
  const index = caseStudies.findIndex((caseStudy) => caseStudy.slug === slug);

  if (index === -1 || caseStudies.length <= 1) {
    return null;
  }

  return caseStudies[(index + 1) % caseStudies.length] ?? null;
}
