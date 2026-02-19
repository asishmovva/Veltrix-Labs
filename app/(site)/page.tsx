import type { Metadata } from "next";

import { ContentFallback } from "@/components/sections/content-fallback";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { getPageBySlug } from "@/lib/content/getPageBySlug";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateMetadata(): Metadata {
  const page = getPageBySlug("home");

  return buildMetadata({
    title: page?.title ?? "Home",
    description: page?.description ?? siteConfig.description,
    path: "/",
  });
}

export default function HomePage() {
  const page = getPageBySlug("home");

  if (!page) {
    return <ContentFallback slug="home" />;
  }

  return <SectionRenderer sections={page.validatedSections} />;
}
