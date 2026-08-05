"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const CONTACT_EMAIL = "bacem.kallel@yahoo.com";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("sent");
        form.reset();
        return;
      }

      // Fallback : aucun service d'email configuré (ou envoi échoué) -> mailto:
      openMailtoFallback(data);
      setStatus("sent");
      form.reset();
    } catch {
      openMailtoFallback(data);
      setStatus("sent");
      form.reset();
    }
  }

  function openMailtoFallback(data: Record<string, FormDataEntryValue>) {
    const subject = encodeURIComponent(
      `Demande de devis — ${data.name ?? ""}${data.company ? ` (${data.company})` : ""}`
    );
    const body = encodeURIComponent(
      `Nom: ${data.name ?? ""}\nSociété: ${data.company ?? "-"}\nEmail: ${data.email ?? ""}\nTéléphone: ${data.phone ?? "-"}\n\nMessage:\n${data.message ?? ""}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom complet" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Votre nom"
          />
        </Field>
        <Field label="Société" htmlFor="company">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClass}
            placeholder="Clinique, hôpital, cabinet…"
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="vous@exemple.com"
          />
        </Field>
        <Field label="Téléphone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="+216 ..."
          />
        </Field>
      </div>

      <Field label="Message" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClass}
          placeholder="Décrivez votre besoin en matériel médico-chirurgical…"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-fit rounded-full bg-coral px-8 py-3.5 font-display text-sm font-semibold text-white shadow-lg shadow-coral/30 transition-all hover:scale-105 hover:shadow-coral/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer la demande"}
      </button>

      {status === "sent" && (
        <p role="status" className="text-sm font-medium text-brand">
          Merci ! Votre demande a été transmise, nous revenons vers vous
          rapidement.
        </p>
      )}
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-deep/15 bg-white px-4 py-3 text-deep placeholder:text-deep/35 outline-none transition-colors focus:border-cyan focus:ring-2 focus:ring-cyan/30";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="font-display text-sm font-medium text-deep/80">
        {label}
      </span>
      {children}
    </label>
  );
}
