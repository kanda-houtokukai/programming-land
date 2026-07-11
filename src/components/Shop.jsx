// おみせ（第3波②でRPGの店に刷新・memo05＋置き換え指示書§B/§C/§D）。
// 段階1: 店内（shop-interior.webp・ひげのおじさん店員）→店員タップ→「なにを かいにきた？」→カテゴリ選択。
// 段階2: 商品リスト（既存カードUI流用）。どうぐ=4種（絵をイラスト化・効果価格不変）／
//        きせかえ=主人公の着せ替え（SHOP_DRESSUP）＋バトルのぶたい2種（ジャングル/だいち）。
// もどるは1階層ずつ（リスト→店内→ワールドマップ＝メモ03）。ガチャ・課金なし・全品定価。
// 背景は img駆動方式（b2cの教訓: 絵の中の店員とタップ枠を一致させるため aspectRatio+cover は使わない）。
import { useState } from "react";
import { C } from "../theme.js";
import { Btn, Header } from "./common.jsx";
import HowTo from "./HowTo.jsx";
import ParentGuide from "./ParentGuide.jsx";
import { SHOP_GUIDE } from "../data/parent-guide.js";
import { ITEMS, COSMETICS } from "../data/battle.js";
import DressupShelf from "./DressupShelf.jsx";
import { SFX } from "../sound.js";
import shopBg from "../assets/shop-interior.webp";

// 店員の吹き出し文言（memo05の案・実機でChatと最終調整可）
const SERIF = {
  hello: "いらっしゃい！ なにを かいにきた？",
  items: "バトルで つかう どうぐだね！",
  dressup: "おしゃれを えらんでね！",
  bought: "まいど！ ありがとう",
  poor: "コインが たりないみたいだ。また おいで！",
  bye: "またね！",
};

