# Design System — Muthu Harish T Portfolio

## Color Palette

### Core Colors (from `tailwind.config.ts`)
| Token | CSS Variable | Hex | Usage |
|-------|--------------|-----|-------|
| Primary | `--color-primary` | `#00D4FF` | CTAs, links, accents, glowing effects |
| Secondary | `--color-secondary` | `#8B5CF6` | Gradients, skill badges, secondary actions |
| Accent | `--color-accent` | `#10B981` | Success states, positive indicators |
| Background | `--color-background` | `#050816` | Page background, deep space feel |
| Surface | `--color-surface` | `#111827` | Cards, elevated surfaces |
| Text | `--color-text` | `#F9FAFB` | Primary text, headings |

### Extended Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Muted | `#1F2937` | Subtle backgrounds, borders |
| Border | `#374151` | Card borders, dividers |
| Text Muted | `#9CA3AF` | Secondary text, labels |

### Gradient Combos
```css
/* Primary gradient (headings, CTAs) */
linear-gradient(135deg, #00D4FF, #8B5CF6)

/* Surface gradient (cards) */
linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))

/* Glow effect */
0 0 30px rgba(0, 212, 255, 0.3)
```

---

## Typography

### Font Stack
| Font | Variable | Weights | Usage |
|------|----------|---------|-------|
| Clash Display | `--font-clash` | 400-700 | Headings (h1-h6), hero text |
| Inter | `--font-inter` | 400-600 | Body text, paragraphs, descriptions |
| Space Grotesk | `--font-space` | 400-600 | UI labels, buttons, navigation |
| JetBrains Mono | `--font-jetbrains` | 400 | Code blocks, technical elements |

### Type Scale
```css
/* Mobile-first sizing */
hero-title:    3rem / 3.5rem   (48px / 56px)   /* text-5xl */
section-title: 2rem / 2.5rem   (32px / 40px)   /* text-3xl → md:text-5xl */
card-title:    1.25rem / 1.5rem (20px / 24px)  /* text-xl */
body:          1rem / 1.5rem   (16px / 24px)   /* text-base */
caption:       0.875rem / 1.25rem (14px / 20px) /* text-sm */
micro:         0.75rem / 1rem  (12px / 16px)   /* text-xs */
```

### Line Heights
- Headings: `leading-tight` (1.25) or `leading-snug` (1.375)
- Body: `leading-relaxed` (1.625)
- Code: `leading-loose` (2)

### Letter Spacing
- Labels/Navigation: `tracking-widest` (0.1em) — uppercase
- Body: `tracking-normal`
- Hero name: `tracking-tight` (-0.025em)

---

## Spacing System

### Base Scale (Tailwind)
```
0.5  → 2px     (p-0.5, m-0.5)
1    → 4px     (p-1, m-1)
1.5  → 6px
2    → 8px     (p-2, m-2)
3    → 12px
4    → 16px    (p-4, m-4)
5    → 20px
6    → 24px
8    → 32px
10   → 40px
12   → 48px
16   → 64px
20   → 80px
24   → 96px
```

### Section Spacing
```css
/* Between sections */
section { padding: 6rem 0; }  /* py-24 */

/* Section container */
.section-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;           /* px-6 mobile */
}
@media (min-width: 768px) {
  .section-container { padding: 0 2rem; }  /* px-8 */
}

/* Between section title and content */
.section-title → content: margin-top: 3rem;  /* mt-12 */

/* Between cards in grid */
gap: 1.5rem;  /* gap-6 → md:gap-8 */
```

### Component Spacing
```css
/* Card padding */
.card { padding: 1.5rem; }           /* p-6 mobile */
@media (min-width: 768px) {
  .card { padding: 2rem; }           /* md:p-8 */
}

/* Button padding */
.btn-sm { padding: 0.5rem 1rem; }    /* py-2 px-4 */
.btn-md { padding: 0.75rem 1.5rem; } /* py-3 px-6 */
.btn-lg { padding: 1rem 2rem; }      /* py-4 px-8 */

/* Input padding */
input, textarea { padding: 0.75rem 1rem; }  /* py-3 px-4 */
```

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 4px | Subtle rounding |
| `rounded` | 8px | Inputs, small cards |
| `rounded-lg` | 12px | Cards, modals |
| `rounded-xl` | 16px | Large cards, hero sections |
| `rounded-full` | 9999px | Buttons, badges, avatars |

