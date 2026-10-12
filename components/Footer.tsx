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
    <footer className="border-t border-ivory/10 bg-canvas text-ivory">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/logo-dark.png"
              alt="Tunicare Solutions"
              width={1400}
              height={472}
              className="h-12 w-auto"
            />
            <p className="mt-4 max-w-xs text-[15px] leading-[1.5] text-ash">
              Distributeur de confiance de matériel médico-chirurgical
              allemand pour cliniques, hôpitaux et professionnels de santé en
              Tunisie.
            </p>
          </div>

          <div>
            <h3 className="eyebrow">
              Liens rapides
            </h3>
            <ul className="mt-4 space-y-2.5 text-[15px] text-ash">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-ivory">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-[15px] text-ash">
              <li>
                <a href="tel:+21623198831" className="hover:text-ivory">
                  +216 23 198 831
                </a>
              </li>
              <li>
                <a
                  href="mailto:bacem.kallel@yahoo.com"
                  className="hover:text-ivory"
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
            <h3 className="eyebrow">
              Suivez-nous
            </h3>
            <ul className="mt-4 space-y-2.5 text-[15px] text-ash">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a href={social.href} className="hover:text-ivory">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-ivory/10 pt-8 text-[12px] tracking-[0.01em] text-ash/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Tunicare Solutions. Tous droits réservés.</p>
          <p>RC C02171522025 — MF 1921874/C/B/M/000</p>
        </div>
      </div>
    </footer>
  );
}
