# Wcricket.live V1 static website

This folder is a deployable static implementation of the supplied Wcricket launch website brief.

## Files
- `index.html` – single scrolling marketing homepage with an interleaved expandable content stack
- `support.html` – App Store support destination
- `privacy.html` – privacy destination
- `css/styles.css` – all site styling
- `js/main.js` – mobile navigation, year, sticky header, restrained reveal animation and the interleaved panel behaviour
- `assets/` – supplied launch imagery used by the site

## Interleaved homepage behaviour
The middle content sections are now presented as a stacked, interleaved set of panels.
- On desktop, moving the cursor over a panel opens it.
- On touch devices, tapping a panel opens it.
- The hero and final call-to-action remain fully open.

## Before publishing
1. Replace every “Coming soon on the App Store” treatment with Apple’s official badge and the final App Store URL once available.
2. Confirm the support email and add it to `support.html`.
3. Replace the hold notice in `privacy.html` with the approved Wcricket privacy policy. No privacy wording was included in the supplied pack.
4. Confirm rights/provenance for the On This Day asset before external publication.
5. If the team wants a reel, create and approve the specified 20–30 second web edit before adding it. The supplied 75–80 second POC has deliberately not been published here.
6. Review current screenshot match states and recapture if desired before launch.

## Deployment
Upload the folder contents to the web root for `wcricket.live`. No build step, package manager, framework or server-side runtime is required.

The current HTML uses `.html` filenames. On most static hosts, configure clean routes if you want `/support` and `/privacy` rather than `/support.html` and `/privacy.html`.


## Interaction refinement
- Sheet 4 now shows the complete tall 100-partnership milestone screenshot rather than cropping it.
- Desktop hover-to-open now requires a short deliberate hover over a panel header, so simply moving the pointer down the page does not immediately jump to the next sheet.
- Click/tap and keyboard focus still open a sheet immediately.


## Sheet 5 viewport refinement
- Opening the final accordion sheet now gently repositions its header near the top of the viewport.
- This prevents the final panel opening half off-screen with the sales call-to-action occupying the lower half of the view.
- The behaviour applies only to the last sheet; the earlier sheets retain the normal accordion interaction.


## Accordion viewport alignment
- Every accordion sheet now aligns its top edge immediately beneath the fixed navigation bar after opening.
- Alignment happens after the open/close transition, avoiding the layout shift that previously left sheet 5 partly above the viewport.
- The same rule applies to all five sheets for predictable behaviour.


## V5 — word-puzzle concept explainer
- Sheet 1 now teaches the core proposition without referring to any third-party word-game brand.
- The page describes a daily word challenge / word-puzzle result as the input to Wcricket.
- A compact visual flow shows: result → Wcricket cricket event → continuing innings.
- Copy explicitly notes that cricket rules, decisions and chance shape the outcome, avoiding the impression of a fixed one-to-one conversion.

## V9 teaser update
- Sheet 5 uses the actual Highlight Ribbon screenshot as a clean static product card.
- The player no longer overlays the card itself.
- A 24.5-second functional teaser begins with the opening title frame for context.
- The known rogue final Archer comment is excluded from the teaser.


## V10 teaser refinements
- Opening title frame is visible before playback with an explicit play icon.
- Opening title frame held for 1.2 seconds.
- Audio cuts rebuilt around detected silence boundaries with short fades to avoid clipped words/clicks.
- Retains a compact Highlight Ribbon reference so the lozenge/match-state design remains visible.
- Current source reel does not contain the requested Olivia innings-closure screen; ending remains on the last clean pre-closure highlight available in the supplied source.


## V11 mobile reel refinement
- Replaced modal playback with a direct inline HTML5 video element for stronger iPhone/Safari reliability.
- Enlarged the Highlight Ribbon reference, especially on mobile.
- Added reel-style highlight lozenges to the website body content.
