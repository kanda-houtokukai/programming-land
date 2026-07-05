// ワールドマップ・ホーム（worldmap-home実装指示.md フェーズ1）。
// 旧ホーム（縦積みメニュー）を1枚のマップに刷新。変えるのは入口と遷移だけ＝各機能の中身は不変。
// 重なり回避: マップ上は小さいアイコン＋短い名前のみ。フル名前はタップ時のポップアップで見せ、
// 「▶ はいる！」で遷移（低学年の誤タップ対策）。バトルはLv3までロック（既存判定を流用）。
import { useState } from "react";
import { C } from "../theme.js";
import { Btn, Header } from "./common.jsx";
import { battleUnlocked, BATTLE_UNLOCK_LEVEL } from "../data/battle.js";
import { SFX } from "../sound.js";
import bgUrl from "../assets/worldmap-home.webp";
import iconQuiz from "../assets/icon_quiz.png";
import iconArt from "../assets/icon_art.png";
import iconShop from "../assets/icon_shop.png";
import iconTyping from "../assets/icon_typing.png";
import iconPuzzle from "../assets/icon_puzzle.png";
import iconBattle from "../assets/icon_battle.png";
import iconFlower from "../assets/grow_4_flower.png";

// 8エリアの%座標（1600×900の背景に対して）。ブラウザで背景に照らして微調整する。
// 拡張用の空き地（今回は何も置かない・将来の新エリア用）: 中央上(46,30)・北(58,16)・右中(70,36)
export const AREAS = [
  { key: "quiz", short: "クイズ", full: "クイズの ひろば", img: iconQuiz, left: 27, top: 24 },
  // おえかき/ちから: 初期値(13,41)/(16,61)はラベルと円が重なったため上下に離した（ブラウザ照合済み）
  { key: "art", short: "おえかき", full: "おえかき コード", img: iconArt, left: 15.5, top: 37 },
  { key: "powers", short: "ちから", full: "そだった ちから", img: iconFlower, left: 13.5, top: 66 },
  { key: "shop", short: "おみせ", full: "おみせ", img: iconShop, left: 36, top: 70 },
  { key: "myhome", short: "おうち", full: "わたしの おうち", emoji: "🏠", left: 56, top: 62 },
  { key: "typing", short: "タイピング", full: "タイピングの とう", img: iconTyping, left: 46, top: 47 },
  { key: "puzzle", short: "パズル", full: "パズルの もり", img: iconPuzzle, left: 83, top: 71 },
  { key: "battle", short: "バトル", full: "クイズバトル", img: iconBattle, left: 89, top: 20 },
];

export default function WorldMap({ save, go, onSound }) {
  const [popup, setPopup] = useState(null); // タップ中のエリア（フル名前＋はいる）
  const battleOk = battleUnlocked(save);
  const sound = save.settings.sound;
  const area = popup && AREAS.find(a => a.key === popup);
  const areaLocked = a => a.key === "battle" && !battleOk;

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      {/* ヘッダーは従来どおり（相棒・⭐・🪙・きろく・音）をマップの上にそのまま維持 */}
      <Header save={save} title="" onSound={onSound} onRecords={() => go("records")} />
      <div style={{ textAlign: "center", margin: "0 0 10px" }}>
        <h1 className="pl-display" style={{ fontSize: 26, margin: 0 }}>🗺️ プログラミングランド</h1>
        <div style={{ fontWeight: 700, fontSize: 13 }}>いきたい ばしょを タップしてね</div>
      </div>

      {/* ワールドマップ本体 */}
      <div style={{ margin: "0 14px", position: "relative", aspectRatio: "16 / 9",
        border: `3px solid ${C.ink}`, borderRadius: 22, boxShadow: "5px 5px 0 rgba(58,51,53,.9)",
        overflow: "hidden", background: "#8ED1F2" }}>
        <img src={bgUrl} alt="ワールドマップ" draggable="false"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        {AREAS.map(a => {
          const locked = areaLocked(a);
          return (
            <button key={a.key} onClick={() => { SFX.tap(sound); setPopup(a.key); }}
              aria-label={a.full}
              style={{ position: "absolute", left: `${a.left}%`, top: `${a.top}%`,
                transform: "translate(-50%,-50%)", width: "10.5%", aspectRatio: "1",
                borderRadius: "50%", border: `3px solid ${C.ink}`, cursor: "pointer", padding: 0,
                background: locked ? "rgba(210,204,192,.85)" : "rgba(255,253,245,.94)",
                display: "flex", alignItems: "center", justifyContent: "center",
                filter: locked ? "grayscale(1)" : "none" }}>
              {a.img
                ? <img src={a.img} alt="" draggable="false" style={{ width: "76%", height: "76%", objectFit: "contain", display: "block", opacity: locked ? 0.55 : 1 }} />
                : <span style={{ fontSize: "clamp(15px,4.4vw,29px)", lineHeight: 1 }}>{a.emoji}</span>}
              {locked && <span style={{ position: "absolute", top: "-14%", right: "-14%", fontSize: "clamp(11px,2.6vw,17px)" }}>🔒</span>}
              {/* 短い名前（フル名前はポップアップで） */}
              <span style={{ position: "absolute", top: "102%", left: "50%", transform: "translateX(-50%)",
                whiteSpace: "nowrap", fontWeight: 900, fontSize: "clamp(7px,1.8vw,11px)",
                background: "rgba(255,255,255,.92)", border: `2px solid ${C.ink}`, borderRadius: 999,
                padding: "0 6px", color: C.ink, lineHeight: 1.6 }}>{a.short}</span>
            </button>
          );
        })}
      </div>

      {/* タップ時ポップアップ: フル名前＋「はいる」（ロック中は案内のみ） */}
      {area && (
        <div role="dialog" aria-modal="true" onClick={() => setPopup(null)}
          style={{ position: "fixed", inset: 0, zIndex: 110, background: "rgba(58,51,53,.45)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel pop" onClick={e => e.stopPropagation()}
            style={{ maxWidth: 320, width: "100%", padding: 20, textAlign: "center", background: "#FFFDF5" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
              {area.img
                ? <img src={area.img} alt="" draggable="false" style={{ width: 84, height: 84, objectFit: "contain" }} />
                : <span style={{ fontSize: 66, lineHeight: 1 }}>{area.emoji}</span>}
            </div>
            <div className="pl-display" style={{ fontSize: 23 }}>{area.full}</div>
            {areaLocked(area) ? (
              <>
                <div style={{ fontWeight: 800, fontSize: 14, margin: "10px 0" }}>
                  🔒 あいぼうが Lv{BATTLE_UNLOCK_LEVEL}に なると あそべるよ<br />
                  <span style={{ fontWeight: 700, fontSize: 12, color: "#6B6265" }}>（いま Lv{save.partner ? save.partner.level : 1}。パズルや クイズで そだてよう！）</span>
                </div>
                <Btn bg="#fff" onClick={() => setPopup(null)}>とじる</Btn>
              </>
            ) : (
              <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 12 }}>
                <Btn big bg={C.leaf} onClick={() => { SFX.tap(sound); setPopup(null); go(area.key); }}>▶ はいる！</Btn>
                <Btn bg="#fff" onClick={() => setPopup(null)}>とじる</Btn>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
