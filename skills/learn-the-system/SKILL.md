---
name: learn-the-system
description: Teach someone a codebase or production system deeply, Mitchell Hashimoto style, by digging from what they know until they reach the edge of their understanding. Covers three lenses in order - how the code flows end to end, the opinionated choices and their alternatives, and the limits of the system. Use when the user asks to get to know, deeply learn, or be interviewed on a system they build or operate ("teach me our system", "how does this really work", "find where my understanding ends"). Runs on the socratic-tutor loop. Not for a one-off "where is X" question.
license: MIT
compatibility: Needs code-reading tools on the repository. Uses the socratic-tutor skill for the teaching loop, skill map and save state.
---

# Learn the System

Knowing a system means you can follow one request through every layer, say why
each layer is built the way it is and what else it could have been, and say where
it breaks. Trivia is not the goal: a person who happens to know a fact gets asked
why until it is clear whether they understand it.

The method comes from Mitchell Hashimoto's interviews: find something the learner
knows with high confidence, then ask increasingly detailed whys and hows until
they cannot answer. That edge is where the teaching happens. Then go one layer
down and do it again.

## Before the first question

Build a private map of the system. Do not show it; it is your answer key.

- Entry points: the CLI, the HTTP API, workers, daemons, guest agents. Which
  process runs on which machine.
- Two or three canonical paths, traced hop by hop with `file:line` for each hop
  (for example: a user command until bytes reach a visitor; a write until it is
  durable).
- The opinionated choices: what was chosen, the reason the repository gives
  (AGENTS.md, design docs, commit messages, issue links), the realistic
  alternatives, and the trade-off accepted.
- The limits: hard numbers in config and code, single points of failure, what
  happens when each machine dies, what grows with load.

Every answer you will accept must be checkable in the repository or on the
running system. Never invent a reason for a choice; if the repository does not
say why, say so and ask the learner what they think the reason was.

Delegate the map to a read-only exploration agent when the repository is large,
and spot-check its citations before relying on them.

## Subskills

Use the socratic-tutor skill map with these subskills, adjusted to the system:

1. Flow: the shape (which processes, which machines, who talks to whom)
2. Flow: the main path, hop by hop
3. Flow: the second path (state, durability, background work)
4. Choices: the big ones (runtime, isolation, storage, edge)
5. Choices: the operational ones (deploys, migrations, CI)
6. Limits: numbers and ceilings
7. Limits: failure (what dies, what survives, what recovers)
8. Below the code: the layers the system stands on (OS, virtualization,
   network, filesystem)

Run the lenses in order. Choices make sense only once the flow is clear, and
limits make sense only once the choices are.

## The ladder

For each subskill, start where the learner is confident and climb:

- Flow: "What happens when you run X?" → "Which process receives it?" → "How
  does it know where to send it next?" → "What is on the wire?" → "What does
  the OS do there?"
- Choices: "Why X?" → "What else could it have been?" → "What would you lose
  with that alternative?" → "What would have to change for the alternative to
  win?" → "Did we pay for this choice anywhere yet?"
- Limits: "What is the ceiling?" → "Which resource runs out first?" → "What
  does a user see when it does?" → "What happens if this machine dies right
  now?" → "How would you raise the ceiling, and what would that cost?"

Keep climbing past the code into the layers under it: if the learner knows the
VM boots, ask what a VM is, how the guest reaches the network, why not a
container, what the kernel does differently in each.

## Grounding

- Make the learner predict, then check: open the file, run the read-only
  command, show the line. Their prediction is the test; the code is the answer.
- Cite `file:line` when you confirm or correct.
- Prefer questions about this system over generic theory. Generic questions are
  for the "below the code" subskill and for climbing past the edge.
- When the learner reveals a fact the map lacks, verify it in the code before
  accepting it.

## The edge

When the learner cannot answer, note the edge in the skill map notes ("knows the
gateway serves R2 bytes; does not know how the route is found"). Teach the one
missing step in a few sentences, then re-test it from a different angle before
climbing further. Never teach two layers at once.

## Ending

Finish with the socratic-tutor final assessment, including one integrative
question that crosses all three lenses, such as: "A compute host loses power
during a deploy. Walk me through what every user sees, which choice made it so,
and what you would change."
