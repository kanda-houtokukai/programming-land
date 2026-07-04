/* クイズ・ジェネレータ（P3・テンプレート生成系3カテゴリ）
   使い方:
     node tools/quizgen.mjs --sample  … 各(カテゴリ×難易度)2問だけ生成して表示（お試し）
     node tools/quizgen.mjs --write   … 本生産: きまり15・ロボット15・よみとり10 ×3難易度
                                        → src/data/quizzes.gen.js に書き出し
   生成した全問はその場で tools/quiz-criteria.mjs の checkQuestion にかけ、
   「正解が1つに定まる」問だけ採用する（落ちた候補は捨てて作り直す） */

import { writeFileSync } from "node:fs";
import { checkQuestion, validNext, isFullyPeriodic, DIRS, turn, posLabel } from "./quiz-criteria.mjs";

const SAMPLE = process.argv.includes("--sample");
const WRITE = process.argv.includes("--write");
if (!SAMPLE && !WRITE) { console.log("使い方: node tools/quizgen.mjs --sample | --write"); process.exit(1); }
const N = SAMPLE ? { kimari: 2, robot: 2, yomitori: 2 } : { kimari: 15, robot: 15, yomitori: 10 };

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(20260705);
const ri = n => Math.floor(rnd() * n);
const pick = a => a[ri(a.length)];
const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = ri(i + 1);[b[i], b[j]] = [b[j], b[i]]; } return b; };

// 選択肢を並べ替えて {opts, a} にする
function options(correct, wrongs) {
  const opts = shuffle([correct, ...wrongs]);
  return { opts, a: opts.indexOf(correct) };
}

/* ================= きまり発見 ================= */
const POOLS = [
  ["🍎", "🍌", "🍇", "🍓"], ["🔴", "🔵", "🟡", "🟢"], ["🐶", "🐱", "🐰", "🐸"],
  ["⭐", "🌙", "☀️", "☁️"], ["🚗", "🚌", "🚲", "🚀"], ["🌷", "🌻", "🍀", "🌵"],
];
function genKimari(diff, idx) {
  for (let attempt = 0; attempt < 300; attempt++) {
    const pool = pick(POOLS);
    // 難易度で周期と見せる長さを変える
    let pattern;
    if (diff === "easy") pattern = shuffle(pool).slice(0, 2);                       // AB
    else if (diff === "normal") pattern = pick([
      [pool[0], pool[0], pool[1]], [pool[0], pool[1], pool[1]], shuffle(pool).slice(0, 3)]); // AAB/ABB/ABC
    else pattern = pick([
      shuffle(pool).slice(0, 3), [pool[0], pool[0], pool[1], pool[1]], shuffle(pool).slice(0, 4)]); // 周期3〜4

    // hardの一部は「ちがうのは どれ？」
    if (diff === "hard" && idx % 3 === 2) {
      const p = shuffle(pool).slice(0, 2);
      const good = () => Array.from({ length: 6 }, (_, i) => p[i % 2]).join("");
      const brokenArr = Array.from({ length: 6 }, (_, i) => p[i % 2]);
      const bi = 2 + ri(3);
      brokenArr[bi] = brokenArr[bi] === p[0] ? p[1] : p[0];
      const broken = brokenArr.join("");
      const g1 = good();
      const g2 = Array.from({ length: 6 }, (_, i) => p[(i + 1) % 2]).join(""); // 開始ずらし
      if (broken === g1 || broken === g2) continue;
      const { opts, a } = options(broken, [g1, g2]);
      const q = {
        id: `kimari-${diff[0]}-${idx + 1}`, category: "kimari", difficulty: diff,
        q: "きまりが ちがうのは どれ？", opts, a,
        why: "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
        meta: { kind: "kimari-broken" },
      };
      if (checkQuestion(q).length === 0) return q;
      continue;
    }

    const cycles = diff === "easy" ? 2 : 2;
    const extra = diff === "easy" ? ri(2) : 1 + ri(pattern.length - 1);
    const len = pattern.length * cycles + extra;
    const prefix = Array.from({ length: len }, (_, i) => pattern[i % pattern.length]);
    const correct = pattern[len % pattern.length];
    const wrongPool = [...new Set([...pool, ...pattern])].filter(e => e !== correct);
    const wrongs = shuffle(wrongPool).slice(0, 2);
    if (wrongs.length < 2) continue;
    if (wrongs.some(w => validNext(prefix, w))) continue; // 別解が成立するなら捨てる
    const { opts, a } = options(correct, wrongs);
    const q = {
      id: `kimari-${diff[0]}-${idx + 1}`, category: "kimari", difficulty: diff,
      q: `つぎに くるのは？\n${prefix.join(" ")} ❓`, opts, a,
      why: `${pattern.join("・")} の くりかえしだよ`,
      meta: { kind: "kimari-next", prefix },
    };
    if (checkQuestion(q).length === 0) return q;
  }
  throw new Error(`kimari ${diff} ${idx} が収束しない`);
}

