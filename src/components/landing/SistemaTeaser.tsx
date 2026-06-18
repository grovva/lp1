import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

/* Mini-prévia estática do sistema (apenas dica visual, em tons neutros + verde
   pra casar com a marca; a prévia interativa de verdade vive em /sistema). */
type MockCard = { dot: string; value: string; won?: boolean };
type MockColumn = { name: string; count: number; cards: MockCard[] };

function KanbanMock() {
  const columns: MockColumn[] = [
    {
      name: "Novo lead",
      count: 4,
      cards: [
        { dot: "#3EA85C", value: "R$ 2.4k" },
        { dot: "#F59E0B", value: "R$ 1.1k" },
      ],
    },
    {
      name: "Em contato",
      count: 3,
      cards: [{ dot: "#3EA85C", value: "R$ 3.8k" }],
    },
    {
      name: "Fechou",
      count: 6,
      cards: [
        { dot: "#3EA85C", value: "R$ 5.2k", won: true },
        { dot: "#3EA85C", value: "R$ 2.9k", won: true },
      ],
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-24px_rgba(15,27,20,0.25)] ring-1 ring-grovva-line">
      {/* chrome */}
      <div className="flex items-center gap-1.5 border-b border-grovva-line bg-grovva-card-bg px-3.5 py-2.5">
        <span className="size-2.5 rounded-full bg-[#FF5F57]" />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="size-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 truncate text-[10px] text-grovva-subtle">app.grovva.com/pipeline</span>
      </div>

      {/* board */}
      <div className="grid grid-cols-3 gap-2 p-3">
        {columns.map((col) => (
          <div key={col.name} className="rounded-lg bg-grovva-card-bg p-2">
            <div className="mb-2 flex items-center justify-between px-0.5">
              <span className="text-[9px] font-semibold text-grovva-text">{col.name}</span>
              <span className="rounded-full bg-white px-1.5 text-[9px] font-bold text-grovva-green-dark ring-1 ring-grovva-line">
                {col.count}
              </span>
            </div>
            <div className="space-y-1.5">
              {col.cards.map((c, i) => (
                <div key={i} className="rounded-md bg-white p-2 ring-1 ring-grovva-line">
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full" style={{ background: c.dot }} />
                    <span className="h-1.5 w-10 rounded-full bg-grovva-line" />
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="text-[9px] font-bold text-grovva-text">{c.value}</span>
                    {c.won && (
                      <span className="rounded-full bg-grovva-green-soft px-1 text-[8px] font-semibold text-grovva-green-dark">
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
    <section className="relative bg-grovva-bg py-12 md:py-24">
      <div className="container mx-auto max-w-[1200px] px-6">
        <Reveal>
          <div className="grid items-center gap-8 rounded-3xl border border-grovva-line bg-white p-6 md:grid-cols-2 md:gap-12 md:p-10 lg:p-12">
            {/* Copy */}
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-grovva-green-dark">
                Prévia interativa
              </span>
              <h2 className="mt-4 font-heading text-[26px] font-bold leading-[1.1] tracking-[-0.02em] text-balance text-grovva-ink md:text-[38px]">
                Conheça por dentro o sistema que{" "}
                <span className="text-grovva-green-dark">você vai operar</span>
              </h2>
              <p className="mt-4 max-w-[480px] text-[15px] leading-relaxed text-grovva-muted md:text-[16px]">
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

            {/* Visual */}
            <Reveal delay={0.1}>
              <KanbanMock />
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
