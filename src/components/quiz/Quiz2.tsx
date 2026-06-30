"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* Quiz 2 — funil nichado em clínica ("Sistema Agenda Fácil"), tema claro.
   Fluxo: intro → 5 perguntas de múltipla escolha → nome → e-mail → whatsapp
   → tela de "analisando" (gif) → tela final (gif) com botão pro WhatsApp. */

// Número do especialista (WhatsApp).
const WA_PHONE = "5511978814240";

// Rótulos legíveis das perguntas, usados pra montar a mensagem do WhatsApp.
const CHOICE_LABELS: Record<string, string> = {
  canal: "Como as pacientes chegam hoje",
  dificuldade: "Maior dificuldade",
  faturamento: "Faturamento mensal",
  equipe: "Tamanho da equipe",
  decisao: "Como decide investir",
};

// Monta o link do WhatsApp com as respostas já preenchidas, como se o
// próprio lead estivesse mandando os dados dele em texto.
function buildWhatsappUrl(
  contact: { name: string; email: string; phone: string; instagram: string },
  answers: Record<string, string>,
): string {
  const lines = [
    "Olá! Acabei de passar no teste da Grovva e quero falar com um especialista! 🙌",
    "",
    `Nome: ${contact.name}`,
    `E-mail: ${contact.email}`,
    `Instagram: ${contact.instagram}`,
    `WhatsApp: ${contact.phone}`,
    "",
    ...Object.keys(CHOICE_LABELS)
      .filter((k) => answers[k])
      .map((k) => `${CHOICE_LABELS[k]}: ${answers[k]}`),
  ];
  const text = encodeURIComponent(lines.join("\n"));
  return `https://api.whatsapp.com/send/?phone=${WA_PHONE}&text=${text}&type=phone_number&app_absent=0`;
}

// GIFs — troque pelos seus arquivos se quiser (basta apontar pra /public ou outra URL).
const GIF_ANALISANDO = "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"; // gatinho no notebook
const GIF_FINAL = "https://media.giphy.com/media/Zds7ggWpSfe675qU1A/giphy.gif"; // abraço Friends

const ease = [0.22, 1, 0.36, 1] as const;

function Em({ children, underline = true }: { children: ReactNode; underline?: boolean }) {
  return (
    <span
      className={`font-extrabold text-grovva-green ${
        underline ? "underline decoration-grovva-green/60 underline-offset-[6px]" : ""
      }`}
    >
      {children}
    </span>
  );
}

type Choice = {
  kind: "choice";
  key: string;
  title: ReactNode;
  subtitle?: string;
  options: string[];
};

type InputStep = {
  kind: "input";
  key: "name" | "email" | "instagram" | "phone";
  title: ReactNode;
  subtitle?: string;
  helper?: string;
  footer?: string;
  placeholder: string;
  inputMode?: "text" | "email" | "numeric";
  type?: string;
};

type Step = Choice | InputStep;

