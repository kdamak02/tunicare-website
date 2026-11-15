"use client";

import { useRef } from "react";

/**
 * Carte avec un halo bleu qui suit la souris (effet « spotlight » courant sur 21st.dev).
 * Sur écran tactile, la carte reste simplement identique à une carte normale.
 */
export default function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={onPointerMove} className={`card spotlight ${className}`}>
      {children}
    </div>
  );
}
