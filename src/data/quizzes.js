// クイズの正本（P6e: 5カテゴリ×3難易度・全612問をメタ付きテンプレート生成に統一〔b4uで在庫拡大〕）
// 生成: quizzes.gen.js（node tools/quizgen.mjs --write で再生成・難易度タグも機械検証）
// 素材データ（因果チェーン・タグ辞書）: tools/quiz-data.mjs ＝ 人手で品質保証する場所
// ※旧・書き起こし分(quizzes-fixed.js 84問)はP6eで引退（素材は quiz-data.mjs に取り込み済み）
import { GEN_QUIZZES } from "./quizzes.gen.js";

export const QUIZ_CATEGORIES = [
  { id: "junban", name: "じゅんばん クイズ", emoji: "🍛", color: "#6BCB77", desc: "ただしい じゅんばんを かんがえよう" },
  { id: "kimari", name: "きまり みつけ", emoji: "🔍", color: "#7FC8F8", desc: "ならびかたの きまりを みつけよう" },
  { id: "nakama", name: "なかまわけ クイズ", emoji: "📦", color: "#FFD447", desc: "なかまを あつめよう・なかまはずれを みつけよう" },
  { id: "robot", name: "ロボット めいれい", emoji: "🤖", color: "#9D7BD8", desc: "ロボットの うごきを よそうしよう" },
  { id: "yomitori", name: "ずの よみとり", emoji: "🔀", color: "#FF9F43", desc: "フローチャートを よんで こたえよう" },
];

// 難易度は「色＋言葉」で見せる（メモ03）。★は評価専用。色は islands.js の DIFFICULTIES と同値に揃える
export const QUIZ_DIFFS = [
  { id: "easy", label: "やさしい", color: "#6BCB77" },
  { id: "normal", label: "ふつう", color: "#FFD447" },
  { id: "hard", label: "むずかしい", color: "#FF9F43" },
];

export const ALL_QUESTIONS = GEN_QUIZZES;
export const SESSION_SIZE = 5;

export function poolFor(category, difficulty) {
  return ALL_QUESTIONS.filter(q => q.category === category && q.difficulty === difficulty);
}

// ベスト記録のキー（既存の q1〜q4 キーはv1の名残として保存内に残るが参照しない）
export function bestKey(category, difficulty) { return `${category}:${difficulty}`; }

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// 選択肢の順もシャッフルして返す（正解インデックスを付け替える）
function shuffleOpts(q) {
  const order = shuffle(q.opts.map((_, i) => i));
  return { ...q, opts: order.map(i => q.opts[i]), a: order.indexOf(q.a) };
}

/* ===== ①1ゲーム内の重複防止（b4u・実測で確定したルール R1〜R5） =====
   任意の2問が次のいずれかに該当したら「同じ/似た問題」とみなして同席させない。
   セーブ記録は使わない＝1ゲーム(5問)の中だけの制約。 */
