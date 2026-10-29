import { weddingData } from "./src/weddingData.js";

for (const [key, value] of Object.entries({
  welcome: weddingData.welcome,
  verseText: weddingData.verseText,
  verseReference: weddingData.verseReference,
  galleryIntro: weddingData.galleryIntro,
  thanks: weddingData.thanks
})) {
  const target = document.querySelector(`[data-content="${key}"]`);
  if (target) target.textContent = value;
}

const menu = document.querySelector("#menu-list");

async function loadMenuImage(imagePath) {
  const encodedPath = imagePath + ".b64";
  const response = await fetch(new URL(encodedPath, import.meta.url));
  if (!response.ok) throw new Error(`Photo de menu introuvable: ${encodedPath}`);
  const encoded = (await response.text()).trim();
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return URL.createObjectURL(new Blob([bytes], { type: "image/webp" }));
}

async function renderMenu() {
  const cards = await Promise.all(weddingData.menu.map(async (dish, index) => {
    const card = document.createElement("article");
    card.className = "menu-card menu-card--dish";

    const image = document.createElement("img");
    image.className = "menu-dish-photo";
    image.alt = dish.alt || dish.title;
    image.loading = index === 0 ? "eager" : "lazy";
    image.decoding = "async";
    try {
      image.src = await loadMenuImage(dish.image);
    } catch (error) {
      image.hidden = true;
      console.warn("Impossible de charger la photo du plat.", error);
    }

    const body = document.createElement("div");
    body.className = "menu-dish-body";
    const title = document.createElement("h3");
    title.textContent = dish.title;
    const description = document.createElement("p");
    description.className = "menu-dish-description";
    description.textContent = dish.description || "";

    const number = document.createElement("span");
    number.className = "menu-dish-number";
    number.textContent = String(index + 1).padStart(2, "0");

    body.append(number, title);
    if (description.textContent) body.append(description);
    card.append(image, body);
    return card;
  }));
  menu.replaceChildren(...cards);
}
renderMenu().catch((error) => {
  console.error("Impossible d’afficher le menu.", error);
  menu.textContent = "Le menu est momentanément indisponible. Veuillez réessayer.";
});

const gallery = document.querySelector("#gallery-grid");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("p");
for (const photo of weddingData.gallery) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "gallery-item";
  button.setAttribute("aria-label", `${photo.caption}, ouvrir en grand`);
  const img = document.createElement("img");
  img.src = photo.src;
  img.alt = photo.alt;
  img.loading = "lazy";
  img.onerror = () => button.remove();
  const caption = document.createElement("span");
  caption.textContent = photo.caption;
  button.append(img, caption);
  button.addEventListener("click", () => {
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.alt;
    lightboxCaption.textContent = photo.caption;
    lightbox.showModal();
  });
  gallery.append(button);
}
lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll("[data-nav]")];
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      const active = link.dataset.nav === visible.target.id;
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-28% 0px -55% 0px", threshold: [0, 0.25, 0.5] });
  sections.forEach((section) => observer.observe(section));
}


// Hamburger de la page d'accueil mobile : accès rapide aux rubriques.
const mobileMenuToggle = document.querySelector(".hero-menu-toggle");
const mobileFlyout = document.querySelector("#mobile-flyout");
if (mobileMenuToggle && mobileFlyout) {
  const closeMobileMenu = () => {
    mobileFlyout.hidden = true;
    mobileMenuToggle.setAttribute("aria-expanded", "false");
    mobileMenuToggle.setAttribute("aria-label", "Ouvrir le menu");
  };
  mobileMenuToggle.addEventListener("click", () => {
    const open = mobileMenuToggle.getAttribute("aria-expanded") !== "true";
    mobileMenuToggle.setAttribute("aria-expanded", String(open));
    mobileMenuToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    mobileFlyout.hidden = !open;
  });
  mobileFlyout.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMobileMenu));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMobileMenu(); });
}
