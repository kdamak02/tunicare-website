"use client";

import Image from "next/image";
import { useState } from "react";
import { FAMILLES, type Produit } from "@/lib/catalogue";
import Reveal from "./Reveal";

const TOTAL = FAMILLES.reduce((n, f) => n + f.produits.length, 0);

/** Pré-remplit le message du formulaire de contact avec le produit choisi. */
function preparerDevis(produit: string) {
  const champ = document.getElementById("message") as HTMLTextAreaElement | null;
  if (champ) {
    champ.value = `Bonjour, je souhaite recevoir un devis pour : ${produit}.`;
  }
}

export default function Products() {
  const [actif, setActif] = useState(FAMILLES[0].id);
  const famille = FAMILLES.find((f) => f.id === actif) ?? FAMILLES[0];

  return (
    <section id="produits" className="section bg-canvas">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Catalogue · {TOTAL} gammes AMNOTEC</p>
            <h2 className="font-wide mt-5 text-[clamp(28px,3.4vw,42px)] leading-[1.15]">
              Choisissez votre spécialité
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Familles de produits"
            className="flex w-full gap-1 overflow-x-auto rounded-[40px] bg-card p-1 sm:w-fit"
          >
            {FAMILLES.map((f) => {
              const selected = f.id === actif;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  id={`onglet-${f.id}`}
                  aria-selected={selected}
                  aria-controls="panneau-produits"
                  onClick={() => setActif(f.id)}
                  className={`shrink-0 whitespace-nowrap rounded-[40px] px-4 py-2.5 text-[15px] transition-colors sm:px-5 ${
                    selected
                      ? "bg-ivory text-canvas"
                      : "text-ash hover:bg-raised hover:text-ivory"
                  }`}
                >
                  {f.nom}
                  <span className={`ml-2 text-xs ${selected ? "text-canvas/55" : "text-slate"}`}>
                    {f.produits.length}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          id="panneau-produits"
          role="tabpanel"
          aria-labelledby={`onglet-${famille.id}`}
          className="mt-10"
        >
          <p key={`txt-${famille.id}`} className="animate-fade-up max-w-xl text-[18px] leading-[1.35] text-ash">
            {famille.accroche}
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {famille.produits.map((produit, index) => (
              <li
                key={`${famille.id}-${produit.nom}`}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <CarteProduit produit={produit} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CarteProduit({ produit }: { produit: Produit }) {
  const detoure = produit.rendu === "detoure";

  return (
    <article className="card group flex h-full flex-col p-3">
      <div className="relative aspect-[3/2] overflow-hidden rounded-[8px] bg-plate">
        <Image
          src={produit.image}
          alt={produit.nom}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className={`transition-transform duration-700 ease-out group-hover:scale-[1.05] ${
            detoure ? "object-contain p-8" : "object-cover"
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-6">
        <h3 className="font-wide text-[21px] leading-[1.2]">
          {produit.nom}
        </h3>
        <p className="mt-3 flex-1 text-[15px] leading-[1.5] text-ash">
          {produit.description}
        </p>
        <a
          href="#contact"
          onClick={() => preparerDevis(produit.nom)}
          className="mt-6 inline-flex w-fit items-center gap-3 text-[15px] text-ivory"
        >
          Demander un devis
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/25 text-[15px] transition-all duration-300 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-white"
          >
            ↗
          </span>
        </a>
      </div>
    </article>
  );
}
