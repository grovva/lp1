import type { ReactNode } from "react";
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
    number: "001",
    title: "Geração de Demanda",
    description:
      "Criamos campanhas que atraem leads com perfil e intenção real de compra, chega de curiosos pedindo preço e sumindo, assim seu time recebe apenas quem já está pronto para conversar e fechar negócio.",
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
        <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
      </svg>
    ),
  },
  {
    number: "002",
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
    number: "003",
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

function MoneyIcon() {
  return (
    <svg
      className="size-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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
      id="growth"
      className="relative overflow-hidden text-white py-20 md:py-32 scroll-mt-20"
      style={{
        background:
          "radial-gradient(900px 600px at 50% 0%, rgba(20, 84, 91, 0.55), transparent 70%), linear-gradient(180deg, #0a1814 0%, #060d0a 100%)",
      }}
    >
      {/* Top hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 max-w-[1200px] relative">
        {/* Header */}
        <div className="text-center max-w-[900px] mx-auto">
          <Reveal>
            <h2 className="font-heading font-bold text-[32px] md:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.025em] text-balance">
              É assim que negócios escalam{" "}
              <span className="text-grovva-green">
                sem depender de sorte ou indicação
              </span>
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
                { label: "+R$40M em faturamento gerado", icon: <MoneyIcon /> },
                { label: "Já validado por outros empresários", icon: <CheckIcon /> },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12px] md:text-[13px] text-white/85"
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-grovva-green/20 text-grovva-green">
                    {chip.icon}
                  </span>
                  {chip.label}
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

        {/* Steps grid, glass cards com numeral watermark suave */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={0.4 + i * 0.12} className="group h-full">
              <article
                className="relative h-full flex flex-col rounded-2xl overflow-hidden p-7 md:p-8 transition-all duration-300 ease-out group-hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(165deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                <div className="relative">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-grovva-green/20 text-grovva-green">
                    {step.icon}
                  </div>

                  <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-grovva-green">
                    Etapa {step.number}
                  </p>

                  <h3 className="mt-1.5 font-heading font-semibold text-white text-[18px] md:text-[20px] leading-[1.2] tracking-[-0.01em]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-[14px] md:text-[15px] text-white/65 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-auto pt-6 relative">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-grovva-green">
                    <ArrowRight className="size-3.5" />
                    {step.funnel}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
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
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
