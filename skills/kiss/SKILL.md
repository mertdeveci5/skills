---
name: kiss
description: Apply KISS engineering principles while planning, implementing, reviewing, or simplifying code. Use when the user invokes $kiss, asks to keep code simple, reduce complexity, fix root causes, remove dead code, or evaluate architecture against simplicity.
---

# KISS — Keep It Simple

Use this skill as engineering guidance loaded into your own context. Do not inject, append, or copy these instructions into a repository's `AGENTS.md`, `CLAUDE.md`, README, or other project docs unless the user explicitly asks for documentation edits.

## Operating Rules

- Read the relevant code first and let the existing ownership boundaries guide the change.
- Prefer removing, replacing, or simplifying code over adding more code.
- Fix root causes instead of layering patches over symptoms.
- Keep one clear behavior path. Do not leave old paths alive as hidden fallbacks.
- Avoid speculative abstractions, feature flags, options, env vars, wrappers, and helpers.
- Keep error boundaries, validation, and user-visible failure messages where data enters or leaves the system.
- Report what was simplified or removed when that matters for the user's review.

## Do Not Modify Project Docs By Default

Loading this skill is not a request to modify repository instruction files.

- Do not scan for `AGENTS.md` or `CLAUDE.md`.
- Do not create missing instruction files.
- Do not add a KISS section to project docs.
- Do not add pointer lines that reference this skill.
- If the user separately asks to edit docs, only edit the files and content they requested.

## Core Principles

Simplicity means building a system that does a limited set of things in specific ways, reducing the surface area where bugs can happen. Simple does not mean fragile, naive, or incomplete; it means every piece earns its place.

- No legacy fallbacks or backward compatibility shims. When you change something, change it. If something is removed, tell the user what was removed and why.
- Linear code flow. A reader should be able to follow the codebase top-to-bottom without jumping between unrelated files to understand what happens.
- Mutually exclusive structure. Directories own their domain. Files own their responsibility. Functions own their task.
- No magic values. Avoid hardcoded strings or numbers that only make sense if you wrote them. Configuration should be minimal and intentional.
- One change, one path. Replace behavior instead of layering a new path beside the old path.
- Small failure surface. Do fewer things, but do them completely. Error boundaries and validation make a simple system trustworthy.
- Flat over nested. If logic is buried three or more levels deep, flatten it with guard clauses, early returns, or clearer ownership.

## Fix From The Root

When a bug or bad behavior appears, do not patch only where the symptom appears. Step back and ask:

1. Why did this happen?
2. Is this a design flaw, a responsibility in the wrong place, or a missing boundary?
3. Can the fix make the architecture smaller or clearer?

If the problem is architectural, fix the architecture. Patching symptoms leads to repeated patches; fixing structure reduces future bugs.

## Reduce Before Adding

After a codebase reaches meaningful complexity, the right move is often to reduce code rather than add code.

- For bug fixes, the fix should ideally make the code shorter or clearer.
- For enhancements, simplify the existing path first, then add the smallest necessary behavior.
- For refactors, the result should usually have fewer concepts, fewer branches, or clearer ownership.

Adding substantial code is justified for genuinely new functionality, but even then look for what can be removed or replaced first.

## Dependency And Abstraction Discipline

- Do not pull in a library for something that is straightforward local code.
- Do not create base classes, interfaces, factories, or generic helpers for one implementation.
- Do not add wrapper layers around libraries unless there is a real boundary to isolate.
- Do not add logging, metrics, retry logic, caching, or toggles unless they solve the current problem.
- Prefer direct imports over barrel files that only re-export.

## Code Hygiene

- No commented-out code.
- No unused parameters, options, types, helpers, or files.
- No types or interfaces that mirror data one-to-one without adding constraints.
- If a function takes more than four parameters, check whether it is doing too much.
- If a file is large because it mixes concerns, split by ownership rather than by arbitrary helper categories.
- If a function needs a comment to explain what it does, prefer a clearer name or smaller function.
- No abbreviations unless they are universal, such as `id`, `url`, or `db`.

## Before Finishing

Ask:

1. Did I add code that could have been avoided by removing or simplifying something?
2. Is there exactly one code path for the changed behavior?
3. Can someone read the change top-to-bottom without bouncing through unrelated files?
4. If I delete any piece of what I added, does something visibly break?
5. Am I fixing the root cause or only a symptom?
