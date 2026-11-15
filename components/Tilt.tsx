"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/** Carte qui s'incline légèrement en 3D selon la position de la souris. Sans effet sur écran tactile. */
export default function Tilt({ children, className = "", max = 6 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const tilt = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useGSAP(() => {
    gsap.set(ref.current, { transformPerspective: 900 });
    tilt.current = {
      x: gsap.quickTo(ref.current, "rotationX", { duration: 0.6, ease: "power3.out" }),
      y: gsap.quickTo(ref.current, "rotationY", { duration: 0.6, ease: "power3.out" }),
    };
  });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current || !tilt.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tilt.current.y(px * max * 2);
    tilt.current.x(-py * max * 2);
  };
  const onPointerLeave = () => {
    tilt.current?.x(0);
    tilt.current?.y(0);
  };

  return (
    <div ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className={className}>
      {children}
    </div>
  );
}
