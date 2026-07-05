/* クイズの品質基準（quizgen と verify-quiz で共有。ここが正本）

   ■ 「正解が1つに定まる」保証（全カテゴリ・メタ情報から機械検証）
   - きまり（つぎに来るのは？）: 「きまり」＝見せた列に2回以上まるごと現れる周期(≤5)。
     正解だけが説明でき、他の選択肢はどの周期でも説明できないことをチェック。
   - きまり（〇ばんめは？）: prefix を説明できる全周期が同じ答えを出すことをチェック。
   - きまり（ちがうのは？）: 正解の列だけ非周期・他は完全周期。
   - ロボット・よみとり: シミュレーション／計算で答えを再導出。
   - じゅんばん: meta.steps（厳密因果チェーン）に対し、正解・誤答の位置関係を検証
     （誤答は必ず「問われた位置より後ろ」等、チェーン上で不成立の位置から取る）。
   - なかまわけ: meta.items のタグ全軸を照合し、どの軸で2-1（4択は3-1）に割れても
     なかまはずれが変わらないことをチェック（軸競合＝りんご・トマト・いちご事故の機械防止）。

   ■ 難易度タグ＝実難易度の照合（P6e・④対応）
   - expectedDifficulty(q) が meta の構造特徴（周期・命令数・チェーン長・軸種別）から
     難易度を機械判定し、タグと一致しない問題は FAIL にする。

   ■ 全問共通の構造チェック
   - カテゴリ・難易度・解説(why)・選択肢(3〜4・重複なし)・正解番号・ID一意
   - くりかえしの中身に回数表記を書かない（外側と二重になり人が読めない） */

export const CATEGORIES = ["junban", "kimari", "nakama", "robot", "yomitori"];
export const DIFFS = ["easy", "normal", "hard"];
export const MAX_PERIOD = 5;

/* ---------- きまり ---------- */

function isPeriodic(seq, p) {
  if (seq.length < p * 2) return false; // 2周期ぶんの証拠がなければ「きまり」と認めない
  for (let i = 0; i < seq.length; i++) if (seq[i] !== seq[i % p]) return false;
  return true;
}

// prefix の「きまり」(2回以上現れている周期≤maxP)として candidate が次に来られるか
export function validNext(prefix, candidate, maxP = MAX_PERIOD) {
  const s = [...prefix, candidate];
  for (let p = 1; p <= maxP; p++) {
    if (p * 2 > prefix.length) continue;
    let ok = true;
    for (let i = 0; i < s.length; i++) if (s[i] !== s[i % p]) { ok = false; break; }
    if (ok) return true;
  }
  return false;
}

export function isFullyPeriodic(seq, maxP = MAX_PERIOD) {
  for (let p = 1; p <= maxP; p++) if (isPeriodic(seq, p)) return true;
  return false;
}

// prefix を完全に説明できる全周期が、位置 idx(0はじまり) に置く要素の集合
export function jumpAnswers(prefix, idx, maxP = MAX_PERIOD) {
  const out = new Set();
  for (let p = 1; p <= maxP; p++) {
    if (p * 2 > prefix.length) continue;
    let ok = true;
    for (let i = 0; i < prefix.length; i++) if (prefix[i] !== prefix[i % p]) { ok = false; break; }
    if (ok) out.add(prefix[idx % p]);
  }
  return out;
}

// パターンが XXYY 型（2個ずつのグループ周期）か
export function isGrouped(pattern) {
  return pattern.length === 4 && pattern[0] === pattern[1] && pattern[2] === pattern[3] && pattern[0] !== pattern[2];
}

/* ---------- ロボット（パズルと同じ向き: 0=→ 1=↓ 2=← 3=↑） ---------- */
export const DIRS = [
  { name: "➡️ みぎ", dx: 1, dy: 0 },
  { name: "⬇️ した", dx: 0, dy: 1 },
  { name: "⬅️ ひだり", dx: -1, dy: 0 },
  { name: "⬆️ うえ", dx: 0, dy: -1 },
];
export function turn(dir, side) { return side === "right" ? (dir + 1) % 4 : (dir + 3) % 4; }

export function posLabel(x, y) {
  const parts = [];
  if (x > 0) parts.push(`みぎに ${x}マス`);
  if (x < 0) parts.push(`ひだりに ${-x}マス`);
  if (y > 0) parts.push(`したに ${y}マス`);
  if (y < 0) parts.push(`うえに ${-y}マス`);
  return parts.length ? parts.join("・") : "うごかない";
}

/* ---------- なかまわけ: 軸競合チェック ----------
   items: [{label, cat, props:[...]}] / oddLabel: 意図したなかまはずれ
   すべての軸（catごとの所属・全props）について:
   - 3択: 2-1 に割れる軸は、割れ方がどちら向きでも odd が意図と一致すること
   - 4択: 3-1 に割れる軸は odd 一致（1-3 の「1つだけ持つ」は弱い読みなので不問） */
