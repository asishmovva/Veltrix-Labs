import type { CaseStudy } from "contentlayer/generated";
import Link from "next/link";

import { TrackedCtaLink } from "@/components/analytics/tracked-cta-link";

type CaseStudiesGridSectionProps = {
  items: CaseStudy[];
};

export function CaseStudiesGridSection({ items }: CaseStudiesGridSectionProps) {
  return (
    <section id="work-case-studies" className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
      <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">Case Studies</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.slug}
            className="rounded-2xl border border-white/10 bg-graphite-2/70 p-5"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-primary">{item.industry}</p>
            <h3 className="mt-2 text-xl font-medium text-text-primary">
              <Link href={item.url} className="transition-opacity hover:opacity-80">
                {item.title}
              </Link>
            </h3>
            <p className="mt-3 text-sm text-text-secondary">
              <span className="font-medium text-text-primary/90">Problem:</span> {item.problem}
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              <span className="font-medium text-text-primary/90">Solution:</span> {item.solution}
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              <span className="font-medium text-text-primary/90">Results:</span> {item.results}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.stack.map((stackItem) => (
                <span
                  key={`${item.slug}-${stackItem}`}
                  className="rounded-full border border-white/15 px-3 py-1 text-xs text-text-secondary"
                >
                  {stackItem}
                </span>
              ))}
            </div>
            {item.outcomeMetric ? (
              <p className="mt-4 text-sm font-medium text-primary">{item.outcomeMetric}</p>
            ) : null}
            <TrackedCtaLink
              href={item.url}
              label={`View case study: ${item.title}`}
              location="work-grid"
              className="mt-4 inline-block text-sm font-medium text-primary transition-opacity hover:opacity-80"
            >
              View Case Study
            </TrackedCtaLink>
          </article>
        ))}
      </div>
    </section>
  );
}
