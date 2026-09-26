# Case Studies

The interactions shown in Benji Taylor's [Family Values](https://benji.org/family-values), described frame by frame from the essay's videos. Family is a crypto wallet; each case ends with the transferable idea so it can be applied to any product. Read the case that matches the problem in front of you instead of reading them all.

## Simplicity: the tray system

**Options that stay in place.** A wallet's detail screen opens an "Options" tray at the bottom (View Private Key, View Recovery Phrase, Remove Wallet). Choosing "View Private Key" grows the same tray into a taller one with an icon, a title, three short safety bullets, and Cancel / Reveal. Cancel shrinks it back to Options. The card and screen behind never move.
→ *A sub-decision can grow out of the menu that offered it. The user never leaves the room they were in.*

**One job per tray, and every tray a different height.** A "refuel" flow runs Choose Chains → Choose Amount ($2 / $5 / $10 / … / Custom) → Custom Amount keypad → Review Details → Address → final confirmation. Each step is a tray with one decision, and each has a clearly different height. Continue appears disabled until the step's single decision is made. Benji says they sometimes *rewrote copy or adjusted layout* just so two adjacent trays would not be the same height.
→ *If two steps could be mistaken for each other, the transition is invisible. Change the shape, not just the words. Content editing is a legitimate motion tool.*

**Header icon doubles as close and back.** The first tray in a sequence shows ×. Later trays show ←, and the glyph morphs between them.
→ *One affordance that always means "undo the last thing" is simpler than two buttons.*

**Help is a tray on top of a tray.** In a Fee Estimate tray, the ⓘ next to "Price Range" opens a smaller explanation tray. Closing it returns to the gauge exactly as it was. The "?" in a hub screen opens a full-color educational tray ("Your Family") with a single "Got it".
→ *Explanations belong next to the thing they explain and should dismiss back to it, not to a help centre.*

**Theme follows context.** Inside a dark send or confirmation flow, trays are dark. In light settings screens, trays are light.
→ *A transient surface belongs to the flow it interrupts. It should look like part of that flow.*

