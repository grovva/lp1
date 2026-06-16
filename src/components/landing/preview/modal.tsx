"use client";

// Modal layer scoped to the preview window (not the whole viewport).
// Any deep component can open a modal via useModal(); the host renders it
// as an absolute overlay inside the app shell.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ModalState =
  | { kind: "lead"; id: string }
  | { kind: "contact"; name: string }
  | { kind: "appointment"; date?: string; time?: string }
  | { kind: "segment" }
  | { kind: "transaction" }
  | null;

interface ModalCtx {
  modal: ModalState;
  open: (m: Exclude<ModalState, null>) => void;
  close: () => void;
}

const Ctx = createContext<ModalCtx | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>(null);
  return (
    <Ctx.Provider value={{ modal, open: setModal, close: () => setModal(null) }}>
      {children}
    </Ctx.Provider>
  );
}

export function useModal(): ModalCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}

// Centered dialog scoped to the nearest positioned ancestor (the app shell).
export function ModalShell({
  onClose,
  children,
  width,
  height,
}: {
  onClose: () => void;
  children: ReactNode;
  width: string;
  height?: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center p-3 sm:p-5"
      style={{ background: "rgba(15,13,21,0.55)", backdropFilter: "blur(2px)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col overflow-hidden bg-white"
        style={{
          width,
          maxWidth: "100%",
          height,
          maxHeight: "100%",
          borderRadius: 16,
          boxShadow: "0 30px 90px -20px rgba(0,0,0,0.55)",
          animation: "previewModalIn 180ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="flex size-8 items-center justify-center rounded-md transition-colors hover:bg-[#F3F3F2]"
      style={{ color: "#78716C" }}
      aria-label="Fechar"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
}
