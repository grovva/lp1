"use client";

import { useState } from "react";
import { CloseButton, ModalShell, useModal } from "../modal";
import { usePreview } from "../store";
import { Avatar, C } from "../ui";

const SERVICES = [
  { name: "Avaliação", dur: "30 min", price: "Grátis" },
  { name: "Harmonização Facial", dur: "60 min", price: "R$ 1.800" },
  { name: "Botox", dur: "45 min", price: "R$ 900" },
  { name: "Limpeza de Pele", dur: "60 min", price: "R$ 250" },
  { name: "Peeling", dur: "45 min", price: "R$ 450" },
  { name: "Bioestimulador", dur: "60 min", price: "R$ 1.800" },
  { name: "Preenchimento Labial", dur: "45 min", price: "R$ 1.200" },
];
const TIMES = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export function AppointmentModal({ date, time }: { date?: string; time?: string }) {
  const { state, dispatch } = usePreview();
  const { close } = useModal();
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState("");
  const [contactName, setContactName] = useState("");
  const [service, setService] = useState("");
  const [day, setDay] = useState(date ?? new Date().toISOString().slice(0, 10));
  const [slot, setSlot] = useState(time ?? "");

  const STEPS = ["Contato", "Serviço", "Data & Hora", "Confirmar"];
  const results = state.contacts.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.phone.includes(query));

  function confirm() {
    dispatch({ type: "ADD_APPOINTMENT", appt: { contactName, service: service || "Avaliação", date: day, time: slot || "09:00", status: "pending" } });
    close();
  }

  const canNext = [contactName, service, slot, true][step];
  const inp = { border: `1px solid ${C.border}`, fontSize: 13, color: C.fg } as const;

  return (
    <ModalShell onClose={close} width="500px">
      <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: C.border }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: C.fg }}>{step + 1}. {STEPS[step]}</p>
        <CloseButton onClose={close} />
      </div>

      {/* Progress */}
      <div className="flex gap-1 px-5 pt-4">
        {STEPS.map((_, i) => (
          <div key={i} className="h-1 flex-1 rounded-full" style={{ background: i <= step ? C.primary : C.muted }} />
        ))}
      </div>

      <div className="min-h-[260px] p-5">
        {step === 0 && (
          <div>
            {contactName ? (
              <div className="flex items-center justify-between rounded-lg p-3" style={{ border: `1px solid ${C.border}` }}>
                <div className="flex items-center gap-2.5">
                  <Avatar name={contactName} size={32} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>{contactName}</span>
                </div>
                <button type="button" onClick={() => setContactName("")} style={{ fontSize: 12, color: C.primary }}>Trocar</button>
              </div>
            ) : (
              <>
                <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar contato por nome ou telefone..." className="mb-2 w-full rounded-lg px-3 py-2 outline-none" style={inp} />
                <div className="max-h-[180px] space-y-1 overflow-y-auto">
                  {results.map((c) => (
                    <button key={c.id} type="button" onClick={() => setContactName(c.name)} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left hover:bg-[#F3F3F2]">
                      <Avatar name={c.name} size={28} />
                      <div>
                        <p style={{ fontSize: 13, color: C.fg }}>{c.name}</p>
                        <p style={{ fontSize: 11, color: C.mutedFg, fontFamily: "ui-monospace, monospace" }}>{c.phone}</p>
                      </div>
                    </button>
                  ))}
                  {results.length === 0 && <p className="py-4 text-center" style={{ fontSize: 12, color: C.faint }}>Nenhum contato encontrado</p>}
                </div>
              </>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="grid max-h-[230px] grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2">
            {SERVICES.map((s) => (
              <button key={s.name} type="button" onClick={() => setService(s.name)} className="rounded-lg p-3 text-left transition-colors" style={{ border: `1px solid ${service === s.name ? C.primary : C.border}`, background: service === s.name ? "#FBEAF3" : "#fff" }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: C.fg }}>{s.name}</p>
                <p style={{ fontSize: 11, color: C.mutedFg }}>{s.dur} · {s.price}</p>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div>
            <label style={{ fontSize: 12, color: C.mutedFg }}>Data</label>
            <input type="date" value={day} onChange={(e) => setDay(e.target.value)} className="mb-3 mt-1 w-full rounded-lg px-3 py-2 outline-none" style={inp} />
            <label style={{ fontSize: 12, color: C.mutedFg }}>Horário</label>
            <div className="mt-1 grid grid-cols-4 gap-2">
              {TIMES.map((t) => (
                <button key={t} type="button" onClick={() => setSlot(t)} className="rounded-lg py-2" style={{ border: `1px solid ${slot === t ? C.primary : C.border}`, background: slot === t ? "#FBEAF3" : "#fff", fontSize: 13, color: C.fg, fontWeight: slot === t ? 600 : 400 }}>{t}</button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="rounded-lg p-3" style={{ border: `1px solid ${C.border}` }}>
              {[["Contato", contactName], ["Serviço", service || "Avaliação"], ["Data", new Date(day).toLocaleDateString("pt-BR")], ["Horário", slot || "09:00"]].map(([k, v], i, arr) => (
                <div key={k} className="flex items-center justify-between py-1.5" style={{ borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ fontSize: 12, color: C.mutedFg }}>{k}</span>
                  <span style={{ fontSize: 13, color: C.fg, fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg px-3 py-2.5" style={{ border: `1px solid ${C.border}`, background: "rgba(243,243,242,0.4)" }}>
              <p className="mb-1.5" style={{ fontSize: 12, color: C.fg, fontWeight: 500 }}>Lembretes por WhatsApp</p>
              {["48h antes", "24h antes", "4h antes"].map((r, i) => (
                <label key={r} className="flex items-center gap-2 py-0.5" style={{ fontSize: 12, color: "#57534E" }}>
                  <input type="checkbox" defaultChecked={i < 2} style={{ accentColor: C.primary }} /> {r}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t px-5 py-3" style={{ borderColor: C.border }}>
        <button type="button" onClick={() => (step === 0 ? close() : setStep((s) => s - 1))} className="rounded-lg px-4 py-2" style={{ fontSize: 13, color: C.mutedFg }}>
          {step === 0 ? "Cancelar" : "Voltar"}
        </button>
        {step < 3 ? (
          <button type="button" disabled={!canNext} onClick={() => setStep((s) => s + 1)} className="rounded-lg px-4 py-2 font-medium text-white" style={{ fontSize: 13, background: canNext ? C.primary : "#E7B8D2", cursor: canNext ? "pointer" : "not-allowed" }}>
            Próximo
          </button>
        ) : (
          <button type="button" onClick={confirm} className="rounded-lg px-4 py-2 font-medium text-white" style={{ fontSize: 13, background: C.primary }}>Confirmar Agendamento</button>
        )}
      </div>
    </ModalShell>
  );
}
