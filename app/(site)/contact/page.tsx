import type { Metadata } from "next";
import { Suspense } from "react";

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

function ContactFormFallback() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 sm:pb-24">
      <div className="rounded-2xl border border-white/10 bg-graphite-2/70 p-5 text-sm text-text-secondary sm:p-8">
        Loading form...
      </div>
    </section>
  );
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
        <Suspense fallback={<ContactFormFallback />}>
          <ContactForm />
        </Suspense>
      </section>
    </>
  );
}
