// ホーム画面（v1から移植・星の合計はデータから自動計算・プロファイル交代を追加）
import { C } from "../theme.js";
import { Btn, Header } from "./common.jsx";
import { QUIZ_SETS } from "../data/quizzes.js";
import { TOTAL_STARS } from "../data/stages.js";
import { BADGES, puzzleStarsTotal } from "../data/badges.js";

export default function Home({ save, go, onSound, onSwitchProfile }) {
  const stars = puzzleStarsTotal(save);
  const quizDone = Object.keys(save.quiz.best).length;
  const badges = save.badges.length;
  const modes = [
    { key: "puzzle", emoji: "🤖", name: "ロボット パズル", desc: "ブロックで ロボットを うごかそう", color: C.leaf, sub: `⭐ ${stars} / ${TOTAL_STARS}` },
    { key: "quiz", emoji: "💡", name: "かんがえる クイズ", desc: "プログラミングの あたまで こたえよう", color: C.sky, sub: `${quizDone} / ${QUIZ_SETS.length} セット` },
    { key: "art", emoji: "🎨", name: "おえかき コード", desc: "めいれいで えを かこう", color: C.sakura, sub: `さくひん ${save.art.gallery.length} こ` },
  ];
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="" onSound={onSound} onRecords={() => go("records")} />
      <div style={{ textAlign: "center", margin: "6px 0 18px" }}>
        <h1 className="pl-display" style={{ fontSize: 32, margin: 0 }}>🗺️ プログラミングランド</h1>
        <div style={{ fontWeight: 700 }}>きょうは どこで あそぶ？</div>
      </div>
      <div style={{ display: "grid", gap: 16, padding: "0 16px" }}>
        {modes.map((m, i) => (
          <button key={m.key} className="pbtn slide" onClick={() => go(m.key)}
            style={{ background: "#fff", textAlign: "left", padding: 18, display: "flex", gap: 16, alignItems: "center", animationDelay: `${i * 0.06}s` }}>
            <span style={{ fontSize: 46, background: m.color, border: `3px solid ${C.ink}`, borderRadius: 18, padding: "8px 12px" }}>{m.emoji}</span>
            <span style={{ flex: 1 }}>
              <span className="pl-display" style={{ fontSize: 22, display: "block" }}>{m.name}</span>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{m.desc}</span>
            </span>
            <span className="panel" style={{ padding: "6px 10px", fontWeight: 900, fontSize: 13, borderRadius: 12, background: m.color }}>{m.sub}</span>
          </button>
        ))}
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
