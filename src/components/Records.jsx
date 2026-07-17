// きろくの へや（子ども向けの日記・第2波 段階③で役割を一本化）。
// 入口はおうちの部屋の「机の日記」のみ。子ども自身が見る「がんばった記録」＝できたことだけを優しく見せる。
// 保護者向けの詳しい記録（到達度%・グラフ・データ管理・確認モード）は ParentHub（マップ最下部
// 「おうちのひとへ」→保護者ゲート奥）へ移設した。ここには保護者向け情報を置かない。
import { C } from "../theme.js";
import { Header } from "./common.jsx";
import { BADGES, puzzleStarsTotal, daysPlayed } from "../data/badges.js";
import { today } from "../storage.js";
import PartnerCard from "./PartnerCard.jsx";
import PlayerAvatar from "./PlayerAvatar.jsx";
import iconStatStar from "../assets/icon_stat_star.png";
import iconStatBadge from "../assets/icon_stat_badge.png";
import iconStatDays from "../assets/icon_stat_days.png";

export default function Records({ save, go, onSound, onBack, openHome }) {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 40 }}>
      {/* ◀もどる: おうち経由なら部屋へ（App の funcBack が判定） */}
      <Header save={save} title="📖 きろくの へや" onBack={onBack} onSound={onSound} onOpenHome={openHome} />
      <div style={{ display: "grid", gap: 16, padding: "0 16px" }}>
        {/* プロフィールと同じ左右レイアウト（左=アバター大・右=ぼうけん＋ステータスplate。狭幅はflexWrapで縦積み） */}
        <div className="panel slide" style={{ padding: 18, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ display: "inline-flex", justifyContent: "center" }}>
            <PlayerAvatar character={save.character} avatar={save.avatar} dressup={save.dressup} size={200} full />
          </span>
          <div style={{ flex: 1, minWidth: 220, display: "flex", flexDirection: "column", gap: 7, justifyContent: "center" }}>
            <div className="pl-display" style={{ fontSize: 22, textAlign: "center", marginBottom: 2 }}>{save.name} の ぼうけん</div>
            {[
              { icon: iconStatStar, label: "ほし", val: `${puzzleStarsTotal(save)}こ` },
              { icon: iconStatBadge, label: "バッジ", val: `${save.badges.length}こ` },
              { icon: iconStatDays, label: "あそんだ", val: `${daysPlayed(save)}にち` },
            ].map(row => (
              <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 8,
                background: "#FAF3E3", border: `2px solid ${C.ink}`, borderRadius: 12, padding: "6px 10px" }}>
                <img src={row.icon} alt="" draggable="false" style={{ width: 22, height: 22, display: "block", objectFit: "contain" }} />
                <span style={{ fontWeight: 900, fontSize: 13, flex: 1 }}>{row.label}</span>
                <span style={{ fontWeight: 900, fontSize: 14 }}>{row.val}</span>
              </div>
            ))}
          </div>
        </div>
        <PartnerCard partner={save.partner} size={80} />
        {/* きょうの きろく（日記の行・段階3）: 日別logを子ども向けの一言に。あそんだ日だけ出る（空の日は出さない） */}
        {(() => {
          const l = save.log[today()];
          if (!l) return null;
          const lines = [
            l.puzzle > 0 && `パズルを ${l.puzzle}かい クリアした`,
            l.quiz > 0 && `クイズを ${l.quiz}セット やった`,
            l.typing > 0 && `タイピングを ${l.typing}かい がんばった`,
            l.art > 0 && `おえかきを ${l.art}まい かいた`,
            l.battle > 0 && `バトルで ${l.battle}かい たたかった`,
            l.studio > 0 && `つくるスタジオで さくひんを ${l.studio}こ つくった`, // §1-7（段階3）
          ].filter(Boolean);
          if (!lines.length) return null;
          return (
            <div className="panel" style={{ padding: 18 }}>
              <div className="pl-display" style={{ fontSize: 20, marginBottom: 8 }}>きょうの きろく</div>
              {lines.map(t => (
                <div key={t} style={{ fontWeight: 800, fontSize: 14, padding: "5px 2px" }}>・{t}</div>
              ))}
            </div>
          );
        })()}
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
