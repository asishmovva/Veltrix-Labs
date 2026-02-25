"use client";

import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

import { trackEvent } from "@/lib/client/track-event";
import type { EventInput } from "@/lib/validators/events";

type TrackedCtaLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  eventName?: EventInput["event"];
  label: string;
  location: string;
  meta?: Record<string, string>;
};

export function TrackedCtaLink({
  children,
  eventName = "cta_click",
  label,
  location,
  className,
  meta,
  ...props
}: TrackedCtaLinkProps) {
  return (
    <Link
      {...props}
      className={className}
      onClick={() => {
        trackEvent({
          event: eventName,
          label,
          location,
          path: typeof props.href === "string" ? props.href : props.href.pathname ?? "",
          meta,
        });
      }}
    >
      {children}
    </Link>
  );
}
