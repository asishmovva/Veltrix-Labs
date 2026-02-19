import { z } from "zod";

export const serviceInterestOptions = [
  "Website Design & Development",
  "E-Commerce Storefronts",
  "Landing Pages",
  "Portfolios",
  "Maintenance & Support",
  "SEO & Performance",
] as const;

export const budgetRangeOptions = [
  "Under $1,500",
  "$1,500 - $3,000",
  "$3,000 - $7,500",
  "$7,500+",
] as const;

export const timelineOptions = [
  "ASAP (1-2 weeks)",
  "2-4 weeks",
  "1-2 months",
  "Flexible",
] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value ?? "");

const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z
    .union([z.enum(values), z.literal("")])
    .optional()
    .transform((value) => value ?? "");

export const contactLeadSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  company: optionalText(120),
  serviceInterest: z.enum(serviceInterestOptions, {
    error: "Please select a service interest.",
  }),
  budgetRange: optionalEnum(budgetRangeOptions),
  timeline: optionalEnum(timelineOptions),
  message: z
    .string()
    .trim()
    .min(20, "Message must be at least 20 characters.")
    .max(2000, "Message cannot exceed 2000 characters."),
  website: optionalText(200),
  pageUrl: optionalText(500),
});

export type ContactLeadFormInput = z.input<typeof contactLeadSchema>;
export type ContactLeadInput = z.output<typeof contactLeadSchema>;
