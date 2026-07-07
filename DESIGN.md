---
name: Take Your Gloves
description: Expériences automobiles premium à Strasbourg — émotion, camaraderie, authenticité
colors:
  void: "#09090b"
  surface-low: "#0f0e0c"
  surface-mid: "#181614"
  foreground: "#ede8e0"
  muted: "#857d74"
  cuivre-patine: "#b85228"
  cuivre-profond: "#943f1e"
  laiton-dore: "#c8982a"
typography:
  display:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "clamp(3.75rem, 7vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    letterSpacing: "0.18em"
rounded:
  sm: "8px"
  md: "16px"
  full: "9999px"
spacing:
  section-y: "112px"
  container-x: "24px"
  container-x-lg: "40px"
  max-width: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.cuivre-patine}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.cuivre-profond}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  card:
    backgroundColor: "{colors.surface-low}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "24px"
  testimonial-card:
    backgroundColor: "{colors.surface-low}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "28px"
---

# Design System: Take Your Gloves

## 1. Overview

**Creative North Star: "La Patine de la Fraternité"**

This is a system built on the beauty of things worn in together — the copper that darkens with use, the brass gauge that reads true only when the engine is running, the camaraderie that forms after a hundred shared kilometres. Take Your Gloves is not a luxury product to be admired from a distance. It is a premium experience that belongs to the people who live it. The design system must carry that truth in every decision: atmosphere over ornament, warmth over gloss, presence over polish.

The visual language is dark and earthy. A near-black void (`#09090b`) grounds the page, while two trace warm radial gradients — copper at the top centre, amber at the top right — suggest the quality of light just before a dawn drive. Surfaces are almost invisible: three tonal dark layers (`#09090b` → `#0f0e0c` → `#181614`) provide structure without competing with photography. A fixed grain overlay at 3.5% opacity adds texture that makes the interface feel like a material surface rather than a screen.

Color is earned, not sprayed. The Cuivre Patiné accent (`#b85228`) appears in small doses — on active nav states, category labels, button fills, hover glows. The Laiton Doré (`#c8982a`) is rarer still: star ratings, the hero headline's second line, the gold gradient accent line that crowns testimonial cards. Used together they reference the instrument cluster and the worn leather of a cockpit — not the showroom floor. The interface efffaces itself so that the images, the events, and the human stories can do the talking.

**Key Characteristics:**
- Near-black canvas with trace warm radials — atmosphere before interface
- Two metallic accents (copper + amber-gold) used at deliberate scarcity
- Single variable font (Geist), heavy at display sizes, restrained in body
- Motion is cinematic and exponential — no bounce, no wiggle, no elastic
- Components are quiet at rest, warm and alive on hover
- Community visible (testimonials, faces, group imagery) — interface invisible


## 2. Colors: La Palette Cuivre-Patine

The palette is built on organic darkness. The backgrounds are near-neutral near-black with trace warm undertones, not cold charcoals. The two accent metals — copper and amber-gold — carry all warmth, appearing sparingly so their presence is always felt.

### Primary

- **Cuivre Patiné** (`#b85228`): The primary brand accent. Used for CTA button fill, active nav underline, category labels, hover glows, bullet icons, and the accent radial gradient on the body. The copper is slightly dark and desaturated — earned, not shiny. Never use it on more than ~15% of any given screen.
- **Cuivre Profond** (`#943f1e`): The hover/pressed state of Cuivre Patiné. Used only in interactive state transitions — never as a resting surface.

### Secondary

- **Laiton Doré** (`#c8982a`): The gold accent. Reserved for the hero headline second line (`.gold-text` gradient), star ratings, the gold-to-transparent gradient line on testimonial cards, the stats strip accent line, and the scroll progress bar tail. More precious than copper — appears fewer than 5 times per page.

### Neutral

- **Void** (`#09090b`): The page background. Near-black with the faintest warm undertone. The foundation of the atmosphere.
- **Surface Low** (`#0f0e0c`): Card and section backgrounds. Barely distinguishable from Void at a glance; the distinction creates depth without contrast.
- **Surface Mid** (`#181614`): Second-level surfaces, used for higher-elevation containers and hover states of cards.
- **Foreground** (`#ede8e0`): Primary text and logo. A warm linen — not pure white, not cool. The slight warmth ties it to the copper accent family without being golden.
- **Muted** (`#857d74`): Secondary text, metadata, body copy, placeholder text. An earthy warm stone that reads clearly against the dark backgrounds (contrast > 4.5:1 verified against Void).

### Transparent Utility

