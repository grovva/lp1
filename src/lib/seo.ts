import type { Metadata } from "next";

// Domínio primário na Vercel: grovva.com.br faz 307 → www, então o canônico é o www.
export const SITE_URL = "https://www.grovva.com.br";
export const SITE_NAME = "Grovva";

export const SITE_DESCRIPTION =
  "Marketing, vendas e atendimento com agentes de IA sob medida para sua clínica atrair pacientes, aumentar o faturamento e crescer sem depender de indicação.";

/**
 * Metadata por página: title (com template "| Grovva" do layout), description,
 * canonical e cards de Open Graph/Twitter consistentes. A imagem de
 * compartilhamento é injetada automaticamente pelo arquivo opengraph-image.tsx.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const ogTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: SITE_NAME,
      url: path,
      title: ogTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}
