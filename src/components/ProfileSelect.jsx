// 起動時の「だれが あそぶ？」画面（第2波 段階②で「島の入口（港）」に刷新・メモ01）。
// 背景=harbor-entrance.webp を cover で全画面（この画面は絵とタップ枠の位置合わせが不要なので cover で可。
// b2cの img駆動方式が必要なのは「絵の中の物とタップ枠を一致させる」場合のみ）。
// カード=アバター＋名前＋相棒（現在の姿）を大きく。データ構造・選択/作成/削除ロジックは不変。
import { C } from "../theme.js";
import { Btn } from "./common.jsx";
import { puzzleStarsTotal } from "../data/badges.js";
import { MAX_PROFILES } from "../storage.js";
import { APP_VERSION, BUILD_DATE } from "../version.js";
import { stageForLevel } from "../data/monsters.js";
import MonsterArt from "./MonsterArt.jsx";
import harborBg from "../assets/harbor-entrance.webp";

// 白フチ文字（港の絵の上でも読める・ワールドマップのラベルと同じ手法）
const outline = "0 0 3px #fff,1.5px 1.5px 0 #fff,-1.5px 1.5px 0 #fff,1.5px -1.5px 0 #fff,-1.5px -1.5px 0 #fff,0 2px 4px rgba(0,0,0,.35)";

export default function ProfileSelect({ profiles, onPick, onNew }) {
  return (
    <div style={{ minHeight: "100vh", backgroundImage: `url(${harborBg})`,
      backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "16px 20px 20px", textAlign: "center" }}>
        <h1 className="pl-display" style={{ fontSize: 32, margin: "10px 0 2px", textShadow: outline }}>プログラミングランド</h1>
        <p style={{ fontWeight: 900, fontSize: 16, margin: "0 0 14px", textShadow: outline }}>だれが あそぶ？</p>
        {/* カードは背景の桟橋デッキ（中央〜下部）に乗るよう、上の空を空けて配置 */}
        <div style={{ display: "grid", gap: 12, marginTop: "clamp(40px, 16vh, 150px)" }}>
          {profiles.map(p => (
            <button key={p.id} className="pbtn slide" onClick={() => onPick(p.id)}
              style={{ background: "rgba(255,253,245,.96)", padding: "14px 16px", display: "flex", gap: 14, alignItems: "center", textAlign: "left" }}>
              <span style={{ fontSize: 44, background: C.sun, border: `3px solid ${C.ink}`, borderRadius: 16, padding: "8px 12px", lineHeight: 1 }}>{p.avatar}</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span className="pl-display" style={{ fontSize: 24, display: "block" }}>{p.name}</span>
                <span style={{ fontWeight: 700, fontSize: 13 }}>⭐ {puzzleStarsTotal(p)}こ ・ 🏅 {p.badges.length}こ</span>
              </span>
              {/* 相棒（現在の姿・プロファイルごと）。まだ相棒がいない子は ▶ のみ */}
              {p.partner && (
                <span style={{ lineHeight: 0, filter: "drop-shadow(1px 2px 2px rgba(20,15,25,.3))" }}>
                  <MonsterArt species={p.partner.species} stage={stageForLevel(p.partner.level)} size={62} />
                </span>
              )}
              <span style={{ fontSize: 22 }}>▶</span>
            </button>
          ))}
          {profiles.length < MAX_PROFILES && (
            <Btn bg={C.leaf} big onClick={onNew}>＋ あたらしい なかま</Btn>
          )}
        </div>
        <div style={{ marginTop: 22, fontSize: 11, fontWeight: 800, color: C.ink, textShadow: outline }}>
          {APP_VERSION}（{BUILD_DATE}）
        </div>
      </div>
    </div>
  );
}
