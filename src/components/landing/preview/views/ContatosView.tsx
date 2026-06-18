"use client";

import { useMemo, useState } from "react";
import { useModal } from "../modal";
import { usePreview } from "../store";
import { Avatar, C, TagPill } from "../ui";

type SortKey = "name" | "createdAt";

export function ContatosView() {
  const { state } = usePreview();
  const { open } = useModal();
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [asc, setAsc] = useState(true);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [tagOpen, setTagOpen] = useState(false);

  const allTags = useMemo(
    () => Array.from(new Set(state.contacts.flatMap((c) => c.tags))).sort(),
    [state.contacts],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return state.contacts
      .filter((c) => {
        const matchesQuery = !q || c.name.toLowerCase().includes(q) || (c.email ?? "").toLowerCase().includes(q) || c.phone.includes(q);
        const matchesTags = activeTags.length === 0 || activeTags.every((t) => c.tags.includes(t));
        return matchesQuery && matchesTags;
      })
      .sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        return (av < bv ? -1 : av > bv ? 1 : 0) * (asc ? 1 : -1);
      });
  }, [state.contacts, query, activeTags, sortKey, asc]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) setAsc((a) => !a);
    else { setSortKey(key); setAsc(true); }
  }
  const arrow = (key: SortKey) => (sortKey === key ? (asc ? " ↑" : " ↓") : "");

  return (
    <div className="h-full overflow-y-auto" style={{ background: C.bg }}>
      <div className="px-6 pt-6">
        <h1 style={{ fontSize: 22, fontWeight: 700, color: C.fg }}>Pacientes</h1>
        <p style={{ fontSize: 13, color: C.mutedFg }}>{state.contacts.length} pacientes registrados</p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-wrap items-center gap-2 px-6 pt-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome, email ou telefone..."
          className="h-9 w-full max-w-sm rounded-lg px-3 outline-none"
          style={{ border: `1px solid ${C.border}`, fontSize: 13, color: C.fg, background: "#fff" }}
        />
        <div className="relative">
          <button type="button" onClick={() => setTagOpen((o) => !o)} className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3" style={{ border: `1px solid ${C.border}`, fontSize: 13, color: C.mutedFg, background: "#fff" }}>
            Tags{activeTags.length > 0 && <span className="rounded-full px-1.5" style={{ fontSize: 10, background: C.primary, color: "#fff" }}>{activeTags.length}</span>}
          </button>
          {tagOpen && (
            <div className="absolute z-10 mt-1 w-48 rounded-lg bg-white p-2 shadow-lg" style={{ border: `1px solid ${C.border}` }}>
              {allTags.map((t) => (
                <button key={t} type="button" onClick={() => setActiveTags((cur) => cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t])} className="flex w-full items-center justify-between rounded px-2 py-1.5 text-left hover:bg-[#F3F3F2]">
                  <TagPill tag={t} />
                  {activeTags.includes(t) && <span style={{ color: C.primary }}>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="m-6 overflow-hidden rounded-xl bg-white" style={{ border: `1px solid ${C.border}` }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: C.board, borderBottom: `1px solid ${C.border}` }}>
              <th className="cursor-pointer px-5 py-3 text-left uppercase" style={{ fontSize: 12, fontWeight: 600, color: C.mutedFg, letterSpacing: "0.04em" }} onClick={() => toggleSort("name")}>Paciente{arrow("name")}</th>
              <th className="px-5 py-3 text-left uppercase" style={{ fontSize: 12, fontWeight: 600, color: C.mutedFg, letterSpacing: "0.04em" }}>Telefone</th>
              <th className="px-5 py-3 text-left uppercase" style={{ fontSize: 12, fontWeight: 600, color: C.mutedFg, letterSpacing: "0.04em" }}>Origem</th>
              <th className="px-5 py-3 text-left uppercase" style={{ fontSize: 12, fontWeight: 600, color: C.mutedFg, letterSpacing: "0.04em" }}>Tags</th>
              <th className="px-5 py-3 text-left uppercase" style={{ fontSize: 12, fontWeight: 600, color: C.mutedFg, letterSpacing: "0.04em" }}>Leads</th>
              <th className="cursor-pointer px-5 py-3 text-left uppercase" style={{ fontSize: 12, fontWeight: 600, color: C.mutedFg, letterSpacing: "0.04em" }} onClick={() => toggleSort("createdAt")}>Data{arrow("createdAt")}</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => {
              const green = /whatsapp|bot/i.test(c.source);
              return (
                <tr key={c.id} onClick={() => open({ kind: "contact", name: c.name })} className="cursor-pointer border-t transition-colors hover:bg-[#FBFAF9]" style={{ borderColor: C.border }}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={c.name} size={32} />
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: C.fg }}>{c.name}</p>
                        {c.email && <p style={{ fontSize: 12, color: C.mutedFg }}>{c.email}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5" style={{ fontSize: 13, color: C.mutedFg, fontFamily: "ui-monospace, monospace" }}>{c.phone}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 font-semibold" style={{ fontSize: 11, background: green ? "#DCFCE7" : C.muted, color: green ? "#166534" : C.fg }}>{c.source}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {c.tags.map((t) => <TagPill key={t} tag={t} />)}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 tabular-nums" style={{ fontSize: 13, color: C.mutedFg }}>
                    {state.leads.filter((l) => l.contactName === c.name).length}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5" style={{ fontSize: 13, color: C.mutedFg }}>
                    {new Date(c.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button type="button" onClick={(e) => { e.stopPropagation(); open({ kind: "contact", name: c.name }); }} className="rounded-md px-2.5 py-1 font-medium transition-colors hover:bg-[#F3F3F2]" style={{ fontSize: 12, color: C.mutedFg }}>Ver</button>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-16 text-center" style={{ fontSize: 13, color: C.faint }}>Nenhum paciente encontrado</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