export function nakamaConflicts(items, oddLabel) {
  const errs = [];
  const axes = new Set();
  items.forEach(it => { axes.add(`cat:${it.cat}`); (it.props || []).forEach(p => axes.add(`prop:${p}`)); });
  const n = items.length;
  for (const ax of axes) {
    const has = items.map(it => ax.startsWith("cat:") ? `cat:${it.cat}` === ax : (it.props || []).includes(ax.slice(5)));
    const cnt = has.filter(Boolean).length;
    let odd = null;
    if (n === 3) {
      if (cnt === 2) odd = items[has.indexOf(false)].label;
      else if (cnt === 1) odd = items[has.indexOf(true)].label; // 「これだけ◯◯」の読みも潰す
    } else if (n === 4) {
      if (cnt === 3) odd = items[has.indexOf(false)].label;
    }
    if (odd !== null && odd !== oddLabel) errs.push(`軸「${ax}」で なかまはずれが「${odd}」に変わる`);
  }
  return errs;
}

/* ---------- 難易度タグ＝実難易度（構造特徴から機械判定） ---------- */
export function expectedDifficulty(q) {
  const m = q.meta;
  if (!m) return null;
  switch (m.kind) {
    // きまり: やさ=2要素(AB)／ふつう=3要素(ABC系)・2個ずつ(AABB)／むず=変則4+・とび先・こわれ探し
    case "kimari-next":
      if (m.period === 2) return "easy";
      if (m.period === 3 || m.grouped) return "normal";
      return "hard";
    case "kimari-jump": return "hard";
    case "kimari-broken": return "hard";
    // ロボット: やさ=1概念1回／ふつう=2操作／むず=くりかえし・3操作以上
    case "robot-turn": return m.turns.length === 1 ? "easy" : m.turns.length === 2 ? "normal" : "hard";
    case "robot-steps": return m.repeat ? "hard" : "easy";
    case "robot-move": return "easy"; // 向き＋前へn（1概念）
    case "robot-goal": {
      const nTurn = m.cmds.filter(c => c === "R" || c === "L").length;
      return nTurn <= 1 ? "normal" : "hard";
    }
    // よみとり: やさ=順次／ふつう=分岐／むず=くりかえしの回数
    case "yomitori-seq": return "easy";
    case "yomitori-branch": return "normal";
    case "yomitori-loop": return "hard";
    case "yomitori-loop2": return "hard";
    // じゅんばん: やさ=3ステップの端／ふつう=4〜5ステップの端／むず=途中の1手・直前依存・正順選び
    case "junban":
      if (m.ask === "first" || m.ask === "last") return m.steps.length === 3 ? "easy" : "normal";
      return "hard"; // middle / before / order
    // なかまわけ: やさ=カテゴリ軸／ふつう=性質軸（同カテゴリ内）／むず=抽象軸4択
    case "nakama":
      return m.axisType === "concrete" ? "easy" : m.axisType === "functional" ? "normal" : "hard";
  }
  return null;
}

