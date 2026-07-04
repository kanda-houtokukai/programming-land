// バッジ定義（P5: 14個 → 26個に拡張。既存は維持し追加）
// すべて既存の保存データ（★・クリア状況・quiz.best・typing.best・art.gallery・log）から自動判定。
// 取得条件は子どもに分かりやすい平易な日本語。判定は check(save) が真なら取得。
import { STAGES, stagesFor } from "./stages.js";
import { QUIZ_CATEGORIES, QUIZ_DIFFS, SESSION_SIZE, bestKey } from "./quizzes.js";
import { DIFFICULTIES } from "./islands.js";
import { TYPING_STAGES } from "./typing.js";

export function puzzleStarsTotal(s) { return Object.values(s.puzzle.stars).reduce((a, b) => a + b, 0); }
export function daysPlayed(s) { return Object.keys(s.log).length; }

// どれかの難易度で その島を 全ステージクリア
export function islandDone(s, island) {
  return DIFFICULTIES.some(d => {
    const st = stagesFor(island, d.id);
    return st.length > 0 && st.every(x => (s.puzzle.stars[x.id] || 0) > 0);
  });
}
// 3つの難易度 すべてで その島を 全ステージクリア（やり込み）
export function islandAllDiffDone(s, island) {
  return DIFFICULTIES.every(d => {
    const st = stagesFor(island, d.id);
    return st.length > 0 && st.every(x => (s.puzzle.stars[x.id] || 0) > 0);
  });
}
// ある難易度で クリアした面数（★1つ以上）
export function clearedInDiff(s, diff) {
  let n = 0;
  for (let island = 1; island <= 6; island++)
    for (const st of stagesFor(island, diff)) if ((s.puzzle.stars[st.id] || 0) > 0) n++;
  return n;
}
// ある難易度で ★3を とった面数
export function star3InDiff(s, diff) {
  let n = 0;
  for (let island = 1; island <= 6; island++)
    for (const st of stagesFor(island, diff)) if ((s.puzzle.stars[st.id] || 0) === 3) n++;
  return n;
}
// タイピングの自己ベスト（1分あたりの文字数）の最大
export function typingBestKpm(s) {
  return Math.max(0, ...Object.values(s.typing.best || {}).map(b => b.kpm || 0));
}
// タイピングの ある段階を クリアした（記録がある）か
export function typingCleared(s, stageId) { return !!(s.typing.best && s.typing.best[stageId]); }

