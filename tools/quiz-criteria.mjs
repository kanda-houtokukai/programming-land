/* クイズの品質基準（quizgen と verify-quiz で共有。ここが正本）

   ■ テンプレート生成系の「正解が1つに定まる」保証
   - きまり発見（つぎに来るのは？）:
     「きまり」とは、見せた列の中に2回以上まるごと現れている周期パターンのこと。
     正解の選択肢だけがその定義で説明でき、他の選択肢ではどんな周期(≤4)でも
     説明できないことを機械チェックする。
   - きまり発見（ちがうのは どれ？）: 正解の列だけが周期的でなく、他の列は完全に周期的。
   - ロボット命令・よみとり: 答えを実行シミュレーション／計算で再導出し、
     選択肢の中で一致するのが正解の1つだけであることをチェックする。

   ■ 全問共通の構造チェック
   - カテゴリ・難易度・解説(why)・選択肢(3つ・重複なし)・正解番号の妥当性・ID一意 */

export const CATEGORIES = ["junban", "kimari", "nakama", "robot", "yomitori"];
export const DIFFS = ["easy", "normal", "hard"];

/* ---------- きまり発見 ---------- */

// s が周期 p で完全に説明できるか
function isPeriodic(seq, p) {
  if (seq.length < p * 2) return false; // 2周期ぶんの証拠がなければ「きまり」と認めない
  for (let i = 0; i < seq.length; i++) if (seq[i] !== seq[i % p]) return false;
  return true;
}

// prefix の「きまり」(2回以上現れている周期≤maxP)として candidate が次に来られるか
export function validNext(prefix, candidate, maxP = 4) {
  const s = [...prefix, candidate];
  for (let p = 1; p <= maxP; p++) {
    if (p * 2 > prefix.length) continue; // prefix内に2周期の証拠が必要
    let ok = true;
    for (let i = 0; i < s.length; i++) if (s[i] !== s[i % p]) { ok = false; break; }
    if (ok) return true;
  }
  return false;
}

export function isFullyPeriodic(seq, maxP = 4) {
  for (let p = 1; p <= maxP; p++) if (isPeriodic(seq, p)) return true;
  return false;
}

/* ---------- ロボット命令のミニ実行（パズルと同じ向き定義: 0=→ 1=↓ 2=← 3=↑） ---------- */
export const DIRS = [
  { name: "➡️ みぎ", dx: 1, dy: 0 },
  { name: "⬇️ した", dx: 0, dy: 1 },
  { name: "⬅️ ひだり", dx: -1, dy: 0 },
  { name: "⬆️ うえ", dx: 0, dy: -1 },
];
export function turn(dir, side) { return side === "right" ? (dir + 1) % 4 : (dir + 3) % 4; }

/* ---------- 問題1問の検証 ----------
   q: {id, category, difficulty, q, opts, a, why, meta}
   返り値: エラー文字列の配列（空なら合格） */
export function checkQuestion(q) {
  const errs = [];
  if (!CATEGORIES.includes(q.category)) errs.push(`カテゴリ不正: ${q.category}`);
  if (!DIFFS.includes(q.difficulty)) errs.push(`難易度不正: ${q.difficulty}`);
  if (!q.q || !q.why) errs.push("問題文または解説が空");
  if (!Array.isArray(q.opts) || q.opts.length !== 3) errs.push("選択肢は3つ");
  else {
    if (new Set(q.opts).size !== q.opts.length) errs.push("選択肢に重複");
    if (!(Number.isInteger(q.a) && q.a >= 0 && q.a < q.opts.length)) errs.push(`正解番号が不正: ${q.a}`);
  }
  if (errs.length) return errs;

  const m = q.meta;
  if (!m) return errs; // 書き起こし問題（人手レビュー・構造チェックのみ）

  if (m.kind === "kimari-next") {
    q.opts.forEach((opt, i) => {
      const v = validNext(m.prefix, opt);
      if (i === q.a && !v) errs.push("正解がきまりとして成立しない");
      if (i !== q.a && v) errs.push(`別解が成立: 選択肢${i}「${opt}」`);
    });
  } else if (m.kind === "kimari-broken") {
    q.opts.forEach((opt, i) => {
      const seq = [...opt]; // 絵文字列
      const per = isFullyPeriodic(seq);
      if (i === q.a && per) errs.push("「ちがう列」が周期的になっている");
      if (i !== q.a && !per) errs.push(`正しい列${i}が周期的でない`);
    });
  } else if (m.kind === "robot-turn") {
    let d = m.start;
    for (const s of m.turns) d = turn(d, s);
    if (q.opts[q.a] !== DIRS[d].name) errs.push("回転の答えが一致しない");
    q.opts.forEach((o, i) => { if (i !== q.a && o === DIRS[d].name) errs.push("別解あり"); });
  } else if (m.kind === "robot-steps") {
    const total = m.repeat ? m.repeat * m.body : m.steps.reduce((a, b) => a + b, 0);
    if (q.opts[q.a] !== `${total}マス`) errs.push(`歩数の答え不一致: 期待${total}`);
  } else if (m.kind === "robot-goal") {
    let d = m.start, x = 0, y = 0;
    for (const c of m.cmds) {
      if (c === "R") d = turn(d, "right");
      else if (c === "L") d = turn(d, "left");
      else { x += DIRS[d].dx * c; y += DIRS[d].dy * c; }
    }
    const expect = posLabel(x, y);
    if (q.opts[q.a] !== expect) errs.push(`到達位置の答え不一致: 期待「${expect}」`);
    q.opts.forEach((o, i) => { if (i !== q.a && o === expect) errs.push("別解あり"); });
  } else if (m.kind === "yomitori-seq") {
    const expect = m.steps[m.askIndex];
    if (q.opts[q.a] !== expect) errs.push("手順の答え不一致");
    q.opts.forEach((o, i) => { if (i !== q.a && o === expect) errs.push("別解あり"); });
  } else if (m.kind === "yomitori-branch") {
    const expect = m.cond === m.askCond ? m.yes : m.no;
    if (q.opts[q.a] !== expect) errs.push("分岐の答え不一致");
  } else if (m.kind === "yomitori-loop") {
    const expect = `${m.count * m.per}かい`;
    if (q.opts[q.a] !== expect) errs.push(`ループの答え不一致: 期待${expect}`);
  } else {
    errs.push(`未知のmeta.kind: ${m.kind}`);
  }
  return errs;
}

export function posLabel(x, y) {
  const parts = [];
  if (x > 0) parts.push(`みぎに ${x}マス`);
  if (x < 0) parts.push(`ひだりに ${-x}マス`);
  if (y > 0) parts.push(`したに ${y}マス`);
  if (y < 0) parts.push(`うえに ${-y}マス`);
  return parts.length ? parts.join("・") : "うごかない";
}
