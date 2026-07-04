// 「あそびかた」の折りたたみ（アコーディオン）。
// 既定は必ず閉じる（開きっぱなしで画面を圧迫しないため）。
// 閉じている間はボタンを目立たせ、「押せば開く」と分かる誘導（おしてね）を出す。
import { useState } from "react";
import { C } from "../theme.js";
import { HOWTO } from "../data/howto.js";

export default function HowTo({ id }) {
  const info = HOWTO[id];
  const [open, setOpen] = useState(false); // 最初から閉じる（全モード共通）
  if (!info) return null;
  return (
    <div className="panel" style={{ padding: 0, overflow: "hidden", background: "#fff" }}>
      <button className="pbtn" onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: "100%", background: open ? "#EAF7FF" : "#FFF3D6", border: "none", boxShadow: "none",
          borderRadius: 0, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8,
          fontSize: 15, textAlign: "left",
        }}>
        <span style={{ fontSize: 18 }}>❓</span>
        <span style={{ flex: 1, fontWeight: 900 }}>あそびかた</span>
        {/* 閉じている間だけ「おしてね」を出して、押せば開くと分かるようにする */}
        {!open && (
          <span className="bounce" style={{
            fontSize: 12, fontWeight: 900, color: C.ink, background: "#fff",
            border: `2px solid ${C.ink}`, borderRadius: 999, padding: "2px 9px", whiteSpace: "nowrap",
          }}>👆 おしてね</span>
        )}
        <span style={{ fontSize: 14, transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }}>▼</span>
      </button>
      {open && (
        <div className="slide" style={{ padding: "12px 16px", borderTop: `2px solid ${C.ink}` }}>
          <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.7 }}>{info.text}</div>
          {info.example && (
            <div style={{ marginTop: 8, fontWeight: 800, fontSize: 13, background: "#FFFDF5", border: `2px solid ${C.ink}`, borderRadius: 12, padding: "8px 12px" }}>
              💡 {info.example}
            </div>
          )}
          {/* 開いたら閉じられると分かるよう、下にも閉じるボタンを置く */}
          <button className="pbtn" onClick={() => setOpen(false)}
            style={{ marginTop: 10, background: "#fff", border: `2px solid ${C.ink}`, borderRadius: 999, padding: "5px 14px", fontSize: 13, fontWeight: 900 }}>
            とじる ▲
          </button>
        </div>
      )}
    </div>
  );
}
