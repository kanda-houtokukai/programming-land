// 相棒の状態カード（ホーム・きろく画面で使う）。b4j: レベルは相棒ごと＝アクティブのレコードで表示
import { C } from "../theme.js";
import { speciesById, stageForLevel } from "../data/monsters.js";
import { xpToNext, partnerDisplayName, MAX_LEVEL, activeMon } from "../growth.js";
import MonsterArt from "./MonsterArt.jsx";

export default function PartnerCard({ partner, size = 92, onOpenDex, deco }) {
  const mon = activeMon(partner);
  if (!mon) return null;
  const sp = speciesById(mon.id);
  const stage = stageForLevel(mon.level);
  const need = xpToNext(mon.level);
  const pct = mon.level >= MAX_LEVEL ? 100 : Math.min(100, Math.round(100 * mon.xp / need));
  return (
    <div className="panel" style={{ padding: 12, display: "flex", gap: 12, alignItems: "center", textAlign: "left" }}>
      <span style={{ position: "relative", display: "inline-flex", lineHeight: 0 }}>
        <MonsterArt species={mon.id} stage={stage} size={size} />
        {deco && <span style={{ position: "absolute", top: -4, right: -4, fontSize: size * 0.38 }}>{deco}</span>}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 900, fontSize: 12, opacity: .7 }}>あいぼう（{sp.typeName}）</div>
        <div className="pl-display" style={{ fontSize: 20 }}>{partnerDisplayName(partner)}　<span style={{ fontSize: 15 }}>Lv.{mon.level}</span></div>
        <div style={{ height: 12, border: `2px solid ${C.ink}`, borderRadius: 999, overflow: "hidden", background: "#fff", marginTop: 4 }}>
          <div style={{ width: `${pct}%`, height: "100%", background: sp.color, transition: "width .4s" }} />
        </div>
        <div style={{ fontWeight: 700, fontSize: 11, marginTop: 2 }}>
          {mon.level >= MAX_LEVEL ? "レベル マックス！" : `つぎの レベルまで あと ${need - mon.xp}`}
        </div>
      </div>
      {onOpenDex && (
        <button className="pbtn" onClick={onOpenDex} style={{ background: C.sun, padding: "8px 10px", fontSize: 13 }}>📔<br />ずかん</button>
      )}
    </div>
  );
}
