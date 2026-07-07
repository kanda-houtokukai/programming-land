// 既存プロファイルの移行用: 主人公（男女の探検家）を一度だけ選ぶ画面（第3波①・置き換え指示書§A）。
// 相棒の初回選択と同じパターン＝既存プロファイル（動物アバター時代に作成）は次回ホーム表示時に
// ここを通り、選んだら profile.character に保存されて以後表示されない（以後変更しない原則）。
import { C } from "../theme.js";
import { CHARACTERS } from "../data/dressup.js";
import { SFX } from "../sound.js";

export default function CharacterSelect({ profileName, sound, onPick }) {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: 20, textAlign: "center" }}>
      <div className="bounce" style={{ fontSize: 56, marginTop: 26 }}>🧭</div>
      <h1 className="pl-display" style={{ fontSize: 26, margin: "6px 0 2px" }}>{profileName}は どっち？</h1>
      <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 18 }}>
        しまを ぼうけんする きみの すがたを えらんでね！<br />
        <span style={{ fontSize: 12, color: "#6B6265" }}>（あとから かえられないよ。おみせで おしゃれが できるようになるよ！）</span>
      </p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", padding: "0 10px" }}>
        {CHARACTERS.map(ch => (
          <button key={ch.id} className="pbtn slide" onClick={() => { SFX.win(sound); onPick(ch.id); }}
            style={{ flex: 1, maxWidth: 220, padding: "16px 10px 12px", background: "#fff",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <img src={ch.img} alt={ch.name} draggable="false" style={{ width: "80%", maxWidth: 150, height: "auto", display: "block" }} />
            <span className="pl-display" style={{ fontSize: 16 }}>{ch.name}</span>
            {/* ボタン内ボタンはHTML違反になるため、見た目だけのチップ（span）にする */}
            <span style={{ background: C.leaf, border: `3px solid ${C.ink}`, borderRadius: 18,
              padding: "8px 16px", fontSize: 13, fontWeight: 800, boxShadow: "3px 3px 0 rgba(58,51,53,.9)" }}>これに する！</span>
          </button>
        ))}
      </div>
    </div>
  );
}
