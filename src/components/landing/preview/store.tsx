"use client";

// In-memory store for the preview. A single reducer holds every entity;
// no persistence layer, so unmount / page refresh drops all edits.

import { createContext, useContext, useReducer, type ReactNode } from "react";
import { buildSeed } from "./seed";
import type {
  Appointment,
  Lead,
  LeadStatus,
  PreviewState,
  Segment,
  Transaction,
} from "./types";

type Action =
  | { type: "MOVE_LEAD"; leadId: string; stageId: string }
  | { type: "ADD_LEAD"; lead: Omit<Lead, "id" | "seqId" | "daysSinceUpdate"> }
  | { type: "UPDATE_LEAD"; leadId: string; patch: Partial<Lead> }
  | { type: "SET_LEAD_STATUS"; leadId: string; status: LeadStatus }
  | { type: "ADD_APPOINTMENT"; appt: Omit<Appointment, "id"> }
  | { type: "ADD_SEGMENT"; segment: Omit<Segment, "id" | "createdAt"> }
  | { type: "DELETE_SEGMENT"; id: string }
  | { type: "ADD_TRANSACTION"; txn: Omit<Transaction, "id"> }
  | { type: "CYCLE_TASK"; id: string };

function reducer(state: PreviewState, action: Action): PreviewState {
  switch (action.type) {
    case "MOVE_LEAD": {
      const lead = state.leads.find((l) => l.id === action.leadId);
      if (!lead || lead.stageId === action.stageId) return state;
      // Reaching "Fechou"/"Cancelou" flips status to keep the board honest.
      const status: LeadStatus =
        action.stageId === "s4" ? "won" : action.stageId === "s5" ? "lost" : "open";
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.leadId
            ? { ...l, stageId: action.stageId, status, daysSinceUpdate: 0 }
            : l,
        ),
      };
    }
    case "ADD_LEAD": {
      const id = `l-${state.nextId}`;
      return {
        ...state,
        nextId: state.nextId + 1,
        nextSeq: state.nextSeq + 1,
        leads: [
          { ...action.lead, id, seqId: state.nextSeq, daysSinceUpdate: 0 },
          ...state.leads,
        ],
      };
    }
    case "UPDATE_LEAD": {
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.leadId ? { ...l, ...action.patch, daysSinceUpdate: 0 } : l,
        ),
      };
    }
    case "SET_LEAD_STATUS": {
      const stageId =
        action.status === "won" ? "s4" : action.status === "lost" ? "s5" : undefined;
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.leadId
            ? { ...l, status: action.status, stageId: stageId ?? l.stageId, daysSinceUpdate: 0 }
            : l,
        ),
      };
    }
    case "ADD_APPOINTMENT": {
      return {
        ...state,
        nextId: state.nextId + 1,
        appointments: [...state.appointments, { ...action.appt, id: `a-${state.nextId}` }],
      };
    }
    case "ADD_SEGMENT": {
      const d = new Date();
      return {
        ...state,
        nextId: state.nextId + 1,
        segments: [
          { ...action.segment, id: `seg-${state.nextId}`, createdAt: d.toISOString().slice(0, 10) },
          ...state.segments,
        ],
      };
    }
    case "DELETE_SEGMENT": {
      return { ...state, segments: state.segments.filter((s) => s.id !== action.id) };
    }
    case "ADD_TRANSACTION": {
      return {
        ...state,
        nextId: state.nextId + 1,
        transactions: [{ ...action.txn, id: `t-${state.nextId}` }, ...state.transactions],
      };
    }
    case "CYCLE_TASK": {
      const order = { pending: "in_progress", in_progress: "completed", completed: "pending" } as const;
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, status: order[t.status] } : t,
        ),
      };
    }
    default:
      return state;
  }
}

interface Ctx {
  state: PreviewState;
  dispatch: React.Dispatch<Action>;
}

const PreviewContext = createContext<Ctx | null>(null);

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, buildSeed);
  return <PreviewContext.Provider value={{ state, dispatch }}>{children}</PreviewContext.Provider>;
}

export function usePreview(): Ctx {
  const ctx = useContext(PreviewContext);
  if (!ctx) throw new Error("usePreview must be used within PreviewProvider");
  return ctx;
}
