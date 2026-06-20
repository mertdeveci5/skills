---
name: bug-fix
description: Investigate, simplify, repair, and verify bugs, regressions, broken behavior, failing tests, and messy code after implementation. Use when the user asks to fix or debug an issue, clean up code that was worked on, remove bloat, simplify architecture before patching, verify a plan was completed, or interview them deeply before writing an implementation plan.
---

# Bug Fix

Use this skill for disciplined code repair: understand first, simplify where possible, avoid patch stacking, make the smallest durable change, and verify against the real failing surface.

## Operating Stance

- Read and trace the existing code before judging or editing.
- Prefer fixing the root cause in the structure of the code over patching symptoms.
- When a bug comes from architectural complexity, simplify, delete, and clarify ownership before adding more code.
- Keep intended functionality stable unless the user explicitly approves behavior changes.
- Do not preserve code you added earlier just because you added it.
- Do not claim certainty beyond the evidence. If uncertainty remains, state what is still unproven.
- Keep unrelated user changes intact.
- Separate root cause, fix, and verification in the final report.

## Mode Selection

Choose the mode from the user's wording. Respect the edit gate before making changes.

If the user asks to report back first, review architecture, find simplification opportunities, or write a plan before implementation, do not edit files until the user approves.

If the user asks to fix, debug, clean up, make solid, or verify completed work, proceed through the relevant workflow and keep edits scoped to the issue.

## Read-Only Diagnosis

Use this mode when the user asks to report back first, review architecture, find simplification opportunities, or understand the code before changes.

Do not edit files in this mode.

Trace:

- The user-facing behavior or failure.
- The current entry points and call flow.
- State ownership, data boundaries, and side effects.
- Existing tests, logs, docs, and related prior fixes.
- Dead code, duplicate paths, unnecessary abstractions, and fragile assumptions.

Report:

- Root cause or strongest current hypothesis.
- Simplification opportunities ranked by impact.
- Whether the right next step is a local fix, a structural simplification, or no change.
- What you would edit if the user approves.

## Bug Fix Execution

Use this mode when the user asks to fix, debug, repair, unblock, or resolve a failure.

Workflow:

1. Reproduce or identify the failing surface with the most direct command, test, log, UI path, or runtime check available.
2. Trace the code path from symptom to cause.
3. Before choosing a fix, inspect whether the bug is caused by local logic or by the surrounding architecture.
4. If the architecture is causing the bug, simplify the architecture first: remove duplicate paths, collapse unnecessary abstractions, clarify ownership, delete dead code, and make the root path more robust without changing intended functionality.
5. If the architecture is sound and the issue is local, make the smallest focused patch.
6. If the architectural fix would materially change product behavior, public APIs, data contracts, or scope, stop and report before editing.
7. Add or update focused tests when the risk justifies it.
8. Run the relevant verification.
9. Re-read the changed path and check for regressions, dead code, and avoidable complexity.

## Cleanup And Make Solid

Use this mode when the user asks to clean up code already worked on, remove bloat, simplify, make it solid, or check for bugs after implementation.

Inspect the diff and surrounding code.

Look for:

- Dysfunctional code.
- Dead code.
- Duplicated logic.
- Unnecessary abstractions.
- Overly broad state or effects.
- Silent fallbacks.
- Hidden behavior changes.
- Tests that assert implementation details instead of behavior.
- UI or API paths that no longer match the intended product behavior.

Then simplify. Prefer removing code over adding more code when both solve the issue.

## Plan Verification

Use this mode when the user asks to read a plan file, check whether work is complete, or have independent review of completed work.

Workflow:

1. Read the plan and extract the promised outcomes.
2. Inspect the current code and diff against those outcomes.
3. Verify with tests, commands, screenshots, logs, or runtime checks where appropriate.
4. If subagents are available and the task is substantial, ask them to independently compare the plan to the code without leaking your conclusions.
5. Address valid feedback.
6. Report what was incomplete, what was fixed, and what remains.

## Deep Interview And Plan Writing

Use this mode when the user asks to be interviewed before implementation or wants a plan written after detailed questioning.

Do not implement during this mode.

Read the existing code and any existing plan first. Ask one non-obvious question at a time. If an AskUserQuestionTool, request_user_input tool, or equivalent user-question tool is available, use it. Otherwise ask the question directly in chat.

Ask about:

- Product behavior and user expectations.
- Technical boundaries and ownership.
- Failure modes and recovery.
- Data model and persistence.
- UI and UX tradeoffs.
- Operational visibility and debugging.
- Migration or backwards compatibility.
- What should explicitly not be supported.
- The simplest version that still solves the real problem.

Continue until unresolved answers would no longer materially change the implementation. Then write the plan to the requested file.

## Verification Discipline

Before finishing, check the work from more than one angle when possible:

- Static read of the changed code.
- Focused tests or type checks.
- Runtime smoke path for user-visible behavior.
- Logs or command output for infrastructure/runtime issues.
- Diff review for accidental scope creep.

Keep tracing until there are no material unresolved questions about the root cause, changed behavior, and verification path. If uncertainty remains, state it explicitly.

Do not say "fully verified" unless the actual user path or closest practical equivalent was checked. If only repo checks were run, say that.

## Subagent Use

Use subagents when available for substantial plan verification, risky refactors, or broad cleanup.

Give subagents the plan, code paths, and task. Do not give them your expected answer. Ask them to find gaps, incomplete work, regressions, and simplification opportunities.

Review their feedback critically. Implement only feedback that is grounded in the code and the user's goal.

## Final Response Shape

Keep the final response concise and separate:

```text
Root cause:
...

Changed:
...

Verified:
...

Notes:
...
```

If no code changes were made, say so clearly and report the recommended next step.
