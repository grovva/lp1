import { Reveal } from "@/components/motion/Reveal";
import { GrowUnderline } from "@/components/motion/GrowUnderline";
import { Breadcrumb } from "@/components/sections/SectionParts";

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
        <div className="mx-auto max-w-[860px] pb-16 pt-24 text-center md:pb-24 md:pt-28">
          <Reveal>
            <Breadcrumb current="Growth" />
            <GrowUnderline className="text-[12px] font-semibold uppercase tracking-[0.18em] text-grovva-green md:text-[13px]">
              Growth Marketing
            </GrowUnderline>
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
      </div>
    </section>
  );
}
