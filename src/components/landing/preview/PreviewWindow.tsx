"use client";

import { PreviewApp } from "./PreviewApp";

// Janela do preview (chrome de browser + app), reutilizável fora da landing.
// O glow externo é opcional para quem quiser envolver com fundo próprio.
export function PreviewWindow({ glow = true }: { glow?: boolean }) {
  return (
    <div className="relative">
      {glow && (
        <div
          aria-hidden
          className="absolute -inset-x-10 -bottom-10 -top-6 -z-0 rounded-[40px] blur-3xl"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 40%, rgba(62,168,92,0.25), transparent 70%)",
          }}
        />
      )}

      <div
        className="relative z-[1] overflow-hidden rounded-2xl bg-white"
        style={{
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow:
            "0 40px 120px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), inset 0 0 0 1px rgba(255,255,255,0.5)",
        }}
      >
        {/* Browser chrome */}
        <div
          className="flex items-center gap-3 border-b px-4 py-2.5"
          style={{ borderColor: "#E7E5E4", background: "#F3F3F2" }}
        >
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full" style={{ background: "#FF5F57" }} />
            <span className="size-3 rounded-full" style={{ background: "#FEBC2E" }} />
            <span className="size-3 rounded-full" style={{ background: "#28C840" }} />
          </div>
          <div
            className="mx-auto flex items-center gap-1.5 rounded-md px-3 py-1"
            style={{ background: "#fff", border: "1px solid #E7E5E4", maxWidth: 280 }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#A8A29E" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="truncate" style={{ fontSize: 11, color: "#78716C" }}>
              app.grovva.com/dashboard
            </span>
          </div>
          <div className="w-12" />
        </div>

        {/* App */}
        <div className="h-[560px] sm:h-[600px] md:h-[640px]">
          <PreviewApp />
        </div>
      </div>
    </div>
  );
}
