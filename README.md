# Skills

A public collection of Agent Skills by Mert Deveci.

Each skill lives in its own folder under `skills/` and follows the Agent Skills `SKILL.md` format so it can be used by pi and other compatible harnesses.

## Skills

### Handshake

Relentlessly stress-tests plans, architecture, product decisions, migrations, and feature designs one question at a time until there is shared understanding.

Install with the open `skills` CLI:

```bash
npx skills add mertdeveci5/skills --skill handshake
```

Install in pi:

```bash
pi install git:github.com/mertdeveci5/skills
```

Use in pi:

```text
/skill:handshake Stress-test this feature plan...
```

### Bug Fix

Investigates bugs, messy changes, and incomplete plans from the root cause first, preferring simplification and architectural cleanup before local patches when the code structure is causing the problem.

Install with the open `skills` CLI:

```bash
npx skills add mertdeveci5/skills --skill bug-fix
```

Use in pi:

```text
/skill:bug-fix Fix this regression and clean up the code path...
```

### KISS

Applies KISS (Keep It Simple) engineering principles while planning, implementing, reviewing, or simplifying code. The guidance stays in the agent context and does not modify project instruction files by default.

Install with the open `skills` CLI:

```bash
npx skills add mertdeveci5/skills --skill kiss
```

Use in pi:

```text
/skill:kiss
```

### Product Description

Creates an outside-in specification of a product's user-visible behavior from code and tests, verifies it against the running product, and tracks open questions and suspected defects.

Install with the open `skills` CLI:

```bash
npx skills add mertdeveci5/skills --skill product-description
```

Use in pi:

```text
/skill:product-description Describe this product's behavior feature by feature.
```

### Simplify Codebase

Simplifies codebase architecture and implementation while preserving behavior, applying local `AGENTS.md` and `CLAUDE.md` standards before making small, verified cleanup slices.

Install with the open `skills` CLI:

```bash
npx skills add mertdeveci5/skills --skill simplify-codebase
```

Use in pi:

```text
/skill:simplify-codebase Simplify this subsystem while preserving behavior.
```

### Thermo-Nuclear Code Quality Review

Runs an unusually strict maintainability review focused on structural simplification, abstraction quality, file growth, spaghetti branching, and clean architecture boundaries.

Install with the open `skills` CLI:

```bash
npx skills add mertdeveci5/skills --skill thermo-nuclear-code-quality-review
```

Use in pi:

```text
/skill:thermo-nuclear-code-quality-review Review the current branch's changes.
```

Adapted from Cursor's [Cursor Team Kit](https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/thermo-nuclear-code-quality-review) under the MIT License.

## Repository layout

```text
skills/
  bug-fix/
    SKILL.md
    agents/
      openai.yaml
  handshake/
    SKILL.md
  kiss/
    SKILL.md
  product-description/
    SKILL.md
    agents/
      openai.yaml
    references/
  simplify-codebase/
    SKILL.md
    agents/
      openai.yaml
  thermo-nuclear-code-quality-review/
    SKILL.md
    LICENSE
    agents/
      openai.yaml
```

## License

MIT
