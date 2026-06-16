"use client";

import { useModal } from "./modal";
import { AppointmentModal } from "./modals/AppointmentModal";
import { ContactModal } from "./modals/ContactModal";
import { LeadModal } from "./modals/LeadModal";
import { SegmentModal } from "./modals/SegmentModal";
import { TransactionModal } from "./modals/TransactionModal";

export function ModalHost() {
  const { modal } = useModal();
  if (!modal) return null;
  switch (modal.kind) {
    case "lead": return <LeadModal id={modal.id} />;
    case "contact": return <ContactModal name={modal.name} />;
    case "appointment": return <AppointmentModal date={modal.date} time={modal.time} />;
    case "segment": return <SegmentModal />;
    case "transaction": return <TransactionModal />;
  }
}
