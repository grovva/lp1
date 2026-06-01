"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useIsMobile } from "@/components/motion/useIsMobile";

const items: { label: string; icon: ReactNode }[] = [
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

const angles = [-90, -18, 54, 126, 198];
const radius = 35;
const OUTER_RING_R = 35;
const INNER_RING_R = 22;
const positions = angles.map((a) => ({
  x: 50 + radius * Math.cos((a * Math.PI) / 180),
  y: 50 + radius * Math.sin((a * Math.PI) / 180),
}));

const BOOT = 2.0;

export function AutomationCycle() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isMobile = useIsMobile();
  const speed = isMobile ? 0.5 : 1;
  const boot = BOOT * speed;
  const rotation = useMotionValue(0);
  const counterRotation = useTransform(rotation, (v) => -v);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(rotation, 360, {
      duration: 24,
      ease: "linear",
      repeat: Infinity,
      delay: boot,
    });
    return () => controls.stop();
  }, [inView, rotation]);

  return (
    <div ref={ref} className="relative aspect-square w-full">
      {/* Rings (estáticos, simétricos) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.circle
          cx="50"
          cy="50"
          r={OUTER_RING_R}
          fill="none"
          stroke="#3EA85C"
          strokeWidth="0.35"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8 * speed, delay: 0.2 * speed }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r={INNER_RING_R}
          fill="none"
          stroke="#3EA85C"
          strokeWidth="0.35"
          opacity="0.25"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8 * speed, delay: 0.4 * speed }}
        />
      </svg>

      {/* Camada que orbita — pulsos + ícones juntos */}
      <motion.div
        className="absolute inset-0"
        style={{ rotate: rotation }}
      >
        {/* Pulsos dentro do rotating layer */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {positions.map((p, i) => (
            <motion.circle
              key={i}
              r="3"
              fill="#3EA85C"
              initial={{ cx: 50, cy: 50, opacity: 0 }}
              animate={
                inView
                  ? {
                      cx: [50, p.x],
                      cy: [50, p.y],
                      opacity: [0, 1, 0],
                    }
                  : {}
              }
              transition={{
                duration: 1.4 * speed,
                delay: boot + i * 0.4 * speed,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}
        </svg>

        {/* Ícones com contra-rotação derivada */}
        {items.map((it, i) => (
          <div
            key={it.label}
            className="absolute"
            style={{
              top: `${positions[i].y}%`,
              left: `${positions[i].x}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.div style={{ rotate: counterRotation }}>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  scale: {
                    duration: 0.4 * speed,
                    delay: (1.2 + i * 0.12) * speed,
                    ease: [0.34, 1.56, 0.64, 1],
                  },
                  opacity: {
                    duration: 0.4 * speed,
                    delay: (1.2 + i * 0.12) * speed,
                  },
                }}
              >
                <div className="flex size-11 md:size-12 items-center justify-center rounded-full bg-white border border-grovva-line shadow-sm">
                  <svg
                    className="size-5 text-grovva-green"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {it.icon}
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* Robô central — pop in na entrada */}
      <motion.div
        className="absolute top-1/2 left-1/2 flex size-12 md:size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-grovva-green shadow-md"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5 * speed, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <svg
          className="size-6 md:size-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v3" />
          <circle cx="12" cy="2" r="1" fill="currentColor" stroke="none" />
          <rect x="3.5" y="6" width="17" height="13" rx="4" />
          <path d="M2.5 11v3M21.5 11v3" />
          <circle cx="9" cy="11.5" r="1.8" fill="currentColor" stroke="none" />
          <circle cx="15" cy="11.5" r="1.8" fill="currentColor" stroke="none" />
          <path d="M9 15.5c1 1 5 1 6 0" />
        </svg>
      </motion.div>
    </div>
  );
}
