import type { Locale } from "./i18n";

// Catalogue Tunicare Solutions — gamme AMNOTEC International Medical (Tuttlingen, Allemagne).
// Contenu repris du site et des catalogues AMNOTEC, avec leur autorisation.
// Photos : /public/images/produits (et /galerie pour les photos supplémentaires).
// Pour ajouter un produit : ajoute un objet dans la liste `produits` de la bonne famille,
// avec ses textes en français ET en anglais. Sa page (/fr/produits/<id>) est créée automatiquement.

type Texte = Record<Locale, string>;
type Liste = Record<Locale, string[]>;

/** Catalogues PDF officiels AMNOTEC (hébergés par AMNOTEC). */
const PDF = {
  chirurgie: "https://www.amnotec.de/dokumente/AMNOTEC_General_Surgery.pdf",
  orl: "https://www.amnotec.de/dokumente/AMNOTEC_ENT-Instruments.pdf",
  micro: "https://www.amnotec.de/dokumente/AMNOTEC_Micro_Instruments_202.pdf",
  sterilisation: "https://www.amnotec.de/dokumente/AMNOTEC_Sterilization_Container.pdf",
  hf: "https://www.amnotec.de/dokumente/AMNOTEC_Electrosurgery.pdf",
  appareils: "https://www.amnotec.de/dokumente/AMNOTEC_Endoscopic_Devices.pdf",
  endoscopes: "https://www.amnotec.de/dokumente/AMNOTEC_Endoscopes.pdf",
  urologie: "https://www.amnotec.de/dokumente/AMNOTEC_Endoscopic_Urology.pdf",
  gynecologie: "https://www.amnotec.de/dokumente/AMNOTEC_Endoscopic_Gynaecology.pdf",
  arthroscopie: "https://www.amnotec.de/dokumente/AMNOTEC_Arthroscopy.pdf",
  veqtron: "https://www.amnotec.de/dokumente/AMNOTEC_VEQTRON_Guided_Surgery.pdf",
} as const;

export type Photo = {
  src: string;
  /** "photo" = remplit le cadre, "detoure" = objet sur fond blanc, affiché entier avec marge */
  rendu?: "photo" | "detoure";
};

type ProduitSource = {
  id: string;
  nom: Texte;
  /** Résumé court : cartes du catalogue et description pour Google. */
  description: Texte;
  image: string;
  rendu?: "photo" | "detoure";
  /** Texte détaillé de la page produit (un élément = un paragraphe). */
  details: Record<Locale, string[]>;
  /** Ce que comprend la gamme. */
  gamme: Liste;
  /** Points forts. */
  points: Liste;
  /** Photos supplémentaires de la page produit. */
  galerie?: Photo[];
  /** Catalogue PDF AMNOTEC correspondant. */
  pdf?: string;
};

type FamilleSource = {
  id: string;
  nom: Texte;
  accroche: Texte;
  produits: ProduitSource[];
};

