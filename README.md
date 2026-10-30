# Tejas Jagdale — Portfolio

A production-ready personal portfolio for an AI engineer and backend developer, built with Next.js 16, React 19, Three.js, GSAP, and Motion.

The site combines an editorial layout with an interactive WebGL agent mesh, scroll-driven animation, and a content layer that keeps every visible string in one JSON file.

## Stack

- Next.js 16.4 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Three.js, React Three Fiber, and Drei
- GSAP with ScrollTrigger
- Motion for UI transitions
- Geist, Instrument Serif, and JetBrains Mono
- ESLint and strict TypeScript

## Local development

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev        # Start the development server
npm run build      # Create a production build
npm run start      # Serve the production build
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript without emitting
npm run check      # Lint, type-check, and build
```

## Content

All portfolio copy lives in [`src/data/data.json`](src/data/data.json). This includes:

- Site identity, contact details, social links, and SEO copy
- Navigation, hero content, metrics, and 3D scene labels
- Section headings and descriptions
- About copy, principles, and facts
- Skills categories
- Experience entries and highlights
- Projects, links, notes, and system-map labels
- Education entries
- Contact and footer copy

The JSON is typed through [`src/lib/types.ts`](src/lib/types.ts) and imported in [`src/lib/data.ts`](src/lib/data.ts). Components receive data through props where practical, so there are no duplicated portfolio strings in the UI.

The current copy is written for the resume data supplied during the build. The experience entry ends in September 2026, so the profile uses “Most recently” rather than “Currently.”

### Adding a project

Add an entry to `projects.items` in `src/data/data.json`. Each project needs:

- `kind`: `network` or `pipeline`
- `visual.labels`: the labels for the generated SVG system map
- `highlights`: resume-supported system notes
- `links`: URLs and accessible labels

No image assets are required. The project diagrams are original SVG system maps generated from the label arrays.

## Architecture

```text
src/
  app/
    globals.css            Design tokens, typography, motion, fallbacks
    layout.tsx             Fonts, metadata, viewport, skip link
    page.tsx               Page composition and Person JSON-LD
    robots.ts              robots.txt
    sitemap.ts             sitemap.xml
    manifest.ts            Web app manifest
    opengraph-image.tsx    Generated Open Graph card
    twitter-image.tsx      Generated Twitter card
  components/
    animations/            GSAP reveal and scroll orchestration
    layout/                Fixed header, mobile navigation, footer
    sections/              Page sections and project visuals
    ui/                    Shared buttons, links, icons, headings
    3d/                    R3F scene, WebGL detection, fallback
  data/data.json           Single source of portfolio content
  lib/                     Types, data access, shared utilities
```

### 3D hero

`AgentScene.tsx` renders a central orchestration core with orbiting capability nodes, connecting lines, a particle field, and projected labels. Scroll progress and pointer position drive the scene. The canvas is paused when it leaves the viewport or the tab is hidden.

`HeroCanvas.tsx` handles:

- WebGL capability detection
- Client-only dynamic loading
- A static SVG fallback when WebGL is unavailable or the scene fails
- Reduced-motion mode
- An accessible text description of the visual

### Animation

GSAP and ScrollTrigger handle section reveals, the experience timeline, parallax, and scene movement. Motion handles the mobile navigation, skill-panel transitions, project hover states, and magnetic CTA behaviour.

All non-essential animation is disabled under `prefers-reduced-motion`. Content remains visible when JavaScript or animation is unavailable.

### Accessibility

- Semantic landmarks and a visible-on-focus skip link
- One `h1`, labelled sections, and ordered heading levels
- Keyboard-accessible mobile dialog with focus trap, Escape close, and focus restoration
- Accessible tabs-style skill explorer with arrow-key support
- Visible focus styles
- External-link safety with `rel="noopener noreferrer"`
- WCAG AA text contrast
- Reduced-motion support
- Static 3D fallback and accessible scene description

### SEO

The site includes canonical metadata, Open Graph and Twitter cards, JSON-LD `Person` data, `robots.txt`, `sitemap.xml`, and a web app manifest. Update `site.website` in the JSON if the production domain changes; canonical URLs, sitemap entries, and the manifest follow that value.

## Deployment

### Vercel

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Use the default Next.js build settings.
4. No environment variables are required.

### Node server

```bash
npm ci
npm run build
npm run start
```

The default port is `3000`. Set `PORT` to override it.

## Verification

The production build was checked with:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Browser smoke tests at 320, 390, 768, 1024, 1440, and 1920 px
- Checks for horizontal overflow, broken hash links, and console errors
- Mobile menu focus management and Escape close
- Copy-email interaction
- Reduced-motion rendering
- WebGL-disabled fallback
- Axe WCAG A/AA scan

The generated social cards and metadata routes are available at `/opengraph-image`, `/twitter-image`, `/robots.txt`, `/sitemap.xml`, and `/manifest.webmanifest`.
