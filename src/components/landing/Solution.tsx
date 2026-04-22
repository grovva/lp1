import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

const benefits: { icon: ReactNode; title: string; text: ReactNode }[] = [
  {
    title: "Geração de demanda",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    text: "Implementamos um sistema de captação ativo que gera novos pacientes toda semana sem você precisar torcer para alguém se lembrar de te indicar.",
  },
  {
    title: "Contato que vira avaliação",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    text: "Montamos o processo de abordagem da sua equipe no WhatsApp para que nenhum contato qualificado escape por falta de processo ou demora na resposta.",
  },
  {
    title: "Paciente que volta e indica",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </svg>
    ),
    text: "Criamos processos de retenção para garantir que o paciente complete o tratamento, retorne e indique sua clínica para quem ele conhece.",
  },
];

export function Solution() {
  return (
    <section
      className="relative py-14 md:py-32 bg-grovva-dark text-white overflow-hidden grain"
      style={{
        backgroundImage:
          "radial-gradient(800px 500px at 80% -10%, rgba(62,168,92,0.22), transparent 60%), radial-gradient(700px 400px at -10% 110%, rgba(62,168,92,0.12), transparent 60%)",
      }}
    >
      {/* top hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 max-w-[880px] text-center relative">
        {/* Heading */}
        <Reveal>
          <h2 className="font-heading font-semibold text-[28px] md:text-[42px] leading-[1.05] tracking-[-0.02em] text-white">
            Você não precisa de mais marketing,
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-grovva-green font-bold">
                precisa de vendas
              </span>
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-[0.08em] h-[0.3em] bg-grovva-green/25 -skew-x-6 z-0"
              />
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mt-7 max-w-[720px] mx-auto">
            Por isso a grovva implementa um Sistema Agenda Fácil sob medida
            para a sua clínica, onde cada estratégia é construída considerando
            a sua especialidade, o seu mercado e o paciente que você quer atrair.
          </p>
        </Reveal>

        {/* Benefit items */}
        <div className="flex flex-col gap-2 text-left max-w-[720px] mx-auto mt-12">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={0.15 + i * 0.08}>
              <article
                className="group relative grid grid-cols-[auto_1fr] gap-5 md:gap-6 items-start p-5 md:p-6 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all"
              >
                <div className="size-11 md:size-12 shrink-0 rounded-xl bg-white text-grovva-green flex items-center justify-center mt-1">
                  {benefit.icon}
                </div>

                <div className="min-w-0">
                  <h3 className="font-heading font-semibold text-white text-base md:text-lg mb-1.5 tracking-[-0.005em]">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 text-sm md:text-[15px] leading-relaxed">
                    {benefit.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-14">
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

      {/* bottom hairline */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