/** Produit dans une langue donnée (ce que reçoivent les composants). */
export type Produit = {
  id: string;
  nom: string;
  description: string;
  image: string;
  rendu?: "photo" | "detoure";
  details: string[];
  gamme: string[];
  points: string[];
  galerie: Photo[];
  pdf?: string;
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
        details: {
          fr: [
            "La gamme d'instruments de base AMNOTEC couvre un très large éventail d'instruments chirurgicaux, dans de nombreuses formes et tailles. Le catalogue impressionne par la variété des modèles disponibles.",
            "Chaque instrument est conçu pour une prise en main ergonomique et une précision optimale. Des ciseaux aux pinces hémostatiques, en passant par les écarteurs utilisés en chirurgie ouverte, AMNOTEC propose presque tout ce dont les chirurgiens ont besoin aujourd'hui.",
          ],
          en: [
            "The AMNOTEC basic instrument range covers a comprehensive selection of surgical instruments in many designs and sizes. The variety of instrument types in the catalogue is impressive in every respect.",
            "Every instrument is designed for ergonomic handling and precision. From scissors and artery forceps to the retractors used in open surgery, AMNOTEC offers almost everything surgeons need today.",
          ],
        },
        gamme: {
          fr: [
            "Ciseaux chirurgicaux (droits, courbes, Metzenbaum, Mayo…)",
            "Pinces hémostatiques et pinces à dissection",
            "Porte-aiguilles",
            "Écarteurs manuels et autostatiques",
            "Bistouris et manches de bistouri",
            "Pinces à champs, clamps et pinces de préhension",
          ],
          en: [
            "Surgical scissors (straight, curved, Metzenbaum, Mayo…)",
            "Artery forceps and dissecting forceps",
            "Needle holders",
            "Hand-held and self-retaining retractors",
            "Scalpels and scalpel handles",
            "Towel clamps, clamps and grasping forceps",
          ],
        },
        points: {
          fr: ["Acier inoxydable de qualité médicale", "Fabrication à Tuttlingen, Allemagne", "Ergonomie et précision", "Très large choix de modèles"],
          en: ["Medical-grade stainless steel", "Made in Tuttlingen, Germany", "Ergonomics and precision", "Very wide choice of patterns"],
        },
        pdf: PDF.chirurgie,
      },
      {
        id: "instruments-orl",
        nom: { fr: "Instruments ORL", en: "ENT instruments" },
        description: {
          fr: "Otologie, sinuscopie et laryngologie, y compris les instruments endoscopiques ORL et des solutions sur mesure.",
          en: "Otology, sinuscopy and laryngology, including endoscopic ENT instruments and custom solutions.",
        },
        image: "/images/produits/instruments-orl.jpg",
        details: {
          fr: [
            "La gamme comprend de nombreux instruments dédiés à l'oto-rhino-laryngologie. Depuis plusieurs années, AMNOTEC équipe hôpitaux et cabinets en instruments d'otologie, de sinuscopie et de laryngologie, avec des retours très positifs.",
            "Forte de cette expérience, AMNOTEC propose une sélection complète et peut aussi fabriquer des solutions sur mesure. La gamme comprend également un large choix d'instruments endoscopiques pour la chirurgie ORL.",
          ],
          en: [
            "The range includes many instruments dedicated to ear, nose and throat surgery. For several years AMNOTEC has supplied hospitals and practices with instruments for otology, sinuscopy and laryngology, with very positive feedback.",
            "Based on this experience, AMNOTEC offers a comprehensive selection and can also provide custom solutions. The range also includes a wide choice of endoscopic instruments for ENT surgery.",
          ],
        },
        gamme: {
          fr: ["Otologie", "Sinuscopie et chirurgie des sinus", "Laryngologie", "Instruments endoscopiques ORL", "Rhinologie", "Fabrication sur mesure"],
          en: ["Otology", "Sinuscopy and sinus surgery", "Laryngology", "Endoscopic ENT instruments", "Rhinology", "Custom manufacturing"],
        },
        points: {
          fr: ["Gamme complète pour l'ORL", "Solutions sur mesure possibles", "Compatibles avec les optiques ORL AMNOTEC"],
          en: ["Complete range for ENT", "Custom solutions available", "Compatible with AMNOTEC ENT optics"],
        },
        pdf: PDF.orl,
      },
      {
        id: "micro-instruments",
        nom: { fr: "Micro-instruments", en: "Micro instruments" },
        description: {
          fr: "Microchirurgie et neurochirurgie : ciseaux à manche plat ou rond, porte-aiguilles micro, fabrication sur mesure possible.",
          en: "Microsurgery and neurosurgery: scissors with flat or round handles, micro needle holders, custom manufacturing available.",
        },
        image: "/images/produits/micro-instruments.jpg",
        details: {
          fr: [
            "La gamme AMNOTEC couvre aussi la microchirurgie et la neurochirurgie, des domaines de plus en plus importants, avec un large choix de produits et de solutions.",
            "En plus des micro-instruments et des instruments de neurochirurgie, comme les ciseaux à manche plat ou rond et les porte-aiguilles micro, AMNOTEC peut fabriquer des instruments sur mesure.",
          ],
          en: [
            "The AMNOTEC range also covers the increasingly important fields of micro and neuro instruments, with a wide choice of products and solutions.",
            "In addition to micro and neuro instruments, such as scissors with flat and round handles or micro needle holders, AMNOTEC can produce custom instruments.",
          ],
        },
        gamme: {
          fr: ["Ciseaux micro à manche plat ou rond", "Porte-aiguilles micro", "Pinces micro", "Instruments de neurochirurgie", "Instruments sur mesure"],
          en: ["Micro scissors with flat or round handles", "Micro needle holders", "Micro forceps", "Neurosurgery instruments", "Custom instruments"],
        },
        points: {
          fr: ["Précision pour la microchirurgie", "Fabrication sur mesure", "Qualité de Tuttlingen"],
          en: ["Precision for microsurgery", "Custom manufacturing", "Tuttlingen quality"],
        },
        pdf: PDF.micro,
      },
      {
        id: "instruments-dentaires",
        nom: { fr: "Instruments dentaires", en: "Dental instruments" },
        description: {
          fr: "Diagnostic, soins conservateurs et endodontie : une gamme développée avec des praticiens et enrichie régulièrement.",
          en: "Diagnostics, conservative treatment and endodontics: a range developed with practitioners and expanded regularly.",
        },
        image: "/images/produits/instruments-dentaires.jpg",
        details: {
          fr: [
            "Les dentistes ont besoin d'instruments de très haute qualité, sans cesse améliorés. Des instruments dentaires modernes facilitent le travail du praticien et améliorent la qualité des résultats.",
            "Les nouveaux instruments AMNOTEC sont développés et perfectionnés avec des spécialistes du domaine. La gamme est moderne, innovante et très étendue : diagnostic, soins conservateurs, endodontie… et elle s'enrichit régulièrement.",
          ],
          en: [
            "Dentists need instruments of the highest quality that are constantly developed and refined. State-of-the-art dental instruments make the dentist's work easier and improve the quality of results.",
            "New AMNOTEC instruments are developed and refined together with experts in the field. The range is state-of-the-art, innovative and very extensive: diagnostics, conservative treatment, endodontics… and it keeps growing.",
          ],
        },
        gamme: {
          fr: ["Instruments de diagnostic", "Soins conservateurs", "Endodontie", "Instruments d'extraction", "Parodontologie"],
          en: ["Diagnostic instruments", "Conservative treatment", "Endodontics", "Extraction instruments", "Periodontics"],
        },
        points: {
          fr: ["Développés avec des praticiens", "Gamme régulièrement enrichie", "Acier inoxydable de qualité médicale"],
          en: ["Developed with practitioners", "Range expanded regularly", "Medical-grade stainless steel"],
        },
      },
      {
        id: "conteneurs-sterilisation",
        nom: { fr: "Conteneurs de stérilisation", en: "Sterilisation containers" },
        description: {
          fr: "Pour la stérilisation centrale : préparer, stériliser et stocker les instruments en toute sécurité.",
          en: "For central sterile services: prepare, sterilise and store instruments safely.",
        },
        image: "/images/produits/conteneurs-sterilisation.jpg",
        details: {
          fr: [
            "Depuis plusieurs années, les conteneurs AMNOTEC sont une référence pour l'approvisionnement stérile des cliniques et des hôpitaux.",
            "La préparation, la stérilisation et le stockage des instruments sont essentiels dans chaque établissement. L'objectif d'AMNOTEC est d'optimiser le travail du service de stérilisation centrale.",
          ],
          en: [
            "For several years AMNOTEC containers have set the standard in sterile supply for clinics and hospitals.",
            "The preparation, sterilisation and storage of medical instruments is crucial in every hospital. AMNOTEC's goal is to optimise CSSD work processes.",
          ],
        },
        gamme: {
          fr: ["Conteneurs de stérilisation de plusieurs tailles", "Paniers et plateaux perforés", "Paniers pour endoscopes", "Filtres et accessoires", "Systèmes de rangement et d'identification"],
          en: ["Sterilisation containers in several sizes", "Perforated baskets and trays", "Endoscopy baskets", "Filters and accessories", "Storage and labelling systems"],
        },
        points: {
          fr: ["Pour la stérilisation centrale", "Protection des instruments", "Organisation du bloc simplifiée"],
          en: ["Built for central sterile services", "Protects instruments", "Simpler OR organisation"],
        },
        pdf: PDF.sterilisation,
      },
      {
        id: "electrochirurgie",
        nom: { fr: "Électrochirurgie", en: "Electrosurgery" },
        description: {
          fr: "Générateurs haute fréquence et accessoires, conçus pour la sécurité et une utilisation intuitive.",
          en: "High-frequency generators and accessories, designed for safety and intuitive use.",
        },
        image: "/images/produits/electrochirurgie.jpg",
        details: {
          fr: [
            "Les appareils et instruments de chirurgie haute fréquence reposent sur un développement innovant et les technologies les plus récentes.",
            "Pour AMNOTEC, garantir un fonctionnement optimal est essentiel dans ce domaine. La sécurité et la simplicité d'utilisation (par exemple des générateurs HF) sont au centre du développement. En plus des générateurs et de leurs accessoires, la gamme comprend un grand choix de produits pour la chirurgie haute fréquence.",
          ],
          en: [
            "High-frequency surgery devices and instruments are based on innovative product development and the latest technologies.",
            "For AMNOTEC, guaranteeing optimum functionality is essential in this area. Safe functioning and intuitive operation (of HF generators, for example) are the main focus of development. In addition to HF devices and accessories, the range includes a wide variety of products for high-frequency surgery.",
          ],
        },
        gamme: {
          fr: ["Générateurs haute fréquence (HF)", "Électrodes monopolaires et bipolaires", "Pinces bipolaires", "Câbles et accessoires", "Plaques neutres"],
          en: ["High-frequency (HF) generators", "Monopolar and bipolar electrodes", "Bipolar forceps", "Cables and accessories", "Neutral electrodes"],
        },
        points: {
          fr: ["Sécurité de fonctionnement", "Utilisation intuitive", "Technologies récentes"],
          en: ["Safe operation", "Intuitive use", "Latest technologies"],
        },
        pdf: PDF.hf,
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
        details: {
          fr: [
            "Les appareils d'endoscopie AMNOTEC utilisent exclusivement des composants électroniques et micromécaniques de dernière génération (4K Ultra HD, HD-MOS, technologie PHASER™). Ils sont simples à utiliser, fiables et de très grande qualité.",
            "Tous les appareils sont testés selon les normes médicales en vigueur et homologués pour une utilisation au bloc opératoire.",
          ],
          en: [
            "AMNOTEC endoscopic devices exclusively use state-of-the-art electronic and micromechanical components and technologies (4K Ultra HD, HD-MOS, PHASER™ technology). They offer easy handling as well as high quality and reliability.",
            "All devices are tested according to current medical standards and approved for use in the operating theatre.",
          ],
        },
        gamme: {
          fr: ["Caméras SD, HD et 4K UHD", "Sources de lumière froide (xénon et LED)", "Insufflateurs", "Moniteurs", "Systèmes d'aspiration et d'irrigation", "Gestion des appareils", "Systèmes de documentation"],
          en: ["Cameras (SD, HD and 4K UHD)", "Cold light sources (xenon and LED)", "Insufflators", "Monitors", "Suction and irrigation systems", "Device management", "Documentation systems"],
        },
        points: {
          fr: ["4K Ultra HD", "Technologies HD-MOS et PHASER™", "Testé aux normes médicales", "Homologué pour le bloc opératoire"],
          en: ["4K Ultra HD", "HD-MOS and PHASER™ technology", "Tested to medical standards", "Approved for the operating theatre"],
        },
        pdf: PDF.appareils,
      },
      {
        id: "endoscopes",
        nom: { fr: "Endoscopes", en: "Endoscopes" },
        description: {
          fr: "Acier inoxydable, soudures laser et lentilles en saphir : autoclavables et compatibles avec la stérilisation plasma.",
          en: "Stainless steel, laser-welded joints and sapphire lenses: autoclavable and approved for plasma sterilisation.",
        },
        image: "/images/produits/endoscopes.jpg",
        details: {
          fr: [
            "Les endoscopes AMNOTEC offrent une image brillante et très détaillée, grâce à des composants de grande qualité et aux techniques de fabrication les plus récentes.",
            "Leur construction en acier inoxydable assemblée au laser, leurs verres saphir résistants aux rayures, sertis à l'avant et à l'arrière par un procédé spécial de brasage à l'or par induction, et l'étanchéité complète entre les fibres optiques et le système optique garantissent une grande stabilité et une longue durée de vie.",
            "Les endoscopes AMNOTEC sont autoclavables (jusqu'à 18 minutes de maintien) et homologués pour la stérilisation plasma (STERRAD® 100/200™, STERRAD® NX™ et STERIS).",
          ],
          en: [
            "AMNOTEC endoscopes deliver a brilliant, high-resolution image, guaranteed by high-quality components and the latest manufacturing techniques.",
            "The stainless steel construction with laser connection technology, scratch-resistant sapphire glass inserted distally and proximally with a special gold-solder induction process, and the complete sealing of the fibre optics from the optical system guarantee high stability and long durability.",
            "AMNOTEC endoscopes are autoclavable up to a holding time of 18 minutes and approved for plasma sterilisation (STERRAD® 100/200™, STERRAD® NX™ and STERIS).",
          ],
        },
        gamme: {
          fr: [
            "Arthroscopes HD et 4K",
            "Otoscopes, laryngoscopes et sinuscopes (ORL)",
            "Bronchoscopes",
            "Fibroscopes flexibles naso-pharyngo-laryngés",
            "Cystoscopes et uréthro-cystoscopes",
            "Urétéro-rénoscopes et néphroscopes",
            "Hystéroscopes",
            "Laparoscopes et laparoscopes opératoires",
            "Thoracoscopes",
            "Câbles de lumière froide LED et xénon, adaptateurs",
            "Conteneurs et protections pour optiques",
          ],
          en: [
            "HD and 4K arthroscopes",
            "Otoscopes, laryngoscopes and sinuscopes (ENT)",
            "Bronchoscopes",
            "Flexible naso-pharyngo-laryngo fibrescopes",
            "Cystoscopes and urethro-cystoscopes",
            "Uretero-renoscopes and nephroscopes",
            "Hysteroscopes",
            "Laparoscopes and operating laparoscopes",
            "Thoracoscopes",
            "LED and xenon cold light cables, adapters",
            "Scope containers and protection tubes",
          ],
        },
        points: {
          fr: ["Verres saphir anti-rayures", "Autoclavable 134 °C, 18 min", "Compatible STERRAD® et STERIS", "Image HD et 4K"],
          en: ["Scratch-resistant sapphire glass", "Autoclavable 134 °C, 18 min", "STERRAD® and STERIS compatible", "HD and 4K image"],
        },
        galerie: [
          { src: "/images/produits/galerie/endoscopes-1.webp", rendu: "detoure" },
          { src: "/images/produits/galerie/endoscopes-2.webp", rendu: "detoure" },
          { src: "/images/produits/galerie/endoscopes-3.webp", rendu: "detoure" },
          { src: "/images/produits/galerie/endoscopes-4.webp", rendu: "detoure" },
          { src: "/images/produits/galerie/endoscopes-5.webp", rendu: "detoure" },
          { src: "/images/produits/galerie/endoscopes-6.webp", rendu: "detoure" },
        ],
        pdf: PDF.endoscopes,
      },
      {
        id: "laparoscopie",
        nom: { fr: "Laparoscopie", en: "Laparoscopy" },
        description: {
          fr: "Instruments modulaires en plusieurs diamètres : trocarts, pinces, ciseaux et instruments bipolaires à mors interchangeables.",
          en: "Modular instruments in several diameters: trocars, forceps, scissors and bipolar instruments with interchangeable jaws.",
        },
        image: "/images/produits/laparoscopie.jpg",
        details: {
          fr: [
            "Les instruments de laparoscopie AMNOTEC sont reconnus pour leur système modulaire et intelligent, qui s'adapte précisément à chaque intervention. Tous existent en plusieurs diamètres et longueurs de travail, pour la pédiatrie, la chirurgie viscérale, la thoracoscopie ou la chirurgie de l'obésité.",
            "Des matériaux de grande qualité (acier inoxydable médical, PEEK, Rilsan®) garantissent une excellente qualité et une longue durée de vie.",
            "Les nouveaux instruments bipolaires AMNOGRIP et AMNOTARIS répondent à toutes les exigences de fonctionnalité, d'ergonomie et d'économie, grâce à leur modularité et à un large choix de mors interchangeables.",
          ],
          en: [
            "AMNOTEC laparoscopy instruments are known for their intelligent, modular system, which can be precisely adapted to each procedure. All instruments are available in various diameters and working lengths for paediatrics, visceral surgery, thoracoscopy and obesity surgery.",
            "High-quality materials (medical-grade stainless steel, PEEK, Rilsan®) guarantee excellent quality and durability.",
            "The new bipolar AMNOGRIP and AMNOTARIS instruments meet every requirement for functionality, ergonomics and economy thanks to their modularity and wide range of interchangeable jaws.",
          ],
        },
        gamme: {
          fr: [
            "Laparoscopes",
            "Canules d'insufflation et trocarts",
            "Instruments d'aspiration et d'irrigation",
            "Ciseaux, pinces de préhension et de dissection mono- et bipolaires",
            "Instruments de suture et de ligature",
            "Endo-écarteurs",
            "Clamps veineux intra-abdominaux",
            "Électrodes de coagulation mono- et bipolaires",
            "Instruments pour la gynécologie laparoscopique",
          ],
          en: [
            "Laparoscopes",
            "Insufflation cannulas and trocars",
            "Suction and irrigation instruments",
            "Monopolar and bipolar scissors, grasping and dissecting forceps",
            "Suture and ligature instruments",
            "Endo-retractors",
            "Intra-abdominal vein clamps",
            "Monopolar and bipolar coagulation electrodes",
            "Instruments for gynaecological laparoscopy",
          ],
        },
        points: {
          fr: ["Système modulaire", "Plusieurs diamètres et longueurs", "Bipolaire AMNOGRIP et AMNOTARIS", "Acier médical, PEEK et Rilsan®"],
          en: ["Modular system", "Several diameters and lengths", "Bipolar AMNOGRIP and AMNOTARIS", "Medical steel, PEEK and Rilsan®"],
        },
        galerie: [
          { src: "/images/produits/galerie/laparoscopie-1.webp" },
          { src: "/images/produits/galerie/laparoscopie-2.webp" },
          { src: "/images/produits/galerie/laparoscopie-3.webp", rendu: "detoure" },
        ],
      },
      {
        id: "urologie",
        nom: { fr: "Urologie endoscopique", en: "Endoscopic urology" },
        description: {
          fr: "Cystoscopes, résectoscopes, urétéroscopes et néphroscopie : un fût fin et une grande stabilité.",
          en: "Cystoscopes, resectoscopes, ureteroscopes and nephroscopy: slim shafts with high stability.",
        },
        image: "/images/produits/urologie.jpg",
        details: {
          fr: [
            "Le design particulier de ces instruments, avec un fût de très faible diamètre et une stabilité maximale, permet à l'urologue de réaliser en toute sécurité même les interventions les plus difficiles. Diagnostic et traitement de l'uretère, de la vessie, de l'urètre, de la prostate et des reins se font au plus haut niveau.",
            "Éléments de travail pour fibres laser, instruments rigides et flexibles pour l'uretère, instruments pour l'extraction douce des calculs rénaux, ainsi qu'instruments pour la laparoscopie et l'urologie pédiatrique complètent la gamme.",
          ],
          en: [
            "The special design of these instruments, with a minimal shaft circumference and maximum stability, allows the urologist to perform even difficult and demanding operations safely. Diagnostic and therapeutic procedures on the ureter, bladder, urethra, prostate and kidneys can be performed at the highest level.",
            "Working elements for laser probes, rigid and flexible instruments for the ureter, instruments for the gentle removal of kidney stones and instruments for laparoscopy and paediatric urology complete the range.",
          ],
        },
        gamme: {
          fr: [
            "Cystoscopes",
            "Gaines et instruments de cysto-urétroscopie",
            "Lithotriteurs",
            "Résectoscopie",
            "Instruments pour la chirurgie laser",
            "Urétrotomie",
            "Urétéro-rénoscopie",
            "Néphroscopie percutanée",
            "Urologie pédiatrique",
          ],
          en: [
            "Cystoscopes",
            "Cysto-urethroscopy sheaths and instruments",
            "Lithotriptors",
            "Resectoscopy",
            "Instruments for laser surgery",
            "Urethrotomy",
            "Uretero-renoscopy",
            "Percutaneous nephroscopy",
            "Paediatric urology",
          ],
        },
        points: {
          fr: ["Fût fin, grande stabilité", "Instruments rigides et flexibles", "Compatible chirurgie laser", "Gamme pédiatrique"],
          en: ["Slim shaft, high stability", "Rigid and flexible instruments", "Laser-surgery ready", "Paediatric range"],
        },
        galerie: [
          { src: "/images/produits/galerie/urologie-1.webp" },
          { src: "/images/produits/galerie/urologie-2.webp", rendu: "detoure" },
          { src: "/images/produits/galerie/urologie-3.webp", rendu: "detoure" },
          { src: "/images/produits/galerie/urologie-4.webp", rendu: "detoure" },
        ],
        pdf: PDF.urologie,
      },
      {
        id: "gynecologie",
        nom: { fr: "Gynécologie endoscopique", en: "Endoscopic gynaecology" },
        description: {
          fr: "Hystéroscopes diagnostiques et opératoires, mini-hystéroscopie, manipulateurs utérins et gestion des fluides.",
          en: "Diagnostic and operative hysteroscopes, mini-hysteroscopy, uterine manipulators and fluid management.",
        },
        image: "/images/produits/gynecologie.jpg",
        details: {
          fr: [
            "Les gaines d'hystéroscopie AMNOTEC, pour le diagnostic comme pour la chirurgie, existent en plusieurs modèles et diamètres. Grâce à la miniaturisation des gaines et des instruments, des interventions autrefois invasives deviennent encore moins traumatisantes.",
            "Instruments, appareils et électrodes adaptés complètent la gamme.",
          ],
          en: [
            "AMNOTEC hysteroscopy sheaths for diagnostic and surgical procedures are available in various designs and diameters. Thanks to the miniaturisation of the sheaths and surgical instruments, conventional invasive procedures can be performed even more atraumatically.",
            "Suitable instruments, devices and electrodes complete the product range.",
          ],
        },
        gamme: {
          fr: [
            "Hystéroscopes",
            "Instruments et gaines de mini-hystéroscopie",
            "Anses de section pour hystérectomie subtotale",
            "Hystéroscope de consultation",
            "Système d'irrigation avec gestion des fluides pour la résection intra-utérine",
            "Résectoscopie",
            "Manipulateurs utérins",
            "Instruments pour la gynécologie laparoscopique",
          ],
          en: [
            "Hysteroscopes",
            "Instruments and sheaths for mini-hysteroscopy",
            "Cutting loops for supracervical hysterectomy",
            "Office hysteroscope",
            "Irrigation system with integrated fluid management for intrauterine resectoscopy",
            "Resectoscopy",
            "Uterine manipulators",
            "Instruments for laparoscopic gynaecology",
          ],
        },
        points: {
          fr: ["Gaines miniaturisées", "Diagnostic et chirurgie", "Gestion des fluides intégrée"],
          en: ["Miniaturised sheaths", "Diagnostic and surgical", "Integrated fluid management"],
        },
        pdf: PDF.gynecologie,
      },
      {
        id: "arthroscopie",
        nom: { fr: "Arthroscopie", en: "Arthroscopy" },
        description: {
          fr: "Pinces usinées CNC pour une coupe nette et durable, gaines à haut débit pour une meilleure irrigation.",
          en: "CNC-machined punches for clean, lasting cuts, high-flow sheaths for better irrigation.",
        },
        image: "/images/produits/arthroscopie.jpg",
        details: {
          fr: [
            "Les pinces d'arthroscopie AMNOCUT se distinguent par une excellente qualité de coupe et une longue durée de vie, grâce à leur mécanique propre et à leurs mors usinés sur commande numérique (CNC).",
            "Les nouvelles gaines d'arthroscopie HIGH-FLOW offrent un débit d'irrigation supérieur de 30 % à celui des gaines comparables, grâce à leur conception particulière et à leurs orifices d'irrigation agrandis.",
          ],
          en: [
            "AMNOCUT arthroscopy punches stand out for their excellent cutting quality and long service life, thanks to their own mechanics and specially CNC-manufactured jaws.",
            "The newly developed HIGH-FLOW arthroscopy sheaths achieve a 30% higher irrigation rate than comparable sheaths, thanks to their special design and enlarged irrigation openings.",
          ],
        },
        gamme: {
          fr: ["Arthroscopes HD et 4K", "Gaines HIGH-FLOW, canules d'irrigation", "Ciseaux, pinces emporte-pièce, pinces de préhension", "Instruments manuels", "Électrodes monopolaires et bipolaires"],
          en: ["HD and 4K arthroscopes", "HIGH-FLOW sheaths, irrigation cannulas", "Shears, punches, grasping forceps", "Hand instruments", "Monopolar and bipolar electrodes"],
        },
        points: {
          fr: ["Pinces AMNOCUT usinées CNC", "Irrigation +30 % (HIGH-FLOW)", "Longue durée de vie"],
          en: ["CNC-machined AMNOCUT punches", "+30% irrigation (HIGH-FLOW)", "Long service life"],
        },
        galerie: [
          { src: "/images/produits/galerie/arthroscopie-1.webp", rendu: "detoure" },
          { src: "/images/produits/galerie/arthroscopie-2.webp", rendu: "detoure" },
        ],
        pdf: PDF.arthroscopie,
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
        details: {
          fr: [
            "L'imagerie par fluorescence ICG/NIR est devenue l'une des technologies les plus précieuses de la chirurgie mini-invasive, en particulier pour contrôler la perfusion des organes pendant l'opération, visualiser les voies biliaires ou cartographier les ganglions lymphatiques.",
            "La colonne VEQTRON réunit le système d'imagerie 4K, la source de lumière Twinlight LED-LASER et l'affichage, pour une solution complète au bloc opératoire.",
          ],
          en: [
            "ICG/NIR fluorescence imaging has become one of the most valuable technologies in minimally invasive surgery, especially for intra-operative checks of visceral perfusion, visualisation of biliary structures and lymph node mapping.",
            "The VEQTRON tower combines the 4K imaging system, the Twinlight LED-LASER light source and the display into a complete operating-room solution.",
          ],
        },
        gamme: {
          fr: ["Système d'imagerie ICG/NIR 4K", "Source Twinlight LED-LASER", "Moniteur médical", "Chariot et gestion des appareils"],
          en: ["4K ICG/NIR imaging system", "Twinlight LED-LASER light source", "Medical monitor", "Cart and device management"],
        },
        points: {
          fr: ["Contrôle de la perfusion", "Visualisation des voies biliaires", "Cartographie des ganglions", "Solution complète"],
          en: ["Perfusion check", "Biliary visualisation", "Lymph node mapping", "Complete solution"],
        },
        pdf: PDF.veqtron,
      },
      {
        id: "camera-4k",
        nom: { fr: "Caméra 4K", en: "4K camera" },
        description: {
          fr: "Tête de caméra et unité de contrôle 4K, au cœur du système d'imagerie VEQTRON.",
          en: "4K camera head and control unit, at the heart of the VEQTRON imaging system.",
        },
        image: "/images/produits/camera-4k.webp",
        details: {
          fr: [
            "La caméra 4K VEQTRON associe une tête de caméra à 4 capteurs CMOS et une unité de contrôle 4K. Elle offre une très haute sensibilité à la fluorescence et une reproduction des couleurs fidèle à la réalité.",
            "Sa technologie restitue des images riches en profondeur, en texture et en détails, avec un effet de relief (3D).",
          ],
          en: [
            "The VEQTRON 4K camera combines a 4-CMOS camera head with a 4K control unit. It offers super-high fluorescence sensitivity and true-to-life colour reproduction.",
            "Its technology delivers pictures rich in depth, texture and detail, with a 3D effect.",
          ],
        },
        gamme: {
          fr: ["Tête de caméra 4 CMOS", "Unité de contrôle 4K", "Coupleur optique"],
          en: ["4-CMOS camera head", "4K control unit", "Optical coupler"],
        },
        points: {
          fr: ["Technologie 4 CMOS 4K", "Très haute sensibilité de fluorescence", "Couleurs fidèles", "Effet de relief 3D"],
          en: ["4-CMOS 4K technology", "Super-high fluorescence sensitivity", "True-to-life colour", "3D effect"],
        },
        pdf: PDF.veqtron,
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
        details: {
          fr: [
            "Le système d'imagerie VEQTRON ICG/NIR repose sur une technologie innovante à 4 capteurs CMOS 4K, avec une très haute sensibilité à la fluorescence.",
            "Il propose quatre modes d'affichage sans perte d'image : lumière blanche standard, fluorescence standard, fluorescence ISO et multi-affichage. Les images sont riches en profondeur, en texture et en détails, avec des couleurs fidèles à la réalité.",
            "Principe de l'ICG : le vert d'indocyanine est injecté par voie intraveineuse, sous-séreuse ou sous-muqueuse et se lie aux protéines du plasma. Éclairé par une lumière proche infrarouge de 805 à 835 nm, il émet un signal de fluorescence que le système affiche en temps réel.",
          ],
          en: [
            "The VEQTRON ICG/NIR imaging system is built on innovative 4-CMOS 4K technology with super-high fluorescence sensitivity.",
            "It offers four display modes without any loss of image: standard white light, standard fluorescence, ISO fluorescence and multi-display. Pictures are rich in depth, texture and detail, with true-to-life colour.",
            "ICG principle: indocyanine green is injected intravenously, sub-serosally or sub-mucosally and binds to plasma proteins. Excited by near-infrared light of 805–835 nm, it emits a fluorescence signal that the system displays in real time.",
          ],
        },
        gamme: {
          fr: [
            "Mode lumière blanche standard : image 3-CMOS pour toutes les chirurgies mini-invasives",
            "Mode fluorescence standard : image de fluorescence de haute qualité pour détecter l'ICG",
            "Mode fluorescence ISO : fusion fluorescence et lumière blanche pour suivre l'intensité et le flux de l'ICG",
            "Mode multi-affichage : lumière blanche, fluorescence verte, ISO et proche infrarouge noir et blanc en même temps",
          ],
          en: [
            "Standard white light mode: 3-CMOS image for all standard minimally invasive surgery",
            "Standard fluorescence mode: high-quality fluorescence image for ICG detection",
            "ISO fluorescence mode: fluorescence and white light merged to track ICG intensity and flow",
            "Multi-display mode: white light, green fluorescence, ISO and NIR black-and-white at the same time",
          ],
        },
        points: {
          fr: ["4 capteurs CMOS 4K", "4 modes d'affichage", "Effet de relief 3D", "Excitation NIR 805–835 nm"],
          en: ["4-CMOS 4K sensors", "4 display modes", "3D effect", "805–835 nm NIR excitation"],
        },
        pdf: PDF.veqtron,
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
        details: {
          fr: [
            "La source VEQTRON Twinlight associe une lumière LED et une lumière LASER, utilisables en lumière blanche standard comme en mode ICG/NIR.",
            "L'intensité lumineuse est réglable en continu et garantit une lumière de qualité constante. Le réglage adaptatif (en lumière blanche et en NIR) ajuste automatiquement l'intensité à la distance entre l'endoscope et les tissus.",
          ],
          en: [
            "The VEQTRON Twinlight source combines LED and LASER light for use in standard white light as well as ICG/NIR mode.",
            "Light intensity is infinitely variable, guaranteeing consistently high light quality. Adaptive light adjustment (in white light and NIR mode) automatically matches the intensity to the distance between endoscope and tissue.",
          ],
        },
        gamme: {
          fr: ["Lumière LED blanche", "Laser proche infrarouge (NIR)", "Réglage adaptatif automatique", "Câble de lumière froide"],
          en: ["White LED light", "Near-infrared (NIR) laser", "Automatic adaptive adjustment", "Cold light cable"],
        },
        points: {
          fr: ["LED + LASER", "Intensité réglable en continu", "Réglage automatique selon la distance"],
          en: ["LED + LASER", "Infinitely variable intensity", "Automatic distance-based adjustment"],
        },
        pdf: PDF.veqtron,
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
        details: {
          fr: [
            "FluorosQan est une caméra portable de fluorescence pour la chirurgie ouverte. Sa technologie 4 CMOS améliore la visualisation de la perfusion des tissus en temps réel.",
            "Elle permet de suivre le système lymphatique, d'observer la perfusion des tissus et de délimiter précisément les tumeurs, pour une exérèse complète sans ouvrir la tumeur. Grâce à elle, la fluorescence prend de plus en plus de place en chirurgie oncologique ouverte, par exemple pour la parathyroïde (autofluorescence).",
          ],
          en: [
            "FluorosQan is a handheld fluorescence camera for open surgery. Its latest 4-CMOS technology enhances real-time visualisation of tissue perfusion.",
            "It allows real-time lymphatic tracking, tissue perfusion observation and accurate tumour boundary mapping, so a tumour can be removed completely without being opened. With hand-held cameras like this, fluorescence is becoming increasingly important in open oncological surgery, for example for the parathyroid glands (autofluorescence).",
          ],
        },
        gamme: {
          fr: ["Caméra portable 4 CMOS", "4 modes d'affichage (blanc, fluorescence, ISO, multi)", "Compatible avec le système VEQTRON"],
          en: ["Handheld 4-CMOS camera", "4 display modes (white, fluorescence, ISO, multi)", "Works with the VEQTRON system"],
        },
        points: {
          fr: ["Chirurgie ouverte", "Suivi lymphatique en temps réel", "Limites tumorales précises", "Perfusion des tissus"],
          en: ["Open surgery", "Real-time lymphatic tracking", "Accurate tumour margins", "Tissue perfusion"],
        },
        pdf: PDF.veqtron,
      },
      {
        id: "multi-affichage",
        nom: { fr: "Mode multi-affichage", en: "Multi-display mode" },
        description: {
          fr: "Lumière blanche, fluorescence et proche infrarouge affichés simultanément sur un même écran.",
          en: "White light, fluorescence and near-infrared shown side by side on a single screen.",
        },
        image: "/images/produits/veqtron-multi-affichage.jpg",
        details: {
          fr: [
            "Le mode multi-affichage VEQTRON montre en même temps la lumière blanche, la fluorescence verte, la fluorescence ISO et l'image proche infrarouge en noir et blanc, avec la possibilité de choisir le mode affiché sur l'écran principal.",
            "La chirurgie guidée par fluorescence permet de bien évaluer la circulation sanguine dans les tissus (par exemple au niveau d'une anastomose), de voir les limites d'une tumeur, les métastases et le système lymphatique, ou de visualiser le canal cholédoque, sans marquage radioactif complexe. Moins de stress pour les équipes, un gain de temps et de coûts.",
          ],
          en: [
            "VEQTRON multi-display mode shows white light, green fluorescence, ISO fluorescence and black-and-white NIR at the same time, with the option to choose which mode appears on the main display.",
            "Fluorescence-guided surgery makes it possible to assess blood flow in tissue (for example at an anastomosis), to see tumour boundaries, metastases and the lymphatic system, or to visualise the common bile duct, without elaborate radioactive marking. Less stress for staff, with time and cost savings.",
          ],
        },
        gamme: {
          fr: ["Lumière blanche", "Fluorescence verte", "Fluorescence ISO", "Proche infrarouge noir et blanc"],
          en: ["White light", "Green fluorescence", "ISO fluorescence", "Black-and-white near-infrared"],
        },
        points: {
          fr: ["4 images en même temps", "Choix de l'image principale", "Sans perte de qualité"],
          en: ["4 images at once", "Choice of main image", "No loss of image quality"],
        },
        pdf: PDF.veqtron,
      },
    ],
  },
];

