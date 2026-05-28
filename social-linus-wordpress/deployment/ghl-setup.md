# GHL WordPress Hosting — Setup Guide

## Prerequisites
- GHL account with WordPress hosting enabled on your plan
- Elementor Pro license (zip file from your account at elementor.com)
- This repo cloned locally

## Step 1 — Create WordPress in GHL

1. GHL dashboard → **Sites** → **WordPress**
2. Click **+ Add Site**
3. Enter the client's domain/subdomain
4. GHL provisions a WordPress installation — takes ~2 minutes
5. Click **Manage** → opens WordPress Admin

## Step 2 — Install Elementor Pro

1. WordPress Admin → **Plugins** → **Add New** → **Upload Plugin**
2. Upload your Elementor Pro `.zip`
3. Activate the plugin
4. Activate your Elementor Pro license: Elementor → License → Activate

Free Elementor (core) installs automatically as a dependency — keep it active.

## Step 3 — Upload and activate the child theme

1. Zip the `theme/` folder from this repo (the folder itself, not its contents)
   ```bash
   cd social-linus-wordpress/
   zip -r social-linus-theme.zip theme/
   ```
2. WordPress Admin → **Appearance** → **Themes** → **Add New** → **Upload Theme**
3. Upload `social-linus-theme.zip` and activate it
4. Verify Hello Elementor (parent theme) is also installed — if not, install it from the theme directory first

## Step 4 — Import the Elementor global kit

1. WordPress Admin → open any page in the Elementor editor
2. Click the ☰ hamburger (top-left) → **Site Settings**
3. Scroll to bottom → **Import Kit**
4. Select `elementor/global-kit.json` from this repo
5. Confirm import — this sets all brand colors and typography globally

## Step 5 — Configure GHL tracking

1. Open `theme/functions.php`
2. Replace the placeholder:
   ```php
   define( 'GHL_LOCATION_ID', 'YOUR_GHL_LOCATION_ID' );
   ```
   with your actual GHL location ID (found in GHL → Settings → Business Profile)
3. Re-upload the updated `functions.php` via SFTP or the WordPress file manager
4. Verify the tracking pixel fires: open the site, open browser DevTools → Network, filter for `loader.js` — it should appear

## Step 6 — Build pages in Elementor

Follow the page structure documented in `CLAUDE.md`. Use the brand utility classes
from `theme/assets/brand.css` in Elementor's **Advanced → CSS Classes** field on
section and widget elements.

**Standard page section order (homepage):**
1. Hero — `bg-void`, full height, headline + subheadline + CTA button
2. Social Proof Bar — `bg-void`, 4-column stat grid, `stat-number` + `eyebrow` classes
3. Services — `bg-white`, 3-column card grid, eyebrow + H2 + cards
4. Results — `bg-void`, 2-column case study cards, big metrics
5. Testimonials — `bg-frost`, 3-column quote cards
6. Final CTA — `bg-void`, centered, H2 + paragraph + primary button

## Step 7 — Export page templates to source control

After completing each page:
1. Elementor editor → hamburger → **Save as Template** → name it
2. WordPress Admin → **Templates** → **Saved Templates** → Export as JSON
3. Save to `elementor/pages/[page-name].json`
4. Commit and push to the feature branch

## DNS / Domain Setup

1. In GHL → Sites → WordPress → your site → **Domain**
2. Add the client's custom domain
3. Update DNS at their registrar: add a CNAME pointing to GHL's provided hostname
4. GHL provisions SSL automatically via Let's Encrypt — active within ~5 minutes

## Useful GHL integrations already wired up

| Feature | How it works |
|---------|-------------|
| **Site tracking** | `functions.php` injects GHL tracking script in footer |
| **Chat widget** | `functions.php` injects chat widget in footer |
| **Contact forms** | Use Elementor Pro Form widget, set Action to "Webhook", paste GHL webhook URL (GHL → Automation → Triggers → Webhook) |
| **Email capture** | Same webhook approach, or use GHL's native embed code |
