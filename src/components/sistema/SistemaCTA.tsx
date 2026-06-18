import { Reveal } from "@/components/motion/Reveal";

export function SistemaCTA() {
  return (
    <section className="relative bg-grovva-bg py-12 md:py-28">
      <div className="container mx-auto max-w-[1200px] px-6">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl px-6 py-14 text-center md:px-12 md:py-20"
            style={{
              background:
                "radial-gradient(700px 400px at 50% 0%, rgba(62,168,92,0.25), transparent 70%), linear-gradient(180deg, #0a1814 0%, #060d0a 100%)",
            }}
          >
            <h2 className="mx-auto max-w-[720px] font-heading text-[28px] font-bold leading-[1.08] tracking-[-0.025em] text-balance text-white md:text-[42px]">
              Vamos montar o sistema{" "}
              <span className="text-grovva-green">da sua operação</span>?
            </h2>
            <p className="mx-auto mt-5 max-w-[560px] text-base leading-relaxed text-white/60 md:text-[17px]">
              Conta pra gente como o seu negócio vende hoje e desenhamos o sistema,
              com as automações de IA que fazem sentido pra você.
            </p>
            <div className="mt-9 flex justify-center">
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
                <svg className="arrow size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m13 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
