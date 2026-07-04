/* もしもの島「やさしい」9面を、段階設計（導入面→小回数🔁→本領）で生成する。
   他の153面は触らず、stages.gen.js の もしも-easy 9件だけ差し替える（--write）。
   盤面サイズは仕様どおり 5x4 に固定（verifyのサイズ検定を通すため）。
   - 導入面(1,2面): teach:true。🧠必須検定を免除し、代わりに「手本解(🧠使用)で勝て・
     countBlocks(sol)=par・ソルバー最短=par」を verify 側で確認する（★3が素直な🧠解で報われる）。
   - 実面(3〜9面): 従来の accept(島3)（🧠が最短に必要）を満たし、🔁回数は入口ほど小さく制限。
   実行: node tools/gen-moshimo-easy.mjs        （探索して結果を表示）
         node tools/gen-moshimo-easy.mjs --write （stages.gen.js の該当9件を差し替え）*/
import { readFileSync, writeFileSync } from "node:fs";
import { simulate, countBlocks } from "../src/engine.js";
import { solveStage, solveStageWithSolution, solutionKinds } from "./solve.mjs";
import { accept, SPEC } from "./criteria.mjs";
import { makeCandidate, mulberry32 } from "./curate.mjs";
import { ISLANDS } from "../src/data/islands.js";
import { checkCurve } from "./curve.mjs";

const PAL = ISLANDS[3].palette;
const { w: W, h: H } = SPEC[3].easy; // 5 x 4（仕様サイズ）
const maxRepeatCount = sol => sol.reduce((m, b) => b.type === "repeat" ? Math.max(m, b.count) : m, 0);
const usesSmart = sol => { const k = solutionKinds(sol); return k.has("smartR") || k.has("smartL"); };

/* 導入面: 盤面と向きと手本解を明示し、狙いどおり解けて最短=par であることを確認して返す */
function makeTeaching({ grid, dir, teachSol, par }) {
  const stage = { grid, dir };
  if (grid.length !== H || grid.some(r => r.length !== W)) throw new Error("導入面のサイズが仕様外");
  if (simulate(stage, teachSol) !== "win") throw new Error("導入面: 手本解で勝てない");
  if (countBlocks(teachSol) !== par) throw new Error("導入面: 手本解のブロック数がparと不一致");
  const min = solveStage(stage, PAL, 14);
  if (min !== par) throw new Error(`導入面: 最短が par と不一致 (最短${min}/par${par})`);
  if (!usesSmart(teachSol)) throw new Error("導入面: 手本解が🧠を使っていない");
  return { grid, dir, par, sol: teachSol, kinds: [...solutionKinds(teachSol)], teach: true };
}

/* 実面: ランダム盤面(5x4)から accept(島3) を満たし、min=par、🔁回数≤cap の面を探す */
function findReal({ par, walls, repCap, seed, tries = 120000 }) {
  const spec = { w: W, h: H, walls, stars: [1, 1], par: [par, par] };
  const rnd = mulberry32(seed);
  for (let t = 0; t < tries; t++) {
    const cand = makeCandidate(spec, rnd);
    if (!cand) continue;
    const min = accept(3, spec, cand); // par範囲[par,par]・🧠必須検定込み
    if (min !== par) continue;
    const sv = solveStageWithSolution(cand, PAL, 14);
    if (!sv || sv.min !== par || !usesSmart(sv.sol)) continue;
    if (maxRepeatCount(sv.sol) > repCap) continue;
    return { grid: cand.grid, dir: cand.dir, par, sol: sv.sol, kinds: [...solutionKinds(sv.sol)] };
  }
  return null;
}

