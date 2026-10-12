import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import type { Dictionary } from "@/lib/dictionaries";

export default function Contact({ t }: { t: Dictionary }) {
  const c = t.contact;
  const coordonnees = [
    { label: c.phone, value: "+216 23 198 831", href: "tel:+21623198831" },
    { label: c.email, value: "bacem.kallel@yahoo.com", href: "mailto:bacem.kallel@yahoo.com" },
    { label: c.address, value: c.addressValue },
  ];

  return (
    <section id="contact" className="section bg-canvas">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal className="max-w-[640px]">
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="font-wide mt-5 text-[clamp(28px,3.4vw,42px)] leading-[1.15]">
            {c.title}
          </h2>
          <p className="mt-5 text-[18px] leading-[1.35] text-ash">
            {c.text}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="card p-6 md:p-10">
              <ContactForm t={t.form} />
            </div>
          </Reveal>

          <Reveal delay={100} className="flex flex-col gap-3">
            <div className="card p-8">
              <dl className="grid gap-6">
                {coordonnees.map((item) => (
                  <div key={item.label}>
                    <dt className="text-[12px] tracking-[0.01em] text-ash">{item.label}</dt>
                    <dd className="mt-1.5 text-[16px] text-ivory">
                      {item.href ? (
                        <a href={item.href} className="transition-colors hover:text-ash">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="card min-h-[240px] flex-1 overflow-hidden">
              <iframe
                title={c.map}
                src={`https://www.google.com/maps?q=${encodeURIComponent(c.addressValue)}&output=embed`}
                className="h-full min-h-[240px] w-full opacity-90 [filter:grayscale(0.35)_contrast(1.05)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
