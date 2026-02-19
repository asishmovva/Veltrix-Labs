import { z } from "zod";

export const eventNameOptions = [
  "lead_submit_success",
  "lead_submit_error",
  "cta_click",
] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value ?? "");

export const eventSchema = z.object({
  event: z.enum(eventNameOptions),
  label: optionalText(120),
  location: optionalText(120),
  path: optionalText(500),
  meta: z.record(z.string(), z.string()).optional(),
});

export type EventInput = z.infer<typeof eventSchema>;