/* ================= ロボット命令 ================= */
function genRobot(diff, idx) {
  for (let attempt = 0; attempt < 300; attempt++) {
    let q = null;
    if (diff === "easy") {
      if (idx % 2 === 0) { // 回転1回
        const start = ri(4), side = pick(["right", "left"]);
        const ans = DIRS[turn(start, side)].name;
        const wrongs = shuffle(DIRS.map(d => d.name).filter(n => n !== ans)).slice(0, 2);
        const o = options(ans, wrongs);
        q = { q: `${DIRS[start].name}を むいている ロボットが「${side === "right" ? "みぎ" : "ひだり"}を むく」。どっちを むく？`,
          opts: o.opts, a: o.a,
          why: `${DIRS[start].name}から くるっと まわると ${ans}だね`,
          meta: { kind: "robot-turn", start, turns: [side] } };
      } else { // まえへ n回
        const n = 2 + ri(3);
        const o = options(`${n}マス`, [`${n - 1}マス`, `${n + 1}マス`]);
        q = { q: `「まえへ」を ${n}かい。なんマス すすむ？`, opts: o.opts, a: o.a,
          why: `1かいで 1マス。${n}かいなら ${n}マスだね`,
          meta: { kind: "robot-steps", steps: Array(n).fill(1) } };
      }
    } else if (diff === "normal") {
      if (idx % 2 === 0) { // 回転2回
        const start = ri(4), turns = [pick(["right", "left"]), pick(["right", "left"])];
        let d = start; for (const s of turns) d = turn(d, s);
        const ans = DIRS[d].name;
        const wrongs = shuffle(DIRS.map(x => x.name).filter(n => n !== ans)).slice(0, 2);
        const o = options(ans, wrongs);
        const jp = s => s === "right" ? "みぎを むく" : "ひだりを むく";
        q = { q: `${DIRS[start].name}を むいている ロボットに「${jp(turns[0])}」→「${jp(turns[1])}」。さいごに どっちを むいている？`,
          opts: o.opts, a: o.a, why: `1かいずつ じゅんばんに まわして かんがえよう`,
          meta: { kind: "robot-turn", start, turns } };
      } else { // 到達位置（まえへa → みぎをむく → まえへb）
        const start = ri(4), a1 = 1 + ri(3), b1 = 1 + ri(3);
        const cmds = [a1, "R", b1];
        let d = start, x = 0, y = 0;
        for (const c of cmds) { if (c === "R") d = turn(d, "right"); else { x += DIRS[d].dx * c; y += DIRS[d].dy * c; } }
        const ans = posLabel(x, y);
        // まちがい: 曲がり忘れ・歩数まちがい
        let d2 = start, x2 = 0, y2 = 0;
        x2 = DIRS[start].dx * (a1 + b1); y2 = DIRS[start].dy * (a1 + b1);
        const w1 = posLabel(x2, y2);
        let d3 = start, x3 = 0, y3 = 0;
        for (const c of [a1, "R", b1 + 1]) { if (c === "R") d3 = turn(d3, "right"); else { x3 += DIRS[d3].dx * c; y3 += DIRS[d3].dy * c; } }
        const w2 = posLabel(x3, y3);
        if (w1 === ans || w2 === ans || w1 === w2) continue;
        const o = options(ans, [w1, w2]);
        q = { q: `${DIRS[start].name}を むいている ロボット。「まえへ ${a1}マス」→「みぎを むく」→「まえへ ${b1}マス」。スタートから みて どこに いる？`,
          opts: o.opts, a: o.a, why: `まがった あとは すすむ ほうこうが かわるよ`,
          meta: { kind: "robot-goal", start, cmds } };
      }
    } else { // hard
      if (idx % 3 === 0) { // くりかえしの歩数
        const n = 2 + ri(3), k = 2 + ri(2);
        const total = n * k;
        const o = options(`${total}マス`, [`${n + k}マス`, `${total + k}マス`]);
        if (new Set(o.opts).size !== 3) continue;
        // くりかえしの中身は「まえへ」を k個ならべる（回数表記を中に書かない）
        const body = Array(k).fill("まえへ").join("・");
        q = { q: `「🔁${n}かい くりかえし［${body}］」。ぜんぶで なんマス すすむ？`,
          opts: o.opts, a: o.a, why: `1かいで ${k}マス。${n}かい くりかえすと ${total}マスだね`,
          meta: { kind: "robot-steps", repeat: n, body: k } };
      } else if (idx % 3 === 1) { // 回転のくりかえし
        const start = ri(4), n = 2 + ri(3), side = pick(["right", "left"]);
        const turns = Array(n).fill(side);
        let d = start; for (const s of turns) d = turn(d, s);
        const ans = DIRS[d].name;
        const wrongs = shuffle(DIRS.map(x => x.name).filter(m => m !== ans)).slice(0, 2);
        const o = options(ans, wrongs);
        q = { q: `${DIRS[start].name}を むいている ロボットが「${side === "right" ? "みぎ" : "ひだり"}を むく」を ${n}かい。さいごに どっちを むく？`,
          opts: o.opts, a: o.a, why: `4かい まわると もとに もどるよ。${n}かいなら…？`,
          meta: { kind: "robot-turn", start, turns } };
      } else { // 到達位置（3命令）
        const start = ri(4), a1 = 1 + ri(3), b1 = 1 + ri(3), c1 = 1 + ri(2);
        const cmds = [a1, pick(["R", "L"]), b1, pick(["R", "L"]), c1];
        let d = start, x = 0, y = 0;
        for (const c of cmds) { if (c === "R") d = turn(d, "right"); else if (c === "L") d = turn(d, "left"); else { x += DIRS[d].dx * c; y += DIRS[d].dy * c; } }
        const ans = posLabel(x, y);
        let x2 = DIRS[start].dx * (a1 + b1 + c1), y2 = DIRS[start].dy * (a1 + b1 + c1);
        const w1 = posLabel(x2, y2);
        let d3 = start, x3 = 0, y3 = 0;
        for (const c of cmds) { if (c === "R") d3 = turn(d3, "left"); else if (c === "L") d3 = turn(d3, "right"); else { x3 += DIRS[d3].dx * c; y3 += DIRS[d3].dy * c; } }
        const w2 = posLabel(x3, y3);
        if (w1 === ans || w2 === ans || w1 === w2) continue;
        const jp = c => c === "R" ? "みぎを むく" : c === "L" ? "ひだりを むく" : `まえへ ${c}マス`;
        const o = options(ans, [w1, w2]);
        q = { q: `${DIRS[start].name}を むいている ロボット。「${cmds.map(jp).join("」→「")}」。スタートから みて どこに いる？`,
          opts: o.opts, a: o.a, why: `むきが かわるたびに すすむ ほうこうも かわるよ。1こずつ たどろう`,
          meta: { kind: "robot-goal", start, cmds } };
      }
    }
    if (!q) continue;
    q.id = `robot-${diff[0]}-${idx + 1}`; q.category = "robot"; q.difficulty = diff;
    if (checkQuestion(q).length === 0) return q;
  }
  throw new Error(`robot ${diff} ${idx} が収束しない`);
}

