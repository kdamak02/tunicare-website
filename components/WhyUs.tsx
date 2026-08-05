import Reveal from "./Reveal";

const REASONS = [
  {
    title: "Qualité Made in Germany",
    text: "Du matériel conçu à Tuttlingen, capitale mondiale de la technologie médicale, pour une précision chirurgicale sans compromis.",
  },
  {
    title: "Accompagnement dédié",
    text: "Un interlocuteur unique pour vous conseiller sur le matériel adapté à votre spécialité et à votre bloc opératoire.",
  },
  {
    title: "Service après-vente",
    text: "Suivi, maintenance et disponibilité des pièces pour assurer la continuité de vos interventions.",
  },
  {
    title: "Fiabilité reconnue",
    text: "Un partenaire structuré et en règle (RC, matricule fiscal), de confiance pour les cliniques et hôpitaux tunisiens.",
  },
];

export default function WhyUs() {
  return (
    <section className="relative bg-offwhite py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-display text-sm font-semibold uppercase tracking-wider text-brand">
            Pourquoi nous choisir
          </span>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight text-deep">
            La rigueur allemande, l&apos;accompagnement en plus
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 100}>
              <div className="h-full rounded-2xl border border-brand/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/10">
                <span className="font-display text-3xl font-bold text-cyan">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-deep">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-deep/65">
                  {reason.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
