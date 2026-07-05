// ホーム画面（v1から移植・星の合計はデータから自動計算・プロファイル交代を追加）
import { C } from "../theme.js";
import { Btn, Header } from "./common.jsx";
import { QUIZ_CATEGORIES, QUIZ_DIFFS } from "../data/quizzes.js";
import { TOTAL_STARS } from "../data/stages.js";
import { BADGES, puzzleStarsTotal } from "../data/badges.js";
import { ENEMIES, equippedDeco, battleUnlocked, BATTLE_UNLOCK_LEVEL } from "../data/battle.js";
import PartnerCard from "./PartnerCard.jsx";
import iconPuzzle from "../assets/icon_puzzle.png";
import iconQuiz from "../assets/icon_quiz.png";
import iconArt from "../assets/icon_art.png";
import iconTyping from "../assets/icon_typing.png";
import iconBattle from "../assets/icon_battle.png";
import iconShop from "../assets/icon_shop.png";

const MODE_ICON = { puzzle: iconPuzzle, quiz: iconQuiz, art: iconArt, typing: iconTyping, battle: iconBattle };

export default function Home({ save, go, onSound, onSwitchProfile }) {
  const stars = puzzleStarsTotal(save);
  const quizDone = Object.keys(save.quiz.best).filter(k => k.includes(":")).length;
  const quizTotal = QUIZ_CATEGORIES.length * QUIZ_DIFFS.length;
  const badges = save.badges.length;
  const modes = [
    { key: "puzzle", emoji: "🤖", name: "ロボット パズル", desc: "ブロックで ロボットを うごかそう", color: C.leaf, sub: `⭐ ${stars} / ${TOTAL_STARS}` },
    { key: "quiz", emoji: "💡", name: "かんがえる クイズ", desc: "プログラミングの あたまで こたえよう", color: C.sky, sub: `${quizDone} / ${quizTotal} セット` },
    { key: "art", emoji: "🎨", name: "おえかき コード", desc: "めいれいで えを かこう", color: C.sakura, sub: `さくひん ${save.art.gallery.length} こ` },
    { key: "typing", emoji: "⌨️", name: "タイピング", desc: "キーボードで もじを うとう", color: C.grape, sub: save.typing.best.kotoba ? `ベスト ${save.typing.best.kotoba.kpm}もじ/ぷん` : "はじめて" },
    battleUnlocked(save)
      ? { key: "battle", emoji: "⚔️", name: "クイズ バトル", desc: "クイズに こたえて てきを たおそう", color: "#FF8FAB", sub: `たおした ${((save.battle && save.battle.defeated) || []).length} / ${ENEMIES.length}` }
      : { key: "battle", emoji: "⚔️", name: "クイズ バトル", desc: `あいぼうが Lv${BATTLE_UNLOCK_LEVEL}に なると あそべるよ`, color: "#FF8FAB", locked: true, sub: `🔒 いまLv${save.partner ? save.partner.level : 1}` },
  ];
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="" onSound={onSound} onRecords={() => go("records")} />
      <div style={{ textAlign: "center", margin: "6px 0 18px" }}>
        <h1 className="pl-display" style={{ fontSize: 32, margin: 0 }}>🗺️ プログラミングランド</h1>
        <div style={{ fontWeight: 700 }}>きょうは どこで あそぶ？</div>
      </div>
      <div style={{ display: "grid", gap: 16, padding: "0 16px" }}>
        <PartnerCard partner={save.partner} deco={equippedDeco(save)} onOpenDex={() => go("dex")} />
        {modes.map((m, i) => (
          <button key={m.key} className="pbtn slide" disabled={m.locked} onClick={() => !m.locked && go(m.key)}
            style={{ background: m.locked ? "#F1EDE4" : "#fff", textAlign: "left", padding: 18, display: "flex", gap: 16, alignItems: "center", animationDelay: `${i * 0.06}s`, opacity: m.locked ? 0.75 : 1 }}>
            {/* 3Dルックの看板アイコン（画像がないモードは絵文字のまま）。ロック中は 🔒 を重ねる */}
            <span style={{ position: "relative", display: "inline-flex", lineHeight: 0 }}>
              {MODE_ICON[m.key] ? (
                <span style={{ background: "#fff", border: `3px solid ${C.ink}`, borderRadius: 18, padding: 6, lineHeight: 0, filter: m.locked ? "grayscale(1)" : "none" }}>
                  <img src={MODE_ICON[m.key]} alt={m.name} draggable="false" style={{ width: 54, height: 54, display: "block", opacity: m.locked ? 0.6 : 1 }} />
                </span>
              ) : (
                <span style={{ fontSize: 46, background: m.color, border: `3px solid ${C.ink}`, borderRadius: 18, padding: "8px 12px", filter: m.locked ? "grayscale(1)" : "none", opacity: m.locked ? 0.6 : 1 }}>{m.emoji}</span>
              )}
              {m.locked && <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>🔒</span>}
            </span>
            <span style={{ flex: 1 }}>
              <span className="pl-display" style={{ fontSize: 22, display: "block" }}>{m.name}</span>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{m.desc}</span>
            </span>
            <span className="panel" style={{ padding: "6px 10px", fontWeight: 900, fontSize: 13, borderRadius: 12, background: m.locked ? "#D2CCC0" : m.color }}>{m.sub}</span>
          </button>
        ))}
        {/* おみせ（モードカードより小さめの入口） */}
        <button className="pbtn slide" onClick={() => go("shop")}
          style={{ background: "#FFF3D6", padding: "10px 16px", fontSize: 16, display: "flex", gap: 12, alignItems: "center", textAlign: "left" }}>
          <span style={{ background: "#fff", border: `3px solid ${C.ink}`, borderRadius: 14, padding: 4, lineHeight: 0 }}>
            <img src={iconShop} alt="おみせ" draggable="false" style={{ width: 38, height: 38, display: "block" }} />
          </span>
          <span style={{ flex: 1, fontWeight: 900 }}>🪙 おみせ <span style={{ fontWeight: 700, fontSize: 13 }}>— コインで どうぐや おしゃれを かおう</span></span>
          <span className="panel" style={{ padding: "6px 10px", fontWeight: 900, fontSize: 13, borderRadius: 12, background: C.sun }}>🪙 {save.coins || 0}</span>
        </button>
        <button className="pbtn" onClick={() => go("records")}
          style={{ background: C.sun, padding: 14, fontSize: 17 }}>
          🏅 バッジ {badges} / {BADGES.length} こ ・ きろくを みる
        </button>
        <button className="pbtn" onClick={onSwitchProfile}
          style={{ background: "#fff", padding: 10, fontSize: 14 }}>
          👥 じぶんを こうたいする
        </button>
      </div>
    </div>
  );
}
