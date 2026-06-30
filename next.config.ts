import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.ngrok-free.app",
    "*.ngrok-free.dev",
    "*.ngrok.io",
    "*.ngrok.app",
  ],
  images: {
    qualities: [75, 90],
  },
  // Rota limpa /proposta (e links personalizados /proposta/<nome>) servindo
  // o mesmo HTML estático da proposta comercial
  async rewrites() {
    return [
      { source: "/proposta", destination: "/proposta/index.html" },
      { source: "/proposta/:slug", destination: "/proposta/index.html" },
    ];
  },
  // Proposta comercial não deve ser indexada por buscadores
  async headers() {
    return [
      {
        source: "/proposta/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/proposta",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