- **Line** (`rgba(237, 232, 224, 0.10)`): All borders, dividers, and card edges. Never a solid color — always transparent so it adapts to whatever surface is beneath. Defined as a CSS custom property `--line`.

### Named Rules

**The Cuivre Rule.** The primary copper accent (`#b85228`) is used on ≤15% of any given screen at rest. Its warmth is the point — diluting it with overuse kills the contrast that makes it land.

**The No-Silver Rule.** This system has no cool grays, no blue-grays, no slate tones. Every neutral trends warm. When you need a muted tone, pull from the warm stone family, not from a neutral ramp.

**The Two-Metal Limit.** Copper and gold together are the maximum palette. Never introduce a third accent color — no teal, no indigo, no crimson red beyond the copper family.


## 3. Typography

**Display / Body Font:** Geist (variable, single family)
**Fallback stack:** Arial, Helvetica, sans-serif

**Character:** A single geometric variable sans-serif at extreme weight contrast — 800 for all display sizes, 400 for body. No middle ground, no medium-weight hedging. Geist at 800 feels like the marking on a speed gauge: precise, purposeful, physical. At 400 in body it becomes invisible infrastructure.

### Hierarchy

- **Display** (800, `clamp(3.75rem, 7vw, 6rem)`, line-height 0.95, tracking −0.02em): Hero headline only. Split across two lines with overflow hidden to enable the word-reveal animation. Second line uses `.gold-text` gradient.
- **Headline** (800, `clamp(2.25rem, 5vw, 3rem)`, line-height 1.02, tracking −0.02em): Section titles, event detail page headings. Use `text-wrap: balance` on all headlines.
- **Title** (800, `1.125rem`, line-height 1.2, tracking −0.02em): Card titles, testimonial names, subheadings within sections.
- **Body** (400, `1rem`, line-height 1.625): All descriptive copy. Maximum line length 65ch; enforce with `max-w-xl` (42ch) or `max-w-2xl` (~65ch). Color is always `{colors.foreground}` for primary body, `{colors.muted}` for secondary/supporting copy.
- **Label** (800, `0.75rem`, tracking +0.18em, uppercase): Category labels, stat labels, nav links, eyebrow text on CTAs, section kickers. Wide tracking only at this size — never apply wide tracking to body text or headlines.

### Layout & Spacing

Sections are separated by `padding-block: 112px` (a.k.a. `py-28`). Maximum content width is `max-w-7xl` (1280px) with horizontal padding `24px` (mobile) and `40px` (≥1024px). This generous whitespace is the breathing room that makes the typography feel premium.

### Named Rules

**The Bold-or-Nothing Rule.** All display, headline, title, and label text is font-weight 800. Body text is 400. The number 600 does not exist in this system. Medium-weight hedging produces neither authority nor readability.

**The Tracking Inversion Rule.** Large text tracks tighter (−0.02em on display/headline). Small text tracks wider (+0.18em on labels). Never apply tight tracking to small text or loose tracking to large text.


## 4. Elevation

This system uses a hybrid elevation model: tonal surface layers provide structural depth at rest; warm glows appear only as a response to interaction. Nothing is lifted by default. Shadow is earned.

**At rest:** Three tonal dark surfaces stack to create implicit hierarchy — Void (`#09090b`) as the page floor, Surface Low (`#0f0e0c`) for cards and strips, Surface Mid (`#181614`) for nested containers. The difference is visible only in context; the system never screams depth.

**On hover:** Interactive elements ignite with copper and gold radial glows. Primary buttons cast `0 0 28px rgba(184,82,40,0.45)`. Nav contact link casts `0 0 18px rgba(184,82,40,0.28)`. Calendar cards cast a `radial-gradient(500px circle at cursor-position, rgba(200,152,42,0.08), transparent 60%)` that follows the mouse — a tracked spotlight effect tied to the 3D tilt. Testimonial cards glow gold on the top edge (`via-gold/30`) on hover.

**Ambient background:** The body has two decorative radial gradients baked in at page load — copper at top-centre (`rgba(184,82,40,0.12)`) and gold at top-right (`rgba(200,152,42,0.05)`) — that give the page atmospheric warmth without any surface-level ornamentation.

**Grain texture:** A fixed `noise-overlay` div at `opacity: 0.035` renders an SVG feTurbulence pattern across the entire viewport. This is not decoration — it prevents the dark backgrounds from reading as pure digital black and ties them back to physical materials.

### Named Rules

**The Ignition Rule.** Depth and glow only appear in response to user action (hover, scroll, focus). At rest the interface is flat and dark. The warmth is a reward for engagement, not a default state.

**The No-Box-Shadow-at-Rest Rule.** `box-shadow` is prohibited on any element in its default/resting state. Shadows exist only in `:hover` and `:focus-visible` rules, as immediate state feedback.


