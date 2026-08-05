import Reveal from "./Reveal";

type Category = {
  title: string;
  description: string;
  items: string[];
  icon: React.ReactNode;
};

const iconProps = {
  className: "h-7 w-7",
  strokeWidth: 1.6,
  stroke: "currentColor",
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CATEGORIES: Category[] = [
  {
    title: "Chirurgie ouverte",
    description:
      "Instruments de précision pour le bloc opératoire, fabriqués selon les standards allemands les plus exigeants.",
    items: [
      "Instruments de base",
      "Instruments ORL",
      "Micro-instruments",
      "Instruments dentaires",
      "Conteneurs de stérilisation",
      "Électrochirurgie",
    ],
    icon: (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <path d="M4 20L14 10" />
        <path d="M13 9l2-2 4 4-2 2" />
        <circle cx="18.5" cy="5.5" r="1.5" />
        <path d="M4 20l1.5-4.5L9 14" />
      </svg>
    ),
  },
  {
    title: "Endoscopie",
    description:
      "Dispositifs et optiques haute définition pour une visualisation nette et une intervention mini-invasive fiable.",
    items: [
      "Dispositifs endoscopiques",
      "Endoscopes",
      "Laparoscopie",
      "Urologie endoscopique",
      "Gynécologie endoscopique",
      "Arthroscopie",
    ],
    icon: (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <circle cx="9" cy="9" r="5" />
        <circle cx="9" cy="9" r="1.6" fill="currentColor" stroke="none" />
        <path d="M12.8 12.8L20 20" />
      </svg>
    ),
  },
  {
    title: "Systèmes de guidage chirurgical",
    description:
      "Solutions de chirurgie guidée haute précision de type VEQTRON, pour une navigation opératoire millimétrée.",
    items: ["Navigation chirurgicale haute précision", "Solutions de guidage sur mesure"],
    icon: (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    ),
  },
];

export default function Products() {
  return (
    <section id="produits" className="relative bg-deep py-28">
      <div className="scanlines pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-display text-sm font-semibold uppercase tracking-wider text-cyan">
            Catalogue
          </span>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight text-offwhite">
            Trois familles de solutions, un seul standard de précision
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-offwhite/70">
            Matériel B2B pour professionnels de santé — contactez-nous pour un
            devis adapté à votre établissement.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 [perspective:1400px] md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category, index) => (
            <Reveal key={category.title} delay={index * 120}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-offwhite/10 bg-white/[0.06] p-8 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-cyan/40 hover:shadow-2xl hover:shadow-cyan/20 group-hover:[transform:rotateX(3deg)_rotateY(-3deg)]">
                {/* Precision-scan sweep line, triggered on hover */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-[-10%] h-0.5 bg-cyan opacity-0 shadow-[0_0_18px_4px_rgba(91,231,224,0.65)] group-hover:animate-scan"
                  aria-hidden
                />

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/30 to-cyan/20 text-cyan">
                  {category.icon}
                </div>

                <h3 className="mt-6 font-display text-xl font-semibold text-offwhite">
                  {category.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-offwhite/65">
                  {category.description}
                </p>

                <ul className="mt-6 space-y-2 border-t border-offwhite/10 pt-5">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-offwhite/75"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
