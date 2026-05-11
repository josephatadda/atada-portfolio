# Atada Portfolio — Handoff Documentation

> Joseph Atada's product design portfolio. Built with React + Vite + Tailwind CSS v4 + Framer Motion. Originally scaffolded from Figma via Figma Make, then hand-refined into a production codebase.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Routing](#routing)
5. [Pages](#pages)
6. [Shared Components](#shared-components)
7. [Design System](#design-system)
8. [Figma Imports](#figma-imports)
9. [Adding Content](#adding-content)
10. [Architecture Decisions](#architecture-decisions)
11. [Known Limitations](#known-limitations)

---

## Quick Start

```bash
npm install
npm run dev        # Starts Vite dev server (default port 5173)
npm run build      # Production build to dist/
```

No environment variables required. No backend. Static SPA.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 18.3.1 |
| Build | Vite | 6.3.5 |
| Styling | Tailwind CSS | 4.1.12 |
| Animation | Framer Motion | 12.38.0 |
| Routing | React Router DOM | 7.15.0 |
| UI Primitives | Radix UI | Various |
| Component Library | shadcn/ui | (vendored in `src/app/components/ui/`) |

### Notable Dependencies

- **`framer-motion`** — Page transitions, scroll-reveal, carousel slides, custom cursor, lightbox
- **`tw-animate-css`** — Tailwind animation utilities for shadcn
- **`embla-carousel-react`** — Carousel engine (used by shadcn carousel component)
- **`react-router-dom`** — Client-side routing, `<Link>`, `useParams`
- **`sonner`** — Toast notifications (shadcn integration)

### Dev Dependencies

- **`@tailwindcss/vite`** — Tailwind v4 Vite plugin (replaces PostCSS)
- **`@vitejs/plugin-react`** — React fast refresh

---

## Project Structure

```
src/
├── main.tsx                          # App entry point
├── app/
│   ├── App.tsx                       # Router definition
│   ├── data/
│   │   └── projects.ts              # Project registry (slug → component path)
│   ├── pages/
│   │   ├── HomePage.tsx              # / — lazy-loads Frame427321895
│   │   ├── WorksPage.tsx             # /works — filterable project grid
│   │   ├── AboutPage.tsx             # /about — lazy-loads Frame427321899
│   │   ├── PlaygroundPage.tsx        # /playground — experiment grid
│   │   ├── ProjectDetailPage.tsx     # /project/:slug — route dispatcher
│   │   └── CompstackProjectPage.tsx  # Compstack case study (standalone, not lazy-loaded)
│   └── components/
│       ├── SharedNavbar.tsx           # Global navigation
│       ├── SharedFooter.tsx           # Global footer
│       ├── Container.tsx              # 980px max-width wrapper
│       ├── ScrollReveal.tsx           # Scroll-triggered fade-up animation
│       ├── SectionCarousel.tsx        # Image carousel with dot pagination
│       ├── Lightbox.tsx               # Full-screen image viewer
│       ├── CustomCursor.tsx           # Custom dot + ring cursor
│       ├── figma/
│       │   └── ImageWithFallback.tsx  # Image with error state
│       └── ui/                        # 40+ shadcn/ui components (vendored)
├── imports/                           # Figma Make exports (auto-generated, then hand-edited)
│   ├── Frame427321895/                # Homepage (hero + project cards + playground preview)
│   ├── Frame427321896/                # Hero portrait image component
│   ├── Frame427321899/                # About page (36K lines — largest file)
│   ├── Frame427321900-1/              # Compstack case study (Figma version)
│   ├── Frame427321900/                # Asset-only folder (images for Compstack)
│   └── catlog-ai/                     # Catlog AI case study page
└── styles/
    ├── index.css                      # Import aggregator
    ├── fonts.css                      # @font-face declarations
    ├── tailwind.css                   # Tailwind v4 config
    ├── theme.css                      # Design tokens + base styles
    └── globals.css                    # (empty)
```

---

## Routing

Defined in `src/app/App.tsx`:

| Route | Page Component | Load Strategy |
|---|---|---|
| `/` | `HomePage` | Lazy (`React.lazy` → `Frame427321895`) |
| `/works` | `WorksPage` | Direct import |
| `/about` | `AboutPage` | Lazy (`React.lazy` → `Frame427321899`) |
| `/playground` | `PlaygroundPage` | Direct import |
| `/project/:slug` | `ProjectDetailPage` | Lazy per-slug dispatch |

### Project Detail Routing

`ProjectDetailPage` acts as a dispatcher — it reads `:slug` from the URL and lazy-loads the correct case study:

| Slug | Component | Source |
|---|---|---|
| `compstack` | `Frame427321900` | `src/imports/Frame427321900-1/` |
| `catlog-ai` | `CatlogAI` | `src/imports/catlog-ai/` |
| *(anything else)* | 404 "Project Not Found" | Inline fallback |

`CustomCursor` is rendered at the router level (wraps all pages).

---

## Pages

### HomePage (`/`)

- **Source**: Lazy-loads `src/imports/Frame427321895/Frame427321895.tsx` (1,389 lines)
- **Sections**: Hero with floating card stack → "Selected Projects" grid (5 project cards) → Dark "About" section → Playground preview grid → SharedFooter
- **Container**: `max-w-[980px] mx-auto` (used throughout, matching the `Container` component)
- **Animations**: Staggered hero entrance, scroll-reveal on cards, floating stickers with spring physics
- **Has its own navbar** (`Navbar` component inside the file, not `SharedNavbar`)

### Works Page (`/works`)

- **Source**: `src/app/pages/WorksPage.tsx`
- **Layout**: SharedNavbar → Header ("Selected Projects" + "24'–26'") → Filter tabs → Project cards → SharedFooter
- **Filter**: Client-side `useState` filter by tag (All / Mobile / Web)
- **Cards**: Vertical stack, `gap-[48px]`, each card = 714px image + title/description/tag pills
- **Data**: 3 projects defined inline in `PROJECTS` array
- **Links**: Compstack → `/project/compstack`, Catlog AI → `/project/catlog-ai`, Catlog Website → Coming Soon badge

### About Page (`/about`)

- **Source**: Lazy-loads `src/imports/Frame427321899/Frame427321899.tsx` (36,375 lines — largest file)
- **Content**: Bio, experience timeline, skills, tools, process breakdown
- **Note**: This is a Figma Make export, minimally hand-edited

### Playground Page (`/playground`)

- **Source**: `src/app/pages/PlaygroundPage.tsx`
- **Layout**: SharedNavbar → Header ("Playground" + subtitle) → 2-row asymmetric image grid → SharedFooter
- **Grid**: Row 1 = `547px + flex-1`, Row 2 = `flex-1 + 557px`, all `h-[496px]`
- **Labels**: Overlaid at bottom-left of each cell (white text + drop-shadow)
- **Items**: 4 placeholder entries (UI Components, Motion Experiments, Typography Play, Brand Concepts)

### Compstack Case Study (`/project/compstack`)

- **Source**: Loaded via `ProjectDetailPage` → lazy `Frame427321900` from `src/imports/Frame427321900-1/`
- **There is also** `src/app/pages/CompstackProjectPage.tsx` — a hand-crafted version with cleaner code, but it is **not wired into routing** (the route uses the Figma import instead)
- **Layout**: SharedNavbar → Back link → Meta tags → H1 → Hero image → Meta strip (Role/Team/Timeline) → Content sections → SharedFooter
- **Sidebar**: Sticky TOC navigation, 150px wide
- **Canonical reference**: This page's design standards are documented in the memory system as the template for all future case studies

### Catlog AI Case Study (`/project/catlog-ai`)

- **Source**: Loaded via `ProjectDetailPage` → lazy `CatlogAI` from `src/imports/catlog-ai/`
- **Structure**: Similar to Compstack — SharedNavbar/Footer, sticky side nav, content sections
- **Lines**: 648 lines (hand-crafted, not a raw Figma export)

---

## Shared Components

### SharedNavbar (`src/app/components/SharedNavbar.tsx`)

- Fixed 4-item nav: Home, Works, About, Playground
- Numbered labels (`01/`, `02/`, etc.) in `text-grey-7 text-[10px]`
- Resume download button (pill, `bg-charcoal`)
- Mobile: Hamburger menu → slide-down drawer
- Uses `Container` for max-width constraint
- Framer Motion entrance animation (fade down)

### SharedFooter (`src/app/components/SharedFooter.tsx`)

- Dark background (`bg-dark-bg` / `#111111`)
- Left: "Let's work together" heading (Instrument Serif 56px) + email link + "About Me" button
- Right: Nav links (same 4 items) + social icons (LinkedIn, Dribbble, X)
- Bottom: © 2025 + decorative bar chart + "Crafted with Claude Code x Figma"

### Container (`src/app/components/Container.tsx`)

```tsx
<div className="w-full max-w-[980px] mx-auto px-6">{children}</div>
```

Used by SharedNavbar, SharedFooter, and some content sections. The homepage and case study pages use their own width constraints (980px or 1440px).

### ScrollReveal (`src/app/components/ScrollReveal.tsx`)

Wraps children in a Framer Motion `<motion.div>` that fades up (`y: 16 → 0`, `opacity: 0 → 1`) when entering the viewport. Fires once. Accepts optional `delay` prop.

### SectionCarousel (`src/app/components/SectionCarousel.tsx`)

Interactive image carousel for case study feature sections.

- **Props**: `images: string[]`, `title: string`
- **Behavior**: Single image visible at a time, prev/next arrows + clickable dot indicators
- **Animation**: Framer Motion `AnimatePresence`, fade + 12px x-translate, 250ms
- **Click**: Opens Lightbox on image click (`cursor-zoom-in`)

### Lightbox (`src/app/components/Lightbox.tsx`)

Full-screen image overlay triggered by SectionCarousel.

- **Props**: `images`, `index` (-1 = closed), `onClose`, `onNext`, `onPrev`
- **Backdrop**: `bg-black/75 backdrop-blur-sm`
- **Image**: `max-w-[88vw] max-h-[86vh]`, scale-in animation
- **Controls**: Close (top-right), Prev/Next (sides), counter (bottom-center)
- **Keyboard**: Escape, ←, → — locks body scroll while open
- **z-index**: `9000`

### CustomCursor (`src/app/components/CustomCursor.tsx`)

Custom cursor that replaces the native cursor on pointer devices.

- **Dot**: 5px charcoal circle, follows mouse tightly (no spring)
- **Ring**: 24px charcoal border circle, follows with spring lag (`damping: 28, stiffness: 350`)
- **Hover state**: Dot grows to 6px, ring grows to 36px + increases opacity
- **Hover targets**: `a`, `button`, `[role='button']`, `[data-name='Button']`
- **Touch devices**: Disabled via `(pointer: coarse)` media query
- **z-index**: Dot = 9999, Ring = 9998

### shadcn/ui Components (`src/app/components/ui/`)

40+ vendored Radix + Tailwind components. Standard shadcn/ui installation. Key ones actively used:

- `button.tsx`, `card.tsx`, `accordion.tsx`, `tabs.tsx`, `dialog.tsx`, `separator.tsx`
- `utils.ts` — exports `cn()` (clsx + tailwind-merge)
- `use-mobile.ts` — `useIsMobile()` hook (768px breakpoint)

---

## Design System

### Fonts

| Token | Family | Source | Usage |
|---|---|---|---|
| `font-display` | Instrument Serif | Google Fonts | Headings (h1–h3), large display text |
| `font-sans` | Geist | unpkg CDN (variable) | Body text, labels, buttons, nav |
| `font-mono` | Geist Mono | unpkg CDN (variable) | Footer details, code-style text |
| *(legacy)* | Inter | Google Fonts | Nav items (inline `fontFamily` override in SharedNavbar) |

### Color Palette

| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| `--color-canvas` | `#f7f6f1` | `bg-canvas` | Page background |
| `--color-charcoal` | `#222222` | `text-charcoal` | Primary text, buttons, cursor |
| `--color-black` | `#000000` | `text-black` | H1, H2 headings |
| `--color-grey-10` | `#404040` | `text-grey-10` | Bold labels, meta headings |
| `--color-grey-9` | `#5e5e5e` | `text-grey-9` | Body text |
| `--color-grey-8` | `#7c7c7c` | `text-grey-8` | Descriptions, inactive nav |
| `--color-grey-7` | `#ababab` | `text-grey-7` | Nav numbers, subtle elements |
| `--color-grey-4` | `#e5e5e5` | `bg-grey-4` | Inactive dots |
| `--color-grey-3` | `#eaeaea` | `bg-grey-3` | Button backgrounds, pills |
| `--color-accent` | `#e96b24` | `text-accent` / `bg-accent` | Orange accent (dots, active states) |
| `--color-dark-bg` | `#111111` | `bg-dark-bg` | Footer, dark sections |
| `--color-white` | `#ffffff` | `bg-white` | Tag pills, cards |

### Spacing Scale (CSS Custom Properties)

```
--3xs: 4px    --2xs: 6px    --xs: 8px     --sm: 10px
--reg: 12px   --md: 14px    --lg: 16px    --xl: 20px
--2xl: 24px   --3xl: 32px   --4xl: 40px   --5xl: 48px
--6xl: 64px   --7xl: 80px   --8xl: 96px   --9xl: 128px
--10xl: 160px
```

Used as `gap-[var(--xl)]`, `px-[var(--lg)]`, etc. throughout the codebase.

### Typography Scale

| Element | Font | Size | Tracking | Weight | Color |
|---|---|---|---|---|---|
| Page title (H1) | Instrument Serif | 56px | -2px | 400 | black |
| Section heading (H2) | Instrument Serif | 36px | -0.72px | 400 | black |
| Subsection (H3) | Instrument Serif | 32px | -0.9px | 400 | charcoal |
| Homepage section title | Instrument Serif | 48px | -1.5px | 400 | black |
| Body text | Geist | 17px | -0.5px | 400 | grey-9 |
| Body subtitle | Geist | 18px | -0.5px | 400 | grey-9 |
| Bold label | Geist | 17px | -0.5px | 500 | grey-10 |
| Meta label | Geist | 16px | -0.3px | 500 | grey-10 |
| Meta value | Geist | 16px | -0.3px | 400 | grey-9 |
| Nav item | Inter | 14px | -0.2px | 500 | grey-9 |
| Tag pill | Geist | 14px | -0.2px | 500 | grey-10 |

### Animation Tokens

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);      /* Primary easing — most animations */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);   /* Symmetric transitions */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);    /* Drawer/panel slides */
```

### Animation Patterns

| Pattern | Duration | Easing | Usage |
|---|---|---|---|
| Scroll reveal | 550ms | `ease-out` | `ScrollReveal` component |
| Carousel slide | 250ms | `ease-out` | `SectionCarousel` image transition |
| Lightbox entry | 280ms | `ease-out` | Scale 0.95→1 + fade |
| Hover scale | 500ms | `ease-out` | Project card images (`scale-[1.02]`) |
| Button press | 160ms | `ease-out` | `scale(0.97)` on `:active` |
| Navbar entrance | 400ms | `ease-out` | Fade down on mount |

### Radii

- `--full-radius: 999px` — Pill buttons, tag pills
- `rounded-[24px]` — Project card images, playground grid cells
- `rounded-[16px]` / `rounded-[var(--lg)]` — Case study content images
- `rounded-[12px]` — Lightbox image, hero portrait

---

## Figma Imports

The `src/imports/` directory contains components exported from Figma via Figma Make. These are large auto-generated files with absolute positioning and inline styles, then selectively hand-edited.

| Folder | Lines | Used By | Content |
|---|---|---|---|
| `Frame427321895/` | 1,389 | HomePage | Hero, project cards, playground preview, about teaser |
| `Frame427321896/` | 37 | Hero portrait | Single image component |
| `Frame427321899/` | 36,375 | AboutPage | Full about page — bio, experience, skills |
| `Frame427321900-1/` | 1,072 | ProjectDetailPage (compstack) | Compstack case study with sticky nav |
| `Frame427321900/` | — | Asset-only | PNG images for Compstack |
| `catlog-ai/` | 648 | ProjectDetailPage (catlog-ai) | Catlog AI case study (hand-crafted) |

### Image Assets

48 total image files across `src/imports/`. Named by content hash (e.g., `f45fc1b82a7e...png`). Key images:

| File (hash prefix) | Size | Content |
|---|---|---|
| `f45fc1b8...` | 2.8MB | Compstack dashboard cover |
| `cbe6561e...` | 1.9MB | Catlog AI / 3D promotional image |
| `0d63c93f...` | 1.0MB | Catlog website screenshot |
| `d597c2ea...` | 4.3MB | Retro device / UI component shot |
| `8b17aa1b...` | 5.4MB | About page hero/portrait |
| `paper-texture.png` | 3.2MB | Homepage hero background texture |

---

## Adding Content

### Adding a New Case Study

1. **Create the page component** in `src/imports/` or `src/app/pages/`:
   - Follow the Compstack pattern: SharedNavbar → Back link → Meta tags → H1 → Hero → Sections → SharedFooter
   - Reference `CompstackProjectPage.tsx` for the canonical hand-crafted pattern
   - Or use Figma Make to export and hand-edit

2. **Register the route** in `src/app/pages/ProjectDetailPage.tsx`:
   ```tsx
   const NewProjectPage = lazy(() => import("../../imports/new-project/NewProject"));
   
   // Inside the component, add:
   if (slug === "new-project") {
     return <Suspense fallback={<LoadingFallback />}><NewProjectPage /></Suspense>;
   }
   ```

3. **Add the card to the Works page** in `src/app/pages/WorksPage.tsx`:
   ```ts
   {
     title: "Project Name",
     description: "One-line summary",
     image: importedImage,
     tags: ["Mobile"],      // "Mobile" | "Web" — used for filtering
     year: "2025",
     slug: "new-project",   // Must match the route slug. Omit for "Coming Soon"
   }
   ```

4. **Optionally add to homepage** by editing `src/imports/Frame427321895/Frame427321895.tsx` (add a new `<ScrollReveal><FrameNN /></ScrollReveal>` to `Frame23`).

### Adding a Playground Item

Edit the `ITEMS` array in `src/app/pages/PlaygroundPage.tsx`. Import a new image and add an entry. The grid is currently hardcoded to 2×2 — extending to more rows requires duplicating the `<ScrollReveal>` row block.

### Compstack Case Study Design Standards

The Compstack page is the **canonical reference** for all case study pages. Key specs:

- **Page width**: 1440px centered, `px-[240px]`
- **Two-column layout**: 150px sticky TOC + flex-1 article, `gap-[var(--7xl)]`
- **Section spacing**: 40px between major sections, 16px heading→body, 8px between paragraphs
- **Image containers**: `rounded-[var(--lg)]` with `aspectRatio: "4096/2852"` (standard), or `rounded-[var(--2xl)] h-[492px]` (tall atmospheric)
- **Ordered lists**: `list-decimal pl-[25px] gap-[var(--2xs)]`
- **Meta strip**: 3-column row (Role / Team / Timeline) with label + value

Full specification is maintained in the project memory system at `.claude/projects/.../memory/project_compstack_design_standards.md`.

---

## Architecture Decisions

### Why Two Compstack Files?

- `src/imports/Frame427321900-1/Frame427321900.tsx` — The Figma Make export, used in production routing
- `src/app/pages/CompstackProjectPage.tsx` — A cleaner hand-crafted version with reusable components (`H2`, `H3`, `Body`, `CaseSection`), Figma asset URLs for images. **Not routed.** Exists as a reference implementation and design spec.

### Why Not Use `Container` Everywhere?

The `Container` component constrains to 980px. Case study pages use 1440px with 240px padding (resulting in ~960px content width with a sidebar). The homepage also uses 980px but manages its own `max-w-[980px]` inline. This inconsistency comes from the Figma import process — the homepage was exported as a monolithic component.

### Lazy Loading Strategy

Large Figma imports (homepage = 1,389 lines, about page = 36,375 lines) are lazy-loaded via `React.lazy` with a shared spinner fallback. The Works and Playground pages are small enough to be directly imported.

### Tailwind v4 Configuration

Tailwind v4 uses `@import 'tailwindcss'` in CSS (no `tailwind.config.js`). Custom design tokens are defined as CSS custom properties in `theme.css` and mapped to Tailwind via `@theme inline { }`. The `source(none)` directive in `tailwind.css` with an explicit `@source` path controls which files Tailwind scans.

### shadcn/ui Components

Vendored (not installed via CLI). Located in `src/app/components/ui/`. Most are unused — they were bulk-added during setup. Active ones include button, card, accordion, tabs, dialog.

---

## Known Limitations

1. **Figma asset URLs expire** — `CompstackProjectPage.tsx` uses `figma.com/api/mcp/asset/...` URLs that expire in ~7 days. The routed version (`Frame427321900`) uses local images.

2. **About page is very large** — `Frame427321899.tsx` is 36K lines (auto-generated from Figma). It works but is slow to edit and hard to maintain. Consider rewriting it as a hand-crafted page.

3. **No responsive design on case study pages** — The Compstack page uses fixed `px-[240px]` and `w-[1440px]`. It breaks on tablets and mobile. The Works and Playground pages handle responsive via the Container pattern, but the case study content area does not.

4. **Image file sizes** — Several images exceed 2MB. Consider running through an image optimizer before deployment.

5. **No deployment config** — No Vercel/Netlify/GitHub Actions config exists. The project builds to `dist/` via `vite build` and can be deployed as a static SPA. Needs SPA fallback routing configured on the host (all paths → `index.html`).

6. **`projects.ts` data file is incomplete** — `src/app/data/projects.ts` only lists Compstack and is not used by the routing system (which uses hardcoded slug checks). Consider consolidating.

7. **No SEO / meta tags** — No `<title>`, `<meta description>`, or Open Graph tags. Consider adding `react-helmet-async` or a Vite plugin.

8. **Font loading** — Fonts are loaded via external CDNs (Google Fonts, unpkg). Consider self-hosting for reliability and performance.
