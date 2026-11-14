import type { MetadataRoute } from "next";
import { ALL_ROUTES } from "@/lib/navigation";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const priorityFor = (path: string): number => {
    if (path === "/") return 1;
    if (path.startsWith("/services")) return 0.9;
    if (path.startsWith("/legal")) return 0.3;
    return 0.8;
  };

  return ALL_ROUTES.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/legal") ? "yearly" : "monthly",
    priority: priorityFor(route),
  }));
}
