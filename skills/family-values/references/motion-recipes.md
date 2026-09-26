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
| Stepped sheet (tray) flow | Tray stack with height morph | layout-animated container + keyed step content + direction | `.presentationDetents` / measured height + `.transition` | `animateContentSize()` + `AnimatedContent` |
| Result leaves the screen | Result handoff | `layoutId` shared between button spinner and nav badge | `matchedGeometryEffect` into tab item | `sharedElement` into nav item |
| Typed number gains separators | Keyed characters | key digits by position from the right; `layout` on each | `.contentTransition(.numericText())` | `AnimatedContent` per char |

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

## Tray stack (web, Framer Motion)

One persistent container; the steps swap inside it. The container's height morphs, so adjacent steps read as different rooms. The header icon is × on the first step and ← afterwards.

```tsx
const [[step, dir], setStep] = useState<[number, number]>([0, 0]);
const go = (next: number) => setStep([next, next > step ? 1 : -1]);

<motion.div layout role="dialog" aria-labelledby="tray-title"
  transition={{ type: "spring", stiffness: 500, damping: 45 }}
  style={{ borderRadius: 28, overflow: "hidden" }}>
  <header>
    <h2 id="tray-title">{steps[step].title}</h2>
    <button aria-label={step === 0 ? "Close" : "Back"}
      onClick={() => (step === 0 ? onClose() : go(step - 1))}>
      <MorphIcon shape={step === 0 ? "close" : "back"} />
    </button>
  </header>
  <AnimatePresence mode="popLayout" custom={dir} initial={false}>
    <motion.div key={step} custom={dir} variants={slide}
      initial="enter" animate="center" exit="exit">
      {steps[step].body}
    </motion.div>
  </AnimatePresence>
</motion.div>
```

- `layout` on the container animates height as a transform; `borderRadius` in `style` keeps corners from distorting.
- If two steps have nearly the same height, fix the content (copy, grouping, an illustration), not the animation.
- Escalating to full screen is the same container animating to the viewport's bounds, not a route change that swaps it out.

## Text morph with shared letters

Diff the old and new strings and keep the common prefix (and suffix) mounted, so only the differing characters enter and exit.

```tsx
function MorphText({ text }: { text: string }) {
  // Key each character by its occurrence ("n-0", "n-1") so shared letters keep identity.
  const seen: Record<string, number> = {};
  const chars = [...text].map(c => ({ c, id: `${c}-${(seen[c] = (seen[c] ?? -1) + 1)}` }));
  return (
    <span aria-label={text} style={{ display: "inline-flex" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        {chars.map(({ c, id }) => (
          <motion.span key={id} layout aria-hidden
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}>
            {c === " " ? " " : c}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}
```

"Continue" → "Confirm" keeps C, o, n (and the remaining shared letters glide to new positions). Use it for labels whose *weight* changes, counters in labels ("Add 2 Wallets"), and status pills ("Analyzing Transaction" → "Transaction Safe"). Keep the accessible name on the parent so screen readers get the whole word once.

## Result handoff (object travels to where it will live)

When an action completes off-screen work, animate its indicator to the place the user will find the result: a tab, an inbox badge, the original item.

```tsx
// The spinner in the confirm button and the badge on the Activity tab share a layoutId.
{status === "submitting" && <motion.span layoutId="pending" className="spinner" />}
// …after dismissal, the same id renders inside the tab bar:
<Tab icon={<Clock />}>{hasPending && <motion.span layoutId="pending" className="badge-spinner" />}</Tab>
```

Both nodes must be in the same React tree, and only one should be mounted at a time; if the source unmounts with its sheet, keep it inside `AnimatePresence` so the handoff has a starting box. If the destination is not on screen, end with a short, directional exit toward it and a badge that appears at the destination.

## Separators that slide (number entry)

Key each digit by its position from the *right*, so typing a new digit shifts the existing digits and separators instead of re-rendering them.

```tsx
const formatted = new Intl.NumberFormat().format(value); // "10,000"
const chars = [...formatted].reverse().map((c, i) => ({ c, key: `${i}-${c === "," ? "sep" : "d"}` })).reverse();
// Render with <motion.span key={key} layout> inside AnimatePresence mode="popLayout".
```

Use `font-variant-numeric: tabular-nums` so widths stay stable while characters move.

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
