"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#a-propos", label: "À propos" },
  { href: "#produits", label: "Produits" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-deep/85 backdrop-blur-lg transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-deep/20" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        <Link href="#accueil" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.png"
            alt="Tunicare Solutions"
            width={160}
            height={44}
            priority
            className="h-9 w-auto lg:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-sm font-medium text-offwhite/85 transition-colors hover:text-cyan"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+21623198831"
            className="font-display text-sm font-semibold text-cyan transition-colors hover:text-offwhite"
          >
            +216 23 198 831
          </a>
          <a
            href="#contact"
            className="rounded-full bg-coral px-5 py-2.5 font-display text-sm font-semibold text-white shadow-md shadow-coral/30 transition-all hover:scale-105 hover:shadow-coral/50 active:scale-95"
          >
            Demander un devis
          </a>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-offwhite md:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-6 bg-current transition-transform ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-3 block h-0.5 w-6 bg-current transition-transform ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-deep/95 px-6 pb-6 pt-2 backdrop-blur-lg md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-base font-medium text-offwhite/90 hover:text-cyan"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+21623198831"
              className="font-display text-base font-semibold text-cyan"
            >
              +216 23 198 831
            </a>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-1 w-fit rounded-full bg-coral px-5 py-2.5 font-display text-sm font-semibold text-white shadow-md shadow-coral/30"
            >
              Demander un devis
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
