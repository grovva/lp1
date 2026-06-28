import { GrowthHero } from "@/components/growth/GrowthHero";
import { GrowthNarrative } from "@/components/growth/GrowthNarrative";
import { GrowthCTA } from "@/components/growth/GrowthCTA";
import { Footer } from "@/components/landing/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Growth Marketing — demanda previsível pro seu negócio",
  description:
    "Geração de demanda com estratégia, oferta, mídia paga e criativos de alta conversão. Atraímos clientes decididos a comprar e entregamos qualificados ao seu time, com previsibilidade.",
  path: "/growth",
});

export default function GrowthPage() {
  return (
    <>
      <main className="overflow-x-clip">
        <GrowthHero />
        <GrowthNarrative />
        <GrowthCTA />
      </main>
      <Footer />
    </>
  );
}
