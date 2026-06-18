import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { GrowthChart } from "@/components/landing/charts/GrowthChart";
import { AutomationCycle } from "@/components/landing/charts/AutomationCycle";
import { SalesFunnel } from "@/components/landing/charts/SalesFunnel";
import { DashboardOperation } from "@/components/landing/charts/DashboardOperation";
import { LeadToSaleFlow } from "@/components/landing/charts/LeadToSaleFlow";



function AutomationFlowVisual() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-grovva-ink aspect-square">
      <Image
        src="/images/sales-flow-bg.png"
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 320px"
      />
      <div className="absolute inset-0 flex items-center justify-center p-2 md:p-3">
        <Image
          src="/images/sales-flow-clock.png"
          alt="Automação Grovva, fluxo de atendimento e fechamento"
          width={1536}
          height={1024}
          className="w-full h-auto max-w-[88%] object-contain"
        />
      </div>
    </div>
  );
}

function PipelineVisual() {
  const stages = [
    { name: "Novo lead", count: 24, color: "bg-grovva-green/15", text: "text-grovva-green" },
    { name: "Em contato", count: 18, color: "bg-grovva-green/25", text: "text-grovva-green" },
    { name: "Proposta", count: 11, color: "bg-grovva-green/40", text: "text-white" },
    { name: "Fechamento", count: 7, color: "bg-grovva-green", text: "text-white" },
  ];
  return (
    <div className="mt-5 grid grid-cols-4 gap-2.5">
      {stages.map((s, i) => (
        <div
          key={s.name}
          className={`rounded-xl ${s.color} border border-grovva-line/40 p-3`}
        >
          <p className={`text-[10px] font-semibold uppercase tracking-wider ${s.text} opacity-80`}>
            {s.name}
          </p>
          <p className={`mt-1 text-2xl font-bold ${s.text}`}>{s.count}</p>
          <div className="mt-3 space-y-1.5">
            {Array.from({ length: Math.min(3, s.count) }).map((_, j) => (
              <div
                key={j}
                className={`h-1.5 rounded-full ${i >= 2 ? "bg-white/50" : "bg-grovva-green/40"}`}
                style={{ width: `${100 - j * 15}%` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
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

export function Solution() {
  return (
    <section
      className="relative py-12 md:pb-28 md:pt-20"
      style={{ backgroundColor: "#EEF2F5" }}
    >
      <div className="container mx-auto px-6 max-w-[1200px] relative">
        {/* Header */}
        <div className="mb-10 md:mb-14 max-w-[900px] mx-auto text-center">
          <Reveal>
            <h2 className="font-heading font-bold text-[34px] md:text-[48px] lg:text-[56px] leading-[1.02] tracking-[-0.025em] text-grovva-ink text-balance">
              Seu negócio não precisa de mais marketing, precisa{" "}
              <span className="text-grovva-green-dark whitespace-nowrap">
                vender mais.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-grovva-muted text-base md:text-[17px] leading-relaxed max-w-[720px] mx-auto">
              Gerar leads sem processo comercial não adianta nada.
              <br />
              Por isso o sistema Grovva Sales integra geração de demanda e
              força de vendas para que cada oportunidade seja aproveitada.
            </p>
          </Reveal>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-2.5">
          {/* Card 1, Geração de leads qualificados (4 cols) */}
          <div className="md:col-span-4 group h-full">
          <article className="h-full rounded-2xl bg-white p-6 md:p-7 flex flex-col transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_-12px_rgba(15,27,20,0.12)] group-hover:ring-1 group-hover:ring-grovva-green/15">
            <Reveal delay={0.05} y={10}>
              <h3 className="font-heading font-semibold text-grovva-text text-lg md:text-xl tracking-[-0.01em]">
                Geração de leads qualificados
              </h3>
            </Reveal>
            <Reveal delay={0.13} y={10} className="mt-2">
              <p className="text-sm text-grovva-muted leading-relaxed">
                Construímos campanhas que filtram curiosos e entregam ao seu
                time apenas quem tem perfil e intenção real de compra.
              </p>
            </Reveal>
            <Reveal delay={0.21} y={10} className="mt-auto">
              <SalesFunnel />
            </Reveal>
          </article>
          </div>

          {/* Card 3, O sistema trabalha (3 cols, narrow) */}
          <div className="md:col-span-3 group h-full">
          <article className="h-full rounded-2xl bg-white p-6 md:p-7 flex flex-col transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_-12px_rgba(15,27,20,0.12)] group-hover:ring-1 group-hover:ring-grovva-green/15">
            <Reveal delay={0.05} y={10}>
              <h3 className="font-heading font-semibold text-grovva-text text-base md:text-lg tracking-[-0.01em]">
                O sistema trabalha enquanto seu time vende
              </h3>
            </Reveal>
            <Reveal delay={0.13} y={10} className="mt-2">
              <p className="text-[13px] text-grovva-muted leading-relaxed">
                Follow-ups, agendas, recuperação de leads e cobranças
                acontecem de forma automática.
              </p>
            </Reveal>
            <Reveal delay={0.21} y={10} className="mt-auto pt-5">
              <AutomationCycle />
            </Reveal>
          </article>
          </div>

          {/* Card 5, Crescimento que não depende de sorte (5 cols) */}
          <div className="md:col-span-5 group h-full">
          <article className="h-full rounded-2xl bg-white p-6 md:p-7 flex flex-col transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_-12px_rgba(15,27,20,0.12)] group-hover:ring-1 group-hover:ring-grovva-green/15">
            <Reveal delay={0.05} y={10}>
              <h3 className="font-heading font-semibold text-grovva-text text-lg md:text-xl tracking-[-0.01em]">
                Crescimento que não depende de sorte
              </h3>
            </Reveal>
            <Reveal delay={0.13} y={10} className="mt-2">
              <p className="text-sm text-grovva-muted leading-relaxed">
                Com marketing, vendas e dados integrados em um único sistema,
                cada decisão é tomada com base em resultado real. É assim que
                negócios escalam com consistência.
              </p>
            </Reveal>
            <Reveal delay={0.21} y={10} className="mt-auto pt-2">
              <GrowthChart />
            </Reveal>
          </article>
          </div>

          {/* Card 4 (agora à esquerda), Controle da sua operação (7 cols, wide) */}
          <div className="md:col-span-7 group h-full">
          <article className="h-full rounded-2xl bg-white p-6 md:p-7 flex flex-col transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_-12px_rgba(15,27,20,0.12)] group-hover:ring-1 group-hover:ring-grovva-green/15">
            <Reveal delay={0.05} y={10}>
              <h3 className="font-heading font-semibold text-grovva-text text-lg md:text-xl tracking-[-0.01em]">
                Controle da sua operação
              </h3>
            </Reveal>
            <Reveal delay={0.13} y={10} className="mt-2">
              <p className="text-sm md:text-[15px] text-grovva-muted leading-relaxed">
                Painel com os dados que importam: quantas oportunidades estão
                abertas, onde estão travando e quanto está sendo gerado em
                tempo real. Sem achismos, sem surpresa no fim do mês.
              </p>
            </Reveal>
            <Reveal delay={0.21} y={10} className="mt-auto">
              <DashboardOperation />
            </Reveal>
          </article>
          </div>

          {/* Card 2 (agora à direita), Seu time para de perder venda (5 cols) */}
          <div className="md:col-span-5 group h-full">
          <article className="h-full rounded-2xl bg-white p-6 md:p-7 flex flex-col transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_-12px_rgba(15,27,20,0.12)] group-hover:ring-1 group-hover:ring-grovva-green/15">
            <Reveal delay={0.05} y={10}>
              <h3 className="font-heading font-semibold text-grovva-text text-lg md:text-xl tracking-[-0.01em]">
                Seu time para de perder venda por falta de processo
              </h3>
            </Reveal>
            <Reveal delay={0.13} y={10} className="mt-2">
              <p className="text-sm text-grovva-muted leading-relaxed">
                Cada lead entra em um funil estruturado, é atendido na hora
                certa pela IA e acompanhado até o fechamento. Nenhuma
                oportunidade cai no esquecimento, nenhuma venda é perdida por
                demora ou falta de follow-up.
              </p>
            </Reveal>
            <Reveal delay={0.21} y={10} className="mt-auto">
              <LeadToSaleFlow />
            </Reveal>
          </article>
          </div>
        </div>

        {/* CTA abaixo dos cards */}
        <Reveal delay={0.3}>
          <div className="mt-12 md:mt-16 flex justify-center">
            <button
              type="button"
              data-contact-cta="true"
              className="btn-primary"
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
      </div>
    </section>
  );
}
