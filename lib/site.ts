export const siteConfig = {
  name: "Veltrix Labs",
  description:
    "We design and build high-performance websites and e-commerce systems for modern businesses.",
  url: "https://veltrixlabs.com",
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
    { label: "Web Engineering", href: "/services" },
    { label: "E-Commerce Architecture", href: "/services" },
    { label: "UI/UX Systems", href: "/services" },
    { label: "Performance & Optimization", href: "/services" },
  ],
  socialLinks: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "X / Twitter", href: "https://x.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
