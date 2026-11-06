import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mandimanzil.com";
  const now = new Date();

  const routes = [
    "",
    "/menu",
    "/about-us",
    "/branches",
    "/gallery",
    "/contact-us",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/menu" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/menu" || route === "/branches" ? 0.9 : 0.8,
  }));
}
