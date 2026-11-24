"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

/**
 * Rail de navigation fixe à droite (grands écrans) : un repère par section.
 * Le repère de la section visible s'allonge en bleu ; un clic y emmène.
 */
export default function SectionRail({ items, label }: { items: Item[]; label: string }) {
  const [actif, setActif] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActif(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={label}
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ol className="flex flex-col items-end gap-4">
        {items.map((item, i) => {
          const on = item.id === actif;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={on ? "true" : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  className={`text-[11px] uppercase tracking-[0.14em] transition-all duration-300 ${
                    on
                      ? "translate-x-0 text-ivory opacity-0 group-hover:opacity-100 min-[1680px]:opacity-100"
                      : "translate-x-2 text-ash opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                >
                  {String(i).padStart(2, "0")} · {item.label}
                </span>
                <span
                  className={`block h-[3px] rounded-full transition-all duration-500 ${
                    on ? "w-8 bg-brand shadow-[0_0_12px_var(--brand)]" : "w-3 bg-ivory/30 group-hover:w-5 group-hover:bg-ivory/60"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
