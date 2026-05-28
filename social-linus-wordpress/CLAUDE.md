# CLAUDE.md — Social Linus WordPress Site

Read this file before touching any content or structure in this project.

---

## First Step: Read BUSINESS.md

Before writing any copy, headlines, service descriptions, testimonials, stats, or contact info —
read `BUSINESS.md` in this folder. It is the single source of truth for all factual claims.

**Never invent:**
- Proof points, metrics, or stats not in BUSINESS.md
- Testimonial quotes not in BUSINESS.md
- Service descriptions, pricing, or ICP details not in BUSINESS.md

---

## Project Identity

**Client:** Social Linus Web Services — Atlanta, GA
**Stack:** WordPress + Elementor Pro, hosted on GHL WordPress hosting
**Purpose:** Agency's own site — converts outreach traffic, ranks for service keywords

This is a **service agency site, not SaaS.** Never use: "free trial", "platform", "scalable tools".

---

## Tech Stack

| Layer | Tool |
|-------|------|
| CMS | WordPress (managed on GHL) |
| Page Builder | Elementor Pro |
| Parent Theme | Hello Elementor |
| Child Theme | `theme/` in this repo |
| Brand CSS | `theme/assets/brand.css` |
| Fonts | Google Fonts (Space Grotesk, DM Sans, Space Mono) loaded via `functions.php` |
| Icons | Elementor Icon widget (Font Awesome bundled with Elementor Pro) |
| CRM / Tracking | GoHighLevel — tracking + chat widget in `functions.php` |
| Forms | Elementor Pro Form widget → GHL webhook |

---

## Brand Design System

### Colors

| Name | Hex | CSS Variable | Role |
|------|-----|-------------|------|
| Void | #0D0F12 | `--color-void` | Hero bg, nav, dark sections |
| Cobalt | #1547E8 | `--color-cobalt` | CTA buttons, links, stat numbers |
| Ember | #FF4D1C | `--color-ember` | Eyebrow labels, accent — **one per section max** |
| White | #FFFFFF | `--color-white` | Cards, light section bg, body text on dark |
| Frost | #EBF2FF | `--color-frost` | Tinted section bg (testimonials, alt rows) |
| Slate | #4A5568 | `--color-slate` | Body copy on White/Frost only — never on Void |

All hex values are also defined as Elementor Global Colors in `elementor/global-kit.json`.

### Typography

| Role | Font | Weight | Size | Elementor Global Style |
|------|------|--------|------|----------------------|
| Hero headline | Space Grotesk | 700 | 72px | Display XL |
| H1 | Space Grotesk | 700 | 48px | H1 |
| H2 (section) | Space Grotesk | 600 | 32px | H2 |
| H3 (card title) | Space Grotesk | 500 | 24px | H3 |
| Body Large | DM Sans | 400 | 18px | Body Large |
| Body | DM Sans | 400 | 15px | Body |
| Stat numbers | Space Mono | 700 | 42px | Stat Number |
| Eyebrow label | Space Mono | 400 | 12px UPPERCASE | Eyebrow Label |

### The Non-Negotiable Readability Rule

> If the background is dark, the text is light. If the background is light, the text is dark.

On Void (dark) sections:
- Body copy: `color: rgba(255,255,255,0.75)` — set in Elementor's text color control
- Labels / secondary text: `color: rgba(255,255,255,0.55)`
- **Never use Slate on a dark background** — contrast fails WCAG AA