---

## Shadows & Glows

### Box Shadows
```css
/* Subtle elevation */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

/* Card hover */
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);

/* Primary glow (buttons, CTAs) */
box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);

/* Secondary glow */
box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);

/* Subtle glow */
box-shadow: 0 0 15px rgba(0, 212, 255, 0.1);
```

### Text Shadows (Headings)
```css
text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
```

---

## Glass Morphism

### Base Glass Effect
```css
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}
```

### Glass Card
```css
.glass-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.glass-card:hover {
  border-color: rgba(0, 212, 255, 0.2);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.1);
  transform: translateY(-2px);
}
```

---

## Animations (Framer Motion)

### Page Load Sequence
```typescript
// 1. Loading screen (z-100, full viewport)
//    - SVG "MH" logo with orbiting dots
//    - Progress bar with gradient fill
//    - Sequential messages: "Initializing AI Systems" → "Launching Portfolio"
//    - Skip button available

// 2. Hero entrance (staggered)
hero-title:    { opacity: 0, y: 40 } → { opacity: 1, y: 0 }  duration: 0.8s
hero-subtitle: { opacity: 0, y: 10 } → { opacity: 1, y: 0 }  delay: 0.2s
hero-tagline:  { opacity: 0, y: 20 } → { opacity: 1, y: 0 }  delay: 0.3s
hero-cta:      { opacity: 0, y: 20 } → { opacity: 1, y: 0 }  delay: 0.5s
hero-icons:    { opacity: 0 }       → { opacity: 1 }          delay: 0.6s
hero-orbit:    { opacity: 0, scale: 0.8 } → { opacity: 1, scale: 1 } delay: 0.3s
```

### Scroll-Triggered Animations
```typescript
// All sections use viewport trigger
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}  // Only animate once

// Staggered children
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.1 }}
```

### Micro-Interactions
```typescript
// Button hover
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}

// Card hover (CSS-based)
transition: all 0.3s ease;
&:hover { transform: translateY(-2px); }

// Arrow bounce (hero scroll indicator)
animate={{ y: [0, 8, 0] }}
transition={{ duration: 2, repeat: Infinity }}
```

### Custom Cursor
```typescript
// Outer ring: 32px circle, mix-blend-difference, cyan hue (170), transitions to 195 (blue) on hover
// Dot: 8px, mix-blend-screen, hue shift to 180 (teal) on hover
// Glow: 6px outer glow, intensity scales with hover state
// Trail: 5 positions, cascading lerp (0.35 for older, 0.30 for newest), fading opacity [0.15, 0.10, 0.07, 0.04, 0.02]
// Touch devices: cursor hidden on mobile/pointer: coarse
// Respects prefers-reduced-motion (simplified rendering)
```

### Floating Stars (Background)
```typescript
// 50 canvas particles (under 80 cap)
// Star sizes: 1-3px; colors: warm whites, light blues, subtle yellows
// Twinkle: sine-wave alpha modulation (period 3-6s per star)
// Flash/shooting-star: 0.03% chance per frame per star, 20-50px streak, fades via 0.92 decay
// Glow halos: stars with alpha > 0.6 get 3px blurred halo
// Respects prefers-reduced-motion (static stars only)
```

### Particle Background
```typescript
// Canvas-based, not Framer Motion
// 80 particles
// Size: 0.5px - 2.5px
// Speed: 0.3px per frame
// Color: rgba(0, 212, 255, alpha)
// Alpha: 0.1 - 0.6
// Respects prefers-reduced-motion
```

