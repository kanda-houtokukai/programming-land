/* 段階設計の全島展開（A6）: 入口が重いセルだけを「導入面＋小回数🔁＋parランプ」で再生成する。
   診断(2026-07-05): 重い入口＝「🧠かべ?を🔁の中で多周回」で、島3(normal/hard)・島4(全)・島5(全)に集中。
   島1(🔁なし)・島2(move主体の小回数🔁)・島6(🧠なし小回数)・島3easy(A5済) は既に軽く対象外＝既存面を保持。
   対象8セル(72面)のみ差し替え、他90面は不変。

   セル方針:
   - easy: 導入面2枚（島4） / normal: 導入面1枚（島3・島4） / hard: 導入面なし（小回数キャップのみ）
   - 島5は新ブロックが無いので導入面なし。かわりに par下限の軽い圧縮面から。
   - キャップ: 🧠入りループの回数 ≤ cap（面が進むごとに緩める）。⬆↩↪だけのループは
     読みやすい（「まっすぐn回」等）ので cap+3（最大9）まで許す＝島5の圧縮面を殺さない。
   - 選抜時は同par候補のうち「ループ回数が小さいもの」を優先（さらに軽く）。

   実行: node tools/gen-staged.mjs          （探索・表示のみ）
         node tools/gen-staged.mjs --write  （stages.gen.js の対象セルを差し替え） */
import { readFileSync, writeFileSync } from "node:fs";
import { simulate, countBlocks } from "../src/engine.js";
import { compile, bfsMin, minBlocks, solveStage, solveStageWithSolution, solutionKinds } from "./solve.mjs";
import { accept, SPEC, PRIM } from "./criteria.mjs";
import { makeCandidate, mulberry32 } from "./curate.mjs";
import { ISLANDS } from "../src/data/islands.js";
import { checkAllCurves } from "./curve.mjs";

const keyOf = s => s.grid.join("/") + "|" + s.dir;
const maxRep = sol => sol.reduce((a, b) => b.type === "repeat" ? Math.max(a, b.count) : a, 0);

/* キャップ検定: 🧠入りループは cap まで・🧠なしループは cap+3(最大9) まで */
function capOk(sol, cap) {
  for (const b of sol) if (b.type === "repeat") {
    const hasSmart = b.children.some(c => c.type.startsWith("smart"));
    if (hasSmart && b.count > cap) return false;
    if (!hasSmart && b.count > Math.min(cap + 3, 9)) return false;
  }
  return true;
}

/* ---- 導入面（手で設計した盤面を、狙いどおりか機械検証して採用する） ---- */
const S_ = t => ({ type: t });
const REP = (n, ...ch) => ({ type: "repeat", count: n, children: ch });

function makeTeaching(island, t) {
  const spec = SPEC[island][t.diff];
  const stage = { grid: t.grid, dir: t.dir };
  if (t.grid.length !== spec.h || t.grid.some(r => r.length !== spec.w)) throw new Error(`${t.label}: サイズが仕様外`);
  if (simulate(stage, t.sol) !== "win") throw new Error(`${t.label}: 手本解で勝てない`);
  if (countBlocks(t.sol) !== t.par) throw new Error(`${t.label}: 手本解のブロック数がparと不一致`);
  const min = solveStage(stage, ISLANDS[island].palette, t.par + 2);
  if (min !== t.par) throw new Error(`${t.label}: 最短=${min} が par=${t.par} と不一致`);
  const env = compile(stage);
  if (t.bfs !== undefined && bfsMin(env, PRIM.smart) !== t.bfs) throw new Error(`${t.label}: 素の手数が想定と違う`);
  if (t.needBoth) { // 島4: 🧠なし(🔁あり)では par で解けない＝両方の合わせ技が必須
    const noSmart = minBlocks(env, PRIM.mlr, true, t.par + 2);
    if (noSmart !== null && noSmart <= t.par) throw new Error(`${t.label}: 🧠なしでも同parで解けてしまう`);
  }
  return { grid: t.grid, dir: t.dir, par: t.par, sol: t.sol, kinds: [...solutionKinds(t.sol)], teach: true };
}

/* ---- 実面の直接探索（面ごとに exact-par で探す。gen-moshimo-easy と同じ実証済み方式）
   入口(セル内 idx<3)は星1個の軽い面に限定。見つからなければ cap→星条件の順に緩めてログを残す ---- */
