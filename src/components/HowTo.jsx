// 「あそびかた」の折りたたみ（アコーディオン）。既定は閉じ・初回だけ開く
import { useState } from "react";
import { C } from "../theme.js";
import { HOWTO } from "../data/howto.js";

const SEEN_KEY = "progland:v2:howtoSeen";
function loadSeen() {
  try { return new Set(JSON.parse(localStorage.getItem(SEEN_KEY)) || []); }
  catch (e) { return new Set(); }
}
function markSeen(id) {
  const s = loadSeen(); s.add(id);
  try { localStorage.setItem(SEEN_KEY, JSON.stringify([...s])); } catch (e) { /* 保存できなくても動く */ }
}

export default function HowTo({ id }) {
  const info = HOWTO[id];
  // 初回（まだ見ていない）だけ最初から開く。見たことがあれば閉じておく
  const [open, setOpen] = useState(() => {
    const first = !loadSeen().has(id);
    if (first) markSeen(id);
    return first;
  });
  if (!info) return null;
  return (
    <div className="panel" style={{ padding: 0, overflow: "hidden", background: "#fff" }}>
      <button className="pbtn" onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: "100%", background: open ? "#EAF7FF" : "#fff", border: "none", boxShadow: "none",
          borderRadius: 0, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8,
          fontSize: 15, textAlign: "left",
        }}>
        <span style={{ fontSize: 18 }}>❓</span>
        <span style={{ flex: 1, fontWeight: 900 }}>あそびかた</span>
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
        </div>
      )}
    </div>
  );
}
