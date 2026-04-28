import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-grovva-dark py-14 md:py-16 relative overflow-hidden">
      {/* ambient gradient */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(600px 260px at 50% 120%, rgba(62,168,92,0.18), transparent 60%)",
        }}
      />
      {/* top hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative container mx-auto px-6 max-w-[1200px]">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <Image
            src="/images/logo-grovva-white-v2.png"
            alt="Grovva"
            width={500}
            height={500}
            className="w-[100px] md:w-[120px] h-auto object-contain"
          />

          {/* Tagline */}
          <p className="text-white/55 text-sm md:text-base -mt-4 text-center max-w-[420px]">
            Vendas para clínicas que querem crescer de verdade.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <Link
              href="https://www.instagram.com/grovvacompany/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="size-11 rounded-full border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-grovva-green hover:bg-grovva-green/10 transition-colors"
            >
              <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="3.2" />
                <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
              </svg>
            </Link>
            <Link
              href="https://linkedin.com/company/grovvaco/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="size-11 rounded-full border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-grovva-green hover:bg-grovva-green/10 transition-colors"
            >
              <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M8 11v5" />
                <path d="M8 8v.01" />
                <path d="M12 16v-5" />
                <path d="M16 16v-3a2 2 0 0 0-4 0" />
              </svg>
            </Link>
          </div>

          {/* Divider */}
          <div className="w-full max-w-[640px] h-px bg-white/10" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full max-w-[640px] gap-3 text-[13px] text-white/50">
            <p>© {new Date().getFullYear()} grovva.com.br</p>
            <p className="text-white/45">
              Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