const STEPS: Step[] = [
  {
    kind: "choice",
    key: "canal",
    title: <>Como as pacientes chegam na sua clínica hoje? 🤔</>,
    subtitle: "Me conta melhor como o seu público chega até você.",
    options: [
      "Indicação e boca a boca",
      "Anúncios no Instagram",
      "Conteúdos do Instagram",
      "Outra forma",
    ],
  },
  {
    kind: "choice",
    key: "dificuldade",
    title: (
      <>
        Qual a <Em>maior dificuldade</Em> que você sente hoje na clínica? 🙋
      </>
    ),
    options: [
      "Não consigo atrair novas pacientes",
      "Nossa agenda vive com buracos",
      "Não consigo transformar avaliação em tratamento",
      "Chega muita mensagem, mas é quase tudo curioso",
    ],
  },
  {
    kind: "choice",
    key: "faturamento",
    title: (
      <>
        Qual o <Em>faturamento médio</Em> mensal da clínica?
      </>
    ),
    options: ["Até R$20 mil", "R$20 mil a R$50 mil", "R$50 mil a R$100 mil", "Acima de R$100 mil"],
  },
  {
    kind: "choice",
    key: "equipe",
    title: <>Quantas pessoas fazem parte da sua equipe hoje? 👥</>,
    options: ["1 a 5 pessoas", "1 a 10 pessoas", "10 a 15 pessoas", "Mais de 15 pessoas"],
  },
  {
    kind: "choice",
    key: "decisao",
    title: (
      <>
        Quando precisa investir na clínica, <Em>como você decide?</Em> 🤔
      </>
    ),
    options: ["Sozinha", "Junto com minha sócia", "Com outra pessoa"],
  },
  {
    kind: "input",
    key: "name",
    title: (
      <>
        Qual o seu <Em>nome completo?</Em>
      </>
    ),
    subtitle: "Me informe abaixo por favor 👇",
    placeholder: "Digite seu nome...",
    inputMode: "text",
  },
  {
    kind: "input",
    key: "email",
    title: (
      <>
        Qual o seu <Em underline={false}>melhor e-mail?</Em>
      </>
    ),
    subtitle: "Me informe abaixo por favor 👇",
    placeholder: "Digite seu e-mail...",
    type: "email",
    inputMode: "email",
  },
  {
    kind: "input",
    key: "instagram",
    title: (
      <>
        Qual o <Em underline={false}>@ do Instagram</Em> da sua clínica?
      </>
    ),
    subtitle: "Me informe abaixo por favor 👇",
    placeholder: "@suaclinica",
    inputMode: "text",
  },
  {
    kind: "input",
    key: "phone",
    title: (
      <>
        Qual o seu <Em underline={false}>whatsapp?</Em>
      </>
    ),
    subtitle: "Me informe abaixo por favor 👇",
    helper: "Ex: 11 9999-99999",
    footer: "É apenas para entrarmos em contato com você, prometo não te incomodar.",
    placeholder: "Digite seu whatsapp com DDD...",
    type: "tel",
    inputMode: "numeric",
  },
];

function maskPhone(input: string): string {
  const d = input.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `${d.slice(0, 2)} ${d.slice(2)}`;
  return `${d.slice(0, 2)} ${d.slice(2, 7)}-${d.slice(7)}`;
}

