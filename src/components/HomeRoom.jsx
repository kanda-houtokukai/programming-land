// おうち（RPGの子供部屋・第2波 段階①）。メモ01=モーダルで開く／メモ04=部屋の家具で機能へ。
// App レベルのモーダルオーバーレイ。呼び出し元は App が保持し、閉じると呼び出し元に戻る。
// 本棚=ずかん・机=きろく は全画面（onEnter で App が画面遷移）。相棒詳細は部屋内のネストモーダル。
// プロファイル交代はマップの「みなと」に一本化（段階②）＝この部屋には置かない。
// UI改修①〜③（2026-07-11）: ラベル=RPG看板調で対象の「上」／たからばこ=もちもの（どうぐ＋はいけい切替）／
// プロフィール導線=額縁→あいぼうの横のアバター（額縁は装飾に）・画面刷新（左アバター大＋右ステータスplate＋きせかえ）。
import { useState, useEffect, useRef } from "react";
import { C } from "../theme.js";
import { Btn } from "./common.jsx";
import { SFX } from "../sound.js";
import { speciesById, stageForLevel, partnerStageScale, SPECIES, pendingEggs, monsterName } from "../data/monsters.js";
import { partnerDisplayName, xpToNext, MAX_LEVEL } from "../growth.js";
import { BADGES, puzzleStarsTotal, daysPlayed } from "../data/badges.js";
import { ITEMS, COSMETICS, DEFAULT_BG_CHOICES } from "../data/battle.js";
import MonsterArt from "./MonsterArt.jsx";
import PlayerAvatar from "./PlayerAvatar.jsx";
import DressupShelf from "./DressupShelf.jsx";
import roomBg from "../assets/room-home.webp";
import eggImg from "../assets/egg.png";
import iconStatStar from "../assets/icon_stat_star.png";
import iconStatCoin from "../assets/icon_stat_coin.png";
import iconStatBadge from "../assets/icon_stat_badge.png";
import iconStatDays from "../assets/icon_stat_days.png";
import bgAuto from "../assets/bg_auto.webp";

// 家具のタップ領域（room-home.webp に対する%座標＝家具の絵に合わせる）。
// プロフィールは額縁→アバター導線へ移行（UI改修③）＝額縁(52/22)は装飾に戻した（座標はコメントで保持）。
// labelDy: 看板ラベルの下方向オフセットpx（b3x実機FB: 本棚/机のラベルが天井際で高い→少し下へ）
const FURNITURE = [
  { key: "dex", label: "ずかん", left: 11, top: 40, w: 20, h: 62, labelDy: 16 },   // 左の本棚（縦長）
  { key: "records", label: "きろく", left: 89, top: 44, w: 18, h: 40, labelDy: 12 }, // 右の机の上の日記
  { key: "chest", label: "もちもの", left: 90, top: 80, w: 14, h: 22, labelDy: 0 },  // 右下の宝箱＝もちもの（UI改修②）
  // { key: "profile", left: 52, top: 22 } … 中央奥の額縁（装飾・将来枠）
];

// ステータスplateの専用アイコン（b4d: SVG仮図形→専用イラストに差し替え。大きさは従来の22px＝実機で調整可）
const STAT_ICONS = { star: iconStatStar, coin: iconStatCoin, badge: iconStatBadge, days: iconStatDays };
function MiniIcon({ kind }) {
  return <img src={STAT_ICONS[kind] || STAT_ICONS.days} alt="" draggable="false"
    style={{ width: 22, height: 22, display: "block", objectFit: "contain" }} />;
}

// 相棒の立ち位置（進化サイズ別・実機FB③②・2026-07-12）。大きいほど中心を上げて足元を床の線に保つ
// （中心アンカーのため。b3zのアバター調整と同じ考え方・初期値→実機で詰める）
const PARTNER_TOP = { 1: 66, 2: 64, 3: 61 };

// たまごのアイコン（b4i: 仮SVG→専用イラスト egg.png に差し替え。部屋の床とたまごモーダルで共用）
function EggIcon({ size = 40 }) {
  return <img src={eggImg} alt="たまご" draggable="false"
    style={{ width: size, height: size, objectFit: "contain", display: "block" }} />;
}

