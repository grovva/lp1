import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Typewriter } from "@/components/motion/Typewriter";
import { BrandsCarousel } from "@/components/landing/BrandsCarousel";
import { FloatingCards } from "@/components/landing/FloatingCards";

const rotatingBullets = [
  "+ de 4M gerenciados em anúncios",
  "Clientes em 6 países",
  "+ de 40M de receita gerada para nossos clientes",
];

const brandLogos = [1, 2, 3, 4, 5, 7, 8, 9, 10].map(
  (n) => `/images/brands/${n}.png`
);

const chipBullets: { icon: React.ReactNode; label: string }[] = [
  {
    label: "Aumente seu faturamento",
    icon: (
      <svg
        className="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8h-5a2.5 2.5 0 0 0 0 5h2a2.5 2.5 0 0 1 0 5H8" />
        <path d="M12 6v12" />
      </svg>
    ),
  },
  {
    label: "Converta mais clientes",
    icon: (
      <svg
        className="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: "Cresça com previsibilidade",
    icon: (
      <svg
        className="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
];

export function HeroV2() {
  return (
    <section
      className="relative overflow-hidden bg-grovva-dark text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 0%, rgba(62,168,92,0.12), transparent 50%), radial-gradient(circle at 80% 100%, rgba(62,168,92,0.08), transparent 55%), radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)",
        backgroundSize: "auto, auto, 22px 22px",
        backgroundPosition: "center, center, 0 0",
      }}
    >
      {/* bottom edge fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 bottom-0 h-24 md:h-32"
        style={{
          background:
            "linear-gradient(to bottom, rgba(14,22,17,0) 0%, var(--color-grovva-dark) 100%)",
        }}
      />

      <div className="relative">
        <FloatingCards />

        <div className="container mx-auto px-6 max-w-[1200px] pt-8 md:pt-12 text-center">
        {/* Logo */}
        <Reveal delay={0.05}>
          <Image
            src="/images/logo-grovva-white-v2.png"
            alt="Grovva"
            width={500}
            height={500}
            className="w-[120px] md:w-[140px] h-auto object-contain mx-auto mb-6 md:mb-12"
            priority
          />
        </Reveal>

        {/* Top pill — typewriter */}
        <Reveal delay={0.15}>
          <div className="mb-6 md:mb-10 flex justify-center">
            <span
              className="inline-flex items-center gap-2.5 rounded-full border border-grovva-green/70 bg-grovva-green/[0.18] px-3.5 py-1.5 md:px-4 md:py-2 text-[12px] md:text-[14px] text-grovva-green font-medium"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(62,168,92,0.15), 0 8px 24px -8px rgba(62,168,92,0.45)",
              }}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-grovva-green opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-grovva-green" />
              </span>
              <Typewriter words={rotatingBullets} />
            </span>
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.3}>
          <h1 className="font-heading font-bold text-[30px] sm:text-[38px] md:text-[52px] lg:text-[60px] leading-[1.05] tracking-[-0.025em] text-balance max-w-[900px] mx-auto">
            <span className="text-white">Mais leads qualificados, mais vendas e mais </span>
            <span className="text-grovva-green">controle do crescimento do seu negócio.</span>
          </h1>
        </Reveal>

        {/* Subheadline */}
        <Reveal delay={0.45}>
          <p className="mt-6 md:mt-8 text-white/65 text-base md:text-[17px] leading-relaxed max-w-[720px] mx-auto">
            Implementamos um sistema validado no seu negócio, que além de atrair
            leads decididos a comprar, também ajuda o seu time a fechar mais
            vendas.
          </p>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.6}>
          <div className="mt-8 md:mt-10 flex justify-center">
            <button
              type="button"
              data-contact-cta="true"
              className="btn-primary"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(62,168,92,0.25), 0 18px 40px -10px rgba(62,168,92,0.55)",
              }}
            >
              Quero mais informações
              <svg
                className="arrow size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </Reveal>

        {/* Chip bullets */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-2 md:flex md:flex-wrap md:items-center md:justify-center md:gap-3 max-w-[420px] sm:max-w-[640px] md:max-w-none mx-auto">
          {chipBullets.map((c, i) => (
            <Reveal key={c.label} delay={0.7 + i * 0.08} y={10}>
              <div className="flex items-center justify-center md:justify-start gap-2 md:gap-2.5 rounded-full border border-white/10 bg-white/[0.04] pl-2 pr-3 py-1.5 md:pl-2 md:pr-4 md:py-2 text-[12px] md:text-[14px] text-white/85 leading-tight">
                <span className="size-6 md:size-7 shrink-0 rounded-full bg-grovva-green/20 text-grovva-green flex items-center justify-center [&>svg]:size-3.5 md:[&>svg]:size-4">
                  {c.icon}
                </span>
                {c.label}
              </div>
            </Reveal>
          ))}
        </div>

        </div>
      </div>

      {/* Brands strip — full-width auto-scrolling marquee in monochrome green */}
      <Reveal delay={1}>
        <div className="relative mt-16 md:mt-24 pb-20 md:pb-28">
          <p className="text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-white/45 mb-6 text-center px-6">
            Grandes marcas que já utilizaram nossas estratégias
          </p>
          <BrandsCarousel logos={brandLogos} />
        </div>
      </Reveal>
    </section>
  );
}
