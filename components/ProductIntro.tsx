"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Entrée animée du haut de la page produit :
 * la photo se dévoile de bas en haut, puis le texte, les badges et les boutons
 * arrivent l'un après l'autre (fondu + flou + glissement).
 * Les éléments animés portent les classes pi-media, pi-thumb, pi-text, pi-chip et pi-cta.
 */
export default function ProductIntro({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".pi-media",
        { clipPath: "inset(100% 0% 0% 0% round 12px)", scale: 1.06 },
        {
          clipPath: "inset(0% 0% 0% 0% round 12px)",
          scale: 1,
          duration: 1.1,
          ease: "expo.out",
          clearProps: "clipPath,transform",
        },
      )
        .from(
          ".pi-thumb",
          { opacity: 0, y: 16, duration: 0.6, stagger: 0.05 },
          "-=0.6",
        )
        .from(
          ".pi-text",
          {
            opacity: 0,
            y: 28,
            filter: "blur(10px)",
            duration: 0.9,
            stagger: 0.08,
            clearProps: "filter",
          },
          0.15,
        )
        .from(
          ".pi-chip",
          { opacity: 0, y: 12, scale: 0.94, duration: 0.5, stagger: 0.05 },
          "-=0.55",
        )
        .from(
          ".pi-cta",
          { opacity: 0, y: 16, duration: 0.6, stagger: 0.08 },
          "-=0.35",
        );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