function findReal(island, diff, spec, idx, rnd, usedKeys, log, tries = 90000) {
  const spec0 = SPEC[island][diff];
  const relaxSteps = [
    { cap: spec.cap, stars1: idx < 3 },
    { cap: spec.cap + 1, stars1: idx < 3 },
    { cap: spec.cap + 2, stars1: idx < 3 },
    { cap: spec.cap + 2, stars1: false },
  ];
  for (const rx of relaxSteps) {
    const genSpec = { ...spec0, stars: rx.stars1 ? [1, 1] : [1, spec0.stars[1]], par: [spec.par, spec.par] };
    for (let t = 0; t < tries; t++) {
      const cand = makeCandidate(genSpec, rnd);
      if (!cand) continue;
      const key = keyOf(cand);
      if (usedKeys.has(key)) continue;
      const min = accept(island, genSpec, cand); // par範囲[p,p]＋島の概念必須検定
      if (min !== spec.par) continue;
      const sv = solveStageWithSolution(cand, ISLANDS[island].palette, spec.par);
      if (!sv || sv.min !== spec.par || !capOk(sv.sol, rx.cap)) continue;
      if (rx.cap > spec.cap) log.push(`  (緩和: #${idx + 1} cap ${spec.cap}→${rx.cap})`);
      if (!rx.stars1 && idx < 3) log.push(`  (緩和: #${idx + 1} 入口の星1個条件を解除)`);
      return { grid: cand.grid, dir: cand.dir, par: spec.par, sol: sv.sol, key };
    }
  }
  return null;
}

/* ---- セル計画（parランプ非減少・段差≤2・入口=島内最小、capは入口ほど小さく） ---- */
const T = {
  // 島3 normal 導入面: かべの前で🧠→まがって すすむ（e3-2と同じ授業を6x5で）
  i3n: { diff: "normal", label: "n3-1", par: 2, dir: 0, bfs: 2,
    sol: [S_("smartR"), S_("move")],
    grid: ["......", "S#....", "*.....", "......", "......"] },
  // 島4 easy 導入面1: 🔁3[🧠→みぎ]＝軽い壁沿い（曲がって2歩）
  i4e1: { diff: "easy", label: "e4-1", par: 2, dir: 0, bfs: 3, needBoth: true,
    sol: [REP(3, S_("smartR"))],
    grid: ["S#...", ".....", "*....", ".....", "....."] },
  // 島4 easy 導入面2: 🔁4[🧠→ひだり]＝反対まわりで一歩長く
  i4e2: { diff: "easy", label: "e4-2", par: 2, dir: 0, bfs: 4, needBoth: true,
    sol: [REP(4, S_("smartL"))],
    grid: ["*....", ".....", ".....", "S#...", "....."] },
  // 島4 normal 導入面: 🔁3[🧠→みぎ]（6x5で同じ授業）
  i4n: { diff: "normal", label: "n4-1", par: 2, dir: 0, bfs: 3, needBoth: true,
    sol: [REP(3, S_("smartR"))],
    grid: ["S#....", "......", "*.....", "......", "......"] },
};

const R = (par, cap) => ({ kind: "real", par, cap });
const PLANS = [
  { island: 3, diff: "normal", stages: [
    { kind: "teach", t: T.i3n },
    R(4, 3), R(4, 4), R(5, 5), R(5, 6), R(6, 7), R(6, 8), R(7, 9), R(8, 9)] },
  // 島3hardの高par（10〜11）は🧠＋🔁の圧縮で実在しない（旧面も実質par7〜8）。実分布に合わせ 7→9 のランプ
  { island: 3, diff: "hard", stages: [
    R(7, 4), R(7, 5), R(7, 6), R(8, 7), R(8, 8), R(8, 9), R(8, 9), R(9, 9), R(9, 9)] },
  { island: 4, diff: "easy", stages: [
    { kind: "teach", t: T.i4e1 }, { kind: "teach", t: T.i4e2 },
    R(3, 4), R(3, 4), R(4, 5), R(4, 6), R(5, 7), R(5, 8), R(6, 9)] },
  { island: 4, diff: "normal", stages: [
    { kind: "teach", t: T.i4n },
    R(4, 4), R(4, 5), R(5, 6), R(5, 7), R(6, 8), R(6, 9), R(7, 9), R(7, 9)] },
  { island: 4, diff: "hard", stages: [
    R(6, 5), R(6, 5), R(6, 6), R(7, 7), R(7, 8), R(7, 9), R(8, 9), R(8, 9), R(8, 9)] },
  { island: 5, diff: "easy", stages: [
    R(3, 3), R(3, 4), R(3, 5), R(4, 6), R(4, 7), R(4, 8), R(5, 9), R(5, 9), R(5, 9)] },
  { island: 5, diff: "normal", stages: [
    R(4, 4), R(4, 5), R(4, 6), R(5, 7), R(5, 8), R(5, 9), R(6, 9), R(6, 9), R(6, 9)] },
  { island: 5, diff: "hard", stages: [
    R(5, 5), R(5, 6), R(6, 7), R(6, 8), R(7, 9), R(7, 9), R(8, 9), R(8, 9), R(8, 9)] },
];

