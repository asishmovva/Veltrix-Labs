import type { Section } from "@/lib/content/sections";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type CtaBandData = Extract<Section, { type: "cta_band" }>;

type CtaBandSectionProps = {
  section: CtaBandData;
};

export function CtaBandSection({ section }: CtaBandSectionProps) {
  return (
    <section id={section.id} className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
      <div className="rounded-2xl border border-primary/35 bg-primary/10 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">{section.title}</h2>
        {section.subtitle ? (
          <p className="mt-3 text-sm text-text-secondary sm:text-base">{section.subtitle}</p>
        ) : null}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {section.ctas.map((cta) => (
            <Button
              key={`${section.id}-${cta.label}`}
              asChild
              variant={cta.variant ?? "default"}
              className="w-full sm:w-auto"
            >
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
