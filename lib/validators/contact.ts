import { z } from "zod";

export const planOptions = ["starter", "growth", "custom"] as const;

export const projectTypeOptions = [
  "website",
  "ecommerce",
  "webapp",
  "redesign",
  "other",
] as const;

export const budgetOptions = [
  "Under $1,000",
  "$1,000 - $3,000",
  "$3,000 - $7,000",
  "$7,000+",
] as const;

export const timelineOptions = [
  "ASAP",
  "2-4 weeks",
  "1-2 months",
  "Flexible",
] as const;

export const planLabels: Record<(typeof planOptions)[number], string> = {
  starter: "Starter",
  growth: "Growth",
  custom: "Custom",
};

export const projectTypeLabels: Record<(typeof projectTypeOptions)[number], string> = {
  website: "Website",
  ecommerce: "E-Commerce",
  webapp: "Web App",
  redesign: "Redesign",
  other: "Other",
};

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value ?? "");

export const contactLeadSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  company: optionalText(120),
  plan: z.enum(planOptions, {
    error: "Please select a plan.",
  }),
  projectType: z.enum(projectTypeOptions, {
    error: "Please select a project type.",
  }),
  budget: z.enum(budgetOptions, {
    error: "Please select a budget range.",
  }),
  timeline: z.enum(timelineOptions, {
    error: "Please select a timeline.",
  }),
  message: z
    .string()
    .trim()
    .min(30, "Message must be at least 30 characters.")
    .max(2000, "Message cannot exceed 2000 characters."),
  website: optionalText(200),
  pageUrl: optionalText(500),
});

export type ContactLeadFormInput = z.input<typeof contactLeadSchema>;
export type ContactLeadInput = z.output<typeof contactLeadSchema>;

export type ContactPlan = (typeof planOptions)[number];
