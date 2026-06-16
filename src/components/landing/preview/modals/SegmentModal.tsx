"use client";

import { useMemo, useState } from "react";
import { CloseButton, ModalShell, useModal } from "../modal";
import { usePreview } from "../store";
import { CONTACT_FIELDS, LEAD_FIELDS, matchCount, OPERATORS } from "../segmentMatch";
import type { Condition } from "../types";
import { C, PlusIcon } from "../ui";

export function SegmentModal() {
  const { state, dispatch } = usePreview();
  const { close } = useModal();
  const [name, setName] = useState("");
  const [type, setType] = useState<"contacts" | "leads">("contacts");
  const [conditions, setConditions] = useState<Condition[]>([{ id: "n1", field: "tag", operator: "eq", value: "" }]);

  const fields = type === "contacts" ? CONTACT_FIELDS : LEAD_FIELDS;
  const liveCount = useMemo(() => matchCount(state, type, conditions), [state, type, conditions]);

  function update(id: string, patch: Partial<Condition>) {
    setConditions((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }
  const sel = { border: `1px solid ${C.border}`, fontSize: 12, color: C.fg, height: 32 } as const;

  return (
    <ModalShell onClose={close} width="600px" height="auto">
      <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: C.border }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: C.fg }}>Novo Segmento</h2>
        <CloseButton onClose={close} />
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
        <div>
          <label className="mb-1 block" style={{ fontSize: 12, color: C.mutedFg }}>Nome</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Leads quentes do mês" className="w-full rounded-md px-3 outline-none" style={{ ...sel, height: 36 }} />
        </div>

        <div>
          <label className="mb-1 block" style={{ fontSize: 12, color: C.mutedFg }}>Tipo</label>
          <div className="flex gap-2">
            {(["contacts", "leads"] as const).map((t) => (
              <button key={t} type="button" onClick={() => { setType(t); setConditions([{ id: "n1", field: t === "contacts" ? "tag" : "temperature", operator: "eq", value: "" }]); }} className="flex-1 rounded-lg py-2 font-medium" style={t === type ? { background: `${C.primary}1A`, border: `1px solid ${C.primary}`, color: C.primary, fontSize: 13 } : { background: "#fff", border: `1px solid ${C.border}`, color: C.mutedFg, fontSize: 13 }}>
                {t === "contacts" ? "Contatos" : "Leads"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block" style={{ fontSize: 12, color: C.mutedFg }}>Critérios</label>
          <div className="space-y-2">
            {conditions.map((cond) => {
              const fieldDef = fields.find((f) => f.key === cond.field);
              return (
                <div key={cond.id} className="flex items-center gap-2 rounded-lg p-2" style={{ background: "rgba(243,243,242,0.7)" }}>
                  <select value={cond.field} onChange={(e) => update(cond.id, { field: e.target.value, value: "" })} className="rounded-md px-2 outline-none" style={sel}>
                    {fields.map((f) => <option key={f.key} value={f.key}>{f.label}</option>)}
                  </select>
                  <select value={cond.operator} onChange={(e) => update(cond.id, { operator: e.target.value })} className="rounded-md px-2 outline-none" style={sel}>
                    {OPERATORS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
                  </select>
                  {fieldDef?.type === "select" ? (
                    <select value={cond.value} onChange={(e) => update(cond.id, { value: e.target.value })} className="flex-1 rounded-md px-2 outline-none" style={sel}>
                      <option value="">-</option>
                      {fieldDef.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input value={cond.value} onChange={(e) => update(cond.id, { value: e.target.value })} placeholder="valor" className="flex-1 rounded-md px-2 outline-none" style={sel} />
                  )}
                  <button type="button" onClick={() => setConditions((cs) => cs.filter((c) => c.id !== cond.id))} style={{ color: C.faint }}>✕</button>
                </div>
              );
            })}
          </div>
          <button type="button" onClick={() => setConditions((cs) => [...cs, { id: `n${cs.length + 1}-${cs.length}`, field: fields[0].key, operator: "eq", value: "" }])} className="mt-2 flex items-center gap-1.5" style={{ fontSize: 12, color: C.primary }}>
            <PlusIcon size={12} /> Adicionar condição
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between border-t px-5 py-3" style={{ borderColor: C.border }}>
        <p style={{ fontSize: 13, color: C.mutedFg }}>
          <strong style={{ color: C.primary, fontSize: 15 }}>{liveCount}</strong> {type === "contacts" ? "contatos" : "leads"} correspondem
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={close} className="rounded-lg px-4 py-2" style={{ fontSize: 13, color: C.mutedFg }}>Cancelar</button>
          <button type="button" disabled={!name.trim()} onClick={() => { dispatch({ type: "ADD_SEGMENT", segment: { name: name.trim(), description: `Segmento de ${type === "contacts" ? "contatos" : "leads"}`, type, conditions } }); close(); }} className="rounded-lg px-4 py-2 font-medium text-white" style={{ fontSize: 13, background: name.trim() ? C.primary : "#E7B8D2" }}>
            Salvar segmento
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
