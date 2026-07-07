// おうち（RPGの子供部屋・第2波 段階①）。メモ01=モーダルで開く／メモ04=部屋の家具で機能へ。
// App レベルのモーダルオーバーレイ。呼び出し元は App が保持し、閉じると呼び出し元に戻る。
// 本棚=ずかん・机=きろく は全画面（onEnter で App が画面遷移）。額縁=プロフィール・相棒詳細は
// 部屋内のネストモーダル（画面遷移なし）。宝箱=将来枠（座標だけ確保）。
// プロファイル交代はマップの「みなと」に一本化（段階②）＝この部屋には置かない。
import { useState } from "react";
import { C } from "../theme.js";
import { Btn } from "./common.jsx";
import { SFX } from "../sound.js";
import { speciesById, stageForLevel } from "../data/monsters.js";
import { partnerDisplayName, xpToNext, MAX_LEVEL } from "../growth.js";
import { BADGES, puzzleStarsTotal, daysPlayed } from "../data/badges.js";
import MonsterArt from "./MonsterArt.jsx";
import PlayerAvatar from "./PlayerAvatar.jsx";
import roomBg from "../assets/room-home.webp";

// 家具のタップ領域（room-home.webp に対する%座標＝家具の絵に合わせる。宝箱は将来枠で座標だけ保持）
const FURNITURE = [
  { key: "dex", label: "ずかん", left: 11, top: 40, w: 20, h: 62 },   // 左の本棚（縦長）
  { key: "records", label: "きろく", left: 89, top: 44, w: 18, h: 40 }, // 右の机の上の日記
  { key: "profile", label: "プロフィール", left: 52, top: 22, w: 12, h: 16 }, // 中央奥の壁の額縁（グリッド実測で中心52/22に合わせた）
  { key: "chest", label: "たからばこ", left: 90, top: 80, w: 14, h: 22 },   // 右下の宝箱（将来用）
];

