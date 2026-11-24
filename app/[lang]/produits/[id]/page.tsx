import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import QuoteLink from "@/components/QuoteLink";
import BlurText from "@/components/BlurText";
import Magnetic from "@/components/Magnetic";
import ProductIntro from "@/components/ProductIntro";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import Tilt from "@/components/Tilt";
import { getProduit, idsProduits } from "@/lib/catalogue";
import { getDictionary } from "@/lib/dictionaries";
import { LOCALES, format, hasLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

// Une page par produit et par langue, générées à l'avance. Tout autre identifiant renvoie une 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return idsProduits().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/produits/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  if (!hasLocale(lang)) return {};
  const data = getProduit(lang, id);
  if (!data) return {};
  const { produit } = data;
  const t = getDictionary(lang);
  const title = format(t.product.metaTitle, { produit: produit.nom });
  return {
    title,
    description: produit.description,
    alternates: {
      canonical: `/${lang}/produits/${id}`,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `/${l}/produits/${id}`])),
        "x-default": `/fr/produits/${id}`,
      },
    },
    openGraph: {
      type: "website",
      locale: t.meta.locale,
      url: `/${lang}/produits/${id}`,
      siteName: "Tunicare Solutions",
      title,
      description: produit.description,
      images: [{ url: produit.image, alt: produit.nom }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: produit.description,
      images: [produit.image],
    },
  };
}

