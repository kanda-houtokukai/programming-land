/* ③試作: もしもの島「やさしい」段階設計のサンプル面を「探索」して見つける使い捨てスクリプト。
   小さい盤面を総当たりし、狙った教育的な解(sol)でクリアでき、かつソルバー最短parが小さい面を拾う。
   実行: node tools/sample-moshimo.mjs */
import { simulate, countBlocks } from "../src/engine.js";
import { solveStageWithSolution, solutionKinds } from "./solve.mjs";
import { ISLANDS } from "../src/data/islands.js";

const PAL = ISLANDS[3].palette;
const EM = { move: "⬆️まえ", left: "↩️ひだり", right: "↪️みぎ", smartR: "🧠かべ?→みぎ", smartL: "🧠かべ?→ひだり" };
const showSol = sol => sol.map(b => b.type === "repeat"
  ? `🔁${b.count}かい[${b.children.map(c => EM[c.type]).join("→")}]`
  : EM[b.type]).join(" → ");

// 小さい盤面を総当りで作る（S1個・*1個・#を数個）。teachSol が win になり、min par が範囲内の最初の1面を返す。
function search({ w, h, teachSol, wantMinPar, maxWalls, needSmartInMin = false }) {
  const cells = w * h;
  // 各セル: 0='.' 1='#'（S,*は別に置く）。壁パターンをビットで回す（小盤面のみ）
  for (let mask = 0; mask < (1 << Math.min(cells, 12)); mask++) {
    let wallCount = 0; for (let i = 0; i < cells; i++) if (mask & (1 << i)) wallCount++;
    if (wallCount > maxWalls) continue;
    for (let si = 0; si < cells; si++) {
      if (mask & (1 << si)) continue;
      for (let ti = 0; ti < cells; ti++) {
        if (ti === si || (mask & (1 << ti))) continue;
        for (let dir = 0; dir < 4; dir++) {
          const g = Array.from({ length: h }, () => Array(w).fill("."));
          for (let i = 0; i < cells; i++) if (mask & (1 << i)) g[(i / w) | 0][i % w] = "#";
          g[(si / w) | 0][si % w] = "S";
          g[(ti / w) | 0][ti % w] = "*";
          const stage = { grid: g.map(r => r.join("")), dir };
          if (simulate(stage, teachSol) !== "win") continue;
          const sv = solveStageWithSolution(stage, PAL, 14);
          const [lo, hi] = Array.isArray(wantMinPar) ? wantMinPar : [wantMinPar, wantMinPar];
          if (sv.min === null || sv.min < lo || sv.min > hi) continue;
          if (needSmartInMin) {
            const k = [...solutionKinds(sv.sol)];
            if (!(k.includes("smartR") || k.includes("smartL"))) continue;
          }
          return { stage, teachSol, min: sv.min, minSol: sv.sol, kinds: [...solutionKinds(teachSol)] };
        }
      }
    }
  }
  return null;
}

const TARGETS = [
  { id: "新e3-1", aim: "1命令: かべじゃないとき 🧠は まっすぐ すすむ",
    w: 3, h: 3, teachSol: [{ type: "smartR" }], wantMinPar: 1, maxWalls: 2 },
  { id: "新e3-2", aim: "1命令: かべのとき 🧠は まがって すすむ",
    w: 3, h: 3, teachSol: [{ type: "smartR" }, { type: "move" }], wantMinPar: 2, maxWalls: 3 },
  { id: "新e3-3", aim: "2命令以上: かべで まがって から 2マス すすむ（🧠→まえ→まえ・repeatなし）",
    w: 4, h: 3, teachSol: [{ type: "smartR" }, { type: "move" }, { type: "move" }], wantMinPar: [2, 4], maxWalls: 3 },
  { id: "新e3-4", aim: "repeat導入(少回数): [🧠→まえ] を くりかえす・回数は小さく・🧠が最短に必要",
    w: 4, h: 3, teachSol: [{ type: "repeat", count: 3, children: [{ type: "smartR" }, { type: "move" }] }], wantMinPar: [2, 3], maxWalls: 4, needSmartInMin: true },
];

for (const t of TARGETS) {
  const r = search(t);
  console.log(`\n${t.id}  ${r ? "[見つかった]" : "[該当なし]"}`);
  console.log(`  狙い: ${t.aim}`);
  if (r) {
    console.log(`  盤面: ${JSON.stringify(r.stage.grid)} dir=${r.stage.dir}`);
    console.log(`  教える解(par=${countBlocks(t.teachSol)}): ${showSol(t.teachSol)}`);
    console.log(`  ソルバー最短(par=${r.min}): ${showSol(r.minSol)}`);
    console.log(`  kinds=[${r.kinds}]`);
  }
}
