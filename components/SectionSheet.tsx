"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  /** Numéro de la section (1, 2, 3…) */
  index: number;
  total: number;
  label: string;
  /** "alt" = fond un cran plus clair, pour alterner avec la section précédente */
  tone?: "base" | "alt";
  children: React.ReactNode;
};

/**
 * « Feuille » de section de la page d'accueil :
 * - elle glisse par-dessus la précédente avec de grands coins arrondis (fonds alternés) ;
 * - en haut, un repère technique « 01 — À propos ——— 01 / 04 » ;
 * - à l'arrivée à l'écran, la ligne se dessine et un trait laser la parcourt.
 */
export default function SectionSheet({ index, total, label, tone = "base", children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const num = String(index).padStart(2, "0");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
      });
      tl.from(".sheet-num", { yPercent: 60, opacity: 0, filter: "blur(10px)", duration: 0.9, clearProps: "filter" })
        .from(".sheet-label", { x: -16, opacity: 0, duration: 0.7 }, "-=0.6")
        .fromTo(".sheet-line", { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: "expo.out" }, "-=0.5")
        .fromTo(
          ".sheet-laser",
          { left: "-15%", opacity: 0 },
          { left: "105%", opacity: 1, duration: 1.4, ease: "power2.inOut" },
          "<0.1",
        )
        .to(".sheet-laser", { opacity: 0, duration: 0.3 }, ">-0.2")
        .from(".sheet-count", { opacity: 0, duration: 0.6 }, "<-0.6")
        .fromTo(".sheet-glow", { opacity: 0 }, { opacity: 1, duration: 1.6, ease: "power2.out" }, 0);
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      style={{ zIndex: index }}
      className={`sheet relative rounded-t-[36px] border-t border-ivory/10 md:rounded-t-[56px] ${
        index > 1 ? "-mt-10 md:-mt-14" : ""
      } ${index === total ? "sheet-last" : ""
      } ${
        tone === "alt" ? "bg-canvas-alt" : "bg-canvas"
      }`}
    >
      {/* Halo lumineux le long du bord supérieur */}
      <span aria-hidden className="sheet-glow pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden rounded-t-[inherit]">
        <span className="absolute inset-x-[15%] top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
      </span>

      <div className="mx-auto max-w-[1200px] px-5 pt-14 md:px-8 md:pt-20">
        <div className="flex items-center gap-4 md:gap-6">
          <span
            aria-hidden
            className="sheet-num font-wide text-[clamp(38px,4.4vw,60px)] leading-none text-transparent [-webkit-text-stroke:1px_var(--brand)]"
          >
            {num}
          </span>
          <span className="sheet-label eyebrow whitespace-nowrap !text-ivory">{label}</span>
          <span aria-hidden className="relative h-px flex-1 overflow-hidden bg-ivory/10">
            <span className="sheet-line absolute inset-0 origin-left bg-gradient-to-r from-brand/80 via-brand/30 to-transparent" />
            <span className="sheet-laser absolute top-1/2 h-[3px] w-[18%] -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-[var(--word-1)] to-transparent opacity-0 blur-[1px]" />
          </span>
          <span aria-hidden className="sheet-count hidden text-[13px] tabular-nums tracking-[0.08em] text-slate sm:inline">
            {num} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      {children}
    </div>
  );
}