### Loading Screen
```typescript
// 6 orbiting dots around "MH" text
// Opacity: [0.3, 1, 0.3] — pulsing
// Scale: [0.5, 1.2, 0.5] — breathing
// Duration: 2s per pulse
// Connection lines: [0.1, 0.5, 0.1] opacity

// TypewriterText sub-component:
// - Text typed character-by-character at 35ms interval
// - Blinking cursor at 530ms interval
// - Sequenced reveals via framer-motion AnimatePresence

// Sweeping scan line on progress bar (1200ms cycle)

// Progress messages cycle:
// < 25%: "Initializing AI Systems"
// < 50%: "Loading Research"
// < 75%: "Loading Projects"
// < 99%: "Launching Portfolio"
```

---

## Responsive Breakpoints

```css
/* Mobile-first approach */
sm: 640px    /* Large phones */
md: 768px    /* Tablets, small laptops */
lg: 1024px   /* Laptops, desktops */
xl: 1280px   /* Large desktops */
2xl: 1536px  /* Extra large screens */

/* Content widths */
max-w-4xl: 896px   /* Article content */
max-w-5xl: 1024px  /* Section containers */
max-w-7xl: 1280px  /* Full-width sections */
```

### Grid Systems
```css
/* Skills grid */
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
gap: 1rem;

/* Projects grid */
grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
gap: 1.5rem;

/* Contact grid */
grid-template-columns: 1fr;          /* Mobile */
@media (min-width: 768px) {
  grid-template-columns: 1fr 1fr;    /* Desktop */
}
```

---

## Component Patterns

### Buttons
```css
/* Primary CTA */
.btn-primary {
  background: #00D4FF;
  color: black;
  border-radius: 9999px;        /* rounded-full */
  padding: 0.75rem 1.5rem;      /* py-3 px-6 */
  font-family: 'Space Grotesk';
  font-size: 0.875rem;          /* text-sm */
  font-weight: 500;
  transition: all 0.3s ease;
}
.btn-primary:hover {
  background: rgba(0, 212, 255, 0.9);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
}

/* Secondary/Ghost */
.btn-ghost {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 9999px;
  padding: 0.75rem 1.5rem;
  backdrop-filter: blur(12px);   /* glass effect */
}

/* Outline with icon */
.btn-outline-icon {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;                  /* gap-2 */
}
```

### Project Cards (ProjectHorizonDeck)
```css
/* Horizontal card: image right, description left, stacked vertically */
.project-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

/* Accent border using project.color */
.project-card-accent {
  border-top: 3px solid var(--project-color);  /* e.g. #00D4FF, #8B5CF6 */
}

.project-card:hover {
  border-color: rgba(0, 212, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.12);  /* hover glow */
}

/* Expanded overlay: fixed, full viewport, z-50 */
.project-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(5, 8, 22, 0.95);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
}

/* Banner image: full width, max-height 40vh, object-cover */
.project-banner {
  width: 100%;
  max-height: 40vh;
  object-fit: cover;
}

/* Architecture detail items */
.project-arch-item {
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.1);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-family: 'JetBrains Mono';
  font-size: 0.875rem;
}

/* Status/Patent badges */
.badge-status {
  background: rgba(16, 185, 129, 0.1);   /* accent/10 */
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  color: #10B981;
}
.badge-patent {
  background: rgba(139, 92, 246, 0.1);  /* secondary/10 */
  border: 1px solid rgba(139, 92, 246, 0.2);
  color: #8B5CF6;
}
```

### Certifications Deck/Carousel
```css
/* Side arrow navigation */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  padding: 0.5rem;
  transition: all 0.2s ease;
}
.carousel-arrow:hover {
  background: rgba(0, 212, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.3);
}

/* Dot indicators */
.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}
.carousel-dot-active {
  background: #00D4FF;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

/* Slide animation via AnimatePresence */
/* direction: -1 (prev) or 1 (next) */
/* x offsets: entering from left/right, exiting to opposite */
```

