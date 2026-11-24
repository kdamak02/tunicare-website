import { format } from "./i18n";

const CLE = "tunicare-devis";

/** Pré-remplit le message du formulaire de contact avec le produit choisi. */
export function preparerDevis(modele: string, produit: string) {
  const texte = format(modele, { produit });
  const champ = document.getElementById("message") as HTMLTextAreaElement | null;
  if (champ) champ.value = texte;
  else {
    // Formulaire sur une autre page (page produit -> accueil) : on le garde pour l'arrivée
    try {
      sessionStorage.setItem(CLE, texte);
    } catch {}
  }
}

/** À l'affichage du formulaire : reprend un message préparé depuis une page produit. */
export function reprendreDevis(): string | null {
  try {
    const texte = sessionStorage.getItem(CLE);
    if (texte) sessionStorage.removeItem(CLE);
    return texte;
  } catch {
    return null;
  }
}
