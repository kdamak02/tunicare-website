import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/dictionaries";
import { LOCALES, hasLocale } from "@/lib/i18n";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

// Police Archivo (variable : graisse 100–900, largeur 62–125 %) hébergée dans le projet : aucune dépendance à Google Fonts.
const archivo = localFont({
  variable: "--font-archivo",
  display: "swap",
  weight: "100 900",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  src: [
    { path: "../fonts/archivo-latin.woff2", style: "normal" },
    { path: "../fonts/archivo-latin-ext.woff2", style: "normal" },
  ],
});

// Une page par langue (/fr et /en), générées à l'avance. Toute autre langue renvoie une 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: t.title,
    description: t.description,
    keywords: [
      "matériel chirurgical Tunisie",
      "surgical instruments Tunisia",
      "instruments médicaux Tunisie",
      "AMNOTEC",
      "endoscopie",
      "Tunicare Solutions",
    ],
    authors: [{ name: "Tunicare Solutions" }],
    icons: {
      // /favicon.ico est ajouté automatiquement par Next (app/favicon.ico).
      icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
      apple: { url: "/apple-icon.png", sizes: "180x180" },
    },
    alternates: {
      canonical: `/${lang}`,
      languages: { fr: "/fr", en: "/en", "x-default": "/fr" },
    },
    openGraph: {
      type: "website",
      locale: t.locale,
      url: `/${lang}`,
      siteName: "Tunicare Solutions",
      title: t.title,
      description: t.ogDescription,
      images: [{ url: "/logo-hd.png", alt: "Tunicare Solutions" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.ogDescription,
      images: ["/logo-hd.png"],
    },
  };
}

/**
 * Pose le thème (clair/sombre) sur <html> avant le premier affichage, pour éviter
 * un flash de la mauvaise couleur. Ordre : choix mémorisé du visiteur, sinon
 * réglage de son appareil, sinon sombre.
 */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("tunicare-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

/**
 * Données structurées pour Google : nom du site, logo de l'entreprise et coordonnées.
 * Aide Google à afficher « Tunicare Solutions » et le logo dans les résultats de recherche.
 */
function structuredData(lang: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Tunicare Solutions",
        alternateName: "Tunicare",
        url: `${SITE_URL}/`,
        inLanguage: lang,
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Tunicare Solutions",
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/icon.png`,
        email: CONTACT_EMAIL,
        telephone: "+216 23 198 831",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Av. Les Violettes, Imm. Les Jardins, Jmazh 2, Mnihla",
          addressLocality: "Ariana",
          postalCode: "2094",
          addressCountry: "TN",
        },
      },
    ],
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${archivo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(lang)) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-ivory">
        <Header lang={lang} t={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer t={dict} />
      </body>
    </html>
  );
}
