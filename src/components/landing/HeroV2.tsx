import { Reveal } from "@/components/motion/Reveal";
import { RotatingText } from "@/components/motion/RotatingText";
import { BrandsCarousel } from "@/components/landing/BrandsCarousel";
import { HeroMedia } from "@/components/landing/HeroMedia";

const rotatingBullets = [
  "+R$4M gerenciados em anúncios",
  "Clientes ativos em 6 países",
  "+R$40M de receita gerada",
];

const brandLogos = [1, 2, 3, 4, 5, 7, 8, 9, 10].map(
  (n) => `/images/brands/${n}.png`
);

/* Chips comentados a pedido: "Aumente seu faturamento" / "Converta mais clientes" / "Cresça com previsibilidade"
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
*/

export function HeroV2() {
  return (
    <section className="relative overflow-hidden bg-grovva-dark text-white">
      {/* Bloco principal: hero sempre 100vh; conteúdo no topo, marcas no rodapé, vídeo enchendo */}
      <div className="relative flex min-h-[75svh] flex-col overflow-hidden md:min-h-[85svh]">
        <HeroMedia />

        <div className="container relative z-[2] mx-auto max-w-[1200px] px-6 pt-28 text-center md:pt-32">
          {/* Eyebrow: ticker vertical (frase troca com transição suave) */}
          <Reveal delay={0.15}>
            <div className="mb-7 flex justify-center md:mb-11">
              <RotatingText
                words={rotatingBullets}
                className="font-heading text-[14px] font-semibold tracking-[-0.005em] text-grovva-green md:text-[16px]"
              />
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={0.3}>
            <h1 className="font-heading font-bold text-[26px] sm:text-[34px] md:text-[52px] lg:text-[60px] leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] sm:tracking-[-0.025em] text-balance max-w-[900px] mx-auto">
              <span className="text-white">Mais leads qualificados, mais vendas e mais </span>
              <span className="text-grovva-green">controle do crescimento do seu negócio.</span>
            </h1>
          </Reveal>

          {/* Subheadline */}
          <Reveal delay={0.45}>
            <p className="mt-6 md:mt-8 text-white/75 text-base md:text-[17px] leading-relaxed max-w-[720px] mx-auto">
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

          {/* Chip bullets comentados a pedido (faturamento / converta / previsibilidade) */}
        </div>

        {/* Marcas no rodapé, sobre o vídeo (gradiente fraco) */}
        <Reveal delay={0.15} className="relative z-[2] mt-auto w-full pb-10 pt-10 md:pb-14">
          <p className="text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-white/45 mb-6 text-center px-6">
            Grandes marcas que já utilizaram nossas estratégias
          </p>
          <BrandsCarousel logos={brandLogos} />
        </Reveal>

        {/* Fade inferior pra assentar as marcas sobre o vídeo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[460px] md:h-[560px]"
          style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(4,9,7,0.35) 45%, rgba(4,9,7,0.7) 75%, rgba(4,9,7,0.96) 100%)" }}
        />
      </div>
    </section>
  );
}
