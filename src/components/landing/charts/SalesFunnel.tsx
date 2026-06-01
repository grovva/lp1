"use client";

import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/components/motion/useIsMobile";

type Stage = {
  label: string;
  count: number;
  opacity: number;
  dark: boolean;
};

const stages: Stage[] = [
  { label: "Visitantes", count: 9490, opacity: 0.22, dark: false },
  { label: "Leads", count: 2847, opacity: 0.48, dark: false },
  { label: "Qualificados", count: 1139, opacity: 0.78, dark: true },
  { label: "Clientes", count: 311, opacity: 1, dark: true },
];

const sectionH = 52;
const gap = 5;
const taper = 22;
const centerX = 160;

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

function FunnelStage({
  stage,
  index,
  inView,
  speed,
}: {
  stage: Stage;
  index: number;
  inView: boolean;
  speed: number;
}) {
  const top = index * (sectionH + gap);
  const bottom = top + sectionH;
  const startX = 20 + index * taper;
  const endX = 320 - 20 - index * taper;
  const nextStartX = startX + taper;
  const nextEndX = endX - taper;
  const d = `M ${startX} ${top} L ${endX} ${top} L ${nextEndX} ${bottom} L ${nextStartX} ${bottom} Z`;
  const count = useCounter(
    stage.count,
    1.6 * speed,
    (0.2 + index * 0.4) * speed,
    inView
  );

  return (
    <g>
      <motion.path
        d={d}
        fill="url(#grovva-funnel)"
        initial={{ opacity: 0.08 }}
        animate={
          inView ? { opacity: [0.08, stage.opacity + 0.15, stage.opacity] } : {}
        }
        transition={{
          duration: 1.6 * speed,
          delay: (0.2 + index * 0.4) * speed,
          times: [0, 0.7, 1],
          ease: "easeOut",
        }}
      />
      <text
        x={centerX}
        y={top + 22}
        fill={stage.dark ? "#FFFFFF" : "#141A16"}
        fontSize="11"
        fontWeight="600"
        textAnchor="middle"
        fontFamily="inherit"
        letterSpacing="0.02em"
      >
        {stage.label}
      </text>
      <text
        x={centerX}
        y={top + 40}
        fill={stage.dark ? "#FFFFFF" : "#141A16"}
        fontSize="15"
        fontWeight="700"
        textAnchor="middle"
        fontFamily="inherit"
      >
        {count.toLocaleString("pt-BR")}
      </text>
    </g>
  );
}

export function SalesFunnel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isMobile = useIsMobile();
  const speed = isMobile ? 0.5 : 1;

  return (
    <div ref={ref} className="relative mt-5">
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
        {stages.map((s, i) => (
          <FunnelStage
            key={s.label}
            stage={s}
            index={i}
            inView={inView}
            speed={speed}
          />
        ))}
      </svg>
      <div className="absolute top-1 right-0 rounded-md bg-grovva-green px-2 py-1 text-[10px] font-semibold text-white shadow-md">
        10,92% conversão
      </div>
    </div>
  );
}
