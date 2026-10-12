"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { LOCALES, type Locale } from "@/lib/i18n";
import ThemeToggle from "./ThemeToggle";

type Props = { lang: Locale; t: Dictionary["nav"] };

export default function Header({ lang, t }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = useState("#accueil");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Met en avant le lien de la section visible
    const sections = t.links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [t.links]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-canvas/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-[80px] max-w-[1200px] grid-cols-[1fr_auto] items-center px-5 md:grid-cols-[1fr_auto_1fr] md:px-8">
        <a href="#accueil" className="justify-self-start" aria-label={t.home}>
          {/* Deux versions du logo : texte clair sur fond sombre, texte bleu sur fond clair */}
          <span id="nav-logo" className="inline-block transition-opacity duration-300">
            <Image
              src="/logo-dark.png"
              alt="Tunicare Solutions"
              width={1400}
              height={472}
              loading="eager"
              className="logo-for-dark h-10 w-auto md:h-12"
            />
            <Image
              src="/logo-light.png"
              alt="Tunicare Solutions"
              width={1400}
              height={472}
              loading="eager"
              className="logo-for-light h-10 w-auto md:h-12"
            />
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label={t.mainNav}>
          {t.links.map((link) => {
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

        <div className="hidden items-center gap-3 justify-self-end md:flex">
          <a
            href="tel:+21623198831"
            className="mr-1 hidden whitespace-nowrap text-[15px] text-ash transition-colors hover:text-ivory 2xl:inline"
          >
            +216 23 198 831
          </a>
          <a href="#contact" className="btn-ghost !h-10 !px-5 !text-[15px]">
            {t.contact}
          </a>
          <LangSwitch lang={lang} label={t.language} />
          <ThemeToggle label={t.theme} />
        </div>

        <div className="flex items-center gap-2 justify-self-end md:hidden">
          <LangSwitch lang={lang} label={t.language} />
          <ThemeToggle label={t.theme} className="!h-11 !w-11" />
          <button
            type="button"
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory"
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
      </div>

      {menuOpen && (
        <div className="px-5 pb-8 pt-2 md:hidden">
          <nav className="flex flex-col" aria-label={t.mobileNav}>
            {t.links.map((link) => (
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
              {t.quote}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/** Sélecteur FR / EN : garde la section en cours (#produits, #contact…) en changeant de langue. */
function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex h-10 items-center rounded-[40px] border border-ivory/25 p-[3px] max-md:h-11"
    >
      {LOCALES.map((l) => {
        const active = l === lang;
        return (
          <a
            key={l}
            href={`/${l}`}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            onClick={(e) => {
              if (active) {
                e.preventDefault();
                return;
              }
              e.preventDefault();
              // Rechargement complet volontaire : /fr et /en ont chacune leur mise en page
              // racine, et le script de thème (clair/sombre) doit s'exécuter à nouveau.
              // eslint-disable-next-line @next/next/no-location-assign-relative-destination
              window.location.assign(`/${l}${window.location.hash}`);
            }}
            className={`flex h-full items-center rounded-[40px] px-2.5 text-[13px] uppercase tracking-[0.04em] transition-colors ${
              active ? "bg-ivory text-canvas" : "text-ash hover:text-ivory"
            }`}
          >
            {l}
          </a>
        );
      })}
    </div>
  );
}
