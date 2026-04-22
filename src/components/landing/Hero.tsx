import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white hero-section">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/hero-bg-v2.png)",
          backgroundSize: "auto",
          backgroundPosition: "center -220px",
          backgroundRepeat: "no-repeat",
          opacity: 0.5,
        }}
      />
      <div className="relative z-[2] container mx-auto px-6 max-w-[1200px] pt-10 pb-14 md:pt-20 md:pb-28">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          {/* Left — text content */}
          <div className="flex flex-col gap-5">
            <Image
              src="/images/logo-grovva-v2.png"
              alt="Grovva"
              width={500}
              height={500}
              className="w-[170px] sm:w-[200px] md:w-[230px] h-auto object-contain mb-2"
              priority
            />

            <h1 className="font-heading font-medium text-[34px] sm:text-[38px] md:text-[46px] leading-[1.08] tracking-[-0.02em] text-grovva-text text-balance">
              Pare de <strong className="font-bold">depender de indicações</strong> e comece a ter <strong className="font-bold whitespace-nowrap">mais pacientes</strong> e{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10 text-grovva-green font-bold">mais vendas</span>
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 bottom-[0.08em] h-[0.3em] bg-grovva-green/20 -skew-x-6 z-0"
                />
              </span>{" "}
              na sua clínica
            </h1>

            <p className="text-grovva-muted text-base md:text-[17px] leading-relaxed max-w-[520px]">
              Cadastre-se e descubra como o sistema da grovva pode ajudar
              sua clínica a aumentar seu faturamento.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-1">
              <button type="button" data-contact-cta="true" className="btn-primary w-fit">
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
          </div>

          {/* Right — doctor image with floating badges */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* framed card — thicker paper border, asymmetric corners */}
              <div
                className="relative bg-grovva-paper p-4 sm:p-6 md:p-7 shadow-[0_40px_80px_-20px_rgba(15,27,20,0.32),0_20px_40px_-18px_rgba(15,27,20,0.18),0_6px_14px_-6px_rgba(15,27,20,0.08)]"
                style={{ borderRadius: "40px 0 72px" }}
              >
                <div
                  className="relative w-[260px] sm:w-[320px] md:w-[440px] h-[340px] sm:h-[420px] md:h-[540px] overflow-hidden bg-grovva-green"
                  style={{ borderRadius: "28px 0 52px" }}
                >
                  <Image
                    src="/images/hero-doctor-v2.png"
                    alt="Fisioterapeuta profissional"
                    fill
                    sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, 440px"
                    className="object-cover object-top"
                    priority
                  />
                  {/* subtle top vignette */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-grovva-ink/25" />
                </div>
              </div>

              {/* Bottom-right floating badge */}
              <div className="absolute -bottom-4 md:-bottom-5 right-0 md:right-4 bg-white rounded-2xl shadow-[0_18px_40px_-16px_rgba(15,27,20,0.2)] px-4 py-3 md:px-5 md:py-3.5 flex items-center gap-3 max-w-[240px] md:max-w-[280px] border border-grovva-line">
                <div className="size-10 shrink-0 rounded-full bg-grovva-green flex items-center justify-center">
                  <svg
                    className="size-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <p className="text-[13px] text-grovva-text leading-snug">
                  <span className="font-semibold">Mais agendamentos</span> e
                  mais controle do faturamento
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
