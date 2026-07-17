// つくるスタジオ: ブロック定義18種（設計正本=brushup/studio-design.md §5・§11）。
// ★新カード追加＝このファイルに足すだけで済む形に（第2期の器・設計§12）。
// 幅・色のうち §11 に記載のある9種（hat/move/moveL/moveU/moveD/jump/sound/repeat/forever）は
// プロトタイプ第11版の値を変更禁止でそのまま。新規9種の幅はラベル長から同じ作法で選定（実測目視で確定）。
// みため（ピンク系）は§11の指示「実装時に既存パレットから選定」により C.sakura(#FF8FAB) を基準に
// 他カテゴリと同じ明度段階（fill→edge→dark）で作成。
import iconHata from "../assets/studio-assets/card_icon_01_hata.png";
import iconTap from "../assets/studio-assets/card_icon_02_tap.png";
import iconButsukatta from "../assets/studio-assets/card_icon_03_butsukatta.png";
import iconMigi from "../assets/studio-assets/card_icon_04_migi.png";
import iconHidari from "../assets/studio-assets/card_icon_05_hidari.png";
import iconUe from "../assets/studio-assets/card_icon_06_ue.png";
import iconShita from "../assets/studio-assets/card_icon_07_shita.png";
import iconMawaru from "../assets/studio-assets/card_icon_08_mawaru.png";
import iconJump from "../assets/studio-assets/card_icon_09_jump.png";
import iconMotono from "../assets/studio-assets/card_icon_10_motono.png";
import iconOokiku from "../assets/studio-assets/card_icon_11_ookiku.png";
import iconChiisaku from "../assets/studio-assets/card_icon_12_chiisaku.png";
import iconKieru from "../assets/studio-assets/card_icon_13_kieru.png";
import iconDeru from "../assets/studio-assets/card_icon_14_deru.png";
import iconOto from "../assets/studio-assets/card_icon_15_oto.png";
import iconMatsu from "../assets/studio-assets/card_icon_16_matsu.png";
import iconKurikaeshi from "../assets/studio-assets/card_icon_17_kurikaeshi.png";
import iconZutto from "../assets/studio-assets/card_icon_18_zutto.png";

// カテゴリ色（§11の数値表。fill/縁edge/濃色文字dark）
const COL = {
  trigger: { fill: "#F2A227", edge: "#C77E0C", dark: "#8F5606" }, // きっかけ
  motion: { fill: "#3E93E8", edge: "#1F6DBE", dark: "#124E8C" },  // うごき
  looks: { fill: "#E8639C", edge: "#C13D77", dark: "#8E2456" },   // みため（C.sakura基準・他カテゴリと同じ段階で選定）
  sound: { fill: "#7BB03B", edge: "#578B22", dark: "#365812" },   // おと
  control: { fill: "#8F7EEA", edge: "#6A57C9", dark: "#41309B" }, // せいぎょ
};

/* 各ブロック定義:
   w=幅px / label / cat（表示名）/ shape: "hat"|"c"|"body" / icon
   pill: "n"=数値（min/max）| "s"=おと切替 / flat: 容器で下が平ら（ずっと=後続不可）
   §11既存9種の幅は変更禁止: hat218 / move・moveL・repeat206 / moveU・moveD・forever186 / jump178 / sound198 */
