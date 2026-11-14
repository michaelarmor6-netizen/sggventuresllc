import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICE_CATEGORIES, getCategory } from "@/content/services";
import { ServiceCategoryPage } from "@/components/pages/service-templates";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICE_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return createMetadata({
    title: `${category.name} Services`,
    description: category.summary,
    path: `/services/${category.slug}`,
    keywords: [
      `${category.name} consulting`,
      `${category.shortName} consulting`,
      "business advisory",
      "technology consulting",
    ],
  });
}

export default async function ServiceCategoryRoute({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return <ServiceCategoryPage category={category} />;
}