/* ================= よみとり（フローチャート） ================= */
const FLOWS = [
  { title: "あさの したく", steps: ["🧼 かおを あらう", "🍞 あさごはんを たべる", "🦷 はを みがく", "🎒 じゅんびを する"] },
  { title: "カレーづくり", steps: ["🔪 やさいを きる", "🍳 いためる", "💧 みずを いれて にこむ", "🍛 ルーを いれる"] },
  { title: "おかいもの", steps: ["📝 メモを かく", "🚶 おみせに いく", "🛒 かごに いれる", "💰 おかねを はらう"] },
  { title: "せんたく", steps: ["👕 ふくを あつめる", "🫧 せんたくきを まわす", "🌞 ほす", "📦 たたんで しまう"] },
];
const BRANCHES = [
  { cond: "あめが ふっている？", yes: "☂️ かさを もっていく", no: "🧢 ぼうしを かぶる" },
  { cond: "しんごうが あか？", yes: "🛑 とまって まつ", no: "🚶 わたる" },
  { cond: "おなかが すいた？", yes: "🍙 おにぎりを たべる", no: "📚 ほんを よむ" },
  { cond: "へやが くらい？", yes: "💡 でんきを つける", no: "そのまま あそぶ" },
];
const ORDINAL = ["1ばんめ", "2ばんめ", "3ばんめ", "4ばんめ"];

