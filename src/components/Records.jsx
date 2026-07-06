// きろくの へや（子ども向けの日記・第2波 段階③で役割を一本化）。
// 入口はおうちの部屋の「机の日記」のみ。子ども自身が見る「がんばった記録」＝できたことだけを優しく見せる。
// 保護者向けの詳しい記録（到達度%・グラフ・データ管理・確認モード）は ParentHub（マップ最下部
// 「おうちのひとへ」→保護者ゲート奥）へ移設した。ここには保護者向け情報を置かない。
import { C } from "../theme.js";
import { Header } from "./common.jsx";
import { BADGES, puzzleStarsTotal, daysPlayed } from "../data/badges.js";
import PartnerCard from "./PartnerCard.jsx";
import { equippedDeco } from "../data/battle.js";

export default function Records({ save, go, onSound, onBack, openHome }) {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 40 }}>
      {/* ◀もどる: おうち経由なら部屋へ（App の funcBack が判定） */}
      <Header save={save} title="📖 きろくの へや" onBack={onBack} onSound={onSound} onOpenHome={openHome} />
      <div style={{ display: "grid", gap: 16, padding: "0 16px" }}>
        <div className="panel slide" style={{ padding: 18, textAlign: "center" }}>
          <span style={{ fontSize: 50 }}>{save.avatar}</span>
          <div className="pl-display" style={{ fontSize: 24 }}>{save.name} の ぼうけん</div>
          <div style={{ fontWeight: 800, marginTop: 6 }}>⭐ {puzzleStarsTotal(save)}こ ／ 🏅 バッジ {save.badges.length}こ ／ 🔥 {daysPlayed(save)}にち あそんだ</div>
        </div>
        <PartnerCard partner={save.partner} size={80} deco={equippedDeco(save)} />
        <div className="panel" style={{ padding: 18 }}>
          <div className="pl-display" style={{ fontSize: 20, marginBottom: 10 }}>🏅 バッジ コレクション</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 10 }}>
            {BADGES.map(b => {
              const got = save.badges.includes(b.id);
              return (
                <div key={b.id} className="panel" style={{ padding: 10, textAlign: "center", borderRadius: 14, background: got ? C.sun : "#F5F2EC", opacity: got ? 1 : 0.85 }}>
                  <div style={{ fontSize: 30, filter: got ? "none" : "grayscale(1)", opacity: got ? 1 : 0.5 }}>{got ? b.emoji : "❔"}</div>
                  {got
                    ? <><div style={{ fontWeight: 900, fontSize: 13 }}>{b.name}</div>
                      <div style={{ fontSize: 11, fontWeight: 700 }}>{b.desc}</div></>
                    : <div style={{ fontSize: 11, fontWeight: 700, color: "#A49E95" }}>{b.desc}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