/* ---- 生成本体 ---- */
const src = readFileSync("src/data/stages.gen.js", "utf8");
const cur = JSON.parse(src.match(/GEN_STAGES = (\[.*\]);/s)[1]);
const targetCell = new Set(PLANS.map(p => `${p.island}:${p.diff}`));
const kept = cur.filter(s => !targetCell.has(`${s.island}:${s.difficulty}`));
const usedKeys = new Set(kept.map(keyOf)); // 盤面重複はverifyがFAILにするので、既存全面と衝突させない

const EMOJI = ["", "🏝️", "🌀", "⛰️", "🌈", "🧠", "🏰"];
const out = [];
for (const plan of PLANS) {
  const t0 = Date.now();
  const rnd = mulberry32(plan.island * 1000 + plan.diff.length * 77 + 20260705);
  const log = [];
  const cellOut = [];
  for (let i = 0; i < plan.stages.length; i++) {
    const spec = plan.stages[i];
    let r;
    if (spec.kind === "teach") {
      r = makeTeaching(plan.island, spec.t);
      if (usedKeys.has(keyOf(r))) throw new Error(`導入面が既存面と重複: 島${plan.island} ${plan.diff} ${i + 1}`);
    } else {
      r = findReal(plan.island, plan.diff, spec, i, rnd, usedKeys, log);
      if (!r) throw new Error(`見つからず: 島${plan.island} ${plan.diff} #${i + 1} par${spec.par} cap${spec.cap}`);
    }
    usedKeys.add(keyOf(r));
    const st = { id: `${plan.diff[0]}${plan.island}-${i + 1}`, island: plan.island, difficulty: plan.diff,
      name: `${EMOJI[plan.island]} ステージ ${i + 1}`, dir: r.dir, par: r.par, grid: r.grid,
      sol: r.sol, kinds: r.kinds || [...solutionKinds(r.sol)] };
    if (r.teach) st.teach = true;
    cellOut.push(st);
  }
  out.push(...cellOut);
  const summary = cellOut.map(s => `${s.par}${s.teach ? "T" : ""}/${maxRep(s.sol) || "-"}`).join(" ");
  console.log(`島${plan.island} ${plan.diff.padEnd(6)} par/🔁 = ${summary}  (${Date.now() - t0}ms)`);
  log.forEach(l => console.log(l));
}

// カーブ検証（全難易度・全島の並びで）
const merged = kept.concat(out).sort((a, b) => {
  const io = a.island - b.island; if (io) return io;
  const d = ["easy", "normal", "hard"].indexOf(a.difficulty) - ["easy", "normal", "hard"].indexOf(b.difficulty); if (d) return d;
  return Number(a.id.match(/-(\d+)$/)[1]) - Number(b.id.match(/-(\d+)$/)[1]);
});
const { errs } = checkAllCurves(merged);
console.log(errs.length ? "\nカーブ違反:\n" + errs.join("\n") : "\nカーブ検証: なめらか（違反0）");
if (errs.length) process.exit(1);

if (process.argv.includes("--write")) {
  const body = `/* 自動生成ステージ（tools/generate.mjs --write・選抜方式・シード固定）。手で編集しない。
   各面: par=★3の最短ブロック数 / sol=最短解(救済ヒント用) / kinds=使用ブロック種(カーブ用)
   teach:true = 導入面（島の新概念を1〜2手で体感する入口。verifyは手本解の妥当性で検定）
   再生成: node tools/generate.mjs --write → npm run verify で全数検証
   ※段階設計セル（島3easy/normal/hard・島4全・島5全）は tools/gen-staged.mjs（島3easyは gen-moshimo-easy.mjs）が正本。
     generate.mjs で全再生成すると段階設計が失われるので注意（2026-07-05） */
export const GEN_STAGES = ${JSON.stringify(merged)};
`;
  writeFileSync("src/data/stages.gen.js", body);
  console.log(`\nstages.gen.js を書き出し（${PLANS.length}セル${out.length}面を差し替え・他${kept.length}面は不変）`);
}
