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

    await sendLeadToTrackFlow(req, { name, email, phone, instagram, revenue });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Falha no envio" },
      { status: 502 },
    );
  }
}

async function sendLeadToTrackFlow(
  req: Request,
  data: {
    name: string;
    email: string;
    phone: string;
    instagram: string;
    revenue: string;
  },
) {
  const pixelId = process.env.TRACKFLOW_PIXEL_ID;
  if (!pixelId) return;

  const baseUrl =
    process.env.TRACKFLOW_BASE_URL || "https://trackflow.grovva.com.br";

  const cookies = req.headers.get("cookie") || "";
  const fbp = cookies.match(/(?:^|;\s*)_fbp=([^;]+)/)?.[1];
  const fbc = cookies.match(/(?:^|;\s*)_fbc=([^;]+)/)?.[1];

  const forwardedFor = req.headers.get("x-forwarded-for") || "";
  const ip = forwardedFor.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "";
  const ua = req.headers.get("user-agent") || "";

  const [firstName, ...rest] = data.name.trim().split(/\s+/);
  const lastName = rest.join(" ");

  try {
    await fetch(`${baseUrl}/api/events/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "Lead",
        pixel_id: pixelId,
        source_url: req.headers.get("referer") || undefined,
        action_source: "website",
        user_data: {
          email: data.email,
          phone: data.phone,
          first_name: firstName,
          last_name: lastName || undefined,
          client_ip_address: ip || undefined,
          client_user_agent: ua,
          fbp,
          fbc,
        },
        custom_data: {
          content_name: "LP Grovva",
          instagram: data.instagram,
          revenue: data.revenue,
        },
      }),
    });
  } catch (err) {
    console.error("TrackFlow Lead error:", err);
  }
}
