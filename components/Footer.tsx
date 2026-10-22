import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";
import { CONTACT_EMAIL } from "@/lib/site";

const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
];

export default function Footer({ t }: { t: Dictionary }) {
  const f = t.footer;

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
              className="logo-for-dark h-12 w-auto"
            />
            <Image
              src="/logo-light.png"
              alt="Tunicare Solutions"
              width={1400}
              height={472}
              className="logo-for-light h-12 w-auto"
            />
            <p className="mt-4 max-w-xs text-[15px] leading-[1.5] text-ash">{f.blurb}</p>
          </div>

          <div>
            <h3 className="eyebrow">{f.quickLinks}</h3>
            <ul className="mt-4 space-y-2.5 text-[15px] text-ash">
              {t.nav.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-ivory">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow">{f.contact}</h3>
            <ul className="mt-4 space-y-2.5 text-[15px] text-ash">
              <li>
                <a href="tel:+21623198831" className="hover:text-ivory">
                  +216 23 198 831
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-ivory">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>{t.contact.addressValue}</li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow">{f.follow}</h3>
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
          <p>
            © {new Date().getFullYear()} Tunicare Solutions. {f.rights}
          </p>
          <p>RC C02171522025 — MF 1921874/C/B/M/000</p>
        </div>
      </div>
    </footer>
  );
}
