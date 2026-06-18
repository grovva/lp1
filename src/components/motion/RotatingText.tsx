"use client";

import { useEffect, useState } from "react";

type RotatingTextProps = {
  words: string[];
  intervalMs?: number;
  className?: string;
};

// Troca suave entre frases: a atual faz fade-out subindo de leve, a frase é
// trocada enquanto está invisível, e a próxima faz fade-in. Sem pulo brusco.
export function RotatingText({ words, intervalMs = 2800, className }: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (words.length <= 1) return;
    let swap: ReturnType<typeof setTimeout>;
    const cycle = setInterval(() => {
      setShown(false);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setShown(true);
      }, 380);
    }, intervalMs);
    return () => {
      clearInterval(cycle);
      clearTimeout(swap);
    };
  }, [words.length, intervalMs]);

  return (
    <span className="relative inline-flex align-bottom" style={{ height: "1.45em" }}>
      <span
        className={`inline-block whitespace-nowrap transition-all duration-[380ms] ease-out ${className ?? ""}`}
        style={{ opacity: shown ? 1 : 0, transform: shown ? "translateY(0)" : "translateY(5px)" }}
      >
        {words[index]}
      </span>
    </span>
  );
}
