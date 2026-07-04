/* クイズ全数検証（P3）
   - 構造チェック: カテゴリ・難易度・選択肢3つ重複なし・正解番号・解説・ID一意・同一問題なし
   - テンプレート生成分: meta から答えを再導出し「正解が1つに定まる」ことを確認
     （基準は tools/quiz-criteria.mjs＝生成時と同一の正本）
   - 書き起こし分（metaなし）: 構造チェックのみ機械で行い、内容は quiz-書き起こし基準.md の
     チェックリストで人手レビュー（作成時に適用）
   使い方: node tools/verify-quiz.mjs [--file <path>]   … 省略時 src/data/quizzes.gen.js */

import { checkQuestion, CATEGORIES, DIFFS } from "./quiz-criteria.mjs";

const fileArg = process.argv.indexOf("--file");
const path = fileArg >= 0 ? process.argv[fileArg + 1] : "../src/data/quizzes.gen.js";

const mod = await import(path.startsWith("/") || path.startsWith("../") ? path : `../${path}`);
const questions = mod.GEN_QUIZZES || mod.default || mod.QUESTIONS;
if (!Array.isArray(questions)) { console.error("問題配列が読めません"); process.exit(1); }

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
console.log(fail === 0 ? `全${questions.length}問 PASS` : `FAIL ${fail}件`);
process.exit(fail === 0 ? 0 : 1);
