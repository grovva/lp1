"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useRef, useState } from "react";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511978814240";

type Option = { value: string; label: string; hint?: string };
type Question = {
  key: string;
  title: string;
  subtitle?: string;
  options: Option[];
};

// Quiz de qualificação geral, serve pra qualquer negócio que queira crescer,
// não é nichado em clínica. As respostas qualificam e dão contexto pro time.
const QUESTIONS: Question[] = [
  {
    key: "objetivo",
    title: "Qual é o seu foco agora?",
    subtitle: "O que mais faria diferença no seu negócio nos próximos meses.",
    options: [
      { value: "Atrair mais clientes", label: "Atrair mais clientes", hint: "Encher o topo do funil" },
      { value: "Vender mais para quem já chega", label: "Vender mais pra quem já chega", hint: "Aumentar a conversão" },
      { value: "Crescer com previsibilidade", label: "Crescer com previsibilidade", hint: "Tirar o crescimento da sorte" },
      { value: "Organizar a operação", label: "Organizar a operação", hint: "Processo, controle e dados" },
    ],
  },
  {
    key: "aquisicao",
    title: "Como você atrai clientes hoje?",
    options: [
      { value: "Indicação e boca a boca", label: "Indicação e boca a boca" },
      { value: "Tráfego pago (anúncios)", label: "Tráfego pago (anúncios)" },
      { value: "Conteúdo / orgânico", label: "Conteúdo / orgânico" },
      { value: "Ainda não tenho um processo", label: "Ainda não tenho um processo" },
    ],
  },
  {
    key: "faturamento",
    title: "Qual o faturamento médio mensal?",
    subtitle: "Fica entre a gente, ajuda a desenhar a estratégia certa.",
    options: [
      { value: "Até R$ 20 mil", label: "Até R$ 20 mil" },
      { value: "R$ 20 a 50 mil", label: "R$ 20 a 50 mil" },
      { value: "R$ 50 a 100 mil", label: "R$ 50 a 100 mil" },
      { value: "Acima de R$ 100 mil", label: "Acima de R$ 100 mil" },
    ],
  },
  {
    key: "time",
    title: "Quantas pessoas cuidam das vendas?",
    options: [
      { value: "Só eu", label: "Só eu" },
      { value: "2 a 5 pessoas", label: "2 a 5 pessoas" },
      { value: "6 a 15 pessoas", label: "6 a 15 pessoas" },
      { value: "Mais de 15 pessoas", label: "Mais de 15 pessoas" },
    ],
  },
  {
    key: "gargalo",
    title: "Qual o maior gargalo hoje?",
    subtitle: "Onde o crescimento trava com mais frequência.",
    options: [
      { value: "Chegam poucos leads", label: "Chegam poucos leads" },
      { value: "Os leads não fecham", label: "Os leads não fecham" },
      { value: "Falta follow-up e organização", label: "Falta follow-up e organização" },
      { value: "Falta dados e controle", label: "Falta dados e controle" },
    ],
  },
  {
    key: "urgencia",
    title: "Quando você quer resolver isso?",
    options: [
      { value: "O quanto antes", label: "O quanto antes" },
      { value: "Nos próximos 30 dias", label: "Nos próximos 30 dias" },
      { value: "Só pesquisando por enquanto", label: "Só pesquisando por enquanto" },
    ],
  },
];

// Diagnóstico leve derivado do gargalo escolhido, dá a sensação de resultado
// personalizado (estilo InLead) sem prometer nada que não dependa do contexto.
const DIAGNOSIS: Record<string, { headline: string; body: string }> = {
  "Chegam poucos leads": {
    headline: "Seu maior potencial está na aquisição.",
    body: "Com um sistema de geração de demanda bem calibrado, dá pra encher o topo do funil com gente realmente decidida a comprar.",
  },
  "Os leads não fecham": {
    headline: "Você tem demanda, falta conversão.",
    body: "O ponto de alavancagem aqui é o processo comercial: qualificação, follow-up e abordagem certa na hora certa.",
  },
  "Falta follow-up e organização": {
    headline: "Há dinheiro parado na sua operação.",
    body: "Boa parte das vendas se perde por falta de acompanhamento. Um processo organizado costuma recuperar isso rápido.",
  },
  "Falta dados e controle": {
    headline: "Você está crescendo no escuro.",
    body: "Com os números certos à vista, as decisões deixam de ser achismo e o crescimento fica previsível.",
  },
};

const DEFAULT_DIAGNOSIS = {
  headline: "Dá pra destravar o seu próximo nível.",
  body: "Com o sistema certo, você atrai leads decididos a comprar e ajuda o time a fechar mais, com previsibilidade.",
};

