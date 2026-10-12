// Catalogue Tunicare Solutions — gamme AMNOTEC International Medical (Tuttlingen, Allemagne).
// Photos : /public/images/produits. Pour ajouter un produit, ajoute simplement un objet
// dans la liste `produits` de la bonne famille.

export type Produit = {
  nom: string;
  description: string;
  image: string;
  /** "photo" = photo sur fond blanc (remplit la carte), "detoure" = image détourée (centrée, avec marge) */
  rendu?: "photo" | "detoure";
};

export type Famille = {
  id: string;
  nom: string;
  accroche: string;
  produits: Produit[];
};

export const FAMILLES: Famille[] = [
  {
    id: "chirurgie-ouverte",
    nom: "Chirurgie ouverte",
    accroche:
      "L'instrumentation du bloc opératoire, de la pince hémostatique au conteneur de stérilisation.",
    produits: [
      {
        nom: "Instruments de base",
        description:
          "Ciseaux, pinces hémostatiques et écarteurs : l'instrumentation générale du bloc, pensée pour la précision et l'ergonomie.",
        image: "/images/produits/instruments-de-base.jpg",
      },
      {
        nom: "Instruments ORL",
        description:
          "Otologie, sinuscopie et laryngologie, y compris les instruments endoscopiques ORL et des solutions sur mesure.",
        image: "/images/produits/instruments-orl.jpg",
      },
      {
        nom: "Micro-instruments",
        description:
          "Microchirurgie et neurochirurgie : ciseaux à manche plat ou rond, porte-aiguilles micro, fabrication sur mesure possible.",
        image: "/images/produits/micro-instruments.jpg",
      },
      {
        nom: "Instruments dentaires",
        description:
          "Diagnostic, soins conservateurs et endodontie : une gamme développée avec des praticiens et enrichie régulièrement.",
        image: "/images/produits/instruments-dentaires.jpg",
      },
      {
        nom: "Conteneurs de stérilisation",
        description:
          "Pour la stérilisation centrale : préparer, stériliser et stocker les instruments en toute sécurité.",
        image: "/images/produits/conteneurs-sterilisation.jpg",
      },
      {
        nom: "Électrochirurgie",
        description:
          "Générateurs haute fréquence et accessoires, conçus pour la sécurité et une utilisation intuitive.",
        image: "/images/produits/electrochirurgie.jpg",
      },
    ],
  },
  {
    id: "endoscopie",
    nom: "Endoscopie",
    accroche:
      "Optiques, colonnes 4K et instruments mini-invasifs pour toutes les spécialités.",
    produits: [
      {
        nom: "Colonne endoscopique 4K",
        description:
          "Caméras 4K UHD, sources de lumière froide LED, insufflateurs, moniteurs, aspiration-irrigation et documentation.",
        image: "/images/produits/colonne-endoscopique.jpg",
      },
      {
        nom: "Endoscopes",
        description:
          "Acier inoxydable, soudures laser et lentilles en saphir : autoclavables et compatibles avec la stérilisation plasma.",
        image: "/images/produits/endoscopes.jpg",
      },
      {
        nom: "Laparoscopie",
        description:
          "Instruments modulaires en plusieurs diamètres : trocarts, pinces, ciseaux et instruments bipolaires à mors interchangeables.",
        image: "/images/produits/laparoscopie.jpg",
      },
      {
        nom: "Urologie endoscopique",
        description:
          "Cystoscopes, résectoscopes, urétéroscopes et néphroscopie : un fût fin et une grande stabilité.",
        image: "/images/produits/urologie.jpg",
      },
      {
        nom: "Gynécologie endoscopique",
        description:
          "Hystéroscopes diagnostiques et opératoires, mini-hystéroscopie, manipulateurs utérins et gestion des fluides.",
        image: "/images/produits/gynecologie.jpg",
      },
      {
        nom: "Arthroscopie",
        description:
          "Pinces usinées CNC pour une coupe nette et durable, gaines à haut débit pour une meilleure irrigation.",
        image: "/images/produits/arthroscopie.jpg",
      },
    ],
  },
  {
    id: "veqtron",
    nom: "Imagerie VEQTRON",
    accroche:
      "Chirurgie guidée par fluorescence ICG/NIR : voir la perfusion et les tissus en temps réel.",
    produits: [
      {
        nom: "Colonne VEQTRON",
        description:
          "Une colonne complète d'imagerie 4K par fluorescence pour la chirurgie mini-invasive.",
        image: "/images/produits/veqtron-colonne.png",
        rendu: "detoure",
      },
      {
        nom: "Caméra 4K",
        description:
          "Tête de caméra et unité de contrôle 4K, au cœur du système d'imagerie VEQTRON.",
        image: "/images/produits/camera-4k.webp",
      },
      {
        nom: "Système d'imagerie ICG/NIR",
        description:
          "Capteurs 4K, haute sensibilité de fluorescence et quatre modes d'affichage, dont un rendu à effet 3D.",
        image: "/images/produits/veqtron-imagerie.png",
        rendu: "detoure",
      },
      {
        nom: "Source Twinlight LED-LASER",
        description:
          "Lumière blanche et proche infrarouge, intensité réglable en continu et ajustée automatiquement à la distance.",
        image: "/images/produits/veqtron-twinlight.png",
        rendu: "detoure",
      },
      {
        nom: "FluorosQan",
        description:
          "Caméra portable pour la chirurgie ouverte : perfusion en temps réel, cartographie lymphatique et limites tumorales.",
        image: "/images/produits/veqtron-fluorosqan.png",
        rendu: "detoure",
      },
      {
        nom: "Mode multi-affichage",
        description:
          "Lumière blanche, fluorescence et proche infrarouge affichés simultanément sur un même écran.",
        image: "/images/produits/veqtron-multi-affichage.jpg",
      },
    ],
  },
];
