# CLAUDE.md — Social Linus Agency Workflow

This is the master repository for Social Linus Web Services client site production.
Each client gets their own subdirectory. Read this file for repo-wide workflow,
then read the client folder's `CLAUDE.md` for project-specific rules.

---

## Repository Purpose

This repo is a **client site factory**. It holds:

| Directory | What it is |
|-----------|-----------|
| `social-linus-wordpress/` | Active scaffold: Social Linus own site (WordPress + Elementor Pro) |
| `[future-client-name]/` | Each new client gets their own WordPress project here |
| `Linus-Boscovitch-claude-web-design-workflow-Kv1sh/` | Legacy: original Next.js proof-of-concept (archived) |
| `agents/` | AI agent configs |
| `cursor-rules/` | Cursor IDE rule files |
| `references/` | Reference docs |

The `social-linus-wordpress/` folder is both the agency's own site and the validated scaffold for future client builds. Every pattern proven there carries forward to new clients.

**Stack:** WordPress + Elementor Pro, hosted on GHL (GoHighLevel) WordPress hosting. GHL handles CRM, tracking, chat widget, and form capture.

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
cp -r social-linus-wordpress/ [client-slug]/
cd [client-slug]
```

### Step 2 — Swap out client-specific content

- Replace `BUSINESS.md` with the new client's (or run the intake interview)
- Clear Social Linus copy from `theme/assets/brand.css` — keep the CSS variable structure, swap hex values
- Update `theme/style.css` — change `Theme Name`, `Author URI`, and the description comment
- Update `elementor/global-kit.json` — swap brand colors and font choices

### Step 3 — Set the client brand system

Open `theme/assets/brand.css` and update the `:root` block:

```css
:root {
  --color-primary-dark: #[client-dark];      /* e.g. hero bg, nav */
  --color-primary:      #[client-brand];     /* e.g. CTA buttons, links */
  --color-accent:       #[client-accent];    /* e.g. eyebrow labels, urgency */
  --color-surface:      #[client-section-bg];/* e.g. tinted section bg */
  --color-body:         #[client-body-text]; /* e.g. paragraph copy */
  --font-display: '[Client Display Font]', system-ui, sans-serif;
  --font-body:    '[Client Body Font]',    system-ui, sans-serif;
  --font-mono:    '[Client Mono Font]',    monospace;
}
```

Then open `elementor/global-kit.json` and update all hex values to match.

### Step 4 — Update the client CLAUDE.md

Replace the content of the client folder's `CLAUDE.md` with:
- Client name and business context
- Their specific brand colors and typography
- Their target ICP and voice rules
- Any site architecture differences from the Social Linus template

### Step 5 — Upload theme to WordPress

1. Zip the `theme/` folder
2. WordPress Admin → Appearance → Themes → Add New → Upload Theme
3. Activate it
4. Import `elementor/global-kit.json` via Elementor → Site Settings → Import Kit
5. Confirm global colors and typography are applied site-wide

### Step 6 — Connect GHL

In `theme/functions.php`, replace placeholder constants:

```php
define( 'GHL_LOCATION_ID', 'YOUR_ACTUAL_LOCATION_ID' );
```

This injects the GHL tracking and chat widget scripts into `wp_footer`.

---

## What Carries Over from the Template

Every new client inherits these from the Social Linus build:

### Theme infrastructure
- Hello Elementor child theme base (lightweight, Elementor-optimized)
- Brand CSS custom properties (`:root` variable system)
- Google Fonts loaded via `wp_enqueue_style` with display=swap
- GHL tracking + chat widget integration in `functions.php`
- Elementor global kit (colors + typography) ready to import

### Elementor page patterns
- **Hero section** — full-height, dark bg, headline + sub + CTA button
- **Social proof bar** — 4-column stat grid with number highlights
- **Services grid** — 3-column cards with eyebrow, title, description, link
- **Results / case studies** — dark-bg 2-column cards with big metrics
- **Testimonial strip** — 3-column quote cards on tinted bg
- **Final CTA block** — centered, dark bg, one primary button

### Content structure
- `BUSINESS.md` — business intelligence file (copy-paste to new client)
- `CASE-STUDY-INTERVIEW.md` — Claude prompt for writing case study content
- Elementor global kit JSON — brand colors + typography ready to import

### Conventions that carry forward
- Alternating dark/light/tinted section backgrounds
- One accent color element per section (max)
- Section eyebrow labels above every H2
- Stat numbers always use the mono font, primary color
- No animation on nav or footer
- All forms submit to GHL webhook

---

## Shared Workflow Rules

These apply to every client project in this repo:

1. **Read `BUSINESS.md` before writing any copy.** Never invent facts, stats, or testimonials.
2. **Brand CSS lives in `theme/assets/brand.css`.** No hardcoded hex values in Elementor custom CSS panels — always use `var(--color-primary)` etc.
3. **Elementor global colors and typography are set via the kit.** Don't override them inline.
4. **One accent color element per section.** Section eyebrow label = accent allocation used.
5. **All forms go to GHL.** Use Elementor Pro forms with the GHL webhook action, or a native HTML form that POSTs to the GHL webhook URL in `BUSINESS.md`.
6. **Dark background = light text.** Body copy minimum `rgba(255,255,255,0.75)` on dark sections.
7. **Commit theme files to this repo.** Elementor page data lives in the WP database — export page templates as JSON and commit them to `elementor/pages/`.

---

## Branch Strategy

```
main                    — stable, matches production
claude/[client]-[id]    — active build branch per client (created by Claude Code)
```

All Claude Code work happens on feature branches. Merge to `main` when the client approves.

---

## GHL WordPress Hosting Deployment

1. In GHL → Sites → WordPress, create a new WordPress installation
2. Install and activate Elementor Pro (upload the `.zip` from your license)
3. Upload and activate the client child theme via WordPress Admin → Themes
4. Import the Elementor global kit: Elementor → Site Settings → Import Kit → select `elementor/global-kit.json`
5. Build pages in Elementor Pro, following the section pattern in the client `CLAUDE.md`
6. Set the GHL location ID in `functions.php` to activate tracking + chat widget

---

## Adding a Skill or Reference Doc

Non-site files go in the appropriate root directory:
- `cursor-rules/` — `.mdc` files for Cursor IDE rules
- `agents/` — AI agent YAML configs
- `references/` — research docs, brand guidelines, strategy docs

These are not part of any client site build — keep them separate.