function maskPhone(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 3) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 7)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function maskName(input: string): string {
  return input.replace(/[^A-Za-zÀ-ÿ\s']/g, "").replace(/\s{2,}/g, " ");
}

type Screen = "intro" | "question" | "contact";

const ease = [0.22, 1, 0.36, 1] as const;

export function Quiz() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1);

  // Contact step
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = QUESTIONS.length;
  const answered = QUESTIONS.filter((q) => answers[q.key]).length;
  const progress = screen === "contact" ? 100 : Math.round((answered / total) * 100);

  const diagnosis = useMemo(() => {
    const g = answers["gargalo"];
    return (g && DIAGNOSIS[g]) || DEFAULT_DIAGNOSIS;
  }, [answers]);

  function go(next: Screen, dir: number) {
    setDirection(dir);
    setScreen(next);
  }

  function selectOption(q: Question, value: string) {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setAnswers((prev) => ({ ...prev, [q.key]: value }));
    setDirection(1);
    // Pequeno delay pro usuário ver a seleção antes de avançar.
    advanceTimer.current = setTimeout(() => {
      if (qIndex < total - 1) {
        setQIndex((i) => i + 1);
      } else {
        go("contact", 1);
      }
    }, 260);
  }

  function back() {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setDirection(-1);
    if (screen === "contact") {
      setScreen("question");
      setQIndex(total - 1);
    } else if (screen === "question") {
      if (qIndex === 0) go("intro", -1);
      else setQIndex((i) => i - 1);
    }
  }

  async function submitContact(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const labelByKey: Record<string, string> = {
      objetivo: "Objetivo",
      aquisicao: "Aquisição",
      faturamento: "Faturamento",
      time: "Time de vendas",
      gargalo: "Maior gargalo",
      urgencia: "Urgência",
    };

    const summaryLines = QUESTIONS.filter((q) => answers[q.key]).map(
      (q) => `${labelByKey[q.key] || q.key}: ${answers[q.key]}`,
    );
    const waMessage =
      `Olá! Acabei de responder o quiz da grovva e quero meu diagnóstico.\n\n` +
      `${summaryLines.join("\n")}`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    try {
      await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          answers,
        }),
      });
    } catch (err) {
      // Best-effort: mesmo se a persistência falhar, levamos o lead pro WhatsApp.
      console.error("Quiz submit error:", err);
    }

    window.location.href = waUrl;
  }

  const contactValid =
    contact.name.trim().length >= 3 &&
    /\S+@\S+\.\S+/.test(contact.email) &&
    contact.phone.replace(/\D/g, "").length >= 10;

  return (
    <main
      className="grain relative flex min-h-[100dvh] flex-col bg-grovva-dark text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at 18% -10%, rgba(62,168,92,0.16), transparent 48%), radial-gradient(circle at 85% 110%, rgba(62,168,92,0.10), transparent 52%)",
      }}
    >
      {/* Top bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-[820px] items-center justify-between px-5 pt-6 md:pt-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-grovva-white-v2.png"
            alt="grovva"
            width={400}
            height={400}
            className="h-auto w-[96px] object-contain md:w-[108px]"
            priority
          />
        </Link>
        {screen === "question" && (
          <span className="text-[12px] font-medium text-white/45">
            {qIndex + 1} <span className="text-white/25">/ {total}</span>
          </span>
        )}
      </header>

      {/* Progress bar */}
      <div className="relative z-10 mx-auto mt-5 w-full max-w-[820px] px-5">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-grovva-green"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease }}
            style={{ boxShadow: "0 0 12px rgba(62,168,92,0.6)" }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="relative z-10 mx-auto flex w-full max-w-[820px] flex-1 flex-col justify-center px-5 py-8 md:py-10">
        <AnimatePresence mode="wait" custom={direction}>
          {screen === "intro" && (
            <motion.div
              key="intro"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-grovva-green/60 bg-grovva-green/[0.14] px-3.5 py-1.5 text-[12px] font-medium text-grovva-green">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-grovva-green opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-grovva-green" />
                </span>
                Diagnóstico gratuito · 1 minuto
              </span>
              <h1 className="mx-auto mt-7 max-w-[720px] font-heading text-[30px] font-bold leading-[1.12] tracking-[-0.02em] md:text-[44px]">
                Descubra o que está{" "}
                <span className="text-grovva-green">travando</span> o
                crescimento do seu negócio
              </h1>
              <p className="mx-auto mt-5 max-w-[600px] text-[15px] leading-relaxed text-white/60 md:text-[16px]">
                Responda 6 perguntas rápidas e receba um diagnóstico com o
                próximo passo certo pra você crescer com previsibilidade.
              </p>
              <button
                type="button"
                onClick={() => go("question", 1)}
                className="btn-primary mx-auto mt-9"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(62,168,92,0.25), 0 18px 40px -10px rgba(62,168,92,0.55)",
                }}
              >
                Começar agora
                <Arrow />
              </button>
              <p className="mt-5 text-[12px] text-white/35">
                Sem compromisso · leva menos de 1 minuto
              </p>
            </motion.div>
          )}

          {screen === "question" && (
            <motion.div
              key={`q-${qIndex}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <QuestionView
                question={QUESTIONS[qIndex]}
                selected={answers[QUESTIONS[qIndex].key]}
                onSelect={(v) => selectOption(QUESTIONS[qIndex], v)}
              />
            </motion.div>
          )}

          {screen === "contact" && (
            <motion.div
              key="contact"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-grovva-green">
                  Seu diagnóstico
                </span>
                <h2 className="mt-3 font-heading text-[24px] font-bold leading-[1.15] tracking-[-0.015em] md:text-[30px]">
                  {diagnosis.headline}
                </h2>
                <p className="mt-3 max-w-[640px] text-[14px] leading-relaxed text-white/60 md:text-[15px]">
                  {diagnosis.body}
                </p>

                <div className="my-6 h-px w-full bg-white/10" />

                <p className="text-[14px] font-medium text-white/90">
                  Deixe seus dados e nosso time envia o passo a passo no seu
                  WhatsApp.
                </p>

                <form onSubmit={submitContact} className="mt-5 flex flex-col gap-3.5">
                  <Field
                    label="Seu nome"
                    value={contact.name}
                    onChange={(v) => setContact((c) => ({ ...c, name: maskName(v) }))}
                    placeholder="Nome completo"
                    autoComplete="name"
                  />
                  <Field
                    label="Seu melhor e-mail"
                    type="email"
                    value={contact.email}
                    onChange={(v) => setContact((c) => ({ ...c, email: v }))}
                    placeholder="voce@email.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                  <Field
                    label="WhatsApp"
                    type="tel"
                    value={contact.phone}
                    onChange={(v) => setContact((c) => ({ ...c, phone: maskPhone(v) }))}
                    placeholder="(11) 9 9999-9999"
                    autoComplete="tel"
                    inputMode="numeric"
                  />

                  {status === "error" && errorMessage && (
                    <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-[13px] text-red-200">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!contactValid || status === "submitting"}
                    className="btn-primary mt-2 w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      "Enviando…"
                    ) : (
                      <>
                        Ver meu diagnóstico
                        <Arrow />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-white/35">
                    Seus dados ficam só com a gente. Sem spam.
                  </p>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Back control */}
      <footer className="relative z-10 mx-auto w-full max-w-[820px] px-5 pb-7 md:pb-9">
        {screen !== "intro" && (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-1.5 text-[13px] text-white/45 transition-colors hover:text-white/80"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Voltar
          </button>
        )}
      </footer>
    </main>
  );
}

function QuestionView({
  question,
  selected,
  onSelect,
}: {
  question: Question;
  selected?: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <h2 className="max-w-[760px] font-heading text-[24px] font-bold leading-[1.18] tracking-[-0.015em] md:text-[32px]">
        {question.title}
      </h2>
      {question.subtitle && (
        <p className="mt-2.5 max-w-[640px] text-[14px] leading-relaxed text-white/55 md:text-[15px]">
          {question.subtitle}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-3">
        {question.options.map((opt, i) => {
          const isSel = selected === opt.value;
          return (
            <motion.button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.05, ease, duration: 0.4 }}
              className={`group flex w-full items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left transition-all ${
                isSel
                  ? "border-grovva-green bg-grovva-green/[0.14]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
              }`}
            >
              <span className="min-w-0">
                <span className="block text-[15px] font-medium text-white md:text-[16px]">
                  {opt.label}
                </span>
                {opt.hint && (
                  <span className="mt-0.5 block text-[12px] text-white/45">
                    {opt.hint}
                  </span>
                )}
              </span>
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  isSel
                    ? "border-grovva-green bg-grovva-green text-white"
                    : "border-white/25 text-transparent group-hover:border-white/40"
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="size-3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "email" | "text";
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-white/75">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required
        className="w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-[16px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-grovva-green focus:bg-white/[0.06] focus:ring-2 focus:ring-grovva-green/25 md:text-[15px]"
      />
    </label>
  );
}

function Arrow() {
  return (
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
  );
}

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 36 : -36 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -36 : 36,
    transition: { duration: 0.28, ease },
  }),
};
