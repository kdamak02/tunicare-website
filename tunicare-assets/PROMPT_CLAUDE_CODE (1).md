# Prompt à coller dans Claude Code (VS Code)

## 🧩 Étape 0 — Préparer le dossier
1. Crée un nouveau dossier vide, ex: `tunicare-website`
2. Ouvre-le dans VS Code
3. Copie dedans le dossier `tunicare-assets/` (logo.png, logo-hd.png, icon.png) que je t'ai fourni
4. Ouvre le terminal Claude Code dans ce dossier et colle le prompt ci-dessous tel quel

---

## 📋 PROMPT À COPIER-COLLER

```
Crée un site vitrine professionnel complet pour l'entreprise suivante, prêt à déployer sur Vercel.

## Entreprise
- Nom : Tunicare Solutions
- Secteur : Commerce de matériel médical et chirurgical (matricule fiscal 1921874C, RC C02171522025)
- Activité réelle : Tunicare Solutions est distributeur en Tunisie de matériel médico-chirurgical, fournisseur principal AMNOTEC International Medical (Allemagne, basé à Tuttlingen, référence mondiale en instruments chirurgicaux).
- Gamme de produits à présenter (organisée en catégories, sans copier de vraies photos produits protégées, utiliser des visuels génériques médicaux/chirurgicaux de qualité ou des icônes/illustrations à la place) :
  1. Chirurgie ouverte : instruments de base, instruments ORL, micro-instruments, instruments dentaires, conteneurs de stérilisation, électrochirurgie
  2. Endoscopie : dispositifs endoscopiques, endoscopes, laparoscopie, urologie endoscopique, gynécologie endoscopique, arthroscopie
  3. Systèmes de guidage chirurgical (type VEQTRON) : solutions de chirurgie guidée haute précision
- Positionnement : partenaire de confiance pour cliniques, hôpitaux et professionnels de santé en Tunisie, garantissant du matériel médical allemand de haute qualité (Made in Germany / Tuttlingen, capitale mondiale de la technologie médicale)
- Coordonnées :
  - Téléphone : +216 23 198 831
  - Email : bacem.kallel@yahoo.com
  - Adresse : Av. Les Violettes, Imm. Les Jardins, Jmazh 2, Mnihla, Ariana 2094, Tunisie
- Mentions légales à inclure en footer : RC C02171522025 — MF 1921874/C/B/M/000

## Stack technique
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Composants découpés proprement (components/), pas tout dans page.tsx
- Formulaire de contact fonctionnel (envoi vers l'email via un provider gratuit type Resend ou simplement mailto: en solution simple si pas de backend email — expliquer les deux options dans un commentaire)
- Site 100% responsive (mobile first), léger, rapide
- Utiliser next/image pour toutes les images
- SEO : balises meta, title, description, Open Graph, favicon à partir de icon.png, sitemap.xml, robots.txt
- Accessibilité correcte (alt text, contraste, navigation clavier)

## Identité visuelle
- Utiliser le logo fourni dans /public (logo.png pour le header, icon.png pour le favicon, logo-hd.png disponible en haute résolution si besoin)
- Couleur principale : bleu #3775C3 (couleur exacte extraite du logo)
- Couleur secondaire : bleu clair/turquoise en dégradé (#5BC8E8 à #3775C3), inspiré du papier en-tête de l'entreprise (vagues bleues en haut de page)
- Style : professionnel, médical, épuré, rassurant, moderne — pas de couleurs criardes, beaucoup de blanc, typographie claire et lisible (type Inter ou similaire)
- Ambiance générale : sérieux, fiabilité, expertise médicale internationale

## Pages / sections à créer
1. **Header** : logo + menu (Accueil, À propos, Produits, Contact) + numéro de téléphone cliquable, sticky au scroll
2. **Accueil (Hero)** : accroche forte sur le positionnement (distributeur de confiance de matériel chirurgical premium, partenaire d'AMNOTEC Allemagne), bouton CTA vers Produits et vers Contact
3. **À propos** : présentation de Tunicare Solutions, son rôle de distributeur de confiance, mise en avant du partenariat avec un fabricant allemand reconnu (Tuttlingen), valeurs (qualité, fiabilité, accompagnement des professionnels de santé)
4. **Produits / Catalogue** : les 3 grandes catégories (Chirurgie ouverte, Endoscopie, Systèmes de guidage) présentées en cartes avec sous-catégories listées, chacune avec une courte description et une icône ou image générique adaptée. Pas de prix (secteur B2B médical, contact pour devis)
5. **Pourquoi nous choisir** : section avec 3-4 points forts (qualité allemande, accompagnement, service après-vente, fiabilité)
6. **Contact** : formulaire (nom, société, email, téléphone, message), coordonnées complètes, carte Google Maps embed avec l'adresse de Mnihla Ariana
7. **Footer** : logo, coordonnées, mentions légales (RC/MF), liens rapides, réseaux sociaux (placeholders à compléter)

## Structure de fichiers attendue
- app/ (page.tsx, layout.tsx, sections en composants séparés dans components/)
- public/ (logo.png, icon.png, logo-hd.png à copier depuis le dossier fourni)
- Fichier .env.example si un service d'email est utilisé
- README.md avec instructions claires pour lancer en local (npm install, npm run dev) et pour déployer

## Qualité attendue
- Code propre, commenté où nécessaire, TypeScript strict
- Aucune erreur console, aucun warning de build
- Lighthouse score correct (performance, accessibilité, SEO > 90 si possible)
- Design non générique : éviter le look "template Bootstrap par défaut", vraie identité visuelle travaillée avec le bleu de la marque

Une fois le site généré, vérifie qu'il compile sans erreur avec `npm run build`, corrige toute erreur, puis donne-moi la liste des fichiers créés et les prochaines étapes pour déployer sur Vercel via GitHub.
```

