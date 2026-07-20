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

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";

import { SAMPLES } from "../src/data/studio-samples.js";
import { DEFS, PALORDER, SOUNDS, STUDIO_BG_IDS } from "../src/data/studio-blocks-defs.js";
import { createEngine, TICK, LCOLS, LROWS, SIZE_STEPS, SIZE_INIT } from "../src/workshop/engine.js";
import {
  G, ANIM, CHIP_STYLE, pathBody, pathHat, pathC, gloss, blockH, stackH, chipY, labelY,
} from "../src/workshop/geometry.js";
import {
  ensureSpace, sceneNonEmpty, nextWorkName, saveWork, stashDraft, deleteWork,
} from "../src/workshop/store.js";

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

/* ===== 保存モデル（workshop/store.js）の純ロジック試験（段階A S1・期待値直書き）=====
   分離前の works.js の挙動（段階2 §2・b5f/b5m 実測合格）を仕様として固定する。 */
function storeTests() {
  const ok = (cond, msg) => { if (!cond) ng(`store: ${msg}`); };
  const SPACE = { key: "studio", worksMax: 3, nameMax: 8, namePrefix: "さくひん" };
  const mkHooks = () => {
    const h = { persisted: 0, grants: [], persist: () => h.persisted++, today: () => "2026-07-19" };
    h.grantForNewSave = (p, w, d) => { h.grants.push(w.id); return { xp: 10, coins: 0, hit: [] }; };
    return h;
  };
  const stack = blocks => ({ x: 40, y: 40, blocks });
  const FULL = [{ type: "hat", id: 1 }, { type: "jump", n: 1, id: 2 }]; // ガードを通る中身
  const scene = () => ({ bg: "sougen", chars: [{ kind: { type: "player" }, x: 5, y: 3, stacks: [stack(FULL)] }] });

  // 空作品ガード
  ok(sceneNonEmpty(scene().chars) === true, "きっかけ+1枚 は空でない");
  ok(sceneNonEmpty([]) === false, "キャラなし は空");
  ok(sceneNonEmpty([{ stacks: [stack([{ type: "hat", id: 1 }])] }]) === false, "きっかけだけ は空");
  ok(sceneNonEmpty([{ stacks: [stack([{ type: "jump", n: 1, id: 1 }])] }]) === false, "きっかけ無し浮きスタック は空");

  // 連番命名
  ok(nextWorkName([], "さくひん") === "さくひん1", "空の棚 → さくひん1");
  ok(nextWorkName([{ name: "さくひん1" }, { name: "さくひん3" }, { name: "じさく" }], "さくひん") === "さくひん4", "最大+1（別名は無視）");

  // 新規保存（名前空 → 連番・grant が通る・persist される）
  {
    const p = {}, h = mkHooks();
    const r = saveWork(p, SPACE, scene(), "", null, h);
    ok(r.ok && p.studio.works.length === 1, "新規保存で works+1");
    ok(p.studio.works[0].name === "さくひん1", "名前空 → さくひん1");
    ok(p.studio.works[0].savedAt === "2026-07-19", "savedAt=hooks.today()");
    ok(p.studio.works[0].remixOf === null, "origin無し → remixOf null");
    ok(r.grant && r.grant.xp === 10 && h.grants.length === 1, "新規は grant が呼ばれ戻り値が返る");
    ok(h.persisted >= 1, "persist が呼ばれる");
    // みほん origin → remixOf 記録
    const r2 = saveWork(p, SPACE, scene(), "リミックス", { type: "sample", id: "dance" }, h);
    ok(p.studio.works[1].remixOf === "dance", "sample origin → remixOf 記録");
    // 名前は trim + nameMax 切り詰め
    saveWork(p, SPACE, scene(), " あいうえおかきくけこ ", null, h);
    ok(p.studio.works[2].name === "あいうえおかきく", "名前 trim + 8文字 slice");
    // 満杯
    const r4 = saveWork(p, SPACE, scene(), "", null, h);
    ok(!r4.ok && r4.reason === "full" && p.studio.works.length === 3, "worksMax で {ok:false, full}");
    ok(h.grants.length === 3, "満杯時は grant が呼ばれない");
    // 上書き（origin=work）: 件数不変・grant null・名前/日付更新・id不変
    const id0 = p.studio.works[0].id;
    const r5 = saveWork(p, SPACE, { bg: "jungle", chars: scene().chars }, "なおした", { type: "work", id: id0 }, h);
    ok(r5.ok && r5.id === id0 && r5.grant === null, "上書きは grant null・同id");
    ok(p.studio.works.length === 3 && p.studio.works[0].name === "なおした" && p.studio.works[0].bg === "jungle", "上書きで件数不変・内容更新");
    ok(h.grants.length === 3, "上書きでは grant が呼ばれない");
  }
  // origin=work だが元作品が消えている → 新規に落ちる
  {
    const p = {}, h = mkHooks();
    const r = saveWork(p, SPACE, scene(), "", { type: "work", id: "きえたid" }, h);
    ok(r.ok && p.studio.works.length === 1 && r.grant, "元作品消失 → 新規として保存・grant あり");
  }
  // stashDraft
  {
    ok(stashDraft(null, SPACE, mkHooks()).ok === true, "profile無し → ok");
    const p = {}, h = mkHooks();
    ok(stashDraft(p, SPACE, h).ok === true && p.studio.draft === null, "draft無し → ok");
    // 空っぽの draft → 黙って捨てる
    p.studio.draft = { bg: "sougen", chars: [{ stacks: [stack([{ type: "hat", id: 1 }])] }], origin: { type: "new" } };
    ok(stashDraft(p, SPACE, h).ok && p.studio.draft === null && p.studio.works.length === 0, "空draft → 捨てて棚は増えない");
    // 中身のある new draft → 「さくひん連番」で退避
    p.studio.draft = { bg: "sougen", chars: scene().chars, origin: { type: "new" } };
    ok(stashDraft(p, SPACE, h).ok && p.studio.works.length === 1 && p.studio.works[0].name === "さくひん1" && p.studio.draft === null,
      "new draft → さくひん連番で退避・draft null");
    // work origin の draft → 上書き（名前維持・件数不変）
    const id0 = p.studio.works[0].id;
    p.studio.draft = { bg: "jungle", chars: scene().chars, origin: { type: "work", id: id0 } };
    ok(stashDraft(p, SPACE, h).ok && p.studio.works.length === 1 && p.studio.works[0].name === "さくひん1"
      && p.studio.works[0].bg === "jungle" && p.studio.draft === null, "work draft → 上書き退避（名前維持）");
    // 満杯で新規行きの draft → ブロック（draft は残す）
    p.studio.works = [1, 2, 3].map(i => ({ id: "w" + i, name: "さくひん" + i }));
    p.studio.draft = { bg: "sougen", chars: scene().chars, origin: { type: "new" } };
    const r = stashDraft(p, SPACE, h);
    ok(!r.ok && r.reason === "full" && p.studio.draft !== null, "満杯 → {ok:false, full}・draft は失わない");
    // deleteWork
    deleteWork(p, SPACE, "w2", h);
    ok(p.studio.works.map(w => w.id).join() === "w1,w3", "deleteWork で対象だけ消える");
  }
  // gameConfig の presence ガード（stage1 §5）: scene に無ければキーが増えない（studio 不変）・あれば新規/上書き/退避で運ばれる
  {
    const p = {}, h = mkHooks();
    saveWork(p, SPACE, scene(), "", null, h);
    ok(!("gameConfig" in p.studio.works[0]), "gameConfig 無しの scene → 作品にキーが増えない（studio 経路不変）");
    const GC = { scoreShow: true, clear: { type: "score", param: 10 }, gameOver: null };
    const r = saveWork(p, SPACE, { ...scene(), gameConfig: GC }, "げーむ", null, h);
    ok(JSON.stringify(p.studio.works[1].gameConfig) === JSON.stringify(GC), "gameConfig 付き scene → 新規作品に載る");
    const GC2 = { ...GC, clear: { type: "score", param: 25 } };
    saveWork(p, SPACE, { ...scene(), gameConfig: GC2 }, "げーむ", { type: "work", id: r.id }, h);
    ok(p.studio.works[1].gameConfig.clear.param === 25, "上書き保存でも gameConfig が更新される");
    p.studio.draft = { bg: "sougen", chars: scene().chars, origin: { type: "new" }, gameConfig: GC };
    stashDraft(p, SPACE, h);
    ok(JSON.stringify(p.studio.works[2].gameConfig) === JSON.stringify(GC) && p.studio.draft === null,
      "draft の gameConfig が退避先の作品に載る");
  }
}
storeTests();

