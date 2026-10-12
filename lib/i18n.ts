// Langues du site. Ajouter une langue : l'ajouter ici + créer son dictionnaire.
export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

export const hasLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/** Remplace {cle} dans un texte, ex. format("{n} gammes", { n: 18 }). */
export function format(text: string, values: Record<string, string | number>) {
  return text.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
}
