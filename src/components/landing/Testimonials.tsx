import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    name: "Douglas Melo",
    avatar: "/images/avatar-douglas.jpg",
    text: "Trabalho fantástico do time da Grovva, tive um crescimento nas minhas vendas muito expressivo desde que comecei a parceria com eles.",
  },
  {
    name: "Maytê Zaiden",
    avatar: "/images/avatar-mayte.png",
    text: "Eles redesenharam do zero o meu funil de vendas redefiniram alguns processos e logo no primeiro mês eu quase dobre o faturamento da minha empresa.",
  },
  {
    name: "Átila Venturino",
    avatar: "/images/avatar-atila.png",
    text: "Já estamos juntos nessa parceria há mais de 2 anos e simplesmente eles revolucionaram a minha clínica, desde a parte de anúncios até a parte do atendimento.",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="size-4 text-grovva-green fill-grovva-green"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-grovva-bg">
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-[28px] md:text-[38px] leading-[1.2] text-grovva-text">
            <strong className="font-bold">Quem confia</strong>
            <br />
            <span className="font-normal">na Grovva</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border border-gray-100 p-6 relative"
            >
              {/* Quote mark */}
              <div className="absolute top-4 right-6 text-grovva-green text-5xl font-heading font-bold leading-none select-none">
                &ldquo;
              </div>

              {/* Avatar + name */}
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-heading font-bold text-grovva-text italic">
                    {t.name}
                  </p>
                  <StarRating />
                </div>
              </div>

              {/* Testimonial text */}
              <p className="text-grovva-muted text-sm leading-relaxed">
                {t.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12" id="cta">
          <Link
            href="#cta"
            className="inline-flex items-center justify-center bg-grovva-green hover:bg-grovva-green-dark text-white font-bold text-sm uppercase tracking-wider px-12 py-4 rounded-full transition-colors"
          >
            Quero mais informações
          </Link>
        </div>
      </div>
    </section>
  );
}
