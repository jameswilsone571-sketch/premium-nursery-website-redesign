import type { MetadataRoute } from "next";

const base = "https://example-nursery.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/rooms",
    "/rooms/baby-room",
    "/rooms/toddler-room",
    "/rooms/tweenies-room",
    "/rooms/pre-school-room",
    "/our-nursery",
    "/gallery",
    "/parent-information",
    "/contact",
    "/book-a-visit",
    "/legal",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route.startsWith("/rooms") || route === "/book-a-visit" ? 0.9 : 0.7,
  }));
}
