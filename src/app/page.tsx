import { Hero } from "@/components/landing/Hero";
import { PainPoints } from "@/components/landing/PainPoints";
import { Solution } from "@/components/landing/Solution";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <PainPoints />
        <Solution />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
