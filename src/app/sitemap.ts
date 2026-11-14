import type { MetadataRoute } from "next";
import { ALL_ROUTES } from "@/lib/navigation";
import { SERVICE_CATEGORIES } from "@/content/services";
import { INDUSTRIES } from "@/content/industries";
import { CASE_STUDIES } from "@/content/case-studies";
import { ARTICLES } from "@/content/insights";
import { LEGAL_DOCS } from "@/content/legal";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Homepage gets maximum priority
  routes.push({
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  });

  const priorityFor = (path: string): number => {
    if (path === "/services") return 0.9;
    if (/^\/services\/[^/]+$/.test(path)) return 0.9;
    if (/^\/(about|industries|case-studies|insights|contact|company-profile)$/.test(path)) {
      return 0.8;
    }
    if (/^\/(partnerships|careers|faq)$/.test(path)) return 0.7;
    return 0.6;
  };

  // Core corporate routes
  for (const route of ALL_ROUTES) {
    if (route === "/") continue;
    routes.push({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: priorityFor(route),
    });
  }

  // Dynamic service pages (kept in sync with the content layer)
  for (const category of SERVICE_CATEGORIES) {
    for (const service of category.services) {
      const url = `/services/${category.slug}/${service.slug}`;
      if (ALL_ROUTES.includes(url)) continue;
      routes.push({
        url: `${SITE_URL}${url}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Industries
  for (const industry of INDUSTRIES) {
    const url = `/industries/${industry.slug}`;
    if (ALL_ROUTES.includes(url)) continue;
    routes.push({
      url: `${SITE_URL}${url}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Case studies
  for (const study of CASE_STUDIES) {
    const url = `/case-studies/${study.slug}`;
    if (ALL_ROUTES.includes(url)) continue;
    routes.push({
      url: `${SITE_URL}${url}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }

  // Insights
  for (const article of ARTICLES) {
    const url = `/insights/${article.slug}`;
    if (ALL_ROUTES.includes(url)) continue;
    routes.push({
      url: `${SITE_URL}${url}`,
      lastModified: new Date(article.date + "T00:00:00"),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }

  // Legal
  for (const doc of LEGAL_DOCS) {
    const url = `/legal/${doc.slug}`;
    if (ALL_ROUTES.includes(url)) continue;
    routes.push({
      url: `${SITE_URL}${url}`,
      lastModified: new Date(doc.lastUpdated + "T00:00:00"),
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  return routes;
}
