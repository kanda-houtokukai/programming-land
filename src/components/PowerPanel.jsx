// 「そだった ちから」（提案3・フェーズ1）。ホームに5つのちからを植物でミニ表示＋タップで詳細モーダル。
// 到達度は powers.js の computePowers（既存の到達度計算）。数値は前面に出さず、主役は植物の育ち。
import { useState } from "react";
import { C } from "../theme.js";
import { Btn } from "./common.jsx";
import { computePowers } from "../data/powers.js";
import { SFX } from "../sound.js";

// 短い名前（ミニ表示用・「〜の ちから」を落とす）
const shortName = name => name.replace("の ちから", "").replace(" ちから", "");

export default function PowerPanel({ save, hideTitle }) {
  const powers = computePowers(save);
  const [detail, setDetail] = useState(null); // タップしたちから
  const sound = save.settings.sound;

  return (
    <div className="panel" style={{ padding: "12px 14px", background: "#F4FBEF" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        {!hideTitle && <>
          <span style={{ fontSize: 18 }}>🌱</span>
          <span className="pl-display" style={{ fontSize: 17 }}>そだった ちから</span>
        </>}
        <span style={{ fontWeight: 700, fontSize: 11, color: "#6B6265", marginLeft: "auto" }}>タップで くわしく</span>
      </div>
      {/* 5つのちからのミニ表示（植物＋称号） */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
        {powers.map(p => (
          <button key={p.id} className="pbtn" onClick={() => { SFX.tap(sound); setDetail(p); }}
            style={{ background: "#fff", border: `2px solid ${C.ink}`, borderRadius: 14, padding: "6px 2px 5px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <img src={p.grow.img} alt={p.grow.stage} draggable="false" style={{ width: "82%", maxWidth: 52, aspectRatio: 1, display: "block" }} />
            <span style={{ fontWeight: 900, fontSize: "clamp(8px,2.1vw,11px)", lineHeight: 1.15, textAlign: "center" }}>{shortName(p.name)}</span>
            <span style={{ fontWeight: 800, fontSize: "clamp(7px,1.7vw,9px)", color: "#6B6265",
              background: "#FFF3D6", border: `1.5px solid ${C.ink}55`, borderRadius: 999, padding: "0 5px", whiteSpace: "nowrap" }}>
              {p.grow.title}
            </span>
          </button>
        ))}
      </div>

      {/* 詳細モーダル */}
      {detail && (
        <div role="dialog" aria-modal="true" onClick={() => setDetail(null)}
          style={{ position: "fixed", inset: 0, zIndex: 115, background: "rgba(58,51,53,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel pop" onClick={e => e.stopPropagation()}
            style={{ maxWidth: 360, width: "100%", padding: 22, textAlign: "center", background: "#FBFFF7" }}>
            <img src={detail.grow.img} alt={detail.grow.stage} draggable="false" style={{ width: 150, height: 150, display: "block", margin: "0 auto" }} />
            <div className="pl-display" style={{ fontSize: 22, marginTop: 4 }}>{detail.emoji} {detail.name}</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, margin: "8px 0",
              background: "#FFF3D6", border: `2px solid ${C.ink}`, borderRadius: 999, padding: "4px 14px", fontWeight: 900, fontSize: 14 }}>
              🏅 {detail.grow.title}<span style={{ fontWeight: 700, fontSize: 12, color: "#6B6265" }}>（{detail.grow.stage}）</span>
            </div>
            {/* すくすくメーター（植物の育ち＝主役／数字は控えめに添える） */}
            <div style={{ height: 12, border: `2px solid ${C.ink}`, borderRadius: 999, overflow: "hidden", background: "#fff", margin: "4px 0" }}>
              <div style={{ width: `${detail.pct}%`, height: "100%", background: C.leaf, transition: "width .5s" }} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 11, color: "#6B6265" }}>そだち ぐあい {detail.pct}%</div>
            <div style={{ fontWeight: 800, fontSize: 13, background: "#EAF7FF", border: `2px solid ${C.ink}`, borderRadius: 12, padding: "8px 12px", margin: "12px 0", lineHeight: 1.6 }}>
              🌱 {detail.grows}
            </div>
            <Btn big bg={C.leaf} onClick={() => setDetail(null)}>とじる</Btn>
          </div>
        </div>
      )}
    </div>
  );
}
