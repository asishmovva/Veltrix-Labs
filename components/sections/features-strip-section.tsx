import type { Section } from "@/lib/content/sections";
import { Code, Gauge, Globe, Rocket, Smartphone, Sparkles, Zap } from "lucide-react";

type FeaturesStripData = Extract<Section, { type: "features_strip" }>;

type FeaturesStripSectionProps = {
  section: FeaturesStripData;
};

const iconMap = {
  Smartphone,
  Gauge,
  Code,
  Globe,
  Zap,
  Rocket,
  Sparkles,
} as const;

export function FeaturesStripSection({ section }: FeaturesStripSectionProps) {
  return (
    <section id={section.id} className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16">
      <div className="rounded-2xl border border-white/10 bg-graphite-2/65 p-5 sm:p-8">
        {section.title ? (
          <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">{section.title}</h2>
        ) : null}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {section.items.map((item) => {
            const Icon = item.icon && item.icon in iconMap
              ? iconMap[item.icon as keyof typeof iconMap]
              : Sparkles;

            return (
              <article
                key={`${section.id}-${item.title}`}
                className="rounded-xl border border-white/10 bg-graphite/55 p-4"
              >
                <Icon className="size-4 text-primary" />
                <h3 className="mt-3 text-sm font-semibold text-text-primary">{item.title}</h3>
                {item.description ? (
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
