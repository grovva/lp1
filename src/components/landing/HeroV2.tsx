import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

const preHeadlineBullets = [
  "+4000 pacientes gerados",
  "+ Controle do seu faturamento",
  "+ Controle da sua agenda",
];

const chipBullets: { icon: React.ReactNode; label: string }[] = [
  {
    label: "Estratégia sob medida para a sua clínica",
    icon: (
      <svg
        className="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L12 14.2l-4.77 2.51.91-5.32L4.27 7.62l5.34-.78L12 2z" />
      </svg>
    ),
  },
  {
    label: "Aumente seu faturamento recorrente",
    icon: (
      <svg
        className="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
];

export function HeroV2() {
  return (
    <section
      className="relative overflow-hidden bg-grovva-dark text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 0%, rgba(62,168,92,0.12), transparent 50%), radial-gradient(circle at 80% 100%, rgba(62,168,92,0.08), transparent 55%), radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)",
        backgroundSize: "auto, auto, 22px 22px",
        backgroundPosition: "center, center, 0 0",
      }}
    >
      {/* bottom edge fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 bottom-0 h-24 md:h-32"
        style={{
          background:
            "linear-gradient(to bottom, rgba(14,22,17,0) 0%, var(--color-grovva-dark) 100%)",
        }}
      />

      <div className="relative container mx-auto px-6 max-w-[1200px] pt-8 pb-20 md:pt-12 md:pb-32 text-center">
        {/* Logo */}
        <Reveal delay={0.05}>
          <Image
            src="/images/logo-grovva-white-v2.png"
            alt="Grovva"
            width={500}
            height={500}
            className="w-[120px] md:w-[140px] h-auto object-contain mx-auto mb-5 md:mb-14"
            priority
          />
        </Reveal>

        {/* Pré-headline chips */}
        <div className="mb-6 md:mb-10 grid grid-cols-2 gap-1.5 max-w-[360px] mx-auto md:flex md:flex-wrap md:items-center md:justify-center md:gap-2.5 md:max-w-none">
          {preHeadlineBullets.map((b, i) => (
            <Reveal
              key={b}
              delay={0.15 + i * 0.06}
              y={10}
              className={`flex justify-center ${i === 2 ? "col-span-2 md:col-span-1" : ""}`}
            >
              <span className="inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-grovva-green/40 bg-grovva-green/[0.08] px-2 py-1 md:px-3.5 md:py-1.5 text-[10px] md:text-[13px] text-grovva-green font-medium whitespace-nowrap">
                <span className="size-1 md:size-1.5 rounded-full bg-grovva-green" />
                {b}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Headline */}
        <Reveal delay={0.35}>
          <h1 className="font-heading font-bold text-[28px] sm:text-[34px] md:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.025em] text-balance max-w-[780px] mx-auto">
            <span className="text-white">
              Pare de depender de indicações e comece a ter
            </span>{" "}
            <span className="text-grovva-green">
              mais pacientes e mais vendas na sua clínica
            </span>
          </h1>
        </Reveal>

        {/* Subheadline */}
        <Reveal delay={0.5}>
          <p className="mt-8 md:mt-10 text-white/65 text-base md:text-[17px] leading-relaxed max-w-[680px] mx-auto">
            Cadastre-se e descubra como um sistema sob medida pode ajudar
            sua clínica a atrair novos pacientes e aumentar seus atendimentos.
          </p>
        </Reveal>

        {/* Chip bullets */}
        <div className="mt-6 md:mt-10 grid grid-cols-2 md:flex md:flex-wrap md:items-center md:justify-center gap-2 md:gap-4 max-w-[420px] md:max-w-none mx-auto">
          {chipBullets.map((c, i) => (
            <Reveal key={c.label} delay={0.6 + i * 0.08} y={10}>
              <div className="flex items-center gap-1.5 md:gap-2.5 rounded-full border border-white/10 bg-white/[0.04] pl-1.5 pr-3 py-1 md:pl-2 md:pr-4 md:py-2 text-[10px] md:text-[14px] text-white/85 leading-tight text-left">
                <span className="size-5 md:size-7 shrink-0 rounded-full bg-grovva-green/20 text-grovva-green flex items-center justify-center [&>svg]:size-3 md:[&>svg]:size-4">
                  {c.icon}
                </span>
                {c.label}
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.8}>
          <div className="mt-10 md:mt-12 flex justify-center">
            <button
              type="button"
              data-contact-cta="true"
              className="btn-primary"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(62,168,92,0.25), 0 18px 40px -10px rgba(62,168,92,0.55)",
              }}
            >
              Quero mais informações
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
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
