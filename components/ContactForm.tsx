"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";

type Status = "idle" | "sending" | "sent" | "error";

const CONTACT_EMAIL = "bacem.kallel@yahoo.com";

export default function ContactForm({ t }: { t: Dictionary["form"] }) {
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
      `${t.mailSubject} — ${data.name ?? ""}${data.company ? ` (${data.company})` : ""}`
    );
    const body = encodeURIComponent(
      `${t.name}: ${data.name ?? ""}\n${t.company}: ${data.company ?? "-"}\n${t.email}: ${data.email ?? ""}\n${t.phone}: ${data.phone ?? "-"}\n\n${t.message}:\n${data.message ?? ""}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.name} htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            placeholder={t.namePlaceholder}
          />
        </Field>
        <Field label={t.company} htmlFor="company">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClass}
            placeholder={t.companyPlaceholder}
          />
        </Field>
        <Field label={t.email} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder={t.emailPlaceholder}
          />
        </Field>
        <Field label={t.phone} htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder={t.phonePlaceholder}
          />
        </Field>
      </div>

      <Field label={t.message} htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClass} !rounded-[20px]`}
          placeholder={t.messagePlaceholder}
        />
      </Field>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
      >
        {status === "sending" ? t.sending : t.send}
      </button>

      {status === "sent" && (
        <p role="status" className="text-[15px] text-ash">
          {t.sent}
        </p>
      )}
    </form>
  );
}

const inputClass =
  "w-full rounded-[32px] border border-ivory/25 bg-transparent px-5 py-3.5 text-ivory placeholder:text-ash/60 outline-none transition-colors focus:border-ivory";

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
      <span className="text-[14px] text-ash">
        {label}
      </span>
      {children}
    </label>
  );
}
