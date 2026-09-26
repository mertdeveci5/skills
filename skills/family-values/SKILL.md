---
name: family-values
description: Design, build, or review polished user interfaces using gradual revelation, purposeful continuity, and selective delight. Use for requests to make a UI feel fluid, intuitive, seamless, or delightful; improve motion, micro-interactions, onboarding, sheets/trays, empty states, or multi-step flows; or review product experience quality. Do not use merely for visual restyling with no interaction or product-flow concern.
---

# Family Values

Use this design sensibility to make a complex product feel welcoming without making it shallow. It is adapted from Benji Taylor's [Family Values](https://benji.org/family-values): **simplicity** protects attention, **fluidity** preserves orientation, and **delight** makes important moments feel considered. Underneath all three is one idea: respect the user's time, intelligence, and sense of place.

These are lenses for judgment, not a checklist and not a mandate for more animation. Preserve the product's intent, established design system, performance budget, and accessibility requirements. A fast, direct change beats motion that explains nothing. Utility, performance, and security are table stakes and come before any of this.

When a concrete precedent would help, read [the case studies](references/case-studies.md). They describe roughly fifty real interactions from the essay's videos, each with the transferable idea. When implementing motion, read [the motion recipes](references/motion-recipes.md).

## Start With the Interaction

Before proposing or implementing a meaningful flow, sketch its map:

- the user's goal and the one action that matters on this surface;
- the trigger, the resulting state, and **what stays the same**;
- whether the user is moving forward, backward, sideways, deeper, or seeing an in-place update;
- where the result of the action will live afterwards;
- the cancellation, error, loading, first-run, and reduced-motion paths.

For a multi-step or high-stakes flow, state this map in your response or implementation notes. Do not invent a new motion library, visual language, or transition system when the existing stack already has the right primitive.

## Simplicity: Reveal Only What Matters Now

Keep the fundamentals within reach. Reveal depth when it becomes relevant.

- **One job per surface.** Each step carries one piece of content or one primary decision. Break intimidating actions (setup, onboarding, confirmations, destructive actions) into small, clearly different steps.
- **Transient vs. committed.** Use a sheet, tray, popover, or drawer for contextual, temporary work: confirmations, warnings, pickers, explanations, short forms. Give the task a committed full screen only when it needs a durable place. A small surface signals the task is small. A transient surface can also be an on-ramp that grows into a full-screen flow when the task turns out to be bigger.
- **Arise from context.** Transient surfaces should appear where the action happened. Ideally they grow out of the trigger, with the affected object still visible behind them. Warnings and confirmations belong at the point of risk.
- **Make adjacent steps look different.** If two steps could be mistaken for each other, change their height, hierarchy, or shape, not just a label. Rewriting copy to make the difference visible is legitimate design work.
- **One way back.** Give every temporary surface a concise title and one obvious control that closes the first step and goes back on later ones. Match its theme to the surrounding flow.
- **Explain in place.** Put help next to the thing it explains (an info icon that opens a small layer). It should dismiss back to exactly where the user was.
- **Teach inside the flow.** Put first-run education inside the real flow, show it once, then remove it. Tell users what the next step will ask before it asks.

Think of the product as connected rooms seen through open doorways. Map the whole tree of paths, then design each node to show only its immediate branches. The user sees enough of the next room to choose it and discovers the details on entering.

## Fluidity: Make State Changes Legible

Motion earns its place when it answers "what changed, and how did I get here?" The product should behave as if it has unbreakable physical rules. Know how and why a transition makes sense before adding it.

- **Consistent space.** Going deeper, returning, and switching between ordered peers each get a direction that matches the information architecture. Tabs to the left arrive from the left: fly, don't teleport.
- **Persistent identity.** If an object exists before and after a transition, it is one object. Let cards, rows, values, buttons, and indicators travel or morph. Never duplicate, re-mount, flash, or replay them.
- **Objects carry meaning forward.** The amount typed becomes the amount shown on the confirmation screen. The selected item becomes the header of the next step. A card the user just handled can shrink into the progress indicator for the next step.
- **Show where results go.** When work leaves the screen (a submission, a background job, an upload), animate its indicator to where the user will find it later. When the user acts on an existing thing, let the change visibly land on that thing.
- **Animate only what changed.** If one word, number, row, or group changed, keep everything else still. Morph shared text so the differing part draws the eye. Let a button's label summarize progress ("Add 2 items") and escalate in weight when the stakes change (Continue → Confirm).
- **Morph only for real relationships.** Use a morph when one thing becomes another: a trigger becoming a sheet, an item opening into its detail. Otherwise use the quietest transition that preserves orientation, including an instant update when nothing needs explaining.
- **Coherent interruption.** Entry, exit, cancel, and reversal all work. Input stays live, and a second action retargets or reverses the motion rather than waiting behind it.
- **Loading is loading.** Keep the stable frame and show pending work in the changing region. Interpolating data (a chart morphing between ranges) feels faster than blanking and redrawing, but never stretch motion to hide latency.

