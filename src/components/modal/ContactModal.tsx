"use client";

import { useEffect, useRef, useState } from "react";

type Question = {
  key: string;
  label: string;
  placeholder?: string;
  type: "text" | "email" | "tel" | "select";
  required: boolean;
  options?: string[];
};

const questions: Question[] = [
  {
    key: "name",
    label: "Qual é o seu nome completo?",
    placeholder: "Seu nome",
    type: "text",
    required: true,
  },
  {
    key: "email",
    label: "Qual o seu melhor e-mail?",
    placeholder: "voce@email.com",
    type: "email",
    required: true,
  },
  {
    key: "phone",
    label: "DDD + WhatsApp pra gente conversar?",
    placeholder: "(11) 9 9999-9999",
    type: "tel",
    required: true,
  },
  {
    key: "instagram",
    label: "Qual o Instagram da sua clínica?",
    placeholder: "@suaclinica",
    type: "text",
    required: true,
  },
  {
    key: "revenue",
    label: "Faturamento mensal da clínica?",
    type: "select",
    required: true,
    options: [
      "Até R$ 50 mil",
      "De R$ 51 a R$ 70 mil",
      "De R$ 71 a R$ 100 mil",
      "Acima de R$ 100 mil",
    ],
  },
];

// Mask: (XX) X XXXX-XXXX
function maskPhone(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 3) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 7)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
}

// Mask: @handle — ensures @ prefix, lowercase, no spaces
function maskInstagram(input: string): string {
  const clean = input
    .replace(/^@+/, "")
    .replace(/\s+/g, "")
    .replace(/[^a-zA-Z0-9._]/g, "")
    .toLowerCase()
    .slice(0, 30);
  return clean ? `@${clean}` : "";
}

