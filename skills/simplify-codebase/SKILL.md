---
name: simplify-codebase
description: Simplify a codebase or subsystem while preserving behavior. Use when the user asks to reduce complexity, clean architecture, make code easier to understand, remove redundant abstractions, refine recently changed code, or evaluate overall system design for robustness and simplicity. Before broad work, distinguish whether the user wants recent branch changes reviewed or an overall codebase simplification pass.
---

# Simplify Codebase

## Overview

Use this skill to simplify structure, ownership, and implementation without changing what the software does. Treat the `kiss` skill as the baseline philosophy: remove unnecessary paths, fix root causes, and prefer one clear behavior path.

The priority is architecture and system design, not cosmetic line reduction.

## Scope First

Before broad work, determine the intended scope.

- If the user mentions a branch, PR, diff, review, "recent changes", or "what changed", focus on recently modified code first. Inspect `git status --short`, `git diff --stat`, and the relevant diff before editing.
- If the user asks for overall cleanup, architecture simplification, or codebase-wide reduction, inspect the current tree, entrypoints, subsystem boundaries, and tests before choosing a small slice.
- If the scope is ambiguous, ask one short question: "Should I focus on recent changes in this branch, or on the overall codebase architecture?"

Do not silently turn a recent-change cleanup into a broad rewrite, or a broad architecture request into a diff-only review.

## Read Local Rules

Read the applicable repository instructions before editing.

- Start with the nearest `AGENTS.md` and `CLAUDE.md` files that govern the files you will touch.
- If the root docs point to subsystem docs, read the subsystem docs before changing that area.
- Apply local standards first. Use the guidance below only where it fits the repository's documented conventions.

For JavaScript, TypeScript, and React code, prefer the established project style, especially:

- Use ES modules with sorted imports and required file extensions where the project expects them.
- Prefer `function` declarations for top-level functions when that is the local convention.
- Add explicit return type annotations to top-level functions when the project expects typed surfaces.
- Use explicit `Props` types for React components.
- Follow the project's component, hook, state, and error-boundary patterns.
- Prefer boundary validation and clear error returns over broad `try`/`catch` blocks.
- Keep naming consistent with nearby files.

For Python and Django code, adapt the same simplicity principles:

- Keep views, services, models, forms, serializers, and management commands in their existing ownership lanes.
- Avoid hiding business behavior in model side effects, signals, or generic helpers unless the project already owns that pattern.
- Prefer explicit validation at request, form, serializer, task, and integration boundaries.
- Avoid broad `except` blocks and swallowed exceptions.
- Keep query construction readable and efficient; do not introduce extra database round trips during refactors.
- Do not create migrations for a pure behavior-preserving refactor.
- Preserve framework conventions for naming, imports, typing, settings, transactions, and tests.

## Preserve Behavior

Never change user-visible behavior unless the user explicitly asks for a behavioral change.

- Preserve features, outputs, API shapes, schemas, routes, command behavior, UI flows, permissions, logging that users depend on, and error semantics.
- Do not remove validation, auth checks, audit trails, or error boundaries to make code shorter.
- Do not add fallback paths, feature flags, wrappers, config toggles, or compatibility shims unless they are already part of the required behavior.
- If behavior is unclear, characterize it with tests, fixtures, command output, or a focused manual check before refactoring.

## Simplify For Clarity

Prefer changes that reduce the number of concepts a maintainer must hold.

- Reduce unnecessary nesting with guard clauses, early returns, smaller functions, or clearer ownership.
- Remove redundant code, dead paths, commented-out code, unused parameters, unused types, unnecessary wrappers, and single-use abstractions.
- Consolidate related logic when it belongs to the same responsibility.
- Split code when one function, component, or file mixes distinct responsibilities.
- Rename variables and functions when a clearer name removes the need for explanation.
- Remove comments that narrate obvious code; keep comments that explain non-obvious constraints, invariants, or external behavior.
- Avoid nested ternary operators. Use `switch`, lookup maps, guard clauses, or explicit `if`/`else` chains for multi-condition logic.
- Choose clarity over brevity. Dense one-liners and clever expressions are not simplification.

## Maintain Balance

Do not over-simplify.

- Do not combine unrelated concerns into one function, component, module, service, or route.
- Do not remove an abstraction that clearly protects an ownership boundary or prevents meaningful duplication.
- Do not make code harder to debug, test, or extend just to reduce file count or line count.
- Do not replace explicit domain language with generic names.
- Do not flatten architecture so far that data validation, integration boundaries, or error handling become scattered.

## Architecture Review Priorities

When reviewing a subsystem for simplification, look for structural causes before local symptoms.

- Ownership: Does each directory, module, component, or service own one clear responsibility?
- Behavior paths: Are there duplicate ways to do the same thing?
- Data flow: Can a reader follow input, state changes, persistence, side effects, and output in order?
- Boundaries: Are external APIs, framework boundaries, auth, validation, and persistence handled in the right layer?
- Redundancy: Are helpers, wrappers, factories, types, or base classes earning their place?
- Robustness: Does the simpler design keep validation and failure handling at the edges?

Prefer a smaller architecture with one obvious path over a flexible architecture with unused options.

## Workflow

1. Load local `AGENTS.md` and `CLAUDE.md` guidance for the area.
2. Establish whether the user wants recent-change refinement or overall architecture simplification.
3. Read the relevant code and tests before proposing edits.
4. Identify simplification opportunities that preserve behavior.
5. Make small, reviewable changes with one clear purpose.
6. Run the narrowest meaningful checks first, then broader checks when the touched surface warrants them.
7. Report what was simplified, what behavior was preserved, what was removed, and what verification ran.

For broad codebase requests, work in slices. Start with the highest-leverage ownership or behavior-path issue instead of attempting a whole-repo rewrite.

## Before Finishing

Confirm:

1. The behavior path is still the same from the user's perspective.
2. There is no new fallback, option, or abstraction that the task did not need.
3. The code is easier to read top-to-bottom.
4. Local `AGENTS.md` and `CLAUDE.md` standards were followed.
5. The verification matches the risk of the change.
