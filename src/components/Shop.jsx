// おみせ（P6フェーズ2）。学習で貯めた🪙で買う。ガチャ・課金なし・全品定価。
// A) バトルアイテム（消耗品・各3個まで）／ B) きせかえ（非消耗・買うと装備で 相棒/バトルに反映）。
import { useState } from "react";
import { C } from "../theme.js";
import { Btn, Header } from "./common.jsx";
import HowTo from "./HowTo.jsx";
import ParentGuide from "./ParentGuide.jsx";
import { SHOP_GUIDE } from "../data/parent-guide.js";
import { ITEMS, COSMETICS, cosmeticById } from "../data/battle.js";
import { SFX } from "../sound.js";

export default function Shop({ save, update, go, onSound }) {
  const sound = save.settings.sound;
  const [msg, setMsg] = useState(null);
  const coins = save.coins || 0;
  const items = save.items || {};
  const owned = (save.cosmetics && save.cosmetics.owned) || [];
  const equipped = (save.cosmetics && save.cosmetics.equipped) || { deco: null, bg: null };
  const flash = t => { setMsg(t); };

  function buyItem(it) {
    const have = items[it.id] || 0;
    if (have >= it.max) return flash(`🧺 ${it.name}は もう ${it.max}こ もっているよ`);
    if (coins < it.price) return flash(`🪙が たりないよ（あと ${it.price - coins}）`);
    SFX.badge(sound);
    update(s => { s.coins -= it.price; s.items[it.id] = (s.items[it.id] || 0) + 1; s.shopUsed = true; return s; });
    flash(`🛍️ ${it.name}を かった！`);
  }
  function buyCosmetic(c) {
    if (owned.includes(c.id)) return;
    if (coins < c.price) return flash(`🪙が たりないよ（あと ${c.price - coins}）`);
    SFX.badge(sound);
    update(s => {
      s.coins -= c.price; s.cosmetics.owned.push(c.id); s.shopUsed = true;
      s.cosmetics.equipped[c.type] = c.id; // 買ったら すぐ つける
      return s;
    });
    flash(`✨ ${c.name}を かって つけた！`);
  }
  function toggleEquip(c) {
    SFX.tap(sound);
    update(s => {
      s.cosmetics.equipped[c.type] = s.cosmetics.equipped[c.type] === c.id ? null : c.id;
      return s;
    });
  }

  const decos = COSMETICS.filter(c => c.type === "deco");
  const bgs = COSMETICS.filter(c => c.type === "bg");

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 30 }}>
      <Header save={save} title="🪙 おみせ" onHome={() => go("home")} onSound={onSound} />
      <div style={{ padding: "0 16px", display: "grid", gap: 14 }}>
        <HowTo id="shop" />
        {msg && <div className="panel slide" style={{ padding: 10, background: "#FFFBE0", fontWeight: 800, fontSize: 14, textAlign: "center" }}>{msg}</div>}

        {/* A) バトルアイテム */}
        <div className="panel" style={{ padding: 16 }}>
          <div className="pl-display" style={{ fontSize: 19, marginBottom: 4 }}>⚔️ バトルの どうぐ</div>
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 10, color: "#6B6265" }}>バトル中に つかえる（1つ 3こまで）</div>
          <div style={{ display: "grid", gap: 10 }}>
            {ITEMS.map(it => {
              const have = items[it.id] || 0;
              const full = have >= it.max;
              return (
                <div key={it.id} style={{ display: "flex", gap: 12, alignItems: "center", border: `2px solid ${C.ink}`, borderRadius: 14, padding: "8px 12px" }}>
                  <span style={{ fontSize: 30 }}>{it.emoji}</span>
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

        {/* B) きせかえ */}
        <div className="panel" style={{ padding: 16 }}>
          <div className="pl-display" style={{ fontSize: 19, marginBottom: 4 }}>🎀 きせかえ</div>
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 10, color: "#6B6265" }}>あいぼうの おしゃれ・バトルの ぶたい（ずっと つかえる）</div>
          <div style={{ fontWeight: 900, fontSize: 13, margin: "4px 0 6px" }}>あいぼうの かざり</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 10 }}>
            {decos.map(c => <CosmeticCard key={c.id} c={c} owned={owned.includes(c.id)} equipped={equipped.deco === c.id} coins={coins} onBuy={buyCosmetic} onToggle={toggleEquip} />)}
          </div>
          <div style={{ fontWeight: 900, fontSize: 13, margin: "12px 0 6px" }}>バトルの ぶたい</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 10 }}>
            {bgs.map(c => <CosmeticCard key={c.id} c={c} owned={owned.includes(c.id)} equipped={equipped.bg === c.id} coins={coins} onBuy={buyCosmetic} onToggle={toggleEquip} />)}
          </div>
        </div>

        <ParentGuide guide={SHOP_GUIDE} />
      </div>
    </div>
  );
}

function CosmeticCard({ c, owned, equipped, coins, onBuy, onToggle }) {
  const preview = c.type === "bg"
    ? <span style={{ display: "inline-block", width: 40, height: 26, borderRadius: 6, border: `2px solid ${C.ink}`, background: c.css, backgroundSize: "cover" }} />
    : <span style={{ fontSize: 30 }}>{c.emoji}</span>;
  return (
    <div style={{ border: `2px solid ${C.ink}`, borderRadius: 14, padding: 10, textAlign: "center", background: equipped ? "#FFF7E6" : "#fff" }}>
      <div style={{ height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>{preview}</div>
      <div style={{ fontWeight: 900, fontSize: 12, margin: "4px 0", lineHeight: 1.3 }}>{c.name}</div>
      {owned
        ? <Btn bg={equipped ? C.sun : "#fff"} onClick={() => onToggle(c)} style={{ fontSize: 12, padding: "5px 10px" }}>{equipped ? "つけてる ✓" : "つける"}</Btn>
        : <Btn bg={coins >= c.price ? C.leaf : "#fff"} onClick={() => onBuy(c)} style={{ fontSize: 12, padding: "5px 10px" }}>🪙{c.price}</Btn>}
    </div>
  );
}
