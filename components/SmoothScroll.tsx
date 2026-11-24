"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Défilement fluide (Lenis) sur tout le site, synchronisé avec GSAP ScrollTrigger.
 * Les liens d'ancre (#produits, #contact…) glissent aussi en douceur, en tenant compte de l'en-tête.
 * Désactivé si le visiteur a demandé moins d'animations.
 *
 * À chaque changement de page (ex. clic sur un produit), on repart du haut de la nouvelle page,
 * ou de la section visée si l'adresse contient une ancre (/fr#contact).
 */
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const premierRendu = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      anchors: true, // tient compte du scroll-padding-top (80px) défini dans globals.css
    });
    lenis.on("scroll", ScrollTrigger.update);
    lenisRef.current = lenis;

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (premierRendu.current) {
      premierRendu.current = false;
      return;
    }
    const lenis = lenisRef.current;
    const cible = window.location.hash
      ? document.querySelector(window.location.hash)
      : null;

    if (cible) {
      // Laisse la nouvelle page se mettre en place, puis glisse jusqu'à la section
      requestAnimationFrame(() => {
        if (lenis)
          lenis.scrollTo(cible as HTMLElement, {
            immediate: true,
            force: true,
          });
        else cible.scrollIntoView();
      });
    } else if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
    // Les positions des animations au défilement changent avec la page
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname]);

  return null;
}
