"use client";

import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/components/motion/useIsMobile";

const STAGES = [
  { label: "Visitantes", count: 9490 },
  { label: "Leads", count: 2847 },
  { label: "Qualificados", count: 1139 },
  { label: "Clientes", count: 311 },
];

// Cubic Bezier smooth, tendência de alta
const SPARK_UP =
  "M 0 17 C 10 17, 14 12, 22 12 C 30 12, 34 8, 42 8 C 50 8, 52 4, 56 3";
// Cubic Bezier smooth, outro padrão de alta (pra Receita)
const SPARK_UP_ALT =
  "M 0 16 C 10 15, 14 14, 22 10 C 30 6, 36 11, 44 7 C 50 4, 52 5, 56 2";

function useCounter(
  target: number,
  duration: number,
  delay: number,
  inView: boolean
) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) {
      setValue(0);
      return;
    }
    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, duration, delay]);
  return value;
}

export function DashboardOperation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isMobile = useIsMobile();
  const speed = isMobile ? 0.5 : 1;
  const oportunidades = useCounter(1139, 1.4 * speed, 0.2 * speed, inView);
  const receita = useCounter(84, 1.4 * speed, 0.35 * speed, inView);
  const max = STAGES[0].count;

  return (
    <div ref={ref} className="mt-5 grid grid-cols-2 gap-2.5">
      {/* Oportunidades */}
      <div className="rounded-xl border border-grovva-line bg-white p-3">
        <p className="text-[10px] uppercase tracking-wider text-grovva-muted">
          Oportunidades
        </p>
        <div className="mt-1 flex items-end justify-between gap-2">
          <p className="text-xl font-bold text-grovva-text tabular-nums whitespace-nowrap">
            {oportunidades.toLocaleString("pt-BR")}
          </p>
          <svg viewBox="0 0 56 20" className="hidden sm:block h-5 w-14 shrink-0">
            <motion.path
              d={SPARK_UP}
              stroke="#3EA85C"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{
                duration: 1.3 * speed,
                delay: 0.3 * speed,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </svg>
        </div>
        <p className="text-[10px] text-grovva-green font-semibold">
          qualificados
        </p>
      </div>

      {/* Receita gerada */}
      <div className="rounded-xl border border-grovva-line bg-white p-3">
        <p className="text-[10px] uppercase tracking-wider text-grovva-muted">
          Receita gerada
        </p>
        <div className="mt-1 flex items-end justify-between gap-2">
          <p className="text-xl font-bold text-grovva-text tabular-nums whitespace-nowrap">
            R$ {receita}k
          </p>
          <svg viewBox="0 0 56 20" className="hidden sm:block h-5 w-14 shrink-0">
            <motion.path
              d={SPARK_UP_ALT}
              stroke="#3EA85C"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{
                duration: 1.3 * speed,
                delay: 0.5 * speed,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </svg>
        </div>
        <p className="text-[10px] text-grovva-green font-semibold">+23% mês</p>
      </div>

      {/* Conversão por etapa */}
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
          {STAGES.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="w-[68px] shrink-0 text-[10px] text-grovva-text">
                {s.label}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-grovva-line/50">
                <motion.div
                  className="h-full rounded-full bg-grovva-green"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${(s.count / max) * 100}%` } : {}}
                  transition={{
                    duration: 1.0 * speed,
                    delay: (0.7 + i * 0.12) * speed,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-[10px] font-semibold tabular-nums text-grovva-text">
                {s.count.toLocaleString("pt-BR")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
