import { projects } from "@/data/projects";
import { type PortfolioWorkItem } from "@/types/portfolio";

export const caseStudies: readonly PortfolioWorkItem[] = projects;

export function getCaseStudyBySlug(
  slug: string,
): PortfolioWorkItem | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getCaseStudyHref(caseStudy: PortfolioWorkItem): string {
  return `/case-studies/${caseStudy.slug}`;
}