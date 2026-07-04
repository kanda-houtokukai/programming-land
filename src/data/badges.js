// バッジ定義（P2: 島×難易度構造に対応。本格増補はP5で行う）
import { STAGES, stagesFor } from "./stages.js";
import { QUIZ_CATEGORIES, QUIZ_DIFFS, SESSION_SIZE, bestKey } from "./quizzes.js";
import { DIFFICULTIES } from "./islands.js";

export function puzzleStarsTotal(s) { return Object.values(s.puzzle.stars).reduce((a, b) => a + b, 0); }
export function daysPlayed(s) { return Object.keys(s.log).length; }

// どれかの難易度で その島を 全ステージクリア
export function islandDone(s, island) {
  return DIFFICULTIES.some(d => {
    const st = stagesFor(island, d.id);
    return st.length > 0 && st.every(x => (s.puzzle.stars[x.id] || 0) > 0);
  });
}

export const BADGES = [
  { id: "first", emoji: "🎉", name: "はじめての クリア", desc: "パズルを 1つ クリアした", check: s => Object.keys(s.puzzle.stars).length >= 1 },
  { id: "w1", emoji: "🏝️", name: "じゅんばんの しま マスター", desc: "じゅんばんの しまを ぜんぶ クリア", check: s => islandDone(s, 1) },
  { id: "w2", emoji: "🌀", name: "くりかえしの しま マスター", desc: "くりかえしの しまを ぜんぶ クリア", check: s => islandDone(s, 2) },
  { id: "w3", emoji: "⛰️", name: "もしもの しま マスター", desc: "もしもの しまを ぜんぶ クリア", check: s => islandDone(s, 3) },
  { id: "star10", emoji: "🌟", name: "きらきら コレクター", desc: "ほしを 10こ あつめた", check: s => puzzleStarsTotal(s) >= 10 },
  { id: "starAll", emoji: "👑", name: "スター おうさま", desc: "ほしを 100こ あつめた", check: s => puzzleStarsTotal(s) >= 100 },
  { id: "quiz1", emoji: "💡", name: "クイズ ちょうせんしゃ", desc: "クイズを 1セット やった", check: s => Object.keys(s.quiz.best).length >= 1 },
  { id: "quizAll", emoji: "🎓", name: "クイズ はかせ", desc: "5しゅるいの クイズ ぜんぶで まんてん", check: s => QUIZ_CATEGORIES.every(c => QUIZ_DIFFS.some(d => (s.quiz.best[bestKey(c.id, d.id)] || 0) >= SESSION_SIZE)) },
  { id: "art1", emoji: "🎨", name: "みならい アーティスト", desc: "さくひんを 1つ ほぞんした", check: s => s.art.gallery.length >= 1 },
  { id: "art5", emoji: "🖼️", name: "びじゅつかんの たつじん", desc: "さくひんを 5つ ほぞんした", check: s => s.art.gallery.length >= 5 },
  { id: "days3", emoji: "🔥", name: "こつこつさん", desc: "3にち あそんだ", check: s => daysPlayed(s) >= 3 },
  { id: "days7", emoji: "🏆", name: "まいにち チャンピオン", desc: "7にち あそんだ", check: s => daysPlayed(s) >= 7 },
  { id: "allmode", emoji: "🗺️", name: "ランドの たんけんか", desc: "3つの あそびを ぜんぶ やった", check: s => Object.keys(s.puzzle.stars).length > 0 && Object.keys(s.quiz.best).length > 0 && s.art.gallery.length > 0 },
  { id: "legend", emoji: "🦸", name: "でんせつの プログラマー", desc: "ほかの バッジを ぜんぶ あつめた", check: s => BADGES.filter(b => b.id !== "legend").every(b => b.check(s)) },
];
