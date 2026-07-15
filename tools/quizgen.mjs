/* クイズ・ジェネレータ（P6e改修: 5カテゴリ全部をメタ付きテンプレート生成に統一）
   使い方:
     node tools/quizgen.mjs --sample  … 各(カテゴリ×難易度)のサンプルを生成して表示（承認用）
     node tools/quizgen.mjs --write   … 本生産 → src/data/quizzes.gen.js に書き出し
   全問その場で tools/quiz-criteria.mjs の checkQuestion にかけ、
   「正解が1つに定まる」＋「難易度タグ=実難易度」の問だけ採用する。
   素材データ（因果チェーン・タグ辞書・絵文字プール）は tools/quiz-data.mjs（人手品質保証の場所） */

import { writeFileSync } from "node:fs";
import { checkQuestion, validNext, jumpAnswers, isFullyPeriodic, isGrouped, DIRS, turn, posLabel } from "./quiz-criteria.mjs";
import { CHAINS, NAKAMA_ITEMS, CAT_LABEL, PROP_AXES, KIMARI_POOLS, FLOWS, BRANCHES, LOOP_ACTS } from "./quiz-data.mjs";

const SAMPLE = process.argv.includes("--sample");
const WRITE = process.argv.includes("--write");
const COUNT = process.argv.includes("--count"); // 量産可否の事前確認（書き出しなし・全数生成のみ）
if (!SAMPLE && !WRITE && !COUNT) { console.log("使い方: node tools/quizgen.mjs --sample | --count | --write"); process.exit(1); }
// 本生産の各セル問数（⑤: セッション5問の5倍前後をストック）
const N = SAMPLE
  ? { kimari: 3, robot: 2, yomitori: 2, junban: 3, nakama: 3 }
  : { kimari: 26, robot: 20, yomitori: 18, junban: 24, nakama: 32 };
// なかまわけの内訳（b4t）: 先頭 NAKAMA_ODD 問=仲間外れ探し（従来）・残り=軸名称形式「〇〇の なかまは どれ？」。
// 24+8=32 は初期値（混在比率は実機で調整可）。出題プールでは混在＝セッション5問シャッフルで自然に混ざる。
const NAKAMA_ODD = SAMPLE ? 2 : 24;

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(20260706);
const ri = n => Math.floor(rnd() * n);
const pick = a => a[ri(a.length)];
const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = ri(i + 1);[b[i], b[j]] = [b[j], b[i]]; } return b; };
function options(correct, wrongs) {
  const opts = shuffle([correct, ...wrongs]);
  return { opts, a: opts.indexOf(correct) };
}

/* ================= きまり発見 =================
   やさ=2要素(AB)／ふつう=3要素(ABC/AAB/ABB)・2個ずつ(AABB)／
   むず=変則4要素(ABAC等)・「〇ばんめは？」・「ちがうのは どれ？」 */
