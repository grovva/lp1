// Small shared primitives + helpers for the preview interior. Colors are
// the real CRM tokens, written as explicit values so they don't depend on
// the landing's Tailwind theme.

import type { ApptStatus, Temperature } from "./types";

export const C = {
  primary: "#D4458C",
  bg: "#FAFAF9",
  card: "#FFFFFF",
  fg: "#1A1A1A",
  muted: "#F3F3F2",
  mutedFg: "#78716C",
  faint: "#A8A29E",
  border: "#E7E5E4",
  destructive: "#DC2626",
  sidebar: "#FFFFFF",
  board: "#F5F5F4",
};

export const TEMP_COLOR: Record<Temperature, string> = {
  quente: "#DC2626",
  morno: "#F59E0B",
  frio: "#3B82F6",
};

export const TEMP_LABEL: Record<Temperature, string> = {
  quente: "Quente",
  morno: "Morno",
  frio: "Frio",
};

export function formatCurrency(cents?: number): string {
  if (cents == null) return "-";
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Avatar({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-semibold"
      style={{
        width: size,
        height: size,
        background: "#EEEEEC",
        color: C.mutedFg,
        fontSize: size <= 20 ? 8 : 11,
      }}
      title={name}
    >
      {initials(name)}
    </div>
  );
}

export function TempDot({ t }: { t?: Temperature }) {
  if (!t) return null;
  return (
    <span
      className="inline-block rounded-full align-middle"
      style={{ width: 8, height: 8, backgroundColor: TEMP_COLOR[t] }}
      title={`Temperatura: ${TEMP_LABEL[t]}`}
    />
  );
}

export const APPT_STATUS: Record<ApptStatus, { label: string; bg: string; fg: string }> = {
  pending: { label: "Pendente", bg: "#FEF3C7", fg: "#B45309" },
  confirmed: { label: "Confirmado", bg: "#DCFCE7", fg: "#15803D" },
  completed: { label: "Realizado", bg: "#F3F3F2", fg: "#57534E" },
  cancelled: { label: "Cancelado", bg: "#FEE2E2", fg: "#B91C1C" },
};

export function StatusBadge({ status }: { status: ApptStatus }) {
  const s = APPT_STATUS[status];
  return (
    <span
      className="rounded-full px-1.5 py-0.5 font-medium"
      style={{ fontSize: 9, background: s.bg, color: s.fg }}
    >
      {s.label}
    </span>
  );
}

export const TAG_COLOR: Record<string, string> = {
  Quente: "#EF4444",
  Morno: "#F59E0B",
  Frio: "#94A3B8",
  VIP: "#8B5CF6",
  Retorno: "#06B6D4",
  Indicação: "#10B981",
  "Redes Sociais": "#EC4899",
  "Nova Cliente": "#3B82F6",
};

export function TagPill({ tag }: { tag: string }) {
  const color = TAG_COLOR[tag] ?? "#78716C";
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 font-medium"
      style={{ fontSize: 10, background: `${color}1A`, color }}
    >
      {tag}
    </span>
  );
}

export function PlusIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// A primary action button matching the app's pink CTA.
export function PrimaryButton({
  children,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex h-9 items-center gap-2 rounded-lg px-4 font-medium text-white transition-colors"
      style={{ background: C.primary, fontSize: 13 }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#bd3c7d")}
      onMouseLeave={(e) => (e.currentTarget.style.background = C.primary)}
    >
      {children}
    </button>
  );
}
