"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/** Fait apparaître un bloc (fondu + flou + glissement) la première fois qu'il entre à l'écran. */
export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(node, { opacity: 1 });
        return;
      }
      gsap.fromTo(
        node,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          delay: delay / 1000,
          ease: "power3.out",
          clearProps: "filter",
          scrollTrigger: { trigger: node, start: "top 88%", once: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