function traduire(p: ProduitSource, lang: Locale): Produit {
  return {
    id: p.id,
    nom: p.nom[lang],
    description: p.description[lang],
    image: p.image,
    rendu: p.rendu,
    details: p.details[lang],
    gamme: p.gamme[lang],
    points: p.points[lang],
    galerie: p.galerie ?? [],
    pdf: p.pdf,
  };
}

/** Le catalogue dans la langue demandée. */
export function getCatalogue(lang: Locale): Famille[] {
  return FAMILLES.map((f) => ({
    id: f.id,
    nom: f.nom[lang],
    accroche: f.accroche[lang],
    produits: f.produits.map((p) => traduire(p, lang)),
  }));
}

/** Tous les identifiants de produits (pour générer les pages). */
export function idsProduits(): string[] {
  return FAMILLES.flatMap((f) => f.produits.map((p) => p.id));
}

/** Un produit, sa famille et ses voisins, dans une langue donnée. */
export function getProduit(lang: Locale, id: string) {
  const tous = FAMILLES.flatMap((f) => f.produits.map((p) => ({ f, p })));
  const index = tous.findIndex((x) => x.p.id === id);
  if (index === -1) return null;
  const { f, p } = tous[index];
  const voisin = (i: number) => {
    const x = tous[(i + tous.length) % tous.length].p;
    return { id: x.id, nom: x.nom[lang] };
  };
  return {
    produit: traduire(p, lang),
    famille: { id: f.id, nom: f.nom[lang] },
    autres: f.produits.filter((x) => x.id !== id).map((x) => traduire(x, lang)),
    precedent: voisin(index - 1),
    suivant: voisin(index + 1),
  };
}

/** Nom d'un produit et de sa famille, à partir de son identifiant. */
export function trouverProduit(lang: Locale, id: string) {
  for (const f of FAMILLES) {
    const p = f.produits.find((x) => x.id === id);
    if (p) return { nom: p.nom[lang], famille: f.nom[lang] };
  }
  return { nom: id, famille: "" };
}
