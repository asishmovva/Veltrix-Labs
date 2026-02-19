import { SectionWrapper } from "@/components/sections/section-wrapper";

const SERVICES = [
  "Web Engineering",
  "E-Commerce Architecture",
  "UI/UX Systems",
  "Automation & Integrations",
  "Performance & Optimization",
  "Ongoing Support",
];

export default function ServicesPage() {
  return (
    <SectionWrapper
      title="Services"
      description="Service architecture is ready for the full Phase 2 build. Detailed breakdowns, deliverables, timelines, and price positioning will be added next."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {SERVICES.map((service) => (
          <div
            key={service}
            className="rounded-xl border border-white/10 bg-graphite-2/60 px-4 py-3 text-text-primary"
          >
            {service}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
