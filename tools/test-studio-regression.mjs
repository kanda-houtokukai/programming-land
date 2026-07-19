/* つくるスタジオ 回帰テスト（段階A §2・gamelab-implementation-stageA.md が正本）。
   目的: 共通化リファクタが「等価変換」であることの機械保証。
   リファクタ前の現行コードから採取したベースライン（tools/studio-baseline.json）と、
   現在の実装の出力を照合する。npm run verify のチェーン7本目。

   照合の向き:
   - みほん4本・ジオメトリ・エンジン定数・エンジントレース = 完全一致（変えたら FAIL）
   - カード定義 DEFS = 既存 type の変更・削除は FAIL／新 type の追加は許容（段階1の新カードを妨げない）
   - PALORDER / SOUNDS / STUDIO_BG_IDS = ベースラインが先頭部分列として保たれていること（追加は末尾のみ許容）

   ベースラインの再生成: node tools/test-studio-regression.mjs --update
   ★段階Aの最中に --update を使ったら等価変換違反（初回生成と、将来仕様を意図的に変えるときだけ）。 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { SAMPLES } from "../src/data/studio-samples.js";
import { DEFS, PALORDER, SOUNDS, STUDIO_BG_IDS } from "../src/data/studio-blocks-defs.js";
import { createEngine, TICK, LCOLS, LROWS, SIZE_STEPS, SIZE_INIT } from "../src/studio/engine.js";
import {
  G, ANIM, CHIP_STYLE, pathBody, pathHat, pathC, gloss, blockH, stackH, chipY, labelY,
} from "../src/studio/geometry.js";

const BASELINE_PATH = join(dirname(fileURLToPath(import.meta.url)), "studio-baseline.json");
const TICKS = 60; // トレースの拍数（§2-1）

/* ===== 採取 ===== */

// ジオメトリ: パス文字列と計測値。幅は DEFS の実使用幅全部＋固定2点（実使用外の代表値）
function collectGeometry() {
  const widths = [...new Set([...Object.values(DEFS).map(d => d.w), 140, 220])].sort((a, b) => a - b);
  const paths = {};
  for (const w of widths) {
    paths["body:" + w] = pathBody(w);
    paths["hat:" + w] = pathHat(w);
    paths["c:" + w + ":mouth"] = pathC(w, G.MOUTH, false);
    paths["c:" + w + ":mouth:flat"] = pathC(w, G.MOUTH, true);
    paths["c:" + w + ":96"] = pathC(w, 96, false);
    paths["gloss:" + w] = gloss(w, false);
    paths["glossHat:" + w] = gloss(w, true);
  }
  const measures = {};
  const kids = [{ type: "move", n: 3 }, { type: "jump", n: 1 }]; // 容器の子2個の代表
  for (const type of Object.keys(DEFS)) {
    const d = DEFS[type];
    const b = d.shape === "c" ? { type, children: [] } : { type };
    measures[type] = {
      blockH: blockH(b),
      blockH2: d.shape === "c" ? blockH({ type, children: kids }) : null, // 子2個入り
      chipY: chipY(type),
      labelY: labelY(type),
    };
  }
  // 入れ子（容器の中の容器）の計測: ずっと > くりかえし > みぎへ
  const nested = [{ type: "forever", children: [{ type: "repeat", n: 2, children: [{ type: "move", n: 3 }] }] }];
  return { G, ANIM, CHIP_STYLE, widths, paths, measures, nestedStackH: stackH(nested) };
}

/* エンジントレース: みほんを verify-studio と同じ作法（ローカル採番 nid=1..）で投入。
   採番が決定的＝ID正規化は不要（★実装判断: 指示書§2-1の正規化は採番の決定化で満たす）。
   イベント列: ["t", 拍] マーカーの後に、その拍で起きた全コールバックが並ぶ。 */
const TAPS = { tap: [[5, "k0"], [6, "k1"], [8, "k0"], [9, "k1"]] }; // tap再発火＋きえてる間の無視も踏む

