import { format } from "./i18n";

/** Pré-remplit le message du formulaire de contact avec le produit choisi. */
export function preparerDevis(modele: string, produit: string) {
  const champ = document.getElementById("message") as HTMLTextAreaElement | null;
  if (champ) champ.value = format(modele, { produit });
}
