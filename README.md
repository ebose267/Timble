# Thimble website

A responsive static website for Thimble, a website and automation agency.

## Files

- `index.html` — page structure and local image references.
- `styles.css` — visual design and responsive layout.
- `script.js` — mobile navigation, section reveals, enquiry-form behaviour and optional image URL overrides.
- `assets/hero-architecture.png` — hero architectural image.
- `assets/story-architecture.png` — monochrome architectural image for the visual-story section.
- `assets/detail-architecture.png` — close-up architectural detail image.

## Run locally

Keep the folder structure intact, then open `index.html` in a modern browser. The site is static and does not require a build step. The Poppins font is loaded from Google Fonts when internet access is available; fallback fonts are declared.

## Replace images with Cloudinary URLs (optional)

The three PNGs are already referenced locally in `index.html`, so the website works without Cloudinary. To use Cloudinary later, add the corresponding HTTPS image URLs to the `CLOUDINARY` object near the top of `script.js` (`hero`, `architecture`, and `detail`). Blank values leave the local PNGs in place.

## Contact form

The form is front-end only. Add the real destination email to `CONTACT_EMAIL` in `script.js`. Until then, the page clearly tells visitors that the form destination has not been configured; it does not pretend to send or store enquiries.

## Before publishing

Confirm the real contact email and add any verified company details you want displayed. No client names, testimonials, awards, metrics, or project claims have been invented.
