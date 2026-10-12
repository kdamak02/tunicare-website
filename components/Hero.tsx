"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trouverProduit } from "@/lib/catalogue";
import type { Dictionary } from "@/lib/dictionaries";
import { preparerDevis } from "@/lib/devis";
import type { Locale } from "@/lib/i18n";
import Intro from "./Intro";

/**
 * Instruments du carrousel 3D (images détourées dans /public/images/carrousel).
 * `id` = identifiant du produit dans lib/catalogue.ts : son nom et sa famille
 * s'affichent automatiquement dans la bonne langue.
 * `fondu` adoucit le côté où la photo d'origine coupait l'instrument.
 */
type Item = { src: string; id: string; fondu?: "left" | "bottom" };

const MASQUES = {
  left: "linear-gradient(to right, transparent, black 22%)",
  bottom: "linear-gradient(to top, transparent, black 24%)",
};

const ITEMS: Item[] = [
  { src: "/images/carrousel/laparoscopie.webp", id: "laparoscopie", fondu: "bottom" },
  { src: "/images/carrousel/instruments-de-base.webp", id: "instruments-de-base" },
  { src: "/images/carrousel/fluorosqan.webp", id: "fluorosqan" },
  { src: "/images/carrousel/endoscope.webp", id: "endoscopes", fondu: "left" },
  { src: "/images/carrousel/instruments-orl.webp", id: "instruments-orl" },
  { src: "/images/carrousel/camera-4k.webp", id: "camera-4k" },
  { src: "/images/carrousel/arthroscopie.webp", id: "arthroscopie", fondu: "left" },
  { src: "/images/carrousel/gynecologie.webp", id: "gynecologie", fondu: "left" },
];

const N = ITEMS.length;
const STEP = (Math.PI * 2) / N;
const AUTO_DELAY = 3200;

