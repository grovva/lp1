import { Reveal } from "@/components/motion/Reveal";
import { Icon, FeatureRow, SectionHead, type Feature } from "@/components/sections/SectionParts";

/* ===================================================================== */
/* 2 · Único por cliente — personalização profunda                        */
/* ===================================================================== */
function Personalizacao() {
  const features: Feature[] = [
    {
      title: "Campos personalizados sem limite",
      body: "Crie quantos campos quiser (texto, número, data, moeda, seleção, responsável), torne-os obrigatórios por etapa do funil e mostre cada um só pra quem precisa ver.",
      icon: <Icon><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></Icon>,
    },
    {
      title: "O funil exatamente como você vende",
      body: "Monte pipelines e etapas do seu jeito, com probabilidade de fechamento por etapa e alerta automático quando um lead fica parado tempo demais.",
      icon: <Icon><path d="M3 6h18M6 12h12M10 18h4" /></Icon>,
    },
    {
      title: "Permissões cirúrgicas",
      body: "Controle no detalhe quem enxerga o quê: faturamento, previsão, saldo, indicadores, os leads do time todo ou só os seus. Cada papel vê o necessário.",
      icon: <Icon><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></Icon>,
    },
    {
      title: "A IA com a voz da sua marca",
      body: "Defina a personalidade, o tom e os textos do atendimento por IA pra soar como o seu negócio fala, não como um robô genérico de prateleira.",
      icon: <Icon><path d="M12 2a2 2 0 0 1 2 2v1a7 7 0 0 1 5 6.7V17l2 2H3l2-2v-5.3A7 7 0 0 1 10 5V4a2 2 0 0 1 2-2z" /></Icon>,
    },
  ];

  return (
    <section className="relative py-12 md:py-28" style={{ backgroundColor: "#EEF2F5" }}>
      <div className="container mx-auto max-w-[1200px] px-6">
        <SectionHead
          eyebrow="Personalização"
          lead="Cada operação tem o seu funil, os seus dados e as suas regras. Em vez de te encaixar num template, a gente configura o sistema em cima do seu processo real, no detalhe."
        >
          O sistema se molda ao seu jeito de vender.{" "}
          <span className="text-grovva-green-dark">Nunca o contrário.</span>
        </SectionHead>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {features.map((f, i) => (
            <FeatureRow key={f.title} f={f} delay={0.1 + i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================================================================== */
/* 3 · Cresce com você (modular)                                          */
/* ===================================================================== */
function Modular() {
  const modules = [
    "Pipeline de vendas",
    "Agenda e agendamentos",
    "Contatos e histórico",
    "Segmentação de leads",
    "Financeiro e comissões",
    "Tarefas do time",
    "Automações",
    "Indicadores e metas",
  ];

  return (
    <section className="relative bg-white py-12 md:py-28">
      <div className="container mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-grovva-green-dark">
                Modular
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-heading text-[28px] font-bold leading-[1.08] tracking-[-0.025em] text-balance text-grovva-ink md:text-[40px]">
                Começa com o essencial.{" "}
                <span className="text-grovva-green-dark">Ganha módulos conforme cresce.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-[520px] text-base leading-relaxed text-grovva-muted md:text-[17px]">
                Você liga e desliga funcionalidades conforme a necessidade e paga
                pelo que usa. Nada de trocar de ferramenta a cada fase do
                crescimento, nada de migração, nada de perder histórico. Precisou de
                algo novo? O módulo entra sob demanda e o resto continua igual.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="rounded-3xl border border-grovva-line bg-grovva-card-bg p-5 md:p-7">
              <div className="grid grid-cols-2 gap-2.5">
                {modules.map((m) => (
                  <div key={m} className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-3.5 ring-1 ring-grovva-line">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-grovva-green text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="size-3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <span className="text-[13px] font-medium text-grovva-text md:text-sm">{m}</span>
                  </div>
                ))}
                <div className="col-span-2 flex items-center gap-2.5 rounded-xl border border-dashed border-grovva-green/40 bg-grovva-green-soft/40 px-4 py-3.5">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-grovva-green/15 text-grovva-green-dark">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-3.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                  <span className="text-[13px] font-medium text-grovva-green-dark md:text-sm">
                    Novos módulos sob demanda
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================== */
/* 4 · Automações com IA de encaixe (centerpiece detalhado)               */
/* ===================================================================== */
function Automacoes() {
  const features: Feature[] = [
    {
      title: "Um gatilho pra cada momento",
      body: "Mais de 20 eventos disparam automações: lead criado, mudou de etapa, agendamento concluído, cliente fez aniversário, oportunidade esfriou, ficou sem resposta. O sistema percebe e reage sozinho.",
      icon: <Icon><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></Icon>,
    },
    {
      title: "Condições e ações encadeadas",
      body: "Monte regras como 'se o lead está na etapa X, tem a tag Y e vale mais de Z': o sistema cria tarefa, move no funil, agenda um lembrete ou chama um sistema externo, em sequência.",
      icon: <Icon><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M3 15v4a2 2 0 0 0 2 2h4m6 0h4a2 2 0 0 0 2-2v-4" /></Icon>,
    },
    {
      title: "Recuperação de leads frios",
      body: "Quando uma oportunidade esfria, a IA reativa no momento certo e move pra uma etapa de reengajamento, com abordagem individual, sem disparo em massa e sem incomodar.",
      icon: <Icon><path d="M21 12a9 9 0 1 1-3-6.7L21 8" /><path d="M21 3v5h-5" /></Icon>,
    },
    {
      title: "Pós-venda no piloto automático",
      body: "Retorno, renovação e pesquisa de satisfação ficam amarrados a cada serviço, com a data certa. A resposta do cliente vira automaticamente um novo lead no funil.",
      icon: <Icon><path d="M20 6 9 17l-5-5" /><circle cx="12" cy="12" r="10" /></Icon>,
    },
    {
      title: "Agenda que se cuida sozinha",
      body: "Lembretes em camadas (48h, 24h e 4h antes), confirmação do cliente e alerta pro time. Cancelou? A vaga é oferecida automaticamente pra fila de espera.",
      icon: <Icon><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></Icon>,
    },
    {
      title: "IA que sabe a hora de chamar o humano",
      body: "Fluxos com inteligência artificial que qualificam, respondem e coletam os dados do lead, e passam a conversa pra uma pessoa do time no momento em que ela precisa de gente.",
      icon: <Icon><path d="M12 8V4H8" /><rect x="4" y="8" width="16" height="12" rx="2" /><path d="M2 14h2M20 14h2M15 13v2M9 13v2" /></Icon>,
    },
  ];

  return (
    <section
      className="relative overflow-hidden py-12 md:py-32 text-white"
      style={{
        background:
          "radial-gradient(900px 600px at 50% 0%, rgba(20, 84, 91, 0.5), transparent 70%), linear-gradient(180deg, #0a1814 0%, #060d0a 100%)",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container mx-auto max-w-[1200px] px-6">
        <SectionHead
          dark
          eyebrow="Automações com IA"
          lead="Não é um chatbot solto. É um motor de automação que entende o que acontece no seu funil e age na hora certa, do primeiro contato ao pós-venda, sempre desenhado em cima do seu processo."
        >
          A IA se encaixa na sua operação e{" "}
          <span className="text-grovva-green">trabalha junto com o time</span>
        </SectionHead>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureRow key={f.title} f={f} dark delay={0.08 + (i % 3) * 0.08} />
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

/* ===================================================================== */
/* 5 · Inteligência — dados, previsão e controle                          */
/* ===================================================================== */
function Inteligencia() {
  const features: Feature[] = [
    {
      title: "Previsão de receita ponderada",
      body: "Cada negócio entra na conta multiplicado pela probabilidade da etapa. Você vê o pipeline total, o cenário realista, o que está pra fechar e o que já fechou no período.",
      icon: <Icon><path d="M3 3v18h18" /><path d="m7 14 4-4 4 4 5-5" /><path d="M17 9h4v4" /></Icon>,
    },
    {
      title: "Análise de funil",
      body: "Conversão etapa a etapa e tempo médio em cada uma, pra você achar exatamente onde as vendas estão travando e agir antes de perder a oportunidade.",
      icon: <Icon><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" /></Icon>,
    },
    {
      title: "Fluxo de caixa projetado",
      body: "Projeção de 30, 60 e 90 dias, contas a receber organizadas por idade do vencimento e lançamentos recorrentes que se geram sozinhos na data certa.",
      icon: <Icon><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></Icon>,
    },
    {
      title: "Comissões que se calculam",
      body: "Regras por vendedor, produto ou funil, com aceleradores por meta batida e estorno quando o negócio cai. Calculado e fechado automaticamente, sem planilha.",
      icon: <Icon><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></Icon>,
    },
    {
      title: "Origem de cada lead",
      body: "Saiba de qual canal cada oportunidade veio e descubra, com número na mão, onde vale a pena investir mais pra crescer.",
      icon: <Icon><circle cx="12" cy="12" r="10" /><path d="M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20M2 12h20" /></Icon>,
    },
    {
      title: "Pronto pra operar sério",
      body: "Trilha de auditoria de cada ação, consentimento de LGPD por contato e login com verificação em duas etapas. Segurança de quem leva o negócio a sério.",
      icon: <Icon><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></Icon>,
    },
  ];

  return (
    <section className="relative py-12 md:py-28" style={{ backgroundColor: "#EEF2F5" }}>
      <div className="container mx-auto max-w-[1200px] px-6">
        <SectionHead
          eyebrow="Dados e previsibilidade"
          lead="Mais do que relatório bonito: previsão de receita, gargalos do funil e fluxo de caixa em tempo real, pra você decidir com base no que vai acontecer, e não só no que já passou."
        >
          Os números que mostram pra onde o crescimento vai,{" "}
          <span className="text-grovva-green-dark">não só pra onde ele foi.</span>
        </SectionHead>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureRow key={f.title} f={f} delay={0.08 + (i % 3) * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SistemaNarrative() {
  return (
    <>
      <Personalizacao />
      <Modular />
      <Automacoes />
      <Inteligencia />
    </>
  );
}
