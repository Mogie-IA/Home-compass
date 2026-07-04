# Design

Visual system for the Home Compass marketing site (`app/` — React + Vite + Tailwind + motion). Derived from `Design System.md` ("Architectural Precision") and the Clarasight reference, adapted to the brand's blue family.

## Theme

Light marketing site with deep navy-to-blue gradient heroes that fade into ghost-white content. Dark navy used for the pitch panel, audience card, contact scene, and footer.

## Color

| Token | Value | Use |
|---|---|---|
| navy | #00172a | Headings, dark surfaces, footer |
| navy-900 | #010f2e | Hero gradient top, scrolled nav |
| brand | #0052cc | Primary buttons, links, accents |
| brand-hover | #0047b3 | Button hover |
| brand-deep | #003d9b | Inverse-button text, link hover |
| brand-100 | #e6eefa | Icon housings, card tints |
| brand-50 | #f2f6fc | Tinted panels |
| ghost | #f8fafc | Alternate section background |
| slateBody | #526079 | Body text |
| slateSoft | #64748b | Muted text |
| line / line-soft | #e2e8f0 / #eaeff5 | Borders |
| skyline / mist | #7ea8f5 / #9dbdf7 | Accents on dark surfaces |

Hero gradient: `#010f2e → #062a72 → #0b3fa8 → #b8cdf5 → #f8fafc` with a radial `rgb(84 140 255 / .35)` glow at top.

## Typography

Gilroy (self-hosted TTF: 400/500/600/700), fallback Inter/system-ui.

- Display: clamp(2.5rem–4rem), 700, -0.02em, lh 1.08
- H2: clamp(2rem–3rem), 700, -0.015em, lh 1.16
- H3 card titles: ~1.05rem, 600
- Body: 1rem, lh ~1.55; lead clamp(1.05–1.185rem), lh 1.6
- Eyebrow: 0.815rem, 600, uppercase, 0.09em tracking, with a 9px compass-diamond marker (brand signature — this is the one deliberate kicker system)

## Shape & Elevation

Radii: buttons/inputs 8px, cards 16px, panels/modals 24px, pills 999px. Shadows: `lvl1` subtle card, `lvl2` floating (blue-tinted). Buttons carry a 1px inner-light top edge.

## Components

- **ShineButton**: variants primary (blue), inverse (white on dark), ghost (on dark), outline; shine sweep on hover, ripple + scale on tap.
- **SubscribeButton**: form submits morph idle → spinner → drawn check.
- **FrameShot**: browser-chrome frame around dashboard mockups; gentle hover lift.
- **ScrollHero**: dark gradient hero + AmbientRings + Container Scroll (3D tilt straightens on scroll).
- **CardScroller**: pinned section, vertical scroll drives cards horizontally; mobile falls back to snap-scroll row.
- **Marquee**: infinite product-shot band, pause on hover, static row under reduced motion.
- **FormModal**: 24px-radius dialog with CloudBand header (mouse-following cloud), blurred navy backdrop.
- **AmbientRings / CompassRose**: slow bezel rotation, breathing ring, ±6° needle sway.

## Motion

Springs for interactive feedback (stiffness 300–500), eased tweens (cubic-bezier(0.22,1,0.36,1), 0.4–0.6s) for reveals; ambient loops 14–180s. Everything checks `useReducedMotion`.

## Layout

Max shell 1200px, 24px gutters. Section padding ~96–112px desktop, ~64px mobile. Asymmetric splits (7/5) for feature rows; identical-card grids only for the genuinely enumerable (8 storable record types, numbered process steps).
