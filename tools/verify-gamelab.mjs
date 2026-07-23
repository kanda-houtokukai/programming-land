/* ゲームこうぼう: みほんデータの機械検証（段階1・gamelab-implementation-stage1.md §10）。
   verify-studio.mjs 相当＋gameConfig の妥当性検証。npm run verify のチェーンに入り、FAILすると deploy が走らない。
   検証対象: src/data/gamelab-samples.js（純データ）。
   実行: node tools/verify-gamelab.mjs */

import { SAMPLES } from "../src/data/gamelab-samples.js";
import { DEFS, SOUNDS, STUDIO_BG_IDS, GAMELAB_PALORDER, isTrigger, isContainer } from "../src/data/studio-blocks-defs.js";
import { createEngine, LCOLS, LROWS } from "../src/workshop/engine.js";

const GL_SET = new Set(GAMELAB_PALORDER); // stage3-step3 §3-4: みほんのカードは gamelab のこうぐだなに実在すること
// 作品内で使われている全ブロック type を集める（クリア条件との噛み合い検証用）
function typesUsed(chars) {
  const set = new Set();
  const walk = l => { for (const b of l || []) { set.add(b.type); walk(b.children); } };
  for (const c of chars || []) for (const st of c.stacks || []) walk(st.blocks);
  return set;
}

let fail = 0;
const ng = msg => { console.log(`✗ FAIL ${msg}`); fail++; };

// 安全なキャラ＝buildCast の最低保証（どの子のずかんでも必ず出せる）
const SAFE_KINDS = [
  { type: "player" },
  { type: "mon", id: "mori", stage: 1 },
  { type: "enemy", id: "slime" },
  { type: "enemy", id: "mushroom" },
];
const kindKey = k => JSON.stringify([k.type, k.id || "", k.stage || ""]);
const SAFE_SET = new Set(SAFE_KINDS.map(kindKey));

const MAX_CHARS = 5, STACK_MAX = 30, MAXDEPTH = 2;
const CLEAR_TYPES = ["score", "time", "none"]; // enum は段階2まで込みで予約（段階1のみほんは "score" のみ）

function countBlocks(list) { return (list || []).reduce((a, b) => a + 1 + (b.children ? countBlocks(b.children) : 0), 0); }

function walkList(list, depth, where, charCount) {
  list.forEach((b, i) => {
    const d = DEFS[b.type];
    if (!d) { ng(`${where}: 未知のブロック type="${b.type}"`); return; }
    if (!GL_SET.has(b.type)) ng(`${where}: 「${d.label}」(${b.type}) が GAMELAB_PALORDER に無い＝gamelab の棚に出ないカードをみほんが使っている（§3-4）`);
    if (depth > 0 || i > 0) {
      if (isTrigger(b.type)) ng(`${where}: きっかけ「${d.label}」がスタック先頭以外にある`);
    }
    if (d.pill === "n") {
      if (typeof b.n !== "number" || b.n < d.min || b.n > d.max) ng(`${where}: 「${d.label}」の n=${b.n} が範囲外（${d.min}..${d.max}）`);
    }
    if (d.pill === "s") {
      if (typeof b.s !== "number" || b.s < 0 || b.s >= SOUNDS.length) ng(`${where}: 「${d.label}」の s=${b.s} が範囲外`);
    }
    if (d.pill === "target") { // stage2: 相手指定ぶつかり＝any か 実在キャラ
      if (b.target !== "any" && !cidExists(b.target, charCount)) ng(`${where}: 「${d.label}」の target="${b.target}" が any でも実在キャラでもない`);
    }
    if (isContainer(b.type)) {
      if (!Array.isArray(b.children)) ng(`${where}: 容器「${d.label}」に children 配列がない`);
      else {
        if (depth + 1 > MAXDEPTH) ng(`${where}: 入れ子深さが${MAXDEPTH}を超えている`);
        walkList(b.children, depth + 1, `${where}>「${d.label}」`, charCount);
      }
    } else if (b.children) ng(`${where}: 容器でない「${d.label}」が children を持つ`);
    if (d.flat && i !== list.length - 1) ng(`${where}: 「${d.label}」（ずっと）がリスト末尾以外にある`);
  });
}

