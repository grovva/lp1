import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

/* Mini-prévia estática do sistema (apenas dica visual, em tons neutros + verde
   pra casar com a marca; a prévia interativa de verdade vive em /sistema). */
type MockCard = { initials: string; tone: string; dot: string; value: string; won?: boolean };
type MockColumn = { name: string; count: number; cards: MockCard[] };

function KanbanMock() {
  const columns: MockColumn[] = [
    {
      name: "Novo lead",
      count: 5,
      cards: [
        { initials: "AV", tone: "#EAF3EC", dot: "#3EA85C", value: "R$ 2.400" },
        { initials: "RM", tone: "#FEF3E2", dot: "#F59E0B", value: "R$ 1.100" },
      ],
    },
    {
      name: "Em contato",
      count: 3,
      cards: [
        { initials: "CL", tone: "#E8F1F2", dot: "#14545B", value: "R$ 3.800" },
        { initials: "JP", tone: "#EAF3EC", dot: "#3EA85C", value: "R$ 980" },
      ],
    },
    {
      name: "Fechou",
      count: 6,
      cards: [
        { initials: "PK", tone: "#EAF3EC", dot: "#3EA85C", value: "R$ 5.200", won: true },
        { initials: "NC", tone: "#EAF3EC", dot: "#3EA85C", value: "R$ 2.900", won: true },
      ],
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_-28px_rgba(15,27,20,0.32)] ring-1 ring-grovva-line">
      {/* chrome do navegador */}
      <div className="flex items-center gap-2 border-b border-grovva-line bg-grovva-card-bg px-4 py-3">
        <span className="size-3 rounded-full bg-[#FF5F57]" />
        <span className="size-3 rounded-full bg-[#FEBC2E]" />
        <span className="size-3 rounded-full bg-[#28C840]" />
        <span className="ml-2 truncate text-[11px] text-grovva-subtle">app.grovva.com/pipeline</span>
      </div>

      {/* barra do pipeline */}
      <div className="flex items-center justify-between border-b border-grovva-line px-4 py-3">
        <div>
          <p className="text-[13px] font-bold text-grovva-ink">Pipeline de vendas</p>
          <p className="text-[11px] text-grovva-muted">14 negócios em aberto</p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="font-heading text-[15px] font-bold text-grovva-ink">R$ 48,2k</span>
        </div>
      </div>

      {/* board — rola na horizontal no mobile, grid de 3 no desktop */}
      <div className="flex gap-2.5 overflow-x-auto bg-grovva-bg/40 p-3.5 md:grid md:grid-cols-3 md:overflow-visible">
        {columns.map((col) => (
          <div key={col.name} className="min-w-[152px] shrink-0 rounded-xl bg-grovva-card-bg p-2.5 md:min-w-0 md:shrink">
            <div className="mb-2.5 flex items-center justify-between px-0.5">
              <span className="text-[11px] font-semibold text-grovva-text">{col.name}</span>
              <span className="rounded-full bg-white px-1.5 text-[10px] font-bold text-grovva-green-dark ring-1 ring-grovva-line">
                {col.count}
              </span>
            </div>
            <div className="space-y-2">
              {col.cards.map((c, i) => (
                <div key={i} className="rounded-lg bg-white p-2.5 shadow-sm ring-1 ring-grovva-line">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-grovva-ink"
                      style={{ background: c.tone }}
                    >
                      {c.initials}
                    </span>
                    <span className="h-2 w-full max-w-[60px] rounded-full bg-grovva-line" />
                  </div>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full" style={{ background: c.dot }} />
                      <span className="whitespace-nowrap text-[11px] font-bold text-grovva-text">{c.value}</span>
                    </span>
                    {c.won && (
                      <span className="rounded-full bg-grovva-green-soft px-1.5 py-0.5 text-[9px] font-semibold text-grovva-green-dark">
                        ganho
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SistemaTeaser() {
  return (
    <section className="relative overflow-hidden bg-grovva-bg py-12 md:py-24">
      <div className="container mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-14 lg:gap-20">
          {/* Copy */}
          <Reveal>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-grovva-green-dark">
                Prévia interativa
              </span>
              <h2 className="mt-4 font-heading text-[28px] font-bold leading-[1.08] tracking-[-0.025em] text-balance text-grovva-ink md:text-[40px]">
                Conheça por dentro o sistema que{" "}
                <span className="text-grovva-green-dark">você vai operar</span>
              </h2>
              <p className="mt-5 max-w-[460px] text-[15px] leading-relaxed text-grovva-muted md:text-[16px]">
                Arraste cards, crie agendamentos e explore as telas do CRM real:
                feito sob medida, modular e com automações de IA. Mexa à vontade.
              </p>
              <Link href="/sistema" className="btn-primary mt-7">
                Ver o sistema
                <svg className="arrow size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m13 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Reveal>

          {/* Visual — maior, sobre um brilho verde sutil */}
          <Reveal delay={0.1} className="min-w-0">
            <div className="relative min-w-0">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px]"
                style={{ background: "radial-gradient(60% 60% at 70% 30%, rgba(62,168,92,0.16), transparent 70%)" }}
              />
              <KanbanMock />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
