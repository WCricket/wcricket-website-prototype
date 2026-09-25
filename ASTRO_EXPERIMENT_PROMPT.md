# Wcricket Astro Pass 1 experiment prompt

Build an Astro implementation of the current Wcricket website prototype.

This is a controlled migration experiment and is Pass 1 of a two-pass website build. Use the deployed GitHub Pages prototype as the visual and behavioural reference and the existing Wcricket website prototype repository as the source for Wcricket-owned content and assets.

Reference site:

- https://wcricket.github.io/wcricket-website-prototype/
- source repository: `WCricket/wcricket-website-prototype`

## Purpose of this experiment

The aim is to prove that the current prototype can be re-expressed cleanly in Astro without losing its design, responsive behaviour or interactions, and that the resulting static Astro build is suitable for the proposed automated AWS deployment path:

`GitHub -> Astro build -> dist/ -> Amazon S3 -> Amazon CloudFront -> Wcricket domain`

Do not redesign the site during this pass. Preserve what a visitor sees and how it behaves, but do not reproduce implementation artefacts merely because they exist in the prototype. For example, if a section is currently inserted by JavaScript or old CSS from previous iterations remains in the repository, materialise the intended current experience cleanly in Astro instead.

## Requirements

Use Astro as the framework.

Produce a completely static website suitable for deployment to Amazon S3 and CloudFront. `npm run build` must produce the complete deployable site in `dist/`, with no server-side runtime dependency.

Use clean semantic HTML, organised CSS and only the JavaScript required for interaction. Avoid unnecessary client-side frameworks, islands or dependencies.

Reproduce the current prototype's:

- overall page structure
- section order
- vertical rhythm and spacing
- typography hierarchy
- content widths
- image proportions and positioning
- background treatments
- navigation behaviour
- buttons and calls to action
- accordion sheets and their opening behaviour
- scrolling and active-sheet positioning
- reveal transitions
- Highlight Reel video treatment and reset behaviour
- Highlight Ribbon lozenges and classic rosette treatment
- team and era selection section
- mobile and desktop responsive behaviour
- support and privacy pages

The current Wcricket-owned copy and assets may be carried across. If any third-party material is encountered for which Wcricket does not have appropriate rights, replace it with a clearly labelled placeholder rather than copying it.

Preserve existing public URLs where practical, especially `/`, `/support.html` and `/privacy.html`.

## Astro structure

Structure the project sensibly. Repeated site elements should become reusable Astro components rather than being duplicated. At minimum consider reusable components for:

- site header/navigation
- site footer
- accordion/story cards
- shared page layout

Keep styling centralised, understandable and easy to modify because Pass 2 will introduce final Wcricket branding, copy and design refinements.

## Responsive requirement

Treat mobile behaviour as a first-class requirement. Test conceptually at:

- iPhone-size portrait viewport
- larger mobile viewport
- tablet
- desktop

Do not simply shrink the desktop layout. Sections must reflow appropriately.

For accordion sections, opening or navigating to a section must position its top sensibly below the fixed navigation rather than leaving the user halfway through the newly opened section.

The current prototype has already been exercised successfully in Safari on iPhone, Chrome on iPhone and Safari on Mac. The Astro version should preserve the behaviour that made those checks successful, including the inline Highlight Reel playback and reset-to-opening-state behaviour when focus is lost or another accordion section is opened.

## Deployment readiness

Do not couple the Astro application to GitHub Pages or to any particular developer machine.

Keep environment-specific deployment configuration outside the application wherever practical.

This experiment is intended to feed a separate automated deployment pipeline. The website implementation itself should therefore have a simple, deterministic build contract:

```text
npm install
npm run dev
npm run build
```

The output of `npm run build` must be deployable by synchronising `dist/` to an S3 origin and serving it through CloudFront.

If deployment automation is added separately, it should be able to perform the build without modifying the application source. AWS authentication should use short-lived credentials such as GitHub OIDC rather than permanent AWS access keys.

## Working method

First analyse the supplied prototype and identify its major structural, responsive and interactive patterns.

Then implement the closest practical Astro equivalent.

Do not make major creative changes during this pass.

Where something in the prototype should not be carried across literally because it is an evolutionary artefact, implement the simplest clean equivalent that preserves the intended current behaviour and note the difference.

## Deliverables

Create the complete Astro project including:

- `package.json`
- `astro.config.mjs`
- `src/pages`
- `src/layouts`
- `src/components`
- organised styles
- static assets arrangement
- any required lightweight JavaScript

At the end, provide a short summary of:

1. the Astro project structure
2. the main reusable components
3. behaviours that require JavaScript
4. differences from the current prototype implementation
5. areas deliberately left easy to restyle during Pass 2
6. confirmation that `npm run build` produces a fully static `dist/` suitable for S3/CloudFront deployment

Pass 2 will introduce final Wcricket branding, content and design refinements. Keep this Pass 1 implementation clean, faithful and adaptable.
