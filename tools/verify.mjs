/* ステージ全数検証ソルバー
   各ステージについて、そのワールドで使えるブロックだけで勝てる最小ブロック数を全探索し、
   ★3基準(par)と一致するか確認する。
   ルールはUIと同じ src/engine.js の simulate を使う（仕様の二重管理をしない）。
   使い方: npm run verify   … 1つでもFAILなら終了コード1（CIで落ちる） */

import { STAGES } from "../src/data/stages.js";
import { WORLD_PALETTE } from "../src/data/worlds.js";
import { simulate, MAX_BLOCKS } from "../src/engine.js";

function structuralCheck(st) {
  const errs = [];
  const w = st.grid[0].length;
  if (!st.grid.every(r => r.length === w)) errs.push("行の長さが不揃い");
  const flat = st.grid.join("");
  const sCount = (flat.match(/S/g) || []).length;
  const starCount = (flat.match(/\*/g) || []).length;
  if (sCount !== 1) errs.push(`Sが${sCount}個`);
  if (starCount < 1) errs.push("星が0個");
  if (/[^S.#*]/.test(flat)) errs.push("未知の文字");
  if (![0, 1, 2, 3].includes(st.dir)) errs.push(`dirが不正: ${st.dir}`);
  return errs;
}

// 残りコストちょうどでプログラムを組み上げ、勝てるものが1つでもあれば true
function search(stage, prims, hasRepeat, remaining, prog) {
  if (remaining === 0) return simulate(stage, prog) === "win";
  for (const p of prims) {
    prog.push({ type: p });
    if (search(stage, prims, hasRepeat, remaining - 1, prog)) return true;
    prog.pop();
  }
  if (hasRepeat) {
    // repeatのコストは 1 + 中身の数。中身は基本ブロックのみ（UIでは入れ子を作れない）
    for (let bodyLen = 1; bodyLen <= remaining - 1; bodyLen++) {
      if (searchRepeatBody(stage, prims, hasRepeat, remaining, prog, bodyLen, [])) return true;
    }
  }
  return false;
}
function searchRepeatBody(stage, prims, hasRepeat, remaining, prog, bodyLen, body) {
  if (body.length === bodyLen) {
    for (let count = 2; count <= 9; count++) {
      prog.push({ type: "repeat", count, children: [...body] });
      if (search(stage, prims, hasRepeat, remaining - 1 - bodyLen, prog)) return true;
      prog.pop();
    }
    return false;
  }
  for (const p of prims) {
    body.push({ type: p });
    if (searchRepeatBody(stage, prims, hasRepeat, remaining, prog, bodyLen, body)) return true;
    body.pop();
  }
  return false;
}

function minBlocksToWin(stage) {
  const palette = WORLD_PALETTE[stage.world];
  const prims = palette.filter(p => p !== "repeat");
  const hasRepeat = palette.includes("repeat");
  for (let n = 1; n <= MAX_BLOCKS; n++) {
    if (search(stage, prims, hasRepeat, n, [])) return n;
  }
  return null;
}

let fail = 0;
console.log("ステージ検証（★3解の存在・parが最短解と一致）\n");
console.log("ID    par  最短  判定");
for (const st of STAGES) {
  const errs = structuralCheck(st);
  if (errs.length) {
    console.log(`${st.id.padEnd(5)} ${String(st.par).padEnd(4)} -    FAIL 盤面不正: ${errs.join(" / ")}`);
    fail++; continue;
  }
  const t0 = Date.now();
  const min = minBlocksToWin(st);
  const ms = Date.now() - t0;
  if (min === null) { console.log(`${st.id.padEnd(5)} ${String(st.par).padEnd(4)} なし  FAIL 解なし（${ms}ms）`); fail++; continue; }
  const ok = min === st.par;
  if (!ok) fail++;
  console.log(`${st.id.padEnd(5)} ${String(st.par).padEnd(4)} ${String(min).padEnd(4)} ${ok ? "PASS" : "FAIL parと最短が不一致"}（${ms}ms）`);
}
console.log(fail === 0 ? `\n全${STAGES.length}ステージ PASS` : `\nFAIL ${fail}件`);
process.exit(fail === 0 ? 0 : 1);
