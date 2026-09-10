---
name: family-values
description: Design, build, or review polished user interfaces using gradual revelation, purposeful continuity, and selective delight. Use for requests to make a UI feel fluid, intuitive, seamless, or delightful; improve motion, micro-interactions, onboarding, or multi-step flows; or review product experience quality. Do not use merely for visual restyling with no interaction or product-flow concern.
---

# Family Values

Use this design sensibility to make a complex product feel welcoming without making it shallow. It is adapted from Benji Taylor's [Family Values](https://benji.org/family-values): simplicity protects attention, fluidity preserves orientation, and delight makes important moments feel considered.

These principles guide decisions; they are not a mandate to add animation or ceremony everywhere. Preserve the product's intent, established design system, performance budget, and accessibility requirements. A fast, direct change is better than motion that does not explain anything.

## Start With the Interaction

Before proposing or implementing a meaningful flow, identify:

- the user's goal and the one action that matters on this surface;
- the trigger, resulting state, and what remains the same;
- whether the user is moving forward, backward, sideways, or simply seeing an in-place update;
- cancellation, error, loading, and reduced-motion behavior.

For a multi-step or high-stakes flow, state this interaction map in the response or implementation notes. Do not invent a new motion library, visual language, or elaborate transition system when the existing stack or product conventions already provide the right primitive.

## Simplicity: Reveal Only What Matters Now

Keep the fundamentals within reach, and reveal depth when it becomes relevant.

- Give each surface one primary job. Break intimidating actions—setup, onboarding, confirmations—into focused, comprehensible steps.
- Prefer progressive disclosure to an always-visible inventory of controls. The next option should appear because of what the user just did, not because it was available.
- Use a sheet, drawer, popover, or other transient surface when the task is contextual and temporary; use a committed destination when it needs a durable place of its own.
- Let transient surfaces arise from their trigger or current context. Preserve the user's sense of where they were instead of replacing it unnecessarily.
- Make adjacent steps visibly distinguishable. If two stages could be mistaken for each other, change their content, hierarchy, or shape—not just a label.
- Give temporary surfaces a concise purpose and an obvious, accessible way to dismiss or go back. Match their visual theme to the surrounding context.

Think of the product as connected rooms: a user sees enough of the next room to choose it, then discovers the details as they enter.

## Fluidity: Make State Changes Legible

Motion earns its place when it answers “what changed, and how did I get here?” The interface should have consistent physical rules, but it should never make a user wait for decoration.

- Encode spatial relationships consistently: moving into a detail, returning, and switching between ordered peers should each have a direction that matches the information architecture.
- When an object persists across a transition, keep it recognizably the same object. Let cards, controls, indicators, and relevant text travel or morph; do not briefly duplicate, reset, or replay them.
- Animate the changed region, not the entire surface. If one word, value, row, or grouping changed, keep the rest stable.
- Use a morph only when a meaningful relationship exists—such as a trigger becoming a sheet or an item opening into its detail. Otherwise use the quietest transition that preserves orientation, including an instant update when no explanation is needed.
- Make entry, exit, interruption, and cancellation coherent. Inputs remain usable; a second action retargets or reverses a transition rather than queueing it behind an animation.
- Treat loading as loading. Keep the stable frame and communicate pending work; never stretch motion to disguise latency.

For concrete implementation patterns—shared elements, directional slides, FLIP reordering, text and numeric transitions—read [the motion recipes](references/motion-recipes.md) only when implementing motion. Adapt a recipe to the existing stack rather than copying it blindly.

## Delight: Spend Emphasis Where It Counts

Delight is selective emphasis, not decoration.

- Scale intensity inversely with frequency. Daily work benefits from quiet craft; first-use, recovery, setup, and meaningful completion can earn a memorable moment.
- Mark consequential milestones with proportionate ceremony, but never turn a routine action into friction.
- Put micro-delight in the hot path: responsive feedback, stable number formatting, satisfying direct manipulation, and thoughtful empty or error states.
- Reserve surprise and easter eggs for places where repeat exposure will not turn them into noise.
- Treat neglected edges as product quality issues. A rare setting, error path, or empty state still shapes trust in the whole product.

## Craft Baseline

- Respect `prefers-reduced-motion` and platform equivalents: reduce travel to short crossfades while retaining clear state change.
- Favor compositor-friendly properties and existing layout-transition primitives. Keep local motion quick and interruptible; test slow devices as well as the happy path.
- Do not use motion as the only signal. State, focus, labels, semantics, contrast, and keyboard behavior must remain correct without it.
- Reuse the product's timing, easing, spacing, and component primitives. A coherent vocabulary matters more than a clever individual animation.

## Delivering the Work

When building, implement the smallest set of changes that improves the observed flow, then test the normal, interrupted, error/loading, and reduced-motion paths that apply.

When reviewing, prioritize concrete findings in this order:

1. Confusing hierarchy, hidden intent, or lost context.
2. State changes that jump, duplicate, or contradict spatial logic.
3. Motion that harms performance, accessibility, or interaction responsiveness.
4. Delight that is misplaced, repetitive, or absent from a meaningful moment.

For each finding, name the interaction, user impact, and a proportionate recommendation. Do not prescribe a visual style the user did not ask for.
