/* 島×難易度の生成仕様と採用検定（generate と verify で共有。ここが品質基準の正本） */
import { ISLANDS } from "../src/data/islands.js";
import { compile, bfsMin, minBlocks, solveStage, ACT } from "./solve.mjs";

/* 島×難易度の仕様: 盤面サイズ・星の数・壁の密度・parレンジ */
export const SPEC = {
  1: { easy: { w: 4, h: 3, stars: [1, 2], walls: 0.00, par: [3, 5] },
      normal: { w: 5, h: 4, stars: [2, 2], walls: 0.08, par: [5, 8] },
      hard: { w: 6, h: 5, stars: [2, 3], walls: 0.12, par: [8, 12] } },
  2: { easy: { w: 5, h: 4, stars: [1, 2], walls: 0.00, par: [3, 5] },
      normal: { w: 6, h: 5, stars: [2, 3], walls: 0.06, par: [5, 7] },
      hard: { w: 7, h: 6, stars: [3, 4], walls: 0.10, par: [7, 10] } },
  3: { easy: { w: 5, h: 4, stars: [1, 1], walls: 0.14, par: [3, 5] },
      normal: { w: 6, h: 5, stars: [1, 2], walls: 0.18, par: [5, 8] },
      hard: { w: 7, h: 6, stars: [2, 2], walls: 0.20, par: [7, 11] } },
  4: { easy: { w: 5, h: 5, stars: [1, 2], walls: 0.12, par: [4, 6] },
      normal: { w: 6, h: 5, stars: [2, 2], walls: 0.15, par: [5, 7] },
      hard: { w: 7, h: 6, stars: [2, 3], walls: 0.16, par: [6, 8] } },
  5: { easy: { w: 5, h: 5, stars: [1, 2], walls: 0.08, par: [3, 5] },
      normal: { w: 6, h: 6, stars: [2, 3], walls: 0.10, par: [4, 6] },
      hard: { w: 7, h: 7, stars: [2, 4], walls: 0.12, par: [5, 8] } },
  6: { easy: { w: 6, h: 6, stars: [1, 2], walls: 0.22, par: [5, 7] },
      normal: { w: 7, h: 7, stars: [2, 2], walls: 0.24, par: [7, 9] },
      hard: { w: 8, h: 8, stars: [2, 3], walls: 0.26, par: [9, 12] } },
};

export const CAP = 13; // ソルバー探索上限（parレンジ上限より少し上）

export const PRIM = { mlr: [ACT.move, ACT.left, ACT.right], smart: [ACT.move, ACT.left, ACT.right, ACT.smartR, ACT.smartL] };

/* 島ごとの採用検定。返り値: 採用なら par、だめなら null */
export function accept(island, spec, cand) {
  const env = compile(cand);
  const palette = ISLANDS[island].palette;
  const [lo, hi] = spec.par;
  const min = solveStage(cand, palette, Math.min(CAP, hi));
  if (min === null || min < lo || min > hi) return null;
  if (island === 2 || island === 6) {
    // 🔁が役立つ: 禁止時の最短（=BFS手数）が悪化すること
    const noRepeat = bfsMin(env, PRIM.mlr);
    if (noRepeat !== null && noRepeat <= min) return null;
  } else if (island === 3) {
    // 🧠が役立つ: 🧠を禁じると（🔁があっても）最短が悪化する
    // ※🔁なしの島では🧠は最短を縮められない（実行時にどちらかの動きに固定されるため）
    const noSmart = minBlocks(env, PRIM.mlr, true, Math.min(CAP, min + 3));
    if (noSmart !== null && noSmart <= min) return null;
  } else if (island === 4) {
    // 🔁も🧠も抜くと悪化する
    const noRepeat = bfsMin(env, PRIM.smart);
    if (noRepeat !== null && noRepeat <= min) return null;
    const noSmart = minBlocks(env, PRIM.mlr, true, Math.min(CAP, min + 3));
    if (noSmart !== null && noSmart <= min) return null;
  } else if (island === 5) {
    // ひらめき圧縮: まっすぐ並べると2倍以上かかる
    const straight = bfsMin(env, PRIM.smart);
    if (straight === null || straight < min * 2) return null;
  }
  return min;
}