**The removal test.** Picture the interaction with its motion removed. If the static version makes the user re-find the object, re-read the screen, or doubt the outcome ("digital whiplash"), the motion is doing structural work and should stay. If nothing is lost, the motion is decoration: make it quieter or delete it.

A fluid product is the sum of many small, consistent decisions. One impressive transition does not make it, and one glitchy transition can undo it: users read janky motion as the product not understanding them.

## Delight: Spend Emphasis Where It Counts

Delight is selective emphasis, not decoration. It shows that the product values how people feel, not just what they get done.

- **Delight-Impact Curve.** The potential for delight rises as feature frequency falls. Surprise fades with repetition, so intensity should scale inversely with how often a surface is seen.
- **Graded, never absent.** Hot paths get quiet craft: responsive feedback, separators that slide into place, satisfying drag and drop. Rare, consequential moments get ceremony: account or object creation, finishing a tedious chore, first use. Nothing gets neglect.
- **Ceremony that teaches.** The best big moments also explain what just happened and why it matters. Follow a celebration with the lasting result (a badge, a checked state) so the reward means something.
- **Surprise in plain sight.** Put easter eggs on moderately used surfaces, where they get discovered without becoming noise. They reward curiosity and never block the task.
- **Delight that informs.** Prefer effects that also communicate state: a shimmer that says hidden values are still live, an arrow that flips with the sign of a change, an empty state that points at the next action.
- **Playful edges stay truthful.** An error the user pokes at on purpose can answer with wit (escalating copy), but it stays accurate and still prevents the bad action.
- **Polish parity.** Users notice the neglected corner, and it lowers their trust in everything else ("a fancy restaurant with a dirty bathroom"). Rare settings, error paths, empty states, and explanations get the same care as the home screen.

## Smells Worth Questioning

These are prompts to look closer, not bans:

- A confirmation or warning that takes over the full screen and hides the thing it is about.
- Two consecutive steps with the same shape and only a changed heading.
- A component that is visible before and after a transition but blinks, re-enters, or appears twice mid-animation.
- Tabs, steps, or back navigation that move in a direction that contradicts the structure.
- A result that disappears on submit with no hint of where it went.
- The whole view re-rendering when one value changed; a chart that blanks to a spinner between ranges.
- A primary button whose label no longer describes what it will do.
- Uniform celebration on a daily action, or no acknowledgement at all of a rare, important one.
- A carefully crafted main flow next to an unstyled error, empty, or settings state.
- Motion that blocks input, can't be interrupted, or only looks right at full speed on a fast device.

## Craft Baseline

- Respect `prefers-reduced-motion` and platform equivalents: collapse travel and morphs into short crossfades, but keep the continuity signal (the same object persists).
- Favor compositor-friendly properties and the stack's existing layout-transition primitives. Keep local motion quick and interruptible. Test on slow devices and on the interrupted path.
- Never rely on motion alone to convey meaning. State, focus, labels, semantics, contrast, and keyboard behavior must be correct without it, and focus should move into and back out of temporary surfaces.
- Reuse the product's timing, easing, spacing, and component primitives. A coherent vocabulary matters more than any single clever animation.

## Delivering the Work

When building, implement the smallest set of changes that noticeably improves the flow. Then exercise the normal, interrupted, error/loading, first-run, and reduced-motion paths that apply.

When reviewing, walk the flow step by step (reading code, screenshots, or recordings) and prioritize findings in this order:

1. Confusing hierarchy, hidden intent, or lost context.
2. State changes that jump, duplicate, or contradict spatial logic; results that vanish.
3. Motion that harms performance, accessibility, or responsiveness.
4. Delight that is misplaced, repetitive, or missing from a meaningful moment; uneven polish.

For each finding, name the interaction, its effect on the user, and a proportionate recommendation. Cite a precedent from the case studies when it makes the fix concrete. Do not prescribe a visual style the user did not ask for.
