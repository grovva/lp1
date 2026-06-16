"use client";

import { useMemo, useState } from "react";
import { useModal } from "../modal";
import { usePreview } from "../store";
import type { Task } from "../types";
import { C } from "../ui";

const PRIORITY: Record<string, { label: string; color: string }> = {
  high: { label: "Alta", color: "#EF4444" },
  medium: { label: "Média", color: "#F59E0B" },
  low: { label: "Baixa", color: "#6B7280" },
};

const TONES = {
  neutral: { bg: "#fff", border: C.border, iconBg: C.muted, iconFg: C.mutedFg, text: C.fg },
  primary: { bg: "#fff", border: C.border, iconBg: "rgba(212,69,140,0.10)", iconFg: C.primary, text: C.fg },
  warning: { bg: "#FFFBEB", border: "#FDE68A", iconBg: "#FEF3C7", iconFg: "#B45309", text: "#92400E" },
  danger: { bg: "#FEF2F2", border: "#FECACA", iconBg: "#FEE2E2", iconFg: "#B91C1C", text: "#B91C1C" },
} as const;

function KpiCard({ label, value, icon, tone }: { label: string; value: number; icon: React.ReactNode; tone: keyof typeof TONES }) {
  const t = TONES[tone];
  const labelColor = tone === "neutral" || tone === "primary" ? C.mutedFg : t.text;
  return (
    <div className="rounded-xl px-4 py-3" style={{ background: t.bg, border: `1px solid ${t.border}` }}>
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg" style={{ background: t.iconBg, color: t.iconFg }}>{icon}</span>
        <div className="min-w-0">
          <p className="uppercase" style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", color: labelColor }}>{label}</p>
          <p className="mt-0.5 tabular-nums leading-none" style={{ fontSize: 24, fontWeight: 700, color: t.text, letterSpacing: "-0.01em" }}>{value}</p>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task, showDate, onClick }: { task: Task; showDate: boolean; onClick: () => void }) {
  const prio = PRIORITY[task.priority];
  const isDone = task.status === "completed";
  const inProgress = task.status === "in_progress";
  const dueLabel = showDate && task.due ? new Date(task.due).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }) : null;
  return (
    <div onClick={onClick} className="group relative cursor-pointer rounded-lg bg-white p-3 transition-all hover:shadow-sm" style={{ border: `1px solid ${C.border}` }}>
      <span className="absolute right-3 top-3 size-2 rounded-full" style={{ background: prio.color }} title={`Prioridade: ${prio.label}`} />
      <div className="flex items-start gap-2 pr-4">
        <span className="mt-[5px] size-2 shrink-0 rounded-full" style={{ background: isDone ? "#22C55E" : inProgress ? "#F59E0B" : "#D1D5DB" }} />
        <p className="flex-1 leading-snug" style={{ fontSize: 13.5, fontWeight: 500, color: isDone ? C.mutedFg : C.fg, textDecoration: isDone ? "line-through" : "none" }}>{task.title}</p>
      </div>
      <div className="ml-4 mt-1.5 flex items-center gap-3" style={{ fontSize: 12, color: C.mutedFg }}>
        {dueLabel && <span className="inline-flex items-center gap-1">🗓 {dueLabel}</span>}
        <span className="inline-flex items-center gap-1 truncate">👤 {task.assignee}</span>
      </div>
    </div>
  );
}

