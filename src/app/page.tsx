import { HeroV2 } from "@/components/landing/HeroV2";
import { Solution } from "@/components/landing/Solution";
import { SalesSystem } from "@/components/landing/SalesSystem";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <main>
        <HeroV2 />
        <Solution />
        <SalesSystem />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
