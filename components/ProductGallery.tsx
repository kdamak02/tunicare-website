"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Photo } from "@/lib/catalogue";
import type { Dictionary } from "@/lib/dictionaries";
import { format } from "@/lib/i18n";

type T = Dictionary["product"];

const MIN = 1;
const MAX = 6;

/**
 * Photo principale + vignettes. Un clic ouvre la visionneuse plein écran :
 * zoom à la molette, au pincement, au double-clic ou avec les boutons,
 * déplacement en glissant, flèches du clavier pour changer de photo, Échap pour fermer.
 */
export default function ProductGallery({
  photos,
  alt,
  t,
}: {
  photos: Photo[];
  alt: string;
  t: T;
}) {
  const [actif, setActif] = useState(0);
  const [ouvert, setOuvert] = useState(false);
  const photo = photos[actif];
  const plusieurs = photos.length > 1;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOuvert(true)}
        aria-label={`${alt} — ${t.zoomHint}`}
        className={`pi-media group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[12px] ${
          photo.rendu === "detoure" ? "bg-white" : "bg-plate"
        }`}
      >
        <Image
          key={photo.src}
          src={photo.src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 600px, 100vw"
          className={`animate-fade-up transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
            photo.rendu === "detoure"
              ? "object-contain p-8 md:p-12"
              : "object-cover"
          }`}
        />
        <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 rounded-[40px] bg-[#0b1526]/75 px-3.5 py-2 text-[13px] text-white backdrop-blur-md">
          <IconZoom />
          {t.zoomHint}
        </span>
      </button>

      {plusieurs && (
        <ul
          className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5"
          aria-label={t.gallery}
        >
          {photos.map((p, i) => (
            <li key={p.src} className="pi-thumb">
              <button
                type="button"
                onClick={() => setActif(i)}
                aria-label={format(t.photo, { n: i + 1, total: photos.length })}
                aria-current={i === actif ? "true" : undefined}
                className={`relative block aspect-square w-full overflow-hidden rounded-[8px] ring-2 ${
                  p.rendu === "detoure" ? "bg-white" : "bg-plate"
                } transition ${
                  i === actif
                    ? "ring-brand"
                    : "ring-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={p.src}
                  alt=""
                  fill
                  sizes="120px"
                  className={
                    p.rendu === "detoure"
                      ? "object-contain p-2"
                      : "object-cover"
                  }
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {ouvert &&
        createPortal(
          <Visionneuse
            photos={photos}
            depart={actif}
            alt={alt}
            t={t}
            onClose={(i) => {
              setActif(i);
              setOuvert(false);
            }}
          />,
          document.body,
        )}
    </div>
  );
}

function Visionneuse({
  photos,
  depart,
  alt,
  t,
  onClose,
}: {
  photos: Photo[];
  depart: number;
  alt: string;
  t: T;
  onClose: (index: number) => void;
}) {
  const [index, setIndex] = useState(depart);
  const [vue, setVue] = useState({ s: 1, x: 0, y: 0 });
  const [enGeste, setEnGeste] = useState(false);
  const zone = useRef<HTMLDivElement>(null);
  const pointeurs = useRef(new Map<number, { x: number; y: number }>());
  const geste = useRef<{
    dist: number;
    s: number;
    x: number;
    y: number;
    depart: { x: number; y: number };
  } | null>(null);
  const plusieurs = photos.length > 1;

  const aller = useCallback(
    (sens: number) => {
      setIndex((i) => (i + sens + photos.length) % photos.length);
      setVue({ s: 1, x: 0, y: 0 });
    },
    [photos.length],
  );

  /** Zoome vers `s`, en gardant fixe le point (px, py) mesuré depuis le centre de la zone. */
  const zoomer = useCallback((s: number, px = 0, py = 0) => {
    setVue((v) => {
      const ns = Math.min(MAX, Math.max(MIN, s));
      if (ns === 1) return { s: 1, x: 0, y: 0 };
      const k = ns / v.s;
      return { s: ns, x: px - (px - v.x) * k, y: py - (py - v.y) * k };
    });
  }, []);

  const pointDepuisCentre = (clientX: number, clientY: number) => {
    const r = zone.current!.getBoundingClientRect();
    return {
      x: clientX - (r.left + r.width / 2),
      y: clientY - (r.top + r.height / 2),
    };
  };

  // Clavier, blocage du défilement de la page
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(index);
      else if (e.key === "ArrowRight" && plusieurs) aller(1);
      else if (e.key === "ArrowLeft" && plusieurs) aller(-1);
      else if (e.key === "+" || e.key === "=")
        setVue((v) => ({ ...v, s: Math.min(MAX, v.s * 1.5) }));
      else if (e.key === "-") zoomer(0);
    };
    window.addEventListener("keydown", onKey);
    const avant = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = avant;
    };
  }, [aller, index, onClose, plusieurs, zoomer]);

  // Molette : écouteur non passif pour empêcher le défilement de la page
  useEffect(() => {
    const el = zone.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const p = pointDepuisCentre(e.clientX, e.clientY);
      setVue((v) => {
        const ns = Math.min(
          MAX,
          Math.max(MIN, v.s * Math.exp(-e.deltaY * 0.0012)),
        );
        if (ns === 1) return { s: 1, x: 0, y: 0 };
        const k = ns / v.s;
        return { s: ns, x: p.x - (p.x - v.x) * k, y: p.y - (p.y - v.y) * k };
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  function onPointerDown(e: React.PointerEvent) {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointeurs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setEnGeste(true);
    const pts = [...pointeurs.current.values()];
    geste.current = {
      dist:
        pts.length === 2
          ? Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y)
          : 0,
      s: vue.s,
      x: vue.x,
      y: vue.y,
      depart: { x: e.clientX, y: e.clientY },
    };
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!pointeurs.current.has(e.pointerId) || !geste.current) return;
    pointeurs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointeurs.current.values()];
    const g = geste.current;

    if (pts.length === 2 && g.dist > 0) {
      // Pincement : zoom autour du milieu des deux doigts
      const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const m = pointDepuisCentre(
        (pts[0].x + pts[1].x) / 2,
        (pts[0].y + pts[1].y) / 2,
      );
      const ns = Math.min(MAX, Math.max(MIN, g.s * (d / g.dist)));
      const k = ns / g.s;
      setVue(
        ns === 1
          ? { s: 1, x: 0, y: 0 }
          : { s: ns, x: m.x - (m.x - g.x) * k, y: m.y - (m.y - g.y) * k },
      );
    } else if (pts.length === 1 && g.s > 1) {
      // Déplacement de l'image zoomée
      setVue({
        s: g.s,
        x: g.x + e.clientX - g.depart.x,
        y: g.y + e.clientY - g.depart.y,
      });
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    const g = geste.current;
    if (g && pointeurs.current.size === 1 && g.s === 1 && plusieurs) {
      // Glissement horizontal sans zoom : photo suivante / précédente
      const dx = e.clientX - g.depart.x;
      if (Math.abs(dx) > 60) aller(dx < 0 ? 1 : -1);
    }
    pointeurs.current.delete(e.pointerId);
    const pts = [...pointeurs.current.values()];
    geste.current = pts.length
      ? { dist: 0, s: vue.s, x: vue.x, y: vue.y, depart: pts[0] }
      : null;
    if (!pts.length) setEnGeste(false);
  }

  function onDoubleClick(e: React.MouseEvent) {
    const p = pointDepuisCentre(e.clientX, e.clientY);
    zoomer(vue.s > 1 ? 1 : 2.5, p.x, p.y);
  }

  const photo = photos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex flex-col bg-[#060c17]/95 text-white backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <p className="min-w-0 truncate text-[14px] text-white/75">
          {alt}
          {plusieurs && (
            <span className="ml-3 text-white/50">
              {format(t.photo, { n: index + 1, total: photos.length })}
            </span>
          )}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <BoutonRond
            label={t.zoomOut}
            onClick={() => zoomer(vue.s / 1.5)}
            disabled={vue.s <= MIN}
          >
            −
          </BoutonRond>
          <span className="w-12 text-center text-[13px] tabular-nums text-white/70">
            {Math.round(vue.s * 100)}%
          </span>
          <BoutonRond
            label={t.zoomIn}
            onClick={() => zoomer(vue.s * 1.5)}
            disabled={vue.s >= MAX}
          >
            +
          </BoutonRond>
          <BoutonRond
            label={t.zoomReset}
            onClick={() => zoomer(1)}
            disabled={vue.s === 1}
          >
            1:1
          </BoutonRond>
          <BoutonRond label={t.close} onClick={() => onClose(index)}>
            ✕
          </BoutonRond>
        </div>
      </div>

      <div
        ref={zone}
        className={`relative flex-1 touch-none select-none overflow-hidden ${
          vue.s > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={onDoubleClick}
        onClick={(e) => {
          // Un clic simple sur le fond (hors image, sans zoom) ferme la visionneuse
          if (e.target === e.currentTarget && vue.s === 1) onClose(index);
        }}
      >
        <div
          className="absolute inset-4 md:inset-10"
          style={{
            transform: `translate(${vue.x}px, ${vue.y}px) scale(${vue.s})`,
            transition: enGeste
              ? "none"
              : "transform 0.25s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div
            className={`relative h-full w-full ${photo.rendu === "detoure" ? "rounded-[12px] bg-white" : ""}`}
          >
            <Image
              key={photo.src}
              src={photo.src}
              alt={alt}
              fill
              unoptimized
              sizes="100vw"
              draggable={false}
              className={`pointer-events-none object-contain ${photo.rendu === "detoure" ? "p-6 md:p-12" : ""}`}
            />
          </div>
        </div>

        {plusieurs && (
          <>
            <FlecheNav
              cote="gauche"
              label={t.prevPhoto}
              onClick={() => aller(-1)}
            />
            <FlecheNav
              cote="droite"
              label={t.nextPhoto}
              onClick={() => aller(1)}
            />
          </>
        )}
      </div>

      <p className="px-4 pb-4 pt-2 text-center text-[12px] text-white/50">
        {t.zoomHelp}
      </p>
    </div>
  );
}

function BoutonRond({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-10 min-w-10 items-center justify-center rounded-full border border-white/25 px-2 text-[15px] transition hover:bg-white/10 disabled:opacity-35"
    >
      {children}
    </button>
  );
}

function FlecheNav({
  cote,
  label,
  onClick,
}: {
  cote: "gauche" | "droite";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerDown={(e) => e.stopPropagation()}
      className={`absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl backdrop-blur-md transition hover:bg-white/20 ${
        cote === "gauche" ? "left-3 md:left-6" : "right-3 md:right-6"
      }`}
    >
      {cote === "gauche" ? "←" : "→"}
    </button>
  );
}

function IconZoom() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
    </svg>
  );
}
