---
name: kiss
description: Scan codebase for CLAUDE.md and AGENTS.md files, inject KISS coding principles via smart merge, or create them if missing.
---

# KISS — Keep It Simple

This skill injects KISS coding principles into a codebase's CLAUDE.md and AGENTS.md files.

## Workflow

### 1. Scan

Glob for `**/CLAUDE.md` and `**/AGENTS.md` across the codebase. Skip `node_modules`, `.git`, `dist`, `build`, `vendor`, and any other dependency/output directories.

### 2. Load KISS Content

Read `references/kiss-content.md` from this skill's directory. This is the block to inject.

### 3. Process Found Files

For each file found:

1. Read the current content in full.
2. **Idempotency check**: Search for a heading matching `## KISS`. If found, replace that entire section (up to the next `##` heading or end of file) with the updated content from `kiss-content.md`. Do not duplicate.
3. **Smart merge**: Scan existing `##` headings for keywords: "style", "guidelines", "quality", "principles", "conventions", "code review", "standards". For each match, if it doesn't already contain a KISS reference, insert a single line at the end of that section:
   ```
   > Keep it simple — see the KISS section below for principles on writing clear, minimal code.
   ```
4. **Append**: If no existing KISS section was found in step 2, append the full content from `kiss-content.md` as a new section at the end of the file.
5. Preserve all existing content, formatting, and meaning. Do not rewrite, reorder, or rephrase anything outside of the KISS additions.

### 4. Create Missing Files

If no CLAUDE.md or AGENTS.md files were found anywhere in the codebase:

- Read `references/templates.md` from this skill's directory.
- Create `CLAUDE.md` at the project root using the CLAUDE.md template.
- Create `AGENTS.md` at the project root using the AGENTS.md template.

If only one of the two exists, create the missing one.

### 5. Report

Summarize what was done:
- Which files were modified and what was added
- Which files were created from templates
- Which files already had KISS content and were updated in place
