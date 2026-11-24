"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { Dictionary } from "@/lib/dictionaries";
import { LOCALES, type Locale } from "@/lib/i18n";
import ThemeToggle from "./ThemeToggle";

gsap.registerPlugin(useGSAP);

/** Liste des produits pour le menu déroulant « Produits ». */
export type MenuFamille = {
  id: string;
  nom: string;
  produits: {
    id: string;
    nom: string;
    image: string;
    rendu?: "photo" | "detoure";
  }[];
};

type Props = { lang: Locale; t: Dictionary["nav"]; menu: MenuFamille[] };

export default function Header({ lang, t, menu }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [produitsOpen, setProduitsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState("#accueil");
  // Sur une page produit, les liens d'ancre ramènent à l'accueil (/fr#contact…)
  const pathname = usePathname();
  const base = pathname === `/${lang}` ? "" : `/${lang}`;

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
  }, [t.links, pathname]);

  // Changement de page : on referme les menus
  const [pageVue, setPageVue] = useState(pathname);
  if (pageVue !== pathname) {
    setPageVue(pathname);
    setMenuOpen(false);
    setProduitsOpen(false);
  }

  // Menu Produits : fermeture avec Échap ou un clic en dehors de l'en-tête
  useEffect(() => {
    if (!produitsOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setProduitsOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node))
        setProduitsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [produitsOpen]);

  const solid = scrolled || menuOpen || produitsOpen;

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-canvas/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-[80px] max-w-[1200px] grid-cols-[1fr_auto] items-center px-5 md:grid-cols-[1fr_auto_1fr] md:px-8">
        <a
          href={`${base}#accueil`}
          className="justify-self-start"
          aria-label={t.home}
        >
          {/* Deux versions du logo : texte clair sur fond sombre, texte bleu sur fond clair */}
          <span
            id="nav-logo"
            className="inline-block transition-opacity duration-300"
          >
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

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label={t.mainNav}
        >
          {t.links.map((link) => {
            const isActive = base === "" && current === link.href;
            if (link.href === "#produits") {
              const surProduit = pathname.startsWith(`/${lang}/produits/`);
              return (
                <button
                  key={link.href}
                  type="button"
                  aria-expanded={produitsOpen}
                  aria-controls="menu-produits"
                  onClick={() => setProduitsOpen((o) => !o)}
                  className={`flex items-center gap-1.5 rounded-[40px] px-4 py-2 text-[15px] transition-colors ${
                    isActive || surProduit || produitsOpen
                      ? "bg-ivory/[0.08] text-ivory"
                      : "text-ash hover:bg-ivory/[0.05] hover:text-ivory"
                  }`}
                >
                  {link.label}
                  <Chevron ouvert={produitsOpen} />
                </button>
              );
            }
            return (
              <a
                key={link.href}
                href={`${base}${link.href}`}
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
          <a
            href={`${base}#contact`}
            className="btn-ghost !h-10 !px-5 !text-[15px]"
          >
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

      {produitsOpen && (
        <MenuProduits
          lang={lang}
          menu={menu}
          pathname={pathname}
          tout={t.allProducts}
          voirTout={`${base}#produits`}
          onClose={() => setProduitsOpen(false)}
        />
      )}

      {menuOpen && (
        <div
          className="max-h-[calc(100dvh-80px)] overflow-y-auto px-5 pb-8 pt-2 md:hidden"
          data-lenis-prevent
        >
          <nav className="flex flex-col" aria-label={t.mobileNav}>
            {t.links.map((link) =>
              link.href === "#produits" ? (
                <AccordeonProduits
                  key={link.href}
                  label={link.label}
                  lang={lang}
                  menu={menu}
                  pathname={pathname}
                  tout={t.allProducts}
                  voirTout={`${base}#produits`}
                  onNavigate={() => setMenuOpen(false)}
                />
              ) : (
                <a
                  key={link.href}
                  href={`${base}${link.href}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-wide border-b border-ivory/10 py-4 text-2xl text-ivory"
                >
                  {link.label}
                </a>
              ),
            )}
            <a href="tel:+21623198831" className="mt-6 text-ash">
              +216 23 198 831
            </a>
            <a
              href={`${base}#contact`}
              onClick={() => setMenuOpen(false)}
              className="btn-primary mt-5 w-full"
            >
              {t.quote}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Chevron({ ouvert }: { ouvert: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden
      className={`transition-transform duration-300 ${ouvert ? "rotate-180" : ""}`}
    >
      <path
        d="M2.5 4.5 6 8l3.5-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Vignette d'un produit dans les menus. */
function Vignette({
  image,
  rendu,
}: {
  image: string;
  rendu?: "photo" | "detoure";
}) {
  return (
    <span
      className={`relative block h-11 w-14 shrink-0 overflow-hidden rounded-[6px] ${
        rendu === "detoure" ? "bg-white" : "bg-plate"
      }`}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="56px"
        className={rendu === "detoure" ? "object-contain p-1" : "object-cover"}
      />
    </span>
  );
}

/** Menu déroulant « Produits » (ordinateur) : les 18 gammes, rangées par famille. */
function MenuProduits({
  lang,
  menu,
  pathname,
  tout,
  voirTout,
  onClose,
}: {
  lang: Locale;
  menu: MenuFamille[];
  pathname: string;
  tout: string;
  voirTout: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ref.current,
        { clipPath: "inset(0 0 100% 0)", opacity: 0 },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          clearProps: "clipPath",
        },
      );
      gsap.from(".menu-item", {
        opacity: 0,
        y: 14,
        filter: "blur(6px)",
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.025,
        delay: 0.1,
        clearProps: "filter",
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      id="menu-produits"
      data-lenis-prevent
      className="absolute inset-x-0 top-[80px] hidden max-h-[calc(100dvh-80px)] overflow-y-auto border-t border-ivory/10 bg-canvas shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] md:block"
    >
      <div className="mx-auto grid max-w-[1200px] gap-8 px-8 py-9 lg:grid-cols-3">
        {menu.map((f) => (
          <div key={f.id}>
            <p className="menu-item eyebrow">{f.nom}</p>
            <ul className="mt-4 space-y-1">
              {f.produits.map((p) => {
                const actif = pathname === `/${lang}/produits/${p.id}`;
                return (
                  <li key={p.id} className="menu-item">
                    <Link
                      href={`/${lang}/produits/${p.id}`}
                      onClick={onClose}
                      aria-current={actif ? "page" : undefined}
                      className={`group flex items-center gap-3.5 rounded-[10px] p-2 transition-colors ${
                        actif ? "bg-ivory/[0.08]" : "hover:bg-ivory/[0.05]"
                      }`}
                    >
                      <Vignette image={p.image} rendu={p.rendu} />
                      <span className="text-[15px] leading-[1.3] text-ivory">
                        {p.nom}
                      </span>
                      <span
                        aria-hidden
                        className="ml-auto -translate-x-1 text-ash opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="menu-item mx-auto flex max-w-[1200px] justify-end px-8 pb-7">
        <a
          href={voirTout}
          onClick={onClose}
          className="text-[15px] text-ash underline-offset-4 hover:text-ivory hover:underline"
        >
          {tout} →
        </a>
      </div>
    </div>
  );
}

/** « Produits » dans le menu mobile : se déplie pour montrer la liste des gammes. */
function AccordeonProduits({
  label,
  lang,
  menu,
  pathname,
  tout,
  voirTout,
  onNavigate,
}: {
  label: string;
  lang: Locale;
  menu: MenuFamille[];
  pathname: string;
  tout: string;
  voirTout: string;
  onNavigate: () => void;
}) {
  const [ouvert, setOuvert] = useState(
    pathname.startsWith(`/${lang}/produits/`),
  );

  return (
    <div className="border-b border-ivory/10">
      <button
        type="button"
        aria-expanded={ouvert}
        onClick={() => setOuvert((o) => !o)}
        className="font-wide flex w-full items-center justify-between py-4 text-left text-2xl text-ivory"
      >
        {label}
        <Chevron ouvert={ouvert} />
      </button>
      {ouvert && (
        <div className="pb-5">
          {menu.map((f) => (
            <div key={f.id} className="mt-3">
              <p className="eyebrow">{f.nom}</p>
              <ul className="mt-2">
                {f.produits.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/${lang}/produits/${p.id}`}
                      onClick={onNavigate}
                      aria-current={
                        pathname === `/${lang}/produits/${p.id}`
                          ? "page"
                          : undefined
                      }
                      className="flex items-center gap-3 rounded-[10px] py-2 text-[16px] text-ivory aria-[current=page]:text-brand"
                    >
                      <Vignette image={p.image} rendu={p.rendu} />
                      {p.nom}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <a
            href={voirTout}
            onClick={onNavigate}
            className="mt-4 inline-block text-[15px] text-ash underline underline-offset-4"
          >
            {tout} →
          </a>
        </div>
      )}
    </div>
  );
}

/** Sélecteur FR / EN : garde la page et la section en cours (#produits, #contact…) en changeant de langue. */
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
              window.location.assign(
                window.location.pathname.replace(
                  /^\/[a-z]{2}(?=\/|$)/,
                  `/${l}`,
                ) + window.location.hash,
              );
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