On White / Frost sections:
- Body copy: Void (#0D0F12) or Slate (#4A5568)
- Never use text lighter than #888888

### Ember Rule

**One Ember element per section, maximum.** The section eyebrow label uses Ember — that's the section's allocation. Don't add Ember borders, Ember buttons, or Ember icons in the same section.

---

## Page Architecture

### Section Background Rhythm

Alternate backgrounds to create visual breathing room:

```
Hero             → bg-void  (dark)
Social Proof Bar → bg-void  (dark, short)
Services         → bg-white (light)
Results          → bg-void  (dark)
Testimonials     → bg-frost (tinted)
Final CTA        → bg-void  (dark)
```

Never use two consecutive identical backgrounds.

### Standard Section Structure in Elementor

Each section follows this pattern:

```
Section (full width, min-height 100vh on desktop)
  └── Container (max-width 1200px, centered)
        ├── Text widget — class: "eyebrow"         → "WHAT WE DO"
        ├── Heading widget (H2)                     → Section headline
        └── Content area (columns, cards, etc.)
```

**Section padding:** 96px top/bottom on desktop, 60px on mobile.

**Apply CSS class to Elementor section:** In the section's Advanced tab → CSS Classes field:
- Dark sections: `bg-void`
- Light sections: `bg-white`
- Tinted sections: `bg-frost`

### Page Section Map — Homepage

| # | Section | Bg | Notes |
|---|---------|----|----|
| 1 | Hero | Void | Full height. Eyebrow (white/55 opacity), Display XL headline, Body Large subhead, primary CTA button. No section label — headline IS the message. |
| 2 | Social Proof Bar | Void | Short section. 4-column icon box grid: 200+, 37%, 15+, ATL. Stat Number class + Eyebrow class for labels. Divider between columns. |
| 3 | Services | White | Eyebrow "WHAT WE DO" in Ember. H2. 3-column card grid. Each card: H3, body text, "Learn more →" link in Cobalt. |
| 4 | Results | Void | Eyebrow "RESULTS" in Ember. H2. 2-column cards with big mono metrics (Page 20→1, +37%). Links to case study pages. |
| 5 | Testimonials | Frost | Eyebrow "WHAT CLIENTS SAY" in Ember. H2. 3-column quote cards on white card bg. Name + title below each quote. |
| 6 | Final CTA | Void | No eyebrow. H2 in Cobalt. Body Large text. Single primary button "Book a Call →". Centered layout. |

---

## Elementor Workflow Rules

1. **Use Global Colors everywhere.** When setting any color in Elementor, click the globe icon and select a named global color — never type a hex value directly.

2. **Use Global Typography for all text widgets.** Set typography via the global style name, not by manually picking font/size/weight.

3. **CSS utility classes for custom styling.** Use the classes from `theme/assets/brand.css` in Elementor's **Advanced → CSS Classes** field. Available: `eyebrow`, `stat-number`, `bg-void`, `bg-frost`, `body-on-dark`, `card`, `card--dark`, `card--white`, `btn-cobalt`, `btn-ghost`, `btn-ember`.

4. **Animations: use Elementor's built-in entrance animations.** In widget **Advanced → Motion Effects → Entrance Animation**, select "Fade In Up" with a 0.2–0.4s delay stagger between cards. Duration 600ms. Never use third-party animation plugins.

5. **Forms submit to GHL webhook.** In Elementor Pro Form → Actions After Submit → Webhook → paste the GHL webhook URL from BUSINESS.md (or the GHL Automation trigger URL).

6. **Export page templates after building.** Every completed page: hamburger → Save as Template → export JSON → commit to `elementor/pages/`.

7. **Mobile: check every section at 375px, 390px, and 768px.** Elementor's responsive controls handle breakpoints. Target: no horizontal scroll, readable font sizes (min 14px body), buttons full-width on mobile.

---

## Forms and GHL Integration

**Contact form fields:**
- First Name (required)
- Last Name (required)
- Email (required)
- Phone (optional)
- Service Interest (dropdown: Web Design, SEO, Lead Generation, Not sure yet)
- Message

**Form → GHL mapping (webhook POST body):**
```
firstName, lastName, email, phone, service_interest, message, source: "website-contact"
```

**Book a Call page:**
Embed GHL's calendar widget directly via an HTML widget:
```html
<iframe src="https://api.leadconnectorhq.com/widget/booking/[YOUR_CALENDAR_ID]"
        style="width:100%;border:none;overflow:hidden;"
        scrolling="no"
        id="ghl-calendar">
</iframe>
<script src="https://link.msgsndr.com/js/form_embed.js"></script>
```

---

## Case Studies

Case study content is stored as WordPress Pages (or a custom post type) and built in Elementor.

**Naming convention:** URL slug = `/results/[client-slug]` (e.g. `/results/creative-sources`)

**Standard case study page structure:**
1. Hero — Client name, industry, location. One hero metric (e.g. "+340% organic traffic")
2. Challenge — What problem they had before working with Social Linus
3. Solution — What we built/did (specific, not generic)
4. Results — 3–4 stat boxes (Stat Number class) with brief labels
5. Quote — Full testimonial if available
6. CTA — "Ready for results like this? Book a Call →"

Use `CASE-STUDY-INTERVIEW.md` to generate the content for each case study.

---

## File Structure

```
social-linus-wordpress/
├── BUSINESS.md                    # Source of truth for all copy
├── CASE-STUDY-INTERVIEW.md        # Claude prompt for case study content
├── CLAUDE.md                      # This file
├── theme/
│   ├── style.css                  # Theme declaration (Hello Elementor child)
│   ├── functions.php              # Fonts, GHL scripts, Elementor color registration
│   └── assets/
│       └── brand.css              # CSS custom properties + utility classes
├── elementor/
│   ├── global-kit.json            # Elementor global colors + typography — import this first
│   ├── README.md                  # Kit import instructions
│   └── pages/                    # Exported Elementor page templates (JSON)
└── deployment/
    └── ghl-setup.md              # GHL WordPress hosting setup walkthrough
```

---

## Visual Design Checklist

Before signing off on any page:

- [ ] All text on Void bg is `rgba(255,255,255,0.75)` minimum (body) or `rgba(255,255,255,0.55)` minimum (labels)
- [ ] Slate text only appears on White or Frost backgrounds
- [ ] Ember used at most once per section (section eyebrow = Ember allocation used)
- [ ] All stat numbers use Space Mono 700 in Cobalt
- [ ] Section eyebrows use `.eyebrow` class (Ember color, mono font, uppercase)
- [ ] Every H2 has an eyebrow label above it (except hero and final CTA)
- [ ] Global Colors used — no hardcoded hex values in Elementor color fields
- [ ] Global Typography used — no manually set font families in Elementor
- [ ] Page template exported to `elementor/pages/` and committed
- [ ] Checked mobile at 375px, 390px, 768px
- [ ] Forms tested — submission reaches GHL contact record
