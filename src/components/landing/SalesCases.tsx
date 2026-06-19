"use client";

import { useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";

type Case = {
  id: string;
  name: string;
  role: string;
  segment: string;
  metric: string;
  metricLabel: string;
  desafio: string;
  oQueFizemos: string;
  resultado: string;
};

const cases: Case[] = [
  {
    id: "atila",
    name: "Dr. Átila Venturino",
    role: "Nova Clin Fisio",
    segment: "Saúde",
    metric: "+4.000",
    metricLabel: "pacientes gerados · +R$ 300K em receita",
    desafio:
      "A Nova Clin Fisio dependia exclusivamente de indicações para atrair novos pacientes, sem presença em anúncios e sem previsibilidade de crescimento.",
    oQueFizemos:
      "Estruturamos toda a operação de mídia paga do zero: estudo do público da região, construção de oferta direcionada e lançamento das primeiras campanhas, um trabalho que evoluiu e se consolidou ao longo do tempo.",
    resultado:
      "Três anos de parceria, mais de 4.000 pacientes gerados através dos anúncios com faturamento superior a R$ 300.000.",
  },
  {
    id: "andrea",
    name: "Andréa Vallis",
    role: "Mercado imobiliário · São Paulo",
    segment: "Imobiliário",
    metric: "65.106%",
    metricLabel: "de ROI em menos de 15 dias",
    desafio:
      "Vender um apartamento no Itaim Bibi, em São Paulo, com velocidade e sem depender de indicação.",
    oQueFizemos:
      "Estudamos o mercado, construímos uma oferta direcionada ao perfil do comprador ideal e desenvolvemos criativos de alta conversão. Em menos de 15 dias a unidade foi vendida no lançamento.",
    resultado: "R$ 983 investidos e R$ 640.000 em receita gerada.",
  },
  {
    id: "thiago",
    name: "Thiago Costa",
    role: "Pátria Cidadania",
    segment: "Cidadania",
    metric: "10×",
    metricLabel: "de faturamento em 60 dias",
    desafio:
      "A Pátria Cidadania estava travada no mesmo patamar de faturamento e não conseguia escalar além dos R$ 100K mensais.",
    oQueFizemos:
      "Construímos uma estrutura completa de geração de demanda com anúncios qualificados, implementamos o CRM e configuramos automações de follow-up para que nenhuma oportunidade fosse perdida pelo time comercial.",
    resultado:
      "No segundo mês de parceria a empresa atingiu R$ 1.000.000 de faturamento, 10x acima do ponto de partida.",
  },
  {
    id: "douglas",
    name: "Douglas Oliveira",
    role: "Parket",
    segment: "Serviços",
    metric: "R$ 1,2M",
    metricLabel: "em contratos · +8.000 seguidores em 60 dias",
    desafio:
      "A Parket precisava crescer sua presença digital e ao mesmo tempo transformar esse crescimento no Instagram em contratos fechados, dois objetivos que a maioria das agências trata de forma separada.",
    oQueFizemos:
      "Estudamos o público, estruturamos os conteúdos do perfil para impulsionamento via anúncios e montamos em paralelo uma estratégia dedicada à geração de leads qualificados.",
    resultado:
      "Em 60 dias: mais de 8.000 novos seguidores no Instagram e R$ 1.200.000 em contratos de serviço fechados.",
  },
];

const beats = [
  { key: "desafio" as const, label: "O desafio" },
  { key: "oQueFizemos" as const, label: "O que fizemos" },
  { key: "resultado" as const, label: "O resultado" },
];

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

export function SalesCases() {
  const [active, setActive] = useState(0);
  const touchX = useRef<number | null>(null);
  const total = cases.length;

  const go = (i: number) => setActive((i + total) % total);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 45) go(active + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  return (
    <section id="cases" className="bg-white py-12 md:py-32 scroll-mt-20">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Header */}
        <div className="text-center max-w-[900px] mx-auto mb-12 md:mb-16">
          <Reveal>
            <h2 className="font-heading font-bold text-[32px] md:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.025em] text-grovva-ink text-balance">
              Isso que o sistema e a estratégia da{" "}
              <span className="text-grovva-green-dark">Grovva</span> podem fazer
              no seu negócio
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-grovva-muted text-base md:text-[17px] leading-relaxed max-w-[820px] mx-auto">
              O nosso único objetivo é fazer com que cada venda do seu negócio
              seja previsível, lucrativa e recorrente. E não precisa acreditar
              só nas nossas palavras, veja as histórias de quem já chegou lá:
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          {/* Trilho do carrossel */}
          <div
            className="overflow-hidden rounded-3xl"
            style={{ border: "1px solid #E4DFD5", boxShadow: "0 20px 60px -28px rgba(15, 27, 20, 0.22)" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Faixa verde no topo — dá identidade e separa do card branco acima */}
            <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #3EA85C, #14545B)" }} />
            <div
              className="flex"
              style={{
                transform: `translateX(-${active * 100}%)`,
                transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {cases.map((c, i) => (
                <article
                  key={c.id}
                  aria-hidden={i !== active}
                  className="relative min-w-full overflow-hidden p-7 md:p-11"
                  style={{ background: "linear-gradient(160deg, #FFFFFF 0%, #FBFAF6 52%, #EFF6F0 100%)" }}
                >
                  {/* Brilho verde sutil no canto */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(62,168,92,0.12), transparent 70%)" }}
                  />
                  {/* Número do caso em marca d'água ao fundo */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-1 right-3 select-none font-heading text-[150px] font-bold leading-none tracking-tighter"
                    style={{ color: "rgba(15,27,20,0.035)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-[1]">
                  {/* Cabeçalho do case: cliente protagonista */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-grovva-green-soft font-heading text-[15px] font-bold text-grovva-green-dark">
                        {initials(c.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="font-heading text-[19px] font-bold leading-tight tracking-[-0.02em] text-grovva-ink md:text-[21px]">
                          {c.name}
                        </p>
                        <p className="mt-0.5 text-[13px] leading-tight text-grovva-muted">
                          {c.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <span className="rounded-full border border-grovva-line px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-grovva-green-dark">
                        {c.segment}
                      </span>
                      <span className="hidden font-heading text-[12px] font-semibold tracking-[0.08em] text-grovva-muted sm:block">
                        Caso {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-7 h-px bg-grovva-line" />

                  {/* Corpo: resultado destacado + narrativa */}
                  <div className="mt-7 grid grid-cols-1 gap-7 md:grid-cols-[270px_1fr] md:gap-11">
                    {/* Bloco de resultado */}
                    <div className="self-start rounded-2xl bg-grovva-green-soft p-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-grovva-green-dark">
                        Resultado
                      </p>
                      <p className="mt-2.5 font-heading text-[48px] font-bold leading-[0.9] tracking-[-0.035em] text-grovva-green-dark md:text-[54px]">
                        {c.metric}
                      </p>
                      <p className="mt-2 text-[13.5px] leading-snug text-grovva-text/80">
                        {c.metricLabel}
                      </p>
                    </div>

                    {/* Narrativa */}
                    <div className="flex flex-col justify-center gap-4">
                      {beats.map((b) => (
                        <div
                          key={b.key}
                          className={`border-l-2 pl-4 ${
                            b.key === "resultado" ? "border-grovva-green" : "border-grovva-line"
                          }`}
                        >
                          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-grovva-green-dark">
                            {b.label}
                          </p>
                          <p
                            className={
                              b.key === "resultado"
                                ? "text-[14px] font-medium leading-relaxed text-grovva-ink"
                                : "text-[14px] leading-relaxed text-grovva-muted"
                            }
                          >
                            {c[b.key]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Controles */}
          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              type="button"
              aria-label="Case anterior"
              onClick={() => go(active - 1)}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-grovva-line bg-white text-grovva-ink transition hover:border-grovva-green hover:text-grovva-green-dark"
            >
              <Arrow dir="left" />
            </button>

            <div className="flex items-center gap-2.5">
              {cases.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  aria-label={`Ir para ${c.name}`}
                  aria-current={i === active}
                  onClick={() => go(i)}
                  className="cursor-pointer rounded-full transition-all"
                  style={{
                    height: 8,
                    width: i === active ? 26 : 8,
                    background: i === active ? "#2F8447" : "#D8D2C6",
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Próximo case"
              onClick={() => go(active + 1)}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-grovva-line bg-white text-grovva-ink transition hover:border-grovva-green hover:text-grovva-green-dark"
            >
              <Arrow dir="right" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
