"use client";

import { useMemo, useState } from "react";
import { useModal, CloseButton, ModalShell } from "../modal";
import { usePreview } from "../store";
import type { Priority, Temperature } from "../types";
import { Avatar, C, formatCurrency, TEMP_COLOR, TEMP_LABEL } from "../ui";

const PRIORITY: Record<Priority, { label: string; color: string }> = {
  high: { label: "Alta", color: "#DC2626" },
  medium: { label: "Média", color: "#F59E0B" },
  low: { label: "Baixa", color: "#94A3B8" },
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span style={{ fontSize: 12, color: C.mutedFg }}>{label}</span>
      <div className="text-right">{children}</div>
    </div>
  );
}

function BadgeSelect<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string; color: string }[];
  onChange: (v: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const cur = options.find((o) => o.value === value);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5"
        style={{ fontSize: 11, background: cur ? `${cur.color}1A` : C.muted, color: cur?.color ?? C.mutedFg, fontWeight: 600 }}
      >
        <span className="inline-block size-2 rounded-full" style={{ background: cur?.color }} />
        {cur?.label ?? "-"}
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-1 w-32 rounded-lg bg-white py-1 shadow-lg" style={{ border: `1px solid ${C.border}` }}>
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => { onChange(o.value); setOpen(false); }}
              className="flex w-full items-center gap-2 px-2.5 py-1.5 text-left hover:bg-[#F3F3F2]"
            >
              <span className="inline-block size-2 rounded-full" style={{ background: o.color }} />
              <span style={{ fontSize: 12, color: C.fg }}>{o.label}</span>
              {o.value === value && <span className="ml-auto" style={{ color: C.primary }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function EditableValue({ value, onSave }: { value?: number; onSave: (v: number | undefined) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value != null ? String(value / 100) : "");
  if (editing) {
    return (
      <span className="inline-flex items-center gap-1">
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="w-20 rounded px-1.5 py-0.5 text-right outline-none"
          style={{ border: `1px solid ${C.primary}`, fontSize: 12 }}
        />
        <button type="button" onClick={() => { onSave(draft ? Math.round(parseFloat(draft.replace(",", ".")) * 100) : undefined); setEditing(false); }} style={{ fontSize: 11, color: C.primary, fontWeight: 600 }}>OK</button>
      </span>
    );
  }
  return (
    <button type="button" onClick={() => setEditing(true)} style={{ fontSize: 13, fontWeight: 600, color: C.fg }} className="rounded px-1 hover:bg-[#F3F3F2]">
      {formatCurrency(value)}
    </button>
  );
}

export function LeadModal({ id }: { id: string }) {
  const { state, dispatch } = usePreview();
  const { open, close } = useModal();
  const lead = state.leads.find((l) => l.id === id);
  const contact = useMemo(() => state.contacts.find((c) => c.name === lead?.contactName), [state.contacts, lead?.contactName]);

  const [tab, setTab] = useState<"timeline" | "comentarios" | "tarefas">("timeline");
  const [comments, setComments] = useState<{ text: string; at: string }[]>([]);
  const [draft, setDraft] = useState("");
  const [tasks, setTasks] = useState([
    { id: "mt1", text: "Enviar proposta por WhatsApp", done: false },
    { id: "mt2", text: "Confirmar disponibilidade de agenda", done: true },
  ]);

  if (!lead) return null;

  const currentIndex = state.stages.findIndex((s) => s.id === lead.stageId);
  const positive = state.stages.slice(0, 4);
  const negative = state.stages[4];

  const timeline = [
    { icon: "✦", text: "Card criado no pipeline", at: `há ${lead.daysSinceUpdate + 3}d` },
    { icon: "→", text: `Movido para ${state.stages[currentIndex]?.name ?? ""}`, at: `há ${lead.daysSinceUpdate}d` },
    { icon: "☎", text: `${lead.assignedTo ?? "Equipe"} registrou um contato`, at: `há ${Math.max(lead.daysSinceUpdate - 1, 0)}d` },
  ];

  return (
    <ModalShell onClose={close} width="900px" height="600px">
      {/* Header */}
      <div className="flex items-start justify-between border-b px-5 py-4" style={{ borderColor: C.border }}>
        <div className="flex items-center gap-3">
          <Avatar name={lead.contactName} size={38} />
          <div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => contact && open({ kind: "contact", name: contact.name })} style={{ fontSize: 16, fontWeight: 600, color: C.fg }} className="hover:underline">
                {lead.contactName}
              </button>
              <span style={{ fontSize: 11, color: C.faint }}>#{lead.seqId}</span>
              {lead.status === "won" && <span className="rounded-full px-2 py-0.5 font-medium" style={{ fontSize: 10, background: "#DCFCE7", color: "#15803D" }}>Ganho</span>}
              {lead.status === "lost" && <span className="rounded-full px-2 py-0.5 font-medium" style={{ fontSize: 10, background: "#FEE2E2", color: "#B91C1C" }}>Perdido</span>}
            </div>
            <p style={{ fontSize: 12, color: C.mutedFg }}>{lead.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {lead.status === "open" && (
            <>
              <button type="button" onClick={() => dispatch({ type: "SET_LEAD_STATUS", leadId: lead.id, status: "won" })} className="rounded-lg px-3 py-1.5 font-medium" style={{ fontSize: 12, border: "1px solid #86EFAC", color: "#15803D" }}>Ganhou</button>
              <button type="button" onClick={() => dispatch({ type: "SET_LEAD_STATUS", leadId: lead.id, status: "lost" })} className="rounded-lg px-3 py-1.5 font-medium" style={{ fontSize: 12, border: "1px solid #FCA5A5", color: "#B91C1C" }}>Perdeu</button>
            </>
          )}
          <CloseButton onClose={close} />
        </div>
      </div>

      {/* Stage buttons */}
      <div className="border-b px-5 py-3" style={{ borderColor: C.border }}>
        <div className="flex gap-1">
          {positive.map((stage, i) => {
            const active = stage.id === lead.stageId;
            const passed = i < currentIndex;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => dispatch({ type: "MOVE_LEAD", leadId: lead.id, stageId: stage.id })}
                className="flex h-8 flex-1 items-center justify-center gap-1 rounded-md px-2 transition-colors"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  background: active ? C.primary : passed ? `${C.primary}26` : C.muted,
                  color: active ? "#fff" : passed ? C.primary : C.mutedFg,
                }}
              >
                {passed && <span>✓</span>}
                {stage.name}
              </button>
            );
          })}
        </div>
        {negative && (
          <button
            type="button"
            onClick={() => dispatch({ type: "MOVE_LEAD", leadId: lead.id, stageId: negative.id })}
            className="mt-1.5 rounded-md px-2.5 py-1"
            style={{ fontSize: 10, background: lead.stageId === negative.id ? "#FEE2E2" : C.muted, color: lead.stageId === negative.id ? "#B91C1C" : C.mutedFg }}
          >
            {negative.name}
          </button>
        )}
      </div>

      {/* Body: sidebar + panel */}
      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <div className="w-[290px] shrink-0 overflow-y-auto border-r p-5" style={{ borderColor: C.border }}>
          <p className="mb-1 uppercase" style={{ fontSize: 11, fontWeight: 600, color: C.mutedFg, letterSpacing: "0.04em" }}>Detalhes do card</p>
          <div className="divide-y" style={{ borderColor: C.border }}>
            <Row label="Valor (R$)"><EditableValue value={lead.value} onSave={(v) => dispatch({ type: "UPDATE_LEAD", leadId: lead.id, patch: { value: v } })} /></Row>
            <Row label="Temperatura">
              <BadgeSelect<Temperature>
                value={lead.temperature ?? "morno"}
                options={(["quente", "morno", "frio"] as Temperature[]).map((t) => ({ value: t, label: TEMP_LABEL[t], color: TEMP_COLOR[t] }))}
                onChange={(t) => dispatch({ type: "UPDATE_LEAD", leadId: lead.id, patch: { temperature: t } })}
              />
            </Row>
            <Row label="Prioridade">
              <BadgeSelect<Priority>
                value={lead.priority}
                options={(["high", "medium", "low"] as Priority[]).map((p) => ({ value: p, label: PRIORITY[p].label, color: PRIORITY[p].color }))}
                onChange={(p) => dispatch({ type: "UPDATE_LEAD", leadId: lead.id, patch: { priority: p } })}
              />
            </Row>
            <Row label="Serviço"><span style={{ fontSize: 13, color: C.fg }}>{lead.service ?? "-"}</span></Row>
            <Row label="Responsável">
              <span className="inline-flex items-center gap-1.5">
                {lead.assignedTo && <Avatar name={lead.assignedTo} size={18} />}
                <span style={{ fontSize: 13, color: C.fg }}>{lead.assignedTo ?? "-"}</span>
              </span>
            </Row>
            <Row label="Telefone"><span style={{ fontSize: 12, color: "#57534E", fontFamily: "ui-monospace, monospace" }}>{lead.contactPhone ?? "-"}</span></Row>
            <Row label="Origem"><span style={{ fontSize: 13, color: C.fg }}>{contact?.source ?? "-"}</span></Row>
            <Row label="Última atividade"><span style={{ fontSize: 13, color: C.mutedFg }}>há {lead.daysSinceUpdate}d</span></Row>
          </div>

          <p className="mb-2 mt-5 uppercase" style={{ fontSize: 11, fontWeight: 600, color: C.mutedFg, letterSpacing: "0.04em" }}>Tempo por etapa</p>
          <div className="space-y-1.5">
            {positive.slice(0, Math.max(currentIndex + 1, 1)).map((s, i) => (
              <div key={s.id} className="flex items-center justify-between">
                <span className="flex items-center gap-2" style={{ fontSize: 12, color: "#57534E" }}>
                  <span className="inline-block size-2 rounded-full" style={{ background: C.primary }} />
                  {s.name}{s.id === lead.stageId && <span style={{ color: C.primary }}> (atual)</span>}
                </span>
                <span style={{ fontSize: 11, color: C.faint, fontFamily: "ui-monospace, monospace" }}>{[3, 2, 4, 1][i] ?? 1}d</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex gap-4 border-b px-5 pt-2" style={{ borderColor: C.border }}>
            {(["timeline", "comentarios", "tarefas"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className="pb-2 capitalize"
                style={{ fontSize: 13, fontWeight: 500, color: tab === t ? C.fg : C.mutedFg, borderBottom: `2px solid ${tab === t ? C.primary : "transparent"}` }}
              >
                {t === "comentarios" ? "Comentários" : t}
              </button>
            ))}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            {tab === "timeline" && (
              <div className="space-y-4">
                {timeline.map((e, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full" style={{ background: "#F5F0F3", color: C.primary, fontSize: 12 }}>{e.icon}</div>
                    <div>
                      <p style={{ fontSize: 13, color: C.fg }}>{e.text}</p>
                      <p style={{ fontSize: 11, color: C.faint }}>{e.at}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "comentarios" && (
              <div className="space-y-3">
                {comments.length === 0 && <p style={{ fontSize: 12, color: C.faint }}>Nenhum comentário ainda. Escreva o primeiro abaixo.</p>}
                {comments.map((c, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full" style={{ background: "#FEF3C7", color: "#B45309", fontSize: 11 }}>M</div>
                    <div>
                      <p style={{ fontSize: 13, color: C.fg }}>{c.text}</p>
                      <p style={{ fontSize: 11, color: C.faint }}>Marina · {c.at}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "tarefas" && (
              <div className="space-y-2">
                {tasks.map((t) => (
                  <label key={t.id} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2" style={{ border: `1px solid ${C.border}` }}>
                    <input type="checkbox" checked={t.done} onChange={() => setTasks((cur) => cur.map((x) => x.id === t.id ? { ...x, done: !x.done } : x))} style={{ accentColor: C.primary }} />
                    <span style={{ fontSize: 13, color: C.fg, textDecoration: t.done ? "line-through" : "none", opacity: t.done ? 0.55 : 1 }}>{t.text}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {tab === "comentarios" && (
            <div className="flex gap-2 border-t p-3" style={{ borderColor: C.border }}>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && draft.trim()) { setComments((c) => [...c, { text: draft.trim(), at: "agora" }]); setDraft(""); } }}
                placeholder="Escrever comentário… (@nome para mencionar)"
                className="flex-1 rounded-lg px-3 py-2 outline-none"
                style={{ border: `1px solid ${C.border}`, fontSize: 13 }}
              />
              <button type="button" onClick={() => { if (draft.trim()) { setComments((c) => [...c, { text: draft.trim(), at: "agora" }]); setDraft(""); } }} className="rounded-lg px-3 font-medium text-white" style={{ fontSize: 13, background: C.primary }}>Enviar</button>
            </div>
          )}
        </div>
      </div>
    </ModalShell>
  );
}
