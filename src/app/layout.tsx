import type { Metadata } from "next";
import { Fraunces, Montserrat } from "next/font/google";
import "./globals.css";
import { ContactModal } from "@/components/modal/ContactModal";

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
        {children}
        <ContactModal />
      </body>
    </html>
  );
}
