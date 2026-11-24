import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Products from "@/components/Products";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";
import SectionSheet from "@/components/SectionSheet";
import SectionRail from "@/components/SectionRail";
import { getCatalogue } from "@/lib/catalogue";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Hero lang={lang} t={t} />
      <Marquee
        label={t.products.title}
        items={getCatalogue(lang).flatMap((f) => f.produits.map((p) => p.nom))}
      />
      {/* Chaque section est une « feuille » numérotée qui glisse sur la précédente (fonds alternés) */}
      <SectionSheet index={1} total={4} label={t.about.eyebrow}>
        <About t={t.about} />
      </SectionSheet>
      <SectionSheet index={2} total={4} label={t.nav.links[2].label} tone="alt">
        <Products lang={lang} t={t} familles={getCatalogue(lang)} />
      </SectionSheet>
      <SectionSheet index={3} total={4} label={t.why.eyebrow}>
        <WhyUs t={t.why} />
      </SectionSheet>
      <SectionSheet index={4} total={4} label={t.contact.eyebrow} tone="alt">
        <Contact t={t} />
      </SectionSheet>

      <SectionRail
        label={t.nav.sections}
        items={[
          { id: "accueil", label: t.nav.links[0].label },
          { id: "a-propos", label: t.about.eyebrow },
          { id: "produits", label: t.nav.links[2].label },
          { id: "pourquoi", label: t.why.eyebrow },
          { id: "contact", label: t.contact.eyebrow },
        ]}
      />
    </>
  );
}
