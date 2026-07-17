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
// ※ badges.js は battle.js 経由で画像を import するため node では読めない → 孤児IDチェックは省略（往復の完全復元が本題）

let fail = 0;
const ok = (cond, msg) => { console.log(`${cond ? "✓" : "✗ FAIL"} ${msg}`); if (!cond) fail++; };

// 1) プロファイルを作り、P5で増えた項目を含む「やり込んだ記録」を書き込む
const p = createProfile("たろう", "boy"); // 第3波①: 第2引数は avatar（動物絵文字）→ character（"boy"|"girl"）に変更
p.puzzle.stars = { "e1-1": 3, "e1-2": 2, "n1-1": 3, "h1-1": 1, "h3-2": 3 }; // 難易度別・★3を含む
p.quiz.best = { "junban:hard": 5, "kimari:easy": 4 };
p.typing.best = { kotoba: { acc: 98, kpm: 27 }, tanbun: { acc: 90, kpm: 21 } };
p.art.gallery = [{ id: 1, date: "2026-07-05", cmds: ["fwd", "right"], name: "さくひん 1" }];
p.log = { "2026-07-03": { puzzle: 2 }, "2026-07-04": { quiz: 1, art: 1 }, "2026-07-05": { puzzle: 3 } };
p.partner = { species: "moko", xp: 5, level: 7 }; // ★旧形式＋旧ID（b4f移行の入力を再現）
p.dex = ["moko-1", "moko-2"];
// 新旧まざったバッジ配列（新規ID typeFast/hard3_5/w4/battle1/shopper 等を含む）
p.badges = ["first", "w1", "w4", "star10", "type1", "typeFast", "hard3_5", "quizHardAll", "art1", "battle1", "shopper"];
// P6フェーズ2の項目
p.battle = { defeated: ["slime", "mushroom", "ghost"], best: { easy: 2, normal: 1 }, towerBest: { easy: 7 } }; // towerBest=06-A タワー最高フロア
p.coins = 137;
p.coinsGranted = true;
p.items = { drink: 2, glasses: 1, shield: 3 };
p.cosmetics = { owned: ["deco_hat", "deco_crown", "bg_space"], equipped: { deco: "deco_crown", bg: "bg_space" } };
p.shopUsed = true;
// そだったちからF2: 前回%（差分演出の基準）
p.powers = { prev: { junji: 66, repeat: 33, think: 40, keyboard: 45, create: 20 } };
// 第2便②: 当日のコイン基準（coinDay）。※growth.js は画像import経由でnode不可のためヘルパー挙動はブラウザで確認・ここでは往復保持のみ
p.coinDay = { date: "2026-07-16", quiz: { "junban:easy": 4 }, puzzle: { "e1-1": 3 }, battle: { slime: true }, typing: { kotoba: { acc: 98, kpm: 27 } } };
// 第3波①: 主人公キャラクター＋着せ替え装備
p.character = "girl";
p.dressup = { head: "head_compass", face: null, neck: "neck_bandana", chest: null, waist: null, back: "back_keyboard" };
// b5e つくるスタジオ: 作品（純データ＝背景ID・キャラ配置・ブロック木）と かきかけdraft
p.studio = {
  works: [{
    id: "w1", name: "さくひん1", savedAt: "2026-07-17", remixOf: null, bg: "daichi",
    chars: [{ kind: { type: "mon", id: "mori", stage: 1 }, x: 3, y: 2,
      stacks: [{ x: 40, y: 30, blocks: [{ id: 1, type: "hat" }, { id: 2, type: "repeat", n: 2, children: [{ id: 3, type: "move", n: 3 }] }] }] }],
  }],
  draft: { bg: "arena", sel: 0, origin: { type: "sample", id: "dance" }, name: "だんす", // b5f: origin/name（§2 保存モデル）
    chars: [{ kind: { type: "player" }, x: 5, y: 4, stacks: [{ x: 20, y: 20, blocks: [{ id: 9, type: "tap" }, { id: 10, type: "sound", s: 1 }] }] }] },
};
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
ok(q.name === "たろう", "名前");
ok(JSON.stringify(q.puzzle.stars) === JSON.stringify(p.puzzle.stars), "パズル★（難易度別・★3含む）");
ok(JSON.stringify(q.quiz.best) === JSON.stringify(p.quiz.best), "クイズ記録");
ok(JSON.stringify(q.typing.best) === JSON.stringify(p.typing.best), "タイピング記録（acc/kpm）");
ok(JSON.stringify(q.art.gallery) === JSON.stringify(p.art.gallery), "おえかき作品");
ok(JSON.stringify(q.log) === JSON.stringify(p.log), "日別ログ");
// b4j 相棒スキーマ移行: 旧々 {species:"moko",…} → 新 {active:"mori", owned:[{id,level,xp}], egg:null}（旧ID読み替え込み）
ok(q.partner && q.partner.active === "mori"
  && JSON.stringify(q.partner.owned) === JSON.stringify([{ id: "mori", level: 7, xp: 5 }])
  && q.partner.egg === null && q.partner.species === undefined && q.partner.level === undefined,
  "b4j 相棒移行（旧々{species:moko}→{active:mori, owned:[{id,level:7,xp:5}], egg:null}）");
