// つくるスタジオ: ブロック定義18種の「純データ層」（設計正本=brushup/studio-design.md §5・§11）。
// ★このファイルは画像・DOM・React を一切 import しない（node から読める）＝
//   tools/verify-studio.mjs（みほんデータの機械検証）と将来のツール類の土台。
//   ブラウザ側はアイコンを合成した src/data/studio-blocks.js を使う（exportの形は従来どおり）。
// 幅・色のうち §11 に記載のある9種（hat/move/moveL/moveU/moveD/jump/sound/repeat/forever）は
// プロトタイプ第11版の値を変更禁止でそのまま。新規9種の幅は段階0で確定済み。

// カテゴリ色（§11の数値表。fill/縁edge/濃色文字dark）
const COL = {
  trigger: { fill: "#F2A227", edge: "#C77E0C", dark: "#8F5606" }, // きっかけ
  motion: { fill: "#3E93E8", edge: "#1F6DBE", dark: "#124E8C" },  // うごき
  looks: { fill: "#E8639C", edge: "#C13D77", dark: "#8E2456" },   // みため（C.sakura基準・段階0で承認済み）
  sound: { fill: "#7BB03B", edge: "#578B22", dark: "#365812" },   // おと
  control: { fill: "#8F7EEA", edge: "#6A57C9", dark: "#41309B" }, // せいぎょ
};

/* 各ブロック定義:
   w=幅px / label / cat（表示名）/ shape: "hat"|"c"|"body"
   pill: "n"=数値（min/max/def）| "s"=おと切替 / flat: 容器で下が平ら（ずっと=後続不可）
   §11既存9種の幅は変更禁止: hat218 / move・moveL・repeat206 / moveU・moveD・forever186 / jump178 / sound198 */
export const DEFS = {
  // きっかけ（帽子型・スタック先頭のみ・1キャラにつき各1本）
  hat: { ...COL.trigger, w: 218, label: "はたが おされたら", shape: "hat", cat: "きっかけ" },
  tap: { ...COL.trigger, w: 200, label: "タップされたら", shape: "hat", cat: "きっかけ" },
  bump: { ...COL.trigger, w: 186, label: "ぶつかったら", shape: "hat", cat: "きっかけ" },
  // うごき（青）
  move: { ...COL.motion, w: 206, label: "みぎへ すすむ", shape: "body", pill: "n", min: 1, max: 10, def: 3, cat: "うごき" },
  moveL: { ...COL.motion, w: 206, label: "ひだりへ すすむ", shape: "body", pill: "n", min: 1, max: 10, def: 3, cat: "うごき" },
  moveU: { ...COL.motion, w: 186, label: "うえへ", shape: "body", pill: "n", min: 1, max: 10, def: 3, cat: "うごき" },
  moveD: { ...COL.motion, w: 186, label: "したへ", shape: "body", pill: "n", min: 1, max: 10, def: 3, cat: "うごき" },
  spin: { ...COL.motion, w: 186, label: "まわる", shape: "body", pill: "n", min: 1, max: 3, def: 1, cat: "うごき" },
  jump: { ...COL.motion, w: 178, label: "ジャンプ", shape: "body", pill: "n", min: 1, max: 5, def: 1, cat: "うごき" },
  home: { ...COL.motion, w: 190, label: "もとのばしょへ", shape: "body", cat: "うごき" },
  // みため（ピンク）
  grow: { ...COL.looks, w: 150, label: "おおきく", shape: "body", cat: "みため" },
  shrink: { ...COL.looks, w: 150, label: "ちいさく", shape: "body", cat: "みため" },
  hide: { ...COL.looks, w: 138, label: "きえる", shape: "body", cat: "みため" },
  show: { ...COL.looks, w: 126, label: "でる", shape: "body", cat: "みため" },
  // おと（緑）
  sound: { ...COL.sound, w: 198, label: "おとを ならす", shape: "body", pill: "s", cat: "おと" },
  // せいぎょ（むらさき）
  wait: { ...COL.control, w: 172, label: "まつ", shape: "body", pill: "n", min: 1, max: 10, def: 1, cat: "せいぎょ" },
  repeat: { ...COL.control, w: 206, label: "くりかえし", shape: "c", pill: "n", min: 2, max: 10, def: 2, cat: "せいぎょ" },
  forever: { ...COL.control, w: 186, label: "ずっと", shape: "c", flat: true, cat: "せいぎょ" },
};

// たな（パレット）の並び順＝カテゴリ順（設計§5の表の順）
export const PALORDER = [
  "hat", "tap", "bump",
  "move", "moveL", "moveU", "moveD", "spin", "jump", "home",
  "grow", "shrink", "hide", "show",
  "sound",
  "wait", "repeat", "forever",
];

// おとの種類（切替式・§5）。音源は段階2まではWebAudio簡易音（Suno差し替えは段階3）
export const SOUNDS = ["ポン", "キラン", "ドン"];

// 背景IDの正本（段階2 §0-1 是正後: そうげん/ジャングル/だいち/アリーナ/スタジオ）。
// 表示名と画像は src/data/studio-bgs.js（BGS）。★ここと BGS は必ず一致させる（verify-studio が参照）
export const STUDIO_BG_IDS = ["sougen", "jungle", "canyon", "arena", "studio"];

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

// ブロック束のディープコピー（長押しコピー・作品/みほんを開くときのID振り直し用）
export function cloneBlocks(list) {
  return (list || []).map(b => {
    const c = { ...b, id: nextId++ };
    if (b.children) c.children = cloneBlocks(b.children);
    return c;
  });
}

/* ===== 保存作品の走査ヘルパー（段階3・教育接続の判定を1か所に集約） =====
   かんとくベレー（18種網羅）・そだったちから「つくる」・バッジ/マイルストーンの入れ子判定が共用する。
   works の形: [{ chars: [{ stacks: [{ blocks: [...] }] }] }]（純データ・storage の studio.works） */

// works 全体で使われたブロック type の集合
export function usedBlockTypesInWorks(works) {
  const set = new Set();
  const walk = l => { for (const b of l || []) { set.add(b.type); walk(b.children); } };
  for (const w of works || []) for (const c of w.chars || []) for (const st of c.stacks || []) walk(st.blocks);
  return set;
}

// ブロック列の中の「容器の入れ子」最大深さ（repeat/forever が容器。1=容器あり・2=容器の中の容器）
export function containerNestDepth(list) {
  let max = 0;
  for (const b of list || []) {
    if (isContainer(b.type)) max = Math.max(max, 1 + containerNestDepth(b.children));
    else if (b.children) max = Math.max(max, containerNestDepth(b.children));
  }
  return max;
}
// 1作品に「容器の中の容器」があるか（firstNest マイルストーン・いれこの たつじんバッジ）
export function workHasNestedContainer(work) {
  return (work.chars || []).some(c => (c.stacks || []).some(st => containerNestDepth(st.blocks) >= 2));
}
