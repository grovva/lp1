"use client";

import { useEffect, useRef, useState } from "react";

type Slide = {
  type: "video" | "image";
  src: string;
  // Enquadramento do object-cover (CSS object-position). Default: centro.
  position?: string;
};

// Carrossel de mídia do hero — intercala vídeos e fotos da operação.
const SLIDES: Slide[] = [
  { type: "video", src: "/hero/hero-1.mp4" },
  { type: "video", src: "/hero/hero-4.mp4", position: "center 72%" },
  { type: "video", src: "/hero/hero-2.mp4" },
  { type: "video", src: "/hero/hero-6.mp4" },
  { type: "video", src: "/hero/hero-3.mp4" },
  { type: "video", src: "/hero/hero-5.mp4" },
  { type: "image", src: "/hero/hero-b.jpg" },
  { type: "image", src: "/hero/hero-c.jpg" },
];

const IMAGE_MS = 4500;
const VIDEO_MS = 7000;

export function HeroMedia() {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Avança o slide e controla play/pause dos vídeos conforme o ativo.
  useEffect(() => {
    const current = SLIDES[active];

    SLIDES.forEach((s, i) => {
      if (s.type !== "video") return;
      const v = videoRefs.current[i];
      if (!v) return;
      if (i === active) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });

    const ms = current.type === "video" ? VIDEO_MS : IMAGE_MS;
    const t = setTimeout(() => setActive((i) => (i + 1) % SLIDES.length), ms);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-grovva-dark">
      {SLIDES.map((s, i) => (
        <div
          key={s.src}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          {s.type === "video" ? (
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={s.src}
              muted
              playsInline
              preload="auto"
              className="size-full object-cover"
              style={{ objectPosition: s.position }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={s.src} alt="" className="size-full object-cover" style={{ objectPosition: s.position }} />
          )}
        </div>
      ))}

      {/* Overlay escuro: bem mais preto, com leve toque de verde da marca */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 22% 18%, rgba(62,168,92,0.20), transparent 55%), radial-gradient(circle at 82% 88%, rgba(20,84,91,0.24), transparent 62%), linear-gradient(180deg, rgba(4,9,7,0.76) 0%, rgba(4,9,7,0.78) 60%, rgba(4,9,7,0.84) 100%)",
        }}
      />
    </div>
  );
}
