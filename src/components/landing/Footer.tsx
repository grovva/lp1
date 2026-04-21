import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-grovva-dark py-10">
      <div className="container mx-auto px-4 max-w-[1200px] flex flex-col items-center gap-6">
        {/* Logo as styled text */}
        <span className="font-heading text-white text-3xl font-bold tracking-tight">
          grovva<span className="text-grovva-green">.</span>
        </span>

        {/* Divider */}
        <div className="w-48 h-px bg-white/20" />

        {/* Social icons */}
        <div className="flex items-center gap-4">
          <Link
            href="https://www.instagram.com/grovva.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="size-10 rounded-full border border-grovva-green flex items-center justify-center hover:bg-grovva-green/10 transition-colors"
          >
            <svg className="size-5 text-grovva-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4l0-8" />
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
              <path d="M16.5 7.5v.01" />
            </svg>
          </Link>
          <Link
            href="https://linkedin.com/company/grovvaco/"
            target="_blank"
            rel="noopener noreferrer"
            className="size-10 rounded-full border border-grovva-green flex items-center justify-center hover:bg-grovva-green/10 transition-colors"
          >
            <svg className="size-5 text-grovva-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4m0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2z" />
              <path d="M8 11l0 5" />
              <path d="M8 8l0 .01" />
              <path d="M12 16l0-5" />
              <path d="M16 16v-3a2 2 0 0 0-4 0" />
            </svg>
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 italic">
          <p>Copyright © Grovva.co</p>
          <p>Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
