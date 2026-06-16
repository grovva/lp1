"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavLink = { label: string; href: string };

const NAV: NavLink[] = [
  { label: "O Sistema", href: "/sistema" },
  { label: "Growth", href: "/growth" },
  { label: "Cases", href: "/#cases" },
];

// Logo animada: wordmark "grovva" sem o ponto + um ponto verde em CSS.
// Conforme o scroll avança, o clip encolhe da direita pra esquerda — o "rovva"
// é "comido" e sobra o "g", com o ponto verde sempre seguindo a borda.
const LOGO_H = 26;
const ASPECT = 758 / 184; // dimensões do logo-grovva-nodot-white.png
const FULL_W = LOGO_H * ASPECT;
const G_W = FULL_W * 0.17; // largura aproximada só do "g"
const DOT = 7;
// Descender do "g" = 31% da altura. A linha de base (onde o ponto deve sentar)
// fica esse tanto acima do fundo da caixa do wordmark.
const DESCENDER = Math.round(LOGO_H * (57 / 184));
const COLLAPSE_PX = 220; // distância de scroll pra colapsar totalmente

// Curva de easing (smoothstep): devagar no início e no fim, rápido no meio.
const easeInOut = (t: number) => t * t * (3 - 2 * t);

function AnimatedLogo({ p }: { p: number }) {
  const clipW = G_W + (FULL_W - G_W) * (1 - p);
  return (
    <span className="flex items-end" aria-label="grovva" style={{ height: LOGO_H }}>
      <span className="overflow-hidden" style={{ width: clipW, height: LOGO_H }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-grovva-nodot-white.png"
          alt="grovva"
          style={{ width: FULL_W, height: LOGO_H, maxWidth: "none" }}
        />
      </span>
      <span
        className="shrink-0 rounded-full"
        style={{ width: DOT, height: DOT, marginLeft: 4, marginBottom: DESCENDER, background: "#3EA85C" }}
      />
    </span>
  );
}

export function Header() {
  const [p, setP] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    // Suaviza o progresso com easing por frame (lerp), pra logo + largura
    // deslizarem juntas de forma fluida em vez de pular a cada evento de scroll.
    let cur = 0;
    let target = 0;
    let raf: number | null = null;

    const animate = () => {
      cur += (target - cur) * 0.18;
      if (Math.abs(target - cur) < 0.0015) {
        cur = target;
        setP(cur);
        raf = null;
        return;
      }
      setP(cur);
      raf = requestAnimationFrame(animate);
    };

    const onScroll = () => {
      target = Math.min(1, window.scrollY / COLLAPSE_PX);
      if (raf === null) raf = requestAnimationFrame(animate);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const pe = easeInOut(p);
  const logoP = isMobile ? 0 : pe; // no mobile a logo não colapsa

  const pillStyle = {
    background: "rgba(8,13,10,0.55)",
    border: "1px solid rgba(255,255,255,0.10)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    boxShadow: "0 12px 32px -12px rgba(0,0,0,0.5)",
  } as const;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex flex-col items-center px-4 md:top-4">
      {/* Pill flutuante — largura comprime conforme o scroll (mesmo progresso da logo) */}
      <div
        className="pointer-events-auto relative flex items-center justify-between rounded-full py-2.5 pl-6 pr-5 md:py-3.5 md:pl-8 md:pr-6"
        style={{ ...pillStyle, width: `min(94vw, ${Math.round(680 - 230 * pe)}px)` }}
      >
        <Link href="/" aria-label="Página inicial da grovva" className="flex items-center">
          <AnimatedLogo p={logoP} />
        </Link>

        {/* Nav desktop, levemente à direita do centro */}
        <nav className="absolute left-[54%] hidden -translate-x-1/2 items-center gap-9 whitespace-nowrap md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13.5px] font-medium text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Toggle mobile */}
        <button
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="flex size-8 items-center justify-center text-white md:hidden"
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" strokeLinecap="round">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Menu mobile (painel flutuante) */}
      {menuOpen && (
        <div
          className="pointer-events-auto mt-2 w-[min(92vw,360px)] rounded-2xl p-2 md:hidden"
          style={pillStyle}
        >
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-[15px] font-medium text-white/85 transition-colors hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
