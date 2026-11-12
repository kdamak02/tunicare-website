# Tunicare Solutions — Site vitrine

> **Live: [www.tunicare.tn](https://www.tunicare.tn)** · Freelance project by [Khalil Damak](https://github.com/kdamak02), designed, built and deployed for the client.
> Corporate website for a medical-surgical equipment distributor in Tunisia: Next.js (App Router), TypeScript, Tailwind CSS v4, contact form API with Resend, SEO (sitemap, Open Graph), deployed on Vercel.

Site vitrine de Tunicare Solutions, distributeur en Tunisie de matériel
médico-chirurgical, partenaire d'AMNOTEC International Medical (Tuttlingen,
Allemagne). Construit avec Next.js 14+ (App Router), TypeScript et Tailwind
CSS v4.

## Démarrer en local

Prérequis : Node.js 18.18+ et npm.

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Formulaire de contact

Le formulaire (`components/ContactForm.tsx`) poste vers `app/api/contact/route.ts`,
qui supporte deux modes (voir les commentaires dans ce fichier) :

- **Avec service d'email (recommandé)** : configurez `RESEND_API_KEY` et
  `CONTACT_TO_EMAIL` dans un fichier `.env.local` (copiez `.env.example`) pour
  envoyer les messages via [Resend](https://resend.com) (gratuit jusqu'à
  3000 emails/mois).
- **Sans configuration** : si `RESEND_API_KEY` est absente, le formulaire
  bascule automatiquement sur un lien `mailto:` prérempli qui ouvre le client
  email de l'utilisateur.

## Structure du projet

```
app/
  layout.tsx        Layout racine, polices, métadonnées SEO/OG
  page.tsx           Assemblage des sections de la page d'accueil
  globals.css         Design tokens (couleurs, typos, animations)
  sitemap.ts / robots.ts
  api/contact/route.ts
components/
  Header.tsx, Hero.tsx, About.tsx, Products.tsx, WhyUs.tsx,
  Contact.tsx, ContactForm.tsx, Footer.tsx, Reveal.tsx
public/
  logo.png, logo-hd.png, icon.png
```

## Build de production

```bash
npm run build
npm run start
```

## Déployer sur Vercel

1. Poussez ce dépôt sur GitHub.
2. Sur [vercel.com](https://vercel.com), connectez-vous avec GitHub puis
   « Add New Project » et sélectionnez le dépôt.
3. Vercel détecte Next.js automatiquement — cliquez « Deploy ».
4. (Optionnel) Ajoutez les variables `RESEND_API_KEY` et `CONTACT_TO_EMAIL`
   dans Project → Settings → Environment Variables pour activer l'envoi
   d'email réel du formulaire de contact.
5. Pour un nom de domaine personnalisé : Project → Settings → Domains.