/* ★実装判断（S0セルフテストで判明した穴の補強）: みほん4本は60拍の間に一度も
   ステージの端に到達せず、端で止まる・大きさ上下限・入れ子容器などの経路がトレースに乗らない
   （それらは test-studio-engine.mjs が別途守っているが、この回帰単体でも持つ）。
   合成シナリオ「_synth」で 右端/上端/下端bump・歩数破棄・home・grow上限・入れ子深さ2・
   hide中のwait・ぶつかり発火・タップ発火を1本のトレースに焼き込む。 */
const SYNTH = {
  id: "_synth",
  chars: [
    { x: 10, y: 7, stacks: [{ blocks: [
      { type: "hat" }, { type: "move", n: 3 },  // 右端: 1歩で x11 到達→2拍目bump・残り歩数破棄
      { type: "moveU", n: 2 },                  // 上端: y7 が最上段→即bump
      { type: "home" },
      { type: "grow" }, { type: "grow" }, { type: "grow" }, // 初期1倍(idx2)→1.5→2→上限で素通し
      { type: "shrink" },
      { type: "repeat", n: 2, children: [{ type: "repeat", n: 2, children: [{ type: "sound", s: 0 }] }] }, // 入れ子深さ2
      { type: "hide" }, { type: "wait", n: 2 }, { type: "show" }, { type: "sound", s: 2 },
    ] }] },
    { x: 0, y: 0, stacks: [
      { blocks: [{ type: "hat" }, { type: "move", n: 2 }] }, // x2 へ → k2 と重なって双方bump発火
      { blocks: [{ type: "bump" }, { type: "sound", s: 1 }, { type: "jump", n: 1 }] },
      { blocks: [{ type: "tap" }, { type: "spin", n: 1 }] },
    ] },
    { x: 2, y: 0, stacks: [
      { blocks: [{ type: "bump" }, { type: "moveD", n: 1 }] }, // 下端: y0 から下へ→即bump
    ] },
  ],
};
const TRACE_DEFS = [...SAMPLES, SYNTH];
const SYNTH_TAPS = [[12, "k1"], [30, "k1"]];
function traceSample(s) {
  let nid = 1;
  const withIds = JSON.parse(JSON.stringify(s.chars));
  const assign = l => { for (const b of l || []) { b.id = nid++; assign(b.children); } };
  for (const c of withIds) for (const st of c.stacks || []) assign(st.blocks);

  const ev = [];
  const eng = createEngine(withIds.map((c, i) => ({ key: "k" + i, x: c.x, y: c.y, stacks: c.stacks })), {
    onUpdate: (ch, cause) => ev.push(["up", ch.key, cause, ch.x, ch.y, ch.sizeIdx, ch.visible ? 1 : 0]),
    onFx: (key, fx) => ev.push(["fx", key, fx.type, fx.s ?? null]),
    onGlow: (id, on) => ev.push(["gl", id, on ? 1 : 0]),
    onDone: natural => ev.push(["done", natural ? 1 : 0]),
  });
  ev.push(["start", eng.start() ? 1 : 0]);
  const taps = s.id === "_synth" ? SYNTH_TAPS : (TAPS[s.id] || []);
  for (let t = 1; t <= TICKS; t++) {
    ev.push(["t", t]);
    for (const [tt, key] of taps) if (tt === t) { ev.push(["tap", key]); eng.tap(key); }
    eng.tick();
  }
  ev.push(["stopCall"]);
  eng.stop(); // ■: 全初期化のイベントまで含めて照合
  return ev;
}

function collect() {
  return {
    version: 1,
    note: "段階A回帰ベースライン（リファクタ前の現行コードから採取・gamelab-implementation-stageA.md §2）",
    blocks: { defs: DEFS, palorder: PALORDER, sounds: SOUNDS, bgIds: STUDIO_BG_IDS },
    engineConst: { TICK, LCOLS, LROWS, SIZE_STEPS, SIZE_INIT },
    geometry: collectGeometry(),
    samples: SAMPLES,
    traces: Object.fromEntries(TRACE_DEFS.map(s => [s.id, traceSample(s)])),
  };
}

/* ===== 照合 ===== */