function genKimari(diff, idx) {
  for (let attempt = 0; attempt < 500; attempt++) {
    const pool = pick(KIMARI_POOLS);

    // むず(1/3): こわれ探し
    if (diff === "hard" && idx % 3 === 2) {
      const p = shuffle(pool).slice(0, 2);
      const good = off => Array.from({ length: 6 }, (_, i) => p[(i + off) % 2]).join("");
      const brokenArr = Array.from({ length: 6 }, (_, i) => p[i % 2]);
      const bi = 2 + ri(3);
      brokenArr[bi] = brokenArr[bi] === p[0] ? p[1] : p[0];
      const broken = brokenArr.join("");
      if (broken === good(0) || broken === good(1)) continue;
      const { opts, a } = options(broken, [good(0), good(1)]);
      const q = { category: "kimari", difficulty: diff, q: "きまりが ちがうのは どれ？", opts, a,
        why: "ひとつだけ、とちゅうで じゅんばんが くずれているよ",
        meta: { kind: "kimari-broken" } };
      if (checkQuestion({ ...q, id: "t" }).length === 0) return q;
      continue;
    }
    // むず(1/3): とび先（〇ばんめ）
    if (diff === "hard" && idx % 3 === 1) {
      const period = 2 + ri(2); // 2 or 3
      const pattern = shuffle(pool).slice(0, period);
      const prefix = Array.from({ length: period * 2 }, (_, i) => pattern[i % period]);
      const pos = 8 + ri(4); // 8〜11ばんめ
      const answers = jumpAnswers(prefix, pos - 1);
      if (answers.size !== 1) continue;
      const correct = [...answers][0];
      const wrongs = shuffle(pattern.filter(e => e !== correct).concat(pool.filter(e => !pattern.includes(e)))).slice(0, 2);
      if (wrongs.length < 2 || wrongs.includes(correct)) continue;
      const { opts, a } = options(correct, wrongs);
      const q = { category: "kimari", difficulty: diff,
        q: `この ままつづくと、${pos}ばんめに くるのは？\n${prefix.join(" ")} …`,
        opts, a, why: `${pattern.join("・")}の くりかえし。ゆびで ${pos}ばんめまで かぞえてみよう`,
        meta: { kind: "kimari-jump", prefix, pos } };
      if (checkQuestion({ ...q, id: "t" }).length === 0) return q;
      continue;
    }

    // つぎに くるのは？（難易度でパターンが変わる）
    let pattern;
    if (diff === "easy") pattern = shuffle(pool).slice(0, 2);                        // AB
    else if (diff === "normal") pattern = pick([
      () => { const s = shuffle(pool); return [s[0], s[0], s[1]]; },                 // AAB
      () => { const s = shuffle(pool); return [s[0], s[1], s[1]]; },                 // ABB
      () => shuffle(pool).slice(0, 3),                                               // ABC
      () => { const s = shuffle(pool); return [s[0], s[0], s[1], s[1]]; },           // AABB（2個ずつ）
    ])();
    else pattern = pick([
      () => { const s = shuffle(pool); return [s[0], s[1], s[0], s[2]]; },           // ABAC
      () => { const s = shuffle(pool); return [s[0], s[1], s[2], s[1]]; },           // ABCB
      () => shuffle(pool).slice(0, 4),                                               // ABCD
    ])();
    const period = pattern.length;
    const grouped = isGrouped(pattern);
    const cycles = 2;
    const extra = diff === "easy" ? ri(2) : 1 + ri(period - 1);
    const len = period * cycles + extra;
    const prefix = Array.from({ length: len }, (_, i) => pattern[i % period]);
    const correct = pattern[len % period];
    const wrongPool = [...new Set([...pool, ...pattern])].filter(e => e !== correct);
    const wrongs = shuffle(wrongPool).slice(0, 2);
    if (wrongs.length < 2) continue;
    if (wrongs.some(w => validNext(prefix, w))) continue;
    const { opts, a } = options(correct, wrongs);
    const q = { category: "kimari", difficulty: diff,
      q: `つぎに くるのは？\n${prefix.join(" ")} ❓`, opts, a,
      why: `${pattern.join("・")} の くりかえしだよ`,
      meta: { kind: "kimari-next", prefix, period, grouped } };
    if (checkQuestion({ ...q, id: "t" }).length === 0) return q;
  }
  throw new Error(`kimari ${diff} ${idx} が収束しない`);
}

/* ================= じゅんばん =================
   やさ=3ステップの さいしょ/さいご／ふつう=4〜5ステップの さいしょ/さいご／
   むず=途中の1手（穴うめ）・直前依存（〜のまえに かならず）・正しい順選び */
