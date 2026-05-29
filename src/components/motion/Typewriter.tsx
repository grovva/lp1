"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  className?: string;
};

export function Typewriter({
  words,
  typingSpeed = 55,
  deletingSpeed = 30,
  pauseMs = 1600,
  className,
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    if (words.length === 0) return;
    const current = words[index % words.length];

    if (phase === "typing") {
      if (text.length < current.length) {
        const t = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typingSpeed
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("deleting"), pauseMs);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (text.length > 0) {
        const t = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deletingSpeed
        );
        return () => clearTimeout(t);
      }
      setIndex((i) => (i + 1) % words.length);
      setPhase("typing");
    }
  }, [text, phase, index, words, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className={`whitespace-pre ${className ?? ""}`}>
      {text}
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block w-[2px] h-[0.9em] align-[-0.05em] bg-current animate-pulse"
      />
    </span>
  );
}
