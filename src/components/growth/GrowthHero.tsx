import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumb } from "@/components/sections/SectionParts";

const stats = [
  { value: "+R$ 4M", label: "em anúncios gerenciados" },
  { value: "6 países", label: "com clientes ativos" },
  { value: "+R$ 40M", label: "em receita gerada" },
];

export function GrowthHero() {
  return (
    <section
      className="relative overflow-hidden border-t-2 border-grovva-green/40 text-white"
      style={{
        background:
          "radial-gradient(800px 340px at 50% -8%, rgba(62,168,92,0.10), transparent 70%), linear-gradient(180deg, #0d120f 0%, #0a0f0c 100%)",
      }}
    >
      <div className="container relative mx-auto max-w-[1100px] px-6">
        <div className="mx-auto max-w-[860px] pt-24 text-center md:pt-28">
          <Reveal>
            <Breadcrumb current="Growth" />
            <span className="inline-flex items-center gap-2 rounded-full border border-grovva-green/50 bg-grovva-green/[0.12] px-3.5 py-1.5 text-[12px] font-medium text-grovva-green">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-grovva-green opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-grovva-green" />
              </span>
              Growth Marketing
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mx-auto mt-6 max-w-[820px] font-heading text-[30px] font-bold leading-[1.08] tracking-[-0.025em] text-balance md:text-[52px]">
              Demanda previsível: clientes decididos a comprar{" "}
              <span className="text-grovva-green">chegando todo dia</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-6 max-w-[660px] text-[15px] leading-relaxed text-white/60 md:text-[18px]">
              A gente atrai quem tem perfil e intenção real de compra, filtra os
              curiosos e entrega ao seu time só quem está pronto pra conversar. Sem
              depender de indicação, sem altos e baixos.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex justify-center">
              <button
                type="button"
                data-contact-cta="true"
                className="btn-primary"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(62,168,92,0.25), 0 18px 40px -10px rgba(62,168,92,0.55)",
                }}
              >
                Quero gerar demanda
                <svg className="arrow size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m13 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Faixa de números */}
        <Reveal delay={0.26}>
          <div className="mx-auto mt-14 grid max-w-[760px] grid-cols-3 gap-3 pb-16 md:mt-16 md:gap-4 md:pb-24">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl px-3 py-5 text-center md:px-5 md:py-6"
                style={{ background: "linear-gradient(165deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="font-heading text-[22px] font-bold tracking-[-0.02em] text-grovva-green md:text-[34px]">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-white/55 md:text-[13px]">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
