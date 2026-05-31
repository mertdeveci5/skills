## KISS — Keep It Simple

Simplicity means building a system that does a limited set of things in specific ways, reducing the surface area where bugs can happen. Simple does not mean fragile, naive, or incomplete — it means every piece earns its place.

### Core Rules

- **No legacy fallbacks or backward compatibility shims.** When you change something, change it. Don't leave the old path "just in case" — it makes it impossible to tell if the new code is actually running. If something is removed, tell the user what was removed and why. Don't silently keep it alive.
- **Linear code flow.** A reader should be able to follow the codebase top-to-bottom without jumping between files to understand what happens. No circular references. No importing from a file that imports back from you.
- **Mutually exclusive structure.** Directories own their domain. Files own their responsibility. Functions own their task. If two things live in the same file, they'd better be inseparable. If they're not, split them.
- **No magic values.** No hardcoded strings or numbers that only make sense if you wrote them. No inventing a new `.env` variable for every experiment or toggle. Configuration should be minimal and intentional.
- **One change, one path.** When modifying behavior, there should be exactly one code path that executes. Not a new path alongside the old one. Not a feature flag wrapping both. Replace, don't layer.
- **Small failure surface.** Do fewer things, but do them completely. Error boundaries, validation, and proper error messages are not complexity — they're what makes a simple system trustworthy.
- **Flat over nested.** If logic is buried 3+ levels deep, flatten it with early returns or guard clauses. If a directory tree is 4 levels deep with one file at the bottom, flatten it.

### Fix From the Root, Not the Surface

When a bug or bad behavior is found, the first instinct should not be to patch the code where the symptom appears. Step back and look at it architecturally:
- Why did this bug happen? Is it a design flaw, a responsibility in the wrong place, a missing boundary?
- If the problem is architectural, fix the architecture. A patch on a broken design is a second bug waiting to happen.
- Patching symptoms leads to infinite patches. Fixing structure leads to fewer bugs over time.

### Reduce Before You Add

After a codebase reaches a certain level of complexity, the right move is almost always to reduce lines of code rather than add more. This is especially true when:
- You are fixing a bug — the fix should ideally make the code shorter, not longer. If your bugfix adds significant code, question whether the original design is right.
- You are enhancing existing functionality — refactor and simplify what's there, then add the enhancement. Don't pile new logic on top of already-complex code.
- You are refactoring — the whole point is to come out with less, not more.

The only time adding substantial code is justified is when building genuinely new features or functionality. Even then, look for what you can remove or replace first.

### Dependency and Abstraction Discipline

- Don't pull in a library for something that's 10 lines of code.
- Don't create base classes, interfaces, or factories for a single implementation. Wait until you have 3+ concrete cases before abstracting.
- No barrel files that just re-export. Import directly from the source.
- No wrapper layers around libraries unless you're genuinely isolating a swap-out point.
- Don't add logging, metrics, retry logic, or caching unless explicitly asked. Don't bolt on "production-readiness" that nobody needs yet.

### Code Hygiene

- No commented-out code. That's what git is for.
- No "just in case" parameters or options that nothing uses yet.
- Don't create types or interfaces that mirror data 1:1 without adding constraints — that's noise.
- If a function takes more than 4 parameters, it's doing too much.
- If a file is over 200 lines, it's probably mixing concerns.
- If a function needs a comment to explain what it does, rename it instead.
- No abbreviations unless they're universal (`id`, `url`, `db` — fine. `usr`, `mgr`, `svc` — no).

### What Simple Actually Means

A simple system:
- Has clear error boundaries at every external interface
- Validates inputs where they enter the system
- Fails loudly with useful messages, never silently
- Is secure by default, not as an afterthought
- Can be traced from entry to exit by reading files in order
- Has no dead code — removing any piece visibly breaks something

### Anti-Patterns

- **The safety net that hides bugs**: Wrapping new code in try/catch that falls back to old behavior. Now you'll never know the new code throws.
- **The compatibility graveyard**: Keeping deprecated functions, old API routes, renamed-but-still-exported variables "for backward compatibility." Delete them. Tell the user.
- **The infinite patch**: Fixing symptoms instead of causes. If the third patch for the same area doesn't fix it, the problem is the design.
- **The spaghetti import**: File A imports from B, B imports from C, C imports from A. Circular dependencies destroy readability.
- **The junk drawer file**: `utils.ts`, `helpers.py`, `common.js` — files that collect unrelated functions because nobody wants to find them a real home.
- **The .env hoarder**: 40 environment variables, half from experiments 3 months ago. Keep it lean.
- **The speculative abstraction**: Building for hypothetical future requirements. Three lines of duplicate code is better than a premature abstraction.

### Before Committing Any Change

Ask:
1. Did I add code? Could I have achieved this by removing or simplifying instead?
2. Is there exactly one code path for the changed behavior, or did I leave the old one alive?
3. Can someone read this change top-to-bottom without jumping around?
4. If I delete any piece of what I added, does something visibly break? If not, that piece shouldn't exist.
5. Is the bug I'm fixing a symptom or the actual root cause?
