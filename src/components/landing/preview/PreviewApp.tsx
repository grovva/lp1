"use client";

import { useState } from "react";
import {
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  Clock,
  CreditCard,
  Info,
  LayoutGrid,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { ModalHost } from "./ModalHost";
import { ModalProvider } from "./modal";
import { PreviewProvider } from "./store";
import type { TabKey } from "./types";
import { C } from "./ui";
import { AgendaView } from "./views/AgendaView";
import { ConfigView } from "./views/ConfigView";
import { ContatosView } from "./views/ContatosView";
import { DashboardView } from "./views/DashboardView";
import { FinanceiroView } from "./views/FinanceiroView";
import { MeuDiaView } from "./views/MeuDiaView";
import { PipelineView } from "./views/PipelineView";

// Rótulos e ordem espelhando o CRM real (sidebar clara).
const NAV: { key: TabKey; label: string; icon: typeof LayoutGrid }[] = [
  { key: "dashboard", label: "Visão Geral", icon: LayoutGrid },
  { key: "today", label: "Tarefas", icon: Clock },
  { key: "contacts", label: "Pacientes", icon: Users },
  { key: "crm", label: "CRM", icon: BarChart3 },
  { key: "booking", label: "Agenda", icon: Calendar },
  { key: "financial", label: "Financeiro", icon: CreditCard },
  { key: "settings", label: "Configurações", icon: Settings },
];

const PRIMARY_TINT = "rgba(212,69,140,0.10)";

function View({ tab }: { tab: TabKey }) {
  switch (tab) {
    case "crm": return <PipelineView />;
    case "dashboard": return <DashboardView />;
    case "today": return <MeuDiaView />;
    case "contacts": return <ContatosView />;
    case "booking": return <AgendaView />;
    case "financial": return <FinanceiroView />;
    case "settings": return <ConfigView />;
  }
}

export function PreviewApp() {
  const [tab, setTab] = useState<TabKey>("crm");

  return (
    <PreviewProvider>
      <ModalProvider>
        <div className="relative flex h-full overflow-hidden" style={{ background: C.bg }}>
          {/* Sidebar clara */}
          <aside
            className="flex w-[58px] shrink-0 flex-col md:w-[220px]"
            style={{ background: C.sidebar, borderRight: `1px solid ${C.border}` }}
          >
            {/* Brand */}
            <div className="flex items-center gap-2.5 px-3.5 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg" style={{ background: C.primary, color: "#fff", fontSize: 14, fontWeight: 800 }}>G</div>
              <span className="hidden md:inline" style={{ fontSize: 17, fontWeight: 700, color: C.fg, letterSpacing: "-0.02em" }}>grovva</span>
            </div>

            {/* Nav */}
            <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2.5 py-3">
              {NAV.map((item) => {
                const active = tab === item.key;
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setTab(item.key)}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 transition-colors"
                    style={{
                      background: active ? PRIMARY_TINT : "transparent",
                      color: active ? C.primary : "#57534E",
                    }}
                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = C.board; }}
                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                    title={item.label}
                  >
                    <Icon size={18} strokeWidth={1.8} className="shrink-0" />
                    <span className="hidden md:inline" style={{ fontSize: 13.5, fontWeight: active ? 600 : 500 }}>{item.label}</span>
                  </button>
                );
              })}
            </nav>

          </aside>

          {/* Coluna direita: top bar + conteúdo */}
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            {/* Top bar */}
            <header
              className="flex h-[52px] shrink-0 items-center gap-3 px-3 md:px-4"
              style={{ background: "#fff", borderBottom: `1px solid ${C.border}` }}
            >
              <div className="flex h-9 flex-1 items-center gap-2 rounded-lg px-3 md:max-w-[420px]" style={{ background: C.muted }}>
                <Search size={15} color={C.faint} />
                <span className="truncate" style={{ fontSize: 13, color: C.faint }}>Pesquisar pacientes, leads, agendamentos…</span>
              </div>
              <div className="ml-auto flex items-center gap-2 md:gap-3">
                <button type="button" className="relative flex size-9 items-center justify-center rounded-lg" style={{ color: C.mutedFg }} title="Notificações">
                  <Bell size={18} strokeWidth={1.8} />
                  <span className="absolute right-1.5 top-1.5 flex min-w-[15px] items-center justify-center rounded-full px-1" style={{ height: 15, background: "#EF4444", color: "#fff", fontSize: 9, fontWeight: 700 }}>3</span>
                </button>
                <div className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2" style={{ background: C.board }}>
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(212,69,140,0.15)", color: C.primary, fontSize: 12, fontWeight: 600 }}>M</div>
                  <span className="hidden md:inline" style={{ fontSize: 13, fontWeight: 500, color: C.fg }}>Marina</span>
                  <ChevronDown size={14} color={C.faint} className="hidden md:block" />
                </div>
              </div>
            </header>

            {/* Aviso de prévia */}
            <div className="flex items-center gap-2 px-4 py-1.5" style={{ background: "rgba(212,69,140,0.06)", borderBottom: `1px solid ${C.border}` }}>
              <Info size={13} color={C.primary} className="shrink-0" />
              <span className="truncate" style={{ fontSize: 11.5, color: C.mutedFg }}>
                Prévia de layout com funcionalidades básicas e resumidas. O sistema faz muito mais, e tudo é montado conforme a necessidade do seu negócio.
              </span>
            </div>

            {/* Conteúdo */}
            <main className="min-h-0 flex-1 overflow-hidden">
              <View tab={tab} />
            </main>
          </div>

          <ModalHost />
        </div>
      </ModalProvider>
    </PreviewProvider>
  );
}
