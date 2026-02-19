import type { Page } from "contentlayer/generated";
import { allPages } from "contentlayer/generated";

import type { Section } from "@/lib/content/sections";
import { SectionsSchema } from "@/lib/content/sections";

export type PageWithSections = Page & {
  validatedSections: Section[];
};

export function getPageBySlug(slug: string): PageWithSections | null {
  const page = allPages.find((entry) => entry.slug === slug && entry.published !== false);

  if (!page) {
    return null;
  }

  return {
    ...page,
    validatedSections: SectionsSchema.parse(page.validatedSections ?? []),
  };
}
