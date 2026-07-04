// プロファイル作成画面（v1のはじめて画面を発展）
import { useState } from "react";
import { AVATARS, C } from "../theme.js";
import { Btn } from "./common.jsx";

export default function ProfileCreate({ onDone, onCancel }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const ok = name.trim().length > 0 && avatar;
  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: 20, textAlign: "center" }}>
      <div className="bounce" style={{ fontSize: 64, marginTop: 30 }}>🤖</div>
      <h1 className="pl-display" style={{ fontSize: 34, margin: "8px 0 4px" }}>プログラミングランド</h1>
      <p style={{ fontWeight: 700, marginBottom: 20 }}>あそびながら プログラミングの あたまを きたえよう！</p>
      <div className="panel slide" style={{ padding: 22, textAlign: "left" }}>
        <label style={{ fontWeight: 900, display: "block", marginBottom: 8 }}>なまえを いれてね</label>
        <input value={name} maxLength={10} onChange={e => setName(e.target.value)}
          placeholder="れい：ひなた"
          style={{ width: "100%", boxSizing: "border-box", fontSize: 22, padding: "10px 14px", border: `3px solid ${C.ink}`, borderRadius: 14, fontFamily: "inherit", fontWeight: 700 }} />
        <div style={{ fontWeight: 900, margin: "18px 0 8px" }}>すきな どうぶつを えらんでね</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {AVATARS.map(a => (
            <button key={a} className="pbtn" onClick={() => setAvatar(a)}
              style={{ fontSize: 34, padding: "8px 14px", background: avatar === a ? C.sun : "#fff" }}>{a}</button>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 22, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {onCancel && <Btn bg="#fff" onClick={onCancel}>◀ もどる</Btn>}
          <Btn big bg={C.leaf} disabled={!ok} onClick={() => onDone(name.trim(), avatar)}>ぼうけんに しゅっぱつ！ 🚀</Btn>
        </div>
      </div>
    </div>
  );
}
