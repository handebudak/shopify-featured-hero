# Shopify Featured Hero Section

Custom Shopify section that recreates the “Featured Hero Collection” Figma design for the case study. The project extends the Dawn theme, uses Tailwind CSS for styling, and deploys to a development store through GitHub Actions.

## Overview

- **Design source:** Featured Hero Collection case study (desktop and mobile layouts)
- **Theme base:** Dawn (Online Store 2.0)
- **Section:** `sections/custom-featured-collection.liquid`
- **Scope:** Desktop ≥1440px and mobile 360px breakpoints (tablet was out of scope for the brief)

The section renders a hero banner with overlayed copy, call-to-action link, and a horizontally scrollable product list that adapts to viewport width. All content is configurable from the Shopify theme editor.

## Features

- Pixel-accurate hero layout for the provided Figma design (desktop and mobile)
- Hero image overlay with customizable title, description, and call-to-action
- Tailwind CSS utility classes compiled into static theme assets
- Vanilla JavaScript for scroll logic and responsive tweaks
- GitHub Actions workflow to build Tailwind and deploy via Shopify CLI using Theme Access credentials

## Tech Stack

- Liquid (Shopify sections)
- Tailwind CSS 3.x
- Vanilla JavaScript
- Shopify CLI 3.x
- GitHub Actions

## Repository Structure

- `sections/custom-featured-collection.liquid` – markup, inline styles, and JS controlling the hero
- `assets/tailwind.css` / `assets/tailwind-compiled.css` – Tailwind source and compiled output
- `tailwind.config.js`, `postcss.config.js` – Tailwind build configuration
- `templates/index.json` – homepage template limited to this custom section
- `.github/workflows/deploy.yml` – CI pipeline for automated theme pushes

## Local Development

Requirements:

- Node.js 18+
- Shopify CLI 3.x
- Development store with Theme Access password

Steps:

```bash
git clone https://github.com/handebudak/shopify-featured-hero.git
cd shopify-featured-hero
npm install
# Watch Tailwind while developing
npx tailwindcss -i ./assets/tailwind.css -o ./assets/tailwind-compiled.css --watch
# Or build once
npm run build:css
# Preview the section on a development theme
shopify theme dev --only sections/custom-featured-collection.liquid templates/index.json --theme <theme_id>
```

## Deployment

GitHub Actions automatically deploys the section on pushes to `main`. The workflow performs:

1. `npm install`
2. `npm run build:css`
3. Shopify CLI installation
4. `shopify theme push` using Theme Access credentials

Required repository secrets:

- `SHOPIFY_STORE` – store domain, e.g. `my-test-store-123456789012.myshopify.com`
- `SHOPIFY_THEME_ID` – target theme ID from `shopify theme list`
- `THEME_ACCESS_PASSWORD` – Theme Access password (`shptka_...`)

For manual deployment, run the same commands locally with the Theme Access password.

## Configuration

The section schema exposes the following settings in the theme editor:

- Hero image
- Title (inline rich text)
- Description (rich text)
- Link text and link URL
- Collection selector
- Products to show (range)

Default values are intentionally omitted so that empty fields remain empty after a theme push.

## Previewing

- Preview links generated via `shopify theme open --preview` are valid for 48 hours. Share both the preview URL and storefront password when providing access to reviewers.

## Credits

- Base theme: [Shopify Dawn](https://github.com/Shopify/dawn)
- Assignment: Featured Hero Collection case study provided by the hiring team