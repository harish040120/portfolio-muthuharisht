# Design.md — Muthu Harish T Portfolio

## Title
Muthu Harish T — Premium AI Engineer Portfolio Design & Implementation Guide

## Vision
A cinematic, interactive portfolio that reads like a polished AI Operating System: focused, performance‑minded, and practical for hiring managers. The site uses smooth slide‑down section transitions, a custom blue cursor (dot + concentric ring), stacked project cards (no live demos), two clear experience boxes, separate certifications, boxed education, glowing achievement effects, floating blue stars, and resume download links in header and footer.

## Primary Goals
- Cleanly present projects, patents, achievements, and two experiences.
- Distinct, non‑filter skills listing (highlighted badges).
- Smooth, cohesive animations with accessible fallbacks.
- High Lighthouse scores (performance, accessibility, SEO).

## Identity
- Name: Muthu Harish T
- Location: Coimbatore, Tamil Nadu, India
- Roles: AI Engineer, System Builder, Problem Solver

## Color & Typography
- Palette: Primary #00D4FF (blue), Accent #8B5CF6 (purple), Surface #111827, Bg #050816, Text #F9FAFB.
- Fonts: Clash Display (headings), Inter / Space Grotesk (body), JetBrains Mono (terminal/mono).

## Technology Stack
- Core: Next.js (App Router) — SSR for SEO, file routing, and easy PDF serving.
- Styling: Tailwind CSS (utility + theming).
- Animations & Transitions: Framer Motion (page/section transitions, card stacks), Lenis for smooth scroll (optional), GSAP only if advanced timelines required.
- UI primitives: shadcn/ui or Radix UI (accessible dialogs, switches, forms).
- Canvas/Particles: lightweight Canvas for subtle floating blue stars (avoid full Three.js).
- Icons: Lucide / Simple Icons.
- Accessibility: aria attributes, prefers-reduced-motion support.
- Hosting: Vercel / Netlify.

## Global Interaction System
- Custom Cursor: Blue solid dot (6–10px) + concentric ring (~18–30px). Use pointer-events: none; hide native cursor on non-touch devices. Track mouse with requestAnimationFrame and smoothly interpolate positions. Cursor states: default, hover (ring grows & brighter), click (pulse). Provide CSS fallback (native cursor) and disable on touch devices.
- Floating Blue Stars: tiny blurred circles animated with CSS keyframes or Canvas (low FPS). Keep them subtle and low in number for perf.
- Slide‑down section transitions: use Framer Motion with initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}. Use staggerChildren for internal elements. Provide reduced-motion variants when prefers-reduced-motion is set.

## Navigation & Resume Links
- Top nav: Logo/Name (left), menu (center/left), Resume download (right, prominent CTA). The resume button uses <a href="/resume.pdf" download> to trigger direct download. Footer repeats the resume download link.

## Section Order (Final Flow)
1. Loading
2. Hero
3. Identity Reveal
4. About (Terminal)
5. Skills
6. Experience
7. Projects
8. Patents
9. Achievements
10. Artifact Marquee
11. Certifications
12. Build Philosophy
13. Education
14. Hobbies
15. Contact
16. Footer

## Detailed Section Specs

### 1) Loading
- Minimal loader: Animated "MH" or neural dot pulsing with blue glow.
- Duration: 600–900ms typical; if heavy assets load longer, show progressive states.
- Use CSS/Framer Motion for simple morphing. Provide skip for reduced motion.

### 2) Hero
- Left column: "Hi, I'm Muthu Harish T" (Clash Display), subtitle "AI Engineer", one-liner tagline, CTA buttons: "View Projects" (scroll) and "Download Resume" (download).
- Right column: Profile avatar with soft glow and orbiting tiny tech icons (decorative).
- Background: dark gradient + very subtle vignette + a few floating blue stars.
- Animation: Hero components slide up on load; avatar has gentle scale/float.

### 3) Identity Reveal
- Small glass panel revealed as user scrolls; includes 2–3 line intro and a quick facts row (location, roles).
- Animate: slide down from hero with Framer Motion.

