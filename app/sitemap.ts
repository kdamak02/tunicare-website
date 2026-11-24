import type { MetadataRoute } from "next";
import { idsProduits } from "@/lib/catalogue";
import { LOCALES } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

/** Plan du site pour Google : l'accueil et chaque page produit, en français et en anglais. */
export default function sitemap(): MetadataRoute.Sitemap {
  const chemins = [
    { chemin: "", priorite: 1, frequence: "monthly" as const },
    ...idsProduits().map((id) => ({ chemin: `/produits/${id}`, priorite: 0.8, frequence: "monthly" as const })),
  ];

  return chemins.flatMap(({ chemin, priorite, frequence }) =>
    LOCALES.map((lang) => ({
      url: `${SITE_URL}/${lang}${chemin}`,
      lastModified: new Date(),
      changeFrequency: frequence,
      priority: lang === "fr" ? priorite : Math.round(priorite * 90) / 100,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${chemin}`])),
      },
    })),
  );
}
