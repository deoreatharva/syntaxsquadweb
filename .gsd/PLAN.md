# PLAN.md — SYNTAX Portal Transition Implementation

> **Goal**: Seamless camera zoom into the SYNTAX letters, filling the viewport with emerald green, followed by a smooth slide reveal without any horizontal gaps or split-screen cuts.

## Architecture
A unified sticky viewport system (`height: 250vh` container with `sticky top-0 h-screen` stage):
1. **Stage 1 (Scroll Progress 0.0 → 0.50)**:
   - Front hero typography fades out cleanly (0.0 → 0.12).
   - "SYNTAX" SVG scales up along the focal glyph until the letter's green interior completely covers 100% of the viewport.
   - Portal slide content remains at `opacity: 0` (zero premature slide-ins, zero split lines).
2. **Stage 2 (Scroll Progress 0.50 → 0.75)**:
   - Viewport is 100% green.
   - Portal slide content ("We build, break, and win together" + ClubShowcase) fades in smoothly (`opacity: 0 → 1` with a subtle float-up `translateY: 20px → 0px`).
   - Pointer events activate at 0.70.
3. **Stage 3 (Scroll Progress 0.75 → 1.00)**:
   - Slide content is fully interactive and readable.
   - As the user scrolls past 1.0, the sticky stage naturally scrolls up into the `<AboutSection />`.

## Tasks

### Task 1: Refactor `GlyphPortal` Layout & DOM Structure
- **File**: `src/components/ui/glyph-portal.tsx`
- **Action**:
  - Keep `[data-gp-content]` inside the sticky viewport as an absolute overlay layer (`inset: 0`) rather than a trailing DOM sibling with `margin-top`.
  - Set `section` height to `calc(var(--gp-length) * var(--gp-height, 100svh))`.
  - Ensure `[data-gp-pin]` is `position: sticky; top: 0; height: var(--gp-height, 100svh); overflow: hidden;`.
  - Prevent any element from scrolling over the pin prematurely.

### Task 2: Calibrate Scroll Progress & Reveal Timing
- **File**: `src/components/ui/glyph-portal.tsx`
- **Action**:
  - Re-scale travel to match the full sticky duration: `travel = H * (length - 1)`.
  - Set zoom curve:
    - `0.0 → 0.55`: Pure glyph scale-up until letter ink covers viewport.
    - `0.55 → 0.80`: Smooth fade-in of slide content (`opacity: smooth(0.55, 0.80, p)`).
    - `0.80 → 1.00`: Slide is settled, interactive, and readable.
  - Enable `pointer-events: auto` only when `p >= 0.75`.

### Task 3: Tune `scrollLength` in `page.tsx`
- **File**: `src/app/page.tsx`
- **Action**:
  - Set `scrollLength={2.4}` to provide ample, luxurious scroll room for the zoom flight and slide reading before moving into AboutSection.

### Task 4: Empirical Build & Verification
- **Command**: `npm run build`
- **Action**: Verify clean compilation, static export, and absence of layout shift.
