export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-deep"
    >
      {/* Slow-breathing gradient: deep blue-black <-> brand blue, never static */}
      <div
        className="animate-gradient-slow absolute inset-0 bg-gradient-to-br from-deep via-brand to-deep bg-[length:200%_200%]"
        aria-hidden
      />
      {/* Subtle scan-line texture over the gradient */}
      <div className="scanlines absolute inset-0" aria-hidden />
      {/* Soft floating glow accents */}
      <div
        className="animate-float absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan/20 blur-3xl"
        aria-hidden
      />
      <div
        className="animate-float absolute -right-16 bottom-10 h-96 w-96 rounded-full bg-coral/10 blur-3xl [animation-delay:-3s]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-32 lg:px-8">
        <div className="animate-fade-up max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-wider text-cyan">
            Partenaire officiel AMNOTEC · Tuttlingen, Allemagne
          </span>

          <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] text-offwhite">
            La précision chirurgicale allemande,{" "}
            <span className="bg-gradient-to-r from-cyan to-brand bg-clip-text text-transparent">
              livrée en Tunisie
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-offwhite/75">
            Tunicare Solutions distribue du matériel médico-chirurgical haut de
            gamme pour cliniques, hôpitaux et professionnels de santé —
            chirurgie ouverte, endoscopie et systèmes de guidage chirurgical,
            fabriqués à Tuttlingen, capitale mondiale de la technologie
            médicale.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#produits"
              className="rounded-full bg-coral px-7 py-3.5 font-display text-sm font-semibold text-white shadow-lg shadow-coral/30 transition-all hover:scale-105 hover:shadow-coral/50 active:scale-95"
            >
              Découvrir le catalogue
            </a>
            <a
              href="#contact"
              className="rounded-full border border-offwhite/25 bg-white/5 px-7 py-3.5 font-display text-sm font-semibold text-offwhite backdrop-blur-sm transition-all hover:border-cyan/60 hover:text-cyan"
            >
              Demander un devis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
