import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

function SalesFunnel() {
  const stages = [
    { label: "Visitantes", value: "9.490", opacity: 0.22, dark: false },
    { label: "Leads", value: "2.847", opacity: 0.48, dark: false },
    { label: "Qualificados", value: "1.139", opacity: 0.78, dark: true },
    { label: "Clientes", value: "311", opacity: 1, dark: true },
  ];
  const sectionH = 52;
  const gap = 5;
  const taper = 22;
  const centerX = 160;

  return (
    <div className="relative mt-5">
      <svg
        viewBox="0 0 320 230"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="grovva-funnel" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3EA85C" />
            <stop offset="100%" stopColor="#2F8447" />
          </linearGradient>
        </defs>
        {stages.map((s, i) => {
          const top = i * (sectionH + gap);
          const bottom = top + sectionH;
          const startX = 20 + i * taper;
          const endX = 320 - 20 - i * taper;
          const nextStartX = startX + taper;
          const nextEndX = endX - taper;
          return (
            <g key={s.label}>
              <path
                d={`M ${startX} ${top} L ${endX} ${top} L ${nextEndX} ${bottom} L ${nextStartX} ${bottom} Z`}
                fill="url(#grovva-funnel)"
                opacity={s.opacity}
              />
              <text
                x={centerX}
                y={top + 22}
                fill={s.dark ? "#FFFFFF" : "#141A16"}
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
                fontFamily="inherit"
                letterSpacing="0.02em"
              >
                {s.label}
              </text>
              <text
                x={centerX}
                y={top + 40}
                fill={s.dark ? "#FFFFFF" : "#141A16"}
                fontSize="15"
                fontWeight="700"
                textAnchor="middle"
                fontFamily="inherit"
              >
                {s.value}
              </text>
            </g>
          );
        })}
        {/* taxa de conversão badge na lateral */}
        <g>
          <line
            x1="305"
            y1="0"
            x2="305"
            y2="230"
            stroke="#E4DFD5"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        </g>
      </svg>
      <div className="absolute top-1 right-0 rounded-md bg-grovva-green px-2 py-1 text-[10px] font-semibold text-white shadow-md">
        10,92% conversão
      </div>
    </div>
  );
}

