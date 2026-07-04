// クイズの正本（P3: 5カテゴリ×3難易度・204問）
// 生成分: quizzes.gen.js（node tools/quizgen.mjs --write で再生成）
// 書き起こし分: quizzes-fixed.js（quiz-書き起こし基準.md に準拠）
import { GEN_QUIZZES } from "./quizzes.gen.js";
import { FIXED_QUIZZES } from "./quizzes-fixed.js";

export const QUIZ_CATEGORIES = [
  { id: "junban", name: "じゅんばん クイズ", emoji: "🍛", color: "#6BCB77", desc: "ただしい じゅんばんを かんがえよう" },
  { id: "kimari", name: "きまり みつけ", emoji: "🔍", color: "#7FC8F8", desc: "ならびかたの きまりを みつけよう" },
  { id: "nakama", name: "なかまわけ クイズ", emoji: "📦", color: "#FFD447", desc: "なかまはずれを みつけよう" },
  { id: "robot", name: "ロボット めいれい", emoji: "🤖", color: "#9D7BD8", desc: "ロボットの うごきを よそうしよう" },
  { id: "yomitori", name: "ずの よみとり", emoji: "🔀", color: "#FF9F43", desc: "フローチャートを よんで こたえよう" },
];

export const QUIZ_DIFFS = [
  { id: "easy", label: "⭐ やさしい" },
  { id: "normal", label: "⭐⭐ ふつう" },
  { id: "hard", label: "⭐⭐⭐ むずかしい" },
];

export const ALL_QUESTIONS = [...GEN_QUIZZES, ...FIXED_QUIZZES];
export const SESSION_SIZE = 5;

export function poolFor(category, difficulty) {
  return ALL_QUESTIONS.filter(q => q.category === category && q.difficulty === difficulty);
}

// ベスト記録のキー（既存の q1〜q4 キーはv1の名残として保存内に残るが参照しない）
export function bestKey(category, difficulty) { return `${category}:${difficulty}`; }

/* 1回分の出題（プールから5問シャッフル・選択肢の順もシャッフル） */
export function buildSession(category, difficulty) {
  const pool = [...poolFor(category, difficulty)];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, SESSION_SIZE).map(q => {
    const order = q.opts.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return { ...q, opts: order.map(i => q.opts[i]), a: order.indexOf(q.a) };
  });
}
