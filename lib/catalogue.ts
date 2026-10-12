import type { Locale } from "./i18n";

// Catalogue Tunicare Solutions — gamme AMNOTEC International Medical (Tuttlingen, Allemagne).
// Photos : /public/images/produits. Pour ajouter un produit, ajoute un objet dans la
// liste `produits` de la bonne famille, avec son texte en français ET en anglais.

type Texte = Record<Locale, string>;

type ProduitSource = {
  id: string;
  nom: Texte;
  description: Texte;
  image: string;
  /** "photo" = photo sur fond blanc (remplit la carte), "detoure" = image détourée (centrée, avec marge) */
  rendu?: "photo" | "detoure";
};

type FamilleSource = {
  id: string;
  nom: Texte;
  accroche: Texte;
  produits: ProduitSource[];
};

/** Produit dans une langue donnée (ce que reçoivent les composants). */
export type Produit = Omit<ProduitSource, "nom" | "description"> & {
  nom: string;
  description: string;
};

export type Famille = {
  id: string;
  nom: string;
  accroche: string;
  produits: Produit[];
};

const FAMILLES: FamilleSource[] = [
  {
    id: "chirurgie-ouverte",
    nom: { fr: "Chirurgie ouverte", en: "Open surgery" },
    accroche: {
      fr: "L'instrumentation du bloc opératoire, de la pince hémostatique au conteneur de stérilisation.",
      en: "Operating-room instrumentation, from haemostatic forceps to sterilisation containers.",
    },
    produits: [
      {
        id: "instruments-de-base",
        nom: { fr: "Instruments de base", en: "Basic instruments" },
        description: {
          fr: "Ciseaux, pinces hémostatiques et écarteurs : l'instrumentation générale du bloc, pensée pour la précision et l'ergonomie.",
          en: "Scissors, artery forceps and retractors: general operating-room instruments designed for precision and ergonomics.",
        },
        image: "/images/produits/instruments-de-base.jpg",
      },
      {
        id: "instruments-orl",
        nom: { fr: "Instruments ORL", en: "ENT instruments" },
        description: {
          fr: "Otologie, sinuscopie et laryngologie, y compris les instruments endoscopiques ORL et des solutions sur mesure.",
          en: "Otology, sinuscopy and laryngology, including endoscopic ENT instruments and custom solutions.",
        },
        image: "/images/produits/instruments-orl.jpg",
      },
      {
        id: "micro-instruments",
        nom: { fr: "Micro-instruments", en: "Micro instruments" },
        description: {
          fr: "Microchirurgie et neurochirurgie : ciseaux à manche plat ou rond, porte-aiguilles micro, fabrication sur mesure possible.",
          en: "Microsurgery and neurosurgery: scissors with flat or round handles, micro needle holders, custom manufacturing available.",
        },
        image: "/images/produits/micro-instruments.jpg",
      },
      {
        id: "instruments-dentaires",
        nom: { fr: "Instruments dentaires", en: "Dental instruments" },
        description: {
          fr: "Diagnostic, soins conservateurs et endodontie : une gamme développée avec des praticiens et enrichie régulièrement.",
          en: "Diagnostics, conservative treatment and endodontics: a range developed with practitioners and expanded regularly.",
        },
        image: "/images/produits/instruments-dentaires.jpg",
      },
      {
        id: "conteneurs-sterilisation",
        nom: { fr: "Conteneurs de stérilisation", en: "Sterilisation containers" },
        description: {
          fr: "Pour la stérilisation centrale : préparer, stériliser et stocker les instruments en toute sécurité.",
          en: "For central sterile services: prepare, sterilise and store instruments safely.",
        },
        image: "/images/produits/conteneurs-sterilisation.jpg",
      },
      {
        id: "electrochirurgie",
        nom: { fr: "Électrochirurgie", en: "Electrosurgery" },
        description: {
          fr: "Générateurs haute fréquence et accessoires, conçus pour la sécurité et une utilisation intuitive.",
          en: "High-frequency generators and accessories, designed for safety and intuitive use.",
        },
        image: "/images/produits/electrochirurgie.jpg",
      },
    ],
  },
  {
    id: "endoscopie",
    nom: { fr: "Endoscopie", en: "Endoscopy" },
    accroche: {
      fr: "Optiques, colonnes 4K et instruments mini-invasifs pour toutes les spécialités.",
      en: "Optics, 4K towers and minimally invasive instruments for every specialty.",
    },
    produits: [
      {
        id: "colonne-endoscopique",
        nom: { fr: "Colonne endoscopique 4K", en: "4K endoscopy tower" },
        description: {
          fr: "Caméras 4K UHD, sources de lumière froide LED, insufflateurs, moniteurs, aspiration-irrigation et documentation.",
          en: "4K UHD cameras, LED cold light sources, insufflators, monitors, suction-irrigation and documentation.",
        },
        image: "/images/produits/colonne-endoscopique.jpg",
      },
      {
        id: "endoscopes",
        nom: { fr: "Endoscopes", en: "Endoscopes" },
        description: {
          fr: "Acier inoxydable, soudures laser et lentilles en saphir : autoclavables et compatibles avec la stérilisation plasma.",
          en: "Stainless steel, laser-welded joints and sapphire lenses: autoclavable and approved for plasma sterilisation.",
        },
        image: "/images/produits/endoscopes.jpg",
      },
      {
        id: "laparoscopie",
        nom: { fr: "Laparoscopie", en: "Laparoscopy" },
        description: {
          fr: "Instruments modulaires en plusieurs diamètres : trocarts, pinces, ciseaux et instruments bipolaires à mors interchangeables.",
          en: "Modular instruments in several diameters: trocars, forceps, scissors and bipolar instruments with interchangeable jaws.",
        },
        image: "/images/produits/laparoscopie.jpg",
      },
      {
        id: "urologie",
        nom: { fr: "Urologie endoscopique", en: "Endoscopic urology" },
        description: {
          fr: "Cystoscopes, résectoscopes, urétéroscopes et néphroscopie : un fût fin et une grande stabilité.",
          en: "Cystoscopes, resectoscopes, ureteroscopes and nephroscopy: slim shafts with high stability.",
        },
        image: "/images/produits/urologie.jpg",
      },
      {
        id: "gynecologie",
        nom: { fr: "Gynécologie endoscopique", en: "Endoscopic gynaecology" },
        description: {
          fr: "Hystéroscopes diagnostiques et opératoires, mini-hystéroscopie, manipulateurs utérins et gestion des fluides.",
          en: "Diagnostic and operative hysteroscopes, mini-hysteroscopy, uterine manipulators and fluid management.",
        },
        image: "/images/produits/gynecologie.jpg",
      },
      {
        id: "arthroscopie",
        nom: { fr: "Arthroscopie", en: "Arthroscopy" },
        description: {
          fr: "Pinces usinées CNC pour une coupe nette et durable, gaines à haut débit pour une meilleure irrigation.",
          en: "CNC-machined punches for clean, lasting cuts, high-flow sheaths for better irrigation.",
        },
        image: "/images/produits/arthroscopie.jpg",
      },
    ],
  },
  {
    id: "veqtron",
    nom: { fr: "Imagerie VEQTRON", en: "VEQTRON imaging" },
    accroche: {
      fr: "Chirurgie guidée par fluorescence ICG/NIR : voir la perfusion et les tissus en temps réel.",
      en: "ICG/NIR fluorescence-guided surgery: see perfusion and tissue in real time.",
    },
    produits: [
      {
        id: "veqtron-colonne",
        nom: { fr: "Colonne VEQTRON", en: "VEQTRON tower" },
        description: {
          fr: "Une colonne complète d'imagerie 4K par fluorescence pour la chirurgie mini-invasive.",
          en: "A complete 4K fluorescence imaging tower for minimally invasive surgery.",
        },
        image: "/images/produits/veqtron-colonne.png",
        rendu: "detoure",
      },
      {
        id: "camera-4k",
        nom: { fr: "Caméra 4K", en: "4K camera" },
        description: {
          fr: "Tête de caméra et unité de contrôle 4K, au cœur du système d'imagerie VEQTRON.",
          en: "4K camera head and control unit, at the heart of the VEQTRON imaging system.",
        },
        image: "/images/produits/camera-4k.webp",
      },
      {
        id: "veqtron-imagerie",
        nom: { fr: "Système d'imagerie ICG/NIR", en: "ICG/NIR imaging system" },
        description: {
          fr: "Capteurs 4K, haute sensibilité de fluorescence et quatre modes d'affichage, dont un rendu à effet 3D.",
          en: "4K sensors, high fluorescence sensitivity and four display modes, including a 3D-effect view.",
        },
        image: "/images/produits/veqtron-imagerie.png",
        rendu: "detoure",
      },
      {
        id: "veqtron-twinlight",
        nom: { fr: "Source Twinlight LED-LASER", en: "Twinlight LED-LASER source" },
        description: {
          fr: "Lumière blanche et proche infrarouge, intensité réglable en continu et ajustée automatiquement à la distance.",
          en: "White and near-infrared light, continuously adjustable intensity, automatically matched to distance.",
        },
        image: "/images/produits/veqtron-twinlight.png",
        rendu: "detoure",
      },
      {
        id: "fluorosqan",
        nom: { fr: "FluorosQan", en: "FluorosQan" },
        description: {
          fr: "Caméra portable pour la chirurgie ouverte : perfusion en temps réel, cartographie lymphatique et limites tumorales.",
          en: "Handheld camera for open surgery: real-time perfusion, lymphatic mapping and tumour margins.",
        },
        image: "/images/produits/veqtron-fluorosqan.png",
        rendu: "detoure",
      },
      {
        id: "multi-affichage",
        nom: { fr: "Mode multi-affichage", en: "Multi-display mode" },
        description: {
          fr: "Lumière blanche, fluorescence et proche infrarouge affichés simultanément sur un même écran.",
          en: "White light, fluorescence and near-infrared shown side by side on a single screen.",
        },
        image: "/images/produits/veqtron-multi-affichage.jpg",
      },
    ],
  },
];

/** Le catalogue dans la langue demandée. */
export function getCatalogue(lang: Locale): Famille[] {
  return FAMILLES.map((f) => ({
    id: f.id,
    nom: f.nom[lang],
    accroche: f.accroche[lang],
    produits: f.produits.map((p) => ({
      ...p,
      nom: p.nom[lang],
      description: p.description[lang],
    })),
  }));
}

/** Nom d'un produit et de sa famille, à partir de son identifiant. */
export function trouverProduit(lang: Locale, id: string) {
  for (const f of FAMILLES) {
    const p = f.produits.find((x) => x.id === id);
    if (p) return { nom: p.nom[lang], famille: f.nom[lang] };
  }
  return { nom: id, famille: "" };
}
