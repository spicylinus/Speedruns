# CLAUDE.md — Social Linus Website

This file is the authoritative reference for every Claude Code session working on this project.
Read it before touching any code. All design decisions, animation patterns, and component rules
are documented here so they never need to be re-explained.

---

## Project Identity

**Client:** Social Linus Web Services — Atlanta, GA
**Owner:** Shannendoah, 15+ years web design, 8+ years SEO
**Business model:** Done-for-you services (web design, SEO, lead generation) for high-ticket B2B companies
**Primary audience:** B2B service companies where average deal value exceeds $25K
**Site purpose:** Convert warm outreach traffic + rank for bottom-of-funnel service keywords

This is a **service agency site, not SaaS.** Never use: "free trial", "explore features", "scalable tools", "SaaS", or "platform".

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` in globals.css) |
| Animations | Motion.dev (`motion` package, import from `motion/react`) |
| Fonts | Google Fonts via `next/font/google` |
| Icons | `lucide-react` |
| Utilities | `clsx`, `tailwind-merge`, `class-variance-authority` |

```bash
npm run dev -- --port 4004   # dev server
npm run typecheck            # TypeScript check
npm run build                # production build
```

---

## Brand Design System

### Colors

| Name | Hex | CSS Variable | Tailwind Class | Role |
|------|-----|-------------|----------------|------|
| Void | #0D0F12 | `--color-void` | `bg-void` / `text-void` | Primary dark bg, nav, hero sections |
| Cobalt | #1547E8 | `--color-cobalt` | `bg-cobalt` / `text-cobalt` | Brand primary — buttons, links, stat numbers |
| Ember | #FF4D1C | `--color-ember` | `bg-ember` / `text-ember` | Accent/urgency — **one per section maximum** |
| White | #FFFFFF | `--color-white` | `bg-white` / `text-white` | Clean canvas, card faces, body text on dark |
| Frost | #EBF2FF | `--color-frost` | `bg-frost` / `text-frost` | Section break backgrounds, card containers |
| Slate | #4A5568 | `--color-slate` | `text-slate` | Body copy on White/Frost only — **never on Void** |

### Typography

| Role | Font | Weight | Size | Class/Style |
|------|------|--------|------|-------------|
| Display XL | Space Grotesk | 700 | 72px | `font-display font-bold` + `fontSize:'72px', letterSpacing:'-0.04em'` |
| H1 | Space Grotesk | 700 | 48px | `font-display font-bold` + `fontSize:'48px', letterSpacing:'-0.03em'` |
| H2 | Space Grotesk | 600 | 32px | `font-display font-semibold` + `fontSize:'32px', letterSpacing:'-0.02em'` |
| H3 | Space Grotesk | 500 | 24px | `font-display font-medium` + `fontSize:'24px', letterSpacing:'-0.01em'` |
| Body Large | DM Sans | 400 | 18px | `fontSize:'18px', lineHeight:'1.6'` |
| Body Base | DM Sans | 400 | 15px | `fontSize:'15px', lineHeight:'1.65'` |
| Stats/Data | Space Mono | 700 | 42px | `font-mono font-bold` + `fontSize:'42px', letterSpacing:'-0.02em'` |
| Eyebrow/Label | Space Mono | 400 | 12px | `.eyebrow` utility class (defined in globals.css) |

**Font CSS variables** are set by `next/font/google` in `layout.tsx`:
- `--font-display` → Space Grotesk
- `--font-sans` → DM Sans
- `--font-body` → DM Sans
- `--font-mono` → Space Mono

### The Non-Negotiable Readability Rule

> **If the background is dark, the text is light. If the background is light, the text is dark.**

| On Void bg | Minimum opacity |
|------------|----------------|
| Body copy | `rgba(255,255,255,0.75)` = `text-white/75` |
| Labels/secondary | `rgba(255,255,255,0.55)` = `text-white/55` |
| Banned | `text-slate` — contrast 3.4:1, fails WCAG AA |
| Banned | `text-white/30`, `text-white/40`, `text-white/50` |

| On White/Frost bg | Use |
|-------------------|-----|
| Body copy | `text-void` or `text-slate` |
| Never | Any text lighter than `#888888` |

### Ember Rule

