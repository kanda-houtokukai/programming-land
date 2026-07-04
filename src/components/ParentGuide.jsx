// 「おうちの方へ」折りたたみ（保護者向け）。パズルのプレイ画面内に置く。
// 子ども向けの「あそびかた」「ヒント」とは見た目で区別（落ち着いた大人向けトーン）。
// 既定は閉じ。開閉はローカルstateのみ＝画面遷移なし＝解きかけ（並べた命令）は消えない。
import { useState } from "react";
import { C } from "../theme.js";
import { PARENT_GUIDE } from "../data/parent-guide.js";

const INK = "#3A3335";
const PANEL_BG = "#EEEAF5";   // 落ち着いた うすむらさき（子ども向けの青/黄と区別）
const ACCENT = "#6B5B95";

export default function ParentGuide({ island }) {
  const g = PARENT_GUIDE[island];
  const [open, setOpen] = useState(false); // 大人が意図して開く。子どもの操作は じゃましない
  if (!g) return null; // ガイドのある島（1〜3）だけ表示
  return (
    <div style={{ border: `2px solid ${INK}`, borderRadius: 16, overflow: "hidden", background: "#fff", marginTop: 12 }}>
      <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open}
        style={{
          width: "100%", background: open ? PANEL_BG : "#fff", border: "none", cursor: "pointer",
          padding: "9px 14px", display: "flex", alignItems: "center", gap: 8, textAlign: "left",
          fontFamily: "inherit", color: INK,
        }}>
        <span style={{ fontSize: 17 }}>👨‍👩‍👧</span>
        <span style={{ flex: 1, fontWeight: 900, fontSize: 14 }}>おうちの方へ</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: ACCENT, background: "#fff", border: `1.5px solid ${ACCENT}`, borderRadius: 999, padding: "1px 8px" }}>保護者むけ</span>
        <span style={{ fontSize: 13, transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }}>▼</span>
      </button>
      {open && (
        <div style={{ padding: "12px 16px 14px", borderTop: `2px solid ${INK}`, background: "#FDFCFF" }}>
          <div style={{ fontWeight: 900, fontSize: 13, color: ACCENT, marginBottom: 8 }}>{g.skill}</div>
          {g.body.map((p, i) => (
            <p key={i} style={{ fontSize: 13, lineHeight: 1.75, margin: "0 0 8px", fontWeight: 500, color: "#4A4446" }}>{p}</p>
          ))}
          <div style={{ fontSize: 13, fontWeight: 700, background: "#FFF7E6", border: `2px solid ${INK}`, borderRadius: 12, padding: "8px 12px", marginTop: 4 }}>
            💡 {g.tip}
          </div>
        </div>
      )}
    </div>
  );
}