/* ===== 境界の機械チェック（段階A §4）=====
   共通部品（src/workshop/*・WorkshopEditor/WorkshopHome）がスタジオ固有物を import したら FAIL。
   許容: data/studio-blocks*.js・data/studio-bgs.js（共有カタログ）・storage.js の汎用関数・React・
   汎用コンポーネント（StudioBlock/StudioThumb/ParentGuide/PlayerAvatar）。
   禁止: src/studio/（works/mode）・みほん・growth（教育接続）・保護者ガイド原稿・スタジオ内装画像。 */
function boundaryTests() {
  const SRC = join(dirname(fileURLToPath(import.meta.url)), "..", "src");
  const files = [
    ...readdirSync(join(SRC, "workshop")).map(f => join(SRC, "workshop", f)),
    join(SRC, "components", "WorkshopEditor.jsx"),
    join(SRC, "components", "WorkshopHome.jsx"),
  ];
  const FORBID = ["/studio/", "studio-samples", "growth", "parent-guide", "studio-interior"];
  for (const f of files) {
    for (const line of readFileSync(f, "utf8").split("\n")) {
      const m = /^\s*(?:import|export)\s[^;]*?from\s+["']([^"']+)["']/.exec(line);
      if (!m) continue;
      for (const bad of FORBID) if (m[1].includes(bad)) {
        ng(`境界: 共通部品 ${basename(f)} がモード固有物 "${m[1]}" を import している（§4）`);
      }
    }
  }
}
boundaryTests();

