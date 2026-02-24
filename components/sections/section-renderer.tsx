import type { Section } from "@/lib/content/sections";

import { CtaBandSection } from "@/components/sections/cta-band-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FeaturesStripSection } from "@/components/sections/features-strip-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PricingTiersSection } from "@/components/sections/pricing-tiers-section";
import { ProcessStepsSection } from "@/components/sections/process-steps-section";
import { ServicesGridSection } from "@/components/sections/services-grid-section";
import { WorkPreviewSection } from "@/components/sections/work-preview-section";

type SectionRendererProps = {
  sections: Section[];
};

export function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        switch (section.type) {
          case "hero":
            return <HeroSection key={section.id} section={section} />;
          case "services_grid":
            return <ServicesGridSection key={section.id} section={section} />;
          case "features_strip":
            return <FeaturesStripSection key={section.id} section={section} />;
          case "work_preview":
            return <WorkPreviewSection key={section.id} section={section} />;
          case "process_steps":
            return <ProcessStepsSection key={section.id} section={section} />;
          case "faq":
            return <FaqSection key={section.id} section={section} />;
          case "pricing_tiers":
            return <PricingTiersSection key={section.id} section={section} />;
          case "cta_band":
            return <CtaBandSection key={section.id} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
