import type { Locale } from "../i18n";
import en from "./en";
import fr, { type Dictionary } from "./fr";

const DICTIONARIES: Record<Locale, Dictionary> = { fr, en };

export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];
export type { Dictionary };
