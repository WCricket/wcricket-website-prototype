# Astro Pass 1 experiment

This branch re-expresses the current Wcricket GitHub Pages prototype as a clean static Astro site without changing the visual direction.

## Run locally

```bash
npm install
npm run dev
```

Build the production site with:

```bash
npm run build
```

The production output is written to `dist/` and has no server-side runtime dependency.

## Project structure

- `src/layouts/BaseLayout.astro` — shared document shell, metadata, header/footer and lightweight interaction script
- `src/components/SiteHeader.astro` — responsive navigation
- `src/components/SiteFooter.astro` — shared footer
- `src/components/StoryCard.astro` — reusable accordion/story sheet
- `src/pages/index.astro` — homepage
- `src/pages/support.astro` — support page
- `src/pages/privacy.astro` — privacy page
- `src/styles/global.css` — consolidated current visual treatment
- `assets/` — existing Wcricket prototype assets, configured as Astro's static `publicDir`

## Behaviours that use JavaScript

The shared layout contains only the interaction code required for:

- mobile navigation toggle
- fixed/scrolled header state
- reveal-on-scroll treatment
- accordion opening, delayed desktop hover and viewport alignment
- Highlight Reel reset when another sheet opens or the browser/app loses focus

The team-and-era section is now ordinary page structure rather than being injected at runtime.

## Intentional implementation differences from the legacy prototype

- the current team selection sheet is materialised directly in Astro markup rather than added by JavaScript
- old V9/V10 reel CSS and obsolete modal-player rules are not carried across
- the classic rosette treatment is part of the consolidated stylesheet rather than being loaded dynamically by JavaScript
- repeated header, footer and accordion markup is componentised
- `scroll-behavior` uses the standards-compliant CSS property
- the build uses Astro `build.format: 'file'` so `/support.html` and `/privacy.html` remain available

## Pass 2 readiness

Colour tokens, typography, sheet treatments, content blocks and reusable components are deliberately centralised so the Wcricket identity can be refined without restructuring the site.

## Deployment contract

This branch does not implement Tony's AWS pipeline. It deliberately provides the clean contract that pipeline can consume:

`GitHub -> npm install -> npm run build -> dist/ -> S3 -> CloudFront`

Astro is configured for static output only. The existing `assets/` directory is used as the static public directory so the experiment does not duplicate the current binary image and video library.
