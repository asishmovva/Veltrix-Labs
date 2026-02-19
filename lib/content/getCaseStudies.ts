import { allCaseStudies } from "contentlayer/generated";

export function getCaseStudies() {
  return allCaseStudies.filter((caseStudy) => caseStudy.published !== false);
}
