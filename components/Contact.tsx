import Reveal from "./Reveal";
import ContactForm from "./ContactForm";

const ADDRESS =
  "Av. Les Violettes, Imm. Les Jardins, Jmazh 2, Mnihla, Ariana 2094, Tunisie";

const COORDONNEES = [
  { label: "Téléphone", value: "+216 23 198 831", href: "tel:+21623198831" },
  { label: "Email", value: "bacem.kallel@yahoo.com", href: "mailto:bacem.kallel@yahoo.com" },
  { label: "Adresse", value: ADDRESS },
];

export default function Contact() {
  return (
    <section id="contact" className="section bg-canvas">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal className="max-w-[640px]">
          <p className="eyebrow">Contact</p>
          <h2 className="font-wide mt-5 text-[clamp(28px,3.4vw,42px)] leading-[1.15]">
            Parlons de votre besoin en matériel chirurgical
          </h2>
          <p className="mt-5 text-[18px] leading-[1.35] text-ash">
            Décrivez votre demande, nous revenons vers vous avec un devis adapté
            à votre établissement.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="card p-6 md:p-10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={100} className="flex flex-col gap-3">
            <div className="card p-8">
              <dl className="grid gap-6">
                {COORDONNEES.map((c) => (
                  <div key={c.label}>
                    <dt className="text-[12px] tracking-[0.01em] text-ash">{c.label}</dt>
                    <dd className="mt-1.5 text-[16px] text-ivory">
                      {c.href ? (
                        <a href={c.href} className="transition-colors hover:text-ash">
                          {c.value}
                        </a>
                      ) : (
                        c.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="card min-h-[240px] flex-1 overflow-hidden">
              <iframe
                title="Localisation Tunicare Solutions"
                src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
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
