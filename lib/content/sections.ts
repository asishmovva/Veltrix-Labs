import { z } from "zod";

export const CtaSchema = z.object({
  label: z.string(),
  href: z.string(),
  variant: z.enum(["default", "secondary", "outline", "ghost"]).optional(),
});

export const BadgeSchema = z.object({
  label: z.string(),
});

export const FeatureSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
});

export const ServiceSchema = z.object({
  title: z.string(),
  description: z.string(),
  bullets: z.array(z.string()).optional(),
  href: z.string().optional(),
});

export const CaseStudyCardSchema = z.object({
  title: z.string(),
  description: z.string(),
  href: z.string(),
  industry: z.string().optional(),
  stack: z.array(z.string()).optional(),
  metric: z.string().optional(),
});

export const PricingTierSchema = z.object({
  name: z.string(),
  price: z.string(),
  bestFor: z.string(),
  bullets: z.array(z.string()).min(1).max(7),
  cta: CtaSchema,
  badge: z.string().optional(),
});

export const SectionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("hero"),
    id: z.string(),
    headline: z.string(),
    subheadline: z.string().optional(),
    ctas: z.array(CtaSchema).optional(),
    badges: z.array(BadgeSchema).optional(),
    motif: z.enum(["none", "dial"]).optional(),
  }),
  z.object({
    type: z.literal("services_grid"),
    id: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    items: z.array(ServiceSchema),
  }),
  z.object({
    type: z.literal("features_strip"),
    id: z.string(),
    title: z.string().optional(),
    items: z.array(FeatureSchema),
  }),
  z.object({
    type: z.literal("work_preview"),
    id: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    items: z.array(CaseStudyCardSchema),
    cta: CtaSchema.optional(),
  }),
  z.object({
    type: z.literal("process_steps"),
    id: z.string(),
    title: z.string(),
    steps: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    ),
  }),
  z.object({
    type: z.literal("faq"),
    id: z.string(),
    title: z.string(),
    items: z.array(
      z.object({
        q: z.string(),
        a: z.string(),
      }),
    ),
  }),
  z.object({
    type: z.literal("pricing_tiers"),
    id: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    items: z.array(PricingTierSchema).min(1),
  }),
  z.object({
    type: z.literal("cta_band"),
    id: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    ctas: z.array(CtaSchema),
  }),
]);

export const SectionsSchema = z.array(SectionSchema);

export type Cta = z.infer<typeof CtaSchema>;
export type Section = z.infer<typeof SectionSchema>;
