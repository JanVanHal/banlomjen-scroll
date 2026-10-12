# Build "Ban Lom Jen Homestay" v2: a complete refresh as a one-page scrolling website

## Goal
A **complete refresh** of Jan's homestay website as a modern, story-telling **scrolling one-page site**, with new full-bleed background imagery, smooth section transitions and a clear "book / contact us" path. **Use your installed scrolling-website skill** for the scroll structure and effects.

- Source (read-only, do NOT modify): `https://github.com/JanVanHal/banlomjen-site`. That's a static rebuild of the old Weebly site, with all the text in `index.html`, about 160 real photos in `images/`, and the original page and image list in `SOURCES.txt`.
- This repo: `JanVanHal/banlomjen-scroll`. Build here, push to `main` and enable GitHub Pages from `main` / root.

## Business facts (use exactly these, don't invent others)
- **Ban Lom Jen Homestay (BLJH)**, 227 Moo 4, Ban Rimkok, Mae Yao, Muang Chiang Rai 57100, Thailand.
- Host and contact: **Son**, phone **+66 85 622 2097**, LINE ID **banlomjen**, email **lom.jen.homestay@gmail.com**, Facebook **facebook.com/BanLomJen**. Use the Google Maps link from the source `index.html`.
- Owners: Jan (Dutch, has lived in Chiang Rai since 2012) and his family. The family also ran a restaurant and a bakery, so a "home cooking" angle fits.
- Take every room, trip, price and description from the source text. If a fact isn't in the source, leave a clearly marked `<!-- TODO -->` placeholder. Never make up prices, reviews or ratings.

