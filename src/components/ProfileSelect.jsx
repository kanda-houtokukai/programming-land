// 起動時の「だれが あそぶ？」画面（v2で新設・マルチプロファイル）
import { C } from "../theme.js";
import { Btn } from "./common.jsx";
import { puzzleStarsTotal } from "../data/badges.js";
import { MAX_PROFILES } from "../storage.js";
import { APP_VERSION, BUILD_DATE } from "../version.js";

export default function ProfileSelect({ profiles, onPick, onNew }) {
  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: 20, textAlign: "center" }}>
      <div className="bounce" style={{ fontSize: 64, marginTop: 30 }}>🤖</div>
      <h1 className="pl-display" style={{ fontSize: 34, margin: "8px 0 4px" }}>プログラミングランド</h1>
      <p style={{ fontWeight: 700, marginBottom: 20 }}>だれが あそぶ？</p>
      <div style={{ display: "grid", gap: 12 }}>
        {profiles.map(p => (
          <button key={p.id} className="pbtn slide" onClick={() => onPick(p.id)}
            style={{ background: "#fff", padding: 16, display: "flex", gap: 14, alignItems: "center", textAlign: "left" }}>
            <span style={{ fontSize: 40, background: C.sun, border: `3px solid ${C.ink}`, borderRadius: 16, padding: "6px 10px" }}>{p.avatar}</span>
            <span style={{ flex: 1 }}>
              <span className="pl-display" style={{ fontSize: 22, display: "block" }}>{p.name}</span>
              <span style={{ fontWeight: 700, fontSize: 13 }}>⭐ {puzzleStarsTotal(p)}こ ・ 🏅 {p.badges.length}こ</span>
            </span>
            <span style={{ fontSize: 22 }}>▶</span>
          </button>
        ))}
        {profiles.length < MAX_PROFILES && (
          <Btn bg={C.leaf} big onClick={onNew}>＋ あたらしい なかま</Btn>
        )}
      </div>
      <div style={{ marginTop: 26, fontSize: 11, fontWeight: 700, opacity: .55 }}>
        {APP_VERSION}（{BUILD_DATE}）
      </div>
    </div>
  );
}