let fail = 0;
const ng = msg => { console.log(`✗ FAIL ${msg}`); fail++; };

// 最初に食い違った場所（パス）を返す。一致なら null
function firstDiff(a, b, path = "") {
  if (a === b) return null;
  if (typeof a !== typeof b || a === null || b === null || typeof a !== "object") {
    return `${path || "(root)"}: baseline=${JSON.stringify(a)} → now=${JSON.stringify(b)}`;
  }
  if (Array.isArray(a) !== Array.isArray(b)) return `${path}: 配列/オブジェクトの型が違う`;
  if (Array.isArray(a)) {
    if (a.length !== b.length) return `${path}: 長さ ${a.length} → ${b.length}`;
    for (let i = 0; i < a.length; i++) { const d = firstDiff(a[i], b[i], `${path}[${i}]`); if (d) return d; }
    return null;
  }
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) { const d = firstDiff(a[k], b[k], path ? `${path}.${k}` : k); if (d) return d; }
  return null;
}

const exact = (name, base, now) => { const d = firstDiff(base, now); if (d) ng(`${name}: ${d}`); };
const prefix = (name, base, now) => {
  if (!Array.isArray(now) || now.length < base.length) { ng(`${name}: 既存要素が減っている（${base.length}→${now && now.length}）`); return; }
  for (let i = 0; i < base.length; i++) if (JSON.stringify(base[i]) !== JSON.stringify(now[i])) {
    ng(`${name}[${i}]: ${JSON.stringify(base[i])} → ${JSON.stringify(now[i])}（既存の変更・並び替えは禁止／追加は末尾のみ）`); return;
  }
};

const update = process.argv.includes("--update");
const current = collect();

if (update) {
  writeFileSync(BASELINE_PATH, JSON.stringify(current, null, 1));
  const n = Object.values(current.traces).reduce((a, t) => a + t.length, 0);
  console.log(`studio-baseline.json を再生成（トレース ${n}イベント・パス ${Object.keys(current.geometry.paths).length}本・DEFS ${Object.keys(current.blocks.defs).length}種）`);
  console.log("★段階Aの最中の --update は等価変換違反。意図的な仕様変更のときだけ使うこと。");
  process.exit(0);
}

let base;
try {
  base = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
} catch (e) {
  console.log(`✗ FAIL ベースライン ${BASELINE_PATH} が読めない（初回は --update で生成）: ${e.message}`);
  process.exit(1);
}

// カード定義: 既存typeの変更・削除=FAIL／追加=許容
for (const [type, def] of Object.entries(base.blocks.defs)) {
  if (!DEFS[type]) { ng(`DEFS.${type}: 既存カードが削除されている`); continue; }
  exact(`DEFS.${type}`, def, DEFS[type]);
}
prefix("PALORDER", base.blocks.palorder, PALORDER);
prefix("SOUNDS", base.blocks.sounds, SOUNDS);
prefix("STUDIO_BG_IDS", base.blocks.bgIds, STUDIO_BG_IDS);

exact("エンジン定数", base.engineConst, current.engineConst);
exact("ジオメトリ", base.geometry, current.geometry);
exact("みほん4本のシリアライズ", base.samples, current.samples);
for (const id of Object.keys(base.traces)) {
  if (!current.traces[id]) { ng(`トレース「${id}」: みほんが消えている`); continue; }
  exact(`エンジントレース「${id}」（${TICKS}拍）`, base.traces[id], current.traces[id]);
}

if (fail === 0) {
  const n = Object.values(base.traces).reduce((a, t) => a + t.length, 0);
  console.log(`スタジオ回帰 PASS（みほん4本シリアライズ／DEFS18種／ジオメトリ定数+パス${Object.keys(base.geometry.paths).length}本／エンジントレース${TICKS}拍×${Object.keys(base.traces).length}本=計${n}イベント）`);
  process.exit(0);
} else {
  console.log(`\n❌ スタジオ回帰 ${fail}件 FAIL（等価変換が破れている。--update で上書きせず、原因を直すこと）`);
  process.exit(1);
}