## 5. Components

Components in this system are quiet, precise, and deferential. They never compete with the photography or the event copy. The `{colors.cuivre-patine}` appears only where it must guide the user; everywhere else, surfaces are near-invisible.

### Buttons

**Feel:** Rounded pill shapes with substantial padding. The pill is warm and accessible, not corporate-angular.

- **Shape:** Fully rounded (`border-radius: 9999px`). Padding: `16px 32px`.
- **Primary:** Fill `{colors.cuivre-patine}` (`#b85228`), text `{colors.foreground}`. Hover: darken to `{colors.cuivre-profond}` (`#943f1e`), scale up `1.03×`, cast copper glow `0 0 28px rgba(184,82,40,0.45)`. A shimmer sweep (`via-white/12`) crosses the button on hover at 500ms.
- **Outline:** Transparent fill, border `1px solid rgba(237,232,224,0.25)`. Hover: border becomes `rgba(184,82,40,0.70)`, text shifts to `{colors.cuivre-patine}`, soft glow `0 0 18px rgba(184,82,40,0.15)`, scale `1.03×`.
- **Ghost:** Transparent fill, no border. Text `{colors.muted}`. Hover: text `{colors.foreground}`. Used only for secondary navigation links ("Voir tout le calendrier").
- **Arrow suffix:** All buttons carry a trailing `→` that translates `+4px` right on group-hover (`transition-transform duration-300 group-hover:translate-x-1`). The arrow is part of the button rhythm, not an icon.

### Calendar Cards

**The signature component.** Horizontal card with a poster-format photo (`707:1000` aspect ratio, `w-48` at ≥sm) on the left and event metadata on the right.

- **Shape:** `border-radius: 16px`, border `1px solid {colors.line}` at rest.
- **3D Tilt:** On mouse move, the card rotates ±4° on both axes (`useSpring` with `stiffness: 200, damping: 20, mass: 0.4`). The tracked gold spotlight (`radial-gradient 500px`) follows the cursor position simultaneously.
- **Hover border:** Shifts to `rgba(184,82,40,0.40)` — copper, not gold.
- **Image:** Scales `1.1×` over 700ms on hover.
- **CTA label:** "Consulter le programme →" in label style; shifts from foreground to copper on group-hover.

### Testimonial Cards

- **Shape:** `border-radius: 16px`, border `1px solid {colors.line}`. A 1px gradient line (`from transparent via gold/30 to transparent`) crowns the top edge.
- **Hover:** Border shifts to `rgba(200,152,42,0.25)` — gold, not copper.
- **Stars:** Five stars in `{colors.laiton-dore}`. SVG inline, never an icon font.
- **Avatar:** Initials in a `36×36px` circle, `background: rgba(184,82,40,0.20)`, `ring: 1px rgba(184,82,40,0.30)`. Copper family.
- **Stagger:** Each card is wrapped in `<Reveal delay={index * 0.08}>`, entering in sequence.

### Stats Strip

Full-width band at `background: {colors.surface-low}` with top and bottom borders at `{colors.line}`. Three columns, each showing an animated counter (`CountUp`), a label, and a 40px gold-to-transparent gradient bar above the number.

- **Number:** Display typography (800 weight), `3.75rem → 4rem` responsive.
- **Label:** Label typography (+0.18em, uppercase), color `{colors.muted}`.
- **Counter animation:** Counts up from 0 on scroll-enter, 1.5s duration, ease-out.

### Navigation

- **Behaviour:** Auto-hides on downward scroll past 100px; reappears on any upward scroll. Transition: `y: "-100% → 0%"`, 350ms, `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Scrolled state:** `background: rgba(9,9,11,0.95)`, `backdrop-filter: blur(12px)`, border-bottom `{colors.line}`, `box-shadow: 0 8px 32px rgba(0,0,0,0.20)`.
- **Default state:** `background: rgba(9,9,11,0.70)`, `backdrop-filter: blur(4px)`.
- **Links:** Label typography; underline span grows `w-0 → w-full` on hover (300ms, copper `#b85228`). Active page: text and underline always copper.
- **CTA pill:** Outline style with label typography. Hover glows copper (`0 0 18px rgba(184,82,40,0.28)`).
- **Mobile:** Full-screen overlay with centred links at `2xl` (headline size). Hamburger uses three `<span>` lines animated with Framer Motion to an `×` on open.

### Scroll Progress Bar

A 2px horizontal bar pinned to `top: 0`, `z-index: 9999`. Scales from `scaleX(0)` to `scaleX(1)` via `useSpring` (`stiffness: 100, damping: 30`). Gradient: `{colors.cuivre-patine} → {colors.laiton-dore}` left to right.

