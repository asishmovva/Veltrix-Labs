import type { Metadata } from "next";

import { ContentFallback } from "@/components/sections/content-fallback";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { getPageBySlug } from "@/lib/content/getPageBySlug";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateMetadata(): Metadata {
  const page = getPageBySlug("services");

  return buildMetadata({
    title: page?.title ?? "Services",
    description: page?.description ?? siteConfig.description,
    path: "/services",
  });
}

export default function ServicesPage() {
  const page = getPageBySlug("services");

  if (!page) {
    return <ContentFallback slug="services" />;
  }

  return <SectionRenderer sections={page.validatedSections} />;
}
