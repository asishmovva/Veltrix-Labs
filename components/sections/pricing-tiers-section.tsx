import type { Section } from "@/lib/content/sections";

import { TrackedCtaLink } from "@/components/analytics/tracked-cta-link";
import { Button } from "@/components/ui/button";

type PricingTiersData = Extract<Section, { type: "pricing_tiers" }>;

type PricingTiersSectionProps = {
  section: PricingTiersData;
};

function getPlanFromHref(href: string) {
  try {
    return new URL(href, "https://veltrix-labs.local").searchParams.get("plan") ?? "";
  } catch {
    return "";
  }
}

export function PricingTiersSection({ section }: PricingTiersSectionProps) {
  return (
    <section
      id={section.id}
      className="scroll-mt-24 mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16"
    >
      <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">{section.title}</h2>
      {section.subtitle ? (
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary sm:text-base">
          {section.subtitle}
        </p>
      ) : null}

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {section.items.map((item) => {
          const plan = getPlanFromHref(item.cta.href);

          return (
            <article
              key={`${section.id}-${item.name}`}
              className="relative flex h-full flex-col rounded-3xl border border-white/10 bg-graphite-2/70 p-5 shadow-[0_12px_32px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-6"
            >
              {item.badge ? (
                <span className="mb-4 inline-flex w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {item.badge}
                </span>
              ) : null}

              <h3 className="text-xl font-semibold text-text-primary">{item.name}</h3>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">
                {item.price}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.bestFor}</p>

              <ul className="mt-5 space-y-2">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                  >
                    <span
                      className="mt-1 block size-1.5 rounded-full bg-primary/90"
                      aria-hidden="true"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                variant={item.cta.variant ?? "default"}
                className="mt-6 h-12 w-full rounded-xl"
              >
                <TrackedCtaLink
                  href={item.cta.href}
                  eventName={plan ? "pricing_cta_click" : "cta_click"}
                  label={item.cta.label}
                  location={section.id}
                  meta={plan ? { plan } : undefined}
                >
                  {item.cta.label}
                </TrackedCtaLink>
              </Button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
