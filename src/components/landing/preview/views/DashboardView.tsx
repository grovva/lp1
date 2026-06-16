"use client";

import { useMemo } from "react";
import { usePreview } from "../store";
import { APPT_STATUS, Avatar, C, formatCurrency } from "../ui";
import type { ApptStatus } from "../types";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
// Probabilidade de fechamento por etapa (forecast ponderado).
const STAGE_PROB: Record<string, number> = { s1: 0.1, s2: 0.3, s3: 0.6, s4: 1, s5: 0 };

function CardBox({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white p-5" style={{ border: `1px solid ${C.border}` }}>
      <div className="mb-3 flex items-center justify-between">
        <h2 style={{ fontSize: 14, fontWeight: 600, color: C.fg }}>{title}</h2>
        {action && <span style={{ fontSize: 11, color: C.primary }}>{action}</span>}
      </div>
      {children}
    </div>
  );
}

export function DashboardView() {
  const { state } = usePreview();
  const now = useMemo(() => new Date(), []);
  const todayIso = now.toISOString().slice(0, 10);

  const data = useMemo(() => {
    const open = state.leads.filter((l) => l.status === "open");
    const won = state.leads.filter((l) => l.status === "won");
    const wonValue = won.reduce((a, l) => a + (l.value ?? 0), 0);
    const pipeline = open.reduce((a, l) => a + (l.value ?? 0), 0);
    const weighted = open.reduce((a, l) => a + (l.value ?? 0) * (STAGE_PROB[l.stageId] ?? 0.2), 0);
    const bestCase = open.filter((l) => (STAGE_PROB[l.stageId] ?? 0) >= 0.5).reduce((a, l) => a + (l.value ?? 0), 0);
    const commit = open.filter((l) => (STAGE_PROB[l.stageId] ?? 0) >= 0.6).reduce((a, l) => a + (l.value ?? 0), 0);

    const todays = state.appointments.filter((a) => a.date === todayIso);
    const confirmed = todays.filter((a) => a.status === "confirmed").length;

    const completedTasks = state.tasks.filter((t) => t.status === "completed").length;
    const pending = state.tasks.filter((t) => t.status !== "completed");
    const overdue = pending.filter((t) => t.due != null && t.due < todayIso).length;

    // Fluxo de caixa: 6 meses (com baseline pros meses anteriores ficarem cheios).
    const series = [] as { label: string; income: number; expense: number }[];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toISOString().slice(0, 7);
      const inc = state.transactions.filter((t) => t.type === "income" && t.date.startsWith(key)).reduce((a, t) => a + t.amount, 0);
      const exp = state.transactions.filter((t) => t.type === "expense" && t.date.startsWith(key)).reduce((a, t) => a + t.amount, 0);
      const baseInc = [180000, 240000, 310000, 280000, 360000, 0][5 - i];
      const baseExp = [70000, 95000, 120000, 110000, 140000, 0][5 - i];
      series.push({ label: MONTHS[d.getMonth()], income: inc + (i === 0 ? 0 : baseInc), expense: exp + (i === 0 ? 0 : baseExp) });
    }

    const balance = state.accounts.reduce((a, ac) => a + ac.balance, 0);

    const apptByStatus = (["confirmed", "pending", "completed", "cancelled"] as ApptStatus[]).map((s) => ({
      status: s,
      count: state.appointments.filter((a) => a.status === s).length,
    }));

    return { open, won, wonValue, pipeline, weighted, bestCase, commit, todays, confirmed, completedTasks, pending, overdue, series, balance, apptByStatus };
  }, [state, todayIso, now]);

  const kpis = [
    { label: "Pacientes", value: state.contacts.length, sub: "+2 esta semana", up: true, color: "#3B82F6" },
    { label: "Leads Abertos", value: data.open.length, sub: `+${state.leads.filter((l) => l.stageId === "s1").length} hoje`, up: true, color: "#D4458C" },
    { label: "Conversas", value: state.appointments.filter((a) => a.bot).length + 4, sub: "2 aguardando", up: false, color: "#10B981" },
    { label: "Agendamentos", value: data.todays.length, sub: `${data.confirmed} confirmados`, up: false, color: "#F59E0B" },
  ];

  const forecast = [
    { label: "Pipeline", value: data.pipeline, color: "#94A3B8" },
    { label: "Ponderado", value: data.weighted, color: "#3B82F6" },
    { label: "Best Case", value: data.bestCase, color: "#F59E0B" },
    { label: "Commit", value: data.commit, color: "#10B981" },
    { label: "Fechado", value: data.wonValue, color: "#D4458C" },
  ];

  const maxFlow = Math.max(...data.series.flatMap((s) => [s.income, s.expense]), 1);
  const stageCounts = state.stages.filter((s) => s.id !== "s5").map((s) => ({ ...s, count: state.leads.filter((l) => l.stageId === s.id).length }));
  const maxStage = Math.max(...stageCounts.map((s) => s.count), 1);
  const totalAppt = Math.max(data.apptByStatus.reduce((a, s) => a + s.count, 0), 1);

  return (
    <div className="h-full overflow-y-auto" style={{ background: C.bg }}>
      <div className="space-y-6 px-5 py-5 md:px-6">
        {/* Header */}
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: C.fg, letterSpacing: "-0.01em" }}>Visão Geral</h1>
          <p className="mt-0.5 capitalize" style={{ fontSize: 13, color: C.mutedFg }}>
            {now.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>

        {/* TOP: Fluxo de caixa + (Filtros + Balanço) */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <CardBox title="Fluxo de Caixa" action="Ver financeiro">
              <div className="flex h-40 items-end gap-3">
                {data.series.map((s) => (
                  <div key={s.label} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="flex w-full items-end justify-center gap-1" style={{ height: 132 }}>
                      <div className="w-1/2 rounded-t" style={{ height: `${(s.income / maxFlow) * 100}%`, background: "#10B981", minHeight: 3 }} title={`Entradas ${formatCurrency(s.income)}`} />
                      <div className="w-1/2 rounded-t" style={{ height: `${(s.expense / maxFlow) * 100}%`, background: "#F43F5E", minHeight: 3 }} title={`Saídas ${formatCurrency(s.expense)}`} />
                    </div>
                    <span style={{ fontSize: 11, color: C.mutedFg }}>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-4">
                <span className="flex items-center gap-1.5" style={{ fontSize: 11, color: C.mutedFg }}><span className="size-2.5 rounded-sm" style={{ background: "#10B981" }} /> Entradas</span>
                <span className="flex items-center gap-1.5" style={{ fontSize: 11, color: C.mutedFg }}><span className="size-2.5 rounded-sm" style={{ background: "#F43F5E" }} /> Saídas</span>
              </div>
            </CardBox>
          </div>
          <div className="space-y-5">
            <CardBox title="Filtros">
              <div className="flex flex-wrap gap-1.5">
                {["Hoje", "7 dias", "Este mês", "Trimestre"].map((f, i) => (
                  <span key={f} className="rounded-full px-2.5 py-1 font-medium" style={{ fontSize: 11, background: i === 2 ? `${C.primary}1A` : C.muted, color: i === 2 ? C.primary : C.mutedFg }}>{f}</span>
                ))}
              </div>
            </CardBox>
            <CardBox title="Balanço">
              <p style={{ fontSize: 24, fontWeight: 700, color: "#059669", letterSpacing: "-0.01em" }}>{formatCurrency(data.balance)}</p>
              <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-3" style={{ borderColor: C.border }}>
                <div>
                  <p style={{ fontSize: 11, color: C.mutedFg }}>Entradas</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#059669" }}>{formatCurrency(state.transactions.filter((t) => t.type === "income").reduce((a, t) => a + t.amount, 0))}</p>
                </div>
                <div>
                  <p style={{ fontSize: 11, color: C.mutedFg }}>Saídas</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#E11D48" }}>{formatCurrency(state.transactions.filter((t) => t.type === "expense").reduce((a, t) => a + t.amount, 0))}</p>
                </div>
              </div>
            </CardBox>
          </div>
        </div>

        {/* MIDDLE: Agendamentos 24h + Aniversariantes */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <CardBox title="Agendamentos das próximas 24h" action="Ver agenda">
              {data.todays.length === 0 ? (
                <p className="py-8 text-center" style={{ fontSize: 12, color: C.faint }}>Nenhum agendamento</p>
              ) : (
                <div className="space-y-2">
                  {data.todays.slice(0, 5).map((a) => (
                    <div key={a.id} className="flex items-center gap-3 rounded-md px-2 py-2" style={{ background: C.bg }}>
                      <Avatar name={a.contactName} size={28} />
                      <div className="flex-1 min-w-0">
                        <p className="truncate" style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>{a.contactName}</p>
                        <p style={{ fontSize: 11, color: C.mutedFg }}>{a.service}</p>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.primary, fontFamily: "ui-monospace, monospace" }}>{a.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardBox>
          </div>
          <CardBox title="Aniversariantes">
            <div className="space-y-2.5">
              {state.contacts.slice(0, 3).map((c, i) => (
                <div key={c.id} className="flex items-center gap-2.5">
                  <Avatar name={c.name} size={28} />
                  <div className="flex-1 min-w-0">
                    <p className="truncate" style={{ fontSize: 13, fontWeight: 500, color: C.fg }}>{c.name}</p>
                    <p style={{ fontSize: 11, color: C.mutedFg }}>{i === 0 ? "Hoje 🎂" : `em ${i * 3} dias`}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBox>
        </div>

        {/* Separador */}
        <div className="pt-1">
          <h2 style={{ fontSize: 15, fontWeight: 600, color: C.fg, letterSpacing: "-0.01em" }}>Resumo de operação</h2>
          <p className="mt-0.5" style={{ fontSize: 12, color: C.mutedFg }}>KPIs gerais, pipeline e relatórios</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl bg-white px-5 py-4" style={{ border: `1px solid ${C.border}` }}>
              <p style={{ fontSize: 12, color: C.mutedFg }}>{k.label}</p>
              <p className="mt-1 tabular-nums" style={{ fontSize: 28, fontWeight: 700, color: C.fg, letterSpacing: "-0.02em" }}>{k.value}</p>
              <div className="mt-0.5 flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={k.up ? "#10B981" : "#94A3B8"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {k.up ? <polyline points="18 15 12 9 6 15" /> : <line x1="5" y1="12" x2="19" y2="12" />}
                </svg>
                <p style={{ fontSize: 11, color: C.mutedFg }}>{k.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Two column */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="space-y-5 xl:col-span-2">
            {/* Pipeline overview */}
            <CardBox title="Pipeline — Comercial" action="Ver kanban">
              <div className="space-y-2">
                {stageCounts.map((s) => (
                  <div key={s.id} className="flex items-center gap-3">
                    <span className="w-[120px] truncate" style={{ fontSize: 12, color: C.mutedFg }}>{s.name}</span>
                    <div className="h-5 flex-1 overflow-hidden rounded-md" style={{ background: C.muted }}>
                      <div className="h-full rounded-md" style={{ background: s.color, width: `${Math.max(4, (s.count / maxStage) * 100)}%` }} />
                    </div>
                    <span className="w-8 text-right tabular-nums" style={{ fontSize: 11, color: C.mutedFg }}>{s.count}</span>
                  </div>
                ))}
              </div>
            </CardBox>

            {/* Forecast */}
            <CardBox title="Forecast Mensal" action="Ver detalhes">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                {forecast.map((f) => (
                  <div key={f.label} className="text-center">
                    <p className="uppercase" style={{ fontSize: 10, color: C.mutedFg, letterSpacing: "0.04em" }}>{f.label}</p>
                    <p className="mt-1" style={{ fontSize: 15, fontWeight: 700, color: f.color }}>{formatCurrency(f.value)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between" style={{ fontSize: 10, color: C.mutedFg }}>
                  <span>Fechado vs Pipeline</span>
                  <span>{data.pipeline > 0 ? Math.round((data.wonValue / (data.pipeline + data.wonValue)) * 100) : 0}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full" style={{ background: C.muted }}>
                  <div className="h-full rounded-full" style={{ background: "#22C55E", width: `${data.pipeline > 0 ? Math.min(100, (data.wonValue / (data.pipeline + data.wonValue)) * 100) : 0}%` }} />
                </div>
              </div>
            </CardBox>

            {/* Leads recentes */}
            <CardBox title="Leads Recentes" action="Ver todos">
              <div className="space-y-0.5">
                {state.leads.slice(0, 5).map((l) => (
                  <div key={l.id} className="flex items-center justify-between rounded-md px-2 py-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate" style={{ fontSize: 13, fontWeight: 500, color: C.fg }}>{l.title}</p>
                      <p style={{ fontSize: 11, color: C.mutedFg }}>{l.contactName}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {l.value != null && <span style={{ fontSize: 12, fontWeight: 500, color: C.fg }}>{formatCurrency(l.value)}</span>}
                      <span className="rounded-full px-1.5 py-0.5 font-medium" style={{ fontSize: 10, background: l.status === "won" ? "#DCFCE7" : l.status === "lost" ? "#FEE2E2" : "#DBEAFE", color: l.status === "won" ? "#15803D" : l.status === "lost" ? "#B91C1C" : "#1D4ED8" }}>
                        {l.status === "won" ? "Ganho" : l.status === "lost" ? "Perdido" : "Aberto"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardBox>
          </div>

          {/* Right */}
          <div className="space-y-5">
            <CardBox title="Atividades">
              <div className="space-y-3">
                {[
                  { label: "Concluídas hoje", value: data.completedTasks, color: "#16A34A" },
                  { label: "Concluídas na semana", value: data.completedTasks + 3, color: "#2563EB" },
                  { label: "Pendentes", value: data.pending.length, color: "#D97706" },
                  { label: "Vencidas", value: data.overdue, color: "#DC2626" },
                ].map((a) => (
                  <div key={a.label} className="flex items-center justify-between">
                    <span style={{ fontSize: 12, color: a.label === "Vencidas" ? "#DC2626" : C.mutedFg }}>{a.label}</span>
                    <span className="tabular-nums" style={{ fontSize: 14, fontWeight: 700, color: a.color }}>{a.value}</span>
                  </div>
                ))}
              </div>
            </CardBox>

            <CardBox title="Próximas Tarefas">
              <div className="space-y-1.5">
                {data.pending.slice(0, 5).map((t) => {
                  const overdue = t.due != null && t.due < todayIso;
                  return (
                    <div key={t.id} className="flex items-center gap-2 py-1">
                      <span style={{ fontSize: 14, color: t.status === "in_progress" ? "#F59E0B" : "#9CA3AF" }}>{t.status === "in_progress" ? "◐" : "○"}</span>
                      <p className="min-w-0 flex-1 truncate" style={{ fontSize: 12, color: C.fg }}>{t.title}</p>
                      {t.due && (
                        <span style={{ fontSize: 10, color: overdue ? "#DC2626" : C.mutedFg, fontWeight: overdue ? 600 : 400 }}>
                          {new Date(t.due).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardBox>
          </div>
        </div>

        {/* Reports row */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <CardBox title="Status dos agendamentos">
            <div className="flex h-3 overflow-hidden rounded-full" style={{ background: C.muted }}>
              {data.apptByStatus.map((s) => (
                <div key={s.status} style={{ width: `${(s.count / totalAppt) * 100}%`, background: APPT_STATUS[s.status].fg }} title={APPT_STATUS[s.status].label} />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {data.apptByStatus.map((s) => (
                <div key={s.status} className="flex items-center gap-2">
                  <span className="size-2.5 rounded-sm" style={{ background: APPT_STATUS[s.status].fg }} />
                  <span style={{ fontSize: 12, color: C.mutedFg }}>{APPT_STATUS[s.status].label}</span>
                  <span className="ml-auto tabular-nums" style={{ fontSize: 12, fontWeight: 600, color: C.fg }}>{s.count}</span>
                </div>
              ))}
            </div>
          </CardBox>

          <CardBox title="Horários movimentados">
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => {
                const intensity = (Math.sin(i * 1.7) + 1) / 2;
                return <div key={i} className="aspect-square rounded-sm" style={{ background: `rgba(212,69,140,${0.08 + intensity * 0.55})` }} />;
              })}
            </div>
            <div className="mt-2 flex justify-between" style={{ fontSize: 10, color: C.faint }}>
              <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
            </div>
          </CardBox>
        </div>
      </div>
    </div>
  );
}
