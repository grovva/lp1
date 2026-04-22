import { HeroV2 } from "@/components/landing/HeroV2";
import { PainPoints } from "@/components/landing/PainPoints";
import { Solution } from "@/components/landing/Solution";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <main>
        <HeroV2 />
        <PainPoints />
        <Solution />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
