// 「おうちの方へ」保護者向けガイド。パズルのプレイ画面内に置く。
// トリガーはボタン1つ。押すと画面の上に別レイヤー（モーダル）で開く。
// これなら下の操作ボタンを押し下げて隠さない／×で閉じれば元の画面（解きかけ）に戻る。
// 中身（parent-guide.js の文章）はそのまま。表示方法だけモーダル化した。
import { useState } from "react";
import { PARENT_GUIDE } from "../data/parent-guide.js";

const INK = "#3A3335";
const PANEL_BG = "#EEEAF5";   // 落ち着いた うすむらさき（子ども向けの青/黄と区別）
const ACCENT = "#6B5B95";

export default function ParentGuide({ island }) {
  const g = PARENT_GUIDE[island];
  const [open, setOpen] = useState(false);
  if (!g) return null; // ガイドのある島（1〜3）だけ表示

  return (
    <>
      {/* トリガー: 折りたたみではなくモーダルを開くボタン。見た目は大人向けトーンを踏襲 */}
      <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog"
        style={{
          width: "100%", marginTop: 12, background: "#fff", border: `2px solid ${INK}`, borderRadius: 16,
          cursor: "pointer", padding: "9px 14px", display: "flex", alignItems: "center", gap: 8,
          textAlign: "left", fontFamily: "inherit", color: INK,
        }}>
        <span style={{ fontSize: 17 }}>👨‍👩‍👧</span>
        <span style={{ flex: 1, fontWeight: 900, fontSize: 14 }}>おうちの方へ</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: ACCENT, background: "#fff", border: `1.5px solid ${ACCENT}`, borderRadius: 999, padding: "1px 8px" }}>保護者むけ</span>
        <span style={{ fontSize: 13, opacity: .6 }}>›</span>
      </button>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="おうちの方へ"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 120, background: "rgba(58,51,53,.5)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
          }}>
          <div className="pop" onClick={e => e.stopPropagation()}
            style={{
              background: "#FDFCFF", border: `3px solid ${INK}`, borderRadius: 20,
              boxShadow: "5px 5px 0 rgba(58,51,53,.9)", maxWidth: 480, width: "100%",
              maxHeight: "85vh", display: "flex", flexDirection: "column", overflow: "hidden",
            }}>
            {/* ヘッダー（×閉じる） */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8, padding: "12px 14px",
              background: PANEL_BG, borderBottom: `2px solid ${INK}`,
            }}>
              <span style={{ fontSize: 18 }}>👨‍👩‍👧</span>
              <span style={{ flex: 1, fontWeight: 900, fontSize: 15, color: INK }}>おうちの方へ</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="とじる"
                style={{
                  width: 34, height: 34, borderRadius: "50%", border: `2px solid ${INK}`, background: "#fff",
                  cursor: "pointer", fontSize: 17, fontWeight: 900, lineHeight: 1, color: INK,
                  display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit",
                }}>✕</button>
            </div>
            {/* 本文（スクロール） */}
            <div style={{ padding: "14px 16px 16px", overflowY: "auto" }}>
              <div style={{ fontWeight: 900, fontSize: 13, color: ACCENT, marginBottom: 8 }}>{g.skill}</div>
              {g.body.map((p, i) => (
                <p key={i} style={{ fontSize: 13, lineHeight: 1.75, margin: "0 0 8px", fontWeight: 500, color: "#4A4446" }}>{p}</p>
              ))}
              <div style={{ fontSize: 13, fontWeight: 700, background: "#FFF7E6", border: `2px solid ${INK}`, borderRadius: 12, padding: "8px 12px", marginTop: 4 }}>
                💡 {g.tip}
              </div>
              <button type="button" onClick={() => setOpen(false)}
                style={{
                  marginTop: 14, width: "100%", background: PANEL_BG, border: `2px solid ${INK}`, borderRadius: 12,
                  cursor: "pointer", padding: "9px 14px", fontSize: 14, fontWeight: 900, color: INK, fontFamily: "inherit",
                }}>とじる</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
