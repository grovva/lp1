"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/components/motion/useIsMobile";

// Linha completa — desenha até o canto superior direito
const PATH =
  "M0 130 C 60 125, 100 132, 140 118 C 180 104, 200 122, 230 95 C 260 68, 290 78, 320 40 C 340 18, 350 22, 360 14";

// Sub-path até (320, 40) — onde a bolinha deve parar (antes da chegada da linha)
const MARKER_PATH =
  "M0 130 C 60 125, 100 132, 140 118 C 180 104, 200 122, 230 95 C 260 68, 290 78, 320 40";

const LINE_DURATION = 1.5;
const BALL_DURATION = 1.5;
const BALL_FADE_IN = 0.3;
const FINAL_PERCENT = 132;

export function GrowthChart() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isMobile = useIsMobile();
  const speed = isMobile ? 0.5 : 1;
  const lineDuration = LINE_DURATION * speed;
  const ballDuration = BALL_DURATION * speed;
  const ballFadeIn = BALL_FADE_IN * speed;
  const [percent, setPercent] = useState(0);
  const [pathLen, setPathLen] = useState(0);
  const [markerLen, setMarkerLen] = useState(0);
  const [ballVisible, setBallVisible] = useState(false);

  const lineProgress = useMotionValue(0);
  const ballProgress = useMotionValue(0);

  // Mede o comprimento total do path E o ponto onde a bolinha deve parar
  useEffect(() => {
    if (pathRef.current) {
      setPathLen(pathRef.current.getTotalLength());
    }
    // Cria um path temporário só pra calcular o length até (320, 40)
    const temp = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    temp.setAttribute("d", MARKER_PATH);
    setMarkerLen(temp.getTotalLength());
  }, []);

  // Sequência: linha desenha → pequena pausa → bolinha aparece e viaja
  useEffect(() => {
    if (!inView || pathLen === 0 || markerLen === 0) return;
    let cancelled = false;
    const running: { stop: () => void }[] = [];

    let fadeInTimer: ReturnType<typeof setTimeout> | undefined;

    async function run() {
      // Fase 1: linha desenhando
      const ctrlLine = animate(lineProgress, 1, {
        duration: lineDuration,
        ease: [0.22, 1, 0.36, 1],
      });
      running.push(ctrlLine);

      // Agenda fade in da bolinha pra começar antes da linha terminar
      fadeInTimer = setTimeout(
        () => {
          if (!cancelled) setBallVisible(true);
        },
        (lineDuration - ballFadeIn) * 1000
      );

      await ctrlLine;
      if (cancelled) return;

      // Linha terminou e bolinha já está visível — viaja imediatamente
      const ctrlBall = animate(ballProgress, 1, {
        duration: ballDuration,
        ease: "linear",
      });
      const ctrlCount = animate(0, FINAL_PERCENT, {
        duration: ballDuration,
        ease: "linear",
        onUpdate: (v) => setPercent(Math.round(v)),
      });
      running.push(ctrlBall, ctrlCount);
      await Promise.all([ctrlBall, ctrlCount]);
      if (!cancelled) ballProgress.set(1);
    }

    run();

    return () => {
      cancelled = true;
      if (fadeInTimer) clearTimeout(fadeInTimer);
      running.forEach((c) => c.stop());
    };
  }, [inView, pathLen, markerLen, lineProgress, ballProgress]);

  // Marker segue o path mas só vai até markerLen (que termina em ~(320, 40))
  const markerCx = useTransform(ballProgress, (p) => {
    if (!pathRef.current || markerLen === 0) return 0;
    return pathRef.current.getPointAtLength(p * markerLen).x;
  });
  const markerCy = useTransform(ballProgress, (p) => {
    if (!pathRef.current || markerLen === 0) return 0;
    return pathRef.current.getPointAtLength(p * markerLen).y;
  });

  return (
    <div ref={ref} className="mt-4 relative">
      <svg
        viewBox="0 0 360 160"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3EA85C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3EA85C" stopOpacity="0" />
          </linearGradient>
          <clipPath id="growth-reveal">
            <motion.rect
              x="0"
              y="0"
              height="160"
              initial={{ width: 0 }}
              animate={inView ? { width: 360 } : { width: 0 }}
              transition={{ duration: lineDuration, ease: [0.22, 1, 0.36, 1] }}
            />
          </clipPath>
        </defs>

        <path
          d={`${PATH} L 360 160 L 0 160 Z`}
          fill="url(#growth-fill)"
          clipPath="url(#growth-reveal)"
        />

        <motion.path
          ref={pathRef}
          d={PATH}
          stroke="#3EA85C"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          style={{ pathLength: lineProgress }}
        />

        <motion.circle
          cx={markerCx}
          cy={markerCy}
          r="7"
          fill="#FFFFFF"
          stroke="#3EA85C"
          strokeWidth="3"
          initial={{ opacity: 0 }}
          animate={ballVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.circle
          cx={markerCx}
          cy={markerCy}
          r="3"
          fill="#3EA85C"
          initial={{ opacity: 0 }}
          animate={ballVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </svg>

      {/* Badge volta pro top-right */}
      <div className="absolute top-1 right-1 rounded-md bg-grovva-green px-2 py-1 text-[10px] font-semibold text-white shadow-md tabular-nums">
        +{percent}% receita
      </div>
    </div>
  );
}