### 4) About — Terminal (Important: include commands)
- Terminal UI (mono font) with typed command simulation. Commands to include:
  - whoami — prints a 2–3 sentence intro of Muthu Harish T.
  - skills — brief one-line summary then prompt to view Skills section.
  - projects — one-liner "See Projects below (stacked cards)".
  - resume — prints "Download: /resume.pdf" and includes a clickable download link.
  - hobbies — lists hobbies succinctly.
  - experience — prints compact summary "2 professional experiences — see Experience section".
- Use a small JS typing effect component. Provide aria-live region for screen readers.

### 5) Skills — highlighted list (no filters)
- Title: "Skills & Tools".
- Layout: 2–3 responsive columns of glass cards by cluster:
  - Languages & Core (Java, Python)
  - AI & ML (LangChain, RAG, Computer Vision)
  - Cloud & DB (Google Cloud, PostgreSQL)
  - Tools (Git, n8n, Linux)
- Each skill as a pill with small icon and subtle gradient; on hover, pill lifts and shows a micro‑tooltip with 1–2 skill details.
- Do NOT implement as filter or tag cloud.
- Animation: cards stagger in with slight horizontal offsets. Use accessible focus styles.

### 6) Experience — exactly two boxed cards
- Present exactly two experience cards. Each card contains:
  - Role (bold), Organization, Dates, Location (if applicable)
  - 4–6 bullet points: responsibilities, technologies used, measurable outcomes or results.
- Visual: large rounded glass box, left colored stripe, right content.
- Transition: slide from previous section with fade; cards can have a subtle float-in.

### 7) Projects — 4-column image grid (No live demos)
- 4-column responsive grid of project cards with `aspect-[4/3]` images:
  - Each card shows image with gradient overlay and project name at bottom
  - Hover: scale effect + gradient overlay intensifies
  - Click expands to full detailed overlay with banner image, `AnimatePresence` scale+opacity
  - Each project has `color` field for accent styling (border, hover glow)
  - `architecture` array renders as detail items in expanded view
  - Images: `/images/project/<name>.jpg` or `.png`, fallback to gradient placeholder
  - Status/patent badges display when present
  - No "Live Demo" anywhere — only GitHub "Source" links

### 8) Patents
- Cards for each patent with Title, short abstract (1–2 sentences), status (Filed/Granted), relevant tags.
- Hover: gentle glow and elevation.

### 9) Achievements
- Grid of achievement tiles; emphasize important ones with a highlighted tile.
- Hover effect: glowing border, inner light sweep, and slight scale. Use CSS + Framer Motion for subtlety.

### 10) Certifications — auto-playing card carousel
- Auto-playing card carousel with side-arrow navigation
  - 4:3 aspect ratio cards, full-bleed image with gradient overlay at bottom
  - Auto-cycles every 2 seconds, pauses on hover
  - `ChevronLeft`/`ChevronRight` buttons outside card (`-left-5`/`-right-5`), clicking resets timer
  - Images: `/images/certificates/<filename>.jpeg` or `.jpg`, fallback to gradient placeholder
  - Shows name, provider, score (if present), and date at bottom of card

### 11) Build Philosophy
- Short step flow: Problem → Research → Prototype → Iterate → Deploy.
- Each step is clickable/hoverable; expand reveals a 2–3 line note and references a project as an example.

### 12) Education
- Boxed education cards (not timeline). Each card:
  - Degree / Course
  - Institution
  - Years
  - CGPA / Percentage
  - 1–2 highlights or relevant coursework
- Animations: fade up; keep accessible.

### 13) Hobbies
- Small floating glass cards for hobbies with icons and 1–2 lines. Letterboxd link included.

### 14) Contact
- Glass contact form + social links (email, GitHub, LinkedIn).
- Resume download button here too.

### 15) Footer
- Short quote (optional) and repeat resume download. Minimal links and copyright notice.

## Editing Rules
- Remove Research Explorer and System Architecture sections entirely from flow and content.
- Do not include "Live Demo" anywhere for projects.
- Keep projects' GitHub links but only as "Source" links.

## Author
- Document author: Muthu Harish T
