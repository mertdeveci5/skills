import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { Glyph, srOnly, useRowLeft } from "./Glyphs";
import { GLYPH_FADE, SPRING } from "./motion-spec";

type Letter = { id: number; char: string };

const FADE_IN = { opacity: 0 };
const SHOWN = { opacity: 1, transition: GLYPH_FADE };
const FADE_OUT = { opacity: 0, transition: GLYPH_FADE };

/**
 * Family-style text morph ("Continue" → "Confirm", "Craft" → "Creative").
 * Letters shared in order between the old and new text (longest common
 * subsequence) keep their identity and glide to their new positions. Removed
 * letters fade out exactly where they stood; added letters fade in where they land.
 */
export function MorphText({ text, className }: { text: string; className?: string }) {
  // Keep letter identities across renders (React's "adjust state during render" pattern).
  // Ids only ever increase, so a new letter never reuses the key of one still fading out.
  const [state, setState] = useState(() => ({ text, ...align([], [...text], 0) }));
  let current = state;
  if (state.text !== text) {
    current = { text, ...align(state.letters, [...text], state.nextId) };
    setState(current);
  }
  const { ref: rowRef, left: rowLeft } = useRowLeft(text);

  return (
    <span ref={rowRef} className={className} style={{ position: "relative", display: "inline-flex", whiteSpace: "pre" }}>
      <span style={srOnly}>{text}</span>
      <AnimatePresence initial={false} mode="popLayout">
        {current.letters.map((l) => (
          <Glyph key={l.id} rowLeft={rowLeft} initial={FADE_IN} animate={SHOWN} exit={FADE_OUT} layoutTransition={SPRING}>
            {l.char}
          </Glyph>
        ))}
      </AnimatePresence>
    </span>
  );
}

/** Reuse ids for letters in the longest common subsequence of old and new text. */
function align(old: Letter[], chars: string[], firstNewId: number): { letters: Letter[]; nextId: number } {
  let id = firstNewId;
  const n = old.length;
  const m = chars.length;
  const lcs = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      lcs[i][j] = old[i].char === chars[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);

  const letters: Letter[] = [];
  let i = 0;
  let j = 0;
  while (j < m) {
    if (i < n && old[i].char === chars[j] && lcs[i][j] === lcs[i + 1][j + 1] + 1) {
      letters.push({ id: old[i].id, char: chars[j] });
      i++;
      j++;
    } else if (i < n && lcs[i + 1][j] >= lcs[i][j + 1]) {
      i++;
    } else {
      letters.push({ id: id++, char: chars[j] });
      j++;
    }
  }
  return { letters, nextId: id };
}
