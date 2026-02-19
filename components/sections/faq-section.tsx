import type { Section } from "@/lib/content/sections";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqData = Extract<Section, { type: "faq" }>;

type FaqSectionProps = {
  section: FaqData;
};

export function FaqSection({ section }: FaqSectionProps) {
  return (
    <section id={section.id} className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16">
      <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">{section.title}</h2>
      <Accordion type="single" collapsible className="mt-5 rounded-2xl border border-white/10 bg-graphite-2/65 px-4 sm:px-6">
        {section.items.map((item, index) => (
          <AccordionItem key={`${section.id}-${item.q}`} value={`${section.id}-${index}`}>
            <AccordionTrigger className="text-left text-sm text-text-primary hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-text-secondary">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
