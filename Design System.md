---
name: Architectural Precision
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434654'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737685'
  outline-variant: '#c3c6d6'
  surface-tint: '#0c56d0'
  primary: '#003d9b'
  on-primary: '#ffffff'
  primary-container: '#0052cc'
  on-primary-container: '#c4d2ff'
  inverse-primary: '#b2c5ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#404445'
  on-tertiary: '#ffffff'
  tertiary-container: '#585b5d'
  on-tertiary-container: '#d1d3d5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b2c5ff'
  on-primary-fixed: '#001848'
  on-primary-fixed-variant: '#0040a2'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Gilroy
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Gilroy
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Gilroy
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-xl-mobile:
    fontFamily: Gilroy
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Gilroy
    fontSize: 30px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Gilroy
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Gilroy
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Gilroy
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-gap-desktop: 120px
  section-gap-mobile: 64px
---

## Brand & Style
The design system is rooted in the "Architectural Precision" style—a blend of Corporate Modernism and high-end SaaS aesthetics. It targets homeowners and real estate professionals who value organization, clarity, and reliability. The visual narrative emphasizes stability through a structured grid, vast whitespace to reduce cognitive load, and a tech-forward atmosphere that remains approachable. The emotional response should be one of "controlled complexity," where sophisticated data feels manageable and secure.

## Colors
The palette is anchored by a deep **Corporate Blue** (#0052CC) as the primary brand driver, symbolizing trust and technical proficiency. This is supported by a **Slate Secondary** (#64748B) used for secondary actions and text, providing a soft contrast to the primary blue. **Ghost White** (#F8FAFC) serves as the tertiary background color to create distinct content sections without the harshness of pure white. Text and primary iconography utilize **Deep Navy** (#00172A) to ensure WCAG AAA legibility and a premium feel.

## Typography
This design system utilizes **Gilroy** as the primary brand typeface to create a polished, premium, and modern SaaS aesthetic while remaining highly legible at all scales. The hierarchy is "top-heavy," using **Gilroy Bold** for display and major headlines to command attention, **Gilroy Medium** for section headings, navigation, buttons, labels, and card titles, and **Gilroy Regular** for body copy and supporting text. Body copy is set with generous line height (1.5-1.6x) so technical content feels airy and readable. Small labels use Medium weight with slight tracking increases to maintain clarity in functional UI elements like tags and table headers.

Recommended fallback stack for implementation: `Gilroy, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

## Layout & Spacing
The system employs a **12-column fluid grid** for desktop, transitioning to a **4-column grid** for mobile. A strict 8px base unit governs all dimensions. Vertical rhythm is established through large section gaps (120px) to provide "breathing room" between complex value propositions. 

- **Desktop:** 1280px max-width container, 24px gutters.
- **Tablet:** Full-width with 40px side margins.
- **Mobile:** Full-width with 16px side margins.

Content blocks should favor asymmetrical layouts (e.g., 7-column text, 5-column image) to create a dynamic, modern pace.

## Elevation & Depth
The design system uses **Tonal Layering** and **Ambient Shadows** to create a sense of organized hierarchy. Surfaces are categorized into three levels:
1. **Level 0 (Flat):** The main background (#FFFFFF).
2. **Level 1 (Subtle):** Raised cards using a 1px border (#E2E8F0) and a soft, diffused shadow (0 4px 6px -1px rgb(0 0 0 / 0.1)).
3. **Level 2 (Floating):** Navigation bars and modals, utilizing a multi-layered "Deep" shadow with a 15% opacity primary color tint to imply brand-integrated depth.

Avoid heavy blurs; depth should feel structural, like architectural blueprints.

## Shapes
The shape language is "Softly Geometric." A standard radius of **8px (0.5rem)** is applied to buttons, input fields, and small cards to balance professionalism with approachability. Larger containers, such as feature sections or hero image masks, use **16px (1rem)** to emphasize a modern SaaS feel. Icons should follow a 2px stroke weight with slightly rounded terminals to match the typography's curvature.

## Components
- **Buttons:** Primary buttons are solid Blue (#0052CC) with white text. Secondary buttons use a Slate border with no fill. All buttons feature a subtle 1px "inner light" top border to simulate a slight 3D tactile quality.
- **Input Fields:** Use a 1px border (#CBD5E1). On focus, the border changes to Primary Blue with a 3px soft blue outer glow.
- **Cards:** Cards must have 24px internal padding. Feature cards should use top-aligned professional icons in a light blue circular housing (#E6EEFA).
- **Chips/Badges:** Use a "Pill" shape (999px radius) with a light background tint of the status color (e.g., Light Blue for "New", Light Green for "Verified").
- **Imagery:** Photography should be high-brightness, featuring clean lines and architectural minimalism. Digital screenshots should be framed within "Browser Chrome" containers that use the system's 8px roundedness and Level 1 shadows.