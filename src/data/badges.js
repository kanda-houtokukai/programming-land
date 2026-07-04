// バッジ定義（v1から移植・数値はデータから自動計算に変更）
import { STAGES, TOTAL_STARS } from "./stages.js";
import { QUIZ_SETS } from "./quizzes.js";

export function puzzleStarsTotal(s) { return Object.values(s.puzzle.stars).reduce((a, b) => a + b, 0); }
export function worldDone(s, w) { return STAGES.filter(st => st.world === w).every(st => (s.puzzle.stars[st.id] || 0) > 0); }
export function daysPlayed(s) { return Object.keys(s.log).length; }

export const BADGES = [
  { id: "first", emoji: "🎉", name: "はじめての クリア", desc: "パズルを 1つ クリアした", check: s => Object.keys(s.puzzle.stars).length >= 1 },
  { id: "w1", emoji: "🌳", name: "もりの たんけんか", desc: "ワールド1を ぜんぶ クリア", check: s => worldDone(s, 1) },
  { id: "w2", emoji: "🌊", name: "うみの ぼうけんか", desc: "ワールド2を ぜんぶ クリア", check: s => worldDone(s, 2) },
  { id: "w3", emoji: "⛰️", name: "やまの マスター", desc: "ワールド3を ぜんぶ クリア", check: s => worldDone(s, 3) },
  { id: "star10", emoji: "🌟", name: "きらきら コレクター", desc: "ほしを 10こ あつめた", check: s => puzzleStarsTotal(s) >= 10 },
  { id: "starAll", emoji: "👑", name: "スター おうさま", desc: `ほしを ぜんぶ（${TOTAL_STARS}こ）あつめた`, check: s => puzzleStarsTotal(s) >= TOTAL_STARS },
  { id: "quiz1", emoji: "💡", name: "クイズ ちょうせんしゃ", desc: "クイズを 1セット やった", check: s => Object.keys(s.quiz.best).length >= 1 },
  { id: "quizAll", emoji: "🎓", name: "クイズ はかせ", desc: "ぜんぶの クイズで まんてん", check: s => QUIZ_SETS.every(q => (s.quiz.best[q.id] || 0) >= q.qs.length) },
  { id: "art1", emoji: "🎨", name: "みならい アーティスト", desc: "さくひんを 1つ ほぞんした", check: s => s.art.gallery.length >= 1 },
  { id: "art5", emoji: "🖼️", name: "びじゅつかんの たつじん", desc: "さくひんを 5つ ほぞんした", check: s => s.art.gallery.length >= 5 },
  { id: "days3", emoji: "🔥", name: "こつこつさん", desc: "3にち あそんだ", check: s => daysPlayed(s) >= 3 },
  { id: "days7", emoji: "🏆", name: "まいにち チャンピオン", desc: "7にち あそんだ", check: s => daysPlayed(s) >= 7 },
  { id: "allmode", emoji: "🗺️", name: "ランドの たんけんか", desc: "3つの あそびを ぜんぶ やった", check: s => Object.keys(s.puzzle.stars).length > 0 && Object.keys(s.quiz.best).length > 0 && s.art.gallery.length > 0 },
  { id: "legend", emoji: "🦸", name: "でんせつの プログラマー", desc: "ほかの バッジを ぜんぶ あつめた", check: s => BADGES.filter(b => b.id !== "legend").every(b => b.check(s)) },
];
