// クイズの正本（P6e: 5カテゴリ×3難易度・全336問をメタ付きテンプレート生成に統一）
// 生成: quizzes.gen.js（node tools/quizgen.mjs --write で再生成・難易度タグも機械検証）
// 素材データ（因果チェーン・タグ辞書）: tools/quiz-data.mjs ＝ 人手で品質保証する場所
// ※旧・書き起こし分(quizzes-fixed.js 84問)はP6eで引退（素材は quiz-data.mjs に取り込み済み）
import { GEN_QUIZZES } from "./quizzes.gen.js";

export const QUIZ_CATEGORIES = [
  { id: "junban", name: "じゅんばん クイズ", emoji: "🍛", color: "#6BCB77", desc: "ただしい じゅんばんを かんがえよう" },
  { id: "kimari", name: "きまり みつけ", emoji: "🔍", color: "#7FC8F8", desc: "ならびかたの きまりを みつけよう" },
  { id: "nakama", name: "なかまわけ クイズ", emoji: "📦", color: "#FFD447", desc: "なかまはずれを みつけよう" },
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

/* 1回分の出題（プールから5問シャッフル・選択肢の順もシャッフル） */
export function buildSession(category, difficulty) {
  return shuffle(poolFor(category, difficulty)).slice(0, SESSION_SIZE).map(shuffleOpts);
}

/* バトル用: その難易度の全カテゴリを混ぜてシャッフルした出題キュー。
   先頭から順に引けば直近の重複は自然に避けられる（バトルの問数はプールより十分少ない）。 */
export function battlePool(difficulty) {
  return shuffle(ALL_QUESTIONS.filter(q => q.difficulty === difficulty)).map(shuffleOpts);
}
