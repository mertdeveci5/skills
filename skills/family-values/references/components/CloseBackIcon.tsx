import { motion } from "motion/react";
import { SPRING } from "./motion-spec";

// Two strokes that pivot between × (first step: close) and ‹ (later steps: back).
// Geometry from the icons in the Family Values essay (18×18 grid).
const SHAPES = {
  close: ["M13 5L5 13", "M13 13L5 5"],
  back: ["M10.5 4.5L6 9", "M10.5 13.5L6 9"],
} as const;

/**
 * The leading icon of a full-screen stepped flow. It morphs rather than swaps,
 * so the user sees which way they just moved. Render it inside a button whose
 * aria-label matches the current role.
 */
export function CloseBackIcon({ shape, size = 18 }: { shape: "close" | "back"; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden>
      {SHAPES[shape].map((d, i) => (
        <motion.path
          key={i}
          initial={false}
          animate={{ d }}
          transition={SPRING}
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
