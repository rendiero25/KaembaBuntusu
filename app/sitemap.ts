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

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...productEntries,
  ];
}