**Warnings arrive where the risk is.** Tapping "Remove Wallet" (a red card that isn't backed up) raises an "Are you sure?" tray over the dimmed card. It explains the consequence plainly and offers Cancel / Continue. Tapping "Use Max" in the send flow raises a tray that explains the network fee was deducted. The chip then reads "Using Max".
→ *Confirmation and warning belong at the point of action, with the affected object still visible behind them.*

**Trays as on-ramps to bigger flows.** "New Wallet" is a small tray (Add Existing / Create New). Choosing Add Existing expands the tray into a full-screen page with an illustration. Choosing Create New expands into a full-screen stepped flow with a progress indicator. Onboarding also has an "Are you sure?" tray that rises before creating a new wallet group, explaining the trade-off.
→ *Start small. Escalate to a committed full screen only when the task turns out to need one, and make the escalation a visible growth of the surface, not a replacement.*

**The tray unfolds from the feature itself.** In Swap, pressing Continue raises the approval tray from the swap screen. The token's icon travels into the tray and sits beside a lock. The first time, a short tutorial ("Your approval is required" → "Deciding what to approve") plays inside the same tray before "Allow Access". Returning users go straight to Allow Access.
→ *First-run education can be a step inside the real flow instead of a separate carousel. Show it once, then remove it.*

**Compact means approachable.** A multi-step "Share Feedback" flow (Choose Areas → Share Feedback → Your Details) stays in small trays above the keyboard. It ends with a small "Feedback Shared" toast, and the user is back on the screen they started from.
→ *A small surface tells the user a task is small. Use a full screen only when the task is big.*

**Notice before a step, not after.** Before reusing an existing cloud backup, a tray says "An existing iCloud Backup is available. On the next step, simply enter your existing password…". Then the flow proceeds.
→ *Tell users what the next screen will ask before it asks.*

**Rooms seen through a doorway.** The article's onboarding diagram is a tree: Splash → Create Wallet | Add Existing → Import (Recovery Phrase / Private Key / From Index) | Restore | Watch. That's hundreds of paths in total. The user only ever sees the next branch.
→ *Map the whole tree, then design each node to show only its immediate children.*

## Fluidity: seamless transitions

**Journey map as motion.** Onboarding shows a stack of colored cards. Choosing "Add an Existing Wallet" brings a different card to the front, and the header illustration changes to match the branch. Going back restacks them.
→ *An illustration can double as a map of where the user is. Let choosing a path visibly rearrange it.*

**Objects shrink into indicators.** In the backup flow, a purple recovery-phrase card fills the screen. On Continue, the card shrinks and travels up into a small lock pill at the top, which becomes the progress indicator for the next step ("Enter Password"). Going back expands it again. The same pattern appears in iCloud backup (a pink card becomes a progress bar) and import (a green card becomes a lock pill).
→ *The thing the user just handled can become the breadcrumb for the step that depends on it.*

**Cards travel between screens.** A wallet card in the home grid opens into the wallet's detail header. Dismissing sends it back into its grid slot, while the grid fades back in behind it. A token row opens into its detail chart. Swiping down shrinks the detail back toward the list.
→ *A list item and its detail are one object at two sizes. Never let them look like two different things.*

**Tabs have a direction.** Tapping a tab to the left slides content in from the left, and vice versa. "We fly instead of teleport."
→ *Ordered peers imply direction. Match the motion to their order.*

**Chevron ↔ ×.** In stepped flows the leading glyph morphs between back and close as the user moves between the first step and later steps. The title crossfades with a short directional offset.
→ *Even a 16-point icon can confirm which way the user just moved.*

**Continue → Confirm.** On the last step before an irreversible action, the button label morphs from "Continue" to "Confirm". Shared letters ("Con") stay in place, and only the differing letters change. The article's pill diagram does the same with status: "Analyzing Transaction" (spinner) turns into "Transaction Safe" (green check) or "Transaction Warning" (red triangle). "Transaction" stays put while the color changes.
→ *When the weight of an action changes, animate the words that carry the weight. Keep the unchanged words still, so the eye goes to the change.*

**Counting buttons.** Adding wallets from an index turns a disabled "Add Wallet" into "Add 1 Wallet", then "Add 2 Wallets". When the user moves on, it becomes "Import 2 Wallets". Rows show a skeleton while an address is fetched, then an "Added" pill.
→ *A button label can be a live summary of what the user has done so far.*

**Don't duplicate what persists.** The recovery-phrase card stays pinned while the screen around it changes from "Your Secret Recovery Phrase" to "iCloud Backup" to "Manual Backup". It doesn't re-enter or flash.
→ *If a component is on screen now and will be on screen next, it must not blink, re-mount, or replay its entrance.*

**Only the changed words move.** Empty states on sibling tabs read "There's nothing here, yet" and "Nothing to see here, for now". The placeholder shapes change (list rows vs. a grid) while the rest of the layout holds.
→ *Change the smallest region that is actually different.*

**Buttons glide across trays.** On a dark swap confirmation, tapping the slippage chip raises a "Max Slippage" tray, and the main "Confirm" button glides into it as "Confirm Slippage". Dismissing sends it back as "Confirm".
→ *The primary action can travel with the user's attention. Its label says what it will do in the new context.*

**With vs. without (the removal test).** Benji removed the motion from a few interactions to show the difference.
- *Swap approval:* with motion, the tray grows out of the Continue button. Without it, the tray just appears over the swap. "Not bad per se, but certainly not as good."
- *Wallet grouping:* with motion, cards fly into labelled group sections, and back again when grouping is turned off. Without it, the grid swaps instantly — "digital whiplash".
- *Price charts:* Family morphs the line between timeframes and rolls the percentage. The Cash App comparison fades the old line out, shows a spinner, and draws a new line, which feels slower even though it isn't.
- *Send:* with motion, the typed "$1.00" travels up into the confirmation screen's summary. Without it, the confirmation screen appears and the user has to find the amount again.
→ *To judge a transition, imagine it removed. If the static version makes the user re-find, re-read, or re-trust something, the motion is doing real work.*

**Show where the result went.** After Confirm, the button becomes a spinner with "Starting Your Transaction", and that spinner travels into the Activity tab in the bottom navigation. Speeding up a pending transaction moves its spinner back into the original pending tray, which now reads "Trying to Speed Up" and shows the updated amount.
→ *When work leaves the screen, animate it to where the user will find it later. Actions on an existing thing should visibly land on that thing.*

**Selection travels into the next step.** In send, tapping a token in the list sends its row into the amount screen's asset picker. Going back returns it to the list.
→ *The choice the user made should be visible as the thing that carries into the next step.*

## Delight: selective emphasis

**Mark the rare, important moment.** Creating a wallet shows "Creating Your Wallet" with a soft gradient orb and "Doing some cryptographic magic…". Then comes "Your wallet is ready.", with the new card and a tooltip pointing at "Back Up Now". Three illustrated education trays follow ("Ok, but what is a Secret Recovery Phrase?", "So yeah, don't share your Secret Recovery Phrase", "You're ready to back up"). Finally the phrase lands on its card, its characters decoding into words.
→ *An infrequent but consequential moment deserves ceremony. Here the ceremony also teaches.*

**Easter eggs where repetition won't hurt.** Tapping the receive QR code sends a ripple through its dots. Dragging a finger across flips the dots like sequins in a trail of color. It's used often enough to be found, and rarely enough not to annoy.
→ *Hide surprise in plain sight on a moderately used surface. Make it reward curiosity and never block the task.*

**Micro-delight in the hot path.** In amount entry, the comma separators slide to their new positions as digits are typed ($100 → $10,000 → $1,000,000) instead of jumping.
→ *For daily actions, the delight is the craft of the basic interaction itself.*

**Escalating copy.** If the user keeps typing an amount above their balance, the error goes from "Not enough ETH" to "Still not enough ETH" to "Still not enough ETH 😅".
→ *An error state the user explores on purpose can reward them, as long as it stays accurate and the action stays blocked.*

**Physical metaphors for rare destructive actions.** Selected collectibles tumble into a skeuomorphic trash can, with a sound, before "Trash 3 Collectibles".
→ *For rare actions, a metaphor can make the outcome concrete and cushion the destructiveness.*

**Empty states that point.** The first time the in-app browser opens, its empty state has a hand-drawn arrow bobbing toward the new-tab control.
→ *An empty state is the first thing a new feature says. Make it tell the user what to do next.*

**Satisfying reordering.** In edit mode, rows lift under the finger, multiple selected rows stack together as they are dragged, and neighbors make room. The inspiration was Things.
→ *Direct manipulation should feel physical: lift, stack, make room, settle.*

**Delight that carries information.** Stealth mode replaces values with asterisks that shimmer gently. The shimmer says the hidden numbers are still updating. Percentage changes stay visible.
→ *The best decorative motion also communicates state.*

**Scrubbing that responds everywhere.** Dragging along a price chart moves a lifted dot, updates the date label and price, and flips the arrow up or down with the sign of the change.
→ *During direct manipulation, update every related readout at once so the whole screen feels tied to the finger.*

**Reward the chore.** Passing the backup quiz brings confetti. Then comes "Manual Backup Completed" with a "Backed Up" badge on the card, and the backup screen shows that method checked ("1 of 2").
→ *Celebrate the completion of an important but tedious task, then show the lasting result so the reward means something.*

## The Delight-Impact Curve

Potential for delight falls as feature frequency rises. That doesn't mean frequent features get no craft. It means their delight should be small, fast, and never in the way (the sliding commas). Rare features can take a big moment (wallet creation, backup confetti). "Specialness" wears off with repetition, like eating the same candy again and again. The aim is *graded intensity everywhere*, not delight in some places and neglect in others.

## Polish parity

"Like going to a fancy restaurant but finding it has a dirty bathroom." Users notice the neglected corner, and it lowers their trust in the whole product. Every case above includes at least one rarely visited surface: fee explanations, remove-wallet warnings, the empty browser, the trash. The ability to add delight anywhere depends on a consistent level of polish everywhere.

## What the essay says about the cost

Achieving this "demands a certain obsessiveness". It slowed the launch, and it was a deliberate trade. Utility, performance, and security are table stakes and come first. Fluidity is "hundreds of small, deliberate decisions" (Benji's correction: thousands); a single fluid transition does not make a fluid product.
