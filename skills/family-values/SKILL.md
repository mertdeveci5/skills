---
name: family-values
description: Apply a world-class interface design sensibility — simplicity through gradual revelation, fluidity through seamless transitions, delight through selective emphasis — when designing, building, or reviewing any user interface, interaction, animation, or product flow. Use when the user asks to make a UI feel polished, fluid, seamless, intuitive, or delightful, design transitions or micro-interactions, reduce interface clutter, improve onboarding or multi-step flows, or review a product's experience quality.
---

# Family Values

A design sensibility for making complex products feel welcoming, adapted from Benji Taylor's essay on interface craft: <https://benji.org/family-values>. Three principles — **simplicity**, **fluidity**, and **delight** — applied as hundreds of small, deliberate decisions across every interaction. Use this as design guidance in your own context when building or reviewing interfaces for any product.

Simplicity ensures accessibility. Fluidity maintains continuity of experience. Delight fosters meaningful connection. Together they communicate respect for the user's time, intelligence, and experience.

Performance, reliability, and accessibility are table-stakes — these principles sit on top of them, not instead of them.

## Simplicity Through Gradual Revelation

Present the fundamentals at the user's fingertips; reveal everything else only as it becomes relevant. Complexity stays out of sight and out of mind until required. A complex product should still feel approachable to a newcomer without sacrificing depth for the expert.

- **Progressive disclosure over everything-at-once.** Do not present all features at all times. Surface each action at the moment it becomes relevant to what the user is doing.
- **One thing per surface.** Each view, sheet, popover, or step is dedicated to a singular piece of content or one primary action. Distill overwhelming actions — onboarding, setup, destructive confirmations — into compact, step-by-step interactions.
- **Preserve context with overlays.** Prefer transient surfaces (sheets, drawers, popovers) layered over the current interface for transient tasks, instead of full-screen transitions that displace the user. Reserve full screens for committed destinations.
- **Emerge from the trigger.** Transient UI should visually originate from the element or context that summoned it — a confirmation unfolds from the button that requested it, not from nowhere.
- **Make each step unmistakable.** Consecutive steps in a flow must differ visibly (in size, layout, or content) so progression is never ambiguous. Rewrite content or adjust the design if two steps look too similar.
- **Label every step.** Each transient surface gets a succinct title that captures its purpose, plus an obvious way back or out.
- **Match the ambient theme.** Transient UI adapts to its context — a dark-themed flow keeps its overlays dark.
- **Compact signals approachable.** A small, focused step encourages engagement; a full-screen commitment intimidates. Step-by-step surfaces reassure users they're diving deeper into their current context, not veering off course.

Think of the interface as a series of interconnected rooms seen through doorways: each user action unfolds the next space gradually. The user sees where they are going as they go there.

## Fluidity Through Seamless Transitions

Envision the entire interface as a constantly evolving space where any element can transform into another, given a strong enough rationale. Moving through the product should feel like floating through water, not walking between separate rooms.

- **Ban static transitions.** Never cut instantly between states when a purposeful motion can show the relationship. Motion aids orientation: every animation answers "how did I get from A to B?" Fly instead of teleport.
- **Directional motion encodes space.** Movement direction must match spatial logic — tapping a tab on the left moves the view left, drilling in pushes forward, backing out reverses. Treat the interface as having unbreakable physical rules.
- **Elements morph; they don't swap.** Any element can transform into another when there's a rationale: buttons become sheets, sheets become full screens, a chevron becomes a close icon, a progress indicator travels to where its result now lives.
- **Morph text on meaningful changes.** When a label changes at a significant step (Continue → Confirm), animate the transformation — e.g., through shared letters — so the user registers the weight of the step instead of missing an instant swap.
- **Persistent elements stay consistent.** If a component is visible now and will persist in the next phase, it must remain visually continuous — never let an element redundantly duplicate or re-animate itself. Items that "travel" between screens must stay recognizably the same object.
- **Keep unchanged parts unchanged.** When only a portion of content updates, animate only that portion. Repainting a whole panel or sentence for a one-word update is digital whiplash.
- **Animation explains state changes.** When data reorganizes — grouping, sorting, reordering — animate items into place so intent and outcome are understood. The static version loses the plot.
- **Motion can feel faster than speed.** Thoughtful transitions enhance clarity while feeling just as fast as instant cuts. Prioritize clarity of cause and effect over raw speed.
- **Fluidity is cumulative.** One nice transition doesn't make a fluid interface — it takes hundreds of consistent decisions compounding over time. Glitchy or inconsistent motion erodes trust faster than no motion at all; a stuttering animation in a critical flow makes users question whether the product understood them at all.
- **Know why before adding.** Understand the navigation model deeply enough to justify each transition. No motion for motion's sake.

## Delight Through Selective Emphasis

Delight creates emotional connection, but mastering delight is mastering *selective emphasis* — knowing where, when, and how intensely to apply it. Building a great product means respecting not just what someone does, but how they feel while doing it.

- **Follow the Delight-Impact Curve.** The potential impact of delight increases as usage frequency decreases. Daily flows get subtle, efficient touches; rarely used flows get the memorable moments. Over-decorating a daily task becomes annoying; a mundane rare task — setup, backup, first use of a feature — is the biggest opportunity.
- **Polish everywhere, or nowhere counts.** Users judge the whole product by its least polished corner — the dirty-bathroom-in-a-fancy-restaurant effect. Infrequently used features must never feel like afterthoughts.
- **Mark significant moments.** Infrequent but meaningful actions — creating something important, completing a security step, finishing setup — deserve ceremony: an animation or reward that makes the occasion memorable rather than mundane.
- **Use surprise and easter eggs sparingly.** Hidden moments discovered through interaction — a ripple on a tap, a playful response to invalid input — delight precisely because they're unexpected. Place them where usage is occasional enough that discovery stays fun rather than becoming noise.
- **Sweat the micro-details in hot paths.** In daily-use flows, delight lives in tiny things: separators shifting as numbers are typed, icons flipping as values change, satisfying drag-and-drop. Small enough to never get in the way.
- **Vary intensity, never omit.** Don't dim delight in rare features — scale the dosage. Frequently used: inherent craft. Rarely used: surprise and novelty. Specialness decays with repetition, so the same trick can't carry a daily flow.
- **Reward investment.** Celebrate when users complete essential but unglamorous tasks. These moments show you value the user's emotional experience, not just their functional needs.

## Applying This Skill

When building a UI:

1. Start with gradual revelation — decide what must be visible now versus what appears on demand, and what each step's singular focus is.
2. Map the transitions — for every state change, ask how the user sees the path from A to B, what morphs into what, and whether direction matches spatial logic.
3. Check continuity — anything persisting across the change must remain consistent; animate only what actually changed.
4. Place delight deliberately — assess the feature's usage frequency and scale the intensity to match the Delight-Impact Curve.

When reviewing a UI, ask:

1. Is anything shown before it's relevant? Could it emerge from context instead?
2. Are there static cuts where a purposeful transition would preserve orientation?
3. Does any element duplicate, jump, or fully repaint when it should persist or partially update?
4. Is delight distributed by the Delight-Impact Curve, or clustered in the wrong places?
5. Is there any unpolished corner that undermines the rest?
