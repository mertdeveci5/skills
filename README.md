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

## Repository layout

```text
skills/
  handshake/
    SKILL.md
```

## License

MIT
