import type { Metadata } from "next";

import { BasicChatbot } from "@/components/chat/basic-chatbot";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavbar } from "@/components/layout/site-navbar";
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

function HomePageContent() {
  const page = getPageBySlug("home");

  if (!page) {
    return <ContentFallback slug="home" />;
  }

  return <SectionRenderer sections={page.validatedSections} />;
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-graphite text-text-primary">
      <SiteNavbar />
      <main className="pt-20">
        <HomePageContent />
      </main>
      <BasicChatbot />
      <SiteFooter />
    </div>
  );
}
