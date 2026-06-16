"use client";

import { useState } from "react";
import { useModal } from "../modal";
import { usePreview } from "../store";
import type { Lead, Temperature } from "../types";
import {
  C,
  formatCurrency,
  initials,
  PlusIcon,
  PrimaryButton,
} from "../ui";

const SERVICES = [
  "Avaliação",
  "Harmonização Facial",
  "Botox",
  "Limpeza de Pele",
  "Peeling",
  "Bioestimulador",
  "Preenchimento Labial",
];

function KanbanCard({
  lead,
  onDragStart,
  onClick,
}: {
  lead: Lead;
  onDragStart: () => void;
  onClick: () => void;
}) {
  const [selected, setSelected] = useState(false);
  const rotting = lead.status === "open" && lead.daysSinceUpdate >= 7;
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="cursor-grab rounded-md bg-white p-3 transition-all hover:shadow-sm active:cursor-grabbing"
      style={{ boxShadow: selected ? `0 0 0 2px ${C.primary}66` : rotting ? "0 0 0 1px #FCA5A5" : "none" }}
    >
      {/* Topo: #seq + rotting (esquerda) · checkbox (direita) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 11, color: C.faint }}>#{lead.seqId}</span>
          {rotting && (
            <span className="rounded-full px-1.5 py-0.5 font-medium" style={{ fontSize: 10, background: "#FEE2E2", color: "#B91C1C" }}>
              🕐 {lead.daysSinceUpdate}d
            </span>
          )}
        </div>
        <input
          type="checkbox"
          checked={selected}
          onClick={(e) => e.stopPropagation()}
          onChange={() => setSelected((s) => !s)}
          className="size-3.5 cursor-pointer rounded"
          style={{ accentColor: C.primary }}
        />
      </div>

      {/* Título */}
      <p className="mt-1 leading-snug" style={{ fontSize: 15, fontWeight: 600, color: C.fg }}>{lead.title}</p>

      {/* Corpo */}
      <div className="mt-2 space-y-1">
        <div className="flex items-center gap-2">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full" style={{ background: "#EEEEEC", color: "#78716C", fontSize: 10, fontWeight: 600 }}>{initials(lead.contactName)}</div>
          <span className="truncate" style={{ fontSize: 13, color: "#57534E" }}>{lead.contactName}</span>
        </div>
        {lead.value != null && (
          <div><span style={{ fontSize: 14, fontWeight: 600, color: C.fg }}>{formatCurrency(lead.value)}</span></div>
        )}
        {lead.contactPhone && (
          <div><span style={{ fontSize: 12, color: C.faint, fontFamily: "ui-monospace, monospace" }}>{lead.contactPhone}</span></div>
        )}
      </div>

      {/* Responsável */}
      {lead.assignedTo && (
        <div className="mt-2 flex justify-end">
          <div className="flex size-6 items-center justify-center rounded-full" style={{ background: "rgba(212,69,140,0.10)", color: C.primary, fontSize: 10, fontWeight: 600 }} title={lead.assignedTo}>{initials(lead.assignedTo)}</div>
        </div>
      )}
    </div>
  );
}

