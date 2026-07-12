// 相棒えらび画面（はじめて or まだ相棒がいないプロファイル向け）。b4f: 5タイプから1体（残りは たまごで なかまに）
import { C } from "../theme.js";
import { Btn } from "./common.jsx";
import { SPECIES } from "../data/monsters.js";
import MonsterArt from "./MonsterArt.jsx";

export default function PartnerSelect({ profileName, onPick }) {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: 20, textAlign: "center" }}>
      <h1 className="pl-display" style={{ fontSize: 30, margin: "22px 0 4px" }}>あいぼうを えらぼう！</h1>
      <p style={{ fontWeight: 700, marginBottom: 18 }}>
        {profileName}の ぼうけんに ついてきてくれる なかまだよ。<br />
        いっしょに あそぶと せいちょうして、2かい しんかするんだ！
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12 }}>
        {SPECIES.map((sp, i) => (
          <div key={sp.id} className="panel slide" style={{ padding: 14, animationDelay: `${i * 0.07}s` }}>
            <div style={{ fontWeight: 900, fontSize: 12, background: sp.headBg, border: `2px solid ${C.ink}`, borderRadius: 999, padding: "3px 10px", display: "inline-block" }}>
              {sp.typeName}
            </div>
            <div style={{ margin: "8px 0 2px" }}>
              <MonsterArt species={sp.id} stage={1} size={110} />
            </div>
            <div className="pl-display" style={{ fontSize: 20 }}>{sp.stages[0].name}</div>
            <div style={{ fontWeight: 700, fontSize: 11.5, color: "#6B6265", minHeight: 44, margin: "2px 0 10px" }}>{sp.lore.split("。")[0]}。</div>
            <Btn bg={sp.color} onClick={() => onPick(sp.id)} style={{ fontSize: 15 }}>この こに する！</Btn>
          </div>
        ))}
      </div>
      <p style={{ fontWeight: 700, fontSize: 12, color: "#6B6265", marginTop: 14 }}>
        えらばなかった なかまも、レベルが あがると「たまご」から なかまに なるよ
      </p>
    </div>
  );
}
