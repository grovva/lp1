"use client";

import { useState } from "react";
import { CloseButton, ModalShell, useModal } from "../modal";
import { usePreview } from "../store";
import type { TxnType } from "../types";
import { C } from "../ui";

export function TransactionModal() {
  const { dispatch } = usePreview();
  const { close } = useModal();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TxnType>("income");

  function submit() {
    const cents = Math.round(parseFloat(amount.replace(",", ".")) * 100);
    if (!description.trim() || !cents) return;
    dispatch({ type: "ADD_TRANSACTION", txn: { description: description.trim(), amount: cents, type, account: "Conta PJ", date: new Date().toISOString().slice(0, 10), category: type === "income" ? "Procedimentos" : "Geral" } });
    close();
  }
  const inp = { border: `1px solid ${C.border}`, fontSize: 13, color: C.fg, height: 36 } as const;

  return (
    <ModalShell onClose={close} width="420px" height="auto">
      <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: C.border }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: C.fg }}>Nova Transação</h2>
        <CloseButton onClose={close} />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex gap-2">
          {(["income", "expense"] as const).map((t) => (
            <button key={t} type="button" onClick={() => setType(t)} className="flex-1 rounded-md py-2" style={t === type ? { background: t === "income" ? "#DCFCE7" : "#FEE2E2", color: t === "income" ? "#15803D" : "#B91C1C", fontSize: 13, fontWeight: 600 } : { border: `1px solid ${C.border}`, color: C.mutedFg, fontSize: 13 }}>
              {t === "income" ? "Receita" : "Despesa"}
            </button>
          ))}
        </div>
        <input autoFocus value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" className="w-full rounded-md px-3 outline-none" style={inp} />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Valor (R$)" inputMode="decimal" className="w-full rounded-md px-3 outline-none" style={inp} />
      </div>
      <div className="flex justify-end gap-2 border-t px-5 py-3" style={{ borderColor: C.border }}>
        <button type="button" onClick={close} className="rounded-lg px-4 py-2" style={{ fontSize: 13, color: C.mutedFg }}>Cancelar</button>
        <button type="button" onClick={submit} className="rounded-lg px-4 py-2 font-medium text-white" style={{ fontSize: 13, background: C.primary }}>Salvar</button>
      </div>
    </ModalShell>
  );
}