function maskName(input: string): string {
  return input.replace(/[^A-Za-zÀ-ÿ\s']/g, "").replace(/\s{2,}/g, " ");
}

type Screen = "intro" | "step" | "loading" | "final";

export function Quiz2() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", email: "", phone: "", instagram: "" });
  const submitted = useRef(false);

  const total = STEPS.length;
  const current = STEPS[index];

  // Barra de progresso do topo
  const progress =
    screen === "intro"
      ? 5
      : screen === "step"
        ? Math.round(((index + 1) / total) * 92)
        : 100;

  function goStep(next: number) {
    if (next < 0) {
      setDirection(-1);
      setScreen("intro");
      return;
    }
    if (next >= total) {
      setScreen("loading");
      return;
    }
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  }

  function back() {
    if (screen === "loading") {
      setScreen("step");
      setIndex(total - 1);
    } else if (screen === "step") {
      goStep(index - 1);
    }
  }

  function selectChoice(key: string, value: string) {
    setAnswers((p) => ({ ...p, [key]: value }));
  }

  // Persiste o lead (best-effort) ao chegar na tela de análise.
  // O avanço pra tela final é controlado pela própria barra (onDone).
  useEffect(() => {
    if (screen !== "loading" || submitted.current) return;
    submitted.current = true;
    fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        instagram: contact.instagram,
        answers: { ...answers, instagram: contact.instagram },
      }),
    }).catch((err) => console.error("Quiz2 submit error:", err));
  }, [screen, contact, answers]);

  function canContinue(step: Step): boolean {
    if (step.kind === "choice") return Boolean(answers[step.key]);
    if (step.key === "name") return contact.name.trim().length >= 3;
    if (step.key === "email") return /\S+@\S+\.\S+/.test(contact.email);
    if (step.key === "instagram") return contact.instagram.trim().length >= 2;
    return contact.phone.replace(/\D/g, "").length >= 10;
  }

  return (
    <main className="relative flex min-h-[100dvh] flex-col bg-white text-grovva-ink">
      {/* Barra de progresso fixa no topo */}
      <div className="fixed inset-x-0 top-0 z-50 h-1.5 bg-[#27322B]">
        <motion.div
          className="h-full bg-grovva-green"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease }}
        />
      </div>

      {/* Voltar */}
      {(screen === "step" || screen === "loading") && (
        <button
          type="button"
          onClick={back}
          aria-label="Voltar"
          className="absolute left-4 top-5 z-40 flex size-9 cursor-pointer items-center justify-center rounded-full text-grovva-ink/70 transition-colors hover:bg-grovva-bg hover:text-grovva-ink md:left-6"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      )}

      <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col justify-center px-5 py-16">
        <AnimatePresence mode="wait" custom={direction}>
          {screen === "intro" && <Intro key="intro" onStart={() => setScreen("step")} />}

          {screen === "step" && (
            <motion.div
              key={`step-${index}`}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <StepView
                step={current}
                answers={answers}
                contact={contact}
                onSelect={selectChoice}
                onContact={setContact}
                onContinue={() => goStep(index + 1)}
                canContinue={canContinue(current)}
              />
            </motion.div>
          )}

          {screen === "loading" && (
            <Loading key="loading" onDone={() => setScreen("final")} />
          )}

          {screen === "final" && (
            <Final key="final" whatsappUrl={buildWhatsappUrl(contact, answers)} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease }}
      className="text-center"
    >
      <div className="flex justify-center">
        <Image
          src="/images/logo-grovva-v2.png"
          alt="grovva"
          width={400}
          height={160}
          className="h-auto w-[132px] object-contain"
          priority
        />
      </div>

      <p className="mt-6 text-[17px] font-bold text-grovva-ink md:text-[18px]">
        Teste de 1 minuto ⏰:
      </p>
      <h1 className="mx-auto mt-1 max-w-[520px] text-balance text-[20px] font-bold leading-snug text-grovva-ink md:text-[22px]">
        Descubra como <Em>gerar mais agendamentos</Em> e <Em>faturar mais</Em> na sua clínica
      </h1>

      <button
        type="button"
        onClick={onStart}
        aria-label="Iniciar o teste"
        className="mx-auto mt-7 block w-full max-w-[500px] cursor-pointer overflow-hidden rounded-[5px]"
      >
        <Image
          src="/images/quiz-estetica.png"
          alt="Inicie o teste agora"
          width={1000}
          height={1000}
          className="h-auto w-full object-cover"
          priority
        />
      </button>

      <button
        type="button"
        onClick={onStart}
        className="pulse-cta mt-6 w-full cursor-pointer rounded-[6px] bg-[#1FA84C] py-4 text-[15px] font-bold uppercase tracking-[0.04em] text-white transition-colors hover:bg-[#188f41]"
      >
        Começar teste gratuito
      </button>
      <p className="mt-4 text-[13px] text-grovva-muted">
        Saiba como o sistema agenda fácil pode ajudar sua clínica 👆
      </p>
    </motion.div>
  );
}

