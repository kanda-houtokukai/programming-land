/* 全ステージ検証（P2・162面対応）
   各ステージについて確認すること:
     1. 盤面の体裁（文字・S1個・星1個以上・長方形・サイズが仕様どおり）
     2. 採用検定の再実行: 最短ブロック数が par と一致し、島ごとの
        「ねらいのブロックが役立つ」基準も満たすこと（tools/criteria.mjs と同一ロジック）
     3. IDの一意性・面数（6島×3難易度×9面 = 162）
   使い方: npm run verify（1つでもFAILなら終了コード1。deployはverifyを通らないと走らない） */

import { GEN_STAGES } from "../src/data/stages.gen.js";
import { SPEC, accept } from "./criteria.mjs";

let fail = 0;
const note = (id, msg) => { console.log(`FAIL ${id}: ${msg}`); fail++; };

const ids = new Set();
const grids = new Set();
const t0 = Date.now();

for (const st of GEN_STAGES) {
  const spec = SPEC[st.island] && SPEC[st.island][st.difficulty];
  if (!spec) { note(st.id, `未知の島/難易度 ${st.island}/${st.difficulty}`); continue; }
  if (ids.has(st.id)) note(st.id, "IDが重複");
  ids.add(st.id);
  const gkey = st.grid.join("/") + "|" + st.dir;
  if (grids.has(gkey)) note(st.id, "盤面が重複");
  grids.add(gkey);

  const w = st.grid[0].length, h = st.grid.length;
  if (w !== spec.w || h !== spec.h) note(st.id, `サイズ不一致 ${w}x${h} (仕様 ${spec.w}x${spec.h})`);
  if (!st.grid.every(r => r.length === w)) note(st.id, "行の長さが不揃い");
  const flat = st.grid.join("");
  if ((flat.match(/S/g) || []).length !== 1) note(st.id, "Sが1個でない");
  if ((flat.match(/\*/g) || []).length < 1) note(st.id, "星が0個");
  if (/[^S.#*]/.test(flat)) note(st.id, "未知の文字");
  if (![0, 1, 2, 3].includes(st.dir)) note(st.id, `dirが不正 ${st.dir}`);

  const par = accept(st.island, spec, { grid: st.grid, dir: st.dir });
  if (par === null) note(st.id, "採用検定に不合格（最短がparと不一致 or 島の基準を満たさない）");
  else if (par !== st.par) note(st.id, `parが最短と不一致: par=${st.par} 最短=${par}`);
}

const expected = 6 * 3 * 9;
if (GEN_STAGES.length !== expected) note("全体", `面数が${GEN_STAGES.length}（期待 ${expected}）`);

console.log(fail === 0
  ? `全${GEN_STAGES.length}面 PASS（${Date.now() - t0}ms）`
  : `FAIL ${fail}件`);
process.exit(fail === 0 ? 0 : 1);
