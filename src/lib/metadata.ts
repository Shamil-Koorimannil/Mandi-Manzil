import type { Metadata } from "next";

export const SITE_URL = "https://mandimanzil.com";

export function generatePageMetadata({
  title,
  description,
  path = "",
  image = "/images/hero-mandi.jpg",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | Mandi Manzil`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Mandi Manzil",
      images: [
        {
          url: image.startsWith("http") ? image : `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: "Mandi Manzil Authentic Arabian Dining",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.startsWith("http") ? image : `${SITE_URL}${image}`],
    },
  };
}

export const RESTAURANT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://mandimanzil.com/#restaurant",
  name: "Mandi Manzil",
  description: "Authentic Arabian Mandi restaurant chain in Kerala serving slow-cooked, wood-fired Yemeni Mandi with traditional majlis dining.",
  url: "https://mandimanzil.com",
  telephone: "+916235022055",
  email: "info@mandimanzil.com",
  servesCuisine: ["Arabian", "Middle Eastern", "Yemeni", "Mandi"],
  priceRange: "₹₹",
  hasMenu: "https://mandimanzil.com/menu",
  image: "https://mandimanzil.com/images/hero-mandi.jpg",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/mandimanzil/",
    "https://www.facebook.com/mandimanzil",
  ],
};
