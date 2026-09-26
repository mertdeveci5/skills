// Motion constants measured frame-by-frame from the Family app recordings
// in benji.org/family-values (60fps, iPhone @3x). Springs use mass 1.
// See references/motion-spec.md in the family-values skill for the data.

// Tray height changes, shared-element travel, text-morph glyph glide.
// Fit over 11 tray transitions: stiffness 480–614, damping ratio 0.85–0.90
// (≈ SwiftUI .spring(response: 0.27, dampingFraction: 0.88)). Settles ≈0.28s.
export const SPRING = { type: "spring", stiffness: 540, damping: 41, mass: 1 } as const;

// Tray entering from below / leaving downward. Damping ratio ≈0.89, slightly faster.
export const SPRING_PRESENT = { type: "spring", stiffness: 800, damping: 50, mass: 1 } as const;

// Small, frequent motion: digits re-centering in number entry.
// Fit: stiffness ≈1130, damping ratio ≈0.94. Settles ≈0.23s.
export const SPRING_SNAPPY = { type: "spring", stiffness: 1100, damping: 63, mass: 1 } as const;

// Number entry: new glyphs rise through the line's bottom edge at full speed and
// ease out (per-frame decay ≈0.63; fit rms 0.45pt); removed glyphs drop with an ease-in.
export const RISE = { duration: 0.26, ease: [0.16, 1, 0.3, 1] } as const;
export const DROP = { duration: 0.2, ease: [0.42, 0, 1, 1] } as const;

// Tab switch: a ~0.1s "flash" of direction. Incoming settles from ~24pt.
export const SPRING_FLASH = { type: "spring", stiffness: 2000, damping: 68, mass: 1 } as const;

// Backdrop behind trays: black at 30%, ≈0.2s ease-out both ways.
export const BACKDROP = { opacity: 0.3, transition: { duration: 0.2, ease: [0.4, 0.5, 0.3, 1] } } as const;

// Tray content swap (old and new overlap, top-anchored):
// outgoing fades out in ≈0.12s with a slight blur; incoming fades in ≈0.18s
// while scaling up from 0.90 around the content's center (fit rms 0.002).
export const CONTENT_EXIT = { opacity: 0, filter: "blur(2px)", transition: { duration: 0.12, ease: "easeOut" } } as const;
export const CONTENT_ENTER_FROM = { opacity: 0, scale: 0.9, filter: "blur(0px)" } as const;
export const CONTENT_ENTER_TO = {
  opacity: 1,
  scale: 1,
  filter: "blur(0px)",
  transition: { opacity: { duration: 0.18, ease: "easeOut" }, scale: SPRING },
} as const;

// Glyphs that appear or disappear during a text morph fade in place, ≈0.2s.
export const GLYPH_FADE = { duration: 0.2, ease: "easeOut" } as const;

// Tray geometry (points): 16pt side inset, bottom = max(16pt, safe area),
// continuous corner radius ≈36pt.
export const TRAY_INSET = 16;
export const TRAY_RADIUS = 36;