const optsKey = q => [...q.opts].map(s => s.trim()).sort().join("|");
function isDupPair(a, b) {
  // R1: 問題文が同じ かつ 正解ラベルが同じ（junban/yomitori の実質同一問題。
  //     文言だけの一致は kimari・仲間外れでは正常なので禁止しない）
  if (a.q === b.q && a.opts[a.a] === b.opts[b.a]) return true;
  // R2: 選択肢セット（ソート済み）が同じ＝丸かぶり
  if (optsKey(a) === optsKey(b)) return true;
  // R3: じゅんばん同士で同じ話（chainId）＝同じ話を1セッションに2回出さない
  if (a.meta && b.meta && a.meta.chainId && a.meta.chainId === b.meta.chainId) return true;
  // R4: なかまわけ同士でアイテムを2つ以上共有（似た問題）
  if (a.meta && b.meta && a.meta.items && b.meta.items) {
    const setB = new Set(b.meta.items.map(i => i.label));
    let shared = 0;
    for (const it of a.meta.items) if (setB.has(it.label)) shared++;
    if (shared >= 2) return true;
  }
  // R5: 軸名称形式同士で同じ軸＝問題文まで同一になる（「たべられる」×2 等）
  if (a.meta && b.meta && a.meta.kind === "nakama-axis" && b.meta.kind === "nakama-axis" && a.meta.axis === b.meta.axis) return true;
  return false;
}
// R1・R2 だけの緩和版（フォールバック用）
function isDupPairLoose(a, b) {
  return (a.q === b.q && a.opts[a.a] === b.opts[b.a]) || optsKey(a) === optsKey(b);
}
// シャッフル済みプールから、どの2問もdupでない5問を貪欲に選ぶ（そろわなければ null）
function pickCompatible(pool, dup) {
  const chosen = [];
  for (const q of pool) {
    if (chosen.every(c => !dup(c, q))) {
      chosen.push(q);
      if (chosen.length === SESSION_SIZE) return chosen;
    }
  }
  return null;
}

/* ===== ②正解位置の均等割当（b4u） =====
   選んだ5問を選択肢数（3択/4択）ごとにグループ化し、各グループ内で正解位置が
   できるだけ均等になる多重集合（3択5問=2:2:1／4択5問=2:1:1:1 等）を作って割り当てる。
   「全問おなじ位置」は構造的に発生しない。見せ順の並べ替えなので正誤・記録には影響しない。 */
function evenPositions(count, nOpts) {
  const base = Math.floor(count / nOpts), extra = count % nOpts;
  const order = shuffle([...Array(nOpts).keys()]); // 余りをどの位置に足すかもランダム
  const positions = [];
  order.forEach((p, i) => { for (let k = 0; k < base + (i < extra ? 1 : 0); k++) positions.push(p); });
  return shuffle(positions);
}
function placeCorrectAt(q, target) {
  const others = shuffle(q.opts.filter((_, i) => i !== q.a));
  const opts = [];
  let oi = 0;
  for (let i = 0; i < q.opts.length; i++) opts.push(i === target ? q.opts[q.a] : others[oi++]);
  return { ...q, opts, a: target };
}

/* 1回分の出題（①R1〜R5の重複防止で5問選抜 → ②正解位置を均等割当）。
   採点・記録は従来どおり（選び方と見せ順だけの変更）。 */
export function buildSession(category, difficulty) {
  const pool = poolFor(category, difficulty);
  // ① フル制約（R1〜R5）で数回試行 → 緩和（R1・R2） → 最後はレコード非重複のみ（必ず5問そろえる）
  let picked = null;
  for (let t = 0; t < 10 && !picked; t++) picked = pickCompatible(shuffle(pool), isDupPair);
  for (let t = 0; t < 10 && !picked; t++) picked = pickCompatible(shuffle(pool), isDupPairLoose);
  if (!picked) picked = shuffle(pool).slice(0, SESSION_SIZE);
  // ② 選択肢数ごとに正解位置を均等配分（nakama/hard は3択と4択が混在するため分けて配る）
  const byLen = new Map();
  picked.forEach(q => {
    const L = q.opts.length;
    if (!byLen.has(L)) byLen.set(L, []);
    byLen.get(L).push(q);
  });
  const placed = new Map();
  for (const [L, qs] of byLen) {
    const positions = evenPositions(qs.length, L);
    qs.forEach((q, i) => placed.set(q, placeCorrectAt(q, positions[i])));
  }
  return picked.map(q => placed.get(q));
}

/* バトル用: その難易度の全カテゴリを混ぜてシャッフルした出題キュー。
   先頭から順に引けば直近の重複は自然に避けられる（バトルの問数はプールより十分少ない）。 */
export function battlePool(difficulty) {
  return shuffle(ALL_QUESTIONS.filter(q => q.difficulty === difficulty)).map(shuffleOpts);
}
