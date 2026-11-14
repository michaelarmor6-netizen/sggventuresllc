import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SERVICE_CATEGORIES,
  getCategory,
  getService,
} from "@/content/services";
import { ServiceDetailPage } from "@/components/pages/service-templates";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICE_CATEGORIES.flatMap((category) =>
    category.services.map((service) => ({
      category: category.slug,
      service: service.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; service: string }>;
}): Promise<Metadata> {
  const { category: categorySlug, service: serviceSlug } = await params;
  const category = getCategory(categorySlug);
  const service = getService(categorySlug, serviceSlug);
  if (!category || !service) return {};

  return createMetadata({
    title: `${service.title} — ${category.name}`,
    description: service.summary,
    path: `/services/${category.slug}/${service.slug}`,
    keywords: [
      service.title,
      `${category.name} consulting`,
      `${service.title} consulting`,
      "SGG Ventures",
    ],
  });
}

export default async function ServiceRoute({
  params,
}: {
  params: Promise<{ category: string; service: string }>;
}) {
  const { category: categorySlug, service: serviceSlug } = await params;
  const category = getCategory(categorySlug);
  const service = getService(categorySlug, serviceSlug);
  if (!category || !service) notFound();

  return <ServiceDetailPage category={category} service={service} />;
}