const S = { type: "smartR" }, M = { type: "move" };
// 導入面の盤面(5x4)。e3-1=かべ無し→まっすぐ／e3-2=かべ(#)→曲がって進む
const PLAN = [
  { kind: "teach", par: 1, dir: 0, teachSol: [S],       // S(0,0)→ 右どなりの⭐へ まっすぐ
    grid: ["S*...", ".....", ".....", "....."] },
  { kind: "teach", par: 2, dir: 0, teachSol: [S, M],    // S(0,1)→ 前が#→みぎ(下)むいて⭐(0,2)へ
    grid: [".....", "S#...", "*....", "....."] },
  { kind: "real", par: 3, walls: 0.08, repCap: 3, seed: 101 },
  { kind: "real", par: 3, walls: 0.10, repCap: 3, seed: 202 },
  { kind: "real", par: 3, walls: 0.12, repCap: 4, seed: 303 },
  { kind: "real", par: 4, walls: 0.14, repCap: 5, seed: 404 },
  { kind: "real", par: 4, walls: 0.16, repCap: 6, seed: 505 },
  { kind: "real", par: 4, walls: 0.16, repCap: 6, seed: 606 },
  { kind: "real", par: 5, walls: 0.18, repCap: 9, seed: 707 },
];

const NAME = "⛰️ ステージ ";
const out = [];
for (let i = 0; i < PLAN.length; i++) {
  const p = PLAN[i];
  const r = p.kind === "teach" ? makeTeaching(p) : findReal(p);
  if (!r) { console.log(`✗ ステージ${i + 1}(par${p.par}) 見つからず`); process.exit(1); }
  const st = { id: `e3-${i + 1}`, island: 3, difficulty: "easy", name: `${NAME}${i + 1}`,
    dir: r.dir, par: r.par, grid: r.grid, sol: r.sol, kinds: r.kinds };
  if (r.teach) st.teach = true;
  out.push(st);
  console.log(`✓ e3-${i + 1}  par=${r.par}  ${p.kind === "teach" ? "導入" : "実 "}  🔁最大${maxRepeatCount(r.sol) || "-"}  kinds=[${r.kinds}]  grid=${JSON.stringify(r.grid)}`);
}

// カーブ検証（easyトラック全体: 既存の他島 easy ＋ 新しい島3easy）
const src = readFileSync("src/data/stages.gen.js", "utf8");
const cur = JSON.parse(src.match(/GEN_STAGES = (\[.*\]);/s)[1]);
const easyTrack = cur.filter(s => s.difficulty === "easy" && !(s.island === 3)).concat(out);
const errs = checkCurve(easyTrack, "easy");
console.log(errs.length ? "\nカーブ違反:\n" + errs.join("\n") : "\nカーブ検証: なめらか（違反0）");
if (errs.length) process.exit(1);

if (process.argv.includes("--write")) {
  const others = cur.filter(s => !(s.island === 3 && s.difficulty === "easy"));
  const merged = others.concat(out).sort((a, b) => {
    const io = a.island - b.island; if (io) return io;
    const d = ["easy", "normal", "hard"].indexOf(a.difficulty) - ["easy", "normal", "hard"].indexOf(b.difficulty); if (d) return d;
    return Number(a.id.match(/-(\d+)$/)[1]) - Number(b.id.match(/-(\d+)$/)[1]);
  });
  const body = `/* 自動生成ステージ（tools/generate.mjs --write・選抜方式・シード固定）。手で編集しない。
   各面: par=★3の最短ブロック数 / sol=最短解(救済ヒント用) / kinds=使用ブロック種(カーブ用)
   teach:true = 導入面（🧠を1回だけ使う入口。verifyは手本解の妥当性で検定）
   再生成: node tools/generate.mjs --write → npm run verify で全数検証
   ※島3easyのみ tools/gen-moshimo-easy.mjs --write で段階設計に差し替え済み（2026-07-05） */
export const GEN_STAGES = ${JSON.stringify(merged)};
`;
  writeFileSync("src/data/stages.gen.js", body);
  console.log(`\nstages.gen.js を書き出し（島3easyの9面を差し替え・他${others.length}面は不変）`);
}