**One Ember element per section, maximum.** Its power comes from scarcity. When section labels use `.eyebrow text-ember`, that is the section's Ember allocation — no Ember buttons or borders in the same section. The exception is a section where Ember IS the entire point (a high-urgency CTA block with no section label).

### Section Label Convention

- Section labels (eyebrows above H2s) use `.eyebrow text-ember`
- Hero eyebrows use `.eyebrow` with `color: rgba(255,255,255,0.55)` — not Ember, not Cobalt
- Inline emphasis within body copy uses `text-cobalt`

### Button Hierarchy

```tsx
// Primary — main CTA
<Button href="/book-a-call">Book a Call →</Button>

// Ghost — secondary action (works on both light and dark bg)
<Button href="/results" variant="ghost">See Our Results</Button>

// Ember — urgency moments only, used at most once per page
<Button variant="ember">Get Started Now</Button>
```

Buttons live in `src/components/ui/Button.tsx`. Use `size="lg"` for hero/CTA sections.

---

## Motion.dev Animation System

Motion is installed as the `motion` npm package. **Always import from `motion/react`** for React components.

```tsx
import { motion } from 'motion/react'
import { useInView } from 'motion/react'
```

### Core principle

Animations serve conversion, not decoration. Every animation draws the eye toward a CTA, a proof point, or a key metric. If it doesn't serve conversion, cut it.

### The three reusable components

#### 1. `AnimateIn` — scroll-triggered fade-up (use everywhere)

```tsx
import { AnimateIn } from '@/components/motion/AnimateIn'

// Wraps any content in a scroll-triggered fade-up
<AnimateIn delay={0.1}>
  <p>This fades up when it enters the viewport.</p>
</AnimateIn>
```

- Fires once on first viewport entry (`viewport={{ once: true }}`)
- Default: `opacity 0→1`, `y 30→0`, 0.6s ease-out
- `delay` prop staggers multiple elements
- Use on: section headings, body paragraphs, single cards, CTA blocks

#### 2. `StatCounter` — count-up animation for metrics

```tsx
import { StatCounter } from '@/components/motion/StatCounter'

// Numeric count-up
<StatCounter value={340} suffix="%" />       // renders "+340%" counting up
<StatCounter value={37} prefix="+" />        // "+37"
<StatCounter value={15} suffix="+" />        // "15+"

// Text display (no count-up, just entrance)
<StatCounter isText displayText="ATL" value={0} />
```

- Triggers on viewport entry, counts from 0 to `value` in 1.2s with ease-out
- Always wrap in a `font-mono font-bold text-cobalt` container for Space Mono styling
- Used in the social proof bar and case study results sections

#### 3. `HeroAnimations` — hero entrance on page load

```tsx
import { HeroAnimations } from '@/components/motion/HeroAnimations'

// Place inside the page component, before the hero section
<HeroAnimations />

// Then add hero-animate class to elements that should sequence in:
<p className="hero-animate eyebrow" style={{ opacity: 0 }}>Eyebrow</p>
<h1 className="hero-animate font-display" style={{ opacity: 0 }}>Headline</h1>
<p className="hero-animate" style={{ opacity: 0 }}>Subhead</p>
<div className="hero-animate" style={{ opacity: 0 }}>CTA buttons</div>
```

- Uses CSS transitions — fires sequentially with 120ms stagger between elements
- Set `opacity: 0` via inline style on each `.hero-animate` element so they're invisible until JS runs
- Elements animate in order of DOM appearance

### Direct `motion.div` — for staggered card grids

When animating a list of cards, use `motion.div` directly with a computed delay:

```tsx
import { motion } from 'motion/react'

{items.map((item, i) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
  >
    <Card>{item.content}</Card>
  </motion.div>
))}
```

- `delay: i * 0.1` staggers cards by 100ms each
- Cap stagger at 4 items (400ms total) — beyond that it feels slow
- `viewport={{ once: true }}` is non-negotiable — never re-animate on scroll-up

### Animation hierarchy — what gets animated and why