## Story and sections (top to bottom)
1. **Hero**: a full-screen photo (use `hero-homestay.jpg` or the best property shot) with a slow zoom or parallax, the name, a one-line promise ("A quiet family homestay in the countryside of Chiang Rai") and two buttons, "Book via LINE" and "See the rooms".
2. **Welcome / Sawasdee**: a short personal intro from the family, with a photo.
3. **The homestay**: the garden, the house and the atmosphere, as a scrolling image strip (the `property-*` and `the-homestay-*` photos).
4. **Rooms**: Superior room cards with photos (`room-*`), facilities and the price from the source.
5. **Cooking with Son**: a full-bleed photo section plus text (`cooking-with-son-*`).
6. **Trips**: motorbike, bicycle, trekking and car trips, as cards that reveal as you scroll. Each card has its route title from the source, a photo (`motorbike-*`, `bicycle-*`, `trekking-*`, `car-*`, `trips-*`) and a "Personalized trip" option. Packages go here too (`packages-*`).
7. **Around Chiang Rai**: a horizontal-scroll or masonry gallery (`around-chiang-rai-*`), with short captions for the places named in the source (use only the place names that appear in the source: Wat Rong Khun, Karen Elephant Village, Hanging Bridge, Ban Pha Soet hot springs, Big Buddha, Ban Boon Rawd, Khun Kon waterfall, Chiang Rai city, Chiang Rai Beach, Mae Yao, Huai Mae Sai, and so on).
8. **By our guests**: a photo wall (`by-guests-*`, the best 12–16, lazy-loaded) with a lightbox.
9. **Find us / Contact**: a map embed or link, the address, big tap-to-call and LINE buttons, email, Facebook and a simple contact form (a `mailto:` fallback, since there's no backend).
10. **Footer**: contact details, © Ban Lom Jen Homestay and a small "Website by Jan" line.

## New background imagery
- Use the **real photos** as the main imagery, since guests want to see the actual place. Pick the best ones for the full-bleed backgrounds between sections, and add soft gradient overlays so the text is always readable.
- For the "new look", you may add **decorative backgrounds**: subtle hand-drawn style SVG shapes (rice fields, mountains, leaves, a lantern), soft paper or grain textures, and gentle colour washes. Create these yourself as SVG or CSS. Don't use AI-generated fake photos of the property.
- Optional extra landscape photos of Chiang Rai: only from Unsplash or Pexels with a free licence. Download them into `images/stock/` and credit them in `CREDITS.md`.
- Optimise every image: create WebP versions at most 1920 px wide for backgrounds and 1200 px for cards, keep JPG fallbacks, use `loading="lazy"` below the fold and `srcset` where it helps. Aim for a hero that loads in under 2.5 seconds on mobile.

## Design
- A warm, calm and natural feel that's still in the same family as Jan's Notion design system. Base it on the `--nt-*` tokens and Inter + Source Serif 4 from `https://github.com/JanVanHal/unitpulse/blob/main/styles.css`. Serif for the big headings, Inter for the body.
- Add a small nature palette as **extra tokens**, defined once at the top: rice green (`#5b7f3a`-ish), teak brown (`#8a5a34`-ish), lantern gold (reuse `--nt-marigold`) and mist (`#eef1ec`-ish). Keep it tasteful.
- Scroll effects: gentle fade or slide reveals, light parallax on the photo sections, a sticky minimal nav that highlights the current section, and a progress bar. Respect `prefers-reduced-motion`, which turns effects off. No scroll-jacking, so normal scrolling must always work.
- Mobile-first (most guests book from their phones), with a sticky bottom bar on mobile holding "Call", "LINE" and "Map".
- Languages: English as the main language. Add a simple **EN / TH / NL toggle** for the short headings and buttons only, with the long texts in English for now and `<!-- TODO translate -->` marks.

## Tech rules
- Vanilla HTML, CSS and JS only, with no frameworks and no build step. If your scrolling skill expects a small library such as GSAP ScrollTrigger or Lenis, that's allowed only through a pinned CDN version, with a graceful fallback when it fails to load. Prefer plain CSS and IntersectionObserver.
- Use `index.html`, `styles.css` and `script.js`, with the images in `images/`.
- SEO and sharing: a meaningful `<title>` and meta description, Open Graph and Twitter image, `LodgingBusiness` JSON-LD with the address and phone, a `sitemap.xml`, a `robots.txt` and a favicon (a simple leaf or house mark).
- Accessible: alt text on every photo (descriptive, not "image1"), keyboard nav, focus states and good contrast on top of the photos.

## Done when
- All 10 sections are present, with real text and photos from the source and no invented facts.
- It scrolls smoothly on mobile and desktop, the effects are off under reduced motion, there are no console errors and no broken images or links.
- LINE, tel:, mailto: and map links all work. The contact form falls back to email.
- Lighthouse on mobile scores at least 85 for Performance and at least 95 for Accessibility, Best Practices and SEO.
- The `README.md` lists the sections, the image sources and how to update the text or photos. Push to `main` with GitHub Pages enabled.
- Report back: the repo link, the Pages URL, the Lighthouse scores and the list of `TODO` placeholders.

## Workflow
- This file is the source of truth. Build from it, commit with clear messages and push to `main`.
- Fix requests will be added under "Fix list". When asked to "apply the fix list", do every unchecked item, tick it (`- [x]`) and push.

## Fix list
- [x] Guest quote in "By our guests": use the guest's exact words from the source `index.html` (it starts "We just loved this place!"). Shorten only by cutting whole sentences and mark cuts with an ellipsis (...), don't reword (for example keep "bbq" and "restaurant/reception").

## Scrollcraft plan

Appended by the build. The sections and facts above stay the source of truth.

Grammar: homestay chapters. A place told as chapters you can jump, each on its own ground, with the photographic opening this brief requires. Filmic one-shot lost because the brief asks for a section nav and two hero actions. Continuous world lost because there is no footage and the brief forbids scroll-jacking. Chaptered editorial lost its title-page ban because the brief requires a full-bleed photograph first.

Feeling curve, written before the acts:

1. Calm. The house already in the rice, name and promise on screen.
2. Recognition. Sawasdee, in the family’s words, with the terrace table.
3. Stillness. The buildings pass beside you.
4. Confidence. The room, the bath, the tray, and an honest gap where the nightly rate is not published.
5. Appetite. The kitchen holds. This is the peak.
6. Wander. The routes arrive as changes of place.
7. Expanse. Chiang Rai travels sideways, labelled only where the photograph can carry the name.
8. Belonging. One real guest note, then their photographs.
9. Resolve. The address, the call, the form. The page stops here.

Peak, as a visitor would say it: the kitchen opens and you are standing at the stove with Son, and the garden has already decided dinner.

Tell-someone sentence: it’s the site where you walk from the rice field to Son’s kitchen, then light the lantern and the whole house turns to evening.

Signature move: the morning/evening lantern. One control regrades the ground, the type, the scrims, and the photographs together, and the choice is written into the email the form opens. It is not a kit parameter.

Silence before the peak: the rooms are facts, not a second spectacle. No authored empty viewport.

Device order: parallax, reveal, pan, flow, pin, reveal, pan, flow, reveal. The cooking pin is the longest span (4.2). No scrub, because the photographs are real stills and there is no footage to scrub. Registry was empty, so the fingerprint gate had nothing to clear.


- [x] **Animations/scrolling (from Jan, 2026-10-12):** not all animations and scroll effects run smoothly. Review all scroll/reveal animations for jank or glitches and make them reliable (more details from Jan to follow).
- [x] **Images loading (from Jan, 2026-10-12):** some images don't load or load too late. Check all image paths, the lazy-loading and preloading of images above the fold, and make sure every image appears in time (more details to follow).
- [x] **External links (from Jan, 2026-10-12):** every link that leaves the site (LINE, map, social, booking, any external URL) opens in a new tab with `target="_blank" rel="noopener noreferrer"`. In-page anchor links stay in the same tab.
- [x] **Full translations TH and NL (from Jan, 2026-10-12):** the TH and NL buttons currently translate only the headings. Translate ALL visible text into Thai and Dutch: paragraphs, room/trip/package descriptions, buttons, labels, captions, footer, the mobile Call/LINE/Map bar, and alt text. Every element with text needs a translation key for EN/TH/NL, with natural (not word-for-word) Thai and Dutch. The guest quote stays in the guest's original words. Check that switching back and forth leaves no English behind.
- [x] **Owners and business scope (from Jan, 2026-10-12):** remove every mention of Jan, both as an owner and as being from the Netherlands/Dutch, in all three languages (EN/TH/NL), in body text, alt text, meta/SEO descriptions and structured data. Also remove every mention of the bakery and the restaurant: the business now only serves its homestay guests. Rewrite the affected sentences so they still read naturally. The cooking/food content for homestay guests can stay, as long as it's framed as being for guests only. The NL language option stays.
- [x] **Humanize the copy (from Jan, 2026-10-12):** after the content fixes above, run all site text (EN, TH, NL) through the humanizer skill/plugin so it reads as warm, natural, human-written copy: no AI-sounding phrases, no buzzwords, varied sentence length, a friendly family-homestay voice. Keep facts, prices, contact details and the guest quote unchanged.
- [ ] **Footer credit (review 2026-10-12):** the footer still says "Website by Jan" (`footBy` in `i18n.js` EN/TH/NL and `index.html`). Remove this line entirely (or replace with nothing) so there is no mention of Jan anywhere.
