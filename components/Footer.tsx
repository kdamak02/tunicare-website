import Image from "next/image";

const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
];

const QUICK_LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#a-propos", label: "À propos" },
  { href: "#produits", label: "Produits" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-deep text-offwhite">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/logo.png"
              alt="Tunicare Solutions"
              width={150}
              height={42}
              className="h-9 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-offwhite/60">
              Distributeur de confiance de matériel médico-chirurgical
              allemand pour cliniques, hôpitaux et professionnels de santé en
              Tunisie.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-cyan">
              Liens rapides
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-offwhite/70">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-offwhite">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-cyan">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-offwhite/70">
              <li>
                <a href="tel:+21623198831" className="hover:text-offwhite">
                  +216 23 198 831
                </a>
              </li>
              <li>
                <a
                  href="mailto:bacem.kallel@yahoo.com"
                  className="hover:text-offwhite"
                >
                  bacem.kallel@yahoo.com
                </a>
              </li>
              <li>
                Av. Les Violettes, Imm. Les Jardins, Jmazh 2, Mnihla, Ariana
                2094, Tunisie
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-cyan">
              Suivez-nous
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-offwhite/70">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a href={social.href} className="hover:text-offwhite">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-offwhite/10 pt-8 text-xs text-offwhite/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Tunicare Solutions. Tous droits réservés.</p>
          <p>RC C02171522025 — MF 1921874/C/B/M/000</p>
        </div>
      </div>
    </footer>
  );
}
