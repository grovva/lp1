import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Icon, FeatureRow, SectionHead, type Feature } from "@/components/sections/SectionParts";

/* ===================================================================== */
/* 1 · Como a gente gera demanda (pilares)                                */
/* ===================================================================== */
function Pilares() {
  const features: Feature[] = [
    {
      title: "Estratégia e oferta",
      body: "Antes de subir qualquer anúncio, a gente estuda o seu mercado e o seu público e constrói uma oferta direcionada ao cliente ideal. É a oferta certa que faz o anúncio converter.",
      icon: <Icon><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></Icon>,
    },
    {
      title: "Mídia paga de performance",
      body: "Campanhas em Meta e Google geridas no detalhe pra atrair quem tem intenção real de compra, filtrando curiosos e baixando o custo por oportunidade qualificada.",
      icon: <Icon><path d="M3 3v18h18" /><rect x="7" y="12" width="3" height="6" /><rect x="12" y="8" width="3" height="10" /><rect x="17" y="4" width="3" height="14" /></Icon>,
    },
    {
      title: "Criativos de alta conversão",
      body: "Anúncios testados de forma constante (ângulos, copy e formatos) pra descobrir o que faz o seu público parar, clicar e comprar, e escalar o que funciona.",
      icon: <Icon><path d="M12 2 2 7l10 5 10-5-10-5z" /><path d="m2 17 10 5 10-5M2 12l10 5 10-5" /></Icon>,
    },
    {
      title: "Otimização contínua",
      body: "Acompanhamento próximo, leitura dos números todo dia e ajuste de rota pra cortar o que não traz retorno e investir mais no que está trazendo cliente.",
      icon: <Icon><path d="M21 12a9 9 0 1 1-6.2-8.5" /><path d="M21 3v6h-6" /></Icon>,
    },
  ];

  return (
    <section className="relative py-12 md:py-28" style={{ backgroundColor: "#EEF2F5" }}>
      <div className="container mx-auto max-w-[1200px] px-6">
        <SectionHead
          eyebrow="Geração de demanda"
          lead="Tráfego não é apertar botão e torrar verba. É um sistema de aquisição que junta estratégia, oferta, criativo e dados pra trazer cliente de verdade, com previsibilidade."
        >
          Não é sobre aparecer pra todo mundo.{" "}
          <span className="text-grovva-green-dark">É sobre aparecer pra quem compra.</span>
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
/* 2 · Processo                                                           */
/* ===================================================================== */
function Processo() {
  const steps = [
    {
      n: "01",
      title: "Diagnóstico",
      body: "Entendemos o seu negócio, suas metas e o seu cliente ideal pra saber exatamente quem buscar e com qual mensagem.",
    },
    {
      n: "02",
      title: "Estratégia e oferta",
      body: "Construímos a oferta, os ângulos e os primeiros criativos. Definimos canais, verba e as metas de cada campanha.",
    },
    {
      n: "03",
      title: "Lançamento",
      body: "Subimos as campanhas e começamos a captar leads qualificados, que já entram organizados no seu funil.",
    },
    {
      n: "04",
      title: "Otimização e escala",
      body: "Lemos os números juntos, cortamos o que não funciona e aumentamos a verba no que traz retorno pra crescer com consistência.",
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
          eyebrow="Como funciona"
          lead="Um processo claro, do diagnóstico à escala, pra você sempre saber o que está sendo feito e por quê."
        >
          Previsibilidade vem de{" "}
          <span className="text-grovva-green">método, não de sorte</span>
        </SectionHead>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={0.08 + i * 0.08} y={12}>
              <div
                className="flex h-full flex-col rounded-2xl p-6"
                style={{ background: "linear-gradient(165deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="font-heading text-[26px] font-bold text-grovva-green/80">{s.n}</span>
                <h3 className="mt-3 font-heading text-[17px] font-semibold tracking-[-0.01em] text-white">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/60">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

/* ===================================================================== */
/* 3 · Integração com o sistema                                           */
/* ===================================================================== */
function Integracao() {
  return (
    <section className="relative bg-white py-12 md:py-28">
      <div className="container mx-auto max-w-[1200px] px-6">
        <Reveal>
          <div className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-grovva-line bg-grovva-card-bg p-7 md:grid-cols-[1.3fr_1fr] md:gap-12 md:p-10 lg:p-12">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-grovva-green-dark">
                Growth + Sistema
              </p>
              <h2 className="font-heading text-[26px] font-bold leading-[1.1] tracking-[-0.02em] text-balance text-grovva-ink md:text-[38px]">
                Gerar lead sem processo de vendas{" "}
                <span className="text-grovva-green-dark">é jogar dinheiro fora.</span>
              </h2>
              <p className="mt-5 max-w-[560px] text-base leading-relaxed text-grovva-muted md:text-[17px]">
                Por isso a demanda que a gente gera cai direto no sistema, já
                qualificada e organizada no funil, com follow-up e automações de IA
                cuidando pra que nenhuma oportunidade se perca. Marketing e vendas
                no mesmo lugar é o que torna o crescimento previsível.
              </p>
              <Link href="/sistema" className="btn-primary mt-7">
                Conhecer o sistema
                <svg className="arrow size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m13 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="flex flex-col gap-2.5">
              {["Anúncio atrai o cliente certo", "Lead entra qualificado no funil", "IA faz o follow-up na hora certa", "Time foca em fechar a venda"].map((t, i) => (
                <div key={t} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-grovva-line">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-grovva-green text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-[13px] font-medium text-grovva-text md:text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function GrowthNarrative() {
  return (
    <>
      <Pilares />
      <Processo />
      <Integracao />
    </>
  );
}
