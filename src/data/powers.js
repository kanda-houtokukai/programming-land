// 「そだった ちから」（提案3・すくすくメーター）。★段階しきい値・称号・5つのちからはここに集約★
// 到達度は既存の計算（保護者画面 skillProgress と同じ式）を使う。新規データ収集なし。
import { STAGES } from "./stages.js";
import { QUIZ_CATEGORIES, QUIZ_DIFFS, SESSION_SIZE } from "./quizzes.js";
import seed from "../assets/grow_0_seed.png";
import sprout from "../assets/grow_1_sprout.png";
import leaves from "../assets/grow_2_leaves.png";
import bud from "../assets/grow_3_bud.png";
import flower from "../assets/grow_4_flower.png";

// 成長5段階（同じ鉢の植物が育つ）。min=その段階になる到達度%の下限。称号もここ。
export const GROW_STAGES = [
  { key: "seed", img: seed, stage: "たね", title: "はじめ", min: 0 },
  { key: "sprout", img: sprout, stage: "め", title: "みならい", min: 10 },
  { key: "leaves", img: leaves, stage: "は", title: "じょうず", min: 35 },
  { key: "bud", img: bud, stage: "つぼみ", title: "あとすこし", min: 65 },
  { key: "flower", img: flower, stage: "はな", title: "はかせ", min: 90 },
];
// 到達度%から段階を返す（0はじまり index も返す＝差分演出で「段階が上がった」を判定）
export function growStage(pct) {
  let idx = 0;
  for (let i = 0; i < GROW_STAGES.length; i++) if (pct >= GROW_STAGES[i].min) idx = i;
  return { ...GROW_STAGES[idx], idx };
}

// 5つのちから（子ども向け）。grows=そだつ場所の説明（メモ02の場所名で統一・代表1〜2か所）／
// go=詳細の「いってみる」で飛ぶ先のモードkey（メモ02の遷移に沿う）／goLabel=ボタンに出す場所名
export const POWERS = [
  { id: "junji", name: "じゅんばんの ちから", emoji: "👣", go: "puzzle", goLabel: "パズルのしま",
    grows: "「パズルのしま」や「クイズのひろば」の じゅんばん で そだつよ" },
  { id: "repeat", name: "くりかえしの ちから", emoji: "🔁", go: "puzzle", goLabel: "パズルのしま",
    grows: "「パズルのしま」の くりかえし や「クイズのひろば」の きまりみつけ で そだつよ" },
  { id: "think", name: "かんがえる ちから", emoji: "🧠", go: "quiz", goLabel: "クイズのひろば",
    grows: "「パズルのしま」の もしも や「クイズのひろば」の なかまわけ で そだつよ" },
  { id: "keyboard", name: "キーボードの ちから", emoji: "⌨️", go: "typing", goLabel: "タイピングタワー",
    grows: "「タイピングタワー」で そだつよ" },
  { id: "create", name: "つくる ちから", emoji: "🎨", go: "art", goLabel: "おえかきのへや",
    grows: "「おえかきのへや」で さくひんを つくると そだつよ" },
];

/* 到達度% を計算（保護者画面 skillProgress と同じ式・5つに集約）
   じゅんばん=島1／くりかえし=島2／かんがえる=島3(分岐)とクイズの平均／
   キーボード=タイピング速さ／つくる=おえかき作品数 */
function islandPct(save, island) {
  const st = STAGES.filter(s => s.island === island);
  const got = st.reduce((a, s) => a + (save.puzzle.stars[s.id] || 0), 0);
  return st.length ? Math.round(100 * got / (st.length * 3)) : 0;
}
function quizPct(save) {
  const total = QUIZ_CATEGORIES.length * QUIZ_DIFFS.length * SESSION_SIZE;
  const got = Object.entries(save.quiz.best || {})
    .filter(([k]) => k.includes(":")).reduce((a, [, v]) => a + (v || 0), 0);
  return Math.round(100 * got / total);
}
export function computePowers(save) {
  const think = Math.round((islandPct(save, 3) + quizPct(save)) / 2); // 分岐とクイズの平均
  const keyboard = Math.min(100, Math.round(100 * Math.max(0, ...Object.values(save.typing.best || {}).map(b => b.kpm || 0)) / 60));
  const create = Math.min(100, (save.art.gallery || []).length * 20);
  const pctById = {
    junji: islandPct(save, 1),
    repeat: islandPct(save, 2),
    think, keyboard, create,
  };
  return POWERS.map(p => ({ ...p, pct: pctById[p.id], grow: growStage(pctById[p.id]) }));
}
