import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-grovva-bg py-16 md:py-24 overflow-hidden relative" style={{ backgroundImage: 'url(/images/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — text content */}
          <div className="flex flex-col gap-6">
            <Image
              src="/images/logo-grovva.png"
              alt="Grovva"
              width={500}
              height={500}
              className="w-[220px] h-auto object-contain"
              priority
            />

            <h1 className="font-heading text-[32px] md:text-[42px] leading-[1.15] text-grovva-text">
              Pare de{" "}
              <strong className="font-bold">depender de indicações</strong> e
              comece a ter{" "}
              <strong className="font-bold">mais pacientes</strong> e{" "}
              <span className="text-grovva-green font-bold">mais vendas</span>{" "}
              na sua clínica
            </h1>

            <p className="text-grovva-muted text-base md:text-lg max-w-[500px]">
              Cadastre-se e descubra como o sistema agenda fácil pode ajudar sua
              clínica a aumentar seu faturamento.
            </p>

            <Link
              href="#cta"
              className="inline-flex items-center justify-center bg-grovva-green hover:bg-grovva-green-dark text-white font-bold text-sm uppercase tracking-wider px-10 py-4 rounded-full w-fit transition-colors"
            >
              Quero mais informações
            </Link>
          </div>

          {/* Right — doctor image with badge */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="relative w-[320px] md:w-[420px] h-[400px] md:h-[500px] rounded-[20px] overflow-hidden bg-grovva-green">
                <Image
                  src="/images/hero-doctor.png"
                  alt="Médica profissional"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 right-0 md:right-4 bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3 max-w-[260px]">
                <div className="size-11 shrink-0 rounded-full bg-grovva-green/10 flex items-center justify-center">
                  <svg className="size-6 text-grovva-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <p className="text-sm text-grovva-text italic leading-snug">
                  <strong>Mais agendamentos</strong> e mais controle do seu
                  faturamento
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
