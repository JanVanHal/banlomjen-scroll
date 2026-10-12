# Ban Lom Jen Homestay (v2, scrolling site)

A one-page scrolling site for [Ban Lom Jen Homestay](https://janvanhal.github.io/banlomjen-scroll/) in Ban Rimkok, Mae Yao, Chiang Rai. Built from `BRIEF.md` with the scroll-craft engine (`scrollcraft.js` and `scrollcraft.css`). Those two files are the mechanism. Do not edit them per page. Page-specific behaviour lives in `index.html`, `styles.css`, and `script.js`.

## Sections

1. **Hero.** The guest house in the rice field, with a slow zoom and a little parallax. `property-08` is the photograph. `hero-homestay.jpg` on the old site is a collage, so it is not used as a full-bleed frame.
2. **Sawasdee.** Family introduction and the terrace view (`the-homestay-01`).
3. **The homestay.** A sideways pass along the house, terrace, guest tables, and garden.
4. **Rooms.** The four superior rooms, facilities from the original site, and a note that no nightly rate was published there.
5. **Cooking with Son.** The long hold on the page. The kitchen photograph stays while the class is told in three beats.
6. **Trips.** Motorbike, bicycle, trekking, and car, then the four packages with the original prices.
7. **Around Chiang Rai.** A sideways pass of places named on the original trip pages.
8. **By our guests.** One real quotation from the old site, then 14 guest photographs. Click a photograph for the lightbox.
9. **Find us.** Address, call, LINE, map, email, Facebook, and a contact form that opens the visitor’s email app.
10. **Footer.** Inside the contact section: address, © Ban Lom Jen Homestay, Website by Jan.

A morning / evening lantern in the header regrades the whole page. EN / TH / NL switches the visible copy. The guest quotation stays in the guest's words.

Type is Inter and Source Serif 4, self-hosted as Latin WOFF2 in `fonts/` (SIL Open Font License). Thai characters use the phone or computer's own Thai face.

## Images

All photographs come from the static rebuild of the original Weebly site, `JanVanHal/banlomjen-site`, which crawled `lomjenhomestay.weebly.com`. No stock photos and no generated pictures of the property. Each file is a JPEG plus a WebP of the same frame, capped at the source width.

| File stem | Where it sits |
|---|---|
| `property-08` | Hero |
| `the-homestay-01` | Welcome |
| `property-09`, `property-10`, `homepage-banner`, `property-04`, `property-11`, `property-02` | Homestay strip |
| `room-04`, `room-15`, `room-02`, `room-10`, `room-09`, `room-06` | Rooms |
| `cooking-with-son-02` | Cooking |
| `motorbike-01`, `bicycle-01`, `trekking-01`, `car-01` | Trip panels |
| `around-chiang-rai-23`, `bicycle-01`, `around-chiang-rai-03`, `around-chiang-rai-16`, `bicycle-03`, `around-chiang-rai-18` | Around Chiang Rai |
| `by-guests-01` through `16`, skipping 09 and 15 | Guest wall |

## Update the text or the photos

- Copy lives in `index.html`. Visible text is marked `data-i18n`, `data-i18n-html`, or `data-i18n-alt` and translated in `i18n.js` (English, Thai, and Dutch). The guest quotation stays in the guest's own words.
- A fact that was not on the original site is marked `<!-- TODO -->`. The nightly room rate is one of these: the old site said to ask.
- To swap a photograph, export a JPEG and a WebP with the same stem into `images/`, keep the `width` and `height` attributes honest, and write an alt that describes the picture.
- Prices, routes, and the package disclaimer are copied from the original pages. Change them only when Son confirms a new figure.

## Contact

- LINE: `https://line.me/ti/p/~banlomjen` (ID `banlomjen`)
- Phone: `+66 85 622 2097`
- Email: `lom.jen.homestay@gmail.com`
- Map: `https://www.google.com/maps?q=19.9389,99.766661`
- Facebook: `https://www.facebook.com/BanLomJen`

The forms use `mailto:` with `method="post"` and `enctype="text/plain"`, so a browser without JavaScript does not put the message in the query string. Nothing is stored on a server. A sent form is an email draft, not a confirmed booking.

## Run it locally

From this folder:

```bash
python3 -m http.server 4500
```

Open `http://localhost:4500`. The scroll is native. Reduced motion keeps the text and drops the position shifts.
