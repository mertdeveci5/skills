---
name: family-values
description: Apply the Family app design philosophy — simplicity through gradual revelation, fluidity through seamless transitions, delight through selective emphasis — when designing, building, or reviewing user interfaces, interactions, animations, and product flows. Use when the user asks to make a UI feel polished, fluid, seamless, or delightful, design transitions or micro-interactions, reduce interface clutter, or review a product's experience quality.
---

# Family Values

Distilled from Benji Taylor's essay on what makes the Family app feel the way it does: <https://benji.org/family-values>. Three core principles — **simplicity**, **fluidity**, and **delight** — applied as thousands of small, deliberate decisions. Use this as design guidance in your own context when building or reviewing interfaces.

Simplicity ensures accessibility. Fluidity maintains continuity of experience. Delight fosters meaningful connection. Together they communicate respect for the user's time, intelligence, and experience.

Utility, performance, and security are table-stakes — these principles sit on top of them, not instead of them.

## Simplicity Through Gradual Revelation

Present fundamentals at the user's fingertips; reveal everything else only as it becomes relevant. Complexity stays out of sight and out of mind until required.

- **Progressive disclosure over everything-at-once.** Do not present all features at all times. Surface actions at the moment they become relevant to what the user is doing.
- **One thing per surface.** Each view, sheet, tray, or step is dedicated to a singular piece of content or one primary action. Distill overwhelming actions into manageable, step-by-step interactions.
- **Preserve context with overlays.** Prefer transient surfaces (sheets, trays, popovers) that overlay the current interface over full-screen transitions that displace the user. Overlays keep the user connected to where they were; full screens are for committed destinations.
- **Emerge from the trigger.** Transient UI should visually originate from the element or context that summoned it — a confirmation unfolds from the button that requested it, not from nowhere.
- **Make each step unmistakable.** Consecutive steps in a flow must differ visibly (in height, layout, or content) so progression is never ambiguous. Rewrite content or tweak the design if two steps look too similar.
- **Label every step.** Each transient surface gets a succinct title and a way back or out.
- **Match the ambient theme.** Transient UI adapts to its context — dark within dark flows, and so on.
- **Compact signals approachable.** A small, focused step encourages engagement; a full-screen commitment intimidates.

Think of the interface as a series of interconnected rooms seen through doorways: each user action unfolds the next space gradually. The user sees where they are going as they go there.

## Fluidity Through Seamless Transitions

Envision the entire app as a constantly evolving space where any element can transform into another, given a strong enough rationale. Moving through the interface should feel like floating through water, not walking between rooms.

- **Ban static transitions.** Never cut instantly between states when a purposeful motion can show the relationship. Motion aids orientation: every animation answers "how did I get from A to B?" Fly instead of teleport.
- **Directional motion encodes space.** Movement direction must match spatial logic — tapping a tab on the left moves the view left. Treat the app as having unbreakable physical rules.
- **Elements morph; they don't swap.** Any element can transform into another when there's a rationale: buttons become sheets, sheets become full screens, a chevron becomes a close icon, a spinner travels to the tab where its result now lives.
- **Morph text on meaningful changes.** When a label changes at a significant step (Continue → Confirm), animate the transformation — e.g., by shared letters — so the user notices the weight of the step instead of missing an instant swap.
- **Persistent elements stay consistent.** If a component is visible now and will persist in the next phase, it should remain visually continuous — never let an element redundantly duplicate or re-animate itself. Cards, rows, and text that "travel" between screens must stay recognizably the same object.
- **Keep unchanged parts unchanged.** When only a portion of content updates, animate only that portion. Changing a whole sentence or panel for a one-word update is digital whiplash.
- **Animation explains state changes.** When data reorganizes (grouping, sorting, reordering), animate items into place so intent and outcome are understood — the static version loses the plot.
- **Motion can feel faster than speed.** Thoughtful transitions enhance clarity and perceive just as fast as instant cuts. Prioritize clarity of cause and effect over raw speed.
- **Fluidity is cumulative.** One fluid transition doesn't make a fluid interface — it takes hundreds of small, deliberate, consistent decisions. Glitchy or inconsistent motion erodes trust faster than no motion.
- **Know why before adding.** Understand the navigation model deeply enough to justify each transition. No motion for motion's sake.

## Delight Through Selective Emphasis

Delight creates emotional connection, but mastering delight is mastering *selective emphasis* — knowing where, when, and how intensely to apply it.

- **Follow the Delight-Impact Curve.** The potential impact of delight increases as usage frequency decreases. Frequently used features get subtle, efficient touches; rarely used features get the memorable moments. Over-decorating a daily flow becomes annoying; a mundane rare flow (setup, backup, first use) is the biggest opportunity.
- **Polish everywhere, or nowhere counts.** Users judge the whole product by its least polished corner — the dirty-bathroom-in-a-fancy-restaurant effect. Infrequently used features must never feel like afterthoughts.
- **Mark significant moments.** Infrequent but meaningful actions (creating a wallet, completing a backup) deserve ceremony — an animation or reward that makes the occasion memorable rather than mundane.
- **Use surprise and easter eggs sparingly.** Hidden moments discovered by interaction (a ripple on a tap, a playful response to invalid input) delight precisely because they're unexpected. Place them where usage is occasional enough that discovery stays fun.
- **Sweat the micro-details in hot paths.** In daily-use flows, delight lives in tiny things: commas shifting as numbers are typed, arrows flipping as values change, satisfying drag-and-drop. Small enough to never get in the way.
- **Vary intensity, never omit.** Don't dim delight in rare features — scale the dosage. Frequently used: inherent craft. Rarely used: surprise and novelty.
- **Reward investment.** Celebrate when users complete essential but unglamorous tasks. These moments value the user's emotional experience, not just their functional needs.

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