| Element | Animation | Component | Why |
|---------|-----------|-----------|-----|
| Hero headline | Fade up + scale 0.97→1 | `HeroAnimations` | First impression — commands attention |
| Hero CTA button | Fade up, 240ms after headline | `HeroAnimations` | Draws eye to the action |
| Section headings | Fade up | `AnimateIn` | Visual rhythm, confirms section start |
| Stat numbers | Count-up from 0 | `StatCounter` | Numbers in motion are impossible to ignore |
| Service/feature cards | Staggered fade-up, 100ms between | `motion.div` | Guides reading order |
| Case study metrics | Fade up | `AnimateIn` | Emphasizes the proof |
| Testimonial quotes | Gentle fade in | `AnimateIn delay={0.2}` | Human, not flashy |
| Final CTA block | Fade up | `AnimateIn` | Last conversion moment |

### What NOT to animate

- **Navigation** — must be instant and stable
- **Footer** — nobody needs a footer entrance
- **Body text paragraphs** — slows reading, feels gimmicky
- **Blog post content** — long-form reading needs zero interference
- **On scroll-up** — animations fire once, stay visible, never re-trigger
- **Width, height, margin, padding** — causes layout thrashing; use `transform` and `opacity` only

### Performance rules

```css
/* Add to elements that will animate */
.will-animate {
  will-change: transform, opacity;
}
```

- Only animate `transform` and `opacity` — these are GPU-composited
- All animations complete in under 800ms
- `globals.css` already includes `@media (prefers-reduced-motion: reduce)` — all animations disabled automatically for users who need it

### Hover micro-interactions

CTAs get a subtle scale on hover via Tailwind's `transition-transform` or inline style:

```tsx
// Via Tailwind (add to any interactive element)
className="transition-transform hover:scale-[1.03]"

// The Button component already handles this — don't add separately
```

---

## Page Architecture

### Scroll-snap sections

Every major section uses the `.snap-section` utility class (defined in `globals.css`):

```tsx
<section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
  <div className="max-w-5xl mx-auto w-full">
    {/* content */}
  </div>
</section>
```

| Class | Use |
|-------|-----|
| `.snap-section` | Full-height snap (`min-height: 100vh`) — most sections |
| `.snap-section--short` | Snap but auto-height — stat bars, short callout sections |

**Do not** use snap sections on: blog post content, any long-form reading flow.

Mobile: snap changes from `mandatory` to `proximity` automatically via the media query in `globals.css`.

### Section background rhythm

Alternate backgrounds to create visual breathing room:

```
Hero         → bg-void (dark)
Services     → bg-white (light)
Results      → bg-void (dark)
Testimonials → bg-frost (tinted)
CTA          → bg-void (dark)
```

Avoid two consecutive identical backgrounds. The contrast between sections is intentional.

### Standard section template

```tsx
<section className="snap-section bg-void flex flex-col justify-center px-6 py-24">
  <div className="max-w-5xl mx-auto w-full">

    {/* Eyebrow label */}
    <AnimateIn>
      <p className="eyebrow text-ember mb-6">Section Name</p>
    </AnimateIn>

    {/* H2 */}
    <AnimateIn delay={0.1}>
      <h2 className="font-display font-semibold text-white mb-12"
          style={{ fontSize: '32px', letterSpacing: '-0.02em' }}>
        Headline here.
      </h2>
    </AnimateIn>

    {/* Content */}
    <AnimateIn delay={0.2}>
      {/* cards, copy, etc. */}
    </AnimateIn>

  </div>
</section>
```

---

## Component Library

All components live in `src/components/`. Key ones:

| Component | Path | Notes |
|-----------|------|-------|
| `Button` | `ui/Button.tsx` | Variants: `primary`, `ghost`, `ember`. Prop: `href` (renders Link) or `onClick` |
| `AnimateIn` | `motion/AnimateIn.tsx` | Scroll-triggered fade-up wrapper |
| `StatCounter` | `motion/StatCounter.tsx` | Count-up animation for metrics |
| `HeroAnimations` | `motion/HeroAnimations.tsx` | Sequences `.hero-animate` elements on mount |
| `Header` | `layout/Header.tsx` | Sticky, glassmorphism, dropdown nav |
| `Footer` | `layout/Footer.tsx` | Void bg, 4-column grid |
| `ContactForm` | `contact/ContactForm.tsx` | Client component — form with service interest select |
| `SubscribeForm` | `blog/SubscribeForm.tsx` | Client component — email subscribe |

