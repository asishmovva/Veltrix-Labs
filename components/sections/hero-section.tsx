"use client";

import type { Section } from "@/lib/content/sections";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

type HeroSectionData = Extract<Section, { type: "hero" }>;

type HeroSectionProps = {
  section: HeroSectionData;
};

export function HeroSection({ section }: HeroSectionProps) {
  return (
    <section id={section.id} className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-16">
      {section.motif === "dial" ? (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-8 size-[26rem] -translate-x-1/2 rounded-full border border-white/10 sm:size-[38rem]" />
          <motion.div
            className="absolute left-1/2 top-8 size-[26rem] -translate-x-1/2 rounded-full border border-primary/20 sm:size-[38rem]"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute left-1/2 top-8 size-[26rem] -translate-x-1/2 rounded-full bg-[repeating-conic-gradient(rgba(255,255,255,0.16)_0deg,rgba(255,255,255,0.16)_1deg,transparent_1deg,transparent_8deg)] opacity-20 [mask-image:radial-gradient(circle,transparent_58%,black_60%,black_63%,transparent_65%)] sm:size-[38rem]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(76,111,255,0.2),transparent_42%)]" />
        </div>
      ) : null}

      <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.05] text-text-primary sm:text-6xl">
        {section.headline}
      </h1>

      {section.subheadline ? (
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {section.subheadline}
        </p>
      ) : null}

      {section.badges?.length ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {section.badges.map((badge) => (
            <span
              key={badge.label}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-text-primary"
            >
              {badge.label}
            </span>
          ))}
        </div>
      ) : null}

      {section.ctas?.length ? (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {section.ctas.map((cta) => (
            <Button key={`${section.id}-${cta.label}`} asChild size="lg" variant={cta.variant ?? "default"} className="w-full sm:w-auto">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