const MARU = ["①", "②", "③", "④", "⑤"];
function genJunban(diff, idx) {
  for (let attempt = 0; attempt < 500; attempt++) {
    let chain, ask, pos = null;
    if (diff === "easy") {
      chain = pick(CHAINS.filter(c => c.steps.length === 3));
      ask = idx % 2 === 0 ? "first" : "last";
    } else if (diff === "normal") {
      chain = pick(CHAINS.filter(c => c.steps.length >= 4));
      ask = idx % 2 === 0 ? "first" : "last";
    } else {
      const mode = idx % 3;
      if (mode === 0) { // 穴うめ
        chain = pick(CHAINS.filter(c => c.steps.length >= 4));
        ask = "middle"; pos = 1 + ri(chain.steps.length - 2); // 2番め〜最後の手前
      } else if (mode === 1) { // 直前依存
        chain = pick(CHAINS.filter(c => c.steps.length >= 4));
        ask = "before"; pos = 1 + ri(Math.max(1, chain.steps.length - 2 - 1)); // 誤答用に後ろ2つ必要
        if (pos > chain.steps.length - 3) pos = 1;
      } else { // 正順選び
        chain = pick(CHAINS.filter(c => c.steps.length === 3));
        ask = "order";
      }
    }
    const st = chain.steps;
    let qText, correct, wrongs;
    const chainWhy = `ただしい じゅんばんは ${st.join(" → ")} だね`;
    if (ask === "first") {
      qText = `${chain.title}。さいしょに することは？`;
      correct = st[0];
      wrongs = shuffle(st.slice(1)).slice(0, 2);
    } else if (ask === "last") {
      qText = `${chain.title}。いちばん さいごに することは？`;
      correct = st[st.length - 1];
      wrongs = shuffle(st.slice(0, -1)).slice(0, 2);
    } else if (ask === "middle") {
      const line = st.map((s, i) => `${MARU[i]} ${i === pos ? "？" : s}`).join(" → ");
      qText = `${chain.title}。\n${line}\n${MARU[pos]}に はいるのは？`;
      correct = st[pos];
      wrongs = shuffle(st.filter((_, i) => i !== pos)).slice(0, 2);
    } else if (ask === "before") {
      qText = `${chain.title}。「${st[pos]}」の まえに かならず することは？`;
      correct = st[pos - 1];
      wrongs = shuffle(st.slice(pos + 1)).slice(0, 2);
      if (wrongs.length < 2) continue;
    } else { // order
      const join = a => a.join(" → ");
      const swap = (a, i) => { const b = [...a];[b[i], b[i + 1]] = [b[i + 1], b[i]]; return b; };
      qText = `${chain.title}。ただしい じゅんばんは どれ？`;
      correct = join(st);
      wrongs = [join(swap(st, 0)), join(swap(st, 1))];
    }
    if (wrongs.includes(correct) || new Set([correct, ...wrongs]).size !== 3) continue;
    const { opts, a } = options(correct, wrongs);
    const q = { category: "junban", difficulty: diff, q: qText, opts, a, why: chainWhy,
      meta: { kind: "junban", ask, pos, steps: ask === "order" ? st : st, chainId: chain.id } };
    if (checkQuestion({ ...q, id: "t" }).length === 0) return q;
  }
  throw new Error(`junban ${diff} ${idx} が収束しない`);
}

/* ================= なかまわけ =================
   2形式を同じ素材・同じ軸で混在させる（b4t・教育設計: 同じ素材で認知の操作を変える）:
   ①仲間外れ探し「なかまはずれは どれ？」＝差を見つける操作（従来・全軸照合で軸競合を機械排除）
   ②軸名称形式「〇〇の なかまは どれ？」＝与えられた基準を当てはめる操作（属性フィルタリング・
     名指しした軸に当てはまる選択肢がちょうど1つ、を機械検証）
   軸は両形式共通: やさ=カテゴリ軸／ふつう=はたらき軸（同カテゴリ内で切る）／むず=抽象軸4択 */
