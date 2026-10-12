"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ouverture du site : le logo Tunicare se dessine au centre de l'écran,
 * puis glisse jusqu'à sa place dans la barre de navigation.
 * Jouée une fois par visite (session), raccourcie si l'utilisateur
 * préfère réduire les animations.
 * `onDone` doit être stable (useCallback) : sinon l'intro redémarrerait.
 */
export default function Intro({ onDone, tagline }: { onDone: () => void; tagline: string }) {
  const logoRef = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<"draw" | "fly" | "gone">("draw");

  useEffect(() => {
    const root = document.documentElement;
    let seen = false;
    try {
      seen = sessionStorage.getItem("tunicare-intro") === "1";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      root.removeAttribute("data-intro");
      setPhase("gone");
      onDone();
    };

    if (seen || reduced) {
      // Pas d'intro : on retire simplement le voile.
      const t = window.setTimeout(finish, 50);
      return () => window.clearTimeout(t);
    }

    root.setAttribute("data-intro", "on");
    document.body.style.overflow = "hidden";
    try {
      sessionStorage.setItem("tunicare-intro", "1");
    } catch {}

    // 1) le logo se dessine (CSS), 2) il vole vers la barre, 3) on retire le voile
    const flyTimer = window.setTimeout(() => {
      const logo = logoRef.current;
      const target = document.getElementById("nav-logo");
      if (logo && target) {
        const from = logo.getBoundingClientRect();
        const to = target.getBoundingClientRect();
        const scale = to.height / from.height;
        const dx = to.left - from.left;
        const dy = to.top - from.top;
        logo.style.transformOrigin = "0 0";
        logo.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      }
      setPhase("fly");
    }, 1900);

    const endTimer = window.setTimeout(() => {
      document.body.style.overflow = "";
      finish();
    }, 2750);

    return () => {
      window.clearTimeout(flyTimer);
      window.clearTimeout(endTimer);
      document.body.style.overflow = "";
      root.removeAttribute("data-intro");
    };
  }, [onDone]);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-colors duration-700 ${
        phase === "fly" ? "pointer-events-none bg-transparent" : "bg-canvas"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Logo : une version par thème (texte clair sur fond sombre, bleu sur fond clair) */}
        <span
          ref={logoRef}
          className="block w-[min(520px,72vw)] [animation:intro-reveal_1.2s_cubic-bezier(0.65,0,0.35,1)_0.2s_both] [transition:transform_0.8s_cubic-bezier(0.65,0,0.35,1)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-dark.png" alt="" width={1400} height={472} className="logo-for-dark h-auto w-full" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-light.png" alt="" width={1400} height={472} className="logo-for-light h-auto w-full" />
        </span>
        <div
          className={`flex flex-col items-center transition-opacity duration-300 ${
            phase === "fly" ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="mt-8 block h-px w-40 origin-left bg-ivory/30 [animation:intro-line_1.1s_cubic-bezier(0.65,0,0.35,1)_0.6s_both]" />
          <span className="eyebrow mt-5 [animation:fade-up_0.8s_ease-out_1s_both]">{tagline}</span>
        </div>
      </div>
    </div>
  );
}