function AddLeadForm({ stageId, onClose }: { stageId: string; onClose: () => void }) {
  const { dispatch } = usePreview();
  const [title, setTitle] = useState("");
  const [contactName, setContactName] = useState("");
  const [value, setValue] = useState("");
  const [temperature, setTemperature] = useState<Temperature>("quente");

  function submit() {
    if (!title.trim() || !contactName.trim()) return;
    dispatch({
      type: "ADD_LEAD",
      lead: {
        title: title.trim(),
        contactName: contactName.trim(),
        value: value ? Math.round(parseFloat(value.replace(",", ".")) * 100) : undefined,
        temperature,
        priority: "medium",
        status: "open",
        stageId,
        service: title.trim(),
        assignedTo: "Marina",
      },
    });
    onClose();
  }

  const inputStyle = {
    border: `1px solid ${C.border}`,
    fontSize: 12,
    color: C.fg,
  } as const;

  return (
    <div className="rounded-md bg-white p-3" style={{ border: `1px solid ${C.primary}` }}>
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Serviço / título"
        list="preview-services"
        className="mb-2 w-full rounded px-2 py-1.5 outline-none"
        style={inputStyle}
      />
      <datalist id="preview-services">
        {SERVICES.map((s) => <option key={s} value={s} />)}
      </datalist>
      <input
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
        placeholder="Nome do paciente"
        className="mb-2 w-full rounded px-2 py-1.5 outline-none"
        style={inputStyle}
      />
      <div className="mb-2 flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Valor (R$)"
          inputMode="decimal"
          className="w-1/2 rounded px-2 py-1.5 outline-none"
          style={inputStyle}
        />
        <select
          value={temperature}
          onChange={(e) => setTemperature(e.target.value as Temperature)}
          className="w-1/2 rounded px-2 py-1.5 outline-none"
          style={inputStyle}
        >
          <option value="quente">Quente</option>
          <option value="morno">Morno</option>
          <option value="frio">Frio</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={submit}
          className="rounded px-3 py-1.5 font-medium text-white"
          style={{ fontSize: 12, background: C.primary }}
        >
          Adicionar
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded px-2 py-1.5"
          style={{ fontSize: 12, color: C.mutedFg }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export function PipelineView() {
  const { state, dispatch } = usePreview();
  const { open } = useModal();
  const [dragId, setDragId] = useState<string | null>(null);
  const [overStage, setOverStage] = useState<string | null>(null);
  const [addingStage, setAddingStage] = useState<string | null>(null);

  const totalLeads = state.leads.length;
  const totalValue = state.leads.reduce((acc, l) => acc + (l.value ?? 0), 0);

  function drop(stageId: string) {
    if (dragId) dispatch({ type: "MOVE_LEAD", leadId: dragId, stageId });
    setDragId(null);
    setOverStage(null);
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3.5" style={{ borderColor: C.border, background: "#fff" }}>
        <div className="flex items-center gap-2">
          <h1 style={{ fontSize: 18, fontWeight: 600, color: C.fg, letterSpacing: "-0.01em" }}>Pipeline Comercial</h1>
          <span style={{ fontSize: 12, color: C.mutedFg }}>· {totalLeads} leads · {formatCurrency(totalValue)}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg p-0.5" style={{ background: C.muted }}>
            <span className="rounded-md bg-white px-2.5 py-1 font-medium shadow-sm" style={{ fontSize: 12, color: C.fg }}>Kanban</span>
            <span className="px-2.5 py-1" style={{ fontSize: 12, color: C.mutedFg }}>Tabela</span>
          </div>
          <PrimaryButton onClick={() => setAddingStage("s1")}>
            <PlusIcon /> Novo Lead
          </PrimaryButton>
        </div>
      </div>

      {/* Board */}
      <div className="flex flex-1 gap-3 overflow-x-auto p-4" style={{ background: C.board }}>
        {state.stages.map((stage) => {
          const leads = state.leads.filter((l) => l.stageId === stage.id);
          const sum = leads.reduce((acc, l) => acc + (l.value ?? 0), 0);
          const isOver = overStage === stage.id;
          return (
            <div
              key={stage.id}
              onDragOver={(e) => { e.preventDefault(); setOverStage(stage.id); }}
              onDragLeave={() => setOverStage((s) => (s === stage.id ? null : s))}
              onDrop={() => drop(stage.id)}
              className="flex w-[264px] shrink-0 flex-col"
            >
              {/* Cabeçalho colorido */}
              <div className="flex items-center justify-between rounded-t-md px-3 py-1.5" style={{ background: stage.color }}>
                <div className="flex min-w-0 items-center gap-1.5">
                  <span className="truncate" style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{stage.name}</span>
                  <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1.5" style={{ background: "rgba(255,255,255,0.25)", color: "#fff", fontSize: 10, fontWeight: 700 }}>{leads.length}</span>
                </div>
                <button type="button" onClick={() => setAddingStage(stage.id)} className="flex size-5 items-center justify-center rounded text-white" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <PlusIcon size={13} />
                </button>
              </div>

              {/* Corpo tingido */}
              <div
                className="flex flex-1 flex-col rounded-b-md transition-all"
                style={{ background: `${stage.color}14`, outline: isOver ? `2px dashed ${stage.color}` : "none", outlineOffset: -2 }}
              >
                {sum > 0 && (
                  <p className="px-3 pb-1.5 pt-2.5 text-center tabular-nums" style={{ fontSize: 18, fontWeight: 300, color: stage.color, letterSpacing: "-0.01em" }}>
                    {formatCurrency(sum)}
                  </p>
                )}
                <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-2 pb-3" style={{ paddingTop: sum > 0 ? 0 : 8 }}>
                  {addingStage === stage.id && (
                    <AddLeadForm stageId={stage.id} onClose={() => setAddingStage(null)} />
                  )}
                  {leads.map((lead) => (
                    <KanbanCard key={lead.id} lead={lead} onDragStart={() => setDragId(lead.id)} onClick={() => open({ kind: "lead", id: lead.id })} />
                  ))}
                  {leads.length === 0 && addingStage !== stage.id && (
                    <p className="px-1.5 py-6 text-center" style={{ fontSize: 11, color: C.faint }}>
                      Arraste um card aqui
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