export default function Hero({ lang, t }: { lang: Locale; t: Dictionary }) {
  const [ready, setReady] = useState(false);
  const [words, setWords] = useState(0);
  const [front, setFront] = useState(0);
  const onIntroDone = useCallback(() => setReady(true), []);
  const tourner = useRef<(delta: number) => void>(() => {});
  const h = t.hero;
  const wordCount = h.words.length;

  // Les mots du titre apparaissent un par un, comme dans la vidéo de référence
  useEffect(() => {
    if (!ready) return;
    const timers = Array.from({ length: wordCount }, (_, i) =>
      window.setTimeout(() => setWords(i + 1), 500 + i * AUTO_DELAY * 0.5),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [ready, wordCount]);

  const item = trouverProduit(lang, ITEMS[front].id);

  return (
    <section
      id="accueil"
      className="relative h-svh min-h-[700px] w-full overflow-hidden bg-canvas"
    >
      <Intro onDone={onIntroDone} tagline={t.intro.tagline} />

      {/* Lumière de scène derrière l'instrument au premier plan */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 38% at 50% 44%, var(--spot), var(--spot-soft) 55%, transparent 75%)",
        }}
      />
      {/* Sol : une fine ellipse qui donne l'impression d'un plateau tournant */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[63%] h-[110px] w-[min(1100px,120vw)] -translate-x-1/2 rounded-[50%] md:top-[66%]"
        style={{ background: "radial-gradient(closest-side, var(--floor), transparent)" }}
      />

      {/* Sur téléphone, la mention se place en haut, au-dessus des instruments */}
      <p className="eyebrow absolute inset-x-0 top-[96px] z-[3] px-5 text-center md:hidden">
        {h.eyebrow}
      </p>

      <Carousel
        ready={ready}
        onFrontChange={setFront}
        controlsRef={tourner}
        lang={lang}
        label={h.carousel}
        roleLabel={h.carouselRole}
      />

      {/* Bas de page : titre à gauche, produit au premier plan + actions à droite */}
      <div className="absolute inset-x-0 bottom-0 z-[3] pb-8 md:pb-12">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-7 px-5 md:flex-row md:items-end md:justify-between md:px-8">
          <div className="max-w-[640px]">
            <p className="eyebrow hidden md:block">{h.eyebrow}</p>
            <h1 className="font-wide text-[clamp(34px,5.2vw,65px)] leading-[1.1] md:mt-4">
              <span className="sr-only">{h.srTitle}</span>
              {h.words.map((w, i) => (
                <span key={w}>
                  <span className={`hero-word hero-word-${i + 1} ${i < words ? "is-on" : ""}`}>
                    {w}
                  </span>
                  {i < wordCount - 1 ? " " : ""}
                </span>
              ))}
            </h1>
            <p className="mt-4 max-w-[480px] text-[16px] text-ash md:text-[18px] md:leading-[1.35]">
              {h.text}
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex items-end justify-between gap-5 md:justify-end">
              <div className="md:text-right" aria-live="polite">
                <p className="text-[12px] tracking-[0.01em] text-ash">{item.famille}</p>
                <p className="font-wide mt-1 text-[21px] leading-[1.2]">{item.nom}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => tourner.current(-1)}
                  aria-label={h.previous}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-ivory"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => tourner.current(1)}
                  aria-label={h.next}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-ivory"
                >
                  →
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#produits" className="btn-ghost">
                {h.catalogue}
              </a>
              <a
                href="#contact"
                onClick={() => preparerDevis(t.quoteMessage, item.nom)}
                className="btn-primary"
              >
                {h.quote}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Carrousel 3D : les instruments sont posés sur un anneau qui tourne.
 * Rotation automatique, glisser pour tourner, clic sur un instrument pour l'amener devant.
 */
function Carousel({
  ready,
  onFrontChange,
  controlsRef,
  lang,
  label,
  roleLabel,
}: {
  ready: boolean;
  onFrontChange: (index: number) => void;
  controlsRef: React.RefObject<(delta: number) => void>;
  lang: Locale;
  label: string;
  roleLabel: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const state = useRef({
    pos: 0, // position actuelle (en "nombre d'instruments")
    target: 0,
    dragging: false,
    dragStartX: 0,
    dragStartPos: 0,
    moved: 0,
    hover: false,
    lastAuto: 0,
    introStart: 0,
    front: 0,
  });

  const goTo = useCallback((delta: number) => {
    const s = state.current;
    s.target = Math.round(s.target) + delta;
    s.lastAuto = performance.now();
  }, []);

  // Les flèches du bas de page pilotent le carrousel
  useEffect(() => {
    controlsRef.current = goTo;
  }, [controlsRef, goTo]);

  useEffect(() => {
    if (ready) {
      state.current.introStart = performance.now();
      state.current.lastAuto = performance.now() + 1200;
    }
  }, [ready]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const s = state.current;
      const dt = Math.min(64, now - last);
      last = now;
      const stage = stageRef.current;
      if (!stage) {
        raf = requestAnimationFrame(tick);
        return;
      }

      // Rotation automatique (en pause au survol, pendant le glisser, ou si l'onglet est caché)
      if (
        s.introStart &&
        !reduced &&
        !s.dragging &&
        !s.hover &&
        !document.hidden &&
        now - s.lastAuto > AUTO_DELAY
      ) {
        s.target = Math.round(s.target) + 1;
        s.lastAuto = now;
      }

      if (!s.dragging) {
        const k = reduced ? 1 : 1 - Math.pow(1 - 0.075, dt / 16.7);
        s.pos += (s.target - s.pos) * k;
      }

      const w = stage.clientWidth;
      const mobile = w < 768;
      const radiusX = mobile ? w * 0.7 : Math.min(w * 0.4, 560);
      const base = mobile ? Math.min(w * 0.74, 320) : Math.min(w * 0.25, 360);
      const t = s.introStart ? now - s.introStart : -1;
      const light = document.documentElement.getAttribute("data-theme") === "light";

      for (let i = 0; i < N; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        let rel = (i - s.pos) % N;
        if (rel > N / 2) rel -= N;
        if (rel < -N / 2) rel += N;
        const theta = rel * STEP;
        const depth = (Math.cos(theta) + 1) / 2; // 1 = devant, 0 = derrière

        // Apparition : les instruments arrivent du centre, du premier plan vers l'arrière
        const delay = Math.abs(rel) * 140;
        const raw = t < 0 ? 0 : Math.min(1, Math.max(0, (t - delay) / 1000));
        const a = reduced ? (t < 0 ? 0 : 1) : 1 - Math.pow(1 - raw, 3);

        const x = Math.sin(theta) * radiusX * (0.35 + 0.65 * a);
        const y = -(1 - depth) * (mobile ? 26 : 46) + (1 - a) * 50;
        const scale = (0.32 + 0.68 * Math.pow(depth, 2.2)) * (0.75 + 0.25 * a);
        const rotY = -Math.sin(theta) * 34;
        const opacity = Math.min(1, Math.max(0, (depth - 0.3) / 0.4)) * a;
        // En thème clair, on assombrit moins les instruments du fond
        const brightness = light ? 0.85 + 0.15 * depth : 0.4 + 0.6 * Math.pow(depth, 1.5);

        el.style.width = `${base}px`;
        el.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) rotateY(${rotY}deg) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.filter = `brightness(${brightness})`;
        el.style.zIndex = `${Math.round(depth * 100)}`;
        el.tabIndex = Math.abs(rel) < 0.5 ? 0 : -1;
      }

      const f = ((Math.round(s.pos) % N) + N) % N;
      if (f !== s.front) {
        s.front = f;
        onFrontChange(f);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onFrontChange]);

  // Glisser pour faire tourner
  const onPointerDown = (e: React.PointerEvent) => {
    const s = state.current;
    s.dragging = true;
    s.dragStartX = e.clientX;
    s.dragStartPos = s.pos;
    s.moved = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = state.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.dragStartX;
    s.moved = Math.max(s.moved, Math.abs(dx));
    const w = stageRef.current?.clientWidth ?? 1000;
    s.pos = s.dragStartPos - dx / (w * 0.32);
  };
  const onPointerUp = () => {
    const s = state.current;
    if (!s.dragging) return;
    s.dragging = false;
    s.target = Math.round(s.pos);
    s.lastAuto = performance.now();
  };

  const bringToFront = useCallback((i: number) => {
    const s = state.current;
    if (s.moved > 6) return; // c'était un glisser, pas un clic
    let rel = (i - s.target) % N;
    if (rel > N / 2) rel -= N;
    if (rel < -N / 2) rel += N;
    s.target = Math.round(s.target + rel);
    s.lastAuto = performance.now();
  }, []);

  return (
    <div
      className="absolute inset-x-0 top-[10%] z-[2] h-[42%] md:top-[11%] md:h-[56%]"
      onMouseEnter={() => (state.current.hover = true)}
      onMouseLeave={() => (state.current.hover = false)}
    >
      <div
        ref={stageRef}
        role="group"
        aria-roledescription={roleLabel}
        aria-label={label}
        className="relative h-full w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
        style={{ perspective: "1400px" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") goTo(1);
          if (e.key === "ArrowLeft") goTo(-1);
        }}
      >
        {ITEMS.map((it, i) => {
          const nom = trouverProduit(lang, it.id).nom;
          return (
            <button
              key={it.src}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              type="button"
              onClick={() => bringToFront(i)}
              aria-label={nom}
              className="absolute left-1/2 top-1/2 opacity-0 will-change-transform"
              style={{ aspectRatio: "1.6 / 1" }}
            >
              {/* Ombre au sol, douce (pas d'ombre portée sur l'image) */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-[12%] bottom-[2%] h-[14%] rounded-[50%]"
                style={{ background: "radial-gradient(closest-side, var(--floor-shadow), transparent)" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.src}
                alt={nom}
                draggable={false}
                className="pointer-events-none relative h-full w-full object-contain"
                style={{
                  aspectRatio: "1.6 / 1",
                  maskImage: it.fondu ? MASQUES[it.fondu] : undefined,
                  WebkitMaskImage: it.fondu ? MASQUES[it.fondu] : undefined,
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
