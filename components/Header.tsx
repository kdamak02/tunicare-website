"use client";

import Image from "next/image";
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
  const [current, setCurrent] = useState("#accueil");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Met en avant le lien de la section visible
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-canvas/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-[80px] max-w-[1200px] grid-cols-[1fr_auto] items-center px-5 md:grid-cols-[1fr_auto_1fr] md:px-8">
        <a href="#accueil" className="justify-self-start" aria-label="Tunicare Solutions, retour à l'accueil">
          <Image
            id="nav-logo"
            src="/logo-dark.png"
            alt="Tunicare Solutions"
            width={1400}
            height={472}
            loading="eager"
            className="h-10 w-auto transition-opacity duration-300 md:h-12"
          />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => {
            const isActive = current === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-[40px] px-4 py-2 text-[15px] transition-colors ${
                  isActive
                    ? "bg-ivory/[0.08] text-ivory"
                    : "text-ash hover:bg-ivory/[0.05] hover:text-ivory"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 justify-self-end md:flex">
          <a href="tel:+21623198831" className="text-[15px] text-ash transition-colors hover:text-ivory">
            +216 23 198 831
          </a>
          <a href="#contact" className="btn-ghost !h-10 !px-5 !text-[15px]">
            Nous contacter
          </a>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-ivory/25 text-ivory md:hidden"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 block h-[1.5px] w-5 bg-current transition-transform ${
                menuOpen ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[10px] block h-[1.5px] w-5 bg-current transition-transform ${
                menuOpen ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="px-5 pb-8 pt-2 md:hidden">
          <nav className="flex flex-col" aria-label="Navigation mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-wide border-b border-ivory/10 py-4 text-2xl text-ivory"
              >
                {link.label}
              </a>
            ))}
            <a href="tel:+21623198831" className="mt-6 text-ash">
              +216 23 198 831
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary mt-5 w-full">
              Demander un devis
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