const update = process.argv.includes("--update");
const current = collect();

if (update) {
  if (fail) { console.log(`\n❌ 保存モデル試験 ${fail}件 FAIL のため baseline は書かない`); process.exit(1); }
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
// ジオメトリ: 定数・入れ子計測は完全一致。paths/measures/widths は DEFS と同じ向き
// （既存＝スタジオ18種ぶんの変更・削除は FAIL／新カード追加ぶんは許容・段階1で方針を明文化）
exact("ジオメトリ定数",
  { G: base.geometry.G, ANIM: base.geometry.ANIM, CHIP_STYLE: base.geometry.CHIP_STYLE, nestedStackH: base.geometry.nestedStackH },
  { G: current.geometry.G, ANIM: current.geometry.ANIM, CHIP_STYLE: current.geometry.CHIP_STYLE, nestedStackH: current.geometry.nestedStackH });
for (const w of base.geometry.widths) {
  if (!current.geometry.widths.includes(w)) ng(`ジオメトリ: 既存の幅 ${w} が消えている`);
}
for (const [k, v] of Object.entries(base.geometry.paths)) {
  if (!(k in current.geometry.paths)) { ng(`ジオメトリ: 既存パス ${k} が消えている`); continue; }
  exact(`ジオメトリパス ${k}`, v, current.geometry.paths[k]);
}
for (const [k, v] of Object.entries(base.geometry.measures)) {
  if (!(k in current.geometry.measures)) { ng(`ジオメトリ: 既存計測 ${k} が消えている`); continue; }
  exact(`ジオメトリ計測 ${k}`, v, current.geometry.measures[k]);
}
exact("みほん4本のシリアライズ", base.samples, current.samples);
for (const id of Object.keys(base.traces)) {
  if (!current.traces[id]) { ng(`トレース「${id}」: みほんが消えている`); continue; }
  exact(`エンジントレース「${id}」（${TICKS}拍）`, base.traces[id], current.traces[id]);
}

if (fail === 0) {
  const n = Object.values(base.traces).reduce((a, t) => a + t.length, 0);
  console.log(`スタジオ回帰 PASS（みほん4本シリアライズ／DEFS18種／ジオメトリ定数+パス${Object.keys(base.geometry.paths).length}本／エンジントレース${TICKS}拍×${Object.keys(base.traces).length}本=計${n}イベント／保存モデル試験）`);
  process.exit(0);
} else {
  console.log(`\n❌ スタジオ回帰 ${fail}件 FAIL（等価変換が破れている。--update で上書きせず、原因を直すこと）`);
  process.exit(1);
}