### Cursor Glow

Applies only on `(pointer: fine)` devices (desktop with mouse). A circular radial gradient follows the mouse with spring lag (`stiffness: 160, damping: 24, mass: 0.9`):
- Default: `80×80px`, `rgba(184,82,40,0.18)` centre, fades transparent at 70%
- Hover (on `a` or `button`): `120×120px`, `rgba(184,82,40,0.32)` centre

The native cursor is **not hidden**. The glow is additive warmth, not a replacement cursor.

### Preloader

Full-screen `{colors.void}` overlay with centered logo (height `56px`). Visible only on first visit in a session (`sessionStorage` key `tyg-v1`). Logo enters `y: 14px → 0, opacity: 0 → 1` over 900ms. A 2px progress bar sweeps left to right in 2.1s (`from-accent to-gold`). Exits at 2400ms with opacity fade over 700ms using `cubic-bezier(0.76, 0, 0.24, 1)`.


## 6. Do's and Don'ts

### Do:

- **Do** use Cuivre Patiné (`#b85228`) exclusively for the primary CTA, active states, and hover glows. Its rarity makes it land.
- **Do** use Laiton Doré (`#c8982a`) only for the hero headline second line, star ratings, and the progress bar gradient. Fewer than 5 appearances per page.
- **Do** use font-weight 800 for all non-body text — display, headlines, labels, button text. No 600, no 500.
- **Do** set `text-wrap: balance` on all h1–h3 elements and `text-wrap: pretty` on long prose paragraphs.
- **Do** cap body copy at `max-w-xl` (roughly 42ch) for comfortable reading width.
- **Do** use `cubic-bezier(0.22, 1, 0.36, 1)` as the standard easing for all reveals and transitions. It's the system's voice.
- **Do** wrap scroll-triggered content in `<Reveal>` with `viewport: { once: true, margin: "-60px" }` — so content is already visible on headless/paused renders.
- **Do** include `@media (prefers-reduced-motion: reduce)` coverage for every animation (0.01ms durations).
- **Do** use full-border cards (`border: 1px solid {colors.line}`) — never side-stripe accents.
- **Do** let photography be the primary visual language. When a section has a strong image, make the UI quieter, not louder.
- **Do** represent the community: faces, group shots, and direct testimonials are higher priority than technical event descriptions.
- **Do** funnel all CTAs toward the contact form — one primary action per page.

### Don't:

- **Don't** add a third accent color. This is not a multi-brand palette. No teal, no blue, no crimson beyond the copper family.
- **Don't** use any cool-toned gray (slate, blue-gray, zinc). Every neutral in this system leans warm.
- **Don't** use pure white (`#ffffff`) anywhere. The foreground is warm linen (`#ede8e0`); pure white reads as clinical and breaks the atmosphere.
- **Don't** use `cursor: none`. The native cursor is always visible; the glow halo is additive.
- **Don't** design for the supercar showroom (Ferrari, Lamborghini aesthetic): no cold chrome surfaces, no mirror-gloss blacks, no white-on-white negative space, no "exclusivity" language. Take Your Gloves is premium but accessible.
- **Don't** design for the generic auto marketplace (LeBonCoin, La Centrale): no grid-of-car-cards, no price-per-listing layout, no comparison tables, no catalogue UX.
- **Don't** design for the corporate concession dealer: no conservative blues, no serif-on-white editorial, no stock-photography professionalism.
- **Don't** design for the amateur sports club: no dated Web 2.0 gradients, no busy backgrounds, no cluttered event timetables.
- **Don't** design for the generic travel agency: no soft-pastel destination tiles, no "package holiday" grid, no "from €X" pricing callouts.
- **Don't** apply wide tracking (`letter-spacing > 0.05em`) to text larger than 14px. Wide tracking is only for labels.
- **Don't** use bouncy or elastic easing (`spring` with bounce > 0, keyframe overshoots). All motion in this system is exponential ease-out.
- **Don't** add reveal animations that gate content visibility — the `<Reveal>` component starts with content already visible in SSR; the animation only enhances a visible default.
- **Don't** show prices. The contact form is the only gate. Price anchoring is explicitly prohibited by product strategy.
- **Don't** use glassmorphism (frosted glass cards with `backdrop-filter` as a decorative default). The nav uses blur purposefully for contrast against the hero; do not replicate this pattern on interior surfaces.
- **Don't** use gradient text (`background-clip: text`) except for the `.gold-text` class, which is a deliberate, named brand system. New gradient-text instances are prohibited.
