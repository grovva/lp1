"use client";

import { useMemo } from "react";
import { useModal } from "../modal";
import { usePreview } from "../store";
import { C, formatCurrency, PlusIcon } from "../ui";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function accountType(name: string): string {
  if (/caixa/i.test(name)) return "Dinheiro";
  if (/cart[aã]o/i.test(name)) return "Cartão de crédito";
  return "Conta bancária";
}

function ChangePill({ current, previous }: { current: number; previous: number }) {
  if (previous === 0) return null;
  const pct = Math.round(((current - previous) / previous) * 100);
  const up = pct >= 0;
  return (
    <span className="rounded-full px-1.5 py-0.5 font-medium" style={{ fontSize: 10, background: up ? "#DCFCE7" : "#FEE2E2", color: up ? "#15803D" : "#B91C1C" }}>
      {up ? "↑" : "↓"} {Math.abs(pct)}%
    </span>
  );
}

export function FinanceiroView() {
  const { state } = usePreview();
  const { open } = useModal();
  const now = useMemo(() => new Date(), []);

  const f = useMemo(() => {
    const monthKey = now.toISOString().slice(0, 7);
    const income = state.transactions.filter((t) => t.type === "income").reduce((a, t) => a + t.amount, 0);
    const expense = state.transactions.filter((t) => t.type === "expense").reduce((a, t) => a + t.amount, 0);
    const monthIncome = state.transactions.filter((t) => t.type === "income" && t.date.startsWith(monthKey)).reduce((a, t) => a + t.amount, 0) || 184500;
    const monthExpense = state.transactions.filter((t) => t.type === "expense" && t.date.startsWith(monthKey)).reduce((a, t) => a + t.amount, 0) || 62000;
    const saldo = state.accounts.reduce((a, ac) => a + ac.balance, 0);
    const aReceber = state.leads.filter((l) => l.status === "open" && l.value).reduce((a, l) => a + (l.value ?? 0), 0);
    return { income, expense, monthIncome, monthExpense, saldo, aReceber, aPagar: expense, result: monthIncome - monthExpense };
  }, [state, now]);

  const series = useMemo(() => {
    const arr: { label: string; value: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toISOString().slice(0, 7);
      const monthRevenue = state.transactions.filter((t) => t.type === "income" && t.date.startsWith(key)).reduce((a, t) => a + t.amount, 0);
      const baseline = [180000, 240000, 310000, 280000, 360000, 0][5 - i];
      arr.push({ label: MONTHS[d.getMonth()], value: monthRevenue + (i === 0 ? 0 : baseline) });
    }
    return arr;
  }, [state.transactions, now]);
  const max = Math.max(...series.map((s) => s.value), 1);

  const kpis = [
    { label: "Saldo Total", node: <span style={{ color: C.fg }}>{formatCurrency(f.saldo)}</span>, sub: `${state.accounts.length} contas`, dot: null },
    { label: "A Receber 30d", node: <span style={{ color: "#15803D" }}>{formatCurrency(f.aReceber)}</span>, sub: null, dot: "#22C55E" },
    { label: "A Pagar 30d", node: <span style={{ color: "#DC2626" }}>{formatCurrency(f.aPagar)}</span>, sub: null, dot: "#F87171" },
    { label: "Em Atraso", node: <span style={{ color: C.fg }}>{formatCurrency(0)}</span>, sub: null, dot: null },
  ];

  return (
    <div className="h-full overflow-y-auto" style={{ background: C.bg }}>
      <div className="space-y-6 px-5 py-5 md:px-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: C.fg, letterSpacing: "-0.01em" }}>Financeiro</h1>
            <p className="mt-0.5" style={{ fontSize: 13, color: C.mutedFg }}>Visão geral</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 items-center rounded-lg px-3 font-medium" style={{ fontSize: 13, border: `1px solid ${C.border}`, color: C.mutedFg, background: "#fff" }}>Recorrências</span>
            <button type="button" onClick={() => open({ kind: "transaction" })} className="inline-flex h-9 items-center gap-2 rounded-lg px-4 font-medium text-white transition-colors" style={{ background: C.primary, fontSize: 13 }}>
              <PlusIcon /> Transação
            </button>
          </div>
        </div>

        {/* KPI Bar */}
        <div className="overflow-hidden rounded-xl bg-white" style={{ border: `1px solid ${C.border}` }}>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {kpis.map((k, i) => (
              <div key={k.label} className="px-5 py-4" style={{ borderLeft: i > 0 ? `1px solid ${C.border}` : "none" }}>
                <p style={{ fontSize: 12, color: C.mutedFg }}>{k.label}</p>
                <p className="mt-1 flex items-center gap-1.5 tabular-nums" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em" }}>
                  {k.dot && <span className="size-1.5 shrink-0 rounded-full" style={{ background: k.dot }} />}
                  {k.node}
                </p>
                {k.sub && <p className="mt-0.5" style={{ fontSize: 11, color: C.mutedFg }}>{k.sub}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Contas */}
        <div>
          <p className="mb-3" style={{ fontSize: 14, fontWeight: 600, color: C.fg }}>Contas</p>
          <div className="flex flex-wrap gap-3">
            {state.accounts.map((ac) => (
              <div key={ac.id} className="flex items-center gap-3 rounded-lg bg-white px-4 py-2.5" style={{ border: `1px solid ${C.border}` }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: C.fg }}>{ac.name}</p>
                  <p style={{ fontSize: 11, color: C.mutedFg }}>{accountType(ac.name)}</p>
                </div>
                <p className="tabular-nums" style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>{formatCurrency(ac.balance)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resumo do Mês */}
        <div className="rounded-xl bg-white px-5 py-4" style={{ border: `1px solid ${C.border}` }}>
          <p className="mb-2" style={{ fontSize: 12, color: C.mutedFg }}>Resumo do Mês</p>
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <div>
              <p style={{ fontSize: 11, color: C.mutedFg }}>Recebido</p>
              <div className="flex items-center gap-1.5">
                <p style={{ fontSize: 14, fontWeight: 600, color: "#15803D" }}>{formatCurrency(f.monthIncome)}</p>
                <ChangePill current={f.monthIncome} previous={f.monthIncome * 0.84} />
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11, color: C.mutedFg }}>Pago</p>
              <div className="flex items-center gap-1.5">
                <p style={{ fontSize: 14, fontWeight: 600, color: "#DC2626" }}>{formatCurrency(f.monthExpense)}</p>
                <ChangePill current={f.monthExpense} previous={f.monthExpense * 1.1} />
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11, color: C.mutedFg }}>Resultado</p>
              <div className="flex items-center gap-1.5">
                <p style={{ fontSize: 14, fontWeight: 600, color: f.result >= 0 ? "#15803D" : "#DC2626" }}>{formatCurrency(f.result)}</p>
                <ChangePill current={f.result} previous={f.result * 0.8} />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue chart + transactions */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="rounded-xl bg-white p-5 lg:col-span-3" style={{ border: `1px solid ${C.border}` }}>
            <p className="mb-4" style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>Receita por mês</p>
            <div className="flex h-44 items-end gap-3">
              {series.map((s) => (
                <div key={s.label} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className="flex w-full items-end" style={{ height: 150 }}>
                    <div className="w-full rounded-t-md transition-all" style={{ height: `${(s.value / max) * 100}%`, background: `linear-gradient(180deg, ${C.primary}, ${C.primary}aa)`, minHeight: 4 }} title={formatCurrency(s.value)} />
                  </div>
                  <span style={{ fontSize: 11, color: C.mutedFg }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-white p-5 lg:col-span-2" style={{ border: `1px solid ${C.border}` }}>
            <p className="mb-3" style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>Últimas transações</p>
            <div className="space-y-2">
              {state.transactions.slice(0, 6).map((t) => (
                <div key={t.id} className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="truncate" style={{ fontSize: 13, color: C.fg }}>{t.description}</p>
                    <p style={{ fontSize: 11, color: C.faint }}>{t.category} · {new Date(t.date).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: t.type === "income" ? "#15803D" : C.destructive }}>
                    {t.type === "income" ? "+" : "−"}{formatCurrency(t.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
