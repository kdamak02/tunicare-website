"use client";

import { preparerDevis } from "@/lib/devis";

/** Lien « Demander un devis » : pré-remplit le formulaire de contact avec le produit. */
export default function QuoteLink({
  href,
  modele,
  produit,
  className,
  children,
}: {
  href: string;
  modele: string;
  produit: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} onClick={() => preparerDevis(modele, produit)} className={className}>
      {children}
    </a>
  );
}
