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
  count: { fill: "#F6C445", edge: "#CF9A12", dark: "#8A6606" },   // かず（変数・スコア）: ゲームこうぼう段階1
  ctrlpad: { fill: "#2FB4A6", edge: "#1B8478", dark: "#0F5F55" }, // そうさ（プレイヤー操作）: 段階3。既存6色と混ざらないティール（stage3 §2-2・モック基準）
};

/* 各ブロック定義:
   w=幅px / label（みじかい名前＝棚と作業エリアの表示・palette-ui-overhaul §6 の short を流用）/
   long（ながおしふきだしの見出し）/ desc（ふきだし本文）/ cat（表示名）/ shape: "hat"|"c"|"body"
   pill: "n"=数値（min/max/def）| "s"=おと切替 | "target"=相手指定 / flat: 容器で下が平ら（ずっと=後続不可）
   §11既存9種の幅は変更禁止: hat218 / move・moveL・repeat206 / moveU・moveD・forever186 / jump178 / sound198
   （w は作業エリアのブロック幅。棚のカード幅は描画側が2列幅から算出＝palette-ui-overhaul §1） */
export const DEFS = {
  // きっかけ（帽子型・スタック先頭のみ・1キャラにつき各1本）
  hat: { ...COL.trigger, w: 218, label: "はた ▶", long: "はたが おされたら", desc: "はたを おしたら、この したの カードが うごきだすよ。スタートに つかおう。", shape: "hat", cat: "きっかけ" },
  tap: { ...COL.trigger, w: 200, label: "タップされたら", long: "タップされたら", desc: "この キャラが タップされたら、したの カードが うごくよ。", shape: "hat", cat: "きっかけ" },
  bump: { ...COL.trigger, w: 186, label: "ぶつかったら", long: "ぶつかったら", desc: "なにかに ぶつかったら、したの カードが うごくよ。", shape: "hat", cat: "きっかけ" },
  // うごき（青）
  move: { ...COL.motion, w: 206, label: "みぎへ", long: "みぎへ すすむ", desc: "みぎへ すすむよ。すすむ マスの かずは きめられる。", shape: "body", pill: "n", min: 1, max: 10, def: 3, cat: "うごき" },
  moveL: { ...COL.motion, w: 206, label: "ひだりへ", long: "ひだりへ すすむ", desc: "ひだりへ すすむよ。すすむ マスの かずは きめられる。", shape: "body", pill: "n", min: 1, max: 10, def: 3, cat: "うごき" },
  moveU: { ...COL.motion, w: 186, label: "うえへ", long: "うえへ すすむ", desc: "うえへ すすむよ。", shape: "body", pill: "n", min: 1, max: 10, def: 3, cat: "うごき" },
  moveD: { ...COL.motion, w: 186, label: "したへ", long: "したへ すすむ", desc: "したへ すすむよ。", shape: "body", pill: "n", min: 1, max: 10, def: 3, cat: "うごき" },
  spin: { ...COL.motion, w: 186, label: "まわる", long: "くるっと まわる", desc: "くるっと まわるよ。", shape: "body", pill: "n", min: 1, max: 3, def: 1, cat: "うごき" },
  jump: { ...COL.motion, w: 178, label: "ジャンプ", long: "ジャンプする", desc: "ぴょんと ジャンプするよ。", shape: "body", pill: "n", min: 1, max: 5, def: 1, cat: "うごき" },
  home: { ...COL.motion, w: 190, label: "もとのばしょ", long: "もとの ばしょへ もどる", desc: "さいしょに いた ばしょに もどるよ。やりなおしに つかおう。", shape: "body", cat: "うごき" },
  // みため（ピンク）
  grow: { ...COL.looks, w: 150, label: "おおきく", long: "からだを おおきく する", desc: "からだが おおきく なるよ。", shape: "body", cat: "みため" },
  shrink: { ...COL.looks, w: 150, label: "ちいさく", long: "からだを ちいさく する", desc: "からだが ちいさく なるよ。", shape: "body", cat: "みため" },
  hide: { ...COL.looks, w: 138, label: "きえる", long: "すがたを けす", desc: "すがたを けすよ。とられた リンゴなどに つかおう。", shape: "body", cat: "みため" },
  show: { ...COL.looks, w: 126, label: "でる", long: "すがたを だす", desc: "すがたを だすよ。きえた あとに つかうと、また あらわれる。", shape: "body", cat: "みため" },
  // おと（緑）
  sound: { ...COL.sound, w: 198, label: "おと", long: "おとを ならす", desc: "おとを ならすよ。おとは えらべる。", shape: "body", pill: "s", cat: "おと" },
  // せいぎょ（むらさき）
  wait: { ...COL.control, w: 172, label: "まつ", long: "ちょっと まつ", desc: "きめた あいだ、ちょっと まつよ。うごきの あいだを あけたい ときに。", shape: "body", pill: "n", min: 1, max: 10, def: 1, cat: "せいぎょ" },
  repeat: { ...COL.control, w: 206, label: "くりかえし", long: "きめた かいすう くりかえす", desc: "なかに いれた カードを、きめた かいすう くりかえすよ。", shape: "c", pill: "n", min: 2, max: 10, def: 2, cat: "せいぎょ" },
  forever: { ...COL.control, w: 186, label: "ずっと", long: "ずっと くりかえす", desc: "なかに いれた カードを、ゲームが おわるまで ずっと くりかえすよ。てきを うごかす ときは これ。", shape: "c", flat: true, cat: "せいぎょ" },
  // かず（ゲームこうぼう段階1・gamelab-implementation-stage1.md §3）。スタジオのパレット（PALORDER）には出ない
  scoreUp: { ...COL.count, w: 206, label: "スコア ＋", long: "スコアを ふやす", desc: "スコアを ふやすよ。ふえる かずは じぶんで きめられる。", shape: "body", pill: "n", min: 1, max: 5, def: 1, cat: "かず" },
  scoreDown: { ...COL.count, w: 206, label: "スコア －", long: "スコアを へらす", desc: "スコアを へらすよ。へる かずは じぶんで きめられる。", shape: "body", pill: "n", min: 1, max: 5, def: 1, cat: "かず" },
  // ゲームこうぼう段階2（stage2 §A-1・gamelab専用＝GAMELAB_PALORDER のみ）
  moveRand: { ...COL.motion, w: 206, label: "ランダム", long: "ランダムに うごく", desc: "あちこち ばらばらに うごくよ。てきに つかうと よけゲームに なる。", shape: "body", cat: "うごき" },
  bounce: { ...COL.motion, w: 186, label: "はねかえる", long: "はねかえる", desc: "まっすぐ すすんで、はしに あたると はねかえるよ。うごきが よめるので よけやすい てきに なる。", shape: "body", cat: "うごき" },
  bumpTarget: { ...COL.trigger, w: 210, label: "ぶつかったら", long: "ぶつかったら（あいてを えらぶ）", desc: "えらんだ あいてに ぶつかったら、したの カードが うごくよ。てんを いれたり、まけに したり できる。", shape: "hat", pill: "target", cat: "きっかけ" },
  // ゲームこうぼう段階3・そうさ（プレイヤー操作）。gamelab専用＝GAMELAB_PALORDER のみ。studio には出ない
  // ★ラベルは b6a のカード縮小に合わせ6文字以内（棚のフォント下限12px・stage3-addendum §3）。意味は long/desc が担う
  dpad: { ...COL.ctrlpad, w: 206, label: "じゅうじキー", long: "じゅうじキーで うごかす", desc: "これを おくと、あそぶ とき がめんの したに じゅうじキーが でて、この キャラを じぶんで うごかせるよ。", shape: "body", cat: "そうさ" },
  tapMove: { ...COL.ctrlpad, w: 206, label: "タップいどう", long: "タップした ところへ すすむ", desc: "がめんを タップした ところへ、この キャラが すすんで いくよ。ついたら とまる。", shape: "body", cat: "そうさ" },
  // ゲームこうぼう段階3 区切り②（うごき・青）。w は既存値を再利用（geometry.paths を増やさない）
  chase: { ...COL.motion, w: 206, label: "おいかける", long: "おいかける", desc: "えらんだ あいてに、1ぱくごとに 1マスずつ ちかづくよ。おにごっこに つかおう。", shape: "body", pill: "target", cat: "うごき" },
  fall: { ...COL.motion, w: 206, label: "ふってくる", long: "ふってくる", desc: "うえから でてきて、したへ おちて いくよ。したまで いくと また うえから でてくる。おちものゲームに。", shape: "body", cat: "うごき" },
  // ゲームこうぼう段階3 区切り②（きっかけ・橙）。挙動は bumpTarget と共通（相手に重なったら発火）だが「たどりつく」用途の別カード（指示書§1-1）
  goal: { ...COL.trigger, w: 210, label: "ゴール", long: "ゴールに ついたら", desc: "ここに たどりついたら クリア！ めいろの ゴールに つかおう。あいてを えらんでね。", shape: "hat", pill: "target", cat: "きっかけ" },
};

// たな（パレット）の並び順＝カテゴリ順（設計§5の表の順）
export const PALORDER = [
  "hat", "tap", "bump",
  "move", "moveL", "moveU", "moveD", "spin", "jump", "home",
  "grow", "shrink", "hide", "show",
  "sound",
  "wait", "repeat", "forever",
];

// ゲームこうぼうのパレット構成（palette-ui-overhaul §4: ゲームで使う頻度順＝
// きっかけ→（そうさ=stage3で挿入）→かず→せいぎょ→うごき→みため→おと。うごき内はゲーム用カードを先頭に）
export const GAMELAB_PALORDER = [
  "hat", "tap", "bump", "bumpTarget", "goal",
  "dpad", "tapMove",
  "scoreUp", "scoreDown",
  "wait", "repeat", "forever",
  "moveRand", "bounce", "chase", "fall", "move", "moveL", "moveU", "moveD", "spin", "jump", "home",
  "grow", "shrink", "hide", "show",
  "sound",
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
  if (d.pill === "target") b.target = "any"; // stage2: 相手指定ぶつかり（既定=だれか）
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
