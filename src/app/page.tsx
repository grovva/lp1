import { HeroV2 } from "@/components/landing/HeroV2";
import { Solution } from "@/components/landing/Solution";
import { SalesSystem } from "@/components/landing/SalesSystem";
import { SalesCases } from "@/components/landing/SalesCases";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <main className="overflow-x-clip">
        <HeroV2 />
        <Solution />
        <SalesSystem />
        <SalesCases />
      </main>
      <Footer />
    </>
  );
}