const label = it => `${it.e} ${it.n}`;
function genNakama(diff, idx, made) {
  if (made >= NAKAMA_ODD) return genNakamaAxis(diff, idx); // 25問め以降=軸名称形式（プールでは混在）
  for (let attempt = 0; attempt < 800; attempt++) {
    let items, odd, axisType, why;
    if (diff === "easy") {
      const cats = [...new Set(NAKAMA_ITEMS.map(i => i.cat))];
      const catA = pick(cats.filter(c => NAKAMA_ITEMS.filter(i => i.cat === c).length >= 2));
      const catB = pick(cats.filter(c => c !== catA));
      const groupA = shuffle(NAKAMA_ITEMS.filter(i => i.cat === catA)).slice(0, 2);
      const oddIt = pick(NAKAMA_ITEMS.filter(i => i.cat === catB));
      items = shuffle([...groupA, oddIt]); odd = oddIt; axisType = "concrete";
      why = `${oddIt.e} ${oddIt.n}だけ ${CAT_LABEL[catA]}じゃないね`;
    } else if (diff === "normal") {
      const axes = Object.entries(PROP_AXES).filter(([, v]) => v.type === "functional");
      const [prop, axis] = pick(axes);
      // 同じカテゴリの中で、その性質を持つ2つ＋持たない1つ
      const cats = [...new Set(NAKAMA_ITEMS.map(i => i.cat))].filter(c => {
        const inCat = NAKAMA_ITEMS.filter(i => i.cat === c);
        return inCat.filter(i => i.props.includes(prop)).length >= 2 && inCat.some(i => !i.props.includes(prop));
      });
      if (!cats.length) continue;
      const cat = pick(cats);
      const inCat = NAKAMA_ITEMS.filter(i => i.cat === cat);
      const haves = shuffle(inCat.filter(i => i.props.includes(prop))).slice(0, 2);
      const oddIt = pick(inCat.filter(i => !i.props.includes(prop)));
      items = shuffle([...haves, oddIt]); odd = oddIt; axisType = "functional";
      why = `${haves.map(h => h.n).join("と ")}は「${axis.label}」なかま。${oddIt.e} ${oddIt.n}だけ ちがうね`;
    } else {
      const axes = Object.entries(PROP_AXES).filter(([, v]) => v.type === "abstract");
      const [prop] = pick(axes);
      const havePool = NAKAMA_ITEMS.filter(i => i.props.includes(prop));
      const lackPool = NAKAMA_ITEMS.filter(i => !i.props.includes(prop));
      const haves = shuffle(havePool).slice(0, 3);
      if (new Set(haves.map(h => h.cat)).size < 2) continue; // カテゴリをまたぐこと（抽象化が必要になる）
      const oddIt = pick(lackPool);
      items = shuffle([...haves, oddIt]); odd = oddIt; axisType = "abstract";
      const whyBy = { living: `${oddIt.e} ${oddIt.n}だけ いきものじゃ ないね`,
        food: `${oddIt.e} ${oddIt.n}だけ たべられないね`,
        natural: `${oddIt.e} ${oddIt.n}だけ ひとが つくった ものだね` };
      why = whyBy[prop];
    }
    const opts = items.map(label);
    const q = { category: "nakama", difficulty: diff, q: "なかまはずれは どれ？", opts, a: opts.indexOf(label(odd)), why,
      meta: { kind: "nakama", axisType, odd: label(odd), items: items.map(i => ({ label: label(i), cat: i.cat, props: i.props })) } };
    if (checkQuestion({ ...q, id: "t" }).length === 0) return q;
  }
  throw new Error(`nakama ${diff} ${idx} が収束しない`);
}

