# Elementor Global Kit

## What this is

`global-kit.json` defines the brand color palette and typography system for the entire site. Once imported, every Elementor widget's style controls will show the brand colors and fonts as named options.

## How to import

1. WordPress Admin → Elementor → Site Settings (gear icon in Elementor editor)
2. Click **Import Kit** (bottom of the left panel)
3. Select `global-kit.json` from this folder
4. Click **Import** → confirm overwrite of existing kit

## What's defined

**Global Colors:**
| Name | Hex | Use |
|------|-----|-----|
| Void | #0D0F12 | Hero bg, nav, dark sections |
| Cobalt | #1547E8 | CTA buttons, links, stat numbers |
| Ember | #FF4D1C | Eyebrow labels, accent (one per section) |
| Frost | #EBF2FF | Tinted section backgrounds |
| Slate | #4A5568 | Body copy on light backgrounds only |
| White | #FFFFFF | Card faces, body text on dark |

**Global Typography:**
| Name | Font | Use |
|------|------|-----|
| Display XL | Space Grotesk 700 / 72px | Hero headline |
| H1 | Space Grotesk 700 / 48px | Page titles |
| H2 | Space Grotesk 600 / 32px | Section headings |
| H3 | Space Grotesk 500 / 24px | Card/subsection titles |
| Body Large | DM Sans 400 / 18px | Hero subheadline |
| Body | DM Sans 400 / 15px | Paragraph copy |
| Stat Number | Space Mono 700 / 42px | Metrics, proof points |
| Eyebrow Label | Space Mono 400 / 12px / UPPERCASE | Section labels above H2s |

## Customizing for a new client

1. Open `global-kit.json` in a text editor
2. Replace all hex values in `custom_colors` with the client's palette
3. Replace font family names in `custom_typography` with the client's Google Fonts
4. Import the updated kit as above

## Exporting page templates

After building a page in Elementor, export it for source control:
1. Elementor editor → ☰ (hamburger) → Save as Template
2. WordPress Admin → Templates → Saved Templates → Export as JSON
3. Save the file to `elementor/pages/[page-name].json`
4. Commit to the branch

This keeps page layouts in version control even though Elementor stores them in the database.
