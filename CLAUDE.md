# CLAUDE.md — Social Linus Agency Workflow

This is the master repository for Social Linus Web Services client site production.
Each client gets their own subdirectory. Read this file for repo-wide workflow,
then read the client folder's `CLAUDE.md` for project-specific rules.

---

## Repository Purpose

This repo is a **client site factory**. It holds:

| Directory | What it is |
|-----------|-----------|
| `Linus-Boscovitch-claude-web-design-workflow-Kv1sh/` | Proof-of-concept: Social Linus own site |
| `[future-client-name]/` | Each new client gets their own Next.js project here |
| `agents/` | AI agent configs |
| `cursor-rules/` | Cursor IDE rule files |
| `references/` | Reference docs |

The Social Linus site (`Linus-Boscovitch-claude-web-design-workflow-Kv1sh/`) is both the
agency's own website and the validated scaffold for future client builds. Every pattern
proven there is available as a starting point for new clients.

---

## Business Context File (BUSINESS.md)

Every client project has a `BUSINESS.md` file in its root folder. **This is the source of truth for all copy on the site.** Claude Code reads it before writing any page content, headline, testimonial, or stat.

### What it contains
- Business identity (name, tagline, location, contact)
- Services (what they deliver, who needs it, pricing context)
- Ideal Client Profile (ICP) — industry, deal size, pain points
- Proof points (years in business, metrics, certifiable claims)
- Differentiators (what's genuinely true, not marketing speak)
- Testimonials and reviews (verbatim)
- Origin story / about content
- Google Business Profile data
- Raw content archive (paste-in zone for existing copy)

### How to create one for a new client

1. Open `BUSINESS-INTAKE.md` (in the repo root)
2. Copy the prompt and paste it into a new Claude conversation
3. Either paste raw content (website copy, GBP listing, reviews, a write-up) or let Claude interview you
4. Claude outputs a complete `BUSINESS.md`
5. Save it to the client's project folder
6. Tell Claude Code: *"Read BUSINESS.md and begin building the site"*

### Rule: never invent copy

If a fact, quote, metric, or claim isn't in `BUSINESS.md`, ask before using it. Do not fabricate proof points, testimonials, or business history. The site must be factually accurate.

---

## Starting a New Client Site

### Step 1 — Create the project directory

```bash
# From the repo root
cp -r Linus-Boscovitch-claude-web-design-workflow-Kv1sh/ [client-slug]/
cd [client-slug]
```

### Step 2 — Clean out client-specific content

Remove Social Linus content but keep all infrastructure:

```bash
# Clear case study data (keep the type definitions)
# Edit src/data/caseStudies.ts → empty the caseStudies array, keep the types

# Clear blog placeholder posts
# Edit src/app/blog/page.tsx → update post titles/categories for new client

# Update metadata in src/app/layout.tsx → client name, description, URL

# Reinstall dependencies
npm install
```

### Step 3 — Set the client brand system

Open `src/app/globals.css` and update the `@theme` block:

```css
@theme {
  --color-void:   #[client-primary-dark];
  --color-cobalt: #[client-brand-primary];
  --color-ember:  #[client-accent];
  --color-white:  #FFFFFF;
  --color-frost:  #[client-section-bg];
  --color-slate:  #[client-secondary-text];

  --font-display: '[Client Display Font]', system-ui, sans-serif;
  --font-sans:    '[Client Body Font]', system-ui, sans-serif;
  --font-mono:    '[Client Mono Font]', monospace;
}
```

Update fonts in `src/app/layout.tsx` to import the correct Google Fonts.

### Step 4 — Update the client CLAUDE.md

Replace the content of the client folder's `CLAUDE.md` with:
- Client name and business context
- Their specific brand colors and typography
- Their target ICP and voice rules
- Any site architecture differences from the Social Linus template

### Step 5 — Build

```bash
npm run typecheck   # TypeScript clean
npm run build       # Build passes
npm run dev -- --port [client-port]   # Preview (use unique ports per client)
```

---

## What Carries Over from the Template

Every new client inherits these battle-tested pieces from the Social Linus build:

### Infrastructure
- Next.js 16 App Router with static generation
- Tailwind CSS v4 with `@theme` brand token system
- Google Fonts via `next/font/google`
- Scroll-snap section architecture
- Motion.dev animation system

### Components (copy as-is, restyle with tokens)
- `Header.tsx` — sticky glassmorphism nav with debounced dropdown
- `Footer.tsx` — 4-column grid
- `Button.tsx` — primary/ghost/ember variants via CVA
- `AnimateIn.tsx` — scroll-triggered fade-up wrapper
- `StatCounter.tsx` — viewport-triggered count-up for metrics
- `HeroAnimations.tsx` — sequenced hero entrance
- `ContactForm.tsx` / `SubscribeForm.tsx` — client components for forms

### Case study system
- `src/data/caseStudies.ts` — TypeScript data file with full type definitions
- `src/app/results/[slug]/page.tsx` — dynamic renderer
- `CASE-STUDY-INTERVIEW.md` — Claude interview prompt for populating data

### CSS utilities
- `.snap-section` / `.snap-section--short`
- `.eyebrow` — Space Mono label style
- `.stat-number` — Space Mono metric style
- Reduced motion media query
- All brand color utilities (`bg-void`, `text-cobalt`, etc.)

---

## Port Allocation

Use unique ports to run multiple client dev servers simultaneously:

| Client | Port |
|--------|------|
| Social Linus | 4004 |
| Next client | 4005 |
| — | 4006 |

---

## Shared Workflow Rules

These apply to every client project in this repo:

1. **Every site uses scroll-snap sections.** `.snap-section` on all major page sections.
2. **Animations via Motion.dev.** Import from `motion/react`. Use `whileInView` with `viewport={{ once: true }}`.
3. **No animation on navigation, footer, or long-form content.**
4. **Server components by default.** Extract interactivity into `"use client"` components.
5. **`npm run typecheck && npm run build` must pass before every commit.**
6. **Case studies live in `src/data/caseStudies.ts`.** No individual page files per case study.
7. **Brand tokens in `globals.css` `@theme` block.** No hardcoded hex values in components.

---

## Branch Strategy

```
main                    — stable, production-ready
claude/[client]-[id]    — active build branch per client (created by Claude Code)
```

All Claude Code work happens on feature branches. Merge to `main` when the client signs off.

---

## Adding a Skill or Reference Doc

Non-site files go in the appropriate root directory:
- `cursor-rules/` — `.mdc` files for Cursor IDE rules
- `agents/` — AI agent YAML configs
- `references/` — research docs, brand guidelines, strategy docs

These are not part of any client site build — keep them separate.
