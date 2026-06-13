# AGENTS.md

## What This Is

Portfolio website for Muthu Harisht. Next.js 15 (App Router) + TypeScript + Tailwind CSS 4 + Framer Motion + GSAP. Single-page app — all content on `app/page.tsx`.

## Quick Commands

```bash
npm ci && npm run build    # CI: type-check + build (what CI runs)
npm run dev                # Local dev server
npm run type-check         # tsc --noEmit
npm run lint               # next lint
```

No test framework exists. No test files exist. Do not add test scripts or expect tests to pass.

## Path Alias

`@/*` maps to project root (standard Next.js). Use `@/components/...`, `@/lib/...`, `@/data/...`.

## TypeScript

`tsconfig.json` has `strict: false`. No strict null checks. Code currently uses untyped patterns that depend on this — do not enable strict without auditing all files.

## Peer Deps

`.npmrc` sets `legacy-peer-deps=true` and `strict-peer-deps=false`. Peer dependency conflicts are expected and suppressed. Do not fix or investigate them.

## Content Architecture

- `data/*.ts` — typed data files (achievements, certifications, education, experience, hobbies, leadership, patents, personal, philosophy, projects, skills). These are what the UI reads.
- `data/achievements.ts` — achievements with optional `link` field (LinkedIn URLs for select entries like ideathon, SIH, PSG iTech Expo).
- `data/certifications.ts` — certifications with optional `score` field (e.g., Oracle Certified AI Associate).
- Resume > README for conflicting information. Never invent info.

## Design Rules (from skill/mistake.md)

- Mobile-first. Do not write desktop-first CSS.
- Validate images exist before placing. Handle 404 gracefully.
- No unnecessary animations. `prefers-reduced-motion` required.
- Responsive breakpoints: 320/375/390/768/1024/1440/1920px.
- Do not animate elements that cause layout shifts.

## Colors (tailwind.config.ts)

| Token | Hex |
|---|---|
| Primary | #00D4FF |
| Secondary | #8B5CF6 |
| Accent | #10B981 |
| Background | #050816 |
| Surface | #111827 |
| Text | #F9FAFB |

## Fonts

- Clash Display — headings
- Inter / Space Grotesk — body
- JetBrains Mono — terminal/code sections
- Satoshi — special elements

## CI/CD

- **CI** (`.github/workflows/ci.yml`): `npm ci` → `npm run type-check` → `npm run build`. Node 18 + 20 matrix. No lint step.
- **Deploy** (`.github/workflows/nextjs.yml`): GitHub Pages via `actions/deploy-pages@v4`. Static export (`output: 'export'` in next.config.js).
- `next.config.js` is CJS (`require`), not ESM.

## Python Sidecar

`pyproject.toml` + `main.py` exist for browser-use/playwright automation. Separate from the web app. Do not confuse with Next.js codebase.

## Utility

`lib/utils.ts` exports `cn()` using `clsx` + `tailwind-merge`. Use it for conditional class merging.

## Component Architecture

### Projects Section
- **`ProjectHorizonDeck.tsx`** — 4-column grid of project cards with `aspect-[4/3]` images
  - Click expands to full detailed overlay with banner image, `AnimatePresence` scale+opacity
  - Each project has `color` field for accent styling (border, hover glow)
  - `architecture` array renders as detail items in expanded view
  - Images: `/images/project/<name>.jpg` or `.png`, fallback to gradient placeholder
  - Status/patent badges display when present
  - Hover: scale + gradient overlay + project name at bottom

### Certifications Section
- **`Certifications.tsx`** — Auto-playing card carousel with side-arrow navigation
  - 4:3 aspect ratio cards, full-bleed image with gradient overlay at bottom
  - Auto-cycles every 2 seconds, pauses on hover
  - `ChevronLeft`/`ChevronRight` buttons outside card (`-left-5`/`-right-5`), clicking resets timer
  - Images: `/images/certificates/<filename>.jpeg` or `.jpg`, fallback to gradient placeholder
  - Shows name, provider, score (if present), and date at bottom of card

### About Section
- **`AnimatedAvatar.tsx`** — Animated avatar component with fallback strategies
  - Multiple fallback paths for image loading (primary, secondary, placeholder)
  - Uses `AnimatePresence` for smooth transitions between states
  - No hardcoded stats — all values come from `data/personal.ts`

### Artifact Marquee
- **`ArtifactMarquee.tsx`** — Horizontal scrolling marquee of project snapshot images
  - 6 images (`1.jpeg`–`6.jpeg`) in `public/images/`
  - Infinite loop via duplicated content, CSS `animation`
  - `pointer-events-none` on wrapper
  - Used between Achievements and Certifications sections

### Cursor
- **`CustomCursor.tsx`** — Outer ring + dot + trail, `pointer-events-none` on wrapper
  - Uses `will-change: transform` for GPU acceleration
  - `prefers-reduced-motion` respected (simplified rendering)

## Common Pitfalls

- `next.config.js` uses `outputFileTracingRoot` — do not change without testing `next build`.
- `tsconfig.json` has `"strict": false` — TypeScript will not catch many real bugs. Do not rely on the compiler for safety.
- No `.opencode.json` or `.cursorrules` exists — there is no agent-specific config beyond this file.
- All portfolio content renders in one page (`app/page.tsx`) via section components in `@/components/`.
- **`.next` cache must be cleaned** when encountering stale module errors (e.g. `__webpack_modules__[moduleId] is not a function`). Run: `rm -rf .next node_modules/.cache` then rebuild.
