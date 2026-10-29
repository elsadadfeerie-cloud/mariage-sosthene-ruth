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
menu.replaceChildren(...weddingData.menu.map((category) => {
  const card = document.createElement("article");
  card.className = "menu-card";
  const icon = document.createElement("span");
  icon.className = "menu-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = category.icon;
  const body = document.createElement("div");
  body.className = "menu-card-body";
  const title = document.createElement("h3");
  title.textContent = category.title;
  const list = document.createElement("ul");
  if (!category.items.length) {
    const item = document.createElement("li");
    item.className = "menu-pending";
    item.textContent = "À compléter après confirmation du menu";
    list.append(item);
  } else {
    for (const dish of category.items) {
      const item = document.createElement("li");
      if (typeof dish === "string") item.textContent = dish;
      else {
        item.textContent = dish.name;
        if (dish.description) {
          const detail = document.createElement("small");
          detail.textContent = dish.description;
          item.append(detail);
        }
      }
      list.append(item);
    }
  }
  body.append(title, list);
  card.append(icon, body);
  return card;
}));

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


// Load the exact approved welcome artwork from small text chunks. This keeps the
// image available on GitHub Pages without replacing the live menu/gallery sections.
async function loadHomepageArtwork() {
  const image = document.querySelector("#homepage-poster");
  if (!image) return;
  try {
    const assetUrl = new URL("assets/homepage-screen.webp.b64", import.meta.url);
    const response = await fetch(assetUrl);
    if (!response.ok) throw new Error(`Impossible de charger l’illustration (${response.status})`);
    const encoded = (await response.text()).trim();
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    const objectUrl = URL.createObjectURL(new Blob([bytes], { type: "image/webp" }));
    image.onload = () => URL.revokeObjectURL(objectUrl);
    image.src = objectUrl;
    const fallback = document.querySelector(".poster-fallback");
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      image.hidden = true;
      if (fallback) fallback.hidden = false;
    };
  } catch (error) {
    image.hidden = true;
    const fallback = document.querySelector(".poster-fallback");
    if (fallback) fallback.hidden = false;
    console.error("Artwork de la page d’accueil indisponible.", error);
  }
}
loadHomepageArtwork();

// Show the real mobile navigation only after the artwork's own bottom tabs
// have left the viewport, so guests do not see two navigation bars at once.
const posterSection = document.querySelector("#accueil");
if (posterSection) {
  const updatePastHome = () => {
    document.body.classList.toggle("past-home", posterSection.getBoundingClientRect().bottom <= 24);
  };
  window.addEventListener("scroll", updatePastHome, { passive: true });
  window.addEventListener("resize", updatePastHome);
  updatePastHome();
}
