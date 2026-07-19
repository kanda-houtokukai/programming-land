/* つくるスタジオ: みほんデータの機械検証（段階2 §5・設計§7「検証FAILは公開しない」）。
   npm run verify のチェーンに入っており、FAILすると deploy が走らない。
   検証対象: src/data/studio-samples.js（純データ）。
   参照する正本: studio-blocks-defs.js（node安全なブロック定義）＋ engine.js（スモーク実行）。
   実行: node tools/verify-studio.mjs */

import { SAMPLES } from "../src/data/studio-samples.js";
import { DEFS, SOUNDS, STUDIO_BG_IDS, isTrigger, isContainer } from "../src/data/studio-blocks-defs.js";
import { createEngine, LCOLS, LROWS } from "../src/workshop/engine.js";

let fail = 0;
const ng = msg => { console.log(`✗ FAIL ${msg}`); fail++; };

// 安全なキャラ＝buildCast の最低保証（どの子のずかんでも必ず出せる・指示書§5）
const SAFE_KINDS = [
  { type: "player" },
  { type: "mon", id: "mori", stage: 1 },
  { type: "enemy", id: "slime" },
  { type: "enemy", id: "mushroom" },
];
const kindKey = k => JSON.stringify([k.type, k.id || "", k.stage || ""]);
const SAFE_SET = new Set(SAFE_KINDS.map(kindKey));

const MAX_CHARS = 5, STACK_MAX = 30, MAXDEPTH = 2;

function countBlocks(list) { return (list || []).reduce((a, b) => a + 1 + (b.children ? countBlocks(b.children) : 0), 0); }

// ブロック木の妥当性: 型の実在・パラメータ範囲・入れ子深さ・ずっと=末尾のみ・きっかけは先頭以外に出ない
function walkList(list, depth, where) {
  list.forEach((b, i) => {
    const d = DEFS[b.type];
    if (!d) { ng(`${where}: 未知のブロック type="${b.type}"`); return; }
    if (depth > 0 || i > 0) {
      if (isTrigger(b.type)) ng(`${where}: きっかけ「${d.label}」がスタック先頭以外にある`);
    }
    if (d.pill === "n") {
      if (typeof b.n !== "number" || b.n < d.min || b.n > d.max) ng(`${where}: 「${d.label}」の n=${b.n} が範囲外（${d.min}..${d.max}）`);
    }
    if (d.pill === "s") {
      if (typeof b.s !== "number" || b.s < 0 || b.s >= SOUNDS.length) ng(`${where}: 「${d.label}」の s=${b.s} が範囲外（0..${SOUNDS.length - 1}）`);
    }
    if (isContainer(b.type)) {
      if (!Array.isArray(b.children)) ng(`${where}: 容器「${d.label}」に children 配列がない`);
      else {
        if (depth + 1 > MAXDEPTH) ng(`${where}: 入れ子深さが${MAXDEPTH}を超えている`);
        walkList(b.children, depth + 1, `${where}>「${d.label}」`);
      }
    } else if (b.children) ng(`${where}: 容器でない「${d.label}」が children を持つ`);
    if (d.flat && i !== list.length - 1) ng(`${where}: 「${d.label}」（ずっと）がリスト末尾以外にある`);
  });
}

const ids = new Set();
for (const s of SAMPLES) {
  const W = `みほん「${s.id}」`;
  if (ids.has(s.id)) ng(`${W}: id が重複`);
  ids.add(s.id);
  if (!s.name) ng(`${W}: name がない`);
  if (!STUDIO_BG_IDS.includes(s.bg)) ng(`${W}: bg="${s.bg}" が BGS に実在しない（${STUDIO_BG_IDS.join("/")}）`);
  if (!Array.isArray(s.chars) || !s.chars.length || s.chars.length > MAX_CHARS) {
    ng(`${W}: キャラ数 ${s.chars && s.chars.length} が 1..${MAX_CHARS} の外`);
    continue;
  }
  s.chars.forEach((c, ci) => {
    const CW = `${W} キャラ${ci + 1}`;
    if (!SAFE_SET.has(kindKey(c.kind || {}))) ng(`${CW}: kind が最低保証4種の外（${JSON.stringify(c.kind)}）`);
    if (!Number.isInteger(c.x) || c.x < 0 || c.x >= LCOLS) ng(`${CW}: x=${c.x} が 0..${LCOLS - 1} の外`);
    if (!Number.isInteger(c.y) || c.y < 0 || c.y >= LROWS) ng(`${CW}: y=${c.y} が 0..${LROWS - 1} の外`);
    const seenTrigger = new Set();
    (c.stacks || []).forEach((st, si) => {
      const SW = `${CW} スタック${si + 1}`;
      const head = st.blocks && st.blocks[0];
      if (!head || !isTrigger(head.type)) ng(`${SW}: きっかけで始まっていない`);
      else {
        if (seenTrigger.has(head.type)) ng(`${SW}: きっかけ「${head.type}」が同じキャラに2本ある`);
        seenTrigger.add(head.type);
      }
      const total = countBlocks(st.blocks);
      if (total > STACK_MAX) ng(`${SW}: ブロック数 ${total} が上限${STACK_MAX}超え`);
      walkList(st.blocks || [], 0, SW);
    });
  });
  // エンジンでスモーク実行（IDを振ってから 40拍・例外なく回りきること）
  try {
    let nid = 1;
    const withIds = JSON.parse(JSON.stringify(s.chars));
    const assign = l => { for (const b of l || []) { b.id = nid++; assign(b.children); } };
    for (const c of withIds) for (const st of c.stacks || []) assign(st.blocks);
    const eng = createEngine(withIds.map((c, i) => ({ key: "k" + i, x: c.x, y: c.y, stacks: c.stacks })), {});
    if (eng.start() !== true) ng(`${W}: エンジン start() が false（きっかけ不在？）`);
    for (let t = 0; t < 40; t++) eng.tick();
    eng.stop();
  } catch (e) {
    ng(`${W}: エンジン実行で例外 ${e.message}`);
  }
}
if (SAMPLES.length !== 4) ng(`みほんは4本のはず（実際 ${SAMPLES.length}本）`);

if (fail === 0) {
  console.log(`つくるスタジオ みほん${SAMPLES.length}本 PASS（型/範囲/深さ/ずっと末尾/きっかけ1本/上限/エンジン40拍スモーク）`);
  process.exit(0);
} else {
  console.log(`\n❌ みほん検証 ${fail}件 FAIL`);
  process.exit(1);
}
