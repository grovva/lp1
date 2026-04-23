import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  instagram?: string;
  revenue?: string;
};

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { name, email, phone, instagram, revenue } = body;

  if (!name || !email || !phone || !instagram || !revenue) {
    return NextResponse.json(
      { error: "Campos obrigatórios faltando" },
      { status: 400 },
    );
  }

  const endpoint = process.env.SHEETS_ENDPOINT;
  if (!endpoint) {
    console.error("SHEETS_ENDPOINT env var não configurada");
    return NextResponse.json(
      { error: "Endpoint não configurado" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        instagram,
        revenue,
        timestamp: new Date().toISOString(),
        source: req.headers.get("referer") || "direct",
      }),
      redirect: "follow",
    });

    if (!res.ok) {
      throw new Error(`Upstream ${res.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Falha no envio" },
      { status: 502 },
    );
  }
}
