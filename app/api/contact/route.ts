import { NextRequest, NextResponse } from "next/server";

// Option A (utilisée ici) : envoi via l'API Resend (https://resend.com), gratuite
// jusqu'à 3000 emails/mois. Nécessite RESEND_API_KEY et CONTACT_TO_EMAIL dans .env.local
// (voir .env.example). Sans backend, RESEND_API_KEY absente => l'API répond 501 et le
// composant ContactForm bascule automatiquement en Option B.
//
// Option B (fallback, zéro configuration) : le composant ContactForm ouvre un lien
// mailto: prérempli avec les informations du formulaire, ce qui ouvre le client email
// de l'utilisateur. Fonctionne partout, sans service tiers, mais moins fluide côté UX.

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "bacem.kallel@yahoo.com";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "email_not_configured" },
      { status: 501 }
    );
  }

  const body = await request.json();
  const { name, company, email, phone, message } = body as {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Tunicare Solutions <site@tunicaresolutions.com>",
      to: [CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `Nouvelle demande de devis — ${name}${company ? ` (${company})` : ""}`,
      text: `Nom: ${name}\nSociété: ${company || "-"}\nEmail: ${email}\nTéléphone: ${phone || "-"}\n\nMessage:\n${message}`,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
