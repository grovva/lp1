import type { CSSProperties } from "react";

type CardProps = {
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
};

function Card({ className = "", style, children }: CardProps) {
  return (
    <div
      className={`pointer-events-none rounded-2xl border border-grovva-green/20 bg-grovva-green/[0.06] p-4 backdrop-blur-xl ${className}`}
      style={{
        boxShadow:
          "0 30px 60px -20px rgba(0,0,0,0.55), inset 0 1px 0 0 rgba(255,255,255,0.06)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function AreaChart() {
  return (
    <svg
      viewBox="0 0 200 70"
      className="mt-3 w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3EA85C" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3EA85C" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 58 C 18 50, 30 52, 50 45 C 70 38, 78 55, 100 42 C 120 30, 130 48, 150 30 C 170 14, 184 22, 200 8 L 200 70 L 0 70 Z"
        fill="url(#area-fill)"
      />
      <path
        d="M0 58 C 18 50, 30 52, 50 45 C 70 38, 78 55, 100 42 C 120 30, 130 48, 150 30 C 170 14, 184 22, 200 8"
        stroke="#3EA85C"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BarChart() {
  const bars = [
    { h: 22, on: true },
    { h: 36, on: true },
    { h: 14, on: false },
    { h: 30, on: true },
    { h: 42, on: true },
    { h: 18, on: false },
    { h: 32, on: true },
    { h: 24, on: false },
    { h: 38, on: true },
    { h: 28, on: true },
    { h: 16, on: false },
  ];
  return (
    <svg viewBox="0 0 200 50" className="mt-3 w-full" preserveAspectRatio="none">
      {bars.map((b, i) => (
        <rect
          key={i}
          x={i * 18 + 2}
          y={50 - b.h}
          width="10"
          height={b.h}
          rx="5"
          fill={b.on ? "#3EA85C" : "#4B5563"}
        />
      ))}
    </svg>
  );
}

function StackedBar() {
  return (
    <div className="mt-3">
      <div className="flex h-2.5 w-full overflow-hidden rounded-full">
        <div className="h-full bg-grovva-green" style={{ width: "75.3%" }} />
        <div className="h-full bg-amber-500" style={{ width: "24.7%" }} />
      </div>
      <div className="mt-3 flex items-center gap-4 text-[10px]">
        <span className="flex items-center gap-1.5 text-white/85">
          <span className="size-2 rounded-sm bg-grovva-green" />
          <span className="font-semibold">75.3%</span>
          <span className="text-grovva-green">↗ 41%</span>
        </span>
        <span className="flex items-center gap-1.5 text-white/85">
          <span className="size-2 rounded-sm bg-amber-500" />
          <span className="font-semibold">24.7%</span>
          <span className="text-amber-400">↘ 12%</span>
        </span>
      </div>
    </div>
  );
}

function ArrowUp({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export function FloatingCards() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      {/* Top left — Visualizações */}
      <Card
        className="absolute top-20 -left-10 w-[230px]"
        style={{ transform: "rotate(10deg)" }}
      >
        <p className="text-sm font-semibold text-white/85">Visualizações</p>
        <p className="mt-1 text-xl font-semibold text-white">27k</p>
        <AreaChart />
      </Card>

      {/* Bottom left — Aquisição de clientes */}
      <Card
        className="absolute top-[70%] -left-14 w-[260px]"
        style={{ transform: "rotate(7deg)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              Aquisição de clientes
            </p>
            <p className="mt-0.5 text-[10px] text-white/55">
              Iniciado em 02 Fev 2026
            </p>
          </div>
          <span className="flex size-5 items-center justify-center rounded-full bg-white/10 text-grovva-green">
            <ArrowUp className="size-3" />
          </span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-[10px] text-white/60">ROI</p>
            <p className="text-lg font-semibold text-grovva-green">
              +R$ 2.531
            </p>
          </div>
          <svg viewBox="0 0 80 28" className="h-7 w-20">
            <path
              d="M0 22 C 15 18, 25 24, 40 14 C 55 6, 65 12, 80 2"
              stroke="#3EA85C"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </Card>

      {/* Top right — Visualizações totais */}
      <Card
        className="absolute top-24 -right-16 w-[240px]"
        style={{ transform: "rotate(10deg)" }}
      >
        <div className="flex items-start justify-between">
          <p className="text-sm font-semibold text-white/85">
            Visualizações totais
          </p>
          <span className="text-white/40">•••</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-xl font-semibold text-white">2.657</span>
          <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-grovva-green">
            34% <ArrowUp className="size-3" />
          </span>
        </div>
        <p className="mt-1 text-[10px] text-white/55">
          Melhor resultado do mês
        </p>
        <BarChart />
      </Card>

      {/* Bottom right — Taxa de conversão */}
      <Card
        className="absolute top-[72%] -right-20 w-[260px]"
        style={{ transform: "rotate(7deg)" }}
      >
        <p className="text-sm font-semibold text-white/95">
          Taxa de conversão
        </p>
        <StackedBar />
      </Card>
    </div>
  );
}