// Name: only letters, spaces and common accented chars
function maskName(input: string): string {
  return input.replace(/[^A-Za-zÀ-ÿ\s']/g, "").replace(/\s{2,}/g, " ");
}

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setValues({});
    }, 300);
  };

  // Global click delegation — any [data-contact-cta] element opens the modal.
  // Also listens for a custom 'open-contact-modal' event as a fallback.
  useEffect(() => {
    const onClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const trigger = target?.closest("[data-contact-cta]");
      if (trigger) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    const onCustom = () => setIsOpen(true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("open-contact-modal", onCustom);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("open-contact-modal", onCustom);
    };
  }, []);

  // Body scroll lock + Esc to close + autofocus first field
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    const t = setTimeout(() => firstFieldRef.current?.focus(), 200);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // TODO: wire up to real endpoint
    setTimeout(() => setStatus("success"), 700);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
      aria-labelledby="contact-modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Fechar"
        onClick={close}
        className="cm-backdrop absolute inset-0 bg-grovva-ink/60 backdrop-blur-sm"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="cm-panel scrollbar-soft relative w-full md:max-w-[600px] md:max-h-[88vh] max-h-[85dvh] overflow-y-auto overscroll-contain bg-grovva-bg md:rounded-3xl rounded-t-3xl shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.3),0_40px_80px_-30px_rgba(0,0,0,0.4)]"
      >
        {/* Header */}
        <div className="sticky top-0 bg-grovva-bg/95 backdrop-blur-md px-5 md:px-7 py-4 flex items-center justify-between border-b border-grovva-line z-10">
          <div className="flex items-center gap-3">
            <div className="relative size-9 rounded-full bg-grovva-green flex items-center justify-center">
              <span className="text-white font-heading font-bold text-sm">
                G
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-grovva-green-soft border-2 border-grovva-bg" />
            </div>
            <div>
              <div
                id="contact-modal-title"
                className="text-sm font-semibold text-grovva-text leading-tight"
              >
                grovva
              </div>
              <div className="text-[11px] text-grovva-muted leading-tight">
                respondemos em instantes
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="size-9 rounded-full hover:bg-grovva-line/60 flex items-center justify-center text-grovva-muted cursor-pointer transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-4"
            >
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {status !== "success" ? (
          <form
            onSubmit={handleSubmit}
            className="px-5 md:px-7 py-6 md:py-8 flex flex-col gap-6"
          >
            {/* Opening message */}
            <ChatBubble>
              Olá! Forneça suas informações abaixo para nosso time entrar em
              contato com você.
            </ChatBubble>

            {questions.map((q, idx) => (
              <div key={q.key} className="flex flex-col gap-2.5">
                <ChatBubble>
                  <span>{q.label}</span>
                  {q.required && (
                    <span className="text-grovva-green ml-1">*</span>
                  )}
                </ChatBubble>

                <div className="pl-11">
                  {q.type === "select" ? (
                    <select
                      name={q.key}
                      required={q.required}
                      value={values[q.key] || ""}
                      onChange={(e) =>
                        setValues({ ...values, [q.key]: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl bg-grovva-paper border border-grovva-line text-[16px] md:text-sm text-grovva-text focus:outline-none focus:ring-2 focus:ring-grovva-green/30 focus:border-grovva-green transition-colors"
                    >
                      <option value="">Selecione…</option>
                      {q.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      ref={idx === 0 ? firstFieldRef : undefined}
                      name={q.key}
                      type={q.type}
                      required={q.required}
                      value={values[q.key] || ""}
                      onChange={(e) => {
                        const raw = e.target.value;
                        let next = raw;
                        if (q.key === "phone") next = maskPhone(raw);
                        else if (q.key === "instagram") next = maskInstagram(raw);
                        else if (q.key === "name") next = maskName(raw);
                        setValues({ ...values, [q.key]: next });
                      }}
                      placeholder={q.placeholder}
                      autoComplete={autoCompleteFor(q.key)}
                      inputMode={
                        q.key === "phone"
                          ? "numeric"
                          : q.key === "email"
                          ? "email"
                          : undefined
                      }
                      pattern={
                        q.key === "phone"
                          ? "\\(\\d{2}\\) \\d \\d{4}-\\d{4}"
                          : q.key === "instagram"
                          ? "@[a-zA-Z0-9._]{1,30}"
                          : undefined
                      }
                      minLength={
                        q.key === "name"
                          ? 3
                          : q.key === "phone"
                          ? 16
                          : q.key === "instagram"
                          ? 2
                          : undefined
                      }
                      title={
                        q.key === "phone"
                          ? "Formato: (11) 9 9999-9999"
                          : q.key === "instagram"
                          ? "Ex: @suaclinica"
                          : undefined
                      }
                      className="w-full px-4 py-3 rounded-2xl bg-grovva-paper border border-grovva-line text-[16px] md:text-sm text-grovva-text placeholder:text-grovva-subtle focus:outline-none focus:ring-2 focus:ring-grovva-green/30 focus:border-grovva-green transition-colors"
                    />
                  )}
                </div>
              </div>
            ))}

            <div className="sticky bottom-0 -mx-5 md:-mx-7 px-5 md:px-7 pt-4 pb-5 bg-gradient-to-t from-grovva-bg via-grovva-bg to-grovva-bg/0">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary w-full justify-center cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  "Enviando…"
                ) : (
                  <>
                    Quero falar com a grovva
                    <svg
                      className="arrow size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 5 7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
              <p className="text-[11px] text-grovva-subtle text-center mt-3">
                Seus dados ficam só com a gente. Sem spam.
              </p>
            </div>
          </form>
        ) : (
          <div className="px-5 md:px-7 py-10 md:py-12 flex flex-col items-center text-center">
            {/* animated check badge */}
            <div
              className="relative mb-7"
              style={{ animation: "cm-pop 420ms cubic-bezier(0.34, 1.56, 0.64, 1) both" }}
            >
              <span
                className="absolute inset-0 rounded-full bg-grovva-green/25"
                style={{ animation: "cm-ring 1.4s ease-out infinite" }}
              />
              <div className="relative size-[72px] rounded-full bg-grovva-green flex items-center justify-center shadow-[0_12px_30px_-10px_rgba(62,168,92,0.6)]">
                <svg
                  className="size-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            <h3 className="font-heading font-semibold text-2xl md:text-3xl text-grovva-text mb-3 tracking-[-0.02em]">
              Recebemos suas respostas
              {values.name ? `, ${values.name.split(" ")[0]}` : ""}.
            </h3>
            <p className="text-grovva-muted text-sm md:text-[15px] leading-relaxed max-w-[420px]">
              Um especialista da grovva vai entrar em contato{" "}
              <span className="text-grovva-text font-medium">em breve</span>
              {values.phone ? (
                <>
                  {" "}pelo WhatsApp{" "}
                  <span className="text-grovva-text font-medium">
                    {values.phone}
                  </span>
                </>
              ) : (
                " pelo WhatsApp"
              )}
              .
            </p>

            {/* Grovva reply bubble */}
            <div className="w-full max-w-[440px] mt-8">
              <ChatBubble>
                Enquanto isso, fica de olho no seu WhatsApp — a gente costuma
                retornar no mesmo dia. 👋
              </ChatBubble>
            </div>

            <button
              type="button"
              onClick={close}
              className="btn-primary mt-10 cursor-pointer"
            >
              Fechar
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Backdrop — fade in */
        .cm-backdrop {
          animation: cm-fade 260ms ease-out both;
        }

        /* Panel — mobile: slide up from bottom, desktop: zoom in from center */
        .cm-panel {
          animation: cm-slide-up 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
          transform-origin: bottom center;
        }
        @media (min-width: 768px) {
          .cm-panel {
            animation: cm-zoom-in 340ms cubic-bezier(0.22, 1, 0.36, 1) both;
            transform-origin: center;
          }
        }

        @keyframes cm-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes cm-slide-up {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes cm-zoom-in {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes cm-pop {
          from {
            opacity: 0;
            transform: scale(0.4);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes cm-ring {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function ChatBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="relative size-8 shrink-0 rounded-full bg-grovva-green/15 border border-grovva-green/25 flex items-center justify-center mt-0.5">
        <span className="text-grovva-green-dark font-heading font-bold text-[11px]">
          G
        </span>
      </div>
      <div className="bg-grovva-paper rounded-2xl rounded-tl-md px-4 py-3 max-w-[85%] border border-grovva-line/70 shadow-[0_2px_4px_rgba(15,27,20,0.03)]">
        <p className="text-[14px] md:text-[14.5px] text-grovva-text leading-relaxed">
          {children}
        </p>
      </div>
    </div>
  );
}

function autoCompleteFor(key: string) {
  switch (key) {
    case "name":
      return "name";
    case "email":
      return "email";
    case "phone":
      return "tel";
    default:
      return "off";
  }
}
