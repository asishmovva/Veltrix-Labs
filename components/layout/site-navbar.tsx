"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNavbar() {
  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b border-transparent transition-all duration-300",
          hasScrolled && "border-white/10 bg-graphite/70 backdrop-blur-xl",
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
          <Link href="/" className="font-display text-lg tracking-tight text-text-primary">
            Veltrix Labs
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm transition-colors hover:text-text-primary",
                  pathname === item.href ? "text-text-primary" : "text-text-secondary",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button asChild size="sm">
              <Link href="/contact">Start Project</Link>
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-text-primary hover:bg-white/10 md:hidden"
            onClick={() => setIsMobileNavOpen((current) => !current)}
            aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
          >
            {isMobileNavOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileNavOpen ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
              aria-label="Close menu overlay"
              onClick={() => setIsMobileNavOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-[60] flex w-72 flex-col border-l border-white/10 bg-graphite-2 px-6 py-8 md:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-base text-text-primary">Menu</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="text-text-primary hover:bg-white/10"
                  onClick={() => setIsMobileNavOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </Button>
              </div>

              <nav className="mt-8 flex flex-col gap-2">
                {siteConfig.mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2 text-base transition-colors",
                      pathname === item.href
                        ? "bg-white/10 text-text-primary"
                        : "text-text-secondary hover:bg-white/5 hover:text-text-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <Button asChild className="mt-6">
                <Link href="/contact">Start Your Project</Link>
              </Button>

              <p className="mt-auto text-xs text-text-secondary">{siteConfig.locations}</p>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