### Animated Avatar
```css
/* Animated avatar container */
.animated-avatar {
  position: relative;
  border-radius: 9999px;
  overflow: hidden;
  border: 3px solid rgba(0, 212, 255, 0.3);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.15);
}

/* Fallback: gradient background */
.avatar-fallback {
  background: linear-gradient(135deg, #00D4FF, #8B5CF6);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Cards
```css
/* Generic glass card */
.project-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.project-card:hover {
  border-color: rgba(0, 212, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.1);
}

/* Featured project badge */
.badge-featured {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  color: #00D4FF;
}
```

### Skill Tags
```css
.skill-tag {
  background: rgba(139, 92, 246, 0.1);  /* secondary/10 */
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 9999px;
  padding: 0.375rem 0.875rem;
  font-size: 0.75rem;
  font-family: 'JetBrains Mono';
  color: #8B5CF6;
}
```

### Inputs
```css
.input {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: white;
  outline: none;
  transition: all 0.3s ease;
}
.input:focus {
  border-color: rgba(0, 212, 255, 0.5);
}
.input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
```

---

## Iconography

### Library: Lucide React
```typescript
import { 
  Mail, Github, Linkedin, MapPin,
  Rocket, Download, ArrowDown, Send,
  ExternalLink, ChevronRight, Star
} from 'lucide-react'
```

### Icon Sizes
```css
/* Navigation, inline */
icon { width: 18px; height: 18px; }  /* size={18} */

/* Buttons, CTAs */
icon { width: 16px; height: 16px; }  /* size={16} */

/* Card actions */
icon { width: 14px; height: 14px; }  /* size={14} */

/* Decorative */
icon { width: 20px; height: 20px; }  /* size={20} */
```

---

## Accessibility

### Focus States
```css
/* Visible focus ring */
*:focus-visible {
  outline: 2px solid #00D4FF;
  outline-offset: 2px;
}
```

### Color Contrast
- Text on `#050816`: `#F9FAFB` → 19.3:1 ratio ✓
- Primary `#00D4FF` on dark: 10.5:1 ratio ✓
- Muted text `rgba(255,255,255,0.5)`: ~4.5:1 minimum ✓

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Semantic HTML
- `<section>` for all major sections
- `<nav>` for navigation
- `<header>` / `<footer>` for page landmarks
- `role="progressbar"` on loading screen
- `aria-label` on icon-only buttons
- `aria-hidden="true"` on decorative elements

---

## Utility Classes

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(135deg, #00D4FF, #8B5CF6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Glow Hover
```css
.glow-hover:hover {
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
}
```

### Text Opacity Scale
```css
text-white      { color: rgba(255, 255, 255, 1); }    /* Headings */
text-white/80   { color: rgba(255, 255, 255, 0.8); }  /* Subheadings */
text-white/60   { color: rgba(255, 255, 255, 0.6); }  /* Body */
text-white/50   { color: rgba(255, 255, 255, 0.5); }  /* Descriptions */
text-white/40   { color: rgba(255, 255, 255, 0.4); }  /* Captions */
text-white/30   { color: rgba(255, 255, 255, 0.3); }  /* Placeholders */
text-white/20   { color: rgba(255, 255, 255, 0.2); }  /* Disabled */
text-white/10   { color: rgba(255, 255, 255, 0.1); }  /* Subtle */
```

---

## Data Architecture

### Data Files (`/data/*.ts`)
```
achievements.ts    — Awards, recognition, metrics
building.ts        — Currently building / open to
certifications.ts  — Professional certifications
education.ts       — Academic background
experience.ts      — Work experience, roles
hobbies.ts         — Personal interests
leadership.ts      — Leadership roles, community
patents.ts         — Patent filings
personal.ts        — Name, email, socials, tagline
philosophy.ts      — Technical philosophy, values
projects.ts        — Project showcase, tech stacks
skills.ts          — Technical skills, proficiency levels
```

### Content Priority
```
Resume > Info.md > README.md
```
Never invent information — always verify against source docs.

---

## Performance Notes

- All animations respect `prefers-reduced-motion`
- Particles capped at 80 for performance
- Lazy loading on images below fold
- `priority` flag on hero avatar only
- Static export (`output: 'export'`) — no server runtime
