import { SectionWrapper } from "@/components/sections/section-wrapper";

export default function WorkPage() {
  return (
    <SectionWrapper
      title="Work"
      description="Case study grid shell is in place. Full problem, solution, stack, and result narratives will be filled in during Phase 2."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {["Vailsburg", "JamRock"].map((project) => (
          <article
            key={project}
            className="rounded-2xl border border-white/10 bg-graphite-2/60 p-5"
          >
            <h2 className="text-xl font-medium text-text-primary">{project}</h2>
            <p className="mt-2 text-sm text-text-secondary">
              Placeholder card ready for case study details and visuals.
            </p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
