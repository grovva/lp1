import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

/* Primitivos de seção compartilhados pelas páginas de aprofundamento
   (/sistema, /growth): ícone, linha de feature detalhada e cabeçalho. */

/* Breadcrumb de página interna — sinaliza que é subpágina, não outra landing. */
export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav className="mb-10 flex items-center justify-start gap-2 text-[12px]">
      <Link href="/" className="text-white/45 transition-colors hover:text-white/80">
        Início
      </Link>
      <span className="text-white/25">&gt;</span>
      <span className="text-white/75">{current}</span>
    </nav>
  );
}

export function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      {children}
    </svg>
  );
}

export type Feature = { title: string; body: string; icon: ReactNode };

/* Linha de feature detalhada: ícone + título + explicação real (não one-liner). */
export function FeatureRow({ f, dark, delay }: { f: Feature; dark?: boolean; delay: number }) {
  return (
    <Reveal delay={delay} y={12}>
      <div
        className="flex h-full gap-4 rounded-2xl p-5 md:p-6"
        style={
          dark
            ? { background: "linear-gradient(165deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.08)" }
            : { background: "#fff", border: "1px solid var(--color-grovva-line)" }
        }
      >
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
            dark ? "bg-grovva-green/20 text-grovva-green" : "bg-grovva-green/12 text-grovva-green-dark"
          }`}
        >
          {f.icon}
        </div>
        <div>
          <h3 className={`font-heading text-[16px] font-semibold tracking-[-0.01em] md:text-[17px] ${dark ? "text-white" : "text-grovva-text"}`}>
            {f.title}
          </h3>
          <p className={`mt-1.5 text-[13.5px] leading-relaxed md:text-[14.5px] ${dark ? "text-white/60" : "text-grovva-muted"}`}>
            {f.body}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function SectionHead({
  eyebrow,
  children,
  lead,
  dark,
}: {
  eyebrow: string;
  children: ReactNode;
  lead: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto mb-10 max-w-[760px] text-center md:mb-14">
      <Reveal>
        <p
          className={`mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] ${dark ? "text-grovva-green" : ""}`}
          style={dark ? undefined : { color: "var(--color-grovva-green-dark)" }}
        >
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`font-heading text-[28px] font-bold leading-[1.08] tracking-[-0.025em] text-balance md:text-[44px] ${
            dark ? "text-white" : "text-grovva-ink"
          }`}
        >
          {children}
        </h2>
      </Reveal>
      <Reveal delay={0.14}>
        <p className={`mx-auto mt-5 max-w-[640px] text-base leading-relaxed md:text-[17px] ${dark ? "text-white/60" : "text-grovva-muted"}`}>
          {lead}
        </p>
      </Reveal>
    </div>
  );
}
