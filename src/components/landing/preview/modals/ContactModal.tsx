"use client";

import { useState } from "react";
import { CloseButton, ModalShell, useModal } from "../modal";
import { usePreview } from "../store";
import { Avatar, C, formatCurrency, TagPill } from "../ui";

function InfoRow({ label, children, border = true }: { label: string; children: React.ReactNode; border?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5" style={{ borderBottom: border ? `1px solid ${C.border}` : "none" }}>
      <span style={{ fontSize: 12, color: C.mutedFg }}>{label}</span>
      <div className="text-right">{children}</div>
    </div>
  );
}

export function ContactModal({ name }: { name: string }) {
  const { state } = usePreview();
  const { open, close } = useModal();
  const contact = state.contacts.find((c) => c.name === name);
  const cards = state.leads.filter((l) => l.contactName === name);
  const [tab, setTab] = useState<"info" | "cards">("info");

  if (!contact) return null;

  const stageName = (id: string) => state.stages.find((s) => s.id === id)?.name ?? "";

  return (
    <ModalShell onClose={close} width="500px" height="560px">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: C.border }}>
        <div className="flex items-center gap-3">
          <Avatar name={contact.name} size={40} />
          <div>
            <p style={{ fontSize: 16, fontWeight: 600, color: C.fg }}>{contact.name}</p>
            <p style={{ fontSize: 12, color: C.mutedFg, fontFamily: "ui-monospace, monospace" }}>{contact.phone}</p>
          </div>
        </div>
        <CloseButton onClose={close} />
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b px-5 pt-1" style={{ borderColor: C.border }}>
        {([["info", "Informações"], ["cards", `Cards (${cards.length})`]] as const).map(([k, label]) => (
          <button key={k} type="button" onClick={() => setTab(k)} className="pb-2" style={{ fontSize: 13, fontWeight: 500, color: tab === k ? C.fg : C.mutedFg, borderBottom: `2px solid ${tab === k ? C.primary : "transparent"}` }}>
            {label}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-5">
        {tab === "info" ? (
          <div>
            <InfoRow label="Nome"><span style={{ fontSize: 13, fontWeight: 500, color: C.fg }}>{contact.name}</span></InfoRow>
            <InfoRow label="Telefone"><span style={{ fontSize: 13, color: "#57534E", fontFamily: "ui-monospace, monospace" }}>{contact.phone}</span></InfoRow>
            <InfoRow label="Email"><span style={{ fontSize: 13, color: "#57534E" }}>{contact.email ?? "-"}</span></InfoRow>
            <InfoRow label="Origem"><span style={{ fontSize: 13, color: C.fg }}>{contact.source}</span></InfoRow>
            <InfoRow label="Criado em"><span style={{ fontSize: 13, color: C.mutedFg }}>{new Date(contact.createdAt).toLocaleDateString("pt-BR")}</span></InfoRow>
            <InfoRow label="Total de cards"><span style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>{cards.length}</span></InfoRow>
            <div className="pt-3">
              <p className="mb-2" style={{ fontSize: 12, color: C.mutedFg }}>Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {contact.tags.map((t) => <TagPill key={t} tag={t} />)}
                {contact.tags.length === 0 && <span style={{ fontSize: 12, color: C.faint }}>Sem tags</span>}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {cards.length === 0 && <p style={{ fontSize: 12, color: C.faint }}>Este contato não possui cards.</p>}
            {cards.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => open({ kind: "lead", id: l.id })}
                className="w-full rounded-lg p-3 text-left transition-colors hover:bg-[#F3F3F2]"
                style={{ background: "rgba(243,243,242,0.5)" }}
              >
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>{l.title}</span>
                  <span className="rounded-full px-2 py-0.5" style={{ fontSize: 10, background: "#fff", color: C.primary, fontWeight: 600, border: `1px solid ${C.border}` }}>{stageName(l.stageId)}</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span style={{ fontSize: 11, color: C.mutedFg }}>Pipeline Comercial</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.fg }}>{formatCurrency(l.value)}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </ModalShell>
  );
}