function flowText(steps) {
  return ["はじめ", ...steps, "おわり"].join("\n ↓\n");
}
function branchText(b) {
  return `はじめ\n ↓\n${b.cond}\n ├─ はい → ${b.yes}\n └─ いいえ → ${b.no}`;
}

function genYomitori(diff, idx) {
  for (let attempt = 0; attempt < 300; attempt++) {
    let q = null;
    if (diff === "easy") { // 手順のよみとり
      const f = pick(FLOWS);
      const askIndex = ri(f.steps.length);
      const correct = f.steps[askIndex];
      const wrongs = shuffle(f.steps.filter(s => s !== correct)).slice(0, 2);
      const o = options(correct, wrongs);
      q = { q: `「${f.title}」の フローチャートだよ。\n\n${flowText(f.steps)}\n\n${ORDINAL[askIndex]}に することは？`,
        opts: o.opts, a: o.a, why: `やじるしを うえから じゅんばんに たどろう`,
        meta: { kind: "yomitori-seq", steps: f.steps, askIndex } };
    } else if (diff === "normal") { // 分岐のよみとり
      const b = pick(BRANCHES);
      const askCond = pick([true, false]);
      const correct = askCond ? b.yes : b.no;
      const wrong1 = askCond ? b.no : b.yes;
      const wrong2 = pick(BRANCHES.filter(x => x !== b))[askCond ? "yes" : "no"];
      if (wrong2 === correct || wrong2 === wrong1) continue;
      const o = options(correct, [wrong1, wrong2]);
      q = { q: `フローチャートを よもう。\n\n${branchText(b)}\n\n「${b.cond}」が「${askCond ? "はい" : "いいえ"}」のとき、どうする？`,
        opts: o.opts, a: o.a, why: `「${askCond ? "はい" : "いいえ"}」の やじるしの さきを みよう`,
        meta: { kind: "yomitori-branch", cond: true, askCond: askCond ? true : false, yes: b.yes, no: b.no } };
    } else { // hard: くりかえしのよみとり
      const count = 3 + ri(3), per = 1 + ri(2);
      const act = pick([
        { noun: "ほし⭐", text: "⭐を かく" },
        { noun: "かね🔔", text: "🔔を ならす" },
        { noun: "はくしゅ👏", text: "👏 てを たたく" },
      ]);
      const total = count * per;
      const o = options(`${total}かい`, [`${count + per}かい`, `${total + count}かい`]);
      if (new Set(o.opts).size !== 3) continue;
      // くりかえしの中身は「1回分の動作」だけ。per回やらせたいなら 動作の行を per回ならべる
      const bodyLines = Array(per).fill(` │ ${act.text}`).join("\n");
      const whyBody = per === 1 ? `${count}かい くりかえすと ${total}かい` : `1しゅうで ${per}かい。${count}しゅうで ${total}かい`;
      q = { q: `フローチャートを よもう。\n\nはじめ\n ↓\n🔁 ${count}かい くりかえす\n${bodyLines}\n ↓\nおわり\n\n${act.noun}は ぜんぶで なんかい？`,
        opts: o.opts, a: o.a, why: `${whyBody}だね`,
        meta: { kind: "yomitori-loop", count, per } };
    }
    if (!q) continue;
    q.id = `yomitori-${diff[0]}-${idx + 1}`; q.category = "yomitori"; q.difficulty = diff;
    if (checkQuestion(q).length === 0) return q;
  }
  throw new Error(`yomitori ${diff} ${idx} が収束しない`);
}

