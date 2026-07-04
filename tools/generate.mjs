/* ステージ・ジェネレータ（P2）
   使い方:
     node tools/generate.mjs --sample   … 各(島×難易度)1面だけ生成して統計を出す（お試し）
     node tools/generate.mjs --write    … 本生産: 各(島×難易度)9面 = 162面 を src/data/stages.gen.js に書き出す
   採用基準は tools/criteria.mjs（verifyと共有）を参照 */

import { writeFileSync } from "node:fs";
import { ISLANDS } from "../src/data/islands.js";
import { SPEC, accept } from "./criteria.mjs";
import { solveStageWithSolution, solutionKinds } from "./solve.mjs";

const SAMPLE = process.argv.includes("--sample");
const WRITE = process.argv.includes("--write");
if (!SAMPLE && !WRITE) {
  console.log("使い方: node tools/generate.mjs --sample | --write");
  process.exit(1);
}
const PER_CELL = SAMPLE ? 1 : 9;

/* 乱数（シード固定で再現可能） */
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(20260704);
const ri = n => Math.floor(rnd() * n);

function makeCandidate(spec) {
  const { w, h } = spec;
  const cells = Array.from({ length: h }, () => Array(w).fill("."));
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (rnd() < spec.walls) cells[y][x] = "#";
  }
  const sx = ri(w), sy = ri(h);
  cells[sy][sx] = "S";
  const dir = ri(4);
  const nStars = spec.stars[0] + ri(spec.stars[1] - spec.stars[0] + 1);
  let placed = 0, guard = 0;
  while (placed < nStars && guard++ < 200) {
    const x = ri(w), y = ri(h);
    if (cells[y][x] === ".") { cells[y][x] = "*"; placed++; }
  }
  if (placed === 0) return null;
  // 4近傍の到達可能性（必要条件の速い判定）
  const seen = new Set([sy * w + sx]);
  const q = [[sx, sy]];
  while (q.length) {
    const [x, y] = q.pop();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h || cells[ny][nx] === "#" || seen.has(ny * w + nx)) continue;
      seen.add(ny * w + nx); q.push([nx, ny]);
    }
  }
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (cells[y][x] === "*" && !seen.has(y * w + x)) return null;
  }
  return { grid: cells.map(r => r.join("")), dir };
}

const stages = [];
const seenGrids = new Set();
console.log("島  難易度   試行数   時間     par");
for (const island of [1, 2, 3, 4, 5, 6]) {
  for (const diff of ["easy", "normal", "hard"]) {
    const spec = SPEC[island][diff];
    const t0 = Date.now();
    let attempts = 0, got = 0;
    const pars = [];
    while (got < PER_CELL) {
      attempts++;
      if (attempts > 60000) throw new Error(`生成が収束しない: 島${island} ${diff}`);
      const cand = makeCandidate(spec);
      if (!cand) continue;
      const key = cand.grid.join("/") + "|" + cand.dir;
      if (seenGrids.has(key)) continue;
      const par = accept(island, spec, cand);
      if (par === null) continue;
      seenGrids.add(key);
      got++;
      pars.push(par);
      // 最短解の手順（救済ヒント用）と使用ブロック種（難易度カーブ用）を持たせる
      const sv = solveStageWithSolution(cand, ISLANDS[island].palette, par);
      stages.push({
        id: `${diff[0]}${island}-${got}`, island, difficulty: diff,
        name: `${ISLANDS[island].emoji} ステージ ${got}`,
        dir: cand.dir, par, grid: cand.grid,
        sol: sv.sol, kinds: [...solutionKinds(sv.sol)],
      });
    }
    console.log(`${String(island).padEnd(3)} ${diff.padEnd(7)} ${String(attempts).padStart(6)} ${String((Date.now() - t0) + "ms").padStart(8)}   ${pars.join(",")}`);
  }
}
console.log(`\n生成: ${stages.length}面`);

if (WRITE) {
  const body = `/* 自動生成ステージ（tools/generate.mjs --write・シード固定）。手で編集しない。
   再生成: node tools/generate.mjs --write → npm run verify で全数検証 */
export const GEN_STAGES = ${JSON.stringify(stages, null, 1)};
`;
  writeFileSync("src/data/stages.gen.js", body);
  console.log("src/data/stages.gen.js に書き出しました");
}
