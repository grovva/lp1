import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const painPoints: { icon: ReactNode; title: string; description: string }[] = [
  {
    icon: (
      <svg className="size-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "SUA RECEPÇÃO NÃO SABE VENDER",
    description:
      "Sua recepção tem medo do contato direto com o cliente, evita até fazer ligação com medo de ouvir um não ou estragar tudo.",
  },
  {
    icon: (
      <svg className="size-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "SEM PROCESSO, NÃO TEM VENDA",
    description:
      "Se o paciente não chega praticamente pedindo para agendar, sua equipe não sabe gerar interesse no lead e ele fecha com o concorrente.",
  },
  {
    icon: (
      <svg className="size-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    title: "AGÊNCIA PROMETEU E NÃO ENTREGOU",
    description:
      "Prometeram agenda cheia e resultados extraordinários, no fim sobrou relatório bonito, curtida e seguidor. Paciente novo, zero.",
  },
];

export function PainPoints() {
  return (
    <section className="py-16 md:py-24 bg-grovva-bg">
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Heading */}
        <h2 className="font-heading text-[28px] md:text-[38px] leading-[1.2] text-grovva-text mb-10 max-w-[700px]">
          Sua clínica não tem{" "}
          <strong className="font-bold">lucro, previsibilidade</strong>
          <br />
          <span className="inline-block mt-1">
            e{" "}
            <span className="bg-grovva-green text-white px-3 py-1 rounded-sm font-bold">
              nem escala
            </span>{" "}
            <span className="font-normal">por isso</span>
          </span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — pain point cards */}
          <div className="flex flex-col gap-4">
            {painPoints.map((point) => (
              <div
                key={point.title}
                className="bg-white rounded-2xl p-5 flex items-start gap-4 border border-gray-100"
              >
                <div className="size-10 shrink-0 rounded-full bg-grovva-green flex items-center justify-center mt-0.5">
                  {point.icon}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm md:text-base uppercase text-grovva-text mb-1">
                    {point.title}
                  </h3>
                  <p className="text-grovva-muted text-sm italic leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}

            <Link
              href="#cta"
              className="inline-flex items-center justify-center bg-grovva-green hover:bg-grovva-green-dark text-white font-bold text-sm uppercase tracking-wider px-10 py-4 rounded-full w-fit transition-colors mt-2"
            >
              Quero mais informações
            </Link>
          </div>

          {/* Right — circular image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative size-[320px] md:size-[440px] rounded-full border-2 border-grovva-green/30 flex items-center justify-center">
              <div className="size-[280px] md:size-[380px] rounded-full overflow-hidden">
                <Image
                  src="/images/pain-woman.png"
                  alt="Profissional frustrada"
                  width={380}
                  height={380}
                  className="size-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
