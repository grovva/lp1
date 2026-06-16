import type { Metadata } from "next";
import { SistemaHero } from "@/components/sistema/SistemaHero";
import { SistemaNarrative } from "@/components/sistema/SistemaNarrative";
import { SistemaCTA } from "@/components/sistema/SistemaCTA";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "O Sistema Grovva Sales, feito sob medida pra sua operação",
  description:
    "Um sistema de vendas montado em cima do jeito que o seu negócio vende: único por cliente, modular e com automações de IA que se encaixam na sua operação. Veja por dentro com uma prévia interativa.",
};

export default function SistemaPage() {
  return (
    <>
      <main className="overflow-x-clip">
        <SistemaHero />
        <SistemaNarrative />
        <SistemaCTA />
      </main>
      <Footer />
    </>
  );
}
