import Reveal from "./Reveal";
import ContactForm from "./ContactForm";

const ADDRESS =
  "Av. Les Violettes, Imm. Les Jardins, Jmazh 2, Mnihla, Ariana 2094, Tunisie";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-offwhite py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-display text-sm font-semibold uppercase tracking-wider text-brand">
            Contact
          </span>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight text-deep">
            Parlons de votre besoin en matériel chirurgical
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-deep/70">
            Notre équipe vous répond rapidement pour établir un devis adapté
            à votre établissement.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="rounded-3xl border border-deep/10 bg-white/80 p-8 shadow-lg shadow-brand/5 backdrop-blur-sm">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-3xl border border-deep/10 bg-deep p-8 text-offwhite shadow-lg">
                <h3 className="font-display text-lg font-semibold">
                  Coordonnées
                </h3>
                <dl className="mt-5 space-y-4 text-sm text-offwhite/80">
                  <div>
                    <dt className="font-display font-medium text-cyan">
                      Téléphone
                    </dt>
                    <dd>
                      <a
                        href="tel:+21623198831"
                        className="transition-colors hover:text-offwhite"
                      >
                        +216 23 198 831
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-display font-medium text-cyan">
                      Email
                    </dt>
                    <dd>
                      <a
                        href="mailto:bacem.kallel@yahoo.com"
                        className="transition-colors hover:text-offwhite"
                      >
                        bacem.kallel@yahoo.com
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-display font-medium text-cyan">
                      Adresse
                    </dt>
                    <dd>{ADDRESS}</dd>
                  </div>
                </dl>
              </div>

              <div className="min-h-[220px] flex-1 overflow-hidden rounded-3xl border border-deep/10 shadow-lg">
                <iframe
                  title="Localisation Tunicare Solutions"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    ADDRESS
                  )}&output=embed`}
                  className="h-full min-h-[220px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
