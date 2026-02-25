import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TrackedCtaLink } from "@/components/analytics/tracked-cta-link";
import { Button } from "@/components/ui/button";
import { getCaseStudies, getCaseStudyBySlug, getNextCaseStudy } from "@/lib/content/getCaseStudies";
import { buildMetadata } from "@/lib/seo";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getCaseStudies().map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return buildMetadata({
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
      path: `/work/${slug}`,
    });
  }

  return buildMetadata({
    title: `${caseStudy.title} Case Study`,
    description: caseStudy.description,
    path: caseStudy.url,
  });
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-graphite-2/65 p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-text-primary sm:text-xl">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const nextCaseStudy = getNextCaseStudy(caseStudy.slug);
  const bodyText = caseStudy.body.raw.trim();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-16">
      <div className="rounded-3xl border border-white/10 bg-graphite-2/70 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.25)] sm:p-8">
        <p className="text-xs uppercase tracking-[0.16em] text-primary">{caseStudy.industry}</p>
        <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight text-text-primary sm:text-5xl">
          {caseStudy.title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary sm:text-base">
          {caseStudy.description}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild size="lg" className="h-12 w-full sm:w-auto">
            <TrackedCtaLink href="/pricing" label="See Pricing" location="case-study-hero">
              See Pricing
            </TrackedCtaLink>
          </Button>
          <Button asChild size="lg" variant="secondary" className="h-12 w-full sm:w-auto">
            <TrackedCtaLink
              href="/contact#contact-form"
              label="Start Project"
              location="case-study-hero"
            >
              Start Project
            </TrackedCtaLink>
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {caseStudy.stack.map((stackItem) => (
            <span
              key={`${caseStudy.slug}-${stackItem}`}
              className="rounded-full border border-white/15 px-3 py-1 text-xs text-text-secondary"
            >
              {stackItem}
            </span>
          ))}
        </div>

        {caseStudy.outcomeMetric ? (
          <p className="mt-5 text-sm font-medium text-primary">{caseStudy.outcomeMetric}</p>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <DetailBlock title="Overview">
          <p>{caseStudy.description}</p>
          {bodyText ? <p className="mt-3">{bodyText}</p> : null}
        </DetailBlock>

        <DetailBlock title="Tech Stack">
          <ul className="space-y-2">
            {caseStudy.stack.map((stackItem) => (
              <li key={`${caseStudy.slug}-stack-${stackItem}`} className="flex items-center gap-2">
                <span className="block size-1.5 rounded-full bg-primary" aria-hidden="true" />
                <span>{stackItem}</span>
              </li>
            ))}
          </ul>
        </DetailBlock>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <DetailBlock title="Problem">
          <p>{caseStudy.problem}</p>
        </DetailBlock>
        <DetailBlock title="Approach">
          <p>{caseStudy.solution}</p>
        </DetailBlock>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <DetailBlock title="Deliverables">
          <ul className="space-y-2">
            {caseStudy.deliverables.map((deliverable) => (
              <li key={`${caseStudy.slug}-${deliverable}`} className="flex items-start gap-2">
                <span className="mt-2 block size-1.5 rounded-full bg-primary" aria-hidden="true" />
                <span>{deliverable}</span>
              </li>
            ))}
          </ul>
        </DetailBlock>

        <DetailBlock title="Outcomes">
          <p>{caseStudy.results}</p>
          {caseStudy.outcomeMetric ? (
            <p className="mt-3 rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
              Highlight: {caseStudy.outcomeMetric}
            </p>
          ) : null}
        </DetailBlock>
      </div>

      <section className="mt-6 rounded-2xl border border-white/10 bg-graphite-2/65 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-primary">Next case study</p>
            {nextCaseStudy ? (
              <>
                <h2 className="mt-2 text-lg font-semibold text-text-primary">{nextCaseStudy.title}</h2>
                <p className="mt-1 text-sm text-text-secondary">{nextCaseStudy.industry}</p>
              </>
            ) : (
              <h2 className="mt-2 text-lg font-semibold text-text-primary">More work coming soon</h2>
            )}
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            {nextCaseStudy ? (
              <Button asChild variant="outline" className="h-12 w-full sm:w-auto">
                <Link href={nextCaseStudy.url}>View Next Case Study</Link>
              </Button>
            ) : null}
            <Button asChild className="h-12 w-full sm:w-auto">
              <TrackedCtaLink href="/pricing" label="See Pricing" location="case-study-footer">
                See Pricing
              </TrackedCtaLink>
            </Button>
            <Button asChild variant="secondary" className="h-12 w-full sm:w-auto">
              <TrackedCtaLink
                href="/contact#contact-form"
                label="Start Project"
                location="case-study-footer"
              >
                Start Project
              </TrackedCtaLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
