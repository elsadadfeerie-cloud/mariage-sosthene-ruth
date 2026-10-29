# Sosthene & Ruth — site du mariage

Mini-site statique, adapté aux téléphones, avec accueil romantique et festif, menu, galerie des photos réelles de la dot et message de remerciement. La direction artistique suit le panneau transmis : **violet profond, rose, or et ivoire**, avec motifs floraux et détails chrétiens.

Le verset affiché sur l’accueil et la carte est : « Que tout ce que vous faites se fasse avec amour. » — **1 Corinthiens 16:14**.

## Pages
- `index.html` : site des invités — accueil, verset, menu, galerie et remerciements.
- `carte-menu.html` : carte A5 imprimable, avec TABLE 1 · AMOUR et emplacement du QR code.
- `styles.css` : styles responsive du site.
- `app.js` et `src/weddingData.js` : interactions et contenu facilement modifiable.
- `assets/` : photos originales optimisées, icône du site.

## Modifier le contenu
Le contenu est dans `src/weddingData.js`. Les rubriques du menu sont présentes, mais les plats restent volontairement vides afin de ne pas inventer les choix des mariés. Remplir les plats après confirmation : `items: ["Salade composée", "Brochettes"]`. Confirmer aussi les dates si elles doivent être affichées.

## Déploiement HTTPS avec GitHub Pages
Le dépôt est configuré avec un workflow GitHub Actions dans `.github/workflows/deploy-pages.yml`, qui publie le contenu de la branche `our-stories-backend`.

1. Ouvrez **Settings → Pages** dans le dépôt.
2. Sous **Build and deployment**, choisissez **GitHub Actions** comme source.
3. Vérifiez l'onglet **Actions** et attendez que le workflow **Deploy mariage Sosthene Ruth to GitHub Pages** réussisse.
4. L'adresse attendue du site est `https://armelblai.github.io/mariage-sosthene-ruth/`. Ne l'utilisez pour l'impression qu'après avoir vérifié qu'elle s'ouvre réellement sur un téléphone.

Documentation : [configurer la source de publication GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Générer le QR code définitif
Le QR doit contenir l'URL HTTPS publique réelle — jamais une adresse locale. Après publication et vérification, exécutez localement :
```bash
npm install
npm run qr -- https://armelblai.github.io/mariage-sosthene-ruth/
``
Puis ajoutez les fichiers de QR générés dans `assets/`. Scannez le code imprimé avec au moins deux téléphones avant toute impression en série. La carte affiche volontairement un emplacement de remplacement tant que le QR final n'existe pas.

## À confirmer avant l'impression
- Menu exact : entrées, plat principal, accompagnements, desserts et boissons.
- Numéro de table : la carte utilise actuellement **Table 1 · Amour** comme dans le panneau de référence.
- Autorisation des mariés pour rendre leurs photos accessibles publiquement via le QR.
- URL HTTPS définitive : vérifiez la page en ligne avant de générer le QR.

Les photos manquantes sont retirées de la galerie sans casser les autres sections. La boîte d'agrandissement des photos prend en charge le clavier, et la page respecte la préférence système de réduction des animations.
