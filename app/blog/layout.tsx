import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavbar } from "@/components/layout/site-navbar";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-graphite text-text-primary">
      <SiteNavbar />
      <main className="pt-20">{children}</main>
      <SiteFooter />
    </div>
  );
}
