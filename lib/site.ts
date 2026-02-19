const fallbackSiteUrl = "https://veltrix-labs.vercel.app";

export const siteConfig = {
  name: "Veltrix Labs",
  description:
    "We design and build high-performance websites and e-commerce systems for modern businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl,
  email: "hello@veltrixlabs.com",
  locations: "US • UK • UAE (Remote)",
  mainNav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  serviceLinks: [
    { label: "Website Design & Development", href: "/services" },
    { label: "E-Commerce Architecture", href: "/services" },
    { label: "Landing Pages", href: "/services" },
    { label: "SEO & Performance Optimization", href: "/services" },
  ],
  socialLinks: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "X", href: "https://x.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