export default async function PageProduit({
  params,
}: PageProps<"/[lang]/produits/[id]">) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();
  const data = getProduit(lang, id);
  if (!data) notFound();

  const { produit, famille, autres, precedent, suivant } = data;
  const t = getDictionary(lang);
  const p = t.product;
  const accueil = `/${lang}`;
  const photos = [
    { src: produit.image, rendu: produit.rendu },
    ...produit.galerie,
  ];

  // Données structurées pour Google : produit + fil d'Ariane
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: produit.nom,
        description: produit.description,
        image: photos.map((ph) => `${SITE_URL}${ph.src}`),
        brand: { "@type": "Brand", name: "AMNOTEC" },
        manufacturer: {
          "@type": "Organization",
          name: "AMNOTEC International Medical GmbH",
        },
        category: famille.nom,
        url: `${SITE_URL}/${lang}/produits/${id}`,
        seller: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: p.home,
            item: `${SITE_URL}/${lang}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: p.products,
            item: `${SITE_URL}/${lang}#produits`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: produit.nom,
            item: `${SITE_URL}/${lang}/produits/${id}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-[112px] md:px-8 md:pt-[128px]">
        {/* Fil d'Ariane */}
        <nav aria-label={p.breadcrumb} className="text-[14px] text-slate">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <a href={accueil} className="transition-colors hover:text-ivory">
                {p.home}
              </a>
            </li>
            <li aria-hidden>/</li>
            <li>
              <a
                href={`${accueil}#produits`}
                className="transition-colors hover:text-ivory"
              >
                {p.products}
              </a>
            </li>
            <li aria-hidden>/</li>
            <li>{famille.nom}</li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ash">
              {produit.nom}
            </li>
          </ol>
        </nav>

        {/* Photo + présentation (entrée animée) */}
        <ProductIntro className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="lg:sticky lg:top-[104px] lg:self-start">
            <ProductGallery photos={photos} alt={produit.nom} t={p} />
          </div>

          <div>
            <p className="pi-text eyebrow">{famille.nom}</p>
            <BlurText
              as="h1"
              text={produit.nom}
              stagger={0.09}
              className="font-wide mt-5 text-[clamp(32px,4.2vw,52px)] leading-[1.08]"
            />
            <p className="pi-text mt-4 text-[14px] text-slate">{p.madeIn}</p>
            <p className="pi-text mt-7 text-[19px] leading-[1.45] text-ash">
              {produit.description}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label={p.highlights}>
              {produit.points.map((pt) => (
                <li
                  key={pt}
                  className="pi-chip rounded-[40px] border border-ivory/15 px-3.5 py-1.5 text-[14px] text-ivory"
                >
                  {pt}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <div className="pi-cta">
                <Magnetic>
                  <QuoteLink
                    href={`${accueil}#contact`}
                    modele={t.quoteMessage}
                    produit={produit.nom}
                    className="btn-primary"
                  >
                    {p.quote}
                  </QuoteLink>
                </Magnetic>
              </div>
              <div className="pi-cta">
                <Magnetic strength={0.25}>
                  <a href="tel:+21623198831" className="btn-ghost">
                    {p.call} · +216 23 198 831
                  </a>
                </Magnetic>
              </div>
            </div>

            <div className="mt-12 space-y-5 border-t border-ivory/10 pt-10 text-[17px] leading-[1.65] text-ash">
              {produit.details.map((para) => (
                <p key={para.slice(0, 40)} className="pi-text">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </ProductIntro>

        {/* Gamme + catalogue */}
        <div className="mt-20 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <SpotlightCard className="h-full p-7 md:p-10">
              <BlurText
                as="h2"
                text={p.range}
                className="font-wide text-[24px] leading-[1.2]"
              />
              <ul className="mt-7 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                {produit.gamme.map((g) => (
                  <li
                    key={g}
                    className="flex gap-3 text-[16px] leading-[1.45] text-ash"
                  >
                    <span
                      aria-hidden
                      className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-brand"
                    />
                    {g}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={120}>
            <SpotlightCard className="flex h-full flex-col p-7 md:p-10">
              <IconPdf />
              <h2 className="font-wide mt-6 text-[22px] leading-[1.2]">
                {p.catalogueTitle}
              </h2>
              {produit.pdf ? (
                <>
                  <p className="mt-3 flex-1 text-[15px] leading-[1.55] text-ash">
                    {p.catalogueText}
                  </p>
                  <a
                    href={produit.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost mt-7 w-full !whitespace-normal text-center"
                  >
                    {p.download} ↓
                  </a>
                </>
              ) : (
                <>
                  <p className="mt-3 flex-1 text-[15px] leading-[1.55] text-ash">
                    {p.onRequest}
                  </p>
                  <QuoteLink
                    href={`${accueil}#contact`}
                    modele={t.quoteMessage}
                    produit={produit.nom}
                    className="btn-ghost mt-7 w-full"
                  >
                    {p.quote}
                  </QuoteLink>
                </>
              )}
            </SpotlightCard>
          </Reveal>
        </div>

        {/* Autres produits de la famille */}
        {autres.length > 0 && (
          <section className="mt-24">
            <BlurText
              as="h2"
              text={`${p.related} · ${famille.nom}`}
              className="font-wide text-[clamp(24px,2.6vw,32px)] leading-[1.2]"
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {autres.map((a, i) => (
                <li key={a.id}>
                  <Reveal delay={(i % 3) * 90} className="h-full">
                    <Tilt className="h-full">
                      <SpotlightCard className="group h-full">
                        <Link
                          href={`/${lang}/produits/${a.id}`}
                          className="flex h-full flex-col p-3"
                        >
                          <span className="relative block aspect-[3/2] overflow-hidden rounded-[8px] bg-plate">
                            <Image
                              src={a.image}
                              alt={a.nom}
                              fill
                              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                              className={`transition-transform duration-700 ease-out group-hover:scale-[1.05] ${
                                a.rendu === "detoure"
                                  ? "object-contain p-8"
                                  : "object-cover"
                              }`}
                            />
                          </span>
                          <span className="flex items-center justify-between gap-3 px-3 pb-2 pt-5">
                            <span className="font-wide text-[18px] leading-[1.25]">
                              {a.nom}
                            </span>
                            <span
                              aria-hidden
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ivory/25 transition-all duration-300 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-white"
                            >
                              ↗
                            </span>
                          </span>
                        </Link>
                      </SpotlightCard>
                    </Tilt>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Précédent / suivant */}
        <nav className="mt-16 grid gap-3 border-t border-ivory/10 pt-8 sm:grid-cols-2">
          <Link
            href={`/${lang}/produits/${precedent.id}`}
            className="group rounded-[12px] p-4 transition-colors hover:bg-card"
          >
            <span className="eyebrow">← {p.previous}</span>
            <span className="font-wide mt-3 block text-[18px]">
              {precedent.nom}
            </span>
          </Link>
          <Link
            href={`/${lang}/produits/${suivant.id}`}
            className="group rounded-[12px] p-4 text-right transition-colors hover:bg-card"
          >
            <span className="eyebrow">{p.next} →</span>
            <span className="font-wide mt-3 block text-[18px]">
              {suivant.nom}
            </span>
          </Link>
        </nav>

        <p className="mt-10 text-center">
          <a
            href={`${accueil}#produits`}
            className="text-[15px] text-ash underline-offset-4 hover:text-ivory hover:underline"
          >
            {p.back}
          </a>
        </p>
      </div>
    </>
  );
}

function IconPdf() {
  return (
    <span
      className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/15 text-brand"
      aria-hidden
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5M9 13h6M9 17h6" />
      </svg>
    </span>
  );
}