// 軸名称形式（b4t）: 「〇〇の なかまは どれ？」＝正解1つ＋当てはまらない選択肢。
// qLabel（出題用の短い言い回し）があればそれを、なければ label を出題文に使う。
const axisQLabel = axis => axis.qLabel || axis.label;
function genNakamaAxis(diff, idx) {
  for (let attempt = 0; attempt < 800; attempt++) {
    let qText, correctIt, wrongIts, axisKind, axisKey, axisType, why;
    if (diff === "easy") {
      // カテゴリ軸: 「どうぶつの なかまは どれ？」（正解1＋別カテゴリ2）。
      // nature は「しぜんの ものの なかま」と の が重なり読みにくいため出題名からは除外（仲間外れ形式では従来どおり使う）
      const cats = [...new Set(NAKAMA_ITEMS.map(i => i.cat))].filter(c => c !== "nature");
      const cat = pick(cats);
      correctIt = pick(NAKAMA_ITEMS.filter(i => i.cat === cat));
      wrongIts = shuffle(NAKAMA_ITEMS.filter(i => i.cat !== cat)).slice(0, 2);
      axisKind = "cat"; axisKey = cat; axisType = "concrete";
      qText = `${CAT_LABEL[cat]}の なかまは どれ？`;
      why = `${correctIt.e} ${correctIt.n}は ${CAT_LABEL[cat]}の なかまだね。ほかは ちがうよ`;
    } else if (diff === "normal") {
      // はたらき軸: なるべく同カテゴリ内で切る（カテゴリで解けなくして性質で考えさせる＝仲間外れ形式と同じ思想）。
      // 同カテゴリ内で切れない軸（例: sound=がっきが全部鳴る）はカテゴリまたぎで代替
      const axes = Object.entries(PROP_AXES).filter(([, v]) => v.type === "functional");
      const [prop, axis] = pick(axes);
      const cats = [...new Set(NAKAMA_ITEMS.map(i => i.cat))].filter(c => {
        const inCat = NAKAMA_ITEMS.filter(i => i.cat === c);
        return inCat.some(i => i.props.includes(prop)) && inCat.filter(i => !i.props.includes(prop)).length >= 2;
      });
      const srcCat = cats.length ? pick(cats) : null; // ★カテゴリは先に1回だけ抽選（filter内でpickすると毎アイテム再抽選される）
      const src = srcCat ? NAKAMA_ITEMS.filter(i => i.cat === srcCat) : NAKAMA_ITEMS;
      correctIt = pick(src.filter(i => i.props.includes(prop)));
      wrongIts = shuffle(src.filter(i => !i.props.includes(prop))).slice(0, 2);
      axisKind = "prop"; axisKey = prop; axisType = "functional";
      qText = `${axisQLabel(axis)} なかまは どれ？`;
      why = `${correctIt.e} ${correctIt.n}は「${axisQLabel(axis)}」なかまだね。ほかは ちがうよ`;
    } else {
      // 抽象軸4択: 正解1＋当てはまらない3。誤答は2カテゴリ以上に散らす（カテゴリでは解けない＝抽象化が必要）
      const axes = Object.entries(PROP_AXES).filter(([, v]) => v.type === "abstract");
      const [prop, axis] = pick(axes);
      correctIt = pick(NAKAMA_ITEMS.filter(i => i.props.includes(prop)));
      wrongIts = shuffle(NAKAMA_ITEMS.filter(i => !i.props.includes(prop))).slice(0, 3);
      if (new Set(wrongIts.map(w => w.cat)).size < 2) continue;
      axisKind = "prop"; axisKey = prop; axisType = "abstract";
      qText = `${axisQLabel(axis)} なかまは どれ？`;
      why = `${correctIt.e} ${correctIt.n}は「${axisQLabel(axis)}」なかまだね。ほかは ちがうよ`;
    }
    if (!correctIt || wrongIts.length < (diff === "hard" ? 3 : 2)) continue;
    const items = shuffle([correctIt, ...wrongIts]);
    const opts = items.map(label);
    const q = { category: "nakama", difficulty: diff, q: qText, opts, a: opts.indexOf(label(correctIt)), why,
      meta: { kind: "nakama-axis", axisKind, axis: axisKey, axisType, correct: label(correctIt),
        items: items.map(i => ({ label: label(i), cat: i.cat, props: i.props })) } };
    if (checkQuestion({ ...q, id: "t" }).length === 0) return q;
  }
  throw new Error(`nakama-axis ${diff} ${idx} が収束しない`);
}

/* ================= ロボット命令 =================
   やさ=1概念1回（回転1・歩数・前へn）／ふつう=2操作（回転2・曲がり1回の到達）／
   むず=くりかえし・回転n回・曲がり2回の到達 */