export const BADGES = [
  { id: "first", emoji: "🎉", name: "はじめての クリア", desc: "パズルを 1つ クリアした", check: s => Object.keys(s.puzzle.stars).length >= 1 },
  // ── 島マスター（6島ぶん）──
  { id: "w1", emoji: "🏝️", name: "じゅんばんの しま マスター", desc: "じゅんばんの しまを ぜんぶ クリア", check: s => islandDone(s, 1) },
  { id: "w2", emoji: "🌀", name: "くりかえしの しま マスター", desc: "くりかえしの しまを ぜんぶ クリア", check: s => islandDone(s, 2) },
  { id: "w3", emoji: "⛰️", name: "もしもの しま マスター", desc: "もしもの しまを ぜんぶ クリア", check: s => islandDone(s, 3) },
  { id: "w4", emoji: "🌈", name: "くみあわせの しま マスター", desc: "くみあわせの しまを ぜんぶ クリア", check: s => islandDone(s, 4) },
  { id: "w5", emoji: "🧠", name: "あたまのたいそうの しま マスター", desc: "あたまのたいそうの しまを ぜんぶ クリア", check: s => islandDone(s, 5) },
  { id: "w6", emoji: "🏰", name: "ちょうせんの しま マスター", desc: "ちょうせんの しまを ぜんぶ クリア", check: s => islandDone(s, 6) },
  // ── ほし コレクション ──
  { id: "star10", emoji: "🌟", name: "きらきら コレクター", desc: "ほしを 10こ あつめた", check: s => puzzleStarsTotal(s) >= 10 },
  { id: "starAll", emoji: "👑", name: "スター おうさま", desc: "ほしを 100こ あつめた", check: s => puzzleStarsTotal(s) >= 100 },
  // ── 難易度・やり込み ──
  { id: "normal7", emoji: "🥈", name: "ふつう チャレンジャー", desc: "「ふつう」を 7めん クリア", check: s => clearedInDiff(s, "normal") >= 7 },
  { id: "hard7", emoji: "🥇", name: "むずかしい チャレンジャー", desc: "「むずかしい」を 7めん クリア", check: s => clearedInDiff(s, "hard") >= 7 },
  { id: "hard3_5", emoji: "💎", name: "ダイヤの うでまえ", desc: "「むずかしい」で ★3を 5こ とった", check: s => star3InDiff(s, "hard") >= 5 },
  { id: "islandTriple", emoji: "🎖️", name: "しまの せいは", desc: "どれかの しまを 3つの むずかしさ ぜんぶ クリア", check: s => [1, 2, 3, 4, 5, 6].some(i => islandAllDiffDone(s, i)) },
  // ── クイズ ──
  { id: "quiz1", emoji: "💡", name: "クイズ ちょうせんしゃ", desc: "クイズを 1セット やった", check: s => Object.keys(s.quiz.best).length >= 1 },
  { id: "quizAll", emoji: "🎓", name: "クイズ はかせ", desc: "5しゅるいの クイズ ぜんぶで まんてん", check: s => QUIZ_CATEGORIES.every(c => QUIZ_DIFFS.some(d => (s.quiz.best[bestKey(c.id, d.id)] || 0) >= SESSION_SIZE)) },
  { id: "quizHardAll", emoji: "📚", name: "クイズ グランドマスター", desc: "「むずかしい」クイズ 5しゅるい ぜんぶで まんてん", check: s => QUIZ_CATEGORIES.every(c => (s.quiz.best[bestKey(c.id, "hard")] || 0) >= SESSION_SIZE) },
  // ── タイピング ──
  { id: "type1", emoji: "⌨️", name: "タイピング デビュー", desc: "タイピング「ことば」を クリア", check: s => typingCleared(s, "kotoba") },
  { id: "typeAll", emoji: "🎹", name: "タイピング マスター", desc: "タイピング 3つの だんかい ぜんぶ クリア", check: s => TYPING_STAGES.every(t => typingCleared(s, t.id)) },
  { id: "typeFast", emoji: "⚡", name: "はやうち めいじん", desc: "タイピングで 1ぷんに 20もじ いじょう", check: s => typingBestKpm(s) >= 20 },
  // ── おえかき ──
  { id: "art1", emoji: "🎨", name: "みならい アーティスト", desc: "さくひんを 1つ ほぞんした", check: s => s.art.gallery.length >= 1 },
  { id: "art5", emoji: "🖼️", name: "びじゅつかんの たつじん", desc: "さくひんを 5つ ほぞんした", check: s => s.art.gallery.length >= 5 },
  { id: "art10", emoji: "🏛️", name: "だい げいじゅつか", desc: "さくひんを 10こ ほぞんした", check: s => s.art.gallery.length >= 10 },
  // ── 習慣・総合 ──
  { id: "days3", emoji: "🔥", name: "こつこつさん", desc: "3にち あそんだ", check: s => daysPlayed(s) >= 3 },
  { id: "days7", emoji: "🏆", name: "まいにち チャンピオン", desc: "7にち あそんだ", check: s => daysPlayed(s) >= 7 },
  { id: "allmode", emoji: "🗺️", name: "ランドの たんけんか", desc: "3つの あそびを ぜんぶ やった", check: s => Object.keys(s.puzzle.stars).length > 0 && Object.keys(s.quiz.best).length > 0 && s.art.gallery.length > 0 },
  { id: "legend", emoji: "🦸", name: "でんせつの プログラマー", desc: "ほかの バッジを ぜんぶ あつめた", check: s => BADGES.filter(b => b.id !== "legend").every(b => b.check(s)) },
];
