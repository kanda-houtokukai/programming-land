// ずかん画面。であった すがたは カラー、まだの すがたは かげ＋「？？？」
// バッジも同じ「集める楽しさ」で見せる（取得済み=カラー＋名前／未取得=？＋ふせ字）
import { C } from "../theme.js";
import { Header } from "./common.jsx";
import { SPECIES } from "../data/monsters.js";
import { BADGES } from "../data/badges.js";
import { ENEMIES } from "../data/battle.js";
import MonsterArt from "./MonsterArt.jsx";

const STAGE_LABEL = { 1: "たまご", 2: "こども", 3: "せいちょう" };

export default function Dex({ save, go, onSound, onBack, openHome }) {
  const found = save.dex.length;
  const total = SPECIES.length * 3;
  const badgeGot = BADGES.filter(b => save.badges.includes(b.id)).length;
  const defeated = (save.battle && save.battle.defeated) || [];
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      {/* ずかんの入口はおうちの部屋（本棚/相棒）→ ◀もどるは App の funcBack で部屋を再オープン（メモ01+03） */}
      <Header save={save} title="📔 なかまずかん" onBack={onBack} onSound={onSound} onOpenHome={openHome} />
      <div style={{ padding: "0 16px", display: "grid", gap: 14 }}>
        <div className="panel slide" style={{ padding: "10px 16px", textAlign: "center", fontWeight: 900 }}>
          みつけた すがた: {found} / {total}
        </div>
        {SPECIES.map(sp => (
          <div key={sp.id} className="panel" style={{ padding: 14 }}>
            <div className="pl-display" style={{ fontSize: 18, marginBottom: 8 }}>{sp.typeEmoji} {sp.typeName}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
              {[1, 2, 3].map(stage => {
                const got = save.dex.includes(`${sp.id}-${stage}`);
                return (
                  <div key={stage} className="panel" style={{ padding: 8, borderRadius: 14, textAlign: "center", background: got ? sp.headBg : "#F1EDE4" }}>
                    <div style={{ fontWeight: 800, fontSize: 10, opacity: .7 }}>{STAGE_LABEL[stage]}</div>
                    <MonsterArt species={sp.id} stage={stage} size={72} silhouette={!got} />
                    <div style={{ fontWeight: 900, fontSize: 12 }}>{got ? sp.stages[stage - 1].name : "？？？"}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

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
