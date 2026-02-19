import type { Metadata } from "next";

import { SectionWrapper } from "@/components/sections/section-wrapper";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Insights on web engineering, e-commerce architecture, and performance.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <SectionWrapper
      title="Blog"
      description="MDX and Contentlayer-backed publishing is planned in Phase 3."
    />
  );
}
