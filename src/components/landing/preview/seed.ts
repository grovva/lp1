// Static seed for the preview. Built fresh on each mount, so a page
// refresh (F5) restores exactly this state, nothing is persisted.

import type { PreviewState } from "./types";

function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

export function buildSeed(): PreviewState {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Monday of the current week, so the agenda lands on real days.
  const dow = today.getDay(); // 0=Sun
  const monday = addDays(today, dow === 0 ? -6 : 1 - dow);

  const stages = [
    { id: "s1", name: "Novo Lead", color: "#3B82F6" },
    { id: "s2", name: "Avaliação Agendada", color: "#F59E0B" },
    { id: "s3", name: "Confirmado", color: "#8B5CF6" },
    { id: "s4", name: "Fechou", color: "#10B981" },
    { id: "s5", name: "Cancelou", color: "#94A3B8" },
  ];

  const leads = [
    {
      id: "l1", seqId: 1, title: "Harmonização Facial", contactName: "Ana Paula Silva",
      contactPhone: "(22) 99001-0001", temperature: "quente" as const, priority: "high" as const,
      status: "open" as const, stageId: "s1", service: "Harmonização Facial",
      assignedTo: "Marina", daysSinceUpdate: 1,
    },
    {
      id: "l2", seqId: 2, title: "Botox", contactName: "Beatriz Santos",
      contactPhone: "(22) 99001-0002", temperature: "morno" as const, priority: "medium" as const,
      status: "open" as const, stageId: "s2", service: "Botox", value: 90000,
      assignedTo: "Rafael", daysSinceUpdate: 2,
    },
    {
      id: "l3", seqId: 3, title: "Preenchimento Labial", contactName: "Gabriela Souza",
      contactPhone: "(22) 99001-0007", temperature: "quente" as const, priority: "high" as const,
      status: "open" as const, stageId: "s2", service: "Preenchimento Labial", value: 120000,
      assignedTo: "Marina", daysSinceUpdate: 9,
    },
    {
      id: "l4", seqId: 4, title: "Harmonização + Lábial", contactName: "Carla Oliveira",
      contactPhone: "(22) 99001-0003", temperature: "quente" as const, priority: "high" as const,
      status: "open" as const, stageId: "s3", service: "Harmonização Facial",
      assignedTo: "Rafael", daysSinceUpdate: 0,
    },
    {
      id: "l5", seqId: 5, title: "Bioestimulador", contactName: "Fernanda Lima",
      contactPhone: "(22) 99001-0006", temperature: "morno" as const, priority: "medium" as const,
      status: "open" as const, stageId: "s3", service: "Bioestimulador", value: 180000,
      assignedTo: "Marina", daysSinceUpdate: 3,
    },
    {
      id: "l6", seqId: 6, title: "Botox + Limpeza de Pele", contactName: "Daniela Costa",
      contactPhone: "(22) 99001-0004", temperature: "quente" as const, priority: "high" as const,
      status: "won" as const, stageId: "s4", service: "Botox", value: 120000,
      assignedTo: "Rafael", daysSinceUpdate: 1,
    },
    {
      id: "l7", seqId: 7, title: "Peeling", contactName: "Helena Martins",
      contactPhone: "(22) 99001-0008", temperature: "morno" as const, priority: "low" as const,
      status: "won" as const, stageId: "s4", service: "Peeling", value: 45000,
      assignedTo: "Marina", daysSinceUpdate: 4,
    },
    {
      id: "l8", seqId: 8, title: "Avaliação", contactName: "Eduarda Ferreira",
      contactPhone: "(22) 99001-0005", temperature: "frio" as const, priority: "low" as const,
      status: "lost" as const, stageId: "s5", service: "Avaliação",
      assignedTo: "Rafael", daysSinceUpdate: 6,
    },
  ];

  const contacts = [
    { id: "c1", name: "Ana Paula Silva", phone: "(22) 99001-0001", email: "ana.silva@gmail.com", source: "Redes Sociais", tags: ["Quente", "Nova Cliente"], leads: 1, createdAt: iso(addDays(today, -4)) },
    { id: "c2", name: "Beatriz Santos", phone: "(22) 99001-0002", email: "beatriz.santos@gmail.com", source: "Redes Sociais", tags: ["Morno"], leads: 1, createdAt: iso(addDays(today, -7)) },
    { id: "c3", name: "Carla Oliveira", phone: "(22) 99001-0003", email: "carla.oliveira@hotmail.com", source: "Indicação", tags: ["Quente", "VIP"], leads: 1, createdAt: iso(addDays(today, -11)) },
    { id: "c4", name: "Daniela Costa", phone: "(22) 99001-0004", email: "daniela.costa@gmail.com", source: "Indicação", tags: ["Quente", "Retorno"], leads: 1, createdAt: iso(addDays(today, -15)) },
    { id: "c5", name: "Eduarda Ferreira", phone: "(22) 99001-0005", source: "WhatsApp", tags: ["Frio"], leads: 1, createdAt: iso(addDays(today, -20)) },
    { id: "c6", name: "Fernanda Lima", phone: "(22) 99001-0006", email: "fernanda.lima@gmail.com", source: "Redes Sociais", tags: ["Morno", "Retorno"], leads: 1, createdAt: iso(addDays(today, -22)) },
    { id: "c7", name: "Gabriela Souza", phone: "(22) 99001-0007", email: "gabi.souza@gmail.com", source: "Redes Sociais", tags: ["Quente"], leads: 1, createdAt: iso(addDays(today, -25)) },
    { id: "c8", name: "Helena Martins", phone: "(22) 99001-0008", email: "helena.martins@empresa.com", source: "Indicação", tags: ["VIP", "Retorno"], leads: 1, createdAt: iso(addDays(today, -30)) },
    { id: "c9", name: "Isabela Rocha", phone: "(22) 99001-0009", email: "isa.rocha@hotmail.com", source: "Website", tags: ["Morno"], leads: 0, createdAt: iso(addDays(today, -33)) },
    { id: "c10", name: "Juliana Alves", phone: "(22) 99001-0010", email: "juliana.alves@gmail.com", source: "Indicação", tags: ["Quente", "Nova Cliente"], leads: 0, createdAt: iso(addDays(today, -38)) },
  ];

  const appointments = [
    { id: "a1", contactName: "Carla Oliveira", service: "Harmonização Facial", date: iso(today), time: "09:00", status: "confirmed" as const, bot: true },
    { id: "a2", contactName: "Ana Paula Silva", service: "Avaliação", date: iso(today), time: "10:30", status: "confirmed" as const },
    { id: "a3", contactName: "Fernanda Lima", service: "Bioestimulador", date: iso(today), time: "14:00", status: "pending" as const, bot: true },
    { id: "a4", contactName: "Helena Martins", service: "Peeling", date: iso(today), time: "16:00", status: "confirmed" as const },
    { id: "a5", contactName: "Beatriz Santos", service: "Botox", date: iso(addDays(monday, 2)), time: "11:00", status: "pending" as const },
    { id: "a6", contactName: "Gabriela Souza", service: "Preenchimento Labial", date: iso(addDays(monday, 3)), time: "15:30", status: "confirmed" as const, bot: true },
    { id: "a7", contactName: "Daniela Costa", service: "Limpeza de Pele", date: iso(addDays(monday, 4)), time: "13:00", status: "confirmed" as const },
  ];

  const segments = [
    { id: "seg1", name: "Leads Quentes", description: "Oportunidades com alta intenção de compra", type: "leads" as const, conditions: [{ id: "cd1", field: "temperature", operator: "eq", value: "quente" }], createdAt: iso(addDays(today, -12)) },
    { id: "seg2", name: "Clientes VIP", description: "Contatos marcados como VIP para campanhas exclusivas", type: "contacts" as const, conditions: [{ id: "cd2", field: "tag", operator: "contains", value: "VIP" }], createdAt: iso(addDays(today, -18)) },
    { id: "seg3", name: "Captados no WhatsApp", description: "Origem WhatsApp para reengajamento", type: "contacts" as const, conditions: [{ id: "cd3", field: "source", operator: "eq", value: "WhatsApp" }], createdAt: iso(addDays(today, -5)) },
  ];

  const accounts = [
    { id: "ac1", name: "Caixa", balance: 384000 },
    { id: "ac2", name: "Conta PJ", balance: 2716000 },
  ];

  const transactions = [
    { id: "t1", description: "Botox, Daniela Costa", amount: 120000, type: "income" as const, account: "Conta PJ", date: iso(addDays(today, -1)), category: "Procedimentos" },
    { id: "t2", description: "Peeling, Helena Martins", amount: 45000, type: "income" as const, account: "Caixa", date: iso(addDays(today, -2)), category: "Procedimentos" },
    { id: "t3", description: "Aluguel da clínica", amount: 380000, type: "expense" as const, account: "Conta PJ", date: iso(addDays(today, -3)), category: "Fixo" },
    { id: "t4", description: "Harmonização, Carla Oliveira", amount: 220000, type: "income" as const, account: "Conta PJ", date: iso(addDays(today, -5)), category: "Procedimentos" },
    { id: "t5", description: "Insumos / Toxina", amount: 96000, type: "expense" as const, account: "Conta PJ", date: iso(addDays(today, -6)), category: "Insumos" },
    { id: "t6", description: "Tráfego pago, Meta Ads", amount: 150000, type: "expense" as const, account: "Conta PJ", date: iso(addDays(today, -8)), category: "Marketing" },
  ];

  const tasks = [
    { id: "tk1", title: "Ligar para Gabriela Souza (proposta lábial)", due: iso(addDays(today, -1)), priority: "high" as const, assignee: "Marina", status: "pending" as const, mine: true },
    { id: "tk2", title: "Confirmar avaliação da Ana Paula", due: iso(today), priority: "high" as const, assignee: "Marina", status: "pending" as const, mine: true },
    { id: "tk3", title: "Enviar orçamento de bioestimulador, Fernanda", due: iso(today), priority: "medium" as const, assignee: "Rafael", status: "in_progress" as const, mine: false },
    { id: "tk4", title: "Follow-up pós-procedimento, Daniela", due: iso(today), priority: "low" as const, assignee: "Marina", status: "pending" as const, mine: true },
    { id: "tk5", title: "Reativar Eduarda (avaliação cancelada)", due: null, priority: "low" as const, assignee: "Rafael", status: "pending" as const, mine: false },
    { id: "tk6", title: "Postar antes/depois no Instagram", due: iso(addDays(today, 2)), priority: "medium" as const, assignee: "Marina", status: "pending" as const, mine: true },
    { id: "tk7", title: "Fechar pacote da Carla", due: iso(today), priority: "high" as const, assignee: "Rafael", status: "completed" as const, mine: false },
  ];

  return {
    stages,
    leads,
    contacts,
    appointments,
    segments,
    transactions,
    accounts,
    tasks,
    nextSeq: 9,
    nextId: 100,
  };
}
