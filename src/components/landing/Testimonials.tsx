"use client";

import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";

const testimonials = [
  {
    name: "Douglas Melo",
    avatar: "/images/avatar-douglas.jpg",
    text: "Trabalho fantástico do time da grovva, tive um crescimento nas minhas vendas muito expressivo desde que comecei a parceria com eles.",
  },
  {
    name: "Maytê Zaiden",
    avatar: "/images/avatar-atila.png",
    text: "Eles redesenharam do zero o meu funil de vendas, redefiniram alguns processos e logo no primeiro mês eu quase dobrei o faturamento da minha empresa.",
  },
  {
    name: "Átila Venturino",
    avatar: "/images/avatar-mayte.png",
    text: "Já estamos juntos nessa parceria há mais de 2 anos e simplesmente revolucionaram a minha clínica, desde a parte de anúncios até o atendimento.",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="size-3.5 text-grovva-green fill-grovva-green"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("figure");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section className="py-14 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Heading */}
        <Reveal>
          <div className="text-center mb-8 md:mb-16 max-w-[720px] mx-auto">
            <h2 className="font-heading font-semibold text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.02em] text-grovva-text">
              Quem já <span className="text-grovva-green font-bold">confia</span>{" "}
              na grovva.
            </h2>
            <p className="text-grovva-muted mt-5 text-base md:text-[17px] leading-relaxed">
              Resultados reais de clínicas que pararam de depender de indicações
              e montaram um processo comercial que escala.
            </p>
          </div>
        </Reveal>

        {/* Cards — horizontal carousel on mobile, grid on desktop */}
        <div
          ref={scrollerRef}
          className="md:grid md:grid-cols-3 md:gap-6 flex gap-4 md:overflow-visible overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-6 md:mx-0 px-6 md:px-0 pb-2 md:pb-0"
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="group relative bg-grovva-paper rounded-2xl border border-grovva-line/80 p-6 md:p-7 flex flex-col gap-5 transition-all md:hover:border-grovva-green/50 md:hover:-translate-y-1 md:hover:shadow-[0_24px_50px_-22px_rgba(15,27,20,0.18)] snap-start shrink-0 w-[85%] md:w-auto"
            >
              {/* top row — quote mark + stars */}
              <div className="flex items-start justify-between">
                <div
                  className="em-serif text-grovva-green/80 text-[56px] leading-none select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </div>
                <div className="pt-3">
                  <StarRating />
                </div>
              </div>

              <blockquote className="text-grovva-text text-[15px] leading-relaxed -mt-4 flex-1">
                {t.text}
              </blockquote>

              {/* thin divider */}
              <div className="h-px bg-grovva-line" />

              <figcaption className="flex items-center gap-3 min-w-0">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="size-11 shrink-0 rounded-full object-cover ring-2 ring-grovva-green/15 ring-offset-2 ring-offset-grovva-paper"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-heading font-semibold text-grovva-text text-[14px] leading-tight truncate">
                    {t.name}
                  </div>
                </div>
              </figcaption>

            </figure>
          ))}
        </div>

        {/* Mobile-only carousel nav */}
        <div className="md:hidden flex items-center justify-center gap-4 mt-5">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Depoimento anterior"
            className="size-10 rounded-full border border-grovva-line flex items-center justify-center text-grovva-text bg-white hover:bg-grovva-green hover:text-white hover:border-grovva-green transition-colors cursor-pointer"
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Próximo depoimento"
            className="size-10 rounded-full border border-grovva-line flex items-center justify-center text-grovva-text bg-white hover:bg-grovva-green hover:text-white hover:border-grovva-green transition-colors cursor-pointer"
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        {/* Final CTA */}
        <div id="cta" className="mt-16 md:mt-32 text-center">
          <Reveal>
            <h3 className="font-heading font-semibold text-[28px] md:text-[46px] leading-[1.05] tracking-[-0.025em] text-grovva-text max-w-[760px] mx-auto text-balance">
              Vamos acelerar as{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-grovva-green font-bold">
                  vendas
                </span>
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 bottom-[0.08em] h-[0.3em] bg-grovva-green/20 -skew-x-6 z-0"
                />
              </span>{" "}
              da sua clínica?
            </h3>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10">
              <button type="button" data-contact-cta="true" className="btn-primary">
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
        </div>
      </div>
    </section>
  );
}