export const DEFS = {
  // きっかけ（帽子型・スタック先頭のみ・1キャラにつき各1本）
  hat: { ...COL.trigger, w: 218, label: "はたが おされたら", shape: "hat", cat: "きっかけ", icon: iconHata },
  tap: { ...COL.trigger, w: 200, label: "タップされたら", shape: "hat", cat: "きっかけ", icon: iconTap },
  bump: { ...COL.trigger, w: 186, label: "ぶつかったら", shape: "hat", cat: "きっかけ", icon: iconButsukatta },
  // うごき（青）
  move: { ...COL.motion, w: 206, label: "みぎへ すすむ", shape: "body", pill: "n", min: 1, max: 10, def: 3, cat: "うごき", icon: iconMigi },
  moveL: { ...COL.motion, w: 206, label: "ひだりへ すすむ", shape: "body", pill: "n", min: 1, max: 10, def: 3, cat: "うごき", icon: iconHidari },
  moveU: { ...COL.motion, w: 186, label: "うえへ", shape: "body", pill: "n", min: 1, max: 10, def: 3, cat: "うごき", icon: iconUe },
  moveD: { ...COL.motion, w: 186, label: "したへ", shape: "body", pill: "n", min: 1, max: 10, def: 3, cat: "うごき", icon: iconShita },
  spin: { ...COL.motion, w: 186, label: "まわる", shape: "body", pill: "n", min: 1, max: 3, def: 1, cat: "うごき", icon: iconMawaru },
  jump: { ...COL.motion, w: 178, label: "ジャンプ", shape: "body", pill: "n", min: 1, max: 5, def: 1, cat: "うごき", icon: iconJump },
  home: { ...COL.motion, w: 190, label: "もとのばしょへ", shape: "body", cat: "うごき", icon: iconMotono },
  // みため（ピンク）
  grow: { ...COL.looks, w: 150, label: "おおきく", shape: "body", cat: "みため", icon: iconOokiku },
  shrink: { ...COL.looks, w: 150, label: "ちいさく", shape: "body", cat: "みため", icon: iconChiisaku },
  hide: { ...COL.looks, w: 138, label: "きえる", shape: "body", cat: "みため", icon: iconKieru },
  show: { ...COL.looks, w: 126, label: "でる", shape: "body", cat: "みため", icon: iconDeru },
  // おと（緑）
  sound: { ...COL.sound, w: 198, label: "おとを ならす", shape: "body", pill: "s", cat: "おと", icon: iconOto },
  // せいぎょ（むらさき）
  wait: { ...COL.control, w: 172, label: "まつ", shape: "body", pill: "n", min: 1, max: 10, def: 1, cat: "せいぎょ", icon: iconMatsu },
  repeat: { ...COL.control, w: 206, label: "くりかえし", shape: "c", pill: "n", min: 2, max: 10, def: 2, cat: "せいぎょ", icon: iconKurikaeshi },
  forever: { ...COL.control, w: 186, label: "ずっと", shape: "c", flat: true, cat: "せいぎょ", icon: iconZutto },
};

// たな（パレット）の並び順＝カテゴリ順（設計§5の表の順）
export const PALORDER = [
  "hat", "tap", "bump",
  "move", "moveL", "moveU", "moveD", "spin", "jump", "home",
  "grow", "shrink", "hide", "show",
  "sound",
  "wait", "repeat", "forever",
];

// おとの種類（切替式・§5）。音源は段階1まではWebAudio簡易音（プロトタイプ準拠・Suno差し替えは段階3）
export const SOUNDS = ["ポン", "キラン", "ドン"];

// 型ヘルパー
export const isTrigger = t => DEFS[t] && DEFS[t].shape === "hat";
export const isContainer = t => DEFS[t] && DEFS[t].shape === "c";

// 新規ブロックのデータを作る（パレットから掴んだときの初期値）
let nextId = 1;
export function makeBlock(type) {
  const d = DEFS[type];
  const b = { id: nextId++, type };
  if (d.pill === "n") b.n = d.def;
  if (d.pill === "s") b.s = 0;
  if (d.shape === "c") b.children = [];
  return b;
}

// draft/作品を読み込んだとき、保存済みIDと新規IDが衝突しないよう採番を進める（段階1）
export function claimBlockIds(list) {
  const walk = l => { for (const b of l || []) { if (b.id >= nextId) nextId = b.id + 1; walk(b.children); } };
  walk(list);
}

// ブロック束のディープコピー（長押しコピー用・IDは振り直す）
export function cloneBlocks(list) {
  return (list || []).map(b => {
    const c = { ...b, id: nextId++ };
    if (b.children) c.children = cloneBlocks(b.children);
    return c;
  });
}
