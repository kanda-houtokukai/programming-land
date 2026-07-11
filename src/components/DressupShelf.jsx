// 着せ替え棚（きみの おしゃれ）＝共通コンポーネント（b3x・2026-07-11）。
// おみせ（購入の場）とプロフィールの「きせかえ」（おみせに行かずに開く）の両方から使う。
// 購入/装備トグルのロジックはここに集約。メッセージ文言は呼び出し側が決める
// （おみせ=店員のセリフ／プロフィール=ニュートラル）ため onBought/onPoor コールバックで渡す。
import { C } from "../theme.js";
import { Btn } from "./common.jsx";
import { DRESSUP_ITEMS, baseImageFor } from "../data/dressup.js";
import { SFX } from "../sound.js";

export default function DressupShelf({ save, update, onBought, onPoor }) {
  const sound = save.settings.sound;
  const coins = save.coins || 0;
  const owned = (save.cosmetics && save.cosmetics.owned) || [];
  const dressup = save.dressup || {};

  // 買ったらすぐつける＝既存の作法踏襲。同スロットは1個まで＝上書き装備
  function buy(d) {
    if (owned.includes(d.id)) return;
    if (coins < d.acquire.price) { onPoor && onPoor(d, d.acquire.price - coins); return; }
    SFX.badge(sound);
    update(s => {
      s.coins -= d.acquire.price; s.cosmetics.owned.push(d.id); s.shopUsed = true;
      s.dressup[d.slot] = d.id;
      return s;
    });
    onBought && onBought(d);
  }
  function toggle(d) {
    SFX.tap(sound);
    update(s => { s.dressup[d.slot] = s.dressup[d.slot] === d.id ? null : d.id; return s; });
  }

  return (
    <div className="panel" style={{ padding: 16 }}>
      <div className="pl-display" style={{ fontSize: 19, marginBottom: 4 }}>🎩 きみの おしゃれ</div>
      <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 10, color: "#6B6265" }}>ぼうけんかの きせかえ（ずっと つかえる・まなびの あかし）</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 10 }}>
        {DRESSUP_ITEMS.map(d => {
          const has = owned.includes(d.id);
          const isAchievement = d.acquire.type === "achievement";
          const lockedAch = isAchievement && !has; // 実績解放は買えない＝条件を見せる（バッジの条件表示と同じ思想）
          const on = dressup[d.slot] === d.id;
          // back はベース人物切り替え＝その子の性別のリュック姿でプレビュー
          const preview = d.slot === "back"
            ? <img src={baseImageFor(save.character, d.id)} alt="" draggable="false" style={{ height: 56, width: "auto", filter: lockedAch ? "grayscale(1) opacity(.55)" : "none" }} />
            : <img src={d.img} alt="" draggable="false" style={{ width: 44, height: 44, objectFit: "contain", filter: lockedAch ? "grayscale(1) opacity(.55)" : "none" }} />;
          return (
            <div key={d.id} style={{ border: `2px solid ${C.ink}`, borderRadius: 14, padding: 10, textAlign: "center", background: on ? "#FFF7E6" : lockedAch ? "#F5F2EC" : "#fff" }}>
              <div style={{ height: 58, display: "flex", alignItems: "center", justifyContent: "center" }}>{preview}</div>
              <div style={{ fontWeight: 900, fontSize: 12, margin: "4px 0", lineHeight: 1.3 }}>{lockedAch ? "🔒 " : ""}{d.name}</div>
              <div style={{ fontWeight: 700, fontSize: 10, color: "#6B6265", minHeight: 26, lineHeight: 1.3 }}>
                {lockedAch ? d.acquire.label : d.flavor}
              </div>
              {lockedAch
                ? <span style={{ fontWeight: 800, fontSize: 11, color: "#A49E95" }}>とくべつな ごほうび</span>
                : has
                  ? <Btn bg={on ? C.sun : "#fff"} onClick={() => toggle(d)} style={{ fontSize: 12, padding: "5px 10px" }}>{on ? "つけてる ✓" : "つける"}</Btn>
                  : <Btn bg={coins >= d.acquire.price ? C.leaf : "#fff"} onClick={() => buy(d)} style={{ fontSize: 12, padding: "5px 10px" }}>🪙{d.acquire.price}</Btn>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