---

## 🚀 Étape 1 — Après génération du site

Une fois que Claude Code a fini, teste en local :
```bash
npm install
npm run dev
```
Ouvre `http://localhost:3000` pour vérifier.

---

## 🌐 Étape 2 — Mettre le code sur GitHub

Dans le terminal (toujours dans Claude Code ou VS Code) :
```bash
git init
git add .
git commit -m "Site vitrine Tunicare Solutions"
```
Puis crée un dépôt sur https://github.com/new (nom: `tunicare-website`, privé de préférence), et lance les commandes qu'GitHub t'affiche (git remote add origin ..., git push -u origin main).

Tu peux aussi demander directement à Claude Code : *"Crée un dépôt GitHub pour ce projet et pousse le code"* — s'il a l'extension GitHub CLI configurée, il peut le faire pour toi.

---

## ▲ Étape 3 — Déployer sur Vercel (gratuit)

1. Va sur https://vercel.com et crée un compte **avec ton compte GitHub** (bouton "Continue with GitHub") — pas besoin de mot de passe séparé
2. Clique "Add New Project"
3. Sélectionne le dépôt `tunicare-website`
4. Vercel détecte automatiquement Next.js — clique juste "Deploy"
5. En ~1 minute, ton site est en ligne sur une URL du type `tunicare-website.vercel.app`

Dis-moi quand c'est fait, ou colle-moi une erreur si le déploiement échoue, je t'aiderai à la corriger.

---

## 🌍 Étape 4 — Nom de domaine

Une fois le site déployé et validé, pour un nom de domaine (ex: `tunicaresolutions.com` ou `.tn`) :

1. **Choisir un registrar** : 
   - Pour un `.tn` (recommandé si clientèle tunisienne, plus crédible localement) → passer par l'**ATI** (registre officiel tunisien, via un revendeur agréé) ou des sites comme `www.register.tn`
   - Pour un `.com` international → Namecheap, OVH, ou directement Vercel (qui vend aussi des domaines)
2. **Acheter le domaine** (généralement 10-20€/an pour un .com, tarif variable pour un .tn)
3. **Connecter le domaine à Vercel** :
   - Dans Vercel : Project → Settings → Domains → ajouter ton nom de domaine
   - Vercel te donne des enregistrements DNS (A record ou CNAME) à copier
   - Va chez ton registrar, dans la gestion DNS, et colle ces enregistrements
   - Propagation en général sous 1h à 24h

Quand tu seras à cette étape, dis-le-moi et je te guide en détail selon le registrar que tu choisis.

---

## 📎 Notes importantes
- Les vraies photos produits appartiennent à Amnotec (le fournisseur) — ne pas les copier sans autorisation. Idéalement, demande à ton frère quelques photos réelles du magasin/stock/équipe pour remplacer les visuels génériques plus tard, ça rendra le site bien plus crédible.
- Le logo fourni a été extrait proprement en haute résolution à partir du fichier `.ai` original.
