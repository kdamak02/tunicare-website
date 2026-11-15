"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Bandeau qui défile en continu avec les noms des produits.
 * Il accélère quand on fait défiler la page, et change de sens si on remonte.
 */
export default function Marquee({ items, label }: { items: string[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // La piste contient deux copies de la liste : on la décale de 50 % puis on recommence.
      const loop = gsap.to(".marquee-track", { xPercent: -50, duration: 40, ease: "none", repeat: -1 });

      let direction = 1;
      ScrollTrigger.create({
        onUpdate: (self) => {
          if (self.direction !== direction) direction = self.direction;
          const boost = Math.min(Math.abs(self.getVelocity()) / 250, 5);
          gsap.to(loop, { timeScale: direction * (1 + boost), duration: 0.3, overwrite: true });
          gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.3, ease: "power2.out" });
        },
      });
    },
    { scope: ref }
  );

  const row = items.map((item, i) => (
    <span key={i} className="flex shrink-0 items-center gap-10 pr-10">
      <span className="font-wide whitespace-nowrap text-[clamp(22px,2.6vw,34px)]">{item}</span>
      <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-brand" />
    </span>
  ));

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      className="overflow-hidden border-y border-ivory/10 bg-canvas py-7"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="marquee-track flex w-max">
        <div className="flex">{row}</div>
        <div className="flex" aria-hidden>
          {row}
        </div>
      </div>
    </div>
  );
}
