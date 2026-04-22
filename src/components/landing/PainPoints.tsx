import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

const painPoints: { icon: ReactNode; title: string; description: string }[] = [
  {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Sua recepção não sabe vender",
    description:
      "Sua recepção tem medo do contato direto com o cliente, evita até fazer ligação com medo de ouvir um não ou estragar tudo.",
  },
  {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Sem processo, não tem venda",
    description:
      "Se o paciente não chega praticamente pedindo para agendar, sua equipe não sabe gerar interesse no lead e ele fecha com o concorrente.",
  },
  {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    title: "Agência prometeu e não entregou",
    description:
      "Prometeram agenda cheia e resultados extraordinários, no fim sobrou relatório bonito, curtida e seguidor. Paciente novo, zero.",
  },
];

export function PainPoints() {
  return (
    <section className="py-12 md:py-28 bg-white relative">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Heading */}
        <Reveal>
          <h2 className="font-heading font-medium text-[24px] sm:text-[28px] md:text-[38px] leading-[1.1] tracking-[-0.02em] text-grovva-text mb-10 md:mb-16 max-w-[860px] lg:max-w-[600px] text-balance text-center lg:text-left mx-auto lg:mx-0">
            Por isso sua clínica vive com o{" "}
            <strong className="font-bold">faturamento travado</strong> e{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-grovva-green font-bold">
                dependendo de indicação
              </span>
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-[0.08em] h-[0.3em] bg-grovva-green/20 -skew-x-6 z-0"
              />
            </span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-16 items-center">
          {/* Left — pain point cards */}
          <div className="flex flex-col gap-3">
            {painPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.08}>
                <article
                  className="group bg-grovva-paper rounded-2xl p-5 md:p-6 flex items-center gap-5 border border-grovva-line/80 transition-all hover:border-grovva-green/60 hover:shadow-[0_14px_40px_-20px_rgba(15,27,20,0.18)]"
                >
                  <div className="size-11 shrink-0 rounded-xl bg-grovva-green/10 text-grovva-green flex items-center justify-center transition-colors group-hover:bg-grovva-green group-hover:text-white">
                    {point.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-[15px] md:text-base text-grovva-text mb-1.5 tracking-[-0.005em]">
                      {point.title}
                    </h3>
                    <p className="text-grovva-muted text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}

            <button type="button" data-contact-cta="true" className="btn-primary w-fit mt-6 mx-auto lg:mx-0">
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

          {/* Right — portrait image with decorative rings behind (hidden on mobile) */}
          <div className="hidden lg:flex justify-center lg:justify-end lg:-mt-16">
            <div className="relative size-[400px] md:size-[520px] flex items-center justify-center">
              {/* decorative rings behind the image */}
              <div className="absolute inset-0 rounded-full border border-grovva-green/35" />
              <div className="absolute inset-4 sm:inset-5 rounded-full border border-grovva-green/20" />

              {/* rectangular image with rounded corners */}
              <div
                className="relative w-[200px] sm:w-[270px] md:w-[350px] h-[260px] sm:h-[340px] md:h-[440px] overflow-hidden"
                style={{ borderRadius: "24px" }}
              >
                <Image
                  src="/images/pain-woman-v2.jpg"
                  alt="Profissional frustrada"
                  width={440}
                  height={560}
                  className="size-full object-cover"
                  style={{ borderRadius: "24px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
