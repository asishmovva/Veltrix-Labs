import type { Section } from "@/lib/content/sections";
import Link from "next/link";

type ServicesGridData = Extract<Section, { type: "services_grid" }>;

type ServicesGridSectionProps = {
  section: ServicesGridData;
};

export function ServicesGridSection({ section }: ServicesGridSectionProps) {
  return (
    <section id={section.id} className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16">
      <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">{section.title}</h2>
      {section.subtitle ? (
        <p className="mt-3 max-w-3xl text-text-secondary">{section.subtitle}</p>
      ) : null}

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {section.items.map((item, index) => (
          <article
            key={`${section.id}-${item.title}`}
            className="rounded-2xl border border-white/10 bg-graphite-2/70 p-5 transition-transform duration-200 hover:-translate-y-1"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-primary">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-lg font-medium text-text-primary">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>

            {item.bullets?.length ? (
              <ul className="mt-3 space-y-2">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="text-xs text-text-secondary">
                    - {bullet}
                  </li>
                ))}
              </ul>
            ) : null}

            {item.href ? (
              <Link
                href={item.href}
                className="mt-4 inline-block text-sm font-medium text-primary transition-opacity hover:opacity-80"
              >
                Learn more
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