export default function HomeRoom({ save, onClose, onEnter }) {
  const [nested, setNested] = useState(null); // "profile" | "partner" | null（部屋内のネストモーダル）
  const [chestMsg, setChestMsg] = useState(false);
  const sound = save.settings.sound;
  const partner = save.partner;
  const stage = partner ? stageForLevel(partner.level) : 1;

  const tap = key => {
    SFX.tap(sound);
    if (key === "dex" || key === "records") onEnter(key);        // 全画面へ（App が遷移）
    else if (key === "profile" || key === "partner") setNested(key); // 部屋内モーダル
    else if (key === "chest") { setChestMsg(true); setTimeout(() => setChestMsg(false), 1600); }
  };

  return (
    <div role="dialog" aria-modal="true" onClick={onClose} className="fadein"
      style={{ position: "fixed", inset: 0, zIndex: 118, background: "rgba(58,51,53,.55)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 14 }}>
      <div className="panel softpop" onClick={e => e.stopPropagation()}
        style={{ maxWidth: 640, width: "100%", padding: 12, background: "#FFFDF5" }}>
        {/* ヘッダー行: タイトル＋×（メモ03: 閉じる＝呼び出し元へ1階層） */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span className="pl-display" style={{ fontSize: 20, flex: 1 }}>🏠 {save.name}の おうち</span>
          <Btn bg="#fff" onClick={onClose} style={{ fontSize: 15, padding: "6px 12px" }}>✕ とじる</Btn>
        </div>

        {/* 部屋（背景＋家具のタップ領域）。
            ★表示方式: 背景 img 自身にコンテナ高さを決めさせる（width:100% / height:auto / block）。
            aspectRatio+objectFit:cover 方式だと 幅ごとにサブピクセルのトリミングが変わり、絵の中の家具と
            %座標がズレる（実機b2bで額縁がズレた原因）。img が座標空間そのものになるこの方式なら
            どの幅でも %座標が必ず絵と一致する（トリミング/伸縮に一切依存しない）。 */}
        <div style={{ position: "relative", borderRadius: 16, lineHeight: 0,
          overflow: "hidden", border: `3px solid ${C.ink}`, background: "#e9c9a0" }}>
          <img src={roomBg} alt="おうちの へや" draggable="false"
            style={{ display: "block", width: "100%", height: "auto" }} />

          {/* 家具のタップ領域（うっすら光る＝押せる合図・staggerで一斉に光らない） */}
          {FURNITURE.map((f, i) => (
            <button key={f.key} className="roomhot" onClick={() => tap(f.key)} aria-label={f.label}
              style={{ position: "absolute", left: `${f.left}%`, top: `${f.top}%`,
                transform: "translate(-50%,-50%)", width: `${f.w}%`, height: `${f.h}%`,
                border: "none", background: "transparent", cursor: "pointer", padding: 0,
                animationDelay: `${(i * 0.6).toFixed(1)}s`, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
              <span style={{ whiteSpace: "nowrap", marginBottom: 2, fontWeight: 900, fontSize: "clamp(8px,1.9vw,12px)", color: C.ink,
                textShadow: "0 0 3px #fff,1.5px 1.5px 0 #fff,-1.5px 1.5px 0 #fff,1.5px -1.5px 0 #fff,-1.5px -1.5px 0 #fff" }}>{f.label}</span>
            </button>
          ))}

          {/* 相棒（中央床・別画像を動的に乗せる＝進化で姿が変わるため。軽いふわふわ） */}
          {partner && (
            <button className="roomhot" onClick={() => tap("partner")} aria-label="あいぼう"
              style={{ position: "absolute", left: "46%", top: "66%", transform: "translate(-50%,-50%)",
                width: "26%", border: "none", background: "transparent", cursor: "pointer", padding: 0,
                display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span className="mapfloat" style={{ lineHeight: 0, filter: "drop-shadow(1px 3px 3px rgba(20,15,25,.4))" }}>
                <MonsterArt species={partner.species} stage={stage} size={92} />
              </span>
              <span style={{ whiteSpace: "nowrap", fontWeight: 900, fontSize: "clamp(8px,1.9vw,12px)", color: C.ink,
                textShadow: "0 0 3px #fff,1.5px 1.5px 0 #fff,-1.5px 1.5px 0 #fff,1.5px -1.5px 0 #fff,-1.5px -1.5px 0 #fff" }}>あいぼう</span>
            </button>
          )}

          {/* 宝箱の「まだ なにも ないよ」（将来枠） */}
          {chestMsg && (
            <div className="pop" style={{ position: "absolute", left: "72%", top: "72%", transform: "translate(-50%,-50%)",
              background: "#FFFDF5", border: `2px solid ${C.ink}`, borderRadius: 12, padding: "6px 12px",
              fontWeight: 800, fontSize: "clamp(9px,2vw,13px)", whiteSpace: "nowrap" }}>まだ なにも ないよ</div>
          )}
        </div>
      </div>

      {/* ネスト: プロフィール（額縁）= 名前・⭐・コイン等の表示 */}
      {nested === "profile" && (
        <div role="dialog" aria-modal="true" onClick={() => setNested(null)}
          style={{ position: "fixed", inset: 0, zIndex: 122, background: "rgba(58,51,53,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel softpop" onClick={e => e.stopPropagation()}
            style={{ maxWidth: 340, width: "100%", padding: 22, textAlign: "center", background: "#FFFDF5" }}>
            {/* 全身の立ち絵＝着せ替えの確認場所（段階③・買ったおしゃれが ここで見える） */}
            <span style={{ display: "inline-flex", justifyContent: "center" }}>
              <PlayerAvatar character={save.character} avatar={save.avatar} dressup={save.dressup} size={120} full />
            </span>
            <div className="pl-display" style={{ fontSize: 23 }}>{save.name}</div>
            <div style={{ fontWeight: 800, fontSize: 14, margin: "10px 0", lineHeight: 1.9 }}>
              ⭐ ほし {puzzleStarsTotal(save)}こ<br />
              🪙 コイン {save.coins || 0}まい<br />
              🏅 バッジ {save.badges.length}/{BADGES.length}こ<br />
              🔥 あそんだ {daysPlayed(save)}にち
            </div>
            <Btn big bg={C.leaf} onClick={() => setNested(null)}>とじる</Btn>
          </div>
        </div>
      )}

      {/* ネスト: 相棒の詳細（Lv・つぎのレベルまで・ずかんへ） */}
      {nested === "partner" && partner && (
        <div role="dialog" aria-modal="true" onClick={() => setNested(null)}
          style={{ position: "fixed", inset: 0, zIndex: 122, background: "rgba(58,51,53,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel softpop" onClick={e => e.stopPropagation()}
            style={{ maxWidth: 340, width: "100%", padding: 22, textAlign: "center", background: "#FFFDF5" }}>
            <span style={{ position: "relative", display: "inline-flex", lineHeight: 0 }}>
              <MonsterArt species={partner.species} stage={stage} size={120} />
              {/* 相棒の飾り(deco)は第3波②で廃止（着せ替えは主人公へ） */}
            </span>
            <div className="pl-display" style={{ fontSize: 22, marginTop: 4 }}>{partnerDisplayName(partner)}</div>
            <div style={{ fontWeight: 900, fontSize: 15, margin: "6px 0" }}>{speciesById(partner.species).typeEmoji} Lv.{partner.level}</div>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#6B6265", marginBottom: 14 }}>
              {partner.level >= MAX_LEVEL ? "レベル マックス！" : `つぎの レベルまで あと ${xpToNext(partner.level) - partner.xp}`}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <Btn big bg={C.sun} onClick={() => { setNested(null); onEnter("dex"); }}>📔 ずかん</Btn>
              <Btn bg="#fff" onClick={() => setNested(null)}>とじる</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
