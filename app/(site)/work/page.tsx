import type { Metadata } from "next";

import { CaseStudiesGridSection } from "@/components/sections/case-studies-grid-section";
import { ContentFallback } from "@/components/sections/content-fallback";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { getCaseStudies } from "@/lib/content/getCaseStudies";
import { getPageBySlug } from "@/lib/content/getPageBySlug";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateMetadata(): Metadata {
  const page = getPageBySlug("work");

  return buildMetadata({
    title: page?.title ?? "Work",
    description: page?.description ?? siteConfig.description,
    path: "/work",
  });
}

export default function WorkPage() {
  const page = getPageBySlug("work");
  const caseStudies = getCaseStudies();

  if (!page) {
    return <ContentFallback slug="work" />;
  }

  return (
    <>
      <SectionRenderer sections={page.validatedSections} />
      <CaseStudiesGridSection items={caseStudies} />
    </>
  );
}