function AutomationIcons() {
  const items = [
    {
      label: "WhatsApp",
      icon: (
        <path
          fill="currentColor"
          stroke="none"
          d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91a9.85 9.85 0 0 0-2.91-7.01zm-7.01 15.24h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.23 8.23 0 0 1 8.24 8.24c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.99-1.22-.74-.65-1.23-1.46-1.38-1.71-.14-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.83-.2-.49-.41-.42-.56-.43h-.48a.92.92 0 0 0-.67.31c-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.57c.12.16 1.76 2.69 4.27 3.77.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.1-.23-.16-.48-.28z"
        />
      ),
    },
    {
      label: "Agenda",
      icon: (
        <>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
          <path d="m9 16 2 2 4-4" />
        </>
      ),
    },
    {
      label: "Recuperação de lead",
      icon: (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 21v-1a7 7 0 0 1 14 0v1" />
        </>
      ),
    },
    {
      label: "Follow-up",
      icon: (
        <>
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </>
      ),
    },
    {
      label: "Cobrança",
      icon: (
        <>
          <line x1="12" y1="2" x2="12" y2="22" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </>
      ),
    },
  ];
  // Pentagon arrangement on outer ring
  const angles = [-90, -18, 54, 126, 198];
  const radius = 40; // percent from center, matches outer ring
  const positions = angles.map((a) => ({
    x: 50 + radius * Math.cos((a * Math.PI) / 180),
    y: 50 + radius * Math.sin((a * Math.PI) / 180),
  }));

  return (
    <div className="relative aspect-square w-full">
      {/* Orbital rings */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#3EA85C"
          strokeWidth="0.35"
          opacity="0.4"
        />
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="none"
          stroke="#3EA85C"
          strokeWidth="0.35"
          opacity="0.25"
        />
      </svg>

      {/* Icons positioned on outer ring */}
      {items.map((item, i) => (
        <div
          key={item.label}
          className="absolute flex size-11 md:size-12 items-center justify-center rounded-full bg-white border border-grovva-line shadow-sm"
          style={{
            top: `${positions[i].y}%`,
            left: `${positions[i].x}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <svg
            className="size-5 text-grovva-green"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {item.icon}
          </svg>
        </div>
      ))}

      {/* Center — IA robot mark */}
      <div className="absolute top-1/2 left-1/2 flex size-12 md:size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-grovva-green shadow-md">
        <svg
          className="size-6 md:size-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Antenna */}
          <path d="M12 2v3" />
          <circle cx="12" cy="2" r="1" fill="currentColor" stroke="none" />
          {/* Head — rounded square */}
          <rect x="3.5" y="6" width="17" height="13" rx="4" />
          {/* Side ports */}
          <path d="M2.5 11v3M21.5 11v3" />
          {/* Eyes (filled) */}
          <circle cx="9" cy="11.5" r="1.8" fill="currentColor" stroke="none" />
          <circle cx="15" cy="11.5" r="1.8" fill="currentColor" stroke="none" />
          {/* Smile */}
          <path d="M9 15.5c1 1 5 1 6 0" />
        </svg>
      </div>
    </div>
  );
}

function LeadToSaleVisual() {
  const dashedBg = {
    backgroundImage:
      "linear-gradient(to right, #3EA85C 50%, transparent 50%)",
    backgroundSize: "8px 1px",
    backgroundRepeat: "repeat-x",
    opacity: 0.4,
  };
  return (
    <div className="mt-5 rounded-2xl bg-grovva-card-bg p-5">
      <div className="flex items-start justify-between gap-2">
        {/* Pessoa (lead) */}
        <div className="flex shrink-0 flex-col items-center gap-2">
          <div className="flex size-16 items-center justify-center rounded-full bg-grovva-green/15 text-grovva-green">
            <svg
              className="size-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M5 21v-1a7 7 0 0 1 14 0v1" />
            </svg>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-grovva-muted">
            Lead
          </span>
        </div>

        {/* Conector + chat com label */}
        <div className="flex flex-1 items-start">
          <div className="h-px flex-1 mt-8" style={dashedBg} />
          <div className="mx-2 flex shrink-0 flex-col items-center gap-2">
            <div className="flex size-[72px] items-center justify-center rounded-full bg-white border border-grovva-line shadow-sm text-grovva-green">
              <svg
                className="size-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-grovva-muted whitespace-nowrap">
              Atendimento ágil
            </span>
          </div>
          <div className="h-px flex-1 mt-8" style={dashedBg} />
        </div>

        {/* Dinheiro (venda) */}
        <div className="flex shrink-0 flex-col items-center gap-2">
          <div className="flex size-16 items-center justify-center rounded-full bg-grovva-green text-white shadow-md">
            <svg
              className="size-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="2" x2="12" y2="22" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-grovva-muted">
            Venda
          </span>
        </div>
      </div>
    </div>
  );
}

function GrowthChart() {
  return (
    <div className="mt-4 relative">
      <svg
        viewBox="0 0 360 160"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3EA85C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3EA85C" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* flowing area */}
        <path
          d="M0 130 C 60 125, 100 132, 140 118 C 180 104, 200 122, 230 95 C 260 68, 290 78, 320 40 C 340 18, 350 22, 360 14 L 360 160 L 0 160 Z"
          fill="url(#growth-fill)"
        />
        {/* main curve */}
        <path
          d="M0 130 C 60 125, 100 132, 140 118 C 180 104, 200 122, 230 95 C 260 68, 290 78, 320 40 C 340 18, 350 22, 360 14"
          stroke="#3EA85C"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* single emphasis marker near the top */}
        <circle cx="320" cy="40" r="7" fill="#FFFFFF" stroke="#3EA85C" strokeWidth="3" />
        <circle cx="320" cy="40" r="3" fill="#3EA85C" />
      </svg>
      <div className="absolute top-1 right-1 rounded-md bg-grovva-green px-2 py-1 text-[10px] font-semibold text-white shadow-md">
        +132% receita
      </div>
    </div>
  );
}

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
          alt="Automação Grovva — fluxo de atendimento e fechamento"
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

function DashboardVisual() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-2.5">
      <div className="rounded-xl border border-grovva-line bg-white p-3">
        <p className="text-[10px] uppercase tracking-wider text-grovva-muted">
          Oportunidades
        </p>
        <p className="mt-1 text-xl font-bold text-grovva-text">1.139</p>
        <p className="text-[10px] text-grovva-green font-semibold">
          qualificados
        </p>
      </div>
      <div className="rounded-xl border border-grovva-line bg-white p-3">
        <p className="text-[10px] uppercase tracking-wider text-grovva-muted">
          Receita gerada
        </p>
        <p className="mt-1 text-xl font-bold text-grovva-text">R$ 84k</p>
        <p className="text-[10px] text-grovva-green font-semibold">+23% mês</p>
      </div>
      <div className="col-span-2 rounded-xl border border-grovva-line bg-white p-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] uppercase tracking-wider text-grovva-muted">
            Conversão por etapa
          </p>
          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-grovva-green">
            ↗ 10,92% conversão
          </span>
        </div>
        <div className="space-y-1.5">
          {(() => {
            const stages = [
              { label: "Visitantes", count: 9490 },
              { label: "Leads", count: 2847 },
              { label: "Qualificados", count: 1139 },
              { label: "Clientes", count: 311 },
            ];
            const max = stages[0].count;
            return stages.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="w-[68px] shrink-0 text-[10px] text-grovva-text">
                  {s.label}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-grovva-line/50">
                  <div
                    className="h-full rounded-full bg-grovva-green"
                    style={{ width: `${(s.count / max) * 100}%` }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-[10px] font-semibold tabular-nums text-grovva-text">
                  {s.count.toLocaleString("pt-BR")}
                </span>
              </div>
            ));
          })()}
        </div>
      </div>
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
    <section className="relative py-16 md:py-28 bg-grovva-bg">
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
          {/* Card 1 — Geração de leads qualificados (4 cols) */}
          <Reveal delay={0.05} className="md:col-span-4">
            <article className="group h-full rounded-2xl bg-white p-6 md:p-7 flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(15,27,20,0.12)] hover:ring-1 hover:ring-grovva-green/15">
              <h3 className="font-heading font-semibold text-grovva-text text-lg md:text-xl tracking-[-0.01em]">
                Geração de leads qualificados
              </h3>
              <p className="mt-2 text-sm text-grovva-muted leading-relaxed">
                Construímos campanhas que filtram curiosos e entregam ao seu
                time apenas quem tem perfil e intenção real de compra.
              </p>
              <div className="mt-auto">
                <SalesFunnel />
              </div>
            </article>
          </Reveal>

          {/* Card 3 — O sistema trabalha (3 cols, narrow) */}
          <Reveal delay={0.1} className="md:col-span-3">
            <article className="group h-full rounded-2xl bg-white p-6 md:p-7 flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(15,27,20,0.12)] hover:ring-1 hover:ring-grovva-green/15">
              <h3 className="font-heading font-semibold text-grovva-text text-base md:text-lg tracking-[-0.01em]">
                O sistema trabalha enquanto seu time vende
              </h3>
              <p className="mt-2 text-[13px] text-grovva-muted leading-relaxed">
                Follow-ups, agendas, recuperação de leads e cobranças
                acontecem de forma automática.
              </p>
              <div className="mt-auto pt-5">
                <AutomationIcons />
              </div>
            </article>
          </Reveal>

          {/* Card 5 — Crescimento que não depende de sorte (5 cols) */}
          <Reveal delay={0.15} className="md:col-span-5">
            <article className="group h-full rounded-2xl bg-white p-6 md:p-7 flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(15,27,20,0.12)] hover:ring-1 hover:ring-grovva-green/15">
              <h3 className="font-heading font-semibold text-grovva-text text-lg md:text-xl tracking-[-0.01em]">
                Crescimento que não depende de sorte
              </h3>
              <p className="mt-2 text-sm text-grovva-muted leading-relaxed">
                Com marketing, vendas e dados integrados em um único sistema,
                cada decisão é tomada com base em resultado real. É assim que
                negócios escalam com consistência.
              </p>
              <div className="mt-auto pt-2">
                <GrowthChart />
              </div>
            </article>
          </Reveal>

          {/* Card 4 (agora à esquerda) — Controle da sua operação (7 cols, wide) */}
          <Reveal delay={0.2} className="md:col-span-7">
            <article className="group h-full rounded-2xl bg-white p-6 md:p-7 flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(15,27,20,0.12)] hover:ring-1 hover:ring-grovva-green/15">
              <h3 className="font-heading font-semibold text-grovva-text text-lg md:text-xl tracking-[-0.01em]">
                Controle da sua operação
              </h3>
              <p className="mt-2 text-sm md:text-[15px] text-grovva-muted leading-relaxed">
                Painel com os dados que importam: quantas oportunidades estão
                abertas, onde estão travando e quanto está sendo gerado em
                tempo real. Sem achismos, sem surpresa no fim do mês.
              </p>
              <div className="mt-auto">
                <DashboardVisual />
              </div>
            </article>
          </Reveal>

          {/* Card 2 (agora à direita) — Seu time para de perder venda (5 cols) */}
          <Reveal delay={0.25} className="md:col-span-5">
            <article className="group h-full rounded-2xl bg-white p-6 md:p-7 flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(15,27,20,0.12)] hover:ring-1 hover:ring-grovva-green/15">
              <h3 className="font-heading font-semibold text-grovva-text text-lg md:text-xl tracking-[-0.01em]">
                Seu time para de perder venda por falta de processo
              </h3>
              <p className="mt-2 text-sm text-grovva-muted leading-relaxed">
                Cada lead entra em um funil estruturado, é atendido na hora
                certa pela IA e acompanhado até o fechamento. Nenhuma
                oportunidade cai no esquecimento, nenhuma venda é perdida por
                demora ou falta de follow-up.
              </p>
              <div className="mt-auto">
                <LeadToSaleVisual />
              </div>
            </article>
          </Reveal>
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
