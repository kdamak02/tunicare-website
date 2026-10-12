// Textes du site en français. La version anglaise (en.ts) doit avoir exactement la même structure.

const fr = {
  meta: {
    title: "Tunicare Solutions | Matériel médico-chirurgical premium en Tunisie",
    description:
      "Tunicare Solutions distribue en Tunisie le matériel médico-chirurgical d'AMNOTEC International Medical (Tuttlingen, Allemagne) : chirurgie ouverte, endoscopie, imagerie par fluorescence.",
    ogDescription:
      "Distributeur de matériel médico-chirurgical allemand haut de gamme pour cliniques, hôpitaux et professionnels de santé en Tunisie.",
    locale: "fr_TN",
  },
  nav: {
    links: [
      { href: "#accueil", label: "Accueil" },
      { href: "#a-propos", label: "À propos" },
      { href: "#produits", label: "Produits" },
      { href: "#contact", label: "Contact" },
    ],
    contact: "Nous contacter",
    quote: "Demander un devis",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    home: "Tunicare Solutions, retour à l'accueil",
    mainNav: "Navigation principale",
    mobileNav: "Navigation mobile",
    theme: "Changer de thème (clair ou sombre)",
    language: "Langue du site",
  },
  intro: {
    tagline: "Distributeur AMNOTEC en Tunisie",
  },
  hero: {
    eyebrow: "Tunicare Solutions · Distributeur AMNOTEC",
    srTitle: "Tunicare Solutions, matériel chirurgical allemand en Tunisie : ",
    words: ["Opérer.", "Explorer.", "Révéler."],
    text: "Instruments, endoscopie et imagerie par fluorescence fabriqués à Tuttlingen, pour les cliniques et hôpitaux de Tunisie.",
    catalogue: "Voir le catalogue",
    quote: "Demander un devis",
    previous: "Instrument précédent",
    next: "Instrument suivant",
    carousel: "Instruments AMNOTEC distribués par Tunicare",
    carouselRole: "carrousel",
  },
  quoteMessage: "Bonjour, je souhaite recevoir un devis pour : {produit}.",
  about: {
    eyebrow: "À propos",
    title: "Le lien entre la chirurgie allemande et les blocs opératoires tunisiens",
    text: "Tunicare Solutions distribue en Tunisie le matériel médico-chirurgical d'AMNOTEC International Medical, fabricant installé à Tuttlingen en Allemagne. Cliniques, hôpitaux et praticiens accèdent à du matériel fiable, avec un accompagnement de proximité du choix jusqu'au service après-vente.",
    place: "Mnihla, Ariana · RC C02171522025",
    values: [
      {
        title: "Fabriqué à Tuttlingen",
        text: "Instruments et systèmes conçus dans la capitale mondiale de la technologie médico-chirurgicale.",
      },
      {
        title: "Conseil par spécialité",
        text: "Nous vous aidons à choisir le matériel adapté à votre bloc et à vos interventions.",
      },
      {
        title: "Suivi après l'achat",
        text: "Un interlocuteur local pour la maintenance, les pièces et le renouvellement.",
      },
    ],
  },
  products: {
    eyebrow: "Catalogue · {n} gammes AMNOTEC",
    title: "Choisissez votre spécialité",
    tabs: "Familles de produits",
    quote: "Demander un devis",
  },
  why: {
    eyebrow: "Pourquoi Tunicare",
    title: "La rigueur allemande, l'accompagnement en plus",
    reasons: [
      {
        title: "Qualité allemande",
        text: "Acier inoxydable médical, optiques en saphir, contrôles aux normes en vigueur pour le bloc opératoire.",
      },
      {
        title: "Devis sur mesure",
        text: "Chaque demande est étudiée selon votre spécialité, votre volume et votre budget.",
      },
      {
        title: "Service après-vente",
        text: "Maintenance, pièces détachées et renouvellement suivis depuis la Tunisie.",
      },
      {
        title: "Entreprise en règle",
        text: "Registre de commerce et matricule fiscal tunisiens : un fournisseur fiable pour vos achats.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Parlons de votre besoin en matériel chirurgical",
    text: "Décrivez votre demande, nous revenons vers vous avec un devis adapté à votre établissement.",
    phone: "Téléphone",
    email: "Email",
    address: "Adresse",
    addressValue: "Av. Les Violettes, Imm. Les Jardins, Jmazh 2, Mnihla, Ariana 2094, Tunisie",
    map: "Localisation de Tunicare Solutions",
  },
  form: {
    name: "Nom complet",
    namePlaceholder: "Votre nom",
    company: "Société",
    companyPlaceholder: "Clinique, hôpital, cabinet…",
    email: "Email",
    emailPlaceholder: "vous@exemple.com",
    phone: "Téléphone",
    phonePlaceholder: "+216 ...",
    message: "Message",
    messagePlaceholder: "Décrivez votre besoin en matériel médico-chirurgical…",
    send: "Envoyer la demande",
    sending: "Envoi en cours…",
    sent: "Merci ! Votre demande a été transmise, nous revenons vers vous rapidement.",
    mailSubject: "Demande de devis",
  },
  footer: {
    blurb:
      "Distributeur de matériel médico-chirurgical allemand pour cliniques, hôpitaux et professionnels de santé en Tunisie.",
    quickLinks: "Liens rapides",
    contact: "Contact",
    follow: "Suivez-nous",
    rights: "Tous droits réservés.",
  },
};

export default fr;
export type Dictionary = typeof fr;
