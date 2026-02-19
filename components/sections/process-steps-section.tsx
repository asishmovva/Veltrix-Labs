import type { Section } from "@/lib/content/sections";

type ProcessStepsData = Extract<Section, { type: "process_steps" }>;

type ProcessStepsSectionProps = {
  section: ProcessStepsData;
};

export function ProcessStepsSection({ section }: ProcessStepsSectionProps) {
  return (
    <section id={section.id} className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16">
      <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">{section.title}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {section.steps.map((step, index) => (
          <article
            key={`${section.id}-${step.title}`}
            className="rounded-xl border border-white/10 bg-graphite-2/65 p-4"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-primary">Step {index + 1}</p>
            <h3 className="mt-2 text-sm font-semibold text-text-primary">{step.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
