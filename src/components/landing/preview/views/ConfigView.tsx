"use client";

import type { ReactNode } from "react";
import {
  BriefcaseBusiness,
  Building2,
  Calendar,
  KeyRound,
  ListChecks,
  LogIn,
  MessageSquare,
  Settings2,
  ShieldCheck,
  Sparkles,
  ToggleRight,
  Users,
  Webhook,
} from "lucide-react";
import { C } from "../ui";

type Item = { label: string; desc: string; icon: ReactNode };

function ic(Comp: typeof Building2): ReactNode {
  return <Comp size={18} strokeWidth={1.8} />;
}

const GROUPS: { label: string; items: Item[] }[] = [
  {
    label: "Minha Clínica",
    items: [
      { label: "Dados da clínica", desc: "Nome, logo e informações gerais", icon: ic(Building2) },
      { label: "Equipe", desc: "Usuários e convites", icon: ic(Users) },
      { label: "Funções e permissões", desc: "O que cada usuário pode ver", icon: ic(KeyRound) },
      { label: "Módulos", desc: "Ativar ou desativar funcionalidades", icon: ic(ToggleRight) },
    ],
  },
  {
    label: "Atendimento",
    items: [
      { label: "Agendamento", desc: "Horários, intervalos e regras", icon: ic(Calendar) },
      { label: "Procedimentos", desc: "Serviços e durações", icon: ic(Sparkles) },
      { label: "Pipelines", desc: "Etapas e fluxos de atendimento", icon: ic(ListChecks) },
      { label: "Origens", desc: "De onde chegam seus leads", icon: ic(LogIn) },
      { label: "Empresas", desc: "Empresas vinculadas aos pacientes", icon: ic(BriefcaseBusiness) },
    ],
  },
  {
    label: "Comunicação",
    items: [
      { label: "Chatbot / Widget", desc: "Bot e widget para o seu site", icon: ic(MessageSquare) },
    ],
  },
  {
    label: "Sistema",
    items: [
      { label: "Segurança", desc: "Autenticação e sessões ativas", icon: ic(ShieldCheck) },
      { label: "Inteligência Artificial", desc: "Modelo, tom e comportamento", icon: ic(Sparkles) },
      { label: "Webhooks", desc: "Integrações via eventos HTTP", icon: ic(Webhook) },
      { label: "Histórico de ações", desc: "Audit log da plataforma", icon: ic(Settings2) },
    ],
  },
];

export function ConfigView() {
  return (
    <div className="h-full overflow-y-auto" style={{ background: C.bg }}>
      <div className="px-6 py-6 md:px-8">
        <h1 style={{ fontSize: 22, fontWeight: 700, color: C.fg, letterSpacing: "-0.01em" }}>Configurações</h1>
        <p className="mt-0.5" style={{ fontSize: 13, color: C.mutedFg }}>Personalize o sistema conforme a sua operação</p>

        <div className="mt-5 flex h-9 max-w-sm items-center gap-2 rounded-lg px-3" style={{ background: C.muted }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.faint} strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <span style={{ fontSize: 13, color: C.faint }}>Buscar configuração…</span>
        </div>

        <div className="mt-7 space-y-7">
          {GROUPS.map((g) => (
            <div key={g.label}>
              <p className="mb-3 uppercase" style={{ fontSize: 11, fontWeight: 600, color: C.mutedFg, letterSpacing: "0.05em" }}>{g.label}</p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {g.items.map((it) => (
                  <div key={it.label} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 transition-shadow hover:shadow-sm" style={{ border: `1px solid ${C.border}` }}>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(212,69,140,0.10)", color: C.primary }}>{it.icon}</span>
                    <div className="min-w-0">
                      <p style={{ fontSize: 13.5, fontWeight: 600, color: C.fg }}>{it.label}</p>
                      <p className="truncate" style={{ fontSize: 12, color: C.mutedFg }}>{it.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
