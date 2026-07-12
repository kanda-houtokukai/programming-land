// ずかん画面。5タイプ×3すがた＝15。b4k: すがたの解禁は「到達記録」（profile.dex の ${id}-${stage}）ごと＝
// 孵ったばかりの子は あかちゃんだけカラー・進化するたびに その段階が解禁（集める楽しさの本命）。
// タイプ見出しは従来どおり所持(got)で表示。未所持タイプは全すがた？？？。コンプ＝5タイプ所持。
// バッジも同じ「集める楽しさ」で見せる（取得済み=カラー＋名前／未取得=？＋ふせ字）
import { useState } from "react";
import { C } from "../theme.js";
import { Header, Btn } from "./common.jsx";
import { SPECIES } from "../data/monsters.js";
import { BADGES } from "../data/badges.js";
import { ENEMIES } from "../data/battle.js";
import MonsterArt from "./MonsterArt.jsx";

const STAGE_LABEL = { 1: "あかちゃん", 2: "こども", 3: "せいちょう" };

export default function Dex({ save, go, onSound, onBack, openHome }) {
  const owned = ((save.partner && save.partner.owned) || []).map(m => m.id); // b4j: owned は {id,level,xp} の配列
  const badgeGot = BADGES.filter(b => save.badges.includes(b.id)).length;
  const defeated = (save.battle && save.battle.defeated) || [];
  const [lore, setLore] = useState(null); // {sp, stage} ロアのポップアップ
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      {/* ずかんの入口はおうちの部屋（本棚/相棒）→ ◀もどるは App の funcBack で部屋を再オープン（メモ01+03） */}
      <Header save={save} title="📔 なかまずかん" onBack={onBack} onSound={onSound} onOpenHome={openHome} />
      <div style={{ padding: "0 16px", display: "grid", gap: 14 }}>
        <div className="panel slide" style={{ padding: "10px 16px", textAlign: "center", fontWeight: 900 }}>
          なかまに した タイプ: {owned.length} / {SPECIES.length}
          {owned.length >= SPECIES.length && <span>　🎉 コンプリート！</span>}
        </div>
        {SPECIES.map(sp => {
          const got = owned.includes(sp.id);
          return (
            <div key={sp.id} className="panel" style={{ padding: 14 }}>
              <div className="pl-display" style={{ fontSize: 18, marginBottom: 8 }}>{got ? sp.typeName : "？？？"}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {[1, 2, 3].map(stage => {
                  const reached = save.dex.includes(`${sp.id}-${stage}`); // b4k: 到達したすがただけ解禁
                  return (
                    <button key={stage} className="pbtn" disabled={!reached}
                      onClick={() => setLore({ sp, stage })}
                      style={{ padding: 8, borderRadius: 14, textAlign: "center", background: reached ? sp.headBg : "#F1EDE4", opacity: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 10, opacity: .7 }}>{STAGE_LABEL[stage]}</div>
                      <MonsterArt species={sp.id} stage={stage} size={72} silhouette={!reached} />
                      <div style={{ fontWeight: 900, fontSize: 12 }}>{reached ? sp.stages[stage - 1].name : "？？？"}</div>
                    </button>
                  );
                })}
              </div>
              {!got && <div style={{ fontWeight: 700, fontSize: 11, color: "#6B6265", marginTop: 6, textAlign: "center" }}>レベルが あがると たまごから なかまに なるよ</div>}
            </div>
          );
        })}

        {/* ロアのポップアップ（所持タイプのすがたをタップ・部屋の相棒ロアと同じ内容） */}
        {lore && (
          <div role="dialog" aria-modal="true" onClick={() => setLore(null)}
            style={{ position: "fixed", inset: 0, zIndex: 120, background: "rgba(58,51,53,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
            <div className="panel softpop" onClick={e => e.stopPropagation()}
              style={{ maxWidth: 340, width: "100%", padding: 22, textAlign: "center", background: "#FFFDF5" }}>
              <MonsterArt species={lore.sp.id} stage={lore.stage} size={150} />
              <div className="pl-display" style={{ fontSize: 22, marginTop: 4 }}>{lore.sp.stages[lore.stage - 1].name}</div>
              <div style={{ fontWeight: 900, fontSize: 13, margin: "2px 0 8px", background: lore.sp.headBg, border: `2px solid ${C.ink}`, borderRadius: 999, padding: "2px 10px", display: "inline-block" }}>{lore.sp.typeName}</div>
              <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.7, textAlign: "left", background: "#FAF3E3", border: `2px solid ${C.ink}`, borderRadius: 12, padding: "10px 12px" }}>{lore.sp.lore}</div>
              <div style={{ marginTop: 12 }}>
                <Btn big bg={C.leaf} onClick={() => setLore(null)}>とじる</Btn>
              </div>
            </div>
          </div>
        )}

        {/* バッジ コレクション（相棒ずかんと同じ 集める楽しさ）*/}
        <div className="panel slide" style={{ padding: "10px 16px", textAlign: "center", fontWeight: 900 }}>
          あつめた バッジ: {badgeGot} / {BADGES.length}
        </div>
        <div className="panel" style={{ padding: 14 }}>
          <div className="pl-display" style={{ fontSize: 18, marginBottom: 10 }}>🏅 バッジ ずかん</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(96px,1fr))", gap: 10 }}>
            {BADGES.map(b => {
              const got = save.badges.includes(b.id);
              return (
                <div key={b.id} className="panel" style={{ padding: 8, borderRadius: 14, textAlign: "center", background: got ? "#FFE9A8" : "#F5F2EC", opacity: got ? 1 : 0.85 }}>
                  <div style={{ fontSize: 30, filter: got ? "none" : "grayscale(1)", opacity: got ? 1 : 0.5 }}>{got ? b.emoji : "❔"}</div>
                  {got
                    ? <div style={{ fontWeight: 900, fontSize: 11, lineHeight: 1.3, marginTop: 2 }}>{b.name}</div>
                    : <div style={{ fontWeight: 700, fontSize: 9.5, lineHeight: 1.3, marginTop: 2, color: "#A49E95" }}>{b.desc}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* たおした あいて コレクション（バトル）*/}
        <div className="panel slide" style={{ padding: "10px 16px", textAlign: "center", fontWeight: 900 }}>
          たおした あいて: {defeated.length} / {ENEMIES.length}
        </div>
        <div className="panel" style={{ padding: 14 }}>
          <div className="pl-display" style={{ fontSize: 18, marginBottom: 10 }}>⚔️ たおした あいて</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
            {ENEMIES.map(e => {
              const got = defeated.includes(e.id);
              return (
                <div key={e.id} className="panel" style={{ padding: 8, borderRadius: 14, textAlign: "center", background: got ? e.color : "#F1EDE4" }}>
                  <img src={e.img} alt={got ? e.name : "？"} draggable="false"
                    style={{ width: 64, height: 64, display: "block", margin: "0 auto",
                      filter: got ? "none" : "grayscale(1) brightness(0.4)", opacity: got ? 1 : 0.4 }} />
                  <div style={{ fontWeight: 900, fontSize: 12 }}>{got ? e.name : "？？？"}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ fontWeight: 700, fontSize: 12, color: "#6B6265", textAlign: "center" }}>
          あいぼうを そだてたり、バッジを あつめたりすると あたらしい すがたに であえるよ！
        </div>
      </div>
    </div>
  );
}
