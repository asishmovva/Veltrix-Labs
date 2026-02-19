import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-24 pt-20">
      <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">Veltrix Labs</p>
      <div className="max-w-3xl space-y-5">
        <h1 className="text-4xl font-semibold leading-tight text-text-primary sm:text-6xl">
          Precision-engineered web experiences for modern brands.
        </h1>
        <p className="text-lg text-text-secondary sm:text-xl">
          Foundation shell is live. Core services, work, about, contact, and content
          architecture are now in place for phased buildout.
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button asChild size="lg">
          <Link href="/contact">Start Your Project</Link>
        </Button>
        <Button asChild size="lg" variant="ghost" className="border border-white/15">
          <Link href="/work">View Our Work</Link>
        </Button>
      </div>
    </section>
  );
}