/* ---------- 問題1問の検証 ---------- */
export function checkQuestion(q) {
  const errs = [];
  if (!CATEGORIES.includes(q.category)) errs.push(`カテゴリ不正: ${q.category}`);
  if (!DIFFS.includes(q.difficulty)) errs.push(`難易度不正: ${q.difficulty}`);
  if (!q.q || !q.why) errs.push("問題文または解説が空");
  if (!Array.isArray(q.opts) || q.opts.length < 3 || q.opts.length > 4) errs.push("選択肢は3〜4つ");
  else {
    if (new Set(q.opts).size !== q.opts.length) errs.push("選択肢に重複");
    if (!(Number.isInteger(q.a) && q.a >= 0 && q.a < q.opts.length)) errs.push(`正解番号が不正: ${q.a}`);
  }
  if (errs.length) return errs;

  // くりかえしの「中身」に回数表記禁止（外側と二重になり図から一意に読めない）
  const countRe = /（[^）]*かい[^）]*）|[0-9０-９]+\s*かい/;
  for (const line of q.q.split("\n")) {
    if (/^\s*[│|]/.test(line) && countRe.test(line)) errs.push(`くりかえしの中身に回数表記あり: 「${line.trim()}」`);
  }
  const bracket = q.q.match(/くりかえし［([^］]*)］/);
  if (bracket && countRe.test(bracket[1])) errs.push(`くりかえし［…］の中に回数表記あり: 「${bracket[1]}」`);
  if (errs.length) return errs;

  const m = q.meta;
  if (!m) { errs.push("metaがない（全カテゴリ機械検証がP6eの前提）"); return errs; }

  // 難易度タグ照合（④）
  const exp = expectedDifficulty(q);
  if (exp && exp !== q.difficulty) errs.push(`難易度タグ不一致: タグ=${q.difficulty} 実難易度=${exp}`);

  const correct = q.opts[q.a];
  if (m.kind === "kimari-next") {
    q.opts.forEach((opt, i) => {
      const v = validNext(m.prefix, opt);
      if (i === q.a && !v) errs.push("正解がきまりとして成立しない");
      if (i !== q.a && v) errs.push(`別解が成立: 選択肢${i}「${opt}」`);
    });
  } else if (m.kind === "kimari-jump") {
    const answers = jumpAnswers(m.prefix, m.pos - 1); // pos は1はじまり
    if (answers.size !== 1) errs.push(`とび先の答えが一意でない: {${[...answers]}}`);
    else if ([...answers][0] !== correct) errs.push("とび先の答え不一致");
  } else if (m.kind === "kimari-broken") {
    q.opts.forEach((opt, i) => {
      const seq = [...opt];
      const per = isFullyPeriodic(seq);
      if (i === q.a && per) errs.push("「ちがう列」が周期的になっている");
      if (i !== q.a && !per) errs.push(`正しい列${i}が周期的でない`);
    });
  } else if (m.kind === "robot-turn") {
    let d = m.start;
    for (const s of m.turns) d = turn(d, s);
    if (correct !== DIRS[d].name) errs.push("回転の答えが一致しない");
    q.opts.forEach((o, i) => { if (i !== q.a && o === DIRS[d].name) errs.push("別解あり"); });
  } else if (m.kind === "robot-steps") {
    const total = m.repeat ? m.repeat * m.body : m.steps.reduce((a, b) => a + b, 0);
    if (correct !== `${total}マス`) errs.push(`歩数の答え不一致: 期待${total}`);
  } else if (m.kind === "robot-move") {
    const expect = posLabel(DIRS[m.start].dx * m.n, DIRS[m.start].dy * m.n);
    if (correct !== expect) errs.push(`前進の答え不一致: 期待「${expect}」`);
    q.opts.forEach((o, i) => { if (i !== q.a && o === expect) errs.push("別解あり"); });
  } else if (m.kind === "robot-goal") {
    let d = m.start, x = 0, y = 0;
    for (const c of m.cmds) {
      if (c === "R") d = turn(d, "right");
      else if (c === "L") d = turn(d, "left");
      else { x += DIRS[d].dx * c; y += DIRS[d].dy * c; }
    }
    const expect = posLabel(x, y);
    if (correct !== expect) errs.push(`到達位置の答え不一致: 期待「${expect}」`);
    q.opts.forEach((o, i) => { if (i !== q.a && o === expect) errs.push("別解あり"); });
  } else if (m.kind === "yomitori-seq") {
    const expect = m.steps[m.askIndex];
    if (correct !== expect) errs.push("手順の答え不一致");
    q.opts.forEach((o, i) => { if (i !== q.a && o === expect) errs.push("別解あり"); });
  } else if (m.kind === "yomitori-branch") {
    const expect = m.askCond ? m.yes : m.no;
    if (correct !== expect) errs.push("分岐の答え不一致");
  } else if (m.kind === "yomitori-loop") {
    const expect = `${m.count * m.per}かい`;
    if (correct !== expect) errs.push(`ループの答え不一致: 期待${expect}`);
  } else if (m.kind === "yomitori-loop2") {
    // 中身に2つの動作。問われた動作は1周1回 → 答え=周回数
    const expect = `${m.count}かい`;
    if (correct !== expect) errs.push(`ループ(2動作)の答え不一致: 期待${expect}`);
  } else if (m.kind === "junban") {
    const st = m.steps;
    const idx = st.indexOf(correct);
    if (m.ask === "first") {
      if (idx !== 0) errs.push("さいしょの答えがチェーン先頭でない");
      q.opts.forEach((o, i) => { if (i !== q.a && !st.slice(1).includes(o)) errs.push(`誤答がチェーン後方以外: ${o}`); });
    } else if (m.ask === "last") {
      if (idx !== st.length - 1) errs.push("さいごの答えがチェーン末尾でない");
      q.opts.forEach((o, i) => { if (i !== q.a && !st.slice(0, -1).includes(o)) errs.push(`誤答がチェーン前方以外: ${o}`); });
    } else if (m.ask === "middle") {
      if (idx !== m.pos) errs.push("途中の答えの位置が不一致");
      q.opts.forEach((o, i) => { if (i !== q.a && st.indexOf(o) === m.pos) errs.push("別解あり"); });
    } else if (m.ask === "before") {
      if (idx !== m.pos - 1) errs.push("直前の答えが不一致");
      // 誤答は問われた手順より後ろだけ（前ならすべて「まえに することは」として成立してしまう）
      q.opts.forEach((o, i) => { if (i !== q.a && st.indexOf(o) <= m.pos) errs.push(`誤答が前方にある: ${o}`); });
    } else if (m.ask === "order") {
      // 正解は正順そのもの。誤答は隣接スワップ＝厳密チェーンでは不可能な順
      const join = a => a.join(" → ");
      if (correct !== join(st)) errs.push("正順の答え不一致");
      q.opts.forEach((o, i) => { if (i !== q.a && o === join(st)) errs.push("別解あり"); });
    } else errs.push(`未知のjunban ask: ${m.ask}`);
  } else if (m.kind === "nakama") {
    if (!m.items || !m.odd) { errs.push("nakama metaが不完全"); return errs; }
    if (correct !== m.odd) errs.push("なかまはずれの答え不一致");
    const conflicts = nakamaConflicts(m.items, m.odd);
    errs.push(...conflicts);
  } else {
    errs.push(`未知のmeta.kind: ${m.kind}`);
  }
  return errs;
}
