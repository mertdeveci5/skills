# Motion Recipes

Tested, Family-accurate building blocks for the fluidity principles in `SKILL.md`. The [components](components/) are React + [Motion](https://motion.dev), tested with `motion` 13.4 and React 19 (the glyph components rely on React 19 passing `ref` as a prop). Every value in them was measured from Family's own recordings and re-verified in the browser. See [the motion spec](motion-spec.md) for the data and for SwiftUI and Compose equivalents.

**Use these files instead of writing a new variant.** Copy the ones you need, together with `motion-spec.ts` and (for text or numbers) `Glyphs.tsx`, into the project, then restyle colors, fonts, and spacing to the product's design system. Don't change the motion constants unless you have measured something better. Approximations (a guessed duration, `ease-in-out`, a different key scheme) are exactly what makes a copy feel "off".

On other stacks, port the behavior and constants from the spec rather than inventing new ones.

## Setup (once)

```tsx
import { MotionConfig } from "motion/react";

// Respect the OS "reduce motion" setting: travel and scale are dropped, fades remain.
<MotionConfig reducedMotion="user">
  <App />
</MotionConfig>
```

## Index

| Need | Component | Family precedent |
|---|---|---|
| Transient task, confirmation, warning, picker, or explanation | `Tray` | Options → Private Key; Remove Wallet warning; refuel flow |
| A button label whose meaning or weight changes | `MorphText` | Continue → Confirm; "Add 1 Wallet" → "Add 2 Wallets" |
| Typed amount with grouping separators | `AmountText` | Send amount $100 → $1,000,000 |
| Switching between ordered peers (tabs, segments) | `DirectionalSwap` | Bottom tabs, "we fly instead of teleport" |
| Leading icon of a full-screen stepped flow | `CloseBackIcon` | × on the first step, ‹ afterwards |
| Work that leaves the screen and lands somewhere | `PendingAction` / `PendingBadge` | Confirm → spinner → Activity tab |
| Anything else that moves between two layouts | `layout` / `layoutId` with `SPRING` from `motion-spec.ts` | Wallet cards travelling between screens |

## Tray

```tsx
const [open, setOpen] = useState(false);
const [view, setView] = useState<"options" | "privateKey">("options");

<Tray
  open={open}
  view={view}
  onClose={() => setOpen(false)}
  onBack={view === "options" ? undefined : () => setView("options")}
  labelledBy="tray-title"
>
  {view === "options" ? <OptionsStep onViewKey={() => setView("privateKey")} /> : <PrivateKeyStep />}
</Tray>
```

- Each `view` is one step with one job. Change `view` to move between steps: the tray springs to the new height while the old content fades out and the new content scales up from 0.90.
- Make adjacent steps clearly different heights. If two steps come out nearly the same, change the content (copy, grouping, an illustration), not the animation.
- The × closes on the first step and goes back on later steps (pass `onBack`). The backdrop always closes the whole tray.
- Give each step a heading with the `id` you pass as `labelledBy`. Focus moves into the tray, stays inside across steps, Escape acts like the ×, and focus returns to the trigger on close.
- Use `theme="dark"` inside dark flows.
- To grow a tray into a full-screen page, animate the same element to the page's bounds with `layoutId` and `SPRING`. Don't swap it for a route change.

## MorphText

```tsx
<button>
  <MorphText text={step === "review" ? "Confirm" : "Continue"} />
</button>
<MorphText text={`Add ${count} ${count === 1 ? "Wallet" : "Wallets"}`} />
```

- Letters shared in order glide, removed letters fade out where they stood, and new letters fade in where they land. Screen readers get the whole string once.
- Use it where the change *means* something: the weight of an action, a running count, a status ("Analyzing Transaction" → "Transaction Safe"). Don't morph every label.
- Only the changed letters draw the eye, so keep the stable words stable ("Add 2 Wallets" → "Import 2 Wallets", not a new sentence).

## AmountText

```tsx
// `value` is the raw typed string: digits and an optional ".".
<div style={{ font: "700 64px/1 system-ui", textAlign: "center" }}>
  <AmountText value={typed} prefix="$" />
</div>
```

- Pass what the user typed, not a formatted number. The component groups digits itself (every three digits, using the locale's separator) and keeps identities stable: digits by typing order, separators by how many digits come before them.
- The line has a soft mask at the bottom (built in, with padding so commas aren't clipped at rest); glyphs rise in and drop out through it.
- Pair it with the secondary value (for example the token amount below) updating in place, and show errors like "Not enough ETH" as a fade-in line underneath rather than by shaking the number.

## DirectionalSwap

```tsx
<DirectionalSwap index={activeTab}>{pages[activeTab]}</DirectionalSwap>
```

- The index decides direction: a higher index arrives from the right. It's a ~0.1s flash of direction, not a page slide. Keep it that short.
- Use it only for ordered peers. Going deeper uses a push or a tray; going back reverses whatever brought you here.

## CloseBackIcon

```tsx
<button aria-label={step === 0 ? "Close" : "Back"} onClick={step === 0 ? onClose : back}>
  <CloseBackIcon shape={step === 0 ? "close" : "back"} />
</button>
```

For full-screen stepped flows. The strokes pivot between × and ‹ in step with the screen transition. Keep the button's `aria-label` in sync.

## Result handoff

```tsx
// Bottom of the confirmation screen. Unmount it in the same commit the badge mounts.
{stage !== "done" && (
  <PendingAction id="pending-tx" pending={stage === "submitting"} onClick={submit} spinnerColor="#fff">
    <FaceIdIcon /> Confirm
  </PendingAction>
)}

// In the tab bar
<span className="tab-icon">{stage === "done" ? <PendingBadge id="pending-tx" /> : <ClockIcon />}</span>
```

- `PendingAction` is one element: its width springs down to a circle (real width, not a scale transform, so the spinner stays centered and round), the label fades, the fill fades out, and a spinner in `spinnerColor` fades in. Set `spinnerColor` to contrast with the surface *behind* the button.
- When the work leaves the screen, unmount `PendingAction` and mount `PendingBadge` with the same `id` in one state change. The spinner itself travels and shrinks into place; never render both at once.
- Fade the screen the button lived on (opacity on a layer, ~0.22s) while the spinner travels, so the user sees where it lands.
- The destination should be where the user will find the result later: a tab, an inbox, the original item. When the user acts on an existing item (for example speeding up a pending transaction), send the spinner back to that item.

## Other shared-element transitions

For cards, rows, and other objects that exist before and after a transition, use Motion's `layoutId` (across components) or `layout` (within one), with `transition={SPRING}` from `motion-spec.ts`:

- Morph the container and crossfade its contents; don't let text stretch.
- Keep the same `key` or `layoutId` on the same object across both states. Remounting breaks continuity.
- Regrouping lists (Family's wallet grouping): give every row a stable `key` and `layout`, and let new group headers fade in.

## Craft defaults

- **Springs for anything interruptible.** Every constant above except the fades and the number rise/drop is a spring, so a second tap retargets mid-flight instead of queueing.
- **One vocabulary.** Use `SPRING` for almost everything that moves, `SPRING_PRESENT` for trays entering and leaving, `SPRING_SNAPPY` and `RISE`/`DROP` for numbers, `SPRING_FLASH` for tabs. Mixing in ad-hoc durations is what makes motion feel glitchy.
- **Exits exist.** Everything that animates in animates out through the same mechanism.
- **Motion never hides latency.** If data is slow, keep the frame stable and show the pending region; don't stretch an animation.
- **Test the interrupted and slow paths.** Tap again mid-transition, type fast, and run at 4× CPU throttling.
