import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/og-image.jpg",
}: MetadataInput = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const metaDescription = description ?? siteConfig.description;
  const url = new URL(path, siteConfig.url).toString();
  const imageUrl = image.startsWith("http") ? image : new URL(image, siteConfig.url).toString();

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageTitle,
    description: metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description: metaDescription,
      url,
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
