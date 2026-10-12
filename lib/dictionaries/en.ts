import type { Dictionary } from "./fr";

// Site copy in English. Same structure as fr.ts (TypeScript checks it).

const en: Dictionary = {
  meta: {
    title: "Tunicare Solutions | Premium surgical equipment in Tunisia",
    description:
      "Tunicare Solutions distributes AMNOTEC International Medical surgical equipment (Tuttlingen, Germany) in Tunisia: open surgery, endoscopy and fluorescence imaging.",
    ogDescription:
      "Distributor of premium German surgical equipment for clinics, hospitals and healthcare professionals in Tunisia.",
    locale: "en_US",
  },
  nav: {
    links: [
      { href: "#accueil", label: "Home" },
      { href: "#a-propos", label: "About" },
      { href: "#produits", label: "Products" },
      { href: "#contact", label: "Contact" },
    ],
    contact: "Contact us",
    quote: "Request a quote",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Tunicare Solutions, back to home",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    theme: "Switch theme (light or dark)",
    language: "Site language",
  },
  intro: {
    tagline: "AMNOTEC distributor in Tunisia",
  },
  hero: {
    eyebrow: "Tunicare Solutions · AMNOTEC distributor",
    srTitle: "Tunicare Solutions, German surgical equipment in Tunisia: ",
    words: ["Operate.", "Explore.", "Reveal."],
    text: "Instruments, endoscopy and fluorescence imaging made in Tuttlingen, for clinics and hospitals across Tunisia.",
    catalogue: "View the catalogue",
    quote: "Request a quote",
    previous: "Previous instrument",
    next: "Next instrument",
    carousel: "AMNOTEC instruments distributed by Tunicare",
    carouselRole: "carousel",
  },
  quoteMessage: "Hello, I would like to receive a quote for: {produit}.",
  about: {
    eyebrow: "About",
    title: "Connecting German surgery with Tunisian operating rooms",
    text: "Tunicare Solutions distributes in Tunisia the surgical equipment of AMNOTEC International Medical, a manufacturer based in Tuttlingen, Germany. Clinics, hospitals and practitioners get reliable equipment, with local support from selection through after-sales service.",
    place: "Mnihla, Ariana · RC C02171522025",
    values: [
      {
        title: "Made in Tuttlingen",
        text: "Instruments and systems designed in the world capital of surgical technology.",
      },
      {
        title: "Advice by specialty",
        text: "We help you choose the right equipment for your operating room and procedures.",
      },
      {
        title: "Support after purchase",
        text: "A local contact for maintenance, spare parts and replacement.",
      },
    ],
  },
  products: {
    eyebrow: "Catalogue · {n} AMNOTEC ranges",
    title: "Choose your specialty",
    tabs: "Product families",
    quote: "Request a quote",
  },
  why: {
    eyebrow: "Why Tunicare",
    title: "German precision, with local support",
    reasons: [
      {
        title: "German quality",
        text: "Medical-grade stainless steel, sapphire optics, tested to current operating-room standards.",
      },
      {
        title: "Tailored quotes",
        text: "Each request is reviewed according to your specialty, volume and budget.",
      },
      {
        title: "After-sales service",
        text: "Maintenance, spare parts and replacement handled from Tunisia.",
      },
      {
        title: "Fully registered",
        text: "Tunisian trade register and tax number: a reliable supplier for your purchases.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Tell us what surgical equipment you need",
    text: "Describe your request and we will get back to you with a quote suited to your facility.",
    phone: "Phone",
    email: "Email",
    address: "Address",
    addressValue: "Av. Les Violettes, Imm. Les Jardins, Jmazh 2, Mnihla, Ariana 2094, Tunisia",
    map: "Tunicare Solutions location",
  },
  form: {
    name: "Full name",
    namePlaceholder: "Your name",
    company: "Company",
    companyPlaceholder: "Clinic, hospital, practice…",
    email: "Email",
    emailPlaceholder: "you@example.com",
    phone: "Phone",
    phonePlaceholder: "+216 ...",
    message: "Message",
    messagePlaceholder: "Describe the surgical equipment you need…",
    send: "Send request",
    sending: "Sending…",
    sent: "Thank you! Your request has been sent, we will get back to you shortly.",
    mailSubject: "Quote request",
  },
  footer: {
    blurb:
      "Distributor of German surgical equipment for clinics, hospitals and healthcare professionals in Tunisia.",
    quickLinks: "Quick links",
    contact: "Contact",
    follow: "Follow us",
    rights: "All rights reserved.",
  },
};

export default en;
