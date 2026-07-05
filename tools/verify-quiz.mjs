/* クイズ全数検証（P6e: 5カテゴリ全数メタ付き）
   - 構造チェック: カテゴリ・難易度・選択肢3〜4重複なし・正解番号・解説・ID一意・同一問題なし
   - 全問: meta から答えを再導出し「正解が1つに定まる」ことを確認
     ＋ 難易度タグ＝実難易度（構造特徴からの機械判定）を照合
     （基準は tools/quiz-criteria.mjs＝生成時と同一の正本）
   使い方: node tools/verify-quiz.mjs [--file <path>]   … 省略時 src/data/quizzes.gen.js */

import { checkQuestion, CATEGORIES, DIFFS } from "./quiz-criteria.mjs";

const fileArg = process.argv.indexOf("--file");
let questions;
if (fileArg >= 0) {
  const p = process.argv[fileArg + 1];
  const mod = await import(p.startsWith("/") || p.startsWith("../") ? p : `../${p}`);
  questions = mod.GEN_QUIZZES || mod.default || mod.QUESTIONS;
} else {
  const gen = await import("../src/data/quizzes.gen.js");
  questions = gen.GEN_QUIZZES;
}
if (!Array.isArray(questions)) { console.error("問題配列が読めません"); process.exit(1); }

// 総数と各セルの最低問数（P6e完了条件: 300問以上・各セル18問以上＝5問セッションの3倍超）
const MIN_PER_CELL = 18, MIN_TOTAL = 300;

let fail = 0;
const ids = new Set(), bodies = new Set();
for (const q of questions) {
  const errs = checkQuestion(q);
  if (ids.has(q.id)) errs.push("IDが重複");
  ids.add(q.id);
  const key = q.q + "|" + [...q.opts].sort().join("|");
  if (bodies.has(key)) errs.push("同一問題が重複");
  bodies.add(key);
  for (const e of errs) { console.log(`FAIL ${q.id}: ${e}`); fail++; }
}

// カテゴリ×難易度の分布
const counts = {};
for (const q of questions) {
  const k = `${q.category}/${q.difficulty}`;
  counts[k] = (counts[k] || 0) + 1;
}
console.log("分布:", Object.entries(counts).map(([k, v]) => `${k}:${v}`).join(" "));
if (fileArg < 0) {
  for (const cat of CATEGORIES) for (const d of DIFFS) {
    if ((counts[`${cat}/${d}`] || 0) < MIN_PER_CELL) { console.log(`FAIL 分布: ${cat}/${d} が${MIN_PER_CELL}問未満`); fail++; }
  }
  if (questions.length < MIN_TOTAL) { console.log(`FAIL 総数: ${questions.length} < ${MIN_TOTAL}`); fail++; }
}
console.log(fail === 0 ? `全${questions.length}問 PASS` : `FAIL ${fail}件`);
process.exit(fail === 0 ? 0 : 1);