export default function HomeRoom({ save, update, onClose, onEnter }) {
  const [nested, setNested] = useState(null); // "profile" | "partner" | "chest" | "dressup" | null（部屋内のネストモーダル）
  const [dressMsg, setDressMsg] = useState(null); // きせかえモーダル内のメッセージ（購入/コイン不足）
  // 実機FB③: スマホ（狭幅）ではアバター・相棒を比例して縮小。
  // 方式: 部屋の実幅（img駆動）に比例させる＝背景と同じ空間でスケールするため、
  // どの幅でも %座標（足元の床の線）が崩れない。612=最大幅時の部屋幅（640パネル-padding）。
  const roomRef = useRef(null);
  const [roomW, setRoomW] = useState(612);
  useEffect(() => {
    const el = roomRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setRoomW(el.clientWidth || 612));
    ro.observe(el);
    setRoomW(el.clientWidth || 612);
    return () => ro.disconnect();
  }, []);
  const sizeK = Math.min(1, Math.max(0.5, roomW / 612)); // 下限0.5＝極小画面の保険
  const sound = save.settings.sound;
  const partner = save.partner;
  const stage = partner ? stageForLevel(partner.level) : 1;
  const partnerSize = Math.round(92 * (partnerStageScale[stage] || 1) * sizeK); // 実機FB②: 進化で大きく（stage3≈アバターの肩）
  const avatarSize = Math.round(156 * sizeK);
  const eggs = pendingEggs(partner); // b4f: 未開封たまご数（節目到達−孵化済みの導出＝スキーマ追加なし）
  const [hatched, setHatched] = useState(null); // たまごモーダル内: 孵ったばかりのタイプid（祝福表示）
  const items = save.items || {};
  const ownedItems = ITEMS.filter(it => (items[it.id] || 0) > 0);
  const ownedBgs = COSMETICS.filter(c => ((save.cosmetics && save.cosmetics.owned) || []).includes(c.id));
  const equippedBg = (save.cosmetics && save.cosmetics.equipped && save.cosmetics.equipped.bg) || null;

  const tap = key => {
    SFX.tap(sound);
    if (key === "dex" || key === "records") onEnter(key);            // 全画面へ（App が遷移）
    else setNested(key);                                              // profile / partner / chest = 部屋内モーダル
  };
  // もちもの: バトルはいけいの切替（おまかせ=null／既定3枚の固定／購入舞台。equipped.bg 文字列を流用＝スキーマ不変）
  const setBattleBg = id => { SFX.tap(sound); update(s => { s.cosmetics.equipped.bg = id; return s; }); };

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

        {/* 部屋（背景＋家具のタップ領域）。★img駆動方式（b2cの教訓）＝%座標が常に絵と一致 */}
        <div ref={roomRef} style={{ position: "relative", borderRadius: 16, lineHeight: 0,
          overflow: "hidden", border: `3px solid ${C.ink}`, background: "#e9c9a0" }}>
          <img src={roomBg} alt="おうちの へや" draggable="false"
            style={{ display: "block", width: "100%", height: "auto" }} />

          {/* 家具のタップ領域（透明）＋RPG看板ラベル（UI改修①: 対象の「上」・しっぽで指す・うっすら点滅） */}
          {FURNITURE.map((f, i) => (
            <button key={f.key} className="tapzone" onClick={() => tap(f.key)} aria-label={f.label}
              style={{ position: "absolute", left: `${f.left}%`, top: `${f.top}%`,
                transform: "translate(-50%,-50%)", width: `${f.w}%`, height: `${f.h}%`,
                border: "none", background: "transparent", cursor: "pointer", padding: 0 }}>
              <span className="bubble pulse" style={{ position: "absolute", left: "50%", bottom: "calc(100% + 2px)",
                transform: `translate(-50%, ${f.labelDy || 0}px)`, fontSize: "clamp(8px,1.9vw,12px)",
                animationDelay: `${(i * 0.7).toFixed(1)}s` }}>{f.label}</span>
            </button>
          ))}

          {/* 相棒（中央床・進化で姿が変わるため動的表示。生きている感の揺れ=mapfloatは据え置き・点滅にしない） */}
          {partner && (
            <button className="tapzone" onClick={() => tap("partner")} aria-label="あいぼう"
              style={{ position: "absolute", left: "42%", top: `${PARTNER_TOP[stage] || 66}%`, transform: "translate(-50%,-50%)",
                width: "24%", border: "none", background: "transparent", cursor: "pointer", padding: 0,
                display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span className="bubble pulse" style={{ marginBottom: 5, fontSize: "clamp(8px,1.9vw,12px)" }}>あいぼう</span>
              <span className="mapfloat" style={{ lineHeight: 0, filter: "drop-shadow(1px 3px 3px rgba(20,15,25,.4))" }}>
                <MonsterArt species={partner.active} stage={stage} size={partnerSize} />
              </span>
            </button>
          )}

          {/* たまご（b4f: 節目Lv到達で届く。相棒の左の床に置く・開封は部屋で＝バトル等を邪魔しない） */}
          {partner && eggs > 0 && (
            <button className="tapzone" onClick={() => { setHatched(null); tap("egg"); }} aria-label="たまご"
              style={{ position: "absolute", left: "24%", top: "72%", transform: "translate(-50%,-50%)",
                border: "none", background: "transparent", cursor: "pointer", padding: 0,
                display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span className="bubble pulse" style={{ marginBottom: 4, fontSize: "clamp(8px,1.9vw,12px)", animationDelay: ".4s" }}>
                たまご{eggs > 1 ? ` ×${eggs}` : ""}</span>
              <span className="mapfloat" style={{ lineHeight: 0, animationDelay: ".8s", filter: "drop-shadow(1px 3px 3px rgba(20,15,25,.4))" }}>
                <EggIcon size={Math.round(40 * sizeK)} />
              </span>
            </button>
          )}

          {/* 自分のアバター（UI改修③: あいぼうの横＝プロフィールの入口。着せ替えが反映された姿） */}
          <button className="tapzone" onClick={() => tap("profile")} aria-label="プロフィール"
            style={{ position: "absolute", left: "60%", top: "47%", transform: "translate(-50%,-50%)",
              width: "16%", border: "none", background: "transparent", cursor: "pointer", padding: 0,
              display: "flex", flexDirection: "column", alignItems: "center" }}>{/* b3z実機FB: top66→47＝156px化した背丈差ぶん上げて相棒と足元（床の線）を揃える */}
            <span className="bubble pulse" style={{ marginBottom: 5, fontSize: "clamp(8px,1.9vw,12px)", animationDelay: "1.3s" }}>プロフィール</span>
            <span className="mapfloat" style={{ lineHeight: 0, animationDelay: "1.5s", filter: "drop-shadow(1px 3px 3px rgba(20,15,25,.4))" }}>
              <PlayerAvatar character={save.character} avatar={save.avatar} dressup={save.dressup} size={avatarSize} full />{/* b3y=156・狭幅はsizeKで縮小（実機FB③） */}
            </span>
          </button>
        </div>
      </div>

      {/* ネスト: プロフィール（UI改修③: 左=アバター大＋きせかえ／右=ゲーム調ステータスplate） */}
      {nested === "profile" && (
        <div role="dialog" aria-modal="true" onClick={() => setNested(null)}
          style={{ position: "fixed", inset: 0, zIndex: 122, background: "rgba(58,51,53,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel softpop" onClick={e => e.stopPropagation()}
            style={{ maxWidth: 560, width: "100%", padding: 20, background: "#FFFDF5", maxHeight: "88vh", overflowY: "auto" }}>
            <div style={{ display: "flex", gap: 16, alignItems: "stretch", flexWrap: "wrap", justifyContent: "center" }}>
              {/* 左: アバター大（b3x実機FB: 人物なので2倍の260に）＋きせかえ（部屋内モーダル＝おみせに行かない） */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, justifyContent: "center" }}>
                <PlayerAvatar character={save.character} avatar={save.avatar} dressup={save.dressup} size={260} full />
                <Btn bg={C.sakura} onClick={() => { SFX.tap(sound); setNested("dressup"); }}
                  style={{ fontSize: 12, padding: "6px 12px" }}>👗 きせかえ</Btn>
              </div>
              {/* 右: ゲーム調ステータス（枠つきplate・アイコンは専用イラスト＝b4d） */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7, justifyContent: "center" }}>
                <div className="pl-display" style={{ fontSize: 21, textAlign: "center", marginBottom: 2 }}>{save.name}</div>
                {[
                  { icon: "star", label: "ほし", val: `${puzzleStarsTotal(save)}こ` },
                  { icon: "coin", label: "コイン", val: `${save.coins || 0}まい` },
                  { icon: "badge", label: "バッジ", val: `${save.badges.length}/${BADGES.length}こ` },
                  { icon: "days", label: "あそんだ", val: `${daysPlayed(save)}にち` },
                ].map(row => (
                  <div key={row.icon} style={{ display: "flex", alignItems: "center", gap: 8,
                    background: "#FAF3E3", border: `2px solid ${C.ink}`, borderRadius: 12, padding: "6px 10px" }}>
                    <MiniIcon kind={row.icon} />
                    <span style={{ fontWeight: 900, fontSize: 13, flex: 1 }}>{row.label}</span>
                    <span style={{ fontWeight: 900, fontSize: 14 }}>{row.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: 14 }}>
              <Btn big bg={C.leaf} onClick={() => setNested(null)}>とじる</Btn>
            </div>
          </div>
        </div>
      )}

      {/* ネスト: きせかえ（b3x: おみせに行かず着せ替えUIだけ開く＝共通棚DressupShelf。もどる→プロフィール） */}
      {nested === "dressup" && (
        <div role="dialog" aria-modal="true" onClick={() => { setDressMsg(null); setNested("profile"); }}
          style={{ position: "fixed", inset: 0, zIndex: 122, background: "rgba(58,51,53,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel softpop" onClick={e => e.stopPropagation()}
            style={{ maxWidth: 560, width: "100%", padding: 16, background: "#FFFDF5", maxHeight: "88vh", overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Btn bg="#fff" onClick={() => { SFX.tap(sound); setDressMsg(null); setNested("profile"); }}
                style={{ fontSize: 14, padding: "6px 12px" }}>◀ もどる</Btn>
              <span style={{ fontWeight: 900, fontSize: 14, marginLeft: "auto" }}>🪙 {save.coins || 0}</span>
            </div>
            {dressMsg && <div className="panel slide" style={{ padding: 10, marginBottom: 8, background: "#FFFBE0", fontWeight: 800, fontSize: 13, textAlign: "center" }}>{dressMsg}</div>}
            <DressupShelf save={save} update={update}
              onBought={d => setDressMsg(`${d.name}を かって つけたよ！`)}
              onPoor={(d, diff) => setDressMsg(`コインが たりないよ（あと 🪙${diff}）`)} />
          </div>
        </div>
      )}

      {/* ネスト: もちもの（UI改修②: どうぐの数＋バトルはいけい切替。持ち物確認をここへ集約） */}
      {nested === "chest" && (
        <div role="dialog" aria-modal="true" onClick={() => setNested(null)}
          style={{ position: "fixed", inset: 0, zIndex: 122, background: "rgba(58,51,53,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel softpop" onClick={e => e.stopPropagation()}
            style={{ maxWidth: 430, width: "100%", padding: 20, background: "#FFFDF5", maxHeight: "86vh", overflowY: "auto" }}>
            <div className="pl-display" style={{ fontSize: 21, textAlign: "center", marginBottom: 10 }}>🧰 もちもの</div>
            {/* どうぐ（バトル消耗品・既存イラスト流用・数つき） */}
            <div style={{ fontWeight: 900, fontSize: 14, marginBottom: 6 }}>どうぐ</div>
            {ownedItems.length === 0
              ? <div style={{ fontWeight: 700, fontSize: 13, color: "#6B6265", marginBottom: 10 }}>まだ なにも ないよ。おみせで かえるよ！</div>
              : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(88px,1fr))", gap: 8, marginBottom: 10 }}>
                  {ownedItems.map(it => (
                    <div key={it.id} style={{ border: `2px solid ${C.ink}`, borderRadius: 12, padding: 8, textAlign: "center", background: "#FAF3E3" }}>
                      <img src={it.img} alt={it.name} draggable="false" style={{ width: 36, height: 36, objectFit: "contain" }} />
                      <div style={{ fontWeight: 900, fontSize: 10, lineHeight: 1.3 }}>{it.name}</div>
                      <div style={{ fontWeight: 900, fontSize: 13 }}>×{items[it.id]}</div>
                    </div>
                  ))}
                </div>
              )}
            {/* バトルのはいけい切替（おまかせ=難易度で自動／既定3枚の固定／購入した舞台） */}
            <div style={{ fontWeight: 900, fontSize: 14, margin: "8px 0 6px" }}>バトルの はいけい</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(96px,1fr))", gap: 8 }}>
              <button className="pbtn" onClick={() => setBattleBg(null)}
                style={{ padding: 6, background: equippedBg === null ? "#FFF7E6" : "#fff", textAlign: "center" }}>
                <img src={bgAuto} alt="おまかせ" draggable="false"
                  style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: 8, border: `2px solid ${C.ink}` }} />
                <div style={{ fontWeight: 800, fontSize: 10, marginTop: 3 }}>むずかしさで かわる{equippedBg === null && " ✓"}</div>
              </button>
              {[...DEFAULT_BG_CHOICES, ...ownedBgs].map(bgc => (
                <button key={bgc.id} className="pbtn" onClick={() => setBattleBg(bgc.id)}
                  style={{ padding: 6, background: equippedBg === bgc.id ? "#FFF7E6" : "#fff", textAlign: "center" }}>
                  <img src={bgc.img} alt="" draggable="false"
                    style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: 8, border: `2px solid ${C.ink}` }} />
                  <div style={{ fontWeight: 800, fontSize: 10, marginTop: 3 }}>{bgc.name}{equippedBg === bgc.id && " ✓"}</div>
                </button>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 14 }}>
              <Btn big bg={C.leaf} onClick={() => setNested(null)}>とじる</Btn>
            </div>
          </div>
        </div>
      )}

      {/* ネスト: 相棒のロア（b4f: 大きめ画像＋なまえ＋タイプ＋ものがたり＋Lv）＋きりかえ（ownedから選ぶ） */}
      {nested === "partner" && partner && (() => {
        const asp = speciesById(partner.active);
        return (
          <div role="dialog" aria-modal="true" onClick={() => setNested(null)}
            style={{ position: "fixed", inset: 0, zIndex: 122, background: "rgba(58,51,53,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
            <div className="panel softpop" onClick={e => e.stopPropagation()}
              style={{ maxWidth: 360, width: "100%", padding: 20, textAlign: "center", background: "#FFFDF5", maxHeight: "88vh", overflowY: "auto" }}>
              <MonsterArt species={partner.active} stage={stage} size={150} />
              <div className="pl-display" style={{ fontSize: 22, marginTop: 2 }}>{partnerDisplayName(partner)}</div>
              <div style={{ fontWeight: 900, fontSize: 13, margin: "4px 0 2px", background: asp.headBg, border: `2px solid ${C.ink}`, borderRadius: 999, padding: "2px 10px", display: "inline-block" }}>
                {asp.typeName}　Lv.{partner.level}</div>
              <div style={{ fontWeight: 700, fontSize: 11.5, color: "#6B6265", margin: "4px 0 8px" }}>
                {partner.level >= MAX_LEVEL ? "レベル マックス！" : `つぎの レベルまで あと ${xpToNext(partner.level) - partner.xp}`}
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.7, textAlign: "left", background: "#FAF3E3", border: `2px solid ${C.ink}`, borderRadius: 12, padding: "10px 12px" }}>{asp.lore}</div>
              {/* きりかえ: なかまに した タイプから えらぶ（levelは共有＝みんな いっしょに そだつ） */}
              {(partner.owned || []).length > 1 && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontWeight: 900, fontSize: 13, marginBottom: 5 }}>あいぼうを きりかえる</div>
                  <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
                    {partner.owned.map(id => {
                      const osp = speciesById(id);
                      if (!osp) return null;
                      const isActive = id === partner.active;
                      return (
                        <button key={id} className="pbtn" disabled={isActive}
                          onClick={() => { SFX.tap(sound); update(s => { s.partner.active = id; return s; }); }}
                          style={{ padding: 5, background: isActive ? "#FFF7E6" : "#fff", borderRadius: 12, opacity: 1 }}>
                          <MonsterArt species={id} stage={stage} size={46} />
                          <div style={{ fontWeight: 900, fontSize: 9.5 }}>{monsterName(id, stage)}{isActive && " ✓"}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 12 }}>
                <Btn big bg={C.sun} onClick={() => { setNested(null); onEnter("dex"); }}>📔 ずかん</Btn>
                <Btn bg="#fff" onClick={() => setNested(null)}>とじる</Btn>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ネスト: たまご（b4f: 未所持タイプから1つ えらんで 孵す。孵ったら祝福→きりかえ導線） */}
      {nested === "egg" && partner && (
        <div role="dialog" aria-modal="true" onClick={() => setNested(null)}
          style={{ position: "fixed", inset: 0, zIndex: 122, background: "rgba(58,51,53,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="panel softpop" onClick={e => e.stopPropagation()}
            style={{ maxWidth: 400, width: "100%", padding: 20, textAlign: "center", background: "#FFFDF5", maxHeight: "88vh", overflowY: "auto" }}>
            {!hatched ? (
              <>
                {/* b4i: 中身は内緒＝たまごをタップで孵す（未所持タイプからランダムで1体）。選択UIは廃止 */}
                <div className="pl-display" style={{ fontSize: 22, margin: "4px 0" }}>たまごが とどいた！</div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
                  タップして あけてみよう！ なにが でるかは おたのしみ{eggs > 1 && <span>（たまごは あと {eggs}こ）</span>}
                </div>
                <button className="pbtn pulse" aria-label="たまごを あける"
                  onClick={() => {
                    const pool = SPECIES.filter(sp => !(partner.owned || []).includes(sp.id));
                    if (pool.length === 0) { setNested(null); return; }
                    const pick = pool[Math.floor(Math.random() * pool.length)];
                    SFX.fanfare(sound);
                    setHatched(pick.id);
                    update(s => {
                      if (!s.partner.owned.includes(pick.id)) s.partner.owned.push(pick.id);
                      // ずかん登録: level共有なので いま到達している段階まで まとめて登録
                      for (let st = 1; st <= stageForLevel(s.partner.level); st++) {
                        const key = `${pick.id}-${st}`;
                        if (!s.dex.includes(key)) s.dex.push(key);
                      }
                      return s;
                    });
                  }}
                  style={{ background: "transparent", border: "none", padding: 6, margin: "0 auto", display: "block" }}>
                  <EggIcon size={140} />
                  <div style={{ fontWeight: 900, fontSize: 13, marginTop: 4 }}>ぱかっ と あける</div>
                </button>
                <div style={{ marginTop: 10 }}>
                  <Btn bg="#fff" onClick={() => setNested(null)}>あとで あける</Btn>
                </div>
              </>
            ) : (() => {
              const hsp = speciesById(hatched);
              return (
                <>
                  <div className="pop">
                    <MonsterArt species={hatched} stage={stageForLevel(partner.level)} size={140} />
                  </div>
                  <div className="pl-display" style={{ fontSize: 23, margin: "4px 0" }}>
                    {monsterName(hatched, stageForLevel(partner.level))}が なかまに なった！</div>
                  <div style={{ fontWeight: 700, fontSize: 12.5, color: "#6B6265", marginBottom: 12 }}>
                    ずかんに とうろくされたよ。レベルは あいぼう みんなで いっしょに そだつよ
                  </div>
                  <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                    <Btn big bg={hsp.color} onClick={() => { SFX.tap(sound); update(s => { s.partner.active = hatched; return s; }); setNested(null); }}>
                      この こに きりかえる</Btn>
                    <Btn bg="#fff" onClick={() => { setHatched(null); if (eggs <= 0) setNested(null); }}>とじる</Btn>{/* eggs は孵化後の再renderで再計算済み */}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
