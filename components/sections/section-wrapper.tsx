import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
};

export function SectionWrapper({
  title,
  description,
  children,
  className,
}: SectionWrapperProps) {
  return (
    <section className={cn("mx-auto w-full max-w-6xl px-6 py-16", className)}>
      <div className="max-w-3xl space-y-4">
        <h1 className="text-4xl font-semibold text-text-primary sm:text-5xl">{title}</h1>
        <p className="text-lg text-text-secondary">{description}</p>
      </div>
      {children ? <div className="mt-10">{children}</div> : null}
    </section>
  );
}
