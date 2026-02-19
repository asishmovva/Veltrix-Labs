import type { Section } from "@/lib/content/sections";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type WorkPreviewData = Extract<Section, { type: "work_preview" }>;

type WorkPreviewSectionProps = {
  section: WorkPreviewData;
};

export function WorkPreviewSection({ section }: WorkPreviewSectionProps) {
  return (
    <section id={section.id} className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16">
      <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">{section.title}</h2>
      {section.subtitle ? (
        <p className="mt-3 max-w-3xl text-text-secondary">{section.subtitle}</p>
      ) : null}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {section.items.map((item) => (
          <article
            key={`${section.id}-${item.title}`}
            className="rounded-2xl border border-white/10 bg-graphite-2/70 p-5"
          >
            {item.industry ? (
              <p className="text-xs uppercase tracking-[0.16em] text-primary">{item.industry}</p>
            ) : null}
            <h3 className="mt-2 text-xl font-medium text-text-primary">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.description}</p>

            {item.stack?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.stack.map((stackItem) => (
                  <span
                    key={`${item.title}-${stackItem}`}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-text-secondary"
                  >
                    {stackItem}
                  </span>
                ))}
              </div>
            ) : null}

            {item.metric ? (
              <p className="mt-4 text-sm font-medium text-primary">{item.metric}</p>
            ) : null}

            <Link
              href={item.href}
              className="mt-4 inline-block text-sm font-medium text-primary transition-opacity hover:opacity-80"
            >
              View case study
            </Link>
          </article>
        ))}
      </div>

      {section.cta ? (
        <Button
          asChild
          variant={section.cta.variant ?? "default"}
          className="mt-6 w-full sm:w-auto"
        >
          <Link href={section.cta.href}>{section.cta.label}</Link>
        </Button>
      ) : null}
    </section>
  );
}
