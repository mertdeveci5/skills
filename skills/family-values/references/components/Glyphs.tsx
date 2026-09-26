import { motion, useIsPresent, useMotionValue, useMotionValueEvent, type MotionValue, type Transition, type TargetAndTransition } from "motion/react";
import { useLayoutEffect, useRef, useState, type ReactNode, type Ref } from "react";

/**
 * Tracks the on-screen left edge of a centered row of glyphs. Rows re-center
 * when their width changes, and AnimatePresence's popLayout pins exiting
 * glyphs relative to the row, so exits need this to stay where they were.
 */
export function useRowLeft(dep: unknown) {
  const ref = useRef<HTMLSpanElement>(null);
  const left = useMotionValue(0);
  useLayoutEffect(() => {
    if (ref.current) left.set(ref.current.getBoundingClientRect().left);
  }, [dep, left]);
  return { ref, left };
}

type GlyphProps = {
  rowLeft: MotionValue<number>;
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
  layoutTransition: Transition;
  children: ReactNode;
  // Must reach the DOM node: popLayout measures it.
  ref?: Ref<HTMLSpanElement>;
};

/**
 * A glyph that glides to its new place while present, and animates out
 * exactly where it stood once removed, even if its row re-centers.
 */
export function Glyph({ rowLeft, initial, animate, exit, layoutTransition, children, ref }: GlyphProps) {
  const isPresent = useIsPresent();
  const [leftAtExit, setLeftAtExit] = useState<number | null>(null);
  if (!isPresent && leftAtExit === null) setLeftAtExit(rowLeft.get());
  const x = useMotionValue(0);
  useMotionValueEvent(rowLeft, "change", (left) => {
    if (leftAtExit !== null) x.set(leftAtExit - left);
  });

  return (
    <motion.span
      ref={ref}
      aria-hidden
      layout={isPresent ? "position" : false}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{ layout: layoutTransition }}
      style={{ display: "inline-block", x }}
    >
      {children}
    </motion.span>
  );
}

export const srOnly = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
} as const;
