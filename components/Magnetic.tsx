"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Bouton « magnétique » : il se laisse attirer par la souris quand elle passe dessus,
 * puis revient en place avec un petit rebond. Sans effet sur écran tactile.
 */
export default function Magnetic({
  children,
  strength = 0.35,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const move = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useGSAP(() => {
    move.current = {
      x: gsap.quickTo(ref.current, "x", { duration: 0.5, ease: "power3.out" }),
      y: gsap.quickTo(ref.current, "y", { duration: 0.5, ease: "power3.out" }),
    };
  });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current || !move.current) return;
    const r = ref.current.getBoundingClientRect();
    move.current.x((e.clientX - (r.left + r.width / 2)) * strength);
    move.current.y((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const onPointerLeave = () => {
    move.current?.x(0);
    move.current?.y(0);
  };

  return (
    <div ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className="inline-flex">
      {children}
    </div>
  );
}
