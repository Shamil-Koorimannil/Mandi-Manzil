import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mandimanzil.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/mandi-manzil-official-links",
        destination: "/branches",
        permanent: true,
      },
      {
        source: "/mandi-manzil-official-links/",
        destination: "/branches",
        permanent: true,
      },
      {
        source: "/feed",
        destination: "/",
        permanent: true,
      },
      {
        source: "/feed/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/comments/feed",
        destination: "/",
        permanent: true,
      },
      {
        source: "/comments/feed/",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
