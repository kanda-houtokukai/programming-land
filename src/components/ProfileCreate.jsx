// プロファイル作成画面（v1のはじめて画面を発展）。
// 第3波①: 動物アバター選択 → 男女の探検家キャラクター選択に置き換え（置き換え指示書§A）。
// 理由: 着せ替えは人型が前提／探検家=島を冒険する世界観と一貫。選んだら以後変更しない。
import { useState } from "react";
import { C } from "../theme.js";
import { Btn } from "./common.jsx";
import { CHARACTERS } from "../data/dressup.js";
import titleLogo from "../assets/title_logo.webp";

export default function ProfileCreate({ onDone, onCancel }) {
  const [name, setName] = useState("");
  const [character, setCharacter] = useState(null);
  const ok = name.trim().length > 0 && character;
  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: 20, textAlign: "center" }}>
      <div className="bounce" style={{ fontSize: 64, marginTop: 30 }}>🤖</div>
      {/* タイトルロゴ（title_logo.webp・透過・2026-07-11差し替え・全画面で統一） */}
      <img src={titleLogo} alt="プログラミングランド" draggable="false"
        style={{ width: "min(90%, 460px)", height: "auto", display: "block", margin: "8px auto 4px" }} />
      <p style={{ fontWeight: 700, marginBottom: 20 }}>あそびながら プログラミングの あたまを きたえよう！</p>
      <div className="panel slide" style={{ padding: 22, textAlign: "left" }}>
        <label style={{ fontWeight: 900, display: "block", marginBottom: 8 }}>なまえを いれてね</label>
        <input value={name} maxLength={10} onChange={e => setName(e.target.value)}
          placeholder="れい：ひなた"
          style={{ width: "100%", boxSizing: "border-box", fontSize: 22, padding: "10px 14px", border: `3px solid ${C.ink}`, borderRadius: 14, fontFamily: "inherit", fontWeight: 700 }} />
        <div style={{ fontWeight: 900, margin: "18px 0 8px" }}>きみの ぼうけんかを えらんでね</div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          {CHARACTERS.map(ch => (
            <button key={ch.id} className="pbtn" onClick={() => setCharacter(ch.id)}
              style={{ flex: 1, maxWidth: 180, padding: "12px 8px 8px", background: character === ch.id ? C.sun : "#fff",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <img src={ch.img} alt={ch.name} draggable="false" style={{ width: "72%", maxWidth: 110, height: "auto", display: "block" }} />
              <span style={{ fontWeight: 900, fontSize: 13 }}>{ch.name}</span>
            </button>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 22, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {onCancel && <Btn bg="#fff" onClick={onCancel}>◀ もどる</Btn>}
          <Btn big bg={C.leaf} disabled={!ok} onClick={() => onDone(name.trim(), character)}>ぼうけんに しゅっぱつ！ 🚀</Btn>
        </div>
      </div>
    </div>
  );
}
