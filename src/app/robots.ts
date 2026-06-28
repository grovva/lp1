import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    // /proposta não é bloqueada aqui de propósito: o noindex (meta + header
    // X-Robots-Tag) só é respeitado se o crawler puder ler a página.
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
