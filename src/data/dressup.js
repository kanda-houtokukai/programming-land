// 主人公（探検家）の見た目の集約（第3波・置き換え指示書§A/§B・dressup_system_design.md準拠）。
// ★キャラクター/着せ替えのデータはここに集約★
// - character: "boy" | "girl"（ゲーム開始時に選択・以後変更しない）
// - back スロットだけはレイヤー合成でなく「ベース人物ごと切り替え」（6体・リュックは装着後の見た目差が大きいため）
// - head/face/neck/chest/waist の5スロットはレイヤー合成（段階③で実装・アンカーは dressup_anchor_update_adventure.md の実測値）
import boyAdventure from "../assets/player_boy_adventure.png";
import boyBackpackKeyboard from "../assets/player_boy_backpack_keyboard.png";
import boyBackpackBook from "../assets/player_boy_backpack_book.png";
import girlAdventure from "../assets/player_girl_adventure.png";
import girlBackpackKeyboard from "../assets/player_girl_backpack_keyboard.png";
import girlBackpackBook from "../assets/player_girl_backpack_book.png";

// キャラクター選択肢（作成時・既存プロファイルの移行時に使う）
export const CHARACTERS = [
  { id: "boy", name: "ぼうけんの おとこのこ", img: boyAdventure },
  { id: "girl", name: "ぼうけんの おんなのこ", img: girlAdventure },
];

// ベース人物6体: character × back装備 で切り替え（backなし=adventure）
// キャンバス1086×1448・頭頂≈5.9%・足元≈95.6%・中心x≈50%（6体とも統一済み）
const BASES = {
  boy: { none: boyAdventure, back_keyboard: boyBackpackKeyboard, back_book: boyBackpackBook },
  girl: { none: girlAdventure, back_keyboard: girlBackpackKeyboard, back_book: girlBackpackBook },
};

// character と back装備ID（null可）からベース画像を返す
export function baseImageFor(character, backId) {
  const set = BASES[character] || BASES.boy;
  return set[backId] || set.none;
}

// スロット定義（zオーダー: 奥→手前）。back はベース切り替えのため合成対象外
export const SLOTS = ["waist", "chest", "neck", "face", "head"];

// 空の装備（セーブの dressup 初期値・storage.js と一致させる）
export const EMPTY_DRESSUP = { head: null, face: null, neck: null, chest: null, waist: null, back: null };

// ============ 着せ替えアイテム（第3波②・8種6スロット） ============
// anchor は基準キャンバス(1086×1448)への実測px（dressup_anchor_update_adventure.md）を%換算した初期値。
// top=上端%・left=中心%・width=幅%（キャンバス幅基準）。実機で微調整する前提（座標運用いつもどおり）。
// acquire.type: "shop"=コイン購入 / "achievement"=実績解放（判定・付与は段階③）。価格は仮＝実機で調整（データ集約）。
// skillTie は そだったちから(powers.js)のIDに対応＝「学びの証」の見せ方用。
import headCompassHat from "../assets/head_compass_hat.png";
import headHakaseHat from "../assets/head_hakase_hat.png";
import headCrown from "../assets/head_crown.png";
import faceExplorerGlasses from "../assets/face_explorer_glasses.png";
import neckExplorerBandana from "../assets/neck_explorer_bandana.png";
import chestGearBadge from "../assets/chest_gear_badge.png";
import chestMagnifyingBadge from "../assets/chest_magnifying_badge.png";
import waistToolBelt from "../assets/waist_tool_belt.png";
import headKantokuBeret from "../assets/head_kantoku_beret.png";

