import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Police Archivo (variable : graisse 100–900, largeur 62–125 %) hébergée dans le projet : aucune dépendance à Google Fonts.
const archivo = localFont({
  variable: "--font-archivo",
  display: "swap",
  weight: "100 900",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  src: [
    { path: "./fonts/archivo-latin.woff2", style: "normal" },
    { path: "./fonts/archivo-latin-ext.woff2", style: "normal" },
  ],
});

const siteUrl = "https://tunicare-solutions.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tunicare Solutions | Matériel médico-chirurgical premium en Tunisie",
    template: "%s | Tunicare Solutions",
  },
  description:
    "Tunicare Solutions distribue en Tunisie du matériel médico-chirurgical haut de gamme, partenaire d'AMNOTEC International Medical (Tuttlingen, Allemagne). Chirurgie ouverte, endoscopie, systèmes de guidage chirurgical.",
  keywords: [
    "matériel chirurgical Tunisie",
    "instruments médicaux Tunisie",
    "AMNOTEC",
    "endoscopie",
    "chirurgie guidée",
    "Tunicare Solutions",
  ],
  authors: [{ name: "Tunicare Solutions" }],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_TN",
    url: siteUrl,
    siteName: "Tunicare Solutions",
    title: "Tunicare Solutions | Matériel médico-chirurgical premium en Tunisie",
    description:
      "Distributeur de confiance de matériel médico-chirurgical allemand haut de gamme pour cliniques, hôpitaux et professionnels de santé en Tunisie.",
    images: [
      {
        url: "/logo-hd.png",
        width: 1200,
        height: 630,
        alt: "Tunicare Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tunicare Solutions | Matériel médico-chirurgical premium en Tunisie",
    description:
      "Distributeur de confiance de matériel médico-chirurgical allemand haut de gamme en Tunisie.",
    images: ["/logo-hd.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ivory">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
