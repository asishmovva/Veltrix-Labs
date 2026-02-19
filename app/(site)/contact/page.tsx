import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
import { ContentFallback } from "@/components/sections/content-fallback";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { getPageBySlug } from "@/lib/content/getPageBySlug";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateMetadata(): Metadata {
  const page = getPageBySlug("contact");

  return buildMetadata({
    title: page?.title ?? "Contact",
    description: page?.description ?? siteConfig.description,
    path: "/contact",
  });
}

export default function ContactPage() {
  const page = getPageBySlug("contact");

  if (!page) {
    return <ContentFallback slug="contact" />;
  }

  return (
    <>
      <SectionRenderer sections={page.validatedSections} />
      <section id="contact-form" className="scroll-mt-24 py-12 md:py-16">
        <ContactForm />
      </section>
    </>
  );
}
