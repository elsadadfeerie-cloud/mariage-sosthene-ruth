# Sosthene & Ruth — site du mariage

Mini-site statique responsive : accueil, menu, galerie de la dot avec agrandissement des photos, et remerciement. Il ne collecte aucune donnée personnelle et ne nécessite aucun compte.

## Prévisualiser

Ouvrez `index.html` dans un navigateur moderne. Si le navigateur bloque les modules JavaScript en ouverture directe, lancez un serveur statique local depuis ce dossier : `python -m http.server 8000`, puis ouvrez `http://localhost:8000`.

## Modifier le contenu

Le contenu se trouve dans `src/weddingData.js` : prénoms, accueil, message de remerciement, rubriques et galerie. Les plats sont volontairement vides et apparaissent comme « À compléter après confirmation du menu ». Ajoutez les plats sous la rubrique correspondante, par exemple `items: ["Salade composée", "Brochettes"]`, seulement après validation par les mariés. La date et le numéro de table sont également vides tant qu'ils ne sont pas confirmés. Si vous souhaitez afficher un numéro de table sur la carte imprimable, mettez le même numéro dans `tableNumber` et dans l'attribut `data-table-number` de `carte-menu.html`.

Les photos originales sont conservées dans `assets/photo_*.webp`, converties pour le web à partir des photos PNG fournies. Elles gardent leur cadrage et leurs proportions dans la galerie. Pour remplacer une photo, copiez une image optimisée dans `assets/`, puis mettez à jour `gallery` dans le fichier de contenu.

## Déployer sur GitHub Pages et créer le QR final

Le site est statique et ne nécessite aucune compilation. Les étapes suivent [la procédure GitHub Pages officielle](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

1. Créez un dépôt GitHub pour le site. Les photos deviendront accessibles à toute personne qui visite le site; obtenez l'autorisation des mariés avant la publication.
2. Placez le contenu de ce dossier directement à la racine du dépôt (avec `index.html`, `styles.css`, `app.js`, `src/` et `assets/` à la racine).
3. Dans GitHub, ouvrez **Settings → Pages**. Sous **Build and deployment**, choisissez **Deploy from a branch**, sélectionnez la branche `main` et le dossier `/(root)`, puis cliquez **Save**.
4. Quand le déploiement est terminé, cliquez **Visit site** dans les réglages Pages et copiez l'adresse HTTPS publique.
5. Revenez au dossier local, ouvrez un terminal dans ce dossier et exécutez `npm install` une fois.
6. Créez le QR définitif avec `npm run qr -- https://votre-url-publique/` en remplaçant l'adresse d'exemple par l'URL copiée à l'étape 4.
7. Ajoutez `assets/qr-menu.png` et `assets/qr-menu.svg` au dépôt et poussez la mise à jour. La carte `carte-menu.html` les affichera automatiquement. Ouvrez cette page, puis imprimez-la en A5, à 100 %, sans ajustement à la page.
8. Scannez le code imprimé avec au moins deux téléphones avant l'impression en série.

Le générateur refuse les URL locales et HTTP. Aucun faux QR n'est fourni : sans URL publique, un code définitif ne pourrait pas ouvrir le site.

## À confirmer avant publication

- Date du mariage (si elle doit figurer sur le site ou la carte).
- Plats exacts : entrées, plat principal, accompagnements, desserts et boissons.
- Carte avec « TABLE 1 · AMOUR » ou carte menu sans numéro. Le champ `tableNumber` est actuellement vide.
- Hébergement ou nom de domaine souhaité, si un choix existe déjà.
- Autorisation des mariés pour rendre les quatre photos fournies accessibles au public via le QR code.
- URL HTTPS finale : nécessaire pour générer les fichiers QR définitifs.

## Accessibilité et comportement

Navigation par ancres et clavier, lien d'accès direct au contenu, attributs alternatifs sur les photos, boutons de galerie avec boîte de dialogue clavier, mise en page réduite pour petits écrans et prise en compte de `prefers-reduced-motion`. Une photo introuvable est retirée de la galerie sans bloquer les autres sections.