export default function Shop({ save, update, go, onSound, openHome }) {
  const sound = save.settings.sound;
  // ※b3xでinitialStage導線は廃止（プロフィールのきせかえは部屋内モーダル＝DressupShelfを直接開く形に変更）
  const [stage, setStage] = useState("front");   // "front"=店内 / "items"=どうぐ / "dressup"=きせかえ
  const [talking, setTalking] = useState(false); // 店員に話しかけた（カテゴリ選択の吹き出し表示）
  const [msg, setMsg] = useState(null);          // 店員のひとこと（購入・コイン不足等）
  const coins = save.coins || 0;
  const items = save.items || {};
  const owned = (save.cosmetics && save.cosmetics.owned) || [];
  const equipped = (save.cosmetics && save.cosmetics.equipped) || { deco: null, bg: null };
  const flash = t => setMsg(t);

  function buyItem(it) {
    const have = items[it.id] || 0;
    if (have >= it.max) return flash(`🧺 ${it.name}は もう ${it.max}こ もっているよ`);
    if (coins < it.price) return flash(`💬 ${SERIF.poor}（あと 🪙${it.price - coins}）`);
    SFX.badge(sound);
    update(s => { s.coins -= it.price; s.items[it.id] = (s.items[it.id] || 0) + 1; s.shopUsed = true; return s; });
    flash(`💬 ${SERIF.bought}（${it.name}）`);
  }
  // 着せ替えの購入/装備は DressupShelf（共通棚・b3x）に集約。メッセージだけ店員のセリフで包む。
  // バトルのぶたい（既存機構流用・買ったらすぐ装備・トグルで着脱）
  function buyCosmetic(c) {
    if (owned.includes(c.id)) return;
    if (coins < c.price) return flash(`💬 ${SERIF.poor}（あと 🪙${c.price - coins}）`);
    SFX.badge(sound);
    update(s => { s.coins -= c.price; s.cosmetics.owned.push(c.id); s.shopUsed = true; s.cosmetics.equipped.bg = c.id; return s; });
    flash(`💬 ${SERIF.bought}（${c.name}）`);
  }
  function toggleBg(c) {
    SFX.tap(sound);
    update(s => { s.cosmetics.equipped.bg = s.cosmetics.equipped.bg === c.id ? null : c.id; return s; });
  }
  const enter = st => { SFX.tap(sound); setTalking(false); setMsg(null); setStage(st); };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      {/* もどる=1階層ずつ: 商品リスト→店内／店内→ワールドマップ（メモ03） */}
      <Header save={save} title="🪙 おみせ" onSound={onSound} onOpenHome={openHome}
        onBack={stage === "front" ? () => go("home") : () => enter("front")} />

      {/* ===== 段階1: 店内（店員に はなしかける） ===== */}
      {stage === "front" && (
        <div style={{ padding: "0 16px", display: "grid", gap: 12 }}>
          <div style={{ position: "relative", borderRadius: 16, lineHeight: 0,
            overflow: "hidden", border: `3px solid ${C.ink}`, background: "#e9c9a0" }}>
            <img src={shopBg} alt="おみせの なか" draggable="false"
              style={{ display: "block", width: "100%", height: "auto" }} />
            {/* 店員のタップ領域（透明）＋RPG風の吹き出し（おうちの家具ラベルと同じ作法）。
                吹き出しは店主の頭の上に置く（話しかける相手の位置を指す） */}
            <button className="tapzone" onClick={() => { SFX.tap(sound); setTalking(true); }} aria-label="てんいんさんに はなしかける"
              style={{ position: "absolute", left: "51%", top: "40%", transform: "translate(-50%,-50%)",
                width: "28%", height: "48%", border: "none", background: "transparent", cursor: "pointer", padding: 0 }}>
              {/* RPG看板ラベル＝店主の頭の「上」・しっぽで指す・うっすら点滅（UI改修①④） */}
              <span className="bubble pulse" style={{ position: "absolute", left: "50%", top: "6%",
                transform: "translate(-50%,-100%)", fontSize: "clamp(9px,2vw,13px)" }}>はなしかける</span>
            </button>
          </div>

          {/* 店員の吹き出し＋カテゴリ選択（店員タップで出る） */}
          {talking ? (
            <div className="panel softpop" style={{ padding: 16, background: "#FFFDF5" }}>
              <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 12 }}>💬 「{SERIF.hello}」</div>
              <div style={{ display: "grid", gap: 8 }}>
                <Btn big bg={C.sky} onClick={() => enter("items")}>🧃 バトルの どうぐ</Btn>
                <Btn big bg={C.sakura} onClick={() => enter("dressup")}>🎩 きせかえ</Btn>
                <Btn bg="#fff" onClick={() => { SFX.tap(sound); setTalking(false); setMsg(`💬 ${SERIF.bye}`); }}>やめる</Btn>
              </div>
            </div>
          ) : (
            <div style={{ fontWeight: 700, fontSize: 13, textAlign: "center", color: "#6B6265" }}>
              てんいんさんを タップして はなしかけてみよう
            </div>
          )}
          {msg && !talking && <div className="panel slide" style={{ padding: 10, background: "#FFFBE0", fontWeight: 800, fontSize: 14, textAlign: "center" }}>{msg}</div>}
          <HowTo id="shop" />
          <ParentGuide guide={SHOP_GUIDE} />
        </div>
      )}

      {/* ===== 段階2: 商品リスト ===== */}
      {stage !== "front" && (
        <div style={{ padding: "0 16px", display: "grid", gap: 14 }}>
          <div style={{ fontWeight: 900, fontSize: 14 }}>💬 「{stage === "items" ? SERIF.items : SERIF.dressup}」</div>
          {msg && <div className="panel slide" style={{ padding: 10, background: "#FFFBE0", fontWeight: 800, fontSize: 14, textAlign: "center" }}>{msg}</div>}

          {stage === "items" && (
            <div className="panel" style={{ padding: 16 }}>
              <div className="pl-display" style={{ fontSize: 19, marginBottom: 4 }}>⚔️ バトルの どうぐ</div>
              <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 10, color: "#6B6265" }}>バトル中に つかえる（1つ 3こまで）</div>
              <div style={{ display: "grid", gap: 10 }}>
                {ITEMS.map(it => {
                  const have = items[it.id] || 0;
                  const full = have >= it.max;
                  return (
                    <div key={it.id} style={{ display: "flex", gap: 12, alignItems: "center", border: `2px solid ${C.ink}`, borderRadius: 14, padding: "8px 12px" }}>
                      <img src={it.img} alt={it.emoji} draggable="false" style={{ width: 40, height: 40, objectFit: "contain" }} />
                      <span style={{ flex: 1 }}>
                        <span style={{ fontWeight: 900, fontSize: 15, display: "block" }}>{it.name} <span style={{ fontWeight: 700, fontSize: 12, color: "#6B6265" }}>（{have}/{it.max}）</span></span>
                        <span style={{ fontWeight: 700, fontSize: 12 }}>{it.desc}</span>
                      </span>
                      <Btn bg={full ? "#eee" : coins >= it.price ? C.leaf : "#fff"} disabled={full}
                        onClick={() => buyItem(it)} style={{ fontSize: 14, whiteSpace: "nowrap" }}>
                        {full ? "いっぱい" : `🪙${it.price}`}
                      </Btn>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {stage === "dressup" && (
            <>
              {/* 主人公の着せ替え＝共通棚（DressupShelf・b3x）。メッセージは店員のセリフで包む */}
              <DressupShelf save={save} update={update}
                onBought={d => flash(`💬 ${SERIF.bought}（${d.name}を つけたよ！）`)}
                onPoor={(d, diff) => flash(`💬 ${SERIF.poor}（あと 🪙${diff}）`)} />
              {/* バトルのぶたい（ジャングル/だいち・既存の難易度別3枚とは別のコレクション枠） */}
              <div className="panel" style={{ padding: 16 }}>
                <div className="pl-display" style={{ fontSize: 19, marginBottom: 4 }}>🖼️ バトルの ぶたい</div>
                <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 10, color: "#6B6265" }}>バトルの はいけいを かえられる（ずっと つかえる）</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 10 }}>
                  {COSMETICS.map(c => {
                    const has = owned.includes(c.id);
                    const on = equipped.bg === c.id;
                    return (
                      <div key={c.id} style={{ border: `2px solid ${C.ink}`, borderRadius: 14, padding: 10, textAlign: "center", background: on ? "#FFF7E6" : "#fff" }}>
                        <img src={c.img} alt="" draggable="false" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: 8, border: `2px solid ${C.ink}` }} />
                        <div style={{ fontWeight: 900, fontSize: 12, margin: "4px 0", lineHeight: 1.3 }}>{c.emoji} {c.name}</div>
                        {has
                          ? <Btn bg={on ? C.sun : "#fff"} onClick={() => toggleBg(c)} style={{ fontSize: 12, padding: "5px 10px" }}>{on ? "つけてる ✓" : "つける"}</Btn>
                          : <Btn bg={coins >= c.price ? C.leaf : "#fff"} onClick={() => buyCosmetic(c)} style={{ fontSize: 12, padding: "5px 10px" }}>🪙{c.price}</Btn>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