export function MeuDiaView() {
  const { state, dispatch } = usePreview();
  const { open } = useModal();
  const [filterMine, setFilterMine] = useState(false);
  const todayIso = new Date().toISOString().slice(0, 10);

  const tasks = useMemo(() => (filterMine ? state.tasks.filter((t) => t.mine) : state.tasks), [state.tasks, filterMine]);

  const cols = useMemo(() => {
    const active = tasks.filter((t) => t.status !== "completed");
    const overdue = active.filter((t) => t.due && t.due < todayIso);
    const today = active.filter((t) => t.due === todayIso);
    const upcoming = active.filter((t) => (t.due && t.due > todayIso) || !t.due);
    const completed = tasks.filter((t) => t.status === "completed");
    return { overdue, today, upcoming, completed };
  }, [tasks, todayIso]);

  const rotting = state.leads.filter((l) => l.status === "open" && l.daysSinceUpdate >= 7);
  const todays = state.appointments.filter((a) => a.date === todayIso);

  const columns = [
    { id: "overdue", label: "Vencidas", tasks: cols.overdue, color: "#EF4444", tint: "#FEF2F2", showDate: true },
    { id: "today", label: "Hoje", tasks: cols.today, color: "#F59E0B", tint: "#FFFBEB", showDate: false },
    { id: "upcoming", label: "Próximas", tasks: cols.upcoming, color: "#6366F1", tint: "#EEF2FF", showDate: true },
    { id: "completed", label: "Concluídas", tasks: cols.completed, color: "#10B981", tint: "#F0FDF4", showDate: false },
  ];

  const kpiIcon = (path: React.ReactNode) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{path}</svg>
  );

  return (
    <div className="flex h-full flex-col" style={{ background: C.bg }}>
      {/* Header */}
      <div className="shrink-0 border-b px-6 py-4" style={{ borderColor: C.border, background: "#fff" }}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: C.fg, letterSpacing: "-0.01em" }}>Tarefas</h1>
            <p className="mt-0.5 capitalize" style={{ fontSize: 13, color: C.mutedFg }}>{new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}</p>
          </div>
          <button type="button" onClick={() => setFilterMine((v) => !v)} className="rounded-lg px-3.5 py-2 transition-colors" style={{ fontSize: 13, border: `1px solid ${filterMine ? C.primary : C.border}`, color: filterMine ? C.primary : C.mutedFg, background: filterMine ? "rgba(212,69,140,0.05)" : "transparent" }}>
            {filterMine ? "Apenas meus" : "Todos"}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <KpiCard label="Tarefas atrasadas" value={cols.overdue.length} tone={cols.overdue.length ? "danger" : "neutral"} icon={kpiIcon(<><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>)} />
          <KpiCard label="Para hoje" value={cols.today.length} tone={cols.today.length ? "warning" : "neutral"} icon={kpiIcon(<><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /></>)} />
          <KpiCard label="Leads parados" value={rotting.length} tone={rotting.length ? "danger" : "neutral"} icon={kpiIcon(<><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>)} />
          <KpiCard label="Agendamentos hoje" value={todays.length} tone="primary" icon={kpiIcon(<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>)} />
        </div>
      </div>

      {/* Body: kanban + sidebar */}
      <div className="flex min-h-0 flex-1">
        <div className="flex flex-1 gap-4 overflow-x-auto p-5">
          {columns.map((col) => (
            <div key={col.id} className="flex w-[252px] shrink-0 flex-col rounded-xl" style={{ background: col.tint, border: `1px solid ${col.color}33` }}>
              <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: `${col.color}26` }}>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ background: col.color }} />
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>{col.label}</h3>
                </div>
                <span className="rounded-full px-1.5 py-0.5" style={{ fontSize: 11, fontWeight: 500, background: "rgba(255,255,255,0.7)", border: `1px solid ${C.border}`, color: C.mutedFg }}>{col.tasks.length}</span>
              </div>
              <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-2 py-2">
                {col.tasks.length === 0 ? (
                  <p className="py-8 text-center" style={{ fontSize: 12, color: C.faint }}>{col.id === "today" ? "Sem tarefas pra hoje" : col.id === "completed" ? "Nenhuma concluída" : "—"}</p>
                ) : (
                  col.tasks.map((t) => (
                    <TaskCard key={t.id} task={t} showDate={col.showDate} onClick={() => dispatch({ type: "CYCLE_TASK", id: t.id })} />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="hidden w-[300px] shrink-0 space-y-5 overflow-y-auto border-l px-5 py-5 lg:block" style={{ borderColor: C.border, background: "rgba(243,243,242,0.4)" }}>
          <div>
            <h3 className="mb-3 uppercase" style={{ fontSize: 12, fontWeight: 600, color: C.mutedFg, letterSpacing: "0.05em" }}>Agendamentos de hoje ({todays.length})</h3>
            {todays.length === 0 ? (
              <p className="py-4 text-center" style={{ fontSize: 12, color: C.faint }}>Nenhum agendamento</p>
            ) : (
              <div className="space-y-2">
                {todays.map((a) => (
                  <div key={a.id} className="rounded-lg bg-white px-3 py-2.5" style={{ border: `1px solid ${C.border}` }}>
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: 13, fontFamily: "ui-monospace, monospace", color: C.primary, fontWeight: 600 }}>{a.time}</span>
                      <span className="rounded-full px-1.5 py-0.5 font-medium" style={{ fontSize: 9, background: a.status === "confirmed" ? "#DCFCE7" : a.status === "cancelled" ? "#FEE2E2" : "#FEF3C7", color: a.status === "confirmed" ? "#15803D" : a.status === "cancelled" ? "#B91C1C" : "#B45309" }}>
                        {a.status === "confirmed" ? "Confirmado" : a.status === "cancelled" ? "Cancelado" : "Pendente"}
                      </span>
                    </div>
                    <p className="mt-1" style={{ fontSize: 13, fontWeight: 500, color: C.fg }}>{a.contactName}</p>
                    <p style={{ fontSize: 11, color: C.mutedFg }}>{a.service}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {rotting.length > 0 && (
            <div>
              <h3 className="mb-2 flex items-center gap-1.5 uppercase" style={{ fontSize: 12, fontWeight: 600, color: "#DC2626", letterSpacing: "0.05em" }}>
                <span className="size-2 rounded-full" style={{ background: "#EF4444" }} /> Leads esfriando ({rotting.length})
              </h3>
              <div className="space-y-2">
                {rotting.slice(0, 8).map((l) => (
                  <button key={l.id} type="button" onClick={() => open({ kind: "lead", id: l.id })} className="block w-full rounded-lg px-3 py-2.5 text-left transition-colors" style={{ background: "rgba(254,242,242,0.6)", border: "1px solid #FECACA" }}>
                    <p className="truncate" style={{ fontSize: 13, fontWeight: 500, color: C.fg }}>{l.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span style={{ fontSize: 11, color: C.mutedFg }}>{l.contactName}</span>
                      <span style={{ fontSize: 10, color: "#DC2626" }}>{l.daysSinceUpdate} dias sem atividade</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
