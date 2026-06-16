import { NextResponse } from "next/server";

export const runtime = "nodejs";

type QuizPayload = {
  name?: string;
  email?: string;
  phone?: string;
  answers?: Record<string, string>;
};

export async function POST(req: Request) {
  let body: QuizPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { name, email, phone, answers = {} } = body;

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Campos obrigatórios faltando" },
      { status: 400 },
    );
  }

  // Persistência é best-effort: o lead já vai conversar no WhatsApp,
  // então uma falha aqui nunca deve bloquear o funil.
  // Mesma planilha do modal do site (SHEETS_ENDPOINT) e mesmo formato de
  // colunas, `faturamento` vira `revenue`; o resto das respostas vai junto.
  const endpoint = process.env.SHEETS_ENDPOINT;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          instagram: "",
          revenue: answers.faturamento || "",
          ...answers,
          form: "quiz",
          timestamp: new Date().toISOString(),
          source: req.headers.get("referer") || "direct",
        }),
        redirect: "follow",
      });
      if (!res.ok) throw new Error(`Upstream ${res.status}`);
    } catch (err) {
      console.error("Quiz API persist error:", err);
    }
  } else {
    console.warn("SHEETS_ENDPOINT não configurada, lead do quiz não persistido");
  }

  await sendLeadToTrackFlow(req, { name, email, phone, answers });

  return NextResponse.json({ ok: true });
}

async function sendLeadToTrackFlow(
  req: Request,
  data: {
    name: string;
    email: string;
    phone: string;
    answers: Record<string, string>;
  },
) {
  const pixelId =
    process.env.NEXT_PUBLIC_TRACKFLOW_PIXEL_ID || process.env.TRACKFLOW_PIXEL_ID;
  if (!pixelId) return;

  const baseUrl =
    process.env.NEXT_PUBLIC_TRACKFLOW_BASE_URL ||
    process.env.TRACKFLOW_BASE_URL ||
    "https://trackflow.grovva.com.br";

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
          content_name: "Quiz Grovva",
          ...data.answers,
        },
      }),
    });
  } catch (err) {
    console.error("TrackFlow Lead error:", err);
  }
}
