"use client";

import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { useIsMobile } from "@/components/motion/useIsMobile";

const dashedBg = {
  backgroundImage:
    "linear-gradient(to right, #3EA85C 50%, transparent 50%)",
  backgroundSize: "8px 1px",
  backgroundRepeat: "repeat-x",
  opacity: 0.4,
};

function PersonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21v-1a7 7 0 0 1 14 0v1" />
    </svg>
  );
}

function ChatIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function MoneyIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

export function LeadToSaleFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isMobile = useIsMobile();
  const speed = isMobile ? 0.5 : 1;

  const ENTRY = 2.3 * speed;
  const BALL_DURATION = 2.0 * speed;
  const CYCLE = 4.0 * speed;
  const PULSE_DUR = 0.6 * speed;
  const pulseRepeat = CYCLE - PULSE_DUR;

  const ballControls = useAnimation();

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;

    async function runLoop() {
      while (!cancelled) {
        await ballControls.start({
          left: ["0%", "0%", "50%", "50%", "50%", "50%", "100%", "100%"],
          opacity: [0, 1, 1, 0, 0, 1, 1, 0],
          transition: {
            duration: BALL_DURATION,
            times: [0, 0.06, 0.4, 0.45, 0.55, 0.6, 0.94, 1],
            ease: "linear",
          },
        });
        if (cancelled) break;
        await new Promise((r) =>
          setTimeout(r, (CYCLE - BALL_DURATION) * 1000)
        );
      }
    }

    const startTimer = setTimeout(() => {
      if (!cancelled) runLoop();
    }, ENTRY * 1000);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      ballControls.stop();
    };
  }, [inView, ballControls]);

  return (
    <div ref={ref} className="mt-5 rounded-2xl bg-grovva-card-bg p-5">
      <div className="flex items-start justify-between gap-2 relative">
        {/* Lead (Pessoa) */}
        <div className="flex shrink-0 flex-col items-center gap-2">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              duration: 0.4 * speed,
              delay: 0.1 * speed,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <motion.div
              className="flex size-16 items-center justify-center rounded-full bg-grovva-green/15 text-grovva-green"
              animate={inView ? { scale: [1, 1.2, 1] } : {}}
              transition={{
                duration: PULSE_DUR,
                delay: ENTRY,
                repeat: Infinity,
                repeatDelay: pulseRepeat,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <PersonIcon className="size-7" />
            </motion.div>
          </motion.div>
          <motion.span
            className="text-[10px] font-semibold uppercase tracking-wider text-grovva-muted"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3 * speed, delay: 0.35 * speed }}
          >
            Lead
          </motion.span>
        </div>

        {/* Conector + chat */}
        <div className="flex flex-1 items-start relative">
          <motion.div
            className="h-px flex-1 mt-8 origin-left"
            style={dashedBg}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5 * speed, delay: 0.5 * speed, ease: "easeOut" }}
          />
          <div className="mx-2 flex shrink-0 flex-col items-center gap-2 relative z-10">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                duration: 0.4 * speed,
                delay: 1.0 * speed,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <motion.div
                className="flex size-[72px] items-center justify-center rounded-full bg-white border border-grovva-line shadow-sm text-grovva-green"
                animate={inView ? { scale: [1, 1.2, 1] } : {}}
                transition={{
                  duration: PULSE_DUR,
                  delay: ENTRY + 0.8,
                  repeat: Infinity,
                  repeatDelay: pulseRepeat,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                <ChatIcon className="size-8" />
              </motion.div>
            </motion.div>
            <motion.span
              className="text-[10px] font-semibold uppercase tracking-wider text-grovva-muted whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3 * speed, delay: 1.25 * speed }}
            >
              Atendimento ágil
            </motion.span>
          </div>
          <motion.div
            className="h-px flex-1 mt-8 origin-left"
            style={dashedBg}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5 * speed, delay: 1.4 * speed, ease: "easeOut" }}
          />

          {/* Bolinha */}
          <motion.div
            aria-hidden
            className="absolute top-[26px] size-3 rounded-full bg-grovva-green pointer-events-none z-0"
            style={{ boxShadow: "0 0 10px rgba(62,168,92,0.6)" }}
            initial={{ left: "0%", opacity: 0 }}
            animate={ballControls}
          />
        </div>

        {/* Venda (Dinheiro) */}
        <div className="flex shrink-0 flex-col items-center gap-2">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              duration: 0.4 * speed,
              delay: 1.9 * speed,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <motion.div
              className="flex size-16 items-center justify-center rounded-full bg-grovva-green text-white shadow-md"
              animate={inView ? { scale: [1, 1.2, 1] } : {}}
              transition={{
                duration: PULSE_DUR,
                delay: ENTRY + 1.9,
                repeat: Infinity,
                repeatDelay: pulseRepeat,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <MoneyIcon className="size-7" />
            </motion.div>
          </motion.div>
          <motion.span
            className="text-[10px] font-semibold uppercase tracking-wider text-grovva-muted"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3 * speed, delay: 2.15 * speed }}
          >
            Venda
          </motion.span>
        </div>
      </div>
    </div>
  );
}
