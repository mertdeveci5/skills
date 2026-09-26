# Family Motion Spec (measured)

These numbers come from the Family app itself, not from taste. Each value was measured frame by frame from the screen recordings in [Family Values](https://benji.org/family-values) (60fps, iPhone at 3×): a tracked edge or glyph per frame, fitted to a damped spring or a cubic-bezier tween. Every web value was then checked by driving [the components](components/) in Chromium and fitting the browser's per-frame output with the same models.

Springs use mass 1. `response` is SwiftUI's (2π/√stiffness); Compose takes `stiffness` and `dampingRatio` directly.

## Constants

| Name | Used for | Web (Motion) | SwiftUI | Compose | Family data | Lab check |
|---|---|---|---|---|---|---|
| `SPRING` | Tray height, content scale, text-morph glide, shared elements | `stiffness: 540, damping: 41` | `.spring(response: 0.27, dampingFraction: 0.88)` | `spring(dampingRatio = 0.88f, stiffness = 540f)` | 11 tray transitions: stiffness 480–614, ratio 0.85–0.90; settles ≈0.28s with <1pt overshoot | fit 540 / 0.884 |
| `SPRING_PRESENT` | Tray entering and leaving | `stiffness: 800, damping: 50` | `.spring(response: 0.22, dampingFraction: 0.88)` | `spring(0.88f, 800f)` | fit 780–840 / 0.89; starts fully off-screen | same trajectory from 212pt to rest, within ~1 frame |
| `SPRING_SNAPPY` | Number re-centering | `stiffness: 1100, damping: 63` | `.spring(response: 0.19, dampingFraction: 0.95)` | `spring(0.95f, 1100f)` | fit 1133 / 0.94 | fit 1100 / 0.948 |
| `SPRING_FLASH` | Tab-switch travel | `stiffness: 2000, damping: 68` | `.spring(response: 0.14, dampingFraction: 0.76)` | `spring(0.76f, 2000f)` | incoming from ≈25pt, settled ≈0.1s | from 24pt, 99% opaque at 83ms |
| `RISE` | New digit or comma rising into the line | `duration: 0.26, ease: [0.16, 1, 0.3, 1]` | `.timingCurve(0.16, 1, 0.3, 1, duration: 0.26)` | `tween(260, easing = CubicBezierEasing(0.16f, 1f, 0.3f, 1f))` | per-frame decay ≈0.63, fit rms 0.45pt | 74 → 49 → 30 → 19 → 12pt vs Family 69 → 43 → 29 → 18 → 11pt |
| `DROP` | Old digit or comma leaving the line | `duration: 0.2, ease: [0.42, 0, 1, 1]` | `.timingCurve(0.42, 0, 1, 1, duration: 0.2)` | `tween(200, easing = CubicBezierEasing(0.42f, 0f, 1f, 1f))` | 0.3 → 3 → 7.7pt over the first 3 frames | 0.8 → 3.2 → 7.3pt |
| `BACKDROP` | Dim behind trays | black at 30%, `duration: 0.2`, ease-out | same | same | 253 → 178 luminance (= 30% black) over 12 frames | 0 → 0.3 in ≈0.2s |
| `CONTENT_EXIT` | Old tray content | opacity → 0 in 0.12s, slight blur | same | same | gone ≈8 frames after the swap | gone at 7 frames |
| `CONTENT_ENTER` | New tray content | opacity 0 → 1 in 0.18s; scale 0.90 → 1 on `SPRING`, origin at the content's center | same | same | title 0.962, 0.977, 0.983, 0.988, 0.994 at frames 6–10 | 0.970, 0.979, 0.986, 0.991, 0.994 |
| `GLYPH_FADE` | Letters added or removed in a text morph | `duration: 0.2`, ease-out | same | same | ≈0.9 opacity at 170ms | 0.96 at 167ms |

## Geometry and behavior

- **Tray:** inset 16pt from the sides; bottom at the safe-area inset (34pt on the recorded iPhone), never less than 16pt. Continuous corner radius ≈36pt. The bottom edge stays fixed and the top edge moves, so content is anchored to the top and the height grows upward.
- **Tray step change:** old and new content overlap in the same top-anchored spot. The old content is gone before the height finishes moving, and the new content keeps growing into place as the tray settles. The × never moves.
- **Tab switch:** incoming content starts ≈24pt toward the tapped tab and slides in while the old content drifts the other way. Both crossfade in ≈0.1s.
- **Text morph:** letters are matched by longest common subsequence, not by position or by occurrence. Matched letters glide; removed letters fade out *where they stood* (they don't ride the re-centering); added letters fade in at their final spots.
- **Number entry:** digits are identified by typing order (position from the left). A new digit rises through a soft mask at the bottom of the line while the whole number re-centers on `SPRING_SNAPPY`. Separators are identified by how many digits precede them, so a grouping change drops the old comma (in place, with `DROP`) and raises a new one about 60ms later.
- **× ↔ ‹ (full-screen flows):** the two strokes of the × pivot into the two strokes of the chevron in about 0.1s, alongside the screen transition.
- **Result handoff:** the Confirm button collapses in place into a spinner, then that same spinner travels and shrinks into the tab where the pending item now lives (≈0.25s).

## How the numbers were taken

1. Download each video from the essay and decode it at 60fps.
2. Track the moving thing per frame: the tray's top edge along a column inside its padding, a glyph's bounding columns, a title's width, the backdrop's luminance at a fixed pixel.
3. Drop duplicated capture frames and normalize to 0–1 progress.
4. Fit a unit-step spring response (stiffness, damping, start offset) and a cubic-bezier tween (control points, duration), and keep whichever explains the curve.
5. Rebuild the transition in the browser, sample `getBoundingClientRect` and computed opacity on every animation frame, and fit the same model to confirm it matches.

When adding a new Family-style transition, measure it the same way before choosing values. Numbers eyeballed from a GIF are usually wrong in the tail, and the tail is where "feel" lives.
