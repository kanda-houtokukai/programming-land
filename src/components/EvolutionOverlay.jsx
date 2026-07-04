// 進化演出。ひかり→あたらしい すがたが ポンと あらわれる
import { useEffect, useState } from "react";
import { C } from "../theme.js";
import { Btn } from "./common.jsx";
import { monsterName } from "../data/monsters.js";
import MonsterArt from "./MonsterArt.jsx";

export default function EvolutionOverlay({ evolution, onClose }) {
  const [phase, setPhase] = useState("before"); // before → flash → after
  useEffect(() => {
    setPhase("before");
    const t1 = setTimeout(() => setPhase("flash"), 900);
    const t2 = setTimeout(() => setPhase("after"), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [evolution]);
  if (!evolution) return null;
  const { species, from, to } = evolution;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(42,26,82,.78)", zIndex: 120, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div className="panel pop" style={{ padding: 26, textAlign: "center", maxWidth: 420, background: "#FFFDF5", width: "100%" }}>
        {phase === "before" && (
          <>
            <div style={{ fontWeight: 900, fontSize: 18 }}>あれれ…！？</div>
            <div className="bounce" style={{ margin: "10px 0" }}>
              <MonsterArt species={species} stage={from} size={150} />
            </div>
            <div style={{ fontWeight: 800 }}>{monsterName(species, from)}の ようすが…！</div>
          </>
        )}
        {phase === "flash" && (
          <>
            <div style={{ fontSize: 26, fontWeight: 900 }}>✨✨✨</div>
            <div className="pop" style={{ margin: "10px 0", filter: "brightness(3) saturate(0)" }}>
              <MonsterArt species={species} stage={to} size={150} />
            </div>
            <div style={{ fontWeight: 800 }}>ひかりに つつまれた！</div>
          </>
        )}
        {phase === "after" && (
          <>
            <div className="pl-display" style={{ fontSize: 26 }}>🎉 しんか おめでとう！</div>
            <div className="pop" style={{ margin: "10px 0" }}>
              <MonsterArt species={species} stage={to} size={170} />
            </div>
            <div style={{ fontWeight: 900, fontSize: 17, marginBottom: 12 }}>
              {monsterName(species, from)}は<br />「{monsterName(species, to)}」に しんかした！
            </div>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#6B6265", marginBottom: 12 }}>ずかんに とうろくされたよ 📔</div>
            <Btn big bg={C.leaf} onClick={onClose}>やったー！</Btn>
          </>
        )}
      </div>
    </div>
  );
}