// gameConfig の妥当性（stage1 §10＋stage2: score=5〜50の5刻み／time=10〜60の10刻み／gameOver=null か 実在キャラの {targetId}）
function checkGameConfig(g, W, charCount) {
  if (!g || typeof g !== "object") { ng(`${W}: gameConfig がない`); return; }
  if (typeof g.scoreShow !== "boolean") ng(`${W}: gameConfig.scoreShow が bool でない（${g.scoreShow}）`);
  if (!g.clear || !CLEAR_TYPES.includes(g.clear.type)) ng(`${W}: gameConfig.clear.type="${g.clear && g.clear.type}" が許容集合（${CLEAR_TYPES.join("/")}）の外`);
  else if (g.clear.type === "score") {
    const p = g.clear.param;
    if (typeof p !== "number" || p < 5 || p > 50 || p % 5 !== 0) ng(`${W}: clear.param=${p} が 5〜50 の5刻みでない`);
  } else if (g.clear.type === "time") {
    const p = g.clear.param;
    if (typeof p !== "number" || p < 10 || p > 60 || p % 10 !== 0) ng(`${W}: clear.param=${p} が 10〜60 の10刻みでない`);
  }
  if (g.gameOver !== null) {
    if (!g.gameOver || typeof g.gameOver !== "object") ng(`${W}: gameOver が null でもオブジェクトでもない`);
    else if (!cidExists(g.gameOver.targetId, charCount)) ng(`${W}: gameOver.targetId="${g.gameOver.targetId}" が実在キャラ（c1..c${charCount}）でない`);
  }
}
// cid は loadScene の採番規則「配列順で c1, c2, …」
const cidExists = (cid, charCount) => {
  const m = /^c(\d+)$/.exec(cid || "");
  return !!m && +m[1] >= 1 && +m[1] <= charCount;
};

const ids = new Set();
for (const s of SAMPLES) {
  const W = `みほん「${s.id}」`;
  if (ids.has(s.id)) ng(`${W}: id が重複`);
  ids.add(s.id);
  if (!s.name) ng(`${W}: name がない`);
  if (!STUDIO_BG_IDS.includes(s.bg)) ng(`${W}: bg="${s.bg}" が BGS に実在しない`);
  checkGameConfig(s.gameConfig, W, (s.chars || []).length);
  // stage3-step3 §3-4: クリア条件と作品の内容が噛み合っているか（クリア=スコアなのに得点手段が無い、を防ぐ）
  if (s.gameConfig && s.gameConfig.clear && s.gameConfig.clear.type === "score") {
    const used = typesUsed(s.chars);
    if (!used.has("scoreUp")) ng(`${W}: クリア=スコアなのに「スコア ＋」が作品内に無い（得点手段が無くクリア不能）`);
  }
  if (!Array.isArray(s.chars) || !s.chars.length || s.chars.length > MAX_CHARS) {
    ng(`${W}: キャラ数 ${s.chars && s.chars.length} が 1..${MAX_CHARS} の外`);
    continue;
  }
  s.chars.forEach((c, ci) => {
    const CW = `${W} キャラ${ci + 1}`;
    if (!SAFE_SET.has(kindKey(c.kind || {}))) ng(`${CW}: kind が最低保証4種の外（${JSON.stringify(c.kind)}）`);
    if (!Number.isInteger(c.x) || c.x < 0 || c.x >= LCOLS) ng(`${CW}: x=${c.x} が範囲外`);
    if (!Number.isInteger(c.y) || c.y < 0 || c.y >= LROWS) ng(`${CW}: y=${c.y} が範囲外`);
    const seenTrigger = new Set();
    (c.stacks || []).forEach((st, si) => {
      const SW = `${CW} スタック${si + 1}`;
      const head = st.blocks && st.blocks[0];
      if (!head || !isTrigger(head.type)) ng(`${SW}: きっかけで始まっていない`);
      else {
        if (seenTrigger.has(head.type)) ng(`${SW}: きっかけ「${head.type}」が同じキャラに2本ある`);
        seenTrigger.add(head.type);
      }
      if (countBlocks(st.blocks) > STACK_MAX) ng(`${SW}: ブロック数が上限${STACK_MAX}超え`);
      walkList(st.blocks || [], 0, SW, s.chars.length);
    });
  });
  // エンジンでスモーク実行（IDを振ってから40拍＋タップ発火・例外なく回りきること）
  try {
    let nid = 1;
    const withIds = JSON.parse(JSON.stringify(s.chars));
    const assign = l => { for (const b of l || []) { b.id = nid++; assign(b.children); } };
    for (const c of withIds) for (const st of c.stacks || []) assign(st.blocks);
    const eng = createEngine(withIds.map((c, i) => ({ key: "k" + i, x: c.x, y: c.y, stacks: c.stacks })), {});
    if (eng.start() !== true) ng(`${W}: エンジン start() が false（きっかけ不在？）`);
    for (let t = 0; t < 40; t++) { if (t === 3) eng.tap("k0"); eng.tick(); }
    eng.stop();
  } catch (e) {
    ng(`${W}: エンジン実行で例外 ${e.message}`);
  }
}
if (SAMPLES.length !== 6) ng(`みほんは6本（あつめ/よけ/キャッチ＋段階3: おちものキャッチ/おにごっこ/ゴールまで いこう）のはず（実際 ${SAMPLES.length}本）`);

if (fail === 0) {
  console.log(`ゲームこうぼう みほん${SAMPLES.length}本 PASS（型/範囲/深さ/きっかけ/上限/gameConfig妥当性〔score・time・gameOver・target〕/エンジン40拍スモーク）`);
  process.exit(0);
} else {
  console.log(`\n❌ こうぼうみほん検証 ${fail}件 FAIL`);
  process.exit(1);
}
