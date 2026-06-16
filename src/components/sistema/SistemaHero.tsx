"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumb } from "@/components/sections/SectionParts";
import { PreviewWindow } from "@/components/landing/preview/PreviewWindow";

export function SistemaHero() {
  return (
    <section
      className="relative overflow-hidden border-t-2 border-grovva-green/40 text-white"
      style={{
        background:
          "radial-gradient(800px 340px at 50% -8%, rgba(62,168,92,0.10), transparent 70%), linear-gradient(180deg, #0d120f 0%, #0a0f0c 100%)",
      }}
    >
      <div className="container relative mx-auto max-w-[1180px] px-4 md:px-6">
        {/* Eyebrow + heading, pt extra por causa do header fixo */}
        <Reveal>
          <div className="mx-auto max-w-[820px] pt-24 text-center md:pt-28">
            <Breadcrumb current="O Sistema" />
            <span className="inline-flex items-center gap-2 rounded-full border border-grovva-green/50 bg-grovva-green/[0.12] px-3.5 py-1.5 text-[12px] font-medium text-grovva-green">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-grovva-green opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-grovva-green" />
              </span>
              O Sistema Grovva Sales
            </span>
            <h1 className="mx-auto mt-6 max-w-[860px] font-heading text-[30px] font-bold leading-[1.08] tracking-[-0.025em] text-balance md:text-[52px]">
              Um sistema de vendas feito{" "}
              <span className="text-grovva-green">sob medida</span> pra sua operação
            </h1>
            <p className="mx-auto mt-6 max-w-[640px] text-[15px] leading-relaxed text-white/60 md:text-[18px]">
              Não é mais um CRM genérico de prateleira. É um sistema montado em cima
              da forma como o seu negócio vende, e que cresce junto com ele.
            </p>
          </div>
        </Reveal>

        {/* Preview window — interativo só no desktop */}
        <Reveal delay={0.15}>
          <div className="relative mt-12 hidden md:mt-14 lg:block">
            <PreviewWindow />
          </div>

          {/* Mobile/tablet: prévia disponível só no computador */}
          <div className="mx-auto mb-16 mt-10 flex max-w-[520px] flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-10 text-center lg:hidden">
            <span className="flex size-12 items-center justify-center rounded-full bg-grovva-green/15 text-grovva-green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-6">
                <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </span>
            <h3 className="mt-4 font-heading text-[18px] font-semibold text-white">A prévia interativa abre no computador</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-white/55">
              O sistema tem muitas telas e funções, então a demonstração foi feita pra telas
              maiores. Abra esta página no desktop para explorar o CRM por dentro.
            </p>
          </div>
        </Reveal>

        {/* Callout: deixa explícito que é uma prévia (só no desktop, onde o preview aparece) */}
        <div className="mx-auto mt-8 hidden max-w-[760px] items-start gap-3 rounded-2xl border border-grovva-green/25 bg-grovva-green/[0.07] px-5 py-4 text-left lg:flex">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-grovva-green/15 text-grovva-green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </span>
          <p className="text-[13px] leading-relaxed text-white/70 md:text-[14px]">
            <strong className="font-semibold text-white">Isto é uma prévia.</strong> Você está vendo o
            layout e algumas funcionalidades básicas e resumidas do sistema. Na prática ele faz
            muito mais, e cada recurso é criado e ajustado conforme a necessidade do seu negócio.
          </p>
        </div>

        <p className="hidden pb-16 pt-5 text-center text-[12px] text-white/40 md:pb-24 lg:block">
          Prévia interativa: arraste cards, crie agendamentos, explore as telas. Roda só no seu
          navegador e reseta ao atualizar.
        </p>
      </div>
    </section>
  );
}
