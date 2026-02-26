"use client";

import { useEffect, useRef } from "react";

import { trackEvent } from "@/lib/client/track-event";
import type { EventInput } from "@/lib/validators/events";

type PageEventTrackerProps = {
  event: EventInput["event"];
  label?: string;
  location: string;
  meta?: Record<string, string>;
  path: string;
};

export function PageEventTracker({
  event,
  label = "",
  location,
  meta,
  path,
}: PageEventTrackerProps) {
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (hasTrackedRef.current) {
      return;
    }

    hasTrackedRef.current = true;

    trackEvent({
      event,
      label,
      location,
      path,
      meta,
    });
  }, [event, label, location, meta, path]);

  return null;
}
