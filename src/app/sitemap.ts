import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // /proposta fica fora do sitemap (página de reunião, não indexável).
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/sistema`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/growth`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/quiz`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/quiz-2`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}
