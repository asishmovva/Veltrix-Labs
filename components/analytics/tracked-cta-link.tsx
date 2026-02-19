"use client";

import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

import { trackEvent } from "@/lib/client/track-event";

type TrackedCtaLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  label: string;
  location: string;
};

export function TrackedCtaLink({
  children,
  label,
  location,
  className,
  ...props
}: TrackedCtaLinkProps) {
  return (
    <Link
      {...props}
      className={className}
      onClick={() => {
        trackEvent({
          event: "cta_click",
          label,
          location,
          path: typeof props.href === "string" ? props.href : props.href.pathname ?? "",
        });
      }}
    >
      {children}
    </Link>
  );
}
