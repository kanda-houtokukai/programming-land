// 主人公（探検家）の表示部品（第3波 段階①＋③）。
// 旧・動物絵文字アバターの表示箇所（ヘッダー・カード・一覧）を全てこれに置き換える。
// - 段階③: 着せ替えのレイヤー合成を実装。head/face/neck/chest/waist の5スロットを
//   anchor%（基準キャンバス1086×1448への実測値・dressup_anchor_update_adventure.md）で base に重ねる。
//   back はレイヤーでなくベース人物ごと切り替え（baseImageFor）。
//   z順（奥→手前）= waist → chest → neck → face → head（SLOTS の並び）。
// - 既定（icon）: 丸枠に顔まわりをクロップ表示 ／ full: 立ち絵全身（比率 1086:1448）
// - character 未選択（移行前の旧プロファイル）は旧 avatar 絵文字にフォールバック
import { C } from "../theme.js";
import { baseImageFor, dressupById, SLOTS } from "../data/dressup.js";

// base＋装備レイヤーの合成ユニット（幅100%基準・親が大きさを決める）
function ComposedBody({ character, dressup }) {
  const base = baseImageFor(character, dressup ? dressup.back : null);
  const layers = SLOTS
    .map(slot => (dressup && dressup[slot]) ? dressupById(dressup[slot]) : null)
    .filter(d => d && d.img && d.anchor);
  return (
    <span style={{ position: "relative", display: "block", width: "100%", lineHeight: 0 }}>
      <img src={base} alt="" draggable="false" style={{ width: "100%", height: "auto", display: "block" }} />
      {layers.map(d => (
        <img key={d.id} src={d.img} alt="" draggable="false"
          style={{ position: "absolute", top: `${d.anchor.top}%`, left: `${d.anchor.left}%`,
            width: `${d.anchor.width}%`, height: "auto", transform: "translateX(-50%)" }} />
      ))}
    </span>
  );
}

export default function PlayerAvatar({ character, avatar, dressup, size = 32, full = false }) {
  // 移行前（character未選択）: 旧・動物絵文字を表示（選択後は使われない）
  if (!character) {
    return <span style={{ fontSize: full ? size * 0.6 : size * 0.72, lineHeight: 1 }}>{avatar || "🙂"}</span>;
  }

  if (full) {
    // 立ち絵全身＋着せ替え（幅指定・高さは比率で決まる）
    return (
      <span style={{ width: size, display: "inline-block", filter: "drop-shadow(1px 2px 2px rgba(20,15,25,.25))" }}>
        <ComposedBody character={character} dressup={dressup} />
      </span>
    );
  }
  // 丸アイコン: 合成した姿の顔まわりをクロップ（帽子・メガネ・バンダナはアイコンにも映る）
  return (
    <span style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden",
      display: "inline-flex", alignItems: "flex-start", justifyContent: "center",
      background: "#FFF3D6", border: `2px solid ${C.ink}`, flexShrink: 0 }}>
      <span style={{ width: "230%", marginTop: "-9%", flexShrink: 0 }}>
        <ComposedBody character={character} dressup={dressup} />
      </span>
    </span>
  );
}
