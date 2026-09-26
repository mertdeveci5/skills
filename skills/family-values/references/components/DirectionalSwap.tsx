import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState, type ReactNode } from "react";
import { SPRING_FLASH } from "./motion-spec";

const OFFSET = 24; // points of travel, measured from Family's tab switches

const variants: Variants = {
  enter: (dir: number) => ({ x: dir * OFFSET, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { x: SPRING_FLASH, opacity: { duration: 0.1, ease: "easeOut" } } },
  exit: (dir: number) => ({ x: dir * -OFFSET, opacity: 0, transition: { duration: 0.08, ease: "linear" } }),
};

/**
 * Family-style tab switch: a quick flash of directional motion. Content for a
 * tab to the right arrives from the right while the old content drifts left,
 * both crossfading in about 0.1s. Pass the index of the active tab.
 */
export function DirectionalSwap({ index, children }: { index: number; children: ReactNode }) {
  // Derive direction from the previous index (React's "adjust state during render" pattern).
  const [last, setLast] = useState({ index, dir: 0 });
  if (last.index !== index) setLast({ index, dir: index > last.index ? 1 : -1 });
  const dir = last.index === index ? last.dir : index > last.index ? 1 : -1;

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <AnimatePresence initial={false} mode="popLayout" custom={dir}>
        <motion.div key={index} custom={dir} variants={variants} initial="enter" animate="center" exit="exit">
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