When building new pages:
- Server components by default
- Extract any `onSubmit`, `onClick`, or state logic into a dedicated `"use client"` component
- Never put `useState`/`useEffect` in a server component

---

## Case Studies

Case study data lives in `src/data/caseStudies.ts`. Adding a new case study:

1. Use the interview prompt in `CASE-STUDY-INTERVIEW.md` in a new Claude conversation
2. Paste the output object into the `caseStudies` array in `caseStudies.ts`
3. The page appears automatically at `/results/[slug]`

The dynamic route `src/app/results/[slug]/page.tsx` renders all case studies from this file.
Do not create individual case study page files — they'll be ignored.

---

## Visual Design Checklist

Before committing any new page or component, verify:

- [ ] All text on Void bg is `text-white/75` minimum (body) or `text-white/55` minimum (labels)
- [ ] `text-slate` only appears on White or Frost backgrounds
- [ ] Ember used at most once per section (usually the section label eyebrow)
- [ ] All stat numbers use `font-mono font-bold text-cobalt`
- [ ] Section labels use `.eyebrow text-ember`
- [ ] Hero eyebrow uses `.eyebrow` with `color: rgba(255,255,255,0.55)`
- [ ] New sections use `.snap-section` or `.snap-section--short`
- [ ] Animated elements use `viewport={{ once: true }}` — never re-triggers
- [ ] New client components include `"use client"` at the top
- [ ] `npm run typecheck` passes before commit
- [ ] `npm run build` passes before commit

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout — fonts, Header, Footer
│   ├── globals.css                   # Brand tokens (@theme), snap-section utilities
│   ├── page.tsx                      # Homepage (6 snap sections)
│   ├── services/
│   │   ├── page.tsx                  # Services hub
│   │   ├── web-design/page.tsx
│   │   ├── seo/page.tsx
│   │   └── lead-generation/page.tsx
│   ├── results/
│   │   ├── page.tsx                  # Results hub (reads from caseStudies.ts)
│   │   └── [slug]/page.tsx           # Dynamic case study renderer
│   ├── tools/page.tsx
│   ├── about/page.tsx
│   ├── blog/page.tsx
│   ├── contact/page.tsx
│   └── book-a-call/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx                # Sticky glassmorphism nav
│   │   └── Footer.tsx
│   ├── motion/
│   │   ├── AnimateIn.tsx             # Reusable scroll-triggered wrapper
│   │   ├── StatCounter.tsx           # Count-up for metrics
│   │   └── HeroAnimations.tsx        # Hero entrance sequencer
│   ├── ui/
│   │   └── Button.tsx                # primary | ghost | ember variants
│   ├── blog/
│   │   └── SubscribeForm.tsx         # Client component
│   └── contact/
│       └── ContactForm.tsx           # Client component
├── data/
│   └── caseStudies.ts                # All case study content + types
├── lib/
│   └── utils.ts                      # cn() helper
└── styles/
    └── design-styles.css             # 10 style presets (minimalism active)
```

---

## Git Workflow

- Branch: `claude/redesign-website-YcKpl`
- Push: `git push origin claude/redesign-website-YcKpl`
- The stop hook requires all changes to be committed before ending a session

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Motion animation not triggering | Check `"use client"` is at top of file. `motion/react` requires client components. |
| `whileInView` fires on every scroll | Add `viewport={{ once: true }}` to the motion element |
| Tailwind color not working (e.g. `bg-cobalt`) | Color must be defined in `@layer utilities` in `globals.css` — check there first |
| Build fails with "Event handlers cannot be passed to Client Component" | Extract `onSubmit`/`onClick` logic into a separate `"use client"` component |
| TypeScript error on `animate()` from `motion` | Use `motion/react`'s `motion.div` with `whileInView` instead of the DOM `animate()` imperative API |
| Stat counter not counting | Ensure the `StatCounter` is visible on mount (not hidden by CSS) — `useInView` needs the element in the DOM |
| Dropdown closes before click | The Header uses a 120ms debounced close — if still failing, check `onMouseEnter`/`onMouseLeave` on the dropdown panel div |
