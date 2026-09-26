import { AnimatePresence, motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  BACKDROP,
  CONTENT_ENTER_FROM,
  CONTENT_ENTER_TO,
  CONTENT_EXIT,
  SPRING,
  SPRING_PRESENT,
  TRAY_INSET,
  TRAY_RADIUS,
} from "./motion-spec";

type TrayProps = {
  open: boolean;
  /** Key of the current step. Changing it crossfades content and morphs the height. */
  view: string;
  /** Called by the backdrop and by the × on the first step. */
  onClose: () => void;
  /** When set, the × navigates back instead of closing (the same icon, a different role). */
  onBack?: () => void;
  theme?: "light" | "dark";
  labelledBy?: string;
  children: ReactNode;
};

/**
 * A Family-style tray: a floating sheet inset from the screen edges that rises
 * from below, keeps one job per step, and morphs its height between steps so
 * each step reads as a different room. Content is top-anchored; the bottom edge
 * never moves.
 */
export function Tray({ open, view, onClose, onBack, theme = "light", labelledBy, children }: TrayProps) {
  const dark = theme === "dark";
  const trayRef = useRef<HTMLDivElement>(null);
  const dismiss = useRef(onClose);
  useLayoutEffect(() => {
    dismiss.current = onBack ?? onClose;
  });

  // Move focus into the tray, handle Escape like the × button, and return focus to the trigger afterwards.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    trayRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss.current();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open]);

  // When a step swaps out the focused control, keep focus inside the tray.
  useEffect(() => {
    const tray = trayRef.current;
    if (open && tray && !tray.contains(document.activeElement)) tray.focus();
  }, [open, view]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: BACKDROP.opacity, transition: BACKDROP.transition }}
            exit={{ opacity: 0, transition: BACKDROP.transition }}
            style={{ position: "fixed", inset: 0, background: "#000" }}
          />
          <motion.div
            key="tray"
            ref={trayRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            initial={{ y: "calc(100% + 64px)" }}
            animate={{ y: 0 }}
            exit={{ y: "calc(100% + 64px)" }}
            transition={SPRING_PRESENT}
            style={{
              position: "fixed",
              left: TRAY_INSET,
              right: TRAY_INSET,
              bottom: `max(${TRAY_INSET}px, env(safe-area-inset-bottom))`,
              maxWidth: 420,
              margin: "0 auto",
              borderRadius: TRAY_RADIUS,
              background: dark ? "#1C1C1E" : "#FFFFFF",
              color: dark ? "#FFFFFF" : "#111111",
              overflow: "hidden",
              outline: "none",
            }}
          >
            <TrayBody view={view}>{children}</TrayBody>
            <button
              type="button"
              aria-label={onBack ? "Back" : "Close"}
              onClick={onBack ?? onClose}
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                width: 32,
                height: 32,
                borderRadius: 16,
                border: 0,
                display: "grid",
                placeItems: "center",
                background: dark ? "#2C2C2E" : "#F7F8F9",
                color: dark ? "#8E8E93" : "#949595",
                cursor: "pointer",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M10.5 1.5L1.5 10.5M1.5 1.5L10.5 10.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/** Measures the current step and springs the tray's height to it. */
function TrayBody({ view, children }: { view: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setHeight(entry.borderBoxSize[0].blockSize));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div initial={false} animate={{ height }} transition={SPRING} style={{ position: "relative" }}>
      <div ref={ref}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={view}
            initial={CONTENT_ENTER_FROM}
            animate={CONTENT_ENTER_TO}
            exit={CONTENT_EXIT}
            style={{ padding: 24 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
