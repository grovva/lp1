import { Fragment, type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

type Step = {
  number: string;
  title: string;
  description: string;
  funnel: string;
  icon: ReactNode;
};

const steps: Step[] = [
  {
    number: "ETAPA 001",
    title: "Geração de Demanda",
    description:
      "Criamos campanhas que atraem leads com perfil e intenção de compra, para o seu time receber apenas quem já está pronto para conversar.",
    funnel: "TOPO DO FUNIL",
    icon: (
      <svg
        className="size-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    number: "ETAPA 002",
    title: "Força de Vendas",
    description:
      "Estruturamos o processo comercial completo: CRM configurado, atendimento com IA e treinamento do time para que nenhuma oportunidade seja perdida por falta de processo ou demora na resposta.",
    funnel: "MEIO DO FUNIL",
    icon: (
      <svg
        className="size-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    number: "ETAPA 003",
    title: "Inteligência de Crescimento",
    description:
      "Construímos um dashboard exclusivo onde cada número conta a história real do seu negócio. Nada de relatório genérico, acompanhamos os dados juntos e tomamos as decisões certas no momento certo para garantir que o crescimento continue acontecendo.",
    funnel: "FUNDO DO FUNIL",
    icon: (
      <svg
        className="size-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 4 4 5-5" />
        <path d="M17 9h4v4" />
      </svg>
    ),
  },
];

function CheckIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

export function SalesSystem() {
  return (
    <section
      className="relative overflow-hidden bg-grovva-dark text-white py-20 md:py-32"
      style={{
        backgroundImage:
          "radial-gradient(800px 500px at 80% 0%, rgba(62,168,92,0.18), transparent 60%), radial-gradient(700px 400px at 0% 100%, rgba(62,168,92,0.12), transparent 60%), radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "auto, auto, 22px 22px",
        backgroundPosition: "center, center, 0 0",
      }}
    >
      {/* Top hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 max-w-[1200px] relative">
        {/* Header */}
        <div className="text-center max-w-[900px] mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-grovva-green/40 bg-grovva-green/[0.1] px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-grovva-green">
              <span className="size-1.5 rounded-full bg-grovva-green" />
              Sistema
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-6 font-heading font-bold text-[32px] md:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.025em] text-balance">
              Seu negócio pode gerar e converter mais leads com o sistema{" "}
              <span className="text-grovva-green">Grovva Sales</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 text-white/65 text-base md:text-[17px] leading-relaxed max-w-[760px] mx-auto">
              O sistema Grovva Sales é responsável por gerar mais de R$40
              milhões em faturamento para operações no Brasil e ao redor do
              mundo.
            </p>
          </Reveal>

          {/* Chips */}
          <Reveal delay={0.24}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
              {[
                "+R$40M em faturamento gerado",
                "Já validado por outros empresários",
              ].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12px] md:text-[13px] text-white/85"
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-grovva-green/20 text-grovva-green">
                    <CheckIcon />
                  </span>
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="mt-10 text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-white/45">
              Tudo baseado nesses 3 passos
            </p>
          </Reveal>
        </div>

        {/* Steps grid — cards conectados por line + pulsing dot nos gaps */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-0 md:items-stretch">
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              <Reveal delay={0.4 + i * 0.16}>
                <article
                  className="group h-full flex flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-7 md:p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.05] hover:border-grovva-green/30"
                  style={{
                    boxShadow:
                      "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 30px 60px -30px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-grovva-green/15 text-grovva-green">
                    {step.icon}
                  </div>

                  <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                    {step.number}
                  </p>

                  <h3 className="mt-2 font-heading font-semibold text-white text-[17px] md:text-[19px] leading-[1.2] tracking-[-0.01em]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-[14px] md:text-[15px] text-white/65 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="mt-auto pt-6">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-grovva-green">
                      <ArrowRight className="size-3.5" />
                      {step.funnel}
                    </span>
                  </div>
                </article>
              </Reveal>

              {/* Connector entre cards (não renderizado depois do último) */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:flex w-8 lg:w-10 items-center self-center px-1"
                >
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-grovva-green/50" />
                  <span className="relative mx-2 flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-grovva-green opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-grovva-green shadow-[0_0_12px_rgba(62,168,92,0.6)]" />
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-grovva-green/50" />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.7}>
          <div className="mt-12 md:mt-16 flex justify-center">
            <button
              type="button"
              data-contact-cta="true"
              className="btn-primary"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(62,168,92,0.25), 0 18px 40px -10px rgba(62,168,92,0.55)",
              }}
            >
              Quero saber mais
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

      {/* Bottom hairline */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
