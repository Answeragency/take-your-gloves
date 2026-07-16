# Take Your Gloves — Site Web

Site marketing pour un organisateur d'événements automobiles en Alsace.  
Stack : **Next.js 16.2.9** · **Tailwind CSS v4** · **Motion/React 12** · **Lenis 1.3**

---

## Démarrage rapide

```bash
npm install
npm run dev        # http://localhost:3000  (Turbopack)
npm run build      # build de production
```

Déploiement automatique via **GitHub → Vercel** à chaque push sur `main`.  
Repo : `github.com/Answeragency/take-your-gloves`

---

## Architecture

```
src/
├── app/
│   ├── page.tsx                  # Home — hero, stats, événements, témoignages, CTA
│   ├── evenements/
│   │   ├── page.tsx              # Listing événements
│   │   └── [slug]/page.tsx       # Détail événement dynamique
│   ├── galerie/page.tsx          # Galerie masonry (CSS columns)
│   ├── a-propos/page.tsx         # Page À propos
│   ├── temoignages/page.tsx      # Page Témoignages
│   ├── contact/page.tsx          # Formulaire de contact (simulation client)
│   ├── globals.css               # Tokens design + Tailwind @theme inline
│   └── layout.tsx                # Layout racine (nav, footer, lenis, curseur)
├── components/
│   ├── hero.tsx                  # Hero vidéo, parallaxe, reveal mot-par-mot
│   ├── nav.tsx                   # Nav fixe — desktop + hamburger mobile animé
│   ├── button.tsx                # Bouton polymorphe (primary / outline / ghost)
│   ├── calendar-card.tsx         # Carte événement — tilt 3D, glow suiveur
│   ├── testimonial-card.tsx      # Carte témoignage
│   ├── section-heading.tsx       # H2 avec gradient cuivré (.heading-gradient)
│   ├── stats-strip.tsx           # Compteurs animés (count-up)
│   ├── marquee.tsx               # Ticker défilant
│   ├── cta-banner.tsx            # Bandeau call-to-action bas de page
│   ├── cursor.tsx                # Curseur lumineux custom (pointer: fine only)
│   ├── preloader.tsx             # Préloader animé au chargement initial
│   ├── scroll-progress.tsx       # Barre de progression de scroll
│   ├── reveal.tsx                # Wrapper animation d'apparition au scroll
│   ├── lenis-provider.tsx        # Smooth scroll global
│   ├── photo.tsx                 # Image avec overlay et label
│   ├── footer.tsx                # Pied de page
│   └── contact-form.tsx          # Formulaire (simulation, pas de backend)
└── lib/
    ├── calendar.ts               # Données événements + types CalendarEvent
    ├── events.ts                 # Témoignages et données éditoriales
    └── testimonials-extra.ts     # Témoignages supplémentaires
```

---

## Design system

Tout est dans `src/app/globals.css`. Tailwind v4 lit les CSS variables via `@theme inline`.

### Palette

| Token CSS | Valeur | Rôle |
|---|---|---|
| `--background` | `#09080c` | Fond global |
| `--surface` | `#100f0c` | Cartes, sections alternées |
| `--surface-2` | `#191610` | Surface tertiaire |
| `--foreground` | `#ede8e0` | Texte principal |
| `--muted` | `#857d74` | Texte secondaire |
| `--accent` | `#2e52b0` | Bleu nuit cuivré — CTAs, liens actifs |
| `--accent-dim` | `#223e90` | Hover bouton primaire |
| `--accent-bright` | `#4068c8` | Variante claire |
| `--gold` | `#c07830` | Cuivre — accents éditoriaux, titres |
| `--line` | `rgba(200,170,110,0.09)` | Bordures subtiles |

Usage Tailwind : `bg-accent`, `text-gold`, `border-line`, etc.

### Classes utilitaires clés

```css
.gold-text         /* dégradé cuivré sur texte — background-clip: text */
.heading-gradient  /* dégradé crème→cuivre sur les H2 de section */
.gold-border-top   /* bordure supérieure dégradée cuivrée */
.shimmer           /* animation de reflet lumineux */
.noise-overlay     /* grain de bruit en position fixed (z:1, opacity:0.035) */
```

### Typographie

`--font-display` → **Geist** (chargé via `next/font/local` dans `layout.tsx`).  
`.font-display` applique `font-weight: 800; letter-spacing: -0.02em`.

---

## Composants — notes techniques

### `hero.tsx`
- Vidéo fond : `/images/hero.mp4`
- Parallaxe : `useScroll` + `useTransform` + `useSpring` (motion/react)
- Reveal mot-par-mot : titre splitté en tokens, chaque mot = `motion.span` avec `opacity`/`y` stagué
- Les deux CTAs sont visibles sans scroll sur mobile (`text-sm sm:text-lg`, marges réduites)

### `calendar-card.tsx`
- Tilt 3D : `useMouseMove` → `rotateX`/`rotateY` via springs
- Glow suiveur : `radial-gradient` positionné avec `useTransform([glowX, glowY])`

### `galerie/page.tsx`
- CSS `columns` (pas de grid) pour éviter les espaces vides entre photos
- Ratios alternés : `aspect-[16/9]` / `aspect-[3/4]` / `aspect-[4/3]` selon `i % 5`
- `break-inside-avoid` + `mb-4` sur chaque item

### `reveal.tsx`
- `useInView` (motion/react) → animate entre état masqué et état visible
- Prop `delay` pour stagger des listes

---

## Données

Événements et témoignages en **données statiques** dans `src/lib/`.  
Pour ajouter un événement : éditer `calendar.ts`.

```ts
type CalendarEvent = {
  slug: string
  title: string
  dateLabel: string
  location: string
  category: string
  status?: string
  statusType: 'open' | 'limited' | 'closed' | 'past'
  image: string
  description: string
}
```

---

## Travaux en attente

| Priorité | Tâche | Notes |
|---|---|---|
| 🔴 | **Convertir les fichiers `.ARW`** | 5 fichiers Sony RAW dans `public/images/` — convertir en JPEG/WebP avec Lightroom, darktable ou ImageMagick |
| 🟡 | **Backend formulaire de contact** | Actuellement simulation client — intégrer Resend, Nodemailer ou Formspree |
| 🟡 | **Photos galerie réelles** | Les `.ARW` convertis alimenteront la galerie |
| 🟢 | **SEO — métadonnées par page** | `generateMetadata()` à compléter dans chaque `page.tsx` |
| 🟢 | **Données événements dynamiques** | Slugs statiques à brancher sur un CMS ou JSON externe si besoin |

### Fichiers .ARW présents

```
public/images/LM708660.ARW
public/images/LM709001.ARW
public/images/LM709003.ARW
public/images/LM709423.ARW
public/images/LM709454.ARW
```

---

## Reprendre avec Claude

Ouvrir Claude Code dans ce dossier (`take-your-gloves/`).  
Le design system est centralisé dans `globals.css`, les données dans `src/lib/`.

Suggestions pour la prochaine session :

```
Convertis les fichiers .ARW dans public/images/ en JPEG 2400px optimisés pour le web
Branche le formulaire de contact sur Resend (envoie à answeragencypro@gmail.com)
Complète les generateMetadata() dans chaque page pour le SEO
```
