import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Montserrat } from "next/font/google";
import "./globals.css";
import { ContactModal } from "@/components/modal/ContactModal";

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

export const metadata: Metadata = {
  title: "Marketing e Tecnologia Sob Medida para Clínicas | grovva",
  description:
    "Marketing, vendas e atendimento com agentes de IA sob medida para sua clínica atrair pacientes, aumentar o faturamento e crescer sem depender de indicação.",
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
      <body className="min-h-full flex flex-col bg-grovva-bg text-grovva-text">
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
        {children}
        <ContactModal />
      </body>
    </html>
  );
}
