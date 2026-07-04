/* ステージ・ジェネレータ（道A: 選抜つき生成でなめらかなカーブに）
   使い方:
     node tools/generate.mjs --write    … 本生産: 各(島×難易度)9面 = 162面 を選抜方式で生成し書き出す
   方式: 各(島×難易度)で候補プールを大量に作り、tools/curate.mjs で
         「par・使う概念がなだらかに上がる並び」に選抜する（ランダム採用ではない）。
   採用基準は tools/criteria.mjs、選抜は tools/curate.mjs、カーブ検証は tools/curve.mjs（verify共有）。 */

import { writeFileSync } from "node:fs";
import { mulberry32, buildPool, curate, attachSolutions } from "./curate.mjs";
import { checkCurve } from "./curve.mjs";

const WRITE = process.argv.includes("--write");
if (!WRITE) { console.log("使い方: node tools/generate.mjs --write"); process.exit(1); }

const PER_CELL = 9;
const POOL = 55;          // 各セルの候補プール数（なめらか選抜に十分な多様性）
const rnd = mulberry32(20260707);

const stages = [];
console.log("島  難易度   プール   選抜par");
for (const island of [1, 2, 3, 4, 5, 6]) {
  for (const diff of ["easy", "normal", "hard"]) {
    const t0 = Date.now();
    let pool = buildPool(island, diff, rnd, POOL);
    let picked = curate(pool, island, diff, PER_CELL);
    // プールが偏って選抜できないときは プールを増やして再挑戦
    let tries = 0;
    while (!picked && tries++ < 4) {
      pool = pool.concat(buildPool(island, diff, rnd, POOL));
      picked = curate(pool, island, diff, PER_CELL);
    }
    if (!picked) throw new Error(`選抜できない（プール不足）: 島${island} ${diff}`);
    const withSol = attachSolutions(island, picked); // 選抜9面にだけ 解を付ける
    withSol.forEach((s, i) => stages.push({
      id: `${diff[0]}${island}-${i + 1}`, island, difficulty: diff,
      name: `${["", "🏝️", "🌀", "⛰️", "🌈", "🧠", "🏰"][island]} ステージ ${i + 1}`,
      dir: s.dir, par: s.par, grid: s.grid, sol: s.sol, kinds: s.kinds,
    }));
    console.log(`${String(island).padEnd(3)} ${diff.padEnd(7)} ${String(pool.length).padStart(5)}   ${picked.map(s => s.par).join(" → ")}  (${Date.now() - t0}ms)`);
  }
}
console.log(`\n生成: ${stages.length}面`);

// 書き出す前に カーブ検証（なだらかでなければ生産を止める）
let curveErr = 0;
for (const diff of ["easy", "normal", "hard"]) {
  const e = checkCurve(stages.filter(s => s.difficulty === diff), diff);
  e.forEach(x => { console.log("カーブ違反:", x); curveErr++; });
}
if (curveErr > 0) { console.log(`\nカーブ違反 ${curveErr}件 → 書き出し中止（シード/プールを調整）`); process.exit(1); }
console.log("カーブ検証: なめらか（違反0）");

const body = `/* 自動生成ステージ（tools/generate.mjs --write・選抜方式・シード固定）。手で編集しない。
   各面: par=★3の最短ブロック数 / sol=最短解(救済ヒント用) / kinds=使用ブロック種(カーブ用)
   再生成: node tools/generate.mjs --write → npm run verify で全数検証 */
export const GEN_STAGES = ${JSON.stringify(stages)};
`;
writeFileSync("src/data/stages.gen.js", body);
console.log("src/data/stages.gen.js に書き出しました");
