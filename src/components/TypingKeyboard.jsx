// キーボード図（ホームポジション・指の色分け・次キー点灯）
import { C } from "../theme.js";

const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "-"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];
const HOME = new Set(["a", "s", "d", "f", "j", "k", "l"]);
const BUMP = new Set(["f", "j"]); // ひとさしゆびの めじるし

// ゆびの いろわけ（左右対称: こゆび=さくら ／ くすり=きいろ ／ なか=みどり ／ ひとさし=そら）
const FINGER = {
  q: "pinky", a: "pinky", z: "pinky", p: "pinky", "-": "pinky",
  w: "ring", s: "ring", x: "ring", o: "ring", l: "ring",
  e: "middle", d: "middle", c: "middle", i: "middle", k: "middle",
  r: "index", f: "index", v: "index", t: "index", g: "index", b: "index",
  y: "index", h: "index", n: "index", u: "index", j: "index", m: "index",
};
const FINGER_COLOR = { pinky: "#FFD9E3", ring: "#FFF1B8", middle: "#DCF5D0", index: "#D9EFFE" };
export const FINGER_LABELS = [
  { name: "こゆび", color: FINGER_COLOR.pinky },
  { name: "くすりゆび", color: FINGER_COLOR.ring },
  { name: "なかゆび", color: FINGER_COLOR.middle },
  { name: "ひとさしゆび", color: FINGER_COLOR.index },
];

export default function TypingKeyboard({ highlight = null, showLegend = true }) {
  return (
    <div className="panel" style={{ padding: "10px 8px", background: "#FBFDFF" }}>
      <div style={{ display: "grid", gap: 4, justifyItems: "center" }}>
        {ROWS.map((row, ri) => (
          <div key={ri} style={{ display: "flex", gap: 4, marginLeft: ri * 10 }}>
            {row.map(k => {
              const lit = highlight === k;
              return (
                <div key={k} style={{
                  width: "clamp(22px, 6.6vw, 40px)", aspectRatio: "1",
                  border: `2.5px solid ${C.ink}`, borderRadius: 8,
                  background: lit ? C.sun : FINGER_COLOR[FINGER[k]],
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "clamp(11px, 3vw, 17px)", textTransform: "uppercase",
                  position: "relative",
                  boxShadow: lit ? `0 0 0 2px #fff, 0 0 10px 4px rgba(255,212,71,.9)` : "1.5px 1.5px 0 rgba(58,51,53,.5)",
                  outline: HOME.has(k) ? `2px dashed rgba(58,51,53,.4)` : "none", outlineOffset: -5,
                }} className={lit ? "glow" : ""}>
                  {k}
                  {BUMP.has(k) && <span style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 8, height: 2.5, background: C.ink, borderRadius: 2, opacity: .6 }} />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {showLegend && (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 8, fontSize: 10, fontWeight: 800 }}>
          {FINGER_LABELS.map(f => (
            <span key={f.name} style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
              <span style={{ width: 12, height: 12, background: f.color, border: `2px solid ${C.ink}`, borderRadius: 4 }} />{f.name}
            </span>
          ))}
          <span style={{ opacity: .7 }}>てんせん = ホームポジション（fとjに でっぱり）</span>
        </div>
      )}
    </div>
  );
}
