import Reveal from "./Reveal";

const VALUES = [
  {
    title: "Qualité allemande",
    text: "Instruments et systèmes conçus et fabriqués à Tuttlingen, la référence mondiale de la technologie médico-chirurgicale.",
  },
  {
    title: "Fiabilité",
    text: "Un partenaire stable pour les cliniques et hôpitaux, avec un matricule fiscal et un registre de commerce en règle.",
  },
  {
    title: "Accompagnement",
    text: "Conseil personnalisé pour choisir le matériel adapté à chaque spécialité et chaque bloc opératoire.",
  },
];

export default function About() {
  return (
    <section id="a-propos" className="relative bg-offwhite py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="font-display text-sm font-semibold uppercase tracking-wider text-brand">
              À propos de Tunicare Solutions
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight text-deep">
              Le pont entre l&apos;excellence médicale allemande et les
              professionnels de santé tunisiens
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-deep/70">
              Tunicare Solutions est distributeur en Tunisie de matériel
              médico-chirurgical, fournisseur principal d&apos;AMNOTEC
              International Medical, référence mondiale en instruments
              chirurgicaux basée à Tuttlingen, en Allemagne.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-deep/70">
              Notre mission : garantir aux cliniques, hôpitaux et
              professionnels de santé un accès direct à du matériel fiable,
              précis et conforme aux plus hauts standards internationaux —
              avec un accompagnement de proximité, du choix du matériel au
              service après-vente.
            </p>
          </Reveal>

          <Reveal delay={120} className="grid gap-5">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="group rounded-2xl border border-deep/10 bg-white/70 p-6 shadow-sm shadow-brand/5 transition-all hover:-translate-y-1 hover:border-cyan/40 hover:shadow-lg hover:shadow-cyan/10"
              >
                <h3 className="font-display text-lg font-semibold text-deep">
                  {value.title}
                </h3>
                <p className="mt-2 text-deep/65">{value.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
