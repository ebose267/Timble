/*
  THIMBLE SITE SETTINGS
  1. Local PNGs in /assets are used by default and are referenced directly in index.html.
  2. Optional: add Cloudinary HTTPS URLs below to replace individual local images.
  3. Add the real contact email in CONTACT_EMAIL before enabling enquiries.
  No client names, testimonials or business details are fabricated here.
*/
const CLOUDINARY = {
  hero: "",          // Optional HTTPS Cloudinary override for assets/hero-architecture.png
  architecture: "",  // Optional HTTPS Cloudinary override for assets/story-architecture.png
  detail: ""         // Optional HTTPS Cloudinary override for assets/detail-architecture.png
};

const CONTACT_EMAIL = ""; // Add the actual inbox before publishing the enquiry form.

// Attach the supplied Cloudinary assets to their reserved image frames.
for (const [slotName, url] of Object.entries(CLOUDINARY)) {
  if (!url || !/^https:\/\//i.test(url)) continue;
  const slot = document.querySelector(`[data-image-slot="${slotName}"]`);
  if (!slot) continue;
  const image = slot.querySelector(".slot-image");
  image.src = url;
  image.alt = slot.dataset.imageAlt || "";
  image.addEventListener("load", () => slot.classList.add("has-image"), { once: true });
  image.addEventListener("error", () => {
    image.removeAttribute("src");
    slot.classList.remove("has-image");
  }, { once: true });
}

// Mobile navigation.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

// Subtle section reveals. Content remains visible if IntersectionObserver is unavailable.
const revealTargets = document.querySelectorAll(
  ".section-heading, .service-card, .story-copy, .story-image, .approach-intro, .approach-row, .principle, .interlude-image, .interlude-copy, .contact-copy, .contact-form"
);

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealTargets.forEach((element) => element.classList.add("reveal"));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => revealObserver.observe(element));
}

// The front-end form opens a prefilled email. It does not pretend to store or send data.
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    if (!CONTACT_EMAIL || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONTACT_EMAIL)) {
      formStatus.textContent = "The enquiry form is ready, but its destination email has not been configured yet.";
      formStatus.classList.add("form-note-alert");
      return;
    }

    const fields = new FormData(contactForm);
    const subject = encodeURIComponent(`Project enquiry — ${fields.get("service")}`);
    const body = encodeURIComponent(
      `Name: ${fields.get("name")}\nEmail: ${fields.get("email")}\nArea: ${fields.get("service")}\n\nProject details:\n${fields.get("message")}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    formStatus.textContent = "Your email app should open with the enquiry details filled in.";
    formStatus.classList.remove("form-note-alert");
  });
}

// Keep the footer year current without hard-coding a year into the design.
const yearNode = document.querySelector("#year");
if (yearNode) yearNode.textContent = new Date().getFullYear();
