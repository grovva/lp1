// Shared matching engine for segments, used by both the segment list cards
// (live count) and the builder modal (live preview while editing conditions).

import type { Condition, PreviewState } from "./types";

export const CONTACT_FIELDS = [
  { key: "tag", label: "Tag", type: "text" as const },
  { key: "source", label: "Origem", type: "select" as const, options: ["Redes Sociais", "Indicação", "WhatsApp", "Website"] },
  { key: "name", label: "Nome", type: "text" as const },
];

export const LEAD_FIELDS = [
  { key: "temperature", label: "Temperatura", type: "select" as const, options: ["quente", "morno", "frio"] },
  { key: "status", label: "Status", type: "select" as const, options: ["open", "won", "lost"] },
  { key: "priority", label: "Prioridade", type: "select" as const, options: ["low", "medium", "high"] },
  { key: "title", label: "Título", type: "text" as const },
];

export const OPERATORS = [
  { key: "eq", label: "igual a" },
  { key: "neq", label: "diferente de" },
  { key: "contains", label: "contém" },
];

function rowsFor(state: PreviewState, type: "contacts" | "leads"): Record<string, unknown>[] {
  return type === "contacts"
    ? state.contacts.map((c) => ({ ...c, tag: c.tags.join(",") }))
    : (state.leads as unknown as Record<string, unknown>[]);
}

function matches(row: Record<string, unknown>, conditions: Condition[]): boolean {
  return conditions
    .filter((c) => c.field && c.value)
    .every((cond) => {
      const raw = String(row[cond.field] ?? "").toLowerCase();
      const val = cond.value.toLowerCase();
      if (cond.operator === "neq") return raw !== val;
      if (cond.operator === "contains") return raw.includes(val);
      if (cond.field === "tag") return raw.split(",").includes(val);
      return raw === val;
    });
}

export function matchRows(state: PreviewState, type: "contacts" | "leads", conditions: Condition[]) {
  return rowsFor(state, type).filter((r) => matches(r, conditions));
}

export function matchCount(state: PreviewState, type: "contacts" | "leads", conditions: Condition[]): number {
  const active = conditions.filter((c) => c.field && c.value);
  if (active.length === 0) return rowsFor(state, type).length;
  return matchRows(state, type, conditions).length;
}
