# Templates

Use these when creating new files. Copy the relevant template as-is.

---

## CLAUDE.md Template

```markdown
# Project Guidelines

## Development

- Read relevant code before modifying it. Understand existing patterns before proposing changes.
- Keep changes focused. Only modify what is necessary to complete the task.
- Do not add features, refactoring, or improvements beyond what was asked.
- When removing code, state what was removed and why. Don't silently delete.
- When adding code that exceeds 50 lines, justify what problem each piece solves.
- Never generate boilerplate "just to be safe." If you can't explain why a file exists, don't create it.

## KISS — Keep It Simple

Simplicity means building a system that does a limited set of things in specific ways, reducing the surface area where bugs can happen. Simple does not mean fragile, naive, or incomplete — it means every piece earns its place.

### Core Rules

- No legacy fallbacks or backward compatibility shims. Change it or remove it. Tell the user what changed.
- Linear code flow. No circular references. A reader follows top-to-bottom.
- Mutually exclusive structure. Directories, files, and functions each own one thing.
- No magic values. No unnecessary .env variables. Configuration is minimal and intentional.
- One change, one path. Replace, don't layer.
- Small failure surface. Fewer moving parts, each one solid. Error boundaries and validation are required.
- Flat over nested. 3+ levels of nesting means flatten it.

### Fix From the Root

When fixing bugs, look at it architecturally first. If the problem is in the design, fix the design — don't patch symptoms.

### Reduce Before You Add

When fixing bugs or enhancing existing code, the goal is fewer lines, not more. Only adding new features justifies substantial new code. Even then, look for what to remove first.

### Before Committing

1. Could this be achieved by removing or simplifying instead of adding?
2. Is there exactly one code path for the changed behavior?
3. Can someone read this top-to-bottom without jumping around?
4. If I delete any piece, does something visibly break?
5. Am I fixing the root cause or a symptom?
```

---

## AGENTS.md Template

```markdown
# Agent Guidelines

## General

- Understand the codebase before making changes. Read relevant files first.
- Make minimal, focused changes. Do not refactor or improve beyond the task.
- Do not add comments, docstrings, or type annotations to code you didn't change.
- When removing code, state what was removed and why.
- Never generate boilerplate "just to be safe."

## KISS — Keep It Simple

Simplicity means building a system that does a limited set of things in specific ways, reducing the surface area where bugs can happen. Simple does not mean fragile, naive, or incomplete — it means every piece earns its place.

### Core Rules

- No legacy fallbacks or backward compatibility shims. Change it or remove it. Tell the user what changed.
- Linear code flow. No circular references. A reader follows top-to-bottom.
- Mutually exclusive structure. Directories, files, and functions each own one thing.
- No magic values. No unnecessary .env variables. Configuration is minimal and intentional.
- One change, one path. Replace, don't layer.
- Small failure surface. Fewer moving parts, each one solid. Error boundaries and validation are required.
- Flat over nested. 3+ levels of nesting means flatten it.

### Fix From the Root

When fixing bugs, look at it architecturally first. If the problem is in the design, fix the design — don't patch symptoms.

### Reduce Before You Add

When fixing bugs or enhancing existing code, the goal is fewer lines, not more. Only adding new features justifies substantial new code. Even then, look for what to remove first.

### Before Committing

1. Could this be achieved by removing or simplifying instead of adding?
2. Is there exactly one code path for the changed behavior?
3. Can someone read this top-to-bottom without jumping around?
4. If I delete any piece, does something visibly break?
5. Am I fixing the root cause or a symptom?
```
