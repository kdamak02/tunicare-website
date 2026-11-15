"use client";

import { Fragment, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type BlurTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** Secondes entre chaque mot */
  stagger?: number;
};

/**
 * Titre dont les mots sortent du flou un par un quand il arrive à l'écran
 * (dans l'esprit du composant BlurText de React Bits).
 */
export default function BlurText({ text, className = "", as: Tag = "h2", stagger = 0.07 }: BlurTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".blur-word", {
        opacity: 0,
        filter: "blur(12px)",
        yPercent: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger,
        delay: 0.15,
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span aria-hidden className="blur-word inline-block">
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}