function genRobot(diff, idx) {
  for (let attempt = 0; attempt < 500; attempt++) {
    let q = null;
    if (diff === "easy") {
      const mode = idx % 3;
      if (mode === 0) { // 回転1回
        const start = ri(4), side = pick(["right", "left"]);
        const ans = DIRS[turn(start, side)].name;
        const wrongs = shuffle(DIRS.map(d => d.name).filter(n => n !== ans)).slice(0, 2);
        const o = options(ans, wrongs);
        q = { q: `${DIRS[start].name}を むいている ロボットが「${side === "right" ? "みぎ" : "ひだり"}を むく」。どっちを むく？`,
          opts: o.opts, a: o.a, why: `${DIRS[start].name}から くるっと まわると ${ans}だね`,
          meta: { kind: "robot-turn", start, turns: [side] } };
      } else if (mode === 1) { // まえへ n回 → 歩数
        const n = 2 + ri(4);
        const o = options(`${n}マス`, [`${n - 1}マス`, `${n + 1}マス`]);
        q = { q: `「まえへ」を ${n}かい。なんマス すすむ？`, opts: o.opts, a: o.a,
          why: `1かいで 1マス。${n}かいなら ${n}マスだね`,
          meta: { kind: "robot-steps", steps: Array(n).fill(1) } };
      } else { // 向き＋前へn → 位置
        const start = ri(4), n = 2 + ri(3);
        const ans = posLabel(DIRS[start].dx * n, DIRS[start].dy * n);
        const w1 = posLabel(DIRS[turn(start, "right")].dx * n, DIRS[turn(start, "right")].dy * n);
        const w2 = posLabel(DIRS[start].dx * (n + 1), DIRS[start].dy * (n + 1));
        if (w1 === ans || w2 === ans || w1 === w2) continue;
        const o = options(ans, [w1, w2]);
        q = { q: `${DIRS[start].name}を むいている ロボットが「まえへ ${n}マス」。スタートから みて どこに いる？`,
          opts: o.opts, a: o.a, why: `むいている ほうこうに ${n}マス すすむよ`,
          meta: { kind: "robot-move", start, n } };
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
      } else { // 到達位置（曲がり1回）
        const start = ri(4), a1 = 1 + ri(3), b1 = 1 + ri(3);
        const cmds = [a1, pick(["R", "L"]), b1];
        let d = start, x = 0, y = 0;
        for (const c of cmds) { if (c === "R") d = turn(d, "right"); else if (c === "L") d = turn(d, "left"); else { x += DIRS[d].dx * c; y += DIRS[d].dy * c; } }
        const ans = posLabel(x, y);
        const w1 = posLabel(DIRS[start].dx * (a1 + b1), DIRS[start].dy * (a1 + b1)); // 曲がり忘れ
        let d3 = start, x3 = 0, y3 = 0;
        for (const c of [cmds[0], cmds[1], b1 + 1]) { if (c === "R") d3 = turn(d3, "right"); else if (c === "L") d3 = turn(d3, "left"); else { x3 += DIRS[d3].dx * c; y3 += DIRS[d3].dy * c; } }
        const w2 = posLabel(x3, y3); // 歩数まちがい
        if (w1 === ans || w2 === ans || w1 === w2) continue;
        const jp = c => c === "R" ? "みぎを むく" : c === "L" ? "ひだりを むく" : `まえへ ${c}マス`;
        const o = options(ans, [w1, w2]);
        q = { q: `${DIRS[start].name}を むいている ロボット。「${cmds.map(jp).join("」→「")}」。スタートから みて どこに いる？`,
          opts: o.opts, a: o.a, why: `まがった あとは すすむ ほうこうが かわるよ`,
          meta: { kind: "robot-goal", start, cmds } };
      }
    } else { // hard
      const mode = idx % 3;
      if (mode === 0) { // くりかえしの歩数
        const n = 2 + ri(3), k = 2 + ri(2);
        const total = n * k;
        const o = options(`${total}マス`, [`${n + k}マス`, `${total + k}マス`]);
        if (new Set(o.opts).size !== 3) continue;
        const body = Array(k).fill("まえへ").join("・");
        q = { q: `「🔁${n}かい くりかえし［${body}］」。ぜんぶで なんマス すすむ？`,
          opts: o.opts, a: o.a, why: `1かいで ${k}マス。${n}かい くりかえすと ${total}マスだね`,
          meta: { kind: "robot-steps", repeat: n, body: k } };
      } else if (mode === 1) { // 回転のくりかえし（3〜5回）
        const start = ri(4), n = 3 + ri(3), side = pick(["right", "left"]);
        const turns = Array(n).fill(side);
        let d = start; for (const s of turns) d = turn(d, s);
        const ans = DIRS[d].name;
        const wrongs = shuffle(DIRS.map(x => x.name).filter(m => m !== ans)).slice(0, 2);
        const o = options(ans, wrongs);
        q = { q: `${DIRS[start].name}を むいている ロボットが「${side === "right" ? "みぎ" : "ひだり"}を むく」を ${n}かい。さいごに どっちを むく？`,
          opts: o.opts, a: o.a, why: `4かい まわると もとに もどるよ。${n}かいなら…？`,
          meta: { kind: "robot-turn", start, turns } };
      } else { // 到達位置（曲がり2回）
        const start = ri(4), a1 = 1 + ri(3), b1 = 1 + ri(3), c1 = 1 + ri(2);
        const cmds = [a1, pick(["R", "L"]), b1, pick(["R", "L"]), c1];
        let d = start, x = 0, y = 0;
        for (const c of cmds) { if (c === "R") d = turn(d, "right"); else if (c === "L") d = turn(d, "left"); else { x += DIRS[d].dx * c; y += DIRS[d].dy * c; } }
        const ans = posLabel(x, y);
        const w1 = posLabel(DIRS[start].dx * (a1 + b1 + c1), DIRS[start].dy * (a1 + b1 + c1));
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
    q.category = "robot"; q.difficulty = diff;
    if (checkQuestion({ ...q, id: "t" }).length === 0) return q;
  }
  throw new Error(`robot ${diff} ${idx} が収束しない`);
}

/* ================= よみとり（フローチャート） =================
   やさ=順次のよみとり／ふつう=分岐のよみとり／むず=くりかえしの回数（1動作・2動作） */
function flowText(steps) { return ["はじめ", ...steps, "おわり"].join("\n ↓\n"); }
function branchText(b) { return `はじめ\n ↓\n${b.cond}\n ├─ はい → ${b.yes}\n └─ いいえ → ${b.no}`; }
const ORDINAL = ["1ばんめ", "2ばんめ", "3ばんめ", "4ばんめ"];

function genYomitori(diff, idx) {
  for (let attempt = 0; attempt < 500; attempt++) {
    let q = null;
    if (diff === "easy") {
      const f = pick(FLOWS);
      const askIndex = ri(f.steps.length);
      const correct = f.steps[askIndex];
      const wrongs = shuffle(f.steps.filter(s => s !== correct)).slice(0, 2);
      const o = options(correct, wrongs);
      q = { q: `「${f.title}」の フローチャートだよ。\n\n${flowText(f.steps)}\n\n${ORDINAL[askIndex]}に することは？`,
        opts: o.opts, a: o.a, why: `やじるしを うえから じゅんばんに たどろう`,
        meta: { kind: "yomitori-seq", steps: f.steps, askIndex } };
    } else if (diff === "normal") {
      const b = pick(BRANCHES);
      const askCond = pick([true, false]);
      const correct = askCond ? b.yes : b.no;
      const wrong1 = askCond ? b.no : b.yes;
      const wrong2 = pick(BRANCHES.filter(x => x !== b))[askCond ? "yes" : "no"];
      if (wrong2 === correct || wrong2 === wrong1) continue;
      const o = options(correct, [wrong1, wrong2]);
      q = { q: `フローチャートを よもう。\n\n${branchText(b)}\n\n「${b.cond}」が「${askCond ? "はい" : "いいえ"}」のとき、どうする？`,
        opts: o.opts, a: o.a, why: `「${askCond ? "はい" : "いいえ"}」の やじるしの さきを みよう`,
        meta: { kind: "yomitori-branch", askCond, yes: b.yes, no: b.no } };
    } else {
      if (idx % 2 === 0) { // 1動作×くりかえし（動作行を per 回ならべる）
        const count = 3 + ri(3), per = 1 + ri(2);
        const act = pick(LOOP_ACTS);
        const total = count * per;
        const o = options(`${total}かい`, [`${count + per}かい`, `${total + count}かい`]);
        if (new Set(o.opts).size !== 3) continue;
        const bodyLines = Array(per).fill(` │ ${act.text}`).join("\n");
        const whyBody = per === 1 ? `${count}かい くりかえすと ${total}かい` : `1しゅうで ${per}かい。${count}しゅうで ${total}かい`;
        q = { q: `フローチャートを よもう。\n\nはじめ\n ↓\n🔁 ${count}かい くりかえす\n${bodyLines}\n ↓\nおわり\n\n${act.noun}は ぜんぶで なんかい？`,
          opts: o.opts, a: o.a, why: `${whyBody}だね`,
          meta: { kind: "yomitori-loop", count, per } };
      } else { // 2動作×くりかえし → 片方の回数（各周1回ずつ＝答えは周回数）
        const count = 3 + ri(3);
        const [act1, act2] = shuffle(LOOP_ACTS).slice(0, 2);
        const o = options(`${count}かい`, [`${count * 2}かい`, `${count + 2}かい`]);
        if (new Set(o.opts).size !== 3) continue;
        q = { q: `フローチャートを よもう。\n\nはじめ\n ↓\n🔁 ${count}かい くりかえす\n │ ${act1.text}\n │ ${act2.text}\n ↓\nおわり\n\n${act1.noun}は ぜんぶで なんかい？`,
          opts: o.opts, a: o.a, why: `1しゅうに 1かいずつ。${count}しゅうで ${count}かいだね`,
          meta: { kind: "yomitori-loop2", count } };
      }
    }
    if (!q) continue;
    q.category = "yomitori"; q.difficulty = diff;
    if (checkQuestion({ ...q, id: "t" }).length === 0) return q;
  }
  throw new Error(`yomitori ${diff} ${idx} が収束しない`);
}

/* ================= 実行 ================= */
const GENS = { junban: genJunban, kimari: genKimari, nakama: genNakama, robot: genRobot, yomitori: genYomitori };
const out = [];
const seen = new Set();
for (const cat of ["junban", "kimari", "nakama", "robot", "yomitori"]) {
  for (const diff of ["easy", "normal", "hard"]) {
    let made = 0, i = 0;
    while (made < N[cat]) {
      const q = GENS[cat](diff, i++, made); // made=完成数（なかまわけの形式ディスパッチに使用・他カテゴリは無視）
      if (i > 4000) throw new Error(`${cat} ${diff}: 重複回避が収束しない（${made}/${N[cat]}）`);
      const key = q.q + "|" + [...q.opts].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      q.id = `${cat}-${diff[0]}-${made + 1}`;
      out.push(q); made++;
    }
  }
}
console.log(`生成: ${out.length}問（${Object.entries(N).map(([k, v]) => `${k}${v}`).join("・")} ×3難易度）`);

if (SAMPLE) {
  for (const cat of ["junban", "kimari", "nakama", "robot", "yomitori"]) {
    for (const diff of ["easy", "normal", "hard"]) {
      const qs = out.filter(x => x.category === cat && x.difficulty === diff);
      qs.forEach((q, k) => {
        console.log(`\n===== ${cat} / ${diff} (${k + 1}) =====`);
        console.log(q.q);
        q.opts.forEach((o, i) => console.log(`  ${i === q.a ? "◎" : "・"} ${o}`));
        console.log(`  💬 ${q.why}`);
      });
    }
  }
}
if (WRITE) {
  writeFileSync("src/data/quizzes.gen.js",
    `/* 自動生成クイズ（tools/quizgen.mjs --write・シード固定・P6e: 5カテゴリ全数メタ付き生成）。手で編集しない。
   素材データ（因果チェーン・タグ辞書）: tools/quiz-data.mjs ＝ 人手で品質保証する場所
   再生成: node tools/quizgen.mjs --write → npm run verify で全数検証（難易度タグ照合込み） */
export const GEN_QUIZZES = ${JSON.stringify(out, null, 1)};
`);
  console.log("src/data/quizzes.gen.js に書き出しました");
}
