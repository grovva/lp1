"use client";

import { useEffect, useRef } from "react";

type BrandsCarouselProps = {
  logos: string[];
};

const BASE_SPEED_PX_PER_SEC = 55;
const NORMAL_RATE = 1;
const HOVER_RATE = 0.2;
const RATE_EASE = 5;

export function BrandsCarousel({ logos }: BrandsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const targetRateRef = useRef(NORMAL_RATE);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let position = 0;
    let currentRate = NORMAL_RATE;
    let lastTime = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      currentRate +=
        (targetRateRef.current - currentRate) * Math.min(1, dt * RATE_EASE);

      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        position -= BASE_SPEED_PX_PER_SEC * currentRate * dt;
        if (-position >= halfWidth) position += halfWidth;
        track.style.transform = `translate3d(${position}px, 0, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => {
        targetRateRef.current = HOVER_RATE;
      }}
      onMouseLeave={() => {
        targetRateRef.current = NORMAL_RATE;
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-24 z-10"
        style={{
          background:
            "linear-gradient(to right, var(--color-grovva-dark) 0%, rgba(14,22,17,0.3) 55%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-24 z-10"
        style={{
          background:
            "linear-gradient(to left, var(--color-grovva-dark) 0%, rgba(14,22,17,0.3) 55%, transparent 100%)",
        }}
      />
      <div
        ref={trackRef}
        className="flex w-max items-center gap-0 md:gap-16 will-change-transform"
      >
        {[...logos, ...logos].map((src, i) => (
          <div
            key={`${src}-${i}`}
            aria-hidden={i >= logos.length}
            className="brand-mask shrink-0 h-14 md:h-20 w-40 md:w-56 opacity-85"
            style={{
              WebkitMaskImage: `url(${src})`,
              maskImage: `url(${src})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
