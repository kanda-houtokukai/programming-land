// キーボード図（ホームポジション・指の色分け・次キー点灯）
// b4l: ①キーをタップ入力に（onKeyTap＝物理キーと同じ処理へ）②狭幅でも画面内に収まるレスポンシブ
//   コンテナ実幅から キーサイズ/gap/行段差 を計算（枠線2.5px×2はwidth外＝box-sizing未リセットのため明示的に差し引く）。
//   狭幅(<430px)では指ラベルを隠す。最小キー18px・段差/gapの初期値は実機で微調整。
import { useEffect, useRef, useState } from "react";
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

const KEY_BORDER = 2.5; // キーの枠線（width外に付くぶん・計算で差し引く）

export default function TypingKeyboard({ highlight = null, showLegend = true, onKeyTap = null }) {
  // コンテナ実幅からレイアウトを計算（HomeRoomのroomWと同じ実測方式＝どの幅でもはみ出さない）。
  // ★計測は三重化: 毎レンダー後の実測（変化時のみsetState）＋window resize＋ResizeObserver。
  //   環境によってはROが発火しないことがある（Browser paneで実測・matchMedia誤発火b4bと同族の癖）ため、
  //   打鍵のたびに再レンダー→実測、が実質の保険になる
  const wrapRef = useRef(null);
  const [w, setW] = useState(480);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const cw = el.clientWidth || 480;
    if (cw !== w) setW(cw);
  });
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setW(el.clientWidth || 480);
    measure();
    let ro = null;
    if (typeof ResizeObserver !== "undefined") { ro = new ResizeObserver(measure); ro.observe(el); }
    window.addEventListener("resize", measure);
    return () => { if (ro) ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);
  const narrow = w < 430;
  const gap = narrow ? 3 : 4;
  const rowStep = narrow ? 6 : 10;             // 行の段差（2段目・3段目のずれ）
  const inner = Math.max(200, w - 16);         // パネルの左右padding(8×2)を引いた使える幅
  // 最長の1段目（11キー）が収まるサイズ: 11キー + 10gap + 枠線(2.5×2×11)
  const keySize = Math.max(18, Math.min(40, Math.floor((inner - gap * 10 - KEY_BORDER * 2 * 11) / 11)));
  const fontSize = Math.max(10, Math.round(keySize * 0.42));

  const tap = k => { if (onKeyTap) onKeyTap(k); };

  return (
    <div ref={wrapRef} className="panel" style={{ padding: "10px 8px", background: "#FBFDFF", maxWidth: "100%", overflow: "hidden" }}>
      <div style={{ display: "grid", gap, justifyItems: "center" }}>
        {ROWS.map((row, ri) => (
          <div key={ri} style={{ display: "flex", gap, marginLeft: ri * rowStep }}>
            {row.map(k => {
              const lit = highlight === k;
              return (
                <button key={k} type="button" onClick={() => tap(k)} aria-label={`キー ${k}`}
                  style={{
                    width: keySize, height: keySize, padding: 0,
                    border: `${KEY_BORDER}px solid ${C.ink}`, borderRadius: 8,
                    background: lit ? C.sun : FINGER_COLOR[FINGER[k]],
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 900, fontSize, textTransform: "uppercase", fontFamily: "inherit", color: C.ink,
                    position: "relative", cursor: onKeyTap ? "pointer" : "default",
                    touchAction: "manipulation", // ダブルタップ拡大を防ぐ（連打で打つため）
                    boxShadow: lit ? `0 0 0 2px #fff, 0 0 10px 4px rgba(255,212,71,.9)` : "1.5px 1.5px 0 rgba(58,51,53,.5)",
                    outline: HOME.has(k) ? `2px dashed rgba(58,51,53,.4)` : "none", outlineOffset: -5,
                  }} className={lit ? "glow" : ""}>
                  {k}
                  {BUMP.has(k) && <span style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 8, height: 2.5, background: C.ink, borderRadius: 2, opacity: .6 }} />}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      {showLegend && !narrow && (
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