ok(JSON.stringify(q.dex) === JSON.stringify(["mori-1", "mori-2"]), "ずかん（dex・旧ID moko-* → mori-* に読み替え）");
ok(JSON.stringify(q.badges.slice().sort()) === JSON.stringify(p.badges.slice().sort()), "バッジ配列（新規IDまで完全一致）");
// P6フェーズ2: コイン・アイテム・きせかえ・討伐記録
ok(q.coins === 137 && q.coinsGranted === true, "コイン枚数・換算フラグ");
ok(JSON.stringify(q.items) === JSON.stringify(p.items), "バトルアイテム所持数");
ok(JSON.stringify(q.cosmetics) === JSON.stringify(p.cosmetics), "きせかえ（所持・装備）");
ok(JSON.stringify(q.battle) === JSON.stringify(p.battle), "討伐記録（defeated/best/towerBest）");
// 06-A: 旧セーブ（towerBest なし）はマージで {} が補完される
{
  const legacy = createProfile("むかしのセーブ", "boy");
  const raw = JSON.parse(localStorage.getItem(`progland:v2:profile:${legacy.id}`));
  delete raw.battle.towerBest;
  localStorage.setItem(`progland:v2:profile:${legacy.id}`, JSON.stringify(raw));
  const migrated = loadProfile(legacy.id);
  ok(migrated.battle && typeof migrated.battle.towerBest === "object" && Object.keys(migrated.battle.towerBest).length === 0,
    "06-A 旧セーブに towerBest が {} で補完される（デフォルト値マージ）");
}
// b4j 相棒移行の追加ケース: 旧ID各種＋b4f共有level形式＋最新形式の素通し
let l2id; // 第2便②のcoinDayチェックでスロットを流用するため id を外に出す（上限4人＝新規作成できない）
{
  const l2 = createProfile("うみのこ", "girl");
  l2id = l2.id;
  const raw2 = JSON.parse(localStorage.getItem(`progland:v2:profile:${l2.id}`));
  raw2.partner = { species: "shizuku", xp: 1, level: 3 };
  raw2.dex = ["shizuku-1", "hoshi-1"];
  localStorage.setItem(`progland:v2:profile:${l2.id}`, JSON.stringify(raw2));
  const m2 = loadFresh(l2.id);
  ok(m2.partner.active === "mizu" && JSON.stringify(m2.partner.owned) === JSON.stringify([{ id: "mizu", level: 3, xp: 1 }])
    && JSON.stringify(m2.dex) === JSON.stringify(["mizu-1", "denki-1"]),
    "b4j 旧ID読み替え（shizuku→mizu／hoshi→denki・dex込み）");

  // b4f〜b4i形式（owned=id配列＋共有level13=すでにstage3）→ 全員がlevel13を引き継ぎ・★eggは付与されない
  const l3 = createProfile("あたらしいこ", "boy");
  const raw3 = JSON.parse(localStorage.getItem(`progland:v2:profile:${l3.id}`));
  raw3.partner = { active: "denki", owned: ["denki", "iwa"], level: 13, xp: 2 };
  localStorage.setItem(`progland:v2:profile:${l3.id}`, JSON.stringify(raw3));
  const m3 = loadFresh(l3.id);
  ok(m3.partner.active === "denki"
    && JSON.stringify(m3.partner.owned) === JSON.stringify([{ id: "denki", level: 13, xp: 2 }, { id: "iwa", level: 13, xp: 2 }])
    && m3.partner.egg === null && m3.partner.level === undefined,
    "b4j b4f形式（共有level13）→ 全員level引き継ぎ＋★stage3既存でも egg=null（誤付与なし）");

  // 最新形式（相棒ごとlevel＋孵化ゲージつき）は そのまま往復
  raw3.partner = { active: "denki", owned: [{ id: "denki", level: 12, xp: 3 }, { id: "iwa", level: 2, xp: 0 }], egg: { xp: 15 } };
  localStorage.setItem(`progland:v2:profile:${l3.id}`, JSON.stringify(raw3));
  const m5 = loadFresh(l3.id);
  ok(m5.partner.active === "denki"
    && JSON.stringify(m5.partner.owned) === JSON.stringify([{ id: "denki", level: 12, xp: 3 }, { id: "iwa", level: 2, xp: 0 }])
    && m5.partner.egg && m5.partner.egg.xp === 15,
    "b4j 最新形式 {owned:[{id,level,xp}], egg:{xp}} は そのまま往復（ゲージ保持）");

  // partner=null（スターター未選択）: 上限4人のため l2 のスロットを上書きして確認
  raw2.partner = null;
  localStorage.setItem(`progland:v2:profile:${l2.id}`, JSON.stringify(raw2));
  const m4 = loadFresh(l2.id);
  ok(m4.partner === null, "b4j partner=null（スターター未選択）は null のまま");
}
ok(q.shopUsed === true, "ショップ利用フラグ");
// 第2便②: coinDay（当日コイン基準）が往復で保持される・無い旧セーブは undefined のまま（初回アクセスでヘルパーが作る＝移行不要）
ok(JSON.stringify(q.coinDay) === JSON.stringify(p.coinDay), "coinDay（当日コイン基準）の往復保持");
{
  // 旧セーブ（coinDayフィールド無し）: 既存スロット l2 を流用（プロファイル上限4のため新規作成しない）
  const raw2b = JSON.parse(localStorage.getItem(`progland:v2:profile:${l2id}`));
  delete raw2b.coinDay;
  localStorage.setItem(`progland:v2:profile:${l2id}`, JSON.stringify(raw2b));
  const mN = loadFresh(l2id);
  ok(mN.coinDay === undefined, "coinDay の無い旧セーブは undefined のまま読める（初回アクセス時にヘルパーが生成）");
}
ok(JSON.stringify(q.powers) === JSON.stringify(p.powers), "そだったちからF2 前回%（powers.prev）");
ok(q.character === "girl" && JSON.stringify(q.dressup) === JSON.stringify(p.dressup), "第3波 主人公キャラ＋着せ替え装備（character/dressup）");
// b5e つくるスタジオ: 入れ子ブロック木まで完全往復＋studioの無い旧セーブはデフォルト {works:[], draft:null} 補完
ok(JSON.stringify(q.studio) === JSON.stringify(p.studio), "b5e つくるスタジオ（works+draft・入れ子ブロック木まで完全往復）");
{
  const rawS = JSON.parse(localStorage.getItem(`progland:v2:profile:${q.id}`));
  delete rawS.studio;
  localStorage.setItem(`progland:v2:profile:${q.id}`, JSON.stringify(rawS));
  const mS = loadFresh(q.id);
  ok(mS.studio && Array.isArray(mS.studio.works) && mS.studio.works.length === 0 && mS.studio.draft === null,
    "b5e studio の無い旧セーブに {works:[], draft:null} が補完される（デフォルト値マージ）");
}

console.log(fail === 0 ? "\n✅ ラウンドトリップ 全項目一致（P5完了条件クリア）" : `\n❌ ${fail}件 不一致`);
process.exit(fail === 0 ? 0 : 1);