export const DRESSUP_ITEMS = [
  { id: "head_compass", slot: "head", name: "コンパスぼうし", skillTie: "junji", img: headCompassHat,
    anchor: { top: 1.6, left: 50, width: 31.3 }, // 実機FBで3.8→1.6（深めで額が隠れ気味→上へ・2026-07-08）
    acquire: { type: "shop", price: 55 },
    flavor: "じゅんばんの ちからを みにつけた たんけんかの ぼうし" },
  { id: "head_hakase", slot: "head", name: "はかせぼうし", skillTie: null, img: headHakaseHat,
    anchor: { top: 1.6, left: 50, width: 31.3 }, // コンパスぼうしと同一シルエット＝必ず同値で揃える
    acquire: { type: "achievement", condition: "all_puzzles_clear", label: "パズルを ぜんぶ クリアすると もらえる" },
    flavor: "ぜんぶの パズルを といた はかせの あかし" },
  { id: "head_crown", slot: "head", name: "おうかん", skillTie: null, img: headCrown,
    anchor: { top: 4.1, left: 50, width: 25.8 }, acquire: { type: "achievement", condition: "all_badges", label: "バッジを ぜんぶ あつめると もらえる" },
    flavor: "しまの だいぼうけんを なしとげた あかし" },
  { id: "face_glasses", slot: "face", name: "たんけんメガネ", skillTie: null, img: faceExplorerGlasses,
    anchor: { top: 16.5, left: 50, width: 23.9 }, // 実機FBで20.4→16.5（鼻〜口に落ちていたのを目の高さへ・2026-07-07）
    acquire: { type: "shop", price: 40 },
    flavor: "よーく みる ちからが そだつ メガネ" },
  { id: "neck_bandana", slot: "neck", name: "たんけんバンダナ", skillTie: null, img: neckExplorerBandana,
    anchor: { top: 31.8, left: 50, width: 20.3 }, acquire: { type: "shop", price: 40 },
    flavor: "ぼうけんの こころいきを しめす バンダナ" },
  { id: "chest_gear", slot: "chest", name: "はぐるまバッジ", skillTie: "repeat", img: chestGearBadge,
    anchor: { top: 40.5, left: 38.7, width: 8.5 }, acquire: { type: "shop", price: 55 },
    flavor: "くりかえしの ちからを みにつけた しるし" },
  { id: "chest_magnifier", slot: "chest", name: "むしめがねバッジ", skillTie: "think", img: chestMagnifyingBadge,
    anchor: { top: 40.5, left: 38.7, width: 8.5 }, acquire: { type: "shop", price: 55 },
    flavor: "「もしも」で かんがえる ちからの しるし" },
  { id: "waist_belt", slot: "waist", name: "どうぐベルト", skillTie: null, img: waistToolBelt,
    anchor: { top: 50.0, left: 50, width: 23.9 }, // 実機FBで52.5→50.0（少し低かった→上へ・2026-07-08）
    acquire: { type: "shop", price: 70 },
    flavor: "こまったとき なおす どうぐが つまった ベルト" },
  { id: "head_kantoku", slot: "head", name: "かんとくベレー", skillTie: "create",
    img: headKantokuBeret,  // src/assets/head_kantoku_beret.png（Chat支給・512×512・描画433x281）
    // ★初期値（2026-07-17 Chatが主人公へ実合成して決定・神田さん承認済み）:
    //   帽子系(top:1.6/width:31.3)では小さすぎたため 1.55倍に拡大し、つばの下端 19.98% は同じ位置に固定。
    //   top が負なのは正常（画像の箱が上へ出るだけ・ベレーの絵自体は上端+0.08%でキャンバス内に収まる）。
    //   これが下端固定で収まる上限（1.7倍は絵が上に1.84%はみ出すため不採用）。実機FBで調整可。
    anchor: { top: -8.52, left: 50, width: 48.52 },
    acquire: { type: "achievement", condition: "studio_all_cards",
               label: "つくるスタジオで 18しゅるいの カードを ぜんぶ つかうと もらえる" },
    flavor: "18まいの カードを つかいこなした かんとくの あかし" },
  // back はレイヤーでなくベース人物ごと切り替え（BASES）＝anchor なし
  { id: "back_keyboard", slot: "back", name: "キーボードリュック", skillTie: "keyboard", img: null,
    anchor: null, acquire: { type: "shop", price: 120 },
    flavor: "タイピングの ちからを せおう リュック" },
  { id: "back_book", slot: "back", name: "まほうのほんリュック", skillTie: "think", img: null,
    anchor: null, acquire: { type: "shop", price: 120 },
    flavor: "クイズの ちしきが つまった まほうの ほん" },
];
export function dressupById(id) { return DRESSUP_ITEMS.find(d => d.id === id); }
// ショップで買えるもの（achievement は買えない＝棚にはロック表示で条件を見せる）
export const SHOP_DRESSUP = DRESSUP_ITEMS.filter(d => d.acquire.type === "shop");

// ============ 実績解放（段階③） ============
// 条件を満たした achievement アイテムを自動で「てにいれる」（装備は自分でつける）。
// 判定は App.update のバッジ判定と同じタイミングで呼ぶ。条件の実体はここに集約。
import { STAGES } from "./stages.js";
import { BADGES } from "./badges.js";
import { DEFS as STUDIO_DEFS, usedBlockTypesInWorks } from "./studio-blocks-defs.js";
const ACHIEVEMENT_CHECKS = {
  // はかせぼうし: 全パズル制覇（全162面クリア＝★1以上）
  all_puzzles_clear: save => STAGES.every(st => (save.puzzle.stars[st.id] || 0) > 0),
  // おうかん: 大きな節目＝バッジを全部あつめる
  all_badges: save => BADGES.every(b => save.badges.includes(b.id)),
  // かんとくベレー: 保存済み works 全体で18種のカードをすべて使った＝学習範囲一巡の証（段階3・設計§8）
  studio_all_cards: save => {
    const used = usedBlockTypesInWorks((save.studio && save.studio.works) || []);
    return Object.keys(STUDIO_DEFS).every(t => used.has(t));
  },
};
// 未所持で条件を満たした achievement アイテムの配列を返す（付与は呼び出し側で）
export function checkAchievementUnlocks(save) {
  const owned = (save.cosmetics && save.cosmetics.owned) || [];
  return DRESSUP_ITEMS.filter(d =>
    d.acquire.type === "achievement" && !owned.includes(d.id) &&
    ACHIEVEMENT_CHECKS[d.acquire.condition] && ACHIEVEMENT_CHECKS[d.acquire.condition](save));
}
