import { AnimatePresence, motion } from "motion/react";
import type { ReactNode, Ref } from "react";
import { SPRING } from "./motion-spec";

type PendingActionProps = {
  /** Shared id for the spinner, so it can later travel to a <PendingBadge> with the same id. */
  id: string;
  pending: boolean;
  onClick: () => void;
  children: ReactNode;
  height?: number;
  background?: string;
  color?: string;
  /** Spinner color once collapsed; match the surface behind the button. */
  spinnerColor?: string;
};

/**
 * Family-style "pending work" object. The action button shrinks in place into
 * a circle while its label fades and a spinner appears. When the result has a
 * home elsewhere (a tab, an inbox, the original item), render <PendingBadge>
 * with the same id there, in the same commit this button unmounts, and the
 * spinner itself travels to it. One object throughout, never a duplicate.
 */
export function PendingAction({ id, pending, onClick, children, height = 50, background = "#fff", color = "#000", spinnerColor = "#fff" }: PendingActionProps) {
  return (
    // Width animates as real layout (not a scale transform), so the spinner stays centered and undistorted.
    <motion.button
      onClick={onClick}
      disabled={pending}
      aria-busy={pending}
      initial={false}
      animate={{
        width: pending ? height : "100%",
        backgroundColor: pending ? "rgba(128,128,128,0)" : background,
        color: pending ? spinnerColor : color,
      }}
      transition={{ width: SPRING, backgroundColor: { duration: 0.25 }, color: { duration: 0.25 } }}
      style={{
        height,
        borderRadius: height / 2,
        border: 0,
        padding: 0,
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        cursor: pending ? "default" : "pointer",
        font: "inherit",
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {pending ? (
          <PendingSpinner key="spinner" id={id} size={height * 0.72} appear />
        ) : (
          <motion.span
            key="label"
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/** The destination end of the handoff: the same spinner, now living where the result is. */
export function PendingBadge({ id, size = 22 }: { id: string; size?: number }) {
  return <PendingSpinner id={id} size={size} />;
}

// `ref` must reach the DOM node: AnimatePresence's popLayout mode measures it.
function PendingSpinner({ id, size, appear, ref }: { id: string; size: number; appear?: boolean; ref?: Ref<HTMLSpanElement> }) {
  return (
    <motion.span
      ref={ref}
      layoutId={id}
      transition={SPRING}
      initial={appear ? { opacity: 0 } : false}
      animate={{ opacity: 1, transition: { duration: 0.15 } }}
      role="status"
      aria-label="Pending"
      style={{ width: size, height: size, display: "grid", placeItems: "center" }}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
        <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </motion.svg>
    </motion.span>
  );
}
