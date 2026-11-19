# SPEC.md — SYNTAX Portal Transition Specification

> **Status**: `FINALIZED`
>
> ⚠️ **Planning Lock**: Spec locked for implementation.

## Vision
Transform the initial hero "SYNTAX" portal into a buttery-smooth, cinematic zoom transition where scrolling seamlessly flies the visitor *inside* the letters of SYNTAX, filling the viewport with the vibrant emerald field, and then elegantly revealing the club story & photo showcase slide without any awkward cuts, gaps, or split-screen glitches.

## Current Bugs & Root Causes
1. **Split-Screen Horizontal Cut / Gap**:
   `[data-gp-content]` was rendered as a static block below `[data-gp-pin]` with `margin-top: calc((length - 1) * 100vh)`. Because `scrollLength` was 1.4, the content box began sliding up from the bottom of the screen at just 28% scroll progress, cutting the zooming letters in half with a harsh horizontal seam.
2. **Abrupt Opacity / Transition Flash**:
   Content opacity was fading in prematurely before the zoom had completed, exposing intermediate backgrounds.
3. **Scroll Travel Mismatch**:
   The travel calculation and sticky pin unpinning were out of sync, causing the zoom to feel either rushed or jarringly interrupted.

## Goals
1. **Seamless Camera Flight**: Scrolling from the top must smoothly scale the "SYNTAX" typography so the user feels like they are flying directly inside the green letter.
2. **Zero Split Seams**: While zooming, the viewport must remain 100% clean—no content or background boxes may slide up from the bottom to cut off the letters.
3. **Pristine Reveal**: The second slide ("We build, break, and win together" + Club Photo Showcase) must only reveal *after* the camera has entered the green field.
4. **Natural Continuation**: Once the slide is revealed, continuing to scroll must naturally move into the "About" section with zero layout jumping.
5. **Mobile & Reduced Motion Safety**: Graceful fallback on phones and for users with `prefers-reduced-motion`.

## Non-Goals (Out of Scope)
- Modifying the text content or photos of the club showcase.
- Changing sections below the portal (About, What We Do, Achievements, etc.).
- Adding external canvas/WebGL libraries (Three.js). We use high-performance SVG clipPath + CSS/RAF transforms.

## Constraints
- Must work with Lenis smooth scroll without frame-lag.
- Must prerender statically on GitHub Pages (`npm run build`).
- Must maintain mobile touch responsiveness.

## Success Criteria
- [ ] No horizontal seam or split-screen line visible during scroll.
- [ ] Letters scale up smoothly until the emerald green field fills 100% of the viewport.
- [ ] Content (story + showcase) smoothly emerges inside the green room with zero glitching.
- [ ] Subsequent scroll smoothly rolls into `<AboutSection />`.
- [ ] `npm run build` succeeds with 0 TypeScript/Turbopack errors.
