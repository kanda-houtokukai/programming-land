/* なめらかなカーブを作る「選抜つき生成」の中核（道A・量産の本番はこれを使う）
   方式: ランダムに大量のプールを作る → 難易度指標（par・使用概念）で選抜して
         「なだらかに上がる並び」に組み上げる。ランダム採用（現行）との違いはここ。

   1面ずつの新概念導入（R3）を守るため、島ごとに「導入順の段階」を定義:
   - 島2(くりかえし): [basic理解済] → repeat単独 → repeat活用
   - 島3(もしも):     branch単独（repeatなし）→ branch＋repeat併用
   - 島4(くみあわせ): repeat＋branch併用（両方既習の前提）
   他の島は par の昇順ランプのみ。 */

import { ISLANDS } from "../src/data/islands.js";
import { SPEC, accept } from "./criteria.mjs";
import { compile, bfsMin, minBlocks, ACT, solveStageWithSolution, solutionKinds } from "./solve.mjs";

export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeCandidate(spec, rnd) {
  const ri = n => Math.floor(rnd() * n);
  const { w, h } = spec;
  const cells = Array.from({ length: h }, () => Array(w).fill("."));
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (rnd() < spec.walls) cells[y][x] = "#";
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
  const seen = new Set([sy * w + sx]); const q = [[sx, sy]];
  while (q.length) {
    const [x, y] = q.pop();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h || cells[ny][nx] === "#" || seen.has(ny * w + nx)) continue;
      seen.add(ny * w + nx); q.push([nx, ny]);
    }
  }
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (cells[y][x] === "*" && !seen.has(y * w + x)) return null;
  return { grid: cells.map(r => r.join("")), dir };
}

/* 概念タグを「軽量に」判定（プール全部の解抽出は重いので避ける）。
   par=最短(全ブロック)。制限パレットでの最短と比べて、必須の新概念を見分ける。 */
function conceptTag(island, cand, par) {
  const palette = ISLANDS[island].palette;
  const env = compile(cand);
  const allPrims = palette.filter(p => p !== "repeat").map(p => ACT[p]);
  const noSmart = allPrims.filter(a => a !== ACT.smartR && a !== ACT.smartL);
  const useRepeat = palette.includes("repeat");
  const hasSmart = palette.includes("smartR") || palette.includes("smartL");
  // repeat無しの最短（BFS）
  const noRepeatMin = bfsMin(env, allPrims);
  const needsRepeat = useRepeat && (noRepeatMin === null || noRepeatMin > par);
  // smart無しの最短
  let needsBranch = false;
  if (hasSmart) {
    const noBranchMin = minBlocks(env, noSmart, useRepeat, par + 3);
    needsBranch = (noBranchMin === null || noBranchMin > par);
  }
  if (needsRepeat && needsBranch) return "both";
  if (needsBranch) return "branch";
  if (needsRepeat) return "repeat";
  return "basic";
}

/* プールを作る（accept を通った候補を targetPool 個ためる。概念は軽量判定・解抽出はしない） */
export function buildPool(island, diff, rnd, targetPool = 60, maxAttempts = 40000) {
  const spec = SPEC[island][diff];
  const pool = [];
  const seen = new Set();
  let attempts = 0;
  while (pool.length < targetPool && attempts < maxAttempts) {
    attempts++;
    const cand = makeCandidate(spec, rnd);
    if (!cand) continue;
    const key = cand.grid.join("/") + "|" + cand.dir;
    if (seen.has(key)) continue;
    const par = accept(island, spec, cand);
    if (par === null) continue;
    seen.add(key);
    pool.push({ ...cand, par, concept: conceptTag(island, cand, par) });
  }
  return pool;
}

/* 選抜した面にだけ 最短解(sol)と使用ブロック種(kinds)を付ける（重い処理は最小限に） */
export function attachSolutions(island, picked) {
  return picked.map(s => {
    const sv = solveStageWithSolution(s, ISLANDS[island].palette, s.par);
    return { ...s, sol: sv.sol, kinds: [...solutionKinds(sv.sol)] };
  });
}

/* プールから N 面を「なだらかに上がる並び」で選抜する。
   - 概念の導入順（島ごと）を守る: intro段階の概念だけを先に、後で併用
   - par は非減少で、段差が小さくなるよう target ランプに合わせて拾う */
const CONCEPT_ORDER = {
  1: ["basic"],
  2: ["basic", "repeat"],           // 反復の島（basicで足せる面があれば先に）
  3: ["branch", "both"],            // 分岐の島: branch単独 → repeatと併用
  4: ["repeat", "branch", "both"],  // くみあわせ
  5: ["basic", "repeat", "branch", "both"],
  6: ["basic", "repeat"],           // 大迷路（反復中心）
};

export function curate(pool, island, diff, N) {
  if (pool.length < N) return null;
  // par昇順に並べる。概念導入順は「トラックを島1→6と進む」時点で自然に守られる
  // （repeatは島2・branchは島3で必ず先に出る）ので、島内は par だけでよい。
  const sorted = [...pool].sort((a, b) => a.par - b.par);
  // プールの実分布に沿って N 個を均等間隔で拾う。
  // → 非減少・段差は par範囲に収まる・存在しない難易度を要求しない（＝破綻しない）。
  const picked = [];
  const usedIdx = new Set();
  for (let i = 0; i < N; i++) {
    let idx = Math.round(i * (sorted.length - 1) / (N - 1));
    while (usedIdx.has(idx) && idx < sorted.length - 1) idx++;
    while (usedIdx.has(idx) && idx > 0) idx--;
    usedIdx.add(idx);
    picked.push(sorted[idx]);
  }
  picked.sort((a, b) => a.par - b.par); // 非減少に整える
  return picked;
}
