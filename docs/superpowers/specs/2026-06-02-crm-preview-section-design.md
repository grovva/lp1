# CRM Preview Section — Design

**Date:** 2026-06-02
**Project:** `lp1` (Grovva landing page)
**Goal:** An interactive, in-memory preview of the Grovva CRM (faithful to `../crm-template-estetica`) embedded as a landing-page section, so visitors can "play" with the real tool. Changes persist only in-session — pressing F5 resets everything to the seeded state.

## Summary

A self-contained mini-CRM rendered inside an "app window" mockup that overlaps the bottom of the Hero. The window chrome and surrounding glow blend into the landing's dark theme, but the **interior is faithful to the real CRM** (light theme, pink primary `#D4458C`), not to the landing's design system. State lives in memory only (no localStorage / no network), so a refresh restores the seed.

## Scope

### Tabs (everything except WhatsApp — not ready yet)
Full interactive views for:
1. **CRM / Pipeline (Kanban)** — initial/default tab
2. **Dashboard**
3. **Meu Dia** (today)
4. **Contatos**
5. **Segmentos**
6. **Agenda** (booking)
7. **Financeiro**
8. **Configurações** — visible nav item, simple faithful static screen (low interactivity)

WhatsApp is intentionally excluded.

### Non-goals
- No real backend, auth, or persistence.
- No mobile drawer parity required, but the window must be responsive/usable on small screens (tabs may scroll or collapse).
- Not pixel-perfect to every micro-interaction; faithful in layout, color, typography, fields, and the core interactions listed below.

## Placement & Frame

- New section `<ToolPreview />` plugged into `src/app/page.tsx` immediately after `<HeroV2 />` (the active hero), before `<Solution />`.
- The app window is pulled **up over the end of the Hero** via negative margin, sitting on the dark background.
- Window chrome: top bar with traffic-light dots + a faux URL pill (`app.grovva.com`), strong drop shadow, subtle grovva-green glow ring to tie it to the landing.
- Inside the chrome: dark sidebar (`#0F0D15`) on the left + light content area (`#FAFAF9`) on the right — the real app shell.
- Outer framing animates in with the existing `Reveal` motion component; interior uses light CSS transitions only.

## Fidelity & Style Isolation

The landing uses a Tailwind theme with grovva tokens (dark green, `grovva-green`). The CRM uses its own tokens (primary `#D4458C`, bg `#FAFAF9`, fg `#1A1A1A`, muted `#F3F3F2`, muted-fg `#78716C`, border `#E7E5E4`, destructive `#DC2626`).

To avoid collisions, the preview's interior styles use **explicit arbitrary values** (e.g. `text-[#1A1A1A]`, `bg-[#D4458C]`, `text-[13px]`) scoped within the preview container — it does **not** rely on the landing's theme tokens. Type scale mirrors the app: 11/12/13/14/16/20/28px.

Temperature colors: quente `#DC2626`, morno `#F59E0B`, frio `#3B82F6`.
Status: Ganho (green), Perdido (red).
Appointment status: Pendente (amber), Confirmado (green), Realizado (secondary), Cancelado (red).

## State & Interactivity (in-memory; F5 resets)

A single `useReducer` store at the `PreviewApp` root holds all entities (contacts, leads, pipeline stages, appointments, segments, transactions, tasks). Seeded on mount from a static module. No persistence layer → refresh re-seeds.

### Per-view interactions
- **Pipeline:** HTML5 drag-and-drop of lead cards between stages; "Criar Lead" inline form; per-column count + currency sum recompute live; mark Ganho/Perdido.
- **Agenda:** week day selector (←/→ + 7 day buttons); timeline grid 08:00–18:00; click an empty slot → "Novo Agendamento" inline form (contact, service, time, status).
- **Segmentos:** segment cards grid; "Novo Segmento" opens a builder with condition rows (field / operator / value); **live matched count** computed against seeded contacts/leads.
- **Contatos:** search (name/email/phone), column sort (↑/↓), tag filter dropdown.
- **Financeiro:** KPI bar (Saldo Total, Receitas, Despesas, A receber), account chips, revenue chart, recent transactions list, "Transação" inline form to add one.
- **Dashboard / Meu Dia:** summary KPI cards, today's appointments, rotting leads, task list with status toggle (○ → ◐ → ●) and "Apenas meus / Todos" toggle.
- **Configurações:** static faithful settings layout (sections list, profile/branding placeholders). No mutations required.

## Seed Data (Brazilian beauty clinic — estética)

Reuse realistic data from the real seed:
- **Contacts:** Ana Paula Silva, Beatriz Santos, Carla Oliveira, Daniela Costa, Eduarda Ferreira, Fernanda Lima, Gabriela Souza, Helena Martins, Isabela Rocha, Juliana Alves (with phones +55229901000X, emails, tags).
- **Tags:** Quente, Morno, Frio, VIP, Retorno, Indicação, Redes Sociais, Nova Cliente.
- **Services:** Avaliação, Harmonização Facial, Botox, Limpeza de Pele, Peeling, Bioestimulador, Preenchimento Labial.
- **Pipeline (Comercial) stages:** Novo Lead, Avaliação Agendada, Confirmado, Fechou, Cancelou.
- **Leads:** seeded across stages with temperature/priority/value/status as in the real seed (e.g. Daniela Costa — Botox + Limpeza — Fechou — won — R$1.200,00).
- **Financeiro:** a few accounts (Caixa, Conta PJ), revenue/expense transactions across recent months.

## Architecture

```
src/components/landing/preview/
  ToolPreview.tsx        # landing section + window frame + overlap/glow; renders PreviewApp
  PreviewApp.tsx         # app shell: dark sidebar nav + content router; holds the store
  store.ts               # useReducer: state shape, actions, reducer
  seed.ts                # static seed data (contacts, leads, stages, appts, segments, txns, tasks)
  types.ts               # entity types (Lead, Contact, Appointment, Segment, Transaction, Task, Stage)
  ui.tsx                 # small shared primitives (Avatar, Badge, TempDot, icons) used internally
  views/
    PipelineView.tsx
    DashboardView.tsx
    MeuDiaView.tsx
    ContatosView.tsx
    SegmentosView.tsx
    AgendaView.tsx
    FinanceiroView.tsx
    ConfigView.tsx
```

- `page.tsx`: add `<ToolPreview />` after `<HeroV2 />`.
- Each view is a focused unit: receives state slice + dispatch via context/props; owns its own local UI state (open forms, drag-over column, etc.).
- A `PreviewContext` exposes `{ state, dispatch }` to avoid prop drilling.

## Tech choices

- **Drag-and-drop:** native HTML5 (`draggable`, `onDragStart/onDragOver/onDrop`) — no new dependency.
- **Charts (Financeiro):** reuse `src/components/landing/charts` if Recharts-compatible; otherwise a lightweight inline SVG/bar chart.
- **Icons:** inline SVGs matching the app (18×18, stroke 1.8).
- **No new heavy deps** unless a chart lib is already present.

## Error handling / edge cases

- Empty states per view (e.g. "Nenhuma tarefa para hoje", "Nenhum contato encontrado").
- Drag of a card onto its own column is a no-op.
- Segment with zero conditions matches all; live count handles 0 results gracefully.
- Adding entities assigns client-side incremental ids (no collisions within session).

## Testing / verification

- Manual verification via the running landing (`/run` or dev server): each tab renders, Pipeline drag works, forms add entities, counts update, F5 restores seed.
- Type-check / lint pass.
- Visual check that the window overlaps the Hero cleanly and is responsive.
