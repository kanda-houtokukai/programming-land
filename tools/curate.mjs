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
import { solveStageWithSolution, solutionKinds } from "./solve.mjs";

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

// 概念タグ: この面の解が必須とする新概念
function conceptTag(kinds) {
  const set = new Set(kinds);
  const rep = set.has("repeat");
  const br = set.has("smartR") || set.has("smartL");
  if (rep && br) return "both";
  if (rep) return "repeat";
  if (br) return "branch";
  return "basic";
}

/* プールを作る（accept を通った候補を targetPool 個ためる） */
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
    const sv = solveStageWithSolution(cand, ISLANDS[island].palette, par);
    pool.push({ ...cand, par, sol: sv.sol, kinds: [...solutionKinds(sv.sol)], concept: conceptTag(sv.kinds ? sv.kinds : [...solutionKinds(sv.sol)]) });
  }
  return pool;
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
  const [lo, hi] = SPEC[island][diff].par;
  const order = CONCEPT_ORDER[island] || ["basic", "repeat", "branch", "both"];
  const rank = c => { const i = order.indexOf(c); return i < 0 ? order.length : i; };
  // 概念段階→par昇順で全体を並べ、目標parランプに沿って拾う
  const sorted = [...pool].sort((a, b) => (rank(a.concept) - rank(b.concept)) || (a.par - b.par));
  // 目標par: lo から hi へ N 段でゆるやかに
  const targets = [];
  for (let i = 0; i < N; i++) targets.push(Math.round(lo + (hi - lo) * i / (N - 1)));
  const used = new Set();
  const picked = [];
  let lastPar = -Infinity, lastRank = -1;
  for (const tgt of targets) {
    // 「まだ使っていない・par>=lastPar・par を tgt に最も近く・概念段階が後戻りしない」候補
    let best = null, bestScore = Infinity;
    for (let i = 0; i < sorted.length; i++) {
      if (used.has(i)) continue;
      const c = sorted[i];
      if (c.par < lastPar) continue;                 // 非減少
      if (rank(c.concept) < lastRank) continue;      // 概念は後戻りしない
      const score = Math.abs(c.par - tgt) * 10 + (rank(c.concept) - lastRank);
      if (score < bestScore) { bestScore = score; best = i; }
    }
    if (best === null) return null; // プール不足
    used.add(best);
    picked.push(sorted[best]);
    lastPar = sorted[best].par;
    lastRank = Math.max(lastRank, rank(sorted[best].concept));
  }
  return picked;
}
