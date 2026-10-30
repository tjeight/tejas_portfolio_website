import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.website,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
