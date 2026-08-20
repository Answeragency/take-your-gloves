import { MetadataRoute } from "next";
import { getAllEventSlugs } from "@/sanity/lib/queries";

const BASE_URL = "https://take-your-gloves.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllEventSlugs();

  const events = slugs.map((slug) => ({
    url: `${BASE_URL}/evenements/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/evenements`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...events,
    {
      url: `${BASE_URL}/entreprises`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/galerie`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/temoignages`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
