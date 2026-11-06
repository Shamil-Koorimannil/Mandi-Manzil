import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { RESTAURANT_SCHEMA } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Mandi Manzil | Authentic Arabian Mandi Restaurants & Delivery",
  description:
    "Discover Mandi Manzil the best Mandi in Kerala! Explore top-rated Mandi restaurants, authentic Arabian flavors, dine-in spots, & online delivery across 16 branches.",
  metadataBase: new URL("https://mandimanzil.com"),
  alternates: {
    canonical: "https://mandimanzil.com",
  },
  icons: {
    icon: "/brand/favicon.jpg",
    apple: "/brand/favicon.jpg",
  },
  openGraph: {
    title: "Mandi Manzil | Authentic Arabian Mandi Restaurants & Delivery",
    description:
      "Discover Mandi Manzil the best Mandi in Kerala! Explore top-rated Mandi restaurants, authentic Arabian flavors, dine-in spots, & online delivery.",
    url: "https://mandimanzil.com",
    siteName: "Mandi Manzil",
    images: [
      {
        url: "https://mandimanzil.com/wp-content/uploads/2025/05/featured.jpg",
        width: 1920,
        height: 1080,
        alt: "Mandi Manzil Authentic Arabian Dining",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(RESTAURANT_SCHEMA) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0C0B0C] text-[#EDECEE] selection:bg-[#FCCB1C] selection:text-[#141314]">
        <CustomCursor />
        <SmoothScroll>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