/* ================= 実行 ================= */
const GENS = { kimari: genKimari, robot: genRobot, yomitori: genYomitori };
const out = [];
const seen = new Set();
for (const cat of ["kimari", "robot", "yomitori"]) {
  for (const diff of ["easy", "normal", "hard"]) {
    let made = 0, i = 0;
    while (made < N[cat]) {
      const q = GENS[cat](diff, i++);
      if (i > 2000) throw new Error(`${cat} ${diff}: 重複回避が収束しない`);
      const key = q.q + "|" + [...q.opts].sort().join("|"); // 並び順ちがいも同一問題とみなす（verifyと同じ基準）
      if (seen.has(key)) continue; // 同一問題の重複を禁止
      seen.add(key);
      q.id = `${cat}-${diff[0]}-${made + 1}`;
      out.push(q); made++;
    }
  }
}
console.log(`生成: ${out.length}問（きまり${N.kimari}・ロボット${N.robot}・よみとり${N.yomitori} ×3難易度）`);

if (SAMPLE) {
  for (const q of out.filter((_, i) => i % N[out[0].category] < 1 || true).slice(0, 0)) { /* noop */ }
  // カテゴリ×難易度ごとに1問ずつ表示
  for (const cat of ["kimari", "robot", "yomitori"]) for (const diff of ["easy", "normal", "hard"]) {
    const q = out.find(x => x.category === cat && x.difficulty === diff);
    console.log(`\n===== ${cat} / ${diff} =====`);
    console.log(q.q);
    q.opts.forEach((o, i) => console.log(`  ${i === q.a ? "◎" : "・"} ${o}`));
    console.log(`  解説: ${q.why}`);
  }
}
const outArg = process.argv.indexOf("--out");
if (SAMPLE && outArg >= 0) { // お試し出力を verify にかけるための一時ファイル
  writeFileSync(process.argv[outArg + 1],
    `export const GEN_QUIZZES = ${JSON.stringify(out, null, 1)};\n`);
}
if (WRITE) {
  writeFileSync("src/data/quizzes.gen.js",
    `/* 自動生成クイズ（tools/quizgen.mjs --write・シード固定）。手で編集しない。
   再生成: node tools/quizgen.mjs --write → npm run verify で全数検証 */
export const GEN_QUIZZES = ${JSON.stringify(out, null, 1)};
`);
  console.log("src/data/quizzes.gen.js に書き出しました");
}
