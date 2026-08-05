import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-offwhite text-deep">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
