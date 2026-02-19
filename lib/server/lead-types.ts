import type { ContactLeadInput } from "@/lib/validators/contact";
import type { EventInput } from "@/lib/validators/events";

export type LeadRecord = ContactLeadInput & {
  ip: string;
  userAgent: string;
  timestamp: string;
};

export type EventRecord = EventInput & {
  ip: string;
  userAgent: string;
  timestamp: string;
};
