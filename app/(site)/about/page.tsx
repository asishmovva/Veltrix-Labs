import type { Metadata } from "next";

import { ContentFallback } from "@/components/sections/content-fallback";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { getPageBySlug } from "@/lib/content/getPageBySlug";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateMetadata(): Metadata {
  const page = getPageBySlug("about");

  return buildMetadata({
    title: page?.title ?? "About",
    description: page?.description ?? siteConfig.description,
    path: "/about",
  });
}

export default function AboutPage() {
  const page = getPageBySlug("about");

  if (!page) {
    return <ContentFallback slug="about" />;
  }

  return <SectionRenderer sections={page.validatedSections} />;
}
