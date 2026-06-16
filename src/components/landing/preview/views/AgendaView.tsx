"use client";

import { useState } from "react";
import { useModal } from "../modal";
import { usePreview } from "../store";
import type { ApptStatus } from "../types";
import { Avatar, C, PlusIcon, PrimaryButton, StatusBadge } from "../ui";

const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const DAY_ABBR = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}
function startOfWeek(base: Date) {
  const d = new Date(base);
  d.setHours(0, 0, 0, 0);
  const dow = d.getDay();
  d.setDate(d.getDate() + (dow === 0 ? -6 : 1 - dow));
  return d;
}

export function AgendaView() {
  const { state } = usePreview();
  const { open } = useModal();
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [selectedDay, setSelectedDay] = useState(() => iso(new Date()));

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const dayAppts = state.appointments.filter((a) => a.date === selectedDay);
  const todayIso = iso(new Date());
  const todays = state.appointments.filter((a) => a.date === todayIso);
  const confirmed = todays.filter((a) => a.status === "confirmed").length;
  const byBot = todays.filter((a) => a.bot).length;

  const stats = [
    { label: "Agendamentos hoje", value: todays.length, color: C.fg },
    { label: "Confirmados", value: confirmed, color: "#15803D" },
    { label: "Agendados pelo Bot", value: byBot, color: C.primary },
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto" style={{ background: C.bg }}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6">
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: C.fg }}>Agenda</h1>
          <p style={{ fontSize: 13, color: C.mutedFg }}>Agendamentos e avaliações</p>
        </div>
        <PrimaryButton onClick={() => open({ kind: "appointment", date: selectedDay })}>
          <PlusIcon /> Novo Agendamento
        </PrimaryButton>
      </div>

      {/* Controles: período · layout · profissional */}
      <div className="flex flex-wrap items-center gap-2 px-6 pt-4">
        <div className="flex rounded-lg p-0.5" style={{ background: C.muted }}>
          {["Dia", "Semana", "Mês"].map((p, i) => (
            <span key={p} className={i === 1 ? "rounded-md bg-white px-2.5 py-1 font-medium shadow-sm" : "px-2.5 py-1"} style={{ fontSize: 12, color: i === 1 ? C.fg : C.mutedFg }}>{p}</span>
          ))}
        </div>
        <div className="flex rounded-lg p-0.5" style={{ background: C.muted }}>
          {["Timeline", "Lista"].map((p, i) => (
            <span key={p} className={i === 0 ? "rounded-md bg-white px-2.5 py-1 font-medium shadow-sm" : "px-2.5 py-1"} style={{ fontSize: 12, color: i === 0 ? C.fg : C.mutedFg }}>{p}</span>
          ))}
        </div>
        <span className="inline-flex h-8 items-center gap-1.5 rounded-lg px-3" style={{ border: `1px solid ${C.border}`, fontSize: 12, color: C.mutedFg, background: "#fff" }}>
          Todos os profissionais
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.faint} strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 px-6 pt-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg bg-white p-4" style={{ border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 12, color: C.mutedFg }}>{s.label}</p>
            <p style={{ fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Week nav */}
      <div className="flex items-center gap-1.5 px-6 pt-5">
        <button type="button" onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() - 7); setWeekStart(d); }} className="rounded-md px-2 py-1.5" style={{ border: `1px solid ${C.border}`, color: C.mutedFg }}>←</button>
        {days.map((d) => {
          const di = iso(d);
          const active = di === selectedDay;
          return (
            <button
              key={di}
              type="button"
              onClick={() => setSelectedDay(di)}
              className="flex flex-1 flex-col items-center rounded-md py-1.5"
              style={active ? { background: C.primary, color: "#fff" } : { color: C.mutedFg }}
            >
              <span style={{ fontSize: 10 }}>{DAY_ABBR[d.getDay()]}</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{d.getDate()}</span>
            </button>
          );
        })}
        <button type="button" onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() + 7); setWeekStart(d); }} className="rounded-md px-2 py-1.5" style={{ border: `1px solid ${C.border}`, color: C.mutedFg }}>→</button>
      </div>

      {/* Timeline */}
      <div className="m-6 rounded-xl bg-white" style={{ border: `1px solid ${C.border}` }}>
        {HOURS.map((hour) => {
          const slot = dayAppts.filter((a) => a.time.startsWith(hour.slice(0, 2)));
          return (
            <div key={hour} className="flex min-h-[60px] gap-3 border-b px-4 py-2 last:border-0" style={{ borderColor: C.border }}>
              <span className="w-10 shrink-0 pt-1" style={{ fontSize: 11, color: C.faint }}>{hour}</span>
              <div className="flex flex-1 flex-col gap-2">
                {slot.map((a) => (
                  <div key={a.id} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "#FBEAF3", border: `1px solid ${C.primary}33` }}>
                    <Avatar name={a.contactName} size={26} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>{a.contactName}</span>
                        {a.bot && <span className="rounded px-1.5 py-0.5" style={{ fontSize: 9, background: "#DCFCE7", color: "#15803D" }}>bot</span>}
                      </div>
                      <p style={{ fontSize: 11, color: C.mutedFg }}>
                        <span style={{ fontFamily: "ui-monospace, monospace", color: C.primary }}>{a.time}</span> · {a.service}
                      </p>
                    </div>
                    <StatusBadge status={a.status as ApptStatus} />
                  </div>
                ))}
                {slot.length === 0 && (
                  <button type="button" onClick={() => open({ kind: "appointment", date: selectedDay, time: hour })} className="flex items-center gap-1.5 rounded-md py-1.5 text-left opacity-0 transition-opacity hover:opacity-100" style={{ fontSize: 11, color: C.primary }}>
                    <PlusIcon size={12} /> horário livre
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
