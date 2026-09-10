# Motion Recipes

Implementation patterns for the fluidity principles in `SKILL.md`. Pick the recipe that matches the transition you need, then adapt it to your stack. Every recipe assumes the craft defaults at the bottom.

## Recipe index

| Transition need | Recipe | Web | SwiftUI | Compose |
|---|---|---|---|---|
| Overlay emerges from its trigger | Shared-element morph | `layoutId` (Framer Motion) / View Transitions API `view-transition-name` | `matchedGeometryEffect` | `SharedTransitionLayout` + `sharedElement` |
| Object travels between screens | Shared-element morph | same as above | `matchedGeometryEffect` across `NavigationStack` | `sharedBounds` |
| List reorders / regroups | FLIP layout animation | `layout` prop on each item, keyed by stable id | `.animation(.spring, value: order)` on `ForEach` | `animateItem()` in `LazyColumn` |
| Directional navigation | Slide keyed by direction | `AnimatePresence` with `custom={direction}` variants | `.transition(.move(edge:))` with edge chosen by direction | `slideIntoContainer(towards = ...)` |
| Stepped surface changes height | Height morph | animate the container's `height: auto` via layout animation or measured height | `.animation` on frame with `matchedGeometryEffect` | `animateContentSize()` |
| Label changes weight (Continue → Confirm) | Text morph | crossfade with `mode="popLayout"`; morph shared prefix if you have a text-morph utility | `.contentTransition(.interpolate)` | `AnimatedContent` with `SizeTransform` |
| Number changes | Numeric roll | animate value with a spring and format per frame; keep separators positioned | `.contentTransition(.numericText())` | `AnimatedContent` per digit |
| Progress indicator travels to result | Shared-element morph + destination badge | `layoutId` on the spinner | `matchedGeometryEffect` | `sharedElement` |
| Icon changes role (chevron → ×) | Path or rotation morph | rotate/crossfade the strokes; identical stroke width | `.contentTransition(.symbolEffect(.replace))` | `AnimatedContent` |
| Data view updates (chart, totals) | Interpolate values | animate path `d` / points, not swap components | `.animation` on data-driven shapes | `animateFloatAsState` per point |

## Shared-element morph (web, Framer Motion)

The one recipe to know cold. It covers trigger-to-overlay, object travel, and indicator travel.

```tsx
// The button and the sheet share a layoutId. When `open` flips, Framer
// measures both boxes and animates one into the other. Nothing duplicates:
// the button unmounts, the sheet mounts, and the user sees a single object.
<AnimatePresence>
  {!open && (
    <motion.button layoutId="confirm" onClick={() => setOpen(true)}>
      Delete budget
    </motion.button>
  )}
  {open && (
    <motion.div layoutId="confirm" role="dialog" aria-labelledby="confirm-title">
      <h2 id="confirm-title">Delete this budget?</h2>
      {/* content fades in slightly after the box morphs, so it never stretches */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
        ...
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

Rules that make this feel right:

- Keep the shared element's content from stretching: morph the container, crossfade the contents.
- Use a spring, not a duration, so the morph can be interrupted mid-flight (user taps close while it opens).
- The overlay's origin must be the trigger. If the trigger is off screen, open from the nearest edge instead of morphing from nowhere.

## Directional slide (web, Framer Motion)

```tsx
// direction: 1 = forward / rightward tab, -1 = back / leftward tab
const variants = {
  enter: (d: number) => ({ x: d * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d * -40, opacity: 0 }),
};

<AnimatePresence mode="popLayout" custom={direction} initial={false}>
  <motion.section key={step} custom={direction}
    variants={variants} initial="enter" animate="center" exit="exit"
    transition={{ type: "spring", stiffness: 400, damping: 40 }} />
</AnimatePresence>
```

Small travel distance plus opacity reads as motion without feeling like a slideshow. `initial={false}` stops the first render from animating in.

## FLIP regroup (web)

Give every row a stable `key` and the `layout` prop. When grouping changes, rows animate to their new positions; new group headers fade in; nothing else moves.

```tsx
{groups.map(g => (
  <motion.section key={g.id} layout>
    <motion.h3 layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{g.name}</motion.h3>
    {g.rows.map(r => <motion.li key={r.id} layout transition={spring}>{...}</motion.li>)}
  </motion.section>
))}
```

If rows are memoized components, keep the `key` on the same DOM node across modes. Changing the parent structure without stable keys remounts rows and the animation is lost.

## Native View Transitions (web, no library)

```ts
// Give persistent elements a view-transition-name, then wrap the state change.
document.startViewTransition(() => setState(next));
```

```css
.spending-total { view-transition-name: spending-total; }
::view-transition-old(root), ::view-transition-new(root) { animation-duration: 200ms; }
```

Good for route-level and list-level changes. Names must be unique per page; assign them only to elements that persist across the change.

## Craft defaults

- **Animate `transform` and `opacity`.** Animating `width`, `height`, `top`, `left`, or `box-shadow` forces layout and stutters. Use layout animations, which convert size changes into transforms under the hood.
- **Enter with ease-out, exit with ease-in, or use springs everywhere.** Springs are interruptible by default; durations are not. Anything a user can cancel mid-motion needs a spring.
- **Small UI moves fast.** Roughly 150 to 250 ms for local changes, 250 to 400 ms for surfaces and screens. Longer than that reads as slow, however pretty.
- **Exit animations exist.** A surface that animates in and vanishes instantly breaks continuity twice as hard. Mount and unmount through the same mechanism.
- **Interruptible by default.** Tapping during a transition should retarget, not queue. Never block input behind an animation.
- **Honor reduced motion.** Under `prefers-reduced-motion` (or the platform equivalent), collapse travel and morphs to short crossfades. Keep the continuity signal (the same object persists); drop the movement.
- **Motion is not a loading strategy.** If data is slow, show the persistent frame with the changing region in a skeleton state; do not stretch an animation to cover latency.
- **One motion vocabulary.** Same spring, same distances, same origins across the product. Inconsistent motion reads as glitchy, and glitchy motion erodes trust faster than no motion.
- **Test the interrupted path and the slow path.** Open and close mid-flight; run at 4x CPU throttling. A transition that only looks right at full speed is not finished.
