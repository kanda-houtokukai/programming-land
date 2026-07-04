/* P5完了条件: 書き出したJSONを読み込むと、増えたバッジ・拡張した記録まで完全復元できること。
   storage.js の export/import を localStorage シムで実際に走らせ、往復で全項目が一致するか検証する。
   実行: node tools/test-roundtrip.mjs */

// --- localStorage シム（storage.js は呼び出し時に参照するので import 前に用意）---
class LS {
  constructor() { this.m = new Map(); }
  getItem(k) { return this.m.has(k) ? this.m.get(k) : null; }
  setItem(k, v) { this.m.set(k, String(v)); }
  removeItem(k) { this.m.delete(k); }
}
globalThis.localStorage = new LS();

const { createProfile, saveProfile, loadProfile, exportProfileJSON, importProfileJSON } = await import("../src/storage.js");
const { BADGES } = await import("../src/data/badges.js");

let fail = 0;
const ok = (cond, msg) => { console.log(`${cond ? "✓" : "✗ FAIL"} ${msg}`); if (!cond) fail++; };

// 1) プロファイルを作り、P5で増えた項目を含む「やり込んだ記録」を書き込む
const p = createProfile("たろう", "🐯");
p.puzzle.stars = { "e1-1": 3, "e1-2": 2, "n1-1": 3, "h1-1": 1, "h3-2": 3 }; // 難易度別・★3を含む
p.quiz.best = { "junban:hard": 5, "kimari:easy": 4 };
p.typing.best = { kotoba: { acc: 98, kpm: 27 }, tanbun: { acc: 90, kpm: 21 } };
p.art.gallery = [{ id: 1, date: "2026-07-05", cmds: ["fwd", "right"], name: "さくひん 1" }];
p.log = { "2026-07-03": { puzzle: 2 }, "2026-07-04": { quiz: 1, art: 1 }, "2026-07-05": { puzzle: 3 } };
p.partner = { species: "leaf", xp: 5, level: 7 };
p.dex = ["leaf-1", "leaf-2"];
// 新旧まざったバッジ配列（新規ID typeFast/hard3_5/w4 等を含む）
p.badges = ["first", "w1", "w4", "star10", "type1", "typeFast", "hard3_5", "quizHardAll", "art1"];
saveProfile(p);

// 2) 書き出し
const json = exportProfileJSON(loadProfile(p.id));
ok(json.includes("typeFast") && json.includes("hard3_5"), "書き出しJSONに新バッジIDが含まれる");

// 3) 別端末を想定して localStorage をまっさらにし、読み込む
globalThis.localStorage = new LS();
const { importProfileJSON: importFresh, loadProfile: loadFresh } = await import("../src/storage.js?fresh=1");
const r = importFresh(json);
ok(r.ok, "読み込み成功");
const q = loadFresh(r.profile.id);

// 4) 全項目が完全復元されているか
ok(q.name === "たろう" && q.avatar === "🐯", "名前・アバター");
ok(JSON.stringify(q.puzzle.stars) === JSON.stringify(p.puzzle.stars), "パズル★（難易度別・★3含む）");
ok(JSON.stringify(q.quiz.best) === JSON.stringify(p.quiz.best), "クイズ記録");
ok(JSON.stringify(q.typing.best) === JSON.stringify(p.typing.best), "タイピング記録（acc/kpm）");
ok(JSON.stringify(q.art.gallery) === JSON.stringify(p.art.gallery), "おえかき作品");
ok(JSON.stringify(q.log) === JSON.stringify(p.log), "日別ログ");
ok(JSON.stringify(q.partner) === JSON.stringify(p.partner), "相棒（species/xp/level）");
ok(JSON.stringify(q.dex) === JSON.stringify(p.dex), "ずかん（dex）");
ok(JSON.stringify(q.badges.slice().sort()) === JSON.stringify(p.badges.slice().sort()), "バッジ配列（新規IDまで完全一致）");

// 5) 復元後、バッジ判定が矛盾しないか（配列に無いが条件を満たすものだけ後から追加される想定）
const stored = new Set(q.badges);
const allValidIds = new Set(BADGES.map(b => b.id));
ok([...stored].every(id => allValidIds.has(id)), "保存バッジIDはすべて現行BADGESに存在（孤児ID無し）");

console.log(fail === 0 ? "\n✅ ラウンドトリップ 全項目一致（P5完了条件クリア）" : `\n❌ ${fail}件 不一致`);
process.exit(fail === 0 ? 0 : 1);
