import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-graphite-2/80">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <h2 className="font-display text-lg text-text-primary">Veltrix Labs</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{siteConfig.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-text-primary">
            Services
          </h3>
          <ul className="mt-4 space-y-2">
            {siteConfig.serviceLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-text-primary">
            Contact
          </h3>
          <div className="mt-4 space-y-2">
            <Link
              href={`mailto:${siteConfig.email}`}
              className="inline-flex min-h-11 items-center text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {siteConfig.email}
            </Link>
            {siteConfig.socialLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 px-4 py-5 text-xs text-text-secondary sm:flex-row sm:items-center sm:gap-3 sm:px-6">
          <p>(c) {new Date().getFullYear()} Veltrix Labs. All rights reserved.</p>
          <p>{siteConfig.locations}</p>
        </div>
      </div>
    </footer>
  );
}
