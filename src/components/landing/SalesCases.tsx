import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

type Case = {
  id: string;
  name: string;
  role: string;
  image: string;
  bullet: string;
  desafio: string;
  oQueFizemos: string;
  resultado: string;
};

const cases: Case[] = [
  {
    id: "andrea",
    name: "Andréa Vallis",
    role: "Especialista no mercado imobiliário de São Paulo",
    image: "/images/cases/andrea.png",
    bullet: "65.106% de ROI em menos de 15 dias",
    desafio:
      "Vender um apartamento no Itaim Bibi, em São Paulo, com velocidade e sem depender de indicação.",
    oQueFizemos:
      "Estudamos o mercado, construímos uma oferta direcionada ao perfil do comprador ideal e desenvolvemos criativos de alta conversão. Em menos de 15 dias a unidade foi vendida no lançamento.",
    resultado: "R$ 983 investidos e R$ 640.000 em receita gerada.",
  },
  {
    id: "thiago",
    name: "Thiago Costa",
    role: "Pátria Cidadania",
    image: "/images/cases/thiago.png",
    bullet: "10x de faturamento em 60 dias",
    desafio:
      "A Pátria Cidadania estava travada no mesmo patamar de faturamento e não conseguia escalar além dos R$ 100K mensais.",
    oQueFizemos:
      "Construímos uma estrutura completa de geração de demanda com anúncios qualificados, implementamos o CRM e configuramos automações de follow-up para que nenhuma oportunidade fosse perdida pelo time comercial.",
    resultado:
      "No segundo mês de parceria a empresa atingiu R$ 1.000.000 de faturamento, 10x acima do ponto de partida.",
  },
  {
    id: "atila",
    name: "Dr. Átila Venturino",
    role: "Nova Clin Fisio",
    image: "/images/cases/atila.png",
    bullet: "+4.000 pacientes gerados e +R$ 300K em faturamento",
    desafio:
      "A Nova Clin Fisio dependia exclusivamente de indicações para atrair novos pacientes, sem presença em anúncios e sem previsibilidade de crescimento.",
    oQueFizemos:
      "Estruturamos toda a operação de mídia paga do zero: estudo do público da região, construção de oferta direcionada e lançamento das primeiras campanhas, um trabalho que evoluiu e se consolidou ao longo do tempo.",
    resultado:
      "Três anos de parceria, mais de 4.000 pacientes gerados através dos anúncios com faturamento superior a R$ 300.000.",
  },
  {
    id: "douglas",
    name: "Douglas Oliveira",
    role: "Parket",
    image: "/images/cases/douglas.png",
    bullet: "+8.000 seguidores e R$ 1,2M em contratos fechados em 60 dias",
    desafio:
      "A Parket precisava crescer sua presença digital e ao mesmo tempo transformar esse crescimento no Instagram em contratos fechados, dois objetivos que a maioria das agências trata de forma separada.",
    oQueFizemos:
      "Estudamos o público, estruturamos os conteúdos do perfil para impulsionamento via anúncios e montamos em paralelo uma estratégia dedicada à geração de leads qualificados.",
    resultado:
      "Em 60 dias: mais de 8.000 novos seguidores no Instagram e R$ 1.200.000 em contratos de serviço fechados.",
  },
];

function VisualPanel({ c }: { c: Case }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-grovva-card-bg">
      <Image
        src={c.image}
        alt={c.name}
        fill
        sizes="(max-width: 768px) 100vw, 600px"
        quality={90}
        className="object-cover"
      />

      {/* Bullet metric alinhado na parte inferior da imagem */}
      <div className="absolute bottom-4 md:bottom-5 left-4 md:left-5 right-4 md:right-5">
        <div className="rounded-xl bg-white/95 backdrop-blur-sm px-4 py-3 shadow-xl">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-grovva-green-dark">
            Resultado
          </p>
          <p className="mt-1 font-heading font-bold text-grovva-ink text-base md:text-lg leading-tight">
            {c.bullet}
          </p>
        </div>
      </div>
    </div>
  );
}

export function SalesCases() {
  return (
    <section id="cases" className="bg-white py-12 md:py-32 scroll-mt-20">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Header */}
        <div className="text-center max-w-[900px] mx-auto mb-12 md:mb-16">
          <Reveal>
            <h2 className="font-heading font-bold text-[32px] md:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.025em] text-grovva-ink text-balance">
              Isso que o sistema Grovva Sales pode fazer{" "}
              <span className="text-grovva-green-dark">no seu negócio</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-grovva-muted text-base md:text-[17px] leading-relaxed max-w-[820px] mx-auto">
              O nosso único objetivo é fazer com que cada venda do seu negócio
              seja previsível, lucrativa e recorrente. E não precisa acreditar
              só nas nossas palavras, veja as histórias de quem já chegou lá:
            </p>
          </Reveal>
        </div>

        {/* Cases, sticky deck stack (só em md+, no mobile vira scroll normal) */}
        <div className="space-y-4 md:space-y-6">
          {cases.map((c, i) => (
            <div
              key={c.id}
              className="md:sticky"
              style={{ top: `${80 + i * 12}px` }}
            >
              <article
                className="rounded-3xl bg-white p-6 md:p-8 grid md:grid-cols-2 gap-6 md:gap-10 items-center"
                style={{
                  boxShadow: "0 20px 60px -20px rgba(15, 27, 20, 0.18)",
                  border: "1px solid #E4DFD5",
                }}
              >
                {/* LEFT, visual panel */}
                <VisualPanel c={c} />

                {/* RIGHT, content */}
                <div className="flex flex-col gap-5">
                  {/* Name + role */}
                  <div>
                    <p className="font-heading font-bold text-grovva-ink text-lg md:text-xl leading-tight">
                      {c.name}
                    </p>
                    <p className="mt-0.5 text-grovva-muted text-sm leading-snug">
                      {c.role}
                    </p>
                  </div>

                  {/* 3 narrative sections */}
                  <div className="space-y-4">
                    <div>
                      <p className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-grovva-green-dark mb-1.5">
                        <span className="size-1.5 rounded-full bg-grovva-green" />
                        O desafio
                      </p>
                      <p className="text-grovva-muted text-[13.5px] md:text-[14px] leading-relaxed">
                        {c.desafio}
                      </p>
                    </div>
                    <div>
                      <p className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-grovva-green-dark mb-1.5">
                        <span className="size-1.5 rounded-full bg-grovva-green" />
                        O que fizemos
                      </p>
                      <p className="text-grovva-muted text-[13.5px] md:text-[14px] leading-relaxed">
                        {c.oQueFizemos}
                      </p>
                    </div>
                    <div>
                      <p className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-grovva-green-dark mb-1.5">
                        <span className="size-1.5 rounded-full bg-grovva-green" />
                        O resultado
                      </p>
                      <p className="text-grovva-ink text-[13.5px] md:text-[14px] leading-relaxed font-medium">
                        {c.resultado}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
          {/* Scroll dwell, só faz sentido no desktop, no mobile não tem deck */}
          <div aria-hidden="true" className="hidden md:block h-[15vh]" />
        </div>
      </div>
    </section>
  );
}
