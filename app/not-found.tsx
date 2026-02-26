import Link from "next/link";

import { BasicChatbot } from "@/components/chat/basic-chatbot";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-graphite text-text-primary">
      <SiteNavbar />
      <main className="mx-auto flex min-h-[70vh] w-full max-w-6xl items-center px-4 pt-24 pb-16 sm:px-6">
        <section className="w-full rounded-3xl border border-white/10 bg-graphite-2/60 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
            Chronovera
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
            The page you requested does not exist or has moved. Use the links below to continue.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 sm:w-auto">
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="h-11 sm:w-auto">
              <Link href="/contact#contact-form">Start Project</Link>
            </Button>
          </div>
        </section>
      </main>
      <BasicChatbot />
      <SiteFooter />
    </div>
  );
}