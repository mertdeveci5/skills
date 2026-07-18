---
name: runtime-teleport
description: Teleport the active local Codex coding session and its current Git repository into a Runtime cloud microVM with `runtime teleport`. Use only when the user explicitly invokes `$runtime-teleport` to checkpoint and push the current repository state, create or reuse a Runtime teleport workspace, seed a remote Codex thread, and stop local execution after a successful handoff. Do not use for ordinary VM creation, repository cloning, email or mobile continuation, or implicit backgrounding.
---

# Runtime Teleport

Use the Runtime CLI as the only teleport implementation. Do not add hooks or
slash commands, manually commit or push, copy Codex state files, start Codex App
Server, or reconstruct the conversation yourself.

## Preconditions

- Run from an active Codex session in a Git repository after at least one prior
  turn has completed.
- Treat explicit `$runtime-teleport` invocation as authorization to checkpoint
  and push all current tracked and untracked non-ignored repository changes and
  to create Runtime infrastructure.
- Tell the user once that this operation commits and pushes the current state,
  creates or reuses a `teleport/<id>` workspace, and seeds a remote Codex thread.

Run these read-only checks:

```bash
command -v runtime
runtime teleport --help
test -n "${CODEX_THREAD_ID:-}"
git rev-parse --show-toplevel
git remote get-url origin
git status --short --branch --untracked-files=all
RUNTIME_NO_TTY=1 runtime whoami
RUNTIME_NO_TTY=1 runtime github list
RUNTIME_NO_TTY=1 runtime codex status
```

Stop before teleporting if the repository is not on an attached branch, has no
GitHub `origin`, or the status shows a likely credential, private key, `.env`
file, or unintended sensitive file. Never print credential values.

If `runtime` is missing, report `uv tool install runtime-sdk`. If the CLI lacks
`runtime teleport`, report `uv tool upgrade runtime-sdk`. Do not install,
upgrade, authenticate, edit files, switch branches, or repair prerequisites
without the user's explicit approval. Relay the Runtime CLI's exact login or
integration command when an authentication check fails.

## Execute

Change to the repository root returned by `git rev-parse`, then run exactly:

```bash
RUNTIME_NO_TTY=1 runtime teleport --yes
```

Do not pass `--codex-hook` or modify `~/.codex/hooks.json`.

Run the command once. If transport is interrupted before any terminal Runtime
result, rerun the exact command once; teleport resumes the same transfer. Do not
retry an actionable error.

## Finish

Success requires exit code zero, `success: true`, and non-empty values for:

- `transfer_id`
- `repo`
- `source_branch`
- `checkpoint_commit`
- `teleport_branch`
- `computer_id`
- `remote_thread_id`
- `enter_command`
- `resume_command`

On success, report the checkpoint, teleport branch, computer ID, remote thread
ID, and the returned enter and resume commands. Say that the handoff is complete
and the source computer can be closed. Then stop immediately.

After success, do not run another tool, enter the VM, resume the remote thread,
continue the original task, rerun teleport, archive or delete the computer,
discard state, deploy, merge, or clean up.

On failure, stop and relay the exact error, completed phase, and recovery command
if present. Never run `--discard` automatically: it removes local transfer state
while leaving any remote branch or computer intact, so it requires explicit user
approval.
