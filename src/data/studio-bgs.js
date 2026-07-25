// つくるスタジオ: 背景（ぶたい）5種の正本（段階2 §0-1 で名前衝突を是正）。
// ★同じ絵は全画面で同じ名前（ショップの既存命名が正）:
//   bg_battle_easy=そうげん ／ bg_battle_canyon=だいち（ショップ「だいちの ぶたい」と一致）。
// IDの一覧は studio-blocks-defs.js の STUDIO_BG_IDS（node安全・verify-studio が参照）と一致させる。
// 追加はこの表＋STUDIO_BG_IDSに1行ずつ。
import { STUDIO_BG_IDS } from "./studio-blocks-defs.js";
import bgSougen from "../assets/bg_battle_easy.webp";
import bgJungle from "../assets/bg_battle_jungle.webp";
import bgDaichi from "../assets/bg_battle_canyon.webp";
import bgArena from "../assets/battle-arena.webp";
import bgStudio from "../assets/studio-assets/studio-interior.webp";

const BG_TABLE = {
  sougen: { name: "そうげん", img: bgSougen },
  jungle: { name: "ジャングル", img: bgJungle },
  canyon: { name: "だいち", img: bgDaichi }, // id は canyon のまま・名前のみ是正（§0-1）
  arena: { name: "アリーナ", img: bgArena },
  studio: { name: "スタジオ", img: bgStudio },
};

export const BGS = STUDIO_BG_IDS.map(id => ({ id, ...BG_TABLE[id] }));
export const bgById = id => BGS.find(b => b.id === id) || BGS[0]; // 未知idはフォールバック（draft互換）

/* ============ ショップ連動（実機FB便B §1） ============
   ぶたい5種のうち、おみせで売っているのは2種だけ（COSMETICS・data/battle.js）。
   売り物が無い3種（そうげん/アリーナ/スタジオ）は常に選べる＝隠すと選択肢がゼロになりうる。
   ★所持で絞るのは「選択欄」だけ。保存済み作品の表示・サムネ・みほんは従来どおり（§1-3）。 */
const BG_SHOP_ITEM = { jungle: "bg_jungle", canyon: "bg_canyon" }; // ここに無い id は常時開放

/* 選択欄に出す ぶたい の一覧。
   = 常時開放3種 ＋ 購入済み ＋ ★keepId（未所持でも必ず出す＝§1-3 の救済）。
   keepId には「その作品を開いたときの ぶたい」を渡す（＝現在の選択ではない）。
   現在の選択で絞ると、未所持の背景から別の背景へ切り替えた瞬間に元の選択肢が消えて戻れなくなるため。
   bgs は呼び出し側（mode.bgs）から渡す＝モード注入の形を崩さない。並びは渡された順を保つ。 */
export function availableBgs(bgs, profile, keepId) {
  const owned = (profile && profile.cosmetics && profile.cosmetics.owned) || [];
  return (bgs || BGS).filter(b => {
    const item = BG_SHOP_ITEM[b.id];
    return !item || owned.includes(item) || b.id === keepId;
  });
}
