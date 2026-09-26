import { AnimatePresence } from "motion/react";
import { Glyph, srOnly, useRowLeft } from "./Glyphs";
import { DROP, RISE, SPRING_SNAPPY } from "./motion-spec";

const BELOW = { y: "110%" };
const IN_PLACE = { y: 0, transition: RISE };
// Separators wait a beat, so the old comma visibly drops before the new one rises.
const IN_PLACE_LATE = { y: 0, transition: { ...RISE, delay: 0.06 } };
const DROPPED = { y: "110%", transition: DROP };
const MASK = "linear-gradient(to bottom, #000 78%, transparent 100%)";

/**
 * Family-style amount entry display. Digits keep their identity by position
 * from the left (the order they were typed), so a new digit rises in at the end
 * while the rest re-center. Group separators are keyed by how many digits
 * precede them: when grouping changes, the old comma drops out where it stood
 * and a new one rises in at its new place. Glyphs enter and leave through a
 * soft mask at the bottom of the line.
 */
export function AmountText({ value, prefix = "$", locale }: { value: string; prefix?: string; locale?: string }) {
  const glyphs = toGlyphs(value, locale);
  const formatted = prefix + glyphs.map((g) => g.char).join("");
  const { ref: rowRef, left: rowLeft } = useRowLeft(formatted);

  return (
    <span
      ref={rowRef}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "baseline",
        fontVariantNumeric: "tabular-nums",
        paddingBottom: "0.12em",
        maskImage: MASK,
        WebkitMaskImage: MASK,
      }}
    >
      <span style={srOnly}>{formatted}</span>
      <AnimatePresence initial={false} mode="popLayout">
        <Glyph key="prefix" rowLeft={rowLeft} initial={BELOW} animate={IN_PLACE} exit={DROPPED} layoutTransition={SPRING_SNAPPY}>
          <span style={{ fontSize: "0.55em", verticalAlign: "0.7em" }}>{prefix}</span>
        </Glyph>
        {glyphs.map((g) => (
          <Glyph
            key={g.key}
            rowLeft={rowLeft}
            initial={BELOW}
            animate={g.separator ? IN_PLACE_LATE : IN_PLACE}
            exit={DROPPED}
            layoutTransition={SPRING_SNAPPY}
          >
            {g.char}
          </Glyph>
        ))}
      </AnimatePresence>
    </span>
  );
}

type AmountGlyph = { key: string; char: string; separator?: boolean };

function toGlyphs(value: string, locale?: string): AmountGlyph[] {
  const [intPart = "", fracPart] = value.split(".");
  const digits = intPart.replace(/\D/g, "");
  const format = new Intl.NumberFormat(locale);
  const group = format.formatToParts(1000).find((p) => p.type === "group")?.value ?? ",";
  const decimal = format.formatToParts(1.1).find((p) => p.type === "decimal")?.value ?? ".";

  // The empty-state "0" is a placeholder, not a typed digit: the first real digit replaces it.
  const glyphs: AmountGlyph[] = digits ? [] : [{ key: "placeholder", char: "0" }];
  for (let i = 0; i < digits.length; i++) {
    glyphs.push({ key: `d${i}`, char: digits[i] });
    const remaining = digits.length - 1 - i;
    if (remaining > 0 && remaining % 3 === 0) glyphs.push({ key: `s${i + 1}`, char: group, separator: true });
  }
  if (fracPart !== undefined) {
    glyphs.push({ key: "point", char: decimal });
    for (let i = 0; i < fracPart.length; i++) glyphs.push({ key: `f${i}`, char: fracPart[i] });
  }
  return glyphs;
}
