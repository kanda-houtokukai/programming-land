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

/* ============ ゲームこうぼうの「床」（brushup/stage-floor.md §3） ============
   ★ゲームの背景は「読むもの」＝どこに立てるかを絵が答えなければならない。
   そうげん等の絵は地平線が theater の上から42.2%にあり、12×8のマス目は高さの84〜91%を
   占めるため、y=5〜7 の3行が空の中に入る（＝そこに立つと浮く）。そこで gamelab だけ
   遠近を持たないフラットな床に差し替える。★studio は「書き割り＝見るもの」なので絵のまま。

   ★画像は1枚も作らない・差し替えない（§3-4）。色とごく薄い模様だけで作る。
   ★「物」（岩・花・木）は描かない（§3-3）。ぶつかり判定のあるゲームでは障害物に見えるため。
   ★名前・id・ショップ商品は不変（§3-1）。ここで足すのは見た目だけ。 */
const FLOOR_TABLE = {
  sougen: { base: "#8cc152", tex: "grass", a: "rgba(255,255,255,.22)", b: "rgba(74,116,32,.20)" },
  jungle: { base: "#3f8b5c", tex: "grass", a: "rgba(255,255,255,.16)", b: "rgba(20,70,44,.24)" },
  // ★だいち は「赤茶」。スタジオ（木の茶）と swatch サイズで紛らわしかったので、
  //   色をより赤へ寄せ、模様も縞→まだら（rock）にして質感から見分けられるようにした
  canyon: { base: "#b45c33", tex: "rock", a: "rgba(255,228,200,.15)", b: "rgba(114,48,20,.24)" },
  arena:  { base: "#d8b884", tex: "sand",   a: "rgba(255,250,240,.24)", b: "rgba(150,113,66,.18)" },
  studio: { base: "#a87c4a", tex: "plank",  a: "rgba(255,240,220,.13)", b: "rgba(100,66,32,.26)" },
};

/* 床の模様（§3-3: 縞・格子・微細なテクスチャまで）。
   サイズは % 指定＝ステージでもサムネでも同じ見た目になる（px だと縮小時に別物になる）。 */
const TEX = {
  grass:  f => ({ image: `radial-gradient(circle at 30% 28%, ${f.b} 0 1.4px, transparent 1.6px),
                          radial-gradient(circle at 72% 66%, ${f.a} 0 1.4px, transparent 1.6px)`,
                  size: "8.33% 12.5%, 8.33% 12.5%" }),
  // まだらの岩肌。大きさの違う斑を2枚ずらして重ねる＝縞（スタジオの板）と質感で区別できる
  rock:   f => ({ image: `radial-gradient(ellipse at 32% 40%, ${f.b} 0 22%, transparent 26%),
                          radial-gradient(ellipse at 74% 68%, ${f.a} 0 17%, transparent 21%)`,
                  size: "16.7% 25%, 25% 33.3%" }),
  sand:   f => ({ image: `repeating-linear-gradient(28deg, ${f.a} 0 1px, transparent 1px 5px),
                          repeating-linear-gradient(-28deg, ${f.b} 0 1px, transparent 1px 9px)`,
                  size: "auto, auto" }),
  plank:  f => ({ image: `repeating-linear-gradient(0deg, ${f.b} 0 1px, transparent 1px 12.5%),
                          repeating-linear-gradient(0deg, ${f.a} 0 1px, transparent 1px 6.25%)`,
                  size: "auto, auto" }),
};

/* ★床の見た目の唯一の入口（§2-1）。ステージ・ぶたい選択・作品サムネの3箇所すべてがここを呼ぶ
   ＝ id と色の対応が3箇所でずれる余地を作らない。React の style オブジェクトを返す。 */
export function floorStyle(id) {
  const f = FLOOR_TABLE[id] || FLOOR_TABLE.sougen;
  const t = TEX[f.tex](f);
  return { backgroundColor: f.base, backgroundImage: t.image, backgroundSize: t.size };
}

// ★BGS の形は不変（id/name/img のまま）＝床は floorStyle(id) 経由でだけ引く。
//   BGS に floor を生やすと「宣言より前に参照して TDZ で画面が真っ黒」（落とし穴#8）を
//   踏みやすく、node の verify では拾えない。実際この実装で一度踏んだので形を分けた。
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
