// 進化演出（P6bでバトル並みにリッチ化）。育成のハイライトなので しっかり見せ場にする。
// 溜め（光りはじめ・だんだん強く）→ 変身（光の渦＋白いシルエットのままフォルムが変わる）
// → 登場（白フラッシュ＋「ドン」とバウンド）→ 祝福（おめでとう＋紙吹雪＋ファンファーレ）。
// 実装はバトル演出と同じ CSS keyframe＋段階制御。ボタンは祝福まで出ない＝実質入力ロック。
import { useEffect, useState } from "react";
import { C } from "../theme.js";
import { Btn } from "./common.jsx";
import { monsterName } from "../data/monsters.js";
import { SFX } from "../sound.js";
import MonsterArt from "./MonsterArt.jsx";

const CONFETTI_COLORS = ["#FF8FAB", "#FFD447", "#6BCB77", "#7FC8F8", "#9D7BD8"];
// 紙吹雪の配置（位置%・遅れ・色・回転はCSS任せ）
const CONFETTI = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 37 + 8) % 92, delay: (i % 7) * 0.13, color: CONFETTI_COLORS[i % 5], emoji: i % 5 === 0 ? "🎉" : null,
}));

export default function EvolutionOverlay({ evolution, sound, onClose }) {
  const [phase, setPhase] = useState("charge");   // charge → swirl → reveal → celebrate
  const [swirlForm, setSwirlForm] = useState("from"); // 渦の中でシルエットが from → to に変わる
  useEffect(() => {
    if (!evolution) return;
    setPhase("charge"); setSwirlForm("from");
    SFX.charge(sound);
    const ts = [
      setTimeout(() => SFX.charge(sound), 800),                       // 溜めの高まり（2回目）
      setTimeout(() => { setPhase("swirl"); SFX.evolve(sound); }, 1600),
      setTimeout(() => setSwirlForm("to"), 2350),                     // 渦の中でフォルムが変わる瞬間
      setTimeout(() => { setPhase("reveal"); SFX.crit(sound); }, 3050),
      setTimeout(() => { setPhase("celebrate"); SFX.fanfare(sound); }, 3800),
    ];
    return () => ts.forEach(clearTimeout);
  }, [evolution, sound]);
  if (!evolution) return null;
  const { species, from, to } = evolution;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(42,26,82,.82)", zIndex: 120, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      {/* 登場の瞬間の 白フラッシュ（画面全体） */}
      {phase === "reveal" && <div className="whiteflash" style={{ position: "fixed", inset: 0, background: "#fff", zIndex: 130 }} />}

      <div className="panel pop" style={{ padding: 24, textAlign: "center", maxWidth: 420, background: "#FFFDF5", width: "100%", position: "relative", overflow: "hidden" }}>

        {/* 祝福の紙吹雪 */}
        {phase === "celebrate" && CONFETTI.map((cf, i) => (
          <span key={i} className="confetti" style={{ position: "absolute", top: -14, left: `${cf.left}%`,
            animationDelay: `${cf.delay}s`, zIndex: 5, fontSize: 16 }}>
            {cf.emoji || <span style={{ display: "inline-block", width: 9, height: 13, background: cf.color, borderRadius: 3 }} />}
          </span>
        ))}

        {/* ステージ絵のゾーン（高さ固定で 段階が変わっても パネルが跳ねない） */}
        <div style={{ position: "relative", height: 210, display: "flex", alignItems: "center", justifyContent: "center" }}>

          {phase === "charge" && (
            <div className="charge" style={{ animationDuration: "1.7s" }}>
              <MonsterArt species={species} stage={from} size={160} />
            </div>
          )}

          {phase === "swirl" && (
            <>
              {/* 光の渦（回転する光の円盤）＋ 白いシルエット（フォルムが from→to に変わる） */}
              <div className="spinlight" style={{ position: "absolute", width: 230, height: 230, opacity: .9 }} />
              <div className="morph" style={{ position: "relative", zIndex: 2,
                filter: "brightness(0) invert(1) drop-shadow(0 0 18px rgba(255,255,255,.95))" }}>
                <MonsterArt species={species} stage={swirlForm === "from" ? from : to} size={150} />
              </div>
            </>
          )}

          {(phase === "reveal" || phase === "celebrate") && (
            <div className={phase === "reveal" ? "slam" : "bounce"}>
              <MonsterArt species={species} stage={to} size={phase === "celebrate" ? 165 : 175} />
            </div>
          )}
        </div>

        {/* ことば */}
        {phase === "charge" && (
          <div style={{ fontWeight: 900, fontSize: 17 }}>あれれ…！？<br />
            <span style={{ fontSize: 15 }}>{monsterName(species, from)}が ひかりはじめた！</span></div>
        )}
        {phase === "swirl" && (
          <div style={{ fontWeight: 900, fontSize: 17 }}>✨ ひかりが うずまいて<br />すがたが かわっていく…！</div>
        )}
        {phase === "reveal" && (
          <div className="pl-display" style={{ fontSize: 24 }}>！！</div>
        )}
        {phase === "celebrate" && (
          <div className="slide">
            <div className="pl-display pop" style={{ fontSize: 27 }}>🎉 しんか おめでとう！</div>
            <div style={{ fontWeight: 900, fontSize: 16, margin: "8px 0" }}>
              {monsterName(species, from)}は<br />「{monsterName(species, to)}」に しんかした！
            </div>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#6B6265", marginBottom: 12 }}>ずかんに とうろくされたよ 📔</div>
            <Btn big bg={C.leaf} onClick={onClose}>やったー！</Btn>
          </div>
        )}
      </div>
    </div>
  );
}
