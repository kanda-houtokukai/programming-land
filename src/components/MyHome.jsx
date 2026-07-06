// 「わたしの おうち」（worldmap-home実装指示.md §5）。
// 旧ホームに散っていた「自分に関するもの」を集約するハブ:
// プロフィール・相棒・なかまずかん・きろく（保護者ゲート込み）・プロファイル切替。
// 各機能そのものは既存画面（dex/records）を使い、ここは導線をまとめるだけ。
import { C } from "../theme.js";
import { Btn, Header } from "./common.jsx";
import { BADGES, puzzleStarsTotal, daysPlayed } from "../data/badges.js";
import { equippedDeco } from "../data/battle.js";
import PartnerCard from "./PartnerCard.jsx";

export default function MyHome({ save, go, onSound, onSwitchProfile }) {
  const badges = save.badges.length;
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="🏠 わたしの おうち" onBack={() => go("home")} onSound={onSound} />
      <div style={{ padding: "0 16px", display: "grid", gap: 14 }}>
        {/* プロフィール */}
        <div className="panel slide" style={{ padding: 16, textAlign: "center" }}>
          <span style={{ fontSize: 46 }}>{save.avatar}</span>
          <div className="pl-display" style={{ fontSize: 23 }}>{save.name}</div>
          <div style={{ fontWeight: 800, fontSize: 14, marginTop: 4 }}>
            ⭐ {puzzleStarsTotal(save)}こ ／ 🪙 {save.coins || 0} ／ 🏅 {badges}/{BADGES.length} ／ 🔥 {daysPlayed(save)}にち
          </div>
        </div>
        {/* 相棒 */}
        <PartnerCard partner={save.partner} deco={equippedDeco(save)} onOpenDex={() => go("dex")} />
        {/* じぶんに かんする ばしょ */}
        <button className="pbtn slide" onClick={() => go("dex")}
          style={{ background: "#fff", padding: 16, display: "flex", gap: 12, alignItems: "center", textAlign: "left" }}>
          <span style={{ fontSize: 34 }}>📔</span>
          <span style={{ flex: 1 }}>
            <span className="pl-display" style={{ fontSize: 18, display: "block" }}>なかまずかん</span>
            <span style={{ fontWeight: 700, fontSize: 12 }}>あいぼうの すがた・たおした あいて・バッジ</span>
          </span><span>▶</span>
        </button>
        <button className="pbtn slide" onClick={() => go("records")}
          style={{ background: "#fff", padding: 16, display: "flex", gap: 12, alignItems: "center", textAlign: "left" }}>
          <span style={{ fontSize: 34 }}>📖</span>
          <span style={{ flex: 1 }}>
            <span className="pl-display" style={{ fontSize: 18, display: "block" }}>きろくの へや</span>
            <span style={{ fontWeight: 700, fontSize: 12 }}>わたしの きろく・おうちのひとへ</span>
          </span><span>▶</span>
        </button>
        <button className="pbtn" onClick={onSwitchProfile}
          style={{ background: "#fff", padding: 12, fontSize: 14 }}>
          👥 じぶんを こうたいする
        </button>
      </div>
    </div>
  );
}
