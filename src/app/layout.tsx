import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fraunces, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { ContactModal } from "@/components/modal/ContactModal";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

const TRACKFLOW_PIXEL_ID = process.env.NEXT_PUBLIC_TRACKFLOW_PIXEL_ID;
const TRACKFLOW_BASE_URL =
  process.env.NEXT_PUBLIC_TRACKFLOW_BASE_URL || "https://trackflow.grovva.com.br";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_TITLE = "Marketing e Tecnologia Sob Medida para Clínicas | Grovva";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo-grovva-v2.png`,
      description: SITE_DESCRIPTION,
      sameAs: [
        "https://www.instagram.com/grovva.co/",
        "https://linkedin.com/company/grovvaco/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#121F18",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-grovva-dark text-grovva-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {TRACKFLOW_PIXEL_ID && (
          <Script
            id="trackflow-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(t,r,a){t.tf=t.tf||function(){(t.tf.q=t.tf.q||[]).push(arguments)};
var s=r.createElement('script');s.async=1;s.src=a+'/tracker/tf.js';
r.getElementsByTagName('head')[0].appendChild(s);
t.tf('init','${TRACKFLOW_PIXEL_ID}',{server:a});
t.tf('track','PageView');
})(window,document,'${TRACKFLOW_BASE_URL}');`,
            }}
          />
        )}
        <Header />
        {children}
        <ContactModal />
      </body>
    </html>
  );
}
