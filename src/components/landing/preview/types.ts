// Domain types for the in-memory CRM preview. Mirrors the real
// crm-template-estetica entities closely enough to feel faithful.

export type Temperature = "quente" | "morno" | "frio";
export type LeadStatus = "open" | "won" | "lost";
export type Priority = "low" | "medium" | "high";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: string;
  tags: string[];
  leads: number;
  createdAt: string; // ISO yyyy-mm-dd
}

export interface Stage {
  id: string;
  name: string;
  color: string;
}

export interface Lead {
  id: string;
  seqId: number;
  title: string;
  contactName: string;
  contactPhone?: string;
  value?: number; // in cents
  temperature?: Temperature;
  priority: Priority;
  status: LeadStatus;
  stageId: string;
  service?: string;
  assignedTo?: string;
  daysSinceUpdate: number;
}

export type ApptStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  contactName: string;
  service: string;
  date: string; // ISO yyyy-mm-dd
  time: string; // HH:mm
  status: ApptStatus;
  bot?: boolean;
}

export interface Condition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export interface Segment {
  id: string;
  name: string;
  description?: string;
  type: "contacts" | "leads";
  conditions: Condition[];
  createdAt: string;
}

export type TxnType = "income" | "expense";

export interface Transaction {
  id: string;
  description: string;
  amount: number; // cents, always positive
  type: TxnType;
  account: string;
  date: string; // ISO yyyy-mm-dd
  category: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number; // cents
}

export type TaskStatus = "pending" | "in_progress" | "completed";

export interface Task {
  id: string;
  title: string;
  due: string | null; // ISO yyyy-mm-dd or null (no due date)
  priority: Priority;
  assignee: string;
  status: TaskStatus;
  mine: boolean;
}

export interface PreviewState {
  stages: Stage[];
  leads: Lead[];
  contacts: Contact[];
  appointments: Appointment[];
  segments: Segment[];
  transactions: Transaction[];
  accounts: Account[];
  tasks: Task[];
  nextSeq: number;
  nextId: number;
}

export type TabKey =
  | "crm"
  | "dashboard"
  | "today"
  | "contacts"
  | "booking"
  | "financial"
  | "settings";
