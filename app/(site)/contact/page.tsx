import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/sections/section-wrapper";

export default function ContactPage() {
  return (
    <SectionWrapper
      title="Contact"
      description="Contact form architecture and integrations (Formspree, Calendly, Crisp) are queued for Phase 2 and Phase 4."
    >
      <div className="rounded-2xl border border-white/10 bg-graphite-2/60 p-5 text-text-secondary">
        <p>Need immediate contact routing before the form is added?</p>
        <Button asChild className="mt-4">
          <Link href="mailto:hello@veltrixlabs.com">hello@veltrixlabs.com</Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
