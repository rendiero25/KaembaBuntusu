import type { MetadataRoute } from "next";
import { PRODUCT_SLUGS, SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const productEntries: MetadataRoute.Sitemap = PRODUCT_SLUGS.map((slug) => ({
    url: `${SITE_URL}/products/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/products`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/process`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/legality`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...staticPages,
    ...productEntries,
  ];
}
