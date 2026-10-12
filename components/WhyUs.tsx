import Reveal from "./Reveal";

const REASONS = [
  {
    title: "Qualité allemande",
    text: "Acier inoxydable médical, optiques en saphir, contrôles aux normes en vigueur pour le bloc opératoire.",
  },
  {
    title: "Devis sur mesure",
    text: "Chaque demande est étudiée selon votre spécialité, votre volume et votre budget.",
  },
  {
    title: "Service après-vente",
    text: "Maintenance, pièces détachées et renouvellement suivis depuis la Tunisie.",
  },
  {
    title: "Entreprise en règle",
    text: "Registre de commerce et matricule fiscal tunisiens : un fournisseur fiable pour vos achats.",
  },
];

export default function WhyUs() {
  return (
    <section className="section bg-canvas">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal className="max-w-[640px]">
          <p className="eyebrow">Pourquoi Tunicare</p>
          <h2 className="font-wide mt-5 text-[clamp(28px,3.4vw,42px)] leading-[1.15]">
            La rigueur allemande, l&apos;accompagnement en plus
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 90} className="h-full">
              <div className="card flex h-full flex-col p-8">
                <span aria-hidden className="block h-px w-8 bg-brand" />
                <h3 className="font-wide mt-6 text-[21px] leading-[1.2]">{reason.title}</h3>
                <p className="mt-3 text-ash">{reason.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
