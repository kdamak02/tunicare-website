import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";
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
      <About t={t.about} />
      <Products t={t} familles={getCatalogue(lang)} />
      <WhyUs t={t.why} />
      <Contact t={t} />
    </>
  );
}
