import type { Metadata } from "next";

import { PageEventTracker } from "@/components/analytics/page-event-tracker";
import { ContentFallback } from "@/components/sections/content-fallback";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { getPageBySlug } from "@/lib/content/getPageBySlug";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateMetadata(): Metadata {
  const page = getPageBySlug("pricing");

  return buildMetadata({
    title: page?.title ?? "Pricing",
    description: page?.description ?? siteConfig.description,
    path: "/pricing",
  });
}

export default function PricingPage() {
  const page = getPageBySlug("pricing");

  if (!page) {
    return <ContentFallback slug="pricing" />;
  }

  return (
    <>
      <PageEventTracker event="pricing_page_view" location="pricing-page" path="/pricing" />
      <SectionRenderer sections={page.validatedSections} />
    </>
  );
}