function StepView({
  step,
  answers,
  contact,
  onSelect,
  onContact,
  onContinue,
  canContinue,
}: {
  step: Step;
  answers: Record<string, string>;
  contact: { name: string; email: string; phone: string; instagram: string };
  onSelect: (key: string, value: string) => void;
  onContact: (c: { name: string; email: string; phone: string; instagram: string }) => void;
  onContinue: () => void;
  canContinue: boolean;
}) {
  return (
    <div className="text-center">
      <h2 className="mx-auto max-w-[480px] text-balance text-[21px] font-bold leading-snug text-grovva-ink md:text-[24px]">
        {step.title}
      </h2>
      {step.subtitle && (
        <p className="mx-auto mt-2 max-w-[420px] text-[14px] text-grovva-muted">{step.subtitle}</p>
      )}
      {step.kind === "input" && step.helper && (
        <p className="mt-2 text-[13px] text-grovva-muted">{step.helper}</p>
      )}

      <div className="mt-7">
        {step.kind === "choice" ? (
          <div className="flex flex-col gap-3">
            {step.options.map((opt, i) => {
              const isSel = answers[step.key] === opt;
              return (
                <motion.button
                  key={opt}
                  type="button"
                  onClick={() => onSelect(step.key, opt)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.04, duration: 0.35, ease }}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-[6px] border px-4 py-3.5 text-left transition-all ${
                    isSel
                      ? "border-grovva-green bg-grovva-green-soft"
                      : "border-grovva-line bg-white hover:border-grovva-green/50"
                  }`}
                >
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isSel ? "border-grovva-green bg-grovva-green" : "border-grovva-line"
                    }`}
                  >
                    {isSel && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" className="size-3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                  <span className="text-[14.5px] font-medium text-grovva-ink">{opt}</span>
                </motion.button>
              );
            })}
          </div>
        ) : (
          <input
            autoFocus
            type={step.type ?? "text"}
            inputMode={step.inputMode}
            value={contact[step.key]}
            onChange={(e) => {
              const v = e.target.value;
              onContact({
                ...contact,
                [step.key]:
                  step.key === "name"
                    ? maskName(v)
                    : step.key === "phone"
                      ? maskPhone(v)
                      : v,
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && canContinue) onContinue();
            }}
            placeholder={step.placeholder}
            className="w-full rounded-[6px] border border-grovva-line bg-white px-4 py-3.5 text-center text-[15px] text-grovva-ink outline-none transition-colors placeholder:text-grovva-subtle focus:border-grovva-green focus:ring-2 focus:ring-grovva-green/20"
          />
        )}

        <button
          type="button"
          onClick={onContinue}
          disabled={!canContinue}
          className="btn-lift mt-3 w-full cursor-pointer rounded-[6px] bg-[#54B277] py-3.5 text-[15px] font-bold text-white hover:bg-[#46a468] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continuar
        </button>

        {step.kind === "input" && step.footer && (
          <p className="mt-4 text-[12px] text-grovva-subtle">{step.footer}</p>
        )}
      </div>
    </div>
  );
}

function Loading({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const DURATION = 2600; // tempo total até 100%
    const STEP = 40;
    let elapsed = 0;
    const id = setInterval(() => {
      elapsed += STEP;
      const t = Math.min(1, elapsed / DURATION);
      const eased = 1 - Math.pow(1 - t, 2); // ease-out, mas sempre chega em 100
      setPct(Math.round(eased * 100));
      if (t >= 1) {
        clearInterval(id);
        setTimeout(() => doneRef.current(), 300);
      }
    }, STEP);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease }}
      className="text-center"
    >
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-grovva-line">
          <motion.div
            className="h-full rounded-full bg-grovva-green"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.3, ease }}
          />
        </div>
        <span className="text-[13px] font-bold text-grovva-ink">{pct}%</span>
      </div>

      <h2 className="mt-6 text-[20px] font-bold text-grovva-ink md:text-[22px]">
        Estamos analisando suas respostas… ⏳
      </h2>
      <p className="mt-1.5 text-[14px] text-grovva-muted">Só um momentinho por favor 🥰</p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={GIF_ANALISANDO}
        alt="Analisando"
        className="mx-auto mt-6 w-full max-w-[480px] object-cover"
      />
    </motion.div>
  );
}

function Final({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <motion.div
      key="final"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
      className="text-center"
    >
      <p className="text-[18px] font-bold text-grovva-green">Perfeito 🤩🥳</p>
      <h2 className="mx-auto mt-1 max-w-[460px] text-[20px] font-bold leading-snug text-grovva-ink md:text-[22px]">
        Sua clínica com certeza pode <Em>gerar mais pacientes</Em><br />com o sistema Grovva Sales
      </h2>
      <p className="mx-auto mt-3 max-w-[440px] text-[14px] text-grovva-muted">
        É só clicar no botão abaixo para falar com um especialista que vai te explicar os próximos
        passos 👇
      </p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={GIF_FINAL}
        alt="Comemoração"
        className="mx-auto mt-6 w-full max-w-[480px] object-cover"
      />

      <p className="mt-3 text-center text-[24px] leading-none" aria-hidden="true">👇👇👇</p>

      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-lift mt-4 block w-full rounded-[6px] bg-[#1FA84C] py-4 text-center text-[15px] font-bold text-white hover:bg-[#188f41]"
      >
        Conversar com especialista
      </Link>
    </motion.div>
  );
}

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 36 : -36 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.38, ease } },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -36 : 36,
    transition: { duration: 0.26, ease },
  }),
};
