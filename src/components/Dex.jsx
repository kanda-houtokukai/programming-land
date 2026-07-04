// ずかん画面。であった すがたは カラー、まだの すがたは かげ＋「？？？」
import { C } from "../theme.js";
import { Header } from "./common.jsx";
import { SPECIES } from "../data/monsters.js";
import MonsterArt from "./MonsterArt.jsx";

const STAGE_LABEL = { 1: "たまご", 2: "こども", 3: "せいちょう" };

export default function Dex({ save, go, onSound }) {
  const found = save.dex.length;
  const total = SPECIES.length * 3;
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="📔 なかまずかん" onHome={() => go("home")} onSound={onSound} />
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
        <div style={{ fontWeight: 700, fontSize: 12, color: "#6B6265", textAlign: "center" }}>
          あいぼうを そだてたり、バッジを あつめたりすると あたらしい すがたに であえるよ！
        </div>
      </div>
    </div>
  );
}
