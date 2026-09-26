import { motion } from "motion/react";
import { SPRING } from "./motion-spec";

/**
 * One visual object for "pending work": it starts life as the action button,
 * collapses into a spinner where the button was, and later travels to where
 * the result will live (a tab, an inbox, the original item).
 *
 * Render <PendingButton>, <PendingSpinner> and <PendingBadge> with the same `id`
 * in exactly one place at a time. Motion morphs between them because they
 * share a layoutId. The tree they live in must stay mounted across the switch
 * (render the destination while the source unmounts, in the same commit), and
 * wrapping each spot in <AnimatePresence> lets the outgoing shape crossfade.
 */
export function PendingButton({ id, label, onClick }: { id: string; label: string; onClick: () => void }) {
  return (
    <motion.button
      layoutId={id}
      transition={SPRING}
      onClick={onClick}
      style={{ height: 50, width: "100%", borderRadius: 25, border: 0, background: "#fff", color: "#000", font: "600 17px system-ui", cursor: "pointer" }}
    >
      <motion.span layout="position">{label}</motion.span>
    </motion.button>
  );
}

export function PendingSpinner({ id, size = 36 }: { id: string; size?: number }) {
  return (
    <motion.div layoutId={id} transition={SPRING} role="status" aria-label="Pending" style={{ width: size, height: size, borderRadius: size / 2, display: "grid", placeItems: "center" }}>
      <Spinner size={size} />
    </motion.div>
  );
}

export function PendingBadge({ id, size = 22 }: { id: string; size?: number }) {
  return <PendingSpinner id={id} size={size} />;
}

function Spinner({ size }: { size: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </motion.svg>
  );
}
