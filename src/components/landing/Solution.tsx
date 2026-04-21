import Link from "next/link";
import type { ReactNode } from "react";

const benefits: { icon: ReactNode; text: ReactNode }[] = [
  {
    icon: (
      <svg className="size-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    text: (
      <>
        Aumentamos a demanda de novos pacientes com estratégias de marketing e
        vendas que geram resultado direto no{" "}
        <strong>faturamento</strong> da sua clínica.
      </>
    ),
  },
  {
    icon: (
      <svg className="size-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    text: "Montamos o processo de abordagem da sua equipe para converter cada contato em consulta agendada, extraindo o máximo de cada oportunidade.",
  },
  {
    icon: (
      <svg className="size-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </svg>
    ),
    text: "Criamos processos de retenção para garantir que o paciente retorne, complete o tratamento e indique sua clínica para quem ele conhece.",
  },
];

export function Solution() {
  return (
    <section className="py-16 md:py-24 bg-grovva-bg">
      <div className="container mx-auto px-4 max-w-[800px] text-center">
        {/* Heading */}
        <h2 className="font-heading text-[28px] md:text-[38px] leading-[1.2] text-grovva-text mb-4">
          Você não precisa de mais marketing,
          <br />
          <span className="inline-block bg-grovva-green text-white px-4 py-1 rounded-sm font-bold mt-2">
            precisa de vendas!
          </span>
        </h2>

        <p className="text-grovva-muted text-base md:text-lg italic mt-6 mb-2">
          Por isso a Grovva criou o{" "}
          <strong className="font-bold not-italic">Sistema Agenda Fácil</strong>
          , dedicado inteiramente a fazer sua clínica atrair, converter e reter
          novos pacientes todo mês.
        </p>

        <p className="text-grovva-green font-bold italic text-base md:text-lg mt-6 mb-8">
          Na prática, é assim que nosso trabalho acontece:
        </p>

        {/* Benefit items */}
        <div className="flex flex-col gap-6 text-left max-w-[650px] mx-auto">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="size-14 shrink-0 rounded-xl bg-[#2a5a3a] flex items-center justify-center">
                {benefit.icon}
              </div>
              <p className="text-grovva-muted text-sm md:text-base italic leading-relaxed pt-1">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="#cta"
            className="inline-flex items-center justify-center bg-grovva-green hover:bg-grovva-green-dark text-white font-bold text-sm uppercase tracking-wider px-12 py-4 rounded-full transition-colors"
          >
            Quero mais informações
          </Link>
        </div>
      </div>
    </section>
  );
}
