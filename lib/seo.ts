import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

function normalizePath(path: string) {
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  if (withLeadingSlash !== "/" && withLeadingSlash.endsWith("/")) {
    return withLeadingSlash.slice(0, -1);
  }
  return withLeadingSlash;
}

function buildPageTitle(title?: string) {
  if (!title) {
    return siteConfig.defaultTitle;
  }

  const normalizedTitle = title.toLowerCase();
  const normalizedSiteName = siteConfig.name.toLowerCase();

  if (normalizedTitle.includes(normalizedSiteName)) {
    return title;
  }

  return `${title} | ${siteConfig.name}`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/og-image.jpg",
}: MetadataInput = {}): Metadata {
  const canonicalPath = normalizePath(path);
  const pageTitle = buildPageTitle(title);
  const metaDescription = description ?? siteConfig.description;
  const canonicalUrl = new URL(canonicalPath, siteConfig.url).toString();
  const imageUrl = image.startsWith("http")
    ? image
    : new URL(image, siteConfig.url).toString();

  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      shortcut: ["/icon.svg"],
      apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
    },
    title: pageTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: pageTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: metaDescription,
      images: [imageUrl],
    },
  };
}
